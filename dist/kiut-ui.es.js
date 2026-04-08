import { defineComponent as Z, shallowRef as So, h as ba, ref as st, onMounted as fe, onUnmounted as cs, watch as Vt, toRaw as ma, nextTick as St, version as Oi, isProxy as Co, computed as D, toRef as rt, openBlock as y, createElementBlock as x, createVNode as X, unref as T, normalizeStyle as _t, createElementVNode as c, toDisplayString as M, createCommentVNode as E, Fragment as q, renderList as J, onBeforeUnmount as Do, createStaticVNode as tt, withDirectives as Gt, vShow as Ds, normalizeClass as G, createBlock as ct, createTextVNode as xt, resolveDynamicComponent as Ca, Transition as Ao, withCtx as qe, renderSlot as zt, useSlots as To, Teleport as Bo, withModifiers as ue, withKeys as As, vModelText as Ge, vModelSelect as zi, useAttrs as Vi, mergeProps as Ua } from "vue";
import * as Ka from "echarts/core";
import { TooltipComponent as Ni, TitleComponent as Wi } from "echarts/components";
import { SankeyChart as Hi } from "echarts/charts";
import { CanvasRenderer as ji } from "echarts/renderers";
import Tt from "moment";
function ds(e) {
  return e + 0.5 | 0;
}
const re = (e, t, s) => Math.max(Math.min(e, s), t);
function Ue(e) {
  return re(ds(e * 2.55), 0, 255);
}
function de(e) {
  return re(ds(e * 255), 0, 255);
}
function ee(e) {
  return re(ds(e / 2.55) / 100, 0, 1);
}
function Xa(e) {
  return re(ds(e * 100), 0, 100);
}
const jt = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, ya = [..."0123456789ABCDEF"], Yi = (e) => ya[e & 15], qi = (e) => ya[(e & 240) >> 4] + ya[e & 15], hs = (e) => (e & 240) >> 4 === (e & 15), Ui = (e) => hs(e.r) && hs(e.g) && hs(e.b) && hs(e.a);
function Ki(e) {
  var t = e.length, s;
  return e[0] === "#" && (t === 4 || t === 5 ? s = {
    r: 255 & jt[e[1]] * 17,
    g: 255 & jt[e[2]] * 17,
    b: 255 & jt[e[3]] * 17,
    a: t === 5 ? jt[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (s = {
    r: jt[e[1]] << 4 | jt[e[2]],
    g: jt[e[3]] << 4 | jt[e[4]],
    b: jt[e[5]] << 4 | jt[e[6]],
    a: t === 9 ? jt[e[7]] << 4 | jt[e[8]] : 255
  })), s;
}
const Xi = (e, t) => e < 255 ? t(e) : "";
function Gi(e) {
  var t = Ui(e) ? Yi : qi;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + Xi(e.a, t) : void 0;
}
const Zi = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Lo(e, t, s) {
  const a = t * Math.min(s, 1 - s), n = (o, i = (o + e / 30) % 12) => s - a * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [n(0), n(8), n(4)];
}
function Qi(e, t, s) {
  const a = (n, o = (n + e / 60) % 6) => s - s * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [a(5), a(3), a(1)];
}
function Ji(e, t, s) {
  const a = Lo(e, 1, 0.5);
  let n;
  for (t + s > 1 && (n = 1 / (t + s), t *= n, s *= n), n = 0; n < 3; n++)
    a[n] *= 1 - t - s, a[n] += t;
  return a;
}
function tr(e, t, s, a, n) {
  return e === n ? (t - s) / a + (t < s ? 6 : 0) : t === n ? (s - e) / a + 2 : (e - t) / a + 4;
}
function Da(e) {
  const s = e.r / 255, a = e.g / 255, n = e.b / 255, o = Math.max(s, a, n), i = Math.min(s, a, n), r = (o + i) / 2;
  let l, d, u;
  return o !== i && (u = o - i, d = r > 0.5 ? u / (2 - o - i) : u / (o + i), l = tr(s, a, n, u, o), l = l * 60 + 0.5), [l | 0, d || 0, r];
}
function Aa(e, t, s, a) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, s, a)).map(de);
}
function Ta(e, t, s) {
  return Aa(Lo, e, t, s);
}
function er(e, t, s) {
  return Aa(Ji, e, t, s);
}
function sr(e, t, s) {
  return Aa(Qi, e, t, s);
}
function Fo(e) {
  return (e % 360 + 360) % 360;
}
function ar(e) {
  const t = Zi.exec(e);
  let s = 255, a;
  if (!t)
    return;
  t[5] !== a && (s = t[6] ? Ue(+t[5]) : de(+t[5]));
  const n = Fo(+t[2]), o = +t[3] / 100, i = +t[4] / 100;
  return t[1] === "hwb" ? a = er(n, o, i) : t[1] === "hsv" ? a = sr(n, o, i) : a = Ta(n, o, i), {
    r: a[0],
    g: a[1],
    b: a[2],
    a: s
  };
}
function nr(e, t) {
  var s = Da(e);
  s[0] = Fo(s[0] + t), s = Ta(s), e.r = s[0], e.g = s[1], e.b = s[2];
}
function or(e) {
  if (!e)
    return;
  const t = Da(e), s = t[0], a = Xa(t[1]), n = Xa(t[2]);
  return e.a < 255 ? `hsla(${s}, ${a}%, ${n}%, ${ee(e.a)})` : `hsl(${s}, ${a}%, ${n}%)`;
}
const Ga = {
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
}, Za = {
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
function ir() {
  const e = {}, t = Object.keys(Za), s = Object.keys(Ga);
  let a, n, o, i, r;
  for (a = 0; a < t.length; a++) {
    for (i = r = t[a], n = 0; n < s.length; n++)
      o = s[n], r = r.replace(o, Ga[o]);
    o = parseInt(Za[i], 16), e[r] = [o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  return e;
}
let fs;
function rr(e) {
  fs || (fs = ir(), fs.transparent = [0, 0, 0, 0]);
  const t = fs[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const lr = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function cr(e) {
  const t = lr.exec(e);
  let s = 255, a, n, o;
  if (t) {
    if (t[7] !== a) {
      const i = +t[7];
      s = t[8] ? Ue(i) : re(i * 255, 0, 255);
    }
    return a = +t[1], n = +t[3], o = +t[5], a = 255 & (t[2] ? Ue(a) : re(a, 0, 255)), n = 255 & (t[4] ? Ue(n) : re(n, 0, 255)), o = 255 & (t[6] ? Ue(o) : re(o, 0, 255)), {
      r: a,
      g: n,
      b: o,
      a: s
    };
  }
}
function dr(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${ee(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const Us = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, Ae = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function ur(e, t, s) {
  const a = Ae(ee(e.r)), n = Ae(ee(e.g)), o = Ae(ee(e.b));
  return {
    r: de(Us(a + s * (Ae(ee(t.r)) - a))),
    g: de(Us(n + s * (Ae(ee(t.g)) - n))),
    b: de(Us(o + s * (Ae(ee(t.b)) - o))),
    a: e.a + s * (t.a - e.a)
  };
}
function gs(e, t, s) {
  if (e) {
    let a = Da(e);
    a[t] = Math.max(0, Math.min(a[t] + a[t] * s, t === 0 ? 360 : 1)), a = Ta(a), e.r = a[0], e.g = a[1], e.b = a[2];
  }
}
function Po(e, t) {
  return e && Object.assign(t || {}, e);
}
function Qa(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = de(e[3]))) : (t = Po(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = de(t.a)), t;
}
function hr(e) {
  return e.charAt(0) === "r" ? cr(e) : ar(e);
}
class es {
  constructor(t) {
    if (t instanceof es)
      return t;
    const s = typeof t;
    let a;
    s === "object" ? a = Qa(t) : s === "string" && (a = Ki(t) || rr(t) || hr(t)), this._rgb = a, this._valid = !!a;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = Po(this._rgb);
    return t && (t.a = ee(t.a)), t;
  }
  set rgb(t) {
    this._rgb = Qa(t);
  }
  rgbString() {
    return this._valid ? dr(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? Gi(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? or(this._rgb) : void 0;
  }
  mix(t, s) {
    if (t) {
      const a = this.rgb, n = t.rgb;
      let o;
      const i = s === o ? 0.5 : s, r = 2 * i - 1, l = a.a - n.a, d = ((r * l === -1 ? r : (r + l) / (1 + r * l)) + 1) / 2;
      o = 1 - d, a.r = 255 & d * a.r + o * n.r + 0.5, a.g = 255 & d * a.g + o * n.g + 0.5, a.b = 255 & d * a.b + o * n.b + 0.5, a.a = i * a.a + (1 - i) * n.a, this.rgb = a;
    }
    return this;
  }
  interpolate(t, s) {
    return t && (this._rgb = ur(this._rgb, t._rgb, s)), this;
  }
  clone() {
    return new es(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = de(t), this;
  }
  clearer(t) {
    const s = this._rgb;
    return s.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, s = ds(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
    return t.r = t.g = t.b = s, this;
  }
  opaquer(t) {
    const s = this._rgb;
    return s.a *= 1 + t, this;
  }
  negate() {
    const t = this._rgb;
    return t.r = 255 - t.r, t.g = 255 - t.g, t.b = 255 - t.b, this;
  }
  lighten(t) {
    return gs(this._rgb, 2, t), this;
  }
  darken(t) {
    return gs(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return gs(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return gs(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return nr(this._rgb, t), this;
  }
}
function Qt() {
}
const fr = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function ft(e) {
  return e == null;
}
function $t(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function it(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function Ft(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function Ut(e, t) {
  return Ft(e) ? e : t;
}
function ot(e, t) {
  return typeof e > "u" ? t : e;
}
const gr = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, Eo = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function bt(e, t, s) {
  if (e && typeof e.call == "function")
    return e.apply(s, t);
}
function gt(e, t, s, a) {
  let n, o, i;
  if ($t(e))
    for (o = e.length, n = 0; n < o; n++)
      t.call(s, e[n], n);
  else if (it(e))
    for (i = Object.keys(e), o = i.length, n = 0; n < o; n++)
      t.call(s, e[i[n]], i[n]);
}
function Ts(e, t) {
  let s, a, n, o;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (s = 0, a = e.length; s < a; ++s)
    if (n = e[s], o = t[s], n.datasetIndex !== o.datasetIndex || n.index !== o.index)
      return !1;
  return !0;
}
function Bs(e) {
  if ($t(e))
    return e.map(Bs);
  if (it(e)) {
    const t = /* @__PURE__ */ Object.create(null), s = Object.keys(e), a = s.length;
    let n = 0;
    for (; n < a; ++n)
      t[s[n]] = Bs(e[s[n]]);
    return t;
  }
  return e;
}
function Ro(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function pr(e, t, s, a) {
  if (!Ro(e))
    return;
  const n = t[e], o = s[e];
  it(n) && it(o) ? ss(n, o, a) : t[e] = Bs(o);
}
function ss(e, t, s) {
  const a = $t(t) ? t : [
    t
  ], n = a.length;
  if (!it(e))
    return e;
  s = s || {};
  const o = s.merger || pr;
  let i;
  for (let r = 0; r < n; ++r) {
    if (i = a[r], !it(i))
      continue;
    const l = Object.keys(i);
    for (let d = 0, u = l.length; d < u; ++d)
      o(l[d], e, i, s);
  }
  return e;
}
function Ze(e, t) {
  return ss(e, t, {
    merger: vr
  });
}
function vr(e, t, s) {
  if (!Ro(e))
    return;
  const a = t[e], n = s[e];
  it(a) && it(n) ? Ze(a, n) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = Bs(n));
}
const Ja = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function br(e) {
  const t = e.split("."), s = [];
  let a = "";
  for (const n of t)
    a += n, a.endsWith("\\") ? a = a.slice(0, -1) + "." : (s.push(a), a = "");
  return s;
}
function mr(e) {
  const t = br(e);
  return (s) => {
    for (const a of t) {
      if (a === "")
        break;
      s = s && s[a];
    }
    return s;
  };
}
function Me(e, t) {
  return (Ja[t] || (Ja[t] = mr(t)))(e);
}
function Ba(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const as = (e) => typeof e < "u", he = (e) => typeof e == "function", tn = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const s of e)
    if (!t.has(s))
      return !1;
  return !0;
};
function yr(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const pt = Math.PI, mt = 2 * pt, _r = mt + pt, Ls = Number.POSITIVE_INFINITY, xr = pt / 180, Mt = pt / 2, be = pt / 4, en = pt * 2 / 3, Io = Math.log10, Zt = Math.sign;
function Qe(e, t, s) {
  return Math.abs(e - t) < s;
}
function sn(e) {
  const t = Math.round(e);
  e = Qe(e, t, e / 1e3) ? t : e;
  const s = Math.pow(10, Math.floor(Io(e))), a = e / s;
  return (a <= 1 ? 1 : a <= 2 ? 2 : a <= 5 ? 5 : 10) * s;
}
function kr(e) {
  const t = [], s = Math.sqrt(e);
  let a;
  for (a = 1; a < s; a++)
    e % a === 0 && (t.push(a), t.push(e / a));
  return s === (s | 0) && t.push(s), t.sort((n, o) => n - o).pop(), t;
}
function wr(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function ns(e) {
  return !wr(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function $r(e, t) {
  const s = Math.round(e);
  return s - t <= e && s + t >= e;
}
function Mr(e, t, s) {
  let a, n, o;
  for (a = 0, n = e.length; a < n; a++)
    o = e[a][s], isNaN(o) || (t.min = Math.min(t.min, o), t.max = Math.max(t.max, o));
}
function se(e) {
  return e * (pt / 180);
}
function Sr(e) {
  return e * (180 / pt);
}
function an(e) {
  if (!Ft(e))
    return;
  let t = 1, s = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, s++;
  return s;
}
function Oo(e, t) {
  const s = t.x - e.x, a = t.y - e.y, n = Math.sqrt(s * s + a * a);
  let o = Math.atan2(a, s);
  return o < -0.5 * pt && (o += mt), {
    angle: o,
    distance: n
  };
}
function _a(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function Cr(e, t) {
  return (e - t + _r) % mt - pt;
}
function Ot(e) {
  return (e % mt + mt) % mt;
}
function os(e, t, s, a) {
  const n = Ot(e), o = Ot(t), i = Ot(s), r = Ot(o - n), l = Ot(i - n), d = Ot(n - o), u = Ot(n - i);
  return n === o || n === i || a && o === i || r > l && d < u;
}
function Bt(e, t, s) {
  return Math.max(t, Math.min(s, e));
}
function Dr(e) {
  return Bt(e, -32768, 32767);
}
function ae(e, t, s, a = 1e-6) {
  return e >= Math.min(t, s) - a && e <= Math.max(t, s) + a;
}
function La(e, t, s) {
  s = s || ((i) => e[i] < t);
  let a = e.length - 1, n = 0, o;
  for (; a - n > 1; )
    o = n + a >> 1, s(o) ? n = o : a = o;
  return {
    lo: n,
    hi: a
  };
}
const we = (e, t, s, a) => La(e, s, a ? (n) => {
  const o = e[n][t];
  return o < s || o === s && e[n + 1][t] === s;
} : (n) => e[n][t] < s), Ar = (e, t, s) => La(e, s, (a) => e[a][t] >= s);
function Tr(e, t, s) {
  let a = 0, n = e.length;
  for (; a < n && e[a] < t; )
    a++;
  for (; n > a && e[n - 1] > s; )
    n--;
  return a > 0 || n < e.length ? e.slice(a, n) : e;
}
const zo = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function Br(e, t) {
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
  }), zo.forEach((s) => {
    const a = "_onData" + Ba(s), n = e[s];
    Object.defineProperty(e, s, {
      configurable: !0,
      enumerable: !1,
      value(...o) {
        const i = n.apply(this, o);
        return e._chartjs.listeners.forEach((r) => {
          typeof r[a] == "function" && r[a](...o);
        }), i;
      }
    });
  });
}
function nn(e, t) {
  const s = e._chartjs;
  if (!s)
    return;
  const a = s.listeners, n = a.indexOf(t);
  n !== -1 && a.splice(n, 1), !(a.length > 0) && (zo.forEach((o) => {
    delete e[o];
  }), delete e._chartjs);
}
function Vo(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const No = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function Wo(e, t) {
  let s = [], a = !1;
  return function(...n) {
    s = n, a || (a = !0, No.call(window, () => {
      a = !1, e.apply(t, s);
    }));
  };
}
function Lr(e, t) {
  let s;
  return function(...a) {
    return t ? (clearTimeout(s), s = setTimeout(e, t, a)) : e.apply(this, a), t;
  };
}
const Fa = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", At = (e, t, s) => e === "start" ? t : e === "end" ? s : (t + s) / 2, Fr = (e, t, s, a) => e === (a ? "left" : "right") ? s : e === "center" ? (t + s) / 2 : t;
function Pr(e, t, s) {
  const a = t.length;
  let n = 0, o = a;
  if (e._sorted) {
    const { iScale: i, vScale: r, _parsed: l } = e, d = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, u = i.axis, { min: h, max: f, minDefined: v, maxDefined: g } = i.getUserBounds();
    if (v) {
      if (n = Math.min(
        // @ts-expect-error Need to type _parsed
        we(l, u, h).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        s ? a : we(t, u, i.getPixelForValue(h)).lo
      ), d) {
        const _ = l.slice(0, n + 1).reverse().findIndex((m) => !ft(m[r.axis]));
        n -= Math.max(0, _);
      }
      n = Bt(n, 0, a - 1);
    }
    if (g) {
      let _ = Math.max(
        // @ts-expect-error Need to type _parsed
        we(l, i.axis, f, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        s ? 0 : we(t, u, i.getPixelForValue(f), !0).hi + 1
      );
      if (d) {
        const m = l.slice(_ - 1).findIndex((p) => !ft(p[r.axis]));
        _ += Math.max(0, m);
      }
      o = Bt(_, n, a) - n;
    } else
      o = a - n;
  }
  return {
    start: n,
    count: o
  };
}
function Er(e) {
  const { xScale: t, yScale: s, _scaleRanges: a } = e, n = {
    xmin: t.min,
    xmax: t.max,
    ymin: s.min,
    ymax: s.max
  };
  if (!a)
    return e._scaleRanges = n, !0;
  const o = a.xmin !== t.min || a.xmax !== t.max || a.ymin !== s.min || a.ymax !== s.max;
  return Object.assign(a, n), o;
}
const ps = (e) => e === 0 || e === 1, on = (e, t, s) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * mt / s)), rn = (e, t, s) => Math.pow(2, -10 * e) * Math.sin((e - t) * mt / s) + 1, Je = {
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
  easeInSine: (e) => -Math.cos(e * Mt) + 1,
  easeOutSine: (e) => Math.sin(e * Mt),
  easeInOutSine: (e) => -0.5 * (Math.cos(pt * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => ps(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => ps(e) ? e : on(e, 0.075, 0.3),
  easeOutElastic: (e) => ps(e) ? e : rn(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return ps(e) ? e : e < 0.5 ? 0.5 * on(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * rn(e * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (e) => 1 - Je.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? Je.easeInBounce(e * 2) * 0.5 : Je.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function Pa(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function ln(e) {
  return Pa(e) ? e : new es(e);
}
function Ks(e) {
  return Pa(e) ? e : new es(e).saturate(0.5).darken(0.1).hexString();
}
const Rr = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], Ir = [
  "color",
  "borderColor",
  "backgroundColor"
];
function Or(e) {
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
      properties: Ir
    },
    numbers: {
      type: "number",
      properties: Rr
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
function zr(e) {
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
const cn = /* @__PURE__ */ new Map();
function Vr(e, t) {
  t = t || {};
  const s = e + JSON.stringify(t);
  let a = cn.get(s);
  return a || (a = new Intl.NumberFormat(e, t), cn.set(s, a)), a;
}
function Ea(e, t, s) {
  return Vr(t, s).format(e);
}
const Nr = {
  values(e) {
    return $t(e) ? e : "" + e;
  },
  numeric(e, t, s) {
    if (e === 0)
      return "0";
    const a = this.chart.options.locale;
    let n, o = e;
    if (s.length > 1) {
      const d = Math.max(Math.abs(s[0].value), Math.abs(s[s.length - 1].value));
      (d < 1e-4 || d > 1e15) && (n = "scientific"), o = Wr(e, s);
    }
    const i = Io(Math.abs(o)), r = isNaN(i) ? 1 : Math.max(Math.min(-1 * Math.floor(i), 20), 0), l = {
      notation: n,
      minimumFractionDigits: r,
      maximumFractionDigits: r
    };
    return Object.assign(l, this.options.ticks.format), Ea(e, a, l);
  }
};
function Wr(e, t) {
  let s = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(s) >= 1 && e !== Math.floor(e) && (s = e - Math.floor(e)), s;
}
var Ho = {
  formatters: Nr
};
function Hr(e) {
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
      tickWidth: (t, s) => s.lineWidth,
      tickColor: (t, s) => s.color,
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
      callback: Ho.formatters.values,
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
const Se = /* @__PURE__ */ Object.create(null), xa = /* @__PURE__ */ Object.create(null);
function ts(e, t) {
  if (!t)
    return e;
  const s = t.split(".");
  for (let a = 0, n = s.length; a < n; ++a) {
    const o = s[a];
    e = e[o] || (e[o] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function Xs(e, t, s) {
  return typeof t == "string" ? ss(ts(e, t), s) : ss(ts(e, ""), t);
}
class jr {
  constructor(t, s) {
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
    }, this.hover = {}, this.hoverBackgroundColor = (a, n) => Ks(n.backgroundColor), this.hoverBorderColor = (a, n) => Ks(n.borderColor), this.hoverColor = (a, n) => Ks(n.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(s);
  }
  set(t, s) {
    return Xs(this, t, s);
  }
  get(t) {
    return ts(this, t);
  }
  describe(t, s) {
    return Xs(xa, t, s);
  }
  override(t, s) {
    return Xs(Se, t, s);
  }
  route(t, s, a, n) {
    const o = ts(this, t), i = ts(this, a), r = "_" + s;
    Object.defineProperties(o, {
      [r]: {
        value: o[s],
        writable: !0
      },
      [s]: {
        enumerable: !0,
        get() {
          const l = this[r], d = i[n];
          return it(l) ? Object.assign({}, d, l) : ot(l, d);
        },
        set(l) {
          this[r] = l;
        }
      }
    });
  }
  apply(t) {
    t.forEach((s) => s(this));
  }
}
var wt = /* @__PURE__ */ new jr({
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
  Or,
  zr,
  Hr
]);
function Yr(e) {
  return !e || ft(e.size) || ft(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function dn(e, t, s, a, n) {
  let o = t[n];
  return o || (o = t[n] = e.measureText(n).width, s.push(n)), o > a && (a = o), a;
}
function me(e, t, s) {
  const a = e.currentDevicePixelRatio, n = s !== 0 ? Math.max(s / 2, 0.5) : 0;
  return Math.round((t - n) * a) / a + n;
}
function un(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function ka(e, t, s, a) {
  jo(e, t, s, a, null);
}
function jo(e, t, s, a, n) {
  let o, i, r, l, d, u, h, f;
  const v = t.pointStyle, g = t.rotation, _ = t.radius;
  let m = (g || 0) * xr;
  if (v && typeof v == "object" && (o = v.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(s, a), e.rotate(m), e.drawImage(v, -v.width / 2, -v.height / 2, v.width, v.height), e.restore();
    return;
  }
  if (!(isNaN(_) || _ <= 0)) {
    switch (e.beginPath(), v) {
      // Default includes circle
      default:
        n ? e.ellipse(s, a, n / 2, _, 0, 0, mt) : e.arc(s, a, _, 0, mt), e.closePath();
        break;
      case "triangle":
        u = n ? n / 2 : _, e.moveTo(s + Math.sin(m) * u, a - Math.cos(m) * _), m += en, e.lineTo(s + Math.sin(m) * u, a - Math.cos(m) * _), m += en, e.lineTo(s + Math.sin(m) * u, a - Math.cos(m) * _), e.closePath();
        break;
      case "rectRounded":
        d = _ * 0.516, l = _ - d, i = Math.cos(m + be) * l, h = Math.cos(m + be) * (n ? n / 2 - d : l), r = Math.sin(m + be) * l, f = Math.sin(m + be) * (n ? n / 2 - d : l), e.arc(s - h, a - r, d, m - pt, m - Mt), e.arc(s + f, a - i, d, m - Mt, m), e.arc(s + h, a + r, d, m, m + Mt), e.arc(s - f, a + i, d, m + Mt, m + pt), e.closePath();
        break;
      case "rect":
        if (!g) {
          l = Math.SQRT1_2 * _, u = n ? n / 2 : l, e.rect(s - u, a - l, 2 * u, 2 * l);
          break;
        }
        m += be;
      /* falls through */
      case "rectRot":
        h = Math.cos(m) * (n ? n / 2 : _), i = Math.cos(m) * _, r = Math.sin(m) * _, f = Math.sin(m) * (n ? n / 2 : _), e.moveTo(s - h, a - r), e.lineTo(s + f, a - i), e.lineTo(s + h, a + r), e.lineTo(s - f, a + i), e.closePath();
        break;
      case "crossRot":
        m += be;
      /* falls through */
      case "cross":
        h = Math.cos(m) * (n ? n / 2 : _), i = Math.cos(m) * _, r = Math.sin(m) * _, f = Math.sin(m) * (n ? n / 2 : _), e.moveTo(s - h, a - r), e.lineTo(s + h, a + r), e.moveTo(s + f, a - i), e.lineTo(s - f, a + i);
        break;
      case "star":
        h = Math.cos(m) * (n ? n / 2 : _), i = Math.cos(m) * _, r = Math.sin(m) * _, f = Math.sin(m) * (n ? n / 2 : _), e.moveTo(s - h, a - r), e.lineTo(s + h, a + r), e.moveTo(s + f, a - i), e.lineTo(s - f, a + i), m += be, h = Math.cos(m) * (n ? n / 2 : _), i = Math.cos(m) * _, r = Math.sin(m) * _, f = Math.sin(m) * (n ? n / 2 : _), e.moveTo(s - h, a - r), e.lineTo(s + h, a + r), e.moveTo(s + f, a - i), e.lineTo(s - f, a + i);
        break;
      case "line":
        i = n ? n / 2 : Math.cos(m) * _, r = Math.sin(m) * _, e.moveTo(s - i, a - r), e.lineTo(s + i, a + r);
        break;
      case "dash":
        e.moveTo(s, a), e.lineTo(s + Math.cos(m) * (n ? n / 2 : _), a + Math.sin(m) * _);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function is(e, t, s) {
  return s = s || 0.5, !t || e && e.x > t.left - s && e.x < t.right + s && e.y > t.top - s && e.y < t.bottom + s;
}
function Is(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function Os(e) {
  e.restore();
}
function qr(e, t, s, a, n) {
  if (!t)
    return e.lineTo(s.x, s.y);
  if (n === "middle") {
    const o = (t.x + s.x) / 2;
    e.lineTo(o, t.y), e.lineTo(o, s.y);
  } else n === "after" != !!a ? e.lineTo(t.x, s.y) : e.lineTo(s.x, t.y);
  e.lineTo(s.x, s.y);
}
function Ur(e, t, s, a) {
  if (!t)
    return e.lineTo(s.x, s.y);
  e.bezierCurveTo(a ? t.cp1x : t.cp2x, a ? t.cp1y : t.cp2y, a ? s.cp2x : s.cp1x, a ? s.cp2y : s.cp1y, s.x, s.y);
}
function Kr(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), ft(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function Xr(e, t, s, a, n) {
  if (n.strikethrough || n.underline) {
    const o = e.measureText(a), i = t - o.actualBoundingBoxLeft, r = t + o.actualBoundingBoxRight, l = s - o.actualBoundingBoxAscent, d = s + o.actualBoundingBoxDescent, u = n.strikethrough ? (l + d) / 2 : d;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = n.decorationWidth || 2, e.moveTo(i, u), e.lineTo(r, u), e.stroke();
  }
}
function Gr(e, t) {
  const s = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = s;
}
function rs(e, t, s, a, n, o = {}) {
  const i = $t(t) ? t : [
    t
  ], r = o.strokeWidth > 0 && o.strokeColor !== "";
  let l, d;
  for (e.save(), e.font = n.string, Kr(e, o), l = 0; l < i.length; ++l)
    d = i[l], o.backdrop && Gr(e, o.backdrop), r && (o.strokeColor && (e.strokeStyle = o.strokeColor), ft(o.strokeWidth) || (e.lineWidth = o.strokeWidth), e.strokeText(d, s, a, o.maxWidth)), e.fillText(d, s, a, o.maxWidth), Xr(e, s, a, d, o), a += Number(n.lineHeight);
  e.restore();
}
function Fs(e, t) {
  const { x: s, y: a, w: n, h: o, radius: i } = t;
  e.arc(s + i.topLeft, a + i.topLeft, i.topLeft, 1.5 * pt, pt, !0), e.lineTo(s, a + o - i.bottomLeft), e.arc(s + i.bottomLeft, a + o - i.bottomLeft, i.bottomLeft, pt, Mt, !0), e.lineTo(s + n - i.bottomRight, a + o), e.arc(s + n - i.bottomRight, a + o - i.bottomRight, i.bottomRight, Mt, 0, !0), e.lineTo(s + n, a + i.topRight), e.arc(s + n - i.topRight, a + i.topRight, i.topRight, 0, -Mt, !0), e.lineTo(s + i.topLeft, a);
}
const Zr = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, Qr = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function Jr(e, t) {
  const s = ("" + e).match(Zr);
  if (!s || s[1] === "normal")
    return t * 1.2;
  switch (e = +s[2], s[3]) {
    case "px":
      return e;
    case "%":
      e /= 100;
      break;
  }
  return t * e;
}
const tl = (e) => +e || 0;
function Ra(e, t) {
  const s = {}, a = it(t), n = a ? Object.keys(t) : t, o = it(e) ? a ? (i) => ot(e[i], e[t[i]]) : (i) => e[i] : () => e;
  for (const i of n)
    s[i] = tl(o(i));
  return s;
}
function Yo(e) {
  return Ra(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function Le(e) {
  return Ra(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function qt(e) {
  const t = Yo(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function Lt(e, t) {
  e = e || {}, t = t || wt.font;
  let s = ot(e.size, t.size);
  typeof s == "string" && (s = parseInt(s, 10));
  let a = ot(e.style, t.style);
  a && !("" + a).match(Qr) && (console.warn('Invalid font style specified: "' + a + '"'), a = void 0);
  const n = {
    family: ot(e.family, t.family),
    lineHeight: Jr(ot(e.lineHeight, t.lineHeight), s),
    size: s,
    style: a,
    weight: ot(e.weight, t.weight),
    string: ""
  };
  return n.string = Yr(n), n;
}
function vs(e, t, s, a) {
  let n, o, i;
  for (n = 0, o = e.length; n < o; ++n)
    if (i = e[n], i !== void 0 && i !== void 0)
      return i;
}
function el(e, t, s) {
  const { min: a, max: n } = e, o = Eo(t, (n - a) / 2), i = (r, l) => s && r === 0 ? 0 : r + l;
  return {
    min: i(a, -Math.abs(o)),
    max: i(n, o)
  };
}
function Ce(e, t) {
  return Object.assign(Object.create(e), t);
}
function Ia(e, t = [
  ""
], s, a, n = () => e[0]) {
  const o = s || e;
  typeof a > "u" && (a = Xo("_fallback", e));
  const i = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: o,
    _fallback: a,
    _getTarget: n,
    override: (r) => Ia([
      r,
      ...e
    ], t, o, a)
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
      return Uo(r, l, () => cl(l, t, e, r));
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
      return fn(r).includes(l);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(r) {
      return fn(r);
    },
    /**
    * A trap for setting property values.
    */
    set(r, l, d) {
      const u = r._storage || (r._storage = n());
      return r[l] = u[l] = d, delete r._keys, !0;
    }
  });
}
function Pe(e, t, s, a) {
  const n = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: s,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: qo(e, a),
    setContext: (o) => Pe(e, o, s, a),
    override: (o) => Pe(e.override(o), t, s, a)
  };
  return new Proxy(n, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(o, i) {
      return delete o[i], delete e[i], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(o, i, r) {
      return Uo(o, i, () => al(o, i, r));
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
    set(o, i, r) {
      return e[i] = r, delete o[i], !0;
    }
  });
}
function qo(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: s = t.scriptable, _indexable: a = t.indexable, _allKeys: n = t.allKeys } = e;
  return {
    allKeys: n,
    scriptable: s,
    indexable: a,
    isScriptable: he(s) ? s : () => s,
    isIndexable: he(a) ? a : () => a
  };
}
const sl = (e, t) => e ? e + Ba(t) : t, Oa = (e, t) => it(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function Uo(e, t, s) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const a = s();
  return e[t] = a, a;
}
function al(e, t, s) {
  const { _proxy: a, _context: n, _subProxy: o, _descriptors: i } = e;
  let r = a[t];
  return he(r) && i.isScriptable(t) && (r = nl(t, r, e, s)), $t(r) && r.length && (r = ol(t, r, e, i.isIndexable)), Oa(t, r) && (r = Pe(r, n, o && o[t], i)), r;
}
function nl(e, t, s, a) {
  const { _proxy: n, _context: o, _subProxy: i, _stack: r } = s;
  if (r.has(e))
    throw new Error("Recursion detected: " + Array.from(r).join("->") + "->" + e);
  r.add(e);
  let l = t(o, i || a);
  return r.delete(e), Oa(e, l) && (l = za(n._scopes, n, e, l)), l;
}
function ol(e, t, s, a) {
  const { _proxy: n, _context: o, _subProxy: i, _descriptors: r } = s;
  if (typeof o.index < "u" && a(e))
    return t[o.index % t.length];
  if (it(t[0])) {
    const l = t, d = n._scopes.filter((u) => u !== l);
    t = [];
    for (const u of l) {
      const h = za(d, n, e, u);
      t.push(Pe(h, o, i && i[e], r));
    }
  }
  return t;
}
function Ko(e, t, s) {
  return he(e) ? e(t, s) : e;
}
const il = (e, t) => e === !0 ? t : typeof e == "string" ? Me(t, e) : void 0;
function rl(e, t, s, a, n) {
  for (const o of t) {
    const i = il(s, o);
    if (i) {
      e.add(i);
      const r = Ko(i._fallback, s, n);
      if (typeof r < "u" && r !== s && r !== a)
        return r;
    } else if (i === !1 && typeof a < "u" && s !== a)
      return null;
  }
  return !1;
}
function za(e, t, s, a) {
  const n = t._rootScopes, o = Ko(t._fallback, s, a), i = [
    ...e,
    ...n
  ], r = /* @__PURE__ */ new Set();
  r.add(a);
  let l = hn(r, i, s, o || s, a);
  return l === null || typeof o < "u" && o !== s && (l = hn(r, i, o, l, a), l === null) ? !1 : Ia(Array.from(r), [
    ""
  ], n, o, () => ll(t, s, a));
}
function hn(e, t, s, a, n) {
  for (; s; )
    s = rl(e, t, s, a, n);
  return s;
}
function ll(e, t, s) {
  const a = e._getTarget();
  t in a || (a[t] = {});
  const n = a[t];
  return $t(n) && it(s) ? s : n || {};
}
function cl(e, t, s, a) {
  let n;
  for (const o of t)
    if (n = Xo(sl(o, e), s), typeof n < "u")
      return Oa(e, n) ? za(s, a, e, n) : n;
}
function Xo(e, t) {
  for (const s of t) {
    if (!s)
      continue;
    const a = s[e];
    if (typeof a < "u")
      return a;
  }
}
function fn(e) {
  let t = e._keys;
  return t || (t = e._keys = dl(e._scopes)), t;
}
function dl(e) {
  const t = /* @__PURE__ */ new Set();
  for (const s of e)
    for (const a of Object.keys(s).filter((n) => !n.startsWith("_")))
      t.add(a);
  return Array.from(t);
}
const ul = Number.EPSILON || 1e-14, Ee = (e, t) => t < e.length && !e[t].skip && e[t], Go = (e) => e === "x" ? "y" : "x";
function hl(e, t, s, a) {
  const n = e.skip ? t : e, o = t, i = s.skip ? t : s, r = _a(o, n), l = _a(i, o);
  let d = r / (r + l), u = l / (r + l);
  d = isNaN(d) ? 0 : d, u = isNaN(u) ? 0 : u;
  const h = a * d, f = a * u;
  return {
    previous: {
      x: o.x - h * (i.x - n.x),
      y: o.y - h * (i.y - n.y)
    },
    next: {
      x: o.x + f * (i.x - n.x),
      y: o.y + f * (i.y - n.y)
    }
  };
}
function fl(e, t, s) {
  const a = e.length;
  let n, o, i, r, l, d = Ee(e, 0);
  for (let u = 0; u < a - 1; ++u)
    if (l = d, d = Ee(e, u + 1), !(!l || !d)) {
      if (Qe(t[u], 0, ul)) {
        s[u] = s[u + 1] = 0;
        continue;
      }
      n = s[u] / t[u], o = s[u + 1] / t[u], r = Math.pow(n, 2) + Math.pow(o, 2), !(r <= 9) && (i = 3 / Math.sqrt(r), s[u] = n * i * t[u], s[u + 1] = o * i * t[u]);
    }
}
function gl(e, t, s = "x") {
  const a = Go(s), n = e.length;
  let o, i, r, l = Ee(e, 0);
  for (let d = 0; d < n; ++d) {
    if (i = r, r = l, l = Ee(e, d + 1), !r)
      continue;
    const u = r[s], h = r[a];
    i && (o = (u - i[s]) / 3, r[`cp1${s}`] = u - o, r[`cp1${a}`] = h - o * t[d]), l && (o = (l[s] - u) / 3, r[`cp2${s}`] = u + o, r[`cp2${a}`] = h + o * t[d]);
  }
}
function pl(e, t = "x") {
  const s = Go(t), a = e.length, n = Array(a).fill(0), o = Array(a);
  let i, r, l, d = Ee(e, 0);
  for (i = 0; i < a; ++i)
    if (r = l, l = d, d = Ee(e, i + 1), !!l) {
      if (d) {
        const u = d[t] - l[t];
        n[i] = u !== 0 ? (d[s] - l[s]) / u : 0;
      }
      o[i] = r ? d ? Zt(n[i - 1]) !== Zt(n[i]) ? 0 : (n[i - 1] + n[i]) / 2 : n[i - 1] : n[i];
    }
  fl(e, n, o), gl(e, o, t);
}
function bs(e, t, s) {
  return Math.max(Math.min(e, s), t);
}
function vl(e, t) {
  let s, a, n, o, i, r = is(e[0], t);
  for (s = 0, a = e.length; s < a; ++s)
    i = o, o = r, r = s < a - 1 && is(e[s + 1], t), o && (n = e[s], i && (n.cp1x = bs(n.cp1x, t.left, t.right), n.cp1y = bs(n.cp1y, t.top, t.bottom)), r && (n.cp2x = bs(n.cp2x, t.left, t.right), n.cp2y = bs(n.cp2y, t.top, t.bottom)));
}
function bl(e, t, s, a, n) {
  let o, i, r, l;
  if (t.spanGaps && (e = e.filter((d) => !d.skip)), t.cubicInterpolationMode === "monotone")
    pl(e, n);
  else {
    let d = a ? e[e.length - 1] : e[0];
    for (o = 0, i = e.length; o < i; ++o)
      r = e[o], l = hl(d, r, e[Math.min(o + 1, i - (a ? 0 : 1)) % i], t.tension), r.cp1x = l.previous.x, r.cp1y = l.previous.y, r.cp2x = l.next.x, r.cp2y = l.next.y, d = r;
  }
  t.capBezierPoints && vl(e, s);
}
function Va() {
  return typeof window < "u" && typeof document < "u";
}
function Na(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function Ps(e, t, s) {
  let a;
  return typeof e == "string" ? (a = parseInt(e, 10), e.indexOf("%") !== -1 && (a = a / 100 * t.parentNode[s])) : a = e, a;
}
const zs = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function ml(e, t) {
  return zs(e).getPropertyValue(t);
}
const yl = [
  "top",
  "right",
  "bottom",
  "left"
];
function $e(e, t, s) {
  const a = {};
  s = s ? "-" + s : "";
  for (let n = 0; n < 4; n++) {
    const o = yl[n];
    a[o] = parseFloat(e[t + "-" + o + s]) || 0;
  }
  return a.width = a.left + a.right, a.height = a.top + a.bottom, a;
}
const _l = (e, t, s) => (e > 0 || t > 0) && (!s || !s.shadowRoot);
function xl(e, t) {
  const s = e.touches, a = s && s.length ? s[0] : e, { offsetX: n, offsetY: o } = a;
  let i = !1, r, l;
  if (_l(n, o, e.target))
    r = n, l = o;
  else {
    const d = t.getBoundingClientRect();
    r = a.clientX - d.left, l = a.clientY - d.top, i = !0;
  }
  return {
    x: r,
    y: l,
    box: i
  };
}
function xe(e, t) {
  if ("native" in e)
    return e;
  const { canvas: s, currentDevicePixelRatio: a } = t, n = zs(s), o = n.boxSizing === "border-box", i = $e(n, "padding"), r = $e(n, "border", "width"), { x: l, y: d, box: u } = xl(e, s), h = i.left + (u && r.left), f = i.top + (u && r.top);
  let { width: v, height: g } = t;
  return o && (v -= i.width + r.width, g -= i.height + r.height), {
    x: Math.round((l - h) / v * s.width / a),
    y: Math.round((d - f) / g * s.height / a)
  };
}
function kl(e, t, s) {
  let a, n;
  if (t === void 0 || s === void 0) {
    const o = e && Na(e);
    if (!o)
      t = e.clientWidth, s = e.clientHeight;
    else {
      const i = o.getBoundingClientRect(), r = zs(o), l = $e(r, "border", "width"), d = $e(r, "padding");
      t = i.width - d.width - l.width, s = i.height - d.height - l.height, a = Ps(r.maxWidth, o, "clientWidth"), n = Ps(r.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: t,
    height: s,
    maxWidth: a || Ls,
    maxHeight: n || Ls
  };
}
const le = (e) => Math.round(e * 10) / 10;
function wl(e, t, s, a) {
  const n = zs(e), o = $e(n, "margin"), i = Ps(n.maxWidth, e, "clientWidth") || Ls, r = Ps(n.maxHeight, e, "clientHeight") || Ls, l = kl(e, t, s);
  let { width: d, height: u } = l;
  if (n.boxSizing === "content-box") {
    const f = $e(n, "border", "width"), v = $e(n, "padding");
    d -= v.width + f.width, u -= v.height + f.height;
  }
  return d = Math.max(0, d - o.width), u = Math.max(0, a ? d / a : u - o.height), d = le(Math.min(d, i, l.maxWidth)), u = le(Math.min(u, r, l.maxHeight)), d && !u && (u = le(d / 2)), (t !== void 0 || s !== void 0) && a && l.height && u > l.height && (u = l.height, d = le(Math.floor(u * a))), {
    width: d,
    height: u
  };
}
function gn(e, t, s) {
  const a = t || 1, n = le(e.height * a), o = le(e.width * a);
  e.height = le(e.height), e.width = le(e.width);
  const i = e.canvas;
  return i.style && (s || !i.style.height && !i.style.width) && (i.style.height = `${e.height}px`, i.style.width = `${e.width}px`), e.currentDevicePixelRatio !== a || i.height !== n || i.width !== o ? (e.currentDevicePixelRatio = a, i.height = n, i.width = o, e.ctx.setTransform(a, 0, 0, a, 0, 0), !0) : !1;
}
const $l = (function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    Va() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function pn(e, t) {
  const s = ml(e, t), a = s && s.match(/^(\d+)(\.\d+)?px$/);
  return a ? +a[1] : void 0;
}
function ke(e, t, s, a) {
  return {
    x: e.x + s * (t.x - e.x),
    y: e.y + s * (t.y - e.y)
  };
}
function Ml(e, t, s, a) {
  return {
    x: e.x + s * (t.x - e.x),
    y: a === "middle" ? s < 0.5 ? e.y : t.y : a === "after" ? s < 1 ? e.y : t.y : s > 0 ? t.y : e.y
  };
}
function Sl(e, t, s, a) {
  const n = {
    x: e.cp2x,
    y: e.cp2y
  }, o = {
    x: t.cp1x,
    y: t.cp1y
  }, i = ke(e, n, s), r = ke(n, o, s), l = ke(o, t, s), d = ke(i, r, s), u = ke(r, l, s);
  return ke(d, u, s);
}
const Cl = function(e, t) {
  return {
    x(s) {
      return e + e + t - s;
    },
    setWidth(s) {
      t = s;
    },
    textAlign(s) {
      return s === "center" ? s : s === "right" ? "left" : "right";
    },
    xPlus(s, a) {
      return s - a;
    },
    leftForLtr(s, a) {
      return s - a;
    }
  };
}, Dl = function() {
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
function Fe(e, t, s) {
  return e ? Cl(t, s) : Dl();
}
function Zo(e, t) {
  let s, a;
  (t === "ltr" || t === "rtl") && (s = e.canvas.style, a = [
    s.getPropertyValue("direction"),
    s.getPropertyPriority("direction")
  ], s.setProperty("direction", t, "important"), e.prevTextDirection = a);
}
function Qo(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function Jo(e) {
  return e === "angle" ? {
    between: os,
    compare: Cr,
    normalize: Ot
  } : {
    between: ae,
    compare: (t, s) => t - s,
    normalize: (t) => t
  };
}
function vn({ start: e, end: t, count: s, loop: a, style: n }) {
  return {
    start: e % s,
    end: t % s,
    loop: a && (t - e + 1) % s === 0,
    style: n
  };
}
function Al(e, t, s) {
  const { property: a, start: n, end: o } = s, { between: i, normalize: r } = Jo(a), l = t.length;
  let { start: d, end: u, loop: h } = e, f, v;
  if (h) {
    for (d += l, u += l, f = 0, v = l; f < v && i(r(t[d % l][a]), n, o); ++f)
      d--, u--;
    d %= l, u %= l;
  }
  return u < d && (u += l), {
    start: d,
    end: u,
    loop: h,
    style: e.style
  };
}
function ti(e, t, s) {
  if (!s)
    return [
      e
    ];
  const { property: a, start: n, end: o } = s, i = t.length, { compare: r, between: l, normalize: d } = Jo(a), { start: u, end: h, loop: f, style: v } = Al(e, t, s), g = [];
  let _ = !1, m = null, p, b, $;
  const k = () => l(n, $, p) && r(n, $) !== 0, w = () => r(o, p) === 0 || l(o, $, p), S = () => _ || k(), C = () => !_ || w();
  for (let A = u, P = u; A <= h; ++A)
    b = t[A % i], !b.skip && (p = d(b[a]), p !== $ && (_ = l(p, n, o), m === null && S() && (m = r(p, n) === 0 ? A : P), m !== null && C() && (g.push(vn({
      start: m,
      end: A,
      loop: f,
      count: i,
      style: v
    })), m = null), P = A, $ = p));
  return m !== null && g.push(vn({
    start: m,
    end: h,
    loop: f,
    count: i,
    style: v
  })), g;
}
function ei(e, t) {
  const s = [], a = e.segments;
  for (let n = 0; n < a.length; n++) {
    const o = ti(a[n], e.points, t);
    o.length && s.push(...o);
  }
  return s;
}
function Tl(e, t, s, a) {
  let n = 0, o = t - 1;
  if (s && !a)
    for (; n < t && !e[n].skip; )
      n++;
  for (; n < t && e[n].skip; )
    n++;
  for (n %= t, s && (o += n); o > n && e[o % t].skip; )
    o--;
  return o %= t, {
    start: n,
    end: o
  };
}
function Bl(e, t, s, a) {
  const n = e.length, o = [];
  let i = t, r = e[t], l;
  for (l = t + 1; l <= s; ++l) {
    const d = e[l % n];
    d.skip || d.stop ? r.skip || (a = !1, o.push({
      start: t % n,
      end: (l - 1) % n,
      loop: a
    }), t = i = d.stop ? l : null) : (i = l, r.skip && (t = l)), r = d;
  }
  return i !== null && o.push({
    start: t % n,
    end: i % n,
    loop: a
  }), o;
}
function Ll(e, t) {
  const s = e.points, a = e.options.spanGaps, n = s.length;
  if (!n)
    return [];
  const o = !!e._loop, { start: i, end: r } = Tl(s, n, o, a);
  if (a === !0)
    return bn(e, [
      {
        start: i,
        end: r,
        loop: o
      }
    ], s, t);
  const l = r < i ? r + n : r, d = !!e._fullLoop && i === 0 && r === n - 1;
  return bn(e, Bl(s, i, l, d), s, t);
}
function bn(e, t, s, a) {
  return !a || !a.setContext || !s ? t : Fl(e, t, s, a);
}
function Fl(e, t, s, a) {
  const n = e._chart.getContext(), o = mn(e.options), { _datasetIndex: i, options: { spanGaps: r } } = e, l = s.length, d = [];
  let u = o, h = t[0].start, f = h;
  function v(g, _, m, p) {
    const b = r ? -1 : 1;
    if (g !== _) {
      for (g += l; s[g % l].skip; )
        g -= b;
      for (; s[_ % l].skip; )
        _ += b;
      g % l !== _ % l && (d.push({
        start: g % l,
        end: _ % l,
        loop: m,
        style: p
      }), u = p, h = _ % l);
    }
  }
  for (const g of t) {
    h = r ? h : g.start;
    let _ = s[h % l], m;
    for (f = h + 1; f <= g.end; f++) {
      const p = s[f % l];
      m = mn(a.setContext(Ce(n, {
        type: "segment",
        p0: _,
        p1: p,
        p0DataIndex: (f - 1) % l,
        p1DataIndex: f % l,
        datasetIndex: i
      }))), Pl(m, u) && v(h, f - 1, g.loop, u), _ = p, u = m;
    }
    h < f - 1 && v(h, f - 1, g.loop, u);
  }
  return d;
}
function mn(e) {
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
function Pl(e, t) {
  if (!t)
    return !1;
  const s = [], a = function(n, o) {
    return Pa(o) ? (s.includes(o) || s.push(o), s.indexOf(o)) : o;
  };
  return JSON.stringify(e, a) !== JSON.stringify(t, a);
}
function ms(e, t, s) {
  return e.options.clip ? e[s] : t[s];
}
function El(e, t) {
  const { xScale: s, yScale: a } = e;
  return s && a ? {
    left: ms(s, t, "left"),
    right: ms(s, t, "right"),
    top: ms(a, t, "top"),
    bottom: ms(a, t, "bottom")
  } : t;
}
function si(e, t) {
  const s = t._clip;
  if (s.disabled)
    return !1;
  const a = El(t, e.chartArea);
  return {
    left: s.left === !1 ? 0 : a.left - (s.left === !0 ? 0 : s.left),
    right: s.right === !1 ? e.width : a.right + (s.right === !0 ? 0 : s.right),
    top: s.top === !1 ? 0 : a.top - (s.top === !0 ? 0 : s.top),
    bottom: s.bottom === !1 ? e.height : a.bottom + (s.bottom === !0 ? 0 : s.bottom)
  };
}
class Rl {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(t, s, a, n) {
    const o = s.listeners[n], i = s.duration;
    o.forEach((r) => r({
      chart: t,
      initial: s.initial,
      numSteps: i,
      currentStep: Math.min(a - s.start, i)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = No.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let s = 0;
    this._charts.forEach((a, n) => {
      if (!a.running || !a.items.length)
        return;
      const o = a.items;
      let i = o.length - 1, r = !1, l;
      for (; i >= 0; --i)
        l = o[i], l._active ? (l._total > a.duration && (a.duration = l._total), l.tick(t), r = !0) : (o[i] = o[o.length - 1], o.pop());
      r && (n.draw(), this._notify(n, a, t, "progress")), o.length || (a.running = !1, this._notify(n, a, t, "complete"), a.initial = !1), s += o.length;
    }), this._lastDate = t, s === 0 && (this._running = !1);
  }
  _getAnims(t) {
    const s = this._charts;
    let a = s.get(t);
    return a || (a = {
      running: !1,
      initial: !0,
      items: [],
      listeners: {
        complete: [],
        progress: []
      }
    }, s.set(t, a)), a;
  }
  listen(t, s, a) {
    this._getAnims(t).listeners[s].push(a);
  }
  add(t, s) {
    !s || !s.length || this._getAnims(t).items.push(...s);
  }
  has(t) {
    return this._getAnims(t).items.length > 0;
  }
  start(t) {
    const s = this._charts.get(t);
    s && (s.running = !0, s.start = Date.now(), s.duration = s.items.reduce((a, n) => Math.max(a, n._duration), 0), this._refresh());
  }
  running(t) {
    if (!this._running)
      return !1;
    const s = this._charts.get(t);
    return !(!s || !s.running || !s.items.length);
  }
  stop(t) {
    const s = this._charts.get(t);
    if (!s || !s.items.length)
      return;
    const a = s.items;
    let n = a.length - 1;
    for (; n >= 0; --n)
      a[n].cancel();
    s.items = [], this._notify(t, s, Date.now(), "complete");
  }
  remove(t) {
    return this._charts.delete(t);
  }
}
var Jt = /* @__PURE__ */ new Rl();
const yn = "transparent", Il = {
  boolean(e, t, s) {
    return s > 0.5 ? t : e;
  },
  color(e, t, s) {
    const a = ln(e || yn), n = a.valid && ln(t || yn);
    return n && n.valid ? n.mix(a, s).hexString() : t;
  },
  number(e, t, s) {
    return e + (t - e) * s;
  }
};
class Ol {
  constructor(t, s, a, n) {
    const o = s[a];
    n = vs([
      t.to,
      n,
      o,
      t.from
    ]);
    const i = vs([
      t.from,
      o,
      n
    ]);
    this._active = !0, this._fn = t.fn || Il[t.type || typeof i], this._easing = Je[t.easing] || Je.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = s, this._prop = a, this._from = i, this._to = n, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, s, a) {
    if (this._active) {
      this._notify(!1);
      const n = this._target[this._prop], o = a - this._start, i = this._duration - o;
      this._start = a, this._duration = Math.floor(Math.max(i, t.duration)), this._total += o, this._loop = !!t.loop, this._to = vs([
        t.to,
        s,
        n,
        t.from
      ]), this._from = vs([
        t.from,
        n,
        s
      ]);
    }
  }
  cancel() {
    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
  }
  tick(t) {
    const s = t - this._start, a = this._duration, n = this._prop, o = this._from, i = this._loop, r = this._to;
    let l;
    if (this._active = o !== r && (i || s < a), !this._active) {
      this._target[n] = r, this._notify(!0);
      return;
    }
    if (s < 0) {
      this._target[n] = o;
      return;
    }
    l = s / a % 2, l = i && l > 1 ? 2 - l : l, l = this._easing(Math.min(1, Math.max(0, l))), this._target[n] = this._fn(o, r, l);
  }
  wait() {
    const t = this._promises || (this._promises = []);
    return new Promise((s, a) => {
      t.push({
        res: s,
        rej: a
      });
    });
  }
  _notify(t) {
    const s = t ? "res" : "rej", a = this._promises || [];
    for (let n = 0; n < a.length; n++)
      a[n][s]();
  }
}
class ai {
  constructor(t, s) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(s);
  }
  configure(t) {
    if (!it(t))
      return;
    const s = Object.keys(wt.animation), a = this._properties;
    Object.getOwnPropertyNames(t).forEach((n) => {
      const o = t[n];
      if (!it(o))
        return;
      const i = {};
      for (const r of s)
        i[r] = o[r];
      ($t(o.properties) && o.properties || [
        n
      ]).forEach((r) => {
        (r === n || !a.has(r)) && a.set(r, i);
      });
    });
  }
  _animateOptions(t, s) {
    const a = s.options, n = Vl(t, a);
    if (!n)
      return [];
    const o = this._createAnimations(n, a);
    return a.$shared && zl(t.options.$animations, a).then(() => {
      t.options = a;
    }, () => {
    }), o;
  }
  _createAnimations(t, s) {
    const a = this._properties, n = [], o = t.$animations || (t.$animations = {}), i = Object.keys(s), r = Date.now();
    let l;
    for (l = i.length - 1; l >= 0; --l) {
      const d = i[l];
      if (d.charAt(0) === "$")
        continue;
      if (d === "options") {
        n.push(...this._animateOptions(t, s));
        continue;
      }
      const u = s[d];
      let h = o[d];
      const f = a.get(d);
      if (h)
        if (f && h.active()) {
          h.update(f, u, r);
          continue;
        } else
          h.cancel();
      if (!f || !f.duration) {
        t[d] = u;
        continue;
      }
      o[d] = h = new Ol(f, t, d, u), n.push(h);
    }
    return n;
  }
  update(t, s) {
    if (this._properties.size === 0) {
      Object.assign(t, s);
      return;
    }
    const a = this._createAnimations(t, s);
    if (a.length)
      return Jt.add(this._chart, a), !0;
  }
}
function zl(e, t) {
  const s = [], a = Object.keys(t);
  for (let n = 0; n < a.length; n++) {
    const o = e[a[n]];
    o && o.active() && s.push(o.wait());
  }
  return Promise.all(s);
}
function Vl(e, t) {
  if (!t)
    return;
  let s = e.options;
  if (!s) {
    e.options = t;
    return;
  }
  return s.$shared && (e.options = s = Object.assign({}, s, {
    $shared: !1,
    $animations: {}
  })), s;
}
function _n(e, t) {
  const s = e && e.options || {}, a = s.reverse, n = s.min === void 0 ? t : 0, o = s.max === void 0 ? t : 0;
  return {
    start: a ? o : n,
    end: a ? n : o
  };
}
function Nl(e, t, s) {
  if (s === !1)
    return !1;
  const a = _n(e, s), n = _n(t, s);
  return {
    top: n.end,
    right: a.end,
    bottom: n.start,
    left: a.start
  };
}
function Wl(e) {
  let t, s, a, n;
  return it(e) ? (t = e.top, s = e.right, a = e.bottom, n = e.left) : t = s = a = n = e, {
    top: t,
    right: s,
    bottom: a,
    left: n,
    disabled: e === !1
  };
}
function ni(e, t) {
  const s = [], a = e._getSortedDatasetMetas(t);
  let n, o;
  for (n = 0, o = a.length; n < o; ++n)
    s.push(a[n].index);
  return s;
}
function xn(e, t, s, a = {}) {
  const n = e.keys, o = a.mode === "single";
  let i, r, l, d;
  if (t === null)
    return;
  let u = !1;
  for (i = 0, r = n.length; i < r; ++i) {
    if (l = +n[i], l === s) {
      if (u = !0, a.all)
        continue;
      break;
    }
    d = e.values[l], Ft(d) && (o || t === 0 || Zt(t) === Zt(d)) && (t += d);
  }
  return !u && !a.all ? 0 : t;
}
function Hl(e, t) {
  const { iScale: s, vScale: a } = t, n = s.axis === "x" ? "x" : "y", o = a.axis === "x" ? "x" : "y", i = Object.keys(e), r = new Array(i.length);
  let l, d, u;
  for (l = 0, d = i.length; l < d; ++l)
    u = i[l], r[l] = {
      [n]: u,
      [o]: e[u]
    };
  return r;
}
function Gs(e, t) {
  const s = e && e.options.stacked;
  return s || s === void 0 && t.stack !== void 0;
}
function jl(e, t, s) {
  return `${e.id}.${t.id}.${s.stack || s.type}`;
}
function Yl(e) {
  const { min: t, max: s, minDefined: a, maxDefined: n } = e.getUserBounds();
  return {
    min: a ? t : Number.NEGATIVE_INFINITY,
    max: n ? s : Number.POSITIVE_INFINITY
  };
}
function ql(e, t, s) {
  const a = e[t] || (e[t] = {});
  return a[s] || (a[s] = {});
}
function kn(e, t, s, a) {
  for (const n of t.getMatchingVisibleMetas(a).reverse()) {
    const o = e[n.index];
    if (s && o > 0 || !s && o < 0)
      return n.index;
  }
  return null;
}
function wn(e, t) {
  const { chart: s, _cachedMeta: a } = e, n = s._stacks || (s._stacks = {}), { iScale: o, vScale: i, index: r } = a, l = o.axis, d = i.axis, u = jl(o, i, a), h = t.length;
  let f;
  for (let v = 0; v < h; ++v) {
    const g = t[v], { [l]: _, [d]: m } = g, p = g._stacks || (g._stacks = {});
    f = p[d] = ql(n, u, _), f[r] = m, f._top = kn(f, i, !0, a.type), f._bottom = kn(f, i, !1, a.type);
    const b = f._visualValues || (f._visualValues = {});
    b[r] = m;
  }
}
function Zs(e, t) {
  const s = e.scales;
  return Object.keys(s).filter((a) => s[a].axis === t).shift();
}
function Ul(e, t) {
  return Ce(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function Kl(e, t, s) {
  return Ce(e, {
    active: !1,
    dataIndex: t,
    parsed: void 0,
    raw: void 0,
    element: s,
    index: t,
    mode: "default",
    type: "data"
  });
}
function ze(e, t) {
  const s = e.controller.index, a = e.vScale && e.vScale.axis;
  if (a) {
    t = t || e._parsed;
    for (const n of t) {
      const o = n._stacks;
      if (!o || o[a] === void 0 || o[a][s] === void 0)
        return;
      delete o[a][s], o[a]._visualValues !== void 0 && o[a]._visualValues[s] !== void 0 && delete o[a]._visualValues[s];
    }
  }
}
const Qs = (e) => e === "reset" || e === "none", $n = (e, t) => t ? e : Object.assign({}, e), Xl = (e, t, s) => e && !t.hidden && t._stacked && {
  keys: ni(s, !0),
  values: null
};
class Vs {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(t, s) {
    this.chart = t, this._ctx = t.ctx, this.index = s, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = Gs(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && ze(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, s = this._cachedMeta, a = this.getDataset(), n = (h, f, v, g) => h === "x" ? f : h === "r" ? g : v, o = s.xAxisID = ot(a.xAxisID, Zs(t, "x")), i = s.yAxisID = ot(a.yAxisID, Zs(t, "y")), r = s.rAxisID = ot(a.rAxisID, Zs(t, "r")), l = s.indexAxis, d = s.iAxisID = n(l, o, i, r), u = s.vAxisID = n(l, i, o, r);
    s.xScale = this.getScaleForId(o), s.yScale = this.getScaleForId(i), s.rScale = this.getScaleForId(r), s.iScale = this.getScaleForId(d), s.vScale = this.getScaleForId(u);
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
    const s = this._cachedMeta;
    return t === s.iScale ? s.vScale : s.iScale;
  }
  reset() {
    this._update("reset");
  }
  _destroy() {
    const t = this._cachedMeta;
    this._data && nn(this._data, this), t._stacked && ze(t);
  }
  _dataCheck() {
    const t = this.getDataset(), s = t.data || (t.data = []), a = this._data;
    if (it(s)) {
      const n = this._cachedMeta;
      this._data = Hl(s, n);
    } else if (a !== s) {
      if (a) {
        nn(a, this);
        const n = this._cachedMeta;
        ze(n), n._parsed = [];
      }
      s && Object.isExtensible(s) && Br(s, this), this._syncList = [], this._data = s;
    }
  }
  addElements() {
    const t = this._cachedMeta;
    this._dataCheck(), this.datasetElementType && (t.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(t) {
    const s = this._cachedMeta, a = this.getDataset();
    let n = !1;
    this._dataCheck();
    const o = s._stacked;
    s._stacked = Gs(s.vScale, s), s.stack !== a.stack && (n = !0, ze(s), s.stack = a.stack), this._resyncElements(t), (n || o !== s._stacked) && (wn(this, s._parsed), s._stacked = Gs(s.vScale, s));
  }
  configure() {
    const t = this.chart.config, s = t.datasetScopeKeys(this._type), a = t.getOptionScopes(this.getDataset(), s, !0);
    this.options = t.createResolver(a, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, s) {
    const { _cachedMeta: a, _data: n } = this, { iScale: o, _stacked: i } = a, r = o.axis;
    let l = t === 0 && s === n.length ? !0 : a._sorted, d = t > 0 && a._parsed[t - 1], u, h, f;
    if (this._parsing === !1)
      a._parsed = n, a._sorted = !0, f = n;
    else {
      $t(n[t]) ? f = this.parseArrayData(a, n, t, s) : it(n[t]) ? f = this.parseObjectData(a, n, t, s) : f = this.parsePrimitiveData(a, n, t, s);
      const v = () => h[r] === null || d && h[r] < d[r];
      for (u = 0; u < s; ++u)
        a._parsed[u + t] = h = f[u], l && (v() && (l = !1), d = h);
      a._sorted = l;
    }
    i && wn(this, f);
  }
  parsePrimitiveData(t, s, a, n) {
    const { iScale: o, vScale: i } = t, r = o.axis, l = i.axis, d = o.getLabels(), u = o === i, h = new Array(n);
    let f, v, g;
    for (f = 0, v = n; f < v; ++f)
      g = f + a, h[f] = {
        [r]: u || o.parse(d[g], g),
        [l]: i.parse(s[g], g)
      };
    return h;
  }
  parseArrayData(t, s, a, n) {
    const { xScale: o, yScale: i } = t, r = new Array(n);
    let l, d, u, h;
    for (l = 0, d = n; l < d; ++l)
      u = l + a, h = s[u], r[l] = {
        x: o.parse(h[0], u),
        y: i.parse(h[1], u)
      };
    return r;
  }
  parseObjectData(t, s, a, n) {
    const { xScale: o, yScale: i } = t, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, d = new Array(n);
    let u, h, f, v;
    for (u = 0, h = n; u < h; ++u)
      f = u + a, v = s[f], d[u] = {
        x: o.parse(Me(v, r), f),
        y: i.parse(Me(v, l), f)
      };
    return d;
  }
  getParsed(t) {
    return this._cachedMeta._parsed[t];
  }
  getDataElement(t) {
    return this._cachedMeta.data[t];
  }
  applyStack(t, s, a) {
    const n = this.chart, o = this._cachedMeta, i = s[t.axis], r = {
      keys: ni(n, !0),
      values: s._stacks[t.axis]._visualValues
    };
    return xn(r, i, o.index, {
      mode: a
    });
  }
  updateRangeFromParsed(t, s, a, n) {
    const o = a[s.axis];
    let i = o === null ? NaN : o;
    const r = n && a._stacks[s.axis];
    n && r && (n.values = r, i = xn(n, o, this._cachedMeta.index)), t.min = Math.min(t.min, i), t.max = Math.max(t.max, i);
  }
  getMinMax(t, s) {
    const a = this._cachedMeta, n = a._parsed, o = a._sorted && t === a.iScale, i = n.length, r = this._getOtherScale(t), l = Xl(s, a, this.chart), d = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: u, max: h } = Yl(r);
    let f, v;
    function g() {
      v = n[f];
      const _ = v[r.axis];
      return !Ft(v[t.axis]) || u > _ || h < _;
    }
    for (f = 0; f < i && !(!g() && (this.updateRangeFromParsed(d, t, v, l), o)); ++f)
      ;
    if (o) {
      for (f = i - 1; f >= 0; --f)
        if (!g()) {
          this.updateRangeFromParsed(d, t, v, l);
          break;
        }
    }
    return d;
  }
  getAllParsedValues(t) {
    const s = this._cachedMeta._parsed, a = [];
    let n, o, i;
    for (n = 0, o = s.length; n < o; ++n)
      i = s[n][t.axis], Ft(i) && a.push(i);
    return a;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(t) {
    const s = this._cachedMeta, a = s.iScale, n = s.vScale, o = this.getParsed(t);
    return {
      label: a ? "" + a.getLabelForValue(o[a.axis]) : "",
      value: n ? "" + n.getLabelForValue(o[n.axis]) : ""
    };
  }
  _update(t) {
    const s = this._cachedMeta;
    this.update(t || "default"), s._clip = Wl(ot(this.options.clip, Nl(s.xScale, s.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, s = this.chart, a = this._cachedMeta, n = a.data || [], o = s.chartArea, i = [], r = this._drawStart || 0, l = this._drawCount || n.length - r, d = this.options.drawActiveElementsOnTop;
    let u;
    for (a.dataset && a.dataset.draw(t, o, r, l), u = r; u < r + l; ++u) {
      const h = n[u];
      h.hidden || (h.active && d ? i.push(h) : h.draw(t, o));
    }
    for (u = 0; u < i.length; ++u)
      i[u].draw(t, o);
  }
  getStyle(t, s) {
    const a = s ? "active" : "default";
    return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(a) : this.resolveDataElementOptions(t || 0, a);
  }
  getContext(t, s, a) {
    const n = this.getDataset();
    let o;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const i = this._cachedMeta.data[t];
      o = i.$context || (i.$context = Kl(this.getContext(), t, i)), o.parsed = this.getParsed(t), o.raw = n.data[t], o.index = o.dataIndex = t;
    } else
      o = this.$context || (this.$context = Ul(this.chart.getContext(), this.index)), o.dataset = n, o.index = o.datasetIndex = this.index;
    return o.active = !!s, o.mode = a, o;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, s) {
    return this._resolveElementOptions(this.dataElementType.id, s, t);
  }
  _resolveElementOptions(t, s = "default", a) {
    const n = s === "active", o = this._cachedDataOpts, i = t + "-" + s, r = o[i], l = this.enableOptionSharing && as(a);
    if (r)
      return $n(r, l);
    const d = this.chart.config, u = d.datasetElementScopeKeys(this._type, t), h = n ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], f = d.getOptionScopes(this.getDataset(), u), v = Object.keys(wt.elements[t]), g = () => this.getContext(a, n, s), _ = d.resolveNamedOptions(f, v, g, h);
    return _.$shared && (_.$shared = l, o[i] = Object.freeze($n(_, l))), _;
  }
  _resolveAnimations(t, s, a) {
    const n = this.chart, o = this._cachedDataOpts, i = `animation-${s}`, r = o[i];
    if (r)
      return r;
    let l;
    if (n.options.animation !== !1) {
      const u = this.chart.config, h = u.datasetAnimationScopeKeys(this._type, s), f = u.getOptionScopes(this.getDataset(), h);
      l = u.createResolver(f, this.getContext(t, a, s));
    }
    const d = new ai(n, l && l.animations);
    return l && l._cacheable && (o[i] = Object.freeze(d)), d;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, s) {
    return !s || Qs(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, s) {
    const a = this.resolveDataElementOptions(t, s), n = this._sharedOptions, o = this.getSharedOptions(a), i = this.includeOptions(s, o) || o !== n;
    return this.updateSharedOptions(o, s, a), {
      sharedOptions: o,
      includeOptions: i
    };
  }
  updateElement(t, s, a, n) {
    Qs(n) ? Object.assign(t, a) : this._resolveAnimations(s, n).update(t, a);
  }
  updateSharedOptions(t, s, a) {
    t && !Qs(s) && this._resolveAnimations(void 0, s).update(t, a);
  }
  _setStyle(t, s, a, n) {
    t.active = n;
    const o = this.getStyle(s, n);
    this._resolveAnimations(s, a, n).update(t, {
      options: !n && this.getSharedOptions(o) || o
    });
  }
  removeHoverStyle(t, s, a) {
    this._setStyle(t, a, "active", !1);
  }
  setHoverStyle(t, s, a) {
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
    const s = this._data, a = this._cachedMeta.data;
    for (const [r, l, d] of this._syncList)
      this[r](l, d);
    this._syncList = [];
    const n = a.length, o = s.length, i = Math.min(o, n);
    i && this.parse(0, i), o > n ? this._insertElements(n, o - n, t) : o < n && this._removeElements(o, n - o);
  }
  _insertElements(t, s, a = !0) {
    const n = this._cachedMeta, o = n.data, i = t + s;
    let r;
    const l = (d) => {
      for (d.length += s, r = d.length - 1; r >= i; r--)
        d[r] = d[r - s];
    };
    for (l(o), r = t; r < i; ++r)
      o[r] = new this.dataElementType();
    this._parsing && l(n._parsed), this.parse(t, s), a && this.updateElements(o, t, s, "reset");
  }
  updateElements(t, s, a, n) {
  }
  _removeElements(t, s) {
    const a = this._cachedMeta;
    if (this._parsing) {
      const n = a._parsed.splice(t, s);
      a._stacked && ze(a, n);
    }
    a.data.splice(t, s);
  }
  _sync(t) {
    if (this._parsing)
      this._syncList.push(t);
    else {
      const [s, a, n] = t;
      this[s](a, n);
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
  _onDataSplice(t, s) {
    s && this._sync([
      "_removeElements",
      t,
      s
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
function Gl(e, t) {
  if (!e._cache.$bar) {
    const s = e.getMatchingVisibleMetas(t);
    let a = [];
    for (let n = 0, o = s.length; n < o; n++)
      a = a.concat(s[n].controller.getAllParsedValues(e));
    e._cache.$bar = Vo(a.sort((n, o) => n - o));
  }
  return e._cache.$bar;
}
function Zl(e) {
  const t = e.iScale, s = Gl(t, e.type);
  let a = t._length, n, o, i, r;
  const l = () => {
    i === 32767 || i === -32768 || (as(r) && (a = Math.min(a, Math.abs(i - r) || a)), r = i);
  };
  for (n = 0, o = s.length; n < o; ++n)
    i = t.getPixelForValue(s[n]), l();
  for (r = void 0, n = 0, o = t.ticks.length; n < o; ++n)
    i = t.getPixelForTick(n), l();
  return a;
}
function Ql(e, t, s, a) {
  const n = s.barThickness;
  let o, i;
  return ft(n) ? (o = t.min * s.categoryPercentage, i = s.barPercentage) : (o = n * a, i = 1), {
    chunk: o / a,
    ratio: i,
    start: t.pixels[e] - o / 2
  };
}
function Jl(e, t, s, a) {
  const n = t.pixels, o = n[e];
  let i = e > 0 ? n[e - 1] : null, r = e < n.length - 1 ? n[e + 1] : null;
  const l = s.categoryPercentage;
  i === null && (i = o - (r === null ? t.end - t.start : r - o)), r === null && (r = o + o - i);
  const d = o - (o - Math.min(i, r)) / 2 * l;
  return {
    chunk: Math.abs(r - i) / 2 * l / a,
    ratio: s.barPercentage,
    start: d
  };
}
function tc(e, t, s, a) {
  const n = s.parse(e[0], a), o = s.parse(e[1], a), i = Math.min(n, o), r = Math.max(n, o);
  let l = i, d = r;
  Math.abs(i) > Math.abs(r) && (l = r, d = i), t[s.axis] = d, t._custom = {
    barStart: l,
    barEnd: d,
    start: n,
    end: o,
    min: i,
    max: r
  };
}
function oi(e, t, s, a) {
  return $t(e) ? tc(e, t, s, a) : t[s.axis] = s.parse(e, a), t;
}
function Mn(e, t, s, a) {
  const n = e.iScale, o = e.vScale, i = n.getLabels(), r = n === o, l = [];
  let d, u, h, f;
  for (d = s, u = s + a; d < u; ++d)
    f = t[d], h = {}, h[n.axis] = r || n.parse(i[d], d), l.push(oi(f, h, o, d));
  return l;
}
function Js(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function ec(e, t, s) {
  return e !== 0 ? Zt(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= s ? 1 : -1);
}
function sc(e) {
  let t, s, a, n, o;
  return e.horizontal ? (t = e.base > e.x, s = "left", a = "right") : (t = e.base < e.y, s = "bottom", a = "top"), t ? (n = "end", o = "start") : (n = "start", o = "end"), {
    start: s,
    end: a,
    reverse: t,
    top: n,
    bottom: o
  };
}
function ac(e, t, s, a) {
  let n = t.borderSkipped;
  const o = {};
  if (!n) {
    e.borderSkipped = o;
    return;
  }
  if (n === !0) {
    e.borderSkipped = {
      top: !0,
      right: !0,
      bottom: !0,
      left: !0
    };
    return;
  }
  const { start: i, end: r, reverse: l, top: d, bottom: u } = sc(e);
  n === "middle" && s && (e.enableBorderRadius = !0, (s._top || 0) === a ? n = d : (s._bottom || 0) === a ? n = u : (o[Sn(u, i, r, l)] = !0, n = d)), o[Sn(n, i, r, l)] = !0, e.borderSkipped = o;
}
function Sn(e, t, s, a) {
  return a ? (e = nc(e, t, s), e = Cn(e, s, t)) : e = Cn(e, t, s), e;
}
function nc(e, t, s) {
  return e === t ? s : e === s ? t : e;
}
function Cn(e, t, s) {
  return e === "start" ? t : e === "end" ? s : e;
}
function oc(e, { inflateAmount: t }, s) {
  e.inflateAmount = t === "auto" ? s === 1 ? 0.33 : 0 : t;
}
class ic extends Vs {
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
  parsePrimitiveData(t, s, a, n) {
    return Mn(t, s, a, n);
  }
  parseArrayData(t, s, a, n) {
    return Mn(t, s, a, n);
  }
  parseObjectData(t, s, a, n) {
    const { iScale: o, vScale: i } = t, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, d = o.axis === "x" ? r : l, u = i.axis === "x" ? r : l, h = [];
    let f, v, g, _;
    for (f = a, v = a + n; f < v; ++f)
      _ = s[f], g = {}, g[o.axis] = o.parse(Me(_, d), f), h.push(oi(Me(_, u), g, i, f));
    return h;
  }
  updateRangeFromParsed(t, s, a, n) {
    super.updateRangeFromParsed(t, s, a, n);
    const o = a._custom;
    o && s === this._cachedMeta.vScale && (t.min = Math.min(t.min, o.min), t.max = Math.max(t.max, o.max));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(t) {
    const s = this._cachedMeta, { iScale: a, vScale: n } = s, o = this.getParsed(t), i = o._custom, r = Js(i) ? "[" + i.start + ", " + i.end + "]" : "" + n.getLabelForValue(o[n.axis]);
    return {
      label: "" + a.getLabelForValue(o[a.axis]),
      value: r
    };
  }
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
    const t = this._cachedMeta;
    t.stack = this.getDataset().stack;
  }
  update(t) {
    const s = this._cachedMeta;
    this.updateElements(s.data, 0, s.data.length, t);
  }
  updateElements(t, s, a, n) {
    const o = n === "reset", { index: i, _cachedMeta: { vScale: r } } = this, l = r.getBasePixel(), d = r.isHorizontal(), u = this._getRuler(), { sharedOptions: h, includeOptions: f } = this._getSharedOptions(s, n);
    for (let v = s; v < s + a; v++) {
      const g = this.getParsed(v), _ = o || ft(g[r.axis]) ? {
        base: l,
        head: l
      } : this._calculateBarValuePixels(v), m = this._calculateBarIndexPixels(v, u), p = (g._stacks || {})[r.axis], b = {
        horizontal: d,
        base: _.base,
        enableBorderRadius: !p || Js(g._custom) || i === p._top || i === p._bottom,
        x: d ? _.head : m.center,
        y: d ? m.center : _.head,
        height: d ? m.size : Math.abs(_.size),
        width: d ? Math.abs(_.size) : m.size
      };
      f && (b.options = h || this.resolveDataElementOptions(v, t[v].active ? "active" : n));
      const $ = b.options || t[v].options;
      ac(b, $, p, i), oc(b, $, u.ratio), this.updateElement(t[v], v, b, n);
    }
  }
  _getStacks(t, s) {
    const { iScale: a } = this._cachedMeta, n = a.getMatchingVisibleMetas(this._type).filter((u) => u.controller.options.grouped), o = a.options.stacked, i = [], r = this._cachedMeta.controller.getParsed(s), l = r && r[a.axis], d = (u) => {
      const h = u._parsed.find((v) => v[a.axis] === l), f = h && h[u.vScale.axis];
      if (ft(f) || isNaN(f))
        return !0;
    };
    for (const u of n)
      if (!(s !== void 0 && d(u)) && ((o === !1 || i.indexOf(u.stack) === -1 || o === void 0 && u.stack === void 0) && i.push(u.stack), u.index === t))
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
    const t = this.chart.scales, s = this.chart.options.indexAxis;
    return Object.keys(t).filter((a) => t[a].axis === s).shift();
  }
  _getAxis() {
    const t = {}, s = this.getFirstScaleIdForIndexAxis();
    for (const a of this.chart.data.datasets)
      t[ot(this.chart.options.indexAxis === "x" ? a.xAxisID : a.yAxisID, s)] = !0;
    return Object.keys(t);
  }
  _getStackIndex(t, s, a) {
    const n = this._getStacks(t, a), o = s !== void 0 ? n.indexOf(s) : -1;
    return o === -1 ? n.length - 1 : o;
  }
  _getRuler() {
    const t = this.options, s = this._cachedMeta, a = s.iScale, n = [];
    let o, i;
    for (o = 0, i = s.data.length; o < i; ++o)
      n.push(a.getPixelForValue(this.getParsed(o)[a.axis], o));
    const r = t.barThickness;
    return {
      min: r || Zl(s),
      pixels: n,
      start: a._startPixel,
      end: a._endPixel,
      stackCount: this._getStackCount(),
      scale: a,
      grouped: t.grouped,
      ratio: r ? 1 : t.categoryPercentage * t.barPercentage
    };
  }
  _calculateBarValuePixels(t) {
    const { _cachedMeta: { vScale: s, _stacked: a, index: n }, options: { base: o, minBarLength: i } } = this, r = o || 0, l = this.getParsed(t), d = l._custom, u = Js(d);
    let h = l[s.axis], f = 0, v = a ? this.applyStack(s, l, a) : h, g, _;
    v !== h && (f = v - h, v = h), u && (h = d.barStart, v = d.barEnd - d.barStart, h !== 0 && Zt(h) !== Zt(d.barEnd) && (f = 0), f += h);
    const m = !ft(o) && !u ? o : f;
    let p = s.getPixelForValue(m);
    if (this.chart.getDataVisibility(t) ? g = s.getPixelForValue(f + v) : g = p, _ = g - p, Math.abs(_) < i) {
      _ = ec(_, s, r) * i, h === r && (p -= _ / 2);
      const b = s.getPixelForDecimal(0), $ = s.getPixelForDecimal(1), k = Math.min(b, $), w = Math.max(b, $);
      p = Math.max(Math.min(p, w), k), g = p + _, a && !u && (l._stacks[s.axis]._visualValues[n] = s.getValueForPixel(g) - s.getValueForPixel(p));
    }
    if (p === s.getPixelForValue(r)) {
      const b = Zt(_) * s.getLineWidthForValue(r) / 2;
      p += b, _ -= b;
    }
    return {
      size: _,
      base: p,
      head: g,
      center: g + _ / 2
    };
  }
  _calculateBarIndexPixels(t, s) {
    const a = s.scale, n = this.options, o = n.skipNull, i = ot(n.maxBarThickness, 1 / 0);
    let r, l;
    const d = this._getAxisCount();
    if (s.grouped) {
      const u = o ? this._getStackCount(t) : s.stackCount, h = n.barThickness === "flex" ? Jl(t, s, n, u * d) : Ql(t, s, n, u * d), f = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, v = this._getAxis().indexOf(ot(f, this.getFirstScaleIdForIndexAxis())), g = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0) + v;
      r = h.start + h.chunk * g + h.chunk / 2, l = Math.min(i, h.chunk * h.ratio);
    } else
      r = a.getPixelForValue(this.getParsed(t)[a.axis], t), l = Math.min(i, s.min * s.ratio);
    return {
      base: r - l / 2,
      head: r + l / 2,
      center: r,
      size: l
    };
  }
  draw() {
    const t = this._cachedMeta, s = t.vScale, a = t.data, n = a.length;
    let o = 0;
    for (; o < n; ++o)
      this.getParsed(o)[s.axis] !== null && !a[o].hidden && a[o].draw(this._ctx);
  }
}
function rc(e, t, s) {
  let a = 1, n = 1, o = 0, i = 0;
  if (t < mt) {
    const r = e, l = r + t, d = Math.cos(r), u = Math.sin(r), h = Math.cos(l), f = Math.sin(l), v = ($, k, w) => os($, r, l, !0) ? 1 : Math.max(k, k * s, w, w * s), g = ($, k, w) => os($, r, l, !0) ? -1 : Math.min(k, k * s, w, w * s), _ = v(0, d, h), m = v(Mt, u, f), p = g(pt, d, h), b = g(pt + Mt, u, f);
    a = (_ - p) / 2, n = (m - b) / 2, o = -(_ + p) / 2, i = -(m + b) / 2;
  }
  return {
    ratioX: a,
    ratioY: n,
    offsetX: o,
    offsetY: i
  };
}
class lc extends Vs {
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
            const s = t.data, { labels: { pointStyle: a, textAlign: n, color: o, useBorderRadius: i, borderRadius: r } } = t.legend.options;
            return s.labels.length && s.datasets.length ? s.labels.map((l, d) => {
              const h = t.getDatasetMeta(0).controller.getStyle(d);
              return {
                text: l,
                fillStyle: h.backgroundColor,
                fontColor: o,
                hidden: !t.getDataVisibility(d),
                lineDash: h.borderDash,
                lineDashOffset: h.borderDashOffset,
                lineJoin: h.borderJoinStyle,
                lineWidth: h.borderWidth,
                strokeStyle: h.borderColor,
                textAlign: n,
                pointStyle: a,
                borderRadius: i && (r || h.borderRadius),
                index: d
              };
            }) : [];
          }
        },
        onClick(t, s, a) {
          a.chart.toggleDataVisibility(s.index), a.chart.update();
        }
      }
    }
  };
  constructor(t, s) {
    super(t, s), this.enableOptionSharing = !0, this.innerRadius = void 0, this.outerRadius = void 0, this.offsetX = void 0, this.offsetY = void 0;
  }
  linkScales() {
  }
  parse(t, s) {
    const a = this.getDataset().data, n = this._cachedMeta;
    if (this._parsing === !1)
      n._parsed = a;
    else {
      let o = (l) => +a[l];
      if (it(a[t])) {
        const { key: l = "value" } = this._parsing;
        o = (d) => +Me(a[d], l);
      }
      let i, r;
      for (i = t, r = t + s; i < r; ++i)
        n._parsed[i] = o(i);
    }
  }
  _getRotation() {
    return se(this.options.rotation - 90);
  }
  _getCircumference() {
    return se(this.options.circumference);
  }
  _getRotationExtents() {
    let t = mt, s = -mt;
    for (let a = 0; a < this.chart.data.datasets.length; ++a)
      if (this.chart.isDatasetVisible(a) && this.chart.getDatasetMeta(a).type === this._type) {
        const n = this.chart.getDatasetMeta(a).controller, o = n._getRotation(), i = n._getCircumference();
        t = Math.min(t, o), s = Math.max(s, o + i);
      }
    return {
      rotation: t,
      circumference: s - t
    };
  }
  update(t) {
    const s = this.chart, { chartArea: a } = s, n = this._cachedMeta, o = n.data, i = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, r = Math.max((Math.min(a.width, a.height) - i) / 2, 0), l = Math.min(gr(this.options.cutout, r), 1), d = this._getRingWeight(this.index), { circumference: u, rotation: h } = this._getRotationExtents(), { ratioX: f, ratioY: v, offsetX: g, offsetY: _ } = rc(h, u, l), m = (a.width - i) / f, p = (a.height - i) / v, b = Math.max(Math.min(m, p) / 2, 0), $ = Eo(this.options.radius, b), k = Math.max($ * l, 0), w = ($ - k) / this._getVisibleDatasetWeightTotal();
    this.offsetX = g * $, this.offsetY = _ * $, n.total = this.calculateTotal(), this.outerRadius = $ - w * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - w * d, 0), this.updateElements(o, 0, o.length, t);
  }
  _circumference(t, s) {
    const a = this.options, n = this._cachedMeta, o = this._getCircumference();
    return s && a.animation.animateRotate || !this.chart.getDataVisibility(t) || n._parsed[t] === null || n.data[t].hidden ? 0 : this.calculateCircumference(n._parsed[t] * o / mt);
  }
  updateElements(t, s, a, n) {
    const o = n === "reset", i = this.chart, r = i.chartArea, d = i.options.animation, u = (r.left + r.right) / 2, h = (r.top + r.bottom) / 2, f = o && d.animateScale, v = f ? 0 : this.innerRadius, g = f ? 0 : this.outerRadius, { sharedOptions: _, includeOptions: m } = this._getSharedOptions(s, n);
    let p = this._getRotation(), b;
    for (b = 0; b < s; ++b)
      p += this._circumference(b, o);
    for (b = s; b < s + a; ++b) {
      const $ = this._circumference(b, o), k = t[b], w = {
        x: u + this.offsetX,
        y: h + this.offsetY,
        startAngle: p,
        endAngle: p + $,
        circumference: $,
        outerRadius: g,
        innerRadius: v
      };
      m && (w.options = _ || this.resolveDataElementOptions(b, k.active ? "active" : n)), p += $, this.updateElement(k, b, w, n);
    }
  }
  calculateTotal() {
    const t = this._cachedMeta, s = t.data;
    let a = 0, n;
    for (n = 0; n < s.length; n++) {
      const o = t._parsed[n];
      o !== null && !isNaN(o) && this.chart.getDataVisibility(n) && !s[n].hidden && (a += Math.abs(o));
    }
    return a;
  }
  calculateCircumference(t) {
    const s = this._cachedMeta.total;
    return s > 0 && !isNaN(t) ? mt * (Math.abs(t) / s) : 0;
  }
  getLabelAndValue(t) {
    const s = this._cachedMeta, a = this.chart, n = a.data.labels || [], o = Ea(s._parsed[t], a.options.locale);
    return {
      label: n[t] || "",
      value: o
    };
  }
  getMaxBorderWidth(t) {
    let s = 0;
    const a = this.chart;
    let n, o, i, r, l;
    if (!t) {
      for (n = 0, o = a.data.datasets.length; n < o; ++n)
        if (a.isDatasetVisible(n)) {
          i = a.getDatasetMeta(n), t = i.data, r = i.controller;
          break;
        }
    }
    if (!t)
      return 0;
    for (n = 0, o = t.length; n < o; ++n)
      l = r.resolveDataElementOptions(n), l.borderAlign !== "inner" && (s = Math.max(s, l.borderWidth || 0, l.hoverBorderWidth || 0));
    return s;
  }
  getMaxOffset(t) {
    let s = 0;
    for (let a = 0, n = t.length; a < n; ++a) {
      const o = this.resolveDataElementOptions(a);
      s = Math.max(s, o.offset || 0, o.hoverOffset || 0);
    }
    return s;
  }
  _getRingWeightOffset(t) {
    let s = 0;
    for (let a = 0; a < t; ++a)
      this.chart.isDatasetVisible(a) && (s += this._getRingWeight(a));
    return s;
  }
  _getRingWeight(t) {
    return Math.max(ot(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
class cc extends Vs {
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
    const s = this._cachedMeta, { dataset: a, data: n = [], _dataset: o } = s, i = this.chart._animationsDisabled;
    let { start: r, count: l } = Pr(s, n, i);
    this._drawStart = r, this._drawCount = l, Er(s) && (r = 0, l = n.length), a._chart = this.chart, a._datasetIndex = this.index, a._decimated = !!o._decimated, a.points = n;
    const d = this.resolveDatasetElementOptions(t);
    this.options.showLine || (d.borderWidth = 0), d.segment = this.options.segment, this.updateElement(a, void 0, {
      animated: !i,
      options: d
    }, t), this.updateElements(n, r, l, t);
  }
  updateElements(t, s, a, n) {
    const o = n === "reset", { iScale: i, vScale: r, _stacked: l, _dataset: d } = this._cachedMeta, { sharedOptions: u, includeOptions: h } = this._getSharedOptions(s, n), f = i.axis, v = r.axis, { spanGaps: g, segment: _ } = this.options, m = ns(g) ? g : Number.POSITIVE_INFINITY, p = this.chart._animationsDisabled || o || n === "none", b = s + a, $ = t.length;
    let k = s > 0 && this.getParsed(s - 1);
    for (let w = 0; w < $; ++w) {
      const S = t[w], C = p ? S : {};
      if (w < s || w >= b) {
        C.skip = !0;
        continue;
      }
      const A = this.getParsed(w), P = ft(A[v]), R = C[f] = i.getPixelForValue(A[f], w), I = C[v] = o || P ? r.getBasePixel() : r.getPixelForValue(l ? this.applyStack(r, A, l) : A[v], w);
      C.skip = isNaN(R) || isNaN(I) || P, C.stop = w > 0 && Math.abs(A[f] - k[f]) > m, _ && (C.parsed = A, C.raw = d.data[w]), h && (C.options = u || this.resolveDataElementOptions(w, S.active ? "active" : n)), p || this.updateElement(S, w, C, n), k = A;
    }
  }
  getMaxOverflow() {
    const t = this._cachedMeta, s = t.dataset, a = s.options && s.options.borderWidth || 0, n = t.data || [];
    if (!n.length)
      return a;
    const o = n[0].size(this.resolveDataElementOptions(0)), i = n[n.length - 1].size(this.resolveDataElementOptions(n.length - 1));
    return Math.max(a, o, i) / 2;
  }
  draw() {
    const t = this._cachedMeta;
    t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw();
  }
}
class dc extends lc {
  static id = "pie";
  static defaults = {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: "100%"
  };
}
function ye() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class Wa {
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
    Object.assign(Wa.prototype, t);
  }
  options;
  constructor(t) {
    this.options = t || {};
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return ye();
  }
  parse() {
    return ye();
  }
  format() {
    return ye();
  }
  add() {
    return ye();
  }
  diff() {
    return ye();
  }
  startOf() {
    return ye();
  }
  endOf() {
    return ye();
  }
}
var uc = {
  _date: Wa
};
function hc(e, t, s, a) {
  const { controller: n, data: o, _sorted: i } = e, r = n._cachedMeta.iScale, l = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (r && t === r.axis && t !== "r" && i && o.length) {
    const d = r._reversePixels ? Ar : we;
    if (a) {
      if (n._sharedOptions) {
        const u = o[0], h = typeof u.getRange == "function" && u.getRange(t);
        if (h) {
          const f = d(o, t, s - h), v = d(o, t, s + h);
          return {
            lo: f.lo,
            hi: v.hi
          };
        }
      }
    } else {
      const u = d(o, t, s);
      if (l) {
        const { vScale: h } = n._cachedMeta, { _parsed: f } = e, v = f.slice(0, u.lo + 1).reverse().findIndex((_) => !ft(_[h.axis]));
        u.lo -= Math.max(0, v);
        const g = f.slice(u.hi).findIndex((_) => !ft(_[h.axis]));
        u.hi += Math.max(0, g);
      }
      return u;
    }
  }
  return {
    lo: 0,
    hi: o.length - 1
  };
}
function Ns(e, t, s, a, n) {
  const o = e.getSortedVisibleDatasetMetas(), i = s[t];
  for (let r = 0, l = o.length; r < l; ++r) {
    const { index: d, data: u } = o[r], { lo: h, hi: f } = hc(o[r], t, i, n);
    for (let v = h; v <= f; ++v) {
      const g = u[v];
      g.skip || a(g, d, v);
    }
  }
}
function fc(e) {
  const t = e.indexOf("x") !== -1, s = e.indexOf("y") !== -1;
  return function(a, n) {
    const o = t ? Math.abs(a.x - n.x) : 0, i = s ? Math.abs(a.y - n.y) : 0;
    return Math.sqrt(Math.pow(o, 2) + Math.pow(i, 2));
  };
}
function ta(e, t, s, a, n) {
  const o = [];
  return !n && !e.isPointInArea(t) || Ns(e, s, t, function(r, l, d) {
    !n && !is(r, e.chartArea, 0) || r.inRange(t.x, t.y, a) && o.push({
      element: r,
      datasetIndex: l,
      index: d
    });
  }, !0), o;
}
function gc(e, t, s, a) {
  let n = [];
  function o(i, r, l) {
    const { startAngle: d, endAngle: u } = i.getProps([
      "startAngle",
      "endAngle"
    ], a), { angle: h } = Oo(i, {
      x: t.x,
      y: t.y
    });
    os(h, d, u) && n.push({
      element: i,
      datasetIndex: r,
      index: l
    });
  }
  return Ns(e, s, t, o), n;
}
function pc(e, t, s, a, n, o) {
  let i = [];
  const r = fc(s);
  let l = Number.POSITIVE_INFINITY;
  function d(u, h, f) {
    const v = u.inRange(t.x, t.y, n);
    if (a && !v)
      return;
    const g = u.getCenterPoint(n);
    if (!(!!o || e.isPointInArea(g)) && !v)
      return;
    const m = r(t, g);
    m < l ? (i = [
      {
        element: u,
        datasetIndex: h,
        index: f
      }
    ], l = m) : m === l && i.push({
      element: u,
      datasetIndex: h,
      index: f
    });
  }
  return Ns(e, s, t, d), i;
}
function ea(e, t, s, a, n, o) {
  return !o && !e.isPointInArea(t) ? [] : s === "r" && !a ? gc(e, t, s, n) : pc(e, t, s, a, n, o);
}
function Dn(e, t, s, a, n) {
  const o = [], i = s === "x" ? "inXRange" : "inYRange";
  let r = !1;
  return Ns(e, s, t, (l, d, u) => {
    l[i] && l[i](t[s], n) && (o.push({
      element: l,
      datasetIndex: d,
      index: u
    }), r = r || l.inRange(t.x, t.y, n));
  }), a && !r ? [] : o;
}
var vc = {
  modes: {
    index(e, t, s, a) {
      const n = xe(t, e), o = s.axis || "x", i = s.includeInvisible || !1, r = s.intersect ? ta(e, n, o, a, i) : ea(e, n, o, !1, a, i), l = [];
      return r.length ? (e.getSortedVisibleDatasetMetas().forEach((d) => {
        const u = r[0].index, h = d.data[u];
        h && !h.skip && l.push({
          element: h,
          datasetIndex: d.index,
          index: u
        });
      }), l) : [];
    },
    dataset(e, t, s, a) {
      const n = xe(t, e), o = s.axis || "xy", i = s.includeInvisible || !1;
      let r = s.intersect ? ta(e, n, o, a, i) : ea(e, n, o, !1, a, i);
      if (r.length > 0) {
        const l = r[0].datasetIndex, d = e.getDatasetMeta(l).data;
        r = [];
        for (let u = 0; u < d.length; ++u)
          r.push({
            element: d[u],
            datasetIndex: l,
            index: u
          });
      }
      return r;
    },
    point(e, t, s, a) {
      const n = xe(t, e), o = s.axis || "xy", i = s.includeInvisible || !1;
      return ta(e, n, o, a, i);
    },
    nearest(e, t, s, a) {
      const n = xe(t, e), o = s.axis || "xy", i = s.includeInvisible || !1;
      return ea(e, n, o, s.intersect, a, i);
    },
    x(e, t, s, a) {
      const n = xe(t, e);
      return Dn(e, n, "x", s.intersect, a);
    },
    y(e, t, s, a) {
      const n = xe(t, e);
      return Dn(e, n, "y", s.intersect, a);
    }
  }
};
const ii = [
  "left",
  "top",
  "right",
  "bottom"
];
function Ve(e, t) {
  return e.filter((s) => s.pos === t);
}
function An(e, t) {
  return e.filter((s) => ii.indexOf(s.pos) === -1 && s.box.axis === t);
}
function Ne(e, t) {
  return e.sort((s, a) => {
    const n = t ? a : s, o = t ? s : a;
    return n.weight === o.weight ? n.index - o.index : n.weight - o.weight;
  });
}
function bc(e) {
  const t = [];
  let s, a, n, o, i, r;
  for (s = 0, a = (e || []).length; s < a; ++s)
    n = e[s], { position: o, options: { stack: i, stackWeight: r = 1 } } = n, t.push({
      index: s,
      box: n,
      pos: o,
      horizontal: n.isHorizontal(),
      weight: n.weight,
      stack: i && o + i,
      stackWeight: r
    });
  return t;
}
function mc(e) {
  const t = {};
  for (const s of e) {
    const { stack: a, pos: n, stackWeight: o } = s;
    if (!a || !ii.includes(n))
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
function yc(e, t) {
  const s = mc(e), { vBoxMaxWidth: a, hBoxMaxHeight: n } = t;
  let o, i, r;
  for (o = 0, i = e.length; o < i; ++o) {
    r = e[o];
    const { fullSize: l } = r.box, d = s[r.stack], u = d && r.stackWeight / d.weight;
    r.horizontal ? (r.width = u ? u * a : l && t.availableWidth, r.height = n) : (r.width = a, r.height = u ? u * n : l && t.availableHeight);
  }
  return s;
}
function _c(e) {
  const t = bc(e), s = Ne(t.filter((d) => d.box.fullSize), !0), a = Ne(Ve(t, "left"), !0), n = Ne(Ve(t, "right")), o = Ne(Ve(t, "top"), !0), i = Ne(Ve(t, "bottom")), r = An(t, "x"), l = An(t, "y");
  return {
    fullSize: s,
    leftAndTop: a.concat(o),
    rightAndBottom: n.concat(l).concat(i).concat(r),
    chartArea: Ve(t, "chartArea"),
    vertical: a.concat(n).concat(l),
    horizontal: o.concat(i).concat(r)
  };
}
function Tn(e, t, s, a) {
  return Math.max(e[s], t[s]) + Math.max(e[a], t[a]);
}
function ri(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function xc(e, t, s, a) {
  const { pos: n, box: o } = s, i = e.maxPadding;
  if (!it(n)) {
    s.size && (e[n] -= s.size);
    const h = a[s.stack] || {
      size: 0,
      count: 1
    };
    h.size = Math.max(h.size, s.horizontal ? o.height : o.width), s.size = h.size / h.count, e[n] += s.size;
  }
  o.getPadding && ri(i, o.getPadding());
  const r = Math.max(0, t.outerWidth - Tn(i, e, "left", "right")), l = Math.max(0, t.outerHeight - Tn(i, e, "top", "bottom")), d = r !== e.w, u = l !== e.h;
  return e.w = r, e.h = l, s.horizontal ? {
    same: d,
    other: u
  } : {
    same: u,
    other: d
  };
}
function kc(e) {
  const t = e.maxPadding;
  function s(a) {
    const n = Math.max(t[a] - e[a], 0);
    return e[a] += n, n;
  }
  e.y += s("top"), e.x += s("left"), s("right"), s("bottom");
}
function wc(e, t) {
  const s = t.maxPadding;
  function a(n) {
    const o = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return n.forEach((i) => {
      o[i] = Math.max(t[i], s[i]);
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
function Ke(e, t, s, a) {
  const n = [];
  let o, i, r, l, d, u;
  for (o = 0, i = e.length, d = 0; o < i; ++o) {
    r = e[o], l = r.box, l.update(r.width || t.w, r.height || t.h, wc(r.horizontal, t));
    const { same: h, other: f } = xc(t, s, r, a);
    d |= h && n.length, u = u || f, l.fullSize || n.push(r);
  }
  return d && Ke(n, t, s, a) || u;
}
function ys(e, t, s, a, n) {
  e.top = s, e.left = t, e.right = t + a, e.bottom = s + n, e.width = a, e.height = n;
}
function Bn(e, t, s, a) {
  const n = s.padding;
  let { x: o, y: i } = t;
  for (const r of e) {
    const l = r.box, d = a[r.stack] || {
      placed: 0,
      weight: 1
    }, u = r.stackWeight / d.weight || 1;
    if (r.horizontal) {
      const h = t.w * u, f = d.size || l.height;
      as(d.start) && (i = d.start), l.fullSize ? ys(l, n.left, i, s.outerWidth - n.right - n.left, f) : ys(l, t.left + d.placed, i, h, f), d.start = i, d.placed += h, i = l.bottom;
    } else {
      const h = t.h * u, f = d.size || l.width;
      as(d.start) && (o = d.start), l.fullSize ? ys(l, o, n.top, f, s.outerHeight - n.bottom - n.top) : ys(l, o, t.top + d.placed, f, h), d.start = o, d.placed += h, o = l.right;
    }
  }
  t.x = o, t.y = i;
}
var Yt = {
  addBox(e, t) {
    e.boxes || (e.boxes = []), t.fullSize = t.fullSize || !1, t.position = t.position || "top", t.weight = t.weight || 0, t._layers = t._layers || function() {
      return [
        {
          z: 0,
          draw(s) {
            t.draw(s);
          }
        }
      ];
    }, e.boxes.push(t);
  },
  removeBox(e, t) {
    const s = e.boxes ? e.boxes.indexOf(t) : -1;
    s !== -1 && e.boxes.splice(s, 1);
  },
  configure(e, t, s) {
    t.fullSize = s.fullSize, t.position = s.position, t.weight = s.weight;
  },
  update(e, t, s, a) {
    if (!e)
      return;
    const n = qt(e.options.layout.padding), o = Math.max(t - n.width, 0), i = Math.max(s - n.height, 0), r = _c(e.boxes), l = r.vertical, d = r.horizontal;
    gt(e.boxes, (_) => {
      typeof _.beforeLayout == "function" && _.beforeLayout();
    });
    const u = l.reduce((_, m) => m.box.options && m.box.options.display === !1 ? _ : _ + 1, 0) || 1, h = Object.freeze({
      outerWidth: t,
      outerHeight: s,
      padding: n,
      availableWidth: o,
      availableHeight: i,
      vBoxMaxWidth: o / 2 / u,
      hBoxMaxHeight: i / 2
    }), f = Object.assign({}, n);
    ri(f, qt(a));
    const v = Object.assign({
      maxPadding: f,
      w: o,
      h: i,
      x: n.left,
      y: n.top
    }, n), g = yc(l.concat(d), h);
    Ke(r.fullSize, v, h, g), Ke(l, v, h, g), Ke(d, v, h, g) && Ke(l, v, h, g), kc(v), Bn(r.leftAndTop, v, h, g), v.x += v.w, v.y += v.h, Bn(r.rightAndBottom, v, h, g), e.chartArea = {
      left: v.left,
      top: v.top,
      right: v.left + v.w,
      bottom: v.top + v.h,
      height: v.h,
      width: v.w
    }, gt(r.chartArea, (_) => {
      const m = _.box;
      Object.assign(m, e.chartArea), m.update(v.w, v.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class li {
  acquireContext(t, s) {
  }
  releaseContext(t) {
    return !1;
  }
  addEventListener(t, s, a) {
  }
  removeEventListener(t, s, a) {
  }
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(t, s, a, n) {
    return s = Math.max(0, s || t.width), a = a || t.height, {
      width: s,
      height: Math.max(0, n ? Math.floor(s / n) : a)
    };
  }
  isAttached(t) {
    return !0;
  }
  updateConfig(t) {
  }
}
class $c extends li {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const Ms = "$chartjs", Mc = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, Ln = (e) => e === null || e === "";
function Sc(e, t) {
  const s = e.style, a = e.getAttribute("height"), n = e.getAttribute("width");
  if (e[Ms] = {
    initial: {
      height: a,
      width: n,
      style: {
        display: s.display,
        height: s.height,
        width: s.width
      }
    }
  }, s.display = s.display || "block", s.boxSizing = s.boxSizing || "border-box", Ln(n)) {
    const o = pn(e, "width");
    o !== void 0 && (e.width = o);
  }
  if (Ln(a))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const o = pn(e, "height");
      o !== void 0 && (e.height = o);
    }
  return e;
}
const ci = $l ? {
  passive: !0
} : !1;
function Cc(e, t, s) {
  e && e.addEventListener(t, s, ci);
}
function Dc(e, t, s) {
  e && e.canvas && e.canvas.removeEventListener(t, s, ci);
}
function Ac(e, t) {
  const s = Mc[e.type] || e.type, { x: a, y: n } = xe(e, t);
  return {
    type: s,
    chart: t,
    native: e,
    x: a !== void 0 ? a : null,
    y: n !== void 0 ? n : null
  };
}
function Es(e, t) {
  for (const s of e)
    if (s === t || s.contains(t))
      return !0;
}
function Tc(e, t, s) {
  const a = e.canvas, n = new MutationObserver((o) => {
    let i = !1;
    for (const r of o)
      i = i || Es(r.addedNodes, a), i = i && !Es(r.removedNodes, a);
    i && s();
  });
  return n.observe(document, {
    childList: !0,
    subtree: !0
  }), n;
}
function Bc(e, t, s) {
  const a = e.canvas, n = new MutationObserver((o) => {
    let i = !1;
    for (const r of o)
      i = i || Es(r.removedNodes, a), i = i && !Es(r.addedNodes, a);
    i && s();
  });
  return n.observe(document, {
    childList: !0,
    subtree: !0
  }), n;
}
const ls = /* @__PURE__ */ new Map();
let Fn = 0;
function di() {
  const e = window.devicePixelRatio;
  e !== Fn && (Fn = e, ls.forEach((t, s) => {
    s.currentDevicePixelRatio !== e && t();
  }));
}
function Lc(e, t) {
  ls.size || window.addEventListener("resize", di), ls.set(e, t);
}
function Fc(e) {
  ls.delete(e), ls.size || window.removeEventListener("resize", di);
}
function Pc(e, t, s) {
  const a = e.canvas, n = a && Na(a);
  if (!n)
    return;
  const o = Wo((r, l) => {
    const d = n.clientWidth;
    s(r, l), d < n.clientWidth && s();
  }, window), i = new ResizeObserver((r) => {
    const l = r[0], d = l.contentRect.width, u = l.contentRect.height;
    d === 0 && u === 0 || o(d, u);
  });
  return i.observe(n), Lc(e, o), i;
}
function sa(e, t, s) {
  s && s.disconnect(), t === "resize" && Fc(e);
}
function Ec(e, t, s) {
  const a = e.canvas, n = Wo((o) => {
    e.ctx !== null && s(Ac(o, e));
  }, e);
  return Cc(a, t, n), n;
}
class Rc extends li {
  acquireContext(t, s) {
    const a = t && t.getContext && t.getContext("2d");
    return a && a.canvas === t ? (Sc(t, s), a) : null;
  }
  releaseContext(t) {
    const s = t.canvas;
    if (!s[Ms])
      return !1;
    const a = s[Ms].initial;
    [
      "height",
      "width"
    ].forEach((o) => {
      const i = a[o];
      ft(i) ? s.removeAttribute(o) : s.setAttribute(o, i);
    });
    const n = a.style || {};
    return Object.keys(n).forEach((o) => {
      s.style[o] = n[o];
    }), s.width = s.width, delete s[Ms], !0;
  }
  addEventListener(t, s, a) {
    this.removeEventListener(t, s);
    const n = t.$proxies || (t.$proxies = {}), i = {
      attach: Tc,
      detach: Bc,
      resize: Pc
    }[s] || Ec;
    n[s] = i(t, s, a);
  }
  removeEventListener(t, s) {
    const a = t.$proxies || (t.$proxies = {}), n = a[s];
    if (!n)
      return;
    ({
      attach: sa,
      detach: sa,
      resize: sa
    }[s] || Dc)(t, s, n), a[s] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, s, a, n) {
    return wl(t, s, a, n);
  }
  isAttached(t) {
    const s = t && Na(t);
    return !!(s && s.isConnected);
  }
}
function Ic(e) {
  return !Va() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? $c : Rc;
}
let oe = class {
  static defaults = {};
  static defaultRoutes = void 0;
  x;
  y;
  active = !1;
  options;
  $animations;
  tooltipPosition(t) {
    const { x: s, y: a } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: s,
      y: a
    };
  }
  hasValue() {
    return ns(this.x) && ns(this.y);
  }
  getProps(t, s) {
    const a = this.$animations;
    if (!s || !a)
      return this;
    const n = {};
    return t.forEach((o) => {
      n[o] = a[o] && a[o].active() ? a[o]._to : this[o];
    }), n;
  }
};
function Oc(e, t) {
  const s = e.options.ticks, a = zc(e), n = Math.min(s.maxTicksLimit || a, a), o = s.major.enabled ? Nc(t) : [], i = o.length, r = o[0], l = o[i - 1], d = [];
  if (i > n)
    return Wc(t, d, o, i / n), d;
  const u = Vc(o, t, n);
  if (i > 0) {
    let h, f;
    const v = i > 1 ? Math.round((l - r) / (i - 1)) : null;
    for (_s(t, d, u, ft(v) ? 0 : r - v, r), h = 0, f = i - 1; h < f; h++)
      _s(t, d, u, o[h], o[h + 1]);
    return _s(t, d, u, l, ft(v) ? t.length : l + v), d;
  }
  return _s(t, d, u), d;
}
function zc(e) {
  const t = e.options.offset, s = e._tickSize(), a = e._length / s + (t ? 0 : 1), n = e._maxLength / s;
  return Math.floor(Math.min(a, n));
}
function Vc(e, t, s) {
  const a = Hc(e), n = t.length / s;
  if (!a)
    return Math.max(n, 1);
  const o = kr(a);
  for (let i = 0, r = o.length - 1; i < r; i++) {
    const l = o[i];
    if (l > n)
      return l;
  }
  return Math.max(n, 1);
}
function Nc(e) {
  const t = [];
  let s, a;
  for (s = 0, a = e.length; s < a; s++)
    e[s].major && t.push(s);
  return t;
}
function Wc(e, t, s, a) {
  let n = 0, o = s[0], i;
  for (a = Math.ceil(a), i = 0; i < e.length; i++)
    i === o && (t.push(e[i]), n++, o = s[n * a]);
}
function _s(e, t, s, a, n) {
  const o = ot(a, 0), i = Math.min(ot(n, e.length), e.length);
  let r = 0, l, d, u;
  for (s = Math.ceil(s), n && (l = n - a, s = l / Math.floor(l / s)), u = o; u < 0; )
    r++, u = Math.round(o + r * s);
  for (d = Math.max(o, 0); d < i; d++)
    d === u && (t.push(e[d]), r++, u = Math.round(o + r * s));
}
function Hc(e) {
  const t = e.length;
  let s, a;
  if (t < 2)
    return !1;
  for (a = e[0], s = 1; s < t; ++s)
    if (e[s] - e[s - 1] !== a)
      return !1;
  return a;
}
const jc = (e) => e === "left" ? "right" : e === "right" ? "left" : e, Pn = (e, t, s) => t === "top" || t === "left" ? e[t] + s : e[t] - s, En = (e, t) => Math.min(t || e, e);
function Rn(e, t) {
  const s = [], a = e.length / t, n = e.length;
  let o = 0;
  for (; o < n; o += a)
    s.push(e[Math.floor(o)]);
  return s;
}
function Yc(e, t, s) {
  const a = e.ticks.length, n = Math.min(t, a - 1), o = e._startPixel, i = e._endPixel, r = 1e-6;
  let l = e.getPixelForTick(n), d;
  if (!(s && (a === 1 ? d = Math.max(l - o, i - l) : t === 0 ? d = (e.getPixelForTick(1) - l) / 2 : d = (l - e.getPixelForTick(n - 1)) / 2, l += n < t ? d : -d, l < o - r || l > i + r)))
    return l;
}
function qc(e, t) {
  gt(e, (s) => {
    const a = s.gc, n = a.length / 2;
    let o;
    if (n > t) {
      for (o = 0; o < n; ++o)
        delete s.data[a[o]];
      a.splice(0, n);
    }
  });
}
function We(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function In(e, t) {
  if (!e.display)
    return 0;
  const s = Lt(e.font, t), a = qt(e.padding);
  return ($t(e.text) ? e.text.length : 1) * s.lineHeight + a.height;
}
function Uc(e, t) {
  return Ce(e, {
    scale: t,
    type: "scale"
  });
}
function Kc(e, t, s) {
  return Ce(e, {
    tick: s,
    index: t,
    type: "tick"
  });
}
function Xc(e, t, s) {
  let a = Fa(e);
  return (s && t !== "right" || !s && t === "right") && (a = jc(a)), a;
}
function Gc(e, t, s, a) {
  const { top: n, left: o, bottom: i, right: r, chart: l } = e, { chartArea: d, scales: u } = l;
  let h = 0, f, v, g;
  const _ = i - n, m = r - o;
  if (e.isHorizontal()) {
    if (v = At(a, o, r), it(s)) {
      const p = Object.keys(s)[0], b = s[p];
      g = u[p].getPixelForValue(b) + _ - t;
    } else s === "center" ? g = (d.bottom + d.top) / 2 + _ - t : g = Pn(e, s, t);
    f = r - o;
  } else {
    if (it(s)) {
      const p = Object.keys(s)[0], b = s[p];
      v = u[p].getPixelForValue(b) - m + t;
    } else s === "center" ? v = (d.left + d.right) / 2 - m + t : v = Pn(e, s, t);
    g = At(a, i, n), h = s === "left" ? -Mt : Mt;
  }
  return {
    titleX: v,
    titleY: g,
    maxWidth: f,
    rotation: h
  };
}
class Re extends oe {
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
  parse(t, s) {
    return t;
  }
  getUserBounds() {
    let { _userMin: t, _userMax: s, _suggestedMin: a, _suggestedMax: n } = this;
    return t = Ut(t, Number.POSITIVE_INFINITY), s = Ut(s, Number.NEGATIVE_INFINITY), a = Ut(a, Number.POSITIVE_INFINITY), n = Ut(n, Number.NEGATIVE_INFINITY), {
      min: Ut(t, a),
      max: Ut(s, n),
      minDefined: Ft(t),
      maxDefined: Ft(s)
    };
  }
  getMinMax(t) {
    let { min: s, max: a, minDefined: n, maxDefined: o } = this.getUserBounds(), i;
    if (n && o)
      return {
        min: s,
        max: a
      };
    const r = this.getMatchingVisibleMetas();
    for (let l = 0, d = r.length; l < d; ++l)
      i = r[l].controller.getMinMax(this, t), n || (s = Math.min(s, i.min)), o || (a = Math.max(a, i.max));
    return s = o && s > a ? a : s, a = n && s > a ? s : a, {
      min: Ut(s, Ut(a, s)),
      max: Ut(a, Ut(s, a))
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
    bt(this.options.beforeUpdate, [
      this
    ]);
  }
  update(t, s, a) {
    const { beginAtZero: n, grace: o, ticks: i } = this.options, r = i.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = s, this._margins = a = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, a), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + a.left + a.right : this.height + a.top + a.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = el(this, o, n), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const l = r < this.ticks.length;
    this._convertTicksToLabels(l ? Rn(this.ticks, r) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), i.display && (i.autoSkip || i.source === "auto") && (this.ticks = Oc(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), l && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, s, a;
    this.isHorizontal() ? (s = this.left, a = this.right) : (s = this.top, a = this.bottom, t = !t), this._startPixel = s, this._endPixel = a, this._reversePixels = t, this._length = a - s, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    bt(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    bt(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    bt(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), bt(this.options[t], [
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
    bt(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const s = this.options.ticks;
    let a, n, o;
    for (a = 0, n = t.length; a < n; a++)
      o = t[a], o.label = bt(s.callback, [
        o.value,
        a,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    bt(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    bt(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, s = t.ticks, a = En(this.ticks.length, t.ticks.maxTicksLimit), n = s.minRotation || 0, o = s.maxRotation;
    let i = n, r, l, d;
    if (!this._isVisible() || !s.display || n >= o || a <= 1 || !this.isHorizontal()) {
      this.labelRotation = n;
      return;
    }
    const u = this._getLabelSizes(), h = u.widest.width, f = u.highest.height, v = Bt(this.chart.width - h, 0, this.maxWidth);
    r = t.offset ? this.maxWidth / a : v / (a - 1), h + 6 > r && (r = v / (a - (t.offset ? 0.5 : 1)), l = this.maxHeight - We(t.grid) - s.padding - In(t.title, this.chart.options.font), d = Math.sqrt(h * h + f * f), i = Sr(Math.min(Math.asin(Bt((u.highest.height + 6) / r, -1, 1)), Math.asin(Bt(l / d, -1, 1)) - Math.asin(Bt(f / d, -1, 1)))), i = Math.max(n, Math.min(o, i))), this.labelRotation = i;
  }
  afterCalculateLabelRotation() {
    bt(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    bt(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: s, options: { ticks: a, title: n, grid: o } } = this, i = this._isVisible(), r = this.isHorizontal();
    if (i) {
      const l = In(n, s.options.font);
      if (r ? (t.width = this.maxWidth, t.height = We(o) + l) : (t.height = this.maxHeight, t.width = We(o) + l), a.display && this.ticks.length) {
        const { first: d, last: u, widest: h, highest: f } = this._getLabelSizes(), v = a.padding * 2, g = se(this.labelRotation), _ = Math.cos(g), m = Math.sin(g);
        if (r) {
          const p = a.mirror ? 0 : m * h.width + _ * f.height;
          t.height = Math.min(this.maxHeight, t.height + p + v);
        } else {
          const p = a.mirror ? 0 : _ * h.width + m * f.height;
          t.width = Math.min(this.maxWidth, t.width + p + v);
        }
        this._calculatePadding(d, u, m, _);
      }
    }
    this._handleMargins(), r ? (this.width = this._length = s.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = s.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, s, a, n) {
    const { ticks: { align: o, padding: i }, position: r } = this.options, l = this.labelRotation !== 0, d = r !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const u = this.getPixelForTick(0) - this.left, h = this.right - this.getPixelForTick(this.ticks.length - 1);
      let f = 0, v = 0;
      l ? d ? (f = n * t.width, v = a * s.height) : (f = a * t.height, v = n * s.width) : o === "start" ? v = s.width : o === "end" ? f = t.width : o !== "inner" && (f = t.width / 2, v = s.width / 2), this.paddingLeft = Math.max((f - u + i) * this.width / (this.width - u), 0), this.paddingRight = Math.max((v - h + i) * this.width / (this.width - h), 0);
    } else {
      let u = s.height / 2, h = t.height / 2;
      o === "start" ? (u = 0, h = t.height) : o === "end" && (u = s.height, h = 0), this.paddingTop = u + i, this.paddingBottom = h + i;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    bt(this.options.afterFit, [
      this
    ]);
  }
  isHorizontal() {
    const { axis: t, position: s } = this.options;
    return s === "top" || s === "bottom" || t === "x";
  }
  isFullSize() {
    return this.options.fullSize;
  }
  _convertTicksToLabels(t) {
    this.beforeTickToLabelConversion(), this.generateTickLabels(t);
    let s, a;
    for (s = 0, a = t.length; s < a; s++)
      ft(t[s].label) && (t.splice(s, 1), a--, s--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const s = this.options.ticks.sampleSize;
      let a = this.ticks;
      s < a.length && (a = Rn(a, s)), this._labelSizes = t = this._computeLabelSizes(a, a.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, s, a) {
    const { ctx: n, _longestTextCache: o } = this, i = [], r = [], l = Math.floor(s / En(s, a));
    let d = 0, u = 0, h, f, v, g, _, m, p, b, $, k, w;
    for (h = 0; h < s; h += l) {
      if (g = t[h].label, _ = this._resolveTickFontOptions(h), n.font = m = _.string, p = o[m] = o[m] || {
        data: {},
        gc: []
      }, b = _.lineHeight, $ = k = 0, !ft(g) && !$t(g))
        $ = dn(n, p.data, p.gc, $, g), k = b;
      else if ($t(g))
        for (f = 0, v = g.length; f < v; ++f)
          w = g[f], !ft(w) && !$t(w) && ($ = dn(n, p.data, p.gc, $, w), k += b);
      i.push($), r.push(k), d = Math.max($, d), u = Math.max(k, u);
    }
    qc(o, s);
    const S = i.indexOf(d), C = r.indexOf(u), A = (P) => ({
      width: i[P] || 0,
      height: r[P] || 0
    });
    return {
      first: A(0),
      last: A(s - 1),
      widest: A(S),
      highest: A(C),
      widths: i,
      heights: r
    };
  }
  getLabelForValue(t) {
    return t;
  }
  getPixelForValue(t, s) {
    return NaN;
  }
  getValueForPixel(t) {
  }
  getPixelForTick(t) {
    const s = this.ticks;
    return t < 0 || t > s.length - 1 ? null : this.getPixelForValue(s[t].value);
  }
  getPixelForDecimal(t) {
    this._reversePixels && (t = 1 - t);
    const s = this._startPixel + t * this._length;
    return Dr(this._alignToPixels ? me(this.chart, s, 0) : s);
  }
  getDecimalForPixel(t) {
    const s = (t - this._startPixel) / this._length;
    return this._reversePixels ? 1 - s : s;
  }
  getBasePixel() {
    return this.getPixelForValue(this.getBaseValue());
  }
  getBaseValue() {
    const { min: t, max: s } = this;
    return t < 0 && s < 0 ? s : t > 0 && s > 0 ? t : 0;
  }
  getContext(t) {
    const s = this.ticks || [];
    if (t >= 0 && t < s.length) {
      const a = s[t];
      return a.$context || (a.$context = Kc(this.getContext(), t, a));
    }
    return this.$context || (this.$context = Uc(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, s = se(this.labelRotation), a = Math.abs(Math.cos(s)), n = Math.abs(Math.sin(s)), o = this._getLabelSizes(), i = t.autoSkipPadding || 0, r = o ? o.widest.width + i : 0, l = o ? o.highest.height + i : 0;
    return this.isHorizontal() ? l * a > r * n ? r / a : l / n : l * n < r * a ? l / a : r / n;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const s = this.axis, a = this.chart, n = this.options, { grid: o, position: i, border: r } = n, l = o.offset, d = this.isHorizontal(), h = this.ticks.length + (l ? 1 : 0), f = We(o), v = [], g = r.setContext(this.getContext()), _ = g.display ? g.width : 0, m = _ / 2, p = function(O) {
      return me(a, O, _);
    };
    let b, $, k, w, S, C, A, P, R, I, N, Y;
    if (i === "top")
      b = p(this.bottom), C = this.bottom - f, P = b - m, I = p(t.top) + m, Y = t.bottom;
    else if (i === "bottom")
      b = p(this.top), I = t.top, Y = p(t.bottom) - m, C = b + m, P = this.top + f;
    else if (i === "left")
      b = p(this.right), S = this.right - f, A = b - m, R = p(t.left) + m, N = t.right;
    else if (i === "right")
      b = p(this.left), R = t.left, N = p(t.right) - m, S = b + m, A = this.left + f;
    else if (s === "x") {
      if (i === "center")
        b = p((t.top + t.bottom) / 2 + 0.5);
      else if (it(i)) {
        const O = Object.keys(i)[0], z = i[O];
        b = p(this.chart.scales[O].getPixelForValue(z));
      }
      I = t.top, Y = t.bottom, C = b + m, P = C + f;
    } else if (s === "y") {
      if (i === "center")
        b = p((t.left + t.right) / 2);
      else if (it(i)) {
        const O = Object.keys(i)[0], z = i[O];
        b = p(this.chart.scales[O].getPixelForValue(z));
      }
      S = b - m, A = S - f, R = t.left, N = t.right;
    }
    const B = ot(n.ticks.maxTicksLimit, h), F = Math.max(1, Math.ceil(h / B));
    for ($ = 0; $ < h; $ += F) {
      const O = this.getContext($), z = o.setContext(O), W = r.setContext(O), V = z.lineWidth, H = z.color, at = W.dash || [], et = W.dashOffset, K = z.tickWidth, ht = z.tickColor, kt = z.tickBorderDash || [], ut = z.tickBorderDashOffset;
      k = Yc(this, $, l), k !== void 0 && (w = me(a, k, V), d ? S = A = R = N = w : C = P = I = Y = w, v.push({
        tx1: S,
        ty1: C,
        tx2: A,
        ty2: P,
        x1: R,
        y1: I,
        x2: N,
        y2: Y,
        width: V,
        color: H,
        borderDash: at,
        borderDashOffset: et,
        tickWidth: K,
        tickColor: ht,
        tickBorderDash: kt,
        tickBorderDashOffset: ut
      }));
    }
    return this._ticksLength = h, this._borderValue = b, v;
  }
  _computeLabelItems(t) {
    const s = this.axis, a = this.options, { position: n, ticks: o } = a, i = this.isHorizontal(), r = this.ticks, { align: l, crossAlign: d, padding: u, mirror: h } = o, f = We(a.grid), v = f + u, g = h ? -u : v, _ = -se(this.labelRotation), m = [];
    let p, b, $, k, w, S, C, A, P, R, I, N, Y = "middle";
    if (n === "top")
      S = this.bottom - g, C = this._getXAxisLabelAlignment();
    else if (n === "bottom")
      S = this.top + g, C = this._getXAxisLabelAlignment();
    else if (n === "left") {
      const F = this._getYAxisLabelAlignment(f);
      C = F.textAlign, w = F.x;
    } else if (n === "right") {
      const F = this._getYAxisLabelAlignment(f);
      C = F.textAlign, w = F.x;
    } else if (s === "x") {
      if (n === "center")
        S = (t.top + t.bottom) / 2 + v;
      else if (it(n)) {
        const F = Object.keys(n)[0], O = n[F];
        S = this.chart.scales[F].getPixelForValue(O) + v;
      }
      C = this._getXAxisLabelAlignment();
    } else if (s === "y") {
      if (n === "center")
        w = (t.left + t.right) / 2 - v;
      else if (it(n)) {
        const F = Object.keys(n)[0], O = n[F];
        w = this.chart.scales[F].getPixelForValue(O);
      }
      C = this._getYAxisLabelAlignment(f).textAlign;
    }
    s === "y" && (l === "start" ? Y = "top" : l === "end" && (Y = "bottom"));
    const B = this._getLabelSizes();
    for (p = 0, b = r.length; p < b; ++p) {
      $ = r[p], k = $.label;
      const F = o.setContext(this.getContext(p));
      A = this.getPixelForTick(p) + o.labelOffset, P = this._resolveTickFontOptions(p), R = P.lineHeight, I = $t(k) ? k.length : 1;
      const O = I / 2, z = F.color, W = F.textStrokeColor, V = F.textStrokeWidth;
      let H = C;
      i ? (w = A, C === "inner" && (p === b - 1 ? H = this.options.reverse ? "left" : "right" : p === 0 ? H = this.options.reverse ? "right" : "left" : H = "center"), n === "top" ? d === "near" || _ !== 0 ? N = -I * R + R / 2 : d === "center" ? N = -B.highest.height / 2 - O * R + R : N = -B.highest.height + R / 2 : d === "near" || _ !== 0 ? N = R / 2 : d === "center" ? N = B.highest.height / 2 - O * R : N = B.highest.height - I * R, h && (N *= -1), _ !== 0 && !F.showLabelBackdrop && (w += R / 2 * Math.sin(_))) : (S = A, N = (1 - I) * R / 2);
      let at;
      if (F.showLabelBackdrop) {
        const et = qt(F.backdropPadding), K = B.heights[p], ht = B.widths[p];
        let kt = N - et.top, ut = 0 - et.left;
        switch (Y) {
          case "middle":
            kt -= K / 2;
            break;
          case "bottom":
            kt -= K;
            break;
        }
        switch (C) {
          case "center":
            ut -= ht / 2;
            break;
          case "right":
            ut -= ht;
            break;
          case "inner":
            p === b - 1 ? ut -= ht : p > 0 && (ut -= ht / 2);
            break;
        }
        at = {
          left: ut,
          top: kt,
          width: ht + et.width,
          height: K + et.height,
          color: F.backdropColor
        };
      }
      m.push({
        label: k,
        font: P,
        textOffset: N,
        options: {
          rotation: _,
          color: z,
          strokeColor: W,
          strokeWidth: V,
          textAlign: H,
          textBaseline: Y,
          translation: [
            w,
            S
          ],
          backdrop: at
        }
      });
    }
    return m;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: s } = this.options;
    if (-se(this.labelRotation))
      return t === "top" ? "left" : "right";
    let n = "center";
    return s.align === "start" ? n = "left" : s.align === "end" ? n = "right" : s.align === "inner" && (n = "inner"), n;
  }
  _getYAxisLabelAlignment(t) {
    const { position: s, ticks: { crossAlign: a, mirror: n, padding: o } } = this.options, i = this._getLabelSizes(), r = t + o, l = i.widest.width;
    let d, u;
    return s === "left" ? n ? (u = this.right + o, a === "near" ? d = "left" : a === "center" ? (d = "center", u += l / 2) : (d = "right", u += l)) : (u = this.right - r, a === "near" ? d = "right" : a === "center" ? (d = "center", u -= l / 2) : (d = "left", u = this.left)) : s === "right" ? n ? (u = this.left + o, a === "near" ? d = "right" : a === "center" ? (d = "center", u -= l / 2) : (d = "left", u -= l)) : (u = this.left + r, a === "near" ? d = "left" : a === "center" ? (d = "center", u += l / 2) : (d = "right", u = this.right)) : d = "right", {
      textAlign: d,
      x: u
    };
  }
  _computeLabelArea() {
    if (this.options.ticks.mirror)
      return;
    const t = this.chart, s = this.options.position;
    if (s === "left" || s === "right")
      return {
        top: 0,
        left: this.left,
        bottom: t.height,
        right: this.right
      };
    if (s === "top" || s === "bottom")
      return {
        top: this.top,
        left: 0,
        bottom: this.bottom,
        right: t.width
      };
  }
  drawBackground() {
    const { ctx: t, options: { backgroundColor: s }, left: a, top: n, width: o, height: i } = this;
    s && (t.save(), t.fillStyle = s, t.fillRect(a, n, o, i), t.restore());
  }
  getLineWidthForValue(t) {
    const s = this.options.grid;
    if (!this._isVisible() || !s.display)
      return 0;
    const n = this.ticks.findIndex((o) => o.value === t);
    return n >= 0 ? s.setContext(this.getContext(n)).lineWidth : 0;
  }
  drawGrid(t) {
    const s = this.options.grid, a = this.ctx, n = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
    let o, i;
    const r = (l, d, u) => {
      !u.width || !u.color || (a.save(), a.lineWidth = u.width, a.strokeStyle = u.color, a.setLineDash(u.borderDash || []), a.lineDashOffset = u.borderDashOffset, a.beginPath(), a.moveTo(l.x, l.y), a.lineTo(d.x, d.y), a.stroke(), a.restore());
    };
    if (s.display)
      for (o = 0, i = n.length; o < i; ++o) {
        const l = n[o];
        s.drawOnChartArea && r({
          x: l.x1,
          y: l.y1
        }, {
          x: l.x2,
          y: l.y2
        }, l), s.drawTicks && r({
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
    const { chart: t, ctx: s, options: { border: a, grid: n } } = this, o = a.setContext(this.getContext()), i = a.display ? o.width : 0;
    if (!i)
      return;
    const r = n.setContext(this.getContext(0)).lineWidth, l = this._borderValue;
    let d, u, h, f;
    this.isHorizontal() ? (d = me(t, this.left, i) - i / 2, u = me(t, this.right, r) + r / 2, h = f = l) : (h = me(t, this.top, i) - i / 2, f = me(t, this.bottom, r) + r / 2, d = u = l), s.save(), s.lineWidth = o.width, s.strokeStyle = o.color, s.beginPath(), s.moveTo(d, h), s.lineTo(u, f), s.stroke(), s.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const a = this.ctx, n = this._computeLabelArea();
    n && Is(a, n);
    const o = this.getLabelItems(t);
    for (const i of o) {
      const r = i.options, l = i.font, d = i.label, u = i.textOffset;
      rs(a, d, 0, u, l, r);
    }
    n && Os(a);
  }
  drawTitle() {
    const { ctx: t, options: { position: s, title: a, reverse: n } } = this;
    if (!a.display)
      return;
    const o = Lt(a.font), i = qt(a.padding), r = a.align;
    let l = o.lineHeight / 2;
    s === "bottom" || s === "center" || it(s) ? (l += i.bottom, $t(a.text) && (l += o.lineHeight * (a.text.length - 1))) : l += i.top;
    const { titleX: d, titleY: u, maxWidth: h, rotation: f } = Gc(this, l, s, r);
    rs(t, a.text, 0, 0, o, {
      color: a.color,
      maxWidth: h,
      rotation: f,
      textAlign: Xc(r, s, n),
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
    const t = this.options, s = t.ticks && t.ticks.z || 0, a = ot(t.grid && t.grid.z, -1), n = ot(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== Re.prototype.draw ? [
      {
        z: s,
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
        z: n,
        draw: () => {
          this.drawBorder();
        }
      },
      {
        z: s,
        draw: (o) => {
          this.drawLabels(o);
        }
      }
    ];
  }
  getMatchingVisibleMetas(t) {
    const s = this.chart.getSortedVisibleDatasetMetas(), a = this.axis + "AxisID", n = [];
    let o, i;
    for (o = 0, i = s.length; o < i; ++o) {
      const r = s[o];
      r[a] === this.id && (!t || r.type === t) && n.push(r);
    }
    return n;
  }
  _resolveTickFontOptions(t) {
    const s = this.options.ticks.setContext(this.getContext(t));
    return Lt(s.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class xs {
  constructor(t, s, a) {
    this.type = t, this.scope = s, this.override = a, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const s = Object.getPrototypeOf(t);
    let a;
    Jc(s) && (a = this.register(s));
    const n = this.items, o = t.id, i = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + t);
    return o in n || (n[o] = t, Zc(t, i, a), this.override && wt.override(t.id, t.overrides)), i;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const s = this.items, a = t.id, n = this.scope;
    a in s && delete s[a], n && a in wt[n] && (delete wt[n][a], this.override && delete Se[a]);
  }
}
function Zc(e, t, s) {
  const a = ss(/* @__PURE__ */ Object.create(null), [
    s ? wt.get(s) : {},
    wt.get(t),
    e.defaults
  ]);
  wt.set(t, a), e.defaultRoutes && Qc(t, e.defaultRoutes), e.descriptors && wt.describe(t, e.descriptors);
}
function Qc(e, t) {
  Object.keys(t).forEach((s) => {
    const a = s.split("."), n = a.pop(), o = [
      e
    ].concat(a).join("."), i = t[s].split("."), r = i.pop(), l = i.join(".");
    wt.route(o, n, l, r);
  });
}
function Jc(e) {
  return "id" in e && "defaults" in e;
}
class td {
  constructor() {
    this.controllers = new xs(Vs, "datasets", !0), this.elements = new xs(oe, "elements"), this.plugins = new xs(Object, "plugins"), this.scales = new xs(Re, "scales"), this._typedRegistries = [
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
  _each(t, s, a) {
    [
      ...s
    ].forEach((n) => {
      const o = a || this._getRegistryForType(n);
      a || o.isForType(n) || o === this.plugins && n.id ? this._exec(t, o, n) : gt(n, (i) => {
        const r = a || this._getRegistryForType(i);
        this._exec(t, r, i);
      });
    });
  }
  _exec(t, s, a) {
    const n = Ba(t);
    bt(a["before" + n], [], a), s[t](a), bt(a["after" + n], [], a);
  }
  _getRegistryForType(t) {
    for (let s = 0; s < this._typedRegistries.length; s++) {
      const a = this._typedRegistries[s];
      if (a.isForType(t))
        return a;
    }
    return this.plugins;
  }
  _get(t, s, a) {
    const n = s.get(t);
    if (n === void 0)
      throw new Error('"' + t + '" is not a registered ' + a + ".");
    return n;
  }
}
var Xt = /* @__PURE__ */ new td();
class ed {
  constructor() {
    this._init = void 0;
  }
  notify(t, s, a, n) {
    if (s === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install")), this._init === void 0)
      return;
    const o = n ? this._descriptors(t).filter(n) : this._descriptors(t), i = this._notify(o, t, s, a);
    return s === "afterDestroy" && (this._notify(o, t, "stop"), this._notify(this._init, t, "uninstall"), this._init = void 0), i;
  }
  _notify(t, s, a, n) {
    n = n || {};
    for (const o of t) {
      const i = o.plugin, r = i[a], l = [
        s,
        n,
        o.options
      ];
      if (bt(r, l, i) === !1 && n.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    ft(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const s = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), s;
  }
  _createDescriptors(t, s) {
    const a = t && t.config, n = ot(a.options && a.options.plugins, {}), o = sd(a);
    return n === !1 && !s ? [] : nd(t, o, n, s);
  }
  _notifyStateChanges(t) {
    const s = this._oldCache || [], a = this._cache, n = (o, i) => o.filter((r) => !i.some((l) => r.plugin.id === l.plugin.id));
    this._notify(n(s, a), t, "stop"), this._notify(n(a, s), t, "start");
  }
}
function sd(e) {
  const t = {}, s = [], a = Object.keys(Xt.plugins.items);
  for (let o = 0; o < a.length; o++)
    s.push(Xt.getPlugin(a[o]));
  const n = e.plugins || [];
  for (let o = 0; o < n.length; o++) {
    const i = n[o];
    s.indexOf(i) === -1 && (s.push(i), t[i.id] = !0);
  }
  return {
    plugins: s,
    localIds: t
  };
}
function ad(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function nd(e, { plugins: t, localIds: s }, a, n) {
  const o = [], i = e.getContext();
  for (const r of t) {
    const l = r.id, d = ad(a[l], n);
    d !== null && o.push({
      plugin: r,
      options: od(e.config, {
        plugin: r,
        local: s[l]
      }, d, i)
    });
  }
  return o;
}
function od(e, { plugin: t, local: s }, a, n) {
  const o = e.pluginScopeKeys(t), i = e.getOptionScopes(a, o);
  return s && t.defaults && i.push(t.defaults), e.createResolver(i, n, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function wa(e, t) {
  const s = wt.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || s.indexAxis || "x";
}
function id(e, t) {
  let s = e;
  return e === "_index_" ? s = t : e === "_value_" && (s = t === "x" ? "y" : "x"), s;
}
function rd(e, t) {
  return e === t ? "_index_" : "_value_";
}
function On(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function ld(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function $a(e, ...t) {
  if (On(e))
    return e;
  for (const s of t) {
    const a = s.axis || ld(s.position) || e.length > 1 && On(e[0].toLowerCase());
    if (a)
      return a;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function zn(e, t, s) {
  if (s[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function cd(e, t) {
  if (t.data && t.data.datasets) {
    const s = t.data.datasets.filter((a) => a.xAxisID === e || a.yAxisID === e);
    if (s.length)
      return zn(e, "x", s[0]) || zn(e, "y", s[0]);
  }
  return {};
}
function dd(e, t) {
  const s = Se[e.type] || {
    scales: {}
  }, a = t.scales || {}, n = wa(e.type, t), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(a).forEach((i) => {
    const r = a[i];
    if (!it(r))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (r._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const l = $a(i, r, cd(i, e), wt.scales[r.type]), d = rd(l, n), u = s.scales || {};
    o[i] = Ze(/* @__PURE__ */ Object.create(null), [
      {
        axis: l
      },
      r,
      u[l],
      u[d]
    ]);
  }), e.data.datasets.forEach((i) => {
    const r = i.type || e.type, l = i.indexAxis || wa(r, t), u = (Se[r] || {}).scales || {};
    Object.keys(u).forEach((h) => {
      const f = id(h, l), v = i[f + "AxisID"] || f;
      o[v] = o[v] || /* @__PURE__ */ Object.create(null), Ze(o[v], [
        {
          axis: f
        },
        a[v],
        u[h]
      ]);
    });
  }), Object.keys(o).forEach((i) => {
    const r = o[i];
    Ze(r, [
      wt.scales[r.type],
      wt.scale
    ]);
  }), o;
}
function ui(e) {
  const t = e.options || (e.options = {});
  t.plugins = ot(t.plugins, {}), t.scales = dd(e, t);
}
function hi(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function ud(e) {
  return e = e || {}, e.data = hi(e.data), ui(e), e;
}
const Vn = /* @__PURE__ */ new Map(), fi = /* @__PURE__ */ new Set();
function ks(e, t) {
  let s = Vn.get(e);
  return s || (s = t(), Vn.set(e, s), fi.add(s)), s;
}
const He = (e, t, s) => {
  const a = Me(t, s);
  a !== void 0 && e.add(a);
};
class hd {
  constructor(t) {
    this._config = ud(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = hi(t);
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
    this.clearCache(), ui(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return ks(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, s) {
    return ks(`${t}.transition.${s}`, () => [
      [
        `datasets.${t}.transitions.${s}`,
        `transitions.${s}`
      ],
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetElementScopeKeys(t, s) {
    return ks(`${t}-${s}`, () => [
      [
        `datasets.${t}.elements.${s}`,
        `datasets.${t}`,
        `elements.${s}`,
        ""
      ]
    ]);
  }
  pluginScopeKeys(t) {
    const s = t.id, a = this.type;
    return ks(`${a}-plugin-${s}`, () => [
      [
        `plugins.${s}`,
        ...t.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(t, s) {
    const a = this._scopeCache;
    let n = a.get(t);
    return (!n || s) && (n = /* @__PURE__ */ new Map(), a.set(t, n)), n;
  }
  getOptionScopes(t, s, a) {
    const { options: n, type: o } = this, i = this._cachedScopes(t, a), r = i.get(s);
    if (r)
      return r;
    const l = /* @__PURE__ */ new Set();
    s.forEach((u) => {
      t && (l.add(t), u.forEach((h) => He(l, t, h))), u.forEach((h) => He(l, n, h)), u.forEach((h) => He(l, Se[o] || {}, h)), u.forEach((h) => He(l, wt, h)), u.forEach((h) => He(l, xa, h));
    });
    const d = Array.from(l);
    return d.length === 0 && d.push(/* @__PURE__ */ Object.create(null)), fi.has(s) && i.set(s, d), d;
  }
  chartOptionScopes() {
    const { options: t, type: s } = this;
    return [
      t,
      Se[s] || {},
      wt.datasets[s] || {},
      {
        type: s
      },
      wt,
      xa
    ];
  }
  resolveNamedOptions(t, s, a, n = [
    ""
  ]) {
    const o = {
      $shared: !0
    }, { resolver: i, subPrefixes: r } = Nn(this._resolverCache, t, n);
    let l = i;
    if (gd(i, s)) {
      o.$shared = !1, a = he(a) ? a() : a;
      const d = this.createResolver(t, a, r);
      l = Pe(i, a, d);
    }
    for (const d of s)
      o[d] = l[d];
    return o;
  }
  createResolver(t, s, a = [
    ""
  ], n) {
    const { resolver: o } = Nn(this._resolverCache, t, a);
    return it(s) ? Pe(o, s, void 0, n) : o;
  }
}
function Nn(e, t, s) {
  let a = e.get(t);
  a || (a = /* @__PURE__ */ new Map(), e.set(t, a));
  const n = s.join();
  let o = a.get(n);
  return o || (o = {
    resolver: Ia(t, s),
    subPrefixes: s.filter((r) => !r.toLowerCase().includes("hover"))
  }, a.set(n, o)), o;
}
const fd = (e) => it(e) && Object.getOwnPropertyNames(e).some((t) => he(e[t]));
function gd(e, t) {
  const { isScriptable: s, isIndexable: a } = qo(e);
  for (const n of t) {
    const o = s(n), i = a(n), r = (i || o) && e[n];
    if (o && (he(r) || fd(r)) || i && $t(r))
      return !0;
  }
  return !1;
}
var pd = "4.5.1";
const vd = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function Wn(e, t) {
  return e === "top" || e === "bottom" || vd.indexOf(e) === -1 && t === "x";
}
function Hn(e, t) {
  return function(s, a) {
    return s[e] === a[e] ? s[t] - a[t] : s[e] - a[e];
  };
}
function jn(e) {
  const t = e.chart, s = t.options.animation;
  t.notifyPlugins("afterRender"), bt(s && s.onComplete, [
    e
  ], t);
}
function bd(e) {
  const t = e.chart, s = t.options.animation;
  bt(s && s.onProgress, [
    e
  ], t);
}
function gi(e) {
  return Va() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const Ss = {}, Yn = (e) => {
  const t = gi(e);
  return Object.values(Ss).filter((s) => s.canvas === t).pop();
};
function md(e, t, s) {
  const a = Object.keys(e);
  for (const n of a) {
    const o = +n;
    if (o >= t) {
      const i = e[n];
      delete e[n], (s > 0 || o > t) && (e[o + s] = i);
    }
  }
}
function yd(e, t, s, a) {
  return !s || e.type === "mouseout" ? null : a ? t : e;
}
let Ie = class {
  static defaults = wt;
  static instances = Ss;
  static overrides = Se;
  static registry = Xt;
  static version = pd;
  static getChart = Yn;
  static register(...t) {
    Xt.add(...t), qn();
  }
  static unregister(...t) {
    Xt.remove(...t), qn();
  }
  constructor(t, s) {
    const a = this.config = new hd(s), n = gi(t), o = Yn(n);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const i = a.createResolver(a.chartOptionScopes(), this.getContext());
    this.platform = new (a.platform || Ic(n))(), this.platform.updateConfig(a);
    const r = this.platform.acquireContext(n, i.aspectRatio), l = r && r.canvas, d = l && l.height, u = l && l.width;
    if (this.id = fr(), this.ctx = r, this.canvas = l, this.width = u, this.height = d, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new ed(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = Lr((h) => this.update(h), i.resizeDelay || 0), this._dataChanges = [], Ss[this.id] = this, !r || !l) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    Jt.listen(this, "complete", jn), Jt.listen(this, "progress", bd), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: s }, width: a, height: n, _aspectRatio: o } = this;
    return ft(t) ? s && o ? o : n ? a / n : null : t;
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
    return Xt;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : gn(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return un(this.canvas, this.ctx), this;
  }
  stop() {
    return Jt.stop(this), this;
  }
  resize(t, s) {
    Jt.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: s
    } : this._resize(t, s);
  }
  _resize(t, s) {
    const a = this.options, n = this.canvas, o = a.maintainAspectRatio && this.aspectRatio, i = this.platform.getMaximumSize(n, t, s, o), r = a.devicePixelRatio || this.platform.getDevicePixelRatio(), l = this.width ? "resize" : "attach";
    this.width = i.width, this.height = i.height, this._aspectRatio = this.aspectRatio, gn(this, r, !0) && (this.notifyPlugins("resize", {
      size: i
    }), bt(a.onResize, [
      this,
      i
    ], this), this.attached && this._doResize(l) && this.render());
  }
  ensureScalesHaveIDs() {
    const s = this.options.scales || {};
    gt(s, (a, n) => {
      a.id = n;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, s = t.scales, a = this.scales, n = Object.keys(a).reduce((i, r) => (i[r] = !1, i), {});
    let o = [];
    s && (o = o.concat(Object.keys(s).map((i) => {
      const r = s[i], l = $a(i, r), d = l === "r", u = l === "x";
      return {
        options: r,
        dposition: d ? "chartArea" : u ? "bottom" : "left",
        dtype: d ? "radialLinear" : u ? "category" : "linear"
      };
    }))), gt(o, (i) => {
      const r = i.options, l = r.id, d = $a(l, r), u = ot(r.type, i.dtype);
      (r.position === void 0 || Wn(r.position, d) !== Wn(i.dposition)) && (r.position = i.dposition), n[l] = !0;
      let h = null;
      if (l in a && a[l].type === u)
        h = a[l];
      else {
        const f = Xt.getScale(u);
        h = new f({
          id: l,
          type: u,
          ctx: this.ctx,
          chart: this
        }), a[h.id] = h;
      }
      h.init(r, t);
    }), gt(n, (i, r) => {
      i || delete a[r];
    }), gt(a, (i) => {
      Yt.configure(this, i, i.options), Yt.addBox(this, i);
    });
  }
  _updateMetasets() {
    const t = this._metasets, s = this.data.datasets.length, a = t.length;
    if (t.sort((n, o) => n.index - o.index), a > s) {
      for (let n = s; n < a; ++n)
        this._destroyDatasetMeta(n);
      t.splice(s, a - s);
    }
    this._sortedMetasets = t.slice(0).sort(Hn("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: t, data: { datasets: s } } = this;
    t.length > s.length && delete this._stacks, t.forEach((a, n) => {
      s.filter((o) => o === a._dataset).length === 0 && this._destroyDatasetMeta(n);
    });
  }
  buildOrUpdateControllers() {
    const t = [], s = this.data.datasets;
    let a, n;
    for (this._removeUnreferencedMetasets(), a = 0, n = s.length; a < n; a++) {
      const o = s[a];
      let i = this.getDatasetMeta(a);
      const r = o.type || this.config.type;
      if (i.type && i.type !== r && (this._destroyDatasetMeta(a), i = this.getDatasetMeta(a)), i.type = r, i.indexAxis = o.indexAxis || wa(r, this.options), i.order = o.order || 0, i.index = a, i.label = "" + o.label, i.visible = this.isDatasetVisible(a), i.controller)
        i.controller.updateIndex(a), i.controller.linkScales();
      else {
        const l = Xt.getController(r), { datasetElementType: d, dataElementType: u } = wt.datasets[r];
        Object.assign(l, {
          dataElementType: Xt.getElement(u),
          datasetElementType: d && Xt.getElement(d)
        }), i.controller = new l(this, a), t.push(i.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    gt(this.data.datasets, (t, s) => {
      this.getDatasetMeta(s).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(t) {
    const s = this.config;
    s.update();
    const a = this._options = s.createResolver(s.chartOptionScopes(), this.getContext()), n = this._animationsDisabled = !a.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
      mode: t,
      cancelable: !0
    }) === !1)
      return;
    const o = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let i = 0;
    for (let d = 0, u = this.data.datasets.length; d < u; d++) {
      const { controller: h } = this.getDatasetMeta(d), f = !n && o.indexOf(h) === -1;
      h.buildOrUpdateElements(f), i = Math.max(+h.getMaxOverflow(), i);
    }
    i = this._minPadding = a.layout.autoPadding ? i : 0, this._updateLayout(i), n || gt(o, (d) => {
      d.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(Hn("z", "_idx"));
    const { _active: r, _lastEvent: l } = this;
    l ? this._eventHandler(l, !0) : r.length && this._updateHoverStyles(r, r, !0), this.render();
  }
  _updateScales() {
    gt(this.scales, (t) => {
      Yt.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, s = new Set(Object.keys(this._listeners)), a = new Set(t.events);
    (!tn(s, a) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, s = this._getUniformDataChanges() || [];
    for (const { method: a, start: n, count: o } of s) {
      const i = a === "_removeElements" ? -o : o;
      md(t, n, i);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const s = this.data.datasets.length, a = (o) => new Set(t.filter((i) => i[0] === o).map((i, r) => r + "," + i.splice(1).join(","))), n = a(0);
    for (let o = 1; o < s; o++)
      if (!tn(n, a(o)))
        return;
    return Array.from(n).map((o) => o.split(",")).map((o) => ({
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
    Yt.update(this, this.width, this.height, t);
    const s = this.chartArea, a = s.width <= 0 || s.height <= 0;
    this._layers = [], gt(this.boxes, (n) => {
      a && n.position === "chartArea" || (n.configure && n.configure(), this._layers.push(...n._layers()));
    }, this), this._layers.forEach((n, o) => {
      n._idx = o;
    }), this.notifyPlugins("afterLayout");
  }
  _updateDatasets(t) {
    if (this.notifyPlugins("beforeDatasetsUpdate", {
      mode: t,
      cancelable: !0
    }) !== !1) {
      for (let s = 0, a = this.data.datasets.length; s < a; ++s)
        this.getDatasetMeta(s).controller.configure();
      for (let s = 0, a = this.data.datasets.length; s < a; ++s)
        this._updateDataset(s, he(t) ? t({
          datasetIndex: s
        }) : t);
      this.notifyPlugins("afterDatasetsUpdate", {
        mode: t
      });
    }
  }
  _updateDataset(t, s) {
    const a = this.getDatasetMeta(t), n = {
      meta: a,
      index: t,
      mode: s,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetUpdate", n) !== !1 && (a.controller._update(s), n.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", n));
  }
  render() {
    this.notifyPlugins("beforeRender", {
      cancelable: !0
    }) !== !1 && (Jt.has(this) ? this.attached && !Jt.running(this) && Jt.start(this) : (this.draw(), jn({
      chart: this
    })));
  }
  draw() {
    let t;
    if (this._resizeBeforeDraw) {
      const { width: a, height: n } = this._resizeBeforeDraw;
      this._resizeBeforeDraw = null, this._resize(a, n);
    }
    if (this.clear(), this.width <= 0 || this.height <= 0 || this.notifyPlugins("beforeDraw", {
      cancelable: !0
    }) === !1)
      return;
    const s = this._layers;
    for (t = 0; t < s.length && s[t].z <= 0; ++t)
      s[t].draw(this.chartArea);
    for (this._drawDatasets(); t < s.length; ++t)
      s[t].draw(this.chartArea);
    this.notifyPlugins("afterDraw");
  }
  _getSortedDatasetMetas(t) {
    const s = this._sortedMetasets, a = [];
    let n, o;
    for (n = 0, o = s.length; n < o; ++n) {
      const i = s[n];
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
    for (let s = t.length - 1; s >= 0; --s)
      this._drawDataset(t[s]);
    this.notifyPlugins("afterDatasetsDraw");
  }
  _drawDataset(t) {
    const s = this.ctx, a = {
      meta: t,
      index: t.index,
      cancelable: !0
    }, n = si(this, t);
    this.notifyPlugins("beforeDatasetDraw", a) !== !1 && (n && Is(s, n), t.controller.draw(), n && Os(s), a.cancelable = !1, this.notifyPlugins("afterDatasetDraw", a));
  }
  isPointInArea(t) {
    return is(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, s, a, n) {
    const o = vc.modes[s];
    return typeof o == "function" ? o(this, t, a, n) : [];
  }
  getDatasetMeta(t) {
    const s = this.data.datasets[t], a = this._metasets;
    let n = a.filter((o) => o && o._dataset === s).pop();
    return n || (n = {
      type: null,
      data: [],
      dataset: null,
      controller: null,
      hidden: null,
      xAxisID: null,
      yAxisID: null,
      order: s && s.order || 0,
      index: t,
      _dataset: s,
      _parsed: [],
      _sorted: !1
    }, a.push(n)), n;
  }
  getContext() {
    return this.$context || (this.$context = Ce(null, {
      chart: this,
      type: "chart"
    }));
  }
  getVisibleDatasetCount() {
    return this.getSortedVisibleDatasetMetas().length;
  }
  isDatasetVisible(t) {
    const s = this.data.datasets[t];
    if (!s)
      return !1;
    const a = this.getDatasetMeta(t);
    return typeof a.hidden == "boolean" ? !a.hidden : !s.hidden;
  }
  setDatasetVisibility(t, s) {
    const a = this.getDatasetMeta(t);
    a.hidden = !s;
  }
  toggleDataVisibility(t) {
    this._hiddenIndices[t] = !this._hiddenIndices[t];
  }
  getDataVisibility(t) {
    return !this._hiddenIndices[t];
  }
  _updateVisibility(t, s, a) {
    const n = a ? "show" : "hide", o = this.getDatasetMeta(t), i = o.controller._resolveAnimations(void 0, n);
    as(s) ? (o.data[s].hidden = !a, this.update()) : (this.setDatasetVisibility(t, a), i.update(o, {
      visible: a
    }), this.update((r) => r.datasetIndex === t ? n : void 0));
  }
  hide(t, s) {
    this._updateVisibility(t, s, !1);
  }
  show(t, s) {
    this._updateVisibility(t, s, !0);
  }
  _destroyDatasetMeta(t) {
    const s = this._metasets[t];
    s && s.controller && s.controller._destroy(), delete this._metasets[t];
  }
  _stop() {
    let t, s;
    for (this.stop(), Jt.remove(this), t = 0, s = this.data.datasets.length; t < s; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: s } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), un(t, s), this.platform.releaseContext(s), this.canvas = null, this.ctx = null), delete Ss[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const t = this._listeners, s = this.platform, a = (o, i) => {
      s.addEventListener(this, o, i), t[o] = i;
    }, n = (o, i, r) => {
      o.offsetX = i, o.offsetY = r, this._eventHandler(o);
    };
    gt(this.options.events, (o) => a(o, n));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, s = this.platform, a = (l, d) => {
      s.addEventListener(this, l, d), t[l] = d;
    }, n = (l, d) => {
      t[l] && (s.removeEventListener(this, l, d), delete t[l]);
    }, o = (l, d) => {
      this.canvas && this.resize(l, d);
    };
    let i;
    const r = () => {
      n("attach", r), this.attached = !0, this.resize(), a("resize", o), a("detach", i);
    };
    i = () => {
      this.attached = !1, n("resize", o), this._stop(), this._resize(0, 0), a("attach", r);
    }, s.isAttached(this.canvas) ? r() : i();
  }
  unbindEvents() {
    gt(this._listeners, (t, s) => {
      this.platform.removeEventListener(this, s, t);
    }), this._listeners = {}, gt(this._responsiveListeners, (t, s) => {
      this.platform.removeEventListener(this, s, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, s, a) {
    const n = a ? "set" : "remove";
    let o, i, r, l;
    for (s === "dataset" && (o = this.getDatasetMeta(t[0].datasetIndex), o.controller["_" + n + "DatasetHoverStyle"]()), r = 0, l = t.length; r < l; ++r) {
      i = t[r];
      const d = i && this.getDatasetMeta(i.datasetIndex).controller;
      d && d[n + "HoverStyle"](i.element, i.datasetIndex, i.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const s = this._active || [], a = t.map(({ datasetIndex: o, index: i }) => {
      const r = this.getDatasetMeta(o);
      if (!r)
        throw new Error("No dataset found at index " + o);
      return {
        datasetIndex: o,
        element: r.data[i],
        index: i
      };
    });
    !Ts(a, s) && (this._active = a, this._lastEvent = null, this._updateHoverStyles(a, s));
  }
  notifyPlugins(t, s, a) {
    return this._plugins.notify(this, t, s, a);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((s) => s.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, s, a) {
    const n = this.options.hover, o = (l, d) => l.filter((u) => !d.some((h) => u.datasetIndex === h.datasetIndex && u.index === h.index)), i = o(s, t), r = a ? t : o(t, s);
    i.length && this.updateHoverStyle(i, n.mode, !1), r.length && n.mode && this.updateHoverStyle(r, n.mode, !0);
  }
  _eventHandler(t, s) {
    const a = {
      event: t,
      replay: s,
      cancelable: !0,
      inChartArea: this.isPointInArea(t)
    }, n = (i) => (i.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", a, n) === !1)
      return;
    const o = this._handleEvent(t, s, a.inChartArea);
    return a.cancelable = !1, this.notifyPlugins("afterEvent", a, n), (o || a.changed) && this.render(), this;
  }
  _handleEvent(t, s, a) {
    const { _active: n = [], options: o } = this, i = s, r = this._getActiveElements(t, n, a, i), l = yr(t), d = yd(t, this._lastEvent, a, l);
    a && (this._lastEvent = null, bt(o.onHover, [
      t,
      r,
      this
    ], this), l && bt(o.onClick, [
      t,
      r,
      this
    ], this));
    const u = !Ts(r, n);
    return (u || s) && (this._active = r, this._updateHoverStyles(r, n, s)), this._lastEvent = d, u;
  }
  _getActiveElements(t, s, a, n) {
    if (t.type === "mouseout")
      return [];
    if (!a)
      return s;
    const o = this.options.hover;
    return this.getElementsAtEventForMode(t, o.mode, o, n);
  }
};
function qn() {
  return gt(Ie.instances, (e) => e._plugins.invalidate());
}
function _d(e, t, s) {
  const { startAngle: a, x: n, y: o, outerRadius: i, innerRadius: r, options: l } = t, { borderWidth: d, borderJoinStyle: u } = l, h = Math.min(d / i, Ot(a - s));
  if (e.beginPath(), e.arc(n, o, i - d / 2, a + h / 2, s - h / 2), r > 0) {
    const f = Math.min(d / r, Ot(a - s));
    e.arc(n, o, r + d / 2, s - f / 2, a + f / 2, !0);
  } else {
    const f = Math.min(d / 2, i * Ot(a - s));
    if (u === "round")
      e.arc(n, o, f, s - pt / 2, a + pt / 2, !0);
    else if (u === "bevel") {
      const v = 2 * f * f, g = -v * Math.cos(s + pt / 2) + n, _ = -v * Math.sin(s + pt / 2) + o, m = v * Math.cos(a + pt / 2) + n, p = v * Math.sin(a + pt / 2) + o;
      e.lineTo(g, _), e.lineTo(m, p);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function xd(e, t, s) {
  const { startAngle: a, pixelMargin: n, x: o, y: i, outerRadius: r, innerRadius: l } = t;
  let d = n / r;
  e.beginPath(), e.arc(o, i, r, a - d, s + d), l > n ? (d = n / l, e.arc(o, i, l, s + d, a - d, !0)) : e.arc(o, i, n, s + Mt, a - Mt), e.closePath(), e.clip();
}
function kd(e) {
  return Ra(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function wd(e, t, s, a) {
  const n = kd(e.options.borderRadius), o = (s - t) / 2, i = Math.min(o, a * t / 2), r = (l) => {
    const d = (s - Math.min(o, l)) * a / 2;
    return Bt(l, 0, Math.min(o, d));
  };
  return {
    outerStart: r(n.outerStart),
    outerEnd: r(n.outerEnd),
    innerStart: Bt(n.innerStart, 0, i),
    innerEnd: Bt(n.innerEnd, 0, i)
  };
}
function Te(e, t, s, a) {
  return {
    x: s + e * Math.cos(t),
    y: a + e * Math.sin(t)
  };
}
function Rs(e, t, s, a, n, o) {
  const { x: i, y: r, startAngle: l, pixelMargin: d, innerRadius: u } = t, h = Math.max(t.outerRadius + a + s - d, 0), f = u > 0 ? u + a + s + d : 0;
  let v = 0;
  const g = n - l;
  if (a) {
    const F = u > 0 ? u - a : 0, O = h > 0 ? h - a : 0, z = (F + O) / 2, W = z !== 0 ? g * z / (z + a) : g;
    v = (g - W) / 2;
  }
  const _ = Math.max(1e-3, g * h - s / pt) / h, m = (g - _) / 2, p = l + m + v, b = n - m - v, { outerStart: $, outerEnd: k, innerStart: w, innerEnd: S } = wd(t, f, h, b - p), C = h - $, A = h - k, P = p + $ / C, R = b - k / A, I = f + w, N = f + S, Y = p + w / I, B = b - S / N;
  if (e.beginPath(), o) {
    const F = (P + R) / 2;
    if (e.arc(i, r, h, P, F), e.arc(i, r, h, F, R), k > 0) {
      const V = Te(A, R, i, r);
      e.arc(V.x, V.y, k, R, b + Mt);
    }
    const O = Te(N, b, i, r);
    if (e.lineTo(O.x, O.y), S > 0) {
      const V = Te(N, B, i, r);
      e.arc(V.x, V.y, S, b + Mt, B + Math.PI);
    }
    const z = (b - S / f + (p + w / f)) / 2;
    if (e.arc(i, r, f, b - S / f, z, !0), e.arc(i, r, f, z, p + w / f, !0), w > 0) {
      const V = Te(I, Y, i, r);
      e.arc(V.x, V.y, w, Y + Math.PI, p - Mt);
    }
    const W = Te(C, p, i, r);
    if (e.lineTo(W.x, W.y), $ > 0) {
      const V = Te(C, P, i, r);
      e.arc(V.x, V.y, $, p - Mt, P);
    }
  } else {
    e.moveTo(i, r);
    const F = Math.cos(P) * h + i, O = Math.sin(P) * h + r;
    e.lineTo(F, O);
    const z = Math.cos(R) * h + i, W = Math.sin(R) * h + r;
    e.lineTo(z, W);
  }
  e.closePath();
}
function $d(e, t, s, a, n) {
  const { fullCircles: o, startAngle: i, circumference: r } = t;
  let l = t.endAngle;
  if (o) {
    Rs(e, t, s, a, l, n);
    for (let d = 0; d < o; ++d)
      e.fill();
    isNaN(r) || (l = i + (r % mt || mt));
  }
  return Rs(e, t, s, a, l, n), e.fill(), l;
}
function Md(e, t, s, a, n) {
  const { fullCircles: o, startAngle: i, circumference: r, options: l } = t, { borderWidth: d, borderJoinStyle: u, borderDash: h, borderDashOffset: f, borderRadius: v } = l, g = l.borderAlign === "inner";
  if (!d)
    return;
  e.setLineDash(h || []), e.lineDashOffset = f, g ? (e.lineWidth = d * 2, e.lineJoin = u || "round") : (e.lineWidth = d, e.lineJoin = u || "bevel");
  let _ = t.endAngle;
  if (o) {
    Rs(e, t, s, a, _, n);
    for (let m = 0; m < o; ++m)
      e.stroke();
    isNaN(r) || (_ = i + (r % mt || mt));
  }
  g && xd(e, t, _), l.selfJoin && _ - i >= pt && v === 0 && u !== "miter" && _d(e, t, _), o || (Rs(e, t, s, a, _, n), e.stroke());
}
class Sd extends oe {
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
  inRange(t, s, a) {
    const n = this.getProps([
      "x",
      "y"
    ], a), { angle: o, distance: i } = Oo(n, {
      x: t,
      y: s
    }), { startAngle: r, endAngle: l, innerRadius: d, outerRadius: u, circumference: h } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], a), f = (this.options.spacing + this.options.borderWidth) / 2, v = ot(h, l - r), g = os(o, r, l) && r !== l, _ = v >= mt || g, m = ae(i, d + f, u + f);
    return _ && m;
  }
  getCenterPoint(t) {
    const { x: s, y: a, startAngle: n, endAngle: o, innerRadius: i, outerRadius: r } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], t), { offset: l, spacing: d } = this.options, u = (n + o) / 2, h = (i + r + d + l) / 2;
    return {
      x: s + Math.cos(u) * h,
      y: a + Math.sin(u) * h
    };
  }
  tooltipPosition(t) {
    return this.getCenterPoint(t);
  }
  draw(t) {
    const { options: s, circumference: a } = this, n = (s.offset || 0) / 4, o = (s.spacing || 0) / 2, i = s.circular;
    if (this.pixelMargin = s.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = a > mt ? Math.floor(a / mt) : 0, a === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const r = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(r) * n, Math.sin(r) * n);
    const l = 1 - Math.sin(Math.min(pt, a || 0)), d = n * l;
    t.fillStyle = s.backgroundColor, t.strokeStyle = s.borderColor, $d(t, this, d, o, i), Md(t, this, d, o, i), t.restore();
  }
}
function pi(e, t, s = t) {
  e.lineCap = ot(s.borderCapStyle, t.borderCapStyle), e.setLineDash(ot(s.borderDash, t.borderDash)), e.lineDashOffset = ot(s.borderDashOffset, t.borderDashOffset), e.lineJoin = ot(s.borderJoinStyle, t.borderJoinStyle), e.lineWidth = ot(s.borderWidth, t.borderWidth), e.strokeStyle = ot(s.borderColor, t.borderColor);
}
function Cd(e, t, s) {
  e.lineTo(s.x, s.y);
}
function Dd(e) {
  return e.stepped ? qr : e.tension || e.cubicInterpolationMode === "monotone" ? Ur : Cd;
}
function vi(e, t, s = {}) {
  const a = e.length, { start: n = 0, end: o = a - 1 } = s, { start: i, end: r } = t, l = Math.max(n, i), d = Math.min(o, r), u = n < i && o < i || n > r && o > r;
  return {
    count: a,
    start: l,
    loop: t.loop,
    ilen: d < l && !u ? a + d - l : d - l
  };
}
function Ad(e, t, s, a) {
  const { points: n, options: o } = t, { count: i, start: r, loop: l, ilen: d } = vi(n, s, a), u = Dd(o);
  let { move: h = !0, reverse: f } = a || {}, v, g, _;
  for (v = 0; v <= d; ++v)
    g = n[(r + (f ? d - v : v)) % i], !g.skip && (h ? (e.moveTo(g.x, g.y), h = !1) : u(e, _, g, f, o.stepped), _ = g);
  return l && (g = n[(r + (f ? d : 0)) % i], u(e, _, g, f, o.stepped)), !!l;
}
function Td(e, t, s, a) {
  const n = t.points, { count: o, start: i, ilen: r } = vi(n, s, a), { move: l = !0, reverse: d } = a || {};
  let u = 0, h = 0, f, v, g, _, m, p;
  const b = (k) => (i + (d ? r - k : k)) % o, $ = () => {
    _ !== m && (e.lineTo(u, m), e.lineTo(u, _), e.lineTo(u, p));
  };
  for (l && (v = n[b(0)], e.moveTo(v.x, v.y)), f = 0; f <= r; ++f) {
    if (v = n[b(f)], v.skip)
      continue;
    const k = v.x, w = v.y, S = k | 0;
    S === g ? (w < _ ? _ = w : w > m && (m = w), u = (h * u + k) / ++h) : ($(), e.lineTo(k, w), g = S, h = 0, _ = m = w), p = w;
  }
  $();
}
function Ma(e) {
  const t = e.options, s = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !s ? Td : Ad;
}
function Bd(e) {
  return e.stepped ? Ml : e.tension || e.cubicInterpolationMode === "monotone" ? Sl : ke;
}
function Ld(e, t, s, a) {
  let n = t._path;
  n || (n = t._path = new Path2D(), t.path(n, s, a) && n.closePath()), pi(e, t.options), e.stroke(n);
}
function Fd(e, t, s, a) {
  const { segments: n, options: o } = t, i = Ma(t);
  for (const r of n)
    pi(e, o, r.style), e.beginPath(), i(e, t, r, {
      start: s,
      end: s + a - 1
    }) && e.closePath(), e.stroke();
}
const Pd = typeof Path2D == "function";
function Ed(e, t, s, a) {
  Pd && !t.options.segment ? Ld(e, t, s, a) : Fd(e, t, s, a);
}
class Ws extends oe {
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
  updateControlPoints(t, s) {
    const a = this.options;
    if ((a.tension || a.cubicInterpolationMode === "monotone") && !a.stepped && !this._pointsUpdated) {
      const n = a.spanGaps ? this._loop : this._fullLoop;
      bl(this._points, a, t, n, s), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = Ll(this, this.options.segment));
  }
  first() {
    const t = this.segments, s = this.points;
    return t.length && s[t[0].start];
  }
  last() {
    const t = this.segments, s = this.points, a = t.length;
    return a && s[t[a - 1].end];
  }
  interpolate(t, s) {
    const a = this.options, n = t[s], o = this.points, i = ei(this, {
      property: s,
      start: n,
      end: n
    });
    if (!i.length)
      return;
    const r = [], l = Bd(a);
    let d, u;
    for (d = 0, u = i.length; d < u; ++d) {
      const { start: h, end: f } = i[d], v = o[h], g = o[f];
      if (v === g) {
        r.push(v);
        continue;
      }
      const _ = Math.abs((n - v[s]) / (g[s] - v[s])), m = l(v, g, _, a.stepped);
      m[s] = t[s], r.push(m);
    }
    return r.length === 1 ? r[0] : r;
  }
  pathSegment(t, s, a) {
    return Ma(this)(t, this, s, a);
  }
  path(t, s, a) {
    const n = this.segments, o = Ma(this);
    let i = this._loop;
    s = s || 0, a = a || this.points.length - s;
    for (const r of n)
      i &= o(t, this, r, {
        start: s,
        end: s + a - 1
      });
    return !!i;
  }
  draw(t, s, a, n) {
    const o = this.options || {};
    (this.points || []).length && o.borderWidth && (t.save(), Ed(t, this, a, n), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function Un(e, t, s, a) {
  const n = e.options, { [s]: o } = e.getProps([
    s
  ], a);
  return Math.abs(t - o) < n.radius + n.hitRadius;
}
class Rd extends oe {
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
  inRange(t, s, a) {
    const n = this.options, { x: o, y: i } = this.getProps([
      "x",
      "y"
    ], a);
    return Math.pow(t - o, 2) + Math.pow(s - i, 2) < Math.pow(n.hitRadius + n.radius, 2);
  }
  inXRange(t, s) {
    return Un(this, t, "x", s);
  }
  inYRange(t, s) {
    return Un(this, t, "y", s);
  }
  getCenterPoint(t) {
    const { x: s, y: a } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: s,
      y: a
    };
  }
  size(t) {
    t = t || this.options || {};
    let s = t.radius || 0;
    s = Math.max(s, s && t.hoverRadius || 0);
    const a = s && t.borderWidth || 0;
    return (s + a) * 2;
  }
  draw(t, s) {
    const a = this.options;
    this.skip || a.radius < 0.1 || !is(this, s, this.size(a) / 2) || (t.strokeStyle = a.borderColor, t.lineWidth = a.borderWidth, t.fillStyle = a.backgroundColor, ka(t, a, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function bi(e, t) {
  const { x: s, y: a, base: n, width: o, height: i } = e.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let r, l, d, u, h;
  return e.horizontal ? (h = i / 2, r = Math.min(s, n), l = Math.max(s, n), d = a - h, u = a + h) : (h = o / 2, r = s - h, l = s + h, d = Math.min(a, n), u = Math.max(a, n)), {
    left: r,
    top: d,
    right: l,
    bottom: u
  };
}
function ce(e, t, s, a) {
  return e ? 0 : Bt(t, s, a);
}
function Id(e, t, s) {
  const a = e.options.borderWidth, n = e.borderSkipped, o = Yo(a);
  return {
    t: ce(n.top, o.top, 0, s),
    r: ce(n.right, o.right, 0, t),
    b: ce(n.bottom, o.bottom, 0, s),
    l: ce(n.left, o.left, 0, t)
  };
}
function Od(e, t, s) {
  const { enableBorderRadius: a } = e.getProps([
    "enableBorderRadius"
  ]), n = e.options.borderRadius, o = Le(n), i = Math.min(t, s), r = e.borderSkipped, l = a || it(n);
  return {
    topLeft: ce(!l || r.top || r.left, o.topLeft, 0, i),
    topRight: ce(!l || r.top || r.right, o.topRight, 0, i),
    bottomLeft: ce(!l || r.bottom || r.left, o.bottomLeft, 0, i),
    bottomRight: ce(!l || r.bottom || r.right, o.bottomRight, 0, i)
  };
}
function zd(e) {
  const t = bi(e), s = t.right - t.left, a = t.bottom - t.top, n = Id(e, s / 2, a / 2), o = Od(e, s / 2, a / 2);
  return {
    outer: {
      x: t.left,
      y: t.top,
      w: s,
      h: a,
      radius: o
    },
    inner: {
      x: t.left + n.l,
      y: t.top + n.t,
      w: s - n.l - n.r,
      h: a - n.t - n.b,
      radius: {
        topLeft: Math.max(0, o.topLeft - Math.max(n.t, n.l)),
        topRight: Math.max(0, o.topRight - Math.max(n.t, n.r)),
        bottomLeft: Math.max(0, o.bottomLeft - Math.max(n.b, n.l)),
        bottomRight: Math.max(0, o.bottomRight - Math.max(n.b, n.r))
      }
    }
  };
}
function aa(e, t, s, a) {
  const n = t === null, o = s === null, r = e && !(n && o) && bi(e, a);
  return r && (n || ae(t, r.left, r.right)) && (o || ae(s, r.top, r.bottom));
}
function Vd(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function Nd(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function na(e, t, s = {}) {
  const a = e.x !== s.x ? -t : 0, n = e.y !== s.y ? -t : 0, o = (e.x + e.w !== s.x + s.w ? t : 0) - a, i = (e.y + e.h !== s.y + s.h ? t : 0) - n;
  return {
    x: e.x + a,
    y: e.y + n,
    w: e.w + o,
    h: e.h + i,
    radius: e.radius
  };
}
class Wd extends oe {
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
    const { inflateAmount: s, options: { borderColor: a, backgroundColor: n } } = this, { inner: o, outer: i } = zd(this), r = Vd(i.radius) ? Fs : Nd;
    t.save(), (i.w !== o.w || i.h !== o.h) && (t.beginPath(), r(t, na(i, s, o)), t.clip(), r(t, na(o, -s, i)), t.fillStyle = a, t.fill("evenodd")), t.beginPath(), r(t, na(o, s)), t.fillStyle = n, t.fill(), t.restore();
  }
  inRange(t, s, a) {
    return aa(this, t, s, a);
  }
  inXRange(t, s) {
    return aa(this, t, null, s);
  }
  inYRange(t, s) {
    return aa(this, null, t, s);
  }
  getCenterPoint(t) {
    const { x: s, y: a, base: n, horizontal: o } = this.getProps([
      "x",
      "y",
      "base",
      "horizontal"
    ], t);
    return {
      x: o ? (s + n) / 2 : s,
      y: o ? a : (a + n) / 2
    };
  }
  getRange(t) {
    return t === "x" ? this.width / 2 : this.height / 2;
  }
}
function Hd(e, t, s) {
  const a = e.segments, n = e.points, o = t.points, i = [];
  for (const r of a) {
    let { start: l, end: d } = r;
    d = Hs(l, d, n);
    const u = Sa(s, n[l], n[d], r.loop);
    if (!t.segments) {
      i.push({
        source: r,
        target: u,
        start: n[l],
        end: n[d]
      });
      continue;
    }
    const h = ei(t, u);
    for (const f of h) {
      const v = Sa(s, o[f.start], o[f.end], f.loop), g = ti(r, n, v);
      for (const _ of g)
        i.push({
          source: _,
          target: f,
          start: {
            [s]: Kn(u, v, "start", Math.max)
          },
          end: {
            [s]: Kn(u, v, "end", Math.min)
          }
        });
    }
  }
  return i;
}
function Sa(e, t, s, a) {
  if (a)
    return;
  let n = t[e], o = s[e];
  return e === "angle" && (n = Ot(n), o = Ot(o)), {
    property: e,
    start: n,
    end: o
  };
}
function jd(e, t) {
  const { x: s = null, y: a = null } = e || {}, n = t.points, o = [];
  return t.segments.forEach(({ start: i, end: r }) => {
    r = Hs(i, r, n);
    const l = n[i], d = n[r];
    a !== null ? (o.push({
      x: l.x,
      y: a
    }), o.push({
      x: d.x,
      y: a
    })) : s !== null && (o.push({
      x: s,
      y: l.y
    }), o.push({
      x: s,
      y: d.y
    }));
  }), o;
}
function Hs(e, t, s) {
  for (; t > e; t--) {
    const a = s[t];
    if (!isNaN(a.x) && !isNaN(a.y))
      break;
  }
  return t;
}
function Kn(e, t, s, a) {
  return e && t ? a(e[s], t[s]) : e ? e[s] : t ? t[s] : 0;
}
function mi(e, t) {
  let s = [], a = !1;
  return $t(e) ? (a = !0, s = e) : s = jd(e, t), s.length ? new Ws({
    points: s,
    options: {
      tension: 0
    },
    _loop: a,
    _fullLoop: a
  }) : null;
}
function Xn(e) {
  return e && e.fill !== !1;
}
function Yd(e, t, s) {
  let n = e[t].fill;
  const o = [
    t
  ];
  let i;
  if (!s)
    return n;
  for (; n !== !1 && o.indexOf(n) === -1; ) {
    if (!Ft(n))
      return n;
    if (i = e[n], !i)
      return !1;
    if (i.visible)
      return n;
    o.push(n), n = i.fill;
  }
  return !1;
}
function qd(e, t, s) {
  const a = Gd(e);
  if (it(a))
    return isNaN(a.value) ? !1 : a;
  let n = parseFloat(a);
  return Ft(n) && Math.floor(n) === n ? Ud(a[0], t, n, s) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(a) >= 0 && a;
}
function Ud(e, t, s, a) {
  return (e === "-" || e === "+") && (s = t + s), s === t || s < 0 || s >= a ? !1 : s;
}
function Kd(e, t) {
  let s = null;
  return e === "start" ? s = t.bottom : e === "end" ? s = t.top : it(e) ? s = t.getPixelForValue(e.value) : t.getBasePixel && (s = t.getBasePixel()), s;
}
function Xd(e, t, s) {
  let a;
  return e === "start" ? a = s : e === "end" ? a = t.options.reverse ? t.min : t.max : it(e) ? a = e.value : a = t.getBaseValue(), a;
}
function Gd(e) {
  const t = e.options, s = t.fill;
  let a = ot(s && s.target, s);
  return a === void 0 && (a = !!t.backgroundColor), a === !1 || a === null ? !1 : a === !0 ? "origin" : a;
}
function Zd(e) {
  const { scale: t, index: s, line: a } = e, n = [], o = a.segments, i = a.points, r = Qd(t, s);
  r.push(mi({
    x: null,
    y: t.bottom
  }, a));
  for (let l = 0; l < o.length; l++) {
    const d = o[l];
    for (let u = d.start; u <= d.end; u++)
      Jd(n, i[u], r);
  }
  return new Ws({
    points: n,
    options: {}
  });
}
function Qd(e, t) {
  const s = [], a = e.getMatchingVisibleMetas("line");
  for (let n = 0; n < a.length; n++) {
    const o = a[n];
    if (o.index === t)
      break;
    o.hidden || s.unshift(o.dataset);
  }
  return s;
}
function Jd(e, t, s) {
  const a = [];
  for (let n = 0; n < s.length; n++) {
    const o = s[n], { first: i, last: r, point: l } = tu(o, t, "x");
    if (!(!l || i && r)) {
      if (i)
        a.unshift(l);
      else if (e.push(l), !r)
        break;
    }
  }
  e.push(...a);
}
function tu(e, t, s) {
  const a = e.interpolate(t, s);
  if (!a)
    return {};
  const n = a[s], o = e.segments, i = e.points;
  let r = !1, l = !1;
  for (let d = 0; d < o.length; d++) {
    const u = o[d], h = i[u.start][s], f = i[u.end][s];
    if (ae(n, h, f)) {
      r = n === h, l = n === f;
      break;
    }
  }
  return {
    first: r,
    last: l,
    point: a
  };
}
class yi {
  constructor(t) {
    this.x = t.x, this.y = t.y, this.radius = t.radius;
  }
  pathSegment(t, s, a) {
    const { x: n, y: o, radius: i } = this;
    return s = s || {
      start: 0,
      end: mt
    }, t.arc(n, o, i, s.end, s.start, !0), !a.bounds;
  }
  interpolate(t) {
    const { x: s, y: a, radius: n } = this, o = t.angle;
    return {
      x: s + Math.cos(o) * n,
      y: a + Math.sin(o) * n,
      angle: o
    };
  }
}
function eu(e) {
  const { chart: t, fill: s, line: a } = e;
  if (Ft(s))
    return su(t, s);
  if (s === "stack")
    return Zd(e);
  if (s === "shape")
    return !0;
  const n = au(e);
  return n instanceof yi ? n : mi(n, a);
}
function su(e, t) {
  const s = e.getDatasetMeta(t);
  return s && e.isDatasetVisible(t) ? s.dataset : null;
}
function au(e) {
  return (e.scale || {}).getPointPositionForValue ? ou(e) : nu(e);
}
function nu(e) {
  const { scale: t = {}, fill: s } = e, a = Kd(s, t);
  if (Ft(a)) {
    const n = t.isHorizontal();
    return {
      x: n ? a : null,
      y: n ? null : a
    };
  }
  return null;
}
function ou(e) {
  const { scale: t, fill: s } = e, a = t.options, n = t.getLabels().length, o = a.reverse ? t.max : t.min, i = Xd(s, t, o), r = [];
  if (a.grid.circular) {
    const l = t.getPointPositionForValue(0, o);
    return new yi({
      x: l.x,
      y: l.y,
      radius: t.getDistanceFromCenterForValue(i)
    });
  }
  for (let l = 0; l < n; ++l)
    r.push(t.getPointPositionForValue(l, i));
  return r;
}
function oa(e, t, s) {
  const a = eu(t), { chart: n, index: o, line: i, scale: r, axis: l } = t, d = i.options, u = d.fill, h = d.backgroundColor, { above: f = h, below: v = h } = u || {}, g = n.getDatasetMeta(o), _ = si(n, g);
  a && i.points.length && (Is(e, s), iu(e, {
    line: i,
    target: a,
    above: f,
    below: v,
    area: s,
    scale: r,
    axis: l,
    clip: _
  }), Os(e));
}
function iu(e, t) {
  const { line: s, target: a, above: n, below: o, area: i, scale: r, clip: l } = t, d = s._loop ? "angle" : t.axis;
  e.save();
  let u = o;
  o !== n && (d === "x" ? (Gn(e, a, i.top), ia(e, {
    line: s,
    target: a,
    color: n,
    scale: r,
    property: d,
    clip: l
  }), e.restore(), e.save(), Gn(e, a, i.bottom)) : d === "y" && (Zn(e, a, i.left), ia(e, {
    line: s,
    target: a,
    color: o,
    scale: r,
    property: d,
    clip: l
  }), e.restore(), e.save(), Zn(e, a, i.right), u = n)), ia(e, {
    line: s,
    target: a,
    color: u,
    scale: r,
    property: d,
    clip: l
  }), e.restore();
}
function Gn(e, t, s) {
  const { segments: a, points: n } = t;
  let o = !0, i = !1;
  e.beginPath();
  for (const r of a) {
    const { start: l, end: d } = r, u = n[l], h = n[Hs(l, d, n)];
    o ? (e.moveTo(u.x, u.y), o = !1) : (e.lineTo(u.x, s), e.lineTo(u.x, u.y)), i = !!t.pathSegment(e, r, {
      move: i
    }), i ? e.closePath() : e.lineTo(h.x, s);
  }
  e.lineTo(t.first().x, s), e.closePath(), e.clip();
}
function Zn(e, t, s) {
  const { segments: a, points: n } = t;
  let o = !0, i = !1;
  e.beginPath();
  for (const r of a) {
    const { start: l, end: d } = r, u = n[l], h = n[Hs(l, d, n)];
    o ? (e.moveTo(u.x, u.y), o = !1) : (e.lineTo(s, u.y), e.lineTo(u.x, u.y)), i = !!t.pathSegment(e, r, {
      move: i
    }), i ? e.closePath() : e.lineTo(s, h.y);
  }
  e.lineTo(s, t.first().y), e.closePath(), e.clip();
}
function ia(e, t) {
  const { line: s, target: a, property: n, color: o, scale: i, clip: r } = t, l = Hd(s, a, n);
  for (const { source: d, target: u, start: h, end: f } of l) {
    const { style: { backgroundColor: v = o } = {} } = d, g = a !== !0;
    e.save(), e.fillStyle = v, ru(e, i, r, g && Sa(n, h, f)), e.beginPath();
    const _ = !!s.pathSegment(e, d);
    let m;
    if (g) {
      _ ? e.closePath() : Qn(e, a, f, n);
      const p = !!a.pathSegment(e, u, {
        move: _,
        reverse: !0
      });
      m = _ && p, m || Qn(e, a, h, n);
    }
    e.closePath(), e.fill(m ? "evenodd" : "nonzero"), e.restore();
  }
}
function ru(e, t, s, a) {
  const n = t.chart.chartArea, { property: o, start: i, end: r } = a || {};
  if (o === "x" || o === "y") {
    let l, d, u, h;
    o === "x" ? (l = i, d = n.top, u = r, h = n.bottom) : (l = n.left, d = i, u = n.right, h = r), e.beginPath(), s && (l = Math.max(l, s.left), u = Math.min(u, s.right), d = Math.max(d, s.top), h = Math.min(h, s.bottom)), e.rect(l, d, u - l, h - d), e.clip();
  }
}
function Qn(e, t, s, a) {
  const n = t.interpolate(s, a);
  n && e.lineTo(n.x, n.y);
}
var lu = {
  id: "filler",
  afterDatasetsUpdate(e, t, s) {
    const a = (e.data.datasets || []).length, n = [];
    let o, i, r, l;
    for (i = 0; i < a; ++i)
      o = e.getDatasetMeta(i), r = o.dataset, l = null, r && r.options && r instanceof Ws && (l = {
        visible: e.isDatasetVisible(i),
        index: i,
        fill: qd(r, i, a),
        chart: e,
        axis: o.controller.options.indexAxis,
        scale: o.vScale,
        line: r
      }), o.$filler = l, n.push(l);
    for (i = 0; i < a; ++i)
      l = n[i], !(!l || l.fill === !1) && (l.fill = Yd(n, i, s.propagate));
  },
  beforeDraw(e, t, s) {
    const a = s.drawTime === "beforeDraw", n = e.getSortedVisibleDatasetMetas(), o = e.chartArea;
    for (let i = n.length - 1; i >= 0; --i) {
      const r = n[i].$filler;
      r && (r.line.updateControlPoints(o, r.axis), a && r.fill && oa(e.ctx, r, o));
    }
  },
  beforeDatasetsDraw(e, t, s) {
    if (s.drawTime !== "beforeDatasetsDraw")
      return;
    const a = e.getSortedVisibleDatasetMetas();
    for (let n = a.length - 1; n >= 0; --n) {
      const o = a[n].$filler;
      Xn(o) && oa(e.ctx, o, e.chartArea);
    }
  },
  beforeDatasetDraw(e, t, s) {
    const a = t.meta.$filler;
    !Xn(a) || s.drawTime !== "beforeDatasetDraw" || oa(e.ctx, a, e.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const Jn = (e, t) => {
  let { boxHeight: s = t, boxWidth: a = t } = e;
  return e.usePointStyle && (s = Math.min(s, t), a = e.pointStyleWidth || Math.min(a, t)), {
    boxWidth: a,
    boxHeight: s,
    itemHeight: Math.max(t, s)
  };
}, cu = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class to extends oe {
  constructor(t) {
    super(), this._added = !1, this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1, this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this.legendItems = void 0, this.columnSizes = void 0, this.lineWidths = void 0, this.maxHeight = void 0, this.maxWidth = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.height = void 0, this.width = void 0, this._margins = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, s, a) {
    this.maxWidth = t, this.maxHeight = s, this._margins = a, this.setDimensions(), this.buildLabels(), this.fit();
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, this.bottom = this.height);
  }
  buildLabels() {
    const t = this.options.labels || {};
    let s = bt(t.generateLabels, [
      this.chart
    ], this) || [];
    t.filter && (s = s.filter((a) => t.filter(a, this.chart.data))), t.sort && (s = s.sort((a, n) => t.sort(a, n, this.chart.data))), this.options.reverse && s.reverse(), this.legendItems = s;
  }
  fit() {
    const { options: t, ctx: s } = this;
    if (!t.display) {
      this.width = this.height = 0;
      return;
    }
    const a = t.labels, n = Lt(a.font), o = n.size, i = this._computeTitleHeight(), { boxWidth: r, itemHeight: l } = Jn(a, o);
    let d, u;
    s.font = n.string, this.isHorizontal() ? (d = this.maxWidth, u = this._fitRows(i, o, r, l) + 10) : (u = this.maxHeight, d = this._fitCols(i, n, r, l) + 10), this.width = Math.min(d, t.maxWidth || this.maxWidth), this.height = Math.min(u, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, s, a, n) {
    const { ctx: o, maxWidth: i, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], d = this.lineWidths = [
      0
    ], u = n + r;
    let h = t;
    o.textAlign = "left", o.textBaseline = "middle";
    let f = -1, v = -u;
    return this.legendItems.forEach((g, _) => {
      const m = a + s / 2 + o.measureText(g.text).width;
      (_ === 0 || d[d.length - 1] + m + 2 * r > i) && (h += u, d[d.length - (_ > 0 ? 0 : 1)] = 0, v += u, f++), l[_] = {
        left: 0,
        top: v,
        row: f,
        width: m,
        height: n
      }, d[d.length - 1] += m + r;
    }), h;
  }
  _fitCols(t, s, a, n) {
    const { ctx: o, maxHeight: i, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], d = this.columnSizes = [], u = i - t;
    let h = r, f = 0, v = 0, g = 0, _ = 0;
    return this.legendItems.forEach((m, p) => {
      const { itemWidth: b, itemHeight: $ } = du(a, s, o, m, n);
      p > 0 && v + $ + 2 * r > u && (h += f + r, d.push({
        width: f,
        height: v
      }), g += f + r, _++, f = v = 0), l[p] = {
        left: g,
        top: v,
        col: _,
        width: b,
        height: $
      }, f = Math.max(f, b), v += $ + r;
    }), h += f, d.push({
      width: f,
      height: v
    }), h;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: s, options: { align: a, labels: { padding: n }, rtl: o } } = this, i = Fe(o, this.left, this.width);
    if (this.isHorizontal()) {
      let r = 0, l = At(a, this.left + n, this.right - this.lineWidths[r]);
      for (const d of s)
        r !== d.row && (r = d.row, l = At(a, this.left + n, this.right - this.lineWidths[r])), d.top += this.top + t + n, d.left = i.leftForLtr(i.x(l), d.width), l += d.width + n;
    } else {
      let r = 0, l = At(a, this.top + t + n, this.bottom - this.columnSizes[r].height);
      for (const d of s)
        d.col !== r && (r = d.col, l = At(a, this.top + t + n, this.bottom - this.columnSizes[r].height)), d.top = l, d.left += this.left + n, d.left = i.leftForLtr(i.x(d.left), d.width), l += d.height + n;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      Is(t, this), this._draw(), Os(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: s, lineWidths: a, ctx: n } = this, { align: o, labels: i } = t, r = wt.color, l = Fe(t.rtl, this.left, this.width), d = Lt(i.font), { padding: u } = i, h = d.size, f = h / 2;
    let v;
    this.drawTitle(), n.textAlign = l.textAlign("left"), n.textBaseline = "middle", n.lineWidth = 0.5, n.font = d.string;
    const { boxWidth: g, boxHeight: _, itemHeight: m } = Jn(i, h), p = function(S, C, A) {
      if (isNaN(g) || g <= 0 || isNaN(_) || _ < 0)
        return;
      n.save();
      const P = ot(A.lineWidth, 1);
      if (n.fillStyle = ot(A.fillStyle, r), n.lineCap = ot(A.lineCap, "butt"), n.lineDashOffset = ot(A.lineDashOffset, 0), n.lineJoin = ot(A.lineJoin, "miter"), n.lineWidth = P, n.strokeStyle = ot(A.strokeStyle, r), n.setLineDash(ot(A.lineDash, [])), i.usePointStyle) {
        const R = {
          radius: _ * Math.SQRT2 / 2,
          pointStyle: A.pointStyle,
          rotation: A.rotation,
          borderWidth: P
        }, I = l.xPlus(S, g / 2), N = C + f;
        jo(n, R, I, N, i.pointStyleWidth && g);
      } else {
        const R = C + Math.max((h - _) / 2, 0), I = l.leftForLtr(S, g), N = Le(A.borderRadius);
        n.beginPath(), Object.values(N).some((Y) => Y !== 0) ? Fs(n, {
          x: I,
          y: R,
          w: g,
          h: _,
          radius: N
        }) : n.rect(I, R, g, _), n.fill(), P !== 0 && n.stroke();
      }
      n.restore();
    }, b = function(S, C, A) {
      rs(n, A.text, S, C + m / 2, d, {
        strikethrough: A.hidden,
        textAlign: l.textAlign(A.textAlign)
      });
    }, $ = this.isHorizontal(), k = this._computeTitleHeight();
    $ ? v = {
      x: At(o, this.left + u, this.right - a[0]),
      y: this.top + u + k,
      line: 0
    } : v = {
      x: this.left + u,
      y: At(o, this.top + k + u, this.bottom - s[0].height),
      line: 0
    }, Zo(this.ctx, t.textDirection);
    const w = m + u;
    this.legendItems.forEach((S, C) => {
      n.strokeStyle = S.fontColor, n.fillStyle = S.fontColor;
      const A = n.measureText(S.text).width, P = l.textAlign(S.textAlign || (S.textAlign = i.textAlign)), R = g + f + A;
      let I = v.x, N = v.y;
      l.setWidth(this.width), $ ? C > 0 && I + R + u > this.right && (N = v.y += w, v.line++, I = v.x = At(o, this.left + u, this.right - a[v.line])) : C > 0 && N + w > this.bottom && (I = v.x = I + s[v.line].width + u, v.line++, N = v.y = At(o, this.top + k + u, this.bottom - s[v.line].height));
      const Y = l.x(I);
      if (p(Y, N, S), I = Fr(P, I + g + f, $ ? I + R : this.right, t.rtl), b(l.x(I), N, S), $)
        v.x += R + u;
      else if (typeof S.text != "string") {
        const B = d.lineHeight;
        v.y += _i(S, B) + u;
      } else
        v.y += w;
    }), Qo(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, s = t.title, a = Lt(s.font), n = qt(s.padding);
    if (!s.display)
      return;
    const o = Fe(t.rtl, this.left, this.width), i = this.ctx, r = s.position, l = a.size / 2, d = n.top + l;
    let u, h = this.left, f = this.width;
    if (this.isHorizontal())
      f = Math.max(...this.lineWidths), u = this.top + d, h = At(t.align, h, this.right - f);
    else {
      const g = this.columnSizes.reduce((_, m) => Math.max(_, m.height), 0);
      u = d + At(t.align, this.top, this.bottom - g - t.labels.padding - this._computeTitleHeight());
    }
    const v = At(r, h, h + f);
    i.textAlign = o.textAlign(Fa(r)), i.textBaseline = "middle", i.strokeStyle = s.color, i.fillStyle = s.color, i.font = a.string, rs(i, s.text, v, u, a);
  }
  _computeTitleHeight() {
    const t = this.options.title, s = Lt(t.font), a = qt(t.padding);
    return t.display ? s.lineHeight + a.height : 0;
  }
  _getLegendItemAt(t, s) {
    let a, n, o;
    if (ae(t, this.left, this.right) && ae(s, this.top, this.bottom)) {
      for (o = this.legendHitBoxes, a = 0; a < o.length; ++a)
        if (n = o[a], ae(t, n.left, n.left + n.width) && ae(s, n.top, n.top + n.height))
          return this.legendItems[a];
    }
    return null;
  }
  handleEvent(t) {
    const s = this.options;
    if (!fu(t.type, s))
      return;
    const a = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const n = this._hoveredItem, o = cu(n, a);
      n && !o && bt(s.onLeave, [
        t,
        n,
        this
      ], this), this._hoveredItem = a, a && !o && bt(s.onHover, [
        t,
        a,
        this
      ], this);
    } else a && bt(s.onClick, [
      t,
      a,
      this
    ], this);
  }
}
function du(e, t, s, a, n) {
  const o = uu(a, e, t, s), i = hu(n, a, t.lineHeight);
  return {
    itemWidth: o,
    itemHeight: i
  };
}
function uu(e, t, s, a) {
  let n = e.text;
  return n && typeof n != "string" && (n = n.reduce((o, i) => o.length > i.length ? o : i)), t + s.size / 2 + a.measureText(n).width;
}
function hu(e, t, s) {
  let a = e;
  return typeof t.text != "string" && (a = _i(t, s)), a;
}
function _i(e, t) {
  const s = e.text ? e.text.length : 0;
  return t * s;
}
function fu(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var Ha = {
  id: "legend",
  _element: to,
  start(e, t, s) {
    const a = e.legend = new to({
      ctx: e.ctx,
      options: s,
      chart: e
    });
    Yt.configure(e, a, s), Yt.addBox(e, a);
  },
  stop(e) {
    Yt.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, s) {
    const a = e.legend;
    Yt.configure(e, a, s), a.options = s;
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
    onClick(e, t, s) {
      const a = t.datasetIndex, n = s.chart;
      n.isDatasetVisible(a) ? (n.hide(a), t.hidden = !0) : (n.show(a), t.hidden = !1);
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (e) => e.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(e) {
        const t = e.data.datasets, { labels: { usePointStyle: s, pointStyle: a, textAlign: n, color: o, useBorderRadius: i, borderRadius: r } } = e.legend.options;
        return e._getSortedDatasetMetas().map((l) => {
          const d = l.controller.getStyle(s ? 0 : void 0), u = qt(d.borderWidth);
          return {
            text: t[l.index].label,
            fillStyle: d.backgroundColor,
            fontColor: o,
            hidden: !l.visible,
            lineCap: d.borderCapStyle,
            lineDash: d.borderDash,
            lineDashOffset: d.borderDashOffset,
            lineJoin: d.borderJoinStyle,
            lineWidth: (u.width + u.height) / 4,
            strokeStyle: d.borderColor,
            pointStyle: a || d.pointStyle,
            rotation: d.rotation,
            textAlign: n || d.textAlign,
            borderRadius: i && (r || d.borderRadius),
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
class xi extends oe {
  constructor(t) {
    super(), this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this._padding = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, s) {
    const a = this.options;
    if (this.left = 0, this.top = 0, !a.display) {
      this.width = this.height = this.right = this.bottom = 0;
      return;
    }
    this.width = this.right = t, this.height = this.bottom = s;
    const n = $t(a.text) ? a.text.length : 1;
    this._padding = qt(a.padding);
    const o = n * Lt(a.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = o : this.width = o;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: s, left: a, bottom: n, right: o, options: i } = this, r = i.align;
    let l = 0, d, u, h;
    return this.isHorizontal() ? (u = At(r, a, o), h = s + t, d = o - a) : (i.position === "left" ? (u = a + t, h = At(r, n, s), l = pt * -0.5) : (u = o - t, h = At(r, s, n), l = pt * 0.5), d = n - s), {
      titleX: u,
      titleY: h,
      maxWidth: d,
      rotation: l
    };
  }
  draw() {
    const t = this.ctx, s = this.options;
    if (!s.display)
      return;
    const a = Lt(s.font), o = a.lineHeight / 2 + this._padding.top, { titleX: i, titleY: r, maxWidth: l, rotation: d } = this._drawArgs(o);
    rs(t, s.text, 0, 0, a, {
      color: s.color,
      maxWidth: l,
      rotation: d,
      textAlign: Fa(s.align),
      textBaseline: "middle",
      translation: [
        i,
        r
      ]
    });
  }
}
function gu(e, t) {
  const s = new xi({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  Yt.configure(e, s, t), Yt.addBox(e, s), e.titleBlock = s;
}
var ki = {
  id: "title",
  _element: xi,
  start(e, t, s) {
    gu(e, s);
  },
  stop(e) {
    const t = e.titleBlock;
    Yt.removeBox(e, t), delete e.titleBlock;
  },
  beforeUpdate(e, t, s) {
    const a = e.titleBlock;
    Yt.configure(e, a, s), a.options = s;
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
const Xe = {
  average(e) {
    if (!e.length)
      return !1;
    let t, s, a = /* @__PURE__ */ new Set(), n = 0, o = 0;
    for (t = 0, s = e.length; t < s; ++t) {
      const r = e[t].element;
      if (r && r.hasValue()) {
        const l = r.tooltipPosition();
        a.add(l.x), n += l.y, ++o;
      }
    }
    return o === 0 || a.size === 0 ? !1 : {
      x: [
        ...a
      ].reduce((r, l) => r + l) / a.size,
      y: n / o
    };
  },
  nearest(e, t) {
    if (!e.length)
      return !1;
    let s = t.x, a = t.y, n = Number.POSITIVE_INFINITY, o, i, r;
    for (o = 0, i = e.length; o < i; ++o) {
      const l = e[o].element;
      if (l && l.hasValue()) {
        const d = l.getCenterPoint(), u = _a(t, d);
        u < n && (n = u, r = l);
      }
    }
    if (r) {
      const l = r.tooltipPosition();
      s = l.x, a = l.y;
    }
    return {
      x: s,
      y: a
    };
  }
};
function Kt(e, t) {
  return t && ($t(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function te(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function pu(e, t) {
  const { element: s, datasetIndex: a, index: n } = t, o = e.getDatasetMeta(a).controller, { label: i, value: r } = o.getLabelAndValue(n);
  return {
    chart: e,
    label: i,
    parsed: o.getParsed(n),
    raw: e.data.datasets[a].data[n],
    formattedValue: r,
    dataset: o.getDataset(),
    dataIndex: n,
    datasetIndex: a,
    element: s
  };
}
function eo(e, t) {
  const s = e.chart.ctx, { body: a, footer: n, title: o } = e, { boxWidth: i, boxHeight: r } = t, l = Lt(t.bodyFont), d = Lt(t.titleFont), u = Lt(t.footerFont), h = o.length, f = n.length, v = a.length, g = qt(t.padding);
  let _ = g.height, m = 0, p = a.reduce((k, w) => k + w.before.length + w.lines.length + w.after.length, 0);
  if (p += e.beforeBody.length + e.afterBody.length, h && (_ += h * d.lineHeight + (h - 1) * t.titleSpacing + t.titleMarginBottom), p) {
    const k = t.displayColors ? Math.max(r, l.lineHeight) : l.lineHeight;
    _ += v * k + (p - v) * l.lineHeight + (p - 1) * t.bodySpacing;
  }
  f && (_ += t.footerMarginTop + f * u.lineHeight + (f - 1) * t.footerSpacing);
  let b = 0;
  const $ = function(k) {
    m = Math.max(m, s.measureText(k).width + b);
  };
  return s.save(), s.font = d.string, gt(e.title, $), s.font = l.string, gt(e.beforeBody.concat(e.afterBody), $), b = t.displayColors ? i + 2 + t.boxPadding : 0, gt(a, (k) => {
    gt(k.before, $), gt(k.lines, $), gt(k.after, $);
  }), b = 0, s.font = u.string, gt(e.footer, $), s.restore(), m += g.width, {
    width: m,
    height: _
  };
}
function vu(e, t) {
  const { y: s, height: a } = t;
  return s < a / 2 ? "top" : s > e.height - a / 2 ? "bottom" : "center";
}
function bu(e, t, s, a) {
  const { x: n, width: o } = a, i = s.caretSize + s.caretPadding;
  if (e === "left" && n + o + i > t.width || e === "right" && n - o - i < 0)
    return !0;
}
function mu(e, t, s, a) {
  const { x: n, width: o } = s, { width: i, chartArea: { left: r, right: l } } = e;
  let d = "center";
  return a === "center" ? d = n <= (r + l) / 2 ? "left" : "right" : n <= o / 2 ? d = "left" : n >= i - o / 2 && (d = "right"), bu(d, e, t, s) && (d = "center"), d;
}
function so(e, t, s) {
  const a = s.yAlign || t.yAlign || vu(e, s);
  return {
    xAlign: s.xAlign || t.xAlign || mu(e, t, s, a),
    yAlign: a
  };
}
function yu(e, t) {
  let { x: s, width: a } = e;
  return t === "right" ? s -= a : t === "center" && (s -= a / 2), s;
}
function _u(e, t, s) {
  let { y: a, height: n } = e;
  return t === "top" ? a += s : t === "bottom" ? a -= n + s : a -= n / 2, a;
}
function ao(e, t, s, a) {
  const { caretSize: n, caretPadding: o, cornerRadius: i } = e, { xAlign: r, yAlign: l } = s, d = n + o, { topLeft: u, topRight: h, bottomLeft: f, bottomRight: v } = Le(i);
  let g = yu(t, r);
  const _ = _u(t, l, d);
  return l === "center" ? r === "left" ? g += d : r === "right" && (g -= d) : r === "left" ? g -= Math.max(u, f) + n : r === "right" && (g += Math.max(h, v) + n), {
    x: Bt(g, 0, a.width - t.width),
    y: Bt(_, 0, a.height - t.height)
  };
}
function ws(e, t, s) {
  const a = qt(s.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - a.right : e.x + a.left;
}
function no(e) {
  return Kt([], te(e));
}
function xu(e, t, s) {
  return Ce(e, {
    tooltip: t,
    tooltipItems: s,
    type: "tooltip"
  });
}
function oo(e, t) {
  const s = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return s ? e.override(s) : e;
}
const wi = {
  beforeTitle: Qt,
  title(e) {
    if (e.length > 0) {
      const t = e[0], s = t.chart.data.labels, a = s ? s.length : 0;
      if (this && this.options && this.options.mode === "dataset")
        return t.dataset.label || "";
      if (t.label)
        return t.label;
      if (a > 0 && t.dataIndex < a)
        return s[t.dataIndex];
    }
    return "";
  },
  afterTitle: Qt,
  beforeBody: Qt,
  beforeLabel: Qt,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const s = e.formattedValue;
    return ft(s) || (t += s), t;
  },
  labelColor(e) {
    const s = e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);
    return {
      borderColor: s.borderColor,
      backgroundColor: s.backgroundColor,
      borderWidth: s.borderWidth,
      borderDash: s.borderDash,
      borderDashOffset: s.borderDashOffset,
      borderRadius: 0
    };
  },
  labelTextColor() {
    return this.options.bodyColor;
  },
  labelPointStyle(e) {
    const s = e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);
    return {
      pointStyle: s.pointStyle,
      rotation: s.rotation
    };
  },
  afterLabel: Qt,
  afterBody: Qt,
  beforeFooter: Qt,
  footer: Qt,
  afterFooter: Qt
};
function Et(e, t, s, a) {
  const n = e[t].call(s, a);
  return typeof n > "u" ? wi[t].call(s, a) : n;
}
class io extends oe {
  static positioners = Xe;
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
    const s = this.chart, a = this.options.setContext(this.getContext()), n = a.enabled && s.options.animation && a.animations, o = new ai(this.chart, n);
    return n._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = xu(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, s) {
    const { callbacks: a } = s, n = Et(a, "beforeTitle", this, t), o = Et(a, "title", this, t), i = Et(a, "afterTitle", this, t);
    let r = [];
    return r = Kt(r, te(n)), r = Kt(r, te(o)), r = Kt(r, te(i)), r;
  }
  getBeforeBody(t, s) {
    return no(Et(s.callbacks, "beforeBody", this, t));
  }
  getBody(t, s) {
    const { callbacks: a } = s, n = [];
    return gt(t, (o) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, r = oo(a, o);
      Kt(i.before, te(Et(r, "beforeLabel", this, o))), Kt(i.lines, Et(r, "label", this, o)), Kt(i.after, te(Et(r, "afterLabel", this, o))), n.push(i);
    }), n;
  }
  getAfterBody(t, s) {
    return no(Et(s.callbacks, "afterBody", this, t));
  }
  getFooter(t, s) {
    const { callbacks: a } = s, n = Et(a, "beforeFooter", this, t), o = Et(a, "footer", this, t), i = Et(a, "afterFooter", this, t);
    let r = [];
    return r = Kt(r, te(n)), r = Kt(r, te(o)), r = Kt(r, te(i)), r;
  }
  _createItems(t) {
    const s = this._active, a = this.chart.data, n = [], o = [], i = [];
    let r = [], l, d;
    for (l = 0, d = s.length; l < d; ++l)
      r.push(pu(this.chart, s[l]));
    return t.filter && (r = r.filter((u, h, f) => t.filter(u, h, f, a))), t.itemSort && (r = r.sort((u, h) => t.itemSort(u, h, a))), gt(r, (u) => {
      const h = oo(t.callbacks, u);
      n.push(Et(h, "labelColor", this, u)), o.push(Et(h, "labelPointStyle", this, u)), i.push(Et(h, "labelTextColor", this, u));
    }), this.labelColors = n, this.labelPointStyles = o, this.labelTextColors = i, this.dataPoints = r, r;
  }
  update(t, s) {
    const a = this.options.setContext(this.getContext()), n = this._active;
    let o, i = [];
    if (!n.length)
      this.opacity !== 0 && (o = {
        opacity: 0
      });
    else {
      const r = Xe[a.position].call(this, n, this._eventPosition);
      i = this._createItems(a), this.title = this.getTitle(i, a), this.beforeBody = this.getBeforeBody(i, a), this.body = this.getBody(i, a), this.afterBody = this.getAfterBody(i, a), this.footer = this.getFooter(i, a);
      const l = this._size = eo(this, a), d = Object.assign({}, r, l), u = so(this.chart, a, d), h = ao(a, d, u, this.chart);
      this.xAlign = u.xAlign, this.yAlign = u.yAlign, o = {
        opacity: 1,
        x: h.x,
        y: h.y,
        width: l.width,
        height: l.height,
        caretX: r.x,
        caretY: r.y
      };
    }
    this._tooltipItems = i, this.$context = void 0, o && this._resolveAnimations().update(this, o), t && a.external && a.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: s
    });
  }
  drawCaret(t, s, a, n) {
    const o = this.getCaretPosition(t, a, n);
    s.lineTo(o.x1, o.y1), s.lineTo(o.x2, o.y2), s.lineTo(o.x3, o.y3);
  }
  getCaretPosition(t, s, a) {
    const { xAlign: n, yAlign: o } = this, { caretSize: i, cornerRadius: r } = a, { topLeft: l, topRight: d, bottomLeft: u, bottomRight: h } = Le(r), { x: f, y: v } = t, { width: g, height: _ } = s;
    let m, p, b, $, k, w;
    return o === "center" ? (k = v + _ / 2, n === "left" ? (m = f, p = m - i, $ = k + i, w = k - i) : (m = f + g, p = m + i, $ = k - i, w = k + i), b = m) : (n === "left" ? p = f + Math.max(l, u) + i : n === "right" ? p = f + g - Math.max(d, h) - i : p = this.caretX, o === "top" ? ($ = v, k = $ - i, m = p - i, b = p + i) : ($ = v + _, k = $ + i, m = p + i, b = p - i), w = $), {
      x1: m,
      x2: p,
      x3: b,
      y1: $,
      y2: k,
      y3: w
    };
  }
  drawTitle(t, s, a) {
    const n = this.title, o = n.length;
    let i, r, l;
    if (o) {
      const d = Fe(a.rtl, this.x, this.width);
      for (t.x = ws(this, a.titleAlign, a), s.textAlign = d.textAlign(a.titleAlign), s.textBaseline = "middle", i = Lt(a.titleFont), r = a.titleSpacing, s.fillStyle = a.titleColor, s.font = i.string, l = 0; l < o; ++l)
        s.fillText(n[l], d.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + r, l + 1 === o && (t.y += a.titleMarginBottom - r);
    }
  }
  _drawColorBox(t, s, a, n, o) {
    const i = this.labelColors[a], r = this.labelPointStyles[a], { boxHeight: l, boxWidth: d } = o, u = Lt(o.bodyFont), h = ws(this, "left", o), f = n.x(h), v = l < u.lineHeight ? (u.lineHeight - l) / 2 : 0, g = s.y + v;
    if (o.usePointStyle) {
      const _ = {
        radius: Math.min(d, l) / 2,
        pointStyle: r.pointStyle,
        rotation: r.rotation,
        borderWidth: 1
      }, m = n.leftForLtr(f, d) + d / 2, p = g + l / 2;
      t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, ka(t, _, m, p), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, ka(t, _, m, p);
    } else {
      t.lineWidth = it(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const _ = n.leftForLtr(f, d), m = n.leftForLtr(n.xPlus(f, 1), d - 2), p = Le(i.borderRadius);
      Object.values(p).some((b) => b !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, Fs(t, {
        x: _,
        y: g,
        w: d,
        h: l,
        radius: p
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), Fs(t, {
        x: m,
        y: g + 1,
        w: d - 2,
        h: l - 2,
        radius: p
      }), t.fill()) : (t.fillStyle = o.multiKeyBackground, t.fillRect(_, g, d, l), t.strokeRect(_, g, d, l), t.fillStyle = i.backgroundColor, t.fillRect(m, g + 1, d - 2, l - 2));
    }
    t.fillStyle = this.labelTextColors[a];
  }
  drawBody(t, s, a) {
    const { body: n } = this, { bodySpacing: o, bodyAlign: i, displayColors: r, boxHeight: l, boxWidth: d, boxPadding: u } = a, h = Lt(a.bodyFont);
    let f = h.lineHeight, v = 0;
    const g = Fe(a.rtl, this.x, this.width), _ = function(A) {
      s.fillText(A, g.x(t.x + v), t.y + f / 2), t.y += f + o;
    }, m = g.textAlign(i);
    let p, b, $, k, w, S, C;
    for (s.textAlign = i, s.textBaseline = "middle", s.font = h.string, t.x = ws(this, m, a), s.fillStyle = a.bodyColor, gt(this.beforeBody, _), v = r && m !== "right" ? i === "center" ? d / 2 + u : d + 2 + u : 0, k = 0, S = n.length; k < S; ++k) {
      for (p = n[k], b = this.labelTextColors[k], s.fillStyle = b, gt(p.before, _), $ = p.lines, r && $.length && (this._drawColorBox(s, t, k, g, a), f = Math.max(h.lineHeight, l)), w = 0, C = $.length; w < C; ++w)
        _($[w]), f = h.lineHeight;
      gt(p.after, _);
    }
    v = 0, f = h.lineHeight, gt(this.afterBody, _), t.y -= o;
  }
  drawFooter(t, s, a) {
    const n = this.footer, o = n.length;
    let i, r;
    if (o) {
      const l = Fe(a.rtl, this.x, this.width);
      for (t.x = ws(this, a.footerAlign, a), t.y += a.footerMarginTop, s.textAlign = l.textAlign(a.footerAlign), s.textBaseline = "middle", i = Lt(a.footerFont), s.fillStyle = a.footerColor, s.font = i.string, r = 0; r < o; ++r)
        s.fillText(n[r], l.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + a.footerSpacing;
    }
  }
  drawBackground(t, s, a, n) {
    const { xAlign: o, yAlign: i } = this, { x: r, y: l } = t, { width: d, height: u } = a, { topLeft: h, topRight: f, bottomLeft: v, bottomRight: g } = Le(n.cornerRadius);
    s.fillStyle = n.backgroundColor, s.strokeStyle = n.borderColor, s.lineWidth = n.borderWidth, s.beginPath(), s.moveTo(r + h, l), i === "top" && this.drawCaret(t, s, a, n), s.lineTo(r + d - f, l), s.quadraticCurveTo(r + d, l, r + d, l + f), i === "center" && o === "right" && this.drawCaret(t, s, a, n), s.lineTo(r + d, l + u - g), s.quadraticCurveTo(r + d, l + u, r + d - g, l + u), i === "bottom" && this.drawCaret(t, s, a, n), s.lineTo(r + v, l + u), s.quadraticCurveTo(r, l + u, r, l + u - v), i === "center" && o === "left" && this.drawCaret(t, s, a, n), s.lineTo(r, l + h), s.quadraticCurveTo(r, l, r + h, l), s.closePath(), s.fill(), n.borderWidth > 0 && s.stroke();
  }
  _updateAnimationTarget(t) {
    const s = this.chart, a = this.$animations, n = a && a.x, o = a && a.y;
    if (n || o) {
      const i = Xe[t.position].call(this, this._active, this._eventPosition);
      if (!i)
        return;
      const r = this._size = eo(this, t), l = Object.assign({}, i, this._size), d = so(s, t, l), u = ao(t, l, d, s);
      (n._to !== u.x || o._to !== u.y) && (this.xAlign = d.xAlign, this.yAlign = d.yAlign, this.width = r.width, this.height = r.height, this.caretX = i.x, this.caretY = i.y, this._resolveAnimations().update(this, u));
    }
  }
  _willRender() {
    return !!this.opacity;
  }
  draw(t) {
    const s = this.options.setContext(this.getContext());
    let a = this.opacity;
    if (!a)
      return;
    this._updateAnimationTarget(s);
    const n = {
      width: this.width,
      height: this.height
    }, o = {
      x: this.x,
      y: this.y
    };
    a = Math.abs(a) < 1e-3 ? 0 : a;
    const i = qt(s.padding), r = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    s.enabled && r && (t.save(), t.globalAlpha = a, this.drawBackground(o, t, n, s), Zo(t, s.textDirection), o.y += i.top, this.drawTitle(o, t, s), this.drawBody(o, t, s), this.drawFooter(o, t, s), Qo(t, s.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, s) {
    const a = this._active, n = t.map(({ datasetIndex: r, index: l }) => {
      const d = this.chart.getDatasetMeta(r);
      if (!d)
        throw new Error("Cannot find a dataset at index " + r);
      return {
        datasetIndex: r,
        element: d.data[l],
        index: l
      };
    }), o = !Ts(a, n), i = this._positionChanged(n, s);
    (o || i) && (this._active = n, this._eventPosition = s, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, s, a = !0) {
    if (s && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const n = this.options, o = this._active || [], i = this._getActiveElements(t, o, s, a), r = this._positionChanged(i, t), l = s || !Ts(i, o) || r;
    return l && (this._active = i, (n.enabled || n.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, s))), l;
  }
  _getActiveElements(t, s, a, n) {
    const o = this.options;
    if (t.type === "mouseout")
      return [];
    if (!n)
      return s.filter((r) => this.chart.data.datasets[r.datasetIndex] && this.chart.getDatasetMeta(r.datasetIndex).controller.getParsed(r.index) !== void 0);
    const i = this.chart.getElementsAtEventForMode(t, o.mode, o, a);
    return o.reverse && i.reverse(), i;
  }
  _positionChanged(t, s) {
    const { caretX: a, caretY: n, options: o } = this, i = Xe[o.position].call(this, t, s);
    return i !== !1 && (a !== i.x || n !== i.y);
  }
}
var ja = {
  id: "tooltip",
  _element: io,
  positioners: Xe,
  afterInit(e, t, s) {
    s && (e.tooltip = new io({
      chart: e,
      options: s
    }));
  },
  beforeUpdate(e, t, s) {
    e.tooltip && e.tooltip.initialize(s);
  },
  reset(e, t, s) {
    e.tooltip && e.tooltip.initialize(s);
  },
  afterDraw(e) {
    const t = e.tooltip;
    if (t && t._willRender()) {
      const s = {
        tooltip: t
      };
      if (e.notifyPlugins("beforeTooltipDraw", {
        ...s,
        cancelable: !0
      }) === !1)
        return;
      t.draw(e.ctx), e.notifyPlugins("afterTooltipDraw", s);
    }
  },
  afterEvent(e, t) {
    if (e.tooltip) {
      const s = t.replay;
      e.tooltip.handleEvent(t.event, s, t.inChartArea) && (t.changed = !0);
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
    callbacks: wi
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
const ku = (e, t, s, a) => (typeof t == "string" ? (s = e.push(t) - 1, a.unshift({
  index: s,
  label: t
})) : isNaN(t) && (s = null), s);
function wu(e, t, s, a) {
  const n = e.indexOf(t);
  if (n === -1)
    return ku(e, t, s, a);
  const o = e.lastIndexOf(t);
  return n !== o ? s : n;
}
const $u = (e, t) => e === null ? null : Bt(Math.round(e), 0, t);
function ro(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class $i extends Re {
  static id = "category";
  static defaults = {
    ticks: {
      callback: ro
    }
  };
  constructor(t) {
    super(t), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(t) {
    const s = this._addedLabels;
    if (s.length) {
      const a = this.getLabels();
      for (const { index: n, label: o } of s)
        a[n] === o && a.splice(n, 1);
      this._addedLabels = [];
    }
    super.init(t);
  }
  parse(t, s) {
    if (ft(t))
      return null;
    const a = this.getLabels();
    return s = isFinite(s) && a[s] === t ? s : wu(a, t, ot(s, t), this._addedLabels), $u(s, a.length - 1);
  }
  determineDataLimits() {
    const { minDefined: t, maxDefined: s } = this.getUserBounds();
    let { min: a, max: n } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (t || (a = 0), s || (n = this.getLabels().length - 1)), this.min = a, this.max = n;
  }
  buildTicks() {
    const t = this.min, s = this.max, a = this.options.offset, n = [];
    let o = this.getLabels();
    o = t === 0 && s === o.length - 1 ? o : o.slice(t, s + 1), this._valueRange = Math.max(o.length - (a ? 0 : 1), 1), this._startValue = this.min - (a ? 0.5 : 0);
    for (let i = t; i <= s; i++)
      n.push({
        value: i
      });
    return n;
  }
  getLabelForValue(t) {
    return ro.call(this, t);
  }
  configure() {
    super.configure(), this.isHorizontal() || (this._reversePixels = !this._reversePixels);
  }
  getPixelForValue(t) {
    return typeof t != "number" && (t = this.parse(t)), t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getPixelForTick(t) {
    const s = this.ticks;
    return t < 0 || t > s.length - 1 ? null : this.getPixelForValue(s[t].value);
  }
  getValueForPixel(t) {
    return Math.round(this._startValue + this.getDecimalForPixel(t) * this._valueRange);
  }
  getBasePixel() {
    return this.bottom;
  }
}
function Mu(e, t) {
  const s = [], { bounds: n, step: o, min: i, max: r, precision: l, count: d, maxTicks: u, maxDigits: h, includeBounds: f } = e, v = o || 1, g = u - 1, { min: _, max: m } = t, p = !ft(i), b = !ft(r), $ = !ft(d), k = (m - _) / (h + 1);
  let w = sn((m - _) / g / v) * v, S, C, A, P;
  if (w < 1e-14 && !p && !b)
    return [
      {
        value: _
      },
      {
        value: m
      }
    ];
  P = Math.ceil(m / w) - Math.floor(_ / w), P > g && (w = sn(P * w / g / v) * v), ft(l) || (S = Math.pow(10, l), w = Math.ceil(w * S) / S), n === "ticks" ? (C = Math.floor(_ / w) * w, A = Math.ceil(m / w) * w) : (C = _, A = m), p && b && o && $r((r - i) / o, w / 1e3) ? (P = Math.round(Math.min((r - i) / w, u)), w = (r - i) / P, C = i, A = r) : $ ? (C = p ? i : C, A = b ? r : A, P = d - 1, w = (A - C) / P) : (P = (A - C) / w, Qe(P, Math.round(P), w / 1e3) ? P = Math.round(P) : P = Math.ceil(P));
  const R = Math.max(an(w), an(C));
  S = Math.pow(10, ft(l) ? R : l), C = Math.round(C * S) / S, A = Math.round(A * S) / S;
  let I = 0;
  for (p && (f && C !== i ? (s.push({
    value: i
  }), C < i && I++, Qe(Math.round((C + I * w) * S) / S, i, lo(i, k, e)) && I++) : C < i && I++); I < P; ++I) {
    const N = Math.round((C + I * w) * S) / S;
    if (b && N > r)
      break;
    s.push({
      value: N
    });
  }
  return b && f && A !== r ? s.length && Qe(s[s.length - 1].value, r, lo(r, k, e)) ? s[s.length - 1].value = r : s.push({
    value: r
  }) : (!b || A === r) && s.push({
    value: A
  }), s;
}
function lo(e, t, { horizontal: s, minRotation: a }) {
  const n = se(a), o = (s ? Math.sin(n) : Math.cos(n)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / o, i);
}
class Su extends Re {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, s) {
    return ft(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: s, maxDefined: a } = this.getUserBounds();
    let { min: n, max: o } = this;
    const i = (l) => n = s ? n : l, r = (l) => o = a ? o : l;
    if (t) {
      const l = Zt(n), d = Zt(o);
      l < 0 && d < 0 ? r(0) : l > 0 && d > 0 && i(0);
    }
    if (n === o) {
      let l = o === 0 ? 1 : Math.abs(o * 0.05);
      r(o + l), t || i(n - l);
    }
    this.min = n, this.max = o;
  }
  getTickLimit() {
    const t = this.options.ticks;
    let { maxTicksLimit: s, stepSize: a } = t, n;
    return a ? (n = Math.ceil(this.max / a) - Math.floor(this.min / a) + 1, n > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${a} would result generating up to ${n} ticks. Limiting to 1000.`), n = 1e3)) : (n = this.computeTickLimit(), s = s || 11), s && (n = Math.min(s, n)), n;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const t = this.options, s = t.ticks;
    let a = this.getTickLimit();
    a = Math.max(2, a);
    const n = {
      maxTicks: a,
      bounds: t.bounds,
      min: t.min,
      max: t.max,
      precision: s.precision,
      step: s.stepSize,
      count: s.count,
      maxDigits: this._maxDigits(),
      horizontal: this.isHorizontal(),
      minRotation: s.minRotation || 0,
      includeBounds: s.includeBounds !== !1
    }, o = this._range || this, i = Mu(n, o);
    return t.bounds === "ticks" && Mr(i, this, "value"), t.reverse ? (i.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), i;
  }
  configure() {
    const t = this.ticks;
    let s = this.min, a = this.max;
    if (super.configure(), this.options.offset && t.length) {
      const n = (a - s) / Math.max(t.length - 1, 1) / 2;
      s -= n, a += n;
    }
    this._startValue = s, this._endValue = a, this._valueRange = a - s;
  }
  getLabelForValue(t) {
    return Ea(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class Mi extends Su {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: Ho.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: s } = this.getMinMax(!0);
    this.min = Ft(t) ? t : 0, this.max = Ft(s) ? s : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), s = t ? this.width : this.height, a = se(this.options.ticks.minRotation), n = (t ? Math.sin(a) : Math.cos(a)) || 1e-3, o = this._resolveTickFontOptions(0);
    return Math.ceil(s / Math.min(40, o.lineHeight / n));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
const js = {
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
}, Rt = /* @__PURE__ */ Object.keys(js);
function co(e, t) {
  return e - t;
}
function uo(e, t) {
  if (ft(t))
    return null;
  const s = e._adapter, { parser: a, round: n, isoWeekday: o } = e._parseOpts;
  let i = t;
  return typeof a == "function" && (i = a(i)), Ft(i) || (i = typeof a == "string" ? s.parse(i, a) : s.parse(i)), i === null ? null : (n && (i = n === "week" && (ns(o) || o === !0) ? s.startOf(i, "isoWeek", o) : s.startOf(i, n)), +i);
}
function ho(e, t, s, a) {
  const n = Rt.length;
  for (let o = Rt.indexOf(e); o < n - 1; ++o) {
    const i = js[Rt[o]], r = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((s - t) / (r * i.size)) <= a)
      return Rt[o];
  }
  return Rt[n - 1];
}
function Cu(e, t, s, a, n) {
  for (let o = Rt.length - 1; o >= Rt.indexOf(s); o--) {
    const i = Rt[o];
    if (js[i].common && e._adapter.diff(n, a, i) >= t - 1)
      return i;
  }
  return Rt[s ? Rt.indexOf(s) : 0];
}
function Du(e) {
  for (let t = Rt.indexOf(e) + 1, s = Rt.length; t < s; ++t)
    if (js[Rt[t]].common)
      return Rt[t];
}
function fo(e, t, s) {
  if (!s)
    e[t] = !0;
  else if (s.length) {
    const { lo: a, hi: n } = La(s, t), o = s[a] >= t ? s[a] : s[n];
    e[o] = !0;
  }
}
function Au(e, t, s, a) {
  const n = e._adapter, o = +n.startOf(t[0].value, a), i = t[t.length - 1].value;
  let r, l;
  for (r = o; r <= i; r = +n.add(r, 1, a))
    l = s[r], l >= 0 && (t[l].major = !0);
  return t;
}
function go(e, t, s) {
  const a = [], n = {}, o = t.length;
  let i, r;
  for (i = 0; i < o; ++i)
    r = t[i], n[r] = i, a.push({
      value: r,
      major: !1
    });
  return o === 0 || !s ? a : Au(e, a, n, s);
}
class po extends Re {
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
  init(t, s = {}) {
    const a = t.time || (t.time = {}), n = this._adapter = new uc._date(t.adapters.date);
    n.init(s), Ze(a.displayFormats, n.formats()), this._parseOpts = {
      parser: a.parser,
      round: a.round,
      isoWeekday: a.isoWeekday
    }, super.init(t), this._normalized = s.normalized;
  }
  parse(t, s) {
    return t === void 0 ? null : uo(this, t);
  }
  beforeLayout() {
    super.beforeLayout(), this._cache = {
      data: [],
      labels: [],
      all: []
    };
  }
  determineDataLimits() {
    const t = this.options, s = this._adapter, a = t.time.unit || "day";
    let { min: n, max: o, minDefined: i, maxDefined: r } = this.getUserBounds();
    function l(d) {
      !i && !isNaN(d.min) && (n = Math.min(n, d.min)), !r && !isNaN(d.max) && (o = Math.max(o, d.max));
    }
    (!i || !r) && (l(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && l(this.getMinMax(!1))), n = Ft(n) && !isNaN(n) ? n : +s.startOf(Date.now(), a), o = Ft(o) && !isNaN(o) ? o : +s.endOf(Date.now(), a) + 1, this.min = Math.min(n, o - 1), this.max = Math.max(n + 1, o);
  }
  _getLabelBounds() {
    const t = this.getLabelTimestamps();
    let s = Number.POSITIVE_INFINITY, a = Number.NEGATIVE_INFINITY;
    return t.length && (s = t[0], a = t[t.length - 1]), {
      min: s,
      max: a
    };
  }
  buildTicks() {
    const t = this.options, s = t.time, a = t.ticks, n = a.source === "labels" ? this.getLabelTimestamps() : this._generate();
    t.bounds === "ticks" && n.length && (this.min = this._userMin || n[0], this.max = this._userMax || n[n.length - 1]);
    const o = this.min, i = this.max, r = Tr(n, o, i);
    return this._unit = s.unit || (a.autoSkip ? ho(s.minUnit, this.min, this.max, this._getLabelCapacity(o)) : Cu(this, r.length, s.minUnit, this.min, this.max)), this._majorUnit = !a.major.enabled || this._unit === "year" ? void 0 : Du(this._unit), this.initOffsets(n), t.reverse && r.reverse(), go(this, r, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let s = 0, a = 0, n, o;
    this.options.offset && t.length && (n = this.getDecimalForValue(t[0]), t.length === 1 ? s = 1 - n : s = (this.getDecimalForValue(t[1]) - n) / 2, o = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? a = o : a = (o - this.getDecimalForValue(t[t.length - 2])) / 2);
    const i = t.length < 3 ? 0.5 : 0.25;
    s = Bt(s, 0, i), a = Bt(a, 0, i), this._offsets = {
      start: s,
      end: a,
      factor: 1 / (s + 1 + a)
    };
  }
  _generate() {
    const t = this._adapter, s = this.min, a = this.max, n = this.options, o = n.time, i = o.unit || ho(o.minUnit, s, a, this._getLabelCapacity(s)), r = ot(n.ticks.stepSize, 1), l = i === "week" ? o.isoWeekday : !1, d = ns(l) || l === !0, u = {};
    let h = s, f, v;
    if (d && (h = +t.startOf(h, "isoWeek", l)), h = +t.startOf(h, d ? "day" : i), t.diff(a, s, i) > 1e5 * r)
      throw new Error(s + " and " + a + " are too far apart with stepSize of " + r + " " + i);
    const g = n.ticks.source === "data" && this.getDataTimestamps();
    for (f = h, v = 0; f < a; f = +t.add(f, r, i), v++)
      fo(u, f, g);
    return (f === a || n.bounds === "ticks" || v === 1) && fo(u, f, g), Object.keys(u).sort(co).map((_) => +_);
  }
  getLabelForValue(t) {
    const s = this._adapter, a = this.options.time;
    return a.tooltipFormat ? s.format(t, a.tooltipFormat) : s.format(t, a.displayFormats.datetime);
  }
  format(t, s) {
    const n = this.options.time.displayFormats, o = this._unit, i = s || n[o];
    return this._adapter.format(t, i);
  }
  _tickFormatFunction(t, s, a, n) {
    const o = this.options, i = o.ticks.callback;
    if (i)
      return bt(i, [
        t,
        s,
        a
      ], this);
    const r = o.time.displayFormats, l = this._unit, d = this._majorUnit, u = l && r[l], h = d && r[d], f = a[s], v = d && h && f && f.major;
    return this._adapter.format(t, n || (v ? h : u));
  }
  generateTickLabels(t) {
    let s, a, n;
    for (s = 0, a = t.length; s < a; ++s)
      n = t[s], n.label = this._tickFormatFunction(n.value, s, t);
  }
  getDecimalForValue(t) {
    return t === null ? NaN : (t - this.min) / (this.max - this.min);
  }
  getPixelForValue(t) {
    const s = this._offsets, a = this.getDecimalForValue(t);
    return this.getPixelForDecimal((s.start + a) * s.factor);
  }
  getValueForPixel(t) {
    const s = this._offsets, a = this.getDecimalForPixel(t) / s.factor - s.end;
    return this.min + a * (this.max - this.min);
  }
  _getLabelSize(t) {
    const s = this.options.ticks, a = this.ctx.measureText(t).width, n = se(this.isHorizontal() ? s.maxRotation : s.minRotation), o = Math.cos(n), i = Math.sin(n), r = this._resolveTickFontOptions(0).size;
    return {
      w: a * o + r * i,
      h: a * i + r * o
    };
  }
  _getLabelCapacity(t) {
    const s = this.options.time, a = s.displayFormats, n = a[s.unit] || a.millisecond, o = this._tickFormatFunction(t, 0, go(this, [
      t
    ], this._majorUnit), n), i = this._getLabelSize(o), r = Math.floor(this.isHorizontal() ? this.width / i.w : this.height / i.h) - 1;
    return r > 0 ? r : 1;
  }
  getDataTimestamps() {
    let t = this._cache.data || [], s, a;
    if (t.length)
      return t;
    const n = this.getMatchingVisibleMetas();
    if (this._normalized && n.length)
      return this._cache.data = n[0].controller.getAllParsedValues(this);
    for (s = 0, a = n.length; s < a; ++s)
      t = t.concat(n[s].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(t);
  }
  getLabelTimestamps() {
    const t = this._cache.labels || [];
    let s, a;
    if (t.length)
      return t;
    const n = this.getLabels();
    for (s = 0, a = n.length; s < a; ++s)
      t.push(uo(this, n[s]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return Vo(t.sort(co));
  }
}
function $s(e, t, s) {
  let a = 0, n = e.length - 1, o, i, r, l;
  s ? (t >= e[a].pos && t <= e[n].pos && ({ lo: a, hi: n } = we(e, "pos", t)), { pos: o, time: r } = e[a], { pos: i, time: l } = e[n]) : (t >= e[a].time && t <= e[n].time && ({ lo: a, hi: n } = we(e, "time", t)), { time: o, pos: r } = e[a], { time: i, pos: l } = e[n]);
  const d = i - o;
  return d ? r + (l - r) * (t - o) / d : r;
}
class y4 extends po {
  static id = "timeseries";
  static defaults = po.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), s = this._table = this.buildLookupTable(t);
    this._minPos = $s(s, this.min), this._tableRange = $s(s, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: s, max: a } = this, n = [], o = [];
    let i, r, l, d, u;
    for (i = 0, r = t.length; i < r; ++i)
      d = t[i], d >= s && d <= a && n.push(d);
    if (n.length < 2)
      return [
        {
          time: s,
          pos: 0
        },
        {
          time: a,
          pos: 1
        }
      ];
    for (i = 0, r = n.length; i < r; ++i)
      u = n[i + 1], l = n[i - 1], d = n[i], Math.round((u + l) / 2) !== d && o.push({
        time: d,
        pos: i / (r - 1)
      });
    return o;
  }
  _generate() {
    const t = this.min, s = this.max;
    let a = super.getDataTimestamps();
    return (!a.includes(t) || !a.length) && a.splice(0, 0, t), (!a.includes(s) || a.length === 1) && a.push(s), a.sort((n, o) => n - o);
  }
  _getTimestampsForTable() {
    let t = this._cache.all || [];
    if (t.length)
      return t;
    const s = this.getDataTimestamps(), a = this.getLabelTimestamps();
    return s.length && a.length ? t = this.normalize(s.concat(a)) : t = s.length ? s : a, t = this._cache.all = t, t;
  }
  getDecimalForValue(t) {
    return ($s(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const s = this._offsets, a = this.getDecimalForPixel(t) / s.factor - s.end;
    return $s(this._table, a * this._tableRange + this._minPos, !0);
  }
}
const Si = {
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
}, Tu = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
}, Bu = {
  type: {
    type: String,
    required: !0
  },
  destroyDelay: {
    type: Number,
    default: 0
    // No delay by default
  },
  ...Si,
  ...Tu
}, Lu = Oi[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function Be(e) {
  return Co(e) ? ma(e) : e;
}
function Fu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return Co(t) ? new Proxy(e, {}) : e;
}
function Pu(e, t) {
  const s = e.options;
  s && t && Object.assign(s, t);
}
function Ci(e, t) {
  e.labels = t;
}
function Di(e, t, s) {
  const a = [];
  e.datasets = t.map((n) => {
    const o = e.datasets.find((i) => i[s] === n[s]);
    return !o || !n.data || a.includes(o) ? {
      ...n
    } : (a.push(o), Object.assign(o, n), o);
  });
}
function Eu(e, t) {
  const s = {
    labels: [],
    datasets: []
  };
  return Ci(s, e.labels), Di(s, e.datasets, t), s;
}
const Ru = Z({
  props: Bu,
  setup(e, t) {
    let { expose: s, slots: a } = t;
    const n = st(null), o = So(null);
    s({
      chart: o
    });
    const i = () => {
      if (!n.value) return;
      const { type: d, data: u, options: h, plugins: f, datasetIdKey: v } = e, g = Eu(u, v), _ = Fu(g, u);
      o.value = new Ie(n.value, {
        type: d,
        data: _,
        options: {
          ...h
        },
        plugins: f
      });
    }, r = () => {
      const d = ma(o.value);
      d && (e.destroyDelay > 0 ? setTimeout(() => {
        d.destroy(), o.value = null;
      }, e.destroyDelay) : (d.destroy(), o.value = null));
    }, l = (d) => {
      d.update(e.updateMode);
    };
    return fe(i), cs(r), Vt([
      () => e.options,
      () => e.data
    ], (d, u) => {
      let [h, f] = d, [v, g] = u;
      const _ = ma(o.value);
      if (!_)
        return;
      let m = !1;
      if (h) {
        const p = Be(h), b = Be(v);
        p && p !== b && (Pu(_, p), m = !0);
      }
      if (f) {
        const p = Be(f.labels), b = Be(g.labels), $ = Be(f.datasets), k = Be(g.datasets);
        p !== b && (Ci(_.config.data, p), m = !0), $ && $ !== k && (Di(_.config.data, $, e.datasetIdKey), m = !0);
      }
      m && St(() => {
        l(_);
      });
    }, {
      deep: !0
    }), () => ba("canvas", {
      role: "img",
      "aria-label": e.ariaLabel,
      "aria-describedby": e.ariaDescribedby,
      ref: n
    }, [
      ba("p", {}, [
        a.default ? a.default() : ""
      ])
    ]);
  }
});
function Ya(e, t) {
  return Ie.register(t), Z({
    props: Si,
    setup(s, a) {
      let { expose: n } = a;
      const o = So(null), i = (r) => {
        o.value = r?.chart;
      };
      return n({
        chart: o
      }), () => ba(Ru, Lu({
        ref: i
      }, {
        type: e,
        ...s
      }));
    }
  });
}
const Iu = /* @__PURE__ */ Ya("bar", ic), Ou = /* @__PURE__ */ Ya("line", cc), zu = /* @__PURE__ */ Ya("pie", dc), vo = {
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
}, bo = {
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
  textPrimary: "#f8f9fa",
  textSecondary: "#9ca3af",
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
function lt(e) {
  const t = st("light");
  let s = null;
  const a = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", n = D(() => e?.value ? e.value : t.value), o = D(() => n.value === "dark"), i = D(() => o.value ? bo : vo), r = () => {
    typeof document > "u" || (t.value = a(), s = new MutationObserver((d) => {
      for (const u of d)
        u.attributeName === "class" && (t.value = a());
    }), s.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["class"]
    }));
  }, l = () => {
    s && (s.disconnect(), s = null);
  };
  return fe(() => {
    r();
  }), cs(() => {
    l();
  }), e && Vt(e, () => {
  }), {
    isDark: o,
    currentTheme: n,
    colors: i,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: vo,
    darkColors: bo,
    chartSeriesColors: Vu
  };
}
const Nu = { class: "chart-container" }, Wu = /* @__PURE__ */ Z({
  __name: "ChartBar",
  props: {
    data: {},
    options: {},
    stacked: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const s = e;
    Ie.register(
      $i,
      Mi,
      Wd,
      ki,
      ja,
      Ha
    );
    const { isDark: a, colors: n } = lt(rt(s, "theme")), o = s.data, i = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = D(() => s.options ? s.options : {
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
            color: n.value.textSecondary,
            padding: 12,
            boxWidth: 12,
            boxHeight: 12,
            borderRadius: 4,
            usePointStyle: !0,
            pointStyle: "rectRounded"
          },
          generateLabels: function(l) {
            return l.data.datasets.map((u, h) => ({
              text: i(u.label || ""),
              fillStyle: Array.isArray(u.backgroundColor) ? u.backgroundColor[0] : u.backgroundColor,
              strokeStyle: Array.isArray(u.borderColor) ? u.borderColor[0] : u.borderColor,
              lineWidth: u.borderWidth,
              hidden: !l.isDatasetVisible(h),
              index: h,
              datasetIndex: h
            }));
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: n.value.tooltipBg,
          titleColor: n.value.tooltipText,
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
            title: function(l) {
              return l.length > 0 ? String(i(l[0].label)) : "";
            },
            label: function(l) {
              let d = String(i(l.dataset.label || ""));
              return d && (d += ": "), l.parsed.y !== null && (d += l.parsed.y), d;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: !0,
          stacked: s.stacked || !1,
          border: {
            display: !1
          },
          grid: {
            color: n.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 12,
              weight: 500
            },
            color: n.value.textSecondary,
            padding: 8,
            callback: function(l) {
              return i(l);
            }
          }
        },
        x: {
          stacked: s.stacked || !1,
          border: {
            display: !1
          },
          grid: {
            color: n.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 12,
              weight: 500
            },
            color: n.value.textSecondary,
            padding: 8,
            callback: function(l) {
              const d = this.getLabelForValue(l);
              return i(d);
            }
          }
        }
      },
      elements: {
        bar: {
          borderRadius: 8,
          borderWidth: 0
        }
      }
    });
    return t({ isDark: a }), (l, d) => (y(), x("div", Nu, [
      X(T(Iu), {
        data: T(o),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), nt = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [a, n] of t)
    s[a] = n;
  return s;
}, ne = /* @__PURE__ */ nt(Wu, [["__scopeId", "data-v-105d8c6f"]]), Hu = { class: "chart-container" }, ju = /* @__PURE__ */ Z({
  __name: "ChartLine",
  props: {
    data: {},
    options: {},
    theme: {}
  },
  setup(e, { expose: t }) {
    const s = e;
    Ie.register(
      $i,
      Mi,
      Rd,
      Ws,
      ki,
      ja,
      Ha,
      lu
    );
    const { isDark: a, colors: n } = lt(rt(s, "theme")), o = s.data, i = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = D(() => s.options ? s.options : {
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
            color: n.value.textSecondary,
            padding: 12,
            boxWidth: 12,
            boxHeight: 12,
            borderRadius: 4,
            usePointStyle: !0,
            pointStyle: "circle",
            generateLabels: function(l) {
              return l.data.datasets.map((u, h) => ({
                text: i(u.label || ""),
                fillStyle: u.backgroundColor,
                strokeStyle: u.borderColor,
                lineWidth: u.borderWidth,
                hidden: !l.isDatasetVisible(h),
                index: h,
                datasetIndex: h
              }));
            }
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: n.value.tooltipBg,
          titleColor: n.value.tooltipText,
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
            title: function(l) {
              return l.length > 0 ? String(i(l[0].label)) : "";
            },
            label: function(l) {
              let d = String(i(l.dataset.label || ""));
              return d && (d += ": "), l.parsed.y !== null && (d += l.parsed.y), d;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: !0,
          border: {
            display: !1
          },
          grid: {
            color: n.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 12,
              weight: 500
            },
            color: n.value.textSecondary,
            padding: 8,
            callback: function(l) {
              return i(l);
            }
          }
        },
        x: {
          border: {
            display: !1
          },
          grid: {
            color: n.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 12,
              weight: 500
            },
            color: n.value.textSecondary,
            padding: 8,
            callback: function(l) {
              const d = this.getLabelForValue(l);
              return i(d);
            }
          }
        }
      },
      elements: {
        line: {
          tension: 0.4,
          borderWidth: 2.5,
          borderCapStyle: "round"
        },
        point: {
          radius: 4,
          hoverRadius: 6,
          borderWidth: 2,
          backgroundColor: a.value ? "#1a1a1d" : "#ffffff",
          hoverBorderWidth: 3
        }
      }
    });
    return t({ isDark: a }), (l, d) => (y(), x("div", Hu, [
      X(T(Ou), {
        data: T(o),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), ge = /* @__PURE__ */ nt(ju, [["__scopeId", "data-v-bacd3848"]]), Yu = { class: "chart-container" }, qu = /* @__PURE__ */ Z({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const s = e;
    Ie.register(Sd, ja, Ha);
    const { isDark: a, colors: n } = lt(rt(s, "theme")), o = s.data, i = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = D(() => s.options ? s.options : {
      responsive: !0,
      maintainAspectRatio: !1,
      cutout: s.doughnut ? "60%" : 0,
      plugins: {
        legend: {
          display: !0,
          position: "bottom",
          align: "center",
          labels: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 13,
              weight: 500
            },
            color: n.value.textSecondary,
            padding: 16,
            boxWidth: 14,
            boxHeight: 14,
            borderRadius: 4,
            usePointStyle: !0,
            pointStyle: "circle",
            generateLabels: function(l) {
              const d = l.data;
              return d.labels.length && d.datasets.length ? d.labels.map((u, h) => {
                const f = l.getDatasetMeta(0), v = d.datasets[0], g = v.data[h], _ = Array.isArray(v.backgroundColor) ? v.backgroundColor[h] : v.backgroundColor;
                return {
                  text: `${i(u)}: ${g}`,
                  fillStyle: _,
                  hidden: f.data[h]?.hidden || !1,
                  index: h
                };
              }) : [];
            }
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: n.value.tooltipBg,
          titleColor: n.value.tooltipText,
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
            title: function(l) {
              return l.length > 0 ? String(i(l[0].label)) : "";
            },
            label: function(l) {
              const d = l.label || "", u = l.parsed || 0, h = l.dataset.data.reduce((v, g) => v + g, 0), f = (u / h * 100).toFixed(1);
              return `${i(d)}: ${u} (${f}%)`;
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
    return t({ isDark: a }), (l, d) => (y(), x("div", Yu, [
      X(T(zu), {
        data: T(o),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), Ys = /* @__PURE__ */ nt(qu, [["__scopeId", "data-v-23a84317"]]), Uu = { class: "chart-container" }, Ku = ["viewBox"], Xu = ["transform"], Gu = ["x", "width", "fill", "stroke"], Zu = ["fill"], Qu = ["x1", "y1", "x2", "y2", "stroke"], Ju = ["points", "fill"], th = ["x1", "y1", "x2", "y2", "stroke"], eh = ["x", "y", "fill"], sh = ["x1", "y1", "x2", "y2", "stroke"], ah = ["points", "fill"], nh = ["transform"], oh = ["y1", "y2"], ih = ["y1", "y2"], rh = ["y1", "y2"], lh = ["y1", "y2"], ch = ["y", "height"], dh = ["y1", "y2"], uh = ["y1", "y2"], hh = ["y1", "y2"], fh = ["y1", "y2"], gh = ["y", "height"], ph = ["cy", "stroke", "onMouseenter"], vh = ["cy", "stroke", "onMouseenter"], bh = ["cy", "stroke", "onMouseenter"], mh = ["cy", "stroke", "onMouseenter"], yh = ["y1", "y2", "onMouseenter"], _h = ["y1", "y2", "onMouseenter"], xh = ["x", "y", "fill"], kh = ["x", "y", "fill"], wh = ["transform"], $h = { transform: "translate(-200, 0)" }, Mh = ["stroke"], Sh = ["fill"], Ch = { transform: "translate(-130, 0)" }, Dh = ["stroke"], Ah = ["fill"], Th = { transform: "translate(-60, 0)" }, Bh = ["stroke"], Lh = ["fill"], Fh = { transform: "translate(10, 0)" }, Ph = ["stroke"], Eh = ["fill"], Rh = { transform: "translate(80, 0)" }, Ih = ["fill"], Oh = { transform: "translate(150, 0)" }, zh = ["fill"], Vh = /* @__PURE__ */ Z({
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
    const s = e, { isDark: a } = lt(rt(s, "theme")), n = D(() => ({
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
    })), o = st({
      visible: !1,
      x: 0,
      y: 0,
      text: ""
    }), i = (f) => typeof f == "string" ? f.charAt(0).toUpperCase() + f.slice(1).toLowerCase() : f, r = (f, v) => {
      const g = f.currentTarget.closest("svg");
      if (!g) return;
      const _ = g.getBoundingClientRect(), m = g.createSVGPoint();
      m.x = f.clientX - _.left, m.y = f.clientY - _.top, o.value = {
        visible: !0,
        x: m.x,
        y: m.y - 20,
        text: v
      };
    }, l = (f) => {
      if (o.value.visible) {
        const v = f.currentTarget, g = v.getBoundingClientRect(), _ = v.createSVGPoint();
        _.x = f.clientX - g.left, _.y = f.clientY - g.top, o.value.x = _.x, o.value.y = _.y - 20;
      }
    }, d = () => {
      o.value.visible = !1;
    }, u = () => {
      o.value.visible = !1;
    }, h = D(() => {
      const f = [], g = s.chartHeight - s.chartMargin - s.chartBottomMargin;
      for (let _ = 1; _ <= 10; _++) {
        const m = _, p = (m - 1) / 9, b = s.chartMargin + g - p * g;
        f.push({ value: m, y: b });
      }
      return f;
    });
    return t({ isDark: a }), (f, v) => (y(), x("div", Uu, [
      (y(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: _t(`min-height: ${e.chartHeight}px;`),
        onMousemove: l,
        onMouseleave: d
      }, [
        o.value.visible ? (y(), x("g", {
          key: 0,
          transform: `translate(${o.value.x}, ${o.value.y})`
        }, [
          c("rect", {
            x: -(o.value.text.length * 6 + 10),
            y: -16,
            width: o.value.text.length * 12 + 20,
            height: "24",
            fill: n.value.tooltipBg,
            rx: "6",
            stroke: n.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, Gu),
          c("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: n.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, M(o.value.text), 9, Zu)
        ], 8, Xu)) : E("", !0),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, Qu),
        c("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: n.value.axis
        }, null, 8, Ju),
        (y(!0), x(q, null, J(h.value, (g, _) => (y(), x(q, { key: _ }, [
          c("line", {
            x1: e.chartMargin - 6,
            y1: g.y,
            x2: e.chartMargin,
            y2: g.y,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, th),
          c("text", {
            x: e.chartMargin - 12,
            y: g.y + 4,
            "text-anchor": "end",
            fill: n.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, M(g.value), 9, eh)
        ], 64))), 128)),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, sh),
        c("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: n.value.axis
        }, null, 8, ah),
        (y(!0), x(q, null, J(e.boxplotData, (g, _) => (y(), x(q, { key: _ }, [
          c("g", {
            transform: `translate(${g.centerX}, 0)`
          }, [
            g.isTotal ? (y(), x(q, { key: 0 }, [
              c("line", {
                x1: 0,
                y1: g.minY,
                x2: 0,
                y2: g.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, oh),
              c("line", {
                x1: 0,
                y1: g.q3Y,
                x2: 0,
                y2: g.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, ih),
              c("line", {
                x1: -18,
                y1: g.minY,
                x2: 18,
                y2: g.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, rh),
              c("line", {
                x1: -18,
                y1: g.maxY,
                x2: 18,
                y2: g.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, lh),
              c("rect", {
                x: -24,
                y: g.q3Y,
                width: "48",
                height: g.q1Y - g.q3Y,
                fill: "#8b5cf6",
                "fill-opacity": "0.15",
                stroke: "#8b5cf6",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, ch)
            ], 64)) : (y(), x(q, { key: 1 }, [
              c("line", {
                x1: 0,
                y1: g.minY,
                x2: 0,
                y2: g.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, dh),
              c("line", {
                x1: 0,
                y1: g.q3Y,
                x2: 0,
                y2: g.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, uh),
              c("line", {
                x1: -18,
                y1: g.minY,
                x2: 18,
                y2: g.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, hh),
              c("line", {
                x1: -18,
                y1: g.maxY,
                x2: 18,
                y2: g.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, fh),
              c("rect", {
                x: -24,
                y: g.q3Y,
                width: "48",
                height: g.q1Y - g.q3Y,
                fill: "#C67DFF",
                "fill-opacity": "0.15",
                stroke: "#C67DFF",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, gh)
            ], 64)),
            c("circle", {
              cx: 0,
              cy: g.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (m) => r(m, `Min: ${g.min.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, ph),
            c("circle", {
              cx: 0,
              cy: g.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (m) => r(m, `Q1: ${g.q1.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, vh),
            c("circle", {
              cx: 0,
              cy: g.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (m) => r(m, `Q3: ${g.q3.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, bh),
            c("circle", {
              cx: 0,
              cy: g.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (m) => r(m, `Max: ${g.max.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, mh),
            c("line", {
              x1: -24,
              y1: g.medianY,
              x2: 24,
              y2: g.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (m) => r(m, `Median: ${g.median.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, yh),
            g.averageY ? (y(), x("line", {
              key: 2,
              x1: -24,
              y1: g.averageY,
              x2: 24,
              y2: g.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (m) => r(m, `Avg: ${g.average.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, _h)) : E("", !0)
          ], 8, nh),
          c("text", {
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: n.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, M(i(g.label)), 9, xh),
          g.responseCount ? (y(), x("text", {
            key: 0,
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: n.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + M(g.responseCount), 9, kh)) : E("", !0)
        ], 64))), 128)),
        e.showLegend ? (y(), x("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          c("g", $h, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Mh),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Sh)
          ]),
          c("g", Ch, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Dh),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, Ah)
          ]),
          c("g", Th, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Bh),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, Lh)
          ]),
          c("g", Fh, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Ph),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Eh)
          ]),
          c("g", Rh, [
            v[0] || (v[0] = c("line", {
              x1: "0",
              y1: "0",
              x2: "14",
              y2: "0",
              stroke: "#f97316",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            c("text", {
              x: "18",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, Ih)
          ]),
          c("g", Oh, [
            v[1] || (v[1] = c("line", {
              x1: "0",
              y1: "0",
              x2: "14",
              y2: "0",
              stroke: "#8b5cf6",
              "stroke-width": "2.5"
            }, null, -1)),
            c("text", {
              x: "18",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, zh)
          ])
        ], 8, wh)) : E("", !0)
      ], 44, Ku))
    ]));
  }
}), Nh = /* @__PURE__ */ nt(Vh, [["__scopeId", "data-v-520c623f"]]), Wh = { class: "chart-container" }, Hh = ["viewBox"], jh = ["transform"], Yh = ["x", "y", "width", "height", "fill", "stroke"], qh = ["y", "fill"], Uh = ["y", "fill"], Kh = ["x1", "y1", "x2", "y2", "stroke"], Xh = ["points", "fill"], Gh = ["x1", "y1", "x2", "y2", "stroke"], Zh = ["x1", "y1", "x2", "y2", "stroke"], Qh = ["x", "y", "fill"], Jh = ["x", "y", "fill", "transform"], tf = ["x1", "y1", "x2", "y2", "stroke"], ef = ["points", "fill"], sf = ["transform"], af = ["y1", "y2", "stroke", "onMouseenter"], nf = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], of = ["x1", "y1", "x2", "y2", "onMouseenter"], rf = ["x1", "y1", "x2", "y2", "onMouseenter"], lf = ["cy", "stroke", "onMouseenter"], cf = ["cy", "stroke", "onMouseenter"], df = ["x", "y", "fill"], uf = ["x", "y", "fill"], hf = ["transform"], ff = { transform: "translate(-180, 0)" }, gf = ["stroke"], pf = ["fill"], vf = { transform: "translate(-120, 0)" }, bf = ["fill"], mf = { transform: "translate(-60, 0)" }, yf = ["fill"], _f = { transform: "translate(0, 0)" }, xf = ["stroke"], kf = ["fill"], wf = { transform: "translate(60, 0)" }, $f = ["fill"], Mf = { transform: "translate(130, 0)" }, Sf = ["fill"], Cf = /* @__PURE__ */ Z({
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
    const s = e, { isDark: a } = lt(rt(s, "theme")), n = D(() => ({
      // Tooltip
      tooltipBg: a.value ? "rgba(26, 26, 29, 0.98)" : "rgba(15, 23, 42, 0.95)",
      tooltipBorder: a.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
      tooltipText: a.value ? "#f8f9fa" : "#f1f5f9",
      tooltipTextSecondary: a.value ? "#d1d5db" : "#e2e8f0",
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
    })), o = st({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), i = (f) => typeof f == "string" ? f.charAt(0).toUpperCase() + f.slice(1).toLowerCase() : f, r = (f, v, g) => {
      const _ = f.currentTarget.closest("svg");
      if (!_) return;
      const m = _.getBoundingClientRect(), p = _.createSVGPoint();
      p.x = f.clientX - m.left, p.y = f.clientY - m.top;
      let b = i(v.label), $ = "";
      switch (g) {
        case "body":
          $ = `Q1: ${v.q1.toFixed(1)} | Q3: ${v.q3.toFixed(1)}`;
          break;
        case "wick":
          $ = `Min: ${v.low.toFixed(1)} | Max: ${v.high.toFixed(1)}`;
          break;
        case "median":
          $ = `Median: ${v.median.toFixed(1)}`;
          break;
        case "average":
          $ = `Average: ${v.average?.toFixed(1)}`;
          break;
        case "min":
          $ = `Min: ${v.low.toFixed(1)}`;
          break;
        case "max":
          $ = `Max: ${v.high.toFixed(1)}`;
          break;
      }
      const k = Math.max(180, $.length * 7 + 40), w = 48;
      o.value = {
        visible: !0,
        x: p.x,
        y: p.y - 20,
        title: b,
        text: $,
        width: k,
        height: w
      };
    }, l = (f) => {
      if (o.value.visible) {
        const v = f.currentTarget, g = v.getBoundingClientRect(), _ = v.createSVGPoint();
        _.x = f.clientX - g.left, _.y = f.clientY - g.top, o.value.x = _.x, o.value.y = _.y - 20;
      }
    }, d = () => {
      o.value.visible = !1;
    }, u = () => {
      o.value.visible = !1;
    }, h = D(() => {
      const f = [], g = s.chartHeight - s.chartMargin - s.chartBottomMargin;
      for (let _ = 1; _ <= 10; _++) {
        const m = _, p = (m - 1) / 9, b = s.chartMargin + g - p * g;
        f.push({ value: m, y: b });
      }
      return f;
    });
    return t({ isDark: a }), (f, v) => (y(), x("div", Wh, [
      (y(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: _t(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
        onMousemove: l,
        onMouseleave: d
      }, [
        o.value.visible ? (y(), x("g", {
          key: 0,
          transform: `translate(${o.value.x}, ${o.value.y})`
        }, [
          c("rect", {
            x: -o.value.width / 2,
            y: -o.value.height - 10,
            width: o.value.width,
            height: o.value.height,
            fill: n.value.tooltipBg,
            rx: "8",
            stroke: n.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, Yh),
          c("text", {
            x: "0",
            y: -o.value.height + 8,
            "text-anchor": "middle",
            fill: n.value.tooltipText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, M(o.value.title), 9, qh),
          c("text", {
            x: "0",
            y: -o.value.height + 26,
            "text-anchor": "middle",
            fill: n.value.tooltipTextSecondary,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, M(o.value.text), 9, Uh)
        ], 8, jh)) : E("", !0),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, Kh),
        c("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: n.value.axis
        }, null, 8, Xh),
        (y(!0), x(q, null, J(h.value, (g, _) => (y(), x("line", {
          key: `grid-${_}`,
          x1: e.chartMargin,
          y1: g.y,
          x2: e.chartWidth - e.chartMargin,
          y2: g.y,
          stroke: n.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Gh))), 128)),
        (y(!0), x(q, null, J(h.value, (g, _) => (y(), x(q, { key: _ }, [
          c("line", {
            x1: e.chartMargin - 6,
            y1: g.y,
            x2: e.chartMargin,
            y2: g.y,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Zh),
          c("text", {
            x: e.chartMargin - 12,
            y: g.y + 4,
            "text-anchor": "end",
            fill: n.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, M(g.value), 9, Qh)
        ], 64))), 128)),
        c("text", {
          x: e.chartMargin - 35,
          y: e.chartHeight / 2,
          "text-anchor": "middle",
          fill: n.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif",
          transform: `rotate(-90, ${e.chartMargin - 35}, ${e.chartHeight / 2})`
        }, M(i(e.yAxisLabel)), 9, Jh),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, tf),
        c("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: n.value.axis
        }, null, 8, ef),
        (y(!0), x(q, null, J(e.candlestickData, (g, _) => (y(), x(q, { key: _ }, [
          c("g", {
            transform: `translate(${g.centerX}, 0)`
          }, [
            c("line", {
              x1: 0,
              y1: g.highY,
              x2: 0,
              y2: g.lowY,
              stroke: g.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              class: "hover-line",
              onMouseenter: (m) => r(m, g, "wick"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, af),
            c("rect", {
              x: -e.candleWidth / 2,
              y: Math.min(g.q1Y, g.q3Y) - (Math.abs(g.q3Y - g.q1Y) < 4 ? 4 : 0),
              width: e.candleWidth,
              height: Math.max(8, Math.abs(g.q3Y - g.q1Y)),
              fill: g.isTotal ? "rgba(139, 92, 246, 0.15)" : "rgba(198, 125, 255, 0.15)",
              stroke: g.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              rx: "4",
              class: "hover-rect",
              onMouseenter: (m) => r(m, g, "body"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, nf),
            g.medianY ? (y(), x("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: g.medianY,
              x2: e.candleWidth / 2,
              y2: g.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (m) => r(m, g, "median"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, of)) : E("", !0),
            g.averageY ? (y(), x("line", {
              key: 1,
              x1: -e.candleWidth / 2,
              y1: g.averageY,
              x2: e.candleWidth / 2,
              y2: g.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (m) => r(m, g, "average"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, rf)) : E("", !0),
            c("circle", {
              cx: 0,
              cy: g.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (m) => r(m, g, "min"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, lf),
            c("circle", {
              cx: 0,
              cy: g.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (m) => r(m, g, "max"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, cf)
          ], 8, sf),
          c("text", {
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: n.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, M(i(g.label)), 9, df),
          g.responseCount ? (y(), x("text", {
            key: 0,
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: n.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + M(g.responseCount), 9, uf)) : E("", !0)
        ], 64))), 128)),
        e.showLegend ? (y(), x("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          c("g", ff, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, gf),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, pf)
          ]),
          c("g", vf, [
            v[0] || (v[0] = c("rect", {
              x: "-6",
              y: "-6",
              width: "12",
              height: "12",
              fill: "rgba(198, 125, 255, 0.15)",
              stroke: "#C67DFF",
              "stroke-width": "1.5",
              rx: "2"
            }, null, -1)),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, bf)
          ]),
          c("g", mf, [
            v[1] || (v[1] = c("rect", {
              x: "-6",
              y: "-6",
              width: "12",
              height: "12",
              fill: "rgba(198, 125, 255, 0.15)",
              stroke: "#C67DFF",
              "stroke-width": "1.5",
              rx: "2"
            }, null, -1)),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, yf)
          ]),
          c("g", _f, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, xf),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, kf)
          ]),
          c("g", wf, [
            v[2] || (v[2] = c("line", {
              x1: "0",
              y1: "0",
              x2: "14",
              y2: "0",
              stroke: "#f97316",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            c("text", {
              x: "18",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, $f)
          ]),
          c("g", Mf, [
            v[3] || (v[3] = c("line", {
              x1: "0",
              y1: "0",
              x2: "14",
              y2: "0",
              stroke: "#8b5cf6",
              "stroke-width": "2.5"
            }, null, -1)),
            c("text", {
              x: "18",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, Sf)
          ])
        ], 8, hf)) : E("", !0)
      ], 44, Hh))
    ]));
  }
}), Ai = /* @__PURE__ */ nt(Cf, [["__scopeId", "data-v-61d0259c"]]), Df = { class: "chart-container" }, Af = ["viewBox"], Tf = ["transform"], Bf = ["x", "y", "width", "height", "fill", "stroke"], Lf = ["y", "fill"], Ff = ["y", "fill"], Pf = ["x1", "y1", "x2", "y2", "stroke"], Ef = ["x1", "y1", "x2", "y2", "stroke"], Rf = ["points", "fill"], If = ["x1", "y1", "x2", "y2", "stroke"], Of = ["x", "y", "fill"], zf = ["x", "y", "fill", "transform"], Vf = ["x1", "y1", "x2", "y2", "stroke"], Nf = ["points", "fill"], Wf = ["x1", "y1", "x2", "y2", "stroke"], Hf = ["x", "y", "fill"], jf = ["x", "y", "fill"], Yf = ["d"], qf = ["x", "y", "width", "height", "onMouseenter"], Uf = ["x1", "y1", "x2", "y2"], Kf = ["x", "y"], Xf = ["x1", "y1", "x2", "y2"], Gf = ["x", "y"], Zf = ["x1", "y1", "x2", "y2"], Qf = ["x", "y"], Jf = ["x1", "y1", "x2", "y2"], tg = ["x", "y"], eg = ["x1", "y1", "x2", "y2"], sg = ["x", "y"], ag = ["x1", "y1", "x2", "y2"], ng = ["x", "y"], og = ["transform"], ig = { transform: "translate(-220, 0)" }, rg = ["fill"], lg = { transform: "translate(-140, 0)" }, cg = ["fill"], dg = { transform: "translate(-80, 0)" }, ug = ["fill"], hg = { transform: "translate(-20, 0)" }, fg = ["fill"], gg = { transform: "translate(60, 0)" }, pg = ["fill"], vg = { transform: "translate(130, 0)" }, bg = ["fill"], mg = { transform: "translate(180, 0)" }, yg = ["fill"], _g = /* @__PURE__ */ Z({
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
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: a } = lt(rt(s, "theme")), n = D(() => ({
      // Tooltip
      tooltipBg: a.value ? "rgba(26, 26, 29, 0.98)" : "rgba(15, 23, 42, 0.95)",
      tooltipBorder: a.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
      tooltipText: a.value ? "#f8f9fa" : "#f1f5f9",
      tooltipTextSecondary: a.value ? "#d1d5db" : "#e2e8f0",
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
    })), o = st({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), i = D(() => s.chartWidth - s.chartMargin * 2), r = D(() => s.chartHeight - s.chartMargin - s.chartBottomMargin), l = D(() => i.value / 10 * 0.6), d = D(() => {
      if (!s.histogram || s.histogram.length === 0) return 1;
      const W = Math.max(...s.histogram.map((H) => H.count || 0), 1), V = Math.max(1, Math.ceil(W * 0.2));
      return W + V;
    }), u = D(() => {
      if (!s.histogram || s.histogram.length === 0) return 1;
      const W = s.averageScore || 0;
      let V = 0, H = 0;
      if (s.histogram.forEach((et) => {
        const K = et.count || 0;
        V += K;
        const ht = et.score - W;
        H += K * (ht * ht);
      }), V === 0) return 1;
      const at = H / V;
      return Math.sqrt(at) || 1;
    }), h = (W, V, H) => {
      if (H === 0) return 0;
      const at = 1 / (H * Math.sqrt(2 * Math.PI)), et = -0.5 * Math.pow((W - V) / H, 2);
      return at * Math.exp(et);
    }, f = D(() => {
      if (!s.histogram || s.histogram.length === 0 || s.averageScore === 0 && u.value === 0) return null;
      const W = s.averageScore, V = u.value, H = 100, et = Math.max(...s.histogram.map((ut) => ut.count || 0), 1) / d.value * r.value;
      if (et <= 0) return null;
      let K = 0;
      for (let ut = 0; ut <= H; ut++) {
        const Ct = 1 + 9 * (ut / H), Pt = h(Ct, W, V);
        Pt > K && (K = Pt);
      }
      if (K <= 0) return null;
      const ht = et / K, kt = [];
      for (let ut = 0; ut <= H; ut++) {
        const Ct = 1 + 9 * (ut / H), Pt = h(Ct, W, V) * ht, Wt = g(Ct);
        if (Wt !== null) {
          const L = s.chartHeight - s.chartBottomMargin - Pt;
          kt.push(`${ut === 0 ? "M" : "L"} ${Wt} ${L}`);
        }
      }
      return kt.join(" ");
    }), v = D(() => {
      if (!s.histogram || s.histogram.length === 0) return [];
      const W = i.value / 10;
      return s.histogram.map((V, H) => {
        const at = s.chartMargin + (H + 0.5) * W, et = V.count > 0 ? V.count / d.value * r.value : 0, K = s.chartHeight - s.chartBottomMargin - et;
        return {
          score: V.score,
          count: V.count,
          x: at,
          y: K,
          height: et
        };
      });
    }), g = (W) => {
      if (W < 1 || W > 10) return null;
      const V = i.value / 10;
      return s.chartMargin + (W - 0.5) * V;
    }, _ = D(() => g(s.minScore)), m = D(() => g(s.maxScore)), p = D(() => g(s.q1Score)), b = D(() => g(s.medianScore)), $ = D(() => g(s.q3Score)), k = D(() => g(s.averageScore)), w = D(() => s.minScore), S = D(() => s.maxScore), C = D(() => s.q1Score), A = D(() => s.medianScore), P = D(() => s.q3Score), R = D(() => s.averageScore), I = D(() => {
      const W = [], V = s.chartMargin - 8, H = 18;
      p.value !== null && W.push({
        x: p.value,
        y: V,
        value: s.q1Score,
        label: `Q1: ${C.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), b.value !== null && W.push({
        x: b.value,
        y: V - H,
        value: s.medianScore,
        label: `Median: ${A.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), k.value !== null && W.push({
        x: k.value,
        y: V - H,
        value: s.averageScore,
        label: `Avg: ${R.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), $.value !== null && W.push({
        x: $.value,
        y: V,
        value: s.q3Score,
        label: `Q3: ${P.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), W.sort((K, ht) => (K.x || 0) - (ht.x || 0));
      const at = [[], [], []];
      W.forEach((K) => {
        if (K.x === null) return;
        let ht = -1;
        for (let kt = 0; kt < at.length; kt++) {
          let ut = !1;
          for (const Ct of at[kt]) {
            if (Ct.x === null) continue;
            const Pt = Math.abs(K.x - Ct.x), Wt = (K.width + Ct.width) / 2 + 10;
            if (Pt < Wt) {
              ut = !0;
              break;
            }
          }
          if (!ut) {
            ht = kt;
            break;
          }
        }
        ht === -1 && (ht = at.length - 1), K.y = V - ht * H, at[ht].push(K);
      });
      const et = 15;
      return W.forEach((K) => {
        K.y < et && (K.y = et);
      }), W;
    }), N = (W) => I.value.find((H) => H.id === W)?.y || s.chartMargin - 10, Y = D(() => {
      const W = [];
      for (let H = 0; H <= 5; H++) {
        const at = Math.round(d.value / 5 * H), et = s.chartHeight - s.chartBottomMargin - H / 5 * r.value;
        W.push({ value: at, y: et });
      }
      return W;
    }), B = (W, V) => {
      const H = W.currentTarget.closest("svg");
      if (!H) return;
      const at = H.getBoundingClientRect(), et = H.createSVGPoint();
      et.x = W.clientX - at.left, et.y = W.clientY - at.top;
      const K = `Score: ${V.score}`, ht = `Count: ${V.count}`, kt = 120, ut = 48;
      o.value = {
        visible: !0,
        x: et.x,
        y: et.y - 20,
        title: K,
        text: ht,
        width: kt,
        height: ut
      };
    }, F = (W) => {
      if (o.value.visible) {
        const V = W.currentTarget, H = V.getBoundingClientRect(), at = V.createSVGPoint();
        at.x = W.clientX - H.left, at.y = W.clientY - H.top, o.value.x = at.x, o.value.y = at.y - 20;
      }
    }, O = () => {
      o.value.visible = !1;
    }, z = () => {
      o.value.visible = !1;
    };
    return t({ isDark: a }), (W, V) => (y(), x("div", Df, [
      (y(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: _t(`min-height: ${e.chartHeight}px;`),
        onMousemove: F,
        onMouseleave: O
      }, [
        o.value.visible ? (y(), x("g", {
          key: 0,
          transform: `translate(${o.value.x}, ${o.value.y})`
        }, [
          c("rect", {
            x: -o.value.width / 2,
            y: -o.value.height - 10,
            width: o.value.width,
            height: o.value.height,
            fill: n.value.tooltipBg,
            rx: "8",
            stroke: n.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, Bf),
          c("text", {
            x: "0",
            y: -o.value.height + 8,
            "text-anchor": "middle",
            fill: n.value.tooltipText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, M(o.value.title), 9, Lf),
          c("text", {
            x: "0",
            y: -o.value.height + 26,
            "text-anchor": "middle",
            fill: n.value.tooltipTextSecondary,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, M(o.value.text), 9, Ff)
        ], 8, Tf)) : E("", !0),
        (y(!0), x(q, null, J(Y.value, (H, at) => (y(), x("line", {
          key: `grid-${at}`,
          x1: e.chartMargin,
          y1: H.y,
          x2: e.chartWidth - e.chartMargin,
          y2: H.y,
          stroke: n.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Pf))), 128)),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, Ef),
        c("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: n.value.axis
        }, null, 8, Rf),
        (y(!0), x(q, null, J(Y.value, (H, at) => (y(), x(q, {
          key: `y-tick-${at}`
        }, [
          c("line", {
            x1: e.chartMargin - 6,
            y1: H.y,
            x2: e.chartMargin,
            y2: H.y,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, If),
          c("text", {
            x: e.chartMargin - 12,
            y: H.y + 4,
            "text-anchor": "end",
            fill: n.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, M(H.value), 9, Of)
        ], 64))), 128)),
        c("text", {
          x: e.chartMargin - 35,
          y: e.chartHeight / 2,
          "text-anchor": "middle",
          fill: n.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif",
          transform: `rotate(-90, ${e.chartMargin - 35}, ${e.chartHeight / 2})`
        }, " Count ", 8, zf),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, Vf),
        c("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: n.value.axis
        }, null, 8, Nf),
        (y(!0), x(q, null, J(v.value, (H, at) => (y(), x(q, {
          key: `tick-${at}`
        }, [
          c("line", {
            x1: H.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: H.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Wf),
          c("text", {
            x: H.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: n.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, M(H.score), 9, Hf)
        ], 64))), 128)),
        c("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: n.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, jf),
        f.value ? (y(), x("path", {
          key: 1,
          d: f.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, Yf)) : E("", !0),
        (y(!0), x(q, null, J(v.value, (H, at) => (y(), x("rect", {
          key: `bar-${at}`,
          x: H.x - l.value / 2,
          y: H.y,
          width: l.value,
          height: H.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (et) => B(et, H),
          onMouseleave: z,
          style: { cursor: "pointer" }
        }, null, 40, qf))), 128)),
        _.value ? (y(), x("line", {
          key: 2,
          x1: _.value,
          y1: e.chartMargin,
          x2: _.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Uf)) : E("", !0),
        _.value ? (y(), x("text", {
          key: 3,
          x: _.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + M(w.value.toFixed(1)), 9, Kf)) : E("", !0),
        p.value ? (y(), x("line", {
          key: 4,
          x1: p.value,
          y1: e.chartMargin,
          x2: p.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Xf)) : E("", !0),
        p.value ? (y(), x("text", {
          key: 5,
          x: p.value,
          y: N("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + M(C.value.toFixed(1)), 9, Gf)) : E("", !0),
        b.value ? (y(), x("line", {
          key: 6,
          x1: b.value,
          y1: e.chartMargin,
          x2: b.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, Zf)) : E("", !0),
        b.value ? (y(), x("text", {
          key: 7,
          x: b.value,
          y: N("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + M(A.value.toFixed(1)), 9, Qf)) : E("", !0),
        k.value ? (y(), x("line", {
          key: 8,
          x1: k.value,
          y1: e.chartMargin,
          x2: k.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, Jf)) : E("", !0),
        k.value ? (y(), x("text", {
          key: 9,
          x: k.value,
          y: N("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + M(R.value.toFixed(1)), 9, tg)) : E("", !0),
        $.value ? (y(), x("line", {
          key: 10,
          x1: $.value,
          y1: e.chartMargin,
          x2: $.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#7c3aed",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, eg)) : E("", !0),
        $.value ? (y(), x("text", {
          key: 11,
          x: $.value,
          y: N("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + M(P.value.toFixed(1)), 9, sg)) : E("", !0),
        m.value ? (y(), x("line", {
          key: 12,
          x1: m.value,
          y1: e.chartMargin,
          x2: m.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, ag)) : E("", !0),
        m.value ? (y(), x("text", {
          key: 13,
          x: m.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + M(S.value.toFixed(1)), 9, ng)) : E("", !0),
        e.showLegend ? (y(), x("g", {
          key: 14,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          c("g", ig, [
            V[0] || (V[0] = c("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#8b5cf6",
              "stroke-width": "2.5"
            }, null, -1)),
            c("text", {
              x: "24",
              y: "4",
              fill: n.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Gaussian ", 8, rg)
          ]),
          c("g", lg, [
            V[1] || (V[1] = c("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#5d4b93",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            c("text", {
              x: "24",
              y: "4",
              fill: n.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, cg)
          ]),
          c("g", dg, [
            V[2] || (V[2] = c("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#a855f7",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            c("text", {
              x: "24",
              y: "4",
              fill: n.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, ug)
          ]),
          c("g", hg, [
            V[3] || (V[3] = c("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#8b5cf6",
              "stroke-width": "3",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            c("text", {
              x: "24",
              y: "4",
              fill: n.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, fg)
          ]),
          c("g", gg, [
            V[4] || (V[4] = c("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            c("text", {
              x: "24",
              y: "4",
              fill: n.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, pg)
          ]),
          c("g", vg, [
            V[5] || (V[5] = c("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#7c3aed",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            c("text", {
              x: "24",
              y: "4",
              fill: n.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, bg)
          ]),
          c("g", mg, [
            V[6] || (V[6] = c("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#C67DFF",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            c("text", {
              x: "24",
              y: "4",
              fill: n.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, yg)
          ])
        ], 8, og)) : E("", !0)
      ], 44, Af))
    ]));
  }
}), Ti = /* @__PURE__ */ nt(_g, [["__scopeId", "data-v-64e657d9"]]), xg = { class: "chart-container" }, kg = {
  key: 1,
  class: "chart-wrapper"
}, wg = /* @__PURE__ */ Z({
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
    Ka.use([Ni, Wi, Hi, ji]);
    const s = e, { isDark: a, colors: n } = lt(rt(s, "theme")), o = st(null), i = st(!0), r = st(!1);
    let l = null;
    const d = {
      animation: { duration: 1e3, easing: "cubicOut" },
      margins: { left: "2%", right: "2%", top: "2%", bottom: "2%" },
      node: { width: 70, gap: 20, align: "left", iterations: 64 },
      style: {
        shadowBlur: 4,
        shadowColor: "rgba(139, 92, 246, 0.15)"
      }
    }, u = [
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
    ], h = () => {
      const $ = s.data.links.filter(
        (C) => C.source && C.target && typeof C.value == "number"
      ), k = Math.max(...$.map((C) => C.value), 1), w = Math.max(1, k * 0.01), S = $.map((C) => ({
        ...C,
        originalValue: C.value,
        value: C.value < k * 0.01 ? w : C.value
      }));
      return {
        nodes: s.data.nodes.filter((C) => C.name),
        links: S
      };
    }, f = ($) => $.map((k, w) => ({
      ...k,
      itemStyle: {
        color: s.nodeColors[k.name] || u[w % u.length],
        borderRadius: 8
      }
    })), v = ($) => (k) => {
      const w = k.dataType === "node", S = n.value.tooltipText, C = a.value ? "#d1d5db" : "#e2e8f0";
      if (w) {
        const N = $.filter((F) => F.target === k.name), Y = $.filter((F) => F.source === k.name), B = N.length > 0 ? N.reduce((F, O) => F + (O.originalValue || O.value), 0) : Y.reduce((F, O) => F + (O.originalValue || O.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${S};">${k.name}</div><div style="color: ${C}; font-size: 12px;">Count: ${B.toLocaleString()}</div>`;
      }
      const A = k.data?.source || k.source || "Unknown", P = k.data?.target || k.target || "Unknown", R = k.data?.originalValue || k.data?.value || k.value || 0, I = k.data?.label || `${R.toLocaleString()}`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${S};">${A} → ${P}</div><div style="color: ${C}; font-size: 12px;">Flow: ${I}</div>`;
    }, g = () => {
      if (!(!l || !s.data.nodes?.length || !s.data.links?.length))
        try {
          const { nodes: $, links: k } = h(), w = f($), S = {
            tooltip: {
              trigger: "item",
              triggerOn: "mousemove",
              formatter: v(k),
              backgroundColor: n.value.tooltipBg,
              borderColor: a.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
              borderWidth: 1,
              borderRadius: 8,
              padding: [10, 14],
              textStyle: {
                color: n.value.tooltipText,
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
                data: w,
                links: k,
                emphasis: { focus: "adjacency" },
                levels: [
                  {
                    depth: 0,
                    itemStyle: {
                      color: "#8b5cf6",
                      borderRadius: 8
                    },
                    lineStyle: { color: "source", opacity: 0.5 }
                  },
                  {
                    depth: 1,
                    itemStyle: {
                      color: "#8b5cf6",
                      borderRadius: 8
                    },
                    lineStyle: { color: "source", opacity: 0.5 }
                  }
                ],
                lineStyle: {
                  color: s.useGradient ? "gradient" : "source",
                  curveness: 0.5,
                  opacity: 0.6
                },
                itemStyle: d.style,
                label: {
                  show: !0,
                  position: "inside",
                  color: "#000000",
                  fontWeight: 600,
                  fontSize: 12,
                  fontFamily: "'DM Sans', sans-serif",
                  formatter: (C) => {
                    const A = C.name || "";
                    return A.length > 15 ? `${A.substring(0, 15)}...` : A;
                  }
                },
                edgeLabel: {
                  show: !0,
                  fontSize: 11,
                  color: n.value.textSecondary,
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  formatter: (C) => {
                    const A = C.data?.originalValue || C.value || 0;
                    return C.data?.label || `${A.toLocaleString()}`;
                  }
                },
                nodeAlign: d.node.align,
                nodeGap: s.nodeGap,
                nodeWidth: d.node.width,
                layoutIterations: d.node.iterations,
                orient: "horizontal",
                draggable: !1,
                ...d.margins
              }
            ],
            backgroundColor: "transparent",
            animation: !0,
            animationDuration: d.animation.duration,
            animationEasing: d.animation.easing
          };
          l.setOption(S);
        } catch ($) {
          console.error("Error setting Sankey chart options:", $), r.value = !0;
        }
    }, _ = async () => {
      if (o.value)
        try {
          l = Ka.init(o.value), g(), window.addEventListener("resize", p);
        } catch ($) {
          console.error("Error initializing Sankey chart:", $), r.value = !0;
        } finally {
          i.value = !1;
        }
    }, m = async ($ = 40) => {
      await St();
      for (let k = 0; k < $; k++) {
        if (o.value?.clientWidth && o.value.clientWidth > 0 && o.value?.clientHeight && o.value.clientHeight > 0)
          return await _();
        await new Promise((w) => setTimeout(w, 50));
      }
      await _(), setTimeout(p, 50);
    }, p = () => l?.resize(), b = () => {
      window.removeEventListener("resize", p), l && (l.dispose(), l = null);
    };
    return fe(() => o.value && m()), Do(b), Vt(() => s.data, g, { deep: !0 }), Vt(a, g), t({ isDark: a }), ($, k) => (y(), x("div", xg, [
      r.value ? (y(), x("div", {
        key: 0,
        class: "error-state",
        style: _t({ height: e.height })
      }, [...k[0] || (k[0] = [
        tt('<div class="error-content" data-v-d6d61034><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d6d61034><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-d6d61034></path></svg><p class="error-title" data-v-d6d61034>Chart could not be loaded</p><p class="error-description" data-v-d6d61034>Please check the data format.</p></div>', 1)
      ])], 4)) : (y(), x("div", kg, [
        Gt(c("div", {
          ref_key: "chartEl",
          ref: o,
          class: "chart-content",
          style: _t({ height: e.height })
        }, null, 4), [
          [Ds, !i.value]
        ]),
        Gt(c("div", {
          class: "loading-state",
          style: _t({ height: e.height })
        }, [...k[1] || (k[1] = [
          tt('<div class="loading-container" data-v-d6d61034><div class="sankey-loader" data-v-d6d61034><div class="flow flow-1" data-v-d6d61034></div><div class="flow flow-2" data-v-d6d61034></div><div class="flow flow-3" data-v-d6d61034></div><div class="flow flow-4" data-v-d6d61034></div></div><p class="loading-text" data-v-d6d61034>Loading Sankey diagram...</p></div>', 1)
        ])], 4), [
          [Ds, i.value]
        ])
      ]))
    ]));
  }
}), pe = /* @__PURE__ */ nt(wg, [["__scopeId", "data-v-d6d61034"]]);
function $g(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    c("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
    })
  ]);
}
function Mg(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    c("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
    })
  ]);
}
function Sg(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    c("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
    })
  ]);
}
function Bi(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    c("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
    })
  ]);
}
function It(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    c("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
    })
  ]);
}
function Cg(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    c("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
    }),
    c("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
    })
  ]);
}
function Dg(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    c("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "m19.5 8.25-7.5 7.5-7.5-7.5"
    })
  ]);
}
function Ag(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    c("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15.75 19.5 8.25 12l7.5-7.5"
    })
  ]);
}
function Tg(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    c("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "m8.25 4.5 7.5 7.5-7.5 7.5"
    })
  ]);
}
function mo(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    c("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
    })
  ]);
}
function Bg(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    c("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    })
  ]);
}
function Lg(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    c("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
    })
  ]);
}
function Fg(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    c("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
    })
  ]);
}
function Pg(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    c("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
    })
  ]);
}
function Li(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    c("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    })
  ]);
}
const Eg = { class: "chart-footer" }, Rg = { class: "export-actions" }, Ig = { class: "export-buttons" }, Og = ["disabled"], zg = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Vg = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Ng = ["disabled"], Wg = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Hg = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, jg = /* @__PURE__ */ Z({
  __name: "FooterExport",
  props: {
    formats: { default: () => ["pdf", "csv"] },
    loading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const s = e, a = t, n = (i) => s.formats.includes(i), o = (i) => {
      s.loading || a("export", i);
    };
    return (i, r) => (y(), x("footer", Eg, [
      r[9] || (r[9] = c("div", { class: "footer-divider" }, null, -1)),
      c("div", Rg, [
        r[8] || (r[8] = c("span", { class: "export-label" }, "Export", -1)),
        c("div", Ig, [
          n("pdf") ? (y(), x("button", {
            key: 0,
            type: "button",
            class: G(["export-btn", { "is-loading": e.loading }]),
            disabled: e.loading,
            title: "Download PDF",
            onClick: r[0] || (r[0] = (l) => o("pdf"))
          }, [
            e.loading ? (y(), x("svg", zg, [...r[2] || (r[2] = [
              c("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                "stroke-opacity": "0.25"
              }, null, -1),
              c("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
            ])])) : (y(), x("svg", Vg, [...r[3] || (r[3] = [
              tt('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-672661d4></path><polyline points="14 2 14 8 20 8" data-v-672661d4></polyline><line x1="16" y1="13" x2="8" y2="13" data-v-672661d4></line><line x1="16" y1="17" x2="8" y2="17" data-v-672661d4></line><polyline points="10 9 9 9 8 9" data-v-672661d4></polyline>', 5)
            ])])),
            r[4] || (r[4] = c("span", null, "PDF", -1))
          ], 10, Og)) : E("", !0),
          n("csv") ? (y(), x("button", {
            key: 1,
            type: "button",
            class: G(["export-btn", { "is-loading": e.loading }]),
            disabled: e.loading,
            title: "Download CSV",
            onClick: r[1] || (r[1] = (l) => o("csv"))
          }, [
            e.loading ? (y(), x("svg", Wg, [...r[5] || (r[5] = [
              c("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                "stroke-opacity": "0.25"
              }, null, -1),
              c("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
            ])])) : (y(), x("svg", Hg, [...r[6] || (r[6] = [
              c("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }, null, -1),
              c("polyline", { points: "14 2 14 8 20 8" }, null, -1),
              c("line", {
                x1: "12",
                y1: "18",
                x2: "12",
                y2: "12"
              }, null, -1),
              c("line", {
                x1: "9",
                y1: "15",
                x2: "15",
                y2: "15"
              }, null, -1)
            ])])),
            r[7] || (r[7] = c("span", null, "CSV", -1))
          ], 10, Ng)) : E("", !0)
        ])
      ])
    ]));
  }
}), yt = /* @__PURE__ */ nt(jg, [["__scopeId", "data-v-672661d4"]]), Yg = { class: "agents-per-day-card" }, qg = {
  key: 0,
  class: "card-body"
}, Ug = {
  key: 0,
  class: "chart-section"
}, Kg = {
  key: 1,
  class: "empty-state"
}, Xg = { class: "empty-state-content" }, Gg = { class: "empty-icon-wrapper" }, Zg = {
  key: 1,
  class: "loading-state"
}, Qg = /* @__PURE__ */ Z({
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
  setup(e, { expose: t, emit: s }) {
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
    }, n = e, o = s, i = (f) => {
      o("export", f);
    }, { isDark: r, colors: l } = lt(rt(n, "theme")), d = (f) => {
      const v = new Date(f), g = String(v.getDate()).padStart(2, "0"), _ = String(v.getMonth() + 1).padStart(2, "0");
      return `${g}-${_}`;
    }, u = D(() => {
      const f = n.data?.agents_by_day || {}, v = Object.keys(f).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const g = v.map(($) => d($)), _ = /* @__PURE__ */ new Set();
      for (const $ of Object.values(f))
        for (const k of Object.keys($))
          _.add(k);
      const m = Array.from(_), p = ($) => $, b = m.map(($) => ({
        label: $,
        data: v.map((k) => f[k]?.[$] || 0),
        backgroundColor: `${a[$] || "#94a3b8"}80`,
        borderColor: p(a[$] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: g,
        datasets: b
      };
    }), h = D(() => n.options ? n.options : {
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
            color: l.value.textSecondary,
            padding: 12,
            boxWidth: 12,
            boxHeight: 12,
            borderRadius: 4,
            usePointStyle: !0,
            pointStyle: "rectRounded"
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
          }
        }
      },
      scales: {
        x: {
          stacked: !0,
          border: {
            display: !1
          },
          grid: {
            display: !1
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 12,
              weight: 500
            },
            color: l.value.textSecondary,
            padding: 8
          }
        },
        y: {
          stacked: !0,
          beginAtZero: !0,
          border: {
            display: !1
          },
          grid: {
            color: l.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 12,
              weight: 500
            },
            color: l.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: r }), (f, v) => (y(), x("article", Yg, [
      v[3] || (v[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Agents Total Messages per Day"),
          c("p", { class: "card-subtitle" }, "Daily agent interactions (stacked)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Zg, [...v[2] || (v[2] = [
        tt('<div class="loading-container" data-v-4d18c22c><div class="chart-lines-loader" data-v-4d18c22c><div class="line line-1" data-v-4d18c22c></div><div class="line line-2" data-v-4d18c22c></div><div class="line line-3" data-v-4d18c22c></div><div class="line line-4" data-v-4d18c22c></div><div class="line line-5" data-v-4d18c22c></div></div><p class="loading-text" data-v-4d18c22c>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", qg, [
        u.value.labels && u.value.labels.length ? (y(), x("section", Ug, [
          X(ne, {
            data: u.value,
            options: h.value,
            stacked: !0
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ct(T(yt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", Kg, [
          c("div", Xg, [
            c("div", Gg, [
              X(T(It), { class: "empty-icon" })
            ]),
            v[0] || (v[0] = c("p", { class: "empty-title" }, "No agents data per day", -1)),
            v[1] || (v[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see daily agent interactions.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Jg = /* @__PURE__ */ nt(Qg, [["__scopeId", "data-v-4d18c22c"]]), j = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), dt = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), tp = { class: "booking-manager-card" }, ep = { class: "card-header" }, sp = { class: "header-content" }, ap = {
  key: 0,
  class: "payment-success-badge"
}, np = {
  key: 0,
  class: "currency-breakdown-list"
}, op = {
  key: 1,
  class: "badge-value"
}, ip = {
  key: 0,
  class: "loading-state"
}, rp = {
  key: 1,
  class: "error-state"
}, lp = { class: "error-content" }, cp = { class: "error-description" }, dp = {
  key: 2,
  class: "card-body"
}, up = { class: "chart-section" }, hp = { class: "chart-wrapper" }, fp = {
  key: 0,
  class: "table-section"
}, gp = { class: "table-wrapper" }, pp = { class: "data-table" }, vp = { class: "table-body" }, bp = { class: "table-cell font-medium" }, mp = { class: "table-cell text-center" }, yp = { class: "table-cell text-center" }, _p = { class: "percentage-text" }, xp = { class: "table-cell text-center" }, kp = { class: "table-cell" }, wp = { class: "badges-container" }, $p = { class: "badge badge-success" }, Mp = { class: "badge badge-error" }, Sp = { class: "table-cell" }, Cp = {
  key: 0,
  class: "badges-container"
}, Dp = {
  key: 1,
  class: "percentage-text"
}, Ap = { class: "table-cell" }, Tp = { class: "badges-container" }, Bp = { class: "badge badge-error" }, Lp = { class: "badge badge-warning" }, Fp = { class: "badge badge-yellow" }, Pp = { class: "badge badge-error" }, Ep = {
  key: 1,
  class: "empty-state"
}, ra = 3, Rp = /* @__PURE__ */ Z({
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
    const s = e, a = t, n = (m) => {
      a("export", m);
    }, o = st(!1), i = D(() => s.data?.booking_manager_by_day ? [...s.data.booking_manager_by_day].sort(
      (m, p) => new Date(m.date).getTime() - new Date(p.date).getTime()
    ) : []), r = D(() => o.value ? i.value : i.value.slice(0, ra)), l = D(() => i.value.length > ra), d = D(() => s.data?.total_payment_success_value || []), u = (m) => m.payment_success_value || [], h = (m) => typeof m.payment_success_count == "number" ? m.payment_success_count : (m.payment_success_value || []).reduce((p, b) => p + (b.count || 0), 0), f = (m) => dt(m), v = D(() => {
      const m = s.data, p = m.total_booking_initiated || 0, b = m.total_booking_started || 0, $ = m.total_payment_initiated || 0, k = m.total_not_found || 0, w = m.total_cancelled || 0, S = m.total_no_pending_balance || 0, C = m.total_errors || 0, A = typeof m.total_payment_success == "number" ? m.total_payment_success : (m.total_payment_success_value || []).reduce((F, O) => F + (O.count || 0), 0), P = m.total_payment_failed || 0, R = Math.max(0, p - b), I = Math.max(0, b - $ - k - w - S - C), N = (F, O) => {
        const z = O > 0 ? Math.round(F / O * 100) : 0;
        return `${F.toLocaleString()} (${z}%)`;
      }, Y = [
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
      ], B = [];
      return b > 0 && B.push({
        source: "Initiated",
        target: "Started",
        value: b,
        label: N(b, p)
      }), R > 0 && B.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: R,
        label: N(R, p)
      }), $ > 0 && B.push({
        source: "Started",
        target: "Payment Initiated",
        value: $,
        label: N($, b)
      }), k > 0 && B.push({
        source: "Started",
        target: "Not Found",
        value: k,
        label: N(k, b)
      }), w > 0 && B.push({
        source: "Started",
        target: "Cancelled",
        value: w,
        label: N(w, b)
      }), S > 0 && B.push({
        source: "Started",
        target: "No Pending Balance",
        value: S,
        label: N(S, b)
      }), C > 0 && B.push({
        source: "Started",
        target: "Errors",
        value: C,
        label: N(C, b)
      }), I > 0 && B.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: I,
        label: N(I, b)
      }), A > 0 && B.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: A,
        label: N(A, $)
      }), P > 0 && B.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: P,
        label: N(P, $)
      }), { nodes: Y, links: B };
    }), g = {
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
    }, _ = (m, p) => !p || p === 0 ? "0%" : `${Math.round(m / p * 100)}%`;
    return (m, p) => (y(), x("article", tp, [
      c("header", ep, [
        c("div", sp, [
          p[2] || (p[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Booking Manager Metrics"),
            c("p", { class: "card-subtitle" }, "Booking manager workflow tracking and analysis")
          ], -1)),
          s.loading ? E("", !0) : (y(), x("div", ap, [
            p[1] || (p[1] = c("p", { class: "badge-label" }, "Payment Success Value", -1)),
            d.value.length > 0 ? (y(), x("div", np, [
              (y(!0), x(q, null, J(d.value, (b) => (y(), x("p", {
                key: b.currency,
                class: "currency-breakdown-item"
              }, M(b.currency) + " " + M(f(b.total_value)), 1))), 128))
            ])) : (y(), x("p", op, M(f(0)), 1))
          ]))
        ])
      ]),
      s.loading ? (y(), x("div", ip, [...p[3] || (p[3] = [
        tt('<div class="loading-container" data-v-15d5c773><div class="chart-flow-loader" data-v-15d5c773><div class="flow-line flow-1" data-v-15d5c773></div><div class="flow-line flow-2" data-v-15d5c773></div><div class="flow-line flow-3" data-v-15d5c773></div><div class="flow-line flow-4" data-v-15d5c773></div><div class="flow-line flow-5" data-v-15d5c773></div></div><p class="loading-text" data-v-15d5c773>Loading booking data...</p></div>', 1)
      ])])) : s.error ? (y(), x("div", rp, [
        c("div", lp, [
          p[4] || (p[4] = c("div", { class: "error-icon-wrapper" }, [
            c("svg", {
              class: "error-icon",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [
              c("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              })
            ])
          ], -1)),
          p[5] || (p[5] = c("p", { class: "error-title" }, "Error loading data", -1)),
          c("p", cp, M(s.error), 1)
        ])
      ])) : (y(), x("div", dp, [
        c("section", up, [
          c("div", hp, [
            X(pe, {
              data: v.value,
              "node-colors": g,
              height: "500px",
              "node-gap": 15
            }, null, 8, ["data"])
          ])
        ]),
        i.value.length > 0 ? (y(), x("section", fp, [
          p[8] || (p[8] = c("div", { class: "section-header" }, [
            c("h4", { class: "section-title" }, "Daily Overview")
          ], -1)),
          c("div", gp, [
            c("table", pp, [
              p[6] || (p[6] = c("thead", null, [
                c("tr", { class: "table-header-row" }, [
                  c("th", { class: "table-header" }, "Date"),
                  c("th", { class: "table-header" }, "Initiated"),
                  c("th", { class: "table-header" }, "Started"),
                  c("th", { class: "table-header" }, "Payment Initiated"),
                  c("th", { class: "table-header" }, "Payment Results"),
                  c("th", { class: "table-header" }, "Payment Value"),
                  c("th", { class: "table-header" }, "Outcomes")
                ])
              ], -1)),
              c("tbody", vp, [
                (y(!0), x(q, null, J(r.value, (b) => (y(), x("tr", {
                  key: b.date,
                  class: "table-row"
                }, [
                  c("td", bp, M(T(Tt)(b.date).format("DD/MM/YYYY")), 1),
                  c("td", mp, M(T(j)(b.booking_initiated_count)), 1),
                  c("td", yp, [
                    xt(M(T(j)(b.booking_started_count)) + " ", 1),
                    c("span", _p, " (" + M(_(b.booking_started_count, b.booking_initiated_count)) + ") ", 1)
                  ]),
                  c("td", xp, M(T(j)(b.payment_initiated_count)), 1),
                  c("td", kp, [
                    c("div", wp, [
                      c("span", $p, " Success: " + M(T(j)(h(b))), 1),
                      c("span", Mp, " Failed: " + M(T(j)(b.payment_failed_count || 0)), 1)
                    ])
                  ]),
                  c("td", Sp, [
                    u(b).length > 0 ? (y(), x("div", Cp, [
                      (y(!0), x(q, null, J(u(b), ($) => (y(), x("span", {
                        key: `${b.date}-${$.currency}`,
                        class: "badge badge-currency"
                      }, M($.currency) + " " + M(f($.total_value)), 1))), 128))
                    ])) : (y(), x("span", Dp, "N/A"))
                  ]),
                  c("td", Ap, [
                    c("div", Tp, [
                      c("span", Bp, " Not Found: " + M(b.not_found_count ? T(j)(b.not_found_count) : "N/A"), 1),
                      c("span", Lp, " Cancelled: " + M(b.cancelled_count ? T(j)(b.cancelled_count) : "N/A"), 1),
                      c("span", Fp, " No Balance: " + M(b.no_pending_balance_count ? T(j)(b.no_pending_balance_count) : "N/A"), 1),
                      c("span", Pp, " Errors: " + M(b.error_count ? T(j)(b.error_count) : "N/A"), 1)
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          l.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: p[0] || (p[0] = (b) => o.value = !o.value)
          }, [
            xt(M(o.value ? "View less" : `View more (${i.value.length - ra} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: G(["view-more-icon", { "view-more-icon-rotated": o.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...p[7] || (p[7] = [
              c("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : E("", !0),
          e.enableExport ? (y(), ct(T(yt), {
            key: 1,
            onExport: n,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", Ep, [...p[9] || (p[9] = [
          tt('<div class="empty-state-content" data-v-15d5c773><div class="empty-icon-wrapper" data-v-15d5c773><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-15d5c773><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" data-v-15d5c773></path></svg></div><p class="empty-title" data-v-15d5c773>No booking manager data available</p><p class="empty-description" data-v-15d5c773>No booking manager data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Ip = /* @__PURE__ */ nt(Rp, [["__scopeId", "data-v-15d5c773"]]), Op = { class: "checkin-metrics-card" }, zp = {
  key: 0,
  class: "loading-state"
}, Vp = {
  key: 1,
  class: "card-body"
}, Np = {
  key: 0,
  class: "chart-section"
}, Wp = { class: "chart-wrapper" }, Hp = {
  key: 1,
  class: "table-section"
}, jp = { class: "table-wrapper" }, Yp = { class: "data-table" }, qp = { class: "table-body" }, Up = { class: "table-cell font-medium" }, Kp = { class: "table-cell text-center" }, Xp = { class: "table-cell text-center" }, Gp = { class: "table-cell text-center" }, Zp = { class: "table-cell text-center" }, Qp = { class: "table-cell text-center" }, Jp = { class: "table-cell text-center" }, t0 = { class: "table-cell text-left" }, e0 = {
  key: 0,
  class: "failed-steps"
}, s0 = { class: "step-name" }, a0 = { class: "step-count" }, n0 = {
  key: 1,
  class: "empty-cell"
}, o0 = {
  key: 2,
  class: "empty-state"
}, i0 = {
  __name: "Checkin",
  props: {
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
    const s = t, a = (m) => {
      s("export", m);
    }, n = e, o = {
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
    }, r = st([]), l = D(() => {
      const m = n.data;
      return m && (Array.isArray(m.checkin_by_day) && m.checkin_by_day.length > 0 || (m.total_checkin_initiated ?? 0) > 0) ? { ...o, ...m } : n.checkinData ?? o;
    }), d = D(() => {
      const m = n.data;
      return m && (Array.isArray(m.failed_by_step_by_day) && m.failed_by_step_by_day.length > 0 || Array.isArray(m.unrecovered_by_step) && m.unrecovered_by_step.length > 0) ? {
        ...i,
        total_checkin_failed: m.total_checkin_failed ?? 0,
        total_checkin_unrecovered: m.total_checkin_unrecovered ?? 0,
        failed_by_step_by_day: m.failed_by_step_by_day ?? [],
        unrecovered_by_step: m.unrecovered_by_step ?? [],
        unrecovered_by_day: m.unrecovered_by_day ?? []
      } : n.failedData ?? i;
    }), u = D(() => {
      const m = {
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
      return (d.value.unrecovered_by_step || []).forEach((b) => {
        const k = b.step_name.replace(/_/g, " ").split(" ").map((S) => S.charAt(0).toUpperCase() + S.slice(1)).join(" "), w = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        m[k] = w[k] || "#DC2626";
      }), m;
    }), h = (m, p) => !p || p === 0 ? "0%" : `${Math.round(m / p * 100)}%`, f = (m, p) => {
      const b = j(m), $ = h(m, p);
      return `${b} (${$})`;
    }, v = (m) => m.reduce((p, b) => p + b.failed_count, 0), g = D(() => {
      const m = [], p = [];
      if (!l.value.total_checkin_initiated)
        return { nodes: m, links: p };
      m.push({ name: "Checkin Init" }), m.push({ name: "Booking retrive" }), m.push({ name: "Booking retrive success" }), m.push({ name: "Number of Passengers" }), m.push({ name: "Completed" }), m.push({ name: "Closed with BP" });
      const b = l.value.total_checkin_initiated, $ = l.value.total_checkin_init, k = l.value.total_checkin_init_abandoned, w = $ - k, S = l.value.total_checkin_started, C = l.value.total_checkin_completed, A = l.value.total_checkin_closed, P = d.value.unrecovered_by_step || [], R = P.reduce((B, F) => B + F.count, 0);
      if ($ > 0) {
        const B = Math.round($ / b * 100);
        p.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: $,
          label: `${$.toLocaleString()} (${B}%)`
        });
      }
      const I = b - $;
      if (I > 0) {
        const B = Math.round(I / b * 100);
        m.push({ name: "Abandoned (Init)" }), p.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: I,
          label: `${I.toLocaleString()} (${B}%)`
        });
      }
      if (k > 0) {
        const B = Math.round(k / b * 100);
        m.push({ name: "Abandoned (Started)" }), p.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: k,
          label: `${k.toLocaleString()} (${B}%)`
        });
      }
      if (w > 0) {
        const B = Math.round(w / b * 100);
        p.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: w,
          label: `${w.toLocaleString()} (${B}%)`
        });
      }
      if (S > 0) {
        const B = Math.round(S / b * 100);
        p.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: S,
          label: `${S.toLocaleString()} (${B}%)`
        });
      }
      if (C > 0) {
        const B = Math.round(C / S * 100);
        p.push({
          source: "Number of Passengers",
          target: "Completed",
          value: C,
          label: `${C.toLocaleString()} (${B}%)`
        });
      }
      if (P.length > 0 && R > 0) {
        m.push({ name: "Unrecovered" });
        const B = Math.round(R / S * 100);
        p.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: R,
          label: `${R.toLocaleString()} (${B}%)`
        }), P.forEach((F) => {
          const z = F.step_name.replace(/_/g, " ").split(" ").map((V) => V.charAt(0).toUpperCase() + V.slice(1)).join(" "), W = Math.round(F.count / S * 100);
          m.push({ name: z }), p.push({
            source: "Unrecovered",
            target: z,
            value: F.count,
            label: `${F.count.toLocaleString()} (${W}%)`
          });
        });
      }
      const N = S - (C + R);
      if (N > 0) {
        const B = Math.round(N / S * 100);
        m.push({ name: "Abandoned (Flow)" }), p.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: N,
          label: `${N.toLocaleString()} (${B}%)`
        });
      }
      const Y = C - A;
      if (Y > 0) {
        const B = Math.round(Y / S * 100);
        m.push({ name: "BP Error" }), p.push({
          source: "Completed",
          target: "BP Error",
          value: Y,
          label: `${Y.toLocaleString()} (${B}%)`
        });
      }
      if (A > 0) {
        const B = Math.round(A / S * 100);
        p.push({
          source: "Completed",
          target: "Closed with BP",
          value: A,
          label: `${A.toLocaleString()} (${B}%)`
        });
      }
      return { nodes: m, links: p };
    }), _ = () => {
      const m = l.value.checkin_by_day || [], p = d.value.failed_by_step_by_day || [];
      if (m.length === 0) {
        r.value = [];
        return;
      }
      r.value = [...m].map((b) => {
        const $ = p.find(
          (k) => k.date === b.date
        );
        return {
          ...b,
          failed_steps: $?.steps || []
        };
      }), r.value.sort((b, $) => new Date(b.date) - new Date($.date));
    };
    return Vt(
      [() => n.data, () => n.checkinData, () => n.failedData],
      () => {
        _();
      },
      { deep: !0, immediate: !0 }
    ), (m, p) => (y(), x("article", Op, [
      p[3] || (p[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Check-in Metrics"),
          c("p", { class: "card-subtitle" }, "Check-in performance and failure analysis")
        ])
      ], -1)),
      n.loading ? (y(), x("div", zp, [...p[0] || (p[0] = [
        tt('<div class="loading-container" data-v-d527da09><div class="chart-flow-loader" data-v-d527da09><div class="flow-line flow-1" data-v-d527da09></div><div class="flow-line flow-2" data-v-d527da09></div><div class="flow-line flow-3" data-v-d527da09></div><div class="flow-line flow-4" data-v-d527da09></div><div class="flow-line flow-5" data-v-d527da09></div></div><p class="loading-text" data-v-d527da09>Loading check-in data...</p></div>', 1)
      ])])) : (y(), x("div", Vp, [
        g.value.nodes.length > 0 ? (y(), x("section", Np, [
          c("div", Wp, [
            X(pe, {
              data: g.value,
              height: "500px",
              "node-colors": u.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : E("", !0),
        r.value && r.value.length > 0 ? (y(), x("section", Hp, [
          c("div", jp, [
            c("table", Yp, [
              p[1] || (p[1] = c("thead", null, [
                c("tr", { class: "table-header-row" }, [
                  c("th", { class: "table-header" }, "Date"),
                  c("th", { class: "table-header" }, "Checkin Init"),
                  c("th", { class: "table-header" }, "Booking Retrieve (%)"),
                  c("th", { class: "table-header" }, "Number of Passengers"),
                  c("th", { class: "table-header" }, "Completed (%)"),
                  c("th", { class: "table-header" }, "Closed with BP (%)"),
                  c("th", { class: "table-header" }, "Failed (%)"),
                  c("th", { class: "table-header" }, "Failed (Reasons)")
                ])
              ], -1)),
              c("tbody", qp, [
                (y(!0), x(q, null, J(r.value, (b) => (y(), x("tr", {
                  key: b.date,
                  class: "table-row"
                }, [
                  c("td", Up, M(T(Tt)(b.date).format("DD/MM/YYYY")), 1),
                  c("td", Kp, M(T(j)(b.checkin_initiated_count)), 1),
                  c("td", Xp, M(f(b.checkin_init_count, b.checkin_initiated_count)), 1),
                  c("td", Gp, M(T(j)(b.checkin_started_count)), 1),
                  c("td", Zp, M(f(b.checkin_completed_count, b.checkin_started_count)), 1),
                  c("td", Qp, M(f(b.checkin_closed_count, b.checkin_started_count)), 1),
                  c("td", Jp, M(f(v(b.failed_steps), b.checkin_started_count)), 1),
                  c("td", t0, [
                    b.failed_steps && b.failed_steps.length > 0 ? (y(), x("div", e0, [
                      (y(!0), x(q, null, J(b.failed_steps, ($) => (y(), x("div", {
                        key: $.step_name,
                        class: "failed-step-item"
                      }, [
                        c("span", s0, M($.step_name.replace(/_/g, " ")) + ":", 1),
                        c("span", a0, M($.failed_count), 1)
                      ]))), 128))
                    ])) : (y(), x("div", n0, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), ct(T(yt), {
            key: 0,
            onExport: a,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", o0, [...p[2] || (p[2] = [
          tt('<div class="empty-state-content" data-v-d527da09><div class="empty-icon-wrapper" data-v-d527da09><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d527da09><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-d527da09></path></svg></div><p class="empty-title" data-v-d527da09>No check-in data available</p><p class="empty-description" data-v-d527da09>Try adjusting the date range or check your filters to see check-in performance data.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}, r0 = /* @__PURE__ */ nt(i0, [["__scopeId", "data-v-d527da09"]]), l0 = { class: "checkin-metrics-card" }, c0 = {
  key: 0,
  class: "loading-state"
}, d0 = {
  key: 1,
  class: "card-body"
}, u0 = {
  key: 0,
  class: "sankey-section"
}, h0 = {
  key: 1,
  class: "table-section"
}, f0 = { class: "table-wrapper" }, g0 = { class: "data-table" }, p0 = { class: "table-body" }, v0 = { class: "table-cell date-cell" }, b0 = { class: "table-cell text-center" }, m0 = { class: "table-cell text-center" }, y0 = { class: "table-cell text-center" }, _0 = { class: "table-cell text-center" }, x0 = { class: "table-cell text-center" }, k0 = { class: "table-cell text-center" }, w0 = { class: "table-cell reasons-cell" }, $0 = {
  key: 0,
  class: "reasons-list"
}, M0 = { class: "reason-name" }, S0 = { class: "reason-count" }, C0 = {
  key: 1,
  class: "no-reasons"
}, D0 = {
  key: 2,
  class: "empty-state"
}, A0 = { class: "empty-state-content" }, T0 = { class: "empty-icon-wrapper" }, la = 3, B0 = /* @__PURE__ */ Z({
  __name: "CheckinMetrics",
  props: {
    checkinData: { default: () => ({
      total_checkin_init: 0,
      total_checkin_initiated: 0,
      total_checkin_init_abandoned: 0,
      total_checkin_started: 0,
      total_checkin_completed: 0,
      total_checkin_closed: 0,
      total_checkin_unrecovered: 0,
      total_checkin_init_abandoned_error: null,
      total_checkin_init_abandoned_voluntary: null,
      total_checkin_pre_init_abandoned_error: null,
      total_checkin_pre_init_abandoned_voluntary: null,
      checkin_by_day: []
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
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, o = ($) => {
      n("export", $);
    }, { isDark: i } = lt(rt(a, "theme")), r = ($) => $ == null ? "0" : $.toLocaleString(), l = ($) => {
      const k = new Date($), w = String(k.getDate()).padStart(2, "0"), S = String(k.getMonth() + 1).padStart(2, "0"), C = k.getFullYear();
      return `${w}/${S}/${C}`;
    }, d = ($) => $.replace(/_/g, " ").replace(/\b\w/g, (k) => k.toUpperCase()), u = ($, k) => !k || k === 0 ? "0%" : `${Math.round($ / k * 100)}%`, h = ($, k) => {
      const w = $ || 0, S = k || 0, C = r(w), A = u(w, S);
      return `${C} (${A})`;
    }, f = ($) => $ ? $.reduce((k, w) => k + w.failed_count, 0) : 0, v = D(() => {
      const $ = {
        "Checkin Init": "#93C5FD",
        "Booking retrive": "#C7D2FE",
        "Booking retrive success": "#A5B4FC",
        "Number of Passengers": "#8B8CF6",
        Completed: "#A7F3D0",
        "Closed with BP": "#7BE39E",
        "Abandoned (Init)": "#FACC15",
        "Booking not retreived": "#F87171",
        "Abandoned (Started)": "#FACC15",
        Error: "#F87171",
        "Abandoned (Flow)": "#FACC15",
        "BP Error": "#EF4444",
        Unrecovered: "#F87171"
      };
      return (a.failedData?.unrecovered_by_step || []).forEach((w) => {
        const C = w.step_name.replace(/_/g, " ").split(" ").map((P) => P.charAt(0).toUpperCase() + P.slice(1)).join(" "), A = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        $[C] = A[C] || "#DC2626";
      }), $;
    }), g = st(!1), _ = D(() => {
      const $ = a.checkinData?.checkin_by_day || [], k = a.failedData?.failed_by_step_by_day || [];
      return $.map((S) => {
        const C = k.find((A) => A.date === S.date);
        return {
          ...S,
          failed_steps: C?.steps || []
        };
      }).sort((S, C) => new Date(S.date).getTime() - new Date(C.date).getTime());
    }), m = D(() => g.value ? _.value : _.value.slice(0, la)), p = D(() => _.value.length > la), b = D(() => {
      const $ = [], k = [], w = /* @__PURE__ */ new Set(), S = (L) => {
        w.has(L) || ($.push({ name: L }), w.add(L));
      };
      if (!a.checkinData?.total_checkin_initiated)
        return { nodes: $, links: k };
      S("Checkin Init"), S("Booking retrive"), S("Booking retrive success"), S("Number of Passengers"), S("Completed"), S("Closed with BP");
      const C = a.checkinData.total_checkin_initiated || 0, A = a.checkinData.total_checkin_init || 0, P = a.checkinData.total_checkin_init_abandoned || 0, R = a.checkinData.total_checkin_pre_init_abandoned_error, I = a.checkinData.total_checkin_pre_init_abandoned_voluntary, N = R != null || I != null, Y = N ? Math.max(Number(R) || 0, 0) : 0, B = N ? Math.max(Number(I) || 0, 0) : 0, F = a.checkinData.total_checkin_init_abandoned_error, O = a.checkinData.total_checkin_init_abandoned_voluntary, z = F != null || O != null, W = z ? Math.max(Number(F) || 0, 0) : 0, V = z ? Math.max(Number(O) || 0, 0) : 0, H = z ? Math.max(P - W - V, 0) : P, at = A - P, et = a.checkinData.total_checkin_started || 0, K = a.checkinData.total_checkin_completed || 0, ht = a.checkinData.total_checkin_closed || 0, kt = a.failedData?.unrecovered_by_step || [], ut = kt.reduce((L, U) => L + U.count, 0);
      if (A > 0) {
        const L = Math.round(A / C * 100);
        k.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: A,
          label: `${A.toLocaleString()} (${L}%)`
        });
      }
      const Ct = C - A;
      if (N) {
        if (B > 0) {
          const L = Math.round(B / C * 100);
          S("Abandoned (Init)"), k.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: B,
            label: `${B.toLocaleString()} (${L}%)`
          });
        }
        if (Y > 0) {
          const L = Math.round(Y / C * 100);
          S("Booking not retreived"), k.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: Y,
            label: `${Y.toLocaleString()} (${L}%)`
          });
        }
      } else if (Ct > 0) {
        const L = Math.round(Ct / C * 100);
        S("Abandoned (Init)"), k.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: Ct,
          label: `${Ct.toLocaleString()} (${L}%)`
        });
      }
      if (z) {
        if (W > 0) {
          const L = Math.round(W / C * 100);
          S("Error"), k.push({
            source: "Booking retrive",
            target: "Error",
            value: W,
            label: `${W.toLocaleString()} (${L}%)`
          });
        }
        if (V > 0) {
          const L = Math.round(V / C * 100);
          S("Abandoned (Started)"), k.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: V,
            label: `${V.toLocaleString()} (${L}%)`
          });
        }
        if (H > 0) {
          const L = Math.round(H / C * 100);
          S("Abandoned (Started)"), k.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: H,
            label: `${H.toLocaleString()} (${L}%)`
          });
        }
      } else if (P > 0) {
        const L = Math.round(P / C * 100);
        S("Abandoned (Started)"), k.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: P,
          label: `${P.toLocaleString()} (${L}%)`
        });
      }
      if (at > 0) {
        const L = Math.round(at / C * 100);
        k.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: at,
          label: `${at.toLocaleString()} (${L}%)`
        });
      }
      if (et > 0) {
        const L = Math.round(et / C * 100);
        k.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: et,
          label: `${et.toLocaleString()} (${L}%)`
        });
      }
      if (K > 0) {
        const L = Math.round(K / et * 100);
        k.push({
          source: "Number of Passengers",
          target: "Completed",
          value: K,
          label: `${K.toLocaleString()} (${L}%)`
        });
      }
      if (kt.length > 0 && ut > 0) {
        S("Unrecovered");
        const L = Math.round(ut / et * 100);
        k.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: ut,
          label: `${ut.toLocaleString()} (${L}%)`
        }), kt.forEach((U) => {
          const vt = U.step_name.replace(/_/g, " ").split(" ").map((Dt) => Dt.charAt(0).toUpperCase() + Dt.slice(1)).join(" "), Ht = Math.round(U.count / et * 100);
          S(vt), k.push({
            source: "Unrecovered",
            target: vt,
            value: U.count,
            label: `${U.count.toLocaleString()} (${Ht}%)`
          });
        });
      }
      const Pt = et - (K + ut);
      if (Pt > 0) {
        const L = Math.round(Pt / et * 100);
        S("Abandoned (Flow)"), k.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: Pt,
          label: `${Pt.toLocaleString()} (${L}%)`
        });
      }
      const Wt = K - ht;
      if (Wt > 0) {
        const L = Math.round(Wt / et * 100);
        S("BP Error"), k.push({
          source: "Completed",
          target: "BP Error",
          value: Wt,
          label: `${Wt.toLocaleString()} (${L}%)`
        });
      }
      if (ht > 0) {
        const L = Math.round(ht / et * 100);
        k.push({
          source: "Completed",
          target: "Closed with BP",
          value: ht,
          label: `${ht.toLocaleString()} (${L}%)`
        });
      }
      return { nodes: $, links: k };
    });
    return t({ isDark: i }), ($, k) => (y(), x("article", l0, [
      k[6] || (k[6] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Check-in Metrics"),
          c("p", { class: "card-subtitle" }, "Check-in performance and failure analysis")
        ])
      ], -1)),
      e.loading ? (y(), x("div", c0, [...k[1] || (k[1] = [
        tt('<div class="loading-container" data-v-eefc834b><div class="chart-bars-loader" data-v-eefc834b><div class="bar bar-1" data-v-eefc834b></div><div class="bar bar-2" data-v-eefc834b></div><div class="bar bar-3" data-v-eefc834b></div><div class="bar bar-4" data-v-eefc834b></div><div class="bar bar-5" data-v-eefc834b></div></div><p class="loading-text" data-v-eefc834b>Loading check-in data...</p></div>', 1)
      ])])) : (y(), x("div", d0, [
        b.value.nodes.length > 0 ? (y(), x("div", u0, [
          X(pe, {
            data: b.value,
            height: "500px",
            "node-colors": v.value,
            "use-gradient": !1,
            "node-gap": 30
          }, null, 8, ["data", "node-colors"])
        ])) : E("", !0),
        _.value && _.value.length > 0 ? (y(), x("div", h0, [
          c("div", f0, [
            c("table", g0, [
              k[2] || (k[2] = c("thead", null, [
                c("tr", { class: "table-header-row" }, [
                  c("th", { class: "table-header" }, "Date"),
                  c("th", { class: "table-header" }, "Checkin Init"),
                  c("th", { class: "table-header" }, "Booking Retrieve (%)"),
                  c("th", { class: "table-header" }, "Number of Passengers"),
                  c("th", { class: "table-header" }, "Completed (%)"),
                  c("th", { class: "table-header" }, "Closed with BP (%)"),
                  c("th", { class: "table-header" }, "Failed (%)"),
                  c("th", { class: "table-header" }, "Failed (Reasons)")
                ])
              ], -1)),
              c("tbody", p0, [
                (y(!0), x(q, null, J(m.value, (w) => (y(), x("tr", {
                  key: w.date,
                  class: "table-row"
                }, [
                  c("td", v0, M(l(w.date)), 1),
                  c("td", b0, M(r(w.checkin_initiated_count)), 1),
                  c("td", m0, M(h(w.checkin_init_count, w.checkin_initiated_count)), 1),
                  c("td", y0, M(r(w.checkin_started_count)), 1),
                  c("td", _0, M(h(w.checkin_completed_count, w.checkin_started_count)), 1),
                  c("td", x0, M(h(w.checkin_closed_count, w.checkin_started_count)), 1),
                  c("td", k0, M(h(f(w.failed_steps), w.checkin_started_count)), 1),
                  c("td", w0, [
                    w.failed_steps && w.failed_steps.length > 0 ? (y(), x("div", $0, [
                      (y(!0), x(q, null, J(w.failed_steps, (S) => (y(), x("div", {
                        key: S.step_name,
                        class: "reason-item"
                      }, [
                        c("span", M0, M(d(S.step_name)) + ":", 1),
                        c("span", S0, M(S.failed_count), 1)
                      ]))), 128))
                    ])) : (y(), x("div", C0, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          p.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: k[0] || (k[0] = (w) => g.value = !g.value)
          }, [
            xt(M(g.value ? "View less" : `View more (${_.value.length - la} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: G(["view-more-icon", { "view-more-icon-rotated": g.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...k[3] || (k[3] = [
              c("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : E("", !0),
          e.enableExport ? (y(), ct(T(yt), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("div", D0, [
          c("div", A0, [
            c("div", T0, [
              X(T(It), { class: "empty-icon" })
            ]),
            k[4] || (k[4] = c("p", { class: "empty-title" }, "No check-in data available", -1)),
            k[5] || (k[5] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see check-in metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), L0 = /* @__PURE__ */ nt(B0, [["__scopeId", "data-v-eefc834b"]]), F0 = { class: "checkin-segments-card" }, P0 = {
  key: 0,
  class: "loading-state"
}, E0 = {
  key: 1,
  class: "card-body"
}, R0 = {
  key: 0,
  class: "table-section"
}, I0 = { class: "table-wrapper" }, O0 = { class: "data-table" }, z0 = { class: "table-body" }, V0 = { class: "table-cell font-medium text-center" }, N0 = { class: "airport-badge" }, W0 = { class: "table-cell text-center" }, H0 = {
  key: 0,
  class: "airport-badge connection"
}, j0 = {
  key: 1,
  class: "empty-connection"
}, Y0 = { class: "table-cell text-center" }, q0 = { class: "airport-badge" }, U0 = { class: "table-cell text-center" }, K0 = {
  key: 0,
  class: "trip-badge roundtrip"
}, X0 = {
  key: 1,
  class: "trip-badge oneway"
}, G0 = { class: "table-cell text-center" }, Z0 = { class: "table-cell text-center" }, Q0 = { class: "percentage-value" }, J0 = { class: "table-cell text-center" }, tv = { class: "percentage-value" }, ev = { class: "table-cell text-center" }, sv = { class: "percentage-value success" }, av = {
  key: 1,
  class: "empty-state"
}, ca = 3, nv = /* @__PURE__ */ Z({
  __name: "checkinSegments",
  props: {
    data: { default: () => [] },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, o = (v) => {
      n("export", v);
    }, { isDark: i } = lt(rt(a, "theme")), r = st(!1), l = D(() => r.value ? a.data : a.data.slice(0, ca)), d = D(() => a.data.length > ca), u = (v, g) => !g || g === 0 || !v ? "0%" : `${Math.round(v / g * 100)}%`, h = (v) => !v || v === "None" ? "-" : String(v).trim().replace(/_[0-9]+$/i, ""), f = (v) => {
      const g = h(v?.departure_airport), _ = h(v?.arrival_airport);
      return g === "-" || _ === "-" ? !1 : g === _;
    };
    return t({ isDark: i }), (v, g) => (y(), x("article", F0, [
      g[7] || (g[7] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Checkin Segments"),
          c("p", { class: "card-subtitle" }, "Breakdown by flight segment with connection when applicable")
        ])
      ], -1)),
      a.loading ? (y(), x("div", P0, [...g[1] || (g[1] = [
        tt('<div class="loading-container" data-v-a1ebd82a><div class="chart-flow-loader" data-v-a1ebd82a><div class="flow-line flow-1" data-v-a1ebd82a></div><div class="flow-line flow-2" data-v-a1ebd82a></div><div class="flow-line flow-3" data-v-a1ebd82a></div><div class="flow-line flow-4" data-v-a1ebd82a></div><div class="flow-line flow-5" data-v-a1ebd82a></div></div><p class="loading-text" data-v-a1ebd82a>Loading segment data...</p></div>', 1)
      ])])) : (y(), x("div", E0, [
        a.data.length > 0 ? (y(), x("section", R0, [
          c("div", I0, [
            c("table", O0, [
              g[4] || (g[4] = c("thead", null, [
                c("tr", { class: "table-header-row" }, [
                  c("th", { class: "table-header" }, "Departure"),
                  c("th", { class: "table-header" }, "Connection"),
                  c("th", { class: "table-header" }, "Arrival"),
                  c("th", { class: "table-header" }, "Trip"),
                  c("th", { class: "table-header" }, "Init"),
                  c("th", { class: "table-header" }, "Started (%)"),
                  c("th", { class: "table-header" }, "Completed (%)"),
                  c("th", { class: "table-header" }, "Closed (%)")
                ])
              ], -1)),
              c("tbody", z0, [
                (y(!0), x(q, null, J(l.value, (_, m) => (y(), x("tr", {
                  key: m,
                  class: "table-row"
                }, [
                  c("td", V0, [
                    c("span", N0, M(h(_.departure_airport)), 1)
                  ]),
                  c("td", W0, [
                    h(_.conexion_airport) !== "-" ? (y(), x("span", H0, M(h(_.conexion_airport)), 1)) : (y(), x("span", j0, "-"))
                  ]),
                  c("td", Y0, [
                    c("span", q0, M(h(_.arrival_airport)), 1)
                  ]),
                  c("td", U0, [
                    f(_) ? (y(), x("span", K0, [...g[2] || (g[2] = [
                      c("svg", {
                        class: "trip-icon",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        c("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        })
                      ], -1),
                      xt(" Roundtrip ", -1)
                    ])])) : (y(), x("span", X0, [...g[3] || (g[3] = [
                      c("svg", {
                        class: "trip-icon",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        c("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M14 5l7 7m0 0l-7 7m7-7H3"
                        })
                      ], -1),
                      xt(" One way ", -1)
                    ])]))
                  ]),
                  c("td", G0, M(T(j)(_.segment_init_count)), 1),
                  c("td", Z0, [
                    c("span", Q0, M(u(_.segment_started_count, _.segment_init_count)), 1)
                  ]),
                  c("td", J0, [
                    c("span", tv, M(u(_.segment_completed_count, _.segment_init_count)), 1)
                  ]),
                  c("td", ev, [
                    c("span", sv, M(u(_.segment_closed_count, _.segment_init_count)), 1)
                  ])
                ]))), 128))
              ])
            ])
          ]),
          d.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: g[0] || (g[0] = (_) => r.value = !r.value)
          }, [
            xt(M(r.value ? "View less" : `View more (${a.data.length - ca} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: G(["view-more-icon", { "view-more-icon-rotated": r.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...g[5] || (g[5] = [
              c("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : E("", !0),
          e.enableExport ? (y(), ct(T(yt), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", av, [...g[6] || (g[6] = [
          tt('<div class="empty-state-content" data-v-a1ebd82a><div class="empty-icon-wrapper" data-v-a1ebd82a><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-a1ebd82a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-a1ebd82a></path></svg></div><p class="empty-title" data-v-a1ebd82a>No segment data available</p><p class="empty-description" data-v-a1ebd82a>No flight segment data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), ov = /* @__PURE__ */ nt(nv, [["__scopeId", "data-v-a1ebd82a"]]), iv = { class: "disruption-metrics-card" }, rv = { class: "card-header" }, lv = { class: "header-content" }, cv = {
  key: 0,
  class: "payment-success-badge"
}, dv = {
  key: 0,
  class: "currency-breakdown-list"
}, uv = {
  key: 1,
  class: "badge-value"
}, hv = {
  key: 0,
  class: "loading-state"
}, fv = {
  key: 1,
  class: "card-body"
}, gv = { class: "chart-section" }, pv = { class: "chart-wrapper" }, vv = {
  key: 1,
  class: "empty-chart"
}, bv = {
  key: 0,
  class: "table-section"
}, mv = { class: "table-wrapper" }, yv = { class: "data-table" }, _v = { class: "table-body" }, xv = { class: "table-cell font-medium text-center" }, kv = { class: "table-cell text-center" }, wv = { class: "table-cell text-center" }, $v = { class: "percentage-text" }, Mv = { class: "table-cell text-center" }, Sv = { class: "abandoned-value" }, Cv = { class: "table-cell" }, Dv = { class: "badges-container badges-wrap" }, Av = { class: "badge badge-vol" }, Tv = { class: "badge badge-confirm" }, Bv = { class: "badge badge-not-confirm" }, Lv = { class: "badge badge-reject" }, Fv = { class: "badge badge-not-paid" }, Pv = { class: "badge badge-success" }, Ev = { class: "table-cell" }, Rv = { class: "badges-container badges-wrap" }, Iv = { class: "badge badge-inv" }, Ov = { class: "badge badge-human" }, zv = { class: "badge badge-accept" }, Vv = {
  key: 1,
  class: "empty-state"
}, da = 3, Nv = /* @__PURE__ */ Z({
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
    const s = e, a = t, n = (m) => {
      a("export", m);
    }, o = st(!1), i = D(() => s.data?.disruption_by_day ? [...s.data.disruption_by_day].sort(
      (m, p) => new Date(m.date).getTime() - new Date(p.date).getTime()
    ) : []), r = D(() => o.value ? i.value : i.value.slice(0, da)), l = D(() => i.value.length > da), d = D(() => s.data?.total_payment_success || []), u = (m, p) => !p || p === 0 ? "0%" : `${Math.round(m / p * 100)}%`, h = (m) => dt(m), f = (m) => (m ?? []).reduce((p, b) => p + (b.count ?? 0), 0), v = (m) => typeof m.sell_success_count == "number" ? m.sell_success_count : f(m.payment_success_total), g = D(() => {
      const m = s.data, p = m.total_disruption_conversations || 0, b = m.total_disruption_initiated || 0, $ = m.total_voluntary || 0, k = m.total_involuntary || 0, w = m.total_accepted || 0, S = m.total_confirmed || 0, C = typeof m.total_sell_success == "number" ? m.total_sell_success : f(m.total_payment_success), A = m.total_sell_failed || 0, P = Math.max(0, p - b), R = Math.max(0, b - $ - k), I = Math.max(0, k - w), N = Math.max(0, $ - S), Y = A, B = Math.max(0, S - C - Y), F = (W, V) => {
        const H = V > 0 ? Math.round(W / V * 100) : 0;
        return `${W.toLocaleString()} (${H}%)`;
      }, O = [
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
      ], z = [];
      return b > 0 && z.push({
        source: "Initiated",
        target: "Started",
        value: b,
        label: F(b, p)
      }), P > 0 && z.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: P,
        label: F(P, p)
      }), $ > 0 && z.push({
        source: "Started",
        target: "Voluntary",
        value: $,
        label: F($, p)
      }), k > 0 && z.push({
        source: "Started",
        target: "Involuntary",
        value: k,
        label: F(k, p)
      }), R > 0 && z.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: R,
        label: F(R, p)
      }), w > 0 && z.push({
        source: "Involuntary",
        target: "Accepted",
        value: w,
        label: F(w, p)
      }), I > 0 && z.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: I,
        label: F(I, p)
      }), S > 0 && z.push({
        source: "Voluntary",
        target: "Confirmed",
        value: S,
        label: F(S, p)
      }), N > 0 && z.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: N,
        label: F(N, p)
      }), C > 0 && z.push({
        source: "Confirmed",
        target: "Paid",
        value: C,
        label: F(C, p)
      }), Y > 0 && z.push({
        source: "Confirmed",
        target: "Rejected",
        value: Y,
        label: F(Y, p)
      }), B > 0 && z.push({
        source: "Confirmed",
        target: "Not Paid",
        value: B,
        label: F(B, p)
      }), { nodes: O, links: z };
    }), _ = {
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
    return (m, p) => (y(), x("article", iv, [
      c("header", rv, [
        c("div", lv, [
          p[2] || (p[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Disruption Manager Metrics"),
            c("p", { class: "card-subtitle" }, "Disruption workflow performance and completion tracking")
          ], -1)),
          s.loading ? E("", !0) : (y(), x("div", cv, [
            p[1] || (p[1] = c("p", { class: "badge-label" }, "Payment Success Value", -1)),
            d.value.length > 0 ? (y(), x("div", dv, [
              (y(!0), x(q, null, J(d.value, (b) => (y(), x("p", {
                key: b.currency,
                class: "currency-breakdown-item"
              }, M(b.currency) + " " + M(h(b.total_value)), 1))), 128))
            ])) : (y(), x("p", uv, M(h(0)), 1))
          ]))
        ])
      ]),
      s.loading ? (y(), x("div", hv, [...p[3] || (p[3] = [
        tt('<div class="loading-container" data-v-47c8f691><div class="chart-bars-loader" data-v-47c8f691><div class="bar bar-1" data-v-47c8f691></div><div class="bar bar-2" data-v-47c8f691></div><div class="bar bar-3" data-v-47c8f691></div><div class="bar bar-4" data-v-47c8f691></div><div class="bar bar-5" data-v-47c8f691></div></div><p class="loading-text" data-v-47c8f691>Loading disruption data...</p></div>', 1)
      ])])) : (y(), x("div", fv, [
        c("section", gv, [
          c("div", pv, [
            g.value.nodes.length > 0 && g.value.links.length > 0 ? (y(), ct(pe, {
              key: 0,
              data: g.value,
              "node-colors": _,
              height: "500px"
            }, null, 8, ["data"])) : (y(), x("div", vv, [...p[4] || (p[4] = [
              c("p", { class: "empty-chart-text" }, "No disruption data available for visualization", -1)
            ])]))
          ])
        ]),
        i.value && i.value.length > 0 ? (y(), x("section", bv, [
          p[7] || (p[7] = tt('<div class="section-header" data-v-47c8f691><h4 class="section-title" data-v-47c8f691>Daily Overview</h4></div><div class="legend-container" data-v-47c8f691><p class="legend-title" data-v-47c8f691>Legend</p><div class="legend-items" data-v-47c8f691><div class="legend-group" data-v-47c8f691><span class="legend-label" data-v-47c8f691>Voluntary:</span><span class="badge badge-vol" data-v-47c8f691>VOL</span></div><div class="legend-group" data-v-47c8f691><span class="legend-label" data-v-47c8f691>Involuntary:</span><span class="badge badge-inv" data-v-47c8f691>INV</span></div><div class="legend-note" data-v-47c8f691><span data-v-47c8f691>Vol=Voluntary</span><span data-v-47c8f691>•</span><span data-v-47c8f691>Inv=Involuntary</span></div></div></div>', 2)),
          c("div", mv, [
            c("table", yv, [
              p[5] || (p[5] = c("thead", null, [
                c("tr", { class: "table-header-row" }, [
                  c("th", { class: "table-header" }, "Date"),
                  c("th", { class: "table-header" }, "Initiated"),
                  c("th", { class: "table-header" }, "Started"),
                  c("th", { class: "table-header" }, "Abandoned (%)"),
                  c("th", { class: "table-header" }, "Voluntary"),
                  c("th", { class: "table-header" }, "Involuntary")
                ])
              ], -1)),
              c("tbody", _v, [
                (y(!0), x(q, null, J(r.value, (b) => (y(), x("tr", {
                  key: b.date,
                  class: "table-row"
                }, [
                  c("td", xv, M(T(Tt)(b.date).format("DD/MM")), 1),
                  c("td", kv, M(T(j)(b.disruption_conversations)), 1),
                  c("td", wv, [
                    xt(M(T(j)(b.disruption_initiated_count)) + " ", 1),
                    c("span", $v, " (" + M(u(b.disruption_initiated_count, b.disruption_conversations)) + ") ", 1)
                  ]),
                  c("td", Mv, [
                    c("span", Sv, M(T(j)(b.disruption_initiated_count - b.voluntary_count - b.involuntary_count)) + " (" + M(u(b.disruption_initiated_count - b.voluntary_count - b.involuntary_count, b.disruption_conversations)) + ") ", 1)
                  ]),
                  c("td", Cv, [
                    c("div", Dv, [
                      c("span", Av, " VOL " + M(T(j)(b.voluntary_count)) + " (" + M(u(b.voluntary_count, b.disruption_conversations)) + ") ", 1),
                      c("span", Tv, " Confirm " + M(T(j)(b.confirmed_count)) + " (" + M(u(b.confirmed_count, b.disruption_conversations)) + ") ", 1),
                      c("span", Bv, " Not Confirm " + M(T(j)(b.voluntary_count - b.confirmed_count)) + " (" + M(u(b.voluntary_count - b.confirmed_count, b.disruption_conversations)) + ") ", 1),
                      c("span", Lv, " Reject " + M(T(j)(b.sell_failed_count)) + " (" + M(u(b.sell_failed_count, b.disruption_conversations)) + ") ", 1),
                      c("span", Fv, " Not Paid " + M(T(j)(Math.max(0, b.confirmed_count - v(b) - b.sell_failed_count))) + " (" + M(u(Math.max(0, b.confirmed_count - v(b) - b.sell_failed_count), b.disruption_conversations)) + ") ", 1),
                      c("span", Pv, " Finish " + M(T(j)(v(b))) + " (" + M(u(v(b), b.disruption_conversations)) + ") ", 1),
                      (y(!0), x(q, null, J(b.payment_success_total || [], ($) => (y(), x("span", {
                        key: `${b.date}-${$.currency}`,
                        class: "badge badge-currency"
                      }, M($.currency) + " " + M(h($.total_value)), 1))), 128))
                    ])
                  ]),
                  c("td", Ev, [
                    c("div", Rv, [
                      c("span", Iv, " INV " + M(T(j)(b.involuntary_count)) + " (" + M(u(b.involuntary_count, b.disruption_conversations)) + ") ", 1),
                      c("span", Ov, " Human " + M(T(j)(b.involuntary_count - b.accepted_count)) + " (" + M(u(b.involuntary_count - b.accepted_count, b.disruption_conversations)) + ") ", 1),
                      c("span", zv, " Accept " + M(T(j)(b.accepted_count)) + " (" + M(u(b.accepted_count, b.disruption_conversations)) + ") ", 1)
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          l.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: p[0] || (p[0] = (b) => o.value = !o.value)
          }, [
            xt(M(o.value ? "View less" : `View more (${i.value.length - da} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: G(["view-more-icon", { "view-more-icon-rotated": o.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...p[6] || (p[6] = [
              c("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : E("", !0),
          e.enableExport ? (y(), ct(T(yt), {
            key: 1,
            onExport: n,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", Vv, [...p[8] || (p[8] = [
          tt('<div class="empty-state-content" data-v-47c8f691><div class="empty-icon-wrapper" data-v-47c8f691><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-47c8f691><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" data-v-47c8f691></path></svg></div><p class="empty-title" data-v-47c8f691>No disruption data available</p><p class="empty-description" data-v-47c8f691>No disruption data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Wv = /* @__PURE__ */ nt(Nv, [["__scopeId", "data-v-47c8f691"]]), Hv = { class: "faq-metrics-card" }, jv = {
  key: 0,
  class: "card-body"
}, Yv = { class: "kpi-grid" }, qv = { class: "kpi-card" }, Uv = { class: "kpi-value" }, Kv = { class: "kpi-card" }, Xv = { class: "kpi-value" }, Gv = { class: "kpi-card kpi-card--airline" }, Zv = { class: "kpi-value" }, Qv = { class: "kpi-card kpi-card--booking" }, Jv = { class: "kpi-value" }, tb = { class: "kpi-card kpi-card--flight" }, eb = { class: "kpi-value" }, sb = {
  key: 0,
  class: "chart-section"
}, ab = {
  key: 1,
  class: "empty-state"
}, nb = {
  key: 1,
  class: "loading-state"
}, ob = /* @__PURE__ */ Z({
  __name: "FAQ",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, o = (f) => {
      n("export", f);
    }, { isDark: i, colors: r } = lt(rt(a, "theme")), l = st({ labels: [], datasets: [] }), d = D(() => a.data ?? {
      total_faq_events: 0,
      total_documents_found: 0,
      total_airline_information_retrieved: 0,
      total_booking_info_retrieved: 0,
      total_flight_status_retrieved: 0,
      faq_by_day: []
    }), u = D(() => ({
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: {
          display: !0,
          position: "top",
          labels: {
            usePointStyle: !0,
            padding: 20,
            font: {
              family: "'DM Sans', sans-serif",
              size: 12
            },
            color: r.value.textSecondary
          }
        },
        tooltip: {
          mode: "index",
          intersect: !1,
          backgroundColor: r.value.tooltipBg,
          titleColor: r.value.tooltipText,
          bodyColor: r.value.textSecondary,
          borderColor: i.value ? "rgba(198, 125, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: {
            family: "'Space Grotesk', sans-serif",
            size: 14,
            weight: 600
          },
          bodyFont: {
            family: "'DM Sans', sans-serif",
            size: 13
          }
        }
      },
      scales: {
        x: {
          display: !0,
          grid: {
            color: r.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
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
          grid: {
            color: r.value.gridLines
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 11
            },
            color: r.value.textSecondary
          }
        }
      },
      interaction: {
        mode: "nearest",
        axis: "x",
        intersect: !1
      }
    })), h = (f) => {
      if (!f) {
        l.value = { labels: [], datasets: [] };
        return;
      }
      const v = f.faq_by_day || [];
      if (v.length > 0) {
        const g = v.map((b) => Tt(b.date).format("MMM DD")), _ = v.map((b) => b.airline_information_retrieved_count || 0), m = v.map((b) => b.flight_status_retrieved_count || 0), p = v.map((b) => b.booking_info_retrieved_count || 0);
        l.value = {
          labels: g,
          datasets: [
            {
              label: "Airline Information",
              data: _,
              borderColor: "#8b5cf6",
              backgroundColor: "rgba(139, 92, 246, 0.1)",
              borderWidth: 2,
              fill: !0,
              tension: 0.4,
              pointBackgroundColor: "#8b5cf6",
              pointBorderColor: "#7c3aed",
              pointBorderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 6
            },
            {
              label: "Flight Status",
              data: m,
              borderColor: "#06b6d4",
              backgroundColor: "rgba(6, 182, 212, 0.1)",
              borderWidth: 2,
              fill: !0,
              tension: 0.4,
              pointBackgroundColor: "#06b6d4",
              pointBorderColor: "#0891b2",
              pointBorderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 6
            },
            {
              label: "Booking Information",
              data: p,
              borderColor: "#f59e0b",
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              borderWidth: 2,
              fill: !0,
              tension: 0.4,
              pointBackgroundColor: "#f59e0b",
              pointBorderColor: "#d97706",
              pointBorderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 6
            }
          ]
        };
      } else
        l.value = { labels: [], datasets: [] };
    };
    return Vt(
      () => a.data,
      (f) => {
        h(f ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: i }), (f, v) => (y(), x("article", Hv, [
      v[7] || (v[7] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "FAQ Metrics"),
          c("p", { class: "card-subtitle" }, "Daily FAQ consultation and retrieval metrics")
        ])
      ], -1)),
      a.loading ? (y(), x("div", nb, [...v[6] || (v[6] = [
        tt('<div class="loading-container" data-v-5d2c3c33><div class="chart-bars-loader" data-v-5d2c3c33><div class="bar bar-1" data-v-5d2c3c33></div><div class="bar bar-2" data-v-5d2c3c33></div><div class="bar bar-3" data-v-5d2c3c33></div><div class="bar bar-4" data-v-5d2c3c33></div><div class="bar bar-5" data-v-5d2c3c33></div></div><p class="loading-text" data-v-5d2c3c33>Loading FAQ metrics...</p></div>', 1)
      ])])) : (y(), x("div", jv, [
        c("div", Yv, [
          c("div", qv, [
            v[0] || (v[0] = c("span", { class: "kpi-label" }, "Total FAQ", -1)),
            c("span", Uv, M(T(j)(d.value.total_faq_events)), 1)
          ]),
          c("div", Kv, [
            v[1] || (v[1] = c("span", { class: "kpi-label" }, "Documents Found", -1)),
            c("span", Xv, M(T(j)(d.value.total_documents_found)), 1)
          ]),
          c("div", Gv, [
            v[2] || (v[2] = c("div", { class: "kpi-label-row" }, [
              c("span", {
                class: "kpi-color-dot",
                "aria-hidden": "true"
              }),
              c("span", { class: "kpi-label" }, "Airline Info")
            ], -1)),
            c("span", Zv, M(T(j)(d.value.total_airline_information_retrieved)), 1)
          ]),
          c("div", Qv, [
            v[3] || (v[3] = c("div", { class: "kpi-label-row" }, [
              c("span", {
                class: "kpi-color-dot",
                "aria-hidden": "true"
              }),
              c("span", { class: "kpi-label" }, "Booking Info")
            ], -1)),
            c("span", Jv, M(T(j)(d.value.total_booking_info_retrieved)), 1)
          ]),
          c("div", tb, [
            v[4] || (v[4] = c("div", { class: "kpi-label-row" }, [
              c("span", {
                class: "kpi-color-dot",
                "aria-hidden": "true"
              }),
              c("span", { class: "kpi-label" }, "Flight Status")
            ], -1)),
            c("span", eb, M(T(j)(d.value.total_flight_status_retrieved)), 1)
          ])
        ]),
        l.value.labels && l.value.labels.length ? (y(), x("section", sb, [
          X(ge, {
            data: l.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ct(T(yt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", ab, [...v[5] || (v[5] = [
          tt('<div class="empty-state-content" data-v-5d2c3c33><div class="empty-icon-wrapper" data-v-5d2c3c33><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-5d2c3c33><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-5d2c3c33></path></svg></div><p class="empty-title" data-v-5d2c3c33>No FAQ data available</p><p class="empty-description" data-v-5d2c3c33>No FAQ consultation data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), ib = /* @__PURE__ */ nt(ob, [["__scopeId", "data-v-5d2c3c33"]]), rb = { class: "messages-per-agent-card" }, lb = {
  key: 0,
  class: "card-body"
}, cb = {
  key: 0,
  class: "chart-section"
}, db = {
  key: 1,
  class: "empty-state"
}, ub = { class: "empty-state-content" }, hb = { class: "empty-icon-wrapper" }, fb = {
  key: 1,
  class: "loading-state"
}, gb = /* @__PURE__ */ Z({
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
  setup(e, { expose: t, emit: s }) {
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
    }, n = e, o = s, i = (h) => {
      o("export", h);
    }, { isDark: r, colors: l } = lt(rt(n, "theme")), d = D(() => {
      const h = n.data?.agents_by_day || {}, f = Object.keys(h).sort();
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const v = /* @__PURE__ */ new Set();
      for (const m of Object.values(h))
        for (const p of Object.keys(m))
          v.add(p);
      const _ = Array.from(v).map((m) => {
        const p = a[m] || "#94a3b8";
        return {
          label: m.charAt(0).toUpperCase() + m.slice(1).replace(/_/g, " "),
          data: f.map((b) => h[b]?.[m] || 0),
          borderColor: p,
          backgroundColor: `${p}20`,
          pointBackgroundColor: p,
          pointBorderColor: r.value ? "#1a1a1d" : "#ffffff",
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
          tension: 0.3,
          fill: !1
        };
      });
      return {
        labels: f,
        datasets: _
      };
    }), u = D(() => n.options ? n.options : {
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: {
          display: !0,
          position: "top",
          align: "end",
          labels: {
            usePointStyle: !0,
            pointStyle: "circle",
            padding: 20,
            font: {
              family: "'DM Sans', sans-serif",
              size: 12,
              weight: 500
            },
            color: l.value.textSecondary
          }
        },
        tooltip: {
          mode: "index",
          intersect: !1,
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
          }
        }
      },
      scales: {
        x: {
          display: !0,
          grid: {
            color: l.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 11
            },
            color: l.value.textSecondary
          }
        },
        y: {
          display: !0,
          beginAtZero: !0,
          grid: {
            color: l.value.gridLines
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 11
            },
            color: l.value.textSecondary
          }
        }
      }
    });
    return t({ isDark: r }), (h, f) => (y(), x("article", rb, [
      f[3] || (f[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Messages per Agent"),
          c("p", { class: "card-subtitle" }, "Agent interaction trends over time")
        ])
      ], -1)),
      e.loading ? (y(), x("div", fb, [...f[2] || (f[2] = [
        tt('<div class="loading-container" data-v-b9368fc2><div class="chart-lines-loader" data-v-b9368fc2><div class="line line-1" data-v-b9368fc2></div><div class="line line-2" data-v-b9368fc2></div><div class="line line-3" data-v-b9368fc2></div><div class="line line-4" data-v-b9368fc2></div><div class="line line-5" data-v-b9368fc2></div></div><p class="loading-text" data-v-b9368fc2>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", lb, [
        d.value.labels && d.value.labels.length ? (y(), x("section", cb, [
          X(ge, {
            data: d.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ct(T(yt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", db, [
          c("div", ub, [
            c("div", hb, [
              X(T(It), { class: "empty-icon" })
            ]),
            f[0] || (f[0] = c("p", { class: "empty-title" }, "No agent interactions data", -1)),
            f[1] || (f[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), pb = /* @__PURE__ */ nt(gb, [["__scopeId", "data-v-b9368fc2"]]), vb = { class: "record-locator-card" }, bb = {
  key: 0,
  class: "loading-state"
}, mb = {
  key: 1,
  class: "card-body"
}, yb = {
  key: 0,
  class: "chart-section"
}, _b = { class: "chart-wrapper" }, xb = {
  key: 1,
  class: "table-section"
}, kb = { class: "table-wrapper" }, wb = { class: "data-table" }, $b = { class: "table-header-row" }, Mb = {
  key: 0,
  class: "table-header"
}, Sb = {
  key: 1,
  class: "table-header"
}, Cb = { class: "table-body" }, Db = { class: "table-cell font-medium" }, Ab = { class: "table-cell text-center" }, Tb = { class: "table-cell text-center" }, Bb = { class: "table-cell text-center" }, Lb = { class: "table-cell text-center" }, Fb = { class: "table-cell text-center success-value" }, Pb = { class: "table-cell text-center failed-value" }, Eb = { class: "table-cell text-center warning-value" }, Rb = {
  key: 0,
  class: "table-cell text-center"
}, Ib = {
  key: 1,
  class: "table-cell text-center failed-value"
}, Ob = {
  key: 2,
  class: "empty-state"
}, ua = 3, zb = /* @__PURE__ */ Z({
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
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, o = (m) => {
      n("export", m);
    }, { isDark: i } = lt(rt(a, "theme")), r = st(!1), l = D(() => a.data?.record_locator_by_day ? [...a.data.record_locator_by_day].sort(
      (m, p) => new Date(m.date).getTime() - new Date(p.date).getTime()
    ) : []), d = D(() => r.value ? l.value : l.value.slice(0, ua)), u = D(() => l.value.length > ua), h = D(() => a.data), f = D(() => ({
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
    })), v = (m, p) => !p || p === 0 ? "0%" : `${Math.round(m / p * 100)}%`, g = (m, p) => {
      const b = j(m), $ = v(m, p);
      return `${b} (${$})`;
    }, _ = D(() => {
      const m = [], p = [], b = /* @__PURE__ */ new Set(), $ = (K) => {
        b.has(K) || (m.push({ name: K }), b.add(K));
      };
      if (!h.value.total_checkin_initiated)
        return { nodes: m, links: p };
      $("Checkin Init"), $("Booking retrive"), $("Checkin Started"), $("Checkin Completed"), $("Checkin Closed");
      const k = h.value.total_checkin_initiated, w = h.value.total_record_locator_init, S = h.value.total_record_locator_started, C = h.value.total_record_locator_completed, A = h.value.total_record_locator_closed, P = h.value.total_record_locator_failed, R = h.value.total_record_locator_abandoned, I = h.value.total_record_locator_init_abandoned, N = h.value.total_checkin_pre_init_abandoned_error, Y = h.value.total_checkin_pre_init_abandoned_voluntary, B = N != null || Y != null, F = B ? Math.max(Number(N) || 0, 0) : 0, O = B ? Math.max(Number(Y) || 0, 0) : 0, z = h.value.total_record_locator_init_abandoned_error, W = h.value.total_record_locator_init_abandoned_voluntary, V = z != null || W != null, H = V ? Math.max(Number(z) || 0, 0) : 0, at = V ? Math.max(Number(W) || 0, 0) : 0;
      if (w > 0) {
        const K = Math.round(w / k * 100);
        p.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: w,
          label: `${w.toLocaleString()} (${K}%)`
        });
      }
      const et = k - w;
      if (B) {
        if (O > 0) {
          const K = Math.round(O / k * 100);
          $("Abandoned (Init)"), p.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: O,
            label: `${O.toLocaleString()} (${K}%)`
          });
        }
        if (F > 0) {
          const K = Math.round(F / k * 100);
          $("Booking not retreived"), p.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: F,
            label: `${F.toLocaleString()} (${K}%)`
          });
        }
      } else if (et > 0) {
        const K = Math.round(et / k * 100);
        $("Abandoned (Init)"), p.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: et,
          label: `${et.toLocaleString()} (${K}%)`
        });
      }
      if (S > 0) {
        const K = Math.round(S / k * 100);
        p.push({
          source: "Booking retrive",
          target: "Checkin Started",
          value: S,
          label: `${S.toLocaleString()} (${K}%)`
        });
      }
      if (V) {
        if (H > 0) {
          const K = Math.round(H / k * 100);
          $("Error"), p.push({
            source: "Booking retrive",
            target: "Error",
            value: H,
            label: `${H.toLocaleString()} (${K}%)`
          });
        }
        if (at > 0) {
          const K = Math.round(at / k * 100);
          $("Abandoned (Started)"), p.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: at,
            label: `${at.toLocaleString()} (${K}%)`
          });
        }
      } else if (I > 0) {
        const K = Math.round(I / k * 100);
        $("Abandoned (Started)"), p.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: I,
          label: `${I.toLocaleString()} (${K}%)`
        });
      }
      if (C > 0) {
        const K = Math.round(C / S * 100);
        p.push({
          source: "Checkin Started",
          target: "Checkin Completed",
          value: C,
          label: `${C.toLocaleString()} (${K}%)`
        });
      }
      if (A > 0) {
        const K = Math.round(A / S * 100);
        p.push({
          source: "Checkin Completed",
          target: "Checkin Closed",
          value: A,
          label: `${A.toLocaleString()} (${K}%)`
        });
      }
      if (P > 0) {
        const K = Math.round(P / S * 100);
        $("Checkin Failed"), p.push({
          source: "Checkin Started",
          target: "Checkin Failed",
          value: P,
          label: `${P.toLocaleString()} (${K}%)`
        });
      }
      if (R > 0) {
        const K = Math.round(R / S * 100);
        $("Abandoned (Flow)"), p.push({
          source: "Checkin Started",
          target: "Abandoned (Flow)",
          value: R,
          label: `${R.toLocaleString()} (${K}%)`
        });
      }
      return { nodes: m, links: p };
    });
    return t({ isDark: i }), (m, p) => (y(), x("article", vb, [
      p[12] || (p[12] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Checkin by Record Locator Metrics"),
          c("p", { class: "card-subtitle" }, "Checkin by record locator retrieval and completion analysis")
        ])
      ], -1)),
      a.loading ? (y(), x("div", bb, [...p[1] || (p[1] = [
        tt('<div class="loading-container" data-v-e48cea55><div class="chart-flow-loader" data-v-e48cea55><div class="flow-line flow-1" data-v-e48cea55></div><div class="flow-line flow-2" data-v-e48cea55></div><div class="flow-line flow-3" data-v-e48cea55></div><div class="flow-line flow-4" data-v-e48cea55></div><div class="flow-line flow-5" data-v-e48cea55></div></div><p class="loading-text" data-v-e48cea55>Loading record locator data...</p></div>', 1)
      ])])) : (y(), x("div", mb, [
        _.value.nodes.length > 0 ? (y(), x("section", yb, [
          c("div", _b, [
            X(pe, {
              data: _.value,
              height: "500px",
              "node-colors": f.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : E("", !0),
        l.value && l.value.length > 0 ? (y(), x("section", xb, [
          c("div", kb, [
            c("table", wb, [
              c("thead", null, [
                c("tr", $b, [
                  p[2] || (p[2] = c("th", { class: "table-header" }, "Date", -1)),
                  p[3] || (p[3] = c("th", { class: "table-header" }, "Checkin Init", -1)),
                  p[4] || (p[4] = c("th", { class: "table-header" }, "Booking Retrieve (%)", -1)),
                  p[5] || (p[5] = c("th", { class: "table-header" }, "Checkin Started", -1)),
                  p[6] || (p[6] = c("th", { class: "table-header" }, "Checkin Completed (%)", -1)),
                  p[7] || (p[7] = c("th", { class: "table-header" }, "Checkin Closed (%)", -1)),
                  p[8] || (p[8] = c("th", { class: "table-header" }, "Checkin Failed (%)", -1)),
                  p[9] || (p[9] = c("th", { class: "table-header" }, "Abandoned (%)", -1)),
                  a.isAvianca ? (y(), x("th", Mb, "Create Payment")) : E("", !0),
                  a.isAvianca ? (y(), x("th", Sb, "Failed Payment")) : E("", !0)
                ])
              ]),
              c("tbody", Cb, [
                (y(!0), x(q, null, J(d.value, (b) => (y(), x("tr", {
                  key: b.date,
                  class: "table-row"
                }, [
                  c("td", Db, M(T(Tt)(b.date).format("DD/MM/YYYY")), 1),
                  c("td", Ab, M(T(j)(b.checkin_initiated)), 1),
                  c("td", Tb, M(g(b.record_locator_init_count, b.checkin_initiated)), 1),
                  c("td", Bb, M(T(j)(b.record_locator_started_count)), 1),
                  c("td", Lb, M(g(b.record_locator_completed_count, b.record_locator_started_count)), 1),
                  c("td", Fb, M(g(b.record_locator_closed_count, b.record_locator_started_count)), 1),
                  c("td", Pb, M(g(b.record_locator_failed_count, b.record_locator_started_count)), 1),
                  c("td", Eb, M(g(b.record_locator_abandoned_count, b.record_locator_started_count)), 1),
                  a.isAvianca ? (y(), x("td", Rb, M(T(j)(b.record_locator_create_payment_count)), 1)) : E("", !0),
                  a.isAvianca ? (y(), x("td", Ib, M(T(j)(b.record_locator_create_payment_failed_count)), 1)) : E("", !0)
                ]))), 128))
              ])
            ])
          ]),
          u.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: p[0] || (p[0] = (b) => r.value = !r.value)
          }, [
            xt(M(r.value ? "View less" : `View more (${l.value.length - ua} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: G(["view-more-icon", { "view-more-icon-rotated": r.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...p[10] || (p[10] = [
              c("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : E("", !0),
          e.enableExport ? (y(), ct(T(yt), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", Ob, [...p[11] || (p[11] = [
          tt('<div class="empty-state-content" data-v-e48cea55><div class="empty-icon-wrapper" data-v-e48cea55><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e48cea55><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" data-v-e48cea55></path></svg></div><p class="empty-title" data-v-e48cea55>No record locator data available</p><p class="empty-description" data-v-e48cea55>No record locator data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Vb = /* @__PURE__ */ nt(zb, [["__scopeId", "data-v-e48cea55"]]), Nb = { class: "sales-channel-card" }, Wb = {
  key: 0,
  class: "loading-state"
}, Hb = {
  key: 1,
  class: "card-body"
}, jb = {
  key: 0,
  class: "chart-section"
}, Yb = { class: "chart-wrapper" }, qb = {
  key: 1,
  class: "empty-state"
}, Ub = {
  key: 2,
  class: "comparison-section"
}, Kb = { class: "comparison-grid" }, Xb = { class: "comparison-content" }, Gb = { class: "comparison-channel" }, Zb = { class: "comparison-value" }, Qb = {
  key: 0,
  class: "comparison-delta"
}, Jb = {
  key: 0,
  class: "delta-icon",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, tm = {
  key: 1,
  class: "delta-icon",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, em = { class: "delta-label" }, sm = {
  key: 1,
  class: "comparison-delta"
}, am = /* @__PURE__ */ Z({
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
    channelComparison: { default: () => [] }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: s }) {
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
    }, n = ["#B0C4DE", "#C9A0F2", "#F5C26B", "#8BE8B0", "#F2A07A", "#7BA3E8"], o = e, i = s, r = (f) => {
      i("export", f);
    }, { isDark: l } = lt(rt(o, "theme"));
    D(() => o.data?.total_sell_success ?? 0);
    const d = D(() => {
      const f = /* @__PURE__ */ new Set();
      for (const v of o.data?.sales_by_channel_by_day ?? [])
        for (const g of Object.keys(v.channels))
          f.add(g);
      return Array.from(f).sort();
    }), u = (f, v) => a[f.toLowerCase()] ?? n[v % n.length], h = D(() => {
      const f = o.data?.sales_by_channel_by_day ?? [];
      if (f.length === 0) return { labels: [], datasets: [] };
      const v = f.map((_) => Tt(_.date).format("MMM-DD")), g = d.value.map((_, m) => ({
        label: _,
        data: f.map((p) => p.channels[_] ?? 0),
        backgroundColor: u(_, m),
        borderRadius: 4
      }));
      return { labels: v, datasets: g };
    });
    return t({ isDark: l }), (f, v) => (y(), x("article", Nb, [
      v[5] || (v[5] = tt('<header class="card-header" data-v-8b96a431><div class="header-content" data-v-8b96a431><div class="title-section" data-v-8b96a431><h3 class="card-title" data-v-8b96a431>Sales by Channel</h3><p class="card-subtitle" data-v-8b96a431>Successful sales breakdown by communication channel</p></div></div></header>', 1)),
      o.loading ? (y(), x("div", Wb, [...v[0] || (v[0] = [
        tt('<div class="loading-container" data-v-8b96a431><div class="chart-bars-loader" data-v-8b96a431><div class="bar bar-1" data-v-8b96a431></div><div class="bar bar-2" data-v-8b96a431></div><div class="bar bar-3" data-v-8b96a431></div><div class="bar bar-4" data-v-8b96a431></div><div class="bar bar-5" data-v-8b96a431></div></div><p class="loading-text" data-v-8b96a431>Loading sales data...</p></div>', 1)
      ])])) : (y(), x("div", Hb, [
        h.value.labels.length > 0 ? (y(), x("section", jb, [
          c("div", Yb, [
            X(ne, {
              data: h.value,
              stacked: !0
            }, null, 8, ["data"])
          ]),
          e.enableExport ? (y(), ct(T(yt), {
            key: 0,
            onExport: r,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", qb, [...v[1] || (v[1] = [
          tt('<div class="empty-state-content" data-v-8b96a431><div class="empty-icon-wrapper" data-v-8b96a431><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-8b96a431><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-8b96a431></path></svg></div><p class="empty-title" data-v-8b96a431>No sales data available</p><p class="empty-description" data-v-8b96a431>No sales by channel data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])])),
        e.channelComparison.length > 0 ? (y(), x("section", Ub, [
          c("div", Kb, [
            (y(!0), x(q, null, J(e.channelComparison, (g) => (y(), x("div", {
              key: g.channel,
              class: "comparison-card"
            }, [
              c("div", {
                class: "comparison-color-bar",
                style: _t({ backgroundColor: u(g.channel, e.channelComparison.indexOf(g)) })
              }, null, 4),
              c("div", Xb, [
                c("span", Gb, M(g.channel), 1),
                c("span", Zb, M(T(j)(g.current)), 1),
                g.delta !== null ? (y(), x("div", Qb, [
                  c("span", {
                    class: G(["delta-badge", g.delta > 0 ? "delta-up" : g.delta < 0 ? "delta-down" : "delta-neutral"])
                  }, [
                    g.delta > 0 ? (y(), x("svg", Jb, [...v[2] || (v[2] = [
                      c("path", {
                        "fill-rule": "evenodd",
                        d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
                        "clip-rule": "evenodd"
                      }, null, -1)
                    ])])) : g.delta < 0 ? (y(), x("svg", tm, [...v[3] || (v[3] = [
                      c("path", {
                        "fill-rule": "evenodd",
                        d: "M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z",
                        "clip-rule": "evenodd"
                      }, null, -1)
                    ])])) : E("", !0),
                    xt(" " + M(Math.abs(g.delta).toFixed(1)) + "% ", 1)
                  ], 2),
                  c("span", em, "vs prev. period (" + M(T(j)(g.previous)) + ")", 1)
                ])) : (y(), x("div", sm, [...v[4] || (v[4] = [
                  c("span", { class: "delta-label" }, "No previous data", -1)
                ])]))
              ])
            ]))), 128))
          ])
        ])) : E("", !0)
      ]))
    ]));
  }
}), nm = /* @__PURE__ */ nt(am, [["__scopeId", "data-v-8b96a431"]]), om = { class: "seller-metrics-card" }, im = { class: "card-header" }, rm = { class: "header-content" }, lm = {
  key: 0,
  class: "payment-success-badge"
}, cm = {
  key: 0,
  class: "currency-breakdown-list"
}, dm = {
  key: 1,
  class: "badge-value"
}, um = {
  key: 0,
  class: "loading-state"
}, hm = {
  key: 1,
  class: "card-body"
}, fm = {
  key: 0,
  class: "chart-section"
}, gm = { class: "chart-wrapper" }, pm = {
  key: 1,
  class: "empty-state"
}, vm = {
  key: 2,
  class: "table-section"
}, bm = { class: "table-wrapper" }, mm = { class: "data-table" }, ym = { class: "table-body" }, _m = { class: "table-cell font-medium" }, xm = { class: "table-cell text-center" }, km = { class: "table-cell text-center" }, wm = { class: "table-cell text-center" }, $m = { class: "table-cell text-center" }, Mm = { class: "table-cell text-center" }, Sm = { class: "table-cell text-center success-value" }, Cm = {
  key: 0,
  class: "currency-cell-list"
}, Dm = { key: 1 }, Am = { class: "table-cell text-left" }, Tm = {
  key: 0,
  class: "failed-reasons"
}, Bm = { class: "reason-name" }, Lm = { class: "reason-count" }, Fm = {
  key: 1,
  class: "empty-cell"
}, ha = 3, Pm = /* @__PURE__ */ Z({
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
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, o = (w) => {
      n("export", w);
    }, { isDark: i } = lt(rt(a, "theme")), r = st(!1), l = D(() => {
      if (!a.sellerData?.seller_by_day) return [];
      const w = [...a.sellerData.seller_by_day];
      return a.failedData?.failed_by_reason_by_day && a.failedData.failed_by_reason_by_day.forEach((S) => {
        const C = w.findIndex((A) => A.date === S.date);
        C !== -1 ? w[C] = { ...w[C], reasons: S.reasons } : w.push({
          date: S.date,
          seller_conversations: 0,
          sell_started_count: 0,
          sell_get_quote_count: 0,
          sell_booking_created_count: 0,
          sell_success_count: 0,
          daily_value_sell_success: 0,
          reasons: S.reasons
        });
      }), w.sort((S, C) => new Date(S.date).getTime() - new Date(C.date).getTime());
    }), d = D(() => r.value ? l.value : l.value.slice(0, ha)), u = D(() => l.value.length > ha), h = D(() => a.sellerData), f = D(() => a.failedData), v = D(
      () => Array.isArray(a.sellerData.total_value_sell_success) ? a.sellerData.total_value_sell_success : []
    ), g = D(() => {
      const {
        total_seller_conversations: w = 0,
        total_sell_started: S = 0,
        total_sell_booking_created: C = 0,
        total_sell_success: A = 0
      } = h.value, { failed_by_reason_by_day: P = [] } = f.value;
      if (w === 0) return { nodes: [], links: [] };
      const R = [
        { name: "Sell Initiated", value: w },
        { name: "Sell Started", value: S },
        { name: "Booking Created", value: C },
        { name: "Sell Success", value: A }
      ], I = [], N = w - S;
      if (N > 0) {
        const O = Math.round(N / w * 100);
        R.push({ name: "Abandoned (Init)", value: N }), I.push({
          source: "Sell Initiated",
          target: "Abandoned (Init)",
          value: N,
          label: `${N.toLocaleString()} (${O}%)`
        });
      }
      if (S > 0) {
        const O = Math.round(S / w * 100);
        I.push({
          source: "Sell Initiated",
          target: "Sell Started",
          value: S,
          label: `${S.toLocaleString()} (${O}%)`
        });
      }
      const Y = P.reduce((O, z) => (z.reasons && Array.isArray(z.reasons) && z.reasons.forEach((W) => {
        const V = W.reason, H = W.failed_count;
        O[V] = (O[V] || 0) + H;
      }), O), {});
      if (C > 0) {
        const O = Math.round(C / w * 100);
        I.push({
          source: "Sell Started",
          target: "Booking Created",
          value: C,
          label: `${C.toLocaleString()} (${O}%)`
        });
      }
      if (A > 0) {
        const O = Math.round(A / w * 100);
        I.push({
          source: "Booking Created",
          target: "Sell Success",
          value: A,
          label: `${A.toLocaleString()} (${O}%)`
        });
      }
      const B = S - C;
      if (B > 0) {
        const O = Math.round(B / w * 100);
        R.push({ name: "Failed at Booking", value: B }), I.push({
          source: "Sell Started",
          target: "Failed at Booking",
          value: B,
          label: `${B.toLocaleString()} (${O}%)`
        });
      }
      if (Object.keys(Y).length > 0) {
        const O = Object.values(Y).reduce((W, V) => W + V, 0), z = B - O;
        if (Object.entries(Y).filter(([, W]) => W > 0).sort(([, W], [, V]) => V - W).forEach(([W, V]) => {
          const H = Math.round(V / w * 100);
          R.push({ name: `Failed: ${W}`, value: V }), I.push({
            source: "Failed at Booking",
            target: `Failed: ${W}`,
            value: V,
            label: `${V.toLocaleString()} (${H}%)`
          });
        }), z > 0) {
          const W = Math.round(z / w * 100);
          R.push({ name: "Failed: Without Reason", value: z }), I.push({
            source: "Failed at Booking",
            target: "Failed: Without Reason",
            value: z,
            label: `${z.toLocaleString()} (${W}%)`
          });
        }
      }
      const F = C - A;
      if (F > 0) {
        const O = Math.round(F / w * 100);
        R.push({ name: "Failed at Completion", value: F }), I.push({
          source: "Booking Created",
          target: "Failed at Completion",
          value: F,
          label: `${F.toLocaleString()} (${O}%)`
        });
      }
      return { nodes: R, links: I };
    }), _ = {
      "Sell Initiated": "#DBEAFE",
      "Abandoned (Init)": "#FEE2E2",
      "Sell Started": "#93C5FD",
      "Get Quote": "#C7D2FE",
      "Booking Created": "#8B8CF6",
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
    }, m = D(() => _), p = (w, S) => !S || S === 0 ? "0%" : `${Math.round(w / S * 100)}%`, b = (w, S) => {
      const C = j(w), A = p(w, S);
      return `${C} (${A})`;
    }, $ = (w) => w == null ? 0 : typeof w == "number" ? w : Array.isArray(w) ? w.reduce((S, C) => S + (C.total_value || 0), 0) : 0, k = (w) => dt($(w));
    return t({ isDark: i }), (w, S) => (y(), x("article", om, [
      c("header", im, [
        c("div", rm, [
          S[2] || (S[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Seller Metrics"),
            c("p", { class: "card-subtitle" }, "Sales performance and failure analysis")
          ], -1)),
          a.loading ? E("", !0) : (y(), x("div", lm, [
            S[1] || (S[1] = c("p", { class: "badge-label" }, "Total Sales Value", -1)),
            v.value.length > 0 ? (y(), x("div", cm, [
              (y(!0), x(q, null, J(v.value, (C) => (y(), x("p", {
                key: C.currency,
                class: "currency-breakdown-item"
              }, M(C.currency) + " " + M(T(dt)(C.total_value)), 1))), 128))
            ])) : (y(), x("p", dm, M(k(a.sellerData.total_value_sell_success)), 1))
          ]))
        ])
      ]),
      a.loading ? (y(), x("div", um, [...S[3] || (S[3] = [
        tt('<div class="loading-container" data-v-60dfa4f1><div class="chart-flow-loader" data-v-60dfa4f1><div class="flow-line flow-1" data-v-60dfa4f1></div><div class="flow-line flow-2" data-v-60dfa4f1></div><div class="flow-line flow-3" data-v-60dfa4f1></div><div class="flow-line flow-4" data-v-60dfa4f1></div><div class="flow-line flow-5" data-v-60dfa4f1></div></div><p class="loading-text" data-v-60dfa4f1>Loading sales data...</p></div>', 1)
      ])])) : (y(), x("div", hm, [
        g.value.nodes.length > 0 ? (y(), x("section", fm, [
          c("div", gm, [
            X(pe, {
              data: g.value,
              "node-colors": m.value,
              title: "",
              height: "320px"
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : (y(), x("section", pm, [...S[4] || (S[4] = [
          tt('<div class="empty-state-content" data-v-60dfa4f1><div class="empty-icon-wrapper" data-v-60dfa4f1><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-60dfa4f1><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-60dfa4f1></path></svg></div><p class="empty-title" data-v-60dfa4f1>No sales data available</p><p class="empty-description" data-v-60dfa4f1>No sales data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])])),
        l.value && l.value.length > 0 ? (y(), x("section", vm, [
          c("div", bm, [
            c("table", mm, [
              S[5] || (S[5] = c("thead", null, [
                c("tr", { class: "table-header-row" }, [
                  c("th", { class: "table-header" }, "Date"),
                  c("th", { class: "table-header" }, "Sell Initiated"),
                  c("th", { class: "table-header" }, "Sell Started"),
                  c("th", { class: "table-header" }, "Get Quote"),
                  c("th", { class: "table-header" }, "Booking Created"),
                  c("th", { class: "table-header" }, "Sell Success"),
                  c("th", { class: "table-header" }, "Total Sales Value"),
                  c("th", { class: "table-header" }, "Failed")
                ])
              ], -1)),
              c("tbody", ym, [
                (y(!0), x(q, null, J(d.value, (C) => (y(), x("tr", {
                  key: C.date,
                  class: "table-row"
                }, [
                  c("td", _m, M(T(Tt)(C.date).format("DD/MM/YYYY")), 1),
                  c("td", xm, M(T(j)(C.seller_conversations || 0)), 1),
                  c("td", km, M(b(C.sell_started_count, C.seller_conversations || C.sell_started_count)), 1),
                  c("td", wm, M(b(C.sell_get_quote_count, C.seller_conversations || C.sell_started_count)), 1),
                  c("td", $m, M(b(C.sell_booking_created_count, C.seller_conversations || C.sell_started_count)), 1),
                  c("td", Mm, M(b(C.sell_success_count, C.seller_conversations || C.sell_started_count)), 1),
                  c("td", Sm, [
                    Array.isArray(C.daily_value_sell_success) && C.daily_value_sell_success.length > 0 ? (y(), x("div", Cm, [
                      (y(!0), x(q, null, J(C.daily_value_sell_success, (A) => (y(), x("span", {
                        key: `${C.date}-${A.currency}`
                      }, M(A.currency) + " " + M(T(dt)(A.total_value)), 1))), 128))
                    ])) : (y(), x("span", Dm, M(k(C.daily_value_sell_success)), 1))
                  ]),
                  c("td", Am, [
                    C.reasons && C.reasons.length > 0 ? (y(), x("div", Tm, [
                      (y(!0), x(q, null, J(C.reasons, (A) => (y(), x("div", {
                        key: A.reason,
                        class: "failed-reason-item"
                      }, [
                        c("span", Bm, M(A.reason) + ":", 1),
                        c("span", Lm, M(A.failed_count), 1)
                      ]))), 128))
                    ])) : (y(), x("div", Fm, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          u.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: S[0] || (S[0] = (C) => r.value = !r.value)
          }, [
            xt(M(r.value ? "View less" : `View more (${l.value.length - ha} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: G(["view-more-icon", { "view-more-icon-rotated": r.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...S[6] || (S[6] = [
              c("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : E("", !0),
          e.enableExport ? (y(), ct(T(yt), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : E("", !0)
      ]))
    ]));
  }
}), Em = /* @__PURE__ */ nt(Pm, [["__scopeId", "data-v-60dfa4f1"]]), Rm = { class: "top-agents-card" }, Im = {
  key: 0,
  class: "card-body"
}, Om = {
  key: 0,
  class: "chart-section"
}, zm = {
  key: 1,
  class: "empty-state"
}, Vm = { class: "empty-state-content" }, Nm = { class: "empty-icon-wrapper" }, Wm = {
  key: 1,
  class: "loading-state"
}, Hm = /* @__PURE__ */ Z({
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
  setup(e, { expose: t, emit: s }) {
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
    }, n = e, o = s, i = (h) => {
      o("export", h);
    }, { isDark: r, colors: l } = lt(rt(n, "theme")), d = D(() => {
      const f = (n.data?.top_agents || []).filter(
        (m) => m.agent_type?.toLowerCase() !== "triage"
      );
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const v = f.reduce(
        (m, p) => m + (Number(p.conversations) || 0),
        0
      ), g = f.map((m) => {
        const p = m.agent_type?.toLowerCase();
        return a[p] || "#94a3b8";
      }), _ = g.map((m) => `${m}80`);
      return {
        labels: f.map((m) => {
          const p = Number(m.conversations) || 0, b = v ? p / v * 100 : 0;
          return `${m.agent_type} - ${p.toLocaleString()} (${b.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: f.map((m) => m.conversations),
            backgroundColor: _,
            borderColor: g,
            borderWidth: 2
          }
        ]
      };
    }), u = D(() => n.options ? n.options : {
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
              const f = (h.label || "").toString().split(" - ")[0], v = Number(h.parsed) || 0, g = (h.dataset.data || []).reduce(
                (m, p) => m + (Number(p) || 0),
                0
              ), _ = g ? v / g * 100 : 0;
              return `${f}: ${v.toLocaleString()} (${_.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: r }), (h, f) => (y(), x("article", Rm, [
      f[3] || (f[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Top Agents"),
          c("p", { class: "card-subtitle" }, "Interactions by agent (excluding triage)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Wm, [...f[2] || (f[2] = [
        tt('<div class="loading-container" data-v-501bf4c4><div class="chart-lines-loader" data-v-501bf4c4><div class="line line-1" data-v-501bf4c4></div><div class="line line-2" data-v-501bf4c4></div><div class="line line-3" data-v-501bf4c4></div><div class="line line-4" data-v-501bf4c4></div><div class="line line-5" data-v-501bf4c4></div></div><p class="loading-text" data-v-501bf4c4>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", Im, [
        d.value.labels && d.value.labels.length ? (y(), x("section", Om, [
          X(Ys, {
            data: d.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ct(T(yt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", zm, [
          c("div", Vm, [
            c("div", Nm, [
              X(T(Cg), { class: "empty-icon" })
            ]),
            f[0] || (f[0] = c("p", { class: "empty-title" }, "No top agents data", -1)),
            f[1] || (f[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), jm = /* @__PURE__ */ nt(Hm, [["__scopeId", "data-v-501bf4c4"]]), Ym = { class: "payment-method-card" }, qm = { class: "card-header" }, Um = { class: "header-content" }, Km = {
  key: 0,
  class: "stats-badge"
}, Xm = {
  key: 0,
  class: "currency-breakdown-list"
}, Gm = {
  key: 1,
  class: "badge-value"
}, Zm = {
  key: 0,
  class: "loading-state"
}, Qm = {
  key: 1,
  class: "card-body"
}, Jm = {
  key: 0,
  class: "payment-methods-section"
}, t1 = { class: "payment-methods-grid" }, e1 = { class: "payment-card-content" }, s1 = { class: "payment-card-header" }, a1 = {
  key: 0,
  class: "currency-cell-list"
}, n1 = { class: "payment-badge-wrapper" }, o1 = {
  key: 1,
  class: "empty-state"
}, i1 = { class: "empty-state-content" }, r1 = { class: "empty-icon-wrapper" }, l1 = {
  key: 2,
  class: "table-section"
}, c1 = { class: "table-wrapper" }, d1 = { class: "data-table" }, u1 = { class: "table-body" }, h1 = { class: "table-cell font-medium" }, f1 = { class: "table-cell text-center" }, g1 = { class: "table-cell text-center success-value" }, p1 = {
  key: 0,
  class: "currency-cell-list"
}, v1 = { key: 1 }, b1 = { class: "table-cell" }, m1 = { class: "payment-tags" }, y1 = { class: "tag-name" }, _1 = {
  key: 0,
  class: "tag-amount"
}, x1 = {
  key: 1,
  class: "tag-amount"
}, k1 = { class: "tag-count" }, w1 = {
  key: 3,
  class: "empty-table-state"
}, $1 = "Not Registered", fa = 3, M1 = /* @__PURE__ */ Z({
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
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, { isDark: o } = lt(rt(a, "theme")), i = st(!1), r = st({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), l = D(() => r.value.payment_method_breakdown && r.value.payment_method_breakdown.length > 0), d = D(() => r.value.payment_method_by_day && r.value.payment_method_by_day.length > 0), u = st(!1), h = D(() => !r.value.payment_method_by_day || r.value.payment_method_by_day.length === 0 ? [] : [...r.value.payment_method_by_day].sort((B, F) => Tt(B.date).valueOf() - Tt(F.date).valueOf())), f = D(() => u.value ? h.value : h.value.slice(0, fa)), v = D(() => h.value.length > fa), g = (B) => {
      if (!B)
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
      const F = (B.payment_method_breakdown || []).map((z) => ({
        payment_method: z.payment_method || "Unknown",
        total_amount: z.total_amount ?? 0,
        count: z.count ?? 0,
        total_amount_by_currency: z.total_amount_by_currency ?? []
      })), O = (B.payment_method_by_day || []).map((z) => ({
        date: z.date || "",
        total_count: z.total_count ?? 0,
        total_amount: z.total_amount ?? 0,
        total_amount_by_currency: z.total_amount_by_currency ?? [],
        payment_methods: (z.payment_methods || []).map((W) => ({
          payment_method: W.payment_method || "Unknown",
          total_amount: W.total_amount ?? 0,
          count: W.count ?? 0,
          total_amount_by_currency: W.total_amount_by_currency ?? []
        }))
      }));
      return {
        airline_name: B.airline_name || a.airlineName,
        start_date: B.start_date || "",
        end_date: B.end_date || "",
        total_conversations: B.total_conversations ?? 0,
        total_amount: B.total_amount ?? 0,
        total_amount_by_currency: B.total_amount_by_currency ?? [],
        payment_method_breakdown: F,
        payment_method_by_day: O
      };
    }, _ = async () => {
      if (!(!a.fetchFunction || !a.dates || a.dates.length < 2 || !a.airlineName)) {
        i.value = !0;
        try {
          const [B, F] = a.dates.map((z) => Tt(z).format("YYYY-MM-DD")), O = await a.fetchFunction(a.airlineName, B, F);
          r.value = g(O);
        } catch (B) {
          console.error("Error fetching payment method metrics:", B), r.value = g(null);
        } finally {
          i.value = !1;
        }
      }
    }, m = [
      { bg: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)", border: "#a7f3d0", text: "#047857", value: "#065f46", icon: "#10b981", badge: "#059669" },
      { bg: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)", border: "#93c5fd", text: "#1d4ed8", value: "#1e40af", icon: "#3b82f6", badge: "#2563eb" },
      { bg: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)", border: "#d8b4fe", text: "#7c3aed", value: "#6d28d9", icon: "#8b5cf6", badge: "#7c3aed" },
      { bg: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)", border: "#fcd34d", text: "#b45309", value: "#92400e", icon: "#f59e0b", badge: "#d97706" },
      { bg: "linear-gradient(135deg, #fff1f2 0%, #fce7f3 100%)", border: "#fda4af", text: "#be123c", value: "#9f1239", icon: "#f43f5e", badge: "#e11d48" },
      { bg: "linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)", border: "#67e8f9", text: "#0e7490", value: "#155e75", icon: "#06b6d4", badge: "#0891b2" }
    ], p = (B) => {
      const F = m[B % m.length];
      return {
        background: F.bg,
        borderColor: F.border
      };
    }, b = (B) => ({ color: m[B % m.length].text }), $ = (B) => ({ color: m[B % m.length].value }), k = (B) => ({ color: m[B % m.length].icon }), w = (B) => ({ color: m[B % m.length].badge }), S = (B) => {
      const O = P(B).length;
      return O > 18 ? { fontSize: "0.75rem" } : O > 15 ? { fontSize: "0.875rem" } : O > 12 ? { fontSize: "1rem" } : { fontSize: "1.125rem" };
    }, C = (B) => {
      const F = B?.toLowerCase() || "";
      return !B || F === "unknown" ? Fg : F.includes("credit") || F.includes("debit") ? mo : F.includes("cash") || F.includes("efectivo") ? Mg : F.includes("bank") || F.includes("transfer") ? Sg : F.includes("zelle") || F.includes("pago") || F.includes("movil") ? Lg : F.includes("wallet") ? Pg : Bg;
    }, A = (B) => !B || B.toLowerCase() === "unknown" ? $1 : B.replace(/_/g, " "), P = (B) => B == null ? "$0.00" : dt(B), R = (B) => B ? Tt(B).format("DD/MM/YYYY") : "-", I = (B) => B == null || Number.isNaN(Number(B)) ? 0 : Number(B), N = (B) => {
      n("export", B);
    };
    function Y() {
      const B = a.data;
      B && (Array.isArray(B.payment_method_breakdown) && B.payment_method_breakdown.length > 0 || Array.isArray(B.payment_method_by_day) && B.payment_method_by_day.length > 0) && (i.value = !1, r.value = g(B));
    }
    return fe(() => {
      a.data ? Y() : _();
    }), Vt(
      () => a.data,
      (B) => {
        B && Y();
      },
      { deep: !0 }
    ), Vt(
      () => a.dates,
      (B) => {
        a.data || B && B[0] && B[1] && _();
      },
      { deep: !0 }
    ), t({ isDark: o }), (B, F) => (y(), x("article", Ym, [
      c("header", qm, [
        c("div", Um, [
          F[2] || (F[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Payment Method Metrics"),
            c("p", { class: "card-subtitle" }, "Sales breakdown by payment method")
          ], -1)),
          !i.value && r.value.total_amount ? (y(), x("div", Km, [
            F[1] || (F[1] = c("p", { class: "badge-label" }, "Total Amount", -1)),
            r.value.total_amount_by_currency && r.value.total_amount_by_currency.length > 0 ? (y(), x("div", Xm, [
              (y(!0), x(q, null, J(r.value.total_amount_by_currency, (O) => (y(), x("p", {
                key: O.currency,
                class: "currency-breakdown-item"
              }, M(O.currency) + " " + M(P(O.total_value)), 1))), 128))
            ])) : (y(), x("p", Gm, M(P(r.value.total_amount)), 1))
          ])) : E("", !0)
        ])
      ]),
      i.value ? (y(), x("div", Zm, [...F[3] || (F[3] = [
        tt('<div class="loading-container" data-v-ff4ce0b7><div class="chart-lines-loader" data-v-ff4ce0b7><div class="line line-1" data-v-ff4ce0b7></div><div class="line line-2" data-v-ff4ce0b7></div><div class="line line-3" data-v-ff4ce0b7></div><div class="line line-4" data-v-ff4ce0b7></div><div class="line line-5" data-v-ff4ce0b7></div></div><p class="loading-text" data-v-ff4ce0b7>Loading payment data...</p></div>', 1)
      ])])) : (y(), x("div", Qm, [
        l.value ? (y(), x("section", Jm, [
          F[4] || (F[4] = c("p", { class: "section-label" }, "Sales by Payment Method", -1)),
          c("div", t1, [
            (y(!0), x(q, null, J(r.value.payment_method_breakdown, (O, z) => (y(), x("div", {
              key: O.payment_method,
              class: "payment-method-card-item",
              style: _t(p(z))
            }, [
              c("div", e1, [
                c("div", s1, [
                  (y(), ct(Ca(C(O.payment_method)), {
                    class: "payment-icon",
                    style: _t(k(z))
                  }, null, 8, ["style"])),
                  c("span", {
                    class: "payment-name",
                    style: _t(b(z))
                  }, M(A(O.payment_method)), 5)
                ]),
                c("p", {
                  class: "payment-amount",
                  style: _t([$(z), S(O.total_amount)])
                }, M(P(O.total_amount)), 5),
                O.total_amount_by_currency && O.total_amount_by_currency.length > 0 ? (y(), x("div", a1, [
                  (y(!0), x(q, null, J(O.total_amount_by_currency, (W) => (y(), x("span", {
                    key: `${O.payment_method}-${W.currency}`
                  }, M(W.currency) + " " + M(P(W.total_value)), 1))), 128))
                ])) : E("", !0),
                c("div", n1, [
                  c("span", {
                    class: "payment-badge",
                    style: _t(w(z))
                  }, M(I(O.count)) + " " + M(I(O.count) === 1 ? "sale" : "sales"), 5)
                ])
              ])
            ], 4))), 128))
          ])
        ])) : (y(), x("section", o1, [
          c("div", i1, [
            c("div", r1, [
              X(T(mo), { class: "empty-icon" })
            ]),
            F[5] || (F[5] = c("p", { class: "empty-title" }, "No payment data available", -1)),
            F[6] || (F[6] = c("p", { class: "empty-description" }, "No payment method data found for the selected period. Try adjusting the date range.", -1))
          ])
        ])),
        d.value ? (y(), x("section", l1, [
          F[10] || (F[10] = c("p", { class: "section-label" }, "Daily Breakdown", -1)),
          c("div", c1, [
            c("table", d1, [
              F[8] || (F[8] = c("thead", null, [
                c("tr", { class: "table-header-row" }, [
                  c("th", { class: "table-header text-left" }, "Date"),
                  c("th", { class: "table-header text-center" }, "Total Sales"),
                  c("th", { class: "table-header text-center" }, "Total Amount"),
                  c("th", { class: "table-header text-left" }, "Payment Methods")
                ])
              ], -1)),
              c("tbody", u1, [
                (y(!0), x(q, null, J(f.value, (O) => (y(), x("tr", {
                  key: O.date,
                  class: "table-row"
                }, [
                  c("td", h1, M(R(O.date)), 1),
                  c("td", f1, M(T(j)(O.total_count ?? 0)), 1),
                  c("td", g1, [
                    O.total_amount_by_currency && O.total_amount_by_currency.length > 0 ? (y(), x("div", p1, [
                      (y(!0), x(q, null, J(O.total_amount_by_currency, (z) => (y(), x("span", {
                        key: `${O.date}-${z.currency}`
                      }, M(z.currency) + " " + M(P(z.total_value)), 1))), 128))
                    ])) : (y(), x("span", v1, M(P(O.total_amount)), 1))
                  ]),
                  c("td", b1, [
                    c("div", m1, [
                      (y(!0), x(q, null, J(O.payment_methods || [], (z) => (y(), x("div", {
                        key: z.payment_method,
                        class: "payment-tag"
                      }, [
                        c("span", y1, M(A(z.payment_method)), 1),
                        F[7] || (F[7] = c("span", { class: "tag-separator" }, "•", -1)),
                        !z.total_amount_by_currency || z.total_amount_by_currency.length === 0 ? (y(), x("span", _1, M(P(z.total_amount)), 1)) : (y(), x("span", x1, M(z.total_amount_by_currency.map((W) => `${W.currency} ${P(W.total_value)}`).join(" / ")), 1)),
                        c("span", k1, "(" + M(I(z.count)) + ")", 1)
                      ]))), 128))
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          v.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: F[0] || (F[0] = (O) => u.value = !u.value)
          }, [
            xt(M(u.value ? "View less" : `View more (${h.value.length - fa} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: G(["view-more-icon", { "view-more-icon-rotated": u.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...F[9] || (F[9] = [
              c("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : E("", !0),
          e.enableExport ? (y(), ct(T(yt), {
            key: 1,
            onExport: N,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : l.value ? (y(), x("div", w1, [...F[11] || (F[11] = [
          c("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
        ])])) : E("", !0)
      ]))
    ]));
  }
}), S1 = /* @__PURE__ */ nt(M1, [["__scopeId", "data-v-ff4ce0b7"]]), C1 = { class: "agent-human-conv-card" }, D1 = {
  key: 0,
  class: "loading-state"
}, A1 = {
  key: 1,
  class: "card-body"
}, T1 = { class: "summary-cards" }, B1 = { class: "summary-card assigned-card" }, L1 = { class: "summary-card-content" }, F1 = { class: "card-content" }, P1 = { class: "card-value assigned-value" }, E1 = { class: "card-content" }, R1 = { class: "card-value assigned-value" }, I1 = { class: "summary-card closed-card" }, O1 = { class: "summary-card-content" }, z1 = { class: "card-content" }, V1 = { class: "card-value closed-value" }, N1 = { class: "card-content" }, W1 = { class: "card-value closed-value" }, H1 = {
  key: 0,
  class: "agents-section"
}, j1 = { class: "date-header" }, Y1 = { class: "date-title" }, q1 = { class: "date-stats" }, U1 = { class: "stat-item assigned-stat" }, K1 = { class: "stat-value" }, X1 = { class: "stat-value" }, G1 = { class: "stat-item closed-stat" }, Z1 = { class: "stat-value" }, Q1 = { class: "stat-value" }, J1 = { class: "table-wrapper" }, ty = { class: "data-table" }, ey = { class: "table-body" }, sy = { class: "table-cell name-cell" }, ay = { class: "table-cell email-cell" }, ny = { class: "table-cell text-center" }, oy = { class: "metric-cell-content" }, iy = { class: "badge assigned-badge" }, ry = { class: "metric-cell-avg" }, ly = { class: "table-cell text-center" }, cy = { class: "metric-cell-content" }, dy = { class: "badge closed-badge" }, uy = { class: "metric-cell-avg" }, hy = {
  key: 1,
  class: "empty-state"
}, fy = /* @__PURE__ */ Z({
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
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, o = (m) => {
      n("export", m);
    }, { isDark: i } = lt(rt(a, "theme")), r = D(() => a.data?.agents_by_day && a.data.agents_by_day.length > 0), l = D(() => {
      if (!r.value) return {};
      const m = {};
      for (const $ of a.data.agents_by_day)
        m[$.date] || (m[$.date] = []), m[$.date].push($);
      const p = Object.keys(m).sort(($, k) => new Date($).getTime() - new Date(k).getTime()), b = {};
      for (const $ of p)
        b[$] = m[$];
      return b;
    }), d = (m) => m == null ? "0" : j(m), u = (m) => {
      if (m == null)
        return "AVG";
      if (m < 60)
        return `${Math.round(m)}s`;
      const p = Math.round(m), b = Math.floor(p / 60), $ = p % 60;
      if (b < 60)
        return `${b}m ${$}s`;
      const k = Math.floor(b / 60), w = b % 60;
      return `${k}h ${w}m`;
    }, h = (m) => {
      const p = new Date(m), b = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return p.toLocaleDateString("en-US", b);
    }, f = (m) => m[0]?.day_total_assigned ?? 0, v = (m) => m[0]?.day_total_closed ?? 0, g = (m) => m[0]?.day_avg_time_to_assign_seconds ?? null, _ = (m) => m[0]?.day_avg_conversation_duration_seconds ?? null;
    return t({ isDark: i }), (m, p) => (y(), x("article", C1, [
      p[11] || (p[11] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Agent Human Conversations"),
          c("p", { class: "card-subtitle" }, "Human conversation assignments and closures by agent")
        ])
      ], -1)),
      e.loading ? (y(), x("div", D1, [...p[0] || (p[0] = [
        tt('<div class="loading-container" data-v-6cfba83b><div class="chart-bars-loader" data-v-6cfba83b><div class="bar bar-1" data-v-6cfba83b></div><div class="bar bar-2" data-v-6cfba83b></div><div class="bar bar-3" data-v-6cfba83b></div><div class="bar bar-4" data-v-6cfba83b></div><div class="bar bar-5" data-v-6cfba83b></div></div><p class="loading-text" data-v-6cfba83b>Loading agent data...</p></div>', 1)
      ])])) : (y(), x("div", A1, [
        c("div", T1, [
          c("div", B1, [
            p[3] || (p[3] = c("div", { class: "card-decoration" }, null, -1)),
            c("div", L1, [
              c("div", F1, [
                p[1] || (p[1] = c("p", { class: "card-label" }, "Total Assigned", -1)),
                c("p", P1, M(d(e.data.total_assigned)), 1)
              ]),
              c("div", E1, [
                p[2] || (p[2] = c("p", { class: "card-label" }, "AVG time to assign", -1)),
                c("p", R1, M(u(e.data.avg_time_to_assign_seconds)), 1)
              ])
            ])
          ]),
          c("div", I1, [
            p[6] || (p[6] = c("div", { class: "card-decoration" }, null, -1)),
            c("div", O1, [
              c("div", z1, [
                p[4] || (p[4] = c("p", { class: "card-label" }, "Total Closed", -1)),
                c("p", V1, M(d(e.data.total_closed)), 1)
              ]),
              c("div", N1, [
                p[5] || (p[5] = c("p", { class: "card-label" }, "AVG time to close", -1)),
                c("p", W1, M(u(e.data.avg_conversation_duration_seconds)), 1)
              ])
            ])
          ])
        ]),
        r.value ? (y(), x("div", H1, [
          (y(!0), x(q, null, J(l.value, (b, $) => (y(), x("div", {
            key: $,
            class: "date-group"
          }, [
            c("div", j1, [
              c("h4", Y1, M(h($)), 1),
              c("div", q1, [
                c("span", U1, [
                  c("span", K1, M(d(f(b))), 1),
                  p[7] || (p[7] = xt(" Assigned ", -1)),
                  c("span", X1, M(u(g(b))), 1)
                ]),
                c("span", G1, [
                  c("span", Z1, M(d(v(b))), 1),
                  p[8] || (p[8] = xt(" Closed ", -1)),
                  c("span", Q1, M(u(_(b))), 1)
                ])
              ])
            ]),
            c("div", J1, [
              c("table", ty, [
                p[9] || (p[9] = c("thead", null, [
                  c("tr", { class: "table-header-row" }, [
                    c("th", { class: "table-header" }, "Agent Name"),
                    c("th", { class: "table-header" }, "Email"),
                    c("th", { class: "table-header" }, "Assigned (AVG time to assign)"),
                    c("th", { class: "table-header" }, "Closed (AVG time to close)")
                  ])
                ], -1)),
                c("tbody", ey, [
                  (y(!0), x(q, null, J(b, (k) => (y(), x("tr", {
                    key: `${$}-${k.agent_email}`,
                    class: "table-row"
                  }, [
                    c("td", sy, M(k.agent_name || "-"), 1),
                    c("td", ay, M(k.agent_email), 1),
                    c("td", ny, [
                      c("div", oy, [
                        c("span", iy, M(d(k.assigned_count)), 1),
                        c("span", ry, M(u(k.avg_time_to_assign_seconds)), 1)
                      ])
                    ]),
                    c("td", ly, [
                      c("div", cy, [
                        c("span", dy, M(d(k.closed_count)), 1),
                        c("span", uy, M(u(k.avg_conversation_duration_seconds)), 1)
                      ])
                    ])
                  ]))), 128))
                ])
              ])
            ])
          ]))), 128)),
          e.enableExport ? (y(), ct(T(yt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("div", hy, [...p[10] || (p[10] = [
          tt('<div class="empty-state-content" data-v-6cfba83b><div class="empty-icon-wrapper" data-v-6cfba83b><svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-6cfba83b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-6cfba83b></path></svg></div><p class="empty-title" data-v-6cfba83b>No agent human conversation data available</p><p class="empty-description" data-v-6cfba83b>Try adjusting the date range or check your filters.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), gy = /* @__PURE__ */ nt(fy, [["__scopeId", "data-v-6cfba83b"]]), py = { class: "channel-metrics-card" }, vy = {
  key: 0,
  class: "card-body"
}, by = {
  key: 0,
  class: "kpi-grid"
}, my = { class: "kpi-label" }, yy = { class: "kpi-value" }, _y = { class: "kpi-card total-card" }, xy = { class: "kpi-value" }, ky = {
  key: 1,
  class: "chart-section"
}, wy = {
  key: 2,
  class: "empty-state"
}, $y = {
  key: 1,
  class: "loading-state"
}, My = /* @__PURE__ */ Z({
  __name: "ChannelMetrics",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, o = (f) => {
      n("export", f);
    }, { isDark: i, colors: r } = lt(rt(a, "theme")), l = st({ labels: [], datasets: [] }), d = D(() => a.data ?? {
      channels_by_day: {},
      total_by_channel: {},
      total_conversations: 0
    }), u = D(() => ({
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: {
          display: !0,
          position: "top",
          labels: {
            usePointStyle: !0,
            padding: 20,
            font: {
              family: "'DM Sans', sans-serif",
              size: 12
            },
            color: r.value.textSecondary
          }
        },
        tooltip: {
          mode: "index",
          intersect: !1,
          backgroundColor: r.value.tooltipBg,
          titleColor: r.value.tooltipText,
          bodyColor: r.value.textSecondary,
          borderColor: i.value ? "rgba(198, 125, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: {
            family: "'Space Grotesk', sans-serif",
            size: 14,
            weight: 600
          },
          bodyFont: {
            family: "'DM Sans', sans-serif",
            size: 13
          }
        }
      },
      scales: {
        x: {
          display: !0,
          grid: {
            color: r.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
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
          grid: {
            color: r.value.gridLines
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 11
            },
            color: r.value.textSecondary
          }
        }
      },
      interaction: {
        mode: "nearest",
        axis: "x",
        intersect: !1
      }
    })), h = (f) => {
      if (!f || !f.channels_by_day) {
        l.value = { labels: [], datasets: [] };
        return;
      }
      const v = f.channels_by_day, g = Object.keys(v).sort();
      if (g.length === 0) {
        l.value = { labels: [], datasets: [] };
        return;
      }
      const _ = /* @__PURE__ */ new Set();
      for (const $ of Object.values(v))
        for (const k of Object.keys($))
          _.add(k);
      const m = Array.from(_), p = {
        wsp: "#25D366",
        // WhatsApp Green oficial
        whatsapp: "#25D366",
        // WhatsApp Green oficial
        voice: "#8b5cf6",
        // Purple-500
        sms: "#f59e0b",
        // Amber-500
        web_chat: "#06b6d4",
        // Cyan-500
        email: "#ec4899",
        // Pink-500
        messenger: "#0084ff",
        // Messenger Blue
        telegram: "#0088cc",
        // Telegram Blue
        instagram: "#E4405F"
        // Instagram Pink
      }, b = m.map(($) => {
        const k = $.toLowerCase(), w = p[k] || "#9ca3af";
        return {
          label: $.toUpperCase(),
          data: g.map((S) => v[S]?.[$] || 0),
          borderColor: w,
          backgroundColor: `${w}1A`,
          // 1A = 10% opacity
          borderWidth: 2,
          fill: !0,
          tension: 0.4,
          pointBackgroundColor: w,
          pointBorderColor: w,
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        };
      });
      l.value = {
        labels: g.map(($) => Tt($).format("MMM DD")),
        datasets: b
      };
    };
    return Vt(
      () => a.data,
      (f) => {
        h(f ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: i }), (f, v) => (y(), x("article", py, [
      v[3] || (v[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Channel Metrics"),
          c("p", { class: "card-subtitle" }, "Communication channels performance")
        ])
      ], -1)),
      a.loading ? (y(), x("div", $y, [...v[2] || (v[2] = [
        tt('<div class="loading-container" data-v-82f175d2><div class="chart-bars-loader" data-v-82f175d2><div class="bar bar-1" data-v-82f175d2></div><div class="bar bar-2" data-v-82f175d2></div><div class="bar bar-3" data-v-82f175d2></div><div class="bar bar-4" data-v-82f175d2></div><div class="bar bar-5" data-v-82f175d2></div></div><p class="loading-text" data-v-82f175d2>Loading channel metrics...</p></div>', 1)
      ])])) : (y(), x("div", vy, [
        Object.keys(d.value.total_by_channel).length ? (y(), x("div", by, [
          (y(!0), x(q, null, J(Object.keys(d.value.total_by_channel), (g) => (y(), x("div", {
            class: "kpi-card",
            key: g
          }, [
            c("span", my, M(g.toUpperCase()), 1),
            c("span", yy, M(T(j)(d.value.total_by_channel[g])), 1)
          ]))), 128)),
          c("div", _y, [
            v[0] || (v[0] = c("span", { class: "kpi-label" }, "Total Conversations", -1)),
            c("span", xy, M(T(j)(d.value.total_conversations)), 1)
          ])
        ])) : E("", !0),
        l.value.labels && l.value.labels.length ? (y(), x("section", ky, [
          X(ge, {
            data: l.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ct(T(yt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", wy, [...v[1] || (v[1] = [
          tt('<div class="empty-state-content" data-v-82f175d2><div class="empty-icon-wrapper" data-v-82f175d2><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-82f175d2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-82f175d2></path></svg></div><p class="empty-title" data-v-82f175d2>No channel metrics data available</p><p class="empty-description" data-v-82f175d2>No channel data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Sy = /* @__PURE__ */ nt(My, [["__scopeId", "data-v-82f175d2"]]), Cy = { class: "triage-combinations-card" }, Dy = { class: "card-header" }, Ay = { class: "total-badge" }, Ty = {
  key: 0,
  class: "card-body"
}, By = { class: "chart-container" }, Ly = { class: "table-container" }, Fy = { class: "table-row" }, Py = { class: "table-row" }, Ey = { class: "table-cell text-center count-cell" }, Ry = { class: "table-cell text-center count-cell" }, Iy = { class: "table-cell text-center count-cell" }, Oy = { class: "table-cell text-center count-cell" }, zy = { class: "table-cell text-center count-cell" }, Vy = {
  key: 1,
  class: "empty-state"
}, Ny = { class: "empty-state-content" }, Wy = { class: "empty-icon-wrapper" }, Hy = {
  key: 1,
  class: "loading-state"
}, jy = /* @__PURE__ */ Z({
  __name: "TriageCombinations",
  props: {
    data: { default: () => ({ combinations: {} }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, o = (p) => {
      n("export", p);
    }, { isDark: i, colors: r } = lt(rt(a, "theme")), l = D(() => {
      const p = a.data?.combinations || {}, b = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [$, k] of Object.entries(p)) {
        const w = $.split("+").filter(Boolean);
        if (!w.includes("triage")) continue;
        const S = w.filter((C) => C !== "triage").length;
        S >= 4 ? b["4p"] += Number(k) || 0 : b[S] += Number(k) || 0;
      }
      return b;
    }), d = D(() => {
      const p = l.value;
      return p[0] + p[1] + p[2] + p[3] + p["4p"] || 0;
    }), u = D(() => Object.keys(a.data?.combinations || {}).length > 0), h = D(() => {
      const p = d.value;
      if (!p) return { pct0: 0, pct1: 0, pct2: 0, pct3: 0, pct4p: 0 };
      const b = l.value;
      return {
        pct0: b[0] / p * 100,
        pct1: b[1] / p * 100,
        pct2: b[2] / p * 100,
        pct3: b[3] / p * 100,
        pct4p: b["4p"] / p * 100
      };
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
    }, v = (p) => p?.replace("80", "") || "#888888", g = D(() => ({
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
    })), _ = D(() => ({
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
            label: (p) => `${p.dataset.label} intent(s): ${Number(p.raw || 0).toFixed(0)}%`
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
    })), m = (p) => `${(Number(p) || 0).toFixed(0)}`;
    return t({ isDark: i }), (p, b) => (y(), x("article", Cy, [
      c("header", Dy, [
        b[0] || (b[0] = c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Distribution of Number of Intents"),
          c("p", { class: "card-subtitle" }, "Analysis of intent combinations per conversation")
        ], -1)),
        c("span", Ay, " Total: " + M(d.value), 1)
      ]),
      e.loading ? (y(), x("div", Hy, [...b[6] || (b[6] = [
        tt('<div class="loading-container" data-v-cb93cda2><div class="chart-bars-loader" data-v-cb93cda2><div class="bar bar-1" data-v-cb93cda2></div><div class="bar bar-2" data-v-cb93cda2></div><div class="bar bar-3" data-v-cb93cda2></div><div class="bar bar-4" data-v-cb93cda2></div><div class="bar bar-5" data-v-cb93cda2></div></div><p class="loading-text" data-v-cb93cda2>Loading intent distribution...</p></div>', 1)
      ])])) : (y(), x("div", Ty, [
        u.value ? (y(), x(q, { key: 0 }, [
          c("div", By, [
            X(ne, {
              data: g.value,
              options: _.value
            }, null, 8, ["data", "options"])
          ]),
          c("div", Ly, [
            b[3] || (b[3] = tt('<div class="table-header" data-v-cb93cda2><div class="table-cell header-cell" data-v-cb93cda2>Number of intentions</div><div class="table-cell header-cell text-center" data-v-cb93cda2>0</div><div class="table-cell header-cell text-center" data-v-cb93cda2>1</div><div class="table-cell header-cell text-center" data-v-cb93cda2>2</div><div class="table-cell header-cell text-center" data-v-cb93cda2>3</div><div class="table-cell header-cell text-center" data-v-cb93cda2>4 or more</div></div>', 1)),
            c("div", Fy, [
              b[1] || (b[1] = c("div", { class: "table-cell row-label" }, "% of total", -1)),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: _t({ color: v(f.c0) })
              }, M(m(h.value.pct0)) + "% ", 5),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: _t({ color: v(f.c1) })
              }, M(m(h.value.pct1)) + "% ", 5),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: _t({ color: v(f.c2) })
              }, M(m(h.value.pct2)) + "% ", 5),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: _t({ color: v(f.c3) })
              }, M(m(h.value.pct3)) + "% ", 5),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: _t({ color: v(f.c4p) })
              }, M(m(h.value.pct4p)) + "% ", 5)
            ]),
            c("div", Py, [
              b[2] || (b[2] = c("div", { class: "table-cell row-label" }, "Count", -1)),
              c("div", Ey, M(T(j)(l.value[0])), 1),
              c("div", Ry, M(T(j)(l.value[1])), 1),
              c("div", Iy, M(T(j)(l.value[2])), 1),
              c("div", Oy, M(T(j)(l.value[3])), 1),
              c("div", zy, M(T(j)(l.value["4p"])), 1)
            ])
          ]),
          e.enableExport ? (y(), ct(T(yt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ], 64)) : (y(), x("div", Vy, [
          c("div", Ny, [
            c("div", Wy, [
              X(T(It), { class: "empty-icon" })
            ]),
            b[4] || (b[4] = c("p", { class: "empty-title" }, "No triage combinations data", -1)),
            b[5] || (b[5] = c("p", { class: "empty-description" }, "No intent distribution data found for the selected period. Try adjusting the date range.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Yy = /* @__PURE__ */ nt(jy, [["__scopeId", "data-v-cb93cda2"]]), qy = { class: "select-language-card" }, Uy = { class: "card-header" }, Ky = { class: "header-content" }, Xy = {
  key: 0,
  class: "total-badge"
}, Gy = { class: "badge-value" }, Zy = {
  key: 0,
  class: "loading-state"
}, Qy = {
  key: 1,
  class: "card-body"
}, Jy = {
  key: 0,
  class: "pie-section"
}, t_ = {
  key: 1,
  class: "empty-state"
}, e_ = /* @__PURE__ */ Z({
  __name: "SelectLanguage",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: a, colors: n } = lt(rt(s, "theme")), o = [
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
    }, r = (v) => i[v]?.label || v.toUpperCase(), l = D(
      () => s.data?.items && s.data.items.length > 0
    ), d = D(
      () => (s.data?.items || []).reduce((v, g) => v + g.count, 0)
    ), u = D(() => {
      const v = {};
      for (const g of s.data?.items || [])
        v[g.language] = (v[g.language] || 0) + g.count;
      return Object.entries(v).map(([g, _]) => ({ language: g, count: _ })).sort((g, _) => _.count - g.count);
    }), h = D(() => ({
      labels: u.value.map((v) => r(v.language)),
      datasets: [{
        data: u.value.map((v) => v.count),
        backgroundColor: u.value.map((v, g) => o[g % o.length] + "80"),
        borderColor: u.value.map((v, g) => o[g % o.length]),
        borderWidth: 2,
        hoverOffset: 6
      }]
    })), f = D(() => ({
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
            color: n.value.textSecondary
          }
        },
        tooltip: {
          backgroundColor: n.value.tooltipBg,
          titleColor: n.value.tooltipText,
          bodyColor: n.value.tooltipText,
          borderColor: a.value ? "rgba(198, 125, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: { family: "'Space Grotesk', sans-serif", size: 13, weight: 600 },
          bodyFont: { family: "'DM Sans', sans-serif", size: 12 },
          callbacks: {
            label: (v) => {
              const g = v.raw || 0, _ = d.value > 0 ? (g / d.value * 100).toFixed(1) : "0";
              return ` ${v.label}: ${g} (${_}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: a }), (v, g) => (y(), x("article", qy, [
      c("header", Uy, [
        c("div", Ky, [
          g[1] || (g[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Language Selection"),
            c("p", { class: "card-subtitle" }, "Language distribution across conversations")
          ], -1)),
          s.loading ? E("", !0) : (y(), x("div", Xy, [
            g[0] || (g[0] = c("p", { class: "badge-label" }, "Total", -1)),
            c("p", Gy, M(T(j)(d.value)), 1)
          ]))
        ])
      ]),
      s.loading ? (y(), x("div", Zy, [...g[2] || (g[2] = [
        tt('<div class="loading-container" data-v-216eadc2><div class="chart-bars-loader" data-v-216eadc2><div class="bar bar-1" data-v-216eadc2></div><div class="bar bar-2" data-v-216eadc2></div><div class="bar bar-3" data-v-216eadc2></div><div class="bar bar-4" data-v-216eadc2></div><div class="bar bar-5" data-v-216eadc2></div></div><p class="loading-text" data-v-216eadc2>Loading language data...</p></div>', 1)
      ])])) : (y(), x("div", Qy, [
        l.value ? (y(), x("section", Jy, [
          X(Ys, {
            data: h.value,
            options: f.value
          }, null, 8, ["data", "options"])
        ])) : (y(), x("section", t_, [...g[3] || (g[3] = [
          tt('<div class="empty-state-content" data-v-216eadc2><div class="empty-icon-wrapper" data-v-216eadc2><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-216eadc2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" data-v-216eadc2></path></svg></div><p class="empty-title" data-v-216eadc2>No language data available</p><p class="empty-description" data-v-216eadc2>No language selection data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), s_ = /* @__PURE__ */ nt(e_, [["__scopeId", "data-v-216eadc2"]]), a_ = { class: "guardrails-card" }, n_ = { class: "card-header" }, o_ = { class: "header-content" }, i_ = {
  key: 0,
  class: "total-badge"
}, r_ = { class: "badge-value" }, l_ = {
  key: 0,
  class: "loading-state"
}, c_ = {
  key: 1,
  class: "card-body"
}, d_ = { class: "summary-card" }, u_ = { class: "summary-items" }, h_ = { class: "summary-item" }, f_ = { class: "summary-value" }, g_ = { class: "summary-pct" }, p_ = { class: "summary-item" }, v_ = { class: "summary-pct" }, b_ = { class: "summary-item" }, m_ = { class: "summary-value" }, y_ = { class: "summary-pct" }, __ = {
  key: 0,
  class: "table-section"
}, x_ = { class: "table-wrapper" }, k_ = { class: "data-table" }, w_ = { class: "table-body" }, $_ = { class: "table-cell font-medium text-center" }, M_ = { class: "table-cell text-center font-semibold" }, S_ = { class: "table-cell" }, C_ = { class: "type-badges-row" }, D_ = {
  key: 1,
  class: "empty-state"
}, ga = 3, A_ = /* @__PURE__ */ Z({
  __name: "Guardrails",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, o = (p) => {
      n("export", p);
    }, { isDark: i } = lt(rt(a, "theme")), r = D(
      () => a.data?.items && a.data.items.length > 0
    ), l = D(
      () => (a.data?.items || []).reduce((p, b) => p + b.count, 0)
    ), d = (p) => {
      const b = {};
      for (const w of a.data?.items || [])
        b[w[p]] = (b[w[p]] || 0) + w.count;
      const $ = Object.entries(b).sort((w, S) => S[1] - w[1]);
      if ($.length === 0) return { name: "—", pct: 0 };
      const k = l.value;
      return {
        name: $[0][0],
        pct: k > 0 ? Math.round($[0][1] / k * 100) : 0
      };
    }, u = D(() => d("guardrail_type")), h = D(() => d("guardrail_action")), f = D(() => d("guardrail_source")), v = D(() => {
      const p = {};
      for (const b of a.data?.items || [])
        p[b.date] || (p[b.date] = {}), p[b.date][b.guardrail_type] = (p[b.date][b.guardrail_type] || 0) + b.count;
      return Object.entries(p).map(([b, $]) => ({
        date: b,
        total: Object.values($).reduce((k, w) => k + w, 0),
        types: Object.entries($).map(([k, w]) => ({ type: k, count: w })).sort((k, w) => w.count - k.count)
      })).sort((b, $) => new Date(b.date).getTime() - new Date($.date).getTime());
    }), g = st(!1), _ = D(() => g.value ? v.value : v.value.slice(0, ga)), m = D(() => v.value.length > ga);
    return t({ isDark: i }), (p, b) => (y(), x("article", a_, [
      c("header", n_, [
        c("div", o_, [
          b[2] || (b[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Guardrails Metrics"),
            c("p", { class: "card-subtitle" }, "Content safety guardrail events and actions")
          ], -1)),
          a.loading ? E("", !0) : (y(), x("div", i_, [
            b[1] || (b[1] = c("p", { class: "badge-label" }, "Total Events", -1)),
            c("p", r_, M(T(j)(l.value)), 1)
          ]))
        ])
      ]),
      a.loading ? (y(), x("div", l_, [...b[3] || (b[3] = [
        tt('<div class="loading-container" data-v-02a2e95e><div class="chart-bars-loader" data-v-02a2e95e><div class="bar bar-1" data-v-02a2e95e></div><div class="bar bar-2" data-v-02a2e95e></div><div class="bar bar-3" data-v-02a2e95e></div><div class="bar bar-4" data-v-02a2e95e></div><div class="bar bar-5" data-v-02a2e95e></div></div><p class="loading-text" data-v-02a2e95e>Loading guardrails data...</p></div>', 1)
      ])])) : (y(), x("div", c_, [
        r.value ? (y(), x(q, { key: 0 }, [
          c("div", d_, [
            c("div", u_, [
              c("div", h_, [
                b[4] || (b[4] = c("span", { class: "summary-label" }, "Top type:", -1)),
                c("span", f_, M(u.value.name), 1),
                c("span", g_, "(" + M(u.value.pct) + "%)", 1)
              ]),
              b[7] || (b[7] = c("span", { class: "summary-dot" }, "·", -1)),
              c("div", p_, [
                b[5] || (b[5] = c("span", { class: "summary-label" }, "Top action:", -1)),
                c("span", {
                  class: G(["summary-value", `summary-action-${h.value.name.toLowerCase()}`])
                }, M(h.value.name), 3),
                c("span", v_, "(" + M(h.value.pct) + "%)", 1)
              ]),
              b[8] || (b[8] = c("span", { class: "summary-dot" }, "·", -1)),
              c("div", b_, [
                b[6] || (b[6] = c("span", { class: "summary-label" }, "Top source:", -1)),
                c("span", m_, M(f.value.name), 1),
                c("span", y_, "(" + M(f.value.pct) + "%)", 1)
              ])
            ])
          ]),
          v.value.length > 0 ? (y(), x("section", __, [
            b[11] || (b[11] = c("div", { class: "section-header" }, [
              c("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            c("div", x_, [
              c("table", k_, [
                b[9] || (b[9] = c("thead", null, [
                  c("tr", { class: "table-header-row" }, [
                    c("th", { class: "table-header" }, "Date"),
                    c("th", { class: "table-header text-center" }, "Count"),
                    c("th", { class: "table-header" }, "Types")
                  ])
                ], -1)),
                c("tbody", w_, [
                  (y(!0), x(q, null, J(_.value, ($) => (y(), x("tr", {
                    key: $.date,
                    class: "table-row"
                  }, [
                    c("td", $_, M(T(Tt)($.date).format("DD/MM")), 1),
                    c("td", M_, M(T(j)($.total)), 1),
                    c("td", S_, [
                      c("div", C_, [
                        (y(!0), x(q, null, J($.types, (k) => (y(), x("span", {
                          key: k.type,
                          class: "type-count-badge"
                        }, M(k.type) + " (" + M(k.count) + ") ", 1))), 128))
                      ])
                    ])
                  ]))), 128))
                ])
              ])
            ]),
            m.value ? (y(), x("button", {
              key: 0,
              class: "view-more-btn",
              onClick: b[0] || (b[0] = ($) => g.value = !g.value)
            }, [
              xt(M(g.value ? "View less" : `View more (${v.value.length - ga} more rows)`) + " ", 1),
              (y(), x("svg", {
                class: G(["view-more-icon", { "view-more-icon-rotated": g.value }]),
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
              }, [...b[10] || (b[10] = [
                c("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M19 9l-7 7-7-7"
                }, null, -1)
              ])], 2))
            ])) : E("", !0),
            e.enableExport ? (y(), ct(T(yt), {
              key: 1,
              onExport: o,
              loading: e.exportLoading
            }, null, 8, ["loading"])) : E("", !0)
          ])) : E("", !0)
        ], 64)) : (y(), x("section", D_, [...b[12] || (b[12] = [
          tt('<div class="empty-state-content" data-v-02a2e95e><div class="empty-icon-wrapper" data-v-02a2e95e><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-02a2e95e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" data-v-02a2e95e></path></svg></div><p class="empty-title" data-v-02a2e95e>No guardrail events</p><p class="empty-description" data-v-02a2e95e>No content safety events found for the selected period. This is a good sign!</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), T_ = /* @__PURE__ */ nt(A_, [["__scopeId", "data-v-02a2e95e"]]), B_ = { class: "dn-metrics-card" }, L_ = { class: "card-header" }, F_ = { class: "header-content" }, P_ = {
  key: 0,
  class: "total-docs-badge"
}, E_ = { class: "badge-value" }, R_ = {
  key: 0,
  class: "loading-state"
}, I_ = {
  key: 1,
  class: "card-body"
}, O_ = { class: "kpi-grid" }, z_ = { class: "kpi-card kpi-neutral" }, V_ = { class: "kpi-value" }, N_ = { class: "kpi-card kpi-success" }, W_ = { class: "kpi-value kpi-value-success" }, H_ = { class: "kpi-pct" }, j_ = { class: "kpi-card kpi-danger" }, Y_ = { class: "kpi-value kpi-value-error" }, q_ = { class: "kpi-pct" }, U_ = { class: "kpi-card kpi-warning" }, K_ = { class: "kpi-value kpi-value-reason" }, X_ = { class: "kpi-pct" }, G_ = { class: "chart-section" }, Z_ = { class: "chart-wrapper" }, Q_ = {
  key: 1,
  class: "empty-chart"
}, J_ = {
  key: 0,
  class: "table-section"
}, t2 = { class: "table-wrapper" }, e2 = { class: "data-table" }, s2 = { class: "table-body" }, a2 = { class: "table-cell text-left font-medium" }, n2 = { class: "table-cell text-center font-semibold" }, o2 = { class: "table-cell text-center" }, i2 = { class: "impact-bar-container" }, r2 = { class: "impact-label" }, l2 = {
  key: 1,
  class: "chart-section"
}, c2 = { class: "chart-wrapper" }, d2 = { class: "system-health" }, u2 = { class: "system-health-content" }, h2 = { class: "sys-kpi-grid" }, f2 = { class: "sys-kpi" }, g2 = { class: "sys-value" }, p2 = { class: "sys-kpi" }, v2 = { class: "sys-value" }, b2 = { class: "sys-kpi" }, m2 = { class: "sys-value sys-error" }, y2 = { class: "sys-kpi" }, _2 = { class: "sys-value" }, x2 = { class: "sys-kpi" }, k2 = { class: "sys-value" }, w2 = { class: "sys-kpi" }, $2 = { class: "sys-value sys-error" }, M2 = {
  key: 1,
  class: "empty-state"
}, S2 = /* @__PURE__ */ Z({
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
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, o = (k) => {
      n("export", k);
    }, { isDark: i, colors: r } = lt(rt(a, "theme")), l = D(() => {
      const k = a.data?.documentCounts?.items || [], w = a.data?.processingCounts?.items || [];
      return k.length > 0 || w.length > 0;
    }), d = D(() => {
      const k = a.data?.documentCounts?.items || [];
      return {
        processing_started: k.reduce((w, S) => w + S.processing_started, 0),
        processing_completed: k.reduce((w, S) => w + S.processing_completed, 0),
        processing_failed: k.reduce((w, S) => w + S.processing_failed, 0),
        row_count_total: k.reduce((w, S) => w + S.row_count_total, 0)
      };
    }), u = D(() => {
      const k = a.data?.processingCounts?.items || [];
      return {
        processing_started: k.reduce((w, S) => w + S.processing_started, 0),
        processing_success: k.reduce((w, S) => w + S.processing_success, 0),
        notification_sent: k.reduce((w, S) => w + S.notification_sent, 0),
        notification_failed: k.reduce((w, S) => w + S.notification_failed, 0),
        dq_phone: k.reduce((w, S) => w + S.dq_error_phone_not_found, 0),
        dq_flight: k.reduce((w, S) => w + S.dq_error_flight_not_found, 0),
        dq_booking: k.reduce((w, S) => w + S.dq_error_booking_not_found, 0),
        dq_other: k.reduce((w, S) => w + S.dq_error_other, 0),
        totalDqErrors: k.reduce((w, S) => w + S.dq_error_phone_not_found + S.dq_error_flight_not_found + S.dq_error_booking_not_found + S.dq_error_other, 0)
      };
    }), h = D(() => d.value.row_count_total || u.value.processing_started), f = D(() => Math.max(0, h.value - u.value.notification_sent)), v = (k, w) => w ? `${Math.round(k / w * 100)}%` : "0%", g = D(() => {
      const k = [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Notification failed", count: u.value.notification_failed },
        { reason: "Other", count: u.value.dq_other }
      ].filter((w) => w.count > 0).sort((w, S) => S.count - w.count);
      return k.length > 0 ? k[0] : { reason: "None", count: 0 };
    }), _ = D(() => {
      const k = h.value;
      return [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Notification failed", count: u.value.notification_failed },
        { reason: "Other", count: u.value.dq_other }
      ].map((w) => ({
        ...w,
        impactPct: k > 0 ? Math.round(w.count / k * 100) : 0
      }));
    }), m = D(() => {
      const k = h.value, w = u.value.processing_success, S = Math.max(0, w - u.value.totalDqErrors), C = u.value.notification_sent, A = Math.max(0, k - w), P = u.value.totalDqErrors, R = Math.max(0, S - C), I = (B, F) => {
        const O = F > 0 ? Math.round(B / F * 100) : 0;
        return `${B.toLocaleString()} (${O}%)`;
      }, N = [
        { name: "Records Detected" },
        { name: "Valid Reservations" },
        { name: "Invalid / Unprocessed" },
        { name: "Contactable" },
        { name: "Data Quality Issues" },
        { name: "Notified" },
        { name: "Not Delivered" }
      ], Y = [];
      return w > 0 && Y.push({ source: "Records Detected", target: "Valid Reservations", value: w, label: I(w, k) }), A > 0 && Y.push({ source: "Records Detected", target: "Invalid / Unprocessed", value: A, label: I(A, k) }), S > 0 && Y.push({ source: "Valid Reservations", target: "Contactable", value: S, label: I(S, k) }), P > 0 && Y.push({ source: "Valid Reservations", target: "Data Quality Issues", value: P, label: I(P, k) }), C > 0 && Y.push({ source: "Contactable", target: "Notified", value: C, label: I(C, k) }), R > 0 && Y.push({ source: "Contactable", target: "Not Delivered", value: R, label: I(R, k) }), { nodes: N, links: Y };
    }), p = {
      "Records Detected": "#DBEAFE",
      "Valid Reservations": "#D1FAE5",
      "Invalid / Unprocessed": "#FEE2E2",
      Contactable: "#BBF7D0",
      "Data Quality Issues": "#FED7AA",
      Notified: "#86EFAC",
      "Not Delivered": "#FCA5A5"
    }, b = D(() => {
      const k = [...a.data?.processingCounts?.items || []].sort(
        (I, N) => new Date(I.date).getTime() - new Date(N.date).getTime()
      ), w = a.data?.documentCounts?.items || [], S = {};
      for (const I of w)
        S[I.date] = (S[I.date] || 0) + I.row_count_total;
      const C = [.../* @__PURE__ */ new Set([...k.map((I) => I.date), ...w.map((I) => I.date)])].sort(), A = C.map((I) => Tt(I).format("MMM DD")), P = C.map((I) => {
        const N = k.find((F) => F.date === I), Y = N?.notification_sent || 0, B = S[I] || N?.processing_started || 0;
        return B > 0 ? Math.round(Y / B * 100) : 0;
      }), R = C.map((I) => k.find((Y) => Y.date === I)?.notification_sent || 0);
      return {
        labels: A,
        datasets: [
          {
            label: "Success Rate (%)",
            data: P,
            borderColor: "#8b5cf6",
            backgroundColor: "rgba(139, 92, 246, 0.1)",
            borderWidth: 2.5,
            fill: !0,
            tension: 0.4,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: "#8b5cf6",
            pointBorderColor: "#7c3aed",
            pointBorderWidth: 2,
            yAxisID: "y"
          },
          {
            label: "Notifications Sent",
            data: R,
            borderColor: "#10b981",
            backgroundColor: "rgba(16, 185, 129, 0.08)",
            borderWidth: 1.5,
            borderDash: [4, 4],
            fill: !1,
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 5,
            pointBackgroundColor: "#10b981",
            pointBorderColor: "#059669",
            pointBorderWidth: 2,
            yAxisID: "y1"
          }
        ]
      };
    }), $ = D(() => ({
      responsive: !0,
      maintainAspectRatio: !1,
      interaction: { mode: "index", intersect: !1 },
      plugins: {
        legend: { display: !0, position: "top", labels: { usePointStyle: !0, padding: 16, font: { family: "'DM Sans', sans-serif", size: 11 }, color: r.value.textSecondary } },
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
            label: (k) => k.datasetIndex === 0 ? ` Success Rate: ${k.raw}%` : ` Notifications: ${k.raw}`
          }
        }
      },
      scales: {
        x: { display: !0, grid: { display: !1 }, ticks: { font: { family: "'DM Sans', sans-serif", size: 11 }, color: r.value.textSecondary } },
        y: {
          type: "linear",
          display: !0,
          position: "left",
          beginAtZero: !0,
          max: 100,
          grid: { color: r.value.gridLines },
          ticks: { font: { family: "'DM Sans', sans-serif", size: 11 }, color: r.value.textSecondary, callback: (k) => k + "%" },
          title: { display: !0, text: "Success Rate", font: { family: "'DM Sans', sans-serif", size: 11 }, color: r.value.textSecondary }
        },
        y1: {
          type: "linear",
          display: !0,
          position: "right",
          beginAtZero: !0,
          grid: { drawOnChartArea: !1 },
          ticks: { font: { family: "'DM Sans', sans-serif", size: 11 }, color: r.value.textSecondary },
          title: { display: !0, text: "Volume", font: { family: "'DM Sans', sans-serif", size: 11 }, color: r.value.textSecondary }
        }
      }
    }));
    return t({ isDark: i }), (k, w) => (y(), x("article", B_, [
      c("header", L_, [
        c("div", F_, [
          w[1] || (w[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Disruption Notifier"),
            c("p", { class: "card-subtitle" }, "Passenger notification effectiveness and delivery analysis")
          ], -1)),
          a.loading ? E("", !0) : (y(), x("div", P_, [
            w[0] || (w[0] = c("p", { class: "badge-label" }, "Total Records", -1)),
            c("p", E_, M(T(j)(d.value.row_count_total)), 1)
          ]))
        ])
      ]),
      a.loading ? (y(), x("div", R_, [...w[2] || (w[2] = [
        tt('<div class="loading-container" data-v-d8baf32c><div class="chart-bars-loader" data-v-d8baf32c><div class="bar bar-1" data-v-d8baf32c></div><div class="bar bar-2" data-v-d8baf32c></div><div class="bar bar-3" data-v-d8baf32c></div><div class="bar bar-4" data-v-d8baf32c></div><div class="bar bar-5" data-v-d8baf32c></div></div><p class="loading-text" data-v-d8baf32c>Loading disruption notifier data...</p></div>', 1)
      ])])) : (y(), x("div", I_, [
        l.value ? (y(), x(q, { key: 0 }, [
          c("div", O_, [
            c("div", z_, [
              w[3] || (w[3] = c("span", { class: "kpi-label" }, "Passengers Affected", -1)),
              c("span", V_, M(T(j)(h.value)), 1)
            ]),
            c("div", N_, [
              w[4] || (w[4] = c("span", { class: "kpi-label" }, "Successfully Notified", -1)),
              c("span", W_, M(T(j)(u.value.notification_sent)), 1),
              c("span", H_, M(v(u.value.notification_sent, h.value)), 1)
            ]),
            c("div", j_, [
              w[5] || (w[5] = c("span", { class: "kpi-label" }, "Not Notified", -1)),
              c("span", Y_, M(T(j)(f.value)), 1),
              c("span", q_, M(v(f.value, h.value)), 1)
            ]),
            c("div", U_, [
              w[6] || (w[6] = c("span", { class: "kpi-label" }, "Main Failure Reason", -1)),
              c("span", K_, M(g.value.reason), 1),
              c("span", X_, M(T(j)(g.value.count)) + " cases", 1)
            ])
          ]),
          c("section", G_, [
            w[8] || (w[8] = c("div", { class: "chart-header" }, [
              c("h4", { class: "section-title" }, "Passenger Disruption Funnel")
            ], -1)),
            c("div", Z_, [
              m.value.nodes.length > 0 && m.value.links.length > 0 ? (y(), ct(pe, {
                key: 0,
                data: m.value,
                "node-colors": p,
                height: "350px"
              }, null, 8, ["data"])) : (y(), x("div", Q_, [...w[7] || (w[7] = [
                c("p", { class: "empty-chart-text" }, "No processing data available for visualization", -1)
              ])]))
            ])
          ]),
          _.value.length > 0 ? (y(), x("section", J_, [
            w[10] || (w[10] = c("div", { class: "section-header" }, [
              c("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
            ], -1)),
            c("div", t2, [
              c("table", e2, [
                w[9] || (w[9] = c("thead", null, [
                  c("tr", { class: "table-header-row" }, [
                    c("th", { class: "table-header text-left" }, "Reason"),
                    c("th", { class: "table-header text-center" }, "Count"),
                    c("th", { class: "table-header text-center" }, "Impact")
                  ])
                ], -1)),
                c("tbody", s2, [
                  (y(!0), x(q, null, J(_.value, (S) => (y(), x("tr", {
                    key: S.reason,
                    class: "table-row"
                  }, [
                    c("td", a2, M(S.reason), 1),
                    c("td", n2, M(T(j)(S.count)), 1),
                    c("td", o2, [
                      c("div", i2, [
                        c("div", {
                          class: "impact-bar",
                          style: _t({ width: S.impactPct + "%" })
                        }, null, 4),
                        c("span", r2, M(S.impactPct) + "%", 1)
                      ])
                    ])
                  ]))), 128))
                ])
              ])
            ])
          ])) : E("", !0),
          b.value.labels.length > 0 ? (y(), x("section", l2, [
            w[11] || (w[11] = c("div", { class: "chart-header" }, [
              c("h4", { class: "section-title" }, "Notification Success Rate by Day")
            ], -1)),
            c("div", c2, [
              X(ge, {
                data: b.value,
                options: $.value
              }, null, 8, ["data", "options"])
            ])
          ])) : E("", !0),
          c("details", d2, [
            w[18] || (w[18] = c("summary", { class: "system-health-toggle" }, [
              c("svg", {
                class: "toggle-icon",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
              }, [
                c("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                }),
                c("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                })
              ]),
              xt(" System Health Details ")
            ], -1)),
            c("div", u2, [
              c("div", h2, [
                c("div", f2, [
                  w[12] || (w[12] = c("span", { class: "sys-label" }, "Docs Started", -1)),
                  c("span", g2, M(T(j)(d.value.processing_started)), 1)
                ]),
                c("div", p2, [
                  w[13] || (w[13] = c("span", { class: "sys-label" }, "Docs Completed", -1)),
                  c("span", v2, M(T(j)(d.value.processing_completed)), 1)
                ]),
                c("div", b2, [
                  w[14] || (w[14] = c("span", { class: "sys-label" }, "Docs Failed", -1)),
                  c("span", m2, M(T(j)(d.value.processing_failed)), 1)
                ]),
                c("div", y2, [
                  w[15] || (w[15] = c("span", { class: "sys-label" }, "Processing Started", -1)),
                  c("span", _2, M(T(j)(u.value.processing_started)), 1)
                ]),
                c("div", x2, [
                  w[16] || (w[16] = c("span", { class: "sys-label" }, "Processing Success", -1)),
                  c("span", k2, M(T(j)(u.value.processing_success)), 1)
                ]),
                c("div", w2, [
                  w[17] || (w[17] = c("span", { class: "sys-label" }, "Notification Failed", -1)),
                  c("span", $2, M(T(j)(u.value.notification_failed)), 1)
                ])
              ])
            ])
          ]),
          e.enableExport ? (y(), ct(T(yt), {
            key: 2,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ], 64)) : (y(), x("section", M2, [...w[19] || (w[19] = [
          tt('<div class="empty-state-content" data-v-d8baf32c><div class="empty-icon-wrapper" data-v-d8baf32c><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d8baf32c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" data-v-d8baf32c></path></svg></div><p class="empty-title" data-v-d8baf32c>No disruption notifier data</p><p class="empty-description" data-v-d8baf32c>No disruption notification data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), C2 = /* @__PURE__ */ nt(S2, [["__scopeId", "data-v-d8baf32c"]]), D2 = { class: "nps-daily-card" }, A2 = { class: "card-header" }, T2 = { class: "header-content" }, B2 = {
  key: 0,
  class: "stats-badge"
}, L2 = { class: "badge-value" }, F2 = {
  key: 0,
  class: "loading-state"
}, P2 = {
  key: 1,
  class: "card-body"
}, E2 = { class: "tooltip-content" }, R2 = { class: "tooltip-title" }, I2 = { class: "tooltip-stats" }, O2 = { class: "tooltip-stat-row" }, z2 = { class: "tooltip-value" }, V2 = { class: "tooltip-stat-row" }, N2 = { class: "tooltip-value" }, W2 = { class: "tooltip-stat-row" }, H2 = { class: "tooltip-value" }, j2 = { class: "tooltip-stat-row" }, Y2 = { class: "tooltip-value" }, q2 = { class: "tooltip-stat-row" }, U2 = { class: "tooltip-value" }, K2 = { class: "tooltip-stat-row" }, X2 = { class: "tooltip-value" }, G2 = {
  key: 2,
  class: "empty-state"
}, yo = 400, je = 60, _o = 90, xo = 120, Z2 = {
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
  setup(e, { expose: t, emit: s }) {
    const a = s, n = (m) => {
      a("export", m);
    }, o = e, { isDark: i } = lt(rt(o, "theme")), r = D(() => o.data), l = st(null), d = st({
      visible: !1,
      x: 0,
      y: 0,
      date: "",
      min: "",
      max: "",
      q1: "",
      avg: "",
      q3: "",
      median: ""
    }), u = D(() => {
      if (!r.value || !r.value.nps_by_day) return 800;
      const m = r.value.nps_by_day.length;
      return Math.max(800, je * 2 + m * xo);
    }), h = (m, p) => {
      const $ = (m - 1) / 9;
      return je + p - $ * p;
    }, f = (m) => m ? Tt(m).format("DD-MM-YYYY") : "", v = D(() => {
      if (!r.value || !r.value.nps_by_day || r.value.nps_by_day.length === 0)
        return [];
      const m = [], p = yo - je - _o;
      return r.value.nps_by_day.forEach((b, $) => {
        const k = b.min_score || 0, w = b.q1_score || 0, S = b.median_score || 0, C = b.q3_score || 0, A = b.max_score || 0, P = b.average_score || 0;
        m.push({
          label: f(b.date),
          responseCount: b.nps_responses_count || 0,
          isTotal: !1,
          low: k,
          q1: w,
          median: S,
          q3: C,
          high: A,
          average: P,
          highY: h(A, p),
          lowY: h(k, p),
          q1Y: h(w, p),
          q3Y: h(C, p),
          medianY: h(S, p),
          averageY: P > 0 ? h(P, p) : null,
          centerX: je + ($ + 1) * xo
        });
      }), m;
    }), g = (m, p) => {
      if (!l.value || !p || p.horizontal) return;
      const b = l.value.getBoundingClientRect(), $ = m.clientX, k = m.clientY, w = 140, S = 160, C = 10, A = 15;
      let P = $ - b.left - w / 2, R = k - b.top - S - A;
      P = Math.max(C, Math.min(P, b.width - w - C)), R < C && (R = k - b.top + A), R = Math.max(C, Math.min(R, b.height - S - C)), d.value = {
        visible: !0,
        x: P,
        y: R,
        date: p.label || "",
        min: p.low !== void 0 ? p.low.toFixed(1) : "N/A",
        max: p.high !== void 0 ? p.high.toFixed(1) : "N/A",
        q1: p.open !== void 0 ? p.open.toFixed(1) : "N/A",
        avg: p.average !== void 0 && p.average > 0 ? p.average.toFixed(1) : "N/A",
        q3: p.close !== void 0 ? p.close.toFixed(1) : "N/A",
        median: p.median !== void 0 ? p.median.toFixed(1) : "N/A"
      };
    }, _ = () => {
      d.value.visible = !1;
    };
    return t({ isDark: i }), (m, p) => (y(), x("article", D2, [
      c("header", A2, [
        c("div", T2, [
          p[1] || (p[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "CSAT Daily Metrics"),
            c("p", { class: "card-subtitle" }, "Daily CSAT Distribution")
          ], -1)),
          r.value && r.value.nps_by_day && r.value.nps_by_day.length > 0 ? (y(), x("div", B2, [
            p[0] || (p[0] = c("p", { class: "badge-label" }, "Days", -1)),
            c("p", L2, M(r.value.nps_by_day.length), 1)
          ])) : E("", !0)
        ])
      ]),
      o.loading ? (y(), x("div", F2, [...p[2] || (p[2] = [
        tt('<div class="loading-container" data-v-b20112a7><div class="chart-flow-loader" data-v-b20112a7><div class="flow-line flow-1" data-v-b20112a7></div><div class="flow-line flow-2" data-v-b20112a7></div><div class="flow-line flow-3" data-v-b20112a7></div><div class="flow-line flow-4" data-v-b20112a7></div><div class="flow-line flow-5" data-v-b20112a7></div></div><p class="loading-text" data-v-b20112a7>Loading daily NPS data...</p></div>', 1)
      ])])) : r.value && r.value.nps_by_day && r.value.nps_by_day.length > 0 ? (y(), x("div", P2, [
        c("div", {
          class: "chart-wrapper",
          ref_key: "chartContainerRef",
          ref: l
        }, [
          v.value && v.value.length > 0 ? (y(), ct(Ai, {
            key: 0,
            "candlestick-data": v.value,
            "chart-width": u.value,
            "chart-height": yo,
            "chart-margin": je,
            "chart-bottom-margin": _o,
            "show-legend": !0,
            rotation: 0,
            "candle-width": 30,
            onCandleHover: g,
            onCandleLeave: _
          }, null, 8, ["candlestick-data", "chart-width"])) : E("", !0),
          d.value.visible ? (y(), x("div", {
            key: 1,
            class: "tooltip-overlay",
            style: _t({
              left: `${d.value.x}px`,
              top: `${d.value.y}px`
            })
          }, [
            c("div", E2, [
              c("div", R2, M(d.value.date), 1),
              p[9] || (p[9] = c("div", { class: "tooltip-divider" }, null, -1)),
              c("div", I2, [
                c("div", O2, [
                  p[3] || (p[3] = c("span", { class: "tooltip-label tooltip-min" }, "Min:", -1)),
                  c("span", z2, M(d.value.min), 1)
                ]),
                c("div", V2, [
                  p[4] || (p[4] = c("span", { class: "tooltip-label tooltip-q1" }, "Q1:", -1)),
                  c("span", N2, M(d.value.q1), 1)
                ]),
                c("div", W2, [
                  p[5] || (p[5] = c("span", { class: "tooltip-label tooltip-median" }, "Median:", -1)),
                  c("span", H2, M(d.value.median), 1)
                ]),
                c("div", j2, [
                  p[6] || (p[6] = c("span", { class: "tooltip-label tooltip-avg" }, "Avg:", -1)),
                  c("span", Y2, M(d.value.avg), 1)
                ]),
                c("div", q2, [
                  p[7] || (p[7] = c("span", { class: "tooltip-label tooltip-q3" }, "Q3:", -1)),
                  c("span", U2, M(d.value.q3), 1)
                ]),
                c("div", K2, [
                  p[8] || (p[8] = c("span", { class: "tooltip-label tooltip-max" }, "Max:", -1)),
                  c("span", X2, M(d.value.max), 1)
                ])
              ])
            ])
          ], 4)) : E("", !0)
        ], 512),
        e.enableExport ? (y(), ct(T(yt), {
          key: 0,
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ])) : (y(), x("div", G2, [...p[10] || (p[10] = [
        tt('<div class="empty-state-content" data-v-b20112a7><div class="empty-icon-wrapper" data-v-b20112a7><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-b20112a7><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-b20112a7></path></svg></div><p class="empty-title" data-v-b20112a7>No daily NPS data available</p><p class="empty-description" data-v-b20112a7>No daily NPS data found for the selected period. Try adjusting the date range.</p></div>', 1)
      ])]))
    ]));
  }
}, Fi = /* @__PURE__ */ nt(Z2, [["__scopeId", "data-v-b20112a7"]]), Q2 = { class: "nps-overview-card" }, J2 = { class: "card-header" }, tx = { class: "header-content" }, ex = { class: "header-badges" }, sx = {
  key: 0,
  class: "stats-badge"
}, ax = { class: "badge-value" }, nx = {
  key: 1,
  class: "stats-badge"
}, ox = { class: "badge-value" }, ix = {
  key: 0,
  class: "loading-state"
}, rx = {
  key: 1,
  class: "card-body"
}, lx = { class: "chart-wrapper" }, cx = {
  key: 2,
  class: "empty-state"
}, dx = 500, ux = 60, hx = 80, fx = {
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
  setup(e, { expose: t, emit: s }) {
    const a = s, n = (d) => {
      a("export", d);
    }, o = e, { isDark: i } = lt(rt(o, "theme")), r = D(() => o.data), l = D(() => Math.max(600, window.innerWidth * 0.85));
    return t({ isDark: i }), (d, u) => (y(), x("article", Q2, [
      c("header", J2, [
        c("div", tx, [
          u[2] || (u[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "CSAT Overview Metrics"),
            c("p", { class: "card-subtitle" }, "Overall CSAT Distribution")
          ], -1)),
          c("div", ex, [
            r.value && r.value.total_nps_responses > 0 ? (y(), x("div", sx, [
              u[0] || (u[0] = c("p", { class: "badge-label" }, "Responses", -1)),
              c("p", ax, M(r.value.total_nps_responses), 1)
            ])) : E("", !0),
            r.value && r.value.p95_score > 0 ? (y(), x("div", nx, [
              u[1] || (u[1] = c("p", { class: "badge-label" }, "Percentile 95", -1)),
              c("p", ox, M(r.value.p95_score || 0), 1)
            ])) : E("", !0)
          ])
        ])
      ]),
      o.loading ? (y(), x("div", ix, [...u[3] || (u[3] = [
        tt('<div class="loading-container" data-v-30fe5f88><div class="chart-flow-loader" data-v-30fe5f88><div class="flow-line flow-1" data-v-30fe5f88></div><div class="flow-line flow-2" data-v-30fe5f88></div><div class="flow-line flow-3" data-v-30fe5f88></div><div class="flow-line flow-4" data-v-30fe5f88></div><div class="flow-line flow-5" data-v-30fe5f88></div></div><p class="loading-text" data-v-30fe5f88>Loading NPS data...</p></div>', 1)
      ])])) : r.value && r.value.total_nps_responses > 0 ? (y(), x("div", rx, [
        c("div", lx, [
          X(Ti, {
            histogram: r.value.histogram || [],
            "min-score": r.value.min_score || 0,
            "max-score": r.value.max_score || 0,
            "q1-score": r.value.q1_score || 0,
            "median-score": r.value.median_score || 0,
            "q3-score": r.value.q3_score || 0,
            "average-score": r.value.average_score || 0,
            "chart-width": l.value,
            "chart-height": dx,
            "chart-margin": ux,
            "chart-bottom-margin": hx
          }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score", "chart-width"])
        ]),
        e.enableExport ? (y(), ct(T(yt), {
          key: 0,
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ])) : (y(), x("div", cx, [...u[4] || (u[4] = [
        tt('<div class="empty-state-content" data-v-30fe5f88><div class="empty-icon-wrapper" data-v-30fe5f88><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-30fe5f88><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-30fe5f88></path></svg></div><p class="empty-title" data-v-30fe5f88>No NPS data available</p><p class="empty-description" data-v-30fe5f88>No NPS data found for the selected period. Try adjusting the date range.</p></div>', 1)
      ])]))
    ]));
  }
}, Pi = /* @__PURE__ */ nt(fx, [["__scopeId", "data-v-30fe5f88"]]), gx = { class: "nps-metrics-container" }, px = {
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
    }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const s = t, a = (n) => {
      s("export", n);
    };
    return (n, o) => (y(), x("div", gx, [
      X(Pi, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: a
      }, null, 8, ["data", "loading", "enable-export"]),
      X(Fi, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: a
      }, null, 8, ["data", "loading", "enable-export"])
    ]));
  }
}, vx = /* @__PURE__ */ nt(px, [["__scopeId", "data-v-25fe3b80"]]), bx = { class: "aws-cost-card" }, mx = { class: "card-header" }, yx = { class: "header-main" }, _x = { class: "header-content" }, xx = { class: "card-title" }, kx = { class: "header-stats" }, wx = { class: "stat-badge primary" }, $x = { class: "stat-value" }, Mx = { class: "stat-badge secondary" }, Sx = { class: "stat-value" }, Cx = { class: "card-body" }, Dx = {
  key: 0,
  class: "loading-state"
}, Ax = {
  key: 1,
  class: "chart-section"
}, Tx = { class: "chart-container" }, Bx = {
  key: 2,
  class: "empty-state"
}, Lx = { class: "empty-state-content" }, Fx = { class: "empty-icon-wrapper" }, Px = {
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
    const t = e, { isDark: s, colors: a } = lt(rt(t, "theme")), n = D(() => {
      const r = t.data ?? {}, l = r.daily, d = r.days, u = Array.isArray(l) && l.length > 0, h = Array.isArray(d) && d.length > 0 && Array.isArray(r.allocatedCostSeries) && r.allocatedCostSeries.length === d.length;
      let f = [];
      return u ? f = l : h && (f = d.map((v, g) => ({
        date: v,
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
    }), o = D(() => {
      const r = n.value.daily;
      return {
        labels: r.map((d) => d.date),
        datasets: [
          {
            label: "Allocated Cost",
            data: r.map((d) => d.allocated_cost),
            borderColor: a.value.primaryLight,
            backgroundColor: s.value ? "rgba(198, 125, 255, 0.15)" : "rgba(198, 125, 255, 0.08)",
            borderWidth: 3,
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.4,
            fill: !0,
            yAxisID: "y"
          },
          {
            label: "AWS Cost",
            data: r.map((d) => d.aws_cost),
            borderColor: "#FF9900",
            // Amazon Orange/Yellow
            backgroundColor: "transparent",
            borderWidth: 3,
            pointRadius: 0,
            tension: 0.4,
            fill: !1,
            yAxisID: "y"
          },
          {
            label: "Airline Conv.",
            data: r.map((d) => d.airline_conversations),
            borderColor: a.value.info,
            backgroundColor: s.value ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)",
            borderWidth: 2,
            pointRadius: 3,
            tension: 0.3,
            yAxisID: "y1"
          }
        ]
      };
    }), i = D(() => ({
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
            usePointStyle: !0,
            pointStyle: "circle",
            padding: 20,
            boxWidth: 8,
            boxHeight: 8,
            color: a.value.textSecondary,
            font: {
              family: "'DM Sans', sans-serif",
              size: 11,
              weight: "600"
            }
          }
        },
        tooltip: {
          padding: 12,
          backgroundColor: a.value.tooltipBg,
          titleColor: a.value.tooltipText,
          bodyColor: a.value.tooltipText,
          borderColor: a.value.tooltipBorder,
          borderWidth: 1,
          cornerRadius: 12,
          displayColors: !0,
          usePointStyle: !0
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
            font: { family: "'DM Sans', sans-serif", size: 10 },
            callback: (r) => dt(r)
          }
        },
        y1: {
          type: "linear",
          display: !0,
          position: "right",
          grid: { display: !1 },
          ticks: {
            color: a.value.textSecondary,
            font: { family: "'DM Sans', sans-serif", size: 10 }
          }
        },
        x: {
          grid: { display: !1 },
          ticks: {
            color: a.value.textSecondary,
            font: { family: "'DM Sans', sans-serif", size: 10 }
          }
        }
      }
    }));
    return (r, l) => (y(), x("article", bx, [
      c("header", mx, [
        c("div", yx, [
          c("div", _x, [
            c("h3", xx, M(n.value.airline_name || "AWS Cost"), 1),
            l[0] || (l[0] = c("p", { class: "card-subtitle" }, "AWS vs Allocated costs over time", -1))
          ]),
          c("div", kx, [
            c("div", wx, [
              l[1] || (l[1] = c("span", { class: "stat-label" }, "Total Allocated", -1)),
              c("span", $x, M(T(dt)(n.value.total_allocated_cost)), 1)
            ]),
            c("div", Mx, [
              l[2] || (l[2] = c("span", { class: "stat-label" }, "Total AWS", -1)),
              c("span", Sx, M(T(dt)(n.value.total_cost)), 1)
            ])
          ])
        ])
      ]),
      c("div", Cx, [
        e.loading ? (y(), x("div", Dx, [...l[3] || (l[3] = [
          tt('<div class="loading-container" data-v-c023bd59><div class="chart-lines-loader" data-v-c023bd59><div class="line line-1" data-v-c023bd59></div><div class="line line-2" data-v-c023bd59></div><div class="line line-3" data-v-c023bd59></div><div class="line line-4" data-v-c023bd59></div><div class="line line-5" data-v-c023bd59></div></div><p class="loading-text" data-v-c023bd59>Loading chart data...</p></div>', 1)
        ])])) : n.value.daily.length > 0 ? (y(), x("div", Ax, [
          c("div", Tx, [
            X(ge, {
              data: o.value,
              options: i.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", Bx, [
          c("div", Lx, [
            c("div", Fx, [
              X(T(It), { class: "empty-icon" })
            ]),
            l[4] || (l[4] = c("p", { class: "empty-title" }, "Sin datos de costos", -1)),
            l[5] || (l[5] = c("p", { class: "empty-description" }, "No se encontró información para el periodo seleccionado. Intenta ajustar el rango de fechas.", -1))
          ])
        ]))
      ])
    ]));
  }
}, Ex = /* @__PURE__ */ nt(Px, [["__scopeId", "data-v-c023bd59"]]), Rx = { class: "cost-usage-card" }, Ix = {
  key: 0,
  class: "card-body"
}, Ox = {
  key: 0,
  class: "chart-section"
}, zx = { class: "chart-container" }, Vx = { class: "kpi-grid" }, Nx = { class: "kpi-card" }, Wx = { class: "kpi-value" }, Hx = { class: "kpi-card" }, jx = { class: "kpi-value" }, Yx = { class: "kpi-card" }, qx = { class: "kpi-value" }, Ux = { class: "kpi-card" }, Kx = { class: "kpi-value" }, Xx = { class: "kpi-card" }, Gx = { class: "kpi-value" }, Zx = { class: "kpi-card highlighted" }, Qx = { class: "kpi-value gradient-text" }, Jx = {
  key: 1,
  class: "empty-state"
}, tk = { class: "empty-state-content" }, ek = { class: "empty-icon-wrapper" }, sk = {
  key: 1,
  class: "loading-state"
}, ak = /* @__PURE__ */ Z({
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
  setup(e, { expose: t, emit: s }) {
    const a = e, { isDark: n, colors: o } = lt(rt(a, "theme")), i = (g) => {
      const _ = new Date(g), m = String(_.getDate()).padStart(2, "0"), p = String(_.getMonth() + 1).padStart(2, "0");
      return `${m}-${p}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = D(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((_, m) => _ + (m.input_cost || 0), 0);
    }), d = D(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((_, m) => _ + (m.output_cost || 0), 0);
    }), u = D(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((_, m) => _ + (m.cache_read_cost || 0), 0);
    }), h = D(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((_, m) => _ + (m.cache_write_cost || 0), 0);
    }), f = D(() => {
      const g = a.data?.costs_by_day || {}, _ = Object.keys(g).sort();
      if (_.length === 0)
        return { labels: [], datasets: [] };
      const m = _.map((b) => i(b)), p = [
        {
          label: "Input Cost",
          data: _.map((b) => g[b]?.input_cost || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: _.map((b) => g[b]?.output_cost || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: _.map((b) => g[b]?.cache_read_cost || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: _.map((b) => g[b]?.cache_write_cost || 0),
          backgroundColor: `${r.cache_write}80`,
          borderColor: r.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: m,
        datasets: p
      };
    }), v = D(() => a.options ? a.options : {
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
            pointStyle: "rectRounded"
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
            label: function(g) {
              let _ = g.dataset.label || "";
              return _ && (_ += ": "), g.parsed.y !== null && (_ += dt(g.parsed.y)), _;
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
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
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
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: o.value.textSecondary,
            padding: 8,
            callback: function(g) {
              return dt(g);
            }
          }
        }
      }
    });
    return t({ isDark: n }), (g, _) => (y(), x("article", Rx, [
      _[9] || (_[9] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Cost Usage"),
          c("p", { class: "card-subtitle" }, "Cost breakdown over time (stacked)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", sk, [..._[8] || (_[8] = [
        tt('<div class="loading-container" data-v-62f96954><div class="chart-lines-loader" data-v-62f96954><div class="line line-1" data-v-62f96954></div><div class="line line-2" data-v-62f96954></div><div class="line line-3" data-v-62f96954></div><div class="line line-4" data-v-62f96954></div><div class="line line-5" data-v-62f96954></div></div><p class="loading-text" data-v-62f96954>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", Ix, [
        f.value.labels && f.value.labels.length ? (y(), x("section", Ox, [
          c("div", zx, [
            X(ne, {
              data: f.value,
              options: v.value,
              stacked: !0
            }, null, 8, ["data", "options"])
          ]),
          c("footer", Vx, [
            c("div", Nx, [
              _[0] || (_[0] = c("span", { class: "kpi-label" }, "Total Cost", -1)),
              c("span", Wx, M(T(dt)(e.data.total_cost)), 1)
            ]),
            c("div", Hx, [
              _[1] || (_[1] = c("span", { class: "kpi-label" }, "Input Cost", -1)),
              c("span", jx, M(T(dt)(l.value)), 1)
            ]),
            c("div", Yx, [
              _[2] || (_[2] = c("span", { class: "kpi-label" }, "Output Cost", -1)),
              c("span", qx, M(T(dt)(d.value)), 1)
            ]),
            c("div", Ux, [
              _[3] || (_[3] = c("span", { class: "kpi-label" }, "Cache Read", -1)),
              c("span", Kx, M(T(dt)(u.value)), 1)
            ]),
            c("div", Xx, [
              _[4] || (_[4] = c("span", { class: "kpi-label" }, "Cache Write", -1)),
              c("span", Gx, M(T(dt)(h.value)), 1)
            ]),
            c("div", Zx, [
              _[5] || (_[5] = c("span", { class: "kpi-label" }, "Avg / Conv.", -1)),
              c("span", Qx, M(T(dt)(e.data.avg_cost_per_conversation)), 1)
            ])
          ])
        ])) : (y(), x("section", Jx, [
          c("div", tk, [
            c("div", ek, [
              X(T(It), { class: "empty-icon" })
            ]),
            _[6] || (_[6] = c("p", { class: "empty-title" }, "No cost usage data", -1)),
            _[7] || (_[7] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see cost breakdown trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), nk = /* @__PURE__ */ nt(ak, [["__scopeId", "data-v-62f96954"]]), ok = { class: "token-usage-card" }, ik = {
  key: 0,
  class: "card-body"
}, rk = {
  key: 0,
  class: "chart-section"
}, lk = { class: "chart-container" }, ck = { class: "kpi-grid" }, dk = { class: "kpi-card" }, uk = { class: "kpi-value" }, hk = { class: "kpi-card" }, fk = { class: "kpi-value" }, gk = { class: "kpi-card" }, pk = { class: "kpi-value" }, vk = { class: "kpi-card" }, bk = { class: "kpi-value" }, mk = { class: "kpi-card" }, yk = { class: "kpi-value" }, _k = {
  key: 1,
  class: "empty-state"
}, xk = { class: "empty-state-content" }, kk = { class: "empty-icon-wrapper" }, wk = {
  key: 1,
  class: "loading-state"
}, $k = /* @__PURE__ */ Z({
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
  setup(e, { expose: t, emit: s }) {
    const a = e, { isDark: n, colors: o } = lt(rt(a, "theme")), i = (u) => {
      const h = new Date(u), f = String(h.getDate()).padStart(2, "0"), v = String(h.getMonth() + 1).padStart(2, "0");
      return `${f}-${v}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = D(() => {
      const u = a.data?.tokens_by_day || {}, h = Object.keys(u).sort();
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const f = h.map((g) => i(g)), v = [
        {
          label: "Input Tokens",
          data: h.map((g) => u[g]?.input_tokens || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Tokens",
          data: h.map((g) => u[g]?.output_tokens || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read",
          data: h.map((g) => u[g]?.cache_read_tokens || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write",
          data: h.map((g) => u[g]?.cache_write_tokens || 0),
          backgroundColor: `${r.cache_write}80`,
          borderColor: r.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: f,
        datasets: v
      };
    }), d = D(() => a.options ? a.options : {
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
            pointStyle: "rectRounded"
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
          }
        }
      },
      scales: {
        x: {
          stacked: !0,
          border: { display: !1 },
          grid: { display: !1 },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
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
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: o.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: n }), (u, h) => (y(), x("article", ok, [
      h[8] || (h[8] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Token Usage"),
          c("p", { class: "card-subtitle" }, "Token consumption over time (stacked)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", wk, [...h[7] || (h[7] = [
        tt('<div class="loading-container" data-v-e9e355be><div class="chart-lines-loader" data-v-e9e355be><div class="line line-1" data-v-e9e355be></div><div class="line line-2" data-v-e9e355be></div><div class="line line-3" data-v-e9e355be></div><div class="line line-4" data-v-e9e355be></div><div class="line line-5" data-v-e9e355be></div></div><p class="loading-text" data-v-e9e355be>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", ik, [
        l.value.labels && l.value.labels.length ? (y(), x("section", rk, [
          c("div", lk, [
            X(ne, {
              data: l.value,
              options: d.value,
              stacked: !0
            }, null, 8, ["data", "options"])
          ]),
          c("footer", ck, [
            c("div", dk, [
              h[0] || (h[0] = c("span", { class: "kpi-label" }, "Total Tokens", -1)),
              c("span", uk, M(T(j)(e.data.total_tokens)), 1)
            ]),
            c("div", hk, [
              h[1] || (h[1] = c("span", { class: "kpi-label" }, "Input", -1)),
              c("span", fk, M(T(j)(e.data.total_input_tokens)), 1)
            ]),
            c("div", gk, [
              h[2] || (h[2] = c("span", { class: "kpi-label" }, "Output", -1)),
              c("span", pk, M(T(j)(e.data.total_output_tokens)), 1)
            ]),
            c("div", vk, [
              h[3] || (h[3] = c("span", { class: "kpi-label" }, "Cache Read", -1)),
              c("span", bk, M(T(j)(e.data.total_cache_read_tokens)), 1)
            ]),
            c("div", mk, [
              h[4] || (h[4] = c("span", { class: "kpi-label" }, "Cache Write", -1)),
              c("span", yk, M(T(j)(e.data.total_cache_write_tokens)), 1)
            ])
          ])
        ])) : (y(), x("section", _k, [
          c("div", xk, [
            c("div", kk, [
              X(T(It), { class: "empty-icon" })
            ]),
            h[5] || (h[5] = c("p", { class: "empty-title" }, "No token usage data", -1)),
            h[6] || (h[6] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see token consumption trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Mk = /* @__PURE__ */ nt($k, [["__scopeId", "data-v-e9e355be"]]), Sk = { class: "conversation-count-card" }, Ck = { class: "card-header" }, Dk = { class: "header-right" }, Ak = { class: "stat-badge" }, Tk = { class: "stat-value" }, Bk = {
  key: 0,
  class: "card-body"
}, Lk = {
  key: 0,
  class: "chart-section"
}, Fk = { class: "chart-container" }, Pk = {
  key: 1,
  class: "empty-state"
}, Ek = { class: "empty-state-content" }, Rk = { class: "empty-icon-wrapper" }, Ik = {
  key: 1,
  class: "loading-state"
}, Ok = /* @__PURE__ */ Z({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: a, colors: n } = lt(rt(s, "theme")), o = (l) => {
      const d = new Date(l), u = String(d.getDate()).padStart(2, "0");
      return `${String(d.getMonth() + 1).padStart(2, "0")}-${u}`;
    };
    D(() => {
      if (s.data?.start_date && s.data?.end_date) {
        const l = o(s.data.start_date), d = o(s.data.end_date);
        return `${l} - ${d}`;
      }
      return "N/A";
    });
    const i = D(() => {
      const l = s.data?.conversations_by_day || {}, d = Object.keys(l).sort();
      if (d.length === 0)
        return { labels: [], datasets: [] };
      const u = d.map((f) => o(f)), h = [
        {
          label: "Conversations",
          data: d.map((f) => l[f] || 0),
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
        labels: u,
        datasets: h
      };
    }), r = D(() => s.options ? s.options : {
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
            color: n.value.textSecondary,
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
          backgroundColor: n.value.tooltipBg,
          titleColor: n.value.tooltipText,
          bodyColor: n.value.tooltipText,
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
            label: function(l) {
              let d = l.dataset.label || "";
              return d && (d += ": "), l.parsed.y !== null && (d += l.parsed.y), d;
            }
          }
        }
      },
      scales: {
        x: {
          border: { display: !1 },
          grid: { color: n.value.gridLines, lineWidth: 1, drawTicks: !1 },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: n.value.textSecondary,
            padding: 8
          }
        },
        y: {
          beginAtZero: !0,
          border: { display: !1 },
          grid: {
            color: n.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: n.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: a }), (l, d) => (y(), x("article", Sk, [
      c("header", Ck, [
        d[1] || (d[1] = c("div", { class: "header-left" }, [
          c("div", { class: "header-content" }, [
            c("h3", { class: "card-title" }, "Conversation Count"),
            c("p", { class: "card-subtitle" }, "Conversations over time")
          ])
        ], -1)),
        c("div", Dk, [
          c("div", Ak, [
            d[0] || (d[0] = c("span", { class: "stat-label" }, "Total", -1)),
            c("span", Tk, M(e.data.total_conversations || 0), 1)
          ])
        ])
      ]),
      e.loading ? (y(), x("div", Ik, [...d[4] || (d[4] = [
        tt('<div class="loading-container" data-v-846f24b1><div class="chart-lines-loader" data-v-846f24b1><div class="line line-1" data-v-846f24b1></div><div class="line line-2" data-v-846f24b1></div><div class="line line-3" data-v-846f24b1></div><div class="line line-4" data-v-846f24b1></div><div class="line line-5" data-v-846f24b1></div></div><p class="loading-text" data-v-846f24b1>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", Bk, [
        i.value.labels && i.value.labels.length ? (y(), x("section", Lk, [
          c("div", Fk, [
            X(ge, {
              data: i.value,
              options: r.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", Pk, [
          c("div", Ek, [
            c("div", Rk, [
              X(T(It), { class: "empty-icon" })
            ]),
            d[2] || (d[2] = c("p", { class: "empty-title" }, "No conversation count data", -1)),
            d[3] || (d[3] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), zk = /* @__PURE__ */ nt(Ok, [["__scopeId", "data-v-846f24b1"]]), Vk = { class: "top-agents-card" }, Nk = {
  key: 0,
  class: "card-body"
}, Wk = {
  key: 0,
  class: "charts-grid"
}, Hk = { class: "chart-section" }, jk = { class: "chart-container" }, Yk = { class: "chart-section" }, qk = { class: "chart-container" }, Uk = {
  key: 1,
  class: "empty-state"
}, Kk = { class: "empty-state-content" }, Xk = { class: "empty-icon-wrapper" }, Gk = {
  key: 1,
  class: "loading-state"
}, Zk = /* @__PURE__ */ Z({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: a, colors: n } = lt(rt(s, "theme")), o = D(() => s.data?.top_agents && s.data.top_agents.length > 0), i = D(() => s.data?.top_agents ? [...s.data.top_agents].sort((f, v) => (v.total_cost || 0) - (f.total_cost || 0)) : []), r = D(() => s.data?.top_agents ? [...s.data.top_agents].sort((f, v) => (v.total_tokens || 0) - (f.total_tokens || 0)) : []), l = D(() => {
      const f = i.value;
      return f.length === 0 ? { labels: [], datasets: [] } : {
        labels: f.map((v) => v.agent_type),
        datasets: [
          {
            label: "Total Cost",
            data: f.map((v) => v.total_cost || 0),
            backgroundColor: "#a78bfa80",
            borderColor: "#a78bfa",
            borderWidth: 1
          }
        ]
      };
    }), d = D(() => {
      const f = r.value;
      return f.length === 0 ? { labels: [], datasets: [] } : {
        labels: f.map((v) => v.agent_type),
        datasets: [
          {
            label: "Total Tokens",
            data: f.map((v) => v.total_tokens || 0),
            backgroundColor: "#f59e0b80",
            borderColor: "#f59e0b",
            borderWidth: 1
          }
        ]
      };
    }), u = D(() => s.options ? s.options : {
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: {
          display: !1
        },
        tooltip: {
          enabled: !0,
          backgroundColor: n.value.tooltipBg,
          titleColor: n.value.tooltipText,
          bodyColor: n.value.tooltipText,
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
              const v = f.label, g = s.data?.top_agents?.find((_) => _.agent_type === v);
              return g ? [
                `Total Cost: ${dt(g.total_cost)}`,
                `Input Cost: ${dt(g.total_input_tokens_cost)}`,
                `Output Cost: ${dt(g.total_output_tokens_cost)}`,
                `Cache Read: ${dt(g.total_read_tokens_cost)}`,
                `Cache Write: ${dt(g.total_write_tokens_cost)}`
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
            color: n.value.textSecondary,
            padding: 8
          }
        },
        y: {
          beginAtZero: !0,
          border: { display: !1 },
          grid: {
            color: n.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: n.value.textSecondary,
            padding: 8,
            callback: function(f) {
              return dt(f);
            }
          }
        }
      }
    }), h = D(() => s.options ? s.options : {
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: {
          display: !1
        },
        tooltip: {
          enabled: !0,
          backgroundColor: n.value.tooltipBg,
          titleColor: n.value.tooltipText,
          bodyColor: n.value.tooltipText,
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
              const v = f.label, g = s.data?.top_agents?.find((_) => _.agent_type === v);
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
            color: n.value.textSecondary,
            padding: 8
          }
        },
        y: {
          beginAtZero: !0,
          border: { display: !1 },
          grid: {
            color: n.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: n.value.textSecondary,
            padding: 8,
            callback: function(f) {
              return f.toLocaleString();
            }
          }
        }
      }
    });
    return t({ isDark: a }), (f, v) => (y(), x("article", Vk, [
      v[5] || (v[5] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Top Agents Analysis"),
          c("p", { class: "card-subtitle" }, "Cost and token usage by agent")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Gk, [...v[4] || (v[4] = [
        tt('<div class="loading-container" data-v-78efa6dc><div class="chart-lines-loader" data-v-78efa6dc><div class="line line-1" data-v-78efa6dc></div><div class="line line-2" data-v-78efa6dc></div><div class="line line-3" data-v-78efa6dc></div><div class="line line-4" data-v-78efa6dc></div><div class="line line-5" data-v-78efa6dc></div></div><p class="loading-text" data-v-78efa6dc>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", Nk, [
        o.value ? (y(), x("div", Wk, [
          c("section", Hk, [
            v[0] || (v[0] = c("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
            c("div", jk, [
              X(ne, {
                data: l.value,
                options: u.value
              }, null, 8, ["data", "options"])
            ])
          ]),
          c("section", Yk, [
            v[1] || (v[1] = c("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
            c("div", qk, [
              X(ne, {
                data: d.value,
                options: h.value
              }, null, 8, ["data", "options"])
            ])
          ])
        ])) : (y(), x("section", Uk, [
          c("div", Kk, [
            c("div", Xk, [
              X(T(It), { class: "empty-icon" })
            ]),
            v[2] || (v[2] = c("p", { class: "empty-title" }, "No top agents data", -1)),
            v[3] || (v[3] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent analysis.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Qk = /* @__PURE__ */ nt(Zk, [["__scopeId", "data-v-78efa6dc"]]), Jk = { class: "top-agents-card" }, t5 = {
  key: 0,
  class: "card-body"
}, e5 = {
  key: 0,
  class: "chart-section"
}, s5 = { class: "chart-container" }, a5 = {
  key: 1,
  class: "empty-state"
}, n5 = { class: "empty-state-content" }, o5 = { class: "empty-icon-wrapper" }, i5 = {
  key: 1,
  class: "loading-state"
}, r5 = /* @__PURE__ */ Z({
  __name: "TopAgents",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: a, colors: n } = lt(rt(s, "theme")), o = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, i = D(() => s.data?.top_agents ? s.data.top_agents.filter(
      (h) => h.agent_type?.toLowerCase() !== "triage"
    ) : []), r = D(() => i.value.length > 0), l = D(() => i.value.reduce((h, f) => h + (f.conversations || 0), 0)), d = D(() => {
      const h = i.value;
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const f = h.map((_) => {
        const m = _.agent_type?.toLowerCase();
        return (o[m] || "#a78bfa") + "80";
      }), v = h.map((_) => {
        const m = _.agent_type?.toLowerCase();
        return o[m] || "#a78bfa";
      });
      return {
        labels: h.map((_) => {
          const m = _.conversations || 0, p = l.value ? m / l.value * 100 : 0;
          return `${_.agent_type} - ${m.toLocaleString()} (${p.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: h.map((_) => _.conversations || 0),
            backgroundColor: f,
            borderColor: v,
            borderWidth: 2
          }
        ]
      };
    }), u = D(() => s.options ? s.options : {
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
            color: n.value.textSecondary,
            usePointStyle: !0,
            padding: 16,
            boxWidth: 8,
            boxHeight: 8
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: n.value.tooltipBg,
          titleColor: n.value.tooltipText,
          bodyColor: n.value.tooltipText,
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
              const f = (h.label || "").toString(), v = Number(h.parsed) || 0, g = (h.dataset.data || []).reduce((m, p) => m + (Number(p) || 0), 0), _ = g ? v / g * 100 : 0;
              return `${f}: ${v.toLocaleString()} (${_.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: a }), (h, f) => (y(), x("article", Jk, [
      f[3] || (f[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Top Agents"),
          c("p", { class: "card-subtitle" }, "Interactions by agent (excluding triage)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", i5, [...f[2] || (f[2] = [
        tt('<div class="loading-container" data-v-05e3e74d><div class="chart-lines-loader" data-v-05e3e74d><div class="line line-1" data-v-05e3e74d></div><div class="line line-2" data-v-05e3e74d></div><div class="line line-3" data-v-05e3e74d></div><div class="line line-4" data-v-05e3e74d></div><div class="line line-5" data-v-05e3e74d></div></div><p class="loading-text" data-v-05e3e74d>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", t5, [
        r.value ? (y(), x("section", e5, [
          c("div", s5, [
            X(Ys, {
              data: d.value,
              options: u.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", a5, [
          c("div", n5, [
            c("div", o5, [
              X(T(It), { class: "empty-icon" })
            ]),
            f[0] || (f[0] = c("p", { class: "empty-title" }, "No top agents data", -1)),
            f[1] || (f[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), l5 = /* @__PURE__ */ nt(r5, [["__scopeId", "data-v-05e3e74d"]]), c5 = { class: "daily-cost-trends-card" }, d5 = {
  key: 0,
  class: "card-body"
}, u5 = {
  key: 0,
  class: "chart-section"
}, h5 = { class: "chart-container" }, f5 = {
  key: 1,
  class: "empty-state"
}, g5 = { class: "empty-state-content" }, p5 = { class: "empty-icon-wrapper" }, v5 = {
  key: 1,
  class: "loading-state"
}, b5 = /* @__PURE__ */ Z({
  __name: "DailyCostTrends",
  props: {
    costData: { default: () => ({}) },
    conversationData: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: a, colors: n } = lt(rt(s, "theme")), o = (d) => {
      const u = new Date(d), h = String(u.getDate()).padStart(2, "0");
      return `${String(u.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = D(() => {
      const d = s.costData?.daily_mean_cost_per_conversation || [];
      if (Array.isArray(d) && d.length > 0)
        return !0;
      const u = s.costData?.costs_by_day || {}, h = s.conversationData?.conversations_by_day || {};
      return Object.keys(u).length > 0 && Object.keys(h).length > 0;
    }), r = D(() => {
      const d = s.costData?.daily_mean_cost_per_conversation || [];
      if (d.length > 0) {
        const m = [...d].sort((p, b) => p.date.localeCompare(b.date));
        return {
          labels: m.map((p) => o(p.date)),
          datasets: [
            {
              label: "Mean USD/conv",
              data: m.map((p) => Number(p.value) || 0),
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
      const u = s.costData?.costs_by_day || {}, h = s.conversationData?.conversations_by_day || {}, v = Object.keys(u).filter((m) => h[m]).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const g = v.map((m) => o(m)), _ = v.map((m) => {
        const p = u[m]?.total_cost || 0, b = h[m] || 0;
        return b > 0 ? p / b : 0;
      });
      return {
        labels: g,
        datasets: [
          {
            label: "Mean USD/conv",
            data: _,
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
    }), l = D(() => s.options ? s.options : {
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
            color: n.value.textSecondary,
            padding: 12,
            boxWidth: 40,
            boxHeight: 12,
            borderRadius: 4,
            usePointStyle: !1
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: n.value.tooltipBg,
          titleColor: n.value.tooltipText,
          bodyColor: n.value.tooltipText,
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
              return u && (u += ": "), d.parsed.y !== null && (u += dt(d.parsed.y)), u;
            }
          }
        }
      },
      scales: {
        x: {
          border: { display: !1 },
          grid: { color: n.value.gridLines, lineWidth: 1, drawTicks: !1 },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: n.value.textSecondary,
            padding: 8
          }
        },
        y: {
          beginAtZero: !0,
          border: { display: !1 },
          grid: {
            color: n.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: n.value.textSecondary,
            padding: 8,
            callback: function(d) {
              return dt(d);
            }
          }
        }
      }
    });
    return t({ isDark: a }), (d, u) => (y(), x("article", c5, [
      u[3] || (u[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Daily Cost Trends"),
          c("p", { class: "card-subtitle" }, "Mean USD/conversation per day")
        ])
      ], -1)),
      e.loading ? (y(), x("div", v5, [...u[2] || (u[2] = [
        tt('<div class="loading-container" data-v-e5bac1c5><div class="chart-lines-loader" data-v-e5bac1c5><div class="line line-1" data-v-e5bac1c5></div><div class="line line-2" data-v-e5bac1c5></div><div class="line line-3" data-v-e5bac1c5></div><div class="line line-4" data-v-e5bac1c5></div><div class="line line-5" data-v-e5bac1c5></div></div><p class="loading-text" data-v-e5bac1c5>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", d5, [
        i.value ? (y(), x("section", u5, [
          c("div", h5, [
            X(ge, {
              data: r.value,
              options: l.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", f5, [
          c("div", g5, [
            c("div", p5, [
              X(T(It), { class: "empty-icon" })
            ]),
            u[0] || (u[0] = c("p", { class: "empty-title" }, "No daily cost trends data", -1)),
            u[1] || (u[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), m5 = /* @__PURE__ */ nt(b5, [["__scopeId", "data-v-e5bac1c5"]]), y5 = { class: "model-usage-card" }, _5 = {
  key: 0,
  class: "loading-state"
}, x5 = {
  key: 1,
  class: "card-body"
}, k5 = { class: "tabs-container" }, w5 = {
  class: "tabs-nav",
  "aria-label": "Model Usage Tabs"
}, $5 = ["aria-selected"], M5 = ["aria-selected"], S5 = {
  key: 0,
  class: "table-section"
}, C5 = { class: "table-wrapper" }, D5 = { class: "data-table" }, A5 = { class: "table-header-row" }, T5 = { class: "table-header" }, B5 = { class: "table-body" }, L5 = { class: "table-cell name-cell" }, F5 = { class: "table-cell text-center" }, P5 = { class: "table-cell text-center" }, E5 = { class: "table-cell text-center" }, R5 = { class: "table-cell text-center cost-cell" }, I5 = { class: "table-cell text-center" }, O5 = {
  key: 1,
  class: "empty-state"
}, z5 = { class: "empty-state-content" }, V5 = { class: "empty-icon-wrapper" }, N5 = /* @__PURE__ */ Z({
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
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, o = (h) => {
      n("export", h);
    }, { isDark: i } = lt(rt(a, "theme")), r = st("by_model"), l = D(() => r.value === "by_model" ? a.data?.total_by_model || {} : a.data?.total_by_provider || {}), d = (h) => h == null ? "0" : j(h), u = (h) => h == null ? "$0.00" : dt(h);
    return t({ isDark: i }), (h, f) => (y(), x("article", y5, [
      f[10] || (f[10] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Model Usage"),
          c("p", { class: "card-subtitle" }, "AI model performance and costs")
        ])
      ], -1)),
      e.loading ? (y(), x("div", _5, [...f[2] || (f[2] = [
        tt('<div class="loading-container" data-v-a7bf2d7b><div class="chart-bars-loader" data-v-a7bf2d7b><div class="bar bar-1" data-v-a7bf2d7b></div><div class="bar bar-2" data-v-a7bf2d7b></div><div class="bar bar-3" data-v-a7bf2d7b></div><div class="bar bar-4" data-v-a7bf2d7b></div><div class="bar bar-5" data-v-a7bf2d7b></div></div><p class="loading-text" data-v-a7bf2d7b>Loading model usage data...</p></div>', 1)
      ])])) : (y(), x("div", x5, [
        c("div", k5, [
          c("nav", w5, [
            c("button", {
              onClick: f[0] || (f[0] = (v) => r.value = "by_model"),
              class: G(["tab-button", { "tab-active": r.value === "by_model" }]),
              "aria-selected": r.value === "by_model",
              role: "tab"
            }, " Model ", 10, $5),
            c("button", {
              onClick: f[1] || (f[1] = (v) => r.value = "by_provider"),
              class: G(["tab-button", { "tab-active": r.value === "by_provider" }]),
              "aria-selected": r.value === "by_provider",
              role: "tab"
            }, " Provider ", 10, M5)
          ])
        ]),
        l.value && Object.keys(l.value).length > 0 ? (y(), x("div", S5, [
          c("div", C5, [
            c("table", D5, [
              c("thead", null, [
                c("tr", A5, [
                  c("th", T5, M(r.value === "by_model" ? "Model" : "Provider"), 1),
                  f[3] || (f[3] = c("th", { class: "table-header" }, "Avg cost per message", -1)),
                  f[4] || (f[4] = c("th", { class: "table-header" }, "Avg tokens per message", -1)),
                  f[5] || (f[5] = c("th", { class: "table-header" }, "Message count", -1)),
                  f[6] || (f[6] = c("th", { class: "table-header" }, "Total cost", -1)),
                  f[7] || (f[7] = c("th", { class: "table-header" }, "Total tokens", -1))
                ])
              ]),
              c("tbody", B5, [
                (y(!0), x(q, null, J(l.value, (v, g) => (y(), x("tr", {
                  key: g,
                  class: "table-row"
                }, [
                  c("td", L5, M(g), 1),
                  c("td", F5, M(u(v.avg_cost_per_message)), 1),
                  c("td", P5, M(d(v.avg_tokens_per_message)), 1),
                  c("td", E5, M(d(v.message_count)), 1),
                  c("td", R5, M(u(v.total_cost)), 1),
                  c("td", I5, M(d(v.total_tokens)), 1)
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), ct(T(yt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("div", O5, [
          c("div", z5, [
            c("div", V5, [
              X(T(It), { class: "empty-icon" })
            ]),
            f[8] || (f[8] = c("p", { class: "empty-title" }, "No model usage data available", -1)),
            f[9] || (f[9] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see model performance metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), W5 = /* @__PURE__ */ nt(N5, [["__scopeId", "data-v-a7bf2d7b"]]), H5 = { class: "message-roles-card" }, j5 = {
  key: 0,
  class: "loading-state"
}, Y5 = {
  key: 1,
  class: "card-body"
}, q5 = {
  key: 0,
  class: "table-section"
}, U5 = { class: "table-wrapper" }, K5 = { class: "data-table" }, X5 = { class: "table-body" }, G5 = { class: "table-cell name-cell" }, Z5 = { class: "table-cell text-center" }, Q5 = { class: "table-cell text-center" }, J5 = { class: "table-cell text-center" }, tw = { class: "table-cell text-center cost-cell" }, ew = { class: "table-cell text-center" }, sw = {
  key: 1,
  class: "empty-state"
}, aw = { class: "empty-state-content" }, nw = { class: "empty-icon-wrapper" }, ow = /* @__PURE__ */ Z({
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
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, o = (v) => {
      n("export", v);
    }, { isDark: i } = lt(rt(a, "theme")), r = ["assistant", "system", "user"], l = D(() => a.data?.total_by_role || {}), d = D(() => Object.keys(l.value).length > 0), u = (v) => v == null ? "0" : j(v), h = (v) => v == null ? "$0.00" : dt(v), f = (v) => v.charAt(0).toUpperCase() + v.slice(1);
    return t({ isDark: i }), (v, g) => (y(), x("article", H5, [
      g[4] || (g[4] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Message Roles"),
          c("p", { class: "card-subtitle" }, "Performance by message role")
        ])
      ], -1)),
      e.loading ? (y(), x("div", j5, [...g[0] || (g[0] = [
        tt('<div class="loading-container" data-v-6a953cfc><div class="chart-bars-loader" data-v-6a953cfc><div class="bar bar-1" data-v-6a953cfc></div><div class="bar bar-2" data-v-6a953cfc></div><div class="bar bar-3" data-v-6a953cfc></div><div class="bar bar-4" data-v-6a953cfc></div><div class="bar bar-5" data-v-6a953cfc></div></div><p class="loading-text" data-v-6a953cfc>Loading message role data...</p></div>', 1)
      ])])) : (y(), x("div", Y5, [
        d.value ? (y(), x("div", q5, [
          c("div", U5, [
            c("table", K5, [
              g[1] || (g[1] = c("thead", null, [
                c("tr", { class: "table-header-row" }, [
                  c("th", { class: "table-header" }, "Role"),
                  c("th", { class: "table-header" }, "Avg cost per message"),
                  c("th", { class: "table-header" }, "Avg tokens per message"),
                  c("th", { class: "table-header" }, "Message count"),
                  c("th", { class: "table-header" }, "Total cost"),
                  c("th", { class: "table-header" }, "Total tokens")
                ])
              ], -1)),
              c("tbody", X5, [
                (y(), x(q, null, J(r, (_) => c("tr", {
                  key: _,
                  class: "table-row"
                }, [
                  c("td", G5, M(f(_)), 1),
                  c("td", Z5, M(h(l.value[_]?.avg_cost_per_message)), 1),
                  c("td", Q5, M(u(l.value[_]?.avg_tokens_per_message)), 1),
                  c("td", J5, M(u(l.value[_]?.message_count)), 1),
                  c("td", tw, M(h(l.value[_]?.total_cost)), 1),
                  c("td", ew, M(u(l.value[_]?.total_tokens)), 1)
                ])), 64))
              ])
            ])
          ]),
          e.enableExport ? (y(), ct(T(yt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("div", sw, [
          c("div", aw, [
            c("div", nw, [
              X(T(It), { class: "empty-icon" })
            ]),
            g[2] || (g[2] = c("p", { class: "empty-title" }, "No message role data available", -1)),
            g[3] || (g[3] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), iw = /* @__PURE__ */ nt(ow, [["__scopeId", "data-v-6a953cfc"]]), rw = { class: "cost-per-conversation-card" }, lw = {
  key: 0,
  class: "card-body"
}, cw = {
  key: 0,
  class: "chart-section"
}, dw = { class: "chart-container" }, uw = { class: "kpi-grid" }, hw = { class: "kpi-card" }, fw = { class: "kpi-value" }, gw = { class: "kpi-card" }, pw = { class: "kpi-value" }, vw = { class: "kpi-card" }, bw = { class: "kpi-value" }, mw = { class: "kpi-card highlighted" }, yw = { class: "kpi-value gradient-text" }, _w = {
  key: 1,
  class: "empty-state"
}, xw = { class: "empty-state-content" }, kw = { class: "empty-icon-wrapper" }, ww = {
  key: 1,
  class: "loading-state"
}, $w = /* @__PURE__ */ Z({
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
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, o = (b) => {
      n("export", b);
    }, { isDark: i, colors: r } = lt(rt(a, "theme")), l = {
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
    }, d = (b) => b.agent_type || b.agent_id || b.agent_name || "", u = (b) => b.agent_name ? b.agent_name : d(b).split("_").map((k) => k.charAt(0).toUpperCase() + k.slice(1)).join(" ").replace(/V\d+$/, "").trim(), h = (b) => {
      const $ = d(b).toLowerCase();
      for (const [k, w] of Object.entries(l))
        if ($.includes(k))
          return w;
      return "#9ca3af";
    }, f = D(() => [...a.data?.top_agents || []].sort(($, k) => k.avg_cost_per_conversation - $.avg_cost_per_conversation)), v = D(() => a.data?.total_conversations !== void 0 ? Number(a.data.total_conversations) || 0 : f.value.reduce((b, $) => b + $.conversations, 0)), g = D(() => a.data?.total_cost !== void 0 ? Number(a.data.total_cost) || 0 : f.value.reduce((b, $) => b + $.total_cost, 0)), _ = D(() => a.data?.overall_avg_cost_per_conversation !== void 0 ? Number(a.data.overall_avg_cost_per_conversation) || 0 : v.value === 0 ? 0 : g.value / v.value), m = D(() => {
      const b = f.value;
      if (b.length === 0)
        return { labels: [], datasets: [] };
      const $ = b.map((S) => u(S)), k = b.map((S) => S.avg_cost_per_conversation), w = b.map((S) => h(S));
      return {
        labels: $,
        datasets: [
          {
            label: "USD per conversation",
            data: k,
            backgroundColor: w.map((S) => `${S}80`),
            borderColor: w,
            borderWidth: 1
          }
        ]
      };
    }), p = D(() => a.options ? a.options : {
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
            label: function(b) {
              const $ = f.value[b.dataIndex];
              return [
                `Cost: ${dt(b.parsed.x)}`,
                `Conversations: ${j($.conversations)}`,
                `Total Cost: ${dt($.total_cost)}`
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
            color: r.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: r.value.textSecondary,
            padding: 8,
            callback: function(b) {
              return dt(b);
            }
          }
        },
        y: {
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
    return t({ isDark: i }), (b, $) => (y(), x("article", rw, [
      $[7] || ($[7] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Cost Per Conversation"),
          c("p", { class: "card-subtitle" }, "USD per conversation by agent")
        ])
      ], -1)),
      e.loading ? (y(), x("div", ww, [...$[6] || ($[6] = [
        tt('<div class="loading-container" data-v-17f6615c><div class="chart-bars-loader" data-v-17f6615c><div class="bar bar-1" data-v-17f6615c></div><div class="bar bar-2" data-v-17f6615c></div><div class="bar bar-3" data-v-17f6615c></div><div class="bar bar-4" data-v-17f6615c></div><div class="bar bar-5" data-v-17f6615c></div></div><p class="loading-text" data-v-17f6615c>Loading agent costs...</p></div>', 1)
      ])])) : (y(), x("div", lw, [
        m.value.labels && m.value.labels.length ? (y(), x("section", cw, [
          c("div", dw, [
            X(ne, {
              data: m.value,
              options: p.value
            }, null, 8, ["data", "options"])
          ]),
          c("footer", uw, [
            c("div", hw, [
              $[0] || ($[0] = c("span", { class: "kpi-label" }, "Total Agents", -1)),
              c("span", fw, M(f.value.length), 1)
            ]),
            c("div", gw, [
              $[1] || ($[1] = c("span", { class: "kpi-label" }, "Total Conversations", -1)),
              c("span", pw, M(T(j)(v.value)), 1)
            ]),
            c("div", vw, [
              $[2] || ($[2] = c("span", { class: "kpi-label" }, "Total Cost", -1)),
              c("span", bw, M(T(dt)(g.value)), 1)
            ]),
            c("div", mw, [
              $[3] || ($[3] = c("span", { class: "kpi-label" }, "Avg Cost / Conv.", -1)),
              c("span", yw, M(T(dt)(_.value)), 1)
            ])
          ]),
          e.enableExport ? (y(), ct(T(yt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", _w, [
          c("div", xw, [
            c("div", kw, [
              X(T(It), { class: "empty-icon" })
            ]),
            $[4] || ($[4] = c("p", { class: "empty-title" }, "No cost per conversation data", -1)),
            $[5] || ($[5] = c("p", { class: "empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Mw = /* @__PURE__ */ nt($w, [["__scopeId", "data-v-17f6615c"]]);
function Nt() {
  const e = new Uint8Array(8);
  return globalThis.crypto.getRandomValues(e), Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("");
}
const Sw = { class: "tabs text-sm" }, Cw = ["aria-label"], Dw = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], Aw = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, Tw = /* @__PURE__ */ Z({
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
    const s = e, a = t, n = st([]), o = `tabs-${Nt()}`, i = (g) => `${o}-tab-${g}`, r = D(
      () => s.items.map((g, _) => g.disabled ? -1 : _).filter((g) => g >= 0)
    );
    function l(g) {
      return g.value === s.modelValue;
    }
    function d(g) {
      const _ = l(g), p = `${s.fullWidth ? "relative flex min-w-0 flex-1" : "relative inline-flex max-w-full shrink-0"} cursor-pointer rounded-lg border border-transparent text-center outline-none transition-[background-color,color,box-shadow,opacity,transform] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100`;
      return g.disabled ? `${p} cursor-not-allowed opacity-40` : _ ? `${p} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]` : `${p} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function u(g, _) {
      g === _ || s.items.find((p) => p.value === g)?.disabled || (a("update:modelValue", g), a("change", { value: g, previousValue: _ }));
    }
    function h(g, _) {
      a("tab-click", { value: g.value, originalEvent: _ }), !g.disabled && (u(g.value, s.modelValue), St(() => {
        n.value[s.items.indexOf(g)]?.focus();
      }));
    }
    function f(g, _) {
      const m = s.items.length;
      if (m === 0) return 0;
      let p = g;
      for (let b = 0; b < m; b++)
        if (p = (p + _ + m) % m, !s.items[p]?.disabled) return p;
      return g;
    }
    async function v(g, _) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(g.key)) return;
      g.preventDefault();
      let p = _;
      g.key === "ArrowLeft" ? p = f(_, -1) : g.key === "ArrowRight" ? p = f(_, 1) : g.key === "Home" ? p = r.value[0] ?? 0 : g.key === "End" && (p = r.value[r.value.length - 1] ?? _);
      const b = s.items[p];
      !b || b.disabled || (u(b.value, s.modelValue), await St(), n.value[p]?.focus());
    }
    return (g, _) => (y(), x("div", Sw, [
      c("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: G([
          "flex-wrap gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 p-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:border-white/[0.06] dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          e.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (y(!0), x(q, null, J(e.items, (m, p) => (y(), x("button", {
          id: i(m.value),
          key: m.value,
          ref_for: !0,
          ref_key: "tabRefs",
          ref: n,
          type: "button",
          role: "tab",
          "aria-selected": l(m),
          "aria-disabled": m.disabled === !0,
          tabindex: l(m) ? 0 : -1,
          class: G(d(m)),
          onClick: (b) => h(m, b),
          onKeydown: (b) => v(b, p)
        }, [
          c("span", {
            class: G(["flex min-h-9 min-w-0 items-center justify-center gap-2 px-3 py-1.5", { "min-w-0 flex-1": e.fullWidth }])
          }, [
            m.icon ? (y(), ct(Ca(m.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : E("", !0),
            c("span", Aw, M(m.label), 1)
          ], 2)
        ], 42, Dw))), 128))
      ], 10, Cw),
      g.$slots.default ? (y(), ct(Ao, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: qe(() => [
          (y(), x("div", {
            key: e.modelValue,
            class: "tabs-panel mt-4"
          }, [
            zt(g.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : E("", !0)
    ]));
  }
}), Bw = /* @__PURE__ */ nt(Tw, [["__scopeId", "data-v-3474a86e"]]), Lw = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-white/[0.06]" }, Fw = { class: "overflow-x-auto" }, Pw = { class: "kiut-table w-full min-w-[640px] border-collapse text-left text-sm" }, Ew = { class: "h-12 border-b border-[color:var(--kiut-border-table)] bg-slate-50 dark:bg-[#252528]" }, Rw = {
  key: 0,
  scope: "col",
  class: "w-12 px-4 py-3 text-center align-middle"
}, Iw = ["checked", "aria-label"], Ow = {
  key: 0,
  class: "w-12 px-4 py-3 text-center align-middle"
}, zw = ["checked", "aria-label", "onChange"], Vw = /* @__PURE__ */ Z({
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
    const s = e, a = t, n = st(null);
    function o(b) {
      return `cell-${b}`;
    }
    function i(b) {
      return b === "center" ? "text-center" : b === "right" ? "text-right" : "text-left";
    }
    function r(b, $) {
      if (typeof s.rowKey == "function")
        return s.rowKey(b);
      const k = b[s.rowKey];
      return k != null ? String(k) : `__index_${$}`;
    }
    function l(b, $) {
      return b[$];
    }
    function d(b) {
      return b == null || typeof b == "object" ? "" : String(b);
    }
    function u(b, $) {
      return r(b, $);
    }
    const h = D(() => s.rows.map((b, $) => r(b, $)));
    function f(b, $) {
      const k = r(b, $);
      return s.selectedKeys.includes(k);
    }
    const v = D(() => !s.selectable || s.rows.length === 0 ? !1 : h.value.every((b) => s.selectedKeys.includes(b))), g = D(() => {
      if (!s.selectable || s.rows.length === 0) return !1;
      const b = h.value.filter(($) => s.selectedKeys.includes($));
      return b.length > 0 && b.length < s.rows.length;
    });
    Vt(
      [g, v, () => s.selectable],
      async () => {
        await St();
        const b = n.value;
        b && (b.indeterminate = g.value && !v.value);
      },
      { immediate: !0 }
    );
    function _() {
      if (s.selectable)
        if (v.value) {
          const b = s.selectedKeys.filter(($) => !h.value.includes($));
          a("update:selectedKeys", b);
        } else {
          const b = new Set(s.selectedKeys);
          h.value.forEach(($) => b.add($)), a("update:selectedKeys", [...b]);
        }
    }
    function m(b, $) {
      if (!s.selectable) return;
      const k = r(b, $);
      s.selectedKeys.includes(k) ? a(
        "update:selectedKeys",
        s.selectedKeys.filter((S) => S !== k)
      ) : a("update:selectedKeys", [...s.selectedKeys, k]);
    }
    function p(b, $) {
      const k = r(b, $);
      return `${s.ariaLabelSelectRow} ${k}`;
    }
    return (b, $) => (y(), x("div", Lw, [
      c("div", Fw, [
        c("table", Pw, [
          c("thead", null, [
            c("tr", Ew, [
              e.selectable ? (y(), x("th", Rw, [
                c("input", {
                  ref_key: "selectAllRef",
                  ref: n,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: v.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: _
                }, null, 40, Iw)
              ])) : E("", !0),
              (y(!0), x(q, null, J(e.columns, (k) => (y(), x("th", {
                key: k.key,
                scope: "col",
                class: G([
                  "px-4 py-3 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]",
                  i(k.align),
                  k.headerClass ?? ""
                ])
              }, M(k.label), 3))), 128))
            ])
          ]),
          c("tbody", null, [
            (y(!0), x(q, null, J(e.rows, (k, w) => (y(), x("tr", {
              key: u(k, w),
              class: "h-14 border-b border-[color:var(--kiut-border-table-row)] bg-[color:var(--kiut-bg-table)] transition-colors hover:[background:var(--kiut-bg-table-hover)]"
            }, [
              e.selectable ? (y(), x("td", Ow, [
                c("input", {
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: f(k, w),
                  "aria-label": p(k, w),
                  onChange: (S) => m(k, w)
                }, null, 40, zw)
              ])) : E("", !0),
              (y(!0), x(q, null, J(e.columns, (S) => (y(), x("td", {
                key: S.key,
                class: G([
                  "px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]",
                  i(S.align),
                  S.cellClass ?? ""
                ])
              }, [
                zt(b.$slots, o(S.key), {
                  row: k,
                  column: S,
                  value: l(k, S.key)
                }, () => [
                  xt(M(d(l(k, S.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}), Nw = /* @__PURE__ */ nt(Vw, [["__scopeId", "data-v-5f9248cd"]]);
function Ww(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    c("path", { d: "M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" })
  ]);
}
function Hw(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    c("path", { d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" })
  ]);
}
const jw = ["aria-label"], Yw = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, qw = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, Uw = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, Kw = ["aria-label", "onClick"], Xw = ["aria-label", "onClick"], Gw = ["aria-label", "aria-expanded", "aria-controls", "onClick"], Zw = ["aria-label"], Qw = ["aria-label"], Jw = {
  key: 1,
  class: "space-y-2"
}, t$ = ["for"], e$ = ["id", "placeholder", "onKeydown"], s$ = ["for"], a$ = ["id"], n$ = {
  value: "",
  disabled: ""
}, o$ = ["value"], i$ = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, r$ = { class: "flex flex-wrap items-end gap-2" }, l$ = { class: "min-w-[120px] flex-1" }, c$ = ["for"], d$ = ["id"], u$ = { class: "min-w-[120px] flex-1" }, h$ = ["for"], f$ = ["id"], g$ = /* @__PURE__ */ Z({
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
    const s = e, a = t, n = To(), i = `${`kiut-filters-${Nt()}`}-panel`, r = st(null), l = /* @__PURE__ */ new Map(), d = st(null), u = st(!1), h = st({}), f = st(null), v = st(""), g = st(""), _ = st(""), m = st(""), p = D(() => d.value ? s.filterDefinitions.find((L) => L.id === d.value) ?? null : null), b = D(() => {
      const L = p.value;
      if (L)
        return L.type === "text" ? v.value : L.type === "select" ? g.value : { start: _.value, end: m.value };
    });
    function $(L, U) {
      U && U instanceof HTMLElement ? l.set(L, U) : l.delete(L);
    }
    function k(L) {
      return s.modelValue[L];
    }
    function w(L, U) {
      if (U == null) return !0;
      if (L.type === "text" || L.type === "select") return String(U).trim() === "";
      if (L.type === "dateRange") {
        const Q = U;
        return !Q?.start?.trim() || !Q?.end?.trim();
      }
      return !0;
    }
    const S = D(
      () => s.filterDefinitions.some((L) => !w(L, k(L.id)))
    ), C = D(
      () => s.filterDefinitions.filter((L) => !w(L, k(L.id)))
    ), A = D(
      () => s.filterDefinitions.filter((L) => w(L, k(L.id)))
    );
    function P(L) {
      const U = k(L.id), Q = L.label.replace(/^\+\s*/, "");
      if (L.type === "text") return `${Q}: ${String(U ?? "").trim()}`;
      if (L.type === "select") {
        const qa = String(U ?? ""), Ri = L.options.find((Ii) => Ii.value === qa);
        return `${Q}: ${Ri?.label ?? qa}`;
      }
      const vt = U, Ht = R(vt.start), Dt = R(vt.end);
      return `${Q}: ${Ht} – ${Dt}`;
    }
    function R(L) {
      if (!L) return "";
      const U = Tt(L, "YYYY-MM-DD", !0);
      return U.isValid() ? U.format("L") : L;
    }
    function I(L) {
      return d.value === L && u.value ? "border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border-slate-400/90 hover:border-[color:var(--kiut-primary)]/50 hover:bg-slate-50 dark:border-slate-500 dark:hover:border-[color:var(--kiut-primary-light)]/40 dark:hover:bg-white/[0.04]";
    }
    function N(L) {
      const U = k(L.id);
      if (L.type === "text") {
        v.value = U != null ? String(U) : "";
        return;
      }
      if (L.type === "select") {
        g.value = U != null ? String(U) : "";
        return;
      }
      const Q = U;
      _.value = Q?.start?.trim() ?? "", m.value = Q?.end?.trim() ?? "";
    }
    function Y(L) {
      if (!L) return;
      f.value = L;
      const U = L.getBoundingClientRect(), Q = 300;
      let vt = U.left;
      const Ht = window.innerWidth - Q - 12;
      vt > Ht && (vt = Math.max(12, Ht)), vt < 12 && (vt = 12);
      const Dt = U.bottom + 8;
      h.value = {
        top: `${Dt}px`,
        left: `${vt}px`,
        width: `${Math.min(Q, window.innerWidth - 24)}px`
      };
    }
    function B(L, U) {
      if (d.value === L.id && u.value) {
        V();
        return;
      }
      u.value && d.value !== L.id && V(), d.value = L.id, u.value = !0, N(L), St().then(async () => {
        Y(U.currentTarget), await St(), O();
      });
    }
    function F(L, U) {
      if (d.value === L.id && u.value) {
        V();
        return;
      }
      u.value && d.value !== L.id && V(), d.value = L.id, u.value = !0, N(L), St().then(async () => {
        const Q = l.get(L.id) ?? U.currentTarget;
        Y(Q), await St(), O();
      });
    }
    function O() {
      const L = r.value;
      if (!L) return;
      L.querySelector(
        'input, select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function z() {
      u.value = !1, d.value = null, f.value = null;
    }
    function W(L) {
      const U = p.value;
      if (!U) return;
      if (U.type === "text") {
        v.value = L != null ? String(L) : "";
        return;
      }
      if (U.type === "select") {
        g.value = L != null ? String(L) : "";
        return;
      }
      const Q = L;
      _.value = Q?.start?.trim() ?? "", m.value = Q?.end?.trim() ?? "";
    }
    function V() {
      const L = p.value;
      if (!L) return;
      if (L.type === "text") {
        const Ht = v.value.trim(), Dt = { ...s.modelValue };
        Ht === "" ? delete Dt[L.id] : Dt[L.id] = Ht, a("update:modelValue", Dt), a("change", Dt), z();
        return;
      }
      if (L.type === "select") {
        const Ht = g.value.trim(), Dt = { ...s.modelValue };
        Ht === "" ? delete Dt[L.id] : Dt[L.id] = Ht, a("update:modelValue", Dt), a("change", Dt), z();
        return;
      }
      const U = _.value.trim(), Q = m.value.trim(), vt = { ...s.modelValue };
      !U || !Q || U > Q ? delete vt[L.id] : vt[L.id] = { start: U, end: Q }, a("update:modelValue", vt), a("change", vt), z();
    }
    function H(L) {
      const U = { ...s.modelValue };
      delete U[L], a("update:modelValue", U), a("change", U), d.value === L && z();
    }
    function at() {
      const L = {};
      a("update:modelValue", L), a("change", L), z();
    }
    const et = D(() => {
      const L = p.value;
      return L ? `Editar filtro: ${L.label}` : "Filtro";
    });
    function K(L) {
      return `Quitar filtro ${L.label.replace(/^\+\s*/, "")}`;
    }
    function ht(L) {
      return `Editar filtro ${L.label.replace(/^\+\s*/, "")}`;
    }
    function kt(L) {
      return `Añadir filtro ${L.label.replace(/^\+\s*/, "")}`;
    }
    const ut = D(() => s.clearLabel);
    function Ct(L) {
      if (!u.value || !r.value) return;
      const U = L.target;
      if (!(r.value.contains(U) || (U instanceof Element ? U : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const vt of l.values())
          if (vt?.contains(U)) return;
        V();
      }
    }
    function Pt(L) {
      L.key === "Escape" && u.value && (L.preventDefault(), z());
    }
    function Wt() {
      !u.value || !f.value || Y(f.value);
    }
    return fe(() => {
      document.addEventListener("mousedown", Ct, !0), window.addEventListener("keydown", Pt, !0), window.addEventListener("resize", Wt);
    }), Do(() => {
      document.removeEventListener("mousedown", Ct, !0), window.removeEventListener("keydown", Pt, !0), window.removeEventListener("resize", Wt);
    }), Vt(
      () => s.modelValue,
      () => {
        const L = p.value;
        L && u.value && !n.panel && N(L);
      },
      { deep: !0 }
    ), (L, U) => (y(), x("div", {
      class: "kiut-filters font-[Inter] text-sm",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      c("div", Yw, [
        c("span", qw, M(e.label), 1),
        c("div", Uw, [
          (y(!0), x(q, null, J(C.value, (Q) => (y(), x("div", {
            key: `chip-${Q.id}`,
            "data-kiut-filter-chip": "",
            class: "inline-flex max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 py-0.5 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:border-white/[0.08] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            c("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": ht(Q),
              onClick: (vt) => B(Q, vt)
            }, [
              zt(L.$slots, "formatChip", {
                filter: Q,
                value: k(Q.id)
              }, () => [
                xt(M(P(Q)), 1)
              ])
            ], 8, Kw),
            c("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": K(Q),
              onClick: (vt) => H(Q.id)
            }, [
              X(T(Hw), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, Xw)
          ]))), 128)),
          (y(!0), x(q, null, J(A.value, (Q) => (y(), x("button", {
            key: `add-${Q.id}`,
            ref_for: !0,
            ref: (vt) => $(Q.id, vt),
            type: "button",
            class: G(["inline-flex items-center gap-0.5 rounded-full border-1 border-dashed px-2 py-1 font-medium text-[color:var(--kiut-text-secondary)] transition-colors dark:text-slate-400", I(Q.id)]),
            "aria-label": kt(Q),
            "aria-expanded": d.value === Q.id,
            "aria-haspopup": !0,
            "aria-controls": d.value === Q.id ? i : void 0,
            onClick: (vt) => F(Q, vt)
          }, [
            X(T(Ww), {
              class: "h-3.5 w-3.5 shrink-0",
              "aria-hidden": "true"
            }),
            c("span", null, M(Q.label), 1)
          ], 10, Gw))), 128))
        ]),
        S.value ? (y(), x("button", {
          key: 0,
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": ut.value,
          onClick: at
        }, M(e.clearLabel), 9, Zw)) : E("", !0)
      ]),
      (y(), ct(Bo, { to: "body" }, [
        d.value && u.value ? (y(), x("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: r,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": et.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:border-white/[0.08] dark:bg-[#252528]",
          style: _t(h.value),
          onKeydown: U[4] || (U[4] = ue(() => {
          }, ["stop"]))
        }, [
          p.value ? (y(), x(q, { key: 0 }, [
            L.$slots.panel ? zt(L.$slots, "panel", {
              key: 0,
              filter: p.value,
              close: V,
              value: b.value,
              updateValue: W
            }) : (y(), x("div", Jw, [
              p.value.type === "text" ? (y(), x(q, { key: 0 }, [
                c("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, M(p.value.label), 9, t$),
                Gt(c("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": U[0] || (U[0] = (Q) => v.value = Q),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-sm text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:border-white/[0.12] dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: p.value.placeholder ?? "…",
                  onKeydown: As(ue(V, ["prevent"]), ["enter"])
                }, null, 40, e$), [
                  [Ge, v.value]
                ])
              ], 64)) : p.value.type === "select" ? (y(), x(q, { key: 1 }, [
                c("label", {
                  for: `${i}-select`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, M(p.value.label), 9, s$),
                Gt(c("select", {
                  id: `${i}-select`,
                  "onUpdate:modelValue": U[1] || (U[1] = (Q) => g.value = Q),
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-sm text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:border-white/[0.12] dark:bg-[#1e1e20] dark:text-slate-100"
                }, [
                  c("option", n$, M(p.value.placeholder ?? "Seleccionar…"), 1),
                  (y(!0), x(q, null, J(p.value.options, (Q) => (y(), x("option", {
                    key: Q.value,
                    value: Q.value
                  }, M(Q.label), 9, o$))), 128))
                ], 8, a$), [
                  [zi, g.value]
                ])
              ], 64)) : p.value.type === "dateRange" ? (y(), x(q, { key: 2 }, [
                c("p", i$, M(p.value.label), 1),
                c("div", r$, [
                  c("div", l$, [
                    c("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, c$),
                    Gt(c("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": U[2] || (U[2] = (Q) => _.value = Q),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-sm text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:border-white/[0.12] dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, d$), [
                      [Ge, _.value]
                    ])
                  ]),
                  c("div", u$, [
                    c("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, h$),
                    Gt(c("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": U[3] || (U[3] = (Q) => m.value = Q),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-sm text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:border-white/[0.12] dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, f$), [
                      [Ge, m.value]
                    ])
                  ])
                ])
              ], 64)) : E("", !0)
            ]))
          ], 64)) : E("", !0)
        ], 44, Qw)) : E("", !0)
      ]))
    ], 8, jw));
  }
}), ve = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", De = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/[0.12] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", us = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", Oe = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", p$ = { class: "font-sans" }, v$ = ["for"], b$ = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], m$ = ["id"], y$ = /* @__PURE__ */ Z({
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
    const s = e, a = t, n = `kiut-input-text-${Nt()}`, o = D(() => s.id ?? n), i = D(() => `${o.value}-err`), r = D({
      get: () => s.modelValue,
      set: (l) => a("update:modelValue", l)
    });
    return (l, d) => (y(), x("div", p$, [
      e.label ? (y(), x("label", {
        key: 0,
        for: o.value,
        class: G(T(ve))
      }, M(e.label), 11, v$)) : E("", !0),
      Gt(c("input", {
        id: o.value,
        "onUpdate:modelValue": d[0] || (d[0] = (u) => r.value = u),
        type: "text",
        autocomplete: "off",
        class: G([T(De), e.invalid ? T(us) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, b$), [
        [Ge, r.value]
      ]),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: i.value,
        class: G(T(Oe)),
        role: "alert"
      }, M(e.errorText), 11, m$)) : E("", !0)
    ]));
  }
}), _$ = { class: "font-sans" }, x$ = ["for"], k$ = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], w$ = ["for"], $$ = ["title"], M$ = ["aria-label"], S$ = ["id"], C$ = /* @__PURE__ */ Z({
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
    const s = e, a = t, n = `kiut-input-file-${Nt()}`, o = D(() => s.id ?? n), i = D(() => `${o.value}-err`), r = st(null), l = D(() => s.modelValue?.name ?? s.placeholder);
    function d(h) {
      const v = h.target.files?.[0] ?? null;
      a("update:modelValue", v);
    }
    function u() {
      a("update:modelValue", null), r.value && (r.value.value = "");
    }
    return (h, f) => (y(), x("div", _$, [
      e.label ? (y(), x("label", {
        key: 0,
        for: o.value,
        class: G(T(ve))
      }, M(e.label), 11, x$)) : E("", !0),
      c("div", {
        class: G([
          T(De),
          "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
          e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
          e.invalid ? T(us) : "",
          e.disabled ? "pointer-events-none" : ""
        ])
      }, [
        c("input", {
          id: o.value,
          ref_key: "fileInputRef",
          ref: r,
          type: "file",
          class: "sr-only focus:outline-none focus:ring-0",
          name: e.name,
          accept: e.accept,
          disabled: e.disabled,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? i.value : void 0,
          onChange: d
        }, null, 40, k$),
        c("label", {
          for: o.value,
          class: G(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-white/[0.12] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled ? "cursor-not-allowed opacity-50" : ""])
        }, [
          X(T($g), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          xt(" " + M(e.chooseLabel), 1)
        ], 10, w$),
        c("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: l.value || void 0
        }, M(l.value), 9, $$),
        e.modelValue && !e.disabled ? (y(), x("button", {
          key: 0,
          type: "button",
          class: "inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
          "aria-label": e.clearAriaLabel,
          onClick: u
        }, [
          X(T(Li), {
            class: "h-4 w-4",
            "aria-hidden": "true"
          })
        ], 8, M$)) : E("", !0)
      ], 2),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: i.value,
        class: G(T(Oe)),
        role: "alert"
      }, M(e.errorText), 11, S$)) : E("", !0)
    ]));
  }
}), D$ = { class: "font-sans" }, A$ = ["for"], T$ = { class: "relative" }, B$ = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], L$ = ["id"], F$ = /* @__PURE__ */ Z({
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
    const s = e, a = t, n = `kiut-input-datetime-${Nt()}`, o = D(() => s.id ?? n), i = D(() => `${o.value}-err`), r = D(() => s.modelValue ?? "");
    function l(d) {
      const u = d.target.value;
      a("update:modelValue", u === "" ? null : u);
    }
    return (d, u) => (y(), x("div", D$, [
      e.label ? (y(), x("label", {
        key: 0,
        for: o.value,
        class: G(T(ve))
      }, M(e.label), 11, A$)) : E("", !0),
      c("div", T$, [
        X(T(Bi), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        c("input", {
          id: o.value,
          value: r.value,
          type: "datetime-local",
          autocomplete: "off",
          class: G([
            T(De),
            "pl-10",
            e.invalid ? T(us) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? i.value : void 0,
          onInput: l
        }, null, 42, B$)
      ]),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: i.value,
        class: G(T(Oe)),
        role: "alert"
      }, M(e.errorText), 11, L$)) : E("", !0)
    ]));
  }
}), P$ = { class: "font-sans" }, E$ = ["for"], R$ = {
  key: 0,
  class: "order-1 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, I$ = ["id", "value", "min", "max", "step", "disabled", "aria-orientation", "aria-invalid", "aria-describedby"], O$ = {
  key: 1,
  class: "text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, z$ = {
  key: 2,
  class: "grid w-full max-w-full grid-cols-[1fr_auto_1fr] items-start gap-x-3 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, V$ = { class: "min-w-0 text-left leading-snug" }, N$ = { class: "max-w-[min(100%,12rem)] shrink px-1 text-center leading-snug" }, W$ = { class: "min-w-0 text-right leading-snug" }, H$ = {
  key: 3,
  class: "order-3 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, j$ = {
  key: 4,
  class: "order-4 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Y$ = ["id"], q$ = /* @__PURE__ */ Z({
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
    const s = e, a = t, n = `kiut-input-range-${Nt()}`, o = D(() => s.id ?? n), i = D(() => `${o.value}-err`), r = D(() => {
      const v = [];
      return s.errorText && v.push(i.value), v.length ? v.join(" ") : void 0;
    }), l = D(
      () => !!(s.caption && !s.captionMin && !s.captionMax)
    ), d = D(() => !!(s.captionMin || s.captionMax)), u = D(() => {
      const { min: v, max: g, modelValue: _ } = s;
      if (g === v) return 0;
      const m = (_ - v) / (g - v);
      return Math.min(100, Math.max(0, m * 100));
    }), h = D(() => ({
      "--kiut-range-fill": `${u.value}%`,
      "--kiut-range-length": s.trackLength
    }));
    function f(v) {
      const g = Number(v.target.value);
      a("update:modelValue", Number.isNaN(g) ? s.min : g);
    }
    return (v, g) => (y(), x("div", P$, [
      e.label ? (y(), x("label", {
        key: 0,
        for: o.value,
        class: G(T(ve))
      }, M(e.label), 11, E$)) : E("", !0),
      c("div", {
        class: G(["flex flex-col items-center gap-2", (e.orientation === "vertical", "w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (y(), x("p", R$, M(e.captionMax), 1)) : E("", !0),
        c("div", {
          class: G(["flex items-center justify-center", [
            e.orientation === "vertical" ? "order-2 h-[var(--kiut-range-length)] w-11 shrink-0" : "order-none w-full py-1"
          ]]),
          style: _t(h.value)
        }, [
          c("input", {
            id: o.value,
            type: "range",
            value: e.modelValue,
            min: e.min,
            max: e.max,
            step: e.step,
            disabled: e.disabled,
            "aria-orientation": e.orientation,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": r.value,
            class: G([
              "kiut-range-input block appearance-none bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              e.orientation === "vertical" ? "kiut-range-input--vertical" : "kiut-range-input--horizontal w-full"
            ]),
            onInput: f
          }, null, 42, I$)
        ], 6),
        e.orientation === "horizontal" && l.value ? (y(), x("p", O$, M(e.caption), 1)) : e.orientation === "horizontal" && d.value ? (y(), x("div", z$, [
          c("span", V$, M(e.captionMin), 1),
          c("span", N$, M(e.caption), 1),
          c("span", W$, M(e.captionMax), 1)
        ])) : E("", !0),
        e.orientation === "vertical" && e.captionMin ? (y(), x("p", H$, M(e.captionMin), 1)) : E("", !0),
        e.orientation === "vertical" && e.caption ? (y(), x("p", j$, M(e.caption), 1)) : E("", !0)
      ], 2),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: i.value,
        class: G(T(Oe)),
        role: "alert"
      }, M(e.errorText), 11, Y$)) : E("", !0)
    ]));
  }
}), U$ = /* @__PURE__ */ nt(q$, [["__scopeId", "data-v-a1343418"]]), K$ = { class: "font-sans" }, X$ = ["for"], G$ = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], Z$ = ["id"], Q$ = /* @__PURE__ */ Z({
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
    const s = e, a = t, n = `kiut-input-number-${Nt()}`, o = D(() => s.id ?? n), i = D(() => `${o.value}-err`), r = D(() => {
      switch (s.align) {
        case "start":
          return "text-start";
        case "end":
          return "text-end";
        default:
          return "text-center";
      }
    }), l = D(
      () => s.modelValue === null || s.modelValue === void 0 ? "" : String(s.modelValue)
    );
    function d(u) {
      const h = u.target.value;
      if (h === "") {
        a("update:modelValue", null);
        return;
      }
      const f = Number(h);
      a("update:modelValue", Number.isNaN(f) ? null : f);
    }
    return (u, h) => (y(), x("div", K$, [
      e.label ? (y(), x("label", {
        key: 0,
        for: o.value,
        class: G(T(ve))
      }, M(e.label), 11, X$)) : E("", !0),
      c("input", {
        id: o.value,
        value: l.value,
        type: "number",
        onInput: d,
        class: G([
          T(De),
          e.invalid ? T(us) : "",
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
      }, null, 42, G$),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: i.value,
        class: G(T(Oe)),
        role: "alert"
      }, M(e.errorText), 11, Z$)) : E("", !0)
    ]));
  }
});
function J$(e, t) {
  return y(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    c("path", {
      "fill-rule": "evenodd",
      d: "M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z",
      "clip-rule": "evenodd"
    })
  ]);
}
const tM = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], eM = ["aria-selected", "onClick", "onMouseenter"], sM = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, aM = { class: "min-w-0 flex-1" }, Ei = /* @__PURE__ */ Z({
  name: "Select",
  __name: "Select",
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
    const s = e, a = t, n = `kiut-select-${Nt()}`, o = `${n}-label`, i = `${n}-btn`, r = `${n}-listbox`, l = st(null), d = st(null), u = st(!1), h = st(0), f = D(() => s.options.filter((A) => !A.disabled)), v = D(
      () => s.ariaLabelTrigger ?? s.placeholder ?? "Seleccionar opción"
    ), g = D(() => s.modelValue === null || s.modelValue === void 0 || s.modelValue === "" ? s.placeholder : s.options.find((P) => P.value === s.modelValue)?.label ?? String(s.modelValue));
    function _(A) {
      return `${String(A.value)}-${A.label}`;
    }
    function m(A) {
      return s.modelValue === A.value;
    }
    function p(A, P) {
      const R = m(A), I = h.value === P;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        R ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !R && I ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function b(A) {
      a("update:modelValue", A.value), u.value = !1;
    }
    function $() {
      s.disabled || (u.value = !u.value);
    }
    function k(A) {
      if (A.stopPropagation(), !s.disabled && ($(), u.value)) {
        const P = Math.max(
          0,
          f.value.findIndex((R) => R.value === s.modelValue)
        );
        h.value = P, St(() => d.value?.focus());
      }
    }
    function w(A) {
      if (!u.value) return;
      const P = l.value;
      P && !P.contains(A.target) && (u.value = !1);
    }
    function S(A) {
      s.disabled || (A.key === "ArrowDown" || A.key === "Enter" || A.key === " ") && (A.preventDefault(), u.value || (u.value = !0, h.value = Math.max(
        0,
        f.value.findIndex((P) => P.value === s.modelValue)
      ), St(() => d.value?.focus())));
    }
    function C(A) {
      const P = f.value;
      if (P.length !== 0) {
        if (A.key === "Escape") {
          A.preventDefault(), u.value = !1;
          return;
        }
        if (A.key === "ArrowDown") {
          A.preventDefault(), h.value = Math.min(h.value + 1, P.length - 1);
          return;
        }
        if (A.key === "ArrowUp") {
          A.preventDefault(), h.value = Math.max(h.value - 1, 0);
          return;
        }
        if (A.key === "Enter") {
          A.preventDefault();
          const R = P[h.value];
          R && b(R);
        }
      }
    }
    return fe(() => {
      document.addEventListener("click", w);
    }), cs(() => {
      document.removeEventListener("click", w);
    }), (A, P) => (y(), x("div", {
      ref_key: "rootRef",
      ref: l,
      class: "relative font-sans"
    }, [
      e.label ? (y(), x("label", {
        key: 0,
        id: o,
        class: G(T(ve))
      }, M(e.label), 3)) : E("", !0),
      c("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: G([
          T(De),
          "flex items-center justify-between gap-2 text-left",
          u.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": u.value,
        "aria-haspopup": "listbox",
        "aria-controls": r,
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : v.value,
        onClick: k,
        onKeydown: S
      }, [
        c("span", {
          class: G([
            "min-w-0 flex-1 truncate",
            e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, M(g.value), 3),
        X(T(Dg), {
          class: G(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", u.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, tM),
      Gt(c("ul", {
        id: r,
        ref_key: "listRef",
        ref: d,
        role: "listbox",
        tabindex: "-1",
        class: "absolute left-0 right-0 z-50 mt-[-3px] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-white/[0.12]",
        onKeydown: ue(C, ["stop"])
      }, [
        (y(!0), x(q, null, J(f.value, (R, I) => (y(), x("li", {
          key: _(R),
          role: "option",
          "aria-selected": m(R),
          class: G(p(R, I)),
          onClick: ue((N) => b(R), ["stop"]),
          onMouseenter: (N) => h.value = I
        }, [
          c("span", sM, [
            m(R) ? (y(), ct(T(J$), {
              key: 0,
              class: "h-4 w-4 text-white"
            })) : E("", !0)
          ]),
          c("span", aM, M(R.label), 1)
        ], 42, eM))), 128))
      ], 544), [
        [Ds, u.value]
      ])
    ], 512));
  }
}), nM = ["id", "aria-checked", "aria-disabled", "disabled", "onKeydown"], oM = { class: "sr-only" }, iM = /* @__PURE__ */ Z({
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
    const s = e, a = t;
    function n() {
      s.disabled || a("update:modelValue", !s.modelValue);
    }
    return (o, i) => (y(), x("button", {
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
      onClick: n,
      onKeydown: [
        As(ue(n, ["prevent", "stop"]), ["space"]),
        As(ue(n, ["prevent"]), ["enter"])
      ]
    }, [
      c("span", {
        class: G(["pointer-events-none inline-block h-7 w-7 translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", e.modelValue ? "translate-x-7" : "translate-x-0"]),
        "aria-hidden": "true"
      }, null, 2),
      c("span", oM, M(e.ariaLabel), 1)
    ], 42, nM));
  }
}), rM = { class: "font-sans" }, lM = ["for"], cM = { class: "flex gap-2" }, dM = { class: "w-[7.5rem] shrink-0" }, uM = { class: "min-w-0 flex-1" }, hM = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], fM = ["id"], gM = /* @__PURE__ */ Z({
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
    const s = e, a = t, n = `kiut-phone-${Nt()}`, o = D(() => s.id ?? `${n}-num`), i = D(() => `${o.value}-err`), r = D({
      get: () => s.modelValue.prefix,
      set: (d) => a("update:modelValue", { ...s.modelValue, prefix: d })
    }), l = D({
      get: () => s.modelValue.number,
      set: (d) => a("update:modelValue", { ...s.modelValue, number: d })
    });
    return (d, u) => (y(), x("div", rM, [
      e.label ? (y(), x("label", {
        key: 0,
        for: o.value,
        class: G(T(ve))
      }, M(e.label), 11, lM)) : E("", !0),
      c("div", cM, [
        c("div", dM, [
          X(Ei, {
            modelValue: r.value,
            "onUpdate:modelValue": u[0] || (u[0] = (h) => r.value = h),
            "aria-label-trigger": "Prefijo telefónico",
            options: e.prefixOptions,
            placeholder: e.prefixPlaceholder,
            disabled: e.disabled
          }, null, 8, ["modelValue", "options", "placeholder", "disabled"])
        ]),
        c("div", uM, [
          Gt(c("input", {
            id: o.value,
            "onUpdate:modelValue": u[1] || (u[1] = (h) => l.value = h),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: G([T(De), e.invalid ? T(us) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, hM), [
            [Ge, l.value]
          ])
        ])
      ]),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: i.value,
        class: G(T(Oe)),
        role: "alert"
      }, M(e.errorText), 11, fM)) : E("", !0)
    ]));
  }
}), pM = ["role", "aria-label"], vM = { class: "flex flex-wrap gap-2" }, bM = ["aria-checked", "role", "onClick"], mM = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, yM = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, _M = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, xM = /* @__PURE__ */ Z({
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
    const s = e, a = t, n = D(() => s.multiple ? Array.isArray(s.modelValue) ? s.modelValue : [] : []);
    function o(l) {
      return s.multiple ? n.value.includes(l.value) : s.modelValue === l.value;
    }
    function i(l) {
      return [
        "inline-flex max-w-full items-center gap-2 rounded-xl border px-3 py-2 text-left transition",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        o(l) ? "border-[color:var(--kiut-primary)]/50 bg-violet-50/80 dark:bg-violet-950/30" : "border-gray-300 bg-white dark:border-white/[0.12] dark:bg-[color:var(--kiut-bg-secondary)]"
      ];
    }
    function r(l) {
      if (s.multiple) {
        const d = Array.isArray(s.modelValue) ? [...s.modelValue] : [], u = d.indexOf(l.value);
        u >= 0 ? d.splice(u, 1) : d.push(l.value), a("update:modelValue", d);
        return;
      }
      a("update:modelValue", l.value);
    }
    return (l, d) => (y(), x("div", {
      class: "font-sans",
      role: e.multiple ? "group" : "radiogroup",
      "aria-label": e.ariaLabel
    }, [
      c("div", vM, [
        (y(!0), x(q, null, J(e.items, (u) => (y(), x("button", {
          key: u.value,
          type: "button",
          class: G(i(u)),
          "aria-checked": o(u),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (h) => r(u)
        }, [
          c("span", mM, [
            o(u) ? (y(), x("span", yM)) : E("", !0)
          ]),
          u.dotColor ? (y(), x("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: _t({ backgroundColor: u.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : E("", !0),
          c("span", _M, M(u.label), 1)
        ], 10, bM))), 128))
      ])
    ], 8, pM));
  }
}), kM = ["aria-label"], wM = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], $M = { class: "truncate px-3 py-2 text-sm font-medium" }, MM = /* @__PURE__ */ Z({
  name: "SegmentedControl",
  __name: "SegmentedControl",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Segmented control" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const s = e, a = t, n = `kiut-seg-${Nt()}`, o = (_) => `${n}-seg-${_}`, i = st([]);
    function r(_, m) {
      _ instanceof HTMLButtonElement ? i.value[m] = _ : i.value[m] = null;
    }
    function l(_) {
      return _.value === s.modelValue;
    }
    function d(_) {
      const m = l(_), p = "flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]";
      return _.disabled ? `${p} cursor-not-allowed opacity-40` : m ? `${p} bg-[color:var(--kiut-primary)] text-white shadow-sm` : `${p} text-[color:var(--kiut-text-primary)] hover:bg-black/[0.03] dark:text-slate-100 dark:hover:bg-white/[0.06]`;
    }
    function u(_) {
      _.disabled || _.value !== s.modelValue && a("update:modelValue", _.value);
    }
    function h(_, m, p) {
      u(_), St(() => i.value[m]?.focus());
    }
    const f = D(
      () => s.items.map((_, m) => _.disabled ? -1 : m).filter((_) => _ >= 0)
    );
    function v(_, m) {
      const p = s.items.length;
      if (p === 0) return 0;
      let b = _;
      for (let $ = 0; $ < p; $++)
        if (b = (b + m + p) % p, !s.items[b]?.disabled) return b;
      return _;
    }
    function g(_, m) {
      if (_.key === "ArrowRight" || _.key === "ArrowDown") {
        _.preventDefault();
        const p = v(m, 1), b = s.items[p];
        b && u(b), St(() => i.value[p]?.focus());
      } else if (_.key === "ArrowLeft" || _.key === "ArrowUp") {
        _.preventDefault();
        const p = v(m, -1), b = s.items[p];
        b && u(b), St(() => i.value[p]?.focus());
      } else if (_.key === "Home") {
        _.preventDefault();
        const p = f.value[0];
        if (p !== void 0) {
          const b = s.items[p];
          b && u(b), St(() => i.value[p]?.focus());
        }
      } else if (_.key === "End") {
        _.preventDefault();
        const p = f.value[f.value.length - 1];
        if (p !== void 0) {
          const b = s.items[p];
          b && u(b), St(() => i.value[p]?.focus());
        }
      }
    }
    return (_, m) => (y(), x("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-white/[0.12]"
    }, [
      (y(!0), x(q, null, J(e.items, (p, b) => (y(), x("button", {
        id: o(p.value),
        key: p.value,
        ref_for: !0,
        ref: ($) => r($, b),
        type: "button",
        role: "tab",
        "aria-selected": l(p),
        "aria-disabled": p.disabled === !0,
        tabindex: l(p) ? 0 : -1,
        class: G(d(p)),
        onClick: ($) => h(p, b),
        onKeydown: ($) => g($, b)
      }, [
        c("span", $M, M(p.label), 1)
      ], 42, wM))), 128))
    ], 8, kM));
  }
});
function _e(e) {
  const [t, s, a] = e.split("-").map(Number);
  return new Date(t, s - 1, a);
}
function Ye(e) {
  const t = e.getFullYear(), s = String(e.getMonth() + 1).padStart(2, "0"), a = String(e.getDate()).padStart(2, "0");
  return `${t}-${s}-${a}`;
}
function ie(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function pa(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function ko(e, t) {
  return new Date(e.getFullYear(), e.getMonth() + t, e.getDate());
}
function qs(e, t) {
  const s = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()), a = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
  return s < a ? -1 : s > a ? 1 : 0;
}
function wo(e, t) {
  return qs(e, t) === 0;
}
function va(e, t) {
  return qs(e, t) < 0;
}
function SM(e, t) {
  return qs(e, t) >= 0;
}
function CM(e, t) {
  return qs(e, t) <= 0;
}
function DM(e) {
  const t = e.getFullYear(), s = e.getMonth(), a = new Date(t, s, 1), n = new Date(a);
  n.setDate(a.getDate() - a.getDay());
  const o = [], i = new Date(n);
  for (let r = 0; r < 42; r++)
    o.push(new Date(i)), i.setDate(i.getDate() + 1);
  return o;
}
const AM = [
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
], TM = [
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
function $o(e) {
  return `${AM[e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function Mo(e) {
  return `${TM[e.getMonth()]} ${e.getFullYear()}`;
}
const BM = ["aria-expanded", "aria-labelledby", "aria-label"], LM = ["onKeydown"], FM = { class: "mb-4 flex items-center justify-between gap-2" }, PM = { class: "flex min-w-0 flex-1 justify-center gap-8 text-center text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, EM = { class: "min-w-0 truncate" }, RM = { class: "min-w-0 truncate" }, IM = { class: "flex flex-col gap-6 sm:flex-row sm:gap-8" }, OM = { class: "mb-2 grid grid-cols-7 gap-1 text-center text-[11px] font-medium uppercase tracking-wide text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, zM = { class: "grid grid-cols-7 gap-y-1" }, VM = ["disabled", "onClick"], NM = /* @__PURE__ */ Z({
  name: "DateRangePicker",
  __name: "DateRangePicker",
  props: {
    modelValue: {},
    label: {},
    placeholder: { default: "Seleccionar fechas" },
    ariaLabel: {},
    minDate: {},
    maxDate: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const s = e, a = t, o = `${`kiut-drp-${Nt()}`}-lbl`, i = st(null), r = st(null), l = st(!1), d = st(null), u = st(pa(/* @__PURE__ */ new Date())), h = D(() => {
      const C = pa(u.value);
      return [C, ko(C, 1)];
    }), f = D(() => s.ariaLabel ?? s.placeholder), v = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], g = D(() => {
      if (!s.modelValue.start || !s.modelValue.end) return s.placeholder;
      const C = _e(s.modelValue.start), A = _e(s.modelValue.end);
      return `${$o(C)} – ${$o(A)}`;
    });
    function _(C, A) {
      return C.getMonth() === A.getMonth() && C.getFullYear() === A.getFullYear();
    }
    function m(C) {
      const A = ie(C);
      if (s.minDate) {
        const P = ie(_e(s.minDate));
        if (va(A, P)) return !0;
      }
      if (s.maxDate) {
        const P = ie(_e(s.maxDate));
        if (va(P, A)) return !0;
      }
      return !1;
    }
    function p(C, A) {
      const P = _(A, C), R = s.modelValue.start ? ie(_e(s.modelValue.start)) : null, I = s.modelValue.end ? ie(_e(s.modelValue.end)) : null, N = ie(A), Y = P ? "text-[color:var(--kiut-text-primary)] dark:text-slate-100" : "text-slate-400 dark:text-slate-500";
      if (!R || !I)
        return `${Y} hover:bg-black/[0.04] dark:hover:bg-white/[0.06]`;
      const B = SM(N, R) && CM(N, I), F = wo(N, R), O = wo(N, I);
      return F || O ? "bg-[color:var(--kiut-primary)] font-semibold text-white shadow-sm" : B ? `${Y} bg-violet-100/90 dark:bg-violet-950/35 hover:bg-violet-200/80 dark:hover:bg-violet-900/40` : `${Y} hover:bg-black/[0.04] dark:hover:bg-white/[0.06]`;
    }
    function b(C) {
      if (m(C)) return;
      const A = ie(C);
      if (!d.value) {
        d.value = new Date(A), a("update:modelValue", { start: Ye(A), end: Ye(A) });
        return;
      }
      let R = ie(d.value), I = new Date(A);
      va(I, R) && ([R, I] = [I, R]), a("update:modelValue", { start: Ye(R), end: Ye(I) }), d.value = null, l.value = !1;
    }
    function $(C) {
      u.value = ko(u.value, C);
    }
    function k() {
      l.value = !1;
    }
    function w(C) {
      if (C.stopPropagation(), l.value = !l.value, l.value) {
        if (d.value = null, s.modelValue.start)
          try {
            u.value = pa(_e(s.modelValue.start));
          } catch {
          }
        St(() => r.value?.focus());
      }
    }
    function S(C) {
      if (!l.value) return;
      const A = i.value;
      A && !A.contains(C.target) && (l.value = !1);
    }
    return Vt(l, (C) => {
      C && (d.value = null);
    }), fe(() => {
      document.addEventListener("click", S);
    }), cs(() => {
      document.removeEventListener("click", S);
    }), (C, A) => (y(), x("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (y(), x("label", {
        key: 0,
        id: o,
        class: G(T(ve))
      }, M(e.label), 3)) : E("", !0),
      c("button", {
        type: "button",
        class: G([T(De), "flex w-full items-center gap-2 text-left"]),
        "aria-expanded": l.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : f.value,
        onClick: w
      }, [
        X(T(Bi), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        c("span", {
          class: G([
            "min-w-0 flex-1 truncate",
            !e.modelValue.start || !e.modelValue.end ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, M(g.value), 3)
      ], 10, BM),
      Gt(c("div", {
        ref_key: "panelRef",
        ref: r,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": "Calendario de rango",
        class: "absolute left-0 top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[100vw] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] p-4 shadow-xl outline-none dark:border-white/[0.12]",
        onKeydown: As(ue(k, ["stop"]), ["escape"])
      }, [
        c("div", FM, [
          c("button", {
            type: "button",
            class: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-white/[0.12] dark:text-slate-300 dark:hover:bg-white/[0.06]",
            "aria-label": "Mes anterior",
            onClick: A[0] || (A[0] = (P) => $(-1))
          }, [
            X(T(Ag), {
              class: "h-5 w-5",
              "aria-hidden": "true"
            })
          ]),
          c("div", PM, [
            c("span", EM, M(T(Mo)(h.value[0])), 1),
            c("span", RM, M(T(Mo)(h.value[1])), 1)
          ]),
          c("button", {
            type: "button",
            class: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-white/[0.12] dark:text-slate-300 dark:hover:bg-white/[0.06]",
            "aria-label": "Mes siguiente",
            onClick: A[1] || (A[1] = (P) => $(1))
          }, [
            X(T(Tg), {
              class: "h-5 w-5",
              "aria-hidden": "true"
            })
          ])
        ]),
        c("div", IM, [
          (y(!0), x(q, null, J(h.value, (P) => (y(), x("div", {
            key: `${P.getFullYear()}-${P.getMonth()}`,
            class: "min-w-0 flex-1"
          }, [
            c("div", OM, [
              (y(), x(q, null, J(v, (R) => c("span", { key: R }, M(R), 1)), 64))
            ]),
            c("div", zM, [
              (y(!0), x(q, null, J(T(DM)(P), (R) => (y(), x("button", {
                key: T(Ye)(R),
                type: "button",
                disabled: m(R),
                class: G(["relative flex h-9 items-center justify-center rounded-lg text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", p(P, R)]),
                onClick: (I) => b(R)
              }, M(R.getDate()), 11, VM))), 128))
            ])
          ]))), 128))
        ])
      ], 40, LM), [
        [Ds, l.value]
      ])
    ], 512));
  }
}), WM = {
  key: 0,
  class: "relative flex h-2 w-2 shrink-0 items-center justify-center",
  "aria-hidden": "true"
}, HM = /* @__PURE__ */ Z({
  name: "Tag",
  __name: "Tag",
  props: {
    statusLive: { type: Boolean },
    color: { default: "neutral" },
    outlined: { type: Boolean, default: !1 },
    label: {},
    labelConnected: { default: "Connected" },
    labelDisconnected: { default: "Disconnected" }
  },
  setup(e) {
    const t = e, s = D(() => t.statusLive !== void 0), a = D(
      () => t.statusLive === !0 ? t.labelConnected : t.labelDisconnected
    ), n = D(() => t.statusLive === !0 ? [
      "border border-emerald-200 bg-emerald-50",
      "dark:border-emerald-800/80 dark:bg-emerald-950/40"
    ] : [
      "border border-transparent bg-slate-100 dark:border-slate-700/80 dark:bg-slate-800/90"
    ]), o = D(() => t.statusLive === !0 ? "text-emerald-700 dark:text-emerald-300" : "text-[color:var(--kiut-text-primary)] dark:text-slate-300"), i = D(() => {
      const r = t.outlined;
      switch (t.color) {
        case "purple":
          return r ? "border border-violet-500 bg-transparent text-violet-700 dark:border-violet-400 dark:text-violet-300" : "border border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-700 dark:bg-violet-950/40 dark:text-violet-300";
        case "warning":
          return r ? "border border-amber-500 bg-transparent text-amber-800 dark:border-amber-400 dark:text-amber-200" : "border border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/35 dark:text-amber-200";
        case "success":
          return r ? "border border-emerald-500 bg-transparent text-emerald-800 dark:border-emerald-400 dark:text-emerald-200" : "border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/35 dark:text-emerald-200";
        case "danger":
          return r ? "border border-red-500 bg-transparent text-red-800 dark:border-red-400 dark:text-red-200" : "border border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/35 dark:text-red-200";
        case "orange":
          return r ? "border border-orange-500 bg-transparent text-orange-800 dark:border-orange-400 dark:text-orange-200" : "border border-orange-200 bg-orange-50 text-orange-800 dark:border-orange-800 dark:bg-orange-950/35 dark:text-orange-200";
        default:
          return r ? "border border-slate-400 bg-transparent text-[color:var(--kiut-text-primary)] dark:border-slate-500 dark:text-slate-200" : "border border-slate-200 bg-slate-100 text-[color:var(--kiut-text-primary)] dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200";
      }
    });
    return (r, l) => s.value ? (y(), x("span", {
      key: 0,
      role: "status",
      class: G(["inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-['Inter',system-ui,sans-serif]", n.value])
    }, [
      e.statusLive === !0 ? (y(), x("span", WM, [...l[0] || (l[0] = [
        c("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        c("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : E("", !0),
      c("span", {
        class: G(o.value)
      }, M(a.value), 3)
    ], 2)) : (y(), x("span", {
      key: 1,
      class: G(["inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-['Inter',system-ui,sans-serif] font-semibold tracking-tight", i.value])
    }, [
      zt(r.$slots, "default", {}, () => [
        xt(M(e.label), 1)
      ])
    ], 2));
  }
}), jM = {
  key: 0,
  class: "group relative inline-flex shrink-0"
}, YM = ["type", "disabled", "aria-label"], qM = {
  key: 1,
  class: "min-w-0 truncate"
}, UM = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, KM = ["type", "disabled", "aria-label"], XM = {
  key: 1,
  class: "min-w-0 truncate"
}, Cs = /* @__PURE__ */ Z({
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
    const t = e, s = Vi(), a = D(() => !!t.tooltip?.trim()), n = D(() => t.variant === "action"), o = D(() => !n.value), i = D(() => {
      const u = s["aria-label"];
      if (typeof u == "string" && u.length > 0) return u;
      if (n.value && t.tooltip?.trim()) return t.tooltip.trim();
    }), r = D(() => {
      const u = s.type;
      return u === "submit" || u === "reset" || u === "button" ? u : "button";
    }), l = D(() => {
      const { class: u, type: h, "aria-label": f, ...v } = s;
      return v;
    }), d = D(() => t.variant === "primary" ? [
      "px-4 py-2.5",
      "bg-[color:var(--kiut-primary)] text-white shadow-sm",
      "hover:bg-[color:var(--kiut-primary-hover)] active:bg-[color:var(--kiut-primary-dark)]",
      "dark:text-white dark:hover:brightness-110 dark:active:brightness-95"
    ] : t.variant === "secondary" ? [
      "px-4 py-2.5",
      "border border-slate-200 bg-slate-50 text-[color:var(--kiut-text-primary)]",
      "hover:border-slate-300 hover:bg-slate-100",
      "active:bg-slate-200/80",
      "dark:border-white/[0.12] dark:bg-slate-800/80 dark:text-slate-100",
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
    return (u, h) => a.value ? (y(), x("span", jM, [
      c("button", Ua({
        type: r.value,
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [d.value, T(s).class]],
        disabled: e.disabled,
        "aria-label": i.value
      }, l.value), [
        u.$slots.icon ? (y(), x("span", {
          key: 0,
          class: G(["inline-flex shrink-0", n.value ? "[&>svg]:h-5 [&>svg]:w-5" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          zt(u.$slots, "icon")
        ], 2)) : E("", !0),
        o.value ? (y(), x("span", qM, [
          zt(u.$slots, "default")
        ])) : E("", !0)
      ], 16, YM),
      c("span", UM, M(e.tooltip), 1)
    ])) : (y(), x("button", Ua({
      key: 1,
      type: r.value,
      class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [d.value, T(s).class]],
      disabled: e.disabled,
      "aria-label": i.value
    }, l.value), [
      u.$slots.icon ? (y(), x("span", {
        key: 0,
        class: G(["inline-flex shrink-0", n.value ? "[&>svg]:h-5 [&>svg]:w-5" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        zt(u.$slots, "icon")
      ], 2)) : E("", !0),
      o.value ? (y(), x("span", XM, [
        zt(u.$slots, "default")
      ])) : E("", !0)
    ], 16, KM));
  }
}), GM = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, ZM = { class: "flex shrink-0 items-start justify-between gap-4 border-b border-slate-100 bg-slate-50/50 px-6 py-5 dark:border-white/[0.04] dark:bg-white/[0.02]" }, QM = { class: "min-w-0 flex-1 space-y-1" }, JM = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, t4 = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-6" }, e4 = { class: "flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2" }, s4 = /* @__PURE__ */ Z({
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
    const s = e, a = t, o = `${`kiut-modal-${Nt()}`}-title`, i = st(null);
    function r() {
      a("cancel"), a("update:modelValue", !1);
    }
    function l() {
      a("confirm");
    }
    function d(u) {
      s.modelValue && u.key === "Escape" && (u.preventDefault(), r());
    }
    return Vt(
      () => s.modelValue,
      (u) => {
        u && requestAnimationFrame(() => {
          i.value?.focus({ preventScroll: !0 });
        });
      }
    ), fe(() => {
      document.addEventListener("keydown", d);
    }), cs(() => {
      document.removeEventListener("keydown", d);
    }), (u, h) => (y(), ct(Bo, { to: "body" }, [
      X(Ao, { name: "kiut-modal" }, {
        default: qe(() => [
          e.modelValue ? (y(), x("div", GM, [
            c("div", {
              class: "absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] dark:bg-black/60",
              "aria-hidden": "true",
              onClick: r
            }),
            c("div", {
              ref_key: "panelRef",
              ref: i,
              role: "dialog",
              "aria-modal": "true",
              "aria-labelledby": o,
              tabindex: "-1",
              class: "kiut-modal-panel relative z-10 flex max-h-[min(90vh,880px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] shadow-[var(--kiut-shadow-card)] dark:border-white/[0.08] dark:bg-[#252528] dark:shadow-black/40",
              onClick: h[0] || (h[0] = ue(() => {
              }, ["stop"]))
            }, [
              c("header", ZM, [
                c("div", QM, [
                  c("h2", {
                    id: o,
                    class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                  }, M(e.title), 1),
                  e.subtitle ? (y(), x("p", JM, M(e.subtitle), 1)) : E("", !0)
                ]),
                X(Cs, {
                  variant: "action",
                  type: "button",
                  class: "shrink-0",
                  onClick: r
                }, {
                  icon: qe(() => [
                    X(T(Li), { class: "h-5 w-5" })
                  ]),
                  _: 1
                })
              ]),
              c("div", t4, [
                zt(u.$slots, "default", {}, void 0, !0)
              ]),
              c("footer", e4, [
                X(Cs, {
                  variant: "secondary",
                  type: "button",
                  onClick: r
                }, {
                  default: qe(() => [
                    xt(M(e.cancelLabel), 1)
                  ]),
                  _: 1
                }),
                X(Cs, {
                  variant: "primary",
                  type: "button",
                  onClick: l
                }, {
                  default: qe(() => [
                    xt(M(e.confirmLabel), 1)
                  ]),
                  _: 1
                })
              ])
            ], 512)
          ])) : E("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), a4 = /* @__PURE__ */ nt(s4, [["__scopeId", "data-v-afa16f89"]]), n4 = { class: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between" }, o4 = { class: "flex min-w-0 flex-1 flex-col gap-1.5" }, i4 = { class: "flex min-w-0 items-center gap-2.5" }, r4 = {
  key: 0,
  class: "inline-flex shrink-0 items-center text-[color:var(--kiut-text-primary)] dark:text-slate-100 [&>svg]:h-5 [&>svg]:w-5",
  "aria-hidden": "true"
}, l4 = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, c4 = {
  key: 0,
  class: "flex shrink-0 flex-wrap items-center justify-end gap-2 sm:pt-0.5"
}, d4 = {
  key: 0,
  class: "mt-6"
}, u4 = /* @__PURE__ */ Z({
  name: "Section",
  __name: "Section",
  props: {
    title: {},
    subtitle: {},
    icon: {}
  },
  setup(e) {
    const t = e, s = To(), n = `${`kiut-section-${Nt()}`}-title`, o = D(() => !!(s.icon || t.icon));
    return (i, r) => (y(), x("section", {
      class: "mb-6 text-left font-['Inter',system-ui,sans-serif]",
      "aria-labelledby": n
    }, [
      c("header", n4, [
        c("div", o4, [
          c("div", i4, [
            o.value ? (y(), x("span", r4, [
              zt(i.$slots, "icon", {}, () => [
                e.icon ? (y(), ct(Ca(e.icon), { key: 0 })) : E("", !0)
              ])
            ])) : E("", !0),
            c("h2", {
              id: n,
              class: "min-w-0 text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
            }, M(e.title), 1)
          ]),
          e.subtitle ? (y(), x("p", l4, M(e.subtitle), 1)) : E("", !0)
        ]),
        i.$slots.actions ? (y(), x("div", c4, [
          zt(i.$slots, "actions")
        ])) : E("", !0)
      ]),
      i.$slots.default ? (y(), x("div", d4, [
        zt(i.$slots, "default")
      ])) : E("", !0)
    ]));
  }
}), _4 = {
  install(e) {
    e.component("KiutChartBar", ne), e.component("KiutChartLine", ge), e.component("KiutPieChart", Ys), e.component("KiutBoxplotChart", Nh), e.component("KiutCandlestickChart", Ai), e.component("KiutHistogramChart", Ti), e.component("KiutSankeyChart", pe), e.component("KiutAgentsPerDay", Jg), e.component("KiutBookingManager", Ip), e.component("KiutCheckin", r0), e.component("KiutCheckinMetrics", L0), e.component("KiutCheckinSegments", ov), e.component("KiutDisruption", Wv), e.component("KiutFAQ", ib), e.component("KiutMessagesPerAgent", pb), e.component("KiutRecordLocator", Vb), e.component("KiutSalesByChannel", nm), e.component("KiutSeller", Em), e.component("KiutTopAgents", jm), e.component("KiutPaymentMethod", S1), e.component("KiutAgentHumanConversations", gy), e.component("KiutChannelMetrics", Sy), e.component("KiutTriageCombinations", Yy), e.component("KiutSelectLanguage", s_), e.component("KiutGuardrails", T_), e.component("KiutDisruptionNotifier", C2), e.component("KiutNpsDailyMetrics", Fi), e.component("KiutNpsMetrics", vx), e.component("KiutNpsOverviewMetrics", Pi), e.component("KiutAWSCost", Ex), e.component("KiutCostUsage", nk), e.component("KiutTokenUsage", Mk), e.component("KiutConversationCount", zk), e.component("KiutTopAgentsAnalysis", Qk), e.component("KiutTopAgentsPie", l5), e.component("KiutDailyCostTrends", m5), e.component("KiutModelUsage", W5), e.component("KiutMessageRoles", iw), e.component("KiutCostPerConversations", Mw), e.component("Tabs", Bw), e.component("Table", Nw), e.component("Filters", g$), e.component("InputText", y$), e.component("InputFile", C$), e.component("InputDateTime", F$), e.component("InputRange", U$), e.component("InputNumber", Q$), e.component("Select", Ei), e.component("Toggle", iM), e.component("InputPhone", gM), e.component("SelectablePills", xM), e.component("SegmentedControl", MM), e.component("DateRangePicker", NM), e.component("Tag", HM), e.component("Button", Cs), e.component("Modal", a4), e.component("Section", u4);
  }
};
export {
  Ex as AWSCost,
  gy as AgentHumanConversations,
  Jg as AgentsPerDay,
  Ip as BookingManager,
  Nh as BoxplotChart,
  Cs as Button,
  Ai as CandlestickChart,
  Sy as ChannelMetrics,
  ne as ChartBar,
  ge as ChartLine,
  r0 as Checkin,
  L0 as CheckinMetrics,
  ov as CheckinSegments,
  zk as ConversationCount,
  Mw as CostPerConversations,
  nk as CostUsage,
  m5 as DailyCostTrends,
  NM as DateRangePicker,
  Wv as Disruption,
  C2 as DisruptionNotifier,
  ib as FAQ,
  g$ as Filters,
  T_ as Guardrails,
  Ti as HistogramChart,
  F$ as InputDateTime,
  C$ as InputFile,
  Q$ as InputNumber,
  gM as InputPhone,
  U$ as InputRange,
  y$ as InputText,
  _4 as KiutUIPlugin,
  iw as MessageRoles,
  pb as MessagesPerAgent,
  a4 as Modal,
  W5 as ModelUsage,
  Fi as NpsDailyMetrics,
  vx as NpsMetrics,
  Pi as NpsOverviewMetrics,
  S1 as PaymentMethod,
  Ys as PieChart,
  Vb as RecordLocator,
  nm as SalesByChannel,
  pe as SankeyChart,
  u4 as Section,
  MM as SegmentedControl,
  Ei as Select,
  s_ as SelectLanguage,
  xM as SelectablePills,
  Em as Seller,
  Nw as Table,
  Bw as Tabs,
  HM as Tag,
  iM as Toggle,
  Mk as TokenUsage,
  jm as TopAgents,
  Qk as TopAgentsAnalysis,
  l5 as TopAgentsPie,
  Yy as TriageCombinations
};
//# sourceMappingURL=kiut-ui.es.js.map
