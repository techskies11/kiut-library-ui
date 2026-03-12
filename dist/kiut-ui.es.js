import { defineComponent as tt, shallowRef as Wn, h as Rs, ref as Mt, onMounted as fs, onUnmounted as Hn, watch as jt, toRaw as Is, nextTick as Vn, version as Ui, isProxy as jn, computed as D, toRef as st, openBlock as y, createElementBlock as x, createVNode as U, unref as B, normalizeStyle as _t, createElementVNode as c, toDisplayString as w, createCommentVNode as N, Fragment as j, renderList as Z, onBeforeUnmount as Ki, createStaticVNode as Y, withDirectives as ha, vShow as fa, normalizeClass as Le, createBlock as ut, createTextVNode as re, resolveDynamicComponent as Xi } from "vue";
import * as ga from "echarts/core";
import { TooltipComponent as Gi, TitleComponent as Zi } from "echarts/components";
import { SankeyChart as Qi } from "echarts/charts";
import { CanvasRenderer as Ji } from "echarts/renderers";
import Ct from "moment";
function Ve(e) {
  return e + 0.5 | 0;
}
const qt = (e, t, s) => Math.max(Math.min(e, s), t);
function Ce(e) {
  return qt(Ve(e * 2.55), 0, 255);
}
function Xt(e) {
  return qt(Ve(e * 255), 0, 255);
}
function Wt(e) {
  return qt(Ve(e / 2.55) / 100, 0, 1);
}
function pa(e) {
  return qt(Ve(e * 100), 0, 100);
}
const Bt = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, zs = [..."0123456789ABCDEF"], to = (e) => zs[e & 15], eo = (e) => zs[(e & 240) >> 4] + zs[e & 15], Ye = (e) => (e & 240) >> 4 === (e & 15), so = (e) => Ye(e.r) && Ye(e.g) && Ye(e.b) && Ye(e.a);
function ao(e) {
  var t = e.length, s;
  return e[0] === "#" && (t === 4 || t === 5 ? s = {
    r: 255 & Bt[e[1]] * 17,
    g: 255 & Bt[e[2]] * 17,
    b: 255 & Bt[e[3]] * 17,
    a: t === 5 ? Bt[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (s = {
    r: Bt[e[1]] << 4 | Bt[e[2]],
    g: Bt[e[3]] << 4 | Bt[e[4]],
    b: Bt[e[5]] << 4 | Bt[e[6]],
    a: t === 9 ? Bt[e[7]] << 4 | Bt[e[8]] : 255
  })), s;
}
const no = (e, t) => e < 255 ? t(e) : "";
function io(e) {
  var t = so(e) ? to : eo;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + no(e.a, t) : void 0;
}
const oo = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Yn(e, t, s) {
  const a = t * Math.min(s, 1 - s), n = (i, o = (i + e / 30) % 12) => s - a * Math.max(Math.min(o - 3, 9 - o, 1), -1);
  return [n(0), n(8), n(4)];
}
function ro(e, t, s) {
  const a = (n, i = (n + e / 60) % 6) => s - s * t * Math.max(Math.min(i, 4 - i, 1), 0);
  return [a(5), a(3), a(1)];
}
function lo(e, t, s) {
  const a = Yn(e, 1, 0.5);
  let n;
  for (t + s > 1 && (n = 1 / (t + s), t *= n, s *= n), n = 0; n < 3; n++)
    a[n] *= 1 - t - s, a[n] += t;
  return a;
}
function co(e, t, s, a, n) {
  return e === n ? (t - s) / a + (t < s ? 6 : 0) : t === n ? (s - e) / a + 2 : (e - t) / a + 4;
}
function Us(e) {
  const s = e.r / 255, a = e.g / 255, n = e.b / 255, i = Math.max(s, a, n), o = Math.min(s, a, n), r = (i + o) / 2;
  let l, d, u;
  return i !== o && (u = i - o, d = r > 0.5 ? u / (2 - i - o) : u / (i + o), l = co(s, a, n, u, i), l = l * 60 + 0.5), [l | 0, d || 0, r];
}
function Ks(e, t, s, a) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, s, a)).map(Xt);
}
function Xs(e, t, s) {
  return Ks(Yn, e, t, s);
}
function uo(e, t, s) {
  return Ks(lo, e, t, s);
}
function ho(e, t, s) {
  return Ks(ro, e, t, s);
}
function qn(e) {
  return (e % 360 + 360) % 360;
}
function fo(e) {
  const t = oo.exec(e);
  let s = 255, a;
  if (!t)
    return;
  t[5] !== a && (s = t[6] ? Ce(+t[5]) : Xt(+t[5]));
  const n = qn(+t[2]), i = +t[3] / 100, o = +t[4] / 100;
  return t[1] === "hwb" ? a = uo(n, i, o) : t[1] === "hsv" ? a = ho(n, i, o) : a = Xs(n, i, o), {
    r: a[0],
    g: a[1],
    b: a[2],
    a: s
  };
}
function go(e, t) {
  var s = Us(e);
  s[0] = qn(s[0] + t), s = Xs(s), e.r = s[0], e.g = s[1], e.b = s[2];
}
function po(e) {
  if (!e)
    return;
  const t = Us(e), s = t[0], a = pa(t[1]), n = pa(t[2]);
  return e.a < 255 ? `hsla(${s}, ${a}%, ${n}%, ${Wt(e.a)})` : `hsl(${s}, ${a}%, ${n}%)`;
}
const ba = {
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
}, va = {
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
function bo() {
  const e = {}, t = Object.keys(va), s = Object.keys(ba);
  let a, n, i, o, r;
  for (a = 0; a < t.length; a++) {
    for (o = r = t[a], n = 0; n < s.length; n++)
      i = s[n], r = r.replace(i, ba[i]);
    i = parseInt(va[o], 16), e[r] = [i >> 16 & 255, i >> 8 & 255, i & 255];
  }
  return e;
}
let qe;
function vo(e) {
  qe || (qe = bo(), qe.transparent = [0, 0, 0, 0]);
  const t = qe[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const mo = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function _o(e) {
  const t = mo.exec(e);
  let s = 255, a, n, i;
  if (t) {
    if (t[7] !== a) {
      const o = +t[7];
      s = t[8] ? Ce(o) : qt(o * 255, 0, 255);
    }
    return a = +t[1], n = +t[3], i = +t[5], a = 255 & (t[2] ? Ce(a) : qt(a, 0, 255)), n = 255 & (t[4] ? Ce(n) : qt(n, 0, 255)), i = 255 & (t[6] ? Ce(i) : qt(i, 0, 255)), {
      r: a,
      g: n,
      b: i,
      a: s
    };
  }
}
function yo(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${Wt(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const Ms = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, ue = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function xo(e, t, s) {
  const a = ue(Wt(e.r)), n = ue(Wt(e.g)), i = ue(Wt(e.b));
  return {
    r: Xt(Ms(a + s * (ue(Wt(t.r)) - a))),
    g: Xt(Ms(n + s * (ue(Wt(t.g)) - n))),
    b: Xt(Ms(i + s * (ue(Wt(t.b)) - i))),
    a: e.a + s * (t.a - e.a)
  };
}
function Ue(e, t, s) {
  if (e) {
    let a = Us(e);
    a[t] = Math.max(0, Math.min(a[t] + a[t] * s, t === 0 ? 360 : 1)), a = Xs(a), e.r = a[0], e.g = a[1], e.b = a[2];
  }
}
function Un(e, t) {
  return e && Object.assign(t || {}, e);
}
function ma(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = Xt(e[3]))) : (t = Un(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = Xt(t.a)), t;
}
function ko(e) {
  return e.charAt(0) === "r" ? _o(e) : fo(e);
}
class Ee {
  constructor(t) {
    if (t instanceof Ee)
      return t;
    const s = typeof t;
    let a;
    s === "object" ? a = ma(t) : s === "string" && (a = ao(t) || vo(t) || ko(t)), this._rgb = a, this._valid = !!a;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = Un(this._rgb);
    return t && (t.a = Wt(t.a)), t;
  }
  set rgb(t) {
    this._rgb = ma(t);
  }
  rgbString() {
    return this._valid ? yo(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? io(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? po(this._rgb) : void 0;
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
    return t && (this._rgb = xo(this._rgb, t._rgb, s)), this;
  }
  clone() {
    return new Ee(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = Xt(t), this;
  }
  clearer(t) {
    const s = this._rgb;
    return s.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, s = Ve(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
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
    return Ue(this._rgb, 2, t), this;
  }
  darken(t) {
    return Ue(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return Ue(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return Ue(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return go(this._rgb, t), this;
  }
}
function It() {
}
const Mo = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function ot(e) {
  return e == null;
}
function vt(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function J(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function St(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function Lt(e, t) {
  return St(e) ? e : t;
}
function G(e, t) {
  return typeof e > "u" ? t : e;
}
const So = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, Kn = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function ht(e, t, s) {
  if (e && typeof e.call == "function")
    return e.apply(s, t);
}
function rt(e, t, s, a) {
  let n, i, o;
  if (vt(e))
    for (i = e.length, n = 0; n < i; n++)
      t.call(s, e[n], n);
  else if (J(e))
    for (o = Object.keys(e), i = o.length, n = 0; n < i; n++)
      t.call(s, e[o[n]], o[n]);
}
function os(e, t) {
  let s, a, n, i;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (s = 0, a = e.length; s < a; ++s)
    if (n = e[s], i = t[s], n.datasetIndex !== i.datasetIndex || n.index !== i.index)
      return !1;
  return !0;
}
function rs(e) {
  if (vt(e))
    return e.map(rs);
  if (J(e)) {
    const t = /* @__PURE__ */ Object.create(null), s = Object.keys(e), a = s.length;
    let n = 0;
    for (; n < a; ++n)
      t[s[n]] = rs(e[s[n]]);
    return t;
  }
  return e;
}
function Xn(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function wo(e, t, s, a) {
  if (!Xn(e))
    return;
  const n = t[e], i = s[e];
  J(n) && J(i) ? Oe(n, i, a) : t[e] = rs(i);
}
function Oe(e, t, s) {
  const a = vt(t) ? t : [
    t
  ], n = a.length;
  if (!J(e))
    return e;
  s = s || {};
  const i = s.merger || wo;
  let o;
  for (let r = 0; r < n; ++r) {
    if (o = a[r], !J(o))
      continue;
    const l = Object.keys(o);
    for (let d = 0, u = l.length; d < u; ++d)
      i(l[d], e, o, s);
  }
  return e;
}
function Te(e, t) {
  return Oe(e, t, {
    merger: $o
  });
}
function $o(e, t, s) {
  if (!Xn(e))
    return;
  const a = t[e], n = s[e];
  J(a) && J(n) ? Te(a, n) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = rs(n));
}
const _a = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function Co(e) {
  const t = e.split("."), s = [];
  let a = "";
  for (const n of t)
    a += n, a.endsWith("\\") ? a = a.slice(0, -1) + "." : (s.push(a), a = "");
  return s;
}
function Do(e) {
  const t = Co(e);
  return (s) => {
    for (const a of t) {
      if (a === "")
        break;
      s = s && s[a];
    }
    return s;
  };
}
function le(e, t) {
  return (_a[t] || (_a[t] = Do(t)))(e);
}
function Gs(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const Re = (e) => typeof e < "u", Gt = (e) => typeof e == "function", ya = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const s of e)
    if (!t.has(s))
      return !1;
  return !0;
};
function Ao(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const lt = Math.PI, ft = 2 * lt, To = ft + lt, ls = Number.POSITIVE_INFINITY, Bo = lt / 180, mt = lt / 2, te = lt / 4, xa = lt * 2 / 3, Gn = Math.log10, Rt = Math.sign;
function Be(e, t, s) {
  return Math.abs(e - t) < s;
}
function ka(e) {
  const t = Math.round(e);
  e = Be(e, t, e / 1e3) ? t : e;
  const s = Math.pow(10, Math.floor(Gn(e))), a = e / s;
  return (a <= 1 ? 1 : a <= 2 ? 2 : a <= 5 ? 5 : 10) * s;
}
function Fo(e) {
  const t = [], s = Math.sqrt(e);
  let a;
  for (a = 1; a < s; a++)
    e % a === 0 && (t.push(a), t.push(e / a));
  return s === (s | 0) && t.push(s), t.sort((n, i) => n - i).pop(), t;
}
function Po(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function Ie(e) {
  return !Po(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function Lo(e, t) {
  const s = Math.round(e);
  return s - t <= e && s + t >= e;
}
function Eo(e, t, s) {
  let a, n, i;
  for (a = 0, n = e.length; a < n; a++)
    i = e[a][s], isNaN(i) || (t.min = Math.min(t.min, i), t.max = Math.max(t.max, i));
}
function Ht(e) {
  return e * (lt / 180);
}
function Oo(e) {
  return e * (180 / lt);
}
function Ma(e) {
  if (!St(e))
    return;
  let t = 1, s = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, s++;
  return s;
}
function Zn(e, t) {
  const s = t.x - e.x, a = t.y - e.y, n = Math.sqrt(s * s + a * a);
  let i = Math.atan2(a, s);
  return i < -0.5 * lt && (i += ft), {
    angle: i,
    distance: n
  };
}
function Ns(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function Ro(e, t) {
  return (e - t + To) % ft - lt;
}
function Tt(e) {
  return (e % ft + ft) % ft;
}
function ze(e, t, s, a) {
  const n = Tt(e), i = Tt(t), o = Tt(s), r = Tt(i - n), l = Tt(o - n), d = Tt(n - i), u = Tt(n - o);
  return n === i || n === o || a && i === o || r > l && d < u;
}
function xt(e, t, s) {
  return Math.max(t, Math.min(s, e));
}
function Io(e) {
  return xt(e, -32768, 32767);
}
function Vt(e, t, s, a = 1e-6) {
  return e >= Math.min(t, s) - a && e <= Math.max(t, s) + a;
}
function Zs(e, t, s) {
  s = s || ((o) => e[o] < t);
  let a = e.length - 1, n = 0, i;
  for (; a - n > 1; )
    i = n + a >> 1, s(i) ? n = i : a = i;
  return {
    lo: n,
    hi: a
  };
}
const ie = (e, t, s, a) => Zs(e, s, a ? (n) => {
  const i = e[n][t];
  return i < s || i === s && e[n + 1][t] === s;
} : (n) => e[n][t] < s), zo = (e, t, s) => Zs(e, s, (a) => e[a][t] >= s);
function No(e, t, s) {
  let a = 0, n = e.length;
  for (; a < n && e[a] < t; )
    a++;
  for (; n > a && e[n - 1] > s; )
    n--;
  return a > 0 || n < e.length ? e.slice(a, n) : e;
}
const Qn = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function Wo(e, t) {
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
  }), Qn.forEach((s) => {
    const a = "_onData" + Gs(s), n = e[s];
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
function Sa(e, t) {
  const s = e._chartjs;
  if (!s)
    return;
  const a = s.listeners, n = a.indexOf(t);
  n !== -1 && a.splice(n, 1), !(a.length > 0) && (Qn.forEach((i) => {
    delete e[i];
  }), delete e._chartjs);
}
function Jn(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const ti = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function ei(e, t) {
  let s = [], a = !1;
  return function(...n) {
    s = n, a || (a = !0, ti.call(window, () => {
      a = !1, e.apply(t, s);
    }));
  };
}
function Ho(e, t) {
  let s;
  return function(...a) {
    return t ? (clearTimeout(s), s = setTimeout(e, t, a)) : e.apply(this, a), t;
  };
}
const Qs = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", yt = (e, t, s) => e === "start" ? t : e === "end" ? s : (t + s) / 2, Vo = (e, t, s, a) => e === (a ? "left" : "right") ? s : e === "center" ? (t + s) / 2 : t;
function jo(e, t, s) {
  const a = t.length;
  let n = 0, i = a;
  if (e._sorted) {
    const { iScale: o, vScale: r, _parsed: l } = e, d = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, u = o.axis, { min: f, max: p, minDefined: g, maxDefined: h } = o.getUserBounds();
    if (g) {
      if (n = Math.min(
        // @ts-expect-error Need to type _parsed
        ie(l, u, f).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        s ? a : ie(t, u, o.getPixelForValue(f)).lo
      ), d) {
        const b = l.slice(0, n + 1).reverse().findIndex((v) => !ot(v[r.axis]));
        n -= Math.max(0, b);
      }
      n = xt(n, 0, a - 1);
    }
    if (h) {
      let b = Math.max(
        // @ts-expect-error Need to type _parsed
        ie(l, o.axis, p, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        s ? 0 : ie(t, u, o.getPixelForValue(p), !0).hi + 1
      );
      if (d) {
        const v = l.slice(b - 1).findIndex((m) => !ot(m[r.axis]));
        b += Math.max(0, v);
      }
      i = xt(b, n, a) - n;
    } else
      i = a - n;
  }
  return {
    start: n,
    count: i
  };
}
function Yo(e) {
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
const Ke = (e) => e === 0 || e === 1, wa = (e, t, s) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * ft / s)), $a = (e, t, s) => Math.pow(2, -10 * e) * Math.sin((e - t) * ft / s) + 1, Fe = {
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
  easeInSine: (e) => -Math.cos(e * mt) + 1,
  easeOutSine: (e) => Math.sin(e * mt),
  easeInOutSine: (e) => -0.5 * (Math.cos(lt * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => Ke(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => Ke(e) ? e : wa(e, 0.075, 0.3),
  easeOutElastic: (e) => Ke(e) ? e : $a(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return Ke(e) ? e : e < 0.5 ? 0.5 * wa(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * $a(e * 2 - 1, 0.1125, 0.45);
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
function Js(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function Ca(e) {
  return Js(e) ? e : new Ee(e);
}
function Ss(e) {
  return Js(e) ? e : new Ee(e).saturate(0.5).darken(0.1).hexString();
}
const qo = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], Uo = [
  "color",
  "borderColor",
  "backgroundColor"
];
function Ko(e) {
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
      properties: Uo
    },
    numbers: {
      type: "number",
      properties: qo
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
function Xo(e) {
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
const Da = /* @__PURE__ */ new Map();
function Go(e, t) {
  t = t || {};
  const s = e + JSON.stringify(t);
  let a = Da.get(s);
  return a || (a = new Intl.NumberFormat(e, t), Da.set(s, a)), a;
}
function ta(e, t, s) {
  return Go(t, s).format(e);
}
const Zo = {
  values(e) {
    return vt(e) ? e : "" + e;
  },
  numeric(e, t, s) {
    if (e === 0)
      return "0";
    const a = this.chart.options.locale;
    let n, i = e;
    if (s.length > 1) {
      const d = Math.max(Math.abs(s[0].value), Math.abs(s[s.length - 1].value));
      (d < 1e-4 || d > 1e15) && (n = "scientific"), i = Qo(e, s);
    }
    const o = Gn(Math.abs(i)), r = isNaN(o) ? 1 : Math.max(Math.min(-1 * Math.floor(o), 20), 0), l = {
      notation: n,
      minimumFractionDigits: r,
      maximumFractionDigits: r
    };
    return Object.assign(l, this.options.ticks.format), ta(e, a, l);
  }
};
function Qo(e, t) {
  let s = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(s) >= 1 && e !== Math.floor(e) && (s = e - Math.floor(e)), s;
}
var si = {
  formatters: Zo
};
function Jo(e) {
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
      callback: si.formatters.values,
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
const ce = /* @__PURE__ */ Object.create(null), Ws = /* @__PURE__ */ Object.create(null);
function Pe(e, t) {
  if (!t)
    return e;
  const s = t.split(".");
  for (let a = 0, n = s.length; a < n; ++a) {
    const i = s[a];
    e = e[i] || (e[i] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function ws(e, t, s) {
  return typeof t == "string" ? Oe(Pe(e, t), s) : Oe(Pe(e, ""), t);
}
class tr {
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
    }, this.hover = {}, this.hoverBackgroundColor = (a, n) => Ss(n.backgroundColor), this.hoverBorderColor = (a, n) => Ss(n.borderColor), this.hoverColor = (a, n) => Ss(n.color), this.indexAxis = "x", this.interaction = {
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
    return ws(Ws, t, s);
  }
  override(t, s) {
    return ws(ce, t, s);
  }
  route(t, s, a, n) {
    const i = Pe(this, t), o = Pe(this, a), r = "_" + s;
    Object.defineProperties(i, {
      [r]: {
        value: i[s],
        writable: !0
      },
      [s]: {
        enumerable: !0,
        get() {
          const l = this[r], d = o[n];
          return J(l) ? Object.assign({}, d, l) : G(l, d);
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
var pt = /* @__PURE__ */ new tr({
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
  Ko,
  Xo,
  Jo
]);
function er(e) {
  return !e || ot(e.size) || ot(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function Aa(e, t, s, a, n) {
  let i = t[n];
  return i || (i = t[n] = e.measureText(n).width, s.push(n)), i > a && (a = i), a;
}
function ee(e, t, s) {
  const a = e.currentDevicePixelRatio, n = s !== 0 ? Math.max(s / 2, 0.5) : 0;
  return Math.round((t - n) * a) / a + n;
}
function Ta(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function Hs(e, t, s, a) {
  ai(e, t, s, a, null);
}
function ai(e, t, s, a, n) {
  let i, o, r, l, d, u, f, p;
  const g = t.pointStyle, h = t.rotation, b = t.radius;
  let v = (h || 0) * Bo;
  if (g && typeof g == "object" && (i = g.toString(), i === "[object HTMLImageElement]" || i === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(s, a), e.rotate(v), e.drawImage(g, -g.width / 2, -g.height / 2, g.width, g.height), e.restore();
    return;
  }
  if (!(isNaN(b) || b <= 0)) {
    switch (e.beginPath(), g) {
      // Default includes circle
      default:
        n ? e.ellipse(s, a, n / 2, b, 0, 0, ft) : e.arc(s, a, b, 0, ft), e.closePath();
        break;
      case "triangle":
        u = n ? n / 2 : b, e.moveTo(s + Math.sin(v) * u, a - Math.cos(v) * b), v += xa, e.lineTo(s + Math.sin(v) * u, a - Math.cos(v) * b), v += xa, e.lineTo(s + Math.sin(v) * u, a - Math.cos(v) * b), e.closePath();
        break;
      case "rectRounded":
        d = b * 0.516, l = b - d, o = Math.cos(v + te) * l, f = Math.cos(v + te) * (n ? n / 2 - d : l), r = Math.sin(v + te) * l, p = Math.sin(v + te) * (n ? n / 2 - d : l), e.arc(s - f, a - r, d, v - lt, v - mt), e.arc(s + p, a - o, d, v - mt, v), e.arc(s + f, a + r, d, v, v + mt), e.arc(s - p, a + o, d, v + mt, v + lt), e.closePath();
        break;
      case "rect":
        if (!h) {
          l = Math.SQRT1_2 * b, u = n ? n / 2 : l, e.rect(s - u, a - l, 2 * u, 2 * l);
          break;
        }
        v += te;
      /* falls through */
      case "rectRot":
        f = Math.cos(v) * (n ? n / 2 : b), o = Math.cos(v) * b, r = Math.sin(v) * b, p = Math.sin(v) * (n ? n / 2 : b), e.moveTo(s - f, a - r), e.lineTo(s + p, a - o), e.lineTo(s + f, a + r), e.lineTo(s - p, a + o), e.closePath();
        break;
      case "crossRot":
        v += te;
      /* falls through */
      case "cross":
        f = Math.cos(v) * (n ? n / 2 : b), o = Math.cos(v) * b, r = Math.sin(v) * b, p = Math.sin(v) * (n ? n / 2 : b), e.moveTo(s - f, a - r), e.lineTo(s + f, a + r), e.moveTo(s + p, a - o), e.lineTo(s - p, a + o);
        break;
      case "star":
        f = Math.cos(v) * (n ? n / 2 : b), o = Math.cos(v) * b, r = Math.sin(v) * b, p = Math.sin(v) * (n ? n / 2 : b), e.moveTo(s - f, a - r), e.lineTo(s + f, a + r), e.moveTo(s + p, a - o), e.lineTo(s - p, a + o), v += te, f = Math.cos(v) * (n ? n / 2 : b), o = Math.cos(v) * b, r = Math.sin(v) * b, p = Math.sin(v) * (n ? n / 2 : b), e.moveTo(s - f, a - r), e.lineTo(s + f, a + r), e.moveTo(s + p, a - o), e.lineTo(s - p, a + o);
        break;
      case "line":
        o = n ? n / 2 : Math.cos(v) * b, r = Math.sin(v) * b, e.moveTo(s - o, a - r), e.lineTo(s + o, a + r);
        break;
      case "dash":
        e.moveTo(s, a), e.lineTo(s + Math.cos(v) * (n ? n / 2 : b), a + Math.sin(v) * b);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function Ne(e, t, s) {
  return s = s || 0.5, !t || e && e.x > t.left - s && e.x < t.right + s && e.y > t.top - s && e.y < t.bottom + s;
}
function gs(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function ps(e) {
  e.restore();
}
function sr(e, t, s, a, n) {
  if (!t)
    return e.lineTo(s.x, s.y);
  if (n === "middle") {
    const i = (t.x + s.x) / 2;
    e.lineTo(i, t.y), e.lineTo(i, s.y);
  } else n === "after" != !!a ? e.lineTo(t.x, s.y) : e.lineTo(s.x, t.y);
  e.lineTo(s.x, s.y);
}
function ar(e, t, s, a) {
  if (!t)
    return e.lineTo(s.x, s.y);
  e.bezierCurveTo(a ? t.cp1x : t.cp2x, a ? t.cp1y : t.cp2y, a ? s.cp2x : s.cp1x, a ? s.cp2y : s.cp1y, s.x, s.y);
}
function nr(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), ot(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function ir(e, t, s, a, n) {
  if (n.strikethrough || n.underline) {
    const i = e.measureText(a), o = t - i.actualBoundingBoxLeft, r = t + i.actualBoundingBoxRight, l = s - i.actualBoundingBoxAscent, d = s + i.actualBoundingBoxDescent, u = n.strikethrough ? (l + d) / 2 : d;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = n.decorationWidth || 2, e.moveTo(o, u), e.lineTo(r, u), e.stroke();
  }
}
function or(e, t) {
  const s = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = s;
}
function We(e, t, s, a, n, i = {}) {
  const o = vt(t) ? t : [
    t
  ], r = i.strokeWidth > 0 && i.strokeColor !== "";
  let l, d;
  for (e.save(), e.font = n.string, nr(e, i), l = 0; l < o.length; ++l)
    d = o[l], i.backdrop && or(e, i.backdrop), r && (i.strokeColor && (e.strokeStyle = i.strokeColor), ot(i.strokeWidth) || (e.lineWidth = i.strokeWidth), e.strokeText(d, s, a, i.maxWidth)), e.fillText(d, s, a, i.maxWidth), ir(e, s, a, d, i), a += Number(n.lineHeight);
  e.restore();
}
function cs(e, t) {
  const { x: s, y: a, w: n, h: i, radius: o } = t;
  e.arc(s + o.topLeft, a + o.topLeft, o.topLeft, 1.5 * lt, lt, !0), e.lineTo(s, a + i - o.bottomLeft), e.arc(s + o.bottomLeft, a + i - o.bottomLeft, o.bottomLeft, lt, mt, !0), e.lineTo(s + n - o.bottomRight, a + i), e.arc(s + n - o.bottomRight, a + i - o.bottomRight, o.bottomRight, mt, 0, !0), e.lineTo(s + n, a + o.topRight), e.arc(s + n - o.topRight, a + o.topRight, o.topRight, 0, -mt, !0), e.lineTo(s + o.topLeft, a);
}
const rr = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, lr = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function cr(e, t) {
  const s = ("" + e).match(rr);
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
const dr = (e) => +e || 0;
function ea(e, t) {
  const s = {}, a = J(t), n = a ? Object.keys(t) : t, i = J(e) ? a ? (o) => G(e[o], e[t[o]]) : (o) => e[o] : () => e;
  for (const o of n)
    s[o] = dr(i(o));
  return s;
}
function ni(e) {
  return ea(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function ge(e) {
  return ea(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function Pt(e) {
  const t = ni(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function kt(e, t) {
  e = e || {}, t = t || pt.font;
  let s = G(e.size, t.size);
  typeof s == "string" && (s = parseInt(s, 10));
  let a = G(e.style, t.style);
  a && !("" + a).match(lr) && (console.warn('Invalid font style specified: "' + a + '"'), a = void 0);
  const n = {
    family: G(e.family, t.family),
    lineHeight: cr(G(e.lineHeight, t.lineHeight), s),
    size: s,
    style: a,
    weight: G(e.weight, t.weight),
    string: ""
  };
  return n.string = er(n), n;
}
function Xe(e, t, s, a) {
  let n, i, o;
  for (n = 0, i = e.length; n < i; ++n)
    if (o = e[n], o !== void 0 && o !== void 0)
      return o;
}
function ur(e, t, s) {
  const { min: a, max: n } = e, i = Kn(t, (n - a) / 2), o = (r, l) => s && r === 0 ? 0 : r + l;
  return {
    min: o(a, -Math.abs(i)),
    max: o(n, i)
  };
}
function de(e, t) {
  return Object.assign(Object.create(e), t);
}
function sa(e, t = [
  ""
], s, a, n = () => e[0]) {
  const i = s || e;
  typeof a > "u" && (a = li("_fallback", e));
  const o = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: i,
    _fallback: a,
    _getTarget: n,
    override: (r) => sa([
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
      return oi(r, l, () => _r(l, t, e, r));
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
      return Fa(r).includes(l);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(r) {
      return Fa(r);
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
function be(e, t, s, a) {
  const n = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: s,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: ii(e, a),
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
      return oi(i, o, () => fr(i, o, r));
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
function ii(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: s = t.scriptable, _indexable: a = t.indexable, _allKeys: n = t.allKeys } = e;
  return {
    allKeys: n,
    scriptable: s,
    indexable: a,
    isScriptable: Gt(s) ? s : () => s,
    isIndexable: Gt(a) ? a : () => a
  };
}
const hr = (e, t) => e ? e + Gs(t) : t, aa = (e, t) => J(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function oi(e, t, s) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const a = s();
  return e[t] = a, a;
}
function fr(e, t, s) {
  const { _proxy: a, _context: n, _subProxy: i, _descriptors: o } = e;
  let r = a[t];
  return Gt(r) && o.isScriptable(t) && (r = gr(t, r, e, s)), vt(r) && r.length && (r = pr(t, r, e, o.isIndexable)), aa(t, r) && (r = be(r, n, i && i[t], o)), r;
}
function gr(e, t, s, a) {
  const { _proxy: n, _context: i, _subProxy: o, _stack: r } = s;
  if (r.has(e))
    throw new Error("Recursion detected: " + Array.from(r).join("->") + "->" + e);
  r.add(e);
  let l = t(i, o || a);
  return r.delete(e), aa(e, l) && (l = na(n._scopes, n, e, l)), l;
}
function pr(e, t, s, a) {
  const { _proxy: n, _context: i, _subProxy: o, _descriptors: r } = s;
  if (typeof i.index < "u" && a(e))
    return t[i.index % t.length];
  if (J(t[0])) {
    const l = t, d = n._scopes.filter((u) => u !== l);
    t = [];
    for (const u of l) {
      const f = na(d, n, e, u);
      t.push(be(f, i, o && o[e], r));
    }
  }
  return t;
}
function ri(e, t, s) {
  return Gt(e) ? e(t, s) : e;
}
const br = (e, t) => e === !0 ? t : typeof e == "string" ? le(t, e) : void 0;
function vr(e, t, s, a, n) {
  for (const i of t) {
    const o = br(s, i);
    if (o) {
      e.add(o);
      const r = ri(o._fallback, s, n);
      if (typeof r < "u" && r !== s && r !== a)
        return r;
    } else if (o === !1 && typeof a < "u" && s !== a)
      return null;
  }
  return !1;
}
function na(e, t, s, a) {
  const n = t._rootScopes, i = ri(t._fallback, s, a), o = [
    ...e,
    ...n
  ], r = /* @__PURE__ */ new Set();
  r.add(a);
  let l = Ba(r, o, s, i || s, a);
  return l === null || typeof i < "u" && i !== s && (l = Ba(r, o, i, l, a), l === null) ? !1 : sa(Array.from(r), [
    ""
  ], n, i, () => mr(t, s, a));
}
function Ba(e, t, s, a, n) {
  for (; s; )
    s = vr(e, t, s, a, n);
  return s;
}
function mr(e, t, s) {
  const a = e._getTarget();
  t in a || (a[t] = {});
  const n = a[t];
  return vt(n) && J(s) ? s : n || {};
}
function _r(e, t, s, a) {
  let n;
  for (const i of t)
    if (n = li(hr(i, e), s), typeof n < "u")
      return aa(e, n) ? na(s, a, e, n) : n;
}
function li(e, t) {
  for (const s of t) {
    if (!s)
      continue;
    const a = s[e];
    if (typeof a < "u")
      return a;
  }
}
function Fa(e) {
  let t = e._keys;
  return t || (t = e._keys = yr(e._scopes)), t;
}
function yr(e) {
  const t = /* @__PURE__ */ new Set();
  for (const s of e)
    for (const a of Object.keys(s).filter((n) => !n.startsWith("_")))
      t.add(a);
  return Array.from(t);
}
const xr = Number.EPSILON || 1e-14, ve = (e, t) => t < e.length && !e[t].skip && e[t], ci = (e) => e === "x" ? "y" : "x";
function kr(e, t, s, a) {
  const n = e.skip ? t : e, i = t, o = s.skip ? t : s, r = Ns(i, n), l = Ns(o, i);
  let d = r / (r + l), u = l / (r + l);
  d = isNaN(d) ? 0 : d, u = isNaN(u) ? 0 : u;
  const f = a * d, p = a * u;
  return {
    previous: {
      x: i.x - f * (o.x - n.x),
      y: i.y - f * (o.y - n.y)
    },
    next: {
      x: i.x + p * (o.x - n.x),
      y: i.y + p * (o.y - n.y)
    }
  };
}
function Mr(e, t, s) {
  const a = e.length;
  let n, i, o, r, l, d = ve(e, 0);
  for (let u = 0; u < a - 1; ++u)
    if (l = d, d = ve(e, u + 1), !(!l || !d)) {
      if (Be(t[u], 0, xr)) {
        s[u] = s[u + 1] = 0;
        continue;
      }
      n = s[u] / t[u], i = s[u + 1] / t[u], r = Math.pow(n, 2) + Math.pow(i, 2), !(r <= 9) && (o = 3 / Math.sqrt(r), s[u] = n * o * t[u], s[u + 1] = i * o * t[u]);
    }
}
function Sr(e, t, s = "x") {
  const a = ci(s), n = e.length;
  let i, o, r, l = ve(e, 0);
  for (let d = 0; d < n; ++d) {
    if (o = r, r = l, l = ve(e, d + 1), !r)
      continue;
    const u = r[s], f = r[a];
    o && (i = (u - o[s]) / 3, r[`cp1${s}`] = u - i, r[`cp1${a}`] = f - i * t[d]), l && (i = (l[s] - u) / 3, r[`cp2${s}`] = u + i, r[`cp2${a}`] = f + i * t[d]);
  }
}
function wr(e, t = "x") {
  const s = ci(t), a = e.length, n = Array(a).fill(0), i = Array(a);
  let o, r, l, d = ve(e, 0);
  for (o = 0; o < a; ++o)
    if (r = l, l = d, d = ve(e, o + 1), !!l) {
      if (d) {
        const u = d[t] - l[t];
        n[o] = u !== 0 ? (d[s] - l[s]) / u : 0;
      }
      i[o] = r ? d ? Rt(n[o - 1]) !== Rt(n[o]) ? 0 : (n[o - 1] + n[o]) / 2 : n[o - 1] : n[o];
    }
  Mr(e, n, i), Sr(e, i, t);
}
function Ge(e, t, s) {
  return Math.max(Math.min(e, s), t);
}
function $r(e, t) {
  let s, a, n, i, o, r = Ne(e[0], t);
  for (s = 0, a = e.length; s < a; ++s)
    o = i, i = r, r = s < a - 1 && Ne(e[s + 1], t), i && (n = e[s], o && (n.cp1x = Ge(n.cp1x, t.left, t.right), n.cp1y = Ge(n.cp1y, t.top, t.bottom)), r && (n.cp2x = Ge(n.cp2x, t.left, t.right), n.cp2y = Ge(n.cp2y, t.top, t.bottom)));
}
function Cr(e, t, s, a, n) {
  let i, o, r, l;
  if (t.spanGaps && (e = e.filter((d) => !d.skip)), t.cubicInterpolationMode === "monotone")
    wr(e, n);
  else {
    let d = a ? e[e.length - 1] : e[0];
    for (i = 0, o = e.length; i < o; ++i)
      r = e[i], l = kr(d, r, e[Math.min(i + 1, o - (a ? 0 : 1)) % o], t.tension), r.cp1x = l.previous.x, r.cp1y = l.previous.y, r.cp2x = l.next.x, r.cp2y = l.next.y, d = r;
  }
  t.capBezierPoints && $r(e, s);
}
function ia() {
  return typeof window < "u" && typeof document < "u";
}
function oa(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function ds(e, t, s) {
  let a;
  return typeof e == "string" ? (a = parseInt(e, 10), e.indexOf("%") !== -1 && (a = a / 100 * t.parentNode[s])) : a = e, a;
}
const bs = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function Dr(e, t) {
  return bs(e).getPropertyValue(t);
}
const Ar = [
  "top",
  "right",
  "bottom",
  "left"
];
function oe(e, t, s) {
  const a = {};
  s = s ? "-" + s : "";
  for (let n = 0; n < 4; n++) {
    const i = Ar[n];
    a[i] = parseFloat(e[t + "-" + i + s]) || 0;
  }
  return a.width = a.left + a.right, a.height = a.top + a.bottom, a;
}
const Tr = (e, t, s) => (e > 0 || t > 0) && (!s || !s.shadowRoot);
function Br(e, t) {
  const s = e.touches, a = s && s.length ? s[0] : e, { offsetX: n, offsetY: i } = a;
  let o = !1, r, l;
  if (Tr(n, i, e.target))
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
function ae(e, t) {
  if ("native" in e)
    return e;
  const { canvas: s, currentDevicePixelRatio: a } = t, n = bs(s), i = n.boxSizing === "border-box", o = oe(n, "padding"), r = oe(n, "border", "width"), { x: l, y: d, box: u } = Br(e, s), f = o.left + (u && r.left), p = o.top + (u && r.top);
  let { width: g, height: h } = t;
  return i && (g -= o.width + r.width, h -= o.height + r.height), {
    x: Math.round((l - f) / g * s.width / a),
    y: Math.round((d - p) / h * s.height / a)
  };
}
function Fr(e, t, s) {
  let a, n;
  if (t === void 0 || s === void 0) {
    const i = e && oa(e);
    if (!i)
      t = e.clientWidth, s = e.clientHeight;
    else {
      const o = i.getBoundingClientRect(), r = bs(i), l = oe(r, "border", "width"), d = oe(r, "padding");
      t = o.width - d.width - l.width, s = o.height - d.height - l.height, a = ds(r.maxWidth, i, "clientWidth"), n = ds(r.maxHeight, i, "clientHeight");
    }
  }
  return {
    width: t,
    height: s,
    maxWidth: a || ls,
    maxHeight: n || ls
  };
}
const Ut = (e) => Math.round(e * 10) / 10;
function Pr(e, t, s, a) {
  const n = bs(e), i = oe(n, "margin"), o = ds(n.maxWidth, e, "clientWidth") || ls, r = ds(n.maxHeight, e, "clientHeight") || ls, l = Fr(e, t, s);
  let { width: d, height: u } = l;
  if (n.boxSizing === "content-box") {
    const p = oe(n, "border", "width"), g = oe(n, "padding");
    d -= g.width + p.width, u -= g.height + p.height;
  }
  return d = Math.max(0, d - i.width), u = Math.max(0, a ? d / a : u - i.height), d = Ut(Math.min(d, o, l.maxWidth)), u = Ut(Math.min(u, r, l.maxHeight)), d && !u && (u = Ut(d / 2)), (t !== void 0 || s !== void 0) && a && l.height && u > l.height && (u = l.height, d = Ut(Math.floor(u * a))), {
    width: d,
    height: u
  };
}
function Pa(e, t, s) {
  const a = t || 1, n = Ut(e.height * a), i = Ut(e.width * a);
  e.height = Ut(e.height), e.width = Ut(e.width);
  const o = e.canvas;
  return o.style && (s || !o.style.height && !o.style.width) && (o.style.height = `${e.height}px`, o.style.width = `${e.width}px`), e.currentDevicePixelRatio !== a || o.height !== n || o.width !== i ? (e.currentDevicePixelRatio = a, o.height = n, o.width = i, e.ctx.setTransform(a, 0, 0, a, 0, 0), !0) : !1;
}
const Lr = (function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    ia() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function La(e, t) {
  const s = Dr(e, t), a = s && s.match(/^(\d+)(\.\d+)?px$/);
  return a ? +a[1] : void 0;
}
function ne(e, t, s, a) {
  return {
    x: e.x + s * (t.x - e.x),
    y: e.y + s * (t.y - e.y)
  };
}
function Er(e, t, s, a) {
  return {
    x: e.x + s * (t.x - e.x),
    y: a === "middle" ? s < 0.5 ? e.y : t.y : a === "after" ? s < 1 ? e.y : t.y : s > 0 ? t.y : e.y
  };
}
function Or(e, t, s, a) {
  const n = {
    x: e.cp2x,
    y: e.cp2y
  }, i = {
    x: t.cp1x,
    y: t.cp1y
  }, o = ne(e, n, s), r = ne(n, i, s), l = ne(i, t, s), d = ne(o, r, s), u = ne(r, l, s);
  return ne(d, u, s);
}
const Rr = function(e, t) {
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
}, Ir = function() {
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
  return e ? Rr(t, s) : Ir();
}
function di(e, t) {
  let s, a;
  (t === "ltr" || t === "rtl") && (s = e.canvas.style, a = [
    s.getPropertyValue("direction"),
    s.getPropertyPriority("direction")
  ], s.setProperty("direction", t, "important"), e.prevTextDirection = a);
}
function ui(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function hi(e) {
  return e === "angle" ? {
    between: ze,
    compare: Ro,
    normalize: Tt
  } : {
    between: Vt,
    compare: (t, s) => t - s,
    normalize: (t) => t
  };
}
function Ea({ start: e, end: t, count: s, loop: a, style: n }) {
  return {
    start: e % s,
    end: t % s,
    loop: a && (t - e + 1) % s === 0,
    style: n
  };
}
function zr(e, t, s) {
  const { property: a, start: n, end: i } = s, { between: o, normalize: r } = hi(a), l = t.length;
  let { start: d, end: u, loop: f } = e, p, g;
  if (f) {
    for (d += l, u += l, p = 0, g = l; p < g && o(r(t[d % l][a]), n, i); ++p)
      d--, u--;
    d %= l, u %= l;
  }
  return u < d && (u += l), {
    start: d,
    end: u,
    loop: f,
    style: e.style
  };
}
function fi(e, t, s) {
  if (!s)
    return [
      e
    ];
  const { property: a, start: n, end: i } = s, o = t.length, { compare: r, between: l, normalize: d } = hi(a), { start: u, end: f, loop: p, style: g } = zr(e, t, s), h = [];
  let b = !1, v = null, m, _, k;
  const M = () => l(n, k, m) && r(n, k) !== 0, S = () => r(i, m) === 0 || l(i, k, m), $ = () => b || M(), A = () => !b || S();
  for (let F = u, E = u; F <= f; ++F)
    _ = t[F % o], !_.skip && (m = d(_[a]), m !== k && (b = l(m, n, i), v === null && $() && (v = r(m, n) === 0 ? F : E), v !== null && A() && (h.push(Ea({
      start: v,
      end: F,
      loop: p,
      count: o,
      style: g
    })), v = null), E = F, k = m));
  return v !== null && h.push(Ea({
    start: v,
    end: f,
    loop: p,
    count: o,
    style: g
  })), h;
}
function gi(e, t) {
  const s = [], a = e.segments;
  for (let n = 0; n < a.length; n++) {
    const i = fi(a[n], e.points, t);
    i.length && s.push(...i);
  }
  return s;
}
function Nr(e, t, s, a) {
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
function Wr(e, t, s, a) {
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
function Hr(e, t) {
  const s = e.points, a = e.options.spanGaps, n = s.length;
  if (!n)
    return [];
  const i = !!e._loop, { start: o, end: r } = Nr(s, n, i, a);
  if (a === !0)
    return Oa(e, [
      {
        start: o,
        end: r,
        loop: i
      }
    ], s, t);
  const l = r < o ? r + n : r, d = !!e._fullLoop && o === 0 && r === n - 1;
  return Oa(e, Wr(s, o, l, d), s, t);
}
function Oa(e, t, s, a) {
  return !a || !a.setContext || !s ? t : Vr(e, t, s, a);
}
function Vr(e, t, s, a) {
  const n = e._chart.getContext(), i = Ra(e.options), { _datasetIndex: o, options: { spanGaps: r } } = e, l = s.length, d = [];
  let u = i, f = t[0].start, p = f;
  function g(h, b, v, m) {
    const _ = r ? -1 : 1;
    if (h !== b) {
      for (h += l; s[h % l].skip; )
        h -= _;
      for (; s[b % l].skip; )
        b += _;
      h % l !== b % l && (d.push({
        start: h % l,
        end: b % l,
        loop: v,
        style: m
      }), u = m, f = b % l);
    }
  }
  for (const h of t) {
    f = r ? f : h.start;
    let b = s[f % l], v;
    for (p = f + 1; p <= h.end; p++) {
      const m = s[p % l];
      v = Ra(a.setContext(de(n, {
        type: "segment",
        p0: b,
        p1: m,
        p0DataIndex: (p - 1) % l,
        p1DataIndex: p % l,
        datasetIndex: o
      }))), jr(v, u) && g(f, p - 1, h.loop, u), b = m, u = v;
    }
    f < p - 1 && g(f, p - 1, h.loop, u);
  }
  return d;
}
function Ra(e) {
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
function jr(e, t) {
  if (!t)
    return !1;
  const s = [], a = function(n, i) {
    return Js(i) ? (s.includes(i) || s.push(i), s.indexOf(i)) : i;
  };
  return JSON.stringify(e, a) !== JSON.stringify(t, a);
}
function Ze(e, t, s) {
  return e.options.clip ? e[s] : t[s];
}
function Yr(e, t) {
  const { xScale: s, yScale: a } = e;
  return s && a ? {
    left: Ze(s, t, "left"),
    right: Ze(s, t, "right"),
    top: Ze(a, t, "top"),
    bottom: Ze(a, t, "bottom")
  } : t;
}
function pi(e, t) {
  const s = t._clip;
  if (s.disabled)
    return !1;
  const a = Yr(t, e.chartArea);
  return {
    left: s.left === !1 ? 0 : a.left - (s.left === !0 ? 0 : s.left),
    right: s.right === !1 ? e.width : a.right + (s.right === !0 ? 0 : s.right),
    top: s.top === !1 ? 0 : a.top - (s.top === !0 ? 0 : s.top),
    bottom: s.bottom === !1 ? e.height : a.bottom + (s.bottom === !0 ? 0 : s.bottom)
  };
}
class qr {
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
    this._request || (this._running = !0, this._request = ti.call(window, () => {
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
var zt = /* @__PURE__ */ new qr();
const Ia = "transparent", Ur = {
  boolean(e, t, s) {
    return s > 0.5 ? t : e;
  },
  color(e, t, s) {
    const a = Ca(e || Ia), n = a.valid && Ca(t || Ia);
    return n && n.valid ? n.mix(a, s).hexString() : t;
  },
  number(e, t, s) {
    return e + (t - e) * s;
  }
};
class Kr {
  constructor(t, s, a, n) {
    const i = s[a];
    n = Xe([
      t.to,
      n,
      i,
      t.from
    ]);
    const o = Xe([
      t.from,
      i,
      n
    ]);
    this._active = !0, this._fn = t.fn || Ur[t.type || typeof o], this._easing = Fe[t.easing] || Fe.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = s, this._prop = a, this._from = o, this._to = n, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, s, a) {
    if (this._active) {
      this._notify(!1);
      const n = this._target[this._prop], i = a - this._start, o = this._duration - i;
      this._start = a, this._duration = Math.floor(Math.max(o, t.duration)), this._total += i, this._loop = !!t.loop, this._to = Xe([
        t.to,
        s,
        n,
        t.from
      ]), this._from = Xe([
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
class bi {
  constructor(t, s) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(s);
  }
  configure(t) {
    if (!J(t))
      return;
    const s = Object.keys(pt.animation), a = this._properties;
    Object.getOwnPropertyNames(t).forEach((n) => {
      const i = t[n];
      if (!J(i))
        return;
      const o = {};
      for (const r of s)
        o[r] = i[r];
      (vt(i.properties) && i.properties || [
        n
      ]).forEach((r) => {
        (r === n || !a.has(r)) && a.set(r, o);
      });
    });
  }
  _animateOptions(t, s) {
    const a = s.options, n = Gr(t, a);
    if (!n)
      return [];
    const i = this._createAnimations(n, a);
    return a.$shared && Xr(t.options.$animations, a).then(() => {
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
      const u = s[d];
      let f = i[d];
      const p = a.get(d);
      if (f)
        if (p && f.active()) {
          f.update(p, u, r);
          continue;
        } else
          f.cancel();
      if (!p || !p.duration) {
        t[d] = u;
        continue;
      }
      i[d] = f = new Kr(p, t, d, u), n.push(f);
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
      return zt.add(this._chart, a), !0;
  }
}
function Xr(e, t) {
  const s = [], a = Object.keys(t);
  for (let n = 0; n < a.length; n++) {
    const i = e[a[n]];
    i && i.active() && s.push(i.wait());
  }
  return Promise.all(s);
}
function Gr(e, t) {
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
function za(e, t) {
  const s = e && e.options || {}, a = s.reverse, n = s.min === void 0 ? t : 0, i = s.max === void 0 ? t : 0;
  return {
    start: a ? i : n,
    end: a ? n : i
  };
}
function Zr(e, t, s) {
  if (s === !1)
    return !1;
  const a = za(e, s), n = za(t, s);
  return {
    top: n.end,
    right: a.end,
    bottom: n.start,
    left: a.start
  };
}
function Qr(e) {
  let t, s, a, n;
  return J(e) ? (t = e.top, s = e.right, a = e.bottom, n = e.left) : t = s = a = n = e, {
    top: t,
    right: s,
    bottom: a,
    left: n,
    disabled: e === !1
  };
}
function vi(e, t) {
  const s = [], a = e._getSortedDatasetMetas(t);
  let n, i;
  for (n = 0, i = a.length; n < i; ++n)
    s.push(a[n].index);
  return s;
}
function Na(e, t, s, a = {}) {
  const n = e.keys, i = a.mode === "single";
  let o, r, l, d;
  if (t === null)
    return;
  let u = !1;
  for (o = 0, r = n.length; o < r; ++o) {
    if (l = +n[o], l === s) {
      if (u = !0, a.all)
        continue;
      break;
    }
    d = e.values[l], St(d) && (i || t === 0 || Rt(t) === Rt(d)) && (t += d);
  }
  return !u && !a.all ? 0 : t;
}
function Jr(e, t) {
  const { iScale: s, vScale: a } = t, n = s.axis === "x" ? "x" : "y", i = a.axis === "x" ? "x" : "y", o = Object.keys(e), r = new Array(o.length);
  let l, d, u;
  for (l = 0, d = o.length; l < d; ++l)
    u = o[l], r[l] = {
      [n]: u,
      [i]: e[u]
    };
  return r;
}
function $s(e, t) {
  const s = e && e.options.stacked;
  return s || s === void 0 && t.stack !== void 0;
}
function tl(e, t, s) {
  return `${e.id}.${t.id}.${s.stack || s.type}`;
}
function el(e) {
  const { min: t, max: s, minDefined: a, maxDefined: n } = e.getUserBounds();
  return {
    min: a ? t : Number.NEGATIVE_INFINITY,
    max: n ? s : Number.POSITIVE_INFINITY
  };
}
function sl(e, t, s) {
  const a = e[t] || (e[t] = {});
  return a[s] || (a[s] = {});
}
function Wa(e, t, s, a) {
  for (const n of t.getMatchingVisibleMetas(a).reverse()) {
    const i = e[n.index];
    if (s && i > 0 || !s && i < 0)
      return n.index;
  }
  return null;
}
function Ha(e, t) {
  const { chart: s, _cachedMeta: a } = e, n = s._stacks || (s._stacks = {}), { iScale: i, vScale: o, index: r } = a, l = i.axis, d = o.axis, u = tl(i, o, a), f = t.length;
  let p;
  for (let g = 0; g < f; ++g) {
    const h = t[g], { [l]: b, [d]: v } = h, m = h._stacks || (h._stacks = {});
    p = m[d] = sl(n, u, b), p[r] = v, p._top = Wa(p, o, !0, a.type), p._bottom = Wa(p, o, !1, a.type);
    const _ = p._visualValues || (p._visualValues = {});
    _[r] = v;
  }
}
function Cs(e, t) {
  const s = e.scales;
  return Object.keys(s).filter((a) => s[a].axis === t).shift();
}
function al(e, t) {
  return de(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function nl(e, t, s) {
  return de(e, {
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
const Ds = (e) => e === "reset" || e === "none", Va = (e, t) => t ? e : Object.assign({}, e), il = (e, t, s) => e && !t.hidden && t._stacked && {
  keys: vi(s, !0),
  values: null
};
class vs {
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
    const t = this.chart, s = this._cachedMeta, a = this.getDataset(), n = (f, p, g, h) => f === "x" ? p : f === "r" ? h : g, i = s.xAxisID = G(a.xAxisID, Cs(t, "x")), o = s.yAxisID = G(a.yAxisID, Cs(t, "y")), r = s.rAxisID = G(a.rAxisID, Cs(t, "r")), l = s.indexAxis, d = s.iAxisID = n(l, i, o, r), u = s.vAxisID = n(l, o, i, r);
    s.xScale = this.getScaleForId(i), s.yScale = this.getScaleForId(o), s.rScale = this.getScaleForId(r), s.iScale = this.getScaleForId(d), s.vScale = this.getScaleForId(u);
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
    this._data && Sa(this._data, this), t._stacked && xe(t);
  }
  _dataCheck() {
    const t = this.getDataset(), s = t.data || (t.data = []), a = this._data;
    if (J(s)) {
      const n = this._cachedMeta;
      this._data = Jr(s, n);
    } else if (a !== s) {
      if (a) {
        Sa(a, this);
        const n = this._cachedMeta;
        xe(n), n._parsed = [];
      }
      s && Object.isExtensible(s) && Wo(s, this), this._syncList = [], this._data = s;
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
    s._stacked = $s(s.vScale, s), s.stack !== a.stack && (n = !0, xe(s), s.stack = a.stack), this._resyncElements(t), (n || i !== s._stacked) && (Ha(this, s._parsed), s._stacked = $s(s.vScale, s));
  }
  configure() {
    const t = this.chart.config, s = t.datasetScopeKeys(this._type), a = t.getOptionScopes(this.getDataset(), s, !0);
    this.options = t.createResolver(a, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, s) {
    const { _cachedMeta: a, _data: n } = this, { iScale: i, _stacked: o } = a, r = i.axis;
    let l = t === 0 && s === n.length ? !0 : a._sorted, d = t > 0 && a._parsed[t - 1], u, f, p;
    if (this._parsing === !1)
      a._parsed = n, a._sorted = !0, p = n;
    else {
      vt(n[t]) ? p = this.parseArrayData(a, n, t, s) : J(n[t]) ? p = this.parseObjectData(a, n, t, s) : p = this.parsePrimitiveData(a, n, t, s);
      const g = () => f[r] === null || d && f[r] < d[r];
      for (u = 0; u < s; ++u)
        a._parsed[u + t] = f = p[u], l && (g() && (l = !1), d = f);
      a._sorted = l;
    }
    o && Ha(this, p);
  }
  parsePrimitiveData(t, s, a, n) {
    const { iScale: i, vScale: o } = t, r = i.axis, l = o.axis, d = i.getLabels(), u = i === o, f = new Array(n);
    let p, g, h;
    for (p = 0, g = n; p < g; ++p)
      h = p + a, f[p] = {
        [r]: u || i.parse(d[h], h),
        [l]: o.parse(s[h], h)
      };
    return f;
  }
  parseArrayData(t, s, a, n) {
    const { xScale: i, yScale: o } = t, r = new Array(n);
    let l, d, u, f;
    for (l = 0, d = n; l < d; ++l)
      u = l + a, f = s[u], r[l] = {
        x: i.parse(f[0], u),
        y: o.parse(f[1], u)
      };
    return r;
  }
  parseObjectData(t, s, a, n) {
    const { xScale: i, yScale: o } = t, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, d = new Array(n);
    let u, f, p, g;
    for (u = 0, f = n; u < f; ++u)
      p = u + a, g = s[p], d[u] = {
        x: i.parse(le(g, r), p),
        y: o.parse(le(g, l), p)
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
      keys: vi(n, !0),
      values: s._stacks[t.axis]._visualValues
    };
    return Na(r, o, i.index, {
      mode: a
    });
  }
  updateRangeFromParsed(t, s, a, n) {
    const i = a[s.axis];
    let o = i === null ? NaN : i;
    const r = n && a._stacks[s.axis];
    n && r && (n.values = r, o = Na(n, i, this._cachedMeta.index)), t.min = Math.min(t.min, o), t.max = Math.max(t.max, o);
  }
  getMinMax(t, s) {
    const a = this._cachedMeta, n = a._parsed, i = a._sorted && t === a.iScale, o = n.length, r = this._getOtherScale(t), l = il(s, a, this.chart), d = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: u, max: f } = el(r);
    let p, g;
    function h() {
      g = n[p];
      const b = g[r.axis];
      return !St(g[t.axis]) || u > b || f < b;
    }
    for (p = 0; p < o && !(!h() && (this.updateRangeFromParsed(d, t, g, l), i)); ++p)
      ;
    if (i) {
      for (p = o - 1; p >= 0; --p)
        if (!h()) {
          this.updateRangeFromParsed(d, t, g, l);
          break;
        }
    }
    return d;
  }
  getAllParsedValues(t) {
    const s = this._cachedMeta._parsed, a = [];
    let n, i, o;
    for (n = 0, i = s.length; n < i; ++n)
      o = s[n][t.axis], St(o) && a.push(o);
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
    this.update(t || "default"), s._clip = Qr(G(this.options.clip, Zr(s.xScale, s.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, s = this.chart, a = this._cachedMeta, n = a.data || [], i = s.chartArea, o = [], r = this._drawStart || 0, l = this._drawCount || n.length - r, d = this.options.drawActiveElementsOnTop;
    let u;
    for (a.dataset && a.dataset.draw(t, i, r, l), u = r; u < r + l; ++u) {
      const f = n[u];
      f.hidden || (f.active && d ? o.push(f) : f.draw(t, i));
    }
    for (u = 0; u < o.length; ++u)
      o[u].draw(t, i);
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
      i = o.$context || (o.$context = nl(this.getContext(), t, o)), i.parsed = this.getParsed(t), i.raw = n.data[t], i.index = i.dataIndex = t;
    } else
      i = this.$context || (this.$context = al(this.chart.getContext(), this.index)), i.dataset = n, i.index = i.datasetIndex = this.index;
    return i.active = !!s, i.mode = a, i;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, s) {
    return this._resolveElementOptions(this.dataElementType.id, s, t);
  }
  _resolveElementOptions(t, s = "default", a) {
    const n = s === "active", i = this._cachedDataOpts, o = t + "-" + s, r = i[o], l = this.enableOptionSharing && Re(a);
    if (r)
      return Va(r, l);
    const d = this.chart.config, u = d.datasetElementScopeKeys(this._type, t), f = n ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], p = d.getOptionScopes(this.getDataset(), u), g = Object.keys(pt.elements[t]), h = () => this.getContext(a, n, s), b = d.resolveNamedOptions(p, g, h, f);
    return b.$shared && (b.$shared = l, i[o] = Object.freeze(Va(b, l))), b;
  }
  _resolveAnimations(t, s, a) {
    const n = this.chart, i = this._cachedDataOpts, o = `animation-${s}`, r = i[o];
    if (r)
      return r;
    let l;
    if (n.options.animation !== !1) {
      const u = this.chart.config, f = u.datasetAnimationScopeKeys(this._type, s), p = u.getOptionScopes(this.getDataset(), f);
      l = u.createResolver(p, this.getContext(t, a, s));
    }
    const d = new bi(n, l && l.animations);
    return l && l._cacheable && (i[o] = Object.freeze(d)), d;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, s) {
    return !s || Ds(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, s) {
    const a = this.resolveDataElementOptions(t, s), n = this._sharedOptions, i = this.getSharedOptions(a), o = this.includeOptions(s, i) || i !== n;
    return this.updateSharedOptions(i, s, a), {
      sharedOptions: i,
      includeOptions: o
    };
  }
  updateElement(t, s, a, n) {
    Ds(n) ? Object.assign(t, a) : this._resolveAnimations(s, n).update(t, a);
  }
  updateSharedOptions(t, s, a) {
    t && !Ds(s) && this._resolveAnimations(void 0, s).update(t, a);
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
      a._stacked && xe(a, n);
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
function ol(e, t) {
  if (!e._cache.$bar) {
    const s = e.getMatchingVisibleMetas(t);
    let a = [];
    for (let n = 0, i = s.length; n < i; n++)
      a = a.concat(s[n].controller.getAllParsedValues(e));
    e._cache.$bar = Jn(a.sort((n, i) => n - i));
  }
  return e._cache.$bar;
}
function rl(e) {
  const t = e.iScale, s = ol(t, e.type);
  let a = t._length, n, i, o, r;
  const l = () => {
    o === 32767 || o === -32768 || (Re(r) && (a = Math.min(a, Math.abs(o - r) || a)), r = o);
  };
  for (n = 0, i = s.length; n < i; ++n)
    o = t.getPixelForValue(s[n]), l();
  for (r = void 0, n = 0, i = t.ticks.length; n < i; ++n)
    o = t.getPixelForTick(n), l();
  return a;
}
function ll(e, t, s, a) {
  const n = s.barThickness;
  let i, o;
  return ot(n) ? (i = t.min * s.categoryPercentage, o = s.barPercentage) : (i = n * a, o = 1), {
    chunk: i / a,
    ratio: o,
    start: t.pixels[e] - i / 2
  };
}
function cl(e, t, s, a) {
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
function dl(e, t, s, a) {
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
function mi(e, t, s, a) {
  return vt(e) ? dl(e, t, s, a) : t[s.axis] = s.parse(e, a), t;
}
function ja(e, t, s, a) {
  const n = e.iScale, i = e.vScale, o = n.getLabels(), r = n === i, l = [];
  let d, u, f, p;
  for (d = s, u = s + a; d < u; ++d)
    p = t[d], f = {}, f[n.axis] = r || n.parse(o[d], d), l.push(mi(p, f, i, d));
  return l;
}
function As(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function ul(e, t, s) {
  return e !== 0 ? Rt(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= s ? 1 : -1);
}
function hl(e) {
  let t, s, a, n, i;
  return e.horizontal ? (t = e.base > e.x, s = "left", a = "right") : (t = e.base < e.y, s = "bottom", a = "top"), t ? (n = "end", i = "start") : (n = "start", i = "end"), {
    start: s,
    end: a,
    reverse: t,
    top: n,
    bottom: i
  };
}
function fl(e, t, s, a) {
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
  const { start: o, end: r, reverse: l, top: d, bottom: u } = hl(e);
  n === "middle" && s && (e.enableBorderRadius = !0, (s._top || 0) === a ? n = d : (s._bottom || 0) === a ? n = u : (i[Ya(u, o, r, l)] = !0, n = d)), i[Ya(n, o, r, l)] = !0, e.borderSkipped = i;
}
function Ya(e, t, s, a) {
  return a ? (e = gl(e, t, s), e = qa(e, s, t)) : e = qa(e, t, s), e;
}
function gl(e, t, s) {
  return e === t ? s : e === s ? t : e;
}
function qa(e, t, s) {
  return e === "start" ? t : e === "end" ? s : e;
}
function pl(e, { inflateAmount: t }, s) {
  e.inflateAmount = t === "auto" ? s === 1 ? 0.33 : 0 : t;
}
class bl extends vs {
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
    return ja(t, s, a, n);
  }
  parseArrayData(t, s, a, n) {
    return ja(t, s, a, n);
  }
  parseObjectData(t, s, a, n) {
    const { iScale: i, vScale: o } = t, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, d = i.axis === "x" ? r : l, u = o.axis === "x" ? r : l, f = [];
    let p, g, h, b;
    for (p = a, g = a + n; p < g; ++p)
      b = s[p], h = {}, h[i.axis] = i.parse(le(b, d), p), f.push(mi(le(b, u), h, o, p));
    return f;
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
    const s = this._cachedMeta, { iScale: a, vScale: n } = s, i = this.getParsed(t), o = i._custom, r = As(o) ? "[" + o.start + ", " + o.end + "]" : "" + n.getLabelForValue(i[n.axis]);
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
    const i = n === "reset", { index: o, _cachedMeta: { vScale: r } } = this, l = r.getBasePixel(), d = r.isHorizontal(), u = this._getRuler(), { sharedOptions: f, includeOptions: p } = this._getSharedOptions(s, n);
    for (let g = s; g < s + a; g++) {
      const h = this.getParsed(g), b = i || ot(h[r.axis]) ? {
        base: l,
        head: l
      } : this._calculateBarValuePixels(g), v = this._calculateBarIndexPixels(g, u), m = (h._stacks || {})[r.axis], _ = {
        horizontal: d,
        base: b.base,
        enableBorderRadius: !m || As(h._custom) || o === m._top || o === m._bottom,
        x: d ? b.head : v.center,
        y: d ? v.center : b.head,
        height: d ? v.size : Math.abs(b.size),
        width: d ? Math.abs(b.size) : v.size
      };
      p && (_.options = f || this.resolveDataElementOptions(g, t[g].active ? "active" : n));
      const k = _.options || t[g].options;
      fl(_, k, m, o), pl(_, k, u.ratio), this.updateElement(t[g], g, _, n);
    }
  }
  _getStacks(t, s) {
    const { iScale: a } = this._cachedMeta, n = a.getMatchingVisibleMetas(this._type).filter((u) => u.controller.options.grouped), i = a.options.stacked, o = [], r = this._cachedMeta.controller.getParsed(s), l = r && r[a.axis], d = (u) => {
      const f = u._parsed.find((g) => g[a.axis] === l), p = f && f[u.vScale.axis];
      if (ot(p) || isNaN(p))
        return !0;
    };
    for (const u of n)
      if (!(s !== void 0 && d(u)) && ((i === !1 || o.indexOf(u.stack) === -1 || i === void 0 && u.stack === void 0) && o.push(u.stack), u.index === t))
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
      t[G(this.chart.options.indexAxis === "x" ? a.xAxisID : a.yAxisID, s)] = !0;
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
      min: r || rl(s),
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
    const { _cachedMeta: { vScale: s, _stacked: a, index: n }, options: { base: i, minBarLength: o } } = this, r = i || 0, l = this.getParsed(t), d = l._custom, u = As(d);
    let f = l[s.axis], p = 0, g = a ? this.applyStack(s, l, a) : f, h, b;
    g !== f && (p = g - f, g = f), u && (f = d.barStart, g = d.barEnd - d.barStart, f !== 0 && Rt(f) !== Rt(d.barEnd) && (p = 0), p += f);
    const v = !ot(i) && !u ? i : p;
    let m = s.getPixelForValue(v);
    if (this.chart.getDataVisibility(t) ? h = s.getPixelForValue(p + g) : h = m, b = h - m, Math.abs(b) < o) {
      b = ul(b, s, r) * o, f === r && (m -= b / 2);
      const _ = s.getPixelForDecimal(0), k = s.getPixelForDecimal(1), M = Math.min(_, k), S = Math.max(_, k);
      m = Math.max(Math.min(m, S), M), h = m + b, a && !u && (l._stacks[s.axis]._visualValues[n] = s.getValueForPixel(h) - s.getValueForPixel(m));
    }
    if (m === s.getPixelForValue(r)) {
      const _ = Rt(b) * s.getLineWidthForValue(r) / 2;
      m += _, b -= _;
    }
    return {
      size: b,
      base: m,
      head: h,
      center: h + b / 2
    };
  }
  _calculateBarIndexPixels(t, s) {
    const a = s.scale, n = this.options, i = n.skipNull, o = G(n.maxBarThickness, 1 / 0);
    let r, l;
    const d = this._getAxisCount();
    if (s.grouped) {
      const u = i ? this._getStackCount(t) : s.stackCount, f = n.barThickness === "flex" ? cl(t, s, n, u * d) : ll(t, s, n, u * d), p = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, g = this._getAxis().indexOf(G(p, this.getFirstScaleIdForIndexAxis())), h = this._getStackIndex(this.index, this._cachedMeta.stack, i ? t : void 0) + g;
      r = f.start + f.chunk * h + f.chunk / 2, l = Math.min(o, f.chunk * f.ratio);
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
function vl(e, t, s) {
  let a = 1, n = 1, i = 0, o = 0;
  if (t < ft) {
    const r = e, l = r + t, d = Math.cos(r), u = Math.sin(r), f = Math.cos(l), p = Math.sin(l), g = (k, M, S) => ze(k, r, l, !0) ? 1 : Math.max(M, M * s, S, S * s), h = (k, M, S) => ze(k, r, l, !0) ? -1 : Math.min(M, M * s, S, S * s), b = g(0, d, f), v = g(mt, u, p), m = h(lt, d, f), _ = h(lt + mt, u, p);
    a = (b - m) / 2, n = (v - _) / 2, i = -(b + m) / 2, o = -(v + _) / 2;
  }
  return {
    ratioX: a,
    ratioY: n,
    offsetX: i,
    offsetY: o
  };
}
class ml extends vs {
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
              const f = t.getDatasetMeta(0).controller.getStyle(d);
              return {
                text: l,
                fillStyle: f.backgroundColor,
                fontColor: i,
                hidden: !t.getDataVisibility(d),
                lineDash: f.borderDash,
                lineDashOffset: f.borderDashOffset,
                lineJoin: f.borderJoinStyle,
                lineWidth: f.borderWidth,
                strokeStyle: f.borderColor,
                textAlign: n,
                pointStyle: a,
                borderRadius: o && (r || f.borderRadius),
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
      if (J(a[t])) {
        const { key: l = "value" } = this._parsing;
        i = (d) => +le(a[d], l);
      }
      let o, r;
      for (o = t, r = t + s; o < r; ++o)
        n._parsed[o] = i(o);
    }
  }
  _getRotation() {
    return Ht(this.options.rotation - 90);
  }
  _getCircumference() {
    return Ht(this.options.circumference);
  }
  _getRotationExtents() {
    let t = ft, s = -ft;
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
    const s = this.chart, { chartArea: a } = s, n = this._cachedMeta, i = n.data, o = this.getMaxBorderWidth() + this.getMaxOffset(i) + this.options.spacing, r = Math.max((Math.min(a.width, a.height) - o) / 2, 0), l = Math.min(So(this.options.cutout, r), 1), d = this._getRingWeight(this.index), { circumference: u, rotation: f } = this._getRotationExtents(), { ratioX: p, ratioY: g, offsetX: h, offsetY: b } = vl(f, u, l), v = (a.width - o) / p, m = (a.height - o) / g, _ = Math.max(Math.min(v, m) / 2, 0), k = Kn(this.options.radius, _), M = Math.max(k * l, 0), S = (k - M) / this._getVisibleDatasetWeightTotal();
    this.offsetX = h * k, this.offsetY = b * k, n.total = this.calculateTotal(), this.outerRadius = k - S * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - S * d, 0), this.updateElements(i, 0, i.length, t);
  }
  _circumference(t, s) {
    const a = this.options, n = this._cachedMeta, i = this._getCircumference();
    return s && a.animation.animateRotate || !this.chart.getDataVisibility(t) || n._parsed[t] === null || n.data[t].hidden ? 0 : this.calculateCircumference(n._parsed[t] * i / ft);
  }
  updateElements(t, s, a, n) {
    const i = n === "reset", o = this.chart, r = o.chartArea, d = o.options.animation, u = (r.left + r.right) / 2, f = (r.top + r.bottom) / 2, p = i && d.animateScale, g = p ? 0 : this.innerRadius, h = p ? 0 : this.outerRadius, { sharedOptions: b, includeOptions: v } = this._getSharedOptions(s, n);
    let m = this._getRotation(), _;
    for (_ = 0; _ < s; ++_)
      m += this._circumference(_, i);
    for (_ = s; _ < s + a; ++_) {
      const k = this._circumference(_, i), M = t[_], S = {
        x: u + this.offsetX,
        y: f + this.offsetY,
        startAngle: m,
        endAngle: m + k,
        circumference: k,
        outerRadius: h,
        innerRadius: g
      };
      v && (S.options = b || this.resolveDataElementOptions(_, M.active ? "active" : n)), m += k, this.updateElement(M, _, S, n);
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
    return s > 0 && !isNaN(t) ? ft * (Math.abs(t) / s) : 0;
  }
  getLabelAndValue(t) {
    const s = this._cachedMeta, a = this.chart, n = a.data.labels || [], i = ta(s._parsed[t], a.options.locale);
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
    return Math.max(G(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
class _l extends vs {
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
    let { start: r, count: l } = jo(s, n, o);
    this._drawStart = r, this._drawCount = l, Yo(s) && (r = 0, l = n.length), a._chart = this.chart, a._datasetIndex = this.index, a._decimated = !!i._decimated, a.points = n;
    const d = this.resolveDatasetElementOptions(t);
    this.options.showLine || (d.borderWidth = 0), d.segment = this.options.segment, this.updateElement(a, void 0, {
      animated: !o,
      options: d
    }, t), this.updateElements(n, r, l, t);
  }
  updateElements(t, s, a, n) {
    const i = n === "reset", { iScale: o, vScale: r, _stacked: l, _dataset: d } = this._cachedMeta, { sharedOptions: u, includeOptions: f } = this._getSharedOptions(s, n), p = o.axis, g = r.axis, { spanGaps: h, segment: b } = this.options, v = Ie(h) ? h : Number.POSITIVE_INFINITY, m = this.chart._animationsDisabled || i || n === "none", _ = s + a, k = t.length;
    let M = s > 0 && this.getParsed(s - 1);
    for (let S = 0; S < k; ++S) {
      const $ = t[S], A = m ? $ : {};
      if (S < s || S >= _) {
        A.skip = !0;
        continue;
      }
      const F = this.getParsed(S), E = ot(F[g]), I = A[p] = o.getPixelForValue(F[p], S), C = A[g] = i || E ? r.getBasePixel() : r.getPixelForValue(l ? this.applyStack(r, F, l) : F[g], S);
      A.skip = isNaN(I) || isNaN(C) || E, A.stop = S > 0 && Math.abs(F[p] - M[p]) > v, b && (A.parsed = F, A.raw = d.data[S]), f && (A.options = u || this.resolveDataElementOptions(S, $.active ? "active" : n)), m || this.updateElement($, S, A, n), M = F;
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
class yl extends ml {
  static id = "pie";
  static defaults = {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: "100%"
  };
}
function se() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class ra {
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
    Object.assign(ra.prototype, t);
  }
  options;
  constructor(t) {
    this.options = t || {};
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return se();
  }
  parse() {
    return se();
  }
  format() {
    return se();
  }
  add() {
    return se();
  }
  diff() {
    return se();
  }
  startOf() {
    return se();
  }
  endOf() {
    return se();
  }
}
var xl = {
  _date: ra
};
function kl(e, t, s, a) {
  const { controller: n, data: i, _sorted: o } = e, r = n._cachedMeta.iScale, l = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (r && t === r.axis && t !== "r" && o && i.length) {
    const d = r._reversePixels ? zo : ie;
    if (a) {
      if (n._sharedOptions) {
        const u = i[0], f = typeof u.getRange == "function" && u.getRange(t);
        if (f) {
          const p = d(i, t, s - f), g = d(i, t, s + f);
          return {
            lo: p.lo,
            hi: g.hi
          };
        }
      }
    } else {
      const u = d(i, t, s);
      if (l) {
        const { vScale: f } = n._cachedMeta, { _parsed: p } = e, g = p.slice(0, u.lo + 1).reverse().findIndex((b) => !ot(b[f.axis]));
        u.lo -= Math.max(0, g);
        const h = p.slice(u.hi).findIndex((b) => !ot(b[f.axis]));
        u.hi += Math.max(0, h);
      }
      return u;
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
    const { index: d, data: u } = i[r], { lo: f, hi: p } = kl(i[r], t, o, n);
    for (let g = f; g <= p; ++g) {
      const h = u[g];
      h.skip || a(h, d, g);
    }
  }
}
function Ml(e) {
  const t = e.indexOf("x") !== -1, s = e.indexOf("y") !== -1;
  return function(a, n) {
    const i = t ? Math.abs(a.x - n.x) : 0, o = s ? Math.abs(a.y - n.y) : 0;
    return Math.sqrt(Math.pow(i, 2) + Math.pow(o, 2));
  };
}
function Ts(e, t, s, a, n) {
  const i = [];
  return !n && !e.isPointInArea(t) || ms(e, s, t, function(r, l, d) {
    !n && !Ne(r, e.chartArea, 0) || r.inRange(t.x, t.y, a) && i.push({
      element: r,
      datasetIndex: l,
      index: d
    });
  }, !0), i;
}
function Sl(e, t, s, a) {
  let n = [];
  function i(o, r, l) {
    const { startAngle: d, endAngle: u } = o.getProps([
      "startAngle",
      "endAngle"
    ], a), { angle: f } = Zn(o, {
      x: t.x,
      y: t.y
    });
    ze(f, d, u) && n.push({
      element: o,
      datasetIndex: r,
      index: l
    });
  }
  return ms(e, s, t, i), n;
}
function wl(e, t, s, a, n, i) {
  let o = [];
  const r = Ml(s);
  let l = Number.POSITIVE_INFINITY;
  function d(u, f, p) {
    const g = u.inRange(t.x, t.y, n);
    if (a && !g)
      return;
    const h = u.getCenterPoint(n);
    if (!(!!i || e.isPointInArea(h)) && !g)
      return;
    const v = r(t, h);
    v < l ? (o = [
      {
        element: u,
        datasetIndex: f,
        index: p
      }
    ], l = v) : v === l && o.push({
      element: u,
      datasetIndex: f,
      index: p
    });
  }
  return ms(e, s, t, d), o;
}
function Bs(e, t, s, a, n, i) {
  return !i && !e.isPointInArea(t) ? [] : s === "r" && !a ? Sl(e, t, s, n) : wl(e, t, s, a, n, i);
}
function Ua(e, t, s, a, n) {
  const i = [], o = s === "x" ? "inXRange" : "inYRange";
  let r = !1;
  return ms(e, s, t, (l, d, u) => {
    l[o] && l[o](t[s], n) && (i.push({
      element: l,
      datasetIndex: d,
      index: u
    }), r = r || l.inRange(t.x, t.y, n));
  }), a && !r ? [] : i;
}
var $l = {
  modes: {
    index(e, t, s, a) {
      const n = ae(t, e), i = s.axis || "x", o = s.includeInvisible || !1, r = s.intersect ? Ts(e, n, i, a, o) : Bs(e, n, i, !1, a, o), l = [];
      return r.length ? (e.getSortedVisibleDatasetMetas().forEach((d) => {
        const u = r[0].index, f = d.data[u];
        f && !f.skip && l.push({
          element: f,
          datasetIndex: d.index,
          index: u
        });
      }), l) : [];
    },
    dataset(e, t, s, a) {
      const n = ae(t, e), i = s.axis || "xy", o = s.includeInvisible || !1;
      let r = s.intersect ? Ts(e, n, i, a, o) : Bs(e, n, i, !1, a, o);
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
      const n = ae(t, e), i = s.axis || "xy", o = s.includeInvisible || !1;
      return Ts(e, n, i, a, o);
    },
    nearest(e, t, s, a) {
      const n = ae(t, e), i = s.axis || "xy", o = s.includeInvisible || !1;
      return Bs(e, n, i, s.intersect, a, o);
    },
    x(e, t, s, a) {
      const n = ae(t, e);
      return Ua(e, n, "x", s.intersect, a);
    },
    y(e, t, s, a) {
      const n = ae(t, e);
      return Ua(e, n, "y", s.intersect, a);
    }
  }
};
const _i = [
  "left",
  "top",
  "right",
  "bottom"
];
function ke(e, t) {
  return e.filter((s) => s.pos === t);
}
function Ka(e, t) {
  return e.filter((s) => _i.indexOf(s.pos) === -1 && s.box.axis === t);
}
function Me(e, t) {
  return e.sort((s, a) => {
    const n = t ? a : s, i = t ? s : a;
    return n.weight === i.weight ? n.index - i.index : n.weight - i.weight;
  });
}
function Cl(e) {
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
function Dl(e) {
  const t = {};
  for (const s of e) {
    const { stack: a, pos: n, stackWeight: i } = s;
    if (!a || !_i.includes(n))
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
function Al(e, t) {
  const s = Dl(e), { vBoxMaxWidth: a, hBoxMaxHeight: n } = t;
  let i, o, r;
  for (i = 0, o = e.length; i < o; ++i) {
    r = e[i];
    const { fullSize: l } = r.box, d = s[r.stack], u = d && r.stackWeight / d.weight;
    r.horizontal ? (r.width = u ? u * a : l && t.availableWidth, r.height = n) : (r.width = a, r.height = u ? u * n : l && t.availableHeight);
  }
  return s;
}
function Tl(e) {
  const t = Cl(e), s = Me(t.filter((d) => d.box.fullSize), !0), a = Me(ke(t, "left"), !0), n = Me(ke(t, "right")), i = Me(ke(t, "top"), !0), o = Me(ke(t, "bottom")), r = Ka(t, "x"), l = Ka(t, "y");
  return {
    fullSize: s,
    leftAndTop: a.concat(i),
    rightAndBottom: n.concat(l).concat(o).concat(r),
    chartArea: ke(t, "chartArea"),
    vertical: a.concat(n).concat(l),
    horizontal: i.concat(o).concat(r)
  };
}
function Xa(e, t, s, a) {
  return Math.max(e[s], t[s]) + Math.max(e[a], t[a]);
}
function yi(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function Bl(e, t, s, a) {
  const { pos: n, box: i } = s, o = e.maxPadding;
  if (!J(n)) {
    s.size && (e[n] -= s.size);
    const f = a[s.stack] || {
      size: 0,
      count: 1
    };
    f.size = Math.max(f.size, s.horizontal ? i.height : i.width), s.size = f.size / f.count, e[n] += s.size;
  }
  i.getPadding && yi(o, i.getPadding());
  const r = Math.max(0, t.outerWidth - Xa(o, e, "left", "right")), l = Math.max(0, t.outerHeight - Xa(o, e, "top", "bottom")), d = r !== e.w, u = l !== e.h;
  return e.w = r, e.h = l, s.horizontal ? {
    same: d,
    other: u
  } : {
    same: u,
    other: d
  };
}
function Fl(e) {
  const t = e.maxPadding;
  function s(a) {
    const n = Math.max(t[a] - e[a], 0);
    return e[a] += n, n;
  }
  e.y += s("top"), e.x += s("left"), s("right"), s("bottom");
}
function Pl(e, t) {
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
function De(e, t, s, a) {
  const n = [];
  let i, o, r, l, d, u;
  for (i = 0, o = e.length, d = 0; i < o; ++i) {
    r = e[i], l = r.box, l.update(r.width || t.w, r.height || t.h, Pl(r.horizontal, t));
    const { same: f, other: p } = Bl(t, s, r, a);
    d |= f && n.length, u = u || p, l.fullSize || n.push(r);
  }
  return d && De(n, t, s, a) || u;
}
function Qe(e, t, s, a, n) {
  e.top = s, e.left = t, e.right = t + a, e.bottom = s + n, e.width = a, e.height = n;
}
function Ga(e, t, s, a) {
  const n = s.padding;
  let { x: i, y: o } = t;
  for (const r of e) {
    const l = r.box, d = a[r.stack] || {
      placed: 0,
      weight: 1
    }, u = r.stackWeight / d.weight || 1;
    if (r.horizontal) {
      const f = t.w * u, p = d.size || l.height;
      Re(d.start) && (o = d.start), l.fullSize ? Qe(l, n.left, o, s.outerWidth - n.right - n.left, p) : Qe(l, t.left + d.placed, o, f, p), d.start = o, d.placed += f, o = l.bottom;
    } else {
      const f = t.h * u, p = d.size || l.width;
      Re(d.start) && (i = d.start), l.fullSize ? Qe(l, i, n.top, p, s.outerHeight - n.bottom - n.top) : Qe(l, i, t.top + d.placed, p, f), d.start = i, d.placed += f, i = l.right;
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
  update(e, t, s, a) {
    if (!e)
      return;
    const n = Pt(e.options.layout.padding), i = Math.max(t - n.width, 0), o = Math.max(s - n.height, 0), r = Tl(e.boxes), l = r.vertical, d = r.horizontal;
    rt(e.boxes, (b) => {
      typeof b.beforeLayout == "function" && b.beforeLayout();
    });
    const u = l.reduce((b, v) => v.box.options && v.box.options.display === !1 ? b : b + 1, 0) || 1, f = Object.freeze({
      outerWidth: t,
      outerHeight: s,
      padding: n,
      availableWidth: i,
      availableHeight: o,
      vBoxMaxWidth: i / 2 / u,
      hBoxMaxHeight: o / 2
    }), p = Object.assign({}, n);
    yi(p, Pt(a));
    const g = Object.assign({
      maxPadding: p,
      w: i,
      h: o,
      x: n.left,
      y: n.top
    }, n), h = Al(l.concat(d), f);
    De(r.fullSize, g, f, h), De(l, g, f, h), De(d, g, f, h) && De(l, g, f, h), Fl(g), Ga(r.leftAndTop, g, f, h), g.x += g.w, g.y += g.h, Ga(r.rightAndBottom, g, f, h), e.chartArea = {
      left: g.left,
      top: g.top,
      right: g.left + g.w,
      bottom: g.top + g.h,
      height: g.h,
      width: g.w
    }, rt(r.chartArea, (b) => {
      const v = b.box;
      Object.assign(v, e.chartArea), v.update(g.w, g.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class xi {
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
class Ll extends xi {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const ns = "$chartjs", El = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, Za = (e) => e === null || e === "";
function Ol(e, t) {
  const s = e.style, a = e.getAttribute("height"), n = e.getAttribute("width");
  if (e[ns] = {
    initial: {
      height: a,
      width: n,
      style: {
        display: s.display,
        height: s.height,
        width: s.width
      }
    }
  }, s.display = s.display || "block", s.boxSizing = s.boxSizing || "border-box", Za(n)) {
    const i = La(e, "width");
    i !== void 0 && (e.width = i);
  }
  if (Za(a))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const i = La(e, "height");
      i !== void 0 && (e.height = i);
    }
  return e;
}
const ki = Lr ? {
  passive: !0
} : !1;
function Rl(e, t, s) {
  e && e.addEventListener(t, s, ki);
}
function Il(e, t, s) {
  e && e.canvas && e.canvas.removeEventListener(t, s, ki);
}
function zl(e, t) {
  const s = El[e.type] || e.type, { x: a, y: n } = ae(e, t);
  return {
    type: s,
    chart: t,
    native: e,
    x: a !== void 0 ? a : null,
    y: n !== void 0 ? n : null
  };
}
function us(e, t) {
  for (const s of e)
    if (s === t || s.contains(t))
      return !0;
}
function Nl(e, t, s) {
  const a = e.canvas, n = new MutationObserver((i) => {
    let o = !1;
    for (const r of i)
      o = o || us(r.addedNodes, a), o = o && !us(r.removedNodes, a);
    o && s();
  });
  return n.observe(document, {
    childList: !0,
    subtree: !0
  }), n;
}
function Wl(e, t, s) {
  const a = e.canvas, n = new MutationObserver((i) => {
    let o = !1;
    for (const r of i)
      o = o || us(r.removedNodes, a), o = o && !us(r.addedNodes, a);
    o && s();
  });
  return n.observe(document, {
    childList: !0,
    subtree: !0
  }), n;
}
const He = /* @__PURE__ */ new Map();
let Qa = 0;
function Mi() {
  const e = window.devicePixelRatio;
  e !== Qa && (Qa = e, He.forEach((t, s) => {
    s.currentDevicePixelRatio !== e && t();
  }));
}
function Hl(e, t) {
  He.size || window.addEventListener("resize", Mi), He.set(e, t);
}
function Vl(e) {
  He.delete(e), He.size || window.removeEventListener("resize", Mi);
}
function jl(e, t, s) {
  const a = e.canvas, n = a && oa(a);
  if (!n)
    return;
  const i = ei((r, l) => {
    const d = n.clientWidth;
    s(r, l), d < n.clientWidth && s();
  }, window), o = new ResizeObserver((r) => {
    const l = r[0], d = l.contentRect.width, u = l.contentRect.height;
    d === 0 && u === 0 || i(d, u);
  });
  return o.observe(n), Hl(e, i), o;
}
function Fs(e, t, s) {
  s && s.disconnect(), t === "resize" && Vl(e);
}
function Yl(e, t, s) {
  const a = e.canvas, n = ei((i) => {
    e.ctx !== null && s(zl(i, e));
  }, e);
  return Rl(a, t, n), n;
}
class ql extends xi {
  acquireContext(t, s) {
    const a = t && t.getContext && t.getContext("2d");
    return a && a.canvas === t ? (Ol(t, s), a) : null;
  }
  releaseContext(t) {
    const s = t.canvas;
    if (!s[ns])
      return !1;
    const a = s[ns].initial;
    [
      "height",
      "width"
    ].forEach((i) => {
      const o = a[i];
      ot(o) ? s.removeAttribute(i) : s.setAttribute(i, o);
    });
    const n = a.style || {};
    return Object.keys(n).forEach((i) => {
      s.style[i] = n[i];
    }), s.width = s.width, delete s[ns], !0;
  }
  addEventListener(t, s, a) {
    this.removeEventListener(t, s);
    const n = t.$proxies || (t.$proxies = {}), o = {
      attach: Nl,
      detach: Wl,
      resize: jl
    }[s] || Yl;
    n[s] = o(t, s, a);
  }
  removeEventListener(t, s) {
    const a = t.$proxies || (t.$proxies = {}), n = a[s];
    if (!n)
      return;
    ({
      attach: Fs,
      detach: Fs,
      resize: Fs
    }[s] || Il)(t, s, n), a[s] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, s, a, n) {
    return Pr(t, s, a, n);
  }
  isAttached(t) {
    const s = t && oa(t);
    return !!(s && s.isConnected);
  }
}
function Ul(e) {
  return !ia() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? Ll : ql;
}
class Yt {
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
    return Ie(this.x) && Ie(this.y);
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
function Kl(e, t) {
  const s = e.options.ticks, a = Xl(e), n = Math.min(s.maxTicksLimit || a, a), i = s.major.enabled ? Zl(t) : [], o = i.length, r = i[0], l = i[o - 1], d = [];
  if (o > n)
    return Ql(t, d, i, o / n), d;
  const u = Gl(i, t, n);
  if (o > 0) {
    let f, p;
    const g = o > 1 ? Math.round((l - r) / (o - 1)) : null;
    for (Je(t, d, u, ot(g) ? 0 : r - g, r), f = 0, p = o - 1; f < p; f++)
      Je(t, d, u, i[f], i[f + 1]);
    return Je(t, d, u, l, ot(g) ? t.length : l + g), d;
  }
  return Je(t, d, u), d;
}
function Xl(e) {
  const t = e.options.offset, s = e._tickSize(), a = e._length / s + (t ? 0 : 1), n = e._maxLength / s;
  return Math.floor(Math.min(a, n));
}
function Gl(e, t, s) {
  const a = Jl(e), n = t.length / s;
  if (!a)
    return Math.max(n, 1);
  const i = Fo(a);
  for (let o = 0, r = i.length - 1; o < r; o++) {
    const l = i[o];
    if (l > n)
      return l;
  }
  return Math.max(n, 1);
}
function Zl(e) {
  const t = [];
  let s, a;
  for (s = 0, a = e.length; s < a; s++)
    e[s].major && t.push(s);
  return t;
}
function Ql(e, t, s, a) {
  let n = 0, i = s[0], o;
  for (a = Math.ceil(a), o = 0; o < e.length; o++)
    o === i && (t.push(e[o]), n++, i = s[n * a]);
}
function Je(e, t, s, a, n) {
  const i = G(a, 0), o = Math.min(G(n, e.length), e.length);
  let r = 0, l, d, u;
  for (s = Math.ceil(s), n && (l = n - a, s = l / Math.floor(l / s)), u = i; u < 0; )
    r++, u = Math.round(i + r * s);
  for (d = Math.max(i, 0); d < o; d++)
    d === u && (t.push(e[d]), r++, u = Math.round(i + r * s));
}
function Jl(e) {
  const t = e.length;
  let s, a;
  if (t < 2)
    return !1;
  for (a = e[0], s = 1; s < t; ++s)
    if (e[s] - e[s - 1] !== a)
      return !1;
  return a;
}
const tc = (e) => e === "left" ? "right" : e === "right" ? "left" : e, Ja = (e, t, s) => t === "top" || t === "left" ? e[t] + s : e[t] - s, tn = (e, t) => Math.min(t || e, e);
function en(e, t) {
  const s = [], a = e.length / t, n = e.length;
  let i = 0;
  for (; i < n; i += a)
    s.push(e[Math.floor(i)]);
  return s;
}
function ec(e, t, s) {
  const a = e.ticks.length, n = Math.min(t, a - 1), i = e._startPixel, o = e._endPixel, r = 1e-6;
  let l = e.getPixelForTick(n), d;
  if (!(s && (a === 1 ? d = Math.max(l - i, o - l) : t === 0 ? d = (e.getPixelForTick(1) - l) / 2 : d = (l - e.getPixelForTick(n - 1)) / 2, l += n < t ? d : -d, l < i - r || l > o + r)))
    return l;
}
function sc(e, t) {
  rt(e, (s) => {
    const a = s.gc, n = a.length / 2;
    let i;
    if (n > t) {
      for (i = 0; i < n; ++i)
        delete s.data[a[i]];
      a.splice(0, n);
    }
  });
}
function Se(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function sn(e, t) {
  if (!e.display)
    return 0;
  const s = kt(e.font, t), a = Pt(e.padding);
  return (vt(e.text) ? e.text.length : 1) * s.lineHeight + a.height;
}
function ac(e, t) {
  return de(e, {
    scale: t,
    type: "scale"
  });
}
function nc(e, t, s) {
  return de(e, {
    tick: s,
    index: t,
    type: "tick"
  });
}
function ic(e, t, s) {
  let a = Qs(e);
  return (s && t !== "right" || !s && t === "right") && (a = tc(a)), a;
}
function oc(e, t, s, a) {
  const { top: n, left: i, bottom: o, right: r, chart: l } = e, { chartArea: d, scales: u } = l;
  let f = 0, p, g, h;
  const b = o - n, v = r - i;
  if (e.isHorizontal()) {
    if (g = yt(a, i, r), J(s)) {
      const m = Object.keys(s)[0], _ = s[m];
      h = u[m].getPixelForValue(_) + b - t;
    } else s === "center" ? h = (d.bottom + d.top) / 2 + b - t : h = Ja(e, s, t);
    p = r - i;
  } else {
    if (J(s)) {
      const m = Object.keys(s)[0], _ = s[m];
      g = u[m].getPixelForValue(_) - v + t;
    } else s === "center" ? g = (d.left + d.right) / 2 - v + t : g = Ja(e, s, t);
    h = yt(a, o, n), f = s === "left" ? -mt : mt;
  }
  return {
    titleX: g,
    titleY: h,
    maxWidth: p,
    rotation: f
  };
}
class me extends Yt {
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
    return t = Lt(t, Number.POSITIVE_INFINITY), s = Lt(s, Number.NEGATIVE_INFINITY), a = Lt(a, Number.POSITIVE_INFINITY), n = Lt(n, Number.NEGATIVE_INFINITY), {
      min: Lt(t, a),
      max: Lt(s, n),
      minDefined: St(t),
      maxDefined: St(s)
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
      min: Lt(s, Lt(a, s)),
      max: Lt(a, Lt(s, a))
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
    ht(this.options.beforeUpdate, [
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
    }, a), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + a.left + a.right : this.height + a.top + a.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = ur(this, i, n), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const l = r < this.ticks.length;
    this._convertTicksToLabels(l ? en(this.ticks, r) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), o.display && (o.autoSkip || o.source === "auto") && (this.ticks = Kl(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), l && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, s, a;
    this.isHorizontal() ? (s = this.left, a = this.right) : (s = this.top, a = this.bottom, t = !t), this._startPixel = s, this._endPixel = a, this._reversePixels = t, this._length = a - s, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    ht(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    ht(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    ht(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), ht(this.options[t], [
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
    ht(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const s = this.options.ticks;
    let a, n, i;
    for (a = 0, n = t.length; a < n; a++)
      i = t[a], i.label = ht(s.callback, [
        i.value,
        a,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    ht(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    ht(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, s = t.ticks, a = tn(this.ticks.length, t.ticks.maxTicksLimit), n = s.minRotation || 0, i = s.maxRotation;
    let o = n, r, l, d;
    if (!this._isVisible() || !s.display || n >= i || a <= 1 || !this.isHorizontal()) {
      this.labelRotation = n;
      return;
    }
    const u = this._getLabelSizes(), f = u.widest.width, p = u.highest.height, g = xt(this.chart.width - f, 0, this.maxWidth);
    r = t.offset ? this.maxWidth / a : g / (a - 1), f + 6 > r && (r = g / (a - (t.offset ? 0.5 : 1)), l = this.maxHeight - Se(t.grid) - s.padding - sn(t.title, this.chart.options.font), d = Math.sqrt(f * f + p * p), o = Oo(Math.min(Math.asin(xt((u.highest.height + 6) / r, -1, 1)), Math.asin(xt(l / d, -1, 1)) - Math.asin(xt(p / d, -1, 1)))), o = Math.max(n, Math.min(i, o))), this.labelRotation = o;
  }
  afterCalculateLabelRotation() {
    ht(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    ht(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: s, options: { ticks: a, title: n, grid: i } } = this, o = this._isVisible(), r = this.isHorizontal();
    if (o) {
      const l = sn(n, s.options.font);
      if (r ? (t.width = this.maxWidth, t.height = Se(i) + l) : (t.height = this.maxHeight, t.width = Se(i) + l), a.display && this.ticks.length) {
        const { first: d, last: u, widest: f, highest: p } = this._getLabelSizes(), g = a.padding * 2, h = Ht(this.labelRotation), b = Math.cos(h), v = Math.sin(h);
        if (r) {
          const m = a.mirror ? 0 : v * f.width + b * p.height;
          t.height = Math.min(this.maxHeight, t.height + m + g);
        } else {
          const m = a.mirror ? 0 : b * f.width + v * p.height;
          t.width = Math.min(this.maxWidth, t.width + m + g);
        }
        this._calculatePadding(d, u, v, b);
      }
    }
    this._handleMargins(), r ? (this.width = this._length = s.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = s.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, s, a, n) {
    const { ticks: { align: i, padding: o }, position: r } = this.options, l = this.labelRotation !== 0, d = r !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const u = this.getPixelForTick(0) - this.left, f = this.right - this.getPixelForTick(this.ticks.length - 1);
      let p = 0, g = 0;
      l ? d ? (p = n * t.width, g = a * s.height) : (p = a * t.height, g = n * s.width) : i === "start" ? g = s.width : i === "end" ? p = t.width : i !== "inner" && (p = t.width / 2, g = s.width / 2), this.paddingLeft = Math.max((p - u + o) * this.width / (this.width - u), 0), this.paddingRight = Math.max((g - f + o) * this.width / (this.width - f), 0);
    } else {
      let u = s.height / 2, f = t.height / 2;
      i === "start" ? (u = 0, f = t.height) : i === "end" && (u = s.height, f = 0), this.paddingTop = u + o, this.paddingBottom = f + o;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    ht(this.options.afterFit, [
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
      ot(t[s].label) && (t.splice(s, 1), a--, s--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const s = this.options.ticks.sampleSize;
      let a = this.ticks;
      s < a.length && (a = en(a, s)), this._labelSizes = t = this._computeLabelSizes(a, a.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, s, a) {
    const { ctx: n, _longestTextCache: i } = this, o = [], r = [], l = Math.floor(s / tn(s, a));
    let d = 0, u = 0, f, p, g, h, b, v, m, _, k, M, S;
    for (f = 0; f < s; f += l) {
      if (h = t[f].label, b = this._resolveTickFontOptions(f), n.font = v = b.string, m = i[v] = i[v] || {
        data: {},
        gc: []
      }, _ = b.lineHeight, k = M = 0, !ot(h) && !vt(h))
        k = Aa(n, m.data, m.gc, k, h), M = _;
      else if (vt(h))
        for (p = 0, g = h.length; p < g; ++p)
          S = h[p], !ot(S) && !vt(S) && (k = Aa(n, m.data, m.gc, k, S), M += _);
      o.push(k), r.push(M), d = Math.max(k, d), u = Math.max(M, u);
    }
    sc(i, s);
    const $ = o.indexOf(d), A = r.indexOf(u), F = (E) => ({
      width: o[E] || 0,
      height: r[E] || 0
    });
    return {
      first: F(0),
      last: F(s - 1),
      widest: F($),
      highest: F(A),
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
    return Io(this._alignToPixels ? ee(this.chart, s, 0) : s);
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
      return a.$context || (a.$context = nc(this.getContext(), t, a));
    }
    return this.$context || (this.$context = ac(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, s = Ht(this.labelRotation), a = Math.abs(Math.cos(s)), n = Math.abs(Math.sin(s)), i = this._getLabelSizes(), o = t.autoSkipPadding || 0, r = i ? i.widest.width + o : 0, l = i ? i.highest.height + o : 0;
    return this.isHorizontal() ? l * a > r * n ? r / a : l / n : l * n < r * a ? l / a : r / n;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const s = this.axis, a = this.chart, n = this.options, { grid: i, position: o, border: r } = n, l = i.offset, d = this.isHorizontal(), f = this.ticks.length + (l ? 1 : 0), p = Se(i), g = [], h = r.setContext(this.getContext()), b = h.display ? h.width : 0, v = b / 2, m = function(V) {
      return ee(a, V, b);
    };
    let _, k, M, S, $, A, F, E, I, C, T, L;
    if (o === "top")
      _ = m(this.bottom), A = this.bottom - p, E = _ - v, C = m(t.top) + v, L = t.bottom;
    else if (o === "bottom")
      _ = m(this.top), C = t.top, L = m(t.bottom) - v, A = _ + v, E = this.top + p;
    else if (o === "left")
      _ = m(this.right), $ = this.right - p, F = _ - v, I = m(t.left) + v, T = t.right;
    else if (o === "right")
      _ = m(this.left), I = t.left, T = m(t.right) - v, $ = _ + v, F = this.left + p;
    else if (s === "x") {
      if (o === "center")
        _ = m((t.top + t.bottom) / 2 + 0.5);
      else if (J(o)) {
        const V = Object.keys(o)[0], K = o[V];
        _ = m(this.chart.scales[V].getPixelForValue(K));
      }
      C = t.top, L = t.bottom, A = _ + v, E = A + p;
    } else if (s === "y") {
      if (o === "center")
        _ = m((t.left + t.right) / 2);
      else if (J(o)) {
        const V = Object.keys(o)[0], K = o[V];
        _ = m(this.chart.scales[V].getPixelForValue(K));
      }
      $ = _ - v, F = $ - p, I = t.left, T = t.right;
    }
    const P = G(n.ticks.maxTicksLimit, f), R = Math.max(1, Math.ceil(f / P));
    for (k = 0; k < f; k += R) {
      const V = this.getContext(k), K = i.setContext(V), H = r.setContext(V), z = K.lineWidth, O = K.color, X = H.dash || [], nt = H.dashOffset, et = K.tickWidth, dt = K.tickColor, bt = K.tickBorderDash || [], ct = K.tickBorderDashOffset;
      M = ec(this, k, l), M !== void 0 && (S = ee(a, M, z), d ? $ = F = I = T = S : A = E = C = L = S, g.push({
        tx1: $,
        ty1: A,
        tx2: F,
        ty2: E,
        x1: I,
        y1: C,
        x2: T,
        y2: L,
        width: z,
        color: O,
        borderDash: X,
        borderDashOffset: nt,
        tickWidth: et,
        tickColor: dt,
        tickBorderDash: bt,
        tickBorderDashOffset: ct
      }));
    }
    return this._ticksLength = f, this._borderValue = _, g;
  }
  _computeLabelItems(t) {
    const s = this.axis, a = this.options, { position: n, ticks: i } = a, o = this.isHorizontal(), r = this.ticks, { align: l, crossAlign: d, padding: u, mirror: f } = i, p = Se(a.grid), g = p + u, h = f ? -u : g, b = -Ht(this.labelRotation), v = [];
    let m, _, k, M, S, $, A, F, E, I, C, T, L = "middle";
    if (n === "top")
      $ = this.bottom - h, A = this._getXAxisLabelAlignment();
    else if (n === "bottom")
      $ = this.top + h, A = this._getXAxisLabelAlignment();
    else if (n === "left") {
      const R = this._getYAxisLabelAlignment(p);
      A = R.textAlign, S = R.x;
    } else if (n === "right") {
      const R = this._getYAxisLabelAlignment(p);
      A = R.textAlign, S = R.x;
    } else if (s === "x") {
      if (n === "center")
        $ = (t.top + t.bottom) / 2 + g;
      else if (J(n)) {
        const R = Object.keys(n)[0], V = n[R];
        $ = this.chart.scales[R].getPixelForValue(V) + g;
      }
      A = this._getXAxisLabelAlignment();
    } else if (s === "y") {
      if (n === "center")
        S = (t.left + t.right) / 2 - g;
      else if (J(n)) {
        const R = Object.keys(n)[0], V = n[R];
        S = this.chart.scales[R].getPixelForValue(V);
      }
      A = this._getYAxisLabelAlignment(p).textAlign;
    }
    s === "y" && (l === "start" ? L = "top" : l === "end" && (L = "bottom"));
    const P = this._getLabelSizes();
    for (m = 0, _ = r.length; m < _; ++m) {
      k = r[m], M = k.label;
      const R = i.setContext(this.getContext(m));
      F = this.getPixelForTick(m) + i.labelOffset, E = this._resolveTickFontOptions(m), I = E.lineHeight, C = vt(M) ? M.length : 1;
      const V = C / 2, K = R.color, H = R.textStrokeColor, z = R.textStrokeWidth;
      let O = A;
      o ? (S = F, A === "inner" && (m === _ - 1 ? O = this.options.reverse ? "left" : "right" : m === 0 ? O = this.options.reverse ? "right" : "left" : O = "center"), n === "top" ? d === "near" || b !== 0 ? T = -C * I + I / 2 : d === "center" ? T = -P.highest.height / 2 - V * I + I : T = -P.highest.height + I / 2 : d === "near" || b !== 0 ? T = I / 2 : d === "center" ? T = P.highest.height / 2 - V * I : T = P.highest.height - C * I, f && (T *= -1), b !== 0 && !R.showLabelBackdrop && (S += I / 2 * Math.sin(b))) : ($ = F, T = (1 - C) * I / 2);
      let X;
      if (R.showLabelBackdrop) {
        const nt = Pt(R.backdropPadding), et = P.heights[m], dt = P.widths[m];
        let bt = T - nt.top, ct = 0 - nt.left;
        switch (L) {
          case "middle":
            bt -= et / 2;
            break;
          case "bottom":
            bt -= et;
            break;
        }
        switch (A) {
          case "center":
            ct -= dt / 2;
            break;
          case "right":
            ct -= dt;
            break;
          case "inner":
            m === _ - 1 ? ct -= dt : m > 0 && (ct -= dt / 2);
            break;
        }
        X = {
          left: ct,
          top: bt,
          width: dt + nt.width,
          height: et + nt.height,
          color: R.backdropColor
        };
      }
      v.push({
        label: M,
        font: E,
        textOffset: T,
        options: {
          rotation: b,
          color: K,
          strokeColor: H,
          strokeWidth: z,
          textAlign: O,
          textBaseline: L,
          translation: [
            S,
            $
          ],
          backdrop: X
        }
      });
    }
    return v;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: s } = this.options;
    if (-Ht(this.labelRotation))
      return t === "top" ? "left" : "right";
    let n = "center";
    return s.align === "start" ? n = "left" : s.align === "end" ? n = "right" : s.align === "inner" && (n = "inner"), n;
  }
  _getYAxisLabelAlignment(t) {
    const { position: s, ticks: { crossAlign: a, mirror: n, padding: i } } = this.options, o = this._getLabelSizes(), r = t + i, l = o.widest.width;
    let d, u;
    return s === "left" ? n ? (u = this.right + i, a === "near" ? d = "left" : a === "center" ? (d = "center", u += l / 2) : (d = "right", u += l)) : (u = this.right - r, a === "near" ? d = "right" : a === "center" ? (d = "center", u -= l / 2) : (d = "left", u = this.left)) : s === "right" ? n ? (u = this.left + i, a === "near" ? d = "right" : a === "center" ? (d = "center", u -= l / 2) : (d = "left", u -= l)) : (u = this.left + r, a === "near" ? d = "left" : a === "center" ? (d = "center", u += l / 2) : (d = "right", u = this.right)) : d = "right", {
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
    const r = (l, d, u) => {
      !u.width || !u.color || (a.save(), a.lineWidth = u.width, a.strokeStyle = u.color, a.setLineDash(u.borderDash || []), a.lineDashOffset = u.borderDashOffset, a.beginPath(), a.moveTo(l.x, l.y), a.lineTo(d.x, d.y), a.stroke(), a.restore());
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
    let d, u, f, p;
    this.isHorizontal() ? (d = ee(t, this.left, o) - o / 2, u = ee(t, this.right, r) + r / 2, f = p = l) : (f = ee(t, this.top, o) - o / 2, p = ee(t, this.bottom, r) + r / 2, d = u = l), s.save(), s.lineWidth = i.width, s.strokeStyle = i.color, s.beginPath(), s.moveTo(d, f), s.lineTo(u, p), s.stroke(), s.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const a = this.ctx, n = this._computeLabelArea();
    n && gs(a, n);
    const i = this.getLabelItems(t);
    for (const o of i) {
      const r = o.options, l = o.font, d = o.label, u = o.textOffset;
      We(a, d, 0, u, l, r);
    }
    n && ps(a);
  }
  drawTitle() {
    const { ctx: t, options: { position: s, title: a, reverse: n } } = this;
    if (!a.display)
      return;
    const i = kt(a.font), o = Pt(a.padding), r = a.align;
    let l = i.lineHeight / 2;
    s === "bottom" || s === "center" || J(s) ? (l += o.bottom, vt(a.text) && (l += i.lineHeight * (a.text.length - 1))) : l += o.top;
    const { titleX: d, titleY: u, maxWidth: f, rotation: p } = oc(this, l, s, r);
    We(t, a.text, 0, 0, i, {
      color: a.color,
      maxWidth: f,
      rotation: p,
      textAlign: ic(r, s, n),
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
    const t = this.options, s = t.ticks && t.ticks.z || 0, a = G(t.grid && t.grid.z, -1), n = G(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== me.prototype.draw ? [
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
    return kt(s.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class ts {
  constructor(t, s, a) {
    this.type = t, this.scope = s, this.override = a, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const s = Object.getPrototypeOf(t);
    let a;
    cc(s) && (a = this.register(s));
    const n = this.items, i = t.id, o = this.scope + "." + i;
    if (!i)
      throw new Error("class does not have id: " + t);
    return i in n || (n[i] = t, rc(t, o, a), this.override && pt.override(t.id, t.overrides)), o;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const s = this.items, a = t.id, n = this.scope;
    a in s && delete s[a], n && a in pt[n] && (delete pt[n][a], this.override && delete ce[a]);
  }
}
function rc(e, t, s) {
  const a = Oe(/* @__PURE__ */ Object.create(null), [
    s ? pt.get(s) : {},
    pt.get(t),
    e.defaults
  ]);
  pt.set(t, a), e.defaultRoutes && lc(t, e.defaultRoutes), e.descriptors && pt.describe(t, e.descriptors);
}
function lc(e, t) {
  Object.keys(t).forEach((s) => {
    const a = s.split("."), n = a.pop(), i = [
      e
    ].concat(a).join("."), o = t[s].split("."), r = o.pop(), l = o.join(".");
    pt.route(i, n, l, r);
  });
}
function cc(e) {
  return "id" in e && "defaults" in e;
}
class dc {
  constructor() {
    this.controllers = new ts(vs, "datasets", !0), this.elements = new ts(Yt, "elements"), this.plugins = new ts(Object, "plugins"), this.scales = new ts(me, "scales"), this._typedRegistries = [
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
      a || i.isForType(n) || i === this.plugins && n.id ? this._exec(t, i, n) : rt(n, (o) => {
        const r = a || this._getRegistryForType(o);
        this._exec(t, r, o);
      });
    });
  }
  _exec(t, s, a) {
    const n = Gs(t);
    ht(a["before" + n], [], a), s[t](a), ht(a["after" + n], [], a);
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
var Ot = /* @__PURE__ */ new dc();
class uc {
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
      if (ht(r, l, o) === !1 && n.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    ot(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const s = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), s;
  }
  _createDescriptors(t, s) {
    const a = t && t.config, n = G(a.options && a.options.plugins, {}), i = hc(a);
    return n === !1 && !s ? [] : gc(t, i, n, s);
  }
  _notifyStateChanges(t) {
    const s = this._oldCache || [], a = this._cache, n = (i, o) => i.filter((r) => !o.some((l) => r.plugin.id === l.plugin.id));
    this._notify(n(s, a), t, "stop"), this._notify(n(a, s), t, "start");
  }
}
function hc(e) {
  const t = {}, s = [], a = Object.keys(Ot.plugins.items);
  for (let i = 0; i < a.length; i++)
    s.push(Ot.getPlugin(a[i]));
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
function fc(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function gc(e, { plugins: t, localIds: s }, a, n) {
  const i = [], o = e.getContext();
  for (const r of t) {
    const l = r.id, d = fc(a[l], n);
    d !== null && i.push({
      plugin: r,
      options: pc(e.config, {
        plugin: r,
        local: s[l]
      }, d, o)
    });
  }
  return i;
}
function pc(e, { plugin: t, local: s }, a, n) {
  const i = e.pluginScopeKeys(t), o = e.getOptionScopes(a, i);
  return s && t.defaults && o.push(t.defaults), e.createResolver(o, n, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Vs(e, t) {
  const s = pt.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || s.indexAxis || "x";
}
function bc(e, t) {
  let s = e;
  return e === "_index_" ? s = t : e === "_value_" && (s = t === "x" ? "y" : "x"), s;
}
function vc(e, t) {
  return e === t ? "_index_" : "_value_";
}
function an(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function mc(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function js(e, ...t) {
  if (an(e))
    return e;
  for (const s of t) {
    const a = s.axis || mc(s.position) || e.length > 1 && an(e[0].toLowerCase());
    if (a)
      return a;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function nn(e, t, s) {
  if (s[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function _c(e, t) {
  if (t.data && t.data.datasets) {
    const s = t.data.datasets.filter((a) => a.xAxisID === e || a.yAxisID === e);
    if (s.length)
      return nn(e, "x", s[0]) || nn(e, "y", s[0]);
  }
  return {};
}
function yc(e, t) {
  const s = ce[e.type] || {
    scales: {}
  }, a = t.scales || {}, n = Vs(e.type, t), i = /* @__PURE__ */ Object.create(null);
  return Object.keys(a).forEach((o) => {
    const r = a[o];
    if (!J(r))
      return console.error(`Invalid scale configuration for scale: ${o}`);
    if (r._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${o}`);
    const l = js(o, r, _c(o, e), pt.scales[r.type]), d = vc(l, n), u = s.scales || {};
    i[o] = Te(/* @__PURE__ */ Object.create(null), [
      {
        axis: l
      },
      r,
      u[l],
      u[d]
    ]);
  }), e.data.datasets.forEach((o) => {
    const r = o.type || e.type, l = o.indexAxis || Vs(r, t), u = (ce[r] || {}).scales || {};
    Object.keys(u).forEach((f) => {
      const p = bc(f, l), g = o[p + "AxisID"] || p;
      i[g] = i[g] || /* @__PURE__ */ Object.create(null), Te(i[g], [
        {
          axis: p
        },
        a[g],
        u[f]
      ]);
    });
  }), Object.keys(i).forEach((o) => {
    const r = i[o];
    Te(r, [
      pt.scales[r.type],
      pt.scale
    ]);
  }), i;
}
function Si(e) {
  const t = e.options || (e.options = {});
  t.plugins = G(t.plugins, {}), t.scales = yc(e, t);
}
function wi(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function xc(e) {
  return e = e || {}, e.data = wi(e.data), Si(e), e;
}
const on = /* @__PURE__ */ new Map(), $i = /* @__PURE__ */ new Set();
function es(e, t) {
  let s = on.get(e);
  return s || (s = t(), on.set(e, s), $i.add(s)), s;
}
const we = (e, t, s) => {
  const a = le(t, s);
  a !== void 0 && e.add(a);
};
class kc {
  constructor(t) {
    this._config = xc(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = wi(t);
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
    this.clearCache(), Si(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return es(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, s) {
    return es(`${t}.transition.${s}`, () => [
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
    return es(`${t}-${s}`, () => [
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
    return es(`${a}-plugin-${s}`, () => [
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
    s.forEach((u) => {
      t && (l.add(t), u.forEach((f) => we(l, t, f))), u.forEach((f) => we(l, n, f)), u.forEach((f) => we(l, ce[i] || {}, f)), u.forEach((f) => we(l, pt, f)), u.forEach((f) => we(l, Ws, f));
    });
    const d = Array.from(l);
    return d.length === 0 && d.push(/* @__PURE__ */ Object.create(null)), $i.has(s) && o.set(s, d), d;
  }
  chartOptionScopes() {
    const { options: t, type: s } = this;
    return [
      t,
      ce[s] || {},
      pt.datasets[s] || {},
      {
        type: s
      },
      pt,
      Ws
    ];
  }
  resolveNamedOptions(t, s, a, n = [
    ""
  ]) {
    const i = {
      $shared: !0
    }, { resolver: o, subPrefixes: r } = rn(this._resolverCache, t, n);
    let l = o;
    if (Sc(o, s)) {
      i.$shared = !1, a = Gt(a) ? a() : a;
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
    const { resolver: i } = rn(this._resolverCache, t, a);
    return J(s) ? be(i, s, void 0, n) : i;
  }
}
function rn(e, t, s) {
  let a = e.get(t);
  a || (a = /* @__PURE__ */ new Map(), e.set(t, a));
  const n = s.join();
  let i = a.get(n);
  return i || (i = {
    resolver: sa(t, s),
    subPrefixes: s.filter((r) => !r.toLowerCase().includes("hover"))
  }, a.set(n, i)), i;
}
const Mc = (e) => J(e) && Object.getOwnPropertyNames(e).some((t) => Gt(e[t]));
function Sc(e, t) {
  const { isScriptable: s, isIndexable: a } = ii(e);
  for (const n of t) {
    const i = s(n), o = a(n), r = (o || i) && e[n];
    if (i && (Gt(r) || Mc(r)) || o && vt(r))
      return !0;
  }
  return !1;
}
var wc = "4.5.1";
const $c = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function ln(e, t) {
  return e === "top" || e === "bottom" || $c.indexOf(e) === -1 && t === "x";
}
function cn(e, t) {
  return function(s, a) {
    return s[e] === a[e] ? s[t] - a[t] : s[e] - a[e];
  };
}
function dn(e) {
  const t = e.chart, s = t.options.animation;
  t.notifyPlugins("afterRender"), ht(s && s.onComplete, [
    e
  ], t);
}
function Cc(e) {
  const t = e.chart, s = t.options.animation;
  ht(s && s.onProgress, [
    e
  ], t);
}
function Ci(e) {
  return ia() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const is = {}, un = (e) => {
  const t = Ci(e);
  return Object.values(is).filter((s) => s.canvas === t).pop();
};
function Dc(e, t, s) {
  const a = Object.keys(e);
  for (const n of a) {
    const i = +n;
    if (i >= t) {
      const o = e[n];
      delete e[n], (s > 0 || i > t) && (e[i + s] = o);
    }
  }
}
function Ac(e, t, s, a) {
  return !s || e.type === "mouseout" ? null : a ? t : e;
}
let _e = class {
  static defaults = pt;
  static instances = is;
  static overrides = ce;
  static registry = Ot;
  static version = wc;
  static getChart = un;
  static register(...t) {
    Ot.add(...t), hn();
  }
  static unregister(...t) {
    Ot.remove(...t), hn();
  }
  constructor(t, s) {
    const a = this.config = new kc(s), n = Ci(t), i = un(n);
    if (i)
      throw new Error("Canvas is already in use. Chart with ID '" + i.id + "' must be destroyed before the canvas with ID '" + i.canvas.id + "' can be reused.");
    const o = a.createResolver(a.chartOptionScopes(), this.getContext());
    this.platform = new (a.platform || Ul(n))(), this.platform.updateConfig(a);
    const r = this.platform.acquireContext(n, o.aspectRatio), l = r && r.canvas, d = l && l.height, u = l && l.width;
    if (this.id = Mo(), this.ctx = r, this.canvas = l, this.width = u, this.height = d, this._options = o, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new uc(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = Ho((f) => this.update(f), o.resizeDelay || 0), this._dataChanges = [], is[this.id] = this, !r || !l) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    zt.listen(this, "complete", dn), zt.listen(this, "progress", Cc), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: s }, width: a, height: n, _aspectRatio: i } = this;
    return ot(t) ? s && i ? i : n ? a / n : null : t;
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
    return Ot;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : Pa(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Ta(this.canvas, this.ctx), this;
  }
  stop() {
    return zt.stop(this), this;
  }
  resize(t, s) {
    zt.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: s
    } : this._resize(t, s);
  }
  _resize(t, s) {
    const a = this.options, n = this.canvas, i = a.maintainAspectRatio && this.aspectRatio, o = this.platform.getMaximumSize(n, t, s, i), r = a.devicePixelRatio || this.platform.getDevicePixelRatio(), l = this.width ? "resize" : "attach";
    this.width = o.width, this.height = o.height, this._aspectRatio = this.aspectRatio, Pa(this, r, !0) && (this.notifyPlugins("resize", {
      size: o
    }), ht(a.onResize, [
      this,
      o
    ], this), this.attached && this._doResize(l) && this.render());
  }
  ensureScalesHaveIDs() {
    const s = this.options.scales || {};
    rt(s, (a, n) => {
      a.id = n;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, s = t.scales, a = this.scales, n = Object.keys(a).reduce((o, r) => (o[r] = !1, o), {});
    let i = [];
    s && (i = i.concat(Object.keys(s).map((o) => {
      const r = s[o], l = js(o, r), d = l === "r", u = l === "x";
      return {
        options: r,
        dposition: d ? "chartArea" : u ? "bottom" : "left",
        dtype: d ? "radialLinear" : u ? "category" : "linear"
      };
    }))), rt(i, (o) => {
      const r = o.options, l = r.id, d = js(l, r), u = G(r.type, o.dtype);
      (r.position === void 0 || ln(r.position, d) !== ln(o.dposition)) && (r.position = o.dposition), n[l] = !0;
      let f = null;
      if (l in a && a[l].type === u)
        f = a[l];
      else {
        const p = Ot.getScale(u);
        f = new p({
          id: l,
          type: u,
          ctx: this.ctx,
          chart: this
        }), a[f.id] = f;
      }
      f.init(r, t);
    }), rt(n, (o, r) => {
      o || delete a[r];
    }), rt(a, (o) => {
      Ft.configure(this, o, o.options), Ft.addBox(this, o);
    });
  }
  _updateMetasets() {
    const t = this._metasets, s = this.data.datasets.length, a = t.length;
    if (t.sort((n, i) => n.index - i.index), a > s) {
      for (let n = s; n < a; ++n)
        this._destroyDatasetMeta(n);
      t.splice(s, a - s);
    }
    this._sortedMetasets = t.slice(0).sort(cn("order", "index"));
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
      if (o.type && o.type !== r && (this._destroyDatasetMeta(a), o = this.getDatasetMeta(a)), o.type = r, o.indexAxis = i.indexAxis || Vs(r, this.options), o.order = i.order || 0, o.index = a, o.label = "" + i.label, o.visible = this.isDatasetVisible(a), o.controller)
        o.controller.updateIndex(a), o.controller.linkScales();
      else {
        const l = Ot.getController(r), { datasetElementType: d, dataElementType: u } = pt.datasets[r];
        Object.assign(l, {
          dataElementType: Ot.getElement(u),
          datasetElementType: d && Ot.getElement(d)
        }), o.controller = new l(this, a), t.push(o.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    rt(this.data.datasets, (t, s) => {
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
    for (let d = 0, u = this.data.datasets.length; d < u; d++) {
      const { controller: f } = this.getDatasetMeta(d), p = !n && i.indexOf(f) === -1;
      f.buildOrUpdateElements(p), o = Math.max(+f.getMaxOverflow(), o);
    }
    o = this._minPadding = a.layout.autoPadding ? o : 0, this._updateLayout(o), n || rt(i, (d) => {
      d.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(cn("z", "_idx"));
    const { _active: r, _lastEvent: l } = this;
    l ? this._eventHandler(l, !0) : r.length && this._updateHoverStyles(r, r, !0), this.render();
  }
  _updateScales() {
    rt(this.scales, (t) => {
      Ft.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, s = new Set(Object.keys(this._listeners)), a = new Set(t.events);
    (!ya(s, a) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, s = this._getUniformDataChanges() || [];
    for (const { method: a, start: n, count: i } of s) {
      const o = a === "_removeElements" ? -i : i;
      Dc(t, n, o);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const s = this.data.datasets.length, a = (i) => new Set(t.filter((o) => o[0] === i).map((o, r) => r + "," + o.splice(1).join(","))), n = a(0);
    for (let i = 1; i < s; i++)
      if (!ya(n, a(i)))
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
    Ft.update(this, this.width, this.height, t);
    const s = this.chartArea, a = s.width <= 0 || s.height <= 0;
    this._layers = [], rt(this.boxes, (n) => {
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
        this._updateDataset(s, Gt(t) ? t({
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
    }) !== !1 && (zt.has(this) ? this.attached && !zt.running(this) && zt.start(this) : (this.draw(), dn({
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
    }, n = pi(this, t);
    this.notifyPlugins("beforeDatasetDraw", a) !== !1 && (n && gs(s, n), t.controller.draw(), n && ps(s), a.cancelable = !1, this.notifyPlugins("afterDatasetDraw", a));
  }
  isPointInArea(t) {
    return Ne(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, s, a, n) {
    const i = $l.modes[s];
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
    return this.$context || (this.$context = de(null, {
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
    Re(s) ? (i.data[s].hidden = !a, this.update()) : (this.setDatasetVisibility(t, a), o.update(i, {
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
    for (this.stop(), zt.remove(this), t = 0, s = this.data.datasets.length; t < s; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: s } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), Ta(t, s), this.platform.releaseContext(s), this.canvas = null, this.ctx = null), delete is[this.id], this.notifyPlugins("afterDestroy");
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
    rt(this.options.events, (i) => a(i, n));
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
    rt(this._listeners, (t, s) => {
      this.platform.removeEventListener(this, s, t);
    }), this._listeners = {}, rt(this._responsiveListeners, (t, s) => {
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
    !os(a, s) && (this._active = a, this._lastEvent = null, this._updateHoverStyles(a, s));
  }
  notifyPlugins(t, s, a) {
    return this._plugins.notify(this, t, s, a);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((s) => s.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, s, a) {
    const n = this.options.hover, i = (l, d) => l.filter((u) => !d.some((f) => u.datasetIndex === f.datasetIndex && u.index === f.index)), o = i(s, t), r = a ? t : i(t, s);
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
    const { _active: n = [], options: i } = this, o = s, r = this._getActiveElements(t, n, a, o), l = Ao(t), d = Ac(t, this._lastEvent, a, l);
    a && (this._lastEvent = null, ht(i.onHover, [
      t,
      r,
      this
    ], this), l && ht(i.onClick, [
      t,
      r,
      this
    ], this));
    const u = !os(r, n);
    return (u || s) && (this._active = r, this._updateHoverStyles(r, n, s)), this._lastEvent = d, u;
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
function hn() {
  return rt(_e.instances, (e) => e._plugins.invalidate());
}
function Tc(e, t, s) {
  const { startAngle: a, x: n, y: i, outerRadius: o, innerRadius: r, options: l } = t, { borderWidth: d, borderJoinStyle: u } = l, f = Math.min(d / o, Tt(a - s));
  if (e.beginPath(), e.arc(n, i, o - d / 2, a + f / 2, s - f / 2), r > 0) {
    const p = Math.min(d / r, Tt(a - s));
    e.arc(n, i, r + d / 2, s - p / 2, a + p / 2, !0);
  } else {
    const p = Math.min(d / 2, o * Tt(a - s));
    if (u === "round")
      e.arc(n, i, p, s - lt / 2, a + lt / 2, !0);
    else if (u === "bevel") {
      const g = 2 * p * p, h = -g * Math.cos(s + lt / 2) + n, b = -g * Math.sin(s + lt / 2) + i, v = g * Math.cos(a + lt / 2) + n, m = g * Math.sin(a + lt / 2) + i;
      e.lineTo(h, b), e.lineTo(v, m);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function Bc(e, t, s) {
  const { startAngle: a, pixelMargin: n, x: i, y: o, outerRadius: r, innerRadius: l } = t;
  let d = n / r;
  e.beginPath(), e.arc(i, o, r, a - d, s + d), l > n ? (d = n / l, e.arc(i, o, l, s + d, a - d, !0)) : e.arc(i, o, n, s + mt, a - mt), e.closePath(), e.clip();
}
function Fc(e) {
  return ea(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function Pc(e, t, s, a) {
  const n = Fc(e.options.borderRadius), i = (s - t) / 2, o = Math.min(i, a * t / 2), r = (l) => {
    const d = (s - Math.min(i, l)) * a / 2;
    return xt(l, 0, Math.min(i, d));
  };
  return {
    outerStart: r(n.outerStart),
    outerEnd: r(n.outerEnd),
    innerStart: xt(n.innerStart, 0, o),
    innerEnd: xt(n.innerEnd, 0, o)
  };
}
function he(e, t, s, a) {
  return {
    x: s + e * Math.cos(t),
    y: a + e * Math.sin(t)
  };
}
function hs(e, t, s, a, n, i) {
  const { x: o, y: r, startAngle: l, pixelMargin: d, innerRadius: u } = t, f = Math.max(t.outerRadius + a + s - d, 0), p = u > 0 ? u + a + s + d : 0;
  let g = 0;
  const h = n - l;
  if (a) {
    const R = u > 0 ? u - a : 0, V = f > 0 ? f - a : 0, K = (R + V) / 2, H = K !== 0 ? h * K / (K + a) : h;
    g = (h - H) / 2;
  }
  const b = Math.max(1e-3, h * f - s / lt) / f, v = (h - b) / 2, m = l + v + g, _ = n - v - g, { outerStart: k, outerEnd: M, innerStart: S, innerEnd: $ } = Pc(t, p, f, _ - m), A = f - k, F = f - M, E = m + k / A, I = _ - M / F, C = p + S, T = p + $, L = m + S / C, P = _ - $ / T;
  if (e.beginPath(), i) {
    const R = (E + I) / 2;
    if (e.arc(o, r, f, E, R), e.arc(o, r, f, R, I), M > 0) {
      const z = he(F, I, o, r);
      e.arc(z.x, z.y, M, I, _ + mt);
    }
    const V = he(T, _, o, r);
    if (e.lineTo(V.x, V.y), $ > 0) {
      const z = he(T, P, o, r);
      e.arc(z.x, z.y, $, _ + mt, P + Math.PI);
    }
    const K = (_ - $ / p + (m + S / p)) / 2;
    if (e.arc(o, r, p, _ - $ / p, K, !0), e.arc(o, r, p, K, m + S / p, !0), S > 0) {
      const z = he(C, L, o, r);
      e.arc(z.x, z.y, S, L + Math.PI, m - mt);
    }
    const H = he(A, m, o, r);
    if (e.lineTo(H.x, H.y), k > 0) {
      const z = he(A, E, o, r);
      e.arc(z.x, z.y, k, m - mt, E);
    }
  } else {
    e.moveTo(o, r);
    const R = Math.cos(E) * f + o, V = Math.sin(E) * f + r;
    e.lineTo(R, V);
    const K = Math.cos(I) * f + o, H = Math.sin(I) * f + r;
    e.lineTo(K, H);
  }
  e.closePath();
}
function Lc(e, t, s, a, n) {
  const { fullCircles: i, startAngle: o, circumference: r } = t;
  let l = t.endAngle;
  if (i) {
    hs(e, t, s, a, l, n);
    for (let d = 0; d < i; ++d)
      e.fill();
    isNaN(r) || (l = o + (r % ft || ft));
  }
  return hs(e, t, s, a, l, n), e.fill(), l;
}
function Ec(e, t, s, a, n) {
  const { fullCircles: i, startAngle: o, circumference: r, options: l } = t, { borderWidth: d, borderJoinStyle: u, borderDash: f, borderDashOffset: p, borderRadius: g } = l, h = l.borderAlign === "inner";
  if (!d)
    return;
  e.setLineDash(f || []), e.lineDashOffset = p, h ? (e.lineWidth = d * 2, e.lineJoin = u || "round") : (e.lineWidth = d, e.lineJoin = u || "bevel");
  let b = t.endAngle;
  if (i) {
    hs(e, t, s, a, b, n);
    for (let v = 0; v < i; ++v)
      e.stroke();
    isNaN(r) || (b = o + (r % ft || ft));
  }
  h && Bc(e, t, b), l.selfJoin && b - o >= lt && g === 0 && u !== "miter" && Tc(e, t, b), i || (hs(e, t, s, a, b, n), e.stroke());
}
class Oc extends Yt {
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
    ], a), { angle: i, distance: o } = Zn(n, {
      x: t,
      y: s
    }), { startAngle: r, endAngle: l, innerRadius: d, outerRadius: u, circumference: f } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], a), p = (this.options.spacing + this.options.borderWidth) / 2, g = G(f, l - r), h = ze(i, r, l) && r !== l, b = g >= ft || h, v = Vt(o, d + p, u + p);
    return b && v;
  }
  getCenterPoint(t) {
    const { x: s, y: a, startAngle: n, endAngle: i, innerRadius: o, outerRadius: r } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], t), { offset: l, spacing: d } = this.options, u = (n + i) / 2, f = (o + r + d + l) / 2;
    return {
      x: s + Math.cos(u) * f,
      y: a + Math.sin(u) * f
    };
  }
  tooltipPosition(t) {
    return this.getCenterPoint(t);
  }
  draw(t) {
    const { options: s, circumference: a } = this, n = (s.offset || 0) / 4, i = (s.spacing || 0) / 2, o = s.circular;
    if (this.pixelMargin = s.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = a > ft ? Math.floor(a / ft) : 0, a === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const r = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(r) * n, Math.sin(r) * n);
    const l = 1 - Math.sin(Math.min(lt, a || 0)), d = n * l;
    t.fillStyle = s.backgroundColor, t.strokeStyle = s.borderColor, Lc(t, this, d, i, o), Ec(t, this, d, i, o), t.restore();
  }
}
function Di(e, t, s = t) {
  e.lineCap = G(s.borderCapStyle, t.borderCapStyle), e.setLineDash(G(s.borderDash, t.borderDash)), e.lineDashOffset = G(s.borderDashOffset, t.borderDashOffset), e.lineJoin = G(s.borderJoinStyle, t.borderJoinStyle), e.lineWidth = G(s.borderWidth, t.borderWidth), e.strokeStyle = G(s.borderColor, t.borderColor);
}
function Rc(e, t, s) {
  e.lineTo(s.x, s.y);
}
function Ic(e) {
  return e.stepped ? sr : e.tension || e.cubicInterpolationMode === "monotone" ? ar : Rc;
}
function Ai(e, t, s = {}) {
  const a = e.length, { start: n = 0, end: i = a - 1 } = s, { start: o, end: r } = t, l = Math.max(n, o), d = Math.min(i, r), u = n < o && i < o || n > r && i > r;
  return {
    count: a,
    start: l,
    loop: t.loop,
    ilen: d < l && !u ? a + d - l : d - l
  };
}
function zc(e, t, s, a) {
  const { points: n, options: i } = t, { count: o, start: r, loop: l, ilen: d } = Ai(n, s, a), u = Ic(i);
  let { move: f = !0, reverse: p } = a || {}, g, h, b;
  for (g = 0; g <= d; ++g)
    h = n[(r + (p ? d - g : g)) % o], !h.skip && (f ? (e.moveTo(h.x, h.y), f = !1) : u(e, b, h, p, i.stepped), b = h);
  return l && (h = n[(r + (p ? d : 0)) % o], u(e, b, h, p, i.stepped)), !!l;
}
function Nc(e, t, s, a) {
  const n = t.points, { count: i, start: o, ilen: r } = Ai(n, s, a), { move: l = !0, reverse: d } = a || {};
  let u = 0, f = 0, p, g, h, b, v, m;
  const _ = (M) => (o + (d ? r - M : M)) % i, k = () => {
    b !== v && (e.lineTo(u, v), e.lineTo(u, b), e.lineTo(u, m));
  };
  for (l && (g = n[_(0)], e.moveTo(g.x, g.y)), p = 0; p <= r; ++p) {
    if (g = n[_(p)], g.skip)
      continue;
    const M = g.x, S = g.y, $ = M | 0;
    $ === h ? (S < b ? b = S : S > v && (v = S), u = (f * u + M) / ++f) : (k(), e.lineTo(M, S), h = $, f = 0, b = v = S), m = S;
  }
  k();
}
function Ys(e) {
  const t = e.options, s = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !s ? Nc : zc;
}
function Wc(e) {
  return e.stepped ? Er : e.tension || e.cubicInterpolationMode === "monotone" ? Or : ne;
}
function Hc(e, t, s, a) {
  let n = t._path;
  n || (n = t._path = new Path2D(), t.path(n, s, a) && n.closePath()), Di(e, t.options), e.stroke(n);
}
function Vc(e, t, s, a) {
  const { segments: n, options: i } = t, o = Ys(t);
  for (const r of n)
    Di(e, i, r.style), e.beginPath(), o(e, t, r, {
      start: s,
      end: s + a - 1
    }) && e.closePath(), e.stroke();
}
const jc = typeof Path2D == "function";
function Yc(e, t, s, a) {
  jc && !t.options.segment ? Hc(e, t, s, a) : Vc(e, t, s, a);
}
class _s extends Yt {
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
      Cr(this._points, a, t, n, s), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = Hr(this, this.options.segment));
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
    const a = this.options, n = t[s], i = this.points, o = gi(this, {
      property: s,
      start: n,
      end: n
    });
    if (!o.length)
      return;
    const r = [], l = Wc(a);
    let d, u;
    for (d = 0, u = o.length; d < u; ++d) {
      const { start: f, end: p } = o[d], g = i[f], h = i[p];
      if (g === h) {
        r.push(g);
        continue;
      }
      const b = Math.abs((n - g[s]) / (h[s] - g[s])), v = l(g, h, b, a.stepped);
      v[s] = t[s], r.push(v);
    }
    return r.length === 1 ? r[0] : r;
  }
  pathSegment(t, s, a) {
    return Ys(this)(t, this, s, a);
  }
  path(t, s, a) {
    const n = this.segments, i = Ys(this);
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
    (this.points || []).length && i.borderWidth && (t.save(), Yc(t, this, a, n), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function fn(e, t, s, a) {
  const n = e.options, { [s]: i } = e.getProps([
    s
  ], a);
  return Math.abs(t - i) < n.radius + n.hitRadius;
}
class qc extends Yt {
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
    return fn(this, t, "x", s);
  }
  inYRange(t, s) {
    return fn(this, t, "y", s);
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
    this.skip || a.radius < 0.1 || !Ne(this, s, this.size(a) / 2) || (t.strokeStyle = a.borderColor, t.lineWidth = a.borderWidth, t.fillStyle = a.backgroundColor, Hs(t, a, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function Ti(e, t) {
  const { x: s, y: a, base: n, width: i, height: o } = e.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let r, l, d, u, f;
  return e.horizontal ? (f = o / 2, r = Math.min(s, n), l = Math.max(s, n), d = a - f, u = a + f) : (f = i / 2, r = s - f, l = s + f, d = Math.min(a, n), u = Math.max(a, n)), {
    left: r,
    top: d,
    right: l,
    bottom: u
  };
}
function Kt(e, t, s, a) {
  return e ? 0 : xt(t, s, a);
}
function Uc(e, t, s) {
  const a = e.options.borderWidth, n = e.borderSkipped, i = ni(a);
  return {
    t: Kt(n.top, i.top, 0, s),
    r: Kt(n.right, i.right, 0, t),
    b: Kt(n.bottom, i.bottom, 0, s),
    l: Kt(n.left, i.left, 0, t)
  };
}
function Kc(e, t, s) {
  const { enableBorderRadius: a } = e.getProps([
    "enableBorderRadius"
  ]), n = e.options.borderRadius, i = ge(n), o = Math.min(t, s), r = e.borderSkipped, l = a || J(n);
  return {
    topLeft: Kt(!l || r.top || r.left, i.topLeft, 0, o),
    topRight: Kt(!l || r.top || r.right, i.topRight, 0, o),
    bottomLeft: Kt(!l || r.bottom || r.left, i.bottomLeft, 0, o),
    bottomRight: Kt(!l || r.bottom || r.right, i.bottomRight, 0, o)
  };
}
function Xc(e) {
  const t = Ti(e), s = t.right - t.left, a = t.bottom - t.top, n = Uc(e, s / 2, a / 2), i = Kc(e, s / 2, a / 2);
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
function Ps(e, t, s, a) {
  const n = t === null, i = s === null, r = e && !(n && i) && Ti(e, a);
  return r && (n || Vt(t, r.left, r.right)) && (i || Vt(s, r.top, r.bottom));
}
function Gc(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function Zc(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function Ls(e, t, s = {}) {
  const a = e.x !== s.x ? -t : 0, n = e.y !== s.y ? -t : 0, i = (e.x + e.w !== s.x + s.w ? t : 0) - a, o = (e.y + e.h !== s.y + s.h ? t : 0) - n;
  return {
    x: e.x + a,
    y: e.y + n,
    w: e.w + i,
    h: e.h + o,
    radius: e.radius
  };
}
class Qc extends Yt {
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
    const { inflateAmount: s, options: { borderColor: a, backgroundColor: n } } = this, { inner: i, outer: o } = Xc(this), r = Gc(o.radius) ? cs : Zc;
    t.save(), (o.w !== i.w || o.h !== i.h) && (t.beginPath(), r(t, Ls(o, s, i)), t.clip(), r(t, Ls(i, -s, o)), t.fillStyle = a, t.fill("evenodd")), t.beginPath(), r(t, Ls(i, s)), t.fillStyle = n, t.fill(), t.restore();
  }
  inRange(t, s, a) {
    return Ps(this, t, s, a);
  }
  inXRange(t, s) {
    return Ps(this, t, null, s);
  }
  inYRange(t, s) {
    return Ps(this, null, t, s);
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
function Jc(e, t, s) {
  const a = e.segments, n = e.points, i = t.points, o = [];
  for (const r of a) {
    let { start: l, end: d } = r;
    d = ys(l, d, n);
    const u = qs(s, n[l], n[d], r.loop);
    if (!t.segments) {
      o.push({
        source: r,
        target: u,
        start: n[l],
        end: n[d]
      });
      continue;
    }
    const f = gi(t, u);
    for (const p of f) {
      const g = qs(s, i[p.start], i[p.end], p.loop), h = fi(r, n, g);
      for (const b of h)
        o.push({
          source: b,
          target: p,
          start: {
            [s]: gn(u, g, "start", Math.max)
          },
          end: {
            [s]: gn(u, g, "end", Math.min)
          }
        });
    }
  }
  return o;
}
function qs(e, t, s, a) {
  if (a)
    return;
  let n = t[e], i = s[e];
  return e === "angle" && (n = Tt(n), i = Tt(i)), {
    property: e,
    start: n,
    end: i
  };
}
function td(e, t) {
  const { x: s = null, y: a = null } = e || {}, n = t.points, i = [];
  return t.segments.forEach(({ start: o, end: r }) => {
    r = ys(o, r, n);
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
function ys(e, t, s) {
  for (; t > e; t--) {
    const a = s[t];
    if (!isNaN(a.x) && !isNaN(a.y))
      break;
  }
  return t;
}
function gn(e, t, s, a) {
  return e && t ? a(e[s], t[s]) : e ? e[s] : t ? t[s] : 0;
}
function Bi(e, t) {
  let s = [], a = !1;
  return vt(e) ? (a = !0, s = e) : s = td(e, t), s.length ? new _s({
    points: s,
    options: {
      tension: 0
    },
    _loop: a,
    _fullLoop: a
  }) : null;
}
function pn(e) {
  return e && e.fill !== !1;
}
function ed(e, t, s) {
  let n = e[t].fill;
  const i = [
    t
  ];
  let o;
  if (!s)
    return n;
  for (; n !== !1 && i.indexOf(n) === -1; ) {
    if (!St(n))
      return n;
    if (o = e[n], !o)
      return !1;
    if (o.visible)
      return n;
    i.push(n), n = o.fill;
  }
  return !1;
}
function sd(e, t, s) {
  const a = od(e);
  if (J(a))
    return isNaN(a.value) ? !1 : a;
  let n = parseFloat(a);
  return St(n) && Math.floor(n) === n ? ad(a[0], t, n, s) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(a) >= 0 && a;
}
function ad(e, t, s, a) {
  return (e === "-" || e === "+") && (s = t + s), s === t || s < 0 || s >= a ? !1 : s;
}
function nd(e, t) {
  let s = null;
  return e === "start" ? s = t.bottom : e === "end" ? s = t.top : J(e) ? s = t.getPixelForValue(e.value) : t.getBasePixel && (s = t.getBasePixel()), s;
}
function id(e, t, s) {
  let a;
  return e === "start" ? a = s : e === "end" ? a = t.options.reverse ? t.min : t.max : J(e) ? a = e.value : a = t.getBaseValue(), a;
}
function od(e) {
  const t = e.options, s = t.fill;
  let a = G(s && s.target, s);
  return a === void 0 && (a = !!t.backgroundColor), a === !1 || a === null ? !1 : a === !0 ? "origin" : a;
}
function rd(e) {
  const { scale: t, index: s, line: a } = e, n = [], i = a.segments, o = a.points, r = ld(t, s);
  r.push(Bi({
    x: null,
    y: t.bottom
  }, a));
  for (let l = 0; l < i.length; l++) {
    const d = i[l];
    for (let u = d.start; u <= d.end; u++)
      cd(n, o[u], r);
  }
  return new _s({
    points: n,
    options: {}
  });
}
function ld(e, t) {
  const s = [], a = e.getMatchingVisibleMetas("line");
  for (let n = 0; n < a.length; n++) {
    const i = a[n];
    if (i.index === t)
      break;
    i.hidden || s.unshift(i.dataset);
  }
  return s;
}
function cd(e, t, s) {
  const a = [];
  for (let n = 0; n < s.length; n++) {
    const i = s[n], { first: o, last: r, point: l } = dd(i, t, "x");
    if (!(!l || o && r)) {
      if (o)
        a.unshift(l);
      else if (e.push(l), !r)
        break;
    }
  }
  e.push(...a);
}
function dd(e, t, s) {
  const a = e.interpolate(t, s);
  if (!a)
    return {};
  const n = a[s], i = e.segments, o = e.points;
  let r = !1, l = !1;
  for (let d = 0; d < i.length; d++) {
    const u = i[d], f = o[u.start][s], p = o[u.end][s];
    if (Vt(n, f, p)) {
      r = n === f, l = n === p;
      break;
    }
  }
  return {
    first: r,
    last: l,
    point: a
  };
}
class Fi {
  constructor(t) {
    this.x = t.x, this.y = t.y, this.radius = t.radius;
  }
  pathSegment(t, s, a) {
    const { x: n, y: i, radius: o } = this;
    return s = s || {
      start: 0,
      end: ft
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
function ud(e) {
  const { chart: t, fill: s, line: a } = e;
  if (St(s))
    return hd(t, s);
  if (s === "stack")
    return rd(e);
  if (s === "shape")
    return !0;
  const n = fd(e);
  return n instanceof Fi ? n : Bi(n, a);
}
function hd(e, t) {
  const s = e.getDatasetMeta(t);
  return s && e.isDatasetVisible(t) ? s.dataset : null;
}
function fd(e) {
  return (e.scale || {}).getPointPositionForValue ? pd(e) : gd(e);
}
function gd(e) {
  const { scale: t = {}, fill: s } = e, a = nd(s, t);
  if (St(a)) {
    const n = t.isHorizontal();
    return {
      x: n ? a : null,
      y: n ? null : a
    };
  }
  return null;
}
function pd(e) {
  const { scale: t, fill: s } = e, a = t.options, n = t.getLabels().length, i = a.reverse ? t.max : t.min, o = id(s, t, i), r = [];
  if (a.grid.circular) {
    const l = t.getPointPositionForValue(0, i);
    return new Fi({
      x: l.x,
      y: l.y,
      radius: t.getDistanceFromCenterForValue(o)
    });
  }
  for (let l = 0; l < n; ++l)
    r.push(t.getPointPositionForValue(l, o));
  return r;
}
function Es(e, t, s) {
  const a = ud(t), { chart: n, index: i, line: o, scale: r, axis: l } = t, d = o.options, u = d.fill, f = d.backgroundColor, { above: p = f, below: g = f } = u || {}, h = n.getDatasetMeta(i), b = pi(n, h);
  a && o.points.length && (gs(e, s), bd(e, {
    line: o,
    target: a,
    above: p,
    below: g,
    area: s,
    scale: r,
    axis: l,
    clip: b
  }), ps(e));
}
function bd(e, t) {
  const { line: s, target: a, above: n, below: i, area: o, scale: r, clip: l } = t, d = s._loop ? "angle" : t.axis;
  e.save();
  let u = i;
  i !== n && (d === "x" ? (bn(e, a, o.top), Os(e, {
    line: s,
    target: a,
    color: n,
    scale: r,
    property: d,
    clip: l
  }), e.restore(), e.save(), bn(e, a, o.bottom)) : d === "y" && (vn(e, a, o.left), Os(e, {
    line: s,
    target: a,
    color: i,
    scale: r,
    property: d,
    clip: l
  }), e.restore(), e.save(), vn(e, a, o.right), u = n)), Os(e, {
    line: s,
    target: a,
    color: u,
    scale: r,
    property: d,
    clip: l
  }), e.restore();
}
function bn(e, t, s) {
  const { segments: a, points: n } = t;
  let i = !0, o = !1;
  e.beginPath();
  for (const r of a) {
    const { start: l, end: d } = r, u = n[l], f = n[ys(l, d, n)];
    i ? (e.moveTo(u.x, u.y), i = !1) : (e.lineTo(u.x, s), e.lineTo(u.x, u.y)), o = !!t.pathSegment(e, r, {
      move: o
    }), o ? e.closePath() : e.lineTo(f.x, s);
  }
  e.lineTo(t.first().x, s), e.closePath(), e.clip();
}
function vn(e, t, s) {
  const { segments: a, points: n } = t;
  let i = !0, o = !1;
  e.beginPath();
  for (const r of a) {
    const { start: l, end: d } = r, u = n[l], f = n[ys(l, d, n)];
    i ? (e.moveTo(u.x, u.y), i = !1) : (e.lineTo(s, u.y), e.lineTo(u.x, u.y)), o = !!t.pathSegment(e, r, {
      move: o
    }), o ? e.closePath() : e.lineTo(s, f.y);
  }
  e.lineTo(s, t.first().y), e.closePath(), e.clip();
}
function Os(e, t) {
  const { line: s, target: a, property: n, color: i, scale: o, clip: r } = t, l = Jc(s, a, n);
  for (const { source: d, target: u, start: f, end: p } of l) {
    const { style: { backgroundColor: g = i } = {} } = d, h = a !== !0;
    e.save(), e.fillStyle = g, vd(e, o, r, h && qs(n, f, p)), e.beginPath();
    const b = !!s.pathSegment(e, d);
    let v;
    if (h) {
      b ? e.closePath() : mn(e, a, p, n);
      const m = !!a.pathSegment(e, u, {
        move: b,
        reverse: !0
      });
      v = b && m, v || mn(e, a, f, n);
    }
    e.closePath(), e.fill(v ? "evenodd" : "nonzero"), e.restore();
  }
}
function vd(e, t, s, a) {
  const n = t.chart.chartArea, { property: i, start: o, end: r } = a || {};
  if (i === "x" || i === "y") {
    let l, d, u, f;
    i === "x" ? (l = o, d = n.top, u = r, f = n.bottom) : (l = n.left, d = o, u = n.right, f = r), e.beginPath(), s && (l = Math.max(l, s.left), u = Math.min(u, s.right), d = Math.max(d, s.top), f = Math.min(f, s.bottom)), e.rect(l, d, u - l, f - d), e.clip();
  }
}
function mn(e, t, s, a) {
  const n = t.interpolate(s, a);
  n && e.lineTo(n.x, n.y);
}
var md = {
  id: "filler",
  afterDatasetsUpdate(e, t, s) {
    const a = (e.data.datasets || []).length, n = [];
    let i, o, r, l;
    for (o = 0; o < a; ++o)
      i = e.getDatasetMeta(o), r = i.dataset, l = null, r && r.options && r instanceof _s && (l = {
        visible: e.isDatasetVisible(o),
        index: o,
        fill: sd(r, o, a),
        chart: e,
        axis: i.controller.options.indexAxis,
        scale: i.vScale,
        line: r
      }), i.$filler = l, n.push(l);
    for (o = 0; o < a; ++o)
      l = n[o], !(!l || l.fill === !1) && (l.fill = ed(n, o, s.propagate));
  },
  beforeDraw(e, t, s) {
    const a = s.drawTime === "beforeDraw", n = e.getSortedVisibleDatasetMetas(), i = e.chartArea;
    for (let o = n.length - 1; o >= 0; --o) {
      const r = n[o].$filler;
      r && (r.line.updateControlPoints(i, r.axis), a && r.fill && Es(e.ctx, r, i));
    }
  },
  beforeDatasetsDraw(e, t, s) {
    if (s.drawTime !== "beforeDatasetsDraw")
      return;
    const a = e.getSortedVisibleDatasetMetas();
    for (let n = a.length - 1; n >= 0; --n) {
      const i = a[n].$filler;
      pn(i) && Es(e.ctx, i, e.chartArea);
    }
  },
  beforeDatasetDraw(e, t, s) {
    const a = t.meta.$filler;
    !pn(a) || s.drawTime !== "beforeDatasetDraw" || Es(e.ctx, a, e.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const _n = (e, t) => {
  let { boxHeight: s = t, boxWidth: a = t } = e;
  return e.usePointStyle && (s = Math.min(s, t), a = e.pointStyleWidth || Math.min(a, t)), {
    boxWidth: a,
    boxHeight: s,
    itemHeight: Math.max(t, s)
  };
}, _d = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class yn extends Yt {
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
    let s = ht(t.generateLabels, [
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
    const a = t.labels, n = kt(a.font), i = n.size, o = this._computeTitleHeight(), { boxWidth: r, itemHeight: l } = _n(a, i);
    let d, u;
    s.font = n.string, this.isHorizontal() ? (d = this.maxWidth, u = this._fitRows(o, i, r, l) + 10) : (u = this.maxHeight, d = this._fitCols(o, n, r, l) + 10), this.width = Math.min(d, t.maxWidth || this.maxWidth), this.height = Math.min(u, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, s, a, n) {
    const { ctx: i, maxWidth: o, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], d = this.lineWidths = [
      0
    ], u = n + r;
    let f = t;
    i.textAlign = "left", i.textBaseline = "middle";
    let p = -1, g = -u;
    return this.legendItems.forEach((h, b) => {
      const v = a + s / 2 + i.measureText(h.text).width;
      (b === 0 || d[d.length - 1] + v + 2 * r > o) && (f += u, d[d.length - (b > 0 ? 0 : 1)] = 0, g += u, p++), l[b] = {
        left: 0,
        top: g,
        row: p,
        width: v,
        height: n
      }, d[d.length - 1] += v + r;
    }), f;
  }
  _fitCols(t, s, a, n) {
    const { ctx: i, maxHeight: o, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], d = this.columnSizes = [], u = o - t;
    let f = r, p = 0, g = 0, h = 0, b = 0;
    return this.legendItems.forEach((v, m) => {
      const { itemWidth: _, itemHeight: k } = yd(a, s, i, v, n);
      m > 0 && g + k + 2 * r > u && (f += p + r, d.push({
        width: p,
        height: g
      }), h += p + r, b++, p = g = 0), l[m] = {
        left: h,
        top: g,
        col: b,
        width: _,
        height: k
      }, p = Math.max(p, _), g += k + r;
    }), f += p, d.push({
      width: p,
      height: g
    }), f;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: s, options: { align: a, labels: { padding: n }, rtl: i } } = this, o = pe(i, this.left, this.width);
    if (this.isHorizontal()) {
      let r = 0, l = yt(a, this.left + n, this.right - this.lineWidths[r]);
      for (const d of s)
        r !== d.row && (r = d.row, l = yt(a, this.left + n, this.right - this.lineWidths[r])), d.top += this.top + t + n, d.left = o.leftForLtr(o.x(l), d.width), l += d.width + n;
    } else {
      let r = 0, l = yt(a, this.top + t + n, this.bottom - this.columnSizes[r].height);
      for (const d of s)
        d.col !== r && (r = d.col, l = yt(a, this.top + t + n, this.bottom - this.columnSizes[r].height)), d.top = l, d.left += this.left + n, d.left = o.leftForLtr(o.x(d.left), d.width), l += d.height + n;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      gs(t, this), this._draw(), ps(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: s, lineWidths: a, ctx: n } = this, { align: i, labels: o } = t, r = pt.color, l = pe(t.rtl, this.left, this.width), d = kt(o.font), { padding: u } = o, f = d.size, p = f / 2;
    let g;
    this.drawTitle(), n.textAlign = l.textAlign("left"), n.textBaseline = "middle", n.lineWidth = 0.5, n.font = d.string;
    const { boxWidth: h, boxHeight: b, itemHeight: v } = _n(o, f), m = function($, A, F) {
      if (isNaN(h) || h <= 0 || isNaN(b) || b < 0)
        return;
      n.save();
      const E = G(F.lineWidth, 1);
      if (n.fillStyle = G(F.fillStyle, r), n.lineCap = G(F.lineCap, "butt"), n.lineDashOffset = G(F.lineDashOffset, 0), n.lineJoin = G(F.lineJoin, "miter"), n.lineWidth = E, n.strokeStyle = G(F.strokeStyle, r), n.setLineDash(G(F.lineDash, [])), o.usePointStyle) {
        const I = {
          radius: b * Math.SQRT2 / 2,
          pointStyle: F.pointStyle,
          rotation: F.rotation,
          borderWidth: E
        }, C = l.xPlus($, h / 2), T = A + p;
        ai(n, I, C, T, o.pointStyleWidth && h);
      } else {
        const I = A + Math.max((f - b) / 2, 0), C = l.leftForLtr($, h), T = ge(F.borderRadius);
        n.beginPath(), Object.values(T).some((L) => L !== 0) ? cs(n, {
          x: C,
          y: I,
          w: h,
          h: b,
          radius: T
        }) : n.rect(C, I, h, b), n.fill(), E !== 0 && n.stroke();
      }
      n.restore();
    }, _ = function($, A, F) {
      We(n, F.text, $, A + v / 2, d, {
        strikethrough: F.hidden,
        textAlign: l.textAlign(F.textAlign)
      });
    }, k = this.isHorizontal(), M = this._computeTitleHeight();
    k ? g = {
      x: yt(i, this.left + u, this.right - a[0]),
      y: this.top + u + M,
      line: 0
    } : g = {
      x: this.left + u,
      y: yt(i, this.top + M + u, this.bottom - s[0].height),
      line: 0
    }, di(this.ctx, t.textDirection);
    const S = v + u;
    this.legendItems.forEach(($, A) => {
      n.strokeStyle = $.fontColor, n.fillStyle = $.fontColor;
      const F = n.measureText($.text).width, E = l.textAlign($.textAlign || ($.textAlign = o.textAlign)), I = h + p + F;
      let C = g.x, T = g.y;
      l.setWidth(this.width), k ? A > 0 && C + I + u > this.right && (T = g.y += S, g.line++, C = g.x = yt(i, this.left + u, this.right - a[g.line])) : A > 0 && T + S > this.bottom && (C = g.x = C + s[g.line].width + u, g.line++, T = g.y = yt(i, this.top + M + u, this.bottom - s[g.line].height));
      const L = l.x(C);
      if (m(L, T, $), C = Vo(E, C + h + p, k ? C + I : this.right, t.rtl), _(l.x(C), T, $), k)
        g.x += I + u;
      else if (typeof $.text != "string") {
        const P = d.lineHeight;
        g.y += Pi($, P) + u;
      } else
        g.y += S;
    }), ui(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, s = t.title, a = kt(s.font), n = Pt(s.padding);
    if (!s.display)
      return;
    const i = pe(t.rtl, this.left, this.width), o = this.ctx, r = s.position, l = a.size / 2, d = n.top + l;
    let u, f = this.left, p = this.width;
    if (this.isHorizontal())
      p = Math.max(...this.lineWidths), u = this.top + d, f = yt(t.align, f, this.right - p);
    else {
      const h = this.columnSizes.reduce((b, v) => Math.max(b, v.height), 0);
      u = d + yt(t.align, this.top, this.bottom - h - t.labels.padding - this._computeTitleHeight());
    }
    const g = yt(r, f, f + p);
    o.textAlign = i.textAlign(Qs(r)), o.textBaseline = "middle", o.strokeStyle = s.color, o.fillStyle = s.color, o.font = a.string, We(o, s.text, g, u, a);
  }
  _computeTitleHeight() {
    const t = this.options.title, s = kt(t.font), a = Pt(t.padding);
    return t.display ? s.lineHeight + a.height : 0;
  }
  _getLegendItemAt(t, s) {
    let a, n, i;
    if (Vt(t, this.left, this.right) && Vt(s, this.top, this.bottom)) {
      for (i = this.legendHitBoxes, a = 0; a < i.length; ++a)
        if (n = i[a], Vt(t, n.left, n.left + n.width) && Vt(s, n.top, n.top + n.height))
          return this.legendItems[a];
    }
    return null;
  }
  handleEvent(t) {
    const s = this.options;
    if (!Md(t.type, s))
      return;
    const a = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const n = this._hoveredItem, i = _d(n, a);
      n && !i && ht(s.onLeave, [
        t,
        n,
        this
      ], this), this._hoveredItem = a, a && !i && ht(s.onHover, [
        t,
        a,
        this
      ], this);
    } else a && ht(s.onClick, [
      t,
      a,
      this
    ], this);
  }
}
function yd(e, t, s, a, n) {
  const i = xd(a, e, t, s), o = kd(n, a, t.lineHeight);
  return {
    itemWidth: i,
    itemHeight: o
  };
}
function xd(e, t, s, a) {
  let n = e.text;
  return n && typeof n != "string" && (n = n.reduce((i, o) => i.length > o.length ? i : o)), t + s.size / 2 + a.measureText(n).width;
}
function kd(e, t, s) {
  let a = e;
  return typeof t.text != "string" && (a = Pi(t, s)), a;
}
function Pi(e, t) {
  const s = e.text ? e.text.length : 0;
  return t * s;
}
function Md(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var la = {
  id: "legend",
  _element: yn,
  start(e, t, s) {
    const a = e.legend = new yn({
      ctx: e.ctx,
      options: s,
      chart: e
    });
    Ft.configure(e, a, s), Ft.addBox(e, a);
  },
  stop(e) {
    Ft.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, s) {
    const a = e.legend;
    Ft.configure(e, a, s), a.options = s;
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
          const d = l.controller.getStyle(s ? 0 : void 0), u = Pt(d.borderWidth);
          return {
            text: t[l.index].label,
            fillStyle: d.backgroundColor,
            fontColor: i,
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
class Li extends Yt {
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
    const n = vt(a.text) ? a.text.length : 1;
    this._padding = Pt(a.padding);
    const i = n * kt(a.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = i : this.width = i;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: s, left: a, bottom: n, right: i, options: o } = this, r = o.align;
    let l = 0, d, u, f;
    return this.isHorizontal() ? (u = yt(r, a, i), f = s + t, d = i - a) : (o.position === "left" ? (u = a + t, f = yt(r, n, s), l = lt * -0.5) : (u = i - t, f = yt(r, s, n), l = lt * 0.5), d = n - s), {
      titleX: u,
      titleY: f,
      maxWidth: d,
      rotation: l
    };
  }
  draw() {
    const t = this.ctx, s = this.options;
    if (!s.display)
      return;
    const a = kt(s.font), i = a.lineHeight / 2 + this._padding.top, { titleX: o, titleY: r, maxWidth: l, rotation: d } = this._drawArgs(i);
    We(t, s.text, 0, 0, a, {
      color: s.color,
      maxWidth: l,
      rotation: d,
      textAlign: Qs(s.align),
      textBaseline: "middle",
      translation: [
        o,
        r
      ]
    });
  }
}
function Sd(e, t) {
  const s = new Li({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  Ft.configure(e, s, t), Ft.addBox(e, s), e.titleBlock = s;
}
var Ei = {
  id: "title",
  _element: Li,
  start(e, t, s) {
    Sd(e, s);
  },
  stop(e) {
    const t = e.titleBlock;
    Ft.removeBox(e, t), delete e.titleBlock;
  },
  beforeUpdate(e, t, s) {
    const a = e.titleBlock;
    Ft.configure(e, a, s), a.options = s;
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
        const d = l.getCenterPoint(), u = Ns(t, d);
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
function Et(e, t) {
  return t && (vt(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function Nt(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function wd(e, t) {
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
function xn(e, t) {
  const s = e.chart.ctx, { body: a, footer: n, title: i } = e, { boxWidth: o, boxHeight: r } = t, l = kt(t.bodyFont), d = kt(t.titleFont), u = kt(t.footerFont), f = i.length, p = n.length, g = a.length, h = Pt(t.padding);
  let b = h.height, v = 0, m = a.reduce((M, S) => M + S.before.length + S.lines.length + S.after.length, 0);
  if (m += e.beforeBody.length + e.afterBody.length, f && (b += f * d.lineHeight + (f - 1) * t.titleSpacing + t.titleMarginBottom), m) {
    const M = t.displayColors ? Math.max(r, l.lineHeight) : l.lineHeight;
    b += g * M + (m - g) * l.lineHeight + (m - 1) * t.bodySpacing;
  }
  p && (b += t.footerMarginTop + p * u.lineHeight + (p - 1) * t.footerSpacing);
  let _ = 0;
  const k = function(M) {
    v = Math.max(v, s.measureText(M).width + _);
  };
  return s.save(), s.font = d.string, rt(e.title, k), s.font = l.string, rt(e.beforeBody.concat(e.afterBody), k), _ = t.displayColors ? o + 2 + t.boxPadding : 0, rt(a, (M) => {
    rt(M.before, k), rt(M.lines, k), rt(M.after, k);
  }), _ = 0, s.font = u.string, rt(e.footer, k), s.restore(), v += h.width, {
    width: v,
    height: b
  };
}
function $d(e, t) {
  const { y: s, height: a } = t;
  return s < a / 2 ? "top" : s > e.height - a / 2 ? "bottom" : "center";
}
function Cd(e, t, s, a) {
  const { x: n, width: i } = a, o = s.caretSize + s.caretPadding;
  if (e === "left" && n + i + o > t.width || e === "right" && n - i - o < 0)
    return !0;
}
function Dd(e, t, s, a) {
  const { x: n, width: i } = s, { width: o, chartArea: { left: r, right: l } } = e;
  let d = "center";
  return a === "center" ? d = n <= (r + l) / 2 ? "left" : "right" : n <= i / 2 ? d = "left" : n >= o - i / 2 && (d = "right"), Cd(d, e, t, s) && (d = "center"), d;
}
function kn(e, t, s) {
  const a = s.yAlign || t.yAlign || $d(e, s);
  return {
    xAlign: s.xAlign || t.xAlign || Dd(e, t, s, a),
    yAlign: a
  };
}
function Ad(e, t) {
  let { x: s, width: a } = e;
  return t === "right" ? s -= a : t === "center" && (s -= a / 2), s;
}
function Td(e, t, s) {
  let { y: a, height: n } = e;
  return t === "top" ? a += s : t === "bottom" ? a -= n + s : a -= n / 2, a;
}
function Mn(e, t, s, a) {
  const { caretSize: n, caretPadding: i, cornerRadius: o } = e, { xAlign: r, yAlign: l } = s, d = n + i, { topLeft: u, topRight: f, bottomLeft: p, bottomRight: g } = ge(o);
  let h = Ad(t, r);
  const b = Td(t, l, d);
  return l === "center" ? r === "left" ? h += d : r === "right" && (h -= d) : r === "left" ? h -= Math.max(u, p) + n : r === "right" && (h += Math.max(f, g) + n), {
    x: xt(h, 0, a.width - t.width),
    y: xt(b, 0, a.height - t.height)
  };
}
function ss(e, t, s) {
  const a = Pt(s.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - a.right : e.x + a.left;
}
function Sn(e) {
  return Et([], Nt(e));
}
function Bd(e, t, s) {
  return de(e, {
    tooltip: t,
    tooltipItems: s,
    type: "tooltip"
  });
}
function wn(e, t) {
  const s = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return s ? e.override(s) : e;
}
const Oi = {
  beforeTitle: It,
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
  afterTitle: It,
  beforeBody: It,
  beforeLabel: It,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const s = e.formattedValue;
    return ot(s) || (t += s), t;
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
  afterLabel: It,
  afterBody: It,
  beforeFooter: It,
  footer: It,
  afterFooter: It
};
function wt(e, t, s, a) {
  const n = e[t].call(s, a);
  return typeof n > "u" ? Oi[t].call(s, a) : n;
}
class $n extends Yt {
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
    const s = this.chart, a = this.options.setContext(this.getContext()), n = a.enabled && s.options.animation && a.animations, i = new bi(this.chart, n);
    return n._cacheable && (this._cachedAnimations = Object.freeze(i)), i;
  }
  getContext() {
    return this.$context || (this.$context = Bd(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, s) {
    const { callbacks: a } = s, n = wt(a, "beforeTitle", this, t), i = wt(a, "title", this, t), o = wt(a, "afterTitle", this, t);
    let r = [];
    return r = Et(r, Nt(n)), r = Et(r, Nt(i)), r = Et(r, Nt(o)), r;
  }
  getBeforeBody(t, s) {
    return Sn(wt(s.callbacks, "beforeBody", this, t));
  }
  getBody(t, s) {
    const { callbacks: a } = s, n = [];
    return rt(t, (i) => {
      const o = {
        before: [],
        lines: [],
        after: []
      }, r = wn(a, i);
      Et(o.before, Nt(wt(r, "beforeLabel", this, i))), Et(o.lines, wt(r, "label", this, i)), Et(o.after, Nt(wt(r, "afterLabel", this, i))), n.push(o);
    }), n;
  }
  getAfterBody(t, s) {
    return Sn(wt(s.callbacks, "afterBody", this, t));
  }
  getFooter(t, s) {
    const { callbacks: a } = s, n = wt(a, "beforeFooter", this, t), i = wt(a, "footer", this, t), o = wt(a, "afterFooter", this, t);
    let r = [];
    return r = Et(r, Nt(n)), r = Et(r, Nt(i)), r = Et(r, Nt(o)), r;
  }
  _createItems(t) {
    const s = this._active, a = this.chart.data, n = [], i = [], o = [];
    let r = [], l, d;
    for (l = 0, d = s.length; l < d; ++l)
      r.push(wd(this.chart, s[l]));
    return t.filter && (r = r.filter((u, f, p) => t.filter(u, f, p, a))), t.itemSort && (r = r.sort((u, f) => t.itemSort(u, f, a))), rt(r, (u) => {
      const f = wn(t.callbacks, u);
      n.push(wt(f, "labelColor", this, u)), i.push(wt(f, "labelPointStyle", this, u)), o.push(wt(f, "labelTextColor", this, u));
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
      const r = Ae[a.position].call(this, n, this._eventPosition);
      o = this._createItems(a), this.title = this.getTitle(o, a), this.beforeBody = this.getBeforeBody(o, a), this.body = this.getBody(o, a), this.afterBody = this.getAfterBody(o, a), this.footer = this.getFooter(o, a);
      const l = this._size = xn(this, a), d = Object.assign({}, r, l), u = kn(this.chart, a, d), f = Mn(a, d, u, this.chart);
      this.xAlign = u.xAlign, this.yAlign = u.yAlign, i = {
        opacity: 1,
        x: f.x,
        y: f.y,
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
    const { xAlign: n, yAlign: i } = this, { caretSize: o, cornerRadius: r } = a, { topLeft: l, topRight: d, bottomLeft: u, bottomRight: f } = ge(r), { x: p, y: g } = t, { width: h, height: b } = s;
    let v, m, _, k, M, S;
    return i === "center" ? (M = g + b / 2, n === "left" ? (v = p, m = v - o, k = M + o, S = M - o) : (v = p + h, m = v + o, k = M - o, S = M + o), _ = v) : (n === "left" ? m = p + Math.max(l, u) + o : n === "right" ? m = p + h - Math.max(d, f) - o : m = this.caretX, i === "top" ? (k = g, M = k - o, v = m - o, _ = m + o) : (k = g + b, M = k + o, v = m + o, _ = m - o), S = k), {
      x1: v,
      x2: m,
      x3: _,
      y1: k,
      y2: M,
      y3: S
    };
  }
  drawTitle(t, s, a) {
    const n = this.title, i = n.length;
    let o, r, l;
    if (i) {
      const d = pe(a.rtl, this.x, this.width);
      for (t.x = ss(this, a.titleAlign, a), s.textAlign = d.textAlign(a.titleAlign), s.textBaseline = "middle", o = kt(a.titleFont), r = a.titleSpacing, s.fillStyle = a.titleColor, s.font = o.string, l = 0; l < i; ++l)
        s.fillText(n[l], d.x(t.x), t.y + o.lineHeight / 2), t.y += o.lineHeight + r, l + 1 === i && (t.y += a.titleMarginBottom - r);
    }
  }
  _drawColorBox(t, s, a, n, i) {
    const o = this.labelColors[a], r = this.labelPointStyles[a], { boxHeight: l, boxWidth: d } = i, u = kt(i.bodyFont), f = ss(this, "left", i), p = n.x(f), g = l < u.lineHeight ? (u.lineHeight - l) / 2 : 0, h = s.y + g;
    if (i.usePointStyle) {
      const b = {
        radius: Math.min(d, l) / 2,
        pointStyle: r.pointStyle,
        rotation: r.rotation,
        borderWidth: 1
      }, v = n.leftForLtr(p, d) + d / 2, m = h + l / 2;
      t.strokeStyle = i.multiKeyBackground, t.fillStyle = i.multiKeyBackground, Hs(t, b, v, m), t.strokeStyle = o.borderColor, t.fillStyle = o.backgroundColor, Hs(t, b, v, m);
    } else {
      t.lineWidth = J(o.borderWidth) ? Math.max(...Object.values(o.borderWidth)) : o.borderWidth || 1, t.strokeStyle = o.borderColor, t.setLineDash(o.borderDash || []), t.lineDashOffset = o.borderDashOffset || 0;
      const b = n.leftForLtr(p, d), v = n.leftForLtr(n.xPlus(p, 1), d - 2), m = ge(o.borderRadius);
      Object.values(m).some((_) => _ !== 0) ? (t.beginPath(), t.fillStyle = i.multiKeyBackground, cs(t, {
        x: b,
        y: h,
        w: d,
        h: l,
        radius: m
      }), t.fill(), t.stroke(), t.fillStyle = o.backgroundColor, t.beginPath(), cs(t, {
        x: v,
        y: h + 1,
        w: d - 2,
        h: l - 2,
        radius: m
      }), t.fill()) : (t.fillStyle = i.multiKeyBackground, t.fillRect(b, h, d, l), t.strokeRect(b, h, d, l), t.fillStyle = o.backgroundColor, t.fillRect(v, h + 1, d - 2, l - 2));
    }
    t.fillStyle = this.labelTextColors[a];
  }
  drawBody(t, s, a) {
    const { body: n } = this, { bodySpacing: i, bodyAlign: o, displayColors: r, boxHeight: l, boxWidth: d, boxPadding: u } = a, f = kt(a.bodyFont);
    let p = f.lineHeight, g = 0;
    const h = pe(a.rtl, this.x, this.width), b = function(F) {
      s.fillText(F, h.x(t.x + g), t.y + p / 2), t.y += p + i;
    }, v = h.textAlign(o);
    let m, _, k, M, S, $, A;
    for (s.textAlign = o, s.textBaseline = "middle", s.font = f.string, t.x = ss(this, v, a), s.fillStyle = a.bodyColor, rt(this.beforeBody, b), g = r && v !== "right" ? o === "center" ? d / 2 + u : d + 2 + u : 0, M = 0, $ = n.length; M < $; ++M) {
      for (m = n[M], _ = this.labelTextColors[M], s.fillStyle = _, rt(m.before, b), k = m.lines, r && k.length && (this._drawColorBox(s, t, M, h, a), p = Math.max(f.lineHeight, l)), S = 0, A = k.length; S < A; ++S)
        b(k[S]), p = f.lineHeight;
      rt(m.after, b);
    }
    g = 0, p = f.lineHeight, rt(this.afterBody, b), t.y -= i;
  }
  drawFooter(t, s, a) {
    const n = this.footer, i = n.length;
    let o, r;
    if (i) {
      const l = pe(a.rtl, this.x, this.width);
      for (t.x = ss(this, a.footerAlign, a), t.y += a.footerMarginTop, s.textAlign = l.textAlign(a.footerAlign), s.textBaseline = "middle", o = kt(a.footerFont), s.fillStyle = a.footerColor, s.font = o.string, r = 0; r < i; ++r)
        s.fillText(n[r], l.x(t.x), t.y + o.lineHeight / 2), t.y += o.lineHeight + a.footerSpacing;
    }
  }
  drawBackground(t, s, a, n) {
    const { xAlign: i, yAlign: o } = this, { x: r, y: l } = t, { width: d, height: u } = a, { topLeft: f, topRight: p, bottomLeft: g, bottomRight: h } = ge(n.cornerRadius);
    s.fillStyle = n.backgroundColor, s.strokeStyle = n.borderColor, s.lineWidth = n.borderWidth, s.beginPath(), s.moveTo(r + f, l), o === "top" && this.drawCaret(t, s, a, n), s.lineTo(r + d - p, l), s.quadraticCurveTo(r + d, l, r + d, l + p), o === "center" && i === "right" && this.drawCaret(t, s, a, n), s.lineTo(r + d, l + u - h), s.quadraticCurveTo(r + d, l + u, r + d - h, l + u), o === "bottom" && this.drawCaret(t, s, a, n), s.lineTo(r + g, l + u), s.quadraticCurveTo(r, l + u, r, l + u - g), o === "center" && i === "left" && this.drawCaret(t, s, a, n), s.lineTo(r, l + f), s.quadraticCurveTo(r, l, r + f, l), s.closePath(), s.fill(), n.borderWidth > 0 && s.stroke();
  }
  _updateAnimationTarget(t) {
    const s = this.chart, a = this.$animations, n = a && a.x, i = a && a.y;
    if (n || i) {
      const o = Ae[t.position].call(this, this._active, this._eventPosition);
      if (!o)
        return;
      const r = this._size = xn(this, t), l = Object.assign({}, o, this._size), d = kn(s, t, l), u = Mn(t, l, d, s);
      (n._to !== u.x || i._to !== u.y) && (this.xAlign = d.xAlign, this.yAlign = d.yAlign, this.width = r.width, this.height = r.height, this.caretX = o.x, this.caretY = o.y, this._resolveAnimations().update(this, u));
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
    const o = Pt(s.padding), r = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    s.enabled && r && (t.save(), t.globalAlpha = a, this.drawBackground(i, t, n, s), di(t, s.textDirection), i.y += o.top, this.drawTitle(i, t, s), this.drawBody(i, t, s), this.drawFooter(i, t, s), ui(t, s.textDirection), t.restore());
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
    }), i = !os(a, n), o = this._positionChanged(n, s);
    (i || o) && (this._active = n, this._eventPosition = s, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, s, a = !0) {
    if (s && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const n = this.options, i = this._active || [], o = this._getActiveElements(t, i, s, a), r = this._positionChanged(o, t), l = s || !os(o, i) || r;
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
    const { caretX: a, caretY: n, options: i } = this, o = Ae[i.position].call(this, t, s);
    return o !== !1 && (a !== o.x || n !== o.y);
  }
}
var ca = {
  id: "tooltip",
  _element: $n,
  positioners: Ae,
  afterInit(e, t, s) {
    s && (e.tooltip = new $n({
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
    callbacks: Oi
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
const Fd = (e, t, s, a) => (typeof t == "string" ? (s = e.push(t) - 1, a.unshift({
  index: s,
  label: t
})) : isNaN(t) && (s = null), s);
function Pd(e, t, s, a) {
  const n = e.indexOf(t);
  if (n === -1)
    return Fd(e, t, s, a);
  const i = e.lastIndexOf(t);
  return n !== i ? s : n;
}
const Ld = (e, t) => e === null ? null : xt(Math.round(e), 0, t);
function Cn(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class Ri extends me {
  static id = "category";
  static defaults = {
    ticks: {
      callback: Cn
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
    if (ot(t))
      return null;
    const a = this.getLabels();
    return s = isFinite(s) && a[s] === t ? s : Pd(a, t, G(s, t), this._addedLabels), Ld(s, a.length - 1);
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
    return Cn.call(this, t);
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
function Ed(e, t) {
  const s = [], { bounds: n, step: i, min: o, max: r, precision: l, count: d, maxTicks: u, maxDigits: f, includeBounds: p } = e, g = i || 1, h = u - 1, { min: b, max: v } = t, m = !ot(o), _ = !ot(r), k = !ot(d), M = (v - b) / (f + 1);
  let S = ka((v - b) / h / g) * g, $, A, F, E;
  if (S < 1e-14 && !m && !_)
    return [
      {
        value: b
      },
      {
        value: v
      }
    ];
  E = Math.ceil(v / S) - Math.floor(b / S), E > h && (S = ka(E * S / h / g) * g), ot(l) || ($ = Math.pow(10, l), S = Math.ceil(S * $) / $), n === "ticks" ? (A = Math.floor(b / S) * S, F = Math.ceil(v / S) * S) : (A = b, F = v), m && _ && i && Lo((r - o) / i, S / 1e3) ? (E = Math.round(Math.min((r - o) / S, u)), S = (r - o) / E, A = o, F = r) : k ? (A = m ? o : A, F = _ ? r : F, E = d - 1, S = (F - A) / E) : (E = (F - A) / S, Be(E, Math.round(E), S / 1e3) ? E = Math.round(E) : E = Math.ceil(E));
  const I = Math.max(Ma(S), Ma(A));
  $ = Math.pow(10, ot(l) ? I : l), A = Math.round(A * $) / $, F = Math.round(F * $) / $;
  let C = 0;
  for (m && (p && A !== o ? (s.push({
    value: o
  }), A < o && C++, Be(Math.round((A + C * S) * $) / $, o, Dn(o, M, e)) && C++) : A < o && C++); C < E; ++C) {
    const T = Math.round((A + C * S) * $) / $;
    if (_ && T > r)
      break;
    s.push({
      value: T
    });
  }
  return _ && p && F !== r ? s.length && Be(s[s.length - 1].value, r, Dn(r, M, e)) ? s[s.length - 1].value = r : s.push({
    value: r
  }) : (!_ || F === r) && s.push({
    value: F
  }), s;
}
function Dn(e, t, { horizontal: s, minRotation: a }) {
  const n = Ht(a), i = (s ? Math.sin(n) : Math.cos(n)) || 1e-3, o = 0.75 * t * ("" + e).length;
  return Math.min(t / i, o);
}
class Od extends me {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, s) {
    return ot(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: s, maxDefined: a } = this.getUserBounds();
    let { min: n, max: i } = this;
    const o = (l) => n = s ? n : l, r = (l) => i = a ? i : l;
    if (t) {
      const l = Rt(n), d = Rt(i);
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
    }, i = this._range || this, o = Ed(n, i);
    return t.bounds === "ticks" && Eo(o, this, "value"), t.reverse ? (o.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), o;
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
    return ta(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class Ii extends Od {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: si.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: s } = this.getMinMax(!0);
    this.min = St(t) ? t : 0, this.max = St(s) ? s : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), s = t ? this.width : this.height, a = Ht(this.options.ticks.minRotation), n = (t ? Math.sin(a) : Math.cos(a)) || 1e-3, i = this._resolveTickFontOptions(0);
    return Math.ceil(s / Math.min(40, i.lineHeight / n));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
const xs = {
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
}, $t = /* @__PURE__ */ Object.keys(xs);
function An(e, t) {
  return e - t;
}
function Tn(e, t) {
  if (ot(t))
    return null;
  const s = e._adapter, { parser: a, round: n, isoWeekday: i } = e._parseOpts;
  let o = t;
  return typeof a == "function" && (o = a(o)), St(o) || (o = typeof a == "string" ? s.parse(o, a) : s.parse(o)), o === null ? null : (n && (o = n === "week" && (Ie(i) || i === !0) ? s.startOf(o, "isoWeek", i) : s.startOf(o, n)), +o);
}
function Bn(e, t, s, a) {
  const n = $t.length;
  for (let i = $t.indexOf(e); i < n - 1; ++i) {
    const o = xs[$t[i]], r = o.steps ? o.steps : Number.MAX_SAFE_INTEGER;
    if (o.common && Math.ceil((s - t) / (r * o.size)) <= a)
      return $t[i];
  }
  return $t[n - 1];
}
function Rd(e, t, s, a, n) {
  for (let i = $t.length - 1; i >= $t.indexOf(s); i--) {
    const o = $t[i];
    if (xs[o].common && e._adapter.diff(n, a, o) >= t - 1)
      return o;
  }
  return $t[s ? $t.indexOf(s) : 0];
}
function Id(e) {
  for (let t = $t.indexOf(e) + 1, s = $t.length; t < s; ++t)
    if (xs[$t[t]].common)
      return $t[t];
}
function Fn(e, t, s) {
  if (!s)
    e[t] = !0;
  else if (s.length) {
    const { lo: a, hi: n } = Zs(s, t), i = s[a] >= t ? s[a] : s[n];
    e[i] = !0;
  }
}
function zd(e, t, s, a) {
  const n = e._adapter, i = +n.startOf(t[0].value, a), o = t[t.length - 1].value;
  let r, l;
  for (r = i; r <= o; r = +n.add(r, 1, a))
    l = s[r], l >= 0 && (t[l].major = !0);
  return t;
}
function Pn(e, t, s) {
  const a = [], n = {}, i = t.length;
  let o, r;
  for (o = 0; o < i; ++o)
    r = t[o], n[r] = o, a.push({
      value: r,
      major: !1
    });
  return i === 0 || !s ? a : zd(e, a, n, s);
}
class Ln extends me {
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
    const a = t.time || (t.time = {}), n = this._adapter = new xl._date(t.adapters.date);
    n.init(s), Te(a.displayFormats, n.formats()), this._parseOpts = {
      parser: a.parser,
      round: a.round,
      isoWeekday: a.isoWeekday
    }, super.init(t), this._normalized = s.normalized;
  }
  parse(t, s) {
    return t === void 0 ? null : Tn(this, t);
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
    (!o || !r) && (l(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && l(this.getMinMax(!1))), n = St(n) && !isNaN(n) ? n : +s.startOf(Date.now(), a), i = St(i) && !isNaN(i) ? i : +s.endOf(Date.now(), a) + 1, this.min = Math.min(n, i - 1), this.max = Math.max(n + 1, i);
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
    const i = this.min, o = this.max, r = No(n, i, o);
    return this._unit = s.unit || (a.autoSkip ? Bn(s.minUnit, this.min, this.max, this._getLabelCapacity(i)) : Rd(this, r.length, s.minUnit, this.min, this.max)), this._majorUnit = !a.major.enabled || this._unit === "year" ? void 0 : Id(this._unit), this.initOffsets(n), t.reverse && r.reverse(), Pn(this, r, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let s = 0, a = 0, n, i;
    this.options.offset && t.length && (n = this.getDecimalForValue(t[0]), t.length === 1 ? s = 1 - n : s = (this.getDecimalForValue(t[1]) - n) / 2, i = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? a = i : a = (i - this.getDecimalForValue(t[t.length - 2])) / 2);
    const o = t.length < 3 ? 0.5 : 0.25;
    s = xt(s, 0, o), a = xt(a, 0, o), this._offsets = {
      start: s,
      end: a,
      factor: 1 / (s + 1 + a)
    };
  }
  _generate() {
    const t = this._adapter, s = this.min, a = this.max, n = this.options, i = n.time, o = i.unit || Bn(i.minUnit, s, a, this._getLabelCapacity(s)), r = G(n.ticks.stepSize, 1), l = o === "week" ? i.isoWeekday : !1, d = Ie(l) || l === !0, u = {};
    let f = s, p, g;
    if (d && (f = +t.startOf(f, "isoWeek", l)), f = +t.startOf(f, d ? "day" : o), t.diff(a, s, o) > 1e5 * r)
      throw new Error(s + " and " + a + " are too far apart with stepSize of " + r + " " + o);
    const h = n.ticks.source === "data" && this.getDataTimestamps();
    for (p = f, g = 0; p < a; p = +t.add(p, r, o), g++)
      Fn(u, p, h);
    return (p === a || n.bounds === "ticks" || g === 1) && Fn(u, p, h), Object.keys(u).sort(An).map((b) => +b);
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
      return ht(o, [
        t,
        s,
        a
      ], this);
    const r = i.time.displayFormats, l = this._unit, d = this._majorUnit, u = l && r[l], f = d && r[d], p = a[s], g = d && f && p && p.major;
    return this._adapter.format(t, n || (g ? f : u));
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
    const s = this.options.ticks, a = this.ctx.measureText(t).width, n = Ht(this.isHorizontal() ? s.maxRotation : s.minRotation), i = Math.cos(n), o = Math.sin(n), r = this._resolveTickFontOptions(0).size;
    return {
      w: a * i + r * o,
      h: a * o + r * i
    };
  }
  _getLabelCapacity(t) {
    const s = this.options.time, a = s.displayFormats, n = a[s.unit] || a.millisecond, i = this._tickFormatFunction(t, 0, Pn(this, [
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
      t.push(Tn(this, n[s]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return Jn(t.sort(An));
  }
}
function as(e, t, s) {
  let a = 0, n = e.length - 1, i, o, r, l;
  s ? (t >= e[a].pos && t <= e[n].pos && ({ lo: a, hi: n } = ie(e, "pos", t)), { pos: i, time: r } = e[a], { pos: o, time: l } = e[n]) : (t >= e[a].time && t <= e[n].time && ({ lo: a, hi: n } = ie(e, "time", t)), { time: i, pos: r } = e[a], { time: o, pos: l } = e[n]);
  const d = o - i;
  return d ? r + (l - r) * (t - i) / d : r;
}
class y5 extends Ln {
  static id = "timeseries";
  static defaults = Ln.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), s = this._table = this.buildLookupTable(t);
    this._minPos = as(s, this.min), this._tableRange = as(s, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: s, max: a } = this, n = [], i = [];
    let o, r, l, d, u;
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
      u = n[o + 1], l = n[o - 1], d = n[o], Math.round((u + l) / 2) !== d && i.push({
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
    return (as(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const s = this._offsets, a = this.getDecimalForPixel(t) / s.factor - s.end;
    return as(this._table, a * this._tableRange + this._minPos, !0);
  }
}
const zi = {
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
}, Wd = {
  type: {
    type: String,
    required: !0
  },
  destroyDelay: {
    type: Number,
    default: 0
    // No delay by default
  },
  ...zi,
  ...Nd
}, Hd = Ui[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function fe(e) {
  return jn(e) ? Is(e) : e;
}
function Vd(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return jn(t) ? new Proxy(e, {}) : e;
}
function jd(e, t) {
  const s = e.options;
  s && t && Object.assign(s, t);
}
function Ni(e, t) {
  e.labels = t;
}
function Wi(e, t, s) {
  const a = [];
  e.datasets = t.map((n) => {
    const i = e.datasets.find((o) => o[s] === n[s]);
    return !i || !n.data || a.includes(i) ? {
      ...n
    } : (a.push(i), Object.assign(i, n), i);
  });
}
function Yd(e, t) {
  const s = {
    labels: [],
    datasets: []
  };
  return Ni(s, e.labels), Wi(s, e.datasets, t), s;
}
const qd = tt({
  props: Wd,
  setup(e, t) {
    let { expose: s, slots: a } = t;
    const n = Mt(null), i = Wn(null);
    s({
      chart: i
    });
    const o = () => {
      if (!n.value) return;
      const { type: d, data: u, options: f, plugins: p, datasetIdKey: g } = e, h = Yd(u, g), b = Vd(h, u);
      i.value = new _e(n.value, {
        type: d,
        data: b,
        options: {
          ...f
        },
        plugins: p
      });
    }, r = () => {
      const d = Is(i.value);
      d && (e.destroyDelay > 0 ? setTimeout(() => {
        d.destroy(), i.value = null;
      }, e.destroyDelay) : (d.destroy(), i.value = null));
    }, l = (d) => {
      d.update(e.updateMode);
    };
    return fs(o), Hn(r), jt([
      () => e.options,
      () => e.data
    ], (d, u) => {
      let [f, p] = d, [g, h] = u;
      const b = Is(i.value);
      if (!b)
        return;
      let v = !1;
      if (f) {
        const m = fe(f), _ = fe(g);
        m && m !== _ && (jd(b, m), v = !0);
      }
      if (p) {
        const m = fe(p.labels), _ = fe(h.labels), k = fe(p.datasets), M = fe(h.datasets);
        m !== _ && (Ni(b.config.data, m), v = !0), k && k !== M && (Wi(b.config.data, k, e.datasetIdKey), v = !0);
      }
      v && Vn(() => {
        l(b);
      });
    }, {
      deep: !0
    }), () => Rs("canvas", {
      role: "img",
      "aria-label": e.ariaLabel,
      "aria-describedby": e.ariaDescribedby,
      ref: n
    }, [
      Rs("p", {}, [
        a.default ? a.default() : ""
      ])
    ]);
  }
});
function da(e, t) {
  return _e.register(t), tt({
    props: zi,
    setup(s, a) {
      let { expose: n } = a;
      const i = Wn(null), o = (r) => {
        i.value = r?.chart;
      };
      return n({
        chart: i
      }), () => Rs(qd, Hd({
        ref: o
      }, {
        type: e,
        ...s
      }));
    }
  });
}
const Ud = /* @__PURE__ */ da("bar", bl), Kd = /* @__PURE__ */ da("line", _l), Xd = /* @__PURE__ */ da("pie", yl), En = {
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
}, On = {
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
}, Gd = [
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
function at(e) {
  const t = Mt("light");
  let s = null;
  const a = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", n = D(() => e?.value ? e.value : t.value), i = D(() => n.value === "dark"), o = D(() => i.value ? On : En), r = () => {
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
  return fs(() => {
    r();
  }), Hn(() => {
    l();
  }), e && jt(e, () => {
  }), {
    isDark: i,
    currentTheme: n,
    colors: o,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: En,
    darkColors: On,
    chartSeriesColors: Gd
  };
}
const Zd = { class: "chart-container" }, Qd = /* @__PURE__ */ tt({
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
      Ri,
      Ii,
      Qc,
      Ei,
      ca,
      la
    );
    const { isDark: a, colors: n } = at(st(s, "theme")), i = s.data, o = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = D(() => s.options ? s.options : {
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
            return l.data.datasets.map((u, f) => ({
              text: o(u.label || ""),
              fillStyle: Array.isArray(u.backgroundColor) ? u.backgroundColor[0] : u.backgroundColor,
              strokeStyle: Array.isArray(u.borderColor) ? u.borderColor[0] : u.borderColor,
              lineWidth: u.borderWidth,
              hidden: !l.isDatasetVisible(f),
              index: f,
              datasetIndex: f
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
    return t({ isDark: a }), (l, d) => (y(), x("div", Zd, [
      U(B(Ud), {
        data: B(i),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), Q = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [a, n] of t)
    s[a] = n;
  return s;
}, Zt = /* @__PURE__ */ Q(Qd, [["__scopeId", "data-v-105d8c6f"]]), Jd = { class: "chart-container" }, tu = /* @__PURE__ */ tt({
  __name: "ChartLine",
  props: {
    data: {},
    options: {},
    theme: {}
  },
  setup(e, { expose: t }) {
    const s = e;
    _e.register(
      Ri,
      Ii,
      qc,
      _s,
      Ei,
      ca,
      la,
      md
    );
    const { isDark: a, colors: n } = at(st(s, "theme")), i = s.data, o = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = D(() => s.options ? s.options : {
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
              return l.data.datasets.map((u, f) => ({
                text: o(u.label || ""),
                fillStyle: u.backgroundColor,
                strokeStyle: u.borderColor,
                lineWidth: u.borderWidth,
                hidden: !l.isDatasetVisible(f),
                index: f,
                datasetIndex: f
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
    return t({ isDark: a }), (l, d) => (y(), x("div", Jd, [
      U(B(Kd), {
        data: B(i),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), Qt = /* @__PURE__ */ Q(tu, [["__scopeId", "data-v-bacd3848"]]), eu = { class: "chart-container" }, su = /* @__PURE__ */ tt({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const s = e;
    _e.register(Oc, ca, la);
    const { isDark: a, colors: n } = at(st(s, "theme")), i = s.data, o = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = D(() => s.options ? s.options : {
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
              return d.labels.length && d.datasets.length ? d.labels.map((u, f) => {
                const p = l.getDatasetMeta(0), g = d.datasets[0], h = g.data[f], b = Array.isArray(g.backgroundColor) ? g.backgroundColor[f] : g.backgroundColor;
                return {
                  text: `${o(u)}: ${h}`,
                  fillStyle: b,
                  hidden: p.data[f]?.hidden || !1,
                  index: f
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
              const d = l.label || "", u = l.parsed || 0, f = l.dataset.data.reduce((g, h) => g + h, 0), p = (u / f * 100).toFixed(1);
              return `${o(d)}: ${u} (${p}%)`;
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
    return t({ isDark: a }), (l, d) => (y(), x("div", eu, [
      U(B(Xd), {
        data: B(i),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), ks = /* @__PURE__ */ Q(su, [["__scopeId", "data-v-23a84317"]]), au = { class: "chart-container" }, nu = ["viewBox"], iu = ["transform"], ou = ["x", "width", "fill", "stroke"], ru = ["fill"], lu = ["x1", "y1", "x2", "y2", "stroke"], cu = ["points", "fill"], du = ["x1", "y1", "x2", "y2", "stroke"], uu = ["x", "y", "fill"], hu = ["x1", "y1", "x2", "y2", "stroke"], fu = ["points", "fill"], gu = ["transform"], pu = ["y1", "y2"], bu = ["y1", "y2"], vu = ["y1", "y2"], mu = ["y1", "y2"], _u = ["y", "height"], yu = ["y1", "y2"], xu = ["y1", "y2"], ku = ["y1", "y2"], Mu = ["y1", "y2"], Su = ["y", "height"], wu = ["cy", "stroke", "onMouseenter"], $u = ["cy", "stroke", "onMouseenter"], Cu = ["cy", "stroke", "onMouseenter"], Du = ["cy", "stroke", "onMouseenter"], Au = ["y1", "y2", "onMouseenter"], Tu = ["y1", "y2", "onMouseenter"], Bu = ["x", "y", "fill"], Fu = ["x", "y", "fill"], Pu = ["transform"], Lu = { transform: "translate(-200, 0)" }, Eu = ["stroke"], Ou = ["fill"], Ru = { transform: "translate(-130, 0)" }, Iu = ["stroke"], zu = ["fill"], Nu = { transform: "translate(-60, 0)" }, Wu = ["stroke"], Hu = ["fill"], Vu = { transform: "translate(10, 0)" }, ju = ["stroke"], Yu = ["fill"], qu = { transform: "translate(80, 0)" }, Uu = ["fill"], Ku = { transform: "translate(150, 0)" }, Xu = ["fill"], Gu = /* @__PURE__ */ tt({
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
    const s = e, { isDark: a } = at(st(s, "theme")), n = D(() => ({
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
    })), i = Mt({
      visible: !1,
      x: 0,
      y: 0,
      text: ""
    }), o = (p) => typeof p == "string" ? p.charAt(0).toUpperCase() + p.slice(1).toLowerCase() : p, r = (p, g) => {
      const h = p.currentTarget.closest("svg");
      if (!h) return;
      const b = h.getBoundingClientRect(), v = h.createSVGPoint();
      v.x = p.clientX - b.left, v.y = p.clientY - b.top, i.value = {
        visible: !0,
        x: v.x,
        y: v.y - 20,
        text: g
      };
    }, l = (p) => {
      if (i.value.visible) {
        const g = p.currentTarget, h = g.getBoundingClientRect(), b = g.createSVGPoint();
        b.x = p.clientX - h.left, b.y = p.clientY - h.top, i.value.x = b.x, i.value.y = b.y - 20;
      }
    }, d = () => {
      i.value.visible = !1;
    }, u = () => {
      i.value.visible = !1;
    }, f = D(() => {
      const p = [], h = s.chartHeight - s.chartMargin - s.chartBottomMargin;
      for (let b = 1; b <= 10; b++) {
        const v = b, m = (v - 1) / 9, _ = s.chartMargin + h - m * h;
        p.push({ value: v, y: _ });
      }
      return p;
    });
    return t({ isDark: a }), (p, g) => (y(), x("div", au, [
      (y(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: _t(`min-height: ${e.chartHeight}px;`),
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
          }, null, 8, ou),
          c("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: n.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, w(i.value.text), 9, ru)
        ], 8, iu)) : N("", !0),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, lu),
        c("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: n.value.axis
        }, null, 8, cu),
        (y(!0), x(j, null, Z(f.value, (h, b) => (y(), x(j, { key: b }, [
          c("line", {
            x1: e.chartMargin - 6,
            y1: h.y,
            x2: e.chartMargin,
            y2: h.y,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, du),
          c("text", {
            x: e.chartMargin - 12,
            y: h.y + 4,
            "text-anchor": "end",
            fill: n.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, w(h.value), 9, uu)
        ], 64))), 128)),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, hu),
        c("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: n.value.axis
        }, null, 8, fu),
        (y(!0), x(j, null, Z(e.boxplotData, (h, b) => (y(), x(j, { key: b }, [
          c("g", {
            transform: `translate(${h.centerX}, 0)`
          }, [
            h.isTotal ? (y(), x(j, { key: 0 }, [
              c("line", {
                x1: 0,
                y1: h.minY,
                x2: 0,
                y2: h.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, pu),
              c("line", {
                x1: 0,
                y1: h.q3Y,
                x2: 0,
                y2: h.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, bu),
              c("line", {
                x1: -18,
                y1: h.minY,
                x2: 18,
                y2: h.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, vu),
              c("line", {
                x1: -18,
                y1: h.maxY,
                x2: 18,
                y2: h.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, mu),
              c("rect", {
                x: -24,
                y: h.q3Y,
                width: "48",
                height: h.q1Y - h.q3Y,
                fill: "#8b5cf6",
                "fill-opacity": "0.15",
                stroke: "#8b5cf6",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, _u)
            ], 64)) : (y(), x(j, { key: 1 }, [
              c("line", {
                x1: 0,
                y1: h.minY,
                x2: 0,
                y2: h.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, yu),
              c("line", {
                x1: 0,
                y1: h.q3Y,
                x2: 0,
                y2: h.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, xu),
              c("line", {
                x1: -18,
                y1: h.minY,
                x2: 18,
                y2: h.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, ku),
              c("line", {
                x1: -18,
                y1: h.maxY,
                x2: 18,
                y2: h.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Mu),
              c("rect", {
                x: -24,
                y: h.q3Y,
                width: "48",
                height: h.q1Y - h.q3Y,
                fill: "#C67DFF",
                "fill-opacity": "0.15",
                stroke: "#C67DFF",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, Su)
            ], 64)),
            c("circle", {
              cx: 0,
              cy: h.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => r(v, `Min: ${h.min.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, wu),
            c("circle", {
              cx: 0,
              cy: h.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => r(v, `Q1: ${h.q1.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, $u),
            c("circle", {
              cx: 0,
              cy: h.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => r(v, `Q3: ${h.q3.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Cu),
            c("circle", {
              cx: 0,
              cy: h.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => r(v, `Max: ${h.max.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Du),
            c("line", {
              x1: -24,
              y1: h.medianY,
              x2: 24,
              y2: h.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (v) => r(v, `Median: ${h.median.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Au),
            h.averageY ? (y(), x("line", {
              key: 2,
              x1: -24,
              y1: h.averageY,
              x2: 24,
              y2: h.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (v) => r(v, `Avg: ${h.average.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Tu)) : N("", !0)
          ], 8, gu),
          c("text", {
            x: h.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: n.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, w(o(h.label)), 9, Bu),
          h.responseCount ? (y(), x("text", {
            key: 0,
            x: h.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: n.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + w(h.responseCount), 9, Fu)) : N("", !0)
        ], 64))), 128)),
        e.showLegend ? (y(), x("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          c("g", Lu, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Eu),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Ou)
          ]),
          c("g", Ru, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Iu),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, zu)
          ]),
          c("g", Nu, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Wu),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, Hu)
          ]),
          c("g", Vu, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, ju),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Yu)
          ]),
          c("g", qu, [
            g[0] || (g[0] = c("line", {
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
            }, " Avg ", 8, Uu)
          ]),
          c("g", Ku, [
            g[1] || (g[1] = c("line", {
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
            }, " Median ", 8, Xu)
          ])
        ], 8, Pu)) : N("", !0)
      ], 44, nu))
    ]));
  }
}), Zu = /* @__PURE__ */ Q(Gu, [["__scopeId", "data-v-520c623f"]]), Qu = { class: "chart-container" }, Ju = ["viewBox"], th = ["transform"], eh = ["x", "y", "width", "height", "fill", "stroke"], sh = ["y", "fill"], ah = ["y", "fill"], nh = ["x1", "y1", "x2", "y2", "stroke"], ih = ["points", "fill"], oh = ["x1", "y1", "x2", "y2", "stroke"], rh = ["x1", "y1", "x2", "y2", "stroke"], lh = ["x", "y", "fill"], ch = ["x", "y", "fill", "transform"], dh = ["x1", "y1", "x2", "y2", "stroke"], uh = ["points", "fill"], hh = ["transform"], fh = ["y1", "y2", "stroke", "onMouseenter"], gh = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], ph = ["x1", "y1", "x2", "y2", "onMouseenter"], bh = ["x1", "y1", "x2", "y2", "onMouseenter"], vh = ["cy", "stroke", "onMouseenter"], mh = ["cy", "stroke", "onMouseenter"], _h = ["x", "y", "fill"], yh = ["x", "y", "fill"], xh = ["transform"], kh = { transform: "translate(-180, 0)" }, Mh = ["stroke"], Sh = ["fill"], wh = { transform: "translate(-120, 0)" }, $h = ["fill"], Ch = { transform: "translate(-60, 0)" }, Dh = ["fill"], Ah = { transform: "translate(0, 0)" }, Th = ["stroke"], Bh = ["fill"], Fh = { transform: "translate(60, 0)" }, Ph = ["fill"], Lh = { transform: "translate(130, 0)" }, Eh = ["fill"], Oh = /* @__PURE__ */ tt({
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
    const s = e, { isDark: a } = at(st(s, "theme")), n = D(() => ({
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
    })), i = Mt({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), o = (p) => typeof p == "string" ? p.charAt(0).toUpperCase() + p.slice(1).toLowerCase() : p, r = (p, g, h) => {
      const b = p.currentTarget.closest("svg");
      if (!b) return;
      const v = b.getBoundingClientRect(), m = b.createSVGPoint();
      m.x = p.clientX - v.left, m.y = p.clientY - v.top;
      let _ = o(g.label), k = "";
      switch (h) {
        case "body":
          k = `Q1: ${g.q1.toFixed(1)} | Q3: ${g.q3.toFixed(1)}`;
          break;
        case "wick":
          k = `Min: ${g.low.toFixed(1)} | Max: ${g.high.toFixed(1)}`;
          break;
        case "median":
          k = `Median: ${g.median.toFixed(1)}`;
          break;
        case "average":
          k = `Average: ${g.average?.toFixed(1)}`;
          break;
        case "min":
          k = `Min: ${g.low.toFixed(1)}`;
          break;
        case "max":
          k = `Max: ${g.high.toFixed(1)}`;
          break;
      }
      const M = Math.max(180, k.length * 7 + 40), S = 48;
      i.value = {
        visible: !0,
        x: m.x,
        y: m.y - 20,
        title: _,
        text: k,
        width: M,
        height: S
      };
    }, l = (p) => {
      if (i.value.visible) {
        const g = p.currentTarget, h = g.getBoundingClientRect(), b = g.createSVGPoint();
        b.x = p.clientX - h.left, b.y = p.clientY - h.top, i.value.x = b.x, i.value.y = b.y - 20;
      }
    }, d = () => {
      i.value.visible = !1;
    }, u = () => {
      i.value.visible = !1;
    }, f = D(() => {
      const p = [], h = s.chartHeight - s.chartMargin - s.chartBottomMargin;
      for (let b = 1; b <= 10; b++) {
        const v = b, m = (v - 1) / 9, _ = s.chartMargin + h - m * h;
        p.push({ value: v, y: _ });
      }
      return p;
    });
    return t({ isDark: a }), (p, g) => (y(), x("div", Qu, [
      (y(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: _t(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
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
          }, null, 8, eh),
          c("text", {
            x: "0",
            y: -i.value.height + 8,
            "text-anchor": "middle",
            fill: n.value.tooltipText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, w(i.value.title), 9, sh),
          c("text", {
            x: "0",
            y: -i.value.height + 26,
            "text-anchor": "middle",
            fill: n.value.tooltipTextSecondary,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, w(i.value.text), 9, ah)
        ], 8, th)) : N("", !0),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, nh),
        c("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: n.value.axis
        }, null, 8, ih),
        (y(!0), x(j, null, Z(f.value, (h, b) => (y(), x("line", {
          key: `grid-${b}`,
          x1: e.chartMargin,
          y1: h.y,
          x2: e.chartWidth - e.chartMargin,
          y2: h.y,
          stroke: n.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, oh))), 128)),
        (y(!0), x(j, null, Z(f.value, (h, b) => (y(), x(j, { key: b }, [
          c("line", {
            x1: e.chartMargin - 6,
            y1: h.y,
            x2: e.chartMargin,
            y2: h.y,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, rh),
          c("text", {
            x: e.chartMargin - 12,
            y: h.y + 4,
            "text-anchor": "end",
            fill: n.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, w(h.value), 9, lh)
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
        }, w(o(e.yAxisLabel)), 9, ch),
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
        }, null, 8, uh),
        (y(!0), x(j, null, Z(e.candlestickData, (h, b) => (y(), x(j, { key: b }, [
          c("g", {
            transform: `translate(${h.centerX}, 0)`
          }, [
            c("line", {
              x1: 0,
              y1: h.highY,
              x2: 0,
              y2: h.lowY,
              stroke: h.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              class: "hover-line",
              onMouseenter: (v) => r(v, h, "wick"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, fh),
            c("rect", {
              x: -e.candleWidth / 2,
              y: Math.min(h.q1Y, h.q3Y) - (Math.abs(h.q3Y - h.q1Y) < 4 ? 4 : 0),
              width: e.candleWidth,
              height: Math.max(8, Math.abs(h.q3Y - h.q1Y)),
              fill: h.isTotal ? "rgba(139, 92, 246, 0.15)" : "rgba(198, 125, 255, 0.15)",
              stroke: h.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              rx: "4",
              class: "hover-rect",
              onMouseenter: (v) => r(v, h, "body"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, gh),
            h.medianY ? (y(), x("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: h.medianY,
              x2: e.candleWidth / 2,
              y2: h.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (v) => r(v, h, "median"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, ph)) : N("", !0),
            h.averageY ? (y(), x("line", {
              key: 1,
              x1: -e.candleWidth / 2,
              y1: h.averageY,
              x2: e.candleWidth / 2,
              y2: h.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (v) => r(v, h, "average"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, bh)) : N("", !0),
            c("circle", {
              cx: 0,
              cy: h.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => r(v, h, "min"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, vh),
            c("circle", {
              cx: 0,
              cy: h.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => r(v, h, "max"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, mh)
          ], 8, hh),
          c("text", {
            x: h.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: n.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, w(o(h.label)), 9, _h),
          h.responseCount ? (y(), x("text", {
            key: 0,
            x: h.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: n.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + w(h.responseCount), 9, yh)) : N("", !0)
        ], 64))), 128)),
        e.showLegend ? (y(), x("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          c("g", kh, [
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
          c("g", wh, [
            g[0] || (g[0] = c("rect", {
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
            }, " Q1 ", 8, $h)
          ]),
          c("g", Ch, [
            g[1] || (g[1] = c("rect", {
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
            }, " Q3 ", 8, Dh)
          ]),
          c("g", Ah, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Th),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Bh)
          ]),
          c("g", Fh, [
            g[2] || (g[2] = c("line", {
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
            }, " Avg ", 8, Ph)
          ]),
          c("g", Lh, [
            g[3] || (g[3] = c("line", {
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
            }, " Median ", 8, Eh)
          ])
        ], 8, xh)) : N("", !0)
      ], 44, Ju))
    ]));
  }
}), Hi = /* @__PURE__ */ Q(Oh, [["__scopeId", "data-v-61d0259c"]]), Rh = { class: "chart-container" }, Ih = ["viewBox"], zh = ["transform"], Nh = ["x", "y", "width", "height", "fill", "stroke"], Wh = ["y", "fill"], Hh = ["y", "fill"], Vh = ["x1", "y1", "x2", "y2", "stroke"], jh = ["x1", "y1", "x2", "y2", "stroke"], Yh = ["points", "fill"], qh = ["x1", "y1", "x2", "y2", "stroke"], Uh = ["x", "y", "fill"], Kh = ["x", "y", "fill", "transform"], Xh = ["x1", "y1", "x2", "y2", "stroke"], Gh = ["points", "fill"], Zh = ["x1", "y1", "x2", "y2", "stroke"], Qh = ["x", "y", "fill"], Jh = ["x", "y", "fill"], tf = ["d"], ef = ["x", "y", "width", "height", "onMouseenter"], sf = ["x1", "y1", "x2", "y2"], af = ["x", "y"], nf = ["x1", "y1", "x2", "y2"], of = ["x", "y"], rf = ["x1", "y1", "x2", "y2"], lf = ["x", "y"], cf = ["x1", "y1", "x2", "y2"], df = ["x", "y"], uf = ["x1", "y1", "x2", "y2"], hf = ["x", "y"], ff = ["x1", "y1", "x2", "y2"], gf = ["x", "y"], pf = ["transform"], bf = { transform: "translate(-220, 0)" }, vf = ["fill"], mf = { transform: "translate(-140, 0)" }, _f = ["fill"], yf = { transform: "translate(-80, 0)" }, xf = ["fill"], kf = { transform: "translate(-20, 0)" }, Mf = ["fill"], Sf = { transform: "translate(60, 0)" }, wf = ["fill"], $f = { transform: "translate(130, 0)" }, Cf = ["fill"], Df = { transform: "translate(180, 0)" }, Af = ["fill"], Tf = /* @__PURE__ */ tt({
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
    const s = e, { isDark: a } = at(st(s, "theme")), n = D(() => ({
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
    })), i = Mt({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), o = D(() => s.chartWidth - s.chartMargin * 2), r = D(() => s.chartHeight - s.chartMargin - s.chartBottomMargin), l = D(() => o.value / 10 * 0.6), d = D(() => {
      if (!s.histogram || s.histogram.length === 0) return 1;
      const H = Math.max(...s.histogram.map((O) => O.count || 0), 1), z = Math.max(1, Math.ceil(H * 0.2));
      return H + z;
    }), u = D(() => {
      if (!s.histogram || s.histogram.length === 0) return 1;
      const H = s.averageScore || 0;
      let z = 0, O = 0;
      if (s.histogram.forEach((nt) => {
        const et = nt.count || 0;
        z += et;
        const dt = nt.score - H;
        O += et * (dt * dt);
      }), z === 0) return 1;
      const X = O / z;
      return Math.sqrt(X) || 1;
    }), f = (H, z, O) => {
      if (O === 0) return 0;
      const X = 1 / (O * Math.sqrt(2 * Math.PI)), nt = -0.5 * Math.pow((H - z) / O, 2);
      return X * Math.exp(nt);
    }, p = D(() => {
      if (!s.histogram || s.histogram.length === 0 || s.averageScore === 0 && u.value === 0) return null;
      const H = s.averageScore, z = u.value, O = 100, nt = Math.max(...s.histogram.map((ct) => ct.count || 0), 1) / d.value * r.value;
      if (nt <= 0) return null;
      let et = 0;
      for (let ct = 0; ct <= O; ct++) {
        const q = 1 + 9 * (ct / O), At = f(q, H, z);
        At > et && (et = At);
      }
      if (et <= 0) return null;
      const dt = nt / et, bt = [];
      for (let ct = 0; ct <= O; ct++) {
        const q = 1 + 9 * (ct / O), At = f(q, H, z) * dt, ye = h(q);
        if (ye !== null) {
          const je = s.chartHeight - s.chartBottomMargin - At;
          bt.push(`${ct === 0 ? "M" : "L"} ${ye} ${je}`);
        }
      }
      return bt.join(" ");
    }), g = D(() => {
      if (!s.histogram || s.histogram.length === 0) return [];
      const H = o.value / 10;
      return s.histogram.map((z, O) => {
        const X = s.chartMargin + (O + 0.5) * H, nt = z.count > 0 ? z.count / d.value * r.value : 0, et = s.chartHeight - s.chartBottomMargin - nt;
        return {
          score: z.score,
          count: z.count,
          x: X,
          y: et,
          height: nt
        };
      });
    }), h = (H) => {
      if (H < 1 || H > 10) return null;
      const z = o.value / 10;
      return s.chartMargin + (H - 0.5) * z;
    }, b = D(() => h(s.minScore)), v = D(() => h(s.maxScore)), m = D(() => h(s.q1Score)), _ = D(() => h(s.medianScore)), k = D(() => h(s.q3Score)), M = D(() => h(s.averageScore)), S = D(() => s.minScore), $ = D(() => s.maxScore), A = D(() => s.q1Score), F = D(() => s.medianScore), E = D(() => s.q3Score), I = D(() => s.averageScore), C = D(() => {
      const H = [], z = s.chartMargin - 8, O = 18;
      m.value !== null && H.push({
        x: m.value,
        y: z,
        value: s.q1Score,
        label: `Q1: ${A.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), _.value !== null && H.push({
        x: _.value,
        y: z - O,
        value: s.medianScore,
        label: `Median: ${F.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), M.value !== null && H.push({
        x: M.value,
        y: z - O,
        value: s.averageScore,
        label: `Avg: ${I.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), k.value !== null && H.push({
        x: k.value,
        y: z,
        value: s.q3Score,
        label: `Q3: ${E.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), H.sort((et, dt) => (et.x || 0) - (dt.x || 0));
      const X = [[], [], []];
      H.forEach((et) => {
        if (et.x === null) return;
        let dt = -1;
        for (let bt = 0; bt < X.length; bt++) {
          let ct = !1;
          for (const q of X[bt]) {
            if (q.x === null) continue;
            const At = Math.abs(et.x - q.x), ye = (et.width + q.width) / 2 + 10;
            if (At < ye) {
              ct = !0;
              break;
            }
          }
          if (!ct) {
            dt = bt;
            break;
          }
        }
        dt === -1 && (dt = X.length - 1), et.y = z - dt * O, X[dt].push(et);
      });
      const nt = 15;
      return H.forEach((et) => {
        et.y < nt && (et.y = nt);
      }), H;
    }), T = (H) => C.value.find((O) => O.id === H)?.y || s.chartMargin - 10, L = D(() => {
      const H = [];
      for (let O = 0; O <= 5; O++) {
        const X = Math.round(d.value / 5 * O), nt = s.chartHeight - s.chartBottomMargin - O / 5 * r.value;
        H.push({ value: X, y: nt });
      }
      return H;
    }), P = (H, z) => {
      const O = H.currentTarget.closest("svg");
      if (!O) return;
      const X = O.getBoundingClientRect(), nt = O.createSVGPoint();
      nt.x = H.clientX - X.left, nt.y = H.clientY - X.top;
      const et = `Score: ${z.score}`, dt = `Count: ${z.count}`, bt = 120, ct = 48;
      i.value = {
        visible: !0,
        x: nt.x,
        y: nt.y - 20,
        title: et,
        text: dt,
        width: bt,
        height: ct
      };
    }, R = (H) => {
      if (i.value.visible) {
        const z = H.currentTarget, O = z.getBoundingClientRect(), X = z.createSVGPoint();
        X.x = H.clientX - O.left, X.y = H.clientY - O.top, i.value.x = X.x, i.value.y = X.y - 20;
      }
    }, V = () => {
      i.value.visible = !1;
    }, K = () => {
      i.value.visible = !1;
    };
    return t({ isDark: a }), (H, z) => (y(), x("div", Rh, [
      (y(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: _t(`min-height: ${e.chartHeight}px;`),
        onMousemove: R,
        onMouseleave: V
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
          }, null, 8, Nh),
          c("text", {
            x: "0",
            y: -i.value.height + 8,
            "text-anchor": "middle",
            fill: n.value.tooltipText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, w(i.value.title), 9, Wh),
          c("text", {
            x: "0",
            y: -i.value.height + 26,
            "text-anchor": "middle",
            fill: n.value.tooltipTextSecondary,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, w(i.value.text), 9, Hh)
        ], 8, zh)) : N("", !0),
        (y(!0), x(j, null, Z(L.value, (O, X) => (y(), x("line", {
          key: `grid-${X}`,
          x1: e.chartMargin,
          y1: O.y,
          x2: e.chartWidth - e.chartMargin,
          y2: O.y,
          stroke: n.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Vh))), 128)),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, jh),
        c("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: n.value.axis
        }, null, 8, Yh),
        (y(!0), x(j, null, Z(L.value, (O, X) => (y(), x(j, {
          key: `y-tick-${X}`
        }, [
          c("line", {
            x1: e.chartMargin - 6,
            y1: O.y,
            x2: e.chartMargin,
            y2: O.y,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, qh),
          c("text", {
            x: e.chartMargin - 12,
            y: O.y + 4,
            "text-anchor": "end",
            fill: n.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, w(O.value), 9, Uh)
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
        }, " Count ", 8, Kh),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, Xh),
        c("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: n.value.axis
        }, null, 8, Gh),
        (y(!0), x(j, null, Z(g.value, (O, X) => (y(), x(j, {
          key: `tick-${X}`
        }, [
          c("line", {
            x1: O.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: O.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Zh),
          c("text", {
            x: O.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: n.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, w(O.score), 9, Qh)
        ], 64))), 128)),
        c("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: n.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, Jh),
        p.value ? (y(), x("path", {
          key: 1,
          d: p.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, tf)) : N("", !0),
        (y(!0), x(j, null, Z(g.value, (O, X) => (y(), x("rect", {
          key: `bar-${X}`,
          x: O.x - l.value / 2,
          y: O.y,
          width: l.value,
          height: O.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (nt) => P(nt, O),
          onMouseleave: K,
          style: { cursor: "pointer" }
        }, null, 40, ef))), 128)),
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
        }, null, 8, sf)) : N("", !0),
        b.value ? (y(), x("text", {
          key: 3,
          x: b.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + w(S.value.toFixed(1)), 9, af)) : N("", !0),
        m.value ? (y(), x("line", {
          key: 4,
          x1: m.value,
          y1: e.chartMargin,
          x2: m.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, nf)) : N("", !0),
        m.value ? (y(), x("text", {
          key: 5,
          x: m.value,
          y: T("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + w(A.value.toFixed(1)), 9, of)) : N("", !0),
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
        }, null, 8, rf)) : N("", !0),
        _.value ? (y(), x("text", {
          key: 7,
          x: _.value,
          y: T("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + w(F.value.toFixed(1)), 9, lf)) : N("", !0),
        M.value ? (y(), x("line", {
          key: 8,
          x1: M.value,
          y1: e.chartMargin,
          x2: M.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, cf)) : N("", !0),
        M.value ? (y(), x("text", {
          key: 9,
          x: M.value,
          y: T("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + w(I.value.toFixed(1)), 9, df)) : N("", !0),
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
        }, null, 8, uf)) : N("", !0),
        k.value ? (y(), x("text", {
          key: 11,
          x: k.value,
          y: T("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + w(E.value.toFixed(1)), 9, hf)) : N("", !0),
        v.value ? (y(), x("line", {
          key: 12,
          x1: v.value,
          y1: e.chartMargin,
          x2: v.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, ff)) : N("", !0),
        v.value ? (y(), x("text", {
          key: 13,
          x: v.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + w($.value.toFixed(1)), 9, gf)) : N("", !0),
        e.showLegend ? (y(), x("g", {
          key: 14,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          c("g", bf, [
            z[0] || (z[0] = c("line", {
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
            }, " Gaussian ", 8, vf)
          ]),
          c("g", mf, [
            z[1] || (z[1] = c("line", {
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
            }, " Min ", 8, _f)
          ]),
          c("g", yf, [
            z[2] || (z[2] = c("line", {
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
            }, " Q1 ", 8, xf)
          ]),
          c("g", kf, [
            z[3] || (z[3] = c("line", {
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
            }, " Median ", 8, Mf)
          ]),
          c("g", Sf, [
            z[4] || (z[4] = c("line", {
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
            }, " Avg ", 8, wf)
          ]),
          c("g", $f, [
            z[5] || (z[5] = c("line", {
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
            }, " Q3 ", 8, Cf)
          ]),
          c("g", Df, [
            z[6] || (z[6] = c("line", {
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
            }, " Max ", 8, Af)
          ])
        ], 8, pf)) : N("", !0)
      ], 44, Ih))
    ]));
  }
}), Vi = /* @__PURE__ */ Q(Tf, [["__scopeId", "data-v-64e657d9"]]), Bf = { class: "chart-container" }, Ff = {
  key: 1,
  class: "chart-wrapper"
}, Pf = /* @__PURE__ */ tt({
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
    ga.use([Gi, Zi, Qi, Ji]);
    const s = e, { isDark: a, colors: n } = at(st(s, "theme")), i = Mt(null), o = Mt(!0), r = Mt(!1);
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
    ], f = () => {
      const k = s.data.links.filter(
        (A) => A.source && A.target && typeof A.value == "number"
      ), M = Math.max(...k.map((A) => A.value), 1), S = Math.max(1, M * 0.01), $ = k.map((A) => ({
        ...A,
        originalValue: A.value,
        value: A.value < M * 0.01 ? S : A.value
      }));
      return {
        nodes: s.data.nodes.filter((A) => A.name),
        links: $
      };
    }, p = (k) => k.map((M, S) => ({
      ...M,
      itemStyle: {
        color: s.nodeColors[M.name] || u[S % u.length],
        borderRadius: 8
      }
    })), g = (k) => (M) => {
      const S = M.dataType === "node", $ = n.value.tooltipText, A = a.value ? "#d1d5db" : "#e2e8f0";
      if (S) {
        const T = k.filter((R) => R.target === M.name), L = k.filter((R) => R.source === M.name), P = T.length > 0 ? T.reduce((R, V) => R + (V.originalValue || V.value), 0) : L.reduce((R, V) => R + (V.originalValue || V.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${$};">${M.name}</div><div style="color: ${A}; font-size: 12px;">Count: ${P.toLocaleString()}</div>`;
      }
      const F = M.data?.source || M.source || "Unknown", E = M.data?.target || M.target || "Unknown", I = M.data?.originalValue || M.data?.value || M.value || 0, C = M.data?.label || `${I.toLocaleString()}`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${$};">${F} → ${E}</div><div style="color: ${A}; font-size: 12px;">Flow: ${C}</div>`;
    }, h = () => {
      if (!(!l || !s.data.nodes?.length || !s.data.links?.length))
        try {
          const { nodes: k, links: M } = f(), S = p(k), $ = {
            tooltip: {
              trigger: "item",
              triggerOn: "mousemove",
              formatter: g(M),
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
                itemStyle: d.style,
                label: {
                  show: !0,
                  position: "inside",
                  color: "#000000",
                  fontWeight: 600,
                  fontSize: 12,
                  fontFamily: "'DM Sans', sans-serif",
                  formatter: (A) => {
                    const F = A.name || "";
                    return F.length > 15 ? `${F.substring(0, 15)}...` : F;
                  }
                },
                edgeLabel: {
                  show: !0,
                  fontSize: 11,
                  color: n.value.textSecondary,
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  formatter: (A) => {
                    const F = A.data?.originalValue || A.value || 0;
                    return A.data?.label || `${F.toLocaleString()}`;
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
          l.setOption($);
        } catch (k) {
          console.error("Error setting Sankey chart options:", k), r.value = !0;
        }
    }, b = async () => {
      if (i.value)
        try {
          l = ga.init(i.value), h(), window.addEventListener("resize", m);
        } catch (k) {
          console.error("Error initializing Sankey chart:", k), r.value = !0;
        } finally {
          o.value = !1;
        }
    }, v = async (k = 40) => {
      await Vn();
      for (let M = 0; M < k; M++) {
        if (i.value?.clientWidth && i.value.clientWidth > 0 && i.value?.clientHeight && i.value.clientHeight > 0)
          return await b();
        await new Promise((S) => setTimeout(S, 50));
      }
      await b(), setTimeout(m, 50);
    }, m = () => l?.resize(), _ = () => {
      window.removeEventListener("resize", m), l && (l.dispose(), l = null);
    };
    return fs(() => i.value && v()), Ki(_), jt(() => s.data, h, { deep: !0 }), jt(a, h), t({ isDark: a }), (k, M) => (y(), x("div", Bf, [
      r.value ? (y(), x("div", {
        key: 0,
        class: "error-state",
        style: _t({ height: e.height })
      }, [...M[0] || (M[0] = [
        Y('<div class="error-content" data-v-d6d61034><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d6d61034><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-d6d61034></path></svg><p class="error-title" data-v-d6d61034>Chart could not be loaded</p><p class="error-description" data-v-d6d61034>Please check the data format.</p></div>', 1)
      ])], 4)) : (y(), x("div", Ff, [
        ha(c("div", {
          ref_key: "chartEl",
          ref: i,
          class: "chart-content",
          style: _t({ height: e.height })
        }, null, 4), [
          [fa, !o.value]
        ]),
        ha(c("div", {
          class: "loading-state",
          style: _t({ height: e.height })
        }, [...M[1] || (M[1] = [
          Y('<div class="loading-container" data-v-d6d61034><div class="sankey-loader" data-v-d6d61034><div class="flow flow-1" data-v-d6d61034></div><div class="flow flow-2" data-v-d6d61034></div><div class="flow flow-3" data-v-d6d61034></div><div class="flow flow-4" data-v-d6d61034></div></div><p class="loading-text" data-v-d6d61034>Loading Sankey diagram...</p></div>', 1)
        ])], 4), [
          [fa, o.value]
        ])
      ]))
    ]));
  }
}), Jt = /* @__PURE__ */ Q(Pf, [["__scopeId", "data-v-d6d61034"]]);
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
      d: "M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
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
      d: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
    })
  ]);
}
function Dt(e, t) {
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
      d: "M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
    }),
    c("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
    })
  ]);
}
function Rn(e, t) {
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
      d: "M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
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
      d: "M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
    })
  ]);
}
function zf(e, t) {
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
function Nf(e, t) {
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
const Wf = { class: "chart-footer" }, Hf = { class: "export-actions" }, Vf = { class: "export-buttons" }, jf = ["disabled"], Yf = {
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
}, Uf = ["disabled"], Kf = {
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
}, Gf = /* @__PURE__ */ tt({
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
    return (o, r) => (y(), x("footer", Wf, [
      r[9] || (r[9] = c("div", { class: "footer-divider" }, null, -1)),
      c("div", Hf, [
        r[8] || (r[8] = c("span", { class: "export-label" }, "Export", -1)),
        c("div", Vf, [
          n("pdf") ? (y(), x("button", {
            key: 0,
            type: "button",
            class: Le(["export-btn", { "is-loading": e.loading }]),
            disabled: e.loading,
            title: "Download PDF",
            onClick: r[0] || (r[0] = (l) => i("pdf"))
          }, [
            e.loading ? (y(), x("svg", Yf, [...r[2] || (r[2] = [
              c("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                "stroke-opacity": "0.25"
              }, null, -1),
              c("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
            ])])) : (y(), x("svg", qf, [...r[3] || (r[3] = [
              Y('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-672661d4></path><polyline points="14 2 14 8 20 8" data-v-672661d4></polyline><line x1="16" y1="13" x2="8" y2="13" data-v-672661d4></line><line x1="16" y1="17" x2="8" y2="17" data-v-672661d4></line><polyline points="10 9 9 9 8 9" data-v-672661d4></polyline>', 5)
            ])])),
            r[4] || (r[4] = c("span", null, "PDF", -1))
          ], 10, jf)) : N("", !0),
          n("csv") ? (y(), x("button", {
            key: 1,
            type: "button",
            class: Le(["export-btn", { "is-loading": e.loading }]),
            disabled: e.loading,
            title: "Download CSV",
            onClick: r[1] || (r[1] = (l) => i("csv"))
          }, [
            e.loading ? (y(), x("svg", Kf, [...r[5] || (r[5] = [
              c("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                "stroke-opacity": "0.25"
              }, null, -1),
              c("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
            ])])) : (y(), x("svg", Xf, [...r[6] || (r[6] = [
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
          ], 10, Uf)) : N("", !0)
        ])
      ])
    ]));
  }
}), gt = /* @__PURE__ */ Q(Gf, [["__scopeId", "data-v-672661d4"]]), Zf = { class: "agents-per-day-card" }, Qf = {
  key: 0,
  class: "card-body"
}, Jf = {
  key: 0,
  class: "chart-section"
}, tg = {
  key: 1,
  class: "empty-state"
}, eg = { class: "empty-state-content" }, sg = { class: "empty-icon-wrapper" }, ag = {
  key: 1,
  class: "loading-state"
}, ng = /* @__PURE__ */ tt({
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
    }, n = e, i = s, o = (p) => {
      i("export", p);
    }, { isDark: r, colors: l } = at(st(n, "theme")), d = (p) => {
      const g = new Date(p), h = String(g.getDate()).padStart(2, "0"), b = String(g.getMonth() + 1).padStart(2, "0");
      return `${h}-${b}`;
    }, u = D(() => {
      const p = n.data?.agents_by_day || {}, g = Object.keys(p).sort();
      if (g.length === 0)
        return { labels: [], datasets: [] };
      const h = g.map((k) => d(k)), b = /* @__PURE__ */ new Set();
      for (const k of Object.values(p))
        for (const M of Object.keys(k))
          b.add(M);
      const v = Array.from(b), m = (k) => k, _ = v.map((k) => ({
        label: k,
        data: g.map((M) => p[M]?.[k] || 0),
        backgroundColor: `${a[k] || "#94a3b8"}80`,
        borderColor: m(a[k] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: h,
        datasets: _
      };
    }), f = D(() => n.options ? n.options : {
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
    return t({ isDark: r }), (p, g) => (y(), x("article", Zf, [
      g[3] || (g[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Agents Total Messages per Day"),
          c("p", { class: "card-subtitle" }, "Daily agent interactions (stacked)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", ag, [...g[2] || (g[2] = [
        Y('<div class="loading-container" data-v-4d18c22c><div class="chart-lines-loader" data-v-4d18c22c><div class="line line-1" data-v-4d18c22c></div><div class="line line-2" data-v-4d18c22c></div><div class="line line-3" data-v-4d18c22c></div><div class="line line-4" data-v-4d18c22c></div><div class="line line-5" data-v-4d18c22c></div></div><p class="loading-text" data-v-4d18c22c>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", Qf, [
        u.value.labels && u.value.labels.length ? (y(), x("section", Jf, [
          U(Zt, {
            data: u.value,
            options: f.value,
            stacked: !0
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ut(B(gt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ])) : (y(), x("section", tg, [
          c("div", eg, [
            c("div", sg, [
              U(B(Dt), { class: "empty-icon" })
            ]),
            g[0] || (g[0] = c("p", { class: "empty-title" }, "No agents data per day", -1)),
            g[1] || (g[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see daily agent interactions.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), ig = /* @__PURE__ */ Q(ng, [["__scopeId", "data-v-4d18c22c"]]), W = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), it = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), og = { class: "booking-manager-card" }, rg = { class: "card-header" }, lg = { class: "header-content" }, cg = {
  key: 0,
  class: "payment-success-badge"
}, dg = {
  key: 0,
  class: "currency-breakdown-list"
}, ug = {
  key: 1,
  class: "badge-value"
}, hg = {
  key: 0,
  class: "loading-state"
}, fg = {
  key: 1,
  class: "error-state"
}, gg = { class: "error-content" }, pg = { class: "error-description" }, bg = {
  key: 2,
  class: "card-body"
}, vg = { class: "chart-section" }, mg = { class: "chart-wrapper" }, _g = {
  key: 0,
  class: "table-section"
}, yg = { class: "table-wrapper" }, xg = { class: "data-table" }, kg = { class: "table-body" }, Mg = { class: "table-cell font-medium" }, Sg = { class: "table-cell text-center" }, wg = { class: "table-cell text-center" }, $g = { class: "percentage-text" }, Cg = { class: "table-cell text-center" }, Dg = { class: "table-cell" }, Ag = { class: "badges-container" }, Tg = { class: "badge badge-success" }, Bg = { class: "badge badge-error" }, Fg = { class: "table-cell" }, Pg = {
  key: 0,
  class: "badges-container"
}, Lg = {
  key: 1,
  class: "percentage-text"
}, Eg = { class: "table-cell" }, Og = { class: "badges-container" }, Rg = { class: "badge badge-error" }, Ig = { class: "badge badge-warning" }, zg = { class: "badge badge-yellow" }, Ng = { class: "badge badge-error" }, Wg = {
  key: 1,
  class: "empty-state"
}, Hg = /* @__PURE__ */ tt({
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
    const s = e, a = t, n = (g) => {
      a("export", g);
    }, i = D(() => s.data?.booking_manager_by_day ? [...s.data.booking_manager_by_day].sort(
      (g, h) => new Date(g.date).getTime() - new Date(h.date).getTime()
    ) : []), o = D(() => s.data?.total_payment_success_value || []), r = (g) => g.payment_success_value || [], l = (g) => typeof g.payment_success_count == "number" ? g.payment_success_count : (g.payment_success_value || []).reduce((h, b) => h + (b.count || 0), 0), d = (g) => it(g), u = D(() => {
      const g = s.data, h = g.total_booking_initiated || 0, b = g.total_booking_started || 0, v = g.total_payment_initiated || 0, m = g.total_not_found || 0, _ = g.total_cancelled || 0, k = g.total_no_pending_balance || 0, M = g.total_errors || 0, S = typeof g.total_payment_success == "number" ? g.total_payment_success : (g.total_payment_success_value || []).reduce((T, L) => T + (L.count || 0), 0), $ = g.total_payment_failed || 0, A = Math.max(0, h - b), F = Math.max(0, b - v - m - _ - k - M), E = (T, L) => {
        const P = L > 0 ? Math.round(T / L * 100) : 0;
        return `${T.toLocaleString()} (${P}%)`;
      }, I = [
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
      return b > 0 && C.push({
        source: "Initiated",
        target: "Started",
        value: b,
        label: E(b, h)
      }), A > 0 && C.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: A,
        label: E(A, h)
      }), v > 0 && C.push({
        source: "Started",
        target: "Payment Initiated",
        value: v,
        label: E(v, b)
      }), m > 0 && C.push({
        source: "Started",
        target: "Not Found",
        value: m,
        label: E(m, b)
      }), _ > 0 && C.push({
        source: "Started",
        target: "Cancelled",
        value: _,
        label: E(_, b)
      }), k > 0 && C.push({
        source: "Started",
        target: "No Pending Balance",
        value: k,
        label: E(k, b)
      }), M > 0 && C.push({
        source: "Started",
        target: "Errors",
        value: M,
        label: E(M, b)
      }), F > 0 && C.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: F,
        label: E(F, b)
      }), S > 0 && C.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: S,
        label: E(S, v)
      }), $ > 0 && C.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: $,
        label: E($, v)
      }), { nodes: I, links: C };
    }), f = {
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
    }, p = (g, h) => !h || h === 0 ? "0%" : `${Math.round(g / h * 100)}%`;
    return (g, h) => (y(), x("article", og, [
      c("header", rg, [
        c("div", lg, [
          h[1] || (h[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Booking Manager Metrics"),
            c("p", { class: "card-subtitle" }, "Booking manager workflow tracking and analysis")
          ], -1)),
          s.loading ? N("", !0) : (y(), x("div", cg, [
            h[0] || (h[0] = c("p", { class: "badge-label" }, "Payment Success Value", -1)),
            o.value.length > 0 ? (y(), x("div", dg, [
              (y(!0), x(j, null, Z(o.value, (b) => (y(), x("p", {
                key: b.currency,
                class: "currency-breakdown-item"
              }, w(b.currency) + " " + w(d(b.total_value)), 1))), 128))
            ])) : (y(), x("p", ug, w(d(0)), 1))
          ]))
        ])
      ]),
      s.loading ? (y(), x("div", hg, [...h[2] || (h[2] = [
        Y('<div class="loading-container" data-v-57d15b37><div class="chart-flow-loader" data-v-57d15b37><div class="flow-line flow-1" data-v-57d15b37></div><div class="flow-line flow-2" data-v-57d15b37></div><div class="flow-line flow-3" data-v-57d15b37></div><div class="flow-line flow-4" data-v-57d15b37></div><div class="flow-line flow-5" data-v-57d15b37></div></div><p class="loading-text" data-v-57d15b37>Loading booking data...</p></div>', 1)
      ])])) : s.error ? (y(), x("div", fg, [
        c("div", gg, [
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
          c("p", pg, w(s.error), 1)
        ])
      ])) : (y(), x("div", bg, [
        c("section", vg, [
          c("div", mg, [
            U(Jt, {
              data: u.value,
              "node-colors": f,
              height: "500px",
              "node-gap": 15
            }, null, 8, ["data"])
          ])
        ]),
        i.value.length > 0 ? (y(), x("section", _g, [
          h[6] || (h[6] = c("div", { class: "section-header" }, [
            c("h4", { class: "section-title" }, "Daily Overview")
          ], -1)),
          c("div", yg, [
            c("table", xg, [
              h[5] || (h[5] = c("thead", null, [
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
              c("tbody", kg, [
                (y(!0), x(j, null, Z(i.value, (b) => (y(), x("tr", {
                  key: b.date,
                  class: "table-row"
                }, [
                  c("td", Mg, w(B(Ct)(b.date).format("DD/MM/YYYY")), 1),
                  c("td", Sg, w(B(W)(b.booking_initiated_count)), 1),
                  c("td", wg, [
                    re(w(B(W)(b.booking_started_count)) + " ", 1),
                    c("span", $g, " (" + w(p(b.booking_started_count, b.booking_initiated_count)) + ") ", 1)
                  ]),
                  c("td", Cg, w(B(W)(b.payment_initiated_count)), 1),
                  c("td", Dg, [
                    c("div", Ag, [
                      c("span", Tg, " Success: " + w(B(W)(l(b))), 1),
                      c("span", Bg, " Failed: " + w(B(W)(b.payment_failed_count || 0)), 1)
                    ])
                  ]),
                  c("td", Fg, [
                    r(b).length > 0 ? (y(), x("div", Pg, [
                      (y(!0), x(j, null, Z(r(b), (v) => (y(), x("span", {
                        key: `${b.date}-${v.currency}`,
                        class: "badge badge-currency"
                      }, w(v.currency) + " " + w(d(v.total_value)), 1))), 128))
                    ])) : (y(), x("span", Lg, "N/A"))
                  ]),
                  c("td", Eg, [
                    c("div", Og, [
                      c("span", Rg, " Not Found: " + w(b.not_found_count ? B(W)(b.not_found_count) : "N/A"), 1),
                      c("span", Ig, " Cancelled: " + w(b.cancelled_count ? B(W)(b.cancelled_count) : "N/A"), 1),
                      c("span", zg, " No Balance: " + w(b.no_pending_balance_count ? B(W)(b.no_pending_balance_count) : "N/A"), 1),
                      c("span", Ng, " Errors: " + w(b.error_count ? B(W)(b.error_count) : "N/A"), 1)
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), ut(B(gt), {
            key: 0,
            onExport: n,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ])) : (y(), x("section", Wg, [...h[7] || (h[7] = [
          Y('<div class="empty-state-content" data-v-57d15b37><div class="empty-icon-wrapper" data-v-57d15b37><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-57d15b37><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" data-v-57d15b37></path></svg></div><p class="empty-title" data-v-57d15b37>No booking manager data available</p><p class="empty-description" data-v-57d15b37>No booking manager data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Vg = /* @__PURE__ */ Q(Hg, [["__scopeId", "data-v-57d15b37"]]), jg = { class: "checkin-metrics-card" }, Yg = {
  key: 0,
  class: "loading-state"
}, qg = {
  key: 1,
  class: "card-body"
}, Ug = {
  key: 0,
  class: "chart-section"
}, Kg = { class: "chart-wrapper" }, Xg = {
  key: 1,
  class: "table-section"
}, Gg = { class: "table-wrapper" }, Zg = { class: "data-table" }, Qg = { class: "table-body" }, Jg = { class: "table-cell font-medium" }, tp = { class: "table-cell text-center" }, ep = { class: "table-cell text-center" }, sp = { class: "table-cell text-center" }, ap = { class: "table-cell text-center" }, np = { class: "table-cell text-center" }, ip = { class: "table-cell text-center" }, op = { class: "table-cell text-left" }, rp = {
  key: 0,
  class: "failed-steps"
}, lp = { class: "step-name" }, cp = { class: "step-count" }, dp = {
  key: 1,
  class: "empty-cell"
}, up = {
  key: 2,
  class: "empty-state"
}, hp = {
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
    const s = t, a = (v) => {
      s("export", v);
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
    }, r = Mt([]), l = D(() => {
      const v = n.data;
      return v && (Array.isArray(v.checkin_by_day) && v.checkin_by_day.length > 0 || (v.total_checkin_initiated ?? 0) > 0) ? { ...i, ...v } : n.checkinData ?? i;
    }), d = D(() => {
      const v = n.data;
      return v && (Array.isArray(v.failed_by_step_by_day) && v.failed_by_step_by_day.length > 0 || Array.isArray(v.unrecovered_by_step) && v.unrecovered_by_step.length > 0) ? {
        ...o,
        total_checkin_failed: v.total_checkin_failed ?? 0,
        total_checkin_unrecovered: v.total_checkin_unrecovered ?? 0,
        failed_by_step_by_day: v.failed_by_step_by_day ?? [],
        unrecovered_by_step: v.unrecovered_by_step ?? [],
        unrecovered_by_day: v.unrecovered_by_day ?? []
      } : n.failedData ?? o;
    }), u = D(() => {
      const v = {
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
        const M = _.step_name.replace(/_/g, " ").split(" ").map(($) => $.charAt(0).toUpperCase() + $.slice(1)).join(" "), S = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        v[M] = S[M] || "#DC2626";
      }), v;
    }), f = (v, m) => !m || m === 0 ? "0%" : `${Math.round(v / m * 100)}%`, p = (v, m) => {
      const _ = W(v), k = f(v, m);
      return `${_} (${k})`;
    }, g = (v) => v.reduce((m, _) => m + _.failed_count, 0), h = D(() => {
      const v = [], m = [];
      if (!l.value.total_checkin_initiated)
        return { nodes: v, links: m };
      v.push({ name: "Checkin Init" }), v.push({ name: "Booking retrive" }), v.push({ name: "Booking retrive success" }), v.push({ name: "Number of Passengers" }), v.push({ name: "Completed" }), v.push({ name: "Closed with BP" });
      const _ = l.value.total_checkin_initiated, k = l.value.total_checkin_init, M = l.value.total_checkin_init_abandoned, S = k - M, $ = l.value.total_checkin_started, A = l.value.total_checkin_completed, F = l.value.total_checkin_closed, E = d.value.unrecovered_by_step || [], I = E.reduce((P, R) => P + R.count, 0);
      if (k > 0) {
        const P = Math.round(k / _ * 100);
        m.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: k,
          label: `${k.toLocaleString()} (${P}%)`
        });
      }
      const C = _ - k;
      if (C > 0) {
        const P = Math.round(C / _ * 100);
        v.push({ name: "Abandoned (Init)" }), m.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: C,
          label: `${C.toLocaleString()} (${P}%)`
        });
      }
      if (M > 0) {
        const P = Math.round(M / _ * 100);
        v.push({ name: "Abandoned (Started)" }), m.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: M,
          label: `${M.toLocaleString()} (${P}%)`
        });
      }
      if (S > 0) {
        const P = Math.round(S / _ * 100);
        m.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: S,
          label: `${S.toLocaleString()} (${P}%)`
        });
      }
      if ($ > 0) {
        const P = Math.round($ / _ * 100);
        m.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: $,
          label: `${$.toLocaleString()} (${P}%)`
        });
      }
      if (A > 0) {
        const P = Math.round(A / $ * 100);
        m.push({
          source: "Number of Passengers",
          target: "Completed",
          value: A,
          label: `${A.toLocaleString()} (${P}%)`
        });
      }
      if (E.length > 0 && I > 0) {
        v.push({ name: "Unrecovered" });
        const P = Math.round(I / $ * 100);
        m.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: I,
          label: `${I.toLocaleString()} (${P}%)`
        }), E.forEach((R) => {
          const K = R.step_name.replace(/_/g, " ").split(" ").map((z) => z.charAt(0).toUpperCase() + z.slice(1)).join(" "), H = Math.round(R.count / $ * 100);
          v.push({ name: K }), m.push({
            source: "Unrecovered",
            target: K,
            value: R.count,
            label: `${R.count.toLocaleString()} (${H}%)`
          });
        });
      }
      const T = $ - (A + I);
      if (T > 0) {
        const P = Math.round(T / $ * 100);
        v.push({ name: "Abandoned (Flow)" }), m.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: T,
          label: `${T.toLocaleString()} (${P}%)`
        });
      }
      const L = A - F;
      if (L > 0) {
        const P = Math.round(L / $ * 100);
        v.push({ name: "BP Error" }), m.push({
          source: "Completed",
          target: "BP Error",
          value: L,
          label: `${L.toLocaleString()} (${P}%)`
        });
      }
      if (F > 0) {
        const P = Math.round(F / $ * 100);
        m.push({
          source: "Completed",
          target: "Closed with BP",
          value: F,
          label: `${F.toLocaleString()} (${P}%)`
        });
      }
      return { nodes: v, links: m };
    }), b = () => {
      const v = l.value.checkin_by_day || [], m = d.value.failed_by_step_by_day || [];
      if (v.length === 0) {
        r.value = [];
        return;
      }
      r.value = [...v].map((_) => {
        const k = m.find(
          (M) => M.date === _.date
        );
        return {
          ..._,
          failed_steps: k?.steps || []
        };
      }), r.value.sort((_, k) => new Date(_.date) - new Date(k.date));
    };
    return jt(
      [() => n.data, () => n.checkinData, () => n.failedData],
      () => {
        b();
      },
      { deep: !0, immediate: !0 }
    ), (v, m) => (y(), x("article", jg, [
      m[3] || (m[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Check-in Metrics"),
          c("p", { class: "card-subtitle" }, "Check-in performance and failure analysis")
        ])
      ], -1)),
      n.loading ? (y(), x("div", Yg, [...m[0] || (m[0] = [
        Y('<div class="loading-container" data-v-d527da09><div class="chart-flow-loader" data-v-d527da09><div class="flow-line flow-1" data-v-d527da09></div><div class="flow-line flow-2" data-v-d527da09></div><div class="flow-line flow-3" data-v-d527da09></div><div class="flow-line flow-4" data-v-d527da09></div><div class="flow-line flow-5" data-v-d527da09></div></div><p class="loading-text" data-v-d527da09>Loading check-in data...</p></div>', 1)
      ])])) : (y(), x("div", qg, [
        h.value.nodes.length > 0 ? (y(), x("section", Ug, [
          c("div", Kg, [
            U(Jt, {
              data: h.value,
              height: "500px",
              "node-colors": u.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : N("", !0),
        r.value && r.value.length > 0 ? (y(), x("section", Xg, [
          c("div", Gg, [
            c("table", Zg, [
              m[1] || (m[1] = c("thead", null, [
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
              c("tbody", Qg, [
                (y(!0), x(j, null, Z(r.value, (_) => (y(), x("tr", {
                  key: _.date,
                  class: "table-row"
                }, [
                  c("td", Jg, w(B(Ct)(_.date).format("DD/MM/YYYY")), 1),
                  c("td", tp, w(B(W)(_.checkin_initiated_count)), 1),
                  c("td", ep, w(p(_.checkin_init_count, _.checkin_initiated_count)), 1),
                  c("td", sp, w(B(W)(_.checkin_started_count)), 1),
                  c("td", ap, w(p(_.checkin_completed_count, _.checkin_started_count)), 1),
                  c("td", np, w(p(_.checkin_closed_count, _.checkin_started_count)), 1),
                  c("td", ip, w(p(g(_.failed_steps), _.checkin_started_count)), 1),
                  c("td", op, [
                    _.failed_steps && _.failed_steps.length > 0 ? (y(), x("div", rp, [
                      (y(!0), x(j, null, Z(_.failed_steps, (k) => (y(), x("div", {
                        key: k.step_name,
                        class: "failed-step-item"
                      }, [
                        c("span", lp, w(k.step_name.replace(/_/g, " ")) + ":", 1),
                        c("span", cp, w(k.failed_count), 1)
                      ]))), 128))
                    ])) : (y(), x("div", dp, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), ut(B(gt), {
            key: 0,
            onExport: a,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ])) : (y(), x("section", up, [...m[2] || (m[2] = [
          Y('<div class="empty-state-content" data-v-d527da09><div class="empty-icon-wrapper" data-v-d527da09><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d527da09><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-d527da09></path></svg></div><p class="empty-title" data-v-d527da09>No check-in data available</p><p class="empty-description" data-v-d527da09>Try adjusting the date range or check your filters to see check-in performance data.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}, fp = /* @__PURE__ */ Q(hp, [["__scopeId", "data-v-d527da09"]]), gp = { class: "checkin-metrics-card" }, pp = {
  key: 0,
  class: "loading-state"
}, bp = {
  key: 1,
  class: "card-body"
}, vp = {
  key: 0,
  class: "sankey-section"
}, mp = {
  key: 1,
  class: "table-section"
}, _p = { class: "table-wrapper" }, yp = { class: "data-table" }, xp = { class: "table-body" }, kp = { class: "table-cell date-cell" }, Mp = { class: "table-cell text-center" }, Sp = { class: "table-cell text-center" }, wp = { class: "table-cell text-center" }, $p = { class: "table-cell text-center" }, Cp = { class: "table-cell text-center" }, Dp = { class: "table-cell text-center" }, Ap = { class: "table-cell reasons-cell" }, Tp = {
  key: 0,
  class: "reasons-list"
}, Bp = { class: "reason-name" }, Fp = { class: "reason-count" }, Pp = {
  key: 1,
  class: "no-reasons"
}, Lp = {
  key: 2,
  class: "empty-state"
}, Ep = { class: "empty-state-content" }, Op = { class: "empty-icon-wrapper" }, Rp = /* @__PURE__ */ tt({
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
    const a = e, n = s, i = (v) => {
      n("export", v);
    }, { isDark: o } = at(st(a, "theme")), r = (v) => v == null ? "0" : v.toLocaleString(), l = (v) => {
      const m = new Date(v), _ = String(m.getDate()).padStart(2, "0"), k = String(m.getMonth() + 1).padStart(2, "0"), M = m.getFullYear();
      return `${_}/${k}/${M}`;
    }, d = (v) => v.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase()), u = (v, m) => !m || m === 0 ? "0%" : `${Math.round(v / m * 100)}%`, f = (v, m) => {
      const _ = v || 0, k = m || 0, M = r(_), S = u(_, k);
      return `${M} (${S})`;
    }, p = (v) => v ? v.reduce((m, _) => m + _.failed_count, 0) : 0, g = D(() => {
      const v = {
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
      return (a.failedData?.unrecovered_by_step || []).forEach((_) => {
        const M = _.step_name.replace(/_/g, " ").split(" ").map(($) => $.charAt(0).toUpperCase() + $.slice(1)).join(" "), S = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        v[M] = S[M] || "#DC2626";
      }), v;
    }), h = D(() => {
      const v = a.checkinData?.checkin_by_day || [], m = a.failedData?.failed_by_step_by_day || [];
      return v.map((k) => {
        const M = m.find((S) => S.date === k.date);
        return {
          ...k,
          failed_steps: M?.steps || []
        };
      }).sort((k, M) => new Date(k.date).getTime() - new Date(M.date).getTime());
    }), b = D(() => {
      const v = [], m = [], _ = /* @__PURE__ */ new Set(), k = (q) => {
        _.has(q) || (v.push({ name: q }), _.add(q));
      };
      if (!a.checkinData?.total_checkin_initiated)
        return { nodes: v, links: m };
      k("Checkin Init"), k("Booking retrive"), k("Booking retrive success"), k("Number of Passengers"), k("Completed"), k("Closed with BP");
      const M = a.checkinData.total_checkin_initiated || 0, S = a.checkinData.total_checkin_init || 0, $ = a.checkinData.total_checkin_init_abandoned || 0, A = a.checkinData.total_checkin_pre_init_abandoned_error, F = a.checkinData.total_checkin_pre_init_abandoned_voluntary, E = A != null || F != null, I = E ? Math.max(Number(A) || 0, 0) : 0, C = E ? Math.max(Number(F) || 0, 0) : 0, T = a.checkinData.total_checkin_init_abandoned_error, L = a.checkinData.total_checkin_init_abandoned_voluntary, P = T != null || L != null, R = P ? Math.max(Number(T) || 0, 0) : 0, V = P ? Math.max(Number(L) || 0, 0) : 0, K = P ? Math.max($ - R - V, 0) : $, H = S - $, z = a.checkinData.total_checkin_started || 0, O = a.checkinData.total_checkin_completed || 0, X = a.checkinData.total_checkin_closed || 0, nt = a.failedData?.unrecovered_by_step || [], et = nt.reduce((q, At) => q + At.count, 0);
      if (S > 0) {
        const q = Math.round(S / M * 100);
        m.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: S,
          label: `${S.toLocaleString()} (${q}%)`
        });
      }
      const dt = M - S;
      if (E) {
        if (C > 0) {
          const q = Math.round(C / M * 100);
          k("Abandoned (Init)"), m.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: C,
            label: `${C.toLocaleString()} (${q}%)`
          });
        }
        if (I > 0) {
          const q = Math.round(I / M * 100);
          k("Booking not retreived"), m.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: I,
            label: `${I.toLocaleString()} (${q}%)`
          });
        }
      } else if (dt > 0) {
        const q = Math.round(dt / M * 100);
        k("Abandoned (Init)"), m.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: dt,
          label: `${dt.toLocaleString()} (${q}%)`
        });
      }
      if (P) {
        if (R > 0) {
          const q = Math.round(R / M * 100);
          k("Error"), m.push({
            source: "Booking retrive",
            target: "Error",
            value: R,
            label: `${R.toLocaleString()} (${q}%)`
          });
        }
        if (V > 0) {
          const q = Math.round(V / M * 100);
          k("Abandoned (Started)"), m.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: V,
            label: `${V.toLocaleString()} (${q}%)`
          });
        }
        if (K > 0) {
          const q = Math.round(K / M * 100);
          k("Abandoned (Started)"), m.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: K,
            label: `${K.toLocaleString()} (${q}%)`
          });
        }
      } else if ($ > 0) {
        const q = Math.round($ / M * 100);
        k("Abandoned (Started)"), m.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: $,
          label: `${$.toLocaleString()} (${q}%)`
        });
      }
      if (H > 0) {
        const q = Math.round(H / M * 100);
        m.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: H,
          label: `${H.toLocaleString()} (${q}%)`
        });
      }
      if (z > 0) {
        const q = Math.round(z / M * 100);
        m.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: z,
          label: `${z.toLocaleString()} (${q}%)`
        });
      }
      if (O > 0) {
        const q = Math.round(O / z * 100);
        m.push({
          source: "Number of Passengers",
          target: "Completed",
          value: O,
          label: `${O.toLocaleString()} (${q}%)`
        });
      }
      if (nt.length > 0 && et > 0) {
        k("Unrecovered");
        const q = Math.round(et / z * 100);
        m.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: et,
          label: `${et.toLocaleString()} (${q}%)`
        }), nt.forEach((At) => {
          const je = At.step_name.replace(/_/g, " ").split(" ").map((ua) => ua.charAt(0).toUpperCase() + ua.slice(1)).join(" "), qi = Math.round(At.count / z * 100);
          k(je), m.push({
            source: "Unrecovered",
            target: je,
            value: At.count,
            label: `${At.count.toLocaleString()} (${qi}%)`
          });
        });
      }
      const bt = z - (O + et);
      if (bt > 0) {
        const q = Math.round(bt / z * 100);
        k("Abandoned (Flow)"), m.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: bt,
          label: `${bt.toLocaleString()} (${q}%)`
        });
      }
      const ct = O - X;
      if (ct > 0) {
        const q = Math.round(ct / z * 100);
        k("BP Error"), m.push({
          source: "Completed",
          target: "BP Error",
          value: ct,
          label: `${ct.toLocaleString()} (${q}%)`
        });
      }
      if (X > 0) {
        const q = Math.round(X / z * 100);
        m.push({
          source: "Completed",
          target: "Closed with BP",
          value: X,
          label: `${X.toLocaleString()} (${q}%)`
        });
      }
      return { nodes: v, links: m };
    });
    return t({ isDark: o }), (v, m) => (y(), x("article", gp, [
      m[4] || (m[4] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Check-in Metrics"),
          c("p", { class: "card-subtitle" }, "Check-in performance and failure analysis")
        ])
      ], -1)),
      e.loading ? (y(), x("div", pp, [...m[0] || (m[0] = [
        Y('<div class="loading-container" data-v-a065922d><div class="chart-bars-loader" data-v-a065922d><div class="bar bar-1" data-v-a065922d></div><div class="bar bar-2" data-v-a065922d></div><div class="bar bar-3" data-v-a065922d></div><div class="bar bar-4" data-v-a065922d></div><div class="bar bar-5" data-v-a065922d></div></div><p class="loading-text" data-v-a065922d>Loading check-in data...</p></div>', 1)
      ])])) : (y(), x("div", bp, [
        b.value.nodes.length > 0 ? (y(), x("div", vp, [
          U(Jt, {
            data: b.value,
            height: "500px",
            "node-colors": g.value,
            "use-gradient": !1,
            "node-gap": 30
          }, null, 8, ["data", "node-colors"])
        ])) : N("", !0),
        h.value && h.value.length > 0 ? (y(), x("div", mp, [
          c("div", _p, [
            c("table", yp, [
              m[1] || (m[1] = c("thead", null, [
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
              c("tbody", xp, [
                (y(!0), x(j, null, Z(h.value, (_) => (y(), x("tr", {
                  key: _.date,
                  class: "table-row"
                }, [
                  c("td", kp, w(l(_.date)), 1),
                  c("td", Mp, w(r(_.checkin_initiated_count)), 1),
                  c("td", Sp, w(f(_.checkin_init_count, _.checkin_initiated_count)), 1),
                  c("td", wp, w(r(_.checkin_started_count)), 1),
                  c("td", $p, w(f(_.checkin_completed_count, _.checkin_started_count)), 1),
                  c("td", Cp, w(f(_.checkin_closed_count, _.checkin_started_count)), 1),
                  c("td", Dp, w(f(p(_.failed_steps), _.checkin_started_count)), 1),
                  c("td", Ap, [
                    _.failed_steps && _.failed_steps.length > 0 ? (y(), x("div", Tp, [
                      (y(!0), x(j, null, Z(_.failed_steps, (k) => (y(), x("div", {
                        key: k.step_name,
                        class: "reason-item"
                      }, [
                        c("span", Bp, w(d(k.step_name)) + ":", 1),
                        c("span", Fp, w(k.failed_count), 1)
                      ]))), 128))
                    ])) : (y(), x("div", Pp, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), ut(B(gt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ])) : (y(), x("div", Lp, [
          c("div", Ep, [
            c("div", Op, [
              U(B(Dt), { class: "empty-icon" })
            ]),
            m[2] || (m[2] = c("p", { class: "empty-title" }, "No check-in data available", -1)),
            m[3] || (m[3] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see check-in metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Ip = /* @__PURE__ */ Q(Rp, [["__scopeId", "data-v-a065922d"]]), zp = { class: "checkin-segments-card" }, Np = {
  key: 0,
  class: "loading-state"
}, Wp = {
  key: 1,
  class: "card-body"
}, Hp = {
  key: 0,
  class: "table-section"
}, Vp = { class: "table-wrapper" }, jp = { class: "data-table" }, Yp = { class: "table-body" }, qp = { class: "table-cell font-medium text-center" }, Up = { class: "airport-badge" }, Kp = { class: "table-cell text-center" }, Xp = {
  key: 0,
  class: "airport-badge connection"
}, Gp = {
  key: 1,
  class: "empty-connection"
}, Zp = { class: "table-cell text-center" }, Qp = { class: "airport-badge" }, Jp = { class: "table-cell text-center" }, t0 = {
  key: 0,
  class: "trip-badge roundtrip"
}, e0 = {
  key: 1,
  class: "trip-badge oneway"
}, s0 = { class: "table-cell text-center" }, a0 = { class: "table-cell text-center" }, n0 = { class: "percentage-value" }, i0 = { class: "table-cell text-center" }, o0 = { class: "percentage-value" }, r0 = { class: "table-cell text-center" }, l0 = { class: "percentage-value success" }, c0 = {
  key: 1,
  class: "empty-state"
}, d0 = /* @__PURE__ */ tt({
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
    const a = e, n = s, i = (u) => {
      n("export", u);
    }, { isDark: o } = at(st(a, "theme")), r = (u, f) => !f || f === 0 || !u ? "0%" : `${Math.round(u / f * 100)}%`, l = (u) => !u || u === "None" ? "-" : String(u).trim().replace(/_[0-9]+$/i, ""), d = (u) => {
      const f = l(u?.departure_airport), p = l(u?.arrival_airport);
      return f === "-" || p === "-" ? !1 : f === p;
    };
    return t({ isDark: o }), (u, f) => (y(), x("article", zp, [
      f[5] || (f[5] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Checkin Segments"),
          c("p", { class: "card-subtitle" }, "Breakdown by flight segment with connection when applicable")
        ])
      ], -1)),
      a.loading ? (y(), x("div", Np, [...f[0] || (f[0] = [
        Y('<div class="loading-container" data-v-5f8ce8fa><div class="chart-flow-loader" data-v-5f8ce8fa><div class="flow-line flow-1" data-v-5f8ce8fa></div><div class="flow-line flow-2" data-v-5f8ce8fa></div><div class="flow-line flow-3" data-v-5f8ce8fa></div><div class="flow-line flow-4" data-v-5f8ce8fa></div><div class="flow-line flow-5" data-v-5f8ce8fa></div></div><p class="loading-text" data-v-5f8ce8fa>Loading segment data...</p></div>', 1)
      ])])) : (y(), x("div", Wp, [
        a.data.length > 0 ? (y(), x("section", Hp, [
          c("div", Vp, [
            c("table", jp, [
              f[3] || (f[3] = c("thead", null, [
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
              c("tbody", Yp, [
                (y(!0), x(j, null, Z(a.data, (p, g) => (y(), x("tr", {
                  key: g,
                  class: "table-row"
                }, [
                  c("td", qp, [
                    c("span", Up, w(l(p.departure_airport)), 1)
                  ]),
                  c("td", Kp, [
                    l(p.conexion_airport) !== "-" ? (y(), x("span", Xp, w(l(p.conexion_airport)), 1)) : (y(), x("span", Gp, "-"))
                  ]),
                  c("td", Zp, [
                    c("span", Qp, w(l(p.arrival_airport)), 1)
                  ]),
                  c("td", Jp, [
                    d(p) ? (y(), x("span", t0, [...f[1] || (f[1] = [
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
                      re(" Roundtrip ", -1)
                    ])])) : (y(), x("span", e0, [...f[2] || (f[2] = [
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
                      re(" One way ", -1)
                    ])]))
                  ]),
                  c("td", s0, w(B(W)(p.segment_init_count)), 1),
                  c("td", a0, [
                    c("span", n0, w(r(p.segment_started_count, p.segment_init_count)), 1)
                  ]),
                  c("td", i0, [
                    c("span", o0, w(r(p.segment_completed_count, p.segment_init_count)), 1)
                  ]),
                  c("td", r0, [
                    c("span", l0, w(r(p.segment_closed_count, p.segment_init_count)), 1)
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), ut(B(gt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ])) : (y(), x("section", c0, [...f[4] || (f[4] = [
          Y('<div class="empty-state-content" data-v-5f8ce8fa><div class="empty-icon-wrapper" data-v-5f8ce8fa><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-5f8ce8fa><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-5f8ce8fa></path></svg></div><p class="empty-title" data-v-5f8ce8fa>No segment data available</p><p class="empty-description" data-v-5f8ce8fa>No flight segment data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), u0 = /* @__PURE__ */ Q(d0, [["__scopeId", "data-v-5f8ce8fa"]]), h0 = { class: "disruption-metrics-card" }, f0 = { class: "card-header" }, g0 = { class: "header-content" }, p0 = {
  key: 0,
  class: "payment-success-badge"
}, b0 = {
  key: 0,
  class: "currency-breakdown-list"
}, v0 = {
  key: 1,
  class: "badge-value"
}, m0 = {
  key: 0,
  class: "loading-state"
}, _0 = {
  key: 1,
  class: "card-body"
}, y0 = { class: "chart-section" }, x0 = { class: "chart-wrapper" }, k0 = {
  key: 1,
  class: "empty-chart"
}, M0 = {
  key: 0,
  class: "table-section"
}, S0 = { class: "table-wrapper" }, w0 = { class: "data-table" }, $0 = { class: "table-body" }, C0 = { class: "table-cell font-medium text-center" }, D0 = { class: "table-cell text-center" }, A0 = { class: "table-cell text-center" }, T0 = { class: "percentage-text" }, B0 = { class: "table-cell text-center" }, F0 = { class: "abandoned-value" }, P0 = { class: "table-cell" }, L0 = { class: "badges-container badges-wrap" }, E0 = { class: "badge badge-vol" }, O0 = { class: "badge badge-confirm" }, R0 = { class: "badge badge-not-confirm" }, I0 = { class: "badge badge-reject" }, z0 = { class: "badge badge-not-paid" }, N0 = { class: "badge badge-success" }, W0 = { class: "table-cell" }, H0 = { class: "badges-container badges-wrap" }, V0 = { class: "badge badge-inv" }, j0 = { class: "badge badge-human" }, Y0 = { class: "badge badge-accept" }, q0 = {
  key: 1,
  class: "empty-state"
}, U0 = /* @__PURE__ */ tt({
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
    const s = e, a = t, n = (g) => {
      a("export", g);
    }, i = D(() => s.data?.disruption_by_day ? [...s.data.disruption_by_day].sort(
      (g, h) => new Date(g.date).getTime() - new Date(h.date).getTime()
    ) : []), o = D(() => s.data?.total_payment_success || []), r = (g, h) => !h || h === 0 ? "0%" : `${Math.round(g / h * 100)}%`, l = (g) => it(g), d = (g) => (g ?? []).reduce((h, b) => h + (b.count ?? 0), 0), u = (g) => typeof g.sell_success_count == "number" ? g.sell_success_count : d(g.payment_success_total), f = D(() => {
      const g = s.data, h = g.total_disruption_conversations || 0, b = g.total_disruption_initiated || 0, v = g.total_voluntary || 0, m = g.total_involuntary || 0, _ = g.total_accepted || 0, k = g.total_confirmed || 0, M = typeof g.total_sell_success == "number" ? g.total_sell_success : d(g.total_payment_success), S = g.total_sell_failed || 0, $ = Math.max(0, h - b), A = Math.max(0, b - v - m), F = Math.max(0, m - _), E = Math.max(0, v - k), I = S, C = Math.max(0, k - M - I), T = (R, V) => {
        const K = V > 0 ? Math.round(R / V * 100) : 0;
        return `${R.toLocaleString()} (${K}%)`;
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
      ], P = [];
      return b > 0 && P.push({
        source: "Initiated",
        target: "Started",
        value: b,
        label: T(b, h)
      }), $ > 0 && P.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: $,
        label: T($, h)
      }), v > 0 && P.push({
        source: "Started",
        target: "Voluntary",
        value: v,
        label: T(v, h)
      }), m > 0 && P.push({
        source: "Started",
        target: "Involuntary",
        value: m,
        label: T(m, h)
      }), A > 0 && P.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: A,
        label: T(A, h)
      }), _ > 0 && P.push({
        source: "Involuntary",
        target: "Accepted",
        value: _,
        label: T(_, h)
      }), F > 0 && P.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: F,
        label: T(F, h)
      }), k > 0 && P.push({
        source: "Voluntary",
        target: "Confirmed",
        value: k,
        label: T(k, h)
      }), E > 0 && P.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: E,
        label: T(E, h)
      }), M > 0 && P.push({
        source: "Confirmed",
        target: "Paid",
        value: M,
        label: T(M, h)
      }), I > 0 && P.push({
        source: "Confirmed",
        target: "Rejected",
        value: I,
        label: T(I, h)
      }), C > 0 && P.push({
        source: "Confirmed",
        target: "Not Paid",
        value: C,
        label: T(C, h)
      }), { nodes: L, links: P };
    }), p = {
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
    return (g, h) => (y(), x("article", h0, [
      c("header", f0, [
        c("div", g0, [
          h[1] || (h[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Disruption Manager Metrics"),
            c("p", { class: "card-subtitle" }, "Disruption workflow performance and completion tracking")
          ], -1)),
          s.loading ? N("", !0) : (y(), x("div", p0, [
            h[0] || (h[0] = c("p", { class: "badge-label" }, "Payment Success Value", -1)),
            o.value.length > 0 ? (y(), x("div", b0, [
              (y(!0), x(j, null, Z(o.value, (b) => (y(), x("p", {
                key: b.currency,
                class: "currency-breakdown-item"
              }, w(b.currency) + " " + w(l(b.total_value)), 1))), 128))
            ])) : (y(), x("p", v0, w(l(0)), 1))
          ]))
        ])
      ]),
      s.loading ? (y(), x("div", m0, [...h[2] || (h[2] = [
        Y('<div class="loading-container" data-v-93ea6c83><div class="chart-bars-loader" data-v-93ea6c83><div class="bar bar-1" data-v-93ea6c83></div><div class="bar bar-2" data-v-93ea6c83></div><div class="bar bar-3" data-v-93ea6c83></div><div class="bar bar-4" data-v-93ea6c83></div><div class="bar bar-5" data-v-93ea6c83></div></div><p class="loading-text" data-v-93ea6c83>Loading disruption data...</p></div>', 1)
      ])])) : (y(), x("div", _0, [
        c("section", y0, [
          c("div", x0, [
            f.value.nodes.length > 0 && f.value.links.length > 0 ? (y(), ut(Jt, {
              key: 0,
              data: f.value,
              "node-colors": p,
              height: "500px"
            }, null, 8, ["data"])) : (y(), x("div", k0, [...h[3] || (h[3] = [
              c("p", { class: "empty-chart-text" }, "No disruption data available for visualization", -1)
            ])]))
          ])
        ]),
        i.value && i.value.length > 0 ? (y(), x("section", M0, [
          h[5] || (h[5] = Y('<div class="section-header" data-v-93ea6c83><h4 class="section-title" data-v-93ea6c83>Daily Overview</h4></div><div class="legend-container" data-v-93ea6c83><p class="legend-title" data-v-93ea6c83>Legend</p><div class="legend-items" data-v-93ea6c83><div class="legend-group" data-v-93ea6c83><span class="legend-label" data-v-93ea6c83>Voluntary:</span><span class="badge badge-vol" data-v-93ea6c83>VOL</span></div><div class="legend-group" data-v-93ea6c83><span class="legend-label" data-v-93ea6c83>Involuntary:</span><span class="badge badge-inv" data-v-93ea6c83>INV</span></div><div class="legend-note" data-v-93ea6c83><span data-v-93ea6c83>Vol=Voluntary</span><span data-v-93ea6c83>•</span><span data-v-93ea6c83>Inv=Involuntary</span></div></div></div>', 2)),
          c("div", S0, [
            c("table", w0, [
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
              c("tbody", $0, [
                (y(!0), x(j, null, Z(i.value, (b) => (y(), x("tr", {
                  key: b.date,
                  class: "table-row"
                }, [
                  c("td", C0, w(B(Ct)(b.date).format("DD/MM")), 1),
                  c("td", D0, w(B(W)(b.disruption_conversations)), 1),
                  c("td", A0, [
                    re(w(B(W)(b.disruption_initiated_count)) + " ", 1),
                    c("span", T0, " (" + w(r(b.disruption_initiated_count, b.disruption_conversations)) + ") ", 1)
                  ]),
                  c("td", B0, [
                    c("span", F0, w(B(W)(b.disruption_initiated_count - b.voluntary_count - b.involuntary_count)) + " (" + w(r(b.disruption_initiated_count - b.voluntary_count - b.involuntary_count, b.disruption_conversations)) + ") ", 1)
                  ]),
                  c("td", P0, [
                    c("div", L0, [
                      c("span", E0, " VOL " + w(B(W)(b.voluntary_count)) + " (" + w(r(b.voluntary_count, b.disruption_conversations)) + ") ", 1),
                      c("span", O0, " Confirm " + w(B(W)(b.confirmed_count)) + " (" + w(r(b.confirmed_count, b.disruption_conversations)) + ") ", 1),
                      c("span", R0, " Not Confirm " + w(B(W)(b.voluntary_count - b.confirmed_count)) + " (" + w(r(b.voluntary_count - b.confirmed_count, b.disruption_conversations)) + ") ", 1),
                      c("span", I0, " Reject " + w(B(W)(b.sell_failed_count)) + " (" + w(r(b.sell_failed_count, b.disruption_conversations)) + ") ", 1),
                      c("span", z0, " Not Paid " + w(B(W)(Math.max(0, b.confirmed_count - u(b) - b.sell_failed_count))) + " (" + w(r(Math.max(0, b.confirmed_count - u(b) - b.sell_failed_count), b.disruption_conversations)) + ") ", 1),
                      c("span", N0, " Finish " + w(B(W)(u(b))) + " (" + w(r(u(b), b.disruption_conversations)) + ") ", 1),
                      (y(!0), x(j, null, Z(b.payment_success_total || [], (v) => (y(), x("span", {
                        key: `${b.date}-${v.currency}`,
                        class: "badge badge-currency"
                      }, w(v.currency) + " " + w(l(v.total_value)), 1))), 128))
                    ])
                  ]),
                  c("td", W0, [
                    c("div", H0, [
                      c("span", V0, " INV " + w(B(W)(b.involuntary_count)) + " (" + w(r(b.involuntary_count, b.disruption_conversations)) + ") ", 1),
                      c("span", j0, " Human " + w(B(W)(b.involuntary_count - b.accepted_count)) + " (" + w(r(b.involuntary_count - b.accepted_count, b.disruption_conversations)) + ") ", 1),
                      c("span", Y0, " Accept " + w(B(W)(b.accepted_count)) + " (" + w(r(b.accepted_count, b.disruption_conversations)) + ") ", 1)
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), ut(B(gt), {
            key: 0,
            onExport: n,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ])) : (y(), x("section", q0, [...h[6] || (h[6] = [
          Y('<div class="empty-state-content" data-v-93ea6c83><div class="empty-icon-wrapper" data-v-93ea6c83><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-93ea6c83><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" data-v-93ea6c83></path></svg></div><p class="empty-title" data-v-93ea6c83>No disruption data available</p><p class="empty-description" data-v-93ea6c83>No disruption data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), K0 = /* @__PURE__ */ Q(U0, [["__scopeId", "data-v-93ea6c83"]]), X0 = { class: "faq-metrics-card" }, G0 = {
  key: 0,
  class: "card-body"
}, Z0 = { class: "kpi-grid" }, Q0 = { class: "kpi-card" }, J0 = { class: "kpi-value" }, tb = { class: "kpi-card" }, eb = { class: "kpi-value" }, sb = { class: "kpi-card kpi-card--airline" }, ab = { class: "kpi-value" }, nb = { class: "kpi-card kpi-card--booking" }, ib = { class: "kpi-value" }, ob = { class: "kpi-card kpi-card--flight" }, rb = { class: "kpi-value" }, lb = {
  key: 0,
  class: "chart-section"
}, cb = {
  key: 1,
  class: "empty-state"
}, db = {
  key: 1,
  class: "loading-state"
}, ub = /* @__PURE__ */ tt({
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
    const a = e, n = s, i = (p) => {
      n("export", p);
    }, { isDark: o, colors: r } = at(st(a, "theme")), l = Mt({ labels: [], datasets: [] }), d = D(() => a.data ?? {
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
    })), f = (p) => {
      if (!p) {
        l.value = { labels: [], datasets: [] };
        return;
      }
      const g = p.faq_by_day || [];
      if (g.length > 0) {
        const h = g.map((_) => Ct(_.date).format("MMM DD")), b = g.map((_) => _.airline_information_retrieved_count || 0), v = g.map((_) => _.flight_status_retrieved_count || 0), m = g.map((_) => _.booking_info_retrieved_count || 0);
        l.value = {
          labels: h,
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
              data: v,
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
              data: m,
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
    return jt(
      () => a.data,
      (p) => {
        f(p ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: o }), (p, g) => (y(), x("article", X0, [
      g[7] || (g[7] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "FAQ Metrics"),
          c("p", { class: "card-subtitle" }, "Daily FAQ consultation and retrieval metrics")
        ])
      ], -1)),
      a.loading ? (y(), x("div", db, [...g[6] || (g[6] = [
        Y('<div class="loading-container" data-v-5d2c3c33><div class="chart-bars-loader" data-v-5d2c3c33><div class="bar bar-1" data-v-5d2c3c33></div><div class="bar bar-2" data-v-5d2c3c33></div><div class="bar bar-3" data-v-5d2c3c33></div><div class="bar bar-4" data-v-5d2c3c33></div><div class="bar bar-5" data-v-5d2c3c33></div></div><p class="loading-text" data-v-5d2c3c33>Loading FAQ metrics...</p></div>', 1)
      ])])) : (y(), x("div", G0, [
        c("div", Z0, [
          c("div", Q0, [
            g[0] || (g[0] = c("span", { class: "kpi-label" }, "Total FAQ", -1)),
            c("span", J0, w(B(W)(d.value.total_faq_events)), 1)
          ]),
          c("div", tb, [
            g[1] || (g[1] = c("span", { class: "kpi-label" }, "Documents Found", -1)),
            c("span", eb, w(B(W)(d.value.total_documents_found)), 1)
          ]),
          c("div", sb, [
            g[2] || (g[2] = c("div", { class: "kpi-label-row" }, [
              c("span", {
                class: "kpi-color-dot",
                "aria-hidden": "true"
              }),
              c("span", { class: "kpi-label" }, "Airline Info")
            ], -1)),
            c("span", ab, w(B(W)(d.value.total_airline_information_retrieved)), 1)
          ]),
          c("div", nb, [
            g[3] || (g[3] = c("div", { class: "kpi-label-row" }, [
              c("span", {
                class: "kpi-color-dot",
                "aria-hidden": "true"
              }),
              c("span", { class: "kpi-label" }, "Booking Info")
            ], -1)),
            c("span", ib, w(B(W)(d.value.total_booking_info_retrieved)), 1)
          ]),
          c("div", ob, [
            g[4] || (g[4] = c("div", { class: "kpi-label-row" }, [
              c("span", {
                class: "kpi-color-dot",
                "aria-hidden": "true"
              }),
              c("span", { class: "kpi-label" }, "Flight Status")
            ], -1)),
            c("span", rb, w(B(W)(d.value.total_flight_status_retrieved)), 1)
          ])
        ]),
        l.value.labels && l.value.labels.length ? (y(), x("section", lb, [
          U(Qt, {
            data: l.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ut(B(gt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ])) : (y(), x("section", cb, [...g[5] || (g[5] = [
          Y('<div class="empty-state-content" data-v-5d2c3c33><div class="empty-icon-wrapper" data-v-5d2c3c33><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-5d2c3c33><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-5d2c3c33></path></svg></div><p class="empty-title" data-v-5d2c3c33>No FAQ data available</p><p class="empty-description" data-v-5d2c3c33>No FAQ consultation data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), hb = /* @__PURE__ */ Q(ub, [["__scopeId", "data-v-5d2c3c33"]]), fb = { class: "messages-per-agent-card" }, gb = {
  key: 0,
  class: "card-body"
}, pb = {
  key: 0,
  class: "chart-section"
}, bb = {
  key: 1,
  class: "empty-state"
}, vb = { class: "empty-state-content" }, mb = { class: "empty-icon-wrapper" }, _b = {
  key: 1,
  class: "loading-state"
}, yb = /* @__PURE__ */ tt({
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
    }, n = e, i = s, o = (f) => {
      i("export", f);
    }, { isDark: r, colors: l } = at(st(n, "theme")), d = D(() => {
      const f = n.data?.agents_by_day || {}, p = Object.keys(f).sort();
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const g = /* @__PURE__ */ new Set();
      for (const v of Object.values(f))
        for (const m of Object.keys(v))
          g.add(m);
      const b = Array.from(g).map((v) => {
        const m = a[v] || "#94a3b8";
        return {
          label: v.charAt(0).toUpperCase() + v.slice(1).replace(/_/g, " "),
          data: p.map((_) => f[_]?.[v] || 0),
          borderColor: m,
          backgroundColor: `${m}20`,
          pointBackgroundColor: m,
          pointBorderColor: r.value ? "#1a1a1d" : "#ffffff",
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
          tension: 0.3,
          fill: !1
        };
      });
      return {
        labels: p,
        datasets: b
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
    return t({ isDark: r }), (f, p) => (y(), x("article", fb, [
      p[3] || (p[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Messages per Agent"),
          c("p", { class: "card-subtitle" }, "Agent interaction trends over time")
        ])
      ], -1)),
      e.loading ? (y(), x("div", _b, [...p[2] || (p[2] = [
        Y('<div class="loading-container" data-v-b9368fc2><div class="chart-lines-loader" data-v-b9368fc2><div class="line line-1" data-v-b9368fc2></div><div class="line line-2" data-v-b9368fc2></div><div class="line line-3" data-v-b9368fc2></div><div class="line line-4" data-v-b9368fc2></div><div class="line line-5" data-v-b9368fc2></div></div><p class="loading-text" data-v-b9368fc2>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", gb, [
        d.value.labels && d.value.labels.length ? (y(), x("section", pb, [
          U(Qt, {
            data: d.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ut(B(gt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ])) : (y(), x("section", bb, [
          c("div", vb, [
            c("div", mb, [
              U(B(Dt), { class: "empty-icon" })
            ]),
            p[0] || (p[0] = c("p", { class: "empty-title" }, "No agent interactions data", -1)),
            p[1] || (p[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), xb = /* @__PURE__ */ Q(yb, [["__scopeId", "data-v-b9368fc2"]]), kb = { class: "record-locator-card" }, Mb = {
  key: 0,
  class: "loading-state"
}, Sb = {
  key: 1,
  class: "card-body"
}, wb = {
  key: 0,
  class: "chart-section"
}, $b = { class: "chart-wrapper" }, Cb = {
  key: 1,
  class: "table-section"
}, Db = { class: "table-wrapper" }, Ab = { class: "data-table" }, Tb = { class: "table-header-row" }, Bb = {
  key: 0,
  class: "table-header"
}, Fb = {
  key: 1,
  class: "table-header"
}, Pb = { class: "table-body" }, Lb = { class: "table-cell font-medium" }, Eb = { class: "table-cell text-center" }, Ob = { class: "table-cell text-center" }, Rb = { class: "table-cell text-center" }, Ib = { class: "table-cell text-center" }, zb = { class: "table-cell text-center success-value" }, Nb = { class: "table-cell text-center failed-value" }, Wb = { class: "table-cell text-center warning-value" }, Hb = {
  key: 0,
  class: "table-cell text-center"
}, Vb = {
  key: 1,
  class: "table-cell text-center failed-value"
}, jb = {
  key: 2,
  class: "empty-state"
}, Yb = /* @__PURE__ */ tt({
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
    const a = e, n = s, i = (g) => {
      n("export", g);
    }, { isDark: o } = at(st(a, "theme")), r = D(() => a.data?.record_locator_by_day ? [...a.data.record_locator_by_day].sort(
      (g, h) => new Date(g.date).getTime() - new Date(h.date).getTime()
    ) : []), l = D(() => a.data), d = D(() => ({
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
    })), u = (g, h) => !h || h === 0 ? "0%" : `${Math.round(g / h * 100)}%`, f = (g, h) => {
      const b = W(g), v = u(g, h);
      return `${b} (${v})`;
    }, p = D(() => {
      const g = [], h = [], b = /* @__PURE__ */ new Set(), v = (O) => {
        b.has(O) || (g.push({ name: O }), b.add(O));
      };
      if (!l.value.total_checkin_initiated)
        return { nodes: g, links: h };
      v("Checkin Init"), v("Booking retrive"), v("Checkin Started"), v("Checkin Completed"), v("Checkin Closed");
      const m = l.value.total_checkin_initiated, _ = l.value.total_record_locator_init, k = l.value.total_record_locator_started, M = l.value.total_record_locator_completed, S = l.value.total_record_locator_closed, $ = l.value.total_record_locator_failed, A = l.value.total_record_locator_abandoned, F = l.value.total_record_locator_init_abandoned, E = l.value.total_checkin_pre_init_abandoned_error, I = l.value.total_checkin_pre_init_abandoned_voluntary, C = E != null || I != null, T = C ? Math.max(Number(E) || 0, 0) : 0, L = C ? Math.max(Number(I) || 0, 0) : 0, P = l.value.total_record_locator_init_abandoned_error, R = l.value.total_record_locator_init_abandoned_voluntary, V = P != null || R != null, K = V ? Math.max(Number(P) || 0, 0) : 0, H = V ? Math.max(Number(R) || 0, 0) : 0;
      if (_ > 0) {
        const O = Math.round(_ / m * 100);
        h.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: _,
          label: `${_.toLocaleString()} (${O}%)`
        });
      }
      const z = m - _;
      if (C) {
        if (L > 0) {
          const O = Math.round(L / m * 100);
          v("Abandoned (Init)"), h.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: L,
            label: `${L.toLocaleString()} (${O}%)`
          });
        }
        if (T > 0) {
          const O = Math.round(T / m * 100);
          v("Booking not retreived"), h.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: T,
            label: `${T.toLocaleString()} (${O}%)`
          });
        }
      } else if (z > 0) {
        const O = Math.round(z / m * 100);
        v("Abandoned (Init)"), h.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: z,
          label: `${z.toLocaleString()} (${O}%)`
        });
      }
      if (k > 0) {
        const O = Math.round(k / m * 100);
        h.push({
          source: "Booking retrive",
          target: "Checkin Started",
          value: k,
          label: `${k.toLocaleString()} (${O}%)`
        });
      }
      if (V) {
        if (K > 0) {
          const O = Math.round(K / m * 100);
          v("Error"), h.push({
            source: "Booking retrive",
            target: "Error",
            value: K,
            label: `${K.toLocaleString()} (${O}%)`
          });
        }
        if (H > 0) {
          const O = Math.round(H / m * 100);
          v("Abandoned (Started)"), h.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: H,
            label: `${H.toLocaleString()} (${O}%)`
          });
        }
      } else if (F > 0) {
        const O = Math.round(F / m * 100);
        v("Abandoned (Started)"), h.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: F,
          label: `${F.toLocaleString()} (${O}%)`
        });
      }
      if (M > 0) {
        const O = Math.round(M / k * 100);
        h.push({
          source: "Checkin Started",
          target: "Checkin Completed",
          value: M,
          label: `${M.toLocaleString()} (${O}%)`
        });
      }
      if (S > 0) {
        const O = Math.round(S / k * 100);
        h.push({
          source: "Checkin Completed",
          target: "Checkin Closed",
          value: S,
          label: `${S.toLocaleString()} (${O}%)`
        });
      }
      if ($ > 0) {
        const O = Math.round($ / k * 100);
        v("Checkin Failed"), h.push({
          source: "Checkin Started",
          target: "Checkin Failed",
          value: $,
          label: `${$.toLocaleString()} (${O}%)`
        });
      }
      if (A > 0) {
        const O = Math.round(A / k * 100);
        v("Abandoned (Flow)"), h.push({
          source: "Checkin Started",
          target: "Abandoned (Flow)",
          value: A,
          label: `${A.toLocaleString()} (${O}%)`
        });
      }
      return { nodes: g, links: h };
    });
    return t({ isDark: o }), (g, h) => (y(), x("article", kb, [
      h[10] || (h[10] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Checkin by Record Locator Metrics"),
          c("p", { class: "card-subtitle" }, "Checkin by record locator retrieval and completion analysis")
        ])
      ], -1)),
      a.loading ? (y(), x("div", Mb, [...h[0] || (h[0] = [
        Y('<div class="loading-container" data-v-8ff34ad6><div class="chart-flow-loader" data-v-8ff34ad6><div class="flow-line flow-1" data-v-8ff34ad6></div><div class="flow-line flow-2" data-v-8ff34ad6></div><div class="flow-line flow-3" data-v-8ff34ad6></div><div class="flow-line flow-4" data-v-8ff34ad6></div><div class="flow-line flow-5" data-v-8ff34ad6></div></div><p class="loading-text" data-v-8ff34ad6>Loading record locator data...</p></div>', 1)
      ])])) : (y(), x("div", Sb, [
        p.value.nodes.length > 0 ? (y(), x("section", wb, [
          c("div", $b, [
            U(Jt, {
              data: p.value,
              height: "500px",
              "node-colors": d.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : N("", !0),
        r.value && r.value.length > 0 ? (y(), x("section", Cb, [
          c("div", Db, [
            c("table", Ab, [
              c("thead", null, [
                c("tr", Tb, [
                  h[1] || (h[1] = c("th", { class: "table-header" }, "Date", -1)),
                  h[2] || (h[2] = c("th", { class: "table-header" }, "Checkin Init", -1)),
                  h[3] || (h[3] = c("th", { class: "table-header" }, "Booking Retrieve (%)", -1)),
                  h[4] || (h[4] = c("th", { class: "table-header" }, "Checkin Started", -1)),
                  h[5] || (h[5] = c("th", { class: "table-header" }, "Checkin Completed (%)", -1)),
                  h[6] || (h[6] = c("th", { class: "table-header" }, "Checkin Closed (%)", -1)),
                  h[7] || (h[7] = c("th", { class: "table-header" }, "Checkin Failed (%)", -1)),
                  h[8] || (h[8] = c("th", { class: "table-header" }, "Abandoned (%)", -1)),
                  a.isAvianca ? (y(), x("th", Bb, "Create Payment")) : N("", !0),
                  a.isAvianca ? (y(), x("th", Fb, "Failed Payment")) : N("", !0)
                ])
              ]),
              c("tbody", Pb, [
                (y(!0), x(j, null, Z(r.value, (b) => (y(), x("tr", {
                  key: b.date,
                  class: "table-row"
                }, [
                  c("td", Lb, w(B(Ct)(b.date).format("DD/MM/YYYY")), 1),
                  c("td", Eb, w(B(W)(b.checkin_initiated)), 1),
                  c("td", Ob, w(f(b.record_locator_init_count, b.checkin_initiated)), 1),
                  c("td", Rb, w(B(W)(b.record_locator_started_count)), 1),
                  c("td", Ib, w(f(b.record_locator_completed_count, b.record_locator_started_count)), 1),
                  c("td", zb, w(f(b.record_locator_closed_count, b.record_locator_started_count)), 1),
                  c("td", Nb, w(f(b.record_locator_failed_count, b.record_locator_started_count)), 1),
                  c("td", Wb, w(f(b.record_locator_abandoned_count, b.record_locator_started_count)), 1),
                  a.isAvianca ? (y(), x("td", Hb, w(B(W)(b.record_locator_create_payment_count)), 1)) : N("", !0),
                  a.isAvianca ? (y(), x("td", Vb, w(B(W)(b.record_locator_create_payment_failed_count)), 1)) : N("", !0)
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), ut(B(gt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ])) : (y(), x("section", jb, [...h[9] || (h[9] = [
          Y('<div class="empty-state-content" data-v-8ff34ad6><div class="empty-icon-wrapper" data-v-8ff34ad6><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-8ff34ad6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" data-v-8ff34ad6></path></svg></div><p class="empty-title" data-v-8ff34ad6>No record locator data available</p><p class="empty-description" data-v-8ff34ad6>No record locator data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), qb = /* @__PURE__ */ Q(Yb, [["__scopeId", "data-v-8ff34ad6"]]), Ub = { class: "seller-metrics-card" }, Kb = { class: "card-header" }, Xb = { class: "header-content" }, Gb = {
  key: 0,
  class: "payment-success-badge"
}, Zb = {
  key: 0,
  class: "currency-breakdown-list"
}, Qb = {
  key: 1,
  class: "badge-value"
}, Jb = {
  key: 0,
  class: "loading-state"
}, tv = {
  key: 1,
  class: "card-body"
}, ev = {
  key: 0,
  class: "chart-section"
}, sv = { class: "chart-wrapper" }, av = {
  key: 1,
  class: "empty-state"
}, nv = {
  key: 2,
  class: "table-section"
}, iv = { class: "table-wrapper" }, ov = { class: "data-table" }, rv = { class: "table-body" }, lv = { class: "table-cell font-medium" }, cv = { class: "table-cell text-center" }, dv = { class: "table-cell text-center" }, uv = { class: "table-cell text-center" }, hv = { class: "table-cell text-center" }, fv = { class: "table-cell text-center" }, gv = { class: "table-cell text-center success-value" }, pv = {
  key: 0,
  class: "currency-cell-list"
}, bv = { key: 1 }, vv = { class: "table-cell text-left" }, mv = {
  key: 0,
  class: "failed-reasons"
}, _v = { class: "reason-name" }, yv = { class: "reason-count" }, xv = {
  key: 1,
  class: "empty-cell"
}, kv = /* @__PURE__ */ tt({
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
    const a = e, n = s, i = (_) => {
      n("export", _);
    }, { isDark: o } = at(st(a, "theme")), r = D(() => {
      if (!a.sellerData?.seller_by_day) return [];
      const _ = [...a.sellerData.seller_by_day];
      return a.failedData?.failed_by_reason_by_day && a.failedData.failed_by_reason_by_day.forEach((k) => {
        const M = _.findIndex((S) => S.date === k.date);
        M !== -1 ? _[M] = { ..._[M], reasons: k.reasons } : _.push({
          date: k.date,
          seller_conversations: 0,
          sell_started_count: 0,
          sell_get_quote_count: 0,
          sell_booking_created_count: 0,
          sell_success_count: 0,
          daily_value_sell_success: 0,
          reasons: k.reasons
        });
      }), _.sort((k, M) => new Date(k.date).getTime() - new Date(M.date).getTime());
    }), l = D(() => a.sellerData), d = D(() => a.failedData), u = D(
      () => Array.isArray(a.sellerData.total_value_sell_success) ? a.sellerData.total_value_sell_success : []
    ), f = D(() => {
      const {
        total_seller_conversations: _ = 0,
        total_sell_started: k = 0,
        total_sell_booking_created: M = 0,
        total_sell_success: S = 0
      } = l.value, { failed_by_reason_by_day: $ = [] } = d.value;
      if (_ === 0) return { nodes: [], links: [] };
      const A = [
        { name: "Sell Initiated", value: _ },
        { name: "Sell Started", value: k },
        { name: "Booking Created", value: M },
        { name: "Sell Success", value: S }
      ], F = [], E = _ - k;
      if (E > 0) {
        const L = Math.round(E / _ * 100);
        A.push({ name: "Abandoned (Init)", value: E }), F.push({
          source: "Sell Initiated",
          target: "Abandoned (Init)",
          value: E,
          label: `${E.toLocaleString()} (${L}%)`
        });
      }
      if (k > 0) {
        const L = Math.round(k / _ * 100);
        F.push({
          source: "Sell Initiated",
          target: "Sell Started",
          value: k,
          label: `${k.toLocaleString()} (${L}%)`
        });
      }
      const I = $.reduce((L, P) => (P.reasons && Array.isArray(P.reasons) && P.reasons.forEach((R) => {
        const V = R.reason, K = R.failed_count;
        L[V] = (L[V] || 0) + K;
      }), L), {});
      if (M > 0) {
        const L = Math.round(M / _ * 100);
        F.push({
          source: "Sell Started",
          target: "Booking Created",
          value: M,
          label: `${M.toLocaleString()} (${L}%)`
        });
      }
      if (S > 0) {
        const L = Math.round(S / _ * 100);
        F.push({
          source: "Booking Created",
          target: "Sell Success",
          value: S,
          label: `${S.toLocaleString()} (${L}%)`
        });
      }
      const C = k - M;
      if (C > 0) {
        const L = Math.round(C / _ * 100);
        A.push({ name: "Failed at Booking", value: C }), F.push({
          source: "Sell Started",
          target: "Failed at Booking",
          value: C,
          label: `${C.toLocaleString()} (${L}%)`
        });
      }
      if (Object.keys(I).length > 0) {
        const L = Object.values(I).reduce((R, V) => R + V, 0), P = C - L;
        if (Object.entries(I).filter(([, R]) => R > 0).sort(([, R], [, V]) => V - R).forEach(([R, V]) => {
          const K = Math.round(V / _ * 100);
          A.push({ name: `Failed: ${R}`, value: V }), F.push({
            source: "Failed at Booking",
            target: `Failed: ${R}`,
            value: V,
            label: `${V.toLocaleString()} (${K}%)`
          });
        }), P > 0) {
          const R = Math.round(P / _ * 100);
          A.push({ name: "Failed: Without Reason", value: P }), F.push({
            source: "Failed at Booking",
            target: "Failed: Without Reason",
            value: P,
            label: `${P.toLocaleString()} (${R}%)`
          });
        }
      }
      const T = M - S;
      if (T > 0) {
        const L = Math.round(T / _ * 100);
        A.push({ name: "Failed at Completion", value: T }), F.push({
          source: "Booking Created",
          target: "Failed at Completion",
          value: T,
          label: `${T.toLocaleString()} (${L}%)`
        });
      }
      return { nodes: A, links: F };
    }), p = {
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
    }, g = D(() => p), h = (_, k) => !k || k === 0 ? "0%" : `${Math.round(_ / k * 100)}%`, b = (_, k) => {
      const M = W(_), S = h(_, k);
      return `${M} (${S})`;
    }, v = (_) => _ == null ? 0 : typeof _ == "number" ? _ : Array.isArray(_) ? _.reduce((k, M) => k + (M.total_value || 0), 0) : 0, m = (_) => it(v(_));
    return t({ isDark: o }), (_, k) => (y(), x("article", Ub, [
      c("header", Kb, [
        c("div", Xb, [
          k[1] || (k[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Seller Metrics"),
            c("p", { class: "card-subtitle" }, "Sales performance and failure analysis")
          ], -1)),
          a.loading ? N("", !0) : (y(), x("div", Gb, [
            k[0] || (k[0] = c("p", { class: "badge-label" }, "Total Sales Value", -1)),
            u.value.length > 0 ? (y(), x("div", Zb, [
              (y(!0), x(j, null, Z(u.value, (M) => (y(), x("p", {
                key: M.currency,
                class: "currency-breakdown-item"
              }, w(M.currency) + " " + w(B(it)(M.total_value)), 1))), 128))
            ])) : (y(), x("p", Qb, w(m(a.sellerData.total_value_sell_success)), 1))
          ]))
        ])
      ]),
      a.loading ? (y(), x("div", Jb, [...k[2] || (k[2] = [
        Y('<div class="loading-container" data-v-601b983a><div class="chart-flow-loader" data-v-601b983a><div class="flow-line flow-1" data-v-601b983a></div><div class="flow-line flow-2" data-v-601b983a></div><div class="flow-line flow-3" data-v-601b983a></div><div class="flow-line flow-4" data-v-601b983a></div><div class="flow-line flow-5" data-v-601b983a></div></div><p class="loading-text" data-v-601b983a>Loading sales data...</p></div>', 1)
      ])])) : (y(), x("div", tv, [
        f.value.nodes.length > 0 ? (y(), x("section", ev, [
          c("div", sv, [
            U(Jt, {
              data: f.value,
              "node-colors": g.value,
              title: "",
              height: "320px"
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : (y(), x("section", av, [...k[3] || (k[3] = [
          Y('<div class="empty-state-content" data-v-601b983a><div class="empty-icon-wrapper" data-v-601b983a><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-601b983a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-601b983a></path></svg></div><p class="empty-title" data-v-601b983a>No sales data available</p><p class="empty-description" data-v-601b983a>No sales data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])])),
        r.value && r.value.length > 0 ? (y(), x("section", nv, [
          c("div", iv, [
            c("table", ov, [
              k[4] || (k[4] = c("thead", null, [
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
              c("tbody", rv, [
                (y(!0), x(j, null, Z(r.value, (M) => (y(), x("tr", {
                  key: M.date,
                  class: "table-row"
                }, [
                  c("td", lv, w(B(Ct)(M.date).format("DD/MM/YYYY")), 1),
                  c("td", cv, w(B(W)(M.seller_conversations || 0)), 1),
                  c("td", dv, w(b(M.sell_started_count, M.seller_conversations || M.sell_started_count)), 1),
                  c("td", uv, w(b(M.sell_get_quote_count, M.seller_conversations || M.sell_started_count)), 1),
                  c("td", hv, w(b(M.sell_booking_created_count, M.seller_conversations || M.sell_started_count)), 1),
                  c("td", fv, w(b(M.sell_success_count, M.seller_conversations || M.sell_started_count)), 1),
                  c("td", gv, [
                    Array.isArray(M.daily_value_sell_success) && M.daily_value_sell_success.length > 0 ? (y(), x("div", pv, [
                      (y(!0), x(j, null, Z(M.daily_value_sell_success, (S) => (y(), x("span", {
                        key: `${M.date}-${S.currency}`
                      }, w(S.currency) + " " + w(B(it)(S.total_value)), 1))), 128))
                    ])) : (y(), x("span", bv, w(m(M.daily_value_sell_success)), 1))
                  ]),
                  c("td", vv, [
                    M.reasons && M.reasons.length > 0 ? (y(), x("div", mv, [
                      (y(!0), x(j, null, Z(M.reasons, (S) => (y(), x("div", {
                        key: S.reason,
                        class: "failed-reason-item"
                      }, [
                        c("span", _v, w(S.reason) + ":", 1),
                        c("span", yv, w(S.failed_count), 1)
                      ]))), 128))
                    ])) : (y(), x("div", xv, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), ut(B(gt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ])) : N("", !0)
      ]))
    ]));
  }
}), Mv = /* @__PURE__ */ Q(kv, [["__scopeId", "data-v-601b983a"]]), Sv = { class: "top-agents-card" }, wv = {
  key: 0,
  class: "card-body"
}, $v = {
  key: 0,
  class: "chart-section"
}, Cv = {
  key: 1,
  class: "empty-state"
}, Dv = { class: "empty-state-content" }, Av = { class: "empty-icon-wrapper" }, Tv = {
  key: 1,
  class: "loading-state"
}, Bv = /* @__PURE__ */ tt({
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
    }, n = e, i = s, o = (f) => {
      i("export", f);
    }, { isDark: r, colors: l } = at(st(n, "theme")), d = D(() => {
      const p = (n.data?.top_agents || []).filter(
        (v) => v.agent_type?.toLowerCase() !== "triage"
      );
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const g = p.reduce(
        (v, m) => v + (Number(m.conversations) || 0),
        0
      ), h = p.map((v) => {
        const m = v.agent_type?.toLowerCase();
        return a[m] || "#94a3b8";
      }), b = h.map((v) => `${v}80`);
      return {
        labels: p.map((v) => {
          const m = Number(v.conversations) || 0, _ = g ? m / g * 100 : 0;
          return `${v.agent_type} - ${m.toLocaleString()} (${_.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: p.map((v) => v.conversations),
            backgroundColor: b,
            borderColor: h,
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
            label: (f) => {
              const p = (f.label || "").toString().split(" - ")[0], g = Number(f.parsed) || 0, h = (f.dataset.data || []).reduce(
                (v, m) => v + (Number(m) || 0),
                0
              ), b = h ? g / h * 100 : 0;
              return `${p}: ${g.toLocaleString()} (${b.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: r }), (f, p) => (y(), x("article", Sv, [
      p[3] || (p[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Top Agents"),
          c("p", { class: "card-subtitle" }, "Interactions by agent (excluding triage)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Tv, [...p[2] || (p[2] = [
        Y('<div class="loading-container" data-v-501bf4c4><div class="chart-lines-loader" data-v-501bf4c4><div class="line line-1" data-v-501bf4c4></div><div class="line line-2" data-v-501bf4c4></div><div class="line line-3" data-v-501bf4c4></div><div class="line line-4" data-v-501bf4c4></div><div class="line line-5" data-v-501bf4c4></div></div><p class="loading-text" data-v-501bf4c4>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", wv, [
        d.value.labels && d.value.labels.length ? (y(), x("section", $v, [
          U(ks, {
            data: d.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ut(B(gt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ])) : (y(), x("section", Cv, [
          c("div", Dv, [
            c("div", Av, [
              U(B(Of), { class: "empty-icon" })
            ]),
            p[0] || (p[0] = c("p", { class: "empty-title" }, "No top agents data", -1)),
            p[1] || (p[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Fv = /* @__PURE__ */ Q(Bv, [["__scopeId", "data-v-501bf4c4"]]), Pv = { class: "payment-method-card" }, Lv = { class: "card-header" }, Ev = { class: "header-content" }, Ov = {
  key: 0,
  class: "stats-badge"
}, Rv = {
  key: 0,
  class: "currency-breakdown-list"
}, Iv = {
  key: 1,
  class: "badge-value"
}, zv = {
  key: 0,
  class: "loading-state"
}, Nv = {
  key: 1,
  class: "card-body"
}, Wv = {
  key: 0,
  class: "payment-methods-section"
}, Hv = { class: "payment-methods-grid" }, Vv = { class: "payment-card-content" }, jv = { class: "payment-card-header" }, Yv = {
  key: 0,
  class: "currency-cell-list"
}, qv = { class: "payment-badge-wrapper" }, Uv = {
  key: 1,
  class: "empty-state"
}, Kv = { class: "empty-state-content" }, Xv = { class: "empty-icon-wrapper" }, Gv = {
  key: 2,
  class: "table-section"
}, Zv = { class: "table-wrapper" }, Qv = { class: "data-table" }, Jv = { class: "table-body" }, tm = { class: "table-cell font-medium" }, em = { class: "table-cell text-center" }, sm = { class: "table-cell text-center success-value" }, am = {
  key: 0,
  class: "currency-cell-list"
}, nm = { key: 1 }, im = { class: "table-cell" }, om = { class: "payment-tags" }, rm = { class: "tag-name" }, lm = {
  key: 0,
  class: "tag-amount"
}, cm = {
  key: 1,
  class: "tag-amount"
}, dm = { class: "tag-count" }, um = {
  key: 3,
  class: "empty-table-state"
}, hm = "Not Registered", fm = /* @__PURE__ */ tt({
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
    const a = e, n = s, { isDark: i } = at(st(a, "theme")), o = Mt(!1), r = Mt({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), l = D(() => r.value.payment_method_breakdown && r.value.payment_method_breakdown.length > 0), d = D(() => r.value.payment_method_by_day && r.value.payment_method_by_day.length > 0), u = D(() => !r.value.payment_method_by_day || r.value.payment_method_by_day.length === 0 ? [] : [...r.value.payment_method_by_day].sort((C, T) => Ct(C.date).valueOf() - Ct(T.date).valueOf())), f = (C) => {
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
      const T = (C.payment_method_breakdown || []).map((P) => ({
        payment_method: P.payment_method || "Unknown",
        total_amount: P.total_amount ?? 0,
        count: P.count ?? 0,
        total_amount_by_currency: P.total_amount_by_currency ?? []
      })), L = (C.payment_method_by_day || []).map((P) => ({
        date: P.date || "",
        total_count: P.total_count ?? 0,
        total_amount: P.total_amount ?? 0,
        total_amount_by_currency: P.total_amount_by_currency ?? [],
        payment_methods: (P.payment_methods || []).map((R) => ({
          payment_method: R.payment_method || "Unknown",
          total_amount: R.total_amount ?? 0,
          count: R.count ?? 0,
          total_amount_by_currency: R.total_amount_by_currency ?? []
        }))
      }));
      return {
        airline_name: C.airline_name || a.airlineName,
        start_date: C.start_date || "",
        end_date: C.end_date || "",
        total_conversations: C.total_conversations ?? 0,
        total_amount: C.total_amount ?? 0,
        total_amount_by_currency: C.total_amount_by_currency ?? [],
        payment_method_breakdown: T,
        payment_method_by_day: L
      };
    }, p = async () => {
      if (!(!a.fetchFunction || !a.dates || a.dates.length < 2 || !a.airlineName)) {
        o.value = !0;
        try {
          const [C, T] = a.dates.map((P) => Ct(P).format("YYYY-MM-DD")), L = await a.fetchFunction(a.airlineName, C, T);
          r.value = f(L);
        } catch (C) {
          console.error("Error fetching payment method metrics:", C), r.value = f(null);
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
    ], h = (C) => {
      const T = g[C % g.length];
      return {
        background: T.bg,
        borderColor: T.border
      };
    }, b = (C) => ({ color: g[C % g.length].text }), v = (C) => ({ color: g[C % g.length].value }), m = (C) => ({ color: g[C % g.length].icon }), _ = (C) => ({ color: g[C % g.length].badge }), k = (C) => {
      const L = $(C).length;
      return L > 18 ? { fontSize: "0.75rem" } : L > 15 ? { fontSize: "0.875rem" } : L > 12 ? { fontSize: "1rem" } : { fontSize: "1.125rem" };
    }, M = (C) => {
      const T = C?.toLowerCase() || "";
      return !C || T === "unknown" ? zf : T.includes("credit") || T.includes("debit") ? Rn : T.includes("cash") || T.includes("efectivo") ? Lf : T.includes("bank") || T.includes("transfer") ? Ef : T.includes("zelle") || T.includes("pago") || T.includes("movil") ? If : T.includes("wallet") ? Nf : Rf;
    }, S = (C) => !C || C.toLowerCase() === "unknown" ? hm : C.replace(/_/g, " "), $ = (C) => C == null ? "$0.00" : it(C), A = (C) => C ? Ct(C).format("DD/MM/YYYY") : "-", F = (C) => C == null || Number.isNaN(Number(C)) ? 0 : Number(C), E = (C) => {
      n("export", C);
    };
    function I() {
      const C = a.data;
      C && (Array.isArray(C.payment_method_breakdown) && C.payment_method_breakdown.length > 0 || Array.isArray(C.payment_method_by_day) && C.payment_method_by_day.length > 0) && (o.value = !1, r.value = f(C));
    }
    return fs(() => {
      a.data ? I() : p();
    }), jt(
      () => a.data,
      (C) => {
        C && I();
      },
      { deep: !0 }
    ), jt(
      () => a.dates,
      (C) => {
        a.data || C && C[0] && C[1] && p();
      },
      { deep: !0 }
    ), t({ isDark: i }), (C, T) => (y(), x("article", Pv, [
      c("header", Lv, [
        c("div", Ev, [
          T[1] || (T[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Payment Method Metrics"),
            c("p", { class: "card-subtitle" }, "Sales breakdown by payment method")
          ], -1)),
          !o.value && r.value.total_amount ? (y(), x("div", Ov, [
            T[0] || (T[0] = c("p", { class: "badge-label" }, "Total Amount", -1)),
            r.value.total_amount_by_currency && r.value.total_amount_by_currency.length > 0 ? (y(), x("div", Rv, [
              (y(!0), x(j, null, Z(r.value.total_amount_by_currency, (L) => (y(), x("p", {
                key: L.currency,
                class: "currency-breakdown-item"
              }, w(L.currency) + " " + w($(L.total_value)), 1))), 128))
            ])) : (y(), x("p", Iv, w($(r.value.total_amount)), 1))
          ])) : N("", !0)
        ])
      ]),
      o.value ? (y(), x("div", zv, [...T[2] || (T[2] = [
        Y('<div class="loading-container" data-v-e740c06b><div class="chart-lines-loader" data-v-e740c06b><div class="line line-1" data-v-e740c06b></div><div class="line line-2" data-v-e740c06b></div><div class="line line-3" data-v-e740c06b></div><div class="line line-4" data-v-e740c06b></div><div class="line line-5" data-v-e740c06b></div></div><p class="loading-text" data-v-e740c06b>Loading payment data...</p></div>', 1)
      ])])) : (y(), x("div", Nv, [
        l.value ? (y(), x("section", Wv, [
          T[3] || (T[3] = c("p", { class: "section-label" }, "Sales by Payment Method", -1)),
          c("div", Hv, [
            (y(!0), x(j, null, Z(r.value.payment_method_breakdown, (L, P) => (y(), x("div", {
              key: L.payment_method,
              class: "payment-method-card-item",
              style: _t(h(P))
            }, [
              c("div", Vv, [
                c("div", jv, [
                  (y(), ut(Xi(M(L.payment_method)), {
                    class: "payment-icon",
                    style: _t(m(P))
                  }, null, 8, ["style"])),
                  c("span", {
                    class: "payment-name",
                    style: _t(b(P))
                  }, w(S(L.payment_method)), 5)
                ]),
                c("p", {
                  class: "payment-amount",
                  style: _t([v(P), k(L.total_amount)])
                }, w($(L.total_amount)), 5),
                L.total_amount_by_currency && L.total_amount_by_currency.length > 0 ? (y(), x("div", Yv, [
                  (y(!0), x(j, null, Z(L.total_amount_by_currency, (R) => (y(), x("span", {
                    key: `${L.payment_method}-${R.currency}`
                  }, w(R.currency) + " " + w($(R.total_value)), 1))), 128))
                ])) : N("", !0),
                c("div", qv, [
                  c("span", {
                    class: "payment-badge",
                    style: _t(_(P))
                  }, w(F(L.count)) + " " + w(F(L.count) === 1 ? "sale" : "sales"), 5)
                ])
              ])
            ], 4))), 128))
          ])
        ])) : (y(), x("section", Uv, [
          c("div", Kv, [
            c("div", Xv, [
              U(B(Rn), { class: "empty-icon" })
            ]),
            T[4] || (T[4] = c("p", { class: "empty-title" }, "No payment data available", -1)),
            T[5] || (T[5] = c("p", { class: "empty-description" }, "No payment method data found for the selected period. Try adjusting the date range.", -1))
          ])
        ])),
        d.value ? (y(), x("section", Gv, [
          T[8] || (T[8] = c("p", { class: "section-label" }, "Daily Breakdown", -1)),
          c("div", Zv, [
            c("table", Qv, [
              T[7] || (T[7] = c("thead", null, [
                c("tr", { class: "table-header-row" }, [
                  c("th", { class: "table-header text-left" }, "Date"),
                  c("th", { class: "table-header text-center" }, "Total Sales"),
                  c("th", { class: "table-header text-center" }, "Total Amount"),
                  c("th", { class: "table-header text-left" }, "Payment Methods")
                ])
              ], -1)),
              c("tbody", Jv, [
                (y(!0), x(j, null, Z(u.value, (L) => (y(), x("tr", {
                  key: L.date,
                  class: "table-row"
                }, [
                  c("td", tm, w(A(L.date)), 1),
                  c("td", em, w(B(W)(L.total_count ?? 0)), 1),
                  c("td", sm, [
                    L.total_amount_by_currency && L.total_amount_by_currency.length > 0 ? (y(), x("div", am, [
                      (y(!0), x(j, null, Z(L.total_amount_by_currency, (P) => (y(), x("span", {
                        key: `${L.date}-${P.currency}`
                      }, w(P.currency) + " " + w($(P.total_value)), 1))), 128))
                    ])) : (y(), x("span", nm, w($(L.total_amount)), 1))
                  ]),
                  c("td", im, [
                    c("div", om, [
                      (y(!0), x(j, null, Z(L.payment_methods || [], (P) => (y(), x("div", {
                        key: P.payment_method,
                        class: "payment-tag"
                      }, [
                        c("span", rm, w(S(P.payment_method)), 1),
                        T[6] || (T[6] = c("span", { class: "tag-separator" }, "•", -1)),
                        !P.total_amount_by_currency || P.total_amount_by_currency.length === 0 ? (y(), x("span", lm, w($(P.total_amount)), 1)) : (y(), x("span", cm, w(P.total_amount_by_currency.map((R) => `${R.currency} ${$(R.total_value)}`).join(" / ")), 1)),
                        c("span", dm, "(" + w(F(P.count)) + ")", 1)
                      ]))), 128))
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), ut(B(gt), {
            key: 0,
            onExport: E,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ])) : l.value ? (y(), x("div", um, [...T[9] || (T[9] = [
          c("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
        ])])) : N("", !0)
      ]))
    ]));
  }
}), gm = /* @__PURE__ */ Q(fm, [["__scopeId", "data-v-e740c06b"]]), pm = { class: "agent-human-conv-card" }, bm = {
  key: 0,
  class: "loading-state"
}, vm = {
  key: 1,
  class: "card-body"
}, mm = { class: "summary-cards" }, _m = { class: "summary-card assigned-card" }, ym = { class: "summary-card-content" }, xm = { class: "card-content" }, km = { class: "card-value assigned-value" }, Mm = { class: "card-content" }, Sm = { class: "card-value assigned-value" }, wm = { class: "summary-card closed-card" }, $m = { class: "summary-card-content" }, Cm = { class: "card-content" }, Dm = { class: "card-value closed-value" }, Am = { class: "card-content" }, Tm = { class: "card-value closed-value" }, Bm = {
  key: 0,
  class: "agents-section"
}, Fm = { class: "date-header" }, Pm = { class: "date-title" }, Lm = { class: "date-stats" }, Em = { class: "stat-item assigned-stat" }, Om = { class: "stat-value" }, Rm = { class: "stat-value" }, Im = { class: "stat-item closed-stat" }, zm = { class: "stat-value" }, Nm = { class: "stat-value" }, Wm = { class: "table-wrapper" }, Hm = { class: "data-table" }, Vm = { class: "table-body" }, jm = { class: "table-cell name-cell" }, Ym = { class: "table-cell email-cell" }, qm = { class: "table-cell text-center" }, Um = { class: "metric-cell-content" }, Km = { class: "badge assigned-badge" }, Xm = { class: "metric-cell-avg" }, Gm = { class: "table-cell text-center" }, Zm = { class: "metric-cell-content" }, Qm = { class: "badge closed-badge" }, Jm = { class: "metric-cell-avg" }, t_ = {
  key: 1,
  class: "empty-state"
}, e_ = /* @__PURE__ */ tt({
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
    const a = e, n = s, i = (v) => {
      n("export", v);
    }, { isDark: o } = at(st(a, "theme")), r = D(() => a.data?.agents_by_day && a.data.agents_by_day.length > 0), l = D(() => {
      if (!r.value) return {};
      const v = {};
      for (const k of a.data.agents_by_day)
        v[k.date] || (v[k.date] = []), v[k.date].push(k);
      const m = Object.keys(v).sort((k, M) => new Date(k).getTime() - new Date(M).getTime()), _ = {};
      for (const k of m)
        _[k] = v[k];
      return _;
    }), d = (v) => v == null ? "0" : W(v), u = (v) => {
      if (v == null)
        return "AVG";
      if (v < 60)
        return `${Math.round(v)}s`;
      const m = Math.round(v), _ = Math.floor(m / 60), k = m % 60;
      if (_ < 60)
        return `${_}m ${k}s`;
      const M = Math.floor(_ / 60), S = _ % 60;
      return `${M}h ${S}m`;
    }, f = (v) => {
      const m = new Date(v), _ = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return m.toLocaleDateString("en-US", _);
    }, p = (v) => v[0]?.day_total_assigned ?? 0, g = (v) => v[0]?.day_total_closed ?? 0, h = (v) => v[0]?.day_avg_time_to_assign_seconds ?? null, b = (v) => v[0]?.day_avg_conversation_duration_seconds ?? null;
    return t({ isDark: o }), (v, m) => (y(), x("article", pm, [
      m[11] || (m[11] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Agent Human Conversations"),
          c("p", { class: "card-subtitle" }, "Human conversation assignments and closures by agent")
        ])
      ], -1)),
      e.loading ? (y(), x("div", bm, [...m[0] || (m[0] = [
        Y('<div class="loading-container" data-v-6cfba83b><div class="chart-bars-loader" data-v-6cfba83b><div class="bar bar-1" data-v-6cfba83b></div><div class="bar bar-2" data-v-6cfba83b></div><div class="bar bar-3" data-v-6cfba83b></div><div class="bar bar-4" data-v-6cfba83b></div><div class="bar bar-5" data-v-6cfba83b></div></div><p class="loading-text" data-v-6cfba83b>Loading agent data...</p></div>', 1)
      ])])) : (y(), x("div", vm, [
        c("div", mm, [
          c("div", _m, [
            m[3] || (m[3] = c("div", { class: "card-decoration" }, null, -1)),
            c("div", ym, [
              c("div", xm, [
                m[1] || (m[1] = c("p", { class: "card-label" }, "Total Assigned", -1)),
                c("p", km, w(d(e.data.total_assigned)), 1)
              ]),
              c("div", Mm, [
                m[2] || (m[2] = c("p", { class: "card-label" }, "AVG time to assign", -1)),
                c("p", Sm, w(u(e.data.avg_time_to_assign_seconds)), 1)
              ])
            ])
          ]),
          c("div", wm, [
            m[6] || (m[6] = c("div", { class: "card-decoration" }, null, -1)),
            c("div", $m, [
              c("div", Cm, [
                m[4] || (m[4] = c("p", { class: "card-label" }, "Total Closed", -1)),
                c("p", Dm, w(d(e.data.total_closed)), 1)
              ]),
              c("div", Am, [
                m[5] || (m[5] = c("p", { class: "card-label" }, "AVG time to close", -1)),
                c("p", Tm, w(u(e.data.avg_conversation_duration_seconds)), 1)
              ])
            ])
          ])
        ]),
        r.value ? (y(), x("div", Bm, [
          (y(!0), x(j, null, Z(l.value, (_, k) => (y(), x("div", {
            key: k,
            class: "date-group"
          }, [
            c("div", Fm, [
              c("h4", Pm, w(f(k)), 1),
              c("div", Lm, [
                c("span", Em, [
                  c("span", Om, w(d(p(_))), 1),
                  m[7] || (m[7] = re(" Assigned ", -1)),
                  c("span", Rm, w(u(h(_))), 1)
                ]),
                c("span", Im, [
                  c("span", zm, w(d(g(_))), 1),
                  m[8] || (m[8] = re(" Closed ", -1)),
                  c("span", Nm, w(u(b(_))), 1)
                ])
              ])
            ]),
            c("div", Wm, [
              c("table", Hm, [
                m[9] || (m[9] = c("thead", null, [
                  c("tr", { class: "table-header-row" }, [
                    c("th", { class: "table-header" }, "Agent Name"),
                    c("th", { class: "table-header" }, "Email"),
                    c("th", { class: "table-header" }, "Assigned (AVG time to assign)"),
                    c("th", { class: "table-header" }, "Closed (AVG time to close)")
                  ])
                ], -1)),
                c("tbody", Vm, [
                  (y(!0), x(j, null, Z(_, (M) => (y(), x("tr", {
                    key: `${k}-${M.agent_email}`,
                    class: "table-row"
                  }, [
                    c("td", jm, w(M.agent_name || "-"), 1),
                    c("td", Ym, w(M.agent_email), 1),
                    c("td", qm, [
                      c("div", Um, [
                        c("span", Km, w(d(M.assigned_count)), 1),
                        c("span", Xm, w(u(M.avg_time_to_assign_seconds)), 1)
                      ])
                    ]),
                    c("td", Gm, [
                      c("div", Zm, [
                        c("span", Qm, w(d(M.closed_count)), 1),
                        c("span", Jm, w(u(M.avg_conversation_duration_seconds)), 1)
                      ])
                    ])
                  ]))), 128))
                ])
              ])
            ])
          ]))), 128)),
          e.enableExport ? (y(), ut(B(gt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ])) : (y(), x("div", t_, [...m[10] || (m[10] = [
          Y('<div class="empty-state-content" data-v-6cfba83b><div class="empty-icon-wrapper" data-v-6cfba83b><svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-6cfba83b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-6cfba83b></path></svg></div><p class="empty-title" data-v-6cfba83b>No agent human conversation data available</p><p class="empty-description" data-v-6cfba83b>Try adjusting the date range or check your filters.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), s_ = /* @__PURE__ */ Q(e_, [["__scopeId", "data-v-6cfba83b"]]), a_ = { class: "channel-metrics-card" }, n_ = {
  key: 0,
  class: "card-body"
}, i_ = {
  key: 0,
  class: "kpi-grid"
}, o_ = { class: "kpi-label" }, r_ = { class: "kpi-value" }, l_ = { class: "kpi-card total-card" }, c_ = { class: "kpi-value" }, d_ = {
  key: 1,
  class: "chart-section"
}, u_ = {
  key: 2,
  class: "empty-state"
}, h_ = {
  key: 1,
  class: "loading-state"
}, f_ = /* @__PURE__ */ tt({
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
    const a = e, n = s, i = (p) => {
      n("export", p);
    }, { isDark: o, colors: r } = at(st(a, "theme")), l = Mt({ labels: [], datasets: [] }), d = D(() => a.data ?? {
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
    })), f = (p) => {
      if (!p || !p.channels_by_day) {
        l.value = { labels: [], datasets: [] };
        return;
      }
      const g = p.channels_by_day, h = Object.keys(g).sort();
      if (h.length === 0) {
        l.value = { labels: [], datasets: [] };
        return;
      }
      const b = /* @__PURE__ */ new Set();
      for (const k of Object.values(g))
        for (const M of Object.keys(k))
          b.add(M);
      const v = Array.from(b), m = {
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
      }, _ = v.map((k) => {
        const M = k.toLowerCase(), S = m[M] || "#9ca3af";
        return {
          label: k.toUpperCase(),
          data: h.map(($) => g[$]?.[k] || 0),
          borderColor: S,
          backgroundColor: `${S}1A`,
          // 1A = 10% opacity
          borderWidth: 2,
          fill: !0,
          tension: 0.4,
          pointBackgroundColor: S,
          pointBorderColor: S,
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        };
      });
      l.value = {
        labels: h.map((k) => Ct(k).format("MMM DD")),
        datasets: _
      };
    };
    return jt(
      () => a.data,
      (p) => {
        f(p ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: o }), (p, g) => (y(), x("article", a_, [
      g[3] || (g[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Channel Metrics"),
          c("p", { class: "card-subtitle" }, "Communication channels performance")
        ])
      ], -1)),
      a.loading ? (y(), x("div", h_, [...g[2] || (g[2] = [
        Y('<div class="loading-container" data-v-82f175d2><div class="chart-bars-loader" data-v-82f175d2><div class="bar bar-1" data-v-82f175d2></div><div class="bar bar-2" data-v-82f175d2></div><div class="bar bar-3" data-v-82f175d2></div><div class="bar bar-4" data-v-82f175d2></div><div class="bar bar-5" data-v-82f175d2></div></div><p class="loading-text" data-v-82f175d2>Loading channel metrics...</p></div>', 1)
      ])])) : (y(), x("div", n_, [
        Object.keys(d.value.total_by_channel).length ? (y(), x("div", i_, [
          (y(!0), x(j, null, Z(Object.keys(d.value.total_by_channel), (h) => (y(), x("div", {
            class: "kpi-card",
            key: h
          }, [
            c("span", o_, w(h.toUpperCase()), 1),
            c("span", r_, w(B(W)(d.value.total_by_channel[h])), 1)
          ]))), 128)),
          c("div", l_, [
            g[0] || (g[0] = c("span", { class: "kpi-label" }, "Total Conversations", -1)),
            c("span", c_, w(B(W)(d.value.total_conversations)), 1)
          ])
        ])) : N("", !0),
        l.value.labels && l.value.labels.length ? (y(), x("section", d_, [
          U(Qt, {
            data: l.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ut(B(gt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ])) : (y(), x("section", u_, [...g[1] || (g[1] = [
          Y('<div class="empty-state-content" data-v-82f175d2><div class="empty-icon-wrapper" data-v-82f175d2><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-82f175d2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-82f175d2></path></svg></div><p class="empty-title" data-v-82f175d2>No channel metrics data available</p><p class="empty-description" data-v-82f175d2>No channel data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), g_ = /* @__PURE__ */ Q(f_, [["__scopeId", "data-v-82f175d2"]]), p_ = { class: "triage-combinations-card" }, b_ = { class: "card-header" }, v_ = { class: "total-badge" }, m_ = {
  key: 0,
  class: "card-body"
}, __ = { class: "chart-container" }, y_ = { class: "table-container" }, x_ = { class: "table-row" }, k_ = { class: "table-row" }, M_ = { class: "table-cell text-center count-cell" }, S_ = { class: "table-cell text-center count-cell" }, w_ = { class: "table-cell text-center count-cell" }, $_ = { class: "table-cell text-center count-cell" }, C_ = { class: "table-cell text-center count-cell" }, D_ = {
  key: 1,
  class: "empty-state"
}, A_ = { class: "empty-state-content" }, T_ = { class: "empty-icon-wrapper" }, B_ = {
  key: 1,
  class: "loading-state"
}, F_ = /* @__PURE__ */ tt({
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
    const a = e, n = s, i = (m) => {
      n("export", m);
    }, { isDark: o, colors: r } = at(st(a, "theme")), l = D(() => {
      const m = a.data?.combinations || {}, _ = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [k, M] of Object.entries(m)) {
        const S = k.split("+").filter(Boolean);
        if (!S.includes("triage")) continue;
        const $ = S.filter((A) => A !== "triage").length;
        $ >= 4 ? _["4p"] += Number(M) || 0 : _[$] += Number(M) || 0;
      }
      return _;
    }), d = D(() => {
      const m = l.value;
      return m[0] + m[1] + m[2] + m[3] + m["4p"] || 0;
    }), u = D(() => Object.keys(a.data?.combinations || {}).length > 0), f = D(() => {
      const m = d.value;
      if (!m) return { pct0: 0, pct1: 0, pct2: 0, pct3: 0, pct4p: 0 };
      const _ = l.value;
      return {
        pct0: _[0] / m * 100,
        pct1: _[1] / m * 100,
        pct2: _[2] / m * 100,
        pct3: _[3] / m * 100,
        pct4p: _["4p"] / m * 100
      };
    }), p = {
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
    }, g = (m) => m?.replace("80", "") || "#888888", h = D(() => ({
      labels: ["Distribution"],
      datasets: [
        {
          label: "0",
          data: [f.value.pct0],
          backgroundColor: p.c0,
          borderColor: g(p.c0),
          borderWidth: 1
        },
        {
          label: "1",
          data: [f.value.pct1],
          backgroundColor: p.c1,
          borderColor: g(p.c1),
          borderWidth: 1
        },
        {
          label: "2",
          data: [f.value.pct2],
          backgroundColor: p.c2,
          borderColor: g(p.c2),
          borderWidth: 1
        },
        {
          label: "3",
          data: [f.value.pct3],
          backgroundColor: p.c3,
          borderColor: g(p.c3),
          borderWidth: 1
        },
        {
          label: "4+",
          data: [f.value.pct4p],
          backgroundColor: p.c4p,
          borderColor: g(p.c4p),
          borderWidth: 1
        }
      ]
    })), b = D(() => ({
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
            label: (m) => `${m.dataset.label} intent(s): ${Number(m.raw || 0).toFixed(0)}%`
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
    })), v = (m) => `${(Number(m) || 0).toFixed(0)}`;
    return t({ isDark: o }), (m, _) => (y(), x("article", p_, [
      c("header", b_, [
        _[0] || (_[0] = c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Distribution of Number of Intents"),
          c("p", { class: "card-subtitle" }, "Analysis of intent combinations per conversation")
        ], -1)),
        c("span", v_, " Total: " + w(d.value), 1)
      ]),
      e.loading ? (y(), x("div", B_, [..._[6] || (_[6] = [
        Y('<div class="loading-container" data-v-cb93cda2><div class="chart-bars-loader" data-v-cb93cda2><div class="bar bar-1" data-v-cb93cda2></div><div class="bar bar-2" data-v-cb93cda2></div><div class="bar bar-3" data-v-cb93cda2></div><div class="bar bar-4" data-v-cb93cda2></div><div class="bar bar-5" data-v-cb93cda2></div></div><p class="loading-text" data-v-cb93cda2>Loading intent distribution...</p></div>', 1)
      ])])) : (y(), x("div", m_, [
        u.value ? (y(), x(j, { key: 0 }, [
          c("div", __, [
            U(Zt, {
              data: h.value,
              options: b.value
            }, null, 8, ["data", "options"])
          ]),
          c("div", y_, [
            _[3] || (_[3] = Y('<div class="table-header" data-v-cb93cda2><div class="table-cell header-cell" data-v-cb93cda2>Number of intentions</div><div class="table-cell header-cell text-center" data-v-cb93cda2>0</div><div class="table-cell header-cell text-center" data-v-cb93cda2>1</div><div class="table-cell header-cell text-center" data-v-cb93cda2>2</div><div class="table-cell header-cell text-center" data-v-cb93cda2>3</div><div class="table-cell header-cell text-center" data-v-cb93cda2>4 or more</div></div>', 1)),
            c("div", x_, [
              _[1] || (_[1] = c("div", { class: "table-cell row-label" }, "% of total", -1)),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: _t({ color: g(p.c0) })
              }, w(v(f.value.pct0)) + "% ", 5),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: _t({ color: g(p.c1) })
              }, w(v(f.value.pct1)) + "% ", 5),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: _t({ color: g(p.c2) })
              }, w(v(f.value.pct2)) + "% ", 5),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: _t({ color: g(p.c3) })
              }, w(v(f.value.pct3)) + "% ", 5),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: _t({ color: g(p.c4p) })
              }, w(v(f.value.pct4p)) + "% ", 5)
            ]),
            c("div", k_, [
              _[2] || (_[2] = c("div", { class: "table-cell row-label" }, "Count", -1)),
              c("div", M_, w(B(W)(l.value[0])), 1),
              c("div", S_, w(B(W)(l.value[1])), 1),
              c("div", w_, w(B(W)(l.value[2])), 1),
              c("div", $_, w(B(W)(l.value[3])), 1),
              c("div", C_, w(B(W)(l.value["4p"])), 1)
            ])
          ]),
          e.enableExport ? (y(), ut(B(gt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ], 64)) : (y(), x("div", D_, [
          c("div", A_, [
            c("div", T_, [
              U(B(Dt), { class: "empty-icon" })
            ]),
            _[4] || (_[4] = c("p", { class: "empty-title" }, "No triage combinations data", -1)),
            _[5] || (_[5] = c("p", { class: "empty-description" }, "No intent distribution data found for the selected period. Try adjusting the date range.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), P_ = /* @__PURE__ */ Q(F_, [["__scopeId", "data-v-cb93cda2"]]), L_ = { class: "select-language-card" }, E_ = { class: "card-header" }, O_ = { class: "header-content" }, R_ = {
  key: 0,
  class: "total-badge"
}, I_ = { class: "badge-value" }, z_ = {
  key: 0,
  class: "loading-state"
}, N_ = {
  key: 1,
  class: "card-body"
}, W_ = {
  key: 0,
  class: "pie-section"
}, H_ = {
  key: 1,
  class: "empty-state"
}, V_ = /* @__PURE__ */ tt({
  __name: "SelectLanguage",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: a, colors: n } = at(st(s, "theme")), i = [
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
    }, r = (g) => o[g]?.label || g.toUpperCase(), l = D(
      () => s.data?.items && s.data.items.length > 0
    ), d = D(
      () => (s.data?.items || []).reduce((g, h) => g + h.count, 0)
    ), u = D(() => {
      const g = {};
      for (const h of s.data?.items || [])
        g[h.language] = (g[h.language] || 0) + h.count;
      return Object.entries(g).map(([h, b]) => ({ language: h, count: b })).sort((h, b) => b.count - h.count);
    }), f = D(() => ({
      labels: u.value.map((g) => r(g.language)),
      datasets: [{
        data: u.value.map((g) => g.count),
        backgroundColor: u.value.map((g, h) => i[h % i.length] + "80"),
        borderColor: u.value.map((g, h) => i[h % i.length]),
        borderWidth: 2,
        hoverOffset: 6
      }]
    })), p = D(() => ({
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
            label: (g) => {
              const h = g.raw || 0, b = d.value > 0 ? (h / d.value * 100).toFixed(1) : "0";
              return ` ${g.label}: ${h} (${b}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: a }), (g, h) => (y(), x("article", L_, [
      c("header", E_, [
        c("div", O_, [
          h[1] || (h[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Language Selection"),
            c("p", { class: "card-subtitle" }, "Language distribution across conversations")
          ], -1)),
          s.loading ? N("", !0) : (y(), x("div", R_, [
            h[0] || (h[0] = c("p", { class: "badge-label" }, "Total", -1)),
            c("p", I_, w(B(W)(d.value)), 1)
          ]))
        ])
      ]),
      s.loading ? (y(), x("div", z_, [...h[2] || (h[2] = [
        Y('<div class="loading-container" data-v-216eadc2><div class="chart-bars-loader" data-v-216eadc2><div class="bar bar-1" data-v-216eadc2></div><div class="bar bar-2" data-v-216eadc2></div><div class="bar bar-3" data-v-216eadc2></div><div class="bar bar-4" data-v-216eadc2></div><div class="bar bar-5" data-v-216eadc2></div></div><p class="loading-text" data-v-216eadc2>Loading language data...</p></div>', 1)
      ])])) : (y(), x("div", N_, [
        l.value ? (y(), x("section", W_, [
          U(ks, {
            data: f.value,
            options: p.value
          }, null, 8, ["data", "options"])
        ])) : (y(), x("section", H_, [...h[3] || (h[3] = [
          Y('<div class="empty-state-content" data-v-216eadc2><div class="empty-icon-wrapper" data-v-216eadc2><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-216eadc2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" data-v-216eadc2></path></svg></div><p class="empty-title" data-v-216eadc2>No language data available</p><p class="empty-description" data-v-216eadc2>No language selection data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), j_ = /* @__PURE__ */ Q(V_, [["__scopeId", "data-v-216eadc2"]]), Y_ = { class: "guardrails-card" }, q_ = { class: "card-header" }, U_ = { class: "header-content" }, K_ = {
  key: 0,
  class: "total-badge"
}, X_ = { class: "badge-value" }, G_ = {
  key: 0,
  class: "loading-state"
}, Z_ = {
  key: 1,
  class: "card-body"
}, Q_ = { class: "summary-card" }, J_ = { class: "summary-items" }, t1 = { class: "summary-item" }, e1 = { class: "summary-value" }, s1 = { class: "summary-pct" }, a1 = { class: "summary-item" }, n1 = { class: "summary-pct" }, i1 = { class: "summary-item" }, o1 = { class: "summary-value" }, r1 = { class: "summary-pct" }, l1 = {
  key: 0,
  class: "table-section"
}, c1 = { class: "table-wrapper" }, d1 = { class: "data-table" }, u1 = { class: "table-body" }, h1 = { class: "table-cell font-medium text-center" }, f1 = { class: "table-cell text-center font-semibold" }, g1 = { class: "table-cell" }, p1 = { class: "type-badges-row" }, b1 = {
  key: 1,
  class: "empty-state"
}, v1 = /* @__PURE__ */ tt({
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
    const a = e, n = s, i = (h) => {
      n("export", h);
    }, { isDark: o } = at(st(a, "theme")), r = D(
      () => a.data?.items && a.data.items.length > 0
    ), l = D(
      () => (a.data?.items || []).reduce((h, b) => h + b.count, 0)
    ), d = (h) => {
      const b = {};
      for (const _ of a.data?.items || [])
        b[_[h]] = (b[_[h]] || 0) + _.count;
      const v = Object.entries(b).sort((_, k) => k[1] - _[1]);
      if (v.length === 0) return { name: "—", pct: 0 };
      const m = l.value;
      return {
        name: v[0][0],
        pct: m > 0 ? Math.round(v[0][1] / m * 100) : 0
      };
    }, u = D(() => d("guardrail_type")), f = D(() => d("guardrail_action")), p = D(() => d("guardrail_source")), g = D(() => {
      const h = {};
      for (const b of a.data?.items || [])
        h[b.date] || (h[b.date] = {}), h[b.date][b.guardrail_type] = (h[b.date][b.guardrail_type] || 0) + b.count;
      return Object.entries(h).map(([b, v]) => ({
        date: b,
        total: Object.values(v).reduce((m, _) => m + _, 0),
        types: Object.entries(v).map(([m, _]) => ({ type: m, count: _ })).sort((m, _) => _.count - m.count)
      })).sort((b, v) => new Date(b.date).getTime() - new Date(v.date).getTime());
    });
    return t({ isDark: o }), (h, b) => (y(), x("article", Y_, [
      c("header", q_, [
        c("div", U_, [
          b[1] || (b[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Guardrails Metrics"),
            c("p", { class: "card-subtitle" }, "Content safety guardrail events and actions")
          ], -1)),
          a.loading ? N("", !0) : (y(), x("div", K_, [
            b[0] || (b[0] = c("p", { class: "badge-label" }, "Total Events", -1)),
            c("p", X_, w(B(W)(l.value)), 1)
          ]))
        ])
      ]),
      a.loading ? (y(), x("div", G_, [...b[2] || (b[2] = [
        Y('<div class="loading-container" data-v-3db385ab><div class="chart-bars-loader" data-v-3db385ab><div class="bar bar-1" data-v-3db385ab></div><div class="bar bar-2" data-v-3db385ab></div><div class="bar bar-3" data-v-3db385ab></div><div class="bar bar-4" data-v-3db385ab></div><div class="bar bar-5" data-v-3db385ab></div></div><p class="loading-text" data-v-3db385ab>Loading guardrails data...</p></div>', 1)
      ])])) : (y(), x("div", Z_, [
        r.value ? (y(), x(j, { key: 0 }, [
          c("div", Q_, [
            c("div", J_, [
              c("div", t1, [
                b[3] || (b[3] = c("span", { class: "summary-label" }, "Top type:", -1)),
                c("span", e1, w(u.value.name), 1),
                c("span", s1, "(" + w(u.value.pct) + "%)", 1)
              ]),
              b[6] || (b[6] = c("span", { class: "summary-dot" }, "·", -1)),
              c("div", a1, [
                b[4] || (b[4] = c("span", { class: "summary-label" }, "Top action:", -1)),
                c("span", {
                  class: Le(["summary-value", `summary-action-${f.value.name.toLowerCase()}`])
                }, w(f.value.name), 3),
                c("span", n1, "(" + w(f.value.pct) + "%)", 1)
              ]),
              b[7] || (b[7] = c("span", { class: "summary-dot" }, "·", -1)),
              c("div", i1, [
                b[5] || (b[5] = c("span", { class: "summary-label" }, "Top source:", -1)),
                c("span", o1, w(p.value.name), 1),
                c("span", r1, "(" + w(p.value.pct) + "%)", 1)
              ])
            ])
          ]),
          g.value.length > 0 ? (y(), x("section", l1, [
            b[9] || (b[9] = c("div", { class: "section-header" }, [
              c("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            c("div", c1, [
              c("table", d1, [
                b[8] || (b[8] = c("thead", null, [
                  c("tr", { class: "table-header-row" }, [
                    c("th", { class: "table-header" }, "Date"),
                    c("th", { class: "table-header text-center" }, "Count"),
                    c("th", { class: "table-header" }, "Types")
                  ])
                ], -1)),
                c("tbody", u1, [
                  (y(!0), x(j, null, Z(g.value, (v) => (y(), x("tr", {
                    key: v.date,
                    class: "table-row"
                  }, [
                    c("td", h1, w(B(Ct)(v.date).format("DD/MM")), 1),
                    c("td", f1, w(B(W)(v.total)), 1),
                    c("td", g1, [
                      c("div", p1, [
                        (y(!0), x(j, null, Z(v.types, (m) => (y(), x("span", {
                          key: m.type,
                          class: "type-count-badge"
                        }, w(m.type) + " (" + w(m.count) + ") ", 1))), 128))
                      ])
                    ])
                  ]))), 128))
                ])
              ])
            ]),
            e.enableExport ? (y(), ut(B(gt), {
              key: 0,
              onExport: i,
              loading: e.exportLoading
            }, null, 8, ["loading"])) : N("", !0)
          ])) : N("", !0)
        ], 64)) : (y(), x("section", b1, [...b[10] || (b[10] = [
          Y('<div class="empty-state-content" data-v-3db385ab><div class="empty-icon-wrapper" data-v-3db385ab><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-3db385ab><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" data-v-3db385ab></path></svg></div><p class="empty-title" data-v-3db385ab>No guardrail events</p><p class="empty-description" data-v-3db385ab>No content safety events found for the selected period. This is a good sign!</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), m1 = /* @__PURE__ */ Q(v1, [["__scopeId", "data-v-3db385ab"]]), _1 = { class: "dn-metrics-card" }, y1 = { class: "card-header" }, x1 = { class: "header-content" }, k1 = {
  key: 0,
  class: "total-docs-badge"
}, M1 = { class: "badge-value" }, S1 = {
  key: 0,
  class: "loading-state"
}, w1 = {
  key: 1,
  class: "card-body"
}, $1 = { class: "kpi-grid" }, C1 = { class: "kpi-card kpi-neutral" }, D1 = { class: "kpi-value" }, A1 = { class: "kpi-card kpi-success" }, T1 = { class: "kpi-value kpi-value-success" }, B1 = { class: "kpi-pct" }, F1 = { class: "kpi-card kpi-danger" }, P1 = { class: "kpi-value kpi-value-error" }, L1 = { class: "kpi-pct" }, E1 = { class: "kpi-card kpi-warning" }, O1 = { class: "kpi-value kpi-value-reason" }, R1 = { class: "kpi-pct" }, I1 = { class: "chart-section" }, z1 = { class: "chart-wrapper" }, N1 = {
  key: 1,
  class: "empty-chart"
}, W1 = {
  key: 0,
  class: "table-section"
}, H1 = { class: "table-wrapper" }, V1 = { class: "data-table" }, j1 = { class: "table-body" }, Y1 = { class: "table-cell text-left font-medium" }, q1 = { class: "table-cell text-center font-semibold" }, U1 = { class: "table-cell text-center" }, K1 = { class: "impact-bar-container" }, X1 = { class: "impact-label" }, G1 = {
  key: 1,
  class: "chart-section"
}, Z1 = { class: "chart-wrapper" }, Q1 = { class: "system-health" }, J1 = { class: "system-health-content" }, ty = { class: "sys-kpi-grid" }, ey = { class: "sys-kpi" }, sy = { class: "sys-value" }, ay = { class: "sys-kpi" }, ny = { class: "sys-value" }, iy = { class: "sys-kpi" }, oy = { class: "sys-value sys-error" }, ry = { class: "sys-kpi" }, ly = { class: "sys-value" }, cy = { class: "sys-kpi" }, dy = { class: "sys-value" }, uy = { class: "sys-kpi" }, hy = { class: "sys-value sys-error" }, fy = {
  key: 1,
  class: "empty-state"
}, gy = /* @__PURE__ */ tt({
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
    const a = e, n = s, i = (M) => {
      n("export", M);
    }, { isDark: o, colors: r } = at(st(a, "theme")), l = D(() => {
      const M = a.data?.documentCounts?.items || [], S = a.data?.processingCounts?.items || [];
      return M.length > 0 || S.length > 0;
    }), d = D(() => {
      const M = a.data?.documentCounts?.items || [];
      return {
        processing_started: M.reduce((S, $) => S + $.processing_started, 0),
        processing_completed: M.reduce((S, $) => S + $.processing_completed, 0),
        processing_failed: M.reduce((S, $) => S + $.processing_failed, 0),
        row_count_total: M.reduce((S, $) => S + $.row_count_total, 0)
      };
    }), u = D(() => {
      const M = a.data?.processingCounts?.items || [];
      return {
        processing_started: M.reduce((S, $) => S + $.processing_started, 0),
        processing_success: M.reduce((S, $) => S + $.processing_success, 0),
        notification_sent: M.reduce((S, $) => S + $.notification_sent, 0),
        notification_failed: M.reduce((S, $) => S + $.notification_failed, 0),
        dq_phone: M.reduce((S, $) => S + $.dq_error_phone_not_found, 0),
        dq_flight: M.reduce((S, $) => S + $.dq_error_flight_not_found, 0),
        dq_booking: M.reduce((S, $) => S + $.dq_error_booking_not_found, 0),
        dq_other: M.reduce((S, $) => S + $.dq_error_other, 0),
        totalDqErrors: M.reduce((S, $) => S + $.dq_error_phone_not_found + $.dq_error_flight_not_found + $.dq_error_booking_not_found + $.dq_error_other, 0)
      };
    }), f = D(() => d.value.row_count_total || u.value.processing_started), p = D(() => Math.max(0, f.value - u.value.notification_sent)), g = (M, S) => S ? `${Math.round(M / S * 100)}%` : "0%", h = D(() => {
      const M = [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Notification failed", count: u.value.notification_failed },
        { reason: "Other", count: u.value.dq_other }
      ].filter((S) => S.count > 0).sort((S, $) => $.count - S.count);
      return M.length > 0 ? M[0] : { reason: "None", count: 0 };
    }), b = D(() => {
      const M = f.value;
      return [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Notification failed", count: u.value.notification_failed },
        { reason: "Other", count: u.value.dq_other }
      ].map((S) => ({
        ...S,
        impactPct: M > 0 ? Math.round(S.count / M * 100) : 0
      }));
    }), v = D(() => {
      const M = f.value, S = u.value.processing_success, $ = Math.max(0, S - u.value.totalDqErrors), A = u.value.notification_sent, F = Math.max(0, M - S), E = u.value.totalDqErrors, I = Math.max(0, $ - A), C = (P, R) => {
        const V = R > 0 ? Math.round(P / R * 100) : 0;
        return `${P.toLocaleString()} (${V}%)`;
      }, T = [
        { name: "Records Detected" },
        { name: "Valid Reservations" },
        { name: "Invalid / Unprocessed" },
        { name: "Contactable" },
        { name: "Data Quality Issues" },
        { name: "Notified" },
        { name: "Not Delivered" }
      ], L = [];
      return S > 0 && L.push({ source: "Records Detected", target: "Valid Reservations", value: S, label: C(S, M) }), F > 0 && L.push({ source: "Records Detected", target: "Invalid / Unprocessed", value: F, label: C(F, M) }), $ > 0 && L.push({ source: "Valid Reservations", target: "Contactable", value: $, label: C($, M) }), E > 0 && L.push({ source: "Valid Reservations", target: "Data Quality Issues", value: E, label: C(E, M) }), A > 0 && L.push({ source: "Contactable", target: "Notified", value: A, label: C(A, M) }), I > 0 && L.push({ source: "Contactable", target: "Not Delivered", value: I, label: C(I, M) }), { nodes: T, links: L };
    }), m = {
      "Records Detected": "#DBEAFE",
      "Valid Reservations": "#D1FAE5",
      "Invalid / Unprocessed": "#FEE2E2",
      Contactable: "#BBF7D0",
      "Data Quality Issues": "#FED7AA",
      Notified: "#86EFAC",
      "Not Delivered": "#FCA5A5"
    }, _ = D(() => {
      const M = [...a.data?.processingCounts?.items || []].sort(
        (C, T) => new Date(C.date).getTime() - new Date(T.date).getTime()
      ), S = a.data?.documentCounts?.items || [], $ = {};
      for (const C of S)
        $[C.date] = ($[C.date] || 0) + C.row_count_total;
      const A = [.../* @__PURE__ */ new Set([...M.map((C) => C.date), ...S.map((C) => C.date)])].sort(), F = A.map((C) => Ct(C).format("MMM DD")), E = A.map((C) => {
        const T = M.find((R) => R.date === C), L = T?.notification_sent || 0, P = $[C] || T?.processing_started || 0;
        return P > 0 ? Math.round(L / P * 100) : 0;
      }), I = A.map((C) => M.find((L) => L.date === C)?.notification_sent || 0);
      return {
        labels: F,
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
            data: I,
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
    }), k = D(() => ({
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
            label: (M) => M.datasetIndex === 0 ? ` Success Rate: ${M.raw}%` : ` Notifications: ${M.raw}`
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
          ticks: { font: { family: "'DM Sans', sans-serif", size: 11 }, color: r.value.textSecondary, callback: (M) => M + "%" },
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
    return t({ isDark: o }), (M, S) => (y(), x("article", _1, [
      c("header", y1, [
        c("div", x1, [
          S[1] || (S[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Disruption Notifier"),
            c("p", { class: "card-subtitle" }, "Passenger notification effectiveness and delivery analysis")
          ], -1)),
          a.loading ? N("", !0) : (y(), x("div", k1, [
            S[0] || (S[0] = c("p", { class: "badge-label" }, "Total Records", -1)),
            c("p", M1, w(B(W)(d.value.row_count_total)), 1)
          ]))
        ])
      ]),
      a.loading ? (y(), x("div", S1, [...S[2] || (S[2] = [
        Y('<div class="loading-container" data-v-d8baf32c><div class="chart-bars-loader" data-v-d8baf32c><div class="bar bar-1" data-v-d8baf32c></div><div class="bar bar-2" data-v-d8baf32c></div><div class="bar bar-3" data-v-d8baf32c></div><div class="bar bar-4" data-v-d8baf32c></div><div class="bar bar-5" data-v-d8baf32c></div></div><p class="loading-text" data-v-d8baf32c>Loading disruption notifier data...</p></div>', 1)
      ])])) : (y(), x("div", w1, [
        l.value ? (y(), x(j, { key: 0 }, [
          c("div", $1, [
            c("div", C1, [
              S[3] || (S[3] = c("span", { class: "kpi-label" }, "Passengers Affected", -1)),
              c("span", D1, w(B(W)(f.value)), 1)
            ]),
            c("div", A1, [
              S[4] || (S[4] = c("span", { class: "kpi-label" }, "Successfully Notified", -1)),
              c("span", T1, w(B(W)(u.value.notification_sent)), 1),
              c("span", B1, w(g(u.value.notification_sent, f.value)), 1)
            ]),
            c("div", F1, [
              S[5] || (S[5] = c("span", { class: "kpi-label" }, "Not Notified", -1)),
              c("span", P1, w(B(W)(p.value)), 1),
              c("span", L1, w(g(p.value, f.value)), 1)
            ]),
            c("div", E1, [
              S[6] || (S[6] = c("span", { class: "kpi-label" }, "Main Failure Reason", -1)),
              c("span", O1, w(h.value.reason), 1),
              c("span", R1, w(B(W)(h.value.count)) + " cases", 1)
            ])
          ]),
          c("section", I1, [
            S[8] || (S[8] = c("div", { class: "chart-header" }, [
              c("h4", { class: "section-title" }, "Passenger Disruption Funnel")
            ], -1)),
            c("div", z1, [
              v.value.nodes.length > 0 && v.value.links.length > 0 ? (y(), ut(Jt, {
                key: 0,
                data: v.value,
                "node-colors": m,
                height: "350px"
              }, null, 8, ["data"])) : (y(), x("div", N1, [...S[7] || (S[7] = [
                c("p", { class: "empty-chart-text" }, "No processing data available for visualization", -1)
              ])]))
            ])
          ]),
          b.value.length > 0 ? (y(), x("section", W1, [
            S[10] || (S[10] = c("div", { class: "section-header" }, [
              c("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
            ], -1)),
            c("div", H1, [
              c("table", V1, [
                S[9] || (S[9] = c("thead", null, [
                  c("tr", { class: "table-header-row" }, [
                    c("th", { class: "table-header text-left" }, "Reason"),
                    c("th", { class: "table-header text-center" }, "Count"),
                    c("th", { class: "table-header text-center" }, "Impact")
                  ])
                ], -1)),
                c("tbody", j1, [
                  (y(!0), x(j, null, Z(b.value, ($) => (y(), x("tr", {
                    key: $.reason,
                    class: "table-row"
                  }, [
                    c("td", Y1, w($.reason), 1),
                    c("td", q1, w(B(W)($.count)), 1),
                    c("td", U1, [
                      c("div", K1, [
                        c("div", {
                          class: "impact-bar",
                          style: _t({ width: $.impactPct + "%" })
                        }, null, 4),
                        c("span", X1, w($.impactPct) + "%", 1)
                      ])
                    ])
                  ]))), 128))
                ])
              ])
            ])
          ])) : N("", !0),
          _.value.labels.length > 0 ? (y(), x("section", G1, [
            S[11] || (S[11] = c("div", { class: "chart-header" }, [
              c("h4", { class: "section-title" }, "Notification Success Rate by Day")
            ], -1)),
            c("div", Z1, [
              U(Qt, {
                data: _.value,
                options: k.value
              }, null, 8, ["data", "options"])
            ])
          ])) : N("", !0),
          c("details", Q1, [
            S[18] || (S[18] = c("summary", { class: "system-health-toggle" }, [
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
              re(" System Health Details ")
            ], -1)),
            c("div", J1, [
              c("div", ty, [
                c("div", ey, [
                  S[12] || (S[12] = c("span", { class: "sys-label" }, "Docs Started", -1)),
                  c("span", sy, w(B(W)(d.value.processing_started)), 1)
                ]),
                c("div", ay, [
                  S[13] || (S[13] = c("span", { class: "sys-label" }, "Docs Completed", -1)),
                  c("span", ny, w(B(W)(d.value.processing_completed)), 1)
                ]),
                c("div", iy, [
                  S[14] || (S[14] = c("span", { class: "sys-label" }, "Docs Failed", -1)),
                  c("span", oy, w(B(W)(d.value.processing_failed)), 1)
                ]),
                c("div", ry, [
                  S[15] || (S[15] = c("span", { class: "sys-label" }, "Processing Started", -1)),
                  c("span", ly, w(B(W)(u.value.processing_started)), 1)
                ]),
                c("div", cy, [
                  S[16] || (S[16] = c("span", { class: "sys-label" }, "Processing Success", -1)),
                  c("span", dy, w(B(W)(u.value.processing_success)), 1)
                ]),
                c("div", uy, [
                  S[17] || (S[17] = c("span", { class: "sys-label" }, "Notification Failed", -1)),
                  c("span", hy, w(B(W)(u.value.notification_failed)), 1)
                ])
              ])
            ])
          ]),
          e.enableExport ? (y(), ut(B(gt), {
            key: 2,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ], 64)) : (y(), x("section", fy, [...S[19] || (S[19] = [
          Y('<div class="empty-state-content" data-v-d8baf32c><div class="empty-icon-wrapper" data-v-d8baf32c><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d8baf32c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" data-v-d8baf32c></path></svg></div><p class="empty-title" data-v-d8baf32c>No disruption notifier data</p><p class="empty-description" data-v-d8baf32c>No disruption notification data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), py = /* @__PURE__ */ Q(gy, [["__scopeId", "data-v-d8baf32c"]]), by = { class: "nps-daily-card" }, vy = { class: "card-header" }, my = { class: "header-content" }, _y = {
  key: 0,
  class: "stats-badge"
}, yy = { class: "badge-value" }, xy = {
  key: 0,
  class: "loading-state"
}, ky = {
  key: 1,
  class: "card-body"
}, My = { class: "tooltip-content" }, Sy = { class: "tooltip-title" }, wy = { class: "tooltip-stats" }, $y = { class: "tooltip-stat-row" }, Cy = { class: "tooltip-value" }, Dy = { class: "tooltip-stat-row" }, Ay = { class: "tooltip-value" }, Ty = { class: "tooltip-stat-row" }, By = { class: "tooltip-value" }, Fy = { class: "tooltip-stat-row" }, Py = { class: "tooltip-value" }, Ly = { class: "tooltip-stat-row" }, Ey = { class: "tooltip-value" }, Oy = { class: "tooltip-stat-row" }, Ry = { class: "tooltip-value" }, Iy = {
  key: 2,
  class: "empty-state"
}, In = 400, $e = 60, zn = 90, Nn = 120, zy = {
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
    const a = s, n = (v) => {
      a("export", v);
    }, i = e, { isDark: o } = at(st(i, "theme")), r = D(() => i.data), l = Mt(null), d = Mt({
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
      const v = r.value.nps_by_day.length;
      return Math.max(800, $e * 2 + v * Nn);
    }), f = (v, m) => {
      const k = (v - 1) / 9;
      return $e + m - k * m;
    }, p = (v) => v ? Ct(v).format("DD-MM-YYYY") : "", g = D(() => {
      if (!r.value || !r.value.nps_by_day || r.value.nps_by_day.length === 0)
        return [];
      const v = [], m = In - $e - zn;
      return r.value.nps_by_day.forEach((_, k) => {
        const M = _.min_score || 0, S = _.q1_score || 0, $ = _.median_score || 0, A = _.q3_score || 0, F = _.max_score || 0, E = _.average_score || 0;
        v.push({
          label: p(_.date),
          responseCount: _.nps_responses_count || 0,
          isTotal: !1,
          low: M,
          q1: S,
          median: $,
          q3: A,
          high: F,
          average: E,
          highY: f(F, m),
          lowY: f(M, m),
          q1Y: f(S, m),
          q3Y: f(A, m),
          medianY: f($, m),
          averageY: E > 0 ? f(E, m) : null,
          centerX: $e + (k + 1) * Nn
        });
      }), v;
    }), h = (v, m) => {
      if (!l.value || !m || m.horizontal) return;
      const _ = l.value.getBoundingClientRect(), k = v.clientX, M = v.clientY, S = 140, $ = 160, A = 10, F = 15;
      let E = k - _.left - S / 2, I = M - _.top - $ - F;
      E = Math.max(A, Math.min(E, _.width - S - A)), I < A && (I = M - _.top + F), I = Math.max(A, Math.min(I, _.height - $ - A)), d.value = {
        visible: !0,
        x: E,
        y: I,
        date: m.label || "",
        min: m.low !== void 0 ? m.low.toFixed(1) : "N/A",
        max: m.high !== void 0 ? m.high.toFixed(1) : "N/A",
        q1: m.open !== void 0 ? m.open.toFixed(1) : "N/A",
        avg: m.average !== void 0 && m.average > 0 ? m.average.toFixed(1) : "N/A",
        q3: m.close !== void 0 ? m.close.toFixed(1) : "N/A",
        median: m.median !== void 0 ? m.median.toFixed(1) : "N/A"
      };
    }, b = () => {
      d.value.visible = !1;
    };
    return t({ isDark: o }), (v, m) => (y(), x("article", by, [
      c("header", vy, [
        c("div", my, [
          m[1] || (m[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "CSAT Daily Metrics"),
            c("p", { class: "card-subtitle" }, "Daily CSAT Distribution")
          ], -1)),
          r.value && r.value.nps_by_day && r.value.nps_by_day.length > 0 ? (y(), x("div", _y, [
            m[0] || (m[0] = c("p", { class: "badge-label" }, "Days", -1)),
            c("p", yy, w(r.value.nps_by_day.length), 1)
          ])) : N("", !0)
        ])
      ]),
      i.loading ? (y(), x("div", xy, [...m[2] || (m[2] = [
        Y('<div class="loading-container" data-v-b20112a7><div class="chart-flow-loader" data-v-b20112a7><div class="flow-line flow-1" data-v-b20112a7></div><div class="flow-line flow-2" data-v-b20112a7></div><div class="flow-line flow-3" data-v-b20112a7></div><div class="flow-line flow-4" data-v-b20112a7></div><div class="flow-line flow-5" data-v-b20112a7></div></div><p class="loading-text" data-v-b20112a7>Loading daily NPS data...</p></div>', 1)
      ])])) : r.value && r.value.nps_by_day && r.value.nps_by_day.length > 0 ? (y(), x("div", ky, [
        c("div", {
          class: "chart-wrapper",
          ref_key: "chartContainerRef",
          ref: l
        }, [
          g.value && g.value.length > 0 ? (y(), ut(Hi, {
            key: 0,
            "candlestick-data": g.value,
            "chart-width": u.value,
            "chart-height": In,
            "chart-margin": $e,
            "chart-bottom-margin": zn,
            "show-legend": !0,
            rotation: 0,
            "candle-width": 30,
            onCandleHover: h,
            onCandleLeave: b
          }, null, 8, ["candlestick-data", "chart-width"])) : N("", !0),
          d.value.visible ? (y(), x("div", {
            key: 1,
            class: "tooltip-overlay",
            style: _t({
              left: `${d.value.x}px`,
              top: `${d.value.y}px`
            })
          }, [
            c("div", My, [
              c("div", Sy, w(d.value.date), 1),
              m[9] || (m[9] = c("div", { class: "tooltip-divider" }, null, -1)),
              c("div", wy, [
                c("div", $y, [
                  m[3] || (m[3] = c("span", { class: "tooltip-label tooltip-min" }, "Min:", -1)),
                  c("span", Cy, w(d.value.min), 1)
                ]),
                c("div", Dy, [
                  m[4] || (m[4] = c("span", { class: "tooltip-label tooltip-q1" }, "Q1:", -1)),
                  c("span", Ay, w(d.value.q1), 1)
                ]),
                c("div", Ty, [
                  m[5] || (m[5] = c("span", { class: "tooltip-label tooltip-median" }, "Median:", -1)),
                  c("span", By, w(d.value.median), 1)
                ]),
                c("div", Fy, [
                  m[6] || (m[6] = c("span", { class: "tooltip-label tooltip-avg" }, "Avg:", -1)),
                  c("span", Py, w(d.value.avg), 1)
                ]),
                c("div", Ly, [
                  m[7] || (m[7] = c("span", { class: "tooltip-label tooltip-q3" }, "Q3:", -1)),
                  c("span", Ey, w(d.value.q3), 1)
                ]),
                c("div", Oy, [
                  m[8] || (m[8] = c("span", { class: "tooltip-label tooltip-max" }, "Max:", -1)),
                  c("span", Ry, w(d.value.max), 1)
                ])
              ])
            ])
          ], 4)) : N("", !0)
        ], 512),
        e.enableExport ? (y(), ut(B(gt), {
          key: 0,
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : N("", !0)
      ])) : (y(), x("div", Iy, [...m[10] || (m[10] = [
        Y('<div class="empty-state-content" data-v-b20112a7><div class="empty-icon-wrapper" data-v-b20112a7><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-b20112a7><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-b20112a7></path></svg></div><p class="empty-title" data-v-b20112a7>No daily NPS data available</p><p class="empty-description" data-v-b20112a7>No daily NPS data found for the selected period. Try adjusting the date range.</p></div>', 1)
      ])]))
    ]));
  }
}, ji = /* @__PURE__ */ Q(zy, [["__scopeId", "data-v-b20112a7"]]), Ny = { class: "nps-overview-card" }, Wy = { class: "card-header" }, Hy = { class: "header-content" }, Vy = { class: "header-badges" }, jy = {
  key: 0,
  class: "stats-badge"
}, Yy = { class: "badge-value" }, qy = {
  key: 1,
  class: "stats-badge"
}, Uy = { class: "badge-value" }, Ky = {
  key: 0,
  class: "loading-state"
}, Xy = {
  key: 1,
  class: "card-body"
}, Gy = { class: "chart-wrapper" }, Zy = {
  key: 2,
  class: "empty-state"
}, Qy = 500, Jy = 60, t2 = 80, e2 = {
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
    }, i = e, { isDark: o } = at(st(i, "theme")), r = D(() => i.data), l = D(() => Math.max(600, window.innerWidth * 0.85));
    return t({ isDark: o }), (d, u) => (y(), x("article", Ny, [
      c("header", Wy, [
        c("div", Hy, [
          u[2] || (u[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "CSAT Overview Metrics"),
            c("p", { class: "card-subtitle" }, "Overall CSAT Distribution")
          ], -1)),
          c("div", Vy, [
            r.value && r.value.total_nps_responses > 0 ? (y(), x("div", jy, [
              u[0] || (u[0] = c("p", { class: "badge-label" }, "Responses", -1)),
              c("p", Yy, w(r.value.total_nps_responses), 1)
            ])) : N("", !0),
            r.value && r.value.p95_score > 0 ? (y(), x("div", qy, [
              u[1] || (u[1] = c("p", { class: "badge-label" }, "Percentile 95", -1)),
              c("p", Uy, w(r.value.p95_score || 0), 1)
            ])) : N("", !0)
          ])
        ])
      ]),
      i.loading ? (y(), x("div", Ky, [...u[3] || (u[3] = [
        Y('<div class="loading-container" data-v-30fe5f88><div class="chart-flow-loader" data-v-30fe5f88><div class="flow-line flow-1" data-v-30fe5f88></div><div class="flow-line flow-2" data-v-30fe5f88></div><div class="flow-line flow-3" data-v-30fe5f88></div><div class="flow-line flow-4" data-v-30fe5f88></div><div class="flow-line flow-5" data-v-30fe5f88></div></div><p class="loading-text" data-v-30fe5f88>Loading NPS data...</p></div>', 1)
      ])])) : r.value && r.value.total_nps_responses > 0 ? (y(), x("div", Xy, [
        c("div", Gy, [
          U(Vi, {
            histogram: r.value.histogram || [],
            "min-score": r.value.min_score || 0,
            "max-score": r.value.max_score || 0,
            "q1-score": r.value.q1_score || 0,
            "median-score": r.value.median_score || 0,
            "q3-score": r.value.q3_score || 0,
            "average-score": r.value.average_score || 0,
            "chart-width": l.value,
            "chart-height": Qy,
            "chart-margin": Jy,
            "chart-bottom-margin": t2
          }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score", "chart-width"])
        ]),
        e.enableExport ? (y(), ut(B(gt), {
          key: 0,
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : N("", !0)
      ])) : (y(), x("div", Zy, [...u[4] || (u[4] = [
        Y('<div class="empty-state-content" data-v-30fe5f88><div class="empty-icon-wrapper" data-v-30fe5f88><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-30fe5f88><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-30fe5f88></path></svg></div><p class="empty-title" data-v-30fe5f88>No NPS data available</p><p class="empty-description" data-v-30fe5f88>No NPS data found for the selected period. Try adjusting the date range.</p></div>', 1)
      ])]))
    ]));
  }
}, Yi = /* @__PURE__ */ Q(e2, [["__scopeId", "data-v-30fe5f88"]]), s2 = { class: "nps-metrics-container" }, a2 = {
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
    return (n, i) => (y(), x("div", s2, [
      U(Yi, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: a
      }, null, 8, ["data", "loading", "enable-export"]),
      U(ji, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: a
      }, null, 8, ["data", "loading", "enable-export"])
    ]));
  }
}, n2 = /* @__PURE__ */ Q(a2, [["__scopeId", "data-v-25fe3b80"]]), i2 = { class: "aws-cost-card" }, o2 = { class: "card-header" }, r2 = { class: "header-main" }, l2 = { class: "header-content" }, c2 = { class: "card-title" }, d2 = { class: "header-stats" }, u2 = { class: "stat-badge primary" }, h2 = { class: "stat-value" }, f2 = { class: "stat-badge secondary" }, g2 = { class: "stat-value" }, p2 = { class: "card-body" }, b2 = {
  key: 0,
  class: "loading-state"
}, v2 = {
  key: 1,
  class: "chart-section"
}, m2 = { class: "chart-container" }, _2 = {
  key: 2,
  class: "empty-state"
}, y2 = { class: "empty-state-content" }, x2 = { class: "empty-icon-wrapper" }, k2 = {
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
    const t = e, { isDark: s, colors: a } = at(st(t, "theme")), n = D(() => {
      const r = t.data ?? {}, l = r.daily, d = r.days, u = Array.isArray(l) && l.length > 0, f = Array.isArray(d) && d.length > 0 && Array.isArray(r.allocatedCostSeries) && r.allocatedCostSeries.length === d.length;
      let p = [];
      return u ? p = l : f && (p = d.map((g, h) => ({
        date: g,
        allocated_cost: r.allocatedCostSeries[h] ?? 0,
        aws_cost: r.awsCostSeries[h] ?? 0,
        airline_conversations: r.airlineConversationsSeries[h] ?? 0
      }))), {
        daily: p,
        total_allocated_cost: r.total_allocated_cost ?? r.totalAllocated ?? 0,
        total_cost: r.total_cost ?? r.total ?? 0,
        total_conversations: r.total_conversations ?? r.totalConversations ?? 0,
        total_airline_conversations: r.total_airline_conversations ?? r.totalAirlineConversations ?? 0,
        airline_name: r.airline_name
      };
    }), i = D(() => {
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
    }), o = D(() => ({
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
            callback: (r) => it(r)
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
    return (r, l) => (y(), x("article", i2, [
      c("header", o2, [
        c("div", r2, [
          c("div", l2, [
            c("h3", c2, w(n.value.airline_name || "AWS Cost"), 1),
            l[0] || (l[0] = c("p", { class: "card-subtitle" }, "AWS vs Allocated costs over time", -1))
          ]),
          c("div", d2, [
            c("div", u2, [
              l[1] || (l[1] = c("span", { class: "stat-label" }, "Total Allocated", -1)),
              c("span", h2, w(B(it)(n.value.total_allocated_cost)), 1)
            ]),
            c("div", f2, [
              l[2] || (l[2] = c("span", { class: "stat-label" }, "Total AWS", -1)),
              c("span", g2, w(B(it)(n.value.total_cost)), 1)
            ])
          ])
        ])
      ]),
      c("div", p2, [
        e.loading ? (y(), x("div", b2, [...l[3] || (l[3] = [
          Y('<div class="loading-container" data-v-c023bd59><div class="chart-lines-loader" data-v-c023bd59><div class="line line-1" data-v-c023bd59></div><div class="line line-2" data-v-c023bd59></div><div class="line line-3" data-v-c023bd59></div><div class="line line-4" data-v-c023bd59></div><div class="line line-5" data-v-c023bd59></div></div><p class="loading-text" data-v-c023bd59>Loading chart data...</p></div>', 1)
        ])])) : n.value.daily.length > 0 ? (y(), x("div", v2, [
          c("div", m2, [
            U(Qt, {
              data: i.value,
              options: o.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", _2, [
          c("div", y2, [
            c("div", x2, [
              U(B(Dt), { class: "empty-icon" })
            ]),
            l[4] || (l[4] = c("p", { class: "empty-title" }, "Sin datos de costos", -1)),
            l[5] || (l[5] = c("p", { class: "empty-description" }, "No se encontró información para el periodo seleccionado. Intenta ajustar el rango de fechas.", -1))
          ])
        ]))
      ])
    ]));
  }
}, M2 = /* @__PURE__ */ Q(k2, [["__scopeId", "data-v-c023bd59"]]), S2 = { class: "cost-usage-card" }, w2 = {
  key: 0,
  class: "card-body"
}, $2 = {
  key: 0,
  class: "chart-section"
}, C2 = { class: "chart-container" }, D2 = { class: "kpi-grid" }, A2 = { class: "kpi-card" }, T2 = { class: "kpi-value" }, B2 = { class: "kpi-card" }, F2 = { class: "kpi-value" }, P2 = { class: "kpi-card" }, L2 = { class: "kpi-value" }, E2 = { class: "kpi-card" }, O2 = { class: "kpi-value" }, R2 = { class: "kpi-card" }, I2 = { class: "kpi-value" }, z2 = { class: "kpi-card highlighted" }, N2 = { class: "kpi-value gradient-text" }, W2 = {
  key: 1,
  class: "empty-state"
}, H2 = { class: "empty-state-content" }, V2 = { class: "empty-icon-wrapper" }, j2 = {
  key: 1,
  class: "loading-state"
}, Y2 = /* @__PURE__ */ tt({
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
    const a = e, { isDark: n, colors: i } = at(st(a, "theme")), o = (h) => {
      const b = new Date(h), v = String(b.getDate()).padStart(2, "0"), m = String(b.getMonth() + 1).padStart(2, "0");
      return `${v}-${m}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = D(() => {
      const h = a.data?.costs_by_day || {};
      return Object.values(h).reduce((b, v) => b + (v.input_cost || 0), 0);
    }), d = D(() => {
      const h = a.data?.costs_by_day || {};
      return Object.values(h).reduce((b, v) => b + (v.output_cost || 0), 0);
    }), u = D(() => {
      const h = a.data?.costs_by_day || {};
      return Object.values(h).reduce((b, v) => b + (v.cache_read_cost || 0), 0);
    }), f = D(() => {
      const h = a.data?.costs_by_day || {};
      return Object.values(h).reduce((b, v) => b + (v.cache_write_cost || 0), 0);
    }), p = D(() => {
      const h = a.data?.costs_by_day || {}, b = Object.keys(h).sort();
      if (b.length === 0)
        return { labels: [], datasets: [] };
      const v = b.map((_) => o(_)), m = [
        {
          label: "Input Cost",
          data: b.map((_) => h[_]?.input_cost || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: b.map((_) => h[_]?.output_cost || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: b.map((_) => h[_]?.cache_read_cost || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: b.map((_) => h[_]?.cache_write_cost || 0),
          backgroundColor: `${r.cache_write}80`,
          borderColor: r.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: v,
        datasets: m
      };
    }), g = D(() => a.options ? a.options : {
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
            label: function(h) {
              let b = h.dataset.label || "";
              return b && (b += ": "), h.parsed.y !== null && (b += it(h.parsed.y)), b;
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
            callback: function(h) {
              return it(h);
            }
          }
        }
      }
    });
    return t({ isDark: n }), (h, b) => (y(), x("article", S2, [
      b[9] || (b[9] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Cost Usage"),
          c("p", { class: "card-subtitle" }, "Cost breakdown over time (stacked)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", j2, [...b[8] || (b[8] = [
        Y('<div class="loading-container" data-v-62f96954><div class="chart-lines-loader" data-v-62f96954><div class="line line-1" data-v-62f96954></div><div class="line line-2" data-v-62f96954></div><div class="line line-3" data-v-62f96954></div><div class="line line-4" data-v-62f96954></div><div class="line line-5" data-v-62f96954></div></div><p class="loading-text" data-v-62f96954>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", w2, [
        p.value.labels && p.value.labels.length ? (y(), x("section", $2, [
          c("div", C2, [
            U(Zt, {
              data: p.value,
              options: g.value,
              stacked: !0
            }, null, 8, ["data", "options"])
          ]),
          c("footer", D2, [
            c("div", A2, [
              b[0] || (b[0] = c("span", { class: "kpi-label" }, "Total Cost", -1)),
              c("span", T2, w(B(it)(e.data.total_cost)), 1)
            ]),
            c("div", B2, [
              b[1] || (b[1] = c("span", { class: "kpi-label" }, "Input Cost", -1)),
              c("span", F2, w(B(it)(l.value)), 1)
            ]),
            c("div", P2, [
              b[2] || (b[2] = c("span", { class: "kpi-label" }, "Output Cost", -1)),
              c("span", L2, w(B(it)(d.value)), 1)
            ]),
            c("div", E2, [
              b[3] || (b[3] = c("span", { class: "kpi-label" }, "Cache Read", -1)),
              c("span", O2, w(B(it)(u.value)), 1)
            ]),
            c("div", R2, [
              b[4] || (b[4] = c("span", { class: "kpi-label" }, "Cache Write", -1)),
              c("span", I2, w(B(it)(f.value)), 1)
            ]),
            c("div", z2, [
              b[5] || (b[5] = c("span", { class: "kpi-label" }, "Avg / Conv.", -1)),
              c("span", N2, w(B(it)(e.data.avg_cost_per_conversation)), 1)
            ])
          ])
        ])) : (y(), x("section", W2, [
          c("div", H2, [
            c("div", V2, [
              U(B(Dt), { class: "empty-icon" })
            ]),
            b[6] || (b[6] = c("p", { class: "empty-title" }, "No cost usage data", -1)),
            b[7] || (b[7] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see cost breakdown trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), q2 = /* @__PURE__ */ Q(Y2, [["__scopeId", "data-v-62f96954"]]), U2 = { class: "token-usage-card" }, K2 = {
  key: 0,
  class: "card-body"
}, X2 = {
  key: 0,
  class: "chart-section"
}, G2 = { class: "chart-container" }, Z2 = { class: "kpi-grid" }, Q2 = { class: "kpi-card" }, J2 = { class: "kpi-value" }, tx = { class: "kpi-card" }, ex = { class: "kpi-value" }, sx = { class: "kpi-card" }, ax = { class: "kpi-value" }, nx = { class: "kpi-card" }, ix = { class: "kpi-value" }, ox = { class: "kpi-card" }, rx = { class: "kpi-value" }, lx = {
  key: 1,
  class: "empty-state"
}, cx = { class: "empty-state-content" }, dx = { class: "empty-icon-wrapper" }, ux = {
  key: 1,
  class: "loading-state"
}, hx = /* @__PURE__ */ tt({
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
    const a = e, { isDark: n, colors: i } = at(st(a, "theme")), o = (u) => {
      const f = new Date(u), p = String(f.getDate()).padStart(2, "0"), g = String(f.getMonth() + 1).padStart(2, "0");
      return `${p}-${g}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = D(() => {
      const u = a.data?.tokens_by_day || {}, f = Object.keys(u).sort();
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const p = f.map((h) => o(h)), g = [
        {
          label: "Input Tokens",
          data: f.map((h) => u[h]?.input_tokens || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Tokens",
          data: f.map((h) => u[h]?.output_tokens || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read",
          data: f.map((h) => u[h]?.cache_read_tokens || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write",
          data: f.map((h) => u[h]?.cache_write_tokens || 0),
          backgroundColor: `${r.cache_write}80`,
          borderColor: r.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: p,
        datasets: g
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
    return t({ isDark: n }), (u, f) => (y(), x("article", U2, [
      f[8] || (f[8] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Token Usage"),
          c("p", { class: "card-subtitle" }, "Token consumption over time (stacked)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", ux, [...f[7] || (f[7] = [
        Y('<div class="loading-container" data-v-e9e355be><div class="chart-lines-loader" data-v-e9e355be><div class="line line-1" data-v-e9e355be></div><div class="line line-2" data-v-e9e355be></div><div class="line line-3" data-v-e9e355be></div><div class="line line-4" data-v-e9e355be></div><div class="line line-5" data-v-e9e355be></div></div><p class="loading-text" data-v-e9e355be>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", K2, [
        l.value.labels && l.value.labels.length ? (y(), x("section", X2, [
          c("div", G2, [
            U(Zt, {
              data: l.value,
              options: d.value,
              stacked: !0
            }, null, 8, ["data", "options"])
          ]),
          c("footer", Z2, [
            c("div", Q2, [
              f[0] || (f[0] = c("span", { class: "kpi-label" }, "Total Tokens", -1)),
              c("span", J2, w(B(W)(e.data.total_tokens)), 1)
            ]),
            c("div", tx, [
              f[1] || (f[1] = c("span", { class: "kpi-label" }, "Input", -1)),
              c("span", ex, w(B(W)(e.data.total_input_tokens)), 1)
            ]),
            c("div", sx, [
              f[2] || (f[2] = c("span", { class: "kpi-label" }, "Output", -1)),
              c("span", ax, w(B(W)(e.data.total_output_tokens)), 1)
            ]),
            c("div", nx, [
              f[3] || (f[3] = c("span", { class: "kpi-label" }, "Cache Read", -1)),
              c("span", ix, w(B(W)(e.data.total_cache_read_tokens)), 1)
            ]),
            c("div", ox, [
              f[4] || (f[4] = c("span", { class: "kpi-label" }, "Cache Write", -1)),
              c("span", rx, w(B(W)(e.data.total_cache_write_tokens)), 1)
            ])
          ])
        ])) : (y(), x("section", lx, [
          c("div", cx, [
            c("div", dx, [
              U(B(Dt), { class: "empty-icon" })
            ]),
            f[5] || (f[5] = c("p", { class: "empty-title" }, "No token usage data", -1)),
            f[6] || (f[6] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see token consumption trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), fx = /* @__PURE__ */ Q(hx, [["__scopeId", "data-v-e9e355be"]]), gx = { class: "conversation-count-card" }, px = { class: "card-header" }, bx = { class: "header-right" }, vx = { class: "stat-badge" }, mx = { class: "stat-value" }, _x = {
  key: 0,
  class: "card-body"
}, yx = {
  key: 0,
  class: "chart-section"
}, xx = { class: "chart-container" }, kx = {
  key: 1,
  class: "empty-state"
}, Mx = { class: "empty-state-content" }, Sx = { class: "empty-icon-wrapper" }, wx = {
  key: 1,
  class: "loading-state"
}, $x = /* @__PURE__ */ tt({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: a, colors: n } = at(st(s, "theme")), i = (l) => {
      const d = new Date(l), u = String(d.getDate()).padStart(2, "0");
      return `${String(d.getMonth() + 1).padStart(2, "0")}-${u}`;
    };
    D(() => {
      if (s.data?.start_date && s.data?.end_date) {
        const l = i(s.data.start_date), d = i(s.data.end_date);
        return `${l} - ${d}`;
      }
      return "N/A";
    });
    const o = D(() => {
      const l = s.data?.conversations_by_day || {}, d = Object.keys(l).sort();
      if (d.length === 0)
        return { labels: [], datasets: [] };
      const u = d.map((p) => i(p)), f = [
        {
          label: "Conversations",
          data: d.map((p) => l[p] || 0),
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
        datasets: f
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
    return t({ isDark: a }), (l, d) => (y(), x("article", gx, [
      c("header", px, [
        d[1] || (d[1] = c("div", { class: "header-left" }, [
          c("div", { class: "header-content" }, [
            c("h3", { class: "card-title" }, "Conversation Count"),
            c("p", { class: "card-subtitle" }, "Conversations over time")
          ])
        ], -1)),
        c("div", bx, [
          c("div", vx, [
            d[0] || (d[0] = c("span", { class: "stat-label" }, "Total", -1)),
            c("span", mx, w(e.data.total_conversations || 0), 1)
          ])
        ])
      ]),
      e.loading ? (y(), x("div", wx, [...d[4] || (d[4] = [
        Y('<div class="loading-container" data-v-846f24b1><div class="chart-lines-loader" data-v-846f24b1><div class="line line-1" data-v-846f24b1></div><div class="line line-2" data-v-846f24b1></div><div class="line line-3" data-v-846f24b1></div><div class="line line-4" data-v-846f24b1></div><div class="line line-5" data-v-846f24b1></div></div><p class="loading-text" data-v-846f24b1>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", _x, [
        o.value.labels && o.value.labels.length ? (y(), x("section", yx, [
          c("div", xx, [
            U(Qt, {
              data: o.value,
              options: r.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", kx, [
          c("div", Mx, [
            c("div", Sx, [
              U(B(Dt), { class: "empty-icon" })
            ]),
            d[2] || (d[2] = c("p", { class: "empty-title" }, "No conversation count data", -1)),
            d[3] || (d[3] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Cx = /* @__PURE__ */ Q($x, [["__scopeId", "data-v-846f24b1"]]), Dx = { class: "top-agents-card" }, Ax = {
  key: 0,
  class: "card-body"
}, Tx = {
  key: 0,
  class: "charts-grid"
}, Bx = { class: "chart-section" }, Fx = { class: "chart-container" }, Px = { class: "chart-section" }, Lx = { class: "chart-container" }, Ex = {
  key: 1,
  class: "empty-state"
}, Ox = { class: "empty-state-content" }, Rx = { class: "empty-icon-wrapper" }, Ix = {
  key: 1,
  class: "loading-state"
}, zx = /* @__PURE__ */ tt({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: a, colors: n } = at(st(s, "theme")), i = D(() => s.data?.top_agents && s.data.top_agents.length > 0), o = D(() => s.data?.top_agents ? [...s.data.top_agents].sort((p, g) => (g.total_cost || 0) - (p.total_cost || 0)) : []), r = D(() => s.data?.top_agents ? [...s.data.top_agents].sort((p, g) => (g.total_tokens || 0) - (p.total_tokens || 0)) : []), l = D(() => {
      const p = o.value;
      return p.length === 0 ? { labels: [], datasets: [] } : {
        labels: p.map((g) => g.agent_type),
        datasets: [
          {
            label: "Total Cost",
            data: p.map((g) => g.total_cost || 0),
            backgroundColor: "#a78bfa80",
            borderColor: "#a78bfa",
            borderWidth: 1
          }
        ]
      };
    }), d = D(() => {
      const p = r.value;
      return p.length === 0 ? { labels: [], datasets: [] } : {
        labels: p.map((g) => g.agent_type),
        datasets: [
          {
            label: "Total Tokens",
            data: p.map((g) => g.total_tokens || 0),
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
            title: function(p) {
              return p[0]?.label || "";
            },
            label: function(p) {
              const g = p.label, h = s.data?.top_agents?.find((b) => b.agent_type === g);
              return h ? [
                `Total Cost: ${it(h.total_cost)}`,
                `Input Cost: ${it(h.total_input_tokens_cost)}`,
                `Output Cost: ${it(h.total_output_tokens_cost)}`,
                `Cache Read: ${it(h.total_read_tokens_cost)}`,
                `Cache Write: ${it(h.total_write_tokens_cost)}`
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
            callback: function(p) {
              return it(p);
            }
          }
        }
      }
    }), f = D(() => s.options ? s.options : {
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
            title: function(p) {
              return p[0]?.label || "";
            },
            label: function(p) {
              const g = p.label, h = s.data?.top_agents?.find((b) => b.agent_type === g);
              return h ? [
                `Total Tokens: ${h.total_tokens.toLocaleString()}`,
                `Input Tokens: ${h.total_input_tokens.toLocaleString()}`,
                `Output Tokens: ${h.total_output_tokens.toLocaleString()}`,
                `Cache Read: ${h.total_read_tokens.toLocaleString()}`,
                `Cache Write: ${h.total_write_tokens.toLocaleString()}`
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
            callback: function(p) {
              return p.toLocaleString();
            }
          }
        }
      }
    });
    return t({ isDark: a }), (p, g) => (y(), x("article", Dx, [
      g[5] || (g[5] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Top Agents Analysis"),
          c("p", { class: "card-subtitle" }, "Cost and token usage by agent")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Ix, [...g[4] || (g[4] = [
        Y('<div class="loading-container" data-v-78efa6dc><div class="chart-lines-loader" data-v-78efa6dc><div class="line line-1" data-v-78efa6dc></div><div class="line line-2" data-v-78efa6dc></div><div class="line line-3" data-v-78efa6dc></div><div class="line line-4" data-v-78efa6dc></div><div class="line line-5" data-v-78efa6dc></div></div><p class="loading-text" data-v-78efa6dc>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", Ax, [
        i.value ? (y(), x("div", Tx, [
          c("section", Bx, [
            g[0] || (g[0] = c("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
            c("div", Fx, [
              U(Zt, {
                data: l.value,
                options: u.value
              }, null, 8, ["data", "options"])
            ])
          ]),
          c("section", Px, [
            g[1] || (g[1] = c("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
            c("div", Lx, [
              U(Zt, {
                data: d.value,
                options: f.value
              }, null, 8, ["data", "options"])
            ])
          ])
        ])) : (y(), x("section", Ex, [
          c("div", Ox, [
            c("div", Rx, [
              U(B(Dt), { class: "empty-icon" })
            ]),
            g[2] || (g[2] = c("p", { class: "empty-title" }, "No top agents data", -1)),
            g[3] || (g[3] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent analysis.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Nx = /* @__PURE__ */ Q(zx, [["__scopeId", "data-v-78efa6dc"]]), Wx = { class: "top-agents-card" }, Hx = {
  key: 0,
  class: "card-body"
}, Vx = {
  key: 0,
  class: "chart-section"
}, jx = { class: "chart-container" }, Yx = {
  key: 1,
  class: "empty-state"
}, qx = { class: "empty-state-content" }, Ux = { class: "empty-icon-wrapper" }, Kx = {
  key: 1,
  class: "loading-state"
}, Xx = /* @__PURE__ */ tt({
  __name: "TopAgents",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: a, colors: n } = at(st(s, "theme")), i = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, o = D(() => s.data?.top_agents ? s.data.top_agents.filter(
      (f) => f.agent_type?.toLowerCase() !== "triage"
    ) : []), r = D(() => o.value.length > 0), l = D(() => o.value.reduce((f, p) => f + (p.conversations || 0), 0)), d = D(() => {
      const f = o.value;
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const p = f.map((b) => {
        const v = b.agent_type?.toLowerCase();
        return (i[v] || "#a78bfa") + "80";
      }), g = f.map((b) => {
        const v = b.agent_type?.toLowerCase();
        return i[v] || "#a78bfa";
      });
      return {
        labels: f.map((b) => {
          const v = b.conversations || 0, m = l.value ? v / l.value * 100 : 0;
          return `${b.agent_type} - ${v.toLocaleString()} (${m.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: f.map((b) => b.conversations || 0),
            backgroundColor: p,
            borderColor: g,
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
            label: (f) => {
              const p = (f.label || "").toString(), g = Number(f.parsed) || 0, h = (f.dataset.data || []).reduce((v, m) => v + (Number(m) || 0), 0), b = h ? g / h * 100 : 0;
              return `${p}: ${g.toLocaleString()} (${b.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: a }), (f, p) => (y(), x("article", Wx, [
      p[3] || (p[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Top Agents"),
          c("p", { class: "card-subtitle" }, "Interactions by agent (excluding triage)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Kx, [...p[2] || (p[2] = [
        Y('<div class="loading-container" data-v-05e3e74d><div class="chart-lines-loader" data-v-05e3e74d><div class="line line-1" data-v-05e3e74d></div><div class="line line-2" data-v-05e3e74d></div><div class="line line-3" data-v-05e3e74d></div><div class="line line-4" data-v-05e3e74d></div><div class="line line-5" data-v-05e3e74d></div></div><p class="loading-text" data-v-05e3e74d>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", Hx, [
        r.value ? (y(), x("section", Vx, [
          c("div", jx, [
            U(ks, {
              data: d.value,
              options: u.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", Yx, [
          c("div", qx, [
            c("div", Ux, [
              U(B(Dt), { class: "empty-icon" })
            ]),
            p[0] || (p[0] = c("p", { class: "empty-title" }, "No top agents data", -1)),
            p[1] || (p[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Gx = /* @__PURE__ */ Q(Xx, [["__scopeId", "data-v-05e3e74d"]]), Zx = { class: "daily-cost-trends-card" }, Qx = {
  key: 0,
  class: "card-body"
}, Jx = {
  key: 0,
  class: "chart-section"
}, tk = { class: "chart-container" }, ek = {
  key: 1,
  class: "empty-state"
}, sk = { class: "empty-state-content" }, ak = { class: "empty-icon-wrapper" }, nk = {
  key: 1,
  class: "loading-state"
}, ik = /* @__PURE__ */ tt({
  __name: "DailyCostTrends",
  props: {
    costData: { default: () => ({}) },
    conversationData: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const s = e, { isDark: a, colors: n } = at(st(s, "theme")), i = (d) => {
      const u = new Date(d), f = String(u.getDate()).padStart(2, "0");
      return `${String(u.getMonth() + 1).padStart(2, "0")}-${f}`;
    }, o = D(() => {
      const d = s.costData?.daily_mean_cost_per_conversation || [];
      if (Array.isArray(d) && d.length > 0)
        return !0;
      const u = s.costData?.costs_by_day || {}, f = s.conversationData?.conversations_by_day || {};
      return Object.keys(u).length > 0 && Object.keys(f).length > 0;
    }), r = D(() => {
      const d = s.costData?.daily_mean_cost_per_conversation || [];
      if (d.length > 0) {
        const v = [...d].sort((m, _) => m.date.localeCompare(_.date));
        return {
          labels: v.map((m) => i(m.date)),
          datasets: [
            {
              label: "Mean USD/conv",
              data: v.map((m) => Number(m.value) || 0),
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
      const u = s.costData?.costs_by_day || {}, f = s.conversationData?.conversations_by_day || {}, g = Object.keys(u).filter((v) => f[v]).sort();
      if (g.length === 0)
        return { labels: [], datasets: [] };
      const h = g.map((v) => i(v)), b = g.map((v) => {
        const m = u[v]?.total_cost || 0, _ = f[v] || 0;
        return _ > 0 ? m / _ : 0;
      });
      return {
        labels: h,
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
              return u && (u += ": "), d.parsed.y !== null && (u += it(d.parsed.y)), u;
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
              return it(d);
            }
          }
        }
      }
    });
    return t({ isDark: a }), (d, u) => (y(), x("article", Zx, [
      u[3] || (u[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Daily Cost Trends"),
          c("p", { class: "card-subtitle" }, "Mean USD/conversation per day")
        ])
      ], -1)),
      e.loading ? (y(), x("div", nk, [...u[2] || (u[2] = [
        Y('<div class="loading-container" data-v-e5bac1c5><div class="chart-lines-loader" data-v-e5bac1c5><div class="line line-1" data-v-e5bac1c5></div><div class="line line-2" data-v-e5bac1c5></div><div class="line line-3" data-v-e5bac1c5></div><div class="line line-4" data-v-e5bac1c5></div><div class="line line-5" data-v-e5bac1c5></div></div><p class="loading-text" data-v-e5bac1c5>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", Qx, [
        o.value ? (y(), x("section", Jx, [
          c("div", tk, [
            U(Qt, {
              data: r.value,
              options: l.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", ek, [
          c("div", sk, [
            c("div", ak, [
              U(B(Dt), { class: "empty-icon" })
            ]),
            u[0] || (u[0] = c("p", { class: "empty-title" }, "No daily cost trends data", -1)),
            u[1] || (u[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), ok = /* @__PURE__ */ Q(ik, [["__scopeId", "data-v-e5bac1c5"]]), rk = { class: "model-usage-card" }, lk = {
  key: 0,
  class: "loading-state"
}, ck = {
  key: 1,
  class: "card-body"
}, dk = { class: "tabs-container" }, uk = {
  class: "tabs-nav",
  "aria-label": "Model Usage Tabs"
}, hk = ["aria-selected"], fk = ["aria-selected"], gk = {
  key: 0,
  class: "table-section"
}, pk = { class: "table-wrapper" }, bk = { class: "data-table" }, vk = { class: "table-header-row" }, mk = { class: "table-header" }, _k = { class: "table-body" }, yk = { class: "table-cell name-cell" }, xk = { class: "table-cell text-center" }, kk = { class: "table-cell text-center" }, Mk = { class: "table-cell text-center" }, Sk = { class: "table-cell text-center cost-cell" }, wk = { class: "table-cell text-center" }, $k = {
  key: 1,
  class: "empty-state"
}, Ck = { class: "empty-state-content" }, Dk = { class: "empty-icon-wrapper" }, Ak = /* @__PURE__ */ tt({
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
    const a = e, n = s, i = (f) => {
      n("export", f);
    }, { isDark: o } = at(st(a, "theme")), r = Mt("by_model"), l = D(() => r.value === "by_model" ? a.data?.total_by_model || {} : a.data?.total_by_provider || {}), d = (f) => f == null ? "0" : W(f), u = (f) => f == null ? "$0.00" : it(f);
    return t({ isDark: o }), (f, p) => (y(), x("article", rk, [
      p[10] || (p[10] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Model Usage"),
          c("p", { class: "card-subtitle" }, "AI model performance and costs")
        ])
      ], -1)),
      e.loading ? (y(), x("div", lk, [...p[2] || (p[2] = [
        Y('<div class="loading-container" data-v-a7bf2d7b><div class="chart-bars-loader" data-v-a7bf2d7b><div class="bar bar-1" data-v-a7bf2d7b></div><div class="bar bar-2" data-v-a7bf2d7b></div><div class="bar bar-3" data-v-a7bf2d7b></div><div class="bar bar-4" data-v-a7bf2d7b></div><div class="bar bar-5" data-v-a7bf2d7b></div></div><p class="loading-text" data-v-a7bf2d7b>Loading model usage data...</p></div>', 1)
      ])])) : (y(), x("div", ck, [
        c("div", dk, [
          c("nav", uk, [
            c("button", {
              onClick: p[0] || (p[0] = (g) => r.value = "by_model"),
              class: Le(["tab-button", { "tab-active": r.value === "by_model" }]),
              "aria-selected": r.value === "by_model",
              role: "tab"
            }, " Model ", 10, hk),
            c("button", {
              onClick: p[1] || (p[1] = (g) => r.value = "by_provider"),
              class: Le(["tab-button", { "tab-active": r.value === "by_provider" }]),
              "aria-selected": r.value === "by_provider",
              role: "tab"
            }, " Provider ", 10, fk)
          ])
        ]),
        l.value && Object.keys(l.value).length > 0 ? (y(), x("div", gk, [
          c("div", pk, [
            c("table", bk, [
              c("thead", null, [
                c("tr", vk, [
                  c("th", mk, w(r.value === "by_model" ? "Model" : "Provider"), 1),
                  p[3] || (p[3] = c("th", { class: "table-header" }, "Avg cost per message", -1)),
                  p[4] || (p[4] = c("th", { class: "table-header" }, "Avg tokens per message", -1)),
                  p[5] || (p[5] = c("th", { class: "table-header" }, "Message count", -1)),
                  p[6] || (p[6] = c("th", { class: "table-header" }, "Total cost", -1)),
                  p[7] || (p[7] = c("th", { class: "table-header" }, "Total tokens", -1))
                ])
              ]),
              c("tbody", _k, [
                (y(!0), x(j, null, Z(l.value, (g, h) => (y(), x("tr", {
                  key: h,
                  class: "table-row"
                }, [
                  c("td", yk, w(h), 1),
                  c("td", xk, w(u(g.avg_cost_per_message)), 1),
                  c("td", kk, w(d(g.avg_tokens_per_message)), 1),
                  c("td", Mk, w(d(g.message_count)), 1),
                  c("td", Sk, w(u(g.total_cost)), 1),
                  c("td", wk, w(d(g.total_tokens)), 1)
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), ut(B(gt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ])) : (y(), x("div", $k, [
          c("div", Ck, [
            c("div", Dk, [
              U(B(Dt), { class: "empty-icon" })
            ]),
            p[8] || (p[8] = c("p", { class: "empty-title" }, "No model usage data available", -1)),
            p[9] || (p[9] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see model performance metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Tk = /* @__PURE__ */ Q(Ak, [["__scopeId", "data-v-a7bf2d7b"]]), Bk = { class: "message-roles-card" }, Fk = {
  key: 0,
  class: "loading-state"
}, Pk = {
  key: 1,
  class: "card-body"
}, Lk = {
  key: 0,
  class: "table-section"
}, Ek = { class: "table-wrapper" }, Ok = { class: "data-table" }, Rk = { class: "table-body" }, Ik = { class: "table-cell name-cell" }, zk = { class: "table-cell text-center" }, Nk = { class: "table-cell text-center" }, Wk = { class: "table-cell text-center" }, Hk = { class: "table-cell text-center cost-cell" }, Vk = { class: "table-cell text-center" }, jk = {
  key: 1,
  class: "empty-state"
}, Yk = { class: "empty-state-content" }, qk = { class: "empty-icon-wrapper" }, Uk = /* @__PURE__ */ tt({
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
    const a = e, n = s, i = (g) => {
      n("export", g);
    }, { isDark: o } = at(st(a, "theme")), r = ["assistant", "system", "user"], l = D(() => a.data?.total_by_role || {}), d = D(() => Object.keys(l.value).length > 0), u = (g) => g == null ? "0" : W(g), f = (g) => g == null ? "$0.00" : it(g), p = (g) => g.charAt(0).toUpperCase() + g.slice(1);
    return t({ isDark: o }), (g, h) => (y(), x("article", Bk, [
      h[4] || (h[4] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Message Roles"),
          c("p", { class: "card-subtitle" }, "Performance by message role")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Fk, [...h[0] || (h[0] = [
        Y('<div class="loading-container" data-v-6a953cfc><div class="chart-bars-loader" data-v-6a953cfc><div class="bar bar-1" data-v-6a953cfc></div><div class="bar bar-2" data-v-6a953cfc></div><div class="bar bar-3" data-v-6a953cfc></div><div class="bar bar-4" data-v-6a953cfc></div><div class="bar bar-5" data-v-6a953cfc></div></div><p class="loading-text" data-v-6a953cfc>Loading message role data...</p></div>', 1)
      ])])) : (y(), x("div", Pk, [
        d.value ? (y(), x("div", Lk, [
          c("div", Ek, [
            c("table", Ok, [
              h[1] || (h[1] = c("thead", null, [
                c("tr", { class: "table-header-row" }, [
                  c("th", { class: "table-header" }, "Role"),
                  c("th", { class: "table-header" }, "Avg cost per message"),
                  c("th", { class: "table-header" }, "Avg tokens per message"),
                  c("th", { class: "table-header" }, "Message count"),
                  c("th", { class: "table-header" }, "Total cost"),
                  c("th", { class: "table-header" }, "Total tokens")
                ])
              ], -1)),
              c("tbody", Rk, [
                (y(), x(j, null, Z(r, (b) => c("tr", {
                  key: b,
                  class: "table-row"
                }, [
                  c("td", Ik, w(p(b)), 1),
                  c("td", zk, w(f(l.value[b]?.avg_cost_per_message)), 1),
                  c("td", Nk, w(u(l.value[b]?.avg_tokens_per_message)), 1),
                  c("td", Wk, w(u(l.value[b]?.message_count)), 1),
                  c("td", Hk, w(f(l.value[b]?.total_cost)), 1),
                  c("td", Vk, w(u(l.value[b]?.total_tokens)), 1)
                ])), 64))
              ])
            ])
          ]),
          e.enableExport ? (y(), ut(B(gt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ])) : (y(), x("div", jk, [
          c("div", Yk, [
            c("div", qk, [
              U(B(Dt), { class: "empty-icon" })
            ]),
            h[2] || (h[2] = c("p", { class: "empty-title" }, "No message role data available", -1)),
            h[3] || (h[3] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Kk = /* @__PURE__ */ Q(Uk, [["__scopeId", "data-v-6a953cfc"]]), Xk = { class: "cost-per-conversation-card" }, Gk = {
  key: 0,
  class: "card-body"
}, Zk = {
  key: 0,
  class: "chart-section"
}, Qk = { class: "chart-container" }, Jk = { class: "kpi-grid" }, t5 = { class: "kpi-card" }, e5 = { class: "kpi-value" }, s5 = { class: "kpi-card" }, a5 = { class: "kpi-value" }, n5 = { class: "kpi-card" }, i5 = { class: "kpi-value" }, o5 = { class: "kpi-card highlighted" }, r5 = { class: "kpi-value gradient-text" }, l5 = {
  key: 1,
  class: "empty-state"
}, c5 = { class: "empty-state-content" }, d5 = { class: "empty-icon-wrapper" }, u5 = {
  key: 1,
  class: "loading-state"
}, h5 = /* @__PURE__ */ tt({
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
    }, { isDark: o, colors: r } = at(st(a, "theme")), l = {
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
    }, d = (_) => _.agent_type || _.agent_id || _.agent_name || "", u = (_) => _.agent_name ? _.agent_name : d(_).split("_").map((M) => M.charAt(0).toUpperCase() + M.slice(1)).join(" ").replace(/V\d+$/, "").trim(), f = (_) => {
      const k = d(_).toLowerCase();
      for (const [M, S] of Object.entries(l))
        if (k.includes(M))
          return S;
      return "#9ca3af";
    }, p = D(() => [...a.data?.top_agents || []].sort((k, M) => M.avg_cost_per_conversation - k.avg_cost_per_conversation)), g = D(() => a.data?.total_conversations !== void 0 ? Number(a.data.total_conversations) || 0 : p.value.reduce((_, k) => _ + k.conversations, 0)), h = D(() => a.data?.total_cost !== void 0 ? Number(a.data.total_cost) || 0 : p.value.reduce((_, k) => _ + k.total_cost, 0)), b = D(() => a.data?.overall_avg_cost_per_conversation !== void 0 ? Number(a.data.overall_avg_cost_per_conversation) || 0 : g.value === 0 ? 0 : h.value / g.value), v = D(() => {
      const _ = p.value;
      if (_.length === 0)
        return { labels: [], datasets: [] };
      const k = _.map(($) => u($)), M = _.map(($) => $.avg_cost_per_conversation), S = _.map(($) => f($));
      return {
        labels: k,
        datasets: [
          {
            label: "USD per conversation",
            data: M,
            backgroundColor: S.map(($) => `${$}80`),
            borderColor: S,
            borderWidth: 1
          }
        ]
      };
    }), m = D(() => a.options ? a.options : {
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
              const k = p.value[_.dataIndex];
              return [
                `Cost: ${it(_.parsed.x)}`,
                `Conversations: ${W(k.conversations)}`,
                `Total Cost: ${it(k.total_cost)}`
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
              return it(_);
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
    return t({ isDark: o }), (_, k) => (y(), x("article", Xk, [
      k[7] || (k[7] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Cost Per Conversation"),
          c("p", { class: "card-subtitle" }, "USD per conversation by agent")
        ])
      ], -1)),
      e.loading ? (y(), x("div", u5, [...k[6] || (k[6] = [
        Y('<div class="loading-container" data-v-17f6615c><div class="chart-bars-loader" data-v-17f6615c><div class="bar bar-1" data-v-17f6615c></div><div class="bar bar-2" data-v-17f6615c></div><div class="bar bar-3" data-v-17f6615c></div><div class="bar bar-4" data-v-17f6615c></div><div class="bar bar-5" data-v-17f6615c></div></div><p class="loading-text" data-v-17f6615c>Loading agent costs...</p></div>', 1)
      ])])) : (y(), x("div", Gk, [
        v.value.labels && v.value.labels.length ? (y(), x("section", Zk, [
          c("div", Qk, [
            U(Zt, {
              data: v.value,
              options: m.value
            }, null, 8, ["data", "options"])
          ]),
          c("footer", Jk, [
            c("div", t5, [
              k[0] || (k[0] = c("span", { class: "kpi-label" }, "Total Agents", -1)),
              c("span", e5, w(p.value.length), 1)
            ]),
            c("div", s5, [
              k[1] || (k[1] = c("span", { class: "kpi-label" }, "Total Conversations", -1)),
              c("span", a5, w(B(W)(g.value)), 1)
            ]),
            c("div", n5, [
              k[2] || (k[2] = c("span", { class: "kpi-label" }, "Total Cost", -1)),
              c("span", i5, w(B(it)(h.value)), 1)
            ]),
            c("div", o5, [
              k[3] || (k[3] = c("span", { class: "kpi-label" }, "Avg Cost / Conv.", -1)),
              c("span", r5, w(B(it)(b.value)), 1)
            ])
          ]),
          e.enableExport ? (y(), ut(B(gt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : N("", !0)
        ])) : (y(), x("section", l5, [
          c("div", c5, [
            c("div", d5, [
              U(B(Dt), { class: "empty-icon" })
            ]),
            k[4] || (k[4] = c("p", { class: "empty-title" }, "No cost per conversation data", -1)),
            k[5] || (k[5] = c("p", { class: "empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), f5 = /* @__PURE__ */ Q(h5, [["__scopeId", "data-v-17f6615c"]]), x5 = {
  install(e) {
    e.component("KiutChartBar", Zt), e.component("KiutChartLine", Qt), e.component("KiutPieChart", ks), e.component("KiutBoxplotChart", Zu), e.component("KiutCandlestickChart", Hi), e.component("KiutHistogramChart", Vi), e.component("KiutSankeyChart", Jt), e.component("KiutAgentsPerDay", ig), e.component("KiutBookingManager", Vg), e.component("KiutCheckin", fp), e.component("KiutCheckinMetrics", Ip), e.component("KiutCheckinSegments", u0), e.component("KiutDisruption", K0), e.component("KiutFAQ", hb), e.component("KiutMessagesPerAgent", xb), e.component("KiutRecordLocator", qb), e.component("KiutSeller", Mv), e.component("KiutTopAgents", Fv), e.component("KiutPaymentMethod", gm), e.component("KiutAgentHumanConversations", s_), e.component("KiutChannelMetrics", g_), e.component("KiutTriageCombinations", P_), e.component("KiutSelectLanguage", j_), e.component("KiutGuardrails", m1), e.component("KiutDisruptionNotifier", py), e.component("KiutNpsDailyMetrics", ji), e.component("KiutNpsMetrics", n2), e.component("KiutNpsOverviewMetrics", Yi), e.component("KiutAWSCost", M2), e.component("KiutCostUsage", q2), e.component("KiutTokenUsage", fx), e.component("KiutConversationCount", Cx), e.component("KiutTopAgentsAnalysis", Nx), e.component("KiutTopAgentsPie", Gx), e.component("KiutDailyCostTrends", ok), e.component("KiutModelUsage", Tk), e.component("KiutMessageRoles", Kk), e.component("KiutCostPerConversations", f5);
  }
};
export {
  M2 as AWSCost,
  s_ as AgentHumanConversations,
  ig as AgentsPerDay,
  Vg as BookingManager,
  Zu as BoxplotChart,
  Hi as CandlestickChart,
  g_ as ChannelMetrics,
  Zt as ChartBar,
  Qt as ChartLine,
  fp as Checkin,
  Ip as CheckinMetrics,
  u0 as CheckinSegments,
  Cx as ConversationCount,
  f5 as CostPerConversations,
  q2 as CostUsage,
  ok as DailyCostTrends,
  K0 as Disruption,
  py as DisruptionNotifier,
  hb as FAQ,
  m1 as Guardrails,
  Vi as HistogramChart,
  x5 as KiutUIPlugin,
  Kk as MessageRoles,
  xb as MessagesPerAgent,
  Tk as ModelUsage,
  ji as NpsDailyMetrics,
  n2 as NpsMetrics,
  Yi as NpsOverviewMetrics,
  gm as PaymentMethod,
  ks as PieChart,
  qb as RecordLocator,
  Jt as SankeyChart,
  j_ as SelectLanguage,
  Mv as Seller,
  fx as TokenUsage,
  Fv as TopAgents,
  Nx as TopAgentsAnalysis,
  Gx as TopAgentsPie,
  P_ as TriageCombinations
};
//# sourceMappingURL=kiut-ui.es.js.map
