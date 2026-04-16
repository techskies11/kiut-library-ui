import { defineComponent as Q, shallowRef as Po, h as ws, ref as tt, onMounted as re, onUnmounted as We, watch as Et, toRaw as $s, nextTick as St, version as Ui, isProxy as Io, computed as C, toRef as rt, openBlock as y, createElementBlock as x, createVNode as Z, unref as A, normalizeStyle as mt, createElementVNode as c, toDisplayString as M, createCommentVNode as E, Fragment as q, renderList as J, onBeforeUnmount as Eo, createStaticVNode as at, withDirectives as Ut, vShow as ra, normalizeClass as Y, createBlock as ct, createTextVNode as kt, resolveDynamicComponent as la, Transition as Ps, withCtx as Ee, renderSlot as It, useSlots as Ro, Teleport as Is, withModifiers as Jt, withKeys as Ia, vModelText as Re, useAttrs as Oo, mergeProps as Ms } from "vue";
import * as an from "echarts/core";
import { TooltipComponent as qi, TitleComponent as Xi } from "echarts/components";
import { SankeyChart as Gi } from "echarts/charts";
import { CanvasRenderer as Zi } from "echarts/renderers";
import At from "moment";
function ba(e) {
  return e + 0.5 | 0;
}
const fe = (e, t, a) => Math.max(Math.min(e, a), t);
function ta(e) {
  return fe(ba(e * 2.55), 0, 255);
}
function ve(e) {
  return fe(ba(e * 255), 0, 255);
}
function se(e) {
  return fe(ba(e / 2.55) / 100, 0, 1);
}
function sn(e) {
  return fe(ba(e * 100), 0, 100);
}
const Ht = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Ss = [..."0123456789ABCDEF"], Qi = (e) => Ss[e & 15], Ji = (e) => Ss[(e & 240) >> 4] + Ss[e & 15], ya = (e) => (e & 240) >> 4 === (e & 15), tr = (e) => ya(e.r) && ya(e.g) && ya(e.b) && ya(e.a);
function er(e) {
  var t = e.length, a;
  return e[0] === "#" && (t === 4 || t === 5 ? a = {
    r: 255 & Ht[e[1]] * 17,
    g: 255 & Ht[e[2]] * 17,
    b: 255 & Ht[e[3]] * 17,
    a: t === 5 ? Ht[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (a = {
    r: Ht[e[1]] << 4 | Ht[e[2]],
    g: Ht[e[3]] << 4 | Ht[e[4]],
    b: Ht[e[5]] << 4 | Ht[e[6]],
    a: t === 9 ? Ht[e[7]] << 4 | Ht[e[8]] : 255
  })), a;
}
const ar = (e, t) => e < 255 ? t(e) : "";
function sr(e) {
  var t = tr(e) ? Qi : Ji;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + ar(e.a, t) : void 0;
}
const nr = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Vo(e, t, a) {
  const s = t * Math.min(a, 1 - a), n = (o, i = (o + e / 30) % 12) => a - s * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [n(0), n(8), n(4)];
}
function or(e, t, a) {
  const s = (n, o = (n + e / 60) % 6) => a - a * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [s(5), s(3), s(1)];
}
function ir(e, t, a) {
  const s = Vo(e, 1, 0.5);
  let n;
  for (t + a > 1 && (n = 1 / (t + a), t *= n, a *= n), n = 0; n < 3; n++)
    s[n] *= 1 - t - a, s[n] += t;
  return s;
}
function rr(e, t, a, s, n) {
  return e === n ? (t - a) / s + (t < a ? 6 : 0) : t === n ? (a - e) / s + 2 : (e - t) / s + 4;
}
function Es(e) {
  const a = e.r / 255, s = e.g / 255, n = e.b / 255, o = Math.max(a, s, n), i = Math.min(a, s, n), r = (o + i) / 2;
  let l, d, u;
  return o !== i && (u = o - i, d = r > 0.5 ? u / (2 - o - i) : u / (o + i), l = rr(a, s, n, u, o), l = l * 60 + 0.5), [l | 0, d || 0, r];
}
function Rs(e, t, a, s) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, a, s)).map(ve);
}
function Os(e, t, a) {
  return Rs(Vo, e, t, a);
}
function lr(e, t, a) {
  return Rs(ir, e, t, a);
}
function cr(e, t, a) {
  return Rs(or, e, t, a);
}
function zo(e) {
  return (e % 360 + 360) % 360;
}
function dr(e) {
  const t = nr.exec(e);
  let a = 255, s;
  if (!t)
    return;
  t[5] !== s && (a = t[6] ? ta(+t[5]) : ve(+t[5]));
  const n = zo(+t[2]), o = +t[3] / 100, i = +t[4] / 100;
  return t[1] === "hwb" ? s = lr(n, o, i) : t[1] === "hsv" ? s = cr(n, o, i) : s = Os(n, o, i), {
    r: s[0],
    g: s[1],
    b: s[2],
    a
  };
}
function ur(e, t) {
  var a = Es(e);
  a[0] = zo(a[0] + t), a = Os(a), e.r = a[0], e.g = a[1], e.b = a[2];
}
function hr(e) {
  if (!e)
    return;
  const t = Es(e), a = t[0], s = sn(t[1]), n = sn(t[2]);
  return e.a < 255 ? `hsla(${a}, ${s}%, ${n}%, ${se(e.a)})` : `hsl(${a}, ${s}%, ${n}%)`;
}
const nn = {
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
}, on = {
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
function fr() {
  const e = {}, t = Object.keys(on), a = Object.keys(nn);
  let s, n, o, i, r;
  for (s = 0; s < t.length; s++) {
    for (i = r = t[s], n = 0; n < a.length; n++)
      o = a[n], r = r.replace(o, nn[o]);
    o = parseInt(on[i], 16), e[r] = [o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  return e;
}
let _a;
function gr(e) {
  _a || (_a = fr(), _a.transparent = [0, 0, 0, 0]);
  const t = _a[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const pr = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function vr(e) {
  const t = pr.exec(e);
  let a = 255, s, n, o;
  if (t) {
    if (t[7] !== s) {
      const i = +t[7];
      a = t[8] ? ta(i) : fe(i * 255, 0, 255);
    }
    return s = +t[1], n = +t[3], o = +t[5], s = 255 & (t[2] ? ta(s) : fe(s, 0, 255)), n = 255 & (t[4] ? ta(n) : fe(n, 0, 255)), o = 255 & (t[6] ? ta(o) : fe(o, 0, 255)), {
      r: s,
      g: n,
      b: o,
      a
    };
  }
}
function br(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${se(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const Ja = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, Fe = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function mr(e, t, a) {
  const s = Fe(se(e.r)), n = Fe(se(e.g)), o = Fe(se(e.b));
  return {
    r: ve(Ja(s + a * (Fe(se(t.r)) - s))),
    g: ve(Ja(n + a * (Fe(se(t.g)) - n))),
    b: ve(Ja(o + a * (Fe(se(t.b)) - o))),
    a: e.a + a * (t.a - e.a)
  };
}
function xa(e, t, a) {
  if (e) {
    let s = Es(e);
    s[t] = Math.max(0, Math.min(s[t] + s[t] * a, t === 0 ? 360 : 1)), s = Os(s), e.r = s[0], e.g = s[1], e.b = s[2];
  }
}
function No(e, t) {
  return e && Object.assign(t || {}, e);
}
function rn(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = ve(e[3]))) : (t = No(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = ve(t.a)), t;
}
function yr(e) {
  return e.charAt(0) === "r" ? vr(e) : dr(e);
}
class ca {
  constructor(t) {
    if (t instanceof ca)
      return t;
    const a = typeof t;
    let s;
    a === "object" ? s = rn(t) : a === "string" && (s = er(t) || gr(t) || yr(t)), this._rgb = s, this._valid = !!s;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = No(this._rgb);
    return t && (t.a = se(t.a)), t;
  }
  set rgb(t) {
    this._rgb = rn(t);
  }
  rgbString() {
    return this._valid ? br(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? sr(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? hr(this._rgb) : void 0;
  }
  mix(t, a) {
    if (t) {
      const s = this.rgb, n = t.rgb;
      let o;
      const i = a === o ? 0.5 : a, r = 2 * i - 1, l = s.a - n.a, d = ((r * l === -1 ? r : (r + l) / (1 + r * l)) + 1) / 2;
      o = 1 - d, s.r = 255 & d * s.r + o * n.r + 0.5, s.g = 255 & d * s.g + o * n.g + 0.5, s.b = 255 & d * s.b + o * n.b + 0.5, s.a = i * s.a + (1 - i) * n.a, this.rgb = s;
    }
    return this;
  }
  interpolate(t, a) {
    return t && (this._rgb = mr(this._rgb, t._rgb, a)), this;
  }
  clone() {
    return new ca(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = ve(t), this;
  }
  clearer(t) {
    const a = this._rgb;
    return a.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, a = ba(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
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
    return xa(this._rgb, 2, t), this;
  }
  darken(t) {
    return xa(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return xa(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return xa(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return ur(this._rgb, t), this;
  }
}
function te() {
}
const _r = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function pt(e) {
  return e == null;
}
function Mt(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function ht(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function Lt(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function Xt(e, t) {
  return Lt(e) ? e : t;
}
function ot(e, t) {
  return typeof e > "u" ? t : e;
}
const xr = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, Wo = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function yt(e, t, a) {
  if (e && typeof e.call == "function")
    return e.apply(a, t);
}
function vt(e, t, a, s) {
  let n, o, i;
  if (Mt(e))
    for (o = e.length, n = 0; n < o; n++)
      t.call(a, e[n], n);
  else if (ht(e))
    for (i = Object.keys(e), o = i.length, n = 0; n < o; n++)
      t.call(a, e[i[n]], i[n]);
}
function Ea(e, t) {
  let a, s, n, o;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (a = 0, s = e.length; a < s; ++a)
    if (n = e[a], o = t[a], n.datasetIndex !== o.datasetIndex || n.index !== o.index)
      return !1;
  return !0;
}
function Ra(e) {
  if (Mt(e))
    return e.map(Ra);
  if (ht(e)) {
    const t = /* @__PURE__ */ Object.create(null), a = Object.keys(e), s = a.length;
    let n = 0;
    for (; n < s; ++n)
      t[a[n]] = Ra(e[a[n]]);
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
function kr(e, t, a, s) {
  if (!Ho(e))
    return;
  const n = t[e], o = a[e];
  ht(n) && ht(o) ? da(n, o, s) : t[e] = Ra(o);
}
function da(e, t, a) {
  const s = Mt(t) ? t : [
    t
  ], n = s.length;
  if (!ht(e))
    return e;
  a = a || {};
  const o = a.merger || kr;
  let i;
  for (let r = 0; r < n; ++r) {
    if (i = s[r], !ht(i))
      continue;
    const l = Object.keys(i);
    for (let d = 0, u = l.length; d < u; ++d)
      o(l[d], e, i, a);
  }
  return e;
}
function sa(e, t) {
  return da(e, t, {
    merger: wr
  });
}
function wr(e, t, a) {
  if (!Ho(e))
    return;
  const s = t[e], n = a[e];
  ht(s) && ht(n) ? sa(s, n) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = Ra(n));
}
const ln = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function $r(e) {
  const t = e.split("."), a = [];
  let s = "";
  for (const n of t)
    s += n, s.endsWith("\\") ? s = s.slice(0, -1) + "." : (a.push(s), s = "");
  return a;
}
function Mr(e) {
  const t = $r(e);
  return (a) => {
    for (const s of t) {
      if (s === "")
        break;
      a = a && a[s];
    }
    return a;
  };
}
function Ae(e, t) {
  return (ln[t] || (ln[t] = Mr(t)))(e);
}
function Vs(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const ua = (e) => typeof e < "u", be = (e) => typeof e == "function", cn = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const a of e)
    if (!t.has(a))
      return !1;
  return !0;
};
function Sr(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const bt = Math.PI, _t = 2 * bt, Cr = _t + bt, Oa = Number.POSITIVE_INFINITY, Dr = bt / 180, Ct = bt / 2, xe = bt / 4, dn = bt * 2 / 3, jo = Math.log10, Qt = Math.sign;
function na(e, t, a) {
  return Math.abs(e - t) < a;
}
function un(e) {
  const t = Math.round(e);
  e = na(e, t, e / 1e3) ? t : e;
  const a = Math.pow(10, Math.floor(jo(e))), s = e / a;
  return (s <= 1 ? 1 : s <= 2 ? 2 : s <= 5 ? 5 : 10) * a;
}
function Ar(e) {
  const t = [], a = Math.sqrt(e);
  let s;
  for (s = 1; s < a; s++)
    e % s === 0 && (t.push(s), t.push(e / s));
  return a === (a | 0) && t.push(a), t.sort((n, o) => n - o).pop(), t;
}
function Tr(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function ha(e) {
  return !Tr(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function Br(e, t) {
  const a = Math.round(e);
  return a - t <= e && a + t >= e;
}
function Lr(e, t, a) {
  let s, n, o;
  for (s = 0, n = e.length; s < n; s++)
    o = e[s][a], isNaN(o) || (t.min = Math.min(t.min, o), t.max = Math.max(t.max, o));
}
function ne(e) {
  return e * (bt / 180);
}
function Fr(e) {
  return e * (180 / bt);
}
function hn(e) {
  if (!Lt(e))
    return;
  let t = 1, a = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, a++;
  return a;
}
function Yo(e, t) {
  const a = t.x - e.x, s = t.y - e.y, n = Math.sqrt(a * a + s * s);
  let o = Math.atan2(s, a);
  return o < -0.5 * bt && (o += _t), {
    angle: o,
    distance: n
  };
}
function Cs(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function Pr(e, t) {
  return (e - t + Cr) % _t - bt;
}
function Wt(e) {
  return (e % _t + _t) % _t;
}
function fa(e, t, a, s) {
  const n = Wt(e), o = Wt(t), i = Wt(a), r = Wt(o - n), l = Wt(i - n), d = Wt(n - o), u = Wt(n - i);
  return n === o || n === i || s && o === i || r > l && d < u;
}
function Tt(e, t, a) {
  return Math.max(t, Math.min(a, e));
}
function Ir(e) {
  return Tt(e, -32768, 32767);
}
function oe(e, t, a, s = 1e-6) {
  return e >= Math.min(t, a) - s && e <= Math.max(t, a) + s;
}
function zs(e, t, a) {
  a = a || ((i) => e[i] < t);
  let s = e.length - 1, n = 0, o;
  for (; s - n > 1; )
    o = n + s >> 1, a(o) ? n = o : s = o;
  return {
    lo: n,
    hi: s
  };
}
const Ce = (e, t, a, s) => zs(e, a, s ? (n) => {
  const o = e[n][t];
  return o < a || o === a && e[n + 1][t] === a;
} : (n) => e[n][t] < a), Er = (e, t, a) => zs(e, a, (s) => e[s][t] >= a);
function Rr(e, t, a) {
  let s = 0, n = e.length;
  for (; s < n && e[s] < t; )
    s++;
  for (; n > s && e[n - 1] > a; )
    n--;
  return s > 0 || n < e.length ? e.slice(s, n) : e;
}
const Ko = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function Or(e, t) {
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
  }), Ko.forEach((a) => {
    const s = "_onData" + Vs(a), n = e[a];
    Object.defineProperty(e, a, {
      configurable: !0,
      enumerable: !1,
      value(...o) {
        const i = n.apply(this, o);
        return e._chartjs.listeners.forEach((r) => {
          typeof r[s] == "function" && r[s](...o);
        }), i;
      }
    });
  });
}
function fn(e, t) {
  const a = e._chartjs;
  if (!a)
    return;
  const s = a.listeners, n = s.indexOf(t);
  n !== -1 && s.splice(n, 1), !(s.length > 0) && (Ko.forEach((o) => {
    delete e[o];
  }), delete e._chartjs);
}
function Uo(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const qo = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function Xo(e, t) {
  let a = [], s = !1;
  return function(...n) {
    a = n, s || (s = !0, qo.call(window, () => {
      s = !1, e.apply(t, a);
    }));
  };
}
function Vr(e, t) {
  let a;
  return function(...s) {
    return t ? (clearTimeout(a), a = setTimeout(e, t, s)) : e.apply(this, s), t;
  };
}
const Ns = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", Dt = (e, t, a) => e === "start" ? t : e === "end" ? a : (t + a) / 2, zr = (e, t, a, s) => e === (s ? "left" : "right") ? a : e === "center" ? (t + a) / 2 : t;
function Nr(e, t, a) {
  const s = t.length;
  let n = 0, o = s;
  if (e._sorted) {
    const { iScale: i, vScale: r, _parsed: l } = e, d = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, u = i.axis, { min: h, max: p, minDefined: v, maxDefined: f } = i.getUserBounds();
    if (v) {
      if (n = Math.min(
        // @ts-expect-error Need to type _parsed
        Ce(l, u, h).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        a ? s : Ce(t, u, i.getPixelForValue(h)).lo
      ), d) {
        const _ = l.slice(0, n + 1).reverse().findIndex((b) => !pt(b[r.axis]));
        n -= Math.max(0, _);
      }
      n = Tt(n, 0, s - 1);
    }
    if (f) {
      let _ = Math.max(
        // @ts-expect-error Need to type _parsed
        Ce(l, i.axis, p, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        a ? 0 : Ce(t, u, i.getPixelForValue(p), !0).hi + 1
      );
      if (d) {
        const b = l.slice(_ - 1).findIndex((g) => !pt(g[r.axis]));
        _ += Math.max(0, b);
      }
      o = Tt(_, n, s) - n;
    } else
      o = s - n;
  }
  return {
    start: n,
    count: o
  };
}
function Wr(e) {
  const { xScale: t, yScale: a, _scaleRanges: s } = e, n = {
    xmin: t.min,
    xmax: t.max,
    ymin: a.min,
    ymax: a.max
  };
  if (!s)
    return e._scaleRanges = n, !0;
  const o = s.xmin !== t.min || s.xmax !== t.max || s.ymin !== a.min || s.ymax !== a.max;
  return Object.assign(s, n), o;
}
const ka = (e) => e === 0 || e === 1, gn = (e, t, a) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * _t / a)), pn = (e, t, a) => Math.pow(2, -10 * e) * Math.sin((e - t) * _t / a) + 1, oa = {
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
  easeInSine: (e) => -Math.cos(e * Ct) + 1,
  easeOutSine: (e) => Math.sin(e * Ct),
  easeInOutSine: (e) => -0.5 * (Math.cos(bt * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => ka(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => ka(e) ? e : gn(e, 0.075, 0.3),
  easeOutElastic: (e) => ka(e) ? e : pn(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return ka(e) ? e : e < 0.5 ? 0.5 * gn(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * pn(e * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (e) => 1 - oa.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? oa.easeInBounce(e * 2) * 0.5 : oa.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function Ws(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function vn(e) {
  return Ws(e) ? e : new ca(e);
}
function ts(e) {
  return Ws(e) ? e : new ca(e).saturate(0.5).darken(0.1).hexString();
}
const Hr = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], jr = [
  "color",
  "borderColor",
  "backgroundColor"
];
function Yr(e) {
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
      properties: jr
    },
    numbers: {
      type: "number",
      properties: Hr
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
function Kr(e) {
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
const bn = /* @__PURE__ */ new Map();
function Ur(e, t) {
  t = t || {};
  const a = e + JSON.stringify(t);
  let s = bn.get(a);
  return s || (s = new Intl.NumberFormat(e, t), bn.set(a, s)), s;
}
function Hs(e, t, a) {
  return Ur(t, a).format(e);
}
const qr = {
  values(e) {
    return Mt(e) ? e : "" + e;
  },
  numeric(e, t, a) {
    if (e === 0)
      return "0";
    const s = this.chart.options.locale;
    let n, o = e;
    if (a.length > 1) {
      const d = Math.max(Math.abs(a[0].value), Math.abs(a[a.length - 1].value));
      (d < 1e-4 || d > 1e15) && (n = "scientific"), o = Xr(e, a);
    }
    const i = jo(Math.abs(o)), r = isNaN(i) ? 1 : Math.max(Math.min(-1 * Math.floor(i), 20), 0), l = {
      notation: n,
      minimumFractionDigits: r,
      maximumFractionDigits: r
    };
    return Object.assign(l, this.options.ticks.format), Hs(e, s, l);
  }
};
function Xr(e, t) {
  let a = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(a) >= 1 && e !== Math.floor(e) && (a = e - Math.floor(e)), a;
}
var Go = {
  formatters: qr
};
function Gr(e) {
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
      callback: Go.formatters.values,
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
const Te = /* @__PURE__ */ Object.create(null), Ds = /* @__PURE__ */ Object.create(null);
function ia(e, t) {
  if (!t)
    return e;
  const a = t.split(".");
  for (let s = 0, n = a.length; s < n; ++s) {
    const o = a[s];
    e = e[o] || (e[o] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function es(e, t, a) {
  return typeof t == "string" ? da(ia(e, t), a) : da(ia(e, ""), t);
}
class Zr {
  constructor(t, a) {
    this.animation = void 0, this.backgroundColor = "rgba(0,0,0,0.1)", this.borderColor = "rgba(0,0,0,0.1)", this.color = "#666", this.datasets = {}, this.devicePixelRatio = (s) => s.chart.platform.getDevicePixelRatio(), this.elements = {}, this.events = [
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
    }, this.hover = {}, this.hoverBackgroundColor = (s, n) => ts(n.backgroundColor), this.hoverBorderColor = (s, n) => ts(n.borderColor), this.hoverColor = (s, n) => ts(n.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(a);
  }
  set(t, a) {
    return es(this, t, a);
  }
  get(t) {
    return ia(this, t);
  }
  describe(t, a) {
    return es(Ds, t, a);
  }
  override(t, a) {
    return es(Te, t, a);
  }
  route(t, a, s, n) {
    const o = ia(this, t), i = ia(this, s), r = "_" + a;
    Object.defineProperties(o, {
      [r]: {
        value: o[a],
        writable: !0
      },
      [a]: {
        enumerable: !0,
        get() {
          const l = this[r], d = i[n];
          return ht(l) ? Object.assign({}, d, l) : ot(l, d);
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
var $t = /* @__PURE__ */ new Zr({
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
  Yr,
  Kr,
  Gr
]);
function Qr(e) {
  return !e || pt(e.size) || pt(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function mn(e, t, a, s, n) {
  let o = t[n];
  return o || (o = t[n] = e.measureText(n).width, a.push(n)), o > s && (s = o), s;
}
function ke(e, t, a) {
  const s = e.currentDevicePixelRatio, n = a !== 0 ? Math.max(a / 2, 0.5) : 0;
  return Math.round((t - n) * s) / s + n;
}
function yn(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function As(e, t, a, s) {
  Zo(e, t, a, s, null);
}
function Zo(e, t, a, s, n) {
  let o, i, r, l, d, u, h, p;
  const v = t.pointStyle, f = t.rotation, _ = t.radius;
  let b = (f || 0) * Dr;
  if (v && typeof v == "object" && (o = v.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(a, s), e.rotate(b), e.drawImage(v, -v.width / 2, -v.height / 2, v.width, v.height), e.restore();
    return;
  }
  if (!(isNaN(_) || _ <= 0)) {
    switch (e.beginPath(), v) {
      // Default includes circle
      default:
        n ? e.ellipse(a, s, n / 2, _, 0, 0, _t) : e.arc(a, s, _, 0, _t), e.closePath();
        break;
      case "triangle":
        u = n ? n / 2 : _, e.moveTo(a + Math.sin(b) * u, s - Math.cos(b) * _), b += dn, e.lineTo(a + Math.sin(b) * u, s - Math.cos(b) * _), b += dn, e.lineTo(a + Math.sin(b) * u, s - Math.cos(b) * _), e.closePath();
        break;
      case "rectRounded":
        d = _ * 0.516, l = _ - d, i = Math.cos(b + xe) * l, h = Math.cos(b + xe) * (n ? n / 2 - d : l), r = Math.sin(b + xe) * l, p = Math.sin(b + xe) * (n ? n / 2 - d : l), e.arc(a - h, s - r, d, b - bt, b - Ct), e.arc(a + p, s - i, d, b - Ct, b), e.arc(a + h, s + r, d, b, b + Ct), e.arc(a - p, s + i, d, b + Ct, b + bt), e.closePath();
        break;
      case "rect":
        if (!f) {
          l = Math.SQRT1_2 * _, u = n ? n / 2 : l, e.rect(a - u, s - l, 2 * u, 2 * l);
          break;
        }
        b += xe;
      /* falls through */
      case "rectRot":
        h = Math.cos(b) * (n ? n / 2 : _), i = Math.cos(b) * _, r = Math.sin(b) * _, p = Math.sin(b) * (n ? n / 2 : _), e.moveTo(a - h, s - r), e.lineTo(a + p, s - i), e.lineTo(a + h, s + r), e.lineTo(a - p, s + i), e.closePath();
        break;
      case "crossRot":
        b += xe;
      /* falls through */
      case "cross":
        h = Math.cos(b) * (n ? n / 2 : _), i = Math.cos(b) * _, r = Math.sin(b) * _, p = Math.sin(b) * (n ? n / 2 : _), e.moveTo(a - h, s - r), e.lineTo(a + h, s + r), e.moveTo(a + p, s - i), e.lineTo(a - p, s + i);
        break;
      case "star":
        h = Math.cos(b) * (n ? n / 2 : _), i = Math.cos(b) * _, r = Math.sin(b) * _, p = Math.sin(b) * (n ? n / 2 : _), e.moveTo(a - h, s - r), e.lineTo(a + h, s + r), e.moveTo(a + p, s - i), e.lineTo(a - p, s + i), b += xe, h = Math.cos(b) * (n ? n / 2 : _), i = Math.cos(b) * _, r = Math.sin(b) * _, p = Math.sin(b) * (n ? n / 2 : _), e.moveTo(a - h, s - r), e.lineTo(a + h, s + r), e.moveTo(a + p, s - i), e.lineTo(a - p, s + i);
        break;
      case "line":
        i = n ? n / 2 : Math.cos(b) * _, r = Math.sin(b) * _, e.moveTo(a - i, s - r), e.lineTo(a + i, s + r);
        break;
      case "dash":
        e.moveTo(a, s), e.lineTo(a + Math.cos(b) * (n ? n / 2 : _), s + Math.sin(b) * _);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function ga(e, t, a) {
  return a = a || 0.5, !t || e && e.x > t.left - a && e.x < t.right + a && e.y > t.top - a && e.y < t.bottom + a;
}
function Ha(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function ja(e) {
  e.restore();
}
function Jr(e, t, a, s, n) {
  if (!t)
    return e.lineTo(a.x, a.y);
  if (n === "middle") {
    const o = (t.x + a.x) / 2;
    e.lineTo(o, t.y), e.lineTo(o, a.y);
  } else n === "after" != !!s ? e.lineTo(t.x, a.y) : e.lineTo(a.x, t.y);
  e.lineTo(a.x, a.y);
}
function tl(e, t, a, s) {
  if (!t)
    return e.lineTo(a.x, a.y);
  e.bezierCurveTo(s ? t.cp1x : t.cp2x, s ? t.cp1y : t.cp2y, s ? a.cp2x : a.cp1x, s ? a.cp2y : a.cp1y, a.x, a.y);
}
function el(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), pt(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function al(e, t, a, s, n) {
  if (n.strikethrough || n.underline) {
    const o = e.measureText(s), i = t - o.actualBoundingBoxLeft, r = t + o.actualBoundingBoxRight, l = a - o.actualBoundingBoxAscent, d = a + o.actualBoundingBoxDescent, u = n.strikethrough ? (l + d) / 2 : d;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = n.decorationWidth || 2, e.moveTo(i, u), e.lineTo(r, u), e.stroke();
  }
}
function sl(e, t) {
  const a = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = a;
}
function pa(e, t, a, s, n, o = {}) {
  const i = Mt(t) ? t : [
    t
  ], r = o.strokeWidth > 0 && o.strokeColor !== "";
  let l, d;
  for (e.save(), e.font = n.string, el(e, o), l = 0; l < i.length; ++l)
    d = i[l], o.backdrop && sl(e, o.backdrop), r && (o.strokeColor && (e.strokeStyle = o.strokeColor), pt(o.strokeWidth) || (e.lineWidth = o.strokeWidth), e.strokeText(d, a, s, o.maxWidth)), e.fillText(d, a, s, o.maxWidth), al(e, a, s, d, o), s += Number(n.lineHeight);
  e.restore();
}
function Va(e, t) {
  const { x: a, y: s, w: n, h: o, radius: i } = t;
  e.arc(a + i.topLeft, s + i.topLeft, i.topLeft, 1.5 * bt, bt, !0), e.lineTo(a, s + o - i.bottomLeft), e.arc(a + i.bottomLeft, s + o - i.bottomLeft, i.bottomLeft, bt, Ct, !0), e.lineTo(a + n - i.bottomRight, s + o), e.arc(a + n - i.bottomRight, s + o - i.bottomRight, i.bottomRight, Ct, 0, !0), e.lineTo(a + n, s + i.topRight), e.arc(a + n - i.topRight, s + i.topRight, i.topRight, 0, -Ct, !0), e.lineTo(a + i.topLeft, s);
}
const nl = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, ol = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function il(e, t) {
  const a = ("" + e).match(nl);
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
const rl = (e) => +e || 0;
function js(e, t) {
  const a = {}, s = ht(t), n = s ? Object.keys(t) : t, o = ht(e) ? s ? (i) => ot(e[i], e[t[i]]) : (i) => e[i] : () => e;
  for (const i of n)
    a[i] = rl(o(i));
  return a;
}
function Qo(e) {
  return js(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function Oe(e) {
  return js(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function Yt(e) {
  const t = Qo(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function Bt(e, t) {
  e = e || {}, t = t || $t.font;
  let a = ot(e.size, t.size);
  typeof a == "string" && (a = parseInt(a, 10));
  let s = ot(e.style, t.style);
  s && !("" + s).match(ol) && (console.warn('Invalid font style specified: "' + s + '"'), s = void 0);
  const n = {
    family: ot(e.family, t.family),
    lineHeight: il(ot(e.lineHeight, t.lineHeight), a),
    size: a,
    style: s,
    weight: ot(e.weight, t.weight),
    string: ""
  };
  return n.string = Qr(n), n;
}
function wa(e, t, a, s) {
  let n, o, i;
  for (n = 0, o = e.length; n < o; ++n)
    if (i = e[n], i !== void 0 && i !== void 0)
      return i;
}
function ll(e, t, a) {
  const { min: s, max: n } = e, o = Wo(t, (n - s) / 2), i = (r, l) => a && r === 0 ? 0 : r + l;
  return {
    min: i(s, -Math.abs(o)),
    max: i(n, o)
  };
}
function Be(e, t) {
  return Object.assign(Object.create(e), t);
}
function Ys(e, t = [
  ""
], a, s, n = () => e[0]) {
  const o = a || e;
  typeof s > "u" && (s = ai("_fallback", e));
  const i = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: o,
    _fallback: s,
    _getTarget: n,
    override: (r) => Ys([
      r,
      ...e
    ], t, o, s)
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
      return ti(r, l, () => vl(l, t, e, r));
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
      return xn(r).includes(l);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(r) {
      return xn(r);
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
function ze(e, t, a, s) {
  const n = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: a,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: Jo(e, s),
    setContext: (o) => ze(e, o, a, s),
    override: (o) => ze(e.override(o), t, a, s)
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
      return ti(o, i, () => dl(o, i, r));
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
function Jo(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: a = t.scriptable, _indexable: s = t.indexable, _allKeys: n = t.allKeys } = e;
  return {
    allKeys: n,
    scriptable: a,
    indexable: s,
    isScriptable: be(a) ? a : () => a,
    isIndexable: be(s) ? s : () => s
  };
}
const cl = (e, t) => e ? e + Vs(t) : t, Ks = (e, t) => ht(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function ti(e, t, a) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const s = a();
  return e[t] = s, s;
}
function dl(e, t, a) {
  const { _proxy: s, _context: n, _subProxy: o, _descriptors: i } = e;
  let r = s[t];
  return be(r) && i.isScriptable(t) && (r = ul(t, r, e, a)), Mt(r) && r.length && (r = hl(t, r, e, i.isIndexable)), Ks(t, r) && (r = ze(r, n, o && o[t], i)), r;
}
function ul(e, t, a, s) {
  const { _proxy: n, _context: o, _subProxy: i, _stack: r } = a;
  if (r.has(e))
    throw new Error("Recursion detected: " + Array.from(r).join("->") + "->" + e);
  r.add(e);
  let l = t(o, i || s);
  return r.delete(e), Ks(e, l) && (l = Us(n._scopes, n, e, l)), l;
}
function hl(e, t, a, s) {
  const { _proxy: n, _context: o, _subProxy: i, _descriptors: r } = a;
  if (typeof o.index < "u" && s(e))
    return t[o.index % t.length];
  if (ht(t[0])) {
    const l = t, d = n._scopes.filter((u) => u !== l);
    t = [];
    for (const u of l) {
      const h = Us(d, n, e, u);
      t.push(ze(h, o, i && i[e], r));
    }
  }
  return t;
}
function ei(e, t, a) {
  return be(e) ? e(t, a) : e;
}
const fl = (e, t) => e === !0 ? t : typeof e == "string" ? Ae(t, e) : void 0;
function gl(e, t, a, s, n) {
  for (const o of t) {
    const i = fl(a, o);
    if (i) {
      e.add(i);
      const r = ei(i._fallback, a, n);
      if (typeof r < "u" && r !== a && r !== s)
        return r;
    } else if (i === !1 && typeof s < "u" && a !== s)
      return null;
  }
  return !1;
}
function Us(e, t, a, s) {
  const n = t._rootScopes, o = ei(t._fallback, a, s), i = [
    ...e,
    ...n
  ], r = /* @__PURE__ */ new Set();
  r.add(s);
  let l = _n(r, i, a, o || a, s);
  return l === null || typeof o < "u" && o !== a && (l = _n(r, i, o, l, s), l === null) ? !1 : Ys(Array.from(r), [
    ""
  ], n, o, () => pl(t, a, s));
}
function _n(e, t, a, s, n) {
  for (; a; )
    a = gl(e, t, a, s, n);
  return a;
}
function pl(e, t, a) {
  const s = e._getTarget();
  t in s || (s[t] = {});
  const n = s[t];
  return Mt(n) && ht(a) ? a : n || {};
}
function vl(e, t, a, s) {
  let n;
  for (const o of t)
    if (n = ai(cl(o, e), a), typeof n < "u")
      return Ks(e, n) ? Us(a, s, e, n) : n;
}
function ai(e, t) {
  for (const a of t) {
    if (!a)
      continue;
    const s = a[e];
    if (typeof s < "u")
      return s;
  }
}
function xn(e) {
  let t = e._keys;
  return t || (t = e._keys = bl(e._scopes)), t;
}
function bl(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of e)
    for (const s of Object.keys(a).filter((n) => !n.startsWith("_")))
      t.add(s);
  return Array.from(t);
}
const ml = Number.EPSILON || 1e-14, Ne = (e, t) => t < e.length && !e[t].skip && e[t], si = (e) => e === "x" ? "y" : "x";
function yl(e, t, a, s) {
  const n = e.skip ? t : e, o = t, i = a.skip ? t : a, r = Cs(o, n), l = Cs(i, o);
  let d = r / (r + l), u = l / (r + l);
  d = isNaN(d) ? 0 : d, u = isNaN(u) ? 0 : u;
  const h = s * d, p = s * u;
  return {
    previous: {
      x: o.x - h * (i.x - n.x),
      y: o.y - h * (i.y - n.y)
    },
    next: {
      x: o.x + p * (i.x - n.x),
      y: o.y + p * (i.y - n.y)
    }
  };
}
function _l(e, t, a) {
  const s = e.length;
  let n, o, i, r, l, d = Ne(e, 0);
  for (let u = 0; u < s - 1; ++u)
    if (l = d, d = Ne(e, u + 1), !(!l || !d)) {
      if (na(t[u], 0, ml)) {
        a[u] = a[u + 1] = 0;
        continue;
      }
      n = a[u] / t[u], o = a[u + 1] / t[u], r = Math.pow(n, 2) + Math.pow(o, 2), !(r <= 9) && (i = 3 / Math.sqrt(r), a[u] = n * i * t[u], a[u + 1] = o * i * t[u]);
    }
}
function xl(e, t, a = "x") {
  const s = si(a), n = e.length;
  let o, i, r, l = Ne(e, 0);
  for (let d = 0; d < n; ++d) {
    if (i = r, r = l, l = Ne(e, d + 1), !r)
      continue;
    const u = r[a], h = r[s];
    i && (o = (u - i[a]) / 3, r[`cp1${a}`] = u - o, r[`cp1${s}`] = h - o * t[d]), l && (o = (l[a] - u) / 3, r[`cp2${a}`] = u + o, r[`cp2${s}`] = h + o * t[d]);
  }
}
function kl(e, t = "x") {
  const a = si(t), s = e.length, n = Array(s).fill(0), o = Array(s);
  let i, r, l, d = Ne(e, 0);
  for (i = 0; i < s; ++i)
    if (r = l, l = d, d = Ne(e, i + 1), !!l) {
      if (d) {
        const u = d[t] - l[t];
        n[i] = u !== 0 ? (d[a] - l[a]) / u : 0;
      }
      o[i] = r ? d ? Qt(n[i - 1]) !== Qt(n[i]) ? 0 : (n[i - 1] + n[i]) / 2 : n[i - 1] : n[i];
    }
  _l(e, n, o), xl(e, o, t);
}
function $a(e, t, a) {
  return Math.max(Math.min(e, a), t);
}
function wl(e, t) {
  let a, s, n, o, i, r = ga(e[0], t);
  for (a = 0, s = e.length; a < s; ++a)
    i = o, o = r, r = a < s - 1 && ga(e[a + 1], t), o && (n = e[a], i && (n.cp1x = $a(n.cp1x, t.left, t.right), n.cp1y = $a(n.cp1y, t.top, t.bottom)), r && (n.cp2x = $a(n.cp2x, t.left, t.right), n.cp2y = $a(n.cp2y, t.top, t.bottom)));
}
function $l(e, t, a, s, n) {
  let o, i, r, l;
  if (t.spanGaps && (e = e.filter((d) => !d.skip)), t.cubicInterpolationMode === "monotone")
    kl(e, n);
  else {
    let d = s ? e[e.length - 1] : e[0];
    for (o = 0, i = e.length; o < i; ++o)
      r = e[o], l = yl(d, r, e[Math.min(o + 1, i - (s ? 0 : 1)) % i], t.tension), r.cp1x = l.previous.x, r.cp1y = l.previous.y, r.cp2x = l.next.x, r.cp2y = l.next.y, d = r;
  }
  t.capBezierPoints && wl(e, a);
}
function qs() {
  return typeof window < "u" && typeof document < "u";
}
function Xs(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function za(e, t, a) {
  let s;
  return typeof e == "string" ? (s = parseInt(e, 10), e.indexOf("%") !== -1 && (s = s / 100 * t.parentNode[a])) : s = e, s;
}
const Ya = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function Ml(e, t) {
  return Ya(e).getPropertyValue(t);
}
const Sl = [
  "top",
  "right",
  "bottom",
  "left"
];
function De(e, t, a) {
  const s = {};
  a = a ? "-" + a : "";
  for (let n = 0; n < 4; n++) {
    const o = Sl[n];
    s[o] = parseFloat(e[t + "-" + o + a]) || 0;
  }
  return s.width = s.left + s.right, s.height = s.top + s.bottom, s;
}
const Cl = (e, t, a) => (e > 0 || t > 0) && (!a || !a.shadowRoot);
function Dl(e, t) {
  const a = e.touches, s = a && a.length ? a[0] : e, { offsetX: n, offsetY: o } = s;
  let i = !1, r, l;
  if (Cl(n, o, e.target))
    r = n, l = o;
  else {
    const d = t.getBoundingClientRect();
    r = s.clientX - d.left, l = s.clientY - d.top, i = !0;
  }
  return {
    x: r,
    y: l,
    box: i
  };
}
function Me(e, t) {
  if ("native" in e)
    return e;
  const { canvas: a, currentDevicePixelRatio: s } = t, n = Ya(a), o = n.boxSizing === "border-box", i = De(n, "padding"), r = De(n, "border", "width"), { x: l, y: d, box: u } = Dl(e, a), h = i.left + (u && r.left), p = i.top + (u && r.top);
  let { width: v, height: f } = t;
  return o && (v -= i.width + r.width, f -= i.height + r.height), {
    x: Math.round((l - h) / v * a.width / s),
    y: Math.round((d - p) / f * a.height / s)
  };
}
function Al(e, t, a) {
  let s, n;
  if (t === void 0 || a === void 0) {
    const o = e && Xs(e);
    if (!o)
      t = e.clientWidth, a = e.clientHeight;
    else {
      const i = o.getBoundingClientRect(), r = Ya(o), l = De(r, "border", "width"), d = De(r, "padding");
      t = i.width - d.width - l.width, a = i.height - d.height - l.height, s = za(r.maxWidth, o, "clientWidth"), n = za(r.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: t,
    height: a,
    maxWidth: s || Oa,
    maxHeight: n || Oa
  };
}
const ge = (e) => Math.round(e * 10) / 10;
function Tl(e, t, a, s) {
  const n = Ya(e), o = De(n, "margin"), i = za(n.maxWidth, e, "clientWidth") || Oa, r = za(n.maxHeight, e, "clientHeight") || Oa, l = Al(e, t, a);
  let { width: d, height: u } = l;
  if (n.boxSizing === "content-box") {
    const p = De(n, "border", "width"), v = De(n, "padding");
    d -= v.width + p.width, u -= v.height + p.height;
  }
  return d = Math.max(0, d - o.width), u = Math.max(0, s ? d / s : u - o.height), d = ge(Math.min(d, i, l.maxWidth)), u = ge(Math.min(u, r, l.maxHeight)), d && !u && (u = ge(d / 2)), (t !== void 0 || a !== void 0) && s && l.height && u > l.height && (u = l.height, d = ge(Math.floor(u * s))), {
    width: d,
    height: u
  };
}
function kn(e, t, a) {
  const s = t || 1, n = ge(e.height * s), o = ge(e.width * s);
  e.height = ge(e.height), e.width = ge(e.width);
  const i = e.canvas;
  return i.style && (a || !i.style.height && !i.style.width) && (i.style.height = `${e.height}px`, i.style.width = `${e.width}px`), e.currentDevicePixelRatio !== s || i.height !== n || i.width !== o ? (e.currentDevicePixelRatio = s, i.height = n, i.width = o, e.ctx.setTransform(s, 0, 0, s, 0, 0), !0) : !1;
}
const Bl = (function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    qs() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function wn(e, t) {
  const a = Ml(e, t), s = a && a.match(/^(\d+)(\.\d+)?px$/);
  return s ? +s[1] : void 0;
}
function Se(e, t, a, s) {
  return {
    x: e.x + a * (t.x - e.x),
    y: e.y + a * (t.y - e.y)
  };
}
function Ll(e, t, a, s) {
  return {
    x: e.x + a * (t.x - e.x),
    y: s === "middle" ? a < 0.5 ? e.y : t.y : s === "after" ? a < 1 ? e.y : t.y : a > 0 ? t.y : e.y
  };
}
function Fl(e, t, a, s) {
  const n = {
    x: e.cp2x,
    y: e.cp2y
  }, o = {
    x: t.cp1x,
    y: t.cp1y
  }, i = Se(e, n, a), r = Se(n, o, a), l = Se(o, t, a), d = Se(i, r, a), u = Se(r, l, a);
  return Se(d, u, a);
}
const Pl = function(e, t) {
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
    xPlus(a, s) {
      return a - s;
    },
    leftForLtr(a, s) {
      return a - s;
    }
  };
}, Il = function() {
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
function Ve(e, t, a) {
  return e ? Pl(t, a) : Il();
}
function ni(e, t) {
  let a, s;
  (t === "ltr" || t === "rtl") && (a = e.canvas.style, s = [
    a.getPropertyValue("direction"),
    a.getPropertyPriority("direction")
  ], a.setProperty("direction", t, "important"), e.prevTextDirection = s);
}
function oi(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function ii(e) {
  return e === "angle" ? {
    between: fa,
    compare: Pr,
    normalize: Wt
  } : {
    between: oe,
    compare: (t, a) => t - a,
    normalize: (t) => t
  };
}
function $n({ start: e, end: t, count: a, loop: s, style: n }) {
  return {
    start: e % a,
    end: t % a,
    loop: s && (t - e + 1) % a === 0,
    style: n
  };
}
function El(e, t, a) {
  const { property: s, start: n, end: o } = a, { between: i, normalize: r } = ii(s), l = t.length;
  let { start: d, end: u, loop: h } = e, p, v;
  if (h) {
    for (d += l, u += l, p = 0, v = l; p < v && i(r(t[d % l][s]), n, o); ++p)
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
function ri(e, t, a) {
  if (!a)
    return [
      e
    ];
  const { property: s, start: n, end: o } = a, i = t.length, { compare: r, between: l, normalize: d } = ii(s), { start: u, end: h, loop: p, style: v } = El(e, t, a), f = [];
  let _ = !1, b = null, g, m, $;
  const k = () => l(n, $, g) && r(n, $) !== 0, w = () => r(o, g) === 0 || l(o, $, g), S = () => _ || k(), D = () => !_ || w();
  for (let T = u, O = u; T <= h; ++T)
    m = t[T % i], !m.skip && (g = d(m[s]), g !== $ && (_ = l(g, n, o), b === null && S() && (b = r(g, n) === 0 ? T : O), b !== null && D() && (f.push($n({
      start: b,
      end: T,
      loop: p,
      count: i,
      style: v
    })), b = null), O = T, $ = g));
  return b !== null && f.push($n({
    start: b,
    end: h,
    loop: p,
    count: i,
    style: v
  })), f;
}
function li(e, t) {
  const a = [], s = e.segments;
  for (let n = 0; n < s.length; n++) {
    const o = ri(s[n], e.points, t);
    o.length && a.push(...o);
  }
  return a;
}
function Rl(e, t, a, s) {
  let n = 0, o = t - 1;
  if (a && !s)
    for (; n < t && !e[n].skip; )
      n++;
  for (; n < t && e[n].skip; )
    n++;
  for (n %= t, a && (o += n); o > n && e[o % t].skip; )
    o--;
  return o %= t, {
    start: n,
    end: o
  };
}
function Ol(e, t, a, s) {
  const n = e.length, o = [];
  let i = t, r = e[t], l;
  for (l = t + 1; l <= a; ++l) {
    const d = e[l % n];
    d.skip || d.stop ? r.skip || (s = !1, o.push({
      start: t % n,
      end: (l - 1) % n,
      loop: s
    }), t = i = d.stop ? l : null) : (i = l, r.skip && (t = l)), r = d;
  }
  return i !== null && o.push({
    start: t % n,
    end: i % n,
    loop: s
  }), o;
}
function Vl(e, t) {
  const a = e.points, s = e.options.spanGaps, n = a.length;
  if (!n)
    return [];
  const o = !!e._loop, { start: i, end: r } = Rl(a, n, o, s);
  if (s === !0)
    return Mn(e, [
      {
        start: i,
        end: r,
        loop: o
      }
    ], a, t);
  const l = r < i ? r + n : r, d = !!e._fullLoop && i === 0 && r === n - 1;
  return Mn(e, Ol(a, i, l, d), a, t);
}
function Mn(e, t, a, s) {
  return !s || !s.setContext || !a ? t : zl(e, t, a, s);
}
function zl(e, t, a, s) {
  const n = e._chart.getContext(), o = Sn(e.options), { _datasetIndex: i, options: { spanGaps: r } } = e, l = a.length, d = [];
  let u = o, h = t[0].start, p = h;
  function v(f, _, b, g) {
    const m = r ? -1 : 1;
    if (f !== _) {
      for (f += l; a[f % l].skip; )
        f -= m;
      for (; a[_ % l].skip; )
        _ += m;
      f % l !== _ % l && (d.push({
        start: f % l,
        end: _ % l,
        loop: b,
        style: g
      }), u = g, h = _ % l);
    }
  }
  for (const f of t) {
    h = r ? h : f.start;
    let _ = a[h % l], b;
    for (p = h + 1; p <= f.end; p++) {
      const g = a[p % l];
      b = Sn(s.setContext(Be(n, {
        type: "segment",
        p0: _,
        p1: g,
        p0DataIndex: (p - 1) % l,
        p1DataIndex: p % l,
        datasetIndex: i
      }))), Nl(b, u) && v(h, p - 1, f.loop, u), _ = g, u = b;
    }
    h < p - 1 && v(h, p - 1, f.loop, u);
  }
  return d;
}
function Sn(e) {
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
function Nl(e, t) {
  if (!t)
    return !1;
  const a = [], s = function(n, o) {
    return Ws(o) ? (a.includes(o) || a.push(o), a.indexOf(o)) : o;
  };
  return JSON.stringify(e, s) !== JSON.stringify(t, s);
}
function Ma(e, t, a) {
  return e.options.clip ? e[a] : t[a];
}
function Wl(e, t) {
  const { xScale: a, yScale: s } = e;
  return a && s ? {
    left: Ma(a, t, "left"),
    right: Ma(a, t, "right"),
    top: Ma(s, t, "top"),
    bottom: Ma(s, t, "bottom")
  } : t;
}
function ci(e, t) {
  const a = t._clip;
  if (a.disabled)
    return !1;
  const s = Wl(t, e.chartArea);
  return {
    left: a.left === !1 ? 0 : s.left - (a.left === !0 ? 0 : a.left),
    right: a.right === !1 ? e.width : s.right + (a.right === !0 ? 0 : a.right),
    top: a.top === !1 ? 0 : s.top - (a.top === !0 ? 0 : a.top),
    bottom: a.bottom === !1 ? e.height : s.bottom + (a.bottom === !0 ? 0 : a.bottom)
  };
}
class Hl {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(t, a, s, n) {
    const o = a.listeners[n], i = a.duration;
    o.forEach((r) => r({
      chart: t,
      initial: a.initial,
      numSteps: i,
      currentStep: Math.min(s - a.start, i)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = qo.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let a = 0;
    this._charts.forEach((s, n) => {
      if (!s.running || !s.items.length)
        return;
      const o = s.items;
      let i = o.length - 1, r = !1, l;
      for (; i >= 0; --i)
        l = o[i], l._active ? (l._total > s.duration && (s.duration = l._total), l.tick(t), r = !0) : (o[i] = o[o.length - 1], o.pop());
      r && (n.draw(), this._notify(n, s, t, "progress")), o.length || (s.running = !1, this._notify(n, s, t, "complete"), s.initial = !1), a += o.length;
    }), this._lastDate = t, a === 0 && (this._running = !1);
  }
  _getAnims(t) {
    const a = this._charts;
    let s = a.get(t);
    return s || (s = {
      running: !1,
      initial: !0,
      items: [],
      listeners: {
        complete: [],
        progress: []
      }
    }, a.set(t, s)), s;
  }
  listen(t, a, s) {
    this._getAnims(t).listeners[a].push(s);
  }
  add(t, a) {
    !a || !a.length || this._getAnims(t).items.push(...a);
  }
  has(t) {
    return this._getAnims(t).items.length > 0;
  }
  start(t) {
    const a = this._charts.get(t);
    a && (a.running = !0, a.start = Date.now(), a.duration = a.items.reduce((s, n) => Math.max(s, n._duration), 0), this._refresh());
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
    const s = a.items;
    let n = s.length - 1;
    for (; n >= 0; --n)
      s[n].cancel();
    a.items = [], this._notify(t, a, Date.now(), "complete");
  }
  remove(t) {
    return this._charts.delete(t);
  }
}
var ee = /* @__PURE__ */ new Hl();
const Cn = "transparent", jl = {
  boolean(e, t, a) {
    return a > 0.5 ? t : e;
  },
  color(e, t, a) {
    const s = vn(e || Cn), n = s.valid && vn(t || Cn);
    return n && n.valid ? n.mix(s, a).hexString() : t;
  },
  number(e, t, a) {
    return e + (t - e) * a;
  }
};
class Yl {
  constructor(t, a, s, n) {
    const o = a[s];
    n = wa([
      t.to,
      n,
      o,
      t.from
    ]);
    const i = wa([
      t.from,
      o,
      n
    ]);
    this._active = !0, this._fn = t.fn || jl[t.type || typeof i], this._easing = oa[t.easing] || oa.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = a, this._prop = s, this._from = i, this._to = n, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, a, s) {
    if (this._active) {
      this._notify(!1);
      const n = this._target[this._prop], o = s - this._start, i = this._duration - o;
      this._start = s, this._duration = Math.floor(Math.max(i, t.duration)), this._total += o, this._loop = !!t.loop, this._to = wa([
        t.to,
        a,
        n,
        t.from
      ]), this._from = wa([
        t.from,
        n,
        a
      ]);
    }
  }
  cancel() {
    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
  }
  tick(t) {
    const a = t - this._start, s = this._duration, n = this._prop, o = this._from, i = this._loop, r = this._to;
    let l;
    if (this._active = o !== r && (i || a < s), !this._active) {
      this._target[n] = r, this._notify(!0);
      return;
    }
    if (a < 0) {
      this._target[n] = o;
      return;
    }
    l = a / s % 2, l = i && l > 1 ? 2 - l : l, l = this._easing(Math.min(1, Math.max(0, l))), this._target[n] = this._fn(o, r, l);
  }
  wait() {
    const t = this._promises || (this._promises = []);
    return new Promise((a, s) => {
      t.push({
        res: a,
        rej: s
      });
    });
  }
  _notify(t) {
    const a = t ? "res" : "rej", s = this._promises || [];
    for (let n = 0; n < s.length; n++)
      s[n][a]();
  }
}
class di {
  constructor(t, a) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(a);
  }
  configure(t) {
    if (!ht(t))
      return;
    const a = Object.keys($t.animation), s = this._properties;
    Object.getOwnPropertyNames(t).forEach((n) => {
      const o = t[n];
      if (!ht(o))
        return;
      const i = {};
      for (const r of a)
        i[r] = o[r];
      (Mt(o.properties) && o.properties || [
        n
      ]).forEach((r) => {
        (r === n || !s.has(r)) && s.set(r, i);
      });
    });
  }
  _animateOptions(t, a) {
    const s = a.options, n = Ul(t, s);
    if (!n)
      return [];
    const o = this._createAnimations(n, s);
    return s.$shared && Kl(t.options.$animations, s).then(() => {
      t.options = s;
    }, () => {
    }), o;
  }
  _createAnimations(t, a) {
    const s = this._properties, n = [], o = t.$animations || (t.$animations = {}), i = Object.keys(a), r = Date.now();
    let l;
    for (l = i.length - 1; l >= 0; --l) {
      const d = i[l];
      if (d.charAt(0) === "$")
        continue;
      if (d === "options") {
        n.push(...this._animateOptions(t, a));
        continue;
      }
      const u = a[d];
      let h = o[d];
      const p = s.get(d);
      if (h)
        if (p && h.active()) {
          h.update(p, u, r);
          continue;
        } else
          h.cancel();
      if (!p || !p.duration) {
        t[d] = u;
        continue;
      }
      o[d] = h = new Yl(p, t, d, u), n.push(h);
    }
    return n;
  }
  update(t, a) {
    if (this._properties.size === 0) {
      Object.assign(t, a);
      return;
    }
    const s = this._createAnimations(t, a);
    if (s.length)
      return ee.add(this._chart, s), !0;
  }
}
function Kl(e, t) {
  const a = [], s = Object.keys(t);
  for (let n = 0; n < s.length; n++) {
    const o = e[s[n]];
    o && o.active() && a.push(o.wait());
  }
  return Promise.all(a);
}
function Ul(e, t) {
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
function Dn(e, t) {
  const a = e && e.options || {}, s = a.reverse, n = a.min === void 0 ? t : 0, o = a.max === void 0 ? t : 0;
  return {
    start: s ? o : n,
    end: s ? n : o
  };
}
function ql(e, t, a) {
  if (a === !1)
    return !1;
  const s = Dn(e, a), n = Dn(t, a);
  return {
    top: n.end,
    right: s.end,
    bottom: n.start,
    left: s.start
  };
}
function Xl(e) {
  let t, a, s, n;
  return ht(e) ? (t = e.top, a = e.right, s = e.bottom, n = e.left) : t = a = s = n = e, {
    top: t,
    right: a,
    bottom: s,
    left: n,
    disabled: e === !1
  };
}
function ui(e, t) {
  const a = [], s = e._getSortedDatasetMetas(t);
  let n, o;
  for (n = 0, o = s.length; n < o; ++n)
    a.push(s[n].index);
  return a;
}
function An(e, t, a, s = {}) {
  const n = e.keys, o = s.mode === "single";
  let i, r, l, d;
  if (t === null)
    return;
  let u = !1;
  for (i = 0, r = n.length; i < r; ++i) {
    if (l = +n[i], l === a) {
      if (u = !0, s.all)
        continue;
      break;
    }
    d = e.values[l], Lt(d) && (o || t === 0 || Qt(t) === Qt(d)) && (t += d);
  }
  return !u && !s.all ? 0 : t;
}
function Gl(e, t) {
  const { iScale: a, vScale: s } = t, n = a.axis === "x" ? "x" : "y", o = s.axis === "x" ? "x" : "y", i = Object.keys(e), r = new Array(i.length);
  let l, d, u;
  for (l = 0, d = i.length; l < d; ++l)
    u = i[l], r[l] = {
      [n]: u,
      [o]: e[u]
    };
  return r;
}
function as(e, t) {
  const a = e && e.options.stacked;
  return a || a === void 0 && t.stack !== void 0;
}
function Zl(e, t, a) {
  return `${e.id}.${t.id}.${a.stack || a.type}`;
}
function Ql(e) {
  const { min: t, max: a, minDefined: s, maxDefined: n } = e.getUserBounds();
  return {
    min: s ? t : Number.NEGATIVE_INFINITY,
    max: n ? a : Number.POSITIVE_INFINITY
  };
}
function Jl(e, t, a) {
  const s = e[t] || (e[t] = {});
  return s[a] || (s[a] = {});
}
function Tn(e, t, a, s) {
  for (const n of t.getMatchingVisibleMetas(s).reverse()) {
    const o = e[n.index];
    if (a && o > 0 || !a && o < 0)
      return n.index;
  }
  return null;
}
function Bn(e, t) {
  const { chart: a, _cachedMeta: s } = e, n = a._stacks || (a._stacks = {}), { iScale: o, vScale: i, index: r } = s, l = o.axis, d = i.axis, u = Zl(o, i, s), h = t.length;
  let p;
  for (let v = 0; v < h; ++v) {
    const f = t[v], { [l]: _, [d]: b } = f, g = f._stacks || (f._stacks = {});
    p = g[d] = Jl(n, u, _), p[r] = b, p._top = Tn(p, i, !0, s.type), p._bottom = Tn(p, i, !1, s.type);
    const m = p._visualValues || (p._visualValues = {});
    m[r] = b;
  }
}
function ss(e, t) {
  const a = e.scales;
  return Object.keys(a).filter((s) => a[s].axis === t).shift();
}
function tc(e, t) {
  return Be(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function ec(e, t, a) {
  return Be(e, {
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
function Ue(e, t) {
  const a = e.controller.index, s = e.vScale && e.vScale.axis;
  if (s) {
    t = t || e._parsed;
    for (const n of t) {
      const o = n._stacks;
      if (!o || o[s] === void 0 || o[s][a] === void 0)
        return;
      delete o[s][a], o[s]._visualValues !== void 0 && o[s]._visualValues[a] !== void 0 && delete o[s]._visualValues[a];
    }
  }
}
const ns = (e) => e === "reset" || e === "none", Ln = (e, t) => t ? e : Object.assign({}, e), ac = (e, t, a) => e && !t.hidden && t._stacked && {
  keys: ui(a, !0),
  values: null
};
class Ka {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(t, a) {
    this.chart = t, this._ctx = t.ctx, this.index = a, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = as(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && Ue(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, a = this._cachedMeta, s = this.getDataset(), n = (h, p, v, f) => h === "x" ? p : h === "r" ? f : v, o = a.xAxisID = ot(s.xAxisID, ss(t, "x")), i = a.yAxisID = ot(s.yAxisID, ss(t, "y")), r = a.rAxisID = ot(s.rAxisID, ss(t, "r")), l = a.indexAxis, d = a.iAxisID = n(l, o, i, r), u = a.vAxisID = n(l, i, o, r);
    a.xScale = this.getScaleForId(o), a.yScale = this.getScaleForId(i), a.rScale = this.getScaleForId(r), a.iScale = this.getScaleForId(d), a.vScale = this.getScaleForId(u);
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
    this._data && fn(this._data, this), t._stacked && Ue(t);
  }
  _dataCheck() {
    const t = this.getDataset(), a = t.data || (t.data = []), s = this._data;
    if (ht(a)) {
      const n = this._cachedMeta;
      this._data = Gl(a, n);
    } else if (s !== a) {
      if (s) {
        fn(s, this);
        const n = this._cachedMeta;
        Ue(n), n._parsed = [];
      }
      a && Object.isExtensible(a) && Or(a, this), this._syncList = [], this._data = a;
    }
  }
  addElements() {
    const t = this._cachedMeta;
    this._dataCheck(), this.datasetElementType && (t.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(t) {
    const a = this._cachedMeta, s = this.getDataset();
    let n = !1;
    this._dataCheck();
    const o = a._stacked;
    a._stacked = as(a.vScale, a), a.stack !== s.stack && (n = !0, Ue(a), a.stack = s.stack), this._resyncElements(t), (n || o !== a._stacked) && (Bn(this, a._parsed), a._stacked = as(a.vScale, a));
  }
  configure() {
    const t = this.chart.config, a = t.datasetScopeKeys(this._type), s = t.getOptionScopes(this.getDataset(), a, !0);
    this.options = t.createResolver(s, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, a) {
    const { _cachedMeta: s, _data: n } = this, { iScale: o, _stacked: i } = s, r = o.axis;
    let l = t === 0 && a === n.length ? !0 : s._sorted, d = t > 0 && s._parsed[t - 1], u, h, p;
    if (this._parsing === !1)
      s._parsed = n, s._sorted = !0, p = n;
    else {
      Mt(n[t]) ? p = this.parseArrayData(s, n, t, a) : ht(n[t]) ? p = this.parseObjectData(s, n, t, a) : p = this.parsePrimitiveData(s, n, t, a);
      const v = () => h[r] === null || d && h[r] < d[r];
      for (u = 0; u < a; ++u)
        s._parsed[u + t] = h = p[u], l && (v() && (l = !1), d = h);
      s._sorted = l;
    }
    i && Bn(this, p);
  }
  parsePrimitiveData(t, a, s, n) {
    const { iScale: o, vScale: i } = t, r = o.axis, l = i.axis, d = o.getLabels(), u = o === i, h = new Array(n);
    let p, v, f;
    for (p = 0, v = n; p < v; ++p)
      f = p + s, h[p] = {
        [r]: u || o.parse(d[f], f),
        [l]: i.parse(a[f], f)
      };
    return h;
  }
  parseArrayData(t, a, s, n) {
    const { xScale: o, yScale: i } = t, r = new Array(n);
    let l, d, u, h;
    for (l = 0, d = n; l < d; ++l)
      u = l + s, h = a[u], r[l] = {
        x: o.parse(h[0], u),
        y: i.parse(h[1], u)
      };
    return r;
  }
  parseObjectData(t, a, s, n) {
    const { xScale: o, yScale: i } = t, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, d = new Array(n);
    let u, h, p, v;
    for (u = 0, h = n; u < h; ++u)
      p = u + s, v = a[p], d[u] = {
        x: o.parse(Ae(v, r), p),
        y: i.parse(Ae(v, l), p)
      };
    return d;
  }
  getParsed(t) {
    return this._cachedMeta._parsed[t];
  }
  getDataElement(t) {
    return this._cachedMeta.data[t];
  }
  applyStack(t, a, s) {
    const n = this.chart, o = this._cachedMeta, i = a[t.axis], r = {
      keys: ui(n, !0),
      values: a._stacks[t.axis]._visualValues
    };
    return An(r, i, o.index, {
      mode: s
    });
  }
  updateRangeFromParsed(t, a, s, n) {
    const o = s[a.axis];
    let i = o === null ? NaN : o;
    const r = n && s._stacks[a.axis];
    n && r && (n.values = r, i = An(n, o, this._cachedMeta.index)), t.min = Math.min(t.min, i), t.max = Math.max(t.max, i);
  }
  getMinMax(t, a) {
    const s = this._cachedMeta, n = s._parsed, o = s._sorted && t === s.iScale, i = n.length, r = this._getOtherScale(t), l = ac(a, s, this.chart), d = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: u, max: h } = Ql(r);
    let p, v;
    function f() {
      v = n[p];
      const _ = v[r.axis];
      return !Lt(v[t.axis]) || u > _ || h < _;
    }
    for (p = 0; p < i && !(!f() && (this.updateRangeFromParsed(d, t, v, l), o)); ++p)
      ;
    if (o) {
      for (p = i - 1; p >= 0; --p)
        if (!f()) {
          this.updateRangeFromParsed(d, t, v, l);
          break;
        }
    }
    return d;
  }
  getAllParsedValues(t) {
    const a = this._cachedMeta._parsed, s = [];
    let n, o, i;
    for (n = 0, o = a.length; n < o; ++n)
      i = a[n][t.axis], Lt(i) && s.push(i);
    return s;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(t) {
    const a = this._cachedMeta, s = a.iScale, n = a.vScale, o = this.getParsed(t);
    return {
      label: s ? "" + s.getLabelForValue(o[s.axis]) : "",
      value: n ? "" + n.getLabelForValue(o[n.axis]) : ""
    };
  }
  _update(t) {
    const a = this._cachedMeta;
    this.update(t || "default"), a._clip = Xl(ot(this.options.clip, ql(a.xScale, a.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, a = this.chart, s = this._cachedMeta, n = s.data || [], o = a.chartArea, i = [], r = this._drawStart || 0, l = this._drawCount || n.length - r, d = this.options.drawActiveElementsOnTop;
    let u;
    for (s.dataset && s.dataset.draw(t, o, r, l), u = r; u < r + l; ++u) {
      const h = n[u];
      h.hidden || (h.active && d ? i.push(h) : h.draw(t, o));
    }
    for (u = 0; u < i.length; ++u)
      i[u].draw(t, o);
  }
  getStyle(t, a) {
    const s = a ? "active" : "default";
    return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(s) : this.resolveDataElementOptions(t || 0, s);
  }
  getContext(t, a, s) {
    const n = this.getDataset();
    let o;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const i = this._cachedMeta.data[t];
      o = i.$context || (i.$context = ec(this.getContext(), t, i)), o.parsed = this.getParsed(t), o.raw = n.data[t], o.index = o.dataIndex = t;
    } else
      o = this.$context || (this.$context = tc(this.chart.getContext(), this.index)), o.dataset = n, o.index = o.datasetIndex = this.index;
    return o.active = !!a, o.mode = s, o;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, a) {
    return this._resolveElementOptions(this.dataElementType.id, a, t);
  }
  _resolveElementOptions(t, a = "default", s) {
    const n = a === "active", o = this._cachedDataOpts, i = t + "-" + a, r = o[i], l = this.enableOptionSharing && ua(s);
    if (r)
      return Ln(r, l);
    const d = this.chart.config, u = d.datasetElementScopeKeys(this._type, t), h = n ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], p = d.getOptionScopes(this.getDataset(), u), v = Object.keys($t.elements[t]), f = () => this.getContext(s, n, a), _ = d.resolveNamedOptions(p, v, f, h);
    return _.$shared && (_.$shared = l, o[i] = Object.freeze(Ln(_, l))), _;
  }
  _resolveAnimations(t, a, s) {
    const n = this.chart, o = this._cachedDataOpts, i = `animation-${a}`, r = o[i];
    if (r)
      return r;
    let l;
    if (n.options.animation !== !1) {
      const u = this.chart.config, h = u.datasetAnimationScopeKeys(this._type, a), p = u.getOptionScopes(this.getDataset(), h);
      l = u.createResolver(p, this.getContext(t, s, a));
    }
    const d = new di(n, l && l.animations);
    return l && l._cacheable && (o[i] = Object.freeze(d)), d;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, a) {
    return !a || ns(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, a) {
    const s = this.resolveDataElementOptions(t, a), n = this._sharedOptions, o = this.getSharedOptions(s), i = this.includeOptions(a, o) || o !== n;
    return this.updateSharedOptions(o, a, s), {
      sharedOptions: o,
      includeOptions: i
    };
  }
  updateElement(t, a, s, n) {
    ns(n) ? Object.assign(t, s) : this._resolveAnimations(a, n).update(t, s);
  }
  updateSharedOptions(t, a, s) {
    t && !ns(a) && this._resolveAnimations(void 0, a).update(t, s);
  }
  _setStyle(t, a, s, n) {
    t.active = n;
    const o = this.getStyle(a, n);
    this._resolveAnimations(a, s, n).update(t, {
      options: !n && this.getSharedOptions(o) || o
    });
  }
  removeHoverStyle(t, a, s) {
    this._setStyle(t, s, "active", !1);
  }
  setHoverStyle(t, a, s) {
    this._setStyle(t, s, "active", !0);
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
    const a = this._data, s = this._cachedMeta.data;
    for (const [r, l, d] of this._syncList)
      this[r](l, d);
    this._syncList = [];
    const n = s.length, o = a.length, i = Math.min(o, n);
    i && this.parse(0, i), o > n ? this._insertElements(n, o - n, t) : o < n && this._removeElements(o, n - o);
  }
  _insertElements(t, a, s = !0) {
    const n = this._cachedMeta, o = n.data, i = t + a;
    let r;
    const l = (d) => {
      for (d.length += a, r = d.length - 1; r >= i; r--)
        d[r] = d[r - a];
    };
    for (l(o), r = t; r < i; ++r)
      o[r] = new this.dataElementType();
    this._parsing && l(n._parsed), this.parse(t, a), s && this.updateElements(o, t, a, "reset");
  }
  updateElements(t, a, s, n) {
  }
  _removeElements(t, a) {
    const s = this._cachedMeta;
    if (this._parsing) {
      const n = s._parsed.splice(t, a);
      s._stacked && Ue(s, n);
    }
    s.data.splice(t, a);
  }
  _sync(t) {
    if (this._parsing)
      this._syncList.push(t);
    else {
      const [a, s, n] = t;
      this[a](s, n);
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
    const s = arguments.length - 2;
    s && this._sync([
      "_insertElements",
      t,
      s
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
function sc(e, t) {
  if (!e._cache.$bar) {
    const a = e.getMatchingVisibleMetas(t);
    let s = [];
    for (let n = 0, o = a.length; n < o; n++)
      s = s.concat(a[n].controller.getAllParsedValues(e));
    e._cache.$bar = Uo(s.sort((n, o) => n - o));
  }
  return e._cache.$bar;
}
function nc(e) {
  const t = e.iScale, a = sc(t, e.type);
  let s = t._length, n, o, i, r;
  const l = () => {
    i === 32767 || i === -32768 || (ua(r) && (s = Math.min(s, Math.abs(i - r) || s)), r = i);
  };
  for (n = 0, o = a.length; n < o; ++n)
    i = t.getPixelForValue(a[n]), l();
  for (r = void 0, n = 0, o = t.ticks.length; n < o; ++n)
    i = t.getPixelForTick(n), l();
  return s;
}
function oc(e, t, a, s) {
  const n = a.barThickness;
  let o, i;
  return pt(n) ? (o = t.min * a.categoryPercentage, i = a.barPercentage) : (o = n * s, i = 1), {
    chunk: o / s,
    ratio: i,
    start: t.pixels[e] - o / 2
  };
}
function ic(e, t, a, s) {
  const n = t.pixels, o = n[e];
  let i = e > 0 ? n[e - 1] : null, r = e < n.length - 1 ? n[e + 1] : null;
  const l = a.categoryPercentage;
  i === null && (i = o - (r === null ? t.end - t.start : r - o)), r === null && (r = o + o - i);
  const d = o - (o - Math.min(i, r)) / 2 * l;
  return {
    chunk: Math.abs(r - i) / 2 * l / s,
    ratio: a.barPercentage,
    start: d
  };
}
function rc(e, t, a, s) {
  const n = a.parse(e[0], s), o = a.parse(e[1], s), i = Math.min(n, o), r = Math.max(n, o);
  let l = i, d = r;
  Math.abs(i) > Math.abs(r) && (l = r, d = i), t[a.axis] = d, t._custom = {
    barStart: l,
    barEnd: d,
    start: n,
    end: o,
    min: i,
    max: r
  };
}
function hi(e, t, a, s) {
  return Mt(e) ? rc(e, t, a, s) : t[a.axis] = a.parse(e, s), t;
}
function Fn(e, t, a, s) {
  const n = e.iScale, o = e.vScale, i = n.getLabels(), r = n === o, l = [];
  let d, u, h, p;
  for (d = a, u = a + s; d < u; ++d)
    p = t[d], h = {}, h[n.axis] = r || n.parse(i[d], d), l.push(hi(p, h, o, d));
  return l;
}
function os(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function lc(e, t, a) {
  return e !== 0 ? Qt(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= a ? 1 : -1);
}
function cc(e) {
  let t, a, s, n, o;
  return e.horizontal ? (t = e.base > e.x, a = "left", s = "right") : (t = e.base < e.y, a = "bottom", s = "top"), t ? (n = "end", o = "start") : (n = "start", o = "end"), {
    start: a,
    end: s,
    reverse: t,
    top: n,
    bottom: o
  };
}
function dc(e, t, a, s) {
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
  const { start: i, end: r, reverse: l, top: d, bottom: u } = cc(e);
  n === "middle" && a && (e.enableBorderRadius = !0, (a._top || 0) === s ? n = d : (a._bottom || 0) === s ? n = u : (o[Pn(u, i, r, l)] = !0, n = d)), o[Pn(n, i, r, l)] = !0, e.borderSkipped = o;
}
function Pn(e, t, a, s) {
  return s ? (e = uc(e, t, a), e = In(e, a, t)) : e = In(e, t, a), e;
}
function uc(e, t, a) {
  return e === t ? a : e === a ? t : e;
}
function In(e, t, a) {
  return e === "start" ? t : e === "end" ? a : e;
}
function hc(e, { inflateAmount: t }, a) {
  e.inflateAmount = t === "auto" ? a === 1 ? 0.33 : 0 : t;
}
class fc extends Ka {
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
  parsePrimitiveData(t, a, s, n) {
    return Fn(t, a, s, n);
  }
  parseArrayData(t, a, s, n) {
    return Fn(t, a, s, n);
  }
  parseObjectData(t, a, s, n) {
    const { iScale: o, vScale: i } = t, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, d = o.axis === "x" ? r : l, u = i.axis === "x" ? r : l, h = [];
    let p, v, f, _;
    for (p = s, v = s + n; p < v; ++p)
      _ = a[p], f = {}, f[o.axis] = o.parse(Ae(_, d), p), h.push(hi(Ae(_, u), f, i, p));
    return h;
  }
  updateRangeFromParsed(t, a, s, n) {
    super.updateRangeFromParsed(t, a, s, n);
    const o = s._custom;
    o && a === this._cachedMeta.vScale && (t.min = Math.min(t.min, o.min), t.max = Math.max(t.max, o.max));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(t) {
    const a = this._cachedMeta, { iScale: s, vScale: n } = a, o = this.getParsed(t), i = o._custom, r = os(i) ? "[" + i.start + ", " + i.end + "]" : "" + n.getLabelForValue(o[n.axis]);
    return {
      label: "" + s.getLabelForValue(o[s.axis]),
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
  updateElements(t, a, s, n) {
    const o = n === "reset", { index: i, _cachedMeta: { vScale: r } } = this, l = r.getBasePixel(), d = r.isHorizontal(), u = this._getRuler(), { sharedOptions: h, includeOptions: p } = this._getSharedOptions(a, n);
    for (let v = a; v < a + s; v++) {
      const f = this.getParsed(v), _ = o || pt(f[r.axis]) ? {
        base: l,
        head: l
      } : this._calculateBarValuePixels(v), b = this._calculateBarIndexPixels(v, u), g = (f._stacks || {})[r.axis], m = {
        horizontal: d,
        base: _.base,
        enableBorderRadius: !g || os(f._custom) || i === g._top || i === g._bottom,
        x: d ? _.head : b.center,
        y: d ? b.center : _.head,
        height: d ? b.size : Math.abs(_.size),
        width: d ? Math.abs(_.size) : b.size
      };
      p && (m.options = h || this.resolveDataElementOptions(v, t[v].active ? "active" : n));
      const $ = m.options || t[v].options;
      dc(m, $, g, i), hc(m, $, u.ratio), this.updateElement(t[v], v, m, n);
    }
  }
  _getStacks(t, a) {
    const { iScale: s } = this._cachedMeta, n = s.getMatchingVisibleMetas(this._type).filter((u) => u.controller.options.grouped), o = s.options.stacked, i = [], r = this._cachedMeta.controller.getParsed(a), l = r && r[s.axis], d = (u) => {
      const h = u._parsed.find((v) => v[s.axis] === l), p = h && h[u.vScale.axis];
      if (pt(p) || isNaN(p))
        return !0;
    };
    for (const u of n)
      if (!(a !== void 0 && d(u)) && ((o === !1 || i.indexOf(u.stack) === -1 || o === void 0 && u.stack === void 0) && i.push(u.stack), u.index === t))
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
    return Object.keys(t).filter((s) => t[s].axis === a).shift();
  }
  _getAxis() {
    const t = {}, a = this.getFirstScaleIdForIndexAxis();
    for (const s of this.chart.data.datasets)
      t[ot(this.chart.options.indexAxis === "x" ? s.xAxisID : s.yAxisID, a)] = !0;
    return Object.keys(t);
  }
  _getStackIndex(t, a, s) {
    const n = this._getStacks(t, s), o = a !== void 0 ? n.indexOf(a) : -1;
    return o === -1 ? n.length - 1 : o;
  }
  _getRuler() {
    const t = this.options, a = this._cachedMeta, s = a.iScale, n = [];
    let o, i;
    for (o = 0, i = a.data.length; o < i; ++o)
      n.push(s.getPixelForValue(this.getParsed(o)[s.axis], o));
    const r = t.barThickness;
    return {
      min: r || nc(a),
      pixels: n,
      start: s._startPixel,
      end: s._endPixel,
      stackCount: this._getStackCount(),
      scale: s,
      grouped: t.grouped,
      ratio: r ? 1 : t.categoryPercentage * t.barPercentage
    };
  }
  _calculateBarValuePixels(t) {
    const { _cachedMeta: { vScale: a, _stacked: s, index: n }, options: { base: o, minBarLength: i } } = this, r = o || 0, l = this.getParsed(t), d = l._custom, u = os(d);
    let h = l[a.axis], p = 0, v = s ? this.applyStack(a, l, s) : h, f, _;
    v !== h && (p = v - h, v = h), u && (h = d.barStart, v = d.barEnd - d.barStart, h !== 0 && Qt(h) !== Qt(d.barEnd) && (p = 0), p += h);
    const b = !pt(o) && !u ? o : p;
    let g = a.getPixelForValue(b);
    if (this.chart.getDataVisibility(t) ? f = a.getPixelForValue(p + v) : f = g, _ = f - g, Math.abs(_) < i) {
      _ = lc(_, a, r) * i, h === r && (g -= _ / 2);
      const m = a.getPixelForDecimal(0), $ = a.getPixelForDecimal(1), k = Math.min(m, $), w = Math.max(m, $);
      g = Math.max(Math.min(g, w), k), f = g + _, s && !u && (l._stacks[a.axis]._visualValues[n] = a.getValueForPixel(f) - a.getValueForPixel(g));
    }
    if (g === a.getPixelForValue(r)) {
      const m = Qt(_) * a.getLineWidthForValue(r) / 2;
      g += m, _ -= m;
    }
    return {
      size: _,
      base: g,
      head: f,
      center: f + _ / 2
    };
  }
  _calculateBarIndexPixels(t, a) {
    const s = a.scale, n = this.options, o = n.skipNull, i = ot(n.maxBarThickness, 1 / 0);
    let r, l;
    const d = this._getAxisCount();
    if (a.grouped) {
      const u = o ? this._getStackCount(t) : a.stackCount, h = n.barThickness === "flex" ? ic(t, a, n, u * d) : oc(t, a, n, u * d), p = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, v = this._getAxis().indexOf(ot(p, this.getFirstScaleIdForIndexAxis())), f = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0) + v;
      r = h.start + h.chunk * f + h.chunk / 2, l = Math.min(i, h.chunk * h.ratio);
    } else
      r = s.getPixelForValue(this.getParsed(t)[s.axis], t), l = Math.min(i, a.min * a.ratio);
    return {
      base: r - l / 2,
      head: r + l / 2,
      center: r,
      size: l
    };
  }
  draw() {
    const t = this._cachedMeta, a = t.vScale, s = t.data, n = s.length;
    let o = 0;
    for (; o < n; ++o)
      this.getParsed(o)[a.axis] !== null && !s[o].hidden && s[o].draw(this._ctx);
  }
}
function gc(e, t, a) {
  let s = 1, n = 1, o = 0, i = 0;
  if (t < _t) {
    const r = e, l = r + t, d = Math.cos(r), u = Math.sin(r), h = Math.cos(l), p = Math.sin(l), v = ($, k, w) => fa($, r, l, !0) ? 1 : Math.max(k, k * a, w, w * a), f = ($, k, w) => fa($, r, l, !0) ? -1 : Math.min(k, k * a, w, w * a), _ = v(0, d, h), b = v(Ct, u, p), g = f(bt, d, h), m = f(bt + Ct, u, p);
    s = (_ - g) / 2, n = (b - m) / 2, o = -(_ + g) / 2, i = -(b + m) / 2;
  }
  return {
    ratioX: s,
    ratioY: n,
    offsetX: o,
    offsetY: i
  };
}
class pc extends Ka {
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
            const a = t.data, { labels: { pointStyle: s, textAlign: n, color: o, useBorderRadius: i, borderRadius: r } } = t.legend.options;
            return a.labels.length && a.datasets.length ? a.labels.map((l, d) => {
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
                pointStyle: s,
                borderRadius: i && (r || h.borderRadius),
                index: d
              };
            }) : [];
          }
        },
        onClick(t, a, s) {
          s.chart.toggleDataVisibility(a.index), s.chart.update();
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
    const s = this.getDataset().data, n = this._cachedMeta;
    if (this._parsing === !1)
      n._parsed = s;
    else {
      let o = (l) => +s[l];
      if (ht(s[t])) {
        const { key: l = "value" } = this._parsing;
        o = (d) => +Ae(s[d], l);
      }
      let i, r;
      for (i = t, r = t + a; i < r; ++i)
        n._parsed[i] = o(i);
    }
  }
  _getRotation() {
    return ne(this.options.rotation - 90);
  }
  _getCircumference() {
    return ne(this.options.circumference);
  }
  _getRotationExtents() {
    let t = _t, a = -_t;
    for (let s = 0; s < this.chart.data.datasets.length; ++s)
      if (this.chart.isDatasetVisible(s) && this.chart.getDatasetMeta(s).type === this._type) {
        const n = this.chart.getDatasetMeta(s).controller, o = n._getRotation(), i = n._getCircumference();
        t = Math.min(t, o), a = Math.max(a, o + i);
      }
    return {
      rotation: t,
      circumference: a - t
    };
  }
  update(t) {
    const a = this.chart, { chartArea: s } = a, n = this._cachedMeta, o = n.data, i = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, r = Math.max((Math.min(s.width, s.height) - i) / 2, 0), l = Math.min(xr(this.options.cutout, r), 1), d = this._getRingWeight(this.index), { circumference: u, rotation: h } = this._getRotationExtents(), { ratioX: p, ratioY: v, offsetX: f, offsetY: _ } = gc(h, u, l), b = (s.width - i) / p, g = (s.height - i) / v, m = Math.max(Math.min(b, g) / 2, 0), $ = Wo(this.options.radius, m), k = Math.max($ * l, 0), w = ($ - k) / this._getVisibleDatasetWeightTotal();
    this.offsetX = f * $, this.offsetY = _ * $, n.total = this.calculateTotal(), this.outerRadius = $ - w * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - w * d, 0), this.updateElements(o, 0, o.length, t);
  }
  _circumference(t, a) {
    const s = this.options, n = this._cachedMeta, o = this._getCircumference();
    return a && s.animation.animateRotate || !this.chart.getDataVisibility(t) || n._parsed[t] === null || n.data[t].hidden ? 0 : this.calculateCircumference(n._parsed[t] * o / _t);
  }
  updateElements(t, a, s, n) {
    const o = n === "reset", i = this.chart, r = i.chartArea, d = i.options.animation, u = (r.left + r.right) / 2, h = (r.top + r.bottom) / 2, p = o && d.animateScale, v = p ? 0 : this.innerRadius, f = p ? 0 : this.outerRadius, { sharedOptions: _, includeOptions: b } = this._getSharedOptions(a, n);
    let g = this._getRotation(), m;
    for (m = 0; m < a; ++m)
      g += this._circumference(m, o);
    for (m = a; m < a + s; ++m) {
      const $ = this._circumference(m, o), k = t[m], w = {
        x: u + this.offsetX,
        y: h + this.offsetY,
        startAngle: g,
        endAngle: g + $,
        circumference: $,
        outerRadius: f,
        innerRadius: v
      };
      b && (w.options = _ || this.resolveDataElementOptions(m, k.active ? "active" : n)), g += $, this.updateElement(k, m, w, n);
    }
  }
  calculateTotal() {
    const t = this._cachedMeta, a = t.data;
    let s = 0, n;
    for (n = 0; n < a.length; n++) {
      const o = t._parsed[n];
      o !== null && !isNaN(o) && this.chart.getDataVisibility(n) && !a[n].hidden && (s += Math.abs(o));
    }
    return s;
  }
  calculateCircumference(t) {
    const a = this._cachedMeta.total;
    return a > 0 && !isNaN(t) ? _t * (Math.abs(t) / a) : 0;
  }
  getLabelAndValue(t) {
    const a = this._cachedMeta, s = this.chart, n = s.data.labels || [], o = Hs(a._parsed[t], s.options.locale);
    return {
      label: n[t] || "",
      value: o
    };
  }
  getMaxBorderWidth(t) {
    let a = 0;
    const s = this.chart;
    let n, o, i, r, l;
    if (!t) {
      for (n = 0, o = s.data.datasets.length; n < o; ++n)
        if (s.isDatasetVisible(n)) {
          i = s.getDatasetMeta(n), t = i.data, r = i.controller;
          break;
        }
    }
    if (!t)
      return 0;
    for (n = 0, o = t.length; n < o; ++n)
      l = r.resolveDataElementOptions(n), l.borderAlign !== "inner" && (a = Math.max(a, l.borderWidth || 0, l.hoverBorderWidth || 0));
    return a;
  }
  getMaxOffset(t) {
    let a = 0;
    for (let s = 0, n = t.length; s < n; ++s) {
      const o = this.resolveDataElementOptions(s);
      a = Math.max(a, o.offset || 0, o.hoverOffset || 0);
    }
    return a;
  }
  _getRingWeightOffset(t) {
    let a = 0;
    for (let s = 0; s < t; ++s)
      this.chart.isDatasetVisible(s) && (a += this._getRingWeight(s));
    return a;
  }
  _getRingWeight(t) {
    return Math.max(ot(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
class vc extends Ka {
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
    const a = this._cachedMeta, { dataset: s, data: n = [], _dataset: o } = a, i = this.chart._animationsDisabled;
    let { start: r, count: l } = Nr(a, n, i);
    this._drawStart = r, this._drawCount = l, Wr(a) && (r = 0, l = n.length), s._chart = this.chart, s._datasetIndex = this.index, s._decimated = !!o._decimated, s.points = n;
    const d = this.resolveDatasetElementOptions(t);
    this.options.showLine || (d.borderWidth = 0), d.segment = this.options.segment, this.updateElement(s, void 0, {
      animated: !i,
      options: d
    }, t), this.updateElements(n, r, l, t);
  }
  updateElements(t, a, s, n) {
    const o = n === "reset", { iScale: i, vScale: r, _stacked: l, _dataset: d } = this._cachedMeta, { sharedOptions: u, includeOptions: h } = this._getSharedOptions(a, n), p = i.axis, v = r.axis, { spanGaps: f, segment: _ } = this.options, b = ha(f) ? f : Number.POSITIVE_INFINITY, g = this.chart._animationsDisabled || o || n === "none", m = a + s, $ = t.length;
    let k = a > 0 && this.getParsed(a - 1);
    for (let w = 0; w < $; ++w) {
      const S = t[w], D = g ? S : {};
      if (w < a || w >= m) {
        D.skip = !0;
        continue;
      }
      const T = this.getParsed(w), O = pt(T[v]), P = D[p] = i.getPixelForValue(T[p], w), B = D[v] = o || O ? r.getBasePixel() : r.getPixelForValue(l ? this.applyStack(r, T, l) : T[v], w);
      D.skip = isNaN(P) || isNaN(B) || O, D.stop = w > 0 && Math.abs(T[p] - k[p]) > b, _ && (D.parsed = T, D.raw = d.data[w]), h && (D.options = u || this.resolveDataElementOptions(w, S.active ? "active" : n)), g || this.updateElement(S, w, D, n), k = T;
    }
  }
  getMaxOverflow() {
    const t = this._cachedMeta, a = t.dataset, s = a.options && a.options.borderWidth || 0, n = t.data || [];
    if (!n.length)
      return s;
    const o = n[0].size(this.resolveDataElementOptions(0)), i = n[n.length - 1].size(this.resolveDataElementOptions(n.length - 1));
    return Math.max(s, o, i) / 2;
  }
  draw() {
    const t = this._cachedMeta;
    t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw();
  }
}
class bc extends pc {
  static id = "pie";
  static defaults = {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: "100%"
  };
}
function we() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class Gs {
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
    Object.assign(Gs.prototype, t);
  }
  options;
  constructor(t) {
    this.options = t || {};
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return we();
  }
  parse() {
    return we();
  }
  format() {
    return we();
  }
  add() {
    return we();
  }
  diff() {
    return we();
  }
  startOf() {
    return we();
  }
  endOf() {
    return we();
  }
}
var mc = {
  _date: Gs
};
function yc(e, t, a, s) {
  const { controller: n, data: o, _sorted: i } = e, r = n._cachedMeta.iScale, l = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (r && t === r.axis && t !== "r" && i && o.length) {
    const d = r._reversePixels ? Er : Ce;
    if (s) {
      if (n._sharedOptions) {
        const u = o[0], h = typeof u.getRange == "function" && u.getRange(t);
        if (h) {
          const p = d(o, t, a - h), v = d(o, t, a + h);
          return {
            lo: p.lo,
            hi: v.hi
          };
        }
      }
    } else {
      const u = d(o, t, a);
      if (l) {
        const { vScale: h } = n._cachedMeta, { _parsed: p } = e, v = p.slice(0, u.lo + 1).reverse().findIndex((_) => !pt(_[h.axis]));
        u.lo -= Math.max(0, v);
        const f = p.slice(u.hi).findIndex((_) => !pt(_[h.axis]));
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
function Ua(e, t, a, s, n) {
  const o = e.getSortedVisibleDatasetMetas(), i = a[t];
  for (let r = 0, l = o.length; r < l; ++r) {
    const { index: d, data: u } = o[r], { lo: h, hi: p } = yc(o[r], t, i, n);
    for (let v = h; v <= p; ++v) {
      const f = u[v];
      f.skip || s(f, d, v);
    }
  }
}
function _c(e) {
  const t = e.indexOf("x") !== -1, a = e.indexOf("y") !== -1;
  return function(s, n) {
    const o = t ? Math.abs(s.x - n.x) : 0, i = a ? Math.abs(s.y - n.y) : 0;
    return Math.sqrt(Math.pow(o, 2) + Math.pow(i, 2));
  };
}
function is(e, t, a, s, n) {
  const o = [];
  return !n && !e.isPointInArea(t) || Ua(e, a, t, function(r, l, d) {
    !n && !ga(r, e.chartArea, 0) || r.inRange(t.x, t.y, s) && o.push({
      element: r,
      datasetIndex: l,
      index: d
    });
  }, !0), o;
}
function xc(e, t, a, s) {
  let n = [];
  function o(i, r, l) {
    const { startAngle: d, endAngle: u } = i.getProps([
      "startAngle",
      "endAngle"
    ], s), { angle: h } = Yo(i, {
      x: t.x,
      y: t.y
    });
    fa(h, d, u) && n.push({
      element: i,
      datasetIndex: r,
      index: l
    });
  }
  return Ua(e, a, t, o), n;
}
function kc(e, t, a, s, n, o) {
  let i = [];
  const r = _c(a);
  let l = Number.POSITIVE_INFINITY;
  function d(u, h, p) {
    const v = u.inRange(t.x, t.y, n);
    if (s && !v)
      return;
    const f = u.getCenterPoint(n);
    if (!(!!o || e.isPointInArea(f)) && !v)
      return;
    const b = r(t, f);
    b < l ? (i = [
      {
        element: u,
        datasetIndex: h,
        index: p
      }
    ], l = b) : b === l && i.push({
      element: u,
      datasetIndex: h,
      index: p
    });
  }
  return Ua(e, a, t, d), i;
}
function rs(e, t, a, s, n, o) {
  return !o && !e.isPointInArea(t) ? [] : a === "r" && !s ? xc(e, t, a, n) : kc(e, t, a, s, n, o);
}
function En(e, t, a, s, n) {
  const o = [], i = a === "x" ? "inXRange" : "inYRange";
  let r = !1;
  return Ua(e, a, t, (l, d, u) => {
    l[i] && l[i](t[a], n) && (o.push({
      element: l,
      datasetIndex: d,
      index: u
    }), r = r || l.inRange(t.x, t.y, n));
  }), s && !r ? [] : o;
}
var wc = {
  modes: {
    index(e, t, a, s) {
      const n = Me(t, e), o = a.axis || "x", i = a.includeInvisible || !1, r = a.intersect ? is(e, n, o, s, i) : rs(e, n, o, !1, s, i), l = [];
      return r.length ? (e.getSortedVisibleDatasetMetas().forEach((d) => {
        const u = r[0].index, h = d.data[u];
        h && !h.skip && l.push({
          element: h,
          datasetIndex: d.index,
          index: u
        });
      }), l) : [];
    },
    dataset(e, t, a, s) {
      const n = Me(t, e), o = a.axis || "xy", i = a.includeInvisible || !1;
      let r = a.intersect ? is(e, n, o, s, i) : rs(e, n, o, !1, s, i);
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
    point(e, t, a, s) {
      const n = Me(t, e), o = a.axis || "xy", i = a.includeInvisible || !1;
      return is(e, n, o, s, i);
    },
    nearest(e, t, a, s) {
      const n = Me(t, e), o = a.axis || "xy", i = a.includeInvisible || !1;
      return rs(e, n, o, a.intersect, s, i);
    },
    x(e, t, a, s) {
      const n = Me(t, e);
      return En(e, n, "x", a.intersect, s);
    },
    y(e, t, a, s) {
      const n = Me(t, e);
      return En(e, n, "y", a.intersect, s);
    }
  }
};
const fi = [
  "left",
  "top",
  "right",
  "bottom"
];
function qe(e, t) {
  return e.filter((a) => a.pos === t);
}
function Rn(e, t) {
  return e.filter((a) => fi.indexOf(a.pos) === -1 && a.box.axis === t);
}
function Xe(e, t) {
  return e.sort((a, s) => {
    const n = t ? s : a, o = t ? a : s;
    return n.weight === o.weight ? n.index - o.index : n.weight - o.weight;
  });
}
function $c(e) {
  const t = [];
  let a, s, n, o, i, r;
  for (a = 0, s = (e || []).length; a < s; ++a)
    n = e[a], { position: o, options: { stack: i, stackWeight: r = 1 } } = n, t.push({
      index: a,
      box: n,
      pos: o,
      horizontal: n.isHorizontal(),
      weight: n.weight,
      stack: i && o + i,
      stackWeight: r
    });
  return t;
}
function Mc(e) {
  const t = {};
  for (const a of e) {
    const { stack: s, pos: n, stackWeight: o } = a;
    if (!s || !fi.includes(n))
      continue;
    const i = t[s] || (t[s] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    i.count++, i.weight += o;
  }
  return t;
}
function Sc(e, t) {
  const a = Mc(e), { vBoxMaxWidth: s, hBoxMaxHeight: n } = t;
  let o, i, r;
  for (o = 0, i = e.length; o < i; ++o) {
    r = e[o];
    const { fullSize: l } = r.box, d = a[r.stack], u = d && r.stackWeight / d.weight;
    r.horizontal ? (r.width = u ? u * s : l && t.availableWidth, r.height = n) : (r.width = s, r.height = u ? u * n : l && t.availableHeight);
  }
  return a;
}
function Cc(e) {
  const t = $c(e), a = Xe(t.filter((d) => d.box.fullSize), !0), s = Xe(qe(t, "left"), !0), n = Xe(qe(t, "right")), o = Xe(qe(t, "top"), !0), i = Xe(qe(t, "bottom")), r = Rn(t, "x"), l = Rn(t, "y");
  return {
    fullSize: a,
    leftAndTop: s.concat(o),
    rightAndBottom: n.concat(l).concat(i).concat(r),
    chartArea: qe(t, "chartArea"),
    vertical: s.concat(n).concat(l),
    horizontal: o.concat(i).concat(r)
  };
}
function On(e, t, a, s) {
  return Math.max(e[a], t[a]) + Math.max(e[s], t[s]);
}
function gi(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function Dc(e, t, a, s) {
  const { pos: n, box: o } = a, i = e.maxPadding;
  if (!ht(n)) {
    a.size && (e[n] -= a.size);
    const h = s[a.stack] || {
      size: 0,
      count: 1
    };
    h.size = Math.max(h.size, a.horizontal ? o.height : o.width), a.size = h.size / h.count, e[n] += a.size;
  }
  o.getPadding && gi(i, o.getPadding());
  const r = Math.max(0, t.outerWidth - On(i, e, "left", "right")), l = Math.max(0, t.outerHeight - On(i, e, "top", "bottom")), d = r !== e.w, u = l !== e.h;
  return e.w = r, e.h = l, a.horizontal ? {
    same: d,
    other: u
  } : {
    same: u,
    other: d
  };
}
function Ac(e) {
  const t = e.maxPadding;
  function a(s) {
    const n = Math.max(t[s] - e[s], 0);
    return e[s] += n, n;
  }
  e.y += a("top"), e.x += a("left"), a("right"), a("bottom");
}
function Tc(e, t) {
  const a = t.maxPadding;
  function s(n) {
    const o = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return n.forEach((i) => {
      o[i] = Math.max(t[i], a[i]);
    }), o;
  }
  return s(e ? [
    "left",
    "right"
  ] : [
    "top",
    "bottom"
  ]);
}
function ea(e, t, a, s) {
  const n = [];
  let o, i, r, l, d, u;
  for (o = 0, i = e.length, d = 0; o < i; ++o) {
    r = e[o], l = r.box, l.update(r.width || t.w, r.height || t.h, Tc(r.horizontal, t));
    const { same: h, other: p } = Dc(t, a, r, s);
    d |= h && n.length, u = u || p, l.fullSize || n.push(r);
  }
  return d && ea(n, t, a, s) || u;
}
function Sa(e, t, a, s, n) {
  e.top = a, e.left = t, e.right = t + s, e.bottom = a + n, e.width = s, e.height = n;
}
function Vn(e, t, a, s) {
  const n = a.padding;
  let { x: o, y: i } = t;
  for (const r of e) {
    const l = r.box, d = s[r.stack] || {
      placed: 0,
      weight: 1
    }, u = r.stackWeight / d.weight || 1;
    if (r.horizontal) {
      const h = t.w * u, p = d.size || l.height;
      ua(d.start) && (i = d.start), l.fullSize ? Sa(l, n.left, i, a.outerWidth - n.right - n.left, p) : Sa(l, t.left + d.placed, i, h, p), d.start = i, d.placed += h, i = l.bottom;
    } else {
      const h = t.h * u, p = d.size || l.width;
      ua(d.start) && (o = d.start), l.fullSize ? Sa(l, o, n.top, p, a.outerHeight - n.bottom - n.top) : Sa(l, o, t.top + d.placed, p, h), d.start = o, d.placed += h, o = l.right;
    }
  }
  t.x = o, t.y = i;
}
var jt = {
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
  update(e, t, a, s) {
    if (!e)
      return;
    const n = Yt(e.options.layout.padding), o = Math.max(t - n.width, 0), i = Math.max(a - n.height, 0), r = Cc(e.boxes), l = r.vertical, d = r.horizontal;
    vt(e.boxes, (_) => {
      typeof _.beforeLayout == "function" && _.beforeLayout();
    });
    const u = l.reduce((_, b) => b.box.options && b.box.options.display === !1 ? _ : _ + 1, 0) || 1, h = Object.freeze({
      outerWidth: t,
      outerHeight: a,
      padding: n,
      availableWidth: o,
      availableHeight: i,
      vBoxMaxWidth: o / 2 / u,
      hBoxMaxHeight: i / 2
    }), p = Object.assign({}, n);
    gi(p, Yt(s));
    const v = Object.assign({
      maxPadding: p,
      w: o,
      h: i,
      x: n.left,
      y: n.top
    }, n), f = Sc(l.concat(d), h);
    ea(r.fullSize, v, h, f), ea(l, v, h, f), ea(d, v, h, f) && ea(l, v, h, f), Ac(v), Vn(r.leftAndTop, v, h, f), v.x += v.w, v.y += v.h, Vn(r.rightAndBottom, v, h, f), e.chartArea = {
      left: v.left,
      top: v.top,
      right: v.left + v.w,
      bottom: v.top + v.h,
      height: v.h,
      width: v.w
    }, vt(r.chartArea, (_) => {
      const b = _.box;
      Object.assign(b, e.chartArea), b.update(v.w, v.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class pi {
  acquireContext(t, a) {
  }
  releaseContext(t) {
    return !1;
  }
  addEventListener(t, a, s) {
  }
  removeEventListener(t, a, s) {
  }
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(t, a, s, n) {
    return a = Math.max(0, a || t.width), s = s || t.height, {
      width: a,
      height: Math.max(0, n ? Math.floor(a / n) : s)
    };
  }
  isAttached(t) {
    return !0;
  }
  updateConfig(t) {
  }
}
class Bc extends pi {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const La = "$chartjs", Lc = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, zn = (e) => e === null || e === "";
function Fc(e, t) {
  const a = e.style, s = e.getAttribute("height"), n = e.getAttribute("width");
  if (e[La] = {
    initial: {
      height: s,
      width: n,
      style: {
        display: a.display,
        height: a.height,
        width: a.width
      }
    }
  }, a.display = a.display || "block", a.boxSizing = a.boxSizing || "border-box", zn(n)) {
    const o = wn(e, "width");
    o !== void 0 && (e.width = o);
  }
  if (zn(s))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const o = wn(e, "height");
      o !== void 0 && (e.height = o);
    }
  return e;
}
const vi = Bl ? {
  passive: !0
} : !1;
function Pc(e, t, a) {
  e && e.addEventListener(t, a, vi);
}
function Ic(e, t, a) {
  e && e.canvas && e.canvas.removeEventListener(t, a, vi);
}
function Ec(e, t) {
  const a = Lc[e.type] || e.type, { x: s, y: n } = Me(e, t);
  return {
    type: a,
    chart: t,
    native: e,
    x: s !== void 0 ? s : null,
    y: n !== void 0 ? n : null
  };
}
function Na(e, t) {
  for (const a of e)
    if (a === t || a.contains(t))
      return !0;
}
function Rc(e, t, a) {
  const s = e.canvas, n = new MutationObserver((o) => {
    let i = !1;
    for (const r of o)
      i = i || Na(r.addedNodes, s), i = i && !Na(r.removedNodes, s);
    i && a();
  });
  return n.observe(document, {
    childList: !0,
    subtree: !0
  }), n;
}
function Oc(e, t, a) {
  const s = e.canvas, n = new MutationObserver((o) => {
    let i = !1;
    for (const r of o)
      i = i || Na(r.removedNodes, s), i = i && !Na(r.addedNodes, s);
    i && a();
  });
  return n.observe(document, {
    childList: !0,
    subtree: !0
  }), n;
}
const va = /* @__PURE__ */ new Map();
let Nn = 0;
function bi() {
  const e = window.devicePixelRatio;
  e !== Nn && (Nn = e, va.forEach((t, a) => {
    a.currentDevicePixelRatio !== e && t();
  }));
}
function Vc(e, t) {
  va.size || window.addEventListener("resize", bi), va.set(e, t);
}
function zc(e) {
  va.delete(e), va.size || window.removeEventListener("resize", bi);
}
function Nc(e, t, a) {
  const s = e.canvas, n = s && Xs(s);
  if (!n)
    return;
  const o = Xo((r, l) => {
    const d = n.clientWidth;
    a(r, l), d < n.clientWidth && a();
  }, window), i = new ResizeObserver((r) => {
    const l = r[0], d = l.contentRect.width, u = l.contentRect.height;
    d === 0 && u === 0 || o(d, u);
  });
  return i.observe(n), Vc(e, o), i;
}
function ls(e, t, a) {
  a && a.disconnect(), t === "resize" && zc(e);
}
function Wc(e, t, a) {
  const s = e.canvas, n = Xo((o) => {
    e.ctx !== null && a(Ec(o, e));
  }, e);
  return Pc(s, t, n), n;
}
class Hc extends pi {
  acquireContext(t, a) {
    const s = t && t.getContext && t.getContext("2d");
    return s && s.canvas === t ? (Fc(t, a), s) : null;
  }
  releaseContext(t) {
    const a = t.canvas;
    if (!a[La])
      return !1;
    const s = a[La].initial;
    [
      "height",
      "width"
    ].forEach((o) => {
      const i = s[o];
      pt(i) ? a.removeAttribute(o) : a.setAttribute(o, i);
    });
    const n = s.style || {};
    return Object.keys(n).forEach((o) => {
      a.style[o] = n[o];
    }), a.width = a.width, delete a[La], !0;
  }
  addEventListener(t, a, s) {
    this.removeEventListener(t, a);
    const n = t.$proxies || (t.$proxies = {}), i = {
      attach: Rc,
      detach: Oc,
      resize: Nc
    }[a] || Wc;
    n[a] = i(t, a, s);
  }
  removeEventListener(t, a) {
    const s = t.$proxies || (t.$proxies = {}), n = s[a];
    if (!n)
      return;
    ({
      attach: ls,
      detach: ls,
      resize: ls
    }[a] || Ic)(t, a, n), s[a] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, a, s, n) {
    return Tl(t, a, s, n);
  }
  isAttached(t) {
    const a = t && Xs(t);
    return !!(a && a.isConnected);
  }
}
function jc(e) {
  return !qs() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? Bc : Hc;
}
let le = class {
  static defaults = {};
  static defaultRoutes = void 0;
  x;
  y;
  active = !1;
  options;
  $animations;
  tooltipPosition(t) {
    const { x: a, y: s } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: a,
      y: s
    };
  }
  hasValue() {
    return ha(this.x) && ha(this.y);
  }
  getProps(t, a) {
    const s = this.$animations;
    if (!a || !s)
      return this;
    const n = {};
    return t.forEach((o) => {
      n[o] = s[o] && s[o].active() ? s[o]._to : this[o];
    }), n;
  }
};
function Yc(e, t) {
  const a = e.options.ticks, s = Kc(e), n = Math.min(a.maxTicksLimit || s, s), o = a.major.enabled ? qc(t) : [], i = o.length, r = o[0], l = o[i - 1], d = [];
  if (i > n)
    return Xc(t, d, o, i / n), d;
  const u = Uc(o, t, n);
  if (i > 0) {
    let h, p;
    const v = i > 1 ? Math.round((l - r) / (i - 1)) : null;
    for (Ca(t, d, u, pt(v) ? 0 : r - v, r), h = 0, p = i - 1; h < p; h++)
      Ca(t, d, u, o[h], o[h + 1]);
    return Ca(t, d, u, l, pt(v) ? t.length : l + v), d;
  }
  return Ca(t, d, u), d;
}
function Kc(e) {
  const t = e.options.offset, a = e._tickSize(), s = e._length / a + (t ? 0 : 1), n = e._maxLength / a;
  return Math.floor(Math.min(s, n));
}
function Uc(e, t, a) {
  const s = Gc(e), n = t.length / a;
  if (!s)
    return Math.max(n, 1);
  const o = Ar(s);
  for (let i = 0, r = o.length - 1; i < r; i++) {
    const l = o[i];
    if (l > n)
      return l;
  }
  return Math.max(n, 1);
}
function qc(e) {
  const t = [];
  let a, s;
  for (a = 0, s = e.length; a < s; a++)
    e[a].major && t.push(a);
  return t;
}
function Xc(e, t, a, s) {
  let n = 0, o = a[0], i;
  for (s = Math.ceil(s), i = 0; i < e.length; i++)
    i === o && (t.push(e[i]), n++, o = a[n * s]);
}
function Ca(e, t, a, s, n) {
  const o = ot(s, 0), i = Math.min(ot(n, e.length), e.length);
  let r = 0, l, d, u;
  for (a = Math.ceil(a), n && (l = n - s, a = l / Math.floor(l / a)), u = o; u < 0; )
    r++, u = Math.round(o + r * a);
  for (d = Math.max(o, 0); d < i; d++)
    d === u && (t.push(e[d]), r++, u = Math.round(o + r * a));
}
function Gc(e) {
  const t = e.length;
  let a, s;
  if (t < 2)
    return !1;
  for (s = e[0], a = 1; a < t; ++a)
    if (e[a] - e[a - 1] !== s)
      return !1;
  return s;
}
const Zc = (e) => e === "left" ? "right" : e === "right" ? "left" : e, Wn = (e, t, a) => t === "top" || t === "left" ? e[t] + a : e[t] - a, Hn = (e, t) => Math.min(t || e, e);
function jn(e, t) {
  const a = [], s = e.length / t, n = e.length;
  let o = 0;
  for (; o < n; o += s)
    a.push(e[Math.floor(o)]);
  return a;
}
function Qc(e, t, a) {
  const s = e.ticks.length, n = Math.min(t, s - 1), o = e._startPixel, i = e._endPixel, r = 1e-6;
  let l = e.getPixelForTick(n), d;
  if (!(a && (s === 1 ? d = Math.max(l - o, i - l) : t === 0 ? d = (e.getPixelForTick(1) - l) / 2 : d = (l - e.getPixelForTick(n - 1)) / 2, l += n < t ? d : -d, l < o - r || l > i + r)))
    return l;
}
function Jc(e, t) {
  vt(e, (a) => {
    const s = a.gc, n = s.length / 2;
    let o;
    if (n > t) {
      for (o = 0; o < n; ++o)
        delete a.data[s[o]];
      s.splice(0, n);
    }
  });
}
function Ge(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function Yn(e, t) {
  if (!e.display)
    return 0;
  const a = Bt(e.font, t), s = Yt(e.padding);
  return (Mt(e.text) ? e.text.length : 1) * a.lineHeight + s.height;
}
function td(e, t) {
  return Be(e, {
    scale: t,
    type: "scale"
  });
}
function ed(e, t, a) {
  return Be(e, {
    tick: a,
    index: t,
    type: "tick"
  });
}
function ad(e, t, a) {
  let s = Ns(e);
  return (a && t !== "right" || !a && t === "right") && (s = Zc(s)), s;
}
function sd(e, t, a, s) {
  const { top: n, left: o, bottom: i, right: r, chart: l } = e, { chartArea: d, scales: u } = l;
  let h = 0, p, v, f;
  const _ = i - n, b = r - o;
  if (e.isHorizontal()) {
    if (v = Dt(s, o, r), ht(a)) {
      const g = Object.keys(a)[0], m = a[g];
      f = u[g].getPixelForValue(m) + _ - t;
    } else a === "center" ? f = (d.bottom + d.top) / 2 + _ - t : f = Wn(e, a, t);
    p = r - o;
  } else {
    if (ht(a)) {
      const g = Object.keys(a)[0], m = a[g];
      v = u[g].getPixelForValue(m) - b + t;
    } else a === "center" ? v = (d.left + d.right) / 2 - b + t : v = Wn(e, a, t);
    f = Dt(s, i, n), h = a === "left" ? -Ct : Ct;
  }
  return {
    titleX: v,
    titleY: f,
    maxWidth: p,
    rotation: h
  };
}
class He extends le {
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
    let { _userMin: t, _userMax: a, _suggestedMin: s, _suggestedMax: n } = this;
    return t = Xt(t, Number.POSITIVE_INFINITY), a = Xt(a, Number.NEGATIVE_INFINITY), s = Xt(s, Number.POSITIVE_INFINITY), n = Xt(n, Number.NEGATIVE_INFINITY), {
      min: Xt(t, s),
      max: Xt(a, n),
      minDefined: Lt(t),
      maxDefined: Lt(a)
    };
  }
  getMinMax(t) {
    let { min: a, max: s, minDefined: n, maxDefined: o } = this.getUserBounds(), i;
    if (n && o)
      return {
        min: a,
        max: s
      };
    const r = this.getMatchingVisibleMetas();
    for (let l = 0, d = r.length; l < d; ++l)
      i = r[l].controller.getMinMax(this, t), n || (a = Math.min(a, i.min)), o || (s = Math.max(s, i.max));
    return a = o && a > s ? s : a, s = n && a > s ? a : s, {
      min: Xt(a, Xt(s, a)),
      max: Xt(s, Xt(a, s))
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
    yt(this.options.beforeUpdate, [
      this
    ]);
  }
  update(t, a, s) {
    const { beginAtZero: n, grace: o, ticks: i } = this.options, r = i.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = a, this._margins = s = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, s), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + s.left + s.right : this.height + s.top + s.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = ll(this, o, n), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const l = r < this.ticks.length;
    this._convertTicksToLabels(l ? jn(this.ticks, r) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), i.display && (i.autoSkip || i.source === "auto") && (this.ticks = Yc(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), l && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, a, s;
    this.isHorizontal() ? (a = this.left, s = this.right) : (a = this.top, s = this.bottom, t = !t), this._startPixel = a, this._endPixel = s, this._reversePixels = t, this._length = s - a, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    yt(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    yt(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    yt(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), yt(this.options[t], [
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
    yt(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const a = this.options.ticks;
    let s, n, o;
    for (s = 0, n = t.length; s < n; s++)
      o = t[s], o.label = yt(a.callback, [
        o.value,
        s,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    yt(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    yt(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, a = t.ticks, s = Hn(this.ticks.length, t.ticks.maxTicksLimit), n = a.minRotation || 0, o = a.maxRotation;
    let i = n, r, l, d;
    if (!this._isVisible() || !a.display || n >= o || s <= 1 || !this.isHorizontal()) {
      this.labelRotation = n;
      return;
    }
    const u = this._getLabelSizes(), h = u.widest.width, p = u.highest.height, v = Tt(this.chart.width - h, 0, this.maxWidth);
    r = t.offset ? this.maxWidth / s : v / (s - 1), h + 6 > r && (r = v / (s - (t.offset ? 0.5 : 1)), l = this.maxHeight - Ge(t.grid) - a.padding - Yn(t.title, this.chart.options.font), d = Math.sqrt(h * h + p * p), i = Fr(Math.min(Math.asin(Tt((u.highest.height + 6) / r, -1, 1)), Math.asin(Tt(l / d, -1, 1)) - Math.asin(Tt(p / d, -1, 1)))), i = Math.max(n, Math.min(o, i))), this.labelRotation = i;
  }
  afterCalculateLabelRotation() {
    yt(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    yt(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: a, options: { ticks: s, title: n, grid: o } } = this, i = this._isVisible(), r = this.isHorizontal();
    if (i) {
      const l = Yn(n, a.options.font);
      if (r ? (t.width = this.maxWidth, t.height = Ge(o) + l) : (t.height = this.maxHeight, t.width = Ge(o) + l), s.display && this.ticks.length) {
        const { first: d, last: u, widest: h, highest: p } = this._getLabelSizes(), v = s.padding * 2, f = ne(this.labelRotation), _ = Math.cos(f), b = Math.sin(f);
        if (r) {
          const g = s.mirror ? 0 : b * h.width + _ * p.height;
          t.height = Math.min(this.maxHeight, t.height + g + v);
        } else {
          const g = s.mirror ? 0 : _ * h.width + b * p.height;
          t.width = Math.min(this.maxWidth, t.width + g + v);
        }
        this._calculatePadding(d, u, b, _);
      }
    }
    this._handleMargins(), r ? (this.width = this._length = a.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = a.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, a, s, n) {
    const { ticks: { align: o, padding: i }, position: r } = this.options, l = this.labelRotation !== 0, d = r !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const u = this.getPixelForTick(0) - this.left, h = this.right - this.getPixelForTick(this.ticks.length - 1);
      let p = 0, v = 0;
      l ? d ? (p = n * t.width, v = s * a.height) : (p = s * t.height, v = n * a.width) : o === "start" ? v = a.width : o === "end" ? p = t.width : o !== "inner" && (p = t.width / 2, v = a.width / 2), this.paddingLeft = Math.max((p - u + i) * this.width / (this.width - u), 0), this.paddingRight = Math.max((v - h + i) * this.width / (this.width - h), 0);
    } else {
      let u = a.height / 2, h = t.height / 2;
      o === "start" ? (u = 0, h = t.height) : o === "end" && (u = a.height, h = 0), this.paddingTop = u + i, this.paddingBottom = h + i;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    yt(this.options.afterFit, [
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
    let a, s;
    for (a = 0, s = t.length; a < s; a++)
      pt(t[a].label) && (t.splice(a, 1), s--, a--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const a = this.options.ticks.sampleSize;
      let s = this.ticks;
      a < s.length && (s = jn(s, a)), this._labelSizes = t = this._computeLabelSizes(s, s.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, a, s) {
    const { ctx: n, _longestTextCache: o } = this, i = [], r = [], l = Math.floor(a / Hn(a, s));
    let d = 0, u = 0, h, p, v, f, _, b, g, m, $, k, w;
    for (h = 0; h < a; h += l) {
      if (f = t[h].label, _ = this._resolveTickFontOptions(h), n.font = b = _.string, g = o[b] = o[b] || {
        data: {},
        gc: []
      }, m = _.lineHeight, $ = k = 0, !pt(f) && !Mt(f))
        $ = mn(n, g.data, g.gc, $, f), k = m;
      else if (Mt(f))
        for (p = 0, v = f.length; p < v; ++p)
          w = f[p], !pt(w) && !Mt(w) && ($ = mn(n, g.data, g.gc, $, w), k += m);
      i.push($), r.push(k), d = Math.max($, d), u = Math.max(k, u);
    }
    Jc(o, a);
    const S = i.indexOf(d), D = r.indexOf(u), T = (O) => ({
      width: i[O] || 0,
      height: r[O] || 0
    });
    return {
      first: T(0),
      last: T(a - 1),
      widest: T(S),
      highest: T(D),
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
    return Ir(this._alignToPixels ? ke(this.chart, a, 0) : a);
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
      const s = a[t];
      return s.$context || (s.$context = ed(this.getContext(), t, s));
    }
    return this.$context || (this.$context = td(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, a = ne(this.labelRotation), s = Math.abs(Math.cos(a)), n = Math.abs(Math.sin(a)), o = this._getLabelSizes(), i = t.autoSkipPadding || 0, r = o ? o.widest.width + i : 0, l = o ? o.highest.height + i : 0;
    return this.isHorizontal() ? l * s > r * n ? r / s : l / n : l * n < r * s ? l / s : r / n;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const a = this.axis, s = this.chart, n = this.options, { grid: o, position: i, border: r } = n, l = o.offset, d = this.isHorizontal(), h = this.ticks.length + (l ? 1 : 0), p = Ge(o), v = [], f = r.setContext(this.getContext()), _ = f.display ? f.width : 0, b = _ / 2, g = function(V) {
      return ke(s, V, _);
    };
    let m, $, k, w, S, D, T, O, P, B, R, H;
    if (i === "top")
      m = g(this.bottom), D = this.bottom - p, O = m - b, B = g(t.top) + b, H = t.bottom;
    else if (i === "bottom")
      m = g(this.top), B = t.top, H = g(t.bottom) - b, D = m + b, O = this.top + p;
    else if (i === "left")
      m = g(this.right), S = this.right - p, T = m - b, P = g(t.left) + b, R = t.right;
    else if (i === "right")
      m = g(this.left), P = t.left, R = g(t.right) - b, S = m + b, T = this.left + p;
    else if (a === "x") {
      if (i === "center")
        m = g((t.top + t.bottom) / 2 + 0.5);
      else if (ht(i)) {
        const V = Object.keys(i)[0], W = i[V];
        m = g(this.chart.scales[V].getPixelForValue(W));
      }
      B = t.top, H = t.bottom, D = m + b, O = D + p;
    } else if (a === "y") {
      if (i === "center")
        m = g((t.left + t.right) / 2);
      else if (ht(i)) {
        const V = Object.keys(i)[0], W = i[V];
        m = g(this.chart.scales[V].getPixelForValue(W));
      }
      S = m - b, T = S - p, P = t.left, R = t.right;
    }
    const L = ot(n.ticks.maxTicksLimit, h), I = Math.max(1, Math.ceil(h / L));
    for ($ = 0; $ < h; $ += I) {
      const V = this.getContext($), W = o.setContext(V), N = r.setContext(V), j = W.lineWidth, K = W.color, nt = N.dash || [], et = N.dashOffset, G = W.tickWidth, dt = W.tickColor, wt = W.tickBorderDash || [], gt = W.tickBorderDashOffset;
      k = Qc(this, $, l), k !== void 0 && (w = ke(s, k, j), d ? S = T = P = R = w : D = O = B = H = w, v.push({
        tx1: S,
        ty1: D,
        tx2: T,
        ty2: O,
        x1: P,
        y1: B,
        x2: R,
        y2: H,
        width: j,
        color: K,
        borderDash: nt,
        borderDashOffset: et,
        tickWidth: G,
        tickColor: dt,
        tickBorderDash: wt,
        tickBorderDashOffset: gt
      }));
    }
    return this._ticksLength = h, this._borderValue = m, v;
  }
  _computeLabelItems(t) {
    const a = this.axis, s = this.options, { position: n, ticks: o } = s, i = this.isHorizontal(), r = this.ticks, { align: l, crossAlign: d, padding: u, mirror: h } = o, p = Ge(s.grid), v = p + u, f = h ? -u : v, _ = -ne(this.labelRotation), b = [];
    let g, m, $, k, w, S, D, T, O, P, B, R, H = "middle";
    if (n === "top")
      S = this.bottom - f, D = this._getXAxisLabelAlignment();
    else if (n === "bottom")
      S = this.top + f, D = this._getXAxisLabelAlignment();
    else if (n === "left") {
      const I = this._getYAxisLabelAlignment(p);
      D = I.textAlign, w = I.x;
    } else if (n === "right") {
      const I = this._getYAxisLabelAlignment(p);
      D = I.textAlign, w = I.x;
    } else if (a === "x") {
      if (n === "center")
        S = (t.top + t.bottom) / 2 + v;
      else if (ht(n)) {
        const I = Object.keys(n)[0], V = n[I];
        S = this.chart.scales[I].getPixelForValue(V) + v;
      }
      D = this._getXAxisLabelAlignment();
    } else if (a === "y") {
      if (n === "center")
        w = (t.left + t.right) / 2 - v;
      else if (ht(n)) {
        const I = Object.keys(n)[0], V = n[I];
        w = this.chart.scales[I].getPixelForValue(V);
      }
      D = this._getYAxisLabelAlignment(p).textAlign;
    }
    a === "y" && (l === "start" ? H = "top" : l === "end" && (H = "bottom"));
    const L = this._getLabelSizes();
    for (g = 0, m = r.length; g < m; ++g) {
      $ = r[g], k = $.label;
      const I = o.setContext(this.getContext(g));
      T = this.getPixelForTick(g) + o.labelOffset, O = this._resolveTickFontOptions(g), P = O.lineHeight, B = Mt(k) ? k.length : 1;
      const V = B / 2, W = I.color, N = I.textStrokeColor, j = I.textStrokeWidth;
      let K = D;
      i ? (w = T, D === "inner" && (g === m - 1 ? K = this.options.reverse ? "left" : "right" : g === 0 ? K = this.options.reverse ? "right" : "left" : K = "center"), n === "top" ? d === "near" || _ !== 0 ? R = -B * P + P / 2 : d === "center" ? R = -L.highest.height / 2 - V * P + P : R = -L.highest.height + P / 2 : d === "near" || _ !== 0 ? R = P / 2 : d === "center" ? R = L.highest.height / 2 - V * P : R = L.highest.height - B * P, h && (R *= -1), _ !== 0 && !I.showLabelBackdrop && (w += P / 2 * Math.sin(_))) : (S = T, R = (1 - B) * P / 2);
      let nt;
      if (I.showLabelBackdrop) {
        const et = Yt(I.backdropPadding), G = L.heights[g], dt = L.widths[g];
        let wt = R - et.top, gt = 0 - et.left;
        switch (H) {
          case "middle":
            wt -= G / 2;
            break;
          case "bottom":
            wt -= G;
            break;
        }
        switch (D) {
          case "center":
            gt -= dt / 2;
            break;
          case "right":
            gt -= dt;
            break;
          case "inner":
            g === m - 1 ? gt -= dt : g > 0 && (gt -= dt / 2);
            break;
        }
        nt = {
          left: gt,
          top: wt,
          width: dt + et.width,
          height: G + et.height,
          color: I.backdropColor
        };
      }
      b.push({
        label: k,
        font: O,
        textOffset: R,
        options: {
          rotation: _,
          color: W,
          strokeColor: N,
          strokeWidth: j,
          textAlign: K,
          textBaseline: H,
          translation: [
            w,
            S
          ],
          backdrop: nt
        }
      });
    }
    return b;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: a } = this.options;
    if (-ne(this.labelRotation))
      return t === "top" ? "left" : "right";
    let n = "center";
    return a.align === "start" ? n = "left" : a.align === "end" ? n = "right" : a.align === "inner" && (n = "inner"), n;
  }
  _getYAxisLabelAlignment(t) {
    const { position: a, ticks: { crossAlign: s, mirror: n, padding: o } } = this.options, i = this._getLabelSizes(), r = t + o, l = i.widest.width;
    let d, u;
    return a === "left" ? n ? (u = this.right + o, s === "near" ? d = "left" : s === "center" ? (d = "center", u += l / 2) : (d = "right", u += l)) : (u = this.right - r, s === "near" ? d = "right" : s === "center" ? (d = "center", u -= l / 2) : (d = "left", u = this.left)) : a === "right" ? n ? (u = this.left + o, s === "near" ? d = "right" : s === "center" ? (d = "center", u -= l / 2) : (d = "left", u -= l)) : (u = this.left + r, s === "near" ? d = "left" : s === "center" ? (d = "center", u += l / 2) : (d = "right", u = this.right)) : d = "right", {
      textAlign: d,
      x: u
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
    const { ctx: t, options: { backgroundColor: a }, left: s, top: n, width: o, height: i } = this;
    a && (t.save(), t.fillStyle = a, t.fillRect(s, n, o, i), t.restore());
  }
  getLineWidthForValue(t) {
    const a = this.options.grid;
    if (!this._isVisible() || !a.display)
      return 0;
    const n = this.ticks.findIndex((o) => o.value === t);
    return n >= 0 ? a.setContext(this.getContext(n)).lineWidth : 0;
  }
  drawGrid(t) {
    const a = this.options.grid, s = this.ctx, n = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
    let o, i;
    const r = (l, d, u) => {
      !u.width || !u.color || (s.save(), s.lineWidth = u.width, s.strokeStyle = u.color, s.setLineDash(u.borderDash || []), s.lineDashOffset = u.borderDashOffset, s.beginPath(), s.moveTo(l.x, l.y), s.lineTo(d.x, d.y), s.stroke(), s.restore());
    };
    if (a.display)
      for (o = 0, i = n.length; o < i; ++o) {
        const l = n[o];
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
    const { chart: t, ctx: a, options: { border: s, grid: n } } = this, o = s.setContext(this.getContext()), i = s.display ? o.width : 0;
    if (!i)
      return;
    const r = n.setContext(this.getContext(0)).lineWidth, l = this._borderValue;
    let d, u, h, p;
    this.isHorizontal() ? (d = ke(t, this.left, i) - i / 2, u = ke(t, this.right, r) + r / 2, h = p = l) : (h = ke(t, this.top, i) - i / 2, p = ke(t, this.bottom, r) + r / 2, d = u = l), a.save(), a.lineWidth = o.width, a.strokeStyle = o.color, a.beginPath(), a.moveTo(d, h), a.lineTo(u, p), a.stroke(), a.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const s = this.ctx, n = this._computeLabelArea();
    n && Ha(s, n);
    const o = this.getLabelItems(t);
    for (const i of o) {
      const r = i.options, l = i.font, d = i.label, u = i.textOffset;
      pa(s, d, 0, u, l, r);
    }
    n && ja(s);
  }
  drawTitle() {
    const { ctx: t, options: { position: a, title: s, reverse: n } } = this;
    if (!s.display)
      return;
    const o = Bt(s.font), i = Yt(s.padding), r = s.align;
    let l = o.lineHeight / 2;
    a === "bottom" || a === "center" || ht(a) ? (l += i.bottom, Mt(s.text) && (l += o.lineHeight * (s.text.length - 1))) : l += i.top;
    const { titleX: d, titleY: u, maxWidth: h, rotation: p } = sd(this, l, a, r);
    pa(t, s.text, 0, 0, o, {
      color: s.color,
      maxWidth: h,
      rotation: p,
      textAlign: ad(r, a, n),
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
    const t = this.options, a = t.ticks && t.ticks.z || 0, s = ot(t.grid && t.grid.z, -1), n = ot(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== He.prototype.draw ? [
      {
        z: a,
        draw: (o) => {
          this.draw(o);
        }
      }
    ] : [
      {
        z: s,
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
        z: a,
        draw: (o) => {
          this.drawLabels(o);
        }
      }
    ];
  }
  getMatchingVisibleMetas(t) {
    const a = this.chart.getSortedVisibleDatasetMetas(), s = this.axis + "AxisID", n = [];
    let o, i;
    for (o = 0, i = a.length; o < i; ++o) {
      const r = a[o];
      r[s] === this.id && (!t || r.type === t) && n.push(r);
    }
    return n;
  }
  _resolveTickFontOptions(t) {
    const a = this.options.ticks.setContext(this.getContext(t));
    return Bt(a.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class Da {
  constructor(t, a, s) {
    this.type = t, this.scope = a, this.override = s, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const a = Object.getPrototypeOf(t);
    let s;
    id(a) && (s = this.register(a));
    const n = this.items, o = t.id, i = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + t);
    return o in n || (n[o] = t, nd(t, i, s), this.override && $t.override(t.id, t.overrides)), i;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const a = this.items, s = t.id, n = this.scope;
    s in a && delete a[s], n && s in $t[n] && (delete $t[n][s], this.override && delete Te[s]);
  }
}
function nd(e, t, a) {
  const s = da(/* @__PURE__ */ Object.create(null), [
    a ? $t.get(a) : {},
    $t.get(t),
    e.defaults
  ]);
  $t.set(t, s), e.defaultRoutes && od(t, e.defaultRoutes), e.descriptors && $t.describe(t, e.descriptors);
}
function od(e, t) {
  Object.keys(t).forEach((a) => {
    const s = a.split("."), n = s.pop(), o = [
      e
    ].concat(s).join("."), i = t[a].split("."), r = i.pop(), l = i.join(".");
    $t.route(o, n, l, r);
  });
}
function id(e) {
  return "id" in e && "defaults" in e;
}
class rd {
  constructor() {
    this.controllers = new Da(Ka, "datasets", !0), this.elements = new Da(le, "elements"), this.plugins = new Da(Object, "plugins"), this.scales = new Da(He, "scales"), this._typedRegistries = [
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
  _each(t, a, s) {
    [
      ...a
    ].forEach((n) => {
      const o = s || this._getRegistryForType(n);
      s || o.isForType(n) || o === this.plugins && n.id ? this._exec(t, o, n) : vt(n, (i) => {
        const r = s || this._getRegistryForType(i);
        this._exec(t, r, i);
      });
    });
  }
  _exec(t, a, s) {
    const n = Vs(t);
    yt(s["before" + n], [], s), a[t](s), yt(s["after" + n], [], s);
  }
  _getRegistryForType(t) {
    for (let a = 0; a < this._typedRegistries.length; a++) {
      const s = this._typedRegistries[a];
      if (s.isForType(t))
        return s;
    }
    return this.plugins;
  }
  _get(t, a, s) {
    const n = a.get(t);
    if (n === void 0)
      throw new Error('"' + t + '" is not a registered ' + s + ".");
    return n;
  }
}
var Zt = /* @__PURE__ */ new rd();
class ld {
  constructor() {
    this._init = void 0;
  }
  notify(t, a, s, n) {
    if (a === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install")), this._init === void 0)
      return;
    const o = n ? this._descriptors(t).filter(n) : this._descriptors(t), i = this._notify(o, t, a, s);
    return a === "afterDestroy" && (this._notify(o, t, "stop"), this._notify(this._init, t, "uninstall"), this._init = void 0), i;
  }
  _notify(t, a, s, n) {
    n = n || {};
    for (const o of t) {
      const i = o.plugin, r = i[s], l = [
        a,
        n,
        o.options
      ];
      if (yt(r, l, i) === !1 && n.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    pt(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const a = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), a;
  }
  _createDescriptors(t, a) {
    const s = t && t.config, n = ot(s.options && s.options.plugins, {}), o = cd(s);
    return n === !1 && !a ? [] : ud(t, o, n, a);
  }
  _notifyStateChanges(t) {
    const a = this._oldCache || [], s = this._cache, n = (o, i) => o.filter((r) => !i.some((l) => r.plugin.id === l.plugin.id));
    this._notify(n(a, s), t, "stop"), this._notify(n(s, a), t, "start");
  }
}
function cd(e) {
  const t = {}, a = [], s = Object.keys(Zt.plugins.items);
  for (let o = 0; o < s.length; o++)
    a.push(Zt.getPlugin(s[o]));
  const n = e.plugins || [];
  for (let o = 0; o < n.length; o++) {
    const i = n[o];
    a.indexOf(i) === -1 && (a.push(i), t[i.id] = !0);
  }
  return {
    plugins: a,
    localIds: t
  };
}
function dd(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function ud(e, { plugins: t, localIds: a }, s, n) {
  const o = [], i = e.getContext();
  for (const r of t) {
    const l = r.id, d = dd(s[l], n);
    d !== null && o.push({
      plugin: r,
      options: hd(e.config, {
        plugin: r,
        local: a[l]
      }, d, i)
    });
  }
  return o;
}
function hd(e, { plugin: t, local: a }, s, n) {
  const o = e.pluginScopeKeys(t), i = e.getOptionScopes(s, o);
  return a && t.defaults && i.push(t.defaults), e.createResolver(i, n, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Ts(e, t) {
  const a = $t.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || a.indexAxis || "x";
}
function fd(e, t) {
  let a = e;
  return e === "_index_" ? a = t : e === "_value_" && (a = t === "x" ? "y" : "x"), a;
}
function gd(e, t) {
  return e === t ? "_index_" : "_value_";
}
function Kn(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function pd(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function Bs(e, ...t) {
  if (Kn(e))
    return e;
  for (const a of t) {
    const s = a.axis || pd(a.position) || e.length > 1 && Kn(e[0].toLowerCase());
    if (s)
      return s;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function Un(e, t, a) {
  if (a[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function vd(e, t) {
  if (t.data && t.data.datasets) {
    const a = t.data.datasets.filter((s) => s.xAxisID === e || s.yAxisID === e);
    if (a.length)
      return Un(e, "x", a[0]) || Un(e, "y", a[0]);
  }
  return {};
}
function bd(e, t) {
  const a = Te[e.type] || {
    scales: {}
  }, s = t.scales || {}, n = Ts(e.type, t), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(s).forEach((i) => {
    const r = s[i];
    if (!ht(r))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (r._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const l = Bs(i, r, vd(i, e), $t.scales[r.type]), d = gd(l, n), u = a.scales || {};
    o[i] = sa(/* @__PURE__ */ Object.create(null), [
      {
        axis: l
      },
      r,
      u[l],
      u[d]
    ]);
  }), e.data.datasets.forEach((i) => {
    const r = i.type || e.type, l = i.indexAxis || Ts(r, t), u = (Te[r] || {}).scales || {};
    Object.keys(u).forEach((h) => {
      const p = fd(h, l), v = i[p + "AxisID"] || p;
      o[v] = o[v] || /* @__PURE__ */ Object.create(null), sa(o[v], [
        {
          axis: p
        },
        s[v],
        u[h]
      ]);
    });
  }), Object.keys(o).forEach((i) => {
    const r = o[i];
    sa(r, [
      $t.scales[r.type],
      $t.scale
    ]);
  }), o;
}
function mi(e) {
  const t = e.options || (e.options = {});
  t.plugins = ot(t.plugins, {}), t.scales = bd(e, t);
}
function yi(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function md(e) {
  return e = e || {}, e.data = yi(e.data), mi(e), e;
}
const qn = /* @__PURE__ */ new Map(), _i = /* @__PURE__ */ new Set();
function Aa(e, t) {
  let a = qn.get(e);
  return a || (a = t(), qn.set(e, a), _i.add(a)), a;
}
const Ze = (e, t, a) => {
  const s = Ae(t, a);
  s !== void 0 && e.add(s);
};
class yd {
  constructor(t) {
    this._config = md(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = yi(t);
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
    return Aa(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, a) {
    return Aa(`${t}.transition.${a}`, () => [
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
    return Aa(`${t}-${a}`, () => [
      [
        `datasets.${t}.elements.${a}`,
        `datasets.${t}`,
        `elements.${a}`,
        ""
      ]
    ]);
  }
  pluginScopeKeys(t) {
    const a = t.id, s = this.type;
    return Aa(`${s}-plugin-${a}`, () => [
      [
        `plugins.${a}`,
        ...t.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(t, a) {
    const s = this._scopeCache;
    let n = s.get(t);
    return (!n || a) && (n = /* @__PURE__ */ new Map(), s.set(t, n)), n;
  }
  getOptionScopes(t, a, s) {
    const { options: n, type: o } = this, i = this._cachedScopes(t, s), r = i.get(a);
    if (r)
      return r;
    const l = /* @__PURE__ */ new Set();
    a.forEach((u) => {
      t && (l.add(t), u.forEach((h) => Ze(l, t, h))), u.forEach((h) => Ze(l, n, h)), u.forEach((h) => Ze(l, Te[o] || {}, h)), u.forEach((h) => Ze(l, $t, h)), u.forEach((h) => Ze(l, Ds, h));
    });
    const d = Array.from(l);
    return d.length === 0 && d.push(/* @__PURE__ */ Object.create(null)), _i.has(a) && i.set(a, d), d;
  }
  chartOptionScopes() {
    const { options: t, type: a } = this;
    return [
      t,
      Te[a] || {},
      $t.datasets[a] || {},
      {
        type: a
      },
      $t,
      Ds
    ];
  }
  resolveNamedOptions(t, a, s, n = [
    ""
  ]) {
    const o = {
      $shared: !0
    }, { resolver: i, subPrefixes: r } = Xn(this._resolverCache, t, n);
    let l = i;
    if (xd(i, a)) {
      o.$shared = !1, s = be(s) ? s() : s;
      const d = this.createResolver(t, s, r);
      l = ze(i, s, d);
    }
    for (const d of a)
      o[d] = l[d];
    return o;
  }
  createResolver(t, a, s = [
    ""
  ], n) {
    const { resolver: o } = Xn(this._resolverCache, t, s);
    return ht(a) ? ze(o, a, void 0, n) : o;
  }
}
function Xn(e, t, a) {
  let s = e.get(t);
  s || (s = /* @__PURE__ */ new Map(), e.set(t, s));
  const n = a.join();
  let o = s.get(n);
  return o || (o = {
    resolver: Ys(t, a),
    subPrefixes: a.filter((r) => !r.toLowerCase().includes("hover"))
  }, s.set(n, o)), o;
}
const _d = (e) => ht(e) && Object.getOwnPropertyNames(e).some((t) => be(e[t]));
function xd(e, t) {
  const { isScriptable: a, isIndexable: s } = Jo(e);
  for (const n of t) {
    const o = a(n), i = s(n), r = (i || o) && e[n];
    if (o && (be(r) || _d(r)) || i && Mt(r))
      return !0;
  }
  return !1;
}
var kd = "4.5.1";
const wd = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function Gn(e, t) {
  return e === "top" || e === "bottom" || wd.indexOf(e) === -1 && t === "x";
}
function Zn(e, t) {
  return function(a, s) {
    return a[e] === s[e] ? a[t] - s[t] : a[e] - s[e];
  };
}
function Qn(e) {
  const t = e.chart, a = t.options.animation;
  t.notifyPlugins("afterRender"), yt(a && a.onComplete, [
    e
  ], t);
}
function $d(e) {
  const t = e.chart, a = t.options.animation;
  yt(a && a.onProgress, [
    e
  ], t);
}
function xi(e) {
  return qs() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const Fa = {}, Jn = (e) => {
  const t = xi(e);
  return Object.values(Fa).filter((a) => a.canvas === t).pop();
};
function Md(e, t, a) {
  const s = Object.keys(e);
  for (const n of s) {
    const o = +n;
    if (o >= t) {
      const i = e[n];
      delete e[n], (a > 0 || o > t) && (e[o + a] = i);
    }
  }
}
function Sd(e, t, a, s) {
  return !a || e.type === "mouseout" ? null : s ? t : e;
}
let je = class {
  static defaults = $t;
  static instances = Fa;
  static overrides = Te;
  static registry = Zt;
  static version = kd;
  static getChart = Jn;
  static register(...t) {
    Zt.add(...t), to();
  }
  static unregister(...t) {
    Zt.remove(...t), to();
  }
  constructor(t, a) {
    const s = this.config = new yd(a), n = xi(t), o = Jn(n);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const i = s.createResolver(s.chartOptionScopes(), this.getContext());
    this.platform = new (s.platform || jc(n))(), this.platform.updateConfig(s);
    const r = this.platform.acquireContext(n, i.aspectRatio), l = r && r.canvas, d = l && l.height, u = l && l.width;
    if (this.id = _r(), this.ctx = r, this.canvas = l, this.width = u, this.height = d, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new ld(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = Vr((h) => this.update(h), i.resizeDelay || 0), this._dataChanges = [], Fa[this.id] = this, !r || !l) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    ee.listen(this, "complete", Qn), ee.listen(this, "progress", $d), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: a }, width: s, height: n, _aspectRatio: o } = this;
    return pt(t) ? a && o ? o : n ? s / n : null : t;
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
    return Zt;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : kn(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return yn(this.canvas, this.ctx), this;
  }
  stop() {
    return ee.stop(this), this;
  }
  resize(t, a) {
    ee.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: a
    } : this._resize(t, a);
  }
  _resize(t, a) {
    const s = this.options, n = this.canvas, o = s.maintainAspectRatio && this.aspectRatio, i = this.platform.getMaximumSize(n, t, a, o), r = s.devicePixelRatio || this.platform.getDevicePixelRatio(), l = this.width ? "resize" : "attach";
    this.width = i.width, this.height = i.height, this._aspectRatio = this.aspectRatio, kn(this, r, !0) && (this.notifyPlugins("resize", {
      size: i
    }), yt(s.onResize, [
      this,
      i
    ], this), this.attached && this._doResize(l) && this.render());
  }
  ensureScalesHaveIDs() {
    const a = this.options.scales || {};
    vt(a, (s, n) => {
      s.id = n;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, a = t.scales, s = this.scales, n = Object.keys(s).reduce((i, r) => (i[r] = !1, i), {});
    let o = [];
    a && (o = o.concat(Object.keys(a).map((i) => {
      const r = a[i], l = Bs(i, r), d = l === "r", u = l === "x";
      return {
        options: r,
        dposition: d ? "chartArea" : u ? "bottom" : "left",
        dtype: d ? "radialLinear" : u ? "category" : "linear"
      };
    }))), vt(o, (i) => {
      const r = i.options, l = r.id, d = Bs(l, r), u = ot(r.type, i.dtype);
      (r.position === void 0 || Gn(r.position, d) !== Gn(i.dposition)) && (r.position = i.dposition), n[l] = !0;
      let h = null;
      if (l in s && s[l].type === u)
        h = s[l];
      else {
        const p = Zt.getScale(u);
        h = new p({
          id: l,
          type: u,
          ctx: this.ctx,
          chart: this
        }), s[h.id] = h;
      }
      h.init(r, t);
    }), vt(n, (i, r) => {
      i || delete s[r];
    }), vt(s, (i) => {
      jt.configure(this, i, i.options), jt.addBox(this, i);
    });
  }
  _updateMetasets() {
    const t = this._metasets, a = this.data.datasets.length, s = t.length;
    if (t.sort((n, o) => n.index - o.index), s > a) {
      for (let n = a; n < s; ++n)
        this._destroyDatasetMeta(n);
      t.splice(a, s - a);
    }
    this._sortedMetasets = t.slice(0).sort(Zn("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: t, data: { datasets: a } } = this;
    t.length > a.length && delete this._stacks, t.forEach((s, n) => {
      a.filter((o) => o === s._dataset).length === 0 && this._destroyDatasetMeta(n);
    });
  }
  buildOrUpdateControllers() {
    const t = [], a = this.data.datasets;
    let s, n;
    for (this._removeUnreferencedMetasets(), s = 0, n = a.length; s < n; s++) {
      const o = a[s];
      let i = this.getDatasetMeta(s);
      const r = o.type || this.config.type;
      if (i.type && i.type !== r && (this._destroyDatasetMeta(s), i = this.getDatasetMeta(s)), i.type = r, i.indexAxis = o.indexAxis || Ts(r, this.options), i.order = o.order || 0, i.index = s, i.label = "" + o.label, i.visible = this.isDatasetVisible(s), i.controller)
        i.controller.updateIndex(s), i.controller.linkScales();
      else {
        const l = Zt.getController(r), { datasetElementType: d, dataElementType: u } = $t.datasets[r];
        Object.assign(l, {
          dataElementType: Zt.getElement(u),
          datasetElementType: d && Zt.getElement(d)
        }), i.controller = new l(this, s), t.push(i.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    vt(this.data.datasets, (t, a) => {
      this.getDatasetMeta(a).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(t) {
    const a = this.config;
    a.update();
    const s = this._options = a.createResolver(a.chartOptionScopes(), this.getContext()), n = this._animationsDisabled = !s.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
      mode: t,
      cancelable: !0
    }) === !1)
      return;
    const o = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let i = 0;
    for (let d = 0, u = this.data.datasets.length; d < u; d++) {
      const { controller: h } = this.getDatasetMeta(d), p = !n && o.indexOf(h) === -1;
      h.buildOrUpdateElements(p), i = Math.max(+h.getMaxOverflow(), i);
    }
    i = this._minPadding = s.layout.autoPadding ? i : 0, this._updateLayout(i), n || vt(o, (d) => {
      d.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(Zn("z", "_idx"));
    const { _active: r, _lastEvent: l } = this;
    l ? this._eventHandler(l, !0) : r.length && this._updateHoverStyles(r, r, !0), this.render();
  }
  _updateScales() {
    vt(this.scales, (t) => {
      jt.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, a = new Set(Object.keys(this._listeners)), s = new Set(t.events);
    (!cn(a, s) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, a = this._getUniformDataChanges() || [];
    for (const { method: s, start: n, count: o } of a) {
      const i = s === "_removeElements" ? -o : o;
      Md(t, n, i);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const a = this.data.datasets.length, s = (o) => new Set(t.filter((i) => i[0] === o).map((i, r) => r + "," + i.splice(1).join(","))), n = s(0);
    for (let o = 1; o < a; o++)
      if (!cn(n, s(o)))
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
    jt.update(this, this.width, this.height, t);
    const a = this.chartArea, s = a.width <= 0 || a.height <= 0;
    this._layers = [], vt(this.boxes, (n) => {
      s && n.position === "chartArea" || (n.configure && n.configure(), this._layers.push(...n._layers()));
    }, this), this._layers.forEach((n, o) => {
      n._idx = o;
    }), this.notifyPlugins("afterLayout");
  }
  _updateDatasets(t) {
    if (this.notifyPlugins("beforeDatasetsUpdate", {
      mode: t,
      cancelable: !0
    }) !== !1) {
      for (let a = 0, s = this.data.datasets.length; a < s; ++a)
        this.getDatasetMeta(a).controller.configure();
      for (let a = 0, s = this.data.datasets.length; a < s; ++a)
        this._updateDataset(a, be(t) ? t({
          datasetIndex: a
        }) : t);
      this.notifyPlugins("afterDatasetsUpdate", {
        mode: t
      });
    }
  }
  _updateDataset(t, a) {
    const s = this.getDatasetMeta(t), n = {
      meta: s,
      index: t,
      mode: a,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetUpdate", n) !== !1 && (s.controller._update(a), n.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", n));
  }
  render() {
    this.notifyPlugins("beforeRender", {
      cancelable: !0
    }) !== !1 && (ee.has(this) ? this.attached && !ee.running(this) && ee.start(this) : (this.draw(), Qn({
      chart: this
    })));
  }
  draw() {
    let t;
    if (this._resizeBeforeDraw) {
      const { width: s, height: n } = this._resizeBeforeDraw;
      this._resizeBeforeDraw = null, this._resize(s, n);
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
    const a = this._sortedMetasets, s = [];
    let n, o;
    for (n = 0, o = a.length; n < o; ++n) {
      const i = a[n];
      (!t || i.visible) && s.push(i);
    }
    return s;
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
    const a = this.ctx, s = {
      meta: t,
      index: t.index,
      cancelable: !0
    }, n = ci(this, t);
    this.notifyPlugins("beforeDatasetDraw", s) !== !1 && (n && Ha(a, n), t.controller.draw(), n && ja(a), s.cancelable = !1, this.notifyPlugins("afterDatasetDraw", s));
  }
  isPointInArea(t) {
    return ga(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, a, s, n) {
    const o = wc.modes[a];
    return typeof o == "function" ? o(this, t, s, n) : [];
  }
  getDatasetMeta(t) {
    const a = this.data.datasets[t], s = this._metasets;
    let n = s.filter((o) => o && o._dataset === a).pop();
    return n || (n = {
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
    }, s.push(n)), n;
  }
  getContext() {
    return this.$context || (this.$context = Be(null, {
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
    const s = this.getDatasetMeta(t);
    return typeof s.hidden == "boolean" ? !s.hidden : !a.hidden;
  }
  setDatasetVisibility(t, a) {
    const s = this.getDatasetMeta(t);
    s.hidden = !a;
  }
  toggleDataVisibility(t) {
    this._hiddenIndices[t] = !this._hiddenIndices[t];
  }
  getDataVisibility(t) {
    return !this._hiddenIndices[t];
  }
  _updateVisibility(t, a, s) {
    const n = s ? "show" : "hide", o = this.getDatasetMeta(t), i = o.controller._resolveAnimations(void 0, n);
    ua(a) ? (o.data[a].hidden = !s, this.update()) : (this.setDatasetVisibility(t, s), i.update(o, {
      visible: s
    }), this.update((r) => r.datasetIndex === t ? n : void 0));
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
    for (this.stop(), ee.remove(this), t = 0, a = this.data.datasets.length; t < a; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: a } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), yn(t, a), this.platform.releaseContext(a), this.canvas = null, this.ctx = null), delete Fa[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const t = this._listeners, a = this.platform, s = (o, i) => {
      a.addEventListener(this, o, i), t[o] = i;
    }, n = (o, i, r) => {
      o.offsetX = i, o.offsetY = r, this._eventHandler(o);
    };
    vt(this.options.events, (o) => s(o, n));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, a = this.platform, s = (l, d) => {
      a.addEventListener(this, l, d), t[l] = d;
    }, n = (l, d) => {
      t[l] && (a.removeEventListener(this, l, d), delete t[l]);
    }, o = (l, d) => {
      this.canvas && this.resize(l, d);
    };
    let i;
    const r = () => {
      n("attach", r), this.attached = !0, this.resize(), s("resize", o), s("detach", i);
    };
    i = () => {
      this.attached = !1, n("resize", o), this._stop(), this._resize(0, 0), s("attach", r);
    }, a.isAttached(this.canvas) ? r() : i();
  }
  unbindEvents() {
    vt(this._listeners, (t, a) => {
      this.platform.removeEventListener(this, a, t);
    }), this._listeners = {}, vt(this._responsiveListeners, (t, a) => {
      this.platform.removeEventListener(this, a, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, a, s) {
    const n = s ? "set" : "remove";
    let o, i, r, l;
    for (a === "dataset" && (o = this.getDatasetMeta(t[0].datasetIndex), o.controller["_" + n + "DatasetHoverStyle"]()), r = 0, l = t.length; r < l; ++r) {
      i = t[r];
      const d = i && this.getDatasetMeta(i.datasetIndex).controller;
      d && d[n + "HoverStyle"](i.element, i.datasetIndex, i.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const a = this._active || [], s = t.map(({ datasetIndex: o, index: i }) => {
      const r = this.getDatasetMeta(o);
      if (!r)
        throw new Error("No dataset found at index " + o);
      return {
        datasetIndex: o,
        element: r.data[i],
        index: i
      };
    });
    !Ea(s, a) && (this._active = s, this._lastEvent = null, this._updateHoverStyles(s, a));
  }
  notifyPlugins(t, a, s) {
    return this._plugins.notify(this, t, a, s);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((a) => a.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, a, s) {
    const n = this.options.hover, o = (l, d) => l.filter((u) => !d.some((h) => u.datasetIndex === h.datasetIndex && u.index === h.index)), i = o(a, t), r = s ? t : o(t, a);
    i.length && this.updateHoverStyle(i, n.mode, !1), r.length && n.mode && this.updateHoverStyle(r, n.mode, !0);
  }
  _eventHandler(t, a) {
    const s = {
      event: t,
      replay: a,
      cancelable: !0,
      inChartArea: this.isPointInArea(t)
    }, n = (i) => (i.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", s, n) === !1)
      return;
    const o = this._handleEvent(t, a, s.inChartArea);
    return s.cancelable = !1, this.notifyPlugins("afterEvent", s, n), (o || s.changed) && this.render(), this;
  }
  _handleEvent(t, a, s) {
    const { _active: n = [], options: o } = this, i = a, r = this._getActiveElements(t, n, s, i), l = Sr(t), d = Sd(t, this._lastEvent, s, l);
    s && (this._lastEvent = null, yt(o.onHover, [
      t,
      r,
      this
    ], this), l && yt(o.onClick, [
      t,
      r,
      this
    ], this));
    const u = !Ea(r, n);
    return (u || a) && (this._active = r, this._updateHoverStyles(r, n, a)), this._lastEvent = d, u;
  }
  _getActiveElements(t, a, s, n) {
    if (t.type === "mouseout")
      return [];
    if (!s)
      return a;
    const o = this.options.hover;
    return this.getElementsAtEventForMode(t, o.mode, o, n);
  }
};
function to() {
  return vt(je.instances, (e) => e._plugins.invalidate());
}
function Cd(e, t, a) {
  const { startAngle: s, x: n, y: o, outerRadius: i, innerRadius: r, options: l } = t, { borderWidth: d, borderJoinStyle: u } = l, h = Math.min(d / i, Wt(s - a));
  if (e.beginPath(), e.arc(n, o, i - d / 2, s + h / 2, a - h / 2), r > 0) {
    const p = Math.min(d / r, Wt(s - a));
    e.arc(n, o, r + d / 2, a - p / 2, s + p / 2, !0);
  } else {
    const p = Math.min(d / 2, i * Wt(s - a));
    if (u === "round")
      e.arc(n, o, p, a - bt / 2, s + bt / 2, !0);
    else if (u === "bevel") {
      const v = 2 * p * p, f = -v * Math.cos(a + bt / 2) + n, _ = -v * Math.sin(a + bt / 2) + o, b = v * Math.cos(s + bt / 2) + n, g = v * Math.sin(s + bt / 2) + o;
      e.lineTo(f, _), e.lineTo(b, g);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function Dd(e, t, a) {
  const { startAngle: s, pixelMargin: n, x: o, y: i, outerRadius: r, innerRadius: l } = t;
  let d = n / r;
  e.beginPath(), e.arc(o, i, r, s - d, a + d), l > n ? (d = n / l, e.arc(o, i, l, a + d, s - d, !0)) : e.arc(o, i, n, a + Ct, s - Ct), e.closePath(), e.clip();
}
function Ad(e) {
  return js(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function Td(e, t, a, s) {
  const n = Ad(e.options.borderRadius), o = (a - t) / 2, i = Math.min(o, s * t / 2), r = (l) => {
    const d = (a - Math.min(o, l)) * s / 2;
    return Tt(l, 0, Math.min(o, d));
  };
  return {
    outerStart: r(n.outerStart),
    outerEnd: r(n.outerEnd),
    innerStart: Tt(n.innerStart, 0, i),
    innerEnd: Tt(n.innerEnd, 0, i)
  };
}
function Pe(e, t, a, s) {
  return {
    x: a + e * Math.cos(t),
    y: s + e * Math.sin(t)
  };
}
function Wa(e, t, a, s, n, o) {
  const { x: i, y: r, startAngle: l, pixelMargin: d, innerRadius: u } = t, h = Math.max(t.outerRadius + s + a - d, 0), p = u > 0 ? u + s + a + d : 0;
  let v = 0;
  const f = n - l;
  if (s) {
    const I = u > 0 ? u - s : 0, V = h > 0 ? h - s : 0, W = (I + V) / 2, N = W !== 0 ? f * W / (W + s) : f;
    v = (f - N) / 2;
  }
  const _ = Math.max(1e-3, f * h - a / bt) / h, b = (f - _) / 2, g = l + b + v, m = n - b - v, { outerStart: $, outerEnd: k, innerStart: w, innerEnd: S } = Td(t, p, h, m - g), D = h - $, T = h - k, O = g + $ / D, P = m - k / T, B = p + w, R = p + S, H = g + w / B, L = m - S / R;
  if (e.beginPath(), o) {
    const I = (O + P) / 2;
    if (e.arc(i, r, h, O, I), e.arc(i, r, h, I, P), k > 0) {
      const j = Pe(T, P, i, r);
      e.arc(j.x, j.y, k, P, m + Ct);
    }
    const V = Pe(R, m, i, r);
    if (e.lineTo(V.x, V.y), S > 0) {
      const j = Pe(R, L, i, r);
      e.arc(j.x, j.y, S, m + Ct, L + Math.PI);
    }
    const W = (m - S / p + (g + w / p)) / 2;
    if (e.arc(i, r, p, m - S / p, W, !0), e.arc(i, r, p, W, g + w / p, !0), w > 0) {
      const j = Pe(B, H, i, r);
      e.arc(j.x, j.y, w, H + Math.PI, g - Ct);
    }
    const N = Pe(D, g, i, r);
    if (e.lineTo(N.x, N.y), $ > 0) {
      const j = Pe(D, O, i, r);
      e.arc(j.x, j.y, $, g - Ct, O);
    }
  } else {
    e.moveTo(i, r);
    const I = Math.cos(O) * h + i, V = Math.sin(O) * h + r;
    e.lineTo(I, V);
    const W = Math.cos(P) * h + i, N = Math.sin(P) * h + r;
    e.lineTo(W, N);
  }
  e.closePath();
}
function Bd(e, t, a, s, n) {
  const { fullCircles: o, startAngle: i, circumference: r } = t;
  let l = t.endAngle;
  if (o) {
    Wa(e, t, a, s, l, n);
    for (let d = 0; d < o; ++d)
      e.fill();
    isNaN(r) || (l = i + (r % _t || _t));
  }
  return Wa(e, t, a, s, l, n), e.fill(), l;
}
function Ld(e, t, a, s, n) {
  const { fullCircles: o, startAngle: i, circumference: r, options: l } = t, { borderWidth: d, borderJoinStyle: u, borderDash: h, borderDashOffset: p, borderRadius: v } = l, f = l.borderAlign === "inner";
  if (!d)
    return;
  e.setLineDash(h || []), e.lineDashOffset = p, f ? (e.lineWidth = d * 2, e.lineJoin = u || "round") : (e.lineWidth = d, e.lineJoin = u || "bevel");
  let _ = t.endAngle;
  if (o) {
    Wa(e, t, a, s, _, n);
    for (let b = 0; b < o; ++b)
      e.stroke();
    isNaN(r) || (_ = i + (r % _t || _t));
  }
  f && Dd(e, t, _), l.selfJoin && _ - i >= bt && v === 0 && u !== "miter" && Cd(e, t, _), o || (Wa(e, t, a, s, _, n), e.stroke());
}
class Fd extends le {
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
  inRange(t, a, s) {
    const n = this.getProps([
      "x",
      "y"
    ], s), { angle: o, distance: i } = Yo(n, {
      x: t,
      y: a
    }), { startAngle: r, endAngle: l, innerRadius: d, outerRadius: u, circumference: h } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], s), p = (this.options.spacing + this.options.borderWidth) / 2, v = ot(h, l - r), f = fa(o, r, l) && r !== l, _ = v >= _t || f, b = oe(i, d + p, u + p);
    return _ && b;
  }
  getCenterPoint(t) {
    const { x: a, y: s, startAngle: n, endAngle: o, innerRadius: i, outerRadius: r } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], t), { offset: l, spacing: d } = this.options, u = (n + o) / 2, h = (i + r + d + l) / 2;
    return {
      x: a + Math.cos(u) * h,
      y: s + Math.sin(u) * h
    };
  }
  tooltipPosition(t) {
    return this.getCenterPoint(t);
  }
  draw(t) {
    const { options: a, circumference: s } = this, n = (a.offset || 0) / 4, o = (a.spacing || 0) / 2, i = a.circular;
    if (this.pixelMargin = a.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = s > _t ? Math.floor(s / _t) : 0, s === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const r = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(r) * n, Math.sin(r) * n);
    const l = 1 - Math.sin(Math.min(bt, s || 0)), d = n * l;
    t.fillStyle = a.backgroundColor, t.strokeStyle = a.borderColor, Bd(t, this, d, o, i), Ld(t, this, d, o, i), t.restore();
  }
}
function ki(e, t, a = t) {
  e.lineCap = ot(a.borderCapStyle, t.borderCapStyle), e.setLineDash(ot(a.borderDash, t.borderDash)), e.lineDashOffset = ot(a.borderDashOffset, t.borderDashOffset), e.lineJoin = ot(a.borderJoinStyle, t.borderJoinStyle), e.lineWidth = ot(a.borderWidth, t.borderWidth), e.strokeStyle = ot(a.borderColor, t.borderColor);
}
function Pd(e, t, a) {
  e.lineTo(a.x, a.y);
}
function Id(e) {
  return e.stepped ? Jr : e.tension || e.cubicInterpolationMode === "monotone" ? tl : Pd;
}
function wi(e, t, a = {}) {
  const s = e.length, { start: n = 0, end: o = s - 1 } = a, { start: i, end: r } = t, l = Math.max(n, i), d = Math.min(o, r), u = n < i && o < i || n > r && o > r;
  return {
    count: s,
    start: l,
    loop: t.loop,
    ilen: d < l && !u ? s + d - l : d - l
  };
}
function Ed(e, t, a, s) {
  const { points: n, options: o } = t, { count: i, start: r, loop: l, ilen: d } = wi(n, a, s), u = Id(o);
  let { move: h = !0, reverse: p } = s || {}, v, f, _;
  for (v = 0; v <= d; ++v)
    f = n[(r + (p ? d - v : v)) % i], !f.skip && (h ? (e.moveTo(f.x, f.y), h = !1) : u(e, _, f, p, o.stepped), _ = f);
  return l && (f = n[(r + (p ? d : 0)) % i], u(e, _, f, p, o.stepped)), !!l;
}
function Rd(e, t, a, s) {
  const n = t.points, { count: o, start: i, ilen: r } = wi(n, a, s), { move: l = !0, reverse: d } = s || {};
  let u = 0, h = 0, p, v, f, _, b, g;
  const m = (k) => (i + (d ? r - k : k)) % o, $ = () => {
    _ !== b && (e.lineTo(u, b), e.lineTo(u, _), e.lineTo(u, g));
  };
  for (l && (v = n[m(0)], e.moveTo(v.x, v.y)), p = 0; p <= r; ++p) {
    if (v = n[m(p)], v.skip)
      continue;
    const k = v.x, w = v.y, S = k | 0;
    S === f ? (w < _ ? _ = w : w > b && (b = w), u = (h * u + k) / ++h) : ($(), e.lineTo(k, w), f = S, h = 0, _ = b = w), g = w;
  }
  $();
}
function Ls(e) {
  const t = e.options, a = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !a ? Rd : Ed;
}
function Od(e) {
  return e.stepped ? Ll : e.tension || e.cubicInterpolationMode === "monotone" ? Fl : Se;
}
function Vd(e, t, a, s) {
  let n = t._path;
  n || (n = t._path = new Path2D(), t.path(n, a, s) && n.closePath()), ki(e, t.options), e.stroke(n);
}
function zd(e, t, a, s) {
  const { segments: n, options: o } = t, i = Ls(t);
  for (const r of n)
    ki(e, o, r.style), e.beginPath(), i(e, t, r, {
      start: a,
      end: a + s - 1
    }) && e.closePath(), e.stroke();
}
const Nd = typeof Path2D == "function";
function Wd(e, t, a, s) {
  Nd && !t.options.segment ? Vd(e, t, a, s) : zd(e, t, a, s);
}
class qa extends le {
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
    const s = this.options;
    if ((s.tension || s.cubicInterpolationMode === "monotone") && !s.stepped && !this._pointsUpdated) {
      const n = s.spanGaps ? this._loop : this._fullLoop;
      $l(this._points, s, t, n, a), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = Vl(this, this.options.segment));
  }
  first() {
    const t = this.segments, a = this.points;
    return t.length && a[t[0].start];
  }
  last() {
    const t = this.segments, a = this.points, s = t.length;
    return s && a[t[s - 1].end];
  }
  interpolate(t, a) {
    const s = this.options, n = t[a], o = this.points, i = li(this, {
      property: a,
      start: n,
      end: n
    });
    if (!i.length)
      return;
    const r = [], l = Od(s);
    let d, u;
    for (d = 0, u = i.length; d < u; ++d) {
      const { start: h, end: p } = i[d], v = o[h], f = o[p];
      if (v === f) {
        r.push(v);
        continue;
      }
      const _ = Math.abs((n - v[a]) / (f[a] - v[a])), b = l(v, f, _, s.stepped);
      b[a] = t[a], r.push(b);
    }
    return r.length === 1 ? r[0] : r;
  }
  pathSegment(t, a, s) {
    return Ls(this)(t, this, a, s);
  }
  path(t, a, s) {
    const n = this.segments, o = Ls(this);
    let i = this._loop;
    a = a || 0, s = s || this.points.length - a;
    for (const r of n)
      i &= o(t, this, r, {
        start: a,
        end: a + s - 1
      });
    return !!i;
  }
  draw(t, a, s, n) {
    const o = this.options || {};
    (this.points || []).length && o.borderWidth && (t.save(), Wd(t, this, s, n), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function eo(e, t, a, s) {
  const n = e.options, { [a]: o } = e.getProps([
    a
  ], s);
  return Math.abs(t - o) < n.radius + n.hitRadius;
}
class Hd extends le {
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
  inRange(t, a, s) {
    const n = this.options, { x: o, y: i } = this.getProps([
      "x",
      "y"
    ], s);
    return Math.pow(t - o, 2) + Math.pow(a - i, 2) < Math.pow(n.hitRadius + n.radius, 2);
  }
  inXRange(t, a) {
    return eo(this, t, "x", a);
  }
  inYRange(t, a) {
    return eo(this, t, "y", a);
  }
  getCenterPoint(t) {
    const { x: a, y: s } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: a,
      y: s
    };
  }
  size(t) {
    t = t || this.options || {};
    let a = t.radius || 0;
    a = Math.max(a, a && t.hoverRadius || 0);
    const s = a && t.borderWidth || 0;
    return (a + s) * 2;
  }
  draw(t, a) {
    const s = this.options;
    this.skip || s.radius < 0.1 || !ga(this, a, this.size(s) / 2) || (t.strokeStyle = s.borderColor, t.lineWidth = s.borderWidth, t.fillStyle = s.backgroundColor, As(t, s, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function $i(e, t) {
  const { x: a, y: s, base: n, width: o, height: i } = e.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let r, l, d, u, h;
  return e.horizontal ? (h = i / 2, r = Math.min(a, n), l = Math.max(a, n), d = s - h, u = s + h) : (h = o / 2, r = a - h, l = a + h, d = Math.min(s, n), u = Math.max(s, n)), {
    left: r,
    top: d,
    right: l,
    bottom: u
  };
}
function pe(e, t, a, s) {
  return e ? 0 : Tt(t, a, s);
}
function jd(e, t, a) {
  const s = e.options.borderWidth, n = e.borderSkipped, o = Qo(s);
  return {
    t: pe(n.top, o.top, 0, a),
    r: pe(n.right, o.right, 0, t),
    b: pe(n.bottom, o.bottom, 0, a),
    l: pe(n.left, o.left, 0, t)
  };
}
function Yd(e, t, a) {
  const { enableBorderRadius: s } = e.getProps([
    "enableBorderRadius"
  ]), n = e.options.borderRadius, o = Oe(n), i = Math.min(t, a), r = e.borderSkipped, l = s || ht(n);
  return {
    topLeft: pe(!l || r.top || r.left, o.topLeft, 0, i),
    topRight: pe(!l || r.top || r.right, o.topRight, 0, i),
    bottomLeft: pe(!l || r.bottom || r.left, o.bottomLeft, 0, i),
    bottomRight: pe(!l || r.bottom || r.right, o.bottomRight, 0, i)
  };
}
function Kd(e) {
  const t = $i(e), a = t.right - t.left, s = t.bottom - t.top, n = jd(e, a / 2, s / 2), o = Yd(e, a / 2, s / 2);
  return {
    outer: {
      x: t.left,
      y: t.top,
      w: a,
      h: s,
      radius: o
    },
    inner: {
      x: t.left + n.l,
      y: t.top + n.t,
      w: a - n.l - n.r,
      h: s - n.t - n.b,
      radius: {
        topLeft: Math.max(0, o.topLeft - Math.max(n.t, n.l)),
        topRight: Math.max(0, o.topRight - Math.max(n.t, n.r)),
        bottomLeft: Math.max(0, o.bottomLeft - Math.max(n.b, n.l)),
        bottomRight: Math.max(0, o.bottomRight - Math.max(n.b, n.r))
      }
    }
  };
}
function cs(e, t, a, s) {
  const n = t === null, o = a === null, r = e && !(n && o) && $i(e, s);
  return r && (n || oe(t, r.left, r.right)) && (o || oe(a, r.top, r.bottom));
}
function Ud(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function qd(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function ds(e, t, a = {}) {
  const s = e.x !== a.x ? -t : 0, n = e.y !== a.y ? -t : 0, o = (e.x + e.w !== a.x + a.w ? t : 0) - s, i = (e.y + e.h !== a.y + a.h ? t : 0) - n;
  return {
    x: e.x + s,
    y: e.y + n,
    w: e.w + o,
    h: e.h + i,
    radius: e.radius
  };
}
class Xd extends le {
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
    const { inflateAmount: a, options: { borderColor: s, backgroundColor: n } } = this, { inner: o, outer: i } = Kd(this), r = Ud(i.radius) ? Va : qd;
    t.save(), (i.w !== o.w || i.h !== o.h) && (t.beginPath(), r(t, ds(i, a, o)), t.clip(), r(t, ds(o, -a, i)), t.fillStyle = s, t.fill("evenodd")), t.beginPath(), r(t, ds(o, a)), t.fillStyle = n, t.fill(), t.restore();
  }
  inRange(t, a, s) {
    return cs(this, t, a, s);
  }
  inXRange(t, a) {
    return cs(this, t, null, a);
  }
  inYRange(t, a) {
    return cs(this, null, t, a);
  }
  getCenterPoint(t) {
    const { x: a, y: s, base: n, horizontal: o } = this.getProps([
      "x",
      "y",
      "base",
      "horizontal"
    ], t);
    return {
      x: o ? (a + n) / 2 : a,
      y: o ? s : (s + n) / 2
    };
  }
  getRange(t) {
    return t === "x" ? this.width / 2 : this.height / 2;
  }
}
function Gd(e, t, a) {
  const s = e.segments, n = e.points, o = t.points, i = [];
  for (const r of s) {
    let { start: l, end: d } = r;
    d = Xa(l, d, n);
    const u = Fs(a, n[l], n[d], r.loop);
    if (!t.segments) {
      i.push({
        source: r,
        target: u,
        start: n[l],
        end: n[d]
      });
      continue;
    }
    const h = li(t, u);
    for (const p of h) {
      const v = Fs(a, o[p.start], o[p.end], p.loop), f = ri(r, n, v);
      for (const _ of f)
        i.push({
          source: _,
          target: p,
          start: {
            [a]: ao(u, v, "start", Math.max)
          },
          end: {
            [a]: ao(u, v, "end", Math.min)
          }
        });
    }
  }
  return i;
}
function Fs(e, t, a, s) {
  if (s)
    return;
  let n = t[e], o = a[e];
  return e === "angle" && (n = Wt(n), o = Wt(o)), {
    property: e,
    start: n,
    end: o
  };
}
function Zd(e, t) {
  const { x: a = null, y: s = null } = e || {}, n = t.points, o = [];
  return t.segments.forEach(({ start: i, end: r }) => {
    r = Xa(i, r, n);
    const l = n[i], d = n[r];
    s !== null ? (o.push({
      x: l.x,
      y: s
    }), o.push({
      x: d.x,
      y: s
    })) : a !== null && (o.push({
      x: a,
      y: l.y
    }), o.push({
      x: a,
      y: d.y
    }));
  }), o;
}
function Xa(e, t, a) {
  for (; t > e; t--) {
    const s = a[t];
    if (!isNaN(s.x) && !isNaN(s.y))
      break;
  }
  return t;
}
function ao(e, t, a, s) {
  return e && t ? s(e[a], t[a]) : e ? e[a] : t ? t[a] : 0;
}
function Mi(e, t) {
  let a = [], s = !1;
  return Mt(e) ? (s = !0, a = e) : a = Zd(e, t), a.length ? new qa({
    points: a,
    options: {
      tension: 0
    },
    _loop: s,
    _fullLoop: s
  }) : null;
}
function so(e) {
  return e && e.fill !== !1;
}
function Qd(e, t, a) {
  let n = e[t].fill;
  const o = [
    t
  ];
  let i;
  if (!a)
    return n;
  for (; n !== !1 && o.indexOf(n) === -1; ) {
    if (!Lt(n))
      return n;
    if (i = e[n], !i)
      return !1;
    if (i.visible)
      return n;
    o.push(n), n = i.fill;
  }
  return !1;
}
function Jd(e, t, a) {
  const s = su(e);
  if (ht(s))
    return isNaN(s.value) ? !1 : s;
  let n = parseFloat(s);
  return Lt(n) && Math.floor(n) === n ? tu(s[0], t, n, a) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(s) >= 0 && s;
}
function tu(e, t, a, s) {
  return (e === "-" || e === "+") && (a = t + a), a === t || a < 0 || a >= s ? !1 : a;
}
function eu(e, t) {
  let a = null;
  return e === "start" ? a = t.bottom : e === "end" ? a = t.top : ht(e) ? a = t.getPixelForValue(e.value) : t.getBasePixel && (a = t.getBasePixel()), a;
}
function au(e, t, a) {
  let s;
  return e === "start" ? s = a : e === "end" ? s = t.options.reverse ? t.min : t.max : ht(e) ? s = e.value : s = t.getBaseValue(), s;
}
function su(e) {
  const t = e.options, a = t.fill;
  let s = ot(a && a.target, a);
  return s === void 0 && (s = !!t.backgroundColor), s === !1 || s === null ? !1 : s === !0 ? "origin" : s;
}
function nu(e) {
  const { scale: t, index: a, line: s } = e, n = [], o = s.segments, i = s.points, r = ou(t, a);
  r.push(Mi({
    x: null,
    y: t.bottom
  }, s));
  for (let l = 0; l < o.length; l++) {
    const d = o[l];
    for (let u = d.start; u <= d.end; u++)
      iu(n, i[u], r);
  }
  return new qa({
    points: n,
    options: {}
  });
}
function ou(e, t) {
  const a = [], s = e.getMatchingVisibleMetas("line");
  for (let n = 0; n < s.length; n++) {
    const o = s[n];
    if (o.index === t)
      break;
    o.hidden || a.unshift(o.dataset);
  }
  return a;
}
function iu(e, t, a) {
  const s = [];
  for (let n = 0; n < a.length; n++) {
    const o = a[n], { first: i, last: r, point: l } = ru(o, t, "x");
    if (!(!l || i && r)) {
      if (i)
        s.unshift(l);
      else if (e.push(l), !r)
        break;
    }
  }
  e.push(...s);
}
function ru(e, t, a) {
  const s = e.interpolate(t, a);
  if (!s)
    return {};
  const n = s[a], o = e.segments, i = e.points;
  let r = !1, l = !1;
  for (let d = 0; d < o.length; d++) {
    const u = o[d], h = i[u.start][a], p = i[u.end][a];
    if (oe(n, h, p)) {
      r = n === h, l = n === p;
      break;
    }
  }
  return {
    first: r,
    last: l,
    point: s
  };
}
class Si {
  constructor(t) {
    this.x = t.x, this.y = t.y, this.radius = t.radius;
  }
  pathSegment(t, a, s) {
    const { x: n, y: o, radius: i } = this;
    return a = a || {
      start: 0,
      end: _t
    }, t.arc(n, o, i, a.end, a.start, !0), !s.bounds;
  }
  interpolate(t) {
    const { x: a, y: s, radius: n } = this, o = t.angle;
    return {
      x: a + Math.cos(o) * n,
      y: s + Math.sin(o) * n,
      angle: o
    };
  }
}
function lu(e) {
  const { chart: t, fill: a, line: s } = e;
  if (Lt(a))
    return cu(t, a);
  if (a === "stack")
    return nu(e);
  if (a === "shape")
    return !0;
  const n = du(e);
  return n instanceof Si ? n : Mi(n, s);
}
function cu(e, t) {
  const a = e.getDatasetMeta(t);
  return a && e.isDatasetVisible(t) ? a.dataset : null;
}
function du(e) {
  return (e.scale || {}).getPointPositionForValue ? hu(e) : uu(e);
}
function uu(e) {
  const { scale: t = {}, fill: a } = e, s = eu(a, t);
  if (Lt(s)) {
    const n = t.isHorizontal();
    return {
      x: n ? s : null,
      y: n ? null : s
    };
  }
  return null;
}
function hu(e) {
  const { scale: t, fill: a } = e, s = t.options, n = t.getLabels().length, o = s.reverse ? t.max : t.min, i = au(a, t, o), r = [];
  if (s.grid.circular) {
    const l = t.getPointPositionForValue(0, o);
    return new Si({
      x: l.x,
      y: l.y,
      radius: t.getDistanceFromCenterForValue(i)
    });
  }
  for (let l = 0; l < n; ++l)
    r.push(t.getPointPositionForValue(l, i));
  return r;
}
function us(e, t, a) {
  const s = lu(t), { chart: n, index: o, line: i, scale: r, axis: l } = t, d = i.options, u = d.fill, h = d.backgroundColor, { above: p = h, below: v = h } = u || {}, f = n.getDatasetMeta(o), _ = ci(n, f);
  s && i.points.length && (Ha(e, a), fu(e, {
    line: i,
    target: s,
    above: p,
    below: v,
    area: a,
    scale: r,
    axis: l,
    clip: _
  }), ja(e));
}
function fu(e, t) {
  const { line: a, target: s, above: n, below: o, area: i, scale: r, clip: l } = t, d = a._loop ? "angle" : t.axis;
  e.save();
  let u = o;
  o !== n && (d === "x" ? (no(e, s, i.top), hs(e, {
    line: a,
    target: s,
    color: n,
    scale: r,
    property: d,
    clip: l
  }), e.restore(), e.save(), no(e, s, i.bottom)) : d === "y" && (oo(e, s, i.left), hs(e, {
    line: a,
    target: s,
    color: o,
    scale: r,
    property: d,
    clip: l
  }), e.restore(), e.save(), oo(e, s, i.right), u = n)), hs(e, {
    line: a,
    target: s,
    color: u,
    scale: r,
    property: d,
    clip: l
  }), e.restore();
}
function no(e, t, a) {
  const { segments: s, points: n } = t;
  let o = !0, i = !1;
  e.beginPath();
  for (const r of s) {
    const { start: l, end: d } = r, u = n[l], h = n[Xa(l, d, n)];
    o ? (e.moveTo(u.x, u.y), o = !1) : (e.lineTo(u.x, a), e.lineTo(u.x, u.y)), i = !!t.pathSegment(e, r, {
      move: i
    }), i ? e.closePath() : e.lineTo(h.x, a);
  }
  e.lineTo(t.first().x, a), e.closePath(), e.clip();
}
function oo(e, t, a) {
  const { segments: s, points: n } = t;
  let o = !0, i = !1;
  e.beginPath();
  for (const r of s) {
    const { start: l, end: d } = r, u = n[l], h = n[Xa(l, d, n)];
    o ? (e.moveTo(u.x, u.y), o = !1) : (e.lineTo(a, u.y), e.lineTo(u.x, u.y)), i = !!t.pathSegment(e, r, {
      move: i
    }), i ? e.closePath() : e.lineTo(a, h.y);
  }
  e.lineTo(a, t.first().y), e.closePath(), e.clip();
}
function hs(e, t) {
  const { line: a, target: s, property: n, color: o, scale: i, clip: r } = t, l = Gd(a, s, n);
  for (const { source: d, target: u, start: h, end: p } of l) {
    const { style: { backgroundColor: v = o } = {} } = d, f = s !== !0;
    e.save(), e.fillStyle = v, gu(e, i, r, f && Fs(n, h, p)), e.beginPath();
    const _ = !!a.pathSegment(e, d);
    let b;
    if (f) {
      _ ? e.closePath() : io(e, s, p, n);
      const g = !!s.pathSegment(e, u, {
        move: _,
        reverse: !0
      });
      b = _ && g, b || io(e, s, h, n);
    }
    e.closePath(), e.fill(b ? "evenodd" : "nonzero"), e.restore();
  }
}
function gu(e, t, a, s) {
  const n = t.chart.chartArea, { property: o, start: i, end: r } = s || {};
  if (o === "x" || o === "y") {
    let l, d, u, h;
    o === "x" ? (l = i, d = n.top, u = r, h = n.bottom) : (l = n.left, d = i, u = n.right, h = r), e.beginPath(), a && (l = Math.max(l, a.left), u = Math.min(u, a.right), d = Math.max(d, a.top), h = Math.min(h, a.bottom)), e.rect(l, d, u - l, h - d), e.clip();
  }
}
function io(e, t, a, s) {
  const n = t.interpolate(a, s);
  n && e.lineTo(n.x, n.y);
}
var pu = {
  id: "filler",
  afterDatasetsUpdate(e, t, a) {
    const s = (e.data.datasets || []).length, n = [];
    let o, i, r, l;
    for (i = 0; i < s; ++i)
      o = e.getDatasetMeta(i), r = o.dataset, l = null, r && r.options && r instanceof qa && (l = {
        visible: e.isDatasetVisible(i),
        index: i,
        fill: Jd(r, i, s),
        chart: e,
        axis: o.controller.options.indexAxis,
        scale: o.vScale,
        line: r
      }), o.$filler = l, n.push(l);
    for (i = 0; i < s; ++i)
      l = n[i], !(!l || l.fill === !1) && (l.fill = Qd(n, i, a.propagate));
  },
  beforeDraw(e, t, a) {
    const s = a.drawTime === "beforeDraw", n = e.getSortedVisibleDatasetMetas(), o = e.chartArea;
    for (let i = n.length - 1; i >= 0; --i) {
      const r = n[i].$filler;
      r && (r.line.updateControlPoints(o, r.axis), s && r.fill && us(e.ctx, r, o));
    }
  },
  beforeDatasetsDraw(e, t, a) {
    if (a.drawTime !== "beforeDatasetsDraw")
      return;
    const s = e.getSortedVisibleDatasetMetas();
    for (let n = s.length - 1; n >= 0; --n) {
      const o = s[n].$filler;
      so(o) && us(e.ctx, o, e.chartArea);
    }
  },
  beforeDatasetDraw(e, t, a) {
    const s = t.meta.$filler;
    !so(s) || a.drawTime !== "beforeDatasetDraw" || us(e.ctx, s, e.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const ro = (e, t) => {
  let { boxHeight: a = t, boxWidth: s = t } = e;
  return e.usePointStyle && (a = Math.min(a, t), s = e.pointStyleWidth || Math.min(s, t)), {
    boxWidth: s,
    boxHeight: a,
    itemHeight: Math.max(t, a)
  };
}, vu = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class lo extends le {
  constructor(t) {
    super(), this._added = !1, this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1, this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this.legendItems = void 0, this.columnSizes = void 0, this.lineWidths = void 0, this.maxHeight = void 0, this.maxWidth = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.height = void 0, this.width = void 0, this._margins = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, a, s) {
    this.maxWidth = t, this.maxHeight = a, this._margins = s, this.setDimensions(), this.buildLabels(), this.fit();
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, this.bottom = this.height);
  }
  buildLabels() {
    const t = this.options.labels || {};
    let a = yt(t.generateLabels, [
      this.chart
    ], this) || [];
    t.filter && (a = a.filter((s) => t.filter(s, this.chart.data))), t.sort && (a = a.sort((s, n) => t.sort(s, n, this.chart.data))), this.options.reverse && a.reverse(), this.legendItems = a;
  }
  fit() {
    const { options: t, ctx: a } = this;
    if (!t.display) {
      this.width = this.height = 0;
      return;
    }
    const s = t.labels, n = Bt(s.font), o = n.size, i = this._computeTitleHeight(), { boxWidth: r, itemHeight: l } = ro(s, o);
    let d, u;
    a.font = n.string, this.isHorizontal() ? (d = this.maxWidth, u = this._fitRows(i, o, r, l) + 10) : (u = this.maxHeight, d = this._fitCols(i, n, r, l) + 10), this.width = Math.min(d, t.maxWidth || this.maxWidth), this.height = Math.min(u, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, a, s, n) {
    const { ctx: o, maxWidth: i, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], d = this.lineWidths = [
      0
    ], u = n + r;
    let h = t;
    o.textAlign = "left", o.textBaseline = "middle";
    let p = -1, v = -u;
    return this.legendItems.forEach((f, _) => {
      const b = s + a / 2 + o.measureText(f.text).width;
      (_ === 0 || d[d.length - 1] + b + 2 * r > i) && (h += u, d[d.length - (_ > 0 ? 0 : 1)] = 0, v += u, p++), l[_] = {
        left: 0,
        top: v,
        row: p,
        width: b,
        height: n
      }, d[d.length - 1] += b + r;
    }), h;
  }
  _fitCols(t, a, s, n) {
    const { ctx: o, maxHeight: i, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], d = this.columnSizes = [], u = i - t;
    let h = r, p = 0, v = 0, f = 0, _ = 0;
    return this.legendItems.forEach((b, g) => {
      const { itemWidth: m, itemHeight: $ } = bu(s, a, o, b, n);
      g > 0 && v + $ + 2 * r > u && (h += p + r, d.push({
        width: p,
        height: v
      }), f += p + r, _++, p = v = 0), l[g] = {
        left: f,
        top: v,
        col: _,
        width: m,
        height: $
      }, p = Math.max(p, m), v += $ + r;
    }), h += p, d.push({
      width: p,
      height: v
    }), h;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: a, options: { align: s, labels: { padding: n }, rtl: o } } = this, i = Ve(o, this.left, this.width);
    if (this.isHorizontal()) {
      let r = 0, l = Dt(s, this.left + n, this.right - this.lineWidths[r]);
      for (const d of a)
        r !== d.row && (r = d.row, l = Dt(s, this.left + n, this.right - this.lineWidths[r])), d.top += this.top + t + n, d.left = i.leftForLtr(i.x(l), d.width), l += d.width + n;
    } else {
      let r = 0, l = Dt(s, this.top + t + n, this.bottom - this.columnSizes[r].height);
      for (const d of a)
        d.col !== r && (r = d.col, l = Dt(s, this.top + t + n, this.bottom - this.columnSizes[r].height)), d.top = l, d.left += this.left + n, d.left = i.leftForLtr(i.x(d.left), d.width), l += d.height + n;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      Ha(t, this), this._draw(), ja(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: a, lineWidths: s, ctx: n } = this, { align: o, labels: i } = t, r = $t.color, l = Ve(t.rtl, this.left, this.width), d = Bt(i.font), { padding: u } = i, h = d.size, p = h / 2;
    let v;
    this.drawTitle(), n.textAlign = l.textAlign("left"), n.textBaseline = "middle", n.lineWidth = 0.5, n.font = d.string;
    const { boxWidth: f, boxHeight: _, itemHeight: b } = ro(i, h), g = function(S, D, T) {
      if (isNaN(f) || f <= 0 || isNaN(_) || _ < 0)
        return;
      n.save();
      const O = ot(T.lineWidth, 1);
      if (n.fillStyle = ot(T.fillStyle, r), n.lineCap = ot(T.lineCap, "butt"), n.lineDashOffset = ot(T.lineDashOffset, 0), n.lineJoin = ot(T.lineJoin, "miter"), n.lineWidth = O, n.strokeStyle = ot(T.strokeStyle, r), n.setLineDash(ot(T.lineDash, [])), i.usePointStyle) {
        const P = {
          radius: _ * Math.SQRT2 / 2,
          pointStyle: T.pointStyle,
          rotation: T.rotation,
          borderWidth: O
        }, B = l.xPlus(S, f / 2), R = D + p;
        Zo(n, P, B, R, i.pointStyleWidth && f);
      } else {
        const P = D + Math.max((h - _) / 2, 0), B = l.leftForLtr(S, f), R = Oe(T.borderRadius);
        n.beginPath(), Object.values(R).some((H) => H !== 0) ? Va(n, {
          x: B,
          y: P,
          w: f,
          h: _,
          radius: R
        }) : n.rect(B, P, f, _), n.fill(), O !== 0 && n.stroke();
      }
      n.restore();
    }, m = function(S, D, T) {
      pa(n, T.text, S, D + b / 2, d, {
        strikethrough: T.hidden,
        textAlign: l.textAlign(T.textAlign)
      });
    }, $ = this.isHorizontal(), k = this._computeTitleHeight();
    $ ? v = {
      x: Dt(o, this.left + u, this.right - s[0]),
      y: this.top + u + k,
      line: 0
    } : v = {
      x: this.left + u,
      y: Dt(o, this.top + k + u, this.bottom - a[0].height),
      line: 0
    }, ni(this.ctx, t.textDirection);
    const w = b + u;
    this.legendItems.forEach((S, D) => {
      n.strokeStyle = S.fontColor, n.fillStyle = S.fontColor;
      const T = n.measureText(S.text).width, O = l.textAlign(S.textAlign || (S.textAlign = i.textAlign)), P = f + p + T;
      let B = v.x, R = v.y;
      l.setWidth(this.width), $ ? D > 0 && B + P + u > this.right && (R = v.y += w, v.line++, B = v.x = Dt(o, this.left + u, this.right - s[v.line])) : D > 0 && R + w > this.bottom && (B = v.x = B + a[v.line].width + u, v.line++, R = v.y = Dt(o, this.top + k + u, this.bottom - a[v.line].height));
      const H = l.x(B);
      if (g(H, R, S), B = zr(O, B + f + p, $ ? B + P : this.right, t.rtl), m(l.x(B), R, S), $)
        v.x += P + u;
      else if (typeof S.text != "string") {
        const L = d.lineHeight;
        v.y += Ci(S, L) + u;
      } else
        v.y += w;
    }), oi(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, a = t.title, s = Bt(a.font), n = Yt(a.padding);
    if (!a.display)
      return;
    const o = Ve(t.rtl, this.left, this.width), i = this.ctx, r = a.position, l = s.size / 2, d = n.top + l;
    let u, h = this.left, p = this.width;
    if (this.isHorizontal())
      p = Math.max(...this.lineWidths), u = this.top + d, h = Dt(t.align, h, this.right - p);
    else {
      const f = this.columnSizes.reduce((_, b) => Math.max(_, b.height), 0);
      u = d + Dt(t.align, this.top, this.bottom - f - t.labels.padding - this._computeTitleHeight());
    }
    const v = Dt(r, h, h + p);
    i.textAlign = o.textAlign(Ns(r)), i.textBaseline = "middle", i.strokeStyle = a.color, i.fillStyle = a.color, i.font = s.string, pa(i, a.text, v, u, s);
  }
  _computeTitleHeight() {
    const t = this.options.title, a = Bt(t.font), s = Yt(t.padding);
    return t.display ? a.lineHeight + s.height : 0;
  }
  _getLegendItemAt(t, a) {
    let s, n, o;
    if (oe(t, this.left, this.right) && oe(a, this.top, this.bottom)) {
      for (o = this.legendHitBoxes, s = 0; s < o.length; ++s)
        if (n = o[s], oe(t, n.left, n.left + n.width) && oe(a, n.top, n.top + n.height))
          return this.legendItems[s];
    }
    return null;
  }
  handleEvent(t) {
    const a = this.options;
    if (!_u(t.type, a))
      return;
    const s = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const n = this._hoveredItem, o = vu(n, s);
      n && !o && yt(a.onLeave, [
        t,
        n,
        this
      ], this), this._hoveredItem = s, s && !o && yt(a.onHover, [
        t,
        s,
        this
      ], this);
    } else s && yt(a.onClick, [
      t,
      s,
      this
    ], this);
  }
}
function bu(e, t, a, s, n) {
  const o = mu(s, e, t, a), i = yu(n, s, t.lineHeight);
  return {
    itemWidth: o,
    itemHeight: i
  };
}
function mu(e, t, a, s) {
  let n = e.text;
  return n && typeof n != "string" && (n = n.reduce((o, i) => o.length > i.length ? o : i)), t + a.size / 2 + s.measureText(n).width;
}
function yu(e, t, a) {
  let s = e;
  return typeof t.text != "string" && (s = Ci(t, a)), s;
}
function Ci(e, t) {
  const a = e.text ? e.text.length : 0;
  return t * a;
}
function _u(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var Zs = {
  id: "legend",
  _element: lo,
  start(e, t, a) {
    const s = e.legend = new lo({
      ctx: e.ctx,
      options: a,
      chart: e
    });
    jt.configure(e, s, a), jt.addBox(e, s);
  },
  stop(e) {
    jt.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, a) {
    const s = e.legend;
    jt.configure(e, s, a), s.options = a;
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
      const s = t.datasetIndex, n = a.chart;
      n.isDatasetVisible(s) ? (n.hide(s), t.hidden = !0) : (n.show(s), t.hidden = !1);
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (e) => e.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(e) {
        const t = e.data.datasets, { labels: { usePointStyle: a, pointStyle: s, textAlign: n, color: o, useBorderRadius: i, borderRadius: r } } = e.legend.options;
        return e._getSortedDatasetMetas().map((l) => {
          const d = l.controller.getStyle(a ? 0 : void 0), u = Yt(d.borderWidth);
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
            pointStyle: s || d.pointStyle,
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
class Di extends le {
  constructor(t) {
    super(), this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this._padding = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, a) {
    const s = this.options;
    if (this.left = 0, this.top = 0, !s.display) {
      this.width = this.height = this.right = this.bottom = 0;
      return;
    }
    this.width = this.right = t, this.height = this.bottom = a;
    const n = Mt(s.text) ? s.text.length : 1;
    this._padding = Yt(s.padding);
    const o = n * Bt(s.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = o : this.width = o;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: a, left: s, bottom: n, right: o, options: i } = this, r = i.align;
    let l = 0, d, u, h;
    return this.isHorizontal() ? (u = Dt(r, s, o), h = a + t, d = o - s) : (i.position === "left" ? (u = s + t, h = Dt(r, n, a), l = bt * -0.5) : (u = o - t, h = Dt(r, a, n), l = bt * 0.5), d = n - a), {
      titleX: u,
      titleY: h,
      maxWidth: d,
      rotation: l
    };
  }
  draw() {
    const t = this.ctx, a = this.options;
    if (!a.display)
      return;
    const s = Bt(a.font), o = s.lineHeight / 2 + this._padding.top, { titleX: i, titleY: r, maxWidth: l, rotation: d } = this._drawArgs(o);
    pa(t, a.text, 0, 0, s, {
      color: a.color,
      maxWidth: l,
      rotation: d,
      textAlign: Ns(a.align),
      textBaseline: "middle",
      translation: [
        i,
        r
      ]
    });
  }
}
function xu(e, t) {
  const a = new Di({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  jt.configure(e, a, t), jt.addBox(e, a), e.titleBlock = a;
}
var Ai = {
  id: "title",
  _element: Di,
  start(e, t, a) {
    xu(e, a);
  },
  stop(e) {
    const t = e.titleBlock;
    jt.removeBox(e, t), delete e.titleBlock;
  },
  beforeUpdate(e, t, a) {
    const s = e.titleBlock;
    jt.configure(e, s, a), s.options = a;
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
const aa = {
  average(e) {
    if (!e.length)
      return !1;
    let t, a, s = /* @__PURE__ */ new Set(), n = 0, o = 0;
    for (t = 0, a = e.length; t < a; ++t) {
      const r = e[t].element;
      if (r && r.hasValue()) {
        const l = r.tooltipPosition();
        s.add(l.x), n += l.y, ++o;
      }
    }
    return o === 0 || s.size === 0 ? !1 : {
      x: [
        ...s
      ].reduce((r, l) => r + l) / s.size,
      y: n / o
    };
  },
  nearest(e, t) {
    if (!e.length)
      return !1;
    let a = t.x, s = t.y, n = Number.POSITIVE_INFINITY, o, i, r;
    for (o = 0, i = e.length; o < i; ++o) {
      const l = e[o].element;
      if (l && l.hasValue()) {
        const d = l.getCenterPoint(), u = Cs(t, d);
        u < n && (n = u, r = l);
      }
    }
    if (r) {
      const l = r.tooltipPosition();
      a = l.x, s = l.y;
    }
    return {
      x: a,
      y: s
    };
  }
};
function Gt(e, t) {
  return t && (Mt(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function ae(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function ku(e, t) {
  const { element: a, datasetIndex: s, index: n } = t, o = e.getDatasetMeta(s).controller, { label: i, value: r } = o.getLabelAndValue(n);
  return {
    chart: e,
    label: i,
    parsed: o.getParsed(n),
    raw: e.data.datasets[s].data[n],
    formattedValue: r,
    dataset: o.getDataset(),
    dataIndex: n,
    datasetIndex: s,
    element: a
  };
}
function co(e, t) {
  const a = e.chart.ctx, { body: s, footer: n, title: o } = e, { boxWidth: i, boxHeight: r } = t, l = Bt(t.bodyFont), d = Bt(t.titleFont), u = Bt(t.footerFont), h = o.length, p = n.length, v = s.length, f = Yt(t.padding);
  let _ = f.height, b = 0, g = s.reduce((k, w) => k + w.before.length + w.lines.length + w.after.length, 0);
  if (g += e.beforeBody.length + e.afterBody.length, h && (_ += h * d.lineHeight + (h - 1) * t.titleSpacing + t.titleMarginBottom), g) {
    const k = t.displayColors ? Math.max(r, l.lineHeight) : l.lineHeight;
    _ += v * k + (g - v) * l.lineHeight + (g - 1) * t.bodySpacing;
  }
  p && (_ += t.footerMarginTop + p * u.lineHeight + (p - 1) * t.footerSpacing);
  let m = 0;
  const $ = function(k) {
    b = Math.max(b, a.measureText(k).width + m);
  };
  return a.save(), a.font = d.string, vt(e.title, $), a.font = l.string, vt(e.beforeBody.concat(e.afterBody), $), m = t.displayColors ? i + 2 + t.boxPadding : 0, vt(s, (k) => {
    vt(k.before, $), vt(k.lines, $), vt(k.after, $);
  }), m = 0, a.font = u.string, vt(e.footer, $), a.restore(), b += f.width, {
    width: b,
    height: _
  };
}
function wu(e, t) {
  const { y: a, height: s } = t;
  return a < s / 2 ? "top" : a > e.height - s / 2 ? "bottom" : "center";
}
function $u(e, t, a, s) {
  const { x: n, width: o } = s, i = a.caretSize + a.caretPadding;
  if (e === "left" && n + o + i > t.width || e === "right" && n - o - i < 0)
    return !0;
}
function Mu(e, t, a, s) {
  const { x: n, width: o } = a, { width: i, chartArea: { left: r, right: l } } = e;
  let d = "center";
  return s === "center" ? d = n <= (r + l) / 2 ? "left" : "right" : n <= o / 2 ? d = "left" : n >= i - o / 2 && (d = "right"), $u(d, e, t, a) && (d = "center"), d;
}
function uo(e, t, a) {
  const s = a.yAlign || t.yAlign || wu(e, a);
  return {
    xAlign: a.xAlign || t.xAlign || Mu(e, t, a, s),
    yAlign: s
  };
}
function Su(e, t) {
  let { x: a, width: s } = e;
  return t === "right" ? a -= s : t === "center" && (a -= s / 2), a;
}
function Cu(e, t, a) {
  let { y: s, height: n } = e;
  return t === "top" ? s += a : t === "bottom" ? s -= n + a : s -= n / 2, s;
}
function ho(e, t, a, s) {
  const { caretSize: n, caretPadding: o, cornerRadius: i } = e, { xAlign: r, yAlign: l } = a, d = n + o, { topLeft: u, topRight: h, bottomLeft: p, bottomRight: v } = Oe(i);
  let f = Su(t, r);
  const _ = Cu(t, l, d);
  return l === "center" ? r === "left" ? f += d : r === "right" && (f -= d) : r === "left" ? f -= Math.max(u, p) + n : r === "right" && (f += Math.max(h, v) + n), {
    x: Tt(f, 0, s.width - t.width),
    y: Tt(_, 0, s.height - t.height)
  };
}
function Ta(e, t, a) {
  const s = Yt(a.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - s.right : e.x + s.left;
}
function fo(e) {
  return Gt([], ae(e));
}
function Du(e, t, a) {
  return Be(e, {
    tooltip: t,
    tooltipItems: a,
    type: "tooltip"
  });
}
function go(e, t) {
  const a = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return a ? e.override(a) : e;
}
const Ti = {
  beforeTitle: te,
  title(e) {
    if (e.length > 0) {
      const t = e[0], a = t.chart.data.labels, s = a ? a.length : 0;
      if (this && this.options && this.options.mode === "dataset")
        return t.dataset.label || "";
      if (t.label)
        return t.label;
      if (s > 0 && t.dataIndex < s)
        return a[t.dataIndex];
    }
    return "";
  },
  afterTitle: te,
  beforeBody: te,
  beforeLabel: te,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const a = e.formattedValue;
    return pt(a) || (t += a), t;
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
  afterLabel: te,
  afterBody: te,
  beforeFooter: te,
  footer: te,
  afterFooter: te
};
function Rt(e, t, a, s) {
  const n = e[t].call(a, s);
  return typeof n > "u" ? Ti[t].call(a, s) : n;
}
class po extends le {
  static positioners = aa;
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
    const a = this.chart, s = this.options.setContext(this.getContext()), n = s.enabled && a.options.animation && s.animations, o = new di(this.chart, n);
    return n._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = Du(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, a) {
    const { callbacks: s } = a, n = Rt(s, "beforeTitle", this, t), o = Rt(s, "title", this, t), i = Rt(s, "afterTitle", this, t);
    let r = [];
    return r = Gt(r, ae(n)), r = Gt(r, ae(o)), r = Gt(r, ae(i)), r;
  }
  getBeforeBody(t, a) {
    return fo(Rt(a.callbacks, "beforeBody", this, t));
  }
  getBody(t, a) {
    const { callbacks: s } = a, n = [];
    return vt(t, (o) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, r = go(s, o);
      Gt(i.before, ae(Rt(r, "beforeLabel", this, o))), Gt(i.lines, Rt(r, "label", this, o)), Gt(i.after, ae(Rt(r, "afterLabel", this, o))), n.push(i);
    }), n;
  }
  getAfterBody(t, a) {
    return fo(Rt(a.callbacks, "afterBody", this, t));
  }
  getFooter(t, a) {
    const { callbacks: s } = a, n = Rt(s, "beforeFooter", this, t), o = Rt(s, "footer", this, t), i = Rt(s, "afterFooter", this, t);
    let r = [];
    return r = Gt(r, ae(n)), r = Gt(r, ae(o)), r = Gt(r, ae(i)), r;
  }
  _createItems(t) {
    const a = this._active, s = this.chart.data, n = [], o = [], i = [];
    let r = [], l, d;
    for (l = 0, d = a.length; l < d; ++l)
      r.push(ku(this.chart, a[l]));
    return t.filter && (r = r.filter((u, h, p) => t.filter(u, h, p, s))), t.itemSort && (r = r.sort((u, h) => t.itemSort(u, h, s))), vt(r, (u) => {
      const h = go(t.callbacks, u);
      n.push(Rt(h, "labelColor", this, u)), o.push(Rt(h, "labelPointStyle", this, u)), i.push(Rt(h, "labelTextColor", this, u));
    }), this.labelColors = n, this.labelPointStyles = o, this.labelTextColors = i, this.dataPoints = r, r;
  }
  update(t, a) {
    const s = this.options.setContext(this.getContext()), n = this._active;
    let o, i = [];
    if (!n.length)
      this.opacity !== 0 && (o = {
        opacity: 0
      });
    else {
      const r = aa[s.position].call(this, n, this._eventPosition);
      i = this._createItems(s), this.title = this.getTitle(i, s), this.beforeBody = this.getBeforeBody(i, s), this.body = this.getBody(i, s), this.afterBody = this.getAfterBody(i, s), this.footer = this.getFooter(i, s);
      const l = this._size = co(this, s), d = Object.assign({}, r, l), u = uo(this.chart, s, d), h = ho(s, d, u, this.chart);
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
    this._tooltipItems = i, this.$context = void 0, o && this._resolveAnimations().update(this, o), t && s.external && s.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: a
    });
  }
  drawCaret(t, a, s, n) {
    const o = this.getCaretPosition(t, s, n);
    a.lineTo(o.x1, o.y1), a.lineTo(o.x2, o.y2), a.lineTo(o.x3, o.y3);
  }
  getCaretPosition(t, a, s) {
    const { xAlign: n, yAlign: o } = this, { caretSize: i, cornerRadius: r } = s, { topLeft: l, topRight: d, bottomLeft: u, bottomRight: h } = Oe(r), { x: p, y: v } = t, { width: f, height: _ } = a;
    let b, g, m, $, k, w;
    return o === "center" ? (k = v + _ / 2, n === "left" ? (b = p, g = b - i, $ = k + i, w = k - i) : (b = p + f, g = b + i, $ = k - i, w = k + i), m = b) : (n === "left" ? g = p + Math.max(l, u) + i : n === "right" ? g = p + f - Math.max(d, h) - i : g = this.caretX, o === "top" ? ($ = v, k = $ - i, b = g - i, m = g + i) : ($ = v + _, k = $ + i, b = g + i, m = g - i), w = $), {
      x1: b,
      x2: g,
      x3: m,
      y1: $,
      y2: k,
      y3: w
    };
  }
  drawTitle(t, a, s) {
    const n = this.title, o = n.length;
    let i, r, l;
    if (o) {
      const d = Ve(s.rtl, this.x, this.width);
      for (t.x = Ta(this, s.titleAlign, s), a.textAlign = d.textAlign(s.titleAlign), a.textBaseline = "middle", i = Bt(s.titleFont), r = s.titleSpacing, a.fillStyle = s.titleColor, a.font = i.string, l = 0; l < o; ++l)
        a.fillText(n[l], d.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + r, l + 1 === o && (t.y += s.titleMarginBottom - r);
    }
  }
  _drawColorBox(t, a, s, n, o) {
    const i = this.labelColors[s], r = this.labelPointStyles[s], { boxHeight: l, boxWidth: d } = o, u = Bt(o.bodyFont), h = Ta(this, "left", o), p = n.x(h), v = l < u.lineHeight ? (u.lineHeight - l) / 2 : 0, f = a.y + v;
    if (o.usePointStyle) {
      const _ = {
        radius: Math.min(d, l) / 2,
        pointStyle: r.pointStyle,
        rotation: r.rotation,
        borderWidth: 1
      }, b = n.leftForLtr(p, d) + d / 2, g = f + l / 2;
      t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, As(t, _, b, g), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, As(t, _, b, g);
    } else {
      t.lineWidth = ht(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const _ = n.leftForLtr(p, d), b = n.leftForLtr(n.xPlus(p, 1), d - 2), g = Oe(i.borderRadius);
      Object.values(g).some((m) => m !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, Va(t, {
        x: _,
        y: f,
        w: d,
        h: l,
        radius: g
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), Va(t, {
        x: b,
        y: f + 1,
        w: d - 2,
        h: l - 2,
        radius: g
      }), t.fill()) : (t.fillStyle = o.multiKeyBackground, t.fillRect(_, f, d, l), t.strokeRect(_, f, d, l), t.fillStyle = i.backgroundColor, t.fillRect(b, f + 1, d - 2, l - 2));
    }
    t.fillStyle = this.labelTextColors[s];
  }
  drawBody(t, a, s) {
    const { body: n } = this, { bodySpacing: o, bodyAlign: i, displayColors: r, boxHeight: l, boxWidth: d, boxPadding: u } = s, h = Bt(s.bodyFont);
    let p = h.lineHeight, v = 0;
    const f = Ve(s.rtl, this.x, this.width), _ = function(T) {
      a.fillText(T, f.x(t.x + v), t.y + p / 2), t.y += p + o;
    }, b = f.textAlign(i);
    let g, m, $, k, w, S, D;
    for (a.textAlign = i, a.textBaseline = "middle", a.font = h.string, t.x = Ta(this, b, s), a.fillStyle = s.bodyColor, vt(this.beforeBody, _), v = r && b !== "right" ? i === "center" ? d / 2 + u : d + 2 + u : 0, k = 0, S = n.length; k < S; ++k) {
      for (g = n[k], m = this.labelTextColors[k], a.fillStyle = m, vt(g.before, _), $ = g.lines, r && $.length && (this._drawColorBox(a, t, k, f, s), p = Math.max(h.lineHeight, l)), w = 0, D = $.length; w < D; ++w)
        _($[w]), p = h.lineHeight;
      vt(g.after, _);
    }
    v = 0, p = h.lineHeight, vt(this.afterBody, _), t.y -= o;
  }
  drawFooter(t, a, s) {
    const n = this.footer, o = n.length;
    let i, r;
    if (o) {
      const l = Ve(s.rtl, this.x, this.width);
      for (t.x = Ta(this, s.footerAlign, s), t.y += s.footerMarginTop, a.textAlign = l.textAlign(s.footerAlign), a.textBaseline = "middle", i = Bt(s.footerFont), a.fillStyle = s.footerColor, a.font = i.string, r = 0; r < o; ++r)
        a.fillText(n[r], l.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + s.footerSpacing;
    }
  }
  drawBackground(t, a, s, n) {
    const { xAlign: o, yAlign: i } = this, { x: r, y: l } = t, { width: d, height: u } = s, { topLeft: h, topRight: p, bottomLeft: v, bottomRight: f } = Oe(n.cornerRadius);
    a.fillStyle = n.backgroundColor, a.strokeStyle = n.borderColor, a.lineWidth = n.borderWidth, a.beginPath(), a.moveTo(r + h, l), i === "top" && this.drawCaret(t, a, s, n), a.lineTo(r + d - p, l), a.quadraticCurveTo(r + d, l, r + d, l + p), i === "center" && o === "right" && this.drawCaret(t, a, s, n), a.lineTo(r + d, l + u - f), a.quadraticCurveTo(r + d, l + u, r + d - f, l + u), i === "bottom" && this.drawCaret(t, a, s, n), a.lineTo(r + v, l + u), a.quadraticCurveTo(r, l + u, r, l + u - v), i === "center" && o === "left" && this.drawCaret(t, a, s, n), a.lineTo(r, l + h), a.quadraticCurveTo(r, l, r + h, l), a.closePath(), a.fill(), n.borderWidth > 0 && a.stroke();
  }
  _updateAnimationTarget(t) {
    const a = this.chart, s = this.$animations, n = s && s.x, o = s && s.y;
    if (n || o) {
      const i = aa[t.position].call(this, this._active, this._eventPosition);
      if (!i)
        return;
      const r = this._size = co(this, t), l = Object.assign({}, i, this._size), d = uo(a, t, l), u = ho(t, l, d, a);
      (n._to !== u.x || o._to !== u.y) && (this.xAlign = d.xAlign, this.yAlign = d.yAlign, this.width = r.width, this.height = r.height, this.caretX = i.x, this.caretY = i.y, this._resolveAnimations().update(this, u));
    }
  }
  _willRender() {
    return !!this.opacity;
  }
  draw(t) {
    const a = this.options.setContext(this.getContext());
    let s = this.opacity;
    if (!s)
      return;
    this._updateAnimationTarget(a);
    const n = {
      width: this.width,
      height: this.height
    }, o = {
      x: this.x,
      y: this.y
    };
    s = Math.abs(s) < 1e-3 ? 0 : s;
    const i = Yt(a.padding), r = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    a.enabled && r && (t.save(), t.globalAlpha = s, this.drawBackground(o, t, n, a), ni(t, a.textDirection), o.y += i.top, this.drawTitle(o, t, a), this.drawBody(o, t, a), this.drawFooter(o, t, a), oi(t, a.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, a) {
    const s = this._active, n = t.map(({ datasetIndex: r, index: l }) => {
      const d = this.chart.getDatasetMeta(r);
      if (!d)
        throw new Error("Cannot find a dataset at index " + r);
      return {
        datasetIndex: r,
        element: d.data[l],
        index: l
      };
    }), o = !Ea(s, n), i = this._positionChanged(n, a);
    (o || i) && (this._active = n, this._eventPosition = a, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, a, s = !0) {
    if (a && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const n = this.options, o = this._active || [], i = this._getActiveElements(t, o, a, s), r = this._positionChanged(i, t), l = a || !Ea(i, o) || r;
    return l && (this._active = i, (n.enabled || n.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, a))), l;
  }
  _getActiveElements(t, a, s, n) {
    const o = this.options;
    if (t.type === "mouseout")
      return [];
    if (!n)
      return a.filter((r) => this.chart.data.datasets[r.datasetIndex] && this.chart.getDatasetMeta(r.datasetIndex).controller.getParsed(r.index) !== void 0);
    const i = this.chart.getElementsAtEventForMode(t, o.mode, o, s);
    return o.reverse && i.reverse(), i;
  }
  _positionChanged(t, a) {
    const { caretX: s, caretY: n, options: o } = this, i = aa[o.position].call(this, t, a);
    return i !== !1 && (s !== i.x || n !== i.y);
  }
}
var Qs = {
  id: "tooltip",
  _element: po,
  positioners: aa,
  afterInit(e, t, a) {
    a && (e.tooltip = new po({
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
    callbacks: Ti
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
const Au = (e, t, a, s) => (typeof t == "string" ? (a = e.push(t) - 1, s.unshift({
  index: a,
  label: t
})) : isNaN(t) && (a = null), a);
function Tu(e, t, a, s) {
  const n = e.indexOf(t);
  if (n === -1)
    return Au(e, t, a, s);
  const o = e.lastIndexOf(t);
  return n !== o ? a : n;
}
const Bu = (e, t) => e === null ? null : Tt(Math.round(e), 0, t);
function vo(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class Bi extends He {
  static id = "category";
  static defaults = {
    ticks: {
      callback: vo
    }
  };
  constructor(t) {
    super(t), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(t) {
    const a = this._addedLabels;
    if (a.length) {
      const s = this.getLabels();
      for (const { index: n, label: o } of a)
        s[n] === o && s.splice(n, 1);
      this._addedLabels = [];
    }
    super.init(t);
  }
  parse(t, a) {
    if (pt(t))
      return null;
    const s = this.getLabels();
    return a = isFinite(a) && s[a] === t ? a : Tu(s, t, ot(a, t), this._addedLabels), Bu(a, s.length - 1);
  }
  determineDataLimits() {
    const { minDefined: t, maxDefined: a } = this.getUserBounds();
    let { min: s, max: n } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (t || (s = 0), a || (n = this.getLabels().length - 1)), this.min = s, this.max = n;
  }
  buildTicks() {
    const t = this.min, a = this.max, s = this.options.offset, n = [];
    let o = this.getLabels();
    o = t === 0 && a === o.length - 1 ? o : o.slice(t, a + 1), this._valueRange = Math.max(o.length - (s ? 0 : 1), 1), this._startValue = this.min - (s ? 0.5 : 0);
    for (let i = t; i <= a; i++)
      n.push({
        value: i
      });
    return n;
  }
  getLabelForValue(t) {
    return vo.call(this, t);
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
function Lu(e, t) {
  const a = [], { bounds: n, step: o, min: i, max: r, precision: l, count: d, maxTicks: u, maxDigits: h, includeBounds: p } = e, v = o || 1, f = u - 1, { min: _, max: b } = t, g = !pt(i), m = !pt(r), $ = !pt(d), k = (b - _) / (h + 1);
  let w = un((b - _) / f / v) * v, S, D, T, O;
  if (w < 1e-14 && !g && !m)
    return [
      {
        value: _
      },
      {
        value: b
      }
    ];
  O = Math.ceil(b / w) - Math.floor(_ / w), O > f && (w = un(O * w / f / v) * v), pt(l) || (S = Math.pow(10, l), w = Math.ceil(w * S) / S), n === "ticks" ? (D = Math.floor(_ / w) * w, T = Math.ceil(b / w) * w) : (D = _, T = b), g && m && o && Br((r - i) / o, w / 1e3) ? (O = Math.round(Math.min((r - i) / w, u)), w = (r - i) / O, D = i, T = r) : $ ? (D = g ? i : D, T = m ? r : T, O = d - 1, w = (T - D) / O) : (O = (T - D) / w, na(O, Math.round(O), w / 1e3) ? O = Math.round(O) : O = Math.ceil(O));
  const P = Math.max(hn(w), hn(D));
  S = Math.pow(10, pt(l) ? P : l), D = Math.round(D * S) / S, T = Math.round(T * S) / S;
  let B = 0;
  for (g && (p && D !== i ? (a.push({
    value: i
  }), D < i && B++, na(Math.round((D + B * w) * S) / S, i, bo(i, k, e)) && B++) : D < i && B++); B < O; ++B) {
    const R = Math.round((D + B * w) * S) / S;
    if (m && R > r)
      break;
    a.push({
      value: R
    });
  }
  return m && p && T !== r ? a.length && na(a[a.length - 1].value, r, bo(r, k, e)) ? a[a.length - 1].value = r : a.push({
    value: r
  }) : (!m || T === r) && a.push({
    value: T
  }), a;
}
function bo(e, t, { horizontal: a, minRotation: s }) {
  const n = ne(s), o = (a ? Math.sin(n) : Math.cos(n)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / o, i);
}
class Fu extends He {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, a) {
    return pt(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: a, maxDefined: s } = this.getUserBounds();
    let { min: n, max: o } = this;
    const i = (l) => n = a ? n : l, r = (l) => o = s ? o : l;
    if (t) {
      const l = Qt(n), d = Qt(o);
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
    let { maxTicksLimit: a, stepSize: s } = t, n;
    return s ? (n = Math.ceil(this.max / s) - Math.floor(this.min / s) + 1, n > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${s} would result generating up to ${n} ticks. Limiting to 1000.`), n = 1e3)) : (n = this.computeTickLimit(), a = a || 11), a && (n = Math.min(a, n)), n;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const t = this.options, a = t.ticks;
    let s = this.getTickLimit();
    s = Math.max(2, s);
    const n = {
      maxTicks: s,
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
    }, o = this._range || this, i = Lu(n, o);
    return t.bounds === "ticks" && Lr(i, this, "value"), t.reverse ? (i.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), i;
  }
  configure() {
    const t = this.ticks;
    let a = this.min, s = this.max;
    if (super.configure(), this.options.offset && t.length) {
      const n = (s - a) / Math.max(t.length - 1, 1) / 2;
      a -= n, s += n;
    }
    this._startValue = a, this._endValue = s, this._valueRange = s - a;
  }
  getLabelForValue(t) {
    return Hs(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class Li extends Fu {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: Go.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: a } = this.getMinMax(!0);
    this.min = Lt(t) ? t : 0, this.max = Lt(a) ? a : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), a = t ? this.width : this.height, s = ne(this.options.ticks.minRotation), n = (t ? Math.sin(s) : Math.cos(s)) || 1e-3, o = this._resolveTickFontOptions(0);
    return Math.ceil(a / Math.min(40, o.lineHeight / n));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
const Ga = {
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
}, Ot = /* @__PURE__ */ Object.keys(Ga);
function mo(e, t) {
  return e - t;
}
function yo(e, t) {
  if (pt(t))
    return null;
  const a = e._adapter, { parser: s, round: n, isoWeekday: o } = e._parseOpts;
  let i = t;
  return typeof s == "function" && (i = s(i)), Lt(i) || (i = typeof s == "string" ? a.parse(i, s) : a.parse(i)), i === null ? null : (n && (i = n === "week" && (ha(o) || o === !0) ? a.startOf(i, "isoWeek", o) : a.startOf(i, n)), +i);
}
function _o(e, t, a, s) {
  const n = Ot.length;
  for (let o = Ot.indexOf(e); o < n - 1; ++o) {
    const i = Ga[Ot[o]], r = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((a - t) / (r * i.size)) <= s)
      return Ot[o];
  }
  return Ot[n - 1];
}
function Pu(e, t, a, s, n) {
  for (let o = Ot.length - 1; o >= Ot.indexOf(a); o--) {
    const i = Ot[o];
    if (Ga[i].common && e._adapter.diff(n, s, i) >= t - 1)
      return i;
  }
  return Ot[a ? Ot.indexOf(a) : 0];
}
function Iu(e) {
  for (let t = Ot.indexOf(e) + 1, a = Ot.length; t < a; ++t)
    if (Ga[Ot[t]].common)
      return Ot[t];
}
function xo(e, t, a) {
  if (!a)
    e[t] = !0;
  else if (a.length) {
    const { lo: s, hi: n } = zs(a, t), o = a[s] >= t ? a[s] : a[n];
    e[o] = !0;
  }
}
function Eu(e, t, a, s) {
  const n = e._adapter, o = +n.startOf(t[0].value, s), i = t[t.length - 1].value;
  let r, l;
  for (r = o; r <= i; r = +n.add(r, 1, s))
    l = a[r], l >= 0 && (t[l].major = !0);
  return t;
}
function ko(e, t, a) {
  const s = [], n = {}, o = t.length;
  let i, r;
  for (i = 0; i < o; ++i)
    r = t[i], n[r] = i, s.push({
      value: r,
      major: !1
    });
  return o === 0 || !a ? s : Eu(e, s, n, a);
}
class wo extends He {
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
    const s = t.time || (t.time = {}), n = this._adapter = new mc._date(t.adapters.date);
    n.init(a), sa(s.displayFormats, n.formats()), this._parseOpts = {
      parser: s.parser,
      round: s.round,
      isoWeekday: s.isoWeekday
    }, super.init(t), this._normalized = a.normalized;
  }
  parse(t, a) {
    return t === void 0 ? null : yo(this, t);
  }
  beforeLayout() {
    super.beforeLayout(), this._cache = {
      data: [],
      labels: [],
      all: []
    };
  }
  determineDataLimits() {
    const t = this.options, a = this._adapter, s = t.time.unit || "day";
    let { min: n, max: o, minDefined: i, maxDefined: r } = this.getUserBounds();
    function l(d) {
      !i && !isNaN(d.min) && (n = Math.min(n, d.min)), !r && !isNaN(d.max) && (o = Math.max(o, d.max));
    }
    (!i || !r) && (l(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && l(this.getMinMax(!1))), n = Lt(n) && !isNaN(n) ? n : +a.startOf(Date.now(), s), o = Lt(o) && !isNaN(o) ? o : +a.endOf(Date.now(), s) + 1, this.min = Math.min(n, o - 1), this.max = Math.max(n + 1, o);
  }
  _getLabelBounds() {
    const t = this.getLabelTimestamps();
    let a = Number.POSITIVE_INFINITY, s = Number.NEGATIVE_INFINITY;
    return t.length && (a = t[0], s = t[t.length - 1]), {
      min: a,
      max: s
    };
  }
  buildTicks() {
    const t = this.options, a = t.time, s = t.ticks, n = s.source === "labels" ? this.getLabelTimestamps() : this._generate();
    t.bounds === "ticks" && n.length && (this.min = this._userMin || n[0], this.max = this._userMax || n[n.length - 1]);
    const o = this.min, i = this.max, r = Rr(n, o, i);
    return this._unit = a.unit || (s.autoSkip ? _o(a.minUnit, this.min, this.max, this._getLabelCapacity(o)) : Pu(this, r.length, a.minUnit, this.min, this.max)), this._majorUnit = !s.major.enabled || this._unit === "year" ? void 0 : Iu(this._unit), this.initOffsets(n), t.reverse && r.reverse(), ko(this, r, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let a = 0, s = 0, n, o;
    this.options.offset && t.length && (n = this.getDecimalForValue(t[0]), t.length === 1 ? a = 1 - n : a = (this.getDecimalForValue(t[1]) - n) / 2, o = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? s = o : s = (o - this.getDecimalForValue(t[t.length - 2])) / 2);
    const i = t.length < 3 ? 0.5 : 0.25;
    a = Tt(a, 0, i), s = Tt(s, 0, i), this._offsets = {
      start: a,
      end: s,
      factor: 1 / (a + 1 + s)
    };
  }
  _generate() {
    const t = this._adapter, a = this.min, s = this.max, n = this.options, o = n.time, i = o.unit || _o(o.minUnit, a, s, this._getLabelCapacity(a)), r = ot(n.ticks.stepSize, 1), l = i === "week" ? o.isoWeekday : !1, d = ha(l) || l === !0, u = {};
    let h = a, p, v;
    if (d && (h = +t.startOf(h, "isoWeek", l)), h = +t.startOf(h, d ? "day" : i), t.diff(s, a, i) > 1e5 * r)
      throw new Error(a + " and " + s + " are too far apart with stepSize of " + r + " " + i);
    const f = n.ticks.source === "data" && this.getDataTimestamps();
    for (p = h, v = 0; p < s; p = +t.add(p, r, i), v++)
      xo(u, p, f);
    return (p === s || n.bounds === "ticks" || v === 1) && xo(u, p, f), Object.keys(u).sort(mo).map((_) => +_);
  }
  getLabelForValue(t) {
    const a = this._adapter, s = this.options.time;
    return s.tooltipFormat ? a.format(t, s.tooltipFormat) : a.format(t, s.displayFormats.datetime);
  }
  format(t, a) {
    const n = this.options.time.displayFormats, o = this._unit, i = a || n[o];
    return this._adapter.format(t, i);
  }
  _tickFormatFunction(t, a, s, n) {
    const o = this.options, i = o.ticks.callback;
    if (i)
      return yt(i, [
        t,
        a,
        s
      ], this);
    const r = o.time.displayFormats, l = this._unit, d = this._majorUnit, u = l && r[l], h = d && r[d], p = s[a], v = d && h && p && p.major;
    return this._adapter.format(t, n || (v ? h : u));
  }
  generateTickLabels(t) {
    let a, s, n;
    for (a = 0, s = t.length; a < s; ++a)
      n = t[a], n.label = this._tickFormatFunction(n.value, a, t);
  }
  getDecimalForValue(t) {
    return t === null ? NaN : (t - this.min) / (this.max - this.min);
  }
  getPixelForValue(t) {
    const a = this._offsets, s = this.getDecimalForValue(t);
    return this.getPixelForDecimal((a.start + s) * a.factor);
  }
  getValueForPixel(t) {
    const a = this._offsets, s = this.getDecimalForPixel(t) / a.factor - a.end;
    return this.min + s * (this.max - this.min);
  }
  _getLabelSize(t) {
    const a = this.options.ticks, s = this.ctx.measureText(t).width, n = ne(this.isHorizontal() ? a.maxRotation : a.minRotation), o = Math.cos(n), i = Math.sin(n), r = this._resolveTickFontOptions(0).size;
    return {
      w: s * o + r * i,
      h: s * i + r * o
    };
  }
  _getLabelCapacity(t) {
    const a = this.options.time, s = a.displayFormats, n = s[a.unit] || s.millisecond, o = this._tickFormatFunction(t, 0, ko(this, [
      t
    ], this._majorUnit), n), i = this._getLabelSize(o), r = Math.floor(this.isHorizontal() ? this.width / i.w : this.height / i.h) - 1;
    return r > 0 ? r : 1;
  }
  getDataTimestamps() {
    let t = this._cache.data || [], a, s;
    if (t.length)
      return t;
    const n = this.getMatchingVisibleMetas();
    if (this._normalized && n.length)
      return this._cache.data = n[0].controller.getAllParsedValues(this);
    for (a = 0, s = n.length; a < s; ++a)
      t = t.concat(n[a].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(t);
  }
  getLabelTimestamps() {
    const t = this._cache.labels || [];
    let a, s;
    if (t.length)
      return t;
    const n = this.getLabels();
    for (a = 0, s = n.length; a < s; ++a)
      t.push(yo(this, n[a]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return Uo(t.sort(mo));
  }
}
function Ba(e, t, a) {
  let s = 0, n = e.length - 1, o, i, r, l;
  a ? (t >= e[s].pos && t <= e[n].pos && ({ lo: s, hi: n } = Ce(e, "pos", t)), { pos: o, time: r } = e[s], { pos: i, time: l } = e[n]) : (t >= e[s].time && t <= e[n].time && ({ lo: s, hi: n } = Ce(e, "time", t)), { time: o, pos: r } = e[s], { time: i, pos: l } = e[n]);
  const d = i - o;
  return d ? r + (l - r) * (t - o) / d : r;
}
class BS extends wo {
  static id = "timeseries";
  static defaults = wo.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), a = this._table = this.buildLookupTable(t);
    this._minPos = Ba(a, this.min), this._tableRange = Ba(a, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: a, max: s } = this, n = [], o = [];
    let i, r, l, d, u;
    for (i = 0, r = t.length; i < r; ++i)
      d = t[i], d >= a && d <= s && n.push(d);
    if (n.length < 2)
      return [
        {
          time: a,
          pos: 0
        },
        {
          time: s,
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
    const t = this.min, a = this.max;
    let s = super.getDataTimestamps();
    return (!s.includes(t) || !s.length) && s.splice(0, 0, t), (!s.includes(a) || s.length === 1) && s.push(a), s.sort((n, o) => n - o);
  }
  _getTimestampsForTable() {
    let t = this._cache.all || [];
    if (t.length)
      return t;
    const a = this.getDataTimestamps(), s = this.getLabelTimestamps();
    return a.length && s.length ? t = this.normalize(a.concat(s)) : t = a.length ? a : s, t = this._cache.all = t, t;
  }
  getDecimalForValue(t) {
    return (Ba(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const a = this._offsets, s = this.getDecimalForPixel(t) / a.factor - a.end;
    return Ba(this._table, s * this._tableRange + this._minPos, !0);
  }
}
const Fi = {
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
}, Ru = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
}, Ou = {
  type: {
    type: String,
    required: !0
  },
  destroyDelay: {
    type: Number,
    default: 0
    // No delay by default
  },
  ...Fi,
  ...Ru
}, Vu = Ui[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function Ie(e) {
  return Io(e) ? $s(e) : e;
}
function zu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return Io(t) ? new Proxy(e, {}) : e;
}
function Nu(e, t) {
  const a = e.options;
  a && t && Object.assign(a, t);
}
function Pi(e, t) {
  e.labels = t;
}
function Ii(e, t, a) {
  const s = [];
  e.datasets = t.map((n) => {
    const o = e.datasets.find((i) => i[a] === n[a]);
    return !o || !n.data || s.includes(o) ? {
      ...n
    } : (s.push(o), Object.assign(o, n), o);
  });
}
function Wu(e, t) {
  const a = {
    labels: [],
    datasets: []
  };
  return Pi(a, e.labels), Ii(a, e.datasets, t), a;
}
const Hu = Q({
  props: Ou,
  setup(e, t) {
    let { expose: a, slots: s } = t;
    const n = tt(null), o = Po(null);
    a({
      chart: o
    });
    const i = () => {
      if (!n.value) return;
      const { type: d, data: u, options: h, plugins: p, datasetIdKey: v } = e, f = Wu(u, v), _ = zu(f, u);
      o.value = new je(n.value, {
        type: d,
        data: _,
        options: {
          ...h
        },
        plugins: p
      });
    }, r = () => {
      const d = $s(o.value);
      d && (e.destroyDelay > 0 ? setTimeout(() => {
        d.destroy(), o.value = null;
      }, e.destroyDelay) : (d.destroy(), o.value = null));
    }, l = (d) => {
      d.update(e.updateMode);
    };
    return re(i), We(r), Et([
      () => e.options,
      () => e.data
    ], (d, u) => {
      let [h, p] = d, [v, f] = u;
      const _ = $s(o.value);
      if (!_)
        return;
      let b = !1;
      if (h) {
        const g = Ie(h), m = Ie(v);
        g && g !== m && (Nu(_, g), b = !0);
      }
      if (p) {
        const g = Ie(p.labels), m = Ie(f.labels), $ = Ie(p.datasets), k = Ie(f.datasets);
        g !== m && (Pi(_.config.data, g), b = !0), $ && $ !== k && (Ii(_.config.data, $, e.datasetIdKey), b = !0);
      }
      b && St(() => {
        l(_);
      });
    }, {
      deep: !0
    }), () => ws("canvas", {
      role: "img",
      "aria-label": e.ariaLabel,
      "aria-describedby": e.ariaDescribedby,
      ref: n
    }, [
      ws("p", {}, [
        s.default ? s.default() : ""
      ])
    ]);
  }
});
function Js(e, t) {
  return je.register(t), Q({
    props: Fi,
    setup(a, s) {
      let { expose: n } = s;
      const o = Po(null), i = (r) => {
        o.value = r?.chart;
      };
      return n({
        chart: o
      }), () => ws(Hu, Vu({
        ref: i
      }, {
        type: e,
        ...a
      }));
    }
  });
}
const ju = /* @__PURE__ */ Js("bar", fc), Yu = /* @__PURE__ */ Js("line", vc), Ku = /* @__PURE__ */ Js("pie", bc), $o = {
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
}, Mo = {
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
}, Uu = [
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
  const t = tt("light");
  let a = null;
  const s = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", n = C(() => e?.value ? e.value : t.value), o = C(() => n.value === "dark"), i = C(() => o.value ? Mo : $o), r = () => {
    typeof document > "u" || (t.value = s(), a = new MutationObserver((d) => {
      for (const u of d)
        u.attributeName === "class" && (t.value = s());
    }), a.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["class"]
    }));
  }, l = () => {
    a && (a.disconnect(), a = null);
  };
  return re(() => {
    r();
  }), We(() => {
    l();
  }), e && Et(e, () => {
  }), {
    isDark: o,
    currentTheme: n,
    colors: i,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: $o,
    darkColors: Mo,
    chartSeriesColors: Uu
  };
}
const qu = { class: "chart-container" }, Xu = /* @__PURE__ */ Q({
  __name: "ChartBar",
  props: {
    data: {},
    options: {},
    stacked: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const a = e;
    je.register(
      Bi,
      Li,
      Xd,
      Ai,
      Qs,
      Zs
    );
    const { isDark: s, colors: n } = lt(rt(a, "theme")), o = a.data, i = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = C(() => a.options ? a.options : {
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
          bodyColor: s.value ? "#d1d5db" : "#e2e8f0",
          borderColor: s.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
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
          stacked: a.stacked || !1,
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
          stacked: a.stacked || !1,
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
    return t({ isDark: s }), (l, d) => (y(), x("div", qu, [
      Z(A(ju), {
        data: A(o),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), st = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [s, n] of t)
    a[s] = n;
  return a;
}, ie = /* @__PURE__ */ st(Xu, [["__scopeId", "data-v-105d8c6f"]]), Gu = { class: "chart-container" }, Zu = /* @__PURE__ */ Q({
  __name: "ChartLine",
  props: {
    data: {},
    options: {},
    theme: {}
  },
  setup(e, { expose: t }) {
    const a = e;
    je.register(
      Bi,
      Li,
      Hd,
      qa,
      Ai,
      Qs,
      Zs,
      pu
    );
    const { isDark: s, colors: n } = lt(rt(a, "theme")), o = a.data, i = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = C(() => a.options ? a.options : {
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
          bodyColor: s.value ? "#d1d5db" : "#e2e8f0",
          borderColor: s.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
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
          backgroundColor: s.value ? "#1a1a1d" : "#ffffff",
          hoverBorderWidth: 3
        }
      }
    });
    return t({ isDark: s }), (l, d) => (y(), x("div", Gu, [
      Z(A(Yu), {
        data: A(o),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), me = /* @__PURE__ */ st(Zu, [["__scopeId", "data-v-bacd3848"]]), Qu = { class: "chart-container" }, Ju = /* @__PURE__ */ Q({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const a = e;
    je.register(Fd, Qs, Zs);
    const { isDark: s, colors: n } = lt(rt(a, "theme")), o = a.data, i = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = C(() => a.options ? a.options : {
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
                const p = l.getDatasetMeta(0), v = d.datasets[0], f = v.data[h], _ = Array.isArray(v.backgroundColor) ? v.backgroundColor[h] : v.backgroundColor;
                return {
                  text: `${i(u)}: ${f}`,
                  fillStyle: _,
                  hidden: p.data[h]?.hidden || !1,
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
          bodyColor: s.value ? "#d1d5db" : "#e2e8f0",
          borderColor: s.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
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
              const d = l.label || "", u = l.parsed || 0, h = l.dataset.data.reduce((v, f) => v + f, 0), p = (u / h * 100).toFixed(1);
              return `${i(d)}: ${u} (${p}%)`;
            }
          }
        }
      },
      elements: {
        arc: {
          borderWidth: 2,
          borderColor: s.value ? "#1a1a1d" : "#ffffff",
          hoverOffset: 8
        }
      },
      animation: {
        animateRotate: !0,
        animateScale: !0
      }
    });
    return t({ isDark: s }), (l, d) => (y(), x("div", Qu, [
      Z(A(Ku), {
        data: A(o),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), Za = /* @__PURE__ */ st(Ju, [["__scopeId", "data-v-23a84317"]]), th = { class: "chart-container" }, eh = ["viewBox"], ah = ["transform"], sh = ["x", "width", "fill", "stroke"], nh = ["fill"], oh = ["x1", "y1", "x2", "y2", "stroke"], ih = ["points", "fill"], rh = ["x1", "y1", "x2", "y2", "stroke"], lh = ["x", "y", "fill"], ch = ["x1", "y1", "x2", "y2", "stroke"], dh = ["points", "fill"], uh = ["transform"], hh = ["y1", "y2"], fh = ["y1", "y2"], gh = ["y1", "y2"], ph = ["y1", "y2"], vh = ["y", "height"], bh = ["y1", "y2"], mh = ["y1", "y2"], yh = ["y1", "y2"], _h = ["y1", "y2"], xh = ["y", "height"], kh = ["cy", "stroke", "onMouseenter"], wh = ["cy", "stroke", "onMouseenter"], $h = ["cy", "stroke", "onMouseenter"], Mh = ["cy", "stroke", "onMouseenter"], Sh = ["y1", "y2", "onMouseenter"], Ch = ["y1", "y2", "onMouseenter"], Dh = ["x", "y", "fill"], Ah = ["x", "y", "fill"], Th = ["transform"], Bh = { transform: "translate(-200, 0)" }, Lh = ["stroke"], Fh = ["fill"], Ph = { transform: "translate(-130, 0)" }, Ih = ["stroke"], Eh = ["fill"], Rh = { transform: "translate(-60, 0)" }, Oh = ["stroke"], Vh = ["fill"], zh = { transform: "translate(10, 0)" }, Nh = ["stroke"], Wh = ["fill"], Hh = { transform: "translate(80, 0)" }, jh = ["fill"], Yh = { transform: "translate(150, 0)" }, Kh = ["fill"], Uh = /* @__PURE__ */ Q({
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
    const a = e, { isDark: s } = lt(rt(a, "theme")), n = C(() => ({
      // Tooltip
      tooltipBg: s.value ? "rgba(26, 26, 29, 0.98)" : "rgba(15, 23, 42, 0.95)",
      tooltipBorder: s.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
      tooltipText: s.value ? "#f8f9fa" : "#f1f5f9",
      // Axis
      axis: s.value ? "#9ca3af" : "#475569",
      // Ticks
      tickLine: s.value ? "#4b5563" : "#cbd5e1",
      tickText: s.value ? "#9ca3af" : "#64748b",
      // Labels
      labelText: s.value ? "#d1d5db" : "#475569",
      legendText: s.value ? "#d1d5db" : "#475569",
      // Dots
      dotStroke: s.value ? "#1a1a1d" : "#ffffff"
    })), o = tt({
      visible: !1,
      x: 0,
      y: 0,
      text: ""
    }), i = (p) => typeof p == "string" ? p.charAt(0).toUpperCase() + p.slice(1).toLowerCase() : p, r = (p, v) => {
      const f = p.currentTarget.closest("svg");
      if (!f) return;
      const _ = f.getBoundingClientRect(), b = f.createSVGPoint();
      b.x = p.clientX - _.left, b.y = p.clientY - _.top, o.value = {
        visible: !0,
        x: b.x,
        y: b.y - 20,
        text: v
      };
    }, l = (p) => {
      if (o.value.visible) {
        const v = p.currentTarget, f = v.getBoundingClientRect(), _ = v.createSVGPoint();
        _.x = p.clientX - f.left, _.y = p.clientY - f.top, o.value.x = _.x, o.value.y = _.y - 20;
      }
    }, d = () => {
      o.value.visible = !1;
    }, u = () => {
      o.value.visible = !1;
    }, h = C(() => {
      const p = [], f = a.chartHeight - a.chartMargin - a.chartBottomMargin;
      for (let _ = 1; _ <= 10; _++) {
        const b = _, g = (b - 1) / 9, m = a.chartMargin + f - g * f;
        p.push({ value: b, y: m });
      }
      return p;
    });
    return t({ isDark: s }), (p, v) => (y(), x("div", th, [
      (y(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: mt(`min-height: ${e.chartHeight}px;`),
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
          }, null, 8, sh),
          c("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: n.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, M(o.value.text), 9, nh)
        ], 8, ah)) : E("", !0),
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
        }, null, 8, ih),
        (y(!0), x(q, null, J(h.value, (f, _) => (y(), x(q, { key: _ }, [
          c("line", {
            x1: e.chartMargin - 6,
            y1: f.y,
            x2: e.chartMargin,
            y2: f.y,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, rh),
          c("text", {
            x: e.chartMargin - 12,
            y: f.y + 4,
            "text-anchor": "end",
            fill: n.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, M(f.value), 9, lh)
        ], 64))), 128)),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, ch),
        c("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: n.value.axis
        }, null, 8, dh),
        (y(!0), x(q, null, J(e.boxplotData, (f, _) => (y(), x(q, { key: _ }, [
          c("g", {
            transform: `translate(${f.centerX}, 0)`
          }, [
            f.isTotal ? (y(), x(q, { key: 0 }, [
              c("line", {
                x1: 0,
                y1: f.minY,
                x2: 0,
                y2: f.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, hh),
              c("line", {
                x1: 0,
                y1: f.q3Y,
                x2: 0,
                y2: f.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, fh),
              c("line", {
                x1: -18,
                y1: f.minY,
                x2: 18,
                y2: f.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, gh),
              c("line", {
                x1: -18,
                y1: f.maxY,
                x2: 18,
                y2: f.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, ph),
              c("rect", {
                x: -24,
                y: f.q3Y,
                width: "48",
                height: f.q1Y - f.q3Y,
                fill: "#8b5cf6",
                "fill-opacity": "0.15",
                stroke: "#8b5cf6",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, vh)
            ], 64)) : (y(), x(q, { key: 1 }, [
              c("line", {
                x1: 0,
                y1: f.minY,
                x2: 0,
                y2: f.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, bh),
              c("line", {
                x1: 0,
                y1: f.q3Y,
                x2: 0,
                y2: f.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, mh),
              c("line", {
                x1: -18,
                y1: f.minY,
                x2: 18,
                y2: f.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, yh),
              c("line", {
                x1: -18,
                y1: f.maxY,
                x2: 18,
                y2: f.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, _h),
              c("rect", {
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
            c("circle", {
              cx: 0,
              cy: f.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => r(b, `Min: ${f.min.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, kh),
            c("circle", {
              cx: 0,
              cy: f.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => r(b, `Q1: ${f.q1.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, wh),
            c("circle", {
              cx: 0,
              cy: f.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => r(b, `Q3: ${f.q3.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, $h),
            c("circle", {
              cx: 0,
              cy: f.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => r(b, `Max: ${f.max.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Mh),
            c("line", {
              x1: -24,
              y1: f.medianY,
              x2: 24,
              y2: f.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (b) => r(b, `Median: ${f.median.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Sh),
            f.averageY ? (y(), x("line", {
              key: 2,
              x1: -24,
              y1: f.averageY,
              x2: 24,
              y2: f.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (b) => r(b, `Avg: ${f.average.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Ch)) : E("", !0)
          ], 8, uh),
          c("text", {
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: n.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, M(i(f.label)), 9, Dh),
          f.responseCount ? (y(), x("text", {
            key: 0,
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: n.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + M(f.responseCount), 9, Ah)) : E("", !0)
        ], 64))), 128)),
        e.showLegend ? (y(), x("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          c("g", Bh, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Lh),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Fh)
          ]),
          c("g", Ph, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Ih),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, Eh)
          ]),
          c("g", Rh, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
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
            }, " Q3 ", 8, Vh)
          ]),
          c("g", zh, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Nh),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Wh)
          ]),
          c("g", Hh, [
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
            }, " Avg ", 8, jh)
          ]),
          c("g", Yh, [
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
            }, " Median ", 8, Kh)
          ])
        ], 8, Th)) : E("", !0)
      ], 44, eh))
    ]));
  }
}), qh = /* @__PURE__ */ st(Uh, [["__scopeId", "data-v-520c623f"]]), Xh = { class: "chart-container" }, Gh = ["viewBox"], Zh = ["transform"], Qh = ["x", "y", "width", "height", "fill", "stroke"], Jh = ["y", "fill"], tf = ["y", "fill"], ef = ["x1", "y1", "x2", "y2", "stroke"], af = ["points", "fill"], sf = ["x1", "y1", "x2", "y2", "stroke"], nf = ["x1", "y1", "x2", "y2", "stroke"], of = ["x", "y", "fill"], rf = ["x", "y", "fill", "transform"], lf = ["x1", "y1", "x2", "y2", "stroke"], cf = ["points", "fill"], df = ["transform"], uf = ["y1", "y2", "stroke", "onMouseenter"], hf = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], ff = ["x1", "y1", "x2", "y2", "onMouseenter"], gf = ["x1", "y1", "x2", "y2", "onMouseenter"], pf = ["cy", "stroke", "onMouseenter"], vf = ["cy", "stroke", "onMouseenter"], bf = ["x", "y", "fill"], mf = ["x", "y", "fill"], yf = ["transform"], _f = { transform: "translate(-180, 0)" }, xf = ["stroke"], kf = ["fill"], wf = { transform: "translate(-120, 0)" }, $f = ["fill"], Mf = { transform: "translate(-60, 0)" }, Sf = ["fill"], Cf = { transform: "translate(0, 0)" }, Df = ["stroke"], Af = ["fill"], Tf = { transform: "translate(60, 0)" }, Bf = ["fill"], Lf = { transform: "translate(130, 0)" }, Ff = ["fill"], Pf = /* @__PURE__ */ Q({
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
    const a = e, { isDark: s } = lt(rt(a, "theme")), n = C(() => ({
      // Tooltip
      tooltipBg: s.value ? "rgba(26, 26, 29, 0.98)" : "rgba(15, 23, 42, 0.95)",
      tooltipBorder: s.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
      tooltipText: s.value ? "#f8f9fa" : "#f1f5f9",
      tooltipTextSecondary: s.value ? "#d1d5db" : "#e2e8f0",
      // Axis
      axis: s.value ? "#9ca3af" : "#475569",
      // Grid
      gridLine: s.value ? "#374151" : "#e5e7eb",
      // Ticks
      tickLine: s.value ? "#4b5563" : "#cbd5e1",
      tickText: s.value ? "#9ca3af" : "#64748b",
      // Labels
      labelText: s.value ? "#d1d5db" : "#475569",
      legendText: s.value ? "#d1d5db" : "#475569",
      // Dots
      dotStroke: s.value ? "#1a1a1d" : "#ffffff"
    })), o = tt({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), i = (p) => typeof p == "string" ? p.charAt(0).toUpperCase() + p.slice(1).toLowerCase() : p, r = (p, v, f) => {
      const _ = p.currentTarget.closest("svg");
      if (!_) return;
      const b = _.getBoundingClientRect(), g = _.createSVGPoint();
      g.x = p.clientX - b.left, g.y = p.clientY - b.top;
      let m = i(v.label), $ = "";
      switch (f) {
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
        x: g.x,
        y: g.y - 20,
        title: m,
        text: $,
        width: k,
        height: w
      };
    }, l = (p) => {
      if (o.value.visible) {
        const v = p.currentTarget, f = v.getBoundingClientRect(), _ = v.createSVGPoint();
        _.x = p.clientX - f.left, _.y = p.clientY - f.top, o.value.x = _.x, o.value.y = _.y - 20;
      }
    }, d = () => {
      o.value.visible = !1;
    }, u = () => {
      o.value.visible = !1;
    }, h = C(() => {
      const p = [], f = a.chartHeight - a.chartMargin - a.chartBottomMargin;
      for (let _ = 1; _ <= 10; _++) {
        const b = _, g = (b - 1) / 9, m = a.chartMargin + f - g * f;
        p.push({ value: b, y: m });
      }
      return p;
    });
    return t({ isDark: s }), (p, v) => (y(), x("div", Xh, [
      (y(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: mt(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
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
          }, null, 8, Qh),
          c("text", {
            x: "0",
            y: -o.value.height + 8,
            "text-anchor": "middle",
            fill: n.value.tooltipText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, M(o.value.title), 9, Jh),
          c("text", {
            x: "0",
            y: -o.value.height + 26,
            "text-anchor": "middle",
            fill: n.value.tooltipTextSecondary,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, M(o.value.text), 9, tf)
        ], 8, Zh)) : E("", !0),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, ef),
        c("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: n.value.axis
        }, null, 8, af),
        (y(!0), x(q, null, J(h.value, (f, _) => (y(), x("line", {
          key: `grid-${_}`,
          x1: e.chartMargin,
          y1: f.y,
          x2: e.chartWidth - e.chartMargin,
          y2: f.y,
          stroke: n.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, sf))), 128)),
        (y(!0), x(q, null, J(h.value, (f, _) => (y(), x(q, { key: _ }, [
          c("line", {
            x1: e.chartMargin - 6,
            y1: f.y,
            x2: e.chartMargin,
            y2: f.y,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, nf),
          c("text", {
            x: e.chartMargin - 12,
            y: f.y + 4,
            "text-anchor": "end",
            fill: n.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, M(f.value), 9, of)
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
        }, M(i(e.yAxisLabel)), 9, rf),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, lf),
        c("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: n.value.axis
        }, null, 8, cf),
        (y(!0), x(q, null, J(e.candlestickData, (f, _) => (y(), x(q, { key: _ }, [
          c("g", {
            transform: `translate(${f.centerX}, 0)`
          }, [
            c("line", {
              x1: 0,
              y1: f.highY,
              x2: 0,
              y2: f.lowY,
              stroke: f.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              class: "hover-line",
              onMouseenter: (b) => r(b, f, "wick"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, uf),
            c("rect", {
              x: -e.candleWidth / 2,
              y: Math.min(f.q1Y, f.q3Y) - (Math.abs(f.q3Y - f.q1Y) < 4 ? 4 : 0),
              width: e.candleWidth,
              height: Math.max(8, Math.abs(f.q3Y - f.q1Y)),
              fill: f.isTotal ? "rgba(139, 92, 246, 0.15)" : "rgba(198, 125, 255, 0.15)",
              stroke: f.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              rx: "4",
              class: "hover-rect",
              onMouseenter: (b) => r(b, f, "body"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, hf),
            f.medianY ? (y(), x("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: f.medianY,
              x2: e.candleWidth / 2,
              y2: f.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (b) => r(b, f, "median"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, ff)) : E("", !0),
            f.averageY ? (y(), x("line", {
              key: 1,
              x1: -e.candleWidth / 2,
              y1: f.averageY,
              x2: e.candleWidth / 2,
              y2: f.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (b) => r(b, f, "average"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, gf)) : E("", !0),
            c("circle", {
              cx: 0,
              cy: f.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => r(b, f, "min"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, pf),
            c("circle", {
              cx: 0,
              cy: f.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => r(b, f, "max"),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, vf)
          ], 8, df),
          c("text", {
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: n.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, M(i(f.label)), 9, bf),
          f.responseCount ? (y(), x("text", {
            key: 0,
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: n.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + M(f.responseCount), 9, mf)) : E("", !0)
        ], 64))), 128)),
        e.showLegend ? (y(), x("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          c("g", _f, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
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
            }, " Min ", 8, kf)
          ]),
          c("g", wf, [
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
            }, " Q1 ", 8, $f)
          ]),
          c("g", Mf, [
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
            }, " Q3 ", 8, Sf)
          ]),
          c("g", Cf, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Df),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Af)
          ]),
          c("g", Tf, [
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
            }, " Avg ", 8, Bf)
          ]),
          c("g", Lf, [
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
            }, " Median ", 8, Ff)
          ])
        ], 8, yf)) : E("", !0)
      ], 44, Gh))
    ]));
  }
}), Ei = /* @__PURE__ */ st(Pf, [["__scopeId", "data-v-61d0259c"]]), If = { class: "chart-container" }, Ef = ["viewBox"], Rf = ["transform"], Of = ["x", "y", "width", "height", "fill", "stroke"], Vf = ["y", "fill"], zf = ["y", "fill"], Nf = ["x1", "y1", "x2", "y2", "stroke"], Wf = ["x1", "y1", "x2", "y2", "stroke"], Hf = ["points", "fill"], jf = ["x1", "y1", "x2", "y2", "stroke"], Yf = ["x", "y", "fill"], Kf = ["x", "y", "fill", "transform"], Uf = ["x1", "y1", "x2", "y2", "stroke"], qf = ["points", "fill"], Xf = ["x1", "y1", "x2", "y2", "stroke"], Gf = ["x", "y", "fill"], Zf = ["x", "y", "fill"], Qf = ["d"], Jf = ["x", "y", "width", "height", "onMouseenter"], tg = ["x1", "y1", "x2", "y2"], eg = ["x", "y"], ag = ["x1", "y1", "x2", "y2"], sg = ["x", "y"], ng = ["x1", "y1", "x2", "y2"], og = ["x", "y"], ig = ["x1", "y1", "x2", "y2"], rg = ["x", "y"], lg = ["x1", "y1", "x2", "y2"], cg = ["x", "y"], dg = ["x1", "y1", "x2", "y2"], ug = ["x", "y"], hg = ["transform"], fg = { transform: "translate(-220, 0)" }, gg = ["fill"], pg = { transform: "translate(-140, 0)" }, vg = ["fill"], bg = { transform: "translate(-80, 0)" }, mg = ["fill"], yg = { transform: "translate(-20, 0)" }, _g = ["fill"], xg = { transform: "translate(60, 0)" }, kg = ["fill"], wg = { transform: "translate(130, 0)" }, $g = ["fill"], Mg = { transform: "translate(180, 0)" }, Sg = ["fill"], Cg = /* @__PURE__ */ Q({
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
    const a = e, { isDark: s } = lt(rt(a, "theme")), n = C(() => ({
      // Tooltip
      tooltipBg: s.value ? "rgba(26, 26, 29, 0.98)" : "rgba(15, 23, 42, 0.95)",
      tooltipBorder: s.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
      tooltipText: s.value ? "#f8f9fa" : "#f1f5f9",
      tooltipTextSecondary: s.value ? "#d1d5db" : "#e2e8f0",
      // Axis
      axis: s.value ? "#9ca3af" : "#475569",
      // Grid
      gridLine: s.value ? "#374151" : "#e5e7eb",
      // Ticks
      tickLine: s.value ? "#4b5563" : "#cbd5e1",
      tickText: s.value ? "#9ca3af" : "#64748b",
      // Labels
      labelText: s.value ? "#d1d5db" : "#475569",
      legendText: s.value ? "#d1d5db" : "#475569"
    })), o = tt({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), i = C(() => a.chartWidth - a.chartMargin * 2), r = C(() => a.chartHeight - a.chartMargin - a.chartBottomMargin), l = C(() => i.value / 10 * 0.6), d = C(() => {
      if (!a.histogram || a.histogram.length === 0) return 1;
      const N = Math.max(...a.histogram.map((K) => K.count || 0), 1), j = Math.max(1, Math.ceil(N * 0.2));
      return N + j;
    }), u = C(() => {
      if (!a.histogram || a.histogram.length === 0) return 1;
      const N = a.averageScore || 0;
      let j = 0, K = 0;
      if (a.histogram.forEach((et) => {
        const G = et.count || 0;
        j += G;
        const dt = et.score - N;
        K += G * (dt * dt);
      }), j === 0) return 1;
      const nt = K / j;
      return Math.sqrt(nt) || 1;
    }), h = (N, j, K) => {
      if (K === 0) return 0;
      const nt = 1 / (K * Math.sqrt(2 * Math.PI)), et = -0.5 * Math.pow((N - j) / K, 2);
      return nt * Math.exp(et);
    }, p = C(() => {
      if (!a.histogram || a.histogram.length === 0 || a.averageScore === 0 && u.value === 0) return null;
      const N = a.averageScore, j = u.value, K = 100, et = Math.max(...a.histogram.map((gt) => gt.count || 0), 1) / d.value * r.value;
      if (et <= 0) return null;
      let G = 0;
      for (let gt = 0; gt <= K; gt++) {
        const Pt = 1 + 9 * (gt / K), zt = h(Pt, N, j);
        zt > G && (G = zt);
      }
      if (G <= 0) return null;
      const dt = et / G, wt = [];
      for (let gt = 0; gt <= K; gt++) {
        const Pt = 1 + 9 * (gt / K), zt = h(Pt, N, j) * dt, Kt = f(Pt);
        if (Kt !== null) {
          const it = a.chartHeight - a.chartBottomMargin - zt;
          wt.push(`${gt === 0 ? "M" : "L"} ${Kt} ${it}`);
        }
      }
      return wt.join(" ");
    }), v = C(() => {
      if (!a.histogram || a.histogram.length === 0) return [];
      const N = i.value / 10;
      return a.histogram.map((j, K) => {
        const nt = a.chartMargin + (K + 0.5) * N, et = j.count > 0 ? j.count / d.value * r.value : 0, G = a.chartHeight - a.chartBottomMargin - et;
        return {
          score: j.score,
          count: j.count,
          x: nt,
          y: G,
          height: et
        };
      });
    }), f = (N) => {
      if (N < 1 || N > 10) return null;
      const j = i.value / 10;
      return a.chartMargin + (N - 0.5) * j;
    }, _ = C(() => f(a.minScore)), b = C(() => f(a.maxScore)), g = C(() => f(a.q1Score)), m = C(() => f(a.medianScore)), $ = C(() => f(a.q3Score)), k = C(() => f(a.averageScore)), w = C(() => a.minScore), S = C(() => a.maxScore), D = C(() => a.q1Score), T = C(() => a.medianScore), O = C(() => a.q3Score), P = C(() => a.averageScore), B = C(() => {
      const N = [], j = a.chartMargin - 8, K = 18;
      g.value !== null && N.push({
        x: g.value,
        y: j,
        value: a.q1Score,
        label: `Q1: ${D.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), m.value !== null && N.push({
        x: m.value,
        y: j - K,
        value: a.medianScore,
        label: `Median: ${T.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), k.value !== null && N.push({
        x: k.value,
        y: j - K,
        value: a.averageScore,
        label: `Avg: ${P.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), $.value !== null && N.push({
        x: $.value,
        y: j,
        value: a.q3Score,
        label: `Q3: ${O.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), N.sort((G, dt) => (G.x || 0) - (dt.x || 0));
      const nt = [[], [], []];
      N.forEach((G) => {
        if (G.x === null) return;
        let dt = -1;
        for (let wt = 0; wt < nt.length; wt++) {
          let gt = !1;
          for (const Pt of nt[wt]) {
            if (Pt.x === null) continue;
            const zt = Math.abs(G.x - Pt.x), Kt = (G.width + Pt.width) / 2 + 10;
            if (zt < Kt) {
              gt = !0;
              break;
            }
          }
          if (!gt) {
            dt = wt;
            break;
          }
        }
        dt === -1 && (dt = nt.length - 1), G.y = j - dt * K, nt[dt].push(G);
      });
      const et = 15;
      return N.forEach((G) => {
        G.y < et && (G.y = et);
      }), N;
    }), R = (N) => B.value.find((K) => K.id === N)?.y || a.chartMargin - 10, H = C(() => {
      const N = [];
      for (let K = 0; K <= 5; K++) {
        const nt = Math.round(d.value / 5 * K), et = a.chartHeight - a.chartBottomMargin - K / 5 * r.value;
        N.push({ value: nt, y: et });
      }
      return N;
    }), L = (N, j) => {
      const K = N.currentTarget.closest("svg");
      if (!K) return;
      const nt = K.getBoundingClientRect(), et = K.createSVGPoint();
      et.x = N.clientX - nt.left, et.y = N.clientY - nt.top;
      const G = `Score: ${j.score}`, dt = `Count: ${j.count}`, wt = 120, gt = 48;
      o.value = {
        visible: !0,
        x: et.x,
        y: et.y - 20,
        title: G,
        text: dt,
        width: wt,
        height: gt
      };
    }, I = (N) => {
      if (o.value.visible) {
        const j = N.currentTarget, K = j.getBoundingClientRect(), nt = j.createSVGPoint();
        nt.x = N.clientX - K.left, nt.y = N.clientY - K.top, o.value.x = nt.x, o.value.y = nt.y - 20;
      }
    }, V = () => {
      o.value.visible = !1;
    }, W = () => {
      o.value.visible = !1;
    };
    return t({ isDark: s }), (N, j) => (y(), x("div", If, [
      (y(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: mt(`min-height: ${e.chartHeight}px;`),
        onMousemove: I,
        onMouseleave: V
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
          }, null, 8, Of),
          c("text", {
            x: "0",
            y: -o.value.height + 8,
            "text-anchor": "middle",
            fill: n.value.tooltipText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, M(o.value.title), 9, Vf),
          c("text", {
            x: "0",
            y: -o.value.height + 26,
            "text-anchor": "middle",
            fill: n.value.tooltipTextSecondary,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, M(o.value.text), 9, zf)
        ], 8, Rf)) : E("", !0),
        (y(!0), x(q, null, J(H.value, (K, nt) => (y(), x("line", {
          key: `grid-${nt}`,
          x1: e.chartMargin,
          y1: K.y,
          x2: e.chartWidth - e.chartMargin,
          y2: K.y,
          stroke: n.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Nf))), 128)),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, Wf),
        c("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: n.value.axis
        }, null, 8, Hf),
        (y(!0), x(q, null, J(H.value, (K, nt) => (y(), x(q, {
          key: `y-tick-${nt}`
        }, [
          c("line", {
            x1: e.chartMargin - 6,
            y1: K.y,
            x2: e.chartMargin,
            y2: K.y,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, jf),
          c("text", {
            x: e.chartMargin - 12,
            y: K.y + 4,
            "text-anchor": "end",
            fill: n.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, M(K.value), 9, Yf)
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
        }, " Count ", 8, Kf),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, Uf),
        c("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: n.value.axis
        }, null, 8, qf),
        (y(!0), x(q, null, J(v.value, (K, nt) => (y(), x(q, {
          key: `tick-${nt}`
        }, [
          c("line", {
            x1: K.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: K.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Xf),
          c("text", {
            x: K.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: n.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, M(K.score), 9, Gf)
        ], 64))), 128)),
        c("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: n.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, Zf),
        p.value ? (y(), x("path", {
          key: 1,
          d: p.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, Qf)) : E("", !0),
        (y(!0), x(q, null, J(v.value, (K, nt) => (y(), x("rect", {
          key: `bar-${nt}`,
          x: K.x - l.value / 2,
          y: K.y,
          width: l.value,
          height: K.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (et) => L(et, K),
          onMouseleave: W,
          style: { cursor: "pointer" }
        }, null, 40, Jf))), 128)),
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
        }, null, 8, tg)) : E("", !0),
        _.value ? (y(), x("text", {
          key: 3,
          x: _.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + M(w.value.toFixed(1)), 9, eg)) : E("", !0),
        g.value ? (y(), x("line", {
          key: 4,
          x1: g.value,
          y1: e.chartMargin,
          x2: g.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, ag)) : E("", !0),
        g.value ? (y(), x("text", {
          key: 5,
          x: g.value,
          y: R("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + M(D.value.toFixed(1)), 9, sg)) : E("", !0),
        m.value ? (y(), x("line", {
          key: 6,
          x1: m.value,
          y1: e.chartMargin,
          x2: m.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, ng)) : E("", !0),
        m.value ? (y(), x("text", {
          key: 7,
          x: m.value,
          y: R("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + M(T.value.toFixed(1)), 9, og)) : E("", !0),
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
        }, null, 8, ig)) : E("", !0),
        k.value ? (y(), x("text", {
          key: 9,
          x: k.value,
          y: R("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + M(P.value.toFixed(1)), 9, rg)) : E("", !0),
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
        }, null, 8, lg)) : E("", !0),
        $.value ? (y(), x("text", {
          key: 11,
          x: $.value,
          y: R("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + M(O.value.toFixed(1)), 9, cg)) : E("", !0),
        b.value ? (y(), x("line", {
          key: 12,
          x1: b.value,
          y1: e.chartMargin,
          x2: b.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, dg)) : E("", !0),
        b.value ? (y(), x("text", {
          key: 13,
          x: b.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + M(S.value.toFixed(1)), 9, ug)) : E("", !0),
        e.showLegend ? (y(), x("g", {
          key: 14,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          c("g", fg, [
            j[0] || (j[0] = c("line", {
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
            }, " Gaussian ", 8, gg)
          ]),
          c("g", pg, [
            j[1] || (j[1] = c("line", {
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
            }, " Min ", 8, vg)
          ]),
          c("g", bg, [
            j[2] || (j[2] = c("line", {
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
            }, " Q1 ", 8, mg)
          ]),
          c("g", yg, [
            j[3] || (j[3] = c("line", {
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
            }, " Median ", 8, _g)
          ]),
          c("g", xg, [
            j[4] || (j[4] = c("line", {
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
            }, " Avg ", 8, kg)
          ]),
          c("g", wg, [
            j[5] || (j[5] = c("line", {
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
            }, " Q3 ", 8, $g)
          ]),
          c("g", Mg, [
            j[6] || (j[6] = c("line", {
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
            }, " Max ", 8, Sg)
          ])
        ], 8, hg)) : E("", !0)
      ], 44, Ef))
    ]));
  }
}), Ri = /* @__PURE__ */ st(Cg, [["__scopeId", "data-v-64e657d9"]]), Dg = { class: "chart-container" }, Ag = {
  key: 1,
  class: "chart-wrapper"
}, Tg = /* @__PURE__ */ Q({
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
    an.use([qi, Xi, Gi, Zi]);
    const a = e, { isDark: s, colors: n } = lt(rt(a, "theme")), o = tt(null), i = tt(!0), r = tt(!1);
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
      const $ = a.data.links.filter(
        (D) => D.source && D.target && typeof D.value == "number"
      ), k = Math.max(...$.map((D) => D.value), 1), w = Math.max(1, k * 0.01), S = $.map((D) => ({
        ...D,
        originalValue: D.value,
        value: D.value < k * 0.01 ? w : D.value
      }));
      return {
        nodes: a.data.nodes.filter((D) => D.name),
        links: S
      };
    }, p = ($) => $.map((k, w) => ({
      ...k,
      itemStyle: {
        color: a.nodeColors[k.name] || u[w % u.length],
        borderRadius: 8
      }
    })), v = ($) => (k) => {
      const w = k.dataType === "node", S = n.value.tooltipText, D = s.value ? "#d1d5db" : "#e2e8f0";
      if (w) {
        const R = $.filter((I) => I.target === k.name), H = $.filter((I) => I.source === k.name), L = R.length > 0 ? R.reduce((I, V) => I + (V.originalValue || V.value), 0) : H.reduce((I, V) => I + (V.originalValue || V.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${S};">${k.name}</div><div style="color: ${D}; font-size: 12px;">Count: ${L.toLocaleString()}</div>`;
      }
      const T = k.data?.source || k.source || "Unknown", O = k.data?.target || k.target || "Unknown", P = k.data?.originalValue || k.data?.value || k.value || 0, B = k.data?.label || `${P.toLocaleString()}`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${S};">${T} → ${O}</div><div style="color: ${D}; font-size: 12px;">Flow: ${B}</div>`;
    }, f = () => {
      if (!(!l || !a.data.nodes?.length || !a.data.links?.length))
        try {
          const { nodes: $, links: k } = h(), w = p($), S = {
            tooltip: {
              trigger: "item",
              triggerOn: "mousemove",
              formatter: v(k),
              backgroundColor: n.value.tooltipBg,
              borderColor: s.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
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
                  color: a.useGradient ? "gradient" : "source",
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
                  formatter: (D) => {
                    const T = D.name || "";
                    return T.length > 15 ? `${T.substring(0, 15)}...` : T;
                  }
                },
                edgeLabel: {
                  show: !0,
                  fontSize: 11,
                  color: n.value.textSecondary,
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  formatter: (D) => {
                    const T = D.data?.originalValue || D.value || 0;
                    return D.data?.label || `${T.toLocaleString()}`;
                  }
                },
                nodeAlign: d.node.align,
                nodeGap: a.nodeGap,
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
          l = an.init(o.value), f(), window.addEventListener("resize", g);
        } catch ($) {
          console.error("Error initializing Sankey chart:", $), r.value = !0;
        } finally {
          i.value = !1;
        }
    }, b = async ($ = 40) => {
      await St();
      for (let k = 0; k < $; k++) {
        if (o.value?.clientWidth && o.value.clientWidth > 0 && o.value?.clientHeight && o.value.clientHeight > 0)
          return await _();
        await new Promise((w) => setTimeout(w, 50));
      }
      await _(), setTimeout(g, 50);
    }, g = () => l?.resize(), m = () => {
      window.removeEventListener("resize", g), l && (l.dispose(), l = null);
    };
    return re(() => o.value && b()), Eo(m), Et(() => a.data, f, { deep: !0 }), Et(s, f), t({ isDark: s }), ($, k) => (y(), x("div", Dg, [
      r.value ? (y(), x("div", {
        key: 0,
        class: "error-state",
        style: mt({ height: e.height })
      }, [...k[0] || (k[0] = [
        at('<div class="error-content" data-v-d6d61034><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d6d61034><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-d6d61034></path></svg><p class="error-title" data-v-d6d61034>Chart could not be loaded</p><p class="error-description" data-v-d6d61034>Please check the data format.</p></div>', 1)
      ])], 4)) : (y(), x("div", Ag, [
        Ut(c("div", {
          ref_key: "chartEl",
          ref: o,
          class: "chart-content",
          style: mt({ height: e.height })
        }, null, 4), [
          [ra, !i.value]
        ]),
        Ut(c("div", {
          class: "loading-state",
          style: mt({ height: e.height })
        }, [...k[1] || (k[1] = [
          at('<div class="loading-container" data-v-d6d61034><div class="sankey-loader" data-v-d6d61034><div class="flow flow-1" data-v-d6d61034></div><div class="flow flow-2" data-v-d6d61034></div><div class="flow flow-3" data-v-d6d61034></div><div class="flow flow-4" data-v-d6d61034></div></div><p class="loading-text" data-v-d6d61034>Loading Sankey diagram...</p></div>', 1)
        ])], 4), [
          [ra, i.value]
        ])
      ]))
    ]));
  }
}), ye = /* @__PURE__ */ st(Tg, [["__scopeId", "data-v-d6d61034"]]);
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
      d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
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
      d: "M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
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
      d: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
    })
  ]);
}
function Oi(e, t) {
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
function Vt(e, t) {
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
      d: "M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
    }),
    c("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
    })
  ]);
}
function Vi(e, t) {
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
function Ig(e, t) {
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
function Eg(e, t) {
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
function Rg(e, t) {
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
      d: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    })
  ]);
}
function So(e, t) {
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
function Og(e, t) {
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
function Vg(e, t) {
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
function zg(e, t) {
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
function Ng(e, t) {
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
function zi(e, t) {
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
const Wg = { class: "chart-footer" }, Hg = { class: "export-actions" }, jg = { class: "export-buttons" }, Yg = ["disabled"], Kg = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Ug = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, qg = ["disabled"], Xg = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Gg = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Zg = /* @__PURE__ */ Q({
  __name: "FooterExport",
  props: {
    formats: { default: () => ["pdf", "csv"] },
    loading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const a = e, s = t, n = (i) => a.formats.includes(i), o = (i) => {
      a.loading || s("export", i);
    };
    return (i, r) => (y(), x("footer", Wg, [
      r[9] || (r[9] = c("div", { class: "footer-divider" }, null, -1)),
      c("div", Hg, [
        r[8] || (r[8] = c("span", { class: "export-label" }, "Export", -1)),
        c("div", jg, [
          n("pdf") ? (y(), x("button", {
            key: 0,
            type: "button",
            class: Y(["export-btn", { "is-loading": e.loading }]),
            disabled: e.loading,
            title: "Download PDF",
            onClick: r[0] || (r[0] = (l) => o("pdf"))
          }, [
            e.loading ? (y(), x("svg", Kg, [...r[2] || (r[2] = [
              c("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                "stroke-opacity": "0.25"
              }, null, -1),
              c("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
            ])])) : (y(), x("svg", Ug, [...r[3] || (r[3] = [
              at('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-672661d4></path><polyline points="14 2 14 8 20 8" data-v-672661d4></polyline><line x1="16" y1="13" x2="8" y2="13" data-v-672661d4></line><line x1="16" y1="17" x2="8" y2="17" data-v-672661d4></line><polyline points="10 9 9 9 8 9" data-v-672661d4></polyline>', 5)
            ])])),
            r[4] || (r[4] = c("span", null, "PDF", -1))
          ], 10, Yg)) : E("", !0),
          n("csv") ? (y(), x("button", {
            key: 1,
            type: "button",
            class: Y(["export-btn", { "is-loading": e.loading }]),
            disabled: e.loading,
            title: "Download CSV",
            onClick: r[1] || (r[1] = (l) => o("csv"))
          }, [
            e.loading ? (y(), x("svg", Xg, [...r[5] || (r[5] = [
              c("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                "stroke-opacity": "0.25"
              }, null, -1),
              c("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
            ])])) : (y(), x("svg", Gg, [...r[6] || (r[6] = [
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
          ], 10, qg)) : E("", !0)
        ])
      ])
    ]));
  }
}), xt = /* @__PURE__ */ st(Zg, [["__scopeId", "data-v-672661d4"]]), Qg = { class: "agents-per-day-card" }, Jg = {
  key: 0,
  class: "card-body"
}, tp = {
  key: 0,
  class: "chart-section"
}, ep = {
  key: 1,
  class: "empty-state"
}, ap = { class: "empty-state-content" }, sp = { class: "empty-icon-wrapper" }, np = {
  key: 1,
  class: "loading-state"
}, op = /* @__PURE__ */ Q({
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
    const s = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, n = e, o = a, i = (p) => {
      o("export", p);
    }, { isDark: r, colors: l } = lt(rt(n, "theme")), d = (p) => {
      const v = new Date(p), f = String(v.getDate()).padStart(2, "0"), _ = String(v.getMonth() + 1).padStart(2, "0");
      return `${f}-${_}`;
    }, u = C(() => {
      const p = n.data?.agents_by_day || {}, v = Object.keys(p).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const f = v.map(($) => d($)), _ = /* @__PURE__ */ new Set();
      for (const $ of Object.values(p))
        for (const k of Object.keys($))
          _.add(k);
      const b = Array.from(_), g = ($) => $, m = b.map(($) => ({
        label: $,
        data: v.map((k) => p[k]?.[$] || 0),
        backgroundColor: `${s[$] || "#94a3b8"}80`,
        borderColor: g(s[$] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: f,
        datasets: m
      };
    }), h = C(() => n.options ? n.options : {
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
    return t({ isDark: r }), (p, v) => (y(), x("article", Qg, [
      v[3] || (v[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Agents Total Messages per Day"),
          c("p", { class: "card-subtitle" }, "Daily agent interactions (stacked)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", np, [...v[2] || (v[2] = [
        at('<div class="loading-container" data-v-4d18c22c><div class="chart-lines-loader" data-v-4d18c22c><div class="line line-1" data-v-4d18c22c></div><div class="line line-2" data-v-4d18c22c></div><div class="line line-3" data-v-4d18c22c></div><div class="line line-4" data-v-4d18c22c></div><div class="line line-5" data-v-4d18c22c></div></div><p class="loading-text" data-v-4d18c22c>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", Jg, [
        u.value.labels && u.value.labels.length ? (y(), x("section", tp, [
          Z(ie, {
            data: u.value,
            options: h.value,
            stacked: !0
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ct(A(xt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", ep, [
          c("div", ap, [
            c("div", sp, [
              Z(A(Vt), { class: "empty-icon" })
            ]),
            v[0] || (v[0] = c("p", { class: "empty-title" }, "No agents data per day", -1)),
            v[1] || (v[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see daily agent interactions.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), ip = /* @__PURE__ */ st(op, [["__scopeId", "data-v-4d18c22c"]]), U = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), ft = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), rp = { class: "booking-manager-card" }, lp = { class: "card-header" }, cp = { class: "header-content" }, dp = {
  key: 0,
  class: "payment-success-badge"
}, up = {
  key: 0,
  class: "currency-breakdown-list"
}, hp = {
  key: 1,
  class: "badge-value"
}, fp = {
  key: 0,
  class: "loading-state"
}, gp = {
  key: 1,
  class: "error-state"
}, pp = { class: "error-content" }, vp = { class: "error-description" }, bp = {
  key: 2,
  class: "card-body"
}, mp = { class: "chart-section" }, yp = { class: "chart-wrapper" }, _p = {
  key: 0,
  class: "table-section"
}, xp = { class: "table-wrapper" }, kp = { class: "data-table" }, wp = { class: "table-body" }, $p = { class: "table-cell font-medium" }, Mp = { class: "table-cell text-center" }, Sp = { class: "table-cell text-center" }, Cp = { class: "percentage-text" }, Dp = { class: "table-cell text-center" }, Ap = { class: "table-cell" }, Tp = { class: "badges-container" }, Bp = { class: "badge badge-success" }, Lp = { class: "badge badge-error" }, Fp = { class: "table-cell" }, Pp = {
  key: 0,
  class: "badges-container"
}, Ip = {
  key: 1,
  class: "percentage-text"
}, Ep = { class: "table-cell" }, Rp = { class: "badges-container" }, Op = { class: "badge badge-error" }, Vp = { class: "badge badge-warning" }, zp = { class: "badge badge-yellow" }, Np = { class: "badge badge-error" }, Wp = {
  key: 1,
  class: "empty-state"
}, fs = 3, Hp = /* @__PURE__ */ Q({
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
    const a = e, s = t, n = (b) => {
      s("export", b);
    }, o = tt(!1), i = C(() => a.data?.booking_manager_by_day ? [...a.data.booking_manager_by_day].sort(
      (b, g) => new Date(b.date).getTime() - new Date(g.date).getTime()
    ) : []), r = C(() => o.value ? i.value : i.value.slice(0, fs)), l = C(() => i.value.length > fs), d = C(() => a.data?.total_payment_success_value || []), u = (b) => b.payment_success_value || [], h = (b) => typeof b.payment_success_count == "number" ? b.payment_success_count : (b.payment_success_value || []).reduce((g, m) => g + (m.count || 0), 0), p = (b) => ft(b), v = C(() => {
      const b = a.data, g = b.total_booking_initiated || 0, m = b.total_booking_started || 0, $ = b.total_payment_initiated || 0, k = b.total_not_found || 0, w = b.total_cancelled || 0, S = b.total_no_pending_balance || 0, D = b.total_errors || 0, T = typeof b.total_payment_success == "number" ? b.total_payment_success : (b.total_payment_success_value || []).reduce((I, V) => I + (V.count || 0), 0), O = b.total_payment_failed || 0, P = Math.max(0, g - m), B = Math.max(0, m - $ - k - w - S - D), R = (I, V) => {
        const W = V > 0 ? Math.round(I / V * 100) : 0;
        return `${I.toLocaleString()} (${W}%)`;
      }, H = [
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
      ], L = [];
      return m > 0 && L.push({
        source: "Initiated",
        target: "Started",
        value: m,
        label: R(m, g)
      }), P > 0 && L.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: P,
        label: R(P, g)
      }), $ > 0 && L.push({
        source: "Started",
        target: "Payment Initiated",
        value: $,
        label: R($, m)
      }), k > 0 && L.push({
        source: "Started",
        target: "Not Found",
        value: k,
        label: R(k, m)
      }), w > 0 && L.push({
        source: "Started",
        target: "Cancelled",
        value: w,
        label: R(w, m)
      }), S > 0 && L.push({
        source: "Started",
        target: "No Pending Balance",
        value: S,
        label: R(S, m)
      }), D > 0 && L.push({
        source: "Started",
        target: "Errors",
        value: D,
        label: R(D, m)
      }), B > 0 && L.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: B,
        label: R(B, m)
      }), T > 0 && L.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: T,
        label: R(T, $)
      }), O > 0 && L.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: O,
        label: R(O, $)
      }), { nodes: H, links: L };
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
    }, _ = (b, g) => !g || g === 0 ? "0%" : `${Math.round(b / g * 100)}%`;
    return (b, g) => (y(), x("article", rp, [
      c("header", lp, [
        c("div", cp, [
          g[2] || (g[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Booking Manager Metrics"),
            c("p", { class: "card-subtitle" }, "Booking manager workflow tracking and analysis")
          ], -1)),
          a.loading ? E("", !0) : (y(), x("div", dp, [
            g[1] || (g[1] = c("p", { class: "badge-label" }, "Payment Success Value", -1)),
            d.value.length > 0 ? (y(), x("div", up, [
              (y(!0), x(q, null, J(d.value, (m) => (y(), x("p", {
                key: m.currency,
                class: "currency-breakdown-item"
              }, M(m.currency) + " " + M(p(m.total_value)), 1))), 128))
            ])) : (y(), x("p", hp, M(p(0)), 1))
          ]))
        ])
      ]),
      a.loading ? (y(), x("div", fp, [...g[3] || (g[3] = [
        at('<div class="loading-container" data-v-15d5c773><div class="chart-flow-loader" data-v-15d5c773><div class="flow-line flow-1" data-v-15d5c773></div><div class="flow-line flow-2" data-v-15d5c773></div><div class="flow-line flow-3" data-v-15d5c773></div><div class="flow-line flow-4" data-v-15d5c773></div><div class="flow-line flow-5" data-v-15d5c773></div></div><p class="loading-text" data-v-15d5c773>Loading booking data...</p></div>', 1)
      ])])) : a.error ? (y(), x("div", gp, [
        c("div", pp, [
          g[4] || (g[4] = c("div", { class: "error-icon-wrapper" }, [
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
          g[5] || (g[5] = c("p", { class: "error-title" }, "Error loading data", -1)),
          c("p", vp, M(a.error), 1)
        ])
      ])) : (y(), x("div", bp, [
        c("section", mp, [
          c("div", yp, [
            Z(ye, {
              data: v.value,
              "node-colors": f,
              height: "500px",
              "node-gap": 15
            }, null, 8, ["data"])
          ])
        ]),
        i.value.length > 0 ? (y(), x("section", _p, [
          g[8] || (g[8] = c("div", { class: "section-header" }, [
            c("h4", { class: "section-title" }, "Daily Overview")
          ], -1)),
          c("div", xp, [
            c("table", kp, [
              g[6] || (g[6] = c("thead", null, [
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
              c("tbody", wp, [
                (y(!0), x(q, null, J(r.value, (m) => (y(), x("tr", {
                  key: m.date,
                  class: "table-row"
                }, [
                  c("td", $p, M(A(At)(m.date).format("DD/MM/YYYY")), 1),
                  c("td", Mp, M(A(U)(m.booking_initiated_count)), 1),
                  c("td", Sp, [
                    kt(M(A(U)(m.booking_started_count)) + " ", 1),
                    c("span", Cp, " (" + M(_(m.booking_started_count, m.booking_initiated_count)) + ") ", 1)
                  ]),
                  c("td", Dp, M(A(U)(m.payment_initiated_count)), 1),
                  c("td", Ap, [
                    c("div", Tp, [
                      c("span", Bp, " Success: " + M(A(U)(h(m))), 1),
                      c("span", Lp, " Failed: " + M(A(U)(m.payment_failed_count || 0)), 1)
                    ])
                  ]),
                  c("td", Fp, [
                    u(m).length > 0 ? (y(), x("div", Pp, [
                      (y(!0), x(q, null, J(u(m), ($) => (y(), x("span", {
                        key: `${m.date}-${$.currency}`,
                        class: "badge badge-currency"
                      }, M($.currency) + " " + M(p($.total_value)), 1))), 128))
                    ])) : (y(), x("span", Ip, "N/A"))
                  ]),
                  c("td", Ep, [
                    c("div", Rp, [
                      c("span", Op, " Not Found: " + M(m.not_found_count ? A(U)(m.not_found_count) : "N/A"), 1),
                      c("span", Vp, " Cancelled: " + M(m.cancelled_count ? A(U)(m.cancelled_count) : "N/A"), 1),
                      c("span", zp, " No Balance: " + M(m.no_pending_balance_count ? A(U)(m.no_pending_balance_count) : "N/A"), 1),
                      c("span", Np, " Errors: " + M(m.error_count ? A(U)(m.error_count) : "N/A"), 1)
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          l.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: g[0] || (g[0] = (m) => o.value = !o.value)
          }, [
            kt(M(o.value ? "View less" : `View more (${i.value.length - fs} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: Y(["view-more-icon", { "view-more-icon-rotated": o.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...g[7] || (g[7] = [
              c("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : E("", !0),
          e.enableExport ? (y(), ct(A(xt), {
            key: 1,
            onExport: n,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", Wp, [...g[9] || (g[9] = [
          at('<div class="empty-state-content" data-v-15d5c773><div class="empty-icon-wrapper" data-v-15d5c773><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-15d5c773><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" data-v-15d5c773></path></svg></div><p class="empty-title" data-v-15d5c773>No booking manager data available</p><p class="empty-description" data-v-15d5c773>No booking manager data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), jp = /* @__PURE__ */ st(Hp, [["__scopeId", "data-v-15d5c773"]]), Yp = { class: "checkin-metrics-card" }, Kp = {
  key: 0,
  class: "loading-state"
}, Up = {
  key: 1,
  class: "card-body"
}, qp = {
  key: 0,
  class: "chart-section"
}, Xp = { class: "chart-wrapper" }, Gp = {
  key: 1,
  class: "table-section"
}, Zp = { class: "table-wrapper" }, Qp = { class: "data-table" }, Jp = { class: "table-body" }, t0 = { class: "table-cell font-medium" }, e0 = { class: "table-cell text-center" }, a0 = { class: "table-cell text-center" }, s0 = { class: "table-cell text-center" }, n0 = { class: "table-cell text-center" }, o0 = { class: "table-cell text-center" }, i0 = { class: "table-cell text-center" }, r0 = { class: "table-cell text-left" }, l0 = {
  key: 0,
  class: "failed-steps"
}, c0 = { class: "step-name" }, d0 = { class: "step-count" }, u0 = {
  key: 1,
  class: "empty-cell"
}, h0 = {
  key: 2,
  class: "empty-state"
}, f0 = {
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
    const a = t, s = (b) => {
      a("export", b);
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
    }, r = tt([]), l = C(() => {
      const b = n.data;
      return b && (Array.isArray(b.checkin_by_day) && b.checkin_by_day.length > 0 || (b.total_checkin_initiated ?? 0) > 0) ? { ...o, ...b } : n.checkinData ?? o;
    }), d = C(() => {
      const b = n.data;
      return b && (Array.isArray(b.failed_by_step_by_day) && b.failed_by_step_by_day.length > 0 || Array.isArray(b.unrecovered_by_step) && b.unrecovered_by_step.length > 0) ? {
        ...i,
        total_checkin_failed: b.total_checkin_failed ?? 0,
        total_checkin_unrecovered: b.total_checkin_unrecovered ?? 0,
        failed_by_step_by_day: b.failed_by_step_by_day ?? [],
        unrecovered_by_step: b.unrecovered_by_step ?? [],
        unrecovered_by_day: b.unrecovered_by_day ?? []
      } : n.failedData ?? i;
    }), u = C(() => {
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
      return (d.value.unrecovered_by_step || []).forEach((m) => {
        const k = m.step_name.replace(/_/g, " ").split(" ").map((S) => S.charAt(0).toUpperCase() + S.slice(1)).join(" "), w = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        b[k] = w[k] || "#DC2626";
      }), b;
    }), h = (b, g) => !g || g === 0 ? "0%" : `${Math.round(b / g * 100)}%`, p = (b, g) => {
      const m = U(b), $ = h(b, g);
      return `${m} (${$})`;
    }, v = (b) => b.reduce((g, m) => g + m.failed_count, 0), f = C(() => {
      const b = [], g = [];
      if (!l.value.total_checkin_initiated)
        return { nodes: b, links: g };
      b.push({ name: "Checkin Init" }), b.push({ name: "Booking retrive" }), b.push({ name: "Booking retrive success" }), b.push({ name: "Number of Passengers" }), b.push({ name: "Completed" }), b.push({ name: "Closed with BP" });
      const m = l.value.total_checkin_initiated, $ = l.value.total_checkin_init, k = l.value.total_checkin_init_abandoned, w = $ - k, S = l.value.total_checkin_started, D = l.value.total_checkin_completed, T = l.value.total_checkin_closed, O = d.value.unrecovered_by_step || [], P = O.reduce((L, I) => L + I.count, 0);
      if ($ > 0) {
        const L = Math.round($ / m * 100);
        g.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: $,
          label: `${$.toLocaleString()} (${L}%)`
        });
      }
      const B = m - $;
      if (B > 0) {
        const L = Math.round(B / m * 100);
        b.push({ name: "Abandoned (Init)" }), g.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: B,
          label: `${B.toLocaleString()} (${L}%)`
        });
      }
      if (k > 0) {
        const L = Math.round(k / m * 100);
        b.push({ name: "Abandoned (Started)" }), g.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: k,
          label: `${k.toLocaleString()} (${L}%)`
        });
      }
      if (w > 0) {
        const L = Math.round(w / m * 100);
        g.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: w,
          label: `${w.toLocaleString()} (${L}%)`
        });
      }
      if (S > 0) {
        const L = Math.round(S / m * 100);
        g.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: S,
          label: `${S.toLocaleString()} (${L}%)`
        });
      }
      if (D > 0) {
        const L = Math.round(D / S * 100);
        g.push({
          source: "Number of Passengers",
          target: "Completed",
          value: D,
          label: `${D.toLocaleString()} (${L}%)`
        });
      }
      if (O.length > 0 && P > 0) {
        b.push({ name: "Unrecovered" });
        const L = Math.round(P / S * 100);
        g.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: P,
          label: `${P.toLocaleString()} (${L}%)`
        }), O.forEach((I) => {
          const W = I.step_name.replace(/_/g, " ").split(" ").map((j) => j.charAt(0).toUpperCase() + j.slice(1)).join(" "), N = Math.round(I.count / S * 100);
          b.push({ name: W }), g.push({
            source: "Unrecovered",
            target: W,
            value: I.count,
            label: `${I.count.toLocaleString()} (${N}%)`
          });
        });
      }
      const R = S - (D + P);
      if (R > 0) {
        const L = Math.round(R / S * 100);
        b.push({ name: "Abandoned (Flow)" }), g.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: R,
          label: `${R.toLocaleString()} (${L}%)`
        });
      }
      const H = D - T;
      if (H > 0) {
        const L = Math.round(H / S * 100);
        b.push({ name: "BP Error" }), g.push({
          source: "Completed",
          target: "BP Error",
          value: H,
          label: `${H.toLocaleString()} (${L}%)`
        });
      }
      if (T > 0) {
        const L = Math.round(T / S * 100);
        g.push({
          source: "Completed",
          target: "Closed with BP",
          value: T,
          label: `${T.toLocaleString()} (${L}%)`
        });
      }
      return { nodes: b, links: g };
    }), _ = () => {
      const b = l.value.checkin_by_day || [], g = d.value.failed_by_step_by_day || [];
      if (b.length === 0) {
        r.value = [];
        return;
      }
      r.value = [...b].map((m) => {
        const $ = g.find(
          (k) => k.date === m.date
        );
        return {
          ...m,
          failed_steps: $?.steps || []
        };
      }), r.value.sort((m, $) => new Date(m.date) - new Date($.date));
    };
    return Et(
      [() => n.data, () => n.checkinData, () => n.failedData],
      () => {
        _();
      },
      { deep: !0, immediate: !0 }
    ), (b, g) => (y(), x("article", Yp, [
      g[3] || (g[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Check-in Metrics"),
          c("p", { class: "card-subtitle" }, "Check-in performance and failure analysis")
        ])
      ], -1)),
      n.loading ? (y(), x("div", Kp, [...g[0] || (g[0] = [
        at('<div class="loading-container" data-v-d527da09><div class="chart-flow-loader" data-v-d527da09><div class="flow-line flow-1" data-v-d527da09></div><div class="flow-line flow-2" data-v-d527da09></div><div class="flow-line flow-3" data-v-d527da09></div><div class="flow-line flow-4" data-v-d527da09></div><div class="flow-line flow-5" data-v-d527da09></div></div><p class="loading-text" data-v-d527da09>Loading check-in data...</p></div>', 1)
      ])])) : (y(), x("div", Up, [
        f.value.nodes.length > 0 ? (y(), x("section", qp, [
          c("div", Xp, [
            Z(ye, {
              data: f.value,
              height: "500px",
              "node-colors": u.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : E("", !0),
        r.value && r.value.length > 0 ? (y(), x("section", Gp, [
          c("div", Zp, [
            c("table", Qp, [
              g[1] || (g[1] = c("thead", null, [
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
              c("tbody", Jp, [
                (y(!0), x(q, null, J(r.value, (m) => (y(), x("tr", {
                  key: m.date,
                  class: "table-row"
                }, [
                  c("td", t0, M(A(At)(m.date).format("DD/MM/YYYY")), 1),
                  c("td", e0, M(A(U)(m.checkin_initiated_count)), 1),
                  c("td", a0, M(p(m.checkin_init_count, m.checkin_initiated_count)), 1),
                  c("td", s0, M(A(U)(m.checkin_started_count)), 1),
                  c("td", n0, M(p(m.checkin_completed_count, m.checkin_started_count)), 1),
                  c("td", o0, M(p(m.checkin_closed_count, m.checkin_started_count)), 1),
                  c("td", i0, M(p(v(m.failed_steps), m.checkin_started_count)), 1),
                  c("td", r0, [
                    m.failed_steps && m.failed_steps.length > 0 ? (y(), x("div", l0, [
                      (y(!0), x(q, null, J(m.failed_steps, ($) => (y(), x("div", {
                        key: $.step_name,
                        class: "failed-step-item"
                      }, [
                        c("span", c0, M($.step_name.replace(/_/g, " ")) + ":", 1),
                        c("span", d0, M($.failed_count), 1)
                      ]))), 128))
                    ])) : (y(), x("div", u0, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), ct(A(xt), {
            key: 0,
            onExport: s,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", h0, [...g[2] || (g[2] = [
          at('<div class="empty-state-content" data-v-d527da09><div class="empty-icon-wrapper" data-v-d527da09><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d527da09><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-d527da09></path></svg></div><p class="empty-title" data-v-d527da09>No check-in data available</p><p class="empty-description" data-v-d527da09>Try adjusting the date range or check your filters to see check-in performance data.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}, g0 = /* @__PURE__ */ st(f0, [["__scopeId", "data-v-d527da09"]]), p0 = { class: "checkin-metrics-card" }, v0 = {
  key: 0,
  class: "loading-state"
}, b0 = {
  key: 1,
  class: "card-body"
}, m0 = {
  key: 0,
  class: "sankey-section"
}, y0 = {
  key: 1,
  class: "table-section"
}, _0 = { class: "table-wrapper" }, x0 = { class: "data-table" }, k0 = { class: "table-body" }, w0 = { class: "table-cell date-cell" }, $0 = { class: "table-cell text-center" }, M0 = { class: "table-cell text-center" }, S0 = { class: "table-cell text-center" }, C0 = { class: "table-cell text-center" }, D0 = { class: "table-cell text-center" }, A0 = { class: "table-cell text-center" }, T0 = { class: "table-cell reasons-cell" }, B0 = {
  key: 0,
  class: "reasons-list"
}, L0 = { class: "reason-name" }, F0 = { class: "reason-count" }, P0 = {
  key: 1,
  class: "no-reasons"
}, I0 = {
  key: 2,
  class: "empty-state"
}, E0 = { class: "empty-state-content" }, R0 = { class: "empty-icon-wrapper" }, gs = 3, O0 = /* @__PURE__ */ Q({
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
  setup(e, { expose: t, emit: a }) {
    const s = e, n = a, o = ($) => {
      n("export", $);
    }, { isDark: i } = lt(rt(s, "theme")), r = ($) => $ == null ? "0" : $.toLocaleString(), l = ($) => {
      const k = new Date($), w = String(k.getDate()).padStart(2, "0"), S = String(k.getMonth() + 1).padStart(2, "0"), D = k.getFullYear();
      return `${w}/${S}/${D}`;
    }, d = ($) => $.replace(/_/g, " ").replace(/\b\w/g, (k) => k.toUpperCase()), u = ($, k) => !k || k === 0 ? "0%" : `${Math.round($ / k * 100)}%`, h = ($, k) => {
      const w = $ || 0, S = k || 0, D = r(w), T = u(w, S);
      return `${D} (${T})`;
    }, p = ($) => $ ? $.reduce((k, w) => k + w.failed_count, 0) : 0, v = C(() => {
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
      return (s.failedData?.unrecovered_by_step || []).forEach((w) => {
        const D = w.step_name.replace(/_/g, " ").split(" ").map((O) => O.charAt(0).toUpperCase() + O.slice(1)).join(" "), T = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        $[D] = T[D] || "#DC2626";
      }), $;
    }), f = tt(!1), _ = C(() => {
      const $ = s.checkinData?.checkin_by_day || [], k = s.failedData?.failed_by_step_by_day || [];
      return $.map((S) => {
        const D = k.find((T) => T.date === S.date);
        return {
          ...S,
          failed_steps: D?.steps || []
        };
      }).sort((S, D) => new Date(S.date).getTime() - new Date(D.date).getTime());
    }), b = C(() => f.value ? _.value : _.value.slice(0, gs)), g = C(() => _.value.length > gs), m = C(() => {
      const $ = [], k = [], w = /* @__PURE__ */ new Set(), S = (it) => {
        w.has(it) || ($.push({ name: it }), w.add(it));
      };
      if (!s.checkinData?.total_checkin_initiated)
        return { nodes: $, links: k };
      S("Checkin Init"), S("Booking retrive"), S("Booking retrive success"), S("Number of Passengers"), S("Completed"), S("Closed with BP");
      const D = s.checkinData.total_checkin_initiated || 0, T = s.checkinData.total_checkin_init || 0, O = s.checkinData.total_checkin_init_abandoned || 0, P = s.checkinData.total_checkin_pre_init_abandoned_error, B = s.checkinData.total_checkin_pre_init_abandoned_voluntary, R = P != null || B != null, H = R ? Math.max(Number(P) || 0, 0) : 0, L = R ? Math.max(Number(B) || 0, 0) : 0, I = s.checkinData.total_checkin_init_abandoned_error, V = s.checkinData.total_checkin_init_abandoned_voluntary, W = I != null || V != null, N = W ? Math.max(Number(I) || 0, 0) : 0, j = W ? Math.max(Number(V) || 0, 0) : 0, K = W ? Math.max(O - N - j, 0) : O, nt = T - O, et = s.checkinData.total_checkin_started || 0, G = s.checkinData.total_checkin_completed || 0, dt = s.checkinData.total_checkin_closed || 0, wt = s.failedData?.unrecovered_by_step || [], gt = wt.reduce((it, de) => it + de.count, 0);
      if (T > 0) {
        const it = Math.round(T / D * 100);
        k.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: T,
          label: `${T.toLocaleString()} (${it}%)`
        });
      }
      const Pt = D - T;
      if (R) {
        if (L > 0) {
          const it = Math.round(L / D * 100);
          S("Abandoned (Init)"), k.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: L,
            label: `${L.toLocaleString()} (${it}%)`
          });
        }
        if (H > 0) {
          const it = Math.round(H / D * 100);
          S("Booking not retreived"), k.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: H,
            label: `${H.toLocaleString()} (${it}%)`
          });
        }
      } else if (Pt > 0) {
        const it = Math.round(Pt / D * 100);
        S("Abandoned (Init)"), k.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: Pt,
          label: `${Pt.toLocaleString()} (${it}%)`
        });
      }
      if (W) {
        if (N > 0) {
          const it = Math.round(N / D * 100);
          S("Error"), k.push({
            source: "Booking retrive",
            target: "Error",
            value: N,
            label: `${N.toLocaleString()} (${it}%)`
          });
        }
        if (j > 0) {
          const it = Math.round(j / D * 100);
          S("Abandoned (Started)"), k.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: j,
            label: `${j.toLocaleString()} (${it}%)`
          });
        }
        if (K > 0) {
          const it = Math.round(K / D * 100);
          S("Abandoned (Started)"), k.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: K,
            label: `${K.toLocaleString()} (${it}%)`
          });
        }
      } else if (O > 0) {
        const it = Math.round(O / D * 100);
        S("Abandoned (Started)"), k.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: O,
          label: `${O.toLocaleString()} (${it}%)`
        });
      }
      if (nt > 0) {
        const it = Math.round(nt / D * 100);
        k.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: nt,
          label: `${nt.toLocaleString()} (${it}%)`
        });
      }
      if (et > 0) {
        const it = Math.round(et / D * 100);
        k.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: et,
          label: `${et.toLocaleString()} (${it}%)`
        });
      }
      if (G > 0) {
        const it = Math.round(G / et * 100);
        k.push({
          source: "Number of Passengers",
          target: "Completed",
          value: G,
          label: `${G.toLocaleString()} (${it}%)`
        });
      }
      if (wt.length > 0 && gt > 0) {
        S("Unrecovered");
        const it = Math.round(gt / et * 100);
        k.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: gt,
          label: `${gt.toLocaleString()} (${it}%)`
        }), wt.forEach((de) => {
          const Ye = de.step_name.replace(/_/g, " ").split(" ").map((Ke) => Ke.charAt(0).toUpperCase() + Ke.slice(1)).join(" "), ma = Math.round(de.count / et * 100);
          S(Ye), k.push({
            source: "Unrecovered",
            target: Ye,
            value: de.count,
            label: `${de.count.toLocaleString()} (${ma}%)`
          });
        });
      }
      const zt = et - (G + gt);
      if (zt > 0) {
        const it = Math.round(zt / et * 100);
        S("Abandoned (Flow)"), k.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: zt,
          label: `${zt.toLocaleString()} (${it}%)`
        });
      }
      const Kt = G - dt;
      if (Kt > 0) {
        const it = Math.round(Kt / et * 100);
        S("BP Error"), k.push({
          source: "Completed",
          target: "BP Error",
          value: Kt,
          label: `${Kt.toLocaleString()} (${it}%)`
        });
      }
      if (dt > 0) {
        const it = Math.round(dt / et * 100);
        k.push({
          source: "Completed",
          target: "Closed with BP",
          value: dt,
          label: `${dt.toLocaleString()} (${it}%)`
        });
      }
      return { nodes: $, links: k };
    });
    return t({ isDark: i }), ($, k) => (y(), x("article", p0, [
      k[6] || (k[6] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Check-in Metrics"),
          c("p", { class: "card-subtitle" }, "Check-in performance and failure analysis")
        ])
      ], -1)),
      e.loading ? (y(), x("div", v0, [...k[1] || (k[1] = [
        at('<div class="loading-container" data-v-eefc834b><div class="chart-bars-loader" data-v-eefc834b><div class="bar bar-1" data-v-eefc834b></div><div class="bar bar-2" data-v-eefc834b></div><div class="bar bar-3" data-v-eefc834b></div><div class="bar bar-4" data-v-eefc834b></div><div class="bar bar-5" data-v-eefc834b></div></div><p class="loading-text" data-v-eefc834b>Loading check-in data...</p></div>', 1)
      ])])) : (y(), x("div", b0, [
        m.value.nodes.length > 0 ? (y(), x("div", m0, [
          Z(ye, {
            data: m.value,
            height: "500px",
            "node-colors": v.value,
            "use-gradient": !1,
            "node-gap": 30
          }, null, 8, ["data", "node-colors"])
        ])) : E("", !0),
        _.value && _.value.length > 0 ? (y(), x("div", y0, [
          c("div", _0, [
            c("table", x0, [
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
              c("tbody", k0, [
                (y(!0), x(q, null, J(b.value, (w) => (y(), x("tr", {
                  key: w.date,
                  class: "table-row"
                }, [
                  c("td", w0, M(l(w.date)), 1),
                  c("td", $0, M(r(w.checkin_initiated_count)), 1),
                  c("td", M0, M(h(w.checkin_init_count, w.checkin_initiated_count)), 1),
                  c("td", S0, M(r(w.checkin_started_count)), 1),
                  c("td", C0, M(h(w.checkin_completed_count, w.checkin_started_count)), 1),
                  c("td", D0, M(h(w.checkin_closed_count, w.checkin_started_count)), 1),
                  c("td", A0, M(h(p(w.failed_steps), w.checkin_started_count)), 1),
                  c("td", T0, [
                    w.failed_steps && w.failed_steps.length > 0 ? (y(), x("div", B0, [
                      (y(!0), x(q, null, J(w.failed_steps, (S) => (y(), x("div", {
                        key: S.step_name,
                        class: "reason-item"
                      }, [
                        c("span", L0, M(d(S.step_name)) + ":", 1),
                        c("span", F0, M(S.failed_count), 1)
                      ]))), 128))
                    ])) : (y(), x("div", P0, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          g.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: k[0] || (k[0] = (w) => f.value = !f.value)
          }, [
            kt(M(f.value ? "View less" : `View more (${_.value.length - gs} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: Y(["view-more-icon", { "view-more-icon-rotated": f.value }]),
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
          e.enableExport ? (y(), ct(A(xt), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("div", I0, [
          c("div", E0, [
            c("div", R0, [
              Z(A(Vt), { class: "empty-icon" })
            ]),
            k[4] || (k[4] = c("p", { class: "empty-title" }, "No check-in data available", -1)),
            k[5] || (k[5] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see check-in metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), V0 = /* @__PURE__ */ st(O0, [["__scopeId", "data-v-eefc834b"]]), z0 = { class: "checkin-segments-card" }, N0 = {
  key: 0,
  class: "loading-state"
}, W0 = {
  key: 1,
  class: "card-body"
}, H0 = {
  key: 0,
  class: "table-section"
}, j0 = { class: "table-wrapper" }, Y0 = { class: "data-table" }, K0 = { class: "table-body" }, U0 = { class: "table-cell font-medium text-center" }, q0 = { class: "airport-badge" }, X0 = { class: "table-cell text-center" }, G0 = {
  key: 0,
  class: "airport-badge connection"
}, Z0 = {
  key: 1,
  class: "empty-connection"
}, Q0 = { class: "table-cell text-center" }, J0 = { class: "airport-badge" }, tv = { class: "table-cell text-center" }, ev = {
  key: 0,
  class: "trip-badge roundtrip"
}, av = {
  key: 1,
  class: "trip-badge oneway"
}, sv = { class: "table-cell text-center" }, nv = { class: "table-cell text-center" }, ov = { class: "percentage-value" }, iv = { class: "table-cell text-center" }, rv = { class: "percentage-value" }, lv = { class: "table-cell text-center" }, cv = { class: "percentage-value success" }, dv = {
  key: 1,
  class: "empty-state"
}, ps = 3, uv = /* @__PURE__ */ Q({
  __name: "checkinSegments",
  props: {
    data: { default: () => [] },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: a }) {
    const s = e, n = a, o = (v) => {
      n("export", v);
    }, { isDark: i } = lt(rt(s, "theme")), r = tt(!1), l = C(() => r.value ? s.data : s.data.slice(0, ps)), d = C(() => s.data.length > ps), u = (v, f) => !f || f === 0 || !v ? "0%" : `${Math.round(v / f * 100)}%`, h = (v) => !v || v === "None" ? "-" : String(v).trim().replace(/_[0-9]+$/i, ""), p = (v) => {
      const f = h(v?.departure_airport), _ = h(v?.arrival_airport);
      return f === "-" || _ === "-" ? !1 : f === _;
    };
    return t({ isDark: i }), (v, f) => (y(), x("article", z0, [
      f[7] || (f[7] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Checkin Segments"),
          c("p", { class: "card-subtitle" }, "Breakdown by flight segment with connection when applicable")
        ])
      ], -1)),
      s.loading ? (y(), x("div", N0, [...f[1] || (f[1] = [
        at('<div class="loading-container" data-v-a1ebd82a><div class="chart-flow-loader" data-v-a1ebd82a><div class="flow-line flow-1" data-v-a1ebd82a></div><div class="flow-line flow-2" data-v-a1ebd82a></div><div class="flow-line flow-3" data-v-a1ebd82a></div><div class="flow-line flow-4" data-v-a1ebd82a></div><div class="flow-line flow-5" data-v-a1ebd82a></div></div><p class="loading-text" data-v-a1ebd82a>Loading segment data...</p></div>', 1)
      ])])) : (y(), x("div", W0, [
        s.data.length > 0 ? (y(), x("section", H0, [
          c("div", j0, [
            c("table", Y0, [
              f[4] || (f[4] = c("thead", null, [
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
              c("tbody", K0, [
                (y(!0), x(q, null, J(l.value, (_, b) => (y(), x("tr", {
                  key: b,
                  class: "table-row"
                }, [
                  c("td", U0, [
                    c("span", q0, M(h(_.departure_airport)), 1)
                  ]),
                  c("td", X0, [
                    h(_.conexion_airport) !== "-" ? (y(), x("span", G0, M(h(_.conexion_airport)), 1)) : (y(), x("span", Z0, "-"))
                  ]),
                  c("td", Q0, [
                    c("span", J0, M(h(_.arrival_airport)), 1)
                  ]),
                  c("td", tv, [
                    p(_) ? (y(), x("span", ev, [...f[2] || (f[2] = [
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
                      kt(" Roundtrip ", -1)
                    ])])) : (y(), x("span", av, [...f[3] || (f[3] = [
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
                      kt(" One way ", -1)
                    ])]))
                  ]),
                  c("td", sv, M(A(U)(_.segment_init_count)), 1),
                  c("td", nv, [
                    c("span", ov, M(u(_.segment_started_count, _.segment_init_count)), 1)
                  ]),
                  c("td", iv, [
                    c("span", rv, M(u(_.segment_completed_count, _.segment_init_count)), 1)
                  ]),
                  c("td", lv, [
                    c("span", cv, M(u(_.segment_closed_count, _.segment_init_count)), 1)
                  ])
                ]))), 128))
              ])
            ])
          ]),
          d.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: f[0] || (f[0] = (_) => r.value = !r.value)
          }, [
            kt(M(r.value ? "View less" : `View more (${s.data.length - ps} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: Y(["view-more-icon", { "view-more-icon-rotated": r.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...f[5] || (f[5] = [
              c("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : E("", !0),
          e.enableExport ? (y(), ct(A(xt), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", dv, [...f[6] || (f[6] = [
          at('<div class="empty-state-content" data-v-a1ebd82a><div class="empty-icon-wrapper" data-v-a1ebd82a><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-a1ebd82a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-a1ebd82a></path></svg></div><p class="empty-title" data-v-a1ebd82a>No segment data available</p><p class="empty-description" data-v-a1ebd82a>No flight segment data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), hv = /* @__PURE__ */ st(uv, [["__scopeId", "data-v-a1ebd82a"]]), fv = { class: "disruption-metrics-card" }, gv = { class: "card-header" }, pv = { class: "header-content" }, vv = {
  key: 0,
  class: "payment-success-badge"
}, bv = {
  key: 0,
  class: "currency-breakdown-list"
}, mv = {
  key: 1,
  class: "badge-value"
}, yv = {
  key: 0,
  class: "loading-state"
}, _v = {
  key: 1,
  class: "card-body"
}, xv = { class: "chart-section" }, kv = { class: "chart-wrapper" }, wv = {
  key: 1,
  class: "empty-chart"
}, $v = {
  key: 0,
  class: "table-section"
}, Mv = { class: "table-wrapper" }, Sv = { class: "data-table" }, Cv = { class: "table-body" }, Dv = { class: "table-cell font-medium text-center" }, Av = { class: "table-cell text-center" }, Tv = { class: "table-cell text-center" }, Bv = { class: "percentage-text" }, Lv = { class: "table-cell text-center" }, Fv = { class: "abandoned-value" }, Pv = { class: "table-cell" }, Iv = { class: "badges-container badges-wrap" }, Ev = { class: "badge badge-vol" }, Rv = { class: "badge badge-confirm" }, Ov = { class: "badge badge-not-confirm" }, Vv = { class: "badge badge-reject" }, zv = { class: "badge badge-not-paid" }, Nv = { class: "badge badge-success" }, Wv = { class: "table-cell" }, Hv = { class: "badges-container badges-wrap" }, jv = { class: "badge badge-inv" }, Yv = { class: "badge badge-human" }, Kv = { class: "badge badge-accept" }, Uv = {
  key: 1,
  class: "empty-state"
}, vs = 3, qv = /* @__PURE__ */ Q({
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
    const a = e, s = t, n = (b) => {
      s("export", b);
    }, o = tt(!1), i = C(() => a.data?.disruption_by_day ? [...a.data.disruption_by_day].sort(
      (b, g) => new Date(b.date).getTime() - new Date(g.date).getTime()
    ) : []), r = C(() => o.value ? i.value : i.value.slice(0, vs)), l = C(() => i.value.length > vs), d = C(() => a.data?.total_payment_success || []), u = (b, g) => !g || g === 0 ? "0%" : `${Math.round(b / g * 100)}%`, h = (b) => ft(b), p = (b) => (b ?? []).reduce((g, m) => g + (m.count ?? 0), 0), v = (b) => typeof b.sell_success_count == "number" ? b.sell_success_count : p(b.payment_success_total), f = C(() => {
      const b = a.data, g = b.total_disruption_conversations || 0, m = b.total_disruption_initiated || 0, $ = b.total_voluntary || 0, k = b.total_involuntary || 0, w = b.total_accepted || 0, S = b.total_confirmed || 0, D = typeof b.total_sell_success == "number" ? b.total_sell_success : p(b.total_payment_success), T = b.total_sell_failed || 0, O = Math.max(0, g - m), P = Math.max(0, m - $ - k), B = Math.max(0, k - w), R = Math.max(0, $ - S), H = T, L = Math.max(0, S - D - H), I = (N, j) => {
        const K = j > 0 ? Math.round(N / j * 100) : 0;
        return `${N.toLocaleString()} (${K}%)`;
      }, V = [
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
      ], W = [];
      return m > 0 && W.push({
        source: "Initiated",
        target: "Started",
        value: m,
        label: I(m, g)
      }), O > 0 && W.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: O,
        label: I(O, g)
      }), $ > 0 && W.push({
        source: "Started",
        target: "Voluntary",
        value: $,
        label: I($, g)
      }), k > 0 && W.push({
        source: "Started",
        target: "Involuntary",
        value: k,
        label: I(k, g)
      }), P > 0 && W.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: P,
        label: I(P, g)
      }), w > 0 && W.push({
        source: "Involuntary",
        target: "Accepted",
        value: w,
        label: I(w, g)
      }), B > 0 && W.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: B,
        label: I(B, g)
      }), S > 0 && W.push({
        source: "Voluntary",
        target: "Confirmed",
        value: S,
        label: I(S, g)
      }), R > 0 && W.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: R,
        label: I(R, g)
      }), D > 0 && W.push({
        source: "Confirmed",
        target: "Paid",
        value: D,
        label: I(D, g)
      }), H > 0 && W.push({
        source: "Confirmed",
        target: "Rejected",
        value: H,
        label: I(H, g)
      }), L > 0 && W.push({
        source: "Confirmed",
        target: "Not Paid",
        value: L,
        label: I(L, g)
      }), { nodes: V, links: W };
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
    return (b, g) => (y(), x("article", fv, [
      c("header", gv, [
        c("div", pv, [
          g[2] || (g[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Disruption Manager Metrics"),
            c("p", { class: "card-subtitle" }, "Disruption workflow performance and completion tracking")
          ], -1)),
          a.loading ? E("", !0) : (y(), x("div", vv, [
            g[1] || (g[1] = c("p", { class: "badge-label" }, "Payment Success Value", -1)),
            d.value.length > 0 ? (y(), x("div", bv, [
              (y(!0), x(q, null, J(d.value, (m) => (y(), x("p", {
                key: m.currency,
                class: "currency-breakdown-item"
              }, M(m.currency) + " " + M(h(m.total_value)), 1))), 128))
            ])) : (y(), x("p", mv, M(h(0)), 1))
          ]))
        ])
      ]),
      a.loading ? (y(), x("div", yv, [...g[3] || (g[3] = [
        at('<div class="loading-container" data-v-47c8f691><div class="chart-bars-loader" data-v-47c8f691><div class="bar bar-1" data-v-47c8f691></div><div class="bar bar-2" data-v-47c8f691></div><div class="bar bar-3" data-v-47c8f691></div><div class="bar bar-4" data-v-47c8f691></div><div class="bar bar-5" data-v-47c8f691></div></div><p class="loading-text" data-v-47c8f691>Loading disruption data...</p></div>', 1)
      ])])) : (y(), x("div", _v, [
        c("section", xv, [
          c("div", kv, [
            f.value.nodes.length > 0 && f.value.links.length > 0 ? (y(), ct(ye, {
              key: 0,
              data: f.value,
              "node-colors": _,
              height: "500px"
            }, null, 8, ["data"])) : (y(), x("div", wv, [...g[4] || (g[4] = [
              c("p", { class: "empty-chart-text" }, "No disruption data available for visualization", -1)
            ])]))
          ])
        ]),
        i.value && i.value.length > 0 ? (y(), x("section", $v, [
          g[7] || (g[7] = at('<div class="section-header" data-v-47c8f691><h4 class="section-title" data-v-47c8f691>Daily Overview</h4></div><div class="legend-container" data-v-47c8f691><p class="legend-title" data-v-47c8f691>Legend</p><div class="legend-items" data-v-47c8f691><div class="legend-group" data-v-47c8f691><span class="legend-label" data-v-47c8f691>Voluntary:</span><span class="badge badge-vol" data-v-47c8f691>VOL</span></div><div class="legend-group" data-v-47c8f691><span class="legend-label" data-v-47c8f691>Involuntary:</span><span class="badge badge-inv" data-v-47c8f691>INV</span></div><div class="legend-note" data-v-47c8f691><span data-v-47c8f691>Vol=Voluntary</span><span data-v-47c8f691>•</span><span data-v-47c8f691>Inv=Involuntary</span></div></div></div>', 2)),
          c("div", Mv, [
            c("table", Sv, [
              g[5] || (g[5] = c("thead", null, [
                c("tr", { class: "table-header-row" }, [
                  c("th", { class: "table-header" }, "Date"),
                  c("th", { class: "table-header" }, "Initiated"),
                  c("th", { class: "table-header" }, "Started"),
                  c("th", { class: "table-header" }, "Abandoned (%)"),
                  c("th", { class: "table-header" }, "Voluntary"),
                  c("th", { class: "table-header" }, "Involuntary")
                ])
              ], -1)),
              c("tbody", Cv, [
                (y(!0), x(q, null, J(r.value, (m) => (y(), x("tr", {
                  key: m.date,
                  class: "table-row"
                }, [
                  c("td", Dv, M(A(At)(m.date).format("DD/MM")), 1),
                  c("td", Av, M(A(U)(m.disruption_conversations)), 1),
                  c("td", Tv, [
                    kt(M(A(U)(m.disruption_initiated_count)) + " ", 1),
                    c("span", Bv, " (" + M(u(m.disruption_initiated_count, m.disruption_conversations)) + ") ", 1)
                  ]),
                  c("td", Lv, [
                    c("span", Fv, M(A(U)(m.disruption_initiated_count - m.voluntary_count - m.involuntary_count)) + " (" + M(u(m.disruption_initiated_count - m.voluntary_count - m.involuntary_count, m.disruption_conversations)) + ") ", 1)
                  ]),
                  c("td", Pv, [
                    c("div", Iv, [
                      c("span", Ev, " VOL " + M(A(U)(m.voluntary_count)) + " (" + M(u(m.voluntary_count, m.disruption_conversations)) + ") ", 1),
                      c("span", Rv, " Confirm " + M(A(U)(m.confirmed_count)) + " (" + M(u(m.confirmed_count, m.disruption_conversations)) + ") ", 1),
                      c("span", Ov, " Not Confirm " + M(A(U)(m.voluntary_count - m.confirmed_count)) + " (" + M(u(m.voluntary_count - m.confirmed_count, m.disruption_conversations)) + ") ", 1),
                      c("span", Vv, " Reject " + M(A(U)(m.sell_failed_count)) + " (" + M(u(m.sell_failed_count, m.disruption_conversations)) + ") ", 1),
                      c("span", zv, " Not Paid " + M(A(U)(Math.max(0, m.confirmed_count - v(m) - m.sell_failed_count))) + " (" + M(u(Math.max(0, m.confirmed_count - v(m) - m.sell_failed_count), m.disruption_conversations)) + ") ", 1),
                      c("span", Nv, " Finish " + M(A(U)(v(m))) + " (" + M(u(v(m), m.disruption_conversations)) + ") ", 1),
                      (y(!0), x(q, null, J(m.payment_success_total || [], ($) => (y(), x("span", {
                        key: `${m.date}-${$.currency}`,
                        class: "badge badge-currency"
                      }, M($.currency) + " " + M(h($.total_value)), 1))), 128))
                    ])
                  ]),
                  c("td", Wv, [
                    c("div", Hv, [
                      c("span", jv, " INV " + M(A(U)(m.involuntary_count)) + " (" + M(u(m.involuntary_count, m.disruption_conversations)) + ") ", 1),
                      c("span", Yv, " Human " + M(A(U)(m.involuntary_count - m.accepted_count)) + " (" + M(u(m.involuntary_count - m.accepted_count, m.disruption_conversations)) + ") ", 1),
                      c("span", Kv, " Accept " + M(A(U)(m.accepted_count)) + " (" + M(u(m.accepted_count, m.disruption_conversations)) + ") ", 1)
                    ])
                  ])
                ]))), 128))
              ])
            ])
          ]),
          l.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: g[0] || (g[0] = (m) => o.value = !o.value)
          }, [
            kt(M(o.value ? "View less" : `View more (${i.value.length - vs} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: Y(["view-more-icon", { "view-more-icon-rotated": o.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...g[6] || (g[6] = [
              c("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : E("", !0),
          e.enableExport ? (y(), ct(A(xt), {
            key: 1,
            onExport: n,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", Uv, [...g[8] || (g[8] = [
          at('<div class="empty-state-content" data-v-47c8f691><div class="empty-icon-wrapper" data-v-47c8f691><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-47c8f691><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" data-v-47c8f691></path></svg></div><p class="empty-title" data-v-47c8f691>No disruption data available</p><p class="empty-description" data-v-47c8f691>No disruption data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Xv = /* @__PURE__ */ st(qv, [["__scopeId", "data-v-47c8f691"]]), Gv = { class: "faq-metrics-card" }, Zv = {
  key: 0,
  class: "card-body"
}, Qv = { class: "kpi-grid" }, Jv = { class: "kpi-card" }, tb = { class: "kpi-value" }, eb = { class: "kpi-card" }, ab = { class: "kpi-value" }, sb = { class: "kpi-card kpi-card--airline" }, nb = { class: "kpi-value" }, ob = { class: "kpi-card kpi-card--booking" }, ib = { class: "kpi-value" }, rb = { class: "kpi-card kpi-card--flight" }, lb = { class: "kpi-value" }, cb = {
  key: 0,
  class: "chart-section"
}, db = {
  key: 1,
  class: "empty-state"
}, ub = {
  key: 1,
  class: "loading-state"
}, hb = /* @__PURE__ */ Q({
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
    const s = e, n = a, o = (p) => {
      n("export", p);
    }, { isDark: i, colors: r } = lt(rt(s, "theme")), l = tt({ labels: [], datasets: [] }), d = C(() => s.data ?? {
      total_faq_events: 0,
      total_documents_found: 0,
      total_airline_information_retrieved: 0,
      total_booking_info_retrieved: 0,
      total_flight_status_retrieved: 0,
      faq_by_day: []
    }), u = C(() => ({
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
    })), h = (p) => {
      if (!p) {
        l.value = { labels: [], datasets: [] };
        return;
      }
      const v = p.faq_by_day || [];
      if (v.length > 0) {
        const f = v.map((m) => At(m.date).format("MMM DD")), _ = v.map((m) => m.airline_information_retrieved_count || 0), b = v.map((m) => m.flight_status_retrieved_count || 0), g = v.map((m) => m.booking_info_retrieved_count || 0);
        l.value = {
          labels: f,
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
              data: g,
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
    return Et(
      () => s.data,
      (p) => {
        h(p ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: i }), (p, v) => (y(), x("article", Gv, [
      v[7] || (v[7] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "FAQ Metrics"),
          c("p", { class: "card-subtitle" }, "Daily FAQ consultation and retrieval metrics")
        ])
      ], -1)),
      s.loading ? (y(), x("div", ub, [...v[6] || (v[6] = [
        at('<div class="loading-container" data-v-5d2c3c33><div class="chart-bars-loader" data-v-5d2c3c33><div class="bar bar-1" data-v-5d2c3c33></div><div class="bar bar-2" data-v-5d2c3c33></div><div class="bar bar-3" data-v-5d2c3c33></div><div class="bar bar-4" data-v-5d2c3c33></div><div class="bar bar-5" data-v-5d2c3c33></div></div><p class="loading-text" data-v-5d2c3c33>Loading FAQ metrics...</p></div>', 1)
      ])])) : (y(), x("div", Zv, [
        c("div", Qv, [
          c("div", Jv, [
            v[0] || (v[0] = c("span", { class: "kpi-label" }, "Total FAQ", -1)),
            c("span", tb, M(A(U)(d.value.total_faq_events)), 1)
          ]),
          c("div", eb, [
            v[1] || (v[1] = c("span", { class: "kpi-label" }, "Documents Found", -1)),
            c("span", ab, M(A(U)(d.value.total_documents_found)), 1)
          ]),
          c("div", sb, [
            v[2] || (v[2] = c("div", { class: "kpi-label-row" }, [
              c("span", {
                class: "kpi-color-dot",
                "aria-hidden": "true"
              }),
              c("span", { class: "kpi-label" }, "Airline Info")
            ], -1)),
            c("span", nb, M(A(U)(d.value.total_airline_information_retrieved)), 1)
          ]),
          c("div", ob, [
            v[3] || (v[3] = c("div", { class: "kpi-label-row" }, [
              c("span", {
                class: "kpi-color-dot",
                "aria-hidden": "true"
              }),
              c("span", { class: "kpi-label" }, "Booking Info")
            ], -1)),
            c("span", ib, M(A(U)(d.value.total_booking_info_retrieved)), 1)
          ]),
          c("div", rb, [
            v[4] || (v[4] = c("div", { class: "kpi-label-row" }, [
              c("span", {
                class: "kpi-color-dot",
                "aria-hidden": "true"
              }),
              c("span", { class: "kpi-label" }, "Flight Status")
            ], -1)),
            c("span", lb, M(A(U)(d.value.total_flight_status_retrieved)), 1)
          ])
        ]),
        l.value.labels && l.value.labels.length ? (y(), x("section", cb, [
          Z(me, {
            data: l.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ct(A(xt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", db, [...v[5] || (v[5] = [
          at('<div class="empty-state-content" data-v-5d2c3c33><div class="empty-icon-wrapper" data-v-5d2c3c33><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-5d2c3c33><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-5d2c3c33></path></svg></div><p class="empty-title" data-v-5d2c3c33>No FAQ data available</p><p class="empty-description" data-v-5d2c3c33>No FAQ consultation data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), fb = /* @__PURE__ */ st(hb, [["__scopeId", "data-v-5d2c3c33"]]), gb = { class: "messages-per-agent-card" }, pb = {
  key: 0,
  class: "card-body"
}, vb = {
  key: 0,
  class: "chart-section"
}, bb = {
  key: 1,
  class: "empty-state"
}, mb = { class: "empty-state-content" }, yb = { class: "empty-icon-wrapper" }, _b = {
  key: 1,
  class: "loading-state"
}, xb = /* @__PURE__ */ Q({
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
    const s = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, n = e, o = a, i = (h) => {
      o("export", h);
    }, { isDark: r, colors: l } = lt(rt(n, "theme")), d = C(() => {
      const h = n.data?.agents_by_day || {}, p = Object.keys(h).sort();
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const v = /* @__PURE__ */ new Set();
      for (const b of Object.values(h))
        for (const g of Object.keys(b))
          v.add(g);
      const _ = Array.from(v).map((b) => {
        const g = s[b] || "#94a3b8";
        return {
          label: b.charAt(0).toUpperCase() + b.slice(1).replace(/_/g, " "),
          data: p.map((m) => h[m]?.[b] || 0),
          borderColor: g,
          backgroundColor: `${g}20`,
          pointBackgroundColor: g,
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
        datasets: _
      };
    }), u = C(() => n.options ? n.options : {
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
    return t({ isDark: r }), (h, p) => (y(), x("article", gb, [
      p[3] || (p[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Messages per Agent"),
          c("p", { class: "card-subtitle" }, "Agent interaction trends over time")
        ])
      ], -1)),
      e.loading ? (y(), x("div", _b, [...p[2] || (p[2] = [
        at('<div class="loading-container" data-v-b9368fc2><div class="chart-lines-loader" data-v-b9368fc2><div class="line line-1" data-v-b9368fc2></div><div class="line line-2" data-v-b9368fc2></div><div class="line line-3" data-v-b9368fc2></div><div class="line line-4" data-v-b9368fc2></div><div class="line line-5" data-v-b9368fc2></div></div><p class="loading-text" data-v-b9368fc2>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", pb, [
        d.value.labels && d.value.labels.length ? (y(), x("section", vb, [
          Z(me, {
            data: d.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ct(A(xt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", bb, [
          c("div", mb, [
            c("div", yb, [
              Z(A(Vt), { class: "empty-icon" })
            ]),
            p[0] || (p[0] = c("p", { class: "empty-title" }, "No agent interactions data", -1)),
            p[1] || (p[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), kb = /* @__PURE__ */ st(xb, [["__scopeId", "data-v-b9368fc2"]]), wb = { class: "record-locator-card" }, $b = {
  key: 0,
  class: "loading-state"
}, Mb = {
  key: 1,
  class: "card-body"
}, Sb = {
  key: 0,
  class: "chart-section"
}, Cb = { class: "chart-wrapper" }, Db = {
  key: 1,
  class: "table-section"
}, Ab = { class: "table-wrapper" }, Tb = { class: "data-table" }, Bb = { class: "table-header-row" }, Lb = {
  key: 0,
  class: "table-header"
}, Fb = {
  key: 1,
  class: "table-header"
}, Pb = { class: "table-body" }, Ib = { class: "table-cell font-medium" }, Eb = { class: "table-cell text-center" }, Rb = { class: "table-cell text-center" }, Ob = { class: "table-cell text-center" }, Vb = { class: "table-cell text-center" }, zb = { class: "table-cell text-center success-value" }, Nb = { class: "table-cell text-center failed-value" }, Wb = { class: "table-cell text-center warning-value" }, Hb = {
  key: 0,
  class: "table-cell text-center"
}, jb = {
  key: 1,
  class: "table-cell text-center failed-value"
}, Yb = {
  key: 2,
  class: "empty-state"
}, bs = 3, Kb = /* @__PURE__ */ Q({
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
  setup(e, { expose: t, emit: a }) {
    const s = e, n = a, o = (b) => {
      n("export", b);
    }, { isDark: i } = lt(rt(s, "theme")), r = tt(!1), l = C(() => s.data?.record_locator_by_day ? [...s.data.record_locator_by_day].sort(
      (b, g) => new Date(b.date).getTime() - new Date(g.date).getTime()
    ) : []), d = C(() => r.value ? l.value : l.value.slice(0, bs)), u = C(() => l.value.length > bs), h = C(() => s.data), p = C(() => ({
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
    })), v = (b, g) => !g || g === 0 ? "0%" : `${Math.round(b / g * 100)}%`, f = (b, g) => {
      const m = U(b), $ = v(b, g);
      return `${m} (${$})`;
    }, _ = C(() => {
      const b = [], g = [], m = /* @__PURE__ */ new Set(), $ = (G) => {
        m.has(G) || (b.push({ name: G }), m.add(G));
      };
      if (!h.value.total_checkin_initiated)
        return { nodes: b, links: g };
      $("Checkin Init"), $("Booking retrive"), $("Checkin Started"), $("Checkin Completed"), $("Checkin Closed");
      const k = h.value.total_checkin_initiated, w = h.value.total_record_locator_init, S = h.value.total_record_locator_started, D = h.value.total_record_locator_completed, T = h.value.total_record_locator_closed, O = h.value.total_record_locator_failed, P = h.value.total_record_locator_abandoned, B = h.value.total_record_locator_init_abandoned, R = h.value.total_checkin_pre_init_abandoned_error, H = h.value.total_checkin_pre_init_abandoned_voluntary, L = R != null || H != null, I = L ? Math.max(Number(R) || 0, 0) : 0, V = L ? Math.max(Number(H) || 0, 0) : 0, W = h.value.total_record_locator_init_abandoned_error, N = h.value.total_record_locator_init_abandoned_voluntary, j = W != null || N != null, K = j ? Math.max(Number(W) || 0, 0) : 0, nt = j ? Math.max(Number(N) || 0, 0) : 0;
      if (w > 0) {
        const G = Math.round(w / k * 100);
        g.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: w,
          label: `${w.toLocaleString()} (${G}%)`
        });
      }
      const et = k - w;
      if (L) {
        if (V > 0) {
          const G = Math.round(V / k * 100);
          $("Abandoned (Init)"), g.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: V,
            label: `${V.toLocaleString()} (${G}%)`
          });
        }
        if (I > 0) {
          const G = Math.round(I / k * 100);
          $("Booking not retreived"), g.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: I,
            label: `${I.toLocaleString()} (${G}%)`
          });
        }
      } else if (et > 0) {
        const G = Math.round(et / k * 100);
        $("Abandoned (Init)"), g.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: et,
          label: `${et.toLocaleString()} (${G}%)`
        });
      }
      if (S > 0) {
        const G = Math.round(S / k * 100);
        g.push({
          source: "Booking retrive",
          target: "Checkin Started",
          value: S,
          label: `${S.toLocaleString()} (${G}%)`
        });
      }
      if (j) {
        if (K > 0) {
          const G = Math.round(K / k * 100);
          $("Error"), g.push({
            source: "Booking retrive",
            target: "Error",
            value: K,
            label: `${K.toLocaleString()} (${G}%)`
          });
        }
        if (nt > 0) {
          const G = Math.round(nt / k * 100);
          $("Abandoned (Started)"), g.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: nt,
            label: `${nt.toLocaleString()} (${G}%)`
          });
        }
      } else if (B > 0) {
        const G = Math.round(B / k * 100);
        $("Abandoned (Started)"), g.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: B,
          label: `${B.toLocaleString()} (${G}%)`
        });
      }
      if (D > 0) {
        const G = Math.round(D / S * 100);
        g.push({
          source: "Checkin Started",
          target: "Checkin Completed",
          value: D,
          label: `${D.toLocaleString()} (${G}%)`
        });
      }
      if (T > 0) {
        const G = Math.round(T / S * 100);
        g.push({
          source: "Checkin Completed",
          target: "Checkin Closed",
          value: T,
          label: `${T.toLocaleString()} (${G}%)`
        });
      }
      if (O > 0) {
        const G = Math.round(O / S * 100);
        $("Checkin Failed"), g.push({
          source: "Checkin Started",
          target: "Checkin Failed",
          value: O,
          label: `${O.toLocaleString()} (${G}%)`
        });
      }
      if (P > 0) {
        const G = Math.round(P / S * 100);
        $("Abandoned (Flow)"), g.push({
          source: "Checkin Started",
          target: "Abandoned (Flow)",
          value: P,
          label: `${P.toLocaleString()} (${G}%)`
        });
      }
      return { nodes: b, links: g };
    });
    return t({ isDark: i }), (b, g) => (y(), x("article", wb, [
      g[12] || (g[12] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Checkin by Record Locator Metrics"),
          c("p", { class: "card-subtitle" }, "Checkin by record locator retrieval and completion analysis")
        ])
      ], -1)),
      s.loading ? (y(), x("div", $b, [...g[1] || (g[1] = [
        at('<div class="loading-container" data-v-e48cea55><div class="chart-flow-loader" data-v-e48cea55><div class="flow-line flow-1" data-v-e48cea55></div><div class="flow-line flow-2" data-v-e48cea55></div><div class="flow-line flow-3" data-v-e48cea55></div><div class="flow-line flow-4" data-v-e48cea55></div><div class="flow-line flow-5" data-v-e48cea55></div></div><p class="loading-text" data-v-e48cea55>Loading record locator data...</p></div>', 1)
      ])])) : (y(), x("div", Mb, [
        _.value.nodes.length > 0 ? (y(), x("section", Sb, [
          c("div", Cb, [
            Z(ye, {
              data: _.value,
              height: "500px",
              "node-colors": p.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : E("", !0),
        l.value && l.value.length > 0 ? (y(), x("section", Db, [
          c("div", Ab, [
            c("table", Tb, [
              c("thead", null, [
                c("tr", Bb, [
                  g[2] || (g[2] = c("th", { class: "table-header" }, "Date", -1)),
                  g[3] || (g[3] = c("th", { class: "table-header" }, "Checkin Init", -1)),
                  g[4] || (g[4] = c("th", { class: "table-header" }, "Booking Retrieve (%)", -1)),
                  g[5] || (g[5] = c("th", { class: "table-header" }, "Checkin Started", -1)),
                  g[6] || (g[6] = c("th", { class: "table-header" }, "Checkin Completed (%)", -1)),
                  g[7] || (g[7] = c("th", { class: "table-header" }, "Checkin Closed (%)", -1)),
                  g[8] || (g[8] = c("th", { class: "table-header" }, "Checkin Failed (%)", -1)),
                  g[9] || (g[9] = c("th", { class: "table-header" }, "Abandoned (%)", -1)),
                  s.isAvianca ? (y(), x("th", Lb, "Create Payment")) : E("", !0),
                  s.isAvianca ? (y(), x("th", Fb, "Failed Payment")) : E("", !0)
                ])
              ]),
              c("tbody", Pb, [
                (y(!0), x(q, null, J(d.value, (m) => (y(), x("tr", {
                  key: m.date,
                  class: "table-row"
                }, [
                  c("td", Ib, M(A(At)(m.date).format("DD/MM/YYYY")), 1),
                  c("td", Eb, M(A(U)(m.checkin_initiated)), 1),
                  c("td", Rb, M(f(m.record_locator_init_count, m.checkin_initiated)), 1),
                  c("td", Ob, M(A(U)(m.record_locator_started_count)), 1),
                  c("td", Vb, M(f(m.record_locator_completed_count, m.record_locator_started_count)), 1),
                  c("td", zb, M(f(m.record_locator_closed_count, m.record_locator_started_count)), 1),
                  c("td", Nb, M(f(m.record_locator_failed_count, m.record_locator_started_count)), 1),
                  c("td", Wb, M(f(m.record_locator_abandoned_count, m.record_locator_started_count)), 1),
                  s.isAvianca ? (y(), x("td", Hb, M(A(U)(m.record_locator_create_payment_count)), 1)) : E("", !0),
                  s.isAvianca ? (y(), x("td", jb, M(A(U)(m.record_locator_create_payment_failed_count)), 1)) : E("", !0)
                ]))), 128))
              ])
            ])
          ]),
          u.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: g[0] || (g[0] = (m) => r.value = !r.value)
          }, [
            kt(M(r.value ? "View less" : `View more (${l.value.length - bs} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: Y(["view-more-icon", { "view-more-icon-rotated": r.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...g[10] || (g[10] = [
              c("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : E("", !0),
          e.enableExport ? (y(), ct(A(xt), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", Yb, [...g[11] || (g[11] = [
          at('<div class="empty-state-content" data-v-e48cea55><div class="empty-icon-wrapper" data-v-e48cea55><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e48cea55><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" data-v-e48cea55></path></svg></div><p class="empty-title" data-v-e48cea55>No record locator data available</p><p class="empty-description" data-v-e48cea55>No record locator data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Ub = /* @__PURE__ */ st(Kb, [["__scopeId", "data-v-e48cea55"]]), qb = { class: "sales-channel-card" }, Xb = {
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
  class: "comparison-section"
}, em = { class: "comparison-grid" }, am = { class: "comparison-content" }, sm = { class: "comparison-channel" }, nm = { class: "comparison-value" }, om = {
  key: 0,
  class: "comparison-delta"
}, im = {
  key: 0,
  class: "delta-icon",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, rm = {
  key: 1,
  class: "delta-icon",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, lm = { class: "delta-label" }, cm = {
  key: 1,
  class: "comparison-delta"
}, dm = /* @__PURE__ */ Q({
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
  setup(e, { expose: t, emit: a }) {
    const s = {
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
    }, n = ["#B0C4DE", "#C9A0F2", "#F5C26B", "#8BE8B0", "#F2A07A", "#7BA3E8"], o = e, i = a, r = (p) => {
      i("export", p);
    }, { isDark: l } = lt(rt(o, "theme"));
    C(() => o.data?.total_sell_success ?? 0);
    const d = C(() => {
      const p = /* @__PURE__ */ new Set();
      for (const v of o.data?.sales_by_channel_by_day ?? [])
        for (const f of Object.keys(v.channels))
          p.add(f);
      return Array.from(p).sort();
    }), u = (p, v) => s[p.toLowerCase()] ?? n[v % n.length], h = C(() => {
      const p = o.data?.sales_by_channel_by_day ?? [];
      if (p.length === 0) return { labels: [], datasets: [] };
      const v = p.map((_) => At(_.date).format("MMM-DD")), f = d.value.map((_, b) => ({
        label: _,
        data: p.map((g) => g.channels[_] ?? 0),
        backgroundColor: u(_, b),
        borderRadius: 4
      }));
      return { labels: v, datasets: f };
    });
    return t({ isDark: l }), (p, v) => (y(), x("article", qb, [
      v[5] || (v[5] = at('<header class="card-header" data-v-8b96a431><div class="header-content" data-v-8b96a431><div class="title-section" data-v-8b96a431><h3 class="card-title" data-v-8b96a431>Sales by Channel</h3><p class="card-subtitle" data-v-8b96a431>Successful sales breakdown by communication channel</p></div></div></header>', 1)),
      o.loading ? (y(), x("div", Xb, [...v[0] || (v[0] = [
        at('<div class="loading-container" data-v-8b96a431><div class="chart-bars-loader" data-v-8b96a431><div class="bar bar-1" data-v-8b96a431></div><div class="bar bar-2" data-v-8b96a431></div><div class="bar bar-3" data-v-8b96a431></div><div class="bar bar-4" data-v-8b96a431></div><div class="bar bar-5" data-v-8b96a431></div></div><p class="loading-text" data-v-8b96a431>Loading sales data...</p></div>', 1)
      ])])) : (y(), x("div", Gb, [
        h.value.labels.length > 0 ? (y(), x("section", Zb, [
          c("div", Qb, [
            Z(ie, {
              data: h.value,
              stacked: !0
            }, null, 8, ["data"])
          ]),
          e.enableExport ? (y(), ct(A(xt), {
            key: 0,
            onExport: r,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", Jb, [...v[1] || (v[1] = [
          at('<div class="empty-state-content" data-v-8b96a431><div class="empty-icon-wrapper" data-v-8b96a431><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-8b96a431><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-8b96a431></path></svg></div><p class="empty-title" data-v-8b96a431>No sales data available</p><p class="empty-description" data-v-8b96a431>No sales by channel data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])])),
        e.channelComparison.length > 0 ? (y(), x("section", tm, [
          c("div", em, [
            (y(!0), x(q, null, J(e.channelComparison, (f) => (y(), x("div", {
              key: f.channel,
              class: "comparison-card"
            }, [
              c("div", {
                class: "comparison-color-bar",
                style: mt({ backgroundColor: u(f.channel, e.channelComparison.indexOf(f)) })
              }, null, 4),
              c("div", am, [
                c("span", sm, M(f.channel), 1),
                c("span", nm, M(A(U)(f.current)), 1),
                f.delta !== null ? (y(), x("div", om, [
                  c("span", {
                    class: Y(["delta-badge", f.delta > 0 ? "delta-up" : f.delta < 0 ? "delta-down" : "delta-neutral"])
                  }, [
                    f.delta > 0 ? (y(), x("svg", im, [...v[2] || (v[2] = [
                      c("path", {
                        "fill-rule": "evenodd",
                        d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
                        "clip-rule": "evenodd"
                      }, null, -1)
                    ])])) : f.delta < 0 ? (y(), x("svg", rm, [...v[3] || (v[3] = [
                      c("path", {
                        "fill-rule": "evenodd",
                        d: "M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z",
                        "clip-rule": "evenodd"
                      }, null, -1)
                    ])])) : E("", !0),
                    kt(" " + M(Math.abs(f.delta).toFixed(1)) + "% ", 1)
                  ], 2),
                  c("span", lm, "vs prev. period (" + M(A(U)(f.previous)) + ")", 1)
                ])) : (y(), x("div", cm, [...v[4] || (v[4] = [
                  c("span", { class: "delta-label" }, "No previous data", -1)
                ])]))
              ])
            ]))), 128))
          ])
        ])) : E("", !0)
      ]))
    ]));
  }
}), um = /* @__PURE__ */ st(dm, [["__scopeId", "data-v-8b96a431"]]), hm = { class: "seller-metrics-card" }, fm = { class: "card-header" }, gm = { class: "header-content" }, pm = {
  key: 0,
  class: "payment-success-badge"
}, vm = {
  key: 0,
  class: "currency-breakdown-list"
}, bm = {
  key: 1,
  class: "badge-value"
}, mm = {
  key: 0,
  class: "loading-state"
}, ym = {
  key: 1,
  class: "card-body"
}, _m = {
  key: 0,
  class: "chart-section"
}, xm = { class: "chart-wrapper" }, km = {
  key: 1,
  class: "empty-state"
}, wm = {
  key: 2,
  class: "table-section"
}, $m = { class: "table-wrapper" }, Mm = { class: "data-table" }, Sm = { class: "table-body" }, Cm = { class: "table-cell font-medium" }, Dm = { class: "table-cell text-center" }, Am = { class: "table-cell text-center" }, Tm = { class: "table-cell text-center" }, Bm = { class: "table-cell text-center" }, Lm = { class: "table-cell text-center" }, Fm = { class: "table-cell text-center success-value" }, Pm = {
  key: 0,
  class: "currency-cell-list"
}, Im = { key: 1 }, Em = { class: "table-cell text-left" }, Rm = {
  key: 0,
  class: "failed-reasons"
}, Om = { class: "reason-name" }, Vm = { class: "reason-count" }, zm = {
  key: 1,
  class: "empty-cell"
}, ms = 3, Nm = /* @__PURE__ */ Q({
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
  setup(e, { expose: t, emit: a }) {
    const s = e, n = a, o = (w) => {
      n("export", w);
    }, { isDark: i } = lt(rt(s, "theme")), r = tt(!1), l = C(() => {
      if (!s.sellerData?.seller_by_day) return [];
      const w = [...s.sellerData.seller_by_day];
      return s.failedData?.failed_by_reason_by_day && s.failedData.failed_by_reason_by_day.forEach((S) => {
        const D = w.findIndex((T) => T.date === S.date);
        D !== -1 ? w[D] = { ...w[D], reasons: S.reasons } : w.push({
          date: S.date,
          seller_conversations: 0,
          sell_started_count: 0,
          sell_get_quote_count: 0,
          sell_booking_created_count: 0,
          sell_success_count: 0,
          daily_value_sell_success: 0,
          reasons: S.reasons
        });
      }), w.sort((S, D) => new Date(S.date).getTime() - new Date(D.date).getTime());
    }), d = C(() => r.value ? l.value : l.value.slice(0, ms)), u = C(() => l.value.length > ms), h = C(() => s.sellerData), p = C(() => s.failedData), v = C(
      () => Array.isArray(s.sellerData.total_value_sell_success) ? s.sellerData.total_value_sell_success : []
    ), f = C(() => {
      const {
        total_seller_conversations: w = 0,
        total_sell_started: S = 0,
        total_sell_booking_created: D = 0,
        total_sell_success: T = 0
      } = h.value, { failed_by_reason_by_day: O = [] } = p.value;
      if (w === 0) return { nodes: [], links: [] };
      const P = [
        { name: "Sell Initiated", value: w },
        { name: "Sell Started", value: S },
        { name: "Booking Created", value: D },
        { name: "Sell Success", value: T }
      ], B = [], R = w - S;
      if (R > 0) {
        const V = Math.round(R / w * 100);
        P.push({ name: "Abandoned (Init)", value: R }), B.push({
          source: "Sell Initiated",
          target: "Abandoned (Init)",
          value: R,
          label: `${R.toLocaleString()} (${V}%)`
        });
      }
      if (S > 0) {
        const V = Math.round(S / w * 100);
        B.push({
          source: "Sell Initiated",
          target: "Sell Started",
          value: S,
          label: `${S.toLocaleString()} (${V}%)`
        });
      }
      const H = O.reduce((V, W) => (W.reasons && Array.isArray(W.reasons) && W.reasons.forEach((N) => {
        const j = N.reason, K = N.failed_count;
        V[j] = (V[j] || 0) + K;
      }), V), {});
      if (D > 0) {
        const V = Math.round(D / w * 100);
        B.push({
          source: "Sell Started",
          target: "Booking Created",
          value: D,
          label: `${D.toLocaleString()} (${V}%)`
        });
      }
      if (T > 0) {
        const V = Math.round(T / w * 100);
        B.push({
          source: "Booking Created",
          target: "Sell Success",
          value: T,
          label: `${T.toLocaleString()} (${V}%)`
        });
      }
      const L = S - D;
      if (L > 0) {
        const V = Math.round(L / w * 100);
        P.push({ name: "Failed at Booking", value: L }), B.push({
          source: "Sell Started",
          target: "Failed at Booking",
          value: L,
          label: `${L.toLocaleString()} (${V}%)`
        });
      }
      if (Object.keys(H).length > 0) {
        const V = Object.values(H).reduce((N, j) => N + j, 0), W = L - V;
        if (Object.entries(H).filter(([, N]) => N > 0).sort(([, N], [, j]) => j - N).forEach(([N, j]) => {
          const K = Math.round(j / w * 100);
          P.push({ name: `Failed: ${N}`, value: j }), B.push({
            source: "Failed at Booking",
            target: `Failed: ${N}`,
            value: j,
            label: `${j.toLocaleString()} (${K}%)`
          });
        }), W > 0) {
          const N = Math.round(W / w * 100);
          P.push({ name: "Failed: Without Reason", value: W }), B.push({
            source: "Failed at Booking",
            target: "Failed: Without Reason",
            value: W,
            label: `${W.toLocaleString()} (${N}%)`
          });
        }
      }
      const I = D - T;
      if (I > 0) {
        const V = Math.round(I / w * 100);
        P.push({ name: "Failed at Completion", value: I }), B.push({
          source: "Booking Created",
          target: "Failed at Completion",
          value: I,
          label: `${I.toLocaleString()} (${V}%)`
        });
      }
      return { nodes: P, links: B };
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
    }, b = C(() => _), g = (w, S) => !S || S === 0 ? "0%" : `${Math.round(w / S * 100)}%`, m = (w, S) => {
      const D = U(w), T = g(w, S);
      return `${D} (${T})`;
    }, $ = (w) => w == null ? 0 : typeof w == "number" ? w : Array.isArray(w) ? w.reduce((S, D) => S + (D.total_value || 0), 0) : 0, k = (w) => ft($(w));
    return t({ isDark: i }), (w, S) => (y(), x("article", hm, [
      c("header", fm, [
        c("div", gm, [
          S[2] || (S[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Seller Metrics"),
            c("p", { class: "card-subtitle" }, "Sales performance and failure analysis")
          ], -1)),
          s.loading ? E("", !0) : (y(), x("div", pm, [
            S[1] || (S[1] = c("p", { class: "badge-label" }, "Total Sales Value", -1)),
            v.value.length > 0 ? (y(), x("div", vm, [
              (y(!0), x(q, null, J(v.value, (D) => (y(), x("p", {
                key: D.currency,
                class: "currency-breakdown-item"
              }, M(D.currency) + " " + M(A(ft)(D.total_value)), 1))), 128))
            ])) : (y(), x("p", bm, M(k(s.sellerData.total_value_sell_success)), 1))
          ]))
        ])
      ]),
      s.loading ? (y(), x("div", mm, [...S[3] || (S[3] = [
        at('<div class="loading-container" data-v-60dfa4f1><div class="chart-flow-loader" data-v-60dfa4f1><div class="flow-line flow-1" data-v-60dfa4f1></div><div class="flow-line flow-2" data-v-60dfa4f1></div><div class="flow-line flow-3" data-v-60dfa4f1></div><div class="flow-line flow-4" data-v-60dfa4f1></div><div class="flow-line flow-5" data-v-60dfa4f1></div></div><p class="loading-text" data-v-60dfa4f1>Loading sales data...</p></div>', 1)
      ])])) : (y(), x("div", ym, [
        f.value.nodes.length > 0 ? (y(), x("section", _m, [
          c("div", xm, [
            Z(ye, {
              data: f.value,
              "node-colors": b.value,
              title: "",
              height: "320px"
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : (y(), x("section", km, [...S[4] || (S[4] = [
          at('<div class="empty-state-content" data-v-60dfa4f1><div class="empty-icon-wrapper" data-v-60dfa4f1><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-60dfa4f1><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-60dfa4f1></path></svg></div><p class="empty-title" data-v-60dfa4f1>No sales data available</p><p class="empty-description" data-v-60dfa4f1>No sales data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])])),
        l.value && l.value.length > 0 ? (y(), x("section", wm, [
          c("div", $m, [
            c("table", Mm, [
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
              c("tbody", Sm, [
                (y(!0), x(q, null, J(d.value, (D) => (y(), x("tr", {
                  key: D.date,
                  class: "table-row"
                }, [
                  c("td", Cm, M(A(At)(D.date).format("DD/MM/YYYY")), 1),
                  c("td", Dm, M(A(U)(D.seller_conversations || 0)), 1),
                  c("td", Am, M(m(D.sell_started_count, D.seller_conversations || D.sell_started_count)), 1),
                  c("td", Tm, M(m(D.sell_get_quote_count, D.seller_conversations || D.sell_started_count)), 1),
                  c("td", Bm, M(m(D.sell_booking_created_count, D.seller_conversations || D.sell_started_count)), 1),
                  c("td", Lm, M(m(D.sell_success_count, D.seller_conversations || D.sell_started_count)), 1),
                  c("td", Fm, [
                    Array.isArray(D.daily_value_sell_success) && D.daily_value_sell_success.length > 0 ? (y(), x("div", Pm, [
                      (y(!0), x(q, null, J(D.daily_value_sell_success, (T) => (y(), x("span", {
                        key: `${D.date}-${T.currency}`
                      }, M(T.currency) + " " + M(A(ft)(T.total_value)), 1))), 128))
                    ])) : (y(), x("span", Im, M(k(D.daily_value_sell_success)), 1))
                  ]),
                  c("td", Em, [
                    D.reasons && D.reasons.length > 0 ? (y(), x("div", Rm, [
                      (y(!0), x(q, null, J(D.reasons, (T) => (y(), x("div", {
                        key: T.reason,
                        class: "failed-reason-item"
                      }, [
                        c("span", Om, M(T.reason) + ":", 1),
                        c("span", Vm, M(T.failed_count), 1)
                      ]))), 128))
                    ])) : (y(), x("div", zm, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          u.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: S[0] || (S[0] = (D) => r.value = !r.value)
          }, [
            kt(M(r.value ? "View less" : `View more (${l.value.length - ms} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: Y(["view-more-icon", { "view-more-icon-rotated": r.value }]),
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
          e.enableExport ? (y(), ct(A(xt), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : E("", !0)
      ]))
    ]));
  }
}), Wm = /* @__PURE__ */ st(Nm, [["__scopeId", "data-v-60dfa4f1"]]), Hm = { class: "top-agents-card" }, jm = {
  key: 0,
  class: "card-body"
}, Ym = {
  key: 0,
  class: "chart-section"
}, Km = {
  key: 1,
  class: "empty-state"
}, Um = { class: "empty-state-content" }, qm = { class: "empty-icon-wrapper" }, Xm = {
  key: 1,
  class: "loading-state"
}, Gm = /* @__PURE__ */ Q({
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
    const s = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, n = e, o = a, i = (h) => {
      o("export", h);
    }, { isDark: r, colors: l } = lt(rt(n, "theme")), d = C(() => {
      const p = (n.data?.top_agents || []).filter(
        (b) => b.agent_type?.toLowerCase() !== "triage"
      );
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const v = p.reduce(
        (b, g) => b + (Number(g.conversations) || 0),
        0
      ), f = p.map((b) => {
        const g = b.agent_type?.toLowerCase();
        return s[g] || "#94a3b8";
      }), _ = f.map((b) => `${b}80`);
      return {
        labels: p.map((b) => {
          const g = Number(b.conversations) || 0, m = v ? g / v * 100 : 0;
          return `${b.agent_type} - ${g.toLocaleString()} (${m.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: p.map((b) => b.conversations),
            backgroundColor: _,
            borderColor: f,
            borderWidth: 2
          }
        ]
      };
    }), u = C(() => n.options ? n.options : {
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
              const p = (h.label || "").toString().split(" - ")[0], v = Number(h.parsed) || 0, f = (h.dataset.data || []).reduce(
                (b, g) => b + (Number(g) || 0),
                0
              ), _ = f ? v / f * 100 : 0;
              return `${p}: ${v.toLocaleString()} (${_.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: r }), (h, p) => (y(), x("article", Hm, [
      p[3] || (p[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Top Agents"),
          c("p", { class: "card-subtitle" }, "Interactions by agent (excluding triage)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Xm, [...p[2] || (p[2] = [
        at('<div class="loading-container" data-v-501bf4c4><div class="chart-lines-loader" data-v-501bf4c4><div class="line line-1" data-v-501bf4c4></div><div class="line line-2" data-v-501bf4c4></div><div class="line line-3" data-v-501bf4c4></div><div class="line line-4" data-v-501bf4c4></div><div class="line line-5" data-v-501bf4c4></div></div><p class="loading-text" data-v-501bf4c4>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", jm, [
        d.value.labels && d.value.labels.length ? (y(), x("section", Ym, [
          Z(Za, {
            data: d.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ct(A(xt), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", Km, [
          c("div", Um, [
            c("div", qm, [
              Z(A(Pg), { class: "empty-icon" })
            ]),
            p[0] || (p[0] = c("p", { class: "empty-title" }, "No top agents data", -1)),
            p[1] || (p[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Zm = /* @__PURE__ */ st(Gm, [["__scopeId", "data-v-501bf4c4"]]), Qm = { class: "payment-method-card" }, Jm = { class: "card-header" }, t1 = { class: "header-content" }, e1 = {
  key: 0,
  class: "stats-badge"
}, a1 = {
  key: 0,
  class: "currency-breakdown-list"
}, s1 = {
  key: 1,
  class: "badge-value"
}, n1 = {
  key: 0,
  class: "loading-state"
}, o1 = {
  key: 1,
  class: "card-body"
}, i1 = {
  key: 0,
  class: "payment-methods-section"
}, r1 = { class: "payment-methods-grid" }, l1 = { class: "payment-card-content" }, c1 = { class: "payment-card-header" }, d1 = {
  key: 0,
  class: "currency-cell-list"
}, u1 = { class: "payment-badge-wrapper" }, h1 = {
  key: 1,
  class: "empty-state"
}, f1 = { class: "empty-state-content" }, g1 = { class: "empty-icon-wrapper" }, p1 = {
  key: 2,
  class: "table-section"
}, v1 = { class: "table-wrapper" }, b1 = { class: "data-table" }, m1 = { class: "table-body" }, y1 = { class: "table-cell font-medium" }, _1 = { class: "table-cell text-center" }, x1 = { class: "table-cell text-center success-value" }, k1 = {
  key: 0,
  class: "currency-cell-list"
}, w1 = { key: 1 }, $1 = { class: "table-cell" }, M1 = { class: "payment-tags" }, S1 = { class: "tag-name" }, C1 = {
  key: 0,
  class: "tag-amount"
}, D1 = {
  key: 1,
  class: "tag-amount"
}, A1 = { class: "tag-count" }, T1 = {
  key: 3,
  class: "empty-table-state"
}, B1 = "Not Registered", ys = 3, L1 = /* @__PURE__ */ Q({
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
  setup(e, { expose: t, emit: a }) {
    const s = e, n = a, { isDark: o } = lt(rt(s, "theme")), i = tt(!1), r = tt({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), l = C(() => r.value.payment_method_breakdown && r.value.payment_method_breakdown.length > 0), d = C(() => r.value.payment_method_by_day && r.value.payment_method_by_day.length > 0), u = tt(!1), h = C(() => !r.value.payment_method_by_day || r.value.payment_method_by_day.length === 0 ? [] : [...r.value.payment_method_by_day].sort((L, I) => At(L.date).valueOf() - At(I.date).valueOf())), p = C(() => u.value ? h.value : h.value.slice(0, ys)), v = C(() => h.value.length > ys), f = (L) => {
      if (!L)
        return {
          airline_name: s.airlineName,
          start_date: "",
          end_date: "",
          total_conversations: 0,
          total_amount: 0,
          total_amount_by_currency: [],
          payment_method_breakdown: [],
          payment_method_by_day: []
        };
      const I = (L.payment_method_breakdown || []).map((W) => ({
        payment_method: W.payment_method || "Unknown",
        total_amount: W.total_amount ?? 0,
        count: W.count ?? 0,
        total_amount_by_currency: W.total_amount_by_currency ?? []
      })), V = (L.payment_method_by_day || []).map((W) => ({
        date: W.date || "",
        total_count: W.total_count ?? 0,
        total_amount: W.total_amount ?? 0,
        total_amount_by_currency: W.total_amount_by_currency ?? [],
        payment_methods: (W.payment_methods || []).map((N) => ({
          payment_method: N.payment_method || "Unknown",
          total_amount: N.total_amount ?? 0,
          count: N.count ?? 0,
          total_amount_by_currency: N.total_amount_by_currency ?? []
        }))
      }));
      return {
        airline_name: L.airline_name || s.airlineName,
        start_date: L.start_date || "",
        end_date: L.end_date || "",
        total_conversations: L.total_conversations ?? 0,
        total_amount: L.total_amount ?? 0,
        total_amount_by_currency: L.total_amount_by_currency ?? [],
        payment_method_breakdown: I,
        payment_method_by_day: V
      };
    }, _ = async () => {
      if (!(!s.fetchFunction || !s.dates || s.dates.length < 2 || !s.airlineName)) {
        i.value = !0;
        try {
          const [L, I] = s.dates.map((W) => At(W).format("YYYY-MM-DD")), V = await s.fetchFunction(s.airlineName, L, I);
          r.value = f(V);
        } catch (L) {
          console.error("Error fetching payment method metrics:", L), r.value = f(null);
        } finally {
          i.value = !1;
        }
      }
    }, b = [
      { bg: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)", border: "#a7f3d0", text: "#047857", value: "#065f46", icon: "#10b981", badge: "#059669" },
      { bg: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)", border: "#93c5fd", text: "#1d4ed8", value: "#1e40af", icon: "#3b82f6", badge: "#2563eb" },
      { bg: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)", border: "#d8b4fe", text: "#7c3aed", value: "#6d28d9", icon: "#8b5cf6", badge: "#7c3aed" },
      { bg: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)", border: "#fcd34d", text: "#b45309", value: "#92400e", icon: "#f59e0b", badge: "#d97706" },
      { bg: "linear-gradient(135deg, #fff1f2 0%, #fce7f3 100%)", border: "#fda4af", text: "#be123c", value: "#9f1239", icon: "#f43f5e", badge: "#e11d48" },
      { bg: "linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)", border: "#67e8f9", text: "#0e7490", value: "#155e75", icon: "#06b6d4", badge: "#0891b2" }
    ], g = (L) => {
      const I = b[L % b.length];
      return {
        background: I.bg,
        borderColor: I.border
      };
    }, m = (L) => ({ color: b[L % b.length].text }), $ = (L) => ({ color: b[L % b.length].value }), k = (L) => ({ color: b[L % b.length].icon }), w = (L) => ({ color: b[L % b.length].badge }), S = (L) => {
      const V = O(L).length;
      return V > 18 ? { fontSize: "0.75rem" } : V > 15 ? { fontSize: "0.875rem" } : V > 12 ? { fontSize: "1rem" } : { fontSize: "1.125rem" };
    }, D = (L) => {
      const I = L?.toLowerCase() || "";
      return !L || I === "unknown" ? zg : I.includes("credit") || I.includes("debit") ? So : I.includes("cash") || I.includes("efectivo") ? Lg : I.includes("bank") || I.includes("transfer") ? Fg : I.includes("zelle") || I.includes("pago") || I.includes("movil") ? Vg : I.includes("wallet") ? Ng : Og;
    }, T = (L) => !L || L.toLowerCase() === "unknown" ? B1 : L.replace(/_/g, " "), O = (L) => L == null ? "$0.00" : ft(L), P = (L) => L ? At(L).format("DD/MM/YYYY") : "-", B = (L) => L == null || Number.isNaN(Number(L)) ? 0 : Number(L), R = (L) => {
      n("export", L);
    };
    function H() {
      const L = s.data;
      L && (Array.isArray(L.payment_method_breakdown) && L.payment_method_breakdown.length > 0 || Array.isArray(L.payment_method_by_day) && L.payment_method_by_day.length > 0) && (i.value = !1, r.value = f(L));
    }
    return re(() => {
      s.data ? H() : _();
    }), Et(
      () => s.data,
      (L) => {
        L && H();
      },
      { deep: !0 }
    ), Et(
      () => s.dates,
      (L) => {
        s.data || L && L[0] && L[1] && _();
      },
      { deep: !0 }
    ), t({ isDark: o }), (L, I) => (y(), x("article", Qm, [
      c("header", Jm, [
        c("div", t1, [
          I[2] || (I[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Payment Method Metrics"),
            c("p", { class: "card-subtitle" }, "Sales breakdown by payment method")
          ], -1)),
          !i.value && r.value.total_amount ? (y(), x("div", e1, [
            I[1] || (I[1] = c("p", { class: "badge-label" }, "Total Amount", -1)),
            r.value.total_amount_by_currency && r.value.total_amount_by_currency.length > 0 ? (y(), x("div", a1, [
              (y(!0), x(q, null, J(r.value.total_amount_by_currency, (V) => (y(), x("p", {
                key: V.currency,
                class: "currency-breakdown-item"
              }, M(V.currency) + " " + M(O(V.total_value)), 1))), 128))
            ])) : (y(), x("p", s1, M(O(r.value.total_amount)), 1))
          ])) : E("", !0)
        ])
      ]),
      i.value ? (y(), x("div", n1, [...I[3] || (I[3] = [
        at('<div class="loading-container" data-v-ff4ce0b7><div class="chart-lines-loader" data-v-ff4ce0b7><div class="line line-1" data-v-ff4ce0b7></div><div class="line line-2" data-v-ff4ce0b7></div><div class="line line-3" data-v-ff4ce0b7></div><div class="line line-4" data-v-ff4ce0b7></div><div class="line line-5" data-v-ff4ce0b7></div></div><p class="loading-text" data-v-ff4ce0b7>Loading payment data...</p></div>', 1)
      ])])) : (y(), x("div", o1, [
        l.value ? (y(), x("section", i1, [
          I[4] || (I[4] = c("p", { class: "section-label" }, "Sales by Payment Method", -1)),
          c("div", r1, [
            (y(!0), x(q, null, J(r.value.payment_method_breakdown, (V, W) => (y(), x("div", {
              key: V.payment_method,
              class: "payment-method-card-item",
              style: mt(g(W))
            }, [
              c("div", l1, [
                c("div", c1, [
                  (y(), ct(la(D(V.payment_method)), {
                    class: "payment-icon",
                    style: mt(k(W))
                  }, null, 8, ["style"])),
                  c("span", {
                    class: "payment-name",
                    style: mt(m(W))
                  }, M(T(V.payment_method)), 5)
                ]),
                c("p", {
                  class: "payment-amount",
                  style: mt([$(W), S(V.total_amount)])
                }, M(O(V.total_amount)), 5),
                V.total_amount_by_currency && V.total_amount_by_currency.length > 0 ? (y(), x("div", d1, [
                  (y(!0), x(q, null, J(V.total_amount_by_currency, (N) => (y(), x("span", {
                    key: `${V.payment_method}-${N.currency}`
                  }, M(N.currency) + " " + M(O(N.total_value)), 1))), 128))
                ])) : E("", !0),
                c("div", u1, [
                  c("span", {
                    class: "payment-badge",
                    style: mt(w(W))
                  }, M(B(V.count)) + " " + M(B(V.count) === 1 ? "sale" : "sales"), 5)
                ])
              ])
            ], 4))), 128))
          ])
        ])) : (y(), x("section", h1, [
          c("div", f1, [
            c("div", g1, [
              Z(A(So), { class: "empty-icon" })
            ]),
            I[5] || (I[5] = c("p", { class: "empty-title" }, "No payment data available", -1)),
            I[6] || (I[6] = c("p", { class: "empty-description" }, "No payment method data found for the selected period. Try adjusting the date range.", -1))
          ])
        ])),
        d.value ? (y(), x("section", p1, [
          I[10] || (I[10] = c("p", { class: "section-label" }, "Daily Breakdown", -1)),
          c("div", v1, [
            c("table", b1, [
              I[8] || (I[8] = c("thead", null, [
                c("tr", { class: "table-header-row" }, [
                  c("th", { class: "table-header text-left" }, "Date"),
                  c("th", { class: "table-header text-center" }, "Total Sales"),
                  c("th", { class: "table-header text-center" }, "Total Amount"),
                  c("th", { class: "table-header text-left" }, "Payment Methods")
                ])
              ], -1)),
              c("tbody", m1, [
                (y(!0), x(q, null, J(p.value, (V) => (y(), x("tr", {
                  key: V.date,
                  class: "table-row"
                }, [
                  c("td", y1, M(P(V.date)), 1),
                  c("td", _1, M(A(U)(V.total_count ?? 0)), 1),
                  c("td", x1, [
                    V.total_amount_by_currency && V.total_amount_by_currency.length > 0 ? (y(), x("div", k1, [
                      (y(!0), x(q, null, J(V.total_amount_by_currency, (W) => (y(), x("span", {
                        key: `${V.date}-${W.currency}`
                      }, M(W.currency) + " " + M(O(W.total_value)), 1))), 128))
                    ])) : (y(), x("span", w1, M(O(V.total_amount)), 1))
                  ]),
                  c("td", $1, [
                    c("div", M1, [
                      (y(!0), x(q, null, J(V.payment_methods || [], (W) => (y(), x("div", {
                        key: W.payment_method,
                        class: "payment-tag"
                      }, [
                        c("span", S1, M(T(W.payment_method)), 1),
                        I[7] || (I[7] = c("span", { class: "tag-separator" }, "•", -1)),
                        !W.total_amount_by_currency || W.total_amount_by_currency.length === 0 ? (y(), x("span", C1, M(O(W.total_amount)), 1)) : (y(), x("span", D1, M(W.total_amount_by_currency.map((N) => `${N.currency} ${O(N.total_value)}`).join(" / ")), 1)),
                        c("span", A1, "(" + M(B(W.count)) + ")", 1)
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
            onClick: I[0] || (I[0] = (V) => u.value = !u.value)
          }, [
            kt(M(u.value ? "View less" : `View more (${h.value.length - ys} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: Y(["view-more-icon", { "view-more-icon-rotated": u.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...I[9] || (I[9] = [
              c("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : E("", !0),
          e.enableExport ? (y(), ct(A(xt), {
            key: 1,
            onExport: R,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : l.value ? (y(), x("div", T1, [...I[11] || (I[11] = [
          c("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
        ])])) : E("", !0)
      ]))
    ]));
  }
}), F1 = /* @__PURE__ */ st(L1, [["__scopeId", "data-v-ff4ce0b7"]]), P1 = { class: "agent-human-conv-card" }, I1 = {
  key: 0,
  class: "loading-state"
}, E1 = {
  key: 1,
  class: "card-body"
}, R1 = { class: "summary-cards" }, O1 = { class: "summary-card assigned-card" }, V1 = { class: "summary-card-content" }, z1 = { class: "card-content" }, N1 = { class: "card-value assigned-value" }, W1 = { class: "card-content" }, H1 = { class: "card-value assigned-value" }, j1 = { class: "summary-card closed-card" }, Y1 = { class: "summary-card-content" }, K1 = { class: "card-content" }, U1 = { class: "card-value closed-value" }, q1 = { class: "card-content" }, X1 = { class: "card-value closed-value" }, G1 = {
  key: 0,
  class: "agents-section"
}, Z1 = { class: "date-header" }, Q1 = { class: "date-title" }, J1 = { class: "date-stats" }, ty = { class: "stat-item assigned-stat" }, ey = { class: "stat-value" }, ay = { class: "stat-value" }, sy = { class: "stat-item closed-stat" }, ny = { class: "stat-value" }, oy = { class: "stat-value" }, iy = { class: "table-wrapper" }, ry = { class: "data-table" }, ly = { class: "table-body" }, cy = { class: "table-cell name-cell" }, dy = { class: "table-cell email-cell" }, uy = { class: "table-cell text-center" }, hy = { class: "metric-cell-content" }, fy = { class: "badge assigned-badge" }, gy = { class: "metric-cell-avg" }, py = { class: "table-cell text-center" }, vy = { class: "metric-cell-content" }, by = { class: "badge closed-badge" }, my = { class: "metric-cell-avg" }, yy = {
  key: 1,
  class: "empty-state"
}, _y = /* @__PURE__ */ Q({
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
  setup(e, { expose: t, emit: a }) {
    const s = e, n = a, o = (b) => {
      n("export", b);
    }, { isDark: i } = lt(rt(s, "theme")), r = C(() => s.data?.agents_by_day && s.data.agents_by_day.length > 0), l = C(() => {
      if (!r.value) return {};
      const b = {};
      for (const $ of s.data.agents_by_day)
        b[$.date] || (b[$.date] = []), b[$.date].push($);
      const g = Object.keys(b).sort(($, k) => new Date($).getTime() - new Date(k).getTime()), m = {};
      for (const $ of g)
        m[$] = b[$];
      return m;
    }), d = (b) => b == null ? "0" : U(b), u = (b) => {
      if (b == null)
        return "AVG";
      if (b < 60)
        return `${Math.round(b)}s`;
      const g = Math.round(b), m = Math.floor(g / 60), $ = g % 60;
      if (m < 60)
        return `${m}m ${$}s`;
      const k = Math.floor(m / 60), w = m % 60;
      return `${k}h ${w}m`;
    }, h = (b) => {
      const g = new Date(b), m = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return g.toLocaleDateString("en-US", m);
    }, p = (b) => b[0]?.day_total_assigned ?? 0, v = (b) => b[0]?.day_total_closed ?? 0, f = (b) => b[0]?.day_avg_time_to_assign_seconds ?? null, _ = (b) => b[0]?.day_avg_conversation_duration_seconds ?? null;
    return t({ isDark: i }), (b, g) => (y(), x("article", P1, [
      g[11] || (g[11] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Agent Human Conversations"),
          c("p", { class: "card-subtitle" }, "Human conversation assignments and closures by agent")
        ])
      ], -1)),
      e.loading ? (y(), x("div", I1, [...g[0] || (g[0] = [
        at('<div class="loading-container" data-v-6cfba83b><div class="chart-bars-loader" data-v-6cfba83b><div class="bar bar-1" data-v-6cfba83b></div><div class="bar bar-2" data-v-6cfba83b></div><div class="bar bar-3" data-v-6cfba83b></div><div class="bar bar-4" data-v-6cfba83b></div><div class="bar bar-5" data-v-6cfba83b></div></div><p class="loading-text" data-v-6cfba83b>Loading agent data...</p></div>', 1)
      ])])) : (y(), x("div", E1, [
        c("div", R1, [
          c("div", O1, [
            g[3] || (g[3] = c("div", { class: "card-decoration" }, null, -1)),
            c("div", V1, [
              c("div", z1, [
                g[1] || (g[1] = c("p", { class: "card-label" }, "Total Assigned", -1)),
                c("p", N1, M(d(e.data.total_assigned)), 1)
              ]),
              c("div", W1, [
                g[2] || (g[2] = c("p", { class: "card-label" }, "AVG time to assign", -1)),
                c("p", H1, M(u(e.data.avg_time_to_assign_seconds)), 1)
              ])
            ])
          ]),
          c("div", j1, [
            g[6] || (g[6] = c("div", { class: "card-decoration" }, null, -1)),
            c("div", Y1, [
              c("div", K1, [
                g[4] || (g[4] = c("p", { class: "card-label" }, "Total Closed", -1)),
                c("p", U1, M(d(e.data.total_closed)), 1)
              ]),
              c("div", q1, [
                g[5] || (g[5] = c("p", { class: "card-label" }, "AVG time to close", -1)),
                c("p", X1, M(u(e.data.avg_conversation_duration_seconds)), 1)
              ])
            ])
          ])
        ]),
        r.value ? (y(), x("div", G1, [
          (y(!0), x(q, null, J(l.value, (m, $) => (y(), x("div", {
            key: $,
            class: "date-group"
          }, [
            c("div", Z1, [
              c("h4", Q1, M(h($)), 1),
              c("div", J1, [
                c("span", ty, [
                  c("span", ey, M(d(p(m))), 1),
                  g[7] || (g[7] = kt(" Assigned ", -1)),
                  c("span", ay, M(u(f(m))), 1)
                ]),
                c("span", sy, [
                  c("span", ny, M(d(v(m))), 1),
                  g[8] || (g[8] = kt(" Closed ", -1)),
                  c("span", oy, M(u(_(m))), 1)
                ])
              ])
            ]),
            c("div", iy, [
              c("table", ry, [
                g[9] || (g[9] = c("thead", null, [
                  c("tr", { class: "table-header-row" }, [
                    c("th", { class: "table-header" }, "Agent Name"),
                    c("th", { class: "table-header" }, "Email"),
                    c("th", { class: "table-header" }, "Assigned (AVG time to assign)"),
                    c("th", { class: "table-header" }, "Closed (AVG time to close)")
                  ])
                ], -1)),
                c("tbody", ly, [
                  (y(!0), x(q, null, J(m, (k) => (y(), x("tr", {
                    key: `${$}-${k.agent_email}`,
                    class: "table-row"
                  }, [
                    c("td", cy, M(k.agent_name || "-"), 1),
                    c("td", dy, M(k.agent_email), 1),
                    c("td", uy, [
                      c("div", hy, [
                        c("span", fy, M(d(k.assigned_count)), 1),
                        c("span", gy, M(u(k.avg_time_to_assign_seconds)), 1)
                      ])
                    ]),
                    c("td", py, [
                      c("div", vy, [
                        c("span", by, M(d(k.closed_count)), 1),
                        c("span", my, M(u(k.avg_conversation_duration_seconds)), 1)
                      ])
                    ])
                  ]))), 128))
                ])
              ])
            ])
          ]))), 128)),
          e.enableExport ? (y(), ct(A(xt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("div", yy, [...g[10] || (g[10] = [
          at('<div class="empty-state-content" data-v-6cfba83b><div class="empty-icon-wrapper" data-v-6cfba83b><svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-6cfba83b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-6cfba83b></path></svg></div><p class="empty-title" data-v-6cfba83b>No agent human conversation data available</p><p class="empty-description" data-v-6cfba83b>Try adjusting the date range or check your filters.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), xy = /* @__PURE__ */ st(_y, [["__scopeId", "data-v-6cfba83b"]]), ky = { class: "channel-metrics-card" }, wy = {
  key: 0,
  class: "card-body"
}, $y = {
  key: 0,
  class: "kpi-grid"
}, My = { class: "kpi-label" }, Sy = { class: "kpi-value" }, Cy = { class: "kpi-card total-card" }, Dy = { class: "kpi-value" }, Ay = {
  key: 1,
  class: "chart-section"
}, Ty = {
  key: 2,
  class: "empty-state"
}, By = {
  key: 1,
  class: "loading-state"
}, Ly = /* @__PURE__ */ Q({
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
    const s = e, n = a, o = (p) => {
      n("export", p);
    }, { isDark: i, colors: r } = lt(rt(s, "theme")), l = tt({ labels: [], datasets: [] }), d = C(() => s.data ?? {
      channels_by_day: {},
      total_by_channel: {},
      total_conversations: 0
    }), u = C(() => ({
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
    })), h = (p) => {
      if (!p || !p.channels_by_day) {
        l.value = { labels: [], datasets: [] };
        return;
      }
      const v = p.channels_by_day, f = Object.keys(v).sort();
      if (f.length === 0) {
        l.value = { labels: [], datasets: [] };
        return;
      }
      const _ = /* @__PURE__ */ new Set();
      for (const $ of Object.values(v))
        for (const k of Object.keys($))
          _.add(k);
      const b = Array.from(_), g = {
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
      }, m = b.map(($) => {
        const k = $.toLowerCase(), w = g[k] || "#9ca3af";
        return {
          label: $.toUpperCase(),
          data: f.map((S) => v[S]?.[$] || 0),
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
        labels: f.map(($) => At($).format("MMM DD")),
        datasets: m
      };
    };
    return Et(
      () => s.data,
      (p) => {
        h(p ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: i }), (p, v) => (y(), x("article", ky, [
      v[3] || (v[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Channel Metrics"),
          c("p", { class: "card-subtitle" }, "Communication channels performance")
        ])
      ], -1)),
      s.loading ? (y(), x("div", By, [...v[2] || (v[2] = [
        at('<div class="loading-container" data-v-82f175d2><div class="chart-bars-loader" data-v-82f175d2><div class="bar bar-1" data-v-82f175d2></div><div class="bar bar-2" data-v-82f175d2></div><div class="bar bar-3" data-v-82f175d2></div><div class="bar bar-4" data-v-82f175d2></div><div class="bar bar-5" data-v-82f175d2></div></div><p class="loading-text" data-v-82f175d2>Loading channel metrics...</p></div>', 1)
      ])])) : (y(), x("div", wy, [
        Object.keys(d.value.total_by_channel).length ? (y(), x("div", $y, [
          (y(!0), x(q, null, J(Object.keys(d.value.total_by_channel), (f) => (y(), x("div", {
            class: "kpi-card",
            key: f
          }, [
            c("span", My, M(f.toUpperCase()), 1),
            c("span", Sy, M(A(U)(d.value.total_by_channel[f])), 1)
          ]))), 128)),
          c("div", Cy, [
            v[0] || (v[0] = c("span", { class: "kpi-label" }, "Total Conversations", -1)),
            c("span", Dy, M(A(U)(d.value.total_conversations)), 1)
          ])
        ])) : E("", !0),
        l.value.labels && l.value.labels.length ? (y(), x("section", Ay, [
          Z(me, {
            data: l.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ct(A(xt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", Ty, [...v[1] || (v[1] = [
          at('<div class="empty-state-content" data-v-82f175d2><div class="empty-icon-wrapper" data-v-82f175d2><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-82f175d2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-82f175d2></path></svg></div><p class="empty-title" data-v-82f175d2>No channel metrics data available</p><p class="empty-description" data-v-82f175d2>No channel data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Fy = /* @__PURE__ */ st(Ly, [["__scopeId", "data-v-82f175d2"]]), Py = { class: "triage-combinations-card" }, Iy = { class: "card-header" }, Ey = { class: "total-badge" }, Ry = {
  key: 0,
  class: "card-body"
}, Oy = { class: "chart-container" }, Vy = { class: "table-container" }, zy = { class: "table-row" }, Ny = { class: "table-row" }, Wy = { class: "table-cell text-center count-cell" }, Hy = { class: "table-cell text-center count-cell" }, jy = { class: "table-cell text-center count-cell" }, Yy = { class: "table-cell text-center count-cell" }, Ky = { class: "table-cell text-center count-cell" }, Uy = {
  key: 1,
  class: "empty-state"
}, qy = { class: "empty-state-content" }, Xy = { class: "empty-icon-wrapper" }, Gy = {
  key: 1,
  class: "loading-state"
}, Zy = /* @__PURE__ */ Q({
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
    const s = e, n = a, o = (g) => {
      n("export", g);
    }, { isDark: i, colors: r } = lt(rt(s, "theme")), l = C(() => {
      const g = s.data?.combinations || {}, m = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [$, k] of Object.entries(g)) {
        const w = $.split("+").filter(Boolean);
        if (!w.includes("triage")) continue;
        const S = w.filter((D) => D !== "triage").length;
        S >= 4 ? m["4p"] += Number(k) || 0 : m[S] += Number(k) || 0;
      }
      return m;
    }), d = C(() => {
      const g = l.value;
      return g[0] + g[1] + g[2] + g[3] + g["4p"] || 0;
    }), u = C(() => Object.keys(s.data?.combinations || {}).length > 0), h = C(() => {
      const g = d.value;
      if (!g) return { pct0: 0, pct1: 0, pct2: 0, pct3: 0, pct4p: 0 };
      const m = l.value;
      return {
        pct0: m[0] / g * 100,
        pct1: m[1] / g * 100,
        pct2: m[2] / g * 100,
        pct3: m[3] / g * 100,
        pct4p: m["4p"] / g * 100
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
    }, v = (g) => g?.replace("80", "") || "#888888", f = C(() => ({
      labels: ["Distribution"],
      datasets: [
        {
          label: "0",
          data: [h.value.pct0],
          backgroundColor: p.c0,
          borderColor: v(p.c0),
          borderWidth: 1
        },
        {
          label: "1",
          data: [h.value.pct1],
          backgroundColor: p.c1,
          borderColor: v(p.c1),
          borderWidth: 1
        },
        {
          label: "2",
          data: [h.value.pct2],
          backgroundColor: p.c2,
          borderColor: v(p.c2),
          borderWidth: 1
        },
        {
          label: "3",
          data: [h.value.pct3],
          backgroundColor: p.c3,
          borderColor: v(p.c3),
          borderWidth: 1
        },
        {
          label: "4+",
          data: [h.value.pct4p],
          backgroundColor: p.c4p,
          borderColor: v(p.c4p),
          borderWidth: 1
        }
      ]
    })), _ = C(() => ({
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
            label: (g) => `${g.dataset.label} intent(s): ${Number(g.raw || 0).toFixed(0)}%`
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
    })), b = (g) => `${(Number(g) || 0).toFixed(0)}`;
    return t({ isDark: i }), (g, m) => (y(), x("article", Py, [
      c("header", Iy, [
        m[0] || (m[0] = c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Distribution of Number of Intents"),
          c("p", { class: "card-subtitle" }, "Analysis of intent combinations per conversation")
        ], -1)),
        c("span", Ey, " Total: " + M(d.value), 1)
      ]),
      e.loading ? (y(), x("div", Gy, [...m[6] || (m[6] = [
        at('<div class="loading-container" data-v-cb93cda2><div class="chart-bars-loader" data-v-cb93cda2><div class="bar bar-1" data-v-cb93cda2></div><div class="bar bar-2" data-v-cb93cda2></div><div class="bar bar-3" data-v-cb93cda2></div><div class="bar bar-4" data-v-cb93cda2></div><div class="bar bar-5" data-v-cb93cda2></div></div><p class="loading-text" data-v-cb93cda2>Loading intent distribution...</p></div>', 1)
      ])])) : (y(), x("div", Ry, [
        u.value ? (y(), x(q, { key: 0 }, [
          c("div", Oy, [
            Z(ie, {
              data: f.value,
              options: _.value
            }, null, 8, ["data", "options"])
          ]),
          c("div", Vy, [
            m[3] || (m[3] = at('<div class="table-header" data-v-cb93cda2><div class="table-cell header-cell" data-v-cb93cda2>Number of intentions</div><div class="table-cell header-cell text-center" data-v-cb93cda2>0</div><div class="table-cell header-cell text-center" data-v-cb93cda2>1</div><div class="table-cell header-cell text-center" data-v-cb93cda2>2</div><div class="table-cell header-cell text-center" data-v-cb93cda2>3</div><div class="table-cell header-cell text-center" data-v-cb93cda2>4 or more</div></div>', 1)),
            c("div", zy, [
              m[1] || (m[1] = c("div", { class: "table-cell row-label" }, "% of total", -1)),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: mt({ color: v(p.c0) })
              }, M(b(h.value.pct0)) + "% ", 5),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: mt({ color: v(p.c1) })
              }, M(b(h.value.pct1)) + "% ", 5),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: mt({ color: v(p.c2) })
              }, M(b(h.value.pct2)) + "% ", 5),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: mt({ color: v(p.c3) })
              }, M(b(h.value.pct3)) + "% ", 5),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: mt({ color: v(p.c4p) })
              }, M(b(h.value.pct4p)) + "% ", 5)
            ]),
            c("div", Ny, [
              m[2] || (m[2] = c("div", { class: "table-cell row-label" }, "Count", -1)),
              c("div", Wy, M(A(U)(l.value[0])), 1),
              c("div", Hy, M(A(U)(l.value[1])), 1),
              c("div", jy, M(A(U)(l.value[2])), 1),
              c("div", Yy, M(A(U)(l.value[3])), 1),
              c("div", Ky, M(A(U)(l.value["4p"])), 1)
            ])
          ]),
          e.enableExport ? (y(), ct(A(xt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ], 64)) : (y(), x("div", Uy, [
          c("div", qy, [
            c("div", Xy, [
              Z(A(Vt), { class: "empty-icon" })
            ]),
            m[4] || (m[4] = c("p", { class: "empty-title" }, "No triage combinations data", -1)),
            m[5] || (m[5] = c("p", { class: "empty-description" }, "No intent distribution data found for the selected period. Try adjusting the date range.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Qy = /* @__PURE__ */ st(Zy, [["__scopeId", "data-v-cb93cda2"]]), Jy = { class: "select-language-card" }, t_ = { class: "card-header" }, e_ = { class: "header-content" }, a_ = {
  key: 0,
  class: "total-badge"
}, s_ = { class: "badge-value" }, n_ = {
  key: 0,
  class: "loading-state"
}, o_ = {
  key: 1,
  class: "card-body"
}, i_ = {
  key: 0,
  class: "pie-section"
}, r_ = {
  key: 1,
  class: "empty-state"
}, l_ = /* @__PURE__ */ Q({
  __name: "SelectLanguage",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: s, colors: n } = lt(rt(a, "theme")), o = [
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
    }, r = (v) => i[v]?.label || v.toUpperCase(), l = C(
      () => a.data?.items && a.data.items.length > 0
    ), d = C(
      () => (a.data?.items || []).reduce((v, f) => v + f.count, 0)
    ), u = C(() => {
      const v = {};
      for (const f of a.data?.items || [])
        v[f.language] = (v[f.language] || 0) + f.count;
      return Object.entries(v).map(([f, _]) => ({ language: f, count: _ })).sort((f, _) => _.count - f.count);
    }), h = C(() => ({
      labels: u.value.map((v) => r(v.language)),
      datasets: [{
        data: u.value.map((v) => v.count),
        backgroundColor: u.value.map((v, f) => o[f % o.length] + "80"),
        borderColor: u.value.map((v, f) => o[f % o.length]),
        borderWidth: 2,
        hoverOffset: 6
      }]
    })), p = C(() => ({
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
          borderColor: s.value ? "rgba(198, 125, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: { family: "'Space Grotesk', sans-serif", size: 13, weight: 600 },
          bodyFont: { family: "'DM Sans', sans-serif", size: 12 },
          callbacks: {
            label: (v) => {
              const f = v.raw || 0, _ = d.value > 0 ? (f / d.value * 100).toFixed(1) : "0";
              return ` ${v.label}: ${f} (${_}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: s }), (v, f) => (y(), x("article", Jy, [
      c("header", t_, [
        c("div", e_, [
          f[1] || (f[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Language Selection"),
            c("p", { class: "card-subtitle" }, "Language distribution across conversations")
          ], -1)),
          a.loading ? E("", !0) : (y(), x("div", a_, [
            f[0] || (f[0] = c("p", { class: "badge-label" }, "Total", -1)),
            c("p", s_, M(A(U)(d.value)), 1)
          ]))
        ])
      ]),
      a.loading ? (y(), x("div", n_, [...f[2] || (f[2] = [
        at('<div class="loading-container" data-v-216eadc2><div class="chart-bars-loader" data-v-216eadc2><div class="bar bar-1" data-v-216eadc2></div><div class="bar bar-2" data-v-216eadc2></div><div class="bar bar-3" data-v-216eadc2></div><div class="bar bar-4" data-v-216eadc2></div><div class="bar bar-5" data-v-216eadc2></div></div><p class="loading-text" data-v-216eadc2>Loading language data...</p></div>', 1)
      ])])) : (y(), x("div", o_, [
        l.value ? (y(), x("section", i_, [
          Z(Za, {
            data: h.value,
            options: p.value
          }, null, 8, ["data", "options"])
        ])) : (y(), x("section", r_, [...f[3] || (f[3] = [
          at('<div class="empty-state-content" data-v-216eadc2><div class="empty-icon-wrapper" data-v-216eadc2><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-216eadc2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" data-v-216eadc2></path></svg></div><p class="empty-title" data-v-216eadc2>No language data available</p><p class="empty-description" data-v-216eadc2>No language selection data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), c_ = /* @__PURE__ */ st(l_, [["__scopeId", "data-v-216eadc2"]]), d_ = { class: "guardrails-card" }, u_ = { class: "card-header" }, h_ = { class: "header-content" }, f_ = {
  key: 0,
  class: "total-badge"
}, g_ = { class: "badge-value" }, p_ = {
  key: 0,
  class: "loading-state"
}, v_ = {
  key: 1,
  class: "card-body"
}, b_ = { class: "summary-card" }, m_ = { class: "summary-items" }, y_ = { class: "summary-item" }, __ = { class: "summary-value" }, x_ = { class: "summary-pct" }, k_ = { class: "summary-item" }, w_ = { class: "summary-pct" }, $_ = { class: "summary-item" }, M_ = { class: "summary-value" }, S_ = { class: "summary-pct" }, C_ = {
  key: 0,
  class: "table-section"
}, D_ = { class: "table-wrapper" }, A_ = { class: "data-table" }, T_ = { class: "table-body" }, B_ = { class: "table-cell font-medium text-center" }, L_ = { class: "table-cell text-center font-semibold" }, F_ = { class: "table-cell" }, P_ = { class: "type-badges-row" }, I_ = {
  key: 1,
  class: "empty-state"
}, _s = 3, E_ = /* @__PURE__ */ Q({
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
    const s = e, n = a, o = (g) => {
      n("export", g);
    }, { isDark: i } = lt(rt(s, "theme")), r = C(
      () => s.data?.items && s.data.items.length > 0
    ), l = C(
      () => (s.data?.items || []).reduce((g, m) => g + m.count, 0)
    ), d = (g) => {
      const m = {};
      for (const w of s.data?.items || [])
        m[w[g]] = (m[w[g]] || 0) + w.count;
      const $ = Object.entries(m).sort((w, S) => S[1] - w[1]);
      if ($.length === 0) return { name: "—", pct: 0 };
      const k = l.value;
      return {
        name: $[0][0],
        pct: k > 0 ? Math.round($[0][1] / k * 100) : 0
      };
    }, u = C(() => d("guardrail_type")), h = C(() => d("guardrail_action")), p = C(() => d("guardrail_source")), v = C(() => {
      const g = {};
      for (const m of s.data?.items || [])
        g[m.date] || (g[m.date] = {}), g[m.date][m.guardrail_type] = (g[m.date][m.guardrail_type] || 0) + m.count;
      return Object.entries(g).map(([m, $]) => ({
        date: m,
        total: Object.values($).reduce((k, w) => k + w, 0),
        types: Object.entries($).map(([k, w]) => ({ type: k, count: w })).sort((k, w) => w.count - k.count)
      })).sort((m, $) => new Date(m.date).getTime() - new Date($.date).getTime());
    }), f = tt(!1), _ = C(() => f.value ? v.value : v.value.slice(0, _s)), b = C(() => v.value.length > _s);
    return t({ isDark: i }), (g, m) => (y(), x("article", d_, [
      c("header", u_, [
        c("div", h_, [
          m[2] || (m[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Guardrails Metrics"),
            c("p", { class: "card-subtitle" }, "Content safety guardrail events and actions")
          ], -1)),
          s.loading ? E("", !0) : (y(), x("div", f_, [
            m[1] || (m[1] = c("p", { class: "badge-label" }, "Total Events", -1)),
            c("p", g_, M(A(U)(l.value)), 1)
          ]))
        ])
      ]),
      s.loading ? (y(), x("div", p_, [...m[3] || (m[3] = [
        at('<div class="loading-container" data-v-02a2e95e><div class="chart-bars-loader" data-v-02a2e95e><div class="bar bar-1" data-v-02a2e95e></div><div class="bar bar-2" data-v-02a2e95e></div><div class="bar bar-3" data-v-02a2e95e></div><div class="bar bar-4" data-v-02a2e95e></div><div class="bar bar-5" data-v-02a2e95e></div></div><p class="loading-text" data-v-02a2e95e>Loading guardrails data...</p></div>', 1)
      ])])) : (y(), x("div", v_, [
        r.value ? (y(), x(q, { key: 0 }, [
          c("div", b_, [
            c("div", m_, [
              c("div", y_, [
                m[4] || (m[4] = c("span", { class: "summary-label" }, "Top type:", -1)),
                c("span", __, M(u.value.name), 1),
                c("span", x_, "(" + M(u.value.pct) + "%)", 1)
              ]),
              m[7] || (m[7] = c("span", { class: "summary-dot" }, "·", -1)),
              c("div", k_, [
                m[5] || (m[5] = c("span", { class: "summary-label" }, "Top action:", -1)),
                c("span", {
                  class: Y(["summary-value", `summary-action-${h.value.name.toLowerCase()}`])
                }, M(h.value.name), 3),
                c("span", w_, "(" + M(h.value.pct) + "%)", 1)
              ]),
              m[8] || (m[8] = c("span", { class: "summary-dot" }, "·", -1)),
              c("div", $_, [
                m[6] || (m[6] = c("span", { class: "summary-label" }, "Top source:", -1)),
                c("span", M_, M(p.value.name), 1),
                c("span", S_, "(" + M(p.value.pct) + "%)", 1)
              ])
            ])
          ]),
          v.value.length > 0 ? (y(), x("section", C_, [
            m[11] || (m[11] = c("div", { class: "section-header" }, [
              c("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            c("div", D_, [
              c("table", A_, [
                m[9] || (m[9] = c("thead", null, [
                  c("tr", { class: "table-header-row" }, [
                    c("th", { class: "table-header" }, "Date"),
                    c("th", { class: "table-header text-center" }, "Count"),
                    c("th", { class: "table-header" }, "Types")
                  ])
                ], -1)),
                c("tbody", T_, [
                  (y(!0), x(q, null, J(_.value, ($) => (y(), x("tr", {
                    key: $.date,
                    class: "table-row"
                  }, [
                    c("td", B_, M(A(At)($.date).format("DD/MM")), 1),
                    c("td", L_, M(A(U)($.total)), 1),
                    c("td", F_, [
                      c("div", P_, [
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
            b.value ? (y(), x("button", {
              key: 0,
              class: "view-more-btn",
              onClick: m[0] || (m[0] = ($) => f.value = !f.value)
            }, [
              kt(M(f.value ? "View less" : `View more (${v.value.length - _s} more rows)`) + " ", 1),
              (y(), x("svg", {
                class: Y(["view-more-icon", { "view-more-icon-rotated": f.value }]),
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
              }, [...m[10] || (m[10] = [
                c("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M19 9l-7 7-7-7"
                }, null, -1)
              ])], 2))
            ])) : E("", !0),
            e.enableExport ? (y(), ct(A(xt), {
              key: 1,
              onExport: o,
              loading: e.exportLoading
            }, null, 8, ["loading"])) : E("", !0)
          ])) : E("", !0)
        ], 64)) : (y(), x("section", I_, [...m[12] || (m[12] = [
          at('<div class="empty-state-content" data-v-02a2e95e><div class="empty-icon-wrapper" data-v-02a2e95e><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-02a2e95e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" data-v-02a2e95e></path></svg></div><p class="empty-title" data-v-02a2e95e>No guardrail events</p><p class="empty-description" data-v-02a2e95e>No content safety events found for the selected period. This is a good sign!</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), R_ = /* @__PURE__ */ st(E_, [["__scopeId", "data-v-02a2e95e"]]), O_ = { class: "dn-metrics-card" }, V_ = { class: "card-header" }, z_ = { class: "header-content" }, N_ = {
  key: 0,
  class: "total-docs-badge"
}, W_ = { class: "badge-value" }, H_ = {
  key: 0,
  class: "loading-state"
}, j_ = {
  key: 1,
  class: "card-body"
}, Y_ = { class: "kpi-grid" }, K_ = { class: "kpi-card kpi-neutral" }, U_ = { class: "kpi-value" }, q_ = { class: "kpi-card kpi-success" }, X_ = { class: "kpi-value kpi-value-success" }, G_ = { class: "kpi-pct" }, Z_ = { class: "kpi-card kpi-danger" }, Q_ = { class: "kpi-value kpi-value-error" }, J_ = { class: "kpi-pct" }, t2 = { class: "kpi-card kpi-warning" }, e2 = { class: "kpi-value kpi-value-reason" }, a2 = { class: "kpi-pct" }, s2 = { class: "chart-section" }, n2 = { class: "chart-wrapper" }, o2 = {
  key: 1,
  class: "empty-chart"
}, i2 = {
  key: 0,
  class: "table-section"
}, r2 = { class: "table-wrapper" }, l2 = { class: "data-table" }, c2 = { class: "table-body" }, d2 = { class: "table-cell text-left font-medium" }, u2 = { class: "table-cell text-center font-semibold" }, h2 = { class: "table-cell text-center" }, f2 = { class: "impact-bar-container" }, g2 = { class: "impact-label" }, p2 = {
  key: 1,
  class: "chart-section"
}, v2 = { class: "chart-wrapper" }, b2 = { class: "system-health" }, m2 = { class: "system-health-content" }, y2 = { class: "sys-kpi-grid" }, _2 = { class: "sys-kpi" }, x2 = { class: "sys-value" }, k2 = { class: "sys-kpi" }, w2 = { class: "sys-value" }, $2 = { class: "sys-kpi" }, M2 = { class: "sys-value sys-error" }, S2 = { class: "sys-kpi" }, C2 = { class: "sys-value" }, D2 = { class: "sys-kpi" }, A2 = { class: "sys-value" }, T2 = { class: "sys-kpi" }, B2 = { class: "sys-value sys-error" }, L2 = {
  key: 1,
  class: "empty-state"
}, F2 = /* @__PURE__ */ Q({
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
  setup(e, { expose: t, emit: a }) {
    const s = e, n = a, o = (k) => {
      n("export", k);
    }, { isDark: i, colors: r } = lt(rt(s, "theme")), l = C(() => {
      const k = s.data?.documentCounts?.items || [], w = s.data?.processingCounts?.items || [];
      return k.length > 0 || w.length > 0;
    }), d = C(() => {
      const k = s.data?.documentCounts?.items || [];
      return {
        processing_started: k.reduce((w, S) => w + S.processing_started, 0),
        processing_completed: k.reduce((w, S) => w + S.processing_completed, 0),
        processing_failed: k.reduce((w, S) => w + S.processing_failed, 0),
        row_count_total: k.reduce((w, S) => w + S.row_count_total, 0)
      };
    }), u = C(() => {
      const k = s.data?.processingCounts?.items || [];
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
    }), h = C(() => d.value.row_count_total || u.value.processing_started), p = C(() => Math.max(0, h.value - u.value.notification_sent)), v = (k, w) => w ? `${Math.round(k / w * 100)}%` : "0%", f = C(() => {
      const k = [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Notification failed", count: u.value.notification_failed },
        { reason: "Other", count: u.value.dq_other }
      ].filter((w) => w.count > 0).sort((w, S) => S.count - w.count);
      return k.length > 0 ? k[0] : { reason: "None", count: 0 };
    }), _ = C(() => {
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
    }), b = C(() => {
      const k = h.value, w = u.value.processing_success, S = Math.max(0, w - u.value.totalDqErrors), D = u.value.notification_sent, T = Math.max(0, k - w), O = u.value.totalDqErrors, P = Math.max(0, S - D), B = (L, I) => {
        const V = I > 0 ? Math.round(L / I * 100) : 0;
        return `${L.toLocaleString()} (${V}%)`;
      }, R = [
        { name: "Records Detected" },
        { name: "Valid Reservations" },
        { name: "Invalid / Unprocessed" },
        { name: "Contactable" },
        { name: "Data Quality Issues" },
        { name: "Notified" },
        { name: "Not Delivered" }
      ], H = [];
      return w > 0 && H.push({ source: "Records Detected", target: "Valid Reservations", value: w, label: B(w, k) }), T > 0 && H.push({ source: "Records Detected", target: "Invalid / Unprocessed", value: T, label: B(T, k) }), S > 0 && H.push({ source: "Valid Reservations", target: "Contactable", value: S, label: B(S, k) }), O > 0 && H.push({ source: "Valid Reservations", target: "Data Quality Issues", value: O, label: B(O, k) }), D > 0 && H.push({ source: "Contactable", target: "Notified", value: D, label: B(D, k) }), P > 0 && H.push({ source: "Contactable", target: "Not Delivered", value: P, label: B(P, k) }), { nodes: R, links: H };
    }), g = {
      "Records Detected": "#DBEAFE",
      "Valid Reservations": "#D1FAE5",
      "Invalid / Unprocessed": "#FEE2E2",
      Contactable: "#BBF7D0",
      "Data Quality Issues": "#FED7AA",
      Notified: "#86EFAC",
      "Not Delivered": "#FCA5A5"
    }, m = C(() => {
      const k = [...s.data?.processingCounts?.items || []].sort(
        (B, R) => new Date(B.date).getTime() - new Date(R.date).getTime()
      ), w = s.data?.documentCounts?.items || [], S = {};
      for (const B of w)
        S[B.date] = (S[B.date] || 0) + B.row_count_total;
      const D = [.../* @__PURE__ */ new Set([...k.map((B) => B.date), ...w.map((B) => B.date)])].sort(), T = D.map((B) => At(B).format("MMM DD")), O = D.map((B) => {
        const R = k.find((I) => I.date === B), H = R?.notification_sent || 0, L = S[B] || R?.processing_started || 0;
        return L > 0 ? Math.round(H / L * 100) : 0;
      }), P = D.map((B) => k.find((H) => H.date === B)?.notification_sent || 0);
      return {
        labels: T,
        datasets: [
          {
            label: "Success Rate (%)",
            data: O,
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
            data: P,
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
    }), $ = C(() => ({
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
    return t({ isDark: i }), (k, w) => (y(), x("article", O_, [
      c("header", V_, [
        c("div", z_, [
          w[1] || (w[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Disruption Notifier"),
            c("p", { class: "card-subtitle" }, "Passenger notification effectiveness and delivery analysis")
          ], -1)),
          s.loading ? E("", !0) : (y(), x("div", N_, [
            w[0] || (w[0] = c("p", { class: "badge-label" }, "Total Records", -1)),
            c("p", W_, M(A(U)(d.value.row_count_total)), 1)
          ]))
        ])
      ]),
      s.loading ? (y(), x("div", H_, [...w[2] || (w[2] = [
        at('<div class="loading-container" data-v-d8baf32c><div class="chart-bars-loader" data-v-d8baf32c><div class="bar bar-1" data-v-d8baf32c></div><div class="bar bar-2" data-v-d8baf32c></div><div class="bar bar-3" data-v-d8baf32c></div><div class="bar bar-4" data-v-d8baf32c></div><div class="bar bar-5" data-v-d8baf32c></div></div><p class="loading-text" data-v-d8baf32c>Loading disruption notifier data...</p></div>', 1)
      ])])) : (y(), x("div", j_, [
        l.value ? (y(), x(q, { key: 0 }, [
          c("div", Y_, [
            c("div", K_, [
              w[3] || (w[3] = c("span", { class: "kpi-label" }, "Passengers Affected", -1)),
              c("span", U_, M(A(U)(h.value)), 1)
            ]),
            c("div", q_, [
              w[4] || (w[4] = c("span", { class: "kpi-label" }, "Successfully Notified", -1)),
              c("span", X_, M(A(U)(u.value.notification_sent)), 1),
              c("span", G_, M(v(u.value.notification_sent, h.value)), 1)
            ]),
            c("div", Z_, [
              w[5] || (w[5] = c("span", { class: "kpi-label" }, "Not Notified", -1)),
              c("span", Q_, M(A(U)(p.value)), 1),
              c("span", J_, M(v(p.value, h.value)), 1)
            ]),
            c("div", t2, [
              w[6] || (w[6] = c("span", { class: "kpi-label" }, "Main Failure Reason", -1)),
              c("span", e2, M(f.value.reason), 1),
              c("span", a2, M(A(U)(f.value.count)) + " cases", 1)
            ])
          ]),
          c("section", s2, [
            w[8] || (w[8] = c("div", { class: "chart-header" }, [
              c("h4", { class: "section-title" }, "Passenger Disruption Funnel")
            ], -1)),
            c("div", n2, [
              b.value.nodes.length > 0 && b.value.links.length > 0 ? (y(), ct(ye, {
                key: 0,
                data: b.value,
                "node-colors": g,
                height: "350px"
              }, null, 8, ["data"])) : (y(), x("div", o2, [...w[7] || (w[7] = [
                c("p", { class: "empty-chart-text" }, "No processing data available for visualization", -1)
              ])]))
            ])
          ]),
          _.value.length > 0 ? (y(), x("section", i2, [
            w[10] || (w[10] = c("div", { class: "section-header" }, [
              c("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
            ], -1)),
            c("div", r2, [
              c("table", l2, [
                w[9] || (w[9] = c("thead", null, [
                  c("tr", { class: "table-header-row" }, [
                    c("th", { class: "table-header text-left" }, "Reason"),
                    c("th", { class: "table-header text-center" }, "Count"),
                    c("th", { class: "table-header text-center" }, "Impact")
                  ])
                ], -1)),
                c("tbody", c2, [
                  (y(!0), x(q, null, J(_.value, (S) => (y(), x("tr", {
                    key: S.reason,
                    class: "table-row"
                  }, [
                    c("td", d2, M(S.reason), 1),
                    c("td", u2, M(A(U)(S.count)), 1),
                    c("td", h2, [
                      c("div", f2, [
                        c("div", {
                          class: "impact-bar",
                          style: mt({ width: S.impactPct + "%" })
                        }, null, 4),
                        c("span", g2, M(S.impactPct) + "%", 1)
                      ])
                    ])
                  ]))), 128))
                ])
              ])
            ])
          ])) : E("", !0),
          m.value.labels.length > 0 ? (y(), x("section", p2, [
            w[11] || (w[11] = c("div", { class: "chart-header" }, [
              c("h4", { class: "section-title" }, "Notification Success Rate by Day")
            ], -1)),
            c("div", v2, [
              Z(me, {
                data: m.value,
                options: $.value
              }, null, 8, ["data", "options"])
            ])
          ])) : E("", !0),
          c("details", b2, [
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
              kt(" System Health Details ")
            ], -1)),
            c("div", m2, [
              c("div", y2, [
                c("div", _2, [
                  w[12] || (w[12] = c("span", { class: "sys-label" }, "Docs Started", -1)),
                  c("span", x2, M(A(U)(d.value.processing_started)), 1)
                ]),
                c("div", k2, [
                  w[13] || (w[13] = c("span", { class: "sys-label" }, "Docs Completed", -1)),
                  c("span", w2, M(A(U)(d.value.processing_completed)), 1)
                ]),
                c("div", $2, [
                  w[14] || (w[14] = c("span", { class: "sys-label" }, "Docs Failed", -1)),
                  c("span", M2, M(A(U)(d.value.processing_failed)), 1)
                ]),
                c("div", S2, [
                  w[15] || (w[15] = c("span", { class: "sys-label" }, "Processing Started", -1)),
                  c("span", C2, M(A(U)(u.value.processing_started)), 1)
                ]),
                c("div", D2, [
                  w[16] || (w[16] = c("span", { class: "sys-label" }, "Processing Success", -1)),
                  c("span", A2, M(A(U)(u.value.processing_success)), 1)
                ]),
                c("div", T2, [
                  w[17] || (w[17] = c("span", { class: "sys-label" }, "Notification Failed", -1)),
                  c("span", B2, M(A(U)(u.value.notification_failed)), 1)
                ])
              ])
            ])
          ]),
          e.enableExport ? (y(), ct(A(xt), {
            key: 2,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ], 64)) : (y(), x("section", L2, [...w[19] || (w[19] = [
          at('<div class="empty-state-content" data-v-d8baf32c><div class="empty-icon-wrapper" data-v-d8baf32c><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d8baf32c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" data-v-d8baf32c></path></svg></div><p class="empty-title" data-v-d8baf32c>No disruption notifier data</p><p class="empty-description" data-v-d8baf32c>No disruption notification data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), P2 = /* @__PURE__ */ st(F2, [["__scopeId", "data-v-d8baf32c"]]), I2 = { class: "card-header" }, E2 = {
  key: 0,
  class: "loading-state"
}, R2 = {
  key: 1,
  class: "card-body"
}, O2 = { class: "metric-value" }, V2 = /* @__PURE__ */ Q({
  __name: "TotalConversationsCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: s } = lt(rt(a, "theme")), n = C(() => U(a.totalConversations)), o = C(
      () => a.previousTotalConversations !== null && a.previousTotalConversations !== void 0
    ), i = C(() => {
      if (!o.value) return 0;
      const d = a.previousTotalConversations;
      return d === 0 ? a.totalConversations > 0 ? 100 : 0 : (a.totalConversations - d) / d * 100;
    }), r = C(() => `${i.value > 0 ? "+" : ""}${i.value.toFixed(1)}% vs prev.`), l = C(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: s, changePercent: i }), (d, u) => (y(), x("article", {
      class: Y(["highlight-card", { "highlight-card--dark": A(s) }])
    }, [
      c("header", I2, [
        u[0] || (u[0] = c("div", { class: "icon-wrapper" }, [
          c("svg", {
            class: "card-icon",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "1.5"
          }, [
            c("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
            })
          ])
        ], -1)),
        !e.loading && o.value ? (y(), x("div", {
          key: 0,
          class: Y(["change-badge", l.value])
        }, M(r.value), 3)) : E("", !0)
      ]),
      e.loading ? (y(), x("div", E2, [...u[1] || (u[1] = [
        c("div", { class: "shimmer shimmer-value" }, null, -1),
        c("div", { class: "shimmer shimmer-label" }, null, -1)
      ])])) : (y(), x("div", R2, [
        c("span", O2, M(n.value), 1),
        u[2] || (u[2] = c("span", { class: "metric-label" }, "Total Conversations", -1))
      ]))
    ], 2));
  }
}), z2 = /* @__PURE__ */ st(V2, [["__scopeId", "data-v-cd9dd1ba"]]), N2 = { class: "card-header" }, W2 = {
  key: 0,
  class: "loading-state"
}, H2 = {
  key: 1,
  class: "card-body"
}, j2 = { class: "metric-value" }, Y2 = /* @__PURE__ */ Q({
  __name: "CsatP95Card",
  props: {
    csatP95: { default: 0 },
    previousCsatP95: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: s } = lt(rt(a, "theme")), n = C(() => `${a.csatP95.toFixed(1)}`), o = C(
      () => a.previousCsatP95 !== null && a.previousCsatP95 !== void 0
    ), i = C(() => {
      if (!o.value) return 0;
      const d = a.previousCsatP95;
      return d === 0 ? a.csatP95 > 0 ? 100 : 0 : (a.csatP95 - d) / d * 100;
    }), r = C(() => `${i.value > 0 ? "+" : ""}${i.value.toFixed(1)}% vs prev.`), l = C(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: s, changePercent: i }), (d, u) => (y(), x("article", {
      class: Y(["highlight-card", { "highlight-card--dark": A(s) }])
    }, [
      c("header", N2, [
        u[0] || (u[0] = c("div", { class: "icon-wrapper" }, [
          c("svg", {
            class: "card-icon",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "1.5"
          }, [
            c("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321 1.01l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.41a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-1.01l5.518-.442a.563.563 0 00.475-.345l2.125-5.11z"
            })
          ])
        ], -1)),
        !e.loading && o.value ? (y(), x("div", {
          key: 0,
          class: Y(["change-badge", l.value])
        }, M(r.value), 3)) : E("", !0)
      ]),
      e.loading ? (y(), x("div", W2, [...u[1] || (u[1] = [
        c("div", { class: "shimmer shimmer-value" }, null, -1),
        c("div", { class: "shimmer shimmer-label" }, null, -1)
      ])])) : (y(), x("div", H2, [
        c("span", j2, M(n.value), 1),
        u[2] || (u[2] = c("span", { class: "metric-label" }, "CSAT P95", -1))
      ]))
    ], 2));
  }
}), K2 = /* @__PURE__ */ st(Y2, [["__scopeId", "data-v-e36f6025"]]), U2 = { class: "card-header" }, q2 = {
  key: 0,
  class: "loading-state"
}, X2 = {
  key: 1,
  class: "card-body"
}, G2 = { class: "metric-value" }, Z2 = /* @__PURE__ */ Q({
  __name: "AiGeneratedRevenueCard",
  props: {
    totalRevenue: { default: 0 },
    previousTotalRevenue: { default: null },
    currencyCode: { default: "USD" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: s } = lt(rt(a, "theme")), n = C(() => `${a.currencyCode} ${U(Math.round(a.totalRevenue))}`), o = C(
      () => a.previousTotalRevenue !== null && a.previousTotalRevenue !== void 0
    ), i = C(() => {
      if (!o.value) return 0;
      const d = a.previousTotalRevenue;
      return d === 0 ? a.totalRevenue > 0 ? 100 : 0 : (a.totalRevenue - d) / d * 100;
    }), r = C(() => `${i.value > 0 ? "+" : ""}${i.value.toFixed(1)}% vs prev.`), l = C(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: s, changePercent: i }), (d, u) => (y(), x("article", {
      class: Y(["highlight-card", { "highlight-card--dark": A(s) }])
    }, [
      c("header", U2, [
        u[0] || (u[0] = c("div", { class: "icon-wrapper" }, [
          c("svg", {
            class: "card-icon",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "1.5"
          }, [
            c("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M9.813 15.904L9 18.75l-2.407-1.204a5.97 5.97 0 01-1.593-.98l-3.5-2.625a2.25 2.25 0 010-3.602l3.5-2.625a5.97 5.97 0 011.593-.98L9 5.25l.813 2.846a2.25 2.25 0 001.341 1.457l2.846.813-2.846.813a2.25 2.25 0 00-1.341 1.457zM15.75 5.25l.537 1.879a1.5 1.5 0 00.894.975l1.879.537-1.879.537a1.5 1.5 0 00-.894.975l-.537 1.879-.537-1.879a1.5 1.5 0 00-.894-.975l-1.879-.537 1.879-.537a1.5 1.5 0 00.894-.975l.537-1.879zM18 12.75l.537 1.879a1.5 1.5 0 00.894.975l1.879.537-1.879.537a1.5 1.5 0 00-.894.975L18 19.53l-.537-1.879a1.5 1.5 0 00-.894-.975l-1.879-.537 1.879-.537a1.5 1.5 0 00.894-.975L18 12.75z"
            })
          ])
        ], -1)),
        !e.loading && o.value ? (y(), x("div", {
          key: 0,
          class: Y(["change-badge", l.value])
        }, M(r.value), 3)) : E("", !0)
      ]),
      e.loading ? (y(), x("div", q2, [...u[1] || (u[1] = [
        c("div", { class: "shimmer shimmer-value" }, null, -1),
        c("div", { class: "shimmer shimmer-label" }, null, -1)
      ])])) : (y(), x("div", X2, [
        c("span", G2, M(n.value), 1),
        u[2] || (u[2] = c("span", { class: "metric-label" }, "AI-Generated Revenue", -1))
      ]))
    ], 2));
  }
}), Q2 = /* @__PURE__ */ st(Z2, [["__scopeId", "data-v-3e72b6f0"]]), J2 = { class: "nps-daily-card" }, tx = { class: "card-header" }, ex = { class: "header-content" }, ax = {
  key: 0,
  class: "stats-badge"
}, sx = { class: "badge-value" }, nx = {
  key: 0,
  class: "loading-state"
}, ox = {
  key: 1,
  class: "card-body"
}, ix = { class: "tooltip-content" }, rx = { class: "tooltip-title" }, lx = { class: "tooltip-stats" }, cx = { class: "tooltip-stat-row" }, dx = { class: "tooltip-value" }, ux = { class: "tooltip-stat-row" }, hx = { class: "tooltip-value" }, fx = { class: "tooltip-stat-row" }, gx = { class: "tooltip-value" }, px = { class: "tooltip-stat-row" }, vx = { class: "tooltip-value" }, bx = { class: "tooltip-stat-row" }, mx = { class: "tooltip-value" }, yx = { class: "tooltip-stat-row" }, _x = { class: "tooltip-value" }, xx = {
  key: 2,
  class: "empty-state"
}, Co = 400, Qe = 60, Do = 90, Ao = 120, kx = {
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
  setup(e, { expose: t, emit: a }) {
    const s = a, n = (b) => {
      s("export", b);
    }, o = e, { isDark: i } = lt(rt(o, "theme")), r = C(() => o.data), l = tt(null), d = tt({
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
    }), u = C(() => {
      if (!r.value || !r.value.nps_by_day) return 800;
      const b = r.value.nps_by_day.length;
      return Math.max(800, Qe * 2 + b * Ao);
    }), h = (b, g) => {
      const $ = (b - 1) / 9;
      return Qe + g - $ * g;
    }, p = (b) => b ? At(b).format("DD-MM-YYYY") : "", v = C(() => {
      if (!r.value || !r.value.nps_by_day || r.value.nps_by_day.length === 0)
        return [];
      const b = [], g = Co - Qe - Do;
      return r.value.nps_by_day.forEach((m, $) => {
        const k = m.min_score || 0, w = m.q1_score || 0, S = m.median_score || 0, D = m.q3_score || 0, T = m.max_score || 0, O = m.average_score || 0;
        b.push({
          label: p(m.date),
          responseCount: m.nps_responses_count || 0,
          isTotal: !1,
          low: k,
          q1: w,
          median: S,
          q3: D,
          high: T,
          average: O,
          highY: h(T, g),
          lowY: h(k, g),
          q1Y: h(w, g),
          q3Y: h(D, g),
          medianY: h(S, g),
          averageY: O > 0 ? h(O, g) : null,
          centerX: Qe + ($ + 1) * Ao
        });
      }), b;
    }), f = (b, g) => {
      if (!l.value || !g || g.horizontal) return;
      const m = l.value.getBoundingClientRect(), $ = b.clientX, k = b.clientY, w = 140, S = 160, D = 10, T = 15;
      let O = $ - m.left - w / 2, P = k - m.top - S - T;
      O = Math.max(D, Math.min(O, m.width - w - D)), P < D && (P = k - m.top + T), P = Math.max(D, Math.min(P, m.height - S - D)), d.value = {
        visible: !0,
        x: O,
        y: P,
        date: g.label || "",
        min: g.low !== void 0 ? g.low.toFixed(1) : "N/A",
        max: g.high !== void 0 ? g.high.toFixed(1) : "N/A",
        q1: g.open !== void 0 ? g.open.toFixed(1) : "N/A",
        avg: g.average !== void 0 && g.average > 0 ? g.average.toFixed(1) : "N/A",
        q3: g.close !== void 0 ? g.close.toFixed(1) : "N/A",
        median: g.median !== void 0 ? g.median.toFixed(1) : "N/A"
      };
    }, _ = () => {
      d.value.visible = !1;
    };
    return t({ isDark: i }), (b, g) => (y(), x("article", J2, [
      c("header", tx, [
        c("div", ex, [
          g[1] || (g[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "CSAT Daily Metrics"),
            c("p", { class: "card-subtitle" }, "Daily CSAT Distribution")
          ], -1)),
          r.value && r.value.nps_by_day && r.value.nps_by_day.length > 0 ? (y(), x("div", ax, [
            g[0] || (g[0] = c("p", { class: "badge-label" }, "Days", -1)),
            c("p", sx, M(r.value.nps_by_day.length), 1)
          ])) : E("", !0)
        ])
      ]),
      o.loading ? (y(), x("div", nx, [...g[2] || (g[2] = [
        at('<div class="loading-container" data-v-b20112a7><div class="chart-flow-loader" data-v-b20112a7><div class="flow-line flow-1" data-v-b20112a7></div><div class="flow-line flow-2" data-v-b20112a7></div><div class="flow-line flow-3" data-v-b20112a7></div><div class="flow-line flow-4" data-v-b20112a7></div><div class="flow-line flow-5" data-v-b20112a7></div></div><p class="loading-text" data-v-b20112a7>Loading daily NPS data...</p></div>', 1)
      ])])) : r.value && r.value.nps_by_day && r.value.nps_by_day.length > 0 ? (y(), x("div", ox, [
        c("div", {
          class: "chart-wrapper",
          ref_key: "chartContainerRef",
          ref: l
        }, [
          v.value && v.value.length > 0 ? (y(), ct(Ei, {
            key: 0,
            "candlestick-data": v.value,
            "chart-width": u.value,
            "chart-height": Co,
            "chart-margin": Qe,
            "chart-bottom-margin": Do,
            "show-legend": !0,
            rotation: 0,
            "candle-width": 30,
            onCandleHover: f,
            onCandleLeave: _
          }, null, 8, ["candlestick-data", "chart-width"])) : E("", !0),
          d.value.visible ? (y(), x("div", {
            key: 1,
            class: "tooltip-overlay",
            style: mt({
              left: `${d.value.x}px`,
              top: `${d.value.y}px`
            })
          }, [
            c("div", ix, [
              c("div", rx, M(d.value.date), 1),
              g[9] || (g[9] = c("div", { class: "tooltip-divider" }, null, -1)),
              c("div", lx, [
                c("div", cx, [
                  g[3] || (g[3] = c("span", { class: "tooltip-label tooltip-min" }, "Min:", -1)),
                  c("span", dx, M(d.value.min), 1)
                ]),
                c("div", ux, [
                  g[4] || (g[4] = c("span", { class: "tooltip-label tooltip-q1" }, "Q1:", -1)),
                  c("span", hx, M(d.value.q1), 1)
                ]),
                c("div", fx, [
                  g[5] || (g[5] = c("span", { class: "tooltip-label tooltip-median" }, "Median:", -1)),
                  c("span", gx, M(d.value.median), 1)
                ]),
                c("div", px, [
                  g[6] || (g[6] = c("span", { class: "tooltip-label tooltip-avg" }, "Avg:", -1)),
                  c("span", vx, M(d.value.avg), 1)
                ]),
                c("div", bx, [
                  g[7] || (g[7] = c("span", { class: "tooltip-label tooltip-q3" }, "Q3:", -1)),
                  c("span", mx, M(d.value.q3), 1)
                ]),
                c("div", yx, [
                  g[8] || (g[8] = c("span", { class: "tooltip-label tooltip-max" }, "Max:", -1)),
                  c("span", _x, M(d.value.max), 1)
                ])
              ])
            ])
          ], 4)) : E("", !0)
        ], 512),
        e.enableExport ? (y(), ct(A(xt), {
          key: 0,
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ])) : (y(), x("div", xx, [...g[10] || (g[10] = [
        at('<div class="empty-state-content" data-v-b20112a7><div class="empty-icon-wrapper" data-v-b20112a7><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-b20112a7><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-b20112a7></path></svg></div><p class="empty-title" data-v-b20112a7>No daily NPS data available</p><p class="empty-description" data-v-b20112a7>No daily NPS data found for the selected period. Try adjusting the date range.</p></div>', 1)
      ])]))
    ]));
  }
}, Ni = /* @__PURE__ */ st(kx, [["__scopeId", "data-v-b20112a7"]]), wx = { class: "nps-overview-card" }, $x = { class: "card-header" }, Mx = { class: "header-content" }, Sx = { class: "header-badges" }, Cx = {
  key: 0,
  class: "stats-badge"
}, Dx = { class: "badge-value" }, Ax = {
  key: 1,
  class: "stats-badge"
}, Tx = { class: "badge-value" }, Bx = {
  key: 0,
  class: "loading-state"
}, Lx = {
  key: 1,
  class: "card-body"
}, Fx = { class: "chart-wrapper" }, Px = {
  key: 2,
  class: "empty-state"
}, Ix = 500, Ex = 60, Rx = 80, Ox = {
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
    const s = a, n = (d) => {
      s("export", d);
    }, o = e, { isDark: i } = lt(rt(o, "theme")), r = C(() => o.data), l = C(() => Math.max(600, window.innerWidth * 0.85));
    return t({ isDark: i }), (d, u) => (y(), x("article", wx, [
      c("header", $x, [
        c("div", Mx, [
          u[2] || (u[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "CSAT Overview Metrics"),
            c("p", { class: "card-subtitle" }, "Overall CSAT Distribution")
          ], -1)),
          c("div", Sx, [
            r.value && r.value.total_nps_responses > 0 ? (y(), x("div", Cx, [
              u[0] || (u[0] = c("p", { class: "badge-label" }, "Responses", -1)),
              c("p", Dx, M(r.value.total_nps_responses), 1)
            ])) : E("", !0),
            r.value && r.value.p95_score > 0 ? (y(), x("div", Ax, [
              u[1] || (u[1] = c("p", { class: "badge-label" }, "Percentile 95", -1)),
              c("p", Tx, M(r.value.p95_score || 0), 1)
            ])) : E("", !0)
          ])
        ])
      ]),
      o.loading ? (y(), x("div", Bx, [...u[3] || (u[3] = [
        at('<div class="loading-container" data-v-30fe5f88><div class="chart-flow-loader" data-v-30fe5f88><div class="flow-line flow-1" data-v-30fe5f88></div><div class="flow-line flow-2" data-v-30fe5f88></div><div class="flow-line flow-3" data-v-30fe5f88></div><div class="flow-line flow-4" data-v-30fe5f88></div><div class="flow-line flow-5" data-v-30fe5f88></div></div><p class="loading-text" data-v-30fe5f88>Loading NPS data...</p></div>', 1)
      ])])) : r.value && r.value.total_nps_responses > 0 ? (y(), x("div", Lx, [
        c("div", Fx, [
          Z(Ri, {
            histogram: r.value.histogram || [],
            "min-score": r.value.min_score || 0,
            "max-score": r.value.max_score || 0,
            "q1-score": r.value.q1_score || 0,
            "median-score": r.value.median_score || 0,
            "q3-score": r.value.q3_score || 0,
            "average-score": r.value.average_score || 0,
            "chart-width": l.value,
            "chart-height": Ix,
            "chart-margin": Ex,
            "chart-bottom-margin": Rx
          }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score", "chart-width"])
        ]),
        e.enableExport ? (y(), ct(A(xt), {
          key: 0,
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ])) : (y(), x("div", Px, [...u[4] || (u[4] = [
        at('<div class="empty-state-content" data-v-30fe5f88><div class="empty-icon-wrapper" data-v-30fe5f88><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-30fe5f88><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-30fe5f88></path></svg></div><p class="empty-title" data-v-30fe5f88>No NPS data available</p><p class="empty-description" data-v-30fe5f88>No NPS data found for the selected period. Try adjusting the date range.</p></div>', 1)
      ])]))
    ]));
  }
}, Wi = /* @__PURE__ */ st(Ox, [["__scopeId", "data-v-30fe5f88"]]), Vx = { class: "nps-metrics-container" }, zx = {
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
    const a = t, s = (n) => {
      a("export", n);
    };
    return (n, o) => (y(), x("div", Vx, [
      Z(Wi, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: s
      }, null, 8, ["data", "loading", "enable-export"]),
      Z(Ni, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: s
      }, null, 8, ["data", "loading", "enable-export"])
    ]));
  }
}, Nx = /* @__PURE__ */ st(zx, [["__scopeId", "data-v-25fe3b80"]]), Wx = { class: "aws-cost-card" }, Hx = { class: "card-header" }, jx = { class: "header-main" }, Yx = { class: "header-content" }, Kx = { class: "card-title" }, Ux = { class: "header-stats" }, qx = { class: "stat-badge primary" }, Xx = { class: "stat-value" }, Gx = { class: "stat-badge secondary" }, Zx = { class: "stat-value" }, Qx = { class: "card-body" }, Jx = {
  key: 0,
  class: "loading-state"
}, tk = {
  key: 1,
  class: "chart-section"
}, ek = { class: "chart-container" }, ak = {
  key: 2,
  class: "empty-state"
}, sk = { class: "empty-state-content" }, nk = { class: "empty-icon-wrapper" }, ok = {
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
    const t = e, { isDark: a, colors: s } = lt(rt(t, "theme")), n = C(() => {
      const r = t.data ?? {}, l = r.daily, d = r.days, u = Array.isArray(l) && l.length > 0, h = Array.isArray(d) && d.length > 0 && Array.isArray(r.allocatedCostSeries) && r.allocatedCostSeries.length === d.length;
      let p = [];
      return u ? p = l : h && (p = d.map((v, f) => ({
        date: v,
        allocated_cost: r.allocatedCostSeries[f] ?? 0,
        aws_cost: r.awsCostSeries[f] ?? 0,
        airline_conversations: r.airlineConversationsSeries[f] ?? 0
      }))), {
        daily: p,
        total_allocated_cost: r.total_allocated_cost ?? r.totalAllocated ?? 0,
        total_cost: r.total_cost ?? r.total ?? 0,
        total_conversations: r.total_conversations ?? r.totalConversations ?? 0,
        total_airline_conversations: r.total_airline_conversations ?? r.totalAirlineConversations ?? 0,
        airline_name: r.airline_name
      };
    }), o = C(() => {
      const r = n.value.daily;
      return {
        labels: r.map((d) => d.date),
        datasets: [
          {
            label: "Allocated Cost",
            data: r.map((d) => d.allocated_cost),
            borderColor: s.value.primaryLight,
            backgroundColor: a.value ? "rgba(198, 125, 255, 0.15)" : "rgba(198, 125, 255, 0.08)",
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
            borderColor: s.value.info,
            backgroundColor: a.value ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)",
            borderWidth: 2,
            pointRadius: 3,
            tension: 0.3,
            yAxisID: "y1"
          }
        ]
      };
    }), i = C(() => ({
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
            color: s.value.textSecondary,
            font: {
              family: "'DM Sans', sans-serif",
              size: 11,
              weight: "600"
            }
          }
        },
        tooltip: {
          padding: 12,
          backgroundColor: s.value.tooltipBg,
          titleColor: s.value.tooltipText,
          bodyColor: s.value.tooltipText,
          borderColor: s.value.tooltipBorder,
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
            color: s.value.gridLines,
            drawBorder: !1
          },
          ticks: {
            color: s.value.textSecondary,
            font: { family: "'DM Sans', sans-serif", size: 10 },
            callback: (r) => ft(r)
          }
        },
        y1: {
          type: "linear",
          display: !0,
          position: "right",
          grid: { display: !1 },
          ticks: {
            color: s.value.textSecondary,
            font: { family: "'DM Sans', sans-serif", size: 10 }
          }
        },
        x: {
          grid: { display: !1 },
          ticks: {
            color: s.value.textSecondary,
            font: { family: "'DM Sans', sans-serif", size: 10 }
          }
        }
      }
    }));
    return (r, l) => (y(), x("article", Wx, [
      c("header", Hx, [
        c("div", jx, [
          c("div", Yx, [
            c("h3", Kx, M(n.value.airline_name || "AWS Cost"), 1),
            l[0] || (l[0] = c("p", { class: "card-subtitle" }, "AWS vs Allocated costs over time", -1))
          ]),
          c("div", Ux, [
            c("div", qx, [
              l[1] || (l[1] = c("span", { class: "stat-label" }, "Total Allocated", -1)),
              c("span", Xx, M(A(ft)(n.value.total_allocated_cost)), 1)
            ]),
            c("div", Gx, [
              l[2] || (l[2] = c("span", { class: "stat-label" }, "Total AWS", -1)),
              c("span", Zx, M(A(ft)(n.value.total_cost)), 1)
            ])
          ])
        ])
      ]),
      c("div", Qx, [
        e.loading ? (y(), x("div", Jx, [...l[3] || (l[3] = [
          at('<div class="loading-container" data-v-c023bd59><div class="chart-lines-loader" data-v-c023bd59><div class="line line-1" data-v-c023bd59></div><div class="line line-2" data-v-c023bd59></div><div class="line line-3" data-v-c023bd59></div><div class="line line-4" data-v-c023bd59></div><div class="line line-5" data-v-c023bd59></div></div><p class="loading-text" data-v-c023bd59>Loading chart data...</p></div>', 1)
        ])])) : n.value.daily.length > 0 ? (y(), x("div", tk, [
          c("div", ek, [
            Z(me, {
              data: o.value,
              options: i.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", ak, [
          c("div", sk, [
            c("div", nk, [
              Z(A(Vt), { class: "empty-icon" })
            ]),
            l[4] || (l[4] = c("p", { class: "empty-title" }, "Sin datos de costos", -1)),
            l[5] || (l[5] = c("p", { class: "empty-description" }, "No se encontró información para el periodo seleccionado. Intenta ajustar el rango de fechas.", -1))
          ])
        ]))
      ])
    ]));
  }
}, ik = /* @__PURE__ */ st(ok, [["__scopeId", "data-v-c023bd59"]]), rk = { class: "cost-usage-card" }, lk = {
  key: 0,
  class: "card-body"
}, ck = {
  key: 0,
  class: "chart-section"
}, dk = { class: "chart-container" }, uk = { class: "kpi-grid" }, hk = { class: "kpi-card" }, fk = { class: "kpi-value" }, gk = { class: "kpi-card" }, pk = { class: "kpi-value" }, vk = { class: "kpi-card" }, bk = { class: "kpi-value" }, mk = { class: "kpi-card" }, yk = { class: "kpi-value" }, _k = { class: "kpi-card" }, xk = { class: "kpi-value" }, kk = { class: "kpi-card highlighted" }, wk = { class: "kpi-value gradient-text" }, $k = {
  key: 1,
  class: "empty-state"
}, Mk = { class: "empty-state-content" }, Sk = { class: "empty-icon-wrapper" }, Ck = {
  key: 1,
  class: "loading-state"
}, Dk = /* @__PURE__ */ Q({
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
    const s = e, { isDark: n, colors: o } = lt(rt(s, "theme")), i = (f) => {
      const _ = new Date(f), b = String(_.getDate()).padStart(2, "0"), g = String(_.getMonth() + 1).padStart(2, "0");
      return `${b}-${g}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = C(() => {
      const f = s.data?.costs_by_day || {};
      return Object.values(f).reduce((_, b) => _ + (b.input_cost || 0), 0);
    }), d = C(() => {
      const f = s.data?.costs_by_day || {};
      return Object.values(f).reduce((_, b) => _ + (b.output_cost || 0), 0);
    }), u = C(() => {
      const f = s.data?.costs_by_day || {};
      return Object.values(f).reduce((_, b) => _ + (b.cache_read_cost || 0), 0);
    }), h = C(() => {
      const f = s.data?.costs_by_day || {};
      return Object.values(f).reduce((_, b) => _ + (b.cache_write_cost || 0), 0);
    }), p = C(() => {
      const f = s.data?.costs_by_day || {}, _ = Object.keys(f).sort();
      if (_.length === 0)
        return { labels: [], datasets: [] };
      const b = _.map((m) => i(m)), g = [
        {
          label: "Input Cost",
          data: _.map((m) => f[m]?.input_cost || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: _.map((m) => f[m]?.output_cost || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: _.map((m) => f[m]?.cache_read_cost || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: _.map((m) => f[m]?.cache_write_cost || 0),
          backgroundColor: `${r.cache_write}80`,
          borderColor: r.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: b,
        datasets: g
      };
    }), v = C(() => s.options ? s.options : {
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
            label: function(f) {
              let _ = f.dataset.label || "";
              return _ && (_ += ": "), f.parsed.y !== null && (_ += ft(f.parsed.y)), _;
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
            callback: function(f) {
              return ft(f);
            }
          }
        }
      }
    });
    return t({ isDark: n }), (f, _) => (y(), x("article", rk, [
      _[9] || (_[9] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Cost Usage"),
          c("p", { class: "card-subtitle" }, "Cost breakdown over time (stacked)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Ck, [..._[8] || (_[8] = [
        at('<div class="loading-container" data-v-62f96954><div class="chart-lines-loader" data-v-62f96954><div class="line line-1" data-v-62f96954></div><div class="line line-2" data-v-62f96954></div><div class="line line-3" data-v-62f96954></div><div class="line line-4" data-v-62f96954></div><div class="line line-5" data-v-62f96954></div></div><p class="loading-text" data-v-62f96954>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", lk, [
        p.value.labels && p.value.labels.length ? (y(), x("section", ck, [
          c("div", dk, [
            Z(ie, {
              data: p.value,
              options: v.value,
              stacked: !0
            }, null, 8, ["data", "options"])
          ]),
          c("footer", uk, [
            c("div", hk, [
              _[0] || (_[0] = c("span", { class: "kpi-label" }, "Total Cost", -1)),
              c("span", fk, M(A(ft)(e.data.total_cost)), 1)
            ]),
            c("div", gk, [
              _[1] || (_[1] = c("span", { class: "kpi-label" }, "Input Cost", -1)),
              c("span", pk, M(A(ft)(l.value)), 1)
            ]),
            c("div", vk, [
              _[2] || (_[2] = c("span", { class: "kpi-label" }, "Output Cost", -1)),
              c("span", bk, M(A(ft)(d.value)), 1)
            ]),
            c("div", mk, [
              _[3] || (_[3] = c("span", { class: "kpi-label" }, "Cache Read", -1)),
              c("span", yk, M(A(ft)(u.value)), 1)
            ]),
            c("div", _k, [
              _[4] || (_[4] = c("span", { class: "kpi-label" }, "Cache Write", -1)),
              c("span", xk, M(A(ft)(h.value)), 1)
            ]),
            c("div", kk, [
              _[5] || (_[5] = c("span", { class: "kpi-label" }, "Avg / Conv.", -1)),
              c("span", wk, M(A(ft)(e.data.avg_cost_per_conversation)), 1)
            ])
          ])
        ])) : (y(), x("section", $k, [
          c("div", Mk, [
            c("div", Sk, [
              Z(A(Vt), { class: "empty-icon" })
            ]),
            _[6] || (_[6] = c("p", { class: "empty-title" }, "No cost usage data", -1)),
            _[7] || (_[7] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see cost breakdown trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Ak = /* @__PURE__ */ st(Dk, [["__scopeId", "data-v-62f96954"]]), Tk = { class: "token-usage-card" }, Bk = {
  key: 0,
  class: "card-body"
}, Lk = {
  key: 0,
  class: "chart-section"
}, Fk = { class: "chart-container" }, Pk = { class: "kpi-grid" }, Ik = { class: "kpi-card" }, Ek = { class: "kpi-value" }, Rk = { class: "kpi-card" }, Ok = { class: "kpi-value" }, Vk = { class: "kpi-card" }, zk = { class: "kpi-value" }, Nk = { class: "kpi-card" }, Wk = { class: "kpi-value" }, Hk = { class: "kpi-card" }, jk = { class: "kpi-value" }, Yk = {
  key: 1,
  class: "empty-state"
}, Kk = { class: "empty-state-content" }, Uk = { class: "empty-icon-wrapper" }, qk = {
  key: 1,
  class: "loading-state"
}, Xk = /* @__PURE__ */ Q({
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
    const s = e, { isDark: n, colors: o } = lt(rt(s, "theme")), i = (u) => {
      const h = new Date(u), p = String(h.getDate()).padStart(2, "0"), v = String(h.getMonth() + 1).padStart(2, "0");
      return `${p}-${v}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = C(() => {
      const u = s.data?.tokens_by_day || {}, h = Object.keys(u).sort();
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const p = h.map((f) => i(f)), v = [
        {
          label: "Input Tokens",
          data: h.map((f) => u[f]?.input_tokens || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Tokens",
          data: h.map((f) => u[f]?.output_tokens || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read",
          data: h.map((f) => u[f]?.cache_read_tokens || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write",
          data: h.map((f) => u[f]?.cache_write_tokens || 0),
          backgroundColor: `${r.cache_write}80`,
          borderColor: r.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: p,
        datasets: v
      };
    }), d = C(() => s.options ? s.options : {
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
    return t({ isDark: n }), (u, h) => (y(), x("article", Tk, [
      h[8] || (h[8] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Token Usage"),
          c("p", { class: "card-subtitle" }, "Token consumption over time (stacked)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", qk, [...h[7] || (h[7] = [
        at('<div class="loading-container" data-v-e9e355be><div class="chart-lines-loader" data-v-e9e355be><div class="line line-1" data-v-e9e355be></div><div class="line line-2" data-v-e9e355be></div><div class="line line-3" data-v-e9e355be></div><div class="line line-4" data-v-e9e355be></div><div class="line line-5" data-v-e9e355be></div></div><p class="loading-text" data-v-e9e355be>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", Bk, [
        l.value.labels && l.value.labels.length ? (y(), x("section", Lk, [
          c("div", Fk, [
            Z(ie, {
              data: l.value,
              options: d.value,
              stacked: !0
            }, null, 8, ["data", "options"])
          ]),
          c("footer", Pk, [
            c("div", Ik, [
              h[0] || (h[0] = c("span", { class: "kpi-label" }, "Total Tokens", -1)),
              c("span", Ek, M(A(U)(e.data.total_tokens)), 1)
            ]),
            c("div", Rk, [
              h[1] || (h[1] = c("span", { class: "kpi-label" }, "Input", -1)),
              c("span", Ok, M(A(U)(e.data.total_input_tokens)), 1)
            ]),
            c("div", Vk, [
              h[2] || (h[2] = c("span", { class: "kpi-label" }, "Output", -1)),
              c("span", zk, M(A(U)(e.data.total_output_tokens)), 1)
            ]),
            c("div", Nk, [
              h[3] || (h[3] = c("span", { class: "kpi-label" }, "Cache Read", -1)),
              c("span", Wk, M(A(U)(e.data.total_cache_read_tokens)), 1)
            ]),
            c("div", Hk, [
              h[4] || (h[4] = c("span", { class: "kpi-label" }, "Cache Write", -1)),
              c("span", jk, M(A(U)(e.data.total_cache_write_tokens)), 1)
            ])
          ])
        ])) : (y(), x("section", Yk, [
          c("div", Kk, [
            c("div", Uk, [
              Z(A(Vt), { class: "empty-icon" })
            ]),
            h[5] || (h[5] = c("p", { class: "empty-title" }, "No token usage data", -1)),
            h[6] || (h[6] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see token consumption trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Gk = /* @__PURE__ */ st(Xk, [["__scopeId", "data-v-e9e355be"]]), Zk = { class: "conversation-count-card" }, Qk = { class: "card-header" }, Jk = { class: "header-right" }, t5 = { class: "stat-badge" }, e5 = { class: "stat-value" }, a5 = {
  key: 0,
  class: "card-body"
}, s5 = {
  key: 0,
  class: "chart-section"
}, n5 = { class: "chart-container" }, o5 = {
  key: 1,
  class: "empty-state"
}, i5 = { class: "empty-state-content" }, r5 = { class: "empty-icon-wrapper" }, l5 = {
  key: 1,
  class: "loading-state"
}, c5 = /* @__PURE__ */ Q({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: s, colors: n } = lt(rt(a, "theme")), o = (l) => {
      const d = new Date(l), u = String(d.getDate()).padStart(2, "0");
      return `${String(d.getMonth() + 1).padStart(2, "0")}-${u}`;
    };
    C(() => {
      if (a.data?.start_date && a.data?.end_date) {
        const l = o(a.data.start_date), d = o(a.data.end_date);
        return `${l} - ${d}`;
      }
      return "N/A";
    });
    const i = C(() => {
      const l = a.data?.conversations_by_day || {}, d = Object.keys(l).sort();
      if (d.length === 0)
        return { labels: [], datasets: [] };
      const u = d.map((p) => o(p)), h = [
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
        datasets: h
      };
    }), r = C(() => a.options ? a.options : {
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
          borderColor: s.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
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
    return t({ isDark: s }), (l, d) => (y(), x("article", Zk, [
      c("header", Qk, [
        d[1] || (d[1] = c("div", { class: "header-left" }, [
          c("div", { class: "header-content" }, [
            c("h3", { class: "card-title" }, "Conversation Count"),
            c("p", { class: "card-subtitle" }, "Conversations over time")
          ])
        ], -1)),
        c("div", Jk, [
          c("div", t5, [
            d[0] || (d[0] = c("span", { class: "stat-label" }, "Total", -1)),
            c("span", e5, M(e.data.total_conversations || 0), 1)
          ])
        ])
      ]),
      e.loading ? (y(), x("div", l5, [...d[4] || (d[4] = [
        at('<div class="loading-container" data-v-846f24b1><div class="chart-lines-loader" data-v-846f24b1><div class="line line-1" data-v-846f24b1></div><div class="line line-2" data-v-846f24b1></div><div class="line line-3" data-v-846f24b1></div><div class="line line-4" data-v-846f24b1></div><div class="line line-5" data-v-846f24b1></div></div><p class="loading-text" data-v-846f24b1>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", a5, [
        i.value.labels && i.value.labels.length ? (y(), x("section", s5, [
          c("div", n5, [
            Z(me, {
              data: i.value,
              options: r.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", o5, [
          c("div", i5, [
            c("div", r5, [
              Z(A(Vt), { class: "empty-icon" })
            ]),
            d[2] || (d[2] = c("p", { class: "empty-title" }, "No conversation count data", -1)),
            d[3] || (d[3] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), d5 = /* @__PURE__ */ st(c5, [["__scopeId", "data-v-846f24b1"]]), u5 = { class: "top-agents-card" }, h5 = {
  key: 0,
  class: "card-body"
}, f5 = {
  key: 0,
  class: "charts-grid"
}, g5 = { class: "chart-section" }, p5 = { class: "chart-container" }, v5 = { class: "chart-section" }, b5 = { class: "chart-container" }, m5 = {
  key: 1,
  class: "empty-state"
}, y5 = { class: "empty-state-content" }, _5 = { class: "empty-icon-wrapper" }, x5 = {
  key: 1,
  class: "loading-state"
}, k5 = /* @__PURE__ */ Q({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: s, colors: n } = lt(rt(a, "theme")), o = C(() => a.data?.top_agents && a.data.top_agents.length > 0), i = C(() => a.data?.top_agents ? [...a.data.top_agents].sort((p, v) => (v.total_cost || 0) - (p.total_cost || 0)) : []), r = C(() => a.data?.top_agents ? [...a.data.top_agents].sort((p, v) => (v.total_tokens || 0) - (p.total_tokens || 0)) : []), l = C(() => {
      const p = i.value;
      return p.length === 0 ? { labels: [], datasets: [] } : {
        labels: p.map((v) => v.agent_type),
        datasets: [
          {
            label: "Total Cost",
            data: p.map((v) => v.total_cost || 0),
            backgroundColor: "#a78bfa80",
            borderColor: "#a78bfa",
            borderWidth: 1
          }
        ]
      };
    }), d = C(() => {
      const p = r.value;
      return p.length === 0 ? { labels: [], datasets: [] } : {
        labels: p.map((v) => v.agent_type),
        datasets: [
          {
            label: "Total Tokens",
            data: p.map((v) => v.total_tokens || 0),
            backgroundColor: "#f59e0b80",
            borderColor: "#f59e0b",
            borderWidth: 1
          }
        ]
      };
    }), u = C(() => a.options ? a.options : {
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
          borderColor: s.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
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
              const v = p.label, f = a.data?.top_agents?.find((_) => _.agent_type === v);
              return f ? [
                `Total Cost: ${ft(f.total_cost)}`,
                `Input Cost: ${ft(f.total_input_tokens_cost)}`,
                `Output Cost: ${ft(f.total_output_tokens_cost)}`,
                `Cache Read: ${ft(f.total_read_tokens_cost)}`,
                `Cache Write: ${ft(f.total_write_tokens_cost)}`
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
              return ft(p);
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
          backgroundColor: n.value.tooltipBg,
          titleColor: n.value.tooltipText,
          bodyColor: n.value.tooltipText,
          borderColor: s.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
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
              const v = p.label, f = a.data?.top_agents?.find((_) => _.agent_type === v);
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
    return t({ isDark: s }), (p, v) => (y(), x("article", u5, [
      v[5] || (v[5] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Top Agents Analysis"),
          c("p", { class: "card-subtitle" }, "Cost and token usage by agent")
        ])
      ], -1)),
      e.loading ? (y(), x("div", x5, [...v[4] || (v[4] = [
        at('<div class="loading-container" data-v-78efa6dc><div class="chart-lines-loader" data-v-78efa6dc><div class="line line-1" data-v-78efa6dc></div><div class="line line-2" data-v-78efa6dc></div><div class="line line-3" data-v-78efa6dc></div><div class="line line-4" data-v-78efa6dc></div><div class="line line-5" data-v-78efa6dc></div></div><p class="loading-text" data-v-78efa6dc>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", h5, [
        o.value ? (y(), x("div", f5, [
          c("section", g5, [
            v[0] || (v[0] = c("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
            c("div", p5, [
              Z(ie, {
                data: l.value,
                options: u.value
              }, null, 8, ["data", "options"])
            ])
          ]),
          c("section", v5, [
            v[1] || (v[1] = c("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
            c("div", b5, [
              Z(ie, {
                data: d.value,
                options: h.value
              }, null, 8, ["data", "options"])
            ])
          ])
        ])) : (y(), x("section", m5, [
          c("div", y5, [
            c("div", _5, [
              Z(A(Vt), { class: "empty-icon" })
            ]),
            v[2] || (v[2] = c("p", { class: "empty-title" }, "No top agents data", -1)),
            v[3] || (v[3] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent analysis.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), w5 = /* @__PURE__ */ st(k5, [["__scopeId", "data-v-78efa6dc"]]), $5 = { class: "top-agents-card" }, M5 = {
  key: 0,
  class: "card-body"
}, S5 = {
  key: 0,
  class: "chart-section"
}, C5 = { class: "chart-container" }, D5 = {
  key: 1,
  class: "empty-state"
}, A5 = { class: "empty-state-content" }, T5 = { class: "empty-icon-wrapper" }, B5 = {
  key: 1,
  class: "loading-state"
}, L5 = /* @__PURE__ */ Q({
  __name: "TopAgents",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: s, colors: n } = lt(rt(a, "theme")), o = {
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
    ) : []), r = C(() => i.value.length > 0), l = C(() => i.value.reduce((h, p) => h + (p.conversations || 0), 0)), d = C(() => {
      const h = i.value;
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const p = h.map((_) => {
        const b = _.agent_type?.toLowerCase();
        return (o[b] || "#a78bfa") + "80";
      }), v = h.map((_) => {
        const b = _.agent_type?.toLowerCase();
        return o[b] || "#a78bfa";
      });
      return {
        labels: h.map((_) => {
          const b = _.conversations || 0, g = l.value ? b / l.value * 100 : 0;
          return `${_.agent_type} - ${b.toLocaleString()} (${g.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: h.map((_) => _.conversations || 0),
            backgroundColor: p,
            borderColor: v,
            borderWidth: 2
          }
        ]
      };
    }), u = C(() => a.options ? a.options : {
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
          borderColor: s.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
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
              const p = (h.label || "").toString(), v = Number(h.parsed) || 0, f = (h.dataset.data || []).reduce((b, g) => b + (Number(g) || 0), 0), _ = f ? v / f * 100 : 0;
              return `${p}: ${v.toLocaleString()} (${_.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: s }), (h, p) => (y(), x("article", $5, [
      p[3] || (p[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Top Agents"),
          c("p", { class: "card-subtitle" }, "Interactions by agent (excluding triage)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", B5, [...p[2] || (p[2] = [
        at('<div class="loading-container" data-v-05e3e74d><div class="chart-lines-loader" data-v-05e3e74d><div class="line line-1" data-v-05e3e74d></div><div class="line line-2" data-v-05e3e74d></div><div class="line line-3" data-v-05e3e74d></div><div class="line line-4" data-v-05e3e74d></div><div class="line line-5" data-v-05e3e74d></div></div><p class="loading-text" data-v-05e3e74d>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", M5, [
        r.value ? (y(), x("section", S5, [
          c("div", C5, [
            Z(Za, {
              data: d.value,
              options: u.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", D5, [
          c("div", A5, [
            c("div", T5, [
              Z(A(Vt), { class: "empty-icon" })
            ]),
            p[0] || (p[0] = c("p", { class: "empty-title" }, "No top agents data", -1)),
            p[1] || (p[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), F5 = /* @__PURE__ */ st(L5, [["__scopeId", "data-v-05e3e74d"]]), P5 = { class: "daily-cost-trends-card" }, I5 = {
  key: 0,
  class: "card-body"
}, E5 = {
  key: 0,
  class: "chart-section"
}, R5 = { class: "chart-container" }, O5 = {
  key: 1,
  class: "empty-state"
}, V5 = { class: "empty-state-content" }, z5 = { class: "empty-icon-wrapper" }, N5 = {
  key: 1,
  class: "loading-state"
}, W5 = /* @__PURE__ */ Q({
  __name: "DailyCostTrends",
  props: {
    costData: { default: () => ({}) },
    conversationData: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: s, colors: n } = lt(rt(a, "theme")), o = (d) => {
      const u = new Date(d), h = String(u.getDate()).padStart(2, "0");
      return `${String(u.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = C(() => {
      const d = a.costData?.daily_mean_cost_per_conversation || [];
      if (Array.isArray(d) && d.length > 0)
        return !0;
      const u = a.costData?.costs_by_day || {}, h = a.conversationData?.conversations_by_day || {};
      return Object.keys(u).length > 0 && Object.keys(h).length > 0;
    }), r = C(() => {
      const d = a.costData?.daily_mean_cost_per_conversation || [];
      if (d.length > 0) {
        const b = [...d].sort((g, m) => g.date.localeCompare(m.date));
        return {
          labels: b.map((g) => o(g.date)),
          datasets: [
            {
              label: "Mean USD/conv",
              data: b.map((g) => Number(g.value) || 0),
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
      const u = a.costData?.costs_by_day || {}, h = a.conversationData?.conversations_by_day || {}, v = Object.keys(u).filter((b) => h[b]).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const f = v.map((b) => o(b)), _ = v.map((b) => {
        const g = u[b]?.total_cost || 0, m = h[b] || 0;
        return m > 0 ? g / m : 0;
      });
      return {
        labels: f,
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
          borderColor: s.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
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
              return u && (u += ": "), d.parsed.y !== null && (u += ft(d.parsed.y)), u;
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
              return ft(d);
            }
          }
        }
      }
    });
    return t({ isDark: s }), (d, u) => (y(), x("article", P5, [
      u[3] || (u[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Daily Cost Trends"),
          c("p", { class: "card-subtitle" }, "Mean USD/conversation per day")
        ])
      ], -1)),
      e.loading ? (y(), x("div", N5, [...u[2] || (u[2] = [
        at('<div class="loading-container" data-v-e5bac1c5><div class="chart-lines-loader" data-v-e5bac1c5><div class="line line-1" data-v-e5bac1c5></div><div class="line line-2" data-v-e5bac1c5></div><div class="line line-3" data-v-e5bac1c5></div><div class="line line-4" data-v-e5bac1c5></div><div class="line line-5" data-v-e5bac1c5></div></div><p class="loading-text" data-v-e5bac1c5>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", I5, [
        i.value ? (y(), x("section", E5, [
          c("div", R5, [
            Z(me, {
              data: r.value,
              options: l.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", O5, [
          c("div", V5, [
            c("div", z5, [
              Z(A(Vt), { class: "empty-icon" })
            ]),
            u[0] || (u[0] = c("p", { class: "empty-title" }, "No daily cost trends data", -1)),
            u[1] || (u[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), H5 = /* @__PURE__ */ st(W5, [["__scopeId", "data-v-e5bac1c5"]]), j5 = { class: "model-usage-card" }, Y5 = {
  key: 0,
  class: "loading-state"
}, K5 = {
  key: 1,
  class: "card-body"
}, U5 = { class: "tabs-container" }, q5 = {
  class: "tabs-nav",
  "aria-label": "Model Usage Tabs"
}, X5 = ["aria-selected"], G5 = ["aria-selected"], Z5 = {
  key: 0,
  class: "table-section"
}, Q5 = { class: "table-wrapper" }, J5 = { class: "data-table" }, tw = { class: "table-header-row" }, ew = { class: "table-header" }, aw = { class: "table-body" }, sw = { class: "table-cell name-cell" }, nw = { class: "table-cell text-center" }, ow = { class: "table-cell text-center" }, iw = { class: "table-cell text-center" }, rw = { class: "table-cell text-center cost-cell" }, lw = { class: "table-cell text-center" }, cw = {
  key: 1,
  class: "empty-state"
}, dw = { class: "empty-state-content" }, uw = { class: "empty-icon-wrapper" }, hw = /* @__PURE__ */ Q({
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
    const s = e, n = a, o = (h) => {
      n("export", h);
    }, { isDark: i } = lt(rt(s, "theme")), r = tt("by_model"), l = C(() => r.value === "by_model" ? s.data?.total_by_model || {} : s.data?.total_by_provider || {}), d = (h) => h == null ? "0" : U(h), u = (h) => h == null ? "$0.00" : ft(h);
    return t({ isDark: i }), (h, p) => (y(), x("article", j5, [
      p[10] || (p[10] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Model Usage"),
          c("p", { class: "card-subtitle" }, "AI model performance and costs")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Y5, [...p[2] || (p[2] = [
        at('<div class="loading-container" data-v-a7bf2d7b><div class="chart-bars-loader" data-v-a7bf2d7b><div class="bar bar-1" data-v-a7bf2d7b></div><div class="bar bar-2" data-v-a7bf2d7b></div><div class="bar bar-3" data-v-a7bf2d7b></div><div class="bar bar-4" data-v-a7bf2d7b></div><div class="bar bar-5" data-v-a7bf2d7b></div></div><p class="loading-text" data-v-a7bf2d7b>Loading model usage data...</p></div>', 1)
      ])])) : (y(), x("div", K5, [
        c("div", U5, [
          c("nav", q5, [
            c("button", {
              onClick: p[0] || (p[0] = (v) => r.value = "by_model"),
              class: Y(["tab-button", { "tab-active": r.value === "by_model" }]),
              "aria-selected": r.value === "by_model",
              role: "tab"
            }, " Model ", 10, X5),
            c("button", {
              onClick: p[1] || (p[1] = (v) => r.value = "by_provider"),
              class: Y(["tab-button", { "tab-active": r.value === "by_provider" }]),
              "aria-selected": r.value === "by_provider",
              role: "tab"
            }, " Provider ", 10, G5)
          ])
        ]),
        l.value && Object.keys(l.value).length > 0 ? (y(), x("div", Z5, [
          c("div", Q5, [
            c("table", J5, [
              c("thead", null, [
                c("tr", tw, [
                  c("th", ew, M(r.value === "by_model" ? "Model" : "Provider"), 1),
                  p[3] || (p[3] = c("th", { class: "table-header" }, "Avg cost per message", -1)),
                  p[4] || (p[4] = c("th", { class: "table-header" }, "Avg tokens per message", -1)),
                  p[5] || (p[5] = c("th", { class: "table-header" }, "Message count", -1)),
                  p[6] || (p[6] = c("th", { class: "table-header" }, "Total cost", -1)),
                  p[7] || (p[7] = c("th", { class: "table-header" }, "Total tokens", -1))
                ])
              ]),
              c("tbody", aw, [
                (y(!0), x(q, null, J(l.value, (v, f) => (y(), x("tr", {
                  key: f,
                  class: "table-row"
                }, [
                  c("td", sw, M(f), 1),
                  c("td", nw, M(u(v.avg_cost_per_message)), 1),
                  c("td", ow, M(d(v.avg_tokens_per_message)), 1),
                  c("td", iw, M(d(v.message_count)), 1),
                  c("td", rw, M(u(v.total_cost)), 1),
                  c("td", lw, M(d(v.total_tokens)), 1)
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), ct(A(xt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("div", cw, [
          c("div", dw, [
            c("div", uw, [
              Z(A(Vt), { class: "empty-icon" })
            ]),
            p[8] || (p[8] = c("p", { class: "empty-title" }, "No model usage data available", -1)),
            p[9] || (p[9] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see model performance metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), fw = /* @__PURE__ */ st(hw, [["__scopeId", "data-v-a7bf2d7b"]]), gw = { class: "message-roles-card" }, pw = {
  key: 0,
  class: "loading-state"
}, vw = {
  key: 1,
  class: "card-body"
}, bw = {
  key: 0,
  class: "table-section"
}, mw = { class: "table-wrapper" }, yw = { class: "data-table" }, _w = { class: "table-body" }, xw = { class: "table-cell name-cell" }, kw = { class: "table-cell text-center" }, ww = { class: "table-cell text-center" }, $w = { class: "table-cell text-center" }, Mw = { class: "table-cell text-center cost-cell" }, Sw = { class: "table-cell text-center" }, Cw = {
  key: 1,
  class: "empty-state"
}, Dw = { class: "empty-state-content" }, Aw = { class: "empty-icon-wrapper" }, Tw = /* @__PURE__ */ Q({
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
    const s = e, n = a, o = (v) => {
      n("export", v);
    }, { isDark: i } = lt(rt(s, "theme")), r = ["assistant", "system", "user"], l = C(() => s.data?.total_by_role || {}), d = C(() => Object.keys(l.value).length > 0), u = (v) => v == null ? "0" : U(v), h = (v) => v == null ? "$0.00" : ft(v), p = (v) => v.charAt(0).toUpperCase() + v.slice(1);
    return t({ isDark: i }), (v, f) => (y(), x("article", gw, [
      f[4] || (f[4] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Message Roles"),
          c("p", { class: "card-subtitle" }, "Performance by message role")
        ])
      ], -1)),
      e.loading ? (y(), x("div", pw, [...f[0] || (f[0] = [
        at('<div class="loading-container" data-v-6a953cfc><div class="chart-bars-loader" data-v-6a953cfc><div class="bar bar-1" data-v-6a953cfc></div><div class="bar bar-2" data-v-6a953cfc></div><div class="bar bar-3" data-v-6a953cfc></div><div class="bar bar-4" data-v-6a953cfc></div><div class="bar bar-5" data-v-6a953cfc></div></div><p class="loading-text" data-v-6a953cfc>Loading message role data...</p></div>', 1)
      ])])) : (y(), x("div", vw, [
        d.value ? (y(), x("div", bw, [
          c("div", mw, [
            c("table", yw, [
              f[1] || (f[1] = c("thead", null, [
                c("tr", { class: "table-header-row" }, [
                  c("th", { class: "table-header" }, "Role"),
                  c("th", { class: "table-header" }, "Avg cost per message"),
                  c("th", { class: "table-header" }, "Avg tokens per message"),
                  c("th", { class: "table-header" }, "Message count"),
                  c("th", { class: "table-header" }, "Total cost"),
                  c("th", { class: "table-header" }, "Total tokens")
                ])
              ], -1)),
              c("tbody", _w, [
                (y(), x(q, null, J(r, (_) => c("tr", {
                  key: _,
                  class: "table-row"
                }, [
                  c("td", xw, M(p(_)), 1),
                  c("td", kw, M(h(l.value[_]?.avg_cost_per_message)), 1),
                  c("td", ww, M(u(l.value[_]?.avg_tokens_per_message)), 1),
                  c("td", $w, M(u(l.value[_]?.message_count)), 1),
                  c("td", Mw, M(h(l.value[_]?.total_cost)), 1),
                  c("td", Sw, M(u(l.value[_]?.total_tokens)), 1)
                ])), 64))
              ])
            ])
          ]),
          e.enableExport ? (y(), ct(A(xt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("div", Cw, [
          c("div", Dw, [
            c("div", Aw, [
              Z(A(Vt), { class: "empty-icon" })
            ]),
            f[2] || (f[2] = c("p", { class: "empty-title" }, "No message role data available", -1)),
            f[3] || (f[3] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Bw = /* @__PURE__ */ st(Tw, [["__scopeId", "data-v-6a953cfc"]]), Lw = { class: "cost-per-conversation-card" }, Fw = {
  key: 0,
  class: "card-body"
}, Pw = {
  key: 0,
  class: "chart-section"
}, Iw = { class: "chart-container" }, Ew = { class: "kpi-grid" }, Rw = { class: "kpi-card" }, Ow = { class: "kpi-value" }, Vw = { class: "kpi-card" }, zw = { class: "kpi-value" }, Nw = { class: "kpi-card" }, Ww = { class: "kpi-value" }, Hw = { class: "kpi-card highlighted" }, jw = { class: "kpi-value gradient-text" }, Yw = {
  key: 1,
  class: "empty-state"
}, Kw = { class: "empty-state-content" }, Uw = { class: "empty-icon-wrapper" }, qw = {
  key: 1,
  class: "loading-state"
}, Xw = /* @__PURE__ */ Q({
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
    const s = e, n = a, o = (m) => {
      n("export", m);
    }, { isDark: i, colors: r } = lt(rt(s, "theme")), l = {
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
    }, d = (m) => m.agent_type || m.agent_id || m.agent_name || "", u = (m) => m.agent_name ? m.agent_name : d(m).split("_").map((k) => k.charAt(0).toUpperCase() + k.slice(1)).join(" ").replace(/V\d+$/, "").trim(), h = (m) => {
      const $ = d(m).toLowerCase();
      for (const [k, w] of Object.entries(l))
        if ($.includes(k))
          return w;
      return "#9ca3af";
    }, p = C(() => [...s.data?.top_agents || []].sort(($, k) => k.avg_cost_per_conversation - $.avg_cost_per_conversation)), v = C(() => s.data?.total_conversations !== void 0 ? Number(s.data.total_conversations) || 0 : p.value.reduce((m, $) => m + $.conversations, 0)), f = C(() => s.data?.total_cost !== void 0 ? Number(s.data.total_cost) || 0 : p.value.reduce((m, $) => m + $.total_cost, 0)), _ = C(() => s.data?.overall_avg_cost_per_conversation !== void 0 ? Number(s.data.overall_avg_cost_per_conversation) || 0 : v.value === 0 ? 0 : f.value / v.value), b = C(() => {
      const m = p.value;
      if (m.length === 0)
        return { labels: [], datasets: [] };
      const $ = m.map((S) => u(S)), k = m.map((S) => S.avg_cost_per_conversation), w = m.map((S) => h(S));
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
    }), g = C(() => s.options ? s.options : {
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
            label: function(m) {
              const $ = p.value[m.dataIndex];
              return [
                `Cost: ${ft(m.parsed.x)}`,
                `Conversations: ${U($.conversations)}`,
                `Total Cost: ${ft($.total_cost)}`
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
            callback: function(m) {
              return ft(m);
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
    return t({ isDark: i }), (m, $) => (y(), x("article", Lw, [
      $[7] || ($[7] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Cost Per Conversation"),
          c("p", { class: "card-subtitle" }, "USD per conversation by agent")
        ])
      ], -1)),
      e.loading ? (y(), x("div", qw, [...$[6] || ($[6] = [
        at('<div class="loading-container" data-v-17f6615c><div class="chart-bars-loader" data-v-17f6615c><div class="bar bar-1" data-v-17f6615c></div><div class="bar bar-2" data-v-17f6615c></div><div class="bar bar-3" data-v-17f6615c></div><div class="bar bar-4" data-v-17f6615c></div><div class="bar bar-5" data-v-17f6615c></div></div><p class="loading-text" data-v-17f6615c>Loading agent costs...</p></div>', 1)
      ])])) : (y(), x("div", Fw, [
        b.value.labels && b.value.labels.length ? (y(), x("section", Pw, [
          c("div", Iw, [
            Z(ie, {
              data: b.value,
              options: g.value
            }, null, 8, ["data", "options"])
          ]),
          c("footer", Ew, [
            c("div", Rw, [
              $[0] || ($[0] = c("span", { class: "kpi-label" }, "Total Agents", -1)),
              c("span", Ow, M(p.value.length), 1)
            ]),
            c("div", Vw, [
              $[1] || ($[1] = c("span", { class: "kpi-label" }, "Total Conversations", -1)),
              c("span", zw, M(A(U)(v.value)), 1)
            ]),
            c("div", Nw, [
              $[2] || ($[2] = c("span", { class: "kpi-label" }, "Total Cost", -1)),
              c("span", Ww, M(A(ft)(f.value)), 1)
            ]),
            c("div", Hw, [
              $[3] || ($[3] = c("span", { class: "kpi-label" }, "Avg Cost / Conv.", -1)),
              c("span", jw, M(A(ft)(_.value)), 1)
            ])
          ]),
          e.enableExport ? (y(), ct(A(xt), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", Yw, [
          c("div", Kw, [
            c("div", Uw, [
              Z(A(Vt), { class: "empty-icon" })
            ]),
            $[4] || ($[4] = c("p", { class: "empty-title" }, "No cost per conversation data", -1)),
            $[5] || ($[5] = c("p", { class: "empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Gw = /* @__PURE__ */ st(Xw, [["__scopeId", "data-v-17f6615c"]]);
function Ft() {
  const e = new Uint8Array(8);
  return globalThis.crypto.getRandomValues(e), Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("");
}
const Zw = { class: "tabs text-sm" }, Qw = ["aria-label"], Jw = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], t$ = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, e$ = /* @__PURE__ */ Q({
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
    const a = e, s = t, n = tt([]), o = `tabs-${Ft()}`, i = (f) => `${o}-tab-${f}`, r = C(
      () => a.items.map((f, _) => f.disabled ? -1 : _).filter((f) => f >= 0)
    );
    function l(f) {
      return f.value === a.modelValue;
    }
    function d(f) {
      const _ = l(f), g = `${a.fullWidth ? "relative flex min-w-0 flex-1" : "relative inline-flex max-w-full shrink-0"} h-full min-h-0 cursor-pointer rounded-lg border border-transparent text-center outline-none transition-[background-color,color,box-shadow,opacity,transform] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100`;
      return f.disabled ? `${g} cursor-not-allowed opacity-40` : _ ? `${g} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]` : `${g} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function u(f, _) {
      f === _ || a.items.find((g) => g.value === f)?.disabled || (s("update:modelValue", f), s("change", { value: f, previousValue: _ }));
    }
    function h(f, _) {
      s("tab-click", { value: f.value, originalEvent: _ }), !f.disabled && (u(f.value, a.modelValue), St(() => {
        n.value[a.items.indexOf(f)]?.focus();
      }));
    }
    function p(f, _) {
      const b = a.items.length;
      if (b === 0) return 0;
      let g = f;
      for (let m = 0; m < b; m++)
        if (g = (g + _ + b) % b, !a.items[g]?.disabled) return g;
      return f;
    }
    async function v(f, _) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(f.key)) return;
      f.preventDefault();
      let g = _;
      f.key === "ArrowLeft" ? g = p(_, -1) : f.key === "ArrowRight" ? g = p(_, 1) : f.key === "Home" ? g = r.value[0] ?? 0 : f.key === "End" && (g = r.value[r.value.length - 1] ?? _);
      const m = a.items[g];
      !m || m.disabled || (u(m.value, a.modelValue), await St(), n.value[g]?.focus());
    }
    return (f, _) => (y(), x("div", Zw, [
      c("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: Y([
          "box-border h-10 flex-wrap items-stretch gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 p-0.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          e.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (y(!0), x(q, null, J(e.items, (b, g) => (y(), x("button", {
          id: i(b.value),
          key: b.value,
          ref_for: !0,
          ref_key: "tabRefs",
          ref: n,
          type: "button",
          role: "tab",
          "aria-selected": l(b),
          "aria-disabled": b.disabled === !0,
          tabindex: l(b) ? 0 : -1,
          class: Y(d(b)),
          onClick: (m) => h(b, m),
          onKeydown: (m) => v(m, g)
        }, [
          c("span", {
            class: Y(["flex h-full min-h-0 min-w-0 items-center justify-center gap-2 px-3", { "min-w-0 flex-1": e.fullWidth }])
          }, [
            b.icon ? (y(), ct(la(b.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : E("", !0),
            c("span", t$, M(b.label), 1)
          ], 2)
        ], 42, Jw))), 128))
      ], 10, Qw),
      f.$slots.default ? (y(), ct(Ps, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: Ee(() => [
          (y(), x("div", {
            key: e.modelValue,
            class: "tabs-panel mt-4"
          }, [
            It(f.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : E("", !0)
    ]));
  }
}), a$ = /* @__PURE__ */ st(e$, [["__scopeId", "data-v-0cc67b12"]]), s$ = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, n$ = { class: "overflow-x-auto" }, o$ = { class: "kiut-table w-full min-w-[640px] border-collapse text-left text-sm" }, i$ = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, r$ = {
  key: 0,
  scope: "col",
  class: "w-12 px-4 py-3 text-center align-middle"
}, l$ = ["checked", "aria-label"], c$ = {
  key: 0,
  class: "w-12 bg-transparent px-4 py-3 text-center align-middle"
}, d$ = ["checked", "aria-label", "onChange"], u$ = /* @__PURE__ */ Q({
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
    const a = e, s = t, n = tt(null);
    function o(m) {
      return `cell-${m}`;
    }
    function i(m) {
      return m === "center" ? "text-center" : m === "right" ? "text-right" : "text-left";
    }
    function r(m, $) {
      if (typeof a.rowKey == "function")
        return a.rowKey(m);
      const k = m[a.rowKey];
      return k != null ? String(k) : `__index_${$}`;
    }
    function l(m, $) {
      return m[$];
    }
    function d(m) {
      return m == null || typeof m == "object" ? "" : String(m);
    }
    function u(m, $) {
      return r(m, $);
    }
    const h = C(() => a.rows.map((m, $) => r(m, $)));
    function p(m, $) {
      const k = r(m, $);
      return a.selectedKeys.includes(k);
    }
    const v = C(() => !a.selectable || a.rows.length === 0 ? !1 : h.value.every((m) => a.selectedKeys.includes(m))), f = C(() => {
      if (!a.selectable || a.rows.length === 0) return !1;
      const m = h.value.filter(($) => a.selectedKeys.includes($));
      return m.length > 0 && m.length < a.rows.length;
    });
    Et(
      [f, v, () => a.selectable],
      async () => {
        await St();
        const m = n.value;
        m && (m.indeterminate = f.value && !v.value);
      },
      { immediate: !0 }
    );
    function _() {
      if (a.selectable)
        if (v.value) {
          const m = a.selectedKeys.filter(($) => !h.value.includes($));
          s("update:selectedKeys", m);
        } else {
          const m = new Set(a.selectedKeys);
          h.value.forEach(($) => m.add($)), s("update:selectedKeys", [...m]);
        }
    }
    function b(m, $) {
      if (!a.selectable) return;
      const k = r(m, $);
      a.selectedKeys.includes(k) ? s(
        "update:selectedKeys",
        a.selectedKeys.filter((S) => S !== k)
      ) : s("update:selectedKeys", [...a.selectedKeys, k]);
    }
    function g(m, $) {
      const k = r(m, $);
      return `${a.ariaLabelSelectRow} ${k}`;
    }
    return (m, $) => (y(), x("div", s$, [
      c("div", n$, [
        c("table", o$, [
          c("thead", null, [
            c("tr", i$, [
              e.selectable ? (y(), x("th", r$, [
                c("input", {
                  ref_key: "selectAllRef",
                  ref: n,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: v.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: _
                }, null, 40, l$)
              ])) : E("", !0),
              (y(!0), x(q, null, J(e.columns, (k) => (y(), x("th", {
                key: k.key,
                scope: "col",
                class: Y([
                  "px-4 py-3 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]",
                  k.headerClass ?? "",
                  "!text-left"
                ])
              }, M(k.label), 3))), 128))
            ])
          ]),
          c("tbody", null, [
            (y(!0), x(q, null, J(e.rows, (k, w) => (y(), x("tr", {
              key: u(k, w),
              class: "h-14 border-b border-[#e5e7eb] bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]"
            }, [
              e.selectable ? (y(), x("td", c$, [
                c("input", {
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: p(k, w),
                  "aria-label": g(k, w),
                  onChange: (S) => b(k, w)
                }, null, 40, d$)
              ])) : E("", !0),
              (y(!0), x(q, null, J(e.columns, (S) => (y(), x("td", {
                key: S.key,
                class: Y([
                  "bg-transparent px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]",
                  i(S.align),
                  S.cellClass ?? ""
                ])
              }, [
                It(m.$slots, o(S.key), {
                  row: k,
                  column: S,
                  value: l(k, S.key)
                }, () => [
                  kt(M(d(l(k, S.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}), h$ = /* @__PURE__ */ st(u$, [["__scopeId", "data-v-1928de95"]]);
function f$(e, t) {
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
function g$(e, t) {
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
const p$ = ["aria-label"], v$ = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, b$ = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, m$ = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, y$ = ["aria-label", "aria-expanded", "aria-controls", "onClick"], _$ = { class: "truncate" }, x$ = {
  key: 0,
  class: "ml-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--kiut-primary)]/20 px-1 text-[10px] font-semibold tabular-nums text-[color:var(--kiut-primary-default)] dark:bg-[color:var(--kiut-primary)]/25 dark:text-[color:var(--kiut-primary-light)]"
}, k$ = {
  key: 0,
  class: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5"
}, w$ = { class: "flex min-w-0 flex-wrap items-center gap-1.5" }, $$ = ["aria-label", "onClick"], M$ = ["aria-label", "onClick"], S$ = ["aria-label"], C$ = ["aria-label"], D$ = {
  key: 1,
  class: "space-y-2"
}, A$ = ["for"], T$ = ["id", "placeholder", "onKeydown"], B$ = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, L$ = ["aria-label"], F$ = { class: "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] transition hover:bg-black/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.06]" }, P$ = ["checked", "onChange"], I$ = { class: "min-w-0 flex-1" }, E$ = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, R$ = { class: "flex flex-wrap items-end gap-2" }, O$ = { class: "min-w-[120px] flex-1" }, V$ = ["for"], z$ = ["id"], N$ = { class: "min-w-[120px] flex-1" }, W$ = ["for"], H$ = ["id"], j$ = /* @__PURE__ */ Q({
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
    const a = e, s = t, n = Ro(), i = `${`kiut-filters-${Ft()}`}-panel`, r = tt(null), l = /* @__PURE__ */ new Map(), d = tt(null), u = tt(!1), h = tt({}), p = tt(null), v = tt(""), f = tt([]), _ = tt(""), b = tt(""), g = C(() => d.value ? a.filterDefinitions.find((F) => F.id === d.value) ?? null : null), m = C(() => {
      const F = g.value;
      if (F)
        return F.type === "text" ? v.value : F.type === "select" ? f.value : { start: _.value, end: b.value };
    });
    function $(F, z) {
      z && z instanceof HTMLElement ? l.set(F, z) : l.delete(F);
    }
    function k(F) {
      return a.modelValue[F];
    }
    function w(F) {
      if (F == null) return [];
      if (Array.isArray(F))
        return F.filter((z) => typeof z == "string" && z.trim() !== "");
      if (typeof F == "string") {
        const z = F.trim();
        return z ? [z] : [];
      }
      return [];
    }
    function S(F, z) {
      if (z == null) return !0;
      if (F.type === "text") return String(z).trim() === "";
      if (F.type === "select") return w(z).length === 0;
      if (F.type === "dateRange") {
        const X = z;
        return !X?.start?.trim() || !X?.end?.trim();
      }
      return !0;
    }
    const D = C(
      () => a.filterDefinitions.some((F) => !S(F, k(F.id)))
    ), T = C(() => {
      const F = [];
      for (const z of a.filterDefinitions) {
        const X = k(z.id);
        if (!S(z, X)) {
          if (z.type === "text")
            F.push({ kind: "text", def: z, key: z.id });
          else if (z.type === "dateRange")
            F.push({ kind: "dateRange", def: z, key: z.id });
          else if (z.type === "select")
            for (const ut of w(X))
              F.push({
                kind: "select",
                def: z,
                optionValue: ut,
                key: `${z.id}::${ut}`
              });
        }
      }
      return F;
    });
    function O(F) {
      return F.type !== "select" ? 0 : w(k(F.id)).length;
    }
    function P(F) {
      const z = k(F.id), X = F.label.replace(/^\+\s*/, "");
      if (F.type === "text") return `${X}: ${String(z ?? "").trim()}`;
      if (F.type === "select") {
        const Yi = w(z).map((en) => F.options.find((Ki) => Ki.value === en)?.label ?? en);
        return `${X}: ${Yi.join(", ")}`;
      }
      const ut = z, Nt = R(ut.start), ue = R(ut.end);
      return `${X}: ${Nt} – ${ue}`;
    }
    function B(F) {
      return F.kind === "text" || F.kind === "dateRange" ? P(F.def) : F.def.options.find((X) => X.value === F.optionValue)?.label ?? F.optionValue;
    }
    function R(F) {
      if (!F) return "";
      const z = At(F, "YYYY-MM-DD", !0);
      return z.isValid() ? z.format("L") : F;
    }
    function H(F) {
      const z = d.value === F.id && u.value, X = !S(F, k(F.id));
      return z || X ? "border border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border border-dashed border-slate-400/90 text-[color:var(--kiut-text-secondary)] hover:border-[color:var(--kiut-primary)]/50 hover:bg-slate-50 dark:border-slate-500 dark:text-slate-400 dark:hover:border-[color:var(--kiut-primary-light)]/40 dark:hover:bg-white/[0.04]";
    }
    function L(F) {
      return S(F, k(F.id)) ? de(F) : `Editar filtro ${F.label.replace(/^\+\s*/, "")}`;
    }
    function I(F) {
      const z = k(F.id);
      if (F.type === "text") {
        v.value = z != null ? String(z) : "";
        return;
      }
      if (F.type === "select") {
        f.value = [...w(z)];
        return;
      }
      const X = z;
      _.value = X?.start?.trim() ?? "", b.value = X?.end?.trim() ?? "";
    }
    function V() {
      const F = g.value;
      if (!F || F.type !== "select") return;
      const z = { ...a.modelValue };
      f.value.length === 0 ? delete z[F.id] : z[F.id] = [...f.value], s("update:modelValue", z), s("change", z);
    }
    function W(F) {
      const z = f.value.indexOf(F);
      z >= 0 ? f.value = f.value.filter((X, ut) => ut !== z) : f.value = [...f.value, F], V();
    }
    function N(F) {
      if (!F) return;
      p.value = F;
      const z = F.getBoundingClientRect(), X = 300;
      let ut = z.left;
      const Nt = window.innerWidth - X - 12;
      ut > Nt && (ut = Math.max(12, Nt)), ut < 12 && (ut = 12);
      const ue = z.bottom + 8;
      h.value = {
        top: `${ue}px`,
        left: `${ut}px`,
        width: `${Math.min(X, window.innerWidth - 24)}px`
      };
    }
    function j(F, z) {
      if (d.value === F.id && u.value) {
        dt();
        return;
      }
      u.value && d.value !== F.id && dt(), d.value = F.id, u.value = !0, I(F), St().then(async () => {
        N(z.currentTarget), await St(), nt();
      });
    }
    function K(F, z) {
      if (d.value === F.id && u.value) {
        dt();
        return;
      }
      u.value && d.value !== F.id && dt(), d.value = F.id, u.value = !0, I(F), St().then(async () => {
        const X = l.get(F.id) ?? z.currentTarget;
        N(X), await St(), nt();
      });
    }
    function nt() {
      const F = r.value;
      if (!F) return;
      F.querySelector(
        'input[type="text"], input[type="date"], input[type="checkbox"], select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function et() {
      u.value = !1, d.value = null, p.value = null;
    }
    function G(F) {
      const z = g.value;
      if (!z) return;
      if (z.type === "text") {
        v.value = F != null ? String(F) : "";
        return;
      }
      if (z.type === "select") {
        f.value = Array.isArray(F) ? F.filter((ut) => typeof ut == "string") : w(F);
        return;
      }
      const X = F;
      _.value = X?.start?.trim() ?? "", b.value = X?.end?.trim() ?? "";
    }
    function dt() {
      const F = g.value;
      if (!F) return;
      if (F.type === "text") {
        const Nt = v.value.trim(), ue = { ...a.modelValue };
        Nt === "" ? delete ue[F.id] : ue[F.id] = Nt, s("update:modelValue", ue), s("change", ue), et();
        return;
      }
      if (F.type === "select") {
        V(), et();
        return;
      }
      const z = _.value.trim(), X = b.value.trim(), ut = { ...a.modelValue };
      !z || !X || z > X ? delete ut[F.id] : ut[F.id] = { start: z, end: X }, s("update:modelValue", ut), s("change", ut), et();
    }
    function wt(F) {
      const z = { ...a.modelValue };
      delete z[F], s("update:modelValue", z), s("change", z), d.value === F && et();
    }
    function gt(F) {
      if (F.kind === "text" || F.kind === "dateRange") {
        wt(F.def.id);
        return;
      }
      const z = { ...a.modelValue }, ut = w(z[F.def.id]).filter((Nt) => Nt !== F.optionValue);
      ut.length === 0 ? delete z[F.def.id] : z[F.def.id] = ut, s("update:modelValue", z), s("change", z), d.value === F.def.id && I(F.def);
    }
    function Pt() {
      const F = {};
      s("update:modelValue", F), s("change", F), et();
    }
    const zt = C(() => {
      const F = g.value;
      return F ? `Editar filtro: ${F.label}` : "Filtro";
    });
    function Kt(F) {
      const z = F.def.label.replace(/^\+\s*/, "");
      return F.kind === "select" ? `Quitar ${F.def.options.find((Nt) => Nt.value === F.optionValue)?.label ?? F.optionValue} del filtro ${z}` : `Quitar filtro ${z}`;
    }
    function it(F) {
      const z = F.def.label.replace(/^\+\s*/, "");
      if (F.kind === "select") {
        const ut = F.def.options.find((Nt) => Nt.value === F.optionValue)?.label ?? F.optionValue;
        return `Editar filtro ${z}: ${ut}`;
      }
      return `Editar filtro ${z}`;
    }
    function de(F) {
      return `Añadir filtro ${F.label.replace(/^\+\s*/, "")}`;
    }
    const tn = C(() => a.clearLabel);
    function Ye(F) {
      if (!u.value || !r.value) return;
      const z = F.target;
      if (!(r.value.contains(z) || (z instanceof Element ? z : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const ut of l.values())
          if (ut?.contains(z)) return;
        dt();
      }
    }
    function ma(F) {
      F.key === "Escape" && u.value && (F.preventDefault(), et());
    }
    function Ke() {
      !u.value || !p.value || N(p.value);
    }
    return re(() => {
      document.addEventListener("mousedown", Ye, !0), window.addEventListener("keydown", ma, !0), window.addEventListener("resize", Ke);
    }), Eo(() => {
      document.removeEventListener("mousedown", Ye, !0), window.removeEventListener("keydown", ma, !0), window.removeEventListener("resize", Ke);
    }), Et(
      () => a.modelValue,
      () => {
        const F = g.value;
        F && u.value && !n.panel && I(F);
      },
      { deep: !0 }
    ), (F, z) => (y(), x("div", {
      class: "kiut-filters font-[Inter] text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      c("div", v$, [
        c("span", b$, M(e.label), 1),
        c("div", m$, [
          (y(!0), x(q, null, J(e.filterDefinitions, (X) => (y(), x("button", {
            key: `pill-${X.id}`,
            ref_for: !0,
            ref: (ut) => $(X.id, ut),
            type: "button",
            class: Y(["inline-flex h-[26px] max-w-full shrink-0 items-center gap-0.5 rounded-full px-2 font-medium transition-colors", H(X)]),
            "aria-label": L(X),
            "aria-expanded": d.value === X.id,
            "aria-haspopup": !0,
            "aria-controls": d.value === X.id ? i : void 0,
            onClick: (ut) => K(X, ut)
          }, [
            Z(A(f$), {
              class: "h-3.5 w-3.5 shrink-0",
              "aria-hidden": "true"
            }),
            c("span", _$, M(X.label), 1),
            X.type === "select" && O(X) > 0 ? (y(), x("span", x$, M(O(X)), 1)) : E("", !0)
          ], 10, y$))), 128))
        ])
      ]),
      D.value ? (y(), x("div", k$, [
        c("div", w$, [
          (y(!0), x(q, null, J(T.value, (X) => (y(), x("div", {
            key: X.key,
            "data-kiut-filter-chip": "",
            class: "inline-flex h-[26px] max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            c("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": it(X),
              onClick: (ut) => j(X.def, ut)
            }, [
              It(F.$slots, "formatChip", {
                filter: X.def,
                value: k(X.def.id),
                optionValue: X.kind === "select" ? X.optionValue : void 0
              }, () => [
                kt(M(B(X)), 1)
              ], !0)
            ], 8, $$),
            c("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": Kt(X),
              onClick: (ut) => gt(X)
            }, [
              Z(A(g$), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, M$)
          ]))), 128))
        ]),
        c("button", {
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": tn.value,
          onClick: Pt
        }, M(e.clearLabel), 9, S$)
      ])) : E("", !0),
      (y(), ct(Is, { to: "body" }, [
        d.value && u.value ? (y(), x("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: r,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": zt.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:bg-[#252528]",
          style: mt(h.value),
          onKeydown: z[3] || (z[3] = Jt(() => {
          }, ["stop"]))
        }, [
          g.value ? (y(), x(q, { key: 0 }, [
            F.$slots.panel ? It(F.$slots, "panel", {
              key: 0,
              filter: g.value,
              close: dt,
              value: m.value,
              updateValue: G
            }, void 0, !0) : (y(), x("div", D$, [
              g.value.type === "text" ? (y(), x(q, { key: 0 }, [
                c("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, M(g.value.label), 9, A$),
                Ut(c("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": z[0] || (z[0] = (X) => v.value = X),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: g.value.placeholder ?? "…",
                  onKeydown: Ia(Jt(dt, ["prevent"]), ["enter"])
                }, null, 40, T$), [
                  [Re, v.value]
                ])
              ], 64)) : g.value.type === "select" ? (y(), x(q, { key: 1 }, [
                c("p", B$, M(g.value.label), 1),
                c("ul", {
                  class: "max-h-[min(280px,50vh)] space-y-0.5 overflow-y-auto",
                  role: "listbox",
                  "aria-label": g.value.label,
                  "aria-multiselectable": !0
                }, [
                  (y(!0), x(q, null, J(g.value.options, (X) => (y(), x("li", {
                    key: X.value
                  }, [
                    c("label", F$, [
                      c("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox shrink-0",
                        checked: f.value.includes(X.value),
                        onChange: (ut) => W(X.value)
                      }, null, 40, P$),
                      c("span", I$, M(X.label), 1)
                    ])
                  ]))), 128))
                ], 8, L$)
              ], 64)) : g.value.type === "dateRange" ? (y(), x(q, { key: 2 }, [
                c("p", E$, M(g.value.label), 1),
                c("div", R$, [
                  c("div", O$, [
                    c("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, V$),
                    Ut(c("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": z[1] || (z[1] = (X) => _.value = X),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, z$), [
                      [Re, _.value]
                    ])
                  ]),
                  c("div", N$, [
                    c("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, W$),
                    Ut(c("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": z[2] || (z[2] = (X) => b.value = X),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, H$), [
                      [Re, b.value]
                    ])
                  ])
                ])
              ], 64)) : E("", !0)
            ]))
          ], 64)) : E("", !0)
        ], 44, C$)) : E("", !0)
      ]))
    ], 8, p$));
  }
}), Y$ = /* @__PURE__ */ st(j$, [["__scopeId", "data-v-4403df66"]]), qt = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", ce = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", Le = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", _e = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", K$ = { class: "font-sans" }, U$ = ["for"], q$ = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], X$ = ["id"], G$ = /* @__PURE__ */ Q({
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
    const a = e, s = t, n = `kiut-input-text-${Ft()}`, o = C(() => a.id ?? n), i = C(() => `${o.value}-err`), r = C({
      get: () => a.modelValue,
      set: (l) => s("update:modelValue", l)
    });
    return (l, d) => (y(), x("div", K$, [
      e.label ? (y(), x("label", {
        key: 0,
        for: o.value,
        class: Y(A(qt))
      }, M(e.label), 11, U$)) : E("", !0),
      Ut(c("input", {
        id: o.value,
        "onUpdate:modelValue": d[0] || (d[0] = (u) => r.value = u),
        type: "text",
        autocomplete: "off",
        class: Y([A(ce), e.invalid ? A(Le) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, q$), [
        [Re, r.value]
      ]),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: i.value,
        class: Y(A(_e)),
        role: "alert"
      }, M(e.errorText), 11, X$)) : E("", !0)
    ]));
  }
}), Z$ = { class: "font-sans" }, Q$ = ["for"], J$ = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], t4 = ["for"], e4 = ["title"], a4 = ["aria-label"], s4 = ["id"], n4 = /* @__PURE__ */ Q({
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
    const a = e, s = t, n = `kiut-input-file-${Ft()}`, o = C(() => a.id ?? n), i = C(() => `${o.value}-err`), r = tt(null), l = C(() => a.modelValue?.name ?? a.placeholder);
    function d(h) {
      const v = h.target.files?.[0] ?? null;
      s("update:modelValue", v);
    }
    function u() {
      s("update:modelValue", null), r.value && (r.value.value = "");
    }
    return (h, p) => (y(), x("div", Z$, [
      e.label ? (y(), x("label", {
        key: 0,
        for: o.value,
        class: Y(A(qt))
      }, M(e.label), 11, Q$)) : E("", !0),
      c("div", {
        class: Y([
          A(ce),
          "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
          e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
          e.invalid ? A(Le) : "",
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
        }, null, 40, J$),
        c("label", {
          for: o.value,
          class: Y(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled ? "cursor-not-allowed opacity-50" : ""])
        }, [
          Z(A(Bg), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          kt(" " + M(e.chooseLabel), 1)
        ], 10, t4),
        c("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: l.value || void 0
        }, M(l.value), 9, e4),
        e.modelValue && !e.disabled ? (y(), x("button", {
          key: 0,
          type: "button",
          class: "inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
          "aria-label": e.clearAriaLabel,
          onClick: u
        }, [
          Z(A(zi), {
            class: "h-4 w-4",
            "aria-hidden": "true"
          })
        ], 8, a4)) : E("", !0)
      ], 2),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: i.value,
        class: Y(A(_e)),
        role: "alert"
      }, M(e.errorText), 11, s4)) : E("", !0)
    ]));
  }
}), o4 = { class: "font-sans" }, i4 = ["for"], r4 = { class: "relative" }, l4 = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], c4 = ["id"], d4 = /* @__PURE__ */ Q({
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
    const a = e, s = t, n = `kiut-input-datetime-${Ft()}`, o = C(() => a.id ?? n), i = C(() => `${o.value}-err`), r = C(() => a.modelValue ?? "");
    function l(d) {
      const u = d.target.value;
      s("update:modelValue", u === "" ? null : u);
    }
    return (d, u) => (y(), x("div", o4, [
      e.label ? (y(), x("label", {
        key: 0,
        for: o.value,
        class: Y(A(qt))
      }, M(e.label), 11, i4)) : E("", !0),
      c("div", r4, [
        Z(A(Oi), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        c("input", {
          id: o.value,
          value: r.value,
          type: "datetime-local",
          autocomplete: "off",
          class: Y([
            A(ce),
            "pl-10",
            e.invalid ? A(Le) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? i.value : void 0,
          onInput: l
        }, null, 42, l4)
      ]),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: i.value,
        class: Y(A(_e)),
        role: "alert"
      }, M(e.errorText), 11, c4)) : E("", !0)
    ]));
  }
}), u4 = { class: "font-sans" }, h4 = ["for"], f4 = { class: "relative" }, g4 = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], p4 = ["id"], v4 = /* @__PURE__ */ Q({
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
      const p = /^(\d{1,2}):(\d{2})(?::\d{2}(?:\.\d+)?)?$/.exec(h.trim());
      if (!p) return null;
      const v = Number(p[1]), f = Number(p[2]);
      return !Number.isInteger(v) || !Number.isInteger(f) || v < 0 || v > 23 || f < 0 || f > 59 ? null : `${String(v).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
    }
    function s(h) {
      return h === "" ? null : a(h);
    }
    const n = e, o = t, i = `kiut-input-time-${Ft()}`, r = C(() => n.id ?? i), l = C(() => `${r.value}-err`), d = C(() => n.modelValue == null || n.modelValue === "" ? "" : a(n.modelValue) ?? "");
    function u(h) {
      const p = h.target.value;
      o("update:modelValue", s(p));
    }
    return (h, p) => (y(), x("div", u4, [
      e.label ? (y(), x("label", {
        key: 0,
        for: r.value,
        class: Y(A(qt))
      }, M(e.label), 11, h4)) : E("", !0),
      c("div", f4, [
        Z(A(Rg), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        c("input", {
          id: r.value,
          value: d.value,
          type: "time",
          autocomplete: "off",
          class: Y([
            A(ce),
            "pl-10",
            e.invalid ? A(Le) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? l.value : void 0,
          onInput: u
        }, null, 42, g4)
      ]),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: l.value,
        class: Y(A(_e)),
        role: "alert"
      }, M(e.errorText), 11, p4)) : E("", !0)
    ]));
  }
}), b4 = { class: "font-sans" }, m4 = ["for"], y4 = {
  key: 0,
  class: "order-1 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, _4 = ["id", "value", "min", "max", "step", "disabled", "aria-orientation", "aria-invalid", "aria-describedby"], x4 = {
  key: 1,
  class: "text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, k4 = {
  key: 2,
  class: "grid w-full max-w-full grid-cols-[1fr_auto_1fr] items-start gap-x-3 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, w4 = { class: "min-w-0 text-left leading-snug" }, $4 = { class: "max-w-[min(100%,12rem)] shrink px-1 text-center leading-snug" }, M4 = { class: "min-w-0 text-right leading-snug" }, S4 = {
  key: 3,
  class: "order-3 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, C4 = {
  key: 4,
  class: "order-4 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, D4 = ["id"], A4 = /* @__PURE__ */ Q({
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
    const a = e, s = t, n = `kiut-input-range-${Ft()}`, o = C(() => a.id ?? n), i = C(() => `${o.value}-err`), r = C(() => {
      const v = [];
      return a.errorText && v.push(i.value), v.length ? v.join(" ") : void 0;
    }), l = C(
      () => !!(a.caption && !a.captionMin && !a.captionMax)
    ), d = C(() => !!(a.captionMin || a.captionMax)), u = C(() => {
      const { min: v, max: f, modelValue: _ } = a;
      if (f === v) return 0;
      const b = (_ - v) / (f - v);
      return Math.min(100, Math.max(0, b * 100));
    }), h = C(() => ({
      "--kiut-range-fill": `${u.value}%`,
      "--kiut-range-length": a.trackLength
    }));
    function p(v) {
      const f = Number(v.target.value);
      s("update:modelValue", Number.isNaN(f) ? a.min : f);
    }
    return (v, f) => (y(), x("div", b4, [
      e.label ? (y(), x("label", {
        key: 0,
        for: o.value,
        class: Y(A(qt))
      }, M(e.label), 11, m4)) : E("", !0),
      c("div", {
        class: Y(["flex flex-col items-center gap-2", (e.orientation === "vertical", "w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (y(), x("p", y4, M(e.captionMax), 1)) : E("", !0),
        c("div", {
          class: Y(["flex items-center justify-center", [
            e.orientation === "vertical" ? "order-2 h-[var(--kiut-range-length)] w-11 shrink-0" : "order-none w-full py-1"
          ]]),
          style: mt(h.value)
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
            class: Y([
              "kiut-range-input block appearance-none bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              e.orientation === "vertical" ? "kiut-range-input--vertical" : "kiut-range-input--horizontal w-full"
            ]),
            onInput: p
          }, null, 42, _4)
        ], 6),
        e.orientation === "horizontal" && l.value ? (y(), x("p", x4, M(e.caption), 1)) : e.orientation === "horizontal" && d.value ? (y(), x("div", k4, [
          c("span", w4, M(e.captionMin), 1),
          c("span", $4, M(e.caption), 1),
          c("span", M4, M(e.captionMax), 1)
        ])) : E("", !0),
        e.orientation === "vertical" && e.captionMin ? (y(), x("p", S4, M(e.captionMin), 1)) : E("", !0),
        e.orientation === "vertical" && e.caption ? (y(), x("p", C4, M(e.caption), 1)) : E("", !0)
      ], 2),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: i.value,
        class: Y(A(_e)),
        role: "alert"
      }, M(e.errorText), 11, D4)) : E("", !0)
    ]));
  }
}), T4 = /* @__PURE__ */ st(A4, [["__scopeId", "data-v-a1343418"]]), B4 = { class: "font-sans" }, L4 = ["for"], F4 = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], P4 = ["id"], I4 = /* @__PURE__ */ Q({
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
    const a = e, s = t, n = `kiut-input-number-${Ft()}`, o = C(() => a.id ?? n), i = C(() => `${o.value}-err`), r = C(() => {
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
    function d(u) {
      const h = u.target.value;
      if (h === "") {
        s("update:modelValue", null);
        return;
      }
      const p = Number(h);
      s("update:modelValue", Number.isNaN(p) ? null : p);
    }
    return (u, h) => (y(), x("div", B4, [
      e.label ? (y(), x("label", {
        key: 0,
        for: o.value,
        class: Y(A(qt))
      }, M(e.label), 11, L4)) : E("", !0),
      c("input", {
        id: o.value,
        value: l.value,
        type: "number",
        onInput: d,
        class: Y([
          A(ce),
          e.invalid ? A(Le) : "",
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
      }, null, 42, F4),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: i.value,
        class: Y(A(_e)),
        role: "alert"
      }, M(e.errorText), 11, P4)) : E("", !0)
    ]));
  }
}), E4 = { class: "font-sans" }, R4 = ["for"], O4 = ["id", "value", "disabled", "aria-invalid", "aria-describedby"], V4 = ["disabled"], z4 = ["id"], N4 = "#3b82f6", W4 = "#aabbcc", H4 = "flex min-h-[2.75rem] w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans shadow-sm outline-none transition focus-within:border-[color:var(--kiut-primary)] focus-within:ring-2 focus-within:ring-[color:var(--kiut-primary)]/25 focus-within:ring-offset-0 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]", j4 = /* @__PURE__ */ Q({
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
    function a(f) {
      const _ = f.trim(), b = /^#?([0-9a-fA-F]{6})$/.exec(_);
      if (b) return `#${b[1].toLowerCase()}`;
      const g = /^#?([0-9a-fA-F]{3})$/.exec(_);
      if (g) {
        const [m, $, k] = g[1].split("");
        return `#${m}${m}${$}${$}${k}${k}`.toLowerCase();
      }
      return null;
    }
    function s(f) {
      return a(f) ?? N4;
    }
    const n = e, o = t, i = `kiut-input-color-${Ft()}`, r = C(() => n.id ?? i), l = C(() => `${r.value}-err`), d = C(() => s(n.modelValue)), u = tt(d.value), h = tt(!1);
    Et(d, (f) => {
      h.value || (u.value = f);
    });
    function p(f) {
      const _ = f.target, b = a(_.value);
      b && o("update:modelValue", b);
    }
    function v() {
      h.value = !1;
      const f = a(u.value);
      f ? (u.value = f, o("update:modelValue", f)) : u.value = d.value;
    }
    return Et(u, (f) => {
      if (!h.value) return;
      const _ = a(f);
      _ && o("update:modelValue", _);
    }), (f, _) => (y(), x("div", E4, [
      e.label ? (y(), x("label", {
        key: 0,
        for: r.value,
        class: Y(A(qt))
      }, M(e.label), 11, R4)) : E("", !0),
      c("div", {
        class: Y([
          H4,
          e.invalid ? A(Le) : "",
          e.disabled ? "cursor-not-allowed opacity-50" : ""
        ])
      }, [
        c("input", {
          id: r.value,
          type: "color",
          value: d.value,
          disabled: e.disabled,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? l.value : void 0,
          class: "h-9 w-11 shrink-0 cursor-pointer rounded-lg border border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-0.5 shadow-inner outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/35 disabled:cursor-not-allowed dark:border-slate-600 dark:bg-slate-800/80",
          onInput: p
        }, null, 40, O4),
        e.showHexInput ? Ut((y(), x("input", {
          key: 0,
          "onUpdate:modelValue": _[0] || (_[0] = (b) => u.value = b),
          type: "text",
          disabled: e.disabled,
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": "Código hexadecimal del color",
          class: "min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none ring-0 placeholder:text-[color:var(--kiut-text-muted)] focus:ring-0 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500",
          placeholder: W4,
          onFocus: _[1] || (_[1] = (b) => h.value = !0),
          onBlur: v
        }, null, 40, V4)), [
          [Re, u.value]
        ]) : E("", !0)
      ], 2),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: l.value,
        class: Y(A(_e)),
        role: "alert"
      }, M(e.errorText), 11, z4)) : E("", !0)
    ]));
  }
});
function Hi(e, t) {
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
const Y4 = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], K4 = ["aria-selected", "onClick", "onMouseenter"], U4 = {
  key: 0,
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, q4 = { class: "min-w-0 flex-1" }, ji = /* @__PURE__ */ Q({
  name: "Select",
  __name: "Select",
  props: {
    modelValue: {},
    options: {},
    label: {},
    ariaLabelTrigger: {},
    placeholder: { default: "Seleccionar…" },
    disabled: { type: Boolean },
    showOptionCheck: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, s = t, n = `kiut-select-${Ft()}`, o = `${n}-label`, i = `${n}-btn`, r = `${n}-listbox`, l = tt(null), d = tt(null), u = tt(null), h = tt(!1), p = tt(0), v = tt({});
    function f() {
      const B = d.value;
      if (!B) return;
      const R = B.getBoundingClientRect();
      v.value = {
        top: `${R.bottom - 3}px`,
        left: `${R.left}px`,
        width: `${R.width}px`
      };
    }
    const _ = C(() => a.options.filter((B) => !B.disabled)), b = C(
      () => a.ariaLabelTrigger ?? a.placeholder ?? "Seleccionar opción"
    ), g = C(() => a.modelValue === null || a.modelValue === void 0 || a.modelValue === "" ? a.placeholder : a.options.find((R) => R.value === a.modelValue)?.label ?? String(a.modelValue));
    function m(B) {
      return `${String(B.value)}-${B.label}`;
    }
    function $(B) {
      return a.modelValue === B.value;
    }
    function k(B, R) {
      const H = $(B), L = p.value === R;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        H ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !H && L ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function w(B) {
      s("update:modelValue", B.value), h.value = !1;
    }
    function S() {
      a.disabled || (h.value = !h.value);
    }
    function D(B) {
      if (B.stopPropagation(), !a.disabled && (S(), h.value)) {
        f();
        const R = Math.max(
          0,
          _.value.findIndex((H) => H.value === a.modelValue)
        );
        p.value = R, St(() => u.value?.focus());
      }
    }
    function T(B) {
      if (!h.value) return;
      const R = B.target, H = l.value, L = u.value;
      H && !H.contains(R) && (!L || !L.contains(R)) && (h.value = !1);
    }
    function O(B) {
      a.disabled || (B.key === "ArrowDown" || B.key === "Enter" || B.key === " ") && (B.preventDefault(), h.value || (h.value = !0, f(), p.value = Math.max(
        0,
        _.value.findIndex((R) => R.value === a.modelValue)
      ), St(() => u.value?.focus())));
    }
    function P(B) {
      const R = _.value;
      if (R.length !== 0) {
        if (B.key === "Escape") {
          B.preventDefault(), h.value = !1;
          return;
        }
        if (B.key === "ArrowDown") {
          B.preventDefault(), p.value = Math.min(p.value + 1, R.length - 1);
          return;
        }
        if (B.key === "ArrowUp") {
          B.preventDefault(), p.value = Math.max(p.value - 1, 0);
          return;
        }
        if (B.key === "Enter") {
          B.preventDefault();
          const H = R[p.value];
          H && w(H);
        }
      }
    }
    return re(() => {
      document.addEventListener("click", T);
    }), We(() => {
      document.removeEventListener("click", T);
    }), (B, R) => (y(), x("div", {
      ref_key: "rootRef",
      ref: l,
      class: "relative font-sans"
    }, [
      e.label ? (y(), x("label", {
        key: 0,
        id: o,
        class: Y(A(qt))
      }, M(e.label), 3)) : E("", !0),
      c("button", {
        ref_key: "buttonRef",
        ref: d,
        id: i,
        type: "button",
        disabled: e.disabled,
        class: Y([
          A(ce),
          "flex items-center justify-between gap-2 text-left",
          h.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": h.value,
        "aria-haspopup": "listbox",
        "aria-controls": r,
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : b.value,
        onClick: D,
        onKeydown: O
      }, [
        c("span", {
          class: Y([
            "min-w-0 flex-1 truncate",
            e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, M(g.value), 3),
        Z(A(Vi), {
          class: Y(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", h.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, Y4),
      (y(), ct(Is, { to: "body" }, [
        Ut(c("ul", {
          id: r,
          ref_key: "listRef",
          ref: u,
          role: "listbox",
          tabindex: "-1",
          style: mt(v.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          onKeydown: Jt(P, ["stop"])
        }, [
          (y(!0), x(q, null, J(_.value, (H, L) => (y(), x("li", {
            key: m(H),
            role: "option",
            "aria-selected": $(H),
            class: Y(k(H, L)),
            onClick: Jt((I) => w(H), ["stop"]),
            onMouseenter: (I) => p.value = L
          }, [
            e.showOptionCheck ? (y(), x("span", U4, [
              $(H) ? (y(), ct(A(Hi), {
                key: 0,
                class: "h-4 w-4 text-white"
              })) : E("", !0)
            ])) : E("", !0),
            c("span", q4, M(H.label), 1)
          ], 42, K4))), 128))
        ], 36), [
          [ra, h.value]
        ])
      ]))
    ], 512));
  }
}), X4 = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], G4 = { class: "min-h-[1.25rem] min-w-0 flex-1 max-h-32 overflow-y-auto py-0.5" }, Z4 = {
  key: 0,
  class: "block truncate text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, Q4 = {
  key: 1,
  class: "flex flex-wrap gap-1"
}, J4 = { class: "truncate" }, tM = ["aria-selected", "onClick", "onMouseenter"], eM = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, aM = { class: "min-w-0 flex-1" }, sM = /* @__PURE__ */ Q({
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
    const a = e, s = t, n = `kiut-multiselect-${Ft()}`, o = `${n}-label`, i = `${n}-btn`, r = `${n}-listbox`, l = tt(null), d = tt(null), u = tt(!1), h = tt(0), p = C(() => a.options.filter((P) => !P.disabled)), v = C(() => new Set(a.modelValue ?? [])), f = C(
      () => a.options.filter((P) => v.value.has(P.value))
    ), _ = C(() => {
      const P = a.ariaLabelTrigger ?? a.placeholder ?? "Seleccionar opciones", B = f.value.length;
      return B === 0 ? P : `${P}, ${B} seleccionada${B === 1 ? "" : "s"}`;
    });
    function b(P) {
      return `${String(P.value)}-${P.label}`;
    }
    function g(P) {
      return v.value.has(P.value);
    }
    function m(P, B) {
      const R = g(P), H = h.value === B;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        R ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !R && H ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function $(P) {
      const B = [...a.modelValue ?? []], R = B.indexOf(P.value);
      R >= 0 ? B.splice(R, 1) : B.push(P.value), s("update:modelValue", B);
    }
    function k() {
      const P = p.value;
      if (P.length === 0) {
        h.value = 0;
        return;
      }
      const B = v.value, R = P.findIndex((H) => B.has(H.value));
      h.value = R >= 0 ? R : 0;
    }
    function w() {
      a.disabled || (u.value = !u.value);
    }
    function S(P) {
      P.stopPropagation(), !a.disabled && (w(), u.value && (k(), St(() => d.value?.focus())));
    }
    function D(P) {
      if (!u.value) return;
      const B = l.value;
      B && !B.contains(P.target) && (u.value = !1);
    }
    function T(P) {
      a.disabled || (P.key === "ArrowDown" || P.key === "Enter" || P.key === " ") && (P.preventDefault(), u.value || (u.value = !0, k(), St(() => d.value?.focus())));
    }
    function O(P) {
      const B = p.value;
      if (B.length !== 0) {
        if (P.key === "Escape") {
          P.preventDefault(), u.value = !1;
          return;
        }
        if (P.key === "ArrowDown") {
          P.preventDefault(), h.value = Math.min(h.value + 1, B.length - 1);
          return;
        }
        if (P.key === "ArrowUp") {
          P.preventDefault(), h.value = Math.max(h.value - 1, 0);
          return;
        }
        if (P.key === "Enter" || P.key === " ") {
          P.preventDefault();
          const R = B[h.value];
          R && $(R);
        }
      }
    }
    return re(() => {
      document.addEventListener("click", D);
    }), We(() => {
      document.removeEventListener("click", D);
    }), (P, B) => (y(), x("div", {
      ref_key: "rootRef",
      ref: l,
      class: "relative font-sans"
    }, [
      e.label ? (y(), x("label", {
        key: 0,
        id: o,
        class: Y(A(qt))
      }, M(e.label), 3)) : E("", !0),
      c("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: Y([
          A(ce),
          "flex items-start justify-between gap-2 text-left",
          u.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": u.value,
        "aria-haspopup": "listbox",
        "aria-controls": r,
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : _.value,
        onClick: S,
        onKeydown: T
      }, [
        c("div", G4, [
          f.value.length === 0 ? (y(), x("span", Z4, M(e.placeholder), 1)) : (y(), x("div", Q4, [
            (y(!0), x(q, null, J(f.value, (R) => (y(), x("span", {
              key: b(R),
              class: "inline-flex max-w-full items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[color:var(--kiut-text-primary)] dark:bg-white/10 dark:text-slate-100"
            }, [
              c("span", J4, M(R.label), 1)
            ]))), 128))
          ]))
        ]),
        Z(A(Vi), {
          class: Y(["mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", u.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, X4),
      Ut(c("ul", {
        id: r,
        ref_key: "listRef",
        ref: d,
        role: "listbox",
        tabindex: "-1",
        "aria-multiselectable": "true",
        class: "absolute left-0 right-0 z-50 mt-[-3px] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
        onKeydown: Jt(O, ["stop"])
      }, [
        (y(!0), x(q, null, J(p.value, (R, H) => (y(), x("li", {
          key: b(R),
          role: "option",
          "aria-selected": g(R),
          class: Y(m(R, H)),
          onClick: Jt((L) => $(R), ["stop"]),
          onMouseenter: (L) => h.value = H
        }, [
          c("span", eM, [
            g(R) ? (y(), ct(A(Hi), {
              key: 0,
              class: "h-4 w-4 text-white"
            })) : E("", !0)
          ]),
          c("span", aM, M(R.label), 1)
        ], 42, tM))), 128))
      ], 544), [
        [ra, u.value]
      ])
    ], 512));
  }
}), nM = ["id", "aria-checked", "aria-disabled", "disabled", "onKeydown"], oM = { class: "sr-only" }, iM = /* @__PURE__ */ Q({
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
    const a = e, s = t;
    function n() {
      a.disabled || s("update:modelValue", !a.modelValue);
    }
    return (o, i) => (y(), x("button", {
      id: e.id,
      type: "button",
      role: "switch",
      "aria-checked": e.modelValue,
      "aria-disabled": e.disabled ? "true" : void 0,
      disabled: e.disabled,
      class: Y([
        "relative inline-flex h-8 w-[3.75rem] shrink-0 cursor-pointer items-center rounded-full p-0.5 shadow-sm transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        e.modelValue ? "bg-[color:var(--kiut-primary)]" : "bg-[#DEDEE3] dark:bg-slate-600"
      ]),
      onClick: n,
      onKeydown: [
        Ia(Jt(n, ["prevent", "stop"]), ["space"]),
        Ia(Jt(n, ["prevent"]), ["enter"])
      ]
    }, [
      c("span", {
        class: Y(["pointer-events-none inline-block h-7 w-7 translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", e.modelValue ? "translate-x-7" : "translate-x-0"]),
        "aria-hidden": "true"
      }, null, 2),
      c("span", oM, M(e.ariaLabel), 1)
    ], 42, nM));
  }
}), rM = { class: "font-sans" }, lM = ["for"], cM = { class: "flex gap-2" }, dM = { class: "w-[7.5rem] shrink-0" }, uM = { class: "min-w-0 flex-1" }, hM = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], fM = ["id"], gM = /* @__PURE__ */ Q({
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
    const a = e, s = t, n = `kiut-phone-${Ft()}`, o = C(() => a.id ?? `${n}-num`), i = C(() => `${o.value}-err`), r = C({
      get: () => a.modelValue.prefix,
      set: (d) => s("update:modelValue", { ...a.modelValue, prefix: d })
    }), l = C({
      get: () => a.modelValue.number,
      set: (d) => s("update:modelValue", { ...a.modelValue, number: d })
    });
    return (d, u) => (y(), x("div", rM, [
      e.label ? (y(), x("label", {
        key: 0,
        for: o.value,
        class: Y(A(qt))
      }, M(e.label), 11, lM)) : E("", !0),
      c("div", cM, [
        c("div", dM, [
          Z(ji, {
            modelValue: r.value,
            "onUpdate:modelValue": u[0] || (u[0] = (h) => r.value = h),
            "aria-label-trigger": "Prefijo telefónico",
            options: e.prefixOptions,
            placeholder: e.prefixPlaceholder,
            disabled: e.disabled,
            "show-option-check": !1
          }, null, 8, ["modelValue", "options", "placeholder", "disabled"])
        ]),
        c("div", uM, [
          Ut(c("input", {
            id: o.value,
            "onUpdate:modelValue": u[1] || (u[1] = (h) => l.value = h),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: Y([A(ce), e.invalid ? A(Le) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, hM), [
            [Re, l.value]
          ])
        ])
      ]),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: i.value,
        class: Y(A(_e)),
        role: "alert"
      }, M(e.errorText), 11, fM)) : E("", !0)
    ]));
  }
}), pM = ["role", "aria-label"], vM = { class: "flex flex-wrap gap-2" }, bM = ["aria-checked", "role", "onClick"], mM = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, yM = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, _M = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, xM = /* @__PURE__ */ Q({
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
    const a = e, s = t, n = C(() => a.multiple ? Array.isArray(a.modelValue) ? a.modelValue : [] : []);
    function o(l) {
      return a.multiple ? n.value.includes(l.value) : a.modelValue === l.value;
    }
    function i(l) {
      return [
        "inline-flex max-w-full items-center gap-2 rounded-xl border px-3 py-2 text-left transition",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        o(l) ? "border-[color:var(--kiut-primary)]/50 bg-violet-50/80 dark:bg-violet-950/30" : "border-gray-300 bg-white dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]"
      ];
    }
    function r(l) {
      if (a.multiple) {
        const d = Array.isArray(a.modelValue) ? [...a.modelValue] : [], u = d.indexOf(l.value);
        u >= 0 ? d.splice(u, 1) : d.push(l.value), s("update:modelValue", d);
        return;
      }
      s("update:modelValue", l.value);
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
          class: Y(i(u)),
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
            style: mt({ backgroundColor: u.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : E("", !0),
          c("span", _M, M(u.label), 1)
        ], 10, bM))), 128))
      ])
    ], 8, pM));
  }
}), kM = ["aria-label"], wM = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], $M = { class: "truncate px-3 py-2 text-sm font-medium" }, MM = /* @__PURE__ */ Q({
  name: "SegmentedControl",
  __name: "SegmentedControl",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Segmented control" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, s = t, n = `kiut-seg-${Ft()}`, o = (_) => `${n}-seg-${_}`, i = tt([]);
    function r(_, b) {
      _ instanceof HTMLButtonElement ? i.value[b] = _ : i.value[b] = null;
    }
    function l(_) {
      return _.value === a.modelValue;
    }
    function d(_) {
      const b = l(_), g = "flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]";
      return _.disabled ? `${g} cursor-not-allowed opacity-40` : b ? `${g} bg-[color:var(--kiut-primary)] text-white shadow-sm` : `${g} text-[color:var(--kiut-text-primary)] hover:bg-black/[0.03] dark:text-slate-100 dark:hover:bg-white/[0.06]`;
    }
    function u(_) {
      _.disabled || _.value !== a.modelValue && s("update:modelValue", _.value);
    }
    function h(_, b, g) {
      u(_), St(() => i.value[b]?.focus());
    }
    const p = C(
      () => a.items.map((_, b) => _.disabled ? -1 : b).filter((_) => _ >= 0)
    );
    function v(_, b) {
      const g = a.items.length;
      if (g === 0) return 0;
      let m = _;
      for (let $ = 0; $ < g; $++)
        if (m = (m + b + g) % g, !a.items[m]?.disabled) return m;
      return _;
    }
    function f(_, b) {
      if (_.key === "ArrowRight" || _.key === "ArrowDown") {
        _.preventDefault();
        const g = v(b, 1), m = a.items[g];
        m && u(m), St(() => i.value[g]?.focus());
      } else if (_.key === "ArrowLeft" || _.key === "ArrowUp") {
        _.preventDefault();
        const g = v(b, -1), m = a.items[g];
        m && u(m), St(() => i.value[g]?.focus());
      } else if (_.key === "Home") {
        _.preventDefault();
        const g = p.value[0];
        if (g !== void 0) {
          const m = a.items[g];
          m && u(m), St(() => i.value[g]?.focus());
        }
      } else if (_.key === "End") {
        _.preventDefault();
        const g = p.value[p.value.length - 1];
        if (g !== void 0) {
          const m = a.items[g];
          m && u(m), St(() => i.value[g]?.focus());
        }
      }
    }
    return (_, b) => (y(), x("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-[color:var(--kiut-border-light)]"
    }, [
      (y(!0), x(q, null, J(e.items, (g, m) => (y(), x("button", {
        id: o(g.value),
        key: g.value,
        ref_for: !0,
        ref: ($) => r($, m),
        type: "button",
        role: "tab",
        "aria-selected": l(g),
        "aria-disabled": g.disabled === !0,
        tabindex: l(g) ? 0 : -1,
        class: Y(d(g)),
        onClick: ($) => h(g, m),
        onKeydown: ($) => f($, m)
      }, [
        c("span", $M, M(g.label), 1)
      ], 42, wM))), 128))
    ], 8, kM));
  }
});
function $e(e) {
  const [t, a, s] = e.split("-").map(Number);
  return new Date(t, a - 1, s);
}
function Je(e) {
  const t = e.getFullYear(), a = String(e.getMonth() + 1).padStart(2, "0"), s = String(e.getDate()).padStart(2, "0");
  return `${t}-${a}-${s}`;
}
function he(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function xs(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function To(e, t) {
  return new Date(e.getFullYear(), e.getMonth() + t, e.getDate());
}
function Qa(e, t) {
  const a = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()), s = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
  return a < s ? -1 : a > s ? 1 : 0;
}
function Bo(e, t) {
  return Qa(e, t) === 0;
}
function ks(e, t) {
  return Qa(e, t) < 0;
}
function SM(e, t) {
  return Qa(e, t) >= 0;
}
function CM(e, t) {
  return Qa(e, t) <= 0;
}
function DM(e) {
  const t = e.getFullYear(), a = e.getMonth(), s = new Date(t, a, 1), n = new Date(s);
  n.setDate(s.getDate() - s.getDay());
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
function Lo(e) {
  return `${AM[e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function Fo(e) {
  return `${TM[e.getMonth()]} ${e.getFullYear()}`;
}
const BM = ["aria-expanded", "aria-labelledby", "aria-label"], LM = ["onKeydown"], FM = { class: "mb-4 flex items-center justify-between gap-2" }, PM = { class: "flex min-w-0 flex-1 justify-center gap-8 text-center text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, IM = { class: "min-w-0 truncate" }, EM = { class: "min-w-0 truncate" }, RM = { class: "flex flex-col gap-6 sm:flex-row sm:gap-8" }, OM = { class: "mb-2 grid grid-cols-7 gap-1 text-center text-[11px] font-medium uppercase tracking-wide text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, VM = { class: "grid grid-cols-7 gap-y-1" }, zM = ["disabled", "onClick"], NM = /* @__PURE__ */ Q({
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
    const a = e, s = t, o = `${`kiut-drp-${Ft()}`}-lbl`, i = tt(null), r = tt(null), l = tt(!1), d = tt(null), u = tt(xs(/* @__PURE__ */ new Date())), h = C(() => {
      const D = xs(u.value);
      return [D, To(D, 1)];
    }), p = C(() => a.ariaLabel ?? a.placeholder), v = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], f = C(() => {
      if (!a.modelValue.start || !a.modelValue.end) return a.placeholder;
      const D = $e(a.modelValue.start), T = $e(a.modelValue.end);
      return `${Lo(D)} – ${Lo(T)}`;
    });
    function _(D, T) {
      return D.getMonth() === T.getMonth() && D.getFullYear() === T.getFullYear();
    }
    function b(D) {
      const T = he(D);
      if (a.minDate) {
        const O = he($e(a.minDate));
        if (ks(T, O)) return !0;
      }
      if (a.maxDate) {
        const O = he($e(a.maxDate));
        if (ks(O, T)) return !0;
      }
      return !1;
    }
    function g(D, T) {
      const O = _(T, D), P = a.modelValue.start ? he($e(a.modelValue.start)) : null, B = a.modelValue.end ? he($e(a.modelValue.end)) : null, R = he(T), H = O ? "text-[color:var(--kiut-text-primary)] dark:text-slate-100" : "text-slate-400 dark:text-slate-500";
      if (!P || !B)
        return `${H} hover:bg-black/[0.04] dark:hover:bg-white/[0.06]`;
      const L = SM(R, P) && CM(R, B), I = Bo(R, P), V = Bo(R, B);
      return I || V ? "bg-[color:var(--kiut-primary)] font-semibold text-white shadow-sm" : L ? `${H} bg-violet-100/90 dark:bg-violet-950/35 hover:bg-violet-200/80 dark:hover:bg-violet-900/40` : `${H} hover:bg-black/[0.04] dark:hover:bg-white/[0.06]`;
    }
    function m(D) {
      if (b(D)) return;
      const T = he(D);
      if (!d.value) {
        d.value = new Date(T), s("update:modelValue", { start: Je(T), end: Je(T) });
        return;
      }
      let P = he(d.value), B = new Date(T);
      ks(B, P) && ([P, B] = [B, P]), s("update:modelValue", { start: Je(P), end: Je(B) }), d.value = null, l.value = !1;
    }
    function $(D) {
      u.value = To(u.value, D);
    }
    function k() {
      l.value = !1;
    }
    function w(D) {
      if (D.stopPropagation(), l.value = !l.value, l.value) {
        if (d.value = null, a.modelValue.start)
          try {
            u.value = xs($e(a.modelValue.start));
          } catch {
          }
        St(() => r.value?.focus());
      }
    }
    function S(D) {
      if (!l.value) return;
      const T = i.value;
      T && !T.contains(D.target) && (l.value = !1);
    }
    return Et(l, (D) => {
      D && (d.value = null);
    }), re(() => {
      document.addEventListener("click", S);
    }), We(() => {
      document.removeEventListener("click", S);
    }), (D, T) => (y(), x("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (y(), x("label", {
        key: 0,
        id: o,
        class: Y(A(qt))
      }, M(e.label), 3)) : E("", !0),
      c("button", {
        type: "button",
        class: Y([A(ce), "flex w-full items-center gap-2 text-left"]),
        "aria-expanded": l.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : p.value,
        onClick: w
      }, [
        Z(A(Oi), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        c("span", {
          class: Y([
            "min-w-0 flex-1 truncate",
            !e.modelValue.start || !e.modelValue.end ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, M(f.value), 3)
      ], 10, BM),
      Ut(c("div", {
        ref_key: "panelRef",
        ref: r,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": "Calendario de rango",
        class: "absolute left-0 top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[100vw] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] p-4 shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]",
        onKeydown: Ia(Jt(k, ["stop"]), ["escape"])
      }, [
        c("div", FM, [
          c("button", {
            type: "button",
            class: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-slate-300 dark:hover:bg-white/[0.06]",
            "aria-label": "Mes anterior",
            onClick: T[0] || (T[0] = (O) => $(-1))
          }, [
            Z(A(Ig), {
              class: "h-5 w-5",
              "aria-hidden": "true"
            })
          ]),
          c("div", PM, [
            c("span", IM, M(A(Fo)(h.value[0])), 1),
            c("span", EM, M(A(Fo)(h.value[1])), 1)
          ]),
          c("button", {
            type: "button",
            class: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-slate-300 dark:hover:bg-white/[0.06]",
            "aria-label": "Mes siguiente",
            onClick: T[1] || (T[1] = (O) => $(1))
          }, [
            Z(A(Eg), {
              class: "h-5 w-5",
              "aria-hidden": "true"
            })
          ])
        ]),
        c("div", RM, [
          (y(!0), x(q, null, J(h.value, (O) => (y(), x("div", {
            key: `${O.getFullYear()}-${O.getMonth()}`,
            class: "min-w-0 flex-1"
          }, [
            c("div", OM, [
              (y(), x(q, null, J(v, (P) => c("span", { key: P }, M(P), 1)), 64))
            ]),
            c("div", VM, [
              (y(!0), x(q, null, J(A(DM)(O), (P) => (y(), x("button", {
                key: A(Je)(P),
                type: "button",
                disabled: b(P),
                class: Y(["relative flex h-9 items-center justify-center rounded-lg text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", g(O, P)]),
                onClick: (B) => m(P)
              }, M(P.getDate()), 11, zM))), 128))
            ])
          ]))), 128))
        ])
      ], 40, LM), [
        [ra, l.value]
      ])
    ], 512));
  }
}), WM = {
  key: 0,
  class: "relative flex h-2 w-2 shrink-0 items-center justify-center",
  "aria-hidden": "true"
}, HM = /* @__PURE__ */ Q({
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
    const t = e, a = C(() => t.statusLive !== void 0), s = C(
      () => t.statusLive === !0 ? t.labelConnected : t.labelDisconnected
    ), n = C(() => t.statusLive === !0 ? [
      "border border-emerald-200 bg-emerald-50",
      "dark:border-emerald-800/80 dark:bg-emerald-950/40"
    ] : [
      "border border-transparent bg-slate-100 dark:border-slate-700/80 dark:bg-slate-800/90"
    ]), o = C(() => t.statusLive === !0 ? "text-emerald-700 dark:text-emerald-300" : "text-[color:var(--kiut-text-primary)] dark:text-slate-300"), i = C(() => {
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
    return (r, l) => a.value ? (y(), x("span", {
      key: 0,
      role: "status",
      class: Y(["inline-flex w-min max-w-full min-h-[22px] items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug", n.value])
    }, [
      e.statusLive === !0 ? (y(), x("span", WM, [...l[0] || (l[0] = [
        c("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        c("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : E("", !0),
      c("span", {
        class: Y(["min-w-0 flex-1 text-center", o.value])
      }, M(s.value), 3)
    ], 2)) : (y(), x("span", {
      key: 1,
      class: Y(["inline-flex w-min max-w-full min-h-[22px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] font-semibold leading-snug tracking-tight", i.value])
    }, [
      It(r.$slots, "default", {}, () => [
        kt(M(e.label), 1)
      ])
    ], 2));
  }
}), jM = {
  key: 0,
  class: "group relative inline-flex shrink-0"
}, YM = ["type", "disabled", "aria-label"], KM = {
  key: 1,
  class: "min-w-0 truncate"
}, UM = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, qM = ["type", "disabled", "aria-label"], XM = {
  key: 1,
  class: "min-w-0 truncate"
}, Pa = /* @__PURE__ */ Q({
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
    const t = e, a = Oo(), s = C(() => !!t.tooltip?.trim()), n = C(() => t.variant === "action"), o = C(() => !n.value), i = C(() => {
      const u = a["aria-label"];
      if (typeof u == "string" && u.length > 0) return u;
      if (n.value && t.tooltip?.trim()) return t.tooltip.trim();
    }), r = C(() => {
      const u = a.type;
      return u === "submit" || u === "reset" || u === "button" ? u : "button";
    }), l = C(() => {
      const { class: u, type: h, "aria-label": p, ...v } = a;
      return v;
    }), d = C(() => t.variant === "primary" ? [
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
    return (u, h) => s.value ? (y(), x("span", jM, [
      c("button", Ms({
        type: r.value,
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [d.value, A(a).class]],
        disabled: e.disabled,
        "aria-label": i.value
      }, l.value), [
        u.$slots.icon ? (y(), x("span", {
          key: 0,
          class: Y(["inline-flex shrink-0", n.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          It(u.$slots, "icon")
        ], 2)) : E("", !0),
        o.value ? (y(), x("span", KM, [
          It(u.$slots, "default")
        ])) : E("", !0)
      ], 16, YM),
      c("span", UM, M(e.tooltip), 1)
    ])) : (y(), x("button", Ms({
      key: 1,
      type: r.value,
      class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [d.value, A(a).class]],
      disabled: e.disabled,
      "aria-label": i.value
    }, l.value), [
      u.$slots.icon ? (y(), x("span", {
        key: 0,
        class: Y(["inline-flex shrink-0", n.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        It(u.$slots, "icon")
      ], 2)) : E("", !0),
      o.value ? (y(), x("span", XM, [
        It(u.$slots, "default")
      ])) : E("", !0)
    ], 16, qM));
  }
}), GM = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, ZM = { class: "min-w-0 flex-1 space-y-1" }, QM = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, JM = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-6" }, tS = { class: "flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2" }, eS = /* @__PURE__ */ Q({
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
    const a = e, s = t, o = `${`kiut-modal-${Ft()}`}-title`, i = tt(null);
    function r() {
      s("cancel"), s("update:modelValue", !1);
    }
    function l() {
      s("confirm");
    }
    function d(u) {
      a.modelValue && u.key === "Escape" && (u.preventDefault(), r());
    }
    return Et(
      () => a.modelValue,
      (u) => {
        u && requestAnimationFrame(() => {
          i.value?.focus({ preventScroll: !0 });
        });
      }
    ), re(() => {
      document.addEventListener("keydown", d);
    }), We(() => {
      document.removeEventListener("keydown", d);
    }), (u, h) => (y(), ct(Is, { to: "body" }, [
      Z(Ps, { name: "kiut-modal" }, {
        default: Ee(() => [
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
              class: "kiut-modal-panel relative z-10 flex max-h-[min(90vh,880px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] shadow-[var(--kiut-shadow-card)] dark:bg-[#252528] dark:shadow-black/40",
              onClick: h[0] || (h[0] = Jt(() => {
              }, ["stop"]))
            }, [
              c("header", {
                class: Y(["flex shrink-0 justify-between gap-4 border-b border-slate-100 bg-slate-50/50 px-6 py-5 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.02]", e.subtitle ? "items-start" : "items-center"])
              }, [
                c("div", ZM, [
                  c("h2", {
                    id: o,
                    class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                  }, M(e.title), 1),
                  e.subtitle ? (y(), x("p", QM, M(e.subtitle), 1)) : E("", !0)
                ]),
                Z(Pa, {
                  variant: "action",
                  type: "button",
                  class: "shrink-0",
                  onClick: r
                }, {
                  icon: Ee(() => [
                    Z(A(zi), { class: "h-5 w-5" })
                  ]),
                  _: 1
                })
              ], 2),
              c("div", JM, [
                It(u.$slots, "default", {}, void 0, !0)
              ]),
              c("footer", tS, [
                Z(Pa, {
                  variant: "secondary",
                  type: "button",
                  onClick: r
                }, {
                  default: Ee(() => [
                    kt(M(e.cancelLabel), 1)
                  ]),
                  _: 1
                }),
                Z(Pa, {
                  variant: "primary",
                  type: "button",
                  onClick: l
                }, {
                  default: Ee(() => [
                    kt(M(e.confirmLabel), 1)
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
}), aS = /* @__PURE__ */ st(eS, [["__scopeId", "data-v-4ed7bb14"]]), sS = { class: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between" }, nS = { class: "flex min-w-0 flex-1 flex-col gap-1.5" }, oS = { class: "flex min-w-0 items-center gap-2.5" }, iS = {
  key: 0,
  class: "inline-flex shrink-0 items-center text-[color:var(--kiut-text-primary)] dark:text-slate-100 [&>svg]:size-6",
  "aria-hidden": "true"
}, rS = {
  key: 0,
  class: "text-base leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, lS = {
  key: 0,
  class: "flex shrink-0 flex-wrap items-center justify-end gap-2 sm:pt-0.5"
}, cS = {
  key: 0,
  class: "mt-6"
}, dS = /* @__PURE__ */ Q({
  name: "Section",
  __name: "Section",
  props: {
    title: {},
    subtitle: {},
    icon: {}
  },
  setup(e) {
    const t = e, a = Ro(), n = `${`kiut-section-${Ft()}`}-title`, o = C(() => !!(a.icon || t.icon));
    return (i, r) => (y(), x("section", {
      class: "mb-6 text-left font-['Inter',system-ui,sans-serif]",
      "aria-labelledby": n
    }, [
      c("header", sS, [
        c("div", nS, [
          c("div", oS, [
            o.value ? (y(), x("span", iS, [
              It(i.$slots, "icon", {}, () => [
                e.icon ? (y(), ct(la(e.icon), { key: 0 })) : E("", !0)
              ])
            ])) : E("", !0),
            c("h2", {
              id: n,
              class: "min-w-0 text-3xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
            }, M(e.title), 1)
          ]),
          e.subtitle ? (y(), x("p", rS, M(e.subtitle), 1)) : E("", !0)
        ]),
        i.$slots.actions ? (y(), x("div", lS, [
          It(i.$slots, "actions")
        ])) : E("", !0)
      ]),
      i.$slots.default ? (y(), x("div", cS, [
        It(i.$slots, "default")
      ])) : E("", !0)
    ]));
  }
}), uS = { class: "flex flex-1 min-h-0" }, hS = {
  key: 0,
  class: "flex justify-center items-center mt-3 shrink-0"
}, fS = {
  class: "flex-1 overflow-y-auto p-1.5 flex flex-col gap-1",
  "aria-label": "Sections"
}, gS = ["aria-current", "title", "onClick"], pS = {
  key: 1,
  class: "shrink-0 border-t border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)]"
}, vS = { class: "px-4 pt-4 pb-2 shrink-0" }, bS = { class: "text-[12px] font-bold uppercase tracking-widest text-[color:var(--kiut-text-muted)]" }, mS = {
  class: "flex-1 overflow-y-auto px-2 pb-3 flex flex-col gap-1",
  "aria-label": "Section items"
}, yS = ["data-nav-id", "aria-current", "onClick"], _S = /* @__PURE__ */ Q({
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
    secondaryFontSize: { default: "14px" }
  },
  emits: ["update:selectedSectionId", "navigate"],
  setup(e, { emit: t }) {
    const a = tt(!1), s = e, n = t, o = Oo(), { class: i, ...r } = o, l = C(() => {
      const _ = s.sections.find((b) => b.id === s.selectedSectionId);
      return _?.items?.length ? _ : null;
    });
    function d(_) {
      return s.activePath ? s.activePath === _.path || s.activePath.startsWith(_.path + "/") : !1;
    }
    function u(_) {
      return (_.items ?? []).some(d);
    }
    function h(_) {
      if (!_.items?.length) {
        n("update:selectedSectionId", null), n("navigate", {
          section: _,
          item: { id: _.id, label: _.label, path: _.path }
        });
        return;
      }
      const b = s.selectedSectionId === _.id ? null : _.id;
      n("update:selectedSectionId", b);
    }
    function p(_, b) {
      n("navigate", { section: _, item: b });
    }
    function v(_) {
      return s.selectedSectionId === _.id ? [
        "bg-purple-100 text-purple-900 shadow-sm dark:bg-purple-500/30 dark:text-purple-50"
      ] : u(_) ? ["text-[color:var(--kiut-primary)]", "text-purple-800/90 dark:text-purple-400"] : [
        "text-[color:var(--kiut-text-secondary)]",
        "hover:bg-purple-100/50 hover:text-purple-900",
        "dark:hover:bg-purple-400/20 dark:hover:text-purple-50"
      ];
    }
    function f(_) {
      return d(_) ? [
        "bg-purple-100 text-purple-700",
        "dark:bg-purple-600/19 dark:text-purple-500"
      ] : [
        "text-[color:var(--kiut-text-primary)]",
        "hover:bg-purple-50 hover:text-purple-900",
        "dark:hover:bg-purple-500/30 dark:hover:text-purple-50"
      ];
    }
    return (_, b) => (y(), x("aside", Ms({
      class: "kiut-app-shell-nav flex flex-col h-full overflow-hidden",
      role: "navigation",
      "aria-label": "Main navigation"
    }, r), [
      c("div", uS, [
        c("div", {
          class: "primary-rail w-[3.4rem] flex flex-col shrink-0 bg-[color:var(--kiut-bg-secondary)] border-r border-[color:var(--kiut-border-light)]",
          style: mt({
            "--expanded-width": e.expandedPrimaryWidth
          }),
          onMouseenter: b[0] || (b[0] = (g) => a.value = !0),
          onMouseleave: b[1] || (b[1] = (g) => a.value = !1)
        }, [
          _.$slots.logo ? (y(), x("div", hS, [
            It(_.$slots, "logo", { expanded: a.value }, void 0, !0)
          ])) : E("", !0),
          c("nav", fS, [
            (y(!0), x(q, null, J(e.sections, (g) => (y(), x("button", {
              key: g.id,
              type: "button",
              "aria-current": e.selectedSectionId === g.id ? "true" : void 0,
              title: g.label,
              class: Y(["group relative flex flex-row items-center justify-start gap-1 px-2 py-2 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/20", v(g)]),
              onClick: (m) => h(g)
            }, [
              g.icon ? (y(), ct(la(g.icon), {
                key: 0,
                class: "w-[24px] h-[24px] shrink-0",
                "aria-hidden": "true"
              })) : E("", !0),
              c("span", {
                class: "leading-tight font-semibold tracking-wide text-left w-full truncate px-1",
                style: mt({ fontSize: e.primaryFontSize })
              }, M(g.label), 5)
            ], 10, gS))), 128))
          ]),
          _.$slots.footer ? (y(), x("div", pS, [
            It(_.$slots, "footer", { expanded: a.value }, void 0, !0)
          ])) : E("", !0)
        ], 36),
        Z(Ps, { name: "ksn-sub" }, {
          default: Ee(() => [
            l.value ? (y(), x("div", {
              key: "secondary",
              class: "secondary-panel flex flex-col shrink-0 bg-[color:var(--kiut-bg-secondary)] border-r border-[color:var(--kiut-border-light)] overflow-hidden",
              style: mt({ width: e.secondaryWidth })
            }, [
              c("div", vS, [
                c("p", bS, M(l.value.label), 1)
              ]),
              c("nav", mS, [
                (y(!0), x(q, null, J(l.value.items, (g) => (y(), x("button", {
                  key: g.id,
                  type: "button",
                  "data-nav-id": g.id,
                  "aria-current": d(g) ? "page" : void 0,
                  class: Y(["group flex items-center gap-2.5 w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/20", f(g)]),
                  onClick: (m) => p(l.value, g)
                }, [
                  g.icon ? (y(), ct(la(g.icon), {
                    key: 0,
                    class: "w-[14px] h-[14px]"
                  })) : E("", !0),
                  c("span", {
                    class: "truncate",
                    style: mt({ fontSize: e.secondaryFontSize })
                  }, M(g.label), 5)
                ], 10, yS))), 128))
              ])
            ], 4)) : E("", !0)
          ]),
          _: 1
        })
      ])
    ], 16));
  }
}), xS = /* @__PURE__ */ st(_S, [["__scopeId", "data-v-d917d117"]]), LS = {
  install(e) {
    e.component("KiutChartBar", ie), e.component("KiutChartLine", me), e.component("KiutPieChart", Za), e.component("KiutBoxplotChart", qh), e.component("KiutCandlestickChart", Ei), e.component("KiutHistogramChart", Ri), e.component("KiutSankeyChart", ye), e.component("KiutAgentsPerDay", ip), e.component("KiutBookingManager", jp), e.component("KiutCheckin", g0), e.component("KiutCheckinMetrics", V0), e.component("KiutCheckinSegments", hv), e.component("KiutDisruption", Xv), e.component("KiutFAQ", fb), e.component("KiutMessagesPerAgent", kb), e.component("KiutRecordLocator", Ub), e.component("KiutSalesByChannel", um), e.component("KiutSeller", Wm), e.component("KiutTopAgents", Zm), e.component("KiutPaymentMethod", F1), e.component("KiutAgentHumanConversations", xy), e.component("KiutChannelMetrics", Fy), e.component("KiutTriageCombinations", Qy), e.component("KiutSelectLanguage", c_), e.component("KiutGuardrails", R_), e.component("KiutDisruptionNotifier", P2), e.component("KiutTotalConversationsCard", z2), e.component("KiutCsatP95Card", K2), e.component("KiutAiGeneratedRevenueCard", Q2), e.component("KiutNpsDailyMetrics", Ni), e.component("KiutNpsMetrics", Nx), e.component("KiutNpsOverviewMetrics", Wi), e.component("KiutAWSCost", ik), e.component("KiutCostUsage", Ak), e.component("KiutTokenUsage", Gk), e.component("KiutConversationCount", d5), e.component("KiutTopAgentsAnalysis", w5), e.component("KiutTopAgentsPie", F5), e.component("KiutDailyCostTrends", H5), e.component("KiutModelUsage", fw), e.component("KiutMessageRoles", Bw), e.component("KiutCostPerConversations", Gw), e.component("Tabs", a$), e.component("Table", h$), e.component("Filters", Y$), e.component("InputText", G$), e.component("InputFile", n4), e.component("InputDateTime", d4), e.component("InputTime", v4), e.component("InputRange", T4), e.component("InputNumber", I4), e.component("InputColorPicker", j4), e.component("Select", ji), e.component("MultiSelect", sM), e.component("Toggle", iM), e.component("InputPhone", gM), e.component("SelectablePills", xM), e.component("SegmentedControl", MM), e.component("DateRangePicker", NM), e.component("Tag", HM), e.component("Button", Pa), e.component("Modal", aS), e.component("Section", dS), e.component("KiutAppShellNavigation", xS);
  }
};
export {
  ik as AWSCost,
  xy as AgentHumanConversations,
  ip as AgentsPerDay,
  Q2 as AiGeneratedRevenueCard,
  xS as AppShellNavigation,
  jp as BookingManager,
  qh as BoxplotChart,
  Pa as Button,
  Ei as CandlestickChart,
  Fy as ChannelMetrics,
  ie as ChartBar,
  me as ChartLine,
  g0 as Checkin,
  V0 as CheckinMetrics,
  hv as CheckinSegments,
  d5 as ConversationCount,
  Gw as CostPerConversations,
  Ak as CostUsage,
  K2 as CsatP95Card,
  H5 as DailyCostTrends,
  NM as DateRangePicker,
  Xv as Disruption,
  P2 as DisruptionNotifier,
  fb as FAQ,
  Y$ as Filters,
  R_ as Guardrails,
  Ri as HistogramChart,
  j4 as InputColorPicker,
  d4 as InputDateTime,
  n4 as InputFile,
  I4 as InputNumber,
  gM as InputPhone,
  T4 as InputRange,
  G$ as InputText,
  v4 as InputTime,
  LS as KiutUIPlugin,
  Bw as MessageRoles,
  kb as MessagesPerAgent,
  aS as Modal,
  fw as ModelUsage,
  sM as MultiSelect,
  Ni as NpsDailyMetrics,
  Nx as NpsMetrics,
  Wi as NpsOverviewMetrics,
  F1 as PaymentMethod,
  Za as PieChart,
  Ub as RecordLocator,
  um as SalesByChannel,
  ye as SankeyChart,
  dS as Section,
  MM as SegmentedControl,
  ji as Select,
  c_ as SelectLanguage,
  xM as SelectablePills,
  Wm as Seller,
  h$ as Table,
  a$ as Tabs,
  HM as Tag,
  iM as Toggle,
  Gk as TokenUsage,
  Zm as TopAgents,
  w5 as TopAgentsAnalysis,
  F5 as TopAgentsPie,
  z2 as TotalConversationsCard,
  Qy as TriageCombinations
};
//# sourceMappingURL=kiut-ui.es.js.map
