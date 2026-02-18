import { defineComponent as Z, shallowRef as Va, h as Is, ref as xt, onMounted as us, onUnmounted as ja, watch as Xt, toRaw as zs, nextTick as Ya, version as Ki, isProxy as Ua, computed as T, toRef as J, createElementBlock as k, openBlock as _, createVNode as j, unref as B, normalizeStyle as bt, createCommentVNode as z, createElementVNode as d, toDisplayString as S, Fragment as X, renderList as ot, onBeforeUnmount as Gi, createStaticVNode as V, withDirectives as pn, vShow as bn, normalizeClass as as, createBlock as ht, createTextVNode as pe, resolveDynamicComponent as Zi } from "vue";
import * as mn from "echarts/core";
import { TooltipComponent as Qi, TitleComponent as Ji } from "echarts/components";
import { SankeyChart as to } from "echarts/charts";
import { CanvasRenderer as eo } from "echarts/renderers";
import Tt from "moment";
function He(e) {
  return e + 0.5 | 0;
}
const jt = (e, t, s) => Math.max(Math.min(e, s), t);
function $e(e) {
  return jt(He(e * 2.55), 0, 255);
}
function qt(e) {
  return jt(He(e * 255), 0, 255);
}
function Wt(e) {
  return jt(He(e / 2.55) / 100, 0, 1);
}
function vn(e) {
  return jt(He(e * 100), 0, 100);
}
const At = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Ws = [..."0123456789ABCDEF"], so = (e) => Ws[e & 15], no = (e) => Ws[(e & 240) >> 4] + Ws[e & 15], Ve = (e) => (e & 240) >> 4 === (e & 15), ao = (e) => Ve(e.r) && Ve(e.g) && Ve(e.b) && Ve(e.a);
function io(e) {
  var t = e.length, s;
  return e[0] === "#" && (t === 4 || t === 5 ? s = {
    r: 255 & At[e[1]] * 17,
    g: 255 & At[e[2]] * 17,
    b: 255 & At[e[3]] * 17,
    a: t === 5 ? At[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (s = {
    r: At[e[1]] << 4 | At[e[2]],
    g: At[e[3]] << 4 | At[e[4]],
    b: At[e[5]] << 4 | At[e[6]],
    a: t === 9 ? At[e[7]] << 4 | At[e[8]] : 255
  })), s;
}
const oo = (e, t) => e < 255 ? t(e) : "";
function ro(e) {
  var t = ao(e) ? so : no;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + oo(e.a, t) : void 0;
}
const lo = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function qa(e, t, s) {
  const n = t * Math.min(s, 1 - s), a = (i, o = (i + e / 30) % 12) => s - n * Math.max(Math.min(o - 3, 9 - o, 1), -1);
  return [a(0), a(8), a(4)];
}
function co(e, t, s) {
  const n = (a, i = (a + e / 60) % 6) => s - s * t * Math.max(Math.min(i, 4 - i, 1), 0);
  return [n(5), n(3), n(1)];
}
function ho(e, t, s) {
  const n = qa(e, 1, 0.5);
  let a;
  for (t + s > 1 && (a = 1 / (t + s), t *= a, s *= a), a = 0; a < 3; a++)
    n[a] *= 1 - t - s, n[a] += t;
  return n;
}
function uo(e, t, s, n, a) {
  return e === a ? (t - s) / n + (t < s ? 6 : 0) : t === a ? (s - e) / n + 2 : (e - t) / n + 4;
}
function Xs(e) {
  const s = e.r / 255, n = e.g / 255, a = e.b / 255, i = Math.max(s, n, a), o = Math.min(s, n, a), r = (i + o) / 2;
  let l, c, h;
  return i !== o && (h = i - o, c = r > 0.5 ? h / (2 - i - o) : h / (i + o), l = uo(s, n, a, h, i), l = l * 60 + 0.5), [l | 0, c || 0, r];
}
function Ks(e, t, s, n) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, s, n)).map(qt);
}
function Gs(e, t, s) {
  return Ks(qa, e, t, s);
}
function fo(e, t, s) {
  return Ks(ho, e, t, s);
}
function go(e, t, s) {
  return Ks(co, e, t, s);
}
function Xa(e) {
  return (e % 360 + 360) % 360;
}
function po(e) {
  const t = lo.exec(e);
  let s = 255, n;
  if (!t)
    return;
  t[5] !== n && (s = t[6] ? $e(+t[5]) : qt(+t[5]));
  const a = Xa(+t[2]), i = +t[3] / 100, o = +t[4] / 100;
  return t[1] === "hwb" ? n = fo(a, i, o) : t[1] === "hsv" ? n = go(a, i, o) : n = Gs(a, i, o), {
    r: n[0],
    g: n[1],
    b: n[2],
    a: s
  };
}
function bo(e, t) {
  var s = Xs(e);
  s[0] = Xa(s[0] + t), s = Gs(s), e.r = s[0], e.g = s[1], e.b = s[2];
}
function mo(e) {
  if (!e)
    return;
  const t = Xs(e), s = t[0], n = vn(t[1]), a = vn(t[2]);
  return e.a < 255 ? `hsla(${s}, ${n}%, ${a}%, ${Wt(e.a)})` : `hsl(${s}, ${n}%, ${a}%)`;
}
const yn = {
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
}, _n = {
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
function vo() {
  const e = {}, t = Object.keys(_n), s = Object.keys(yn);
  let n, a, i, o, r;
  for (n = 0; n < t.length; n++) {
    for (o = r = t[n], a = 0; a < s.length; a++)
      i = s[a], r = r.replace(i, yn[i]);
    i = parseInt(_n[o], 16), e[r] = [i >> 16 & 255, i >> 8 & 255, i & 255];
  }
  return e;
}
let je;
function yo(e) {
  je || (je = vo(), je.transparent = [0, 0, 0, 0]);
  const t = je[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const _o = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function xo(e) {
  const t = _o.exec(e);
  let s = 255, n, a, i;
  if (t) {
    if (t[7] !== n) {
      const o = +t[7];
      s = t[8] ? $e(o) : jt(o * 255, 0, 255);
    }
    return n = +t[1], a = +t[3], i = +t[5], n = 255 & (t[2] ? $e(n) : jt(n, 0, 255)), a = 255 & (t[4] ? $e(a) : jt(a, 0, 255)), i = 255 & (t[6] ? $e(i) : jt(i, 0, 255)), {
      r: n,
      g: a,
      b: i,
      a: s
    };
  }
}
function ko(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${Wt(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const Ss = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, de = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function Mo(e, t, s) {
  const n = de(Wt(e.r)), a = de(Wt(e.g)), i = de(Wt(e.b));
  return {
    r: qt(Ss(n + s * (de(Wt(t.r)) - n))),
    g: qt(Ss(a + s * (de(Wt(t.g)) - a))),
    b: qt(Ss(i + s * (de(Wt(t.b)) - i))),
    a: e.a + s * (t.a - e.a)
  };
}
function Ye(e, t, s) {
  if (e) {
    let n = Xs(e);
    n[t] = Math.max(0, Math.min(n[t] + n[t] * s, t === 0 ? 360 : 1)), n = Gs(n), e.r = n[0], e.g = n[1], e.b = n[2];
  }
}
function Ka(e, t) {
  return e && Object.assign(t || {}, e);
}
function xn(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = qt(e[3]))) : (t = Ka(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = qt(t.a)), t;
}
function So(e) {
  return e.charAt(0) === "r" ? xo(e) : po(e);
}
class Le {
  constructor(t) {
    if (t instanceof Le)
      return t;
    const s = typeof t;
    let n;
    s === "object" ? n = xn(t) : s === "string" && (n = io(t) || yo(t) || So(t)), this._rgb = n, this._valid = !!n;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = Ka(this._rgb);
    return t && (t.a = Wt(t.a)), t;
  }
  set rgb(t) {
    this._rgb = xn(t);
  }
  rgbString() {
    return this._valid ? ko(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? ro(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? mo(this._rgb) : void 0;
  }
  mix(t, s) {
    if (t) {
      const n = this.rgb, a = t.rgb;
      let i;
      const o = s === i ? 0.5 : s, r = 2 * o - 1, l = n.a - a.a, c = ((r * l === -1 ? r : (r + l) / (1 + r * l)) + 1) / 2;
      i = 1 - c, n.r = 255 & c * n.r + i * a.r + 0.5, n.g = 255 & c * n.g + i * a.g + 0.5, n.b = 255 & c * n.b + i * a.b + 0.5, n.a = o * n.a + (1 - o) * a.a, this.rgb = n;
    }
    return this;
  }
  interpolate(t, s) {
    return t && (this._rgb = Mo(this._rgb, t._rgb, s)), this;
  }
  clone() {
    return new Le(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = qt(t), this;
  }
  clearer(t) {
    const s = this._rgb;
    return s.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, s = He(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
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
    return Ye(this._rgb, 2, t), this;
  }
  darken(t) {
    return Ye(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return Ye(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return Ye(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return bo(this._rgb, t), this;
  }
}
function Rt() {
}
const wo = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function et(e) {
  return e == null;
}
function ft(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function K(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function kt(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function Pt(e, t) {
  return kt(e) ? e : t;
}
function Y(e, t) {
  return typeof e > "u" ? t : e;
}
const Co = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, Ga = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function lt(e, t, s) {
  if (e && typeof e.call == "function")
    return e.apply(s, t);
}
function nt(e, t, s, n) {
  let a, i, o;
  if (ft(e))
    for (i = e.length, a = 0; a < i; a++)
      t.call(s, e[a], a);
  else if (K(e))
    for (o = Object.keys(e), i = o.length, a = 0; a < i; a++)
      t.call(s, e[o[a]], o[a]);
}
function is(e, t) {
  let s, n, a, i;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (s = 0, n = e.length; s < n; ++s)
    if (a = e[s], i = t[s], a.datasetIndex !== i.datasetIndex || a.index !== i.index)
      return !1;
  return !0;
}
function os(e) {
  if (ft(e))
    return e.map(os);
  if (K(e)) {
    const t = /* @__PURE__ */ Object.create(null), s = Object.keys(e), n = s.length;
    let a = 0;
    for (; a < n; ++a)
      t[s[a]] = os(e[s[a]]);
    return t;
  }
  return e;
}
function Za(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function $o(e, t, s, n) {
  if (!Za(e))
    return;
  const a = t[e], i = s[e];
  K(a) && K(i) ? Ee(a, i, n) : t[e] = os(i);
}
function Ee(e, t, s) {
  const n = ft(t) ? t : [
    t
  ], a = n.length;
  if (!K(e))
    return e;
  s = s || {};
  const i = s.merger || $o;
  let o;
  for (let r = 0; r < a; ++r) {
    if (o = n[r], !K(o))
      continue;
    const l = Object.keys(o);
    for (let c = 0, h = l.length; c < h; ++c)
      i(l[c], e, o, s);
  }
  return e;
}
function Te(e, t) {
  return Ee(e, t, {
    merger: Do
  });
}
function Do(e, t, s) {
  if (!Za(e))
    return;
  const n = t[e], a = s[e];
  K(n) && K(a) ? Te(n, a) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = os(a));
}
const kn = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function Ao(e) {
  const t = e.split("."), s = [];
  let n = "";
  for (const a of t)
    n += a, n.endsWith("\\") ? n = n.slice(0, -1) + "." : (s.push(n), n = "");
  return s;
}
function To(e) {
  const t = Ao(e);
  return (s) => {
    for (const n of t) {
      if (n === "")
        break;
      s = s && s[n];
    }
    return s;
  };
}
function ae(e, t) {
  return (kn[t] || (kn[t] = To(t)))(e);
}
function Zs(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const Oe = (e) => typeof e < "u", Kt = (e) => typeof e == "function", Mn = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const s of e)
    if (!t.has(s))
      return !1;
  return !0;
};
function Fo(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const at = Math.PI, dt = 2 * at, Bo = dt + at, rs = Number.POSITIVE_INFINITY, Po = at / 180, pt = at / 2, Zt = at / 4, Sn = at * 2 / 3, Qa = Math.log10, Ot = Math.sign;
function Fe(e, t, s) {
  return Math.abs(e - t) < s;
}
function wn(e) {
  const t = Math.round(e);
  e = Fe(e, t, e / 1e3) ? t : e;
  const s = Math.pow(10, Math.floor(Qa(e))), n = e / s;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * s;
}
function Lo(e) {
  const t = [], s = Math.sqrt(e);
  let n;
  for (n = 1; n < s; n++)
    e % n === 0 && (t.push(n), t.push(e / n));
  return s === (s | 0) && t.push(s), t.sort((a, i) => a - i).pop(), t;
}
function Eo(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function Re(e) {
  return !Eo(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function Oo(e, t) {
  const s = Math.round(e);
  return s - t <= e && s + t >= e;
}
function Ro(e, t, s) {
  let n, a, i;
  for (n = 0, a = e.length; n < a; n++)
    i = e[n][s], isNaN(i) || (t.min = Math.min(t.min, i), t.max = Math.max(t.max, i));
}
function Nt(e) {
  return e * (at / 180);
}
function Io(e) {
  return e * (180 / at);
}
function Cn(e) {
  if (!kt(e))
    return;
  let t = 1, s = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, s++;
  return s;
}
function Ja(e, t) {
  const s = t.x - e.x, n = t.y - e.y, a = Math.sqrt(s * s + n * n);
  let i = Math.atan2(n, s);
  return i < -0.5 * at && (i += dt), {
    angle: i,
    distance: a
  };
}
function Ns(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function zo(e, t) {
  return (e - t + Bo) % dt - at;
}
function $t(e) {
  return (e % dt + dt) % dt;
}
function Ie(e, t, s, n) {
  const a = $t(e), i = $t(t), o = $t(s), r = $t(i - a), l = $t(o - a), c = $t(a - i), h = $t(a - o);
  return a === i || a === o || n && i === o || r > l && c < h;
}
function yt(e, t, s) {
  return Math.max(t, Math.min(s, e));
}
function Wo(e) {
  return yt(e, -32768, 32767);
}
function Ht(e, t, s, n = 1e-6) {
  return e >= Math.min(t, s) - n && e <= Math.max(t, s) + n;
}
function Qs(e, t, s) {
  s = s || ((o) => e[o] < t);
  let n = e.length - 1, a = 0, i;
  for (; n - a > 1; )
    i = a + n >> 1, s(i) ? a = i : n = i;
  return {
    lo: a,
    hi: n
  };
}
const se = (e, t, s, n) => Qs(e, s, n ? (a) => {
  const i = e[a][t];
  return i < s || i === s && e[a + 1][t] === s;
} : (a) => e[a][t] < s), No = (e, t, s) => Qs(e, s, (n) => e[n][t] >= s);
function Ho(e, t, s) {
  let n = 0, a = e.length;
  for (; n < a && e[n] < t; )
    n++;
  for (; a > n && e[a - 1] > s; )
    a--;
  return n > 0 || a < e.length ? e.slice(n, a) : e;
}
const ti = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function Vo(e, t) {
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
  }), ti.forEach((s) => {
    const n = "_onData" + Zs(s), a = e[s];
    Object.defineProperty(e, s, {
      configurable: !0,
      enumerable: !1,
      value(...i) {
        const o = a.apply(this, i);
        return e._chartjs.listeners.forEach((r) => {
          typeof r[n] == "function" && r[n](...i);
        }), o;
      }
    });
  });
}
function $n(e, t) {
  const s = e._chartjs;
  if (!s)
    return;
  const n = s.listeners, a = n.indexOf(t);
  a !== -1 && n.splice(a, 1), !(n.length > 0) && (ti.forEach((i) => {
    delete e[i];
  }), delete e._chartjs);
}
function ei(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const si = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function ni(e, t) {
  let s = [], n = !1;
  return function(...a) {
    s = a, n || (n = !0, si.call(window, () => {
      n = !1, e.apply(t, s);
    }));
  };
}
function jo(e, t) {
  let s;
  return function(...n) {
    return t ? (clearTimeout(s), s = setTimeout(e, t, n)) : e.apply(this, n), t;
  };
}
const Js = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", vt = (e, t, s) => e === "start" ? t : e === "end" ? s : (t + s) / 2, Yo = (e, t, s, n) => e === (n ? "left" : "right") ? s : e === "center" ? (t + s) / 2 : t;
function Uo(e, t, s) {
  const n = t.length;
  let a = 0, i = n;
  if (e._sorted) {
    const { iScale: o, vScale: r, _parsed: l } = e, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, h = o.axis, { min: u, max: f, minDefined: g, maxDefined: p } = o.getUserBounds();
    if (g) {
      if (a = Math.min(
        // @ts-expect-error Need to type _parsed
        se(l, h, u).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        s ? n : se(t, h, o.getPixelForValue(u)).lo
      ), c) {
        const v = l.slice(0, a + 1).reverse().findIndex((m) => !et(m[r.axis]));
        a -= Math.max(0, v);
      }
      a = yt(a, 0, n - 1);
    }
    if (p) {
      let v = Math.max(
        // @ts-expect-error Need to type _parsed
        se(l, o.axis, f, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        s ? 0 : se(t, h, o.getPixelForValue(f), !0).hi + 1
      );
      if (c) {
        const m = l.slice(v - 1).findIndex((b) => !et(b[r.axis]));
        v += Math.max(0, m);
      }
      i = yt(v, a, n) - a;
    } else
      i = n - a;
  }
  return {
    start: a,
    count: i
  };
}
function qo(e) {
  const { xScale: t, yScale: s, _scaleRanges: n } = e, a = {
    xmin: t.min,
    xmax: t.max,
    ymin: s.min,
    ymax: s.max
  };
  if (!n)
    return e._scaleRanges = a, !0;
  const i = n.xmin !== t.min || n.xmax !== t.max || n.ymin !== s.min || n.ymax !== s.max;
  return Object.assign(n, a), i;
}
const Ue = (e) => e === 0 || e === 1, Dn = (e, t, s) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * dt / s)), An = (e, t, s) => Math.pow(2, -10 * e) * Math.sin((e - t) * dt / s) + 1, Be = {
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
  easeInSine: (e) => -Math.cos(e * pt) + 1,
  easeOutSine: (e) => Math.sin(e * pt),
  easeInOutSine: (e) => -0.5 * (Math.cos(at * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => Ue(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => Ue(e) ? e : Dn(e, 0.075, 0.3),
  easeOutElastic: (e) => Ue(e) ? e : An(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return Ue(e) ? e : e < 0.5 ? 0.5 * Dn(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * An(e * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (e) => 1 - Be.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? Be.easeInBounce(e * 2) * 0.5 : Be.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function tn(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function Tn(e) {
  return tn(e) ? e : new Le(e);
}
function ws(e) {
  return tn(e) ? e : new Le(e).saturate(0.5).darken(0.1).hexString();
}
const Xo = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], Ko = [
  "color",
  "borderColor",
  "backgroundColor"
];
function Go(e) {
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
      properties: Ko
    },
    numbers: {
      type: "number",
      properties: Xo
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
function Zo(e) {
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
const Fn = /* @__PURE__ */ new Map();
function Qo(e, t) {
  t = t || {};
  const s = e + JSON.stringify(t);
  let n = Fn.get(s);
  return n || (n = new Intl.NumberFormat(e, t), Fn.set(s, n)), n;
}
function en(e, t, s) {
  return Qo(t, s).format(e);
}
const Jo = {
  values(e) {
    return ft(e) ? e : "" + e;
  },
  numeric(e, t, s) {
    if (e === 0)
      return "0";
    const n = this.chart.options.locale;
    let a, i = e;
    if (s.length > 1) {
      const c = Math.max(Math.abs(s[0].value), Math.abs(s[s.length - 1].value));
      (c < 1e-4 || c > 1e15) && (a = "scientific"), i = tr(e, s);
    }
    const o = Qa(Math.abs(i)), r = isNaN(o) ? 1 : Math.max(Math.min(-1 * Math.floor(o), 20), 0), l = {
      notation: a,
      minimumFractionDigits: r,
      maximumFractionDigits: r
    };
    return Object.assign(l, this.options.ticks.format), en(e, n, l);
  }
};
function tr(e, t) {
  let s = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(s) >= 1 && e !== Math.floor(e) && (s = e - Math.floor(e)), s;
}
var ai = {
  formatters: Jo
};
function er(e) {
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
      callback: ai.formatters.values,
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
const ie = /* @__PURE__ */ Object.create(null), Hs = /* @__PURE__ */ Object.create(null);
function Pe(e, t) {
  if (!t)
    return e;
  const s = t.split(".");
  for (let n = 0, a = s.length; n < a; ++n) {
    const i = s[n];
    e = e[i] || (e[i] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function Cs(e, t, s) {
  return typeof t == "string" ? Ee(Pe(e, t), s) : Ee(Pe(e, ""), t);
}
class sr {
  constructor(t, s) {
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
    }, this.hover = {}, this.hoverBackgroundColor = (n, a) => ws(a.backgroundColor), this.hoverBorderColor = (n, a) => ws(a.borderColor), this.hoverColor = (n, a) => ws(a.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(s);
  }
  set(t, s) {
    return Cs(this, t, s);
  }
  get(t) {
    return Pe(this, t);
  }
  describe(t, s) {
    return Cs(Hs, t, s);
  }
  override(t, s) {
    return Cs(ie, t, s);
  }
  route(t, s, n, a) {
    const i = Pe(this, t), o = Pe(this, n), r = "_" + s;
    Object.defineProperties(i, {
      [r]: {
        value: i[s],
        writable: !0
      },
      [s]: {
        enumerable: !0,
        get() {
          const l = this[r], c = o[a];
          return K(l) ? Object.assign({}, c, l) : Y(l, c);
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
var ut = /* @__PURE__ */ new sr({
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
  Go,
  Zo,
  er
]);
function nr(e) {
  return !e || et(e.size) || et(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function Bn(e, t, s, n, a) {
  let i = t[a];
  return i || (i = t[a] = e.measureText(a).width, s.push(a)), i > n && (n = i), n;
}
function Qt(e, t, s) {
  const n = e.currentDevicePixelRatio, a = s !== 0 ? Math.max(s / 2, 0.5) : 0;
  return Math.round((t - a) * n) / n + a;
}
function Pn(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function Vs(e, t, s, n) {
  ii(e, t, s, n, null);
}
function ii(e, t, s, n, a) {
  let i, o, r, l, c, h, u, f;
  const g = t.pointStyle, p = t.rotation, v = t.radius;
  let m = (p || 0) * Po;
  if (g && typeof g == "object" && (i = g.toString(), i === "[object HTMLImageElement]" || i === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(s, n), e.rotate(m), e.drawImage(g, -g.width / 2, -g.height / 2, g.width, g.height), e.restore();
    return;
  }
  if (!(isNaN(v) || v <= 0)) {
    switch (e.beginPath(), g) {
      // Default includes circle
      default:
        a ? e.ellipse(s, n, a / 2, v, 0, 0, dt) : e.arc(s, n, v, 0, dt), e.closePath();
        break;
      case "triangle":
        h = a ? a / 2 : v, e.moveTo(s + Math.sin(m) * h, n - Math.cos(m) * v), m += Sn, e.lineTo(s + Math.sin(m) * h, n - Math.cos(m) * v), m += Sn, e.lineTo(s + Math.sin(m) * h, n - Math.cos(m) * v), e.closePath();
        break;
      case "rectRounded":
        c = v * 0.516, l = v - c, o = Math.cos(m + Zt) * l, u = Math.cos(m + Zt) * (a ? a / 2 - c : l), r = Math.sin(m + Zt) * l, f = Math.sin(m + Zt) * (a ? a / 2 - c : l), e.arc(s - u, n - r, c, m - at, m - pt), e.arc(s + f, n - o, c, m - pt, m), e.arc(s + u, n + r, c, m, m + pt), e.arc(s - f, n + o, c, m + pt, m + at), e.closePath();
        break;
      case "rect":
        if (!p) {
          l = Math.SQRT1_2 * v, h = a ? a / 2 : l, e.rect(s - h, n - l, 2 * h, 2 * l);
          break;
        }
        m += Zt;
      /* falls through */
      case "rectRot":
        u = Math.cos(m) * (a ? a / 2 : v), o = Math.cos(m) * v, r = Math.sin(m) * v, f = Math.sin(m) * (a ? a / 2 : v), e.moveTo(s - u, n - r), e.lineTo(s + f, n - o), e.lineTo(s + u, n + r), e.lineTo(s - f, n + o), e.closePath();
        break;
      case "crossRot":
        m += Zt;
      /* falls through */
      case "cross":
        u = Math.cos(m) * (a ? a / 2 : v), o = Math.cos(m) * v, r = Math.sin(m) * v, f = Math.sin(m) * (a ? a / 2 : v), e.moveTo(s - u, n - r), e.lineTo(s + u, n + r), e.moveTo(s + f, n - o), e.lineTo(s - f, n + o);
        break;
      case "star":
        u = Math.cos(m) * (a ? a / 2 : v), o = Math.cos(m) * v, r = Math.sin(m) * v, f = Math.sin(m) * (a ? a / 2 : v), e.moveTo(s - u, n - r), e.lineTo(s + u, n + r), e.moveTo(s + f, n - o), e.lineTo(s - f, n + o), m += Zt, u = Math.cos(m) * (a ? a / 2 : v), o = Math.cos(m) * v, r = Math.sin(m) * v, f = Math.sin(m) * (a ? a / 2 : v), e.moveTo(s - u, n - r), e.lineTo(s + u, n + r), e.moveTo(s + f, n - o), e.lineTo(s - f, n + o);
        break;
      case "line":
        o = a ? a / 2 : Math.cos(m) * v, r = Math.sin(m) * v, e.moveTo(s - o, n - r), e.lineTo(s + o, n + r);
        break;
      case "dash":
        e.moveTo(s, n), e.lineTo(s + Math.cos(m) * (a ? a / 2 : v), n + Math.sin(m) * v);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function ze(e, t, s) {
  return s = s || 0.5, !t || e && e.x > t.left - s && e.x < t.right + s && e.y > t.top - s && e.y < t.bottom + s;
}
function fs(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function gs(e) {
  e.restore();
}
function ar(e, t, s, n, a) {
  if (!t)
    return e.lineTo(s.x, s.y);
  if (a === "middle") {
    const i = (t.x + s.x) / 2;
    e.lineTo(i, t.y), e.lineTo(i, s.y);
  } else a === "after" != !!n ? e.lineTo(t.x, s.y) : e.lineTo(s.x, t.y);
  e.lineTo(s.x, s.y);
}
function ir(e, t, s, n) {
  if (!t)
    return e.lineTo(s.x, s.y);
  e.bezierCurveTo(n ? t.cp1x : t.cp2x, n ? t.cp1y : t.cp2y, n ? s.cp2x : s.cp1x, n ? s.cp2y : s.cp1y, s.x, s.y);
}
function or(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), et(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function rr(e, t, s, n, a) {
  if (a.strikethrough || a.underline) {
    const i = e.measureText(n), o = t - i.actualBoundingBoxLeft, r = t + i.actualBoundingBoxRight, l = s - i.actualBoundingBoxAscent, c = s + i.actualBoundingBoxDescent, h = a.strikethrough ? (l + c) / 2 : c;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = a.decorationWidth || 2, e.moveTo(o, h), e.lineTo(r, h), e.stroke();
  }
}
function lr(e, t) {
  const s = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = s;
}
function We(e, t, s, n, a, i = {}) {
  const o = ft(t) ? t : [
    t
  ], r = i.strokeWidth > 0 && i.strokeColor !== "";
  let l, c;
  for (e.save(), e.font = a.string, or(e, i), l = 0; l < o.length; ++l)
    c = o[l], i.backdrop && lr(e, i.backdrop), r && (i.strokeColor && (e.strokeStyle = i.strokeColor), et(i.strokeWidth) || (e.lineWidth = i.strokeWidth), e.strokeText(c, s, n, i.maxWidth)), e.fillText(c, s, n, i.maxWidth), rr(e, s, n, c, i), n += Number(a.lineHeight);
  e.restore();
}
function ls(e, t) {
  const { x: s, y: n, w: a, h: i, radius: o } = t;
  e.arc(s + o.topLeft, n + o.topLeft, o.topLeft, 1.5 * at, at, !0), e.lineTo(s, n + i - o.bottomLeft), e.arc(s + o.bottomLeft, n + i - o.bottomLeft, o.bottomLeft, at, pt, !0), e.lineTo(s + a - o.bottomRight, n + i), e.arc(s + a - o.bottomRight, n + i - o.bottomRight, o.bottomRight, pt, 0, !0), e.lineTo(s + a, n + o.topRight), e.arc(s + a - o.topRight, n + o.topRight, o.topRight, 0, -pt, !0), e.lineTo(s + o.topLeft, n);
}
const cr = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, dr = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function hr(e, t) {
  const s = ("" + e).match(cr);
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
const ur = (e) => +e || 0;
function sn(e, t) {
  const s = {}, n = K(t), a = n ? Object.keys(t) : t, i = K(e) ? n ? (o) => Y(e[o], e[t[o]]) : (o) => e[o] : () => e;
  for (const o of a)
    s[o] = ur(i(o));
  return s;
}
function oi(e) {
  return sn(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function fe(e) {
  return sn(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function Bt(e) {
  const t = oi(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function _t(e, t) {
  e = e || {}, t = t || ut.font;
  let s = Y(e.size, t.size);
  typeof s == "string" && (s = parseInt(s, 10));
  let n = Y(e.style, t.style);
  n && !("" + n).match(dr) && (console.warn('Invalid font style specified: "' + n + '"'), n = void 0);
  const a = {
    family: Y(e.family, t.family),
    lineHeight: hr(Y(e.lineHeight, t.lineHeight), s),
    size: s,
    style: n,
    weight: Y(e.weight, t.weight),
    string: ""
  };
  return a.string = nr(a), a;
}
function qe(e, t, s, n) {
  let a, i, o;
  for (a = 0, i = e.length; a < i; ++a)
    if (o = e[a], o !== void 0 && o !== void 0)
      return o;
}
function fr(e, t, s) {
  const { min: n, max: a } = e, i = Ga(t, (a - n) / 2), o = (r, l) => s && r === 0 ? 0 : r + l;
  return {
    min: o(n, -Math.abs(i)),
    max: o(a, i)
  };
}
function oe(e, t) {
  return Object.assign(Object.create(e), t);
}
function nn(e, t = [
  ""
], s, n, a = () => e[0]) {
  const i = s || e;
  typeof n > "u" && (n = di("_fallback", e));
  const o = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: i,
    _fallback: n,
    _getTarget: a,
    override: (r) => nn([
      r,
      ...e
    ], t, i, n)
  };
  return new Proxy(o, {
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
      return li(r, l, () => xr(l, t, e, r));
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
      return En(r).includes(l);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(r) {
      return En(r);
    },
    /**
    * A trap for setting property values.
    */
    set(r, l, c) {
      const h = r._storage || (r._storage = a());
      return r[l] = h[l] = c, delete r._keys, !0;
    }
  });
}
function be(e, t, s, n) {
  const a = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: s,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: ri(e, n),
    setContext: (i) => be(e, i, s, n),
    override: (i) => be(e.override(i), t, s, n)
  };
  return new Proxy(a, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(i, o) {
      return delete i[o], delete e[o], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(i, o, r) {
      return li(i, o, () => pr(i, o, r));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(i, o) {
      return i._descriptors.allKeys ? Reflect.has(e, o) ? {
        enumerable: !0,
        configurable: !0
      } : void 0 : Reflect.getOwnPropertyDescriptor(e, o);
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
    has(i, o) {
      return Reflect.has(e, o);
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
    set(i, o, r) {
      return e[o] = r, delete i[o], !0;
    }
  });
}
function ri(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: s = t.scriptable, _indexable: n = t.indexable, _allKeys: a = t.allKeys } = e;
  return {
    allKeys: a,
    scriptable: s,
    indexable: n,
    isScriptable: Kt(s) ? s : () => s,
    isIndexable: Kt(n) ? n : () => n
  };
}
const gr = (e, t) => e ? e + Zs(t) : t, an = (e, t) => K(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function li(e, t, s) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const n = s();
  return e[t] = n, n;
}
function pr(e, t, s) {
  const { _proxy: n, _context: a, _subProxy: i, _descriptors: o } = e;
  let r = n[t];
  return Kt(r) && o.isScriptable(t) && (r = br(t, r, e, s)), ft(r) && r.length && (r = mr(t, r, e, o.isIndexable)), an(t, r) && (r = be(r, a, i && i[t], o)), r;
}
function br(e, t, s, n) {
  const { _proxy: a, _context: i, _subProxy: o, _stack: r } = s;
  if (r.has(e))
    throw new Error("Recursion detected: " + Array.from(r).join("->") + "->" + e);
  r.add(e);
  let l = t(i, o || n);
  return r.delete(e), an(e, l) && (l = on(a._scopes, a, e, l)), l;
}
function mr(e, t, s, n) {
  const { _proxy: a, _context: i, _subProxy: o, _descriptors: r } = s;
  if (typeof i.index < "u" && n(e))
    return t[i.index % t.length];
  if (K(t[0])) {
    const l = t, c = a._scopes.filter((h) => h !== l);
    t = [];
    for (const h of l) {
      const u = on(c, a, e, h);
      t.push(be(u, i, o && o[e], r));
    }
  }
  return t;
}
function ci(e, t, s) {
  return Kt(e) ? e(t, s) : e;
}
const vr = (e, t) => e === !0 ? t : typeof e == "string" ? ae(t, e) : void 0;
function yr(e, t, s, n, a) {
  for (const i of t) {
    const o = vr(s, i);
    if (o) {
      e.add(o);
      const r = ci(o._fallback, s, a);
      if (typeof r < "u" && r !== s && r !== n)
        return r;
    } else if (o === !1 && typeof n < "u" && s !== n)
      return null;
  }
  return !1;
}
function on(e, t, s, n) {
  const a = t._rootScopes, i = ci(t._fallback, s, n), o = [
    ...e,
    ...a
  ], r = /* @__PURE__ */ new Set();
  r.add(n);
  let l = Ln(r, o, s, i || s, n);
  return l === null || typeof i < "u" && i !== s && (l = Ln(r, o, i, l, n), l === null) ? !1 : nn(Array.from(r), [
    ""
  ], a, i, () => _r(t, s, n));
}
function Ln(e, t, s, n, a) {
  for (; s; )
    s = yr(e, t, s, n, a);
  return s;
}
function _r(e, t, s) {
  const n = e._getTarget();
  t in n || (n[t] = {});
  const a = n[t];
  return ft(a) && K(s) ? s : a || {};
}
function xr(e, t, s, n) {
  let a;
  for (const i of t)
    if (a = di(gr(i, e), s), typeof a < "u")
      return an(e, a) ? on(s, n, e, a) : a;
}
function di(e, t) {
  for (const s of t) {
    if (!s)
      continue;
    const n = s[e];
    if (typeof n < "u")
      return n;
  }
}
function En(e) {
  let t = e._keys;
  return t || (t = e._keys = kr(e._scopes)), t;
}
function kr(e) {
  const t = /* @__PURE__ */ new Set();
  for (const s of e)
    for (const n of Object.keys(s).filter((a) => !a.startsWith("_")))
      t.add(n);
  return Array.from(t);
}
const Mr = Number.EPSILON || 1e-14, me = (e, t) => t < e.length && !e[t].skip && e[t], hi = (e) => e === "x" ? "y" : "x";
function Sr(e, t, s, n) {
  const a = e.skip ? t : e, i = t, o = s.skip ? t : s, r = Ns(i, a), l = Ns(o, i);
  let c = r / (r + l), h = l / (r + l);
  c = isNaN(c) ? 0 : c, h = isNaN(h) ? 0 : h;
  const u = n * c, f = n * h;
  return {
    previous: {
      x: i.x - u * (o.x - a.x),
      y: i.y - u * (o.y - a.y)
    },
    next: {
      x: i.x + f * (o.x - a.x),
      y: i.y + f * (o.y - a.y)
    }
  };
}
function wr(e, t, s) {
  const n = e.length;
  let a, i, o, r, l, c = me(e, 0);
  for (let h = 0; h < n - 1; ++h)
    if (l = c, c = me(e, h + 1), !(!l || !c)) {
      if (Fe(t[h], 0, Mr)) {
        s[h] = s[h + 1] = 0;
        continue;
      }
      a = s[h] / t[h], i = s[h + 1] / t[h], r = Math.pow(a, 2) + Math.pow(i, 2), !(r <= 9) && (o = 3 / Math.sqrt(r), s[h] = a * o * t[h], s[h + 1] = i * o * t[h]);
    }
}
function Cr(e, t, s = "x") {
  const n = hi(s), a = e.length;
  let i, o, r, l = me(e, 0);
  for (let c = 0; c < a; ++c) {
    if (o = r, r = l, l = me(e, c + 1), !r)
      continue;
    const h = r[s], u = r[n];
    o && (i = (h - o[s]) / 3, r[`cp1${s}`] = h - i, r[`cp1${n}`] = u - i * t[c]), l && (i = (l[s] - h) / 3, r[`cp2${s}`] = h + i, r[`cp2${n}`] = u + i * t[c]);
  }
}
function $r(e, t = "x") {
  const s = hi(t), n = e.length, a = Array(n).fill(0), i = Array(n);
  let o, r, l, c = me(e, 0);
  for (o = 0; o < n; ++o)
    if (r = l, l = c, c = me(e, o + 1), !!l) {
      if (c) {
        const h = c[t] - l[t];
        a[o] = h !== 0 ? (c[s] - l[s]) / h : 0;
      }
      i[o] = r ? c ? Ot(a[o - 1]) !== Ot(a[o]) ? 0 : (a[o - 1] + a[o]) / 2 : a[o - 1] : a[o];
    }
  wr(e, a, i), Cr(e, i, t);
}
function Xe(e, t, s) {
  return Math.max(Math.min(e, s), t);
}
function Dr(e, t) {
  let s, n, a, i, o, r = ze(e[0], t);
  for (s = 0, n = e.length; s < n; ++s)
    o = i, i = r, r = s < n - 1 && ze(e[s + 1], t), i && (a = e[s], o && (a.cp1x = Xe(a.cp1x, t.left, t.right), a.cp1y = Xe(a.cp1y, t.top, t.bottom)), r && (a.cp2x = Xe(a.cp2x, t.left, t.right), a.cp2y = Xe(a.cp2y, t.top, t.bottom)));
}
function Ar(e, t, s, n, a) {
  let i, o, r, l;
  if (t.spanGaps && (e = e.filter((c) => !c.skip)), t.cubicInterpolationMode === "monotone")
    $r(e, a);
  else {
    let c = n ? e[e.length - 1] : e[0];
    for (i = 0, o = e.length; i < o; ++i)
      r = e[i], l = Sr(c, r, e[Math.min(i + 1, o - (n ? 0 : 1)) % o], t.tension), r.cp1x = l.previous.x, r.cp1y = l.previous.y, r.cp2x = l.next.x, r.cp2y = l.next.y, c = r;
  }
  t.capBezierPoints && Dr(e, s);
}
function rn() {
  return typeof window < "u" && typeof document < "u";
}
function ln(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function cs(e, t, s) {
  let n;
  return typeof e == "string" ? (n = parseInt(e, 10), e.indexOf("%") !== -1 && (n = n / 100 * t.parentNode[s])) : n = e, n;
}
const ps = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function Tr(e, t) {
  return ps(e).getPropertyValue(t);
}
const Fr = [
  "top",
  "right",
  "bottom",
  "left"
];
function ne(e, t, s) {
  const n = {};
  s = s ? "-" + s : "";
  for (let a = 0; a < 4; a++) {
    const i = Fr[a];
    n[i] = parseFloat(e[t + "-" + i + s]) || 0;
  }
  return n.width = n.left + n.right, n.height = n.top + n.bottom, n;
}
const Br = (e, t, s) => (e > 0 || t > 0) && (!s || !s.shadowRoot);
function Pr(e, t) {
  const s = e.touches, n = s && s.length ? s[0] : e, { offsetX: a, offsetY: i } = n;
  let o = !1, r, l;
  if (Br(a, i, e.target))
    r = a, l = i;
  else {
    const c = t.getBoundingClientRect();
    r = n.clientX - c.left, l = n.clientY - c.top, o = !0;
  }
  return {
    x: r,
    y: l,
    box: o
  };
}
function te(e, t) {
  if ("native" in e)
    return e;
  const { canvas: s, currentDevicePixelRatio: n } = t, a = ps(s), i = a.boxSizing === "border-box", o = ne(a, "padding"), r = ne(a, "border", "width"), { x: l, y: c, box: h } = Pr(e, s), u = o.left + (h && r.left), f = o.top + (h && r.top);
  let { width: g, height: p } = t;
  return i && (g -= o.width + r.width, p -= o.height + r.height), {
    x: Math.round((l - u) / g * s.width / n),
    y: Math.round((c - f) / p * s.height / n)
  };
}
function Lr(e, t, s) {
  let n, a;
  if (t === void 0 || s === void 0) {
    const i = e && ln(e);
    if (!i)
      t = e.clientWidth, s = e.clientHeight;
    else {
      const o = i.getBoundingClientRect(), r = ps(i), l = ne(r, "border", "width"), c = ne(r, "padding");
      t = o.width - c.width - l.width, s = o.height - c.height - l.height, n = cs(r.maxWidth, i, "clientWidth"), a = cs(r.maxHeight, i, "clientHeight");
    }
  }
  return {
    width: t,
    height: s,
    maxWidth: n || rs,
    maxHeight: a || rs
  };
}
const Yt = (e) => Math.round(e * 10) / 10;
function Er(e, t, s, n) {
  const a = ps(e), i = ne(a, "margin"), o = cs(a.maxWidth, e, "clientWidth") || rs, r = cs(a.maxHeight, e, "clientHeight") || rs, l = Lr(e, t, s);
  let { width: c, height: h } = l;
  if (a.boxSizing === "content-box") {
    const f = ne(a, "border", "width"), g = ne(a, "padding");
    c -= g.width + f.width, h -= g.height + f.height;
  }
  return c = Math.max(0, c - i.width), h = Math.max(0, n ? c / n : h - i.height), c = Yt(Math.min(c, o, l.maxWidth)), h = Yt(Math.min(h, r, l.maxHeight)), c && !h && (h = Yt(c / 2)), (t !== void 0 || s !== void 0) && n && l.height && h > l.height && (h = l.height, c = Yt(Math.floor(h * n))), {
    width: c,
    height: h
  };
}
function On(e, t, s) {
  const n = t || 1, a = Yt(e.height * n), i = Yt(e.width * n);
  e.height = Yt(e.height), e.width = Yt(e.width);
  const o = e.canvas;
  return o.style && (s || !o.style.height && !o.style.width) && (o.style.height = `${e.height}px`, o.style.width = `${e.width}px`), e.currentDevicePixelRatio !== n || o.height !== a || o.width !== i ? (e.currentDevicePixelRatio = n, o.height = a, o.width = i, e.ctx.setTransform(n, 0, 0, n, 0, 0), !0) : !1;
}
const Or = (function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    rn() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function Rn(e, t) {
  const s = Tr(e, t), n = s && s.match(/^(\d+)(\.\d+)?px$/);
  return n ? +n[1] : void 0;
}
function ee(e, t, s, n) {
  return {
    x: e.x + s * (t.x - e.x),
    y: e.y + s * (t.y - e.y)
  };
}
function Rr(e, t, s, n) {
  return {
    x: e.x + s * (t.x - e.x),
    y: n === "middle" ? s < 0.5 ? e.y : t.y : n === "after" ? s < 1 ? e.y : t.y : s > 0 ? t.y : e.y
  };
}
function Ir(e, t, s, n) {
  const a = {
    x: e.cp2x,
    y: e.cp2y
  }, i = {
    x: t.cp1x,
    y: t.cp1y
  }, o = ee(e, a, s), r = ee(a, i, s), l = ee(i, t, s), c = ee(o, r, s), h = ee(r, l, s);
  return ee(c, h, s);
}
const zr = function(e, t) {
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
    xPlus(s, n) {
      return s - n;
    },
    leftForLtr(s, n) {
      return s - n;
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
function ge(e, t, s) {
  return e ? zr(t, s) : Wr();
}
function ui(e, t) {
  let s, n;
  (t === "ltr" || t === "rtl") && (s = e.canvas.style, n = [
    s.getPropertyValue("direction"),
    s.getPropertyPriority("direction")
  ], s.setProperty("direction", t, "important"), e.prevTextDirection = n);
}
function fi(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function gi(e) {
  return e === "angle" ? {
    between: Ie,
    compare: zo,
    normalize: $t
  } : {
    between: Ht,
    compare: (t, s) => t - s,
    normalize: (t) => t
  };
}
function In({ start: e, end: t, count: s, loop: n, style: a }) {
  return {
    start: e % s,
    end: t % s,
    loop: n && (t - e + 1) % s === 0,
    style: a
  };
}
function Nr(e, t, s) {
  const { property: n, start: a, end: i } = s, { between: o, normalize: r } = gi(n), l = t.length;
  let { start: c, end: h, loop: u } = e, f, g;
  if (u) {
    for (c += l, h += l, f = 0, g = l; f < g && o(r(t[c % l][n]), a, i); ++f)
      c--, h--;
    c %= l, h %= l;
  }
  return h < c && (h += l), {
    start: c,
    end: h,
    loop: u,
    style: e.style
  };
}
function pi(e, t, s) {
  if (!s)
    return [
      e
    ];
  const { property: n, start: a, end: i } = s, o = t.length, { compare: r, between: l, normalize: c } = gi(n), { start: h, end: u, loop: f, style: g } = Nr(e, t, s), p = [];
  let v = !1, m = null, b, y, x;
  const M = () => l(a, x, b) && r(a, x) !== 0, w = () => r(i, b) === 0 || l(i, x, b), C = () => v || M(), $ = () => !v || w();
  for (let A = h, L = h; A <= u; ++A)
    y = t[A % o], !y.skip && (b = c(y[n]), b !== x && (v = l(b, a, i), m === null && C() && (m = r(b, a) === 0 ? A : L), m !== null && $() && (p.push(In({
      start: m,
      end: A,
      loop: f,
      count: o,
      style: g
    })), m = null), L = A, x = b));
  return m !== null && p.push(In({
    start: m,
    end: u,
    loop: f,
    count: o,
    style: g
  })), p;
}
function bi(e, t) {
  const s = [], n = e.segments;
  for (let a = 0; a < n.length; a++) {
    const i = pi(n[a], e.points, t);
    i.length && s.push(...i);
  }
  return s;
}
function Hr(e, t, s, n) {
  let a = 0, i = t - 1;
  if (s && !n)
    for (; a < t && !e[a].skip; )
      a++;
  for (; a < t && e[a].skip; )
    a++;
  for (a %= t, s && (i += a); i > a && e[i % t].skip; )
    i--;
  return i %= t, {
    start: a,
    end: i
  };
}
function Vr(e, t, s, n) {
  const a = e.length, i = [];
  let o = t, r = e[t], l;
  for (l = t + 1; l <= s; ++l) {
    const c = e[l % a];
    c.skip || c.stop ? r.skip || (n = !1, i.push({
      start: t % a,
      end: (l - 1) % a,
      loop: n
    }), t = o = c.stop ? l : null) : (o = l, r.skip && (t = l)), r = c;
  }
  return o !== null && i.push({
    start: t % a,
    end: o % a,
    loop: n
  }), i;
}
function jr(e, t) {
  const s = e.points, n = e.options.spanGaps, a = s.length;
  if (!a)
    return [];
  const i = !!e._loop, { start: o, end: r } = Hr(s, a, i, n);
  if (n === !0)
    return zn(e, [
      {
        start: o,
        end: r,
        loop: i
      }
    ], s, t);
  const l = r < o ? r + a : r, c = !!e._fullLoop && o === 0 && r === a - 1;
  return zn(e, Vr(s, o, l, c), s, t);
}
function zn(e, t, s, n) {
  return !n || !n.setContext || !s ? t : Yr(e, t, s, n);
}
function Yr(e, t, s, n) {
  const a = e._chart.getContext(), i = Wn(e.options), { _datasetIndex: o, options: { spanGaps: r } } = e, l = s.length, c = [];
  let h = i, u = t[0].start, f = u;
  function g(p, v, m, b) {
    const y = r ? -1 : 1;
    if (p !== v) {
      for (p += l; s[p % l].skip; )
        p -= y;
      for (; s[v % l].skip; )
        v += y;
      p % l !== v % l && (c.push({
        start: p % l,
        end: v % l,
        loop: m,
        style: b
      }), h = b, u = v % l);
    }
  }
  for (const p of t) {
    u = r ? u : p.start;
    let v = s[u % l], m;
    for (f = u + 1; f <= p.end; f++) {
      const b = s[f % l];
      m = Wn(n.setContext(oe(a, {
        type: "segment",
        p0: v,
        p1: b,
        p0DataIndex: (f - 1) % l,
        p1DataIndex: f % l,
        datasetIndex: o
      }))), Ur(m, h) && g(u, f - 1, p.loop, h), v = b, h = m;
    }
    u < f - 1 && g(u, f - 1, p.loop, h);
  }
  return c;
}
function Wn(e) {
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
function Ur(e, t) {
  if (!t)
    return !1;
  const s = [], n = function(a, i) {
    return tn(i) ? (s.includes(i) || s.push(i), s.indexOf(i)) : i;
  };
  return JSON.stringify(e, n) !== JSON.stringify(t, n);
}
function Ke(e, t, s) {
  return e.options.clip ? e[s] : t[s];
}
function qr(e, t) {
  const { xScale: s, yScale: n } = e;
  return s && n ? {
    left: Ke(s, t, "left"),
    right: Ke(s, t, "right"),
    top: Ke(n, t, "top"),
    bottom: Ke(n, t, "bottom")
  } : t;
}
function mi(e, t) {
  const s = t._clip;
  if (s.disabled)
    return !1;
  const n = qr(t, e.chartArea);
  return {
    left: s.left === !1 ? 0 : n.left - (s.left === !0 ? 0 : s.left),
    right: s.right === !1 ? e.width : n.right + (s.right === !0 ? 0 : s.right),
    top: s.top === !1 ? 0 : n.top - (s.top === !0 ? 0 : s.top),
    bottom: s.bottom === !1 ? e.height : n.bottom + (s.bottom === !0 ? 0 : s.bottom)
  };
}
class Xr {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(t, s, n, a) {
    const i = s.listeners[a], o = s.duration;
    i.forEach((r) => r({
      chart: t,
      initial: s.initial,
      numSteps: o,
      currentStep: Math.min(n - s.start, o)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = si.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let s = 0;
    this._charts.forEach((n, a) => {
      if (!n.running || !n.items.length)
        return;
      const i = n.items;
      let o = i.length - 1, r = !1, l;
      for (; o >= 0; --o)
        l = i[o], l._active ? (l._total > n.duration && (n.duration = l._total), l.tick(t), r = !0) : (i[o] = i[i.length - 1], i.pop());
      r && (a.draw(), this._notify(a, n, t, "progress")), i.length || (n.running = !1, this._notify(a, n, t, "complete"), n.initial = !1), s += i.length;
    }), this._lastDate = t, s === 0 && (this._running = !1);
  }
  _getAnims(t) {
    const s = this._charts;
    let n = s.get(t);
    return n || (n = {
      running: !1,
      initial: !0,
      items: [],
      listeners: {
        complete: [],
        progress: []
      }
    }, s.set(t, n)), n;
  }
  listen(t, s, n) {
    this._getAnims(t).listeners[s].push(n);
  }
  add(t, s) {
    !s || !s.length || this._getAnims(t).items.push(...s);
  }
  has(t) {
    return this._getAnims(t).items.length > 0;
  }
  start(t) {
    const s = this._charts.get(t);
    s && (s.running = !0, s.start = Date.now(), s.duration = s.items.reduce((n, a) => Math.max(n, a._duration), 0), this._refresh());
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
    const n = s.items;
    let a = n.length - 1;
    for (; a >= 0; --a)
      n[a].cancel();
    s.items = [], this._notify(t, s, Date.now(), "complete");
  }
  remove(t) {
    return this._charts.delete(t);
  }
}
var It = /* @__PURE__ */ new Xr();
const Nn = "transparent", Kr = {
  boolean(e, t, s) {
    return s > 0.5 ? t : e;
  },
  color(e, t, s) {
    const n = Tn(e || Nn), a = n.valid && Tn(t || Nn);
    return a && a.valid ? a.mix(n, s).hexString() : t;
  },
  number(e, t, s) {
    return e + (t - e) * s;
  }
};
class Gr {
  constructor(t, s, n, a) {
    const i = s[n];
    a = qe([
      t.to,
      a,
      i,
      t.from
    ]);
    const o = qe([
      t.from,
      i,
      a
    ]);
    this._active = !0, this._fn = t.fn || Kr[t.type || typeof o], this._easing = Be[t.easing] || Be.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = s, this._prop = n, this._from = o, this._to = a, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, s, n) {
    if (this._active) {
      this._notify(!1);
      const a = this._target[this._prop], i = n - this._start, o = this._duration - i;
      this._start = n, this._duration = Math.floor(Math.max(o, t.duration)), this._total += i, this._loop = !!t.loop, this._to = qe([
        t.to,
        s,
        a,
        t.from
      ]), this._from = qe([
        t.from,
        a,
        s
      ]);
    }
  }
  cancel() {
    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
  }
  tick(t) {
    const s = t - this._start, n = this._duration, a = this._prop, i = this._from, o = this._loop, r = this._to;
    let l;
    if (this._active = i !== r && (o || s < n), !this._active) {
      this._target[a] = r, this._notify(!0);
      return;
    }
    if (s < 0) {
      this._target[a] = i;
      return;
    }
    l = s / n % 2, l = o && l > 1 ? 2 - l : l, l = this._easing(Math.min(1, Math.max(0, l))), this._target[a] = this._fn(i, r, l);
  }
  wait() {
    const t = this._promises || (this._promises = []);
    return new Promise((s, n) => {
      t.push({
        res: s,
        rej: n
      });
    });
  }
  _notify(t) {
    const s = t ? "res" : "rej", n = this._promises || [];
    for (let a = 0; a < n.length; a++)
      n[a][s]();
  }
}
class vi {
  constructor(t, s) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(s);
  }
  configure(t) {
    if (!K(t))
      return;
    const s = Object.keys(ut.animation), n = this._properties;
    Object.getOwnPropertyNames(t).forEach((a) => {
      const i = t[a];
      if (!K(i))
        return;
      const o = {};
      for (const r of s)
        o[r] = i[r];
      (ft(i.properties) && i.properties || [
        a
      ]).forEach((r) => {
        (r === a || !n.has(r)) && n.set(r, o);
      });
    });
  }
  _animateOptions(t, s) {
    const n = s.options, a = Qr(t, n);
    if (!a)
      return [];
    const i = this._createAnimations(a, n);
    return n.$shared && Zr(t.options.$animations, n).then(() => {
      t.options = n;
    }, () => {
    }), i;
  }
  _createAnimations(t, s) {
    const n = this._properties, a = [], i = t.$animations || (t.$animations = {}), o = Object.keys(s), r = Date.now();
    let l;
    for (l = o.length - 1; l >= 0; --l) {
      const c = o[l];
      if (c.charAt(0) === "$")
        continue;
      if (c === "options") {
        a.push(...this._animateOptions(t, s));
        continue;
      }
      const h = s[c];
      let u = i[c];
      const f = n.get(c);
      if (u)
        if (f && u.active()) {
          u.update(f, h, r);
          continue;
        } else
          u.cancel();
      if (!f || !f.duration) {
        t[c] = h;
        continue;
      }
      i[c] = u = new Gr(f, t, c, h), a.push(u);
    }
    return a;
  }
  update(t, s) {
    if (this._properties.size === 0) {
      Object.assign(t, s);
      return;
    }
    const n = this._createAnimations(t, s);
    if (n.length)
      return It.add(this._chart, n), !0;
  }
}
function Zr(e, t) {
  const s = [], n = Object.keys(t);
  for (let a = 0; a < n.length; a++) {
    const i = e[n[a]];
    i && i.active() && s.push(i.wait());
  }
  return Promise.all(s);
}
function Qr(e, t) {
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
function Hn(e, t) {
  const s = e && e.options || {}, n = s.reverse, a = s.min === void 0 ? t : 0, i = s.max === void 0 ? t : 0;
  return {
    start: n ? i : a,
    end: n ? a : i
  };
}
function Jr(e, t, s) {
  if (s === !1)
    return !1;
  const n = Hn(e, s), a = Hn(t, s);
  return {
    top: a.end,
    right: n.end,
    bottom: a.start,
    left: n.start
  };
}
function tl(e) {
  let t, s, n, a;
  return K(e) ? (t = e.top, s = e.right, n = e.bottom, a = e.left) : t = s = n = a = e, {
    top: t,
    right: s,
    bottom: n,
    left: a,
    disabled: e === !1
  };
}
function yi(e, t) {
  const s = [], n = e._getSortedDatasetMetas(t);
  let a, i;
  for (a = 0, i = n.length; a < i; ++a)
    s.push(n[a].index);
  return s;
}
function Vn(e, t, s, n = {}) {
  const a = e.keys, i = n.mode === "single";
  let o, r, l, c;
  if (t === null)
    return;
  let h = !1;
  for (o = 0, r = a.length; o < r; ++o) {
    if (l = +a[o], l === s) {
      if (h = !0, n.all)
        continue;
      break;
    }
    c = e.values[l], kt(c) && (i || t === 0 || Ot(t) === Ot(c)) && (t += c);
  }
  return !h && !n.all ? 0 : t;
}
function el(e, t) {
  const { iScale: s, vScale: n } = t, a = s.axis === "x" ? "x" : "y", i = n.axis === "x" ? "x" : "y", o = Object.keys(e), r = new Array(o.length);
  let l, c, h;
  for (l = 0, c = o.length; l < c; ++l)
    h = o[l], r[l] = {
      [a]: h,
      [i]: e[h]
    };
  return r;
}
function $s(e, t) {
  const s = e && e.options.stacked;
  return s || s === void 0 && t.stack !== void 0;
}
function sl(e, t, s) {
  return `${e.id}.${t.id}.${s.stack || s.type}`;
}
function nl(e) {
  const { min: t, max: s, minDefined: n, maxDefined: a } = e.getUserBounds();
  return {
    min: n ? t : Number.NEGATIVE_INFINITY,
    max: a ? s : Number.POSITIVE_INFINITY
  };
}
function al(e, t, s) {
  const n = e[t] || (e[t] = {});
  return n[s] || (n[s] = {});
}
function jn(e, t, s, n) {
  for (const a of t.getMatchingVisibleMetas(n).reverse()) {
    const i = e[a.index];
    if (s && i > 0 || !s && i < 0)
      return a.index;
  }
  return null;
}
function Yn(e, t) {
  const { chart: s, _cachedMeta: n } = e, a = s._stacks || (s._stacks = {}), { iScale: i, vScale: o, index: r } = n, l = i.axis, c = o.axis, h = sl(i, o, n), u = t.length;
  let f;
  for (let g = 0; g < u; ++g) {
    const p = t[g], { [l]: v, [c]: m } = p, b = p._stacks || (p._stacks = {});
    f = b[c] = al(a, h, v), f[r] = m, f._top = jn(f, o, !0, n.type), f._bottom = jn(f, o, !1, n.type);
    const y = f._visualValues || (f._visualValues = {});
    y[r] = m;
  }
}
function Ds(e, t) {
  const s = e.scales;
  return Object.keys(s).filter((n) => s[n].axis === t).shift();
}
function il(e, t) {
  return oe(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function ol(e, t, s) {
  return oe(e, {
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
function xe(e, t) {
  const s = e.controller.index, n = e.vScale && e.vScale.axis;
  if (n) {
    t = t || e._parsed;
    for (const a of t) {
      const i = a._stacks;
      if (!i || i[n] === void 0 || i[n][s] === void 0)
        return;
      delete i[n][s], i[n]._visualValues !== void 0 && i[n]._visualValues[s] !== void 0 && delete i[n]._visualValues[s];
    }
  }
}
const As = (e) => e === "reset" || e === "none", Un = (e, t) => t ? e : Object.assign({}, e), rl = (e, t, s) => e && !t.hidden && t._stacked && {
  keys: yi(s, !0),
  values: null
};
class bs {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(t, s) {
    this.chart = t, this._ctx = t.ctx, this.index = s, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = $s(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && xe(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, s = this._cachedMeta, n = this.getDataset(), a = (u, f, g, p) => u === "x" ? f : u === "r" ? p : g, i = s.xAxisID = Y(n.xAxisID, Ds(t, "x")), o = s.yAxisID = Y(n.yAxisID, Ds(t, "y")), r = s.rAxisID = Y(n.rAxisID, Ds(t, "r")), l = s.indexAxis, c = s.iAxisID = a(l, i, o, r), h = s.vAxisID = a(l, o, i, r);
    s.xScale = this.getScaleForId(i), s.yScale = this.getScaleForId(o), s.rScale = this.getScaleForId(r), s.iScale = this.getScaleForId(c), s.vScale = this.getScaleForId(h);
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
    this._data && $n(this._data, this), t._stacked && xe(t);
  }
  _dataCheck() {
    const t = this.getDataset(), s = t.data || (t.data = []), n = this._data;
    if (K(s)) {
      const a = this._cachedMeta;
      this._data = el(s, a);
    } else if (n !== s) {
      if (n) {
        $n(n, this);
        const a = this._cachedMeta;
        xe(a), a._parsed = [];
      }
      s && Object.isExtensible(s) && Vo(s, this), this._syncList = [], this._data = s;
    }
  }
  addElements() {
    const t = this._cachedMeta;
    this._dataCheck(), this.datasetElementType && (t.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(t) {
    const s = this._cachedMeta, n = this.getDataset();
    let a = !1;
    this._dataCheck();
    const i = s._stacked;
    s._stacked = $s(s.vScale, s), s.stack !== n.stack && (a = !0, xe(s), s.stack = n.stack), this._resyncElements(t), (a || i !== s._stacked) && (Yn(this, s._parsed), s._stacked = $s(s.vScale, s));
  }
  configure() {
    const t = this.chart.config, s = t.datasetScopeKeys(this._type), n = t.getOptionScopes(this.getDataset(), s, !0);
    this.options = t.createResolver(n, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, s) {
    const { _cachedMeta: n, _data: a } = this, { iScale: i, _stacked: o } = n, r = i.axis;
    let l = t === 0 && s === a.length ? !0 : n._sorted, c = t > 0 && n._parsed[t - 1], h, u, f;
    if (this._parsing === !1)
      n._parsed = a, n._sorted = !0, f = a;
    else {
      ft(a[t]) ? f = this.parseArrayData(n, a, t, s) : K(a[t]) ? f = this.parseObjectData(n, a, t, s) : f = this.parsePrimitiveData(n, a, t, s);
      const g = () => u[r] === null || c && u[r] < c[r];
      for (h = 0; h < s; ++h)
        n._parsed[h + t] = u = f[h], l && (g() && (l = !1), c = u);
      n._sorted = l;
    }
    o && Yn(this, f);
  }
  parsePrimitiveData(t, s, n, a) {
    const { iScale: i, vScale: o } = t, r = i.axis, l = o.axis, c = i.getLabels(), h = i === o, u = new Array(a);
    let f, g, p;
    for (f = 0, g = a; f < g; ++f)
      p = f + n, u[f] = {
        [r]: h || i.parse(c[p], p),
        [l]: o.parse(s[p], p)
      };
    return u;
  }
  parseArrayData(t, s, n, a) {
    const { xScale: i, yScale: o } = t, r = new Array(a);
    let l, c, h, u;
    for (l = 0, c = a; l < c; ++l)
      h = l + n, u = s[h], r[l] = {
        x: i.parse(u[0], h),
        y: o.parse(u[1], h)
      };
    return r;
  }
  parseObjectData(t, s, n, a) {
    const { xScale: i, yScale: o } = t, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, c = new Array(a);
    let h, u, f, g;
    for (h = 0, u = a; h < u; ++h)
      f = h + n, g = s[f], c[h] = {
        x: i.parse(ae(g, r), f),
        y: o.parse(ae(g, l), f)
      };
    return c;
  }
  getParsed(t) {
    return this._cachedMeta._parsed[t];
  }
  getDataElement(t) {
    return this._cachedMeta.data[t];
  }
  applyStack(t, s, n) {
    const a = this.chart, i = this._cachedMeta, o = s[t.axis], r = {
      keys: yi(a, !0),
      values: s._stacks[t.axis]._visualValues
    };
    return Vn(r, o, i.index, {
      mode: n
    });
  }
  updateRangeFromParsed(t, s, n, a) {
    const i = n[s.axis];
    let o = i === null ? NaN : i;
    const r = a && n._stacks[s.axis];
    a && r && (a.values = r, o = Vn(a, i, this._cachedMeta.index)), t.min = Math.min(t.min, o), t.max = Math.max(t.max, o);
  }
  getMinMax(t, s) {
    const n = this._cachedMeta, a = n._parsed, i = n._sorted && t === n.iScale, o = a.length, r = this._getOtherScale(t), l = rl(s, n, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: h, max: u } = nl(r);
    let f, g;
    function p() {
      g = a[f];
      const v = g[r.axis];
      return !kt(g[t.axis]) || h > v || u < v;
    }
    for (f = 0; f < o && !(!p() && (this.updateRangeFromParsed(c, t, g, l), i)); ++f)
      ;
    if (i) {
      for (f = o - 1; f >= 0; --f)
        if (!p()) {
          this.updateRangeFromParsed(c, t, g, l);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(t) {
    const s = this._cachedMeta._parsed, n = [];
    let a, i, o;
    for (a = 0, i = s.length; a < i; ++a)
      o = s[a][t.axis], kt(o) && n.push(o);
    return n;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(t) {
    const s = this._cachedMeta, n = s.iScale, a = s.vScale, i = this.getParsed(t);
    return {
      label: n ? "" + n.getLabelForValue(i[n.axis]) : "",
      value: a ? "" + a.getLabelForValue(i[a.axis]) : ""
    };
  }
  _update(t) {
    const s = this._cachedMeta;
    this.update(t || "default"), s._clip = tl(Y(this.options.clip, Jr(s.xScale, s.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, s = this.chart, n = this._cachedMeta, a = n.data || [], i = s.chartArea, o = [], r = this._drawStart || 0, l = this._drawCount || a.length - r, c = this.options.drawActiveElementsOnTop;
    let h;
    for (n.dataset && n.dataset.draw(t, i, r, l), h = r; h < r + l; ++h) {
      const u = a[h];
      u.hidden || (u.active && c ? o.push(u) : u.draw(t, i));
    }
    for (h = 0; h < o.length; ++h)
      o[h].draw(t, i);
  }
  getStyle(t, s) {
    const n = s ? "active" : "default";
    return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(n) : this.resolveDataElementOptions(t || 0, n);
  }
  getContext(t, s, n) {
    const a = this.getDataset();
    let i;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const o = this._cachedMeta.data[t];
      i = o.$context || (o.$context = ol(this.getContext(), t, o)), i.parsed = this.getParsed(t), i.raw = a.data[t], i.index = i.dataIndex = t;
    } else
      i = this.$context || (this.$context = il(this.chart.getContext(), this.index)), i.dataset = a, i.index = i.datasetIndex = this.index;
    return i.active = !!s, i.mode = n, i;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, s) {
    return this._resolveElementOptions(this.dataElementType.id, s, t);
  }
  _resolveElementOptions(t, s = "default", n) {
    const a = s === "active", i = this._cachedDataOpts, o = t + "-" + s, r = i[o], l = this.enableOptionSharing && Oe(n);
    if (r)
      return Un(r, l);
    const c = this.chart.config, h = c.datasetElementScopeKeys(this._type, t), u = a ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], f = c.getOptionScopes(this.getDataset(), h), g = Object.keys(ut.elements[t]), p = () => this.getContext(n, a, s), v = c.resolveNamedOptions(f, g, p, u);
    return v.$shared && (v.$shared = l, i[o] = Object.freeze(Un(v, l))), v;
  }
  _resolveAnimations(t, s, n) {
    const a = this.chart, i = this._cachedDataOpts, o = `animation-${s}`, r = i[o];
    if (r)
      return r;
    let l;
    if (a.options.animation !== !1) {
      const h = this.chart.config, u = h.datasetAnimationScopeKeys(this._type, s), f = h.getOptionScopes(this.getDataset(), u);
      l = h.createResolver(f, this.getContext(t, n, s));
    }
    const c = new vi(a, l && l.animations);
    return l && l._cacheable && (i[o] = Object.freeze(c)), c;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, s) {
    return !s || As(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, s) {
    const n = this.resolveDataElementOptions(t, s), a = this._sharedOptions, i = this.getSharedOptions(n), o = this.includeOptions(s, i) || i !== a;
    return this.updateSharedOptions(i, s, n), {
      sharedOptions: i,
      includeOptions: o
    };
  }
  updateElement(t, s, n, a) {
    As(a) ? Object.assign(t, n) : this._resolveAnimations(s, a).update(t, n);
  }
  updateSharedOptions(t, s, n) {
    t && !As(s) && this._resolveAnimations(void 0, s).update(t, n);
  }
  _setStyle(t, s, n, a) {
    t.active = a;
    const i = this.getStyle(s, a);
    this._resolveAnimations(s, n, a).update(t, {
      options: !a && this.getSharedOptions(i) || i
    });
  }
  removeHoverStyle(t, s, n) {
    this._setStyle(t, n, "active", !1);
  }
  setHoverStyle(t, s, n) {
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
    const s = this._data, n = this._cachedMeta.data;
    for (const [r, l, c] of this._syncList)
      this[r](l, c);
    this._syncList = [];
    const a = n.length, i = s.length, o = Math.min(i, a);
    o && this.parse(0, o), i > a ? this._insertElements(a, i - a, t) : i < a && this._removeElements(i, a - i);
  }
  _insertElements(t, s, n = !0) {
    const a = this._cachedMeta, i = a.data, o = t + s;
    let r;
    const l = (c) => {
      for (c.length += s, r = c.length - 1; r >= o; r--)
        c[r] = c[r - s];
    };
    for (l(i), r = t; r < o; ++r)
      i[r] = new this.dataElementType();
    this._parsing && l(a._parsed), this.parse(t, s), n && this.updateElements(i, t, s, "reset");
  }
  updateElements(t, s, n, a) {
  }
  _removeElements(t, s) {
    const n = this._cachedMeta;
    if (this._parsing) {
      const a = n._parsed.splice(t, s);
      n._stacked && xe(n, a);
    }
    n.data.splice(t, s);
  }
  _sync(t) {
    if (this._parsing)
      this._syncList.push(t);
    else {
      const [s, n, a] = t;
      this[s](n, a);
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
function ll(e, t) {
  if (!e._cache.$bar) {
    const s = e.getMatchingVisibleMetas(t);
    let n = [];
    for (let a = 0, i = s.length; a < i; a++)
      n = n.concat(s[a].controller.getAllParsedValues(e));
    e._cache.$bar = ei(n.sort((a, i) => a - i));
  }
  return e._cache.$bar;
}
function cl(e) {
  const t = e.iScale, s = ll(t, e.type);
  let n = t._length, a, i, o, r;
  const l = () => {
    o === 32767 || o === -32768 || (Oe(r) && (n = Math.min(n, Math.abs(o - r) || n)), r = o);
  };
  for (a = 0, i = s.length; a < i; ++a)
    o = t.getPixelForValue(s[a]), l();
  for (r = void 0, a = 0, i = t.ticks.length; a < i; ++a)
    o = t.getPixelForTick(a), l();
  return n;
}
function dl(e, t, s, n) {
  const a = s.barThickness;
  let i, o;
  return et(a) ? (i = t.min * s.categoryPercentage, o = s.barPercentage) : (i = a * n, o = 1), {
    chunk: i / n,
    ratio: o,
    start: t.pixels[e] - i / 2
  };
}
function hl(e, t, s, n) {
  const a = t.pixels, i = a[e];
  let o = e > 0 ? a[e - 1] : null, r = e < a.length - 1 ? a[e + 1] : null;
  const l = s.categoryPercentage;
  o === null && (o = i - (r === null ? t.end - t.start : r - i)), r === null && (r = i + i - o);
  const c = i - (i - Math.min(o, r)) / 2 * l;
  return {
    chunk: Math.abs(r - o) / 2 * l / n,
    ratio: s.barPercentage,
    start: c
  };
}
function ul(e, t, s, n) {
  const a = s.parse(e[0], n), i = s.parse(e[1], n), o = Math.min(a, i), r = Math.max(a, i);
  let l = o, c = r;
  Math.abs(o) > Math.abs(r) && (l = r, c = o), t[s.axis] = c, t._custom = {
    barStart: l,
    barEnd: c,
    start: a,
    end: i,
    min: o,
    max: r
  };
}
function _i(e, t, s, n) {
  return ft(e) ? ul(e, t, s, n) : t[s.axis] = s.parse(e, n), t;
}
function qn(e, t, s, n) {
  const a = e.iScale, i = e.vScale, o = a.getLabels(), r = a === i, l = [];
  let c, h, u, f;
  for (c = s, h = s + n; c < h; ++c)
    f = t[c], u = {}, u[a.axis] = r || a.parse(o[c], c), l.push(_i(f, u, i, c));
  return l;
}
function Ts(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function fl(e, t, s) {
  return e !== 0 ? Ot(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= s ? 1 : -1);
}
function gl(e) {
  let t, s, n, a, i;
  return e.horizontal ? (t = e.base > e.x, s = "left", n = "right") : (t = e.base < e.y, s = "bottom", n = "top"), t ? (a = "end", i = "start") : (a = "start", i = "end"), {
    start: s,
    end: n,
    reverse: t,
    top: a,
    bottom: i
  };
}
function pl(e, t, s, n) {
  let a = t.borderSkipped;
  const i = {};
  if (!a) {
    e.borderSkipped = i;
    return;
  }
  if (a === !0) {
    e.borderSkipped = {
      top: !0,
      right: !0,
      bottom: !0,
      left: !0
    };
    return;
  }
  const { start: o, end: r, reverse: l, top: c, bottom: h } = gl(e);
  a === "middle" && s && (e.enableBorderRadius = !0, (s._top || 0) === n ? a = c : (s._bottom || 0) === n ? a = h : (i[Xn(h, o, r, l)] = !0, a = c)), i[Xn(a, o, r, l)] = !0, e.borderSkipped = i;
}
function Xn(e, t, s, n) {
  return n ? (e = bl(e, t, s), e = Kn(e, s, t)) : e = Kn(e, t, s), e;
}
function bl(e, t, s) {
  return e === t ? s : e === s ? t : e;
}
function Kn(e, t, s) {
  return e === "start" ? t : e === "end" ? s : e;
}
function ml(e, { inflateAmount: t }, s) {
  e.inflateAmount = t === "auto" ? s === 1 ? 0.33 : 0 : t;
}
class vl extends bs {
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
  parsePrimitiveData(t, s, n, a) {
    return qn(t, s, n, a);
  }
  parseArrayData(t, s, n, a) {
    return qn(t, s, n, a);
  }
  parseObjectData(t, s, n, a) {
    const { iScale: i, vScale: o } = t, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, c = i.axis === "x" ? r : l, h = o.axis === "x" ? r : l, u = [];
    let f, g, p, v;
    for (f = n, g = n + a; f < g; ++f)
      v = s[f], p = {}, p[i.axis] = i.parse(ae(v, c), f), u.push(_i(ae(v, h), p, o, f));
    return u;
  }
  updateRangeFromParsed(t, s, n, a) {
    super.updateRangeFromParsed(t, s, n, a);
    const i = n._custom;
    i && s === this._cachedMeta.vScale && (t.min = Math.min(t.min, i.min), t.max = Math.max(t.max, i.max));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(t) {
    const s = this._cachedMeta, { iScale: n, vScale: a } = s, i = this.getParsed(t), o = i._custom, r = Ts(o) ? "[" + o.start + ", " + o.end + "]" : "" + a.getLabelForValue(i[a.axis]);
    return {
      label: "" + n.getLabelForValue(i[n.axis]),
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
  updateElements(t, s, n, a) {
    const i = a === "reset", { index: o, _cachedMeta: { vScale: r } } = this, l = r.getBasePixel(), c = r.isHorizontal(), h = this._getRuler(), { sharedOptions: u, includeOptions: f } = this._getSharedOptions(s, a);
    for (let g = s; g < s + n; g++) {
      const p = this.getParsed(g), v = i || et(p[r.axis]) ? {
        base: l,
        head: l
      } : this._calculateBarValuePixels(g), m = this._calculateBarIndexPixels(g, h), b = (p._stacks || {})[r.axis], y = {
        horizontal: c,
        base: v.base,
        enableBorderRadius: !b || Ts(p._custom) || o === b._top || o === b._bottom,
        x: c ? v.head : m.center,
        y: c ? m.center : v.head,
        height: c ? m.size : Math.abs(v.size),
        width: c ? Math.abs(v.size) : m.size
      };
      f && (y.options = u || this.resolveDataElementOptions(g, t[g].active ? "active" : a));
      const x = y.options || t[g].options;
      pl(y, x, b, o), ml(y, x, h.ratio), this.updateElement(t[g], g, y, a);
    }
  }
  _getStacks(t, s) {
    const { iScale: n } = this._cachedMeta, a = n.getMatchingVisibleMetas(this._type).filter((h) => h.controller.options.grouped), i = n.options.stacked, o = [], r = this._cachedMeta.controller.getParsed(s), l = r && r[n.axis], c = (h) => {
      const u = h._parsed.find((g) => g[n.axis] === l), f = u && u[h.vScale.axis];
      if (et(f) || isNaN(f))
        return !0;
    };
    for (const h of a)
      if (!(s !== void 0 && c(h)) && ((i === !1 || o.indexOf(h.stack) === -1 || i === void 0 && h.stack === void 0) && o.push(h.stack), h.index === t))
        break;
    return o.length || o.push(void 0), o;
  }
  _getStackCount(t) {
    return this._getStacks(void 0, t).length;
  }
  _getAxisCount() {
    return this._getAxis().length;
  }
  getFirstScaleIdForIndexAxis() {
    const t = this.chart.scales, s = this.chart.options.indexAxis;
    return Object.keys(t).filter((n) => t[n].axis === s).shift();
  }
  _getAxis() {
    const t = {}, s = this.getFirstScaleIdForIndexAxis();
    for (const n of this.chart.data.datasets)
      t[Y(this.chart.options.indexAxis === "x" ? n.xAxisID : n.yAxisID, s)] = !0;
    return Object.keys(t);
  }
  _getStackIndex(t, s, n) {
    const a = this._getStacks(t, n), i = s !== void 0 ? a.indexOf(s) : -1;
    return i === -1 ? a.length - 1 : i;
  }
  _getRuler() {
    const t = this.options, s = this._cachedMeta, n = s.iScale, a = [];
    let i, o;
    for (i = 0, o = s.data.length; i < o; ++i)
      a.push(n.getPixelForValue(this.getParsed(i)[n.axis], i));
    const r = t.barThickness;
    return {
      min: r || cl(s),
      pixels: a,
      start: n._startPixel,
      end: n._endPixel,
      stackCount: this._getStackCount(),
      scale: n,
      grouped: t.grouped,
      ratio: r ? 1 : t.categoryPercentage * t.barPercentage
    };
  }
  _calculateBarValuePixels(t) {
    const { _cachedMeta: { vScale: s, _stacked: n, index: a }, options: { base: i, minBarLength: o } } = this, r = i || 0, l = this.getParsed(t), c = l._custom, h = Ts(c);
    let u = l[s.axis], f = 0, g = n ? this.applyStack(s, l, n) : u, p, v;
    g !== u && (f = g - u, g = u), h && (u = c.barStart, g = c.barEnd - c.barStart, u !== 0 && Ot(u) !== Ot(c.barEnd) && (f = 0), f += u);
    const m = !et(i) && !h ? i : f;
    let b = s.getPixelForValue(m);
    if (this.chart.getDataVisibility(t) ? p = s.getPixelForValue(f + g) : p = b, v = p - b, Math.abs(v) < o) {
      v = fl(v, s, r) * o, u === r && (b -= v / 2);
      const y = s.getPixelForDecimal(0), x = s.getPixelForDecimal(1), M = Math.min(y, x), w = Math.max(y, x);
      b = Math.max(Math.min(b, w), M), p = b + v, n && !h && (l._stacks[s.axis]._visualValues[a] = s.getValueForPixel(p) - s.getValueForPixel(b));
    }
    if (b === s.getPixelForValue(r)) {
      const y = Ot(v) * s.getLineWidthForValue(r) / 2;
      b += y, v -= y;
    }
    return {
      size: v,
      base: b,
      head: p,
      center: p + v / 2
    };
  }
  _calculateBarIndexPixels(t, s) {
    const n = s.scale, a = this.options, i = a.skipNull, o = Y(a.maxBarThickness, 1 / 0);
    let r, l;
    const c = this._getAxisCount();
    if (s.grouped) {
      const h = i ? this._getStackCount(t) : s.stackCount, u = a.barThickness === "flex" ? hl(t, s, a, h * c) : dl(t, s, a, h * c), f = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, g = this._getAxis().indexOf(Y(f, this.getFirstScaleIdForIndexAxis())), p = this._getStackIndex(this.index, this._cachedMeta.stack, i ? t : void 0) + g;
      r = u.start + u.chunk * p + u.chunk / 2, l = Math.min(o, u.chunk * u.ratio);
    } else
      r = n.getPixelForValue(this.getParsed(t)[n.axis], t), l = Math.min(o, s.min * s.ratio);
    return {
      base: r - l / 2,
      head: r + l / 2,
      center: r,
      size: l
    };
  }
  draw() {
    const t = this._cachedMeta, s = t.vScale, n = t.data, a = n.length;
    let i = 0;
    for (; i < a; ++i)
      this.getParsed(i)[s.axis] !== null && !n[i].hidden && n[i].draw(this._ctx);
  }
}
function yl(e, t, s) {
  let n = 1, a = 1, i = 0, o = 0;
  if (t < dt) {
    const r = e, l = r + t, c = Math.cos(r), h = Math.sin(r), u = Math.cos(l), f = Math.sin(l), g = (x, M, w) => Ie(x, r, l, !0) ? 1 : Math.max(M, M * s, w, w * s), p = (x, M, w) => Ie(x, r, l, !0) ? -1 : Math.min(M, M * s, w, w * s), v = g(0, c, u), m = g(pt, h, f), b = p(at, c, u), y = p(at + pt, h, f);
    n = (v - b) / 2, a = (m - y) / 2, i = -(v + b) / 2, o = -(m + y) / 2;
  }
  return {
    ratioX: n,
    ratioY: a,
    offsetX: i,
    offsetY: o
  };
}
class _l extends bs {
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
            const s = t.data, { labels: { pointStyle: n, textAlign: a, color: i, useBorderRadius: o, borderRadius: r } } = t.legend.options;
            return s.labels.length && s.datasets.length ? s.labels.map((l, c) => {
              const u = t.getDatasetMeta(0).controller.getStyle(c);
              return {
                text: l,
                fillStyle: u.backgroundColor,
                fontColor: i,
                hidden: !t.getDataVisibility(c),
                lineDash: u.borderDash,
                lineDashOffset: u.borderDashOffset,
                lineJoin: u.borderJoinStyle,
                lineWidth: u.borderWidth,
                strokeStyle: u.borderColor,
                textAlign: a,
                pointStyle: n,
                borderRadius: o && (r || u.borderRadius),
                index: c
              };
            }) : [];
          }
        },
        onClick(t, s, n) {
          n.chart.toggleDataVisibility(s.index), n.chart.update();
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
    const n = this.getDataset().data, a = this._cachedMeta;
    if (this._parsing === !1)
      a._parsed = n;
    else {
      let i = (l) => +n[l];
      if (K(n[t])) {
        const { key: l = "value" } = this._parsing;
        i = (c) => +ae(n[c], l);
      }
      let o, r;
      for (o = t, r = t + s; o < r; ++o)
        a._parsed[o] = i(o);
    }
  }
  _getRotation() {
    return Nt(this.options.rotation - 90);
  }
  _getCircumference() {
    return Nt(this.options.circumference);
  }
  _getRotationExtents() {
    let t = dt, s = -dt;
    for (let n = 0; n < this.chart.data.datasets.length; ++n)
      if (this.chart.isDatasetVisible(n) && this.chart.getDatasetMeta(n).type === this._type) {
        const a = this.chart.getDatasetMeta(n).controller, i = a._getRotation(), o = a._getCircumference();
        t = Math.min(t, i), s = Math.max(s, i + o);
      }
    return {
      rotation: t,
      circumference: s - t
    };
  }
  update(t) {
    const s = this.chart, { chartArea: n } = s, a = this._cachedMeta, i = a.data, o = this.getMaxBorderWidth() + this.getMaxOffset(i) + this.options.spacing, r = Math.max((Math.min(n.width, n.height) - o) / 2, 0), l = Math.min(Co(this.options.cutout, r), 1), c = this._getRingWeight(this.index), { circumference: h, rotation: u } = this._getRotationExtents(), { ratioX: f, ratioY: g, offsetX: p, offsetY: v } = yl(u, h, l), m = (n.width - o) / f, b = (n.height - o) / g, y = Math.max(Math.min(m, b) / 2, 0), x = Ga(this.options.radius, y), M = Math.max(x * l, 0), w = (x - M) / this._getVisibleDatasetWeightTotal();
    this.offsetX = p * x, this.offsetY = v * x, a.total = this.calculateTotal(), this.outerRadius = x - w * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - w * c, 0), this.updateElements(i, 0, i.length, t);
  }
  _circumference(t, s) {
    const n = this.options, a = this._cachedMeta, i = this._getCircumference();
    return s && n.animation.animateRotate || !this.chart.getDataVisibility(t) || a._parsed[t] === null || a.data[t].hidden ? 0 : this.calculateCircumference(a._parsed[t] * i / dt);
  }
  updateElements(t, s, n, a) {
    const i = a === "reset", o = this.chart, r = o.chartArea, c = o.options.animation, h = (r.left + r.right) / 2, u = (r.top + r.bottom) / 2, f = i && c.animateScale, g = f ? 0 : this.innerRadius, p = f ? 0 : this.outerRadius, { sharedOptions: v, includeOptions: m } = this._getSharedOptions(s, a);
    let b = this._getRotation(), y;
    for (y = 0; y < s; ++y)
      b += this._circumference(y, i);
    for (y = s; y < s + n; ++y) {
      const x = this._circumference(y, i), M = t[y], w = {
        x: h + this.offsetX,
        y: u + this.offsetY,
        startAngle: b,
        endAngle: b + x,
        circumference: x,
        outerRadius: p,
        innerRadius: g
      };
      m && (w.options = v || this.resolveDataElementOptions(y, M.active ? "active" : a)), b += x, this.updateElement(M, y, w, a);
    }
  }
  calculateTotal() {
    const t = this._cachedMeta, s = t.data;
    let n = 0, a;
    for (a = 0; a < s.length; a++) {
      const i = t._parsed[a];
      i !== null && !isNaN(i) && this.chart.getDataVisibility(a) && !s[a].hidden && (n += Math.abs(i));
    }
    return n;
  }
  calculateCircumference(t) {
    const s = this._cachedMeta.total;
    return s > 0 && !isNaN(t) ? dt * (Math.abs(t) / s) : 0;
  }
  getLabelAndValue(t) {
    const s = this._cachedMeta, n = this.chart, a = n.data.labels || [], i = en(s._parsed[t], n.options.locale);
    return {
      label: a[t] || "",
      value: i
    };
  }
  getMaxBorderWidth(t) {
    let s = 0;
    const n = this.chart;
    let a, i, o, r, l;
    if (!t) {
      for (a = 0, i = n.data.datasets.length; a < i; ++a)
        if (n.isDatasetVisible(a)) {
          o = n.getDatasetMeta(a), t = o.data, r = o.controller;
          break;
        }
    }
    if (!t)
      return 0;
    for (a = 0, i = t.length; a < i; ++a)
      l = r.resolveDataElementOptions(a), l.borderAlign !== "inner" && (s = Math.max(s, l.borderWidth || 0, l.hoverBorderWidth || 0));
    return s;
  }
  getMaxOffset(t) {
    let s = 0;
    for (let n = 0, a = t.length; n < a; ++n) {
      const i = this.resolveDataElementOptions(n);
      s = Math.max(s, i.offset || 0, i.hoverOffset || 0);
    }
    return s;
  }
  _getRingWeightOffset(t) {
    let s = 0;
    for (let n = 0; n < t; ++n)
      this.chart.isDatasetVisible(n) && (s += this._getRingWeight(n));
    return s;
  }
  _getRingWeight(t) {
    return Math.max(Y(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
class xl extends bs {
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
    const s = this._cachedMeta, { dataset: n, data: a = [], _dataset: i } = s, o = this.chart._animationsDisabled;
    let { start: r, count: l } = Uo(s, a, o);
    this._drawStart = r, this._drawCount = l, qo(s) && (r = 0, l = a.length), n._chart = this.chart, n._datasetIndex = this.index, n._decimated = !!i._decimated, n.points = a;
    const c = this.resolveDatasetElementOptions(t);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(n, void 0, {
      animated: !o,
      options: c
    }, t), this.updateElements(a, r, l, t);
  }
  updateElements(t, s, n, a) {
    const i = a === "reset", { iScale: o, vScale: r, _stacked: l, _dataset: c } = this._cachedMeta, { sharedOptions: h, includeOptions: u } = this._getSharedOptions(s, a), f = o.axis, g = r.axis, { spanGaps: p, segment: v } = this.options, m = Re(p) ? p : Number.POSITIVE_INFINITY, b = this.chart._animationsDisabled || i || a === "none", y = s + n, x = t.length;
    let M = s > 0 && this.getParsed(s - 1);
    for (let w = 0; w < x; ++w) {
      const C = t[w], $ = b ? C : {};
      if (w < s || w >= y) {
        $.skip = !0;
        continue;
      }
      const A = this.getParsed(w), L = et(A[g]), D = $[f] = o.getPixelForValue(A[f], w), F = $[g] = i || L ? r.getBasePixel() : r.getPixelForValue(l ? this.applyStack(r, A, l) : A[g], w);
      $.skip = isNaN(D) || isNaN(F) || L, $.stop = w > 0 && Math.abs(A[f] - M[f]) > m, v && ($.parsed = A, $.raw = c.data[w]), u && ($.options = h || this.resolveDataElementOptions(w, C.active ? "active" : a)), b || this.updateElement(C, w, $, a), M = A;
    }
  }
  getMaxOverflow() {
    const t = this._cachedMeta, s = t.dataset, n = s.options && s.options.borderWidth || 0, a = t.data || [];
    if (!a.length)
      return n;
    const i = a[0].size(this.resolveDataElementOptions(0)), o = a[a.length - 1].size(this.resolveDataElementOptions(a.length - 1));
    return Math.max(n, i, o) / 2;
  }
  draw() {
    const t = this._cachedMeta;
    t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw();
  }
}
class kl extends _l {
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
class cn {
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
    Object.assign(cn.prototype, t);
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
var Ml = {
  _date: cn
};
function Sl(e, t, s, n) {
  const { controller: a, data: i, _sorted: o } = e, r = a._cachedMeta.iScale, l = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (r && t === r.axis && t !== "r" && o && i.length) {
    const c = r._reversePixels ? No : se;
    if (n) {
      if (a._sharedOptions) {
        const h = i[0], u = typeof h.getRange == "function" && h.getRange(t);
        if (u) {
          const f = c(i, t, s - u), g = c(i, t, s + u);
          return {
            lo: f.lo,
            hi: g.hi
          };
        }
      }
    } else {
      const h = c(i, t, s);
      if (l) {
        const { vScale: u } = a._cachedMeta, { _parsed: f } = e, g = f.slice(0, h.lo + 1).reverse().findIndex((v) => !et(v[u.axis]));
        h.lo -= Math.max(0, g);
        const p = f.slice(h.hi).findIndex((v) => !et(v[u.axis]));
        h.hi += Math.max(0, p);
      }
      return h;
    }
  }
  return {
    lo: 0,
    hi: i.length - 1
  };
}
function ms(e, t, s, n, a) {
  const i = e.getSortedVisibleDatasetMetas(), o = s[t];
  for (let r = 0, l = i.length; r < l; ++r) {
    const { index: c, data: h } = i[r], { lo: u, hi: f } = Sl(i[r], t, o, a);
    for (let g = u; g <= f; ++g) {
      const p = h[g];
      p.skip || n(p, c, g);
    }
  }
}
function wl(e) {
  const t = e.indexOf("x") !== -1, s = e.indexOf("y") !== -1;
  return function(n, a) {
    const i = t ? Math.abs(n.x - a.x) : 0, o = s ? Math.abs(n.y - a.y) : 0;
    return Math.sqrt(Math.pow(i, 2) + Math.pow(o, 2));
  };
}
function Fs(e, t, s, n, a) {
  const i = [];
  return !a && !e.isPointInArea(t) || ms(e, s, t, function(r, l, c) {
    !a && !ze(r, e.chartArea, 0) || r.inRange(t.x, t.y, n) && i.push({
      element: r,
      datasetIndex: l,
      index: c
    });
  }, !0), i;
}
function Cl(e, t, s, n) {
  let a = [];
  function i(o, r, l) {
    const { startAngle: c, endAngle: h } = o.getProps([
      "startAngle",
      "endAngle"
    ], n), { angle: u } = Ja(o, {
      x: t.x,
      y: t.y
    });
    Ie(u, c, h) && a.push({
      element: o,
      datasetIndex: r,
      index: l
    });
  }
  return ms(e, s, t, i), a;
}
function $l(e, t, s, n, a, i) {
  let o = [];
  const r = wl(s);
  let l = Number.POSITIVE_INFINITY;
  function c(h, u, f) {
    const g = h.inRange(t.x, t.y, a);
    if (n && !g)
      return;
    const p = h.getCenterPoint(a);
    if (!(!!i || e.isPointInArea(p)) && !g)
      return;
    const m = r(t, p);
    m < l ? (o = [
      {
        element: h,
        datasetIndex: u,
        index: f
      }
    ], l = m) : m === l && o.push({
      element: h,
      datasetIndex: u,
      index: f
    });
  }
  return ms(e, s, t, c), o;
}
function Bs(e, t, s, n, a, i) {
  return !i && !e.isPointInArea(t) ? [] : s === "r" && !n ? Cl(e, t, s, a) : $l(e, t, s, n, a, i);
}
function Gn(e, t, s, n, a) {
  const i = [], o = s === "x" ? "inXRange" : "inYRange";
  let r = !1;
  return ms(e, s, t, (l, c, h) => {
    l[o] && l[o](t[s], a) && (i.push({
      element: l,
      datasetIndex: c,
      index: h
    }), r = r || l.inRange(t.x, t.y, a));
  }), n && !r ? [] : i;
}
var Dl = {
  modes: {
    index(e, t, s, n) {
      const a = te(t, e), i = s.axis || "x", o = s.includeInvisible || !1, r = s.intersect ? Fs(e, a, i, n, o) : Bs(e, a, i, !1, n, o), l = [];
      return r.length ? (e.getSortedVisibleDatasetMetas().forEach((c) => {
        const h = r[0].index, u = c.data[h];
        u && !u.skip && l.push({
          element: u,
          datasetIndex: c.index,
          index: h
        });
      }), l) : [];
    },
    dataset(e, t, s, n) {
      const a = te(t, e), i = s.axis || "xy", o = s.includeInvisible || !1;
      let r = s.intersect ? Fs(e, a, i, n, o) : Bs(e, a, i, !1, n, o);
      if (r.length > 0) {
        const l = r[0].datasetIndex, c = e.getDatasetMeta(l).data;
        r = [];
        for (let h = 0; h < c.length; ++h)
          r.push({
            element: c[h],
            datasetIndex: l,
            index: h
          });
      }
      return r;
    },
    point(e, t, s, n) {
      const a = te(t, e), i = s.axis || "xy", o = s.includeInvisible || !1;
      return Fs(e, a, i, n, o);
    },
    nearest(e, t, s, n) {
      const a = te(t, e), i = s.axis || "xy", o = s.includeInvisible || !1;
      return Bs(e, a, i, s.intersect, n, o);
    },
    x(e, t, s, n) {
      const a = te(t, e);
      return Gn(e, a, "x", s.intersect, n);
    },
    y(e, t, s, n) {
      const a = te(t, e);
      return Gn(e, a, "y", s.intersect, n);
    }
  }
};
const xi = [
  "left",
  "top",
  "right",
  "bottom"
];
function ke(e, t) {
  return e.filter((s) => s.pos === t);
}
function Zn(e, t) {
  return e.filter((s) => xi.indexOf(s.pos) === -1 && s.box.axis === t);
}
function Me(e, t) {
  return e.sort((s, n) => {
    const a = t ? n : s, i = t ? s : n;
    return a.weight === i.weight ? a.index - i.index : a.weight - i.weight;
  });
}
function Al(e) {
  const t = [];
  let s, n, a, i, o, r;
  for (s = 0, n = (e || []).length; s < n; ++s)
    a = e[s], { position: i, options: { stack: o, stackWeight: r = 1 } } = a, t.push({
      index: s,
      box: a,
      pos: i,
      horizontal: a.isHorizontal(),
      weight: a.weight,
      stack: o && i + o,
      stackWeight: r
    });
  return t;
}
function Tl(e) {
  const t = {};
  for (const s of e) {
    const { stack: n, pos: a, stackWeight: i } = s;
    if (!n || !xi.includes(a))
      continue;
    const o = t[n] || (t[n] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    o.count++, o.weight += i;
  }
  return t;
}
function Fl(e, t) {
  const s = Tl(e), { vBoxMaxWidth: n, hBoxMaxHeight: a } = t;
  let i, o, r;
  for (i = 0, o = e.length; i < o; ++i) {
    r = e[i];
    const { fullSize: l } = r.box, c = s[r.stack], h = c && r.stackWeight / c.weight;
    r.horizontal ? (r.width = h ? h * n : l && t.availableWidth, r.height = a) : (r.width = n, r.height = h ? h * a : l && t.availableHeight);
  }
  return s;
}
function Bl(e) {
  const t = Al(e), s = Me(t.filter((c) => c.box.fullSize), !0), n = Me(ke(t, "left"), !0), a = Me(ke(t, "right")), i = Me(ke(t, "top"), !0), o = Me(ke(t, "bottom")), r = Zn(t, "x"), l = Zn(t, "y");
  return {
    fullSize: s,
    leftAndTop: n.concat(i),
    rightAndBottom: a.concat(l).concat(o).concat(r),
    chartArea: ke(t, "chartArea"),
    vertical: n.concat(a).concat(l),
    horizontal: i.concat(o).concat(r)
  };
}
function Qn(e, t, s, n) {
  return Math.max(e[s], t[s]) + Math.max(e[n], t[n]);
}
function ki(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function Pl(e, t, s, n) {
  const { pos: a, box: i } = s, o = e.maxPadding;
  if (!K(a)) {
    s.size && (e[a] -= s.size);
    const u = n[s.stack] || {
      size: 0,
      count: 1
    };
    u.size = Math.max(u.size, s.horizontal ? i.height : i.width), s.size = u.size / u.count, e[a] += s.size;
  }
  i.getPadding && ki(o, i.getPadding());
  const r = Math.max(0, t.outerWidth - Qn(o, e, "left", "right")), l = Math.max(0, t.outerHeight - Qn(o, e, "top", "bottom")), c = r !== e.w, h = l !== e.h;
  return e.w = r, e.h = l, s.horizontal ? {
    same: c,
    other: h
  } : {
    same: h,
    other: c
  };
}
function Ll(e) {
  const t = e.maxPadding;
  function s(n) {
    const a = Math.max(t[n] - e[n], 0);
    return e[n] += a, a;
  }
  e.y += s("top"), e.x += s("left"), s("right"), s("bottom");
}
function El(e, t) {
  const s = t.maxPadding;
  function n(a) {
    const i = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return a.forEach((o) => {
      i[o] = Math.max(t[o], s[o]);
    }), i;
  }
  return n(e ? [
    "left",
    "right"
  ] : [
    "top",
    "bottom"
  ]);
}
function De(e, t, s, n) {
  const a = [];
  let i, o, r, l, c, h;
  for (i = 0, o = e.length, c = 0; i < o; ++i) {
    r = e[i], l = r.box, l.update(r.width || t.w, r.height || t.h, El(r.horizontal, t));
    const { same: u, other: f } = Pl(t, s, r, n);
    c |= u && a.length, h = h || f, l.fullSize || a.push(r);
  }
  return c && De(a, t, s, n) || h;
}
function Ge(e, t, s, n, a) {
  e.top = s, e.left = t, e.right = t + n, e.bottom = s + a, e.width = n, e.height = a;
}
function Jn(e, t, s, n) {
  const a = s.padding;
  let { x: i, y: o } = t;
  for (const r of e) {
    const l = r.box, c = n[r.stack] || {
      placed: 0,
      weight: 1
    }, h = r.stackWeight / c.weight || 1;
    if (r.horizontal) {
      const u = t.w * h, f = c.size || l.height;
      Oe(c.start) && (o = c.start), l.fullSize ? Ge(l, a.left, o, s.outerWidth - a.right - a.left, f) : Ge(l, t.left + c.placed, o, u, f), c.start = o, c.placed += u, o = l.bottom;
    } else {
      const u = t.h * h, f = c.size || l.width;
      Oe(c.start) && (i = c.start), l.fullSize ? Ge(l, i, a.top, f, s.outerHeight - a.bottom - a.top) : Ge(l, i, t.top + c.placed, f, u), c.start = i, c.placed += u, i = l.right;
    }
  }
  t.x = i, t.y = o;
}
var Ft = {
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
  update(e, t, s, n) {
    if (!e)
      return;
    const a = Bt(e.options.layout.padding), i = Math.max(t - a.width, 0), o = Math.max(s - a.height, 0), r = Bl(e.boxes), l = r.vertical, c = r.horizontal;
    nt(e.boxes, (v) => {
      typeof v.beforeLayout == "function" && v.beforeLayout();
    });
    const h = l.reduce((v, m) => m.box.options && m.box.options.display === !1 ? v : v + 1, 0) || 1, u = Object.freeze({
      outerWidth: t,
      outerHeight: s,
      padding: a,
      availableWidth: i,
      availableHeight: o,
      vBoxMaxWidth: i / 2 / h,
      hBoxMaxHeight: o / 2
    }), f = Object.assign({}, a);
    ki(f, Bt(n));
    const g = Object.assign({
      maxPadding: f,
      w: i,
      h: o,
      x: a.left,
      y: a.top
    }, a), p = Fl(l.concat(c), u);
    De(r.fullSize, g, u, p), De(l, g, u, p), De(c, g, u, p) && De(l, g, u, p), Ll(g), Jn(r.leftAndTop, g, u, p), g.x += g.w, g.y += g.h, Jn(r.rightAndBottom, g, u, p), e.chartArea = {
      left: g.left,
      top: g.top,
      right: g.left + g.w,
      bottom: g.top + g.h,
      height: g.h,
      width: g.w
    }, nt(r.chartArea, (v) => {
      const m = v.box;
      Object.assign(m, e.chartArea), m.update(g.w, g.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class Mi {
  acquireContext(t, s) {
  }
  releaseContext(t) {
    return !1;
  }
  addEventListener(t, s, n) {
  }
  removeEventListener(t, s, n) {
  }
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(t, s, n, a) {
    return s = Math.max(0, s || t.width), n = n || t.height, {
      width: s,
      height: Math.max(0, a ? Math.floor(s / a) : n)
    };
  }
  isAttached(t) {
    return !0;
  }
  updateConfig(t) {
  }
}
class Ol extends Mi {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const ss = "$chartjs", Rl = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, ta = (e) => e === null || e === "";
function Il(e, t) {
  const s = e.style, n = e.getAttribute("height"), a = e.getAttribute("width");
  if (e[ss] = {
    initial: {
      height: n,
      width: a,
      style: {
        display: s.display,
        height: s.height,
        width: s.width
      }
    }
  }, s.display = s.display || "block", s.boxSizing = s.boxSizing || "border-box", ta(a)) {
    const i = Rn(e, "width");
    i !== void 0 && (e.width = i);
  }
  if (ta(n))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const i = Rn(e, "height");
      i !== void 0 && (e.height = i);
    }
  return e;
}
const Si = Or ? {
  passive: !0
} : !1;
function zl(e, t, s) {
  e && e.addEventListener(t, s, Si);
}
function Wl(e, t, s) {
  e && e.canvas && e.canvas.removeEventListener(t, s, Si);
}
function Nl(e, t) {
  const s = Rl[e.type] || e.type, { x: n, y: a } = te(e, t);
  return {
    type: s,
    chart: t,
    native: e,
    x: n !== void 0 ? n : null,
    y: a !== void 0 ? a : null
  };
}
function ds(e, t) {
  for (const s of e)
    if (s === t || s.contains(t))
      return !0;
}
function Hl(e, t, s) {
  const n = e.canvas, a = new MutationObserver((i) => {
    let o = !1;
    for (const r of i)
      o = o || ds(r.addedNodes, n), o = o && !ds(r.removedNodes, n);
    o && s();
  });
  return a.observe(document, {
    childList: !0,
    subtree: !0
  }), a;
}
function Vl(e, t, s) {
  const n = e.canvas, a = new MutationObserver((i) => {
    let o = !1;
    for (const r of i)
      o = o || ds(r.removedNodes, n), o = o && !ds(r.addedNodes, n);
    o && s();
  });
  return a.observe(document, {
    childList: !0,
    subtree: !0
  }), a;
}
const Ne = /* @__PURE__ */ new Map();
let ea = 0;
function wi() {
  const e = window.devicePixelRatio;
  e !== ea && (ea = e, Ne.forEach((t, s) => {
    s.currentDevicePixelRatio !== e && t();
  }));
}
function jl(e, t) {
  Ne.size || window.addEventListener("resize", wi), Ne.set(e, t);
}
function Yl(e) {
  Ne.delete(e), Ne.size || window.removeEventListener("resize", wi);
}
function Ul(e, t, s) {
  const n = e.canvas, a = n && ln(n);
  if (!a)
    return;
  const i = ni((r, l) => {
    const c = a.clientWidth;
    s(r, l), c < a.clientWidth && s();
  }, window), o = new ResizeObserver((r) => {
    const l = r[0], c = l.contentRect.width, h = l.contentRect.height;
    c === 0 && h === 0 || i(c, h);
  });
  return o.observe(a), jl(e, i), o;
}
function Ps(e, t, s) {
  s && s.disconnect(), t === "resize" && Yl(e);
}
function ql(e, t, s) {
  const n = e.canvas, a = ni((i) => {
    e.ctx !== null && s(Nl(i, e));
  }, e);
  return zl(n, t, a), a;
}
class Xl extends Mi {
  acquireContext(t, s) {
    const n = t && t.getContext && t.getContext("2d");
    return n && n.canvas === t ? (Il(t, s), n) : null;
  }
  releaseContext(t) {
    const s = t.canvas;
    if (!s[ss])
      return !1;
    const n = s[ss].initial;
    [
      "height",
      "width"
    ].forEach((i) => {
      const o = n[i];
      et(o) ? s.removeAttribute(i) : s.setAttribute(i, o);
    });
    const a = n.style || {};
    return Object.keys(a).forEach((i) => {
      s.style[i] = a[i];
    }), s.width = s.width, delete s[ss], !0;
  }
  addEventListener(t, s, n) {
    this.removeEventListener(t, s);
    const a = t.$proxies || (t.$proxies = {}), o = {
      attach: Hl,
      detach: Vl,
      resize: Ul
    }[s] || ql;
    a[s] = o(t, s, n);
  }
  removeEventListener(t, s) {
    const n = t.$proxies || (t.$proxies = {}), a = n[s];
    if (!a)
      return;
    ({
      attach: Ps,
      detach: Ps,
      resize: Ps
    }[s] || Wl)(t, s, a), n[s] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, s, n, a) {
    return Er(t, s, n, a);
  }
  isAttached(t) {
    const s = t && ln(t);
    return !!(s && s.isConnected);
  }
}
function Kl(e) {
  return !rn() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? Ol : Xl;
}
class Vt {
  static defaults = {};
  static defaultRoutes = void 0;
  x;
  y;
  active = !1;
  options;
  $animations;
  tooltipPosition(t) {
    const { x: s, y: n } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: s,
      y: n
    };
  }
  hasValue() {
    return Re(this.x) && Re(this.y);
  }
  getProps(t, s) {
    const n = this.$animations;
    if (!s || !n)
      return this;
    const a = {};
    return t.forEach((i) => {
      a[i] = n[i] && n[i].active() ? n[i]._to : this[i];
    }), a;
  }
}
function Gl(e, t) {
  const s = e.options.ticks, n = Zl(e), a = Math.min(s.maxTicksLimit || n, n), i = s.major.enabled ? Jl(t) : [], o = i.length, r = i[0], l = i[o - 1], c = [];
  if (o > a)
    return tc(t, c, i, o / a), c;
  const h = Ql(i, t, a);
  if (o > 0) {
    let u, f;
    const g = o > 1 ? Math.round((l - r) / (o - 1)) : null;
    for (Ze(t, c, h, et(g) ? 0 : r - g, r), u = 0, f = o - 1; u < f; u++)
      Ze(t, c, h, i[u], i[u + 1]);
    return Ze(t, c, h, l, et(g) ? t.length : l + g), c;
  }
  return Ze(t, c, h), c;
}
function Zl(e) {
  const t = e.options.offset, s = e._tickSize(), n = e._length / s + (t ? 0 : 1), a = e._maxLength / s;
  return Math.floor(Math.min(n, a));
}
function Ql(e, t, s) {
  const n = ec(e), a = t.length / s;
  if (!n)
    return Math.max(a, 1);
  const i = Lo(n);
  for (let o = 0, r = i.length - 1; o < r; o++) {
    const l = i[o];
    if (l > a)
      return l;
  }
  return Math.max(a, 1);
}
function Jl(e) {
  const t = [];
  let s, n;
  for (s = 0, n = e.length; s < n; s++)
    e[s].major && t.push(s);
  return t;
}
function tc(e, t, s, n) {
  let a = 0, i = s[0], o;
  for (n = Math.ceil(n), o = 0; o < e.length; o++)
    o === i && (t.push(e[o]), a++, i = s[a * n]);
}
function Ze(e, t, s, n, a) {
  const i = Y(n, 0), o = Math.min(Y(a, e.length), e.length);
  let r = 0, l, c, h;
  for (s = Math.ceil(s), a && (l = a - n, s = l / Math.floor(l / s)), h = i; h < 0; )
    r++, h = Math.round(i + r * s);
  for (c = Math.max(i, 0); c < o; c++)
    c === h && (t.push(e[c]), r++, h = Math.round(i + r * s));
}
function ec(e) {
  const t = e.length;
  let s, n;
  if (t < 2)
    return !1;
  for (n = e[0], s = 1; s < t; ++s)
    if (e[s] - e[s - 1] !== n)
      return !1;
  return n;
}
const sc = (e) => e === "left" ? "right" : e === "right" ? "left" : e, sa = (e, t, s) => t === "top" || t === "left" ? e[t] + s : e[t] - s, na = (e, t) => Math.min(t || e, e);
function aa(e, t) {
  const s = [], n = e.length / t, a = e.length;
  let i = 0;
  for (; i < a; i += n)
    s.push(e[Math.floor(i)]);
  return s;
}
function nc(e, t, s) {
  const n = e.ticks.length, a = Math.min(t, n - 1), i = e._startPixel, o = e._endPixel, r = 1e-6;
  let l = e.getPixelForTick(a), c;
  if (!(s && (n === 1 ? c = Math.max(l - i, o - l) : t === 0 ? c = (e.getPixelForTick(1) - l) / 2 : c = (l - e.getPixelForTick(a - 1)) / 2, l += a < t ? c : -c, l < i - r || l > o + r)))
    return l;
}
function ac(e, t) {
  nt(e, (s) => {
    const n = s.gc, a = n.length / 2;
    let i;
    if (a > t) {
      for (i = 0; i < a; ++i)
        delete s.data[n[i]];
      n.splice(0, a);
    }
  });
}
function Se(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function ia(e, t) {
  if (!e.display)
    return 0;
  const s = _t(e.font, t), n = Bt(e.padding);
  return (ft(e.text) ? e.text.length : 1) * s.lineHeight + n.height;
}
function ic(e, t) {
  return oe(e, {
    scale: t,
    type: "scale"
  });
}
function oc(e, t, s) {
  return oe(e, {
    tick: s,
    index: t,
    type: "tick"
  });
}
function rc(e, t, s) {
  let n = Js(e);
  return (s && t !== "right" || !s && t === "right") && (n = sc(n)), n;
}
function lc(e, t, s, n) {
  const { top: a, left: i, bottom: o, right: r, chart: l } = e, { chartArea: c, scales: h } = l;
  let u = 0, f, g, p;
  const v = o - a, m = r - i;
  if (e.isHorizontal()) {
    if (g = vt(n, i, r), K(s)) {
      const b = Object.keys(s)[0], y = s[b];
      p = h[b].getPixelForValue(y) + v - t;
    } else s === "center" ? p = (c.bottom + c.top) / 2 + v - t : p = sa(e, s, t);
    f = r - i;
  } else {
    if (K(s)) {
      const b = Object.keys(s)[0], y = s[b];
      g = h[b].getPixelForValue(y) - m + t;
    } else s === "center" ? g = (c.left + c.right) / 2 - m + t : g = sa(e, s, t);
    p = vt(n, o, a), u = s === "left" ? -pt : pt;
  }
  return {
    titleX: g,
    titleY: p,
    maxWidth: f,
    rotation: u
  };
}
class ve extends Vt {
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
    let { _userMin: t, _userMax: s, _suggestedMin: n, _suggestedMax: a } = this;
    return t = Pt(t, Number.POSITIVE_INFINITY), s = Pt(s, Number.NEGATIVE_INFINITY), n = Pt(n, Number.POSITIVE_INFINITY), a = Pt(a, Number.NEGATIVE_INFINITY), {
      min: Pt(t, n),
      max: Pt(s, a),
      minDefined: kt(t),
      maxDefined: kt(s)
    };
  }
  getMinMax(t) {
    let { min: s, max: n, minDefined: a, maxDefined: i } = this.getUserBounds(), o;
    if (a && i)
      return {
        min: s,
        max: n
      };
    const r = this.getMatchingVisibleMetas();
    for (let l = 0, c = r.length; l < c; ++l)
      o = r[l].controller.getMinMax(this, t), a || (s = Math.min(s, o.min)), i || (n = Math.max(n, o.max));
    return s = i && s > n ? n : s, n = a && s > n ? s : n, {
      min: Pt(s, Pt(n, s)),
      max: Pt(n, Pt(s, n))
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
    lt(this.options.beforeUpdate, [
      this
    ]);
  }
  update(t, s, n) {
    const { beginAtZero: a, grace: i, ticks: o } = this.options, r = o.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = s, this._margins = n = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, n), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + n.left + n.right : this.height + n.top + n.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = fr(this, i, a), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const l = r < this.ticks.length;
    this._convertTicksToLabels(l ? aa(this.ticks, r) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), o.display && (o.autoSkip || o.source === "auto") && (this.ticks = Gl(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), l && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, s, n;
    this.isHorizontal() ? (s = this.left, n = this.right) : (s = this.top, n = this.bottom, t = !t), this._startPixel = s, this._endPixel = n, this._reversePixels = t, this._length = n - s, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    lt(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    lt(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    lt(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), lt(this.options[t], [
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
    lt(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const s = this.options.ticks;
    let n, a, i;
    for (n = 0, a = t.length; n < a; n++)
      i = t[n], i.label = lt(s.callback, [
        i.value,
        n,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    lt(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    lt(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, s = t.ticks, n = na(this.ticks.length, t.ticks.maxTicksLimit), a = s.minRotation || 0, i = s.maxRotation;
    let o = a, r, l, c;
    if (!this._isVisible() || !s.display || a >= i || n <= 1 || !this.isHorizontal()) {
      this.labelRotation = a;
      return;
    }
    const h = this._getLabelSizes(), u = h.widest.width, f = h.highest.height, g = yt(this.chart.width - u, 0, this.maxWidth);
    r = t.offset ? this.maxWidth / n : g / (n - 1), u + 6 > r && (r = g / (n - (t.offset ? 0.5 : 1)), l = this.maxHeight - Se(t.grid) - s.padding - ia(t.title, this.chart.options.font), c = Math.sqrt(u * u + f * f), o = Io(Math.min(Math.asin(yt((h.highest.height + 6) / r, -1, 1)), Math.asin(yt(l / c, -1, 1)) - Math.asin(yt(f / c, -1, 1)))), o = Math.max(a, Math.min(i, o))), this.labelRotation = o;
  }
  afterCalculateLabelRotation() {
    lt(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    lt(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: s, options: { ticks: n, title: a, grid: i } } = this, o = this._isVisible(), r = this.isHorizontal();
    if (o) {
      const l = ia(a, s.options.font);
      if (r ? (t.width = this.maxWidth, t.height = Se(i) + l) : (t.height = this.maxHeight, t.width = Se(i) + l), n.display && this.ticks.length) {
        const { first: c, last: h, widest: u, highest: f } = this._getLabelSizes(), g = n.padding * 2, p = Nt(this.labelRotation), v = Math.cos(p), m = Math.sin(p);
        if (r) {
          const b = n.mirror ? 0 : m * u.width + v * f.height;
          t.height = Math.min(this.maxHeight, t.height + b + g);
        } else {
          const b = n.mirror ? 0 : v * u.width + m * f.height;
          t.width = Math.min(this.maxWidth, t.width + b + g);
        }
        this._calculatePadding(c, h, m, v);
      }
    }
    this._handleMargins(), r ? (this.width = this._length = s.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = s.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, s, n, a) {
    const { ticks: { align: i, padding: o }, position: r } = this.options, l = this.labelRotation !== 0, c = r !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const h = this.getPixelForTick(0) - this.left, u = this.right - this.getPixelForTick(this.ticks.length - 1);
      let f = 0, g = 0;
      l ? c ? (f = a * t.width, g = n * s.height) : (f = n * t.height, g = a * s.width) : i === "start" ? g = s.width : i === "end" ? f = t.width : i !== "inner" && (f = t.width / 2, g = s.width / 2), this.paddingLeft = Math.max((f - h + o) * this.width / (this.width - h), 0), this.paddingRight = Math.max((g - u + o) * this.width / (this.width - u), 0);
    } else {
      let h = s.height / 2, u = t.height / 2;
      i === "start" ? (h = 0, u = t.height) : i === "end" && (h = s.height, u = 0), this.paddingTop = h + o, this.paddingBottom = u + o;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    lt(this.options.afterFit, [
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
    let s, n;
    for (s = 0, n = t.length; s < n; s++)
      et(t[s].label) && (t.splice(s, 1), n--, s--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const s = this.options.ticks.sampleSize;
      let n = this.ticks;
      s < n.length && (n = aa(n, s)), this._labelSizes = t = this._computeLabelSizes(n, n.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, s, n) {
    const { ctx: a, _longestTextCache: i } = this, o = [], r = [], l = Math.floor(s / na(s, n));
    let c = 0, h = 0, u, f, g, p, v, m, b, y, x, M, w;
    for (u = 0; u < s; u += l) {
      if (p = t[u].label, v = this._resolveTickFontOptions(u), a.font = m = v.string, b = i[m] = i[m] || {
        data: {},
        gc: []
      }, y = v.lineHeight, x = M = 0, !et(p) && !ft(p))
        x = Bn(a, b.data, b.gc, x, p), M = y;
      else if (ft(p))
        for (f = 0, g = p.length; f < g; ++f)
          w = p[f], !et(w) && !ft(w) && (x = Bn(a, b.data, b.gc, x, w), M += y);
      o.push(x), r.push(M), c = Math.max(x, c), h = Math.max(M, h);
    }
    ac(i, s);
    const C = o.indexOf(c), $ = r.indexOf(h), A = (L) => ({
      width: o[L] || 0,
      height: r[L] || 0
    });
    return {
      first: A(0),
      last: A(s - 1),
      widest: A(C),
      highest: A($),
      widths: o,
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
    return Wo(this._alignToPixels ? Qt(this.chart, s, 0) : s);
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
      const n = s[t];
      return n.$context || (n.$context = oc(this.getContext(), t, n));
    }
    return this.$context || (this.$context = ic(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, s = Nt(this.labelRotation), n = Math.abs(Math.cos(s)), a = Math.abs(Math.sin(s)), i = this._getLabelSizes(), o = t.autoSkipPadding || 0, r = i ? i.widest.width + o : 0, l = i ? i.highest.height + o : 0;
    return this.isHorizontal() ? l * n > r * a ? r / n : l / a : l * a < r * n ? l / n : r / a;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const s = this.axis, n = this.chart, a = this.options, { grid: i, position: o, border: r } = a, l = i.offset, c = this.isHorizontal(), u = this.ticks.length + (l ? 1 : 0), f = Se(i), g = [], p = r.setContext(this.getContext()), v = p.display ? p.width : 0, m = v / 2, b = function(U) {
      return Qt(n, U, v);
    };
    let y, x, M, w, C, $, A, L, D, F, P, R;
    if (o === "top")
      y = b(this.bottom), $ = this.bottom - f, L = y - m, F = b(t.top) + m, R = t.bottom;
    else if (o === "bottom")
      y = b(this.top), F = t.top, R = b(t.bottom) - m, $ = y + m, L = this.top + f;
    else if (o === "left")
      y = b(this.right), C = this.right - f, A = y - m, D = b(t.left) + m, P = t.right;
    else if (o === "right")
      y = b(this.left), D = t.left, P = b(t.right) - m, C = y + m, A = this.left + f;
    else if (s === "x") {
      if (o === "center")
        y = b((t.top + t.bottom) / 2 + 0.5);
      else if (K(o)) {
        const U = Object.keys(o)[0], st = o[U];
        y = b(this.chart.scales[U].getPixelForValue(st));
      }
      F = t.top, R = t.bottom, $ = y + m, L = $ + f;
    } else if (s === "y") {
      if (o === "center")
        y = b((t.left + t.right) / 2);
      else if (K(o)) {
        const U = Object.keys(o)[0], st = o[U];
        y = b(this.chart.scales[U].getPixelForValue(st));
      }
      C = y - m, A = C - f, D = t.left, P = t.right;
    }
    const E = Y(a.ticks.maxTicksLimit, u), I = Math.max(1, Math.ceil(u / E));
    for (x = 0; x < u; x += I) {
      const U = this.getContext(x), st = i.setContext(U), H = r.setContext(U), O = st.lineWidth, N = st.color, q = H.dash || [], Q = H.dashOffset, rt = st.tickWidth, ct = st.tickColor, mt = st.tickBorderDash || [], Ct = st.tickBorderDashOffset;
      M = nc(this, x, l), M !== void 0 && (w = Qt(n, M, O), c ? C = A = D = P = w : $ = L = F = R = w, g.push({
        tx1: C,
        ty1: $,
        tx2: A,
        ty2: L,
        x1: D,
        y1: F,
        x2: P,
        y2: R,
        width: O,
        color: N,
        borderDash: q,
        borderDashOffset: Q,
        tickWidth: rt,
        tickColor: ct,
        tickBorderDash: mt,
        tickBorderDashOffset: Ct
      }));
    }
    return this._ticksLength = u, this._borderValue = y, g;
  }
  _computeLabelItems(t) {
    const s = this.axis, n = this.options, { position: a, ticks: i } = n, o = this.isHorizontal(), r = this.ticks, { align: l, crossAlign: c, padding: h, mirror: u } = i, f = Se(n.grid), g = f + h, p = u ? -h : g, v = -Nt(this.labelRotation), m = [];
    let b, y, x, M, w, C, $, A, L, D, F, P, R = "middle";
    if (a === "top")
      C = this.bottom - p, $ = this._getXAxisLabelAlignment();
    else if (a === "bottom")
      C = this.top + p, $ = this._getXAxisLabelAlignment();
    else if (a === "left") {
      const I = this._getYAxisLabelAlignment(f);
      $ = I.textAlign, w = I.x;
    } else if (a === "right") {
      const I = this._getYAxisLabelAlignment(f);
      $ = I.textAlign, w = I.x;
    } else if (s === "x") {
      if (a === "center")
        C = (t.top + t.bottom) / 2 + g;
      else if (K(a)) {
        const I = Object.keys(a)[0], U = a[I];
        C = this.chart.scales[I].getPixelForValue(U) + g;
      }
      $ = this._getXAxisLabelAlignment();
    } else if (s === "y") {
      if (a === "center")
        w = (t.left + t.right) / 2 - g;
      else if (K(a)) {
        const I = Object.keys(a)[0], U = a[I];
        w = this.chart.scales[I].getPixelForValue(U);
      }
      $ = this._getYAxisLabelAlignment(f).textAlign;
    }
    s === "y" && (l === "start" ? R = "top" : l === "end" && (R = "bottom"));
    const E = this._getLabelSizes();
    for (b = 0, y = r.length; b < y; ++b) {
      x = r[b], M = x.label;
      const I = i.setContext(this.getContext(b));
      A = this.getPixelForTick(b) + i.labelOffset, L = this._resolveTickFontOptions(b), D = L.lineHeight, F = ft(M) ? M.length : 1;
      const U = F / 2, st = I.color, H = I.textStrokeColor, O = I.textStrokeWidth;
      let N = $;
      o ? (w = A, $ === "inner" && (b === y - 1 ? N = this.options.reverse ? "left" : "right" : b === 0 ? N = this.options.reverse ? "right" : "left" : N = "center"), a === "top" ? c === "near" || v !== 0 ? P = -F * D + D / 2 : c === "center" ? P = -E.highest.height / 2 - U * D + D : P = -E.highest.height + D / 2 : c === "near" || v !== 0 ? P = D / 2 : c === "center" ? P = E.highest.height / 2 - U * D : P = E.highest.height - F * D, u && (P *= -1), v !== 0 && !I.showLabelBackdrop && (w += D / 2 * Math.sin(v))) : (C = A, P = (1 - F) * D / 2);
      let q;
      if (I.showLabelBackdrop) {
        const Q = Bt(I.backdropPadding), rt = E.heights[b], ct = E.widths[b];
        let mt = P - Q.top, Ct = 0 - Q.left;
        switch (R) {
          case "middle":
            mt -= rt / 2;
            break;
          case "bottom":
            mt -= rt;
            break;
        }
        switch ($) {
          case "center":
            Ct -= ct / 2;
            break;
          case "right":
            Ct -= ct;
            break;
          case "inner":
            b === y - 1 ? Ct -= ct : b > 0 && (Ct -= ct / 2);
            break;
        }
        q = {
          left: Ct,
          top: mt,
          width: ct + Q.width,
          height: rt + Q.height,
          color: I.backdropColor
        };
      }
      m.push({
        label: M,
        font: L,
        textOffset: P,
        options: {
          rotation: v,
          color: st,
          strokeColor: H,
          strokeWidth: O,
          textAlign: N,
          textBaseline: R,
          translation: [
            w,
            C
          ],
          backdrop: q
        }
      });
    }
    return m;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: s } = this.options;
    if (-Nt(this.labelRotation))
      return t === "top" ? "left" : "right";
    let a = "center";
    return s.align === "start" ? a = "left" : s.align === "end" ? a = "right" : s.align === "inner" && (a = "inner"), a;
  }
  _getYAxisLabelAlignment(t) {
    const { position: s, ticks: { crossAlign: n, mirror: a, padding: i } } = this.options, o = this._getLabelSizes(), r = t + i, l = o.widest.width;
    let c, h;
    return s === "left" ? a ? (h = this.right + i, n === "near" ? c = "left" : n === "center" ? (c = "center", h += l / 2) : (c = "right", h += l)) : (h = this.right - r, n === "near" ? c = "right" : n === "center" ? (c = "center", h -= l / 2) : (c = "left", h = this.left)) : s === "right" ? a ? (h = this.left + i, n === "near" ? c = "right" : n === "center" ? (c = "center", h -= l / 2) : (c = "left", h -= l)) : (h = this.left + r, n === "near" ? c = "left" : n === "center" ? (c = "center", h += l / 2) : (c = "right", h = this.right)) : c = "right", {
      textAlign: c,
      x: h
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
    const { ctx: t, options: { backgroundColor: s }, left: n, top: a, width: i, height: o } = this;
    s && (t.save(), t.fillStyle = s, t.fillRect(n, a, i, o), t.restore());
  }
  getLineWidthForValue(t) {
    const s = this.options.grid;
    if (!this._isVisible() || !s.display)
      return 0;
    const a = this.ticks.findIndex((i) => i.value === t);
    return a >= 0 ? s.setContext(this.getContext(a)).lineWidth : 0;
  }
  drawGrid(t) {
    const s = this.options.grid, n = this.ctx, a = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
    let i, o;
    const r = (l, c, h) => {
      !h.width || !h.color || (n.save(), n.lineWidth = h.width, n.strokeStyle = h.color, n.setLineDash(h.borderDash || []), n.lineDashOffset = h.borderDashOffset, n.beginPath(), n.moveTo(l.x, l.y), n.lineTo(c.x, c.y), n.stroke(), n.restore());
    };
    if (s.display)
      for (i = 0, o = a.length; i < o; ++i) {
        const l = a[i];
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
    const { chart: t, ctx: s, options: { border: n, grid: a } } = this, i = n.setContext(this.getContext()), o = n.display ? i.width : 0;
    if (!o)
      return;
    const r = a.setContext(this.getContext(0)).lineWidth, l = this._borderValue;
    let c, h, u, f;
    this.isHorizontal() ? (c = Qt(t, this.left, o) - o / 2, h = Qt(t, this.right, r) + r / 2, u = f = l) : (u = Qt(t, this.top, o) - o / 2, f = Qt(t, this.bottom, r) + r / 2, c = h = l), s.save(), s.lineWidth = i.width, s.strokeStyle = i.color, s.beginPath(), s.moveTo(c, u), s.lineTo(h, f), s.stroke(), s.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const n = this.ctx, a = this._computeLabelArea();
    a && fs(n, a);
    const i = this.getLabelItems(t);
    for (const o of i) {
      const r = o.options, l = o.font, c = o.label, h = o.textOffset;
      We(n, c, 0, h, l, r);
    }
    a && gs(n);
  }
  drawTitle() {
    const { ctx: t, options: { position: s, title: n, reverse: a } } = this;
    if (!n.display)
      return;
    const i = _t(n.font), o = Bt(n.padding), r = n.align;
    let l = i.lineHeight / 2;
    s === "bottom" || s === "center" || K(s) ? (l += o.bottom, ft(n.text) && (l += i.lineHeight * (n.text.length - 1))) : l += o.top;
    const { titleX: c, titleY: h, maxWidth: u, rotation: f } = lc(this, l, s, r);
    We(t, n.text, 0, 0, i, {
      color: n.color,
      maxWidth: u,
      rotation: f,
      textAlign: rc(r, s, a),
      textBaseline: "middle",
      translation: [
        c,
        h
      ]
    });
  }
  draw(t) {
    this._isVisible() && (this.drawBackground(), this.drawGrid(t), this.drawBorder(), this.drawTitle(), this.drawLabels(t));
  }
  _layers() {
    const t = this.options, s = t.ticks && t.ticks.z || 0, n = Y(t.grid && t.grid.z, -1), a = Y(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== ve.prototype.draw ? [
      {
        z: s,
        draw: (i) => {
          this.draw(i);
        }
      }
    ] : [
      {
        z: n,
        draw: (i) => {
          this.drawBackground(), this.drawGrid(i), this.drawTitle();
        }
      },
      {
        z: a,
        draw: () => {
          this.drawBorder();
        }
      },
      {
        z: s,
        draw: (i) => {
          this.drawLabels(i);
        }
      }
    ];
  }
  getMatchingVisibleMetas(t) {
    const s = this.chart.getSortedVisibleDatasetMetas(), n = this.axis + "AxisID", a = [];
    let i, o;
    for (i = 0, o = s.length; i < o; ++i) {
      const r = s[i];
      r[n] === this.id && (!t || r.type === t) && a.push(r);
    }
    return a;
  }
  _resolveTickFontOptions(t) {
    const s = this.options.ticks.setContext(this.getContext(t));
    return _t(s.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class Qe {
  constructor(t, s, n) {
    this.type = t, this.scope = s, this.override = n, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const s = Object.getPrototypeOf(t);
    let n;
    hc(s) && (n = this.register(s));
    const a = this.items, i = t.id, o = this.scope + "." + i;
    if (!i)
      throw new Error("class does not have id: " + t);
    return i in a || (a[i] = t, cc(t, o, n), this.override && ut.override(t.id, t.overrides)), o;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const s = this.items, n = t.id, a = this.scope;
    n in s && delete s[n], a && n in ut[a] && (delete ut[a][n], this.override && delete ie[n]);
  }
}
function cc(e, t, s) {
  const n = Ee(/* @__PURE__ */ Object.create(null), [
    s ? ut.get(s) : {},
    ut.get(t),
    e.defaults
  ]);
  ut.set(t, n), e.defaultRoutes && dc(t, e.defaultRoutes), e.descriptors && ut.describe(t, e.descriptors);
}
function dc(e, t) {
  Object.keys(t).forEach((s) => {
    const n = s.split("."), a = n.pop(), i = [
      e
    ].concat(n).join("."), o = t[s].split("."), r = o.pop(), l = o.join(".");
    ut.route(i, a, l, r);
  });
}
function hc(e) {
  return "id" in e && "defaults" in e;
}
class uc {
  constructor() {
    this.controllers = new Qe(bs, "datasets", !0), this.elements = new Qe(Vt, "elements"), this.plugins = new Qe(Object, "plugins"), this.scales = new Qe(ve, "scales"), this._typedRegistries = [
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
  _each(t, s, n) {
    [
      ...s
    ].forEach((a) => {
      const i = n || this._getRegistryForType(a);
      n || i.isForType(a) || i === this.plugins && a.id ? this._exec(t, i, a) : nt(a, (o) => {
        const r = n || this._getRegistryForType(o);
        this._exec(t, r, o);
      });
    });
  }
  _exec(t, s, n) {
    const a = Zs(t);
    lt(n["before" + a], [], n), s[t](n), lt(n["after" + a], [], n);
  }
  _getRegistryForType(t) {
    for (let s = 0; s < this._typedRegistries.length; s++) {
      const n = this._typedRegistries[s];
      if (n.isForType(t))
        return n;
    }
    return this.plugins;
  }
  _get(t, s, n) {
    const a = s.get(t);
    if (a === void 0)
      throw new Error('"' + t + '" is not a registered ' + n + ".");
    return a;
  }
}
var Et = /* @__PURE__ */ new uc();
class fc {
  constructor() {
    this._init = void 0;
  }
  notify(t, s, n, a) {
    if (s === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install")), this._init === void 0)
      return;
    const i = a ? this._descriptors(t).filter(a) : this._descriptors(t), o = this._notify(i, t, s, n);
    return s === "afterDestroy" && (this._notify(i, t, "stop"), this._notify(this._init, t, "uninstall"), this._init = void 0), o;
  }
  _notify(t, s, n, a) {
    a = a || {};
    for (const i of t) {
      const o = i.plugin, r = o[n], l = [
        s,
        a,
        i.options
      ];
      if (lt(r, l, o) === !1 && a.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    et(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const s = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), s;
  }
  _createDescriptors(t, s) {
    const n = t && t.config, a = Y(n.options && n.options.plugins, {}), i = gc(n);
    return a === !1 && !s ? [] : bc(t, i, a, s);
  }
  _notifyStateChanges(t) {
    const s = this._oldCache || [], n = this._cache, a = (i, o) => i.filter((r) => !o.some((l) => r.plugin.id === l.plugin.id));
    this._notify(a(s, n), t, "stop"), this._notify(a(n, s), t, "start");
  }
}
function gc(e) {
  const t = {}, s = [], n = Object.keys(Et.plugins.items);
  for (let i = 0; i < n.length; i++)
    s.push(Et.getPlugin(n[i]));
  const a = e.plugins || [];
  for (let i = 0; i < a.length; i++) {
    const o = a[i];
    s.indexOf(o) === -1 && (s.push(o), t[o.id] = !0);
  }
  return {
    plugins: s,
    localIds: t
  };
}
function pc(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function bc(e, { plugins: t, localIds: s }, n, a) {
  const i = [], o = e.getContext();
  for (const r of t) {
    const l = r.id, c = pc(n[l], a);
    c !== null && i.push({
      plugin: r,
      options: mc(e.config, {
        plugin: r,
        local: s[l]
      }, c, o)
    });
  }
  return i;
}
function mc(e, { plugin: t, local: s }, n, a) {
  const i = e.pluginScopeKeys(t), o = e.getOptionScopes(n, i);
  return s && t.defaults && o.push(t.defaults), e.createResolver(o, a, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function js(e, t) {
  const s = ut.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || s.indexAxis || "x";
}
function vc(e, t) {
  let s = e;
  return e === "_index_" ? s = t : e === "_value_" && (s = t === "x" ? "y" : "x"), s;
}
function yc(e, t) {
  return e === t ? "_index_" : "_value_";
}
function oa(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function _c(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function Ys(e, ...t) {
  if (oa(e))
    return e;
  for (const s of t) {
    const n = s.axis || _c(s.position) || e.length > 1 && oa(e[0].toLowerCase());
    if (n)
      return n;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function ra(e, t, s) {
  if (s[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function xc(e, t) {
  if (t.data && t.data.datasets) {
    const s = t.data.datasets.filter((n) => n.xAxisID === e || n.yAxisID === e);
    if (s.length)
      return ra(e, "x", s[0]) || ra(e, "y", s[0]);
  }
  return {};
}
function kc(e, t) {
  const s = ie[e.type] || {
    scales: {}
  }, n = t.scales || {}, a = js(e.type, t), i = /* @__PURE__ */ Object.create(null);
  return Object.keys(n).forEach((o) => {
    const r = n[o];
    if (!K(r))
      return console.error(`Invalid scale configuration for scale: ${o}`);
    if (r._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${o}`);
    const l = Ys(o, r, xc(o, e), ut.scales[r.type]), c = yc(l, a), h = s.scales || {};
    i[o] = Te(/* @__PURE__ */ Object.create(null), [
      {
        axis: l
      },
      r,
      h[l],
      h[c]
    ]);
  }), e.data.datasets.forEach((o) => {
    const r = o.type || e.type, l = o.indexAxis || js(r, t), h = (ie[r] || {}).scales || {};
    Object.keys(h).forEach((u) => {
      const f = vc(u, l), g = o[f + "AxisID"] || f;
      i[g] = i[g] || /* @__PURE__ */ Object.create(null), Te(i[g], [
        {
          axis: f
        },
        n[g],
        h[u]
      ]);
    });
  }), Object.keys(i).forEach((o) => {
    const r = i[o];
    Te(r, [
      ut.scales[r.type],
      ut.scale
    ]);
  }), i;
}
function Ci(e) {
  const t = e.options || (e.options = {});
  t.plugins = Y(t.plugins, {}), t.scales = kc(e, t);
}
function $i(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function Mc(e) {
  return e = e || {}, e.data = $i(e.data), Ci(e), e;
}
const la = /* @__PURE__ */ new Map(), Di = /* @__PURE__ */ new Set();
function Je(e, t) {
  let s = la.get(e);
  return s || (s = t(), la.set(e, s), Di.add(s)), s;
}
const we = (e, t, s) => {
  const n = ae(t, s);
  n !== void 0 && e.add(n);
};
class Sc {
  constructor(t) {
    this._config = Mc(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = $i(t);
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
    this.clearCache(), Ci(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return Je(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, s) {
    return Je(`${t}.transition.${s}`, () => [
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
    return Je(`${t}-${s}`, () => [
      [
        `datasets.${t}.elements.${s}`,
        `datasets.${t}`,
        `elements.${s}`,
        ""
      ]
    ]);
  }
  pluginScopeKeys(t) {
    const s = t.id, n = this.type;
    return Je(`${n}-plugin-${s}`, () => [
      [
        `plugins.${s}`,
        ...t.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(t, s) {
    const n = this._scopeCache;
    let a = n.get(t);
    return (!a || s) && (a = /* @__PURE__ */ new Map(), n.set(t, a)), a;
  }
  getOptionScopes(t, s, n) {
    const { options: a, type: i } = this, o = this._cachedScopes(t, n), r = o.get(s);
    if (r)
      return r;
    const l = /* @__PURE__ */ new Set();
    s.forEach((h) => {
      t && (l.add(t), h.forEach((u) => we(l, t, u))), h.forEach((u) => we(l, a, u)), h.forEach((u) => we(l, ie[i] || {}, u)), h.forEach((u) => we(l, ut, u)), h.forEach((u) => we(l, Hs, u));
    });
    const c = Array.from(l);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), Di.has(s) && o.set(s, c), c;
  }
  chartOptionScopes() {
    const { options: t, type: s } = this;
    return [
      t,
      ie[s] || {},
      ut.datasets[s] || {},
      {
        type: s
      },
      ut,
      Hs
    ];
  }
  resolveNamedOptions(t, s, n, a = [
    ""
  ]) {
    const i = {
      $shared: !0
    }, { resolver: o, subPrefixes: r } = ca(this._resolverCache, t, a);
    let l = o;
    if (Cc(o, s)) {
      i.$shared = !1, n = Kt(n) ? n() : n;
      const c = this.createResolver(t, n, r);
      l = be(o, n, c);
    }
    for (const c of s)
      i[c] = l[c];
    return i;
  }
  createResolver(t, s, n = [
    ""
  ], a) {
    const { resolver: i } = ca(this._resolverCache, t, n);
    return K(s) ? be(i, s, void 0, a) : i;
  }
}
function ca(e, t, s) {
  let n = e.get(t);
  n || (n = /* @__PURE__ */ new Map(), e.set(t, n));
  const a = s.join();
  let i = n.get(a);
  return i || (i = {
    resolver: nn(t, s),
    subPrefixes: s.filter((r) => !r.toLowerCase().includes("hover"))
  }, n.set(a, i)), i;
}
const wc = (e) => K(e) && Object.getOwnPropertyNames(e).some((t) => Kt(e[t]));
function Cc(e, t) {
  const { isScriptable: s, isIndexable: n } = ri(e);
  for (const a of t) {
    const i = s(a), o = n(a), r = (o || i) && e[a];
    if (i && (Kt(r) || wc(r)) || o && ft(r))
      return !0;
  }
  return !1;
}
var $c = "4.5.1";
const Dc = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function da(e, t) {
  return e === "top" || e === "bottom" || Dc.indexOf(e) === -1 && t === "x";
}
function ha(e, t) {
  return function(s, n) {
    return s[e] === n[e] ? s[t] - n[t] : s[e] - n[e];
  };
}
function ua(e) {
  const t = e.chart, s = t.options.animation;
  t.notifyPlugins("afterRender"), lt(s && s.onComplete, [
    e
  ], t);
}
function Ac(e) {
  const t = e.chart, s = t.options.animation;
  lt(s && s.onProgress, [
    e
  ], t);
}
function Ai(e) {
  return rn() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const ns = {}, fa = (e) => {
  const t = Ai(e);
  return Object.values(ns).filter((s) => s.canvas === t).pop();
};
function Tc(e, t, s) {
  const n = Object.keys(e);
  for (const a of n) {
    const i = +a;
    if (i >= t) {
      const o = e[a];
      delete e[a], (s > 0 || i > t) && (e[i + s] = o);
    }
  }
}
function Fc(e, t, s, n) {
  return !s || e.type === "mouseout" ? null : n ? t : e;
}
let ye = class {
  static defaults = ut;
  static instances = ns;
  static overrides = ie;
  static registry = Et;
  static version = $c;
  static getChart = fa;
  static register(...t) {
    Et.add(...t), ga();
  }
  static unregister(...t) {
    Et.remove(...t), ga();
  }
  constructor(t, s) {
    const n = this.config = new Sc(s), a = Ai(t), i = fa(a);
    if (i)
      throw new Error("Canvas is already in use. Chart with ID '" + i.id + "' must be destroyed before the canvas with ID '" + i.canvas.id + "' can be reused.");
    const o = n.createResolver(n.chartOptionScopes(), this.getContext());
    this.platform = new (n.platform || Kl(a))(), this.platform.updateConfig(n);
    const r = this.platform.acquireContext(a, o.aspectRatio), l = r && r.canvas, c = l && l.height, h = l && l.width;
    if (this.id = wo(), this.ctx = r, this.canvas = l, this.width = h, this.height = c, this._options = o, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new fc(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = jo((u) => this.update(u), o.resizeDelay || 0), this._dataChanges = [], ns[this.id] = this, !r || !l) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    It.listen(this, "complete", ua), It.listen(this, "progress", Ac), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: s }, width: n, height: a, _aspectRatio: i } = this;
    return et(t) ? s && i ? i : a ? n / a : null : t;
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
    return Et;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : On(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Pn(this.canvas, this.ctx), this;
  }
  stop() {
    return It.stop(this), this;
  }
  resize(t, s) {
    It.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: s
    } : this._resize(t, s);
  }
  _resize(t, s) {
    const n = this.options, a = this.canvas, i = n.maintainAspectRatio && this.aspectRatio, o = this.platform.getMaximumSize(a, t, s, i), r = n.devicePixelRatio || this.platform.getDevicePixelRatio(), l = this.width ? "resize" : "attach";
    this.width = o.width, this.height = o.height, this._aspectRatio = this.aspectRatio, On(this, r, !0) && (this.notifyPlugins("resize", {
      size: o
    }), lt(n.onResize, [
      this,
      o
    ], this), this.attached && this._doResize(l) && this.render());
  }
  ensureScalesHaveIDs() {
    const s = this.options.scales || {};
    nt(s, (n, a) => {
      n.id = a;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, s = t.scales, n = this.scales, a = Object.keys(n).reduce((o, r) => (o[r] = !1, o), {});
    let i = [];
    s && (i = i.concat(Object.keys(s).map((o) => {
      const r = s[o], l = Ys(o, r), c = l === "r", h = l === "x";
      return {
        options: r,
        dposition: c ? "chartArea" : h ? "bottom" : "left",
        dtype: c ? "radialLinear" : h ? "category" : "linear"
      };
    }))), nt(i, (o) => {
      const r = o.options, l = r.id, c = Ys(l, r), h = Y(r.type, o.dtype);
      (r.position === void 0 || da(r.position, c) !== da(o.dposition)) && (r.position = o.dposition), a[l] = !0;
      let u = null;
      if (l in n && n[l].type === h)
        u = n[l];
      else {
        const f = Et.getScale(h);
        u = new f({
          id: l,
          type: h,
          ctx: this.ctx,
          chart: this
        }), n[u.id] = u;
      }
      u.init(r, t);
    }), nt(a, (o, r) => {
      o || delete n[r];
    }), nt(n, (o) => {
      Ft.configure(this, o, o.options), Ft.addBox(this, o);
    });
  }
  _updateMetasets() {
    const t = this._metasets, s = this.data.datasets.length, n = t.length;
    if (t.sort((a, i) => a.index - i.index), n > s) {
      for (let a = s; a < n; ++a)
        this._destroyDatasetMeta(a);
      t.splice(s, n - s);
    }
    this._sortedMetasets = t.slice(0).sort(ha("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: t, data: { datasets: s } } = this;
    t.length > s.length && delete this._stacks, t.forEach((n, a) => {
      s.filter((i) => i === n._dataset).length === 0 && this._destroyDatasetMeta(a);
    });
  }
  buildOrUpdateControllers() {
    const t = [], s = this.data.datasets;
    let n, a;
    for (this._removeUnreferencedMetasets(), n = 0, a = s.length; n < a; n++) {
      const i = s[n];
      let o = this.getDatasetMeta(n);
      const r = i.type || this.config.type;
      if (o.type && o.type !== r && (this._destroyDatasetMeta(n), o = this.getDatasetMeta(n)), o.type = r, o.indexAxis = i.indexAxis || js(r, this.options), o.order = i.order || 0, o.index = n, o.label = "" + i.label, o.visible = this.isDatasetVisible(n), o.controller)
        o.controller.updateIndex(n), o.controller.linkScales();
      else {
        const l = Et.getController(r), { datasetElementType: c, dataElementType: h } = ut.datasets[r];
        Object.assign(l, {
          dataElementType: Et.getElement(h),
          datasetElementType: c && Et.getElement(c)
        }), o.controller = new l(this, n), t.push(o.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    nt(this.data.datasets, (t, s) => {
      this.getDatasetMeta(s).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(t) {
    const s = this.config;
    s.update();
    const n = this._options = s.createResolver(s.chartOptionScopes(), this.getContext()), a = this._animationsDisabled = !n.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
      mode: t,
      cancelable: !0
    }) === !1)
      return;
    const i = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let o = 0;
    for (let c = 0, h = this.data.datasets.length; c < h; c++) {
      const { controller: u } = this.getDatasetMeta(c), f = !a && i.indexOf(u) === -1;
      u.buildOrUpdateElements(f), o = Math.max(+u.getMaxOverflow(), o);
    }
    o = this._minPadding = n.layout.autoPadding ? o : 0, this._updateLayout(o), a || nt(i, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(ha("z", "_idx"));
    const { _active: r, _lastEvent: l } = this;
    l ? this._eventHandler(l, !0) : r.length && this._updateHoverStyles(r, r, !0), this.render();
  }
  _updateScales() {
    nt(this.scales, (t) => {
      Ft.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, s = new Set(Object.keys(this._listeners)), n = new Set(t.events);
    (!Mn(s, n) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, s = this._getUniformDataChanges() || [];
    for (const { method: n, start: a, count: i } of s) {
      const o = n === "_removeElements" ? -i : i;
      Tc(t, a, o);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const s = this.data.datasets.length, n = (i) => new Set(t.filter((o) => o[0] === i).map((o, r) => r + "," + o.splice(1).join(","))), a = n(0);
    for (let i = 1; i < s; i++)
      if (!Mn(a, n(i)))
        return;
    return Array.from(a).map((i) => i.split(",")).map((i) => ({
      method: i[1],
      start: +i[2],
      count: +i[3]
    }));
  }
  _updateLayout(t) {
    if (this.notifyPlugins("beforeLayout", {
      cancelable: !0
    }) === !1)
      return;
    Ft.update(this, this.width, this.height, t);
    const s = this.chartArea, n = s.width <= 0 || s.height <= 0;
    this._layers = [], nt(this.boxes, (a) => {
      n && a.position === "chartArea" || (a.configure && a.configure(), this._layers.push(...a._layers()));
    }, this), this._layers.forEach((a, i) => {
      a._idx = i;
    }), this.notifyPlugins("afterLayout");
  }
  _updateDatasets(t) {
    if (this.notifyPlugins("beforeDatasetsUpdate", {
      mode: t,
      cancelable: !0
    }) !== !1) {
      for (let s = 0, n = this.data.datasets.length; s < n; ++s)
        this.getDatasetMeta(s).controller.configure();
      for (let s = 0, n = this.data.datasets.length; s < n; ++s)
        this._updateDataset(s, Kt(t) ? t({
          datasetIndex: s
        }) : t);
      this.notifyPlugins("afterDatasetsUpdate", {
        mode: t
      });
    }
  }
  _updateDataset(t, s) {
    const n = this.getDatasetMeta(t), a = {
      meta: n,
      index: t,
      mode: s,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetUpdate", a) !== !1 && (n.controller._update(s), a.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", a));
  }
  render() {
    this.notifyPlugins("beforeRender", {
      cancelable: !0
    }) !== !1 && (It.has(this) ? this.attached && !It.running(this) && It.start(this) : (this.draw(), ua({
      chart: this
    })));
  }
  draw() {
    let t;
    if (this._resizeBeforeDraw) {
      const { width: n, height: a } = this._resizeBeforeDraw;
      this._resizeBeforeDraw = null, this._resize(n, a);
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
    const s = this._sortedMetasets, n = [];
    let a, i;
    for (a = 0, i = s.length; a < i; ++a) {
      const o = s[a];
      (!t || o.visible) && n.push(o);
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
    for (let s = t.length - 1; s >= 0; --s)
      this._drawDataset(t[s]);
    this.notifyPlugins("afterDatasetsDraw");
  }
  _drawDataset(t) {
    const s = this.ctx, n = {
      meta: t,
      index: t.index,
      cancelable: !0
    }, a = mi(this, t);
    this.notifyPlugins("beforeDatasetDraw", n) !== !1 && (a && fs(s, a), t.controller.draw(), a && gs(s), n.cancelable = !1, this.notifyPlugins("afterDatasetDraw", n));
  }
  isPointInArea(t) {
    return ze(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, s, n, a) {
    const i = Dl.modes[s];
    return typeof i == "function" ? i(this, t, n, a) : [];
  }
  getDatasetMeta(t) {
    const s = this.data.datasets[t], n = this._metasets;
    let a = n.filter((i) => i && i._dataset === s).pop();
    return a || (a = {
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
    }, n.push(a)), a;
  }
  getContext() {
    return this.$context || (this.$context = oe(null, {
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
    const n = this.getDatasetMeta(t);
    return typeof n.hidden == "boolean" ? !n.hidden : !s.hidden;
  }
  setDatasetVisibility(t, s) {
    const n = this.getDatasetMeta(t);
    n.hidden = !s;
  }
  toggleDataVisibility(t) {
    this._hiddenIndices[t] = !this._hiddenIndices[t];
  }
  getDataVisibility(t) {
    return !this._hiddenIndices[t];
  }
  _updateVisibility(t, s, n) {
    const a = n ? "show" : "hide", i = this.getDatasetMeta(t), o = i.controller._resolveAnimations(void 0, a);
    Oe(s) ? (i.data[s].hidden = !n, this.update()) : (this.setDatasetVisibility(t, n), o.update(i, {
      visible: n
    }), this.update((r) => r.datasetIndex === t ? a : void 0));
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
    for (this.stop(), It.remove(this), t = 0, s = this.data.datasets.length; t < s; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: s } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), Pn(t, s), this.platform.releaseContext(s), this.canvas = null, this.ctx = null), delete ns[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const t = this._listeners, s = this.platform, n = (i, o) => {
      s.addEventListener(this, i, o), t[i] = o;
    }, a = (i, o, r) => {
      i.offsetX = o, i.offsetY = r, this._eventHandler(i);
    };
    nt(this.options.events, (i) => n(i, a));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, s = this.platform, n = (l, c) => {
      s.addEventListener(this, l, c), t[l] = c;
    }, a = (l, c) => {
      t[l] && (s.removeEventListener(this, l, c), delete t[l]);
    }, i = (l, c) => {
      this.canvas && this.resize(l, c);
    };
    let o;
    const r = () => {
      a("attach", r), this.attached = !0, this.resize(), n("resize", i), n("detach", o);
    };
    o = () => {
      this.attached = !1, a("resize", i), this._stop(), this._resize(0, 0), n("attach", r);
    }, s.isAttached(this.canvas) ? r() : o();
  }
  unbindEvents() {
    nt(this._listeners, (t, s) => {
      this.platform.removeEventListener(this, s, t);
    }), this._listeners = {}, nt(this._responsiveListeners, (t, s) => {
      this.platform.removeEventListener(this, s, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, s, n) {
    const a = n ? "set" : "remove";
    let i, o, r, l;
    for (s === "dataset" && (i = this.getDatasetMeta(t[0].datasetIndex), i.controller["_" + a + "DatasetHoverStyle"]()), r = 0, l = t.length; r < l; ++r) {
      o = t[r];
      const c = o && this.getDatasetMeta(o.datasetIndex).controller;
      c && c[a + "HoverStyle"](o.element, o.datasetIndex, o.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const s = this._active || [], n = t.map(({ datasetIndex: i, index: o }) => {
      const r = this.getDatasetMeta(i);
      if (!r)
        throw new Error("No dataset found at index " + i);
      return {
        datasetIndex: i,
        element: r.data[o],
        index: o
      };
    });
    !is(n, s) && (this._active = n, this._lastEvent = null, this._updateHoverStyles(n, s));
  }
  notifyPlugins(t, s, n) {
    return this._plugins.notify(this, t, s, n);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((s) => s.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, s, n) {
    const a = this.options.hover, i = (l, c) => l.filter((h) => !c.some((u) => h.datasetIndex === u.datasetIndex && h.index === u.index)), o = i(s, t), r = n ? t : i(t, s);
    o.length && this.updateHoverStyle(o, a.mode, !1), r.length && a.mode && this.updateHoverStyle(r, a.mode, !0);
  }
  _eventHandler(t, s) {
    const n = {
      event: t,
      replay: s,
      cancelable: !0,
      inChartArea: this.isPointInArea(t)
    }, a = (o) => (o.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", n, a) === !1)
      return;
    const i = this._handleEvent(t, s, n.inChartArea);
    return n.cancelable = !1, this.notifyPlugins("afterEvent", n, a), (i || n.changed) && this.render(), this;
  }
  _handleEvent(t, s, n) {
    const { _active: a = [], options: i } = this, o = s, r = this._getActiveElements(t, a, n, o), l = Fo(t), c = Fc(t, this._lastEvent, n, l);
    n && (this._lastEvent = null, lt(i.onHover, [
      t,
      r,
      this
    ], this), l && lt(i.onClick, [
      t,
      r,
      this
    ], this));
    const h = !is(r, a);
    return (h || s) && (this._active = r, this._updateHoverStyles(r, a, s)), this._lastEvent = c, h;
  }
  _getActiveElements(t, s, n, a) {
    if (t.type === "mouseout")
      return [];
    if (!n)
      return s;
    const i = this.options.hover;
    return this.getElementsAtEventForMode(t, i.mode, i, a);
  }
};
function ga() {
  return nt(ye.instances, (e) => e._plugins.invalidate());
}
function Bc(e, t, s) {
  const { startAngle: n, x: a, y: i, outerRadius: o, innerRadius: r, options: l } = t, { borderWidth: c, borderJoinStyle: h } = l, u = Math.min(c / o, $t(n - s));
  if (e.beginPath(), e.arc(a, i, o - c / 2, n + u / 2, s - u / 2), r > 0) {
    const f = Math.min(c / r, $t(n - s));
    e.arc(a, i, r + c / 2, s - f / 2, n + f / 2, !0);
  } else {
    const f = Math.min(c / 2, o * $t(n - s));
    if (h === "round")
      e.arc(a, i, f, s - at / 2, n + at / 2, !0);
    else if (h === "bevel") {
      const g = 2 * f * f, p = -g * Math.cos(s + at / 2) + a, v = -g * Math.sin(s + at / 2) + i, m = g * Math.cos(n + at / 2) + a, b = g * Math.sin(n + at / 2) + i;
      e.lineTo(p, v), e.lineTo(m, b);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function Pc(e, t, s) {
  const { startAngle: n, pixelMargin: a, x: i, y: o, outerRadius: r, innerRadius: l } = t;
  let c = a / r;
  e.beginPath(), e.arc(i, o, r, n - c, s + c), l > a ? (c = a / l, e.arc(i, o, l, s + c, n - c, !0)) : e.arc(i, o, a, s + pt, n - pt), e.closePath(), e.clip();
}
function Lc(e) {
  return sn(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function Ec(e, t, s, n) {
  const a = Lc(e.options.borderRadius), i = (s - t) / 2, o = Math.min(i, n * t / 2), r = (l) => {
    const c = (s - Math.min(i, l)) * n / 2;
    return yt(l, 0, Math.min(i, c));
  };
  return {
    outerStart: r(a.outerStart),
    outerEnd: r(a.outerEnd),
    innerStart: yt(a.innerStart, 0, o),
    innerEnd: yt(a.innerEnd, 0, o)
  };
}
function he(e, t, s, n) {
  return {
    x: s + e * Math.cos(t),
    y: n + e * Math.sin(t)
  };
}
function hs(e, t, s, n, a, i) {
  const { x: o, y: r, startAngle: l, pixelMargin: c, innerRadius: h } = t, u = Math.max(t.outerRadius + n + s - c, 0), f = h > 0 ? h + n + s + c : 0;
  let g = 0;
  const p = a - l;
  if (n) {
    const I = h > 0 ? h - n : 0, U = u > 0 ? u - n : 0, st = (I + U) / 2, H = st !== 0 ? p * st / (st + n) : p;
    g = (p - H) / 2;
  }
  const v = Math.max(1e-3, p * u - s / at) / u, m = (p - v) / 2, b = l + m + g, y = a - m - g, { outerStart: x, outerEnd: M, innerStart: w, innerEnd: C } = Ec(t, f, u, y - b), $ = u - x, A = u - M, L = b + x / $, D = y - M / A, F = f + w, P = f + C, R = b + w / F, E = y - C / P;
  if (e.beginPath(), i) {
    const I = (L + D) / 2;
    if (e.arc(o, r, u, L, I), e.arc(o, r, u, I, D), M > 0) {
      const O = he(A, D, o, r);
      e.arc(O.x, O.y, M, D, y + pt);
    }
    const U = he(P, y, o, r);
    if (e.lineTo(U.x, U.y), C > 0) {
      const O = he(P, E, o, r);
      e.arc(O.x, O.y, C, y + pt, E + Math.PI);
    }
    const st = (y - C / f + (b + w / f)) / 2;
    if (e.arc(o, r, f, y - C / f, st, !0), e.arc(o, r, f, st, b + w / f, !0), w > 0) {
      const O = he(F, R, o, r);
      e.arc(O.x, O.y, w, R + Math.PI, b - pt);
    }
    const H = he($, b, o, r);
    if (e.lineTo(H.x, H.y), x > 0) {
      const O = he($, L, o, r);
      e.arc(O.x, O.y, x, b - pt, L);
    }
  } else {
    e.moveTo(o, r);
    const I = Math.cos(L) * u + o, U = Math.sin(L) * u + r;
    e.lineTo(I, U);
    const st = Math.cos(D) * u + o, H = Math.sin(D) * u + r;
    e.lineTo(st, H);
  }
  e.closePath();
}
function Oc(e, t, s, n, a) {
  const { fullCircles: i, startAngle: o, circumference: r } = t;
  let l = t.endAngle;
  if (i) {
    hs(e, t, s, n, l, a);
    for (let c = 0; c < i; ++c)
      e.fill();
    isNaN(r) || (l = o + (r % dt || dt));
  }
  return hs(e, t, s, n, l, a), e.fill(), l;
}
function Rc(e, t, s, n, a) {
  const { fullCircles: i, startAngle: o, circumference: r, options: l } = t, { borderWidth: c, borderJoinStyle: h, borderDash: u, borderDashOffset: f, borderRadius: g } = l, p = l.borderAlign === "inner";
  if (!c)
    return;
  e.setLineDash(u || []), e.lineDashOffset = f, p ? (e.lineWidth = c * 2, e.lineJoin = h || "round") : (e.lineWidth = c, e.lineJoin = h || "bevel");
  let v = t.endAngle;
  if (i) {
    hs(e, t, s, n, v, a);
    for (let m = 0; m < i; ++m)
      e.stroke();
    isNaN(r) || (v = o + (r % dt || dt));
  }
  p && Pc(e, t, v), l.selfJoin && v - o >= at && g === 0 && h !== "miter" && Bc(e, t, v), i || (hs(e, t, s, n, v, a), e.stroke());
}
class Ic extends Vt {
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
  inRange(t, s, n) {
    const a = this.getProps([
      "x",
      "y"
    ], n), { angle: i, distance: o } = Ja(a, {
      x: t,
      y: s
    }), { startAngle: r, endAngle: l, innerRadius: c, outerRadius: h, circumference: u } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], n), f = (this.options.spacing + this.options.borderWidth) / 2, g = Y(u, l - r), p = Ie(i, r, l) && r !== l, v = g >= dt || p, m = Ht(o, c + f, h + f);
    return v && m;
  }
  getCenterPoint(t) {
    const { x: s, y: n, startAngle: a, endAngle: i, innerRadius: o, outerRadius: r } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], t), { offset: l, spacing: c } = this.options, h = (a + i) / 2, u = (o + r + c + l) / 2;
    return {
      x: s + Math.cos(h) * u,
      y: n + Math.sin(h) * u
    };
  }
  tooltipPosition(t) {
    return this.getCenterPoint(t);
  }
  draw(t) {
    const { options: s, circumference: n } = this, a = (s.offset || 0) / 4, i = (s.spacing || 0) / 2, o = s.circular;
    if (this.pixelMargin = s.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = n > dt ? Math.floor(n / dt) : 0, n === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const r = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(r) * a, Math.sin(r) * a);
    const l = 1 - Math.sin(Math.min(at, n || 0)), c = a * l;
    t.fillStyle = s.backgroundColor, t.strokeStyle = s.borderColor, Oc(t, this, c, i, o), Rc(t, this, c, i, o), t.restore();
  }
}
function Ti(e, t, s = t) {
  e.lineCap = Y(s.borderCapStyle, t.borderCapStyle), e.setLineDash(Y(s.borderDash, t.borderDash)), e.lineDashOffset = Y(s.borderDashOffset, t.borderDashOffset), e.lineJoin = Y(s.borderJoinStyle, t.borderJoinStyle), e.lineWidth = Y(s.borderWidth, t.borderWidth), e.strokeStyle = Y(s.borderColor, t.borderColor);
}
function zc(e, t, s) {
  e.lineTo(s.x, s.y);
}
function Wc(e) {
  return e.stepped ? ar : e.tension || e.cubicInterpolationMode === "monotone" ? ir : zc;
}
function Fi(e, t, s = {}) {
  const n = e.length, { start: a = 0, end: i = n - 1 } = s, { start: o, end: r } = t, l = Math.max(a, o), c = Math.min(i, r), h = a < o && i < o || a > r && i > r;
  return {
    count: n,
    start: l,
    loop: t.loop,
    ilen: c < l && !h ? n + c - l : c - l
  };
}
function Nc(e, t, s, n) {
  const { points: a, options: i } = t, { count: o, start: r, loop: l, ilen: c } = Fi(a, s, n), h = Wc(i);
  let { move: u = !0, reverse: f } = n || {}, g, p, v;
  for (g = 0; g <= c; ++g)
    p = a[(r + (f ? c - g : g)) % o], !p.skip && (u ? (e.moveTo(p.x, p.y), u = !1) : h(e, v, p, f, i.stepped), v = p);
  return l && (p = a[(r + (f ? c : 0)) % o], h(e, v, p, f, i.stepped)), !!l;
}
function Hc(e, t, s, n) {
  const a = t.points, { count: i, start: o, ilen: r } = Fi(a, s, n), { move: l = !0, reverse: c } = n || {};
  let h = 0, u = 0, f, g, p, v, m, b;
  const y = (M) => (o + (c ? r - M : M)) % i, x = () => {
    v !== m && (e.lineTo(h, m), e.lineTo(h, v), e.lineTo(h, b));
  };
  for (l && (g = a[y(0)], e.moveTo(g.x, g.y)), f = 0; f <= r; ++f) {
    if (g = a[y(f)], g.skip)
      continue;
    const M = g.x, w = g.y, C = M | 0;
    C === p ? (w < v ? v = w : w > m && (m = w), h = (u * h + M) / ++u) : (x(), e.lineTo(M, w), p = C, u = 0, v = m = w), b = w;
  }
  x();
}
function Us(e) {
  const t = e.options, s = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !s ? Hc : Nc;
}
function Vc(e) {
  return e.stepped ? Rr : e.tension || e.cubicInterpolationMode === "monotone" ? Ir : ee;
}
function jc(e, t, s, n) {
  let a = t._path;
  a || (a = t._path = new Path2D(), t.path(a, s, n) && a.closePath()), Ti(e, t.options), e.stroke(a);
}
function Yc(e, t, s, n) {
  const { segments: a, options: i } = t, o = Us(t);
  for (const r of a)
    Ti(e, i, r.style), e.beginPath(), o(e, t, r, {
      start: s,
      end: s + n - 1
    }) && e.closePath(), e.stroke();
}
const Uc = typeof Path2D == "function";
function qc(e, t, s, n) {
  Uc && !t.options.segment ? jc(e, t, s, n) : Yc(e, t, s, n);
}
class vs extends Vt {
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
    const n = this.options;
    if ((n.tension || n.cubicInterpolationMode === "monotone") && !n.stepped && !this._pointsUpdated) {
      const a = n.spanGaps ? this._loop : this._fullLoop;
      Ar(this._points, n, t, a, s), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = jr(this, this.options.segment));
  }
  first() {
    const t = this.segments, s = this.points;
    return t.length && s[t[0].start];
  }
  last() {
    const t = this.segments, s = this.points, n = t.length;
    return n && s[t[n - 1].end];
  }
  interpolate(t, s) {
    const n = this.options, a = t[s], i = this.points, o = bi(this, {
      property: s,
      start: a,
      end: a
    });
    if (!o.length)
      return;
    const r = [], l = Vc(n);
    let c, h;
    for (c = 0, h = o.length; c < h; ++c) {
      const { start: u, end: f } = o[c], g = i[u], p = i[f];
      if (g === p) {
        r.push(g);
        continue;
      }
      const v = Math.abs((a - g[s]) / (p[s] - g[s])), m = l(g, p, v, n.stepped);
      m[s] = t[s], r.push(m);
    }
    return r.length === 1 ? r[0] : r;
  }
  pathSegment(t, s, n) {
    return Us(this)(t, this, s, n);
  }
  path(t, s, n) {
    const a = this.segments, i = Us(this);
    let o = this._loop;
    s = s || 0, n = n || this.points.length - s;
    for (const r of a)
      o &= i(t, this, r, {
        start: s,
        end: s + n - 1
      });
    return !!o;
  }
  draw(t, s, n, a) {
    const i = this.options || {};
    (this.points || []).length && i.borderWidth && (t.save(), qc(t, this, n, a), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function pa(e, t, s, n) {
  const a = e.options, { [s]: i } = e.getProps([
    s
  ], n);
  return Math.abs(t - i) < a.radius + a.hitRadius;
}
class Xc extends Vt {
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
  inRange(t, s, n) {
    const a = this.options, { x: i, y: o } = this.getProps([
      "x",
      "y"
    ], n);
    return Math.pow(t - i, 2) + Math.pow(s - o, 2) < Math.pow(a.hitRadius + a.radius, 2);
  }
  inXRange(t, s) {
    return pa(this, t, "x", s);
  }
  inYRange(t, s) {
    return pa(this, t, "y", s);
  }
  getCenterPoint(t) {
    const { x: s, y: n } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: s,
      y: n
    };
  }
  size(t) {
    t = t || this.options || {};
    let s = t.radius || 0;
    s = Math.max(s, s && t.hoverRadius || 0);
    const n = s && t.borderWidth || 0;
    return (s + n) * 2;
  }
  draw(t, s) {
    const n = this.options;
    this.skip || n.radius < 0.1 || !ze(this, s, this.size(n) / 2) || (t.strokeStyle = n.borderColor, t.lineWidth = n.borderWidth, t.fillStyle = n.backgroundColor, Vs(t, n, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function Bi(e, t) {
  const { x: s, y: n, base: a, width: i, height: o } = e.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let r, l, c, h, u;
  return e.horizontal ? (u = o / 2, r = Math.min(s, a), l = Math.max(s, a), c = n - u, h = n + u) : (u = i / 2, r = s - u, l = s + u, c = Math.min(n, a), h = Math.max(n, a)), {
    left: r,
    top: c,
    right: l,
    bottom: h
  };
}
function Ut(e, t, s, n) {
  return e ? 0 : yt(t, s, n);
}
function Kc(e, t, s) {
  const n = e.options.borderWidth, a = e.borderSkipped, i = oi(n);
  return {
    t: Ut(a.top, i.top, 0, s),
    r: Ut(a.right, i.right, 0, t),
    b: Ut(a.bottom, i.bottom, 0, s),
    l: Ut(a.left, i.left, 0, t)
  };
}
function Gc(e, t, s) {
  const { enableBorderRadius: n } = e.getProps([
    "enableBorderRadius"
  ]), a = e.options.borderRadius, i = fe(a), o = Math.min(t, s), r = e.borderSkipped, l = n || K(a);
  return {
    topLeft: Ut(!l || r.top || r.left, i.topLeft, 0, o),
    topRight: Ut(!l || r.top || r.right, i.topRight, 0, o),
    bottomLeft: Ut(!l || r.bottom || r.left, i.bottomLeft, 0, o),
    bottomRight: Ut(!l || r.bottom || r.right, i.bottomRight, 0, o)
  };
}
function Zc(e) {
  const t = Bi(e), s = t.right - t.left, n = t.bottom - t.top, a = Kc(e, s / 2, n / 2), i = Gc(e, s / 2, n / 2);
  return {
    outer: {
      x: t.left,
      y: t.top,
      w: s,
      h: n,
      radius: i
    },
    inner: {
      x: t.left + a.l,
      y: t.top + a.t,
      w: s - a.l - a.r,
      h: n - a.t - a.b,
      radius: {
        topLeft: Math.max(0, i.topLeft - Math.max(a.t, a.l)),
        topRight: Math.max(0, i.topRight - Math.max(a.t, a.r)),
        bottomLeft: Math.max(0, i.bottomLeft - Math.max(a.b, a.l)),
        bottomRight: Math.max(0, i.bottomRight - Math.max(a.b, a.r))
      }
    }
  };
}
function Ls(e, t, s, n) {
  const a = t === null, i = s === null, r = e && !(a && i) && Bi(e, n);
  return r && (a || Ht(t, r.left, r.right)) && (i || Ht(s, r.top, r.bottom));
}
function Qc(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function Jc(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function Es(e, t, s = {}) {
  const n = e.x !== s.x ? -t : 0, a = e.y !== s.y ? -t : 0, i = (e.x + e.w !== s.x + s.w ? t : 0) - n, o = (e.y + e.h !== s.y + s.h ? t : 0) - a;
  return {
    x: e.x + n,
    y: e.y + a,
    w: e.w + i,
    h: e.h + o,
    radius: e.radius
  };
}
class td extends Vt {
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
    const { inflateAmount: s, options: { borderColor: n, backgroundColor: a } } = this, { inner: i, outer: o } = Zc(this), r = Qc(o.radius) ? ls : Jc;
    t.save(), (o.w !== i.w || o.h !== i.h) && (t.beginPath(), r(t, Es(o, s, i)), t.clip(), r(t, Es(i, -s, o)), t.fillStyle = n, t.fill("evenodd")), t.beginPath(), r(t, Es(i, s)), t.fillStyle = a, t.fill(), t.restore();
  }
  inRange(t, s, n) {
    return Ls(this, t, s, n);
  }
  inXRange(t, s) {
    return Ls(this, t, null, s);
  }
  inYRange(t, s) {
    return Ls(this, null, t, s);
  }
  getCenterPoint(t) {
    const { x: s, y: n, base: a, horizontal: i } = this.getProps([
      "x",
      "y",
      "base",
      "horizontal"
    ], t);
    return {
      x: i ? (s + a) / 2 : s,
      y: i ? n : (n + a) / 2
    };
  }
  getRange(t) {
    return t === "x" ? this.width / 2 : this.height / 2;
  }
}
function ed(e, t, s) {
  const n = e.segments, a = e.points, i = t.points, o = [];
  for (const r of n) {
    let { start: l, end: c } = r;
    c = ys(l, c, a);
    const h = qs(s, a[l], a[c], r.loop);
    if (!t.segments) {
      o.push({
        source: r,
        target: h,
        start: a[l],
        end: a[c]
      });
      continue;
    }
    const u = bi(t, h);
    for (const f of u) {
      const g = qs(s, i[f.start], i[f.end], f.loop), p = pi(r, a, g);
      for (const v of p)
        o.push({
          source: v,
          target: f,
          start: {
            [s]: ba(h, g, "start", Math.max)
          },
          end: {
            [s]: ba(h, g, "end", Math.min)
          }
        });
    }
  }
  return o;
}
function qs(e, t, s, n) {
  if (n)
    return;
  let a = t[e], i = s[e];
  return e === "angle" && (a = $t(a), i = $t(i)), {
    property: e,
    start: a,
    end: i
  };
}
function sd(e, t) {
  const { x: s = null, y: n = null } = e || {}, a = t.points, i = [];
  return t.segments.forEach(({ start: o, end: r }) => {
    r = ys(o, r, a);
    const l = a[o], c = a[r];
    n !== null ? (i.push({
      x: l.x,
      y: n
    }), i.push({
      x: c.x,
      y: n
    })) : s !== null && (i.push({
      x: s,
      y: l.y
    }), i.push({
      x: s,
      y: c.y
    }));
  }), i;
}
function ys(e, t, s) {
  for (; t > e; t--) {
    const n = s[t];
    if (!isNaN(n.x) && !isNaN(n.y))
      break;
  }
  return t;
}
function ba(e, t, s, n) {
  return e && t ? n(e[s], t[s]) : e ? e[s] : t ? t[s] : 0;
}
function Pi(e, t) {
  let s = [], n = !1;
  return ft(e) ? (n = !0, s = e) : s = sd(e, t), s.length ? new vs({
    points: s,
    options: {
      tension: 0
    },
    _loop: n,
    _fullLoop: n
  }) : null;
}
function ma(e) {
  return e && e.fill !== !1;
}
function nd(e, t, s) {
  let a = e[t].fill;
  const i = [
    t
  ];
  let o;
  if (!s)
    return a;
  for (; a !== !1 && i.indexOf(a) === -1; ) {
    if (!kt(a))
      return a;
    if (o = e[a], !o)
      return !1;
    if (o.visible)
      return a;
    i.push(a), a = o.fill;
  }
  return !1;
}
function ad(e, t, s) {
  const n = ld(e);
  if (K(n))
    return isNaN(n.value) ? !1 : n;
  let a = parseFloat(n);
  return kt(a) && Math.floor(a) === a ? id(n[0], t, a, s) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(n) >= 0 && n;
}
function id(e, t, s, n) {
  return (e === "-" || e === "+") && (s = t + s), s === t || s < 0 || s >= n ? !1 : s;
}
function od(e, t) {
  let s = null;
  return e === "start" ? s = t.bottom : e === "end" ? s = t.top : K(e) ? s = t.getPixelForValue(e.value) : t.getBasePixel && (s = t.getBasePixel()), s;
}
function rd(e, t, s) {
  let n;
  return e === "start" ? n = s : e === "end" ? n = t.options.reverse ? t.min : t.max : K(e) ? n = e.value : n = t.getBaseValue(), n;
}
function ld(e) {
  const t = e.options, s = t.fill;
  let n = Y(s && s.target, s);
  return n === void 0 && (n = !!t.backgroundColor), n === !1 || n === null ? !1 : n === !0 ? "origin" : n;
}
function cd(e) {
  const { scale: t, index: s, line: n } = e, a = [], i = n.segments, o = n.points, r = dd(t, s);
  r.push(Pi({
    x: null,
    y: t.bottom
  }, n));
  for (let l = 0; l < i.length; l++) {
    const c = i[l];
    for (let h = c.start; h <= c.end; h++)
      hd(a, o[h], r);
  }
  return new vs({
    points: a,
    options: {}
  });
}
function dd(e, t) {
  const s = [], n = e.getMatchingVisibleMetas("line");
  for (let a = 0; a < n.length; a++) {
    const i = n[a];
    if (i.index === t)
      break;
    i.hidden || s.unshift(i.dataset);
  }
  return s;
}
function hd(e, t, s) {
  const n = [];
  for (let a = 0; a < s.length; a++) {
    const i = s[a], { first: o, last: r, point: l } = ud(i, t, "x");
    if (!(!l || o && r)) {
      if (o)
        n.unshift(l);
      else if (e.push(l), !r)
        break;
    }
  }
  e.push(...n);
}
function ud(e, t, s) {
  const n = e.interpolate(t, s);
  if (!n)
    return {};
  const a = n[s], i = e.segments, o = e.points;
  let r = !1, l = !1;
  for (let c = 0; c < i.length; c++) {
    const h = i[c], u = o[h.start][s], f = o[h.end][s];
    if (Ht(a, u, f)) {
      r = a === u, l = a === f;
      break;
    }
  }
  return {
    first: r,
    last: l,
    point: n
  };
}
class Li {
  constructor(t) {
    this.x = t.x, this.y = t.y, this.radius = t.radius;
  }
  pathSegment(t, s, n) {
    const { x: a, y: i, radius: o } = this;
    return s = s || {
      start: 0,
      end: dt
    }, t.arc(a, i, o, s.end, s.start, !0), !n.bounds;
  }
  interpolate(t) {
    const { x: s, y: n, radius: a } = this, i = t.angle;
    return {
      x: s + Math.cos(i) * a,
      y: n + Math.sin(i) * a,
      angle: i
    };
  }
}
function fd(e) {
  const { chart: t, fill: s, line: n } = e;
  if (kt(s))
    return gd(t, s);
  if (s === "stack")
    return cd(e);
  if (s === "shape")
    return !0;
  const a = pd(e);
  return a instanceof Li ? a : Pi(a, n);
}
function gd(e, t) {
  const s = e.getDatasetMeta(t);
  return s && e.isDatasetVisible(t) ? s.dataset : null;
}
function pd(e) {
  return (e.scale || {}).getPointPositionForValue ? md(e) : bd(e);
}
function bd(e) {
  const { scale: t = {}, fill: s } = e, n = od(s, t);
  if (kt(n)) {
    const a = t.isHorizontal();
    return {
      x: a ? n : null,
      y: a ? null : n
    };
  }
  return null;
}
function md(e) {
  const { scale: t, fill: s } = e, n = t.options, a = t.getLabels().length, i = n.reverse ? t.max : t.min, o = rd(s, t, i), r = [];
  if (n.grid.circular) {
    const l = t.getPointPositionForValue(0, i);
    return new Li({
      x: l.x,
      y: l.y,
      radius: t.getDistanceFromCenterForValue(o)
    });
  }
  for (let l = 0; l < a; ++l)
    r.push(t.getPointPositionForValue(l, o));
  return r;
}
function Os(e, t, s) {
  const n = fd(t), { chart: a, index: i, line: o, scale: r, axis: l } = t, c = o.options, h = c.fill, u = c.backgroundColor, { above: f = u, below: g = u } = h || {}, p = a.getDatasetMeta(i), v = mi(a, p);
  n && o.points.length && (fs(e, s), vd(e, {
    line: o,
    target: n,
    above: f,
    below: g,
    area: s,
    scale: r,
    axis: l,
    clip: v
  }), gs(e));
}
function vd(e, t) {
  const { line: s, target: n, above: a, below: i, area: o, scale: r, clip: l } = t, c = s._loop ? "angle" : t.axis;
  e.save();
  let h = i;
  i !== a && (c === "x" ? (va(e, n, o.top), Rs(e, {
    line: s,
    target: n,
    color: a,
    scale: r,
    property: c,
    clip: l
  }), e.restore(), e.save(), va(e, n, o.bottom)) : c === "y" && (ya(e, n, o.left), Rs(e, {
    line: s,
    target: n,
    color: i,
    scale: r,
    property: c,
    clip: l
  }), e.restore(), e.save(), ya(e, n, o.right), h = a)), Rs(e, {
    line: s,
    target: n,
    color: h,
    scale: r,
    property: c,
    clip: l
  }), e.restore();
}
function va(e, t, s) {
  const { segments: n, points: a } = t;
  let i = !0, o = !1;
  e.beginPath();
  for (const r of n) {
    const { start: l, end: c } = r, h = a[l], u = a[ys(l, c, a)];
    i ? (e.moveTo(h.x, h.y), i = !1) : (e.lineTo(h.x, s), e.lineTo(h.x, h.y)), o = !!t.pathSegment(e, r, {
      move: o
    }), o ? e.closePath() : e.lineTo(u.x, s);
  }
  e.lineTo(t.first().x, s), e.closePath(), e.clip();
}
function ya(e, t, s) {
  const { segments: n, points: a } = t;
  let i = !0, o = !1;
  e.beginPath();
  for (const r of n) {
    const { start: l, end: c } = r, h = a[l], u = a[ys(l, c, a)];
    i ? (e.moveTo(h.x, h.y), i = !1) : (e.lineTo(s, h.y), e.lineTo(h.x, h.y)), o = !!t.pathSegment(e, r, {
      move: o
    }), o ? e.closePath() : e.lineTo(s, u.y);
  }
  e.lineTo(s, t.first().y), e.closePath(), e.clip();
}
function Rs(e, t) {
  const { line: s, target: n, property: a, color: i, scale: o, clip: r } = t, l = ed(s, n, a);
  for (const { source: c, target: h, start: u, end: f } of l) {
    const { style: { backgroundColor: g = i } = {} } = c, p = n !== !0;
    e.save(), e.fillStyle = g, yd(e, o, r, p && qs(a, u, f)), e.beginPath();
    const v = !!s.pathSegment(e, c);
    let m;
    if (p) {
      v ? e.closePath() : _a(e, n, f, a);
      const b = !!n.pathSegment(e, h, {
        move: v,
        reverse: !0
      });
      m = v && b, m || _a(e, n, u, a);
    }
    e.closePath(), e.fill(m ? "evenodd" : "nonzero"), e.restore();
  }
}
function yd(e, t, s, n) {
  const a = t.chart.chartArea, { property: i, start: o, end: r } = n || {};
  if (i === "x" || i === "y") {
    let l, c, h, u;
    i === "x" ? (l = o, c = a.top, h = r, u = a.bottom) : (l = a.left, c = o, h = a.right, u = r), e.beginPath(), s && (l = Math.max(l, s.left), h = Math.min(h, s.right), c = Math.max(c, s.top), u = Math.min(u, s.bottom)), e.rect(l, c, h - l, u - c), e.clip();
  }
}
function _a(e, t, s, n) {
  const a = t.interpolate(s, n);
  a && e.lineTo(a.x, a.y);
}
var _d = {
  id: "filler",
  afterDatasetsUpdate(e, t, s) {
    const n = (e.data.datasets || []).length, a = [];
    let i, o, r, l;
    for (o = 0; o < n; ++o)
      i = e.getDatasetMeta(o), r = i.dataset, l = null, r && r.options && r instanceof vs && (l = {
        visible: e.isDatasetVisible(o),
        index: o,
        fill: ad(r, o, n),
        chart: e,
        axis: i.controller.options.indexAxis,
        scale: i.vScale,
        line: r
      }), i.$filler = l, a.push(l);
    for (o = 0; o < n; ++o)
      l = a[o], !(!l || l.fill === !1) && (l.fill = nd(a, o, s.propagate));
  },
  beforeDraw(e, t, s) {
    const n = s.drawTime === "beforeDraw", a = e.getSortedVisibleDatasetMetas(), i = e.chartArea;
    for (let o = a.length - 1; o >= 0; --o) {
      const r = a[o].$filler;
      r && (r.line.updateControlPoints(i, r.axis), n && r.fill && Os(e.ctx, r, i));
    }
  },
  beforeDatasetsDraw(e, t, s) {
    if (s.drawTime !== "beforeDatasetsDraw")
      return;
    const n = e.getSortedVisibleDatasetMetas();
    for (let a = n.length - 1; a >= 0; --a) {
      const i = n[a].$filler;
      ma(i) && Os(e.ctx, i, e.chartArea);
    }
  },
  beforeDatasetDraw(e, t, s) {
    const n = t.meta.$filler;
    !ma(n) || s.drawTime !== "beforeDatasetDraw" || Os(e.ctx, n, e.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const xa = (e, t) => {
  let { boxHeight: s = t, boxWidth: n = t } = e;
  return e.usePointStyle && (s = Math.min(s, t), n = e.pointStyleWidth || Math.min(n, t)), {
    boxWidth: n,
    boxHeight: s,
    itemHeight: Math.max(t, s)
  };
}, xd = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class ka extends Vt {
  constructor(t) {
    super(), this._added = !1, this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1, this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this.legendItems = void 0, this.columnSizes = void 0, this.lineWidths = void 0, this.maxHeight = void 0, this.maxWidth = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.height = void 0, this.width = void 0, this._margins = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, s, n) {
    this.maxWidth = t, this.maxHeight = s, this._margins = n, this.setDimensions(), this.buildLabels(), this.fit();
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, this.bottom = this.height);
  }
  buildLabels() {
    const t = this.options.labels || {};
    let s = lt(t.generateLabels, [
      this.chart
    ], this) || [];
    t.filter && (s = s.filter((n) => t.filter(n, this.chart.data))), t.sort && (s = s.sort((n, a) => t.sort(n, a, this.chart.data))), this.options.reverse && s.reverse(), this.legendItems = s;
  }
  fit() {
    const { options: t, ctx: s } = this;
    if (!t.display) {
      this.width = this.height = 0;
      return;
    }
    const n = t.labels, a = _t(n.font), i = a.size, o = this._computeTitleHeight(), { boxWidth: r, itemHeight: l } = xa(n, i);
    let c, h;
    s.font = a.string, this.isHorizontal() ? (c = this.maxWidth, h = this._fitRows(o, i, r, l) + 10) : (h = this.maxHeight, c = this._fitCols(o, a, r, l) + 10), this.width = Math.min(c, t.maxWidth || this.maxWidth), this.height = Math.min(h, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, s, n, a) {
    const { ctx: i, maxWidth: o, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], c = this.lineWidths = [
      0
    ], h = a + r;
    let u = t;
    i.textAlign = "left", i.textBaseline = "middle";
    let f = -1, g = -h;
    return this.legendItems.forEach((p, v) => {
      const m = n + s / 2 + i.measureText(p.text).width;
      (v === 0 || c[c.length - 1] + m + 2 * r > o) && (u += h, c[c.length - (v > 0 ? 0 : 1)] = 0, g += h, f++), l[v] = {
        left: 0,
        top: g,
        row: f,
        width: m,
        height: a
      }, c[c.length - 1] += m + r;
    }), u;
  }
  _fitCols(t, s, n, a) {
    const { ctx: i, maxHeight: o, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], c = this.columnSizes = [], h = o - t;
    let u = r, f = 0, g = 0, p = 0, v = 0;
    return this.legendItems.forEach((m, b) => {
      const { itemWidth: y, itemHeight: x } = kd(n, s, i, m, a);
      b > 0 && g + x + 2 * r > h && (u += f + r, c.push({
        width: f,
        height: g
      }), p += f + r, v++, f = g = 0), l[b] = {
        left: p,
        top: g,
        col: v,
        width: y,
        height: x
      }, f = Math.max(f, y), g += x + r;
    }), u += f, c.push({
      width: f,
      height: g
    }), u;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: s, options: { align: n, labels: { padding: a }, rtl: i } } = this, o = ge(i, this.left, this.width);
    if (this.isHorizontal()) {
      let r = 0, l = vt(n, this.left + a, this.right - this.lineWidths[r]);
      for (const c of s)
        r !== c.row && (r = c.row, l = vt(n, this.left + a, this.right - this.lineWidths[r])), c.top += this.top + t + a, c.left = o.leftForLtr(o.x(l), c.width), l += c.width + a;
    } else {
      let r = 0, l = vt(n, this.top + t + a, this.bottom - this.columnSizes[r].height);
      for (const c of s)
        c.col !== r && (r = c.col, l = vt(n, this.top + t + a, this.bottom - this.columnSizes[r].height)), c.top = l, c.left += this.left + a, c.left = o.leftForLtr(o.x(c.left), c.width), l += c.height + a;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      fs(t, this), this._draw(), gs(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: s, lineWidths: n, ctx: a } = this, { align: i, labels: o } = t, r = ut.color, l = ge(t.rtl, this.left, this.width), c = _t(o.font), { padding: h } = o, u = c.size, f = u / 2;
    let g;
    this.drawTitle(), a.textAlign = l.textAlign("left"), a.textBaseline = "middle", a.lineWidth = 0.5, a.font = c.string;
    const { boxWidth: p, boxHeight: v, itemHeight: m } = xa(o, u), b = function(C, $, A) {
      if (isNaN(p) || p <= 0 || isNaN(v) || v < 0)
        return;
      a.save();
      const L = Y(A.lineWidth, 1);
      if (a.fillStyle = Y(A.fillStyle, r), a.lineCap = Y(A.lineCap, "butt"), a.lineDashOffset = Y(A.lineDashOffset, 0), a.lineJoin = Y(A.lineJoin, "miter"), a.lineWidth = L, a.strokeStyle = Y(A.strokeStyle, r), a.setLineDash(Y(A.lineDash, [])), o.usePointStyle) {
        const D = {
          radius: v * Math.SQRT2 / 2,
          pointStyle: A.pointStyle,
          rotation: A.rotation,
          borderWidth: L
        }, F = l.xPlus(C, p / 2), P = $ + f;
        ii(a, D, F, P, o.pointStyleWidth && p);
      } else {
        const D = $ + Math.max((u - v) / 2, 0), F = l.leftForLtr(C, p), P = fe(A.borderRadius);
        a.beginPath(), Object.values(P).some((R) => R !== 0) ? ls(a, {
          x: F,
          y: D,
          w: p,
          h: v,
          radius: P
        }) : a.rect(F, D, p, v), a.fill(), L !== 0 && a.stroke();
      }
      a.restore();
    }, y = function(C, $, A) {
      We(a, A.text, C, $ + m / 2, c, {
        strikethrough: A.hidden,
        textAlign: l.textAlign(A.textAlign)
      });
    }, x = this.isHorizontal(), M = this._computeTitleHeight();
    x ? g = {
      x: vt(i, this.left + h, this.right - n[0]),
      y: this.top + h + M,
      line: 0
    } : g = {
      x: this.left + h,
      y: vt(i, this.top + M + h, this.bottom - s[0].height),
      line: 0
    }, ui(this.ctx, t.textDirection);
    const w = m + h;
    this.legendItems.forEach((C, $) => {
      a.strokeStyle = C.fontColor, a.fillStyle = C.fontColor;
      const A = a.measureText(C.text).width, L = l.textAlign(C.textAlign || (C.textAlign = o.textAlign)), D = p + f + A;
      let F = g.x, P = g.y;
      l.setWidth(this.width), x ? $ > 0 && F + D + h > this.right && (P = g.y += w, g.line++, F = g.x = vt(i, this.left + h, this.right - n[g.line])) : $ > 0 && P + w > this.bottom && (F = g.x = F + s[g.line].width + h, g.line++, P = g.y = vt(i, this.top + M + h, this.bottom - s[g.line].height));
      const R = l.x(F);
      if (b(R, P, C), F = Yo(L, F + p + f, x ? F + D : this.right, t.rtl), y(l.x(F), P, C), x)
        g.x += D + h;
      else if (typeof C.text != "string") {
        const E = c.lineHeight;
        g.y += Ei(C, E) + h;
      } else
        g.y += w;
    }), fi(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, s = t.title, n = _t(s.font), a = Bt(s.padding);
    if (!s.display)
      return;
    const i = ge(t.rtl, this.left, this.width), o = this.ctx, r = s.position, l = n.size / 2, c = a.top + l;
    let h, u = this.left, f = this.width;
    if (this.isHorizontal())
      f = Math.max(...this.lineWidths), h = this.top + c, u = vt(t.align, u, this.right - f);
    else {
      const p = this.columnSizes.reduce((v, m) => Math.max(v, m.height), 0);
      h = c + vt(t.align, this.top, this.bottom - p - t.labels.padding - this._computeTitleHeight());
    }
    const g = vt(r, u, u + f);
    o.textAlign = i.textAlign(Js(r)), o.textBaseline = "middle", o.strokeStyle = s.color, o.fillStyle = s.color, o.font = n.string, We(o, s.text, g, h, n);
  }
  _computeTitleHeight() {
    const t = this.options.title, s = _t(t.font), n = Bt(t.padding);
    return t.display ? s.lineHeight + n.height : 0;
  }
  _getLegendItemAt(t, s) {
    let n, a, i;
    if (Ht(t, this.left, this.right) && Ht(s, this.top, this.bottom)) {
      for (i = this.legendHitBoxes, n = 0; n < i.length; ++n)
        if (a = i[n], Ht(t, a.left, a.left + a.width) && Ht(s, a.top, a.top + a.height))
          return this.legendItems[n];
    }
    return null;
  }
  handleEvent(t) {
    const s = this.options;
    if (!wd(t.type, s))
      return;
    const n = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const a = this._hoveredItem, i = xd(a, n);
      a && !i && lt(s.onLeave, [
        t,
        a,
        this
      ], this), this._hoveredItem = n, n && !i && lt(s.onHover, [
        t,
        n,
        this
      ], this);
    } else n && lt(s.onClick, [
      t,
      n,
      this
    ], this);
  }
}
function kd(e, t, s, n, a) {
  const i = Md(n, e, t, s), o = Sd(a, n, t.lineHeight);
  return {
    itemWidth: i,
    itemHeight: o
  };
}
function Md(e, t, s, n) {
  let a = e.text;
  return a && typeof a != "string" && (a = a.reduce((i, o) => i.length > o.length ? i : o)), t + s.size / 2 + n.measureText(a).width;
}
function Sd(e, t, s) {
  let n = e;
  return typeof t.text != "string" && (n = Ei(t, s)), n;
}
function Ei(e, t) {
  const s = e.text ? e.text.length : 0;
  return t * s;
}
function wd(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var dn = {
  id: "legend",
  _element: ka,
  start(e, t, s) {
    const n = e.legend = new ka({
      ctx: e.ctx,
      options: s,
      chart: e
    });
    Ft.configure(e, n, s), Ft.addBox(e, n);
  },
  stop(e) {
    Ft.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, s) {
    const n = e.legend;
    Ft.configure(e, n, s), n.options = s;
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
      const n = t.datasetIndex, a = s.chart;
      a.isDatasetVisible(n) ? (a.hide(n), t.hidden = !0) : (a.show(n), t.hidden = !1);
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (e) => e.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(e) {
        const t = e.data.datasets, { labels: { usePointStyle: s, pointStyle: n, textAlign: a, color: i, useBorderRadius: o, borderRadius: r } } = e.legend.options;
        return e._getSortedDatasetMetas().map((l) => {
          const c = l.controller.getStyle(s ? 0 : void 0), h = Bt(c.borderWidth);
          return {
            text: t[l.index].label,
            fillStyle: c.backgroundColor,
            fontColor: i,
            hidden: !l.visible,
            lineCap: c.borderCapStyle,
            lineDash: c.borderDash,
            lineDashOffset: c.borderDashOffset,
            lineJoin: c.borderJoinStyle,
            lineWidth: (h.width + h.height) / 4,
            strokeStyle: c.borderColor,
            pointStyle: n || c.pointStyle,
            rotation: c.rotation,
            textAlign: a || c.textAlign,
            borderRadius: o && (r || c.borderRadius),
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
class Oi extends Vt {
  constructor(t) {
    super(), this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this._padding = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, s) {
    const n = this.options;
    if (this.left = 0, this.top = 0, !n.display) {
      this.width = this.height = this.right = this.bottom = 0;
      return;
    }
    this.width = this.right = t, this.height = this.bottom = s;
    const a = ft(n.text) ? n.text.length : 1;
    this._padding = Bt(n.padding);
    const i = a * _t(n.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = i : this.width = i;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: s, left: n, bottom: a, right: i, options: o } = this, r = o.align;
    let l = 0, c, h, u;
    return this.isHorizontal() ? (h = vt(r, n, i), u = s + t, c = i - n) : (o.position === "left" ? (h = n + t, u = vt(r, a, s), l = at * -0.5) : (h = i - t, u = vt(r, s, a), l = at * 0.5), c = a - s), {
      titleX: h,
      titleY: u,
      maxWidth: c,
      rotation: l
    };
  }
  draw() {
    const t = this.ctx, s = this.options;
    if (!s.display)
      return;
    const n = _t(s.font), i = n.lineHeight / 2 + this._padding.top, { titleX: o, titleY: r, maxWidth: l, rotation: c } = this._drawArgs(i);
    We(t, s.text, 0, 0, n, {
      color: s.color,
      maxWidth: l,
      rotation: c,
      textAlign: Js(s.align),
      textBaseline: "middle",
      translation: [
        o,
        r
      ]
    });
  }
}
function Cd(e, t) {
  const s = new Oi({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  Ft.configure(e, s, t), Ft.addBox(e, s), e.titleBlock = s;
}
var Ri = {
  id: "title",
  _element: Oi,
  start(e, t, s) {
    Cd(e, s);
  },
  stop(e) {
    const t = e.titleBlock;
    Ft.removeBox(e, t), delete e.titleBlock;
  },
  beforeUpdate(e, t, s) {
    const n = e.titleBlock;
    Ft.configure(e, n, s), n.options = s;
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
const Ae = {
  average(e) {
    if (!e.length)
      return !1;
    let t, s, n = /* @__PURE__ */ new Set(), a = 0, i = 0;
    for (t = 0, s = e.length; t < s; ++t) {
      const r = e[t].element;
      if (r && r.hasValue()) {
        const l = r.tooltipPosition();
        n.add(l.x), a += l.y, ++i;
      }
    }
    return i === 0 || n.size === 0 ? !1 : {
      x: [
        ...n
      ].reduce((r, l) => r + l) / n.size,
      y: a / i
    };
  },
  nearest(e, t) {
    if (!e.length)
      return !1;
    let s = t.x, n = t.y, a = Number.POSITIVE_INFINITY, i, o, r;
    for (i = 0, o = e.length; i < o; ++i) {
      const l = e[i].element;
      if (l && l.hasValue()) {
        const c = l.getCenterPoint(), h = Ns(t, c);
        h < a && (a = h, r = l);
      }
    }
    if (r) {
      const l = r.tooltipPosition();
      s = l.x, n = l.y;
    }
    return {
      x: s,
      y: n
    };
  }
};
function Lt(e, t) {
  return t && (ft(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function zt(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function $d(e, t) {
  const { element: s, datasetIndex: n, index: a } = t, i = e.getDatasetMeta(n).controller, { label: o, value: r } = i.getLabelAndValue(a);
  return {
    chart: e,
    label: o,
    parsed: i.getParsed(a),
    raw: e.data.datasets[n].data[a],
    formattedValue: r,
    dataset: i.getDataset(),
    dataIndex: a,
    datasetIndex: n,
    element: s
  };
}
function Ma(e, t) {
  const s = e.chart.ctx, { body: n, footer: a, title: i } = e, { boxWidth: o, boxHeight: r } = t, l = _t(t.bodyFont), c = _t(t.titleFont), h = _t(t.footerFont), u = i.length, f = a.length, g = n.length, p = Bt(t.padding);
  let v = p.height, m = 0, b = n.reduce((M, w) => M + w.before.length + w.lines.length + w.after.length, 0);
  if (b += e.beforeBody.length + e.afterBody.length, u && (v += u * c.lineHeight + (u - 1) * t.titleSpacing + t.titleMarginBottom), b) {
    const M = t.displayColors ? Math.max(r, l.lineHeight) : l.lineHeight;
    v += g * M + (b - g) * l.lineHeight + (b - 1) * t.bodySpacing;
  }
  f && (v += t.footerMarginTop + f * h.lineHeight + (f - 1) * t.footerSpacing);
  let y = 0;
  const x = function(M) {
    m = Math.max(m, s.measureText(M).width + y);
  };
  return s.save(), s.font = c.string, nt(e.title, x), s.font = l.string, nt(e.beforeBody.concat(e.afterBody), x), y = t.displayColors ? o + 2 + t.boxPadding : 0, nt(n, (M) => {
    nt(M.before, x), nt(M.lines, x), nt(M.after, x);
  }), y = 0, s.font = h.string, nt(e.footer, x), s.restore(), m += p.width, {
    width: m,
    height: v
  };
}
function Dd(e, t) {
  const { y: s, height: n } = t;
  return s < n / 2 ? "top" : s > e.height - n / 2 ? "bottom" : "center";
}
function Ad(e, t, s, n) {
  const { x: a, width: i } = n, o = s.caretSize + s.caretPadding;
  if (e === "left" && a + i + o > t.width || e === "right" && a - i - o < 0)
    return !0;
}
function Td(e, t, s, n) {
  const { x: a, width: i } = s, { width: o, chartArea: { left: r, right: l } } = e;
  let c = "center";
  return n === "center" ? c = a <= (r + l) / 2 ? "left" : "right" : a <= i / 2 ? c = "left" : a >= o - i / 2 && (c = "right"), Ad(c, e, t, s) && (c = "center"), c;
}
function Sa(e, t, s) {
  const n = s.yAlign || t.yAlign || Dd(e, s);
  return {
    xAlign: s.xAlign || t.xAlign || Td(e, t, s, n),
    yAlign: n
  };
}
function Fd(e, t) {
  let { x: s, width: n } = e;
  return t === "right" ? s -= n : t === "center" && (s -= n / 2), s;
}
function Bd(e, t, s) {
  let { y: n, height: a } = e;
  return t === "top" ? n += s : t === "bottom" ? n -= a + s : n -= a / 2, n;
}
function wa(e, t, s, n) {
  const { caretSize: a, caretPadding: i, cornerRadius: o } = e, { xAlign: r, yAlign: l } = s, c = a + i, { topLeft: h, topRight: u, bottomLeft: f, bottomRight: g } = fe(o);
  let p = Fd(t, r);
  const v = Bd(t, l, c);
  return l === "center" ? r === "left" ? p += c : r === "right" && (p -= c) : r === "left" ? p -= Math.max(h, f) + a : r === "right" && (p += Math.max(u, g) + a), {
    x: yt(p, 0, n.width - t.width),
    y: yt(v, 0, n.height - t.height)
  };
}
function ts(e, t, s) {
  const n = Bt(s.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - n.right : e.x + n.left;
}
function Ca(e) {
  return Lt([], zt(e));
}
function Pd(e, t, s) {
  return oe(e, {
    tooltip: t,
    tooltipItems: s,
    type: "tooltip"
  });
}
function $a(e, t) {
  const s = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return s ? e.override(s) : e;
}
const Ii = {
  beforeTitle: Rt,
  title(e) {
    if (e.length > 0) {
      const t = e[0], s = t.chart.data.labels, n = s ? s.length : 0;
      if (this && this.options && this.options.mode === "dataset")
        return t.dataset.label || "";
      if (t.label)
        return t.label;
      if (n > 0 && t.dataIndex < n)
        return s[t.dataIndex];
    }
    return "";
  },
  afterTitle: Rt,
  beforeBody: Rt,
  beforeLabel: Rt,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const s = e.formattedValue;
    return et(s) || (t += s), t;
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
  afterLabel: Rt,
  afterBody: Rt,
  beforeFooter: Rt,
  footer: Rt,
  afterFooter: Rt
};
function Mt(e, t, s, n) {
  const a = e[t].call(s, n);
  return typeof a > "u" ? Ii[t].call(s, n) : a;
}
class Da extends Vt {
  static positioners = Ae;
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
    const s = this.chart, n = this.options.setContext(this.getContext()), a = n.enabled && s.options.animation && n.animations, i = new vi(this.chart, a);
    return a._cacheable && (this._cachedAnimations = Object.freeze(i)), i;
  }
  getContext() {
    return this.$context || (this.$context = Pd(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, s) {
    const { callbacks: n } = s, a = Mt(n, "beforeTitle", this, t), i = Mt(n, "title", this, t), o = Mt(n, "afterTitle", this, t);
    let r = [];
    return r = Lt(r, zt(a)), r = Lt(r, zt(i)), r = Lt(r, zt(o)), r;
  }
  getBeforeBody(t, s) {
    return Ca(Mt(s.callbacks, "beforeBody", this, t));
  }
  getBody(t, s) {
    const { callbacks: n } = s, a = [];
    return nt(t, (i) => {
      const o = {
        before: [],
        lines: [],
        after: []
      }, r = $a(n, i);
      Lt(o.before, zt(Mt(r, "beforeLabel", this, i))), Lt(o.lines, Mt(r, "label", this, i)), Lt(o.after, zt(Mt(r, "afterLabel", this, i))), a.push(o);
    }), a;
  }
  getAfterBody(t, s) {
    return Ca(Mt(s.callbacks, "afterBody", this, t));
  }
  getFooter(t, s) {
    const { callbacks: n } = s, a = Mt(n, "beforeFooter", this, t), i = Mt(n, "footer", this, t), o = Mt(n, "afterFooter", this, t);
    let r = [];
    return r = Lt(r, zt(a)), r = Lt(r, zt(i)), r = Lt(r, zt(o)), r;
  }
  _createItems(t) {
    const s = this._active, n = this.chart.data, a = [], i = [], o = [];
    let r = [], l, c;
    for (l = 0, c = s.length; l < c; ++l)
      r.push($d(this.chart, s[l]));
    return t.filter && (r = r.filter((h, u, f) => t.filter(h, u, f, n))), t.itemSort && (r = r.sort((h, u) => t.itemSort(h, u, n))), nt(r, (h) => {
      const u = $a(t.callbacks, h);
      a.push(Mt(u, "labelColor", this, h)), i.push(Mt(u, "labelPointStyle", this, h)), o.push(Mt(u, "labelTextColor", this, h));
    }), this.labelColors = a, this.labelPointStyles = i, this.labelTextColors = o, this.dataPoints = r, r;
  }
  update(t, s) {
    const n = this.options.setContext(this.getContext()), a = this._active;
    let i, o = [];
    if (!a.length)
      this.opacity !== 0 && (i = {
        opacity: 0
      });
    else {
      const r = Ae[n.position].call(this, a, this._eventPosition);
      o = this._createItems(n), this.title = this.getTitle(o, n), this.beforeBody = this.getBeforeBody(o, n), this.body = this.getBody(o, n), this.afterBody = this.getAfterBody(o, n), this.footer = this.getFooter(o, n);
      const l = this._size = Ma(this, n), c = Object.assign({}, r, l), h = Sa(this.chart, n, c), u = wa(n, c, h, this.chart);
      this.xAlign = h.xAlign, this.yAlign = h.yAlign, i = {
        opacity: 1,
        x: u.x,
        y: u.y,
        width: l.width,
        height: l.height,
        caretX: r.x,
        caretY: r.y
      };
    }
    this._tooltipItems = o, this.$context = void 0, i && this._resolveAnimations().update(this, i), t && n.external && n.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: s
    });
  }
  drawCaret(t, s, n, a) {
    const i = this.getCaretPosition(t, n, a);
    s.lineTo(i.x1, i.y1), s.lineTo(i.x2, i.y2), s.lineTo(i.x3, i.y3);
  }
  getCaretPosition(t, s, n) {
    const { xAlign: a, yAlign: i } = this, { caretSize: o, cornerRadius: r } = n, { topLeft: l, topRight: c, bottomLeft: h, bottomRight: u } = fe(r), { x: f, y: g } = t, { width: p, height: v } = s;
    let m, b, y, x, M, w;
    return i === "center" ? (M = g + v / 2, a === "left" ? (m = f, b = m - o, x = M + o, w = M - o) : (m = f + p, b = m + o, x = M - o, w = M + o), y = m) : (a === "left" ? b = f + Math.max(l, h) + o : a === "right" ? b = f + p - Math.max(c, u) - o : b = this.caretX, i === "top" ? (x = g, M = x - o, m = b - o, y = b + o) : (x = g + v, M = x + o, m = b + o, y = b - o), w = x), {
      x1: m,
      x2: b,
      x3: y,
      y1: x,
      y2: M,
      y3: w
    };
  }
  drawTitle(t, s, n) {
    const a = this.title, i = a.length;
    let o, r, l;
    if (i) {
      const c = ge(n.rtl, this.x, this.width);
      for (t.x = ts(this, n.titleAlign, n), s.textAlign = c.textAlign(n.titleAlign), s.textBaseline = "middle", o = _t(n.titleFont), r = n.titleSpacing, s.fillStyle = n.titleColor, s.font = o.string, l = 0; l < i; ++l)
        s.fillText(a[l], c.x(t.x), t.y + o.lineHeight / 2), t.y += o.lineHeight + r, l + 1 === i && (t.y += n.titleMarginBottom - r);
    }
  }
  _drawColorBox(t, s, n, a, i) {
    const o = this.labelColors[n], r = this.labelPointStyles[n], { boxHeight: l, boxWidth: c } = i, h = _t(i.bodyFont), u = ts(this, "left", i), f = a.x(u), g = l < h.lineHeight ? (h.lineHeight - l) / 2 : 0, p = s.y + g;
    if (i.usePointStyle) {
      const v = {
        radius: Math.min(c, l) / 2,
        pointStyle: r.pointStyle,
        rotation: r.rotation,
        borderWidth: 1
      }, m = a.leftForLtr(f, c) + c / 2, b = p + l / 2;
      t.strokeStyle = i.multiKeyBackground, t.fillStyle = i.multiKeyBackground, Vs(t, v, m, b), t.strokeStyle = o.borderColor, t.fillStyle = o.backgroundColor, Vs(t, v, m, b);
    } else {
      t.lineWidth = K(o.borderWidth) ? Math.max(...Object.values(o.borderWidth)) : o.borderWidth || 1, t.strokeStyle = o.borderColor, t.setLineDash(o.borderDash || []), t.lineDashOffset = o.borderDashOffset || 0;
      const v = a.leftForLtr(f, c), m = a.leftForLtr(a.xPlus(f, 1), c - 2), b = fe(o.borderRadius);
      Object.values(b).some((y) => y !== 0) ? (t.beginPath(), t.fillStyle = i.multiKeyBackground, ls(t, {
        x: v,
        y: p,
        w: c,
        h: l,
        radius: b
      }), t.fill(), t.stroke(), t.fillStyle = o.backgroundColor, t.beginPath(), ls(t, {
        x: m,
        y: p + 1,
        w: c - 2,
        h: l - 2,
        radius: b
      }), t.fill()) : (t.fillStyle = i.multiKeyBackground, t.fillRect(v, p, c, l), t.strokeRect(v, p, c, l), t.fillStyle = o.backgroundColor, t.fillRect(m, p + 1, c - 2, l - 2));
    }
    t.fillStyle = this.labelTextColors[n];
  }
  drawBody(t, s, n) {
    const { body: a } = this, { bodySpacing: i, bodyAlign: o, displayColors: r, boxHeight: l, boxWidth: c, boxPadding: h } = n, u = _t(n.bodyFont);
    let f = u.lineHeight, g = 0;
    const p = ge(n.rtl, this.x, this.width), v = function(A) {
      s.fillText(A, p.x(t.x + g), t.y + f / 2), t.y += f + i;
    }, m = p.textAlign(o);
    let b, y, x, M, w, C, $;
    for (s.textAlign = o, s.textBaseline = "middle", s.font = u.string, t.x = ts(this, m, n), s.fillStyle = n.bodyColor, nt(this.beforeBody, v), g = r && m !== "right" ? o === "center" ? c / 2 + h : c + 2 + h : 0, M = 0, C = a.length; M < C; ++M) {
      for (b = a[M], y = this.labelTextColors[M], s.fillStyle = y, nt(b.before, v), x = b.lines, r && x.length && (this._drawColorBox(s, t, M, p, n), f = Math.max(u.lineHeight, l)), w = 0, $ = x.length; w < $; ++w)
        v(x[w]), f = u.lineHeight;
      nt(b.after, v);
    }
    g = 0, f = u.lineHeight, nt(this.afterBody, v), t.y -= i;
  }
  drawFooter(t, s, n) {
    const a = this.footer, i = a.length;
    let o, r;
    if (i) {
      const l = ge(n.rtl, this.x, this.width);
      for (t.x = ts(this, n.footerAlign, n), t.y += n.footerMarginTop, s.textAlign = l.textAlign(n.footerAlign), s.textBaseline = "middle", o = _t(n.footerFont), s.fillStyle = n.footerColor, s.font = o.string, r = 0; r < i; ++r)
        s.fillText(a[r], l.x(t.x), t.y + o.lineHeight / 2), t.y += o.lineHeight + n.footerSpacing;
    }
  }
  drawBackground(t, s, n, a) {
    const { xAlign: i, yAlign: o } = this, { x: r, y: l } = t, { width: c, height: h } = n, { topLeft: u, topRight: f, bottomLeft: g, bottomRight: p } = fe(a.cornerRadius);
    s.fillStyle = a.backgroundColor, s.strokeStyle = a.borderColor, s.lineWidth = a.borderWidth, s.beginPath(), s.moveTo(r + u, l), o === "top" && this.drawCaret(t, s, n, a), s.lineTo(r + c - f, l), s.quadraticCurveTo(r + c, l, r + c, l + f), o === "center" && i === "right" && this.drawCaret(t, s, n, a), s.lineTo(r + c, l + h - p), s.quadraticCurveTo(r + c, l + h, r + c - p, l + h), o === "bottom" && this.drawCaret(t, s, n, a), s.lineTo(r + g, l + h), s.quadraticCurveTo(r, l + h, r, l + h - g), o === "center" && i === "left" && this.drawCaret(t, s, n, a), s.lineTo(r, l + u), s.quadraticCurveTo(r, l, r + u, l), s.closePath(), s.fill(), a.borderWidth > 0 && s.stroke();
  }
  _updateAnimationTarget(t) {
    const s = this.chart, n = this.$animations, a = n && n.x, i = n && n.y;
    if (a || i) {
      const o = Ae[t.position].call(this, this._active, this._eventPosition);
      if (!o)
        return;
      const r = this._size = Ma(this, t), l = Object.assign({}, o, this._size), c = Sa(s, t, l), h = wa(t, l, c, s);
      (a._to !== h.x || i._to !== h.y) && (this.xAlign = c.xAlign, this.yAlign = c.yAlign, this.width = r.width, this.height = r.height, this.caretX = o.x, this.caretY = o.y, this._resolveAnimations().update(this, h));
    }
  }
  _willRender() {
    return !!this.opacity;
  }
  draw(t) {
    const s = this.options.setContext(this.getContext());
    let n = this.opacity;
    if (!n)
      return;
    this._updateAnimationTarget(s);
    const a = {
      width: this.width,
      height: this.height
    }, i = {
      x: this.x,
      y: this.y
    };
    n = Math.abs(n) < 1e-3 ? 0 : n;
    const o = Bt(s.padding), r = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    s.enabled && r && (t.save(), t.globalAlpha = n, this.drawBackground(i, t, a, s), ui(t, s.textDirection), i.y += o.top, this.drawTitle(i, t, s), this.drawBody(i, t, s), this.drawFooter(i, t, s), fi(t, s.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, s) {
    const n = this._active, a = t.map(({ datasetIndex: r, index: l }) => {
      const c = this.chart.getDatasetMeta(r);
      if (!c)
        throw new Error("Cannot find a dataset at index " + r);
      return {
        datasetIndex: r,
        element: c.data[l],
        index: l
      };
    }), i = !is(n, a), o = this._positionChanged(a, s);
    (i || o) && (this._active = a, this._eventPosition = s, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, s, n = !0) {
    if (s && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const a = this.options, i = this._active || [], o = this._getActiveElements(t, i, s, n), r = this._positionChanged(o, t), l = s || !is(o, i) || r;
    return l && (this._active = o, (a.enabled || a.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, s))), l;
  }
  _getActiveElements(t, s, n, a) {
    const i = this.options;
    if (t.type === "mouseout")
      return [];
    if (!a)
      return s.filter((r) => this.chart.data.datasets[r.datasetIndex] && this.chart.getDatasetMeta(r.datasetIndex).controller.getParsed(r.index) !== void 0);
    const o = this.chart.getElementsAtEventForMode(t, i.mode, i, n);
    return i.reverse && o.reverse(), o;
  }
  _positionChanged(t, s) {
    const { caretX: n, caretY: a, options: i } = this, o = Ae[i.position].call(this, t, s);
    return o !== !1 && (n !== o.x || a !== o.y);
  }
}
var hn = {
  id: "tooltip",
  _element: Da,
  positioners: Ae,
  afterInit(e, t, s) {
    s && (e.tooltip = new Da({
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
    callbacks: Ii
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
const Ld = (e, t, s, n) => (typeof t == "string" ? (s = e.push(t) - 1, n.unshift({
  index: s,
  label: t
})) : isNaN(t) && (s = null), s);
function Ed(e, t, s, n) {
  const a = e.indexOf(t);
  if (a === -1)
    return Ld(e, t, s, n);
  const i = e.lastIndexOf(t);
  return a !== i ? s : a;
}
const Od = (e, t) => e === null ? null : yt(Math.round(e), 0, t);
function Aa(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class zi extends ve {
  static id = "category";
  static defaults = {
    ticks: {
      callback: Aa
    }
  };
  constructor(t) {
    super(t), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(t) {
    const s = this._addedLabels;
    if (s.length) {
      const n = this.getLabels();
      for (const { index: a, label: i } of s)
        n[a] === i && n.splice(a, 1);
      this._addedLabels = [];
    }
    super.init(t);
  }
  parse(t, s) {
    if (et(t))
      return null;
    const n = this.getLabels();
    return s = isFinite(s) && n[s] === t ? s : Ed(n, t, Y(s, t), this._addedLabels), Od(s, n.length - 1);
  }
  determineDataLimits() {
    const { minDefined: t, maxDefined: s } = this.getUserBounds();
    let { min: n, max: a } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (t || (n = 0), s || (a = this.getLabels().length - 1)), this.min = n, this.max = a;
  }
  buildTicks() {
    const t = this.min, s = this.max, n = this.options.offset, a = [];
    let i = this.getLabels();
    i = t === 0 && s === i.length - 1 ? i : i.slice(t, s + 1), this._valueRange = Math.max(i.length - (n ? 0 : 1), 1), this._startValue = this.min - (n ? 0.5 : 0);
    for (let o = t; o <= s; o++)
      a.push({
        value: o
      });
    return a;
  }
  getLabelForValue(t) {
    return Aa.call(this, t);
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
function Rd(e, t) {
  const s = [], { bounds: a, step: i, min: o, max: r, precision: l, count: c, maxTicks: h, maxDigits: u, includeBounds: f } = e, g = i || 1, p = h - 1, { min: v, max: m } = t, b = !et(o), y = !et(r), x = !et(c), M = (m - v) / (u + 1);
  let w = wn((m - v) / p / g) * g, C, $, A, L;
  if (w < 1e-14 && !b && !y)
    return [
      {
        value: v
      },
      {
        value: m
      }
    ];
  L = Math.ceil(m / w) - Math.floor(v / w), L > p && (w = wn(L * w / p / g) * g), et(l) || (C = Math.pow(10, l), w = Math.ceil(w * C) / C), a === "ticks" ? ($ = Math.floor(v / w) * w, A = Math.ceil(m / w) * w) : ($ = v, A = m), b && y && i && Oo((r - o) / i, w / 1e3) ? (L = Math.round(Math.min((r - o) / w, h)), w = (r - o) / L, $ = o, A = r) : x ? ($ = b ? o : $, A = y ? r : A, L = c - 1, w = (A - $) / L) : (L = (A - $) / w, Fe(L, Math.round(L), w / 1e3) ? L = Math.round(L) : L = Math.ceil(L));
  const D = Math.max(Cn(w), Cn($));
  C = Math.pow(10, et(l) ? D : l), $ = Math.round($ * C) / C, A = Math.round(A * C) / C;
  let F = 0;
  for (b && (f && $ !== o ? (s.push({
    value: o
  }), $ < o && F++, Fe(Math.round(($ + F * w) * C) / C, o, Ta(o, M, e)) && F++) : $ < o && F++); F < L; ++F) {
    const P = Math.round(($ + F * w) * C) / C;
    if (y && P > r)
      break;
    s.push({
      value: P
    });
  }
  return y && f && A !== r ? s.length && Fe(s[s.length - 1].value, r, Ta(r, M, e)) ? s[s.length - 1].value = r : s.push({
    value: r
  }) : (!y || A === r) && s.push({
    value: A
  }), s;
}
function Ta(e, t, { horizontal: s, minRotation: n }) {
  const a = Nt(n), i = (s ? Math.sin(a) : Math.cos(a)) || 1e-3, o = 0.75 * t * ("" + e).length;
  return Math.min(t / i, o);
}
class Id extends ve {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, s) {
    return et(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: s, maxDefined: n } = this.getUserBounds();
    let { min: a, max: i } = this;
    const o = (l) => a = s ? a : l, r = (l) => i = n ? i : l;
    if (t) {
      const l = Ot(a), c = Ot(i);
      l < 0 && c < 0 ? r(0) : l > 0 && c > 0 && o(0);
    }
    if (a === i) {
      let l = i === 0 ? 1 : Math.abs(i * 0.05);
      r(i + l), t || o(a - l);
    }
    this.min = a, this.max = i;
  }
  getTickLimit() {
    const t = this.options.ticks;
    let { maxTicksLimit: s, stepSize: n } = t, a;
    return n ? (a = Math.ceil(this.max / n) - Math.floor(this.min / n) + 1, a > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${n} would result generating up to ${a} ticks. Limiting to 1000.`), a = 1e3)) : (a = this.computeTickLimit(), s = s || 11), s && (a = Math.min(s, a)), a;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const t = this.options, s = t.ticks;
    let n = this.getTickLimit();
    n = Math.max(2, n);
    const a = {
      maxTicks: n,
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
    }, i = this._range || this, o = Rd(a, i);
    return t.bounds === "ticks" && Ro(o, this, "value"), t.reverse ? (o.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), o;
  }
  configure() {
    const t = this.ticks;
    let s = this.min, n = this.max;
    if (super.configure(), this.options.offset && t.length) {
      const a = (n - s) / Math.max(t.length - 1, 1) / 2;
      s -= a, n += a;
    }
    this._startValue = s, this._endValue = n, this._valueRange = n - s;
  }
  getLabelForValue(t) {
    return en(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class Wi extends Id {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: ai.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: s } = this.getMinMax(!0);
    this.min = kt(t) ? t : 0, this.max = kt(s) ? s : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), s = t ? this.width : this.height, n = Nt(this.options.ticks.minRotation), a = (t ? Math.sin(n) : Math.cos(n)) || 1e-3, i = this._resolveTickFontOptions(0);
    return Math.ceil(s / Math.min(40, i.lineHeight / a));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
const _s = {
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
}, St = /* @__PURE__ */ Object.keys(_s);
function Fa(e, t) {
  return e - t;
}
function Ba(e, t) {
  if (et(t))
    return null;
  const s = e._adapter, { parser: n, round: a, isoWeekday: i } = e._parseOpts;
  let o = t;
  return typeof n == "function" && (o = n(o)), kt(o) || (o = typeof n == "string" ? s.parse(o, n) : s.parse(o)), o === null ? null : (a && (o = a === "week" && (Re(i) || i === !0) ? s.startOf(o, "isoWeek", i) : s.startOf(o, a)), +o);
}
function Pa(e, t, s, n) {
  const a = St.length;
  for (let i = St.indexOf(e); i < a - 1; ++i) {
    const o = _s[St[i]], r = o.steps ? o.steps : Number.MAX_SAFE_INTEGER;
    if (o.common && Math.ceil((s - t) / (r * o.size)) <= n)
      return St[i];
  }
  return St[a - 1];
}
function zd(e, t, s, n, a) {
  for (let i = St.length - 1; i >= St.indexOf(s); i--) {
    const o = St[i];
    if (_s[o].common && e._adapter.diff(a, n, o) >= t - 1)
      return o;
  }
  return St[s ? St.indexOf(s) : 0];
}
function Wd(e) {
  for (let t = St.indexOf(e) + 1, s = St.length; t < s; ++t)
    if (_s[St[t]].common)
      return St[t];
}
function La(e, t, s) {
  if (!s)
    e[t] = !0;
  else if (s.length) {
    const { lo: n, hi: a } = Qs(s, t), i = s[n] >= t ? s[n] : s[a];
    e[i] = !0;
  }
}
function Nd(e, t, s, n) {
  const a = e._adapter, i = +a.startOf(t[0].value, n), o = t[t.length - 1].value;
  let r, l;
  for (r = i; r <= o; r = +a.add(r, 1, n))
    l = s[r], l >= 0 && (t[l].major = !0);
  return t;
}
function Ea(e, t, s) {
  const n = [], a = {}, i = t.length;
  let o, r;
  for (o = 0; o < i; ++o)
    r = t[o], a[r] = o, n.push({
      value: r,
      major: !1
    });
  return i === 0 || !s ? n : Nd(e, n, a, s);
}
class Oa extends ve {
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
    const n = t.time || (t.time = {}), a = this._adapter = new Ml._date(t.adapters.date);
    a.init(s), Te(n.displayFormats, a.formats()), this._parseOpts = {
      parser: n.parser,
      round: n.round,
      isoWeekday: n.isoWeekday
    }, super.init(t), this._normalized = s.normalized;
  }
  parse(t, s) {
    return t === void 0 ? null : Ba(this, t);
  }
  beforeLayout() {
    super.beforeLayout(), this._cache = {
      data: [],
      labels: [],
      all: []
    };
  }
  determineDataLimits() {
    const t = this.options, s = this._adapter, n = t.time.unit || "day";
    let { min: a, max: i, minDefined: o, maxDefined: r } = this.getUserBounds();
    function l(c) {
      !o && !isNaN(c.min) && (a = Math.min(a, c.min)), !r && !isNaN(c.max) && (i = Math.max(i, c.max));
    }
    (!o || !r) && (l(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && l(this.getMinMax(!1))), a = kt(a) && !isNaN(a) ? a : +s.startOf(Date.now(), n), i = kt(i) && !isNaN(i) ? i : +s.endOf(Date.now(), n) + 1, this.min = Math.min(a, i - 1), this.max = Math.max(a + 1, i);
  }
  _getLabelBounds() {
    const t = this.getLabelTimestamps();
    let s = Number.POSITIVE_INFINITY, n = Number.NEGATIVE_INFINITY;
    return t.length && (s = t[0], n = t[t.length - 1]), {
      min: s,
      max: n
    };
  }
  buildTicks() {
    const t = this.options, s = t.time, n = t.ticks, a = n.source === "labels" ? this.getLabelTimestamps() : this._generate();
    t.bounds === "ticks" && a.length && (this.min = this._userMin || a[0], this.max = this._userMax || a[a.length - 1]);
    const i = this.min, o = this.max, r = Ho(a, i, o);
    return this._unit = s.unit || (n.autoSkip ? Pa(s.minUnit, this.min, this.max, this._getLabelCapacity(i)) : zd(this, r.length, s.minUnit, this.min, this.max)), this._majorUnit = !n.major.enabled || this._unit === "year" ? void 0 : Wd(this._unit), this.initOffsets(a), t.reverse && r.reverse(), Ea(this, r, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let s = 0, n = 0, a, i;
    this.options.offset && t.length && (a = this.getDecimalForValue(t[0]), t.length === 1 ? s = 1 - a : s = (this.getDecimalForValue(t[1]) - a) / 2, i = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? n = i : n = (i - this.getDecimalForValue(t[t.length - 2])) / 2);
    const o = t.length < 3 ? 0.5 : 0.25;
    s = yt(s, 0, o), n = yt(n, 0, o), this._offsets = {
      start: s,
      end: n,
      factor: 1 / (s + 1 + n)
    };
  }
  _generate() {
    const t = this._adapter, s = this.min, n = this.max, a = this.options, i = a.time, o = i.unit || Pa(i.minUnit, s, n, this._getLabelCapacity(s)), r = Y(a.ticks.stepSize, 1), l = o === "week" ? i.isoWeekday : !1, c = Re(l) || l === !0, h = {};
    let u = s, f, g;
    if (c && (u = +t.startOf(u, "isoWeek", l)), u = +t.startOf(u, c ? "day" : o), t.diff(n, s, o) > 1e5 * r)
      throw new Error(s + " and " + n + " are too far apart with stepSize of " + r + " " + o);
    const p = a.ticks.source === "data" && this.getDataTimestamps();
    for (f = u, g = 0; f < n; f = +t.add(f, r, o), g++)
      La(h, f, p);
    return (f === n || a.bounds === "ticks" || g === 1) && La(h, f, p), Object.keys(h).sort(Fa).map((v) => +v);
  }
  getLabelForValue(t) {
    const s = this._adapter, n = this.options.time;
    return n.tooltipFormat ? s.format(t, n.tooltipFormat) : s.format(t, n.displayFormats.datetime);
  }
  format(t, s) {
    const a = this.options.time.displayFormats, i = this._unit, o = s || a[i];
    return this._adapter.format(t, o);
  }
  _tickFormatFunction(t, s, n, a) {
    const i = this.options, o = i.ticks.callback;
    if (o)
      return lt(o, [
        t,
        s,
        n
      ], this);
    const r = i.time.displayFormats, l = this._unit, c = this._majorUnit, h = l && r[l], u = c && r[c], f = n[s], g = c && u && f && f.major;
    return this._adapter.format(t, a || (g ? u : h));
  }
  generateTickLabels(t) {
    let s, n, a;
    for (s = 0, n = t.length; s < n; ++s)
      a = t[s], a.label = this._tickFormatFunction(a.value, s, t);
  }
  getDecimalForValue(t) {
    return t === null ? NaN : (t - this.min) / (this.max - this.min);
  }
  getPixelForValue(t) {
    const s = this._offsets, n = this.getDecimalForValue(t);
    return this.getPixelForDecimal((s.start + n) * s.factor);
  }
  getValueForPixel(t) {
    const s = this._offsets, n = this.getDecimalForPixel(t) / s.factor - s.end;
    return this.min + n * (this.max - this.min);
  }
  _getLabelSize(t) {
    const s = this.options.ticks, n = this.ctx.measureText(t).width, a = Nt(this.isHorizontal() ? s.maxRotation : s.minRotation), i = Math.cos(a), o = Math.sin(a), r = this._resolveTickFontOptions(0).size;
    return {
      w: n * i + r * o,
      h: n * o + r * i
    };
  }
  _getLabelCapacity(t) {
    const s = this.options.time, n = s.displayFormats, a = n[s.unit] || n.millisecond, i = this._tickFormatFunction(t, 0, Ea(this, [
      t
    ], this._majorUnit), a), o = this._getLabelSize(i), r = Math.floor(this.isHorizontal() ? this.width / o.w : this.height / o.h) - 1;
    return r > 0 ? r : 1;
  }
  getDataTimestamps() {
    let t = this._cache.data || [], s, n;
    if (t.length)
      return t;
    const a = this.getMatchingVisibleMetas();
    if (this._normalized && a.length)
      return this._cache.data = a[0].controller.getAllParsedValues(this);
    for (s = 0, n = a.length; s < n; ++s)
      t = t.concat(a[s].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(t);
  }
  getLabelTimestamps() {
    const t = this._cache.labels || [];
    let s, n;
    if (t.length)
      return t;
    const a = this.getLabels();
    for (s = 0, n = a.length; s < n; ++s)
      t.push(Ba(this, a[s]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return ei(t.sort(Fa));
  }
}
function es(e, t, s) {
  let n = 0, a = e.length - 1, i, o, r, l;
  s ? (t >= e[n].pos && t <= e[a].pos && ({ lo: n, hi: a } = se(e, "pos", t)), { pos: i, time: r } = e[n], { pos: o, time: l } = e[a]) : (t >= e[n].time && t <= e[a].time && ({ lo: n, hi: a } = se(e, "time", t)), { time: i, pos: r } = e[n], { time: o, pos: l } = e[a]);
  const c = o - i;
  return c ? r + (l - r) * (t - i) / c : r;
}
class ux extends Oa {
  static id = "timeseries";
  static defaults = Oa.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), s = this._table = this.buildLookupTable(t);
    this._minPos = es(s, this.min), this._tableRange = es(s, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: s, max: n } = this, a = [], i = [];
    let o, r, l, c, h;
    for (o = 0, r = t.length; o < r; ++o)
      c = t[o], c >= s && c <= n && a.push(c);
    if (a.length < 2)
      return [
        {
          time: s,
          pos: 0
        },
        {
          time: n,
          pos: 1
        }
      ];
    for (o = 0, r = a.length; o < r; ++o)
      h = a[o + 1], l = a[o - 1], c = a[o], Math.round((h + l) / 2) !== c && i.push({
        time: c,
        pos: o / (r - 1)
      });
    return i;
  }
  _generate() {
    const t = this.min, s = this.max;
    let n = super.getDataTimestamps();
    return (!n.includes(t) || !n.length) && n.splice(0, 0, t), (!n.includes(s) || n.length === 1) && n.push(s), n.sort((a, i) => a - i);
  }
  _getTimestampsForTable() {
    let t = this._cache.all || [];
    if (t.length)
      return t;
    const s = this.getDataTimestamps(), n = this.getLabelTimestamps();
    return s.length && n.length ? t = this.normalize(s.concat(n)) : t = s.length ? s : n, t = this._cache.all = t, t;
  }
  getDecimalForValue(t) {
    return (es(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const s = this._offsets, n = this.getDecimalForPixel(t) / s.factor - s.end;
    return es(this._table, n * this._tableRange + this._minPos, !0);
  }
}
const Ni = {
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
}, Hd = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
}, Vd = {
  type: {
    type: String,
    required: !0
  },
  destroyDelay: {
    type: Number,
    default: 0
    // No delay by default
  },
  ...Ni,
  ...Hd
}, jd = Ki[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function ue(e) {
  return Ua(e) ? zs(e) : e;
}
function Yd(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return Ua(t) ? new Proxy(e, {}) : e;
}
function Ud(e, t) {
  const s = e.options;
  s && t && Object.assign(s, t);
}
function Hi(e, t) {
  e.labels = t;
}
function Vi(e, t, s) {
  const n = [];
  e.datasets = t.map((a) => {
    const i = e.datasets.find((o) => o[s] === a[s]);
    return !i || !a.data || n.includes(i) ? {
      ...a
    } : (n.push(i), Object.assign(i, a), i);
  });
}
function qd(e, t) {
  const s = {
    labels: [],
    datasets: []
  };
  return Hi(s, e.labels), Vi(s, e.datasets, t), s;
}
const Xd = Z({
  props: Vd,
  setup(e, t) {
    let { expose: s, slots: n } = t;
    const a = xt(null), i = Va(null);
    s({
      chart: i
    });
    const o = () => {
      if (!a.value) return;
      const { type: c, data: h, options: u, plugins: f, datasetIdKey: g } = e, p = qd(h, g), v = Yd(p, h);
      i.value = new ye(a.value, {
        type: c,
        data: v,
        options: {
          ...u
        },
        plugins: f
      });
    }, r = () => {
      const c = zs(i.value);
      c && (e.destroyDelay > 0 ? setTimeout(() => {
        c.destroy(), i.value = null;
      }, e.destroyDelay) : (c.destroy(), i.value = null));
    }, l = (c) => {
      c.update(e.updateMode);
    };
    return us(o), ja(r), Xt([
      () => e.options,
      () => e.data
    ], (c, h) => {
      let [u, f] = c, [g, p] = h;
      const v = zs(i.value);
      if (!v)
        return;
      let m = !1;
      if (u) {
        const b = ue(u), y = ue(g);
        b && b !== y && (Ud(v, b), m = !0);
      }
      if (f) {
        const b = ue(f.labels), y = ue(p.labels), x = ue(f.datasets), M = ue(p.datasets);
        b !== y && (Hi(v.config.data, b), m = !0), x && x !== M && (Vi(v.config.data, x, e.datasetIdKey), m = !0);
      }
      m && Ya(() => {
        l(v);
      });
    }, {
      deep: !0
    }), () => Is("canvas", {
      role: "img",
      "aria-label": e.ariaLabel,
      "aria-describedby": e.ariaDescribedby,
      ref: a
    }, [
      Is("p", {}, [
        n.default ? n.default() : ""
      ])
    ]);
  }
});
function un(e, t) {
  return ye.register(t), Z({
    props: Ni,
    setup(s, n) {
      let { expose: a } = n;
      const i = Va(null), o = (r) => {
        i.value = r?.chart;
      };
      return a({
        chart: i
      }), () => Is(Xd, jd({
        ref: o
      }, {
        type: e,
        ...s
      }));
    }
  });
}
const Kd = /* @__PURE__ */ un("bar", vl), Gd = /* @__PURE__ */ un("line", xl), Zd = /* @__PURE__ */ un("pie", kl), Ra = {
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
}, Ia = {
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
}, Qd = [
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
function tt(e) {
  const t = xt("light");
  let s = null;
  const n = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", a = T(() => e?.value ? e.value : t.value), i = T(() => a.value === "dark"), o = T(() => i.value ? Ia : Ra), r = () => {
    typeof document > "u" || (t.value = n(), s = new MutationObserver((c) => {
      for (const h of c)
        h.attributeName === "class" && (t.value = n());
    }), s.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["class"]
    }));
  }, l = () => {
    s && (s.disconnect(), s = null);
  };
  return us(() => {
    r();
  }), ja(() => {
    l();
  }), e && Xt(e, () => {
  }), {
    isDark: i,
    currentTheme: a,
    colors: o,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: Ra,
    darkColors: Ia,
    chartSeriesColors: Qd
  };
}
const Jd = { class: "chart-container" }, th = /* @__PURE__ */ Z({
  __name: "ChartBar",
  props: {
    data: {},
    options: {},
    stacked: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const s = e;
    ye.register(
      zi,
      Wi,
      td,
      Ri,
      hn,
      dn
    );
    const { isDark: n, colors: a } = tt(J(s, "theme")), i = s.data, o = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = T(() => s.options ? s.options : {
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
            color: a.value.textSecondary,
            padding: 12,
            boxWidth: 12,
            boxHeight: 12,
            borderRadius: 4,
            usePointStyle: !0,
            pointStyle: "rectRounded"
          },
          generateLabels: function(l) {
            return l.data.datasets.map((h, u) => ({
              text: o(h.label || ""),
              fillStyle: Array.isArray(h.backgroundColor) ? h.backgroundColor[0] : h.backgroundColor,
              strokeStyle: Array.isArray(h.borderColor) ? h.borderColor[0] : h.borderColor,
              lineWidth: h.borderWidth,
              hidden: !l.isDatasetVisible(u),
              index: u,
              datasetIndex: u
            }));
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: a.value.tooltipBg,
          titleColor: a.value.tooltipText,
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
              return l.length > 0 ? String(o(l[0].label)) : "";
            },
            label: function(l) {
              let c = String(o(l.dataset.label || ""));
              return c && (c += ": "), l.parsed.y !== null && (c += l.parsed.y), c;
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
            color: a.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 12,
              weight: 500
            },
            color: a.value.textSecondary,
            padding: 8,
            callback: function(l) {
              return o(l);
            }
          }
        },
        x: {
          stacked: s.stacked || !1,
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
            color: a.value.textSecondary,
            padding: 8,
            callback: function(l) {
              const c = this.getLabelForValue(l);
              return o(c);
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
    return t({ isDark: n }), (l, c) => (_(), k("div", Jd, [
      j(B(Kd), {
        data: B(i),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), G = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, a] of t)
    s[n] = a;
  return s;
}, Gt = /* @__PURE__ */ G(th, [["__scopeId", "data-v-be0a7bf2"]]), eh = { class: "chart-container" }, sh = /* @__PURE__ */ Z({
  __name: "ChartLine",
  props: {
    data: {},
    options: {},
    theme: {}
  },
  setup(e, { expose: t }) {
    const s = e;
    ye.register(
      zi,
      Wi,
      Xc,
      vs,
      Ri,
      hn,
      dn,
      _d
    );
    const { isDark: n, colors: a } = tt(J(s, "theme")), i = s.data, o = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = T(() => s.options ? s.options : {
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
            color: a.value.textSecondary,
            padding: 12,
            boxWidth: 12,
            boxHeight: 12,
            borderRadius: 4,
            usePointStyle: !0,
            pointStyle: "circle",
            generateLabels: function(l) {
              return l.data.datasets.map((h, u) => ({
                text: o(h.label || ""),
                fillStyle: h.backgroundColor,
                strokeStyle: h.borderColor,
                lineWidth: h.borderWidth,
                hidden: !l.isDatasetVisible(u),
                index: u,
                datasetIndex: u
              }));
            }
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: a.value.tooltipBg,
          titleColor: a.value.tooltipText,
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
              return l.length > 0 ? String(o(l[0].label)) : "";
            },
            label: function(l) {
              let c = String(o(l.dataset.label || ""));
              return c && (c += ": "), l.parsed.y !== null && (c += l.parsed.y), c;
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
            color: a.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 12,
              weight: 500
            },
            color: a.value.textSecondary,
            padding: 8,
            callback: function(l) {
              return o(l);
            }
          }
        },
        x: {
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
            color: a.value.textSecondary,
            padding: 8,
            callback: function(l) {
              const c = this.getLabelForValue(l);
              return o(c);
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
          backgroundColor: n.value ? "#1a1a1d" : "#ffffff",
          hoverBorderWidth: 3
        }
      }
    });
    return t({ isDark: n }), (l, c) => (_(), k("div", eh, [
      j(B(Gd), {
        data: B(i),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), re = /* @__PURE__ */ G(sh, [["__scopeId", "data-v-c400b486"]]), nh = { class: "chart-container" }, ah = /* @__PURE__ */ Z({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const s = e;
    ye.register(Ic, hn, dn);
    const { isDark: n, colors: a } = tt(J(s, "theme")), i = s.data, o = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = T(() => s.options ? s.options : {
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
            color: a.value.textSecondary,
            padding: 16,
            boxWidth: 14,
            boxHeight: 14,
            borderRadius: 4,
            usePointStyle: !0,
            pointStyle: "circle",
            generateLabels: function(l) {
              const c = l.data;
              return c.labels.length && c.datasets.length ? c.labels.map((h, u) => {
                const f = l.getDatasetMeta(0), g = c.datasets[0], p = g.data[u], v = Array.isArray(g.backgroundColor) ? g.backgroundColor[u] : g.backgroundColor;
                return {
                  text: `${o(h)}: ${p}`,
                  fillStyle: v,
                  hidden: f.data[u]?.hidden || !1,
                  index: u
                };
              }) : [];
            }
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: a.value.tooltipBg,
          titleColor: a.value.tooltipText,
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
              return l.length > 0 ? String(o(l[0].label)) : "";
            },
            label: function(l) {
              const c = l.label || "", h = l.parsed || 0, u = l.dataset.data.reduce((g, p) => g + p, 0), f = (h / u * 100).toFixed(1);
              return `${o(c)}: ${h} (${f}%)`;
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
    return t({ isDark: n }), (l, c) => (_(), k("div", nh, [
      j(B(Zd), {
        data: B(i),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), fn = /* @__PURE__ */ G(ah, [["__scopeId", "data-v-23a84317"]]), ih = { class: "chart-container" }, oh = ["viewBox"], rh = ["transform"], lh = ["x", "width", "fill", "stroke"], ch = ["fill"], dh = ["x1", "y1", "x2", "y2", "stroke"], hh = ["points", "fill"], uh = ["x1", "y1", "x2", "y2", "stroke"], fh = ["x", "y", "fill"], gh = ["x1", "y1", "x2", "y2", "stroke"], ph = ["points", "fill"], bh = ["transform"], mh = ["y1", "y2"], vh = ["y1", "y2"], yh = ["y1", "y2"], _h = ["y1", "y2"], xh = ["y", "height"], kh = ["y1", "y2"], Mh = ["y1", "y2"], Sh = ["y1", "y2"], wh = ["y1", "y2"], Ch = ["y", "height"], $h = ["cy", "stroke", "onMouseenter"], Dh = ["cy", "stroke", "onMouseenter"], Ah = ["cy", "stroke", "onMouseenter"], Th = ["cy", "stroke", "onMouseenter"], Fh = ["y1", "y2", "onMouseenter"], Bh = ["y1", "y2", "onMouseenter"], Ph = ["x", "y", "fill"], Lh = ["x", "y", "fill"], Eh = ["transform"], Oh = { transform: "translate(-200, 0)" }, Rh = ["stroke"], Ih = ["fill"], zh = { transform: "translate(-130, 0)" }, Wh = ["stroke"], Nh = ["fill"], Hh = { transform: "translate(-60, 0)" }, Vh = ["stroke"], jh = ["fill"], Yh = { transform: "translate(10, 0)" }, Uh = ["stroke"], qh = ["fill"], Xh = { transform: "translate(80, 0)" }, Kh = ["fill"], Gh = { transform: "translate(150, 0)" }, Zh = ["fill"], Qh = /* @__PURE__ */ Z({
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
    const s = e, { isDark: n } = tt(J(s, "theme")), a = T(() => ({
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
    })), i = xt({
      visible: !1,
      x: 0,
      y: 0,
      text: ""
    }), o = (f) => typeof f == "string" ? f.charAt(0).toUpperCase() + f.slice(1).toLowerCase() : f, r = (f, g) => {
      const p = f.currentTarget.closest("svg");
      if (!p) return;
      const v = p.getBoundingClientRect(), m = p.createSVGPoint();
      m.x = f.clientX - v.left, m.y = f.clientY - v.top, i.value = {
        visible: !0,
        x: m.x,
        y: m.y - 20,
        text: g
      };
    }, l = (f) => {
      if (i.value.visible) {
        const g = f.currentTarget, p = g.getBoundingClientRect(), v = g.createSVGPoint();
        v.x = f.clientX - p.left, v.y = f.clientY - p.top, i.value.x = v.x, i.value.y = v.y - 20;
      }
    }, c = () => {
      i.value.visible = !1;
    }, h = () => {
      i.value.visible = !1;
    }, u = T(() => {
      const f = [], p = s.chartHeight - s.chartMargin - s.chartBottomMargin;
      for (let v = 1; v <= 10; v++) {
        const m = v, b = (m - 1) / 9, y = s.chartMargin + p - b * p;
        f.push({ value: m, y });
      }
      return f;
    });
    return t({ isDark: n }), (f, g) => (_(), k("div", ih, [
      (_(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: bt(`min-height: ${e.chartHeight}px;`),
        onMousemove: l,
        onMouseleave: c
      }, [
        i.value.visible ? (_(), k("g", {
          key: 0,
          transform: `translate(${i.value.x}, ${i.value.y})`
        }, [
          d("rect", {
            x: -(i.value.text.length * 6 + 10),
            y: -16,
            width: i.value.text.length * 12 + 20,
            height: "24",
            fill: a.value.tooltipBg,
            rx: "6",
            stroke: a.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, lh),
          d("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: a.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, S(i.value.text), 9, ch)
        ], 8, rh)) : z("", !0),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: a.value.axis,
          "stroke-width": "2"
        }, null, 8, dh),
        d("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: a.value.axis
        }, null, 8, hh),
        (_(!0), k(X, null, ot(u.value, (p, v) => (_(), k(X, { key: v }, [
          d("line", {
            x1: e.chartMargin - 6,
            y1: p.y,
            x2: e.chartMargin,
            y2: p.y,
            stroke: a.value.tickLine,
            "stroke-width": "1"
          }, null, 8, uh),
          d("text", {
            x: e.chartMargin - 12,
            y: p.y + 4,
            "text-anchor": "end",
            fill: a.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, S(p.value), 9, fh)
        ], 64))), 128)),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: a.value.axis,
          "stroke-width": "2"
        }, null, 8, gh),
        d("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: a.value.axis
        }, null, 8, ph),
        (_(!0), k(X, null, ot(e.boxplotData, (p, v) => (_(), k(X, { key: v }, [
          d("g", {
            transform: `translate(${p.centerX}, 0)`
          }, [
            p.isTotal ? (_(), k(X, { key: 0 }, [
              d("line", {
                x1: 0,
                y1: p.minY,
                x2: 0,
                y2: p.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, mh),
              d("line", {
                x1: 0,
                y1: p.q3Y,
                x2: 0,
                y2: p.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, vh),
              d("line", {
                x1: -18,
                y1: p.minY,
                x2: 18,
                y2: p.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, yh),
              d("line", {
                x1: -18,
                y1: p.maxY,
                x2: 18,
                y2: p.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, _h),
              d("rect", {
                x: -24,
                y: p.q3Y,
                width: "48",
                height: p.q1Y - p.q3Y,
                fill: "#8b5cf6",
                "fill-opacity": "0.15",
                stroke: "#8b5cf6",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, xh)
            ], 64)) : (_(), k(X, { key: 1 }, [
              d("line", {
                x1: 0,
                y1: p.minY,
                x2: 0,
                y2: p.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, kh),
              d("line", {
                x1: 0,
                y1: p.q3Y,
                x2: 0,
                y2: p.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Mh),
              d("line", {
                x1: -18,
                y1: p.minY,
                x2: 18,
                y2: p.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Sh),
              d("line", {
                x1: -18,
                y1: p.maxY,
                x2: 18,
                y2: p.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, wh),
              d("rect", {
                x: -24,
                y: p.q3Y,
                width: "48",
                height: p.q1Y - p.q3Y,
                fill: "#C67DFF",
                "fill-opacity": "0.15",
                stroke: "#C67DFF",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, Ch)
            ], 64)),
            d("circle", {
              cx: 0,
              cy: p.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: a.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (m) => r(m, `Min: ${p.min.toFixed(1)}`),
              onMouseleave: h,
              style: { cursor: "pointer" }
            }, null, 40, $h),
            d("circle", {
              cx: 0,
              cy: p.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: a.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (m) => r(m, `Q1: ${p.q1.toFixed(1)}`),
              onMouseleave: h,
              style: { cursor: "pointer" }
            }, null, 40, Dh),
            d("circle", {
              cx: 0,
              cy: p.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: a.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (m) => r(m, `Q3: ${p.q3.toFixed(1)}`),
              onMouseleave: h,
              style: { cursor: "pointer" }
            }, null, 40, Ah),
            d("circle", {
              cx: 0,
              cy: p.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: a.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (m) => r(m, `Max: ${p.max.toFixed(1)}`),
              onMouseleave: h,
              style: { cursor: "pointer" }
            }, null, 40, Th),
            d("line", {
              x1: -24,
              y1: p.medianY,
              x2: 24,
              y2: p.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (m) => r(m, `Median: ${p.median.toFixed(1)}`),
              onMouseleave: h,
              style: { cursor: "pointer" }
            }, null, 40, Fh),
            p.averageY ? (_(), k("line", {
              key: 2,
              x1: -24,
              y1: p.averageY,
              x2: 24,
              y2: p.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (m) => r(m, `Avg: ${p.average.toFixed(1)}`),
              onMouseleave: h,
              style: { cursor: "pointer" }
            }, null, 40, Bh)) : z("", !0)
          ], 8, bh),
          d("text", {
            x: p.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: a.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, S(o(p.label)), 9, Ph),
          p.responseCount ? (_(), k("text", {
            key: 0,
            x: p.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: a.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + S(p.responseCount), 9, Lh)) : z("", !0)
        ], 64))), 128)),
        e.showLegend ? (_(), k("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          d("g", Oh, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: a.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Rh),
            d("text", {
              x: "10",
              y: "4",
              fill: a.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Ih)
          ]),
          d("g", zh, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
              stroke: a.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Wh),
            d("text", {
              x: "10",
              y: "4",
              fill: a.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, Nh)
          ]),
          d("g", Hh, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
              stroke: a.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Vh),
            d("text", {
              x: "10",
              y: "4",
              fill: a.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, jh)
          ]),
          d("g", Yh, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: a.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Uh),
            d("text", {
              x: "10",
              y: "4",
              fill: a.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, qh)
          ]),
          d("g", Xh, [
            g[0] || (g[0] = d("line", {
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
              fill: a.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, Kh)
          ]),
          d("g", Gh, [
            g[1] || (g[1] = d("line", {
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
              fill: a.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, Zh)
          ])
        ], 8, Eh)) : z("", !0)
      ], 44, oh))
    ]));
  }
}), Jh = /* @__PURE__ */ G(Qh, [["__scopeId", "data-v-520c623f"]]), tu = { class: "chart-container" }, eu = ["viewBox"], su = ["transform"], nu = ["x", "y", "width", "height", "fill", "stroke"], au = ["y", "fill"], iu = ["y", "fill"], ou = ["x1", "y1", "x2", "y2", "stroke"], ru = ["points", "fill"], lu = ["x1", "y1", "x2", "y2", "stroke"], cu = ["x1", "y1", "x2", "y2", "stroke"], du = ["x", "y", "fill"], hu = ["x", "y", "fill", "transform"], uu = ["x1", "y1", "x2", "y2", "stroke"], fu = ["points", "fill"], gu = ["transform"], pu = ["y1", "y2", "stroke", "onMouseenter"], bu = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], mu = ["x1", "y1", "x2", "y2", "onMouseenter"], vu = ["x1", "y1", "x2", "y2", "onMouseenter"], yu = ["cy", "stroke", "onMouseenter"], _u = ["cy", "stroke", "onMouseenter"], xu = ["x", "y", "fill"], ku = ["x", "y", "fill"], Mu = ["transform"], Su = { transform: "translate(-180, 0)" }, wu = ["stroke"], Cu = ["fill"], $u = { transform: "translate(-120, 0)" }, Du = ["fill"], Au = { transform: "translate(-60, 0)" }, Tu = ["fill"], Fu = { transform: "translate(0, 0)" }, Bu = ["stroke"], Pu = ["fill"], Lu = { transform: "translate(60, 0)" }, Eu = ["fill"], Ou = { transform: "translate(130, 0)" }, Ru = ["fill"], Iu = /* @__PURE__ */ Z({
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
    const s = e, { isDark: n } = tt(J(s, "theme")), a = T(() => ({
      // Tooltip
      tooltipBg: n.value ? "rgba(26, 26, 29, 0.98)" : "rgba(15, 23, 42, 0.95)",
      tooltipBorder: n.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
      tooltipText: n.value ? "#f8f9fa" : "#f1f5f9",
      tooltipTextSecondary: n.value ? "#d1d5db" : "#e2e8f0",
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
    })), i = xt({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), o = (f) => typeof f == "string" ? f.charAt(0).toUpperCase() + f.slice(1).toLowerCase() : f, r = (f, g, p) => {
      const v = f.currentTarget.closest("svg");
      if (!v) return;
      const m = v.getBoundingClientRect(), b = v.createSVGPoint();
      b.x = f.clientX - m.left, b.y = f.clientY - m.top;
      let y = o(g.label), x = "";
      switch (p) {
        case "body":
          x = `Q1: ${g.q1.toFixed(1)} | Q3: ${g.q3.toFixed(1)}`;
          break;
        case "wick":
          x = `Min: ${g.low.toFixed(1)} | Max: ${g.high.toFixed(1)}`;
          break;
        case "median":
          x = `Median: ${g.median.toFixed(1)}`;
          break;
        case "average":
          x = `Average: ${g.average?.toFixed(1)}`;
          break;
        case "min":
          x = `Min: ${g.low.toFixed(1)}`;
          break;
        case "max":
          x = `Max: ${g.high.toFixed(1)}`;
          break;
      }
      const M = Math.max(180, x.length * 7 + 40), w = 48;
      i.value = {
        visible: !0,
        x: b.x,
        y: b.y - 20,
        title: y,
        text: x,
        width: M,
        height: w
      };
    }, l = (f) => {
      if (i.value.visible) {
        const g = f.currentTarget, p = g.getBoundingClientRect(), v = g.createSVGPoint();
        v.x = f.clientX - p.left, v.y = f.clientY - p.top, i.value.x = v.x, i.value.y = v.y - 20;
      }
    }, c = () => {
      i.value.visible = !1;
    }, h = () => {
      i.value.visible = !1;
    }, u = T(() => {
      const f = [], p = s.chartHeight - s.chartMargin - s.chartBottomMargin;
      for (let v = 1; v <= 10; v++) {
        const m = v, b = (m - 1) / 9, y = s.chartMargin + p - b * p;
        f.push({ value: m, y });
      }
      return f;
    });
    return t({ isDark: n }), (f, g) => (_(), k("div", tu, [
      (_(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full candlestick-svg",
        style: bt(`min-height: ${e.chartHeight}px;`),
        onMousemove: l,
        onMouseleave: c
      }, [
        i.value.visible ? (_(), k("g", {
          key: 0,
          transform: `translate(${i.value.x}, ${i.value.y})`
        }, [
          d("rect", {
            x: -i.value.width / 2,
            y: -i.value.height - 10,
            width: i.value.width,
            height: i.value.height,
            fill: a.value.tooltipBg,
            rx: "8",
            stroke: a.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, nu),
          d("text", {
            x: "0",
            y: -i.value.height + 8,
            "text-anchor": "middle",
            fill: a.value.tooltipText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, S(i.value.title), 9, au),
          d("text", {
            x: "0",
            y: -i.value.height + 26,
            "text-anchor": "middle",
            fill: a.value.tooltipTextSecondary,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, S(i.value.text), 9, iu)
        ], 8, su)) : z("", !0),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: a.value.axis,
          "stroke-width": "2"
        }, null, 8, ou),
        d("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: a.value.axis
        }, null, 8, ru),
        (_(!0), k(X, null, ot(u.value, (p, v) => (_(), k("line", {
          key: `grid-${v}`,
          x1: e.chartMargin,
          y1: p.y,
          x2: e.chartWidth - e.chartMargin,
          y2: p.y,
          stroke: a.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, lu))), 128)),
        (_(!0), k(X, null, ot(u.value, (p, v) => (_(), k(X, { key: v }, [
          d("line", {
            x1: e.chartMargin - 6,
            y1: p.y,
            x2: e.chartMargin,
            y2: p.y,
            stroke: a.value.tickLine,
            "stroke-width": "1"
          }, null, 8, cu),
          d("text", {
            x: e.chartMargin - 12,
            y: p.y + 4,
            "text-anchor": "end",
            fill: a.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, S(p.value), 9, du)
        ], 64))), 128)),
        d("text", {
          x: e.chartMargin - 35,
          y: e.chartHeight / 2,
          "text-anchor": "middle",
          fill: a.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif",
          transform: `rotate(-90, ${e.chartMargin - 35}, ${e.chartHeight / 2})`
        }, S(o(e.yAxisLabel)), 9, hu),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: a.value.axis,
          "stroke-width": "2"
        }, null, 8, uu),
        d("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: a.value.axis
        }, null, 8, fu),
        (_(!0), k(X, null, ot(e.candlestickData, (p, v) => (_(), k(X, { key: v }, [
          d("g", {
            transform: `translate(${p.centerX}, 0)`
          }, [
            d("line", {
              x1: 0,
              y1: p.highY,
              x2: 0,
              y2: p.lowY,
              stroke: p.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              class: "hover-line",
              onMouseenter: (m) => r(m, p, "wick"),
              onMouseleave: h,
              style: { cursor: "pointer" }
            }, null, 40, pu),
            d("rect", {
              x: -e.candleWidth / 2,
              y: Math.min(p.q1Y, p.q3Y),
              width: e.candleWidth,
              height: Math.abs(p.q3Y - p.q1Y),
              fill: p.isTotal ? "rgba(139, 92, 246, 0.15)" : "rgba(198, 125, 255, 0.15)",
              stroke: p.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              rx: "4",
              class: "hover-rect",
              onMouseenter: (m) => r(m, p, "body"),
              onMouseleave: h,
              style: { cursor: "pointer" }
            }, null, 40, bu),
            p.medianY ? (_(), k("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: p.medianY,
              x2: e.candleWidth / 2,
              y2: p.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (m) => r(m, p, "median"),
              onMouseleave: h,
              style: { cursor: "pointer" }
            }, null, 40, mu)) : z("", !0),
            p.averageY ? (_(), k("line", {
              key: 1,
              x1: -e.candleWidth / 2,
              y1: p.averageY,
              x2: e.candleWidth / 2,
              y2: p.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (m) => r(m, p, "average"),
              onMouseleave: h,
              style: { cursor: "pointer" }
            }, null, 40, vu)) : z("", !0),
            d("circle", {
              cx: 0,
              cy: p.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: a.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (m) => r(m, p, "min"),
              onMouseleave: h,
              style: { cursor: "pointer" }
            }, null, 40, yu),
            d("circle", {
              cx: 0,
              cy: p.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: a.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (m) => r(m, p, "max"),
              onMouseleave: h,
              style: { cursor: "pointer" }
            }, null, 40, _u)
          ], 8, gu),
          d("text", {
            x: p.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: a.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, S(o(p.label)), 9, xu),
          p.responseCount ? (_(), k("text", {
            key: 0,
            x: p.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: a.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + S(p.responseCount), 9, ku)) : z("", !0)
        ], 64))), 128)),
        e.showLegend ? (_(), k("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          d("g", Su, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: a.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, wu),
            d("text", {
              x: "10",
              y: "4",
              fill: a.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Cu)
          ]),
          d("g", $u, [
            g[0] || (g[0] = d("rect", {
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
              fill: a.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, Du)
          ]),
          d("g", Au, [
            g[1] || (g[1] = d("rect", {
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
              fill: a.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, Tu)
          ]),
          d("g", Fu, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: a.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Bu),
            d("text", {
              x: "10",
              y: "4",
              fill: a.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Pu)
          ]),
          d("g", Lu, [
            g[2] || (g[2] = d("line", {
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
              fill: a.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, Eu)
          ]),
          d("g", Ou, [
            g[3] || (g[3] = d("line", {
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
              fill: a.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, Ru)
          ])
        ], 8, Mu)) : z("", !0)
      ], 44, eu))
    ]));
  }
}), ji = /* @__PURE__ */ G(Iu, [["__scopeId", "data-v-0ecc8ae0"]]), zu = { class: "chart-container" }, Wu = ["viewBox"], Nu = ["transform"], Hu = ["x", "y", "width", "height", "fill", "stroke"], Vu = ["y", "fill"], ju = ["y", "fill"], Yu = ["x1", "y1", "x2", "y2", "stroke"], Uu = ["x1", "y1", "x2", "y2", "stroke"], qu = ["points", "fill"], Xu = ["x1", "y1", "x2", "y2", "stroke"], Ku = ["x", "y", "fill"], Gu = ["x", "y", "fill", "transform"], Zu = ["x1", "y1", "x2", "y2", "stroke"], Qu = ["points", "fill"], Ju = ["x1", "y1", "x2", "y2", "stroke"], tf = ["x", "y", "fill"], ef = ["x", "y", "fill"], sf = ["d"], nf = ["x", "y", "width", "height", "onMouseenter"], af = ["x1", "y1", "x2", "y2"], of = ["x", "y"], rf = ["x1", "y1", "x2", "y2"], lf = ["x", "y"], cf = ["x1", "y1", "x2", "y2"], df = ["x", "y"], hf = ["x1", "y1", "x2", "y2"], uf = ["x", "y"], ff = ["x1", "y1", "x2", "y2"], gf = ["x", "y"], pf = ["x1", "y1", "x2", "y2"], bf = ["x", "y"], mf = ["transform"], vf = { transform: "translate(-220, 0)" }, yf = ["fill"], _f = { transform: "translate(-140, 0)" }, xf = ["fill"], kf = { transform: "translate(-80, 0)" }, Mf = ["fill"], Sf = { transform: "translate(-20, 0)" }, wf = ["fill"], Cf = { transform: "translate(60, 0)" }, $f = ["fill"], Df = { transform: "translate(130, 0)" }, Af = ["fill"], Tf = { transform: "translate(180, 0)" }, Ff = ["fill"], Bf = /* @__PURE__ */ Z({
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
    const s = e, { isDark: n } = tt(J(s, "theme")), a = T(() => ({
      // Tooltip
      tooltipBg: n.value ? "rgba(26, 26, 29, 0.98)" : "rgba(15, 23, 42, 0.95)",
      tooltipBorder: n.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
      tooltipText: n.value ? "#f8f9fa" : "#f1f5f9",
      tooltipTextSecondary: n.value ? "#d1d5db" : "#e2e8f0",
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
    })), i = xt({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), o = T(() => s.chartWidth - s.chartMargin * 2), r = T(() => s.chartHeight - s.chartMargin - s.chartBottomMargin), l = T(() => o.value / 10 * 0.6), c = T(() => !s.histogram || s.histogram.length === 0 ? 1 : Math.max(...s.histogram.map((O) => O.count || 0), 1) + 30), h = T(() => {
      if (!s.histogram || s.histogram.length === 0) return 1;
      const H = s.averageScore || 0;
      let O = 0, N = 0;
      if (s.histogram.forEach((Q) => {
        const rt = Q.count || 0;
        O += rt;
        const ct = Q.score - H;
        N += rt * (ct * ct);
      }), O === 0) return 1;
      const q = N / O;
      return Math.sqrt(q) || 1;
    }), u = (H, O, N) => {
      if (N === 0) return 0;
      const q = 1 / (N * Math.sqrt(2 * Math.PI)), Q = -0.5 * Math.pow((H - O) / N, 2);
      return q * Math.exp(Q);
    }, f = T(() => {
      if (!s.histogram || s.histogram.length === 0 || s.averageScore === 0 && h.value === 0) return null;
      const H = s.averageScore, O = h.value, N = [], q = 100, Q = 1, rt = 10, ct = s.histogram.reduce((Dt, ce) => Dt + (ce.count || 0), 0);
      if (ct === 0) return null;
      let mt = 0;
      for (let Dt = 0; Dt <= q; Dt++) {
        const ce = Q + (rt - Q) * (Dt / q), ks = u(ce, H, O);
        ks > mt && (mt = ks);
      }
      const _e = r.value * 0.75 / mt * ct * 6e-3, xs = s.chartMargin;
      for (let Dt = 0; Dt <= q; Dt++) {
        const ce = Q + (rt - Q) * (Dt / q), Xi = u(ce, H, O) * _e, gn = p(ce);
        if (gn !== null) {
          let Ms = s.chartHeight - s.chartBottomMargin - Xi;
          Ms = Math.max(Ms, xs), N.push(`${Dt === 0 ? "M" : "L"} ${gn} ${Ms}`);
        }
      }
      return N.join(" ");
    }), g = T(() => {
      if (!s.histogram || s.histogram.length === 0) return [];
      const H = o.value / 10;
      return s.histogram.map((O, N) => {
        const q = s.chartMargin + (N + 0.5) * H, Q = O.count > 0 ? O.count / c.value * r.value : 0, rt = s.chartHeight - s.chartBottomMargin - Q;
        return {
          score: O.score,
          count: O.count,
          x: q,
          y: rt,
          height: Q
        };
      });
    }), p = (H) => {
      if (H < 1 || H > 10) return null;
      const O = o.value / 10;
      return s.chartMargin + (H - 0.5) * O;
    }, v = T(() => p(s.minScore)), m = T(() => p(s.maxScore)), b = T(() => p(s.q1Score)), y = T(() => p(s.medianScore)), x = T(() => p(s.q3Score)), M = T(() => p(s.averageScore)), w = T(() => s.minScore), C = T(() => s.maxScore), $ = T(() => s.q1Score), A = T(() => s.medianScore), L = T(() => s.q3Score), D = T(() => s.averageScore), F = T(() => {
      const H = [], O = s.chartMargin - 8, N = 18;
      b.value !== null && H.push({
        x: b.value,
        y: O,
        value: s.q1Score,
        label: `Q1: ${$.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), y.value !== null && H.push({
        x: y.value,
        y: O - N,
        value: s.medianScore,
        label: `Median: ${A.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), M.value !== null && H.push({
        x: M.value,
        y: O - N,
        value: s.averageScore,
        label: `Avg: ${D.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), x.value !== null && H.push({
        x: x.value,
        y: O,
        value: s.q3Score,
        label: `Q3: ${L.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), H.sort((rt, ct) => (rt.x || 0) - (ct.x || 0));
      const q = [[], [], []];
      H.forEach((rt) => {
        if (rt.x === null) return;
        let ct = -1;
        for (let mt = 0; mt < q.length; mt++) {
          let Ct = !1;
          for (const _e of q[mt]) {
            if (_e.x === null) continue;
            const xs = Math.abs(rt.x - _e.x), Dt = (rt.width + _e.width) / 2 + 10;
            if (xs < Dt) {
              Ct = !0;
              break;
            }
          }
          if (!Ct) {
            ct = mt;
            break;
          }
        }
        ct === -1 && (ct = q.length - 1), rt.y = O - ct * N, q[ct].push(rt);
      });
      const Q = 15;
      return H.forEach((rt) => {
        rt.y < Q && (rt.y = Q);
      }), H;
    }), P = (H) => F.value.find((N) => N.id === H)?.y || s.chartMargin - 10, R = T(() => {
      const H = [];
      for (let N = 0; N <= 5; N++) {
        const q = Math.round(c.value / 5 * N), Q = s.chartHeight - s.chartBottomMargin - N / 5 * r.value;
        H.push({ value: q, y: Q });
      }
      return H;
    }), E = (H, O) => {
      const N = H.currentTarget.closest("svg");
      if (!N) return;
      const q = N.getBoundingClientRect(), Q = N.createSVGPoint();
      Q.x = H.clientX - q.left, Q.y = H.clientY - q.top;
      const rt = `Score: ${O.score}`, ct = `Count: ${O.count}`, mt = 120, Ct = 48;
      i.value = {
        visible: !0,
        x: Q.x,
        y: Q.y - 20,
        title: rt,
        text: ct,
        width: mt,
        height: Ct
      };
    }, I = (H) => {
      if (i.value.visible) {
        const O = H.currentTarget, N = O.getBoundingClientRect(), q = O.createSVGPoint();
        q.x = H.clientX - N.left, q.y = H.clientY - N.top, i.value.x = q.x, i.value.y = q.y - 20;
      }
    }, U = () => {
      i.value.visible = !1;
    }, st = () => {
      i.value.visible = !1;
    };
    return t({ isDark: n }), (H, O) => (_(), k("div", zu, [
      (_(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: bt(`min-height: ${e.chartHeight}px;`),
        onMousemove: I,
        onMouseleave: U
      }, [
        i.value.visible ? (_(), k("g", {
          key: 0,
          transform: `translate(${i.value.x}, ${i.value.y})`
        }, [
          d("rect", {
            x: -i.value.width / 2,
            y: -i.value.height - 10,
            width: i.value.width,
            height: i.value.height,
            fill: a.value.tooltipBg,
            rx: "8",
            stroke: a.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, Hu),
          d("text", {
            x: "0",
            y: -i.value.height + 8,
            "text-anchor": "middle",
            fill: a.value.tooltipText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, S(i.value.title), 9, Vu),
          d("text", {
            x: "0",
            y: -i.value.height + 26,
            "text-anchor": "middle",
            fill: a.value.tooltipTextSecondary,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, S(i.value.text), 9, ju)
        ], 8, Nu)) : z("", !0),
        (_(!0), k(X, null, ot(R.value, (N, q) => (_(), k("line", {
          key: `grid-${q}`,
          x1: e.chartMargin,
          y1: N.y,
          x2: e.chartWidth - e.chartMargin,
          y2: N.y,
          stroke: a.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Yu))), 128)),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: a.value.axis,
          "stroke-width": "2"
        }, null, 8, Uu),
        d("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: a.value.axis
        }, null, 8, qu),
        (_(!0), k(X, null, ot(R.value, (N, q) => (_(), k(X, {
          key: `y-tick-${q}`
        }, [
          d("line", {
            x1: e.chartMargin - 6,
            y1: N.y,
            x2: e.chartMargin,
            y2: N.y,
            stroke: a.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Xu),
          d("text", {
            x: e.chartMargin - 12,
            y: N.y + 4,
            "text-anchor": "end",
            fill: a.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, S(N.value), 9, Ku)
        ], 64))), 128)),
        d("text", {
          x: e.chartMargin - 35,
          y: e.chartHeight / 2,
          "text-anchor": "middle",
          fill: a.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif",
          transform: `rotate(-90, ${e.chartMargin - 35}, ${e.chartHeight / 2})`
        }, " Count ", 8, Gu),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: a.value.axis,
          "stroke-width": "2"
        }, null, 8, Zu),
        d("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: a.value.axis
        }, null, 8, Qu),
        (_(!0), k(X, null, ot(g.value, (N, q) => (_(), k(X, {
          key: `tick-${q}`
        }, [
          d("line", {
            x1: N.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: N.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: a.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Ju),
          d("text", {
            x: N.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: a.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, S(N.score), 9, tf)
        ], 64))), 128)),
        d("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: a.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, ef),
        f.value ? (_(), k("path", {
          key: 1,
          d: f.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, sf)) : z("", !0),
        (_(!0), k(X, null, ot(g.value, (N, q) => (_(), k("rect", {
          key: `bar-${q}`,
          x: N.x - l.value / 2,
          y: N.y,
          width: l.value,
          height: N.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (Q) => E(Q, N),
          onMouseleave: st,
          style: { cursor: "pointer" }
        }, null, 40, nf))), 128)),
        v.value ? (_(), k("line", {
          key: 2,
          x1: v.value,
          y1: e.chartMargin,
          x2: v.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, af)) : z("", !0),
        v.value ? (_(), k("text", {
          key: 3,
          x: v.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + S(w.value.toFixed(1)), 9, of)) : z("", !0),
        b.value ? (_(), k("line", {
          key: 4,
          x1: b.value,
          y1: e.chartMargin,
          x2: b.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, rf)) : z("", !0),
        b.value ? (_(), k("text", {
          key: 5,
          x: b.value,
          y: P("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + S($.value.toFixed(1)), 9, lf)) : z("", !0),
        y.value ? (_(), k("line", {
          key: 6,
          x1: y.value,
          y1: e.chartMargin,
          x2: y.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, cf)) : z("", !0),
        y.value ? (_(), k("text", {
          key: 7,
          x: y.value,
          y: P("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + S(A.value.toFixed(1)), 9, df)) : z("", !0),
        M.value ? (_(), k("line", {
          key: 8,
          x1: M.value,
          y1: e.chartMargin,
          x2: M.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, hf)) : z("", !0),
        M.value ? (_(), k("text", {
          key: 9,
          x: M.value,
          y: P("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + S(D.value.toFixed(1)), 9, uf)) : z("", !0),
        x.value ? (_(), k("line", {
          key: 10,
          x1: x.value,
          y1: e.chartMargin,
          x2: x.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#7c3aed",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, ff)) : z("", !0),
        x.value ? (_(), k("text", {
          key: 11,
          x: x.value,
          y: P("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + S(L.value.toFixed(1)), 9, gf)) : z("", !0),
        m.value ? (_(), k("line", {
          key: 12,
          x1: m.value,
          y1: e.chartMargin,
          x2: m.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, pf)) : z("", !0),
        m.value ? (_(), k("text", {
          key: 13,
          x: m.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + S(C.value.toFixed(1)), 9, bf)) : z("", !0),
        e.showLegend ? (_(), k("g", {
          key: 14,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          d("g", vf, [
            O[0] || (O[0] = d("line", {
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
              fill: a.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Gaussian ", 8, yf)
          ]),
          d("g", _f, [
            O[1] || (O[1] = d("line", {
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
              fill: a.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, xf)
          ]),
          d("g", kf, [
            O[2] || (O[2] = d("line", {
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
              fill: a.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, Mf)
          ]),
          d("g", Sf, [
            O[3] || (O[3] = d("line", {
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
              fill: a.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, wf)
          ]),
          d("g", Cf, [
            O[4] || (O[4] = d("line", {
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
              fill: a.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, $f)
          ]),
          d("g", Df, [
            O[5] || (O[5] = d("line", {
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
              fill: a.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, Af)
          ]),
          d("g", Tf, [
            O[6] || (O[6] = d("line", {
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
              fill: a.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Ff)
          ])
        ], 8, mf)) : z("", !0)
      ], 44, Wu))
    ]));
  }
}), Yi = /* @__PURE__ */ G(Bf, [["__scopeId", "data-v-e67a4773"]]), Pf = { class: "chart-container" }, Lf = {
  key: 1,
  class: "chart-wrapper"
}, Ef = /* @__PURE__ */ Z({
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
    mn.use([Qi, Ji, to, eo]);
    const s = e, { isDark: n, colors: a } = tt(J(s, "theme")), i = xt(null), o = xt(!0), r = xt(!1);
    let l = null;
    const c = {
      animation: { duration: 1e3, easing: "cubicOut" },
      margins: { left: "2%", right: "2%", top: "2%", bottom: "2%" },
      node: { width: 70, gap: 20, align: "left", iterations: 64 },
      style: {
        shadowBlur: 4,
        shadowColor: "rgba(139, 92, 246, 0.15)"
      }
    }, h = [
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
    ], u = () => {
      const x = s.data.links.filter(
        ($) => $.source && $.target && typeof $.value == "number"
      ), M = Math.max(...x.map(($) => $.value), 1), w = Math.max(1, M * 0.01), C = x.map(($) => ({
        ...$,
        originalValue: $.value,
        value: $.value < M * 0.01 ? w : $.value
      }));
      return {
        nodes: s.data.nodes.filter(($) => $.name),
        links: C
      };
    }, f = (x) => x.map((M, w) => ({
      ...M,
      itemStyle: {
        color: s.nodeColors[M.name] || h[w % h.length],
        borderRadius: 8
      }
    })), g = (x) => (M) => {
      const w = M.dataType === "node", C = a.value.tooltipText, $ = n.value ? "#d1d5db" : "#e2e8f0";
      if (w) {
        const P = x.filter((I) => I.target === M.name), R = x.filter((I) => I.source === M.name), E = P.length > 0 ? P.reduce((I, U) => I + (U.originalValue || U.value), 0) : R.reduce((I, U) => I + (U.originalValue || U.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${C};">${M.name}</div><div style="color: ${$}; font-size: 12px;">Count: ${E.toLocaleString()}</div>`;
      }
      const A = M.data?.source || M.source || "Unknown", L = M.data?.target || M.target || "Unknown", D = M.data?.originalValue || M.data?.value || M.value || 0, F = M.data?.label || `${D.toLocaleString()}`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${C};">${A} → ${L}</div><div style="color: ${$}; font-size: 12px;">Flow: ${F}</div>`;
    }, p = () => {
      if (!(!l || !s.data.nodes?.length || !s.data.links?.length))
        try {
          const { nodes: x, links: M } = u(), w = f(x), C = {
            tooltip: {
              trigger: "item",
              triggerOn: "mousemove",
              formatter: g(M),
              backgroundColor: a.value.tooltipBg,
              borderColor: n.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
              borderWidth: 1,
              borderRadius: 8,
              padding: [10, 14],
              textStyle: {
                color: a.value.tooltipText,
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
                links: M,
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
                itemStyle: c.style,
                label: {
                  show: !0,
                  position: "inside",
                  color: "#ffffff",
                  fontWeight: 600,
                  fontSize: 12,
                  fontFamily: "'DM Sans', sans-serif",
                  formatter: ($) => {
                    const A = $.name || "";
                    return A.length > 15 ? `${A.substring(0, 15)}...` : A;
                  }
                },
                edgeLabel: {
                  show: !0,
                  fontSize: 11,
                  color: a.value.textSecondary,
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  formatter: ($) => {
                    const A = $.data?.originalValue || $.value || 0;
                    return $.data?.label || `${A.toLocaleString()}`;
                  }
                },
                nodeAlign: c.node.align,
                nodeGap: s.nodeGap,
                nodeWidth: c.node.width,
                layoutIterations: c.node.iterations,
                orient: "horizontal",
                draggable: !1,
                ...c.margins
              }
            ],
            backgroundColor: "transparent",
            animation: !0,
            animationDuration: c.animation.duration,
            animationEasing: c.animation.easing
          };
          l.setOption(C);
        } catch (x) {
          console.error("Error setting Sankey chart options:", x), r.value = !0;
        }
    }, v = async () => {
      if (i.value)
        try {
          l = mn.init(i.value), p(), window.addEventListener("resize", b);
        } catch (x) {
          console.error("Error initializing Sankey chart:", x), r.value = !0;
        } finally {
          o.value = !1;
        }
    }, m = async (x = 40) => {
      await Ya();
      for (let M = 0; M < x; M++) {
        if (i.value?.clientWidth && i.value.clientWidth > 0 && i.value?.clientHeight && i.value.clientHeight > 0)
          return await v();
        await new Promise((w) => setTimeout(w, 50));
      }
      await v(), setTimeout(b, 50);
    }, b = () => l?.resize(), y = () => {
      window.removeEventListener("resize", b), l && (l.dispose(), l = null);
    };
    return us(() => i.value && m()), Gi(y), Xt(() => s.data, p, { deep: !0 }), Xt(n, p), t({ isDark: n }), (x, M) => (_(), k("div", Pf, [
      r.value ? (_(), k("div", {
        key: 0,
        class: "error-state",
        style: bt({ height: e.height })
      }, [...M[0] || (M[0] = [
        V('<div class="error-content" data-v-e8598dd9><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e8598dd9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-e8598dd9></path></svg><p class="error-title" data-v-e8598dd9>Chart could not be loaded</p><p class="error-description" data-v-e8598dd9>Please check the data format.</p></div>', 1)
      ])], 4)) : (_(), k("div", Lf, [
        pn(d("div", {
          ref_key: "chartEl",
          ref: i,
          class: "chart-content",
          style: bt({ height: e.height })
        }, null, 4), [
          [bn, !o.value]
        ]),
        pn(d("div", {
          class: "loading-state",
          style: bt({ height: e.height })
        }, [...M[1] || (M[1] = [
          V('<div class="loading-container" data-v-e8598dd9><div class="sankey-loader" data-v-e8598dd9><div class="flow flow-1" data-v-e8598dd9></div><div class="flow flow-2" data-v-e8598dd9></div><div class="flow flow-3" data-v-e8598dd9></div><div class="flow flow-4" data-v-e8598dd9></div></div><p class="loading-text" data-v-e8598dd9>Loading Sankey diagram...</p></div>', 1)
        ])], 4), [
          [bn, o.value]
        ])
      ]))
    ]));
  }
}), le = /* @__PURE__ */ G(Ef, [["__scopeId", "data-v-e8598dd9"]]);
function Of(e, t) {
  return _(), k("svg", {
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
      d: "M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
    })
  ]);
}
function Rf(e, t) {
  return _(), k("svg", {
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
      d: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
    })
  ]);
}
function wt(e, t) {
  return _(), k("svg", {
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
function If(e, t) {
  return _(), k("svg", {
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
function za(e, t) {
  return _(), k("svg", {
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
function zf(e, t) {
  return _(), k("svg", {
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
      d: "M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    })
  ]);
}
function Wf(e, t) {
  return _(), k("svg", {
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
      d: "M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
    })
  ]);
}
function Nf(e, t) {
  return _(), k("svg", {
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
      d: "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
    })
  ]);
}
function Hf(e, t) {
  return _(), k("svg", {
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
      d: "M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
    })
  ]);
}
const Vf = { class: "chart-footer" }, jf = { class: "export-actions" }, Yf = { class: "export-buttons" }, Uf = ["disabled"], qf = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Xf = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Kf = ["disabled"], Gf = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Zf = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Qf = /* @__PURE__ */ Z({
  __name: "FooterExport",
  props: {
    formats: { default: () => ["pdf", "csv"] },
    loading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const s = e, n = t, a = (o) => s.formats.includes(o), i = (o) => {
      s.loading || n("export", o);
    };
    return (o, r) => (_(), k("footer", Vf, [
      r[9] || (r[9] = d("div", { class: "footer-divider" }, null, -1)),
      d("div", jf, [
        r[8] || (r[8] = d("span", { class: "export-label" }, "Export", -1)),
        d("div", Yf, [
          a("pdf") ? (_(), k("button", {
            key: 0,
            type: "button",
            class: as(["export-btn", { "is-loading": e.loading }]),
            disabled: e.loading,
            title: "Download PDF",
            onClick: r[0] || (r[0] = (l) => i("pdf"))
          }, [
            e.loading ? (_(), k("svg", qf, [...r[2] || (r[2] = [
              d("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                "stroke-opacity": "0.25"
              }, null, -1),
              d("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
            ])])) : (_(), k("svg", Xf, [...r[3] || (r[3] = [
              V('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-672661d4></path><polyline points="14 2 14 8 20 8" data-v-672661d4></polyline><line x1="16" y1="13" x2="8" y2="13" data-v-672661d4></line><line x1="16" y1="17" x2="8" y2="17" data-v-672661d4></line><polyline points="10 9 9 9 8 9" data-v-672661d4></polyline>', 5)
            ])])),
            r[4] || (r[4] = d("span", null, "PDF", -1))
          ], 10, Uf)) : z("", !0),
          a("csv") ? (_(), k("button", {
            key: 1,
            type: "button",
            class: as(["export-btn", { "is-loading": e.loading }]),
            disabled: e.loading,
            title: "Download CSV",
            onClick: r[1] || (r[1] = (l) => i("csv"))
          }, [
            e.loading ? (_(), k("svg", Gf, [...r[5] || (r[5] = [
              d("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                "stroke-opacity": "0.25"
              }, null, -1),
              d("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
            ])])) : (_(), k("svg", Zf, [...r[6] || (r[6] = [
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
            r[7] || (r[7] = d("span", null, "CSV", -1))
          ], 10, Kf)) : z("", !0)
        ])
      ])
    ]));
  }
}), gt = /* @__PURE__ */ G(Qf, [["__scopeId", "data-v-672661d4"]]), Jf = { class: "agents-per-day-card" }, tg = {
  key: 0,
  class: "card-body"
}, eg = {
  key: 0,
  class: "chart-section"
}, sg = {
  key: 1,
  class: "empty-state"
}, ng = { class: "empty-state-content" }, ag = { class: "empty-icon-wrapper" }, ig = {
  key: 1,
  class: "loading-state"
}, og = /* @__PURE__ */ Z({
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
    }, a = e, i = s, o = (f) => {
      i("export", f);
    }, { isDark: r, colors: l } = tt(J(a, "theme")), c = (f) => {
      const g = new Date(f), p = String(g.getDate()).padStart(2, "0"), v = String(g.getMonth() + 1).padStart(2, "0");
      return `${p}-${v}`;
    }, h = T(() => {
      const f = a.data?.agents_by_day || {}, g = Object.keys(f).sort();
      if (g.length === 0)
        return { labels: [], datasets: [] };
      const p = g.map((x) => c(x)), v = /* @__PURE__ */ new Set();
      for (const x of Object.values(f))
        for (const M of Object.keys(x))
          v.add(M);
      const m = Array.from(v), b = (x) => x, y = m.map((x) => ({
        label: x,
        data: g.map((M) => f[M]?.[x] || 0),
        backgroundColor: `${n[x] || "#94a3b8"}80`,
        borderColor: b(n[x] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: p,
        datasets: y
      };
    }), u = T(() => a.options ? a.options : {
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
    return t({ isDark: r }), (f, g) => (_(), k("article", Jf, [
      g[3] || (g[3] = d("header", { class: "card-header" }, [
        d("div", { class: "header-content" }, [
          d("h3", { class: "card-title" }, "Agents Total Messages per Day"),
          d("p", { class: "card-subtitle" }, "Daily agent interactions (stacked)")
        ])
      ], -1)),
      e.loading ? (_(), k("div", ig, [...g[2] || (g[2] = [
        V('<div class="loading-container" data-v-4d18c22c><div class="chart-lines-loader" data-v-4d18c22c><div class="line line-1" data-v-4d18c22c></div><div class="line line-2" data-v-4d18c22c></div><div class="line line-3" data-v-4d18c22c></div><div class="line line-4" data-v-4d18c22c></div><div class="line line-5" data-v-4d18c22c></div></div><p class="loading-text" data-v-4d18c22c>Loading chart data...</p></div>', 1)
      ])])) : (_(), k("div", tg, [
        h.value.labels && h.value.labels.length ? (_(), k("section", eg, [
          j(Gt, {
            data: h.value,
            options: u.value,
            stacked: !0
          }, null, 8, ["data", "options"]),
          e.enableExport ? (_(), ht(B(gt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : z("", !0)
        ])) : (_(), k("section", sg, [
          d("div", ng, [
            d("div", ag, [
              j(B(wt), { class: "empty-icon" })
            ]),
            g[0] || (g[0] = d("p", { class: "empty-title" }, "No agents data per day", -1)),
            g[1] || (g[1] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see daily agent interactions.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), rg = /* @__PURE__ */ G(og, [["__scopeId", "data-v-4d18c22c"]]), W = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), it = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), lg = { class: "booking-manager-card" }, cg = { class: "card-header" }, dg = { class: "header-content" }, hg = {
  key: 0,
  class: "payment-success-badge"
}, ug = { class: "badge-value" }, fg = {
  key: 0,
  class: "loading-state"
}, gg = {
  key: 1,
  class: "error-state"
}, pg = { class: "error-content" }, bg = { class: "error-description" }, mg = {
  key: 2,
  class: "card-body"
}, vg = { class: "chart-section" }, yg = { class: "chart-wrapper" }, _g = {
  key: 0,
  class: "table-section"
}, xg = { class: "table-wrapper" }, kg = { class: "data-table" }, Mg = { class: "table-body" }, Sg = { class: "table-cell font-medium" }, wg = { class: "table-cell text-center" }, Cg = { class: "table-cell text-center" }, $g = { class: "percentage-text" }, Dg = { class: "table-cell text-center" }, Ag = { class: "table-cell" }, Tg = { class: "badges-container" }, Fg = { class: "badge badge-success" }, Bg = { class: "badge badge-error" }, Pg = { class: "table-cell" }, Lg = { class: "badges-container" }, Eg = { class: "badge badge-error" }, Og = { class: "badge badge-warning" }, Rg = { class: "badge badge-yellow" }, Ig = { class: "badge badge-error" }, zg = {
  key: 1,
  class: "empty-state"
}, Wg = /* @__PURE__ */ Z({
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
      booking_manager_by_day: []
    }) },
    loading: { type: Boolean, default: !1 },
    error: { default: null },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const s = e, n = t, a = (c) => {
      n("export", c);
    }, i = T(() => s.data?.booking_manager_by_day ? [...s.data.booking_manager_by_day].sort(
      (c, h) => new Date(c.date).getTime() - new Date(h.date).getTime()
    ) : []), o = T(() => {
      const c = s.data, h = c.total_booking_initiated || 0, u = c.total_booking_started || 0, f = c.total_payment_initiated || 0, g = c.total_not_found || 0, p = c.total_cancelled || 0, v = c.total_no_pending_balance || 0, m = c.total_errors || 0, b = c.total_payment_success || 0, y = c.total_payment_failed || 0, x = Math.max(0, h - u), M = Math.max(0, u - f - g - p - v - m), w = (A, L) => {
        const D = L > 0 ? Math.round(A / L * 100) : 0;
        return `${A.toLocaleString()} (${D}%)`;
      }, C = [
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
      ], $ = [];
      return u > 0 && $.push({
        source: "Initiated",
        target: "Started",
        value: u,
        label: w(u, h)
      }), x > 0 && $.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: x,
        label: w(x, h)
      }), f > 0 && $.push({
        source: "Started",
        target: "Payment Initiated",
        value: f,
        label: w(f, u)
      }), g > 0 && $.push({
        source: "Started",
        target: "Not Found",
        value: g,
        label: w(g, u)
      }), p > 0 && $.push({
        source: "Started",
        target: "Cancelled",
        value: p,
        label: w(p, u)
      }), v > 0 && $.push({
        source: "Started",
        target: "No Pending Balance",
        value: v,
        label: w(v, u)
      }), m > 0 && $.push({
        source: "Started",
        target: "Errors",
        value: m,
        label: w(m, u)
      }), M > 0 && $.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: M,
        label: w(M, u)
      }), b > 0 && $.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: b,
        label: w(b, f)
      }), y > 0 && $.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: y,
        label: w(y, f)
      }), { nodes: C, links: $ };
    }), r = {
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
    }, l = (c, h) => !h || h === 0 ? "0%" : `${Math.round(c / h * 100)}%`;
    return (c, h) => (_(), k("article", lg, [
      d("header", cg, [
        d("div", dg, [
          h[1] || (h[1] = d("div", { class: "title-section" }, [
            d("h3", { class: "card-title" }, "Booking Manager Metrics"),
            d("p", { class: "card-subtitle" }, "Booking manager workflow tracking and analysis")
          ], -1)),
          s.loading ? z("", !0) : (_(), k("div", hg, [
            h[0] || (h[0] = d("p", { class: "badge-label" }, "Payment Success", -1)),
            d("p", ug, S(B(W)(s.data.total_payment_success || 0)), 1)
          ]))
        ])
      ]),
      s.loading ? (_(), k("div", fg, [...h[2] || (h[2] = [
        V('<div class="loading-container" data-v-5c06c864><div class="chart-flow-loader" data-v-5c06c864><div class="flow-line flow-1" data-v-5c06c864></div><div class="flow-line flow-2" data-v-5c06c864></div><div class="flow-line flow-3" data-v-5c06c864></div><div class="flow-line flow-4" data-v-5c06c864></div><div class="flow-line flow-5" data-v-5c06c864></div></div><p class="loading-text" data-v-5c06c864>Loading booking data...</p></div>', 1)
      ])])) : s.error ? (_(), k("div", gg, [
        d("div", pg, [
          h[3] || (h[3] = d("div", { class: "error-icon-wrapper" }, [
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
          h[4] || (h[4] = d("p", { class: "error-title" }, "Error loading data", -1)),
          d("p", bg, S(s.error), 1)
        ])
      ])) : (_(), k("div", mg, [
        d("section", vg, [
          d("div", yg, [
            j(le, {
              data: o.value,
              "node-colors": r,
              height: "500px",
              "node-gap": 15
            }, null, 8, ["data"])
          ])
        ]),
        i.value.length > 0 ? (_(), k("section", _g, [
          h[6] || (h[6] = d("div", { class: "section-header" }, [
            d("h4", { class: "section-title" }, "Daily Overview")
          ], -1)),
          d("div", xg, [
            d("table", kg, [
              h[5] || (h[5] = d("thead", null, [
                d("tr", { class: "table-header-row" }, [
                  d("th", { class: "table-header" }, "Date"),
                  d("th", { class: "table-header" }, "Initiated"),
                  d("th", { class: "table-header" }, "Started"),
                  d("th", { class: "table-header" }, "Payment Initiated"),
                  d("th", { class: "table-header" }, "Payment Results"),
                  d("th", { class: "table-header" }, "Outcomes")
                ])
              ], -1)),
              d("tbody", Mg, [
                (_(!0), k(X, null, ot(i.value, (u) => (_(), k("tr", {
                  key: u.date,
                  class: "table-row"
                }, [
                  d("td", Sg, S(B(Tt)(u.date).format("DD/MM/YYYY")), 1),
                  d("td", wg, S(B(W)(u.booking_initiated_count)), 1),
                  d("td", Cg, [
                    pe(S(B(W)(u.booking_started_count)) + " ", 1),
                    d("span", $g, " (" + S(l(u.booking_started_count, u.booking_initiated_count)) + ") ", 1)
                  ]),
                  d("td", Dg, S(B(W)(u.payment_initiated_count)), 1),
                  d("td", Ag, [
                    d("div", Tg, [
                      d("span", Fg, " Success: " + S(u.payment_success_count ? B(W)(u.payment_success_count) : "N/A"), 1),
                      d("span", Bg, " Failed: " + S(u.payment_failed_count ? B(W)(u.payment_failed_count) : "N/A"), 1)
                    ])
                  ]),
                  d("td", Pg, [
                    d("div", Lg, [
                      d("span", Eg, " Not Found: " + S(u.not_found_count ? B(W)(u.not_found_count) : "N/A"), 1),
                      d("span", Og, " Cancelled: " + S(u.cancelled_count ? B(W)(u.cancelled_count) : "N/A"), 1),
                      d("span", Rg, " No Balance: " + S(u.no_pending_balance_count ? B(W)(u.no_pending_balance_count) : "N/A"), 1),
                      d("span", Ig, " Errors: " + S(u.error_count ? B(W)(u.error_count) : "N/A"), 1)
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (_(), ht(B(gt), {
            key: 0,
            onExport: a,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : z("", !0)
        ])) : (_(), k("section", zg, [...h[7] || (h[7] = [
          V('<div class="empty-state-content" data-v-5c06c864><div class="empty-icon-wrapper" data-v-5c06c864><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-5c06c864><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" data-v-5c06c864></path></svg></div><p class="empty-title" data-v-5c06c864>No booking manager data available</p><p class="empty-description" data-v-5c06c864>No booking manager data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Ng = /* @__PURE__ */ G(Wg, [["__scopeId", "data-v-5c06c864"]]), Hg = { class: "checkin-metrics-card" }, Vg = {
  key: 0,
  class: "loading-state"
}, jg = {
  key: 1,
  class: "card-body"
}, Yg = {
  key: 0,
  class: "chart-section"
}, Ug = { class: "chart-wrapper" }, qg = {
  key: 1,
  class: "table-section"
}, Xg = { class: "table-wrapper" }, Kg = { class: "data-table" }, Gg = { class: "table-body" }, Zg = { class: "table-cell font-medium" }, Qg = { class: "table-cell text-center" }, Jg = { class: "table-cell text-center" }, tp = { class: "table-cell text-center" }, ep = { class: "table-cell text-center" }, sp = { class: "table-cell text-center" }, np = { class: "table-cell text-center" }, ap = { class: "table-cell text-left" }, ip = {
  key: 0,
  class: "failed-steps"
}, op = { class: "step-name" }, rp = { class: "step-count" }, lp = {
  key: 1,
  class: "empty-cell"
}, cp = {
  key: 2,
  class: "empty-state"
}, dp = {
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
        unrecovered_by_step: []
      })
    }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const s = t, n = (m) => {
      s("export", m);
    }, a = e, i = {
      total_checkin_init: 0,
      total_checkin_initiated: 0,
      total_checkin_init_abandoned: 0,
      total_checkin_started: 0,
      total_checkin_completed: 0,
      total_checkin_closed: 0,
      total_checkin_unrecovered: 0,
      checkin_by_day: []
    }, o = {
      total_checkin_failed: 0,
      failed_by_step_by_day: [],
      unrecovered_by_step: []
    }, r = xt([]), l = T(() => {
      const m = a.data, b = m?.checkin ?? m;
      return b && (Array.isArray(b.checkin_by_day) && b.checkin_by_day.length > 0 || (b.total_checkin_initiated ?? 0) > 0) ? { ...i, ...b } : a.checkinData ?? i;
    }), c = T(() => {
      const m = a.data, b = m?.failed ?? m;
      return b && (Array.isArray(b.failed_by_step_by_day) && b.failed_by_step_by_day.length > 0 || Array.isArray(b.unrecovered_by_step) && b.unrecovered_by_step.length > 0) ? {
        ...o,
        failed_by_step_by_day: b.failed_by_step_by_day ?? [],
        unrecovered_by_step: b.unrecovered_by_step ?? []
      } : a.failedData ?? o;
    }), h = T(() => {
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
      return (c.value.unrecovered_by_step || []).forEach((y) => {
        const M = y.step_name.replace(/_/g, " ").split(" ").map((C) => C.charAt(0).toUpperCase() + C.slice(1)).join(" "), w = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        m[M] = w[M] || "#DC2626";
      }), m;
    }), u = (m, b) => !b || b === 0 ? "0%" : `${Math.round(m / b * 100)}%`, f = (m, b) => {
      const y = W(m), x = u(m, b);
      return `${y} (${x})`;
    }, g = (m) => m.reduce((b, y) => b + y.failed_count, 0), p = T(() => {
      const m = [], b = [];
      if (!l.value.total_checkin_initiated)
        return { nodes: m, links: b };
      m.push({ name: "Checkin Init" }), m.push({ name: "Booking retrive" }), m.push({ name: "Booking retrive success" }), m.push({ name: "Number of Passengers" }), m.push({ name: "Completed" }), m.push({ name: "Closed with BP" });
      const y = l.value.total_checkin_initiated, x = l.value.total_checkin_init, M = l.value.total_checkin_init_abandoned, w = x - M, C = l.value.total_checkin_started, $ = l.value.total_checkin_completed, A = l.value.total_checkin_closed, L = c.value.unrecovered_by_step || [], D = L.reduce((E, I) => E + I.count, 0);
      if (x > 0) {
        const E = Math.round(x / y * 100);
        b.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: x,
          label: `${x.toLocaleString()} (${E}%)`
        });
      }
      const F = y - x;
      if (F > 0) {
        const E = Math.round(F / y * 100);
        m.push({ name: "Abandoned (Init)" }), b.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: F,
          label: `${F.toLocaleString()} (${E}%)`
        });
      }
      if (M > 0) {
        const E = Math.round(M / y * 100);
        m.push({ name: "Abandoned (Started)" }), b.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: M,
          label: `${M.toLocaleString()} (${E}%)`
        });
      }
      if (w > 0) {
        const E = Math.round(w / y * 100);
        b.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: w,
          label: `${w.toLocaleString()} (${E}%)`
        });
      }
      if (C > 0) {
        const E = Math.round(C / y * 100);
        b.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: C,
          label: `${C.toLocaleString()} (${E}%)`
        });
      }
      if ($ > 0) {
        const E = Math.round($ / C * 100);
        b.push({
          source: "Number of Passengers",
          target: "Completed",
          value: $,
          label: `${$.toLocaleString()} (${E}%)`
        });
      }
      if (L.length > 0 && D > 0) {
        m.push({ name: "Unrecovered" });
        const E = Math.round(D / C * 100);
        b.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: D,
          label: `${D.toLocaleString()} (${E}%)`
        }), L.forEach((I) => {
          const st = I.step_name.replace(/_/g, " ").split(" ").map((O) => O.charAt(0).toUpperCase() + O.slice(1)).join(" "), H = Math.round(I.count / C * 100);
          m.push({ name: st }), b.push({
            source: "Unrecovered",
            target: st,
            value: I.count,
            label: `${I.count.toLocaleString()} (${H}%)`
          });
        });
      }
      const P = C - ($ + D);
      if (P > 0) {
        const E = Math.round(P / C * 100);
        m.push({ name: "Abandoned (Flow)" }), b.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: P,
          label: `${P.toLocaleString()} (${E}%)`
        });
      }
      const R = $ - A;
      if (R > 0) {
        const E = Math.round(R / C * 100);
        m.push({ name: "BP Error" }), b.push({
          source: "Completed",
          target: "BP Error",
          value: R,
          label: `${R.toLocaleString()} (${E}%)`
        });
      }
      if (A > 0) {
        const E = Math.round(A / C * 100);
        b.push({
          source: "Completed",
          target: "Closed with BP",
          value: A,
          label: `${A.toLocaleString()} (${E}%)`
        });
      }
      return { nodes: m, links: b };
    }), v = () => {
      const m = l.value.checkin_by_day || [], b = c.value.failed_by_step_by_day || [];
      if (m.length === 0) {
        r.value = [];
        return;
      }
      r.value = [...m].map((y) => {
        const x = b.find(
          (M) => M.date === y.date
        );
        return {
          ...y,
          failed_steps: x?.steps || []
        };
      }), r.value.sort((y, x) => new Date(y.date) - new Date(x.date));
    };
    return Xt(
      [() => a.checkinData, () => a.failedData],
      () => {
        v();
      },
      { deep: !0, immediate: !0 }
    ), (m, b) => (_(), k("article", Hg, [
      b[3] || (b[3] = d("header", { class: "card-header" }, [
        d("div", { class: "header-content" }, [
          d("h3", { class: "card-title" }, "Check-in Metrics"),
          d("p", { class: "card-subtitle" }, "Check-in performance and failure analysis")
        ])
      ], -1)),
      a.loading ? (_(), k("div", Vg, [...b[0] || (b[0] = [
        V('<div class="loading-container" data-v-dc331730><div class="chart-flow-loader" data-v-dc331730><div class="flow-line flow-1" data-v-dc331730></div><div class="flow-line flow-2" data-v-dc331730></div><div class="flow-line flow-3" data-v-dc331730></div><div class="flow-line flow-4" data-v-dc331730></div><div class="flow-line flow-5" data-v-dc331730></div></div><p class="loading-text" data-v-dc331730>Loading check-in data...</p></div>', 1)
      ])])) : (_(), k("div", jg, [
        p.value.nodes.length > 0 ? (_(), k("section", Yg, [
          d("div", Ug, [
            j(le, {
              data: p.value,
              height: "500px",
              "node-colors": h.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : z("", !0),
        r.value && r.value.length > 0 ? (_(), k("section", qg, [
          d("div", Xg, [
            d("table", Kg, [
              b[1] || (b[1] = d("thead", null, [
                d("tr", { class: "table-header-row" }, [
                  d("th", { class: "table-header" }, "Date"),
                  d("th", { class: "table-header" }, "Checkin Init"),
                  d("th", { class: "table-header" }, "Booking Retrieve (%)"),
                  d("th", { class: "table-header" }, "Number of Passengers"),
                  d("th", { class: "table-header" }, "Completed (%)"),
                  d("th", { class: "table-header" }, "Closed with BP (%)"),
                  d("th", { class: "table-header" }, "Failed (%)"),
                  d("th", { class: "table-header" }, "Failed (Reasons)")
                ])
              ], -1)),
              d("tbody", Gg, [
                (_(!0), k(X, null, ot(r.value, (y) => (_(), k("tr", {
                  key: y.date,
                  class: "table-row"
                }, [
                  d("td", Zg, S(B(Tt)(y.date).format("DD/MM/YYYY")), 1),
                  d("td", Qg, S(B(W)(y.checkin_initiated_count)), 1),
                  d("td", Jg, S(f(y.checkin_init_count, y.checkin_initiated_count)), 1),
                  d("td", tp, S(B(W)(y.checkin_started_count)), 1),
                  d("td", ep, S(f(y.checkin_completed_count, y.checkin_started_count)), 1),
                  d("td", sp, S(f(y.checkin_closed_count, y.checkin_started_count)), 1),
                  d("td", np, S(f(g(y.failed_steps), y.checkin_started_count)), 1),
                  d("td", ap, [
                    y.failed_steps && y.failed_steps.length > 0 ? (_(), k("div", ip, [
                      (_(!0), k(X, null, ot(y.failed_steps, (x) => (_(), k("div", {
                        key: x.step_name,
                        class: "failed-step-item"
                      }, [
                        d("span", op, S(x.step_name.replace(/_/g, " ")) + ":", 1),
                        d("span", rp, S(x.failed_count), 1)
                      ]))), 128))
                    ])) : (_(), k("div", lp, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (_(), ht(B(gt), {
            key: 0,
            onExport: n,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : z("", !0)
        ])) : (_(), k("section", cp, [...b[2] || (b[2] = [
          V('<div class="empty-state-content" data-v-dc331730><div class="empty-icon-wrapper" data-v-dc331730><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-dc331730><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-dc331730></path></svg></div><p class="empty-title" data-v-dc331730>No check-in data available</p><p class="empty-description" data-v-dc331730>Try adjusting the date range or check your filters to see check-in performance data.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}, hp = /* @__PURE__ */ G(dp, [["__scopeId", "data-v-dc331730"]]), up = { class: "checkin-metrics-card" }, fp = {
  key: 0,
  class: "loading-state"
}, gp = {
  key: 1,
  class: "card-body"
}, pp = {
  key: 0,
  class: "sankey-section"
}, bp = {
  key: 1,
  class: "table-section"
}, mp = { class: "table-wrapper" }, vp = { class: "data-table" }, yp = { class: "table-body" }, _p = { class: "table-cell date-cell" }, xp = { class: "table-cell text-center" }, kp = { class: "table-cell text-center" }, Mp = { class: "table-cell text-center" }, Sp = { class: "table-cell text-center" }, wp = { class: "table-cell text-center" }, Cp = { class: "table-cell text-center" }, $p = { class: "table-cell reasons-cell" }, Dp = {
  key: 0,
  class: "reasons-list"
}, Ap = { class: "reason-name" }, Tp = { class: "reason-count" }, Fp = {
  key: 1,
  class: "no-reasons"
}, Bp = {
  key: 2,
  class: "empty-state"
}, Pp = { class: "empty-state-content" }, Lp = { class: "empty-icon-wrapper" }, Ep = /* @__PURE__ */ Z({
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
    const n = e, a = s, i = (m) => {
      a("export", m);
    }, { isDark: o } = tt(J(n, "theme")), r = (m) => m == null ? "0" : m.toLocaleString(), l = (m) => {
      const b = new Date(m), y = String(b.getDate()).padStart(2, "0"), x = String(b.getMonth() + 1).padStart(2, "0"), M = b.getFullYear();
      return `${y}/${x}/${M}`;
    }, c = (m) => m.replace(/_/g, " ").replace(/\b\w/g, (b) => b.toUpperCase()), h = (m, b) => !b || b === 0 ? "0%" : `${Math.round(m / b * 100)}%`, u = (m, b) => {
      const y = m || 0, x = b || 0, M = r(y), w = h(y, x);
      return `${M} (${w})`;
    }, f = (m) => m ? m.reduce((b, y) => b + y.failed_count, 0) : 0, g = T(() => {
      const m = {
        "Checkin Init": "#93C5FD",
        "Booking retrive": "#C7D2FE",
        "Booking retrive success": "#A5B4FC",
        "Number of Passengers": "#8B8CF6",
        Completed: "#A7F3D0",
        "Closed with BP": "#7BE39E",
        "Abandoned (Init)": "#FCA5A5",
        "Abandoned (Started)": "#F87171",
        "Abandoned (Flow)": "#EF4444",
        "BP Error": "#EF4444",
        Unrecovered: "#F87171"
      };
      return (n.failedData?.unrecovered_by_step || []).forEach((y) => {
        const M = y.step_name.replace(/_/g, " ").split(" ").map((C) => C.charAt(0).toUpperCase() + C.slice(1)).join(" "), w = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        m[M] = w[M] || "#DC2626";
      }), m;
    }), p = T(() => {
      const m = n.checkinData?.checkin_by_day || [], b = n.failedData?.failed_by_step_by_day || [];
      return m.map((x) => {
        const M = b.find((w) => w.date === x.date);
        return {
          ...x,
          failed_steps: M?.steps || []
        };
      }).sort((x, M) => new Date(x.date).getTime() - new Date(M.date).getTime());
    }), v = T(() => {
      const m = [], b = [];
      if (!n.checkinData?.total_checkin_initiated)
        return { nodes: m, links: b };
      m.push({ name: "Checkin Init" }), m.push({ name: "Booking retrive" }), m.push({ name: "Booking retrive success" }), m.push({ name: "Number of Passengers" }), m.push({ name: "Completed" }), m.push({ name: "Closed with BP" });
      const y = n.checkinData.total_checkin_initiated || 0, x = n.checkinData.total_checkin_init || 0, M = n.checkinData.total_checkin_init_abandoned || 0, w = x - M, C = n.checkinData.total_checkin_started || 0, $ = n.checkinData.total_checkin_completed || 0, A = n.checkinData.total_checkin_closed || 0, L = n.failedData?.unrecovered_by_step || [], D = L.reduce((E, I) => E + I.count, 0);
      if (x > 0) {
        const E = Math.round(x / y * 100);
        b.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: x,
          label: `${x.toLocaleString()} (${E}%)`
        });
      }
      const F = y - x;
      if (F > 0) {
        const E = Math.round(F / y * 100);
        m.push({ name: "Abandoned (Init)" }), b.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: F,
          label: `${F.toLocaleString()} (${E}%)`
        });
      }
      if (M > 0) {
        const E = Math.round(M / y * 100);
        m.push({ name: "Abandoned (Started)" }), b.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: M,
          label: `${M.toLocaleString()} (${E}%)`
        });
      }
      if (w > 0) {
        const E = Math.round(w / y * 100);
        b.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: w,
          label: `${w.toLocaleString()} (${E}%)`
        });
      }
      if (C > 0) {
        const E = Math.round(C / y * 100);
        b.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: C,
          label: `${C.toLocaleString()} (${E}%)`
        });
      }
      if ($ > 0) {
        const E = Math.round($ / C * 100);
        b.push({
          source: "Number of Passengers",
          target: "Completed",
          value: $,
          label: `${$.toLocaleString()} (${E}%)`
        });
      }
      if (L.length > 0 && D > 0) {
        m.push({ name: "Unrecovered" });
        const E = Math.round(D / C * 100);
        b.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: D,
          label: `${D.toLocaleString()} (${E}%)`
        }), L.forEach((I) => {
          const st = I.step_name.replace(/_/g, " ").split(" ").map((O) => O.charAt(0).toUpperCase() + O.slice(1)).join(" "), H = Math.round(I.count / C * 100);
          m.push({ name: st }), b.push({
            source: "Unrecovered",
            target: st,
            value: I.count,
            label: `${I.count.toLocaleString()} (${H}%)`
          });
        });
      }
      const P = C - ($ + D);
      if (P > 0) {
        const E = Math.round(P / C * 100);
        m.push({ name: "Abandoned (Flow)" }), b.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: P,
          label: `${P.toLocaleString()} (${E}%)`
        });
      }
      const R = $ - A;
      if (R > 0) {
        const E = Math.round(R / C * 100);
        m.push({ name: "BP Error" }), b.push({
          source: "Completed",
          target: "BP Error",
          value: R,
          label: `${R.toLocaleString()} (${E}%)`
        });
      }
      if (A > 0) {
        const E = Math.round(A / C * 100);
        b.push({
          source: "Completed",
          target: "Closed with BP",
          value: A,
          label: `${A.toLocaleString()} (${E}%)`
        });
      }
      return { nodes: m, links: b };
    });
    return t({ isDark: o }), (m, b) => (_(), k("article", up, [
      b[4] || (b[4] = d("header", { class: "card-header" }, [
        d("div", { class: "header-content" }, [
          d("h3", { class: "card-title" }, "Check-in Metrics"),
          d("p", { class: "card-subtitle" }, "Check-in performance and failure analysis")
        ])
      ], -1)),
      e.loading ? (_(), k("div", fp, [...b[0] || (b[0] = [
        V('<div class="loading-container" data-v-8283d36d><div class="chart-bars-loader" data-v-8283d36d><div class="bar bar-1" data-v-8283d36d></div><div class="bar bar-2" data-v-8283d36d></div><div class="bar bar-3" data-v-8283d36d></div><div class="bar bar-4" data-v-8283d36d></div><div class="bar bar-5" data-v-8283d36d></div></div><p class="loading-text" data-v-8283d36d>Loading check-in data...</p></div>', 1)
      ])])) : (_(), k("div", gp, [
        v.value.nodes.length > 0 ? (_(), k("div", pp, [
          j(le, {
            data: v.value,
            height: "500px",
            "node-colors": g.value,
            "use-gradient": !1,
            "node-gap": 30
          }, null, 8, ["data", "node-colors"])
        ])) : z("", !0),
        p.value && p.value.length > 0 ? (_(), k("div", bp, [
          d("div", mp, [
            d("table", vp, [
              b[1] || (b[1] = d("thead", null, [
                d("tr", { class: "table-header-row" }, [
                  d("th", { class: "table-header" }, "Date"),
                  d("th", { class: "table-header" }, "Checkin Init"),
                  d("th", { class: "table-header" }, "Booking Retrieve (%)"),
                  d("th", { class: "table-header" }, "Number of Passengers"),
                  d("th", { class: "table-header" }, "Completed (%)"),
                  d("th", { class: "table-header" }, "Closed with BP (%)"),
                  d("th", { class: "table-header" }, "Failed (%)"),
                  d("th", { class: "table-header" }, "Failed (Reasons)")
                ])
              ], -1)),
              d("tbody", yp, [
                (_(!0), k(X, null, ot(p.value, (y) => (_(), k("tr", {
                  key: y.date,
                  class: "table-row"
                }, [
                  d("td", _p, S(l(y.date)), 1),
                  d("td", xp, S(r(y.checkin_initiated_count)), 1),
                  d("td", kp, S(u(y.checkin_init_count, y.checkin_initiated_count)), 1),
                  d("td", Mp, S(r(y.checkin_started_count)), 1),
                  d("td", Sp, S(u(y.checkin_completed_count, y.checkin_started_count)), 1),
                  d("td", wp, S(u(y.checkin_closed_count, y.checkin_started_count)), 1),
                  d("td", Cp, S(u(f(y.failed_steps), y.checkin_started_count)), 1),
                  d("td", $p, [
                    y.failed_steps && y.failed_steps.length > 0 ? (_(), k("div", Dp, [
                      (_(!0), k(X, null, ot(y.failed_steps, (x) => (_(), k("div", {
                        key: x.step_name,
                        class: "reason-item"
                      }, [
                        d("span", Ap, S(c(x.step_name)) + ":", 1),
                        d("span", Tp, S(x.failed_count), 1)
                      ]))), 128))
                    ])) : (_(), k("div", Fp, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (_(), ht(B(gt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : z("", !0)
        ])) : (_(), k("div", Bp, [
          d("div", Pp, [
            d("div", Lp, [
              j(B(wt), { class: "empty-icon" })
            ]),
            b[2] || (b[2] = d("p", { class: "empty-title" }, "No check-in data available", -1)),
            b[3] || (b[3] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see check-in metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Op = /* @__PURE__ */ G(Ep, [["__scopeId", "data-v-8283d36d"]]), Rp = { class: "checkin-segments-card" }, Ip = {
  key: 0,
  class: "loading-state"
}, zp = {
  key: 1,
  class: "card-body"
}, Wp = {
  key: 0,
  class: "table-section"
}, Np = { class: "table-wrapper" }, Hp = { class: "data-table" }, Vp = { class: "table-body" }, jp = { class: "table-cell font-medium text-center" }, Yp = { class: "airport-badge" }, Up = { class: "table-cell text-center" }, qp = {
  key: 0,
  class: "airport-badge connection"
}, Xp = {
  key: 1,
  class: "empty-connection"
}, Kp = { class: "table-cell text-center" }, Gp = { class: "airport-badge" }, Zp = { class: "table-cell text-center" }, Qp = {
  key: 0,
  class: "trip-badge roundtrip"
}, Jp = {
  key: 1,
  class: "trip-badge oneway"
}, t0 = { class: "table-cell text-center" }, e0 = { class: "table-cell text-center" }, s0 = { class: "percentage-value" }, n0 = { class: "table-cell text-center" }, a0 = { class: "percentage-value" }, i0 = { class: "table-cell text-center" }, o0 = { class: "percentage-value success" }, r0 = {
  key: 1,
  class: "empty-state"
}, l0 = /* @__PURE__ */ Z({
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
    const n = e, a = s, i = (h) => {
      a("export", h);
    }, { isDark: o } = tt(J(n, "theme")), r = (h, u) => !u || u === 0 || !h ? "0%" : `${Math.round(h / u * 100)}%`, l = (h) => !h || h === "None" ? "-" : String(h).trim().replace(/_[0-9]+$/i, ""), c = (h) => {
      const u = l(h?.departure_airport), f = l(h?.arrival_airport);
      return u === "-" || f === "-" ? !1 : u === f;
    };
    return t({ isDark: o }), (h, u) => (_(), k("article", Rp, [
      u[5] || (u[5] = d("header", { class: "card-header" }, [
        d("div", { class: "header-content" }, [
          d("h3", { class: "card-title" }, "Checkin Segments"),
          d("p", { class: "card-subtitle" }, "Breakdown by flight segment with connection when applicable")
        ])
      ], -1)),
      n.loading ? (_(), k("div", Ip, [...u[0] || (u[0] = [
        V('<div class="loading-container" data-v-5f8ce8fa><div class="chart-flow-loader" data-v-5f8ce8fa><div class="flow-line flow-1" data-v-5f8ce8fa></div><div class="flow-line flow-2" data-v-5f8ce8fa></div><div class="flow-line flow-3" data-v-5f8ce8fa></div><div class="flow-line flow-4" data-v-5f8ce8fa></div><div class="flow-line flow-5" data-v-5f8ce8fa></div></div><p class="loading-text" data-v-5f8ce8fa>Loading segment data...</p></div>', 1)
      ])])) : (_(), k("div", zp, [
        n.data.length > 0 ? (_(), k("section", Wp, [
          d("div", Np, [
            d("table", Hp, [
              u[3] || (u[3] = d("thead", null, [
                d("tr", { class: "table-header-row" }, [
                  d("th", { class: "table-header" }, "Departure"),
                  d("th", { class: "table-header" }, "Connection"),
                  d("th", { class: "table-header" }, "Arrival"),
                  d("th", { class: "table-header" }, "Trip"),
                  d("th", { class: "table-header" }, "Init"),
                  d("th", { class: "table-header" }, "Started (%)"),
                  d("th", { class: "table-header" }, "Completed (%)"),
                  d("th", { class: "table-header" }, "Closed (%)")
                ])
              ], -1)),
              d("tbody", Vp, [
                (_(!0), k(X, null, ot(n.data, (f, g) => (_(), k("tr", {
                  key: g,
                  class: "table-row"
                }, [
                  d("td", jp, [
                    d("span", Yp, S(l(f.departure_airport)), 1)
                  ]),
                  d("td", Up, [
                    l(f.conexion_airport) !== "-" ? (_(), k("span", qp, S(l(f.conexion_airport)), 1)) : (_(), k("span", Xp, "-"))
                  ]),
                  d("td", Kp, [
                    d("span", Gp, S(l(f.arrival_airport)), 1)
                  ]),
                  d("td", Zp, [
                    c(f) ? (_(), k("span", Qp, [...u[1] || (u[1] = [
                      d("svg", {
                        class: "trip-icon",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        d("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        })
                      ], -1),
                      pe(" Roundtrip ", -1)
                    ])])) : (_(), k("span", Jp, [...u[2] || (u[2] = [
                      d("svg", {
                        class: "trip-icon",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        d("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M14 5l7 7m0 0l-7 7m7-7H3"
                        })
                      ], -1),
                      pe(" One way ", -1)
                    ])]))
                  ]),
                  d("td", t0, S(B(W)(f.segment_init_count)), 1),
                  d("td", e0, [
                    d("span", s0, S(r(f.segment_started_count, f.segment_init_count)), 1)
                  ]),
                  d("td", n0, [
                    d("span", a0, S(r(f.segment_completed_count, f.segment_init_count)), 1)
                  ]),
                  d("td", i0, [
                    d("span", o0, S(r(f.segment_closed_count, f.segment_init_count)), 1)
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (_(), ht(B(gt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : z("", !0)
        ])) : (_(), k("section", r0, [...u[4] || (u[4] = [
          V('<div class="empty-state-content" data-v-5f8ce8fa><div class="empty-icon-wrapper" data-v-5f8ce8fa><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-5f8ce8fa><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-5f8ce8fa></path></svg></div><p class="empty-title" data-v-5f8ce8fa>No segment data available</p><p class="empty-description" data-v-5f8ce8fa>No flight segment data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), c0 = /* @__PURE__ */ G(l0, [["__scopeId", "data-v-5f8ce8fa"]]), d0 = { class: "disruption-metrics-card" }, h0 = { class: "card-header" }, u0 = { class: "header-content" }, f0 = {
  key: 0,
  class: "payment-success-badge"
}, g0 = { class: "badge-value" }, p0 = {
  key: 0,
  class: "loading-state"
}, b0 = {
  key: 1,
  class: "card-body"
}, m0 = { class: "chart-section" }, v0 = { class: "chart-wrapper" }, y0 = {
  key: 1,
  class: "empty-chart"
}, _0 = {
  key: 0,
  class: "table-section"
}, x0 = { class: "table-wrapper" }, k0 = { class: "data-table" }, M0 = { class: "table-body" }, S0 = { class: "table-cell font-medium text-center" }, w0 = { class: "table-cell text-center" }, C0 = { class: "table-cell text-center" }, $0 = { class: "percentage-text" }, D0 = { class: "table-cell text-center" }, A0 = { class: "abandoned-value" }, T0 = { class: "table-cell" }, F0 = { class: "badges-container badges-wrap" }, B0 = { class: "badge badge-vol" }, P0 = { class: "badge badge-confirm" }, L0 = { class: "badge badge-not-confirm" }, E0 = { class: "badge badge-reject" }, O0 = { class: "badge badge-not-paid" }, R0 = { class: "badge badge-success" }, I0 = { class: "table-cell" }, z0 = { class: "badges-container badges-wrap" }, W0 = { class: "badge badge-inv" }, N0 = { class: "badge badge-human" }, H0 = { class: "badge badge-accept" }, V0 = {
  key: 1,
  class: "empty-state"
}, j0 = /* @__PURE__ */ Z({
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
      total_payment_success: 0,
      disruption_by_day: []
    }) },
    loading: { type: Boolean, default: !1 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const s = e, n = t, a = (c) => {
      n("export", c);
    }, i = T(() => s.data?.disruption_by_day ? [...s.data.disruption_by_day].sort(
      (c, h) => new Date(c.date).getTime() - new Date(h.date).getTime()
    ) : []), o = (c, h) => !h || h === 0 ? "0%" : `${Math.round(c / h * 100)}%`, r = T(() => {
      const c = s.data, h = c.total_disruption_conversations || 0, u = c.total_disruption_initiated || 0, f = c.total_voluntary || 0, g = c.total_involuntary || 0, p = c.total_accepted || 0, v = c.total_confirmed || 0, m = c.total_sell_success || 0, b = c.total_sell_failed || 0, y = Math.max(0, h - u), x = Math.max(0, u - f - g), M = Math.max(0, g - p), w = Math.max(0, f - v), C = b, $ = Math.max(0, v - m - C), A = (F, P) => {
        const R = P > 0 ? Math.round(F / P * 100) : 0;
        return `${F.toLocaleString()} (${R}%)`;
      }, L = [
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
      ], D = [];
      return u > 0 && D.push({
        source: "Initiated",
        target: "Started",
        value: u,
        label: A(u, h)
      }), y > 0 && D.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: y,
        label: A(y, h)
      }), f > 0 && D.push({
        source: "Started",
        target: "Voluntary",
        value: f,
        label: A(f, h)
      }), g > 0 && D.push({
        source: "Started",
        target: "Involuntary",
        value: g,
        label: A(g, h)
      }), x > 0 && D.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: x,
        label: A(x, h)
      }), p > 0 && D.push({
        source: "Involuntary",
        target: "Accepted",
        value: p,
        label: A(p, h)
      }), M > 0 && D.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: M,
        label: A(M, h)
      }), v > 0 && D.push({
        source: "Voluntary",
        target: "Confirmed",
        value: v,
        label: A(v, h)
      }), w > 0 && D.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: w,
        label: A(w, h)
      }), m > 0 && D.push({
        source: "Confirmed",
        target: "Paid",
        value: m,
        label: A(m, h)
      }), C > 0 && D.push({
        source: "Confirmed",
        target: "Rejected",
        value: C,
        label: A(C, h)
      }), $ > 0 && D.push({
        source: "Confirmed",
        target: "Not Paid",
        value: $,
        label: A($, h)
      }), { nodes: L, links: D };
    }), l = {
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
    return (c, h) => (_(), k("article", d0, [
      d("header", h0, [
        d("div", u0, [
          h[1] || (h[1] = d("div", { class: "title-section" }, [
            d("h3", { class: "card-title" }, "Disruption Metrics"),
            d("p", { class: "card-subtitle" }, "Disruption workflow performance and completion tracking")
          ], -1)),
          s.loading ? z("", !0) : (_(), k("div", f0, [
            h[0] || (h[0] = d("p", { class: "badge-label" }, "Payment Success", -1)),
            d("p", g0, S(B(W)(s.data.total_payment_success || 0)), 1)
          ]))
        ])
      ]),
      s.loading ? (_(), k("div", p0, [...h[2] || (h[2] = [
        V('<div class="loading-container" data-v-d0b738d5><div class="chart-bars-loader" data-v-d0b738d5><div class="bar bar-1" data-v-d0b738d5></div><div class="bar bar-2" data-v-d0b738d5></div><div class="bar bar-3" data-v-d0b738d5></div><div class="bar bar-4" data-v-d0b738d5></div><div class="bar bar-5" data-v-d0b738d5></div></div><p class="loading-text" data-v-d0b738d5>Loading disruption data...</p></div>', 1)
      ])])) : (_(), k("div", b0, [
        d("section", m0, [
          d("div", v0, [
            r.value.nodes.length > 0 && r.value.links.length > 0 ? (_(), ht(le, {
              key: 0,
              data: r.value,
              "node-colors": l,
              height: "500px"
            }, null, 8, ["data"])) : (_(), k("div", y0, [...h[3] || (h[3] = [
              d("p", { class: "empty-chart-text" }, "No disruption data available for visualization", -1)
            ])]))
          ])
        ]),
        i.value && i.value.length > 0 ? (_(), k("section", _0, [
          h[5] || (h[5] = V('<div class="section-header" data-v-d0b738d5><h4 class="section-title" data-v-d0b738d5>Daily Overview</h4></div><div class="legend-container" data-v-d0b738d5><p class="legend-title" data-v-d0b738d5>Legend</p><div class="legend-items" data-v-d0b738d5><div class="legend-group" data-v-d0b738d5><span class="legend-label" data-v-d0b738d5>Voluntary:</span><span class="badge badge-vol" data-v-d0b738d5>VOL</span></div><div class="legend-group" data-v-d0b738d5><span class="legend-label" data-v-d0b738d5>Involuntary:</span><span class="badge badge-inv" data-v-d0b738d5>INV</span></div><div class="legend-note" data-v-d0b738d5><span data-v-d0b738d5>Vol=Voluntary</span><span data-v-d0b738d5>•</span><span data-v-d0b738d5>Inv=Involuntary</span></div></div></div>', 2)),
          d("div", x0, [
            d("table", k0, [
              h[4] || (h[4] = d("thead", null, [
                d("tr", { class: "table-header-row" }, [
                  d("th", { class: "table-header" }, "Date"),
                  d("th", { class: "table-header" }, "Initiated"),
                  d("th", { class: "table-header" }, "Started"),
                  d("th", { class: "table-header" }, "Abandoned (%)"),
                  d("th", { class: "table-header" }, "Voluntary"),
                  d("th", { class: "table-header" }, "Involuntary")
                ])
              ], -1)),
              d("tbody", M0, [
                (_(!0), k(X, null, ot(i.value, (u) => (_(), k("tr", {
                  key: u.date,
                  class: "table-row"
                }, [
                  d("td", S0, S(B(Tt)(u.date).format("DD/MM")), 1),
                  d("td", w0, S(B(W)(u.disruption_conversations)), 1),
                  d("td", C0, [
                    pe(S(B(W)(u.disruption_initiated_count)) + " ", 1),
                    d("span", $0, " (" + S(o(u.disruption_initiated_count, u.disruption_conversations)) + ") ", 1)
                  ]),
                  d("td", D0, [
                    d("span", A0, S(B(W)(u.disruption_initiated_count - u.voluntary_count - u.involuntary_count)) + " (" + S(o(u.disruption_initiated_count - u.voluntary_count - u.involuntary_count, u.disruption_conversations)) + ") ", 1)
                  ]),
                  d("td", T0, [
                    d("div", F0, [
                      d("span", B0, " VOL " + S(B(W)(u.voluntary_count)) + " (" + S(o(u.voluntary_count, u.disruption_conversations)) + ") ", 1),
                      d("span", P0, " Confirm " + S(B(W)(u.confirmed_count)) + " (" + S(o(u.confirmed_count, u.disruption_conversations)) + ") ", 1),
                      d("span", L0, " Not Confirm " + S(B(W)(u.voluntary_count - u.confirmed_count)) + " (" + S(o(u.voluntary_count - u.confirmed_count, u.disruption_conversations)) + ") ", 1),
                      d("span", E0, " Reject " + S(B(W)(u.sell_failed_count)) + " (" + S(o(u.sell_failed_count, u.disruption_conversations)) + ") ", 1),
                      d("span", O0, " Not Paid " + S(B(W)(Math.max(0, u.confirmed_count - u.sell_success_count - u.sell_failed_count))) + " (" + S(o(Math.max(0, u.confirmed_count - u.sell_success_count - u.sell_failed_count), u.disruption_conversations)) + ") ", 1),
                      d("span", R0, " Finish " + S(B(W)(u.sell_success_count)) + " (" + S(o(u.sell_success_count, u.disruption_conversations)) + ") ", 1)
                    ])
                  ]),
                  d("td", I0, [
                    d("div", z0, [
                      d("span", W0, " INV " + S(B(W)(u.involuntary_count)) + " (" + S(o(u.involuntary_count, u.disruption_conversations)) + ") ", 1),
                      d("span", N0, " Human " + S(B(W)(u.involuntary_count - u.accepted_count)) + " (" + S(o(u.involuntary_count - u.accepted_count, u.disruption_conversations)) + ") ", 1),
                      d("span", H0, " Accept " + S(B(W)(u.accepted_count)) + " (" + S(o(u.accepted_count, u.disruption_conversations)) + ") ", 1)
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (_(), ht(B(gt), {
            key: 0,
            onExport: a,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : z("", !0)
        ])) : (_(), k("section", V0, [...h[6] || (h[6] = [
          V('<div class="empty-state-content" data-v-d0b738d5><div class="empty-icon-wrapper" data-v-d0b738d5><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d0b738d5><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" data-v-d0b738d5></path></svg></div><p class="empty-title" data-v-d0b738d5>No disruption data available</p><p class="empty-description" data-v-d0b738d5>No disruption data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Y0 = /* @__PURE__ */ G(j0, [["__scopeId", "data-v-d0b738d5"]]), U0 = { class: "faq-metrics-card" }, q0 = {
  key: 0,
  class: "card-body"
}, X0 = { class: "kpi-grid" }, K0 = { class: "kpi-card" }, G0 = { class: "kpi-value" }, Z0 = { class: "kpi-card" }, Q0 = { class: "kpi-value" }, J0 = { class: "kpi-card kpi-card--airline" }, tb = { class: "kpi-value" }, eb = { class: "kpi-card kpi-card--booking" }, sb = { class: "kpi-value" }, nb = { class: "kpi-card kpi-card--flight" }, ab = { class: "kpi-value" }, ib = {
  key: 0,
  class: "chart-section"
}, ob = {
  key: 1,
  class: "empty-state"
}, rb = {
  key: 1,
  class: "loading-state"
}, lb = /* @__PURE__ */ Z({
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
    const n = e, a = s, i = (f) => {
      a("export", f);
    }, { isDark: o, colors: r } = tt(J(n, "theme")), l = xt({ labels: [], datasets: [] }), c = T(() => n.data ?? {
      total_faq_events: 0,
      total_documents_found: 0,
      total_airline_information_retrieved: 0,
      total_booking_info_retrieved: 0,
      total_flight_status_retrieved: 0,
      faq_by_day: []
    }), h = T(() => ({
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
          borderColor: o.value ? "rgba(198, 125, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
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
            display: !1
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
    })), u = (f) => {
      if (!f) {
        l.value = { labels: [], datasets: [] };
        return;
      }
      const g = f.faq_by_day || [];
      if (g.length > 0) {
        const p = g.map((y) => Tt(y.date).format("MMM DD")), v = g.map((y) => y.airline_information_retrieved_count || 0), m = g.map((y) => y.flight_status_retrieved_count || 0), b = g.map((y) => y.booking_info_retrieved_count || 0);
        l.value = {
          labels: p,
          datasets: [
            {
              label: "Airline Information",
              data: v,
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
              data: b,
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
    return Xt(
      () => n.data,
      (f) => {
        u(f ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: o }), (f, g) => (_(), k("article", U0, [
      g[7] || (g[7] = d("header", { class: "card-header" }, [
        d("div", { class: "header-content" }, [
          d("h3", { class: "card-title" }, "FAQ Metrics"),
          d("p", { class: "card-subtitle" }, "Daily FAQ consultation and retrieval metrics")
        ])
      ], -1)),
      n.loading ? (_(), k("div", rb, [...g[6] || (g[6] = [
        V('<div class="loading-container" data-v-dec2e839><div class="chart-bars-loader" data-v-dec2e839><div class="bar bar-1" data-v-dec2e839></div><div class="bar bar-2" data-v-dec2e839></div><div class="bar bar-3" data-v-dec2e839></div><div class="bar bar-4" data-v-dec2e839></div><div class="bar bar-5" data-v-dec2e839></div></div><p class="loading-text" data-v-dec2e839>Loading FAQ metrics...</p></div>', 1)
      ])])) : (_(), k("div", q0, [
        d("div", X0, [
          d("div", K0, [
            g[0] || (g[0] = d("span", { class: "kpi-label" }, "Total FAQ", -1)),
            d("span", G0, S(B(W)(c.value.total_faq_events)), 1)
          ]),
          d("div", Z0, [
            g[1] || (g[1] = d("span", { class: "kpi-label" }, "Documents Found", -1)),
            d("span", Q0, S(B(W)(c.value.total_documents_found)), 1)
          ]),
          d("div", J0, [
            g[2] || (g[2] = d("div", { class: "kpi-label-row" }, [
              d("span", {
                class: "kpi-color-dot",
                "aria-hidden": "true"
              }),
              d("span", { class: "kpi-label" }, "Airline Info")
            ], -1)),
            d("span", tb, S(B(W)(c.value.total_airline_information_retrieved)), 1)
          ]),
          d("div", eb, [
            g[3] || (g[3] = d("div", { class: "kpi-label-row" }, [
              d("span", {
                class: "kpi-color-dot",
                "aria-hidden": "true"
              }),
              d("span", { class: "kpi-label" }, "Booking Info")
            ], -1)),
            d("span", sb, S(B(W)(c.value.total_booking_info_retrieved)), 1)
          ]),
          d("div", nb, [
            g[4] || (g[4] = d("div", { class: "kpi-label-row" }, [
              d("span", {
                class: "kpi-color-dot",
                "aria-hidden": "true"
              }),
              d("span", { class: "kpi-label" }, "Flight Status")
            ], -1)),
            d("span", ab, S(B(W)(c.value.total_flight_status_retrieved)), 1)
          ])
        ]),
        l.value.labels && l.value.labels.length ? (_(), k("section", ib, [
          j(re, {
            data: l.value,
            options: h.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (_(), ht(B(gt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : z("", !0)
        ])) : (_(), k("section", ob, [...g[5] || (g[5] = [
          V('<div class="empty-state-content" data-v-dec2e839><div class="empty-icon-wrapper" data-v-dec2e839><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-dec2e839><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-dec2e839></path></svg></div><p class="empty-title" data-v-dec2e839>No FAQ data available</p><p class="empty-description" data-v-dec2e839>No FAQ consultation data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), cb = /* @__PURE__ */ G(lb, [["__scopeId", "data-v-dec2e839"]]), db = { class: "messages-per-agent-card" }, hb = {
  key: 0,
  class: "card-body"
}, ub = {
  key: 0,
  class: "chart-section"
}, fb = {
  key: 1,
  class: "empty-state"
}, gb = { class: "empty-state-content" }, pb = { class: "empty-icon-wrapper" }, bb = {
  key: 1,
  class: "loading-state"
}, mb = /* @__PURE__ */ Z({
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
    }, a = e, i = s, o = (u) => {
      i("export", u);
    }, { isDark: r, colors: l } = tt(J(a, "theme")), c = T(() => {
      const u = a.data?.agents_by_day || {}, f = Object.keys(u).sort();
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const g = /* @__PURE__ */ new Set();
      for (const m of Object.values(u))
        for (const b of Object.keys(m))
          g.add(b);
      const v = Array.from(g).map((m) => {
        const b = n[m] || "#94a3b8";
        return {
          label: m.charAt(0).toUpperCase() + m.slice(1).replace(/_/g, " "),
          data: f.map((y) => u[y]?.[m] || 0),
          borderColor: b,
          backgroundColor: `${b}20`,
          pointBackgroundColor: b,
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
        datasets: v
      };
    }), h = T(() => a.options ? a.options : {
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
            display: !1
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
    return t({ isDark: r }), (u, f) => (_(), k("article", db, [
      f[3] || (f[3] = d("header", { class: "card-header" }, [
        d("div", { class: "header-content" }, [
          d("h3", { class: "card-title" }, "Messages per Agent"),
          d("p", { class: "card-subtitle" }, "Agent interaction trends over time")
        ])
      ], -1)),
      e.loading ? (_(), k("div", bb, [...f[2] || (f[2] = [
        V('<div class="loading-container" data-v-53a825f5><div class="chart-lines-loader" data-v-53a825f5><div class="line line-1" data-v-53a825f5></div><div class="line line-2" data-v-53a825f5></div><div class="line line-3" data-v-53a825f5></div><div class="line line-4" data-v-53a825f5></div><div class="line line-5" data-v-53a825f5></div></div><p class="loading-text" data-v-53a825f5>Loading chart data...</p></div>', 1)
      ])])) : (_(), k("div", hb, [
        c.value.labels && c.value.labels.length ? (_(), k("section", ub, [
          j(re, {
            data: c.value,
            options: h.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (_(), ht(B(gt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : z("", !0)
        ])) : (_(), k("section", fb, [
          d("div", gb, [
            d("div", pb, [
              j(B(wt), { class: "empty-icon" })
            ]),
            f[0] || (f[0] = d("p", { class: "empty-title" }, "No agent interactions data", -1)),
            f[1] || (f[1] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), vb = /* @__PURE__ */ G(mb, [["__scopeId", "data-v-53a825f5"]]), yb = { class: "record-locator-card" }, _b = {
  key: 0,
  class: "loading-state"
}, xb = {
  key: 1,
  class: "card-body"
}, kb = {
  key: 0,
  class: "chart-section"
}, Mb = { class: "chart-wrapper" }, Sb = {
  key: 1,
  class: "table-section"
}, wb = { class: "table-wrapper" }, Cb = { class: "data-table" }, $b = { class: "table-header-row" }, Db = {
  key: 0,
  class: "table-header"
}, Ab = {
  key: 1,
  class: "table-header"
}, Tb = { class: "table-body" }, Fb = { class: "table-cell font-medium" }, Bb = { class: "table-cell text-center" }, Pb = { class: "table-cell text-center" }, Lb = { class: "table-cell text-center" }, Eb = { class: "table-cell text-center" }, Ob = { class: "table-cell text-center success-value" }, Rb = { class: "table-cell text-center failed-value" }, Ib = { class: "table-cell text-center warning-value" }, zb = {
  key: 0,
  class: "table-cell text-center"
}, Wb = {
  key: 1,
  class: "table-cell text-center failed-value"
}, Nb = {
  key: 2,
  class: "empty-state"
}, Hb = /* @__PURE__ */ Z({
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
    const n = e, a = s, i = (g) => {
      a("export", g);
    }, { isDark: o } = tt(J(n, "theme")), r = T(() => n.data?.record_locator_by_day ? [...n.data.record_locator_by_day].sort(
      (g, p) => new Date(g.date).getTime() - new Date(p.date).getTime()
    ) : []), l = T(() => n.data), c = T(() => ({
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
      // Abandoned states - progressive red
      "Abandoned (Init)": "#FCA5A5",
      // Light red
      "Abandoned (Started)": "#F87171",
      // Medium red
      "Abandoned (Flow)": "#EF4444",
      // Darker red
      // Failed states
      "Checkin Failed": "#F87171"
      // Medium red for main failed node
    })), h = (g, p) => !p || p === 0 ? "0%" : `${Math.round(g / p * 100)}%`, u = (g, p) => {
      const v = W(g), m = h(g, p);
      return `${v} (${m})`;
    }, f = T(() => {
      const g = [], p = [];
      if (!l.value.total_checkin_initiated)
        return { nodes: g, links: p };
      g.push({ name: "Checkin Init" }), g.push({ name: "Booking retrive" }), g.push({ name: "Checkin Started" }), g.push({ name: "Checkin Completed" }), g.push({ name: "Checkin Closed" });
      const v = l.value.total_checkin_initiated, m = l.value.total_record_locator_init, b = l.value.total_record_locator_started, y = l.value.total_record_locator_completed, x = l.value.total_record_locator_closed, M = l.value.total_record_locator_failed, w = l.value.total_record_locator_abandoned, C = l.value.total_record_locator_init_abandoned;
      if (m > 0) {
        const A = Math.round(m / v * 100);
        p.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: m,
          label: `${m.toLocaleString()} (${A}%)`
        });
      }
      const $ = v - m;
      if ($ > 0) {
        const A = Math.round($ / v * 100);
        g.push({ name: "Abandoned (Init)" }), p.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: $,
          label: `${$.toLocaleString()} (${A}%)`
        });
      }
      if (b > 0) {
        const A = Math.round(b / v * 100);
        p.push({
          source: "Booking retrive",
          target: "Checkin Started",
          value: b,
          label: `${b.toLocaleString()} (${A}%)`
        });
      }
      if (C > 0) {
        const A = Math.round(C / v * 100);
        g.push({ name: "Abandoned (Started)" }), p.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: C,
          label: `${C.toLocaleString()} (${A}%)`
        });
      }
      if (y > 0) {
        const A = Math.round(y / b * 100);
        p.push({
          source: "Checkin Started",
          target: "Checkin Completed",
          value: y,
          label: `${y.toLocaleString()} (${A}%)`
        });
      }
      if (x > 0) {
        const A = Math.round(x / b * 100);
        p.push({
          source: "Checkin Completed",
          target: "Checkin Closed",
          value: x,
          label: `${x.toLocaleString()} (${A}%)`
        });
      }
      if (M > 0) {
        const A = Math.round(M / b * 100);
        g.push({ name: "Checkin Failed" }), p.push({
          source: "Checkin Started",
          target: "Checkin Failed",
          value: M,
          label: `${M.toLocaleString()} (${A}%)`
        });
      }
      if (w > 0) {
        const A = Math.round(w / b * 100);
        g.push({ name: "Abandoned (Flow)" }), p.push({
          source: "Checkin Started",
          target: "Abandoned (Flow)",
          value: w,
          label: `${w.toLocaleString()} (${A}%)`
        });
      }
      return { nodes: g, links: p };
    });
    return t({ isDark: o }), (g, p) => (_(), k("article", yb, [
      p[10] || (p[10] = d("header", { class: "card-header" }, [
        d("div", { class: "header-content" }, [
          d("h3", { class: "card-title" }, "Checkin by Record Locator Metrics"),
          d("p", { class: "card-subtitle" }, "Checkin by record locator retrieval and completion analysis")
        ])
      ], -1)),
      n.loading ? (_(), k("div", _b, [...p[0] || (p[0] = [
        V('<div class="loading-container" data-v-5230c23e><div class="chart-flow-loader" data-v-5230c23e><div class="flow-line flow-1" data-v-5230c23e></div><div class="flow-line flow-2" data-v-5230c23e></div><div class="flow-line flow-3" data-v-5230c23e></div><div class="flow-line flow-4" data-v-5230c23e></div><div class="flow-line flow-5" data-v-5230c23e></div></div><p class="loading-text" data-v-5230c23e>Loading record locator data...</p></div>', 1)
      ])])) : (_(), k("div", xb, [
        f.value.nodes.length > 0 ? (_(), k("section", kb, [
          d("div", Mb, [
            j(le, {
              data: f.value,
              height: "500px",
              "node-colors": c.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : z("", !0),
        r.value && r.value.length > 0 ? (_(), k("section", Sb, [
          d("div", wb, [
            d("table", Cb, [
              d("thead", null, [
                d("tr", $b, [
                  p[1] || (p[1] = d("th", { class: "table-header" }, "Date", -1)),
                  p[2] || (p[2] = d("th", { class: "table-header" }, "Checkin Init", -1)),
                  p[3] || (p[3] = d("th", { class: "table-header" }, "Booking Retrieve (%)", -1)),
                  p[4] || (p[4] = d("th", { class: "table-header" }, "Checkin Started", -1)),
                  p[5] || (p[5] = d("th", { class: "table-header" }, "Checkin Completed (%)", -1)),
                  p[6] || (p[6] = d("th", { class: "table-header" }, "Checkin Closed (%)", -1)),
                  p[7] || (p[7] = d("th", { class: "table-header" }, "Checkin Failed (%)", -1)),
                  p[8] || (p[8] = d("th", { class: "table-header" }, "Abandoned (%)", -1)),
                  n.isAvianca ? (_(), k("th", Db, "Create Payment")) : z("", !0),
                  n.isAvianca ? (_(), k("th", Ab, "Failed Payment")) : z("", !0)
                ])
              ]),
              d("tbody", Tb, [
                (_(!0), k(X, null, ot(r.value, (v) => (_(), k("tr", {
                  key: v.date,
                  class: "table-row"
                }, [
                  d("td", Fb, S(B(Tt)(v.date).format("DD/MM/YYYY")), 1),
                  d("td", Bb, S(B(W)(v.checkin_initiated)), 1),
                  d("td", Pb, S(u(v.record_locator_init_count, v.checkin_initiated)), 1),
                  d("td", Lb, S(B(W)(v.record_locator_started_count)), 1),
                  d("td", Eb, S(u(v.record_locator_completed_count, v.record_locator_started_count)), 1),
                  d("td", Ob, S(u(v.record_locator_closed_count, v.record_locator_started_count)), 1),
                  d("td", Rb, S(u(v.record_locator_failed_count, v.record_locator_started_count)), 1),
                  d("td", Ib, S(u(v.record_locator_abandoned_count, v.record_locator_started_count)), 1),
                  n.isAvianca ? (_(), k("td", zb, S(B(W)(v.record_locator_create_payment_count)), 1)) : z("", !0),
                  n.isAvianca ? (_(), k("td", Wb, S(B(W)(v.record_locator_create_payment_failed_count)), 1)) : z("", !0)
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (_(), ht(B(gt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : z("", !0)
        ])) : (_(), k("section", Nb, [...p[9] || (p[9] = [
          V('<div class="empty-state-content" data-v-5230c23e><div class="empty-icon-wrapper" data-v-5230c23e><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-5230c23e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" data-v-5230c23e></path></svg></div><p class="empty-title" data-v-5230c23e>No record locator data available</p><p class="empty-description" data-v-5230c23e>No record locator data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Vb = /* @__PURE__ */ G(Hb, [["__scopeId", "data-v-5230c23e"]]), jb = { class: "seller-metrics-card" }, Yb = { class: "card-header" }, Ub = { class: "header-content" }, qb = {
  key: 0,
  class: "stats-badge"
}, Xb = { class: "badge-value" }, Kb = {
  key: 0,
  class: "loading-state"
}, Gb = {
  key: 1,
  class: "card-body"
}, Zb = {
  key: 0,
  class: "chart-section"
}, Qb = { class: "chart-wrapper" }, Jb = {
  key: 1,
  class: "empty-state"
}, tm = {
  key: 2,
  class: "table-section"
}, em = { class: "table-wrapper" }, sm = { class: "data-table" }, nm = { class: "table-body" }, am = { class: "table-cell font-medium" }, im = { class: "table-cell text-center" }, om = { class: "table-cell text-center" }, rm = { class: "table-cell text-center" }, lm = { class: "table-cell text-center" }, cm = { class: "table-cell text-center" }, dm = { class: "table-cell text-center success-value" }, hm = { class: "table-cell text-left" }, um = {
  key: 0,
  class: "failed-reasons"
}, fm = { class: "reason-name" }, gm = { class: "reason-count" }, pm = {
  key: 1,
  class: "empty-cell"
}, bm = /* @__PURE__ */ Z({
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
    const n = e, a = s, i = (b) => {
      a("export", b);
    }, { isDark: o } = tt(J(n, "theme")), r = T(() => {
      if (!n.sellerData?.seller_by_day) return [];
      const b = [...n.sellerData.seller_by_day];
      return n.failedData?.failed_by_reason_by_day && n.failedData.failed_by_reason_by_day.forEach((y) => {
        const x = b.findIndex((M) => M.date === y.date);
        x !== -1 ? b[x] = { ...b[x], reasons: y.reasons } : b.push({
          date: y.date,
          seller_conversations: 0,
          sell_started_count: 0,
          sell_get_quote_count: 0,
          sell_booking_created_count: 0,
          sell_success_count: 0,
          daily_value_sell_success: 0,
          reasons: y.reasons
        });
      }), b.sort((y, x) => new Date(y.date).getTime() - new Date(x.date).getTime());
    }), l = T(() => n.sellerData), c = T(() => n.failedData), h = T(() => {
      const {
        total_seller_conversations: b = 0,
        total_sell_started: y = 0,
        total_sell_booking_created: x = 0,
        total_sell_success: M = 0
      } = l.value, { failed_by_reason_by_day: w = [] } = c.value;
      if (b === 0) return { nodes: [], links: [] };
      const C = [
        { name: "Sell Initiated", value: b },
        { name: "Sell Started", value: y },
        { name: "Booking Created", value: x },
        { name: "Sell Success", value: M }
      ], $ = [], A = b - y;
      if (A > 0) {
        const P = Math.round(A / b * 100);
        C.push({ name: "Abandoned (Init)", value: A }), $.push({
          source: "Sell Initiated",
          target: "Abandoned (Init)",
          value: A,
          label: `${A.toLocaleString()} (${P}%)`
        });
      }
      if (y > 0) {
        const P = Math.round(y / b * 100);
        $.push({
          source: "Sell Initiated",
          target: "Sell Started",
          value: y,
          label: `${y.toLocaleString()} (${P}%)`
        });
      }
      const L = w.reduce((P, R) => (R.reasons && Array.isArray(R.reasons) && R.reasons.forEach((E) => {
        const I = E.reason, U = E.failed_count;
        P[I] = (P[I] || 0) + U;
      }), P), {});
      if (x > 0) {
        const P = Math.round(x / b * 100);
        $.push({
          source: "Sell Started",
          target: "Booking Created",
          value: x,
          label: `${x.toLocaleString()} (${P}%)`
        });
      }
      if (M > 0) {
        const P = Math.round(M / b * 100);
        $.push({
          source: "Booking Created",
          target: "Sell Success",
          value: M,
          label: `${M.toLocaleString()} (${P}%)`
        });
      }
      const D = y - x;
      if (D > 0) {
        const P = Math.round(D / b * 100);
        C.push({ name: "Failed at Booking", value: D }), $.push({
          source: "Sell Started",
          target: "Failed at Booking",
          value: D,
          label: `${D.toLocaleString()} (${P}%)`
        });
      }
      if (Object.keys(L).length > 0) {
        const P = Object.values(L).reduce((E, I) => E + I, 0), R = D - P;
        if (Object.entries(L).filter(([, E]) => E > 0).sort(([, E], [, I]) => I - E).forEach(([E, I]) => {
          const U = Math.round(I / b * 100);
          C.push({ name: `Failed: ${E}`, value: I }), $.push({
            source: "Failed at Booking",
            target: `Failed: ${E}`,
            value: I,
            label: `${I.toLocaleString()} (${U}%)`
          });
        }), R > 0) {
          const E = Math.round(R / b * 100);
          C.push({ name: "Failed: Without Reason", value: R }), $.push({
            source: "Failed at Booking",
            target: "Failed: Without Reason",
            value: R,
            label: `${R.toLocaleString()} (${E}%)`
          });
        }
      }
      const F = x - M;
      if (F > 0) {
        const P = Math.round(F / b * 100);
        C.push({ name: "Failed at Completion", value: F }), $.push({
          source: "Booking Created",
          target: "Failed at Completion",
          value: F,
          label: `${F.toLocaleString()} (${P}%)`
        });
      }
      return { nodes: C, links: $ };
    }), u = {
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
    }, f = T(() => u), g = (b, y) => !y || y === 0 ? "0%" : `${Math.round(b / y * 100)}%`, p = (b, y) => {
      const x = W(b), M = g(b, y);
      return `${x} (${M})`;
    }, v = (b) => b == null ? 0 : typeof b == "number" ? b : Array.isArray(b) ? b.reduce((y, x) => y + (x.total_value || 0), 0) : 0, m = (b) => it(v(b));
    return t({ isDark: o }), (b, y) => (_(), k("article", jb, [
      d("header", Yb, [
        d("div", Ub, [
          y[1] || (y[1] = d("div", { class: "title-section" }, [
            d("h3", { class: "card-title" }, "Seller Metrics"),
            d("p", { class: "card-subtitle" }, "Sales performance and failure analysis")
          ], -1)),
          n.loading ? z("", !0) : (_(), k("div", qb, [
            y[0] || (y[0] = d("p", { class: "badge-label" }, "Total Sales Value", -1)),
            d("p", Xb, S(m(n.sellerData.total_value_sell_success)), 1)
          ]))
        ])
      ]),
      n.loading ? (_(), k("div", Kb, [...y[2] || (y[2] = [
        V('<div class="loading-container" data-v-e0a96c80><div class="chart-flow-loader" data-v-e0a96c80><div class="flow-line flow-1" data-v-e0a96c80></div><div class="flow-line flow-2" data-v-e0a96c80></div><div class="flow-line flow-3" data-v-e0a96c80></div><div class="flow-line flow-4" data-v-e0a96c80></div><div class="flow-line flow-5" data-v-e0a96c80></div></div><p class="loading-text" data-v-e0a96c80>Loading sales data...</p></div>', 1)
      ])])) : (_(), k("div", Gb, [
        h.value.nodes.length > 0 ? (_(), k("section", Zb, [
          d("div", Qb, [
            j(le, {
              data: h.value,
              "node-colors": f.value,
              title: "",
              height: "320px"
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : (_(), k("section", Jb, [...y[3] || (y[3] = [
          V('<div class="empty-state-content" data-v-e0a96c80><div class="empty-icon-wrapper" data-v-e0a96c80><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e0a96c80><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-e0a96c80></path></svg></div><p class="empty-title" data-v-e0a96c80>No sales data available</p><p class="empty-description" data-v-e0a96c80>No sales data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])])),
        r.value && r.value.length > 0 ? (_(), k("section", tm, [
          d("div", em, [
            d("table", sm, [
              y[4] || (y[4] = d("thead", null, [
                d("tr", { class: "table-header-row" }, [
                  d("th", { class: "table-header" }, "Date"),
                  d("th", { class: "table-header" }, "Sell Initiated"),
                  d("th", { class: "table-header" }, "Sell Started"),
                  d("th", { class: "table-header" }, "Get Quote"),
                  d("th", { class: "table-header" }, "Booking Created"),
                  d("th", { class: "table-header" }, "Sell Success"),
                  d("th", { class: "table-header" }, "Total Sales Value"),
                  d("th", { class: "table-header" }, "Failed")
                ])
              ], -1)),
              d("tbody", nm, [
                (_(!0), k(X, null, ot(r.value, (x) => (_(), k("tr", {
                  key: x.date,
                  class: "table-row"
                }, [
                  d("td", am, S(B(Tt)(x.date).format("DD/MM/YYYY")), 1),
                  d("td", im, S(B(W)(x.seller_conversations || 0)), 1),
                  d("td", om, S(p(x.sell_started_count, x.seller_conversations || x.sell_started_count)), 1),
                  d("td", rm, S(p(x.sell_get_quote_count, x.seller_conversations || x.sell_started_count)), 1),
                  d("td", lm, S(p(x.sell_booking_created_count, x.seller_conversations || x.sell_started_count)), 1),
                  d("td", cm, S(p(x.sell_success_count, x.seller_conversations || x.sell_started_count)), 1),
                  d("td", dm, S(m(x.daily_value_sell_success)), 1),
                  d("td", hm, [
                    x.reasons && x.reasons.length > 0 ? (_(), k("div", um, [
                      (_(!0), k(X, null, ot(x.reasons, (M) => (_(), k("div", {
                        key: M.reason,
                        class: "failed-reason-item"
                      }, [
                        d("span", fm, S(M.reason) + ":", 1),
                        d("span", gm, S(M.failed_count), 1)
                      ]))), 128))
                    ])) : (_(), k("div", pm, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (_(), ht(B(gt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : z("", !0)
        ])) : z("", !0)
      ]))
    ]));
  }
}), mm = /* @__PURE__ */ G(bm, [["__scopeId", "data-v-e0a96c80"]]), vm = { class: "top-agents-card" }, ym = {
  key: 0,
  class: "card-body"
}, _m = {
  key: 0,
  class: "chart-section"
}, xm = {
  key: 1,
  class: "empty-state"
}, km = { class: "empty-state-content" }, Mm = { class: "empty-icon-wrapper" }, Sm = {
  key: 1,
  class: "loading-state"
}, wm = /* @__PURE__ */ Z({
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
    }, a = e, i = s, o = (u) => {
      i("export", u);
    }, { isDark: r, colors: l } = tt(J(a, "theme")), c = T(() => {
      const f = (a.data?.top_agents || []).filter(
        (m) => m.agent_type?.toLowerCase() !== "triage"
      );
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const g = f.reduce(
        (m, b) => m + (Number(b.conversations) || 0),
        0
      ), p = f.map((m) => {
        const b = m.agent_type?.toLowerCase();
        return n[b] || "#94a3b8";
      }), v = p.map((m) => `${m}80`);
      return {
        labels: f.map((m) => {
          const b = Number(m.conversations) || 0, y = g ? b / g * 100 : 0;
          return `${m.agent_type} - ${b.toLocaleString()} (${y.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: f.map((m) => m.conversations),
            backgroundColor: v,
            borderColor: p,
            borderWidth: 2
          }
        ]
      };
    }), h = T(() => a.options ? a.options : {
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
            label: (u) => {
              const f = (u.label || "").toString().split(" - ")[0], g = Number(u.parsed) || 0, p = (u.dataset.data || []).reduce(
                (m, b) => m + (Number(b) || 0),
                0
              ), v = p ? g / p * 100 : 0;
              return `${f}: ${g.toLocaleString()} (${v.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: r }), (u, f) => (_(), k("article", vm, [
      f[3] || (f[3] = d("header", { class: "card-header" }, [
        d("div", { class: "header-content" }, [
          d("h3", { class: "card-title" }, "Top Agents"),
          d("p", { class: "card-subtitle" }, "Interactions by agent (excluding triage)")
        ])
      ], -1)),
      e.loading ? (_(), k("div", Sm, [...f[2] || (f[2] = [
        V('<div class="loading-container" data-v-501bf4c4><div class="chart-lines-loader" data-v-501bf4c4><div class="line line-1" data-v-501bf4c4></div><div class="line line-2" data-v-501bf4c4></div><div class="line line-3" data-v-501bf4c4></div><div class="line line-4" data-v-501bf4c4></div><div class="line line-5" data-v-501bf4c4></div></div><p class="loading-text" data-v-501bf4c4>Loading chart data...</p></div>', 1)
      ])])) : (_(), k("div", ym, [
        c.value.labels && c.value.labels.length ? (_(), k("section", _m, [
          j(fn, {
            data: c.value,
            options: h.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (_(), ht(B(gt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : z("", !0)
        ])) : (_(), k("section", xm, [
          d("div", km, [
            d("div", Mm, [
              j(B(If), { class: "empty-icon" })
            ]),
            f[0] || (f[0] = d("p", { class: "empty-title" }, "No top agents data", -1)),
            f[1] || (f[1] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Cm = /* @__PURE__ */ G(wm, [["__scopeId", "data-v-501bf4c4"]]), $m = { class: "payment-method-card" }, Dm = { class: "card-header" }, Am = { class: "header-content" }, Tm = {
  key: 0,
  class: "stats-badge"
}, Fm = { class: "badge-value" }, Bm = {
  key: 0,
  class: "loading-state"
}, Pm = {
  key: 1,
  class: "card-body"
}, Lm = {
  key: 0,
  class: "payment-methods-section"
}, Em = { class: "payment-methods-grid" }, Om = { class: "payment-card-content" }, Rm = { class: "payment-card-header" }, Im = { class: "payment-badge-wrapper" }, zm = {
  key: 1,
  class: "empty-state"
}, Wm = { class: "empty-state-content" }, Nm = { class: "empty-icon-wrapper" }, Hm = {
  key: 2,
  class: "table-section"
}, Vm = { class: "table-wrapper" }, jm = { class: "data-table" }, Ym = { class: "table-body" }, Um = { class: "table-cell font-medium" }, qm = { class: "table-cell text-center" }, Xm = { class: "table-cell text-center success-value" }, Km = { class: "table-cell" }, Gm = { class: "payment-tags" }, Zm = { class: "tag-name" }, Qm = { class: "tag-amount" }, Jm = { class: "tag-count" }, tv = {
  key: 3,
  class: "empty-table-state"
}, ev = "Not Registered", sv = /* @__PURE__ */ Z({
  __name: "PaymentMethod",
  props: {
    dates: { default: () => [] },
    airlineName: { default: "" },
    fetchFunction: { type: Function, default: void 0 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: s }) {
    const n = e, a = s, { isDark: i } = tt(J(n, "theme")), o = xt(!1), r = xt({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), l = T(() => r.value.payment_method_breakdown && r.value.payment_method_breakdown.length > 0), c = T(() => r.value.payment_method_by_day && r.value.payment_method_by_day.length > 0), h = T(() => !r.value.payment_method_by_day || r.value.payment_method_by_day.length === 0 ? [] : [...r.value.payment_method_by_day].sort((D, F) => Tt(D.date).valueOf() - Tt(F.date).valueOf())), u = (D) => {
      if (!D)
        return {
          airline_name: n.airlineName,
          start_date: "",
          end_date: "",
          total_conversations: 0,
          total_amount: 0,
          payment_method_breakdown: [],
          payment_method_by_day: []
        };
      const F = (D.payment_method_breakdown || []).map((R) => ({
        payment_method: R.payment_method || "Unknown",
        total_amount: R.total_amount ?? 0,
        count: R.count ?? 0
      })), P = (D.payment_method_by_day || []).map((R) => ({
        date: R.date || "",
        total_count: R.total_count ?? 0,
        total_amount: R.total_amount ?? 0,
        payment_methods: (R.payment_methods || []).map((E) => ({
          payment_method: E.payment_method || "Unknown",
          total_amount: E.total_amount ?? 0,
          count: E.count ?? 0
        }))
      }));
      return {
        airline_name: D.airline_name || n.airlineName,
        start_date: D.start_date || "",
        end_date: D.end_date || "",
        total_conversations: D.total_conversations ?? 0,
        total_amount: D.total_amount ?? 0,
        payment_method_breakdown: F,
        payment_method_by_day: P
      };
    }, f = async () => {
      if (!(!n.fetchFunction || !n.dates || n.dates.length < 2 || !n.airlineName)) {
        o.value = !0;
        try {
          const [D, F] = n.dates.map((R) => Tt(R).format("YYYY-MM-DD")), P = await n.fetchFunction(n.airlineName, D, F);
          r.value = u(P);
        } catch (D) {
          console.error("Error fetching payment method metrics:", D), r.value = u(null);
        } finally {
          o.value = !1;
        }
      }
    }, g = [
      { bg: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)", border: "#a7f3d0", text: "#047857", value: "#065f46", icon: "#10b981", badge: "#059669" },
      { bg: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)", border: "#93c5fd", text: "#1d4ed8", value: "#1e40af", icon: "#3b82f6", badge: "#2563eb" },
      { bg: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)", border: "#d8b4fe", text: "#7c3aed", value: "#6d28d9", icon: "#8b5cf6", badge: "#7c3aed" },
      { bg: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)", border: "#fcd34d", text: "#b45309", value: "#92400e", icon: "#f59e0b", badge: "#d97706" },
      { bg: "linear-gradient(135deg, #fff1f2 0%, #fce7f3 100%)", border: "#fda4af", text: "#be123c", value: "#9f1239", icon: "#f43f5e", badge: "#e11d48" },
      { bg: "linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)", border: "#67e8f9", text: "#0e7490", value: "#155e75", icon: "#06b6d4", badge: "#0891b2" }
    ], p = (D) => {
      const F = g[D % g.length];
      return {
        background: F.bg,
        borderColor: F.border
      };
    }, v = (D) => ({ color: g[D % g.length].text }), m = (D) => ({ color: g[D % g.length].value }), b = (D) => ({ color: g[D % g.length].icon }), y = (D) => ({ color: g[D % g.length].badge }), x = (D) => {
      const P = C(D).length;
      return P > 18 ? { fontSize: "0.75rem" } : P > 15 ? { fontSize: "0.875rem" } : P > 12 ? { fontSize: "1rem" } : { fontSize: "1.125rem" };
    }, M = (D) => {
      const F = D?.toLowerCase() || "";
      return !D || F === "unknown" ? Nf : F.includes("credit") || F.includes("debit") ? za : F.includes("cash") || F.includes("efectivo") ? Of : F.includes("bank") || F.includes("transfer") ? Rf : F.includes("zelle") || F.includes("pago") || F.includes("movil") ? Wf : F.includes("wallet") ? Hf : zf;
    }, w = (D) => !D || D.toLowerCase() === "unknown" ? ev : D.replace(/_/g, " "), C = (D) => D == null ? "$0.00" : it(D), $ = (D) => D ? Tt(D).format("DD/MM/YYYY") : "-", A = (D) => D == null || Number.isNaN(Number(D)) ? 0 : Number(D), L = (D) => {
      a("export", D);
    };
    return us(() => {
      f();
    }), Xt(
      () => n.dates,
      (D) => {
        D && D[0] && D[1] && f();
      },
      { deep: !0 }
    ), t({ isDark: i }), (D, F) => (_(), k("article", $m, [
      d("header", Dm, [
        d("div", Am, [
          F[1] || (F[1] = d("div", { class: "title-section" }, [
            d("h3", { class: "card-title" }, "Payment Method Metrics"),
            d("p", { class: "card-subtitle" }, "Sales breakdown by payment method")
          ], -1)),
          !o.value && r.value.total_amount ? (_(), k("div", Tm, [
            F[0] || (F[0] = d("p", { class: "badge-label" }, "Total Amount", -1)),
            d("p", Fm, S(C(r.value.total_amount)), 1)
          ])) : z("", !0)
        ])
      ]),
      o.value ? (_(), k("div", Bm, [...F[2] || (F[2] = [
        V('<div class="loading-container" data-v-65e6a411><div class="chart-lines-loader" data-v-65e6a411><div class="line line-1" data-v-65e6a411></div><div class="line line-2" data-v-65e6a411></div><div class="line line-3" data-v-65e6a411></div><div class="line line-4" data-v-65e6a411></div><div class="line line-5" data-v-65e6a411></div></div><p class="loading-text" data-v-65e6a411>Loading payment data...</p></div>', 1)
      ])])) : (_(), k("div", Pm, [
        l.value ? (_(), k("section", Lm, [
          F[3] || (F[3] = d("p", { class: "section-label" }, "Sales by Payment Method", -1)),
          d("div", Em, [
            (_(!0), k(X, null, ot(r.value.payment_method_breakdown, (P, R) => (_(), k("div", {
              key: P.payment_method,
              class: "payment-method-card-item",
              style: bt(p(R))
            }, [
              d("div", Om, [
                d("div", Rm, [
                  (_(), ht(Zi(M(P.payment_method)), {
                    class: "payment-icon",
                    style: bt(b(R))
                  }, null, 8, ["style"])),
                  d("span", {
                    class: "payment-name",
                    style: bt(v(R))
                  }, S(w(P.payment_method)), 5)
                ]),
                d("p", {
                  class: "payment-amount",
                  style: bt([m(R), x(P.total_amount)])
                }, S(C(P.total_amount)), 5),
                d("div", Im, [
                  d("span", {
                    class: "payment-badge",
                    style: bt(y(R))
                  }, S(A(P.count)) + " " + S(A(P.count) === 1 ? "sale" : "sales"), 5)
                ])
              ])
            ], 4))), 128))
          ])
        ])) : (_(), k("section", zm, [
          d("div", Wm, [
            d("div", Nm, [
              j(B(za), { class: "empty-icon" })
            ]),
            F[4] || (F[4] = d("p", { class: "empty-title" }, "No payment data available", -1)),
            F[5] || (F[5] = d("p", { class: "empty-description" }, "No payment method data found for the selected period. Try adjusting the date range.", -1))
          ])
        ])),
        c.value ? (_(), k("section", Hm, [
          F[8] || (F[8] = d("p", { class: "section-label" }, "Daily Breakdown", -1)),
          d("div", Vm, [
            d("table", jm, [
              F[7] || (F[7] = d("thead", null, [
                d("tr", { class: "table-header-row" }, [
                  d("th", { class: "table-header text-left" }, "Date"),
                  d("th", { class: "table-header text-center" }, "Total Sales"),
                  d("th", { class: "table-header text-center" }, "Total Amount"),
                  d("th", { class: "table-header text-left" }, "Payment Methods")
                ])
              ], -1)),
              d("tbody", Ym, [
                (_(!0), k(X, null, ot(h.value, (P) => (_(), k("tr", {
                  key: P.date,
                  class: "table-row"
                }, [
                  d("td", Um, S($(P.date)), 1),
                  d("td", qm, S(B(W)(P.total_count ?? 0)), 1),
                  d("td", Xm, S(C(P.total_amount)), 1),
                  d("td", Km, [
                    d("div", Gm, [
                      (_(!0), k(X, null, ot(P.payment_methods || [], (R) => (_(), k("div", {
                        key: R.payment_method,
                        class: "payment-tag"
                      }, [
                        d("span", Zm, S(w(R.payment_method)), 1),
                        F[6] || (F[6] = d("span", { class: "tag-separator" }, "•", -1)),
                        d("span", Qm, S(C(R.total_amount)), 1),
                        d("span", Jm, "(" + S(A(R.count)) + ")", 1)
                      ]))), 128))
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (_(), ht(B(gt), {
            key: 0,
            onExport: L,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : z("", !0)
        ])) : l.value ? (_(), k("div", tv, [...F[9] || (F[9] = [
          d("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
        ])])) : z("", !0)
      ]))
    ]));
  }
}), nv = /* @__PURE__ */ G(sv, [["__scopeId", "data-v-65e6a411"]]), av = { class: "agent-human-conv-card" }, iv = {
  key: 0,
  class: "loading-state"
}, ov = {
  key: 1,
  class: "card-body"
}, rv = { class: "summary-cards" }, lv = { class: "summary-card assigned-card" }, cv = { class: "card-content" }, dv = { class: "card-value assigned-value" }, hv = { class: "summary-card closed-card" }, uv = { class: "card-content" }, fv = { class: "card-value closed-value" }, gv = {
  key: 0,
  class: "agents-section"
}, pv = { class: "date-header" }, bv = { class: "date-title" }, mv = { class: "date-stats" }, vv = { class: "stat-item assigned-stat" }, yv = { class: "stat-value" }, _v = { class: "stat-item closed-stat" }, xv = { class: "stat-value" }, kv = { class: "table-wrapper" }, Mv = { class: "data-table" }, Sv = { class: "table-body" }, wv = { class: "table-cell name-cell" }, Cv = { class: "table-cell email-cell" }, $v = { class: "table-cell text-center" }, Dv = { class: "badge assigned-badge" }, Av = { class: "table-cell text-center" }, Tv = { class: "badge closed-badge" }, Fv = {
  key: 1,
  class: "empty-state"
}, Bv = /* @__PURE__ */ Z({
  __name: "AgentHumanConversations",
  props: {
    data: { default: () => ({
      total_assigned: 0,
      total_closed: 0,
      agents_by_day: []
    }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: s }) {
    const n = e, a = s, i = (g) => {
      a("export", g);
    }, { isDark: o } = tt(J(n, "theme")), r = T(() => n.data?.agents_by_day && n.data.agents_by_day.length > 0), l = T(() => {
      if (!r.value) return {};
      const g = {};
      for (const m of n.data.agents_by_day)
        g[m.date] || (g[m.date] = []), g[m.date].push(m);
      const p = Object.keys(g).sort((m, b) => new Date(b).getTime() - new Date(m).getTime()), v = {};
      for (const m of p)
        v[m] = g[m];
      return v;
    }), c = (g) => g == null ? "0" : W(g), h = (g) => {
      const p = new Date(g), v = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return p.toLocaleDateString("en-US", v);
    }, u = (g) => g.reduce((p, v) => p + (v.assigned_count || 0), 0), f = (g) => g.reduce((p, v) => p + (v.closed_count || 0), 0);
    return t({ isDark: o }), (g, p) => (_(), k("article", av, [
      p[9] || (p[9] = d("header", { class: "card-header" }, [
        d("div", { class: "header-content" }, [
          d("h3", { class: "card-title" }, "Agent Human Conversations"),
          d("p", { class: "card-subtitle" }, "Human conversation assignments and closures by agent")
        ])
      ], -1)),
      e.loading ? (_(), k("div", iv, [...p[0] || (p[0] = [
        V('<div class="loading-container" data-v-f023b3b5><div class="chart-bars-loader" data-v-f023b3b5><div class="bar bar-1" data-v-f023b3b5></div><div class="bar bar-2" data-v-f023b3b5></div><div class="bar bar-3" data-v-f023b3b5></div><div class="bar bar-4" data-v-f023b3b5></div><div class="bar bar-5" data-v-f023b3b5></div></div><p class="loading-text" data-v-f023b3b5>Loading agent data...</p></div>', 1)
      ])])) : (_(), k("div", ov, [
        d("div", rv, [
          d("div", lv, [
            p[2] || (p[2] = d("div", { class: "card-decoration" }, null, -1)),
            d("div", cv, [
              p[1] || (p[1] = d("p", { class: "card-label" }, "Total Assigned", -1)),
              d("p", dv, S(c(e.data.total_assigned)), 1)
            ])
          ]),
          d("div", hv, [
            p[4] || (p[4] = d("div", { class: "card-decoration" }, null, -1)),
            d("div", uv, [
              p[3] || (p[3] = d("p", { class: "card-label" }, "Total Closed", -1)),
              d("p", fv, S(c(e.data.total_closed)), 1)
            ])
          ])
        ]),
        r.value ? (_(), k("div", gv, [
          (_(!0), k(X, null, ot(l.value, (v, m) => (_(), k("div", {
            key: m,
            class: "date-group"
          }, [
            d("div", pv, [
              d("h4", bv, S(h(m)), 1),
              d("div", mv, [
                d("span", vv, [
                  d("span", yv, S(c(u(v))), 1),
                  p[5] || (p[5] = pe(" Assigned ", -1))
                ]),
                d("span", _v, [
                  d("span", xv, S(c(f(v))), 1),
                  p[6] || (p[6] = pe(" Closed ", -1))
                ])
              ])
            ]),
            d("div", kv, [
              d("table", Mv, [
                p[7] || (p[7] = d("thead", null, [
                  d("tr", { class: "table-header-row" }, [
                    d("th", { class: "table-header" }, "Agent Name"),
                    d("th", { class: "table-header" }, "Email"),
                    d("th", { class: "table-header" }, "Assigned"),
                    d("th", { class: "table-header" }, "Closed")
                  ])
                ], -1)),
                d("tbody", Sv, [
                  (_(!0), k(X, null, ot(v, (b) => (_(), k("tr", {
                    key: `${m}-${b.agent_email}`,
                    class: "table-row"
                  }, [
                    d("td", wv, S(b.agent_name || "-"), 1),
                    d("td", Cv, S(b.agent_email), 1),
                    d("td", $v, [
                      d("span", Dv, S(c(b.assigned_count)), 1)
                    ]),
                    d("td", Av, [
                      d("span", Tv, S(c(b.closed_count)), 1)
                    ])
                  ]))), 128))
                ])
              ])
            ])
          ]))), 128)),
          e.enableExport ? (_(), ht(B(gt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : z("", !0)
        ])) : (_(), k("div", Fv, [...p[8] || (p[8] = [
          V('<div class="empty-state-content" data-v-f023b3b5><div class="empty-icon-wrapper" data-v-f023b3b5><svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f023b3b5><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-f023b3b5></path></svg></div><p class="empty-title" data-v-f023b3b5>No agent human conversation data available</p><p class="empty-description" data-v-f023b3b5>Try adjusting the date range or check your filters.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Pv = /* @__PURE__ */ G(Bv, [["__scopeId", "data-v-f023b3b5"]]), Lv = { class: "channel-metrics-card" }, Ev = {
  key: 0,
  class: "card-body"
}, Ov = {
  key: 0,
  class: "kpi-grid"
}, Rv = { class: "kpi-label" }, Iv = { class: "kpi-value" }, zv = { class: "kpi-card total-card" }, Wv = { class: "kpi-value" }, Nv = {
  key: 1,
  class: "chart-section"
}, Hv = {
  key: 2,
  class: "empty-state"
}, Vv = {
  key: 1,
  class: "loading-state"
}, jv = /* @__PURE__ */ Z({
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
    const n = e, a = s, i = (f) => {
      a("export", f);
    }, { isDark: o, colors: r } = tt(J(n, "theme")), l = xt({ labels: [], datasets: [] }), c = T(() => n.data ?? {
      channels_by_day: {},
      total_by_channel: {},
      total_conversations: 0
    }), h = T(() => ({
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
          borderColor: o.value ? "rgba(198, 125, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
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
            display: !1
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
    })), u = (f) => {
      if (!f || !f.channels_by_day) {
        l.value = { labels: [], datasets: [] };
        return;
      }
      const g = f.channels_by_day, p = Object.keys(g).sort();
      if (p.length === 0) {
        l.value = { labels: [], datasets: [] };
        return;
      }
      const v = /* @__PURE__ */ new Set();
      for (const x of Object.values(g))
        for (const M of Object.keys(x))
          v.add(M);
      const m = Array.from(v), b = {
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
      }, y = m.map((x) => {
        const M = x.toLowerCase(), w = b[M] || "#9ca3af";
        return {
          label: x.toUpperCase(),
          data: p.map((C) => g[C]?.[x] || 0),
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
        labels: p.map((x) => Tt(x).format("MMM DD")),
        datasets: y
      };
    };
    return Xt(
      () => n.data,
      (f) => {
        u(f ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: o }), (f, g) => (_(), k("article", Lv, [
      g[3] || (g[3] = d("header", { class: "card-header" }, [
        d("div", { class: "header-content" }, [
          d("h3", { class: "card-title" }, "Channel Metrics"),
          d("p", { class: "card-subtitle" }, "Communication channels performance")
        ])
      ], -1)),
      n.loading ? (_(), k("div", Vv, [...g[2] || (g[2] = [
        V('<div class="loading-container" data-v-ffac363e><div class="chart-bars-loader" data-v-ffac363e><div class="bar bar-1" data-v-ffac363e></div><div class="bar bar-2" data-v-ffac363e></div><div class="bar bar-3" data-v-ffac363e></div><div class="bar bar-4" data-v-ffac363e></div><div class="bar bar-5" data-v-ffac363e></div></div><p class="loading-text" data-v-ffac363e>Loading channel metrics...</p></div>', 1)
      ])])) : (_(), k("div", Ev, [
        Object.keys(c.value.total_by_channel).length ? (_(), k("div", Ov, [
          (_(!0), k(X, null, ot(Object.keys(c.value.total_by_channel), (p) => (_(), k("div", {
            class: "kpi-card",
            key: p
          }, [
            d("span", Rv, S(p.toUpperCase()), 1),
            d("span", Iv, S(B(W)(c.value.total_by_channel[p])), 1)
          ]))), 128)),
          d("div", zv, [
            g[0] || (g[0] = d("span", { class: "kpi-label" }, "Total Conversations", -1)),
            d("span", Wv, S(B(W)(c.value.total_conversations)), 1)
          ])
        ])) : z("", !0),
        l.value.labels && l.value.labels.length ? (_(), k("section", Nv, [
          j(re, {
            data: l.value,
            options: h.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (_(), ht(B(gt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : z("", !0)
        ])) : (_(), k("section", Hv, [...g[1] || (g[1] = [
          V('<div class="empty-state-content" data-v-ffac363e><div class="empty-icon-wrapper" data-v-ffac363e><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ffac363e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-ffac363e></path></svg></div><p class="empty-title" data-v-ffac363e>No channel metrics data available</p><p class="empty-description" data-v-ffac363e>No channel data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Yv = /* @__PURE__ */ G(jv, [["__scopeId", "data-v-ffac363e"]]), Uv = { class: "triage-combinations-card" }, qv = { class: "card-header" }, Xv = { class: "total-badge" }, Kv = {
  key: 0,
  class: "card-body"
}, Gv = { class: "chart-container" }, Zv = { class: "table-container" }, Qv = { class: "table-row" }, Jv = { class: "table-row" }, t1 = { class: "table-cell text-center count-cell" }, e1 = { class: "table-cell text-center count-cell" }, s1 = { class: "table-cell text-center count-cell" }, n1 = { class: "table-cell text-center count-cell" }, a1 = { class: "table-cell text-center count-cell" }, i1 = {
  key: 1,
  class: "empty-state"
}, o1 = { class: "empty-state-content" }, r1 = { class: "empty-icon-wrapper" }, l1 = {
  key: 1,
  class: "loading-state"
}, c1 = /* @__PURE__ */ Z({
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
    const n = e, a = s, i = (b) => {
      a("export", b);
    }, { isDark: o, colors: r } = tt(J(n, "theme")), l = T(() => {
      const b = n.data?.combinations || {}, y = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [x, M] of Object.entries(b)) {
        const w = x.split("+").filter(Boolean);
        if (!w.includes("triage")) continue;
        const C = w.filter(($) => $ !== "triage").length;
        C >= 4 ? y["4p"] += Number(M) || 0 : y[C] += Number(M) || 0;
      }
      return y;
    }), c = T(() => {
      const b = l.value;
      return b[0] + b[1] + b[2] + b[3] + b["4p"] || 0;
    }), h = T(() => Object.keys(n.data?.combinations || {}).length > 0), u = T(() => {
      const b = c.value;
      if (!b) return { pct0: 0, pct1: 0, pct2: 0, pct3: 0, pct4p: 0 };
      const y = l.value;
      return {
        pct0: y[0] / b * 100,
        pct1: y[1] / b * 100,
        pct2: y[2] / b * 100,
        pct3: y[3] / b * 100,
        pct4p: y["4p"] / b * 100
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
    }, g = (b) => b?.replace("80", "") || "#888888", p = T(() => ({
      labels: ["Distribution"],
      datasets: [
        {
          label: "0",
          data: [u.value.pct0],
          backgroundColor: f.c0,
          borderColor: g(f.c0),
          borderWidth: 1
        },
        {
          label: "1",
          data: [u.value.pct1],
          backgroundColor: f.c1,
          borderColor: g(f.c1),
          borderWidth: 1
        },
        {
          label: "2",
          data: [u.value.pct2],
          backgroundColor: f.c2,
          borderColor: g(f.c2),
          borderWidth: 1
        },
        {
          label: "3",
          data: [u.value.pct3],
          backgroundColor: f.c3,
          borderColor: g(f.c3),
          borderWidth: 1
        },
        {
          label: "4+",
          data: [u.value.pct4p],
          backgroundColor: f.c4p,
          borderColor: g(f.c4p),
          borderWidth: 1
        }
      ]
    })), v = T(() => ({
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
          borderColor: o.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
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
            label: (b) => `${b.dataset.label} intent(s): ${Number(b.raw || 0).toFixed(0)}%`
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
    })), m = (b) => `${(Number(b) || 0).toFixed(0)}`;
    return t({ isDark: o }), (b, y) => (_(), k("article", Uv, [
      d("header", qv, [
        y[0] || (y[0] = d("div", { class: "header-content" }, [
          d("h3", { class: "card-title" }, "Distribution of Number of Intents"),
          d("p", { class: "card-subtitle" }, "Analysis of intent combinations per conversation")
        ], -1)),
        d("span", Xv, " Total: " + S(c.value), 1)
      ]),
      e.loading ? (_(), k("div", l1, [...y[6] || (y[6] = [
        V('<div class="loading-container" data-v-7c20c8e0><div class="chart-bars-loader" data-v-7c20c8e0><div class="bar bar-1" data-v-7c20c8e0></div><div class="bar bar-2" data-v-7c20c8e0></div><div class="bar bar-3" data-v-7c20c8e0></div><div class="bar bar-4" data-v-7c20c8e0></div><div class="bar bar-5" data-v-7c20c8e0></div></div><p class="loading-text" data-v-7c20c8e0>Loading intent distribution...</p></div>', 1)
      ])])) : (_(), k("div", Kv, [
        h.value ? (_(), k(X, { key: 0 }, [
          d("div", Gv, [
            j(Gt, {
              data: p.value,
              options: v.value
            }, null, 8, ["data", "options"])
          ]),
          d("div", Zv, [
            y[3] || (y[3] = V('<div class="table-header" data-v-7c20c8e0><div class="table-cell header-cell" data-v-7c20c8e0>Number of intentions</div><div class="table-cell header-cell text-center" data-v-7c20c8e0>0</div><div class="table-cell header-cell text-center" data-v-7c20c8e0>1</div><div class="table-cell header-cell text-center" data-v-7c20c8e0>2</div><div class="table-cell header-cell text-center" data-v-7c20c8e0>3</div><div class="table-cell header-cell text-center" data-v-7c20c8e0>4 or more</div></div>', 1)),
            d("div", Qv, [
              y[1] || (y[1] = d("div", { class: "table-cell row-label" }, "% of total", -1)),
              d("div", {
                class: "table-cell text-center percentage-cell",
                style: bt({ color: g(f.c0) })
              }, S(m(u.value.pct0)) + "% ", 5),
              d("div", {
                class: "table-cell text-center percentage-cell",
                style: bt({ color: g(f.c1) })
              }, S(m(u.value.pct1)) + "% ", 5),
              d("div", {
                class: "table-cell text-center percentage-cell",
                style: bt({ color: g(f.c2) })
              }, S(m(u.value.pct2)) + "% ", 5),
              d("div", {
                class: "table-cell text-center percentage-cell",
                style: bt({ color: g(f.c3) })
              }, S(m(u.value.pct3)) + "% ", 5),
              d("div", {
                class: "table-cell text-center percentage-cell",
                style: bt({ color: g(f.c4p) })
              }, S(m(u.value.pct4p)) + "% ", 5)
            ]),
            d("div", Jv, [
              y[2] || (y[2] = d("div", { class: "table-cell row-label" }, "Count", -1)),
              d("div", t1, S(B(W)(l.value[0])), 1),
              d("div", e1, S(B(W)(l.value[1])), 1),
              d("div", s1, S(B(W)(l.value[2])), 1),
              d("div", n1, S(B(W)(l.value[3])), 1),
              d("div", a1, S(B(W)(l.value["4p"])), 1)
            ])
          ]),
          e.enableExport ? (_(), ht(B(gt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : z("", !0)
        ], 64)) : (_(), k("div", i1, [
          d("div", o1, [
            d("div", r1, [
              j(B(wt), { class: "empty-icon" })
            ]),
            y[4] || (y[4] = d("p", { class: "empty-title" }, "No triage combinations data", -1)),
            y[5] || (y[5] = d("p", { class: "empty-description" }, "No intent distribution data found for the selected period. Try adjusting the date range.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), d1 = /* @__PURE__ */ G(c1, [["__scopeId", "data-v-7c20c8e0"]]), h1 = { class: "nps-daily-card" }, u1 = { class: "card-header" }, f1 = { class: "header-content" }, g1 = {
  key: 0,
  class: "stats-badge"
}, p1 = { class: "badge-value" }, b1 = {
  key: 0,
  class: "loading-state"
}, m1 = {
  key: 1,
  class: "card-body"
}, v1 = { class: "tooltip-content" }, y1 = { class: "tooltip-title" }, _1 = { class: "tooltip-stats" }, x1 = { class: "tooltip-stat-row" }, k1 = { class: "tooltip-value" }, M1 = { class: "tooltip-stat-row" }, S1 = { class: "tooltip-value" }, w1 = { class: "tooltip-stat-row" }, C1 = { class: "tooltip-value" }, $1 = { class: "tooltip-stat-row" }, D1 = { class: "tooltip-value" }, A1 = { class: "tooltip-stat-row" }, T1 = { class: "tooltip-value" }, F1 = { class: "tooltip-stat-row" }, B1 = { class: "tooltip-value" }, P1 = {
  key: 2,
  class: "empty-state"
}, Wa = 400, Ce = 60, Na = 90, Ha = 120, L1 = {
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
    const n = s, a = (m) => {
      n("export", m);
    }, i = e, { isDark: o } = tt(J(i, "theme")), r = T(() => i.data), l = xt(null), c = xt({
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
    }), h = T(() => {
      if (!r.value || !r.value.nps_by_day) return 800;
      const m = r.value.nps_by_day.length;
      return Math.max(800, Ce * 2 + m * Ha);
    }), u = (m, b) => {
      const x = (m - 1) / 9;
      return Ce + b - x * b;
    }, f = (m) => m ? Tt(m).format("DD-MM-YYYY") : "", g = T(() => {
      if (!r.value || !r.value.nps_by_day || r.value.nps_by_day.length === 0)
        return [];
      const m = [], b = Wa - Ce - Na;
      return r.value.nps_by_day.forEach((y, x) => {
        const M = y.min_score || 0, w = y.q1_score || 0, C = y.median_score || 0, $ = y.q3_score || 0, A = y.max_score || 0, L = y.average_score || 0;
        m.push({
          label: f(y.date),
          responseCount: y.nps_responses_count || 0,
          isTotal: !1,
          open: w,
          // Q1 as open
          high: A,
          // Max as high
          low: M,
          // Min as low
          close: $,
          // Q3 as close
          median: C,
          average: L,
          openY: u(w, b),
          highY: u(A, b),
          lowY: u(M, b),
          closeY: u($, b),
          medianY: u(C, b),
          averageY: L > 0 ? u(L, b) : null,
          centerX: Ce + (x + 1) * Ha
        });
      }), m;
    }), p = (m, b) => {
      if (!l.value || !b || b.horizontal) return;
      const y = l.value.getBoundingClientRect(), x = m.clientX, M = m.clientY, w = 140, C = 160, $ = 10, A = 15;
      let L = x - y.left - w / 2, D = M - y.top - C - A;
      L = Math.max($, Math.min(L, y.width - w - $)), D < $ && (D = M - y.top + A), D = Math.max($, Math.min(D, y.height - C - $)), c.value = {
        visible: !0,
        x: L,
        y: D,
        date: b.label || "",
        min: b.low !== void 0 ? b.low.toFixed(1) : "N/A",
        max: b.high !== void 0 ? b.high.toFixed(1) : "N/A",
        q1: b.open !== void 0 ? b.open.toFixed(1) : "N/A",
        avg: b.average !== void 0 && b.average > 0 ? b.average.toFixed(1) : "N/A",
        q3: b.close !== void 0 ? b.close.toFixed(1) : "N/A",
        median: b.median !== void 0 ? b.median.toFixed(1) : "N/A"
      };
    }, v = () => {
      c.value.visible = !1;
    };
    return t({ isDark: o }), (m, b) => (_(), k("article", h1, [
      d("header", u1, [
        d("div", f1, [
          b[1] || (b[1] = d("div", { class: "title-section" }, [
            d("h3", { class: "card-title" }, "CSAT Daily Metrics"),
            d("p", { class: "card-subtitle" }, "Daily CSAT Distribution")
          ], -1)),
          r.value && r.value.nps_by_day && r.value.nps_by_day.length > 0 ? (_(), k("div", g1, [
            b[0] || (b[0] = d("p", { class: "badge-label" }, "Days", -1)),
            d("p", p1, S(r.value.nps_by_day.length), 1)
          ])) : z("", !0)
        ])
      ]),
      i.loading ? (_(), k("div", b1, [...b[2] || (b[2] = [
        V('<div class="loading-container" data-v-cfc7b91e><div class="chart-flow-loader" data-v-cfc7b91e><div class="flow-line flow-1" data-v-cfc7b91e></div><div class="flow-line flow-2" data-v-cfc7b91e></div><div class="flow-line flow-3" data-v-cfc7b91e></div><div class="flow-line flow-4" data-v-cfc7b91e></div><div class="flow-line flow-5" data-v-cfc7b91e></div></div><p class="loading-text" data-v-cfc7b91e>Loading daily NPS data...</p></div>', 1)
      ])])) : r.value && r.value.nps_by_day && r.value.nps_by_day.length > 0 ? (_(), k("div", m1, [
        d("div", {
          class: "chart-wrapper",
          ref_key: "chartContainerRef",
          ref: l
        }, [
          g.value && g.value.length > 0 ? (_(), ht(ji, {
            key: 0,
            "candlestick-data": g.value,
            "chart-width": h.value,
            "chart-height": Wa,
            "chart-margin": Ce,
            "chart-bottom-margin": Na,
            "show-legend": !0,
            rotation: 0,
            "candle-width": 30,
            onCandleHover: p,
            onCandleLeave: v
          }, null, 8, ["candlestick-data", "chart-width"])) : z("", !0),
          c.value.visible ? (_(), k("div", {
            key: 1,
            class: "tooltip-overlay",
            style: bt({
              left: `${c.value.x}px`,
              top: `${c.value.y}px`
            })
          }, [
            d("div", v1, [
              d("div", y1, S(c.value.date), 1),
              b[9] || (b[9] = d("div", { class: "tooltip-divider" }, null, -1)),
              d("div", _1, [
                d("div", x1, [
                  b[3] || (b[3] = d("span", { class: "tooltip-label tooltip-min" }, "Min:", -1)),
                  d("span", k1, S(c.value.min), 1)
                ]),
                d("div", M1, [
                  b[4] || (b[4] = d("span", { class: "tooltip-label tooltip-q1" }, "Q1:", -1)),
                  d("span", S1, S(c.value.q1), 1)
                ]),
                d("div", w1, [
                  b[5] || (b[5] = d("span", { class: "tooltip-label tooltip-median" }, "Median:", -1)),
                  d("span", C1, S(c.value.median), 1)
                ]),
                d("div", $1, [
                  b[6] || (b[6] = d("span", { class: "tooltip-label tooltip-avg" }, "Avg:", -1)),
                  d("span", D1, S(c.value.avg), 1)
                ]),
                d("div", A1, [
                  b[7] || (b[7] = d("span", { class: "tooltip-label tooltip-q3" }, "Q3:", -1)),
                  d("span", T1, S(c.value.q3), 1)
                ]),
                d("div", F1, [
                  b[8] || (b[8] = d("span", { class: "tooltip-label tooltip-max" }, "Max:", -1)),
                  d("span", B1, S(c.value.max), 1)
                ])
              ])
            ])
          ], 4)) : z("", !0)
        ], 512),
        e.enableExport ? (_(), ht(B(gt), {
          key: 0,
          onExport: a,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ])) : (_(), k("div", P1, [...b[10] || (b[10] = [
        V('<div class="empty-state-content" data-v-cfc7b91e><div class="empty-icon-wrapper" data-v-cfc7b91e><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-cfc7b91e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-cfc7b91e></path></svg></div><p class="empty-title" data-v-cfc7b91e>No daily NPS data available</p><p class="empty-description" data-v-cfc7b91e>No daily NPS data found for the selected period. Try adjusting the date range.</p></div>', 1)
      ])]))
    ]));
  }
}, Ui = /* @__PURE__ */ G(L1, [["__scopeId", "data-v-cfc7b91e"]]), E1 = { class: "nps-overview-card" }, O1 = { class: "card-header" }, R1 = { class: "header-content" }, I1 = {
  key: 0,
  class: "stats-badge"
}, z1 = { class: "badge-value" }, W1 = {
  key: 0,
  class: "loading-state"
}, N1 = {
  key: 1,
  class: "card-body"
}, H1 = { class: "chart-wrapper" }, V1 = {
  key: 2,
  class: "empty-state"
}, j1 = 500, Y1 = 60, U1 = 80, q1 = {
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
    const n = s, a = (c) => {
      n("export", c);
    }, i = e, { isDark: o } = tt(J(i, "theme")), r = T(() => i.data), l = T(() => Math.max(600, window.innerWidth * 0.85));
    return t({ isDark: o }), (c, h) => (_(), k("article", E1, [
      d("header", O1, [
        d("div", R1, [
          h[1] || (h[1] = d("div", { class: "title-section" }, [
            d("h3", { class: "card-title" }, "CSAT Overview Metrics"),
            d("p", { class: "card-subtitle" }, "Overall CSAT Distribution")
          ], -1)),
          r.value && r.value.total_nps_responses > 0 ? (_(), k("div", I1, [
            h[0] || (h[0] = d("p", { class: "badge-label" }, "Responses", -1)),
            d("p", z1, S(r.value.total_nps_responses), 1)
          ])) : z("", !0)
        ])
      ]),
      i.loading ? (_(), k("div", W1, [...h[2] || (h[2] = [
        V('<div class="loading-container" data-v-bd3e8a95><div class="chart-flow-loader" data-v-bd3e8a95><div class="flow-line flow-1" data-v-bd3e8a95></div><div class="flow-line flow-2" data-v-bd3e8a95></div><div class="flow-line flow-3" data-v-bd3e8a95></div><div class="flow-line flow-4" data-v-bd3e8a95></div><div class="flow-line flow-5" data-v-bd3e8a95></div></div><p class="loading-text" data-v-bd3e8a95>Loading NPS data...</p></div>', 1)
      ])])) : r.value && r.value.total_nps_responses > 0 ? (_(), k("div", N1, [
        d("div", H1, [
          j(Yi, {
            histogram: r.value.histogram || [],
            "min-score": r.value.min_score || 0,
            "max-score": r.value.max_score || 0,
            "q1-score": r.value.q1_score || 0,
            "median-score": r.value.median_score || 0,
            "q3-score": r.value.q3_score || 0,
            "average-score": r.value.average_score || 0,
            "chart-width": l.value,
            "chart-height": j1,
            "chart-margin": Y1,
            "chart-bottom-margin": U1
          }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score", "chart-width"])
        ]),
        e.enableExport ? (_(), ht(B(gt), {
          key: 0,
          onExport: a,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ])) : (_(), k("div", V1, [...h[3] || (h[3] = [
        V('<div class="empty-state-content" data-v-bd3e8a95><div class="empty-icon-wrapper" data-v-bd3e8a95><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-bd3e8a95><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-bd3e8a95></path></svg></div><p class="empty-title" data-v-bd3e8a95>No NPS data available</p><p class="empty-description" data-v-bd3e8a95>No NPS data found for the selected period. Try adjusting the date range.</p></div>', 1)
      ])]))
    ]));
  }
}, qi = /* @__PURE__ */ G(q1, [["__scopeId", "data-v-bd3e8a95"]]), X1 = { class: "nps-metrics-container" }, K1 = {
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
    const s = t, n = (a) => {
      s("export", a);
    };
    return (a, i) => (_(), k("div", X1, [
      j(qi, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: n
      }, null, 8, ["data", "loading", "enable-export"]),
      j(Ui, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: n
      }, null, 8, ["data", "loading", "enable-export"])
    ]));
  }
}, G1 = /* @__PURE__ */ G(K1, [["__scopeId", "data-v-25fe3b80"]]), Z1 = { class: "aws-cost-card" }, Q1 = { class: "card-header" }, J1 = { class: "header-main" }, ty = { class: "header-content" }, ey = { class: "card-title" }, sy = { class: "header-stats" }, ny = { class: "stat-badge primary" }, ay = { class: "stat-value" }, iy = { class: "stat-badge secondary" }, oy = { class: "stat-value" }, ry = { class: "card-body" }, ly = {
  key: 0,
  class: "loading-state"
}, cy = {
  key: 1,
  class: "chart-section"
}, dy = { class: "chart-container" }, hy = {
  key: 2,
  class: "empty-state"
}, uy = { class: "empty-state-content" }, fy = { class: "empty-icon-wrapper" }, gy = {
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
    const t = e, { isDark: s, colors: n } = tt(J(t, "theme")), a = T(() => {
      const r = t.data ?? {}, l = r.daily, c = r.days, h = Array.isArray(l) && l.length > 0, u = Array.isArray(c) && c.length > 0 && Array.isArray(r.allocatedCostSeries) && r.allocatedCostSeries.length === c.length;
      let f = [];
      return h ? f = l : u && (f = c.map((g, p) => ({
        date: g,
        allocated_cost: r.allocatedCostSeries[p] ?? 0,
        aws_cost: r.awsCostSeries[p] ?? 0,
        airline_conversations: r.airlineConversationsSeries[p] ?? 0
      }))), {
        daily: f,
        total_allocated_cost: r.total_allocated_cost ?? r.totalAllocated ?? 0,
        total_cost: r.total_cost ?? r.total ?? 0,
        total_conversations: r.total_conversations ?? r.totalConversations ?? 0,
        total_airline_conversations: r.total_airline_conversations ?? r.totalAirlineConversations ?? 0,
        airline_name: r.airline_name
      };
    }), i = T(() => {
      const r = a.value.daily;
      return {
        labels: r.map((c) => c.date),
        datasets: [
          {
            label: "Allocated Cost",
            data: r.map((c) => c.allocated_cost),
            borderColor: n.value.primaryLight,
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
            data: r.map((c) => c.aws_cost),
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
            data: r.map((c) => c.airline_conversations),
            borderColor: n.value.info,
            backgroundColor: s.value ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)",
            borderWidth: 2,
            pointRadius: 3,
            tension: 0.3,
            yAxisID: "y1"
          }
        ]
      };
    }), o = T(() => ({
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
            color: n.value.textSecondary,
            font: {
              family: "'DM Sans', sans-serif",
              size: 11,
              weight: "600"
            }
          }
        },
        tooltip: {
          padding: 12,
          backgroundColor: n.value.tooltipBg,
          titleColor: n.value.tooltipText,
          bodyColor: n.value.tooltipText,
          borderColor: n.value.tooltipBorder,
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
            color: n.value.gridLines,
            drawBorder: !1
          },
          ticks: {
            color: n.value.textSecondary,
            font: { family: "'DM Sans', sans-serif", size: 10 },
            callback: (r) => it(r)
          }
        },
        y1: {
          type: "linear",
          display: !0,
          position: "right",
          grid: { display: !1 },
          ticks: {
            color: n.value.textSecondary,
            font: { family: "'DM Sans', sans-serif", size: 10 }
          }
        },
        x: {
          grid: { display: !1 },
          ticks: {
            color: n.value.textSecondary,
            font: { family: "'DM Sans', sans-serif", size: 10 }
          }
        }
      }
    }));
    return (r, l) => (_(), k("article", Z1, [
      d("header", Q1, [
        d("div", J1, [
          d("div", ty, [
            d("h3", ey, S(a.value.airline_name || "AWS Cost"), 1),
            l[0] || (l[0] = d("p", { class: "card-subtitle" }, "AWS vs Allocated costs over time", -1))
          ]),
          d("div", sy, [
            d("div", ny, [
              l[1] || (l[1] = d("span", { class: "stat-label" }, "Total Allocated", -1)),
              d("span", ay, S(B(it)(a.value.total_allocated_cost)), 1)
            ]),
            d("div", iy, [
              l[2] || (l[2] = d("span", { class: "stat-label" }, "Total AWS", -1)),
              d("span", oy, S(B(it)(a.value.total_cost)), 1)
            ])
          ])
        ])
      ]),
      d("div", ry, [
        e.loading ? (_(), k("div", ly, [...l[3] || (l[3] = [
          V('<div class="loading-container" data-v-c023bd59><div class="chart-lines-loader" data-v-c023bd59><div class="line line-1" data-v-c023bd59></div><div class="line line-2" data-v-c023bd59></div><div class="line line-3" data-v-c023bd59></div><div class="line line-4" data-v-c023bd59></div><div class="line line-5" data-v-c023bd59></div></div><p class="loading-text" data-v-c023bd59>Loading chart data...</p></div>', 1)
        ])])) : a.value.daily.length > 0 ? (_(), k("div", cy, [
          d("div", dy, [
            j(re, {
              data: i.value,
              options: o.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (_(), k("section", hy, [
          d("div", uy, [
            d("div", fy, [
              j(B(wt), { class: "empty-icon" })
            ]),
            l[4] || (l[4] = d("p", { class: "empty-title" }, "Sin datos de costos", -1)),
            l[5] || (l[5] = d("p", { class: "empty-description" }, "No se encontró información para el periodo seleccionado. Intenta ajustar el rango de fechas.", -1))
          ])
        ]))
      ])
    ]));
  }
}, py = /* @__PURE__ */ G(gy, [["__scopeId", "data-v-c023bd59"]]), by = { class: "cost-usage-card" }, my = {
  key: 0,
  class: "card-body"
}, vy = {
  key: 0,
  class: "chart-section"
}, yy = { class: "chart-container" }, _y = { class: "kpi-grid" }, xy = { class: "kpi-card" }, ky = { class: "kpi-value" }, My = { class: "kpi-card" }, Sy = { class: "kpi-value" }, wy = { class: "kpi-card" }, Cy = { class: "kpi-value" }, $y = { class: "kpi-card" }, Dy = { class: "kpi-value" }, Ay = { class: "kpi-card" }, Ty = { class: "kpi-value" }, Fy = { class: "kpi-card highlighted" }, By = { class: "kpi-value gradient-text" }, Py = {
  key: 1,
  class: "empty-state"
}, Ly = { class: "empty-state-content" }, Ey = { class: "empty-icon-wrapper" }, Oy = {
  key: 1,
  class: "loading-state"
}, Ry = /* @__PURE__ */ Z({
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
    const n = e, { isDark: a, colors: i } = tt(J(n, "theme")), o = (p) => {
      const v = new Date(p), m = String(v.getDate()).padStart(2, "0"), b = String(v.getMonth() + 1).padStart(2, "0");
      return `${m}-${b}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = T(() => {
      const p = n.data?.costs_by_day || {};
      return Object.values(p).reduce((v, m) => v + (m.input_cost || 0), 0);
    }), c = T(() => {
      const p = n.data?.costs_by_day || {};
      return Object.values(p).reduce((v, m) => v + (m.output_cost || 0), 0);
    }), h = T(() => {
      const p = n.data?.costs_by_day || {};
      return Object.values(p).reduce((v, m) => v + (m.cache_read_cost || 0), 0);
    }), u = T(() => {
      const p = n.data?.costs_by_day || {};
      return Object.values(p).reduce((v, m) => v + (m.cache_write_cost || 0), 0);
    }), f = T(() => {
      const p = n.data?.costs_by_day || {}, v = Object.keys(p).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const m = v.map((y) => o(y)), b = [
        {
          label: "Input Cost",
          data: v.map((y) => p[y]?.input_cost || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: v.map((y) => p[y]?.output_cost || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: v.map((y) => p[y]?.cache_read_cost || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: v.map((y) => p[y]?.cache_write_cost || 0),
          backgroundColor: `${r.cache_write}80`,
          borderColor: r.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: m,
        datasets: b
      };
    }), g = T(() => n.options ? n.options : {
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
            color: i.value.textSecondary,
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
          backgroundColor: i.value.tooltipBg,
          titleColor: i.value.tooltipText,
          bodyColor: i.value.tooltipText,
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
            label: function(p) {
              let v = p.dataset.label || "";
              return v && (v += ": "), p.parsed.y !== null && (v += it(p.parsed.y)), v;
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
            color: i.value.textSecondary,
            padding: 8
          }
        },
        y: {
          stacked: !0,
          beginAtZero: !0,
          border: { display: !1 },
          grid: {
            color: i.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: i.value.textSecondary,
            padding: 8,
            callback: function(p) {
              return it(p);
            }
          }
        }
      }
    });
    return t({ isDark: a }), (p, v) => (_(), k("article", by, [
      v[9] || (v[9] = d("header", { class: "card-header" }, [
        d("div", { class: "header-content" }, [
          d("h3", { class: "card-title" }, "Cost Usage"),
          d("p", { class: "card-subtitle" }, "Cost breakdown over time (stacked)")
        ])
      ], -1)),
      e.loading ? (_(), k("div", Oy, [...v[8] || (v[8] = [
        V('<div class="loading-container" data-v-62f96954><div class="chart-lines-loader" data-v-62f96954><div class="line line-1" data-v-62f96954></div><div class="line line-2" data-v-62f96954></div><div class="line line-3" data-v-62f96954></div><div class="line line-4" data-v-62f96954></div><div class="line line-5" data-v-62f96954></div></div><p class="loading-text" data-v-62f96954>Loading chart data...</p></div>', 1)
      ])])) : (_(), k("div", my, [
        f.value.labels && f.value.labels.length ? (_(), k("section", vy, [
          d("div", yy, [
            j(Gt, {
              data: f.value,
              options: g.value,
              stacked: !0
            }, null, 8, ["data", "options"])
          ]),
          d("footer", _y, [
            d("div", xy, [
              v[0] || (v[0] = d("span", { class: "kpi-label" }, "Total Cost", -1)),
              d("span", ky, S(B(it)(e.data.total_cost)), 1)
            ]),
            d("div", My, [
              v[1] || (v[1] = d("span", { class: "kpi-label" }, "Input Cost", -1)),
              d("span", Sy, S(B(it)(l.value)), 1)
            ]),
            d("div", wy, [
              v[2] || (v[2] = d("span", { class: "kpi-label" }, "Output Cost", -1)),
              d("span", Cy, S(B(it)(c.value)), 1)
            ]),
            d("div", $y, [
              v[3] || (v[3] = d("span", { class: "kpi-label" }, "Cache Read", -1)),
              d("span", Dy, S(B(it)(h.value)), 1)
            ]),
            d("div", Ay, [
              v[4] || (v[4] = d("span", { class: "kpi-label" }, "Cache Write", -1)),
              d("span", Ty, S(B(it)(u.value)), 1)
            ]),
            d("div", Fy, [
              v[5] || (v[5] = d("span", { class: "kpi-label" }, "Avg / Conv.", -1)),
              d("span", By, S(B(it)(e.data.avg_cost_per_conversation)), 1)
            ])
          ])
        ])) : (_(), k("section", Py, [
          d("div", Ly, [
            d("div", Ey, [
              j(B(wt), { class: "empty-icon" })
            ]),
            v[6] || (v[6] = d("p", { class: "empty-title" }, "No cost usage data", -1)),
            v[7] || (v[7] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see cost breakdown trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Iy = /* @__PURE__ */ G(Ry, [["__scopeId", "data-v-62f96954"]]), zy = { class: "token-usage-card" }, Wy = {
  key: 0,
  class: "card-body"
}, Ny = {
  key: 0,
  class: "chart-section"
}, Hy = { class: "chart-container" }, Vy = { class: "kpi-grid" }, jy = { class: "kpi-card" }, Yy = { class: "kpi-value" }, Uy = { class: "kpi-card" }, qy = { class: "kpi-value" }, Xy = { class: "kpi-card" }, Ky = { class: "kpi-value" }, Gy = { class: "kpi-card" }, Zy = { class: "kpi-value" }, Qy = { class: "kpi-card" }, Jy = { class: "kpi-value" }, t_ = {
  key: 1,
  class: "empty-state"
}, e_ = { class: "empty-state-content" }, s_ = { class: "empty-icon-wrapper" }, n_ = {
  key: 1,
  class: "loading-state"
}, a_ = /* @__PURE__ */ Z({
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
    const n = e, { isDark: a, colors: i } = tt(J(n, "theme")), o = (h) => {
      const u = new Date(h), f = String(u.getDate()).padStart(2, "0"), g = String(u.getMonth() + 1).padStart(2, "0");
      return `${f}-${g}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = T(() => {
      const h = n.data?.tokens_by_day || {}, u = Object.keys(h).sort();
      if (u.length === 0)
        return { labels: [], datasets: [] };
      const f = u.map((p) => o(p)), g = [
        {
          label: "Input Tokens",
          data: u.map((p) => h[p]?.input_tokens || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Tokens",
          data: u.map((p) => h[p]?.output_tokens || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read",
          data: u.map((p) => h[p]?.cache_read_tokens || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write",
          data: u.map((p) => h[p]?.cache_write_tokens || 0),
          backgroundColor: `${r.cache_write}80`,
          borderColor: r.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: f,
        datasets: g
      };
    }), c = T(() => n.options ? n.options : {
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
            color: i.value.textSecondary,
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
          backgroundColor: i.value.tooltipBg,
          titleColor: i.value.tooltipText,
          bodyColor: i.value.tooltipText,
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
            color: i.value.textSecondary,
            padding: 8
          }
        },
        y: {
          stacked: !0,
          beginAtZero: !0,
          border: { display: !1 },
          grid: {
            color: i.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: i.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: a }), (h, u) => (_(), k("article", zy, [
      u[8] || (u[8] = d("header", { class: "card-header" }, [
        d("div", { class: "header-content" }, [
          d("h3", { class: "card-title" }, "Token Usage"),
          d("p", { class: "card-subtitle" }, "Token consumption over time (stacked)")
        ])
      ], -1)),
      e.loading ? (_(), k("div", n_, [...u[7] || (u[7] = [
        V('<div class="loading-container" data-v-e9e355be><div class="chart-lines-loader" data-v-e9e355be><div class="line line-1" data-v-e9e355be></div><div class="line line-2" data-v-e9e355be></div><div class="line line-3" data-v-e9e355be></div><div class="line line-4" data-v-e9e355be></div><div class="line line-5" data-v-e9e355be></div></div><p class="loading-text" data-v-e9e355be>Loading chart data...</p></div>', 1)
      ])])) : (_(), k("div", Wy, [
        l.value.labels && l.value.labels.length ? (_(), k("section", Ny, [
          d("div", Hy, [
            j(Gt, {
              data: l.value,
              options: c.value,
              stacked: !0
            }, null, 8, ["data", "options"])
          ]),
          d("footer", Vy, [
            d("div", jy, [
              u[0] || (u[0] = d("span", { class: "kpi-label" }, "Total Tokens", -1)),
              d("span", Yy, S(B(W)(e.data.total_tokens)), 1)
            ]),
            d("div", Uy, [
              u[1] || (u[1] = d("span", { class: "kpi-label" }, "Input", -1)),
              d("span", qy, S(B(W)(e.data.total_input_tokens)), 1)
            ]),
            d("div", Xy, [
              u[2] || (u[2] = d("span", { class: "kpi-label" }, "Output", -1)),
              d("span", Ky, S(B(W)(e.data.total_output_tokens)), 1)
            ]),
            d("div", Gy, [
              u[3] || (u[3] = d("span", { class: "kpi-label" }, "Cache Read", -1)),
              d("span", Zy, S(B(W)(e.data.total_cache_read_tokens)), 1)
            ]),
            d("div", Qy, [
              u[4] || (u[4] = d("span", { class: "kpi-label" }, "Cache Write", -1)),
              d("span", Jy, S(B(W)(e.data.total_cache_write_tokens)), 1)
            ])
          ])
        ])) : (_(), k("section", t_, [
          d("div", e_, [
            d("div", s_, [
              j(B(wt), { class: "empty-icon" })
            ]),
            u[5] || (u[5] = d("p", { class: "empty-title" }, "No token usage data", -1)),
            u[6] || (u[6] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see token consumption trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), i_ = /* @__PURE__ */ G(a_, [["__scopeId", "data-v-e9e355be"]]), o_ = { class: "conversation-count-card" }, r_ = { class: "card-header" }, l_ = { class: "header-right" }, c_ = { class: "stat-badge" }, d_ = { class: "stat-value" }, h_ = {
  key: 0,
  class: "card-body"
}, u_ = {
  key: 0,
  class: "chart-section"
}, f_ = { class: "chart-container" }, g_ = {
  key: 1,
  class: "empty-state"
}, p_ = { class: "empty-state-content" }, b_ = { class: "empty-icon-wrapper" }, m_ = {
  key: 1,
  class: "loading-state"
}, v_ = /* @__PURE__ */ Z({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: n, colors: a } = tt(J(s, "theme")), i = (l) => {
      const c = new Date(l), h = String(c.getDate()).padStart(2, "0");
      return `${String(c.getMonth() + 1).padStart(2, "0")}-${h}`;
    };
    T(() => {
      if (s.data?.start_date && s.data?.end_date) {
        const l = i(s.data.start_date), c = i(s.data.end_date);
        return `${l} - ${c}`;
      }
      return "N/A";
    });
    const o = T(() => {
      const l = s.data?.conversations_by_day || {}, c = Object.keys(l).sort();
      if (c.length === 0)
        return { labels: [], datasets: [] };
      const h = c.map((f) => i(f)), u = [
        {
          label: "Conversations",
          data: c.map((f) => l[f] || 0),
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
        datasets: u
      };
    }), r = T(() => s.options ? s.options : {
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
            color: a.value.textSecondary,
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
          backgroundColor: a.value.tooltipBg,
          titleColor: a.value.tooltipText,
          bodyColor: a.value.tooltipText,
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
            label: function(l) {
              let c = l.dataset.label || "";
              return c && (c += ": "), l.parsed.y !== null && (c += l.parsed.y), c;
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
            color: a.value.textSecondary,
            padding: 8
          }
        },
        y: {
          beginAtZero: !0,
          border: { display: !1 },
          grid: {
            color: a.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: a.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: n }), (l, c) => (_(), k("article", o_, [
      d("header", r_, [
        c[1] || (c[1] = d("div", { class: "header-left" }, [
          d("div", { class: "header-content" }, [
            d("h3", { class: "card-title" }, "Conversation Count"),
            d("p", { class: "card-subtitle" }, "Conversations over time")
          ])
        ], -1)),
        d("div", l_, [
          d("div", c_, [
            c[0] || (c[0] = d("span", { class: "stat-label" }, "Total", -1)),
            d("span", d_, S(e.data.total_conversations || 0), 1)
          ])
        ])
      ]),
      e.loading ? (_(), k("div", m_, [...c[4] || (c[4] = [
        V('<div class="loading-container" data-v-96b514f1><div class="chart-lines-loader" data-v-96b514f1><div class="line line-1" data-v-96b514f1></div><div class="line line-2" data-v-96b514f1></div><div class="line line-3" data-v-96b514f1></div><div class="line line-4" data-v-96b514f1></div><div class="line line-5" data-v-96b514f1></div></div><p class="loading-text" data-v-96b514f1>Loading chart data...</p></div>', 1)
      ])])) : (_(), k("div", h_, [
        o.value.labels && o.value.labels.length ? (_(), k("section", u_, [
          d("div", f_, [
            j(re, {
              data: o.value,
              options: r.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (_(), k("section", g_, [
          d("div", p_, [
            d("div", b_, [
              j(B(wt), { class: "empty-icon" })
            ]),
            c[2] || (c[2] = d("p", { class: "empty-title" }, "No conversation count data", -1)),
            c[3] || (c[3] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), y_ = /* @__PURE__ */ G(v_, [["__scopeId", "data-v-96b514f1"]]), __ = { class: "top-agents-card" }, x_ = {
  key: 0,
  class: "card-body"
}, k_ = {
  key: 0,
  class: "charts-grid"
}, M_ = { class: "chart-section" }, S_ = { class: "chart-container" }, w_ = { class: "chart-section" }, C_ = { class: "chart-container" }, $_ = {
  key: 1,
  class: "empty-state"
}, D_ = { class: "empty-state-content" }, A_ = { class: "empty-icon-wrapper" }, T_ = {
  key: 1,
  class: "loading-state"
}, F_ = /* @__PURE__ */ Z({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: n, colors: a } = tt(J(s, "theme")), i = T(() => s.data?.top_agents && s.data.top_agents.length > 0), o = T(() => s.data?.top_agents ? [...s.data.top_agents].sort((f, g) => (g.total_cost || 0) - (f.total_cost || 0)) : []), r = T(() => s.data?.top_agents ? [...s.data.top_agents].sort((f, g) => (g.total_tokens || 0) - (f.total_tokens || 0)) : []), l = T(() => {
      const f = o.value;
      return f.length === 0 ? { labels: [], datasets: [] } : {
        labels: f.map((g) => g.agent_type),
        datasets: [
          {
            label: "Total Cost",
            data: f.map((g) => g.total_cost || 0),
            backgroundColor: "#a78bfa80",
            borderColor: "#a78bfa",
            borderWidth: 1
          }
        ]
      };
    }), c = T(() => {
      const f = r.value;
      return f.length === 0 ? { labels: [], datasets: [] } : {
        labels: f.map((g) => g.agent_type),
        datasets: [
          {
            label: "Total Tokens",
            data: f.map((g) => g.total_tokens || 0),
            backgroundColor: "#f59e0b80",
            borderColor: "#f59e0b",
            borderWidth: 1
          }
        ]
      };
    }), h = T(() => s.options ? s.options : {
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: {
          display: !1
        },
        tooltip: {
          enabled: !0,
          backgroundColor: a.value.tooltipBg,
          titleColor: a.value.tooltipText,
          bodyColor: a.value.tooltipText,
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
              const g = f.label, p = s.data?.top_agents?.find((v) => v.agent_type === g);
              return p ? [
                `Total Cost: ${it(p.total_cost)}`,
                `Input Cost: ${it(p.total_input_tokens_cost)}`,
                `Output Cost: ${it(p.total_output_tokens_cost)}`,
                `Cache Read: ${it(p.total_read_tokens_cost)}`,
                `Cache Write: ${it(p.total_write_tokens_cost)}`
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
            color: a.value.textSecondary,
            padding: 8
          }
        },
        y: {
          beginAtZero: !0,
          border: { display: !1 },
          grid: {
            color: a.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: a.value.textSecondary,
            padding: 8,
            callback: function(f) {
              return it(f);
            }
          }
        }
      }
    }), u = T(() => s.options ? s.options : {
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: {
          display: !1
        },
        tooltip: {
          enabled: !0,
          backgroundColor: a.value.tooltipBg,
          titleColor: a.value.tooltipText,
          bodyColor: a.value.tooltipText,
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
              const g = f.label, p = s.data?.top_agents?.find((v) => v.agent_type === g);
              return p ? [
                `Total Tokens: ${p.total_tokens.toLocaleString()}`,
                `Input Tokens: ${p.total_input_tokens.toLocaleString()}`,
                `Output Tokens: ${p.total_output_tokens.toLocaleString()}`,
                `Cache Read: ${p.total_read_tokens.toLocaleString()}`,
                `Cache Write: ${p.total_write_tokens.toLocaleString()}`
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
            color: a.value.textSecondary,
            padding: 8
          }
        },
        y: {
          beginAtZero: !0,
          border: { display: !1 },
          grid: {
            color: a.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: a.value.textSecondary,
            padding: 8,
            callback: function(f) {
              return f.toLocaleString();
            }
          }
        }
      }
    });
    return t({ isDark: n }), (f, g) => (_(), k("article", __, [
      g[5] || (g[5] = d("header", { class: "card-header" }, [
        d("div", { class: "header-content" }, [
          d("h3", { class: "card-title" }, "Top Agents Analysis"),
          d("p", { class: "card-subtitle" }, "Cost and token usage by agent")
        ])
      ], -1)),
      e.loading ? (_(), k("div", T_, [...g[4] || (g[4] = [
        V('<div class="loading-container" data-v-78efa6dc><div class="chart-lines-loader" data-v-78efa6dc><div class="line line-1" data-v-78efa6dc></div><div class="line line-2" data-v-78efa6dc></div><div class="line line-3" data-v-78efa6dc></div><div class="line line-4" data-v-78efa6dc></div><div class="line line-5" data-v-78efa6dc></div></div><p class="loading-text" data-v-78efa6dc>Loading chart data...</p></div>', 1)
      ])])) : (_(), k("div", x_, [
        i.value ? (_(), k("div", k_, [
          d("section", M_, [
            g[0] || (g[0] = d("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
            d("div", S_, [
              j(Gt, {
                data: l.value,
                options: h.value
              }, null, 8, ["data", "options"])
            ])
          ]),
          d("section", w_, [
            g[1] || (g[1] = d("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
            d("div", C_, [
              j(Gt, {
                data: c.value,
                options: u.value
              }, null, 8, ["data", "options"])
            ])
          ])
        ])) : (_(), k("section", $_, [
          d("div", D_, [
            d("div", A_, [
              j(B(wt), { class: "empty-icon" })
            ]),
            g[2] || (g[2] = d("p", { class: "empty-title" }, "No top agents data", -1)),
            g[3] || (g[3] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent analysis.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), B_ = /* @__PURE__ */ G(F_, [["__scopeId", "data-v-78efa6dc"]]), P_ = { class: "top-agents-card" }, L_ = {
  key: 0,
  class: "card-body"
}, E_ = {
  key: 0,
  class: "chart-section"
}, O_ = { class: "chart-container" }, R_ = {
  key: 1,
  class: "empty-state"
}, I_ = { class: "empty-state-content" }, z_ = { class: "empty-icon-wrapper" }, W_ = {
  key: 1,
  class: "loading-state"
}, N_ = /* @__PURE__ */ Z({
  __name: "TopAgents",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: n, colors: a } = tt(J(s, "theme")), i = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, o = T(() => s.data?.top_agents ? s.data.top_agents.filter(
      (u) => u.agent_type?.toLowerCase() !== "triage"
    ) : []), r = T(() => o.value.length > 0), l = T(() => o.value.reduce((u, f) => u + (f.conversations || 0), 0)), c = T(() => {
      const u = o.value;
      if (u.length === 0)
        return { labels: [], datasets: [] };
      const f = u.map((v) => {
        const m = v.agent_type?.toLowerCase();
        return (i[m] || "#a78bfa") + "80";
      }), g = u.map((v) => {
        const m = v.agent_type?.toLowerCase();
        return i[m] || "#a78bfa";
      });
      return {
        labels: u.map((v) => {
          const m = v.conversations || 0, b = l.value ? m / l.value * 100 : 0;
          return `${v.agent_type} - ${m.toLocaleString()} (${b.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: u.map((v) => v.conversations || 0),
            backgroundColor: f,
            borderColor: g,
            borderWidth: 2
          }
        ]
      };
    }), h = T(() => s.options ? s.options : {
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
            color: a.value.textSecondary,
            usePointStyle: !0,
            padding: 16,
            boxWidth: 8,
            boxHeight: 8
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: a.value.tooltipBg,
          titleColor: a.value.tooltipText,
          bodyColor: a.value.tooltipText,
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
            label: (u) => {
              const f = (u.label || "").toString(), g = Number(u.parsed) || 0, p = (u.dataset.data || []).reduce((m, b) => m + (Number(b) || 0), 0), v = p ? g / p * 100 : 0;
              return `${f}: ${g.toLocaleString()} (${v.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: n }), (u, f) => (_(), k("article", P_, [
      f[3] || (f[3] = d("header", { class: "card-header" }, [
        d("div", { class: "header-content" }, [
          d("h3", { class: "card-title" }, "Top Agents"),
          d("p", { class: "card-subtitle" }, "Interactions by agent (excluding triage)")
        ])
      ], -1)),
      e.loading ? (_(), k("div", W_, [...f[2] || (f[2] = [
        V('<div class="loading-container" data-v-05e3e74d><div class="chart-lines-loader" data-v-05e3e74d><div class="line line-1" data-v-05e3e74d></div><div class="line line-2" data-v-05e3e74d></div><div class="line line-3" data-v-05e3e74d></div><div class="line line-4" data-v-05e3e74d></div><div class="line line-5" data-v-05e3e74d></div></div><p class="loading-text" data-v-05e3e74d>Loading chart data...</p></div>', 1)
      ])])) : (_(), k("div", L_, [
        r.value ? (_(), k("section", E_, [
          d("div", O_, [
            j(fn, {
              data: c.value,
              options: h.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (_(), k("section", R_, [
          d("div", I_, [
            d("div", z_, [
              j(B(wt), { class: "empty-icon" })
            ]),
            f[0] || (f[0] = d("p", { class: "empty-title" }, "No top agents data", -1)),
            f[1] || (f[1] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), H_ = /* @__PURE__ */ G(N_, [["__scopeId", "data-v-05e3e74d"]]), V_ = { class: "daily-cost-trends-card" }, j_ = {
  key: 0,
  class: "card-body"
}, Y_ = {
  key: 0,
  class: "chart-section"
}, U_ = { class: "chart-container" }, q_ = {
  key: 1,
  class: "empty-state"
}, X_ = { class: "empty-state-content" }, K_ = { class: "empty-icon-wrapper" }, G_ = {
  key: 1,
  class: "loading-state"
}, Z_ = /* @__PURE__ */ Z({
  __name: "DailyCostTrends",
  props: {
    costData: { default: () => ({}) },
    conversationData: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: n, colors: a } = tt(J(s, "theme")), i = (c) => {
      const h = new Date(c), u = String(h.getDate()).padStart(2, "0");
      return `${String(h.getMonth() + 1).padStart(2, "0")}-${u}`;
    }, o = T(() => {
      const c = s.costData?.costs_by_day || {}, h = s.conversationData?.conversations_by_day || {};
      return Object.keys(c).length > 0 && Object.keys(h).length > 0;
    }), r = T(() => {
      const c = s.costData?.costs_by_day || {}, h = s.conversationData?.conversations_by_day || {}, f = Object.keys(c).filter((v) => h[v]).sort();
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const g = f.map((v) => i(v)), p = f.map((v) => {
        const m = c[v]?.total_cost || 0, b = h[v] || 0;
        return b > 0 ? m / b : 0;
      });
      return {
        labels: g,
        datasets: [
          {
            label: "Mean USD/conv",
            data: p,
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
    }), l = T(() => s.options ? s.options : {
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
            color: a.value.textSecondary,
            padding: 12,
            boxWidth: 40,
            boxHeight: 12,
            borderRadius: 4,
            usePointStyle: !1
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: a.value.tooltipBg,
          titleColor: a.value.tooltipText,
          bodyColor: a.value.tooltipText,
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
              let h = c.dataset.label || "";
              return h && (h += ": "), c.parsed.y !== null && (h += it(c.parsed.y)), h;
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
            color: a.value.textSecondary,
            padding: 8
          }
        },
        y: {
          beginAtZero: !0,
          border: { display: !1 },
          grid: {
            color: a.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: a.value.textSecondary,
            padding: 8,
            callback: function(c) {
              return it(c);
            }
          }
        }
      }
    });
    return t({ isDark: n }), (c, h) => (_(), k("article", V_, [
      h[3] || (h[3] = d("header", { class: "card-header" }, [
        d("div", { class: "header-content" }, [
          d("h3", { class: "card-title" }, "Daily Cost Trends"),
          d("p", { class: "card-subtitle" }, "Mean USD/conversation per day")
        ])
      ], -1)),
      e.loading ? (_(), k("div", G_, [...h[2] || (h[2] = [
        V('<div class="loading-container" data-v-4c15653f><div class="chart-lines-loader" data-v-4c15653f><div class="line line-1" data-v-4c15653f></div><div class="line line-2" data-v-4c15653f></div><div class="line line-3" data-v-4c15653f></div><div class="line line-4" data-v-4c15653f></div><div class="line line-5" data-v-4c15653f></div></div><p class="loading-text" data-v-4c15653f>Loading chart data...</p></div>', 1)
      ])])) : (_(), k("div", j_, [
        o.value ? (_(), k("section", Y_, [
          d("div", U_, [
            j(re, {
              data: r.value,
              options: l.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (_(), k("section", q_, [
          d("div", X_, [
            d("div", K_, [
              j(B(wt), { class: "empty-icon" })
            ]),
            h[0] || (h[0] = d("p", { class: "empty-title" }, "No daily cost trends data", -1)),
            h[1] || (h[1] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Q_ = /* @__PURE__ */ G(Z_, [["__scopeId", "data-v-4c15653f"]]), J_ = { class: "model-usage-card" }, t2 = {
  key: 0,
  class: "loading-state"
}, e2 = {
  key: 1,
  class: "card-body"
}, s2 = { class: "tabs-container" }, n2 = {
  class: "tabs-nav",
  "aria-label": "Model Usage Tabs"
}, a2 = ["aria-selected"], i2 = ["aria-selected"], o2 = {
  key: 0,
  class: "table-section"
}, r2 = { class: "table-wrapper" }, l2 = { class: "data-table" }, c2 = { class: "table-header-row" }, d2 = { class: "table-header" }, h2 = { class: "table-body" }, u2 = { class: "table-cell name-cell" }, f2 = { class: "table-cell text-center" }, g2 = { class: "table-cell text-center" }, p2 = { class: "table-cell text-center" }, b2 = { class: "table-cell text-center cost-cell" }, m2 = { class: "table-cell text-center" }, v2 = {
  key: 1,
  class: "empty-state"
}, y2 = { class: "empty-state-content" }, _2 = { class: "empty-icon-wrapper" }, x2 = /* @__PURE__ */ Z({
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
    const n = e, a = s, i = (u) => {
      a("export", u);
    }, { isDark: o } = tt(J(n, "theme")), r = xt("by_model"), l = T(() => r.value === "by_model" ? n.data?.total_by_model || {} : n.data?.total_by_provider || {}), c = (u) => u == null ? "0" : W(u), h = (u) => u == null ? "$0.00" : it(u);
    return t({ isDark: o }), (u, f) => (_(), k("article", J_, [
      f[10] || (f[10] = d("header", { class: "card-header" }, [
        d("div", { class: "header-content" }, [
          d("h3", { class: "card-title" }, "Model Usage"),
          d("p", { class: "card-subtitle" }, "AI model performance and costs")
        ])
      ], -1)),
      e.loading ? (_(), k("div", t2, [...f[2] || (f[2] = [
        V('<div class="loading-container" data-v-a7bf2d7b><div class="chart-bars-loader" data-v-a7bf2d7b><div class="bar bar-1" data-v-a7bf2d7b></div><div class="bar bar-2" data-v-a7bf2d7b></div><div class="bar bar-3" data-v-a7bf2d7b></div><div class="bar bar-4" data-v-a7bf2d7b></div><div class="bar bar-5" data-v-a7bf2d7b></div></div><p class="loading-text" data-v-a7bf2d7b>Loading model usage data...</p></div>', 1)
      ])])) : (_(), k("div", e2, [
        d("div", s2, [
          d("nav", n2, [
            d("button", {
              onClick: f[0] || (f[0] = (g) => r.value = "by_model"),
              class: as(["tab-button", { "tab-active": r.value === "by_model" }]),
              "aria-selected": r.value === "by_model",
              role: "tab"
            }, " Model ", 10, a2),
            d("button", {
              onClick: f[1] || (f[1] = (g) => r.value = "by_provider"),
              class: as(["tab-button", { "tab-active": r.value === "by_provider" }]),
              "aria-selected": r.value === "by_provider",
              role: "tab"
            }, " Provider ", 10, i2)
          ])
        ]),
        l.value && Object.keys(l.value).length > 0 ? (_(), k("div", o2, [
          d("div", r2, [
            d("table", l2, [
              d("thead", null, [
                d("tr", c2, [
                  d("th", d2, S(r.value === "by_model" ? "Model" : "Provider"), 1),
                  f[3] || (f[3] = d("th", { class: "table-header" }, "Avg cost per message", -1)),
                  f[4] || (f[4] = d("th", { class: "table-header" }, "Avg tokens per message", -1)),
                  f[5] || (f[5] = d("th", { class: "table-header" }, "Message count", -1)),
                  f[6] || (f[6] = d("th", { class: "table-header" }, "Total cost", -1)),
                  f[7] || (f[7] = d("th", { class: "table-header" }, "Total tokens", -1))
                ])
              ]),
              d("tbody", h2, [
                (_(!0), k(X, null, ot(l.value, (g, p) => (_(), k("tr", {
                  key: p,
                  class: "table-row"
                }, [
                  d("td", u2, S(p), 1),
                  d("td", f2, S(h(g.avg_cost_per_message)), 1),
                  d("td", g2, S(c(g.avg_tokens_per_message)), 1),
                  d("td", p2, S(c(g.message_count)), 1),
                  d("td", b2, S(h(g.total_cost)), 1),
                  d("td", m2, S(c(g.total_tokens)), 1)
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (_(), ht(B(gt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : z("", !0)
        ])) : (_(), k("div", v2, [
          d("div", y2, [
            d("div", _2, [
              j(B(wt), { class: "empty-icon" })
            ]),
            f[8] || (f[8] = d("p", { class: "empty-title" }, "No model usage data available", -1)),
            f[9] || (f[9] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see model performance metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), k2 = /* @__PURE__ */ G(x2, [["__scopeId", "data-v-a7bf2d7b"]]), M2 = { class: "message-roles-card" }, S2 = {
  key: 0,
  class: "loading-state"
}, w2 = {
  key: 1,
  class: "card-body"
}, C2 = {
  key: 0,
  class: "table-section"
}, $2 = { class: "table-wrapper" }, D2 = { class: "data-table" }, A2 = { class: "table-body" }, T2 = { class: "table-cell name-cell" }, F2 = { class: "table-cell text-center" }, B2 = { class: "table-cell text-center" }, P2 = { class: "table-cell text-center" }, L2 = { class: "table-cell text-center cost-cell" }, E2 = { class: "table-cell text-center" }, O2 = {
  key: 1,
  class: "empty-state"
}, R2 = { class: "empty-state-content" }, I2 = { class: "empty-icon-wrapper" }, z2 = /* @__PURE__ */ Z({
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
    const n = e, a = s, i = (g) => {
      a("export", g);
    }, { isDark: o } = tt(J(n, "theme")), r = ["assistant", "system", "user"], l = T(() => n.data?.total_by_role || {}), c = T(() => Object.keys(l.value).length > 0), h = (g) => g == null ? "0" : W(g), u = (g) => g == null ? "$0.00" : it(g), f = (g) => g.charAt(0).toUpperCase() + g.slice(1);
    return t({ isDark: o }), (g, p) => (_(), k("article", M2, [
      p[4] || (p[4] = d("header", { class: "card-header" }, [
        d("div", { class: "header-content" }, [
          d("h3", { class: "card-title" }, "Message Roles"),
          d("p", { class: "card-subtitle" }, "Performance by message role")
        ])
      ], -1)),
      e.loading ? (_(), k("div", S2, [...p[0] || (p[0] = [
        V('<div class="loading-container" data-v-6a953cfc><div class="chart-bars-loader" data-v-6a953cfc><div class="bar bar-1" data-v-6a953cfc></div><div class="bar bar-2" data-v-6a953cfc></div><div class="bar bar-3" data-v-6a953cfc></div><div class="bar bar-4" data-v-6a953cfc></div><div class="bar bar-5" data-v-6a953cfc></div></div><p class="loading-text" data-v-6a953cfc>Loading message role data...</p></div>', 1)
      ])])) : (_(), k("div", w2, [
        c.value ? (_(), k("div", C2, [
          d("div", $2, [
            d("table", D2, [
              p[1] || (p[1] = d("thead", null, [
                d("tr", { class: "table-header-row" }, [
                  d("th", { class: "table-header" }, "Role"),
                  d("th", { class: "table-header" }, "Avg cost per message"),
                  d("th", { class: "table-header" }, "Avg tokens per message"),
                  d("th", { class: "table-header" }, "Message count"),
                  d("th", { class: "table-header" }, "Total cost"),
                  d("th", { class: "table-header" }, "Total tokens")
                ])
              ], -1)),
              d("tbody", A2, [
                (_(), k(X, null, ot(r, (v) => d("tr", {
                  key: v,
                  class: "table-row"
                }, [
                  d("td", T2, S(f(v)), 1),
                  d("td", F2, S(u(l.value[v]?.avg_cost_per_message)), 1),
                  d("td", B2, S(h(l.value[v]?.avg_tokens_per_message)), 1),
                  d("td", P2, S(h(l.value[v]?.message_count)), 1),
                  d("td", L2, S(u(l.value[v]?.total_cost)), 1),
                  d("td", E2, S(h(l.value[v]?.total_tokens)), 1)
                ])), 64))
              ])
            ])
          ]),
          e.enableExport ? (_(), ht(B(gt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : z("", !0)
        ])) : (_(), k("div", O2, [
          d("div", R2, [
            d("div", I2, [
              j(B(wt), { class: "empty-icon" })
            ]),
            p[2] || (p[2] = d("p", { class: "empty-title" }, "No message role data available", -1)),
            p[3] || (p[3] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), W2 = /* @__PURE__ */ G(z2, [["__scopeId", "data-v-6a953cfc"]]), N2 = { class: "cost-per-conversation-card" }, H2 = {
  key: 0,
  class: "card-body"
}, V2 = {
  key: 0,
  class: "chart-section"
}, j2 = { class: "chart-container" }, Y2 = { class: "kpi-grid" }, U2 = { class: "kpi-card" }, q2 = { class: "kpi-value" }, X2 = { class: "kpi-card" }, K2 = { class: "kpi-value" }, G2 = { class: "kpi-card" }, Z2 = { class: "kpi-value" }, Q2 = { class: "kpi-card highlighted" }, J2 = { class: "kpi-value gradient-text" }, tx = {
  key: 1,
  class: "empty-state"
}, ex = { class: "empty-state-content" }, sx = { class: "empty-icon-wrapper" }, nx = {
  key: 1,
  class: "loading-state"
}, ax = /* @__PURE__ */ Z({
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
    const n = e, a = s, i = (y) => {
      a("export", y);
    }, { isDark: o, colors: r } = tt(J(n, "theme")), l = {
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
    }, c = (y) => y.agent_type || y.agent_id || y.agent_name || "", h = (y) => y.agent_name ? y.agent_name : c(y).split("_").map((M) => M.charAt(0).toUpperCase() + M.slice(1)).join(" ").replace(/V\d+$/, "").trim(), u = (y) => {
      const x = c(y).toLowerCase();
      for (const [M, w] of Object.entries(l))
        if (x.includes(M))
          return w;
      return "#9ca3af";
    }, f = T(() => [...n.data?.top_agents || []].sort((x, M) => M.avg_cost_per_conversation - x.avg_cost_per_conversation)), g = T(
      () => f.value.reduce((y, x) => y + x.conversations, 0)
    ), p = T(
      () => f.value.reduce((y, x) => y + x.total_cost, 0)
    ), v = T(() => g.value === 0 ? 0 : p.value / g.value), m = T(() => {
      const y = f.value;
      if (y.length === 0)
        return { labels: [], datasets: [] };
      const x = y.map((C) => h(C)), M = y.map((C) => C.avg_cost_per_conversation), w = y.map((C) => u(C));
      return {
        labels: x,
        datasets: [
          {
            label: "USD per conversation",
            data: M,
            backgroundColor: w.map((C) => `${C}80`),
            borderColor: w,
            borderWidth: 1
          }
        ]
      };
    }), b = T(() => n.options ? n.options : {
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
          borderColor: o.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
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
            label: function(y) {
              const x = f.value[y.dataIndex];
              return [
                `Cost: ${it(y.parsed.x)}`,
                `Conversations: ${W(x.conversations)}`,
                `Total Cost: ${it(x.total_cost)}`
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
            callback: function(y) {
              return it(y);
            }
          }
        },
        y: {
          border: { display: !1 },
          grid: { display: !1 },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: r.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: o }), (y, x) => (_(), k("article", N2, [
      x[7] || (x[7] = d("header", { class: "card-header" }, [
        d("div", { class: "header-content" }, [
          d("h3", { class: "card-title" }, "Cost Per Conversation"),
          d("p", { class: "card-subtitle" }, "USD per conversation by agent")
        ])
      ], -1)),
      e.loading ? (_(), k("div", nx, [...x[6] || (x[6] = [
        V('<div class="loading-container" data-v-49791bad><div class="chart-bars-loader" data-v-49791bad><div class="bar bar-1" data-v-49791bad></div><div class="bar bar-2" data-v-49791bad></div><div class="bar bar-3" data-v-49791bad></div><div class="bar bar-4" data-v-49791bad></div><div class="bar bar-5" data-v-49791bad></div></div><p class="loading-text" data-v-49791bad>Loading agent costs...</p></div>', 1)
      ])])) : (_(), k("div", H2, [
        m.value.labels && m.value.labels.length ? (_(), k("section", V2, [
          d("div", j2, [
            j(Gt, {
              data: m.value,
              options: b.value
            }, null, 8, ["data", "options"])
          ]),
          d("footer", Y2, [
            d("div", U2, [
              x[0] || (x[0] = d("span", { class: "kpi-label" }, "Total Agents", -1)),
              d("span", q2, S(f.value.length), 1)
            ]),
            d("div", X2, [
              x[1] || (x[1] = d("span", { class: "kpi-label" }, "Total Conversations", -1)),
              d("span", K2, S(B(W)(g.value)), 1)
            ]),
            d("div", G2, [
              x[2] || (x[2] = d("span", { class: "kpi-label" }, "Total Cost", -1)),
              d("span", Z2, S(B(it)(p.value)), 1)
            ]),
            d("div", Q2, [
              x[3] || (x[3] = d("span", { class: "kpi-label" }, "Avg Cost / Conv.", -1)),
              d("span", J2, S(B(it)(v.value)), 1)
            ])
          ]),
          e.enableExport ? (_(), ht(B(gt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : z("", !0)
        ])) : (_(), k("section", tx, [
          d("div", ex, [
            d("div", sx, [
              j(B(wt), { class: "empty-icon" })
            ]),
            x[4] || (x[4] = d("p", { class: "empty-title" }, "No cost per conversation data", -1)),
            x[5] || (x[5] = d("p", { class: "empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), ix = /* @__PURE__ */ G(ax, [["__scopeId", "data-v-49791bad"]]), fx = {
  install(e) {
    e.component("KiutChartBar", Gt), e.component("KiutChartLine", re), e.component("KiutPieChart", fn), e.component("KiutBoxplotChart", Jh), e.component("KiutCandlestickChart", ji), e.component("KiutHistogramChart", Yi), e.component("KiutSankeyChart", le), e.component("KiutAgentsPerDay", rg), e.component("KiutBookingManager", Ng), e.component("KiutCheckin", hp), e.component("KiutCheckinMetrics", Op), e.component("KiutCheckinSegments", c0), e.component("KiutDisruption", Y0), e.component("KiutFAQ", cb), e.component("KiutMessagesPerAgent", vb), e.component("KiutRecordLocator", Vb), e.component("KiutSeller", mm), e.component("KiutTopAgents", Cm), e.component("KiutPaymentMethod", nv), e.component("KiutAgentHumanConversations", Pv), e.component("KiutChannelMetrics", Yv), e.component("KiutTriageCombinations", d1), e.component("KiutNpsDailyMetrics", Ui), e.component("KiutNpsMetrics", G1), e.component("KiutNpsOverviewMetrics", qi), e.component("KiutAWSCost", py), e.component("KiutCostUsage", Iy), e.component("KiutTokenUsage", i_), e.component("KiutConversationCount", y_), e.component("KiutTopAgentsAnalysis", B_), e.component("KiutTopAgentsPie", H_), e.component("KiutDailyCostTrends", Q_), e.component("KiutModelUsage", k2), e.component("KiutMessageRoles", W2), e.component("KiutCostPerConversations", ix);
  }
};
export {
  py as AWSCost,
  Pv as AgentHumanConversations,
  rg as AgentsPerDay,
  Ng as BookingManager,
  Jh as BoxplotChart,
  ji as CandlestickChart,
  Yv as ChannelMetrics,
  Gt as ChartBar,
  re as ChartLine,
  hp as Checkin,
  Op as CheckinMetrics,
  c0 as CheckinSegments,
  y_ as ConversationCount,
  ix as CostPerConversations,
  Iy as CostUsage,
  Q_ as DailyCostTrends,
  Y0 as Disruption,
  cb as FAQ,
  Yi as HistogramChart,
  fx as KiutUIPlugin,
  W2 as MessageRoles,
  vb as MessagesPerAgent,
  k2 as ModelUsage,
  Ui as NpsDailyMetrics,
  G1 as NpsMetrics,
  qi as NpsOverviewMetrics,
  nv as PaymentMethod,
  fn as PieChart,
  Vb as RecordLocator,
  le as SankeyChart,
  mm as Seller,
  i_ as TokenUsage,
  Cm as TopAgents,
  B_ as TopAgentsAnalysis,
  H_ as TopAgentsPie,
  d1 as TriageCombinations
};
//# sourceMappingURL=kiut-ui.es.js.map
