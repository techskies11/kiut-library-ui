import { defineComponent as G, shallowRef as zn, h as Os, ref as xt, onMounted as us, onUnmounted as Wn, watch as Ht, toRaw as Rs, nextTick as Nn, version as Yi, isProxy as Hn, computed as T, toRef as Q, createElementBlock as x, openBlock as y, createVNode as V, unref as F, normalizeStyle as mt, createCommentVNode as I, createElementVNode as c, toDisplayString as w, Fragment as Y, renderList as et, onBeforeUnmount as qi, createStaticVNode as j, withDirectives as da, vShow as ha, normalizeClass as Pe, createBlock as lt, createTextVNode as oe, resolveDynamicComponent as Ui } from "vue";
import * as ua from "echarts/core";
import { TooltipComponent as Ki, TitleComponent as Xi } from "echarts/components";
import { SankeyChart as Gi } from "echarts/charts";
import { CanvasRenderer as Zi } from "echarts/renderers";
import Ct from "moment";
function He(e) {
  return e + 0.5 | 0;
}
const Yt = (e, t, s) => Math.max(Math.min(e, s), t);
function Ce(e) {
  return Yt(He(e * 2.55), 0, 255);
}
function Kt(e) {
  return Yt(He(e * 255), 0, 255);
}
function zt(e) {
  return Yt(He(e / 2.55) / 100, 0, 1);
}
function fa(e) {
  return Yt(He(e * 100), 0, 100);
}
const At = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Is = [..."0123456789ABCDEF"], Qi = (e) => Is[e & 15], Ji = (e) => Is[(e & 240) >> 4] + Is[e & 15], Ve = (e) => (e & 240) >> 4 === (e & 15), to = (e) => Ve(e.r) && Ve(e.g) && Ve(e.b) && Ve(e.a);
function eo(e) {
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
const so = (e, t) => e < 255 ? t(e) : "";
function ao(e) {
  var t = to(e) ? Qi : Ji;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + so(e.a, t) : void 0;
}
const no = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function jn(e, t, s) {
  const a = t * Math.min(s, 1 - s), n = (i, o = (i + e / 30) % 12) => s - a * Math.max(Math.min(o - 3, 9 - o, 1), -1);
  return [n(0), n(8), n(4)];
}
function io(e, t, s) {
  const a = (n, i = (n + e / 60) % 6) => s - s * t * Math.max(Math.min(i, 4 - i, 1), 0);
  return [a(5), a(3), a(1)];
}
function oo(e, t, s) {
  const a = jn(e, 1, 0.5);
  let n;
  for (t + s > 1 && (n = 1 / (t + s), t *= n, s *= n), n = 0; n < 3; n++)
    a[n] *= 1 - t - s, a[n] += t;
  return a;
}
function ro(e, t, s, a, n) {
  return e === n ? (t - s) / a + (t < s ? 6 : 0) : t === n ? (s - e) / a + 2 : (e - t) / a + 4;
}
function qs(e) {
  const s = e.r / 255, a = e.g / 255, n = e.b / 255, i = Math.max(s, a, n), o = Math.min(s, a, n), r = (i + o) / 2;
  let l, d, h;
  return i !== o && (h = i - o, d = r > 0.5 ? h / (2 - i - o) : h / (i + o), l = ro(s, a, n, h, i), l = l * 60 + 0.5), [l | 0, d || 0, r];
}
function Us(e, t, s, a) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, s, a)).map(Kt);
}
function Ks(e, t, s) {
  return Us(jn, e, t, s);
}
function lo(e, t, s) {
  return Us(oo, e, t, s);
}
function co(e, t, s) {
  return Us(io, e, t, s);
}
function Vn(e) {
  return (e % 360 + 360) % 360;
}
function ho(e) {
  const t = no.exec(e);
  let s = 255, a;
  if (!t)
    return;
  t[5] !== a && (s = t[6] ? Ce(+t[5]) : Kt(+t[5]));
  const n = Vn(+t[2]), i = +t[3] / 100, o = +t[4] / 100;
  return t[1] === "hwb" ? a = lo(n, i, o) : t[1] === "hsv" ? a = co(n, i, o) : a = Ks(n, i, o), {
    r: a[0],
    g: a[1],
    b: a[2],
    a: s
  };
}
function uo(e, t) {
  var s = qs(e);
  s[0] = Vn(s[0] + t), s = Ks(s), e.r = s[0], e.g = s[1], e.b = s[2];
}
function fo(e) {
  if (!e)
    return;
  const t = qs(e), s = t[0], a = fa(t[1]), n = fa(t[2]);
  return e.a < 255 ? `hsla(${s}, ${a}%, ${n}%, ${zt(e.a)})` : `hsl(${s}, ${a}%, ${n}%)`;
}
const ga = {
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
}, pa = {
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
function go() {
  const e = {}, t = Object.keys(pa), s = Object.keys(ga);
  let a, n, i, o, r;
  for (a = 0; a < t.length; a++) {
    for (o = r = t[a], n = 0; n < s.length; n++)
      i = s[n], r = r.replace(i, ga[i]);
    i = parseInt(pa[o], 16), e[r] = [i >> 16 & 255, i >> 8 & 255, i & 255];
  }
  return e;
}
let Ye;
function po(e) {
  Ye || (Ye = go(), Ye.transparent = [0, 0, 0, 0]);
  const t = Ye[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const bo = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function mo(e) {
  const t = bo.exec(e);
  let s = 255, a, n, i;
  if (t) {
    if (t[7] !== a) {
      const o = +t[7];
      s = t[8] ? Ce(o) : Yt(o * 255, 0, 255);
    }
    return a = +t[1], n = +t[3], i = +t[5], a = 255 & (t[2] ? Ce(a) : Yt(a, 0, 255)), n = 255 & (t[4] ? Ce(n) : Yt(n, 0, 255)), i = 255 & (t[6] ? Ce(i) : Yt(i, 0, 255)), {
      r: a,
      g: n,
      b: i,
      a: s
    };
  }
}
function vo(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${zt(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const ks = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, he = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function _o(e, t, s) {
  const a = he(zt(e.r)), n = he(zt(e.g)), i = he(zt(e.b));
  return {
    r: Kt(ks(a + s * (he(zt(t.r)) - a))),
    g: Kt(ks(n + s * (he(zt(t.g)) - n))),
    b: Kt(ks(i + s * (he(zt(t.b)) - i))),
    a: e.a + s * (t.a - e.a)
  };
}
function qe(e, t, s) {
  if (e) {
    let a = qs(e);
    a[t] = Math.max(0, Math.min(a[t] + a[t] * s, t === 0 ? 360 : 1)), a = Ks(a), e.r = a[0], e.g = a[1], e.b = a[2];
  }
}
function Yn(e, t) {
  return e && Object.assign(t || {}, e);
}
function ba(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = Kt(e[3]))) : (t = Yn(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = Kt(t.a)), t;
}
function yo(e) {
  return e.charAt(0) === "r" ? mo(e) : ho(e);
}
class Le {
  constructor(t) {
    if (t instanceof Le)
      return t;
    const s = typeof t;
    let a;
    s === "object" ? a = ba(t) : s === "string" && (a = eo(t) || po(t) || yo(t)), this._rgb = a, this._valid = !!a;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = Yn(this._rgb);
    return t && (t.a = zt(t.a)), t;
  }
  set rgb(t) {
    this._rgb = ba(t);
  }
  rgbString() {
    return this._valid ? vo(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? ao(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? fo(this._rgb) : void 0;
  }
  mix(t, s) {
    if (t) {
      const a = this.rgb, n = t.rgb;
      let i;
      const o = s === i ? 0.5 : s, r = 2 * o - 1, l = a.a - n.a, d = ((r * l === -1 ? r : (r + l) / (1 + r * l)) + 1) / 2;
      i = 1 - d, a.r = 255 & d * a.r + i * n.r + 0.5, a.g = 255 & d * a.g + i * n.g + 0.5, a.b = 255 & d * a.b + i * n.b + 0.5, a.a = o * a.a + (1 - o) * n.a, this.rgb = a;
    }
    return this;
  }
  interpolate(t, s) {
    return t && (this._rgb = _o(this._rgb, t._rgb, s)), this;
  }
  clone() {
    return new Le(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = Kt(t), this;
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
    return qe(this._rgb, 2, t), this;
  }
  darken(t) {
    return qe(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return qe(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return qe(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return uo(this._rgb, t), this;
  }
}
function Ot() {
}
const xo = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function tt(e) {
  return e == null;
}
function pt(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function X(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function kt(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function Ft(e, t) {
  return kt(e) ? e : t;
}
function U(e, t) {
  return typeof e > "u" ? t : e;
}
const ko = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, qn = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function ct(e, t, s) {
  if (e && typeof e.call == "function")
    return e.apply(s, t);
}
function nt(e, t, s, a) {
  let n, i, o;
  if (pt(e))
    for (i = e.length, n = 0; n < i; n++)
      t.call(s, e[n], n);
  else if (X(e))
    for (o = Object.keys(e), i = o.length, n = 0; n < i; n++)
      t.call(s, e[o[n]], o[n]);
}
function is(e, t) {
  let s, a, n, i;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (s = 0, a = e.length; s < a; ++s)
    if (n = e[s], i = t[s], n.datasetIndex !== i.datasetIndex || n.index !== i.index)
      return !1;
  return !0;
}
function os(e) {
  if (pt(e))
    return e.map(os);
  if (X(e)) {
    const t = /* @__PURE__ */ Object.create(null), s = Object.keys(e), a = s.length;
    let n = 0;
    for (; n < a; ++n)
      t[s[n]] = os(e[s[n]]);
    return t;
  }
  return e;
}
function Un(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function Mo(e, t, s, a) {
  if (!Un(e))
    return;
  const n = t[e], i = s[e];
  X(n) && X(i) ? Ee(n, i, a) : t[e] = os(i);
}
function Ee(e, t, s) {
  const a = pt(t) ? t : [
    t
  ], n = a.length;
  if (!X(e))
    return e;
  s = s || {};
  const i = s.merger || Mo;
  let o;
  for (let r = 0; r < n; ++r) {
    if (o = a[r], !X(o))
      continue;
    const l = Object.keys(o);
    for (let d = 0, h = l.length; d < h; ++d)
      i(l[d], e, o, s);
  }
  return e;
}
function Ae(e, t) {
  return Ee(e, t, {
    merger: So
  });
}
function So(e, t, s) {
  if (!Un(e))
    return;
  const a = t[e], n = s[e];
  X(a) && X(n) ? Ae(a, n) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = os(n));
}
const ma = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function wo(e) {
  const t = e.split("."), s = [];
  let a = "";
  for (const n of t)
    a += n, a.endsWith("\\") ? a = a.slice(0, -1) + "." : (s.push(a), a = "");
  return s;
}
function Co(e) {
  const t = wo(e);
  return (s) => {
    for (const a of t) {
      if (a === "")
        break;
      s = s && s[a];
    }
    return s;
  };
}
function re(e, t) {
  return (ma[t] || (ma[t] = Co(t)))(e);
}
function Xs(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const Oe = (e) => typeof e < "u", Xt = (e) => typeof e == "function", va = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const s of e)
    if (!t.has(s))
      return !1;
  return !0;
};
function $o(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const it = Math.PI, ht = 2 * it, Do = ht + it, rs = Number.POSITIVE_INFINITY, Ao = it / 180, bt = it / 2, Jt = it / 4, _a = it * 2 / 3, Kn = Math.log10, Et = Math.sign;
function Te(e, t, s) {
  return Math.abs(e - t) < s;
}
function ya(e) {
  const t = Math.round(e);
  e = Te(e, t, e / 1e3) ? t : e;
  const s = Math.pow(10, Math.floor(Kn(e))), a = e / s;
  return (a <= 1 ? 1 : a <= 2 ? 2 : a <= 5 ? 5 : 10) * s;
}
function To(e) {
  const t = [], s = Math.sqrt(e);
  let a;
  for (a = 1; a < s; a++)
    e % a === 0 && (t.push(a), t.push(e / a));
  return s === (s | 0) && t.push(s), t.sort((n, i) => n - i).pop(), t;
}
function Bo(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function Re(e) {
  return !Bo(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function Fo(e, t) {
  const s = Math.round(e);
  return s - t <= e && s + t >= e;
}
function Po(e, t, s) {
  let a, n, i;
  for (a = 0, n = e.length; a < n; a++)
    i = e[a][s], isNaN(i) || (t.min = Math.min(t.min, i), t.max = Math.max(t.max, i));
}
function Wt(e) {
  return e * (it / 180);
}
function Lo(e) {
  return e * (180 / it);
}
function xa(e) {
  if (!kt(e))
    return;
  let t = 1, s = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, s++;
  return s;
}
function Xn(e, t) {
  const s = t.x - e.x, a = t.y - e.y, n = Math.sqrt(s * s + a * a);
  let i = Math.atan2(a, s);
  return i < -0.5 * it && (i += ht), {
    angle: i,
    distance: n
  };
}
function zs(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function Eo(e, t) {
  return (e - t + Do) % ht - it;
}
function Dt(e) {
  return (e % ht + ht) % ht;
}
function Ie(e, t, s, a) {
  const n = Dt(e), i = Dt(t), o = Dt(s), r = Dt(i - n), l = Dt(o - n), d = Dt(n - i), h = Dt(n - o);
  return n === i || n === o || a && i === o || r > l && d < h;
}
function _t(e, t, s) {
  return Math.max(t, Math.min(s, e));
}
function Oo(e) {
  return _t(e, -32768, 32767);
}
function Nt(e, t, s, a = 1e-6) {
  return e >= Math.min(t, s) - a && e <= Math.max(t, s) + a;
}
function Gs(e, t, s) {
  s = s || ((o) => e[o] < t);
  let a = e.length - 1, n = 0, i;
  for (; a - n > 1; )
    i = n + a >> 1, s(i) ? n = i : a = i;
  return {
    lo: n,
    hi: a
  };
}
const ne = (e, t, s, a) => Gs(e, s, a ? (n) => {
  const i = e[n][t];
  return i < s || i === s && e[n + 1][t] === s;
} : (n) => e[n][t] < s), Ro = (e, t, s) => Gs(e, s, (a) => e[a][t] >= s);
function Io(e, t, s) {
  let a = 0, n = e.length;
  for (; a < n && e[a] < t; )
    a++;
  for (; n > a && e[n - 1] > s; )
    n--;
  return a > 0 || n < e.length ? e.slice(a, n) : e;
}
const Gn = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function zo(e, t) {
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
  }), Gn.forEach((s) => {
    const a = "_onData" + Xs(s), n = e[s];
    Object.defineProperty(e, s, {
      configurable: !0,
      enumerable: !1,
      value(...i) {
        const o = n.apply(this, i);
        return e._chartjs.listeners.forEach((r) => {
          typeof r[a] == "function" && r[a](...i);
        }), o;
      }
    });
  });
}
function ka(e, t) {
  const s = e._chartjs;
  if (!s)
    return;
  const a = s.listeners, n = a.indexOf(t);
  n !== -1 && a.splice(n, 1), !(a.length > 0) && (Gn.forEach((i) => {
    delete e[i];
  }), delete e._chartjs);
}
function Zn(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const Qn = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function Jn(e, t) {
  let s = [], a = !1;
  return function(...n) {
    s = n, a || (a = !0, Qn.call(window, () => {
      a = !1, e.apply(t, s);
    }));
  };
}
function Wo(e, t) {
  let s;
  return function(...a) {
    return t ? (clearTimeout(s), s = setTimeout(e, t, a)) : e.apply(this, a), t;
  };
}
const Zs = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", vt = (e, t, s) => e === "start" ? t : e === "end" ? s : (t + s) / 2, No = (e, t, s, a) => e === (a ? "left" : "right") ? s : e === "center" ? (t + s) / 2 : t;
function Ho(e, t, s) {
  const a = t.length;
  let n = 0, i = a;
  if (e._sorted) {
    const { iScale: o, vScale: r, _parsed: l } = e, d = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, h = o.axis, { min: u, max: f, minDefined: p, maxDefined: g } = o.getUserBounds();
    if (p) {
      if (n = Math.min(
        // @ts-expect-error Need to type _parsed
        ne(l, h, u).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        s ? a : ne(t, h, o.getPixelForValue(u)).lo
      ), d) {
        const b = l.slice(0, n + 1).reverse().findIndex((m) => !tt(m[r.axis]));
        n -= Math.max(0, b);
      }
      n = _t(n, 0, a - 1);
    }
    if (g) {
      let b = Math.max(
        // @ts-expect-error Need to type _parsed
        ne(l, o.axis, f, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        s ? 0 : ne(t, h, o.getPixelForValue(f), !0).hi + 1
      );
      if (d) {
        const m = l.slice(b - 1).findIndex((v) => !tt(v[r.axis]));
        b += Math.max(0, m);
      }
      i = _t(b, n, a) - n;
    } else
      i = a - n;
  }
  return {
    start: n,
    count: i
  };
}
function jo(e) {
  const { xScale: t, yScale: s, _scaleRanges: a } = e, n = {
    xmin: t.min,
    xmax: t.max,
    ymin: s.min,
    ymax: s.max
  };
  if (!a)
    return e._scaleRanges = n, !0;
  const i = a.xmin !== t.min || a.xmax !== t.max || a.ymin !== s.min || a.ymax !== s.max;
  return Object.assign(a, n), i;
}
const Ue = (e) => e === 0 || e === 1, Ma = (e, t, s) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * ht / s)), Sa = (e, t, s) => Math.pow(2, -10 * e) * Math.sin((e - t) * ht / s) + 1, Be = {
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
  easeInSine: (e) => -Math.cos(e * bt) + 1,
  easeOutSine: (e) => Math.sin(e * bt),
  easeInOutSine: (e) => -0.5 * (Math.cos(it * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => Ue(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => Ue(e) ? e : Ma(e, 0.075, 0.3),
  easeOutElastic: (e) => Ue(e) ? e : Sa(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return Ue(e) ? e : e < 0.5 ? 0.5 * Ma(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * Sa(e * 2 - 1, 0.1125, 0.45);
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
function Qs(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function wa(e) {
  return Qs(e) ? e : new Le(e);
}
function Ms(e) {
  return Qs(e) ? e : new Le(e).saturate(0.5).darken(0.1).hexString();
}
const Vo = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], Yo = [
  "color",
  "borderColor",
  "backgroundColor"
];
function qo(e) {
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
      properties: Yo
    },
    numbers: {
      type: "number",
      properties: Vo
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
function Uo(e) {
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
const Ca = /* @__PURE__ */ new Map();
function Ko(e, t) {
  t = t || {};
  const s = e + JSON.stringify(t);
  let a = Ca.get(s);
  return a || (a = new Intl.NumberFormat(e, t), Ca.set(s, a)), a;
}
function Js(e, t, s) {
  return Ko(t, s).format(e);
}
const Xo = {
  values(e) {
    return pt(e) ? e : "" + e;
  },
  numeric(e, t, s) {
    if (e === 0)
      return "0";
    const a = this.chart.options.locale;
    let n, i = e;
    if (s.length > 1) {
      const d = Math.max(Math.abs(s[0].value), Math.abs(s[s.length - 1].value));
      (d < 1e-4 || d > 1e15) && (n = "scientific"), i = Go(e, s);
    }
    const o = Kn(Math.abs(i)), r = isNaN(o) ? 1 : Math.max(Math.min(-1 * Math.floor(o), 20), 0), l = {
      notation: n,
      minimumFractionDigits: r,
      maximumFractionDigits: r
    };
    return Object.assign(l, this.options.ticks.format), Js(e, a, l);
  }
};
function Go(e, t) {
  let s = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(s) >= 1 && e !== Math.floor(e) && (s = e - Math.floor(e)), s;
}
var ti = {
  formatters: Xo
};
function Zo(e) {
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
      callback: ti.formatters.values,
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
const le = /* @__PURE__ */ Object.create(null), Ws = /* @__PURE__ */ Object.create(null);
function Fe(e, t) {
  if (!t)
    return e;
  const s = t.split(".");
  for (let a = 0, n = s.length; a < n; ++a) {
    const i = s[a];
    e = e[i] || (e[i] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function Ss(e, t, s) {
  return typeof t == "string" ? Ee(Fe(e, t), s) : Ee(Fe(e, ""), t);
}
class Qo {
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
    }, this.hover = {}, this.hoverBackgroundColor = (a, n) => Ms(n.backgroundColor), this.hoverBorderColor = (a, n) => Ms(n.borderColor), this.hoverColor = (a, n) => Ms(n.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(s);
  }
  set(t, s) {
    return Ss(this, t, s);
  }
  get(t) {
    return Fe(this, t);
  }
  describe(t, s) {
    return Ss(Ws, t, s);
  }
  override(t, s) {
    return Ss(le, t, s);
  }
  route(t, s, a, n) {
    const i = Fe(this, t), o = Fe(this, a), r = "_" + s;
    Object.defineProperties(i, {
      [r]: {
        value: i[s],
        writable: !0
      },
      [s]: {
        enumerable: !0,
        get() {
          const l = this[r], d = o[n];
          return X(l) ? Object.assign({}, d, l) : U(l, d);
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
var gt = /* @__PURE__ */ new Qo({
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
  qo,
  Uo,
  Zo
]);
function Jo(e) {
  return !e || tt(e.size) || tt(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function $a(e, t, s, a, n) {
  let i = t[n];
  return i || (i = t[n] = e.measureText(n).width, s.push(n)), i > a && (a = i), a;
}
function te(e, t, s) {
  const a = e.currentDevicePixelRatio, n = s !== 0 ? Math.max(s / 2, 0.5) : 0;
  return Math.round((t - n) * a) / a + n;
}
function Da(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function Ns(e, t, s, a) {
  ei(e, t, s, a, null);
}
function ei(e, t, s, a, n) {
  let i, o, r, l, d, h, u, f;
  const p = t.pointStyle, g = t.rotation, b = t.radius;
  let m = (g || 0) * Ao;
  if (p && typeof p == "object" && (i = p.toString(), i === "[object HTMLImageElement]" || i === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(s, a), e.rotate(m), e.drawImage(p, -p.width / 2, -p.height / 2, p.width, p.height), e.restore();
    return;
  }
  if (!(isNaN(b) || b <= 0)) {
    switch (e.beginPath(), p) {
      // Default includes circle
      default:
        n ? e.ellipse(s, a, n / 2, b, 0, 0, ht) : e.arc(s, a, b, 0, ht), e.closePath();
        break;
      case "triangle":
        h = n ? n / 2 : b, e.moveTo(s + Math.sin(m) * h, a - Math.cos(m) * b), m += _a, e.lineTo(s + Math.sin(m) * h, a - Math.cos(m) * b), m += _a, e.lineTo(s + Math.sin(m) * h, a - Math.cos(m) * b), e.closePath();
        break;
      case "rectRounded":
        d = b * 0.516, l = b - d, o = Math.cos(m + Jt) * l, u = Math.cos(m + Jt) * (n ? n / 2 - d : l), r = Math.sin(m + Jt) * l, f = Math.sin(m + Jt) * (n ? n / 2 - d : l), e.arc(s - u, a - r, d, m - it, m - bt), e.arc(s + f, a - o, d, m - bt, m), e.arc(s + u, a + r, d, m, m + bt), e.arc(s - f, a + o, d, m + bt, m + it), e.closePath();
        break;
      case "rect":
        if (!g) {
          l = Math.SQRT1_2 * b, h = n ? n / 2 : l, e.rect(s - h, a - l, 2 * h, 2 * l);
          break;
        }
        m += Jt;
      /* falls through */
      case "rectRot":
        u = Math.cos(m) * (n ? n / 2 : b), o = Math.cos(m) * b, r = Math.sin(m) * b, f = Math.sin(m) * (n ? n / 2 : b), e.moveTo(s - u, a - r), e.lineTo(s + f, a - o), e.lineTo(s + u, a + r), e.lineTo(s - f, a + o), e.closePath();
        break;
      case "crossRot":
        m += Jt;
      /* falls through */
      case "cross":
        u = Math.cos(m) * (n ? n / 2 : b), o = Math.cos(m) * b, r = Math.sin(m) * b, f = Math.sin(m) * (n ? n / 2 : b), e.moveTo(s - u, a - r), e.lineTo(s + u, a + r), e.moveTo(s + f, a - o), e.lineTo(s - f, a + o);
        break;
      case "star":
        u = Math.cos(m) * (n ? n / 2 : b), o = Math.cos(m) * b, r = Math.sin(m) * b, f = Math.sin(m) * (n ? n / 2 : b), e.moveTo(s - u, a - r), e.lineTo(s + u, a + r), e.moveTo(s + f, a - o), e.lineTo(s - f, a + o), m += Jt, u = Math.cos(m) * (n ? n / 2 : b), o = Math.cos(m) * b, r = Math.sin(m) * b, f = Math.sin(m) * (n ? n / 2 : b), e.moveTo(s - u, a - r), e.lineTo(s + u, a + r), e.moveTo(s + f, a - o), e.lineTo(s - f, a + o);
        break;
      case "line":
        o = n ? n / 2 : Math.cos(m) * b, r = Math.sin(m) * b, e.moveTo(s - o, a - r), e.lineTo(s + o, a + r);
        break;
      case "dash":
        e.moveTo(s, a), e.lineTo(s + Math.cos(m) * (n ? n / 2 : b), a + Math.sin(m) * b);
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
function tr(e, t, s, a, n) {
  if (!t)
    return e.lineTo(s.x, s.y);
  if (n === "middle") {
    const i = (t.x + s.x) / 2;
    e.lineTo(i, t.y), e.lineTo(i, s.y);
  } else n === "after" != !!a ? e.lineTo(t.x, s.y) : e.lineTo(s.x, t.y);
  e.lineTo(s.x, s.y);
}
function er(e, t, s, a) {
  if (!t)
    return e.lineTo(s.x, s.y);
  e.bezierCurveTo(a ? t.cp1x : t.cp2x, a ? t.cp1y : t.cp2y, a ? s.cp2x : s.cp1x, a ? s.cp2y : s.cp1y, s.x, s.y);
}
function sr(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), tt(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function ar(e, t, s, a, n) {
  if (n.strikethrough || n.underline) {
    const i = e.measureText(a), o = t - i.actualBoundingBoxLeft, r = t + i.actualBoundingBoxRight, l = s - i.actualBoundingBoxAscent, d = s + i.actualBoundingBoxDescent, h = n.strikethrough ? (l + d) / 2 : d;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = n.decorationWidth || 2, e.moveTo(o, h), e.lineTo(r, h), e.stroke();
  }
}
function nr(e, t) {
  const s = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = s;
}
function We(e, t, s, a, n, i = {}) {
  const o = pt(t) ? t : [
    t
  ], r = i.strokeWidth > 0 && i.strokeColor !== "";
  let l, d;
  for (e.save(), e.font = n.string, sr(e, i), l = 0; l < o.length; ++l)
    d = o[l], i.backdrop && nr(e, i.backdrop), r && (i.strokeColor && (e.strokeStyle = i.strokeColor), tt(i.strokeWidth) || (e.lineWidth = i.strokeWidth), e.strokeText(d, s, a, i.maxWidth)), e.fillText(d, s, a, i.maxWidth), ar(e, s, a, d, i), a += Number(n.lineHeight);
  e.restore();
}
function ls(e, t) {
  const { x: s, y: a, w: n, h: i, radius: o } = t;
  e.arc(s + o.topLeft, a + o.topLeft, o.topLeft, 1.5 * it, it, !0), e.lineTo(s, a + i - o.bottomLeft), e.arc(s + o.bottomLeft, a + i - o.bottomLeft, o.bottomLeft, it, bt, !0), e.lineTo(s + n - o.bottomRight, a + i), e.arc(s + n - o.bottomRight, a + i - o.bottomRight, o.bottomRight, bt, 0, !0), e.lineTo(s + n, a + o.topRight), e.arc(s + n - o.topRight, a + o.topRight, o.topRight, 0, -bt, !0), e.lineTo(s + o.topLeft, a);
}
const ir = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, or = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function rr(e, t) {
  const s = ("" + e).match(ir);
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
const lr = (e) => +e || 0;
function ta(e, t) {
  const s = {}, a = X(t), n = a ? Object.keys(t) : t, i = X(e) ? a ? (o) => U(e[o], e[t[o]]) : (o) => e[o] : () => e;
  for (const o of n)
    s[o] = lr(i(o));
  return s;
}
function si(e) {
  return ta(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function ge(e) {
  return ta(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function Bt(e) {
  const t = si(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function yt(e, t) {
  e = e || {}, t = t || gt.font;
  let s = U(e.size, t.size);
  typeof s == "string" && (s = parseInt(s, 10));
  let a = U(e.style, t.style);
  a && !("" + a).match(or) && (console.warn('Invalid font style specified: "' + a + '"'), a = void 0);
  const n = {
    family: U(e.family, t.family),
    lineHeight: rr(U(e.lineHeight, t.lineHeight), s),
    size: s,
    style: a,
    weight: U(e.weight, t.weight),
    string: ""
  };
  return n.string = Jo(n), n;
}
function Ke(e, t, s, a) {
  let n, i, o;
  for (n = 0, i = e.length; n < i; ++n)
    if (o = e[n], o !== void 0 && o !== void 0)
      return o;
}
function cr(e, t, s) {
  const { min: a, max: n } = e, i = qn(t, (n - a) / 2), o = (r, l) => s && r === 0 ? 0 : r + l;
  return {
    min: o(a, -Math.abs(i)),
    max: o(n, i)
  };
}
function ce(e, t) {
  return Object.assign(Object.create(e), t);
}
function ea(e, t = [
  ""
], s, a, n = () => e[0]) {
  const i = s || e;
  typeof a > "u" && (a = oi("_fallback", e));
  const o = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: i,
    _fallback: a,
    _getTarget: n,
    override: (r) => ea([
      r,
      ...e
    ], t, i, a)
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
      return ni(r, l, () => mr(l, t, e, r));
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
      return Ta(r).includes(l);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(r) {
      return Ta(r);
    },
    /**
    * A trap for setting property values.
    */
    set(r, l, d) {
      const h = r._storage || (r._storage = n());
      return r[l] = h[l] = d, delete r._keys, !0;
    }
  });
}
function be(e, t, s, a) {
  const n = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: s,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: ai(e, a),
    setContext: (i) => be(e, i, s, a),
    override: (i) => be(e.override(i), t, s, a)
  };
  return new Proxy(n, {
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
      return ni(i, o, () => hr(i, o, r));
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
function ai(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: s = t.scriptable, _indexable: a = t.indexable, _allKeys: n = t.allKeys } = e;
  return {
    allKeys: n,
    scriptable: s,
    indexable: a,
    isScriptable: Xt(s) ? s : () => s,
    isIndexable: Xt(a) ? a : () => a
  };
}
const dr = (e, t) => e ? e + Xs(t) : t, sa = (e, t) => X(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function ni(e, t, s) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const a = s();
  return e[t] = a, a;
}
function hr(e, t, s) {
  const { _proxy: a, _context: n, _subProxy: i, _descriptors: o } = e;
  let r = a[t];
  return Xt(r) && o.isScriptable(t) && (r = ur(t, r, e, s)), pt(r) && r.length && (r = fr(t, r, e, o.isIndexable)), sa(t, r) && (r = be(r, n, i && i[t], o)), r;
}
function ur(e, t, s, a) {
  const { _proxy: n, _context: i, _subProxy: o, _stack: r } = s;
  if (r.has(e))
    throw new Error("Recursion detected: " + Array.from(r).join("->") + "->" + e);
  r.add(e);
  let l = t(i, o || a);
  return r.delete(e), sa(e, l) && (l = aa(n._scopes, n, e, l)), l;
}
function fr(e, t, s, a) {
  const { _proxy: n, _context: i, _subProxy: o, _descriptors: r } = s;
  if (typeof i.index < "u" && a(e))
    return t[i.index % t.length];
  if (X(t[0])) {
    const l = t, d = n._scopes.filter((h) => h !== l);
    t = [];
    for (const h of l) {
      const u = aa(d, n, e, h);
      t.push(be(u, i, o && o[e], r));
    }
  }
  return t;
}
function ii(e, t, s) {
  return Xt(e) ? e(t, s) : e;
}
const gr = (e, t) => e === !0 ? t : typeof e == "string" ? re(t, e) : void 0;
function pr(e, t, s, a, n) {
  for (const i of t) {
    const o = gr(s, i);
    if (o) {
      e.add(o);
      const r = ii(o._fallback, s, n);
      if (typeof r < "u" && r !== s && r !== a)
        return r;
    } else if (o === !1 && typeof a < "u" && s !== a)
      return null;
  }
  return !1;
}
function aa(e, t, s, a) {
  const n = t._rootScopes, i = ii(t._fallback, s, a), o = [
    ...e,
    ...n
  ], r = /* @__PURE__ */ new Set();
  r.add(a);
  let l = Aa(r, o, s, i || s, a);
  return l === null || typeof i < "u" && i !== s && (l = Aa(r, o, i, l, a), l === null) ? !1 : ea(Array.from(r), [
    ""
  ], n, i, () => br(t, s, a));
}
function Aa(e, t, s, a, n) {
  for (; s; )
    s = pr(e, t, s, a, n);
  return s;
}
function br(e, t, s) {
  const a = e._getTarget();
  t in a || (a[t] = {});
  const n = a[t];
  return pt(n) && X(s) ? s : n || {};
}
function mr(e, t, s, a) {
  let n;
  for (const i of t)
    if (n = oi(dr(i, e), s), typeof n < "u")
      return sa(e, n) ? aa(s, a, e, n) : n;
}
function oi(e, t) {
  for (const s of t) {
    if (!s)
      continue;
    const a = s[e];
    if (typeof a < "u")
      return a;
  }
}
function Ta(e) {
  let t = e._keys;
  return t || (t = e._keys = vr(e._scopes)), t;
}
function vr(e) {
  const t = /* @__PURE__ */ new Set();
  for (const s of e)
    for (const a of Object.keys(s).filter((n) => !n.startsWith("_")))
      t.add(a);
  return Array.from(t);
}
const _r = Number.EPSILON || 1e-14, me = (e, t) => t < e.length && !e[t].skip && e[t], ri = (e) => e === "x" ? "y" : "x";
function yr(e, t, s, a) {
  const n = e.skip ? t : e, i = t, o = s.skip ? t : s, r = zs(i, n), l = zs(o, i);
  let d = r / (r + l), h = l / (r + l);
  d = isNaN(d) ? 0 : d, h = isNaN(h) ? 0 : h;
  const u = a * d, f = a * h;
  return {
    previous: {
      x: i.x - u * (o.x - n.x),
      y: i.y - u * (o.y - n.y)
    },
    next: {
      x: i.x + f * (o.x - n.x),
      y: i.y + f * (o.y - n.y)
    }
  };
}
function xr(e, t, s) {
  const a = e.length;
  let n, i, o, r, l, d = me(e, 0);
  for (let h = 0; h < a - 1; ++h)
    if (l = d, d = me(e, h + 1), !(!l || !d)) {
      if (Te(t[h], 0, _r)) {
        s[h] = s[h + 1] = 0;
        continue;
      }
      n = s[h] / t[h], i = s[h + 1] / t[h], r = Math.pow(n, 2) + Math.pow(i, 2), !(r <= 9) && (o = 3 / Math.sqrt(r), s[h] = n * o * t[h], s[h + 1] = i * o * t[h]);
    }
}
function kr(e, t, s = "x") {
  const a = ri(s), n = e.length;
  let i, o, r, l = me(e, 0);
  for (let d = 0; d < n; ++d) {
    if (o = r, r = l, l = me(e, d + 1), !r)
      continue;
    const h = r[s], u = r[a];
    o && (i = (h - o[s]) / 3, r[`cp1${s}`] = h - i, r[`cp1${a}`] = u - i * t[d]), l && (i = (l[s] - h) / 3, r[`cp2${s}`] = h + i, r[`cp2${a}`] = u + i * t[d]);
  }
}
function Mr(e, t = "x") {
  const s = ri(t), a = e.length, n = Array(a).fill(0), i = Array(a);
  let o, r, l, d = me(e, 0);
  for (o = 0; o < a; ++o)
    if (r = l, l = d, d = me(e, o + 1), !!l) {
      if (d) {
        const h = d[t] - l[t];
        n[o] = h !== 0 ? (d[s] - l[s]) / h : 0;
      }
      i[o] = r ? d ? Et(n[o - 1]) !== Et(n[o]) ? 0 : (n[o - 1] + n[o]) / 2 : n[o - 1] : n[o];
    }
  xr(e, n, i), kr(e, i, t);
}
function Xe(e, t, s) {
  return Math.max(Math.min(e, s), t);
}
function Sr(e, t) {
  let s, a, n, i, o, r = ze(e[0], t);
  for (s = 0, a = e.length; s < a; ++s)
    o = i, i = r, r = s < a - 1 && ze(e[s + 1], t), i && (n = e[s], o && (n.cp1x = Xe(n.cp1x, t.left, t.right), n.cp1y = Xe(n.cp1y, t.top, t.bottom)), r && (n.cp2x = Xe(n.cp2x, t.left, t.right), n.cp2y = Xe(n.cp2y, t.top, t.bottom)));
}
function wr(e, t, s, a, n) {
  let i, o, r, l;
  if (t.spanGaps && (e = e.filter((d) => !d.skip)), t.cubicInterpolationMode === "monotone")
    Mr(e, n);
  else {
    let d = a ? e[e.length - 1] : e[0];
    for (i = 0, o = e.length; i < o; ++i)
      r = e[i], l = yr(d, r, e[Math.min(i + 1, o - (a ? 0 : 1)) % o], t.tension), r.cp1x = l.previous.x, r.cp1y = l.previous.y, r.cp2x = l.next.x, r.cp2y = l.next.y, d = r;
  }
  t.capBezierPoints && Sr(e, s);
}
function na() {
  return typeof window < "u" && typeof document < "u";
}
function ia(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function cs(e, t, s) {
  let a;
  return typeof e == "string" ? (a = parseInt(e, 10), e.indexOf("%") !== -1 && (a = a / 100 * t.parentNode[s])) : a = e, a;
}
const ps = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function Cr(e, t) {
  return ps(e).getPropertyValue(t);
}
const $r = [
  "top",
  "right",
  "bottom",
  "left"
];
function ie(e, t, s) {
  const a = {};
  s = s ? "-" + s : "";
  for (let n = 0; n < 4; n++) {
    const i = $r[n];
    a[i] = parseFloat(e[t + "-" + i + s]) || 0;
  }
  return a.width = a.left + a.right, a.height = a.top + a.bottom, a;
}
const Dr = (e, t, s) => (e > 0 || t > 0) && (!s || !s.shadowRoot);
function Ar(e, t) {
  const s = e.touches, a = s && s.length ? s[0] : e, { offsetX: n, offsetY: i } = a;
  let o = !1, r, l;
  if (Dr(n, i, e.target))
    r = n, l = i;
  else {
    const d = t.getBoundingClientRect();
    r = a.clientX - d.left, l = a.clientY - d.top, o = !0;
  }
  return {
    x: r,
    y: l,
    box: o
  };
}
function se(e, t) {
  if ("native" in e)
    return e;
  const { canvas: s, currentDevicePixelRatio: a } = t, n = ps(s), i = n.boxSizing === "border-box", o = ie(n, "padding"), r = ie(n, "border", "width"), { x: l, y: d, box: h } = Ar(e, s), u = o.left + (h && r.left), f = o.top + (h && r.top);
  let { width: p, height: g } = t;
  return i && (p -= o.width + r.width, g -= o.height + r.height), {
    x: Math.round((l - u) / p * s.width / a),
    y: Math.round((d - f) / g * s.height / a)
  };
}
function Tr(e, t, s) {
  let a, n;
  if (t === void 0 || s === void 0) {
    const i = e && ia(e);
    if (!i)
      t = e.clientWidth, s = e.clientHeight;
    else {
      const o = i.getBoundingClientRect(), r = ps(i), l = ie(r, "border", "width"), d = ie(r, "padding");
      t = o.width - d.width - l.width, s = o.height - d.height - l.height, a = cs(r.maxWidth, i, "clientWidth"), n = cs(r.maxHeight, i, "clientHeight");
    }
  }
  return {
    width: t,
    height: s,
    maxWidth: a || rs,
    maxHeight: n || rs
  };
}
const qt = (e) => Math.round(e * 10) / 10;
function Br(e, t, s, a) {
  const n = ps(e), i = ie(n, "margin"), o = cs(n.maxWidth, e, "clientWidth") || rs, r = cs(n.maxHeight, e, "clientHeight") || rs, l = Tr(e, t, s);
  let { width: d, height: h } = l;
  if (n.boxSizing === "content-box") {
    const f = ie(n, "border", "width"), p = ie(n, "padding");
    d -= p.width + f.width, h -= p.height + f.height;
  }
  return d = Math.max(0, d - i.width), h = Math.max(0, a ? d / a : h - i.height), d = qt(Math.min(d, o, l.maxWidth)), h = qt(Math.min(h, r, l.maxHeight)), d && !h && (h = qt(d / 2)), (t !== void 0 || s !== void 0) && a && l.height && h > l.height && (h = l.height, d = qt(Math.floor(h * a))), {
    width: d,
    height: h
  };
}
function Ba(e, t, s) {
  const a = t || 1, n = qt(e.height * a), i = qt(e.width * a);
  e.height = qt(e.height), e.width = qt(e.width);
  const o = e.canvas;
  return o.style && (s || !o.style.height && !o.style.width) && (o.style.height = `${e.height}px`, o.style.width = `${e.width}px`), e.currentDevicePixelRatio !== a || o.height !== n || o.width !== i ? (e.currentDevicePixelRatio = a, o.height = n, o.width = i, e.ctx.setTransform(a, 0, 0, a, 0, 0), !0) : !1;
}
const Fr = (function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    na() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function Fa(e, t) {
  const s = Cr(e, t), a = s && s.match(/^(\d+)(\.\d+)?px$/);
  return a ? +a[1] : void 0;
}
function ae(e, t, s, a) {
  return {
    x: e.x + s * (t.x - e.x),
    y: e.y + s * (t.y - e.y)
  };
}
function Pr(e, t, s, a) {
  return {
    x: e.x + s * (t.x - e.x),
    y: a === "middle" ? s < 0.5 ? e.y : t.y : a === "after" ? s < 1 ? e.y : t.y : s > 0 ? t.y : e.y
  };
}
function Lr(e, t, s, a) {
  const n = {
    x: e.cp2x,
    y: e.cp2y
  }, i = {
    x: t.cp1x,
    y: t.cp1y
  }, o = ae(e, n, s), r = ae(n, i, s), l = ae(i, t, s), d = ae(o, r, s), h = ae(r, l, s);
  return ae(d, h, s);
}
const Er = function(e, t) {
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
}, Or = function() {
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
function pe(e, t, s) {
  return e ? Er(t, s) : Or();
}
function li(e, t) {
  let s, a;
  (t === "ltr" || t === "rtl") && (s = e.canvas.style, a = [
    s.getPropertyValue("direction"),
    s.getPropertyPriority("direction")
  ], s.setProperty("direction", t, "important"), e.prevTextDirection = a);
}
function ci(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function di(e) {
  return e === "angle" ? {
    between: Ie,
    compare: Eo,
    normalize: Dt
  } : {
    between: Nt,
    compare: (t, s) => t - s,
    normalize: (t) => t
  };
}
function Pa({ start: e, end: t, count: s, loop: a, style: n }) {
  return {
    start: e % s,
    end: t % s,
    loop: a && (t - e + 1) % s === 0,
    style: n
  };
}
function Rr(e, t, s) {
  const { property: a, start: n, end: i } = s, { between: o, normalize: r } = di(a), l = t.length;
  let { start: d, end: h, loop: u } = e, f, p;
  if (u) {
    for (d += l, h += l, f = 0, p = l; f < p && o(r(t[d % l][a]), n, i); ++f)
      d--, h--;
    d %= l, h %= l;
  }
  return h < d && (h += l), {
    start: d,
    end: h,
    loop: u,
    style: e.style
  };
}
function hi(e, t, s) {
  if (!s)
    return [
      e
    ];
  const { property: a, start: n, end: i } = s, o = t.length, { compare: r, between: l, normalize: d } = di(a), { start: h, end: u, loop: f, style: p } = Rr(e, t, s), g = [];
  let b = !1, m = null, v, _, k;
  const S = () => l(n, k, v) && r(n, k) !== 0, M = () => r(i, v) === 0 || l(i, k, v), C = () => b || S(), $ = () => !b || M();
  for (let A = h, E = h; A <= u; ++A)
    _ = t[A % o], !_.skip && (v = d(_[a]), v !== k && (b = l(v, n, i), m === null && C() && (m = r(v, n) === 0 ? A : E), m !== null && $() && (g.push(Pa({
      start: m,
      end: A,
      loop: f,
      count: o,
      style: p
    })), m = null), E = A, k = v));
  return m !== null && g.push(Pa({
    start: m,
    end: u,
    loop: f,
    count: o,
    style: p
  })), g;
}
function ui(e, t) {
  const s = [], a = e.segments;
  for (let n = 0; n < a.length; n++) {
    const i = hi(a[n], e.points, t);
    i.length && s.push(...i);
  }
  return s;
}
function Ir(e, t, s, a) {
  let n = 0, i = t - 1;
  if (s && !a)
    for (; n < t && !e[n].skip; )
      n++;
  for (; n < t && e[n].skip; )
    n++;
  for (n %= t, s && (i += n); i > n && e[i % t].skip; )
    i--;
  return i %= t, {
    start: n,
    end: i
  };
}
function zr(e, t, s, a) {
  const n = e.length, i = [];
  let o = t, r = e[t], l;
  for (l = t + 1; l <= s; ++l) {
    const d = e[l % n];
    d.skip || d.stop ? r.skip || (a = !1, i.push({
      start: t % n,
      end: (l - 1) % n,
      loop: a
    }), t = o = d.stop ? l : null) : (o = l, r.skip && (t = l)), r = d;
  }
  return o !== null && i.push({
    start: t % n,
    end: o % n,
    loop: a
  }), i;
}
function Wr(e, t) {
  const s = e.points, a = e.options.spanGaps, n = s.length;
  if (!n)
    return [];
  const i = !!e._loop, { start: o, end: r } = Ir(s, n, i, a);
  if (a === !0)
    return La(e, [
      {
        start: o,
        end: r,
        loop: i
      }
    ], s, t);
  const l = r < o ? r + n : r, d = !!e._fullLoop && o === 0 && r === n - 1;
  return La(e, zr(s, o, l, d), s, t);
}
function La(e, t, s, a) {
  return !a || !a.setContext || !s ? t : Nr(e, t, s, a);
}
function Nr(e, t, s, a) {
  const n = e._chart.getContext(), i = Ea(e.options), { _datasetIndex: o, options: { spanGaps: r } } = e, l = s.length, d = [];
  let h = i, u = t[0].start, f = u;
  function p(g, b, m, v) {
    const _ = r ? -1 : 1;
    if (g !== b) {
      for (g += l; s[g % l].skip; )
        g -= _;
      for (; s[b % l].skip; )
        b += _;
      g % l !== b % l && (d.push({
        start: g % l,
        end: b % l,
        loop: m,
        style: v
      }), h = v, u = b % l);
    }
  }
  for (const g of t) {
    u = r ? u : g.start;
    let b = s[u % l], m;
    for (f = u + 1; f <= g.end; f++) {
      const v = s[f % l];
      m = Ea(a.setContext(ce(n, {
        type: "segment",
        p0: b,
        p1: v,
        p0DataIndex: (f - 1) % l,
        p1DataIndex: f % l,
        datasetIndex: o
      }))), Hr(m, h) && p(u, f - 1, g.loop, h), b = v, h = m;
    }
    u < f - 1 && p(u, f - 1, g.loop, h);
  }
  return d;
}
function Ea(e) {
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
function Hr(e, t) {
  if (!t)
    return !1;
  const s = [], a = function(n, i) {
    return Qs(i) ? (s.includes(i) || s.push(i), s.indexOf(i)) : i;
  };
  return JSON.stringify(e, a) !== JSON.stringify(t, a);
}
function Ge(e, t, s) {
  return e.options.clip ? e[s] : t[s];
}
function jr(e, t) {
  const { xScale: s, yScale: a } = e;
  return s && a ? {
    left: Ge(s, t, "left"),
    right: Ge(s, t, "right"),
    top: Ge(a, t, "top"),
    bottom: Ge(a, t, "bottom")
  } : t;
}
function fi(e, t) {
  const s = t._clip;
  if (s.disabled)
    return !1;
  const a = jr(t, e.chartArea);
  return {
    left: s.left === !1 ? 0 : a.left - (s.left === !0 ? 0 : s.left),
    right: s.right === !1 ? e.width : a.right + (s.right === !0 ? 0 : s.right),
    top: s.top === !1 ? 0 : a.top - (s.top === !0 ? 0 : s.top),
    bottom: s.bottom === !1 ? e.height : a.bottom + (s.bottom === !0 ? 0 : s.bottom)
  };
}
class Vr {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(t, s, a, n) {
    const i = s.listeners[n], o = s.duration;
    i.forEach((r) => r({
      chart: t,
      initial: s.initial,
      numSteps: o,
      currentStep: Math.min(a - s.start, o)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = Qn.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let s = 0;
    this._charts.forEach((a, n) => {
      if (!a.running || !a.items.length)
        return;
      const i = a.items;
      let o = i.length - 1, r = !1, l;
      for (; o >= 0; --o)
        l = i[o], l._active ? (l._total > a.duration && (a.duration = l._total), l.tick(t), r = !0) : (i[o] = i[i.length - 1], i.pop());
      r && (n.draw(), this._notify(n, a, t, "progress")), i.length || (a.running = !1, this._notify(n, a, t, "complete"), a.initial = !1), s += i.length;
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
var Rt = /* @__PURE__ */ new Vr();
const Oa = "transparent", Yr = {
  boolean(e, t, s) {
    return s > 0.5 ? t : e;
  },
  color(e, t, s) {
    const a = wa(e || Oa), n = a.valid && wa(t || Oa);
    return n && n.valid ? n.mix(a, s).hexString() : t;
  },
  number(e, t, s) {
    return e + (t - e) * s;
  }
};
class qr {
  constructor(t, s, a, n) {
    const i = s[a];
    n = Ke([
      t.to,
      n,
      i,
      t.from
    ]);
    const o = Ke([
      t.from,
      i,
      n
    ]);
    this._active = !0, this._fn = t.fn || Yr[t.type || typeof o], this._easing = Be[t.easing] || Be.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = s, this._prop = a, this._from = o, this._to = n, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, s, a) {
    if (this._active) {
      this._notify(!1);
      const n = this._target[this._prop], i = a - this._start, o = this._duration - i;
      this._start = a, this._duration = Math.floor(Math.max(o, t.duration)), this._total += i, this._loop = !!t.loop, this._to = Ke([
        t.to,
        s,
        n,
        t.from
      ]), this._from = Ke([
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
    const s = t - this._start, a = this._duration, n = this._prop, i = this._from, o = this._loop, r = this._to;
    let l;
    if (this._active = i !== r && (o || s < a), !this._active) {
      this._target[n] = r, this._notify(!0);
      return;
    }
    if (s < 0) {
      this._target[n] = i;
      return;
    }
    l = s / a % 2, l = o && l > 1 ? 2 - l : l, l = this._easing(Math.min(1, Math.max(0, l))), this._target[n] = this._fn(i, r, l);
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
class gi {
  constructor(t, s) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(s);
  }
  configure(t) {
    if (!X(t))
      return;
    const s = Object.keys(gt.animation), a = this._properties;
    Object.getOwnPropertyNames(t).forEach((n) => {
      const i = t[n];
      if (!X(i))
        return;
      const o = {};
      for (const r of s)
        o[r] = i[r];
      (pt(i.properties) && i.properties || [
        n
      ]).forEach((r) => {
        (r === n || !a.has(r)) && a.set(r, o);
      });
    });
  }
  _animateOptions(t, s) {
    const a = s.options, n = Kr(t, a);
    if (!n)
      return [];
    const i = this._createAnimations(n, a);
    return a.$shared && Ur(t.options.$animations, a).then(() => {
      t.options = a;
    }, () => {
    }), i;
  }
  _createAnimations(t, s) {
    const a = this._properties, n = [], i = t.$animations || (t.$animations = {}), o = Object.keys(s), r = Date.now();
    let l;
    for (l = o.length - 1; l >= 0; --l) {
      const d = o[l];
      if (d.charAt(0) === "$")
        continue;
      if (d === "options") {
        n.push(...this._animateOptions(t, s));
        continue;
      }
      const h = s[d];
      let u = i[d];
      const f = a.get(d);
      if (u)
        if (f && u.active()) {
          u.update(f, h, r);
          continue;
        } else
          u.cancel();
      if (!f || !f.duration) {
        t[d] = h;
        continue;
      }
      i[d] = u = new qr(f, t, d, h), n.push(u);
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
      return Rt.add(this._chart, a), !0;
  }
}
function Ur(e, t) {
  const s = [], a = Object.keys(t);
  for (let n = 0; n < a.length; n++) {
    const i = e[a[n]];
    i && i.active() && s.push(i.wait());
  }
  return Promise.all(s);
}
function Kr(e, t) {
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
function Ra(e, t) {
  const s = e && e.options || {}, a = s.reverse, n = s.min === void 0 ? t : 0, i = s.max === void 0 ? t : 0;
  return {
    start: a ? i : n,
    end: a ? n : i
  };
}
function Xr(e, t, s) {
  if (s === !1)
    return !1;
  const a = Ra(e, s), n = Ra(t, s);
  return {
    top: n.end,
    right: a.end,
    bottom: n.start,
    left: a.start
  };
}
function Gr(e) {
  let t, s, a, n;
  return X(e) ? (t = e.top, s = e.right, a = e.bottom, n = e.left) : t = s = a = n = e, {
    top: t,
    right: s,
    bottom: a,
    left: n,
    disabled: e === !1
  };
}
function pi(e, t) {
  const s = [], a = e._getSortedDatasetMetas(t);
  let n, i;
  for (n = 0, i = a.length; n < i; ++n)
    s.push(a[n].index);
  return s;
}
function Ia(e, t, s, a = {}) {
  const n = e.keys, i = a.mode === "single";
  let o, r, l, d;
  if (t === null)
    return;
  let h = !1;
  for (o = 0, r = n.length; o < r; ++o) {
    if (l = +n[o], l === s) {
      if (h = !0, a.all)
        continue;
      break;
    }
    d = e.values[l], kt(d) && (i || t === 0 || Et(t) === Et(d)) && (t += d);
  }
  return !h && !a.all ? 0 : t;
}
function Zr(e, t) {
  const { iScale: s, vScale: a } = t, n = s.axis === "x" ? "x" : "y", i = a.axis === "x" ? "x" : "y", o = Object.keys(e), r = new Array(o.length);
  let l, d, h;
  for (l = 0, d = o.length; l < d; ++l)
    h = o[l], r[l] = {
      [n]: h,
      [i]: e[h]
    };
  return r;
}
function ws(e, t) {
  const s = e && e.options.stacked;
  return s || s === void 0 && t.stack !== void 0;
}
function Qr(e, t, s) {
  return `${e.id}.${t.id}.${s.stack || s.type}`;
}
function Jr(e) {
  const { min: t, max: s, minDefined: a, maxDefined: n } = e.getUserBounds();
  return {
    min: a ? t : Number.NEGATIVE_INFINITY,
    max: n ? s : Number.POSITIVE_INFINITY
  };
}
function tl(e, t, s) {
  const a = e[t] || (e[t] = {});
  return a[s] || (a[s] = {});
}
function za(e, t, s, a) {
  for (const n of t.getMatchingVisibleMetas(a).reverse()) {
    const i = e[n.index];
    if (s && i > 0 || !s && i < 0)
      return n.index;
  }
  return null;
}
function Wa(e, t) {
  const { chart: s, _cachedMeta: a } = e, n = s._stacks || (s._stacks = {}), { iScale: i, vScale: o, index: r } = a, l = i.axis, d = o.axis, h = Qr(i, o, a), u = t.length;
  let f;
  for (let p = 0; p < u; ++p) {
    const g = t[p], { [l]: b, [d]: m } = g, v = g._stacks || (g._stacks = {});
    f = v[d] = tl(n, h, b), f[r] = m, f._top = za(f, o, !0, a.type), f._bottom = za(f, o, !1, a.type);
    const _ = f._visualValues || (f._visualValues = {});
    _[r] = m;
  }
}
function Cs(e, t) {
  const s = e.scales;
  return Object.keys(s).filter((a) => s[a].axis === t).shift();
}
function el(e, t) {
  return ce(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function sl(e, t, s) {
  return ce(e, {
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
function ye(e, t) {
  const s = e.controller.index, a = e.vScale && e.vScale.axis;
  if (a) {
    t = t || e._parsed;
    for (const n of t) {
      const i = n._stacks;
      if (!i || i[a] === void 0 || i[a][s] === void 0)
        return;
      delete i[a][s], i[a]._visualValues !== void 0 && i[a]._visualValues[s] !== void 0 && delete i[a]._visualValues[s];
    }
  }
}
const $s = (e) => e === "reset" || e === "none", Na = (e, t) => t ? e : Object.assign({}, e), al = (e, t, s) => e && !t.hidden && t._stacked && {
  keys: pi(s, !0),
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
    this.configure(), this.linkScales(), t._stacked = ws(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && ye(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, s = this._cachedMeta, a = this.getDataset(), n = (u, f, p, g) => u === "x" ? f : u === "r" ? g : p, i = s.xAxisID = U(a.xAxisID, Cs(t, "x")), o = s.yAxisID = U(a.yAxisID, Cs(t, "y")), r = s.rAxisID = U(a.rAxisID, Cs(t, "r")), l = s.indexAxis, d = s.iAxisID = n(l, i, o, r), h = s.vAxisID = n(l, o, i, r);
    s.xScale = this.getScaleForId(i), s.yScale = this.getScaleForId(o), s.rScale = this.getScaleForId(r), s.iScale = this.getScaleForId(d), s.vScale = this.getScaleForId(h);
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
    this._data && ka(this._data, this), t._stacked && ye(t);
  }
  _dataCheck() {
    const t = this.getDataset(), s = t.data || (t.data = []), a = this._data;
    if (X(s)) {
      const n = this._cachedMeta;
      this._data = Zr(s, n);
    } else if (a !== s) {
      if (a) {
        ka(a, this);
        const n = this._cachedMeta;
        ye(n), n._parsed = [];
      }
      s && Object.isExtensible(s) && zo(s, this), this._syncList = [], this._data = s;
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
    const i = s._stacked;
    s._stacked = ws(s.vScale, s), s.stack !== a.stack && (n = !0, ye(s), s.stack = a.stack), this._resyncElements(t), (n || i !== s._stacked) && (Wa(this, s._parsed), s._stacked = ws(s.vScale, s));
  }
  configure() {
    const t = this.chart.config, s = t.datasetScopeKeys(this._type), a = t.getOptionScopes(this.getDataset(), s, !0);
    this.options = t.createResolver(a, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, s) {
    const { _cachedMeta: a, _data: n } = this, { iScale: i, _stacked: o } = a, r = i.axis;
    let l = t === 0 && s === n.length ? !0 : a._sorted, d = t > 0 && a._parsed[t - 1], h, u, f;
    if (this._parsing === !1)
      a._parsed = n, a._sorted = !0, f = n;
    else {
      pt(n[t]) ? f = this.parseArrayData(a, n, t, s) : X(n[t]) ? f = this.parseObjectData(a, n, t, s) : f = this.parsePrimitiveData(a, n, t, s);
      const p = () => u[r] === null || d && u[r] < d[r];
      for (h = 0; h < s; ++h)
        a._parsed[h + t] = u = f[h], l && (p() && (l = !1), d = u);
      a._sorted = l;
    }
    o && Wa(this, f);
  }
  parsePrimitiveData(t, s, a, n) {
    const { iScale: i, vScale: o } = t, r = i.axis, l = o.axis, d = i.getLabels(), h = i === o, u = new Array(n);
    let f, p, g;
    for (f = 0, p = n; f < p; ++f)
      g = f + a, u[f] = {
        [r]: h || i.parse(d[g], g),
        [l]: o.parse(s[g], g)
      };
    return u;
  }
  parseArrayData(t, s, a, n) {
    const { xScale: i, yScale: o } = t, r = new Array(n);
    let l, d, h, u;
    for (l = 0, d = n; l < d; ++l)
      h = l + a, u = s[h], r[l] = {
        x: i.parse(u[0], h),
        y: o.parse(u[1], h)
      };
    return r;
  }
  parseObjectData(t, s, a, n) {
    const { xScale: i, yScale: o } = t, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, d = new Array(n);
    let h, u, f, p;
    for (h = 0, u = n; h < u; ++h)
      f = h + a, p = s[f], d[h] = {
        x: i.parse(re(p, r), f),
        y: o.parse(re(p, l), f)
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
    const n = this.chart, i = this._cachedMeta, o = s[t.axis], r = {
      keys: pi(n, !0),
      values: s._stacks[t.axis]._visualValues
    };
    return Ia(r, o, i.index, {
      mode: a
    });
  }
  updateRangeFromParsed(t, s, a, n) {
    const i = a[s.axis];
    let o = i === null ? NaN : i;
    const r = n && a._stacks[s.axis];
    n && r && (n.values = r, o = Ia(n, i, this._cachedMeta.index)), t.min = Math.min(t.min, o), t.max = Math.max(t.max, o);
  }
  getMinMax(t, s) {
    const a = this._cachedMeta, n = a._parsed, i = a._sorted && t === a.iScale, o = n.length, r = this._getOtherScale(t), l = al(s, a, this.chart), d = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: h, max: u } = Jr(r);
    let f, p;
    function g() {
      p = n[f];
      const b = p[r.axis];
      return !kt(p[t.axis]) || h > b || u < b;
    }
    for (f = 0; f < o && !(!g() && (this.updateRangeFromParsed(d, t, p, l), i)); ++f)
      ;
    if (i) {
      for (f = o - 1; f >= 0; --f)
        if (!g()) {
          this.updateRangeFromParsed(d, t, p, l);
          break;
        }
    }
    return d;
  }
  getAllParsedValues(t) {
    const s = this._cachedMeta._parsed, a = [];
    let n, i, o;
    for (n = 0, i = s.length; n < i; ++n)
      o = s[n][t.axis], kt(o) && a.push(o);
    return a;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(t) {
    const s = this._cachedMeta, a = s.iScale, n = s.vScale, i = this.getParsed(t);
    return {
      label: a ? "" + a.getLabelForValue(i[a.axis]) : "",
      value: n ? "" + n.getLabelForValue(i[n.axis]) : ""
    };
  }
  _update(t) {
    const s = this._cachedMeta;
    this.update(t || "default"), s._clip = Gr(U(this.options.clip, Xr(s.xScale, s.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, s = this.chart, a = this._cachedMeta, n = a.data || [], i = s.chartArea, o = [], r = this._drawStart || 0, l = this._drawCount || n.length - r, d = this.options.drawActiveElementsOnTop;
    let h;
    for (a.dataset && a.dataset.draw(t, i, r, l), h = r; h < r + l; ++h) {
      const u = n[h];
      u.hidden || (u.active && d ? o.push(u) : u.draw(t, i));
    }
    for (h = 0; h < o.length; ++h)
      o[h].draw(t, i);
  }
  getStyle(t, s) {
    const a = s ? "active" : "default";
    return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(a) : this.resolveDataElementOptions(t || 0, a);
  }
  getContext(t, s, a) {
    const n = this.getDataset();
    let i;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const o = this._cachedMeta.data[t];
      i = o.$context || (o.$context = sl(this.getContext(), t, o)), i.parsed = this.getParsed(t), i.raw = n.data[t], i.index = i.dataIndex = t;
    } else
      i = this.$context || (this.$context = el(this.chart.getContext(), this.index)), i.dataset = n, i.index = i.datasetIndex = this.index;
    return i.active = !!s, i.mode = a, i;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, s) {
    return this._resolveElementOptions(this.dataElementType.id, s, t);
  }
  _resolveElementOptions(t, s = "default", a) {
    const n = s === "active", i = this._cachedDataOpts, o = t + "-" + s, r = i[o], l = this.enableOptionSharing && Oe(a);
    if (r)
      return Na(r, l);
    const d = this.chart.config, h = d.datasetElementScopeKeys(this._type, t), u = n ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], f = d.getOptionScopes(this.getDataset(), h), p = Object.keys(gt.elements[t]), g = () => this.getContext(a, n, s), b = d.resolveNamedOptions(f, p, g, u);
    return b.$shared && (b.$shared = l, i[o] = Object.freeze(Na(b, l))), b;
  }
  _resolveAnimations(t, s, a) {
    const n = this.chart, i = this._cachedDataOpts, o = `animation-${s}`, r = i[o];
    if (r)
      return r;
    let l;
    if (n.options.animation !== !1) {
      const h = this.chart.config, u = h.datasetAnimationScopeKeys(this._type, s), f = h.getOptionScopes(this.getDataset(), u);
      l = h.createResolver(f, this.getContext(t, a, s));
    }
    const d = new gi(n, l && l.animations);
    return l && l._cacheable && (i[o] = Object.freeze(d)), d;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, s) {
    return !s || $s(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, s) {
    const a = this.resolveDataElementOptions(t, s), n = this._sharedOptions, i = this.getSharedOptions(a), o = this.includeOptions(s, i) || i !== n;
    return this.updateSharedOptions(i, s, a), {
      sharedOptions: i,
      includeOptions: o
    };
  }
  updateElement(t, s, a, n) {
    $s(n) ? Object.assign(t, a) : this._resolveAnimations(s, n).update(t, a);
  }
  updateSharedOptions(t, s, a) {
    t && !$s(s) && this._resolveAnimations(void 0, s).update(t, a);
  }
  _setStyle(t, s, a, n) {
    t.active = n;
    const i = this.getStyle(s, n);
    this._resolveAnimations(s, a, n).update(t, {
      options: !n && this.getSharedOptions(i) || i
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
    const n = a.length, i = s.length, o = Math.min(i, n);
    o && this.parse(0, o), i > n ? this._insertElements(n, i - n, t) : i < n && this._removeElements(i, n - i);
  }
  _insertElements(t, s, a = !0) {
    const n = this._cachedMeta, i = n.data, o = t + s;
    let r;
    const l = (d) => {
      for (d.length += s, r = d.length - 1; r >= o; r--)
        d[r] = d[r - s];
    };
    for (l(i), r = t; r < o; ++r)
      i[r] = new this.dataElementType();
    this._parsing && l(n._parsed), this.parse(t, s), a && this.updateElements(i, t, s, "reset");
  }
  updateElements(t, s, a, n) {
  }
  _removeElements(t, s) {
    const a = this._cachedMeta;
    if (this._parsing) {
      const n = a._parsed.splice(t, s);
      a._stacked && ye(a, n);
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
function nl(e, t) {
  if (!e._cache.$bar) {
    const s = e.getMatchingVisibleMetas(t);
    let a = [];
    for (let n = 0, i = s.length; n < i; n++)
      a = a.concat(s[n].controller.getAllParsedValues(e));
    e._cache.$bar = Zn(a.sort((n, i) => n - i));
  }
  return e._cache.$bar;
}
function il(e) {
  const t = e.iScale, s = nl(t, e.type);
  let a = t._length, n, i, o, r;
  const l = () => {
    o === 32767 || o === -32768 || (Oe(r) && (a = Math.min(a, Math.abs(o - r) || a)), r = o);
  };
  for (n = 0, i = s.length; n < i; ++n)
    o = t.getPixelForValue(s[n]), l();
  for (r = void 0, n = 0, i = t.ticks.length; n < i; ++n)
    o = t.getPixelForTick(n), l();
  return a;
}
function ol(e, t, s, a) {
  const n = s.barThickness;
  let i, o;
  return tt(n) ? (i = t.min * s.categoryPercentage, o = s.barPercentage) : (i = n * a, o = 1), {
    chunk: i / a,
    ratio: o,
    start: t.pixels[e] - i / 2
  };
}
function rl(e, t, s, a) {
  const n = t.pixels, i = n[e];
  let o = e > 0 ? n[e - 1] : null, r = e < n.length - 1 ? n[e + 1] : null;
  const l = s.categoryPercentage;
  o === null && (o = i - (r === null ? t.end - t.start : r - i)), r === null && (r = i + i - o);
  const d = i - (i - Math.min(o, r)) / 2 * l;
  return {
    chunk: Math.abs(r - o) / 2 * l / a,
    ratio: s.barPercentage,
    start: d
  };
}
function ll(e, t, s, a) {
  const n = s.parse(e[0], a), i = s.parse(e[1], a), o = Math.min(n, i), r = Math.max(n, i);
  let l = o, d = r;
  Math.abs(o) > Math.abs(r) && (l = r, d = o), t[s.axis] = d, t._custom = {
    barStart: l,
    barEnd: d,
    start: n,
    end: i,
    min: o,
    max: r
  };
}
function bi(e, t, s, a) {
  return pt(e) ? ll(e, t, s, a) : t[s.axis] = s.parse(e, a), t;
}
function Ha(e, t, s, a) {
  const n = e.iScale, i = e.vScale, o = n.getLabels(), r = n === i, l = [];
  let d, h, u, f;
  for (d = s, h = s + a; d < h; ++d)
    f = t[d], u = {}, u[n.axis] = r || n.parse(o[d], d), l.push(bi(f, u, i, d));
  return l;
}
function Ds(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function cl(e, t, s) {
  return e !== 0 ? Et(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= s ? 1 : -1);
}
function dl(e) {
  let t, s, a, n, i;
  return e.horizontal ? (t = e.base > e.x, s = "left", a = "right") : (t = e.base < e.y, s = "bottom", a = "top"), t ? (n = "end", i = "start") : (n = "start", i = "end"), {
    start: s,
    end: a,
    reverse: t,
    top: n,
    bottom: i
  };
}
function hl(e, t, s, a) {
  let n = t.borderSkipped;
  const i = {};
  if (!n) {
    e.borderSkipped = i;
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
  const { start: o, end: r, reverse: l, top: d, bottom: h } = dl(e);
  n === "middle" && s && (e.enableBorderRadius = !0, (s._top || 0) === a ? n = d : (s._bottom || 0) === a ? n = h : (i[ja(h, o, r, l)] = !0, n = d)), i[ja(n, o, r, l)] = !0, e.borderSkipped = i;
}
function ja(e, t, s, a) {
  return a ? (e = ul(e, t, s), e = Va(e, s, t)) : e = Va(e, t, s), e;
}
function ul(e, t, s) {
  return e === t ? s : e === s ? t : e;
}
function Va(e, t, s) {
  return e === "start" ? t : e === "end" ? s : e;
}
function fl(e, { inflateAmount: t }, s) {
  e.inflateAmount = t === "auto" ? s === 1 ? 0.33 : 0 : t;
}
class gl extends bs {
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
    return Ha(t, s, a, n);
  }
  parseArrayData(t, s, a, n) {
    return Ha(t, s, a, n);
  }
  parseObjectData(t, s, a, n) {
    const { iScale: i, vScale: o } = t, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, d = i.axis === "x" ? r : l, h = o.axis === "x" ? r : l, u = [];
    let f, p, g, b;
    for (f = a, p = a + n; f < p; ++f)
      b = s[f], g = {}, g[i.axis] = i.parse(re(b, d), f), u.push(bi(re(b, h), g, o, f));
    return u;
  }
  updateRangeFromParsed(t, s, a, n) {
    super.updateRangeFromParsed(t, s, a, n);
    const i = a._custom;
    i && s === this._cachedMeta.vScale && (t.min = Math.min(t.min, i.min), t.max = Math.max(t.max, i.max));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(t) {
    const s = this._cachedMeta, { iScale: a, vScale: n } = s, i = this.getParsed(t), o = i._custom, r = Ds(o) ? "[" + o.start + ", " + o.end + "]" : "" + n.getLabelForValue(i[n.axis]);
    return {
      label: "" + a.getLabelForValue(i[a.axis]),
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
    const i = n === "reset", { index: o, _cachedMeta: { vScale: r } } = this, l = r.getBasePixel(), d = r.isHorizontal(), h = this._getRuler(), { sharedOptions: u, includeOptions: f } = this._getSharedOptions(s, n);
    for (let p = s; p < s + a; p++) {
      const g = this.getParsed(p), b = i || tt(g[r.axis]) ? {
        base: l,
        head: l
      } : this._calculateBarValuePixels(p), m = this._calculateBarIndexPixels(p, h), v = (g._stacks || {})[r.axis], _ = {
        horizontal: d,
        base: b.base,
        enableBorderRadius: !v || Ds(g._custom) || o === v._top || o === v._bottom,
        x: d ? b.head : m.center,
        y: d ? m.center : b.head,
        height: d ? m.size : Math.abs(b.size),
        width: d ? Math.abs(b.size) : m.size
      };
      f && (_.options = u || this.resolveDataElementOptions(p, t[p].active ? "active" : n));
      const k = _.options || t[p].options;
      hl(_, k, v, o), fl(_, k, h.ratio), this.updateElement(t[p], p, _, n);
    }
  }
  _getStacks(t, s) {
    const { iScale: a } = this._cachedMeta, n = a.getMatchingVisibleMetas(this._type).filter((h) => h.controller.options.grouped), i = a.options.stacked, o = [], r = this._cachedMeta.controller.getParsed(s), l = r && r[a.axis], d = (h) => {
      const u = h._parsed.find((p) => p[a.axis] === l), f = u && u[h.vScale.axis];
      if (tt(f) || isNaN(f))
        return !0;
    };
    for (const h of n)
      if (!(s !== void 0 && d(h)) && ((i === !1 || o.indexOf(h.stack) === -1 || i === void 0 && h.stack === void 0) && o.push(h.stack), h.index === t))
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
    return Object.keys(t).filter((a) => t[a].axis === s).shift();
  }
  _getAxis() {
    const t = {}, s = this.getFirstScaleIdForIndexAxis();
    for (const a of this.chart.data.datasets)
      t[U(this.chart.options.indexAxis === "x" ? a.xAxisID : a.yAxisID, s)] = !0;
    return Object.keys(t);
  }
  _getStackIndex(t, s, a) {
    const n = this._getStacks(t, a), i = s !== void 0 ? n.indexOf(s) : -1;
    return i === -1 ? n.length - 1 : i;
  }
  _getRuler() {
    const t = this.options, s = this._cachedMeta, a = s.iScale, n = [];
    let i, o;
    for (i = 0, o = s.data.length; i < o; ++i)
      n.push(a.getPixelForValue(this.getParsed(i)[a.axis], i));
    const r = t.barThickness;
    return {
      min: r || il(s),
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
    const { _cachedMeta: { vScale: s, _stacked: a, index: n }, options: { base: i, minBarLength: o } } = this, r = i || 0, l = this.getParsed(t), d = l._custom, h = Ds(d);
    let u = l[s.axis], f = 0, p = a ? this.applyStack(s, l, a) : u, g, b;
    p !== u && (f = p - u, p = u), h && (u = d.barStart, p = d.barEnd - d.barStart, u !== 0 && Et(u) !== Et(d.barEnd) && (f = 0), f += u);
    const m = !tt(i) && !h ? i : f;
    let v = s.getPixelForValue(m);
    if (this.chart.getDataVisibility(t) ? g = s.getPixelForValue(f + p) : g = v, b = g - v, Math.abs(b) < o) {
      b = cl(b, s, r) * o, u === r && (v -= b / 2);
      const _ = s.getPixelForDecimal(0), k = s.getPixelForDecimal(1), S = Math.min(_, k), M = Math.max(_, k);
      v = Math.max(Math.min(v, M), S), g = v + b, a && !h && (l._stacks[s.axis]._visualValues[n] = s.getValueForPixel(g) - s.getValueForPixel(v));
    }
    if (v === s.getPixelForValue(r)) {
      const _ = Et(b) * s.getLineWidthForValue(r) / 2;
      v += _, b -= _;
    }
    return {
      size: b,
      base: v,
      head: g,
      center: g + b / 2
    };
  }
  _calculateBarIndexPixels(t, s) {
    const a = s.scale, n = this.options, i = n.skipNull, o = U(n.maxBarThickness, 1 / 0);
    let r, l;
    const d = this._getAxisCount();
    if (s.grouped) {
      const h = i ? this._getStackCount(t) : s.stackCount, u = n.barThickness === "flex" ? rl(t, s, n, h * d) : ol(t, s, n, h * d), f = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, p = this._getAxis().indexOf(U(f, this.getFirstScaleIdForIndexAxis())), g = this._getStackIndex(this.index, this._cachedMeta.stack, i ? t : void 0) + p;
      r = u.start + u.chunk * g + u.chunk / 2, l = Math.min(o, u.chunk * u.ratio);
    } else
      r = a.getPixelForValue(this.getParsed(t)[a.axis], t), l = Math.min(o, s.min * s.ratio);
    return {
      base: r - l / 2,
      head: r + l / 2,
      center: r,
      size: l
    };
  }
  draw() {
    const t = this._cachedMeta, s = t.vScale, a = t.data, n = a.length;
    let i = 0;
    for (; i < n; ++i)
      this.getParsed(i)[s.axis] !== null && !a[i].hidden && a[i].draw(this._ctx);
  }
}
function pl(e, t, s) {
  let a = 1, n = 1, i = 0, o = 0;
  if (t < ht) {
    const r = e, l = r + t, d = Math.cos(r), h = Math.sin(r), u = Math.cos(l), f = Math.sin(l), p = (k, S, M) => Ie(k, r, l, !0) ? 1 : Math.max(S, S * s, M, M * s), g = (k, S, M) => Ie(k, r, l, !0) ? -1 : Math.min(S, S * s, M, M * s), b = p(0, d, u), m = p(bt, h, f), v = g(it, d, u), _ = g(it + bt, h, f);
    a = (b - v) / 2, n = (m - _) / 2, i = -(b + v) / 2, o = -(m + _) / 2;
  }
  return {
    ratioX: a,
    ratioY: n,
    offsetX: i,
    offsetY: o
  };
}
class bl extends bs {
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
            const s = t.data, { labels: { pointStyle: a, textAlign: n, color: i, useBorderRadius: o, borderRadius: r } } = t.legend.options;
            return s.labels.length && s.datasets.length ? s.labels.map((l, d) => {
              const u = t.getDatasetMeta(0).controller.getStyle(d);
              return {
                text: l,
                fillStyle: u.backgroundColor,
                fontColor: i,
                hidden: !t.getDataVisibility(d),
                lineDash: u.borderDash,
                lineDashOffset: u.borderDashOffset,
                lineJoin: u.borderJoinStyle,
                lineWidth: u.borderWidth,
                strokeStyle: u.borderColor,
                textAlign: n,
                pointStyle: a,
                borderRadius: o && (r || u.borderRadius),
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
      let i = (l) => +a[l];
      if (X(a[t])) {
        const { key: l = "value" } = this._parsing;
        i = (d) => +re(a[d], l);
      }
      let o, r;
      for (o = t, r = t + s; o < r; ++o)
        n._parsed[o] = i(o);
    }
  }
  _getRotation() {
    return Wt(this.options.rotation - 90);
  }
  _getCircumference() {
    return Wt(this.options.circumference);
  }
  _getRotationExtents() {
    let t = ht, s = -ht;
    for (let a = 0; a < this.chart.data.datasets.length; ++a)
      if (this.chart.isDatasetVisible(a) && this.chart.getDatasetMeta(a).type === this._type) {
        const n = this.chart.getDatasetMeta(a).controller, i = n._getRotation(), o = n._getCircumference();
        t = Math.min(t, i), s = Math.max(s, i + o);
      }
    return {
      rotation: t,
      circumference: s - t
    };
  }
  update(t) {
    const s = this.chart, { chartArea: a } = s, n = this._cachedMeta, i = n.data, o = this.getMaxBorderWidth() + this.getMaxOffset(i) + this.options.spacing, r = Math.max((Math.min(a.width, a.height) - o) / 2, 0), l = Math.min(ko(this.options.cutout, r), 1), d = this._getRingWeight(this.index), { circumference: h, rotation: u } = this._getRotationExtents(), { ratioX: f, ratioY: p, offsetX: g, offsetY: b } = pl(u, h, l), m = (a.width - o) / f, v = (a.height - o) / p, _ = Math.max(Math.min(m, v) / 2, 0), k = qn(this.options.radius, _), S = Math.max(k * l, 0), M = (k - S) / this._getVisibleDatasetWeightTotal();
    this.offsetX = g * k, this.offsetY = b * k, n.total = this.calculateTotal(), this.outerRadius = k - M * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - M * d, 0), this.updateElements(i, 0, i.length, t);
  }
  _circumference(t, s) {
    const a = this.options, n = this._cachedMeta, i = this._getCircumference();
    return s && a.animation.animateRotate || !this.chart.getDataVisibility(t) || n._parsed[t] === null || n.data[t].hidden ? 0 : this.calculateCircumference(n._parsed[t] * i / ht);
  }
  updateElements(t, s, a, n) {
    const i = n === "reset", o = this.chart, r = o.chartArea, d = o.options.animation, h = (r.left + r.right) / 2, u = (r.top + r.bottom) / 2, f = i && d.animateScale, p = f ? 0 : this.innerRadius, g = f ? 0 : this.outerRadius, { sharedOptions: b, includeOptions: m } = this._getSharedOptions(s, n);
    let v = this._getRotation(), _;
    for (_ = 0; _ < s; ++_)
      v += this._circumference(_, i);
    for (_ = s; _ < s + a; ++_) {
      const k = this._circumference(_, i), S = t[_], M = {
        x: h + this.offsetX,
        y: u + this.offsetY,
        startAngle: v,
        endAngle: v + k,
        circumference: k,
        outerRadius: g,
        innerRadius: p
      };
      m && (M.options = b || this.resolveDataElementOptions(_, S.active ? "active" : n)), v += k, this.updateElement(S, _, M, n);
    }
  }
  calculateTotal() {
    const t = this._cachedMeta, s = t.data;
    let a = 0, n;
    for (n = 0; n < s.length; n++) {
      const i = t._parsed[n];
      i !== null && !isNaN(i) && this.chart.getDataVisibility(n) && !s[n].hidden && (a += Math.abs(i));
    }
    return a;
  }
  calculateCircumference(t) {
    const s = this._cachedMeta.total;
    return s > 0 && !isNaN(t) ? ht * (Math.abs(t) / s) : 0;
  }
  getLabelAndValue(t) {
    const s = this._cachedMeta, a = this.chart, n = a.data.labels || [], i = Js(s._parsed[t], a.options.locale);
    return {
      label: n[t] || "",
      value: i
    };
  }
  getMaxBorderWidth(t) {
    let s = 0;
    const a = this.chart;
    let n, i, o, r, l;
    if (!t) {
      for (n = 0, i = a.data.datasets.length; n < i; ++n)
        if (a.isDatasetVisible(n)) {
          o = a.getDatasetMeta(n), t = o.data, r = o.controller;
          break;
        }
    }
    if (!t)
      return 0;
    for (n = 0, i = t.length; n < i; ++n)
      l = r.resolveDataElementOptions(n), l.borderAlign !== "inner" && (s = Math.max(s, l.borderWidth || 0, l.hoverBorderWidth || 0));
    return s;
  }
  getMaxOffset(t) {
    let s = 0;
    for (let a = 0, n = t.length; a < n; ++a) {
      const i = this.resolveDataElementOptions(a);
      s = Math.max(s, i.offset || 0, i.hoverOffset || 0);
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
    return Math.max(U(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
class ml extends bs {
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
    const s = this._cachedMeta, { dataset: a, data: n = [], _dataset: i } = s, o = this.chart._animationsDisabled;
    let { start: r, count: l } = Ho(s, n, o);
    this._drawStart = r, this._drawCount = l, jo(s) && (r = 0, l = n.length), a._chart = this.chart, a._datasetIndex = this.index, a._decimated = !!i._decimated, a.points = n;
    const d = this.resolveDatasetElementOptions(t);
    this.options.showLine || (d.borderWidth = 0), d.segment = this.options.segment, this.updateElement(a, void 0, {
      animated: !o,
      options: d
    }, t), this.updateElements(n, r, l, t);
  }
  updateElements(t, s, a, n) {
    const i = n === "reset", { iScale: o, vScale: r, _stacked: l, _dataset: d } = this._cachedMeta, { sharedOptions: h, includeOptions: u } = this._getSharedOptions(s, n), f = o.axis, p = r.axis, { spanGaps: g, segment: b } = this.options, m = Re(g) ? g : Number.POSITIVE_INFINITY, v = this.chart._animationsDisabled || i || n === "none", _ = s + a, k = t.length;
    let S = s > 0 && this.getParsed(s - 1);
    for (let M = 0; M < k; ++M) {
      const C = t[M], $ = v ? C : {};
      if (M < s || M >= _) {
        $.skip = !0;
        continue;
      }
      const A = this.getParsed(M), E = tt(A[p]), L = $[f] = o.getPixelForValue(A[f], M), D = $[p] = i || E ? r.getBasePixel() : r.getPixelForValue(l ? this.applyStack(r, A, l) : A[p], M);
      $.skip = isNaN(L) || isNaN(D) || E, $.stop = M > 0 && Math.abs(A[f] - S[f]) > m, b && ($.parsed = A, $.raw = d.data[M]), u && ($.options = h || this.resolveDataElementOptions(M, C.active ? "active" : n)), v || this.updateElement(C, M, $, n), S = A;
    }
  }
  getMaxOverflow() {
    const t = this._cachedMeta, s = t.dataset, a = s.options && s.options.borderWidth || 0, n = t.data || [];
    if (!n.length)
      return a;
    const i = n[0].size(this.resolveDataElementOptions(0)), o = n[n.length - 1].size(this.resolveDataElementOptions(n.length - 1));
    return Math.max(a, i, o) / 2;
  }
  draw() {
    const t = this._cachedMeta;
    t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw();
  }
}
class vl extends bl {
  static id = "pie";
  static defaults = {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: "100%"
  };
}
function ee() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class oa {
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
    Object.assign(oa.prototype, t);
  }
  options;
  constructor(t) {
    this.options = t || {};
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return ee();
  }
  parse() {
    return ee();
  }
  format() {
    return ee();
  }
  add() {
    return ee();
  }
  diff() {
    return ee();
  }
  startOf() {
    return ee();
  }
  endOf() {
    return ee();
  }
}
var _l = {
  _date: oa
};
function yl(e, t, s, a) {
  const { controller: n, data: i, _sorted: o } = e, r = n._cachedMeta.iScale, l = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (r && t === r.axis && t !== "r" && o && i.length) {
    const d = r._reversePixels ? Ro : ne;
    if (a) {
      if (n._sharedOptions) {
        const h = i[0], u = typeof h.getRange == "function" && h.getRange(t);
        if (u) {
          const f = d(i, t, s - u), p = d(i, t, s + u);
          return {
            lo: f.lo,
            hi: p.hi
          };
        }
      }
    } else {
      const h = d(i, t, s);
      if (l) {
        const { vScale: u } = n._cachedMeta, { _parsed: f } = e, p = f.slice(0, h.lo + 1).reverse().findIndex((b) => !tt(b[u.axis]));
        h.lo -= Math.max(0, p);
        const g = f.slice(h.hi).findIndex((b) => !tt(b[u.axis]));
        h.hi += Math.max(0, g);
      }
      return h;
    }
  }
  return {
    lo: 0,
    hi: i.length - 1
  };
}
function ms(e, t, s, a, n) {
  const i = e.getSortedVisibleDatasetMetas(), o = s[t];
  for (let r = 0, l = i.length; r < l; ++r) {
    const { index: d, data: h } = i[r], { lo: u, hi: f } = yl(i[r], t, o, n);
    for (let p = u; p <= f; ++p) {
      const g = h[p];
      g.skip || a(g, d, p);
    }
  }
}
function xl(e) {
  const t = e.indexOf("x") !== -1, s = e.indexOf("y") !== -1;
  return function(a, n) {
    const i = t ? Math.abs(a.x - n.x) : 0, o = s ? Math.abs(a.y - n.y) : 0;
    return Math.sqrt(Math.pow(i, 2) + Math.pow(o, 2));
  };
}
function As(e, t, s, a, n) {
  const i = [];
  return !n && !e.isPointInArea(t) || ms(e, s, t, function(r, l, d) {
    !n && !ze(r, e.chartArea, 0) || r.inRange(t.x, t.y, a) && i.push({
      element: r,
      datasetIndex: l,
      index: d
    });
  }, !0), i;
}
function kl(e, t, s, a) {
  let n = [];
  function i(o, r, l) {
    const { startAngle: d, endAngle: h } = o.getProps([
      "startAngle",
      "endAngle"
    ], a), { angle: u } = Xn(o, {
      x: t.x,
      y: t.y
    });
    Ie(u, d, h) && n.push({
      element: o,
      datasetIndex: r,
      index: l
    });
  }
  return ms(e, s, t, i), n;
}
function Ml(e, t, s, a, n, i) {
  let o = [];
  const r = xl(s);
  let l = Number.POSITIVE_INFINITY;
  function d(h, u, f) {
    const p = h.inRange(t.x, t.y, n);
    if (a && !p)
      return;
    const g = h.getCenterPoint(n);
    if (!(!!i || e.isPointInArea(g)) && !p)
      return;
    const m = r(t, g);
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
  return ms(e, s, t, d), o;
}
function Ts(e, t, s, a, n, i) {
  return !i && !e.isPointInArea(t) ? [] : s === "r" && !a ? kl(e, t, s, n) : Ml(e, t, s, a, n, i);
}
function Ya(e, t, s, a, n) {
  const i = [], o = s === "x" ? "inXRange" : "inYRange";
  let r = !1;
  return ms(e, s, t, (l, d, h) => {
    l[o] && l[o](t[s], n) && (i.push({
      element: l,
      datasetIndex: d,
      index: h
    }), r = r || l.inRange(t.x, t.y, n));
  }), a && !r ? [] : i;
}
var Sl = {
  modes: {
    index(e, t, s, a) {
      const n = se(t, e), i = s.axis || "x", o = s.includeInvisible || !1, r = s.intersect ? As(e, n, i, a, o) : Ts(e, n, i, !1, a, o), l = [];
      return r.length ? (e.getSortedVisibleDatasetMetas().forEach((d) => {
        const h = r[0].index, u = d.data[h];
        u && !u.skip && l.push({
          element: u,
          datasetIndex: d.index,
          index: h
        });
      }), l) : [];
    },
    dataset(e, t, s, a) {
      const n = se(t, e), i = s.axis || "xy", o = s.includeInvisible || !1;
      let r = s.intersect ? As(e, n, i, a, o) : Ts(e, n, i, !1, a, o);
      if (r.length > 0) {
        const l = r[0].datasetIndex, d = e.getDatasetMeta(l).data;
        r = [];
        for (let h = 0; h < d.length; ++h)
          r.push({
            element: d[h],
            datasetIndex: l,
            index: h
          });
      }
      return r;
    },
    point(e, t, s, a) {
      const n = se(t, e), i = s.axis || "xy", o = s.includeInvisible || !1;
      return As(e, n, i, a, o);
    },
    nearest(e, t, s, a) {
      const n = se(t, e), i = s.axis || "xy", o = s.includeInvisible || !1;
      return Ts(e, n, i, s.intersect, a, o);
    },
    x(e, t, s, a) {
      const n = se(t, e);
      return Ya(e, n, "x", s.intersect, a);
    },
    y(e, t, s, a) {
      const n = se(t, e);
      return Ya(e, n, "y", s.intersect, a);
    }
  }
};
const mi = [
  "left",
  "top",
  "right",
  "bottom"
];
function xe(e, t) {
  return e.filter((s) => s.pos === t);
}
function qa(e, t) {
  return e.filter((s) => mi.indexOf(s.pos) === -1 && s.box.axis === t);
}
function ke(e, t) {
  return e.sort((s, a) => {
    const n = t ? a : s, i = t ? s : a;
    return n.weight === i.weight ? n.index - i.index : n.weight - i.weight;
  });
}
function wl(e) {
  const t = [];
  let s, a, n, i, o, r;
  for (s = 0, a = (e || []).length; s < a; ++s)
    n = e[s], { position: i, options: { stack: o, stackWeight: r = 1 } } = n, t.push({
      index: s,
      box: n,
      pos: i,
      horizontal: n.isHorizontal(),
      weight: n.weight,
      stack: o && i + o,
      stackWeight: r
    });
  return t;
}
function Cl(e) {
  const t = {};
  for (const s of e) {
    const { stack: a, pos: n, stackWeight: i } = s;
    if (!a || !mi.includes(n))
      continue;
    const o = t[a] || (t[a] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    o.count++, o.weight += i;
  }
  return t;
}
function $l(e, t) {
  const s = Cl(e), { vBoxMaxWidth: a, hBoxMaxHeight: n } = t;
  let i, o, r;
  for (i = 0, o = e.length; i < o; ++i) {
    r = e[i];
    const { fullSize: l } = r.box, d = s[r.stack], h = d && r.stackWeight / d.weight;
    r.horizontal ? (r.width = h ? h * a : l && t.availableWidth, r.height = n) : (r.width = a, r.height = h ? h * n : l && t.availableHeight);
  }
  return s;
}
function Dl(e) {
  const t = wl(e), s = ke(t.filter((d) => d.box.fullSize), !0), a = ke(xe(t, "left"), !0), n = ke(xe(t, "right")), i = ke(xe(t, "top"), !0), o = ke(xe(t, "bottom")), r = qa(t, "x"), l = qa(t, "y");
  return {
    fullSize: s,
    leftAndTop: a.concat(i),
    rightAndBottom: n.concat(l).concat(o).concat(r),
    chartArea: xe(t, "chartArea"),
    vertical: a.concat(n).concat(l),
    horizontal: i.concat(o).concat(r)
  };
}
function Ua(e, t, s, a) {
  return Math.max(e[s], t[s]) + Math.max(e[a], t[a]);
}
function vi(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function Al(e, t, s, a) {
  const { pos: n, box: i } = s, o = e.maxPadding;
  if (!X(n)) {
    s.size && (e[n] -= s.size);
    const u = a[s.stack] || {
      size: 0,
      count: 1
    };
    u.size = Math.max(u.size, s.horizontal ? i.height : i.width), s.size = u.size / u.count, e[n] += s.size;
  }
  i.getPadding && vi(o, i.getPadding());
  const r = Math.max(0, t.outerWidth - Ua(o, e, "left", "right")), l = Math.max(0, t.outerHeight - Ua(o, e, "top", "bottom")), d = r !== e.w, h = l !== e.h;
  return e.w = r, e.h = l, s.horizontal ? {
    same: d,
    other: h
  } : {
    same: h,
    other: d
  };
}
function Tl(e) {
  const t = e.maxPadding;
  function s(a) {
    const n = Math.max(t[a] - e[a], 0);
    return e[a] += n, n;
  }
  e.y += s("top"), e.x += s("left"), s("right"), s("bottom");
}
function Bl(e, t) {
  const s = t.maxPadding;
  function a(n) {
    const i = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return n.forEach((o) => {
      i[o] = Math.max(t[o], s[o]);
    }), i;
  }
  return a(e ? [
    "left",
    "right"
  ] : [
    "top",
    "bottom"
  ]);
}
function $e(e, t, s, a) {
  const n = [];
  let i, o, r, l, d, h;
  for (i = 0, o = e.length, d = 0; i < o; ++i) {
    r = e[i], l = r.box, l.update(r.width || t.w, r.height || t.h, Bl(r.horizontal, t));
    const { same: u, other: f } = Al(t, s, r, a);
    d |= u && n.length, h = h || f, l.fullSize || n.push(r);
  }
  return d && $e(n, t, s, a) || h;
}
function Ze(e, t, s, a, n) {
  e.top = s, e.left = t, e.right = t + a, e.bottom = s + n, e.width = a, e.height = n;
}
function Ka(e, t, s, a) {
  const n = s.padding;
  let { x: i, y: o } = t;
  for (const r of e) {
    const l = r.box, d = a[r.stack] || {
      placed: 0,
      weight: 1
    }, h = r.stackWeight / d.weight || 1;
    if (r.horizontal) {
      const u = t.w * h, f = d.size || l.height;
      Oe(d.start) && (o = d.start), l.fullSize ? Ze(l, n.left, o, s.outerWidth - n.right - n.left, f) : Ze(l, t.left + d.placed, o, u, f), d.start = o, d.placed += u, o = l.bottom;
    } else {
      const u = t.h * h, f = d.size || l.width;
      Oe(d.start) && (i = d.start), l.fullSize ? Ze(l, i, n.top, f, s.outerHeight - n.bottom - n.top) : Ze(l, i, t.top + d.placed, f, u), d.start = i, d.placed += u, i = l.right;
    }
  }
  t.x = i, t.y = o;
}
var Tt = {
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
    const n = Bt(e.options.layout.padding), i = Math.max(t - n.width, 0), o = Math.max(s - n.height, 0), r = Dl(e.boxes), l = r.vertical, d = r.horizontal;
    nt(e.boxes, (b) => {
      typeof b.beforeLayout == "function" && b.beforeLayout();
    });
    const h = l.reduce((b, m) => m.box.options && m.box.options.display === !1 ? b : b + 1, 0) || 1, u = Object.freeze({
      outerWidth: t,
      outerHeight: s,
      padding: n,
      availableWidth: i,
      availableHeight: o,
      vBoxMaxWidth: i / 2 / h,
      hBoxMaxHeight: o / 2
    }), f = Object.assign({}, n);
    vi(f, Bt(a));
    const p = Object.assign({
      maxPadding: f,
      w: i,
      h: o,
      x: n.left,
      y: n.top
    }, n), g = $l(l.concat(d), u);
    $e(r.fullSize, p, u, g), $e(l, p, u, g), $e(d, p, u, g) && $e(l, p, u, g), Tl(p), Ka(r.leftAndTop, p, u, g), p.x += p.w, p.y += p.h, Ka(r.rightAndBottom, p, u, g), e.chartArea = {
      left: p.left,
      top: p.top,
      right: p.left + p.w,
      bottom: p.top + p.h,
      height: p.h,
      width: p.w
    }, nt(r.chartArea, (b) => {
      const m = b.box;
      Object.assign(m, e.chartArea), m.update(p.w, p.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class _i {
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
class Fl extends _i {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const as = "$chartjs", Pl = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, Xa = (e) => e === null || e === "";
function Ll(e, t) {
  const s = e.style, a = e.getAttribute("height"), n = e.getAttribute("width");
  if (e[as] = {
    initial: {
      height: a,
      width: n,
      style: {
        display: s.display,
        height: s.height,
        width: s.width
      }
    }
  }, s.display = s.display || "block", s.boxSizing = s.boxSizing || "border-box", Xa(n)) {
    const i = Fa(e, "width");
    i !== void 0 && (e.width = i);
  }
  if (Xa(a))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const i = Fa(e, "height");
      i !== void 0 && (e.height = i);
    }
  return e;
}
const yi = Fr ? {
  passive: !0
} : !1;
function El(e, t, s) {
  e && e.addEventListener(t, s, yi);
}
function Ol(e, t, s) {
  e && e.canvas && e.canvas.removeEventListener(t, s, yi);
}
function Rl(e, t) {
  const s = Pl[e.type] || e.type, { x: a, y: n } = se(e, t);
  return {
    type: s,
    chart: t,
    native: e,
    x: a !== void 0 ? a : null,
    y: n !== void 0 ? n : null
  };
}
function ds(e, t) {
  for (const s of e)
    if (s === t || s.contains(t))
      return !0;
}
function Il(e, t, s) {
  const a = e.canvas, n = new MutationObserver((i) => {
    let o = !1;
    for (const r of i)
      o = o || ds(r.addedNodes, a), o = o && !ds(r.removedNodes, a);
    o && s();
  });
  return n.observe(document, {
    childList: !0,
    subtree: !0
  }), n;
}
function zl(e, t, s) {
  const a = e.canvas, n = new MutationObserver((i) => {
    let o = !1;
    for (const r of i)
      o = o || ds(r.removedNodes, a), o = o && !ds(r.addedNodes, a);
    o && s();
  });
  return n.observe(document, {
    childList: !0,
    subtree: !0
  }), n;
}
const Ne = /* @__PURE__ */ new Map();
let Ga = 0;
function xi() {
  const e = window.devicePixelRatio;
  e !== Ga && (Ga = e, Ne.forEach((t, s) => {
    s.currentDevicePixelRatio !== e && t();
  }));
}
function Wl(e, t) {
  Ne.size || window.addEventListener("resize", xi), Ne.set(e, t);
}
function Nl(e) {
  Ne.delete(e), Ne.size || window.removeEventListener("resize", xi);
}
function Hl(e, t, s) {
  const a = e.canvas, n = a && ia(a);
  if (!n)
    return;
  const i = Jn((r, l) => {
    const d = n.clientWidth;
    s(r, l), d < n.clientWidth && s();
  }, window), o = new ResizeObserver((r) => {
    const l = r[0], d = l.contentRect.width, h = l.contentRect.height;
    d === 0 && h === 0 || i(d, h);
  });
  return o.observe(n), Wl(e, i), o;
}
function Bs(e, t, s) {
  s && s.disconnect(), t === "resize" && Nl(e);
}
function jl(e, t, s) {
  const a = e.canvas, n = Jn((i) => {
    e.ctx !== null && s(Rl(i, e));
  }, e);
  return El(a, t, n), n;
}
class Vl extends _i {
  acquireContext(t, s) {
    const a = t && t.getContext && t.getContext("2d");
    return a && a.canvas === t ? (Ll(t, s), a) : null;
  }
  releaseContext(t) {
    const s = t.canvas;
    if (!s[as])
      return !1;
    const a = s[as].initial;
    [
      "height",
      "width"
    ].forEach((i) => {
      const o = a[i];
      tt(o) ? s.removeAttribute(i) : s.setAttribute(i, o);
    });
    const n = a.style || {};
    return Object.keys(n).forEach((i) => {
      s.style[i] = n[i];
    }), s.width = s.width, delete s[as], !0;
  }
  addEventListener(t, s, a) {
    this.removeEventListener(t, s);
    const n = t.$proxies || (t.$proxies = {}), o = {
      attach: Il,
      detach: zl,
      resize: Hl
    }[s] || jl;
    n[s] = o(t, s, a);
  }
  removeEventListener(t, s) {
    const a = t.$proxies || (t.$proxies = {}), n = a[s];
    if (!n)
      return;
    ({
      attach: Bs,
      detach: Bs,
      resize: Bs
    }[s] || Ol)(t, s, n), a[s] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, s, a, n) {
    return Br(t, s, a, n);
  }
  isAttached(t) {
    const s = t && ia(t);
    return !!(s && s.isConnected);
  }
}
function Yl(e) {
  return !na() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? Fl : Vl;
}
class jt {
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
    return Re(this.x) && Re(this.y);
  }
  getProps(t, s) {
    const a = this.$animations;
    if (!s || !a)
      return this;
    const n = {};
    return t.forEach((i) => {
      n[i] = a[i] && a[i].active() ? a[i]._to : this[i];
    }), n;
  }
}
function ql(e, t) {
  const s = e.options.ticks, a = Ul(e), n = Math.min(s.maxTicksLimit || a, a), i = s.major.enabled ? Xl(t) : [], o = i.length, r = i[0], l = i[o - 1], d = [];
  if (o > n)
    return Gl(t, d, i, o / n), d;
  const h = Kl(i, t, n);
  if (o > 0) {
    let u, f;
    const p = o > 1 ? Math.round((l - r) / (o - 1)) : null;
    for (Qe(t, d, h, tt(p) ? 0 : r - p, r), u = 0, f = o - 1; u < f; u++)
      Qe(t, d, h, i[u], i[u + 1]);
    return Qe(t, d, h, l, tt(p) ? t.length : l + p), d;
  }
  return Qe(t, d, h), d;
}
function Ul(e) {
  const t = e.options.offset, s = e._tickSize(), a = e._length / s + (t ? 0 : 1), n = e._maxLength / s;
  return Math.floor(Math.min(a, n));
}
function Kl(e, t, s) {
  const a = Zl(e), n = t.length / s;
  if (!a)
    return Math.max(n, 1);
  const i = To(a);
  for (let o = 0, r = i.length - 1; o < r; o++) {
    const l = i[o];
    if (l > n)
      return l;
  }
  return Math.max(n, 1);
}
function Xl(e) {
  const t = [];
  let s, a;
  for (s = 0, a = e.length; s < a; s++)
    e[s].major && t.push(s);
  return t;
}
function Gl(e, t, s, a) {
  let n = 0, i = s[0], o;
  for (a = Math.ceil(a), o = 0; o < e.length; o++)
    o === i && (t.push(e[o]), n++, i = s[n * a]);
}
function Qe(e, t, s, a, n) {
  const i = U(a, 0), o = Math.min(U(n, e.length), e.length);
  let r = 0, l, d, h;
  for (s = Math.ceil(s), n && (l = n - a, s = l / Math.floor(l / s)), h = i; h < 0; )
    r++, h = Math.round(i + r * s);
  for (d = Math.max(i, 0); d < o; d++)
    d === h && (t.push(e[d]), r++, h = Math.round(i + r * s));
}
function Zl(e) {
  const t = e.length;
  let s, a;
  if (t < 2)
    return !1;
  for (a = e[0], s = 1; s < t; ++s)
    if (e[s] - e[s - 1] !== a)
      return !1;
  return a;
}
const Ql = (e) => e === "left" ? "right" : e === "right" ? "left" : e, Za = (e, t, s) => t === "top" || t === "left" ? e[t] + s : e[t] - s, Qa = (e, t) => Math.min(t || e, e);
function Ja(e, t) {
  const s = [], a = e.length / t, n = e.length;
  let i = 0;
  for (; i < n; i += a)
    s.push(e[Math.floor(i)]);
  return s;
}
function Jl(e, t, s) {
  const a = e.ticks.length, n = Math.min(t, a - 1), i = e._startPixel, o = e._endPixel, r = 1e-6;
  let l = e.getPixelForTick(n), d;
  if (!(s && (a === 1 ? d = Math.max(l - i, o - l) : t === 0 ? d = (e.getPixelForTick(1) - l) / 2 : d = (l - e.getPixelForTick(n - 1)) / 2, l += n < t ? d : -d, l < i - r || l > o + r)))
    return l;
}
function tc(e, t) {
  nt(e, (s) => {
    const a = s.gc, n = a.length / 2;
    let i;
    if (n > t) {
      for (i = 0; i < n; ++i)
        delete s.data[a[i]];
      a.splice(0, n);
    }
  });
}
function Me(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function tn(e, t) {
  if (!e.display)
    return 0;
  const s = yt(e.font, t), a = Bt(e.padding);
  return (pt(e.text) ? e.text.length : 1) * s.lineHeight + a.height;
}
function ec(e, t) {
  return ce(e, {
    scale: t,
    type: "scale"
  });
}
function sc(e, t, s) {
  return ce(e, {
    tick: s,
    index: t,
    type: "tick"
  });
}
function ac(e, t, s) {
  let a = Zs(e);
  return (s && t !== "right" || !s && t === "right") && (a = Ql(a)), a;
}
function nc(e, t, s, a) {
  const { top: n, left: i, bottom: o, right: r, chart: l } = e, { chartArea: d, scales: h } = l;
  let u = 0, f, p, g;
  const b = o - n, m = r - i;
  if (e.isHorizontal()) {
    if (p = vt(a, i, r), X(s)) {
      const v = Object.keys(s)[0], _ = s[v];
      g = h[v].getPixelForValue(_) + b - t;
    } else s === "center" ? g = (d.bottom + d.top) / 2 + b - t : g = Za(e, s, t);
    f = r - i;
  } else {
    if (X(s)) {
      const v = Object.keys(s)[0], _ = s[v];
      p = h[v].getPixelForValue(_) - m + t;
    } else s === "center" ? p = (d.left + d.right) / 2 - m + t : p = Za(e, s, t);
    g = vt(a, o, n), u = s === "left" ? -bt : bt;
  }
  return {
    titleX: p,
    titleY: g,
    maxWidth: f,
    rotation: u
  };
}
class ve extends jt {
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
    return t = Ft(t, Number.POSITIVE_INFINITY), s = Ft(s, Number.NEGATIVE_INFINITY), a = Ft(a, Number.POSITIVE_INFINITY), n = Ft(n, Number.NEGATIVE_INFINITY), {
      min: Ft(t, a),
      max: Ft(s, n),
      minDefined: kt(t),
      maxDefined: kt(s)
    };
  }
  getMinMax(t) {
    let { min: s, max: a, minDefined: n, maxDefined: i } = this.getUserBounds(), o;
    if (n && i)
      return {
        min: s,
        max: a
      };
    const r = this.getMatchingVisibleMetas();
    for (let l = 0, d = r.length; l < d; ++l)
      o = r[l].controller.getMinMax(this, t), n || (s = Math.min(s, o.min)), i || (a = Math.max(a, o.max));
    return s = i && s > a ? a : s, a = n && s > a ? s : a, {
      min: Ft(s, Ft(a, s)),
      max: Ft(a, Ft(s, a))
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
    ct(this.options.beforeUpdate, [
      this
    ]);
  }
  update(t, s, a) {
    const { beginAtZero: n, grace: i, ticks: o } = this.options, r = o.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = s, this._margins = a = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, a), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + a.left + a.right : this.height + a.top + a.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = cr(this, i, n), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const l = r < this.ticks.length;
    this._convertTicksToLabels(l ? Ja(this.ticks, r) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), o.display && (o.autoSkip || o.source === "auto") && (this.ticks = ql(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), l && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, s, a;
    this.isHorizontal() ? (s = this.left, a = this.right) : (s = this.top, a = this.bottom, t = !t), this._startPixel = s, this._endPixel = a, this._reversePixels = t, this._length = a - s, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    ct(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    ct(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    ct(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), ct(this.options[t], [
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
    ct(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const s = this.options.ticks;
    let a, n, i;
    for (a = 0, n = t.length; a < n; a++)
      i = t[a], i.label = ct(s.callback, [
        i.value,
        a,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    ct(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    ct(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, s = t.ticks, a = Qa(this.ticks.length, t.ticks.maxTicksLimit), n = s.minRotation || 0, i = s.maxRotation;
    let o = n, r, l, d;
    if (!this._isVisible() || !s.display || n >= i || a <= 1 || !this.isHorizontal()) {
      this.labelRotation = n;
      return;
    }
    const h = this._getLabelSizes(), u = h.widest.width, f = h.highest.height, p = _t(this.chart.width - u, 0, this.maxWidth);
    r = t.offset ? this.maxWidth / a : p / (a - 1), u + 6 > r && (r = p / (a - (t.offset ? 0.5 : 1)), l = this.maxHeight - Me(t.grid) - s.padding - tn(t.title, this.chart.options.font), d = Math.sqrt(u * u + f * f), o = Lo(Math.min(Math.asin(_t((h.highest.height + 6) / r, -1, 1)), Math.asin(_t(l / d, -1, 1)) - Math.asin(_t(f / d, -1, 1)))), o = Math.max(n, Math.min(i, o))), this.labelRotation = o;
  }
  afterCalculateLabelRotation() {
    ct(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    ct(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: s, options: { ticks: a, title: n, grid: i } } = this, o = this._isVisible(), r = this.isHorizontal();
    if (o) {
      const l = tn(n, s.options.font);
      if (r ? (t.width = this.maxWidth, t.height = Me(i) + l) : (t.height = this.maxHeight, t.width = Me(i) + l), a.display && this.ticks.length) {
        const { first: d, last: h, widest: u, highest: f } = this._getLabelSizes(), p = a.padding * 2, g = Wt(this.labelRotation), b = Math.cos(g), m = Math.sin(g);
        if (r) {
          const v = a.mirror ? 0 : m * u.width + b * f.height;
          t.height = Math.min(this.maxHeight, t.height + v + p);
        } else {
          const v = a.mirror ? 0 : b * u.width + m * f.height;
          t.width = Math.min(this.maxWidth, t.width + v + p);
        }
        this._calculatePadding(d, h, m, b);
      }
    }
    this._handleMargins(), r ? (this.width = this._length = s.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = s.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, s, a, n) {
    const { ticks: { align: i, padding: o }, position: r } = this.options, l = this.labelRotation !== 0, d = r !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const h = this.getPixelForTick(0) - this.left, u = this.right - this.getPixelForTick(this.ticks.length - 1);
      let f = 0, p = 0;
      l ? d ? (f = n * t.width, p = a * s.height) : (f = a * t.height, p = n * s.width) : i === "start" ? p = s.width : i === "end" ? f = t.width : i !== "inner" && (f = t.width / 2, p = s.width / 2), this.paddingLeft = Math.max((f - h + o) * this.width / (this.width - h), 0), this.paddingRight = Math.max((p - u + o) * this.width / (this.width - u), 0);
    } else {
      let h = s.height / 2, u = t.height / 2;
      i === "start" ? (h = 0, u = t.height) : i === "end" && (h = s.height, u = 0), this.paddingTop = h + o, this.paddingBottom = u + o;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    ct(this.options.afterFit, [
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
      tt(t[s].label) && (t.splice(s, 1), a--, s--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const s = this.options.ticks.sampleSize;
      let a = this.ticks;
      s < a.length && (a = Ja(a, s)), this._labelSizes = t = this._computeLabelSizes(a, a.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, s, a) {
    const { ctx: n, _longestTextCache: i } = this, o = [], r = [], l = Math.floor(s / Qa(s, a));
    let d = 0, h = 0, u, f, p, g, b, m, v, _, k, S, M;
    for (u = 0; u < s; u += l) {
      if (g = t[u].label, b = this._resolveTickFontOptions(u), n.font = m = b.string, v = i[m] = i[m] || {
        data: {},
        gc: []
      }, _ = b.lineHeight, k = S = 0, !tt(g) && !pt(g))
        k = $a(n, v.data, v.gc, k, g), S = _;
      else if (pt(g))
        for (f = 0, p = g.length; f < p; ++f)
          M = g[f], !tt(M) && !pt(M) && (k = $a(n, v.data, v.gc, k, M), S += _);
      o.push(k), r.push(S), d = Math.max(k, d), h = Math.max(S, h);
    }
    tc(i, s);
    const C = o.indexOf(d), $ = r.indexOf(h), A = (E) => ({
      width: o[E] || 0,
      height: r[E] || 0
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
    return Oo(this._alignToPixels ? te(this.chart, s, 0) : s);
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
      return a.$context || (a.$context = sc(this.getContext(), t, a));
    }
    return this.$context || (this.$context = ec(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, s = Wt(this.labelRotation), a = Math.abs(Math.cos(s)), n = Math.abs(Math.sin(s)), i = this._getLabelSizes(), o = t.autoSkipPadding || 0, r = i ? i.widest.width + o : 0, l = i ? i.highest.height + o : 0;
    return this.isHorizontal() ? l * a > r * n ? r / a : l / n : l * n < r * a ? l / a : r / n;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const s = this.axis, a = this.chart, n = this.options, { grid: i, position: o, border: r } = n, l = i.offset, d = this.isHorizontal(), u = this.ticks.length + (l ? 1 : 0), f = Me(i), p = [], g = r.setContext(this.getContext()), b = g.display ? g.width : 0, m = b / 2, v = function(q) {
      return te(a, q, b);
    };
    let _, k, S, M, C, $, A, E, L, D, B, O;
    if (o === "top")
      _ = v(this.bottom), $ = this.bottom - f, E = _ - m, D = v(t.top) + m, O = t.bottom;
    else if (o === "bottom")
      _ = v(this.top), D = t.top, O = v(t.bottom) - m, $ = _ + m, E = this.top + f;
    else if (o === "left")
      _ = v(this.right), C = this.right - f, A = _ - m, L = v(t.left) + m, B = t.right;
    else if (o === "right")
      _ = v(this.left), L = t.left, B = v(t.right) - m, C = _ + m, A = this.left + f;
    else if (s === "x") {
      if (o === "center")
        _ = v((t.top + t.bottom) / 2 + 0.5);
      else if (X(o)) {
        const q = Object.keys(o)[0], st = o[q];
        _ = v(this.chart.scales[q].getPixelForValue(st));
      }
      D = t.top, O = t.bottom, $ = _ + m, E = $ + f;
    } else if (s === "y") {
      if (o === "center")
        _ = v((t.left + t.right) / 2);
      else if (X(o)) {
        const q = Object.keys(o)[0], st = o[q];
        _ = v(this.chart.scales[q].getPixelForValue(st));
      }
      C = _ - m, A = C - f, L = t.left, B = t.right;
    }
    const P = U(n.ticks.maxTicksLimit, u), R = Math.max(1, Math.ceil(u / P));
    for (k = 0; k < u; k += R) {
      const q = this.getContext(k), st = i.setContext(q), H = r.setContext(q), W = st.lineWidth, N = st.color, Z = H.dash || [], at = H.dashOffset, ot = st.tickWidth, ut = st.tickColor, Mt = st.tickBorderDash || [], dt = st.tickBorderDashOffset;
      S = Jl(this, k, l), S !== void 0 && (M = te(a, S, W), d ? C = A = L = B = M : $ = E = D = O = M, p.push({
        tx1: C,
        ty1: $,
        tx2: A,
        ty2: E,
        x1: L,
        y1: D,
        x2: B,
        y2: O,
        width: W,
        color: N,
        borderDash: Z,
        borderDashOffset: at,
        tickWidth: ot,
        tickColor: ut,
        tickBorderDash: Mt,
        tickBorderDashOffset: dt
      }));
    }
    return this._ticksLength = u, this._borderValue = _, p;
  }
  _computeLabelItems(t) {
    const s = this.axis, a = this.options, { position: n, ticks: i } = a, o = this.isHorizontal(), r = this.ticks, { align: l, crossAlign: d, padding: h, mirror: u } = i, f = Me(a.grid), p = f + h, g = u ? -h : p, b = -Wt(this.labelRotation), m = [];
    let v, _, k, S, M, C, $, A, E, L, D, B, O = "middle";
    if (n === "top")
      C = this.bottom - g, $ = this._getXAxisLabelAlignment();
    else if (n === "bottom")
      C = this.top + g, $ = this._getXAxisLabelAlignment();
    else if (n === "left") {
      const R = this._getYAxisLabelAlignment(f);
      $ = R.textAlign, M = R.x;
    } else if (n === "right") {
      const R = this._getYAxisLabelAlignment(f);
      $ = R.textAlign, M = R.x;
    } else if (s === "x") {
      if (n === "center")
        C = (t.top + t.bottom) / 2 + p;
      else if (X(n)) {
        const R = Object.keys(n)[0], q = n[R];
        C = this.chart.scales[R].getPixelForValue(q) + p;
      }
      $ = this._getXAxisLabelAlignment();
    } else if (s === "y") {
      if (n === "center")
        M = (t.left + t.right) / 2 - p;
      else if (X(n)) {
        const R = Object.keys(n)[0], q = n[R];
        M = this.chart.scales[R].getPixelForValue(q);
      }
      $ = this._getYAxisLabelAlignment(f).textAlign;
    }
    s === "y" && (l === "start" ? O = "top" : l === "end" && (O = "bottom"));
    const P = this._getLabelSizes();
    for (v = 0, _ = r.length; v < _; ++v) {
      k = r[v], S = k.label;
      const R = i.setContext(this.getContext(v));
      A = this.getPixelForTick(v) + i.labelOffset, E = this._resolveTickFontOptions(v), L = E.lineHeight, D = pt(S) ? S.length : 1;
      const q = D / 2, st = R.color, H = R.textStrokeColor, W = R.textStrokeWidth;
      let N = $;
      o ? (M = A, $ === "inner" && (v === _ - 1 ? N = this.options.reverse ? "left" : "right" : v === 0 ? N = this.options.reverse ? "right" : "left" : N = "center"), n === "top" ? d === "near" || b !== 0 ? B = -D * L + L / 2 : d === "center" ? B = -P.highest.height / 2 - q * L + L : B = -P.highest.height + L / 2 : d === "near" || b !== 0 ? B = L / 2 : d === "center" ? B = P.highest.height / 2 - q * L : B = P.highest.height - D * L, u && (B *= -1), b !== 0 && !R.showLabelBackdrop && (M += L / 2 * Math.sin(b))) : (C = A, B = (1 - D) * L / 2);
      let Z;
      if (R.showLabelBackdrop) {
        const at = Bt(R.backdropPadding), ot = P.heights[v], ut = P.widths[v];
        let Mt = B - at.top, dt = 0 - at.left;
        switch (O) {
          case "middle":
            Mt -= ot / 2;
            break;
          case "bottom":
            Mt -= ot;
            break;
        }
        switch ($) {
          case "center":
            dt -= ut / 2;
            break;
          case "right":
            dt -= ut;
            break;
          case "inner":
            v === _ - 1 ? dt -= ut : v > 0 && (dt -= ut / 2);
            break;
        }
        Z = {
          left: dt,
          top: Mt,
          width: ut + at.width,
          height: ot + at.height,
          color: R.backdropColor
        };
      }
      m.push({
        label: S,
        font: E,
        textOffset: B,
        options: {
          rotation: b,
          color: st,
          strokeColor: H,
          strokeWidth: W,
          textAlign: N,
          textBaseline: O,
          translation: [
            M,
            C
          ],
          backdrop: Z
        }
      });
    }
    return m;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: s } = this.options;
    if (-Wt(this.labelRotation))
      return t === "top" ? "left" : "right";
    let n = "center";
    return s.align === "start" ? n = "left" : s.align === "end" ? n = "right" : s.align === "inner" && (n = "inner"), n;
  }
  _getYAxisLabelAlignment(t) {
    const { position: s, ticks: { crossAlign: a, mirror: n, padding: i } } = this.options, o = this._getLabelSizes(), r = t + i, l = o.widest.width;
    let d, h;
    return s === "left" ? n ? (h = this.right + i, a === "near" ? d = "left" : a === "center" ? (d = "center", h += l / 2) : (d = "right", h += l)) : (h = this.right - r, a === "near" ? d = "right" : a === "center" ? (d = "center", h -= l / 2) : (d = "left", h = this.left)) : s === "right" ? n ? (h = this.left + i, a === "near" ? d = "right" : a === "center" ? (d = "center", h -= l / 2) : (d = "left", h -= l)) : (h = this.left + r, a === "near" ? d = "left" : a === "center" ? (d = "center", h += l / 2) : (d = "right", h = this.right)) : d = "right", {
      textAlign: d,
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
    const { ctx: t, options: { backgroundColor: s }, left: a, top: n, width: i, height: o } = this;
    s && (t.save(), t.fillStyle = s, t.fillRect(a, n, i, o), t.restore());
  }
  getLineWidthForValue(t) {
    const s = this.options.grid;
    if (!this._isVisible() || !s.display)
      return 0;
    const n = this.ticks.findIndex((i) => i.value === t);
    return n >= 0 ? s.setContext(this.getContext(n)).lineWidth : 0;
  }
  drawGrid(t) {
    const s = this.options.grid, a = this.ctx, n = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
    let i, o;
    const r = (l, d, h) => {
      !h.width || !h.color || (a.save(), a.lineWidth = h.width, a.strokeStyle = h.color, a.setLineDash(h.borderDash || []), a.lineDashOffset = h.borderDashOffset, a.beginPath(), a.moveTo(l.x, l.y), a.lineTo(d.x, d.y), a.stroke(), a.restore());
    };
    if (s.display)
      for (i = 0, o = n.length; i < o; ++i) {
        const l = n[i];
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
    const { chart: t, ctx: s, options: { border: a, grid: n } } = this, i = a.setContext(this.getContext()), o = a.display ? i.width : 0;
    if (!o)
      return;
    const r = n.setContext(this.getContext(0)).lineWidth, l = this._borderValue;
    let d, h, u, f;
    this.isHorizontal() ? (d = te(t, this.left, o) - o / 2, h = te(t, this.right, r) + r / 2, u = f = l) : (u = te(t, this.top, o) - o / 2, f = te(t, this.bottom, r) + r / 2, d = h = l), s.save(), s.lineWidth = i.width, s.strokeStyle = i.color, s.beginPath(), s.moveTo(d, u), s.lineTo(h, f), s.stroke(), s.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const a = this.ctx, n = this._computeLabelArea();
    n && fs(a, n);
    const i = this.getLabelItems(t);
    for (const o of i) {
      const r = o.options, l = o.font, d = o.label, h = o.textOffset;
      We(a, d, 0, h, l, r);
    }
    n && gs(a);
  }
  drawTitle() {
    const { ctx: t, options: { position: s, title: a, reverse: n } } = this;
    if (!a.display)
      return;
    const i = yt(a.font), o = Bt(a.padding), r = a.align;
    let l = i.lineHeight / 2;
    s === "bottom" || s === "center" || X(s) ? (l += o.bottom, pt(a.text) && (l += i.lineHeight * (a.text.length - 1))) : l += o.top;
    const { titleX: d, titleY: h, maxWidth: u, rotation: f } = nc(this, l, s, r);
    We(t, a.text, 0, 0, i, {
      color: a.color,
      maxWidth: u,
      rotation: f,
      textAlign: ac(r, s, n),
      textBaseline: "middle",
      translation: [
        d,
        h
      ]
    });
  }
  draw(t) {
    this._isVisible() && (this.drawBackground(), this.drawGrid(t), this.drawBorder(), this.drawTitle(), this.drawLabels(t));
  }
  _layers() {
    const t = this.options, s = t.ticks && t.ticks.z || 0, a = U(t.grid && t.grid.z, -1), n = U(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== ve.prototype.draw ? [
      {
        z: s,
        draw: (i) => {
          this.draw(i);
        }
      }
    ] : [
      {
        z: a,
        draw: (i) => {
          this.drawBackground(), this.drawGrid(i), this.drawTitle();
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
        draw: (i) => {
          this.drawLabels(i);
        }
      }
    ];
  }
  getMatchingVisibleMetas(t) {
    const s = this.chart.getSortedVisibleDatasetMetas(), a = this.axis + "AxisID", n = [];
    let i, o;
    for (i = 0, o = s.length; i < o; ++i) {
      const r = s[i];
      r[a] === this.id && (!t || r.type === t) && n.push(r);
    }
    return n;
  }
  _resolveTickFontOptions(t) {
    const s = this.options.ticks.setContext(this.getContext(t));
    return yt(s.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class Je {
  constructor(t, s, a) {
    this.type = t, this.scope = s, this.override = a, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const s = Object.getPrototypeOf(t);
    let a;
    rc(s) && (a = this.register(s));
    const n = this.items, i = t.id, o = this.scope + "." + i;
    if (!i)
      throw new Error("class does not have id: " + t);
    return i in n || (n[i] = t, ic(t, o, a), this.override && gt.override(t.id, t.overrides)), o;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const s = this.items, a = t.id, n = this.scope;
    a in s && delete s[a], n && a in gt[n] && (delete gt[n][a], this.override && delete le[a]);
  }
}
function ic(e, t, s) {
  const a = Ee(/* @__PURE__ */ Object.create(null), [
    s ? gt.get(s) : {},
    gt.get(t),
    e.defaults
  ]);
  gt.set(t, a), e.defaultRoutes && oc(t, e.defaultRoutes), e.descriptors && gt.describe(t, e.descriptors);
}
function oc(e, t) {
  Object.keys(t).forEach((s) => {
    const a = s.split("."), n = a.pop(), i = [
      e
    ].concat(a).join("."), o = t[s].split("."), r = o.pop(), l = o.join(".");
    gt.route(i, n, l, r);
  });
}
function rc(e) {
  return "id" in e && "defaults" in e;
}
class lc {
  constructor() {
    this.controllers = new Je(bs, "datasets", !0), this.elements = new Je(jt, "elements"), this.plugins = new Je(Object, "plugins"), this.scales = new Je(ve, "scales"), this._typedRegistries = [
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
      const i = a || this._getRegistryForType(n);
      a || i.isForType(n) || i === this.plugins && n.id ? this._exec(t, i, n) : nt(n, (o) => {
        const r = a || this._getRegistryForType(o);
        this._exec(t, r, o);
      });
    });
  }
  _exec(t, s, a) {
    const n = Xs(t);
    ct(a["before" + n], [], a), s[t](a), ct(a["after" + n], [], a);
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
var Lt = /* @__PURE__ */ new lc();
class cc {
  constructor() {
    this._init = void 0;
  }
  notify(t, s, a, n) {
    if (s === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install")), this._init === void 0)
      return;
    const i = n ? this._descriptors(t).filter(n) : this._descriptors(t), o = this._notify(i, t, s, a);
    return s === "afterDestroy" && (this._notify(i, t, "stop"), this._notify(this._init, t, "uninstall"), this._init = void 0), o;
  }
  _notify(t, s, a, n) {
    n = n || {};
    for (const i of t) {
      const o = i.plugin, r = o[a], l = [
        s,
        n,
        i.options
      ];
      if (ct(r, l, o) === !1 && n.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    tt(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const s = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), s;
  }
  _createDescriptors(t, s) {
    const a = t && t.config, n = U(a.options && a.options.plugins, {}), i = dc(a);
    return n === !1 && !s ? [] : uc(t, i, n, s);
  }
  _notifyStateChanges(t) {
    const s = this._oldCache || [], a = this._cache, n = (i, o) => i.filter((r) => !o.some((l) => r.plugin.id === l.plugin.id));
    this._notify(n(s, a), t, "stop"), this._notify(n(a, s), t, "start");
  }
}
function dc(e) {
  const t = {}, s = [], a = Object.keys(Lt.plugins.items);
  for (let i = 0; i < a.length; i++)
    s.push(Lt.getPlugin(a[i]));
  const n = e.plugins || [];
  for (let i = 0; i < n.length; i++) {
    const o = n[i];
    s.indexOf(o) === -1 && (s.push(o), t[o.id] = !0);
  }
  return {
    plugins: s,
    localIds: t
  };
}
function hc(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function uc(e, { plugins: t, localIds: s }, a, n) {
  const i = [], o = e.getContext();
  for (const r of t) {
    const l = r.id, d = hc(a[l], n);
    d !== null && i.push({
      plugin: r,
      options: fc(e.config, {
        plugin: r,
        local: s[l]
      }, d, o)
    });
  }
  return i;
}
function fc(e, { plugin: t, local: s }, a, n) {
  const i = e.pluginScopeKeys(t), o = e.getOptionScopes(a, i);
  return s && t.defaults && o.push(t.defaults), e.createResolver(o, n, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Hs(e, t) {
  const s = gt.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || s.indexAxis || "x";
}
function gc(e, t) {
  let s = e;
  return e === "_index_" ? s = t : e === "_value_" && (s = t === "x" ? "y" : "x"), s;
}
function pc(e, t) {
  return e === t ? "_index_" : "_value_";
}
function en(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function bc(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function js(e, ...t) {
  if (en(e))
    return e;
  for (const s of t) {
    const a = s.axis || bc(s.position) || e.length > 1 && en(e[0].toLowerCase());
    if (a)
      return a;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function sn(e, t, s) {
  if (s[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function mc(e, t) {
  if (t.data && t.data.datasets) {
    const s = t.data.datasets.filter((a) => a.xAxisID === e || a.yAxisID === e);
    if (s.length)
      return sn(e, "x", s[0]) || sn(e, "y", s[0]);
  }
  return {};
}
function vc(e, t) {
  const s = le[e.type] || {
    scales: {}
  }, a = t.scales || {}, n = Hs(e.type, t), i = /* @__PURE__ */ Object.create(null);
  return Object.keys(a).forEach((o) => {
    const r = a[o];
    if (!X(r))
      return console.error(`Invalid scale configuration for scale: ${o}`);
    if (r._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${o}`);
    const l = js(o, r, mc(o, e), gt.scales[r.type]), d = pc(l, n), h = s.scales || {};
    i[o] = Ae(/* @__PURE__ */ Object.create(null), [
      {
        axis: l
      },
      r,
      h[l],
      h[d]
    ]);
  }), e.data.datasets.forEach((o) => {
    const r = o.type || e.type, l = o.indexAxis || Hs(r, t), h = (le[r] || {}).scales || {};
    Object.keys(h).forEach((u) => {
      const f = gc(u, l), p = o[f + "AxisID"] || f;
      i[p] = i[p] || /* @__PURE__ */ Object.create(null), Ae(i[p], [
        {
          axis: f
        },
        a[p],
        h[u]
      ]);
    });
  }), Object.keys(i).forEach((o) => {
    const r = i[o];
    Ae(r, [
      gt.scales[r.type],
      gt.scale
    ]);
  }), i;
}
function ki(e) {
  const t = e.options || (e.options = {});
  t.plugins = U(t.plugins, {}), t.scales = vc(e, t);
}
function Mi(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function _c(e) {
  return e = e || {}, e.data = Mi(e.data), ki(e), e;
}
const an = /* @__PURE__ */ new Map(), Si = /* @__PURE__ */ new Set();
function ts(e, t) {
  let s = an.get(e);
  return s || (s = t(), an.set(e, s), Si.add(s)), s;
}
const Se = (e, t, s) => {
  const a = re(t, s);
  a !== void 0 && e.add(a);
};
class yc {
  constructor(t) {
    this._config = _c(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = Mi(t);
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
    this.clearCache(), ki(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return ts(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, s) {
    return ts(`${t}.transition.${s}`, () => [
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
    return ts(`${t}-${s}`, () => [
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
    return ts(`${a}-plugin-${s}`, () => [
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
    const { options: n, type: i } = this, o = this._cachedScopes(t, a), r = o.get(s);
    if (r)
      return r;
    const l = /* @__PURE__ */ new Set();
    s.forEach((h) => {
      t && (l.add(t), h.forEach((u) => Se(l, t, u))), h.forEach((u) => Se(l, n, u)), h.forEach((u) => Se(l, le[i] || {}, u)), h.forEach((u) => Se(l, gt, u)), h.forEach((u) => Se(l, Ws, u));
    });
    const d = Array.from(l);
    return d.length === 0 && d.push(/* @__PURE__ */ Object.create(null)), Si.has(s) && o.set(s, d), d;
  }
  chartOptionScopes() {
    const { options: t, type: s } = this;
    return [
      t,
      le[s] || {},
      gt.datasets[s] || {},
      {
        type: s
      },
      gt,
      Ws
    ];
  }
  resolveNamedOptions(t, s, a, n = [
    ""
  ]) {
    const i = {
      $shared: !0
    }, { resolver: o, subPrefixes: r } = nn(this._resolverCache, t, n);
    let l = o;
    if (kc(o, s)) {
      i.$shared = !1, a = Xt(a) ? a() : a;
      const d = this.createResolver(t, a, r);
      l = be(o, a, d);
    }
    for (const d of s)
      i[d] = l[d];
    return i;
  }
  createResolver(t, s, a = [
    ""
  ], n) {
    const { resolver: i } = nn(this._resolverCache, t, a);
    return X(s) ? be(i, s, void 0, n) : i;
  }
}
function nn(e, t, s) {
  let a = e.get(t);
  a || (a = /* @__PURE__ */ new Map(), e.set(t, a));
  const n = s.join();
  let i = a.get(n);
  return i || (i = {
    resolver: ea(t, s),
    subPrefixes: s.filter((r) => !r.toLowerCase().includes("hover"))
  }, a.set(n, i)), i;
}
const xc = (e) => X(e) && Object.getOwnPropertyNames(e).some((t) => Xt(e[t]));
function kc(e, t) {
  const { isScriptable: s, isIndexable: a } = ai(e);
  for (const n of t) {
    const i = s(n), o = a(n), r = (o || i) && e[n];
    if (i && (Xt(r) || xc(r)) || o && pt(r))
      return !0;
  }
  return !1;
}
var Mc = "4.5.1";
const Sc = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function on(e, t) {
  return e === "top" || e === "bottom" || Sc.indexOf(e) === -1 && t === "x";
}
function rn(e, t) {
  return function(s, a) {
    return s[e] === a[e] ? s[t] - a[t] : s[e] - a[e];
  };
}
function ln(e) {
  const t = e.chart, s = t.options.animation;
  t.notifyPlugins("afterRender"), ct(s && s.onComplete, [
    e
  ], t);
}
function wc(e) {
  const t = e.chart, s = t.options.animation;
  ct(s && s.onProgress, [
    e
  ], t);
}
function wi(e) {
  return na() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const ns = {}, cn = (e) => {
  const t = wi(e);
  return Object.values(ns).filter((s) => s.canvas === t).pop();
};
function Cc(e, t, s) {
  const a = Object.keys(e);
  for (const n of a) {
    const i = +n;
    if (i >= t) {
      const o = e[n];
      delete e[n], (s > 0 || i > t) && (e[i + s] = o);
    }
  }
}
function $c(e, t, s, a) {
  return !s || e.type === "mouseout" ? null : a ? t : e;
}
let _e = class {
  static defaults = gt;
  static instances = ns;
  static overrides = le;
  static registry = Lt;
  static version = Mc;
  static getChart = cn;
  static register(...t) {
    Lt.add(...t), dn();
  }
  static unregister(...t) {
    Lt.remove(...t), dn();
  }
  constructor(t, s) {
    const a = this.config = new yc(s), n = wi(t), i = cn(n);
    if (i)
      throw new Error("Canvas is already in use. Chart with ID '" + i.id + "' must be destroyed before the canvas with ID '" + i.canvas.id + "' can be reused.");
    const o = a.createResolver(a.chartOptionScopes(), this.getContext());
    this.platform = new (a.platform || Yl(n))(), this.platform.updateConfig(a);
    const r = this.platform.acquireContext(n, o.aspectRatio), l = r && r.canvas, d = l && l.height, h = l && l.width;
    if (this.id = xo(), this.ctx = r, this.canvas = l, this.width = h, this.height = d, this._options = o, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new cc(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = Wo((u) => this.update(u), o.resizeDelay || 0), this._dataChanges = [], ns[this.id] = this, !r || !l) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    Rt.listen(this, "complete", ln), Rt.listen(this, "progress", wc), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: s }, width: a, height: n, _aspectRatio: i } = this;
    return tt(t) ? s && i ? i : n ? a / n : null : t;
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
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : Ba(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Da(this.canvas, this.ctx), this;
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
    const a = this.options, n = this.canvas, i = a.maintainAspectRatio && this.aspectRatio, o = this.platform.getMaximumSize(n, t, s, i), r = a.devicePixelRatio || this.platform.getDevicePixelRatio(), l = this.width ? "resize" : "attach";
    this.width = o.width, this.height = o.height, this._aspectRatio = this.aspectRatio, Ba(this, r, !0) && (this.notifyPlugins("resize", {
      size: o
    }), ct(a.onResize, [
      this,
      o
    ], this), this.attached && this._doResize(l) && this.render());
  }
  ensureScalesHaveIDs() {
    const s = this.options.scales || {};
    nt(s, (a, n) => {
      a.id = n;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, s = t.scales, a = this.scales, n = Object.keys(a).reduce((o, r) => (o[r] = !1, o), {});
    let i = [];
    s && (i = i.concat(Object.keys(s).map((o) => {
      const r = s[o], l = js(o, r), d = l === "r", h = l === "x";
      return {
        options: r,
        dposition: d ? "chartArea" : h ? "bottom" : "left",
        dtype: d ? "radialLinear" : h ? "category" : "linear"
      };
    }))), nt(i, (o) => {
      const r = o.options, l = r.id, d = js(l, r), h = U(r.type, o.dtype);
      (r.position === void 0 || on(r.position, d) !== on(o.dposition)) && (r.position = o.dposition), n[l] = !0;
      let u = null;
      if (l in a && a[l].type === h)
        u = a[l];
      else {
        const f = Lt.getScale(h);
        u = new f({
          id: l,
          type: h,
          ctx: this.ctx,
          chart: this
        }), a[u.id] = u;
      }
      u.init(r, t);
    }), nt(n, (o, r) => {
      o || delete a[r];
    }), nt(a, (o) => {
      Tt.configure(this, o, o.options), Tt.addBox(this, o);
    });
  }
  _updateMetasets() {
    const t = this._metasets, s = this.data.datasets.length, a = t.length;
    if (t.sort((n, i) => n.index - i.index), a > s) {
      for (let n = s; n < a; ++n)
        this._destroyDatasetMeta(n);
      t.splice(s, a - s);
    }
    this._sortedMetasets = t.slice(0).sort(rn("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: t, data: { datasets: s } } = this;
    t.length > s.length && delete this._stacks, t.forEach((a, n) => {
      s.filter((i) => i === a._dataset).length === 0 && this._destroyDatasetMeta(n);
    });
  }
  buildOrUpdateControllers() {
    const t = [], s = this.data.datasets;
    let a, n;
    for (this._removeUnreferencedMetasets(), a = 0, n = s.length; a < n; a++) {
      const i = s[a];
      let o = this.getDatasetMeta(a);
      const r = i.type || this.config.type;
      if (o.type && o.type !== r && (this._destroyDatasetMeta(a), o = this.getDatasetMeta(a)), o.type = r, o.indexAxis = i.indexAxis || Hs(r, this.options), o.order = i.order || 0, o.index = a, o.label = "" + i.label, o.visible = this.isDatasetVisible(a), o.controller)
        o.controller.updateIndex(a), o.controller.linkScales();
      else {
        const l = Lt.getController(r), { datasetElementType: d, dataElementType: h } = gt.datasets[r];
        Object.assign(l, {
          dataElementType: Lt.getElement(h),
          datasetElementType: d && Lt.getElement(d)
        }), o.controller = new l(this, a), t.push(o.controller);
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
    const a = this._options = s.createResolver(s.chartOptionScopes(), this.getContext()), n = this._animationsDisabled = !a.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
      mode: t,
      cancelable: !0
    }) === !1)
      return;
    const i = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let o = 0;
    for (let d = 0, h = this.data.datasets.length; d < h; d++) {
      const { controller: u } = this.getDatasetMeta(d), f = !n && i.indexOf(u) === -1;
      u.buildOrUpdateElements(f), o = Math.max(+u.getMaxOverflow(), o);
    }
    o = this._minPadding = a.layout.autoPadding ? o : 0, this._updateLayout(o), n || nt(i, (d) => {
      d.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(rn("z", "_idx"));
    const { _active: r, _lastEvent: l } = this;
    l ? this._eventHandler(l, !0) : r.length && this._updateHoverStyles(r, r, !0), this.render();
  }
  _updateScales() {
    nt(this.scales, (t) => {
      Tt.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, s = new Set(Object.keys(this._listeners)), a = new Set(t.events);
    (!va(s, a) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, s = this._getUniformDataChanges() || [];
    for (const { method: a, start: n, count: i } of s) {
      const o = a === "_removeElements" ? -i : i;
      Cc(t, n, o);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const s = this.data.datasets.length, a = (i) => new Set(t.filter((o) => o[0] === i).map((o, r) => r + "," + o.splice(1).join(","))), n = a(0);
    for (let i = 1; i < s; i++)
      if (!va(n, a(i)))
        return;
    return Array.from(n).map((i) => i.split(",")).map((i) => ({
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
    Tt.update(this, this.width, this.height, t);
    const s = this.chartArea, a = s.width <= 0 || s.height <= 0;
    this._layers = [], nt(this.boxes, (n) => {
      a && n.position === "chartArea" || (n.configure && n.configure(), this._layers.push(...n._layers()));
    }, this), this._layers.forEach((n, i) => {
      n._idx = i;
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
        this._updateDataset(s, Xt(t) ? t({
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
    }) !== !1 && (Rt.has(this) ? this.attached && !Rt.running(this) && Rt.start(this) : (this.draw(), ln({
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
    let n, i;
    for (n = 0, i = s.length; n < i; ++n) {
      const o = s[n];
      (!t || o.visible) && a.push(o);
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
    }, n = fi(this, t);
    this.notifyPlugins("beforeDatasetDraw", a) !== !1 && (n && fs(s, n), t.controller.draw(), n && gs(s), a.cancelable = !1, this.notifyPlugins("afterDatasetDraw", a));
  }
  isPointInArea(t) {
    return ze(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, s, a, n) {
    const i = Sl.modes[s];
    return typeof i == "function" ? i(this, t, a, n) : [];
  }
  getDatasetMeta(t) {
    const s = this.data.datasets[t], a = this._metasets;
    let n = a.filter((i) => i && i._dataset === s).pop();
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
    return this.$context || (this.$context = ce(null, {
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
    const n = a ? "show" : "hide", i = this.getDatasetMeta(t), o = i.controller._resolveAnimations(void 0, n);
    Oe(s) ? (i.data[s].hidden = !a, this.update()) : (this.setDatasetVisibility(t, a), o.update(i, {
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
    for (this.stop(), Rt.remove(this), t = 0, s = this.data.datasets.length; t < s; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: s } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), Da(t, s), this.platform.releaseContext(s), this.canvas = null, this.ctx = null), delete ns[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const t = this._listeners, s = this.platform, a = (i, o) => {
      s.addEventListener(this, i, o), t[i] = o;
    }, n = (i, o, r) => {
      i.offsetX = o, i.offsetY = r, this._eventHandler(i);
    };
    nt(this.options.events, (i) => a(i, n));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, s = this.platform, a = (l, d) => {
      s.addEventListener(this, l, d), t[l] = d;
    }, n = (l, d) => {
      t[l] && (s.removeEventListener(this, l, d), delete t[l]);
    }, i = (l, d) => {
      this.canvas && this.resize(l, d);
    };
    let o;
    const r = () => {
      n("attach", r), this.attached = !0, this.resize(), a("resize", i), a("detach", o);
    };
    o = () => {
      this.attached = !1, n("resize", i), this._stop(), this._resize(0, 0), a("attach", r);
    }, s.isAttached(this.canvas) ? r() : o();
  }
  unbindEvents() {
    nt(this._listeners, (t, s) => {
      this.platform.removeEventListener(this, s, t);
    }), this._listeners = {}, nt(this._responsiveListeners, (t, s) => {
      this.platform.removeEventListener(this, s, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, s, a) {
    const n = a ? "set" : "remove";
    let i, o, r, l;
    for (s === "dataset" && (i = this.getDatasetMeta(t[0].datasetIndex), i.controller["_" + n + "DatasetHoverStyle"]()), r = 0, l = t.length; r < l; ++r) {
      o = t[r];
      const d = o && this.getDatasetMeta(o.datasetIndex).controller;
      d && d[n + "HoverStyle"](o.element, o.datasetIndex, o.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const s = this._active || [], a = t.map(({ datasetIndex: i, index: o }) => {
      const r = this.getDatasetMeta(i);
      if (!r)
        throw new Error("No dataset found at index " + i);
      return {
        datasetIndex: i,
        element: r.data[o],
        index: o
      };
    });
    !is(a, s) && (this._active = a, this._lastEvent = null, this._updateHoverStyles(a, s));
  }
  notifyPlugins(t, s, a) {
    return this._plugins.notify(this, t, s, a);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((s) => s.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, s, a) {
    const n = this.options.hover, i = (l, d) => l.filter((h) => !d.some((u) => h.datasetIndex === u.datasetIndex && h.index === u.index)), o = i(s, t), r = a ? t : i(t, s);
    o.length && this.updateHoverStyle(o, n.mode, !1), r.length && n.mode && this.updateHoverStyle(r, n.mode, !0);
  }
  _eventHandler(t, s) {
    const a = {
      event: t,
      replay: s,
      cancelable: !0,
      inChartArea: this.isPointInArea(t)
    }, n = (o) => (o.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", a, n) === !1)
      return;
    const i = this._handleEvent(t, s, a.inChartArea);
    return a.cancelable = !1, this.notifyPlugins("afterEvent", a, n), (i || a.changed) && this.render(), this;
  }
  _handleEvent(t, s, a) {
    const { _active: n = [], options: i } = this, o = s, r = this._getActiveElements(t, n, a, o), l = $o(t), d = $c(t, this._lastEvent, a, l);
    a && (this._lastEvent = null, ct(i.onHover, [
      t,
      r,
      this
    ], this), l && ct(i.onClick, [
      t,
      r,
      this
    ], this));
    const h = !is(r, n);
    return (h || s) && (this._active = r, this._updateHoverStyles(r, n, s)), this._lastEvent = d, h;
  }
  _getActiveElements(t, s, a, n) {
    if (t.type === "mouseout")
      return [];
    if (!a)
      return s;
    const i = this.options.hover;
    return this.getElementsAtEventForMode(t, i.mode, i, n);
  }
};
function dn() {
  return nt(_e.instances, (e) => e._plugins.invalidate());
}
function Dc(e, t, s) {
  const { startAngle: a, x: n, y: i, outerRadius: o, innerRadius: r, options: l } = t, { borderWidth: d, borderJoinStyle: h } = l, u = Math.min(d / o, Dt(a - s));
  if (e.beginPath(), e.arc(n, i, o - d / 2, a + u / 2, s - u / 2), r > 0) {
    const f = Math.min(d / r, Dt(a - s));
    e.arc(n, i, r + d / 2, s - f / 2, a + f / 2, !0);
  } else {
    const f = Math.min(d / 2, o * Dt(a - s));
    if (h === "round")
      e.arc(n, i, f, s - it / 2, a + it / 2, !0);
    else if (h === "bevel") {
      const p = 2 * f * f, g = -p * Math.cos(s + it / 2) + n, b = -p * Math.sin(s + it / 2) + i, m = p * Math.cos(a + it / 2) + n, v = p * Math.sin(a + it / 2) + i;
      e.lineTo(g, b), e.lineTo(m, v);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function Ac(e, t, s) {
  const { startAngle: a, pixelMargin: n, x: i, y: o, outerRadius: r, innerRadius: l } = t;
  let d = n / r;
  e.beginPath(), e.arc(i, o, r, a - d, s + d), l > n ? (d = n / l, e.arc(i, o, l, s + d, a - d, !0)) : e.arc(i, o, n, s + bt, a - bt), e.closePath(), e.clip();
}
function Tc(e) {
  return ta(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function Bc(e, t, s, a) {
  const n = Tc(e.options.borderRadius), i = (s - t) / 2, o = Math.min(i, a * t / 2), r = (l) => {
    const d = (s - Math.min(i, l)) * a / 2;
    return _t(l, 0, Math.min(i, d));
  };
  return {
    outerStart: r(n.outerStart),
    outerEnd: r(n.outerEnd),
    innerStart: _t(n.innerStart, 0, o),
    innerEnd: _t(n.innerEnd, 0, o)
  };
}
function ue(e, t, s, a) {
  return {
    x: s + e * Math.cos(t),
    y: a + e * Math.sin(t)
  };
}
function hs(e, t, s, a, n, i) {
  const { x: o, y: r, startAngle: l, pixelMargin: d, innerRadius: h } = t, u = Math.max(t.outerRadius + a + s - d, 0), f = h > 0 ? h + a + s + d : 0;
  let p = 0;
  const g = n - l;
  if (a) {
    const R = h > 0 ? h - a : 0, q = u > 0 ? u - a : 0, st = (R + q) / 2, H = st !== 0 ? g * st / (st + a) : g;
    p = (g - H) / 2;
  }
  const b = Math.max(1e-3, g * u - s / it) / u, m = (g - b) / 2, v = l + m + p, _ = n - m - p, { outerStart: k, outerEnd: S, innerStart: M, innerEnd: C } = Bc(t, f, u, _ - v), $ = u - k, A = u - S, E = v + k / $, L = _ - S / A, D = f + M, B = f + C, O = v + M / D, P = _ - C / B;
  if (e.beginPath(), i) {
    const R = (E + L) / 2;
    if (e.arc(o, r, u, E, R), e.arc(o, r, u, R, L), S > 0) {
      const W = ue(A, L, o, r);
      e.arc(W.x, W.y, S, L, _ + bt);
    }
    const q = ue(B, _, o, r);
    if (e.lineTo(q.x, q.y), C > 0) {
      const W = ue(B, P, o, r);
      e.arc(W.x, W.y, C, _ + bt, P + Math.PI);
    }
    const st = (_ - C / f + (v + M / f)) / 2;
    if (e.arc(o, r, f, _ - C / f, st, !0), e.arc(o, r, f, st, v + M / f, !0), M > 0) {
      const W = ue(D, O, o, r);
      e.arc(W.x, W.y, M, O + Math.PI, v - bt);
    }
    const H = ue($, v, o, r);
    if (e.lineTo(H.x, H.y), k > 0) {
      const W = ue($, E, o, r);
      e.arc(W.x, W.y, k, v - bt, E);
    }
  } else {
    e.moveTo(o, r);
    const R = Math.cos(E) * u + o, q = Math.sin(E) * u + r;
    e.lineTo(R, q);
    const st = Math.cos(L) * u + o, H = Math.sin(L) * u + r;
    e.lineTo(st, H);
  }
  e.closePath();
}
function Fc(e, t, s, a, n) {
  const { fullCircles: i, startAngle: o, circumference: r } = t;
  let l = t.endAngle;
  if (i) {
    hs(e, t, s, a, l, n);
    for (let d = 0; d < i; ++d)
      e.fill();
    isNaN(r) || (l = o + (r % ht || ht));
  }
  return hs(e, t, s, a, l, n), e.fill(), l;
}
function Pc(e, t, s, a, n) {
  const { fullCircles: i, startAngle: o, circumference: r, options: l } = t, { borderWidth: d, borderJoinStyle: h, borderDash: u, borderDashOffset: f, borderRadius: p } = l, g = l.borderAlign === "inner";
  if (!d)
    return;
  e.setLineDash(u || []), e.lineDashOffset = f, g ? (e.lineWidth = d * 2, e.lineJoin = h || "round") : (e.lineWidth = d, e.lineJoin = h || "bevel");
  let b = t.endAngle;
  if (i) {
    hs(e, t, s, a, b, n);
    for (let m = 0; m < i; ++m)
      e.stroke();
    isNaN(r) || (b = o + (r % ht || ht));
  }
  g && Ac(e, t, b), l.selfJoin && b - o >= it && p === 0 && h !== "miter" && Dc(e, t, b), i || (hs(e, t, s, a, b, n), e.stroke());
}
class Lc extends jt {
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
    ], a), { angle: i, distance: o } = Xn(n, {
      x: t,
      y: s
    }), { startAngle: r, endAngle: l, innerRadius: d, outerRadius: h, circumference: u } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], a), f = (this.options.spacing + this.options.borderWidth) / 2, p = U(u, l - r), g = Ie(i, r, l) && r !== l, b = p >= ht || g, m = Nt(o, d + f, h + f);
    return b && m;
  }
  getCenterPoint(t) {
    const { x: s, y: a, startAngle: n, endAngle: i, innerRadius: o, outerRadius: r } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], t), { offset: l, spacing: d } = this.options, h = (n + i) / 2, u = (o + r + d + l) / 2;
    return {
      x: s + Math.cos(h) * u,
      y: a + Math.sin(h) * u
    };
  }
  tooltipPosition(t) {
    return this.getCenterPoint(t);
  }
  draw(t) {
    const { options: s, circumference: a } = this, n = (s.offset || 0) / 4, i = (s.spacing || 0) / 2, o = s.circular;
    if (this.pixelMargin = s.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = a > ht ? Math.floor(a / ht) : 0, a === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const r = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(r) * n, Math.sin(r) * n);
    const l = 1 - Math.sin(Math.min(it, a || 0)), d = n * l;
    t.fillStyle = s.backgroundColor, t.strokeStyle = s.borderColor, Fc(t, this, d, i, o), Pc(t, this, d, i, o), t.restore();
  }
}
function Ci(e, t, s = t) {
  e.lineCap = U(s.borderCapStyle, t.borderCapStyle), e.setLineDash(U(s.borderDash, t.borderDash)), e.lineDashOffset = U(s.borderDashOffset, t.borderDashOffset), e.lineJoin = U(s.borderJoinStyle, t.borderJoinStyle), e.lineWidth = U(s.borderWidth, t.borderWidth), e.strokeStyle = U(s.borderColor, t.borderColor);
}
function Ec(e, t, s) {
  e.lineTo(s.x, s.y);
}
function Oc(e) {
  return e.stepped ? tr : e.tension || e.cubicInterpolationMode === "monotone" ? er : Ec;
}
function $i(e, t, s = {}) {
  const a = e.length, { start: n = 0, end: i = a - 1 } = s, { start: o, end: r } = t, l = Math.max(n, o), d = Math.min(i, r), h = n < o && i < o || n > r && i > r;
  return {
    count: a,
    start: l,
    loop: t.loop,
    ilen: d < l && !h ? a + d - l : d - l
  };
}
function Rc(e, t, s, a) {
  const { points: n, options: i } = t, { count: o, start: r, loop: l, ilen: d } = $i(n, s, a), h = Oc(i);
  let { move: u = !0, reverse: f } = a || {}, p, g, b;
  for (p = 0; p <= d; ++p)
    g = n[(r + (f ? d - p : p)) % o], !g.skip && (u ? (e.moveTo(g.x, g.y), u = !1) : h(e, b, g, f, i.stepped), b = g);
  return l && (g = n[(r + (f ? d : 0)) % o], h(e, b, g, f, i.stepped)), !!l;
}
function Ic(e, t, s, a) {
  const n = t.points, { count: i, start: o, ilen: r } = $i(n, s, a), { move: l = !0, reverse: d } = a || {};
  let h = 0, u = 0, f, p, g, b, m, v;
  const _ = (S) => (o + (d ? r - S : S)) % i, k = () => {
    b !== m && (e.lineTo(h, m), e.lineTo(h, b), e.lineTo(h, v));
  };
  for (l && (p = n[_(0)], e.moveTo(p.x, p.y)), f = 0; f <= r; ++f) {
    if (p = n[_(f)], p.skip)
      continue;
    const S = p.x, M = p.y, C = S | 0;
    C === g ? (M < b ? b = M : M > m && (m = M), h = (u * h + S) / ++u) : (k(), e.lineTo(S, M), g = C, u = 0, b = m = M), v = M;
  }
  k();
}
function Vs(e) {
  const t = e.options, s = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !s ? Ic : Rc;
}
function zc(e) {
  return e.stepped ? Pr : e.tension || e.cubicInterpolationMode === "monotone" ? Lr : ae;
}
function Wc(e, t, s, a) {
  let n = t._path;
  n || (n = t._path = new Path2D(), t.path(n, s, a) && n.closePath()), Ci(e, t.options), e.stroke(n);
}
function Nc(e, t, s, a) {
  const { segments: n, options: i } = t, o = Vs(t);
  for (const r of n)
    Ci(e, i, r.style), e.beginPath(), o(e, t, r, {
      start: s,
      end: s + a - 1
    }) && e.closePath(), e.stroke();
}
const Hc = typeof Path2D == "function";
function jc(e, t, s, a) {
  Hc && !t.options.segment ? Wc(e, t, s, a) : Nc(e, t, s, a);
}
class vs extends jt {
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
      wr(this._points, a, t, n, s), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = Wr(this, this.options.segment));
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
    const a = this.options, n = t[s], i = this.points, o = ui(this, {
      property: s,
      start: n,
      end: n
    });
    if (!o.length)
      return;
    const r = [], l = zc(a);
    let d, h;
    for (d = 0, h = o.length; d < h; ++d) {
      const { start: u, end: f } = o[d], p = i[u], g = i[f];
      if (p === g) {
        r.push(p);
        continue;
      }
      const b = Math.abs((n - p[s]) / (g[s] - p[s])), m = l(p, g, b, a.stepped);
      m[s] = t[s], r.push(m);
    }
    return r.length === 1 ? r[0] : r;
  }
  pathSegment(t, s, a) {
    return Vs(this)(t, this, s, a);
  }
  path(t, s, a) {
    const n = this.segments, i = Vs(this);
    let o = this._loop;
    s = s || 0, a = a || this.points.length - s;
    for (const r of n)
      o &= i(t, this, r, {
        start: s,
        end: s + a - 1
      });
    return !!o;
  }
  draw(t, s, a, n) {
    const i = this.options || {};
    (this.points || []).length && i.borderWidth && (t.save(), jc(t, this, a, n), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function hn(e, t, s, a) {
  const n = e.options, { [s]: i } = e.getProps([
    s
  ], a);
  return Math.abs(t - i) < n.radius + n.hitRadius;
}
class Vc extends jt {
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
    const n = this.options, { x: i, y: o } = this.getProps([
      "x",
      "y"
    ], a);
    return Math.pow(t - i, 2) + Math.pow(s - o, 2) < Math.pow(n.hitRadius + n.radius, 2);
  }
  inXRange(t, s) {
    return hn(this, t, "x", s);
  }
  inYRange(t, s) {
    return hn(this, t, "y", s);
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
    this.skip || a.radius < 0.1 || !ze(this, s, this.size(a) / 2) || (t.strokeStyle = a.borderColor, t.lineWidth = a.borderWidth, t.fillStyle = a.backgroundColor, Ns(t, a, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function Di(e, t) {
  const { x: s, y: a, base: n, width: i, height: o } = e.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let r, l, d, h, u;
  return e.horizontal ? (u = o / 2, r = Math.min(s, n), l = Math.max(s, n), d = a - u, h = a + u) : (u = i / 2, r = s - u, l = s + u, d = Math.min(a, n), h = Math.max(a, n)), {
    left: r,
    top: d,
    right: l,
    bottom: h
  };
}
function Ut(e, t, s, a) {
  return e ? 0 : _t(t, s, a);
}
function Yc(e, t, s) {
  const a = e.options.borderWidth, n = e.borderSkipped, i = si(a);
  return {
    t: Ut(n.top, i.top, 0, s),
    r: Ut(n.right, i.right, 0, t),
    b: Ut(n.bottom, i.bottom, 0, s),
    l: Ut(n.left, i.left, 0, t)
  };
}
function qc(e, t, s) {
  const { enableBorderRadius: a } = e.getProps([
    "enableBorderRadius"
  ]), n = e.options.borderRadius, i = ge(n), o = Math.min(t, s), r = e.borderSkipped, l = a || X(n);
  return {
    topLeft: Ut(!l || r.top || r.left, i.topLeft, 0, o),
    topRight: Ut(!l || r.top || r.right, i.topRight, 0, o),
    bottomLeft: Ut(!l || r.bottom || r.left, i.bottomLeft, 0, o),
    bottomRight: Ut(!l || r.bottom || r.right, i.bottomRight, 0, o)
  };
}
function Uc(e) {
  const t = Di(e), s = t.right - t.left, a = t.bottom - t.top, n = Yc(e, s / 2, a / 2), i = qc(e, s / 2, a / 2);
  return {
    outer: {
      x: t.left,
      y: t.top,
      w: s,
      h: a,
      radius: i
    },
    inner: {
      x: t.left + n.l,
      y: t.top + n.t,
      w: s - n.l - n.r,
      h: a - n.t - n.b,
      radius: {
        topLeft: Math.max(0, i.topLeft - Math.max(n.t, n.l)),
        topRight: Math.max(0, i.topRight - Math.max(n.t, n.r)),
        bottomLeft: Math.max(0, i.bottomLeft - Math.max(n.b, n.l)),
        bottomRight: Math.max(0, i.bottomRight - Math.max(n.b, n.r))
      }
    }
  };
}
function Fs(e, t, s, a) {
  const n = t === null, i = s === null, r = e && !(n && i) && Di(e, a);
  return r && (n || Nt(t, r.left, r.right)) && (i || Nt(s, r.top, r.bottom));
}
function Kc(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function Xc(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function Ps(e, t, s = {}) {
  const a = e.x !== s.x ? -t : 0, n = e.y !== s.y ? -t : 0, i = (e.x + e.w !== s.x + s.w ? t : 0) - a, o = (e.y + e.h !== s.y + s.h ? t : 0) - n;
  return {
    x: e.x + a,
    y: e.y + n,
    w: e.w + i,
    h: e.h + o,
    radius: e.radius
  };
}
class Gc extends jt {
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
    const { inflateAmount: s, options: { borderColor: a, backgroundColor: n } } = this, { inner: i, outer: o } = Uc(this), r = Kc(o.radius) ? ls : Xc;
    t.save(), (o.w !== i.w || o.h !== i.h) && (t.beginPath(), r(t, Ps(o, s, i)), t.clip(), r(t, Ps(i, -s, o)), t.fillStyle = a, t.fill("evenodd")), t.beginPath(), r(t, Ps(i, s)), t.fillStyle = n, t.fill(), t.restore();
  }
  inRange(t, s, a) {
    return Fs(this, t, s, a);
  }
  inXRange(t, s) {
    return Fs(this, t, null, s);
  }
  inYRange(t, s) {
    return Fs(this, null, t, s);
  }
  getCenterPoint(t) {
    const { x: s, y: a, base: n, horizontal: i } = this.getProps([
      "x",
      "y",
      "base",
      "horizontal"
    ], t);
    return {
      x: i ? (s + n) / 2 : s,
      y: i ? a : (a + n) / 2
    };
  }
  getRange(t) {
    return t === "x" ? this.width / 2 : this.height / 2;
  }
}
function Zc(e, t, s) {
  const a = e.segments, n = e.points, i = t.points, o = [];
  for (const r of a) {
    let { start: l, end: d } = r;
    d = _s(l, d, n);
    const h = Ys(s, n[l], n[d], r.loop);
    if (!t.segments) {
      o.push({
        source: r,
        target: h,
        start: n[l],
        end: n[d]
      });
      continue;
    }
    const u = ui(t, h);
    for (const f of u) {
      const p = Ys(s, i[f.start], i[f.end], f.loop), g = hi(r, n, p);
      for (const b of g)
        o.push({
          source: b,
          target: f,
          start: {
            [s]: un(h, p, "start", Math.max)
          },
          end: {
            [s]: un(h, p, "end", Math.min)
          }
        });
    }
  }
  return o;
}
function Ys(e, t, s, a) {
  if (a)
    return;
  let n = t[e], i = s[e];
  return e === "angle" && (n = Dt(n), i = Dt(i)), {
    property: e,
    start: n,
    end: i
  };
}
function Qc(e, t) {
  const { x: s = null, y: a = null } = e || {}, n = t.points, i = [];
  return t.segments.forEach(({ start: o, end: r }) => {
    r = _s(o, r, n);
    const l = n[o], d = n[r];
    a !== null ? (i.push({
      x: l.x,
      y: a
    }), i.push({
      x: d.x,
      y: a
    })) : s !== null && (i.push({
      x: s,
      y: l.y
    }), i.push({
      x: s,
      y: d.y
    }));
  }), i;
}
function _s(e, t, s) {
  for (; t > e; t--) {
    const a = s[t];
    if (!isNaN(a.x) && !isNaN(a.y))
      break;
  }
  return t;
}
function un(e, t, s, a) {
  return e && t ? a(e[s], t[s]) : e ? e[s] : t ? t[s] : 0;
}
function Ai(e, t) {
  let s = [], a = !1;
  return pt(e) ? (a = !0, s = e) : s = Qc(e, t), s.length ? new vs({
    points: s,
    options: {
      tension: 0
    },
    _loop: a,
    _fullLoop: a
  }) : null;
}
function fn(e) {
  return e && e.fill !== !1;
}
function Jc(e, t, s) {
  let n = e[t].fill;
  const i = [
    t
  ];
  let o;
  if (!s)
    return n;
  for (; n !== !1 && i.indexOf(n) === -1; ) {
    if (!kt(n))
      return n;
    if (o = e[n], !o)
      return !1;
    if (o.visible)
      return n;
    i.push(n), n = o.fill;
  }
  return !1;
}
function td(e, t, s) {
  const a = nd(e);
  if (X(a))
    return isNaN(a.value) ? !1 : a;
  let n = parseFloat(a);
  return kt(n) && Math.floor(n) === n ? ed(a[0], t, n, s) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(a) >= 0 && a;
}
function ed(e, t, s, a) {
  return (e === "-" || e === "+") && (s = t + s), s === t || s < 0 || s >= a ? !1 : s;
}
function sd(e, t) {
  let s = null;
  return e === "start" ? s = t.bottom : e === "end" ? s = t.top : X(e) ? s = t.getPixelForValue(e.value) : t.getBasePixel && (s = t.getBasePixel()), s;
}
function ad(e, t, s) {
  let a;
  return e === "start" ? a = s : e === "end" ? a = t.options.reverse ? t.min : t.max : X(e) ? a = e.value : a = t.getBaseValue(), a;
}
function nd(e) {
  const t = e.options, s = t.fill;
  let a = U(s && s.target, s);
  return a === void 0 && (a = !!t.backgroundColor), a === !1 || a === null ? !1 : a === !0 ? "origin" : a;
}
function id(e) {
  const { scale: t, index: s, line: a } = e, n = [], i = a.segments, o = a.points, r = od(t, s);
  r.push(Ai({
    x: null,
    y: t.bottom
  }, a));
  for (let l = 0; l < i.length; l++) {
    const d = i[l];
    for (let h = d.start; h <= d.end; h++)
      rd(n, o[h], r);
  }
  return new vs({
    points: n,
    options: {}
  });
}
function od(e, t) {
  const s = [], a = e.getMatchingVisibleMetas("line");
  for (let n = 0; n < a.length; n++) {
    const i = a[n];
    if (i.index === t)
      break;
    i.hidden || s.unshift(i.dataset);
  }
  return s;
}
function rd(e, t, s) {
  const a = [];
  for (let n = 0; n < s.length; n++) {
    const i = s[n], { first: o, last: r, point: l } = ld(i, t, "x");
    if (!(!l || o && r)) {
      if (o)
        a.unshift(l);
      else if (e.push(l), !r)
        break;
    }
  }
  e.push(...a);
}
function ld(e, t, s) {
  const a = e.interpolate(t, s);
  if (!a)
    return {};
  const n = a[s], i = e.segments, o = e.points;
  let r = !1, l = !1;
  for (let d = 0; d < i.length; d++) {
    const h = i[d], u = o[h.start][s], f = o[h.end][s];
    if (Nt(n, u, f)) {
      r = n === u, l = n === f;
      break;
    }
  }
  return {
    first: r,
    last: l,
    point: a
  };
}
class Ti {
  constructor(t) {
    this.x = t.x, this.y = t.y, this.radius = t.radius;
  }
  pathSegment(t, s, a) {
    const { x: n, y: i, radius: o } = this;
    return s = s || {
      start: 0,
      end: ht
    }, t.arc(n, i, o, s.end, s.start, !0), !a.bounds;
  }
  interpolate(t) {
    const { x: s, y: a, radius: n } = this, i = t.angle;
    return {
      x: s + Math.cos(i) * n,
      y: a + Math.sin(i) * n,
      angle: i
    };
  }
}
function cd(e) {
  const { chart: t, fill: s, line: a } = e;
  if (kt(s))
    return dd(t, s);
  if (s === "stack")
    return id(e);
  if (s === "shape")
    return !0;
  const n = hd(e);
  return n instanceof Ti ? n : Ai(n, a);
}
function dd(e, t) {
  const s = e.getDatasetMeta(t);
  return s && e.isDatasetVisible(t) ? s.dataset : null;
}
function hd(e) {
  return (e.scale || {}).getPointPositionForValue ? fd(e) : ud(e);
}
function ud(e) {
  const { scale: t = {}, fill: s } = e, a = sd(s, t);
  if (kt(a)) {
    const n = t.isHorizontal();
    return {
      x: n ? a : null,
      y: n ? null : a
    };
  }
  return null;
}
function fd(e) {
  const { scale: t, fill: s } = e, a = t.options, n = t.getLabels().length, i = a.reverse ? t.max : t.min, o = ad(s, t, i), r = [];
  if (a.grid.circular) {
    const l = t.getPointPositionForValue(0, i);
    return new Ti({
      x: l.x,
      y: l.y,
      radius: t.getDistanceFromCenterForValue(o)
    });
  }
  for (let l = 0; l < n; ++l)
    r.push(t.getPointPositionForValue(l, o));
  return r;
}
function Ls(e, t, s) {
  const a = cd(t), { chart: n, index: i, line: o, scale: r, axis: l } = t, d = o.options, h = d.fill, u = d.backgroundColor, { above: f = u, below: p = u } = h || {}, g = n.getDatasetMeta(i), b = fi(n, g);
  a && o.points.length && (fs(e, s), gd(e, {
    line: o,
    target: a,
    above: f,
    below: p,
    area: s,
    scale: r,
    axis: l,
    clip: b
  }), gs(e));
}
function gd(e, t) {
  const { line: s, target: a, above: n, below: i, area: o, scale: r, clip: l } = t, d = s._loop ? "angle" : t.axis;
  e.save();
  let h = i;
  i !== n && (d === "x" ? (gn(e, a, o.top), Es(e, {
    line: s,
    target: a,
    color: n,
    scale: r,
    property: d,
    clip: l
  }), e.restore(), e.save(), gn(e, a, o.bottom)) : d === "y" && (pn(e, a, o.left), Es(e, {
    line: s,
    target: a,
    color: i,
    scale: r,
    property: d,
    clip: l
  }), e.restore(), e.save(), pn(e, a, o.right), h = n)), Es(e, {
    line: s,
    target: a,
    color: h,
    scale: r,
    property: d,
    clip: l
  }), e.restore();
}
function gn(e, t, s) {
  const { segments: a, points: n } = t;
  let i = !0, o = !1;
  e.beginPath();
  for (const r of a) {
    const { start: l, end: d } = r, h = n[l], u = n[_s(l, d, n)];
    i ? (e.moveTo(h.x, h.y), i = !1) : (e.lineTo(h.x, s), e.lineTo(h.x, h.y)), o = !!t.pathSegment(e, r, {
      move: o
    }), o ? e.closePath() : e.lineTo(u.x, s);
  }
  e.lineTo(t.first().x, s), e.closePath(), e.clip();
}
function pn(e, t, s) {
  const { segments: a, points: n } = t;
  let i = !0, o = !1;
  e.beginPath();
  for (const r of a) {
    const { start: l, end: d } = r, h = n[l], u = n[_s(l, d, n)];
    i ? (e.moveTo(h.x, h.y), i = !1) : (e.lineTo(s, h.y), e.lineTo(h.x, h.y)), o = !!t.pathSegment(e, r, {
      move: o
    }), o ? e.closePath() : e.lineTo(s, u.y);
  }
  e.lineTo(s, t.first().y), e.closePath(), e.clip();
}
function Es(e, t) {
  const { line: s, target: a, property: n, color: i, scale: o, clip: r } = t, l = Zc(s, a, n);
  for (const { source: d, target: h, start: u, end: f } of l) {
    const { style: { backgroundColor: p = i } = {} } = d, g = a !== !0;
    e.save(), e.fillStyle = p, pd(e, o, r, g && Ys(n, u, f)), e.beginPath();
    const b = !!s.pathSegment(e, d);
    let m;
    if (g) {
      b ? e.closePath() : bn(e, a, f, n);
      const v = !!a.pathSegment(e, h, {
        move: b,
        reverse: !0
      });
      m = b && v, m || bn(e, a, u, n);
    }
    e.closePath(), e.fill(m ? "evenodd" : "nonzero"), e.restore();
  }
}
function pd(e, t, s, a) {
  const n = t.chart.chartArea, { property: i, start: o, end: r } = a || {};
  if (i === "x" || i === "y") {
    let l, d, h, u;
    i === "x" ? (l = o, d = n.top, h = r, u = n.bottom) : (l = n.left, d = o, h = n.right, u = r), e.beginPath(), s && (l = Math.max(l, s.left), h = Math.min(h, s.right), d = Math.max(d, s.top), u = Math.min(u, s.bottom)), e.rect(l, d, h - l, u - d), e.clip();
  }
}
function bn(e, t, s, a) {
  const n = t.interpolate(s, a);
  n && e.lineTo(n.x, n.y);
}
var bd = {
  id: "filler",
  afterDatasetsUpdate(e, t, s) {
    const a = (e.data.datasets || []).length, n = [];
    let i, o, r, l;
    for (o = 0; o < a; ++o)
      i = e.getDatasetMeta(o), r = i.dataset, l = null, r && r.options && r instanceof vs && (l = {
        visible: e.isDatasetVisible(o),
        index: o,
        fill: td(r, o, a),
        chart: e,
        axis: i.controller.options.indexAxis,
        scale: i.vScale,
        line: r
      }), i.$filler = l, n.push(l);
    for (o = 0; o < a; ++o)
      l = n[o], !(!l || l.fill === !1) && (l.fill = Jc(n, o, s.propagate));
  },
  beforeDraw(e, t, s) {
    const a = s.drawTime === "beforeDraw", n = e.getSortedVisibleDatasetMetas(), i = e.chartArea;
    for (let o = n.length - 1; o >= 0; --o) {
      const r = n[o].$filler;
      r && (r.line.updateControlPoints(i, r.axis), a && r.fill && Ls(e.ctx, r, i));
    }
  },
  beforeDatasetsDraw(e, t, s) {
    if (s.drawTime !== "beforeDatasetsDraw")
      return;
    const a = e.getSortedVisibleDatasetMetas();
    for (let n = a.length - 1; n >= 0; --n) {
      const i = a[n].$filler;
      fn(i) && Ls(e.ctx, i, e.chartArea);
    }
  },
  beforeDatasetDraw(e, t, s) {
    const a = t.meta.$filler;
    !fn(a) || s.drawTime !== "beforeDatasetDraw" || Ls(e.ctx, a, e.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const mn = (e, t) => {
  let { boxHeight: s = t, boxWidth: a = t } = e;
  return e.usePointStyle && (s = Math.min(s, t), a = e.pointStyleWidth || Math.min(a, t)), {
    boxWidth: a,
    boxHeight: s,
    itemHeight: Math.max(t, s)
  };
}, md = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class vn extends jt {
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
    let s = ct(t.generateLabels, [
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
    const a = t.labels, n = yt(a.font), i = n.size, o = this._computeTitleHeight(), { boxWidth: r, itemHeight: l } = mn(a, i);
    let d, h;
    s.font = n.string, this.isHorizontal() ? (d = this.maxWidth, h = this._fitRows(o, i, r, l) + 10) : (h = this.maxHeight, d = this._fitCols(o, n, r, l) + 10), this.width = Math.min(d, t.maxWidth || this.maxWidth), this.height = Math.min(h, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, s, a, n) {
    const { ctx: i, maxWidth: o, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], d = this.lineWidths = [
      0
    ], h = n + r;
    let u = t;
    i.textAlign = "left", i.textBaseline = "middle";
    let f = -1, p = -h;
    return this.legendItems.forEach((g, b) => {
      const m = a + s / 2 + i.measureText(g.text).width;
      (b === 0 || d[d.length - 1] + m + 2 * r > o) && (u += h, d[d.length - (b > 0 ? 0 : 1)] = 0, p += h, f++), l[b] = {
        left: 0,
        top: p,
        row: f,
        width: m,
        height: n
      }, d[d.length - 1] += m + r;
    }), u;
  }
  _fitCols(t, s, a, n) {
    const { ctx: i, maxHeight: o, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], d = this.columnSizes = [], h = o - t;
    let u = r, f = 0, p = 0, g = 0, b = 0;
    return this.legendItems.forEach((m, v) => {
      const { itemWidth: _, itemHeight: k } = vd(a, s, i, m, n);
      v > 0 && p + k + 2 * r > h && (u += f + r, d.push({
        width: f,
        height: p
      }), g += f + r, b++, f = p = 0), l[v] = {
        left: g,
        top: p,
        col: b,
        width: _,
        height: k
      }, f = Math.max(f, _), p += k + r;
    }), u += f, d.push({
      width: f,
      height: p
    }), u;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: s, options: { align: a, labels: { padding: n }, rtl: i } } = this, o = pe(i, this.left, this.width);
    if (this.isHorizontal()) {
      let r = 0, l = vt(a, this.left + n, this.right - this.lineWidths[r]);
      for (const d of s)
        r !== d.row && (r = d.row, l = vt(a, this.left + n, this.right - this.lineWidths[r])), d.top += this.top + t + n, d.left = o.leftForLtr(o.x(l), d.width), l += d.width + n;
    } else {
      let r = 0, l = vt(a, this.top + t + n, this.bottom - this.columnSizes[r].height);
      for (const d of s)
        d.col !== r && (r = d.col, l = vt(a, this.top + t + n, this.bottom - this.columnSizes[r].height)), d.top = l, d.left += this.left + n, d.left = o.leftForLtr(o.x(d.left), d.width), l += d.height + n;
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
    const { options: t, columnSizes: s, lineWidths: a, ctx: n } = this, { align: i, labels: o } = t, r = gt.color, l = pe(t.rtl, this.left, this.width), d = yt(o.font), { padding: h } = o, u = d.size, f = u / 2;
    let p;
    this.drawTitle(), n.textAlign = l.textAlign("left"), n.textBaseline = "middle", n.lineWidth = 0.5, n.font = d.string;
    const { boxWidth: g, boxHeight: b, itemHeight: m } = mn(o, u), v = function(C, $, A) {
      if (isNaN(g) || g <= 0 || isNaN(b) || b < 0)
        return;
      n.save();
      const E = U(A.lineWidth, 1);
      if (n.fillStyle = U(A.fillStyle, r), n.lineCap = U(A.lineCap, "butt"), n.lineDashOffset = U(A.lineDashOffset, 0), n.lineJoin = U(A.lineJoin, "miter"), n.lineWidth = E, n.strokeStyle = U(A.strokeStyle, r), n.setLineDash(U(A.lineDash, [])), o.usePointStyle) {
        const L = {
          radius: b * Math.SQRT2 / 2,
          pointStyle: A.pointStyle,
          rotation: A.rotation,
          borderWidth: E
        }, D = l.xPlus(C, g / 2), B = $ + f;
        ei(n, L, D, B, o.pointStyleWidth && g);
      } else {
        const L = $ + Math.max((u - b) / 2, 0), D = l.leftForLtr(C, g), B = ge(A.borderRadius);
        n.beginPath(), Object.values(B).some((O) => O !== 0) ? ls(n, {
          x: D,
          y: L,
          w: g,
          h: b,
          radius: B
        }) : n.rect(D, L, g, b), n.fill(), E !== 0 && n.stroke();
      }
      n.restore();
    }, _ = function(C, $, A) {
      We(n, A.text, C, $ + m / 2, d, {
        strikethrough: A.hidden,
        textAlign: l.textAlign(A.textAlign)
      });
    }, k = this.isHorizontal(), S = this._computeTitleHeight();
    k ? p = {
      x: vt(i, this.left + h, this.right - a[0]),
      y: this.top + h + S,
      line: 0
    } : p = {
      x: this.left + h,
      y: vt(i, this.top + S + h, this.bottom - s[0].height),
      line: 0
    }, li(this.ctx, t.textDirection);
    const M = m + h;
    this.legendItems.forEach((C, $) => {
      n.strokeStyle = C.fontColor, n.fillStyle = C.fontColor;
      const A = n.measureText(C.text).width, E = l.textAlign(C.textAlign || (C.textAlign = o.textAlign)), L = g + f + A;
      let D = p.x, B = p.y;
      l.setWidth(this.width), k ? $ > 0 && D + L + h > this.right && (B = p.y += M, p.line++, D = p.x = vt(i, this.left + h, this.right - a[p.line])) : $ > 0 && B + M > this.bottom && (D = p.x = D + s[p.line].width + h, p.line++, B = p.y = vt(i, this.top + S + h, this.bottom - s[p.line].height));
      const O = l.x(D);
      if (v(O, B, C), D = No(E, D + g + f, k ? D + L : this.right, t.rtl), _(l.x(D), B, C), k)
        p.x += L + h;
      else if (typeof C.text != "string") {
        const P = d.lineHeight;
        p.y += Bi(C, P) + h;
      } else
        p.y += M;
    }), ci(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, s = t.title, a = yt(s.font), n = Bt(s.padding);
    if (!s.display)
      return;
    const i = pe(t.rtl, this.left, this.width), o = this.ctx, r = s.position, l = a.size / 2, d = n.top + l;
    let h, u = this.left, f = this.width;
    if (this.isHorizontal())
      f = Math.max(...this.lineWidths), h = this.top + d, u = vt(t.align, u, this.right - f);
    else {
      const g = this.columnSizes.reduce((b, m) => Math.max(b, m.height), 0);
      h = d + vt(t.align, this.top, this.bottom - g - t.labels.padding - this._computeTitleHeight());
    }
    const p = vt(r, u, u + f);
    o.textAlign = i.textAlign(Zs(r)), o.textBaseline = "middle", o.strokeStyle = s.color, o.fillStyle = s.color, o.font = a.string, We(o, s.text, p, h, a);
  }
  _computeTitleHeight() {
    const t = this.options.title, s = yt(t.font), a = Bt(t.padding);
    return t.display ? s.lineHeight + a.height : 0;
  }
  _getLegendItemAt(t, s) {
    let a, n, i;
    if (Nt(t, this.left, this.right) && Nt(s, this.top, this.bottom)) {
      for (i = this.legendHitBoxes, a = 0; a < i.length; ++a)
        if (n = i[a], Nt(t, n.left, n.left + n.width) && Nt(s, n.top, n.top + n.height))
          return this.legendItems[a];
    }
    return null;
  }
  handleEvent(t) {
    const s = this.options;
    if (!xd(t.type, s))
      return;
    const a = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const n = this._hoveredItem, i = md(n, a);
      n && !i && ct(s.onLeave, [
        t,
        n,
        this
      ], this), this._hoveredItem = a, a && !i && ct(s.onHover, [
        t,
        a,
        this
      ], this);
    } else a && ct(s.onClick, [
      t,
      a,
      this
    ], this);
  }
}
function vd(e, t, s, a, n) {
  const i = _d(a, e, t, s), o = yd(n, a, t.lineHeight);
  return {
    itemWidth: i,
    itemHeight: o
  };
}
function _d(e, t, s, a) {
  let n = e.text;
  return n && typeof n != "string" && (n = n.reduce((i, o) => i.length > o.length ? i : o)), t + s.size / 2 + a.measureText(n).width;
}
function yd(e, t, s) {
  let a = e;
  return typeof t.text != "string" && (a = Bi(t, s)), a;
}
function Bi(e, t) {
  const s = e.text ? e.text.length : 0;
  return t * s;
}
function xd(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var ra = {
  id: "legend",
  _element: vn,
  start(e, t, s) {
    const a = e.legend = new vn({
      ctx: e.ctx,
      options: s,
      chart: e
    });
    Tt.configure(e, a, s), Tt.addBox(e, a);
  },
  stop(e) {
    Tt.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, s) {
    const a = e.legend;
    Tt.configure(e, a, s), a.options = s;
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
        const t = e.data.datasets, { labels: { usePointStyle: s, pointStyle: a, textAlign: n, color: i, useBorderRadius: o, borderRadius: r } } = e.legend.options;
        return e._getSortedDatasetMetas().map((l) => {
          const d = l.controller.getStyle(s ? 0 : void 0), h = Bt(d.borderWidth);
          return {
            text: t[l.index].label,
            fillStyle: d.backgroundColor,
            fontColor: i,
            hidden: !l.visible,
            lineCap: d.borderCapStyle,
            lineDash: d.borderDash,
            lineDashOffset: d.borderDashOffset,
            lineJoin: d.borderJoinStyle,
            lineWidth: (h.width + h.height) / 4,
            strokeStyle: d.borderColor,
            pointStyle: a || d.pointStyle,
            rotation: d.rotation,
            textAlign: n || d.textAlign,
            borderRadius: o && (r || d.borderRadius),
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
class Fi extends jt {
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
    const n = pt(a.text) ? a.text.length : 1;
    this._padding = Bt(a.padding);
    const i = n * yt(a.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = i : this.width = i;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: s, left: a, bottom: n, right: i, options: o } = this, r = o.align;
    let l = 0, d, h, u;
    return this.isHorizontal() ? (h = vt(r, a, i), u = s + t, d = i - a) : (o.position === "left" ? (h = a + t, u = vt(r, n, s), l = it * -0.5) : (h = i - t, u = vt(r, s, n), l = it * 0.5), d = n - s), {
      titleX: h,
      titleY: u,
      maxWidth: d,
      rotation: l
    };
  }
  draw() {
    const t = this.ctx, s = this.options;
    if (!s.display)
      return;
    const a = yt(s.font), i = a.lineHeight / 2 + this._padding.top, { titleX: o, titleY: r, maxWidth: l, rotation: d } = this._drawArgs(i);
    We(t, s.text, 0, 0, a, {
      color: s.color,
      maxWidth: l,
      rotation: d,
      textAlign: Zs(s.align),
      textBaseline: "middle",
      translation: [
        o,
        r
      ]
    });
  }
}
function kd(e, t) {
  const s = new Fi({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  Tt.configure(e, s, t), Tt.addBox(e, s), e.titleBlock = s;
}
var Pi = {
  id: "title",
  _element: Fi,
  start(e, t, s) {
    kd(e, s);
  },
  stop(e) {
    const t = e.titleBlock;
    Tt.removeBox(e, t), delete e.titleBlock;
  },
  beforeUpdate(e, t, s) {
    const a = e.titleBlock;
    Tt.configure(e, a, s), a.options = s;
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
    let t, s, a = /* @__PURE__ */ new Set(), n = 0, i = 0;
    for (t = 0, s = e.length; t < s; ++t) {
      const r = e[t].element;
      if (r && r.hasValue()) {
        const l = r.tooltipPosition();
        a.add(l.x), n += l.y, ++i;
      }
    }
    return i === 0 || a.size === 0 ? !1 : {
      x: [
        ...a
      ].reduce((r, l) => r + l) / a.size,
      y: n / i
    };
  },
  nearest(e, t) {
    if (!e.length)
      return !1;
    let s = t.x, a = t.y, n = Number.POSITIVE_INFINITY, i, o, r;
    for (i = 0, o = e.length; i < o; ++i) {
      const l = e[i].element;
      if (l && l.hasValue()) {
        const d = l.getCenterPoint(), h = zs(t, d);
        h < n && (n = h, r = l);
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
function Pt(e, t) {
  return t && (pt(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function It(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function Md(e, t) {
  const { element: s, datasetIndex: a, index: n } = t, i = e.getDatasetMeta(a).controller, { label: o, value: r } = i.getLabelAndValue(n);
  return {
    chart: e,
    label: o,
    parsed: i.getParsed(n),
    raw: e.data.datasets[a].data[n],
    formattedValue: r,
    dataset: i.getDataset(),
    dataIndex: n,
    datasetIndex: a,
    element: s
  };
}
function _n(e, t) {
  const s = e.chart.ctx, { body: a, footer: n, title: i } = e, { boxWidth: o, boxHeight: r } = t, l = yt(t.bodyFont), d = yt(t.titleFont), h = yt(t.footerFont), u = i.length, f = n.length, p = a.length, g = Bt(t.padding);
  let b = g.height, m = 0, v = a.reduce((S, M) => S + M.before.length + M.lines.length + M.after.length, 0);
  if (v += e.beforeBody.length + e.afterBody.length, u && (b += u * d.lineHeight + (u - 1) * t.titleSpacing + t.titleMarginBottom), v) {
    const S = t.displayColors ? Math.max(r, l.lineHeight) : l.lineHeight;
    b += p * S + (v - p) * l.lineHeight + (v - 1) * t.bodySpacing;
  }
  f && (b += t.footerMarginTop + f * h.lineHeight + (f - 1) * t.footerSpacing);
  let _ = 0;
  const k = function(S) {
    m = Math.max(m, s.measureText(S).width + _);
  };
  return s.save(), s.font = d.string, nt(e.title, k), s.font = l.string, nt(e.beforeBody.concat(e.afterBody), k), _ = t.displayColors ? o + 2 + t.boxPadding : 0, nt(a, (S) => {
    nt(S.before, k), nt(S.lines, k), nt(S.after, k);
  }), _ = 0, s.font = h.string, nt(e.footer, k), s.restore(), m += g.width, {
    width: m,
    height: b
  };
}
function Sd(e, t) {
  const { y: s, height: a } = t;
  return s < a / 2 ? "top" : s > e.height - a / 2 ? "bottom" : "center";
}
function wd(e, t, s, a) {
  const { x: n, width: i } = a, o = s.caretSize + s.caretPadding;
  if (e === "left" && n + i + o > t.width || e === "right" && n - i - o < 0)
    return !0;
}
function Cd(e, t, s, a) {
  const { x: n, width: i } = s, { width: o, chartArea: { left: r, right: l } } = e;
  let d = "center";
  return a === "center" ? d = n <= (r + l) / 2 ? "left" : "right" : n <= i / 2 ? d = "left" : n >= o - i / 2 && (d = "right"), wd(d, e, t, s) && (d = "center"), d;
}
function yn(e, t, s) {
  const a = s.yAlign || t.yAlign || Sd(e, s);
  return {
    xAlign: s.xAlign || t.xAlign || Cd(e, t, s, a),
    yAlign: a
  };
}
function $d(e, t) {
  let { x: s, width: a } = e;
  return t === "right" ? s -= a : t === "center" && (s -= a / 2), s;
}
function Dd(e, t, s) {
  let { y: a, height: n } = e;
  return t === "top" ? a += s : t === "bottom" ? a -= n + s : a -= n / 2, a;
}
function xn(e, t, s, a) {
  const { caretSize: n, caretPadding: i, cornerRadius: o } = e, { xAlign: r, yAlign: l } = s, d = n + i, { topLeft: h, topRight: u, bottomLeft: f, bottomRight: p } = ge(o);
  let g = $d(t, r);
  const b = Dd(t, l, d);
  return l === "center" ? r === "left" ? g += d : r === "right" && (g -= d) : r === "left" ? g -= Math.max(h, f) + n : r === "right" && (g += Math.max(u, p) + n), {
    x: _t(g, 0, a.width - t.width),
    y: _t(b, 0, a.height - t.height)
  };
}
function es(e, t, s) {
  const a = Bt(s.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - a.right : e.x + a.left;
}
function kn(e) {
  return Pt([], It(e));
}
function Ad(e, t, s) {
  return ce(e, {
    tooltip: t,
    tooltipItems: s,
    type: "tooltip"
  });
}
function Mn(e, t) {
  const s = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return s ? e.override(s) : e;
}
const Li = {
  beforeTitle: Ot,
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
  afterTitle: Ot,
  beforeBody: Ot,
  beforeLabel: Ot,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const s = e.formattedValue;
    return tt(s) || (t += s), t;
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
  afterLabel: Ot,
  afterBody: Ot,
  beforeFooter: Ot,
  footer: Ot,
  afterFooter: Ot
};
function St(e, t, s, a) {
  const n = e[t].call(s, a);
  return typeof n > "u" ? Li[t].call(s, a) : n;
}
class Sn extends jt {
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
    const s = this.chart, a = this.options.setContext(this.getContext()), n = a.enabled && s.options.animation && a.animations, i = new gi(this.chart, n);
    return n._cacheable && (this._cachedAnimations = Object.freeze(i)), i;
  }
  getContext() {
    return this.$context || (this.$context = Ad(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, s) {
    const { callbacks: a } = s, n = St(a, "beforeTitle", this, t), i = St(a, "title", this, t), o = St(a, "afterTitle", this, t);
    let r = [];
    return r = Pt(r, It(n)), r = Pt(r, It(i)), r = Pt(r, It(o)), r;
  }
  getBeforeBody(t, s) {
    return kn(St(s.callbacks, "beforeBody", this, t));
  }
  getBody(t, s) {
    const { callbacks: a } = s, n = [];
    return nt(t, (i) => {
      const o = {
        before: [],
        lines: [],
        after: []
      }, r = Mn(a, i);
      Pt(o.before, It(St(r, "beforeLabel", this, i))), Pt(o.lines, St(r, "label", this, i)), Pt(o.after, It(St(r, "afterLabel", this, i))), n.push(o);
    }), n;
  }
  getAfterBody(t, s) {
    return kn(St(s.callbacks, "afterBody", this, t));
  }
  getFooter(t, s) {
    const { callbacks: a } = s, n = St(a, "beforeFooter", this, t), i = St(a, "footer", this, t), o = St(a, "afterFooter", this, t);
    let r = [];
    return r = Pt(r, It(n)), r = Pt(r, It(i)), r = Pt(r, It(o)), r;
  }
  _createItems(t) {
    const s = this._active, a = this.chart.data, n = [], i = [], o = [];
    let r = [], l, d;
    for (l = 0, d = s.length; l < d; ++l)
      r.push(Md(this.chart, s[l]));
    return t.filter && (r = r.filter((h, u, f) => t.filter(h, u, f, a))), t.itemSort && (r = r.sort((h, u) => t.itemSort(h, u, a))), nt(r, (h) => {
      const u = Mn(t.callbacks, h);
      n.push(St(u, "labelColor", this, h)), i.push(St(u, "labelPointStyle", this, h)), o.push(St(u, "labelTextColor", this, h));
    }), this.labelColors = n, this.labelPointStyles = i, this.labelTextColors = o, this.dataPoints = r, r;
  }
  update(t, s) {
    const a = this.options.setContext(this.getContext()), n = this._active;
    let i, o = [];
    if (!n.length)
      this.opacity !== 0 && (i = {
        opacity: 0
      });
    else {
      const r = De[a.position].call(this, n, this._eventPosition);
      o = this._createItems(a), this.title = this.getTitle(o, a), this.beforeBody = this.getBeforeBody(o, a), this.body = this.getBody(o, a), this.afterBody = this.getAfterBody(o, a), this.footer = this.getFooter(o, a);
      const l = this._size = _n(this, a), d = Object.assign({}, r, l), h = yn(this.chart, a, d), u = xn(a, d, h, this.chart);
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
    this._tooltipItems = o, this.$context = void 0, i && this._resolveAnimations().update(this, i), t && a.external && a.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: s
    });
  }
  drawCaret(t, s, a, n) {
    const i = this.getCaretPosition(t, a, n);
    s.lineTo(i.x1, i.y1), s.lineTo(i.x2, i.y2), s.lineTo(i.x3, i.y3);
  }
  getCaretPosition(t, s, a) {
    const { xAlign: n, yAlign: i } = this, { caretSize: o, cornerRadius: r } = a, { topLeft: l, topRight: d, bottomLeft: h, bottomRight: u } = ge(r), { x: f, y: p } = t, { width: g, height: b } = s;
    let m, v, _, k, S, M;
    return i === "center" ? (S = p + b / 2, n === "left" ? (m = f, v = m - o, k = S + o, M = S - o) : (m = f + g, v = m + o, k = S - o, M = S + o), _ = m) : (n === "left" ? v = f + Math.max(l, h) + o : n === "right" ? v = f + g - Math.max(d, u) - o : v = this.caretX, i === "top" ? (k = p, S = k - o, m = v - o, _ = v + o) : (k = p + b, S = k + o, m = v + o, _ = v - o), M = k), {
      x1: m,
      x2: v,
      x3: _,
      y1: k,
      y2: S,
      y3: M
    };
  }
  drawTitle(t, s, a) {
    const n = this.title, i = n.length;
    let o, r, l;
    if (i) {
      const d = pe(a.rtl, this.x, this.width);
      for (t.x = es(this, a.titleAlign, a), s.textAlign = d.textAlign(a.titleAlign), s.textBaseline = "middle", o = yt(a.titleFont), r = a.titleSpacing, s.fillStyle = a.titleColor, s.font = o.string, l = 0; l < i; ++l)
        s.fillText(n[l], d.x(t.x), t.y + o.lineHeight / 2), t.y += o.lineHeight + r, l + 1 === i && (t.y += a.titleMarginBottom - r);
    }
  }
  _drawColorBox(t, s, a, n, i) {
    const o = this.labelColors[a], r = this.labelPointStyles[a], { boxHeight: l, boxWidth: d } = i, h = yt(i.bodyFont), u = es(this, "left", i), f = n.x(u), p = l < h.lineHeight ? (h.lineHeight - l) / 2 : 0, g = s.y + p;
    if (i.usePointStyle) {
      const b = {
        radius: Math.min(d, l) / 2,
        pointStyle: r.pointStyle,
        rotation: r.rotation,
        borderWidth: 1
      }, m = n.leftForLtr(f, d) + d / 2, v = g + l / 2;
      t.strokeStyle = i.multiKeyBackground, t.fillStyle = i.multiKeyBackground, Ns(t, b, m, v), t.strokeStyle = o.borderColor, t.fillStyle = o.backgroundColor, Ns(t, b, m, v);
    } else {
      t.lineWidth = X(o.borderWidth) ? Math.max(...Object.values(o.borderWidth)) : o.borderWidth || 1, t.strokeStyle = o.borderColor, t.setLineDash(o.borderDash || []), t.lineDashOffset = o.borderDashOffset || 0;
      const b = n.leftForLtr(f, d), m = n.leftForLtr(n.xPlus(f, 1), d - 2), v = ge(o.borderRadius);
      Object.values(v).some((_) => _ !== 0) ? (t.beginPath(), t.fillStyle = i.multiKeyBackground, ls(t, {
        x: b,
        y: g,
        w: d,
        h: l,
        radius: v
      }), t.fill(), t.stroke(), t.fillStyle = o.backgroundColor, t.beginPath(), ls(t, {
        x: m,
        y: g + 1,
        w: d - 2,
        h: l - 2,
        radius: v
      }), t.fill()) : (t.fillStyle = i.multiKeyBackground, t.fillRect(b, g, d, l), t.strokeRect(b, g, d, l), t.fillStyle = o.backgroundColor, t.fillRect(m, g + 1, d - 2, l - 2));
    }
    t.fillStyle = this.labelTextColors[a];
  }
  drawBody(t, s, a) {
    const { body: n } = this, { bodySpacing: i, bodyAlign: o, displayColors: r, boxHeight: l, boxWidth: d, boxPadding: h } = a, u = yt(a.bodyFont);
    let f = u.lineHeight, p = 0;
    const g = pe(a.rtl, this.x, this.width), b = function(A) {
      s.fillText(A, g.x(t.x + p), t.y + f / 2), t.y += f + i;
    }, m = g.textAlign(o);
    let v, _, k, S, M, C, $;
    for (s.textAlign = o, s.textBaseline = "middle", s.font = u.string, t.x = es(this, m, a), s.fillStyle = a.bodyColor, nt(this.beforeBody, b), p = r && m !== "right" ? o === "center" ? d / 2 + h : d + 2 + h : 0, S = 0, C = n.length; S < C; ++S) {
      for (v = n[S], _ = this.labelTextColors[S], s.fillStyle = _, nt(v.before, b), k = v.lines, r && k.length && (this._drawColorBox(s, t, S, g, a), f = Math.max(u.lineHeight, l)), M = 0, $ = k.length; M < $; ++M)
        b(k[M]), f = u.lineHeight;
      nt(v.after, b);
    }
    p = 0, f = u.lineHeight, nt(this.afterBody, b), t.y -= i;
  }
  drawFooter(t, s, a) {
    const n = this.footer, i = n.length;
    let o, r;
    if (i) {
      const l = pe(a.rtl, this.x, this.width);
      for (t.x = es(this, a.footerAlign, a), t.y += a.footerMarginTop, s.textAlign = l.textAlign(a.footerAlign), s.textBaseline = "middle", o = yt(a.footerFont), s.fillStyle = a.footerColor, s.font = o.string, r = 0; r < i; ++r)
        s.fillText(n[r], l.x(t.x), t.y + o.lineHeight / 2), t.y += o.lineHeight + a.footerSpacing;
    }
  }
  drawBackground(t, s, a, n) {
    const { xAlign: i, yAlign: o } = this, { x: r, y: l } = t, { width: d, height: h } = a, { topLeft: u, topRight: f, bottomLeft: p, bottomRight: g } = ge(n.cornerRadius);
    s.fillStyle = n.backgroundColor, s.strokeStyle = n.borderColor, s.lineWidth = n.borderWidth, s.beginPath(), s.moveTo(r + u, l), o === "top" && this.drawCaret(t, s, a, n), s.lineTo(r + d - f, l), s.quadraticCurveTo(r + d, l, r + d, l + f), o === "center" && i === "right" && this.drawCaret(t, s, a, n), s.lineTo(r + d, l + h - g), s.quadraticCurveTo(r + d, l + h, r + d - g, l + h), o === "bottom" && this.drawCaret(t, s, a, n), s.lineTo(r + p, l + h), s.quadraticCurveTo(r, l + h, r, l + h - p), o === "center" && i === "left" && this.drawCaret(t, s, a, n), s.lineTo(r, l + u), s.quadraticCurveTo(r, l, r + u, l), s.closePath(), s.fill(), n.borderWidth > 0 && s.stroke();
  }
  _updateAnimationTarget(t) {
    const s = this.chart, a = this.$animations, n = a && a.x, i = a && a.y;
    if (n || i) {
      const o = De[t.position].call(this, this._active, this._eventPosition);
      if (!o)
        return;
      const r = this._size = _n(this, t), l = Object.assign({}, o, this._size), d = yn(s, t, l), h = xn(t, l, d, s);
      (n._to !== h.x || i._to !== h.y) && (this.xAlign = d.xAlign, this.yAlign = d.yAlign, this.width = r.width, this.height = r.height, this.caretX = o.x, this.caretY = o.y, this._resolveAnimations().update(this, h));
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
    }, i = {
      x: this.x,
      y: this.y
    };
    a = Math.abs(a) < 1e-3 ? 0 : a;
    const o = Bt(s.padding), r = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    s.enabled && r && (t.save(), t.globalAlpha = a, this.drawBackground(i, t, n, s), li(t, s.textDirection), i.y += o.top, this.drawTitle(i, t, s), this.drawBody(i, t, s), this.drawFooter(i, t, s), ci(t, s.textDirection), t.restore());
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
    }), i = !is(a, n), o = this._positionChanged(n, s);
    (i || o) && (this._active = n, this._eventPosition = s, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, s, a = !0) {
    if (s && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const n = this.options, i = this._active || [], o = this._getActiveElements(t, i, s, a), r = this._positionChanged(o, t), l = s || !is(o, i) || r;
    return l && (this._active = o, (n.enabled || n.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, s))), l;
  }
  _getActiveElements(t, s, a, n) {
    const i = this.options;
    if (t.type === "mouseout")
      return [];
    if (!n)
      return s.filter((r) => this.chart.data.datasets[r.datasetIndex] && this.chart.getDatasetMeta(r.datasetIndex).controller.getParsed(r.index) !== void 0);
    const o = this.chart.getElementsAtEventForMode(t, i.mode, i, a);
    return i.reverse && o.reverse(), o;
  }
  _positionChanged(t, s) {
    const { caretX: a, caretY: n, options: i } = this, o = De[i.position].call(this, t, s);
    return o !== !1 && (a !== o.x || n !== o.y);
  }
}
var la = {
  id: "tooltip",
  _element: Sn,
  positioners: De,
  afterInit(e, t, s) {
    s && (e.tooltip = new Sn({
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
    callbacks: Li
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
const Td = (e, t, s, a) => (typeof t == "string" ? (s = e.push(t) - 1, a.unshift({
  index: s,
  label: t
})) : isNaN(t) && (s = null), s);
function Bd(e, t, s, a) {
  const n = e.indexOf(t);
  if (n === -1)
    return Td(e, t, s, a);
  const i = e.lastIndexOf(t);
  return n !== i ? s : n;
}
const Fd = (e, t) => e === null ? null : _t(Math.round(e), 0, t);
function wn(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class Ei extends ve {
  static id = "category";
  static defaults = {
    ticks: {
      callback: wn
    }
  };
  constructor(t) {
    super(t), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(t) {
    const s = this._addedLabels;
    if (s.length) {
      const a = this.getLabels();
      for (const { index: n, label: i } of s)
        a[n] === i && a.splice(n, 1);
      this._addedLabels = [];
    }
    super.init(t);
  }
  parse(t, s) {
    if (tt(t))
      return null;
    const a = this.getLabels();
    return s = isFinite(s) && a[s] === t ? s : Bd(a, t, U(s, t), this._addedLabels), Fd(s, a.length - 1);
  }
  determineDataLimits() {
    const { minDefined: t, maxDefined: s } = this.getUserBounds();
    let { min: a, max: n } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (t || (a = 0), s || (n = this.getLabels().length - 1)), this.min = a, this.max = n;
  }
  buildTicks() {
    const t = this.min, s = this.max, a = this.options.offset, n = [];
    let i = this.getLabels();
    i = t === 0 && s === i.length - 1 ? i : i.slice(t, s + 1), this._valueRange = Math.max(i.length - (a ? 0 : 1), 1), this._startValue = this.min - (a ? 0.5 : 0);
    for (let o = t; o <= s; o++)
      n.push({
        value: o
      });
    return n;
  }
  getLabelForValue(t) {
    return wn.call(this, t);
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
function Pd(e, t) {
  const s = [], { bounds: n, step: i, min: o, max: r, precision: l, count: d, maxTicks: h, maxDigits: u, includeBounds: f } = e, p = i || 1, g = h - 1, { min: b, max: m } = t, v = !tt(o), _ = !tt(r), k = !tt(d), S = (m - b) / (u + 1);
  let M = ya((m - b) / g / p) * p, C, $, A, E;
  if (M < 1e-14 && !v && !_)
    return [
      {
        value: b
      },
      {
        value: m
      }
    ];
  E = Math.ceil(m / M) - Math.floor(b / M), E > g && (M = ya(E * M / g / p) * p), tt(l) || (C = Math.pow(10, l), M = Math.ceil(M * C) / C), n === "ticks" ? ($ = Math.floor(b / M) * M, A = Math.ceil(m / M) * M) : ($ = b, A = m), v && _ && i && Fo((r - o) / i, M / 1e3) ? (E = Math.round(Math.min((r - o) / M, h)), M = (r - o) / E, $ = o, A = r) : k ? ($ = v ? o : $, A = _ ? r : A, E = d - 1, M = (A - $) / E) : (E = (A - $) / M, Te(E, Math.round(E), M / 1e3) ? E = Math.round(E) : E = Math.ceil(E));
  const L = Math.max(xa(M), xa($));
  C = Math.pow(10, tt(l) ? L : l), $ = Math.round($ * C) / C, A = Math.round(A * C) / C;
  let D = 0;
  for (v && (f && $ !== o ? (s.push({
    value: o
  }), $ < o && D++, Te(Math.round(($ + D * M) * C) / C, o, Cn(o, S, e)) && D++) : $ < o && D++); D < E; ++D) {
    const B = Math.round(($ + D * M) * C) / C;
    if (_ && B > r)
      break;
    s.push({
      value: B
    });
  }
  return _ && f && A !== r ? s.length && Te(s[s.length - 1].value, r, Cn(r, S, e)) ? s[s.length - 1].value = r : s.push({
    value: r
  }) : (!_ || A === r) && s.push({
    value: A
  }), s;
}
function Cn(e, t, { horizontal: s, minRotation: a }) {
  const n = Wt(a), i = (s ? Math.sin(n) : Math.cos(n)) || 1e-3, o = 0.75 * t * ("" + e).length;
  return Math.min(t / i, o);
}
class Ld extends ve {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, s) {
    return tt(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: s, maxDefined: a } = this.getUserBounds();
    let { min: n, max: i } = this;
    const o = (l) => n = s ? n : l, r = (l) => i = a ? i : l;
    if (t) {
      const l = Et(n), d = Et(i);
      l < 0 && d < 0 ? r(0) : l > 0 && d > 0 && o(0);
    }
    if (n === i) {
      let l = i === 0 ? 1 : Math.abs(i * 0.05);
      r(i + l), t || o(n - l);
    }
    this.min = n, this.max = i;
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
    }, i = this._range || this, o = Pd(n, i);
    return t.bounds === "ticks" && Po(o, this, "value"), t.reverse ? (o.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), o;
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
    return Js(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class Oi extends Ld {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: ti.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: s } = this.getMinMax(!0);
    this.min = kt(t) ? t : 0, this.max = kt(s) ? s : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), s = t ? this.width : this.height, a = Wt(this.options.ticks.minRotation), n = (t ? Math.sin(a) : Math.cos(a)) || 1e-3, i = this._resolveTickFontOptions(0);
    return Math.ceil(s / Math.min(40, i.lineHeight / n));
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
}, wt = /* @__PURE__ */ Object.keys(ys);
function $n(e, t) {
  return e - t;
}
function Dn(e, t) {
  if (tt(t))
    return null;
  const s = e._adapter, { parser: a, round: n, isoWeekday: i } = e._parseOpts;
  let o = t;
  return typeof a == "function" && (o = a(o)), kt(o) || (o = typeof a == "string" ? s.parse(o, a) : s.parse(o)), o === null ? null : (n && (o = n === "week" && (Re(i) || i === !0) ? s.startOf(o, "isoWeek", i) : s.startOf(o, n)), +o);
}
function An(e, t, s, a) {
  const n = wt.length;
  for (let i = wt.indexOf(e); i < n - 1; ++i) {
    const o = ys[wt[i]], r = o.steps ? o.steps : Number.MAX_SAFE_INTEGER;
    if (o.common && Math.ceil((s - t) / (r * o.size)) <= a)
      return wt[i];
  }
  return wt[n - 1];
}
function Ed(e, t, s, a, n) {
  for (let i = wt.length - 1; i >= wt.indexOf(s); i--) {
    const o = wt[i];
    if (ys[o].common && e._adapter.diff(n, a, o) >= t - 1)
      return o;
  }
  return wt[s ? wt.indexOf(s) : 0];
}
function Od(e) {
  for (let t = wt.indexOf(e) + 1, s = wt.length; t < s; ++t)
    if (ys[wt[t]].common)
      return wt[t];
}
function Tn(e, t, s) {
  if (!s)
    e[t] = !0;
  else if (s.length) {
    const { lo: a, hi: n } = Gs(s, t), i = s[a] >= t ? s[a] : s[n];
    e[i] = !0;
  }
}
function Rd(e, t, s, a) {
  const n = e._adapter, i = +n.startOf(t[0].value, a), o = t[t.length - 1].value;
  let r, l;
  for (r = i; r <= o; r = +n.add(r, 1, a))
    l = s[r], l >= 0 && (t[l].major = !0);
  return t;
}
function Bn(e, t, s) {
  const a = [], n = {}, i = t.length;
  let o, r;
  for (o = 0; o < i; ++o)
    r = t[o], n[r] = o, a.push({
      value: r,
      major: !1
    });
  return i === 0 || !s ? a : Rd(e, a, n, s);
}
class Fn extends ve {
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
    const a = t.time || (t.time = {}), n = this._adapter = new _l._date(t.adapters.date);
    n.init(s), Ae(a.displayFormats, n.formats()), this._parseOpts = {
      parser: a.parser,
      round: a.round,
      isoWeekday: a.isoWeekday
    }, super.init(t), this._normalized = s.normalized;
  }
  parse(t, s) {
    return t === void 0 ? null : Dn(this, t);
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
    let { min: n, max: i, minDefined: o, maxDefined: r } = this.getUserBounds();
    function l(d) {
      !o && !isNaN(d.min) && (n = Math.min(n, d.min)), !r && !isNaN(d.max) && (i = Math.max(i, d.max));
    }
    (!o || !r) && (l(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && l(this.getMinMax(!1))), n = kt(n) && !isNaN(n) ? n : +s.startOf(Date.now(), a), i = kt(i) && !isNaN(i) ? i : +s.endOf(Date.now(), a) + 1, this.min = Math.min(n, i - 1), this.max = Math.max(n + 1, i);
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
    const i = this.min, o = this.max, r = Io(n, i, o);
    return this._unit = s.unit || (a.autoSkip ? An(s.minUnit, this.min, this.max, this._getLabelCapacity(i)) : Ed(this, r.length, s.minUnit, this.min, this.max)), this._majorUnit = !a.major.enabled || this._unit === "year" ? void 0 : Od(this._unit), this.initOffsets(n), t.reverse && r.reverse(), Bn(this, r, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let s = 0, a = 0, n, i;
    this.options.offset && t.length && (n = this.getDecimalForValue(t[0]), t.length === 1 ? s = 1 - n : s = (this.getDecimalForValue(t[1]) - n) / 2, i = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? a = i : a = (i - this.getDecimalForValue(t[t.length - 2])) / 2);
    const o = t.length < 3 ? 0.5 : 0.25;
    s = _t(s, 0, o), a = _t(a, 0, o), this._offsets = {
      start: s,
      end: a,
      factor: 1 / (s + 1 + a)
    };
  }
  _generate() {
    const t = this._adapter, s = this.min, a = this.max, n = this.options, i = n.time, o = i.unit || An(i.minUnit, s, a, this._getLabelCapacity(s)), r = U(n.ticks.stepSize, 1), l = o === "week" ? i.isoWeekday : !1, d = Re(l) || l === !0, h = {};
    let u = s, f, p;
    if (d && (u = +t.startOf(u, "isoWeek", l)), u = +t.startOf(u, d ? "day" : o), t.diff(a, s, o) > 1e5 * r)
      throw new Error(s + " and " + a + " are too far apart with stepSize of " + r + " " + o);
    const g = n.ticks.source === "data" && this.getDataTimestamps();
    for (f = u, p = 0; f < a; f = +t.add(f, r, o), p++)
      Tn(h, f, g);
    return (f === a || n.bounds === "ticks" || p === 1) && Tn(h, f, g), Object.keys(h).sort($n).map((b) => +b);
  }
  getLabelForValue(t) {
    const s = this._adapter, a = this.options.time;
    return a.tooltipFormat ? s.format(t, a.tooltipFormat) : s.format(t, a.displayFormats.datetime);
  }
  format(t, s) {
    const n = this.options.time.displayFormats, i = this._unit, o = s || n[i];
    return this._adapter.format(t, o);
  }
  _tickFormatFunction(t, s, a, n) {
    const i = this.options, o = i.ticks.callback;
    if (o)
      return ct(o, [
        t,
        s,
        a
      ], this);
    const r = i.time.displayFormats, l = this._unit, d = this._majorUnit, h = l && r[l], u = d && r[d], f = a[s], p = d && u && f && f.major;
    return this._adapter.format(t, n || (p ? u : h));
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
    const s = this.options.ticks, a = this.ctx.measureText(t).width, n = Wt(this.isHorizontal() ? s.maxRotation : s.minRotation), i = Math.cos(n), o = Math.sin(n), r = this._resolveTickFontOptions(0).size;
    return {
      w: a * i + r * o,
      h: a * o + r * i
    };
  }
  _getLabelCapacity(t) {
    const s = this.options.time, a = s.displayFormats, n = a[s.unit] || a.millisecond, i = this._tickFormatFunction(t, 0, Bn(this, [
      t
    ], this._majorUnit), n), o = this._getLabelSize(i), r = Math.floor(this.isHorizontal() ? this.width / o.w : this.height / o.h) - 1;
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
      t.push(Dn(this, n[s]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return Zn(t.sort($n));
  }
}
function ss(e, t, s) {
  let a = 0, n = e.length - 1, i, o, r, l;
  s ? (t >= e[a].pos && t <= e[n].pos && ({ lo: a, hi: n } = ne(e, "pos", t)), { pos: i, time: r } = e[a], { pos: o, time: l } = e[n]) : (t >= e[a].time && t <= e[n].time && ({ lo: a, hi: n } = ne(e, "time", t)), { time: i, pos: r } = e[a], { time: o, pos: l } = e[n]);
  const d = o - i;
  return d ? r + (l - r) * (t - i) / d : r;
}
class Yk extends Fn {
  static id = "timeseries";
  static defaults = Fn.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), s = this._table = this.buildLookupTable(t);
    this._minPos = ss(s, this.min), this._tableRange = ss(s, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: s, max: a } = this, n = [], i = [];
    let o, r, l, d, h;
    for (o = 0, r = t.length; o < r; ++o)
      d = t[o], d >= s && d <= a && n.push(d);
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
    for (o = 0, r = n.length; o < r; ++o)
      h = n[o + 1], l = n[o - 1], d = n[o], Math.round((h + l) / 2) !== d && i.push({
        time: d,
        pos: o / (r - 1)
      });
    return i;
  }
  _generate() {
    const t = this.min, s = this.max;
    let a = super.getDataTimestamps();
    return (!a.includes(t) || !a.length) && a.splice(0, 0, t), (!a.includes(s) || a.length === 1) && a.push(s), a.sort((n, i) => n - i);
  }
  _getTimestampsForTable() {
    let t = this._cache.all || [];
    if (t.length)
      return t;
    const s = this.getDataTimestamps(), a = this.getLabelTimestamps();
    return s.length && a.length ? t = this.normalize(s.concat(a)) : t = s.length ? s : a, t = this._cache.all = t, t;
  }
  getDecimalForValue(t) {
    return (ss(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const s = this._offsets, a = this.getDecimalForPixel(t) / s.factor - s.end;
    return ss(this._table, a * this._tableRange + this._minPos, !0);
  }
}
const Ri = {
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
}, Id = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
}, zd = {
  type: {
    type: String,
    required: !0
  },
  destroyDelay: {
    type: Number,
    default: 0
    // No delay by default
  },
  ...Ri,
  ...Id
}, Wd = Yi[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function fe(e) {
  return Hn(e) ? Rs(e) : e;
}
function Nd(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return Hn(t) ? new Proxy(e, {}) : e;
}
function Hd(e, t) {
  const s = e.options;
  s && t && Object.assign(s, t);
}
function Ii(e, t) {
  e.labels = t;
}
function zi(e, t, s) {
  const a = [];
  e.datasets = t.map((n) => {
    const i = e.datasets.find((o) => o[s] === n[s]);
    return !i || !n.data || a.includes(i) ? {
      ...n
    } : (a.push(i), Object.assign(i, n), i);
  });
}
function jd(e, t) {
  const s = {
    labels: [],
    datasets: []
  };
  return Ii(s, e.labels), zi(s, e.datasets, t), s;
}
const Vd = G({
  props: zd,
  setup(e, t) {
    let { expose: s, slots: a } = t;
    const n = xt(null), i = zn(null);
    s({
      chart: i
    });
    const o = () => {
      if (!n.value) return;
      const { type: d, data: h, options: u, plugins: f, datasetIdKey: p } = e, g = jd(h, p), b = Nd(g, h);
      i.value = new _e(n.value, {
        type: d,
        data: b,
        options: {
          ...u
        },
        plugins: f
      });
    }, r = () => {
      const d = Rs(i.value);
      d && (e.destroyDelay > 0 ? setTimeout(() => {
        d.destroy(), i.value = null;
      }, e.destroyDelay) : (d.destroy(), i.value = null));
    }, l = (d) => {
      d.update(e.updateMode);
    };
    return us(o), Wn(r), Ht([
      () => e.options,
      () => e.data
    ], (d, h) => {
      let [u, f] = d, [p, g] = h;
      const b = Rs(i.value);
      if (!b)
        return;
      let m = !1;
      if (u) {
        const v = fe(u), _ = fe(p);
        v && v !== _ && (Hd(b, v), m = !0);
      }
      if (f) {
        const v = fe(f.labels), _ = fe(g.labels), k = fe(f.datasets), S = fe(g.datasets);
        v !== _ && (Ii(b.config.data, v), m = !0), k && k !== S && (zi(b.config.data, k, e.datasetIdKey), m = !0);
      }
      m && Nn(() => {
        l(b);
      });
    }, {
      deep: !0
    }), () => Os("canvas", {
      role: "img",
      "aria-label": e.ariaLabel,
      "aria-describedby": e.ariaDescribedby,
      ref: n
    }, [
      Os("p", {}, [
        a.default ? a.default() : ""
      ])
    ]);
  }
});
function ca(e, t) {
  return _e.register(t), G({
    props: Ri,
    setup(s, a) {
      let { expose: n } = a;
      const i = zn(null), o = (r) => {
        i.value = r?.chart;
      };
      return n({
        chart: i
      }), () => Os(Vd, Wd({
        ref: o
      }, {
        type: e,
        ...s
      }));
    }
  });
}
const Yd = /* @__PURE__ */ ca("bar", gl), qd = /* @__PURE__ */ ca("line", ml), Ud = /* @__PURE__ */ ca("pie", vl), Pn = {
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
}, Ln = {
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
}, Kd = [
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
function J(e) {
  const t = xt("light");
  let s = null;
  const a = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", n = T(() => e?.value ? e.value : t.value), i = T(() => n.value === "dark"), o = T(() => i.value ? Ln : Pn), r = () => {
    typeof document > "u" || (t.value = a(), s = new MutationObserver((d) => {
      for (const h of d)
        h.attributeName === "class" && (t.value = a());
    }), s.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["class"]
    }));
  }, l = () => {
    s && (s.disconnect(), s = null);
  };
  return us(() => {
    r();
  }), Wn(() => {
    l();
  }), e && Ht(e, () => {
  }), {
    isDark: i,
    currentTheme: n,
    colors: o,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: Pn,
    darkColors: Ln,
    chartSeriesColors: Kd
  };
}
const Xd = { class: "chart-container" }, Gd = /* @__PURE__ */ G({
  __name: "ChartBar",
  props: {
    data: {},
    options: {},
    stacked: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const s = e;
    _e.register(
      Ei,
      Oi,
      Gc,
      Pi,
      la,
      ra
    );
    const { isDark: a, colors: n } = J(Q(s, "theme")), i = s.data, o = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = T(() => s.options ? s.options : {
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
              return l.length > 0 ? String(o(l[0].label)) : "";
            },
            label: function(l) {
              let d = String(o(l.dataset.label || ""));
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
              return o(d);
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
    return t({ isDark: a }), (l, d) => (y(), x("div", Xd, [
      V(F(Yd), {
        data: F(i),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), K = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [a, n] of t)
    s[a] = n;
  return s;
}, Gt = /* @__PURE__ */ K(Gd, [["__scopeId", "data-v-105d8c6f"]]), Zd = { class: "chart-container" }, Qd = /* @__PURE__ */ G({
  __name: "ChartLine",
  props: {
    data: {},
    options: {},
    theme: {}
  },
  setup(e, { expose: t }) {
    const s = e;
    _e.register(
      Ei,
      Oi,
      Vc,
      vs,
      Pi,
      la,
      ra,
      bd
    );
    const { isDark: a, colors: n } = J(Q(s, "theme")), i = s.data, o = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = T(() => s.options ? s.options : {
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
              return l.length > 0 ? String(o(l[0].label)) : "";
            },
            label: function(l) {
              let d = String(o(l.dataset.label || ""));
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
              return o(l);
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
              return o(d);
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
    return t({ isDark: a }), (l, d) => (y(), x("div", Zd, [
      V(F(qd), {
        data: F(i),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), Zt = /* @__PURE__ */ K(Qd, [["__scopeId", "data-v-bacd3848"]]), Jd = { class: "chart-container" }, th = /* @__PURE__ */ G({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const s = e;
    _e.register(Lc, la, ra);
    const { isDark: a, colors: n } = J(Q(s, "theme")), i = s.data, o = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = T(() => s.options ? s.options : {
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
              return d.labels.length && d.datasets.length ? d.labels.map((h, u) => {
                const f = l.getDatasetMeta(0), p = d.datasets[0], g = p.data[u], b = Array.isArray(p.backgroundColor) ? p.backgroundColor[u] : p.backgroundColor;
                return {
                  text: `${o(h)}: ${g}`,
                  fillStyle: b,
                  hidden: f.data[u]?.hidden || !1,
                  index: u
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
              return l.length > 0 ? String(o(l[0].label)) : "";
            },
            label: function(l) {
              const d = l.label || "", h = l.parsed || 0, u = l.dataset.data.reduce((p, g) => p + g, 0), f = (h / u * 100).toFixed(1);
              return `${o(d)}: ${h} (${f}%)`;
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
    return t({ isDark: a }), (l, d) => (y(), x("div", Jd, [
      V(F(Ud), {
        data: F(i),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), xs = /* @__PURE__ */ K(th, [["__scopeId", "data-v-23a84317"]]), eh = { class: "chart-container" }, sh = ["viewBox"], ah = ["transform"], nh = ["x", "width", "fill", "stroke"], ih = ["fill"], oh = ["x1", "y1", "x2", "y2", "stroke"], rh = ["points", "fill"], lh = ["x1", "y1", "x2", "y2", "stroke"], ch = ["x", "y", "fill"], dh = ["x1", "y1", "x2", "y2", "stroke"], hh = ["points", "fill"], uh = ["transform"], fh = ["y1", "y2"], gh = ["y1", "y2"], ph = ["y1", "y2"], bh = ["y1", "y2"], mh = ["y", "height"], vh = ["y1", "y2"], _h = ["y1", "y2"], yh = ["y1", "y2"], xh = ["y1", "y2"], kh = ["y", "height"], Mh = ["cy", "stroke", "onMouseenter"], Sh = ["cy", "stroke", "onMouseenter"], wh = ["cy", "stroke", "onMouseenter"], Ch = ["cy", "stroke", "onMouseenter"], $h = ["y1", "y2", "onMouseenter"], Dh = ["y1", "y2", "onMouseenter"], Ah = ["x", "y", "fill"], Th = ["x", "y", "fill"], Bh = ["transform"], Fh = { transform: "translate(-200, 0)" }, Ph = ["stroke"], Lh = ["fill"], Eh = { transform: "translate(-130, 0)" }, Oh = ["stroke"], Rh = ["fill"], Ih = { transform: "translate(-60, 0)" }, zh = ["stroke"], Wh = ["fill"], Nh = { transform: "translate(10, 0)" }, Hh = ["stroke"], jh = ["fill"], Vh = { transform: "translate(80, 0)" }, Yh = ["fill"], qh = { transform: "translate(150, 0)" }, Uh = ["fill"], Kh = /* @__PURE__ */ G({
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
    const s = e, { isDark: a } = J(Q(s, "theme")), n = T(() => ({
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
    })), i = xt({
      visible: !1,
      x: 0,
      y: 0,
      text: ""
    }), o = (f) => typeof f == "string" ? f.charAt(0).toUpperCase() + f.slice(1).toLowerCase() : f, r = (f, p) => {
      const g = f.currentTarget.closest("svg");
      if (!g) return;
      const b = g.getBoundingClientRect(), m = g.createSVGPoint();
      m.x = f.clientX - b.left, m.y = f.clientY - b.top, i.value = {
        visible: !0,
        x: m.x,
        y: m.y - 20,
        text: p
      };
    }, l = (f) => {
      if (i.value.visible) {
        const p = f.currentTarget, g = p.getBoundingClientRect(), b = p.createSVGPoint();
        b.x = f.clientX - g.left, b.y = f.clientY - g.top, i.value.x = b.x, i.value.y = b.y - 20;
      }
    }, d = () => {
      i.value.visible = !1;
    }, h = () => {
      i.value.visible = !1;
    }, u = T(() => {
      const f = [], g = s.chartHeight - s.chartMargin - s.chartBottomMargin;
      for (let b = 1; b <= 10; b++) {
        const m = b, v = (m - 1) / 9, _ = s.chartMargin + g - v * g;
        f.push({ value: m, y: _ });
      }
      return f;
    });
    return t({ isDark: a }), (f, p) => (y(), x("div", eh, [
      (y(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: mt(`min-height: ${e.chartHeight}px;`),
        onMousemove: l,
        onMouseleave: d
      }, [
        i.value.visible ? (y(), x("g", {
          key: 0,
          transform: `translate(${i.value.x}, ${i.value.y})`
        }, [
          c("rect", {
            x: -(i.value.text.length * 6 + 10),
            y: -16,
            width: i.value.text.length * 12 + 20,
            height: "24",
            fill: n.value.tooltipBg,
            rx: "6",
            stroke: n.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, nh),
          c("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: n.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, w(i.value.text), 9, ih)
        ], 8, ah)) : I("", !0),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, oh),
        c("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: n.value.axis
        }, null, 8, rh),
        (y(!0), x(Y, null, et(u.value, (g, b) => (y(), x(Y, { key: b }, [
          c("line", {
            x1: e.chartMargin - 6,
            y1: g.y,
            x2: e.chartMargin,
            y2: g.y,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, lh),
          c("text", {
            x: e.chartMargin - 12,
            y: g.y + 4,
            "text-anchor": "end",
            fill: n.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, w(g.value), 9, ch)
        ], 64))), 128)),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, dh),
        c("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: n.value.axis
        }, null, 8, hh),
        (y(!0), x(Y, null, et(e.boxplotData, (g, b) => (y(), x(Y, { key: b }, [
          c("g", {
            transform: `translate(${g.centerX}, 0)`
          }, [
            g.isTotal ? (y(), x(Y, { key: 0 }, [
              c("line", {
                x1: 0,
                y1: g.minY,
                x2: 0,
                y2: g.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, fh),
              c("line", {
                x1: 0,
                y1: g.q3Y,
                x2: 0,
                y2: g.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, gh),
              c("line", {
                x1: -18,
                y1: g.minY,
                x2: 18,
                y2: g.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, ph),
              c("line", {
                x1: -18,
                y1: g.maxY,
                x2: 18,
                y2: g.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, bh),
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
              }, null, 8, mh)
            ], 64)) : (y(), x(Y, { key: 1 }, [
              c("line", {
                x1: 0,
                y1: g.minY,
                x2: 0,
                y2: g.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, vh),
              c("line", {
                x1: 0,
                y1: g.q3Y,
                x2: 0,
                y2: g.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, _h),
              c("line", {
                x1: -18,
                y1: g.minY,
                x2: 18,
                y2: g.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, yh),
              c("line", {
                x1: -18,
                y1: g.maxY,
                x2: 18,
                y2: g.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, xh),
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
              }, null, 8, kh)
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
              onMouseleave: h,
              style: { cursor: "pointer" }
            }, null, 40, Mh),
            c("circle", {
              cx: 0,
              cy: g.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (m) => r(m, `Q1: ${g.q1.toFixed(1)}`),
              onMouseleave: h,
              style: { cursor: "pointer" }
            }, null, 40, Sh),
            c("circle", {
              cx: 0,
              cy: g.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (m) => r(m, `Q3: ${g.q3.toFixed(1)}`),
              onMouseleave: h,
              style: { cursor: "pointer" }
            }, null, 40, wh),
            c("circle", {
              cx: 0,
              cy: g.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (m) => r(m, `Max: ${g.max.toFixed(1)}`),
              onMouseleave: h,
              style: { cursor: "pointer" }
            }, null, 40, Ch),
            c("line", {
              x1: -24,
              y1: g.medianY,
              x2: 24,
              y2: g.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (m) => r(m, `Median: ${g.median.toFixed(1)}`),
              onMouseleave: h,
              style: { cursor: "pointer" }
            }, null, 40, $h),
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
              onMouseleave: h,
              style: { cursor: "pointer" }
            }, null, 40, Dh)) : I("", !0)
          ], 8, uh),
          c("text", {
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: n.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, w(o(g.label)), 9, Ah),
          g.responseCount ? (y(), x("text", {
            key: 0,
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: n.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + w(g.responseCount), 9, Th)) : I("", !0)
        ], 64))), 128)),
        e.showLegend ? (y(), x("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          c("g", Fh, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
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
            }, " Min ", 8, Lh)
          ]),
          c("g", Eh, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Oh),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, Rh)
          ]),
          c("g", Ih, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, zh),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, Wh)
          ]),
          c("g", Nh, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Hh),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, jh)
          ]),
          c("g", Vh, [
            p[0] || (p[0] = c("line", {
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
            }, " Avg ", 8, Yh)
          ]),
          c("g", qh, [
            p[1] || (p[1] = c("line", {
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
            }, " Median ", 8, Uh)
          ])
        ], 8, Bh)) : I("", !0)
      ], 44, sh))
    ]));
  }
}), Xh = /* @__PURE__ */ K(Kh, [["__scopeId", "data-v-520c623f"]]), Gh = { class: "chart-container" }, Zh = ["viewBox"], Qh = ["transform"], Jh = ["x", "y", "width", "height", "fill", "stroke"], tu = ["y", "fill"], eu = ["y", "fill"], su = ["x1", "y1", "x2", "y2", "stroke"], au = ["points", "fill"], nu = ["x1", "y1", "x2", "y2", "stroke"], iu = ["x1", "y1", "x2", "y2", "stroke"], ou = ["x", "y", "fill"], ru = ["x", "y", "fill", "transform"], lu = ["x1", "y1", "x2", "y2", "stroke"], cu = ["points", "fill"], du = ["transform"], hu = ["y1", "y2", "stroke", "onMouseenter"], uu = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], fu = ["x1", "y1", "x2", "y2", "onMouseenter"], gu = ["x1", "y1", "x2", "y2", "onMouseenter"], pu = ["cy", "stroke", "onMouseenter"], bu = ["cy", "stroke", "onMouseenter"], mu = ["x", "y", "fill"], vu = ["x", "y", "fill"], _u = ["transform"], yu = { transform: "translate(-180, 0)" }, xu = ["stroke"], ku = ["fill"], Mu = { transform: "translate(-120, 0)" }, Su = ["fill"], wu = { transform: "translate(-60, 0)" }, Cu = ["fill"], $u = { transform: "translate(0, 0)" }, Du = ["stroke"], Au = ["fill"], Tu = { transform: "translate(60, 0)" }, Bu = ["fill"], Fu = { transform: "translate(130, 0)" }, Pu = ["fill"], Lu = /* @__PURE__ */ G({
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
    const s = e, { isDark: a } = J(Q(s, "theme")), n = T(() => ({
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
    })), i = xt({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), o = (f) => typeof f == "string" ? f.charAt(0).toUpperCase() + f.slice(1).toLowerCase() : f, r = (f, p, g) => {
      const b = f.currentTarget.closest("svg");
      if (!b) return;
      const m = b.getBoundingClientRect(), v = b.createSVGPoint();
      v.x = f.clientX - m.left, v.y = f.clientY - m.top;
      let _ = o(p.label), k = "";
      switch (g) {
        case "body":
          k = `Q1: ${p.q1.toFixed(1)} | Q3: ${p.q3.toFixed(1)}`;
          break;
        case "wick":
          k = `Min: ${p.low.toFixed(1)} | Max: ${p.high.toFixed(1)}`;
          break;
        case "median":
          k = `Median: ${p.median.toFixed(1)}`;
          break;
        case "average":
          k = `Average: ${p.average?.toFixed(1)}`;
          break;
        case "min":
          k = `Min: ${p.low.toFixed(1)}`;
          break;
        case "max":
          k = `Max: ${p.high.toFixed(1)}`;
          break;
      }
      const S = Math.max(180, k.length * 7 + 40), M = 48;
      i.value = {
        visible: !0,
        x: v.x,
        y: v.y - 20,
        title: _,
        text: k,
        width: S,
        height: M
      };
    }, l = (f) => {
      if (i.value.visible) {
        const p = f.currentTarget, g = p.getBoundingClientRect(), b = p.createSVGPoint();
        b.x = f.clientX - g.left, b.y = f.clientY - g.top, i.value.x = b.x, i.value.y = b.y - 20;
      }
    }, d = () => {
      i.value.visible = !1;
    }, h = () => {
      i.value.visible = !1;
    }, u = T(() => {
      const f = [], g = s.chartHeight - s.chartMargin - s.chartBottomMargin;
      for (let b = 1; b <= 10; b++) {
        const m = b, v = (m - 1) / 9, _ = s.chartMargin + g - v * g;
        f.push({ value: m, y: _ });
      }
      return f;
    });
    return t({ isDark: a }), (f, p) => (y(), x("div", Gh, [
      (y(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: mt(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
        onMousemove: l,
        onMouseleave: d
      }, [
        i.value.visible ? (y(), x("g", {
          key: 0,
          transform: `translate(${i.value.x}, ${i.value.y})`
        }, [
          c("rect", {
            x: -i.value.width / 2,
            y: -i.value.height - 10,
            width: i.value.width,
            height: i.value.height,
            fill: n.value.tooltipBg,
            rx: "8",
            stroke: n.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, Jh),
          c("text", {
            x: "0",
            y: -i.value.height + 8,
            "text-anchor": "middle",
            fill: n.value.tooltipText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, w(i.value.title), 9, tu),
          c("text", {
            x: "0",
            y: -i.value.height + 26,
            "text-anchor": "middle",
            fill: n.value.tooltipTextSecondary,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, w(i.value.text), 9, eu)
        ], 8, Qh)) : I("", !0),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, su),
        c("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: n.value.axis
        }, null, 8, au),
        (y(!0), x(Y, null, et(u.value, (g, b) => (y(), x("line", {
          key: `grid-${b}`,
          x1: e.chartMargin,
          y1: g.y,
          x2: e.chartWidth - e.chartMargin,
          y2: g.y,
          stroke: n.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, nu))), 128)),
        (y(!0), x(Y, null, et(u.value, (g, b) => (y(), x(Y, { key: b }, [
          c("line", {
            x1: e.chartMargin - 6,
            y1: g.y,
            x2: e.chartMargin,
            y2: g.y,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, iu),
          c("text", {
            x: e.chartMargin - 12,
            y: g.y + 4,
            "text-anchor": "end",
            fill: n.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, w(g.value), 9, ou)
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
        }, w(o(e.yAxisLabel)), 9, ru),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, lu),
        c("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: n.value.axis
        }, null, 8, cu),
        (y(!0), x(Y, null, et(e.candlestickData, (g, b) => (y(), x(Y, { key: b }, [
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
              onMouseleave: h,
              style: { cursor: "pointer" }
            }, null, 40, hu),
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
              onMouseleave: h,
              style: { cursor: "pointer" }
            }, null, 40, uu),
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
              onMouseleave: h,
              style: { cursor: "pointer" }
            }, null, 40, fu)) : I("", !0),
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
              onMouseleave: h,
              style: { cursor: "pointer" }
            }, null, 40, gu)) : I("", !0),
            c("circle", {
              cx: 0,
              cy: g.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (m) => r(m, g, "min"),
              onMouseleave: h,
              style: { cursor: "pointer" }
            }, null, 40, pu),
            c("circle", {
              cx: 0,
              cy: g.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (m) => r(m, g, "max"),
              onMouseleave: h,
              style: { cursor: "pointer" }
            }, null, 40, bu)
          ], 8, du),
          c("text", {
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: n.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, w(o(g.label)), 9, mu),
          g.responseCount ? (y(), x("text", {
            key: 0,
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: n.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + w(g.responseCount), 9, vu)) : I("", !0)
        ], 64))), 128)),
        e.showLegend ? (y(), x("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          c("g", yu, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, xu),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, ku)
          ]),
          c("g", Mu, [
            p[0] || (p[0] = c("rect", {
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
            }, " Q1 ", 8, Su)
          ]),
          c("g", wu, [
            p[1] || (p[1] = c("rect", {
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
            }, " Q3 ", 8, Cu)
          ]),
          c("g", $u, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Du),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Au)
          ]),
          c("g", Tu, [
            p[2] || (p[2] = c("line", {
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
            }, " Avg ", 8, Bu)
          ]),
          c("g", Fu, [
            p[3] || (p[3] = c("line", {
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
            }, " Median ", 8, Pu)
          ])
        ], 8, _u)) : I("", !0)
      ], 44, Zh))
    ]));
  }
}), Wi = /* @__PURE__ */ K(Lu, [["__scopeId", "data-v-61d0259c"]]), Eu = { class: "chart-container" }, Ou = ["viewBox"], Ru = ["transform"], Iu = ["x", "y", "width", "height", "fill", "stroke"], zu = ["y", "fill"], Wu = ["y", "fill"], Nu = ["x1", "y1", "x2", "y2", "stroke"], Hu = ["x1", "y1", "x2", "y2", "stroke"], ju = ["points", "fill"], Vu = ["x1", "y1", "x2", "y2", "stroke"], Yu = ["x", "y", "fill"], qu = ["x", "y", "fill", "transform"], Uu = ["x1", "y1", "x2", "y2", "stroke"], Ku = ["points", "fill"], Xu = ["x1", "y1", "x2", "y2", "stroke"], Gu = ["x", "y", "fill"], Zu = ["x", "y", "fill"], Qu = ["d"], Ju = ["x", "y", "width", "height", "onMouseenter"], tf = ["x1", "y1", "x2", "y2"], ef = ["x", "y"], sf = ["x1", "y1", "x2", "y2"], af = ["x", "y"], nf = ["x1", "y1", "x2", "y2"], of = ["x", "y"], rf = ["x1", "y1", "x2", "y2"], lf = ["x", "y"], cf = ["x1", "y1", "x2", "y2"], df = ["x", "y"], hf = ["x1", "y1", "x2", "y2"], uf = ["x", "y"], ff = ["transform"], gf = { transform: "translate(-220, 0)" }, pf = ["fill"], bf = { transform: "translate(-140, 0)" }, mf = ["fill"], vf = { transform: "translate(-80, 0)" }, _f = ["fill"], yf = { transform: "translate(-20, 0)" }, xf = ["fill"], kf = { transform: "translate(60, 0)" }, Mf = ["fill"], Sf = { transform: "translate(130, 0)" }, wf = ["fill"], Cf = { transform: "translate(180, 0)" }, $f = ["fill"], Df = /* @__PURE__ */ G({
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
    const s = e, { isDark: a } = J(Q(s, "theme")), n = T(() => ({
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
    })), i = xt({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), o = T(() => s.chartWidth - s.chartMargin * 2), r = T(() => s.chartHeight - s.chartMargin - s.chartBottomMargin), l = T(() => o.value / 10 * 0.6), d = T(() => {
      if (!s.histogram || s.histogram.length === 0) return 1;
      const H = Math.max(...s.histogram.map((N) => N.count || 0), 1), W = Math.max(1, Math.ceil(H * 0.2));
      return H + W;
    }), h = T(() => {
      if (!s.histogram || s.histogram.length === 0) return 1;
      const H = s.averageScore || 0;
      let W = 0, N = 0;
      if (s.histogram.forEach((at) => {
        const ot = at.count || 0;
        W += ot;
        const ut = at.score - H;
        N += ot * (ut * ut);
      }), W === 0) return 1;
      const Z = N / W;
      return Math.sqrt(Z) || 1;
    }), u = (H, W, N) => {
      if (N === 0) return 0;
      const Z = 1 / (N * Math.sqrt(2 * Math.PI)), at = -0.5 * Math.pow((H - W) / N, 2);
      return Z * Math.exp(at);
    }, f = T(() => {
      if (!s.histogram || s.histogram.length === 0 || s.averageScore === 0 && h.value === 0) return null;
      const H = s.averageScore, W = h.value, N = 100, at = Math.max(...s.histogram.map((dt) => dt.count || 0), 1) / d.value * r.value;
      if (at <= 0) return null;
      let ot = 0;
      for (let dt = 0; dt <= N; dt++) {
        const Vt = 1 + 9 * (dt / N), de = u(Vt, H, W);
        de > ot && (ot = de);
      }
      if (ot <= 0) return null;
      const ut = at / ot, Mt = [];
      for (let dt = 0; dt <= N; dt++) {
        const Vt = 1 + 9 * (dt / N), de = u(Vt, H, W) * ut, je = g(Vt);
        if (je !== null) {
          const Vi = s.chartHeight - s.chartBottomMargin - de;
          Mt.push(`${dt === 0 ? "M" : "L"} ${je} ${Vi}`);
        }
      }
      return Mt.join(" ");
    }), p = T(() => {
      if (!s.histogram || s.histogram.length === 0) return [];
      const H = o.value / 10;
      return s.histogram.map((W, N) => {
        const Z = s.chartMargin + (N + 0.5) * H, at = W.count > 0 ? W.count / d.value * r.value : 0, ot = s.chartHeight - s.chartBottomMargin - at;
        return {
          score: W.score,
          count: W.count,
          x: Z,
          y: ot,
          height: at
        };
      });
    }), g = (H) => {
      if (H < 1 || H > 10) return null;
      const W = o.value / 10;
      return s.chartMargin + (H - 0.5) * W;
    }, b = T(() => g(s.minScore)), m = T(() => g(s.maxScore)), v = T(() => g(s.q1Score)), _ = T(() => g(s.medianScore)), k = T(() => g(s.q3Score)), S = T(() => g(s.averageScore)), M = T(() => s.minScore), C = T(() => s.maxScore), $ = T(() => s.q1Score), A = T(() => s.medianScore), E = T(() => s.q3Score), L = T(() => s.averageScore), D = T(() => {
      const H = [], W = s.chartMargin - 8, N = 18;
      v.value !== null && H.push({
        x: v.value,
        y: W,
        value: s.q1Score,
        label: `Q1: ${$.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), _.value !== null && H.push({
        x: _.value,
        y: W - N,
        value: s.medianScore,
        label: `Median: ${A.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), S.value !== null && H.push({
        x: S.value,
        y: W - N,
        value: s.averageScore,
        label: `Avg: ${L.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), k.value !== null && H.push({
        x: k.value,
        y: W,
        value: s.q3Score,
        label: `Q3: ${E.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), H.sort((ot, ut) => (ot.x || 0) - (ut.x || 0));
      const Z = [[], [], []];
      H.forEach((ot) => {
        if (ot.x === null) return;
        let ut = -1;
        for (let Mt = 0; Mt < Z.length; Mt++) {
          let dt = !1;
          for (const Vt of Z[Mt]) {
            if (Vt.x === null) continue;
            const de = Math.abs(ot.x - Vt.x), je = (ot.width + Vt.width) / 2 + 10;
            if (de < je) {
              dt = !0;
              break;
            }
          }
          if (!dt) {
            ut = Mt;
            break;
          }
        }
        ut === -1 && (ut = Z.length - 1), ot.y = W - ut * N, Z[ut].push(ot);
      });
      const at = 15;
      return H.forEach((ot) => {
        ot.y < at && (ot.y = at);
      }), H;
    }), B = (H) => D.value.find((N) => N.id === H)?.y || s.chartMargin - 10, O = T(() => {
      const H = [];
      for (let N = 0; N <= 5; N++) {
        const Z = Math.round(d.value / 5 * N), at = s.chartHeight - s.chartBottomMargin - N / 5 * r.value;
        H.push({ value: Z, y: at });
      }
      return H;
    }), P = (H, W) => {
      const N = H.currentTarget.closest("svg");
      if (!N) return;
      const Z = N.getBoundingClientRect(), at = N.createSVGPoint();
      at.x = H.clientX - Z.left, at.y = H.clientY - Z.top;
      const ot = `Score: ${W.score}`, ut = `Count: ${W.count}`, Mt = 120, dt = 48;
      i.value = {
        visible: !0,
        x: at.x,
        y: at.y - 20,
        title: ot,
        text: ut,
        width: Mt,
        height: dt
      };
    }, R = (H) => {
      if (i.value.visible) {
        const W = H.currentTarget, N = W.getBoundingClientRect(), Z = W.createSVGPoint();
        Z.x = H.clientX - N.left, Z.y = H.clientY - N.top, i.value.x = Z.x, i.value.y = Z.y - 20;
      }
    }, q = () => {
      i.value.visible = !1;
    }, st = () => {
      i.value.visible = !1;
    };
    return t({ isDark: a }), (H, W) => (y(), x("div", Eu, [
      (y(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: mt(`min-height: ${e.chartHeight}px;`),
        onMousemove: R,
        onMouseleave: q
      }, [
        i.value.visible ? (y(), x("g", {
          key: 0,
          transform: `translate(${i.value.x}, ${i.value.y})`
        }, [
          c("rect", {
            x: -i.value.width / 2,
            y: -i.value.height - 10,
            width: i.value.width,
            height: i.value.height,
            fill: n.value.tooltipBg,
            rx: "8",
            stroke: n.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, Iu),
          c("text", {
            x: "0",
            y: -i.value.height + 8,
            "text-anchor": "middle",
            fill: n.value.tooltipText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, w(i.value.title), 9, zu),
          c("text", {
            x: "0",
            y: -i.value.height + 26,
            "text-anchor": "middle",
            fill: n.value.tooltipTextSecondary,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, w(i.value.text), 9, Wu)
        ], 8, Ru)) : I("", !0),
        (y(!0), x(Y, null, et(O.value, (N, Z) => (y(), x("line", {
          key: `grid-${Z}`,
          x1: e.chartMargin,
          y1: N.y,
          x2: e.chartWidth - e.chartMargin,
          y2: N.y,
          stroke: n.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Nu))), 128)),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, Hu),
        c("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: n.value.axis
        }, null, 8, ju),
        (y(!0), x(Y, null, et(O.value, (N, Z) => (y(), x(Y, {
          key: `y-tick-${Z}`
        }, [
          c("line", {
            x1: e.chartMargin - 6,
            y1: N.y,
            x2: e.chartMargin,
            y2: N.y,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Vu),
          c("text", {
            x: e.chartMargin - 12,
            y: N.y + 4,
            "text-anchor": "end",
            fill: n.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, w(N.value), 9, Yu)
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
        }, " Count ", 8, qu),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, Uu),
        c("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: n.value.axis
        }, null, 8, Ku),
        (y(!0), x(Y, null, et(p.value, (N, Z) => (y(), x(Y, {
          key: `tick-${Z}`
        }, [
          c("line", {
            x1: N.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: N.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Xu),
          c("text", {
            x: N.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: n.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, w(N.score), 9, Gu)
        ], 64))), 128)),
        c("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: n.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, Zu),
        f.value ? (y(), x("path", {
          key: 1,
          d: f.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, Qu)) : I("", !0),
        (y(!0), x(Y, null, et(p.value, (N, Z) => (y(), x("rect", {
          key: `bar-${Z}`,
          x: N.x - l.value / 2,
          y: N.y,
          width: l.value,
          height: N.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (at) => P(at, N),
          onMouseleave: st,
          style: { cursor: "pointer" }
        }, null, 40, Ju))), 128)),
        b.value ? (y(), x("line", {
          key: 2,
          x1: b.value,
          y1: e.chartMargin,
          x2: b.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, tf)) : I("", !0),
        b.value ? (y(), x("text", {
          key: 3,
          x: b.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + w(M.value.toFixed(1)), 9, ef)) : I("", !0),
        v.value ? (y(), x("line", {
          key: 4,
          x1: v.value,
          y1: e.chartMargin,
          x2: v.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, sf)) : I("", !0),
        v.value ? (y(), x("text", {
          key: 5,
          x: v.value,
          y: B("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + w($.value.toFixed(1)), 9, af)) : I("", !0),
        _.value ? (y(), x("line", {
          key: 6,
          x1: _.value,
          y1: e.chartMargin,
          x2: _.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, nf)) : I("", !0),
        _.value ? (y(), x("text", {
          key: 7,
          x: _.value,
          y: B("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + w(A.value.toFixed(1)), 9, of)) : I("", !0),
        S.value ? (y(), x("line", {
          key: 8,
          x1: S.value,
          y1: e.chartMargin,
          x2: S.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, rf)) : I("", !0),
        S.value ? (y(), x("text", {
          key: 9,
          x: S.value,
          y: B("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + w(L.value.toFixed(1)), 9, lf)) : I("", !0),
        k.value ? (y(), x("line", {
          key: 10,
          x1: k.value,
          y1: e.chartMargin,
          x2: k.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#7c3aed",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, cf)) : I("", !0),
        k.value ? (y(), x("text", {
          key: 11,
          x: k.value,
          y: B("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + w(E.value.toFixed(1)), 9, df)) : I("", !0),
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
        }, null, 8, hf)) : I("", !0),
        m.value ? (y(), x("text", {
          key: 13,
          x: m.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + w(C.value.toFixed(1)), 9, uf)) : I("", !0),
        e.showLegend ? (y(), x("g", {
          key: 14,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          c("g", gf, [
            W[0] || (W[0] = c("line", {
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
            }, " Gaussian ", 8, pf)
          ]),
          c("g", bf, [
            W[1] || (W[1] = c("line", {
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
            }, " Min ", 8, mf)
          ]),
          c("g", vf, [
            W[2] || (W[2] = c("line", {
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
            }, " Q1 ", 8, _f)
          ]),
          c("g", yf, [
            W[3] || (W[3] = c("line", {
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
            }, " Median ", 8, xf)
          ]),
          c("g", kf, [
            W[4] || (W[4] = c("line", {
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
            }, " Avg ", 8, Mf)
          ]),
          c("g", Sf, [
            W[5] || (W[5] = c("line", {
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
            }, " Q3 ", 8, wf)
          ]),
          c("g", Cf, [
            W[6] || (W[6] = c("line", {
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
            }, " Max ", 8, $f)
          ])
        ], 8, ff)) : I("", !0)
      ], 44, Ou))
    ]));
  }
}), Ni = /* @__PURE__ */ K(Df, [["__scopeId", "data-v-64e657d9"]]), Af = { class: "chart-container" }, Tf = {
  key: 1,
  class: "chart-wrapper"
}, Bf = /* @__PURE__ */ G({
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
    ua.use([Ki, Xi, Gi, Zi]);
    const s = e, { isDark: a, colors: n } = J(Q(s, "theme")), i = xt(null), o = xt(!0), r = xt(!1);
    let l = null;
    const d = {
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
      const k = s.data.links.filter(
        ($) => $.source && $.target && typeof $.value == "number"
      ), S = Math.max(...k.map(($) => $.value), 1), M = Math.max(1, S * 0.01), C = k.map(($) => ({
        ...$,
        originalValue: $.value,
        value: $.value < S * 0.01 ? M : $.value
      }));
      return {
        nodes: s.data.nodes.filter(($) => $.name),
        links: C
      };
    }, f = (k) => k.map((S, M) => ({
      ...S,
      itemStyle: {
        color: s.nodeColors[S.name] || h[M % h.length],
        borderRadius: 8
      }
    })), p = (k) => (S) => {
      const M = S.dataType === "node", C = n.value.tooltipText, $ = a.value ? "#d1d5db" : "#e2e8f0";
      if (M) {
        const B = k.filter((R) => R.target === S.name), O = k.filter((R) => R.source === S.name), P = B.length > 0 ? B.reduce((R, q) => R + (q.originalValue || q.value), 0) : O.reduce((R, q) => R + (q.originalValue || q.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${C};">${S.name}</div><div style="color: ${$}; font-size: 12px;">Count: ${P.toLocaleString()}</div>`;
      }
      const A = S.data?.source || S.source || "Unknown", E = S.data?.target || S.target || "Unknown", L = S.data?.originalValue || S.data?.value || S.value || 0, D = S.data?.label || `${L.toLocaleString()}`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${C};">${A} → ${E}</div><div style="color: ${$}; font-size: 12px;">Flow: ${D}</div>`;
    }, g = () => {
      if (!(!l || !s.data.nodes?.length || !s.data.links?.length))
        try {
          const { nodes: k, links: S } = u(), M = f(k), C = {
            tooltip: {
              trigger: "item",
              triggerOn: "mousemove",
              formatter: p(S),
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
                data: M,
                links: S,
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
                  formatter: ($) => {
                    const A = $.name || "";
                    return A.length > 15 ? `${A.substring(0, 15)}...` : A;
                  }
                },
                edgeLabel: {
                  show: !0,
                  fontSize: 11,
                  color: n.value.textSecondary,
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  formatter: ($) => {
                    const A = $.data?.originalValue || $.value || 0;
                    return $.data?.label || `${A.toLocaleString()}`;
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
          l.setOption(C);
        } catch (k) {
          console.error("Error setting Sankey chart options:", k), r.value = !0;
        }
    }, b = async () => {
      if (i.value)
        try {
          l = ua.init(i.value), g(), window.addEventListener("resize", v);
        } catch (k) {
          console.error("Error initializing Sankey chart:", k), r.value = !0;
        } finally {
          o.value = !1;
        }
    }, m = async (k = 40) => {
      await Nn();
      for (let S = 0; S < k; S++) {
        if (i.value?.clientWidth && i.value.clientWidth > 0 && i.value?.clientHeight && i.value.clientHeight > 0)
          return await b();
        await new Promise((M) => setTimeout(M, 50));
      }
      await b(), setTimeout(v, 50);
    }, v = () => l?.resize(), _ = () => {
      window.removeEventListener("resize", v), l && (l.dispose(), l = null);
    };
    return us(() => i.value && m()), qi(_), Ht(() => s.data, g, { deep: !0 }), Ht(a, g), t({ isDark: a }), (k, S) => (y(), x("div", Af, [
      r.value ? (y(), x("div", {
        key: 0,
        class: "error-state",
        style: mt({ height: e.height })
      }, [...S[0] || (S[0] = [
        j('<div class="error-content" data-v-d6d61034><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d6d61034><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-d6d61034></path></svg><p class="error-title" data-v-d6d61034>Chart could not be loaded</p><p class="error-description" data-v-d6d61034>Please check the data format.</p></div>', 1)
      ])], 4)) : (y(), x("div", Tf, [
        da(c("div", {
          ref_key: "chartEl",
          ref: i,
          class: "chart-content",
          style: mt({ height: e.height })
        }, null, 4), [
          [ha, !o.value]
        ]),
        da(c("div", {
          class: "loading-state",
          style: mt({ height: e.height })
        }, [...S[1] || (S[1] = [
          j('<div class="loading-container" data-v-d6d61034><div class="sankey-loader" data-v-d6d61034><div class="flow flow-1" data-v-d6d61034></div><div class="flow flow-2" data-v-d6d61034></div><div class="flow flow-3" data-v-d6d61034></div><div class="flow flow-4" data-v-d6d61034></div></div><p class="loading-text" data-v-d6d61034>Loading Sankey diagram...</p></div>', 1)
        ])], 4), [
          [ha, o.value]
        ])
      ]))
    ]));
  }
}), Qt = /* @__PURE__ */ K(Bf, [["__scopeId", "data-v-d6d61034"]]);
function Ff(e, t) {
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
function Pf(e, t) {
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
function $t(e, t) {
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
function Lf(e, t) {
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
function En(e, t) {
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
function Ef(e, t) {
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
function Of(e, t) {
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
function Rf(e, t) {
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
function If(e, t) {
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
const zf = { class: "chart-footer" }, Wf = { class: "export-actions" }, Nf = { class: "export-buttons" }, Hf = ["disabled"], jf = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Vf = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Yf = ["disabled"], qf = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Uf = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Kf = /* @__PURE__ */ G({
  __name: "FooterExport",
  props: {
    formats: { default: () => ["pdf", "csv"] },
    loading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const s = e, a = t, n = (o) => s.formats.includes(o), i = (o) => {
      s.loading || a("export", o);
    };
    return (o, r) => (y(), x("footer", zf, [
      r[9] || (r[9] = c("div", { class: "footer-divider" }, null, -1)),
      c("div", Wf, [
        r[8] || (r[8] = c("span", { class: "export-label" }, "Export", -1)),
        c("div", Nf, [
          n("pdf") ? (y(), x("button", {
            key: 0,
            type: "button",
            class: Pe(["export-btn", { "is-loading": e.loading }]),
            disabled: e.loading,
            title: "Download PDF",
            onClick: r[0] || (r[0] = (l) => i("pdf"))
          }, [
            e.loading ? (y(), x("svg", jf, [...r[2] || (r[2] = [
              c("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                "stroke-opacity": "0.25"
              }, null, -1),
              c("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
            ])])) : (y(), x("svg", Vf, [...r[3] || (r[3] = [
              j('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-672661d4></path><polyline points="14 2 14 8 20 8" data-v-672661d4></polyline><line x1="16" y1="13" x2="8" y2="13" data-v-672661d4></line><line x1="16" y1="17" x2="8" y2="17" data-v-672661d4></line><polyline points="10 9 9 9 8 9" data-v-672661d4></polyline>', 5)
            ])])),
            r[4] || (r[4] = c("span", null, "PDF", -1))
          ], 10, Hf)) : I("", !0),
          n("csv") ? (y(), x("button", {
            key: 1,
            type: "button",
            class: Pe(["export-btn", { "is-loading": e.loading }]),
            disabled: e.loading,
            title: "Download CSV",
            onClick: r[1] || (r[1] = (l) => i("csv"))
          }, [
            e.loading ? (y(), x("svg", qf, [...r[5] || (r[5] = [
              c("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                "stroke-opacity": "0.25"
              }, null, -1),
              c("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
            ])])) : (y(), x("svg", Uf, [...r[6] || (r[6] = [
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
          ], 10, Yf)) : I("", !0)
        ])
      ])
    ]));
  }
}), ft = /* @__PURE__ */ K(Kf, [["__scopeId", "data-v-672661d4"]]), Xf = { class: "agents-per-day-card" }, Gf = {
  key: 0,
  class: "card-body"
}, Zf = {
  key: 0,
  class: "chart-section"
}, Qf = {
  key: 1,
  class: "empty-state"
}, Jf = { class: "empty-state-content" }, tg = { class: "empty-icon-wrapper" }, eg = {
  key: 1,
  class: "loading-state"
}, sg = /* @__PURE__ */ G({
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
    }, n = e, i = s, o = (f) => {
      i("export", f);
    }, { isDark: r, colors: l } = J(Q(n, "theme")), d = (f) => {
      const p = new Date(f), g = String(p.getDate()).padStart(2, "0"), b = String(p.getMonth() + 1).padStart(2, "0");
      return `${g}-${b}`;
    }, h = T(() => {
      const f = n.data?.agents_by_day || {}, p = Object.keys(f).sort();
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const g = p.map((k) => d(k)), b = /* @__PURE__ */ new Set();
      for (const k of Object.values(f))
        for (const S of Object.keys(k))
          b.add(S);
      const m = Array.from(b), v = (k) => k, _ = m.map((k) => ({
        label: k,
        data: p.map((S) => f[S]?.[k] || 0),
        backgroundColor: `${a[k] || "#94a3b8"}80`,
        borderColor: v(a[k] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: g,
        datasets: _
      };
    }), u = T(() => n.options ? n.options : {
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
    return t({ isDark: r }), (f, p) => (y(), x("article", Xf, [
      p[3] || (p[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Agents Total Messages per Day"),
          c("p", { class: "card-subtitle" }, "Daily agent interactions (stacked)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", eg, [...p[2] || (p[2] = [
        j('<div class="loading-container" data-v-4d18c22c><div class="chart-lines-loader" data-v-4d18c22c><div class="line line-1" data-v-4d18c22c></div><div class="line line-2" data-v-4d18c22c></div><div class="line line-3" data-v-4d18c22c></div><div class="line line-4" data-v-4d18c22c></div><div class="line line-5" data-v-4d18c22c></div></div><p class="loading-text" data-v-4d18c22c>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", Gf, [
        h.value.labels && h.value.labels.length ? (y(), x("section", Zf, [
          V(Gt, {
            data: h.value,
            options: u.value,
            stacked: !0
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), lt(F(ft), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (y(), x("section", Qf, [
          c("div", Jf, [
            c("div", tg, [
              V(F($t), { class: "empty-icon" })
            ]),
            p[0] || (p[0] = c("p", { class: "empty-title" }, "No agents data per day", -1)),
            p[1] || (p[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see daily agent interactions.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), ag = /* @__PURE__ */ K(sg, [["__scopeId", "data-v-4d18c22c"]]), z = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), rt = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), ng = { class: "booking-manager-card" }, ig = { class: "card-header" }, og = { class: "header-content" }, rg = {
  key: 0,
  class: "payment-success-badge"
}, lg = { class: "badge-value" }, cg = {
  key: 0,
  class: "loading-state"
}, dg = {
  key: 1,
  class: "error-state"
}, hg = { class: "error-content" }, ug = { class: "error-description" }, fg = {
  key: 2,
  class: "card-body"
}, gg = { class: "chart-section" }, pg = { class: "chart-wrapper" }, bg = {
  key: 0,
  class: "table-section"
}, mg = { class: "table-wrapper" }, vg = { class: "data-table" }, _g = { class: "table-body" }, yg = { class: "table-cell font-medium" }, xg = { class: "table-cell text-center" }, kg = { class: "table-cell text-center" }, Mg = { class: "percentage-text" }, Sg = { class: "table-cell text-center" }, wg = { class: "table-cell" }, Cg = { class: "badges-container" }, $g = { class: "badge badge-success" }, Dg = { class: "badge badge-error" }, Ag = { class: "table-cell" }, Tg = { class: "badges-container" }, Bg = { class: "badge badge-error" }, Fg = { class: "badge badge-warning" }, Pg = { class: "badge badge-yellow" }, Lg = { class: "badge badge-error" }, Eg = {
  key: 1,
  class: "empty-state"
}, Og = /* @__PURE__ */ G({
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
    const s = e, a = t, n = (d) => {
      a("export", d);
    }, i = T(() => s.data?.booking_manager_by_day ? [...s.data.booking_manager_by_day].sort(
      (d, h) => new Date(d.date).getTime() - new Date(h.date).getTime()
    ) : []), o = T(() => {
      const d = s.data, h = d.total_booking_initiated || 0, u = d.total_booking_started || 0, f = d.total_payment_initiated || 0, p = d.total_not_found || 0, g = d.total_cancelled || 0, b = d.total_no_pending_balance || 0, m = d.total_errors || 0, v = d.total_payment_success || 0, _ = d.total_payment_failed || 0, k = Math.max(0, h - u), S = Math.max(0, u - f - p - g - b - m), M = (A, E) => {
        const L = E > 0 ? Math.round(A / E * 100) : 0;
        return `${A.toLocaleString()} (${L}%)`;
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
        label: M(u, h)
      }), k > 0 && $.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: k,
        label: M(k, h)
      }), f > 0 && $.push({
        source: "Started",
        target: "Payment Initiated",
        value: f,
        label: M(f, u)
      }), p > 0 && $.push({
        source: "Started",
        target: "Not Found",
        value: p,
        label: M(p, u)
      }), g > 0 && $.push({
        source: "Started",
        target: "Cancelled",
        value: g,
        label: M(g, u)
      }), b > 0 && $.push({
        source: "Started",
        target: "No Pending Balance",
        value: b,
        label: M(b, u)
      }), m > 0 && $.push({
        source: "Started",
        target: "Errors",
        value: m,
        label: M(m, u)
      }), S > 0 && $.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: S,
        label: M(S, u)
      }), v > 0 && $.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: v,
        label: M(v, f)
      }), _ > 0 && $.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: _,
        label: M(_, f)
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
    }, l = (d, h) => !h || h === 0 ? "0%" : `${Math.round(d / h * 100)}%`;
    return (d, h) => (y(), x("article", ng, [
      c("header", ig, [
        c("div", og, [
          h[1] || (h[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Booking Manager Metrics"),
            c("p", { class: "card-subtitle" }, "Booking manager workflow tracking and analysis")
          ], -1)),
          s.loading ? I("", !0) : (y(), x("div", rg, [
            h[0] || (h[0] = c("p", { class: "badge-label" }, "Payment Success", -1)),
            c("p", lg, w(F(z)(s.data.total_payment_success || 0)), 1)
          ]))
        ])
      ]),
      s.loading ? (y(), x("div", cg, [...h[2] || (h[2] = [
        j('<div class="loading-container" data-v-5c06c864><div class="chart-flow-loader" data-v-5c06c864><div class="flow-line flow-1" data-v-5c06c864></div><div class="flow-line flow-2" data-v-5c06c864></div><div class="flow-line flow-3" data-v-5c06c864></div><div class="flow-line flow-4" data-v-5c06c864></div><div class="flow-line flow-5" data-v-5c06c864></div></div><p class="loading-text" data-v-5c06c864>Loading booking data...</p></div>', 1)
      ])])) : s.error ? (y(), x("div", dg, [
        c("div", hg, [
          h[3] || (h[3] = c("div", { class: "error-icon-wrapper" }, [
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
          h[4] || (h[4] = c("p", { class: "error-title" }, "Error loading data", -1)),
          c("p", ug, w(s.error), 1)
        ])
      ])) : (y(), x("div", fg, [
        c("section", gg, [
          c("div", pg, [
            V(Qt, {
              data: o.value,
              "node-colors": r,
              height: "500px",
              "node-gap": 15
            }, null, 8, ["data"])
          ])
        ]),
        i.value.length > 0 ? (y(), x("section", bg, [
          h[6] || (h[6] = c("div", { class: "section-header" }, [
            c("h4", { class: "section-title" }, "Daily Overview")
          ], -1)),
          c("div", mg, [
            c("table", vg, [
              h[5] || (h[5] = c("thead", null, [
                c("tr", { class: "table-header-row" }, [
                  c("th", { class: "table-header" }, "Date"),
                  c("th", { class: "table-header" }, "Initiated"),
                  c("th", { class: "table-header" }, "Started"),
                  c("th", { class: "table-header" }, "Payment Initiated"),
                  c("th", { class: "table-header" }, "Payment Results"),
                  c("th", { class: "table-header" }, "Outcomes")
                ])
              ], -1)),
              c("tbody", _g, [
                (y(!0), x(Y, null, et(i.value, (u) => (y(), x("tr", {
                  key: u.date,
                  class: "table-row"
                }, [
                  c("td", yg, w(F(Ct)(u.date).format("DD/MM/YYYY")), 1),
                  c("td", xg, w(F(z)(u.booking_initiated_count)), 1),
                  c("td", kg, [
                    oe(w(F(z)(u.booking_started_count)) + " ", 1),
                    c("span", Mg, " (" + w(l(u.booking_started_count, u.booking_initiated_count)) + ") ", 1)
                  ]),
                  c("td", Sg, w(F(z)(u.payment_initiated_count)), 1),
                  c("td", wg, [
                    c("div", Cg, [
                      c("span", $g, " Success: " + w(u.payment_success_count ? F(z)(u.payment_success_count) : "N/A"), 1),
                      c("span", Dg, " Failed: " + w(u.payment_failed_count ? F(z)(u.payment_failed_count) : "N/A"), 1)
                    ])
                  ]),
                  c("td", Ag, [
                    c("div", Tg, [
                      c("span", Bg, " Not Found: " + w(u.not_found_count ? F(z)(u.not_found_count) : "N/A"), 1),
                      c("span", Fg, " Cancelled: " + w(u.cancelled_count ? F(z)(u.cancelled_count) : "N/A"), 1),
                      c("span", Pg, " No Balance: " + w(u.no_pending_balance_count ? F(z)(u.no_pending_balance_count) : "N/A"), 1),
                      c("span", Lg, " Errors: " + w(u.error_count ? F(z)(u.error_count) : "N/A"), 1)
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), lt(F(ft), {
            key: 0,
            onExport: n,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (y(), x("section", Eg, [...h[7] || (h[7] = [
          j('<div class="empty-state-content" data-v-5c06c864><div class="empty-icon-wrapper" data-v-5c06c864><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-5c06c864><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" data-v-5c06c864></path></svg></div><p class="empty-title" data-v-5c06c864>No booking manager data available</p><p class="empty-description" data-v-5c06c864>No booking manager data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Rg = /* @__PURE__ */ K(Og, [["__scopeId", "data-v-5c06c864"]]), Ig = { class: "checkin-metrics-card" }, zg = {
  key: 0,
  class: "loading-state"
}, Wg = {
  key: 1,
  class: "card-body"
}, Ng = {
  key: 0,
  class: "chart-section"
}, Hg = { class: "chart-wrapper" }, jg = {
  key: 1,
  class: "table-section"
}, Vg = { class: "table-wrapper" }, Yg = { class: "data-table" }, qg = { class: "table-body" }, Ug = { class: "table-cell font-medium" }, Kg = { class: "table-cell text-center" }, Xg = { class: "table-cell text-center" }, Gg = { class: "table-cell text-center" }, Zg = { class: "table-cell text-center" }, Qg = { class: "table-cell text-center" }, Jg = { class: "table-cell text-center" }, tp = { class: "table-cell text-left" }, ep = {
  key: 0,
  class: "failed-steps"
}, sp = { class: "step-name" }, ap = { class: "step-count" }, np = {
  key: 1,
  class: "empty-cell"
}, ip = {
  key: 2,
  class: "empty-state"
}, op = {
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
    }, n = e, i = {
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
      unrecovered_by_step: [],
      unrecovered_by_day: []
    }, r = xt([]), l = T(() => {
      const m = n.data;
      return m && (Array.isArray(m.checkin_by_day) && m.checkin_by_day.length > 0 || (m.total_checkin_initiated ?? 0) > 0) ? { ...i, ...m } : n.checkinData ?? i;
    }), d = T(() => {
      const m = n.data;
      return m && (Array.isArray(m.failed_by_step_by_day) && m.failed_by_step_by_day.length > 0 || Array.isArray(m.unrecovered_by_step) && m.unrecovered_by_step.length > 0) ? {
        ...o,
        total_checkin_failed: m.total_checkin_failed ?? 0,
        total_checkin_unrecovered: m.total_checkin_unrecovered ?? 0,
        failed_by_step_by_day: m.failed_by_step_by_day ?? [],
        unrecovered_by_step: m.unrecovered_by_step ?? [],
        unrecovered_by_day: m.unrecovered_by_day ?? []
      } : n.failedData ?? o;
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
      return (d.value.unrecovered_by_step || []).forEach((_) => {
        const S = _.step_name.replace(/_/g, " ").split(" ").map((C) => C.charAt(0).toUpperCase() + C.slice(1)).join(" "), M = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        m[S] = M[S] || "#DC2626";
      }), m;
    }), u = (m, v) => !v || v === 0 ? "0%" : `${Math.round(m / v * 100)}%`, f = (m, v) => {
      const _ = z(m), k = u(m, v);
      return `${_} (${k})`;
    }, p = (m) => m.reduce((v, _) => v + _.failed_count, 0), g = T(() => {
      const m = [], v = [];
      if (!l.value.total_checkin_initiated)
        return { nodes: m, links: v };
      m.push({ name: "Checkin Init" }), m.push({ name: "Booking retrive" }), m.push({ name: "Booking retrive success" }), m.push({ name: "Number of Passengers" }), m.push({ name: "Completed" }), m.push({ name: "Closed with BP" });
      const _ = l.value.total_checkin_initiated, k = l.value.total_checkin_init, S = l.value.total_checkin_init_abandoned, M = k - S, C = l.value.total_checkin_started, $ = l.value.total_checkin_completed, A = l.value.total_checkin_closed, E = d.value.unrecovered_by_step || [], L = E.reduce((P, R) => P + R.count, 0);
      if (k > 0) {
        const P = Math.round(k / _ * 100);
        v.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: k,
          label: `${k.toLocaleString()} (${P}%)`
        });
      }
      const D = _ - k;
      if (D > 0) {
        const P = Math.round(D / _ * 100);
        m.push({ name: "Abandoned (Init)" }), v.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: D,
          label: `${D.toLocaleString()} (${P}%)`
        });
      }
      if (S > 0) {
        const P = Math.round(S / _ * 100);
        m.push({ name: "Abandoned (Started)" }), v.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: S,
          label: `${S.toLocaleString()} (${P}%)`
        });
      }
      if (M > 0) {
        const P = Math.round(M / _ * 100);
        v.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: M,
          label: `${M.toLocaleString()} (${P}%)`
        });
      }
      if (C > 0) {
        const P = Math.round(C / _ * 100);
        v.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: C,
          label: `${C.toLocaleString()} (${P}%)`
        });
      }
      if ($ > 0) {
        const P = Math.round($ / C * 100);
        v.push({
          source: "Number of Passengers",
          target: "Completed",
          value: $,
          label: `${$.toLocaleString()} (${P}%)`
        });
      }
      if (E.length > 0 && L > 0) {
        m.push({ name: "Unrecovered" });
        const P = Math.round(L / C * 100);
        v.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: L,
          label: `${L.toLocaleString()} (${P}%)`
        }), E.forEach((R) => {
          const st = R.step_name.replace(/_/g, " ").split(" ").map((W) => W.charAt(0).toUpperCase() + W.slice(1)).join(" "), H = Math.round(R.count / C * 100);
          m.push({ name: st }), v.push({
            source: "Unrecovered",
            target: st,
            value: R.count,
            label: `${R.count.toLocaleString()} (${H}%)`
          });
        });
      }
      const B = C - ($ + L);
      if (B > 0) {
        const P = Math.round(B / C * 100);
        m.push({ name: "Abandoned (Flow)" }), v.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: B,
          label: `${B.toLocaleString()} (${P}%)`
        });
      }
      const O = $ - A;
      if (O > 0) {
        const P = Math.round(O / C * 100);
        m.push({ name: "BP Error" }), v.push({
          source: "Completed",
          target: "BP Error",
          value: O,
          label: `${O.toLocaleString()} (${P}%)`
        });
      }
      if (A > 0) {
        const P = Math.round(A / C * 100);
        v.push({
          source: "Completed",
          target: "Closed with BP",
          value: A,
          label: `${A.toLocaleString()} (${P}%)`
        });
      }
      return { nodes: m, links: v };
    }), b = () => {
      const m = l.value.checkin_by_day || [], v = d.value.failed_by_step_by_day || [];
      if (m.length === 0) {
        r.value = [];
        return;
      }
      r.value = [...m].map((_) => {
        const k = v.find(
          (S) => S.date === _.date
        );
        return {
          ..._,
          failed_steps: k?.steps || []
        };
      }), r.value.sort((_, k) => new Date(_.date) - new Date(k.date));
    };
    return Ht(
      [() => n.data, () => n.checkinData, () => n.failedData],
      () => {
        b();
      },
      { deep: !0, immediate: !0 }
    ), (m, v) => (y(), x("article", Ig, [
      v[3] || (v[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Check-in Metrics"),
          c("p", { class: "card-subtitle" }, "Check-in performance and failure analysis")
        ])
      ], -1)),
      n.loading ? (y(), x("div", zg, [...v[0] || (v[0] = [
        j('<div class="loading-container" data-v-d527da09><div class="chart-flow-loader" data-v-d527da09><div class="flow-line flow-1" data-v-d527da09></div><div class="flow-line flow-2" data-v-d527da09></div><div class="flow-line flow-3" data-v-d527da09></div><div class="flow-line flow-4" data-v-d527da09></div><div class="flow-line flow-5" data-v-d527da09></div></div><p class="loading-text" data-v-d527da09>Loading check-in data...</p></div>', 1)
      ])])) : (y(), x("div", Wg, [
        g.value.nodes.length > 0 ? (y(), x("section", Ng, [
          c("div", Hg, [
            V(Qt, {
              data: g.value,
              height: "500px",
              "node-colors": h.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : I("", !0),
        r.value && r.value.length > 0 ? (y(), x("section", jg, [
          c("div", Vg, [
            c("table", Yg, [
              v[1] || (v[1] = c("thead", null, [
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
              c("tbody", qg, [
                (y(!0), x(Y, null, et(r.value, (_) => (y(), x("tr", {
                  key: _.date,
                  class: "table-row"
                }, [
                  c("td", Ug, w(F(Ct)(_.date).format("DD/MM/YYYY")), 1),
                  c("td", Kg, w(F(z)(_.checkin_initiated_count)), 1),
                  c("td", Xg, w(f(_.checkin_init_count, _.checkin_initiated_count)), 1),
                  c("td", Gg, w(F(z)(_.checkin_started_count)), 1),
                  c("td", Zg, w(f(_.checkin_completed_count, _.checkin_started_count)), 1),
                  c("td", Qg, w(f(_.checkin_closed_count, _.checkin_started_count)), 1),
                  c("td", Jg, w(f(p(_.failed_steps), _.checkin_started_count)), 1),
                  c("td", tp, [
                    _.failed_steps && _.failed_steps.length > 0 ? (y(), x("div", ep, [
                      (y(!0), x(Y, null, et(_.failed_steps, (k) => (y(), x("div", {
                        key: k.step_name,
                        class: "failed-step-item"
                      }, [
                        c("span", sp, w(k.step_name.replace(/_/g, " ")) + ":", 1),
                        c("span", ap, w(k.failed_count), 1)
                      ]))), 128))
                    ])) : (y(), x("div", np, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), lt(F(ft), {
            key: 0,
            onExport: a,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (y(), x("section", ip, [...v[2] || (v[2] = [
          j('<div class="empty-state-content" data-v-d527da09><div class="empty-icon-wrapper" data-v-d527da09><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d527da09><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-d527da09></path></svg></div><p class="empty-title" data-v-d527da09>No check-in data available</p><p class="empty-description" data-v-d527da09>Try adjusting the date range or check your filters to see check-in performance data.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}, rp = /* @__PURE__ */ K(op, [["__scopeId", "data-v-d527da09"]]), lp = { class: "checkin-metrics-card" }, cp = {
  key: 0,
  class: "loading-state"
}, dp = {
  key: 1,
  class: "card-body"
}, hp = {
  key: 0,
  class: "sankey-section"
}, up = {
  key: 1,
  class: "table-section"
}, fp = { class: "table-wrapper" }, gp = { class: "data-table" }, pp = { class: "table-body" }, bp = { class: "table-cell date-cell" }, mp = { class: "table-cell text-center" }, vp = { class: "table-cell text-center" }, _p = { class: "table-cell text-center" }, yp = { class: "table-cell text-center" }, xp = { class: "table-cell text-center" }, kp = { class: "table-cell text-center" }, Mp = { class: "table-cell reasons-cell" }, Sp = {
  key: 0,
  class: "reasons-list"
}, wp = { class: "reason-name" }, Cp = { class: "reason-count" }, $p = {
  key: 1,
  class: "no-reasons"
}, Dp = {
  key: 2,
  class: "empty-state"
}, Ap = { class: "empty-state-content" }, Tp = { class: "empty-icon-wrapper" }, Bp = /* @__PURE__ */ G({
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
    const a = e, n = s, i = (m) => {
      n("export", m);
    }, { isDark: o } = J(Q(a, "theme")), r = (m) => m == null ? "0" : m.toLocaleString(), l = (m) => {
      const v = new Date(m), _ = String(v.getDate()).padStart(2, "0"), k = String(v.getMonth() + 1).padStart(2, "0"), S = v.getFullYear();
      return `${_}/${k}/${S}`;
    }, d = (m) => m.replace(/_/g, " ").replace(/\b\w/g, (v) => v.toUpperCase()), h = (m, v) => !v || v === 0 ? "0%" : `${Math.round(m / v * 100)}%`, u = (m, v) => {
      const _ = m || 0, k = v || 0, S = r(_), M = h(_, k);
      return `${S} (${M})`;
    }, f = (m) => m ? m.reduce((v, _) => v + _.failed_count, 0) : 0, p = T(() => {
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
      return (a.failedData?.unrecovered_by_step || []).forEach((_) => {
        const S = _.step_name.replace(/_/g, " ").split(" ").map((C) => C.charAt(0).toUpperCase() + C.slice(1)).join(" "), M = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        m[S] = M[S] || "#DC2626";
      }), m;
    }), g = T(() => {
      const m = a.checkinData?.checkin_by_day || [], v = a.failedData?.failed_by_step_by_day || [];
      return m.map((k) => {
        const S = v.find((M) => M.date === k.date);
        return {
          ...k,
          failed_steps: S?.steps || []
        };
      }).sort((k, S) => new Date(k.date).getTime() - new Date(S.date).getTime());
    }), b = T(() => {
      const m = [], v = [];
      if (!a.checkinData?.total_checkin_initiated)
        return { nodes: m, links: v };
      m.push({ name: "Checkin Init" }), m.push({ name: "Booking retrive" }), m.push({ name: "Booking retrive success" }), m.push({ name: "Number of Passengers" }), m.push({ name: "Completed" }), m.push({ name: "Closed with BP" });
      const _ = a.checkinData.total_checkin_initiated || 0, k = a.checkinData.total_checkin_init || 0, S = a.checkinData.total_checkin_init_abandoned || 0, M = k - S, C = a.checkinData.total_checkin_started || 0, $ = a.checkinData.total_checkin_completed || 0, A = a.checkinData.total_checkin_closed || 0, E = a.failedData?.unrecovered_by_step || [], L = E.reduce((P, R) => P + R.count, 0);
      if (k > 0) {
        const P = Math.round(k / _ * 100);
        v.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: k,
          label: `${k.toLocaleString()} (${P}%)`
        });
      }
      const D = _ - k;
      if (D > 0) {
        const P = Math.round(D / _ * 100);
        m.push({ name: "Abandoned (Init)" }), v.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: D,
          label: `${D.toLocaleString()} (${P}%)`
        });
      }
      if (S > 0) {
        const P = Math.round(S / _ * 100);
        m.push({ name: "Abandoned (Started)" }), v.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: S,
          label: `${S.toLocaleString()} (${P}%)`
        });
      }
      if (M > 0) {
        const P = Math.round(M / _ * 100);
        v.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: M,
          label: `${M.toLocaleString()} (${P}%)`
        });
      }
      if (C > 0) {
        const P = Math.round(C / _ * 100);
        v.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: C,
          label: `${C.toLocaleString()} (${P}%)`
        });
      }
      if ($ > 0) {
        const P = Math.round($ / C * 100);
        v.push({
          source: "Number of Passengers",
          target: "Completed",
          value: $,
          label: `${$.toLocaleString()} (${P}%)`
        });
      }
      if (E.length > 0 && L > 0) {
        m.push({ name: "Unrecovered" });
        const P = Math.round(L / C * 100);
        v.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: L,
          label: `${L.toLocaleString()} (${P}%)`
        }), E.forEach((R) => {
          const st = R.step_name.replace(/_/g, " ").split(" ").map((W) => W.charAt(0).toUpperCase() + W.slice(1)).join(" "), H = Math.round(R.count / C * 100);
          m.push({ name: st }), v.push({
            source: "Unrecovered",
            target: st,
            value: R.count,
            label: `${R.count.toLocaleString()} (${H}%)`
          });
        });
      }
      const B = C - ($ + L);
      if (B > 0) {
        const P = Math.round(B / C * 100);
        m.push({ name: "Abandoned (Flow)" }), v.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: B,
          label: `${B.toLocaleString()} (${P}%)`
        });
      }
      const O = $ - A;
      if (O > 0) {
        const P = Math.round(O / C * 100);
        m.push({ name: "BP Error" }), v.push({
          source: "Completed",
          target: "BP Error",
          value: O,
          label: `${O.toLocaleString()} (${P}%)`
        });
      }
      if (A > 0) {
        const P = Math.round(A / C * 100);
        v.push({
          source: "Completed",
          target: "Closed with BP",
          value: A,
          label: `${A.toLocaleString()} (${P}%)`
        });
      }
      return { nodes: m, links: v };
    });
    return t({ isDark: o }), (m, v) => (y(), x("article", lp, [
      v[4] || (v[4] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Check-in Metrics"),
          c("p", { class: "card-subtitle" }, "Check-in performance and failure analysis")
        ])
      ], -1)),
      e.loading ? (y(), x("div", cp, [...v[0] || (v[0] = [
        j('<div class="loading-container" data-v-8283d36d><div class="chart-bars-loader" data-v-8283d36d><div class="bar bar-1" data-v-8283d36d></div><div class="bar bar-2" data-v-8283d36d></div><div class="bar bar-3" data-v-8283d36d></div><div class="bar bar-4" data-v-8283d36d></div><div class="bar bar-5" data-v-8283d36d></div></div><p class="loading-text" data-v-8283d36d>Loading check-in data...</p></div>', 1)
      ])])) : (y(), x("div", dp, [
        b.value.nodes.length > 0 ? (y(), x("div", hp, [
          V(Qt, {
            data: b.value,
            height: "500px",
            "node-colors": p.value,
            "use-gradient": !1,
            "node-gap": 30
          }, null, 8, ["data", "node-colors"])
        ])) : I("", !0),
        g.value && g.value.length > 0 ? (y(), x("div", up, [
          c("div", fp, [
            c("table", gp, [
              v[1] || (v[1] = c("thead", null, [
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
              c("tbody", pp, [
                (y(!0), x(Y, null, et(g.value, (_) => (y(), x("tr", {
                  key: _.date,
                  class: "table-row"
                }, [
                  c("td", bp, w(l(_.date)), 1),
                  c("td", mp, w(r(_.checkin_initiated_count)), 1),
                  c("td", vp, w(u(_.checkin_init_count, _.checkin_initiated_count)), 1),
                  c("td", _p, w(r(_.checkin_started_count)), 1),
                  c("td", yp, w(u(_.checkin_completed_count, _.checkin_started_count)), 1),
                  c("td", xp, w(u(_.checkin_closed_count, _.checkin_started_count)), 1),
                  c("td", kp, w(u(f(_.failed_steps), _.checkin_started_count)), 1),
                  c("td", Mp, [
                    _.failed_steps && _.failed_steps.length > 0 ? (y(), x("div", Sp, [
                      (y(!0), x(Y, null, et(_.failed_steps, (k) => (y(), x("div", {
                        key: k.step_name,
                        class: "reason-item"
                      }, [
                        c("span", wp, w(d(k.step_name)) + ":", 1),
                        c("span", Cp, w(k.failed_count), 1)
                      ]))), 128))
                    ])) : (y(), x("div", $p, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), lt(F(ft), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (y(), x("div", Dp, [
          c("div", Ap, [
            c("div", Tp, [
              V(F($t), { class: "empty-icon" })
            ]),
            v[2] || (v[2] = c("p", { class: "empty-title" }, "No check-in data available", -1)),
            v[3] || (v[3] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see check-in metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Fp = /* @__PURE__ */ K(Bp, [["__scopeId", "data-v-8283d36d"]]), Pp = { class: "checkin-segments-card" }, Lp = {
  key: 0,
  class: "loading-state"
}, Ep = {
  key: 1,
  class: "card-body"
}, Op = {
  key: 0,
  class: "table-section"
}, Rp = { class: "table-wrapper" }, Ip = { class: "data-table" }, zp = { class: "table-body" }, Wp = { class: "table-cell font-medium text-center" }, Np = { class: "airport-badge" }, Hp = { class: "table-cell text-center" }, jp = {
  key: 0,
  class: "airport-badge connection"
}, Vp = {
  key: 1,
  class: "empty-connection"
}, Yp = { class: "table-cell text-center" }, qp = { class: "airport-badge" }, Up = { class: "table-cell text-center" }, Kp = {
  key: 0,
  class: "trip-badge roundtrip"
}, Xp = {
  key: 1,
  class: "trip-badge oneway"
}, Gp = { class: "table-cell text-center" }, Zp = { class: "table-cell text-center" }, Qp = { class: "percentage-value" }, Jp = { class: "table-cell text-center" }, t0 = { class: "percentage-value" }, e0 = { class: "table-cell text-center" }, s0 = { class: "percentage-value success" }, a0 = {
  key: 1,
  class: "empty-state"
}, n0 = /* @__PURE__ */ G({
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
    const a = e, n = s, i = (h) => {
      n("export", h);
    }, { isDark: o } = J(Q(a, "theme")), r = (h, u) => !u || u === 0 || !h ? "0%" : `${Math.round(h / u * 100)}%`, l = (h) => !h || h === "None" ? "-" : String(h).trim().replace(/_[0-9]+$/i, ""), d = (h) => {
      const u = l(h?.departure_airport), f = l(h?.arrival_airport);
      return u === "-" || f === "-" ? !1 : u === f;
    };
    return t({ isDark: o }), (h, u) => (y(), x("article", Pp, [
      u[5] || (u[5] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Checkin Segments"),
          c("p", { class: "card-subtitle" }, "Breakdown by flight segment with connection when applicable")
        ])
      ], -1)),
      a.loading ? (y(), x("div", Lp, [...u[0] || (u[0] = [
        j('<div class="loading-container" data-v-5f8ce8fa><div class="chart-flow-loader" data-v-5f8ce8fa><div class="flow-line flow-1" data-v-5f8ce8fa></div><div class="flow-line flow-2" data-v-5f8ce8fa></div><div class="flow-line flow-3" data-v-5f8ce8fa></div><div class="flow-line flow-4" data-v-5f8ce8fa></div><div class="flow-line flow-5" data-v-5f8ce8fa></div></div><p class="loading-text" data-v-5f8ce8fa>Loading segment data...</p></div>', 1)
      ])])) : (y(), x("div", Ep, [
        a.data.length > 0 ? (y(), x("section", Op, [
          c("div", Rp, [
            c("table", Ip, [
              u[3] || (u[3] = c("thead", null, [
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
              c("tbody", zp, [
                (y(!0), x(Y, null, et(a.data, (f, p) => (y(), x("tr", {
                  key: p,
                  class: "table-row"
                }, [
                  c("td", Wp, [
                    c("span", Np, w(l(f.departure_airport)), 1)
                  ]),
                  c("td", Hp, [
                    l(f.conexion_airport) !== "-" ? (y(), x("span", jp, w(l(f.conexion_airport)), 1)) : (y(), x("span", Vp, "-"))
                  ]),
                  c("td", Yp, [
                    c("span", qp, w(l(f.arrival_airport)), 1)
                  ]),
                  c("td", Up, [
                    d(f) ? (y(), x("span", Kp, [...u[1] || (u[1] = [
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
                      oe(" Roundtrip ", -1)
                    ])])) : (y(), x("span", Xp, [...u[2] || (u[2] = [
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
                      oe(" One way ", -1)
                    ])]))
                  ]),
                  c("td", Gp, w(F(z)(f.segment_init_count)), 1),
                  c("td", Zp, [
                    c("span", Qp, w(r(f.segment_started_count, f.segment_init_count)), 1)
                  ]),
                  c("td", Jp, [
                    c("span", t0, w(r(f.segment_completed_count, f.segment_init_count)), 1)
                  ]),
                  c("td", e0, [
                    c("span", s0, w(r(f.segment_closed_count, f.segment_init_count)), 1)
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), lt(F(ft), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (y(), x("section", a0, [...u[4] || (u[4] = [
          j('<div class="empty-state-content" data-v-5f8ce8fa><div class="empty-icon-wrapper" data-v-5f8ce8fa><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-5f8ce8fa><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-5f8ce8fa></path></svg></div><p class="empty-title" data-v-5f8ce8fa>No segment data available</p><p class="empty-description" data-v-5f8ce8fa>No flight segment data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), i0 = /* @__PURE__ */ K(n0, [["__scopeId", "data-v-5f8ce8fa"]]), o0 = { class: "disruption-metrics-card" }, r0 = { class: "card-header" }, l0 = { class: "header-content" }, c0 = {
  key: 0,
  class: "payment-success-badge"
}, d0 = { class: "badge-value" }, h0 = {
  key: 0,
  class: "loading-state"
}, u0 = {
  key: 1,
  class: "card-body"
}, f0 = { class: "chart-section" }, g0 = { class: "chart-wrapper" }, p0 = {
  key: 1,
  class: "empty-chart"
}, b0 = {
  key: 0,
  class: "table-section"
}, m0 = { class: "table-wrapper" }, v0 = { class: "data-table" }, _0 = { class: "table-body" }, y0 = { class: "table-cell font-medium text-center" }, x0 = { class: "table-cell text-center" }, k0 = { class: "table-cell text-center" }, M0 = { class: "percentage-text" }, S0 = { class: "table-cell text-center" }, w0 = { class: "abandoned-value" }, C0 = { class: "table-cell" }, $0 = { class: "badges-container badges-wrap" }, D0 = { class: "badge badge-vol" }, A0 = { class: "badge badge-confirm" }, T0 = { class: "badge badge-not-confirm" }, B0 = { class: "badge badge-reject" }, F0 = { class: "badge badge-not-paid" }, P0 = { class: "badge badge-success" }, L0 = { class: "table-cell" }, E0 = { class: "badges-container badges-wrap" }, O0 = { class: "badge badge-inv" }, R0 = { class: "badge badge-human" }, I0 = { class: "badge badge-accept" }, z0 = {
  key: 1,
  class: "empty-state"
}, W0 = /* @__PURE__ */ G({
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
    const s = e, a = t, n = (d) => {
      a("export", d);
    }, i = T(() => s.data?.disruption_by_day ? [...s.data.disruption_by_day].sort(
      (d, h) => new Date(d.date).getTime() - new Date(h.date).getTime()
    ) : []), o = (d, h) => !h || h === 0 ? "0%" : `${Math.round(d / h * 100)}%`, r = T(() => {
      const d = s.data, h = d.total_disruption_conversations || 0, u = d.total_disruption_initiated || 0, f = d.total_voluntary || 0, p = d.total_involuntary || 0, g = d.total_accepted || 0, b = d.total_confirmed || 0, m = d.total_sell_success || 0, v = d.total_sell_failed || 0, _ = Math.max(0, h - u), k = Math.max(0, u - f - p), S = Math.max(0, p - g), M = Math.max(0, f - b), C = v, $ = Math.max(0, b - m - C), A = (D, B) => {
        const O = B > 0 ? Math.round(D / B * 100) : 0;
        return `${D.toLocaleString()} (${O}%)`;
      }, E = [
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
      ], L = [];
      return u > 0 && L.push({
        source: "Initiated",
        target: "Started",
        value: u,
        label: A(u, h)
      }), _ > 0 && L.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: _,
        label: A(_, h)
      }), f > 0 && L.push({
        source: "Started",
        target: "Voluntary",
        value: f,
        label: A(f, h)
      }), p > 0 && L.push({
        source: "Started",
        target: "Involuntary",
        value: p,
        label: A(p, h)
      }), k > 0 && L.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: k,
        label: A(k, h)
      }), g > 0 && L.push({
        source: "Involuntary",
        target: "Accepted",
        value: g,
        label: A(g, h)
      }), S > 0 && L.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: S,
        label: A(S, h)
      }), b > 0 && L.push({
        source: "Voluntary",
        target: "Confirmed",
        value: b,
        label: A(b, h)
      }), M > 0 && L.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: M,
        label: A(M, h)
      }), m > 0 && L.push({
        source: "Confirmed",
        target: "Paid",
        value: m,
        label: A(m, h)
      }), C > 0 && L.push({
        source: "Confirmed",
        target: "Rejected",
        value: C,
        label: A(C, h)
      }), $ > 0 && L.push({
        source: "Confirmed",
        target: "Not Paid",
        value: $,
        label: A($, h)
      }), { nodes: E, links: L };
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
    return (d, h) => (y(), x("article", o0, [
      c("header", r0, [
        c("div", l0, [
          h[1] || (h[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Disruption Manager Metrics"),
            c("p", { class: "card-subtitle" }, "Disruption workflow performance and completion tracking")
          ], -1)),
          s.loading ? I("", !0) : (y(), x("div", c0, [
            h[0] || (h[0] = c("p", { class: "badge-label" }, "Payment Success", -1)),
            c("p", d0, w(F(z)(s.data.total_payment_success || 0)), 1)
          ]))
        ])
      ]),
      s.loading ? (y(), x("div", h0, [...h[2] || (h[2] = [
        j('<div class="loading-container" data-v-5ac5f6fe><div class="chart-bars-loader" data-v-5ac5f6fe><div class="bar bar-1" data-v-5ac5f6fe></div><div class="bar bar-2" data-v-5ac5f6fe></div><div class="bar bar-3" data-v-5ac5f6fe></div><div class="bar bar-4" data-v-5ac5f6fe></div><div class="bar bar-5" data-v-5ac5f6fe></div></div><p class="loading-text" data-v-5ac5f6fe>Loading disruption data...</p></div>', 1)
      ])])) : (y(), x("div", u0, [
        c("section", f0, [
          c("div", g0, [
            r.value.nodes.length > 0 && r.value.links.length > 0 ? (y(), lt(Qt, {
              key: 0,
              data: r.value,
              "node-colors": l,
              height: "500px"
            }, null, 8, ["data"])) : (y(), x("div", p0, [...h[3] || (h[3] = [
              c("p", { class: "empty-chart-text" }, "No disruption data available for visualization", -1)
            ])]))
          ])
        ]),
        i.value && i.value.length > 0 ? (y(), x("section", b0, [
          h[5] || (h[5] = j('<div class="section-header" data-v-5ac5f6fe><h4 class="section-title" data-v-5ac5f6fe>Daily Overview</h4></div><div class="legend-container" data-v-5ac5f6fe><p class="legend-title" data-v-5ac5f6fe>Legend</p><div class="legend-items" data-v-5ac5f6fe><div class="legend-group" data-v-5ac5f6fe><span class="legend-label" data-v-5ac5f6fe>Voluntary:</span><span class="badge badge-vol" data-v-5ac5f6fe>VOL</span></div><div class="legend-group" data-v-5ac5f6fe><span class="legend-label" data-v-5ac5f6fe>Involuntary:</span><span class="badge badge-inv" data-v-5ac5f6fe>INV</span></div><div class="legend-note" data-v-5ac5f6fe><span data-v-5ac5f6fe>Vol=Voluntary</span><span data-v-5ac5f6fe>•</span><span data-v-5ac5f6fe>Inv=Involuntary</span></div></div></div>', 2)),
          c("div", m0, [
            c("table", v0, [
              h[4] || (h[4] = c("thead", null, [
                c("tr", { class: "table-header-row" }, [
                  c("th", { class: "table-header" }, "Date"),
                  c("th", { class: "table-header" }, "Initiated"),
                  c("th", { class: "table-header" }, "Started"),
                  c("th", { class: "table-header" }, "Abandoned (%)"),
                  c("th", { class: "table-header" }, "Voluntary"),
                  c("th", { class: "table-header" }, "Involuntary")
                ])
              ], -1)),
              c("tbody", _0, [
                (y(!0), x(Y, null, et(i.value, (u) => (y(), x("tr", {
                  key: u.date,
                  class: "table-row"
                }, [
                  c("td", y0, w(F(Ct)(u.date).format("DD/MM")), 1),
                  c("td", x0, w(F(z)(u.disruption_conversations)), 1),
                  c("td", k0, [
                    oe(w(F(z)(u.disruption_initiated_count)) + " ", 1),
                    c("span", M0, " (" + w(o(u.disruption_initiated_count, u.disruption_conversations)) + ") ", 1)
                  ]),
                  c("td", S0, [
                    c("span", w0, w(F(z)(u.disruption_initiated_count - u.voluntary_count - u.involuntary_count)) + " (" + w(o(u.disruption_initiated_count - u.voluntary_count - u.involuntary_count, u.disruption_conversations)) + ") ", 1)
                  ]),
                  c("td", C0, [
                    c("div", $0, [
                      c("span", D0, " VOL " + w(F(z)(u.voluntary_count)) + " (" + w(o(u.voluntary_count, u.disruption_conversations)) + ") ", 1),
                      c("span", A0, " Confirm " + w(F(z)(u.confirmed_count)) + " (" + w(o(u.confirmed_count, u.disruption_conversations)) + ") ", 1),
                      c("span", T0, " Not Confirm " + w(F(z)(u.voluntary_count - u.confirmed_count)) + " (" + w(o(u.voluntary_count - u.confirmed_count, u.disruption_conversations)) + ") ", 1),
                      c("span", B0, " Reject " + w(F(z)(u.sell_failed_count)) + " (" + w(o(u.sell_failed_count, u.disruption_conversations)) + ") ", 1),
                      c("span", F0, " Not Paid " + w(F(z)(Math.max(0, u.confirmed_count - u.sell_success_count - u.sell_failed_count))) + " (" + w(o(Math.max(0, u.confirmed_count - u.sell_success_count - u.sell_failed_count), u.disruption_conversations)) + ") ", 1),
                      c("span", P0, " Finish " + w(F(z)(u.sell_success_count)) + " (" + w(o(u.sell_success_count, u.disruption_conversations)) + ") ", 1)
                    ])
                  ]),
                  c("td", L0, [
                    c("div", E0, [
                      c("span", O0, " INV " + w(F(z)(u.involuntary_count)) + " (" + w(o(u.involuntary_count, u.disruption_conversations)) + ") ", 1),
                      c("span", R0, " Human " + w(F(z)(u.involuntary_count - u.accepted_count)) + " (" + w(o(u.involuntary_count - u.accepted_count, u.disruption_conversations)) + ") ", 1),
                      c("span", I0, " Accept " + w(F(z)(u.accepted_count)) + " (" + w(o(u.accepted_count, u.disruption_conversations)) + ") ", 1)
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), lt(F(ft), {
            key: 0,
            onExport: n,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (y(), x("section", z0, [...h[6] || (h[6] = [
          j('<div class="empty-state-content" data-v-5ac5f6fe><div class="empty-icon-wrapper" data-v-5ac5f6fe><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-5ac5f6fe><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" data-v-5ac5f6fe></path></svg></div><p class="empty-title" data-v-5ac5f6fe>No disruption data available</p><p class="empty-description" data-v-5ac5f6fe>No disruption data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), N0 = /* @__PURE__ */ K(W0, [["__scopeId", "data-v-5ac5f6fe"]]), H0 = { class: "faq-metrics-card" }, j0 = {
  key: 0,
  class: "card-body"
}, V0 = { class: "kpi-grid" }, Y0 = { class: "kpi-card" }, q0 = { class: "kpi-value" }, U0 = { class: "kpi-card" }, K0 = { class: "kpi-value" }, X0 = { class: "kpi-card kpi-card--airline" }, G0 = { class: "kpi-value" }, Z0 = { class: "kpi-card kpi-card--booking" }, Q0 = { class: "kpi-value" }, J0 = { class: "kpi-card kpi-card--flight" }, tb = { class: "kpi-value" }, eb = {
  key: 0,
  class: "chart-section"
}, sb = {
  key: 1,
  class: "empty-state"
}, ab = {
  key: 1,
  class: "loading-state"
}, nb = /* @__PURE__ */ G({
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
    const a = e, n = s, i = (f) => {
      n("export", f);
    }, { isDark: o, colors: r } = J(Q(a, "theme")), l = xt({ labels: [], datasets: [] }), d = T(() => a.data ?? {
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
    })), u = (f) => {
      if (!f) {
        l.value = { labels: [], datasets: [] };
        return;
      }
      const p = f.faq_by_day || [];
      if (p.length > 0) {
        const g = p.map((_) => Ct(_.date).format("MMM DD")), b = p.map((_) => _.airline_information_retrieved_count || 0), m = p.map((_) => _.flight_status_retrieved_count || 0), v = p.map((_) => _.booking_info_retrieved_count || 0);
        l.value = {
          labels: g,
          datasets: [
            {
              label: "Airline Information",
              data: b,
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
    return Ht(
      () => a.data,
      (f) => {
        u(f ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: o }), (f, p) => (y(), x("article", H0, [
      p[7] || (p[7] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "FAQ Metrics"),
          c("p", { class: "card-subtitle" }, "Daily FAQ consultation and retrieval metrics")
        ])
      ], -1)),
      a.loading ? (y(), x("div", ab, [...p[6] || (p[6] = [
        j('<div class="loading-container" data-v-5d2c3c33><div class="chart-bars-loader" data-v-5d2c3c33><div class="bar bar-1" data-v-5d2c3c33></div><div class="bar bar-2" data-v-5d2c3c33></div><div class="bar bar-3" data-v-5d2c3c33></div><div class="bar bar-4" data-v-5d2c3c33></div><div class="bar bar-5" data-v-5d2c3c33></div></div><p class="loading-text" data-v-5d2c3c33>Loading FAQ metrics...</p></div>', 1)
      ])])) : (y(), x("div", j0, [
        c("div", V0, [
          c("div", Y0, [
            p[0] || (p[0] = c("span", { class: "kpi-label" }, "Total FAQ", -1)),
            c("span", q0, w(F(z)(d.value.total_faq_events)), 1)
          ]),
          c("div", U0, [
            p[1] || (p[1] = c("span", { class: "kpi-label" }, "Documents Found", -1)),
            c("span", K0, w(F(z)(d.value.total_documents_found)), 1)
          ]),
          c("div", X0, [
            p[2] || (p[2] = c("div", { class: "kpi-label-row" }, [
              c("span", {
                class: "kpi-color-dot",
                "aria-hidden": "true"
              }),
              c("span", { class: "kpi-label" }, "Airline Info")
            ], -1)),
            c("span", G0, w(F(z)(d.value.total_airline_information_retrieved)), 1)
          ]),
          c("div", Z0, [
            p[3] || (p[3] = c("div", { class: "kpi-label-row" }, [
              c("span", {
                class: "kpi-color-dot",
                "aria-hidden": "true"
              }),
              c("span", { class: "kpi-label" }, "Booking Info")
            ], -1)),
            c("span", Q0, w(F(z)(d.value.total_booking_info_retrieved)), 1)
          ]),
          c("div", J0, [
            p[4] || (p[4] = c("div", { class: "kpi-label-row" }, [
              c("span", {
                class: "kpi-color-dot",
                "aria-hidden": "true"
              }),
              c("span", { class: "kpi-label" }, "Flight Status")
            ], -1)),
            c("span", tb, w(F(z)(d.value.total_flight_status_retrieved)), 1)
          ])
        ]),
        l.value.labels && l.value.labels.length ? (y(), x("section", eb, [
          V(Zt, {
            data: l.value,
            options: h.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), lt(F(ft), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (y(), x("section", sb, [...p[5] || (p[5] = [
          j('<div class="empty-state-content" data-v-5d2c3c33><div class="empty-icon-wrapper" data-v-5d2c3c33><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-5d2c3c33><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-5d2c3c33></path></svg></div><p class="empty-title" data-v-5d2c3c33>No FAQ data available</p><p class="empty-description" data-v-5d2c3c33>No FAQ consultation data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), ib = /* @__PURE__ */ K(nb, [["__scopeId", "data-v-5d2c3c33"]]), ob = { class: "messages-per-agent-card" }, rb = {
  key: 0,
  class: "card-body"
}, lb = {
  key: 0,
  class: "chart-section"
}, cb = {
  key: 1,
  class: "empty-state"
}, db = { class: "empty-state-content" }, hb = { class: "empty-icon-wrapper" }, ub = {
  key: 1,
  class: "loading-state"
}, fb = /* @__PURE__ */ G({
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
    }, n = e, i = s, o = (u) => {
      i("export", u);
    }, { isDark: r, colors: l } = J(Q(n, "theme")), d = T(() => {
      const u = n.data?.agents_by_day || {}, f = Object.keys(u).sort();
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const p = /* @__PURE__ */ new Set();
      for (const m of Object.values(u))
        for (const v of Object.keys(m))
          p.add(v);
      const b = Array.from(p).map((m) => {
        const v = a[m] || "#94a3b8";
        return {
          label: m.charAt(0).toUpperCase() + m.slice(1).replace(/_/g, " "),
          data: f.map((_) => u[_]?.[m] || 0),
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
        datasets: b
      };
    }), h = T(() => n.options ? n.options : {
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
    return t({ isDark: r }), (u, f) => (y(), x("article", ob, [
      f[3] || (f[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Messages per Agent"),
          c("p", { class: "card-subtitle" }, "Agent interaction trends over time")
        ])
      ], -1)),
      e.loading ? (y(), x("div", ub, [...f[2] || (f[2] = [
        j('<div class="loading-container" data-v-b9368fc2><div class="chart-lines-loader" data-v-b9368fc2><div class="line line-1" data-v-b9368fc2></div><div class="line line-2" data-v-b9368fc2></div><div class="line line-3" data-v-b9368fc2></div><div class="line line-4" data-v-b9368fc2></div><div class="line line-5" data-v-b9368fc2></div></div><p class="loading-text" data-v-b9368fc2>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", rb, [
        d.value.labels && d.value.labels.length ? (y(), x("section", lb, [
          V(Zt, {
            data: d.value,
            options: h.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), lt(F(ft), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (y(), x("section", cb, [
          c("div", db, [
            c("div", hb, [
              V(F($t), { class: "empty-icon" })
            ]),
            f[0] || (f[0] = c("p", { class: "empty-title" }, "No agent interactions data", -1)),
            f[1] || (f[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), gb = /* @__PURE__ */ K(fb, [["__scopeId", "data-v-b9368fc2"]]), pb = { class: "record-locator-card" }, bb = {
  key: 0,
  class: "loading-state"
}, mb = {
  key: 1,
  class: "card-body"
}, vb = {
  key: 0,
  class: "chart-section"
}, _b = { class: "chart-wrapper" }, yb = {
  key: 1,
  class: "table-section"
}, xb = { class: "table-wrapper" }, kb = { class: "data-table" }, Mb = { class: "table-header-row" }, Sb = {
  key: 0,
  class: "table-header"
}, wb = {
  key: 1,
  class: "table-header"
}, Cb = { class: "table-body" }, $b = { class: "table-cell font-medium" }, Db = { class: "table-cell text-center" }, Ab = { class: "table-cell text-center" }, Tb = { class: "table-cell text-center" }, Bb = { class: "table-cell text-center" }, Fb = { class: "table-cell text-center success-value" }, Pb = { class: "table-cell text-center failed-value" }, Lb = { class: "table-cell text-center warning-value" }, Eb = {
  key: 0,
  class: "table-cell text-center"
}, Ob = {
  key: 1,
  class: "table-cell text-center failed-value"
}, Rb = {
  key: 2,
  class: "empty-state"
}, Ib = /* @__PURE__ */ G({
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
    const a = e, n = s, i = (p) => {
      n("export", p);
    }, { isDark: o } = J(Q(a, "theme")), r = T(() => a.data?.record_locator_by_day ? [...a.data.record_locator_by_day].sort(
      (p, g) => new Date(p.date).getTime() - new Date(g.date).getTime()
    ) : []), l = T(() => a.data), d = T(() => ({
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
    })), h = (p, g) => !g || g === 0 ? "0%" : `${Math.round(p / g * 100)}%`, u = (p, g) => {
      const b = z(p), m = h(p, g);
      return `${b} (${m})`;
    }, f = T(() => {
      const p = [], g = [];
      if (!l.value.total_checkin_initiated)
        return { nodes: p, links: g };
      p.push({ name: "Checkin Init" }), p.push({ name: "Booking retrive" }), p.push({ name: "Checkin Started" }), p.push({ name: "Checkin Completed" }), p.push({ name: "Checkin Closed" });
      const b = l.value.total_checkin_initiated, m = l.value.total_record_locator_init, v = l.value.total_record_locator_started, _ = l.value.total_record_locator_completed, k = l.value.total_record_locator_closed, S = l.value.total_record_locator_failed, M = l.value.total_record_locator_abandoned, C = l.value.total_record_locator_init_abandoned;
      if (m > 0) {
        const A = Math.round(m / b * 100);
        g.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: m,
          label: `${m.toLocaleString()} (${A}%)`
        });
      }
      const $ = b - m;
      if ($ > 0) {
        const A = Math.round($ / b * 100);
        p.push({ name: "Abandoned (Init)" }), g.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: $,
          label: `${$.toLocaleString()} (${A}%)`
        });
      }
      if (v > 0) {
        const A = Math.round(v / b * 100);
        g.push({
          source: "Booking retrive",
          target: "Checkin Started",
          value: v,
          label: `${v.toLocaleString()} (${A}%)`
        });
      }
      if (C > 0) {
        const A = Math.round(C / b * 100);
        p.push({ name: "Abandoned (Started)" }), g.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: C,
          label: `${C.toLocaleString()} (${A}%)`
        });
      }
      if (_ > 0) {
        const A = Math.round(_ / v * 100);
        g.push({
          source: "Checkin Started",
          target: "Checkin Completed",
          value: _,
          label: `${_.toLocaleString()} (${A}%)`
        });
      }
      if (k > 0) {
        const A = Math.round(k / v * 100);
        g.push({
          source: "Checkin Completed",
          target: "Checkin Closed",
          value: k,
          label: `${k.toLocaleString()} (${A}%)`
        });
      }
      if (S > 0) {
        const A = Math.round(S / v * 100);
        p.push({ name: "Checkin Failed" }), g.push({
          source: "Checkin Started",
          target: "Checkin Failed",
          value: S,
          label: `${S.toLocaleString()} (${A}%)`
        });
      }
      if (M > 0) {
        const A = Math.round(M / v * 100);
        p.push({ name: "Abandoned (Flow)" }), g.push({
          source: "Checkin Started",
          target: "Abandoned (Flow)",
          value: M,
          label: `${M.toLocaleString()} (${A}%)`
        });
      }
      return { nodes: p, links: g };
    });
    return t({ isDark: o }), (p, g) => (y(), x("article", pb, [
      g[10] || (g[10] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Checkin by Record Locator Metrics"),
          c("p", { class: "card-subtitle" }, "Checkin by record locator retrieval and completion analysis")
        ])
      ], -1)),
      a.loading ? (y(), x("div", bb, [...g[0] || (g[0] = [
        j('<div class="loading-container" data-v-5230c23e><div class="chart-flow-loader" data-v-5230c23e><div class="flow-line flow-1" data-v-5230c23e></div><div class="flow-line flow-2" data-v-5230c23e></div><div class="flow-line flow-3" data-v-5230c23e></div><div class="flow-line flow-4" data-v-5230c23e></div><div class="flow-line flow-5" data-v-5230c23e></div></div><p class="loading-text" data-v-5230c23e>Loading record locator data...</p></div>', 1)
      ])])) : (y(), x("div", mb, [
        f.value.nodes.length > 0 ? (y(), x("section", vb, [
          c("div", _b, [
            V(Qt, {
              data: f.value,
              height: "500px",
              "node-colors": d.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : I("", !0),
        r.value && r.value.length > 0 ? (y(), x("section", yb, [
          c("div", xb, [
            c("table", kb, [
              c("thead", null, [
                c("tr", Mb, [
                  g[1] || (g[1] = c("th", { class: "table-header" }, "Date", -1)),
                  g[2] || (g[2] = c("th", { class: "table-header" }, "Checkin Init", -1)),
                  g[3] || (g[3] = c("th", { class: "table-header" }, "Booking Retrieve (%)", -1)),
                  g[4] || (g[4] = c("th", { class: "table-header" }, "Checkin Started", -1)),
                  g[5] || (g[5] = c("th", { class: "table-header" }, "Checkin Completed (%)", -1)),
                  g[6] || (g[6] = c("th", { class: "table-header" }, "Checkin Closed (%)", -1)),
                  g[7] || (g[7] = c("th", { class: "table-header" }, "Checkin Failed (%)", -1)),
                  g[8] || (g[8] = c("th", { class: "table-header" }, "Abandoned (%)", -1)),
                  a.isAvianca ? (y(), x("th", Sb, "Create Payment")) : I("", !0),
                  a.isAvianca ? (y(), x("th", wb, "Failed Payment")) : I("", !0)
                ])
              ]),
              c("tbody", Cb, [
                (y(!0), x(Y, null, et(r.value, (b) => (y(), x("tr", {
                  key: b.date,
                  class: "table-row"
                }, [
                  c("td", $b, w(F(Ct)(b.date).format("DD/MM/YYYY")), 1),
                  c("td", Db, w(F(z)(b.checkin_initiated)), 1),
                  c("td", Ab, w(u(b.record_locator_init_count, b.checkin_initiated)), 1),
                  c("td", Tb, w(F(z)(b.record_locator_started_count)), 1),
                  c("td", Bb, w(u(b.record_locator_completed_count, b.record_locator_started_count)), 1),
                  c("td", Fb, w(u(b.record_locator_closed_count, b.record_locator_started_count)), 1),
                  c("td", Pb, w(u(b.record_locator_failed_count, b.record_locator_started_count)), 1),
                  c("td", Lb, w(u(b.record_locator_abandoned_count, b.record_locator_started_count)), 1),
                  a.isAvianca ? (y(), x("td", Eb, w(F(z)(b.record_locator_create_payment_count)), 1)) : I("", !0),
                  a.isAvianca ? (y(), x("td", Ob, w(F(z)(b.record_locator_create_payment_failed_count)), 1)) : I("", !0)
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), lt(F(ft), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (y(), x("section", Rb, [...g[9] || (g[9] = [
          j('<div class="empty-state-content" data-v-5230c23e><div class="empty-icon-wrapper" data-v-5230c23e><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-5230c23e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" data-v-5230c23e></path></svg></div><p class="empty-title" data-v-5230c23e>No record locator data available</p><p class="empty-description" data-v-5230c23e>No record locator data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), zb = /* @__PURE__ */ K(Ib, [["__scopeId", "data-v-5230c23e"]]), Wb = { class: "seller-metrics-card" }, Nb = { class: "card-header" }, Hb = { class: "header-content" }, jb = {
  key: 0,
  class: "payment-success-badge"
}, Vb = { class: "badge-value" }, Yb = {
  key: 0,
  class: "loading-state"
}, qb = {
  key: 1,
  class: "card-body"
}, Ub = {
  key: 0,
  class: "chart-section"
}, Kb = { class: "chart-wrapper" }, Xb = {
  key: 1,
  class: "empty-state"
}, Gb = {
  key: 2,
  class: "table-section"
}, Zb = { class: "table-wrapper" }, Qb = { class: "data-table" }, Jb = { class: "table-body" }, tm = { class: "table-cell font-medium" }, em = { class: "table-cell text-center" }, sm = { class: "table-cell text-center" }, am = { class: "table-cell text-center" }, nm = { class: "table-cell text-center" }, im = { class: "table-cell text-center" }, om = { class: "table-cell text-center success-value" }, rm = { class: "table-cell text-left" }, lm = {
  key: 0,
  class: "failed-reasons"
}, cm = { class: "reason-name" }, dm = { class: "reason-count" }, hm = {
  key: 1,
  class: "empty-cell"
}, um = /* @__PURE__ */ G({
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
    const a = e, n = s, i = (v) => {
      n("export", v);
    }, { isDark: o } = J(Q(a, "theme")), r = T(() => {
      if (!a.sellerData?.seller_by_day) return [];
      const v = [...a.sellerData.seller_by_day];
      return a.failedData?.failed_by_reason_by_day && a.failedData.failed_by_reason_by_day.forEach((_) => {
        const k = v.findIndex((S) => S.date === _.date);
        k !== -1 ? v[k] = { ...v[k], reasons: _.reasons } : v.push({
          date: _.date,
          seller_conversations: 0,
          sell_started_count: 0,
          sell_get_quote_count: 0,
          sell_booking_created_count: 0,
          sell_success_count: 0,
          daily_value_sell_success: 0,
          reasons: _.reasons
        });
      }), v.sort((_, k) => new Date(_.date).getTime() - new Date(k.date).getTime());
    }), l = T(() => a.sellerData), d = T(() => a.failedData), h = T(() => {
      const {
        total_seller_conversations: v = 0,
        total_sell_started: _ = 0,
        total_sell_booking_created: k = 0,
        total_sell_success: S = 0
      } = l.value, { failed_by_reason_by_day: M = [] } = d.value;
      if (v === 0) return { nodes: [], links: [] };
      const C = [
        { name: "Sell Initiated", value: v },
        { name: "Sell Started", value: _ },
        { name: "Booking Created", value: k },
        { name: "Sell Success", value: S }
      ], $ = [], A = v - _;
      if (A > 0) {
        const B = Math.round(A / v * 100);
        C.push({ name: "Abandoned (Init)", value: A }), $.push({
          source: "Sell Initiated",
          target: "Abandoned (Init)",
          value: A,
          label: `${A.toLocaleString()} (${B}%)`
        });
      }
      if (_ > 0) {
        const B = Math.round(_ / v * 100);
        $.push({
          source: "Sell Initiated",
          target: "Sell Started",
          value: _,
          label: `${_.toLocaleString()} (${B}%)`
        });
      }
      const E = M.reduce((B, O) => (O.reasons && Array.isArray(O.reasons) && O.reasons.forEach((P) => {
        const R = P.reason, q = P.failed_count;
        B[R] = (B[R] || 0) + q;
      }), B), {});
      if (k > 0) {
        const B = Math.round(k / v * 100);
        $.push({
          source: "Sell Started",
          target: "Booking Created",
          value: k,
          label: `${k.toLocaleString()} (${B}%)`
        });
      }
      if (S > 0) {
        const B = Math.round(S / v * 100);
        $.push({
          source: "Booking Created",
          target: "Sell Success",
          value: S,
          label: `${S.toLocaleString()} (${B}%)`
        });
      }
      const L = _ - k;
      if (L > 0) {
        const B = Math.round(L / v * 100);
        C.push({ name: "Failed at Booking", value: L }), $.push({
          source: "Sell Started",
          target: "Failed at Booking",
          value: L,
          label: `${L.toLocaleString()} (${B}%)`
        });
      }
      if (Object.keys(E).length > 0) {
        const B = Object.values(E).reduce((P, R) => P + R, 0), O = L - B;
        if (Object.entries(E).filter(([, P]) => P > 0).sort(([, P], [, R]) => R - P).forEach(([P, R]) => {
          const q = Math.round(R / v * 100);
          C.push({ name: `Failed: ${P}`, value: R }), $.push({
            source: "Failed at Booking",
            target: `Failed: ${P}`,
            value: R,
            label: `${R.toLocaleString()} (${q}%)`
          });
        }), O > 0) {
          const P = Math.round(O / v * 100);
          C.push({ name: "Failed: Without Reason", value: O }), $.push({
            source: "Failed at Booking",
            target: "Failed: Without Reason",
            value: O,
            label: `${O.toLocaleString()} (${P}%)`
          });
        }
      }
      const D = k - S;
      if (D > 0) {
        const B = Math.round(D / v * 100);
        C.push({ name: "Failed at Completion", value: D }), $.push({
          source: "Booking Created",
          target: "Failed at Completion",
          value: D,
          label: `${D.toLocaleString()} (${B}%)`
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
    }, f = T(() => u), p = (v, _) => !_ || _ === 0 ? "0%" : `${Math.round(v / _ * 100)}%`, g = (v, _) => {
      const k = z(v), S = p(v, _);
      return `${k} (${S})`;
    }, b = (v) => v == null ? 0 : typeof v == "number" ? v : Array.isArray(v) ? v.reduce((_, k) => _ + (k.total_value || 0), 0) : 0, m = (v) => rt(b(v));
    return t({ isDark: o }), (v, _) => (y(), x("article", Wb, [
      c("header", Nb, [
        c("div", Hb, [
          _[1] || (_[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Seller Metrics"),
            c("p", { class: "card-subtitle" }, "Sales performance and failure analysis")
          ], -1)),
          a.loading ? I("", !0) : (y(), x("div", jb, [
            _[0] || (_[0] = c("p", { class: "badge-label" }, "Total Sales Value", -1)),
            c("p", Vb, w(m(a.sellerData.total_value_sell_success)), 1)
          ]))
        ])
      ]),
      a.loading ? (y(), x("div", Yb, [..._[2] || (_[2] = [
        j('<div class="loading-container" data-v-d31f4381><div class="chart-flow-loader" data-v-d31f4381><div class="flow-line flow-1" data-v-d31f4381></div><div class="flow-line flow-2" data-v-d31f4381></div><div class="flow-line flow-3" data-v-d31f4381></div><div class="flow-line flow-4" data-v-d31f4381></div><div class="flow-line flow-5" data-v-d31f4381></div></div><p class="loading-text" data-v-d31f4381>Loading sales data...</p></div>', 1)
      ])])) : (y(), x("div", qb, [
        h.value.nodes.length > 0 ? (y(), x("section", Ub, [
          c("div", Kb, [
            V(Qt, {
              data: h.value,
              "node-colors": f.value,
              title: "",
              height: "320px"
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : (y(), x("section", Xb, [..._[3] || (_[3] = [
          j('<div class="empty-state-content" data-v-d31f4381><div class="empty-icon-wrapper" data-v-d31f4381><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d31f4381><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-d31f4381></path></svg></div><p class="empty-title" data-v-d31f4381>No sales data available</p><p class="empty-description" data-v-d31f4381>No sales data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])])),
        r.value && r.value.length > 0 ? (y(), x("section", Gb, [
          c("div", Zb, [
            c("table", Qb, [
              _[4] || (_[4] = c("thead", null, [
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
              c("tbody", Jb, [
                (y(!0), x(Y, null, et(r.value, (k) => (y(), x("tr", {
                  key: k.date,
                  class: "table-row"
                }, [
                  c("td", tm, w(F(Ct)(k.date).format("DD/MM/YYYY")), 1),
                  c("td", em, w(F(z)(k.seller_conversations || 0)), 1),
                  c("td", sm, w(g(k.sell_started_count, k.seller_conversations || k.sell_started_count)), 1),
                  c("td", am, w(g(k.sell_get_quote_count, k.seller_conversations || k.sell_started_count)), 1),
                  c("td", nm, w(g(k.sell_booking_created_count, k.seller_conversations || k.sell_started_count)), 1),
                  c("td", im, w(g(k.sell_success_count, k.seller_conversations || k.sell_started_count)), 1),
                  c("td", om, w(m(k.daily_value_sell_success)), 1),
                  c("td", rm, [
                    k.reasons && k.reasons.length > 0 ? (y(), x("div", lm, [
                      (y(!0), x(Y, null, et(k.reasons, (S) => (y(), x("div", {
                        key: S.reason,
                        class: "failed-reason-item"
                      }, [
                        c("span", cm, w(S.reason) + ":", 1),
                        c("span", dm, w(S.failed_count), 1)
                      ]))), 128))
                    ])) : (y(), x("div", hm, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), lt(F(ft), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : I("", !0)
      ]))
    ]));
  }
}), fm = /* @__PURE__ */ K(um, [["__scopeId", "data-v-d31f4381"]]), gm = { class: "top-agents-card" }, pm = {
  key: 0,
  class: "card-body"
}, bm = {
  key: 0,
  class: "chart-section"
}, mm = {
  key: 1,
  class: "empty-state"
}, vm = { class: "empty-state-content" }, _m = { class: "empty-icon-wrapper" }, ym = {
  key: 1,
  class: "loading-state"
}, xm = /* @__PURE__ */ G({
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
    }, n = e, i = s, o = (u) => {
      i("export", u);
    }, { isDark: r, colors: l } = J(Q(n, "theme")), d = T(() => {
      const f = (n.data?.top_agents || []).filter(
        (m) => m.agent_type?.toLowerCase() !== "triage"
      );
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const p = f.reduce(
        (m, v) => m + (Number(v.conversations) || 0),
        0
      ), g = f.map((m) => {
        const v = m.agent_type?.toLowerCase();
        return a[v] || "#94a3b8";
      }), b = g.map((m) => `${m}80`);
      return {
        labels: f.map((m) => {
          const v = Number(m.conversations) || 0, _ = p ? v / p * 100 : 0;
          return `${m.agent_type} - ${v.toLocaleString()} (${_.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: f.map((m) => m.conversations),
            backgroundColor: b,
            borderColor: g,
            borderWidth: 2
          }
        ]
      };
    }), h = T(() => n.options ? n.options : {
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
                (m, v) => m + (Number(v) || 0),
                0
              ), b = g ? p / g * 100 : 0;
              return `${f}: ${p.toLocaleString()} (${b.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: r }), (u, f) => (y(), x("article", gm, [
      f[3] || (f[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Top Agents"),
          c("p", { class: "card-subtitle" }, "Interactions by agent (excluding triage)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", ym, [...f[2] || (f[2] = [
        j('<div class="loading-container" data-v-501bf4c4><div class="chart-lines-loader" data-v-501bf4c4><div class="line line-1" data-v-501bf4c4></div><div class="line line-2" data-v-501bf4c4></div><div class="line line-3" data-v-501bf4c4></div><div class="line line-4" data-v-501bf4c4></div><div class="line line-5" data-v-501bf4c4></div></div><p class="loading-text" data-v-501bf4c4>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", pm, [
        d.value.labels && d.value.labels.length ? (y(), x("section", bm, [
          V(xs, {
            data: d.value,
            options: h.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), lt(F(ft), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (y(), x("section", mm, [
          c("div", vm, [
            c("div", _m, [
              V(F(Lf), { class: "empty-icon" })
            ]),
            f[0] || (f[0] = c("p", { class: "empty-title" }, "No top agents data", -1)),
            f[1] || (f[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), km = /* @__PURE__ */ K(xm, [["__scopeId", "data-v-501bf4c4"]]), Mm = { class: "payment-method-card" }, Sm = { class: "card-header" }, wm = { class: "header-content" }, Cm = {
  key: 0,
  class: "stats-badge"
}, $m = { class: "badge-value" }, Dm = {
  key: 0,
  class: "loading-state"
}, Am = {
  key: 1,
  class: "card-body"
}, Tm = {
  key: 0,
  class: "payment-methods-section"
}, Bm = { class: "payment-methods-grid" }, Fm = { class: "payment-card-content" }, Pm = { class: "payment-card-header" }, Lm = { class: "payment-badge-wrapper" }, Em = {
  key: 1,
  class: "empty-state"
}, Om = { class: "empty-state-content" }, Rm = { class: "empty-icon-wrapper" }, Im = {
  key: 2,
  class: "table-section"
}, zm = { class: "table-wrapper" }, Wm = { class: "data-table" }, Nm = { class: "table-body" }, Hm = { class: "table-cell font-medium" }, jm = { class: "table-cell text-center" }, Vm = { class: "table-cell text-center success-value" }, Ym = { class: "table-cell" }, qm = { class: "payment-tags" }, Um = { class: "tag-name" }, Km = { class: "tag-amount" }, Xm = { class: "tag-count" }, Gm = {
  key: 3,
  class: "empty-table-state"
}, Zm = "Not Registered", Qm = /* @__PURE__ */ G({
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
    const a = e, n = s, { isDark: i } = J(Q(a, "theme")), o = xt(!1), r = xt({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), l = T(() => r.value.payment_method_breakdown && r.value.payment_method_breakdown.length > 0), d = T(() => r.value.payment_method_by_day && r.value.payment_method_by_day.length > 0), h = T(() => !r.value.payment_method_by_day || r.value.payment_method_by_day.length === 0 ? [] : [...r.value.payment_method_by_day].sort((D, B) => Ct(D.date).valueOf() - Ct(B.date).valueOf())), u = (D) => {
      if (!D)
        return {
          airline_name: a.airlineName,
          start_date: "",
          end_date: "",
          total_conversations: 0,
          total_amount: 0,
          payment_method_breakdown: [],
          payment_method_by_day: []
        };
      const B = (D.payment_method_breakdown || []).map((P) => ({
        payment_method: P.payment_method || "Unknown",
        total_amount: P.total_amount ?? 0,
        count: P.count ?? 0
      })), O = (D.payment_method_by_day || []).map((P) => ({
        date: P.date || "",
        total_count: P.total_count ?? 0,
        total_amount: P.total_amount ?? 0,
        payment_methods: (P.payment_methods || []).map((R) => ({
          payment_method: R.payment_method || "Unknown",
          total_amount: R.total_amount ?? 0,
          count: R.count ?? 0
        }))
      }));
      return {
        airline_name: D.airline_name || a.airlineName,
        start_date: D.start_date || "",
        end_date: D.end_date || "",
        total_conversations: D.total_conversations ?? 0,
        total_amount: D.total_amount ?? 0,
        payment_method_breakdown: B,
        payment_method_by_day: O
      };
    }, f = async () => {
      if (!(!a.fetchFunction || !a.dates || a.dates.length < 2 || !a.airlineName)) {
        o.value = !0;
        try {
          const [D, B] = a.dates.map((P) => Ct(P).format("YYYY-MM-DD")), O = await a.fetchFunction(a.airlineName, D, B);
          r.value = u(O);
        } catch (D) {
          console.error("Error fetching payment method metrics:", D), r.value = u(null);
        } finally {
          o.value = !1;
        }
      }
    }, p = [
      { bg: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)", border: "#a7f3d0", text: "#047857", value: "#065f46", icon: "#10b981", badge: "#059669" },
      { bg: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)", border: "#93c5fd", text: "#1d4ed8", value: "#1e40af", icon: "#3b82f6", badge: "#2563eb" },
      { bg: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)", border: "#d8b4fe", text: "#7c3aed", value: "#6d28d9", icon: "#8b5cf6", badge: "#7c3aed" },
      { bg: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)", border: "#fcd34d", text: "#b45309", value: "#92400e", icon: "#f59e0b", badge: "#d97706" },
      { bg: "linear-gradient(135deg, #fff1f2 0%, #fce7f3 100%)", border: "#fda4af", text: "#be123c", value: "#9f1239", icon: "#f43f5e", badge: "#e11d48" },
      { bg: "linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)", border: "#67e8f9", text: "#0e7490", value: "#155e75", icon: "#06b6d4", badge: "#0891b2" }
    ], g = (D) => {
      const B = p[D % p.length];
      return {
        background: B.bg,
        borderColor: B.border
      };
    }, b = (D) => ({ color: p[D % p.length].text }), m = (D) => ({ color: p[D % p.length].value }), v = (D) => ({ color: p[D % p.length].icon }), _ = (D) => ({ color: p[D % p.length].badge }), k = (D) => {
      const O = C(D).length;
      return O > 18 ? { fontSize: "0.75rem" } : O > 15 ? { fontSize: "0.875rem" } : O > 12 ? { fontSize: "1rem" } : { fontSize: "1.125rem" };
    }, S = (D) => {
      const B = D?.toLowerCase() || "";
      return !D || B === "unknown" ? Rf : B.includes("credit") || B.includes("debit") ? En : B.includes("cash") || B.includes("efectivo") ? Ff : B.includes("bank") || B.includes("transfer") ? Pf : B.includes("zelle") || B.includes("pago") || B.includes("movil") ? Of : B.includes("wallet") ? If : Ef;
    }, M = (D) => !D || D.toLowerCase() === "unknown" ? Zm : D.replace(/_/g, " "), C = (D) => D == null ? "$0.00" : rt(D), $ = (D) => D ? Ct(D).format("DD/MM/YYYY") : "-", A = (D) => D == null || Number.isNaN(Number(D)) ? 0 : Number(D), E = (D) => {
      n("export", D);
    };
    function L() {
      const D = a.data;
      D && (Array.isArray(D.payment_method_breakdown) && D.payment_method_breakdown.length > 0 || Array.isArray(D.payment_method_by_day) && D.payment_method_by_day.length > 0) && (o.value = !1, r.value = u(D));
    }
    return us(() => {
      a.data ? L() : f();
    }), Ht(
      () => a.data,
      (D) => {
        D && L();
      },
      { deep: !0 }
    ), Ht(
      () => a.dates,
      (D) => {
        a.data || D && D[0] && D[1] && f();
      },
      { deep: !0 }
    ), t({ isDark: i }), (D, B) => (y(), x("article", Mm, [
      c("header", Sm, [
        c("div", wm, [
          B[1] || (B[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Payment Method Metrics"),
            c("p", { class: "card-subtitle" }, "Sales breakdown by payment method")
          ], -1)),
          !o.value && r.value.total_amount ? (y(), x("div", Cm, [
            B[0] || (B[0] = c("p", { class: "badge-label" }, "Total Amount", -1)),
            c("p", $m, w(C(r.value.total_amount)), 1)
          ])) : I("", !0)
        ])
      ]),
      o.value ? (y(), x("div", Dm, [...B[2] || (B[2] = [
        j('<div class="loading-container" data-v-8f36d2c4><div class="chart-lines-loader" data-v-8f36d2c4><div class="line line-1" data-v-8f36d2c4></div><div class="line line-2" data-v-8f36d2c4></div><div class="line line-3" data-v-8f36d2c4></div><div class="line line-4" data-v-8f36d2c4></div><div class="line line-5" data-v-8f36d2c4></div></div><p class="loading-text" data-v-8f36d2c4>Loading payment data...</p></div>', 1)
      ])])) : (y(), x("div", Am, [
        l.value ? (y(), x("section", Tm, [
          B[3] || (B[3] = c("p", { class: "section-label" }, "Sales by Payment Method", -1)),
          c("div", Bm, [
            (y(!0), x(Y, null, et(r.value.payment_method_breakdown, (O, P) => (y(), x("div", {
              key: O.payment_method,
              class: "payment-method-card-item",
              style: mt(g(P))
            }, [
              c("div", Fm, [
                c("div", Pm, [
                  (y(), lt(Ui(S(O.payment_method)), {
                    class: "payment-icon",
                    style: mt(v(P))
                  }, null, 8, ["style"])),
                  c("span", {
                    class: "payment-name",
                    style: mt(b(P))
                  }, w(M(O.payment_method)), 5)
                ]),
                c("p", {
                  class: "payment-amount",
                  style: mt([m(P), k(O.total_amount)])
                }, w(C(O.total_amount)), 5),
                c("div", Lm, [
                  c("span", {
                    class: "payment-badge",
                    style: mt(_(P))
                  }, w(A(O.count)) + " " + w(A(O.count) === 1 ? "sale" : "sales"), 5)
                ])
              ])
            ], 4))), 128))
          ])
        ])) : (y(), x("section", Em, [
          c("div", Om, [
            c("div", Rm, [
              V(F(En), { class: "empty-icon" })
            ]),
            B[4] || (B[4] = c("p", { class: "empty-title" }, "No payment data available", -1)),
            B[5] || (B[5] = c("p", { class: "empty-description" }, "No payment method data found for the selected period. Try adjusting the date range.", -1))
          ])
        ])),
        d.value ? (y(), x("section", Im, [
          B[8] || (B[8] = c("p", { class: "section-label" }, "Daily Breakdown", -1)),
          c("div", zm, [
            c("table", Wm, [
              B[7] || (B[7] = c("thead", null, [
                c("tr", { class: "table-header-row" }, [
                  c("th", { class: "table-header text-left" }, "Date"),
                  c("th", { class: "table-header text-center" }, "Total Sales"),
                  c("th", { class: "table-header text-center" }, "Total Amount"),
                  c("th", { class: "table-header text-left" }, "Payment Methods")
                ])
              ], -1)),
              c("tbody", Nm, [
                (y(!0), x(Y, null, et(h.value, (O) => (y(), x("tr", {
                  key: O.date,
                  class: "table-row"
                }, [
                  c("td", Hm, w($(O.date)), 1),
                  c("td", jm, w(F(z)(O.total_count ?? 0)), 1),
                  c("td", Vm, w(C(O.total_amount)), 1),
                  c("td", Ym, [
                    c("div", qm, [
                      (y(!0), x(Y, null, et(O.payment_methods || [], (P) => (y(), x("div", {
                        key: P.payment_method,
                        class: "payment-tag"
                      }, [
                        c("span", Um, w(M(P.payment_method)), 1),
                        B[6] || (B[6] = c("span", { class: "tag-separator" }, "•", -1)),
                        c("span", Km, w(C(P.total_amount)), 1),
                        c("span", Xm, "(" + w(A(P.count)) + ")", 1)
                      ]))), 128))
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), lt(F(ft), {
            key: 0,
            onExport: E,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : l.value ? (y(), x("div", Gm, [...B[9] || (B[9] = [
          c("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
        ])])) : I("", !0)
      ]))
    ]));
  }
}), Jm = /* @__PURE__ */ K(Qm, [["__scopeId", "data-v-8f36d2c4"]]), tv = { class: "agent-human-conv-card" }, ev = {
  key: 0,
  class: "loading-state"
}, sv = {
  key: 1,
  class: "card-body"
}, av = { class: "summary-cards" }, nv = { class: "summary-card assigned-card" }, iv = { class: "card-content" }, ov = { class: "card-value assigned-value" }, rv = { class: "summary-card closed-card" }, lv = { class: "card-content" }, cv = { class: "card-value closed-value" }, dv = {
  key: 0,
  class: "agents-section"
}, hv = { class: "date-header" }, uv = { class: "date-title" }, fv = { class: "date-stats" }, gv = { class: "stat-item assigned-stat" }, pv = { class: "stat-value" }, bv = { class: "stat-item closed-stat" }, mv = { class: "stat-value" }, vv = { class: "table-wrapper" }, _v = { class: "data-table" }, yv = { class: "table-body" }, xv = { class: "table-cell name-cell" }, kv = { class: "table-cell email-cell" }, Mv = { class: "table-cell text-center" }, Sv = { class: "badge assigned-badge" }, wv = { class: "table-cell text-center" }, Cv = { class: "badge closed-badge" }, $v = {
  key: 1,
  class: "empty-state"
}, Dv = /* @__PURE__ */ G({
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
    const a = e, n = s, i = (p) => {
      n("export", p);
    }, { isDark: o } = J(Q(a, "theme")), r = T(() => a.data?.agents_by_day && a.data.agents_by_day.length > 0), l = T(() => {
      if (!r.value) return {};
      const p = {};
      for (const m of a.data.agents_by_day)
        p[m.date] || (p[m.date] = []), p[m.date].push(m);
      const g = Object.keys(p).sort((m, v) => new Date(v).getTime() - new Date(m).getTime()), b = {};
      for (const m of g)
        b[m] = p[m];
      return b;
    }), d = (p) => p == null ? "0" : z(p), h = (p) => {
      const g = new Date(p), b = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return g.toLocaleDateString("en-US", b);
    }, u = (p) => p.reduce((g, b) => g + (b.assigned_count || 0), 0), f = (p) => p.reduce((g, b) => g + (b.closed_count || 0), 0);
    return t({ isDark: o }), (p, g) => (y(), x("article", tv, [
      g[9] || (g[9] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Agent Human Conversations"),
          c("p", { class: "card-subtitle" }, "Human conversation assignments and closures by agent")
        ])
      ], -1)),
      e.loading ? (y(), x("div", ev, [...g[0] || (g[0] = [
        j('<div class="loading-container" data-v-f023b3b5><div class="chart-bars-loader" data-v-f023b3b5><div class="bar bar-1" data-v-f023b3b5></div><div class="bar bar-2" data-v-f023b3b5></div><div class="bar bar-3" data-v-f023b3b5></div><div class="bar bar-4" data-v-f023b3b5></div><div class="bar bar-5" data-v-f023b3b5></div></div><p class="loading-text" data-v-f023b3b5>Loading agent data...</p></div>', 1)
      ])])) : (y(), x("div", sv, [
        c("div", av, [
          c("div", nv, [
            g[2] || (g[2] = c("div", { class: "card-decoration" }, null, -1)),
            c("div", iv, [
              g[1] || (g[1] = c("p", { class: "card-label" }, "Total Assigned", -1)),
              c("p", ov, w(d(e.data.total_assigned)), 1)
            ])
          ]),
          c("div", rv, [
            g[4] || (g[4] = c("div", { class: "card-decoration" }, null, -1)),
            c("div", lv, [
              g[3] || (g[3] = c("p", { class: "card-label" }, "Total Closed", -1)),
              c("p", cv, w(d(e.data.total_closed)), 1)
            ])
          ])
        ]),
        r.value ? (y(), x("div", dv, [
          (y(!0), x(Y, null, et(l.value, (b, m) => (y(), x("div", {
            key: m,
            class: "date-group"
          }, [
            c("div", hv, [
              c("h4", uv, w(h(m)), 1),
              c("div", fv, [
                c("span", gv, [
                  c("span", pv, w(d(u(b))), 1),
                  g[5] || (g[5] = oe(" Assigned ", -1))
                ]),
                c("span", bv, [
                  c("span", mv, w(d(f(b))), 1),
                  g[6] || (g[6] = oe(" Closed ", -1))
                ])
              ])
            ]),
            c("div", vv, [
              c("table", _v, [
                g[7] || (g[7] = c("thead", null, [
                  c("tr", { class: "table-header-row" }, [
                    c("th", { class: "table-header" }, "Agent Name"),
                    c("th", { class: "table-header" }, "Email"),
                    c("th", { class: "table-header" }, "Assigned"),
                    c("th", { class: "table-header" }, "Closed")
                  ])
                ], -1)),
                c("tbody", yv, [
                  (y(!0), x(Y, null, et(b, (v) => (y(), x("tr", {
                    key: `${m}-${v.agent_email}`,
                    class: "table-row"
                  }, [
                    c("td", xv, w(v.agent_name || "-"), 1),
                    c("td", kv, w(v.agent_email), 1),
                    c("td", Mv, [
                      c("span", Sv, w(d(v.assigned_count)), 1)
                    ]),
                    c("td", wv, [
                      c("span", Cv, w(d(v.closed_count)), 1)
                    ])
                  ]))), 128))
                ])
              ])
            ])
          ]))), 128)),
          e.enableExport ? (y(), lt(F(ft), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (y(), x("div", $v, [...g[8] || (g[8] = [
          j('<div class="empty-state-content" data-v-f023b3b5><div class="empty-icon-wrapper" data-v-f023b3b5><svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f023b3b5><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-f023b3b5></path></svg></div><p class="empty-title" data-v-f023b3b5>No agent human conversation data available</p><p class="empty-description" data-v-f023b3b5>Try adjusting the date range or check your filters.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Av = /* @__PURE__ */ K(Dv, [["__scopeId", "data-v-f023b3b5"]]), Tv = { class: "channel-metrics-card" }, Bv = {
  key: 0,
  class: "card-body"
}, Fv = {
  key: 0,
  class: "kpi-grid"
}, Pv = { class: "kpi-label" }, Lv = { class: "kpi-value" }, Ev = { class: "kpi-card total-card" }, Ov = { class: "kpi-value" }, Rv = {
  key: 1,
  class: "chart-section"
}, Iv = {
  key: 2,
  class: "empty-state"
}, zv = {
  key: 1,
  class: "loading-state"
}, Wv = /* @__PURE__ */ G({
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
    const a = e, n = s, i = (f) => {
      n("export", f);
    }, { isDark: o, colors: r } = J(Q(a, "theme")), l = xt({ labels: [], datasets: [] }), d = T(() => a.data ?? {
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
    })), u = (f) => {
      if (!f || !f.channels_by_day) {
        l.value = { labels: [], datasets: [] };
        return;
      }
      const p = f.channels_by_day, g = Object.keys(p).sort();
      if (g.length === 0) {
        l.value = { labels: [], datasets: [] };
        return;
      }
      const b = /* @__PURE__ */ new Set();
      for (const k of Object.values(p))
        for (const S of Object.keys(k))
          b.add(S);
      const m = Array.from(b), v = {
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
      }, _ = m.map((k) => {
        const S = k.toLowerCase(), M = v[S] || "#9ca3af";
        return {
          label: k.toUpperCase(),
          data: g.map((C) => p[C]?.[k] || 0),
          borderColor: M,
          backgroundColor: `${M}1A`,
          // 1A = 10% opacity
          borderWidth: 2,
          fill: !0,
          tension: 0.4,
          pointBackgroundColor: M,
          pointBorderColor: M,
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        };
      });
      l.value = {
        labels: g.map((k) => Ct(k).format("MMM DD")),
        datasets: _
      };
    };
    return Ht(
      () => a.data,
      (f) => {
        u(f ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: o }), (f, p) => (y(), x("article", Tv, [
      p[3] || (p[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Channel Metrics"),
          c("p", { class: "card-subtitle" }, "Communication channels performance")
        ])
      ], -1)),
      a.loading ? (y(), x("div", zv, [...p[2] || (p[2] = [
        j('<div class="loading-container" data-v-82f175d2><div class="chart-bars-loader" data-v-82f175d2><div class="bar bar-1" data-v-82f175d2></div><div class="bar bar-2" data-v-82f175d2></div><div class="bar bar-3" data-v-82f175d2></div><div class="bar bar-4" data-v-82f175d2></div><div class="bar bar-5" data-v-82f175d2></div></div><p class="loading-text" data-v-82f175d2>Loading channel metrics...</p></div>', 1)
      ])])) : (y(), x("div", Bv, [
        Object.keys(d.value.total_by_channel).length ? (y(), x("div", Fv, [
          (y(!0), x(Y, null, et(Object.keys(d.value.total_by_channel), (g) => (y(), x("div", {
            class: "kpi-card",
            key: g
          }, [
            c("span", Pv, w(g.toUpperCase()), 1),
            c("span", Lv, w(F(z)(d.value.total_by_channel[g])), 1)
          ]))), 128)),
          c("div", Ev, [
            p[0] || (p[0] = c("span", { class: "kpi-label" }, "Total Conversations", -1)),
            c("span", Ov, w(F(z)(d.value.total_conversations)), 1)
          ])
        ])) : I("", !0),
        l.value.labels && l.value.labels.length ? (y(), x("section", Rv, [
          V(Zt, {
            data: l.value,
            options: h.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), lt(F(ft), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (y(), x("section", Iv, [...p[1] || (p[1] = [
          j('<div class="empty-state-content" data-v-82f175d2><div class="empty-icon-wrapper" data-v-82f175d2><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-82f175d2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-82f175d2></path></svg></div><p class="empty-title" data-v-82f175d2>No channel metrics data available</p><p class="empty-description" data-v-82f175d2>No channel data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Nv = /* @__PURE__ */ K(Wv, [["__scopeId", "data-v-82f175d2"]]), Hv = { class: "triage-combinations-card" }, jv = { class: "card-header" }, Vv = { class: "total-badge" }, Yv = {
  key: 0,
  class: "card-body"
}, qv = { class: "chart-container" }, Uv = { class: "table-container" }, Kv = { class: "table-row" }, Xv = { class: "table-row" }, Gv = { class: "table-cell text-center count-cell" }, Zv = { class: "table-cell text-center count-cell" }, Qv = { class: "table-cell text-center count-cell" }, Jv = { class: "table-cell text-center count-cell" }, t1 = { class: "table-cell text-center count-cell" }, e1 = {
  key: 1,
  class: "empty-state"
}, s1 = { class: "empty-state-content" }, a1 = { class: "empty-icon-wrapper" }, n1 = {
  key: 1,
  class: "loading-state"
}, i1 = /* @__PURE__ */ G({
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
    const a = e, n = s, i = (v) => {
      n("export", v);
    }, { isDark: o, colors: r } = J(Q(a, "theme")), l = T(() => {
      const v = a.data?.combinations || {}, _ = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [k, S] of Object.entries(v)) {
        const M = k.split("+").filter(Boolean);
        if (!M.includes("triage")) continue;
        const C = M.filter(($) => $ !== "triage").length;
        C >= 4 ? _["4p"] += Number(S) || 0 : _[C] += Number(S) || 0;
      }
      return _;
    }), d = T(() => {
      const v = l.value;
      return v[0] + v[1] + v[2] + v[3] + v["4p"] || 0;
    }), h = T(() => Object.keys(a.data?.combinations || {}).length > 0), u = T(() => {
      const v = d.value;
      if (!v) return { pct0: 0, pct1: 0, pct2: 0, pct3: 0, pct4p: 0 };
      const _ = l.value;
      return {
        pct0: _[0] / v * 100,
        pct1: _[1] / v * 100,
        pct2: _[2] / v * 100,
        pct3: _[3] / v * 100,
        pct4p: _["4p"] / v * 100
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
    }, p = (v) => v?.replace("80", "") || "#888888", g = T(() => ({
      labels: ["Distribution"],
      datasets: [
        {
          label: "0",
          data: [u.value.pct0],
          backgroundColor: f.c0,
          borderColor: p(f.c0),
          borderWidth: 1
        },
        {
          label: "1",
          data: [u.value.pct1],
          backgroundColor: f.c1,
          borderColor: p(f.c1),
          borderWidth: 1
        },
        {
          label: "2",
          data: [u.value.pct2],
          backgroundColor: f.c2,
          borderColor: p(f.c2),
          borderWidth: 1
        },
        {
          label: "3",
          data: [u.value.pct3],
          backgroundColor: f.c3,
          borderColor: p(f.c3),
          borderWidth: 1
        },
        {
          label: "4+",
          data: [u.value.pct4p],
          backgroundColor: f.c4p,
          borderColor: p(f.c4p),
          borderWidth: 1
        }
      ]
    })), b = T(() => ({
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
            label: (v) => `${v.dataset.label} intent(s): ${Number(v.raw || 0).toFixed(0)}%`
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
    })), m = (v) => `${(Number(v) || 0).toFixed(0)}`;
    return t({ isDark: o }), (v, _) => (y(), x("article", Hv, [
      c("header", jv, [
        _[0] || (_[0] = c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Distribution of Number of Intents"),
          c("p", { class: "card-subtitle" }, "Analysis of intent combinations per conversation")
        ], -1)),
        c("span", Vv, " Total: " + w(d.value), 1)
      ]),
      e.loading ? (y(), x("div", n1, [..._[6] || (_[6] = [
        j('<div class="loading-container" data-v-cb93cda2><div class="chart-bars-loader" data-v-cb93cda2><div class="bar bar-1" data-v-cb93cda2></div><div class="bar bar-2" data-v-cb93cda2></div><div class="bar bar-3" data-v-cb93cda2></div><div class="bar bar-4" data-v-cb93cda2></div><div class="bar bar-5" data-v-cb93cda2></div></div><p class="loading-text" data-v-cb93cda2>Loading intent distribution...</p></div>', 1)
      ])])) : (y(), x("div", Yv, [
        h.value ? (y(), x(Y, { key: 0 }, [
          c("div", qv, [
            V(Gt, {
              data: g.value,
              options: b.value
            }, null, 8, ["data", "options"])
          ]),
          c("div", Uv, [
            _[3] || (_[3] = j('<div class="table-header" data-v-cb93cda2><div class="table-cell header-cell" data-v-cb93cda2>Number of intentions</div><div class="table-cell header-cell text-center" data-v-cb93cda2>0</div><div class="table-cell header-cell text-center" data-v-cb93cda2>1</div><div class="table-cell header-cell text-center" data-v-cb93cda2>2</div><div class="table-cell header-cell text-center" data-v-cb93cda2>3</div><div class="table-cell header-cell text-center" data-v-cb93cda2>4 or more</div></div>', 1)),
            c("div", Kv, [
              _[1] || (_[1] = c("div", { class: "table-cell row-label" }, "% of total", -1)),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: mt({ color: p(f.c0) })
              }, w(m(u.value.pct0)) + "% ", 5),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: mt({ color: p(f.c1) })
              }, w(m(u.value.pct1)) + "% ", 5),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: mt({ color: p(f.c2) })
              }, w(m(u.value.pct2)) + "% ", 5),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: mt({ color: p(f.c3) })
              }, w(m(u.value.pct3)) + "% ", 5),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: mt({ color: p(f.c4p) })
              }, w(m(u.value.pct4p)) + "% ", 5)
            ]),
            c("div", Xv, [
              _[2] || (_[2] = c("div", { class: "table-cell row-label" }, "Count", -1)),
              c("div", Gv, w(F(z)(l.value[0])), 1),
              c("div", Zv, w(F(z)(l.value[1])), 1),
              c("div", Qv, w(F(z)(l.value[2])), 1),
              c("div", Jv, w(F(z)(l.value[3])), 1),
              c("div", t1, w(F(z)(l.value["4p"])), 1)
            ])
          ]),
          e.enableExport ? (y(), lt(F(ft), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ], 64)) : (y(), x("div", e1, [
          c("div", s1, [
            c("div", a1, [
              V(F($t), { class: "empty-icon" })
            ]),
            _[4] || (_[4] = c("p", { class: "empty-title" }, "No triage combinations data", -1)),
            _[5] || (_[5] = c("p", { class: "empty-description" }, "No intent distribution data found for the selected period. Try adjusting the date range.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), o1 = /* @__PURE__ */ K(i1, [["__scopeId", "data-v-cb93cda2"]]), r1 = { class: "select-language-card" }, l1 = { class: "card-header" }, c1 = { class: "header-content" }, d1 = {
  key: 0,
  class: "total-badge"
}, h1 = { class: "badge-value" }, u1 = {
  key: 0,
  class: "loading-state"
}, f1 = {
  key: 1,
  class: "card-body"
}, g1 = {
  key: 0,
  class: "pie-section"
}, p1 = {
  key: 1,
  class: "empty-state"
}, b1 = /* @__PURE__ */ G({
  __name: "SelectLanguage",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: a, colors: n } = J(Q(s, "theme")), i = [
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
    ], o = {
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
    }, r = (p) => o[p]?.label || p.toUpperCase(), l = T(
      () => s.data?.items && s.data.items.length > 0
    ), d = T(
      () => (s.data?.items || []).reduce((p, g) => p + g.count, 0)
    ), h = T(() => {
      const p = {};
      for (const g of s.data?.items || [])
        p[g.language] = (p[g.language] || 0) + g.count;
      return Object.entries(p).map(([g, b]) => ({ language: g, count: b })).sort((g, b) => b.count - g.count);
    }), u = T(() => ({
      labels: h.value.map((p) => r(p.language)),
      datasets: [{
        data: h.value.map((p) => p.count),
        backgroundColor: h.value.map((p, g) => i[g % i.length] + "80"),
        borderColor: h.value.map((p, g) => i[g % i.length]),
        borderWidth: 2,
        hoverOffset: 6
      }]
    })), f = T(() => ({
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
            label: (p) => {
              const g = p.raw || 0, b = d.value > 0 ? (g / d.value * 100).toFixed(1) : "0";
              return ` ${p.label}: ${g} (${b}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: a }), (p, g) => (y(), x("article", r1, [
      c("header", l1, [
        c("div", c1, [
          g[1] || (g[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Language Selection"),
            c("p", { class: "card-subtitle" }, "Language distribution across conversations")
          ], -1)),
          s.loading ? I("", !0) : (y(), x("div", d1, [
            g[0] || (g[0] = c("p", { class: "badge-label" }, "Total", -1)),
            c("p", h1, w(F(z)(d.value)), 1)
          ]))
        ])
      ]),
      s.loading ? (y(), x("div", u1, [...g[2] || (g[2] = [
        j('<div class="loading-container" data-v-216eadc2><div class="chart-bars-loader" data-v-216eadc2><div class="bar bar-1" data-v-216eadc2></div><div class="bar bar-2" data-v-216eadc2></div><div class="bar bar-3" data-v-216eadc2></div><div class="bar bar-4" data-v-216eadc2></div><div class="bar bar-5" data-v-216eadc2></div></div><p class="loading-text" data-v-216eadc2>Loading language data...</p></div>', 1)
      ])])) : (y(), x("div", f1, [
        l.value ? (y(), x("section", g1, [
          V(xs, {
            data: u.value,
            options: f.value
          }, null, 8, ["data", "options"])
        ])) : (y(), x("section", p1, [...g[3] || (g[3] = [
          j('<div class="empty-state-content" data-v-216eadc2><div class="empty-icon-wrapper" data-v-216eadc2><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-216eadc2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" data-v-216eadc2></path></svg></div><p class="empty-title" data-v-216eadc2>No language data available</p><p class="empty-description" data-v-216eadc2>No language selection data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), m1 = /* @__PURE__ */ K(b1, [["__scopeId", "data-v-216eadc2"]]), v1 = { class: "guardrails-card" }, _1 = { class: "card-header" }, y1 = { class: "header-content" }, x1 = {
  key: 0,
  class: "total-badge"
}, k1 = { class: "badge-value" }, M1 = {
  key: 0,
  class: "loading-state"
}, S1 = {
  key: 1,
  class: "card-body"
}, w1 = { class: "summary-card" }, C1 = { class: "summary-items" }, $1 = { class: "summary-item" }, D1 = { class: "summary-value" }, A1 = { class: "summary-pct" }, T1 = { class: "summary-item" }, B1 = { class: "summary-pct" }, F1 = { class: "summary-item" }, P1 = { class: "summary-value" }, L1 = { class: "summary-pct" }, E1 = {
  key: 0,
  class: "table-section"
}, O1 = { class: "table-wrapper" }, R1 = { class: "data-table" }, I1 = { class: "table-body" }, z1 = { class: "table-cell font-medium text-center" }, W1 = { class: "table-cell text-center font-semibold" }, N1 = { class: "table-cell" }, H1 = { class: "type-badges-row" }, j1 = {
  key: 1,
  class: "empty-state"
}, V1 = /* @__PURE__ */ G({
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
    const a = e, n = s, i = (g) => {
      n("export", g);
    }, { isDark: o } = J(Q(a, "theme")), r = T(
      () => a.data?.items && a.data.items.length > 0
    ), l = T(
      () => (a.data?.items || []).reduce((g, b) => g + b.count, 0)
    ), d = (g) => {
      const b = {};
      for (const _ of a.data?.items || [])
        b[_[g]] = (b[_[g]] || 0) + _.count;
      const m = Object.entries(b).sort((_, k) => k[1] - _[1]);
      if (m.length === 0) return { name: "—", pct: 0 };
      const v = l.value;
      return {
        name: m[0][0],
        pct: v > 0 ? Math.round(m[0][1] / v * 100) : 0
      };
    }, h = T(() => d("guardrail_type")), u = T(() => d("guardrail_action")), f = T(() => d("guardrail_source")), p = T(() => {
      const g = {};
      for (const b of a.data?.items || [])
        g[b.date] || (g[b.date] = {}), g[b.date][b.guardrail_type] = (g[b.date][b.guardrail_type] || 0) + b.count;
      return Object.entries(g).map(([b, m]) => ({
        date: b,
        total: Object.values(m).reduce((v, _) => v + _, 0),
        types: Object.entries(m).map(([v, _]) => ({ type: v, count: _ })).sort((v, _) => _.count - v.count)
      })).sort((b, m) => new Date(b.date).getTime() - new Date(m.date).getTime());
    });
    return t({ isDark: o }), (g, b) => (y(), x("article", v1, [
      c("header", _1, [
        c("div", y1, [
          b[1] || (b[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Guardrails Metrics"),
            c("p", { class: "card-subtitle" }, "Content safety guardrail events and actions")
          ], -1)),
          a.loading ? I("", !0) : (y(), x("div", x1, [
            b[0] || (b[0] = c("p", { class: "badge-label" }, "Total Events", -1)),
            c("p", k1, w(F(z)(l.value)), 1)
          ]))
        ])
      ]),
      a.loading ? (y(), x("div", M1, [...b[2] || (b[2] = [
        j('<div class="loading-container" data-v-3db385ab><div class="chart-bars-loader" data-v-3db385ab><div class="bar bar-1" data-v-3db385ab></div><div class="bar bar-2" data-v-3db385ab></div><div class="bar bar-3" data-v-3db385ab></div><div class="bar bar-4" data-v-3db385ab></div><div class="bar bar-5" data-v-3db385ab></div></div><p class="loading-text" data-v-3db385ab>Loading guardrails data...</p></div>', 1)
      ])])) : (y(), x("div", S1, [
        r.value ? (y(), x(Y, { key: 0 }, [
          c("div", w1, [
            c("div", C1, [
              c("div", $1, [
                b[3] || (b[3] = c("span", { class: "summary-label" }, "Top type:", -1)),
                c("span", D1, w(h.value.name), 1),
                c("span", A1, "(" + w(h.value.pct) + "%)", 1)
              ]),
              b[6] || (b[6] = c("span", { class: "summary-dot" }, "·", -1)),
              c("div", T1, [
                b[4] || (b[4] = c("span", { class: "summary-label" }, "Top action:", -1)),
                c("span", {
                  class: Pe(["summary-value", `summary-action-${u.value.name.toLowerCase()}`])
                }, w(u.value.name), 3),
                c("span", B1, "(" + w(u.value.pct) + "%)", 1)
              ]),
              b[7] || (b[7] = c("span", { class: "summary-dot" }, "·", -1)),
              c("div", F1, [
                b[5] || (b[5] = c("span", { class: "summary-label" }, "Top source:", -1)),
                c("span", P1, w(f.value.name), 1),
                c("span", L1, "(" + w(f.value.pct) + "%)", 1)
              ])
            ])
          ]),
          p.value.length > 0 ? (y(), x("section", E1, [
            b[9] || (b[9] = c("div", { class: "section-header" }, [
              c("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            c("div", O1, [
              c("table", R1, [
                b[8] || (b[8] = c("thead", null, [
                  c("tr", { class: "table-header-row" }, [
                    c("th", { class: "table-header" }, "Date"),
                    c("th", { class: "table-header text-center" }, "Count"),
                    c("th", { class: "table-header" }, "Types")
                  ])
                ], -1)),
                c("tbody", I1, [
                  (y(!0), x(Y, null, et(p.value, (m) => (y(), x("tr", {
                    key: m.date,
                    class: "table-row"
                  }, [
                    c("td", z1, w(F(Ct)(m.date).format("DD/MM")), 1),
                    c("td", W1, w(F(z)(m.total)), 1),
                    c("td", N1, [
                      c("div", H1, [
                        (y(!0), x(Y, null, et(m.types, (v) => (y(), x("span", {
                          key: v.type,
                          class: "type-count-badge"
                        }, w(v.type) + " (" + w(v.count) + ") ", 1))), 128))
                      ])
                    ])
                  ]))), 128))
                ])
              ])
            ]),
            e.enableExport ? (y(), lt(F(ft), {
              key: 0,
              onExport: i,
              loading: e.exportLoading
            }, null, 8, ["loading"])) : I("", !0)
          ])) : I("", !0)
        ], 64)) : (y(), x("section", j1, [...b[10] || (b[10] = [
          j('<div class="empty-state-content" data-v-3db385ab><div class="empty-icon-wrapper" data-v-3db385ab><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-3db385ab><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" data-v-3db385ab></path></svg></div><p class="empty-title" data-v-3db385ab>No guardrail events</p><p class="empty-description" data-v-3db385ab>No content safety events found for the selected period. This is a good sign!</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Y1 = /* @__PURE__ */ K(V1, [["__scopeId", "data-v-3db385ab"]]), q1 = { class: "dn-metrics-card" }, U1 = { class: "card-header" }, K1 = { class: "header-content" }, X1 = {
  key: 0,
  class: "total-docs-badge"
}, G1 = { class: "badge-value" }, Z1 = {
  key: 0,
  class: "loading-state"
}, Q1 = {
  key: 1,
  class: "card-body"
}, J1 = { class: "kpi-grid" }, t_ = { class: "kpi-card kpi-neutral" }, e_ = { class: "kpi-value" }, s_ = { class: "kpi-card kpi-success" }, a_ = { class: "kpi-value kpi-value-success" }, n_ = { class: "kpi-pct" }, i_ = { class: "kpi-card kpi-danger" }, o_ = { class: "kpi-value kpi-value-error" }, r_ = { class: "kpi-pct" }, l_ = { class: "kpi-card kpi-warning" }, c_ = { class: "kpi-value kpi-value-reason" }, d_ = { class: "kpi-pct" }, h_ = { class: "chart-section" }, u_ = { class: "chart-wrapper" }, f_ = {
  key: 1,
  class: "empty-chart"
}, g_ = {
  key: 0,
  class: "table-section"
}, p_ = { class: "table-wrapper" }, b_ = { class: "data-table" }, m_ = { class: "table-body" }, v_ = { class: "table-cell text-left font-medium" }, __ = { class: "table-cell text-center font-semibold" }, y_ = { class: "table-cell text-center" }, x_ = { class: "impact-bar-container" }, k_ = { class: "impact-label" }, M_ = {
  key: 1,
  class: "chart-section"
}, S_ = { class: "chart-wrapper" }, w_ = { class: "system-health" }, C_ = { class: "system-health-content" }, $_ = { class: "sys-kpi-grid" }, D_ = { class: "sys-kpi" }, A_ = { class: "sys-value" }, T_ = { class: "sys-kpi" }, B_ = { class: "sys-value" }, F_ = { class: "sys-kpi" }, P_ = { class: "sys-value sys-error" }, L_ = { class: "sys-kpi" }, E_ = { class: "sys-value" }, O_ = { class: "sys-kpi" }, R_ = { class: "sys-value" }, I_ = { class: "sys-kpi" }, z_ = { class: "sys-value sys-error" }, W_ = {
  key: 1,
  class: "empty-state"
}, N_ = /* @__PURE__ */ G({
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
    const a = e, n = s, i = (S) => {
      n("export", S);
    }, { isDark: o, colors: r } = J(Q(a, "theme")), l = T(() => {
      const S = a.data?.documentCounts?.items || [], M = a.data?.processingCounts?.items || [];
      return S.length > 0 || M.length > 0;
    }), d = T(() => {
      const S = a.data?.documentCounts?.items || [];
      return {
        processing_started: S.reduce((M, C) => M + C.processing_started, 0),
        processing_completed: S.reduce((M, C) => M + C.processing_completed, 0),
        processing_failed: S.reduce((M, C) => M + C.processing_failed, 0),
        row_count_total: S.reduce((M, C) => M + C.row_count_total, 0)
      };
    }), h = T(() => {
      const S = a.data?.processingCounts?.items || [];
      return {
        processing_started: S.reduce((M, C) => M + C.processing_started, 0),
        processing_success: S.reduce((M, C) => M + C.processing_success, 0),
        notification_sent: S.reduce((M, C) => M + C.notification_sent, 0),
        notification_failed: S.reduce((M, C) => M + C.notification_failed, 0),
        dq_phone: S.reduce((M, C) => M + C.dq_error_phone_not_found, 0),
        dq_flight: S.reduce((M, C) => M + C.dq_error_flight_not_found, 0),
        dq_booking: S.reduce((M, C) => M + C.dq_error_booking_not_found, 0),
        dq_other: S.reduce((M, C) => M + C.dq_error_other, 0),
        totalDqErrors: S.reduce((M, C) => M + C.dq_error_phone_not_found + C.dq_error_flight_not_found + C.dq_error_booking_not_found + C.dq_error_other, 0)
      };
    }), u = T(() => d.value.row_count_total || h.value.processing_started), f = T(() => Math.max(0, u.value - h.value.notification_sent)), p = (S, M) => M ? `${Math.round(S / M * 100)}%` : "0%", g = T(() => {
      const S = [
        { reason: "Booking not found", count: h.value.dq_booking },
        { reason: "Phone not found", count: h.value.dq_phone },
        { reason: "Flight not found", count: h.value.dq_flight },
        { reason: "Notification failed", count: h.value.notification_failed },
        { reason: "Other", count: h.value.dq_other }
      ].filter((M) => M.count > 0).sort((M, C) => C.count - M.count);
      return S.length > 0 ? S[0] : { reason: "None", count: 0 };
    }), b = T(() => {
      const S = u.value;
      return [
        { reason: "Booking not found", count: h.value.dq_booking },
        { reason: "Flight not found", count: h.value.dq_flight },
        { reason: "Phone not found", count: h.value.dq_phone },
        { reason: "Notification failed", count: h.value.notification_failed },
        { reason: "Other", count: h.value.dq_other }
      ].map((M) => ({
        ...M,
        impactPct: S > 0 ? Math.round(M.count / S * 100) : 0
      }));
    }), m = T(() => {
      const S = u.value, M = h.value.processing_success, C = Math.max(0, M - h.value.totalDqErrors), $ = h.value.notification_sent, A = Math.max(0, S - M), E = h.value.totalDqErrors, L = Math.max(0, C - $), D = (P, R) => {
        const q = R > 0 ? Math.round(P / R * 100) : 0;
        return `${P.toLocaleString()} (${q}%)`;
      }, B = [
        { name: "Records Detected" },
        { name: "Valid Reservations" },
        { name: "Invalid / Unprocessed" },
        { name: "Contactable" },
        { name: "Data Quality Issues" },
        { name: "Notified" },
        { name: "Not Delivered" }
      ], O = [];
      return M > 0 && O.push({ source: "Records Detected", target: "Valid Reservations", value: M, label: D(M, S) }), A > 0 && O.push({ source: "Records Detected", target: "Invalid / Unprocessed", value: A, label: D(A, S) }), C > 0 && O.push({ source: "Valid Reservations", target: "Contactable", value: C, label: D(C, S) }), E > 0 && O.push({ source: "Valid Reservations", target: "Data Quality Issues", value: E, label: D(E, S) }), $ > 0 && O.push({ source: "Contactable", target: "Notified", value: $, label: D($, S) }), L > 0 && O.push({ source: "Contactable", target: "Not Delivered", value: L, label: D(L, S) }), { nodes: B, links: O };
    }), v = {
      "Records Detected": "#DBEAFE",
      "Valid Reservations": "#D1FAE5",
      "Invalid / Unprocessed": "#FEE2E2",
      Contactable: "#BBF7D0",
      "Data Quality Issues": "#FED7AA",
      Notified: "#86EFAC",
      "Not Delivered": "#FCA5A5"
    }, _ = T(() => {
      const S = [...a.data?.processingCounts?.items || []].sort(
        (D, B) => new Date(D.date).getTime() - new Date(B.date).getTime()
      ), M = a.data?.documentCounts?.items || [], C = {};
      for (const D of M)
        C[D.date] = (C[D.date] || 0) + D.row_count_total;
      const $ = [.../* @__PURE__ */ new Set([...S.map((D) => D.date), ...M.map((D) => D.date)])].sort(), A = $.map((D) => Ct(D).format("MMM DD")), E = $.map((D) => {
        const B = S.find((R) => R.date === D), O = B?.notification_sent || 0, P = C[D] || B?.processing_started || 0;
        return P > 0 ? Math.round(O / P * 100) : 0;
      }), L = $.map((D) => S.find((O) => O.date === D)?.notification_sent || 0);
      return {
        labels: A,
        datasets: [
          {
            label: "Success Rate (%)",
            data: E,
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
            data: L,
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
    }), k = T(() => ({
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
          borderColor: o.value ? "rgba(198,125,255,0.2)" : "rgba(0,0,0,0.1)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: (S) => S.datasetIndex === 0 ? ` Success Rate: ${S.raw}%` : ` Notifications: ${S.raw}`
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
          ticks: { font: { family: "'DM Sans', sans-serif", size: 11 }, color: r.value.textSecondary, callback: (S) => S + "%" },
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
    return t({ isDark: o }), (S, M) => (y(), x("article", q1, [
      c("header", U1, [
        c("div", K1, [
          M[1] || (M[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Disruption Notifier"),
            c("p", { class: "card-subtitle" }, "Passenger notification effectiveness and delivery analysis")
          ], -1)),
          a.loading ? I("", !0) : (y(), x("div", X1, [
            M[0] || (M[0] = c("p", { class: "badge-label" }, "Total Records", -1)),
            c("p", G1, w(F(z)(d.value.row_count_total)), 1)
          ]))
        ])
      ]),
      a.loading ? (y(), x("div", Z1, [...M[2] || (M[2] = [
        j('<div class="loading-container" data-v-d8baf32c><div class="chart-bars-loader" data-v-d8baf32c><div class="bar bar-1" data-v-d8baf32c></div><div class="bar bar-2" data-v-d8baf32c></div><div class="bar bar-3" data-v-d8baf32c></div><div class="bar bar-4" data-v-d8baf32c></div><div class="bar bar-5" data-v-d8baf32c></div></div><p class="loading-text" data-v-d8baf32c>Loading disruption notifier data...</p></div>', 1)
      ])])) : (y(), x("div", Q1, [
        l.value ? (y(), x(Y, { key: 0 }, [
          c("div", J1, [
            c("div", t_, [
              M[3] || (M[3] = c("span", { class: "kpi-label" }, "Passengers Affected", -1)),
              c("span", e_, w(F(z)(u.value)), 1)
            ]),
            c("div", s_, [
              M[4] || (M[4] = c("span", { class: "kpi-label" }, "Successfully Notified", -1)),
              c("span", a_, w(F(z)(h.value.notification_sent)), 1),
              c("span", n_, w(p(h.value.notification_sent, u.value)), 1)
            ]),
            c("div", i_, [
              M[5] || (M[5] = c("span", { class: "kpi-label" }, "Not Notified", -1)),
              c("span", o_, w(F(z)(f.value)), 1),
              c("span", r_, w(p(f.value, u.value)), 1)
            ]),
            c("div", l_, [
              M[6] || (M[6] = c("span", { class: "kpi-label" }, "Main Failure Reason", -1)),
              c("span", c_, w(g.value.reason), 1),
              c("span", d_, w(F(z)(g.value.count)) + " cases", 1)
            ])
          ]),
          c("section", h_, [
            M[8] || (M[8] = c("div", { class: "chart-header" }, [
              c("h4", { class: "section-title" }, "Passenger Disruption Funnel")
            ], -1)),
            c("div", u_, [
              m.value.nodes.length > 0 && m.value.links.length > 0 ? (y(), lt(Qt, {
                key: 0,
                data: m.value,
                "node-colors": v,
                height: "350px"
              }, null, 8, ["data"])) : (y(), x("div", f_, [...M[7] || (M[7] = [
                c("p", { class: "empty-chart-text" }, "No processing data available for visualization", -1)
              ])]))
            ])
          ]),
          b.value.length > 0 ? (y(), x("section", g_, [
            M[10] || (M[10] = c("div", { class: "section-header" }, [
              c("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
            ], -1)),
            c("div", p_, [
              c("table", b_, [
                M[9] || (M[9] = c("thead", null, [
                  c("tr", { class: "table-header-row" }, [
                    c("th", { class: "table-header text-left" }, "Reason"),
                    c("th", { class: "table-header text-center" }, "Count"),
                    c("th", { class: "table-header text-center" }, "Impact")
                  ])
                ], -1)),
                c("tbody", m_, [
                  (y(!0), x(Y, null, et(b.value, (C) => (y(), x("tr", {
                    key: C.reason,
                    class: "table-row"
                  }, [
                    c("td", v_, w(C.reason), 1),
                    c("td", __, w(F(z)(C.count)), 1),
                    c("td", y_, [
                      c("div", x_, [
                        c("div", {
                          class: "impact-bar",
                          style: mt({ width: C.impactPct + "%" })
                        }, null, 4),
                        c("span", k_, w(C.impactPct) + "%", 1)
                      ])
                    ])
                  ]))), 128))
                ])
              ])
            ])
          ])) : I("", !0),
          _.value.labels.length > 0 ? (y(), x("section", M_, [
            M[11] || (M[11] = c("div", { class: "chart-header" }, [
              c("h4", { class: "section-title" }, "Notification Success Rate by Day")
            ], -1)),
            c("div", S_, [
              V(Zt, {
                data: _.value,
                options: k.value
              }, null, 8, ["data", "options"])
            ])
          ])) : I("", !0),
          c("details", w_, [
            M[18] || (M[18] = c("summary", { class: "system-health-toggle" }, [
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
              oe(" System Health Details ")
            ], -1)),
            c("div", C_, [
              c("div", $_, [
                c("div", D_, [
                  M[12] || (M[12] = c("span", { class: "sys-label" }, "Docs Started", -1)),
                  c("span", A_, w(F(z)(d.value.processing_started)), 1)
                ]),
                c("div", T_, [
                  M[13] || (M[13] = c("span", { class: "sys-label" }, "Docs Completed", -1)),
                  c("span", B_, w(F(z)(d.value.processing_completed)), 1)
                ]),
                c("div", F_, [
                  M[14] || (M[14] = c("span", { class: "sys-label" }, "Docs Failed", -1)),
                  c("span", P_, w(F(z)(d.value.processing_failed)), 1)
                ]),
                c("div", L_, [
                  M[15] || (M[15] = c("span", { class: "sys-label" }, "Processing Started", -1)),
                  c("span", E_, w(F(z)(h.value.processing_started)), 1)
                ]),
                c("div", O_, [
                  M[16] || (M[16] = c("span", { class: "sys-label" }, "Processing Success", -1)),
                  c("span", R_, w(F(z)(h.value.processing_success)), 1)
                ]),
                c("div", I_, [
                  M[17] || (M[17] = c("span", { class: "sys-label" }, "Notification Failed", -1)),
                  c("span", z_, w(F(z)(h.value.notification_failed)), 1)
                ])
              ])
            ])
          ]),
          e.enableExport ? (y(), lt(F(ft), {
            key: 2,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ], 64)) : (y(), x("section", W_, [...M[19] || (M[19] = [
          j('<div class="empty-state-content" data-v-d8baf32c><div class="empty-icon-wrapper" data-v-d8baf32c><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d8baf32c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" data-v-d8baf32c></path></svg></div><p class="empty-title" data-v-d8baf32c>No disruption notifier data</p><p class="empty-description" data-v-d8baf32c>No disruption notification data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), H_ = /* @__PURE__ */ K(N_, [["__scopeId", "data-v-d8baf32c"]]), j_ = { class: "nps-daily-card" }, V_ = { class: "card-header" }, Y_ = { class: "header-content" }, q_ = {
  key: 0,
  class: "stats-badge"
}, U_ = { class: "badge-value" }, K_ = {
  key: 0,
  class: "loading-state"
}, X_ = {
  key: 1,
  class: "card-body"
}, G_ = { class: "tooltip-content" }, Z_ = { class: "tooltip-title" }, Q_ = { class: "tooltip-stats" }, J_ = { class: "tooltip-stat-row" }, ty = { class: "tooltip-value" }, ey = { class: "tooltip-stat-row" }, sy = { class: "tooltip-value" }, ay = { class: "tooltip-stat-row" }, ny = { class: "tooltip-value" }, iy = { class: "tooltip-stat-row" }, oy = { class: "tooltip-value" }, ry = { class: "tooltip-stat-row" }, ly = { class: "tooltip-value" }, cy = { class: "tooltip-stat-row" }, dy = { class: "tooltip-value" }, hy = {
  key: 2,
  class: "empty-state"
}, On = 400, we = 60, Rn = 90, In = 120, uy = {
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
    }, i = e, { isDark: o } = J(Q(i, "theme")), r = T(() => i.data), l = xt(null), d = xt({
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
      return Math.max(800, we * 2 + m * In);
    }), u = (m, v) => {
      const k = (m - 1) / 9;
      return we + v - k * v;
    }, f = (m) => m ? Ct(m).format("DD-MM-YYYY") : "", p = T(() => {
      if (!r.value || !r.value.nps_by_day || r.value.nps_by_day.length === 0)
        return [];
      const m = [], v = On - we - Rn;
      return r.value.nps_by_day.forEach((_, k) => {
        const S = _.min_score || 0, M = _.q1_score || 0, C = _.median_score || 0, $ = _.q3_score || 0, A = _.max_score || 0, E = _.average_score || 0;
        m.push({
          label: f(_.date),
          responseCount: _.nps_responses_count || 0,
          isTotal: !1,
          low: S,
          q1: M,
          median: C,
          q3: $,
          high: A,
          average: E,
          highY: u(A, v),
          lowY: u(S, v),
          q1Y: u(M, v),
          q3Y: u($, v),
          medianY: u(C, v),
          averageY: E > 0 ? u(E, v) : null,
          centerX: we + (k + 1) * In
        });
      }), m;
    }), g = (m, v) => {
      if (!l.value || !v || v.horizontal) return;
      const _ = l.value.getBoundingClientRect(), k = m.clientX, S = m.clientY, M = 140, C = 160, $ = 10, A = 15;
      let E = k - _.left - M / 2, L = S - _.top - C - A;
      E = Math.max($, Math.min(E, _.width - M - $)), L < $ && (L = S - _.top + A), L = Math.max($, Math.min(L, _.height - C - $)), d.value = {
        visible: !0,
        x: E,
        y: L,
        date: v.label || "",
        min: v.low !== void 0 ? v.low.toFixed(1) : "N/A",
        max: v.high !== void 0 ? v.high.toFixed(1) : "N/A",
        q1: v.open !== void 0 ? v.open.toFixed(1) : "N/A",
        avg: v.average !== void 0 && v.average > 0 ? v.average.toFixed(1) : "N/A",
        q3: v.close !== void 0 ? v.close.toFixed(1) : "N/A",
        median: v.median !== void 0 ? v.median.toFixed(1) : "N/A"
      };
    }, b = () => {
      d.value.visible = !1;
    };
    return t({ isDark: o }), (m, v) => (y(), x("article", j_, [
      c("header", V_, [
        c("div", Y_, [
          v[1] || (v[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "CSAT Daily Metrics"),
            c("p", { class: "card-subtitle" }, "Daily CSAT Distribution")
          ], -1)),
          r.value && r.value.nps_by_day && r.value.nps_by_day.length > 0 ? (y(), x("div", q_, [
            v[0] || (v[0] = c("p", { class: "badge-label" }, "Days", -1)),
            c("p", U_, w(r.value.nps_by_day.length), 1)
          ])) : I("", !0)
        ])
      ]),
      i.loading ? (y(), x("div", K_, [...v[2] || (v[2] = [
        j('<div class="loading-container" data-v-b20112a7><div class="chart-flow-loader" data-v-b20112a7><div class="flow-line flow-1" data-v-b20112a7></div><div class="flow-line flow-2" data-v-b20112a7></div><div class="flow-line flow-3" data-v-b20112a7></div><div class="flow-line flow-4" data-v-b20112a7></div><div class="flow-line flow-5" data-v-b20112a7></div></div><p class="loading-text" data-v-b20112a7>Loading daily NPS data...</p></div>', 1)
      ])])) : r.value && r.value.nps_by_day && r.value.nps_by_day.length > 0 ? (y(), x("div", X_, [
        c("div", {
          class: "chart-wrapper",
          ref_key: "chartContainerRef",
          ref: l
        }, [
          p.value && p.value.length > 0 ? (y(), lt(Wi, {
            key: 0,
            "candlestick-data": p.value,
            "chart-width": h.value,
            "chart-height": On,
            "chart-margin": we,
            "chart-bottom-margin": Rn,
            "show-legend": !0,
            rotation: 0,
            "candle-width": 30,
            onCandleHover: g,
            onCandleLeave: b
          }, null, 8, ["candlestick-data", "chart-width"])) : I("", !0),
          d.value.visible ? (y(), x("div", {
            key: 1,
            class: "tooltip-overlay",
            style: mt({
              left: `${d.value.x}px`,
              top: `${d.value.y}px`
            })
          }, [
            c("div", G_, [
              c("div", Z_, w(d.value.date), 1),
              v[9] || (v[9] = c("div", { class: "tooltip-divider" }, null, -1)),
              c("div", Q_, [
                c("div", J_, [
                  v[3] || (v[3] = c("span", { class: "tooltip-label tooltip-min" }, "Min:", -1)),
                  c("span", ty, w(d.value.min), 1)
                ]),
                c("div", ey, [
                  v[4] || (v[4] = c("span", { class: "tooltip-label tooltip-q1" }, "Q1:", -1)),
                  c("span", sy, w(d.value.q1), 1)
                ]),
                c("div", ay, [
                  v[5] || (v[5] = c("span", { class: "tooltip-label tooltip-median" }, "Median:", -1)),
                  c("span", ny, w(d.value.median), 1)
                ]),
                c("div", iy, [
                  v[6] || (v[6] = c("span", { class: "tooltip-label tooltip-avg" }, "Avg:", -1)),
                  c("span", oy, w(d.value.avg), 1)
                ]),
                c("div", ry, [
                  v[7] || (v[7] = c("span", { class: "tooltip-label tooltip-q3" }, "Q3:", -1)),
                  c("span", ly, w(d.value.q3), 1)
                ]),
                c("div", cy, [
                  v[8] || (v[8] = c("span", { class: "tooltip-label tooltip-max" }, "Max:", -1)),
                  c("span", dy, w(d.value.max), 1)
                ])
              ])
            ])
          ], 4)) : I("", !0)
        ], 512),
        e.enableExport ? (y(), lt(F(ft), {
          key: 0,
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : I("", !0)
      ])) : (y(), x("div", hy, [...v[10] || (v[10] = [
        j('<div class="empty-state-content" data-v-b20112a7><div class="empty-icon-wrapper" data-v-b20112a7><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-b20112a7><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-b20112a7></path></svg></div><p class="empty-title" data-v-b20112a7>No daily NPS data available</p><p class="empty-description" data-v-b20112a7>No daily NPS data found for the selected period. Try adjusting the date range.</p></div>', 1)
      ])]))
    ]));
  }
}, Hi = /* @__PURE__ */ K(uy, [["__scopeId", "data-v-b20112a7"]]), fy = { class: "nps-overview-card" }, gy = { class: "card-header" }, py = { class: "header-content" }, by = { class: "header-badges" }, my = {
  key: 0,
  class: "stats-badge"
}, vy = { class: "badge-value" }, _y = {
  key: 0,
  class: "loading-state"
}, yy = {
  key: 1,
  class: "card-body"
}, xy = { class: "chart-wrapper" }, ky = {
  key: 2,
  class: "empty-state"
}, My = 500, Sy = 60, wy = 80, Cy = {
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
    }, i = e, { isDark: o } = J(Q(i, "theme")), r = T(() => i.data), l = T(() => Math.max(600, window.innerWidth * 0.85));
    return t({ isDark: o }), (d, h) => (y(), x("article", fy, [
      c("header", gy, [
        c("div", py, [
          h[1] || (h[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "CSAT Overview Metrics"),
            c("p", { class: "card-subtitle" }, "Overall CSAT Distribution")
          ], -1)),
          c("div", by, [
            r.value && r.value.total_nps_responses > 0 ? (y(), x("div", my, [
              h[0] || (h[0] = c("p", { class: "badge-label" }, "Responses", -1)),
              c("p", vy, w(r.value.total_nps_responses), 1)
            ])) : I("", !0)
          ])
        ])
      ]),
      i.loading ? (y(), x("div", _y, [...h[2] || (h[2] = [
        j('<div class="loading-container" data-v-02f6366c><div class="chart-flow-loader" data-v-02f6366c><div class="flow-line flow-1" data-v-02f6366c></div><div class="flow-line flow-2" data-v-02f6366c></div><div class="flow-line flow-3" data-v-02f6366c></div><div class="flow-line flow-4" data-v-02f6366c></div><div class="flow-line flow-5" data-v-02f6366c></div></div><p class="loading-text" data-v-02f6366c>Loading NPS data...</p></div>', 1)
      ])])) : r.value && r.value.total_nps_responses > 0 ? (y(), x("div", yy, [
        c("div", xy, [
          V(Ni, {
            histogram: r.value.histogram || [],
            "min-score": r.value.min_score || 0,
            "max-score": r.value.max_score || 0,
            "q1-score": r.value.q1_score || 0,
            "median-score": r.value.median_score || 0,
            "q3-score": r.value.q3_score || 0,
            "average-score": r.value.average_score || 0,
            "chart-width": l.value,
            "chart-height": My,
            "chart-margin": Sy,
            "chart-bottom-margin": wy
          }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score", "chart-width"])
        ]),
        e.enableExport ? (y(), lt(F(ft), {
          key: 0,
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : I("", !0)
      ])) : (y(), x("div", ky, [...h[3] || (h[3] = [
        j('<div class="empty-state-content" data-v-02f6366c><div class="empty-icon-wrapper" data-v-02f6366c><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-02f6366c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-02f6366c></path></svg></div><p class="empty-title" data-v-02f6366c>No NPS data available</p><p class="empty-description" data-v-02f6366c>No NPS data found for the selected period. Try adjusting the date range.</p></div>', 1)
      ])]))
    ]));
  }
}, ji = /* @__PURE__ */ K(Cy, [["__scopeId", "data-v-02f6366c"]]), $y = { class: "nps-metrics-container" }, Dy = {
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
    return (n, i) => (y(), x("div", $y, [
      V(ji, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: a
      }, null, 8, ["data", "loading", "enable-export"]),
      V(Hi, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: a
      }, null, 8, ["data", "loading", "enable-export"])
    ]));
  }
}, Ay = /* @__PURE__ */ K(Dy, [["__scopeId", "data-v-25fe3b80"]]), Ty = { class: "aws-cost-card" }, By = { class: "card-header" }, Fy = { class: "header-main" }, Py = { class: "header-content" }, Ly = { class: "card-title" }, Ey = { class: "header-stats" }, Oy = { class: "stat-badge primary" }, Ry = { class: "stat-value" }, Iy = { class: "stat-badge secondary" }, zy = { class: "stat-value" }, Wy = { class: "card-body" }, Ny = {
  key: 0,
  class: "loading-state"
}, Hy = {
  key: 1,
  class: "chart-section"
}, jy = { class: "chart-container" }, Vy = {
  key: 2,
  class: "empty-state"
}, Yy = { class: "empty-state-content" }, qy = { class: "empty-icon-wrapper" }, Uy = {
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
    const t = e, { isDark: s, colors: a } = J(Q(t, "theme")), n = T(() => {
      const r = t.data ?? {}, l = r.daily, d = r.days, h = Array.isArray(l) && l.length > 0, u = Array.isArray(d) && d.length > 0 && Array.isArray(r.allocatedCostSeries) && r.allocatedCostSeries.length === d.length;
      let f = [];
      return h ? f = l : u && (f = d.map((p, g) => ({
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
    }), i = T(() => {
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
            callback: (r) => rt(r)
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
    return (r, l) => (y(), x("article", Ty, [
      c("header", By, [
        c("div", Fy, [
          c("div", Py, [
            c("h3", Ly, w(n.value.airline_name || "AWS Cost"), 1),
            l[0] || (l[0] = c("p", { class: "card-subtitle" }, "AWS vs Allocated costs over time", -1))
          ]),
          c("div", Ey, [
            c("div", Oy, [
              l[1] || (l[1] = c("span", { class: "stat-label" }, "Total Allocated", -1)),
              c("span", Ry, w(F(rt)(n.value.total_allocated_cost)), 1)
            ]),
            c("div", Iy, [
              l[2] || (l[2] = c("span", { class: "stat-label" }, "Total AWS", -1)),
              c("span", zy, w(F(rt)(n.value.total_cost)), 1)
            ])
          ])
        ])
      ]),
      c("div", Wy, [
        e.loading ? (y(), x("div", Ny, [...l[3] || (l[3] = [
          j('<div class="loading-container" data-v-c023bd59><div class="chart-lines-loader" data-v-c023bd59><div class="line line-1" data-v-c023bd59></div><div class="line line-2" data-v-c023bd59></div><div class="line line-3" data-v-c023bd59></div><div class="line line-4" data-v-c023bd59></div><div class="line line-5" data-v-c023bd59></div></div><p class="loading-text" data-v-c023bd59>Loading chart data...</p></div>', 1)
        ])])) : n.value.daily.length > 0 ? (y(), x("div", Hy, [
          c("div", jy, [
            V(Zt, {
              data: i.value,
              options: o.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", Vy, [
          c("div", Yy, [
            c("div", qy, [
              V(F($t), { class: "empty-icon" })
            ]),
            l[4] || (l[4] = c("p", { class: "empty-title" }, "Sin datos de costos", -1)),
            l[5] || (l[5] = c("p", { class: "empty-description" }, "No se encontró información para el periodo seleccionado. Intenta ajustar el rango de fechas.", -1))
          ])
        ]))
      ])
    ]));
  }
}, Ky = /* @__PURE__ */ K(Uy, [["__scopeId", "data-v-c023bd59"]]), Xy = { class: "cost-usage-card" }, Gy = {
  key: 0,
  class: "card-body"
}, Zy = {
  key: 0,
  class: "chart-section"
}, Qy = { class: "chart-container" }, Jy = { class: "kpi-grid" }, t2 = { class: "kpi-card" }, e2 = { class: "kpi-value" }, s2 = { class: "kpi-card" }, a2 = { class: "kpi-value" }, n2 = { class: "kpi-card" }, i2 = { class: "kpi-value" }, o2 = { class: "kpi-card" }, r2 = { class: "kpi-value" }, l2 = { class: "kpi-card" }, c2 = { class: "kpi-value" }, d2 = { class: "kpi-card highlighted" }, h2 = { class: "kpi-value gradient-text" }, u2 = {
  key: 1,
  class: "empty-state"
}, f2 = { class: "empty-state-content" }, g2 = { class: "empty-icon-wrapper" }, p2 = {
  key: 1,
  class: "loading-state"
}, b2 = /* @__PURE__ */ G({
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
    const a = e, { isDark: n, colors: i } = J(Q(a, "theme")), o = (g) => {
      const b = new Date(g), m = String(b.getDate()).padStart(2, "0"), v = String(b.getMonth() + 1).padStart(2, "0");
      return `${m}-${v}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = T(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((b, m) => b + (m.input_cost || 0), 0);
    }), d = T(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((b, m) => b + (m.output_cost || 0), 0);
    }), h = T(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((b, m) => b + (m.cache_read_cost || 0), 0);
    }), u = T(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((b, m) => b + (m.cache_write_cost || 0), 0);
    }), f = T(() => {
      const g = a.data?.costs_by_day || {}, b = Object.keys(g).sort();
      if (b.length === 0)
        return { labels: [], datasets: [] };
      const m = b.map((_) => o(_)), v = [
        {
          label: "Input Cost",
          data: b.map((_) => g[_]?.input_cost || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: b.map((_) => g[_]?.output_cost || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: b.map((_) => g[_]?.cache_read_cost || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: b.map((_) => g[_]?.cache_write_cost || 0),
          backgroundColor: `${r.cache_write}80`,
          borderColor: r.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: m,
        datasets: v
      };
    }), p = T(() => a.options ? a.options : {
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
              let b = g.dataset.label || "";
              return b && (b += ": "), g.parsed.y !== null && (b += rt(g.parsed.y)), b;
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
            callback: function(g) {
              return rt(g);
            }
          }
        }
      }
    });
    return t({ isDark: n }), (g, b) => (y(), x("article", Xy, [
      b[9] || (b[9] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Cost Usage"),
          c("p", { class: "card-subtitle" }, "Cost breakdown over time (stacked)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", p2, [...b[8] || (b[8] = [
        j('<div class="loading-container" data-v-62f96954><div class="chart-lines-loader" data-v-62f96954><div class="line line-1" data-v-62f96954></div><div class="line line-2" data-v-62f96954></div><div class="line line-3" data-v-62f96954></div><div class="line line-4" data-v-62f96954></div><div class="line line-5" data-v-62f96954></div></div><p class="loading-text" data-v-62f96954>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", Gy, [
        f.value.labels && f.value.labels.length ? (y(), x("section", Zy, [
          c("div", Qy, [
            V(Gt, {
              data: f.value,
              options: p.value,
              stacked: !0
            }, null, 8, ["data", "options"])
          ]),
          c("footer", Jy, [
            c("div", t2, [
              b[0] || (b[0] = c("span", { class: "kpi-label" }, "Total Cost", -1)),
              c("span", e2, w(F(rt)(e.data.total_cost)), 1)
            ]),
            c("div", s2, [
              b[1] || (b[1] = c("span", { class: "kpi-label" }, "Input Cost", -1)),
              c("span", a2, w(F(rt)(l.value)), 1)
            ]),
            c("div", n2, [
              b[2] || (b[2] = c("span", { class: "kpi-label" }, "Output Cost", -1)),
              c("span", i2, w(F(rt)(d.value)), 1)
            ]),
            c("div", o2, [
              b[3] || (b[3] = c("span", { class: "kpi-label" }, "Cache Read", -1)),
              c("span", r2, w(F(rt)(h.value)), 1)
            ]),
            c("div", l2, [
              b[4] || (b[4] = c("span", { class: "kpi-label" }, "Cache Write", -1)),
              c("span", c2, w(F(rt)(u.value)), 1)
            ]),
            c("div", d2, [
              b[5] || (b[5] = c("span", { class: "kpi-label" }, "Avg / Conv.", -1)),
              c("span", h2, w(F(rt)(e.data.avg_cost_per_conversation)), 1)
            ])
          ])
        ])) : (y(), x("section", u2, [
          c("div", f2, [
            c("div", g2, [
              V(F($t), { class: "empty-icon" })
            ]),
            b[6] || (b[6] = c("p", { class: "empty-title" }, "No cost usage data", -1)),
            b[7] || (b[7] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see cost breakdown trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), m2 = /* @__PURE__ */ K(b2, [["__scopeId", "data-v-62f96954"]]), v2 = { class: "token-usage-card" }, _2 = {
  key: 0,
  class: "card-body"
}, y2 = {
  key: 0,
  class: "chart-section"
}, x2 = { class: "chart-container" }, k2 = { class: "kpi-grid" }, M2 = { class: "kpi-card" }, S2 = { class: "kpi-value" }, w2 = { class: "kpi-card" }, C2 = { class: "kpi-value" }, $2 = { class: "kpi-card" }, D2 = { class: "kpi-value" }, A2 = { class: "kpi-card" }, T2 = { class: "kpi-value" }, B2 = { class: "kpi-card" }, F2 = { class: "kpi-value" }, P2 = {
  key: 1,
  class: "empty-state"
}, L2 = { class: "empty-state-content" }, E2 = { class: "empty-icon-wrapper" }, O2 = {
  key: 1,
  class: "loading-state"
}, R2 = /* @__PURE__ */ G({
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
    const a = e, { isDark: n, colors: i } = J(Q(a, "theme")), o = (h) => {
      const u = new Date(h), f = String(u.getDate()).padStart(2, "0"), p = String(u.getMonth() + 1).padStart(2, "0");
      return `${f}-${p}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = T(() => {
      const h = a.data?.tokens_by_day || {}, u = Object.keys(h).sort();
      if (u.length === 0)
        return { labels: [], datasets: [] };
      const f = u.map((g) => o(g)), p = [
        {
          label: "Input Tokens",
          data: u.map((g) => h[g]?.input_tokens || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Tokens",
          data: u.map((g) => h[g]?.output_tokens || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read",
          data: u.map((g) => h[g]?.cache_read_tokens || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write",
          data: u.map((g) => h[g]?.cache_write_tokens || 0),
          backgroundColor: `${r.cache_write}80`,
          borderColor: r.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: f,
        datasets: p
      };
    }), d = T(() => a.options ? a.options : {
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
    return t({ isDark: n }), (h, u) => (y(), x("article", v2, [
      u[8] || (u[8] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Token Usage"),
          c("p", { class: "card-subtitle" }, "Token consumption over time (stacked)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", O2, [...u[7] || (u[7] = [
        j('<div class="loading-container" data-v-e9e355be><div class="chart-lines-loader" data-v-e9e355be><div class="line line-1" data-v-e9e355be></div><div class="line line-2" data-v-e9e355be></div><div class="line line-3" data-v-e9e355be></div><div class="line line-4" data-v-e9e355be></div><div class="line line-5" data-v-e9e355be></div></div><p class="loading-text" data-v-e9e355be>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", _2, [
        l.value.labels && l.value.labels.length ? (y(), x("section", y2, [
          c("div", x2, [
            V(Gt, {
              data: l.value,
              options: d.value,
              stacked: !0
            }, null, 8, ["data", "options"])
          ]),
          c("footer", k2, [
            c("div", M2, [
              u[0] || (u[0] = c("span", { class: "kpi-label" }, "Total Tokens", -1)),
              c("span", S2, w(F(z)(e.data.total_tokens)), 1)
            ]),
            c("div", w2, [
              u[1] || (u[1] = c("span", { class: "kpi-label" }, "Input", -1)),
              c("span", C2, w(F(z)(e.data.total_input_tokens)), 1)
            ]),
            c("div", $2, [
              u[2] || (u[2] = c("span", { class: "kpi-label" }, "Output", -1)),
              c("span", D2, w(F(z)(e.data.total_output_tokens)), 1)
            ]),
            c("div", A2, [
              u[3] || (u[3] = c("span", { class: "kpi-label" }, "Cache Read", -1)),
              c("span", T2, w(F(z)(e.data.total_cache_read_tokens)), 1)
            ]),
            c("div", B2, [
              u[4] || (u[4] = c("span", { class: "kpi-label" }, "Cache Write", -1)),
              c("span", F2, w(F(z)(e.data.total_cache_write_tokens)), 1)
            ])
          ])
        ])) : (y(), x("section", P2, [
          c("div", L2, [
            c("div", E2, [
              V(F($t), { class: "empty-icon" })
            ]),
            u[5] || (u[5] = c("p", { class: "empty-title" }, "No token usage data", -1)),
            u[6] || (u[6] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see token consumption trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), I2 = /* @__PURE__ */ K(R2, [["__scopeId", "data-v-e9e355be"]]), z2 = { class: "conversation-count-card" }, W2 = { class: "card-header" }, N2 = { class: "header-right" }, H2 = { class: "stat-badge" }, j2 = { class: "stat-value" }, V2 = {
  key: 0,
  class: "card-body"
}, Y2 = {
  key: 0,
  class: "chart-section"
}, q2 = { class: "chart-container" }, U2 = {
  key: 1,
  class: "empty-state"
}, K2 = { class: "empty-state-content" }, X2 = { class: "empty-icon-wrapper" }, G2 = {
  key: 1,
  class: "loading-state"
}, Z2 = /* @__PURE__ */ G({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: a, colors: n } = J(Q(s, "theme")), i = (l) => {
      const d = new Date(l), h = String(d.getDate()).padStart(2, "0");
      return `${String(d.getMonth() + 1).padStart(2, "0")}-${h}`;
    };
    T(() => {
      if (s.data?.start_date && s.data?.end_date) {
        const l = i(s.data.start_date), d = i(s.data.end_date);
        return `${l} - ${d}`;
      }
      return "N/A";
    });
    const o = T(() => {
      const l = s.data?.conversations_by_day || {}, d = Object.keys(l).sort();
      if (d.length === 0)
        return { labels: [], datasets: [] };
      const h = d.map((f) => i(f)), u = [
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
    return t({ isDark: a }), (l, d) => (y(), x("article", z2, [
      c("header", W2, [
        d[1] || (d[1] = c("div", { class: "header-left" }, [
          c("div", { class: "header-content" }, [
            c("h3", { class: "card-title" }, "Conversation Count"),
            c("p", { class: "card-subtitle" }, "Conversations over time")
          ])
        ], -1)),
        c("div", N2, [
          c("div", H2, [
            d[0] || (d[0] = c("span", { class: "stat-label" }, "Total", -1)),
            c("span", j2, w(e.data.total_conversations || 0), 1)
          ])
        ])
      ]),
      e.loading ? (y(), x("div", G2, [...d[4] || (d[4] = [
        j('<div class="loading-container" data-v-846f24b1><div class="chart-lines-loader" data-v-846f24b1><div class="line line-1" data-v-846f24b1></div><div class="line line-2" data-v-846f24b1></div><div class="line line-3" data-v-846f24b1></div><div class="line line-4" data-v-846f24b1></div><div class="line line-5" data-v-846f24b1></div></div><p class="loading-text" data-v-846f24b1>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", V2, [
        o.value.labels && o.value.labels.length ? (y(), x("section", Y2, [
          c("div", q2, [
            V(Zt, {
              data: o.value,
              options: r.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", U2, [
          c("div", K2, [
            c("div", X2, [
              V(F($t), { class: "empty-icon" })
            ]),
            d[2] || (d[2] = c("p", { class: "empty-title" }, "No conversation count data", -1)),
            d[3] || (d[3] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Q2 = /* @__PURE__ */ K(Z2, [["__scopeId", "data-v-846f24b1"]]), J2 = { class: "top-agents-card" }, tx = {
  key: 0,
  class: "card-body"
}, ex = {
  key: 0,
  class: "charts-grid"
}, sx = { class: "chart-section" }, ax = { class: "chart-container" }, nx = { class: "chart-section" }, ix = { class: "chart-container" }, ox = {
  key: 1,
  class: "empty-state"
}, rx = { class: "empty-state-content" }, lx = { class: "empty-icon-wrapper" }, cx = {
  key: 1,
  class: "loading-state"
}, dx = /* @__PURE__ */ G({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: a, colors: n } = J(Q(s, "theme")), i = T(() => s.data?.top_agents && s.data.top_agents.length > 0), o = T(() => s.data?.top_agents ? [...s.data.top_agents].sort((f, p) => (p.total_cost || 0) - (f.total_cost || 0)) : []), r = T(() => s.data?.top_agents ? [...s.data.top_agents].sort((f, p) => (p.total_tokens || 0) - (f.total_tokens || 0)) : []), l = T(() => {
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
    }), d = T(() => {
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
    }), h = T(() => s.options ? s.options : {
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
              const p = f.label, g = s.data?.top_agents?.find((b) => b.agent_type === p);
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
              return rt(f);
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
              const p = f.label, g = s.data?.top_agents?.find((b) => b.agent_type === p);
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
    return t({ isDark: a }), (f, p) => (y(), x("article", J2, [
      p[5] || (p[5] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Top Agents Analysis"),
          c("p", { class: "card-subtitle" }, "Cost and token usage by agent")
        ])
      ], -1)),
      e.loading ? (y(), x("div", cx, [...p[4] || (p[4] = [
        j('<div class="loading-container" data-v-78efa6dc><div class="chart-lines-loader" data-v-78efa6dc><div class="line line-1" data-v-78efa6dc></div><div class="line line-2" data-v-78efa6dc></div><div class="line line-3" data-v-78efa6dc></div><div class="line line-4" data-v-78efa6dc></div><div class="line line-5" data-v-78efa6dc></div></div><p class="loading-text" data-v-78efa6dc>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", tx, [
        i.value ? (y(), x("div", ex, [
          c("section", sx, [
            p[0] || (p[0] = c("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
            c("div", ax, [
              V(Gt, {
                data: l.value,
                options: h.value
              }, null, 8, ["data", "options"])
            ])
          ]),
          c("section", nx, [
            p[1] || (p[1] = c("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
            c("div", ix, [
              V(Gt, {
                data: d.value,
                options: u.value
              }, null, 8, ["data", "options"])
            ])
          ])
        ])) : (y(), x("section", ox, [
          c("div", rx, [
            c("div", lx, [
              V(F($t), { class: "empty-icon" })
            ]),
            p[2] || (p[2] = c("p", { class: "empty-title" }, "No top agents data", -1)),
            p[3] || (p[3] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent analysis.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), hx = /* @__PURE__ */ K(dx, [["__scopeId", "data-v-78efa6dc"]]), ux = { class: "top-agents-card" }, fx = {
  key: 0,
  class: "card-body"
}, gx = {
  key: 0,
  class: "chart-section"
}, px = { class: "chart-container" }, bx = {
  key: 1,
  class: "empty-state"
}, mx = { class: "empty-state-content" }, vx = { class: "empty-icon-wrapper" }, _x = {
  key: 1,
  class: "loading-state"
}, yx = /* @__PURE__ */ G({
  __name: "TopAgents",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: a, colors: n } = J(Q(s, "theme")), i = {
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
    ) : []), r = T(() => o.value.length > 0), l = T(() => o.value.reduce((u, f) => u + (f.conversations || 0), 0)), d = T(() => {
      const u = o.value;
      if (u.length === 0)
        return { labels: [], datasets: [] };
      const f = u.map((b) => {
        const m = b.agent_type?.toLowerCase();
        return (i[m] || "#a78bfa") + "80";
      }), p = u.map((b) => {
        const m = b.agent_type?.toLowerCase();
        return i[m] || "#a78bfa";
      });
      return {
        labels: u.map((b) => {
          const m = b.conversations || 0, v = l.value ? m / l.value * 100 : 0;
          return `${b.agent_type} - ${m.toLocaleString()} (${v.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: u.map((b) => b.conversations || 0),
            backgroundColor: f,
            borderColor: p,
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
            label: (u) => {
              const f = (u.label || "").toString(), p = Number(u.parsed) || 0, g = (u.dataset.data || []).reduce((m, v) => m + (Number(v) || 0), 0), b = g ? p / g * 100 : 0;
              return `${f}: ${p.toLocaleString()} (${b.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: a }), (u, f) => (y(), x("article", ux, [
      f[3] || (f[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Top Agents"),
          c("p", { class: "card-subtitle" }, "Interactions by agent (excluding triage)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", _x, [...f[2] || (f[2] = [
        j('<div class="loading-container" data-v-05e3e74d><div class="chart-lines-loader" data-v-05e3e74d><div class="line line-1" data-v-05e3e74d></div><div class="line line-2" data-v-05e3e74d></div><div class="line line-3" data-v-05e3e74d></div><div class="line line-4" data-v-05e3e74d></div><div class="line line-5" data-v-05e3e74d></div></div><p class="loading-text" data-v-05e3e74d>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", fx, [
        r.value ? (y(), x("section", gx, [
          c("div", px, [
            V(xs, {
              data: d.value,
              options: h.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", bx, [
          c("div", mx, [
            c("div", vx, [
              V(F($t), { class: "empty-icon" })
            ]),
            f[0] || (f[0] = c("p", { class: "empty-title" }, "No top agents data", -1)),
            f[1] || (f[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), xx = /* @__PURE__ */ K(yx, [["__scopeId", "data-v-05e3e74d"]]), kx = { class: "daily-cost-trends-card" }, Mx = {
  key: 0,
  class: "card-body"
}, Sx = {
  key: 0,
  class: "chart-section"
}, wx = { class: "chart-container" }, Cx = {
  key: 1,
  class: "empty-state"
}, $x = { class: "empty-state-content" }, Dx = { class: "empty-icon-wrapper" }, Ax = {
  key: 1,
  class: "loading-state"
}, Tx = /* @__PURE__ */ G({
  __name: "DailyCostTrends",
  props: {
    costData: { default: () => ({}) },
    conversationData: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: a, colors: n } = J(Q(s, "theme")), i = (d) => {
      const h = new Date(d), u = String(h.getDate()).padStart(2, "0");
      return `${String(h.getMonth() + 1).padStart(2, "0")}-${u}`;
    }, o = T(() => {
      const d = s.costData?.costs_by_day || {}, h = s.conversationData?.conversations_by_day || {};
      return Object.keys(d).length > 0 && Object.keys(h).length > 0;
    }), r = T(() => {
      const d = s.costData?.costs_by_day || {}, h = s.conversationData?.conversations_by_day || {}, f = Object.keys(d).filter((b) => h[b]).sort();
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const p = f.map((b) => i(b)), g = f.map((b) => {
        const m = d[b]?.total_cost || 0, v = h[b] || 0;
        return v > 0 ? m / v : 0;
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
              let h = d.dataset.label || "";
              return h && (h += ": "), d.parsed.y !== null && (h += rt(d.parsed.y)), h;
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
              return rt(d);
            }
          }
        }
      }
    });
    return t({ isDark: a }), (d, h) => (y(), x("article", kx, [
      h[3] || (h[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Daily Cost Trends"),
          c("p", { class: "card-subtitle" }, "Mean USD/conversation per day")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Ax, [...h[2] || (h[2] = [
        j('<div class="loading-container" data-v-3b293f0c><div class="chart-lines-loader" data-v-3b293f0c><div class="line line-1" data-v-3b293f0c></div><div class="line line-2" data-v-3b293f0c></div><div class="line line-3" data-v-3b293f0c></div><div class="line line-4" data-v-3b293f0c></div><div class="line line-5" data-v-3b293f0c></div></div><p class="loading-text" data-v-3b293f0c>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", Mx, [
        o.value ? (y(), x("section", Sx, [
          c("div", wx, [
            V(Zt, {
              data: r.value,
              options: l.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", Cx, [
          c("div", $x, [
            c("div", Dx, [
              V(F($t), { class: "empty-icon" })
            ]),
            h[0] || (h[0] = c("p", { class: "empty-title" }, "No daily cost trends data", -1)),
            h[1] || (h[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Bx = /* @__PURE__ */ K(Tx, [["__scopeId", "data-v-3b293f0c"]]), Fx = { class: "model-usage-card" }, Px = {
  key: 0,
  class: "loading-state"
}, Lx = {
  key: 1,
  class: "card-body"
}, Ex = { class: "tabs-container" }, Ox = {
  class: "tabs-nav",
  "aria-label": "Model Usage Tabs"
}, Rx = ["aria-selected"], Ix = ["aria-selected"], zx = {
  key: 0,
  class: "table-section"
}, Wx = { class: "table-wrapper" }, Nx = { class: "data-table" }, Hx = { class: "table-header-row" }, jx = { class: "table-header" }, Vx = { class: "table-body" }, Yx = { class: "table-cell name-cell" }, qx = { class: "table-cell text-center" }, Ux = { class: "table-cell text-center" }, Kx = { class: "table-cell text-center" }, Xx = { class: "table-cell text-center cost-cell" }, Gx = { class: "table-cell text-center" }, Zx = {
  key: 1,
  class: "empty-state"
}, Qx = { class: "empty-state-content" }, Jx = { class: "empty-icon-wrapper" }, tk = /* @__PURE__ */ G({
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
    const a = e, n = s, i = (u) => {
      n("export", u);
    }, { isDark: o } = J(Q(a, "theme")), r = xt("by_model"), l = T(() => r.value === "by_model" ? a.data?.total_by_model || {} : a.data?.total_by_provider || {}), d = (u) => u == null ? "0" : z(u), h = (u) => u == null ? "$0.00" : rt(u);
    return t({ isDark: o }), (u, f) => (y(), x("article", Fx, [
      f[10] || (f[10] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Model Usage"),
          c("p", { class: "card-subtitle" }, "AI model performance and costs")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Px, [...f[2] || (f[2] = [
        j('<div class="loading-container" data-v-a7bf2d7b><div class="chart-bars-loader" data-v-a7bf2d7b><div class="bar bar-1" data-v-a7bf2d7b></div><div class="bar bar-2" data-v-a7bf2d7b></div><div class="bar bar-3" data-v-a7bf2d7b></div><div class="bar bar-4" data-v-a7bf2d7b></div><div class="bar bar-5" data-v-a7bf2d7b></div></div><p class="loading-text" data-v-a7bf2d7b>Loading model usage data...</p></div>', 1)
      ])])) : (y(), x("div", Lx, [
        c("div", Ex, [
          c("nav", Ox, [
            c("button", {
              onClick: f[0] || (f[0] = (p) => r.value = "by_model"),
              class: Pe(["tab-button", { "tab-active": r.value === "by_model" }]),
              "aria-selected": r.value === "by_model",
              role: "tab"
            }, " Model ", 10, Rx),
            c("button", {
              onClick: f[1] || (f[1] = (p) => r.value = "by_provider"),
              class: Pe(["tab-button", { "tab-active": r.value === "by_provider" }]),
              "aria-selected": r.value === "by_provider",
              role: "tab"
            }, " Provider ", 10, Ix)
          ])
        ]),
        l.value && Object.keys(l.value).length > 0 ? (y(), x("div", zx, [
          c("div", Wx, [
            c("table", Nx, [
              c("thead", null, [
                c("tr", Hx, [
                  c("th", jx, w(r.value === "by_model" ? "Model" : "Provider"), 1),
                  f[3] || (f[3] = c("th", { class: "table-header" }, "Avg cost per message", -1)),
                  f[4] || (f[4] = c("th", { class: "table-header" }, "Avg tokens per message", -1)),
                  f[5] || (f[5] = c("th", { class: "table-header" }, "Message count", -1)),
                  f[6] || (f[6] = c("th", { class: "table-header" }, "Total cost", -1)),
                  f[7] || (f[7] = c("th", { class: "table-header" }, "Total tokens", -1))
                ])
              ]),
              c("tbody", Vx, [
                (y(!0), x(Y, null, et(l.value, (p, g) => (y(), x("tr", {
                  key: g,
                  class: "table-row"
                }, [
                  c("td", Yx, w(g), 1),
                  c("td", qx, w(h(p.avg_cost_per_message)), 1),
                  c("td", Ux, w(d(p.avg_tokens_per_message)), 1),
                  c("td", Kx, w(d(p.message_count)), 1),
                  c("td", Xx, w(h(p.total_cost)), 1),
                  c("td", Gx, w(d(p.total_tokens)), 1)
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), lt(F(ft), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (y(), x("div", Zx, [
          c("div", Qx, [
            c("div", Jx, [
              V(F($t), { class: "empty-icon" })
            ]),
            f[8] || (f[8] = c("p", { class: "empty-title" }, "No model usage data available", -1)),
            f[9] || (f[9] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see model performance metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), ek = /* @__PURE__ */ K(tk, [["__scopeId", "data-v-a7bf2d7b"]]), sk = { class: "message-roles-card" }, ak = {
  key: 0,
  class: "loading-state"
}, nk = {
  key: 1,
  class: "card-body"
}, ik = {
  key: 0,
  class: "table-section"
}, ok = { class: "table-wrapper" }, rk = { class: "data-table" }, lk = { class: "table-body" }, ck = { class: "table-cell name-cell" }, dk = { class: "table-cell text-center" }, hk = { class: "table-cell text-center" }, uk = { class: "table-cell text-center" }, fk = { class: "table-cell text-center cost-cell" }, gk = { class: "table-cell text-center" }, pk = {
  key: 1,
  class: "empty-state"
}, bk = { class: "empty-state-content" }, mk = { class: "empty-icon-wrapper" }, vk = /* @__PURE__ */ G({
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
    const a = e, n = s, i = (p) => {
      n("export", p);
    }, { isDark: o } = J(Q(a, "theme")), r = ["assistant", "system", "user"], l = T(() => a.data?.total_by_role || {}), d = T(() => Object.keys(l.value).length > 0), h = (p) => p == null ? "0" : z(p), u = (p) => p == null ? "$0.00" : rt(p), f = (p) => p.charAt(0).toUpperCase() + p.slice(1);
    return t({ isDark: o }), (p, g) => (y(), x("article", sk, [
      g[4] || (g[4] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Message Roles"),
          c("p", { class: "card-subtitle" }, "Performance by message role")
        ])
      ], -1)),
      e.loading ? (y(), x("div", ak, [...g[0] || (g[0] = [
        j('<div class="loading-container" data-v-6a953cfc><div class="chart-bars-loader" data-v-6a953cfc><div class="bar bar-1" data-v-6a953cfc></div><div class="bar bar-2" data-v-6a953cfc></div><div class="bar bar-3" data-v-6a953cfc></div><div class="bar bar-4" data-v-6a953cfc></div><div class="bar bar-5" data-v-6a953cfc></div></div><p class="loading-text" data-v-6a953cfc>Loading message role data...</p></div>', 1)
      ])])) : (y(), x("div", nk, [
        d.value ? (y(), x("div", ik, [
          c("div", ok, [
            c("table", rk, [
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
              c("tbody", lk, [
                (y(), x(Y, null, et(r, (b) => c("tr", {
                  key: b,
                  class: "table-row"
                }, [
                  c("td", ck, w(f(b)), 1),
                  c("td", dk, w(u(l.value[b]?.avg_cost_per_message)), 1),
                  c("td", hk, w(h(l.value[b]?.avg_tokens_per_message)), 1),
                  c("td", uk, w(h(l.value[b]?.message_count)), 1),
                  c("td", fk, w(u(l.value[b]?.total_cost)), 1),
                  c("td", gk, w(h(l.value[b]?.total_tokens)), 1)
                ])), 64))
              ])
            ])
          ]),
          e.enableExport ? (y(), lt(F(ft), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (y(), x("div", pk, [
          c("div", bk, [
            c("div", mk, [
              V(F($t), { class: "empty-icon" })
            ]),
            g[2] || (g[2] = c("p", { class: "empty-title" }, "No message role data available", -1)),
            g[3] || (g[3] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), _k = /* @__PURE__ */ K(vk, [["__scopeId", "data-v-6a953cfc"]]), yk = { class: "cost-per-conversation-card" }, xk = {
  key: 0,
  class: "card-body"
}, kk = {
  key: 0,
  class: "chart-section"
}, Mk = { class: "chart-container" }, Sk = { class: "kpi-grid" }, wk = { class: "kpi-card" }, Ck = { class: "kpi-value" }, $k = { class: "kpi-card" }, Dk = { class: "kpi-value" }, Ak = { class: "kpi-card" }, Tk = { class: "kpi-value" }, Bk = { class: "kpi-card highlighted" }, Fk = { class: "kpi-value gradient-text" }, Pk = {
  key: 1,
  class: "empty-state"
}, Lk = { class: "empty-state-content" }, Ek = { class: "empty-icon-wrapper" }, Ok = {
  key: 1,
  class: "loading-state"
}, Rk = /* @__PURE__ */ G({
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
    const a = e, n = s, i = (_) => {
      n("export", _);
    }, { isDark: o, colors: r } = J(Q(a, "theme")), l = {
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
    }, d = (_) => _.agent_type || _.agent_id || _.agent_name || "", h = (_) => _.agent_name ? _.agent_name : d(_).split("_").map((S) => S.charAt(0).toUpperCase() + S.slice(1)).join(" ").replace(/V\d+$/, "").trim(), u = (_) => {
      const k = d(_).toLowerCase();
      for (const [S, M] of Object.entries(l))
        if (k.includes(S))
          return M;
      return "#9ca3af";
    }, f = T(() => [...a.data?.top_agents || []].sort((k, S) => S.avg_cost_per_conversation - k.avg_cost_per_conversation)), p = T(
      () => f.value.reduce((_, k) => _ + k.conversations, 0)
    ), g = T(
      () => f.value.reduce((_, k) => _ + k.total_cost, 0)
    ), b = T(() => p.value === 0 ? 0 : g.value / p.value), m = T(() => {
      const _ = f.value;
      if (_.length === 0)
        return { labels: [], datasets: [] };
      const k = _.map((C) => h(C)), S = _.map((C) => C.avg_cost_per_conversation), M = _.map((C) => u(C));
      return {
        labels: k,
        datasets: [
          {
            label: "USD per conversation",
            data: S,
            backgroundColor: M.map((C) => `${C}80`),
            borderColor: M,
            borderWidth: 1
          }
        ]
      };
    }), v = T(() => a.options ? a.options : {
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
            label: function(_) {
              const k = f.value[_.dataIndex];
              return [
                `Cost: ${rt(_.parsed.x)}`,
                `Conversations: ${z(k.conversations)}`,
                `Total Cost: ${rt(k.total_cost)}`
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
            callback: function(_) {
              return rt(_);
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
    return t({ isDark: o }), (_, k) => (y(), x("article", yk, [
      k[7] || (k[7] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Cost Per Conversation"),
          c("p", { class: "card-subtitle" }, "USD per conversation by agent")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Ok, [...k[6] || (k[6] = [
        j('<div class="loading-container" data-v-ad9364d0><div class="chart-bars-loader" data-v-ad9364d0><div class="bar bar-1" data-v-ad9364d0></div><div class="bar bar-2" data-v-ad9364d0></div><div class="bar bar-3" data-v-ad9364d0></div><div class="bar bar-4" data-v-ad9364d0></div><div class="bar bar-5" data-v-ad9364d0></div></div><p class="loading-text" data-v-ad9364d0>Loading agent costs...</p></div>', 1)
      ])])) : (y(), x("div", xk, [
        m.value.labels && m.value.labels.length ? (y(), x("section", kk, [
          c("div", Mk, [
            V(Gt, {
              data: m.value,
              options: v.value
            }, null, 8, ["data", "options"])
          ]),
          c("footer", Sk, [
            c("div", wk, [
              k[0] || (k[0] = c("span", { class: "kpi-label" }, "Total Agents", -1)),
              c("span", Ck, w(f.value.length), 1)
            ]),
            c("div", $k, [
              k[1] || (k[1] = c("span", { class: "kpi-label" }, "Total Conversations", -1)),
              c("span", Dk, w(F(z)(p.value)), 1)
            ]),
            c("div", Ak, [
              k[2] || (k[2] = c("span", { class: "kpi-label" }, "Total Cost", -1)),
              c("span", Tk, w(F(rt)(g.value)), 1)
            ]),
            c("div", Bk, [
              k[3] || (k[3] = c("span", { class: "kpi-label" }, "Avg Cost / Conv.", -1)),
              c("span", Fk, w(F(rt)(b.value)), 1)
            ])
          ]),
          e.enableExport ? (y(), lt(F(ft), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : I("", !0)
        ])) : (y(), x("section", Pk, [
          c("div", Lk, [
            c("div", Ek, [
              V(F($t), { class: "empty-icon" })
            ]),
            k[4] || (k[4] = c("p", { class: "empty-title" }, "No cost per conversation data", -1)),
            k[5] || (k[5] = c("p", { class: "empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Ik = /* @__PURE__ */ K(Rk, [["__scopeId", "data-v-ad9364d0"]]), qk = {
  install(e) {
    e.component("KiutChartBar", Gt), e.component("KiutChartLine", Zt), e.component("KiutPieChart", xs), e.component("KiutBoxplotChart", Xh), e.component("KiutCandlestickChart", Wi), e.component("KiutHistogramChart", Ni), e.component("KiutSankeyChart", Qt), e.component("KiutAgentsPerDay", ag), e.component("KiutBookingManager", Rg), e.component("KiutCheckin", rp), e.component("KiutCheckinMetrics", Fp), e.component("KiutCheckinSegments", i0), e.component("KiutDisruption", N0), e.component("KiutFAQ", ib), e.component("KiutMessagesPerAgent", gb), e.component("KiutRecordLocator", zb), e.component("KiutSeller", fm), e.component("KiutTopAgents", km), e.component("KiutPaymentMethod", Jm), e.component("KiutAgentHumanConversations", Av), e.component("KiutChannelMetrics", Nv), e.component("KiutTriageCombinations", o1), e.component("KiutSelectLanguage", m1), e.component("KiutGuardrails", Y1), e.component("KiutDisruptionNotifier", H_), e.component("KiutNpsDailyMetrics", Hi), e.component("KiutNpsMetrics", Ay), e.component("KiutNpsOverviewMetrics", ji), e.component("KiutAWSCost", Ky), e.component("KiutCostUsage", m2), e.component("KiutTokenUsage", I2), e.component("KiutConversationCount", Q2), e.component("KiutTopAgentsAnalysis", hx), e.component("KiutTopAgentsPie", xx), e.component("KiutDailyCostTrends", Bx), e.component("KiutModelUsage", ek), e.component("KiutMessageRoles", _k), e.component("KiutCostPerConversations", Ik);
  }
};
export {
  Ky as AWSCost,
  Av as AgentHumanConversations,
  ag as AgentsPerDay,
  Rg as BookingManager,
  Xh as BoxplotChart,
  Wi as CandlestickChart,
  Nv as ChannelMetrics,
  Gt as ChartBar,
  Zt as ChartLine,
  rp as Checkin,
  Fp as CheckinMetrics,
  i0 as CheckinSegments,
  Q2 as ConversationCount,
  Ik as CostPerConversations,
  m2 as CostUsage,
  Bx as DailyCostTrends,
  N0 as Disruption,
  H_ as DisruptionNotifier,
  ib as FAQ,
  Y1 as Guardrails,
  Ni as HistogramChart,
  qk as KiutUIPlugin,
  _k as MessageRoles,
  gb as MessagesPerAgent,
  ek as ModelUsage,
  Hi as NpsDailyMetrics,
  Ay as NpsMetrics,
  ji as NpsOverviewMetrics,
  Jm as PaymentMethod,
  xs as PieChart,
  zb as RecordLocator,
  Qt as SankeyChart,
  m1 as SelectLanguage,
  fm as Seller,
  I2 as TokenUsage,
  km as TopAgents,
  hx as TopAgentsAnalysis,
  xx as TopAgentsPie,
  o1 as TriageCombinations
};
//# sourceMappingURL=kiut-ui.es.js.map
