import { defineComponent as st, shallowRef as Vi, h as Rs, ref as wt, onMounted as qs, onUnmounted as ji, watch as ue, toRaw as Is, nextTick as Yi, version as Ka, isProxy as Ui, computed as A, toRef as nt, createElementBlock as k, openBlock as _, createVNode as U, unref as T, normalizeStyle as Dt, createCommentVNode as I, createElementVNode as h, toDisplayString as w, Fragment as K, renderList as lt, onBeforeUnmount as Ga, createStaticVNode as X, withDirectives as pn, vShow as mn, normalizeClass as ns, createBlock as gt, createTextVNode as is, resolveDynamicComponent as Qa } from "vue";
import * as bn from "echarts/core";
import { TooltipComponent as Za, TitleComponent as Ja } from "echarts/components";
import { SankeyChart as to } from "echarts/charts";
import { CanvasRenderer as eo } from "echarts/renderers";
import Xt from "moment";
function He(e) {
  return e + 0.5 | 0;
}
const Vt = (e, t, s) => Math.max(Math.min(e, s), t);
function Ce(e) {
  return Vt(He(e * 2.55), 0, 255);
}
function Ut(e) {
  return Vt(He(e * 255), 0, 255);
}
function zt(e) {
  return Vt(He(e / 2.55) / 100, 0, 1);
}
function vn(e) {
  return Vt(He(e * 100), 0, 100);
}
const $t = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, zs = [..."0123456789ABCDEF"], so = (e) => zs[e & 15], no = (e) => zs[(e & 240) >> 4] + zs[e & 15], Ne = (e) => (e & 240) >> 4 === (e & 15), io = (e) => Ne(e.r) && Ne(e.g) && Ne(e.b) && Ne(e.a);
function ao(e) {
  var t = e.length, s;
  return e[0] === "#" && (t === 4 || t === 5 ? s = {
    r: 255 & $t[e[1]] * 17,
    g: 255 & $t[e[2]] * 17,
    b: 255 & $t[e[3]] * 17,
    a: t === 5 ? $t[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (s = {
    r: $t[e[1]] << 4 | $t[e[2]],
    g: $t[e[3]] << 4 | $t[e[4]],
    b: $t[e[5]] << 4 | $t[e[6]],
    a: t === 9 ? $t[e[7]] << 4 | $t[e[8]] : 255
  })), s;
}
const oo = (e, t) => e < 255 ? t(e) : "";
function ro(e) {
  var t = io(e) ? so : no;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + oo(e.a, t) : void 0;
}
const lo = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function qi(e, t, s) {
  const n = t * Math.min(s, 1 - s), i = (a, o = (a + e / 30) % 12) => s - n * Math.max(Math.min(o - 3, 9 - o, 1), -1);
  return [i(0), i(8), i(4)];
}
function co(e, t, s) {
  const n = (i, a = (i + e / 60) % 6) => s - s * t * Math.max(Math.min(a, 4 - a, 1), 0);
  return [n(5), n(3), n(1)];
}
function ho(e, t, s) {
  const n = qi(e, 1, 0.5);
  let i;
  for (t + s > 1 && (i = 1 / (t + s), t *= i, s *= i), i = 0; i < 3; i++)
    n[i] *= 1 - t - s, n[i] += t;
  return n;
}
function uo(e, t, s, n, i) {
  return e === i ? (t - s) / n + (t < s ? 6 : 0) : t === i ? (s - e) / n + 2 : (e - t) / n + 4;
}
function Xs(e) {
  const s = e.r / 255, n = e.g / 255, i = e.b / 255, a = Math.max(s, n, i), o = Math.min(s, n, i), r = (a + o) / 2;
  let l, c, d;
  return a !== o && (d = a - o, c = r > 0.5 ? d / (2 - a - o) : d / (a + o), l = uo(s, n, i, d, a), l = l * 60 + 0.5), [l | 0, c || 0, r];
}
function Ks(e, t, s, n) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, s, n)).map(Ut);
}
function Gs(e, t, s) {
  return Ks(qi, e, t, s);
}
function fo(e, t, s) {
  return Ks(ho, e, t, s);
}
function go(e, t, s) {
  return Ks(co, e, t, s);
}
function Xi(e) {
  return (e % 360 + 360) % 360;
}
function po(e) {
  const t = lo.exec(e);
  let s = 255, n;
  if (!t)
    return;
  t[5] !== n && (s = t[6] ? Ce(+t[5]) : Ut(+t[5]));
  const i = Xi(+t[2]), a = +t[3] / 100, o = +t[4] / 100;
  return t[1] === "hwb" ? n = fo(i, a, o) : t[1] === "hsv" ? n = go(i, a, o) : n = Gs(i, a, o), {
    r: n[0],
    g: n[1],
    b: n[2],
    a: s
  };
}
function mo(e, t) {
  var s = Xs(e);
  s[0] = Xi(s[0] + t), s = Gs(s), e.r = s[0], e.g = s[1], e.b = s[2];
}
function bo(e) {
  if (!e)
    return;
  const t = Xs(e), s = t[0], n = vn(t[1]), i = vn(t[2]);
  return e.a < 255 ? `hsla(${s}, ${n}%, ${i}%, ${zt(e.a)})` : `hsl(${s}, ${n}%, ${i}%)`;
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
  let n, i, a, o, r;
  for (n = 0; n < t.length; n++) {
    for (o = r = t[n], i = 0; i < s.length; i++)
      a = s[i], r = r.replace(a, yn[a]);
    a = parseInt(_n[o], 16), e[r] = [a >> 16 & 255, a >> 8 & 255, a & 255];
  }
  return e;
}
let Ve;
function yo(e) {
  Ve || (Ve = vo(), Ve.transparent = [0, 0, 0, 0]);
  const t = Ve[e.toLowerCase()];
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
  let s = 255, n, i, a;
  if (t) {
    if (t[7] !== n) {
      const o = +t[7];
      s = t[8] ? Ce(o) : Vt(o * 255, 0, 255);
    }
    return n = +t[1], i = +t[3], a = +t[5], n = 255 & (t[2] ? Ce(n) : Vt(n, 0, 255)), i = 255 & (t[4] ? Ce(i) : Vt(i, 0, 255)), a = 255 & (t[6] ? Ce(a) : Vt(a, 0, 255)), {
      r: n,
      g: i,
      b: a,
      a: s
    };
  }
}
function ko(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${zt(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const Ms = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, re = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function Mo(e, t, s) {
  const n = re(zt(e.r)), i = re(zt(e.g)), a = re(zt(e.b));
  return {
    r: Ut(Ms(n + s * (re(zt(t.r)) - n))),
    g: Ut(Ms(i + s * (re(zt(t.g)) - i))),
    b: Ut(Ms(a + s * (re(zt(t.b)) - a))),
    a: e.a + s * (t.a - e.a)
  };
}
function je(e, t, s) {
  if (e) {
    let n = Xs(e);
    n[t] = Math.max(0, Math.min(n[t] + n[t] * s, t === 0 ? 360 : 1)), n = Gs(n), e.r = n[0], e.g = n[1], e.b = n[2];
  }
}
function Ki(e, t) {
  return e && Object.assign(t || {}, e);
}
function xn(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = Ut(e[3]))) : (t = Ki(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = Ut(t.a)), t;
}
function So(e) {
  return e.charAt(0) === "r" ? xo(e) : po(e);
}
class Be {
  constructor(t) {
    if (t instanceof Be)
      return t;
    const s = typeof t;
    let n;
    s === "object" ? n = xn(t) : s === "string" && (n = ao(t) || yo(t) || So(t)), this._rgb = n, this._valid = !!n;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = Ki(this._rgb);
    return t && (t.a = zt(t.a)), t;
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
    return this._valid ? bo(this._rgb) : void 0;
  }
  mix(t, s) {
    if (t) {
      const n = this.rgb, i = t.rgb;
      let a;
      const o = s === a ? 0.5 : s, r = 2 * o - 1, l = n.a - i.a, c = ((r * l === -1 ? r : (r + l) / (1 + r * l)) + 1) / 2;
      a = 1 - c, n.r = 255 & c * n.r + a * i.r + 0.5, n.g = 255 & c * n.g + a * i.g + 0.5, n.b = 255 & c * n.b + a * i.b + 0.5, n.a = o * n.a + (1 - o) * i.a, this.rgb = n;
    }
    return this;
  }
  interpolate(t, s) {
    return t && (this._rgb = Mo(this._rgb, t._rgb, s)), this;
  }
  clone() {
    return new Be(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = Ut(t), this;
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
    return je(this._rgb, 2, t), this;
  }
  darken(t) {
    return je(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return je(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return je(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return mo(this._rgb, t), this;
  }
}
function Et() {
}
const wo = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function Z(e) {
  return e == null;
}
function ut(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function q(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function yt(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function Pt(e, t) {
  return yt(e) ? e : t;
}
function V(e, t) {
  return typeof e > "u" ? t : e;
}
const Co = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, Gi = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function ot(e, t, s) {
  if (e && typeof e.call == "function")
    return e.apply(s, t);
}
function tt(e, t, s, n) {
  let i, a, o;
  if (ut(e))
    for (a = e.length, i = 0; i < a; i++)
      t.call(s, e[i], i);
  else if (q(e))
    for (o = Object.keys(e), a = o.length, i = 0; i < a; i++)
      t.call(s, e[o[i]], o[i]);
}
function as(e, t) {
  let s, n, i, a;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (s = 0, n = e.length; s < n; ++s)
    if (i = e[s], a = t[s], i.datasetIndex !== a.datasetIndex || i.index !== a.index)
      return !1;
  return !0;
}
function os(e) {
  if (ut(e))
    return e.map(os);
  if (q(e)) {
    const t = /* @__PURE__ */ Object.create(null), s = Object.keys(e), n = s.length;
    let i = 0;
    for (; i < n; ++i)
      t[s[i]] = os(e[s[i]]);
    return t;
  }
  return e;
}
function Qi(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function $o(e, t, s, n) {
  if (!Qi(e))
    return;
  const i = t[e], a = s[e];
  q(i) && q(a) ? Le(i, a, n) : t[e] = os(a);
}
function Le(e, t, s) {
  const n = ut(t) ? t : [
    t
  ], i = n.length;
  if (!q(e))
    return e;
  s = s || {};
  const a = s.merger || $o;
  let o;
  for (let r = 0; r < i; ++r) {
    if (o = n[r], !q(o))
      continue;
    const l = Object.keys(o);
    for (let c = 0, d = l.length; c < d; ++c)
      a(l[c], e, o, s);
  }
  return e;
}
function Ae(e, t) {
  return Le(e, t, {
    merger: Do
  });
}
function Do(e, t, s) {
  if (!Qi(e))
    return;
  const n = t[e], i = s[e];
  q(n) && q(i) ? Ae(n, i) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = os(i));
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
  for (const i of t)
    n += i, n.endsWith("\\") ? n = n.slice(0, -1) + "." : (s.push(n), n = "");
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
function se(e, t) {
  return (kn[t] || (kn[t] = To(t)))(e);
}
function Qs(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const Oe = (e) => typeof e < "u", qt = (e) => typeof e == "function", Mn = (e, t) => {
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
const et = Math.PI, dt = 2 * et, Po = dt + et, rs = Number.POSITIVE_INFINITY, Bo = et / 180, ft = et / 2, Kt = et / 4, Sn = et * 2 / 3, Zi = Math.log10, Ot = Math.sign;
function Te(e, t, s) {
  return Math.abs(e - t) < s;
}
function wn(e) {
  const t = Math.round(e);
  e = Te(e, t, e / 1e3) ? t : e;
  const s = Math.pow(10, Math.floor(Zi(e))), n = e / s;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * s;
}
function Lo(e) {
  const t = [], s = Math.sqrt(e);
  let n;
  for (n = 1; n < s; n++)
    e % n === 0 && (t.push(n), t.push(e / n));
  return s === (s | 0) && t.push(s), t.sort((i, a) => i - a).pop(), t;
}
function Oo(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function Ee(e) {
  return !Oo(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function Eo(e, t) {
  const s = Math.round(e);
  return s - t <= e && s + t >= e;
}
function Ro(e, t, s) {
  let n, i, a;
  for (n = 0, i = e.length; n < i; n++)
    a = e[n][s], isNaN(a) || (t.min = Math.min(t.min, a), t.max = Math.max(t.max, a));
}
function Wt(e) {
  return e * (et / 180);
}
function Io(e) {
  return e * (180 / et);
}
function Cn(e) {
  if (!yt(e))
    return;
  let t = 1, s = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, s++;
  return s;
}
function Ji(e, t) {
  const s = t.x - e.x, n = t.y - e.y, i = Math.sqrt(s * s + n * n);
  let a = Math.atan2(n, s);
  return a < -0.5 * et && (a += dt), {
    angle: a,
    distance: i
  };
}
function Ws(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function zo(e, t) {
  return (e - t + Po) % dt - et;
}
function St(e) {
  return (e % dt + dt) % dt;
}
function Re(e, t, s, n) {
  const i = St(e), a = St(t), o = St(s), r = St(a - i), l = St(o - i), c = St(i - a), d = St(i - o);
  return i === a || i === o || n && a === o || r > l && c < d;
}
function bt(e, t, s) {
  return Math.max(t, Math.min(s, e));
}
function Wo(e) {
  return bt(e, -32768, 32767);
}
function Ht(e, t, s, n = 1e-6) {
  return e >= Math.min(t, s) - n && e <= Math.max(t, s) + n;
}
function Zs(e, t, s) {
  s = s || ((o) => e[o] < t);
  let n = e.length - 1, i = 0, a;
  for (; n - i > 1; )
    a = i + n >> 1, s(a) ? i = a : n = a;
  return {
    lo: i,
    hi: n
  };
}
const te = (e, t, s, n) => Zs(e, s, n ? (i) => {
  const a = e[i][t];
  return a < s || a === s && e[i + 1][t] === s;
} : (i) => e[i][t] < s), Ho = (e, t, s) => Zs(e, s, (n) => e[n][t] >= s);
function No(e, t, s) {
  let n = 0, i = e.length;
  for (; n < i && e[n] < t; )
    n++;
  for (; i > n && e[i - 1] > s; )
    i--;
  return n > 0 || i < e.length ? e.slice(n, i) : e;
}
const ta = [
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
  }), ta.forEach((s) => {
    const n = "_onData" + Qs(s), i = e[s];
    Object.defineProperty(e, s, {
      configurable: !0,
      enumerable: !1,
      value(...a) {
        const o = i.apply(this, a);
        return e._chartjs.listeners.forEach((r) => {
          typeof r[n] == "function" && r[n](...a);
        }), o;
      }
    });
  });
}
function $n(e, t) {
  const s = e._chartjs;
  if (!s)
    return;
  const n = s.listeners, i = n.indexOf(t);
  i !== -1 && n.splice(i, 1), !(n.length > 0) && (ta.forEach((a) => {
    delete e[a];
  }), delete e._chartjs);
}
function ea(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const sa = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function na(e, t) {
  let s = [], n = !1;
  return function(...i) {
    s = i, n || (n = !0, sa.call(window, () => {
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
const Js = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", mt = (e, t, s) => e === "start" ? t : e === "end" ? s : (t + s) / 2, Yo = (e, t, s, n) => e === (n ? "left" : "right") ? s : e === "center" ? (t + s) / 2 : t;
function Uo(e, t, s) {
  const n = t.length;
  let i = 0, a = n;
  if (e._sorted) {
    const { iScale: o, vScale: r, _parsed: l } = e, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, d = o.axis, { min: u, max: f, minDefined: p, maxDefined: g } = o.getUserBounds();
    if (p) {
      if (i = Math.min(
        // @ts-expect-error Need to type _parsed
        te(l, d, u).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        s ? n : te(t, d, o.getPixelForValue(u)).lo
      ), c) {
        const m = l.slice(0, i + 1).reverse().findIndex((b) => !Z(b[r.axis]));
        i -= Math.max(0, m);
      }
      i = bt(i, 0, n - 1);
    }
    if (g) {
      let m = Math.max(
        // @ts-expect-error Need to type _parsed
        te(l, o.axis, f, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        s ? 0 : te(t, d, o.getPixelForValue(f), !0).hi + 1
      );
      if (c) {
        const b = l.slice(m - 1).findIndex((v) => !Z(v[r.axis]));
        m += Math.max(0, b);
      }
      a = bt(m, i, n) - i;
    } else
      a = n - i;
  }
  return {
    start: i,
    count: a
  };
}
function qo(e) {
  const { xScale: t, yScale: s, _scaleRanges: n } = e, i = {
    xmin: t.min,
    xmax: t.max,
    ymin: s.min,
    ymax: s.max
  };
  if (!n)
    return e._scaleRanges = i, !0;
  const a = n.xmin !== t.min || n.xmax !== t.max || n.ymin !== s.min || n.ymax !== s.max;
  return Object.assign(n, i), a;
}
const Ye = (e) => e === 0 || e === 1, Dn = (e, t, s) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * dt / s)), An = (e, t, s) => Math.pow(2, -10 * e) * Math.sin((e - t) * dt / s) + 1, Fe = {
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
  easeInSine: (e) => -Math.cos(e * ft) + 1,
  easeOutSine: (e) => Math.sin(e * ft),
  easeInOutSine: (e) => -0.5 * (Math.cos(et * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => Ye(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => Ye(e) ? e : Dn(e, 0.075, 0.3),
  easeOutElastic: (e) => Ye(e) ? e : An(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return Ye(e) ? e : e < 0.5 ? 0.5 * Dn(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * An(e * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (e) => 1 - Fe.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? Fe.easeInBounce(e * 2) * 0.5 : Fe.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function tn(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function Tn(e) {
  return tn(e) ? e : new Be(e);
}
function Ss(e) {
  return tn(e) ? e : new Be(e).saturate(0.5).darken(0.1).hexString();
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
function Qo(e) {
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
function Zo(e, t) {
  t = t || {};
  const s = e + JSON.stringify(t);
  let n = Fn.get(s);
  return n || (n = new Intl.NumberFormat(e, t), Fn.set(s, n)), n;
}
function en(e, t, s) {
  return Zo(t, s).format(e);
}
const Jo = {
  values(e) {
    return ut(e) ? e : "" + e;
  },
  numeric(e, t, s) {
    if (e === 0)
      return "0";
    const n = this.chart.options.locale;
    let i, a = e;
    if (s.length > 1) {
      const c = Math.max(Math.abs(s[0].value), Math.abs(s[s.length - 1].value));
      (c < 1e-4 || c > 1e15) && (i = "scientific"), a = tr(e, s);
    }
    const o = Zi(Math.abs(a)), r = isNaN(o) ? 1 : Math.max(Math.min(-1 * Math.floor(o), 20), 0), l = {
      notation: i,
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
var ia = {
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
      callback: ia.formatters.values,
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
const ne = /* @__PURE__ */ Object.create(null), Hs = /* @__PURE__ */ Object.create(null);
function Pe(e, t) {
  if (!t)
    return e;
  const s = t.split(".");
  for (let n = 0, i = s.length; n < i; ++n) {
    const a = s[n];
    e = e[a] || (e[a] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function ws(e, t, s) {
  return typeof t == "string" ? Le(Pe(e, t), s) : Le(Pe(e, ""), t);
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
    }, this.hover = {}, this.hoverBackgroundColor = (n, i) => Ss(i.backgroundColor), this.hoverBorderColor = (n, i) => Ss(i.borderColor), this.hoverColor = (n, i) => Ss(i.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(s);
  }
  set(t, s) {
    return ws(this, t, s);
  }
  get(t) {
    return Pe(this, t);
  }
  describe(t, s) {
    return ws(Hs, t, s);
  }
  override(t, s) {
    return ws(ne, t, s);
  }
  route(t, s, n, i) {
    const a = Pe(this, t), o = Pe(this, n), r = "_" + s;
    Object.defineProperties(a, {
      [r]: {
        value: a[s],
        writable: !0
      },
      [s]: {
        enumerable: !0,
        get() {
          const l = this[r], c = o[i];
          return q(l) ? Object.assign({}, c, l) : V(l, c);
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
var ht = /* @__PURE__ */ new sr({
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
  Qo,
  er
]);
function nr(e) {
  return !e || Z(e.size) || Z(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function Pn(e, t, s, n, i) {
  let a = t[i];
  return a || (a = t[i] = e.measureText(i).width, s.push(i)), a > n && (n = a), n;
}
function Gt(e, t, s) {
  const n = e.currentDevicePixelRatio, i = s !== 0 ? Math.max(s / 2, 0.5) : 0;
  return Math.round((t - i) * n) / n + i;
}
function Bn(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function Ns(e, t, s, n) {
  aa(e, t, s, n, null);
}
function aa(e, t, s, n, i) {
  let a, o, r, l, c, d, u, f;
  const p = t.pointStyle, g = t.rotation, m = t.radius;
  let b = (g || 0) * Bo;
  if (p && typeof p == "object" && (a = p.toString(), a === "[object HTMLImageElement]" || a === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(s, n), e.rotate(b), e.drawImage(p, -p.width / 2, -p.height / 2, p.width, p.height), e.restore();
    return;
  }
  if (!(isNaN(m) || m <= 0)) {
    switch (e.beginPath(), p) {
      // Default includes circle
      default:
        i ? e.ellipse(s, n, i / 2, m, 0, 0, dt) : e.arc(s, n, m, 0, dt), e.closePath();
        break;
      case "triangle":
        d = i ? i / 2 : m, e.moveTo(s + Math.sin(b) * d, n - Math.cos(b) * m), b += Sn, e.lineTo(s + Math.sin(b) * d, n - Math.cos(b) * m), b += Sn, e.lineTo(s + Math.sin(b) * d, n - Math.cos(b) * m), e.closePath();
        break;
      case "rectRounded":
        c = m * 0.516, l = m - c, o = Math.cos(b + Kt) * l, u = Math.cos(b + Kt) * (i ? i / 2 - c : l), r = Math.sin(b + Kt) * l, f = Math.sin(b + Kt) * (i ? i / 2 - c : l), e.arc(s - u, n - r, c, b - et, b - ft), e.arc(s + f, n - o, c, b - ft, b), e.arc(s + u, n + r, c, b, b + ft), e.arc(s - f, n + o, c, b + ft, b + et), e.closePath();
        break;
      case "rect":
        if (!g) {
          l = Math.SQRT1_2 * m, d = i ? i / 2 : l, e.rect(s - d, n - l, 2 * d, 2 * l);
          break;
        }
        b += Kt;
      /* falls through */
      case "rectRot":
        u = Math.cos(b) * (i ? i / 2 : m), o = Math.cos(b) * m, r = Math.sin(b) * m, f = Math.sin(b) * (i ? i / 2 : m), e.moveTo(s - u, n - r), e.lineTo(s + f, n - o), e.lineTo(s + u, n + r), e.lineTo(s - f, n + o), e.closePath();
        break;
      case "crossRot":
        b += Kt;
      /* falls through */
      case "cross":
        u = Math.cos(b) * (i ? i / 2 : m), o = Math.cos(b) * m, r = Math.sin(b) * m, f = Math.sin(b) * (i ? i / 2 : m), e.moveTo(s - u, n - r), e.lineTo(s + u, n + r), e.moveTo(s + f, n - o), e.lineTo(s - f, n + o);
        break;
      case "star":
        u = Math.cos(b) * (i ? i / 2 : m), o = Math.cos(b) * m, r = Math.sin(b) * m, f = Math.sin(b) * (i ? i / 2 : m), e.moveTo(s - u, n - r), e.lineTo(s + u, n + r), e.moveTo(s + f, n - o), e.lineTo(s - f, n + o), b += Kt, u = Math.cos(b) * (i ? i / 2 : m), o = Math.cos(b) * m, r = Math.sin(b) * m, f = Math.sin(b) * (i ? i / 2 : m), e.moveTo(s - u, n - r), e.lineTo(s + u, n + r), e.moveTo(s + f, n - o), e.lineTo(s - f, n + o);
        break;
      case "line":
        o = i ? i / 2 : Math.cos(b) * m, r = Math.sin(b) * m, e.moveTo(s - o, n - r), e.lineTo(s + o, n + r);
        break;
      case "dash":
        e.moveTo(s, n), e.lineTo(s + Math.cos(b) * (i ? i / 2 : m), n + Math.sin(b) * m);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function Ie(e, t, s) {
  return s = s || 0.5, !t || e && e.x > t.left - s && e.x < t.right + s && e.y > t.top - s && e.y < t.bottom + s;
}
function us(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function fs(e) {
  e.restore();
}
function ir(e, t, s, n, i) {
  if (!t)
    return e.lineTo(s.x, s.y);
  if (i === "middle") {
    const a = (t.x + s.x) / 2;
    e.lineTo(a, t.y), e.lineTo(a, s.y);
  } else i === "after" != !!n ? e.lineTo(t.x, s.y) : e.lineTo(s.x, t.y);
  e.lineTo(s.x, s.y);
}
function ar(e, t, s, n) {
  if (!t)
    return e.lineTo(s.x, s.y);
  e.bezierCurveTo(n ? t.cp1x : t.cp2x, n ? t.cp1y : t.cp2y, n ? s.cp2x : s.cp1x, n ? s.cp2y : s.cp1y, s.x, s.y);
}
function or(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), Z(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function rr(e, t, s, n, i) {
  if (i.strikethrough || i.underline) {
    const a = e.measureText(n), o = t - a.actualBoundingBoxLeft, r = t + a.actualBoundingBoxRight, l = s - a.actualBoundingBoxAscent, c = s + a.actualBoundingBoxDescent, d = i.strikethrough ? (l + c) / 2 : c;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = i.decorationWidth || 2, e.moveTo(o, d), e.lineTo(r, d), e.stroke();
  }
}
function lr(e, t) {
  const s = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = s;
}
function ze(e, t, s, n, i, a = {}) {
  const o = ut(t) ? t : [
    t
  ], r = a.strokeWidth > 0 && a.strokeColor !== "";
  let l, c;
  for (e.save(), e.font = i.string, or(e, a), l = 0; l < o.length; ++l)
    c = o[l], a.backdrop && lr(e, a.backdrop), r && (a.strokeColor && (e.strokeStyle = a.strokeColor), Z(a.strokeWidth) || (e.lineWidth = a.strokeWidth), e.strokeText(c, s, n, a.maxWidth)), e.fillText(c, s, n, a.maxWidth), rr(e, s, n, c, a), n += Number(i.lineHeight);
  e.restore();
}
function ls(e, t) {
  const { x: s, y: n, w: i, h: a, radius: o } = t;
  e.arc(s + o.topLeft, n + o.topLeft, o.topLeft, 1.5 * et, et, !0), e.lineTo(s, n + a - o.bottomLeft), e.arc(s + o.bottomLeft, n + a - o.bottomLeft, o.bottomLeft, et, ft, !0), e.lineTo(s + i - o.bottomRight, n + a), e.arc(s + i - o.bottomRight, n + a - o.bottomRight, o.bottomRight, ft, 0, !0), e.lineTo(s + i, n + o.topRight), e.arc(s + i - o.topRight, n + o.topRight, o.topRight, 0, -ft, !0), e.lineTo(s + o.topLeft, n);
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
  const s = {}, n = q(t), i = n ? Object.keys(t) : t, a = q(e) ? n ? (o) => V(e[o], e[t[o]]) : (o) => e[o] : () => e;
  for (const o of i)
    s[o] = ur(a(o));
  return s;
}
function oa(e) {
  return sn(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function de(e) {
  return sn(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function Tt(e) {
  const t = oa(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function vt(e, t) {
  e = e || {}, t = t || ht.font;
  let s = V(e.size, t.size);
  typeof s == "string" && (s = parseInt(s, 10));
  let n = V(e.style, t.style);
  n && !("" + n).match(dr) && (console.warn('Invalid font style specified: "' + n + '"'), n = void 0);
  const i = {
    family: V(e.family, t.family),
    lineHeight: hr(V(e.lineHeight, t.lineHeight), s),
    size: s,
    style: n,
    weight: V(e.weight, t.weight),
    string: ""
  };
  return i.string = nr(i), i;
}
function Ue(e, t, s, n) {
  let i, a, o;
  for (i = 0, a = e.length; i < a; ++i)
    if (o = e[i], o !== void 0 && o !== void 0)
      return o;
}
function fr(e, t, s) {
  const { min: n, max: i } = e, a = Gi(t, (i - n) / 2), o = (r, l) => s && r === 0 ? 0 : r + l;
  return {
    min: o(n, -Math.abs(a)),
    max: o(i, a)
  };
}
function ie(e, t) {
  return Object.assign(Object.create(e), t);
}
function nn(e, t = [
  ""
], s, n, i = () => e[0]) {
  const a = s || e;
  typeof n > "u" && (n = da("_fallback", e));
  const o = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: a,
    _fallback: n,
    _getTarget: i,
    override: (r) => nn([
      r,
      ...e
    ], t, a, n)
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
      return la(r, l, () => xr(l, t, e, r));
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
      return On(r).includes(l);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(r) {
      return On(r);
    },
    /**
    * A trap for setting property values.
    */
    set(r, l, c) {
      const d = r._storage || (r._storage = i());
      return r[l] = d[l] = c, delete r._keys, !0;
    }
  });
}
function fe(e, t, s, n) {
  const i = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: s,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: ra(e, n),
    setContext: (a) => fe(e, a, s, n),
    override: (a) => fe(e.override(a), t, s, n)
  };
  return new Proxy(i, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(a, o) {
      return delete a[o], delete e[o], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(a, o, r) {
      return la(a, o, () => pr(a, o, r));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(a, o) {
      return a._descriptors.allKeys ? Reflect.has(e, o) ? {
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
    has(a, o) {
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
    set(a, o, r) {
      return e[o] = r, delete a[o], !0;
    }
  });
}
function ra(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: s = t.scriptable, _indexable: n = t.indexable, _allKeys: i = t.allKeys } = e;
  return {
    allKeys: i,
    scriptable: s,
    indexable: n,
    isScriptable: qt(s) ? s : () => s,
    isIndexable: qt(n) ? n : () => n
  };
}
const gr = (e, t) => e ? e + Qs(t) : t, an = (e, t) => q(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function la(e, t, s) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const n = s();
  return e[t] = n, n;
}
function pr(e, t, s) {
  const { _proxy: n, _context: i, _subProxy: a, _descriptors: o } = e;
  let r = n[t];
  return qt(r) && o.isScriptable(t) && (r = mr(t, r, e, s)), ut(r) && r.length && (r = br(t, r, e, o.isIndexable)), an(t, r) && (r = fe(r, i, a && a[t], o)), r;
}
function mr(e, t, s, n) {
  const { _proxy: i, _context: a, _subProxy: o, _stack: r } = s;
  if (r.has(e))
    throw new Error("Recursion detected: " + Array.from(r).join("->") + "->" + e);
  r.add(e);
  let l = t(a, o || n);
  return r.delete(e), an(e, l) && (l = on(i._scopes, i, e, l)), l;
}
function br(e, t, s, n) {
  const { _proxy: i, _context: a, _subProxy: o, _descriptors: r } = s;
  if (typeof a.index < "u" && n(e))
    return t[a.index % t.length];
  if (q(t[0])) {
    const l = t, c = i._scopes.filter((d) => d !== l);
    t = [];
    for (const d of l) {
      const u = on(c, i, e, d);
      t.push(fe(u, a, o && o[e], r));
    }
  }
  return t;
}
function ca(e, t, s) {
  return qt(e) ? e(t, s) : e;
}
const vr = (e, t) => e === !0 ? t : typeof e == "string" ? se(t, e) : void 0;
function yr(e, t, s, n, i) {
  for (const a of t) {
    const o = vr(s, a);
    if (o) {
      e.add(o);
      const r = ca(o._fallback, s, i);
      if (typeof r < "u" && r !== s && r !== n)
        return r;
    } else if (o === !1 && typeof n < "u" && s !== n)
      return null;
  }
  return !1;
}
function on(e, t, s, n) {
  const i = t._rootScopes, a = ca(t._fallback, s, n), o = [
    ...e,
    ...i
  ], r = /* @__PURE__ */ new Set();
  r.add(n);
  let l = Ln(r, o, s, a || s, n);
  return l === null || typeof a < "u" && a !== s && (l = Ln(r, o, a, l, n), l === null) ? !1 : nn(Array.from(r), [
    ""
  ], i, a, () => _r(t, s, n));
}
function Ln(e, t, s, n, i) {
  for (; s; )
    s = yr(e, t, s, n, i);
  return s;
}
function _r(e, t, s) {
  const n = e._getTarget();
  t in n || (n[t] = {});
  const i = n[t];
  return ut(i) && q(s) ? s : i || {};
}
function xr(e, t, s, n) {
  let i;
  for (const a of t)
    if (i = da(gr(a, e), s), typeof i < "u")
      return an(e, i) ? on(s, n, e, i) : i;
}
function da(e, t) {
  for (const s of t) {
    if (!s)
      continue;
    const n = s[e];
    if (typeof n < "u")
      return n;
  }
}
function On(e) {
  let t = e._keys;
  return t || (t = e._keys = kr(e._scopes)), t;
}
function kr(e) {
  const t = /* @__PURE__ */ new Set();
  for (const s of e)
    for (const n of Object.keys(s).filter((i) => !i.startsWith("_")))
      t.add(n);
  return Array.from(t);
}
const Mr = Number.EPSILON || 1e-14, ge = (e, t) => t < e.length && !e[t].skip && e[t], ha = (e) => e === "x" ? "y" : "x";
function Sr(e, t, s, n) {
  const i = e.skip ? t : e, a = t, o = s.skip ? t : s, r = Ws(a, i), l = Ws(o, a);
  let c = r / (r + l), d = l / (r + l);
  c = isNaN(c) ? 0 : c, d = isNaN(d) ? 0 : d;
  const u = n * c, f = n * d;
  return {
    previous: {
      x: a.x - u * (o.x - i.x),
      y: a.y - u * (o.y - i.y)
    },
    next: {
      x: a.x + f * (o.x - i.x),
      y: a.y + f * (o.y - i.y)
    }
  };
}
function wr(e, t, s) {
  const n = e.length;
  let i, a, o, r, l, c = ge(e, 0);
  for (let d = 0; d < n - 1; ++d)
    if (l = c, c = ge(e, d + 1), !(!l || !c)) {
      if (Te(t[d], 0, Mr)) {
        s[d] = s[d + 1] = 0;
        continue;
      }
      i = s[d] / t[d], a = s[d + 1] / t[d], r = Math.pow(i, 2) + Math.pow(a, 2), !(r <= 9) && (o = 3 / Math.sqrt(r), s[d] = i * o * t[d], s[d + 1] = a * o * t[d]);
    }
}
function Cr(e, t, s = "x") {
  const n = ha(s), i = e.length;
  let a, o, r, l = ge(e, 0);
  for (let c = 0; c < i; ++c) {
    if (o = r, r = l, l = ge(e, c + 1), !r)
      continue;
    const d = r[s], u = r[n];
    o && (a = (d - o[s]) / 3, r[`cp1${s}`] = d - a, r[`cp1${n}`] = u - a * t[c]), l && (a = (l[s] - d) / 3, r[`cp2${s}`] = d + a, r[`cp2${n}`] = u + a * t[c]);
  }
}
function $r(e, t = "x") {
  const s = ha(t), n = e.length, i = Array(n).fill(0), a = Array(n);
  let o, r, l, c = ge(e, 0);
  for (o = 0; o < n; ++o)
    if (r = l, l = c, c = ge(e, o + 1), !!l) {
      if (c) {
        const d = c[t] - l[t];
        i[o] = d !== 0 ? (c[s] - l[s]) / d : 0;
      }
      a[o] = r ? c ? Ot(i[o - 1]) !== Ot(i[o]) ? 0 : (i[o - 1] + i[o]) / 2 : i[o - 1] : i[o];
    }
  wr(e, i, a), Cr(e, a, t);
}
function qe(e, t, s) {
  return Math.max(Math.min(e, s), t);
}
function Dr(e, t) {
  let s, n, i, a, o, r = Ie(e[0], t);
  for (s = 0, n = e.length; s < n; ++s)
    o = a, a = r, r = s < n - 1 && Ie(e[s + 1], t), a && (i = e[s], o && (i.cp1x = qe(i.cp1x, t.left, t.right), i.cp1y = qe(i.cp1y, t.top, t.bottom)), r && (i.cp2x = qe(i.cp2x, t.left, t.right), i.cp2y = qe(i.cp2y, t.top, t.bottom)));
}
function Ar(e, t, s, n, i) {
  let a, o, r, l;
  if (t.spanGaps && (e = e.filter((c) => !c.skip)), t.cubicInterpolationMode === "monotone")
    $r(e, i);
  else {
    let c = n ? e[e.length - 1] : e[0];
    for (a = 0, o = e.length; a < o; ++a)
      r = e[a], l = Sr(c, r, e[Math.min(a + 1, o - (n ? 0 : 1)) % o], t.tension), r.cp1x = l.previous.x, r.cp1y = l.previous.y, r.cp2x = l.next.x, r.cp2y = l.next.y, c = r;
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
const gs = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function Tr(e, t) {
  return gs(e).getPropertyValue(t);
}
const Fr = [
  "top",
  "right",
  "bottom",
  "left"
];
function ee(e, t, s) {
  const n = {};
  s = s ? "-" + s : "";
  for (let i = 0; i < 4; i++) {
    const a = Fr[i];
    n[a] = parseFloat(e[t + "-" + a + s]) || 0;
  }
  return n.width = n.left + n.right, n.height = n.top + n.bottom, n;
}
const Pr = (e, t, s) => (e > 0 || t > 0) && (!s || !s.shadowRoot);
function Br(e, t) {
  const s = e.touches, n = s && s.length ? s[0] : e, { offsetX: i, offsetY: a } = n;
  let o = !1, r, l;
  if (Pr(i, a, e.target))
    r = i, l = a;
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
function Zt(e, t) {
  if ("native" in e)
    return e;
  const { canvas: s, currentDevicePixelRatio: n } = t, i = gs(s), a = i.boxSizing === "border-box", o = ee(i, "padding"), r = ee(i, "border", "width"), { x: l, y: c, box: d } = Br(e, s), u = o.left + (d && r.left), f = o.top + (d && r.top);
  let { width: p, height: g } = t;
  return a && (p -= o.width + r.width, g -= o.height + r.height), {
    x: Math.round((l - u) / p * s.width / n),
    y: Math.round((c - f) / g * s.height / n)
  };
}
function Lr(e, t, s) {
  let n, i;
  if (t === void 0 || s === void 0) {
    const a = e && ln(e);
    if (!a)
      t = e.clientWidth, s = e.clientHeight;
    else {
      const o = a.getBoundingClientRect(), r = gs(a), l = ee(r, "border", "width"), c = ee(r, "padding");
      t = o.width - c.width - l.width, s = o.height - c.height - l.height, n = cs(r.maxWidth, a, "clientWidth"), i = cs(r.maxHeight, a, "clientHeight");
    }
  }
  return {
    width: t,
    height: s,
    maxWidth: n || rs,
    maxHeight: i || rs
  };
}
const jt = (e) => Math.round(e * 10) / 10;
function Or(e, t, s, n) {
  const i = gs(e), a = ee(i, "margin"), o = cs(i.maxWidth, e, "clientWidth") || rs, r = cs(i.maxHeight, e, "clientHeight") || rs, l = Lr(e, t, s);
  let { width: c, height: d } = l;
  if (i.boxSizing === "content-box") {
    const f = ee(i, "border", "width"), p = ee(i, "padding");
    c -= p.width + f.width, d -= p.height + f.height;
  }
  return c = Math.max(0, c - a.width), d = Math.max(0, n ? c / n : d - a.height), c = jt(Math.min(c, o, l.maxWidth)), d = jt(Math.min(d, r, l.maxHeight)), c && !d && (d = jt(c / 2)), (t !== void 0 || s !== void 0) && n && l.height && d > l.height && (d = l.height, c = jt(Math.floor(d * n))), {
    width: c,
    height: d
  };
}
function En(e, t, s) {
  const n = t || 1, i = jt(e.height * n), a = jt(e.width * n);
  e.height = jt(e.height), e.width = jt(e.width);
  const o = e.canvas;
  return o.style && (s || !o.style.height && !o.style.width) && (o.style.height = `${e.height}px`, o.style.width = `${e.width}px`), e.currentDevicePixelRatio !== n || o.height !== i || o.width !== a ? (e.currentDevicePixelRatio = n, o.height = i, o.width = a, e.ctx.setTransform(n, 0, 0, n, 0, 0), !0) : !1;
}
const Er = (function() {
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
function Jt(e, t, s, n) {
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
  const i = {
    x: e.cp2x,
    y: e.cp2y
  }, a = {
    x: t.cp1x,
    y: t.cp1y
  }, o = Jt(e, i, s), r = Jt(i, a, s), l = Jt(a, t, s), c = Jt(o, r, s), d = Jt(r, l, s);
  return Jt(c, d, s);
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
function he(e, t, s) {
  return e ? zr(t, s) : Wr();
}
function ua(e, t) {
  let s, n;
  (t === "ltr" || t === "rtl") && (s = e.canvas.style, n = [
    s.getPropertyValue("direction"),
    s.getPropertyPriority("direction")
  ], s.setProperty("direction", t, "important"), e.prevTextDirection = n);
}
function fa(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function ga(e) {
  return e === "angle" ? {
    between: Re,
    compare: zo,
    normalize: St
  } : {
    between: Ht,
    compare: (t, s) => t - s,
    normalize: (t) => t
  };
}
function In({ start: e, end: t, count: s, loop: n, style: i }) {
  return {
    start: e % s,
    end: t % s,
    loop: n && (t - e + 1) % s === 0,
    style: i
  };
}
function Hr(e, t, s) {
  const { property: n, start: i, end: a } = s, { between: o, normalize: r } = ga(n), l = t.length;
  let { start: c, end: d, loop: u } = e, f, p;
  if (u) {
    for (c += l, d += l, f = 0, p = l; f < p && o(r(t[c % l][n]), i, a); ++f)
      c--, d--;
    c %= l, d %= l;
  }
  return d < c && (d += l), {
    start: c,
    end: d,
    loop: u,
    style: e.style
  };
}
function pa(e, t, s) {
  if (!s)
    return [
      e
    ];
  const { property: n, start: i, end: a } = s, o = t.length, { compare: r, between: l, normalize: c } = ga(n), { start: d, end: u, loop: f, style: p } = Hr(e, t, s), g = [];
  let m = !1, b = null, v, y, x;
  const M = () => l(i, x, v) && r(i, x) !== 0, S = () => r(a, v) === 0 || l(a, x, v), $ = () => m || M(), C = () => !m || S();
  for (let D = d, P = d; D <= u; ++D)
    y = t[D % o], !y.skip && (v = c(y[n]), v !== x && (m = l(v, i, a), b === null && $() && (b = r(v, i) === 0 ? D : P), b !== null && C() && (g.push(In({
      start: b,
      end: D,
      loop: f,
      count: o,
      style: p
    })), b = null), P = D, x = v));
  return b !== null && g.push(In({
    start: b,
    end: u,
    loop: f,
    count: o,
    style: p
  })), g;
}
function ma(e, t) {
  const s = [], n = e.segments;
  for (let i = 0; i < n.length; i++) {
    const a = pa(n[i], e.points, t);
    a.length && s.push(...a);
  }
  return s;
}
function Nr(e, t, s, n) {
  let i = 0, a = t - 1;
  if (s && !n)
    for (; i < t && !e[i].skip; )
      i++;
  for (; i < t && e[i].skip; )
    i++;
  for (i %= t, s && (a += i); a > i && e[a % t].skip; )
    a--;
  return a %= t, {
    start: i,
    end: a
  };
}
function Vr(e, t, s, n) {
  const i = e.length, a = [];
  let o = t, r = e[t], l;
  for (l = t + 1; l <= s; ++l) {
    const c = e[l % i];
    c.skip || c.stop ? r.skip || (n = !1, a.push({
      start: t % i,
      end: (l - 1) % i,
      loop: n
    }), t = o = c.stop ? l : null) : (o = l, r.skip && (t = l)), r = c;
  }
  return o !== null && a.push({
    start: t % i,
    end: o % i,
    loop: n
  }), a;
}
function jr(e, t) {
  const s = e.points, n = e.options.spanGaps, i = s.length;
  if (!i)
    return [];
  const a = !!e._loop, { start: o, end: r } = Nr(s, i, a, n);
  if (n === !0)
    return zn(e, [
      {
        start: o,
        end: r,
        loop: a
      }
    ], s, t);
  const l = r < o ? r + i : r, c = !!e._fullLoop && o === 0 && r === i - 1;
  return zn(e, Vr(s, o, l, c), s, t);
}
function zn(e, t, s, n) {
  return !n || !n.setContext || !s ? t : Yr(e, t, s, n);
}
function Yr(e, t, s, n) {
  const i = e._chart.getContext(), a = Wn(e.options), { _datasetIndex: o, options: { spanGaps: r } } = e, l = s.length, c = [];
  let d = a, u = t[0].start, f = u;
  function p(g, m, b, v) {
    const y = r ? -1 : 1;
    if (g !== m) {
      for (g += l; s[g % l].skip; )
        g -= y;
      for (; s[m % l].skip; )
        m += y;
      g % l !== m % l && (c.push({
        start: g % l,
        end: m % l,
        loop: b,
        style: v
      }), d = v, u = m % l);
    }
  }
  for (const g of t) {
    u = r ? u : g.start;
    let m = s[u % l], b;
    for (f = u + 1; f <= g.end; f++) {
      const v = s[f % l];
      b = Wn(n.setContext(ie(i, {
        type: "segment",
        p0: m,
        p1: v,
        p0DataIndex: (f - 1) % l,
        p1DataIndex: f % l,
        datasetIndex: o
      }))), Ur(b, d) && p(u, f - 1, g.loop, d), m = v, d = b;
    }
    u < f - 1 && p(u, f - 1, g.loop, d);
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
  const s = [], n = function(i, a) {
    return tn(a) ? (s.includes(a) || s.push(a), s.indexOf(a)) : a;
  };
  return JSON.stringify(e, n) !== JSON.stringify(t, n);
}
function Xe(e, t, s) {
  return e.options.clip ? e[s] : t[s];
}
function qr(e, t) {
  const { xScale: s, yScale: n } = e;
  return s && n ? {
    left: Xe(s, t, "left"),
    right: Xe(s, t, "right"),
    top: Xe(n, t, "top"),
    bottom: Xe(n, t, "bottom")
  } : t;
}
function ba(e, t) {
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
  _notify(t, s, n, i) {
    const a = s.listeners[i], o = s.duration;
    a.forEach((r) => r({
      chart: t,
      initial: s.initial,
      numSteps: o,
      currentStep: Math.min(n - s.start, o)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = sa.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let s = 0;
    this._charts.forEach((n, i) => {
      if (!n.running || !n.items.length)
        return;
      const a = n.items;
      let o = a.length - 1, r = !1, l;
      for (; o >= 0; --o)
        l = a[o], l._active ? (l._total > n.duration && (n.duration = l._total), l.tick(t), r = !0) : (a[o] = a[a.length - 1], a.pop());
      r && (i.draw(), this._notify(i, n, t, "progress")), a.length || (n.running = !1, this._notify(i, n, t, "complete"), n.initial = !1), s += a.length;
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
    s && (s.running = !0, s.start = Date.now(), s.duration = s.items.reduce((n, i) => Math.max(n, i._duration), 0), this._refresh());
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
    let i = n.length - 1;
    for (; i >= 0; --i)
      n[i].cancel();
    s.items = [], this._notify(t, s, Date.now(), "complete");
  }
  remove(t) {
    return this._charts.delete(t);
  }
}
var Rt = /* @__PURE__ */ new Xr();
const Hn = "transparent", Kr = {
  boolean(e, t, s) {
    return s > 0.5 ? t : e;
  },
  color(e, t, s) {
    const n = Tn(e || Hn), i = n.valid && Tn(t || Hn);
    return i && i.valid ? i.mix(n, s).hexString() : t;
  },
  number(e, t, s) {
    return e + (t - e) * s;
  }
};
class Gr {
  constructor(t, s, n, i) {
    const a = s[n];
    i = Ue([
      t.to,
      i,
      a,
      t.from
    ]);
    const o = Ue([
      t.from,
      a,
      i
    ]);
    this._active = !0, this._fn = t.fn || Kr[t.type || typeof o], this._easing = Fe[t.easing] || Fe.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = s, this._prop = n, this._from = o, this._to = i, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, s, n) {
    if (this._active) {
      this._notify(!1);
      const i = this._target[this._prop], a = n - this._start, o = this._duration - a;
      this._start = n, this._duration = Math.floor(Math.max(o, t.duration)), this._total += a, this._loop = !!t.loop, this._to = Ue([
        t.to,
        s,
        i,
        t.from
      ]), this._from = Ue([
        t.from,
        i,
        s
      ]);
    }
  }
  cancel() {
    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
  }
  tick(t) {
    const s = t - this._start, n = this._duration, i = this._prop, a = this._from, o = this._loop, r = this._to;
    let l;
    if (this._active = a !== r && (o || s < n), !this._active) {
      this._target[i] = r, this._notify(!0);
      return;
    }
    if (s < 0) {
      this._target[i] = a;
      return;
    }
    l = s / n % 2, l = o && l > 1 ? 2 - l : l, l = this._easing(Math.min(1, Math.max(0, l))), this._target[i] = this._fn(a, r, l);
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
    for (let i = 0; i < n.length; i++)
      n[i][s]();
  }
}
class va {
  constructor(t, s) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(s);
  }
  configure(t) {
    if (!q(t))
      return;
    const s = Object.keys(ht.animation), n = this._properties;
    Object.getOwnPropertyNames(t).forEach((i) => {
      const a = t[i];
      if (!q(a))
        return;
      const o = {};
      for (const r of s)
        o[r] = a[r];
      (ut(a.properties) && a.properties || [
        i
      ]).forEach((r) => {
        (r === i || !n.has(r)) && n.set(r, o);
      });
    });
  }
  _animateOptions(t, s) {
    const n = s.options, i = Zr(t, n);
    if (!i)
      return [];
    const a = this._createAnimations(i, n);
    return n.$shared && Qr(t.options.$animations, n).then(() => {
      t.options = n;
    }, () => {
    }), a;
  }
  _createAnimations(t, s) {
    const n = this._properties, i = [], a = t.$animations || (t.$animations = {}), o = Object.keys(s), r = Date.now();
    let l;
    for (l = o.length - 1; l >= 0; --l) {
      const c = o[l];
      if (c.charAt(0) === "$")
        continue;
      if (c === "options") {
        i.push(...this._animateOptions(t, s));
        continue;
      }
      const d = s[c];
      let u = a[c];
      const f = n.get(c);
      if (u)
        if (f && u.active()) {
          u.update(f, d, r);
          continue;
        } else
          u.cancel();
      if (!f || !f.duration) {
        t[c] = d;
        continue;
      }
      a[c] = u = new Gr(f, t, c, d), i.push(u);
    }
    return i;
  }
  update(t, s) {
    if (this._properties.size === 0) {
      Object.assign(t, s);
      return;
    }
    const n = this._createAnimations(t, s);
    if (n.length)
      return Rt.add(this._chart, n), !0;
  }
}
function Qr(e, t) {
  const s = [], n = Object.keys(t);
  for (let i = 0; i < n.length; i++) {
    const a = e[n[i]];
    a && a.active() && s.push(a.wait());
  }
  return Promise.all(s);
}
function Zr(e, t) {
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
function Nn(e, t) {
  const s = e && e.options || {}, n = s.reverse, i = s.min === void 0 ? t : 0, a = s.max === void 0 ? t : 0;
  return {
    start: n ? a : i,
    end: n ? i : a
  };
}
function Jr(e, t, s) {
  if (s === !1)
    return !1;
  const n = Nn(e, s), i = Nn(t, s);
  return {
    top: i.end,
    right: n.end,
    bottom: i.start,
    left: n.start
  };
}
function tl(e) {
  let t, s, n, i;
  return q(e) ? (t = e.top, s = e.right, n = e.bottom, i = e.left) : t = s = n = i = e, {
    top: t,
    right: s,
    bottom: n,
    left: i,
    disabled: e === !1
  };
}
function ya(e, t) {
  const s = [], n = e._getSortedDatasetMetas(t);
  let i, a;
  for (i = 0, a = n.length; i < a; ++i)
    s.push(n[i].index);
  return s;
}
function Vn(e, t, s, n = {}) {
  const i = e.keys, a = n.mode === "single";
  let o, r, l, c;
  if (t === null)
    return;
  let d = !1;
  for (o = 0, r = i.length; o < r; ++o) {
    if (l = +i[o], l === s) {
      if (d = !0, n.all)
        continue;
      break;
    }
    c = e.values[l], yt(c) && (a || t === 0 || Ot(t) === Ot(c)) && (t += c);
  }
  return !d && !n.all ? 0 : t;
}
function el(e, t) {
  const { iScale: s, vScale: n } = t, i = s.axis === "x" ? "x" : "y", a = n.axis === "x" ? "x" : "y", o = Object.keys(e), r = new Array(o.length);
  let l, c, d;
  for (l = 0, c = o.length; l < c; ++l)
    d = o[l], r[l] = {
      [i]: d,
      [a]: e[d]
    };
  return r;
}
function Cs(e, t) {
  const s = e && e.options.stacked;
  return s || s === void 0 && t.stack !== void 0;
}
function sl(e, t, s) {
  return `${e.id}.${t.id}.${s.stack || s.type}`;
}
function nl(e) {
  const { min: t, max: s, minDefined: n, maxDefined: i } = e.getUserBounds();
  return {
    min: n ? t : Number.NEGATIVE_INFINITY,
    max: i ? s : Number.POSITIVE_INFINITY
  };
}
function il(e, t, s) {
  const n = e[t] || (e[t] = {});
  return n[s] || (n[s] = {});
}
function jn(e, t, s, n) {
  for (const i of t.getMatchingVisibleMetas(n).reverse()) {
    const a = e[i.index];
    if (s && a > 0 || !s && a < 0)
      return i.index;
  }
  return null;
}
function Yn(e, t) {
  const { chart: s, _cachedMeta: n } = e, i = s._stacks || (s._stacks = {}), { iScale: a, vScale: o, index: r } = n, l = a.axis, c = o.axis, d = sl(a, o, n), u = t.length;
  let f;
  for (let p = 0; p < u; ++p) {
    const g = t[p], { [l]: m, [c]: b } = g, v = g._stacks || (g._stacks = {});
    f = v[c] = il(i, d, m), f[r] = b, f._top = jn(f, o, !0, n.type), f._bottom = jn(f, o, !1, n.type);
    const y = f._visualValues || (f._visualValues = {});
    y[r] = b;
  }
}
function $s(e, t) {
  const s = e.scales;
  return Object.keys(s).filter((n) => s[n].axis === t).shift();
}
function al(e, t) {
  return ie(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function ol(e, t, s) {
  return ie(e, {
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
function _e(e, t) {
  const s = e.controller.index, n = e.vScale && e.vScale.axis;
  if (n) {
    t = t || e._parsed;
    for (const i of t) {
      const a = i._stacks;
      if (!a || a[n] === void 0 || a[n][s] === void 0)
        return;
      delete a[n][s], a[n]._visualValues !== void 0 && a[n]._visualValues[s] !== void 0 && delete a[n]._visualValues[s];
    }
  }
}
const Ds = (e) => e === "reset" || e === "none", Un = (e, t) => t ? e : Object.assign({}, e), rl = (e, t, s) => e && !t.hidden && t._stacked && {
  keys: ya(s, !0),
  values: null
};
class ps {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(t, s) {
    this.chart = t, this._ctx = t.ctx, this.index = s, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = Cs(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && _e(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, s = this._cachedMeta, n = this.getDataset(), i = (u, f, p, g) => u === "x" ? f : u === "r" ? g : p, a = s.xAxisID = V(n.xAxisID, $s(t, "x")), o = s.yAxisID = V(n.yAxisID, $s(t, "y")), r = s.rAxisID = V(n.rAxisID, $s(t, "r")), l = s.indexAxis, c = s.iAxisID = i(l, a, o, r), d = s.vAxisID = i(l, o, a, r);
    s.xScale = this.getScaleForId(a), s.yScale = this.getScaleForId(o), s.rScale = this.getScaleForId(r), s.iScale = this.getScaleForId(c), s.vScale = this.getScaleForId(d);
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
    this._data && $n(this._data, this), t._stacked && _e(t);
  }
  _dataCheck() {
    const t = this.getDataset(), s = t.data || (t.data = []), n = this._data;
    if (q(s)) {
      const i = this._cachedMeta;
      this._data = el(s, i);
    } else if (n !== s) {
      if (n) {
        $n(n, this);
        const i = this._cachedMeta;
        _e(i), i._parsed = [];
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
    let i = !1;
    this._dataCheck();
    const a = s._stacked;
    s._stacked = Cs(s.vScale, s), s.stack !== n.stack && (i = !0, _e(s), s.stack = n.stack), this._resyncElements(t), (i || a !== s._stacked) && (Yn(this, s._parsed), s._stacked = Cs(s.vScale, s));
  }
  configure() {
    const t = this.chart.config, s = t.datasetScopeKeys(this._type), n = t.getOptionScopes(this.getDataset(), s, !0);
    this.options = t.createResolver(n, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, s) {
    const { _cachedMeta: n, _data: i } = this, { iScale: a, _stacked: o } = n, r = a.axis;
    let l = t === 0 && s === i.length ? !0 : n._sorted, c = t > 0 && n._parsed[t - 1], d, u, f;
    if (this._parsing === !1)
      n._parsed = i, n._sorted = !0, f = i;
    else {
      ut(i[t]) ? f = this.parseArrayData(n, i, t, s) : q(i[t]) ? f = this.parseObjectData(n, i, t, s) : f = this.parsePrimitiveData(n, i, t, s);
      const p = () => u[r] === null || c && u[r] < c[r];
      for (d = 0; d < s; ++d)
        n._parsed[d + t] = u = f[d], l && (p() && (l = !1), c = u);
      n._sorted = l;
    }
    o && Yn(this, f);
  }
  parsePrimitiveData(t, s, n, i) {
    const { iScale: a, vScale: o } = t, r = a.axis, l = o.axis, c = a.getLabels(), d = a === o, u = new Array(i);
    let f, p, g;
    for (f = 0, p = i; f < p; ++f)
      g = f + n, u[f] = {
        [r]: d || a.parse(c[g], g),
        [l]: o.parse(s[g], g)
      };
    return u;
  }
  parseArrayData(t, s, n, i) {
    const { xScale: a, yScale: o } = t, r = new Array(i);
    let l, c, d, u;
    for (l = 0, c = i; l < c; ++l)
      d = l + n, u = s[d], r[l] = {
        x: a.parse(u[0], d),
        y: o.parse(u[1], d)
      };
    return r;
  }
  parseObjectData(t, s, n, i) {
    const { xScale: a, yScale: o } = t, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, c = new Array(i);
    let d, u, f, p;
    for (d = 0, u = i; d < u; ++d)
      f = d + n, p = s[f], c[d] = {
        x: a.parse(se(p, r), f),
        y: o.parse(se(p, l), f)
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
    const i = this.chart, a = this._cachedMeta, o = s[t.axis], r = {
      keys: ya(i, !0),
      values: s._stacks[t.axis]._visualValues
    };
    return Vn(r, o, a.index, {
      mode: n
    });
  }
  updateRangeFromParsed(t, s, n, i) {
    const a = n[s.axis];
    let o = a === null ? NaN : a;
    const r = i && n._stacks[s.axis];
    i && r && (i.values = r, o = Vn(i, a, this._cachedMeta.index)), t.min = Math.min(t.min, o), t.max = Math.max(t.max, o);
  }
  getMinMax(t, s) {
    const n = this._cachedMeta, i = n._parsed, a = n._sorted && t === n.iScale, o = i.length, r = this._getOtherScale(t), l = rl(s, n, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: d, max: u } = nl(r);
    let f, p;
    function g() {
      p = i[f];
      const m = p[r.axis];
      return !yt(p[t.axis]) || d > m || u < m;
    }
    for (f = 0; f < o && !(!g() && (this.updateRangeFromParsed(c, t, p, l), a)); ++f)
      ;
    if (a) {
      for (f = o - 1; f >= 0; --f)
        if (!g()) {
          this.updateRangeFromParsed(c, t, p, l);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(t) {
    const s = this._cachedMeta._parsed, n = [];
    let i, a, o;
    for (i = 0, a = s.length; i < a; ++i)
      o = s[i][t.axis], yt(o) && n.push(o);
    return n;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(t) {
    const s = this._cachedMeta, n = s.iScale, i = s.vScale, a = this.getParsed(t);
    return {
      label: n ? "" + n.getLabelForValue(a[n.axis]) : "",
      value: i ? "" + i.getLabelForValue(a[i.axis]) : ""
    };
  }
  _update(t) {
    const s = this._cachedMeta;
    this.update(t || "default"), s._clip = tl(V(this.options.clip, Jr(s.xScale, s.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, s = this.chart, n = this._cachedMeta, i = n.data || [], a = s.chartArea, o = [], r = this._drawStart || 0, l = this._drawCount || i.length - r, c = this.options.drawActiveElementsOnTop;
    let d;
    for (n.dataset && n.dataset.draw(t, a, r, l), d = r; d < r + l; ++d) {
      const u = i[d];
      u.hidden || (u.active && c ? o.push(u) : u.draw(t, a));
    }
    for (d = 0; d < o.length; ++d)
      o[d].draw(t, a);
  }
  getStyle(t, s) {
    const n = s ? "active" : "default";
    return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(n) : this.resolveDataElementOptions(t || 0, n);
  }
  getContext(t, s, n) {
    const i = this.getDataset();
    let a;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const o = this._cachedMeta.data[t];
      a = o.$context || (o.$context = ol(this.getContext(), t, o)), a.parsed = this.getParsed(t), a.raw = i.data[t], a.index = a.dataIndex = t;
    } else
      a = this.$context || (this.$context = al(this.chart.getContext(), this.index)), a.dataset = i, a.index = a.datasetIndex = this.index;
    return a.active = !!s, a.mode = n, a;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, s) {
    return this._resolveElementOptions(this.dataElementType.id, s, t);
  }
  _resolveElementOptions(t, s = "default", n) {
    const i = s === "active", a = this._cachedDataOpts, o = t + "-" + s, r = a[o], l = this.enableOptionSharing && Oe(n);
    if (r)
      return Un(r, l);
    const c = this.chart.config, d = c.datasetElementScopeKeys(this._type, t), u = i ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], f = c.getOptionScopes(this.getDataset(), d), p = Object.keys(ht.elements[t]), g = () => this.getContext(n, i, s), m = c.resolveNamedOptions(f, p, g, u);
    return m.$shared && (m.$shared = l, a[o] = Object.freeze(Un(m, l))), m;
  }
  _resolveAnimations(t, s, n) {
    const i = this.chart, a = this._cachedDataOpts, o = `animation-${s}`, r = a[o];
    if (r)
      return r;
    let l;
    if (i.options.animation !== !1) {
      const d = this.chart.config, u = d.datasetAnimationScopeKeys(this._type, s), f = d.getOptionScopes(this.getDataset(), u);
      l = d.createResolver(f, this.getContext(t, n, s));
    }
    const c = new va(i, l && l.animations);
    return l && l._cacheable && (a[o] = Object.freeze(c)), c;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, s) {
    return !s || Ds(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, s) {
    const n = this.resolveDataElementOptions(t, s), i = this._sharedOptions, a = this.getSharedOptions(n), o = this.includeOptions(s, a) || a !== i;
    return this.updateSharedOptions(a, s, n), {
      sharedOptions: a,
      includeOptions: o
    };
  }
  updateElement(t, s, n, i) {
    Ds(i) ? Object.assign(t, n) : this._resolveAnimations(s, i).update(t, n);
  }
  updateSharedOptions(t, s, n) {
    t && !Ds(s) && this._resolveAnimations(void 0, s).update(t, n);
  }
  _setStyle(t, s, n, i) {
    t.active = i;
    const a = this.getStyle(s, i);
    this._resolveAnimations(s, n, i).update(t, {
      options: !i && this.getSharedOptions(a) || a
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
    const i = n.length, a = s.length, o = Math.min(a, i);
    o && this.parse(0, o), a > i ? this._insertElements(i, a - i, t) : a < i && this._removeElements(a, i - a);
  }
  _insertElements(t, s, n = !0) {
    const i = this._cachedMeta, a = i.data, o = t + s;
    let r;
    const l = (c) => {
      for (c.length += s, r = c.length - 1; r >= o; r--)
        c[r] = c[r - s];
    };
    for (l(a), r = t; r < o; ++r)
      a[r] = new this.dataElementType();
    this._parsing && l(i._parsed), this.parse(t, s), n && this.updateElements(a, t, s, "reset");
  }
  updateElements(t, s, n, i) {
  }
  _removeElements(t, s) {
    const n = this._cachedMeta;
    if (this._parsing) {
      const i = n._parsed.splice(t, s);
      n._stacked && _e(n, i);
    }
    n.data.splice(t, s);
  }
  _sync(t) {
    if (this._parsing)
      this._syncList.push(t);
    else {
      const [s, n, i] = t;
      this[s](n, i);
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
    for (let i = 0, a = s.length; i < a; i++)
      n = n.concat(s[i].controller.getAllParsedValues(e));
    e._cache.$bar = ea(n.sort((i, a) => i - a));
  }
  return e._cache.$bar;
}
function cl(e) {
  const t = e.iScale, s = ll(t, e.type);
  let n = t._length, i, a, o, r;
  const l = () => {
    o === 32767 || o === -32768 || (Oe(r) && (n = Math.min(n, Math.abs(o - r) || n)), r = o);
  };
  for (i = 0, a = s.length; i < a; ++i)
    o = t.getPixelForValue(s[i]), l();
  for (r = void 0, i = 0, a = t.ticks.length; i < a; ++i)
    o = t.getPixelForTick(i), l();
  return n;
}
function dl(e, t, s, n) {
  const i = s.barThickness;
  let a, o;
  return Z(i) ? (a = t.min * s.categoryPercentage, o = s.barPercentage) : (a = i * n, o = 1), {
    chunk: a / n,
    ratio: o,
    start: t.pixels[e] - a / 2
  };
}
function hl(e, t, s, n) {
  const i = t.pixels, a = i[e];
  let o = e > 0 ? i[e - 1] : null, r = e < i.length - 1 ? i[e + 1] : null;
  const l = s.categoryPercentage;
  o === null && (o = a - (r === null ? t.end - t.start : r - a)), r === null && (r = a + a - o);
  const c = a - (a - Math.min(o, r)) / 2 * l;
  return {
    chunk: Math.abs(r - o) / 2 * l / n,
    ratio: s.barPercentage,
    start: c
  };
}
function ul(e, t, s, n) {
  const i = s.parse(e[0], n), a = s.parse(e[1], n), o = Math.min(i, a), r = Math.max(i, a);
  let l = o, c = r;
  Math.abs(o) > Math.abs(r) && (l = r, c = o), t[s.axis] = c, t._custom = {
    barStart: l,
    barEnd: c,
    start: i,
    end: a,
    min: o,
    max: r
  };
}
function _a(e, t, s, n) {
  return ut(e) ? ul(e, t, s, n) : t[s.axis] = s.parse(e, n), t;
}
function qn(e, t, s, n) {
  const i = e.iScale, a = e.vScale, o = i.getLabels(), r = i === a, l = [];
  let c, d, u, f;
  for (c = s, d = s + n; c < d; ++c)
    f = t[c], u = {}, u[i.axis] = r || i.parse(o[c], c), l.push(_a(f, u, a, c));
  return l;
}
function As(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function fl(e, t, s) {
  return e !== 0 ? Ot(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= s ? 1 : -1);
}
function gl(e) {
  let t, s, n, i, a;
  return e.horizontal ? (t = e.base > e.x, s = "left", n = "right") : (t = e.base < e.y, s = "bottom", n = "top"), t ? (i = "end", a = "start") : (i = "start", a = "end"), {
    start: s,
    end: n,
    reverse: t,
    top: i,
    bottom: a
  };
}
function pl(e, t, s, n) {
  let i = t.borderSkipped;
  const a = {};
  if (!i) {
    e.borderSkipped = a;
    return;
  }
  if (i === !0) {
    e.borderSkipped = {
      top: !0,
      right: !0,
      bottom: !0,
      left: !0
    };
    return;
  }
  const { start: o, end: r, reverse: l, top: c, bottom: d } = gl(e);
  i === "middle" && s && (e.enableBorderRadius = !0, (s._top || 0) === n ? i = c : (s._bottom || 0) === n ? i = d : (a[Xn(d, o, r, l)] = !0, i = c)), a[Xn(i, o, r, l)] = !0, e.borderSkipped = a;
}
function Xn(e, t, s, n) {
  return n ? (e = ml(e, t, s), e = Kn(e, s, t)) : e = Kn(e, t, s), e;
}
function ml(e, t, s) {
  return e === t ? s : e === s ? t : e;
}
function Kn(e, t, s) {
  return e === "start" ? t : e === "end" ? s : e;
}
function bl(e, { inflateAmount: t }, s) {
  e.inflateAmount = t === "auto" ? s === 1 ? 0.33 : 0 : t;
}
class vl extends ps {
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
  parsePrimitiveData(t, s, n, i) {
    return qn(t, s, n, i);
  }
  parseArrayData(t, s, n, i) {
    return qn(t, s, n, i);
  }
  parseObjectData(t, s, n, i) {
    const { iScale: a, vScale: o } = t, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, c = a.axis === "x" ? r : l, d = o.axis === "x" ? r : l, u = [];
    let f, p, g, m;
    for (f = n, p = n + i; f < p; ++f)
      m = s[f], g = {}, g[a.axis] = a.parse(se(m, c), f), u.push(_a(se(m, d), g, o, f));
    return u;
  }
  updateRangeFromParsed(t, s, n, i) {
    super.updateRangeFromParsed(t, s, n, i);
    const a = n._custom;
    a && s === this._cachedMeta.vScale && (t.min = Math.min(t.min, a.min), t.max = Math.max(t.max, a.max));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(t) {
    const s = this._cachedMeta, { iScale: n, vScale: i } = s, a = this.getParsed(t), o = a._custom, r = As(o) ? "[" + o.start + ", " + o.end + "]" : "" + i.getLabelForValue(a[i.axis]);
    return {
      label: "" + n.getLabelForValue(a[n.axis]),
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
  updateElements(t, s, n, i) {
    const a = i === "reset", { index: o, _cachedMeta: { vScale: r } } = this, l = r.getBasePixel(), c = r.isHorizontal(), d = this._getRuler(), { sharedOptions: u, includeOptions: f } = this._getSharedOptions(s, i);
    for (let p = s; p < s + n; p++) {
      const g = this.getParsed(p), m = a || Z(g[r.axis]) ? {
        base: l,
        head: l
      } : this._calculateBarValuePixels(p), b = this._calculateBarIndexPixels(p, d), v = (g._stacks || {})[r.axis], y = {
        horizontal: c,
        base: m.base,
        enableBorderRadius: !v || As(g._custom) || o === v._top || o === v._bottom,
        x: c ? m.head : b.center,
        y: c ? b.center : m.head,
        height: c ? b.size : Math.abs(m.size),
        width: c ? Math.abs(m.size) : b.size
      };
      f && (y.options = u || this.resolveDataElementOptions(p, t[p].active ? "active" : i));
      const x = y.options || t[p].options;
      pl(y, x, v, o), bl(y, x, d.ratio), this.updateElement(t[p], p, y, i);
    }
  }
  _getStacks(t, s) {
    const { iScale: n } = this._cachedMeta, i = n.getMatchingVisibleMetas(this._type).filter((d) => d.controller.options.grouped), a = n.options.stacked, o = [], r = this._cachedMeta.controller.getParsed(s), l = r && r[n.axis], c = (d) => {
      const u = d._parsed.find((p) => p[n.axis] === l), f = u && u[d.vScale.axis];
      if (Z(f) || isNaN(f))
        return !0;
    };
    for (const d of i)
      if (!(s !== void 0 && c(d)) && ((a === !1 || o.indexOf(d.stack) === -1 || a === void 0 && d.stack === void 0) && o.push(d.stack), d.index === t))
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
      t[V(this.chart.options.indexAxis === "x" ? n.xAxisID : n.yAxisID, s)] = !0;
    return Object.keys(t);
  }
  _getStackIndex(t, s, n) {
    const i = this._getStacks(t, n), a = s !== void 0 ? i.indexOf(s) : -1;
    return a === -1 ? i.length - 1 : a;
  }
  _getRuler() {
    const t = this.options, s = this._cachedMeta, n = s.iScale, i = [];
    let a, o;
    for (a = 0, o = s.data.length; a < o; ++a)
      i.push(n.getPixelForValue(this.getParsed(a)[n.axis], a));
    const r = t.barThickness;
    return {
      min: r || cl(s),
      pixels: i,
      start: n._startPixel,
      end: n._endPixel,
      stackCount: this._getStackCount(),
      scale: n,
      grouped: t.grouped,
      ratio: r ? 1 : t.categoryPercentage * t.barPercentage
    };
  }
  _calculateBarValuePixels(t) {
    const { _cachedMeta: { vScale: s, _stacked: n, index: i }, options: { base: a, minBarLength: o } } = this, r = a || 0, l = this.getParsed(t), c = l._custom, d = As(c);
    let u = l[s.axis], f = 0, p = n ? this.applyStack(s, l, n) : u, g, m;
    p !== u && (f = p - u, p = u), d && (u = c.barStart, p = c.barEnd - c.barStart, u !== 0 && Ot(u) !== Ot(c.barEnd) && (f = 0), f += u);
    const b = !Z(a) && !d ? a : f;
    let v = s.getPixelForValue(b);
    if (this.chart.getDataVisibility(t) ? g = s.getPixelForValue(f + p) : g = v, m = g - v, Math.abs(m) < o) {
      m = fl(m, s, r) * o, u === r && (v -= m / 2);
      const y = s.getPixelForDecimal(0), x = s.getPixelForDecimal(1), M = Math.min(y, x), S = Math.max(y, x);
      v = Math.max(Math.min(v, S), M), g = v + m, n && !d && (l._stacks[s.axis]._visualValues[i] = s.getValueForPixel(g) - s.getValueForPixel(v));
    }
    if (v === s.getPixelForValue(r)) {
      const y = Ot(m) * s.getLineWidthForValue(r) / 2;
      v += y, m -= y;
    }
    return {
      size: m,
      base: v,
      head: g,
      center: g + m / 2
    };
  }
  _calculateBarIndexPixels(t, s) {
    const n = s.scale, i = this.options, a = i.skipNull, o = V(i.maxBarThickness, 1 / 0);
    let r, l;
    const c = this._getAxisCount();
    if (s.grouped) {
      const d = a ? this._getStackCount(t) : s.stackCount, u = i.barThickness === "flex" ? hl(t, s, i, d * c) : dl(t, s, i, d * c), f = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, p = this._getAxis().indexOf(V(f, this.getFirstScaleIdForIndexAxis())), g = this._getStackIndex(this.index, this._cachedMeta.stack, a ? t : void 0) + p;
      r = u.start + u.chunk * g + u.chunk / 2, l = Math.min(o, u.chunk * u.ratio);
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
    const t = this._cachedMeta, s = t.vScale, n = t.data, i = n.length;
    let a = 0;
    for (; a < i; ++a)
      this.getParsed(a)[s.axis] !== null && !n[a].hidden && n[a].draw(this._ctx);
  }
}
function yl(e, t, s) {
  let n = 1, i = 1, a = 0, o = 0;
  if (t < dt) {
    const r = e, l = r + t, c = Math.cos(r), d = Math.sin(r), u = Math.cos(l), f = Math.sin(l), p = (x, M, S) => Re(x, r, l, !0) ? 1 : Math.max(M, M * s, S, S * s), g = (x, M, S) => Re(x, r, l, !0) ? -1 : Math.min(M, M * s, S, S * s), m = p(0, c, u), b = p(ft, d, f), v = g(et, c, u), y = g(et + ft, d, f);
    n = (m - v) / 2, i = (b - y) / 2, a = -(m + v) / 2, o = -(b + y) / 2;
  }
  return {
    ratioX: n,
    ratioY: i,
    offsetX: a,
    offsetY: o
  };
}
class _l extends ps {
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
            const s = t.data, { labels: { pointStyle: n, textAlign: i, color: a, useBorderRadius: o, borderRadius: r } } = t.legend.options;
            return s.labels.length && s.datasets.length ? s.labels.map((l, c) => {
              const u = t.getDatasetMeta(0).controller.getStyle(c);
              return {
                text: l,
                fillStyle: u.backgroundColor,
                fontColor: a,
                hidden: !t.getDataVisibility(c),
                lineDash: u.borderDash,
                lineDashOffset: u.borderDashOffset,
                lineJoin: u.borderJoinStyle,
                lineWidth: u.borderWidth,
                strokeStyle: u.borderColor,
                textAlign: i,
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
    const n = this.getDataset().data, i = this._cachedMeta;
    if (this._parsing === !1)
      i._parsed = n;
    else {
      let a = (l) => +n[l];
      if (q(n[t])) {
        const { key: l = "value" } = this._parsing;
        a = (c) => +se(n[c], l);
      }
      let o, r;
      for (o = t, r = t + s; o < r; ++o)
        i._parsed[o] = a(o);
    }
  }
  _getRotation() {
    return Wt(this.options.rotation - 90);
  }
  _getCircumference() {
    return Wt(this.options.circumference);
  }
  _getRotationExtents() {
    let t = dt, s = -dt;
    for (let n = 0; n < this.chart.data.datasets.length; ++n)
      if (this.chart.isDatasetVisible(n) && this.chart.getDatasetMeta(n).type === this._type) {
        const i = this.chart.getDatasetMeta(n).controller, a = i._getRotation(), o = i._getCircumference();
        t = Math.min(t, a), s = Math.max(s, a + o);
      }
    return {
      rotation: t,
      circumference: s - t
    };
  }
  update(t) {
    const s = this.chart, { chartArea: n } = s, i = this._cachedMeta, a = i.data, o = this.getMaxBorderWidth() + this.getMaxOffset(a) + this.options.spacing, r = Math.max((Math.min(n.width, n.height) - o) / 2, 0), l = Math.min(Co(this.options.cutout, r), 1), c = this._getRingWeight(this.index), { circumference: d, rotation: u } = this._getRotationExtents(), { ratioX: f, ratioY: p, offsetX: g, offsetY: m } = yl(u, d, l), b = (n.width - o) / f, v = (n.height - o) / p, y = Math.max(Math.min(b, v) / 2, 0), x = Gi(this.options.radius, y), M = Math.max(x * l, 0), S = (x - M) / this._getVisibleDatasetWeightTotal();
    this.offsetX = g * x, this.offsetY = m * x, i.total = this.calculateTotal(), this.outerRadius = x - S * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - S * c, 0), this.updateElements(a, 0, a.length, t);
  }
  _circumference(t, s) {
    const n = this.options, i = this._cachedMeta, a = this._getCircumference();
    return s && n.animation.animateRotate || !this.chart.getDataVisibility(t) || i._parsed[t] === null || i.data[t].hidden ? 0 : this.calculateCircumference(i._parsed[t] * a / dt);
  }
  updateElements(t, s, n, i) {
    const a = i === "reset", o = this.chart, r = o.chartArea, c = o.options.animation, d = (r.left + r.right) / 2, u = (r.top + r.bottom) / 2, f = a && c.animateScale, p = f ? 0 : this.innerRadius, g = f ? 0 : this.outerRadius, { sharedOptions: m, includeOptions: b } = this._getSharedOptions(s, i);
    let v = this._getRotation(), y;
    for (y = 0; y < s; ++y)
      v += this._circumference(y, a);
    for (y = s; y < s + n; ++y) {
      const x = this._circumference(y, a), M = t[y], S = {
        x: d + this.offsetX,
        y: u + this.offsetY,
        startAngle: v,
        endAngle: v + x,
        circumference: x,
        outerRadius: g,
        innerRadius: p
      };
      b && (S.options = m || this.resolveDataElementOptions(y, M.active ? "active" : i)), v += x, this.updateElement(M, y, S, i);
    }
  }
  calculateTotal() {
    const t = this._cachedMeta, s = t.data;
    let n = 0, i;
    for (i = 0; i < s.length; i++) {
      const a = t._parsed[i];
      a !== null && !isNaN(a) && this.chart.getDataVisibility(i) && !s[i].hidden && (n += Math.abs(a));
    }
    return n;
  }
  calculateCircumference(t) {
    const s = this._cachedMeta.total;
    return s > 0 && !isNaN(t) ? dt * (Math.abs(t) / s) : 0;
  }
  getLabelAndValue(t) {
    const s = this._cachedMeta, n = this.chart, i = n.data.labels || [], a = en(s._parsed[t], n.options.locale);
    return {
      label: i[t] || "",
      value: a
    };
  }
  getMaxBorderWidth(t) {
    let s = 0;
    const n = this.chart;
    let i, a, o, r, l;
    if (!t) {
      for (i = 0, a = n.data.datasets.length; i < a; ++i)
        if (n.isDatasetVisible(i)) {
          o = n.getDatasetMeta(i), t = o.data, r = o.controller;
          break;
        }
    }
    if (!t)
      return 0;
    for (i = 0, a = t.length; i < a; ++i)
      l = r.resolveDataElementOptions(i), l.borderAlign !== "inner" && (s = Math.max(s, l.borderWidth || 0, l.hoverBorderWidth || 0));
    return s;
  }
  getMaxOffset(t) {
    let s = 0;
    for (let n = 0, i = t.length; n < i; ++n) {
      const a = this.resolveDataElementOptions(n);
      s = Math.max(s, a.offset || 0, a.hoverOffset || 0);
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
    return Math.max(V(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
class xl extends ps {
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
    const s = this._cachedMeta, { dataset: n, data: i = [], _dataset: a } = s, o = this.chart._animationsDisabled;
    let { start: r, count: l } = Uo(s, i, o);
    this._drawStart = r, this._drawCount = l, qo(s) && (r = 0, l = i.length), n._chart = this.chart, n._datasetIndex = this.index, n._decimated = !!a._decimated, n.points = i;
    const c = this.resolveDatasetElementOptions(t);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(n, void 0, {
      animated: !o,
      options: c
    }, t), this.updateElements(i, r, l, t);
  }
  updateElements(t, s, n, i) {
    const a = i === "reset", { iScale: o, vScale: r, _stacked: l, _dataset: c } = this._cachedMeta, { sharedOptions: d, includeOptions: u } = this._getSharedOptions(s, i), f = o.axis, p = r.axis, { spanGaps: g, segment: m } = this.options, b = Ee(g) ? g : Number.POSITIVE_INFINITY, v = this.chart._animationsDisabled || a || i === "none", y = s + n, x = t.length;
    let M = s > 0 && this.getParsed(s - 1);
    for (let S = 0; S < x; ++S) {
      const $ = t[S], C = v ? $ : {};
      if (S < s || S >= y) {
        C.skip = !0;
        continue;
      }
      const D = this.getParsed(S), P = Z(D[p]), F = C[f] = o.getPixelForValue(D[f], S), R = C[p] = a || P ? r.getBasePixel() : r.getPixelForValue(l ? this.applyStack(r, D, l) : D[p], S);
      C.skip = isNaN(F) || isNaN(R) || P, C.stop = S > 0 && Math.abs(D[f] - M[f]) > b, m && (C.parsed = D, C.raw = c.data[S]), u && (C.options = d || this.resolveDataElementOptions(S, $.active ? "active" : i)), v || this.updateElement($, S, C, i), M = D;
    }
  }
  getMaxOverflow() {
    const t = this._cachedMeta, s = t.dataset, n = s.options && s.options.borderWidth || 0, i = t.data || [];
    if (!i.length)
      return n;
    const a = i[0].size(this.resolveDataElementOptions(0)), o = i[i.length - 1].size(this.resolveDataElementOptions(i.length - 1));
    return Math.max(n, a, o) / 2;
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
function Qt() {
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
    return Qt();
  }
  parse() {
    return Qt();
  }
  format() {
    return Qt();
  }
  add() {
    return Qt();
  }
  diff() {
    return Qt();
  }
  startOf() {
    return Qt();
  }
  endOf() {
    return Qt();
  }
}
var Ml = {
  _date: cn
};
function Sl(e, t, s, n) {
  const { controller: i, data: a, _sorted: o } = e, r = i._cachedMeta.iScale, l = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (r && t === r.axis && t !== "r" && o && a.length) {
    const c = r._reversePixels ? Ho : te;
    if (n) {
      if (i._sharedOptions) {
        const d = a[0], u = typeof d.getRange == "function" && d.getRange(t);
        if (u) {
          const f = c(a, t, s - u), p = c(a, t, s + u);
          return {
            lo: f.lo,
            hi: p.hi
          };
        }
      }
    } else {
      const d = c(a, t, s);
      if (l) {
        const { vScale: u } = i._cachedMeta, { _parsed: f } = e, p = f.slice(0, d.lo + 1).reverse().findIndex((m) => !Z(m[u.axis]));
        d.lo -= Math.max(0, p);
        const g = f.slice(d.hi).findIndex((m) => !Z(m[u.axis]));
        d.hi += Math.max(0, g);
      }
      return d;
    }
  }
  return {
    lo: 0,
    hi: a.length - 1
  };
}
function ms(e, t, s, n, i) {
  const a = e.getSortedVisibleDatasetMetas(), o = s[t];
  for (let r = 0, l = a.length; r < l; ++r) {
    const { index: c, data: d } = a[r], { lo: u, hi: f } = Sl(a[r], t, o, i);
    for (let p = u; p <= f; ++p) {
      const g = d[p];
      g.skip || n(g, c, p);
    }
  }
}
function wl(e) {
  const t = e.indexOf("x") !== -1, s = e.indexOf("y") !== -1;
  return function(n, i) {
    const a = t ? Math.abs(n.x - i.x) : 0, o = s ? Math.abs(n.y - i.y) : 0;
    return Math.sqrt(Math.pow(a, 2) + Math.pow(o, 2));
  };
}
function Ts(e, t, s, n, i) {
  const a = [];
  return !i && !e.isPointInArea(t) || ms(e, s, t, function(r, l, c) {
    !i && !Ie(r, e.chartArea, 0) || r.inRange(t.x, t.y, n) && a.push({
      element: r,
      datasetIndex: l,
      index: c
    });
  }, !0), a;
}
function Cl(e, t, s, n) {
  let i = [];
  function a(o, r, l) {
    const { startAngle: c, endAngle: d } = o.getProps([
      "startAngle",
      "endAngle"
    ], n), { angle: u } = Ji(o, {
      x: t.x,
      y: t.y
    });
    Re(u, c, d) && i.push({
      element: o,
      datasetIndex: r,
      index: l
    });
  }
  return ms(e, s, t, a), i;
}
function $l(e, t, s, n, i, a) {
  let o = [];
  const r = wl(s);
  let l = Number.POSITIVE_INFINITY;
  function c(d, u, f) {
    const p = d.inRange(t.x, t.y, i);
    if (n && !p)
      return;
    const g = d.getCenterPoint(i);
    if (!(!!a || e.isPointInArea(g)) && !p)
      return;
    const b = r(t, g);
    b < l ? (o = [
      {
        element: d,
        datasetIndex: u,
        index: f
      }
    ], l = b) : b === l && o.push({
      element: d,
      datasetIndex: u,
      index: f
    });
  }
  return ms(e, s, t, c), o;
}
function Fs(e, t, s, n, i, a) {
  return !a && !e.isPointInArea(t) ? [] : s === "r" && !n ? Cl(e, t, s, i) : $l(e, t, s, n, i, a);
}
function Gn(e, t, s, n, i) {
  const a = [], o = s === "x" ? "inXRange" : "inYRange";
  let r = !1;
  return ms(e, s, t, (l, c, d) => {
    l[o] && l[o](t[s], i) && (a.push({
      element: l,
      datasetIndex: c,
      index: d
    }), r = r || l.inRange(t.x, t.y, i));
  }), n && !r ? [] : a;
}
var Dl = {
  modes: {
    index(e, t, s, n) {
      const i = Zt(t, e), a = s.axis || "x", o = s.includeInvisible || !1, r = s.intersect ? Ts(e, i, a, n, o) : Fs(e, i, a, !1, n, o), l = [];
      return r.length ? (e.getSortedVisibleDatasetMetas().forEach((c) => {
        const d = r[0].index, u = c.data[d];
        u && !u.skip && l.push({
          element: u,
          datasetIndex: c.index,
          index: d
        });
      }), l) : [];
    },
    dataset(e, t, s, n) {
      const i = Zt(t, e), a = s.axis || "xy", o = s.includeInvisible || !1;
      let r = s.intersect ? Ts(e, i, a, n, o) : Fs(e, i, a, !1, n, o);
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
    point(e, t, s, n) {
      const i = Zt(t, e), a = s.axis || "xy", o = s.includeInvisible || !1;
      return Ts(e, i, a, n, o);
    },
    nearest(e, t, s, n) {
      const i = Zt(t, e), a = s.axis || "xy", o = s.includeInvisible || !1;
      return Fs(e, i, a, s.intersect, n, o);
    },
    x(e, t, s, n) {
      const i = Zt(t, e);
      return Gn(e, i, "x", s.intersect, n);
    },
    y(e, t, s, n) {
      const i = Zt(t, e);
      return Gn(e, i, "y", s.intersect, n);
    }
  }
};
const xa = [
  "left",
  "top",
  "right",
  "bottom"
];
function xe(e, t) {
  return e.filter((s) => s.pos === t);
}
function Qn(e, t) {
  return e.filter((s) => xa.indexOf(s.pos) === -1 && s.box.axis === t);
}
function ke(e, t) {
  return e.sort((s, n) => {
    const i = t ? n : s, a = t ? s : n;
    return i.weight === a.weight ? i.index - a.index : i.weight - a.weight;
  });
}
function Al(e) {
  const t = [];
  let s, n, i, a, o, r;
  for (s = 0, n = (e || []).length; s < n; ++s)
    i = e[s], { position: a, options: { stack: o, stackWeight: r = 1 } } = i, t.push({
      index: s,
      box: i,
      pos: a,
      horizontal: i.isHorizontal(),
      weight: i.weight,
      stack: o && a + o,
      stackWeight: r
    });
  return t;
}
function Tl(e) {
  const t = {};
  for (const s of e) {
    const { stack: n, pos: i, stackWeight: a } = s;
    if (!n || !xa.includes(i))
      continue;
    const o = t[n] || (t[n] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    o.count++, o.weight += a;
  }
  return t;
}
function Fl(e, t) {
  const s = Tl(e), { vBoxMaxWidth: n, hBoxMaxHeight: i } = t;
  let a, o, r;
  for (a = 0, o = e.length; a < o; ++a) {
    r = e[a];
    const { fullSize: l } = r.box, c = s[r.stack], d = c && r.stackWeight / c.weight;
    r.horizontal ? (r.width = d ? d * n : l && t.availableWidth, r.height = i) : (r.width = n, r.height = d ? d * i : l && t.availableHeight);
  }
  return s;
}
function Pl(e) {
  const t = Al(e), s = ke(t.filter((c) => c.box.fullSize), !0), n = ke(xe(t, "left"), !0), i = ke(xe(t, "right")), a = ke(xe(t, "top"), !0), o = ke(xe(t, "bottom")), r = Qn(t, "x"), l = Qn(t, "y");
  return {
    fullSize: s,
    leftAndTop: n.concat(a),
    rightAndBottom: i.concat(l).concat(o).concat(r),
    chartArea: xe(t, "chartArea"),
    vertical: n.concat(i).concat(l),
    horizontal: a.concat(o).concat(r)
  };
}
function Zn(e, t, s, n) {
  return Math.max(e[s], t[s]) + Math.max(e[n], t[n]);
}
function ka(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function Bl(e, t, s, n) {
  const { pos: i, box: a } = s, o = e.maxPadding;
  if (!q(i)) {
    s.size && (e[i] -= s.size);
    const u = n[s.stack] || {
      size: 0,
      count: 1
    };
    u.size = Math.max(u.size, s.horizontal ? a.height : a.width), s.size = u.size / u.count, e[i] += s.size;
  }
  a.getPadding && ka(o, a.getPadding());
  const r = Math.max(0, t.outerWidth - Zn(o, e, "left", "right")), l = Math.max(0, t.outerHeight - Zn(o, e, "top", "bottom")), c = r !== e.w, d = l !== e.h;
  return e.w = r, e.h = l, s.horizontal ? {
    same: c,
    other: d
  } : {
    same: d,
    other: c
  };
}
function Ll(e) {
  const t = e.maxPadding;
  function s(n) {
    const i = Math.max(t[n] - e[n], 0);
    return e[n] += i, i;
  }
  e.y += s("top"), e.x += s("left"), s("right"), s("bottom");
}
function Ol(e, t) {
  const s = t.maxPadding;
  function n(i) {
    const a = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return i.forEach((o) => {
      a[o] = Math.max(t[o], s[o]);
    }), a;
  }
  return n(e ? [
    "left",
    "right"
  ] : [
    "top",
    "bottom"
  ]);
}
function $e(e, t, s, n) {
  const i = [];
  let a, o, r, l, c, d;
  for (a = 0, o = e.length, c = 0; a < o; ++a) {
    r = e[a], l = r.box, l.update(r.width || t.w, r.height || t.h, Ol(r.horizontal, t));
    const { same: u, other: f } = Bl(t, s, r, n);
    c |= u && i.length, d = d || f, l.fullSize || i.push(r);
  }
  return c && $e(i, t, s, n) || d;
}
function Ke(e, t, s, n, i) {
  e.top = s, e.left = t, e.right = t + n, e.bottom = s + i, e.width = n, e.height = i;
}
function Jn(e, t, s, n) {
  const i = s.padding;
  let { x: a, y: o } = t;
  for (const r of e) {
    const l = r.box, c = n[r.stack] || {
      placed: 0,
      weight: 1
    }, d = r.stackWeight / c.weight || 1;
    if (r.horizontal) {
      const u = t.w * d, f = c.size || l.height;
      Oe(c.start) && (o = c.start), l.fullSize ? Ke(l, i.left, o, s.outerWidth - i.right - i.left, f) : Ke(l, t.left + c.placed, o, u, f), c.start = o, c.placed += u, o = l.bottom;
    } else {
      const u = t.h * d, f = c.size || l.width;
      Oe(c.start) && (a = c.start), l.fullSize ? Ke(l, a, i.top, f, s.outerHeight - i.bottom - i.top) : Ke(l, a, t.top + c.placed, f, u), c.start = a, c.placed += u, a = l.right;
    }
  }
  t.x = a, t.y = o;
}
var At = {
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
    const i = Tt(e.options.layout.padding), a = Math.max(t - i.width, 0), o = Math.max(s - i.height, 0), r = Pl(e.boxes), l = r.vertical, c = r.horizontal;
    tt(e.boxes, (m) => {
      typeof m.beforeLayout == "function" && m.beforeLayout();
    });
    const d = l.reduce((m, b) => b.box.options && b.box.options.display === !1 ? m : m + 1, 0) || 1, u = Object.freeze({
      outerWidth: t,
      outerHeight: s,
      padding: i,
      availableWidth: a,
      availableHeight: o,
      vBoxMaxWidth: a / 2 / d,
      hBoxMaxHeight: o / 2
    }), f = Object.assign({}, i);
    ka(f, Tt(n));
    const p = Object.assign({
      maxPadding: f,
      w: a,
      h: o,
      x: i.left,
      y: i.top
    }, i), g = Fl(l.concat(c), u);
    $e(r.fullSize, p, u, g), $e(l, p, u, g), $e(c, p, u, g) && $e(l, p, u, g), Ll(p), Jn(r.leftAndTop, p, u, g), p.x += p.w, p.y += p.h, Jn(r.rightAndBottom, p, u, g), e.chartArea = {
      left: p.left,
      top: p.top,
      right: p.left + p.w,
      bottom: p.top + p.h,
      height: p.h,
      width: p.w
    }, tt(r.chartArea, (m) => {
      const b = m.box;
      Object.assign(b, e.chartArea), b.update(p.w, p.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class Ma {
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
  getMaximumSize(t, s, n, i) {
    return s = Math.max(0, s || t.width), n = n || t.height, {
      width: s,
      height: Math.max(0, i ? Math.floor(s / i) : n)
    };
  }
  isAttached(t) {
    return !0;
  }
  updateConfig(t) {
  }
}
class El extends Ma {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const es = "$chartjs", Rl = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, ti = (e) => e === null || e === "";
function Il(e, t) {
  const s = e.style, n = e.getAttribute("height"), i = e.getAttribute("width");
  if (e[es] = {
    initial: {
      height: n,
      width: i,
      style: {
        display: s.display,
        height: s.height,
        width: s.width
      }
    }
  }, s.display = s.display || "block", s.boxSizing = s.boxSizing || "border-box", ti(i)) {
    const a = Rn(e, "width");
    a !== void 0 && (e.width = a);
  }
  if (ti(n))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const a = Rn(e, "height");
      a !== void 0 && (e.height = a);
    }
  return e;
}
const Sa = Er ? {
  passive: !0
} : !1;
function zl(e, t, s) {
  e && e.addEventListener(t, s, Sa);
}
function Wl(e, t, s) {
  e && e.canvas && e.canvas.removeEventListener(t, s, Sa);
}
function Hl(e, t) {
  const s = Rl[e.type] || e.type, { x: n, y: i } = Zt(e, t);
  return {
    type: s,
    chart: t,
    native: e,
    x: n !== void 0 ? n : null,
    y: i !== void 0 ? i : null
  };
}
function ds(e, t) {
  for (const s of e)
    if (s === t || s.contains(t))
      return !0;
}
function Nl(e, t, s) {
  const n = e.canvas, i = new MutationObserver((a) => {
    let o = !1;
    for (const r of a)
      o = o || ds(r.addedNodes, n), o = o && !ds(r.removedNodes, n);
    o && s();
  });
  return i.observe(document, {
    childList: !0,
    subtree: !0
  }), i;
}
function Vl(e, t, s) {
  const n = e.canvas, i = new MutationObserver((a) => {
    let o = !1;
    for (const r of a)
      o = o || ds(r.removedNodes, n), o = o && !ds(r.addedNodes, n);
    o && s();
  });
  return i.observe(document, {
    childList: !0,
    subtree: !0
  }), i;
}
const We = /* @__PURE__ */ new Map();
let ei = 0;
function wa() {
  const e = window.devicePixelRatio;
  e !== ei && (ei = e, We.forEach((t, s) => {
    s.currentDevicePixelRatio !== e && t();
  }));
}
function jl(e, t) {
  We.size || window.addEventListener("resize", wa), We.set(e, t);
}
function Yl(e) {
  We.delete(e), We.size || window.removeEventListener("resize", wa);
}
function Ul(e, t, s) {
  const n = e.canvas, i = n && ln(n);
  if (!i)
    return;
  const a = na((r, l) => {
    const c = i.clientWidth;
    s(r, l), c < i.clientWidth && s();
  }, window), o = new ResizeObserver((r) => {
    const l = r[0], c = l.contentRect.width, d = l.contentRect.height;
    c === 0 && d === 0 || a(c, d);
  });
  return o.observe(i), jl(e, a), o;
}
function Ps(e, t, s) {
  s && s.disconnect(), t === "resize" && Yl(e);
}
function ql(e, t, s) {
  const n = e.canvas, i = na((a) => {
    e.ctx !== null && s(Hl(a, e));
  }, e);
  return zl(n, t, i), i;
}
class Xl extends Ma {
  acquireContext(t, s) {
    const n = t && t.getContext && t.getContext("2d");
    return n && n.canvas === t ? (Il(t, s), n) : null;
  }
  releaseContext(t) {
    const s = t.canvas;
    if (!s[es])
      return !1;
    const n = s[es].initial;
    [
      "height",
      "width"
    ].forEach((a) => {
      const o = n[a];
      Z(o) ? s.removeAttribute(a) : s.setAttribute(a, o);
    });
    const i = n.style || {};
    return Object.keys(i).forEach((a) => {
      s.style[a] = i[a];
    }), s.width = s.width, delete s[es], !0;
  }
  addEventListener(t, s, n) {
    this.removeEventListener(t, s);
    const i = t.$proxies || (t.$proxies = {}), o = {
      attach: Nl,
      detach: Vl,
      resize: Ul
    }[s] || ql;
    i[s] = o(t, s, n);
  }
  removeEventListener(t, s) {
    const n = t.$proxies || (t.$proxies = {}), i = n[s];
    if (!i)
      return;
    ({
      attach: Ps,
      detach: Ps,
      resize: Ps
    }[s] || Wl)(t, s, i), n[s] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, s, n, i) {
    return Or(t, s, n, i);
  }
  isAttached(t) {
    const s = t && ln(t);
    return !!(s && s.isConnected);
  }
}
function Kl(e) {
  return !rn() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? El : Xl;
}
class Nt {
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
    return Ee(this.x) && Ee(this.y);
  }
  getProps(t, s) {
    const n = this.$animations;
    if (!s || !n)
      return this;
    const i = {};
    return t.forEach((a) => {
      i[a] = n[a] && n[a].active() ? n[a]._to : this[a];
    }), i;
  }
}
function Gl(e, t) {
  const s = e.options.ticks, n = Ql(e), i = Math.min(s.maxTicksLimit || n, n), a = s.major.enabled ? Jl(t) : [], o = a.length, r = a[0], l = a[o - 1], c = [];
  if (o > i)
    return tc(t, c, a, o / i), c;
  const d = Zl(a, t, i);
  if (o > 0) {
    let u, f;
    const p = o > 1 ? Math.round((l - r) / (o - 1)) : null;
    for (Ge(t, c, d, Z(p) ? 0 : r - p, r), u = 0, f = o - 1; u < f; u++)
      Ge(t, c, d, a[u], a[u + 1]);
    return Ge(t, c, d, l, Z(p) ? t.length : l + p), c;
  }
  return Ge(t, c, d), c;
}
function Ql(e) {
  const t = e.options.offset, s = e._tickSize(), n = e._length / s + (t ? 0 : 1), i = e._maxLength / s;
  return Math.floor(Math.min(n, i));
}
function Zl(e, t, s) {
  const n = ec(e), i = t.length / s;
  if (!n)
    return Math.max(i, 1);
  const a = Lo(n);
  for (let o = 0, r = a.length - 1; o < r; o++) {
    const l = a[o];
    if (l > i)
      return l;
  }
  return Math.max(i, 1);
}
function Jl(e) {
  const t = [];
  let s, n;
  for (s = 0, n = e.length; s < n; s++)
    e[s].major && t.push(s);
  return t;
}
function tc(e, t, s, n) {
  let i = 0, a = s[0], o;
  for (n = Math.ceil(n), o = 0; o < e.length; o++)
    o === a && (t.push(e[o]), i++, a = s[i * n]);
}
function Ge(e, t, s, n, i) {
  const a = V(n, 0), o = Math.min(V(i, e.length), e.length);
  let r = 0, l, c, d;
  for (s = Math.ceil(s), i && (l = i - n, s = l / Math.floor(l / s)), d = a; d < 0; )
    r++, d = Math.round(a + r * s);
  for (c = Math.max(a, 0); c < o; c++)
    c === d && (t.push(e[c]), r++, d = Math.round(a + r * s));
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
const sc = (e) => e === "left" ? "right" : e === "right" ? "left" : e, si = (e, t, s) => t === "top" || t === "left" ? e[t] + s : e[t] - s, ni = (e, t) => Math.min(t || e, e);
function ii(e, t) {
  const s = [], n = e.length / t, i = e.length;
  let a = 0;
  for (; a < i; a += n)
    s.push(e[Math.floor(a)]);
  return s;
}
function nc(e, t, s) {
  const n = e.ticks.length, i = Math.min(t, n - 1), a = e._startPixel, o = e._endPixel, r = 1e-6;
  let l = e.getPixelForTick(i), c;
  if (!(s && (n === 1 ? c = Math.max(l - a, o - l) : t === 0 ? c = (e.getPixelForTick(1) - l) / 2 : c = (l - e.getPixelForTick(i - 1)) / 2, l += i < t ? c : -c, l < a - r || l > o + r)))
    return l;
}
function ic(e, t) {
  tt(e, (s) => {
    const n = s.gc, i = n.length / 2;
    let a;
    if (i > t) {
      for (a = 0; a < i; ++a)
        delete s.data[n[a]];
      n.splice(0, i);
    }
  });
}
function Me(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function ai(e, t) {
  if (!e.display)
    return 0;
  const s = vt(e.font, t), n = Tt(e.padding);
  return (ut(e.text) ? e.text.length : 1) * s.lineHeight + n.height;
}
function ac(e, t) {
  return ie(e, {
    scale: t,
    type: "scale"
  });
}
function oc(e, t, s) {
  return ie(e, {
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
  const { top: i, left: a, bottom: o, right: r, chart: l } = e, { chartArea: c, scales: d } = l;
  let u = 0, f, p, g;
  const m = o - i, b = r - a;
  if (e.isHorizontal()) {
    if (p = mt(n, a, r), q(s)) {
      const v = Object.keys(s)[0], y = s[v];
      g = d[v].getPixelForValue(y) + m - t;
    } else s === "center" ? g = (c.bottom + c.top) / 2 + m - t : g = si(e, s, t);
    f = r - a;
  } else {
    if (q(s)) {
      const v = Object.keys(s)[0], y = s[v];
      p = d[v].getPixelForValue(y) - b + t;
    } else s === "center" ? p = (c.left + c.right) / 2 - b + t : p = si(e, s, t);
    g = mt(n, o, i), u = s === "left" ? -ft : ft;
  }
  return {
    titleX: p,
    titleY: g,
    maxWidth: f,
    rotation: u
  };
}
class me extends Nt {
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
    let { _userMin: t, _userMax: s, _suggestedMin: n, _suggestedMax: i } = this;
    return t = Pt(t, Number.POSITIVE_INFINITY), s = Pt(s, Number.NEGATIVE_INFINITY), n = Pt(n, Number.POSITIVE_INFINITY), i = Pt(i, Number.NEGATIVE_INFINITY), {
      min: Pt(t, n),
      max: Pt(s, i),
      minDefined: yt(t),
      maxDefined: yt(s)
    };
  }
  getMinMax(t) {
    let { min: s, max: n, minDefined: i, maxDefined: a } = this.getUserBounds(), o;
    if (i && a)
      return {
        min: s,
        max: n
      };
    const r = this.getMatchingVisibleMetas();
    for (let l = 0, c = r.length; l < c; ++l)
      o = r[l].controller.getMinMax(this, t), i || (s = Math.min(s, o.min)), a || (n = Math.max(n, o.max));
    return s = a && s > n ? n : s, n = i && s > n ? s : n, {
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
    ot(this.options.beforeUpdate, [
      this
    ]);
  }
  update(t, s, n) {
    const { beginAtZero: i, grace: a, ticks: o } = this.options, r = o.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = s, this._margins = n = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, n), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + n.left + n.right : this.height + n.top + n.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = fr(this, a, i), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const l = r < this.ticks.length;
    this._convertTicksToLabels(l ? ii(this.ticks, r) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), o.display && (o.autoSkip || o.source === "auto") && (this.ticks = Gl(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), l && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, s, n;
    this.isHorizontal() ? (s = this.left, n = this.right) : (s = this.top, n = this.bottom, t = !t), this._startPixel = s, this._endPixel = n, this._reversePixels = t, this._length = n - s, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    ot(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    ot(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    ot(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), ot(this.options[t], [
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
    ot(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const s = this.options.ticks;
    let n, i, a;
    for (n = 0, i = t.length; n < i; n++)
      a = t[n], a.label = ot(s.callback, [
        a.value,
        n,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    ot(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    ot(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, s = t.ticks, n = ni(this.ticks.length, t.ticks.maxTicksLimit), i = s.minRotation || 0, a = s.maxRotation;
    let o = i, r, l, c;
    if (!this._isVisible() || !s.display || i >= a || n <= 1 || !this.isHorizontal()) {
      this.labelRotation = i;
      return;
    }
    const d = this._getLabelSizes(), u = d.widest.width, f = d.highest.height, p = bt(this.chart.width - u, 0, this.maxWidth);
    r = t.offset ? this.maxWidth / n : p / (n - 1), u + 6 > r && (r = p / (n - (t.offset ? 0.5 : 1)), l = this.maxHeight - Me(t.grid) - s.padding - ai(t.title, this.chart.options.font), c = Math.sqrt(u * u + f * f), o = Io(Math.min(Math.asin(bt((d.highest.height + 6) / r, -1, 1)), Math.asin(bt(l / c, -1, 1)) - Math.asin(bt(f / c, -1, 1)))), o = Math.max(i, Math.min(a, o))), this.labelRotation = o;
  }
  afterCalculateLabelRotation() {
    ot(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    ot(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: s, options: { ticks: n, title: i, grid: a } } = this, o = this._isVisible(), r = this.isHorizontal();
    if (o) {
      const l = ai(i, s.options.font);
      if (r ? (t.width = this.maxWidth, t.height = Me(a) + l) : (t.height = this.maxHeight, t.width = Me(a) + l), n.display && this.ticks.length) {
        const { first: c, last: d, widest: u, highest: f } = this._getLabelSizes(), p = n.padding * 2, g = Wt(this.labelRotation), m = Math.cos(g), b = Math.sin(g);
        if (r) {
          const v = n.mirror ? 0 : b * u.width + m * f.height;
          t.height = Math.min(this.maxHeight, t.height + v + p);
        } else {
          const v = n.mirror ? 0 : m * u.width + b * f.height;
          t.width = Math.min(this.maxWidth, t.width + v + p);
        }
        this._calculatePadding(c, d, b, m);
      }
    }
    this._handleMargins(), r ? (this.width = this._length = s.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = s.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, s, n, i) {
    const { ticks: { align: a, padding: o }, position: r } = this.options, l = this.labelRotation !== 0, c = r !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const d = this.getPixelForTick(0) - this.left, u = this.right - this.getPixelForTick(this.ticks.length - 1);
      let f = 0, p = 0;
      l ? c ? (f = i * t.width, p = n * s.height) : (f = n * t.height, p = i * s.width) : a === "start" ? p = s.width : a === "end" ? f = t.width : a !== "inner" && (f = t.width / 2, p = s.width / 2), this.paddingLeft = Math.max((f - d + o) * this.width / (this.width - d), 0), this.paddingRight = Math.max((p - u + o) * this.width / (this.width - u), 0);
    } else {
      let d = s.height / 2, u = t.height / 2;
      a === "start" ? (d = 0, u = t.height) : a === "end" && (d = s.height, u = 0), this.paddingTop = d + o, this.paddingBottom = u + o;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    ot(this.options.afterFit, [
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
      Z(t[s].label) && (t.splice(s, 1), n--, s--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const s = this.options.ticks.sampleSize;
      let n = this.ticks;
      s < n.length && (n = ii(n, s)), this._labelSizes = t = this._computeLabelSizes(n, n.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, s, n) {
    const { ctx: i, _longestTextCache: a } = this, o = [], r = [], l = Math.floor(s / ni(s, n));
    let c = 0, d = 0, u, f, p, g, m, b, v, y, x, M, S;
    for (u = 0; u < s; u += l) {
      if (g = t[u].label, m = this._resolveTickFontOptions(u), i.font = b = m.string, v = a[b] = a[b] || {
        data: {},
        gc: []
      }, y = m.lineHeight, x = M = 0, !Z(g) && !ut(g))
        x = Pn(i, v.data, v.gc, x, g), M = y;
      else if (ut(g))
        for (f = 0, p = g.length; f < p; ++f)
          S = g[f], !Z(S) && !ut(S) && (x = Pn(i, v.data, v.gc, x, S), M += y);
      o.push(x), r.push(M), c = Math.max(x, c), d = Math.max(M, d);
    }
    ic(a, s);
    const $ = o.indexOf(c), C = r.indexOf(d), D = (P) => ({
      width: o[P] || 0,
      height: r[P] || 0
    });
    return {
      first: D(0),
      last: D(s - 1),
      widest: D($),
      highest: D(C),
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
    return Wo(this._alignToPixels ? Gt(this.chart, s, 0) : s);
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
    return this.$context || (this.$context = ac(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, s = Wt(this.labelRotation), n = Math.abs(Math.cos(s)), i = Math.abs(Math.sin(s)), a = this._getLabelSizes(), o = t.autoSkipPadding || 0, r = a ? a.widest.width + o : 0, l = a ? a.highest.height + o : 0;
    return this.isHorizontal() ? l * n > r * i ? r / n : l / i : l * i < r * n ? l / n : r / i;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const s = this.axis, n = this.chart, i = this.options, { grid: a, position: o, border: r } = i, l = a.offset, c = this.isHorizontal(), u = this.ticks.length + (l ? 1 : 0), f = Me(a), p = [], g = r.setContext(this.getContext()), m = g.display ? g.width : 0, b = m / 2, v = function(j) {
      return Gt(n, j, m);
    };
    let y, x, M, S, $, C, D, P, F, R, L, N;
    if (o === "top")
      y = v(this.bottom), C = this.bottom - f, P = y - b, R = v(t.top) + b, N = t.bottom;
    else if (o === "bottom")
      y = v(this.top), R = t.top, N = v(t.bottom) - b, C = y + b, P = this.top + f;
    else if (o === "left")
      y = v(this.right), $ = this.right - f, D = y - b, F = v(t.left) + b, L = t.right;
    else if (o === "right")
      y = v(this.left), F = t.left, L = v(t.right) - b, $ = y + b, D = this.left + f;
    else if (s === "x") {
      if (o === "center")
        y = v((t.top + t.bottom) / 2 + 0.5);
      else if (q(o)) {
        const j = Object.keys(o)[0], J = o[j];
        y = v(this.chart.scales[j].getPixelForValue(J));
      }
      R = t.top, N = t.bottom, C = y + b, P = C + f;
    } else if (s === "y") {
      if (o === "center")
        y = v((t.left + t.right) / 2);
      else if (q(o)) {
        const j = Object.keys(o)[0], J = o[j];
        y = v(this.chart.scales[j].getPixelForValue(J));
      }
      $ = y - b, D = $ - f, F = t.left, L = t.right;
    }
    const B = V(i.ticks.maxTicksLimit, u), E = Math.max(1, Math.ceil(u / B));
    for (x = 0; x < u; x += E) {
      const j = this.getContext(x), J = a.setContext(j), W = r.setContext(j), O = J.lineWidth, z = J.color, Y = W.dash || [], Q = W.dashOffset, at = J.tickWidth, ct = J.tickColor, pt = J.tickBorderDash || [], Mt = J.tickBorderDashOffset;
      M = nc(this, x, l), M !== void 0 && (S = Gt(n, M, O), c ? $ = D = F = L = S : C = P = R = N = S, p.push({
        tx1: $,
        ty1: C,
        tx2: D,
        ty2: P,
        x1: F,
        y1: R,
        x2: L,
        y2: N,
        width: O,
        color: z,
        borderDash: Y,
        borderDashOffset: Q,
        tickWidth: at,
        tickColor: ct,
        tickBorderDash: pt,
        tickBorderDashOffset: Mt
      }));
    }
    return this._ticksLength = u, this._borderValue = y, p;
  }
  _computeLabelItems(t) {
    const s = this.axis, n = this.options, { position: i, ticks: a } = n, o = this.isHorizontal(), r = this.ticks, { align: l, crossAlign: c, padding: d, mirror: u } = a, f = Me(n.grid), p = f + d, g = u ? -d : p, m = -Wt(this.labelRotation), b = [];
    let v, y, x, M, S, $, C, D, P, F, R, L, N = "middle";
    if (i === "top")
      $ = this.bottom - g, C = this._getXAxisLabelAlignment();
    else if (i === "bottom")
      $ = this.top + g, C = this._getXAxisLabelAlignment();
    else if (i === "left") {
      const E = this._getYAxisLabelAlignment(f);
      C = E.textAlign, S = E.x;
    } else if (i === "right") {
      const E = this._getYAxisLabelAlignment(f);
      C = E.textAlign, S = E.x;
    } else if (s === "x") {
      if (i === "center")
        $ = (t.top + t.bottom) / 2 + p;
      else if (q(i)) {
        const E = Object.keys(i)[0], j = i[E];
        $ = this.chart.scales[E].getPixelForValue(j) + p;
      }
      C = this._getXAxisLabelAlignment();
    } else if (s === "y") {
      if (i === "center")
        S = (t.left + t.right) / 2 - p;
      else if (q(i)) {
        const E = Object.keys(i)[0], j = i[E];
        S = this.chart.scales[E].getPixelForValue(j);
      }
      C = this._getYAxisLabelAlignment(f).textAlign;
    }
    s === "y" && (l === "start" ? N = "top" : l === "end" && (N = "bottom"));
    const B = this._getLabelSizes();
    for (v = 0, y = r.length; v < y; ++v) {
      x = r[v], M = x.label;
      const E = a.setContext(this.getContext(v));
      D = this.getPixelForTick(v) + a.labelOffset, P = this._resolveTickFontOptions(v), F = P.lineHeight, R = ut(M) ? M.length : 1;
      const j = R / 2, J = E.color, W = E.textStrokeColor, O = E.textStrokeWidth;
      let z = C;
      o ? (S = D, C === "inner" && (v === y - 1 ? z = this.options.reverse ? "left" : "right" : v === 0 ? z = this.options.reverse ? "right" : "left" : z = "center"), i === "top" ? c === "near" || m !== 0 ? L = -R * F + F / 2 : c === "center" ? L = -B.highest.height / 2 - j * F + F : L = -B.highest.height + F / 2 : c === "near" || m !== 0 ? L = F / 2 : c === "center" ? L = B.highest.height / 2 - j * F : L = B.highest.height - R * F, u && (L *= -1), m !== 0 && !E.showLabelBackdrop && (S += F / 2 * Math.sin(m))) : ($ = D, L = (1 - R) * F / 2);
      let Y;
      if (E.showLabelBackdrop) {
        const Q = Tt(E.backdropPadding), at = B.heights[v], ct = B.widths[v];
        let pt = L - Q.top, Mt = 0 - Q.left;
        switch (N) {
          case "middle":
            pt -= at / 2;
            break;
          case "bottom":
            pt -= at;
            break;
        }
        switch (C) {
          case "center":
            Mt -= ct / 2;
            break;
          case "right":
            Mt -= ct;
            break;
          case "inner":
            v === y - 1 ? Mt -= ct : v > 0 && (Mt -= ct / 2);
            break;
        }
        Y = {
          left: Mt,
          top: pt,
          width: ct + Q.width,
          height: at + Q.height,
          color: E.backdropColor
        };
      }
      b.push({
        label: M,
        font: P,
        textOffset: L,
        options: {
          rotation: m,
          color: J,
          strokeColor: W,
          strokeWidth: O,
          textAlign: z,
          textBaseline: N,
          translation: [
            S,
            $
          ],
          backdrop: Y
        }
      });
    }
    return b;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: s } = this.options;
    if (-Wt(this.labelRotation))
      return t === "top" ? "left" : "right";
    let i = "center";
    return s.align === "start" ? i = "left" : s.align === "end" ? i = "right" : s.align === "inner" && (i = "inner"), i;
  }
  _getYAxisLabelAlignment(t) {
    const { position: s, ticks: { crossAlign: n, mirror: i, padding: a } } = this.options, o = this._getLabelSizes(), r = t + a, l = o.widest.width;
    let c, d;
    return s === "left" ? i ? (d = this.right + a, n === "near" ? c = "left" : n === "center" ? (c = "center", d += l / 2) : (c = "right", d += l)) : (d = this.right - r, n === "near" ? c = "right" : n === "center" ? (c = "center", d -= l / 2) : (c = "left", d = this.left)) : s === "right" ? i ? (d = this.left + a, n === "near" ? c = "right" : n === "center" ? (c = "center", d -= l / 2) : (c = "left", d -= l)) : (d = this.left + r, n === "near" ? c = "left" : n === "center" ? (c = "center", d += l / 2) : (c = "right", d = this.right)) : c = "right", {
      textAlign: c,
      x: d
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
    const { ctx: t, options: { backgroundColor: s }, left: n, top: i, width: a, height: o } = this;
    s && (t.save(), t.fillStyle = s, t.fillRect(n, i, a, o), t.restore());
  }
  getLineWidthForValue(t) {
    const s = this.options.grid;
    if (!this._isVisible() || !s.display)
      return 0;
    const i = this.ticks.findIndex((a) => a.value === t);
    return i >= 0 ? s.setContext(this.getContext(i)).lineWidth : 0;
  }
  drawGrid(t) {
    const s = this.options.grid, n = this.ctx, i = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
    let a, o;
    const r = (l, c, d) => {
      !d.width || !d.color || (n.save(), n.lineWidth = d.width, n.strokeStyle = d.color, n.setLineDash(d.borderDash || []), n.lineDashOffset = d.borderDashOffset, n.beginPath(), n.moveTo(l.x, l.y), n.lineTo(c.x, c.y), n.stroke(), n.restore());
    };
    if (s.display)
      for (a = 0, o = i.length; a < o; ++a) {
        const l = i[a];
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
    const { chart: t, ctx: s, options: { border: n, grid: i } } = this, a = n.setContext(this.getContext()), o = n.display ? a.width : 0;
    if (!o)
      return;
    const r = i.setContext(this.getContext(0)).lineWidth, l = this._borderValue;
    let c, d, u, f;
    this.isHorizontal() ? (c = Gt(t, this.left, o) - o / 2, d = Gt(t, this.right, r) + r / 2, u = f = l) : (u = Gt(t, this.top, o) - o / 2, f = Gt(t, this.bottom, r) + r / 2, c = d = l), s.save(), s.lineWidth = a.width, s.strokeStyle = a.color, s.beginPath(), s.moveTo(c, u), s.lineTo(d, f), s.stroke(), s.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const n = this.ctx, i = this._computeLabelArea();
    i && us(n, i);
    const a = this.getLabelItems(t);
    for (const o of a) {
      const r = o.options, l = o.font, c = o.label, d = o.textOffset;
      ze(n, c, 0, d, l, r);
    }
    i && fs(n);
  }
  drawTitle() {
    const { ctx: t, options: { position: s, title: n, reverse: i } } = this;
    if (!n.display)
      return;
    const a = vt(n.font), o = Tt(n.padding), r = n.align;
    let l = a.lineHeight / 2;
    s === "bottom" || s === "center" || q(s) ? (l += o.bottom, ut(n.text) && (l += a.lineHeight * (n.text.length - 1))) : l += o.top;
    const { titleX: c, titleY: d, maxWidth: u, rotation: f } = lc(this, l, s, r);
    ze(t, n.text, 0, 0, a, {
      color: n.color,
      maxWidth: u,
      rotation: f,
      textAlign: rc(r, s, i),
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
    const t = this.options, s = t.ticks && t.ticks.z || 0, n = V(t.grid && t.grid.z, -1), i = V(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== me.prototype.draw ? [
      {
        z: s,
        draw: (a) => {
          this.draw(a);
        }
      }
    ] : [
      {
        z: n,
        draw: (a) => {
          this.drawBackground(), this.drawGrid(a), this.drawTitle();
        }
      },
      {
        z: i,
        draw: () => {
          this.drawBorder();
        }
      },
      {
        z: s,
        draw: (a) => {
          this.drawLabels(a);
        }
      }
    ];
  }
  getMatchingVisibleMetas(t) {
    const s = this.chart.getSortedVisibleDatasetMetas(), n = this.axis + "AxisID", i = [];
    let a, o;
    for (a = 0, o = s.length; a < o; ++a) {
      const r = s[a];
      r[n] === this.id && (!t || r.type === t) && i.push(r);
    }
    return i;
  }
  _resolveTickFontOptions(t) {
    const s = this.options.ticks.setContext(this.getContext(t));
    return vt(s.font);
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
    const i = this.items, a = t.id, o = this.scope + "." + a;
    if (!a)
      throw new Error("class does not have id: " + t);
    return a in i || (i[a] = t, cc(t, o, n), this.override && ht.override(t.id, t.overrides)), o;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const s = this.items, n = t.id, i = this.scope;
    n in s && delete s[n], i && n in ht[i] && (delete ht[i][n], this.override && delete ne[n]);
  }
}
function cc(e, t, s) {
  const n = Le(/* @__PURE__ */ Object.create(null), [
    s ? ht.get(s) : {},
    ht.get(t),
    e.defaults
  ]);
  ht.set(t, n), e.defaultRoutes && dc(t, e.defaultRoutes), e.descriptors && ht.describe(t, e.descriptors);
}
function dc(e, t) {
  Object.keys(t).forEach((s) => {
    const n = s.split("."), i = n.pop(), a = [
      e
    ].concat(n).join("."), o = t[s].split("."), r = o.pop(), l = o.join(".");
    ht.route(a, i, l, r);
  });
}
function hc(e) {
  return "id" in e && "defaults" in e;
}
class uc {
  constructor() {
    this.controllers = new Qe(ps, "datasets", !0), this.elements = new Qe(Nt, "elements"), this.plugins = new Qe(Object, "plugins"), this.scales = new Qe(me, "scales"), this._typedRegistries = [
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
    ].forEach((i) => {
      const a = n || this._getRegistryForType(i);
      n || a.isForType(i) || a === this.plugins && i.id ? this._exec(t, a, i) : tt(i, (o) => {
        const r = n || this._getRegistryForType(o);
        this._exec(t, r, o);
      });
    });
  }
  _exec(t, s, n) {
    const i = Qs(t);
    ot(n["before" + i], [], n), s[t](n), ot(n["after" + i], [], n);
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
    const i = s.get(t);
    if (i === void 0)
      throw new Error('"' + t + '" is not a registered ' + n + ".");
    return i;
  }
}
var Lt = /* @__PURE__ */ new uc();
class fc {
  constructor() {
    this._init = void 0;
  }
  notify(t, s, n, i) {
    if (s === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install")), this._init === void 0)
      return;
    const a = i ? this._descriptors(t).filter(i) : this._descriptors(t), o = this._notify(a, t, s, n);
    return s === "afterDestroy" && (this._notify(a, t, "stop"), this._notify(this._init, t, "uninstall"), this._init = void 0), o;
  }
  _notify(t, s, n, i) {
    i = i || {};
    for (const a of t) {
      const o = a.plugin, r = o[n], l = [
        s,
        i,
        a.options
      ];
      if (ot(r, l, o) === !1 && i.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    Z(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const s = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), s;
  }
  _createDescriptors(t, s) {
    const n = t && t.config, i = V(n.options && n.options.plugins, {}), a = gc(n);
    return i === !1 && !s ? [] : mc(t, a, i, s);
  }
  _notifyStateChanges(t) {
    const s = this._oldCache || [], n = this._cache, i = (a, o) => a.filter((r) => !o.some((l) => r.plugin.id === l.plugin.id));
    this._notify(i(s, n), t, "stop"), this._notify(i(n, s), t, "start");
  }
}
function gc(e) {
  const t = {}, s = [], n = Object.keys(Lt.plugins.items);
  for (let a = 0; a < n.length; a++)
    s.push(Lt.getPlugin(n[a]));
  const i = e.plugins || [];
  for (let a = 0; a < i.length; a++) {
    const o = i[a];
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
function mc(e, { plugins: t, localIds: s }, n, i) {
  const a = [], o = e.getContext();
  for (const r of t) {
    const l = r.id, c = pc(n[l], i);
    c !== null && a.push({
      plugin: r,
      options: bc(e.config, {
        plugin: r,
        local: s[l]
      }, c, o)
    });
  }
  return a;
}
function bc(e, { plugin: t, local: s }, n, i) {
  const a = e.pluginScopeKeys(t), o = e.getOptionScopes(n, a);
  return s && t.defaults && o.push(t.defaults), e.createResolver(o, i, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Vs(e, t) {
  const s = ht.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || s.indexAxis || "x";
}
function vc(e, t) {
  let s = e;
  return e === "_index_" ? s = t : e === "_value_" && (s = t === "x" ? "y" : "x"), s;
}
function yc(e, t) {
  return e === t ? "_index_" : "_value_";
}
function oi(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function _c(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function js(e, ...t) {
  if (oi(e))
    return e;
  for (const s of t) {
    const n = s.axis || _c(s.position) || e.length > 1 && oi(e[0].toLowerCase());
    if (n)
      return n;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function ri(e, t, s) {
  if (s[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function xc(e, t) {
  if (t.data && t.data.datasets) {
    const s = t.data.datasets.filter((n) => n.xAxisID === e || n.yAxisID === e);
    if (s.length)
      return ri(e, "x", s[0]) || ri(e, "y", s[0]);
  }
  return {};
}
function kc(e, t) {
  const s = ne[e.type] || {
    scales: {}
  }, n = t.scales || {}, i = Vs(e.type, t), a = /* @__PURE__ */ Object.create(null);
  return Object.keys(n).forEach((o) => {
    const r = n[o];
    if (!q(r))
      return console.error(`Invalid scale configuration for scale: ${o}`);
    if (r._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${o}`);
    const l = js(o, r, xc(o, e), ht.scales[r.type]), c = yc(l, i), d = s.scales || {};
    a[o] = Ae(/* @__PURE__ */ Object.create(null), [
      {
        axis: l
      },
      r,
      d[l],
      d[c]
    ]);
  }), e.data.datasets.forEach((o) => {
    const r = o.type || e.type, l = o.indexAxis || Vs(r, t), d = (ne[r] || {}).scales || {};
    Object.keys(d).forEach((u) => {
      const f = vc(u, l), p = o[f + "AxisID"] || f;
      a[p] = a[p] || /* @__PURE__ */ Object.create(null), Ae(a[p], [
        {
          axis: f
        },
        n[p],
        d[u]
      ]);
    });
  }), Object.keys(a).forEach((o) => {
    const r = a[o];
    Ae(r, [
      ht.scales[r.type],
      ht.scale
    ]);
  }), a;
}
function Ca(e) {
  const t = e.options || (e.options = {});
  t.plugins = V(t.plugins, {}), t.scales = kc(e, t);
}
function $a(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function Mc(e) {
  return e = e || {}, e.data = $a(e.data), Ca(e), e;
}
const li = /* @__PURE__ */ new Map(), Da = /* @__PURE__ */ new Set();
function Ze(e, t) {
  let s = li.get(e);
  return s || (s = t(), li.set(e, s), Da.add(s)), s;
}
const Se = (e, t, s) => {
  const n = se(t, s);
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
    this._config.data = $a(t);
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
    this.clearCache(), Ca(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return Ze(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, s) {
    return Ze(`${t}.transition.${s}`, () => [
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
    return Ze(`${t}-${s}`, () => [
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
    return Ze(`${n}-plugin-${s}`, () => [
      [
        `plugins.${s}`,
        ...t.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(t, s) {
    const n = this._scopeCache;
    let i = n.get(t);
    return (!i || s) && (i = /* @__PURE__ */ new Map(), n.set(t, i)), i;
  }
  getOptionScopes(t, s, n) {
    const { options: i, type: a } = this, o = this._cachedScopes(t, n), r = o.get(s);
    if (r)
      return r;
    const l = /* @__PURE__ */ new Set();
    s.forEach((d) => {
      t && (l.add(t), d.forEach((u) => Se(l, t, u))), d.forEach((u) => Se(l, i, u)), d.forEach((u) => Se(l, ne[a] || {}, u)), d.forEach((u) => Se(l, ht, u)), d.forEach((u) => Se(l, Hs, u));
    });
    const c = Array.from(l);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), Da.has(s) && o.set(s, c), c;
  }
  chartOptionScopes() {
    const { options: t, type: s } = this;
    return [
      t,
      ne[s] || {},
      ht.datasets[s] || {},
      {
        type: s
      },
      ht,
      Hs
    ];
  }
  resolveNamedOptions(t, s, n, i = [
    ""
  ]) {
    const a = {
      $shared: !0
    }, { resolver: o, subPrefixes: r } = ci(this._resolverCache, t, i);
    let l = o;
    if (Cc(o, s)) {
      a.$shared = !1, n = qt(n) ? n() : n;
      const c = this.createResolver(t, n, r);
      l = fe(o, n, c);
    }
    for (const c of s)
      a[c] = l[c];
    return a;
  }
  createResolver(t, s, n = [
    ""
  ], i) {
    const { resolver: a } = ci(this._resolverCache, t, n);
    return q(s) ? fe(a, s, void 0, i) : a;
  }
}
function ci(e, t, s) {
  let n = e.get(t);
  n || (n = /* @__PURE__ */ new Map(), e.set(t, n));
  const i = s.join();
  let a = n.get(i);
  return a || (a = {
    resolver: nn(t, s),
    subPrefixes: s.filter((r) => !r.toLowerCase().includes("hover"))
  }, n.set(i, a)), a;
}
const wc = (e) => q(e) && Object.getOwnPropertyNames(e).some((t) => qt(e[t]));
function Cc(e, t) {
  const { isScriptable: s, isIndexable: n } = ra(e);
  for (const i of t) {
    const a = s(i), o = n(i), r = (o || a) && e[i];
    if (a && (qt(r) || wc(r)) || o && ut(r))
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
function di(e, t) {
  return e === "top" || e === "bottom" || Dc.indexOf(e) === -1 && t === "x";
}
function hi(e, t) {
  return function(s, n) {
    return s[e] === n[e] ? s[t] - n[t] : s[e] - n[e];
  };
}
function ui(e) {
  const t = e.chart, s = t.options.animation;
  t.notifyPlugins("afterRender"), ot(s && s.onComplete, [
    e
  ], t);
}
function Ac(e) {
  const t = e.chart, s = t.options.animation;
  ot(s && s.onProgress, [
    e
  ], t);
}
function Aa(e) {
  return rn() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const ss = {}, fi = (e) => {
  const t = Aa(e);
  return Object.values(ss).filter((s) => s.canvas === t).pop();
};
function Tc(e, t, s) {
  const n = Object.keys(e);
  for (const i of n) {
    const a = +i;
    if (a >= t) {
      const o = e[i];
      delete e[i], (s > 0 || a > t) && (e[a + s] = o);
    }
  }
}
function Fc(e, t, s, n) {
  return !s || e.type === "mouseout" ? null : n ? t : e;
}
let be = class {
  static defaults = ht;
  static instances = ss;
  static overrides = ne;
  static registry = Lt;
  static version = $c;
  static getChart = fi;
  static register(...t) {
    Lt.add(...t), gi();
  }
  static unregister(...t) {
    Lt.remove(...t), gi();
  }
  constructor(t, s) {
    const n = this.config = new Sc(s), i = Aa(t), a = fi(i);
    if (a)
      throw new Error("Canvas is already in use. Chart with ID '" + a.id + "' must be destroyed before the canvas with ID '" + a.canvas.id + "' can be reused.");
    const o = n.createResolver(n.chartOptionScopes(), this.getContext());
    this.platform = new (n.platform || Kl(i))(), this.platform.updateConfig(n);
    const r = this.platform.acquireContext(i, o.aspectRatio), l = r && r.canvas, c = l && l.height, d = l && l.width;
    if (this.id = wo(), this.ctx = r, this.canvas = l, this.width = d, this.height = c, this._options = o, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new fc(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = jo((u) => this.update(u), o.resizeDelay || 0), this._dataChanges = [], ss[this.id] = this, !r || !l) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    Rt.listen(this, "complete", ui), Rt.listen(this, "progress", Ac), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: s }, width: n, height: i, _aspectRatio: a } = this;
    return Z(t) ? s && a ? a : i ? n / i : null : t;
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
    return Lt;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : En(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Bn(this.canvas, this.ctx), this;
  }
  stop() {
    return Rt.stop(this), this;
  }
  resize(t, s) {
    Rt.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: s
    } : this._resize(t, s);
  }
  _resize(t, s) {
    const n = this.options, i = this.canvas, a = n.maintainAspectRatio && this.aspectRatio, o = this.platform.getMaximumSize(i, t, s, a), r = n.devicePixelRatio || this.platform.getDevicePixelRatio(), l = this.width ? "resize" : "attach";
    this.width = o.width, this.height = o.height, this._aspectRatio = this.aspectRatio, En(this, r, !0) && (this.notifyPlugins("resize", {
      size: o
    }), ot(n.onResize, [
      this,
      o
    ], this), this.attached && this._doResize(l) && this.render());
  }
  ensureScalesHaveIDs() {
    const s = this.options.scales || {};
    tt(s, (n, i) => {
      n.id = i;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, s = t.scales, n = this.scales, i = Object.keys(n).reduce((o, r) => (o[r] = !1, o), {});
    let a = [];
    s && (a = a.concat(Object.keys(s).map((o) => {
      const r = s[o], l = js(o, r), c = l === "r", d = l === "x";
      return {
        options: r,
        dposition: c ? "chartArea" : d ? "bottom" : "left",
        dtype: c ? "radialLinear" : d ? "category" : "linear"
      };
    }))), tt(a, (o) => {
      const r = o.options, l = r.id, c = js(l, r), d = V(r.type, o.dtype);
      (r.position === void 0 || di(r.position, c) !== di(o.dposition)) && (r.position = o.dposition), i[l] = !0;
      let u = null;
      if (l in n && n[l].type === d)
        u = n[l];
      else {
        const f = Lt.getScale(d);
        u = new f({
          id: l,
          type: d,
          ctx: this.ctx,
          chart: this
        }), n[u.id] = u;
      }
      u.init(r, t);
    }), tt(i, (o, r) => {
      o || delete n[r];
    }), tt(n, (o) => {
      At.configure(this, o, o.options), At.addBox(this, o);
    });
  }
  _updateMetasets() {
    const t = this._metasets, s = this.data.datasets.length, n = t.length;
    if (t.sort((i, a) => i.index - a.index), n > s) {
      for (let i = s; i < n; ++i)
        this._destroyDatasetMeta(i);
      t.splice(s, n - s);
    }
    this._sortedMetasets = t.slice(0).sort(hi("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: t, data: { datasets: s } } = this;
    t.length > s.length && delete this._stacks, t.forEach((n, i) => {
      s.filter((a) => a === n._dataset).length === 0 && this._destroyDatasetMeta(i);
    });
  }
  buildOrUpdateControllers() {
    const t = [], s = this.data.datasets;
    let n, i;
    for (this._removeUnreferencedMetasets(), n = 0, i = s.length; n < i; n++) {
      const a = s[n];
      let o = this.getDatasetMeta(n);
      const r = a.type || this.config.type;
      if (o.type && o.type !== r && (this._destroyDatasetMeta(n), o = this.getDatasetMeta(n)), o.type = r, o.indexAxis = a.indexAxis || Vs(r, this.options), o.order = a.order || 0, o.index = n, o.label = "" + a.label, o.visible = this.isDatasetVisible(n), o.controller)
        o.controller.updateIndex(n), o.controller.linkScales();
      else {
        const l = Lt.getController(r), { datasetElementType: c, dataElementType: d } = ht.datasets[r];
        Object.assign(l, {
          dataElementType: Lt.getElement(d),
          datasetElementType: c && Lt.getElement(c)
        }), o.controller = new l(this, n), t.push(o.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    tt(this.data.datasets, (t, s) => {
      this.getDatasetMeta(s).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(t) {
    const s = this.config;
    s.update();
    const n = this._options = s.createResolver(s.chartOptionScopes(), this.getContext()), i = this._animationsDisabled = !n.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
      mode: t,
      cancelable: !0
    }) === !1)
      return;
    const a = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let o = 0;
    for (let c = 0, d = this.data.datasets.length; c < d; c++) {
      const { controller: u } = this.getDatasetMeta(c), f = !i && a.indexOf(u) === -1;
      u.buildOrUpdateElements(f), o = Math.max(+u.getMaxOverflow(), o);
    }
    o = this._minPadding = n.layout.autoPadding ? o : 0, this._updateLayout(o), i || tt(a, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(hi("z", "_idx"));
    const { _active: r, _lastEvent: l } = this;
    l ? this._eventHandler(l, !0) : r.length && this._updateHoverStyles(r, r, !0), this.render();
  }
  _updateScales() {
    tt(this.scales, (t) => {
      At.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, s = new Set(Object.keys(this._listeners)), n = new Set(t.events);
    (!Mn(s, n) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, s = this._getUniformDataChanges() || [];
    for (const { method: n, start: i, count: a } of s) {
      const o = n === "_removeElements" ? -a : a;
      Tc(t, i, o);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const s = this.data.datasets.length, n = (a) => new Set(t.filter((o) => o[0] === a).map((o, r) => r + "," + o.splice(1).join(","))), i = n(0);
    for (let a = 1; a < s; a++)
      if (!Mn(i, n(a)))
        return;
    return Array.from(i).map((a) => a.split(",")).map((a) => ({
      method: a[1],
      start: +a[2],
      count: +a[3]
    }));
  }
  _updateLayout(t) {
    if (this.notifyPlugins("beforeLayout", {
      cancelable: !0
    }) === !1)
      return;
    At.update(this, this.width, this.height, t);
    const s = this.chartArea, n = s.width <= 0 || s.height <= 0;
    this._layers = [], tt(this.boxes, (i) => {
      n && i.position === "chartArea" || (i.configure && i.configure(), this._layers.push(...i._layers()));
    }, this), this._layers.forEach((i, a) => {
      i._idx = a;
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
        this._updateDataset(s, qt(t) ? t({
          datasetIndex: s
        }) : t);
      this.notifyPlugins("afterDatasetsUpdate", {
        mode: t
      });
    }
  }
  _updateDataset(t, s) {
    const n = this.getDatasetMeta(t), i = {
      meta: n,
      index: t,
      mode: s,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetUpdate", i) !== !1 && (n.controller._update(s), i.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", i));
  }
  render() {
    this.notifyPlugins("beforeRender", {
      cancelable: !0
    }) !== !1 && (Rt.has(this) ? this.attached && !Rt.running(this) && Rt.start(this) : (this.draw(), ui({
      chart: this
    })));
  }
  draw() {
    let t;
    if (this._resizeBeforeDraw) {
      const { width: n, height: i } = this._resizeBeforeDraw;
      this._resizeBeforeDraw = null, this._resize(n, i);
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
    let i, a;
    for (i = 0, a = s.length; i < a; ++i) {
      const o = s[i];
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
    }, i = ba(this, t);
    this.notifyPlugins("beforeDatasetDraw", n) !== !1 && (i && us(s, i), t.controller.draw(), i && fs(s), n.cancelable = !1, this.notifyPlugins("afterDatasetDraw", n));
  }
  isPointInArea(t) {
    return Ie(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, s, n, i) {
    const a = Dl.modes[s];
    return typeof a == "function" ? a(this, t, n, i) : [];
  }
  getDatasetMeta(t) {
    const s = this.data.datasets[t], n = this._metasets;
    let i = n.filter((a) => a && a._dataset === s).pop();
    return i || (i = {
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
    }, n.push(i)), i;
  }
  getContext() {
    return this.$context || (this.$context = ie(null, {
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
    const i = n ? "show" : "hide", a = this.getDatasetMeta(t), o = a.controller._resolveAnimations(void 0, i);
    Oe(s) ? (a.data[s].hidden = !n, this.update()) : (this.setDatasetVisibility(t, n), o.update(a, {
      visible: n
    }), this.update((r) => r.datasetIndex === t ? i : void 0));
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
    for (this.stop(), Rt.remove(this), t = 0, s = this.data.datasets.length; t < s; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: s } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), Bn(t, s), this.platform.releaseContext(s), this.canvas = null, this.ctx = null), delete ss[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const t = this._listeners, s = this.platform, n = (a, o) => {
      s.addEventListener(this, a, o), t[a] = o;
    }, i = (a, o, r) => {
      a.offsetX = o, a.offsetY = r, this._eventHandler(a);
    };
    tt(this.options.events, (a) => n(a, i));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, s = this.platform, n = (l, c) => {
      s.addEventListener(this, l, c), t[l] = c;
    }, i = (l, c) => {
      t[l] && (s.removeEventListener(this, l, c), delete t[l]);
    }, a = (l, c) => {
      this.canvas && this.resize(l, c);
    };
    let o;
    const r = () => {
      i("attach", r), this.attached = !0, this.resize(), n("resize", a), n("detach", o);
    };
    o = () => {
      this.attached = !1, i("resize", a), this._stop(), this._resize(0, 0), n("attach", r);
    }, s.isAttached(this.canvas) ? r() : o();
  }
  unbindEvents() {
    tt(this._listeners, (t, s) => {
      this.platform.removeEventListener(this, s, t);
    }), this._listeners = {}, tt(this._responsiveListeners, (t, s) => {
      this.platform.removeEventListener(this, s, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, s, n) {
    const i = n ? "set" : "remove";
    let a, o, r, l;
    for (s === "dataset" && (a = this.getDatasetMeta(t[0].datasetIndex), a.controller["_" + i + "DatasetHoverStyle"]()), r = 0, l = t.length; r < l; ++r) {
      o = t[r];
      const c = o && this.getDatasetMeta(o.datasetIndex).controller;
      c && c[i + "HoverStyle"](o.element, o.datasetIndex, o.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const s = this._active || [], n = t.map(({ datasetIndex: a, index: o }) => {
      const r = this.getDatasetMeta(a);
      if (!r)
        throw new Error("No dataset found at index " + a);
      return {
        datasetIndex: a,
        element: r.data[o],
        index: o
      };
    });
    !as(n, s) && (this._active = n, this._lastEvent = null, this._updateHoverStyles(n, s));
  }
  notifyPlugins(t, s, n) {
    return this._plugins.notify(this, t, s, n);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((s) => s.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, s, n) {
    const i = this.options.hover, a = (l, c) => l.filter((d) => !c.some((u) => d.datasetIndex === u.datasetIndex && d.index === u.index)), o = a(s, t), r = n ? t : a(t, s);
    o.length && this.updateHoverStyle(o, i.mode, !1), r.length && i.mode && this.updateHoverStyle(r, i.mode, !0);
  }
  _eventHandler(t, s) {
    const n = {
      event: t,
      replay: s,
      cancelable: !0,
      inChartArea: this.isPointInArea(t)
    }, i = (o) => (o.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", n, i) === !1)
      return;
    const a = this._handleEvent(t, s, n.inChartArea);
    return n.cancelable = !1, this.notifyPlugins("afterEvent", n, i), (a || n.changed) && this.render(), this;
  }
  _handleEvent(t, s, n) {
    const { _active: i = [], options: a } = this, o = s, r = this._getActiveElements(t, i, n, o), l = Fo(t), c = Fc(t, this._lastEvent, n, l);
    n && (this._lastEvent = null, ot(a.onHover, [
      t,
      r,
      this
    ], this), l && ot(a.onClick, [
      t,
      r,
      this
    ], this));
    const d = !as(r, i);
    return (d || s) && (this._active = r, this._updateHoverStyles(r, i, s)), this._lastEvent = c, d;
  }
  _getActiveElements(t, s, n, i) {
    if (t.type === "mouseout")
      return [];
    if (!n)
      return s;
    const a = this.options.hover;
    return this.getElementsAtEventForMode(t, a.mode, a, i);
  }
};
function gi() {
  return tt(be.instances, (e) => e._plugins.invalidate());
}
function Pc(e, t, s) {
  const { startAngle: n, x: i, y: a, outerRadius: o, innerRadius: r, options: l } = t, { borderWidth: c, borderJoinStyle: d } = l, u = Math.min(c / o, St(n - s));
  if (e.beginPath(), e.arc(i, a, o - c / 2, n + u / 2, s - u / 2), r > 0) {
    const f = Math.min(c / r, St(n - s));
    e.arc(i, a, r + c / 2, s - f / 2, n + f / 2, !0);
  } else {
    const f = Math.min(c / 2, o * St(n - s));
    if (d === "round")
      e.arc(i, a, f, s - et / 2, n + et / 2, !0);
    else if (d === "bevel") {
      const p = 2 * f * f, g = -p * Math.cos(s + et / 2) + i, m = -p * Math.sin(s + et / 2) + a, b = p * Math.cos(n + et / 2) + i, v = p * Math.sin(n + et / 2) + a;
      e.lineTo(g, m), e.lineTo(b, v);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function Bc(e, t, s) {
  const { startAngle: n, pixelMargin: i, x: a, y: o, outerRadius: r, innerRadius: l } = t;
  let c = i / r;
  e.beginPath(), e.arc(a, o, r, n - c, s + c), l > i ? (c = i / l, e.arc(a, o, l, s + c, n - c, !0)) : e.arc(a, o, i, s + ft, n - ft), e.closePath(), e.clip();
}
function Lc(e) {
  return sn(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function Oc(e, t, s, n) {
  const i = Lc(e.options.borderRadius), a = (s - t) / 2, o = Math.min(a, n * t / 2), r = (l) => {
    const c = (s - Math.min(a, l)) * n / 2;
    return bt(l, 0, Math.min(a, c));
  };
  return {
    outerStart: r(i.outerStart),
    outerEnd: r(i.outerEnd),
    innerStart: bt(i.innerStart, 0, o),
    innerEnd: bt(i.innerEnd, 0, o)
  };
}
function le(e, t, s, n) {
  return {
    x: s + e * Math.cos(t),
    y: n + e * Math.sin(t)
  };
}
function hs(e, t, s, n, i, a) {
  const { x: o, y: r, startAngle: l, pixelMargin: c, innerRadius: d } = t, u = Math.max(t.outerRadius + n + s - c, 0), f = d > 0 ? d + n + s + c : 0;
  let p = 0;
  const g = i - l;
  if (n) {
    const E = d > 0 ? d - n : 0, j = u > 0 ? u - n : 0, J = (E + j) / 2, W = J !== 0 ? g * J / (J + n) : g;
    p = (g - W) / 2;
  }
  const m = Math.max(1e-3, g * u - s / et) / u, b = (g - m) / 2, v = l + b + p, y = i - b - p, { outerStart: x, outerEnd: M, innerStart: S, innerEnd: $ } = Oc(t, f, u, y - v), C = u - x, D = u - M, P = v + x / C, F = y - M / D, R = f + S, L = f + $, N = v + S / R, B = y - $ / L;
  if (e.beginPath(), a) {
    const E = (P + F) / 2;
    if (e.arc(o, r, u, P, E), e.arc(o, r, u, E, F), M > 0) {
      const O = le(D, F, o, r);
      e.arc(O.x, O.y, M, F, y + ft);
    }
    const j = le(L, y, o, r);
    if (e.lineTo(j.x, j.y), $ > 0) {
      const O = le(L, B, o, r);
      e.arc(O.x, O.y, $, y + ft, B + Math.PI);
    }
    const J = (y - $ / f + (v + S / f)) / 2;
    if (e.arc(o, r, f, y - $ / f, J, !0), e.arc(o, r, f, J, v + S / f, !0), S > 0) {
      const O = le(R, N, o, r);
      e.arc(O.x, O.y, S, N + Math.PI, v - ft);
    }
    const W = le(C, v, o, r);
    if (e.lineTo(W.x, W.y), x > 0) {
      const O = le(C, P, o, r);
      e.arc(O.x, O.y, x, v - ft, P);
    }
  } else {
    e.moveTo(o, r);
    const E = Math.cos(P) * u + o, j = Math.sin(P) * u + r;
    e.lineTo(E, j);
    const J = Math.cos(F) * u + o, W = Math.sin(F) * u + r;
    e.lineTo(J, W);
  }
  e.closePath();
}
function Ec(e, t, s, n, i) {
  const { fullCircles: a, startAngle: o, circumference: r } = t;
  let l = t.endAngle;
  if (a) {
    hs(e, t, s, n, l, i);
    for (let c = 0; c < a; ++c)
      e.fill();
    isNaN(r) || (l = o + (r % dt || dt));
  }
  return hs(e, t, s, n, l, i), e.fill(), l;
}
function Rc(e, t, s, n, i) {
  const { fullCircles: a, startAngle: o, circumference: r, options: l } = t, { borderWidth: c, borderJoinStyle: d, borderDash: u, borderDashOffset: f, borderRadius: p } = l, g = l.borderAlign === "inner";
  if (!c)
    return;
  e.setLineDash(u || []), e.lineDashOffset = f, g ? (e.lineWidth = c * 2, e.lineJoin = d || "round") : (e.lineWidth = c, e.lineJoin = d || "bevel");
  let m = t.endAngle;
  if (a) {
    hs(e, t, s, n, m, i);
    for (let b = 0; b < a; ++b)
      e.stroke();
    isNaN(r) || (m = o + (r % dt || dt));
  }
  g && Bc(e, t, m), l.selfJoin && m - o >= et && p === 0 && d !== "miter" && Pc(e, t, m), a || (hs(e, t, s, n, m, i), e.stroke());
}
class Ic extends Nt {
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
    const i = this.getProps([
      "x",
      "y"
    ], n), { angle: a, distance: o } = Ji(i, {
      x: t,
      y: s
    }), { startAngle: r, endAngle: l, innerRadius: c, outerRadius: d, circumference: u } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], n), f = (this.options.spacing + this.options.borderWidth) / 2, p = V(u, l - r), g = Re(a, r, l) && r !== l, m = p >= dt || g, b = Ht(o, c + f, d + f);
    return m && b;
  }
  getCenterPoint(t) {
    const { x: s, y: n, startAngle: i, endAngle: a, innerRadius: o, outerRadius: r } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], t), { offset: l, spacing: c } = this.options, d = (i + a) / 2, u = (o + r + c + l) / 2;
    return {
      x: s + Math.cos(d) * u,
      y: n + Math.sin(d) * u
    };
  }
  tooltipPosition(t) {
    return this.getCenterPoint(t);
  }
  draw(t) {
    const { options: s, circumference: n } = this, i = (s.offset || 0) / 4, a = (s.spacing || 0) / 2, o = s.circular;
    if (this.pixelMargin = s.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = n > dt ? Math.floor(n / dt) : 0, n === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const r = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(r) * i, Math.sin(r) * i);
    const l = 1 - Math.sin(Math.min(et, n || 0)), c = i * l;
    t.fillStyle = s.backgroundColor, t.strokeStyle = s.borderColor, Ec(t, this, c, a, o), Rc(t, this, c, a, o), t.restore();
  }
}
function Ta(e, t, s = t) {
  e.lineCap = V(s.borderCapStyle, t.borderCapStyle), e.setLineDash(V(s.borderDash, t.borderDash)), e.lineDashOffset = V(s.borderDashOffset, t.borderDashOffset), e.lineJoin = V(s.borderJoinStyle, t.borderJoinStyle), e.lineWidth = V(s.borderWidth, t.borderWidth), e.strokeStyle = V(s.borderColor, t.borderColor);
}
function zc(e, t, s) {
  e.lineTo(s.x, s.y);
}
function Wc(e) {
  return e.stepped ? ir : e.tension || e.cubicInterpolationMode === "monotone" ? ar : zc;
}
function Fa(e, t, s = {}) {
  const n = e.length, { start: i = 0, end: a = n - 1 } = s, { start: o, end: r } = t, l = Math.max(i, o), c = Math.min(a, r), d = i < o && a < o || i > r && a > r;
  return {
    count: n,
    start: l,
    loop: t.loop,
    ilen: c < l && !d ? n + c - l : c - l
  };
}
function Hc(e, t, s, n) {
  const { points: i, options: a } = t, { count: o, start: r, loop: l, ilen: c } = Fa(i, s, n), d = Wc(a);
  let { move: u = !0, reverse: f } = n || {}, p, g, m;
  for (p = 0; p <= c; ++p)
    g = i[(r + (f ? c - p : p)) % o], !g.skip && (u ? (e.moveTo(g.x, g.y), u = !1) : d(e, m, g, f, a.stepped), m = g);
  return l && (g = i[(r + (f ? c : 0)) % o], d(e, m, g, f, a.stepped)), !!l;
}
function Nc(e, t, s, n) {
  const i = t.points, { count: a, start: o, ilen: r } = Fa(i, s, n), { move: l = !0, reverse: c } = n || {};
  let d = 0, u = 0, f, p, g, m, b, v;
  const y = (M) => (o + (c ? r - M : M)) % a, x = () => {
    m !== b && (e.lineTo(d, b), e.lineTo(d, m), e.lineTo(d, v));
  };
  for (l && (p = i[y(0)], e.moveTo(p.x, p.y)), f = 0; f <= r; ++f) {
    if (p = i[y(f)], p.skip)
      continue;
    const M = p.x, S = p.y, $ = M | 0;
    $ === g ? (S < m ? m = S : S > b && (b = S), d = (u * d + M) / ++u) : (x(), e.lineTo(M, S), g = $, u = 0, m = b = S), v = S;
  }
  x();
}
function Ys(e) {
  const t = e.options, s = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !s ? Nc : Hc;
}
function Vc(e) {
  return e.stepped ? Rr : e.tension || e.cubicInterpolationMode === "monotone" ? Ir : Jt;
}
function jc(e, t, s, n) {
  let i = t._path;
  i || (i = t._path = new Path2D(), t.path(i, s, n) && i.closePath()), Ta(e, t.options), e.stroke(i);
}
function Yc(e, t, s, n) {
  const { segments: i, options: a } = t, o = Ys(t);
  for (const r of i)
    Ta(e, a, r.style), e.beginPath(), o(e, t, r, {
      start: s,
      end: s + n - 1
    }) && e.closePath(), e.stroke();
}
const Uc = typeof Path2D == "function";
function qc(e, t, s, n) {
  Uc && !t.options.segment ? jc(e, t, s, n) : Yc(e, t, s, n);
}
class bs extends Nt {
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
      const i = n.spanGaps ? this._loop : this._fullLoop;
      Ar(this._points, n, t, i, s), this._pointsUpdated = !0;
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
    const n = this.options, i = t[s], a = this.points, o = ma(this, {
      property: s,
      start: i,
      end: i
    });
    if (!o.length)
      return;
    const r = [], l = Vc(n);
    let c, d;
    for (c = 0, d = o.length; c < d; ++c) {
      const { start: u, end: f } = o[c], p = a[u], g = a[f];
      if (p === g) {
        r.push(p);
        continue;
      }
      const m = Math.abs((i - p[s]) / (g[s] - p[s])), b = l(p, g, m, n.stepped);
      b[s] = t[s], r.push(b);
    }
    return r.length === 1 ? r[0] : r;
  }
  pathSegment(t, s, n) {
    return Ys(this)(t, this, s, n);
  }
  path(t, s, n) {
    const i = this.segments, a = Ys(this);
    let o = this._loop;
    s = s || 0, n = n || this.points.length - s;
    for (const r of i)
      o &= a(t, this, r, {
        start: s,
        end: s + n - 1
      });
    return !!o;
  }
  draw(t, s, n, i) {
    const a = this.options || {};
    (this.points || []).length && a.borderWidth && (t.save(), qc(t, this, n, i), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function pi(e, t, s, n) {
  const i = e.options, { [s]: a } = e.getProps([
    s
  ], n);
  return Math.abs(t - a) < i.radius + i.hitRadius;
}
class Xc extends Nt {
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
    const i = this.options, { x: a, y: o } = this.getProps([
      "x",
      "y"
    ], n);
    return Math.pow(t - a, 2) + Math.pow(s - o, 2) < Math.pow(i.hitRadius + i.radius, 2);
  }
  inXRange(t, s) {
    return pi(this, t, "x", s);
  }
  inYRange(t, s) {
    return pi(this, t, "y", s);
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
    this.skip || n.radius < 0.1 || !Ie(this, s, this.size(n) / 2) || (t.strokeStyle = n.borderColor, t.lineWidth = n.borderWidth, t.fillStyle = n.backgroundColor, Ns(t, n, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function Pa(e, t) {
  const { x: s, y: n, base: i, width: a, height: o } = e.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let r, l, c, d, u;
  return e.horizontal ? (u = o / 2, r = Math.min(s, i), l = Math.max(s, i), c = n - u, d = n + u) : (u = a / 2, r = s - u, l = s + u, c = Math.min(n, i), d = Math.max(n, i)), {
    left: r,
    top: c,
    right: l,
    bottom: d
  };
}
function Yt(e, t, s, n) {
  return e ? 0 : bt(t, s, n);
}
function Kc(e, t, s) {
  const n = e.options.borderWidth, i = e.borderSkipped, a = oa(n);
  return {
    t: Yt(i.top, a.top, 0, s),
    r: Yt(i.right, a.right, 0, t),
    b: Yt(i.bottom, a.bottom, 0, s),
    l: Yt(i.left, a.left, 0, t)
  };
}
function Gc(e, t, s) {
  const { enableBorderRadius: n } = e.getProps([
    "enableBorderRadius"
  ]), i = e.options.borderRadius, a = de(i), o = Math.min(t, s), r = e.borderSkipped, l = n || q(i);
  return {
    topLeft: Yt(!l || r.top || r.left, a.topLeft, 0, o),
    topRight: Yt(!l || r.top || r.right, a.topRight, 0, o),
    bottomLeft: Yt(!l || r.bottom || r.left, a.bottomLeft, 0, o),
    bottomRight: Yt(!l || r.bottom || r.right, a.bottomRight, 0, o)
  };
}
function Qc(e) {
  const t = Pa(e), s = t.right - t.left, n = t.bottom - t.top, i = Kc(e, s / 2, n / 2), a = Gc(e, s / 2, n / 2);
  return {
    outer: {
      x: t.left,
      y: t.top,
      w: s,
      h: n,
      radius: a
    },
    inner: {
      x: t.left + i.l,
      y: t.top + i.t,
      w: s - i.l - i.r,
      h: n - i.t - i.b,
      radius: {
        topLeft: Math.max(0, a.topLeft - Math.max(i.t, i.l)),
        topRight: Math.max(0, a.topRight - Math.max(i.t, i.r)),
        bottomLeft: Math.max(0, a.bottomLeft - Math.max(i.b, i.l)),
        bottomRight: Math.max(0, a.bottomRight - Math.max(i.b, i.r))
      }
    }
  };
}
function Bs(e, t, s, n) {
  const i = t === null, a = s === null, r = e && !(i && a) && Pa(e, n);
  return r && (i || Ht(t, r.left, r.right)) && (a || Ht(s, r.top, r.bottom));
}
function Zc(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function Jc(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function Ls(e, t, s = {}) {
  const n = e.x !== s.x ? -t : 0, i = e.y !== s.y ? -t : 0, a = (e.x + e.w !== s.x + s.w ? t : 0) - n, o = (e.y + e.h !== s.y + s.h ? t : 0) - i;
  return {
    x: e.x + n,
    y: e.y + i,
    w: e.w + a,
    h: e.h + o,
    radius: e.radius
  };
}
class td extends Nt {
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
    const { inflateAmount: s, options: { borderColor: n, backgroundColor: i } } = this, { inner: a, outer: o } = Qc(this), r = Zc(o.radius) ? ls : Jc;
    t.save(), (o.w !== a.w || o.h !== a.h) && (t.beginPath(), r(t, Ls(o, s, a)), t.clip(), r(t, Ls(a, -s, o)), t.fillStyle = n, t.fill("evenodd")), t.beginPath(), r(t, Ls(a, s)), t.fillStyle = i, t.fill(), t.restore();
  }
  inRange(t, s, n) {
    return Bs(this, t, s, n);
  }
  inXRange(t, s) {
    return Bs(this, t, null, s);
  }
  inYRange(t, s) {
    return Bs(this, null, t, s);
  }
  getCenterPoint(t) {
    const { x: s, y: n, base: i, horizontal: a } = this.getProps([
      "x",
      "y",
      "base",
      "horizontal"
    ], t);
    return {
      x: a ? (s + i) / 2 : s,
      y: a ? n : (n + i) / 2
    };
  }
  getRange(t) {
    return t === "x" ? this.width / 2 : this.height / 2;
  }
}
function ed(e, t, s) {
  const n = e.segments, i = e.points, a = t.points, o = [];
  for (const r of n) {
    let { start: l, end: c } = r;
    c = vs(l, c, i);
    const d = Us(s, i[l], i[c], r.loop);
    if (!t.segments) {
      o.push({
        source: r,
        target: d,
        start: i[l],
        end: i[c]
      });
      continue;
    }
    const u = ma(t, d);
    for (const f of u) {
      const p = Us(s, a[f.start], a[f.end], f.loop), g = pa(r, i, p);
      for (const m of g)
        o.push({
          source: m,
          target: f,
          start: {
            [s]: mi(d, p, "start", Math.max)
          },
          end: {
            [s]: mi(d, p, "end", Math.min)
          }
        });
    }
  }
  return o;
}
function Us(e, t, s, n) {
  if (n)
    return;
  let i = t[e], a = s[e];
  return e === "angle" && (i = St(i), a = St(a)), {
    property: e,
    start: i,
    end: a
  };
}
function sd(e, t) {
  const { x: s = null, y: n = null } = e || {}, i = t.points, a = [];
  return t.segments.forEach(({ start: o, end: r }) => {
    r = vs(o, r, i);
    const l = i[o], c = i[r];
    n !== null ? (a.push({
      x: l.x,
      y: n
    }), a.push({
      x: c.x,
      y: n
    })) : s !== null && (a.push({
      x: s,
      y: l.y
    }), a.push({
      x: s,
      y: c.y
    }));
  }), a;
}
function vs(e, t, s) {
  for (; t > e; t--) {
    const n = s[t];
    if (!isNaN(n.x) && !isNaN(n.y))
      break;
  }
  return t;
}
function mi(e, t, s, n) {
  return e && t ? n(e[s], t[s]) : e ? e[s] : t ? t[s] : 0;
}
function Ba(e, t) {
  let s = [], n = !1;
  return ut(e) ? (n = !0, s = e) : s = sd(e, t), s.length ? new bs({
    points: s,
    options: {
      tension: 0
    },
    _loop: n,
    _fullLoop: n
  }) : null;
}
function bi(e) {
  return e && e.fill !== !1;
}
function nd(e, t, s) {
  let i = e[t].fill;
  const a = [
    t
  ];
  let o;
  if (!s)
    return i;
  for (; i !== !1 && a.indexOf(i) === -1; ) {
    if (!yt(i))
      return i;
    if (o = e[i], !o)
      return !1;
    if (o.visible)
      return i;
    a.push(i), i = o.fill;
  }
  return !1;
}
function id(e, t, s) {
  const n = ld(e);
  if (q(n))
    return isNaN(n.value) ? !1 : n;
  let i = parseFloat(n);
  return yt(i) && Math.floor(i) === i ? ad(n[0], t, i, s) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(n) >= 0 && n;
}
function ad(e, t, s, n) {
  return (e === "-" || e === "+") && (s = t + s), s === t || s < 0 || s >= n ? !1 : s;
}
function od(e, t) {
  let s = null;
  return e === "start" ? s = t.bottom : e === "end" ? s = t.top : q(e) ? s = t.getPixelForValue(e.value) : t.getBasePixel && (s = t.getBasePixel()), s;
}
function rd(e, t, s) {
  let n;
  return e === "start" ? n = s : e === "end" ? n = t.options.reverse ? t.min : t.max : q(e) ? n = e.value : n = t.getBaseValue(), n;
}
function ld(e) {
  const t = e.options, s = t.fill;
  let n = V(s && s.target, s);
  return n === void 0 && (n = !!t.backgroundColor), n === !1 || n === null ? !1 : n === !0 ? "origin" : n;
}
function cd(e) {
  const { scale: t, index: s, line: n } = e, i = [], a = n.segments, o = n.points, r = dd(t, s);
  r.push(Ba({
    x: null,
    y: t.bottom
  }, n));
  for (let l = 0; l < a.length; l++) {
    const c = a[l];
    for (let d = c.start; d <= c.end; d++)
      hd(i, o[d], r);
  }
  return new bs({
    points: i,
    options: {}
  });
}
function dd(e, t) {
  const s = [], n = e.getMatchingVisibleMetas("line");
  for (let i = 0; i < n.length; i++) {
    const a = n[i];
    if (a.index === t)
      break;
    a.hidden || s.unshift(a.dataset);
  }
  return s;
}
function hd(e, t, s) {
  const n = [];
  for (let i = 0; i < s.length; i++) {
    const a = s[i], { first: o, last: r, point: l } = ud(a, t, "x");
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
  const i = n[s], a = e.segments, o = e.points;
  let r = !1, l = !1;
  for (let c = 0; c < a.length; c++) {
    const d = a[c], u = o[d.start][s], f = o[d.end][s];
    if (Ht(i, u, f)) {
      r = i === u, l = i === f;
      break;
    }
  }
  return {
    first: r,
    last: l,
    point: n
  };
}
class La {
  constructor(t) {
    this.x = t.x, this.y = t.y, this.radius = t.radius;
  }
  pathSegment(t, s, n) {
    const { x: i, y: a, radius: o } = this;
    return s = s || {
      start: 0,
      end: dt
    }, t.arc(i, a, o, s.end, s.start, !0), !n.bounds;
  }
  interpolate(t) {
    const { x: s, y: n, radius: i } = this, a = t.angle;
    return {
      x: s + Math.cos(a) * i,
      y: n + Math.sin(a) * i,
      angle: a
    };
  }
}
function fd(e) {
  const { chart: t, fill: s, line: n } = e;
  if (yt(s))
    return gd(t, s);
  if (s === "stack")
    return cd(e);
  if (s === "shape")
    return !0;
  const i = pd(e);
  return i instanceof La ? i : Ba(i, n);
}
function gd(e, t) {
  const s = e.getDatasetMeta(t);
  return s && e.isDatasetVisible(t) ? s.dataset : null;
}
function pd(e) {
  return (e.scale || {}).getPointPositionForValue ? bd(e) : md(e);
}
function md(e) {
  const { scale: t = {}, fill: s } = e, n = od(s, t);
  if (yt(n)) {
    const i = t.isHorizontal();
    return {
      x: i ? n : null,
      y: i ? null : n
    };
  }
  return null;
}
function bd(e) {
  const { scale: t, fill: s } = e, n = t.options, i = t.getLabels().length, a = n.reverse ? t.max : t.min, o = rd(s, t, a), r = [];
  if (n.grid.circular) {
    const l = t.getPointPositionForValue(0, a);
    return new La({
      x: l.x,
      y: l.y,
      radius: t.getDistanceFromCenterForValue(o)
    });
  }
  for (let l = 0; l < i; ++l)
    r.push(t.getPointPositionForValue(l, o));
  return r;
}
function Os(e, t, s) {
  const n = fd(t), { chart: i, index: a, line: o, scale: r, axis: l } = t, c = o.options, d = c.fill, u = c.backgroundColor, { above: f = u, below: p = u } = d || {}, g = i.getDatasetMeta(a), m = ba(i, g);
  n && o.points.length && (us(e, s), vd(e, {
    line: o,
    target: n,
    above: f,
    below: p,
    area: s,
    scale: r,
    axis: l,
    clip: m
  }), fs(e));
}
function vd(e, t) {
  const { line: s, target: n, above: i, below: a, area: o, scale: r, clip: l } = t, c = s._loop ? "angle" : t.axis;
  e.save();
  let d = a;
  a !== i && (c === "x" ? (vi(e, n, o.top), Es(e, {
    line: s,
    target: n,
    color: i,
    scale: r,
    property: c,
    clip: l
  }), e.restore(), e.save(), vi(e, n, o.bottom)) : c === "y" && (yi(e, n, o.left), Es(e, {
    line: s,
    target: n,
    color: a,
    scale: r,
    property: c,
    clip: l
  }), e.restore(), e.save(), yi(e, n, o.right), d = i)), Es(e, {
    line: s,
    target: n,
    color: d,
    scale: r,
    property: c,
    clip: l
  }), e.restore();
}
function vi(e, t, s) {
  const { segments: n, points: i } = t;
  let a = !0, o = !1;
  e.beginPath();
  for (const r of n) {
    const { start: l, end: c } = r, d = i[l], u = i[vs(l, c, i)];
    a ? (e.moveTo(d.x, d.y), a = !1) : (e.lineTo(d.x, s), e.lineTo(d.x, d.y)), o = !!t.pathSegment(e, r, {
      move: o
    }), o ? e.closePath() : e.lineTo(u.x, s);
  }
  e.lineTo(t.first().x, s), e.closePath(), e.clip();
}
function yi(e, t, s) {
  const { segments: n, points: i } = t;
  let a = !0, o = !1;
  e.beginPath();
  for (const r of n) {
    const { start: l, end: c } = r, d = i[l], u = i[vs(l, c, i)];
    a ? (e.moveTo(d.x, d.y), a = !1) : (e.lineTo(s, d.y), e.lineTo(d.x, d.y)), o = !!t.pathSegment(e, r, {
      move: o
    }), o ? e.closePath() : e.lineTo(s, u.y);
  }
  e.lineTo(s, t.first().y), e.closePath(), e.clip();
}
function Es(e, t) {
  const { line: s, target: n, property: i, color: a, scale: o, clip: r } = t, l = ed(s, n, i);
  for (const { source: c, target: d, start: u, end: f } of l) {
    const { style: { backgroundColor: p = a } = {} } = c, g = n !== !0;
    e.save(), e.fillStyle = p, yd(e, o, r, g && Us(i, u, f)), e.beginPath();
    const m = !!s.pathSegment(e, c);
    let b;
    if (g) {
      m ? e.closePath() : _i(e, n, f, i);
      const v = !!n.pathSegment(e, d, {
        move: m,
        reverse: !0
      });
      b = m && v, b || _i(e, n, u, i);
    }
    e.closePath(), e.fill(b ? "evenodd" : "nonzero"), e.restore();
  }
}
function yd(e, t, s, n) {
  const i = t.chart.chartArea, { property: a, start: o, end: r } = n || {};
  if (a === "x" || a === "y") {
    let l, c, d, u;
    a === "x" ? (l = o, c = i.top, d = r, u = i.bottom) : (l = i.left, c = o, d = i.right, u = r), e.beginPath(), s && (l = Math.max(l, s.left), d = Math.min(d, s.right), c = Math.max(c, s.top), u = Math.min(u, s.bottom)), e.rect(l, c, d - l, u - c), e.clip();
  }
}
function _i(e, t, s, n) {
  const i = t.interpolate(s, n);
  i && e.lineTo(i.x, i.y);
}
var _d = {
  id: "filler",
  afterDatasetsUpdate(e, t, s) {
    const n = (e.data.datasets || []).length, i = [];
    let a, o, r, l;
    for (o = 0; o < n; ++o)
      a = e.getDatasetMeta(o), r = a.dataset, l = null, r && r.options && r instanceof bs && (l = {
        visible: e.isDatasetVisible(o),
        index: o,
        fill: id(r, o, n),
        chart: e,
        axis: a.controller.options.indexAxis,
        scale: a.vScale,
        line: r
      }), a.$filler = l, i.push(l);
    for (o = 0; o < n; ++o)
      l = i[o], !(!l || l.fill === !1) && (l.fill = nd(i, o, s.propagate));
  },
  beforeDraw(e, t, s) {
    const n = s.drawTime === "beforeDraw", i = e.getSortedVisibleDatasetMetas(), a = e.chartArea;
    for (let o = i.length - 1; o >= 0; --o) {
      const r = i[o].$filler;
      r && (r.line.updateControlPoints(a, r.axis), n && r.fill && Os(e.ctx, r, a));
    }
  },
  beforeDatasetsDraw(e, t, s) {
    if (s.drawTime !== "beforeDatasetsDraw")
      return;
    const n = e.getSortedVisibleDatasetMetas();
    for (let i = n.length - 1; i >= 0; --i) {
      const a = n[i].$filler;
      bi(a) && Os(e.ctx, a, e.chartArea);
    }
  },
  beforeDatasetDraw(e, t, s) {
    const n = t.meta.$filler;
    !bi(n) || s.drawTime !== "beforeDatasetDraw" || Os(e.ctx, n, e.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const xi = (e, t) => {
  let { boxHeight: s = t, boxWidth: n = t } = e;
  return e.usePointStyle && (s = Math.min(s, t), n = e.pointStyleWidth || Math.min(n, t)), {
    boxWidth: n,
    boxHeight: s,
    itemHeight: Math.max(t, s)
  };
}, xd = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class ki extends Nt {
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
    let s = ot(t.generateLabels, [
      this.chart
    ], this) || [];
    t.filter && (s = s.filter((n) => t.filter(n, this.chart.data))), t.sort && (s = s.sort((n, i) => t.sort(n, i, this.chart.data))), this.options.reverse && s.reverse(), this.legendItems = s;
  }
  fit() {
    const { options: t, ctx: s } = this;
    if (!t.display) {
      this.width = this.height = 0;
      return;
    }
    const n = t.labels, i = vt(n.font), a = i.size, o = this._computeTitleHeight(), { boxWidth: r, itemHeight: l } = xi(n, a);
    let c, d;
    s.font = i.string, this.isHorizontal() ? (c = this.maxWidth, d = this._fitRows(o, a, r, l) + 10) : (d = this.maxHeight, c = this._fitCols(o, i, r, l) + 10), this.width = Math.min(c, t.maxWidth || this.maxWidth), this.height = Math.min(d, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, s, n, i) {
    const { ctx: a, maxWidth: o, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], c = this.lineWidths = [
      0
    ], d = i + r;
    let u = t;
    a.textAlign = "left", a.textBaseline = "middle";
    let f = -1, p = -d;
    return this.legendItems.forEach((g, m) => {
      const b = n + s / 2 + a.measureText(g.text).width;
      (m === 0 || c[c.length - 1] + b + 2 * r > o) && (u += d, c[c.length - (m > 0 ? 0 : 1)] = 0, p += d, f++), l[m] = {
        left: 0,
        top: p,
        row: f,
        width: b,
        height: i
      }, c[c.length - 1] += b + r;
    }), u;
  }
  _fitCols(t, s, n, i) {
    const { ctx: a, maxHeight: o, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], c = this.columnSizes = [], d = o - t;
    let u = r, f = 0, p = 0, g = 0, m = 0;
    return this.legendItems.forEach((b, v) => {
      const { itemWidth: y, itemHeight: x } = kd(n, s, a, b, i);
      v > 0 && p + x + 2 * r > d && (u += f + r, c.push({
        width: f,
        height: p
      }), g += f + r, m++, f = p = 0), l[v] = {
        left: g,
        top: p,
        col: m,
        width: y,
        height: x
      }, f = Math.max(f, y), p += x + r;
    }), u += f, c.push({
      width: f,
      height: p
    }), u;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: s, options: { align: n, labels: { padding: i }, rtl: a } } = this, o = he(a, this.left, this.width);
    if (this.isHorizontal()) {
      let r = 0, l = mt(n, this.left + i, this.right - this.lineWidths[r]);
      for (const c of s)
        r !== c.row && (r = c.row, l = mt(n, this.left + i, this.right - this.lineWidths[r])), c.top += this.top + t + i, c.left = o.leftForLtr(o.x(l), c.width), l += c.width + i;
    } else {
      let r = 0, l = mt(n, this.top + t + i, this.bottom - this.columnSizes[r].height);
      for (const c of s)
        c.col !== r && (r = c.col, l = mt(n, this.top + t + i, this.bottom - this.columnSizes[r].height)), c.top = l, c.left += this.left + i, c.left = o.leftForLtr(o.x(c.left), c.width), l += c.height + i;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      us(t, this), this._draw(), fs(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: s, lineWidths: n, ctx: i } = this, { align: a, labels: o } = t, r = ht.color, l = he(t.rtl, this.left, this.width), c = vt(o.font), { padding: d } = o, u = c.size, f = u / 2;
    let p;
    this.drawTitle(), i.textAlign = l.textAlign("left"), i.textBaseline = "middle", i.lineWidth = 0.5, i.font = c.string;
    const { boxWidth: g, boxHeight: m, itemHeight: b } = xi(o, u), v = function($, C, D) {
      if (isNaN(g) || g <= 0 || isNaN(m) || m < 0)
        return;
      i.save();
      const P = V(D.lineWidth, 1);
      if (i.fillStyle = V(D.fillStyle, r), i.lineCap = V(D.lineCap, "butt"), i.lineDashOffset = V(D.lineDashOffset, 0), i.lineJoin = V(D.lineJoin, "miter"), i.lineWidth = P, i.strokeStyle = V(D.strokeStyle, r), i.setLineDash(V(D.lineDash, [])), o.usePointStyle) {
        const F = {
          radius: m * Math.SQRT2 / 2,
          pointStyle: D.pointStyle,
          rotation: D.rotation,
          borderWidth: P
        }, R = l.xPlus($, g / 2), L = C + f;
        aa(i, F, R, L, o.pointStyleWidth && g);
      } else {
        const F = C + Math.max((u - m) / 2, 0), R = l.leftForLtr($, g), L = de(D.borderRadius);
        i.beginPath(), Object.values(L).some((N) => N !== 0) ? ls(i, {
          x: R,
          y: F,
          w: g,
          h: m,
          radius: L
        }) : i.rect(R, F, g, m), i.fill(), P !== 0 && i.stroke();
      }
      i.restore();
    }, y = function($, C, D) {
      ze(i, D.text, $, C + b / 2, c, {
        strikethrough: D.hidden,
        textAlign: l.textAlign(D.textAlign)
      });
    }, x = this.isHorizontal(), M = this._computeTitleHeight();
    x ? p = {
      x: mt(a, this.left + d, this.right - n[0]),
      y: this.top + d + M,
      line: 0
    } : p = {
      x: this.left + d,
      y: mt(a, this.top + M + d, this.bottom - s[0].height),
      line: 0
    }, ua(this.ctx, t.textDirection);
    const S = b + d;
    this.legendItems.forEach(($, C) => {
      i.strokeStyle = $.fontColor, i.fillStyle = $.fontColor;
      const D = i.measureText($.text).width, P = l.textAlign($.textAlign || ($.textAlign = o.textAlign)), F = g + f + D;
      let R = p.x, L = p.y;
      l.setWidth(this.width), x ? C > 0 && R + F + d > this.right && (L = p.y += S, p.line++, R = p.x = mt(a, this.left + d, this.right - n[p.line])) : C > 0 && L + S > this.bottom && (R = p.x = R + s[p.line].width + d, p.line++, L = p.y = mt(a, this.top + M + d, this.bottom - s[p.line].height));
      const N = l.x(R);
      if (v(N, L, $), R = Yo(P, R + g + f, x ? R + F : this.right, t.rtl), y(l.x(R), L, $), x)
        p.x += F + d;
      else if (typeof $.text != "string") {
        const B = c.lineHeight;
        p.y += Oa($, B) + d;
      } else
        p.y += S;
    }), fa(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, s = t.title, n = vt(s.font), i = Tt(s.padding);
    if (!s.display)
      return;
    const a = he(t.rtl, this.left, this.width), o = this.ctx, r = s.position, l = n.size / 2, c = i.top + l;
    let d, u = this.left, f = this.width;
    if (this.isHorizontal())
      f = Math.max(...this.lineWidths), d = this.top + c, u = mt(t.align, u, this.right - f);
    else {
      const g = this.columnSizes.reduce((m, b) => Math.max(m, b.height), 0);
      d = c + mt(t.align, this.top, this.bottom - g - t.labels.padding - this._computeTitleHeight());
    }
    const p = mt(r, u, u + f);
    o.textAlign = a.textAlign(Js(r)), o.textBaseline = "middle", o.strokeStyle = s.color, o.fillStyle = s.color, o.font = n.string, ze(o, s.text, p, d, n);
  }
  _computeTitleHeight() {
    const t = this.options.title, s = vt(t.font), n = Tt(t.padding);
    return t.display ? s.lineHeight + n.height : 0;
  }
  _getLegendItemAt(t, s) {
    let n, i, a;
    if (Ht(t, this.left, this.right) && Ht(s, this.top, this.bottom)) {
      for (a = this.legendHitBoxes, n = 0; n < a.length; ++n)
        if (i = a[n], Ht(t, i.left, i.left + i.width) && Ht(s, i.top, i.top + i.height))
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
      const i = this._hoveredItem, a = xd(i, n);
      i && !a && ot(s.onLeave, [
        t,
        i,
        this
      ], this), this._hoveredItem = n, n && !a && ot(s.onHover, [
        t,
        n,
        this
      ], this);
    } else n && ot(s.onClick, [
      t,
      n,
      this
    ], this);
  }
}
function kd(e, t, s, n, i) {
  const a = Md(n, e, t, s), o = Sd(i, n, t.lineHeight);
  return {
    itemWidth: a,
    itemHeight: o
  };
}
function Md(e, t, s, n) {
  let i = e.text;
  return i && typeof i != "string" && (i = i.reduce((a, o) => a.length > o.length ? a : o)), t + s.size / 2 + n.measureText(i).width;
}
function Sd(e, t, s) {
  let n = e;
  return typeof t.text != "string" && (n = Oa(t, s)), n;
}
function Oa(e, t) {
  const s = e.text ? e.text.length : 0;
  return t * s;
}
function wd(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var dn = {
  id: "legend",
  _element: ki,
  start(e, t, s) {
    const n = e.legend = new ki({
      ctx: e.ctx,
      options: s,
      chart: e
    });
    At.configure(e, n, s), At.addBox(e, n);
  },
  stop(e) {
    At.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, s) {
    const n = e.legend;
    At.configure(e, n, s), n.options = s;
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
      const n = t.datasetIndex, i = s.chart;
      i.isDatasetVisible(n) ? (i.hide(n), t.hidden = !0) : (i.show(n), t.hidden = !1);
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (e) => e.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(e) {
        const t = e.data.datasets, { labels: { usePointStyle: s, pointStyle: n, textAlign: i, color: a, useBorderRadius: o, borderRadius: r } } = e.legend.options;
        return e._getSortedDatasetMetas().map((l) => {
          const c = l.controller.getStyle(s ? 0 : void 0), d = Tt(c.borderWidth);
          return {
            text: t[l.index].label,
            fillStyle: c.backgroundColor,
            fontColor: a,
            hidden: !l.visible,
            lineCap: c.borderCapStyle,
            lineDash: c.borderDash,
            lineDashOffset: c.borderDashOffset,
            lineJoin: c.borderJoinStyle,
            lineWidth: (d.width + d.height) / 4,
            strokeStyle: c.borderColor,
            pointStyle: n || c.pointStyle,
            rotation: c.rotation,
            textAlign: i || c.textAlign,
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
class Ea extends Nt {
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
    const i = ut(n.text) ? n.text.length : 1;
    this._padding = Tt(n.padding);
    const a = i * vt(n.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = a : this.width = a;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: s, left: n, bottom: i, right: a, options: o } = this, r = o.align;
    let l = 0, c, d, u;
    return this.isHorizontal() ? (d = mt(r, n, a), u = s + t, c = a - n) : (o.position === "left" ? (d = n + t, u = mt(r, i, s), l = et * -0.5) : (d = a - t, u = mt(r, s, i), l = et * 0.5), c = i - s), {
      titleX: d,
      titleY: u,
      maxWidth: c,
      rotation: l
    };
  }
  draw() {
    const t = this.ctx, s = this.options;
    if (!s.display)
      return;
    const n = vt(s.font), a = n.lineHeight / 2 + this._padding.top, { titleX: o, titleY: r, maxWidth: l, rotation: c } = this._drawArgs(a);
    ze(t, s.text, 0, 0, n, {
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
  const s = new Ea({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  At.configure(e, s, t), At.addBox(e, s), e.titleBlock = s;
}
var Ra = {
  id: "title",
  _element: Ea,
  start(e, t, s) {
    Cd(e, s);
  },
  stop(e) {
    const t = e.titleBlock;
    At.removeBox(e, t), delete e.titleBlock;
  },
  beforeUpdate(e, t, s) {
    const n = e.titleBlock;
    At.configure(e, n, s), n.options = s;
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
const De = {
  average(e) {
    if (!e.length)
      return !1;
    let t, s, n = /* @__PURE__ */ new Set(), i = 0, a = 0;
    for (t = 0, s = e.length; t < s; ++t) {
      const r = e[t].element;
      if (r && r.hasValue()) {
        const l = r.tooltipPosition();
        n.add(l.x), i += l.y, ++a;
      }
    }
    return a === 0 || n.size === 0 ? !1 : {
      x: [
        ...n
      ].reduce((r, l) => r + l) / n.size,
      y: i / a
    };
  },
  nearest(e, t) {
    if (!e.length)
      return !1;
    let s = t.x, n = t.y, i = Number.POSITIVE_INFINITY, a, o, r;
    for (a = 0, o = e.length; a < o; ++a) {
      const l = e[a].element;
      if (l && l.hasValue()) {
        const c = l.getCenterPoint(), d = Ws(t, c);
        d < i && (i = d, r = l);
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
function Bt(e, t) {
  return t && (ut(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function It(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function $d(e, t) {
  const { element: s, datasetIndex: n, index: i } = t, a = e.getDatasetMeta(n).controller, { label: o, value: r } = a.getLabelAndValue(i);
  return {
    chart: e,
    label: o,
    parsed: a.getParsed(i),
    raw: e.data.datasets[n].data[i],
    formattedValue: r,
    dataset: a.getDataset(),
    dataIndex: i,
    datasetIndex: n,
    element: s
  };
}
function Mi(e, t) {
  const s = e.chart.ctx, { body: n, footer: i, title: a } = e, { boxWidth: o, boxHeight: r } = t, l = vt(t.bodyFont), c = vt(t.titleFont), d = vt(t.footerFont), u = a.length, f = i.length, p = n.length, g = Tt(t.padding);
  let m = g.height, b = 0, v = n.reduce((M, S) => M + S.before.length + S.lines.length + S.after.length, 0);
  if (v += e.beforeBody.length + e.afterBody.length, u && (m += u * c.lineHeight + (u - 1) * t.titleSpacing + t.titleMarginBottom), v) {
    const M = t.displayColors ? Math.max(r, l.lineHeight) : l.lineHeight;
    m += p * M + (v - p) * l.lineHeight + (v - 1) * t.bodySpacing;
  }
  f && (m += t.footerMarginTop + f * d.lineHeight + (f - 1) * t.footerSpacing);
  let y = 0;
  const x = function(M) {
    b = Math.max(b, s.measureText(M).width + y);
  };
  return s.save(), s.font = c.string, tt(e.title, x), s.font = l.string, tt(e.beforeBody.concat(e.afterBody), x), y = t.displayColors ? o + 2 + t.boxPadding : 0, tt(n, (M) => {
    tt(M.before, x), tt(M.lines, x), tt(M.after, x);
  }), y = 0, s.font = d.string, tt(e.footer, x), s.restore(), b += g.width, {
    width: b,
    height: m
  };
}
function Dd(e, t) {
  const { y: s, height: n } = t;
  return s < n / 2 ? "top" : s > e.height - n / 2 ? "bottom" : "center";
}
function Ad(e, t, s, n) {
  const { x: i, width: a } = n, o = s.caretSize + s.caretPadding;
  if (e === "left" && i + a + o > t.width || e === "right" && i - a - o < 0)
    return !0;
}
function Td(e, t, s, n) {
  const { x: i, width: a } = s, { width: o, chartArea: { left: r, right: l } } = e;
  let c = "center";
  return n === "center" ? c = i <= (r + l) / 2 ? "left" : "right" : i <= a / 2 ? c = "left" : i >= o - a / 2 && (c = "right"), Ad(c, e, t, s) && (c = "center"), c;
}
function Si(e, t, s) {
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
function Pd(e, t, s) {
  let { y: n, height: i } = e;
  return t === "top" ? n += s : t === "bottom" ? n -= i + s : n -= i / 2, n;
}
function wi(e, t, s, n) {
  const { caretSize: i, caretPadding: a, cornerRadius: o } = e, { xAlign: r, yAlign: l } = s, c = i + a, { topLeft: d, topRight: u, bottomLeft: f, bottomRight: p } = de(o);
  let g = Fd(t, r);
  const m = Pd(t, l, c);
  return l === "center" ? r === "left" ? g += c : r === "right" && (g -= c) : r === "left" ? g -= Math.max(d, f) + i : r === "right" && (g += Math.max(u, p) + i), {
    x: bt(g, 0, n.width - t.width),
    y: bt(m, 0, n.height - t.height)
  };
}
function Je(e, t, s) {
  const n = Tt(s.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - n.right : e.x + n.left;
}
function Ci(e) {
  return Bt([], It(e));
}
function Bd(e, t, s) {
  return ie(e, {
    tooltip: t,
    tooltipItems: s,
    type: "tooltip"
  });
}
function $i(e, t) {
  const s = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return s ? e.override(s) : e;
}
const Ia = {
  beforeTitle: Et,
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
  afterTitle: Et,
  beforeBody: Et,
  beforeLabel: Et,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const s = e.formattedValue;
    return Z(s) || (t += s), t;
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
  afterLabel: Et,
  afterBody: Et,
  beforeFooter: Et,
  footer: Et,
  afterFooter: Et
};
function xt(e, t, s, n) {
  const i = e[t].call(s, n);
  return typeof i > "u" ? Ia[t].call(s, n) : i;
}
class Di extends Nt {
  static positioners = De;
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
    const s = this.chart, n = this.options.setContext(this.getContext()), i = n.enabled && s.options.animation && n.animations, a = new va(this.chart, i);
    return i._cacheable && (this._cachedAnimations = Object.freeze(a)), a;
  }
  getContext() {
    return this.$context || (this.$context = Bd(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, s) {
    const { callbacks: n } = s, i = xt(n, "beforeTitle", this, t), a = xt(n, "title", this, t), o = xt(n, "afterTitle", this, t);
    let r = [];
    return r = Bt(r, It(i)), r = Bt(r, It(a)), r = Bt(r, It(o)), r;
  }
  getBeforeBody(t, s) {
    return Ci(xt(s.callbacks, "beforeBody", this, t));
  }
  getBody(t, s) {
    const { callbacks: n } = s, i = [];
    return tt(t, (a) => {
      const o = {
        before: [],
        lines: [],
        after: []
      }, r = $i(n, a);
      Bt(o.before, It(xt(r, "beforeLabel", this, a))), Bt(o.lines, xt(r, "label", this, a)), Bt(o.after, It(xt(r, "afterLabel", this, a))), i.push(o);
    }), i;
  }
  getAfterBody(t, s) {
    return Ci(xt(s.callbacks, "afterBody", this, t));
  }
  getFooter(t, s) {
    const { callbacks: n } = s, i = xt(n, "beforeFooter", this, t), a = xt(n, "footer", this, t), o = xt(n, "afterFooter", this, t);
    let r = [];
    return r = Bt(r, It(i)), r = Bt(r, It(a)), r = Bt(r, It(o)), r;
  }
  _createItems(t) {
    const s = this._active, n = this.chart.data, i = [], a = [], o = [];
    let r = [], l, c;
    for (l = 0, c = s.length; l < c; ++l)
      r.push($d(this.chart, s[l]));
    return t.filter && (r = r.filter((d, u, f) => t.filter(d, u, f, n))), t.itemSort && (r = r.sort((d, u) => t.itemSort(d, u, n))), tt(r, (d) => {
      const u = $i(t.callbacks, d);
      i.push(xt(u, "labelColor", this, d)), a.push(xt(u, "labelPointStyle", this, d)), o.push(xt(u, "labelTextColor", this, d));
    }), this.labelColors = i, this.labelPointStyles = a, this.labelTextColors = o, this.dataPoints = r, r;
  }
  update(t, s) {
    const n = this.options.setContext(this.getContext()), i = this._active;
    let a, o = [];
    if (!i.length)
      this.opacity !== 0 && (a = {
        opacity: 0
      });
    else {
      const r = De[n.position].call(this, i, this._eventPosition);
      o = this._createItems(n), this.title = this.getTitle(o, n), this.beforeBody = this.getBeforeBody(o, n), this.body = this.getBody(o, n), this.afterBody = this.getAfterBody(o, n), this.footer = this.getFooter(o, n);
      const l = this._size = Mi(this, n), c = Object.assign({}, r, l), d = Si(this.chart, n, c), u = wi(n, c, d, this.chart);
      this.xAlign = d.xAlign, this.yAlign = d.yAlign, a = {
        opacity: 1,
        x: u.x,
        y: u.y,
        width: l.width,
        height: l.height,
        caretX: r.x,
        caretY: r.y
      };
    }
    this._tooltipItems = o, this.$context = void 0, a && this._resolveAnimations().update(this, a), t && n.external && n.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: s
    });
  }
  drawCaret(t, s, n, i) {
    const a = this.getCaretPosition(t, n, i);
    s.lineTo(a.x1, a.y1), s.lineTo(a.x2, a.y2), s.lineTo(a.x3, a.y3);
  }
  getCaretPosition(t, s, n) {
    const { xAlign: i, yAlign: a } = this, { caretSize: o, cornerRadius: r } = n, { topLeft: l, topRight: c, bottomLeft: d, bottomRight: u } = de(r), { x: f, y: p } = t, { width: g, height: m } = s;
    let b, v, y, x, M, S;
    return a === "center" ? (M = p + m / 2, i === "left" ? (b = f, v = b - o, x = M + o, S = M - o) : (b = f + g, v = b + o, x = M - o, S = M + o), y = b) : (i === "left" ? v = f + Math.max(l, d) + o : i === "right" ? v = f + g - Math.max(c, u) - o : v = this.caretX, a === "top" ? (x = p, M = x - o, b = v - o, y = v + o) : (x = p + m, M = x + o, b = v + o, y = v - o), S = x), {
      x1: b,
      x2: v,
      x3: y,
      y1: x,
      y2: M,
      y3: S
    };
  }
  drawTitle(t, s, n) {
    const i = this.title, a = i.length;
    let o, r, l;
    if (a) {
      const c = he(n.rtl, this.x, this.width);
      for (t.x = Je(this, n.titleAlign, n), s.textAlign = c.textAlign(n.titleAlign), s.textBaseline = "middle", o = vt(n.titleFont), r = n.titleSpacing, s.fillStyle = n.titleColor, s.font = o.string, l = 0; l < a; ++l)
        s.fillText(i[l], c.x(t.x), t.y + o.lineHeight / 2), t.y += o.lineHeight + r, l + 1 === a && (t.y += n.titleMarginBottom - r);
    }
  }
  _drawColorBox(t, s, n, i, a) {
    const o = this.labelColors[n], r = this.labelPointStyles[n], { boxHeight: l, boxWidth: c } = a, d = vt(a.bodyFont), u = Je(this, "left", a), f = i.x(u), p = l < d.lineHeight ? (d.lineHeight - l) / 2 : 0, g = s.y + p;
    if (a.usePointStyle) {
      const m = {
        radius: Math.min(c, l) / 2,
        pointStyle: r.pointStyle,
        rotation: r.rotation,
        borderWidth: 1
      }, b = i.leftForLtr(f, c) + c / 2, v = g + l / 2;
      t.strokeStyle = a.multiKeyBackground, t.fillStyle = a.multiKeyBackground, Ns(t, m, b, v), t.strokeStyle = o.borderColor, t.fillStyle = o.backgroundColor, Ns(t, m, b, v);
    } else {
      t.lineWidth = q(o.borderWidth) ? Math.max(...Object.values(o.borderWidth)) : o.borderWidth || 1, t.strokeStyle = o.borderColor, t.setLineDash(o.borderDash || []), t.lineDashOffset = o.borderDashOffset || 0;
      const m = i.leftForLtr(f, c), b = i.leftForLtr(i.xPlus(f, 1), c - 2), v = de(o.borderRadius);
      Object.values(v).some((y) => y !== 0) ? (t.beginPath(), t.fillStyle = a.multiKeyBackground, ls(t, {
        x: m,
        y: g,
        w: c,
        h: l,
        radius: v
      }), t.fill(), t.stroke(), t.fillStyle = o.backgroundColor, t.beginPath(), ls(t, {
        x: b,
        y: g + 1,
        w: c - 2,
        h: l - 2,
        radius: v
      }), t.fill()) : (t.fillStyle = a.multiKeyBackground, t.fillRect(m, g, c, l), t.strokeRect(m, g, c, l), t.fillStyle = o.backgroundColor, t.fillRect(b, g + 1, c - 2, l - 2));
    }
    t.fillStyle = this.labelTextColors[n];
  }
  drawBody(t, s, n) {
    const { body: i } = this, { bodySpacing: a, bodyAlign: o, displayColors: r, boxHeight: l, boxWidth: c, boxPadding: d } = n, u = vt(n.bodyFont);
    let f = u.lineHeight, p = 0;
    const g = he(n.rtl, this.x, this.width), m = function(D) {
      s.fillText(D, g.x(t.x + p), t.y + f / 2), t.y += f + a;
    }, b = g.textAlign(o);
    let v, y, x, M, S, $, C;
    for (s.textAlign = o, s.textBaseline = "middle", s.font = u.string, t.x = Je(this, b, n), s.fillStyle = n.bodyColor, tt(this.beforeBody, m), p = r && b !== "right" ? o === "center" ? c / 2 + d : c + 2 + d : 0, M = 0, $ = i.length; M < $; ++M) {
      for (v = i[M], y = this.labelTextColors[M], s.fillStyle = y, tt(v.before, m), x = v.lines, r && x.length && (this._drawColorBox(s, t, M, g, n), f = Math.max(u.lineHeight, l)), S = 0, C = x.length; S < C; ++S)
        m(x[S]), f = u.lineHeight;
      tt(v.after, m);
    }
    p = 0, f = u.lineHeight, tt(this.afterBody, m), t.y -= a;
  }
  drawFooter(t, s, n) {
    const i = this.footer, a = i.length;
    let o, r;
    if (a) {
      const l = he(n.rtl, this.x, this.width);
      for (t.x = Je(this, n.footerAlign, n), t.y += n.footerMarginTop, s.textAlign = l.textAlign(n.footerAlign), s.textBaseline = "middle", o = vt(n.footerFont), s.fillStyle = n.footerColor, s.font = o.string, r = 0; r < a; ++r)
        s.fillText(i[r], l.x(t.x), t.y + o.lineHeight / 2), t.y += o.lineHeight + n.footerSpacing;
    }
  }
  drawBackground(t, s, n, i) {
    const { xAlign: a, yAlign: o } = this, { x: r, y: l } = t, { width: c, height: d } = n, { topLeft: u, topRight: f, bottomLeft: p, bottomRight: g } = de(i.cornerRadius);
    s.fillStyle = i.backgroundColor, s.strokeStyle = i.borderColor, s.lineWidth = i.borderWidth, s.beginPath(), s.moveTo(r + u, l), o === "top" && this.drawCaret(t, s, n, i), s.lineTo(r + c - f, l), s.quadraticCurveTo(r + c, l, r + c, l + f), o === "center" && a === "right" && this.drawCaret(t, s, n, i), s.lineTo(r + c, l + d - g), s.quadraticCurveTo(r + c, l + d, r + c - g, l + d), o === "bottom" && this.drawCaret(t, s, n, i), s.lineTo(r + p, l + d), s.quadraticCurveTo(r, l + d, r, l + d - p), o === "center" && a === "left" && this.drawCaret(t, s, n, i), s.lineTo(r, l + u), s.quadraticCurveTo(r, l, r + u, l), s.closePath(), s.fill(), i.borderWidth > 0 && s.stroke();
  }
  _updateAnimationTarget(t) {
    const s = this.chart, n = this.$animations, i = n && n.x, a = n && n.y;
    if (i || a) {
      const o = De[t.position].call(this, this._active, this._eventPosition);
      if (!o)
        return;
      const r = this._size = Mi(this, t), l = Object.assign({}, o, this._size), c = Si(s, t, l), d = wi(t, l, c, s);
      (i._to !== d.x || a._to !== d.y) && (this.xAlign = c.xAlign, this.yAlign = c.yAlign, this.width = r.width, this.height = r.height, this.caretX = o.x, this.caretY = o.y, this._resolveAnimations().update(this, d));
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
    const i = {
      width: this.width,
      height: this.height
    }, a = {
      x: this.x,
      y: this.y
    };
    n = Math.abs(n) < 1e-3 ? 0 : n;
    const o = Tt(s.padding), r = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    s.enabled && r && (t.save(), t.globalAlpha = n, this.drawBackground(a, t, i, s), ua(t, s.textDirection), a.y += o.top, this.drawTitle(a, t, s), this.drawBody(a, t, s), this.drawFooter(a, t, s), fa(t, s.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, s) {
    const n = this._active, i = t.map(({ datasetIndex: r, index: l }) => {
      const c = this.chart.getDatasetMeta(r);
      if (!c)
        throw new Error("Cannot find a dataset at index " + r);
      return {
        datasetIndex: r,
        element: c.data[l],
        index: l
      };
    }), a = !as(n, i), o = this._positionChanged(i, s);
    (a || o) && (this._active = i, this._eventPosition = s, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, s, n = !0) {
    if (s && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const i = this.options, a = this._active || [], o = this._getActiveElements(t, a, s, n), r = this._positionChanged(o, t), l = s || !as(o, a) || r;
    return l && (this._active = o, (i.enabled || i.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, s))), l;
  }
  _getActiveElements(t, s, n, i) {
    const a = this.options;
    if (t.type === "mouseout")
      return [];
    if (!i)
      return s.filter((r) => this.chart.data.datasets[r.datasetIndex] && this.chart.getDatasetMeta(r.datasetIndex).controller.getParsed(r.index) !== void 0);
    const o = this.chart.getElementsAtEventForMode(t, a.mode, a, n);
    return a.reverse && o.reverse(), o;
  }
  _positionChanged(t, s) {
    const { caretX: n, caretY: i, options: a } = this, o = De[a.position].call(this, t, s);
    return o !== !1 && (n !== o.x || i !== o.y);
  }
}
var hn = {
  id: "tooltip",
  _element: Di,
  positioners: De,
  afterInit(e, t, s) {
    s && (e.tooltip = new Di({
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
    callbacks: Ia
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
function Od(e, t, s, n) {
  const i = e.indexOf(t);
  if (i === -1)
    return Ld(e, t, s, n);
  const a = e.lastIndexOf(t);
  return i !== a ? s : i;
}
const Ed = (e, t) => e === null ? null : bt(Math.round(e), 0, t);
function Ai(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class za extends me {
  static id = "category";
  static defaults = {
    ticks: {
      callback: Ai
    }
  };
  constructor(t) {
    super(t), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(t) {
    const s = this._addedLabels;
    if (s.length) {
      const n = this.getLabels();
      for (const { index: i, label: a } of s)
        n[i] === a && n.splice(i, 1);
      this._addedLabels = [];
    }
    super.init(t);
  }
  parse(t, s) {
    if (Z(t))
      return null;
    const n = this.getLabels();
    return s = isFinite(s) && n[s] === t ? s : Od(n, t, V(s, t), this._addedLabels), Ed(s, n.length - 1);
  }
  determineDataLimits() {
    const { minDefined: t, maxDefined: s } = this.getUserBounds();
    let { min: n, max: i } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (t || (n = 0), s || (i = this.getLabels().length - 1)), this.min = n, this.max = i;
  }
  buildTicks() {
    const t = this.min, s = this.max, n = this.options.offset, i = [];
    let a = this.getLabels();
    a = t === 0 && s === a.length - 1 ? a : a.slice(t, s + 1), this._valueRange = Math.max(a.length - (n ? 0 : 1), 1), this._startValue = this.min - (n ? 0.5 : 0);
    for (let o = t; o <= s; o++)
      i.push({
        value: o
      });
    return i;
  }
  getLabelForValue(t) {
    return Ai.call(this, t);
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
  const s = [], { bounds: i, step: a, min: o, max: r, precision: l, count: c, maxTicks: d, maxDigits: u, includeBounds: f } = e, p = a || 1, g = d - 1, { min: m, max: b } = t, v = !Z(o), y = !Z(r), x = !Z(c), M = (b - m) / (u + 1);
  let S = wn((b - m) / g / p) * p, $, C, D, P;
  if (S < 1e-14 && !v && !y)
    return [
      {
        value: m
      },
      {
        value: b
      }
    ];
  P = Math.ceil(b / S) - Math.floor(m / S), P > g && (S = wn(P * S / g / p) * p), Z(l) || ($ = Math.pow(10, l), S = Math.ceil(S * $) / $), i === "ticks" ? (C = Math.floor(m / S) * S, D = Math.ceil(b / S) * S) : (C = m, D = b), v && y && a && Eo((r - o) / a, S / 1e3) ? (P = Math.round(Math.min((r - o) / S, d)), S = (r - o) / P, C = o, D = r) : x ? (C = v ? o : C, D = y ? r : D, P = c - 1, S = (D - C) / P) : (P = (D - C) / S, Te(P, Math.round(P), S / 1e3) ? P = Math.round(P) : P = Math.ceil(P));
  const F = Math.max(Cn(S), Cn(C));
  $ = Math.pow(10, Z(l) ? F : l), C = Math.round(C * $) / $, D = Math.round(D * $) / $;
  let R = 0;
  for (v && (f && C !== o ? (s.push({
    value: o
  }), C < o && R++, Te(Math.round((C + R * S) * $) / $, o, Ti(o, M, e)) && R++) : C < o && R++); R < P; ++R) {
    const L = Math.round((C + R * S) * $) / $;
    if (y && L > r)
      break;
    s.push({
      value: L
    });
  }
  return y && f && D !== r ? s.length && Te(s[s.length - 1].value, r, Ti(r, M, e)) ? s[s.length - 1].value = r : s.push({
    value: r
  }) : (!y || D === r) && s.push({
    value: D
  }), s;
}
function Ti(e, t, { horizontal: s, minRotation: n }) {
  const i = Wt(n), a = (s ? Math.sin(i) : Math.cos(i)) || 1e-3, o = 0.75 * t * ("" + e).length;
  return Math.min(t / a, o);
}
class Id extends me {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, s) {
    return Z(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: s, maxDefined: n } = this.getUserBounds();
    let { min: i, max: a } = this;
    const o = (l) => i = s ? i : l, r = (l) => a = n ? a : l;
    if (t) {
      const l = Ot(i), c = Ot(a);
      l < 0 && c < 0 ? r(0) : l > 0 && c > 0 && o(0);
    }
    if (i === a) {
      let l = a === 0 ? 1 : Math.abs(a * 0.05);
      r(a + l), t || o(i - l);
    }
    this.min = i, this.max = a;
  }
  getTickLimit() {
    const t = this.options.ticks;
    let { maxTicksLimit: s, stepSize: n } = t, i;
    return n ? (i = Math.ceil(this.max / n) - Math.floor(this.min / n) + 1, i > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${n} would result generating up to ${i} ticks. Limiting to 1000.`), i = 1e3)) : (i = this.computeTickLimit(), s = s || 11), s && (i = Math.min(s, i)), i;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const t = this.options, s = t.ticks;
    let n = this.getTickLimit();
    n = Math.max(2, n);
    const i = {
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
    }, a = this._range || this, o = Rd(i, a);
    return t.bounds === "ticks" && Ro(o, this, "value"), t.reverse ? (o.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), o;
  }
  configure() {
    const t = this.ticks;
    let s = this.min, n = this.max;
    if (super.configure(), this.options.offset && t.length) {
      const i = (n - s) / Math.max(t.length - 1, 1) / 2;
      s -= i, n += i;
    }
    this._startValue = s, this._endValue = n, this._valueRange = n - s;
  }
  getLabelForValue(t) {
    return en(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class Wa extends Id {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: ia.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: s } = this.getMinMax(!0);
    this.min = yt(t) ? t : 0, this.max = yt(s) ? s : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), s = t ? this.width : this.height, n = Wt(this.options.ticks.minRotation), i = (t ? Math.sin(n) : Math.cos(n)) || 1e-3, a = this._resolveTickFontOptions(0);
    return Math.ceil(s / Math.min(40, a.lineHeight / i));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
const ys = {
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
}, kt = /* @__PURE__ */ Object.keys(ys);
function Fi(e, t) {
  return e - t;
}
function Pi(e, t) {
  if (Z(t))
    return null;
  const s = e._adapter, { parser: n, round: i, isoWeekday: a } = e._parseOpts;
  let o = t;
  return typeof n == "function" && (o = n(o)), yt(o) || (o = typeof n == "string" ? s.parse(o, n) : s.parse(o)), o === null ? null : (i && (o = i === "week" && (Ee(a) || a === !0) ? s.startOf(o, "isoWeek", a) : s.startOf(o, i)), +o);
}
function Bi(e, t, s, n) {
  const i = kt.length;
  for (let a = kt.indexOf(e); a < i - 1; ++a) {
    const o = ys[kt[a]], r = o.steps ? o.steps : Number.MAX_SAFE_INTEGER;
    if (o.common && Math.ceil((s - t) / (r * o.size)) <= n)
      return kt[a];
  }
  return kt[i - 1];
}
function zd(e, t, s, n, i) {
  for (let a = kt.length - 1; a >= kt.indexOf(s); a--) {
    const o = kt[a];
    if (ys[o].common && e._adapter.diff(i, n, o) >= t - 1)
      return o;
  }
  return kt[s ? kt.indexOf(s) : 0];
}
function Wd(e) {
  for (let t = kt.indexOf(e) + 1, s = kt.length; t < s; ++t)
    if (ys[kt[t]].common)
      return kt[t];
}
function Li(e, t, s) {
  if (!s)
    e[t] = !0;
  else if (s.length) {
    const { lo: n, hi: i } = Zs(s, t), a = s[n] >= t ? s[n] : s[i];
    e[a] = !0;
  }
}
function Hd(e, t, s, n) {
  const i = e._adapter, a = +i.startOf(t[0].value, n), o = t[t.length - 1].value;
  let r, l;
  for (r = a; r <= o; r = +i.add(r, 1, n))
    l = s[r], l >= 0 && (t[l].major = !0);
  return t;
}
function Oi(e, t, s) {
  const n = [], i = {}, a = t.length;
  let o, r;
  for (o = 0; o < a; ++o)
    r = t[o], i[r] = o, n.push({
      value: r,
      major: !1
    });
  return a === 0 || !s ? n : Hd(e, n, i, s);
}
class Ei extends me {
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
    const n = t.time || (t.time = {}), i = this._adapter = new Ml._date(t.adapters.date);
    i.init(s), Ae(n.displayFormats, i.formats()), this._parseOpts = {
      parser: n.parser,
      round: n.round,
      isoWeekday: n.isoWeekday
    }, super.init(t), this._normalized = s.normalized;
  }
  parse(t, s) {
    return t === void 0 ? null : Pi(this, t);
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
    let { min: i, max: a, minDefined: o, maxDefined: r } = this.getUserBounds();
    function l(c) {
      !o && !isNaN(c.min) && (i = Math.min(i, c.min)), !r && !isNaN(c.max) && (a = Math.max(a, c.max));
    }
    (!o || !r) && (l(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && l(this.getMinMax(!1))), i = yt(i) && !isNaN(i) ? i : +s.startOf(Date.now(), n), a = yt(a) && !isNaN(a) ? a : +s.endOf(Date.now(), n) + 1, this.min = Math.min(i, a - 1), this.max = Math.max(i + 1, a);
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
    const t = this.options, s = t.time, n = t.ticks, i = n.source === "labels" ? this.getLabelTimestamps() : this._generate();
    t.bounds === "ticks" && i.length && (this.min = this._userMin || i[0], this.max = this._userMax || i[i.length - 1]);
    const a = this.min, o = this.max, r = No(i, a, o);
    return this._unit = s.unit || (n.autoSkip ? Bi(s.minUnit, this.min, this.max, this._getLabelCapacity(a)) : zd(this, r.length, s.minUnit, this.min, this.max)), this._majorUnit = !n.major.enabled || this._unit === "year" ? void 0 : Wd(this._unit), this.initOffsets(i), t.reverse && r.reverse(), Oi(this, r, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let s = 0, n = 0, i, a;
    this.options.offset && t.length && (i = this.getDecimalForValue(t[0]), t.length === 1 ? s = 1 - i : s = (this.getDecimalForValue(t[1]) - i) / 2, a = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? n = a : n = (a - this.getDecimalForValue(t[t.length - 2])) / 2);
    const o = t.length < 3 ? 0.5 : 0.25;
    s = bt(s, 0, o), n = bt(n, 0, o), this._offsets = {
      start: s,
      end: n,
      factor: 1 / (s + 1 + n)
    };
  }
  _generate() {
    const t = this._adapter, s = this.min, n = this.max, i = this.options, a = i.time, o = a.unit || Bi(a.minUnit, s, n, this._getLabelCapacity(s)), r = V(i.ticks.stepSize, 1), l = o === "week" ? a.isoWeekday : !1, c = Ee(l) || l === !0, d = {};
    let u = s, f, p;
    if (c && (u = +t.startOf(u, "isoWeek", l)), u = +t.startOf(u, c ? "day" : o), t.diff(n, s, o) > 1e5 * r)
      throw new Error(s + " and " + n + " are too far apart with stepSize of " + r + " " + o);
    const g = i.ticks.source === "data" && this.getDataTimestamps();
    for (f = u, p = 0; f < n; f = +t.add(f, r, o), p++)
      Li(d, f, g);
    return (f === n || i.bounds === "ticks" || p === 1) && Li(d, f, g), Object.keys(d).sort(Fi).map((m) => +m);
  }
  getLabelForValue(t) {
    const s = this._adapter, n = this.options.time;
    return n.tooltipFormat ? s.format(t, n.tooltipFormat) : s.format(t, n.displayFormats.datetime);
  }
  format(t, s) {
    const i = this.options.time.displayFormats, a = this._unit, o = s || i[a];
    return this._adapter.format(t, o);
  }
  _tickFormatFunction(t, s, n, i) {
    const a = this.options, o = a.ticks.callback;
    if (o)
      return ot(o, [
        t,
        s,
        n
      ], this);
    const r = a.time.displayFormats, l = this._unit, c = this._majorUnit, d = l && r[l], u = c && r[c], f = n[s], p = c && u && f && f.major;
    return this._adapter.format(t, i || (p ? u : d));
  }
  generateTickLabels(t) {
    let s, n, i;
    for (s = 0, n = t.length; s < n; ++s)
      i = t[s], i.label = this._tickFormatFunction(i.value, s, t);
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
    const s = this.options.ticks, n = this.ctx.measureText(t).width, i = Wt(this.isHorizontal() ? s.maxRotation : s.minRotation), a = Math.cos(i), o = Math.sin(i), r = this._resolveTickFontOptions(0).size;
    return {
      w: n * a + r * o,
      h: n * o + r * a
    };
  }
  _getLabelCapacity(t) {
    const s = this.options.time, n = s.displayFormats, i = n[s.unit] || n.millisecond, a = this._tickFormatFunction(t, 0, Oi(this, [
      t
    ], this._majorUnit), i), o = this._getLabelSize(a), r = Math.floor(this.isHorizontal() ? this.width / o.w : this.height / o.h) - 1;
    return r > 0 ? r : 1;
  }
  getDataTimestamps() {
    let t = this._cache.data || [], s, n;
    if (t.length)
      return t;
    const i = this.getMatchingVisibleMetas();
    if (this._normalized && i.length)
      return this._cache.data = i[0].controller.getAllParsedValues(this);
    for (s = 0, n = i.length; s < n; ++s)
      t = t.concat(i[s].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(t);
  }
  getLabelTimestamps() {
    const t = this._cache.labels || [];
    let s, n;
    if (t.length)
      return t;
    const i = this.getLabels();
    for (s = 0, n = i.length; s < n; ++s)
      t.push(Pi(this, i[s]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return ea(t.sort(Fi));
  }
}
function ts(e, t, s) {
  let n = 0, i = e.length - 1, a, o, r, l;
  s ? (t >= e[n].pos && t <= e[i].pos && ({ lo: n, hi: i } = te(e, "pos", t)), { pos: a, time: r } = e[n], { pos: o, time: l } = e[i]) : (t >= e[n].time && t <= e[i].time && ({ lo: n, hi: i } = te(e, "time", t)), { time: a, pos: r } = e[n], { time: o, pos: l } = e[i]);
  const c = o - a;
  return c ? r + (l - r) * (t - a) / c : r;
}
class q_ extends Ei {
  static id = "timeseries";
  static defaults = Ei.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), s = this._table = this.buildLookupTable(t);
    this._minPos = ts(s, this.min), this._tableRange = ts(s, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: s, max: n } = this, i = [], a = [];
    let o, r, l, c, d;
    for (o = 0, r = t.length; o < r; ++o)
      c = t[o], c >= s && c <= n && i.push(c);
    if (i.length < 2)
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
    for (o = 0, r = i.length; o < r; ++o)
      d = i[o + 1], l = i[o - 1], c = i[o], Math.round((d + l) / 2) !== c && a.push({
        time: c,
        pos: o / (r - 1)
      });
    return a;
  }
  _generate() {
    const t = this.min, s = this.max;
    let n = super.getDataTimestamps();
    return (!n.includes(t) || !n.length) && n.splice(0, 0, t), (!n.includes(s) || n.length === 1) && n.push(s), n.sort((i, a) => i - a);
  }
  _getTimestampsForTable() {
    let t = this._cache.all || [];
    if (t.length)
      return t;
    const s = this.getDataTimestamps(), n = this.getLabelTimestamps();
    return s.length && n.length ? t = this.normalize(s.concat(n)) : t = s.length ? s : n, t = this._cache.all = t, t;
  }
  getDecimalForValue(t) {
    return (ts(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const s = this._offsets, n = this.getDecimalForPixel(t) / s.factor - s.end;
    return ts(this._table, n * this._tableRange + this._minPos, !0);
  }
}
const Ha = {
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
}, Nd = {
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
  ...Ha,
  ...Nd
}, jd = Ka[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function ce(e) {
  return Ui(e) ? Is(e) : e;
}
function Yd(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return Ui(t) ? new Proxy(e, {}) : e;
}
function Ud(e, t) {
  const s = e.options;
  s && t && Object.assign(s, t);
}
function Na(e, t) {
  e.labels = t;
}
function Va(e, t, s) {
  const n = [];
  e.datasets = t.map((i) => {
    const a = e.datasets.find((o) => o[s] === i[s]);
    return !a || !i.data || n.includes(a) ? {
      ...i
    } : (n.push(a), Object.assign(a, i), a);
  });
}
function qd(e, t) {
  const s = {
    labels: [],
    datasets: []
  };
  return Na(s, e.labels), Va(s, e.datasets, t), s;
}
const Xd = st({
  props: Vd,
  setup(e, t) {
    let { expose: s, slots: n } = t;
    const i = wt(null), a = Vi(null);
    s({
      chart: a
    });
    const o = () => {
      if (!i.value) return;
      const { type: c, data: d, options: u, plugins: f, datasetIdKey: p } = e, g = qd(d, p), m = Yd(g, d);
      a.value = new be(i.value, {
        type: c,
        data: m,
        options: {
          ...u
        },
        plugins: f
      });
    }, r = () => {
      const c = Is(a.value);
      c && (e.destroyDelay > 0 ? setTimeout(() => {
        c.destroy(), a.value = null;
      }, e.destroyDelay) : (c.destroy(), a.value = null));
    }, l = (c) => {
      c.update(e.updateMode);
    };
    return qs(o), ji(r), ue([
      () => e.options,
      () => e.data
    ], (c, d) => {
      let [u, f] = c, [p, g] = d;
      const m = Is(a.value);
      if (!m)
        return;
      let b = !1;
      if (u) {
        const v = ce(u), y = ce(p);
        v && v !== y && (Ud(m, v), b = !0);
      }
      if (f) {
        const v = ce(f.labels), y = ce(g.labels), x = ce(f.datasets), M = ce(g.datasets);
        v !== y && (Na(m.config.data, v), b = !0), x && x !== M && (Va(m.config.data, x, e.datasetIdKey), b = !0);
      }
      b && Yi(() => {
        l(m);
      });
    }, {
      deep: !0
    }), () => Rs("canvas", {
      role: "img",
      "aria-label": e.ariaLabel,
      "aria-describedby": e.ariaDescribedby,
      ref: i
    }, [
      Rs("p", {}, [
        n.default ? n.default() : ""
      ])
    ]);
  }
});
function un(e, t) {
  return be.register(t), st({
    props: Ha,
    setup(s, n) {
      let { expose: i } = n;
      const a = Vi(null), o = (r) => {
        a.value = r?.chart;
      };
      return i({
        chart: a
      }), () => Rs(Xd, jd({
        ref: o
      }, {
        type: e,
        ...s
      }));
    }
  });
}
const Kd = /* @__PURE__ */ un("bar", vl), Gd = /* @__PURE__ */ un("line", xl), Qd = /* @__PURE__ */ un("pie", kl), Ri = {
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
}, Ii = {
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
}, Zd = [
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
function it(e) {
  const t = wt("light");
  let s = null;
  const n = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", i = A(() => e?.value ? e.value : t.value), a = A(() => i.value === "dark"), o = A(() => a.value ? Ii : Ri), r = () => {
    typeof document > "u" || (t.value = n(), s = new MutationObserver((c) => {
      for (const d of c)
        d.attributeName === "class" && (t.value = n());
    }), s.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["class"]
    }));
  }, l = () => {
    s && (s.disconnect(), s = null);
  };
  return qs(() => {
    r();
  }), ji(() => {
    l();
  }), e && ue(e, () => {
  }), {
    isDark: a,
    currentTheme: i,
    colors: o,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: Ri,
    darkColors: Ii,
    chartSeriesColors: Zd
  };
}
const Jd = { class: "chart-container" }, th = /* @__PURE__ */ st({
  __name: "ChartBar",
  props: {
    data: {},
    options: {},
    stacked: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const s = e;
    be.register(
      za,
      Wa,
      td,
      Ra,
      hn,
      dn
    );
    const { isDark: n, colors: i } = it(nt(s, "theme")), a = s.data, o = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = A(() => s.options ? s.options : {
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
          },
          generateLabels: function(l) {
            return l.data.datasets.map((d, u) => ({
              text: o(d.label || ""),
              fillStyle: Array.isArray(d.backgroundColor) ? d.backgroundColor[0] : d.backgroundColor,
              strokeStyle: Array.isArray(d.borderColor) ? d.borderColor[0] : d.borderColor,
              lineWidth: d.borderWidth,
              hidden: !l.isDatasetVisible(u),
              index: u,
              datasetIndex: u
            }));
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: i.value.tooltipBg,
          titleColor: i.value.tooltipText,
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
            color: i.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 12,
              weight: 500
            },
            color: i.value.textSecondary,
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
            color: i.value.textSecondary,
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
      U(T(Kd), {
        data: T(a),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), G = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, i] of t)
    s[n] = i;
  return s;
}, pe = /* @__PURE__ */ G(th, [["__scopeId", "data-v-be0a7bf2"]]), eh = { class: "chart-container" }, sh = /* @__PURE__ */ st({
  __name: "ChartLine",
  props: {
    data: {},
    options: {},
    theme: {}
  },
  setup(e, { expose: t }) {
    const s = e;
    be.register(
      za,
      Wa,
      Xc,
      bs,
      Ra,
      hn,
      dn,
      _d
    );
    const { isDark: n, colors: i } = it(nt(s, "theme")), a = s.data, o = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = A(() => s.options ? s.options : {
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
            pointStyle: "circle",
            generateLabels: function(l) {
              return l.data.datasets.map((d, u) => ({
                text: o(d.label || ""),
                fillStyle: d.backgroundColor,
                strokeStyle: d.borderColor,
                lineWidth: d.borderWidth,
                hidden: !l.isDatasetVisible(u),
                index: u,
                datasetIndex: u
              }));
            }
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: i.value.tooltipBg,
          titleColor: i.value.tooltipText,
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
            color: i.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: {
              family: "'DM Sans', sans-serif",
              size: 12,
              weight: 500
            },
            color: i.value.textSecondary,
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
            color: i.value.textSecondary,
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
      U(T(Gd), {
        data: T(a),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), ve = /* @__PURE__ */ G(sh, [["__scopeId", "data-v-c400b486"]]), nh = { class: "chart-container" }, ih = /* @__PURE__ */ st({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const s = e;
    be.register(Ic, hn, dn);
    const { isDark: n, colors: i } = it(nt(s, "theme")), a = s.data, o = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = A(() => s.options ? s.options : {
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
            color: i.value.textSecondary,
            padding: 16,
            boxWidth: 14,
            boxHeight: 14,
            borderRadius: 4,
            usePointStyle: !0,
            pointStyle: "circle",
            generateLabels: function(l) {
              const c = l.data;
              return c.labels.length && c.datasets.length ? c.labels.map((d, u) => {
                const f = l.getDatasetMeta(0), p = c.datasets[0], g = p.data[u], m = Array.isArray(p.backgroundColor) ? p.backgroundColor[u] : p.backgroundColor;
                return {
                  text: `${o(d)}: ${g}`,
                  fillStyle: m,
                  hidden: f.data[u]?.hidden || !1,
                  index: u
                };
              }) : [];
            }
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: i.value.tooltipBg,
          titleColor: i.value.tooltipText,
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
              const c = l.label || "", d = l.parsed || 0, u = l.dataset.data.reduce((p, g) => p + g, 0), f = (d / u * 100).toFixed(1);
              return `${o(c)}: ${d} (${f}%)`;
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
      U(T(Qd), {
        data: T(a),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), fn = /* @__PURE__ */ G(ih, [["__scopeId", "data-v-23a84317"]]), ah = { class: "chart-container" }, oh = ["viewBox"], rh = ["transform"], lh = ["x", "width", "fill", "stroke"], ch = ["fill"], dh = ["x1", "y1", "x2", "y2", "stroke"], hh = ["points", "fill"], uh = ["x1", "y1", "x2", "y2", "stroke"], fh = ["x", "y", "fill"], gh = ["x1", "y1", "x2", "y2", "stroke"], ph = ["points", "fill"], mh = ["transform"], bh = ["y1", "y2"], vh = ["y1", "y2"], yh = ["y1", "y2"], _h = ["y1", "y2"], xh = ["y", "height"], kh = ["y1", "y2"], Mh = ["y1", "y2"], Sh = ["y1", "y2"], wh = ["y1", "y2"], Ch = ["y", "height"], $h = ["cy", "stroke", "onMouseenter"], Dh = ["cy", "stroke", "onMouseenter"], Ah = ["cy", "stroke", "onMouseenter"], Th = ["cy", "stroke", "onMouseenter"], Fh = ["y1", "y2", "onMouseenter"], Ph = ["y1", "y2", "onMouseenter"], Bh = ["x", "y", "fill"], Lh = ["x", "y", "fill"], Oh = ["transform"], Eh = { transform: "translate(-200, 0)" }, Rh = ["stroke"], Ih = ["fill"], zh = { transform: "translate(-130, 0)" }, Wh = ["stroke"], Hh = ["fill"], Nh = { transform: "translate(-60, 0)" }, Vh = ["stroke"], jh = ["fill"], Yh = { transform: "translate(10, 0)" }, Uh = ["stroke"], qh = ["fill"], Xh = { transform: "translate(80, 0)" }, Kh = ["fill"], Gh = { transform: "translate(150, 0)" }, Qh = ["fill"], Zh = /* @__PURE__ */ st({
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
    const s = e, { isDark: n } = it(nt(s, "theme")), i = A(() => ({
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
    })), a = wt({
      visible: !1,
      x: 0,
      y: 0,
      text: ""
    }), o = (f) => typeof f == "string" ? f.charAt(0).toUpperCase() + f.slice(1).toLowerCase() : f, r = (f, p) => {
      const g = f.currentTarget.closest("svg");
      if (!g) return;
      const m = g.getBoundingClientRect(), b = g.createSVGPoint();
      b.x = f.clientX - m.left, b.y = f.clientY - m.top, a.value = {
        visible: !0,
        x: b.x,
        y: b.y - 20,
        text: p
      };
    }, l = (f) => {
      if (a.value.visible) {
        const p = f.currentTarget, g = p.getBoundingClientRect(), m = p.createSVGPoint();
        m.x = f.clientX - g.left, m.y = f.clientY - g.top, a.value.x = m.x, a.value.y = m.y - 20;
      }
    }, c = () => {
      a.value.visible = !1;
    }, d = () => {
      a.value.visible = !1;
    }, u = A(() => {
      const f = [], g = s.chartHeight - s.chartMargin - s.chartBottomMargin;
      for (let m = 1; m <= 10; m++) {
        const b = m, v = (b - 1) / 9, y = s.chartMargin + g - v * g;
        f.push({ value: b, y });
      }
      return f;
    });
    return t({ isDark: n }), (f, p) => (_(), k("div", ah, [
      (_(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: Dt(`min-height: ${e.chartHeight}px;`),
        onMousemove: l,
        onMouseleave: c
      }, [
        a.value.visible ? (_(), k("g", {
          key: 0,
          transform: `translate(${a.value.x}, ${a.value.y})`
        }, [
          h("rect", {
            x: -(a.value.text.length * 6 + 10),
            y: -16,
            width: a.value.text.length * 12 + 20,
            height: "24",
            fill: i.value.tooltipBg,
            rx: "6",
            stroke: i.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, lh),
          h("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: i.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, w(a.value.text), 9, ch)
        ], 8, rh)) : I("", !0),
        h("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: i.value.axis,
          "stroke-width": "2"
        }, null, 8, dh),
        h("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: i.value.axis
        }, null, 8, hh),
        (_(!0), k(K, null, lt(u.value, (g, m) => (_(), k(K, { key: m }, [
          h("line", {
            x1: e.chartMargin - 6,
            y1: g.y,
            x2: e.chartMargin,
            y2: g.y,
            stroke: i.value.tickLine,
            "stroke-width": "1"
          }, null, 8, uh),
          h("text", {
            x: e.chartMargin - 12,
            y: g.y + 4,
            "text-anchor": "end",
            fill: i.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, w(g.value), 9, fh)
        ], 64))), 128)),
        h("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: i.value.axis,
          "stroke-width": "2"
        }, null, 8, gh),
        h("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: i.value.axis
        }, null, 8, ph),
        (_(!0), k(K, null, lt(e.boxplotData, (g, m) => (_(), k(K, { key: m }, [
          h("g", {
            transform: `translate(${g.centerX}, 0)`
          }, [
            g.isTotal ? (_(), k(K, { key: 0 }, [
              h("line", {
                x1: 0,
                y1: g.minY,
                x2: 0,
                y2: g.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, bh),
              h("line", {
                x1: 0,
                y1: g.q3Y,
                x2: 0,
                y2: g.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, vh),
              h("line", {
                x1: -18,
                y1: g.minY,
                x2: 18,
                y2: g.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, yh),
              h("line", {
                x1: -18,
                y1: g.maxY,
                x2: 18,
                y2: g.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, _h),
              h("rect", {
                x: -24,
                y: g.q3Y,
                width: "48",
                height: g.q1Y - g.q3Y,
                fill: "#8b5cf6",
                "fill-opacity": "0.15",
                stroke: "#8b5cf6",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, xh)
            ], 64)) : (_(), k(K, { key: 1 }, [
              h("line", {
                x1: 0,
                y1: g.minY,
                x2: 0,
                y2: g.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, kh),
              h("line", {
                x1: 0,
                y1: g.q3Y,
                x2: 0,
                y2: g.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Mh),
              h("line", {
                x1: -18,
                y1: g.minY,
                x2: 18,
                y2: g.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Sh),
              h("line", {
                x1: -18,
                y1: g.maxY,
                x2: 18,
                y2: g.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, wh),
              h("rect", {
                x: -24,
                y: g.q3Y,
                width: "48",
                height: g.q1Y - g.q3Y,
                fill: "#C67DFF",
                "fill-opacity": "0.15",
                stroke: "#C67DFF",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, Ch)
            ], 64)),
            h("circle", {
              cx: 0,
              cy: g.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: i.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => r(b, `Min: ${g.min.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, $h),
            h("circle", {
              cx: 0,
              cy: g.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: i.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => r(b, `Q1: ${g.q1.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Dh),
            h("circle", {
              cx: 0,
              cy: g.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: i.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => r(b, `Q3: ${g.q3.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Ah),
            h("circle", {
              cx: 0,
              cy: g.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: i.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => r(b, `Max: ${g.max.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Th),
            h("line", {
              x1: -24,
              y1: g.medianY,
              x2: 24,
              y2: g.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (b) => r(b, `Median: ${g.median.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Fh),
            g.averageY ? (_(), k("line", {
              key: 2,
              x1: -24,
              y1: g.averageY,
              x2: 24,
              y2: g.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (b) => r(b, `Avg: ${g.average.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Ph)) : I("", !0)
          ], 8, mh),
          h("text", {
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: i.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, w(o(g.label)), 9, Bh),
          g.responseCount ? (_(), k("text", {
            key: 0,
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: i.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + w(g.responseCount), 9, Lh)) : I("", !0)
        ], 64))), 128)),
        e.showLegend ? (_(), k("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          h("g", Eh, [
            h("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: i.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Rh),
            h("text", {
              x: "10",
              y: "4",
              fill: i.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Ih)
          ]),
          h("g", zh, [
            h("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
              stroke: i.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Wh),
            h("text", {
              x: "10",
              y: "4",
              fill: i.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, Hh)
          ]),
          h("g", Nh, [
            h("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
              stroke: i.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Vh),
            h("text", {
              x: "10",
              y: "4",
              fill: i.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, jh)
          ]),
          h("g", Yh, [
            h("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: i.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Uh),
            h("text", {
              x: "10",
              y: "4",
              fill: i.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, qh)
          ]),
          h("g", Xh, [
            p[0] || (p[0] = h("line", {
              x1: "0",
              y1: "0",
              x2: "14",
              y2: "0",
              stroke: "#f97316",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            h("text", {
              x: "18",
              y: "4",
              fill: i.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, Kh)
          ]),
          h("g", Gh, [
            p[1] || (p[1] = h("line", {
              x1: "0",
              y1: "0",
              x2: "14",
              y2: "0",
              stroke: "#8b5cf6",
              "stroke-width": "2.5"
            }, null, -1)),
            h("text", {
              x: "18",
              y: "4",
              fill: i.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, Qh)
          ])
        ], 8, Oh)) : I("", !0)
      ], 44, oh))
    ]));
  }
}), Jh = /* @__PURE__ */ G(Zh, [["__scopeId", "data-v-520c623f"]]), tu = { class: "chart-container" }, eu = ["viewBox"], su = ["transform"], nu = ["x", "y", "width", "height", "fill", "stroke"], iu = ["y", "fill"], au = ["y", "fill"], ou = ["x1", "y1", "x2", "y2", "stroke"], ru = ["points", "fill"], lu = ["x1", "y1", "x2", "y2", "stroke"], cu = ["x1", "y1", "x2", "y2", "stroke"], du = ["x", "y", "fill"], hu = ["x", "y", "fill", "transform"], uu = ["x1", "y1", "x2", "y2", "stroke"], fu = ["points", "fill"], gu = ["transform"], pu = ["y1", "y2", "stroke", "onMouseenter"], mu = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], bu = ["x1", "y1", "x2", "y2", "onMouseenter"], vu = ["x1", "y1", "x2", "y2", "onMouseenter"], yu = ["cy", "stroke", "onMouseenter"], _u = ["cy", "stroke", "onMouseenter"], xu = ["x", "y", "fill"], ku = ["x", "y", "fill"], Mu = ["transform"], Su = { transform: "translate(-180, 0)" }, wu = ["stroke"], Cu = ["fill"], $u = { transform: "translate(-120, 0)" }, Du = ["fill"], Au = { transform: "translate(-60, 0)" }, Tu = ["fill"], Fu = { transform: "translate(0, 0)" }, Pu = ["stroke"], Bu = ["fill"], Lu = { transform: "translate(60, 0)" }, Ou = ["fill"], Eu = { transform: "translate(130, 0)" }, Ru = ["fill"], Iu = /* @__PURE__ */ st({
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
    const s = e, { isDark: n } = it(nt(s, "theme")), i = A(() => ({
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
    })), a = wt({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), o = (f) => typeof f == "string" ? f.charAt(0).toUpperCase() + f.slice(1).toLowerCase() : f, r = (f, p, g) => {
      const m = f.currentTarget.closest("svg");
      if (!m) return;
      const b = m.getBoundingClientRect(), v = m.createSVGPoint();
      v.x = f.clientX - b.left, v.y = f.clientY - b.top;
      let y = o(p.label), x = "";
      switch (g) {
        case "body":
          x = `Q1: ${p.q1.toFixed(1)} | Q3: ${p.q3.toFixed(1)}`;
          break;
        case "wick":
          x = `Min: ${p.low.toFixed(1)} | Max: ${p.high.toFixed(1)}`;
          break;
        case "median":
          x = `Median: ${p.median.toFixed(1)}`;
          break;
        case "average":
          x = `Average: ${p.average?.toFixed(1)}`;
          break;
        case "min":
          x = `Min: ${p.low.toFixed(1)}`;
          break;
        case "max":
          x = `Max: ${p.high.toFixed(1)}`;
          break;
      }
      const M = Math.max(180, x.length * 7 + 40), S = 48;
      a.value = {
        visible: !0,
        x: v.x,
        y: v.y - 20,
        title: y,
        text: x,
        width: M,
        height: S
      };
    }, l = (f) => {
      if (a.value.visible) {
        const p = f.currentTarget, g = p.getBoundingClientRect(), m = p.createSVGPoint();
        m.x = f.clientX - g.left, m.y = f.clientY - g.top, a.value.x = m.x, a.value.y = m.y - 20;
      }
    }, c = () => {
      a.value.visible = !1;
    }, d = () => {
      a.value.visible = !1;
    }, u = A(() => {
      const f = [], g = s.chartHeight - s.chartMargin - s.chartBottomMargin;
      for (let m = 1; m <= 10; m++) {
        const b = m, v = (b - 1) / 9, y = s.chartMargin + g - v * g;
        f.push({ value: b, y });
      }
      return f;
    });
    return t({ isDark: n }), (f, p) => (_(), k("div", tu, [
      (_(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full candlestick-svg",
        style: Dt(`min-height: ${e.chartHeight}px;`),
        onMousemove: l,
        onMouseleave: c
      }, [
        a.value.visible ? (_(), k("g", {
          key: 0,
          transform: `translate(${a.value.x}, ${a.value.y})`
        }, [
          h("rect", {
            x: -a.value.width / 2,
            y: -a.value.height - 10,
            width: a.value.width,
            height: a.value.height,
            fill: i.value.tooltipBg,
            rx: "8",
            stroke: i.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, nu),
          h("text", {
            x: "0",
            y: -a.value.height + 8,
            "text-anchor": "middle",
            fill: i.value.tooltipText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, w(a.value.title), 9, iu),
          h("text", {
            x: "0",
            y: -a.value.height + 26,
            "text-anchor": "middle",
            fill: i.value.tooltipTextSecondary,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, w(a.value.text), 9, au)
        ], 8, su)) : I("", !0),
        h("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: i.value.axis,
          "stroke-width": "2"
        }, null, 8, ou),
        h("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: i.value.axis
        }, null, 8, ru),
        (_(!0), k(K, null, lt(u.value, (g, m) => (_(), k("line", {
          key: `grid-${m}`,
          x1: e.chartMargin,
          y1: g.y,
          x2: e.chartWidth - e.chartMargin,
          y2: g.y,
          stroke: i.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, lu))), 128)),
        (_(!0), k(K, null, lt(u.value, (g, m) => (_(), k(K, { key: m }, [
          h("line", {
            x1: e.chartMargin - 6,
            y1: g.y,
            x2: e.chartMargin,
            y2: g.y,
            stroke: i.value.tickLine,
            "stroke-width": "1"
          }, null, 8, cu),
          h("text", {
            x: e.chartMargin - 12,
            y: g.y + 4,
            "text-anchor": "end",
            fill: i.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, w(g.value), 9, du)
        ], 64))), 128)),
        h("text", {
          x: e.chartMargin - 35,
          y: e.chartHeight / 2,
          "text-anchor": "middle",
          fill: i.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif",
          transform: `rotate(-90, ${e.chartMargin - 35}, ${e.chartHeight / 2})`
        }, w(o(e.yAxisLabel)), 9, hu),
        h("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: i.value.axis,
          "stroke-width": "2"
        }, null, 8, uu),
        h("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: i.value.axis
        }, null, 8, fu),
        (_(!0), k(K, null, lt(e.candlestickData, (g, m) => (_(), k(K, { key: m }, [
          h("g", {
            transform: `translate(${g.centerX}, 0)`
          }, [
            h("line", {
              x1: 0,
              y1: g.highY,
              x2: 0,
              y2: g.lowY,
              stroke: g.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              class: "hover-line",
              onMouseenter: (b) => r(b, g, "wick"),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, pu),
            h("rect", {
              x: -e.candleWidth / 2,
              y: Math.min(g.q1Y, g.q3Y),
              width: e.candleWidth,
              height: Math.abs(g.q3Y - g.q1Y),
              fill: g.isTotal ? "rgba(139, 92, 246, 0.15)" : "rgba(198, 125, 255, 0.15)",
              stroke: g.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              rx: "4",
              class: "hover-rect",
              onMouseenter: (b) => r(b, g, "body"),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, mu),
            g.medianY ? (_(), k("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: g.medianY,
              x2: e.candleWidth / 2,
              y2: g.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (b) => r(b, g, "median"),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, bu)) : I("", !0),
            g.averageY ? (_(), k("line", {
              key: 1,
              x1: -e.candleWidth / 2,
              y1: g.averageY,
              x2: e.candleWidth / 2,
              y2: g.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (b) => r(b, g, "average"),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, vu)) : I("", !0),
            h("circle", {
              cx: 0,
              cy: g.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: i.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => r(b, g, "min"),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, yu),
            h("circle", {
              cx: 0,
              cy: g.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: i.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => r(b, g, "max"),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, _u)
          ], 8, gu),
          h("text", {
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: i.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, w(o(g.label)), 9, xu),
          g.responseCount ? (_(), k("text", {
            key: 0,
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: i.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + w(g.responseCount), 9, ku)) : I("", !0)
        ], 64))), 128)),
        e.showLegend ? (_(), k("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          h("g", Su, [
            h("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: i.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, wu),
            h("text", {
              x: "10",
              y: "4",
              fill: i.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Cu)
          ]),
          h("g", $u, [
            p[0] || (p[0] = h("rect", {
              x: "-6",
              y: "-6",
              width: "12",
              height: "12",
              fill: "rgba(198, 125, 255, 0.15)",
              stroke: "#C67DFF",
              "stroke-width": "1.5",
              rx: "2"
            }, null, -1)),
            h("text", {
              x: "10",
              y: "4",
              fill: i.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, Du)
          ]),
          h("g", Au, [
            p[1] || (p[1] = h("rect", {
              x: "-6",
              y: "-6",
              width: "12",
              height: "12",
              fill: "rgba(198, 125, 255, 0.15)",
              stroke: "#C67DFF",
              "stroke-width": "1.5",
              rx: "2"
            }, null, -1)),
            h("text", {
              x: "10",
              y: "4",
              fill: i.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, Tu)
          ]),
          h("g", Fu, [
            h("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: i.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Pu),
            h("text", {
              x: "10",
              y: "4",
              fill: i.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Bu)
          ]),
          h("g", Lu, [
            p[2] || (p[2] = h("line", {
              x1: "0",
              y1: "0",
              x2: "14",
              y2: "0",
              stroke: "#f97316",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            h("text", {
              x: "18",
              y: "4",
              fill: i.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, Ou)
          ]),
          h("g", Eu, [
            p[3] || (p[3] = h("line", {
              x1: "0",
              y1: "0",
              x2: "14",
              y2: "0",
              stroke: "#8b5cf6",
              "stroke-width": "2.5"
            }, null, -1)),
            h("text", {
              x: "18",
              y: "4",
              fill: i.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, Ru)
          ])
        ], 8, Mu)) : I("", !0)
      ], 44, eu))
    ]));
  }
}), ja = /* @__PURE__ */ G(Iu, [["__scopeId", "data-v-0ecc8ae0"]]), zu = { class: "chart-container" }, Wu = ["viewBox"], Hu = ["transform"], Nu = ["x", "y", "width", "height", "fill", "stroke"], Vu = ["y", "fill"], ju = ["y", "fill"], Yu = ["x1", "y1", "x2", "y2", "stroke"], Uu = ["x1", "y1", "x2", "y2", "stroke"], qu = ["points", "fill"], Xu = ["x1", "y1", "x2", "y2", "stroke"], Ku = ["x", "y", "fill"], Gu = ["x", "y", "fill", "transform"], Qu = ["x1", "y1", "x2", "y2", "stroke"], Zu = ["points", "fill"], Ju = ["x1", "y1", "x2", "y2", "stroke"], tf = ["x", "y", "fill"], ef = ["x", "y", "fill"], sf = ["d"], nf = ["x", "y", "width", "height", "onMouseenter"], af = ["x1", "y1", "x2", "y2"], of = ["x", "y"], rf = ["x1", "y1", "x2", "y2"], lf = ["x", "y"], cf = ["x1", "y1", "x2", "y2"], df = ["x", "y"], hf = ["x1", "y1", "x2", "y2"], uf = ["x", "y"], ff = ["x1", "y1", "x2", "y2"], gf = ["x", "y"], pf = ["x1", "y1", "x2", "y2"], mf = ["x", "y"], bf = ["transform"], vf = { transform: "translate(-220, 0)" }, yf = ["fill"], _f = { transform: "translate(-140, 0)" }, xf = ["fill"], kf = { transform: "translate(-80, 0)" }, Mf = ["fill"], Sf = { transform: "translate(-20, 0)" }, wf = ["fill"], Cf = { transform: "translate(60, 0)" }, $f = ["fill"], Df = { transform: "translate(130, 0)" }, Af = ["fill"], Tf = { transform: "translate(180, 0)" }, Ff = ["fill"], Pf = /* @__PURE__ */ st({
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
    const s = e, { isDark: n } = it(nt(s, "theme")), i = A(() => ({
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
    })), a = wt({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), o = A(() => s.chartWidth - s.chartMargin * 2), r = A(() => s.chartHeight - s.chartMargin - s.chartBottomMargin), l = A(() => o.value / 10 * 0.6), c = A(() => !s.histogram || s.histogram.length === 0 ? 1 : Math.max(...s.histogram.map((O) => O.count || 0), 1) + 30), d = A(() => {
      if (!s.histogram || s.histogram.length === 0) return 1;
      const W = s.averageScore || 0;
      let O = 0, z = 0;
      if (s.histogram.forEach((Q) => {
        const at = Q.count || 0;
        O += at;
        const ct = Q.score - W;
        z += at * (ct * ct);
      }), O === 0) return 1;
      const Y = z / O;
      return Math.sqrt(Y) || 1;
    }), u = (W, O, z) => {
      if (z === 0) return 0;
      const Y = 1 / (z * Math.sqrt(2 * Math.PI)), Q = -0.5 * Math.pow((W - O) / z, 2);
      return Y * Math.exp(Q);
    }, f = A(() => {
      if (!s.histogram || s.histogram.length === 0 || s.averageScore === 0 && d.value === 0) return null;
      const W = s.averageScore, O = d.value, z = [], Y = 100, Q = 1, at = 10, ct = s.histogram.reduce((Ct, oe) => Ct + (oe.count || 0), 0);
      if (ct === 0) return null;
      let pt = 0;
      for (let Ct = 0; Ct <= Y; Ct++) {
        const oe = Q + (at - Q) * (Ct / Y), xs = u(oe, W, O);
        xs > pt && (pt = xs);
      }
      const ye = r.value * 0.75 / pt * ct * 6e-3, _s = s.chartMargin;
      for (let Ct = 0; Ct <= Y; Ct++) {
        const oe = Q + (at - Q) * (Ct / Y), Xa = u(oe, W, O) * ye, gn = g(oe);
        if (gn !== null) {
          let ks = s.chartHeight - s.chartBottomMargin - Xa;
          ks = Math.max(ks, _s), z.push(`${Ct === 0 ? "M" : "L"} ${gn} ${ks}`);
        }
      }
      return z.join(" ");
    }), p = A(() => {
      if (!s.histogram || s.histogram.length === 0) return [];
      const W = o.value / 10;
      return s.histogram.map((O, z) => {
        const Y = s.chartMargin + (z + 0.5) * W, Q = O.count > 0 ? O.count / c.value * r.value : 0, at = s.chartHeight - s.chartBottomMargin - Q;
        return {
          score: O.score,
          count: O.count,
          x: Y,
          y: at,
          height: Q
        };
      });
    }), g = (W) => {
      if (W < 1 || W > 10) return null;
      const O = o.value / 10;
      return s.chartMargin + (W - 0.5) * O;
    }, m = A(() => g(s.minScore)), b = A(() => g(s.maxScore)), v = A(() => g(s.q1Score)), y = A(() => g(s.medianScore)), x = A(() => g(s.q3Score)), M = A(() => g(s.averageScore)), S = A(() => s.minScore), $ = A(() => s.maxScore), C = A(() => s.q1Score), D = A(() => s.medianScore), P = A(() => s.q3Score), F = A(() => s.averageScore), R = A(() => {
      const W = [], O = s.chartMargin - 8, z = 18;
      v.value !== null && W.push({
        x: v.value,
        y: O,
        value: s.q1Score,
        label: `Q1: ${C.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), y.value !== null && W.push({
        x: y.value,
        y: O - z,
        value: s.medianScore,
        label: `Median: ${D.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), M.value !== null && W.push({
        x: M.value,
        y: O - z,
        value: s.averageScore,
        label: `Avg: ${F.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), x.value !== null && W.push({
        x: x.value,
        y: O,
        value: s.q3Score,
        label: `Q3: ${P.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), W.sort((at, ct) => (at.x || 0) - (ct.x || 0));
      const Y = [[], [], []];
      W.forEach((at) => {
        if (at.x === null) return;
        let ct = -1;
        for (let pt = 0; pt < Y.length; pt++) {
          let Mt = !1;
          for (const ye of Y[pt]) {
            if (ye.x === null) continue;
            const _s = Math.abs(at.x - ye.x), Ct = (at.width + ye.width) / 2 + 10;
            if (_s < Ct) {
              Mt = !0;
              break;
            }
          }
          if (!Mt) {
            ct = pt;
            break;
          }
        }
        ct === -1 && (ct = Y.length - 1), at.y = O - ct * z, Y[ct].push(at);
      });
      const Q = 15;
      return W.forEach((at) => {
        at.y < Q && (at.y = Q);
      }), W;
    }), L = (W) => R.value.find((z) => z.id === W)?.y || s.chartMargin - 10, N = A(() => {
      const W = [];
      for (let z = 0; z <= 5; z++) {
        const Y = Math.round(c.value / 5 * z), Q = s.chartHeight - s.chartBottomMargin - z / 5 * r.value;
        W.push({ value: Y, y: Q });
      }
      return W;
    }), B = (W, O) => {
      const z = W.currentTarget.closest("svg");
      if (!z) return;
      const Y = z.getBoundingClientRect(), Q = z.createSVGPoint();
      Q.x = W.clientX - Y.left, Q.y = W.clientY - Y.top;
      const at = `Score: ${O.score}`, ct = `Count: ${O.count}`, pt = 120, Mt = 48;
      a.value = {
        visible: !0,
        x: Q.x,
        y: Q.y - 20,
        title: at,
        text: ct,
        width: pt,
        height: Mt
      };
    }, E = (W) => {
      if (a.value.visible) {
        const O = W.currentTarget, z = O.getBoundingClientRect(), Y = O.createSVGPoint();
        Y.x = W.clientX - z.left, Y.y = W.clientY - z.top, a.value.x = Y.x, a.value.y = Y.y - 20;
      }
    }, j = () => {
      a.value.visible = !1;
    }, J = () => {
      a.value.visible = !1;
    };
    return t({ isDark: n }), (W, O) => (_(), k("div", zu, [
      (_(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: Dt(`min-height: ${e.chartHeight}px;`),
        onMousemove: E,
        onMouseleave: j
      }, [
        a.value.visible ? (_(), k("g", {
          key: 0,
          transform: `translate(${a.value.x}, ${a.value.y})`
        }, [
          h("rect", {
            x: -a.value.width / 2,
            y: -a.value.height - 10,
            width: a.value.width,
            height: a.value.height,
            fill: i.value.tooltipBg,
            rx: "8",
            stroke: i.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, Nu),
          h("text", {
            x: "0",
            y: -a.value.height + 8,
            "text-anchor": "middle",
            fill: i.value.tooltipText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, w(a.value.title), 9, Vu),
          h("text", {
            x: "0",
            y: -a.value.height + 26,
            "text-anchor": "middle",
            fill: i.value.tooltipTextSecondary,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, w(a.value.text), 9, ju)
        ], 8, Hu)) : I("", !0),
        (_(!0), k(K, null, lt(N.value, (z, Y) => (_(), k("line", {
          key: `grid-${Y}`,
          x1: e.chartMargin,
          y1: z.y,
          x2: e.chartWidth - e.chartMargin,
          y2: z.y,
          stroke: i.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Yu))), 128)),
        h("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: i.value.axis,
          "stroke-width": "2"
        }, null, 8, Uu),
        h("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: i.value.axis
        }, null, 8, qu),
        (_(!0), k(K, null, lt(N.value, (z, Y) => (_(), k(K, {
          key: `y-tick-${Y}`
        }, [
          h("line", {
            x1: e.chartMargin - 6,
            y1: z.y,
            x2: e.chartMargin,
            y2: z.y,
            stroke: i.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Xu),
          h("text", {
            x: e.chartMargin - 12,
            y: z.y + 4,
            "text-anchor": "end",
            fill: i.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, w(z.value), 9, Ku)
        ], 64))), 128)),
        h("text", {
          x: e.chartMargin - 35,
          y: e.chartHeight / 2,
          "text-anchor": "middle",
          fill: i.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif",
          transform: `rotate(-90, ${e.chartMargin - 35}, ${e.chartHeight / 2})`
        }, " Count ", 8, Gu),
        h("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: i.value.axis,
          "stroke-width": "2"
        }, null, 8, Qu),
        h("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: i.value.axis
        }, null, 8, Zu),
        (_(!0), k(K, null, lt(p.value, (z, Y) => (_(), k(K, {
          key: `tick-${Y}`
        }, [
          h("line", {
            x1: z.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: z.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: i.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Ju),
          h("text", {
            x: z.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: i.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, w(z.score), 9, tf)
        ], 64))), 128)),
        h("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: i.value.labelText,
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
        }, null, 8, sf)) : I("", !0),
        (_(!0), k(K, null, lt(p.value, (z, Y) => (_(), k("rect", {
          key: `bar-${Y}`,
          x: z.x - l.value / 2,
          y: z.y,
          width: l.value,
          height: z.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (Q) => B(Q, z),
          onMouseleave: J,
          style: { cursor: "pointer" }
        }, null, 40, nf))), 128)),
        m.value ? (_(), k("line", {
          key: 2,
          x1: m.value,
          y1: e.chartMargin,
          x2: m.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, af)) : I("", !0),
        m.value ? (_(), k("text", {
          key: 3,
          x: m.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + w(S.value.toFixed(1)), 9, of)) : I("", !0),
        v.value ? (_(), k("line", {
          key: 4,
          x1: v.value,
          y1: e.chartMargin,
          x2: v.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, rf)) : I("", !0),
        v.value ? (_(), k("text", {
          key: 5,
          x: v.value,
          y: L("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + w(C.value.toFixed(1)), 9, lf)) : I("", !0),
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
        }, null, 8, cf)) : I("", !0),
        y.value ? (_(), k("text", {
          key: 7,
          x: y.value,
          y: L("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + w(D.value.toFixed(1)), 9, df)) : I("", !0),
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
        }, null, 8, hf)) : I("", !0),
        M.value ? (_(), k("text", {
          key: 9,
          x: M.value,
          y: L("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + w(F.value.toFixed(1)), 9, uf)) : I("", !0),
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
        }, null, 8, ff)) : I("", !0),
        x.value ? (_(), k("text", {
          key: 11,
          x: x.value,
          y: L("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + w(P.value.toFixed(1)), 9, gf)) : I("", !0),
        b.value ? (_(), k("line", {
          key: 12,
          x1: b.value,
          y1: e.chartMargin,
          x2: b.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, pf)) : I("", !0),
        b.value ? (_(), k("text", {
          key: 13,
          x: b.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + w($.value.toFixed(1)), 9, mf)) : I("", !0),
        e.showLegend ? (_(), k("g", {
          key: 14,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          h("g", vf, [
            O[0] || (O[0] = h("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#8b5cf6",
              "stroke-width": "2.5"
            }, null, -1)),
            h("text", {
              x: "24",
              y: "4",
              fill: i.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Gaussian ", 8, yf)
          ]),
          h("g", _f, [
            O[1] || (O[1] = h("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#5d4b93",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            h("text", {
              x: "24",
              y: "4",
              fill: i.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, xf)
          ]),
          h("g", kf, [
            O[2] || (O[2] = h("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#a855f7",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            h("text", {
              x: "24",
              y: "4",
              fill: i.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, Mf)
          ]),
          h("g", Sf, [
            O[3] || (O[3] = h("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#8b5cf6",
              "stroke-width": "3",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            h("text", {
              x: "24",
              y: "4",
              fill: i.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, wf)
          ]),
          h("g", Cf, [
            O[4] || (O[4] = h("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            h("text", {
              x: "24",
              y: "4",
              fill: i.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, $f)
          ]),
          h("g", Df, [
            O[5] || (O[5] = h("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#7c3aed",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            h("text", {
              x: "24",
              y: "4",
              fill: i.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, Af)
          ]),
          h("g", Tf, [
            O[6] || (O[6] = h("line", {
              x1: "0",
              y1: "0",
              x2: "20",
              y2: "0",
              stroke: "#C67DFF",
              "stroke-width": "2.5",
              "stroke-dasharray": "6,4"
            }, null, -1)),
            h("text", {
              x: "24",
              y: "4",
              fill: i.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Ff)
          ])
        ], 8, bf)) : I("", !0)
      ], 44, Wu))
    ]));
  }
}), Ya = /* @__PURE__ */ G(Pf, [["__scopeId", "data-v-e67a4773"]]), Bf = { class: "chart-container" }, Lf = {
  key: 1,
  class: "chart-wrapper"
}, Of = /* @__PURE__ */ st({
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
    bn.use([Za, Ja, to, eo]);
    const s = e, { isDark: n, colors: i } = it(nt(s, "theme")), a = wt(null), o = wt(!0), r = wt(!1);
    let l = null;
    const c = {
      animation: { duration: 1e3, easing: "cubicOut" },
      margins: { left: "2%", right: "2%", top: "2%", bottom: "2%" },
      node: { width: 70, gap: 20, align: "left", iterations: 64 },
      style: {
        shadowBlur: 4,
        shadowColor: "rgba(139, 92, 246, 0.15)"
      }
    }, d = [
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
        (C) => C.source && C.target && typeof C.value == "number"
      ), M = Math.max(...x.map((C) => C.value), 1), S = Math.max(1, M * 0.01), $ = x.map((C) => ({
        ...C,
        originalValue: C.value,
        value: C.value < M * 0.01 ? S : C.value
      }));
      return {
        nodes: s.data.nodes.filter((C) => C.name),
        links: $
      };
    }, f = (x) => x.map((M, S) => ({
      ...M,
      itemStyle: {
        color: s.nodeColors[M.name] || d[S % d.length],
        borderRadius: 8
      }
    })), p = (x) => (M) => {
      const S = M.dataType === "node", $ = i.value.tooltipText, C = n.value ? "#d1d5db" : "#e2e8f0";
      if (S) {
        const L = x.filter((E) => E.target === M.name), N = x.filter((E) => E.source === M.name), B = L.length > 0 ? L.reduce((E, j) => E + (j.originalValue || j.value), 0) : N.reduce((E, j) => E + (j.originalValue || j.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${$};">${M.name}</div><div style="color: ${C}; font-size: 12px;">Count: ${B.toLocaleString()}</div>`;
      }
      const D = M.data?.source || M.source || "Unknown", P = M.data?.target || M.target || "Unknown", F = M.data?.originalValue || M.data?.value || M.value || 0, R = M.data?.label || `${F.toLocaleString()}`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${$};">${D} → ${P}</div><div style="color: ${C}; font-size: 12px;">Flow: ${R}</div>`;
    }, g = () => {
      if (!(!l || !s.data.nodes?.length || !s.data.links?.length))
        try {
          const { nodes: x, links: M } = u(), S = f(x), $ = {
            tooltip: {
              trigger: "item",
              triggerOn: "mousemove",
              formatter: p(M),
              backgroundColor: i.value.tooltipBg,
              borderColor: n.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
              borderWidth: 1,
              borderRadius: 8,
              padding: [10, 14],
              textStyle: {
                color: i.value.tooltipText,
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
                data: S,
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
                  formatter: (C) => {
                    const D = C.name || "";
                    return D.length > 15 ? `${D.substring(0, 15)}...` : D;
                  }
                },
                edgeLabel: {
                  show: !0,
                  fontSize: 11,
                  color: i.value.textSecondary,
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  formatter: (C) => {
                    const D = C.data?.originalValue || C.value || 0;
                    return C.data?.label || `${D.toLocaleString()}`;
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
          l.setOption($);
        } catch (x) {
          console.error("Error setting Sankey chart options:", x), r.value = !0;
        }
    }, m = async () => {
      if (a.value)
        try {
          l = bn.init(a.value), g(), window.addEventListener("resize", v);
        } catch (x) {
          console.error("Error initializing Sankey chart:", x), r.value = !0;
        } finally {
          o.value = !1;
        }
    }, b = async (x = 40) => {
      await Yi();
      for (let M = 0; M < x; M++) {
        if (a.value?.clientWidth && a.value.clientWidth > 0 && a.value?.clientHeight && a.value.clientHeight > 0)
          return await m();
        await new Promise((S) => setTimeout(S, 50));
      }
      await m(), setTimeout(v, 50);
    }, v = () => l?.resize(), y = () => {
      window.removeEventListener("resize", v), l && (l.dispose(), l = null);
    };
    return qs(() => a.value && b()), Ga(y), ue(() => s.data, g, { deep: !0 }), ue(n, g), t({ isDark: n }), (x, M) => (_(), k("div", Bf, [
      r.value ? (_(), k("div", {
        key: 0,
        class: "error-state",
        style: Dt({ height: e.height })
      }, [...M[0] || (M[0] = [
        X('<div class="error-content" data-v-e8598dd9><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e8598dd9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-e8598dd9></path></svg><p class="error-title" data-v-e8598dd9>Chart could not be loaded</p><p class="error-description" data-v-e8598dd9>Please check the data format.</p></div>', 1)
      ])], 4)) : (_(), k("div", Lf, [
        pn(h("div", {
          ref_key: "chartEl",
          ref: a,
          class: "chart-content",
          style: Dt({ height: e.height })
        }, null, 4), [
          [mn, !o.value]
        ]),
        pn(h("div", {
          class: "loading-state",
          style: Dt({ height: e.height })
        }, [...M[1] || (M[1] = [
          X('<div class="loading-container" data-v-e8598dd9><div class="sankey-loader" data-v-e8598dd9><div class="flow flow-1" data-v-e8598dd9></div><div class="flow flow-2" data-v-e8598dd9></div><div class="flow flow-3" data-v-e8598dd9></div><div class="flow flow-4" data-v-e8598dd9></div></div><p class="loading-text" data-v-e8598dd9>Loading Sankey diagram...</p></div>', 1)
        ])], 4), [
          [mn, o.value]
        ])
      ]))
    ]));
  }
}), ae = /* @__PURE__ */ G(Of, [["__scopeId", "data-v-e8598dd9"]]);
function Ef(e, t) {
  return _(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    h("path", {
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
    h("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
    })
  ]);
}
function Ft(e, t) {
  return _(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    h("path", {
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
    h("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
    }),
    h("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
    })
  ]);
}
function zi(e, t) {
  return _(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    h("path", {
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
    h("path", {
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
    h("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
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
    h("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
    })
  ]);
}
const Nf = { class: "chart-footer" }, Vf = { class: "export-actions" }, jf = { class: "export-buttons" }, Yf = ["disabled"], Uf = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, qf = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Xf = ["disabled"], Kf = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Gf = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Qf = /* @__PURE__ */ st({
  __name: "FooterExport",
  props: {
    formats: { default: () => ["pdf", "csv"] },
    loading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const s = e, n = t, i = (o) => s.formats.includes(o), a = (o) => {
      s.loading || n("export", o);
    };
    return (o, r) => (_(), k("footer", Nf, [
      r[9] || (r[9] = h("div", { class: "footer-divider" }, null, -1)),
      h("div", Vf, [
        r[8] || (r[8] = h("span", { class: "export-label" }, "Export", -1)),
        h("div", jf, [
          i("pdf") ? (_(), k("button", {
            key: 0,
            type: "button",
            class: ns(["export-btn", { "is-loading": e.loading }]),
            disabled: e.loading,
            title: "Download PDF",
            onClick: r[0] || (r[0] = (l) => a("pdf"))
          }, [
            e.loading ? (_(), k("svg", Uf, [...r[2] || (r[2] = [
              h("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                "stroke-opacity": "0.25"
              }, null, -1),
              h("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
            ])])) : (_(), k("svg", qf, [...r[3] || (r[3] = [
              X('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-672661d4></path><polyline points="14 2 14 8 20 8" data-v-672661d4></polyline><line x1="16" y1="13" x2="8" y2="13" data-v-672661d4></line><line x1="16" y1="17" x2="8" y2="17" data-v-672661d4></line><polyline points="10 9 9 9 8 9" data-v-672661d4></polyline>', 5)
            ])])),
            r[4] || (r[4] = h("span", null, "PDF", -1))
          ], 10, Yf)) : I("", !0),
          i("csv") ? (_(), k("button", {
            key: 1,
            type: "button",
            class: ns(["export-btn", { "is-loading": e.loading }]),
            disabled: e.loading,
            title: "Download CSV",
            onClick: r[1] || (r[1] = (l) => a("csv"))
          }, [
            e.loading ? (_(), k("svg", Kf, [...r[5] || (r[5] = [
              h("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                "stroke-opacity": "0.25"
              }, null, -1),
              h("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
            ])])) : (_(), k("svg", Gf, [...r[6] || (r[6] = [
              h("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }, null, -1),
              h("polyline", { points: "14 2 14 8 20 8" }, null, -1),
              h("line", {
                x1: "12",
                y1: "18",
                x2: "12",
                y2: "12"
              }, null, -1),
              h("line", {
                x1: "9",
                y1: "15",
                x2: "15",
                y2: "15"
              }, null, -1)
            ])])),
            r[7] || (r[7] = h("span", null, "CSV", -1))
          ], 10, Xf)) : I("", !0)
        ])
      ])
    ]));
  }
}), _t = /* @__PURE__ */ G(Qf, [["__scopeId", "data-v-672661d4"]]), Zf = { class: "agents-per-day-card" }, Jf = {
  key: 0,
  class: "card-body"
}, tg = {
  key: 0,
  class: "chart-section"
}, eg = {
  key: 1,
  class: "empty-state"
}, sg = { class: "empty-state-content" }, ng = { class: "empty-icon-wrapper" }, ig = {
  key: 1,
  class: "loading-state"
}, ag = /* @__PURE__ */ st({
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
    }, i = e, a = s, o = (f) => {
      a("export", f);
    }, { isDark: r, colors: l } = it(nt(i, "theme")), c = (f) => {
      const p = new Date(f), g = String(p.getDate()).padStart(2, "0"), m = String(p.getMonth() + 1).padStart(2, "0");
      return `${g}-${m}`;
    }, d = A(() => {
      const f = i.data?.agents_by_day || {}, p = Object.keys(f).sort();
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const g = p.map((x) => c(x)), m = /* @__PURE__ */ new Set();
      for (const x of Object.values(f))
        for (const M of Object.keys(x))
          m.add(M);
      const b = Array.from(m), v = (x) => x, y = b.map((x) => ({
        label: x,
        data: p.map((M) => f[M]?.[x] || 0),
        backgroundColor: `${n[x] || "#94a3b8"}80`,
        borderColor: v(n[x] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: g,
        datasets: y
      };
    }), u = A(() => i.options ? i.options : {
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
    return t({ isDark: r }), (f, p) => (_(), k("article", Zf, [
      p[3] || (p[3] = h("header", { class: "card-header" }, [
        h("div", { class: "header-content" }, [
          h("h3", { class: "card-title" }, "Agents Total Messages per Day"),
          h("p", { class: "card-subtitle" }, "Daily agent interactions (stacked)")
        ])
      ], -1)),
      e.loading ? (_(), k("div", ig, [...p[2] || (p[2] = [
        X('<div class="loading-container" data-v-4d18c22c><div class="chart-lines-loader" data-v-4d18c22c><div class="line line-1" data-v-4d18c22c></div><div class="line line-2" data-v-4d18c22c></div><div class="line line-3" data-v-4d18c22c></div><div class="line line-4" data-v-4d18c22c></div><div class="line line-5" data-v-4d18c22c></div></div><p class="loading-text" data-v-4d18c22c>Loading chart data...</p></div>', 1)
      ])])) : (_(), k("div", Jf, [
        d.value.labels && d.value.labels.length ? (_(), k("section", tg, [
          U(pe, {
            data: d.value,
            options: u.value,
            stacked: !0
          }, null, 8, ["data", "options"]),
          e.enableExport ? (_(), gt(T(_t), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (_(), k("section", eg, [
          h("div", sg, [
            h("div", ng, [
              U(T(Ft), { class: "empty-icon" })
            ]),
            p[0] || (p[0] = h("p", { class: "empty-title" }, "No agents data per day", -1)),
            p[1] || (p[1] = h("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see daily agent interactions.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), og = /* @__PURE__ */ G(ag, [["__scopeId", "data-v-4d18c22c"]]), H = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), rt = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), rg = { class: "booking-manager-card" }, lg = { class: "card-header" }, cg = { class: "header-content" }, dg = {
  key: 0,
  class: "payment-success-badge"
}, hg = { class: "badge-value" }, ug = {
  key: 0,
  class: "loading-state"
}, fg = {
  key: 1,
  class: "error-state"
}, gg = { class: "error-content" }, pg = { class: "error-description" }, mg = {
  key: 2,
  class: "card-body"
}, bg = { class: "chart-section" }, vg = { class: "chart-wrapper" }, yg = {
  key: 0,
  class: "table-section"
}, _g = { class: "table-wrapper" }, xg = { class: "data-table" }, kg = { class: "table-body" }, Mg = { class: "table-cell font-medium" }, Sg = { class: "table-cell text-center" }, wg = { class: "table-cell text-center" }, Cg = { class: "percentage-text" }, $g = { class: "table-cell text-center" }, Dg = { class: "table-cell" }, Ag = { class: "badges-container" }, Tg = { class: "badge badge-success" }, Fg = { class: "badge badge-error" }, Pg = { class: "table-cell" }, Bg = { class: "badges-container" }, Lg = { class: "badge badge-error" }, Og = { class: "badge badge-warning" }, Eg = { class: "badge badge-yellow" }, Rg = { class: "badge badge-error" }, Ig = {
  key: 1,
  class: "empty-state"
}, zg = /* @__PURE__ */ st({
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
    const s = e, n = t, i = (c) => {
      n("export", c);
    }, a = A(() => s.data?.booking_manager_by_day ? [...s.data.booking_manager_by_day].sort(
      (c, d) => new Date(c.date).getTime() - new Date(d.date).getTime()
    ) : []), o = A(() => {
      const c = s.data, d = c.total_booking_initiated || 0, u = c.total_booking_started || 0, f = c.total_payment_initiated || 0, p = c.total_not_found || 0, g = c.total_cancelled || 0, m = c.total_no_pending_balance || 0, b = c.total_errors || 0, v = c.total_payment_success || 0, y = c.total_payment_failed || 0, x = Math.max(0, d - u), M = Math.max(0, u - f - p - g - m - b), S = (D, P) => {
        const F = P > 0 ? Math.round(D / P * 100) : 0;
        return `${D.toLocaleString()} (${F}%)`;
      }, $ = [
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
      ], C = [];
      return u > 0 && C.push({
        source: "Initiated",
        target: "Started",
        value: u,
        label: S(u, d)
      }), x > 0 && C.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: x,
        label: S(x, d)
      }), f > 0 && C.push({
        source: "Started",
        target: "Payment Initiated",
        value: f,
        label: S(f, u)
      }), p > 0 && C.push({
        source: "Started",
        target: "Not Found",
        value: p,
        label: S(p, u)
      }), g > 0 && C.push({
        source: "Started",
        target: "Cancelled",
        value: g,
        label: S(g, u)
      }), m > 0 && C.push({
        source: "Started",
        target: "No Pending Balance",
        value: m,
        label: S(m, u)
      }), b > 0 && C.push({
        source: "Started",
        target: "Errors",
        value: b,
        label: S(b, u)
      }), M > 0 && C.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: M,
        label: S(M, u)
      }), v > 0 && C.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: v,
        label: S(v, f)
      }), y > 0 && C.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: y,
        label: S(y, f)
      }), { nodes: $, links: C };
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
    }, l = (c, d) => !d || d === 0 ? "0%" : `${Math.round(c / d * 100)}%`;
    return (c, d) => (_(), k("article", rg, [
      h("header", lg, [
        h("div", cg, [
          d[1] || (d[1] = h("div", { class: "title-section" }, [
            h("h3", { class: "card-title" }, "Booking Manager Metrics"),
            h("p", { class: "card-subtitle" }, "Booking manager workflow tracking and analysis")
          ], -1)),
          s.loading ? I("", !0) : (_(), k("div", dg, [
            d[0] || (d[0] = h("p", { class: "badge-label" }, "Payment Success", -1)),
            h("p", hg, w(T(H)(s.data.total_payment_success || 0)), 1)
          ]))
        ])
      ]),
      s.loading ? (_(), k("div", ug, [...d[2] || (d[2] = [
        X('<div class="loading-container" data-v-dff9dd25><div class="chart-flow-loader" data-v-dff9dd25><div class="flow-line flow-1" data-v-dff9dd25></div><div class="flow-line flow-2" data-v-dff9dd25></div><div class="flow-line flow-3" data-v-dff9dd25></div><div class="flow-line flow-4" data-v-dff9dd25></div><div class="flow-line flow-5" data-v-dff9dd25></div></div><p class="loading-text" data-v-dff9dd25>Loading booking data...</p></div>', 1)
      ])])) : s.error ? (_(), k("div", fg, [
        h("div", gg, [
          d[3] || (d[3] = h("div", { class: "error-icon-wrapper" }, [
            h("svg", {
              class: "error-icon",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [
              h("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              })
            ])
          ], -1)),
          d[4] || (d[4] = h("p", { class: "error-title" }, "Error loading data", -1)),
          h("p", pg, w(s.error), 1)
        ])
      ])) : (_(), k("div", mg, [
        h("section", bg, [
          h("div", vg, [
            U(ae, {
              data: o.value,
              "node-colors": r,
              height: "500px",
              "node-gap": 15
            }, null, 8, ["data"])
          ])
        ]),
        a.value.length > 0 ? (_(), k("section", yg, [
          d[6] || (d[6] = h("div", { class: "section-header" }, [
            h("h4", { class: "section-title" }, "Daily Overview")
          ], -1)),
          h("div", _g, [
            h("table", xg, [
              d[5] || (d[5] = h("thead", null, [
                h("tr", { class: "table-header-row" }, [
                  h("th", { class: "table-header" }, "Date"),
                  h("th", { class: "table-header" }, "Initiated"),
                  h("th", { class: "table-header" }, "Started"),
                  h("th", { class: "table-header" }, "Payment Initiated"),
                  h("th", { class: "table-header" }, "Payment Results"),
                  h("th", { class: "table-header" }, "Outcomes")
                ])
              ], -1)),
              h("tbody", kg, [
                (_(!0), k(K, null, lt(a.value, (u) => (_(), k("tr", {
                  key: u.date,
                  class: "table-row"
                }, [
                  h("td", Mg, w(T(Xt)(u.date).format("DD/MM/YYYY")), 1),
                  h("td", Sg, w(T(H)(u.booking_initiated_count)), 1),
                  h("td", wg, [
                    is(w(T(H)(u.booking_started_count)) + " ", 1),
                    h("span", Cg, " (" + w(l(u.booking_started_count, u.booking_initiated_count)) + ") ", 1)
                  ]),
                  h("td", $g, w(T(H)(u.payment_initiated_count)), 1),
                  h("td", Dg, [
                    h("div", Ag, [
                      h("span", Tg, " Success: " + w(u.payment_success_count ? T(H)(u.payment_success_count) : "N/A"), 1),
                      h("span", Fg, " Failed: " + w(u.payment_failed_count ? T(H)(u.payment_failed_count) : "N/A"), 1)
                    ])
                  ]),
                  h("td", Pg, [
                    h("div", Bg, [
                      h("span", Lg, " Not Found: " + w(u.not_found_count ? T(H)(u.not_found_count) : "N/A"), 1),
                      h("span", Og, " Cancelled: " + w(u.cancelled_count ? T(H)(u.cancelled_count) : "N/A"), 1),
                      h("span", Eg, " No Balance: " + w(u.no_pending_balance_count ? T(H)(u.no_pending_balance_count) : "N/A"), 1),
                      h("span", Rg, " Errors: " + w(u.error_count ? T(H)(u.error_count) : "N/A"), 1)
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (_(), gt(T(_t), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (_(), k("section", Ig, [...d[7] || (d[7] = [
          X('<div class="empty-state-content" data-v-dff9dd25><div class="empty-icon-wrapper" data-v-dff9dd25><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-dff9dd25><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" data-v-dff9dd25></path></svg></div><p class="empty-title" data-v-dff9dd25>No booking manager data available</p><p class="empty-description" data-v-dff9dd25>No booking manager data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Wg = /* @__PURE__ */ G(zg, [["__scopeId", "data-v-dff9dd25"]]), Hg = { class: "checkin-metrics-card" }, Ng = {
  key: 0,
  class: "loading-state"
}, Vg = {
  key: 1,
  class: "card-body"
}, jg = {
  key: 0,
  class: "chart-section"
}, Yg = { class: "chart-wrapper" }, Ug = {
  key: 1,
  class: "table-section"
}, qg = { class: "table-wrapper" }, Xg = { class: "data-table" }, Kg = { class: "table-body" }, Gg = { class: "table-cell font-medium" }, Qg = { class: "table-cell text-center" }, Zg = { class: "table-cell text-center" }, Jg = { class: "table-cell text-center" }, tp = { class: "table-cell text-center" }, ep = { class: "table-cell text-center" }, sp = { class: "table-cell text-center" }, np = { class: "table-cell text-left" }, ip = {
  key: 0,
  class: "failed-steps"
}, ap = { class: "step-name" }, op = { class: "step-count" }, rp = {
  key: 1,
  class: "empty-cell"
}, lp = {
  key: 2,
  class: "empty-state"
}, cp = {
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
    const s = t, n = (b) => {
      s("export", b);
    }, i = e, a = {
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
    }, r = wt([]), l = A(() => i.checkinData ?? a), c = A(() => i.failedData ?? o), d = A(() => {
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
      return (c.value.unrecovered_by_step || []).forEach((y) => {
        const M = y.step_name.replace(/_/g, " ").split(" ").map(($) => $.charAt(0).toUpperCase() + $.slice(1)).join(" "), S = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        b[M] = S[M] || "#DC2626";
      }), b;
    }), u = (b, v) => !v || v === 0 ? "0%" : `${Math.round(b / v * 100)}%`, f = (b, v) => {
      const y = H(b), x = u(b, v);
      return `${y} (${x})`;
    }, p = (b) => b.reduce((v, y) => v + y.failed_count, 0), g = A(() => {
      const b = [], v = [];
      if (!l.value.total_checkin_initiated)
        return { nodes: b, links: v };
      b.push({ name: "Checkin Init" }), b.push({ name: "Booking retrive" }), b.push({ name: "Booking retrive success" }), b.push({ name: "Number of Passengers" }), b.push({ name: "Completed" }), b.push({ name: "Closed with BP" });
      const y = l.value.total_checkin_initiated, x = l.value.total_checkin_init, M = l.value.total_checkin_init_abandoned, S = x - M, $ = l.value.total_checkin_started, C = l.value.total_checkin_completed, D = l.value.total_checkin_closed, P = c.value.unrecovered_by_step || [], F = P.reduce((B, E) => B + E.count, 0);
      if (console.log(JSON.stringify(l.value)), x > 0) {
        const B = Math.round(x / y * 100);
        v.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: x,
          label: `${x.toLocaleString()} (${B}%)`
        });
      }
      const R = y - x;
      if (R > 0) {
        const B = Math.round(R / y * 100);
        b.push({ name: "Abandoned (Init)" }), v.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: R,
          label: `${R.toLocaleString()} (${B}%)`
        });
      }
      if (M > 0) {
        const B = Math.round(M / y * 100);
        b.push({ name: "Abandoned (Started)" }), v.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: M,
          label: `${M.toLocaleString()} (${B}%)`
        });
      }
      if (S > 0) {
        const B = Math.round(S / y * 100);
        v.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: S,
          label: `${S.toLocaleString()} (${B}%)`
        });
      }
      if ($ > 0) {
        const B = Math.round($ / y * 100);
        v.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: $,
          label: `${$.toLocaleString()} (${B}%)`
        });
      }
      if (C > 0) {
        const B = Math.round(C / $ * 100);
        v.push({
          source: "Number of Passengers",
          target: "Completed",
          value: C,
          label: `${C.toLocaleString()} (${B}%)`
        });
      }
      if (P.length > 0 && F > 0) {
        b.push({ name: "Unrecovered" });
        const B = Math.round(F / $ * 100);
        v.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: F,
          label: `${F.toLocaleString()} (${B}%)`
        }), P.forEach((E) => {
          const J = E.step_name.replace(/_/g, " ").split(" ").map((O) => O.charAt(0).toUpperCase() + O.slice(1)).join(" "), W = Math.round(E.count / $ * 100);
          b.push({ name: J }), v.push({
            source: "Unrecovered",
            target: J,
            value: E.count,
            label: `${E.count.toLocaleString()} (${W}%)`
          });
        });
      }
      const L = $ - (C + F);
      if (L > 0) {
        const B = Math.round(L / $ * 100);
        b.push({ name: "Abandoned (Flow)" }), v.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: L,
          label: `${L.toLocaleString()} (${B}%)`
        });
      }
      const N = C - D;
      if (N > 0) {
        const B = Math.round(N / $ * 100);
        b.push({ name: "BP Error" }), v.push({
          source: "Completed",
          target: "BP Error",
          value: N,
          label: `${N.toLocaleString()} (${B}%)`
        });
      }
      if (D > 0) {
        const B = Math.round(D / $ * 100);
        v.push({
          source: "Completed",
          target: "Closed with BP",
          value: D,
          label: `${D.toLocaleString()} (${B}%)`
        });
      }
      return console.log(JSON.stringify(b)), console.log(JSON.stringify(v)), { nodes: b, links: v };
    }), m = () => {
      const b = l.value.checkin_by_day || [], v = c.value.failed_by_step_by_day || [];
      if (b.length === 0) {
        r.value = [];
        return;
      }
      r.value = [...b].map((y) => {
        const x = v.find(
          (M) => M.date === y.date
        );
        return {
          ...y,
          failed_steps: x?.steps || []
        };
      }), r.value.sort((y, x) => new Date(y.date) - new Date(x.date));
    };
    return ue(
      [() => i.checkinData, () => i.failedData],
      () => {
        m();
      },
      { deep: !0, immediate: !0 }
    ), (b, v) => (_(), k("article", Hg, [
      v[3] || (v[3] = h("header", { class: "card-header" }, [
        h("div", { class: "header-content" }, [
          h("h3", { class: "card-title" }, "Check-in Metrics"),
          h("p", { class: "card-subtitle" }, "Check-in performance and failure analysis")
        ])
      ], -1)),
      i.loading ? (_(), k("div", Ng, [...v[0] || (v[0] = [
        X('<div class="loading-container" data-v-306ad607><div class="chart-flow-loader" data-v-306ad607><div class="flow-line flow-1" data-v-306ad607></div><div class="flow-line flow-2" data-v-306ad607></div><div class="flow-line flow-3" data-v-306ad607></div><div class="flow-line flow-4" data-v-306ad607></div><div class="flow-line flow-5" data-v-306ad607></div></div><p class="loading-text" data-v-306ad607>Loading check-in data...</p></div>', 1)
      ])])) : (_(), k("div", Vg, [
        g.value.nodes.length > 0 ? (_(), k("section", jg, [
          h("div", Yg, [
            U(ae, {
              data: g.value,
              height: "500px",
              "node-colors": d.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : I("", !0),
        r.value && r.value.length > 0 ? (_(), k("section", Ug, [
          h("div", qg, [
            h("table", Xg, [
              v[1] || (v[1] = h("thead", null, [
                h("tr", { class: "table-header-row" }, [
                  h("th", { class: "table-header" }, "Date"),
                  h("th", { class: "table-header" }, "Checkin Init"),
                  h("th", { class: "table-header" }, "Booking Retrieve (%)"),
                  h("th", { class: "table-header" }, "Number of Passengers"),
                  h("th", { class: "table-header" }, "Completed (%)"),
                  h("th", { class: "table-header" }, "Closed with BP (%)"),
                  h("th", { class: "table-header" }, "Failed (%)"),
                  h("th", { class: "table-header" }, "Failed (Reasons)")
                ])
              ], -1)),
              h("tbody", Kg, [
                (_(!0), k(K, null, lt(r.value, (y) => (_(), k("tr", {
                  key: y.date,
                  class: "table-row"
                }, [
                  h("td", Gg, w(T(Xt)(y.date).format("DD/MM/YYYY")), 1),
                  h("td", Qg, w(T(H)(y.checkin_initiated_count)), 1),
                  h("td", Zg, w(f(y.checkin_init_count, y.checkin_initiated_count)), 1),
                  h("td", Jg, w(T(H)(y.checkin_started_count)), 1),
                  h("td", tp, w(f(y.checkin_completed_count, y.checkin_started_count)), 1),
                  h("td", ep, w(f(y.checkin_closed_count, y.checkin_started_count)), 1),
                  h("td", sp, w(f(p(y.failed_steps), y.checkin_started_count)), 1),
                  h("td", np, [
                    y.failed_steps && y.failed_steps.length > 0 ? (_(), k("div", ip, [
                      (_(!0), k(K, null, lt(y.failed_steps, (x) => (_(), k("div", {
                        key: x.step_name,
                        class: "failed-step-item"
                      }, [
                        h("span", ap, w(x.step_name.replace(/_/g, " ")) + ":", 1),
                        h("span", op, w(x.failed_count), 1)
                      ]))), 128))
                    ])) : (_(), k("div", rp, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (_(), gt(T(_t), {
            key: 0,
            onExport: n,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (_(), k("section", lp, [...v[2] || (v[2] = [
          X('<div class="empty-state-content" data-v-306ad607><div class="empty-icon-wrapper" data-v-306ad607><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-306ad607><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-306ad607></path></svg></div><p class="empty-title" data-v-306ad607>No check-in data available</p><p class="empty-description" data-v-306ad607>Try adjusting the date range or check your filters to see check-in performance data.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}, dp = /* @__PURE__ */ G(cp, [["__scopeId", "data-v-306ad607"]]), hp = { class: "checkin-metrics-card" }, up = {
  key: 0,
  class: "loading-state"
}, fp = {
  key: 1,
  class: "card-body"
}, gp = {
  key: 0,
  class: "sankey-section"
}, pp = {
  key: 1,
  class: "table-section"
}, mp = { class: "table-wrapper" }, bp = { class: "data-table" }, vp = { class: "table-body" }, yp = { class: "table-cell date-cell" }, _p = { class: "table-cell text-center" }, xp = { class: "table-cell text-center" }, kp = { class: "table-cell text-center" }, Mp = { class: "table-cell text-center" }, Sp = { class: "table-cell text-center" }, wp = { class: "table-cell text-center" }, Cp = { class: "table-cell reasons-cell" }, $p = {
  key: 0,
  class: "reasons-list"
}, Dp = { class: "reason-name" }, Ap = { class: "reason-count" }, Tp = {
  key: 1,
  class: "no-reasons"
}, Fp = {
  key: 2,
  class: "empty-state"
}, Pp = { class: "empty-state-content" }, Bp = { class: "empty-icon-wrapper" }, Lp = /* @__PURE__ */ st({
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
    const n = e, i = s, a = (b) => {
      i("export", b);
    }, { isDark: o } = it(nt(n, "theme")), r = (b) => b == null ? "0" : b.toLocaleString(), l = (b) => {
      const v = new Date(b), y = String(v.getDate()).padStart(2, "0"), x = String(v.getMonth() + 1).padStart(2, "0"), M = v.getFullYear();
      return `${y}/${x}/${M}`;
    }, c = (b) => b.replace(/_/g, " ").replace(/\b\w/g, (v) => v.toUpperCase()), d = (b, v) => !v || v === 0 ? "0%" : `${Math.round(b / v * 100)}%`, u = (b, v) => {
      const y = b || 0, x = v || 0, M = r(y), S = d(y, x);
      return `${M} (${S})`;
    }, f = (b) => b ? b.reduce((v, y) => v + y.failed_count, 0) : 0, p = A(() => {
      const b = {
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
        const M = y.step_name.replace(/_/g, " ").split(" ").map(($) => $.charAt(0).toUpperCase() + $.slice(1)).join(" "), S = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        b[M] = S[M] || "#DC2626";
      }), b;
    }), g = A(() => {
      const b = n.checkinData?.checkin_by_day || [], v = n.failedData?.failed_by_step_by_day || [];
      return b.map((x) => {
        const M = v.find((S) => S.date === x.date);
        return {
          ...x,
          failed_steps: M?.steps || []
        };
      }).sort((x, M) => new Date(x.date).getTime() - new Date(M.date).getTime());
    }), m = A(() => {
      const b = [], v = [];
      if (!n.checkinData?.total_checkin_initiated)
        return { nodes: b, links: v };
      b.push({ name: "Checkin Init" }), b.push({ name: "Booking retrive" }), b.push({ name: "Booking retrive success" }), b.push({ name: "Number of Passengers" }), b.push({ name: "Completed" }), b.push({ name: "Closed with BP" });
      const y = n.checkinData.total_checkin_initiated || 0, x = n.checkinData.total_checkin_init || 0, M = n.checkinData.total_checkin_init_abandoned || 0, S = x - M, $ = n.checkinData.total_checkin_started || 0, C = n.checkinData.total_checkin_completed || 0, D = n.checkinData.total_checkin_closed || 0, P = n.failedData?.unrecovered_by_step || [], F = P.reduce((B, E) => B + E.count, 0);
      if (x > 0) {
        const B = Math.round(x / y * 100);
        v.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: x,
          label: `${x.toLocaleString()} (${B}%)`
        });
      }
      const R = y - x;
      if (R > 0) {
        const B = Math.round(R / y * 100);
        b.push({ name: "Abandoned (Init)" }), v.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: R,
          label: `${R.toLocaleString()} (${B}%)`
        });
      }
      if (M > 0) {
        const B = Math.round(M / y * 100);
        b.push({ name: "Abandoned (Started)" }), v.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: M,
          label: `${M.toLocaleString()} (${B}%)`
        });
      }
      if (S > 0) {
        const B = Math.round(S / y * 100);
        v.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: S,
          label: `${S.toLocaleString()} (${B}%)`
        });
      }
      if ($ > 0) {
        const B = Math.round($ / y * 100);
        v.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: $,
          label: `${$.toLocaleString()} (${B}%)`
        });
      }
      if (C > 0) {
        const B = Math.round(C / $ * 100);
        v.push({
          source: "Number of Passengers",
          target: "Completed",
          value: C,
          label: `${C.toLocaleString()} (${B}%)`
        });
      }
      if (P.length > 0 && F > 0) {
        b.push({ name: "Unrecovered" });
        const B = Math.round(F / $ * 100);
        v.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: F,
          label: `${F.toLocaleString()} (${B}%)`
        }), P.forEach((E) => {
          const J = E.step_name.replace(/_/g, " ").split(" ").map((O) => O.charAt(0).toUpperCase() + O.slice(1)).join(" "), W = Math.round(E.count / $ * 100);
          b.push({ name: J }), v.push({
            source: "Unrecovered",
            target: J,
            value: E.count,
            label: `${E.count.toLocaleString()} (${W}%)`
          });
        });
      }
      const L = $ - (C + F);
      if (L > 0) {
        const B = Math.round(L / $ * 100);
        b.push({ name: "Abandoned (Flow)" }), v.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: L,
          label: `${L.toLocaleString()} (${B}%)`
        });
      }
      const N = C - D;
      if (N > 0) {
        const B = Math.round(N / $ * 100);
        b.push({ name: "BP Error" }), v.push({
          source: "Completed",
          target: "BP Error",
          value: N,
          label: `${N.toLocaleString()} (${B}%)`
        });
      }
      if (D > 0) {
        const B = Math.round(D / $ * 100);
        v.push({
          source: "Completed",
          target: "Closed with BP",
          value: D,
          label: `${D.toLocaleString()} (${B}%)`
        });
      }
      return { nodes: b, links: v };
    });
    return t({ isDark: o }), (b, v) => (_(), k("article", hp, [
      v[4] || (v[4] = h("header", { class: "card-header" }, [
        h("div", { class: "header-content" }, [
          h("h3", { class: "card-title" }, "Check-in Metrics"),
          h("p", { class: "card-subtitle" }, "Check-in performance and failure analysis")
        ])
      ], -1)),
      e.loading ? (_(), k("div", up, [...v[0] || (v[0] = [
        X('<div class="loading-container" data-v-8283d36d><div class="chart-bars-loader" data-v-8283d36d><div class="bar bar-1" data-v-8283d36d></div><div class="bar bar-2" data-v-8283d36d></div><div class="bar bar-3" data-v-8283d36d></div><div class="bar bar-4" data-v-8283d36d></div><div class="bar bar-5" data-v-8283d36d></div></div><p class="loading-text" data-v-8283d36d>Loading check-in data...</p></div>', 1)
      ])])) : (_(), k("div", fp, [
        m.value.nodes.length > 0 ? (_(), k("div", gp, [
          U(ae, {
            data: m.value,
            height: "500px",
            "node-colors": p.value,
            "use-gradient": !1,
            "node-gap": 30
          }, null, 8, ["data", "node-colors"])
        ])) : I("", !0),
        g.value && g.value.length > 0 ? (_(), k("div", pp, [
          h("div", mp, [
            h("table", bp, [
              v[1] || (v[1] = h("thead", null, [
                h("tr", { class: "table-header-row" }, [
                  h("th", { class: "table-header" }, "Date"),
                  h("th", { class: "table-header" }, "Checkin Init"),
                  h("th", { class: "table-header" }, "Booking Retrieve (%)"),
                  h("th", { class: "table-header" }, "Number of Passengers"),
                  h("th", { class: "table-header" }, "Completed (%)"),
                  h("th", { class: "table-header" }, "Closed with BP (%)"),
                  h("th", { class: "table-header" }, "Failed (%)"),
                  h("th", { class: "table-header" }, "Failed (Reasons)")
                ])
              ], -1)),
              h("tbody", vp, [
                (_(!0), k(K, null, lt(g.value, (y) => (_(), k("tr", {
                  key: y.date,
                  class: "table-row"
                }, [
                  h("td", yp, w(l(y.date)), 1),
                  h("td", _p, w(r(y.checkin_initiated_count)), 1),
                  h("td", xp, w(u(y.checkin_init_count, y.checkin_initiated_count)), 1),
                  h("td", kp, w(r(y.checkin_started_count)), 1),
                  h("td", Mp, w(u(y.checkin_completed_count, y.checkin_started_count)), 1),
                  h("td", Sp, w(u(y.checkin_closed_count, y.checkin_started_count)), 1),
                  h("td", wp, w(u(f(y.failed_steps), y.checkin_started_count)), 1),
                  h("td", Cp, [
                    y.failed_steps && y.failed_steps.length > 0 ? (_(), k("div", $p, [
                      (_(!0), k(K, null, lt(y.failed_steps, (x) => (_(), k("div", {
                        key: x.step_name,
                        class: "reason-item"
                      }, [
                        h("span", Dp, w(c(x.step_name)) + ":", 1),
                        h("span", Ap, w(x.failed_count), 1)
                      ]))), 128))
                    ])) : (_(), k("div", Tp, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (_(), gt(T(_t), {
            key: 0,
            onExport: a,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (_(), k("div", Fp, [
          h("div", Pp, [
            h("div", Bp, [
              U(T(Ft), { class: "empty-icon" })
            ]),
            v[2] || (v[2] = h("p", { class: "empty-title" }, "No check-in data available", -1)),
            v[3] || (v[3] = h("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see check-in metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Op = /* @__PURE__ */ G(Lp, [["__scopeId", "data-v-8283d36d"]]), Ep = { class: "checkin-segments-card" }, Rp = {
  key: 0,
  class: "loading-state"
}, Ip = {
  key: 1,
  class: "card-body"
}, zp = {
  key: 0,
  class: "table-section"
}, Wp = { class: "table-wrapper" }, Hp = { class: "data-table" }, Np = { class: "table-body" }, Vp = { class: "table-cell font-medium text-center" }, jp = { class: "airport-badge" }, Yp = { class: "table-cell text-center" }, Up = {
  key: 0,
  class: "airport-badge connection"
}, qp = {
  key: 1,
  class: "empty-connection"
}, Xp = { class: "table-cell text-center" }, Kp = { class: "airport-badge" }, Gp = { class: "table-cell text-center" }, Qp = {
  key: 0,
  class: "trip-badge roundtrip"
}, Zp = {
  key: 1,
  class: "trip-badge oneway"
}, Jp = { class: "table-cell text-center" }, t0 = { class: "table-cell text-center" }, e0 = { class: "percentage-value" }, s0 = { class: "table-cell text-center" }, n0 = { class: "percentage-value" }, i0 = { class: "table-cell text-center" }, a0 = { class: "percentage-value success" }, o0 = {
  key: 1,
  class: "empty-state"
}, r0 = /* @__PURE__ */ st({
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
    const n = e, i = s, a = (d) => {
      i("export", d);
    }, { isDark: o } = it(nt(n, "theme")), r = (d, u) => !u || u === 0 || !d ? "0%" : `${Math.round(d / u * 100)}%`, l = (d) => !d || d === "None" ? "-" : String(d).trim().replace(/_[0-9]+$/i, ""), c = (d) => {
      const u = l(d?.departure_airport), f = l(d?.arrival_airport);
      return u === "-" || f === "-" ? !1 : u === f;
    };
    return t({ isDark: o }), (d, u) => (_(), k("article", Ep, [
      u[5] || (u[5] = h("header", { class: "card-header" }, [
        h("div", { class: "header-content" }, [
          h("h3", { class: "card-title" }, "Checkin Segments"),
          h("p", { class: "card-subtitle" }, "Breakdown by flight segment with connection when applicable")
        ])
      ], -1)),
      n.loading ? (_(), k("div", Rp, [...u[0] || (u[0] = [
        X('<div class="loading-container" data-v-5f8ce8fa><div class="chart-flow-loader" data-v-5f8ce8fa><div class="flow-line flow-1" data-v-5f8ce8fa></div><div class="flow-line flow-2" data-v-5f8ce8fa></div><div class="flow-line flow-3" data-v-5f8ce8fa></div><div class="flow-line flow-4" data-v-5f8ce8fa></div><div class="flow-line flow-5" data-v-5f8ce8fa></div></div><p class="loading-text" data-v-5f8ce8fa>Loading segment data...</p></div>', 1)
      ])])) : (_(), k("div", Ip, [
        n.data.length > 0 ? (_(), k("section", zp, [
          h("div", Wp, [
            h("table", Hp, [
              u[3] || (u[3] = h("thead", null, [
                h("tr", { class: "table-header-row" }, [
                  h("th", { class: "table-header" }, "Departure"),
                  h("th", { class: "table-header" }, "Connection"),
                  h("th", { class: "table-header" }, "Arrival"),
                  h("th", { class: "table-header" }, "Trip"),
                  h("th", { class: "table-header" }, "Init"),
                  h("th", { class: "table-header" }, "Started (%)"),
                  h("th", { class: "table-header" }, "Completed (%)"),
                  h("th", { class: "table-header" }, "Closed (%)")
                ])
              ], -1)),
              h("tbody", Np, [
                (_(!0), k(K, null, lt(n.data, (f, p) => (_(), k("tr", {
                  key: p,
                  class: "table-row"
                }, [
                  h("td", Vp, [
                    h("span", jp, w(l(f.departure_airport)), 1)
                  ]),
                  h("td", Yp, [
                    l(f.conexion_airport) !== "-" ? (_(), k("span", Up, w(l(f.conexion_airport)), 1)) : (_(), k("span", qp, "-"))
                  ]),
                  h("td", Xp, [
                    h("span", Kp, w(l(f.arrival_airport)), 1)
                  ]),
                  h("td", Gp, [
                    c(f) ? (_(), k("span", Qp, [...u[1] || (u[1] = [
                      h("svg", {
                        class: "trip-icon",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        h("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        })
                      ], -1),
                      is(" Roundtrip ", -1)
                    ])])) : (_(), k("span", Zp, [...u[2] || (u[2] = [
                      h("svg", {
                        class: "trip-icon",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        h("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M14 5l7 7m0 0l-7 7m7-7H3"
                        })
                      ], -1),
                      is(" One way ", -1)
                    ])]))
                  ]),
                  h("td", Jp, w(T(H)(f.segment_init_count)), 1),
                  h("td", t0, [
                    h("span", e0, w(r(f.segment_started_count, f.segment_init_count)), 1)
                  ]),
                  h("td", s0, [
                    h("span", n0, w(r(f.segment_completed_count, f.segment_init_count)), 1)
                  ]),
                  h("td", i0, [
                    h("span", a0, w(r(f.segment_closed_count, f.segment_init_count)), 1)
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (_(), gt(T(_t), {
            key: 0,
            onExport: a,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (_(), k("section", o0, [...u[4] || (u[4] = [
          X('<div class="empty-state-content" data-v-5f8ce8fa><div class="empty-icon-wrapper" data-v-5f8ce8fa><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-5f8ce8fa><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-5f8ce8fa></path></svg></div><p class="empty-title" data-v-5f8ce8fa>No segment data available</p><p class="empty-description" data-v-5f8ce8fa>No flight segment data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), l0 = /* @__PURE__ */ G(r0, [["__scopeId", "data-v-5f8ce8fa"]]), c0 = { class: "disruption-metrics-card" }, d0 = { class: "card-header" }, h0 = { class: "header-content" }, u0 = {
  key: 0,
  class: "payment-success-badge"
}, f0 = { class: "badge-value" }, g0 = {
  key: 0,
  class: "loading-state"
}, p0 = {
  key: 1,
  class: "card-body"
}, m0 = { class: "chart-section" }, b0 = { class: "chart-wrapper" }, v0 = {
  key: 1,
  class: "empty-chart"
}, y0 = {
  key: 0,
  class: "table-section"
}, _0 = { class: "table-wrapper" }, x0 = { class: "data-table" }, k0 = { class: "table-body" }, M0 = { class: "table-cell font-medium text-center" }, S0 = { class: "table-cell text-center" }, w0 = { class: "table-cell text-center" }, C0 = { class: "percentage-text" }, $0 = { class: "table-cell text-center" }, D0 = { class: "abandoned-value" }, A0 = { class: "table-cell" }, T0 = { class: "badges-container badges-wrap" }, F0 = { class: "badge badge-vol" }, P0 = { class: "badge badge-confirm" }, B0 = { class: "badge badge-not-confirm" }, L0 = { class: "badge badge-reject" }, O0 = { class: "badge badge-not-paid" }, E0 = { class: "badge badge-success" }, R0 = { class: "table-cell" }, I0 = { class: "badges-container badges-wrap" }, z0 = { class: "badge badge-inv" }, W0 = { class: "badge badge-human" }, H0 = { class: "badge badge-accept" }, N0 = {
  key: 1,
  class: "empty-state"
}, V0 = /* @__PURE__ */ st({
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
    const s = e, n = t, i = (c) => {
      n("export", c);
    }, a = A(() => s.data?.disruption_by_day ? [...s.data.disruption_by_day].sort(
      (c, d) => new Date(c.date).getTime() - new Date(d.date).getTime()
    ) : []), o = (c, d) => !d || d === 0 ? "0%" : `${Math.round(c / d * 100)}%`, r = A(() => {
      const c = s.data, d = c.total_disruption_conversations || 0, u = c.total_disruption_initiated || 0, f = c.total_voluntary || 0, p = c.total_involuntary || 0, g = c.total_accepted || 0, m = c.total_confirmed || 0, b = c.total_sell_success || 0, v = c.total_sell_failed || 0, y = Math.max(0, d - u), x = Math.max(0, u - f - p), M = Math.max(0, p - g), S = Math.max(0, f - m), $ = v, C = Math.max(0, m - b - $), D = (R, L) => {
        const N = L > 0 ? Math.round(R / L * 100) : 0;
        return `${R.toLocaleString()} (${N}%)`;
      }, P = [
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
      ], F = [];
      return u > 0 && F.push({
        source: "Initiated",
        target: "Started",
        value: u,
        label: D(u, d)
      }), y > 0 && F.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: y,
        label: D(y, d)
      }), f > 0 && F.push({
        source: "Started",
        target: "Voluntary",
        value: f,
        label: D(f, d)
      }), p > 0 && F.push({
        source: "Started",
        target: "Involuntary",
        value: p,
        label: D(p, d)
      }), x > 0 && F.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: x,
        label: D(x, d)
      }), g > 0 && F.push({
        source: "Involuntary",
        target: "Accepted",
        value: g,
        label: D(g, d)
      }), M > 0 && F.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: M,
        label: D(M, d)
      }), m > 0 && F.push({
        source: "Voluntary",
        target: "Confirmed",
        value: m,
        label: D(m, d)
      }), S > 0 && F.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: S,
        label: D(S, d)
      }), b > 0 && F.push({
        source: "Confirmed",
        target: "Paid",
        value: b,
        label: D(b, d)
      }), $ > 0 && F.push({
        source: "Confirmed",
        target: "Rejected",
        value: $,
        label: D($, d)
      }), C > 0 && F.push({
        source: "Confirmed",
        target: "Not Paid",
        value: C,
        label: D(C, d)
      }), { nodes: P, links: F };
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
    return (c, d) => (_(), k("article", c0, [
      h("header", d0, [
        h("div", h0, [
          d[1] || (d[1] = h("div", { class: "title-section" }, [
            h("h3", { class: "card-title" }, "Disruption Metrics"),
            h("p", { class: "card-subtitle" }, "Disruption workflow performance and completion tracking")
          ], -1)),
          s.loading ? I("", !0) : (_(), k("div", u0, [
            d[0] || (d[0] = h("p", { class: "badge-label" }, "Payment Success", -1)),
            h("p", f0, w(T(H)(s.data.total_payment_success || 0)), 1)
          ]))
        ])
      ]),
      s.loading ? (_(), k("div", g0, [...d[2] || (d[2] = [
        X('<div class="loading-container" data-v-20b043d3><div class="chart-bars-loader" data-v-20b043d3><div class="bar bar-1" data-v-20b043d3></div><div class="bar bar-2" data-v-20b043d3></div><div class="bar bar-3" data-v-20b043d3></div><div class="bar bar-4" data-v-20b043d3></div><div class="bar bar-5" data-v-20b043d3></div></div><p class="loading-text" data-v-20b043d3>Loading disruption data...</p></div>', 1)
      ])])) : (_(), k("div", p0, [
        h("section", m0, [
          h("div", b0, [
            r.value.nodes.length > 0 && r.value.links.length > 0 ? (_(), gt(ae, {
              key: 0,
              data: r.value,
              "node-colors": l,
              height: "500px"
            }, null, 8, ["data"])) : (_(), k("div", v0, [...d[3] || (d[3] = [
              h("p", { class: "empty-chart-text" }, "No disruption data available for visualization", -1)
            ])]))
          ])
        ]),
        a.value && a.value.length > 0 ? (_(), k("section", y0, [
          d[5] || (d[5] = X('<div class="section-header" data-v-20b043d3><h4 class="section-title" data-v-20b043d3>Daily Overview</h4></div><div class="legend-container" data-v-20b043d3><p class="legend-title" data-v-20b043d3>Legend</p><div class="legend-items" data-v-20b043d3><div class="legend-group" data-v-20b043d3><span class="legend-label" data-v-20b043d3>Voluntary:</span><span class="badge badge-vol" data-v-20b043d3>VOL</span></div><div class="legend-group" data-v-20b043d3><span class="legend-label" data-v-20b043d3>Involuntary:</span><span class="badge badge-inv" data-v-20b043d3>INV</span></div><div class="legend-note" data-v-20b043d3><span data-v-20b043d3>Vol=Voluntary</span><span data-v-20b043d3>•</span><span data-v-20b043d3>Inv=Involuntary</span></div></div></div>', 2)),
          h("div", _0, [
            h("table", x0, [
              d[4] || (d[4] = h("thead", null, [
                h("tr", { class: "table-header-row" }, [
                  h("th", { class: "table-header" }, "Date"),
                  h("th", { class: "table-header" }, "Initiated"),
                  h("th", { class: "table-header" }, "Started"),
                  h("th", { class: "table-header" }, "Abandoned (%)"),
                  h("th", { class: "table-header" }, "Voluntary"),
                  h("th", { class: "table-header" }, "Involuntary")
                ])
              ], -1)),
              h("tbody", k0, [
                (_(!0), k(K, null, lt(a.value, (u) => (_(), k("tr", {
                  key: u.date,
                  class: "table-row"
                }, [
                  h("td", M0, w(T(Xt)(u.date).format("DD/MM")), 1),
                  h("td", S0, w(T(H)(u.disruption_conversations)), 1),
                  h("td", w0, [
                    is(w(T(H)(u.disruption_initiated_count)) + " ", 1),
                    h("span", C0, " (" + w(o(u.disruption_initiated_count, u.disruption_conversations)) + ") ", 1)
                  ]),
                  h("td", $0, [
                    h("span", D0, w(T(H)(u.disruption_initiated_count - u.voluntary_count - u.involuntary_count)) + " (" + w(o(u.disruption_initiated_count - u.voluntary_count - u.involuntary_count, u.disruption_conversations)) + ") ", 1)
                  ]),
                  h("td", A0, [
                    h("div", T0, [
                      h("span", F0, " VOL " + w(T(H)(u.voluntary_count)) + " (" + w(o(u.voluntary_count, u.disruption_conversations)) + ") ", 1),
                      h("span", P0, " Confirm " + w(T(H)(u.confirmed_count)) + " (" + w(o(u.confirmed_count, u.disruption_conversations)) + ") ", 1),
                      h("span", B0, " Not Confirm " + w(T(H)(u.voluntary_count - u.confirmed_count)) + " (" + w(o(u.voluntary_count - u.confirmed_count, u.disruption_conversations)) + ") ", 1),
                      h("span", L0, " Reject " + w(T(H)(u.sell_failed_count)) + " (" + w(o(u.sell_failed_count, u.disruption_conversations)) + ") ", 1),
                      h("span", O0, " Not Paid " + w(T(H)(Math.max(0, u.confirmed_count - u.sell_success_count - u.sell_failed_count))) + " (" + w(o(Math.max(0, u.confirmed_count - u.sell_success_count - u.sell_failed_count), u.disruption_conversations)) + ") ", 1),
                      h("span", E0, " Finish " + w(T(H)(u.sell_success_count)) + " (" + w(o(u.sell_success_count, u.disruption_conversations)) + ") ", 1)
                    ])
                  ]),
                  h("td", R0, [
                    h("div", I0, [
                      h("span", z0, " INV " + w(T(H)(u.involuntary_count)) + " (" + w(o(u.involuntary_count, u.disruption_conversations)) + ") ", 1),
                      h("span", W0, " Human " + w(T(H)(u.involuntary_count - u.accepted_count)) + " (" + w(o(u.involuntary_count - u.accepted_count, u.disruption_conversations)) + ") ", 1),
                      h("span", H0, " Accept " + w(T(H)(u.accepted_count)) + " (" + w(o(u.accepted_count, u.disruption_conversations)) + ") ", 1)
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (_(), gt(T(_t), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (_(), k("section", N0, [...d[6] || (d[6] = [
          X('<div class="empty-state-content" data-v-20b043d3><div class="empty-icon-wrapper" data-v-20b043d3><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-20b043d3><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" data-v-20b043d3></path></svg></div><p class="empty-title" data-v-20b043d3>No disruption data available</p><p class="empty-description" data-v-20b043d3>No disruption data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), j0 = /* @__PURE__ */ G(V0, [["__scopeId", "data-v-20b043d3"]]), Y0 = { class: "faq-metrics-card" }, U0 = {
  key: 0,
  class: "card-body"
}, q0 = { class: "kpi-grid" }, X0 = { class: "kpi-card" }, K0 = { class: "kpi-value" }, G0 = { class: "kpi-card" }, Q0 = { class: "kpi-value" }, Z0 = { class: "kpi-card" }, J0 = { class: "kpi-value" }, tm = { class: "kpi-card" }, em = { class: "kpi-value" }, sm = { class: "kpi-card" }, nm = { class: "kpi-value" }, im = {
  key: 0,
  class: "chart-section"
}, am = {
  key: 1,
  class: "empty-state"
}, om = {
  key: 1,
  class: "loading-state"
}, rm = /* @__PURE__ */ st({
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
    const n = e, i = s, a = (f) => {
      i("export", f);
    }, { isDark: o, colors: r } = it(nt(n, "theme")), l = wt({ labels: [], datasets: [] }), c = A(() => n.data ?? {
      total_faq_events: 0,
      total_documents_found: 0,
      total_airline_information_retrieved: 0,
      total_booking_info_retrieved: 0,
      total_flight_status_retrieved: 0,
      faq_by_day: []
    }), d = A(() => ({
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
      const p = f.faq_by_day || [];
      if (p.length > 0) {
        const g = p.map((y) => Xt(y.date).format("MMM DD")), m = p.map((y) => y.airline_information_retrieved_count || 0), b = p.map((y) => y.flight_status_retrieved_count || 0), v = p.map((y) => y.booking_info_retrieved_count || 0);
        l.value = {
          labels: g,
          datasets: [
            {
              label: "Airline Information",
              data: m,
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
              data: b,
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
              data: v,
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
    return ue(
      () => n.data,
      (f) => {
        u(f ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: o }), (f, p) => (_(), k("article", Y0, [
      p[7] || (p[7] = h("header", { class: "card-header" }, [
        h("div", { class: "header-content" }, [
          h("h3", { class: "card-title" }, "FAQ Metrics"),
          h("p", { class: "card-subtitle" }, "Daily FAQ consultation and retrieval metrics")
        ])
      ], -1)),
      n.loading ? (_(), k("div", om, [...p[6] || (p[6] = [
        X('<div class="loading-container" data-v-a0bf4731><div class="chart-bars-loader" data-v-a0bf4731><div class="bar bar-1" data-v-a0bf4731></div><div class="bar bar-2" data-v-a0bf4731></div><div class="bar bar-3" data-v-a0bf4731></div><div class="bar bar-4" data-v-a0bf4731></div><div class="bar bar-5" data-v-a0bf4731></div></div><p class="loading-text" data-v-a0bf4731>Loading FAQ metrics...</p></div>', 1)
      ])])) : (_(), k("div", U0, [
        h("div", q0, [
          h("div", X0, [
            p[0] || (p[0] = h("span", { class: "kpi-label" }, "Total FAQ", -1)),
            h("span", K0, w(T(H)(c.value.total_faq_events)), 1)
          ]),
          h("div", G0, [
            p[1] || (p[1] = h("span", { class: "kpi-label" }, "Documents Found", -1)),
            h("span", Q0, w(T(H)(c.value.total_documents_found)), 1)
          ]),
          h("div", Z0, [
            p[2] || (p[2] = h("span", { class: "kpi-label" }, "Airline Info", -1)),
            h("span", J0, w(T(H)(c.value.total_airline_information_retrieved)), 1)
          ]),
          h("div", tm, [
            p[3] || (p[3] = h("span", { class: "kpi-label" }, "Booking Info", -1)),
            h("span", em, w(T(H)(c.value.total_booking_info_retrieved)), 1)
          ]),
          h("div", sm, [
            p[4] || (p[4] = h("span", { class: "kpi-label" }, "Flight Status", -1)),
            h("span", nm, w(T(H)(c.value.total_flight_status_retrieved)), 1)
          ])
        ]),
        l.value.labels && l.value.labels.length ? (_(), k("section", im, [
          U(ve, {
            data: l.value,
            options: d.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (_(), gt(T(_t), {
            key: 0,
            onExport: a,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (_(), k("section", am, [...p[5] || (p[5] = [
          X('<div class="empty-state-content" data-v-a0bf4731><div class="empty-icon-wrapper" data-v-a0bf4731><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-a0bf4731><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-a0bf4731></path></svg></div><p class="empty-title" data-v-a0bf4731>No FAQ data available</p><p class="empty-description" data-v-a0bf4731>No FAQ consultation data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), lm = /* @__PURE__ */ G(rm, [["__scopeId", "data-v-a0bf4731"]]), cm = { class: "messages-per-agent-card" }, dm = {
  key: 0,
  class: "card-body"
}, hm = {
  key: 0,
  class: "chart-section"
}, um = {
  key: 1,
  class: "empty-state"
}, fm = { class: "empty-state-content" }, gm = { class: "empty-icon-wrapper" }, pm = {
  key: 1,
  class: "loading-state"
}, mm = /* @__PURE__ */ st({
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
    }, i = e, a = s, o = (u) => {
      a("export", u);
    }, { isDark: r, colors: l } = it(nt(i, "theme")), c = A(() => {
      const u = i.data?.agents_by_day || {}, f = Object.keys(u).sort();
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const p = /* @__PURE__ */ new Set();
      for (const b of Object.values(u))
        for (const v of Object.keys(b))
          p.add(v);
      const m = Array.from(p).map((b) => {
        const v = n[b] || "#94a3b8";
        return {
          label: b.charAt(0).toUpperCase() + b.slice(1).replace(/_/g, " "),
          data: f.map((y) => u[y]?.[b] || 0),
          borderColor: v,
          backgroundColor: `${v}20`,
          pointBackgroundColor: v,
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
        datasets: m
      };
    }), d = A(() => i.options ? i.options : {
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
    return t({ isDark: r }), (u, f) => (_(), k("article", cm, [
      f[3] || (f[3] = h("header", { class: "card-header" }, [
        h("div", { class: "header-content" }, [
          h("h3", { class: "card-title" }, "Messages per Agent"),
          h("p", { class: "card-subtitle" }, "Agent interaction trends over time")
        ])
      ], -1)),
      e.loading ? (_(), k("div", pm, [...f[2] || (f[2] = [
        X('<div class="loading-container" data-v-53a825f5><div class="chart-lines-loader" data-v-53a825f5><div class="line line-1" data-v-53a825f5></div><div class="line line-2" data-v-53a825f5></div><div class="line line-3" data-v-53a825f5></div><div class="line line-4" data-v-53a825f5></div><div class="line line-5" data-v-53a825f5></div></div><p class="loading-text" data-v-53a825f5>Loading chart data...</p></div>', 1)
      ])])) : (_(), k("div", dm, [
        c.value.labels && c.value.labels.length ? (_(), k("section", hm, [
          U(ve, {
            data: c.value,
            options: d.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (_(), gt(T(_t), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (_(), k("section", um, [
          h("div", fm, [
            h("div", gm, [
              U(T(Ft), { class: "empty-icon" })
            ]),
            f[0] || (f[0] = h("p", { class: "empty-title" }, "No agent interactions data", -1)),
            f[1] || (f[1] = h("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), bm = /* @__PURE__ */ G(mm, [["__scopeId", "data-v-53a825f5"]]), vm = { class: "record-locator-card" }, ym = {
  key: 0,
  class: "loading-state"
}, _m = {
  key: 1,
  class: "card-body"
}, xm = {
  key: 0,
  class: "chart-section"
}, km = { class: "chart-wrapper" }, Mm = {
  key: 1,
  class: "table-section"
}, Sm = { class: "table-wrapper" }, wm = { class: "data-table" }, Cm = { class: "table-header-row" }, $m = {
  key: 0,
  class: "table-header"
}, Dm = {
  key: 1,
  class: "table-header"
}, Am = { class: "table-body" }, Tm = { class: "table-cell font-medium" }, Fm = { class: "table-cell text-center" }, Pm = { class: "table-cell text-center" }, Bm = { class: "table-cell text-center" }, Lm = { class: "table-cell text-center" }, Om = { class: "table-cell text-center success-value" }, Em = { class: "table-cell text-center failed-value" }, Rm = { class: "table-cell text-center warning-value" }, Im = {
  key: 0,
  class: "table-cell text-center"
}, zm = {
  key: 1,
  class: "table-cell text-center failed-value"
}, Wm = {
  key: 2,
  class: "empty-state"
}, Hm = /* @__PURE__ */ st({
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
    const n = e, i = s, a = (p) => {
      i("export", p);
    }, { isDark: o } = it(nt(n, "theme")), r = A(() => n.data?.record_locator_by_day ? [...n.data.record_locator_by_day].sort(
      (p, g) => new Date(p.date).getTime() - new Date(g.date).getTime()
    ) : []), l = A(() => n.data), c = A(() => ({
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
    })), d = (p, g) => !g || g === 0 ? "0%" : `${Math.round(p / g * 100)}%`, u = (p, g) => {
      const m = H(p), b = d(p, g);
      return `${m} (${b})`;
    }, f = A(() => {
      const p = [], g = [];
      if (!l.value.total_checkin_initiated)
        return { nodes: p, links: g };
      p.push({ name: "Checkin Init" }), p.push({ name: "Booking retrive" }), p.push({ name: "Checkin Started" }), p.push({ name: "Checkin Completed" }), p.push({ name: "Checkin Closed" });
      const m = l.value.total_checkin_initiated, b = l.value.total_record_locator_init, v = l.value.total_record_locator_started, y = l.value.total_record_locator_completed, x = l.value.total_record_locator_closed, M = l.value.total_record_locator_failed, S = l.value.total_record_locator_abandoned, $ = l.value.total_record_locator_init_abandoned;
      if (b > 0) {
        const D = Math.round(b / m * 100);
        g.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: b,
          label: `${b.toLocaleString()} (${D}%)`
        });
      }
      const C = m - b;
      if (C > 0) {
        const D = Math.round(C / m * 100);
        p.push({ name: "Abandoned (Init)" }), g.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: C,
          label: `${C.toLocaleString()} (${D}%)`
        });
      }
      if (v > 0) {
        const D = Math.round(v / m * 100);
        g.push({
          source: "Booking retrive",
          target: "Checkin Started",
          value: v,
          label: `${v.toLocaleString()} (${D}%)`
        });
      }
      if ($ > 0) {
        const D = Math.round($ / m * 100);
        p.push({ name: "Abandoned (Started)" }), g.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: $,
          label: `${$.toLocaleString()} (${D}%)`
        });
      }
      if (y > 0) {
        const D = Math.round(y / v * 100);
        g.push({
          source: "Checkin Started",
          target: "Checkin Completed",
          value: y,
          label: `${y.toLocaleString()} (${D}%)`
        });
      }
      if (x > 0) {
        const D = Math.round(x / v * 100);
        g.push({
          source: "Checkin Completed",
          target: "Checkin Closed",
          value: x,
          label: `${x.toLocaleString()} (${D}%)`
        });
      }
      if (M > 0) {
        const D = Math.round(M / v * 100);
        p.push({ name: "Checkin Failed" }), g.push({
          source: "Checkin Started",
          target: "Checkin Failed",
          value: M,
          label: `${M.toLocaleString()} (${D}%)`
        });
      }
      if (S > 0) {
        const D = Math.round(S / v * 100);
        p.push({ name: "Abandoned (Flow)" }), g.push({
          source: "Checkin Started",
          target: "Abandoned (Flow)",
          value: S,
          label: `${S.toLocaleString()} (${D}%)`
        });
      }
      return { nodes: p, links: g };
    });
    return t({ isDark: o }), (p, g) => (_(), k("article", vm, [
      g[10] || (g[10] = h("header", { class: "card-header" }, [
        h("div", { class: "header-content" }, [
          h("h3", { class: "card-title" }, "Checkin by Record Locator Metrics"),
          h("p", { class: "card-subtitle" }, "Checkin by record locator retrieval and completion analysis")
        ])
      ], -1)),
      n.loading ? (_(), k("div", ym, [...g[0] || (g[0] = [
        X('<div class="loading-container" data-v-5230c23e><div class="chart-flow-loader" data-v-5230c23e><div class="flow-line flow-1" data-v-5230c23e></div><div class="flow-line flow-2" data-v-5230c23e></div><div class="flow-line flow-3" data-v-5230c23e></div><div class="flow-line flow-4" data-v-5230c23e></div><div class="flow-line flow-5" data-v-5230c23e></div></div><p class="loading-text" data-v-5230c23e>Loading record locator data...</p></div>', 1)
      ])])) : (_(), k("div", _m, [
        f.value.nodes.length > 0 ? (_(), k("section", xm, [
          h("div", km, [
            U(ae, {
              data: f.value,
              height: "500px",
              "node-colors": c.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : I("", !0),
        r.value && r.value.length > 0 ? (_(), k("section", Mm, [
          h("div", Sm, [
            h("table", wm, [
              h("thead", null, [
                h("tr", Cm, [
                  g[1] || (g[1] = h("th", { class: "table-header" }, "Date", -1)),
                  g[2] || (g[2] = h("th", { class: "table-header" }, "Checkin Init", -1)),
                  g[3] || (g[3] = h("th", { class: "table-header" }, "Booking Retrieve (%)", -1)),
                  g[4] || (g[4] = h("th", { class: "table-header" }, "Checkin Started", -1)),
                  g[5] || (g[5] = h("th", { class: "table-header" }, "Checkin Completed (%)", -1)),
                  g[6] || (g[6] = h("th", { class: "table-header" }, "Checkin Closed (%)", -1)),
                  g[7] || (g[7] = h("th", { class: "table-header" }, "Checkin Failed (%)", -1)),
                  g[8] || (g[8] = h("th", { class: "table-header" }, "Abandoned (%)", -1)),
                  n.isAvianca ? (_(), k("th", $m, "Create Payment")) : I("", !0),
                  n.isAvianca ? (_(), k("th", Dm, "Failed Payment")) : I("", !0)
                ])
              ]),
              h("tbody", Am, [
                (_(!0), k(K, null, lt(r.value, (m) => (_(), k("tr", {
                  key: m.date,
                  class: "table-row"
                }, [
                  h("td", Tm, w(T(Xt)(m.date).format("DD/MM/YYYY")), 1),
                  h("td", Fm, w(T(H)(m.checkin_initiated)), 1),
                  h("td", Pm, w(u(m.record_locator_init_count, m.checkin_initiated)), 1),
                  h("td", Bm, w(T(H)(m.record_locator_started_count)), 1),
                  h("td", Lm, w(u(m.record_locator_completed_count, m.record_locator_started_count)), 1),
                  h("td", Om, w(u(m.record_locator_closed_count, m.record_locator_started_count)), 1),
                  h("td", Em, w(u(m.record_locator_failed_count, m.record_locator_started_count)), 1),
                  h("td", Rm, w(u(m.record_locator_abandoned_count, m.record_locator_started_count)), 1),
                  n.isAvianca ? (_(), k("td", Im, w(T(H)(m.record_locator_create_payment_count)), 1)) : I("", !0),
                  n.isAvianca ? (_(), k("td", zm, w(T(H)(m.record_locator_create_payment_failed_count)), 1)) : I("", !0)
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (_(), gt(T(_t), {
            key: 0,
            onExport: a,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (_(), k("section", Wm, [...g[9] || (g[9] = [
          X('<div class="empty-state-content" data-v-5230c23e><div class="empty-icon-wrapper" data-v-5230c23e><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-5230c23e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" data-v-5230c23e></path></svg></div><p class="empty-title" data-v-5230c23e>No record locator data available</p><p class="empty-description" data-v-5230c23e>No record locator data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Nm = /* @__PURE__ */ G(Hm, [["__scopeId", "data-v-5230c23e"]]), Vm = { class: "seller-metrics-card" }, jm = { class: "card-header" }, Ym = { class: "header-content" }, Um = {
  key: 0,
  class: "stats-badge"
}, qm = { class: "badge-value" }, Xm = {
  key: 0,
  class: "loading-state"
}, Km = {
  key: 1,
  class: "card-body"
}, Gm = {
  key: 0,
  class: "chart-section"
}, Qm = { class: "chart-wrapper" }, Zm = {
  key: 1,
  class: "empty-state"
}, Jm = {
  key: 2,
  class: "table-section"
}, tb = { class: "table-wrapper" }, eb = { class: "data-table" }, sb = { class: "table-body" }, nb = { class: "table-cell font-medium" }, ib = { class: "table-cell text-center" }, ab = { class: "table-cell text-center" }, ob = { class: "table-cell text-center" }, rb = { class: "table-cell text-center" }, lb = { class: "table-cell text-center" }, cb = { class: "table-cell text-center success-value" }, db = { class: "table-cell text-left" }, hb = {
  key: 0,
  class: "failed-reasons"
}, ub = { class: "reason-name" }, fb = { class: "reason-count" }, gb = {
  key: 1,
  class: "empty-cell"
}, pb = /* @__PURE__ */ st({
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
    const n = e, i = s, a = (v) => {
      i("export", v);
    }, { isDark: o } = it(nt(n, "theme")), r = A(() => {
      if (!n.sellerData?.seller_by_day) return [];
      const v = [...n.sellerData.seller_by_day];
      return n.failedData?.failed_by_reason_by_day && n.failedData.failed_by_reason_by_day.forEach((y) => {
        const x = v.findIndex((M) => M.date === y.date);
        x !== -1 ? v[x] = { ...v[x], reasons: y.reasons } : v.push({
          date: y.date,
          seller_conversations: 0,
          sell_started_count: 0,
          sell_get_quote_count: 0,
          sell_booking_created_count: 0,
          sell_success_count: 0,
          daily_value_sell_success: 0,
          reasons: y.reasons
        });
      }), v.sort((y, x) => new Date(y.date).getTime() - new Date(x.date).getTime());
    }), l = A(() => n.sellerData), c = A(() => n.failedData), d = A(() => {
      const {
        total_seller_conversations: v = 0,
        total_sell_started: y = 0,
        total_sell_booking_created: x = 0,
        total_sell_success: M = 0
      } = l.value, { failed_by_reason_by_day: S = [] } = c.value;
      if (v === 0) return { nodes: [], links: [] };
      const $ = [
        { name: "Sell Initiated", value: v },
        { name: "Sell Started", value: y },
        { name: "Booking Created", value: x },
        { name: "Sell Success", value: M }
      ], C = [], D = v - y;
      if (D > 0) {
        const L = Math.round(D / v * 100);
        $.push({ name: "Abandoned (Init)", value: D }), C.push({
          source: "Sell Initiated",
          target: "Abandoned (Init)",
          value: D,
          label: `${D.toLocaleString()} (${L}%)`
        });
      }
      if (y > 0) {
        const L = Math.round(y / v * 100);
        C.push({
          source: "Sell Initiated",
          target: "Sell Started",
          value: y,
          label: `${y.toLocaleString()} (${L}%)`
        });
      }
      const P = S.reduce((L, N) => (N.reasons && Array.isArray(N.reasons) && N.reasons.forEach((B) => {
        const E = B.reason, j = B.failed_count;
        L[E] = (L[E] || 0) + j;
      }), L), {});
      if (x > 0) {
        const L = Math.round(x / v * 100);
        C.push({
          source: "Sell Started",
          target: "Booking Created",
          value: x,
          label: `${x.toLocaleString()} (${L}%)`
        });
      }
      if (M > 0) {
        const L = Math.round(M / v * 100);
        C.push({
          source: "Booking Created",
          target: "Sell Success",
          value: M,
          label: `${M.toLocaleString()} (${L}%)`
        });
      }
      const F = y - x;
      if (F > 0) {
        const L = Math.round(F / v * 100);
        $.push({ name: "Failed at Booking", value: F }), C.push({
          source: "Sell Started",
          target: "Failed at Booking",
          value: F,
          label: `${F.toLocaleString()} (${L}%)`
        });
      }
      if (Object.keys(P).length > 0) {
        const L = Object.values(P).reduce((B, E) => B + E, 0), N = F - L;
        if (Object.entries(P).filter(([, B]) => B > 0).sort(([, B], [, E]) => E - B).forEach(([B, E]) => {
          const j = Math.round(E / v * 100);
          $.push({ name: `Failed: ${B}`, value: E }), C.push({
            source: "Failed at Booking",
            target: `Failed: ${B}`,
            value: E,
            label: `${E.toLocaleString()} (${j}%)`
          });
        }), N > 0) {
          const B = Math.round(N / v * 100);
          $.push({ name: "Failed: Without Reason", value: N }), C.push({
            source: "Failed at Booking",
            target: "Failed: Without Reason",
            value: N,
            label: `${N.toLocaleString()} (${B}%)`
          });
        }
      }
      const R = x - M;
      if (R > 0) {
        const L = Math.round(R / v * 100);
        $.push({ name: "Failed at Completion", value: R }), C.push({
          source: "Booking Created",
          target: "Failed at Completion",
          value: R,
          label: `${R.toLocaleString()} (${L}%)`
        });
      }
      return { nodes: $, links: C };
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
    }, f = A(() => u), p = (v, y) => !y || y === 0 ? "0%" : `${Math.round(v / y * 100)}%`, g = (v, y) => {
      const x = H(v), M = p(v, y);
      return `${x} (${M})`;
    }, m = (v) => v == null ? 0 : typeof v == "number" ? v : Array.isArray(v) ? v.reduce((y, x) => y + (x.total_value || 0), 0) : 0, b = (v) => rt(m(v));
    return t({ isDark: o }), (v, y) => (_(), k("article", Vm, [
      h("header", jm, [
        h("div", Ym, [
          y[1] || (y[1] = h("div", { class: "title-section" }, [
            h("h3", { class: "card-title" }, "Seller Metrics"),
            h("p", { class: "card-subtitle" }, "Sales performance and failure analysis")
          ], -1)),
          n.loading ? I("", !0) : (_(), k("div", Um, [
            y[0] || (y[0] = h("p", { class: "badge-label" }, "Total Sales Value", -1)),
            h("p", qm, w(b(n.sellerData.total_value_sell_success)), 1)
          ]))
        ])
      ]),
      n.loading ? (_(), k("div", Xm, [...y[2] || (y[2] = [
        X('<div class="loading-container" data-v-e0a96c80><div class="chart-flow-loader" data-v-e0a96c80><div class="flow-line flow-1" data-v-e0a96c80></div><div class="flow-line flow-2" data-v-e0a96c80></div><div class="flow-line flow-3" data-v-e0a96c80></div><div class="flow-line flow-4" data-v-e0a96c80></div><div class="flow-line flow-5" data-v-e0a96c80></div></div><p class="loading-text" data-v-e0a96c80>Loading sales data...</p></div>', 1)
      ])])) : (_(), k("div", Km, [
        d.value.nodes.length > 0 ? (_(), k("section", Gm, [
          h("div", Qm, [
            U(ae, {
              data: d.value,
              "node-colors": f.value,
              title: "",
              height: "320px"
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : (_(), k("section", Zm, [...y[3] || (y[3] = [
          X('<div class="empty-state-content" data-v-e0a96c80><div class="empty-icon-wrapper" data-v-e0a96c80><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e0a96c80><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-e0a96c80></path></svg></div><p class="empty-title" data-v-e0a96c80>No sales data available</p><p class="empty-description" data-v-e0a96c80>No sales data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])])),
        r.value && r.value.length > 0 ? (_(), k("section", Jm, [
          h("div", tb, [
            h("table", eb, [
              y[4] || (y[4] = h("thead", null, [
                h("tr", { class: "table-header-row" }, [
                  h("th", { class: "table-header" }, "Date"),
                  h("th", { class: "table-header" }, "Sell Initiated"),
                  h("th", { class: "table-header" }, "Sell Started"),
                  h("th", { class: "table-header" }, "Get Quote"),
                  h("th", { class: "table-header" }, "Booking Created"),
                  h("th", { class: "table-header" }, "Sell Success"),
                  h("th", { class: "table-header" }, "Total Sales Value"),
                  h("th", { class: "table-header" }, "Failed")
                ])
              ], -1)),
              h("tbody", sb, [
                (_(!0), k(K, null, lt(r.value, (x) => (_(), k("tr", {
                  key: x.date,
                  class: "table-row"
                }, [
                  h("td", nb, w(T(Xt)(x.date).format("DD/MM/YYYY")), 1),
                  h("td", ib, w(T(H)(x.seller_conversations || 0)), 1),
                  h("td", ab, w(g(x.sell_started_count, x.seller_conversations || x.sell_started_count)), 1),
                  h("td", ob, w(g(x.sell_get_quote_count, x.seller_conversations || x.sell_started_count)), 1),
                  h("td", rb, w(g(x.sell_booking_created_count, x.seller_conversations || x.sell_started_count)), 1),
                  h("td", lb, w(g(x.sell_success_count, x.seller_conversations || x.sell_started_count)), 1),
                  h("td", cb, w(b(x.daily_value_sell_success)), 1),
                  h("td", db, [
                    x.reasons && x.reasons.length > 0 ? (_(), k("div", hb, [
                      (_(!0), k(K, null, lt(x.reasons, (M) => (_(), k("div", {
                        key: M.reason,
                        class: "failed-reason-item"
                      }, [
                        h("span", ub, w(M.reason) + ":", 1),
                        h("span", fb, w(M.failed_count), 1)
                      ]))), 128))
                    ])) : (_(), k("div", gb, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (_(), gt(T(_t), {
            key: 0,
            onExport: a,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : I("", !0)
      ]))
    ]));
  }
}), mb = /* @__PURE__ */ G(pb, [["__scopeId", "data-v-e0a96c80"]]), bb = { class: "top-agents-card" }, vb = {
  key: 0,
  class: "card-body"
}, yb = {
  key: 0,
  class: "chart-section"
}, _b = {
  key: 1,
  class: "empty-state"
}, xb = { class: "empty-state-content" }, kb = { class: "empty-icon-wrapper" }, Mb = {
  key: 1,
  class: "loading-state"
}, Sb = /* @__PURE__ */ st({
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
    }, i = e, a = s, o = (u) => {
      a("export", u);
    }, { isDark: r, colors: l } = it(nt(i, "theme")), c = A(() => {
      const f = (i.data?.top_agents || []).filter(
        (b) => b.agent_type?.toLowerCase() !== "triage"
      );
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const p = f.reduce(
        (b, v) => b + (Number(v.conversations) || 0),
        0
      ), g = f.map((b) => {
        const v = b.agent_type?.toLowerCase();
        return n[v] || "#94a3b8";
      }), m = g.map((b) => `${b}80`);
      return {
        labels: f.map((b) => {
          const v = Number(b.conversations) || 0, y = p ? v / p * 100 : 0;
          return `${b.agent_type} - ${v.toLocaleString()} (${y.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: f.map((b) => b.conversations),
            backgroundColor: m,
            borderColor: g,
            borderWidth: 2
          }
        ]
      };
    }), d = A(() => i.options ? i.options : {
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
              const f = (u.label || "").toString().split(" - ")[0], p = Number(u.parsed) || 0, g = (u.dataset.data || []).reduce(
                (b, v) => b + (Number(v) || 0),
                0
              ), m = g ? p / g * 100 : 0;
              return `${f}: ${p.toLocaleString()} (${m.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: r }), (u, f) => (_(), k("article", bb, [
      f[3] || (f[3] = h("header", { class: "card-header" }, [
        h("div", { class: "header-content" }, [
          h("h3", { class: "card-title" }, "Top Agents"),
          h("p", { class: "card-subtitle" }, "Interactions by agent (excluding triage)")
        ])
      ], -1)),
      e.loading ? (_(), k("div", Mb, [...f[2] || (f[2] = [
        X('<div class="loading-container" data-v-501bf4c4><div class="chart-lines-loader" data-v-501bf4c4><div class="line line-1" data-v-501bf4c4></div><div class="line line-2" data-v-501bf4c4></div><div class="line line-3" data-v-501bf4c4></div><div class="line line-4" data-v-501bf4c4></div><div class="line line-5" data-v-501bf4c4></div></div><p class="loading-text" data-v-501bf4c4>Loading chart data...</p></div>', 1)
      ])])) : (_(), k("div", vb, [
        c.value.labels && c.value.labels.length ? (_(), k("section", yb, [
          U(fn, {
            data: c.value,
            options: d.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (_(), gt(T(_t), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (_(), k("section", _b, [
          h("div", xb, [
            h("div", kb, [
              U(T(If), { class: "empty-icon" })
            ]),
            f[0] || (f[0] = h("p", { class: "empty-title" }, "No top agents data", -1)),
            f[1] || (f[1] = h("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), wb = /* @__PURE__ */ G(Sb, [["__scopeId", "data-v-501bf4c4"]]), Cb = { class: "payment-method-card" }, $b = { class: "card-header" }, Db = { class: "header-content" }, Ab = {
  key: 0,
  class: "stats-badge"
}, Tb = { class: "badge-value" }, Fb = {
  key: 0,
  class: "loading-state"
}, Pb = {
  key: 1,
  class: "card-body"
}, Bb = {
  key: 0,
  class: "payment-methods-section"
}, Lb = { class: "payment-methods-grid" }, Ob = { class: "payment-card-content" }, Eb = { class: "payment-card-header" }, Rb = { class: "payment-badge-wrapper" }, Ib = {
  key: 1,
  class: "empty-state"
}, zb = { class: "empty-state-content" }, Wb = { class: "empty-icon-wrapper" }, Hb = {
  key: 2,
  class: "table-section"
}, Nb = { class: "table-wrapper" }, Vb = { class: "data-table" }, jb = { class: "table-body" }, Yb = { class: "table-cell font-medium" }, Ub = { class: "table-cell text-center" }, qb = { class: "table-cell text-center success-value" }, Xb = { class: "table-cell" }, Kb = { class: "payment-tags" }, Gb = { class: "tag-name" }, Qb = { class: "tag-amount" }, Zb = { class: "tag-count" }, Jb = {
  key: 3,
  class: "empty-table-state"
}, tv = /* @__PURE__ */ st({
  __name: "PaymentMethod",
  props: {
    data: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: s }) {
    const n = e, i = s, { isDark: a } = it(nt(n, "theme")), o = A(() => n.data?.payment_method_breakdown && n.data.payment_method_breakdown.length > 0), r = A(() => n.data?.payment_method_by_day && n.data.payment_method_by_day.length > 0), l = [
      { bg: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)", border: "#a7f3d0", text: "#047857", value: "#065f46", icon: "#10b981", badge: "#059669" },
      { bg: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)", border: "#93c5fd", text: "#1d4ed8", value: "#1e40af", icon: "#3b82f6", badge: "#2563eb" },
      { bg: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)", border: "#d8b4fe", text: "#7c3aed", value: "#6d28d9", icon: "#8b5cf6", badge: "#7c3aed" },
      { bg: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)", border: "#fcd34d", text: "#b45309", value: "#92400e", icon: "#f59e0b", badge: "#d97706" },
      { bg: "linear-gradient(135deg, #fff1f2 0%, #fce7f3 100%)", border: "#fda4af", text: "#be123c", value: "#9f1239", icon: "#f43f5e", badge: "#e11d48" },
      { bg: "linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)", border: "#67e8f9", text: "#0e7490", value: "#155e75", icon: "#06b6d4", badge: "#0891b2" }
    ], c = (x) => {
      const M = l[x % l.length];
      return {
        background: M.bg,
        borderColor: M.border
      };
    }, d = (x) => ({ color: l[x % l.length].text }), u = (x) => ({ color: l[x % l.length].value }), f = (x) => ({ color: l[x % l.length].icon }), p = (x) => ({ color: l[x % l.length].badge }), g = (x) => {
      const M = x?.toLowerCase() || "";
      return M.includes("credit") || M.includes("debit") ? zi : M.includes("cash") || M.includes("efectivo") ? Ef : M.includes("bank") || M.includes("transfer") ? Rf : M.includes("zelle") || M.includes("pago") || M.includes("movil") ? Wf : M.includes("wallet") ? Hf : zf;
    }, m = (x) => x ? x.replace(/_/g, " ") : "Unknown", b = (x) => x == null ? "$0.00" : rt(x), v = (x) => x ? Xt(x).format("DD/MM/YYYY") : "-", y = (x) => {
      i("export", x);
    };
    return t({ isDark: a }), (x, M) => (_(), k("article", Cb, [
      h("header", $b, [
        h("div", Db, [
          M[1] || (M[1] = h("div", { class: "title-section" }, [
            h("h3", { class: "card-title" }, "Payment Method Metrics"),
            h("p", { class: "card-subtitle" }, "Sales breakdown by payment method")
          ], -1)),
          !e.loading && e.data?.total_amount ? (_(), k("div", Ab, [
            M[0] || (M[0] = h("p", { class: "badge-label" }, "Total Amount", -1)),
            h("p", Tb, w(b(e.data.total_amount)), 1)
          ])) : I("", !0)
        ])
      ]),
      e.loading ? (_(), k("div", Fb, [...M[2] || (M[2] = [
        X('<div class="loading-container" data-v-e673c051><div class="chart-lines-loader" data-v-e673c051><div class="line line-1" data-v-e673c051></div><div class="line line-2" data-v-e673c051></div><div class="line line-3" data-v-e673c051></div><div class="line line-4" data-v-e673c051></div><div class="line line-5" data-v-e673c051></div></div><p class="loading-text" data-v-e673c051>Loading payment data...</p></div>', 1)
      ])])) : (_(), k("div", Pb, [
        o.value ? (_(), k("section", Bb, [
          M[3] || (M[3] = h("p", { class: "section-label" }, "Sales by Payment Method", -1)),
          h("div", Lb, [
            (_(!0), k(K, null, lt(e.data.payment_method_breakdown, (S, $) => (_(), k("div", {
              key: S.payment_method,
              class: "payment-method-card-item",
              style: Dt(c($))
            }, [
              h("div", Ob, [
                h("div", Eb, [
                  (_(), gt(Qa(g(S.payment_method)), {
                    class: "payment-icon",
                    style: Dt(f($))
                  }, null, 8, ["style"])),
                  h("span", {
                    class: "payment-name",
                    style: Dt(d($))
                  }, w(m(S.payment_method)), 5)
                ]),
                h("p", {
                  class: "payment-amount",
                  style: Dt(u($))
                }, w(b(S.total_amount)), 5),
                h("div", Rb, [
                  h("span", {
                    class: "payment-badge",
                    style: Dt(p($))
                  }, w(S.count) + " " + w(S.count === 1 ? "sale" : "sales"), 5)
                ])
              ])
            ], 4))), 128))
          ])
        ])) : (_(), k("section", Ib, [
          h("div", zb, [
            h("div", Wb, [
              U(T(zi), { class: "empty-icon" })
            ]),
            M[4] || (M[4] = h("p", { class: "empty-title" }, "No payment data available", -1)),
            M[5] || (M[5] = h("p", { class: "empty-description" }, "No payment method data found for the selected period. Try adjusting the date range.", -1))
          ])
        ])),
        r.value ? (_(), k("section", Hb, [
          M[8] || (M[8] = h("p", { class: "section-label" }, "Daily Breakdown", -1)),
          h("div", Nb, [
            h("table", Vb, [
              M[7] || (M[7] = h("thead", null, [
                h("tr", { class: "table-header-row" }, [
                  h("th", { class: "table-header text-left" }, "Date"),
                  h("th", { class: "table-header text-center" }, "Total Sales"),
                  h("th", { class: "table-header text-center" }, "Total Amount"),
                  h("th", { class: "table-header text-left" }, "Payment Methods")
                ])
              ], -1)),
              h("tbody", jb, [
                (_(!0), k(K, null, lt(e.data.payment_method_by_day, (S) => (_(), k("tr", {
                  key: S.date,
                  class: "table-row"
                }, [
                  h("td", Yb, w(v(S.date)), 1),
                  h("td", Ub, w(T(H)(S.total_count)), 1),
                  h("td", qb, w(b(S.total_amount)), 1),
                  h("td", Xb, [
                    h("div", Kb, [
                      (_(!0), k(K, null, lt(S.payment_methods, ($) => (_(), k("div", {
                        key: $.payment_method,
                        class: "payment-tag"
                      }, [
                        h("span", Gb, w(m($.payment_method)), 1),
                        M[6] || (M[6] = h("span", { class: "tag-separator" }, "•", -1)),
                        h("span", Qb, w(b($.total_amount)), 1),
                        h("span", Zb, "(" + w($.count) + ")", 1)
                      ]))), 128))
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (_(), gt(T(_t), {
            key: 0,
            onExport: y,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : o.value ? (_(), k("div", Jb, [...M[9] || (M[9] = [
          h("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
        ])])) : I("", !0)
      ]))
    ]));
  }
}), ev = /* @__PURE__ */ G(tv, [["__scopeId", "data-v-e673c051"]]), sv = { class: "nps-daily-card" }, nv = { class: "card-header" }, iv = { class: "header-content" }, av = {
  key: 0,
  class: "stats-badge"
}, ov = { class: "badge-value" }, rv = {
  key: 0,
  class: "loading-state"
}, lv = {
  key: 1,
  class: "card-body"
}, cv = { class: "tooltip-content" }, dv = { class: "tooltip-title" }, hv = { class: "tooltip-stats" }, uv = { class: "tooltip-stat-row" }, fv = { class: "tooltip-value" }, gv = { class: "tooltip-stat-row" }, pv = { class: "tooltip-value" }, mv = { class: "tooltip-stat-row" }, bv = { class: "tooltip-value" }, vv = { class: "tooltip-stat-row" }, yv = { class: "tooltip-value" }, _v = { class: "tooltip-stat-row" }, xv = { class: "tooltip-value" }, kv = { class: "tooltip-stat-row" }, Mv = { class: "tooltip-value" }, Sv = {
  key: 2,
  class: "empty-state"
}, Wi = 400, we = 60, Hi = 90, Ni = 120, wv = {
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
    const n = s, i = (b) => {
      n("export", b);
    }, a = e, { isDark: o } = it(nt(a, "theme")), r = A(() => a.data), l = wt(null), c = wt({
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
    }), d = A(() => {
      if (!r.value || !r.value.nps_by_day) return 800;
      const b = r.value.nps_by_day.length;
      return Math.max(800, we * 2 + b * Ni);
    }), u = (b, v) => {
      const x = (b - 1) / 9;
      return we + v - x * v;
    }, f = (b) => b ? Xt(b).format("DD-MM-YYYY") : "", p = A(() => {
      if (!r.value || !r.value.nps_by_day || r.value.nps_by_day.length === 0)
        return [];
      const b = [], v = Wi - we - Hi;
      return r.value.nps_by_day.forEach((y, x) => {
        const M = y.min_score || 0, S = y.q1_score || 0, $ = y.median_score || 0, C = y.q3_score || 0, D = y.max_score || 0, P = y.average_score || 0;
        b.push({
          label: f(y.date),
          responseCount: y.nps_responses_count || 0,
          isTotal: !1,
          open: S,
          // Q1 as open
          high: D,
          // Max as high
          low: M,
          // Min as low
          close: C,
          // Q3 as close
          median: $,
          average: P,
          openY: u(S, v),
          highY: u(D, v),
          lowY: u(M, v),
          closeY: u(C, v),
          medianY: u($, v),
          averageY: P > 0 ? u(P, v) : null,
          centerX: we + (x + 1) * Ni
        });
      }), b;
    }), g = (b, v) => {
      if (!l.value || !v || v.horizontal) return;
      const y = l.value.getBoundingClientRect(), x = b.clientX, M = b.clientY, S = 140, $ = 160, C = 10, D = 15;
      let P = x - y.left - S / 2, F = M - y.top - $ - D;
      P = Math.max(C, Math.min(P, y.width - S - C)), F < C && (F = M - y.top + D), F = Math.max(C, Math.min(F, y.height - $ - C)), c.value = {
        visible: !0,
        x: P,
        y: F,
        date: v.label || "",
        min: v.low !== void 0 ? v.low.toFixed(1) : "N/A",
        max: v.high !== void 0 ? v.high.toFixed(1) : "N/A",
        q1: v.open !== void 0 ? v.open.toFixed(1) : "N/A",
        avg: v.average !== void 0 && v.average > 0 ? v.average.toFixed(1) : "N/A",
        q3: v.close !== void 0 ? v.close.toFixed(1) : "N/A",
        median: v.median !== void 0 ? v.median.toFixed(1) : "N/A"
      };
    }, m = () => {
      c.value.visible = !1;
    };
    return t({ isDark: o }), (b, v) => (_(), k("article", sv, [
      h("header", nv, [
        h("div", iv, [
          v[1] || (v[1] = h("div", { class: "title-section" }, [
            h("h3", { class: "card-title" }, "NPS Daily Metrics"),
            h("p", { class: "card-subtitle" }, "Daily NPS Distribution")
          ], -1)),
          r.value && r.value.nps_by_day && r.value.nps_by_day.length > 0 ? (_(), k("div", av, [
            v[0] || (v[0] = h("p", { class: "badge-label" }, "Days", -1)),
            h("p", ov, w(r.value.nps_by_day.length), 1)
          ])) : I("", !0)
        ])
      ]),
      a.loading ? (_(), k("div", rv, [...v[2] || (v[2] = [
        X('<div class="loading-container" data-v-6354e62a><div class="chart-flow-loader" data-v-6354e62a><div class="flow-line flow-1" data-v-6354e62a></div><div class="flow-line flow-2" data-v-6354e62a></div><div class="flow-line flow-3" data-v-6354e62a></div><div class="flow-line flow-4" data-v-6354e62a></div><div class="flow-line flow-5" data-v-6354e62a></div></div><p class="loading-text" data-v-6354e62a>Loading daily NPS data...</p></div>', 1)
      ])])) : r.value && r.value.nps_by_day && r.value.nps_by_day.length > 0 ? (_(), k("div", lv, [
        h("div", {
          class: "chart-wrapper",
          ref_key: "chartContainerRef",
          ref: l
        }, [
          p.value && p.value.length > 0 ? (_(), gt(ja, {
            key: 0,
            "candlestick-data": p.value,
            "chart-width": d.value,
            "chart-height": Wi,
            "chart-margin": we,
            "chart-bottom-margin": Hi,
            "show-legend": !0,
            rotation: 0,
            "candle-width": 30,
            onCandleHover: g,
            onCandleLeave: m
          }, null, 8, ["candlestick-data", "chart-width"])) : I("", !0),
          c.value.visible ? (_(), k("div", {
            key: 1,
            class: "tooltip-overlay",
            style: Dt({
              left: `${c.value.x}px`,
              top: `${c.value.y}px`
            })
          }, [
            h("div", cv, [
              h("div", dv, w(c.value.date), 1),
              v[9] || (v[9] = h("div", { class: "tooltip-divider" }, null, -1)),
              h("div", hv, [
                h("div", uv, [
                  v[3] || (v[3] = h("span", { class: "tooltip-label tooltip-min" }, "Min:", -1)),
                  h("span", fv, w(c.value.min), 1)
                ]),
                h("div", gv, [
                  v[4] || (v[4] = h("span", { class: "tooltip-label tooltip-q1" }, "Q1:", -1)),
                  h("span", pv, w(c.value.q1), 1)
                ]),
                h("div", mv, [
                  v[5] || (v[5] = h("span", { class: "tooltip-label tooltip-median" }, "Median:", -1)),
                  h("span", bv, w(c.value.median), 1)
                ]),
                h("div", vv, [
                  v[6] || (v[6] = h("span", { class: "tooltip-label tooltip-avg" }, "Avg:", -1)),
                  h("span", yv, w(c.value.avg), 1)
                ]),
                h("div", _v, [
                  v[7] || (v[7] = h("span", { class: "tooltip-label tooltip-q3" }, "Q3:", -1)),
                  h("span", xv, w(c.value.q3), 1)
                ]),
                h("div", kv, [
                  v[8] || (v[8] = h("span", { class: "tooltip-label tooltip-max" }, "Max:", -1)),
                  h("span", Mv, w(c.value.max), 1)
                ])
              ])
            ])
          ], 4)) : I("", !0)
        ], 512),
        e.enableExport ? (_(), gt(T(_t), {
          key: 0,
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : I("", !0)
      ])) : (_(), k("div", Sv, [...v[10] || (v[10] = [
        X('<div class="empty-state-content" data-v-6354e62a><div class="empty-icon-wrapper" data-v-6354e62a><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-6354e62a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-6354e62a></path></svg></div><p class="empty-title" data-v-6354e62a>No daily NPS data available</p><p class="empty-description" data-v-6354e62a>No daily NPS data found for the selected period. Try adjusting the date range.</p></div>', 1)
      ])]))
    ]));
  }
}, Ua = /* @__PURE__ */ G(wv, [["__scopeId", "data-v-6354e62a"]]), Cv = { class: "nps-overview-card" }, $v = { class: "card-header" }, Dv = { class: "header-content" }, Av = {
  key: 0,
  class: "stats-badge"
}, Tv = { class: "badge-value" }, Fv = {
  key: 0,
  class: "loading-state"
}, Pv = {
  key: 1,
  class: "card-body"
}, Bv = { class: "chart-wrapper" }, Lv = {
  key: 2,
  class: "empty-state"
}, Ov = 500, Ev = 60, Rv = 80, Iv = {
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
    const n = s, i = (c) => {
      n("export", c);
    }, a = e, { isDark: o } = it(nt(a, "theme")), r = A(() => a.data), l = A(() => Math.max(600, window.innerWidth * 0.85));
    return t({ isDark: o }), (c, d) => (_(), k("article", Cv, [
      h("header", $v, [
        h("div", Dv, [
          d[1] || (d[1] = h("div", { class: "title-section" }, [
            h("h3", { class: "card-title" }, "NPS Overview Metrics"),
            h("p", { class: "card-subtitle" }, "Overall NPS Distribution")
          ], -1)),
          r.value && r.value.total_nps_responses > 0 ? (_(), k("div", Av, [
            d[0] || (d[0] = h("p", { class: "badge-label" }, "Responses", -1)),
            h("p", Tv, w(r.value.total_nps_responses), 1)
          ])) : I("", !0)
        ])
      ]),
      a.loading ? (_(), k("div", Fv, [...d[2] || (d[2] = [
        X('<div class="loading-container" data-v-cf57fba8><div class="chart-flow-loader" data-v-cf57fba8><div class="flow-line flow-1" data-v-cf57fba8></div><div class="flow-line flow-2" data-v-cf57fba8></div><div class="flow-line flow-3" data-v-cf57fba8></div><div class="flow-line flow-4" data-v-cf57fba8></div><div class="flow-line flow-5" data-v-cf57fba8></div></div><p class="loading-text" data-v-cf57fba8>Loading NPS data...</p></div>', 1)
      ])])) : r.value && r.value.total_nps_responses > 0 ? (_(), k("div", Pv, [
        h("div", Bv, [
          U(Ya, {
            histogram: r.value.histogram || [],
            "min-score": r.value.min_score || 0,
            "max-score": r.value.max_score || 0,
            "q1-score": r.value.q1_score || 0,
            "median-score": r.value.median_score || 0,
            "q3-score": r.value.q3_score || 0,
            "average-score": r.value.average_score || 0,
            "chart-width": l.value,
            "chart-height": Ov,
            "chart-margin": Ev,
            "chart-bottom-margin": Rv
          }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score", "chart-width"])
        ]),
        e.enableExport ? (_(), gt(T(_t), {
          key: 0,
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : I("", !0)
      ])) : (_(), k("div", Lv, [...d[3] || (d[3] = [
        X('<div class="empty-state-content" data-v-cf57fba8><div class="empty-icon-wrapper" data-v-cf57fba8><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-cf57fba8><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-cf57fba8></path></svg></div><p class="empty-title" data-v-cf57fba8>No NPS data available</p><p class="empty-description" data-v-cf57fba8>No NPS data found for the selected period. Try adjusting the date range.</p></div>', 1)
      ])]))
    ]));
  }
}, qa = /* @__PURE__ */ G(Iv, [["__scopeId", "data-v-cf57fba8"]]), zv = { class: "nps-metrics-container" }, Wv = {
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
    const s = t, n = (i) => {
      s("export", i);
    };
    return (i, a) => (_(), k("div", zv, [
      U(qa, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: n
      }, null, 8, ["data", "loading", "enable-export"]),
      U(Ua, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: n
      }, null, 8, ["data", "loading", "enable-export"])
    ]));
  }
}, Hv = /* @__PURE__ */ G(Wv, [["__scopeId", "data-v-25fe3b80"]]), Nv = { class: "aws-cost-card" }, Vv = { class: "card-header" }, jv = { class: "header-main" }, Yv = { class: "header-content" }, Uv = { class: "card-title" }, qv = { class: "header-stats" }, Xv = { class: "stat-badge primary" }, Kv = { class: "stat-value" }, Gv = { class: "stat-badge secondary" }, Qv = { class: "stat-value" }, Zv = { class: "card-body" }, Jv = {
  key: 0,
  class: "loading-state"
}, t1 = {
  key: 1,
  class: "chart-section"
}, e1 = { class: "chart-container" }, s1 = { class: "kpi-grid" }, n1 = { class: "kpi-card" }, i1 = { class: "kpi-value" }, a1 = { class: "kpi-card" }, o1 = { class: "kpi-value" }, r1 = { class: "kpi-card" }, l1 = { class: "kpi-value" }, c1 = { class: "kpi-card" }, d1 = { class: "kpi-value gradient-text" }, h1 = {
  key: 2,
  class: "empty-state"
}, u1 = { class: "empty-state-content" }, f1 = { class: "empty-icon-wrapper" }, g1 = {
  __name: "AWSCost",
  props: {
    data: {
      type: Object,
      required: !0,
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
    const t = e, { isDark: s, colors: n } = it(nt(t, "theme")), i = A(() => ({
      labels: t.data.daily.map((r) => r.date),
      datasets: [
        {
          label: "Allocated Cost",
          data: t.data.daily.map((r) => r.allocated_cost),
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
          data: t.data.daily.map((r) => r.aws_cost),
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
          data: t.data.daily.map((r) => r.airline_conversations),
          borderColor: n.value.info,
          backgroundColor: s.value ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)",
          borderWidth: 2,
          pointRadius: 3,
          tension: 0.3,
          yAxisID: "y1"
        }
      ]
    })), a = A(() => ({
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
            callback: (o) => rt(o)
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
    return (o, r) => (_(), k("article", Nv, [
      h("header", Vv, [
        h("div", jv, [
          h("div", Yv, [
            h("h3", Uv, w(e.data.airline_name || "AWS Cost Analysis"), 1),
            r[0] || (r[0] = h("p", { class: "card-subtitle" }, "AWS vs Allocated costs over time", -1))
          ]),
          h("div", qv, [
            h("div", Xv, [
              r[1] || (r[1] = h("span", { class: "stat-label" }, "Total Allocated", -1)),
              h("span", Kv, w(T(rt)(e.data.total_allocated_cost)), 1)
            ]),
            h("div", Gv, [
              r[2] || (r[2] = h("span", { class: "stat-label" }, "Total AWS", -1)),
              h("span", Qv, w(T(rt)(e.data.total_cost)), 1)
            ])
          ])
        ])
      ]),
      h("div", Zv, [
        e.loading ? (_(), k("div", Jv, [...r[3] || (r[3] = [
          X('<div class="loading-container" data-v-05e67a8c><div class="chart-lines-loader" data-v-05e67a8c><div class="line line-1" data-v-05e67a8c></div><div class="line line-2" data-v-05e67a8c></div><div class="line line-3" data-v-05e67a8c></div><div class="line line-4" data-v-05e67a8c></div><div class="line line-5" data-v-05e67a8c></div></div><p class="loading-text" data-v-05e67a8c>Loading chart data...</p></div>', 1)
        ])])) : e.data.daily && e.data.daily.length ? (_(), k("div", t1, [
          h("div", e1, [
            U(ve, {
              data: i.value,
              options: a.value
            }, null, 8, ["data", "options"])
          ]),
          h("footer", s1, [
            h("div", n1, [
              r[4] || (r[4] = h("span", { class: "kpi-label" }, "Total Conv.", -1)),
              h("span", i1, w(T(H)(e.data.total_conversations)), 1)
            ]),
            h("div", a1, [
              r[5] || (r[5] = h("span", { class: "kpi-label" }, "Airline Conv.", -1)),
              h("span", o1, w(T(H)(e.data.total_airline_conversations)), 1)
            ]),
            h("div", r1, [
              r[6] || (r[6] = h("span", { class: "kpi-label" }, "Avg. Cost / Conv.", -1)),
              h("span", l1, w(T(rt)(e.data.total_allocated_cost / (e.data.total_conversations || 1))), 1)
            ]),
            h("div", c1, [
              r[7] || (r[7] = h("span", { class: "kpi-label" }, "Efficiency", -1)),
              h("span", d1, w((e.data.total_airline_conversations / (e.data.total_conversations || 1) * 100).toFixed(1)) + "% ", 1)
            ])
          ])
        ])) : (_(), k("section", h1, [
          h("div", u1, [
            h("div", f1, [
              U(T(Ft), { class: "empty-icon" })
            ]),
            r[8] || (r[8] = h("p", { class: "empty-title" }, "Sin datos de costos", -1)),
            r[9] || (r[9] = h("p", { class: "empty-description" }, "No se encontró información para el periodo seleccionado. Intenta ajustar el rango de fechas.", -1))
          ])
        ]))
      ])
    ]));
  }
}, p1 = /* @__PURE__ */ G(g1, [["__scopeId", "data-v-05e67a8c"]]), m1 = { class: "cost-usage-card" }, b1 = {
  key: 0,
  class: "card-body"
}, v1 = {
  key: 0,
  class: "chart-section"
}, y1 = { class: "chart-container" }, _1 = { class: "kpi-grid" }, x1 = { class: "kpi-card" }, k1 = { class: "kpi-value" }, M1 = { class: "kpi-card" }, S1 = { class: "kpi-value" }, w1 = { class: "kpi-card" }, C1 = { class: "kpi-value" }, $1 = { class: "kpi-card" }, D1 = { class: "kpi-value" }, A1 = { class: "kpi-card" }, T1 = { class: "kpi-value" }, F1 = { class: "kpi-card highlighted" }, P1 = { class: "kpi-value gradient-text" }, B1 = {
  key: 1,
  class: "empty-state"
}, L1 = { class: "empty-state-content" }, O1 = { class: "empty-icon-wrapper" }, E1 = {
  key: 1,
  class: "loading-state"
}, R1 = /* @__PURE__ */ st({
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
    const n = e, { isDark: i, colors: a } = it(nt(n, "theme")), o = (g) => {
      const m = new Date(g), b = String(m.getDate()).padStart(2, "0"), v = String(m.getMonth() + 1).padStart(2, "0");
      return `${b}-${v}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = A(() => {
      const g = n.data?.costs_by_day || {};
      return Object.values(g).reduce((m, b) => m + (b.input_cost || 0), 0);
    }), c = A(() => {
      const g = n.data?.costs_by_day || {};
      return Object.values(g).reduce((m, b) => m + (b.output_cost || 0), 0);
    }), d = A(() => {
      const g = n.data?.costs_by_day || {};
      return Object.values(g).reduce((m, b) => m + (b.cache_read_cost || 0), 0);
    }), u = A(() => {
      const g = n.data?.costs_by_day || {};
      return Object.values(g).reduce((m, b) => m + (b.cache_write_cost || 0), 0);
    }), f = A(() => {
      const g = n.data?.costs_by_day || {}, m = Object.keys(g).sort();
      if (m.length === 0)
        return { labels: [], datasets: [] };
      const b = m.map((y) => o(y)), v = [
        {
          label: "Input Cost",
          data: m.map((y) => g[y]?.input_cost || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: m.map((y) => g[y]?.output_cost || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: m.map((y) => g[y]?.cache_read_cost || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: m.map((y) => g[y]?.cache_write_cost || 0),
          backgroundColor: `${r.cache_write}80`,
          borderColor: r.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: b,
        datasets: v
      };
    }), p = A(() => n.options ? n.options : {
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
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: a.value.tooltipBg,
          titleColor: a.value.tooltipText,
          bodyColor: a.value.tooltipText,
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
              let m = g.dataset.label || "";
              return m && (m += ": "), g.parsed.y !== null && (m += rt(g.parsed.y)), m;
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
            color: a.value.textSecondary,
            padding: 8
          }
        },
        y: {
          stacked: !0,
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
            callback: function(g) {
              return rt(g);
            }
          }
        }
      }
    });
    return t({ isDark: i }), (g, m) => (_(), k("article", m1, [
      m[9] || (m[9] = h("header", { class: "card-header" }, [
        h("div", { class: "header-content" }, [
          h("h3", { class: "card-title" }, "Cost Usage"),
          h("p", { class: "card-subtitle" }, "Cost breakdown over time (stacked)")
        ])
      ], -1)),
      e.loading ? (_(), k("div", E1, [...m[8] || (m[8] = [
        X('<div class="loading-container" data-v-d676e952><div class="chart-lines-loader" data-v-d676e952><div class="line line-1" data-v-d676e952></div><div class="line line-2" data-v-d676e952></div><div class="line line-3" data-v-d676e952></div><div class="line line-4" data-v-d676e952></div><div class="line line-5" data-v-d676e952></div></div><p class="loading-text" data-v-d676e952>Loading chart data...</p></div>', 1)
      ])])) : (_(), k("div", b1, [
        f.value.labels && f.value.labels.length ? (_(), k("section", v1, [
          h("div", y1, [
            U(pe, {
              data: f.value,
              options: p.value,
              stacked: !0
            }, null, 8, ["data", "options"])
          ]),
          h("footer", _1, [
            h("div", x1, [
              m[0] || (m[0] = h("span", { class: "kpi-label" }, "Total Cost", -1)),
              h("span", k1, w(T(rt)(e.data.total_cost)), 1)
            ]),
            h("div", M1, [
              m[1] || (m[1] = h("span", { class: "kpi-label" }, "Input Cost", -1)),
              h("span", S1, w(T(rt)(l.value)), 1)
            ]),
            h("div", w1, [
              m[2] || (m[2] = h("span", { class: "kpi-label" }, "Output Cost", -1)),
              h("span", C1, w(T(rt)(c.value)), 1)
            ]),
            h("div", $1, [
              m[3] || (m[3] = h("span", { class: "kpi-label" }, "Cache Read", -1)),
              h("span", D1, w(T(rt)(d.value)), 1)
            ]),
            h("div", A1, [
              m[4] || (m[4] = h("span", { class: "kpi-label" }, "Cache Write", -1)),
              h("span", T1, w(T(rt)(u.value)), 1)
            ]),
            h("div", F1, [
              m[5] || (m[5] = h("span", { class: "kpi-label" }, "Avg / Conv.", -1)),
              h("span", P1, w(T(rt)(e.data.avg_cost_per_conversation)), 1)
            ])
          ])
        ])) : (_(), k("section", B1, [
          h("div", L1, [
            h("div", O1, [
              U(T(Ft), { class: "empty-icon" })
            ]),
            m[6] || (m[6] = h("p", { class: "empty-title" }, "No cost usage data", -1)),
            m[7] || (m[7] = h("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see cost breakdown trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), I1 = /* @__PURE__ */ G(R1, [["__scopeId", "data-v-d676e952"]]), z1 = { class: "token-usage-card" }, W1 = {
  key: 0,
  class: "card-body"
}, H1 = {
  key: 0,
  class: "chart-section"
}, N1 = { class: "chart-container" }, V1 = { class: "kpi-grid" }, j1 = { class: "kpi-card" }, Y1 = { class: "kpi-value" }, U1 = { class: "kpi-card" }, q1 = { class: "kpi-value" }, X1 = { class: "kpi-card" }, K1 = { class: "kpi-value" }, G1 = { class: "kpi-card" }, Q1 = { class: "kpi-value" }, Z1 = { class: "kpi-card" }, J1 = { class: "kpi-value" }, ty = {
  key: 1,
  class: "empty-state"
}, ey = { class: "empty-state-content" }, sy = { class: "empty-icon-wrapper" }, ny = {
  key: 1,
  class: "loading-state"
}, iy = /* @__PURE__ */ st({
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
    const n = e, { isDark: i, colors: a } = it(nt(n, "theme")), o = (d) => {
      const u = new Date(d), f = String(u.getDate()).padStart(2, "0"), p = String(u.getMonth() + 1).padStart(2, "0");
      return `${f}-${p}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = A(() => {
      const d = n.data?.tokens_by_day || {}, u = Object.keys(d).sort();
      if (u.length === 0)
        return { labels: [], datasets: [] };
      const f = u.map((g) => o(g)), p = [
        {
          label: "Input Tokens",
          data: u.map((g) => d[g]?.input_tokens || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Tokens",
          data: u.map((g) => d[g]?.output_tokens || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read",
          data: u.map((g) => d[g]?.cache_read_tokens || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write",
          data: u.map((g) => d[g]?.cache_write_tokens || 0),
          backgroundColor: `${r.cache_write}80`,
          borderColor: r.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: f,
        datasets: p
      };
    }), c = A(() => n.options ? n.options : {
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
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: a.value.tooltipBg,
          titleColor: a.value.tooltipText,
          bodyColor: a.value.tooltipText,
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
            color: a.value.textSecondary,
            padding: 8
          }
        },
        y: {
          stacked: !0,
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
    return t({ isDark: i }), (d, u) => (_(), k("article", z1, [
      u[8] || (u[8] = h("header", { class: "card-header" }, [
        h("div", { class: "header-content" }, [
          h("h3", { class: "card-title" }, "Token Usage"),
          h("p", { class: "card-subtitle" }, "Token consumption over time (stacked)")
        ])
      ], -1)),
      e.loading ? (_(), k("div", ny, [...u[7] || (u[7] = [
        X('<div class="loading-container" data-v-9b967bcb><div class="chart-lines-loader" data-v-9b967bcb><div class="line line-1" data-v-9b967bcb></div><div class="line line-2" data-v-9b967bcb></div><div class="line line-3" data-v-9b967bcb></div><div class="line line-4" data-v-9b967bcb></div><div class="line line-5" data-v-9b967bcb></div></div><p class="loading-text" data-v-9b967bcb>Loading chart data...</p></div>', 1)
      ])])) : (_(), k("div", W1, [
        l.value.labels && l.value.labels.length ? (_(), k("section", H1, [
          h("div", N1, [
            U(pe, {
              data: l.value,
              options: c.value,
              stacked: !0
            }, null, 8, ["data", "options"])
          ]),
          h("footer", V1, [
            h("div", j1, [
              u[0] || (u[0] = h("span", { class: "kpi-label" }, "Total Tokens", -1)),
              h("span", Y1, w(T(H)(e.data.total_tokens)), 1)
            ]),
            h("div", U1, [
              u[1] || (u[1] = h("span", { class: "kpi-label" }, "Input", -1)),
              h("span", q1, w(T(H)(e.data.total_input_tokens)), 1)
            ]),
            h("div", X1, [
              u[2] || (u[2] = h("span", { class: "kpi-label" }, "Output", -1)),
              h("span", K1, w(T(H)(e.data.total_output_tokens)), 1)
            ]),
            h("div", G1, [
              u[3] || (u[3] = h("span", { class: "kpi-label" }, "Cache Read", -1)),
              h("span", Q1, w(T(H)(e.data.total_cache_read_tokens)), 1)
            ]),
            h("div", Z1, [
              u[4] || (u[4] = h("span", { class: "kpi-label" }, "Cache Write", -1)),
              h("span", J1, w(T(H)(e.data.total_cache_write_tokens)), 1)
            ])
          ])
        ])) : (_(), k("section", ty, [
          h("div", ey, [
            h("div", sy, [
              U(T(Ft), { class: "empty-icon" })
            ]),
            u[5] || (u[5] = h("p", { class: "empty-title" }, "No token usage data", -1)),
            u[6] || (u[6] = h("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see token consumption trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), ay = /* @__PURE__ */ G(iy, [["__scopeId", "data-v-9b967bcb"]]), oy = { class: "conversation-count-card" }, ry = { class: "card-header" }, ly = { class: "header-right" }, cy = { class: "stat-badge" }, dy = { class: "stat-value" }, hy = {
  key: 0,
  class: "card-body"
}, uy = {
  key: 0,
  class: "chart-section"
}, fy = { class: "chart-container" }, gy = {
  key: 1,
  class: "empty-state"
}, py = { class: "empty-state-content" }, my = { class: "empty-icon-wrapper" }, by = {
  key: 1,
  class: "loading-state"
}, vy = /* @__PURE__ */ st({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: n, colors: i } = it(nt(s, "theme")), a = (l) => {
      const c = new Date(l), d = String(c.getDate()).padStart(2, "0");
      return `${String(c.getMonth() + 1).padStart(2, "0")}-${d}`;
    };
    A(() => {
      if (s.data?.start_date && s.data?.end_date) {
        const l = a(s.data.start_date), c = a(s.data.end_date);
        return `${l} - ${c}`;
      }
      return "N/A";
    });
    const o = A(() => {
      const l = s.data?.conversations_by_day || {}, c = Object.keys(l).sort();
      if (c.length === 0)
        return { labels: [], datasets: [] };
      const d = c.map((f) => a(f)), u = [
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
        labels: d,
        datasets: u
      };
    }), r = A(() => s.options ? s.options : {
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
            pointStyle: "circle"
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: i.value.tooltipBg,
          titleColor: i.value.tooltipText,
          bodyColor: i.value.tooltipText,
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
            color: i.value.textSecondary,
            padding: 8
          }
        },
        y: {
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
    return t({ isDark: n }), (l, c) => (_(), k("article", oy, [
      h("header", ry, [
        c[1] || (c[1] = h("div", { class: "header-left" }, [
          h("div", { class: "header-content" }, [
            h("h3", { class: "card-title" }, "Conversation Count"),
            h("p", { class: "card-subtitle" }, "Conversations over time")
          ])
        ], -1)),
        h("div", ly, [
          h("div", cy, [
            c[0] || (c[0] = h("span", { class: "stat-label" }, "Total", -1)),
            h("span", dy, w(e.data.total_conversations || 0), 1)
          ])
        ])
      ]),
      e.loading ? (_(), k("div", by, [...c[4] || (c[4] = [
        X('<div class="loading-container" data-v-2ddbabc6><div class="chart-lines-loader" data-v-2ddbabc6><div class="line line-1" data-v-2ddbabc6></div><div class="line line-2" data-v-2ddbabc6></div><div class="line line-3" data-v-2ddbabc6></div><div class="line line-4" data-v-2ddbabc6></div><div class="line line-5" data-v-2ddbabc6></div></div><p class="loading-text" data-v-2ddbabc6>Loading chart data...</p></div>', 1)
      ])])) : (_(), k("div", hy, [
        o.value.labels && o.value.labels.length ? (_(), k("section", uy, [
          h("div", fy, [
            U(ve, {
              data: o.value,
              options: r.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (_(), k("section", gy, [
          h("div", py, [
            h("div", my, [
              U(T(Ft), { class: "empty-icon" })
            ]),
            c[2] || (c[2] = h("p", { class: "empty-title" }, "No conversation count data", -1)),
            c[3] || (c[3] = h("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), yy = /* @__PURE__ */ G(vy, [["__scopeId", "data-v-2ddbabc6"]]), _y = { class: "top-agents-card" }, xy = {
  key: 0,
  class: "card-body"
}, ky = {
  key: 0,
  class: "charts-grid"
}, My = { class: "chart-section" }, Sy = { class: "chart-container" }, wy = { class: "chart-section" }, Cy = { class: "chart-container" }, $y = {
  key: 1,
  class: "empty-state"
}, Dy = { class: "empty-state-content" }, Ay = { class: "empty-icon-wrapper" }, Ty = {
  key: 1,
  class: "loading-state"
}, Fy = /* @__PURE__ */ st({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: n, colors: i } = it(nt(s, "theme")), a = A(() => s.data?.top_agents && s.data.top_agents.length > 0), o = A(() => s.data?.top_agents ? [...s.data.top_agents].sort((f, p) => (p.total_cost || 0) - (f.total_cost || 0)) : []), r = A(() => s.data?.top_agents ? [...s.data.top_agents].sort((f, p) => (p.total_tokens || 0) - (f.total_tokens || 0)) : []), l = A(() => {
      const f = o.value;
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
    }), c = A(() => {
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
    }), d = A(() => s.options ? s.options : {
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: {
          display: !1
        },
        tooltip: {
          enabled: !0,
          backgroundColor: i.value.tooltipBg,
          titleColor: i.value.tooltipText,
          bodyColor: i.value.tooltipText,
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
              const p = f.label, g = s.data?.top_agents?.find((m) => m.agent_type === p);
              return g ? [
                `Total Cost: ${rt(g.total_cost)}`,
                `Input Cost: ${rt(g.total_input_tokens_cost)}`,
                `Output Cost: ${rt(g.total_output_tokens_cost)}`,
                `Cache Read: ${rt(g.total_read_tokens_cost)}`,
                `Cache Write: ${rt(g.total_write_tokens_cost)}`
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
            color: i.value.textSecondary,
            padding: 8
          }
        },
        y: {
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
            callback: function(f) {
              return rt(f);
            }
          }
        }
      }
    }), u = A(() => s.options ? s.options : {
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: {
          display: !1
        },
        tooltip: {
          enabled: !0,
          backgroundColor: i.value.tooltipBg,
          titleColor: i.value.tooltipText,
          bodyColor: i.value.tooltipText,
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
              const p = f.label, g = s.data?.top_agents?.find((m) => m.agent_type === p);
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
            color: i.value.textSecondary,
            padding: 8
          }
        },
        y: {
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
            callback: function(f) {
              return f.toLocaleString();
            }
          }
        }
      }
    });
    return t({ isDark: n }), (f, p) => (_(), k("article", _y, [
      p[5] || (p[5] = h("header", { class: "card-header" }, [
        h("div", { class: "header-content" }, [
          h("h3", { class: "card-title" }, "Top Agents Analysis"),
          h("p", { class: "card-subtitle" }, "Cost and token usage by agent")
        ])
      ], -1)),
      e.loading ? (_(), k("div", Ty, [...p[4] || (p[4] = [
        X('<div class="loading-container" data-v-70e9262e><div class="chart-lines-loader" data-v-70e9262e><div class="line line-1" data-v-70e9262e></div><div class="line line-2" data-v-70e9262e></div><div class="line line-3" data-v-70e9262e></div><div class="line line-4" data-v-70e9262e></div><div class="line line-5" data-v-70e9262e></div></div><p class="loading-text" data-v-70e9262e>Loading chart data...</p></div>', 1)
      ])])) : (_(), k("div", xy, [
        a.value ? (_(), k("div", ky, [
          h("section", My, [
            p[0] || (p[0] = h("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
            h("div", Sy, [
              U(pe, {
                data: l.value,
                options: d.value
              }, null, 8, ["data", "options"])
            ])
          ]),
          h("section", wy, [
            p[1] || (p[1] = h("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
            h("div", Cy, [
              U(pe, {
                data: c.value,
                options: u.value
              }, null, 8, ["data", "options"])
            ])
          ])
        ])) : (_(), k("section", $y, [
          h("div", Dy, [
            h("div", Ay, [
              U(T(Ft), { class: "empty-icon" })
            ]),
            p[2] || (p[2] = h("p", { class: "empty-title" }, "No top agents data", -1)),
            p[3] || (p[3] = h("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent analysis.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Py = /* @__PURE__ */ G(Fy, [["__scopeId", "data-v-70e9262e"]]), By = { class: "top-agents-card" }, Ly = {
  key: 0,
  class: "card-body"
}, Oy = {
  key: 0,
  class: "chart-section"
}, Ey = { class: "chart-container" }, Ry = {
  key: 1,
  class: "empty-state"
}, Iy = { class: "empty-state-content" }, zy = { class: "empty-icon-wrapper" }, Wy = {
  key: 1,
  class: "loading-state"
}, Hy = /* @__PURE__ */ st({
  __name: "TopAgents",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: n, colors: i } = it(nt(s, "theme")), a = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, o = A(() => s.data?.top_agents ? s.data.top_agents.filter(
      (u) => u.agent_type?.toLowerCase() !== "triage"
    ) : []), r = A(() => o.value.length > 0), l = A(() => o.value.reduce((u, f) => u + (f.conversations || 0), 0)), c = A(() => {
      const u = o.value;
      if (u.length === 0)
        return { labels: [], datasets: [] };
      const f = u.map((m) => {
        const b = m.agent_type?.toLowerCase();
        return (a[b] || "#a78bfa") + "80";
      }), p = u.map((m) => {
        const b = m.agent_type?.toLowerCase();
        return a[b] || "#a78bfa";
      });
      return {
        labels: u.map((m) => {
          const b = m.conversations || 0, v = l.value ? b / l.value * 100 : 0;
          return `${m.agent_type} - ${b.toLocaleString()} (${v.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: u.map((m) => m.conversations || 0),
            backgroundColor: f,
            borderColor: p,
            borderWidth: 2
          }
        ]
      };
    }), d = A(() => s.options ? s.options : {
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
            color: i.value.textSecondary,
            usePointStyle: !0,
            padding: 16,
            boxWidth: 8,
            boxHeight: 8
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: i.value.tooltipBg,
          titleColor: i.value.tooltipText,
          bodyColor: i.value.tooltipText,
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
              const f = (u.label || "").toString(), p = Number(u.parsed) || 0, g = (u.dataset.data || []).reduce((b, v) => b + (Number(v) || 0), 0), m = g ? p / g * 100 : 0;
              return `${f}: ${p.toLocaleString()} (${m.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: n }), (u, f) => (_(), k("article", By, [
      f[3] || (f[3] = h("header", { class: "card-header" }, [
        h("div", { class: "header-content" }, [
          h("h3", { class: "card-title" }, "Top Agents"),
          h("p", { class: "card-subtitle" }, "Interactions by agent (excluding triage)")
        ])
      ], -1)),
      e.loading ? (_(), k("div", Wy, [...f[2] || (f[2] = [
        X('<div class="loading-container" data-v-1a8dbcdf><div class="chart-lines-loader" data-v-1a8dbcdf><div class="line line-1" data-v-1a8dbcdf></div><div class="line line-2" data-v-1a8dbcdf></div><div class="line line-3" data-v-1a8dbcdf></div><div class="line line-4" data-v-1a8dbcdf></div><div class="line line-5" data-v-1a8dbcdf></div></div><p class="loading-text" data-v-1a8dbcdf>Loading chart data...</p></div>', 1)
      ])])) : (_(), k("div", Ly, [
        r.value ? (_(), k("section", Oy, [
          h("div", Ey, [
            U(fn, {
              data: c.value,
              options: d.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (_(), k("section", Ry, [
          h("div", Iy, [
            h("div", zy, [
              U(T(Ft), { class: "empty-icon" })
            ]),
            f[0] || (f[0] = h("p", { class: "empty-title" }, "No top agents data", -1)),
            f[1] || (f[1] = h("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Ny = /* @__PURE__ */ G(Hy, [["__scopeId", "data-v-1a8dbcdf"]]), Vy = { class: "daily-cost-trends-card" }, jy = {
  key: 0,
  class: "card-body"
}, Yy = {
  key: 0,
  class: "chart-section"
}, Uy = { class: "chart-container" }, qy = {
  key: 1,
  class: "empty-state"
}, Xy = { class: "empty-state-content" }, Ky = { class: "empty-icon-wrapper" }, Gy = {
  key: 1,
  class: "loading-state"
}, Qy = /* @__PURE__ */ st({
  __name: "DailyCostTrends",
  props: {
    costData: { default: () => ({}) },
    conversationData: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: n, colors: i } = it(nt(s, "theme")), a = (c) => {
      const d = new Date(c), u = String(d.getDate()).padStart(2, "0");
      return `${String(d.getMonth() + 1).padStart(2, "0")}-${u}`;
    }, o = A(() => {
      const c = s.costData?.costs_by_day || {}, d = s.conversationData?.conversations_by_day || {};
      return Object.keys(c).length > 0 && Object.keys(d).length > 0;
    }), r = A(() => {
      const c = s.costData?.costs_by_day || {}, d = s.conversationData?.conversations_by_day || {}, f = Object.keys(c).filter((m) => d[m]).sort();
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const p = f.map((m) => a(m)), g = f.map((m) => {
        const b = c[m]?.total_cost || 0, v = d[m] || 0;
        return v > 0 ? b / v : 0;
      });
      return {
        labels: p,
        datasets: [
          {
            label: "Mean USD/conv",
            data: g,
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
    }), l = A(() => s.options ? s.options : {
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
            color: i.value.textSecondary,
            padding: 12,
            boxWidth: 40,
            boxHeight: 12,
            borderRadius: 4,
            usePointStyle: !1
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: i.value.tooltipBg,
          titleColor: i.value.tooltipText,
          bodyColor: i.value.tooltipText,
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
              return d && (d += ": "), c.parsed.y !== null && (d += rt(c.parsed.y)), d;
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
            color: i.value.textSecondary,
            padding: 8
          }
        },
        y: {
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
            callback: function(c) {
              return rt(c);
            }
          }
        }
      }
    });
    return t({ isDark: n }), (c, d) => (_(), k("article", Vy, [
      d[3] || (d[3] = h("header", { class: "card-header" }, [
        h("div", { class: "header-content" }, [
          h("h3", { class: "card-title" }, "Daily Cost Trends"),
          h("p", { class: "card-subtitle" }, "Mean USD/conversation per day")
        ])
      ], -1)),
      e.loading ? (_(), k("div", Gy, [...d[2] || (d[2] = [
        X('<div class="loading-container" data-v-0a7b96d2><div class="chart-lines-loader" data-v-0a7b96d2><div class="line line-1" data-v-0a7b96d2></div><div class="line line-2" data-v-0a7b96d2></div><div class="line line-3" data-v-0a7b96d2></div><div class="line line-4" data-v-0a7b96d2></div><div class="line line-5" data-v-0a7b96d2></div></div><p class="loading-text" data-v-0a7b96d2>Loading chart data...</p></div>', 1)
      ])])) : (_(), k("div", jy, [
        o.value ? (_(), k("section", Yy, [
          h("div", Uy, [
            U(ve, {
              data: r.value,
              options: l.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (_(), k("section", qy, [
          h("div", Xy, [
            h("div", Ky, [
              U(T(Ft), { class: "empty-icon" })
            ]),
            d[0] || (d[0] = h("p", { class: "empty-title" }, "No daily cost trends data", -1)),
            d[1] || (d[1] = h("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Zy = /* @__PURE__ */ G(Qy, [["__scopeId", "data-v-0a7b96d2"]]), Jy = { class: "model-usage-card" }, t_ = {
  key: 0,
  class: "loading-state"
}, e_ = {
  key: 1,
  class: "card-body"
}, s_ = { class: "tabs-container" }, n_ = {
  class: "tabs-nav",
  "aria-label": "Model Usage Tabs"
}, i_ = ["aria-selected"], a_ = ["aria-selected"], o_ = {
  key: 0,
  class: "table-section"
}, r_ = { class: "table-wrapper" }, l_ = { class: "data-table" }, c_ = { class: "table-header-row" }, d_ = { class: "table-header" }, h_ = { class: "table-body" }, u_ = { class: "table-cell name-cell" }, f_ = { class: "table-cell text-center" }, g_ = { class: "table-cell text-center" }, p_ = { class: "table-cell text-center" }, m_ = { class: "table-cell text-center cost-cell" }, b_ = { class: "table-cell text-center" }, v_ = {
  key: 1,
  class: "empty-state"
}, y_ = { class: "empty-state-content" }, __ = { class: "empty-icon-wrapper" }, x_ = /* @__PURE__ */ st({
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
    const n = e, i = s, a = (u) => {
      i("export", u);
    }, { isDark: o } = it(nt(n, "theme")), r = wt("by_model"), l = A(() => r.value === "by_model" ? n.data?.total_by_model || {} : n.data?.total_by_provider || {}), c = (u) => u == null ? "0" : H(u), d = (u) => u == null ? "$0.00" : rt(u);
    return t({ isDark: o }), (u, f) => (_(), k("article", Jy, [
      f[10] || (f[10] = h("header", { class: "card-header" }, [
        h("div", { class: "header-content" }, [
          h("h3", { class: "card-title" }, "Model Usage"),
          h("p", { class: "card-subtitle" }, "AI model performance and costs")
        ])
      ], -1)),
      e.loading ? (_(), k("div", t_, [...f[2] || (f[2] = [
        X('<div class="loading-container" data-v-a7bf2d7b><div class="chart-bars-loader" data-v-a7bf2d7b><div class="bar bar-1" data-v-a7bf2d7b></div><div class="bar bar-2" data-v-a7bf2d7b></div><div class="bar bar-3" data-v-a7bf2d7b></div><div class="bar bar-4" data-v-a7bf2d7b></div><div class="bar bar-5" data-v-a7bf2d7b></div></div><p class="loading-text" data-v-a7bf2d7b>Loading model usage data...</p></div>', 1)
      ])])) : (_(), k("div", e_, [
        h("div", s_, [
          h("nav", n_, [
            h("button", {
              onClick: f[0] || (f[0] = (p) => r.value = "by_model"),
              class: ns(["tab-button", { "tab-active": r.value === "by_model" }]),
              "aria-selected": r.value === "by_model",
              role: "tab"
            }, " Model ", 10, i_),
            h("button", {
              onClick: f[1] || (f[1] = (p) => r.value = "by_provider"),
              class: ns(["tab-button", { "tab-active": r.value === "by_provider" }]),
              "aria-selected": r.value === "by_provider",
              role: "tab"
            }, " Provider ", 10, a_)
          ])
        ]),
        l.value && Object.keys(l.value).length > 0 ? (_(), k("div", o_, [
          h("div", r_, [
            h("table", l_, [
              h("thead", null, [
                h("tr", c_, [
                  h("th", d_, w(r.value === "by_model" ? "Model" : "Provider"), 1),
                  f[3] || (f[3] = h("th", { class: "table-header" }, "Avg cost per message", -1)),
                  f[4] || (f[4] = h("th", { class: "table-header" }, "Avg tokens per message", -1)),
                  f[5] || (f[5] = h("th", { class: "table-header" }, "Message count", -1)),
                  f[6] || (f[6] = h("th", { class: "table-header" }, "Total cost", -1)),
                  f[7] || (f[7] = h("th", { class: "table-header" }, "Total tokens", -1))
                ])
              ]),
              h("tbody", h_, [
                (_(!0), k(K, null, lt(l.value, (p, g) => (_(), k("tr", {
                  key: g,
                  class: "table-row"
                }, [
                  h("td", u_, w(g), 1),
                  h("td", f_, w(d(p.avg_cost_per_message)), 1),
                  h("td", g_, w(c(p.avg_tokens_per_message)), 1),
                  h("td", p_, w(c(p.message_count)), 1),
                  h("td", m_, w(d(p.total_cost)), 1),
                  h("td", b_, w(c(p.total_tokens)), 1)
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (_(), gt(T(_t), {
            key: 0,
            onExport: a,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (_(), k("div", v_, [
          h("div", y_, [
            h("div", __, [
              U(T(Ft), { class: "empty-icon" })
            ]),
            f[8] || (f[8] = h("p", { class: "empty-title" }, "No model usage data available", -1)),
            f[9] || (f[9] = h("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see model performance metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), k_ = /* @__PURE__ */ G(x_, [["__scopeId", "data-v-a7bf2d7b"]]), M_ = { class: "message-roles-card" }, S_ = {
  key: 0,
  class: "loading-state"
}, w_ = {
  key: 1,
  class: "card-body"
}, C_ = {
  key: 0,
  class: "table-section"
}, $_ = { class: "table-wrapper" }, D_ = { class: "data-table" }, A_ = { class: "table-body" }, T_ = { class: "table-cell name-cell" }, F_ = { class: "table-cell text-center" }, P_ = { class: "table-cell text-center" }, B_ = { class: "table-cell text-center" }, L_ = { class: "table-cell text-center cost-cell" }, O_ = { class: "table-cell text-center" }, E_ = {
  key: 1,
  class: "empty-state"
}, R_ = { class: "empty-state-content" }, I_ = { class: "empty-icon-wrapper" }, z_ = /* @__PURE__ */ st({
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
    const n = e, i = s, a = (p) => {
      i("export", p);
    }, { isDark: o } = it(nt(n, "theme")), r = ["assistant", "system", "user"], l = A(() => n.data?.total_by_role || {}), c = A(() => Object.keys(l.value).length > 0), d = (p) => p == null ? "0" : H(p), u = (p) => p == null ? "$0.00" : rt(p), f = (p) => p.charAt(0).toUpperCase() + p.slice(1);
    return t({ isDark: o }), (p, g) => (_(), k("article", M_, [
      g[4] || (g[4] = h("header", { class: "card-header" }, [
        h("div", { class: "header-content" }, [
          h("h3", { class: "card-title" }, "Message Roles"),
          h("p", { class: "card-subtitle" }, "Performance by message role")
        ])
      ], -1)),
      e.loading ? (_(), k("div", S_, [...g[0] || (g[0] = [
        X('<div class="loading-container" data-v-6a953cfc><div class="chart-bars-loader" data-v-6a953cfc><div class="bar bar-1" data-v-6a953cfc></div><div class="bar bar-2" data-v-6a953cfc></div><div class="bar bar-3" data-v-6a953cfc></div><div class="bar bar-4" data-v-6a953cfc></div><div class="bar bar-5" data-v-6a953cfc></div></div><p class="loading-text" data-v-6a953cfc>Loading message role data...</p></div>', 1)
      ])])) : (_(), k("div", w_, [
        c.value ? (_(), k("div", C_, [
          h("div", $_, [
            h("table", D_, [
              g[1] || (g[1] = h("thead", null, [
                h("tr", { class: "table-header-row" }, [
                  h("th", { class: "table-header" }, "Role"),
                  h("th", { class: "table-header" }, "Avg cost per message"),
                  h("th", { class: "table-header" }, "Avg tokens per message"),
                  h("th", { class: "table-header" }, "Message count"),
                  h("th", { class: "table-header" }, "Total cost"),
                  h("th", { class: "table-header" }, "Total tokens")
                ])
              ], -1)),
              h("tbody", A_, [
                (_(), k(K, null, lt(r, (m) => h("tr", {
                  key: m,
                  class: "table-row"
                }, [
                  h("td", T_, w(f(m)), 1),
                  h("td", F_, w(u(l.value[m]?.avg_cost_per_message)), 1),
                  h("td", P_, w(d(l.value[m]?.avg_tokens_per_message)), 1),
                  h("td", B_, w(d(l.value[m]?.message_count)), 1),
                  h("td", L_, w(u(l.value[m]?.total_cost)), 1),
                  h("td", O_, w(d(l.value[m]?.total_tokens)), 1)
                ])), 64))
              ])
            ])
          ]),
          e.enableExport ? (_(), gt(T(_t), {
            key: 0,
            onExport: a,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (_(), k("div", E_, [
          h("div", R_, [
            h("div", I_, [
              U(T(Ft), { class: "empty-icon" })
            ]),
            g[2] || (g[2] = h("p", { class: "empty-title" }, "No message role data available", -1)),
            g[3] || (g[3] = h("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), W_ = /* @__PURE__ */ G(z_, [["__scopeId", "data-v-6a953cfc"]]), X_ = {
  install(e) {
    e.component("KiutChartBar", pe), e.component("KiutChartLine", ve), e.component("KiutPieChart", fn), e.component("KiutBoxplotChart", Jh), e.component("KiutCandlestickChart", ja), e.component("KiutHistogramChart", Ya), e.component("KiutSankeyChart", ae), e.component("KiutAgentsPerDay", og), e.component("KiutBookingManager", Wg), e.component("KiutCheckin", dp), e.component("KiutCheckinMetrics", Op), e.component("KiutCheckinSegments", l0), e.component("KiutDisruption", j0), e.component("KiutFAQ", lm), e.component("KiutMessagesPerAgent", bm), e.component("KiutRecordLocator", Nm), e.component("KiutSeller", mb), e.component("KiutTopAgents", wb), e.component("KiutPaymentMethod", ev), e.component("KiutNpsDailyMetrics", Ua), e.component("KiutNpsMetrics", Hv), e.component("KiutNpsOverviewMetrics", qa), e.component("KiutAWSCost", p1), e.component("KiutCostUsage", I1), e.component("KiutTokenUsage", ay), e.component("KiutConversationCount", yy), e.component("KiutTopAgentsAnalysis", Py), e.component("KiutTopAgentsPie", Ny), e.component("KiutDailyCostTrends", Zy), e.component("KiutModelUsage", k_), e.component("KiutMessageRoles", W_);
  }
};
export {
  p1 as AWSCost,
  og as AgentsPerDay,
  Wg as BookingManager,
  Jh as BoxplotChart,
  ja as CandlestickChart,
  pe as ChartBar,
  ve as ChartLine,
  dp as Checkin,
  Op as CheckinMetrics,
  l0 as CheckinSegments,
  yy as ConversationCount,
  I1 as CostUsage,
  Zy as DailyCostTrends,
  j0 as Disruption,
  lm as FAQ,
  Ya as HistogramChart,
  X_ as KiutUIPlugin,
  W_ as MessageRoles,
  bm as MessagesPerAgent,
  k_ as ModelUsage,
  Ua as NpsDailyMetrics,
  Hv as NpsMetrics,
  qa as NpsOverviewMetrics,
  ev as PaymentMethod,
  fn as PieChart,
  Nm as RecordLocator,
  ae as SankeyChart,
  mb as Seller,
  ay as TokenUsage,
  wb as TopAgents,
  Py as TopAgentsAnalysis,
  Ny as TopAgentsPie
};
//# sourceMappingURL=kiut-ui.es.js.map
