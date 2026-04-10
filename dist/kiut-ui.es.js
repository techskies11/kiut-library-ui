import { defineComponent as Q, shallowRef as Lo, h as ks, ref as nt, onMounted as pe, onUnmounted as fa, watch as Nt, toRaw as ws, nextTick as St, version as ji, isProxy as Fo, computed as S, toRef as rt, openBlock as y, createElementBlock as x, createVNode as Z, unref as T, normalizeStyle as xt, createElementVNode as c, toDisplayString as M, createCommentVNode as E, Fragment as U, renderList as tt, onBeforeUnmount as Po, createStaticVNode as et, withDirectives as se, vShow as Fa, normalizeClass as G, createBlock as ht, createTextVNode as kt, resolveDynamicComponent as Ls, Transition as Eo, withCtx as Ge, renderSlot as Vt, useSlots as Ro, Teleport as Io, withModifiers as fe, withKeys as Pa, vModelText as ta, useAttrs as Yi, mergeProps as Js } from "vue";
import * as tn from "echarts/core";
import { TooltipComponent as qi, TitleComponent as Ui } from "echarts/components";
import { SankeyChart as Ki } from "echarts/charts";
import { CanvasRenderer as Xi } from "echarts/renderers";
import At from "moment";
function ga(e) {
  return e + 0.5 | 0;
}
const ce = (e, t, a) => Math.max(Math.min(e, a), t);
function Ze(e) {
  return ce(ga(e * 2.55), 0, 255);
}
function he(e) {
  return ce(ga(e * 255), 0, 255);
}
function te(e) {
  return ce(ga(e / 2.55) / 100, 0, 1);
}
function en(e) {
  return ce(ga(e * 100), 0, 100);
}
const Ht = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, $s = [..."0123456789ABCDEF"], Gi = (e) => $s[e & 15], Zi = (e) => $s[(e & 240) >> 4] + $s[e & 15], ba = (e) => (e & 240) >> 4 === (e & 15), Qi = (e) => ba(e.r) && ba(e.g) && ba(e.b) && ba(e.a);
function Ji(e) {
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
const tr = (e, t) => e < 255 ? t(e) : "";
function er(e) {
  var t = Qi(e) ? Gi : Zi;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + tr(e.a, t) : void 0;
}
const ar = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Oo(e, t, a) {
  const s = t * Math.min(a, 1 - a), n = (o, i = (o + e / 30) % 12) => a - s * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [n(0), n(8), n(4)];
}
function sr(e, t, a) {
  const s = (n, o = (n + e / 60) % 6) => a - a * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [s(5), s(3), s(1)];
}
function nr(e, t, a) {
  const s = Oo(e, 1, 0.5);
  let n;
  for (t + a > 1 && (n = 1 / (t + a), t *= n, a *= n), n = 0; n < 3; n++)
    s[n] *= 1 - t - a, s[n] += t;
  return s;
}
function or(e, t, a, s, n) {
  return e === n ? (t - a) / s + (t < a ? 6 : 0) : t === n ? (a - e) / s + 2 : (e - t) / s + 4;
}
function Fs(e) {
  const a = e.r / 255, s = e.g / 255, n = e.b / 255, o = Math.max(a, s, n), i = Math.min(a, s, n), r = (o + i) / 2;
  let l, d, u;
  return o !== i && (u = o - i, d = r > 0.5 ? u / (2 - o - i) : u / (o + i), l = or(a, s, n, u, o), l = l * 60 + 0.5), [l | 0, d || 0, r];
}
function Ps(e, t, a, s) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, a, s)).map(he);
}
function Es(e, t, a) {
  return Ps(Oo, e, t, a);
}
function ir(e, t, a) {
  return Ps(nr, e, t, a);
}
function rr(e, t, a) {
  return Ps(sr, e, t, a);
}
function zo(e) {
  return (e % 360 + 360) % 360;
}
function lr(e) {
  const t = ar.exec(e);
  let a = 255, s;
  if (!t)
    return;
  t[5] !== s && (a = t[6] ? Ze(+t[5]) : he(+t[5]));
  const n = zo(+t[2]), o = +t[3] / 100, i = +t[4] / 100;
  return t[1] === "hwb" ? s = ir(n, o, i) : t[1] === "hsv" ? s = rr(n, o, i) : s = Es(n, o, i), {
    r: s[0],
    g: s[1],
    b: s[2],
    a
  };
}
function cr(e, t) {
  var a = Fs(e);
  a[0] = zo(a[0] + t), a = Es(a), e.r = a[0], e.g = a[1], e.b = a[2];
}
function dr(e) {
  if (!e)
    return;
  const t = Fs(e), a = t[0], s = en(t[1]), n = en(t[2]);
  return e.a < 255 ? `hsla(${a}, ${s}%, ${n}%, ${te(e.a)})` : `hsl(${a}, ${s}%, ${n}%)`;
}
const an = {
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
}, sn = {
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
function ur() {
  const e = {}, t = Object.keys(sn), a = Object.keys(an);
  let s, n, o, i, r;
  for (s = 0; s < t.length; s++) {
    for (i = r = t[s], n = 0; n < a.length; n++)
      o = a[n], r = r.replace(o, an[o]);
    o = parseInt(sn[i], 16), e[r] = [o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  return e;
}
let ma;
function hr(e) {
  ma || (ma = ur(), ma.transparent = [0, 0, 0, 0]);
  const t = ma[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const fr = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function gr(e) {
  const t = fr.exec(e);
  let a = 255, s, n, o;
  if (t) {
    if (t[7] !== s) {
      const i = +t[7];
      a = t[8] ? Ze(i) : ce(i * 255, 0, 255);
    }
    return s = +t[1], n = +t[3], o = +t[5], s = 255 & (t[2] ? Ze(s) : ce(s, 0, 255)), n = 255 & (t[4] ? Ze(n) : ce(n, 0, 255)), o = 255 & (t[6] ? Ze(o) : ce(o, 0, 255)), {
      r: s,
      g: n,
      b: o,
      a
    };
  }
}
function pr(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${te(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const Qa = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, Be = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function vr(e, t, a) {
  const s = Be(te(e.r)), n = Be(te(e.g)), o = Be(te(e.b));
  return {
    r: he(Qa(s + a * (Be(te(t.r)) - s))),
    g: he(Qa(n + a * (Be(te(t.g)) - n))),
    b: he(Qa(o + a * (Be(te(t.b)) - o))),
    a: e.a + a * (t.a - e.a)
  };
}
function ya(e, t, a) {
  if (e) {
    let s = Fs(e);
    s[t] = Math.max(0, Math.min(s[t] + s[t] * a, t === 0 ? 360 : 1)), s = Es(s), e.r = s[0], e.g = s[1], e.b = s[2];
  }
}
function Vo(e, t) {
  return e && Object.assign(t || {}, e);
}
function nn(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = he(e[3]))) : (t = Vo(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = he(t.a)), t;
}
function br(e) {
  return e.charAt(0) === "r" ? gr(e) : lr(e);
}
class oa {
  constructor(t) {
    if (t instanceof oa)
      return t;
    const a = typeof t;
    let s;
    a === "object" ? s = nn(t) : a === "string" && (s = Ji(t) || hr(t) || br(t)), this._rgb = s, this._valid = !!s;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = Vo(this._rgb);
    return t && (t.a = te(t.a)), t;
  }
  set rgb(t) {
    this._rgb = nn(t);
  }
  rgbString() {
    return this._valid ? pr(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? er(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? dr(this._rgb) : void 0;
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
    return t && (this._rgb = vr(this._rgb, t._rgb, a)), this;
  }
  clone() {
    return new oa(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = he(t), this;
  }
  clearer(t) {
    const a = this._rgb;
    return a.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, a = ga(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
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
    return ya(this._rgb, 2, t), this;
  }
  darken(t) {
    return ya(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return ya(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return ya(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return cr(this._rgb, t), this;
  }
}
function Zt() {
}
const mr = /* @__PURE__ */ (() => {
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
function ut(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function Lt(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function Ut(e, t) {
  return Lt(e) ? e : t;
}
function ot(e, t) {
  return typeof e > "u" ? t : e;
}
const yr = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, No = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function mt(e, t, a) {
  if (e && typeof e.call == "function")
    return e.apply(a, t);
}
function vt(e, t, a, s) {
  let n, o, i;
  if (Mt(e))
    for (o = e.length, n = 0; n < o; n++)
      t.call(a, e[n], n);
  else if (ut(e))
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
  if (ut(e)) {
    const t = /* @__PURE__ */ Object.create(null), a = Object.keys(e), s = a.length;
    let n = 0;
    for (; n < s; ++n)
      t[a[n]] = Ra(e[a[n]]);
    return t;
  }
  return e;
}
function Wo(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function _r(e, t, a, s) {
  if (!Wo(e))
    return;
  const n = t[e], o = a[e];
  ut(n) && ut(o) ? ia(n, o, s) : t[e] = Ra(o);
}
function ia(e, t, a) {
  const s = Mt(t) ? t : [
    t
  ], n = s.length;
  if (!ut(e))
    return e;
  a = a || {};
  const o = a.merger || _r;
  let i;
  for (let r = 0; r < n; ++r) {
    if (i = s[r], !ut(i))
      continue;
    const l = Object.keys(i);
    for (let d = 0, u = l.length; d < u; ++d)
      o(l[d], e, i, a);
  }
  return e;
}
function ea(e, t) {
  return ia(e, t, {
    merger: xr
  });
}
function xr(e, t, a) {
  if (!Wo(e))
    return;
  const s = t[e], n = a[e];
  ut(s) && ut(n) ? ea(s, n) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = Ra(n));
}
const on = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function kr(e) {
  const t = e.split("."), a = [];
  let s = "";
  for (const n of t)
    s += n, s.endsWith("\\") ? s = s.slice(0, -1) + "." : (a.push(s), s = "");
  return a;
}
function wr(e) {
  const t = kr(e);
  return (a) => {
    for (const s of t) {
      if (s === "")
        break;
      a = a && a[s];
    }
    return a;
  };
}
function Se(e, t) {
  return (on[t] || (on[t] = wr(t)))(e);
}
function Rs(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const ra = (e) => typeof e < "u", ge = (e) => typeof e == "function", rn = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const a of e)
    if (!t.has(a))
      return !1;
  return !0;
};
function $r(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const bt = Math.PI, yt = 2 * bt, Mr = yt + bt, Ia = Number.POSITIVE_INFINITY, Cr = bt / 180, Ct = bt / 2, ye = bt / 4, ln = bt * 2 / 3, Ho = Math.log10, Gt = Math.sign;
function aa(e, t, a) {
  return Math.abs(e - t) < a;
}
function cn(e) {
  const t = Math.round(e);
  e = aa(e, t, e / 1e3) ? t : e;
  const a = Math.pow(10, Math.floor(Ho(e))), s = e / a;
  return (s <= 1 ? 1 : s <= 2 ? 2 : s <= 5 ? 5 : 10) * a;
}
function Sr(e) {
  const t = [], a = Math.sqrt(e);
  let s;
  for (s = 1; s < a; s++)
    e % s === 0 && (t.push(s), t.push(e / s));
  return a === (a | 0) && t.push(a), t.sort((n, o) => n - o).pop(), t;
}
function Dr(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function la(e) {
  return !Dr(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function Ar(e, t) {
  const a = Math.round(e);
  return a - t <= e && a + t >= e;
}
function Tr(e, t, a) {
  let s, n, o;
  for (s = 0, n = e.length; s < n; s++)
    o = e[s][a], isNaN(o) || (t.min = Math.min(t.min, o), t.max = Math.max(t.max, o));
}
function ee(e) {
  return e * (bt / 180);
}
function Br(e) {
  return e * (180 / bt);
}
function dn(e) {
  if (!Lt(e))
    return;
  let t = 1, a = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, a++;
  return a;
}
function jo(e, t) {
  const a = t.x - e.x, s = t.y - e.y, n = Math.sqrt(a * a + s * s);
  let o = Math.atan2(s, a);
  return o < -0.5 * bt && (o += yt), {
    angle: o,
    distance: n
  };
}
function Ms(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function Lr(e, t) {
  return (e - t + Mr) % yt - bt;
}
function zt(e) {
  return (e % yt + yt) % yt;
}
function ca(e, t, a, s) {
  const n = zt(e), o = zt(t), i = zt(a), r = zt(o - n), l = zt(i - n), d = zt(n - o), u = zt(n - i);
  return n === o || n === i || s && o === i || r > l && d < u;
}
function Tt(e, t, a) {
  return Math.max(t, Math.min(a, e));
}
function Fr(e) {
  return Tt(e, -32768, 32767);
}
function ae(e, t, a, s = 1e-6) {
  return e >= Math.min(t, a) - s && e <= Math.max(t, a) + s;
}
function Is(e, t, a) {
  a = a || ((i) => e[i] < t);
  let s = e.length - 1, n = 0, o;
  for (; s - n > 1; )
    o = n + s >> 1, a(o) ? n = o : s = o;
  return {
    lo: n,
    hi: s
  };
}
const Me = (e, t, a, s) => Is(e, a, s ? (n) => {
  const o = e[n][t];
  return o < a || o === a && e[n + 1][t] === a;
} : (n) => e[n][t] < a), Pr = (e, t, a) => Is(e, a, (s) => e[s][t] >= a);
function Er(e, t, a) {
  let s = 0, n = e.length;
  for (; s < n && e[s] < t; )
    s++;
  for (; n > s && e[n - 1] > a; )
    n--;
  return s > 0 || n < e.length ? e.slice(s, n) : e;
}
const Yo = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function Rr(e, t) {
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
  }), Yo.forEach((a) => {
    const s = "_onData" + Rs(a), n = e[a];
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
function un(e, t) {
  const a = e._chartjs;
  if (!a)
    return;
  const s = a.listeners, n = s.indexOf(t);
  n !== -1 && s.splice(n, 1), !(s.length > 0) && (Yo.forEach((o) => {
    delete e[o];
  }), delete e._chartjs);
}
function qo(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const Uo = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function Ko(e, t) {
  let a = [], s = !1;
  return function(...n) {
    a = n, s || (s = !0, Uo.call(window, () => {
      s = !1, e.apply(t, a);
    }));
  };
}
function Ir(e, t) {
  let a;
  return function(...s) {
    return t ? (clearTimeout(a), a = setTimeout(e, t, s)) : e.apply(this, s), t;
  };
}
const Os = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", Dt = (e, t, a) => e === "start" ? t : e === "end" ? a : (t + a) / 2, Or = (e, t, a, s) => e === (s ? "left" : "right") ? a : e === "center" ? (t + a) / 2 : t;
function zr(e, t, a) {
  const s = t.length;
  let n = 0, o = s;
  if (e._sorted) {
    const { iScale: i, vScale: r, _parsed: l } = e, d = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, u = i.axis, { min: h, max: f, minDefined: v, maxDefined: g } = i.getUserBounds();
    if (v) {
      if (n = Math.min(
        // @ts-expect-error Need to type _parsed
        Me(l, u, h).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        a ? s : Me(t, u, i.getPixelForValue(h)).lo
      ), d) {
        const _ = l.slice(0, n + 1).reverse().findIndex((m) => !pt(m[r.axis]));
        n -= Math.max(0, _);
      }
      n = Tt(n, 0, s - 1);
    }
    if (g) {
      let _ = Math.max(
        // @ts-expect-error Need to type _parsed
        Me(l, i.axis, f, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        a ? 0 : Me(t, u, i.getPixelForValue(f), !0).hi + 1
      );
      if (d) {
        const m = l.slice(_ - 1).findIndex((p) => !pt(p[r.axis]));
        _ += Math.max(0, m);
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
function Vr(e) {
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
const _a = (e) => e === 0 || e === 1, hn = (e, t, a) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * yt / a)), fn = (e, t, a) => Math.pow(2, -10 * e) * Math.sin((e - t) * yt / a) + 1, sa = {
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
  easeInOutExpo: (e) => _a(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => _a(e) ? e : hn(e, 0.075, 0.3),
  easeOutElastic: (e) => _a(e) ? e : fn(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return _a(e) ? e : e < 0.5 ? 0.5 * hn(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * fn(e * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (e) => 1 - sa.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? sa.easeInBounce(e * 2) * 0.5 : sa.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function zs(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function gn(e) {
  return zs(e) ? e : new oa(e);
}
function Ja(e) {
  return zs(e) ? e : new oa(e).saturate(0.5).darken(0.1).hexString();
}
const Nr = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], Wr = [
  "color",
  "borderColor",
  "backgroundColor"
];
function Hr(e) {
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
      properties: Wr
    },
    numbers: {
      type: "number",
      properties: Nr
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
function jr(e) {
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
const pn = /* @__PURE__ */ new Map();
function Yr(e, t) {
  t = t || {};
  const a = e + JSON.stringify(t);
  let s = pn.get(a);
  return s || (s = new Intl.NumberFormat(e, t), pn.set(a, s)), s;
}
function Vs(e, t, a) {
  return Yr(t, a).format(e);
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
      (d < 1e-4 || d > 1e15) && (n = "scientific"), o = Ur(e, a);
    }
    const i = Ho(Math.abs(o)), r = isNaN(i) ? 1 : Math.max(Math.min(-1 * Math.floor(i), 20), 0), l = {
      notation: n,
      minimumFractionDigits: r,
      maximumFractionDigits: r
    };
    return Object.assign(l, this.options.ticks.format), Vs(e, s, l);
  }
};
function Ur(e, t) {
  let a = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(a) >= 1 && e !== Math.floor(e) && (a = e - Math.floor(e)), a;
}
var Xo = {
  formatters: qr
};
function Kr(e) {
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
      callback: Xo.formatters.values,
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
const De = /* @__PURE__ */ Object.create(null), Cs = /* @__PURE__ */ Object.create(null);
function na(e, t) {
  if (!t)
    return e;
  const a = t.split(".");
  for (let s = 0, n = a.length; s < n; ++s) {
    const o = a[s];
    e = e[o] || (e[o] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function ts(e, t, a) {
  return typeof t == "string" ? ia(na(e, t), a) : ia(na(e, ""), t);
}
class Xr {
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
    }, this.hover = {}, this.hoverBackgroundColor = (s, n) => Ja(n.backgroundColor), this.hoverBorderColor = (s, n) => Ja(n.borderColor), this.hoverColor = (s, n) => Ja(n.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(a);
  }
  set(t, a) {
    return ts(this, t, a);
  }
  get(t) {
    return na(this, t);
  }
  describe(t, a) {
    return ts(Cs, t, a);
  }
  override(t, a) {
    return ts(De, t, a);
  }
  route(t, a, s, n) {
    const o = na(this, t), i = na(this, s), r = "_" + a;
    Object.defineProperties(o, {
      [r]: {
        value: o[a],
        writable: !0
      },
      [a]: {
        enumerable: !0,
        get() {
          const l = this[r], d = i[n];
          return ut(l) ? Object.assign({}, d, l) : ot(l, d);
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
var $t = /* @__PURE__ */ new Xr({
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
  Hr,
  jr,
  Kr
]);
function Gr(e) {
  return !e || pt(e.size) || pt(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function vn(e, t, a, s, n) {
  let o = t[n];
  return o || (o = t[n] = e.measureText(n).width, a.push(n)), o > s && (s = o), s;
}
function _e(e, t, a) {
  const s = e.currentDevicePixelRatio, n = a !== 0 ? Math.max(a / 2, 0.5) : 0;
  return Math.round((t - n) * s) / s + n;
}
function bn(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function Ss(e, t, a, s) {
  Go(e, t, a, s, null);
}
function Go(e, t, a, s, n) {
  let o, i, r, l, d, u, h, f;
  const v = t.pointStyle, g = t.rotation, _ = t.radius;
  let m = (g || 0) * Cr;
  if (v && typeof v == "object" && (o = v.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(a, s), e.rotate(m), e.drawImage(v, -v.width / 2, -v.height / 2, v.width, v.height), e.restore();
    return;
  }
  if (!(isNaN(_) || _ <= 0)) {
    switch (e.beginPath(), v) {
      // Default includes circle
      default:
        n ? e.ellipse(a, s, n / 2, _, 0, 0, yt) : e.arc(a, s, _, 0, yt), e.closePath();
        break;
      case "triangle":
        u = n ? n / 2 : _, e.moveTo(a + Math.sin(m) * u, s - Math.cos(m) * _), m += ln, e.lineTo(a + Math.sin(m) * u, s - Math.cos(m) * _), m += ln, e.lineTo(a + Math.sin(m) * u, s - Math.cos(m) * _), e.closePath();
        break;
      case "rectRounded":
        d = _ * 0.516, l = _ - d, i = Math.cos(m + ye) * l, h = Math.cos(m + ye) * (n ? n / 2 - d : l), r = Math.sin(m + ye) * l, f = Math.sin(m + ye) * (n ? n / 2 - d : l), e.arc(a - h, s - r, d, m - bt, m - Ct), e.arc(a + f, s - i, d, m - Ct, m), e.arc(a + h, s + r, d, m, m + Ct), e.arc(a - f, s + i, d, m + Ct, m + bt), e.closePath();
        break;
      case "rect":
        if (!g) {
          l = Math.SQRT1_2 * _, u = n ? n / 2 : l, e.rect(a - u, s - l, 2 * u, 2 * l);
          break;
        }
        m += ye;
      /* falls through */
      case "rectRot":
        h = Math.cos(m) * (n ? n / 2 : _), i = Math.cos(m) * _, r = Math.sin(m) * _, f = Math.sin(m) * (n ? n / 2 : _), e.moveTo(a - h, s - r), e.lineTo(a + f, s - i), e.lineTo(a + h, s + r), e.lineTo(a - f, s + i), e.closePath();
        break;
      case "crossRot":
        m += ye;
      /* falls through */
      case "cross":
        h = Math.cos(m) * (n ? n / 2 : _), i = Math.cos(m) * _, r = Math.sin(m) * _, f = Math.sin(m) * (n ? n / 2 : _), e.moveTo(a - h, s - r), e.lineTo(a + h, s + r), e.moveTo(a + f, s - i), e.lineTo(a - f, s + i);
        break;
      case "star":
        h = Math.cos(m) * (n ? n / 2 : _), i = Math.cos(m) * _, r = Math.sin(m) * _, f = Math.sin(m) * (n ? n / 2 : _), e.moveTo(a - h, s - r), e.lineTo(a + h, s + r), e.moveTo(a + f, s - i), e.lineTo(a - f, s + i), m += ye, h = Math.cos(m) * (n ? n / 2 : _), i = Math.cos(m) * _, r = Math.sin(m) * _, f = Math.sin(m) * (n ? n / 2 : _), e.moveTo(a - h, s - r), e.lineTo(a + h, s + r), e.moveTo(a + f, s - i), e.lineTo(a - f, s + i);
        break;
      case "line":
        i = n ? n / 2 : Math.cos(m) * _, r = Math.sin(m) * _, e.moveTo(a - i, s - r), e.lineTo(a + i, s + r);
        break;
      case "dash":
        e.moveTo(a, s), e.lineTo(a + Math.cos(m) * (n ? n / 2 : _), s + Math.sin(m) * _);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function da(e, t, a) {
  return a = a || 0.5, !t || e && e.x > t.left - a && e.x < t.right + a && e.y > t.top - a && e.y < t.bottom + a;
}
function Wa(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function Ha(e) {
  e.restore();
}
function Zr(e, t, a, s, n) {
  if (!t)
    return e.lineTo(a.x, a.y);
  if (n === "middle") {
    const o = (t.x + a.x) / 2;
    e.lineTo(o, t.y), e.lineTo(o, a.y);
  } else n === "after" != !!s ? e.lineTo(t.x, a.y) : e.lineTo(a.x, t.y);
  e.lineTo(a.x, a.y);
}
function Qr(e, t, a, s) {
  if (!t)
    return e.lineTo(a.x, a.y);
  e.bezierCurveTo(s ? t.cp1x : t.cp2x, s ? t.cp1y : t.cp2y, s ? a.cp2x : a.cp1x, s ? a.cp2y : a.cp1y, a.x, a.y);
}
function Jr(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), pt(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function tl(e, t, a, s, n) {
  if (n.strikethrough || n.underline) {
    const o = e.measureText(s), i = t - o.actualBoundingBoxLeft, r = t + o.actualBoundingBoxRight, l = a - o.actualBoundingBoxAscent, d = a + o.actualBoundingBoxDescent, u = n.strikethrough ? (l + d) / 2 : d;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = n.decorationWidth || 2, e.moveTo(i, u), e.lineTo(r, u), e.stroke();
  }
}
function el(e, t) {
  const a = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = a;
}
function ua(e, t, a, s, n, o = {}) {
  const i = Mt(t) ? t : [
    t
  ], r = o.strokeWidth > 0 && o.strokeColor !== "";
  let l, d;
  for (e.save(), e.font = n.string, Jr(e, o), l = 0; l < i.length; ++l)
    d = i[l], o.backdrop && el(e, o.backdrop), r && (o.strokeColor && (e.strokeStyle = o.strokeColor), pt(o.strokeWidth) || (e.lineWidth = o.strokeWidth), e.strokeText(d, a, s, o.maxWidth)), e.fillText(d, a, s, o.maxWidth), tl(e, a, s, d, o), s += Number(n.lineHeight);
  e.restore();
}
function Oa(e, t) {
  const { x: a, y: s, w: n, h: o, radius: i } = t;
  e.arc(a + i.topLeft, s + i.topLeft, i.topLeft, 1.5 * bt, bt, !0), e.lineTo(a, s + o - i.bottomLeft), e.arc(a + i.bottomLeft, s + o - i.bottomLeft, i.bottomLeft, bt, Ct, !0), e.lineTo(a + n - i.bottomRight, s + o), e.arc(a + n - i.bottomRight, s + o - i.bottomRight, i.bottomRight, Ct, 0, !0), e.lineTo(a + n, s + i.topRight), e.arc(a + n - i.topRight, s + i.topRight, i.topRight, 0, -Ct, !0), e.lineTo(a + i.topLeft, s);
}
const al = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, sl = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function nl(e, t) {
  const a = ("" + e).match(al);
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
const ol = (e) => +e || 0;
function Ns(e, t) {
  const a = {}, s = ut(t), n = s ? Object.keys(t) : t, o = ut(e) ? s ? (i) => ot(e[i], e[t[i]]) : (i) => e[i] : () => e;
  for (const i of n)
    a[i] = ol(o(i));
  return a;
}
function Zo(e) {
  return Ns(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function Pe(e) {
  return Ns(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function Yt(e) {
  const t = Zo(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function Bt(e, t) {
  e = e || {}, t = t || $t.font;
  let a = ot(e.size, t.size);
  typeof a == "string" && (a = parseInt(a, 10));
  let s = ot(e.style, t.style);
  s && !("" + s).match(sl) && (console.warn('Invalid font style specified: "' + s + '"'), s = void 0);
  const n = {
    family: ot(e.family, t.family),
    lineHeight: nl(ot(e.lineHeight, t.lineHeight), a),
    size: a,
    style: s,
    weight: ot(e.weight, t.weight),
    string: ""
  };
  return n.string = Gr(n), n;
}
function xa(e, t, a, s) {
  let n, o, i;
  for (n = 0, o = e.length; n < o; ++n)
    if (i = e[n], i !== void 0 && i !== void 0)
      return i;
}
function il(e, t, a) {
  const { min: s, max: n } = e, o = No(t, (n - s) / 2), i = (r, l) => a && r === 0 ? 0 : r + l;
  return {
    min: i(s, -Math.abs(o)),
    max: i(n, o)
  };
}
function Ae(e, t) {
  return Object.assign(Object.create(e), t);
}
function Ws(e, t = [
  ""
], a, s, n = () => e[0]) {
  const o = a || e;
  typeof s > "u" && (s = ei("_fallback", e));
  const i = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: o,
    _fallback: s,
    _getTarget: n,
    override: (r) => Ws([
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
      return Jo(r, l, () => gl(l, t, e, r));
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
      return yn(r).includes(l);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(r) {
      return yn(r);
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
function Re(e, t, a, s) {
  const n = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: a,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: Qo(e, s),
    setContext: (o) => Re(e, o, a, s),
    override: (o) => Re(e.override(o), t, a, s)
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
      return Jo(o, i, () => ll(o, i, r));
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
function Qo(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: a = t.scriptable, _indexable: s = t.indexable, _allKeys: n = t.allKeys } = e;
  return {
    allKeys: n,
    scriptable: a,
    indexable: s,
    isScriptable: ge(a) ? a : () => a,
    isIndexable: ge(s) ? s : () => s
  };
}
const rl = (e, t) => e ? e + Rs(t) : t, Hs = (e, t) => ut(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function Jo(e, t, a) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const s = a();
  return e[t] = s, s;
}
function ll(e, t, a) {
  const { _proxy: s, _context: n, _subProxy: o, _descriptors: i } = e;
  let r = s[t];
  return ge(r) && i.isScriptable(t) && (r = cl(t, r, e, a)), Mt(r) && r.length && (r = dl(t, r, e, i.isIndexable)), Hs(t, r) && (r = Re(r, n, o && o[t], i)), r;
}
function cl(e, t, a, s) {
  const { _proxy: n, _context: o, _subProxy: i, _stack: r } = a;
  if (r.has(e))
    throw new Error("Recursion detected: " + Array.from(r).join("->") + "->" + e);
  r.add(e);
  let l = t(o, i || s);
  return r.delete(e), Hs(e, l) && (l = js(n._scopes, n, e, l)), l;
}
function dl(e, t, a, s) {
  const { _proxy: n, _context: o, _subProxy: i, _descriptors: r } = a;
  if (typeof o.index < "u" && s(e))
    return t[o.index % t.length];
  if (ut(t[0])) {
    const l = t, d = n._scopes.filter((u) => u !== l);
    t = [];
    for (const u of l) {
      const h = js(d, n, e, u);
      t.push(Re(h, o, i && i[e], r));
    }
  }
  return t;
}
function ti(e, t, a) {
  return ge(e) ? e(t, a) : e;
}
const ul = (e, t) => e === !0 ? t : typeof e == "string" ? Se(t, e) : void 0;
function hl(e, t, a, s, n) {
  for (const o of t) {
    const i = ul(a, o);
    if (i) {
      e.add(i);
      const r = ti(i._fallback, a, n);
      if (typeof r < "u" && r !== a && r !== s)
        return r;
    } else if (i === !1 && typeof s < "u" && a !== s)
      return null;
  }
  return !1;
}
function js(e, t, a, s) {
  const n = t._rootScopes, o = ti(t._fallback, a, s), i = [
    ...e,
    ...n
  ], r = /* @__PURE__ */ new Set();
  r.add(s);
  let l = mn(r, i, a, o || a, s);
  return l === null || typeof o < "u" && o !== a && (l = mn(r, i, o, l, s), l === null) ? !1 : Ws(Array.from(r), [
    ""
  ], n, o, () => fl(t, a, s));
}
function mn(e, t, a, s, n) {
  for (; a; )
    a = hl(e, t, a, s, n);
  return a;
}
function fl(e, t, a) {
  const s = e._getTarget();
  t in s || (s[t] = {});
  const n = s[t];
  return Mt(n) && ut(a) ? a : n || {};
}
function gl(e, t, a, s) {
  let n;
  for (const o of t)
    if (n = ei(rl(o, e), a), typeof n < "u")
      return Hs(e, n) ? js(a, s, e, n) : n;
}
function ei(e, t) {
  for (const a of t) {
    if (!a)
      continue;
    const s = a[e];
    if (typeof s < "u")
      return s;
  }
}
function yn(e) {
  let t = e._keys;
  return t || (t = e._keys = pl(e._scopes)), t;
}
function pl(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of e)
    for (const s of Object.keys(a).filter((n) => !n.startsWith("_")))
      t.add(s);
  return Array.from(t);
}
const vl = Number.EPSILON || 1e-14, Ie = (e, t) => t < e.length && !e[t].skip && e[t], ai = (e) => e === "x" ? "y" : "x";
function bl(e, t, a, s) {
  const n = e.skip ? t : e, o = t, i = a.skip ? t : a, r = Ms(o, n), l = Ms(i, o);
  let d = r / (r + l), u = l / (r + l);
  d = isNaN(d) ? 0 : d, u = isNaN(u) ? 0 : u;
  const h = s * d, f = s * u;
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
function ml(e, t, a) {
  const s = e.length;
  let n, o, i, r, l, d = Ie(e, 0);
  for (let u = 0; u < s - 1; ++u)
    if (l = d, d = Ie(e, u + 1), !(!l || !d)) {
      if (aa(t[u], 0, vl)) {
        a[u] = a[u + 1] = 0;
        continue;
      }
      n = a[u] / t[u], o = a[u + 1] / t[u], r = Math.pow(n, 2) + Math.pow(o, 2), !(r <= 9) && (i = 3 / Math.sqrt(r), a[u] = n * i * t[u], a[u + 1] = o * i * t[u]);
    }
}
function yl(e, t, a = "x") {
  const s = ai(a), n = e.length;
  let o, i, r, l = Ie(e, 0);
  for (let d = 0; d < n; ++d) {
    if (i = r, r = l, l = Ie(e, d + 1), !r)
      continue;
    const u = r[a], h = r[s];
    i && (o = (u - i[a]) / 3, r[`cp1${a}`] = u - o, r[`cp1${s}`] = h - o * t[d]), l && (o = (l[a] - u) / 3, r[`cp2${a}`] = u + o, r[`cp2${s}`] = h + o * t[d]);
  }
}
function _l(e, t = "x") {
  const a = ai(t), s = e.length, n = Array(s).fill(0), o = Array(s);
  let i, r, l, d = Ie(e, 0);
  for (i = 0; i < s; ++i)
    if (r = l, l = d, d = Ie(e, i + 1), !!l) {
      if (d) {
        const u = d[t] - l[t];
        n[i] = u !== 0 ? (d[a] - l[a]) / u : 0;
      }
      o[i] = r ? d ? Gt(n[i - 1]) !== Gt(n[i]) ? 0 : (n[i - 1] + n[i]) / 2 : n[i - 1] : n[i];
    }
  ml(e, n, o), yl(e, o, t);
}
function ka(e, t, a) {
  return Math.max(Math.min(e, a), t);
}
function xl(e, t) {
  let a, s, n, o, i, r = da(e[0], t);
  for (a = 0, s = e.length; a < s; ++a)
    i = o, o = r, r = a < s - 1 && da(e[a + 1], t), o && (n = e[a], i && (n.cp1x = ka(n.cp1x, t.left, t.right), n.cp1y = ka(n.cp1y, t.top, t.bottom)), r && (n.cp2x = ka(n.cp2x, t.left, t.right), n.cp2y = ka(n.cp2y, t.top, t.bottom)));
}
function kl(e, t, a, s, n) {
  let o, i, r, l;
  if (t.spanGaps && (e = e.filter((d) => !d.skip)), t.cubicInterpolationMode === "monotone")
    _l(e, n);
  else {
    let d = s ? e[e.length - 1] : e[0];
    for (o = 0, i = e.length; o < i; ++o)
      r = e[o], l = bl(d, r, e[Math.min(o + 1, i - (s ? 0 : 1)) % i], t.tension), r.cp1x = l.previous.x, r.cp1y = l.previous.y, r.cp2x = l.next.x, r.cp2y = l.next.y, d = r;
  }
  t.capBezierPoints && xl(e, a);
}
function Ys() {
  return typeof window < "u" && typeof document < "u";
}
function qs(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function za(e, t, a) {
  let s;
  return typeof e == "string" ? (s = parseInt(e, 10), e.indexOf("%") !== -1 && (s = s / 100 * t.parentNode[a])) : s = e, s;
}
const ja = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function wl(e, t) {
  return ja(e).getPropertyValue(t);
}
const $l = [
  "top",
  "right",
  "bottom",
  "left"
];
function Ce(e, t, a) {
  const s = {};
  a = a ? "-" + a : "";
  for (let n = 0; n < 4; n++) {
    const o = $l[n];
    s[o] = parseFloat(e[t + "-" + o + a]) || 0;
  }
  return s.width = s.left + s.right, s.height = s.top + s.bottom, s;
}
const Ml = (e, t, a) => (e > 0 || t > 0) && (!a || !a.shadowRoot);
function Cl(e, t) {
  const a = e.touches, s = a && a.length ? a[0] : e, { offsetX: n, offsetY: o } = s;
  let i = !1, r, l;
  if (Ml(n, o, e.target))
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
function we(e, t) {
  if ("native" in e)
    return e;
  const { canvas: a, currentDevicePixelRatio: s } = t, n = ja(a), o = n.boxSizing === "border-box", i = Ce(n, "padding"), r = Ce(n, "border", "width"), { x: l, y: d, box: u } = Cl(e, a), h = i.left + (u && r.left), f = i.top + (u && r.top);
  let { width: v, height: g } = t;
  return o && (v -= i.width + r.width, g -= i.height + r.height), {
    x: Math.round((l - h) / v * a.width / s),
    y: Math.round((d - f) / g * a.height / s)
  };
}
function Sl(e, t, a) {
  let s, n;
  if (t === void 0 || a === void 0) {
    const o = e && qs(e);
    if (!o)
      t = e.clientWidth, a = e.clientHeight;
    else {
      const i = o.getBoundingClientRect(), r = ja(o), l = Ce(r, "border", "width"), d = Ce(r, "padding");
      t = i.width - d.width - l.width, a = i.height - d.height - l.height, s = za(r.maxWidth, o, "clientWidth"), n = za(r.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: t,
    height: a,
    maxWidth: s || Ia,
    maxHeight: n || Ia
  };
}
const de = (e) => Math.round(e * 10) / 10;
function Dl(e, t, a, s) {
  const n = ja(e), o = Ce(n, "margin"), i = za(n.maxWidth, e, "clientWidth") || Ia, r = za(n.maxHeight, e, "clientHeight") || Ia, l = Sl(e, t, a);
  let { width: d, height: u } = l;
  if (n.boxSizing === "content-box") {
    const f = Ce(n, "border", "width"), v = Ce(n, "padding");
    d -= v.width + f.width, u -= v.height + f.height;
  }
  return d = Math.max(0, d - o.width), u = Math.max(0, s ? d / s : u - o.height), d = de(Math.min(d, i, l.maxWidth)), u = de(Math.min(u, r, l.maxHeight)), d && !u && (u = de(d / 2)), (t !== void 0 || a !== void 0) && s && l.height && u > l.height && (u = l.height, d = de(Math.floor(u * s))), {
    width: d,
    height: u
  };
}
function _n(e, t, a) {
  const s = t || 1, n = de(e.height * s), o = de(e.width * s);
  e.height = de(e.height), e.width = de(e.width);
  const i = e.canvas;
  return i.style && (a || !i.style.height && !i.style.width) && (i.style.height = `${e.height}px`, i.style.width = `${e.width}px`), e.currentDevicePixelRatio !== s || i.height !== n || i.width !== o ? (e.currentDevicePixelRatio = s, i.height = n, i.width = o, e.ctx.setTransform(s, 0, 0, s, 0, 0), !0) : !1;
}
const Al = (function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    Ys() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function xn(e, t) {
  const a = wl(e, t), s = a && a.match(/^(\d+)(\.\d+)?px$/);
  return s ? +s[1] : void 0;
}
function $e(e, t, a, s) {
  return {
    x: e.x + a * (t.x - e.x),
    y: e.y + a * (t.y - e.y)
  };
}
function Tl(e, t, a, s) {
  return {
    x: e.x + a * (t.x - e.x),
    y: s === "middle" ? a < 0.5 ? e.y : t.y : s === "after" ? a < 1 ? e.y : t.y : a > 0 ? t.y : e.y
  };
}
function Bl(e, t, a, s) {
  const n = {
    x: e.cp2x,
    y: e.cp2y
  }, o = {
    x: t.cp1x,
    y: t.cp1y
  }, i = $e(e, n, a), r = $e(n, o, a), l = $e(o, t, a), d = $e(i, r, a), u = $e(r, l, a);
  return $e(d, u, a);
}
const Ll = function(e, t) {
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
}, Fl = function() {
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
function Ee(e, t, a) {
  return e ? Ll(t, a) : Fl();
}
function si(e, t) {
  let a, s;
  (t === "ltr" || t === "rtl") && (a = e.canvas.style, s = [
    a.getPropertyValue("direction"),
    a.getPropertyPriority("direction")
  ], a.setProperty("direction", t, "important"), e.prevTextDirection = s);
}
function ni(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function oi(e) {
  return e === "angle" ? {
    between: ca,
    compare: Lr,
    normalize: zt
  } : {
    between: ae,
    compare: (t, a) => t - a,
    normalize: (t) => t
  };
}
function kn({ start: e, end: t, count: a, loop: s, style: n }) {
  return {
    start: e % a,
    end: t % a,
    loop: s && (t - e + 1) % a === 0,
    style: n
  };
}
function Pl(e, t, a) {
  const { property: s, start: n, end: o } = a, { between: i, normalize: r } = oi(s), l = t.length;
  let { start: d, end: u, loop: h } = e, f, v;
  if (h) {
    for (d += l, u += l, f = 0, v = l; f < v && i(r(t[d % l][s]), n, o); ++f)
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
function ii(e, t, a) {
  if (!a)
    return [
      e
    ];
  const { property: s, start: n, end: o } = a, i = t.length, { compare: r, between: l, normalize: d } = oi(s), { start: u, end: h, loop: f, style: v } = Pl(e, t, a), g = [];
  let _ = !1, m = null, p, b, $;
  const w = () => l(n, $, p) && r(n, $) !== 0, k = () => r(o, p) === 0 || l(o, $, p), C = () => _ || w(), D = () => !_ || k();
  for (let A = u, P = u; A <= h; ++A)
    b = t[A % i], !b.skip && (p = d(b[s]), p !== $ && (_ = l(p, n, o), m === null && C() && (m = r(p, n) === 0 ? A : P), m !== null && D() && (g.push(kn({
      start: m,
      end: A,
      loop: f,
      count: i,
      style: v
    })), m = null), P = A, $ = p));
  return m !== null && g.push(kn({
    start: m,
    end: h,
    loop: f,
    count: i,
    style: v
  })), g;
}
function ri(e, t) {
  const a = [], s = e.segments;
  for (let n = 0; n < s.length; n++) {
    const o = ii(s[n], e.points, t);
    o.length && a.push(...o);
  }
  return a;
}
function El(e, t, a, s) {
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
function Rl(e, t, a, s) {
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
function Il(e, t) {
  const a = e.points, s = e.options.spanGaps, n = a.length;
  if (!n)
    return [];
  const o = !!e._loop, { start: i, end: r } = El(a, n, o, s);
  if (s === !0)
    return wn(e, [
      {
        start: i,
        end: r,
        loop: o
      }
    ], a, t);
  const l = r < i ? r + n : r, d = !!e._fullLoop && i === 0 && r === n - 1;
  return wn(e, Rl(a, i, l, d), a, t);
}
function wn(e, t, a, s) {
  return !s || !s.setContext || !a ? t : Ol(e, t, a, s);
}
function Ol(e, t, a, s) {
  const n = e._chart.getContext(), o = $n(e.options), { _datasetIndex: i, options: { spanGaps: r } } = e, l = a.length, d = [];
  let u = o, h = t[0].start, f = h;
  function v(g, _, m, p) {
    const b = r ? -1 : 1;
    if (g !== _) {
      for (g += l; a[g % l].skip; )
        g -= b;
      for (; a[_ % l].skip; )
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
    let _ = a[h % l], m;
    for (f = h + 1; f <= g.end; f++) {
      const p = a[f % l];
      m = $n(s.setContext(Ae(n, {
        type: "segment",
        p0: _,
        p1: p,
        p0DataIndex: (f - 1) % l,
        p1DataIndex: f % l,
        datasetIndex: i
      }))), zl(m, u) && v(h, f - 1, g.loop, u), _ = p, u = m;
    }
    h < f - 1 && v(h, f - 1, g.loop, u);
  }
  return d;
}
function $n(e) {
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
function zl(e, t) {
  if (!t)
    return !1;
  const a = [], s = function(n, o) {
    return zs(o) ? (a.includes(o) || a.push(o), a.indexOf(o)) : o;
  };
  return JSON.stringify(e, s) !== JSON.stringify(t, s);
}
function wa(e, t, a) {
  return e.options.clip ? e[a] : t[a];
}
function Vl(e, t) {
  const { xScale: a, yScale: s } = e;
  return a && s ? {
    left: wa(a, t, "left"),
    right: wa(a, t, "right"),
    top: wa(s, t, "top"),
    bottom: wa(s, t, "bottom")
  } : t;
}
function li(e, t) {
  const a = t._clip;
  if (a.disabled)
    return !1;
  const s = Vl(t, e.chartArea);
  return {
    left: a.left === !1 ? 0 : s.left - (a.left === !0 ? 0 : a.left),
    right: a.right === !1 ? e.width : s.right + (a.right === !0 ? 0 : a.right),
    top: a.top === !1 ? 0 : s.top - (a.top === !0 ? 0 : a.top),
    bottom: a.bottom === !1 ? e.height : s.bottom + (a.bottom === !0 ? 0 : a.bottom)
  };
}
class Nl {
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
    this._request || (this._running = !0, this._request = Uo.call(window, () => {
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
var Qt = /* @__PURE__ */ new Nl();
const Mn = "transparent", Wl = {
  boolean(e, t, a) {
    return a > 0.5 ? t : e;
  },
  color(e, t, a) {
    const s = gn(e || Mn), n = s.valid && gn(t || Mn);
    return n && n.valid ? n.mix(s, a).hexString() : t;
  },
  number(e, t, a) {
    return e + (t - e) * a;
  }
};
class Hl {
  constructor(t, a, s, n) {
    const o = a[s];
    n = xa([
      t.to,
      n,
      o,
      t.from
    ]);
    const i = xa([
      t.from,
      o,
      n
    ]);
    this._active = !0, this._fn = t.fn || Wl[t.type || typeof i], this._easing = sa[t.easing] || sa.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = a, this._prop = s, this._from = i, this._to = n, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, a, s) {
    if (this._active) {
      this._notify(!1);
      const n = this._target[this._prop], o = s - this._start, i = this._duration - o;
      this._start = s, this._duration = Math.floor(Math.max(i, t.duration)), this._total += o, this._loop = !!t.loop, this._to = xa([
        t.to,
        a,
        n,
        t.from
      ]), this._from = xa([
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
class ci {
  constructor(t, a) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(a);
  }
  configure(t) {
    if (!ut(t))
      return;
    const a = Object.keys($t.animation), s = this._properties;
    Object.getOwnPropertyNames(t).forEach((n) => {
      const o = t[n];
      if (!ut(o))
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
    const s = a.options, n = Yl(t, s);
    if (!n)
      return [];
    const o = this._createAnimations(n, s);
    return s.$shared && jl(t.options.$animations, s).then(() => {
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
      const f = s.get(d);
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
      o[d] = h = new Hl(f, t, d, u), n.push(h);
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
      return Qt.add(this._chart, s), !0;
  }
}
function jl(e, t) {
  const a = [], s = Object.keys(t);
  for (let n = 0; n < s.length; n++) {
    const o = e[s[n]];
    o && o.active() && a.push(o.wait());
  }
  return Promise.all(a);
}
function Yl(e, t) {
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
function Cn(e, t) {
  const a = e && e.options || {}, s = a.reverse, n = a.min === void 0 ? t : 0, o = a.max === void 0 ? t : 0;
  return {
    start: s ? o : n,
    end: s ? n : o
  };
}
function ql(e, t, a) {
  if (a === !1)
    return !1;
  const s = Cn(e, a), n = Cn(t, a);
  return {
    top: n.end,
    right: s.end,
    bottom: n.start,
    left: s.start
  };
}
function Ul(e) {
  let t, a, s, n;
  return ut(e) ? (t = e.top, a = e.right, s = e.bottom, n = e.left) : t = a = s = n = e, {
    top: t,
    right: a,
    bottom: s,
    left: n,
    disabled: e === !1
  };
}
function di(e, t) {
  const a = [], s = e._getSortedDatasetMetas(t);
  let n, o;
  for (n = 0, o = s.length; n < o; ++n)
    a.push(s[n].index);
  return a;
}
function Sn(e, t, a, s = {}) {
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
    d = e.values[l], Lt(d) && (o || t === 0 || Gt(t) === Gt(d)) && (t += d);
  }
  return !u && !s.all ? 0 : t;
}
function Kl(e, t) {
  const { iScale: a, vScale: s } = t, n = a.axis === "x" ? "x" : "y", o = s.axis === "x" ? "x" : "y", i = Object.keys(e), r = new Array(i.length);
  let l, d, u;
  for (l = 0, d = i.length; l < d; ++l)
    u = i[l], r[l] = {
      [n]: u,
      [o]: e[u]
    };
  return r;
}
function es(e, t) {
  const a = e && e.options.stacked;
  return a || a === void 0 && t.stack !== void 0;
}
function Xl(e, t, a) {
  return `${e.id}.${t.id}.${a.stack || a.type}`;
}
function Gl(e) {
  const { min: t, max: a, minDefined: s, maxDefined: n } = e.getUserBounds();
  return {
    min: s ? t : Number.NEGATIVE_INFINITY,
    max: n ? a : Number.POSITIVE_INFINITY
  };
}
function Zl(e, t, a) {
  const s = e[t] || (e[t] = {});
  return s[a] || (s[a] = {});
}
function Dn(e, t, a, s) {
  for (const n of t.getMatchingVisibleMetas(s).reverse()) {
    const o = e[n.index];
    if (a && o > 0 || !a && o < 0)
      return n.index;
  }
  return null;
}
function An(e, t) {
  const { chart: a, _cachedMeta: s } = e, n = a._stacks || (a._stacks = {}), { iScale: o, vScale: i, index: r } = s, l = o.axis, d = i.axis, u = Xl(o, i, s), h = t.length;
  let f;
  for (let v = 0; v < h; ++v) {
    const g = t[v], { [l]: _, [d]: m } = g, p = g._stacks || (g._stacks = {});
    f = p[d] = Zl(n, u, _), f[r] = m, f._top = Dn(f, i, !0, s.type), f._bottom = Dn(f, i, !1, s.type);
    const b = f._visualValues || (f._visualValues = {});
    b[r] = m;
  }
}
function as(e, t) {
  const a = e.scales;
  return Object.keys(a).filter((s) => a[s].axis === t).shift();
}
function Ql(e, t) {
  return Ae(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function Jl(e, t, a) {
  return Ae(e, {
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
function He(e, t) {
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
const ss = (e) => e === "reset" || e === "none", Tn = (e, t) => t ? e : Object.assign({}, e), tc = (e, t, a) => e && !t.hidden && t._stacked && {
  keys: di(a, !0),
  values: null
};
class Ya {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(t, a) {
    this.chart = t, this._ctx = t.ctx, this.index = a, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = es(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && He(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, a = this._cachedMeta, s = this.getDataset(), n = (h, f, v, g) => h === "x" ? f : h === "r" ? g : v, o = a.xAxisID = ot(s.xAxisID, as(t, "x")), i = a.yAxisID = ot(s.yAxisID, as(t, "y")), r = a.rAxisID = ot(s.rAxisID, as(t, "r")), l = a.indexAxis, d = a.iAxisID = n(l, o, i, r), u = a.vAxisID = n(l, i, o, r);
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
    this._data && un(this._data, this), t._stacked && He(t);
  }
  _dataCheck() {
    const t = this.getDataset(), a = t.data || (t.data = []), s = this._data;
    if (ut(a)) {
      const n = this._cachedMeta;
      this._data = Kl(a, n);
    } else if (s !== a) {
      if (s) {
        un(s, this);
        const n = this._cachedMeta;
        He(n), n._parsed = [];
      }
      a && Object.isExtensible(a) && Rr(a, this), this._syncList = [], this._data = a;
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
    a._stacked = es(a.vScale, a), a.stack !== s.stack && (n = !0, He(a), a.stack = s.stack), this._resyncElements(t), (n || o !== a._stacked) && (An(this, a._parsed), a._stacked = es(a.vScale, a));
  }
  configure() {
    const t = this.chart.config, a = t.datasetScopeKeys(this._type), s = t.getOptionScopes(this.getDataset(), a, !0);
    this.options = t.createResolver(s, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, a) {
    const { _cachedMeta: s, _data: n } = this, { iScale: o, _stacked: i } = s, r = o.axis;
    let l = t === 0 && a === n.length ? !0 : s._sorted, d = t > 0 && s._parsed[t - 1], u, h, f;
    if (this._parsing === !1)
      s._parsed = n, s._sorted = !0, f = n;
    else {
      Mt(n[t]) ? f = this.parseArrayData(s, n, t, a) : ut(n[t]) ? f = this.parseObjectData(s, n, t, a) : f = this.parsePrimitiveData(s, n, t, a);
      const v = () => h[r] === null || d && h[r] < d[r];
      for (u = 0; u < a; ++u)
        s._parsed[u + t] = h = f[u], l && (v() && (l = !1), d = h);
      s._sorted = l;
    }
    i && An(this, f);
  }
  parsePrimitiveData(t, a, s, n) {
    const { iScale: o, vScale: i } = t, r = o.axis, l = i.axis, d = o.getLabels(), u = o === i, h = new Array(n);
    let f, v, g;
    for (f = 0, v = n; f < v; ++f)
      g = f + s, h[f] = {
        [r]: u || o.parse(d[g], g),
        [l]: i.parse(a[g], g)
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
    let u, h, f, v;
    for (u = 0, h = n; u < h; ++u)
      f = u + s, v = a[f], d[u] = {
        x: o.parse(Se(v, r), f),
        y: i.parse(Se(v, l), f)
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
      keys: di(n, !0),
      values: a._stacks[t.axis]._visualValues
    };
    return Sn(r, i, o.index, {
      mode: s
    });
  }
  updateRangeFromParsed(t, a, s, n) {
    const o = s[a.axis];
    let i = o === null ? NaN : o;
    const r = n && s._stacks[a.axis];
    n && r && (n.values = r, i = Sn(n, o, this._cachedMeta.index)), t.min = Math.min(t.min, i), t.max = Math.max(t.max, i);
  }
  getMinMax(t, a) {
    const s = this._cachedMeta, n = s._parsed, o = s._sorted && t === s.iScale, i = n.length, r = this._getOtherScale(t), l = tc(a, s, this.chart), d = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: u, max: h } = Gl(r);
    let f, v;
    function g() {
      v = n[f];
      const _ = v[r.axis];
      return !Lt(v[t.axis]) || u > _ || h < _;
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
    this.update(t || "default"), a._clip = Ul(ot(this.options.clip, ql(a.xScale, a.yScale, this.getMaxOverflow())));
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
      o = i.$context || (i.$context = Jl(this.getContext(), t, i)), o.parsed = this.getParsed(t), o.raw = n.data[t], o.index = o.dataIndex = t;
    } else
      o = this.$context || (this.$context = Ql(this.chart.getContext(), this.index)), o.dataset = n, o.index = o.datasetIndex = this.index;
    return o.active = !!a, o.mode = s, o;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, a) {
    return this._resolveElementOptions(this.dataElementType.id, a, t);
  }
  _resolveElementOptions(t, a = "default", s) {
    const n = a === "active", o = this._cachedDataOpts, i = t + "-" + a, r = o[i], l = this.enableOptionSharing && ra(s);
    if (r)
      return Tn(r, l);
    const d = this.chart.config, u = d.datasetElementScopeKeys(this._type, t), h = n ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], f = d.getOptionScopes(this.getDataset(), u), v = Object.keys($t.elements[t]), g = () => this.getContext(s, n, a), _ = d.resolveNamedOptions(f, v, g, h);
    return _.$shared && (_.$shared = l, o[i] = Object.freeze(Tn(_, l))), _;
  }
  _resolveAnimations(t, a, s) {
    const n = this.chart, o = this._cachedDataOpts, i = `animation-${a}`, r = o[i];
    if (r)
      return r;
    let l;
    if (n.options.animation !== !1) {
      const u = this.chart.config, h = u.datasetAnimationScopeKeys(this._type, a), f = u.getOptionScopes(this.getDataset(), h);
      l = u.createResolver(f, this.getContext(t, s, a));
    }
    const d = new ci(n, l && l.animations);
    return l && l._cacheable && (o[i] = Object.freeze(d)), d;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, a) {
    return !a || ss(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, a) {
    const s = this.resolveDataElementOptions(t, a), n = this._sharedOptions, o = this.getSharedOptions(s), i = this.includeOptions(a, o) || o !== n;
    return this.updateSharedOptions(o, a, s), {
      sharedOptions: o,
      includeOptions: i
    };
  }
  updateElement(t, a, s, n) {
    ss(n) ? Object.assign(t, s) : this._resolveAnimations(a, n).update(t, s);
  }
  updateSharedOptions(t, a, s) {
    t && !ss(a) && this._resolveAnimations(void 0, a).update(t, s);
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
      s._stacked && He(s, n);
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
function ec(e, t) {
  if (!e._cache.$bar) {
    const a = e.getMatchingVisibleMetas(t);
    let s = [];
    for (let n = 0, o = a.length; n < o; n++)
      s = s.concat(a[n].controller.getAllParsedValues(e));
    e._cache.$bar = qo(s.sort((n, o) => n - o));
  }
  return e._cache.$bar;
}
function ac(e) {
  const t = e.iScale, a = ec(t, e.type);
  let s = t._length, n, o, i, r;
  const l = () => {
    i === 32767 || i === -32768 || (ra(r) && (s = Math.min(s, Math.abs(i - r) || s)), r = i);
  };
  for (n = 0, o = a.length; n < o; ++n)
    i = t.getPixelForValue(a[n]), l();
  for (r = void 0, n = 0, o = t.ticks.length; n < o; ++n)
    i = t.getPixelForTick(n), l();
  return s;
}
function sc(e, t, a, s) {
  const n = a.barThickness;
  let o, i;
  return pt(n) ? (o = t.min * a.categoryPercentage, i = a.barPercentage) : (o = n * s, i = 1), {
    chunk: o / s,
    ratio: i,
    start: t.pixels[e] - o / 2
  };
}
function nc(e, t, a, s) {
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
function oc(e, t, a, s) {
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
function ui(e, t, a, s) {
  return Mt(e) ? oc(e, t, a, s) : t[a.axis] = a.parse(e, s), t;
}
function Bn(e, t, a, s) {
  const n = e.iScale, o = e.vScale, i = n.getLabels(), r = n === o, l = [];
  let d, u, h, f;
  for (d = a, u = a + s; d < u; ++d)
    f = t[d], h = {}, h[n.axis] = r || n.parse(i[d], d), l.push(ui(f, h, o, d));
  return l;
}
function ns(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function ic(e, t, a) {
  return e !== 0 ? Gt(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= a ? 1 : -1);
}
function rc(e) {
  let t, a, s, n, o;
  return e.horizontal ? (t = e.base > e.x, a = "left", s = "right") : (t = e.base < e.y, a = "bottom", s = "top"), t ? (n = "end", o = "start") : (n = "start", o = "end"), {
    start: a,
    end: s,
    reverse: t,
    top: n,
    bottom: o
  };
}
function lc(e, t, a, s) {
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
  const { start: i, end: r, reverse: l, top: d, bottom: u } = rc(e);
  n === "middle" && a && (e.enableBorderRadius = !0, (a._top || 0) === s ? n = d : (a._bottom || 0) === s ? n = u : (o[Ln(u, i, r, l)] = !0, n = d)), o[Ln(n, i, r, l)] = !0, e.borderSkipped = o;
}
function Ln(e, t, a, s) {
  return s ? (e = cc(e, t, a), e = Fn(e, a, t)) : e = Fn(e, t, a), e;
}
function cc(e, t, a) {
  return e === t ? a : e === a ? t : e;
}
function Fn(e, t, a) {
  return e === "start" ? t : e === "end" ? a : e;
}
function dc(e, { inflateAmount: t }, a) {
  e.inflateAmount = t === "auto" ? a === 1 ? 0.33 : 0 : t;
}
class uc extends Ya {
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
    return Bn(t, a, s, n);
  }
  parseArrayData(t, a, s, n) {
    return Bn(t, a, s, n);
  }
  parseObjectData(t, a, s, n) {
    const { iScale: o, vScale: i } = t, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, d = o.axis === "x" ? r : l, u = i.axis === "x" ? r : l, h = [];
    let f, v, g, _;
    for (f = s, v = s + n; f < v; ++f)
      _ = a[f], g = {}, g[o.axis] = o.parse(Se(_, d), f), h.push(ui(Se(_, u), g, i, f));
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
    const a = this._cachedMeta, { iScale: s, vScale: n } = a, o = this.getParsed(t), i = o._custom, r = ns(i) ? "[" + i.start + ", " + i.end + "]" : "" + n.getLabelForValue(o[n.axis]);
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
    const o = n === "reset", { index: i, _cachedMeta: { vScale: r } } = this, l = r.getBasePixel(), d = r.isHorizontal(), u = this._getRuler(), { sharedOptions: h, includeOptions: f } = this._getSharedOptions(a, n);
    for (let v = a; v < a + s; v++) {
      const g = this.getParsed(v), _ = o || pt(g[r.axis]) ? {
        base: l,
        head: l
      } : this._calculateBarValuePixels(v), m = this._calculateBarIndexPixels(v, u), p = (g._stacks || {})[r.axis], b = {
        horizontal: d,
        base: _.base,
        enableBorderRadius: !p || ns(g._custom) || i === p._top || i === p._bottom,
        x: d ? _.head : m.center,
        y: d ? m.center : _.head,
        height: d ? m.size : Math.abs(_.size),
        width: d ? Math.abs(_.size) : m.size
      };
      f && (b.options = h || this.resolveDataElementOptions(v, t[v].active ? "active" : n));
      const $ = b.options || t[v].options;
      lc(b, $, p, i), dc(b, $, u.ratio), this.updateElement(t[v], v, b, n);
    }
  }
  _getStacks(t, a) {
    const { iScale: s } = this._cachedMeta, n = s.getMatchingVisibleMetas(this._type).filter((u) => u.controller.options.grouped), o = s.options.stacked, i = [], r = this._cachedMeta.controller.getParsed(a), l = r && r[s.axis], d = (u) => {
      const h = u._parsed.find((v) => v[s.axis] === l), f = h && h[u.vScale.axis];
      if (pt(f) || isNaN(f))
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
      min: r || ac(a),
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
    const { _cachedMeta: { vScale: a, _stacked: s, index: n }, options: { base: o, minBarLength: i } } = this, r = o || 0, l = this.getParsed(t), d = l._custom, u = ns(d);
    let h = l[a.axis], f = 0, v = s ? this.applyStack(a, l, s) : h, g, _;
    v !== h && (f = v - h, v = h), u && (h = d.barStart, v = d.barEnd - d.barStart, h !== 0 && Gt(h) !== Gt(d.barEnd) && (f = 0), f += h);
    const m = !pt(o) && !u ? o : f;
    let p = a.getPixelForValue(m);
    if (this.chart.getDataVisibility(t) ? g = a.getPixelForValue(f + v) : g = p, _ = g - p, Math.abs(_) < i) {
      _ = ic(_, a, r) * i, h === r && (p -= _ / 2);
      const b = a.getPixelForDecimal(0), $ = a.getPixelForDecimal(1), w = Math.min(b, $), k = Math.max(b, $);
      p = Math.max(Math.min(p, k), w), g = p + _, s && !u && (l._stacks[a.axis]._visualValues[n] = a.getValueForPixel(g) - a.getValueForPixel(p));
    }
    if (p === a.getPixelForValue(r)) {
      const b = Gt(_) * a.getLineWidthForValue(r) / 2;
      p += b, _ -= b;
    }
    return {
      size: _,
      base: p,
      head: g,
      center: g + _ / 2
    };
  }
  _calculateBarIndexPixels(t, a) {
    const s = a.scale, n = this.options, o = n.skipNull, i = ot(n.maxBarThickness, 1 / 0);
    let r, l;
    const d = this._getAxisCount();
    if (a.grouped) {
      const u = o ? this._getStackCount(t) : a.stackCount, h = n.barThickness === "flex" ? nc(t, a, n, u * d) : sc(t, a, n, u * d), f = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, v = this._getAxis().indexOf(ot(f, this.getFirstScaleIdForIndexAxis())), g = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0) + v;
      r = h.start + h.chunk * g + h.chunk / 2, l = Math.min(i, h.chunk * h.ratio);
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
function hc(e, t, a) {
  let s = 1, n = 1, o = 0, i = 0;
  if (t < yt) {
    const r = e, l = r + t, d = Math.cos(r), u = Math.sin(r), h = Math.cos(l), f = Math.sin(l), v = ($, w, k) => ca($, r, l, !0) ? 1 : Math.max(w, w * a, k, k * a), g = ($, w, k) => ca($, r, l, !0) ? -1 : Math.min(w, w * a, k, k * a), _ = v(0, d, h), m = v(Ct, u, f), p = g(bt, d, h), b = g(bt + Ct, u, f);
    s = (_ - p) / 2, n = (m - b) / 2, o = -(_ + p) / 2, i = -(m + b) / 2;
  }
  return {
    ratioX: s,
    ratioY: n,
    offsetX: o,
    offsetY: i
  };
}
class fc extends Ya {
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
      if (ut(s[t])) {
        const { key: l = "value" } = this._parsing;
        o = (d) => +Se(s[d], l);
      }
      let i, r;
      for (i = t, r = t + a; i < r; ++i)
        n._parsed[i] = o(i);
    }
  }
  _getRotation() {
    return ee(this.options.rotation - 90);
  }
  _getCircumference() {
    return ee(this.options.circumference);
  }
  _getRotationExtents() {
    let t = yt, a = -yt;
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
    const a = this.chart, { chartArea: s } = a, n = this._cachedMeta, o = n.data, i = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, r = Math.max((Math.min(s.width, s.height) - i) / 2, 0), l = Math.min(yr(this.options.cutout, r), 1), d = this._getRingWeight(this.index), { circumference: u, rotation: h } = this._getRotationExtents(), { ratioX: f, ratioY: v, offsetX: g, offsetY: _ } = hc(h, u, l), m = (s.width - i) / f, p = (s.height - i) / v, b = Math.max(Math.min(m, p) / 2, 0), $ = No(this.options.radius, b), w = Math.max($ * l, 0), k = ($ - w) / this._getVisibleDatasetWeightTotal();
    this.offsetX = g * $, this.offsetY = _ * $, n.total = this.calculateTotal(), this.outerRadius = $ - k * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - k * d, 0), this.updateElements(o, 0, o.length, t);
  }
  _circumference(t, a) {
    const s = this.options, n = this._cachedMeta, o = this._getCircumference();
    return a && s.animation.animateRotate || !this.chart.getDataVisibility(t) || n._parsed[t] === null || n.data[t].hidden ? 0 : this.calculateCircumference(n._parsed[t] * o / yt);
  }
  updateElements(t, a, s, n) {
    const o = n === "reset", i = this.chart, r = i.chartArea, d = i.options.animation, u = (r.left + r.right) / 2, h = (r.top + r.bottom) / 2, f = o && d.animateScale, v = f ? 0 : this.innerRadius, g = f ? 0 : this.outerRadius, { sharedOptions: _, includeOptions: m } = this._getSharedOptions(a, n);
    let p = this._getRotation(), b;
    for (b = 0; b < a; ++b)
      p += this._circumference(b, o);
    for (b = a; b < a + s; ++b) {
      const $ = this._circumference(b, o), w = t[b], k = {
        x: u + this.offsetX,
        y: h + this.offsetY,
        startAngle: p,
        endAngle: p + $,
        circumference: $,
        outerRadius: g,
        innerRadius: v
      };
      m && (k.options = _ || this.resolveDataElementOptions(b, w.active ? "active" : n)), p += $, this.updateElement(w, b, k, n);
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
    return a > 0 && !isNaN(t) ? yt * (Math.abs(t) / a) : 0;
  }
  getLabelAndValue(t) {
    const a = this._cachedMeta, s = this.chart, n = s.data.labels || [], o = Vs(a._parsed[t], s.options.locale);
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
class gc extends Ya {
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
    let { start: r, count: l } = zr(a, n, i);
    this._drawStart = r, this._drawCount = l, Vr(a) && (r = 0, l = n.length), s._chart = this.chart, s._datasetIndex = this.index, s._decimated = !!o._decimated, s.points = n;
    const d = this.resolveDatasetElementOptions(t);
    this.options.showLine || (d.borderWidth = 0), d.segment = this.options.segment, this.updateElement(s, void 0, {
      animated: !i,
      options: d
    }, t), this.updateElements(n, r, l, t);
  }
  updateElements(t, a, s, n) {
    const o = n === "reset", { iScale: i, vScale: r, _stacked: l, _dataset: d } = this._cachedMeta, { sharedOptions: u, includeOptions: h } = this._getSharedOptions(a, n), f = i.axis, v = r.axis, { spanGaps: g, segment: _ } = this.options, m = la(g) ? g : Number.POSITIVE_INFINITY, p = this.chart._animationsDisabled || o || n === "none", b = a + s, $ = t.length;
    let w = a > 0 && this.getParsed(a - 1);
    for (let k = 0; k < $; ++k) {
      const C = t[k], D = p ? C : {};
      if (k < a || k >= b) {
        D.skip = !0;
        continue;
      }
      const A = this.getParsed(k), P = pt(A[v]), R = D[f] = i.getPixelForValue(A[f], k), I = D[v] = o || P ? r.getBasePixel() : r.getPixelForValue(l ? this.applyStack(r, A, l) : A[v], k);
      D.skip = isNaN(R) || isNaN(I) || P, D.stop = k > 0 && Math.abs(A[f] - w[f]) > m, _ && (D.parsed = A, D.raw = d.data[k]), h && (D.options = u || this.resolveDataElementOptions(k, C.active ? "active" : n)), p || this.updateElement(C, k, D, n), w = A;
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
class pc extends fc {
  static id = "pie";
  static defaults = {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: "100%"
  };
}
function xe() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class Us {
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
    Object.assign(Us.prototype, t);
  }
  options;
  constructor(t) {
    this.options = t || {};
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return xe();
  }
  parse() {
    return xe();
  }
  format() {
    return xe();
  }
  add() {
    return xe();
  }
  diff() {
    return xe();
  }
  startOf() {
    return xe();
  }
  endOf() {
    return xe();
  }
}
var vc = {
  _date: Us
};
function bc(e, t, a, s) {
  const { controller: n, data: o, _sorted: i } = e, r = n._cachedMeta.iScale, l = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (r && t === r.axis && t !== "r" && i && o.length) {
    const d = r._reversePixels ? Pr : Me;
    if (s) {
      if (n._sharedOptions) {
        const u = o[0], h = typeof u.getRange == "function" && u.getRange(t);
        if (h) {
          const f = d(o, t, a - h), v = d(o, t, a + h);
          return {
            lo: f.lo,
            hi: v.hi
          };
        }
      }
    } else {
      const u = d(o, t, a);
      if (l) {
        const { vScale: h } = n._cachedMeta, { _parsed: f } = e, v = f.slice(0, u.lo + 1).reverse().findIndex((_) => !pt(_[h.axis]));
        u.lo -= Math.max(0, v);
        const g = f.slice(u.hi).findIndex((_) => !pt(_[h.axis]));
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
function qa(e, t, a, s, n) {
  const o = e.getSortedVisibleDatasetMetas(), i = a[t];
  for (let r = 0, l = o.length; r < l; ++r) {
    const { index: d, data: u } = o[r], { lo: h, hi: f } = bc(o[r], t, i, n);
    for (let v = h; v <= f; ++v) {
      const g = u[v];
      g.skip || s(g, d, v);
    }
  }
}
function mc(e) {
  const t = e.indexOf("x") !== -1, a = e.indexOf("y") !== -1;
  return function(s, n) {
    const o = t ? Math.abs(s.x - n.x) : 0, i = a ? Math.abs(s.y - n.y) : 0;
    return Math.sqrt(Math.pow(o, 2) + Math.pow(i, 2));
  };
}
function os(e, t, a, s, n) {
  const o = [];
  return !n && !e.isPointInArea(t) || qa(e, a, t, function(r, l, d) {
    !n && !da(r, e.chartArea, 0) || r.inRange(t.x, t.y, s) && o.push({
      element: r,
      datasetIndex: l,
      index: d
    });
  }, !0), o;
}
function yc(e, t, a, s) {
  let n = [];
  function o(i, r, l) {
    const { startAngle: d, endAngle: u } = i.getProps([
      "startAngle",
      "endAngle"
    ], s), { angle: h } = jo(i, {
      x: t.x,
      y: t.y
    });
    ca(h, d, u) && n.push({
      element: i,
      datasetIndex: r,
      index: l
    });
  }
  return qa(e, a, t, o), n;
}
function _c(e, t, a, s, n, o) {
  let i = [];
  const r = mc(a);
  let l = Number.POSITIVE_INFINITY;
  function d(u, h, f) {
    const v = u.inRange(t.x, t.y, n);
    if (s && !v)
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
  return qa(e, a, t, d), i;
}
function is(e, t, a, s, n, o) {
  return !o && !e.isPointInArea(t) ? [] : a === "r" && !s ? yc(e, t, a, n) : _c(e, t, a, s, n, o);
}
function Pn(e, t, a, s, n) {
  const o = [], i = a === "x" ? "inXRange" : "inYRange";
  let r = !1;
  return qa(e, a, t, (l, d, u) => {
    l[i] && l[i](t[a], n) && (o.push({
      element: l,
      datasetIndex: d,
      index: u
    }), r = r || l.inRange(t.x, t.y, n));
  }), s && !r ? [] : o;
}
var xc = {
  modes: {
    index(e, t, a, s) {
      const n = we(t, e), o = a.axis || "x", i = a.includeInvisible || !1, r = a.intersect ? os(e, n, o, s, i) : is(e, n, o, !1, s, i), l = [];
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
      const n = we(t, e), o = a.axis || "xy", i = a.includeInvisible || !1;
      let r = a.intersect ? os(e, n, o, s, i) : is(e, n, o, !1, s, i);
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
      const n = we(t, e), o = a.axis || "xy", i = a.includeInvisible || !1;
      return os(e, n, o, s, i);
    },
    nearest(e, t, a, s) {
      const n = we(t, e), o = a.axis || "xy", i = a.includeInvisible || !1;
      return is(e, n, o, a.intersect, s, i);
    },
    x(e, t, a, s) {
      const n = we(t, e);
      return Pn(e, n, "x", a.intersect, s);
    },
    y(e, t, a, s) {
      const n = we(t, e);
      return Pn(e, n, "y", a.intersect, s);
    }
  }
};
const hi = [
  "left",
  "top",
  "right",
  "bottom"
];
function je(e, t) {
  return e.filter((a) => a.pos === t);
}
function En(e, t) {
  return e.filter((a) => hi.indexOf(a.pos) === -1 && a.box.axis === t);
}
function Ye(e, t) {
  return e.sort((a, s) => {
    const n = t ? s : a, o = t ? a : s;
    return n.weight === o.weight ? n.index - o.index : n.weight - o.weight;
  });
}
function kc(e) {
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
function wc(e) {
  const t = {};
  for (const a of e) {
    const { stack: s, pos: n, stackWeight: o } = a;
    if (!s || !hi.includes(n))
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
function $c(e, t) {
  const a = wc(e), { vBoxMaxWidth: s, hBoxMaxHeight: n } = t;
  let o, i, r;
  for (o = 0, i = e.length; o < i; ++o) {
    r = e[o];
    const { fullSize: l } = r.box, d = a[r.stack], u = d && r.stackWeight / d.weight;
    r.horizontal ? (r.width = u ? u * s : l && t.availableWidth, r.height = n) : (r.width = s, r.height = u ? u * n : l && t.availableHeight);
  }
  return a;
}
function Mc(e) {
  const t = kc(e), a = Ye(t.filter((d) => d.box.fullSize), !0), s = Ye(je(t, "left"), !0), n = Ye(je(t, "right")), o = Ye(je(t, "top"), !0), i = Ye(je(t, "bottom")), r = En(t, "x"), l = En(t, "y");
  return {
    fullSize: a,
    leftAndTop: s.concat(o),
    rightAndBottom: n.concat(l).concat(i).concat(r),
    chartArea: je(t, "chartArea"),
    vertical: s.concat(n).concat(l),
    horizontal: o.concat(i).concat(r)
  };
}
function Rn(e, t, a, s) {
  return Math.max(e[a], t[a]) + Math.max(e[s], t[s]);
}
function fi(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function Cc(e, t, a, s) {
  const { pos: n, box: o } = a, i = e.maxPadding;
  if (!ut(n)) {
    a.size && (e[n] -= a.size);
    const h = s[a.stack] || {
      size: 0,
      count: 1
    };
    h.size = Math.max(h.size, a.horizontal ? o.height : o.width), a.size = h.size / h.count, e[n] += a.size;
  }
  o.getPadding && fi(i, o.getPadding());
  const r = Math.max(0, t.outerWidth - Rn(i, e, "left", "right")), l = Math.max(0, t.outerHeight - Rn(i, e, "top", "bottom")), d = r !== e.w, u = l !== e.h;
  return e.w = r, e.h = l, a.horizontal ? {
    same: d,
    other: u
  } : {
    same: u,
    other: d
  };
}
function Sc(e) {
  const t = e.maxPadding;
  function a(s) {
    const n = Math.max(t[s] - e[s], 0);
    return e[s] += n, n;
  }
  e.y += a("top"), e.x += a("left"), a("right"), a("bottom");
}
function Dc(e, t) {
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
function Qe(e, t, a, s) {
  const n = [];
  let o, i, r, l, d, u;
  for (o = 0, i = e.length, d = 0; o < i; ++o) {
    r = e[o], l = r.box, l.update(r.width || t.w, r.height || t.h, Dc(r.horizontal, t));
    const { same: h, other: f } = Cc(t, a, r, s);
    d |= h && n.length, u = u || f, l.fullSize || n.push(r);
  }
  return d && Qe(n, t, a, s) || u;
}
function $a(e, t, a, s, n) {
  e.top = a, e.left = t, e.right = t + s, e.bottom = a + n, e.width = s, e.height = n;
}
function In(e, t, a, s) {
  const n = a.padding;
  let { x: o, y: i } = t;
  for (const r of e) {
    const l = r.box, d = s[r.stack] || {
      placed: 0,
      weight: 1
    }, u = r.stackWeight / d.weight || 1;
    if (r.horizontal) {
      const h = t.w * u, f = d.size || l.height;
      ra(d.start) && (i = d.start), l.fullSize ? $a(l, n.left, i, a.outerWidth - n.right - n.left, f) : $a(l, t.left + d.placed, i, h, f), d.start = i, d.placed += h, i = l.bottom;
    } else {
      const h = t.h * u, f = d.size || l.width;
      ra(d.start) && (o = d.start), l.fullSize ? $a(l, o, n.top, f, a.outerHeight - n.bottom - n.top) : $a(l, o, t.top + d.placed, f, h), d.start = o, d.placed += h, o = l.right;
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
    const n = Yt(e.options.layout.padding), o = Math.max(t - n.width, 0), i = Math.max(a - n.height, 0), r = Mc(e.boxes), l = r.vertical, d = r.horizontal;
    vt(e.boxes, (_) => {
      typeof _.beforeLayout == "function" && _.beforeLayout();
    });
    const u = l.reduce((_, m) => m.box.options && m.box.options.display === !1 ? _ : _ + 1, 0) || 1, h = Object.freeze({
      outerWidth: t,
      outerHeight: a,
      padding: n,
      availableWidth: o,
      availableHeight: i,
      vBoxMaxWidth: o / 2 / u,
      hBoxMaxHeight: i / 2
    }), f = Object.assign({}, n);
    fi(f, Yt(s));
    const v = Object.assign({
      maxPadding: f,
      w: o,
      h: i,
      x: n.left,
      y: n.top
    }, n), g = $c(l.concat(d), h);
    Qe(r.fullSize, v, h, g), Qe(l, v, h, g), Qe(d, v, h, g) && Qe(l, v, h, g), Sc(v), In(r.leftAndTop, v, h, g), v.x += v.w, v.y += v.h, In(r.rightAndBottom, v, h, g), e.chartArea = {
      left: v.left,
      top: v.top,
      right: v.left + v.w,
      bottom: v.top + v.h,
      height: v.h,
      width: v.w
    }, vt(r.chartArea, (_) => {
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
class gi {
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
class Ac extends gi {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const Ta = "$chartjs", Tc = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, On = (e) => e === null || e === "";
function Bc(e, t) {
  const a = e.style, s = e.getAttribute("height"), n = e.getAttribute("width");
  if (e[Ta] = {
    initial: {
      height: s,
      width: n,
      style: {
        display: a.display,
        height: a.height,
        width: a.width
      }
    }
  }, a.display = a.display || "block", a.boxSizing = a.boxSizing || "border-box", On(n)) {
    const o = xn(e, "width");
    o !== void 0 && (e.width = o);
  }
  if (On(s))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const o = xn(e, "height");
      o !== void 0 && (e.height = o);
    }
  return e;
}
const pi = Al ? {
  passive: !0
} : !1;
function Lc(e, t, a) {
  e && e.addEventListener(t, a, pi);
}
function Fc(e, t, a) {
  e && e.canvas && e.canvas.removeEventListener(t, a, pi);
}
function Pc(e, t) {
  const a = Tc[e.type] || e.type, { x: s, y: n } = we(e, t);
  return {
    type: a,
    chart: t,
    native: e,
    x: s !== void 0 ? s : null,
    y: n !== void 0 ? n : null
  };
}
function Va(e, t) {
  for (const a of e)
    if (a === t || a.contains(t))
      return !0;
}
function Ec(e, t, a) {
  const s = e.canvas, n = new MutationObserver((o) => {
    let i = !1;
    for (const r of o)
      i = i || Va(r.addedNodes, s), i = i && !Va(r.removedNodes, s);
    i && a();
  });
  return n.observe(document, {
    childList: !0,
    subtree: !0
  }), n;
}
function Rc(e, t, a) {
  const s = e.canvas, n = new MutationObserver((o) => {
    let i = !1;
    for (const r of o)
      i = i || Va(r.removedNodes, s), i = i && !Va(r.addedNodes, s);
    i && a();
  });
  return n.observe(document, {
    childList: !0,
    subtree: !0
  }), n;
}
const ha = /* @__PURE__ */ new Map();
let zn = 0;
function vi() {
  const e = window.devicePixelRatio;
  e !== zn && (zn = e, ha.forEach((t, a) => {
    a.currentDevicePixelRatio !== e && t();
  }));
}
function Ic(e, t) {
  ha.size || window.addEventListener("resize", vi), ha.set(e, t);
}
function Oc(e) {
  ha.delete(e), ha.size || window.removeEventListener("resize", vi);
}
function zc(e, t, a) {
  const s = e.canvas, n = s && qs(s);
  if (!n)
    return;
  const o = Ko((r, l) => {
    const d = n.clientWidth;
    a(r, l), d < n.clientWidth && a();
  }, window), i = new ResizeObserver((r) => {
    const l = r[0], d = l.contentRect.width, u = l.contentRect.height;
    d === 0 && u === 0 || o(d, u);
  });
  return i.observe(n), Ic(e, o), i;
}
function rs(e, t, a) {
  a && a.disconnect(), t === "resize" && Oc(e);
}
function Vc(e, t, a) {
  const s = e.canvas, n = Ko((o) => {
    e.ctx !== null && a(Pc(o, e));
  }, e);
  return Lc(s, t, n), n;
}
class Nc extends gi {
  acquireContext(t, a) {
    const s = t && t.getContext && t.getContext("2d");
    return s && s.canvas === t ? (Bc(t, a), s) : null;
  }
  releaseContext(t) {
    const a = t.canvas;
    if (!a[Ta])
      return !1;
    const s = a[Ta].initial;
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
    }), a.width = a.width, delete a[Ta], !0;
  }
  addEventListener(t, a, s) {
    this.removeEventListener(t, a);
    const n = t.$proxies || (t.$proxies = {}), i = {
      attach: Ec,
      detach: Rc,
      resize: zc
    }[a] || Vc;
    n[a] = i(t, a, s);
  }
  removeEventListener(t, a) {
    const s = t.$proxies || (t.$proxies = {}), n = s[a];
    if (!n)
      return;
    ({
      attach: rs,
      detach: rs,
      resize: rs
    }[a] || Fc)(t, a, n), s[a] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, a, s, n) {
    return Dl(t, a, s, n);
  }
  isAttached(t) {
    const a = t && qs(t);
    return !!(a && a.isConnected);
  }
}
function Wc(e) {
  return !Ys() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? Ac : Nc;
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
    return la(this.x) && la(this.y);
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
function Hc(e, t) {
  const a = e.options.ticks, s = jc(e), n = Math.min(a.maxTicksLimit || s, s), o = a.major.enabled ? qc(t) : [], i = o.length, r = o[0], l = o[i - 1], d = [];
  if (i > n)
    return Uc(t, d, o, i / n), d;
  const u = Yc(o, t, n);
  if (i > 0) {
    let h, f;
    const v = i > 1 ? Math.round((l - r) / (i - 1)) : null;
    for (Ma(t, d, u, pt(v) ? 0 : r - v, r), h = 0, f = i - 1; h < f; h++)
      Ma(t, d, u, o[h], o[h + 1]);
    return Ma(t, d, u, l, pt(v) ? t.length : l + v), d;
  }
  return Ma(t, d, u), d;
}
function jc(e) {
  const t = e.options.offset, a = e._tickSize(), s = e._length / a + (t ? 0 : 1), n = e._maxLength / a;
  return Math.floor(Math.min(s, n));
}
function Yc(e, t, a) {
  const s = Kc(e), n = t.length / a;
  if (!s)
    return Math.max(n, 1);
  const o = Sr(s);
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
function Uc(e, t, a, s) {
  let n = 0, o = a[0], i;
  for (s = Math.ceil(s), i = 0; i < e.length; i++)
    i === o && (t.push(e[i]), n++, o = a[n * s]);
}
function Ma(e, t, a, s, n) {
  const o = ot(s, 0), i = Math.min(ot(n, e.length), e.length);
  let r = 0, l, d, u;
  for (a = Math.ceil(a), n && (l = n - s, a = l / Math.floor(l / a)), u = o; u < 0; )
    r++, u = Math.round(o + r * a);
  for (d = Math.max(o, 0); d < i; d++)
    d === u && (t.push(e[d]), r++, u = Math.round(o + r * a));
}
function Kc(e) {
  const t = e.length;
  let a, s;
  if (t < 2)
    return !1;
  for (s = e[0], a = 1; a < t; ++a)
    if (e[a] - e[a - 1] !== s)
      return !1;
  return s;
}
const Xc = (e) => e === "left" ? "right" : e === "right" ? "left" : e, Vn = (e, t, a) => t === "top" || t === "left" ? e[t] + a : e[t] - a, Nn = (e, t) => Math.min(t || e, e);
function Wn(e, t) {
  const a = [], s = e.length / t, n = e.length;
  let o = 0;
  for (; o < n; o += s)
    a.push(e[Math.floor(o)]);
  return a;
}
function Gc(e, t, a) {
  const s = e.ticks.length, n = Math.min(t, s - 1), o = e._startPixel, i = e._endPixel, r = 1e-6;
  let l = e.getPixelForTick(n), d;
  if (!(a && (s === 1 ? d = Math.max(l - o, i - l) : t === 0 ? d = (e.getPixelForTick(1) - l) / 2 : d = (l - e.getPixelForTick(n - 1)) / 2, l += n < t ? d : -d, l < o - r || l > i + r)))
    return l;
}
function Zc(e, t) {
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
function qe(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function Hn(e, t) {
  if (!e.display)
    return 0;
  const a = Bt(e.font, t), s = Yt(e.padding);
  return (Mt(e.text) ? e.text.length : 1) * a.lineHeight + s.height;
}
function Qc(e, t) {
  return Ae(e, {
    scale: t,
    type: "scale"
  });
}
function Jc(e, t, a) {
  return Ae(e, {
    tick: a,
    index: t,
    type: "tick"
  });
}
function td(e, t, a) {
  let s = Os(e);
  return (a && t !== "right" || !a && t === "right") && (s = Xc(s)), s;
}
function ed(e, t, a, s) {
  const { top: n, left: o, bottom: i, right: r, chart: l } = e, { chartArea: d, scales: u } = l;
  let h = 0, f, v, g;
  const _ = i - n, m = r - o;
  if (e.isHorizontal()) {
    if (v = Dt(s, o, r), ut(a)) {
      const p = Object.keys(a)[0], b = a[p];
      g = u[p].getPixelForValue(b) + _ - t;
    } else a === "center" ? g = (d.bottom + d.top) / 2 + _ - t : g = Vn(e, a, t);
    f = r - o;
  } else {
    if (ut(a)) {
      const p = Object.keys(a)[0], b = a[p];
      v = u[p].getPixelForValue(b) - m + t;
    } else a === "center" ? v = (d.left + d.right) / 2 - m + t : v = Vn(e, a, t);
    g = Dt(s, i, n), h = a === "left" ? -Ct : Ct;
  }
  return {
    titleX: v,
    titleY: g,
    maxWidth: f,
    rotation: h
  };
}
class Oe extends oe {
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
    return t = Ut(t, Number.POSITIVE_INFINITY), a = Ut(a, Number.NEGATIVE_INFINITY), s = Ut(s, Number.POSITIVE_INFINITY), n = Ut(n, Number.NEGATIVE_INFINITY), {
      min: Ut(t, s),
      max: Ut(a, n),
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
      min: Ut(a, Ut(s, a)),
      max: Ut(s, Ut(a, s))
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
    mt(this.options.beforeUpdate, [
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
    }, s), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + s.left + s.right : this.height + s.top + s.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = il(this, o, n), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const l = r < this.ticks.length;
    this._convertTicksToLabels(l ? Wn(this.ticks, r) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), i.display && (i.autoSkip || i.source === "auto") && (this.ticks = Hc(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), l && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, a, s;
    this.isHorizontal() ? (a = this.left, s = this.right) : (a = this.top, s = this.bottom, t = !t), this._startPixel = a, this._endPixel = s, this._reversePixels = t, this._length = s - a, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    mt(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    mt(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    mt(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), mt(this.options[t], [
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
    mt(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const a = this.options.ticks;
    let s, n, o;
    for (s = 0, n = t.length; s < n; s++)
      o = t[s], o.label = mt(a.callback, [
        o.value,
        s,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    mt(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    mt(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, a = t.ticks, s = Nn(this.ticks.length, t.ticks.maxTicksLimit), n = a.minRotation || 0, o = a.maxRotation;
    let i = n, r, l, d;
    if (!this._isVisible() || !a.display || n >= o || s <= 1 || !this.isHorizontal()) {
      this.labelRotation = n;
      return;
    }
    const u = this._getLabelSizes(), h = u.widest.width, f = u.highest.height, v = Tt(this.chart.width - h, 0, this.maxWidth);
    r = t.offset ? this.maxWidth / s : v / (s - 1), h + 6 > r && (r = v / (s - (t.offset ? 0.5 : 1)), l = this.maxHeight - qe(t.grid) - a.padding - Hn(t.title, this.chart.options.font), d = Math.sqrt(h * h + f * f), i = Br(Math.min(Math.asin(Tt((u.highest.height + 6) / r, -1, 1)), Math.asin(Tt(l / d, -1, 1)) - Math.asin(Tt(f / d, -1, 1)))), i = Math.max(n, Math.min(o, i))), this.labelRotation = i;
  }
  afterCalculateLabelRotation() {
    mt(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    mt(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: a, options: { ticks: s, title: n, grid: o } } = this, i = this._isVisible(), r = this.isHorizontal();
    if (i) {
      const l = Hn(n, a.options.font);
      if (r ? (t.width = this.maxWidth, t.height = qe(o) + l) : (t.height = this.maxHeight, t.width = qe(o) + l), s.display && this.ticks.length) {
        const { first: d, last: u, widest: h, highest: f } = this._getLabelSizes(), v = s.padding * 2, g = ee(this.labelRotation), _ = Math.cos(g), m = Math.sin(g);
        if (r) {
          const p = s.mirror ? 0 : m * h.width + _ * f.height;
          t.height = Math.min(this.maxHeight, t.height + p + v);
        } else {
          const p = s.mirror ? 0 : _ * h.width + m * f.height;
          t.width = Math.min(this.maxWidth, t.width + p + v);
        }
        this._calculatePadding(d, u, m, _);
      }
    }
    this._handleMargins(), r ? (this.width = this._length = a.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = a.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, a, s, n) {
    const { ticks: { align: o, padding: i }, position: r } = this.options, l = this.labelRotation !== 0, d = r !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const u = this.getPixelForTick(0) - this.left, h = this.right - this.getPixelForTick(this.ticks.length - 1);
      let f = 0, v = 0;
      l ? d ? (f = n * t.width, v = s * a.height) : (f = s * t.height, v = n * a.width) : o === "start" ? v = a.width : o === "end" ? f = t.width : o !== "inner" && (f = t.width / 2, v = a.width / 2), this.paddingLeft = Math.max((f - u + i) * this.width / (this.width - u), 0), this.paddingRight = Math.max((v - h + i) * this.width / (this.width - h), 0);
    } else {
      let u = a.height / 2, h = t.height / 2;
      o === "start" ? (u = 0, h = t.height) : o === "end" && (u = a.height, h = 0), this.paddingTop = u + i, this.paddingBottom = h + i;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    mt(this.options.afterFit, [
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
      a < s.length && (s = Wn(s, a)), this._labelSizes = t = this._computeLabelSizes(s, s.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, a, s) {
    const { ctx: n, _longestTextCache: o } = this, i = [], r = [], l = Math.floor(a / Nn(a, s));
    let d = 0, u = 0, h, f, v, g, _, m, p, b, $, w, k;
    for (h = 0; h < a; h += l) {
      if (g = t[h].label, _ = this._resolveTickFontOptions(h), n.font = m = _.string, p = o[m] = o[m] || {
        data: {},
        gc: []
      }, b = _.lineHeight, $ = w = 0, !pt(g) && !Mt(g))
        $ = vn(n, p.data, p.gc, $, g), w = b;
      else if (Mt(g))
        for (f = 0, v = g.length; f < v; ++f)
          k = g[f], !pt(k) && !Mt(k) && ($ = vn(n, p.data, p.gc, $, k), w += b);
      i.push($), r.push(w), d = Math.max($, d), u = Math.max(w, u);
    }
    Zc(o, a);
    const C = i.indexOf(d), D = r.indexOf(u), A = (P) => ({
      width: i[P] || 0,
      height: r[P] || 0
    });
    return {
      first: A(0),
      last: A(a - 1),
      widest: A(C),
      highest: A(D),
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
    return Fr(this._alignToPixels ? _e(this.chart, a, 0) : a);
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
      return s.$context || (s.$context = Jc(this.getContext(), t, s));
    }
    return this.$context || (this.$context = Qc(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, a = ee(this.labelRotation), s = Math.abs(Math.cos(a)), n = Math.abs(Math.sin(a)), o = this._getLabelSizes(), i = t.autoSkipPadding || 0, r = o ? o.widest.width + i : 0, l = o ? o.highest.height + i : 0;
    return this.isHorizontal() ? l * s > r * n ? r / s : l / n : l * n < r * s ? l / s : r / n;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const a = this.axis, s = this.chart, n = this.options, { grid: o, position: i, border: r } = n, l = o.offset, d = this.isHorizontal(), h = this.ticks.length + (l ? 1 : 0), f = qe(o), v = [], g = r.setContext(this.getContext()), _ = g.display ? g.width : 0, m = _ / 2, p = function(O) {
      return _e(s, O, _);
    };
    let b, $, w, k, C, D, A, P, R, I, V, q;
    if (i === "top")
      b = p(this.bottom), D = this.bottom - f, P = b - m, I = p(t.top) + m, q = t.bottom;
    else if (i === "bottom")
      b = p(this.top), I = t.top, q = p(t.bottom) - m, D = b + m, P = this.top + f;
    else if (i === "left")
      b = p(this.right), C = this.right - f, A = b - m, R = p(t.left) + m, V = t.right;
    else if (i === "right")
      b = p(this.left), R = t.left, V = p(t.right) - m, C = b + m, A = this.left + f;
    else if (a === "x") {
      if (i === "center")
        b = p((t.top + t.bottom) / 2 + 0.5);
      else if (ut(i)) {
        const O = Object.keys(i)[0], W = i[O];
        b = p(this.chart.scales[O].getPixelForValue(W));
      }
      I = t.top, q = t.bottom, D = b + m, P = D + f;
    } else if (a === "y") {
      if (i === "center")
        b = p((t.left + t.right) / 2);
      else if (ut(i)) {
        const O = Object.keys(i)[0], W = i[O];
        b = p(this.chart.scales[O].getPixelForValue(W));
      }
      C = b - m, A = C - f, R = t.left, V = t.right;
    }
    const L = ot(n.ticks.maxTicksLimit, h), F = Math.max(1, Math.ceil(h / L));
    for ($ = 0; $ < h; $ += F) {
      const O = this.getContext($), W = o.setContext(O), N = r.setContext(O), H = W.lineWidth, j = W.color, st = N.dash || [], J = N.dashOffset, X = W.tickWidth, ct = W.tickColor, wt = W.tickBorderDash || [], gt = W.tickBorderDashOffset;
      w = Gc(this, $, l), w !== void 0 && (k = _e(s, w, H), d ? C = A = R = V = k : D = P = I = q = k, v.push({
        tx1: C,
        ty1: D,
        tx2: A,
        ty2: P,
        x1: R,
        y1: I,
        x2: V,
        y2: q,
        width: H,
        color: j,
        borderDash: st,
        borderDashOffset: J,
        tickWidth: X,
        tickColor: ct,
        tickBorderDash: wt,
        tickBorderDashOffset: gt
      }));
    }
    return this._ticksLength = h, this._borderValue = b, v;
  }
  _computeLabelItems(t) {
    const a = this.axis, s = this.options, { position: n, ticks: o } = s, i = this.isHorizontal(), r = this.ticks, { align: l, crossAlign: d, padding: u, mirror: h } = o, f = qe(s.grid), v = f + u, g = h ? -u : v, _ = -ee(this.labelRotation), m = [];
    let p, b, $, w, k, C, D, A, P, R, I, V, q = "middle";
    if (n === "top")
      C = this.bottom - g, D = this._getXAxisLabelAlignment();
    else if (n === "bottom")
      C = this.top + g, D = this._getXAxisLabelAlignment();
    else if (n === "left") {
      const F = this._getYAxisLabelAlignment(f);
      D = F.textAlign, k = F.x;
    } else if (n === "right") {
      const F = this._getYAxisLabelAlignment(f);
      D = F.textAlign, k = F.x;
    } else if (a === "x") {
      if (n === "center")
        C = (t.top + t.bottom) / 2 + v;
      else if (ut(n)) {
        const F = Object.keys(n)[0], O = n[F];
        C = this.chart.scales[F].getPixelForValue(O) + v;
      }
      D = this._getXAxisLabelAlignment();
    } else if (a === "y") {
      if (n === "center")
        k = (t.left + t.right) / 2 - v;
      else if (ut(n)) {
        const F = Object.keys(n)[0], O = n[F];
        k = this.chart.scales[F].getPixelForValue(O);
      }
      D = this._getYAxisLabelAlignment(f).textAlign;
    }
    a === "y" && (l === "start" ? q = "top" : l === "end" && (q = "bottom"));
    const L = this._getLabelSizes();
    for (p = 0, b = r.length; p < b; ++p) {
      $ = r[p], w = $.label;
      const F = o.setContext(this.getContext(p));
      A = this.getPixelForTick(p) + o.labelOffset, P = this._resolveTickFontOptions(p), R = P.lineHeight, I = Mt(w) ? w.length : 1;
      const O = I / 2, W = F.color, N = F.textStrokeColor, H = F.textStrokeWidth;
      let j = D;
      i ? (k = A, D === "inner" && (p === b - 1 ? j = this.options.reverse ? "left" : "right" : p === 0 ? j = this.options.reverse ? "right" : "left" : j = "center"), n === "top" ? d === "near" || _ !== 0 ? V = -I * R + R / 2 : d === "center" ? V = -L.highest.height / 2 - O * R + R : V = -L.highest.height + R / 2 : d === "near" || _ !== 0 ? V = R / 2 : d === "center" ? V = L.highest.height / 2 - O * R : V = L.highest.height - I * R, h && (V *= -1), _ !== 0 && !F.showLabelBackdrop && (k += R / 2 * Math.sin(_))) : (C = A, V = (1 - I) * R / 2);
      let st;
      if (F.showLabelBackdrop) {
        const J = Yt(F.backdropPadding), X = L.heights[p], ct = L.widths[p];
        let wt = V - J.top, gt = 0 - J.left;
        switch (q) {
          case "middle":
            wt -= X / 2;
            break;
          case "bottom":
            wt -= X;
            break;
        }
        switch (D) {
          case "center":
            gt -= ct / 2;
            break;
          case "right":
            gt -= ct;
            break;
          case "inner":
            p === b - 1 ? gt -= ct : p > 0 && (gt -= ct / 2);
            break;
        }
        st = {
          left: gt,
          top: wt,
          width: ct + J.width,
          height: X + J.height,
          color: F.backdropColor
        };
      }
      m.push({
        label: w,
        font: P,
        textOffset: V,
        options: {
          rotation: _,
          color: W,
          strokeColor: N,
          strokeWidth: H,
          textAlign: j,
          textBaseline: q,
          translation: [
            k,
            C
          ],
          backdrop: st
        }
      });
    }
    return m;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: a } = this.options;
    if (-ee(this.labelRotation))
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
    let d, u, h, f;
    this.isHorizontal() ? (d = _e(t, this.left, i) - i / 2, u = _e(t, this.right, r) + r / 2, h = f = l) : (h = _e(t, this.top, i) - i / 2, f = _e(t, this.bottom, r) + r / 2, d = u = l), a.save(), a.lineWidth = o.width, a.strokeStyle = o.color, a.beginPath(), a.moveTo(d, h), a.lineTo(u, f), a.stroke(), a.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const s = this.ctx, n = this._computeLabelArea();
    n && Wa(s, n);
    const o = this.getLabelItems(t);
    for (const i of o) {
      const r = i.options, l = i.font, d = i.label, u = i.textOffset;
      ua(s, d, 0, u, l, r);
    }
    n && Ha(s);
  }
  drawTitle() {
    const { ctx: t, options: { position: a, title: s, reverse: n } } = this;
    if (!s.display)
      return;
    const o = Bt(s.font), i = Yt(s.padding), r = s.align;
    let l = o.lineHeight / 2;
    a === "bottom" || a === "center" || ut(a) ? (l += i.bottom, Mt(s.text) && (l += o.lineHeight * (s.text.length - 1))) : l += i.top;
    const { titleX: d, titleY: u, maxWidth: h, rotation: f } = ed(this, l, a, r);
    ua(t, s.text, 0, 0, o, {
      color: s.color,
      maxWidth: h,
      rotation: f,
      textAlign: td(r, a, n),
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
    return !this._isVisible() || this.draw !== Oe.prototype.draw ? [
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
class Ca {
  constructor(t, a, s) {
    this.type = t, this.scope = a, this.override = s, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const a = Object.getPrototypeOf(t);
    let s;
    nd(a) && (s = this.register(a));
    const n = this.items, o = t.id, i = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + t);
    return o in n || (n[o] = t, ad(t, i, s), this.override && $t.override(t.id, t.overrides)), i;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const a = this.items, s = t.id, n = this.scope;
    s in a && delete a[s], n && s in $t[n] && (delete $t[n][s], this.override && delete De[s]);
  }
}
function ad(e, t, a) {
  const s = ia(/* @__PURE__ */ Object.create(null), [
    a ? $t.get(a) : {},
    $t.get(t),
    e.defaults
  ]);
  $t.set(t, s), e.defaultRoutes && sd(t, e.defaultRoutes), e.descriptors && $t.describe(t, e.descriptors);
}
function sd(e, t) {
  Object.keys(t).forEach((a) => {
    const s = a.split("."), n = s.pop(), o = [
      e
    ].concat(s).join("."), i = t[a].split("."), r = i.pop(), l = i.join(".");
    $t.route(o, n, l, r);
  });
}
function nd(e) {
  return "id" in e && "defaults" in e;
}
class od {
  constructor() {
    this.controllers = new Ca(Ya, "datasets", !0), this.elements = new Ca(oe, "elements"), this.plugins = new Ca(Object, "plugins"), this.scales = new Ca(Oe, "scales"), this._typedRegistries = [
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
    const n = Rs(t);
    mt(s["before" + n], [], s), a[t](s), mt(s["after" + n], [], s);
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
var Xt = /* @__PURE__ */ new od();
class id {
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
      if (mt(r, l, i) === !1 && n.cancelable)
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
    const s = t && t.config, n = ot(s.options && s.options.plugins, {}), o = rd(s);
    return n === !1 && !a ? [] : cd(t, o, n, a);
  }
  _notifyStateChanges(t) {
    const a = this._oldCache || [], s = this._cache, n = (o, i) => o.filter((r) => !i.some((l) => r.plugin.id === l.plugin.id));
    this._notify(n(a, s), t, "stop"), this._notify(n(s, a), t, "start");
  }
}
function rd(e) {
  const t = {}, a = [], s = Object.keys(Xt.plugins.items);
  for (let o = 0; o < s.length; o++)
    a.push(Xt.getPlugin(s[o]));
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
function ld(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function cd(e, { plugins: t, localIds: a }, s, n) {
  const o = [], i = e.getContext();
  for (const r of t) {
    const l = r.id, d = ld(s[l], n);
    d !== null && o.push({
      plugin: r,
      options: dd(e.config, {
        plugin: r,
        local: a[l]
      }, d, i)
    });
  }
  return o;
}
function dd(e, { plugin: t, local: a }, s, n) {
  const o = e.pluginScopeKeys(t), i = e.getOptionScopes(s, o);
  return a && t.defaults && i.push(t.defaults), e.createResolver(i, n, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Ds(e, t) {
  const a = $t.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || a.indexAxis || "x";
}
function ud(e, t) {
  let a = e;
  return e === "_index_" ? a = t : e === "_value_" && (a = t === "x" ? "y" : "x"), a;
}
function hd(e, t) {
  return e === t ? "_index_" : "_value_";
}
function jn(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function fd(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function As(e, ...t) {
  if (jn(e))
    return e;
  for (const a of t) {
    const s = a.axis || fd(a.position) || e.length > 1 && jn(e[0].toLowerCase());
    if (s)
      return s;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function Yn(e, t, a) {
  if (a[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function gd(e, t) {
  if (t.data && t.data.datasets) {
    const a = t.data.datasets.filter((s) => s.xAxisID === e || s.yAxisID === e);
    if (a.length)
      return Yn(e, "x", a[0]) || Yn(e, "y", a[0]);
  }
  return {};
}
function pd(e, t) {
  const a = De[e.type] || {
    scales: {}
  }, s = t.scales || {}, n = Ds(e.type, t), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(s).forEach((i) => {
    const r = s[i];
    if (!ut(r))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (r._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const l = As(i, r, gd(i, e), $t.scales[r.type]), d = hd(l, n), u = a.scales || {};
    o[i] = ea(/* @__PURE__ */ Object.create(null), [
      {
        axis: l
      },
      r,
      u[l],
      u[d]
    ]);
  }), e.data.datasets.forEach((i) => {
    const r = i.type || e.type, l = i.indexAxis || Ds(r, t), u = (De[r] || {}).scales || {};
    Object.keys(u).forEach((h) => {
      const f = ud(h, l), v = i[f + "AxisID"] || f;
      o[v] = o[v] || /* @__PURE__ */ Object.create(null), ea(o[v], [
        {
          axis: f
        },
        s[v],
        u[h]
      ]);
    });
  }), Object.keys(o).forEach((i) => {
    const r = o[i];
    ea(r, [
      $t.scales[r.type],
      $t.scale
    ]);
  }), o;
}
function bi(e) {
  const t = e.options || (e.options = {});
  t.plugins = ot(t.plugins, {}), t.scales = pd(e, t);
}
function mi(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function vd(e) {
  return e = e || {}, e.data = mi(e.data), bi(e), e;
}
const qn = /* @__PURE__ */ new Map(), yi = /* @__PURE__ */ new Set();
function Sa(e, t) {
  let a = qn.get(e);
  return a || (a = t(), qn.set(e, a), yi.add(a)), a;
}
const Ue = (e, t, a) => {
  const s = Se(t, a);
  s !== void 0 && e.add(s);
};
class bd {
  constructor(t) {
    this._config = vd(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = mi(t);
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
    this.clearCache(), bi(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return Sa(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, a) {
    return Sa(`${t}.transition.${a}`, () => [
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
    return Sa(`${t}-${a}`, () => [
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
    return Sa(`${s}-plugin-${a}`, () => [
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
      t && (l.add(t), u.forEach((h) => Ue(l, t, h))), u.forEach((h) => Ue(l, n, h)), u.forEach((h) => Ue(l, De[o] || {}, h)), u.forEach((h) => Ue(l, $t, h)), u.forEach((h) => Ue(l, Cs, h));
    });
    const d = Array.from(l);
    return d.length === 0 && d.push(/* @__PURE__ */ Object.create(null)), yi.has(a) && i.set(a, d), d;
  }
  chartOptionScopes() {
    const { options: t, type: a } = this;
    return [
      t,
      De[a] || {},
      $t.datasets[a] || {},
      {
        type: a
      },
      $t,
      Cs
    ];
  }
  resolveNamedOptions(t, a, s, n = [
    ""
  ]) {
    const o = {
      $shared: !0
    }, { resolver: i, subPrefixes: r } = Un(this._resolverCache, t, n);
    let l = i;
    if (yd(i, a)) {
      o.$shared = !1, s = ge(s) ? s() : s;
      const d = this.createResolver(t, s, r);
      l = Re(i, s, d);
    }
    for (const d of a)
      o[d] = l[d];
    return o;
  }
  createResolver(t, a, s = [
    ""
  ], n) {
    const { resolver: o } = Un(this._resolverCache, t, s);
    return ut(a) ? Re(o, a, void 0, n) : o;
  }
}
function Un(e, t, a) {
  let s = e.get(t);
  s || (s = /* @__PURE__ */ new Map(), e.set(t, s));
  const n = a.join();
  let o = s.get(n);
  return o || (o = {
    resolver: Ws(t, a),
    subPrefixes: a.filter((r) => !r.toLowerCase().includes("hover"))
  }, s.set(n, o)), o;
}
const md = (e) => ut(e) && Object.getOwnPropertyNames(e).some((t) => ge(e[t]));
function yd(e, t) {
  const { isScriptable: a, isIndexable: s } = Qo(e);
  for (const n of t) {
    const o = a(n), i = s(n), r = (i || o) && e[n];
    if (o && (ge(r) || md(r)) || i && Mt(r))
      return !0;
  }
  return !1;
}
var _d = "4.5.1";
const xd = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function Kn(e, t) {
  return e === "top" || e === "bottom" || xd.indexOf(e) === -1 && t === "x";
}
function Xn(e, t) {
  return function(a, s) {
    return a[e] === s[e] ? a[t] - s[t] : a[e] - s[e];
  };
}
function Gn(e) {
  const t = e.chart, a = t.options.animation;
  t.notifyPlugins("afterRender"), mt(a && a.onComplete, [
    e
  ], t);
}
function kd(e) {
  const t = e.chart, a = t.options.animation;
  mt(a && a.onProgress, [
    e
  ], t);
}
function _i(e) {
  return Ys() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const Ba = {}, Zn = (e) => {
  const t = _i(e);
  return Object.values(Ba).filter((a) => a.canvas === t).pop();
};
function wd(e, t, a) {
  const s = Object.keys(e);
  for (const n of s) {
    const o = +n;
    if (o >= t) {
      const i = e[n];
      delete e[n], (a > 0 || o > t) && (e[o + a] = i);
    }
  }
}
function $d(e, t, a, s) {
  return !a || e.type === "mouseout" ? null : s ? t : e;
}
let ze = class {
  static defaults = $t;
  static instances = Ba;
  static overrides = De;
  static registry = Xt;
  static version = _d;
  static getChart = Zn;
  static register(...t) {
    Xt.add(...t), Qn();
  }
  static unregister(...t) {
    Xt.remove(...t), Qn();
  }
  constructor(t, a) {
    const s = this.config = new bd(a), n = _i(t), o = Zn(n);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const i = s.createResolver(s.chartOptionScopes(), this.getContext());
    this.platform = new (s.platform || Wc(n))(), this.platform.updateConfig(s);
    const r = this.platform.acquireContext(n, i.aspectRatio), l = r && r.canvas, d = l && l.height, u = l && l.width;
    if (this.id = mr(), this.ctx = r, this.canvas = l, this.width = u, this.height = d, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new id(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = Ir((h) => this.update(h), i.resizeDelay || 0), this._dataChanges = [], Ba[this.id] = this, !r || !l) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    Qt.listen(this, "complete", Gn), Qt.listen(this, "progress", kd), this._initialize(), this.attached && this.update();
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
    return Xt;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : _n(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return bn(this.canvas, this.ctx), this;
  }
  stop() {
    return Qt.stop(this), this;
  }
  resize(t, a) {
    Qt.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: a
    } : this._resize(t, a);
  }
  _resize(t, a) {
    const s = this.options, n = this.canvas, o = s.maintainAspectRatio && this.aspectRatio, i = this.platform.getMaximumSize(n, t, a, o), r = s.devicePixelRatio || this.platform.getDevicePixelRatio(), l = this.width ? "resize" : "attach";
    this.width = i.width, this.height = i.height, this._aspectRatio = this.aspectRatio, _n(this, r, !0) && (this.notifyPlugins("resize", {
      size: i
    }), mt(s.onResize, [
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
      const r = a[i], l = As(i, r), d = l === "r", u = l === "x";
      return {
        options: r,
        dposition: d ? "chartArea" : u ? "bottom" : "left",
        dtype: d ? "radialLinear" : u ? "category" : "linear"
      };
    }))), vt(o, (i) => {
      const r = i.options, l = r.id, d = As(l, r), u = ot(r.type, i.dtype);
      (r.position === void 0 || Kn(r.position, d) !== Kn(i.dposition)) && (r.position = i.dposition), n[l] = !0;
      let h = null;
      if (l in s && s[l].type === u)
        h = s[l];
      else {
        const f = Xt.getScale(u);
        h = new f({
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
    this._sortedMetasets = t.slice(0).sort(Xn("order", "index"));
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
      if (i.type && i.type !== r && (this._destroyDatasetMeta(s), i = this.getDatasetMeta(s)), i.type = r, i.indexAxis = o.indexAxis || Ds(r, this.options), i.order = o.order || 0, i.index = s, i.label = "" + o.label, i.visible = this.isDatasetVisible(s), i.controller)
        i.controller.updateIndex(s), i.controller.linkScales();
      else {
        const l = Xt.getController(r), { datasetElementType: d, dataElementType: u } = $t.datasets[r];
        Object.assign(l, {
          dataElementType: Xt.getElement(u),
          datasetElementType: d && Xt.getElement(d)
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
      const { controller: h } = this.getDatasetMeta(d), f = !n && o.indexOf(h) === -1;
      h.buildOrUpdateElements(f), i = Math.max(+h.getMaxOverflow(), i);
    }
    i = this._minPadding = s.layout.autoPadding ? i : 0, this._updateLayout(i), n || vt(o, (d) => {
      d.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(Xn("z", "_idx"));
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
    (!rn(a, s) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, a = this._getUniformDataChanges() || [];
    for (const { method: s, start: n, count: o } of a) {
      const i = s === "_removeElements" ? -o : o;
      wd(t, n, i);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const a = this.data.datasets.length, s = (o) => new Set(t.filter((i) => i[0] === o).map((i, r) => r + "," + i.splice(1).join(","))), n = s(0);
    for (let o = 1; o < a; o++)
      if (!rn(n, s(o)))
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
        this._updateDataset(a, ge(t) ? t({
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
    }) !== !1 && (Qt.has(this) ? this.attached && !Qt.running(this) && Qt.start(this) : (this.draw(), Gn({
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
    }, n = li(this, t);
    this.notifyPlugins("beforeDatasetDraw", s) !== !1 && (n && Wa(a, n), t.controller.draw(), n && Ha(a), s.cancelable = !1, this.notifyPlugins("afterDatasetDraw", s));
  }
  isPointInArea(t) {
    return da(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, a, s, n) {
    const o = xc.modes[a];
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
    return this.$context || (this.$context = Ae(null, {
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
    ra(a) ? (o.data[a].hidden = !s, this.update()) : (this.setDatasetVisibility(t, s), i.update(o, {
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
    for (this.stop(), Qt.remove(this), t = 0, a = this.data.datasets.length; t < a; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: a } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), bn(t, a), this.platform.releaseContext(a), this.canvas = null, this.ctx = null), delete Ba[this.id], this.notifyPlugins("afterDestroy");
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
    const { _active: n = [], options: o } = this, i = a, r = this._getActiveElements(t, n, s, i), l = $r(t), d = $d(t, this._lastEvent, s, l);
    s && (this._lastEvent = null, mt(o.onHover, [
      t,
      r,
      this
    ], this), l && mt(o.onClick, [
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
function Qn() {
  return vt(ze.instances, (e) => e._plugins.invalidate());
}
function Md(e, t, a) {
  const { startAngle: s, x: n, y: o, outerRadius: i, innerRadius: r, options: l } = t, { borderWidth: d, borderJoinStyle: u } = l, h = Math.min(d / i, zt(s - a));
  if (e.beginPath(), e.arc(n, o, i - d / 2, s + h / 2, a - h / 2), r > 0) {
    const f = Math.min(d / r, zt(s - a));
    e.arc(n, o, r + d / 2, a - f / 2, s + f / 2, !0);
  } else {
    const f = Math.min(d / 2, i * zt(s - a));
    if (u === "round")
      e.arc(n, o, f, a - bt / 2, s + bt / 2, !0);
    else if (u === "bevel") {
      const v = 2 * f * f, g = -v * Math.cos(a + bt / 2) + n, _ = -v * Math.sin(a + bt / 2) + o, m = v * Math.cos(s + bt / 2) + n, p = v * Math.sin(s + bt / 2) + o;
      e.lineTo(g, _), e.lineTo(m, p);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function Cd(e, t, a) {
  const { startAngle: s, pixelMargin: n, x: o, y: i, outerRadius: r, innerRadius: l } = t;
  let d = n / r;
  e.beginPath(), e.arc(o, i, r, s - d, a + d), l > n ? (d = n / l, e.arc(o, i, l, a + d, s - d, !0)) : e.arc(o, i, n, a + Ct, s - Ct), e.closePath(), e.clip();
}
function Sd(e) {
  return Ns(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function Dd(e, t, a, s) {
  const n = Sd(e.options.borderRadius), o = (a - t) / 2, i = Math.min(o, s * t / 2), r = (l) => {
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
function Le(e, t, a, s) {
  return {
    x: a + e * Math.cos(t),
    y: s + e * Math.sin(t)
  };
}
function Na(e, t, a, s, n, o) {
  const { x: i, y: r, startAngle: l, pixelMargin: d, innerRadius: u } = t, h = Math.max(t.outerRadius + s + a - d, 0), f = u > 0 ? u + s + a + d : 0;
  let v = 0;
  const g = n - l;
  if (s) {
    const F = u > 0 ? u - s : 0, O = h > 0 ? h - s : 0, W = (F + O) / 2, N = W !== 0 ? g * W / (W + s) : g;
    v = (g - N) / 2;
  }
  const _ = Math.max(1e-3, g * h - a / bt) / h, m = (g - _) / 2, p = l + m + v, b = n - m - v, { outerStart: $, outerEnd: w, innerStart: k, innerEnd: C } = Dd(t, f, h, b - p), D = h - $, A = h - w, P = p + $ / D, R = b - w / A, I = f + k, V = f + C, q = p + k / I, L = b - C / V;
  if (e.beginPath(), o) {
    const F = (P + R) / 2;
    if (e.arc(i, r, h, P, F), e.arc(i, r, h, F, R), w > 0) {
      const H = Le(A, R, i, r);
      e.arc(H.x, H.y, w, R, b + Ct);
    }
    const O = Le(V, b, i, r);
    if (e.lineTo(O.x, O.y), C > 0) {
      const H = Le(V, L, i, r);
      e.arc(H.x, H.y, C, b + Ct, L + Math.PI);
    }
    const W = (b - C / f + (p + k / f)) / 2;
    if (e.arc(i, r, f, b - C / f, W, !0), e.arc(i, r, f, W, p + k / f, !0), k > 0) {
      const H = Le(I, q, i, r);
      e.arc(H.x, H.y, k, q + Math.PI, p - Ct);
    }
    const N = Le(D, p, i, r);
    if (e.lineTo(N.x, N.y), $ > 0) {
      const H = Le(D, P, i, r);
      e.arc(H.x, H.y, $, p - Ct, P);
    }
  } else {
    e.moveTo(i, r);
    const F = Math.cos(P) * h + i, O = Math.sin(P) * h + r;
    e.lineTo(F, O);
    const W = Math.cos(R) * h + i, N = Math.sin(R) * h + r;
    e.lineTo(W, N);
  }
  e.closePath();
}
function Ad(e, t, a, s, n) {
  const { fullCircles: o, startAngle: i, circumference: r } = t;
  let l = t.endAngle;
  if (o) {
    Na(e, t, a, s, l, n);
    for (let d = 0; d < o; ++d)
      e.fill();
    isNaN(r) || (l = i + (r % yt || yt));
  }
  return Na(e, t, a, s, l, n), e.fill(), l;
}
function Td(e, t, a, s, n) {
  const { fullCircles: o, startAngle: i, circumference: r, options: l } = t, { borderWidth: d, borderJoinStyle: u, borderDash: h, borderDashOffset: f, borderRadius: v } = l, g = l.borderAlign === "inner";
  if (!d)
    return;
  e.setLineDash(h || []), e.lineDashOffset = f, g ? (e.lineWidth = d * 2, e.lineJoin = u || "round") : (e.lineWidth = d, e.lineJoin = u || "bevel");
  let _ = t.endAngle;
  if (o) {
    Na(e, t, a, s, _, n);
    for (let m = 0; m < o; ++m)
      e.stroke();
    isNaN(r) || (_ = i + (r % yt || yt));
  }
  g && Cd(e, t, _), l.selfJoin && _ - i >= bt && v === 0 && u !== "miter" && Md(e, t, _), o || (Na(e, t, a, s, _, n), e.stroke());
}
class Bd extends oe {
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
    ], s), { angle: o, distance: i } = jo(n, {
      x: t,
      y: a
    }), { startAngle: r, endAngle: l, innerRadius: d, outerRadius: u, circumference: h } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], s), f = (this.options.spacing + this.options.borderWidth) / 2, v = ot(h, l - r), g = ca(o, r, l) && r !== l, _ = v >= yt || g, m = ae(i, d + f, u + f);
    return _ && m;
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
    if (this.pixelMargin = a.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = s > yt ? Math.floor(s / yt) : 0, s === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const r = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(r) * n, Math.sin(r) * n);
    const l = 1 - Math.sin(Math.min(bt, s || 0)), d = n * l;
    t.fillStyle = a.backgroundColor, t.strokeStyle = a.borderColor, Ad(t, this, d, o, i), Td(t, this, d, o, i), t.restore();
  }
}
function xi(e, t, a = t) {
  e.lineCap = ot(a.borderCapStyle, t.borderCapStyle), e.setLineDash(ot(a.borderDash, t.borderDash)), e.lineDashOffset = ot(a.borderDashOffset, t.borderDashOffset), e.lineJoin = ot(a.borderJoinStyle, t.borderJoinStyle), e.lineWidth = ot(a.borderWidth, t.borderWidth), e.strokeStyle = ot(a.borderColor, t.borderColor);
}
function Ld(e, t, a) {
  e.lineTo(a.x, a.y);
}
function Fd(e) {
  return e.stepped ? Zr : e.tension || e.cubicInterpolationMode === "monotone" ? Qr : Ld;
}
function ki(e, t, a = {}) {
  const s = e.length, { start: n = 0, end: o = s - 1 } = a, { start: i, end: r } = t, l = Math.max(n, i), d = Math.min(o, r), u = n < i && o < i || n > r && o > r;
  return {
    count: s,
    start: l,
    loop: t.loop,
    ilen: d < l && !u ? s + d - l : d - l
  };
}
function Pd(e, t, a, s) {
  const { points: n, options: o } = t, { count: i, start: r, loop: l, ilen: d } = ki(n, a, s), u = Fd(o);
  let { move: h = !0, reverse: f } = s || {}, v, g, _;
  for (v = 0; v <= d; ++v)
    g = n[(r + (f ? d - v : v)) % i], !g.skip && (h ? (e.moveTo(g.x, g.y), h = !1) : u(e, _, g, f, o.stepped), _ = g);
  return l && (g = n[(r + (f ? d : 0)) % i], u(e, _, g, f, o.stepped)), !!l;
}
function Ed(e, t, a, s) {
  const n = t.points, { count: o, start: i, ilen: r } = ki(n, a, s), { move: l = !0, reverse: d } = s || {};
  let u = 0, h = 0, f, v, g, _, m, p;
  const b = (w) => (i + (d ? r - w : w)) % o, $ = () => {
    _ !== m && (e.lineTo(u, m), e.lineTo(u, _), e.lineTo(u, p));
  };
  for (l && (v = n[b(0)], e.moveTo(v.x, v.y)), f = 0; f <= r; ++f) {
    if (v = n[b(f)], v.skip)
      continue;
    const w = v.x, k = v.y, C = w | 0;
    C === g ? (k < _ ? _ = k : k > m && (m = k), u = (h * u + w) / ++h) : ($(), e.lineTo(w, k), g = C, h = 0, _ = m = k), p = k;
  }
  $();
}
function Ts(e) {
  const t = e.options, a = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !a ? Ed : Pd;
}
function Rd(e) {
  return e.stepped ? Tl : e.tension || e.cubicInterpolationMode === "monotone" ? Bl : $e;
}
function Id(e, t, a, s) {
  let n = t._path;
  n || (n = t._path = new Path2D(), t.path(n, a, s) && n.closePath()), xi(e, t.options), e.stroke(n);
}
function Od(e, t, a, s) {
  const { segments: n, options: o } = t, i = Ts(t);
  for (const r of n)
    xi(e, o, r.style), e.beginPath(), i(e, t, r, {
      start: a,
      end: a + s - 1
    }) && e.closePath(), e.stroke();
}
const zd = typeof Path2D == "function";
function Vd(e, t, a, s) {
  zd && !t.options.segment ? Id(e, t, a, s) : Od(e, t, a, s);
}
class Ua extends oe {
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
      kl(this._points, s, t, n, a), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = Il(this, this.options.segment));
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
    const s = this.options, n = t[a], o = this.points, i = ri(this, {
      property: a,
      start: n,
      end: n
    });
    if (!i.length)
      return;
    const r = [], l = Rd(s);
    let d, u;
    for (d = 0, u = i.length; d < u; ++d) {
      const { start: h, end: f } = i[d], v = o[h], g = o[f];
      if (v === g) {
        r.push(v);
        continue;
      }
      const _ = Math.abs((n - v[a]) / (g[a] - v[a])), m = l(v, g, _, s.stepped);
      m[a] = t[a], r.push(m);
    }
    return r.length === 1 ? r[0] : r;
  }
  pathSegment(t, a, s) {
    return Ts(this)(t, this, a, s);
  }
  path(t, a, s) {
    const n = this.segments, o = Ts(this);
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
    (this.points || []).length && o.borderWidth && (t.save(), Vd(t, this, s, n), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function Jn(e, t, a, s) {
  const n = e.options, { [a]: o } = e.getProps([
    a
  ], s);
  return Math.abs(t - o) < n.radius + n.hitRadius;
}
class Nd extends oe {
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
    return Jn(this, t, "x", a);
  }
  inYRange(t, a) {
    return Jn(this, t, "y", a);
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
    this.skip || s.radius < 0.1 || !da(this, a, this.size(s) / 2) || (t.strokeStyle = s.borderColor, t.lineWidth = s.borderWidth, t.fillStyle = s.backgroundColor, Ss(t, s, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function wi(e, t) {
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
function ue(e, t, a, s) {
  return e ? 0 : Tt(t, a, s);
}
function Wd(e, t, a) {
  const s = e.options.borderWidth, n = e.borderSkipped, o = Zo(s);
  return {
    t: ue(n.top, o.top, 0, a),
    r: ue(n.right, o.right, 0, t),
    b: ue(n.bottom, o.bottom, 0, a),
    l: ue(n.left, o.left, 0, t)
  };
}
function Hd(e, t, a) {
  const { enableBorderRadius: s } = e.getProps([
    "enableBorderRadius"
  ]), n = e.options.borderRadius, o = Pe(n), i = Math.min(t, a), r = e.borderSkipped, l = s || ut(n);
  return {
    topLeft: ue(!l || r.top || r.left, o.topLeft, 0, i),
    topRight: ue(!l || r.top || r.right, o.topRight, 0, i),
    bottomLeft: ue(!l || r.bottom || r.left, o.bottomLeft, 0, i),
    bottomRight: ue(!l || r.bottom || r.right, o.bottomRight, 0, i)
  };
}
function jd(e) {
  const t = wi(e), a = t.right - t.left, s = t.bottom - t.top, n = Wd(e, a / 2, s / 2), o = Hd(e, a / 2, s / 2);
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
function ls(e, t, a, s) {
  const n = t === null, o = a === null, r = e && !(n && o) && wi(e, s);
  return r && (n || ae(t, r.left, r.right)) && (o || ae(a, r.top, r.bottom));
}
function Yd(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function qd(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function cs(e, t, a = {}) {
  const s = e.x !== a.x ? -t : 0, n = e.y !== a.y ? -t : 0, o = (e.x + e.w !== a.x + a.w ? t : 0) - s, i = (e.y + e.h !== a.y + a.h ? t : 0) - n;
  return {
    x: e.x + s,
    y: e.y + n,
    w: e.w + o,
    h: e.h + i,
    radius: e.radius
  };
}
class Ud extends oe {
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
    const { inflateAmount: a, options: { borderColor: s, backgroundColor: n } } = this, { inner: o, outer: i } = jd(this), r = Yd(i.radius) ? Oa : qd;
    t.save(), (i.w !== o.w || i.h !== o.h) && (t.beginPath(), r(t, cs(i, a, o)), t.clip(), r(t, cs(o, -a, i)), t.fillStyle = s, t.fill("evenodd")), t.beginPath(), r(t, cs(o, a)), t.fillStyle = n, t.fill(), t.restore();
  }
  inRange(t, a, s) {
    return ls(this, t, a, s);
  }
  inXRange(t, a) {
    return ls(this, t, null, a);
  }
  inYRange(t, a) {
    return ls(this, null, t, a);
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
function Kd(e, t, a) {
  const s = e.segments, n = e.points, o = t.points, i = [];
  for (const r of s) {
    let { start: l, end: d } = r;
    d = Ka(l, d, n);
    const u = Bs(a, n[l], n[d], r.loop);
    if (!t.segments) {
      i.push({
        source: r,
        target: u,
        start: n[l],
        end: n[d]
      });
      continue;
    }
    const h = ri(t, u);
    for (const f of h) {
      const v = Bs(a, o[f.start], o[f.end], f.loop), g = ii(r, n, v);
      for (const _ of g)
        i.push({
          source: _,
          target: f,
          start: {
            [a]: to(u, v, "start", Math.max)
          },
          end: {
            [a]: to(u, v, "end", Math.min)
          }
        });
    }
  }
  return i;
}
function Bs(e, t, a, s) {
  if (s)
    return;
  let n = t[e], o = a[e];
  return e === "angle" && (n = zt(n), o = zt(o)), {
    property: e,
    start: n,
    end: o
  };
}
function Xd(e, t) {
  const { x: a = null, y: s = null } = e || {}, n = t.points, o = [];
  return t.segments.forEach(({ start: i, end: r }) => {
    r = Ka(i, r, n);
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
function Ka(e, t, a) {
  for (; t > e; t--) {
    const s = a[t];
    if (!isNaN(s.x) && !isNaN(s.y))
      break;
  }
  return t;
}
function to(e, t, a, s) {
  return e && t ? s(e[a], t[a]) : e ? e[a] : t ? t[a] : 0;
}
function $i(e, t) {
  let a = [], s = !1;
  return Mt(e) ? (s = !0, a = e) : a = Xd(e, t), a.length ? new Ua({
    points: a,
    options: {
      tension: 0
    },
    _loop: s,
    _fullLoop: s
  }) : null;
}
function eo(e) {
  return e && e.fill !== !1;
}
function Gd(e, t, a) {
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
function Zd(e, t, a) {
  const s = eu(e);
  if (ut(s))
    return isNaN(s.value) ? !1 : s;
  let n = parseFloat(s);
  return Lt(n) && Math.floor(n) === n ? Qd(s[0], t, n, a) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(s) >= 0 && s;
}
function Qd(e, t, a, s) {
  return (e === "-" || e === "+") && (a = t + a), a === t || a < 0 || a >= s ? !1 : a;
}
function Jd(e, t) {
  let a = null;
  return e === "start" ? a = t.bottom : e === "end" ? a = t.top : ut(e) ? a = t.getPixelForValue(e.value) : t.getBasePixel && (a = t.getBasePixel()), a;
}
function tu(e, t, a) {
  let s;
  return e === "start" ? s = a : e === "end" ? s = t.options.reverse ? t.min : t.max : ut(e) ? s = e.value : s = t.getBaseValue(), s;
}
function eu(e) {
  const t = e.options, a = t.fill;
  let s = ot(a && a.target, a);
  return s === void 0 && (s = !!t.backgroundColor), s === !1 || s === null ? !1 : s === !0 ? "origin" : s;
}
function au(e) {
  const { scale: t, index: a, line: s } = e, n = [], o = s.segments, i = s.points, r = su(t, a);
  r.push($i({
    x: null,
    y: t.bottom
  }, s));
  for (let l = 0; l < o.length; l++) {
    const d = o[l];
    for (let u = d.start; u <= d.end; u++)
      nu(n, i[u], r);
  }
  return new Ua({
    points: n,
    options: {}
  });
}
function su(e, t) {
  const a = [], s = e.getMatchingVisibleMetas("line");
  for (let n = 0; n < s.length; n++) {
    const o = s[n];
    if (o.index === t)
      break;
    o.hidden || a.unshift(o.dataset);
  }
  return a;
}
function nu(e, t, a) {
  const s = [];
  for (let n = 0; n < a.length; n++) {
    const o = a[n], { first: i, last: r, point: l } = ou(o, t, "x");
    if (!(!l || i && r)) {
      if (i)
        s.unshift(l);
      else if (e.push(l), !r)
        break;
    }
  }
  e.push(...s);
}
function ou(e, t, a) {
  const s = e.interpolate(t, a);
  if (!s)
    return {};
  const n = s[a], o = e.segments, i = e.points;
  let r = !1, l = !1;
  for (let d = 0; d < o.length; d++) {
    const u = o[d], h = i[u.start][a], f = i[u.end][a];
    if (ae(n, h, f)) {
      r = n === h, l = n === f;
      break;
    }
  }
  return {
    first: r,
    last: l,
    point: s
  };
}
class Mi {
  constructor(t) {
    this.x = t.x, this.y = t.y, this.radius = t.radius;
  }
  pathSegment(t, a, s) {
    const { x: n, y: o, radius: i } = this;
    return a = a || {
      start: 0,
      end: yt
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
function iu(e) {
  const { chart: t, fill: a, line: s } = e;
  if (Lt(a))
    return ru(t, a);
  if (a === "stack")
    return au(e);
  if (a === "shape")
    return !0;
  const n = lu(e);
  return n instanceof Mi ? n : $i(n, s);
}
function ru(e, t) {
  const a = e.getDatasetMeta(t);
  return a && e.isDatasetVisible(t) ? a.dataset : null;
}
function lu(e) {
  return (e.scale || {}).getPointPositionForValue ? du(e) : cu(e);
}
function cu(e) {
  const { scale: t = {}, fill: a } = e, s = Jd(a, t);
  if (Lt(s)) {
    const n = t.isHorizontal();
    return {
      x: n ? s : null,
      y: n ? null : s
    };
  }
  return null;
}
function du(e) {
  const { scale: t, fill: a } = e, s = t.options, n = t.getLabels().length, o = s.reverse ? t.max : t.min, i = tu(a, t, o), r = [];
  if (s.grid.circular) {
    const l = t.getPointPositionForValue(0, o);
    return new Mi({
      x: l.x,
      y: l.y,
      radius: t.getDistanceFromCenterForValue(i)
    });
  }
  for (let l = 0; l < n; ++l)
    r.push(t.getPointPositionForValue(l, i));
  return r;
}
function ds(e, t, a) {
  const s = iu(t), { chart: n, index: o, line: i, scale: r, axis: l } = t, d = i.options, u = d.fill, h = d.backgroundColor, { above: f = h, below: v = h } = u || {}, g = n.getDatasetMeta(o), _ = li(n, g);
  s && i.points.length && (Wa(e, a), uu(e, {
    line: i,
    target: s,
    above: f,
    below: v,
    area: a,
    scale: r,
    axis: l,
    clip: _
  }), Ha(e));
}
function uu(e, t) {
  const { line: a, target: s, above: n, below: o, area: i, scale: r, clip: l } = t, d = a._loop ? "angle" : t.axis;
  e.save();
  let u = o;
  o !== n && (d === "x" ? (ao(e, s, i.top), us(e, {
    line: a,
    target: s,
    color: n,
    scale: r,
    property: d,
    clip: l
  }), e.restore(), e.save(), ao(e, s, i.bottom)) : d === "y" && (so(e, s, i.left), us(e, {
    line: a,
    target: s,
    color: o,
    scale: r,
    property: d,
    clip: l
  }), e.restore(), e.save(), so(e, s, i.right), u = n)), us(e, {
    line: a,
    target: s,
    color: u,
    scale: r,
    property: d,
    clip: l
  }), e.restore();
}
function ao(e, t, a) {
  const { segments: s, points: n } = t;
  let o = !0, i = !1;
  e.beginPath();
  for (const r of s) {
    const { start: l, end: d } = r, u = n[l], h = n[Ka(l, d, n)];
    o ? (e.moveTo(u.x, u.y), o = !1) : (e.lineTo(u.x, a), e.lineTo(u.x, u.y)), i = !!t.pathSegment(e, r, {
      move: i
    }), i ? e.closePath() : e.lineTo(h.x, a);
  }
  e.lineTo(t.first().x, a), e.closePath(), e.clip();
}
function so(e, t, a) {
  const { segments: s, points: n } = t;
  let o = !0, i = !1;
  e.beginPath();
  for (const r of s) {
    const { start: l, end: d } = r, u = n[l], h = n[Ka(l, d, n)];
    o ? (e.moveTo(u.x, u.y), o = !1) : (e.lineTo(a, u.y), e.lineTo(u.x, u.y)), i = !!t.pathSegment(e, r, {
      move: i
    }), i ? e.closePath() : e.lineTo(a, h.y);
  }
  e.lineTo(a, t.first().y), e.closePath(), e.clip();
}
function us(e, t) {
  const { line: a, target: s, property: n, color: o, scale: i, clip: r } = t, l = Kd(a, s, n);
  for (const { source: d, target: u, start: h, end: f } of l) {
    const { style: { backgroundColor: v = o } = {} } = d, g = s !== !0;
    e.save(), e.fillStyle = v, hu(e, i, r, g && Bs(n, h, f)), e.beginPath();
    const _ = !!a.pathSegment(e, d);
    let m;
    if (g) {
      _ ? e.closePath() : no(e, s, f, n);
      const p = !!s.pathSegment(e, u, {
        move: _,
        reverse: !0
      });
      m = _ && p, m || no(e, s, h, n);
    }
    e.closePath(), e.fill(m ? "evenodd" : "nonzero"), e.restore();
  }
}
function hu(e, t, a, s) {
  const n = t.chart.chartArea, { property: o, start: i, end: r } = s || {};
  if (o === "x" || o === "y") {
    let l, d, u, h;
    o === "x" ? (l = i, d = n.top, u = r, h = n.bottom) : (l = n.left, d = i, u = n.right, h = r), e.beginPath(), a && (l = Math.max(l, a.left), u = Math.min(u, a.right), d = Math.max(d, a.top), h = Math.min(h, a.bottom)), e.rect(l, d, u - l, h - d), e.clip();
  }
}
function no(e, t, a, s) {
  const n = t.interpolate(a, s);
  n && e.lineTo(n.x, n.y);
}
var fu = {
  id: "filler",
  afterDatasetsUpdate(e, t, a) {
    const s = (e.data.datasets || []).length, n = [];
    let o, i, r, l;
    for (i = 0; i < s; ++i)
      o = e.getDatasetMeta(i), r = o.dataset, l = null, r && r.options && r instanceof Ua && (l = {
        visible: e.isDatasetVisible(i),
        index: i,
        fill: Zd(r, i, s),
        chart: e,
        axis: o.controller.options.indexAxis,
        scale: o.vScale,
        line: r
      }), o.$filler = l, n.push(l);
    for (i = 0; i < s; ++i)
      l = n[i], !(!l || l.fill === !1) && (l.fill = Gd(n, i, a.propagate));
  },
  beforeDraw(e, t, a) {
    const s = a.drawTime === "beforeDraw", n = e.getSortedVisibleDatasetMetas(), o = e.chartArea;
    for (let i = n.length - 1; i >= 0; --i) {
      const r = n[i].$filler;
      r && (r.line.updateControlPoints(o, r.axis), s && r.fill && ds(e.ctx, r, o));
    }
  },
  beforeDatasetsDraw(e, t, a) {
    if (a.drawTime !== "beforeDatasetsDraw")
      return;
    const s = e.getSortedVisibleDatasetMetas();
    for (let n = s.length - 1; n >= 0; --n) {
      const o = s[n].$filler;
      eo(o) && ds(e.ctx, o, e.chartArea);
    }
  },
  beforeDatasetDraw(e, t, a) {
    const s = t.meta.$filler;
    !eo(s) || a.drawTime !== "beforeDatasetDraw" || ds(e.ctx, s, e.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const oo = (e, t) => {
  let { boxHeight: a = t, boxWidth: s = t } = e;
  return e.usePointStyle && (a = Math.min(a, t), s = e.pointStyleWidth || Math.min(s, t)), {
    boxWidth: s,
    boxHeight: a,
    itemHeight: Math.max(t, a)
  };
}, gu = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class io extends oe {
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
    let a = mt(t.generateLabels, [
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
    const s = t.labels, n = Bt(s.font), o = n.size, i = this._computeTitleHeight(), { boxWidth: r, itemHeight: l } = oo(s, o);
    let d, u;
    a.font = n.string, this.isHorizontal() ? (d = this.maxWidth, u = this._fitRows(i, o, r, l) + 10) : (u = this.maxHeight, d = this._fitCols(i, n, r, l) + 10), this.width = Math.min(d, t.maxWidth || this.maxWidth), this.height = Math.min(u, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, a, s, n) {
    const { ctx: o, maxWidth: i, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], d = this.lineWidths = [
      0
    ], u = n + r;
    let h = t;
    o.textAlign = "left", o.textBaseline = "middle";
    let f = -1, v = -u;
    return this.legendItems.forEach((g, _) => {
      const m = s + a / 2 + o.measureText(g.text).width;
      (_ === 0 || d[d.length - 1] + m + 2 * r > i) && (h += u, d[d.length - (_ > 0 ? 0 : 1)] = 0, v += u, f++), l[_] = {
        left: 0,
        top: v,
        row: f,
        width: m,
        height: n
      }, d[d.length - 1] += m + r;
    }), h;
  }
  _fitCols(t, a, s, n) {
    const { ctx: o, maxHeight: i, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], d = this.columnSizes = [], u = i - t;
    let h = r, f = 0, v = 0, g = 0, _ = 0;
    return this.legendItems.forEach((m, p) => {
      const { itemWidth: b, itemHeight: $ } = pu(s, a, o, m, n);
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
    const t = this._computeTitleHeight(), { legendHitBoxes: a, options: { align: s, labels: { padding: n }, rtl: o } } = this, i = Ee(o, this.left, this.width);
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
      Wa(t, this), this._draw(), Ha(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: a, lineWidths: s, ctx: n } = this, { align: o, labels: i } = t, r = $t.color, l = Ee(t.rtl, this.left, this.width), d = Bt(i.font), { padding: u } = i, h = d.size, f = h / 2;
    let v;
    this.drawTitle(), n.textAlign = l.textAlign("left"), n.textBaseline = "middle", n.lineWidth = 0.5, n.font = d.string;
    const { boxWidth: g, boxHeight: _, itemHeight: m } = oo(i, h), p = function(C, D, A) {
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
        }, I = l.xPlus(C, g / 2), V = D + f;
        Go(n, R, I, V, i.pointStyleWidth && g);
      } else {
        const R = D + Math.max((h - _) / 2, 0), I = l.leftForLtr(C, g), V = Pe(A.borderRadius);
        n.beginPath(), Object.values(V).some((q) => q !== 0) ? Oa(n, {
          x: I,
          y: R,
          w: g,
          h: _,
          radius: V
        }) : n.rect(I, R, g, _), n.fill(), P !== 0 && n.stroke();
      }
      n.restore();
    }, b = function(C, D, A) {
      ua(n, A.text, C, D + m / 2, d, {
        strikethrough: A.hidden,
        textAlign: l.textAlign(A.textAlign)
      });
    }, $ = this.isHorizontal(), w = this._computeTitleHeight();
    $ ? v = {
      x: Dt(o, this.left + u, this.right - s[0]),
      y: this.top + u + w,
      line: 0
    } : v = {
      x: this.left + u,
      y: Dt(o, this.top + w + u, this.bottom - a[0].height),
      line: 0
    }, si(this.ctx, t.textDirection);
    const k = m + u;
    this.legendItems.forEach((C, D) => {
      n.strokeStyle = C.fontColor, n.fillStyle = C.fontColor;
      const A = n.measureText(C.text).width, P = l.textAlign(C.textAlign || (C.textAlign = i.textAlign)), R = g + f + A;
      let I = v.x, V = v.y;
      l.setWidth(this.width), $ ? D > 0 && I + R + u > this.right && (V = v.y += k, v.line++, I = v.x = Dt(o, this.left + u, this.right - s[v.line])) : D > 0 && V + k > this.bottom && (I = v.x = I + a[v.line].width + u, v.line++, V = v.y = Dt(o, this.top + w + u, this.bottom - a[v.line].height));
      const q = l.x(I);
      if (p(q, V, C), I = Or(P, I + g + f, $ ? I + R : this.right, t.rtl), b(l.x(I), V, C), $)
        v.x += R + u;
      else if (typeof C.text != "string") {
        const L = d.lineHeight;
        v.y += Ci(C, L) + u;
      } else
        v.y += k;
    }), ni(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, a = t.title, s = Bt(a.font), n = Yt(a.padding);
    if (!a.display)
      return;
    const o = Ee(t.rtl, this.left, this.width), i = this.ctx, r = a.position, l = s.size / 2, d = n.top + l;
    let u, h = this.left, f = this.width;
    if (this.isHorizontal())
      f = Math.max(...this.lineWidths), u = this.top + d, h = Dt(t.align, h, this.right - f);
    else {
      const g = this.columnSizes.reduce((_, m) => Math.max(_, m.height), 0);
      u = d + Dt(t.align, this.top, this.bottom - g - t.labels.padding - this._computeTitleHeight());
    }
    const v = Dt(r, h, h + f);
    i.textAlign = o.textAlign(Os(r)), i.textBaseline = "middle", i.strokeStyle = a.color, i.fillStyle = a.color, i.font = s.string, ua(i, a.text, v, u, s);
  }
  _computeTitleHeight() {
    const t = this.options.title, a = Bt(t.font), s = Yt(t.padding);
    return t.display ? a.lineHeight + s.height : 0;
  }
  _getLegendItemAt(t, a) {
    let s, n, o;
    if (ae(t, this.left, this.right) && ae(a, this.top, this.bottom)) {
      for (o = this.legendHitBoxes, s = 0; s < o.length; ++s)
        if (n = o[s], ae(t, n.left, n.left + n.width) && ae(a, n.top, n.top + n.height))
          return this.legendItems[s];
    }
    return null;
  }
  handleEvent(t) {
    const a = this.options;
    if (!mu(t.type, a))
      return;
    const s = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const n = this._hoveredItem, o = gu(n, s);
      n && !o && mt(a.onLeave, [
        t,
        n,
        this
      ], this), this._hoveredItem = s, s && !o && mt(a.onHover, [
        t,
        s,
        this
      ], this);
    } else s && mt(a.onClick, [
      t,
      s,
      this
    ], this);
  }
}
function pu(e, t, a, s, n) {
  const o = vu(s, e, t, a), i = bu(n, s, t.lineHeight);
  return {
    itemWidth: o,
    itemHeight: i
  };
}
function vu(e, t, a, s) {
  let n = e.text;
  return n && typeof n != "string" && (n = n.reduce((o, i) => o.length > i.length ? o : i)), t + a.size / 2 + s.measureText(n).width;
}
function bu(e, t, a) {
  let s = e;
  return typeof t.text != "string" && (s = Ci(t, a)), s;
}
function Ci(e, t) {
  const a = e.text ? e.text.length : 0;
  return t * a;
}
function mu(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var Ks = {
  id: "legend",
  _element: io,
  start(e, t, a) {
    const s = e.legend = new io({
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
class Si extends oe {
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
    ua(t, a.text, 0, 0, s, {
      color: a.color,
      maxWidth: l,
      rotation: d,
      textAlign: Os(a.align),
      textBaseline: "middle",
      translation: [
        i,
        r
      ]
    });
  }
}
function yu(e, t) {
  const a = new Si({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  jt.configure(e, a, t), jt.addBox(e, a), e.titleBlock = a;
}
var Di = {
  id: "title",
  _element: Si,
  start(e, t, a) {
    yu(e, a);
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
const Je = {
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
        const d = l.getCenterPoint(), u = Ms(t, d);
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
function Kt(e, t) {
  return t && (Mt(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function Jt(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function _u(e, t) {
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
function ro(e, t) {
  const a = e.chart.ctx, { body: s, footer: n, title: o } = e, { boxWidth: i, boxHeight: r } = t, l = Bt(t.bodyFont), d = Bt(t.titleFont), u = Bt(t.footerFont), h = o.length, f = n.length, v = s.length, g = Yt(t.padding);
  let _ = g.height, m = 0, p = s.reduce((w, k) => w + k.before.length + k.lines.length + k.after.length, 0);
  if (p += e.beforeBody.length + e.afterBody.length, h && (_ += h * d.lineHeight + (h - 1) * t.titleSpacing + t.titleMarginBottom), p) {
    const w = t.displayColors ? Math.max(r, l.lineHeight) : l.lineHeight;
    _ += v * w + (p - v) * l.lineHeight + (p - 1) * t.bodySpacing;
  }
  f && (_ += t.footerMarginTop + f * u.lineHeight + (f - 1) * t.footerSpacing);
  let b = 0;
  const $ = function(w) {
    m = Math.max(m, a.measureText(w).width + b);
  };
  return a.save(), a.font = d.string, vt(e.title, $), a.font = l.string, vt(e.beforeBody.concat(e.afterBody), $), b = t.displayColors ? i + 2 + t.boxPadding : 0, vt(s, (w) => {
    vt(w.before, $), vt(w.lines, $), vt(w.after, $);
  }), b = 0, a.font = u.string, vt(e.footer, $), a.restore(), m += g.width, {
    width: m,
    height: _
  };
}
function xu(e, t) {
  const { y: a, height: s } = t;
  return a < s / 2 ? "top" : a > e.height - s / 2 ? "bottom" : "center";
}
function ku(e, t, a, s) {
  const { x: n, width: o } = s, i = a.caretSize + a.caretPadding;
  if (e === "left" && n + o + i > t.width || e === "right" && n - o - i < 0)
    return !0;
}
function wu(e, t, a, s) {
  const { x: n, width: o } = a, { width: i, chartArea: { left: r, right: l } } = e;
  let d = "center";
  return s === "center" ? d = n <= (r + l) / 2 ? "left" : "right" : n <= o / 2 ? d = "left" : n >= i - o / 2 && (d = "right"), ku(d, e, t, a) && (d = "center"), d;
}
function lo(e, t, a) {
  const s = a.yAlign || t.yAlign || xu(e, a);
  return {
    xAlign: a.xAlign || t.xAlign || wu(e, t, a, s),
    yAlign: s
  };
}
function $u(e, t) {
  let { x: a, width: s } = e;
  return t === "right" ? a -= s : t === "center" && (a -= s / 2), a;
}
function Mu(e, t, a) {
  let { y: s, height: n } = e;
  return t === "top" ? s += a : t === "bottom" ? s -= n + a : s -= n / 2, s;
}
function co(e, t, a, s) {
  const { caretSize: n, caretPadding: o, cornerRadius: i } = e, { xAlign: r, yAlign: l } = a, d = n + o, { topLeft: u, topRight: h, bottomLeft: f, bottomRight: v } = Pe(i);
  let g = $u(t, r);
  const _ = Mu(t, l, d);
  return l === "center" ? r === "left" ? g += d : r === "right" && (g -= d) : r === "left" ? g -= Math.max(u, f) + n : r === "right" && (g += Math.max(h, v) + n), {
    x: Tt(g, 0, s.width - t.width),
    y: Tt(_, 0, s.height - t.height)
  };
}
function Da(e, t, a) {
  const s = Yt(a.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - s.right : e.x + s.left;
}
function uo(e) {
  return Kt([], Jt(e));
}
function Cu(e, t, a) {
  return Ae(e, {
    tooltip: t,
    tooltipItems: a,
    type: "tooltip"
  });
}
function ho(e, t) {
  const a = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return a ? e.override(a) : e;
}
const Ai = {
  beforeTitle: Zt,
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
  afterTitle: Zt,
  beforeBody: Zt,
  beforeLabel: Zt,
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
  afterLabel: Zt,
  afterBody: Zt,
  beforeFooter: Zt,
  footer: Zt,
  afterFooter: Zt
};
function Pt(e, t, a, s) {
  const n = e[t].call(a, s);
  return typeof n > "u" ? Ai[t].call(a, s) : n;
}
class fo extends oe {
  static positioners = Je;
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
    const a = this.chart, s = this.options.setContext(this.getContext()), n = s.enabled && a.options.animation && s.animations, o = new ci(this.chart, n);
    return n._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = Cu(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, a) {
    const { callbacks: s } = a, n = Pt(s, "beforeTitle", this, t), o = Pt(s, "title", this, t), i = Pt(s, "afterTitle", this, t);
    let r = [];
    return r = Kt(r, Jt(n)), r = Kt(r, Jt(o)), r = Kt(r, Jt(i)), r;
  }
  getBeforeBody(t, a) {
    return uo(Pt(a.callbacks, "beforeBody", this, t));
  }
  getBody(t, a) {
    const { callbacks: s } = a, n = [];
    return vt(t, (o) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, r = ho(s, o);
      Kt(i.before, Jt(Pt(r, "beforeLabel", this, o))), Kt(i.lines, Pt(r, "label", this, o)), Kt(i.after, Jt(Pt(r, "afterLabel", this, o))), n.push(i);
    }), n;
  }
  getAfterBody(t, a) {
    return uo(Pt(a.callbacks, "afterBody", this, t));
  }
  getFooter(t, a) {
    const { callbacks: s } = a, n = Pt(s, "beforeFooter", this, t), o = Pt(s, "footer", this, t), i = Pt(s, "afterFooter", this, t);
    let r = [];
    return r = Kt(r, Jt(n)), r = Kt(r, Jt(o)), r = Kt(r, Jt(i)), r;
  }
  _createItems(t) {
    const a = this._active, s = this.chart.data, n = [], o = [], i = [];
    let r = [], l, d;
    for (l = 0, d = a.length; l < d; ++l)
      r.push(_u(this.chart, a[l]));
    return t.filter && (r = r.filter((u, h, f) => t.filter(u, h, f, s))), t.itemSort && (r = r.sort((u, h) => t.itemSort(u, h, s))), vt(r, (u) => {
      const h = ho(t.callbacks, u);
      n.push(Pt(h, "labelColor", this, u)), o.push(Pt(h, "labelPointStyle", this, u)), i.push(Pt(h, "labelTextColor", this, u));
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
      const r = Je[s.position].call(this, n, this._eventPosition);
      i = this._createItems(s), this.title = this.getTitle(i, s), this.beforeBody = this.getBeforeBody(i, s), this.body = this.getBody(i, s), this.afterBody = this.getAfterBody(i, s), this.footer = this.getFooter(i, s);
      const l = this._size = ro(this, s), d = Object.assign({}, r, l), u = lo(this.chart, s, d), h = co(s, d, u, this.chart);
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
    const { xAlign: n, yAlign: o } = this, { caretSize: i, cornerRadius: r } = s, { topLeft: l, topRight: d, bottomLeft: u, bottomRight: h } = Pe(r), { x: f, y: v } = t, { width: g, height: _ } = a;
    let m, p, b, $, w, k;
    return o === "center" ? (w = v + _ / 2, n === "left" ? (m = f, p = m - i, $ = w + i, k = w - i) : (m = f + g, p = m + i, $ = w - i, k = w + i), b = m) : (n === "left" ? p = f + Math.max(l, u) + i : n === "right" ? p = f + g - Math.max(d, h) - i : p = this.caretX, o === "top" ? ($ = v, w = $ - i, m = p - i, b = p + i) : ($ = v + _, w = $ + i, m = p + i, b = p - i), k = $), {
      x1: m,
      x2: p,
      x3: b,
      y1: $,
      y2: w,
      y3: k
    };
  }
  drawTitle(t, a, s) {
    const n = this.title, o = n.length;
    let i, r, l;
    if (o) {
      const d = Ee(s.rtl, this.x, this.width);
      for (t.x = Da(this, s.titleAlign, s), a.textAlign = d.textAlign(s.titleAlign), a.textBaseline = "middle", i = Bt(s.titleFont), r = s.titleSpacing, a.fillStyle = s.titleColor, a.font = i.string, l = 0; l < o; ++l)
        a.fillText(n[l], d.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + r, l + 1 === o && (t.y += s.titleMarginBottom - r);
    }
  }
  _drawColorBox(t, a, s, n, o) {
    const i = this.labelColors[s], r = this.labelPointStyles[s], { boxHeight: l, boxWidth: d } = o, u = Bt(o.bodyFont), h = Da(this, "left", o), f = n.x(h), v = l < u.lineHeight ? (u.lineHeight - l) / 2 : 0, g = a.y + v;
    if (o.usePointStyle) {
      const _ = {
        radius: Math.min(d, l) / 2,
        pointStyle: r.pointStyle,
        rotation: r.rotation,
        borderWidth: 1
      }, m = n.leftForLtr(f, d) + d / 2, p = g + l / 2;
      t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, Ss(t, _, m, p), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, Ss(t, _, m, p);
    } else {
      t.lineWidth = ut(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const _ = n.leftForLtr(f, d), m = n.leftForLtr(n.xPlus(f, 1), d - 2), p = Pe(i.borderRadius);
      Object.values(p).some((b) => b !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, Oa(t, {
        x: _,
        y: g,
        w: d,
        h: l,
        radius: p
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), Oa(t, {
        x: m,
        y: g + 1,
        w: d - 2,
        h: l - 2,
        radius: p
      }), t.fill()) : (t.fillStyle = o.multiKeyBackground, t.fillRect(_, g, d, l), t.strokeRect(_, g, d, l), t.fillStyle = i.backgroundColor, t.fillRect(m, g + 1, d - 2, l - 2));
    }
    t.fillStyle = this.labelTextColors[s];
  }
  drawBody(t, a, s) {
    const { body: n } = this, { bodySpacing: o, bodyAlign: i, displayColors: r, boxHeight: l, boxWidth: d, boxPadding: u } = s, h = Bt(s.bodyFont);
    let f = h.lineHeight, v = 0;
    const g = Ee(s.rtl, this.x, this.width), _ = function(A) {
      a.fillText(A, g.x(t.x + v), t.y + f / 2), t.y += f + o;
    }, m = g.textAlign(i);
    let p, b, $, w, k, C, D;
    for (a.textAlign = i, a.textBaseline = "middle", a.font = h.string, t.x = Da(this, m, s), a.fillStyle = s.bodyColor, vt(this.beforeBody, _), v = r && m !== "right" ? i === "center" ? d / 2 + u : d + 2 + u : 0, w = 0, C = n.length; w < C; ++w) {
      for (p = n[w], b = this.labelTextColors[w], a.fillStyle = b, vt(p.before, _), $ = p.lines, r && $.length && (this._drawColorBox(a, t, w, g, s), f = Math.max(h.lineHeight, l)), k = 0, D = $.length; k < D; ++k)
        _($[k]), f = h.lineHeight;
      vt(p.after, _);
    }
    v = 0, f = h.lineHeight, vt(this.afterBody, _), t.y -= o;
  }
  drawFooter(t, a, s) {
    const n = this.footer, o = n.length;
    let i, r;
    if (o) {
      const l = Ee(s.rtl, this.x, this.width);
      for (t.x = Da(this, s.footerAlign, s), t.y += s.footerMarginTop, a.textAlign = l.textAlign(s.footerAlign), a.textBaseline = "middle", i = Bt(s.footerFont), a.fillStyle = s.footerColor, a.font = i.string, r = 0; r < o; ++r)
        a.fillText(n[r], l.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + s.footerSpacing;
    }
  }
  drawBackground(t, a, s, n) {
    const { xAlign: o, yAlign: i } = this, { x: r, y: l } = t, { width: d, height: u } = s, { topLeft: h, topRight: f, bottomLeft: v, bottomRight: g } = Pe(n.cornerRadius);
    a.fillStyle = n.backgroundColor, a.strokeStyle = n.borderColor, a.lineWidth = n.borderWidth, a.beginPath(), a.moveTo(r + h, l), i === "top" && this.drawCaret(t, a, s, n), a.lineTo(r + d - f, l), a.quadraticCurveTo(r + d, l, r + d, l + f), i === "center" && o === "right" && this.drawCaret(t, a, s, n), a.lineTo(r + d, l + u - g), a.quadraticCurveTo(r + d, l + u, r + d - g, l + u), i === "bottom" && this.drawCaret(t, a, s, n), a.lineTo(r + v, l + u), a.quadraticCurveTo(r, l + u, r, l + u - v), i === "center" && o === "left" && this.drawCaret(t, a, s, n), a.lineTo(r, l + h), a.quadraticCurveTo(r, l, r + h, l), a.closePath(), a.fill(), n.borderWidth > 0 && a.stroke();
  }
  _updateAnimationTarget(t) {
    const a = this.chart, s = this.$animations, n = s && s.x, o = s && s.y;
    if (n || o) {
      const i = Je[t.position].call(this, this._active, this._eventPosition);
      if (!i)
        return;
      const r = this._size = ro(this, t), l = Object.assign({}, i, this._size), d = lo(a, t, l), u = co(t, l, d, a);
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
    a.enabled && r && (t.save(), t.globalAlpha = s, this.drawBackground(o, t, n, a), si(t, a.textDirection), o.y += i.top, this.drawTitle(o, t, a), this.drawBody(o, t, a), this.drawFooter(o, t, a), ni(t, a.textDirection), t.restore());
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
    const { caretX: s, caretY: n, options: o } = this, i = Je[o.position].call(this, t, a);
    return i !== !1 && (s !== i.x || n !== i.y);
  }
}
var Xs = {
  id: "tooltip",
  _element: fo,
  positioners: Je,
  afterInit(e, t, a) {
    a && (e.tooltip = new fo({
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
    callbacks: Ai
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
const Su = (e, t, a, s) => (typeof t == "string" ? (a = e.push(t) - 1, s.unshift({
  index: a,
  label: t
})) : isNaN(t) && (a = null), a);
function Du(e, t, a, s) {
  const n = e.indexOf(t);
  if (n === -1)
    return Su(e, t, a, s);
  const o = e.lastIndexOf(t);
  return n !== o ? a : n;
}
const Au = (e, t) => e === null ? null : Tt(Math.round(e), 0, t);
function go(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class Ti extends Oe {
  static id = "category";
  static defaults = {
    ticks: {
      callback: go
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
    return a = isFinite(a) && s[a] === t ? a : Du(s, t, ot(a, t), this._addedLabels), Au(a, s.length - 1);
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
    return go.call(this, t);
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
function Tu(e, t) {
  const a = [], { bounds: n, step: o, min: i, max: r, precision: l, count: d, maxTicks: u, maxDigits: h, includeBounds: f } = e, v = o || 1, g = u - 1, { min: _, max: m } = t, p = !pt(i), b = !pt(r), $ = !pt(d), w = (m - _) / (h + 1);
  let k = cn((m - _) / g / v) * v, C, D, A, P;
  if (k < 1e-14 && !p && !b)
    return [
      {
        value: _
      },
      {
        value: m
      }
    ];
  P = Math.ceil(m / k) - Math.floor(_ / k), P > g && (k = cn(P * k / g / v) * v), pt(l) || (C = Math.pow(10, l), k = Math.ceil(k * C) / C), n === "ticks" ? (D = Math.floor(_ / k) * k, A = Math.ceil(m / k) * k) : (D = _, A = m), p && b && o && Ar((r - i) / o, k / 1e3) ? (P = Math.round(Math.min((r - i) / k, u)), k = (r - i) / P, D = i, A = r) : $ ? (D = p ? i : D, A = b ? r : A, P = d - 1, k = (A - D) / P) : (P = (A - D) / k, aa(P, Math.round(P), k / 1e3) ? P = Math.round(P) : P = Math.ceil(P));
  const R = Math.max(dn(k), dn(D));
  C = Math.pow(10, pt(l) ? R : l), D = Math.round(D * C) / C, A = Math.round(A * C) / C;
  let I = 0;
  for (p && (f && D !== i ? (a.push({
    value: i
  }), D < i && I++, aa(Math.round((D + I * k) * C) / C, i, po(i, w, e)) && I++) : D < i && I++); I < P; ++I) {
    const V = Math.round((D + I * k) * C) / C;
    if (b && V > r)
      break;
    a.push({
      value: V
    });
  }
  return b && f && A !== r ? a.length && aa(a[a.length - 1].value, r, po(r, w, e)) ? a[a.length - 1].value = r : a.push({
    value: r
  }) : (!b || A === r) && a.push({
    value: A
  }), a;
}
function po(e, t, { horizontal: a, minRotation: s }) {
  const n = ee(s), o = (a ? Math.sin(n) : Math.cos(n)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / o, i);
}
class Bu extends Oe {
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
      const l = Gt(n), d = Gt(o);
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
    }, o = this._range || this, i = Tu(n, o);
    return t.bounds === "ticks" && Tr(i, this, "value"), t.reverse ? (i.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), i;
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
    return Vs(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class Bi extends Bu {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: Xo.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: a } = this.getMinMax(!0);
    this.min = Lt(t) ? t : 0, this.max = Lt(a) ? a : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), a = t ? this.width : this.height, s = ee(this.options.ticks.minRotation), n = (t ? Math.sin(s) : Math.cos(s)) || 1e-3, o = this._resolveTickFontOptions(0);
    return Math.ceil(a / Math.min(40, o.lineHeight / n));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
const Xa = {
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
}, Et = /* @__PURE__ */ Object.keys(Xa);
function vo(e, t) {
  return e - t;
}
function bo(e, t) {
  if (pt(t))
    return null;
  const a = e._adapter, { parser: s, round: n, isoWeekday: o } = e._parseOpts;
  let i = t;
  return typeof s == "function" && (i = s(i)), Lt(i) || (i = typeof s == "string" ? a.parse(i, s) : a.parse(i)), i === null ? null : (n && (i = n === "week" && (la(o) || o === !0) ? a.startOf(i, "isoWeek", o) : a.startOf(i, n)), +i);
}
function mo(e, t, a, s) {
  const n = Et.length;
  for (let o = Et.indexOf(e); o < n - 1; ++o) {
    const i = Xa[Et[o]], r = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((a - t) / (r * i.size)) <= s)
      return Et[o];
  }
  return Et[n - 1];
}
function Lu(e, t, a, s, n) {
  for (let o = Et.length - 1; o >= Et.indexOf(a); o--) {
    const i = Et[o];
    if (Xa[i].common && e._adapter.diff(n, s, i) >= t - 1)
      return i;
  }
  return Et[a ? Et.indexOf(a) : 0];
}
function Fu(e) {
  for (let t = Et.indexOf(e) + 1, a = Et.length; t < a; ++t)
    if (Xa[Et[t]].common)
      return Et[t];
}
function yo(e, t, a) {
  if (!a)
    e[t] = !0;
  else if (a.length) {
    const { lo: s, hi: n } = Is(a, t), o = a[s] >= t ? a[s] : a[n];
    e[o] = !0;
  }
}
function Pu(e, t, a, s) {
  const n = e._adapter, o = +n.startOf(t[0].value, s), i = t[t.length - 1].value;
  let r, l;
  for (r = o; r <= i; r = +n.add(r, 1, s))
    l = a[r], l >= 0 && (t[l].major = !0);
  return t;
}
function _o(e, t, a) {
  const s = [], n = {}, o = t.length;
  let i, r;
  for (i = 0; i < o; ++i)
    r = t[i], n[r] = i, s.push({
      value: r,
      major: !1
    });
  return o === 0 || !a ? s : Pu(e, s, n, a);
}
class xo extends Oe {
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
    const s = t.time || (t.time = {}), n = this._adapter = new vc._date(t.adapters.date);
    n.init(a), ea(s.displayFormats, n.formats()), this._parseOpts = {
      parser: s.parser,
      round: s.round,
      isoWeekday: s.isoWeekday
    }, super.init(t), this._normalized = a.normalized;
  }
  parse(t, a) {
    return t === void 0 ? null : bo(this, t);
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
    const o = this.min, i = this.max, r = Er(n, o, i);
    return this._unit = a.unit || (s.autoSkip ? mo(a.minUnit, this.min, this.max, this._getLabelCapacity(o)) : Lu(this, r.length, a.minUnit, this.min, this.max)), this._majorUnit = !s.major.enabled || this._unit === "year" ? void 0 : Fu(this._unit), this.initOffsets(n), t.reverse && r.reverse(), _o(this, r, this._majorUnit);
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
    const t = this._adapter, a = this.min, s = this.max, n = this.options, o = n.time, i = o.unit || mo(o.minUnit, a, s, this._getLabelCapacity(a)), r = ot(n.ticks.stepSize, 1), l = i === "week" ? o.isoWeekday : !1, d = la(l) || l === !0, u = {};
    let h = a, f, v;
    if (d && (h = +t.startOf(h, "isoWeek", l)), h = +t.startOf(h, d ? "day" : i), t.diff(s, a, i) > 1e5 * r)
      throw new Error(a + " and " + s + " are too far apart with stepSize of " + r + " " + i);
    const g = n.ticks.source === "data" && this.getDataTimestamps();
    for (f = h, v = 0; f < s; f = +t.add(f, r, i), v++)
      yo(u, f, g);
    return (f === s || n.bounds === "ticks" || v === 1) && yo(u, f, g), Object.keys(u).sort(vo).map((_) => +_);
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
      return mt(i, [
        t,
        a,
        s
      ], this);
    const r = o.time.displayFormats, l = this._unit, d = this._majorUnit, u = l && r[l], h = d && r[d], f = s[a], v = d && h && f && f.major;
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
    const a = this.options.ticks, s = this.ctx.measureText(t).width, n = ee(this.isHorizontal() ? a.maxRotation : a.minRotation), o = Math.cos(n), i = Math.sin(n), r = this._resolveTickFontOptions(0).size;
    return {
      w: s * o + r * i,
      h: s * i + r * o
    };
  }
  _getLabelCapacity(t) {
    const a = this.options.time, s = a.displayFormats, n = s[a.unit] || s.millisecond, o = this._tickFormatFunction(t, 0, _o(this, [
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
      t.push(bo(this, n[a]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return qo(t.sort(vo));
  }
}
function Aa(e, t, a) {
  let s = 0, n = e.length - 1, o, i, r, l;
  a ? (t >= e[s].pos && t <= e[n].pos && ({ lo: s, hi: n } = Me(e, "pos", t)), { pos: o, time: r } = e[s], { pos: i, time: l } = e[n]) : (t >= e[s].time && t <= e[n].time && ({ lo: s, hi: n } = Me(e, "time", t)), { time: o, pos: r } = e[s], { time: i, pos: l } = e[n]);
  const d = i - o;
  return d ? r + (l - r) * (t - o) / d : r;
}
class GM extends xo {
  static id = "timeseries";
  static defaults = xo.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), a = this._table = this.buildLookupTable(t);
    this._minPos = Aa(a, this.min), this._tableRange = Aa(a, this.max) - this._minPos, super.initOffsets(t);
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
    return (Aa(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const a = this._offsets, s = this.getDecimalForPixel(t) / a.factor - a.end;
    return Aa(this._table, s * this._tableRange + this._minPos, !0);
  }
}
const Li = {
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
}, Eu = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
}, Ru = {
  type: {
    type: String,
    required: !0
  },
  destroyDelay: {
    type: Number,
    default: 0
    // No delay by default
  },
  ...Li,
  ...Eu
}, Iu = ji[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function Fe(e) {
  return Fo(e) ? ws(e) : e;
}
function Ou(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return Fo(t) ? new Proxy(e, {}) : e;
}
function zu(e, t) {
  const a = e.options;
  a && t && Object.assign(a, t);
}
function Fi(e, t) {
  e.labels = t;
}
function Pi(e, t, a) {
  const s = [];
  e.datasets = t.map((n) => {
    const o = e.datasets.find((i) => i[a] === n[a]);
    return !o || !n.data || s.includes(o) ? {
      ...n
    } : (s.push(o), Object.assign(o, n), o);
  });
}
function Vu(e, t) {
  const a = {
    labels: [],
    datasets: []
  };
  return Fi(a, e.labels), Pi(a, e.datasets, t), a;
}
const Nu = Q({
  props: Ru,
  setup(e, t) {
    let { expose: a, slots: s } = t;
    const n = nt(null), o = Lo(null);
    a({
      chart: o
    });
    const i = () => {
      if (!n.value) return;
      const { type: d, data: u, options: h, plugins: f, datasetIdKey: v } = e, g = Vu(u, v), _ = Ou(g, u);
      o.value = new ze(n.value, {
        type: d,
        data: _,
        options: {
          ...h
        },
        plugins: f
      });
    }, r = () => {
      const d = ws(o.value);
      d && (e.destroyDelay > 0 ? setTimeout(() => {
        d.destroy(), o.value = null;
      }, e.destroyDelay) : (d.destroy(), o.value = null));
    }, l = (d) => {
      d.update(e.updateMode);
    };
    return pe(i), fa(r), Nt([
      () => e.options,
      () => e.data
    ], (d, u) => {
      let [h, f] = d, [v, g] = u;
      const _ = ws(o.value);
      if (!_)
        return;
      let m = !1;
      if (h) {
        const p = Fe(h), b = Fe(v);
        p && p !== b && (zu(_, p), m = !0);
      }
      if (f) {
        const p = Fe(f.labels), b = Fe(g.labels), $ = Fe(f.datasets), w = Fe(g.datasets);
        p !== b && (Fi(_.config.data, p), m = !0), $ && $ !== w && (Pi(_.config.data, $, e.datasetIdKey), m = !0);
      }
      m && St(() => {
        l(_);
      });
    }, {
      deep: !0
    }), () => ks("canvas", {
      role: "img",
      "aria-label": e.ariaLabel,
      "aria-describedby": e.ariaDescribedby,
      ref: n
    }, [
      ks("p", {}, [
        s.default ? s.default() : ""
      ])
    ]);
  }
});
function Gs(e, t) {
  return ze.register(t), Q({
    props: Li,
    setup(a, s) {
      let { expose: n } = s;
      const o = Lo(null), i = (r) => {
        o.value = r?.chart;
      };
      return n({
        chart: o
      }), () => ks(Nu, Iu({
        ref: i
      }, {
        type: e,
        ...a
      }));
    }
  });
}
const Wu = /* @__PURE__ */ Gs("bar", uc), Hu = /* @__PURE__ */ Gs("line", gc), ju = /* @__PURE__ */ Gs("pie", pc), ko = {
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
}, wo = {
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
}, Yu = [
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
  const t = nt("light");
  let a = null;
  const s = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", n = S(() => e?.value ? e.value : t.value), o = S(() => n.value === "dark"), i = S(() => o.value ? wo : ko), r = () => {
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
  return pe(() => {
    r();
  }), fa(() => {
    l();
  }), e && Nt(e, () => {
  }), {
    isDark: o,
    currentTheme: n,
    colors: i,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: ko,
    darkColors: wo,
    chartSeriesColors: Yu
  };
}
const qu = { class: "chart-container" }, Uu = /* @__PURE__ */ Q({
  __name: "ChartBar",
  props: {
    data: {},
    options: {},
    stacked: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const a = e;
    ze.register(
      Ti,
      Bi,
      Ud,
      Di,
      Xs,
      Ks
    );
    const { isDark: s, colors: n } = lt(rt(a, "theme")), o = a.data, i = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = S(() => a.options ? a.options : {
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
      Z(T(Wu), {
        data: T(o),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), at = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [s, n] of t)
    a[s] = n;
  return a;
}, ne = /* @__PURE__ */ at(Uu, [["__scopeId", "data-v-105d8c6f"]]), Ku = { class: "chart-container" }, Xu = /* @__PURE__ */ Q({
  __name: "ChartLine",
  props: {
    data: {},
    options: {},
    theme: {}
  },
  setup(e, { expose: t }) {
    const a = e;
    ze.register(
      Ti,
      Bi,
      Nd,
      Ua,
      Di,
      Xs,
      Ks,
      fu
    );
    const { isDark: s, colors: n } = lt(rt(a, "theme")), o = a.data, i = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = S(() => a.options ? a.options : {
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
    return t({ isDark: s }), (l, d) => (y(), x("div", Ku, [
      Z(T(Hu), {
        data: T(o),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), ve = /* @__PURE__ */ at(Xu, [["__scopeId", "data-v-bacd3848"]]), Gu = { class: "chart-container" }, Zu = /* @__PURE__ */ Q({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const a = e;
    ze.register(Bd, Xs, Ks);
    const { isDark: s, colors: n } = lt(rt(a, "theme")), o = a.data, i = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = S(() => a.options ? a.options : {
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
              const d = l.label || "", u = l.parsed || 0, h = l.dataset.data.reduce((v, g) => v + g, 0), f = (u / h * 100).toFixed(1);
              return `${i(d)}: ${u} (${f}%)`;
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
    return t({ isDark: s }), (l, d) => (y(), x("div", Gu, [
      Z(T(ju), {
        data: T(o),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), Ga = /* @__PURE__ */ at(Zu, [["__scopeId", "data-v-23a84317"]]), Qu = { class: "chart-container" }, Ju = ["viewBox"], th = ["transform"], eh = ["x", "width", "fill", "stroke"], ah = ["fill"], sh = ["x1", "y1", "x2", "y2", "stroke"], nh = ["points", "fill"], oh = ["x1", "y1", "x2", "y2", "stroke"], ih = ["x", "y", "fill"], rh = ["x1", "y1", "x2", "y2", "stroke"], lh = ["points", "fill"], ch = ["transform"], dh = ["y1", "y2"], uh = ["y1", "y2"], hh = ["y1", "y2"], fh = ["y1", "y2"], gh = ["y", "height"], ph = ["y1", "y2"], vh = ["y1", "y2"], bh = ["y1", "y2"], mh = ["y1", "y2"], yh = ["y", "height"], _h = ["cy", "stroke", "onMouseenter"], xh = ["cy", "stroke", "onMouseenter"], kh = ["cy", "stroke", "onMouseenter"], wh = ["cy", "stroke", "onMouseenter"], $h = ["y1", "y2", "onMouseenter"], Mh = ["y1", "y2", "onMouseenter"], Ch = ["x", "y", "fill"], Sh = ["x", "y", "fill"], Dh = ["transform"], Ah = { transform: "translate(-200, 0)" }, Th = ["stroke"], Bh = ["fill"], Lh = { transform: "translate(-130, 0)" }, Fh = ["stroke"], Ph = ["fill"], Eh = { transform: "translate(-60, 0)" }, Rh = ["stroke"], Ih = ["fill"], Oh = { transform: "translate(10, 0)" }, zh = ["stroke"], Vh = ["fill"], Nh = { transform: "translate(80, 0)" }, Wh = ["fill"], Hh = { transform: "translate(150, 0)" }, jh = ["fill"], Yh = /* @__PURE__ */ Q({
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
    const a = e, { isDark: s } = lt(rt(a, "theme")), n = S(() => ({
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
    })), o = nt({
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
    }, h = S(() => {
      const f = [], g = a.chartHeight - a.chartMargin - a.chartBottomMargin;
      for (let _ = 1; _ <= 10; _++) {
        const m = _, p = (m - 1) / 9, b = a.chartMargin + g - p * g;
        f.push({ value: m, y: b });
      }
      return f;
    });
    return t({ isDark: s }), (f, v) => (y(), x("div", Qu, [
      (y(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: xt(`min-height: ${e.chartHeight}px;`),
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
          }, null, 8, eh),
          c("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: n.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, M(o.value.text), 9, ah)
        ], 8, th)) : E("", !0),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, sh),
        c("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: n.value.axis
        }, null, 8, nh),
        (y(!0), x(U, null, tt(h.value, (g, _) => (y(), x(U, { key: _ }, [
          c("line", {
            x1: e.chartMargin - 6,
            y1: g.y,
            x2: e.chartMargin,
            y2: g.y,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, oh),
          c("text", {
            x: e.chartMargin - 12,
            y: g.y + 4,
            "text-anchor": "end",
            fill: n.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, M(g.value), 9, ih)
        ], 64))), 128)),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, rh),
        c("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: n.value.axis
        }, null, 8, lh),
        (y(!0), x(U, null, tt(e.boxplotData, (g, _) => (y(), x(U, { key: _ }, [
          c("g", {
            transform: `translate(${g.centerX}, 0)`
          }, [
            g.isTotal ? (y(), x(U, { key: 0 }, [
              c("line", {
                x1: 0,
                y1: g.minY,
                x2: 0,
                y2: g.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, dh),
              c("line", {
                x1: 0,
                y1: g.q3Y,
                x2: 0,
                y2: g.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, uh),
              c("line", {
                x1: -18,
                y1: g.minY,
                x2: 18,
                y2: g.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, hh),
              c("line", {
                x1: -18,
                y1: g.maxY,
                x2: 18,
                y2: g.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, fh),
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
              }, null, 8, gh)
            ], 64)) : (y(), x(U, { key: 1 }, [
              c("line", {
                x1: 0,
                y1: g.minY,
                x2: 0,
                y2: g.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, ph),
              c("line", {
                x1: 0,
                y1: g.q3Y,
                x2: 0,
                y2: g.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, vh),
              c("line", {
                x1: -18,
                y1: g.minY,
                x2: 18,
                y2: g.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, bh),
              c("line", {
                x1: -18,
                y1: g.maxY,
                x2: 18,
                y2: g.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, mh),
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
              }, null, 8, yh)
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
            }, null, 40, _h),
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
            }, null, 40, xh),
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
            }, null, 40, kh),
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
            }, null, 40, wh),
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
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Mh)) : E("", !0)
          ], 8, ch),
          c("text", {
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: n.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, M(i(g.label)), 9, Ch),
          g.responseCount ? (y(), x("text", {
            key: 0,
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: n.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + M(g.responseCount), 9, Sh)) : E("", !0)
        ], 64))), 128)),
        e.showLegend ? (y(), x("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          c("g", Ah, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
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
            }, " Min ", 8, Bh)
          ]),
          c("g", Lh, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Fh),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, Ph)
          ]),
          c("g", Eh, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Rh),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, Ih)
          ]),
          c("g", Oh, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
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
            }, " Max ", 8, Vh)
          ]),
          c("g", Nh, [
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
            }, " Avg ", 8, Wh)
          ]),
          c("g", Hh, [
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
            }, " Median ", 8, jh)
          ])
        ], 8, Dh)) : E("", !0)
      ], 44, Ju))
    ]));
  }
}), qh = /* @__PURE__ */ at(Yh, [["__scopeId", "data-v-520c623f"]]), Uh = { class: "chart-container" }, Kh = ["viewBox"], Xh = ["transform"], Gh = ["x", "y", "width", "height", "fill", "stroke"], Zh = ["y", "fill"], Qh = ["y", "fill"], Jh = ["x1", "y1", "x2", "y2", "stroke"], tf = ["points", "fill"], ef = ["x1", "y1", "x2", "y2", "stroke"], af = ["x1", "y1", "x2", "y2", "stroke"], sf = ["x", "y", "fill"], nf = ["x", "y", "fill", "transform"], of = ["x1", "y1", "x2", "y2", "stroke"], rf = ["points", "fill"], lf = ["transform"], cf = ["y1", "y2", "stroke", "onMouseenter"], df = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], uf = ["x1", "y1", "x2", "y2", "onMouseenter"], hf = ["x1", "y1", "x2", "y2", "onMouseenter"], ff = ["cy", "stroke", "onMouseenter"], gf = ["cy", "stroke", "onMouseenter"], pf = ["x", "y", "fill"], vf = ["x", "y", "fill"], bf = ["transform"], mf = { transform: "translate(-180, 0)" }, yf = ["stroke"], _f = ["fill"], xf = { transform: "translate(-120, 0)" }, kf = ["fill"], wf = { transform: "translate(-60, 0)" }, $f = ["fill"], Mf = { transform: "translate(0, 0)" }, Cf = ["stroke"], Sf = ["fill"], Df = { transform: "translate(60, 0)" }, Af = ["fill"], Tf = { transform: "translate(130, 0)" }, Bf = ["fill"], Lf = /* @__PURE__ */ Q({
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
    const a = e, { isDark: s } = lt(rt(a, "theme")), n = S(() => ({
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
    })), o = nt({
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
      const w = Math.max(180, $.length * 7 + 40), k = 48;
      o.value = {
        visible: !0,
        x: p.x,
        y: p.y - 20,
        title: b,
        text: $,
        width: w,
        height: k
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
    }, h = S(() => {
      const f = [], g = a.chartHeight - a.chartMargin - a.chartBottomMargin;
      for (let _ = 1; _ <= 10; _++) {
        const m = _, p = (m - 1) / 9, b = a.chartMargin + g - p * g;
        f.push({ value: m, y: b });
      }
      return f;
    });
    return t({ isDark: s }), (f, v) => (y(), x("div", Uh, [
      (y(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: xt(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
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
          }, null, 8, Gh),
          c("text", {
            x: "0",
            y: -o.value.height + 8,
            "text-anchor": "middle",
            fill: n.value.tooltipText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, M(o.value.title), 9, Zh),
          c("text", {
            x: "0",
            y: -o.value.height + 26,
            "text-anchor": "middle",
            fill: n.value.tooltipTextSecondary,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, M(o.value.text), 9, Qh)
        ], 8, Xh)) : E("", !0),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, Jh),
        c("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: n.value.axis
        }, null, 8, tf),
        (y(!0), x(U, null, tt(h.value, (g, _) => (y(), x("line", {
          key: `grid-${_}`,
          x1: e.chartMargin,
          y1: g.y,
          x2: e.chartWidth - e.chartMargin,
          y2: g.y,
          stroke: n.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, ef))), 128)),
        (y(!0), x(U, null, tt(h.value, (g, _) => (y(), x(U, { key: _ }, [
          c("line", {
            x1: e.chartMargin - 6,
            y1: g.y,
            x2: e.chartMargin,
            y2: g.y,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, af),
          c("text", {
            x: e.chartMargin - 12,
            y: g.y + 4,
            "text-anchor": "end",
            fill: n.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, M(g.value), 9, sf)
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
        }, M(i(e.yAxisLabel)), 9, nf),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, of),
        c("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: n.value.axis
        }, null, 8, rf),
        (y(!0), x(U, null, tt(e.candlestickData, (g, _) => (y(), x(U, { key: _ }, [
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
            }, null, 40, cf),
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
            }, null, 40, df),
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
            }, null, 40, uf)) : E("", !0),
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
            }, null, 40, hf)) : E("", !0),
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
            }, null, 40, ff),
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
            }, null, 40, gf)
          ], 8, lf),
          c("text", {
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: n.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, M(i(g.label)), 9, pf),
          g.responseCount ? (y(), x("text", {
            key: 0,
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: n.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + M(g.responseCount), 9, vf)) : E("", !0)
        ], 64))), 128)),
        e.showLegend ? (y(), x("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          c("g", mf, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, yf),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, _f)
          ]),
          c("g", xf, [
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
            }, " Q1 ", 8, kf)
          ]),
          c("g", wf, [
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
            }, " Q3 ", 8, $f)
          ]),
          c("g", Mf, [
            c("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: n.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Cf),
            c("text", {
              x: "10",
              y: "4",
              fill: n.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Sf)
          ]),
          c("g", Df, [
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
            }, " Avg ", 8, Af)
          ]),
          c("g", Tf, [
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
            }, " Median ", 8, Bf)
          ])
        ], 8, bf)) : E("", !0)
      ], 44, Kh))
    ]));
  }
}), Ei = /* @__PURE__ */ at(Lf, [["__scopeId", "data-v-61d0259c"]]), Ff = { class: "chart-container" }, Pf = ["viewBox"], Ef = ["transform"], Rf = ["x", "y", "width", "height", "fill", "stroke"], If = ["y", "fill"], Of = ["y", "fill"], zf = ["x1", "y1", "x2", "y2", "stroke"], Vf = ["x1", "y1", "x2", "y2", "stroke"], Nf = ["points", "fill"], Wf = ["x1", "y1", "x2", "y2", "stroke"], Hf = ["x", "y", "fill"], jf = ["x", "y", "fill", "transform"], Yf = ["x1", "y1", "x2", "y2", "stroke"], qf = ["points", "fill"], Uf = ["x1", "y1", "x2", "y2", "stroke"], Kf = ["x", "y", "fill"], Xf = ["x", "y", "fill"], Gf = ["d"], Zf = ["x", "y", "width", "height", "onMouseenter"], Qf = ["x1", "y1", "x2", "y2"], Jf = ["x", "y"], tg = ["x1", "y1", "x2", "y2"], eg = ["x", "y"], ag = ["x1", "y1", "x2", "y2"], sg = ["x", "y"], ng = ["x1", "y1", "x2", "y2"], og = ["x", "y"], ig = ["x1", "y1", "x2", "y2"], rg = ["x", "y"], lg = ["x1", "y1", "x2", "y2"], cg = ["x", "y"], dg = ["transform"], ug = { transform: "translate(-220, 0)" }, hg = ["fill"], fg = { transform: "translate(-140, 0)" }, gg = ["fill"], pg = { transform: "translate(-80, 0)" }, vg = ["fill"], bg = { transform: "translate(-20, 0)" }, mg = ["fill"], yg = { transform: "translate(60, 0)" }, _g = ["fill"], xg = { transform: "translate(130, 0)" }, kg = ["fill"], wg = { transform: "translate(180, 0)" }, $g = ["fill"], Mg = /* @__PURE__ */ Q({
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
    const a = e, { isDark: s } = lt(rt(a, "theme")), n = S(() => ({
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
    })), o = nt({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), i = S(() => a.chartWidth - a.chartMargin * 2), r = S(() => a.chartHeight - a.chartMargin - a.chartBottomMargin), l = S(() => i.value / 10 * 0.6), d = S(() => {
      if (!a.histogram || a.histogram.length === 0) return 1;
      const N = Math.max(...a.histogram.map((j) => j.count || 0), 1), H = Math.max(1, Math.ceil(N * 0.2));
      return N + H;
    }), u = S(() => {
      if (!a.histogram || a.histogram.length === 0) return 1;
      const N = a.averageScore || 0;
      let H = 0, j = 0;
      if (a.histogram.forEach((J) => {
        const X = J.count || 0;
        H += X;
        const ct = J.score - N;
        j += X * (ct * ct);
      }), H === 0) return 1;
      const st = j / H;
      return Math.sqrt(st) || 1;
    }), h = (N, H, j) => {
      if (j === 0) return 0;
      const st = 1 / (j * Math.sqrt(2 * Math.PI)), J = -0.5 * Math.pow((N - H) / j, 2);
      return st * Math.exp(J);
    }, f = S(() => {
      if (!a.histogram || a.histogram.length === 0 || a.averageScore === 0 && u.value === 0) return null;
      const N = a.averageScore, H = u.value, j = 100, J = Math.max(...a.histogram.map((gt) => gt.count || 0), 1) / d.value * r.value;
      if (J <= 0) return null;
      let X = 0;
      for (let gt = 0; gt <= j; gt++) {
        const Ft = 1 + 9 * (gt / j), It = h(Ft, N, H);
        It > X && (X = It);
      }
      if (X <= 0) return null;
      const ct = J / X, wt = [];
      for (let gt = 0; gt <= j; gt++) {
        const Ft = 1 + 9 * (gt / j), It = h(Ft, N, H) * ct, qt = g(Ft);
        if (qt !== null) {
          const it = a.chartHeight - a.chartBottomMargin - It;
          wt.push(`${gt === 0 ? "M" : "L"} ${qt} ${it}`);
        }
      }
      return wt.join(" ");
    }), v = S(() => {
      if (!a.histogram || a.histogram.length === 0) return [];
      const N = i.value / 10;
      return a.histogram.map((H, j) => {
        const st = a.chartMargin + (j + 0.5) * N, J = H.count > 0 ? H.count / d.value * r.value : 0, X = a.chartHeight - a.chartBottomMargin - J;
        return {
          score: H.score,
          count: H.count,
          x: st,
          y: X,
          height: J
        };
      });
    }), g = (N) => {
      if (N < 1 || N > 10) return null;
      const H = i.value / 10;
      return a.chartMargin + (N - 0.5) * H;
    }, _ = S(() => g(a.minScore)), m = S(() => g(a.maxScore)), p = S(() => g(a.q1Score)), b = S(() => g(a.medianScore)), $ = S(() => g(a.q3Score)), w = S(() => g(a.averageScore)), k = S(() => a.minScore), C = S(() => a.maxScore), D = S(() => a.q1Score), A = S(() => a.medianScore), P = S(() => a.q3Score), R = S(() => a.averageScore), I = S(() => {
      const N = [], H = a.chartMargin - 8, j = 18;
      p.value !== null && N.push({
        x: p.value,
        y: H,
        value: a.q1Score,
        label: `Q1: ${D.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), b.value !== null && N.push({
        x: b.value,
        y: H - j,
        value: a.medianScore,
        label: `Median: ${A.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), w.value !== null && N.push({
        x: w.value,
        y: H - j,
        value: a.averageScore,
        label: `Avg: ${R.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), $.value !== null && N.push({
        x: $.value,
        y: H,
        value: a.q3Score,
        label: `Q3: ${P.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), N.sort((X, ct) => (X.x || 0) - (ct.x || 0));
      const st = [[], [], []];
      N.forEach((X) => {
        if (X.x === null) return;
        let ct = -1;
        for (let wt = 0; wt < st.length; wt++) {
          let gt = !1;
          for (const Ft of st[wt]) {
            if (Ft.x === null) continue;
            const It = Math.abs(X.x - Ft.x), qt = (X.width + Ft.width) / 2 + 10;
            if (It < qt) {
              gt = !0;
              break;
            }
          }
          if (!gt) {
            ct = wt;
            break;
          }
        }
        ct === -1 && (ct = st.length - 1), X.y = H - ct * j, st[ct].push(X);
      });
      const J = 15;
      return N.forEach((X) => {
        X.y < J && (X.y = J);
      }), N;
    }), V = (N) => I.value.find((j) => j.id === N)?.y || a.chartMargin - 10, q = S(() => {
      const N = [];
      for (let j = 0; j <= 5; j++) {
        const st = Math.round(d.value / 5 * j), J = a.chartHeight - a.chartBottomMargin - j / 5 * r.value;
        N.push({ value: st, y: J });
      }
      return N;
    }), L = (N, H) => {
      const j = N.currentTarget.closest("svg");
      if (!j) return;
      const st = j.getBoundingClientRect(), J = j.createSVGPoint();
      J.x = N.clientX - st.left, J.y = N.clientY - st.top;
      const X = `Score: ${H.score}`, ct = `Count: ${H.count}`, wt = 120, gt = 48;
      o.value = {
        visible: !0,
        x: J.x,
        y: J.y - 20,
        title: X,
        text: ct,
        width: wt,
        height: gt
      };
    }, F = (N) => {
      if (o.value.visible) {
        const H = N.currentTarget, j = H.getBoundingClientRect(), st = H.createSVGPoint();
        st.x = N.clientX - j.left, st.y = N.clientY - j.top, o.value.x = st.x, o.value.y = st.y - 20;
      }
    }, O = () => {
      o.value.visible = !1;
    }, W = () => {
      o.value.visible = !1;
    };
    return t({ isDark: s }), (N, H) => (y(), x("div", Ff, [
      (y(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: xt(`min-height: ${e.chartHeight}px;`),
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
          }, null, 8, Rf),
          c("text", {
            x: "0",
            y: -o.value.height + 8,
            "text-anchor": "middle",
            fill: n.value.tooltipText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, M(o.value.title), 9, If),
          c("text", {
            x: "0",
            y: -o.value.height + 26,
            "text-anchor": "middle",
            fill: n.value.tooltipTextSecondary,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, M(o.value.text), 9, Of)
        ], 8, Ef)) : E("", !0),
        (y(!0), x(U, null, tt(q.value, (j, st) => (y(), x("line", {
          key: `grid-${st}`,
          x1: e.chartMargin,
          y1: j.y,
          x2: e.chartWidth - e.chartMargin,
          y2: j.y,
          stroke: n.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, zf))), 128)),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, Vf),
        c("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: n.value.axis
        }, null, 8, Nf),
        (y(!0), x(U, null, tt(q.value, (j, st) => (y(), x(U, {
          key: `y-tick-${st}`
        }, [
          c("line", {
            x1: e.chartMargin - 6,
            y1: j.y,
            x2: e.chartMargin,
            y2: j.y,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Wf),
          c("text", {
            x: e.chartMargin - 12,
            y: j.y + 4,
            "text-anchor": "end",
            fill: n.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, M(j.value), 9, Hf)
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
        }, " Count ", 8, jf),
        c("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: n.value.axis,
          "stroke-width": "2"
        }, null, 8, Yf),
        c("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: n.value.axis
        }, null, 8, qf),
        (y(!0), x(U, null, tt(v.value, (j, st) => (y(), x(U, {
          key: `tick-${st}`
        }, [
          c("line", {
            x1: j.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: j.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: n.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Uf),
          c("text", {
            x: j.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: n.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, M(j.score), 9, Kf)
        ], 64))), 128)),
        c("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: n.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, Xf),
        f.value ? (y(), x("path", {
          key: 1,
          d: f.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, Gf)) : E("", !0),
        (y(!0), x(U, null, tt(v.value, (j, st) => (y(), x("rect", {
          key: `bar-${st}`,
          x: j.x - l.value / 2,
          y: j.y,
          width: l.value,
          height: j.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (J) => L(J, j),
          onMouseleave: W,
          style: { cursor: "pointer" }
        }, null, 40, Zf))), 128)),
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
        }, null, 8, Qf)) : E("", !0),
        _.value ? (y(), x("text", {
          key: 3,
          x: _.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + M(k.value.toFixed(1)), 9, Jf)) : E("", !0),
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
        }, null, 8, tg)) : E("", !0),
        p.value ? (y(), x("text", {
          key: 5,
          x: p.value,
          y: V("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + M(D.value.toFixed(1)), 9, eg)) : E("", !0),
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
        }, null, 8, ag)) : E("", !0),
        b.value ? (y(), x("text", {
          key: 7,
          x: b.value,
          y: V("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + M(A.value.toFixed(1)), 9, sg)) : E("", !0),
        w.value ? (y(), x("line", {
          key: 8,
          x1: w.value,
          y1: e.chartMargin,
          x2: w.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, ng)) : E("", !0),
        w.value ? (y(), x("text", {
          key: 9,
          x: w.value,
          y: V("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + M(R.value.toFixed(1)), 9, og)) : E("", !0),
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
        }, null, 8, ig)) : E("", !0),
        $.value ? (y(), x("text", {
          key: 11,
          x: $.value,
          y: V("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + M(P.value.toFixed(1)), 9, rg)) : E("", !0),
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
        }, null, 8, lg)) : E("", !0),
        m.value ? (y(), x("text", {
          key: 13,
          x: m.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + M(C.value.toFixed(1)), 9, cg)) : E("", !0),
        e.showLegend ? (y(), x("g", {
          key: 14,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          c("g", ug, [
            H[0] || (H[0] = c("line", {
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
            }, " Gaussian ", 8, hg)
          ]),
          c("g", fg, [
            H[1] || (H[1] = c("line", {
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
            }, " Min ", 8, gg)
          ]),
          c("g", pg, [
            H[2] || (H[2] = c("line", {
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
            }, " Q1 ", 8, vg)
          ]),
          c("g", bg, [
            H[3] || (H[3] = c("line", {
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
            }, " Median ", 8, mg)
          ]),
          c("g", yg, [
            H[4] || (H[4] = c("line", {
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
            }, " Avg ", 8, _g)
          ]),
          c("g", xg, [
            H[5] || (H[5] = c("line", {
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
            }, " Q3 ", 8, kg)
          ]),
          c("g", wg, [
            H[6] || (H[6] = c("line", {
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
            }, " Max ", 8, $g)
          ])
        ], 8, dg)) : E("", !0)
      ], 44, Pf))
    ]));
  }
}), Ri = /* @__PURE__ */ at(Mg, [["__scopeId", "data-v-64e657d9"]]), Cg = { class: "chart-container" }, Sg = {
  key: 1,
  class: "chart-wrapper"
}, Dg = /* @__PURE__ */ Q({
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
    tn.use([qi, Ui, Ki, Xi]);
    const a = e, { isDark: s, colors: n } = lt(rt(a, "theme")), o = nt(null), i = nt(!0), r = nt(!1);
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
      ), w = Math.max(...$.map((D) => D.value), 1), k = Math.max(1, w * 0.01), C = $.map((D) => ({
        ...D,
        originalValue: D.value,
        value: D.value < w * 0.01 ? k : D.value
      }));
      return {
        nodes: a.data.nodes.filter((D) => D.name),
        links: C
      };
    }, f = ($) => $.map((w, k) => ({
      ...w,
      itemStyle: {
        color: a.nodeColors[w.name] || u[k % u.length],
        borderRadius: 8
      }
    })), v = ($) => (w) => {
      const k = w.dataType === "node", C = n.value.tooltipText, D = s.value ? "#d1d5db" : "#e2e8f0";
      if (k) {
        const V = $.filter((F) => F.target === w.name), q = $.filter((F) => F.source === w.name), L = V.length > 0 ? V.reduce((F, O) => F + (O.originalValue || O.value), 0) : q.reduce((F, O) => F + (O.originalValue || O.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${C};">${w.name}</div><div style="color: ${D}; font-size: 12px;">Count: ${L.toLocaleString()}</div>`;
      }
      const A = w.data?.source || w.source || "Unknown", P = w.data?.target || w.target || "Unknown", R = w.data?.originalValue || w.data?.value || w.value || 0, I = w.data?.label || `${R.toLocaleString()}`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${C};">${A} → ${P}</div><div style="color: ${D}; font-size: 12px;">Flow: ${I}</div>`;
    }, g = () => {
      if (!(!l || !a.data.nodes?.length || !a.data.links?.length))
        try {
          const { nodes: $, links: w } = h(), k = f($), C = {
            tooltip: {
              trigger: "item",
              triggerOn: "mousemove",
              formatter: v(w),
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
                data: k,
                links: w,
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
                    const A = D.name || "";
                    return A.length > 15 ? `${A.substring(0, 15)}...` : A;
                  }
                },
                edgeLabel: {
                  show: !0,
                  fontSize: 11,
                  color: n.value.textSecondary,
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  formatter: (D) => {
                    const A = D.data?.originalValue || D.value || 0;
                    return D.data?.label || `${A.toLocaleString()}`;
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
          l.setOption(C);
        } catch ($) {
          console.error("Error setting Sankey chart options:", $), r.value = !0;
        }
    }, _ = async () => {
      if (o.value)
        try {
          l = tn.init(o.value), g(), window.addEventListener("resize", p);
        } catch ($) {
          console.error("Error initializing Sankey chart:", $), r.value = !0;
        } finally {
          i.value = !1;
        }
    }, m = async ($ = 40) => {
      await St();
      for (let w = 0; w < $; w++) {
        if (o.value?.clientWidth && o.value.clientWidth > 0 && o.value?.clientHeight && o.value.clientHeight > 0)
          return await _();
        await new Promise((k) => setTimeout(k, 50));
      }
      await _(), setTimeout(p, 50);
    }, p = () => l?.resize(), b = () => {
      window.removeEventListener("resize", p), l && (l.dispose(), l = null);
    };
    return pe(() => o.value && m()), Po(b), Nt(() => a.data, g, { deep: !0 }), Nt(s, g), t({ isDark: s }), ($, w) => (y(), x("div", Cg, [
      r.value ? (y(), x("div", {
        key: 0,
        class: "error-state",
        style: xt({ height: e.height })
      }, [...w[0] || (w[0] = [
        et('<div class="error-content" data-v-d6d61034><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d6d61034><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-d6d61034></path></svg><p class="error-title" data-v-d6d61034>Chart could not be loaded</p><p class="error-description" data-v-d6d61034>Please check the data format.</p></div>', 1)
      ])], 4)) : (y(), x("div", Sg, [
        se(c("div", {
          ref_key: "chartEl",
          ref: o,
          class: "chart-content",
          style: xt({ height: e.height })
        }, null, 4), [
          [Fa, !i.value]
        ]),
        se(c("div", {
          class: "loading-state",
          style: xt({ height: e.height })
        }, [...w[1] || (w[1] = [
          et('<div class="loading-container" data-v-d6d61034><div class="sankey-loader" data-v-d6d61034><div class="flow flow-1" data-v-d6d61034></div><div class="flow flow-2" data-v-d6d61034></div><div class="flow flow-3" data-v-d6d61034></div><div class="flow flow-4" data-v-d6d61034></div></div><p class="loading-text" data-v-d6d61034>Loading Sankey diagram...</p></div>', 1)
        ])], 4), [
          [Fa, i.value]
        ])
      ]))
    ]));
  }
}), be = /* @__PURE__ */ at(Dg, [["__scopeId", "data-v-d6d61034"]]);
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
      d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
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
      d: "M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
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
      d: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
    })
  ]);
}
function Ii(e, t) {
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
function Rt(e, t) {
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
      d: "M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
    }),
    c("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
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
      d: "m19.5 8.25-7.5 7.5-7.5-7.5"
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
function $o(e, t) {
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
      d: "M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
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
      d: "M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
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
      d: "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
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
      d: "M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
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
      d: "M6 18 18 6M6 6l12 12"
    })
  ]);
}
const Vg = { class: "chart-footer" }, Ng = { class: "export-actions" }, Wg = { class: "export-buttons" }, Hg = ["disabled"], jg = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Yg = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, qg = ["disabled"], Ug = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Kg = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Xg = /* @__PURE__ */ Q({
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
    return (i, r) => (y(), x("footer", Vg, [
      r[9] || (r[9] = c("div", { class: "footer-divider" }, null, -1)),
      c("div", Ng, [
        r[8] || (r[8] = c("span", { class: "export-label" }, "Export", -1)),
        c("div", Wg, [
          n("pdf") ? (y(), x("button", {
            key: 0,
            type: "button",
            class: G(["export-btn", { "is-loading": e.loading }]),
            disabled: e.loading,
            title: "Download PDF",
            onClick: r[0] || (r[0] = (l) => o("pdf"))
          }, [
            e.loading ? (y(), x("svg", jg, [...r[2] || (r[2] = [
              c("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                "stroke-opacity": "0.25"
              }, null, -1),
              c("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
            ])])) : (y(), x("svg", Yg, [...r[3] || (r[3] = [
              et('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-v-672661d4></path><polyline points="14 2 14 8 20 8" data-v-672661d4></polyline><line x1="16" y1="13" x2="8" y2="13" data-v-672661d4></line><line x1="16" y1="17" x2="8" y2="17" data-v-672661d4></line><polyline points="10 9 9 9 8 9" data-v-672661d4></polyline>', 5)
            ])])),
            r[4] || (r[4] = c("span", null, "PDF", -1))
          ], 10, Hg)) : E("", !0),
          n("csv") ? (y(), x("button", {
            key: 1,
            type: "button",
            class: G(["export-btn", { "is-loading": e.loading }]),
            disabled: e.loading,
            title: "Download CSV",
            onClick: r[1] || (r[1] = (l) => o("csv"))
          }, [
            e.loading ? (y(), x("svg", Ug, [...r[5] || (r[5] = [
              c("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                "stroke-opacity": "0.25"
              }, null, -1),
              c("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
            ])])) : (y(), x("svg", Kg, [...r[6] || (r[6] = [
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
}), _t = /* @__PURE__ */ at(Xg, [["__scopeId", "data-v-672661d4"]]), Gg = { class: "agents-per-day-card" }, Zg = {
  key: 0,
  class: "card-body"
}, Qg = {
  key: 0,
  class: "chart-section"
}, Jg = {
  key: 1,
  class: "empty-state"
}, tp = { class: "empty-state-content" }, ep = { class: "empty-icon-wrapper" }, ap = {
  key: 1,
  class: "loading-state"
}, sp = /* @__PURE__ */ Q({
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
    }, n = e, o = a, i = (f) => {
      o("export", f);
    }, { isDark: r, colors: l } = lt(rt(n, "theme")), d = (f) => {
      const v = new Date(f), g = String(v.getDate()).padStart(2, "0"), _ = String(v.getMonth() + 1).padStart(2, "0");
      return `${g}-${_}`;
    }, u = S(() => {
      const f = n.data?.agents_by_day || {}, v = Object.keys(f).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const g = v.map(($) => d($)), _ = /* @__PURE__ */ new Set();
      for (const $ of Object.values(f))
        for (const w of Object.keys($))
          _.add(w);
      const m = Array.from(_), p = ($) => $, b = m.map(($) => ({
        label: $,
        data: v.map((w) => f[w]?.[$] || 0),
        backgroundColor: `${s[$] || "#94a3b8"}80`,
        borderColor: p(s[$] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: g,
        datasets: b
      };
    }), h = S(() => n.options ? n.options : {
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
    return t({ isDark: r }), (f, v) => (y(), x("article", Gg, [
      v[3] || (v[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Agents Total Messages per Day"),
          c("p", { class: "card-subtitle" }, "Daily agent interactions (stacked)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", ap, [...v[2] || (v[2] = [
        et('<div class="loading-container" data-v-4d18c22c><div class="chart-lines-loader" data-v-4d18c22c><div class="line line-1" data-v-4d18c22c></div><div class="line line-2" data-v-4d18c22c></div><div class="line line-3" data-v-4d18c22c></div><div class="line line-4" data-v-4d18c22c></div><div class="line line-5" data-v-4d18c22c></div></div><p class="loading-text" data-v-4d18c22c>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", Zg, [
        u.value.labels && u.value.labels.length ? (y(), x("section", Qg, [
          Z(ne, {
            data: u.value,
            options: h.value,
            stacked: !0
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ht(T(_t), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", Jg, [
          c("div", tp, [
            c("div", ep, [
              Z(T(Rt), { class: "empty-icon" })
            ]),
            v[0] || (v[0] = c("p", { class: "empty-title" }, "No agents data per day", -1)),
            v[1] || (v[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see daily agent interactions.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), np = /* @__PURE__ */ at(sp, [["__scopeId", "data-v-4d18c22c"]]), Y = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), ft = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), op = { class: "booking-manager-card" }, ip = { class: "card-header" }, rp = { class: "header-content" }, lp = {
  key: 0,
  class: "payment-success-badge"
}, cp = {
  key: 0,
  class: "currency-breakdown-list"
}, dp = {
  key: 1,
  class: "badge-value"
}, up = {
  key: 0,
  class: "loading-state"
}, hp = {
  key: 1,
  class: "error-state"
}, fp = { class: "error-content" }, gp = { class: "error-description" }, pp = {
  key: 2,
  class: "card-body"
}, vp = { class: "chart-section" }, bp = { class: "chart-wrapper" }, mp = {
  key: 0,
  class: "table-section"
}, yp = { class: "table-wrapper" }, _p = { class: "data-table" }, xp = { class: "table-body" }, kp = { class: "table-cell font-medium" }, wp = { class: "table-cell text-center" }, $p = { class: "table-cell text-center" }, Mp = { class: "percentage-text" }, Cp = { class: "table-cell text-center" }, Sp = { class: "table-cell" }, Dp = { class: "badges-container" }, Ap = { class: "badge badge-success" }, Tp = { class: "badge badge-error" }, Bp = { class: "table-cell" }, Lp = {
  key: 0,
  class: "badges-container"
}, Fp = {
  key: 1,
  class: "percentage-text"
}, Pp = { class: "table-cell" }, Ep = { class: "badges-container" }, Rp = { class: "badge badge-error" }, Ip = { class: "badge badge-warning" }, Op = { class: "badge badge-yellow" }, zp = { class: "badge badge-error" }, Vp = {
  key: 1,
  class: "empty-state"
}, hs = 3, Np = /* @__PURE__ */ Q({
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
    const a = e, s = t, n = (m) => {
      s("export", m);
    }, o = nt(!1), i = S(() => a.data?.booking_manager_by_day ? [...a.data.booking_manager_by_day].sort(
      (m, p) => new Date(m.date).getTime() - new Date(p.date).getTime()
    ) : []), r = S(() => o.value ? i.value : i.value.slice(0, hs)), l = S(() => i.value.length > hs), d = S(() => a.data?.total_payment_success_value || []), u = (m) => m.payment_success_value || [], h = (m) => typeof m.payment_success_count == "number" ? m.payment_success_count : (m.payment_success_value || []).reduce((p, b) => p + (b.count || 0), 0), f = (m) => ft(m), v = S(() => {
      const m = a.data, p = m.total_booking_initiated || 0, b = m.total_booking_started || 0, $ = m.total_payment_initiated || 0, w = m.total_not_found || 0, k = m.total_cancelled || 0, C = m.total_no_pending_balance || 0, D = m.total_errors || 0, A = typeof m.total_payment_success == "number" ? m.total_payment_success : (m.total_payment_success_value || []).reduce((F, O) => F + (O.count || 0), 0), P = m.total_payment_failed || 0, R = Math.max(0, p - b), I = Math.max(0, b - $ - w - k - C - D), V = (F, O) => {
        const W = O > 0 ? Math.round(F / O * 100) : 0;
        return `${F.toLocaleString()} (${W}%)`;
      }, q = [
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
      return b > 0 && L.push({
        source: "Initiated",
        target: "Started",
        value: b,
        label: V(b, p)
      }), R > 0 && L.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: R,
        label: V(R, p)
      }), $ > 0 && L.push({
        source: "Started",
        target: "Payment Initiated",
        value: $,
        label: V($, b)
      }), w > 0 && L.push({
        source: "Started",
        target: "Not Found",
        value: w,
        label: V(w, b)
      }), k > 0 && L.push({
        source: "Started",
        target: "Cancelled",
        value: k,
        label: V(k, b)
      }), C > 0 && L.push({
        source: "Started",
        target: "No Pending Balance",
        value: C,
        label: V(C, b)
      }), D > 0 && L.push({
        source: "Started",
        target: "Errors",
        value: D,
        label: V(D, b)
      }), I > 0 && L.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: I,
        label: V(I, b)
      }), A > 0 && L.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: A,
        label: V(A, $)
      }), P > 0 && L.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: P,
        label: V(P, $)
      }), { nodes: q, links: L };
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
    return (m, p) => (y(), x("article", op, [
      c("header", ip, [
        c("div", rp, [
          p[2] || (p[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Booking Manager Metrics"),
            c("p", { class: "card-subtitle" }, "Booking manager workflow tracking and analysis")
          ], -1)),
          a.loading ? E("", !0) : (y(), x("div", lp, [
            p[1] || (p[1] = c("p", { class: "badge-label" }, "Payment Success Value", -1)),
            d.value.length > 0 ? (y(), x("div", cp, [
              (y(!0), x(U, null, tt(d.value, (b) => (y(), x("p", {
                key: b.currency,
                class: "currency-breakdown-item"
              }, M(b.currency) + " " + M(f(b.total_value)), 1))), 128))
            ])) : (y(), x("p", dp, M(f(0)), 1))
          ]))
        ])
      ]),
      a.loading ? (y(), x("div", up, [...p[3] || (p[3] = [
        et('<div class="loading-container" data-v-15d5c773><div class="chart-flow-loader" data-v-15d5c773><div class="flow-line flow-1" data-v-15d5c773></div><div class="flow-line flow-2" data-v-15d5c773></div><div class="flow-line flow-3" data-v-15d5c773></div><div class="flow-line flow-4" data-v-15d5c773></div><div class="flow-line flow-5" data-v-15d5c773></div></div><p class="loading-text" data-v-15d5c773>Loading booking data...</p></div>', 1)
      ])])) : a.error ? (y(), x("div", hp, [
        c("div", fp, [
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
          c("p", gp, M(a.error), 1)
        ])
      ])) : (y(), x("div", pp, [
        c("section", vp, [
          c("div", bp, [
            Z(be, {
              data: v.value,
              "node-colors": g,
              height: "500px",
              "node-gap": 15
            }, null, 8, ["data"])
          ])
        ]),
        i.value.length > 0 ? (y(), x("section", mp, [
          p[8] || (p[8] = c("div", { class: "section-header" }, [
            c("h4", { class: "section-title" }, "Daily Overview")
          ], -1)),
          c("div", yp, [
            c("table", _p, [
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
              c("tbody", xp, [
                (y(!0), x(U, null, tt(r.value, (b) => (y(), x("tr", {
                  key: b.date,
                  class: "table-row"
                }, [
                  c("td", kp, M(T(At)(b.date).format("DD/MM/YYYY")), 1),
                  c("td", wp, M(T(Y)(b.booking_initiated_count)), 1),
                  c("td", $p, [
                    kt(M(T(Y)(b.booking_started_count)) + " ", 1),
                    c("span", Mp, " (" + M(_(b.booking_started_count, b.booking_initiated_count)) + ") ", 1)
                  ]),
                  c("td", Cp, M(T(Y)(b.payment_initiated_count)), 1),
                  c("td", Sp, [
                    c("div", Dp, [
                      c("span", Ap, " Success: " + M(T(Y)(h(b))), 1),
                      c("span", Tp, " Failed: " + M(T(Y)(b.payment_failed_count || 0)), 1)
                    ])
                  ]),
                  c("td", Bp, [
                    u(b).length > 0 ? (y(), x("div", Lp, [
                      (y(!0), x(U, null, tt(u(b), ($) => (y(), x("span", {
                        key: `${b.date}-${$.currency}`,
                        class: "badge badge-currency"
                      }, M($.currency) + " " + M(f($.total_value)), 1))), 128))
                    ])) : (y(), x("span", Fp, "N/A"))
                  ]),
                  c("td", Pp, [
                    c("div", Ep, [
                      c("span", Rp, " Not Found: " + M(b.not_found_count ? T(Y)(b.not_found_count) : "N/A"), 1),
                      c("span", Ip, " Cancelled: " + M(b.cancelled_count ? T(Y)(b.cancelled_count) : "N/A"), 1),
                      c("span", Op, " No Balance: " + M(b.no_pending_balance_count ? T(Y)(b.no_pending_balance_count) : "N/A"), 1),
                      c("span", zp, " Errors: " + M(b.error_count ? T(Y)(b.error_count) : "N/A"), 1)
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
            kt(M(o.value ? "View less" : `View more (${i.value.length - hs} more rows)`) + " ", 1),
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
          e.enableExport ? (y(), ht(T(_t), {
            key: 1,
            onExport: n,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", Vp, [...p[9] || (p[9] = [
          et('<div class="empty-state-content" data-v-15d5c773><div class="empty-icon-wrapper" data-v-15d5c773><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-15d5c773><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" data-v-15d5c773></path></svg></div><p class="empty-title" data-v-15d5c773>No booking manager data available</p><p class="empty-description" data-v-15d5c773>No booking manager data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Wp = /* @__PURE__ */ at(Np, [["__scopeId", "data-v-15d5c773"]]), Hp = { class: "checkin-metrics-card" }, jp = {
  key: 0,
  class: "loading-state"
}, Yp = {
  key: 1,
  class: "card-body"
}, qp = {
  key: 0,
  class: "chart-section"
}, Up = { class: "chart-wrapper" }, Kp = {
  key: 1,
  class: "table-section"
}, Xp = { class: "table-wrapper" }, Gp = { class: "data-table" }, Zp = { class: "table-body" }, Qp = { class: "table-cell font-medium" }, Jp = { class: "table-cell text-center" }, t0 = { class: "table-cell text-center" }, e0 = { class: "table-cell text-center" }, a0 = { class: "table-cell text-center" }, s0 = { class: "table-cell text-center" }, n0 = { class: "table-cell text-center" }, o0 = { class: "table-cell text-left" }, i0 = {
  key: 0,
  class: "failed-steps"
}, r0 = { class: "step-name" }, l0 = { class: "step-count" }, c0 = {
  key: 1,
  class: "empty-cell"
}, d0 = {
  key: 2,
  class: "empty-state"
}, u0 = {
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
    const a = t, s = (m) => {
      a("export", m);
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
    }, r = nt([]), l = S(() => {
      const m = n.data;
      return m && (Array.isArray(m.checkin_by_day) && m.checkin_by_day.length > 0 || (m.total_checkin_initiated ?? 0) > 0) ? { ...o, ...m } : n.checkinData ?? o;
    }), d = S(() => {
      const m = n.data;
      return m && (Array.isArray(m.failed_by_step_by_day) && m.failed_by_step_by_day.length > 0 || Array.isArray(m.unrecovered_by_step) && m.unrecovered_by_step.length > 0) ? {
        ...i,
        total_checkin_failed: m.total_checkin_failed ?? 0,
        total_checkin_unrecovered: m.total_checkin_unrecovered ?? 0,
        failed_by_step_by_day: m.failed_by_step_by_day ?? [],
        unrecovered_by_step: m.unrecovered_by_step ?? [],
        unrecovered_by_day: m.unrecovered_by_day ?? []
      } : n.failedData ?? i;
    }), u = S(() => {
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
        const w = b.step_name.replace(/_/g, " ").split(" ").map((C) => C.charAt(0).toUpperCase() + C.slice(1)).join(" "), k = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        m[w] = k[w] || "#DC2626";
      }), m;
    }), h = (m, p) => !p || p === 0 ? "0%" : `${Math.round(m / p * 100)}%`, f = (m, p) => {
      const b = Y(m), $ = h(m, p);
      return `${b} (${$})`;
    }, v = (m) => m.reduce((p, b) => p + b.failed_count, 0), g = S(() => {
      const m = [], p = [];
      if (!l.value.total_checkin_initiated)
        return { nodes: m, links: p };
      m.push({ name: "Checkin Init" }), m.push({ name: "Booking retrive" }), m.push({ name: "Booking retrive success" }), m.push({ name: "Number of Passengers" }), m.push({ name: "Completed" }), m.push({ name: "Closed with BP" });
      const b = l.value.total_checkin_initiated, $ = l.value.total_checkin_init, w = l.value.total_checkin_init_abandoned, k = $ - w, C = l.value.total_checkin_started, D = l.value.total_checkin_completed, A = l.value.total_checkin_closed, P = d.value.unrecovered_by_step || [], R = P.reduce((L, F) => L + F.count, 0);
      if ($ > 0) {
        const L = Math.round($ / b * 100);
        p.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: $,
          label: `${$.toLocaleString()} (${L}%)`
        });
      }
      const I = b - $;
      if (I > 0) {
        const L = Math.round(I / b * 100);
        m.push({ name: "Abandoned (Init)" }), p.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: I,
          label: `${I.toLocaleString()} (${L}%)`
        });
      }
      if (w > 0) {
        const L = Math.round(w / b * 100);
        m.push({ name: "Abandoned (Started)" }), p.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: w,
          label: `${w.toLocaleString()} (${L}%)`
        });
      }
      if (k > 0) {
        const L = Math.round(k / b * 100);
        p.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: k,
          label: `${k.toLocaleString()} (${L}%)`
        });
      }
      if (C > 0) {
        const L = Math.round(C / b * 100);
        p.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: C,
          label: `${C.toLocaleString()} (${L}%)`
        });
      }
      if (D > 0) {
        const L = Math.round(D / C * 100);
        p.push({
          source: "Number of Passengers",
          target: "Completed",
          value: D,
          label: `${D.toLocaleString()} (${L}%)`
        });
      }
      if (P.length > 0 && R > 0) {
        m.push({ name: "Unrecovered" });
        const L = Math.round(R / C * 100);
        p.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: R,
          label: `${R.toLocaleString()} (${L}%)`
        }), P.forEach((F) => {
          const W = F.step_name.replace(/_/g, " ").split(" ").map((H) => H.charAt(0).toUpperCase() + H.slice(1)).join(" "), N = Math.round(F.count / C * 100);
          m.push({ name: W }), p.push({
            source: "Unrecovered",
            target: W,
            value: F.count,
            label: `${F.count.toLocaleString()} (${N}%)`
          });
        });
      }
      const V = C - (D + R);
      if (V > 0) {
        const L = Math.round(V / C * 100);
        m.push({ name: "Abandoned (Flow)" }), p.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: V,
          label: `${V.toLocaleString()} (${L}%)`
        });
      }
      const q = D - A;
      if (q > 0) {
        const L = Math.round(q / C * 100);
        m.push({ name: "BP Error" }), p.push({
          source: "Completed",
          target: "BP Error",
          value: q,
          label: `${q.toLocaleString()} (${L}%)`
        });
      }
      if (A > 0) {
        const L = Math.round(A / C * 100);
        p.push({
          source: "Completed",
          target: "Closed with BP",
          value: A,
          label: `${A.toLocaleString()} (${L}%)`
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
          (w) => w.date === b.date
        );
        return {
          ...b,
          failed_steps: $?.steps || []
        };
      }), r.value.sort((b, $) => new Date(b.date) - new Date($.date));
    };
    return Nt(
      [() => n.data, () => n.checkinData, () => n.failedData],
      () => {
        _();
      },
      { deep: !0, immediate: !0 }
    ), (m, p) => (y(), x("article", Hp, [
      p[3] || (p[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Check-in Metrics"),
          c("p", { class: "card-subtitle" }, "Check-in performance and failure analysis")
        ])
      ], -1)),
      n.loading ? (y(), x("div", jp, [...p[0] || (p[0] = [
        et('<div class="loading-container" data-v-d527da09><div class="chart-flow-loader" data-v-d527da09><div class="flow-line flow-1" data-v-d527da09></div><div class="flow-line flow-2" data-v-d527da09></div><div class="flow-line flow-3" data-v-d527da09></div><div class="flow-line flow-4" data-v-d527da09></div><div class="flow-line flow-5" data-v-d527da09></div></div><p class="loading-text" data-v-d527da09>Loading check-in data...</p></div>', 1)
      ])])) : (y(), x("div", Yp, [
        g.value.nodes.length > 0 ? (y(), x("section", qp, [
          c("div", Up, [
            Z(be, {
              data: g.value,
              height: "500px",
              "node-colors": u.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : E("", !0),
        r.value && r.value.length > 0 ? (y(), x("section", Kp, [
          c("div", Xp, [
            c("table", Gp, [
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
              c("tbody", Zp, [
                (y(!0), x(U, null, tt(r.value, (b) => (y(), x("tr", {
                  key: b.date,
                  class: "table-row"
                }, [
                  c("td", Qp, M(T(At)(b.date).format("DD/MM/YYYY")), 1),
                  c("td", Jp, M(T(Y)(b.checkin_initiated_count)), 1),
                  c("td", t0, M(f(b.checkin_init_count, b.checkin_initiated_count)), 1),
                  c("td", e0, M(T(Y)(b.checkin_started_count)), 1),
                  c("td", a0, M(f(b.checkin_completed_count, b.checkin_started_count)), 1),
                  c("td", s0, M(f(b.checkin_closed_count, b.checkin_started_count)), 1),
                  c("td", n0, M(f(v(b.failed_steps), b.checkin_started_count)), 1),
                  c("td", o0, [
                    b.failed_steps && b.failed_steps.length > 0 ? (y(), x("div", i0, [
                      (y(!0), x(U, null, tt(b.failed_steps, ($) => (y(), x("div", {
                        key: $.step_name,
                        class: "failed-step-item"
                      }, [
                        c("span", r0, M($.step_name.replace(/_/g, " ")) + ":", 1),
                        c("span", l0, M($.failed_count), 1)
                      ]))), 128))
                    ])) : (y(), x("div", c0, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), ht(T(_t), {
            key: 0,
            onExport: s,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", d0, [...p[2] || (p[2] = [
          et('<div class="empty-state-content" data-v-d527da09><div class="empty-icon-wrapper" data-v-d527da09><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d527da09><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-d527da09></path></svg></div><p class="empty-title" data-v-d527da09>No check-in data available</p><p class="empty-description" data-v-d527da09>Try adjusting the date range or check your filters to see check-in performance data.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}, h0 = /* @__PURE__ */ at(u0, [["__scopeId", "data-v-d527da09"]]), f0 = { class: "checkin-metrics-card" }, g0 = {
  key: 0,
  class: "loading-state"
}, p0 = {
  key: 1,
  class: "card-body"
}, v0 = {
  key: 0,
  class: "sankey-section"
}, b0 = {
  key: 1,
  class: "table-section"
}, m0 = { class: "table-wrapper" }, y0 = { class: "data-table" }, _0 = { class: "table-body" }, x0 = { class: "table-cell date-cell" }, k0 = { class: "table-cell text-center" }, w0 = { class: "table-cell text-center" }, $0 = { class: "table-cell text-center" }, M0 = { class: "table-cell text-center" }, C0 = { class: "table-cell text-center" }, S0 = { class: "table-cell text-center" }, D0 = { class: "table-cell reasons-cell" }, A0 = {
  key: 0,
  class: "reasons-list"
}, T0 = { class: "reason-name" }, B0 = { class: "reason-count" }, L0 = {
  key: 1,
  class: "no-reasons"
}, F0 = {
  key: 2,
  class: "empty-state"
}, P0 = { class: "empty-state-content" }, E0 = { class: "empty-icon-wrapper" }, fs = 3, R0 = /* @__PURE__ */ Q({
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
      const w = new Date($), k = String(w.getDate()).padStart(2, "0"), C = String(w.getMonth() + 1).padStart(2, "0"), D = w.getFullYear();
      return `${k}/${C}/${D}`;
    }, d = ($) => $.replace(/_/g, " ").replace(/\b\w/g, (w) => w.toUpperCase()), u = ($, w) => !w || w === 0 ? "0%" : `${Math.round($ / w * 100)}%`, h = ($, w) => {
      const k = $ || 0, C = w || 0, D = r(k), A = u(k, C);
      return `${D} (${A})`;
    }, f = ($) => $ ? $.reduce((w, k) => w + k.failed_count, 0) : 0, v = S(() => {
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
      return (s.failedData?.unrecovered_by_step || []).forEach((k) => {
        const D = k.step_name.replace(/_/g, " ").split(" ").map((P) => P.charAt(0).toUpperCase() + P.slice(1)).join(" "), A = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        $[D] = A[D] || "#DC2626";
      }), $;
    }), g = nt(!1), _ = S(() => {
      const $ = s.checkinData?.checkin_by_day || [], w = s.failedData?.failed_by_step_by_day || [];
      return $.map((C) => {
        const D = w.find((A) => A.date === C.date);
        return {
          ...C,
          failed_steps: D?.steps || []
        };
      }).sort((C, D) => new Date(C.date).getTime() - new Date(D.date).getTime());
    }), m = S(() => g.value ? _.value : _.value.slice(0, fs)), p = S(() => _.value.length > fs), b = S(() => {
      const $ = [], w = [], k = /* @__PURE__ */ new Set(), C = (it) => {
        k.has(it) || ($.push({ name: it }), k.add(it));
      };
      if (!s.checkinData?.total_checkin_initiated)
        return { nodes: $, links: w };
      C("Checkin Init"), C("Booking retrive"), C("Booking retrive success"), C("Number of Passengers"), C("Completed"), C("Closed with BP");
      const D = s.checkinData.total_checkin_initiated || 0, A = s.checkinData.total_checkin_init || 0, P = s.checkinData.total_checkin_init_abandoned || 0, R = s.checkinData.total_checkin_pre_init_abandoned_error, I = s.checkinData.total_checkin_pre_init_abandoned_voluntary, V = R != null || I != null, q = V ? Math.max(Number(R) || 0, 0) : 0, L = V ? Math.max(Number(I) || 0, 0) : 0, F = s.checkinData.total_checkin_init_abandoned_error, O = s.checkinData.total_checkin_init_abandoned_voluntary, W = F != null || O != null, N = W ? Math.max(Number(F) || 0, 0) : 0, H = W ? Math.max(Number(O) || 0, 0) : 0, j = W ? Math.max(P - N - H, 0) : P, st = A - P, J = s.checkinData.total_checkin_started || 0, X = s.checkinData.total_checkin_completed || 0, ct = s.checkinData.total_checkin_closed || 0, wt = s.failedData?.unrecovered_by_step || [], gt = wt.reduce((it, ie) => it + ie.count, 0);
      if (A > 0) {
        const it = Math.round(A / D * 100);
        w.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: A,
          label: `${A.toLocaleString()} (${it}%)`
        });
      }
      const Ft = D - A;
      if (V) {
        if (L > 0) {
          const it = Math.round(L / D * 100);
          C("Abandoned (Init)"), w.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: L,
            label: `${L.toLocaleString()} (${it}%)`
          });
        }
        if (q > 0) {
          const it = Math.round(q / D * 100);
          C("Booking not retreived"), w.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: q,
            label: `${q.toLocaleString()} (${it}%)`
          });
        }
      } else if (Ft > 0) {
        const it = Math.round(Ft / D * 100);
        C("Abandoned (Init)"), w.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: Ft,
          label: `${Ft.toLocaleString()} (${it}%)`
        });
      }
      if (W) {
        if (N > 0) {
          const it = Math.round(N / D * 100);
          C("Error"), w.push({
            source: "Booking retrive",
            target: "Error",
            value: N,
            label: `${N.toLocaleString()} (${it}%)`
          });
        }
        if (H > 0) {
          const it = Math.round(H / D * 100);
          C("Abandoned (Started)"), w.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: H,
            label: `${H.toLocaleString()} (${it}%)`
          });
        }
        if (j > 0) {
          const it = Math.round(j / D * 100);
          C("Abandoned (Started)"), w.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: j,
            label: `${j.toLocaleString()} (${it}%)`
          });
        }
      } else if (P > 0) {
        const it = Math.round(P / D * 100);
        C("Abandoned (Started)"), w.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: P,
          label: `${P.toLocaleString()} (${it}%)`
        });
      }
      if (st > 0) {
        const it = Math.round(st / D * 100);
        w.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: st,
          label: `${st.toLocaleString()} (${it}%)`
        });
      }
      if (J > 0) {
        const it = Math.round(J / D * 100);
        w.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: J,
          label: `${J.toLocaleString()} (${it}%)`
        });
      }
      if (X > 0) {
        const it = Math.round(X / J * 100);
        w.push({
          source: "Number of Passengers",
          target: "Completed",
          value: X,
          label: `${X.toLocaleString()} (${it}%)`
        });
      }
      if (wt.length > 0 && gt > 0) {
        C("Unrecovered");
        const it = Math.round(gt / J * 100);
        w.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: gt,
          label: `${gt.toLocaleString()} (${it}%)`
        }), wt.forEach((ie) => {
          const Ne = ie.step_name.replace(/_/g, " ").split(" ").map((We) => We.charAt(0).toUpperCase() + We.slice(1)).join(" "), va = Math.round(ie.count / J * 100);
          C(Ne), w.push({
            source: "Unrecovered",
            target: Ne,
            value: ie.count,
            label: `${ie.count.toLocaleString()} (${va}%)`
          });
        });
      }
      const It = J - (X + gt);
      if (It > 0) {
        const it = Math.round(It / J * 100);
        C("Abandoned (Flow)"), w.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: It,
          label: `${It.toLocaleString()} (${it}%)`
        });
      }
      const qt = X - ct;
      if (qt > 0) {
        const it = Math.round(qt / J * 100);
        C("BP Error"), w.push({
          source: "Completed",
          target: "BP Error",
          value: qt,
          label: `${qt.toLocaleString()} (${it}%)`
        });
      }
      if (ct > 0) {
        const it = Math.round(ct / J * 100);
        w.push({
          source: "Completed",
          target: "Closed with BP",
          value: ct,
          label: `${ct.toLocaleString()} (${it}%)`
        });
      }
      return { nodes: $, links: w };
    });
    return t({ isDark: i }), ($, w) => (y(), x("article", f0, [
      w[6] || (w[6] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Check-in Metrics"),
          c("p", { class: "card-subtitle" }, "Check-in performance and failure analysis")
        ])
      ], -1)),
      e.loading ? (y(), x("div", g0, [...w[1] || (w[1] = [
        et('<div class="loading-container" data-v-eefc834b><div class="chart-bars-loader" data-v-eefc834b><div class="bar bar-1" data-v-eefc834b></div><div class="bar bar-2" data-v-eefc834b></div><div class="bar bar-3" data-v-eefc834b></div><div class="bar bar-4" data-v-eefc834b></div><div class="bar bar-5" data-v-eefc834b></div></div><p class="loading-text" data-v-eefc834b>Loading check-in data...</p></div>', 1)
      ])])) : (y(), x("div", p0, [
        b.value.nodes.length > 0 ? (y(), x("div", v0, [
          Z(be, {
            data: b.value,
            height: "500px",
            "node-colors": v.value,
            "use-gradient": !1,
            "node-gap": 30
          }, null, 8, ["data", "node-colors"])
        ])) : E("", !0),
        _.value && _.value.length > 0 ? (y(), x("div", b0, [
          c("div", m0, [
            c("table", y0, [
              w[2] || (w[2] = c("thead", null, [
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
              c("tbody", _0, [
                (y(!0), x(U, null, tt(m.value, (k) => (y(), x("tr", {
                  key: k.date,
                  class: "table-row"
                }, [
                  c("td", x0, M(l(k.date)), 1),
                  c("td", k0, M(r(k.checkin_initiated_count)), 1),
                  c("td", w0, M(h(k.checkin_init_count, k.checkin_initiated_count)), 1),
                  c("td", $0, M(r(k.checkin_started_count)), 1),
                  c("td", M0, M(h(k.checkin_completed_count, k.checkin_started_count)), 1),
                  c("td", C0, M(h(k.checkin_closed_count, k.checkin_started_count)), 1),
                  c("td", S0, M(h(f(k.failed_steps), k.checkin_started_count)), 1),
                  c("td", D0, [
                    k.failed_steps && k.failed_steps.length > 0 ? (y(), x("div", A0, [
                      (y(!0), x(U, null, tt(k.failed_steps, (C) => (y(), x("div", {
                        key: C.step_name,
                        class: "reason-item"
                      }, [
                        c("span", T0, M(d(C.step_name)) + ":", 1),
                        c("span", B0, M(C.failed_count), 1)
                      ]))), 128))
                    ])) : (y(), x("div", L0, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          p.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: w[0] || (w[0] = (k) => g.value = !g.value)
          }, [
            kt(M(g.value ? "View less" : `View more (${_.value.length - fs} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: G(["view-more-icon", { "view-more-icon-rotated": g.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...w[3] || (w[3] = [
              c("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : E("", !0),
          e.enableExport ? (y(), ht(T(_t), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("div", F0, [
          c("div", P0, [
            c("div", E0, [
              Z(T(Rt), { class: "empty-icon" })
            ]),
            w[4] || (w[4] = c("p", { class: "empty-title" }, "No check-in data available", -1)),
            w[5] || (w[5] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see check-in metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), I0 = /* @__PURE__ */ at(R0, [["__scopeId", "data-v-eefc834b"]]), O0 = { class: "checkin-segments-card" }, z0 = {
  key: 0,
  class: "loading-state"
}, V0 = {
  key: 1,
  class: "card-body"
}, N0 = {
  key: 0,
  class: "table-section"
}, W0 = { class: "table-wrapper" }, H0 = { class: "data-table" }, j0 = { class: "table-body" }, Y0 = { class: "table-cell font-medium text-center" }, q0 = { class: "airport-badge" }, U0 = { class: "table-cell text-center" }, K0 = {
  key: 0,
  class: "airport-badge connection"
}, X0 = {
  key: 1,
  class: "empty-connection"
}, G0 = { class: "table-cell text-center" }, Z0 = { class: "airport-badge" }, Q0 = { class: "table-cell text-center" }, J0 = {
  key: 0,
  class: "trip-badge roundtrip"
}, tv = {
  key: 1,
  class: "trip-badge oneway"
}, ev = { class: "table-cell text-center" }, av = { class: "table-cell text-center" }, sv = { class: "percentage-value" }, nv = { class: "table-cell text-center" }, ov = { class: "percentage-value" }, iv = { class: "table-cell text-center" }, rv = { class: "percentage-value success" }, lv = {
  key: 1,
  class: "empty-state"
}, gs = 3, cv = /* @__PURE__ */ Q({
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
    }, { isDark: i } = lt(rt(s, "theme")), r = nt(!1), l = S(() => r.value ? s.data : s.data.slice(0, gs)), d = S(() => s.data.length > gs), u = (v, g) => !g || g === 0 || !v ? "0%" : `${Math.round(v / g * 100)}%`, h = (v) => !v || v === "None" ? "-" : String(v).trim().replace(/_[0-9]+$/i, ""), f = (v) => {
      const g = h(v?.departure_airport), _ = h(v?.arrival_airport);
      return g === "-" || _ === "-" ? !1 : g === _;
    };
    return t({ isDark: i }), (v, g) => (y(), x("article", O0, [
      g[7] || (g[7] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Checkin Segments"),
          c("p", { class: "card-subtitle" }, "Breakdown by flight segment with connection when applicable")
        ])
      ], -1)),
      s.loading ? (y(), x("div", z0, [...g[1] || (g[1] = [
        et('<div class="loading-container" data-v-a1ebd82a><div class="chart-flow-loader" data-v-a1ebd82a><div class="flow-line flow-1" data-v-a1ebd82a></div><div class="flow-line flow-2" data-v-a1ebd82a></div><div class="flow-line flow-3" data-v-a1ebd82a></div><div class="flow-line flow-4" data-v-a1ebd82a></div><div class="flow-line flow-5" data-v-a1ebd82a></div></div><p class="loading-text" data-v-a1ebd82a>Loading segment data...</p></div>', 1)
      ])])) : (y(), x("div", V0, [
        s.data.length > 0 ? (y(), x("section", N0, [
          c("div", W0, [
            c("table", H0, [
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
              c("tbody", j0, [
                (y(!0), x(U, null, tt(l.value, (_, m) => (y(), x("tr", {
                  key: m,
                  class: "table-row"
                }, [
                  c("td", Y0, [
                    c("span", q0, M(h(_.departure_airport)), 1)
                  ]),
                  c("td", U0, [
                    h(_.conexion_airport) !== "-" ? (y(), x("span", K0, M(h(_.conexion_airport)), 1)) : (y(), x("span", X0, "-"))
                  ]),
                  c("td", G0, [
                    c("span", Z0, M(h(_.arrival_airport)), 1)
                  ]),
                  c("td", Q0, [
                    f(_) ? (y(), x("span", J0, [...g[2] || (g[2] = [
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
                    ])])) : (y(), x("span", tv, [...g[3] || (g[3] = [
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
                  c("td", ev, M(T(Y)(_.segment_init_count)), 1),
                  c("td", av, [
                    c("span", sv, M(u(_.segment_started_count, _.segment_init_count)), 1)
                  ]),
                  c("td", nv, [
                    c("span", ov, M(u(_.segment_completed_count, _.segment_init_count)), 1)
                  ]),
                  c("td", iv, [
                    c("span", rv, M(u(_.segment_closed_count, _.segment_init_count)), 1)
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
            kt(M(r.value ? "View less" : `View more (${s.data.length - gs} more rows)`) + " ", 1),
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
          e.enableExport ? (y(), ht(T(_t), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", lv, [...g[6] || (g[6] = [
          et('<div class="empty-state-content" data-v-a1ebd82a><div class="empty-icon-wrapper" data-v-a1ebd82a><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-a1ebd82a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-a1ebd82a></path></svg></div><p class="empty-title" data-v-a1ebd82a>No segment data available</p><p class="empty-description" data-v-a1ebd82a>No flight segment data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), dv = /* @__PURE__ */ at(cv, [["__scopeId", "data-v-a1ebd82a"]]), uv = { class: "disruption-metrics-card" }, hv = { class: "card-header" }, fv = { class: "header-content" }, gv = {
  key: 0,
  class: "payment-success-badge"
}, pv = {
  key: 0,
  class: "currency-breakdown-list"
}, vv = {
  key: 1,
  class: "badge-value"
}, bv = {
  key: 0,
  class: "loading-state"
}, mv = {
  key: 1,
  class: "card-body"
}, yv = { class: "chart-section" }, _v = { class: "chart-wrapper" }, xv = {
  key: 1,
  class: "empty-chart"
}, kv = {
  key: 0,
  class: "table-section"
}, wv = { class: "table-wrapper" }, $v = { class: "data-table" }, Mv = { class: "table-body" }, Cv = { class: "table-cell font-medium text-center" }, Sv = { class: "table-cell text-center" }, Dv = { class: "table-cell text-center" }, Av = { class: "percentage-text" }, Tv = { class: "table-cell text-center" }, Bv = { class: "abandoned-value" }, Lv = { class: "table-cell" }, Fv = { class: "badges-container badges-wrap" }, Pv = { class: "badge badge-vol" }, Ev = { class: "badge badge-confirm" }, Rv = { class: "badge badge-not-confirm" }, Iv = { class: "badge badge-reject" }, Ov = { class: "badge badge-not-paid" }, zv = { class: "badge badge-success" }, Vv = { class: "table-cell" }, Nv = { class: "badges-container badges-wrap" }, Wv = { class: "badge badge-inv" }, Hv = { class: "badge badge-human" }, jv = { class: "badge badge-accept" }, Yv = {
  key: 1,
  class: "empty-state"
}, ps = 3, qv = /* @__PURE__ */ Q({
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
    const a = e, s = t, n = (m) => {
      s("export", m);
    }, o = nt(!1), i = S(() => a.data?.disruption_by_day ? [...a.data.disruption_by_day].sort(
      (m, p) => new Date(m.date).getTime() - new Date(p.date).getTime()
    ) : []), r = S(() => o.value ? i.value : i.value.slice(0, ps)), l = S(() => i.value.length > ps), d = S(() => a.data?.total_payment_success || []), u = (m, p) => !p || p === 0 ? "0%" : `${Math.round(m / p * 100)}%`, h = (m) => ft(m), f = (m) => (m ?? []).reduce((p, b) => p + (b.count ?? 0), 0), v = (m) => typeof m.sell_success_count == "number" ? m.sell_success_count : f(m.payment_success_total), g = S(() => {
      const m = a.data, p = m.total_disruption_conversations || 0, b = m.total_disruption_initiated || 0, $ = m.total_voluntary || 0, w = m.total_involuntary || 0, k = m.total_accepted || 0, C = m.total_confirmed || 0, D = typeof m.total_sell_success == "number" ? m.total_sell_success : f(m.total_payment_success), A = m.total_sell_failed || 0, P = Math.max(0, p - b), R = Math.max(0, b - $ - w), I = Math.max(0, w - k), V = Math.max(0, $ - C), q = A, L = Math.max(0, C - D - q), F = (N, H) => {
        const j = H > 0 ? Math.round(N / H * 100) : 0;
        return `${N.toLocaleString()} (${j}%)`;
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
      ], W = [];
      return b > 0 && W.push({
        source: "Initiated",
        target: "Started",
        value: b,
        label: F(b, p)
      }), P > 0 && W.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: P,
        label: F(P, p)
      }), $ > 0 && W.push({
        source: "Started",
        target: "Voluntary",
        value: $,
        label: F($, p)
      }), w > 0 && W.push({
        source: "Started",
        target: "Involuntary",
        value: w,
        label: F(w, p)
      }), R > 0 && W.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: R,
        label: F(R, p)
      }), k > 0 && W.push({
        source: "Involuntary",
        target: "Accepted",
        value: k,
        label: F(k, p)
      }), I > 0 && W.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: I,
        label: F(I, p)
      }), C > 0 && W.push({
        source: "Voluntary",
        target: "Confirmed",
        value: C,
        label: F(C, p)
      }), V > 0 && W.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: V,
        label: F(V, p)
      }), D > 0 && W.push({
        source: "Confirmed",
        target: "Paid",
        value: D,
        label: F(D, p)
      }), q > 0 && W.push({
        source: "Confirmed",
        target: "Rejected",
        value: q,
        label: F(q, p)
      }), L > 0 && W.push({
        source: "Confirmed",
        target: "Not Paid",
        value: L,
        label: F(L, p)
      }), { nodes: O, links: W };
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
    return (m, p) => (y(), x("article", uv, [
      c("header", hv, [
        c("div", fv, [
          p[2] || (p[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Disruption Manager Metrics"),
            c("p", { class: "card-subtitle" }, "Disruption workflow performance and completion tracking")
          ], -1)),
          a.loading ? E("", !0) : (y(), x("div", gv, [
            p[1] || (p[1] = c("p", { class: "badge-label" }, "Payment Success Value", -1)),
            d.value.length > 0 ? (y(), x("div", pv, [
              (y(!0), x(U, null, tt(d.value, (b) => (y(), x("p", {
                key: b.currency,
                class: "currency-breakdown-item"
              }, M(b.currency) + " " + M(h(b.total_value)), 1))), 128))
            ])) : (y(), x("p", vv, M(h(0)), 1))
          ]))
        ])
      ]),
      a.loading ? (y(), x("div", bv, [...p[3] || (p[3] = [
        et('<div class="loading-container" data-v-47c8f691><div class="chart-bars-loader" data-v-47c8f691><div class="bar bar-1" data-v-47c8f691></div><div class="bar bar-2" data-v-47c8f691></div><div class="bar bar-3" data-v-47c8f691></div><div class="bar bar-4" data-v-47c8f691></div><div class="bar bar-5" data-v-47c8f691></div></div><p class="loading-text" data-v-47c8f691>Loading disruption data...</p></div>', 1)
      ])])) : (y(), x("div", mv, [
        c("section", yv, [
          c("div", _v, [
            g.value.nodes.length > 0 && g.value.links.length > 0 ? (y(), ht(be, {
              key: 0,
              data: g.value,
              "node-colors": _,
              height: "500px"
            }, null, 8, ["data"])) : (y(), x("div", xv, [...p[4] || (p[4] = [
              c("p", { class: "empty-chart-text" }, "No disruption data available for visualization", -1)
            ])]))
          ])
        ]),
        i.value && i.value.length > 0 ? (y(), x("section", kv, [
          p[7] || (p[7] = et('<div class="section-header" data-v-47c8f691><h4 class="section-title" data-v-47c8f691>Daily Overview</h4></div><div class="legend-container" data-v-47c8f691><p class="legend-title" data-v-47c8f691>Legend</p><div class="legend-items" data-v-47c8f691><div class="legend-group" data-v-47c8f691><span class="legend-label" data-v-47c8f691>Voluntary:</span><span class="badge badge-vol" data-v-47c8f691>VOL</span></div><div class="legend-group" data-v-47c8f691><span class="legend-label" data-v-47c8f691>Involuntary:</span><span class="badge badge-inv" data-v-47c8f691>INV</span></div><div class="legend-note" data-v-47c8f691><span data-v-47c8f691>Vol=Voluntary</span><span data-v-47c8f691>•</span><span data-v-47c8f691>Inv=Involuntary</span></div></div></div>', 2)),
          c("div", wv, [
            c("table", $v, [
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
              c("tbody", Mv, [
                (y(!0), x(U, null, tt(r.value, (b) => (y(), x("tr", {
                  key: b.date,
                  class: "table-row"
                }, [
                  c("td", Cv, M(T(At)(b.date).format("DD/MM")), 1),
                  c("td", Sv, M(T(Y)(b.disruption_conversations)), 1),
                  c("td", Dv, [
                    kt(M(T(Y)(b.disruption_initiated_count)) + " ", 1),
                    c("span", Av, " (" + M(u(b.disruption_initiated_count, b.disruption_conversations)) + ") ", 1)
                  ]),
                  c("td", Tv, [
                    c("span", Bv, M(T(Y)(b.disruption_initiated_count - b.voluntary_count - b.involuntary_count)) + " (" + M(u(b.disruption_initiated_count - b.voluntary_count - b.involuntary_count, b.disruption_conversations)) + ") ", 1)
                  ]),
                  c("td", Lv, [
                    c("div", Fv, [
                      c("span", Pv, " VOL " + M(T(Y)(b.voluntary_count)) + " (" + M(u(b.voluntary_count, b.disruption_conversations)) + ") ", 1),
                      c("span", Ev, " Confirm " + M(T(Y)(b.confirmed_count)) + " (" + M(u(b.confirmed_count, b.disruption_conversations)) + ") ", 1),
                      c("span", Rv, " Not Confirm " + M(T(Y)(b.voluntary_count - b.confirmed_count)) + " (" + M(u(b.voluntary_count - b.confirmed_count, b.disruption_conversations)) + ") ", 1),
                      c("span", Iv, " Reject " + M(T(Y)(b.sell_failed_count)) + " (" + M(u(b.sell_failed_count, b.disruption_conversations)) + ") ", 1),
                      c("span", Ov, " Not Paid " + M(T(Y)(Math.max(0, b.confirmed_count - v(b) - b.sell_failed_count))) + " (" + M(u(Math.max(0, b.confirmed_count - v(b) - b.sell_failed_count), b.disruption_conversations)) + ") ", 1),
                      c("span", zv, " Finish " + M(T(Y)(v(b))) + " (" + M(u(v(b), b.disruption_conversations)) + ") ", 1),
                      (y(!0), x(U, null, tt(b.payment_success_total || [], ($) => (y(), x("span", {
                        key: `${b.date}-${$.currency}`,
                        class: "badge badge-currency"
                      }, M($.currency) + " " + M(h($.total_value)), 1))), 128))
                    ])
                  ]),
                  c("td", Vv, [
                    c("div", Nv, [
                      c("span", Wv, " INV " + M(T(Y)(b.involuntary_count)) + " (" + M(u(b.involuntary_count, b.disruption_conversations)) + ") ", 1),
                      c("span", Hv, " Human " + M(T(Y)(b.involuntary_count - b.accepted_count)) + " (" + M(u(b.involuntary_count - b.accepted_count, b.disruption_conversations)) + ") ", 1),
                      c("span", jv, " Accept " + M(T(Y)(b.accepted_count)) + " (" + M(u(b.accepted_count, b.disruption_conversations)) + ") ", 1)
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
            kt(M(o.value ? "View less" : `View more (${i.value.length - ps} more rows)`) + " ", 1),
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
          e.enableExport ? (y(), ht(T(_t), {
            key: 1,
            onExport: n,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", Yv, [...p[8] || (p[8] = [
          et('<div class="empty-state-content" data-v-47c8f691><div class="empty-icon-wrapper" data-v-47c8f691><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-47c8f691><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" data-v-47c8f691></path></svg></div><p class="empty-title" data-v-47c8f691>No disruption data available</p><p class="empty-description" data-v-47c8f691>No disruption data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Uv = /* @__PURE__ */ at(qv, [["__scopeId", "data-v-47c8f691"]]), Kv = { class: "faq-metrics-card" }, Xv = {
  key: 0,
  class: "card-body"
}, Gv = { class: "kpi-grid" }, Zv = { class: "kpi-card" }, Qv = { class: "kpi-value" }, Jv = { class: "kpi-card" }, tb = { class: "kpi-value" }, eb = { class: "kpi-card kpi-card--airline" }, ab = { class: "kpi-value" }, sb = { class: "kpi-card kpi-card--booking" }, nb = { class: "kpi-value" }, ob = { class: "kpi-card kpi-card--flight" }, ib = { class: "kpi-value" }, rb = {
  key: 0,
  class: "chart-section"
}, lb = {
  key: 1,
  class: "empty-state"
}, cb = {
  key: 1,
  class: "loading-state"
}, db = /* @__PURE__ */ Q({
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
    const s = e, n = a, o = (f) => {
      n("export", f);
    }, { isDark: i, colors: r } = lt(rt(s, "theme")), l = nt({ labels: [], datasets: [] }), d = S(() => s.data ?? {
      total_faq_events: 0,
      total_documents_found: 0,
      total_airline_information_retrieved: 0,
      total_booking_info_retrieved: 0,
      total_flight_status_retrieved: 0,
      faq_by_day: []
    }), u = S(() => ({
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
        const g = v.map((b) => At(b.date).format("MMM DD")), _ = v.map((b) => b.airline_information_retrieved_count || 0), m = v.map((b) => b.flight_status_retrieved_count || 0), p = v.map((b) => b.booking_info_retrieved_count || 0);
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
    return Nt(
      () => s.data,
      (f) => {
        h(f ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: i }), (f, v) => (y(), x("article", Kv, [
      v[7] || (v[7] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "FAQ Metrics"),
          c("p", { class: "card-subtitle" }, "Daily FAQ consultation and retrieval metrics")
        ])
      ], -1)),
      s.loading ? (y(), x("div", cb, [...v[6] || (v[6] = [
        et('<div class="loading-container" data-v-5d2c3c33><div class="chart-bars-loader" data-v-5d2c3c33><div class="bar bar-1" data-v-5d2c3c33></div><div class="bar bar-2" data-v-5d2c3c33></div><div class="bar bar-3" data-v-5d2c3c33></div><div class="bar bar-4" data-v-5d2c3c33></div><div class="bar bar-5" data-v-5d2c3c33></div></div><p class="loading-text" data-v-5d2c3c33>Loading FAQ metrics...</p></div>', 1)
      ])])) : (y(), x("div", Xv, [
        c("div", Gv, [
          c("div", Zv, [
            v[0] || (v[0] = c("span", { class: "kpi-label" }, "Total FAQ", -1)),
            c("span", Qv, M(T(Y)(d.value.total_faq_events)), 1)
          ]),
          c("div", Jv, [
            v[1] || (v[1] = c("span", { class: "kpi-label" }, "Documents Found", -1)),
            c("span", tb, M(T(Y)(d.value.total_documents_found)), 1)
          ]),
          c("div", eb, [
            v[2] || (v[2] = c("div", { class: "kpi-label-row" }, [
              c("span", {
                class: "kpi-color-dot",
                "aria-hidden": "true"
              }),
              c("span", { class: "kpi-label" }, "Airline Info")
            ], -1)),
            c("span", ab, M(T(Y)(d.value.total_airline_information_retrieved)), 1)
          ]),
          c("div", sb, [
            v[3] || (v[3] = c("div", { class: "kpi-label-row" }, [
              c("span", {
                class: "kpi-color-dot",
                "aria-hidden": "true"
              }),
              c("span", { class: "kpi-label" }, "Booking Info")
            ], -1)),
            c("span", nb, M(T(Y)(d.value.total_booking_info_retrieved)), 1)
          ]),
          c("div", ob, [
            v[4] || (v[4] = c("div", { class: "kpi-label-row" }, [
              c("span", {
                class: "kpi-color-dot",
                "aria-hidden": "true"
              }),
              c("span", { class: "kpi-label" }, "Flight Status")
            ], -1)),
            c("span", ib, M(T(Y)(d.value.total_flight_status_retrieved)), 1)
          ])
        ]),
        l.value.labels && l.value.labels.length ? (y(), x("section", rb, [
          Z(ve, {
            data: l.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ht(T(_t), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", lb, [...v[5] || (v[5] = [
          et('<div class="empty-state-content" data-v-5d2c3c33><div class="empty-icon-wrapper" data-v-5d2c3c33><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-5d2c3c33><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-5d2c3c33></path></svg></div><p class="empty-title" data-v-5d2c3c33>No FAQ data available</p><p class="empty-description" data-v-5d2c3c33>No FAQ consultation data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), ub = /* @__PURE__ */ at(db, [["__scopeId", "data-v-5d2c3c33"]]), hb = { class: "messages-per-agent-card" }, fb = {
  key: 0,
  class: "card-body"
}, gb = {
  key: 0,
  class: "chart-section"
}, pb = {
  key: 1,
  class: "empty-state"
}, vb = { class: "empty-state-content" }, bb = { class: "empty-icon-wrapper" }, mb = {
  key: 1,
  class: "loading-state"
}, yb = /* @__PURE__ */ Q({
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
    }, { isDark: r, colors: l } = lt(rt(n, "theme")), d = S(() => {
      const h = n.data?.agents_by_day || {}, f = Object.keys(h).sort();
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const v = /* @__PURE__ */ new Set();
      for (const m of Object.values(h))
        for (const p of Object.keys(m))
          v.add(p);
      const _ = Array.from(v).map((m) => {
        const p = s[m] || "#94a3b8";
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
    }), u = S(() => n.options ? n.options : {
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
    return t({ isDark: r }), (h, f) => (y(), x("article", hb, [
      f[3] || (f[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Messages per Agent"),
          c("p", { class: "card-subtitle" }, "Agent interaction trends over time")
        ])
      ], -1)),
      e.loading ? (y(), x("div", mb, [...f[2] || (f[2] = [
        et('<div class="loading-container" data-v-b9368fc2><div class="chart-lines-loader" data-v-b9368fc2><div class="line line-1" data-v-b9368fc2></div><div class="line line-2" data-v-b9368fc2></div><div class="line line-3" data-v-b9368fc2></div><div class="line line-4" data-v-b9368fc2></div><div class="line line-5" data-v-b9368fc2></div></div><p class="loading-text" data-v-b9368fc2>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", fb, [
        d.value.labels && d.value.labels.length ? (y(), x("section", gb, [
          Z(ve, {
            data: d.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ht(T(_t), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", pb, [
          c("div", vb, [
            c("div", bb, [
              Z(T(Rt), { class: "empty-icon" })
            ]),
            f[0] || (f[0] = c("p", { class: "empty-title" }, "No agent interactions data", -1)),
            f[1] || (f[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), _b = /* @__PURE__ */ at(yb, [["__scopeId", "data-v-b9368fc2"]]), xb = { class: "record-locator-card" }, kb = {
  key: 0,
  class: "loading-state"
}, wb = {
  key: 1,
  class: "card-body"
}, $b = {
  key: 0,
  class: "chart-section"
}, Mb = { class: "chart-wrapper" }, Cb = {
  key: 1,
  class: "table-section"
}, Sb = { class: "table-wrapper" }, Db = { class: "data-table" }, Ab = { class: "table-header-row" }, Tb = {
  key: 0,
  class: "table-header"
}, Bb = {
  key: 1,
  class: "table-header"
}, Lb = { class: "table-body" }, Fb = { class: "table-cell font-medium" }, Pb = { class: "table-cell text-center" }, Eb = { class: "table-cell text-center" }, Rb = { class: "table-cell text-center" }, Ib = { class: "table-cell text-center" }, Ob = { class: "table-cell text-center success-value" }, zb = { class: "table-cell text-center failed-value" }, Vb = { class: "table-cell text-center warning-value" }, Nb = {
  key: 0,
  class: "table-cell text-center"
}, Wb = {
  key: 1,
  class: "table-cell text-center failed-value"
}, Hb = {
  key: 2,
  class: "empty-state"
}, vs = 3, jb = /* @__PURE__ */ Q({
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
    const s = e, n = a, o = (m) => {
      n("export", m);
    }, { isDark: i } = lt(rt(s, "theme")), r = nt(!1), l = S(() => s.data?.record_locator_by_day ? [...s.data.record_locator_by_day].sort(
      (m, p) => new Date(m.date).getTime() - new Date(p.date).getTime()
    ) : []), d = S(() => r.value ? l.value : l.value.slice(0, vs)), u = S(() => l.value.length > vs), h = S(() => s.data), f = S(() => ({
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
      const b = Y(m), $ = v(m, p);
      return `${b} (${$})`;
    }, _ = S(() => {
      const m = [], p = [], b = /* @__PURE__ */ new Set(), $ = (X) => {
        b.has(X) || (m.push({ name: X }), b.add(X));
      };
      if (!h.value.total_checkin_initiated)
        return { nodes: m, links: p };
      $("Checkin Init"), $("Booking retrive"), $("Checkin Started"), $("Checkin Completed"), $("Checkin Closed");
      const w = h.value.total_checkin_initiated, k = h.value.total_record_locator_init, C = h.value.total_record_locator_started, D = h.value.total_record_locator_completed, A = h.value.total_record_locator_closed, P = h.value.total_record_locator_failed, R = h.value.total_record_locator_abandoned, I = h.value.total_record_locator_init_abandoned, V = h.value.total_checkin_pre_init_abandoned_error, q = h.value.total_checkin_pre_init_abandoned_voluntary, L = V != null || q != null, F = L ? Math.max(Number(V) || 0, 0) : 0, O = L ? Math.max(Number(q) || 0, 0) : 0, W = h.value.total_record_locator_init_abandoned_error, N = h.value.total_record_locator_init_abandoned_voluntary, H = W != null || N != null, j = H ? Math.max(Number(W) || 0, 0) : 0, st = H ? Math.max(Number(N) || 0, 0) : 0;
      if (k > 0) {
        const X = Math.round(k / w * 100);
        p.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: k,
          label: `${k.toLocaleString()} (${X}%)`
        });
      }
      const J = w - k;
      if (L) {
        if (O > 0) {
          const X = Math.round(O / w * 100);
          $("Abandoned (Init)"), p.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: O,
            label: `${O.toLocaleString()} (${X}%)`
          });
        }
        if (F > 0) {
          const X = Math.round(F / w * 100);
          $("Booking not retreived"), p.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: F,
            label: `${F.toLocaleString()} (${X}%)`
          });
        }
      } else if (J > 0) {
        const X = Math.round(J / w * 100);
        $("Abandoned (Init)"), p.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: J,
          label: `${J.toLocaleString()} (${X}%)`
        });
      }
      if (C > 0) {
        const X = Math.round(C / w * 100);
        p.push({
          source: "Booking retrive",
          target: "Checkin Started",
          value: C,
          label: `${C.toLocaleString()} (${X}%)`
        });
      }
      if (H) {
        if (j > 0) {
          const X = Math.round(j / w * 100);
          $("Error"), p.push({
            source: "Booking retrive",
            target: "Error",
            value: j,
            label: `${j.toLocaleString()} (${X}%)`
          });
        }
        if (st > 0) {
          const X = Math.round(st / w * 100);
          $("Abandoned (Started)"), p.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: st,
            label: `${st.toLocaleString()} (${X}%)`
          });
        }
      } else if (I > 0) {
        const X = Math.round(I / w * 100);
        $("Abandoned (Started)"), p.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: I,
          label: `${I.toLocaleString()} (${X}%)`
        });
      }
      if (D > 0) {
        const X = Math.round(D / C * 100);
        p.push({
          source: "Checkin Started",
          target: "Checkin Completed",
          value: D,
          label: `${D.toLocaleString()} (${X}%)`
        });
      }
      if (A > 0) {
        const X = Math.round(A / C * 100);
        p.push({
          source: "Checkin Completed",
          target: "Checkin Closed",
          value: A,
          label: `${A.toLocaleString()} (${X}%)`
        });
      }
      if (P > 0) {
        const X = Math.round(P / C * 100);
        $("Checkin Failed"), p.push({
          source: "Checkin Started",
          target: "Checkin Failed",
          value: P,
          label: `${P.toLocaleString()} (${X}%)`
        });
      }
      if (R > 0) {
        const X = Math.round(R / C * 100);
        $("Abandoned (Flow)"), p.push({
          source: "Checkin Started",
          target: "Abandoned (Flow)",
          value: R,
          label: `${R.toLocaleString()} (${X}%)`
        });
      }
      return { nodes: m, links: p };
    });
    return t({ isDark: i }), (m, p) => (y(), x("article", xb, [
      p[12] || (p[12] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Checkin by Record Locator Metrics"),
          c("p", { class: "card-subtitle" }, "Checkin by record locator retrieval and completion analysis")
        ])
      ], -1)),
      s.loading ? (y(), x("div", kb, [...p[1] || (p[1] = [
        et('<div class="loading-container" data-v-e48cea55><div class="chart-flow-loader" data-v-e48cea55><div class="flow-line flow-1" data-v-e48cea55></div><div class="flow-line flow-2" data-v-e48cea55></div><div class="flow-line flow-3" data-v-e48cea55></div><div class="flow-line flow-4" data-v-e48cea55></div><div class="flow-line flow-5" data-v-e48cea55></div></div><p class="loading-text" data-v-e48cea55>Loading record locator data...</p></div>', 1)
      ])])) : (y(), x("div", wb, [
        _.value.nodes.length > 0 ? (y(), x("section", $b, [
          c("div", Mb, [
            Z(be, {
              data: _.value,
              height: "500px",
              "node-colors": f.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : E("", !0),
        l.value && l.value.length > 0 ? (y(), x("section", Cb, [
          c("div", Sb, [
            c("table", Db, [
              c("thead", null, [
                c("tr", Ab, [
                  p[2] || (p[2] = c("th", { class: "table-header" }, "Date", -1)),
                  p[3] || (p[3] = c("th", { class: "table-header" }, "Checkin Init", -1)),
                  p[4] || (p[4] = c("th", { class: "table-header" }, "Booking Retrieve (%)", -1)),
                  p[5] || (p[5] = c("th", { class: "table-header" }, "Checkin Started", -1)),
                  p[6] || (p[6] = c("th", { class: "table-header" }, "Checkin Completed (%)", -1)),
                  p[7] || (p[7] = c("th", { class: "table-header" }, "Checkin Closed (%)", -1)),
                  p[8] || (p[8] = c("th", { class: "table-header" }, "Checkin Failed (%)", -1)),
                  p[9] || (p[9] = c("th", { class: "table-header" }, "Abandoned (%)", -1)),
                  s.isAvianca ? (y(), x("th", Tb, "Create Payment")) : E("", !0),
                  s.isAvianca ? (y(), x("th", Bb, "Failed Payment")) : E("", !0)
                ])
              ]),
              c("tbody", Lb, [
                (y(!0), x(U, null, tt(d.value, (b) => (y(), x("tr", {
                  key: b.date,
                  class: "table-row"
                }, [
                  c("td", Fb, M(T(At)(b.date).format("DD/MM/YYYY")), 1),
                  c("td", Pb, M(T(Y)(b.checkin_initiated)), 1),
                  c("td", Eb, M(g(b.record_locator_init_count, b.checkin_initiated)), 1),
                  c("td", Rb, M(T(Y)(b.record_locator_started_count)), 1),
                  c("td", Ib, M(g(b.record_locator_completed_count, b.record_locator_started_count)), 1),
                  c("td", Ob, M(g(b.record_locator_closed_count, b.record_locator_started_count)), 1),
                  c("td", zb, M(g(b.record_locator_failed_count, b.record_locator_started_count)), 1),
                  c("td", Vb, M(g(b.record_locator_abandoned_count, b.record_locator_started_count)), 1),
                  s.isAvianca ? (y(), x("td", Nb, M(T(Y)(b.record_locator_create_payment_count)), 1)) : E("", !0),
                  s.isAvianca ? (y(), x("td", Wb, M(T(Y)(b.record_locator_create_payment_failed_count)), 1)) : E("", !0)
                ]))), 128))
              ])
            ])
          ]),
          u.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: p[0] || (p[0] = (b) => r.value = !r.value)
          }, [
            kt(M(r.value ? "View less" : `View more (${l.value.length - vs} more rows)`) + " ", 1),
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
          e.enableExport ? (y(), ht(T(_t), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", Hb, [...p[11] || (p[11] = [
          et('<div class="empty-state-content" data-v-e48cea55><div class="empty-icon-wrapper" data-v-e48cea55><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e48cea55><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" data-v-e48cea55></path></svg></div><p class="empty-title" data-v-e48cea55>No record locator data available</p><p class="empty-description" data-v-e48cea55>No record locator data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), Yb = /* @__PURE__ */ at(jb, [["__scopeId", "data-v-e48cea55"]]), qb = { class: "sales-channel-card" }, Ub = {
  key: 0,
  class: "loading-state"
}, Kb = {
  key: 1,
  class: "card-body"
}, Xb = {
  key: 0,
  class: "chart-section"
}, Gb = { class: "chart-wrapper" }, Zb = {
  key: 1,
  class: "empty-state"
}, Qb = {
  key: 2,
  class: "comparison-section"
}, Jb = { class: "comparison-grid" }, tm = { class: "comparison-content" }, em = { class: "comparison-channel" }, am = { class: "comparison-value" }, sm = {
  key: 0,
  class: "comparison-delta"
}, nm = {
  key: 0,
  class: "delta-icon",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, om = {
  key: 1,
  class: "delta-icon",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, im = { class: "delta-label" }, rm = {
  key: 1,
  class: "comparison-delta"
}, lm = /* @__PURE__ */ Q({
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
    }, n = ["#B0C4DE", "#C9A0F2", "#F5C26B", "#8BE8B0", "#F2A07A", "#7BA3E8"], o = e, i = a, r = (f) => {
      i("export", f);
    }, { isDark: l } = lt(rt(o, "theme"));
    S(() => o.data?.total_sell_success ?? 0);
    const d = S(() => {
      const f = /* @__PURE__ */ new Set();
      for (const v of o.data?.sales_by_channel_by_day ?? [])
        for (const g of Object.keys(v.channels))
          f.add(g);
      return Array.from(f).sort();
    }), u = (f, v) => s[f.toLowerCase()] ?? n[v % n.length], h = S(() => {
      const f = o.data?.sales_by_channel_by_day ?? [];
      if (f.length === 0) return { labels: [], datasets: [] };
      const v = f.map((_) => At(_.date).format("MMM-DD")), g = d.value.map((_, m) => ({
        label: _,
        data: f.map((p) => p.channels[_] ?? 0),
        backgroundColor: u(_, m),
        borderRadius: 4
      }));
      return { labels: v, datasets: g };
    });
    return t({ isDark: l }), (f, v) => (y(), x("article", qb, [
      v[5] || (v[5] = et('<header class="card-header" data-v-8b96a431><div class="header-content" data-v-8b96a431><div class="title-section" data-v-8b96a431><h3 class="card-title" data-v-8b96a431>Sales by Channel</h3><p class="card-subtitle" data-v-8b96a431>Successful sales breakdown by communication channel</p></div></div></header>', 1)),
      o.loading ? (y(), x("div", Ub, [...v[0] || (v[0] = [
        et('<div class="loading-container" data-v-8b96a431><div class="chart-bars-loader" data-v-8b96a431><div class="bar bar-1" data-v-8b96a431></div><div class="bar bar-2" data-v-8b96a431></div><div class="bar bar-3" data-v-8b96a431></div><div class="bar bar-4" data-v-8b96a431></div><div class="bar bar-5" data-v-8b96a431></div></div><p class="loading-text" data-v-8b96a431>Loading sales data...</p></div>', 1)
      ])])) : (y(), x("div", Kb, [
        h.value.labels.length > 0 ? (y(), x("section", Xb, [
          c("div", Gb, [
            Z(ne, {
              data: h.value,
              stacked: !0
            }, null, 8, ["data"])
          ]),
          e.enableExport ? (y(), ht(T(_t), {
            key: 0,
            onExport: r,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", Zb, [...v[1] || (v[1] = [
          et('<div class="empty-state-content" data-v-8b96a431><div class="empty-icon-wrapper" data-v-8b96a431><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-8b96a431><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-8b96a431></path></svg></div><p class="empty-title" data-v-8b96a431>No sales data available</p><p class="empty-description" data-v-8b96a431>No sales by channel data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])])),
        e.channelComparison.length > 0 ? (y(), x("section", Qb, [
          c("div", Jb, [
            (y(!0), x(U, null, tt(e.channelComparison, (g) => (y(), x("div", {
              key: g.channel,
              class: "comparison-card"
            }, [
              c("div", {
                class: "comparison-color-bar",
                style: xt({ backgroundColor: u(g.channel, e.channelComparison.indexOf(g)) })
              }, null, 4),
              c("div", tm, [
                c("span", em, M(g.channel), 1),
                c("span", am, M(T(Y)(g.current)), 1),
                g.delta !== null ? (y(), x("div", sm, [
                  c("span", {
                    class: G(["delta-badge", g.delta > 0 ? "delta-up" : g.delta < 0 ? "delta-down" : "delta-neutral"])
                  }, [
                    g.delta > 0 ? (y(), x("svg", nm, [...v[2] || (v[2] = [
                      c("path", {
                        "fill-rule": "evenodd",
                        d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
                        "clip-rule": "evenodd"
                      }, null, -1)
                    ])])) : g.delta < 0 ? (y(), x("svg", om, [...v[3] || (v[3] = [
                      c("path", {
                        "fill-rule": "evenodd",
                        d: "M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z",
                        "clip-rule": "evenodd"
                      }, null, -1)
                    ])])) : E("", !0),
                    kt(" " + M(Math.abs(g.delta).toFixed(1)) + "% ", 1)
                  ], 2),
                  c("span", im, "vs prev. period (" + M(T(Y)(g.previous)) + ")", 1)
                ])) : (y(), x("div", rm, [...v[4] || (v[4] = [
                  c("span", { class: "delta-label" }, "No previous data", -1)
                ])]))
              ])
            ]))), 128))
          ])
        ])) : E("", !0)
      ]))
    ]));
  }
}), cm = /* @__PURE__ */ at(lm, [["__scopeId", "data-v-8b96a431"]]), dm = { class: "seller-metrics-card" }, um = { class: "card-header" }, hm = { class: "header-content" }, fm = {
  key: 0,
  class: "payment-success-badge"
}, gm = {
  key: 0,
  class: "currency-breakdown-list"
}, pm = {
  key: 1,
  class: "badge-value"
}, vm = {
  key: 0,
  class: "loading-state"
}, bm = {
  key: 1,
  class: "card-body"
}, mm = {
  key: 0,
  class: "chart-section"
}, ym = { class: "chart-wrapper" }, _m = {
  key: 1,
  class: "empty-state"
}, xm = {
  key: 2,
  class: "table-section"
}, km = { class: "table-wrapper" }, wm = { class: "data-table" }, $m = { class: "table-body" }, Mm = { class: "table-cell font-medium" }, Cm = { class: "table-cell text-center" }, Sm = { class: "table-cell text-center" }, Dm = { class: "table-cell text-center" }, Am = { class: "table-cell text-center" }, Tm = { class: "table-cell text-center" }, Bm = { class: "table-cell text-center success-value" }, Lm = {
  key: 0,
  class: "currency-cell-list"
}, Fm = { key: 1 }, Pm = { class: "table-cell text-left" }, Em = {
  key: 0,
  class: "failed-reasons"
}, Rm = { class: "reason-name" }, Im = { class: "reason-count" }, Om = {
  key: 1,
  class: "empty-cell"
}, bs = 3, zm = /* @__PURE__ */ Q({
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
    const s = e, n = a, o = (k) => {
      n("export", k);
    }, { isDark: i } = lt(rt(s, "theme")), r = nt(!1), l = S(() => {
      if (!s.sellerData?.seller_by_day) return [];
      const k = [...s.sellerData.seller_by_day];
      return s.failedData?.failed_by_reason_by_day && s.failedData.failed_by_reason_by_day.forEach((C) => {
        const D = k.findIndex((A) => A.date === C.date);
        D !== -1 ? k[D] = { ...k[D], reasons: C.reasons } : k.push({
          date: C.date,
          seller_conversations: 0,
          sell_started_count: 0,
          sell_get_quote_count: 0,
          sell_booking_created_count: 0,
          sell_success_count: 0,
          daily_value_sell_success: 0,
          reasons: C.reasons
        });
      }), k.sort((C, D) => new Date(C.date).getTime() - new Date(D.date).getTime());
    }), d = S(() => r.value ? l.value : l.value.slice(0, bs)), u = S(() => l.value.length > bs), h = S(() => s.sellerData), f = S(() => s.failedData), v = S(
      () => Array.isArray(s.sellerData.total_value_sell_success) ? s.sellerData.total_value_sell_success : []
    ), g = S(() => {
      const {
        total_seller_conversations: k = 0,
        total_sell_started: C = 0,
        total_sell_booking_created: D = 0,
        total_sell_success: A = 0
      } = h.value, { failed_by_reason_by_day: P = [] } = f.value;
      if (k === 0) return { nodes: [], links: [] };
      const R = [
        { name: "Sell Initiated", value: k },
        { name: "Sell Started", value: C },
        { name: "Booking Created", value: D },
        { name: "Sell Success", value: A }
      ], I = [], V = k - C;
      if (V > 0) {
        const O = Math.round(V / k * 100);
        R.push({ name: "Abandoned (Init)", value: V }), I.push({
          source: "Sell Initiated",
          target: "Abandoned (Init)",
          value: V,
          label: `${V.toLocaleString()} (${O}%)`
        });
      }
      if (C > 0) {
        const O = Math.round(C / k * 100);
        I.push({
          source: "Sell Initiated",
          target: "Sell Started",
          value: C,
          label: `${C.toLocaleString()} (${O}%)`
        });
      }
      const q = P.reduce((O, W) => (W.reasons && Array.isArray(W.reasons) && W.reasons.forEach((N) => {
        const H = N.reason, j = N.failed_count;
        O[H] = (O[H] || 0) + j;
      }), O), {});
      if (D > 0) {
        const O = Math.round(D / k * 100);
        I.push({
          source: "Sell Started",
          target: "Booking Created",
          value: D,
          label: `${D.toLocaleString()} (${O}%)`
        });
      }
      if (A > 0) {
        const O = Math.round(A / k * 100);
        I.push({
          source: "Booking Created",
          target: "Sell Success",
          value: A,
          label: `${A.toLocaleString()} (${O}%)`
        });
      }
      const L = C - D;
      if (L > 0) {
        const O = Math.round(L / k * 100);
        R.push({ name: "Failed at Booking", value: L }), I.push({
          source: "Sell Started",
          target: "Failed at Booking",
          value: L,
          label: `${L.toLocaleString()} (${O}%)`
        });
      }
      if (Object.keys(q).length > 0) {
        const O = Object.values(q).reduce((N, H) => N + H, 0), W = L - O;
        if (Object.entries(q).filter(([, N]) => N > 0).sort(([, N], [, H]) => H - N).forEach(([N, H]) => {
          const j = Math.round(H / k * 100);
          R.push({ name: `Failed: ${N}`, value: H }), I.push({
            source: "Failed at Booking",
            target: `Failed: ${N}`,
            value: H,
            label: `${H.toLocaleString()} (${j}%)`
          });
        }), W > 0) {
          const N = Math.round(W / k * 100);
          R.push({ name: "Failed: Without Reason", value: W }), I.push({
            source: "Failed at Booking",
            target: "Failed: Without Reason",
            value: W,
            label: `${W.toLocaleString()} (${N}%)`
          });
        }
      }
      const F = D - A;
      if (F > 0) {
        const O = Math.round(F / k * 100);
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
    }, m = S(() => _), p = (k, C) => !C || C === 0 ? "0%" : `${Math.round(k / C * 100)}%`, b = (k, C) => {
      const D = Y(k), A = p(k, C);
      return `${D} (${A})`;
    }, $ = (k) => k == null ? 0 : typeof k == "number" ? k : Array.isArray(k) ? k.reduce((C, D) => C + (D.total_value || 0), 0) : 0, w = (k) => ft($(k));
    return t({ isDark: i }), (k, C) => (y(), x("article", dm, [
      c("header", um, [
        c("div", hm, [
          C[2] || (C[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Seller Metrics"),
            c("p", { class: "card-subtitle" }, "Sales performance and failure analysis")
          ], -1)),
          s.loading ? E("", !0) : (y(), x("div", fm, [
            C[1] || (C[1] = c("p", { class: "badge-label" }, "Total Sales Value", -1)),
            v.value.length > 0 ? (y(), x("div", gm, [
              (y(!0), x(U, null, tt(v.value, (D) => (y(), x("p", {
                key: D.currency,
                class: "currency-breakdown-item"
              }, M(D.currency) + " " + M(T(ft)(D.total_value)), 1))), 128))
            ])) : (y(), x("p", pm, M(w(s.sellerData.total_value_sell_success)), 1))
          ]))
        ])
      ]),
      s.loading ? (y(), x("div", vm, [...C[3] || (C[3] = [
        et('<div class="loading-container" data-v-60dfa4f1><div class="chart-flow-loader" data-v-60dfa4f1><div class="flow-line flow-1" data-v-60dfa4f1></div><div class="flow-line flow-2" data-v-60dfa4f1></div><div class="flow-line flow-3" data-v-60dfa4f1></div><div class="flow-line flow-4" data-v-60dfa4f1></div><div class="flow-line flow-5" data-v-60dfa4f1></div></div><p class="loading-text" data-v-60dfa4f1>Loading sales data...</p></div>', 1)
      ])])) : (y(), x("div", bm, [
        g.value.nodes.length > 0 ? (y(), x("section", mm, [
          c("div", ym, [
            Z(be, {
              data: g.value,
              "node-colors": m.value,
              title: "",
              height: "320px"
            }, null, 8, ["data", "node-colors"])
          ])
        ])) : (y(), x("section", _m, [...C[4] || (C[4] = [
          et('<div class="empty-state-content" data-v-60dfa4f1><div class="empty-icon-wrapper" data-v-60dfa4f1><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-60dfa4f1><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-60dfa4f1></path></svg></div><p class="empty-title" data-v-60dfa4f1>No sales data available</p><p class="empty-description" data-v-60dfa4f1>No sales data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])])),
        l.value && l.value.length > 0 ? (y(), x("section", xm, [
          c("div", km, [
            c("table", wm, [
              C[5] || (C[5] = c("thead", null, [
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
              c("tbody", $m, [
                (y(!0), x(U, null, tt(d.value, (D) => (y(), x("tr", {
                  key: D.date,
                  class: "table-row"
                }, [
                  c("td", Mm, M(T(At)(D.date).format("DD/MM/YYYY")), 1),
                  c("td", Cm, M(T(Y)(D.seller_conversations || 0)), 1),
                  c("td", Sm, M(b(D.sell_started_count, D.seller_conversations || D.sell_started_count)), 1),
                  c("td", Dm, M(b(D.sell_get_quote_count, D.seller_conversations || D.sell_started_count)), 1),
                  c("td", Am, M(b(D.sell_booking_created_count, D.seller_conversations || D.sell_started_count)), 1),
                  c("td", Tm, M(b(D.sell_success_count, D.seller_conversations || D.sell_started_count)), 1),
                  c("td", Bm, [
                    Array.isArray(D.daily_value_sell_success) && D.daily_value_sell_success.length > 0 ? (y(), x("div", Lm, [
                      (y(!0), x(U, null, tt(D.daily_value_sell_success, (A) => (y(), x("span", {
                        key: `${D.date}-${A.currency}`
                      }, M(A.currency) + " " + M(T(ft)(A.total_value)), 1))), 128))
                    ])) : (y(), x("span", Fm, M(w(D.daily_value_sell_success)), 1))
                  ]),
                  c("td", Pm, [
                    D.reasons && D.reasons.length > 0 ? (y(), x("div", Em, [
                      (y(!0), x(U, null, tt(D.reasons, (A) => (y(), x("div", {
                        key: A.reason,
                        class: "failed-reason-item"
                      }, [
                        c("span", Rm, M(A.reason) + ":", 1),
                        c("span", Im, M(A.failed_count), 1)
                      ]))), 128))
                    ])) : (y(), x("div", Om, "-"))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          u.value ? (y(), x("button", {
            key: 0,
            class: "view-more-btn",
            onClick: C[0] || (C[0] = (D) => r.value = !r.value)
          }, [
            kt(M(r.value ? "View less" : `View more (${l.value.length - bs} more rows)`) + " ", 1),
            (y(), x("svg", {
              class: G(["view-more-icon", { "view-more-icon-rotated": r.value }]),
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [...C[6] || (C[6] = [
              c("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ])], 2))
          ])) : E("", !0),
          e.enableExport ? (y(), ht(T(_t), {
            key: 1,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : E("", !0)
      ]))
    ]));
  }
}), Vm = /* @__PURE__ */ at(zm, [["__scopeId", "data-v-60dfa4f1"]]), Nm = { class: "top-agents-card" }, Wm = {
  key: 0,
  class: "card-body"
}, Hm = {
  key: 0,
  class: "chart-section"
}, jm = {
  key: 1,
  class: "empty-state"
}, Ym = { class: "empty-state-content" }, qm = { class: "empty-icon-wrapper" }, Um = {
  key: 1,
  class: "loading-state"
}, Km = /* @__PURE__ */ Q({
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
    }, { isDark: r, colors: l } = lt(rt(n, "theme")), d = S(() => {
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
        return s[p] || "#94a3b8";
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
    }), u = S(() => n.options ? n.options : {
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
    return t({ isDark: r }), (h, f) => (y(), x("article", Nm, [
      f[3] || (f[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Top Agents"),
          c("p", { class: "card-subtitle" }, "Interactions by agent (excluding triage)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Um, [...f[2] || (f[2] = [
        et('<div class="loading-container" data-v-501bf4c4><div class="chart-lines-loader" data-v-501bf4c4><div class="line line-1" data-v-501bf4c4></div><div class="line line-2" data-v-501bf4c4></div><div class="line line-3" data-v-501bf4c4></div><div class="line line-4" data-v-501bf4c4></div><div class="line line-5" data-v-501bf4c4></div></div><p class="loading-text" data-v-501bf4c4>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", Wm, [
        d.value.labels && d.value.labels.length ? (y(), x("section", Hm, [
          Z(Ga, {
            data: d.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ht(T(_t), {
            key: 0,
            onExport: i,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", jm, [
          c("div", Ym, [
            c("div", qm, [
              Z(T(Lg), { class: "empty-icon" })
            ]),
            f[0] || (f[0] = c("p", { class: "empty-title" }, "No top agents data", -1)),
            f[1] || (f[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Xm = /* @__PURE__ */ at(Km, [["__scopeId", "data-v-501bf4c4"]]), Gm = { class: "payment-method-card" }, Zm = { class: "card-header" }, Qm = { class: "header-content" }, Jm = {
  key: 0,
  class: "stats-badge"
}, t1 = {
  key: 0,
  class: "currency-breakdown-list"
}, e1 = {
  key: 1,
  class: "badge-value"
}, a1 = {
  key: 0,
  class: "loading-state"
}, s1 = {
  key: 1,
  class: "card-body"
}, n1 = {
  key: 0,
  class: "payment-methods-section"
}, o1 = { class: "payment-methods-grid" }, i1 = { class: "payment-card-content" }, r1 = { class: "payment-card-header" }, l1 = {
  key: 0,
  class: "currency-cell-list"
}, c1 = { class: "payment-badge-wrapper" }, d1 = {
  key: 1,
  class: "empty-state"
}, u1 = { class: "empty-state-content" }, h1 = { class: "empty-icon-wrapper" }, f1 = {
  key: 2,
  class: "table-section"
}, g1 = { class: "table-wrapper" }, p1 = { class: "data-table" }, v1 = { class: "table-body" }, b1 = { class: "table-cell font-medium" }, m1 = { class: "table-cell text-center" }, y1 = { class: "table-cell text-center success-value" }, _1 = {
  key: 0,
  class: "currency-cell-list"
}, x1 = { key: 1 }, k1 = { class: "table-cell" }, w1 = { class: "payment-tags" }, $1 = { class: "tag-name" }, M1 = {
  key: 0,
  class: "tag-amount"
}, C1 = {
  key: 1,
  class: "tag-amount"
}, S1 = { class: "tag-count" }, D1 = {
  key: 3,
  class: "empty-table-state"
}, A1 = "Not Registered", ms = 3, T1 = /* @__PURE__ */ Q({
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
    const s = e, n = a, { isDark: o } = lt(rt(s, "theme")), i = nt(!1), r = nt({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), l = S(() => r.value.payment_method_breakdown && r.value.payment_method_breakdown.length > 0), d = S(() => r.value.payment_method_by_day && r.value.payment_method_by_day.length > 0), u = nt(!1), h = S(() => !r.value.payment_method_by_day || r.value.payment_method_by_day.length === 0 ? [] : [...r.value.payment_method_by_day].sort((L, F) => At(L.date).valueOf() - At(F.date).valueOf())), f = S(() => u.value ? h.value : h.value.slice(0, ms)), v = S(() => h.value.length > ms), g = (L) => {
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
      const F = (L.payment_method_breakdown || []).map((W) => ({
        payment_method: W.payment_method || "Unknown",
        total_amount: W.total_amount ?? 0,
        count: W.count ?? 0,
        total_amount_by_currency: W.total_amount_by_currency ?? []
      })), O = (L.payment_method_by_day || []).map((W) => ({
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
        payment_method_breakdown: F,
        payment_method_by_day: O
      };
    }, _ = async () => {
      if (!(!s.fetchFunction || !s.dates || s.dates.length < 2 || !s.airlineName)) {
        i.value = !0;
        try {
          const [L, F] = s.dates.map((W) => At(W).format("YYYY-MM-DD")), O = await s.fetchFunction(s.airlineName, L, F);
          r.value = g(O);
        } catch (L) {
          console.error("Error fetching payment method metrics:", L), r.value = g(null);
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
    ], p = (L) => {
      const F = m[L % m.length];
      return {
        background: F.bg,
        borderColor: F.border
      };
    }, b = (L) => ({ color: m[L % m.length].text }), $ = (L) => ({ color: m[L % m.length].value }), w = (L) => ({ color: m[L % m.length].icon }), k = (L) => ({ color: m[L % m.length].badge }), C = (L) => {
      const O = P(L).length;
      return O > 18 ? { fontSize: "0.75rem" } : O > 15 ? { fontSize: "0.875rem" } : O > 12 ? { fontSize: "1rem" } : { fontSize: "1.125rem" };
    }, D = (L) => {
      const F = L?.toLowerCase() || "";
      return !L || F === "unknown" ? Og : F.includes("credit") || F.includes("debit") ? $o : F.includes("cash") || F.includes("efectivo") ? Tg : F.includes("bank") || F.includes("transfer") ? Bg : F.includes("zelle") || F.includes("pago") || F.includes("movil") ? Ig : F.includes("wallet") ? zg : Rg;
    }, A = (L) => !L || L.toLowerCase() === "unknown" ? A1 : L.replace(/_/g, " "), P = (L) => L == null ? "$0.00" : ft(L), R = (L) => L ? At(L).format("DD/MM/YYYY") : "-", I = (L) => L == null || Number.isNaN(Number(L)) ? 0 : Number(L), V = (L) => {
      n("export", L);
    };
    function q() {
      const L = s.data;
      L && (Array.isArray(L.payment_method_breakdown) && L.payment_method_breakdown.length > 0 || Array.isArray(L.payment_method_by_day) && L.payment_method_by_day.length > 0) && (i.value = !1, r.value = g(L));
    }
    return pe(() => {
      s.data ? q() : _();
    }), Nt(
      () => s.data,
      (L) => {
        L && q();
      },
      { deep: !0 }
    ), Nt(
      () => s.dates,
      (L) => {
        s.data || L && L[0] && L[1] && _();
      },
      { deep: !0 }
    ), t({ isDark: o }), (L, F) => (y(), x("article", Gm, [
      c("header", Zm, [
        c("div", Qm, [
          F[2] || (F[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Payment Method Metrics"),
            c("p", { class: "card-subtitle" }, "Sales breakdown by payment method")
          ], -1)),
          !i.value && r.value.total_amount ? (y(), x("div", Jm, [
            F[1] || (F[1] = c("p", { class: "badge-label" }, "Total Amount", -1)),
            r.value.total_amount_by_currency && r.value.total_amount_by_currency.length > 0 ? (y(), x("div", t1, [
              (y(!0), x(U, null, tt(r.value.total_amount_by_currency, (O) => (y(), x("p", {
                key: O.currency,
                class: "currency-breakdown-item"
              }, M(O.currency) + " " + M(P(O.total_value)), 1))), 128))
            ])) : (y(), x("p", e1, M(P(r.value.total_amount)), 1))
          ])) : E("", !0)
        ])
      ]),
      i.value ? (y(), x("div", a1, [...F[3] || (F[3] = [
        et('<div class="loading-container" data-v-ff4ce0b7><div class="chart-lines-loader" data-v-ff4ce0b7><div class="line line-1" data-v-ff4ce0b7></div><div class="line line-2" data-v-ff4ce0b7></div><div class="line line-3" data-v-ff4ce0b7></div><div class="line line-4" data-v-ff4ce0b7></div><div class="line line-5" data-v-ff4ce0b7></div></div><p class="loading-text" data-v-ff4ce0b7>Loading payment data...</p></div>', 1)
      ])])) : (y(), x("div", s1, [
        l.value ? (y(), x("section", n1, [
          F[4] || (F[4] = c("p", { class: "section-label" }, "Sales by Payment Method", -1)),
          c("div", o1, [
            (y(!0), x(U, null, tt(r.value.payment_method_breakdown, (O, W) => (y(), x("div", {
              key: O.payment_method,
              class: "payment-method-card-item",
              style: xt(p(W))
            }, [
              c("div", i1, [
                c("div", r1, [
                  (y(), ht(Ls(D(O.payment_method)), {
                    class: "payment-icon",
                    style: xt(w(W))
                  }, null, 8, ["style"])),
                  c("span", {
                    class: "payment-name",
                    style: xt(b(W))
                  }, M(A(O.payment_method)), 5)
                ]),
                c("p", {
                  class: "payment-amount",
                  style: xt([$(W), C(O.total_amount)])
                }, M(P(O.total_amount)), 5),
                O.total_amount_by_currency && O.total_amount_by_currency.length > 0 ? (y(), x("div", l1, [
                  (y(!0), x(U, null, tt(O.total_amount_by_currency, (N) => (y(), x("span", {
                    key: `${O.payment_method}-${N.currency}`
                  }, M(N.currency) + " " + M(P(N.total_value)), 1))), 128))
                ])) : E("", !0),
                c("div", c1, [
                  c("span", {
                    class: "payment-badge",
                    style: xt(k(W))
                  }, M(I(O.count)) + " " + M(I(O.count) === 1 ? "sale" : "sales"), 5)
                ])
              ])
            ], 4))), 128))
          ])
        ])) : (y(), x("section", d1, [
          c("div", u1, [
            c("div", h1, [
              Z(T($o), { class: "empty-icon" })
            ]),
            F[5] || (F[5] = c("p", { class: "empty-title" }, "No payment data available", -1)),
            F[6] || (F[6] = c("p", { class: "empty-description" }, "No payment method data found for the selected period. Try adjusting the date range.", -1))
          ])
        ])),
        d.value ? (y(), x("section", f1, [
          F[10] || (F[10] = c("p", { class: "section-label" }, "Daily Breakdown", -1)),
          c("div", g1, [
            c("table", p1, [
              F[8] || (F[8] = c("thead", null, [
                c("tr", { class: "table-header-row" }, [
                  c("th", { class: "table-header text-left" }, "Date"),
                  c("th", { class: "table-header text-center" }, "Total Sales"),
                  c("th", { class: "table-header text-center" }, "Total Amount"),
                  c("th", { class: "table-header text-left" }, "Payment Methods")
                ])
              ], -1)),
              c("tbody", v1, [
                (y(!0), x(U, null, tt(f.value, (O) => (y(), x("tr", {
                  key: O.date,
                  class: "table-row"
                }, [
                  c("td", b1, M(R(O.date)), 1),
                  c("td", m1, M(T(Y)(O.total_count ?? 0)), 1),
                  c("td", y1, [
                    O.total_amount_by_currency && O.total_amount_by_currency.length > 0 ? (y(), x("div", _1, [
                      (y(!0), x(U, null, tt(O.total_amount_by_currency, (W) => (y(), x("span", {
                        key: `${O.date}-${W.currency}`
                      }, M(W.currency) + " " + M(P(W.total_value)), 1))), 128))
                    ])) : (y(), x("span", x1, M(P(O.total_amount)), 1))
                  ]),
                  c("td", k1, [
                    c("div", w1, [
                      (y(!0), x(U, null, tt(O.payment_methods || [], (W) => (y(), x("div", {
                        key: W.payment_method,
                        class: "payment-tag"
                      }, [
                        c("span", $1, M(A(W.payment_method)), 1),
                        F[7] || (F[7] = c("span", { class: "tag-separator" }, "•", -1)),
                        !W.total_amount_by_currency || W.total_amount_by_currency.length === 0 ? (y(), x("span", M1, M(P(W.total_amount)), 1)) : (y(), x("span", C1, M(W.total_amount_by_currency.map((N) => `${N.currency} ${P(N.total_value)}`).join(" / ")), 1)),
                        c("span", S1, "(" + M(I(W.count)) + ")", 1)
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
            kt(M(u.value ? "View less" : `View more (${h.value.length - ms} more rows)`) + " ", 1),
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
          e.enableExport ? (y(), ht(T(_t), {
            key: 1,
            onExport: V,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : l.value ? (y(), x("div", D1, [...F[11] || (F[11] = [
          c("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
        ])])) : E("", !0)
      ]))
    ]));
  }
}), B1 = /* @__PURE__ */ at(T1, [["__scopeId", "data-v-ff4ce0b7"]]), L1 = { class: "agent-human-conv-card" }, F1 = {
  key: 0,
  class: "loading-state"
}, P1 = {
  key: 1,
  class: "card-body"
}, E1 = { class: "summary-cards" }, R1 = { class: "summary-card assigned-card" }, I1 = { class: "summary-card-content" }, O1 = { class: "card-content" }, z1 = { class: "card-value assigned-value" }, V1 = { class: "card-content" }, N1 = { class: "card-value assigned-value" }, W1 = { class: "summary-card closed-card" }, H1 = { class: "summary-card-content" }, j1 = { class: "card-content" }, Y1 = { class: "card-value closed-value" }, q1 = { class: "card-content" }, U1 = { class: "card-value closed-value" }, K1 = {
  key: 0,
  class: "agents-section"
}, X1 = { class: "date-header" }, G1 = { class: "date-title" }, Z1 = { class: "date-stats" }, Q1 = { class: "stat-item assigned-stat" }, J1 = { class: "stat-value" }, ty = { class: "stat-value" }, ey = { class: "stat-item closed-stat" }, ay = { class: "stat-value" }, sy = { class: "stat-value" }, ny = { class: "table-wrapper" }, oy = { class: "data-table" }, iy = { class: "table-body" }, ry = { class: "table-cell name-cell" }, ly = { class: "table-cell email-cell" }, cy = { class: "table-cell text-center" }, dy = { class: "metric-cell-content" }, uy = { class: "badge assigned-badge" }, hy = { class: "metric-cell-avg" }, fy = { class: "table-cell text-center" }, gy = { class: "metric-cell-content" }, py = { class: "badge closed-badge" }, vy = { class: "metric-cell-avg" }, by = {
  key: 1,
  class: "empty-state"
}, my = /* @__PURE__ */ Q({
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
    const s = e, n = a, o = (m) => {
      n("export", m);
    }, { isDark: i } = lt(rt(s, "theme")), r = S(() => s.data?.agents_by_day && s.data.agents_by_day.length > 0), l = S(() => {
      if (!r.value) return {};
      const m = {};
      for (const $ of s.data.agents_by_day)
        m[$.date] || (m[$.date] = []), m[$.date].push($);
      const p = Object.keys(m).sort(($, w) => new Date($).getTime() - new Date(w).getTime()), b = {};
      for (const $ of p)
        b[$] = m[$];
      return b;
    }), d = (m) => m == null ? "0" : Y(m), u = (m) => {
      if (m == null)
        return "AVG";
      if (m < 60)
        return `${Math.round(m)}s`;
      const p = Math.round(m), b = Math.floor(p / 60), $ = p % 60;
      if (b < 60)
        return `${b}m ${$}s`;
      const w = Math.floor(b / 60), k = b % 60;
      return `${w}h ${k}m`;
    }, h = (m) => {
      const p = new Date(m), b = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return p.toLocaleDateString("en-US", b);
    }, f = (m) => m[0]?.day_total_assigned ?? 0, v = (m) => m[0]?.day_total_closed ?? 0, g = (m) => m[0]?.day_avg_time_to_assign_seconds ?? null, _ = (m) => m[0]?.day_avg_conversation_duration_seconds ?? null;
    return t({ isDark: i }), (m, p) => (y(), x("article", L1, [
      p[11] || (p[11] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Agent Human Conversations"),
          c("p", { class: "card-subtitle" }, "Human conversation assignments and closures by agent")
        ])
      ], -1)),
      e.loading ? (y(), x("div", F1, [...p[0] || (p[0] = [
        et('<div class="loading-container" data-v-6cfba83b><div class="chart-bars-loader" data-v-6cfba83b><div class="bar bar-1" data-v-6cfba83b></div><div class="bar bar-2" data-v-6cfba83b></div><div class="bar bar-3" data-v-6cfba83b></div><div class="bar bar-4" data-v-6cfba83b></div><div class="bar bar-5" data-v-6cfba83b></div></div><p class="loading-text" data-v-6cfba83b>Loading agent data...</p></div>', 1)
      ])])) : (y(), x("div", P1, [
        c("div", E1, [
          c("div", R1, [
            p[3] || (p[3] = c("div", { class: "card-decoration" }, null, -1)),
            c("div", I1, [
              c("div", O1, [
                p[1] || (p[1] = c("p", { class: "card-label" }, "Total Assigned", -1)),
                c("p", z1, M(d(e.data.total_assigned)), 1)
              ]),
              c("div", V1, [
                p[2] || (p[2] = c("p", { class: "card-label" }, "AVG time to assign", -1)),
                c("p", N1, M(u(e.data.avg_time_to_assign_seconds)), 1)
              ])
            ])
          ]),
          c("div", W1, [
            p[6] || (p[6] = c("div", { class: "card-decoration" }, null, -1)),
            c("div", H1, [
              c("div", j1, [
                p[4] || (p[4] = c("p", { class: "card-label" }, "Total Closed", -1)),
                c("p", Y1, M(d(e.data.total_closed)), 1)
              ]),
              c("div", q1, [
                p[5] || (p[5] = c("p", { class: "card-label" }, "AVG time to close", -1)),
                c("p", U1, M(u(e.data.avg_conversation_duration_seconds)), 1)
              ])
            ])
          ])
        ]),
        r.value ? (y(), x("div", K1, [
          (y(!0), x(U, null, tt(l.value, (b, $) => (y(), x("div", {
            key: $,
            class: "date-group"
          }, [
            c("div", X1, [
              c("h4", G1, M(h($)), 1),
              c("div", Z1, [
                c("span", Q1, [
                  c("span", J1, M(d(f(b))), 1),
                  p[7] || (p[7] = kt(" Assigned ", -1)),
                  c("span", ty, M(u(g(b))), 1)
                ]),
                c("span", ey, [
                  c("span", ay, M(d(v(b))), 1),
                  p[8] || (p[8] = kt(" Closed ", -1)),
                  c("span", sy, M(u(_(b))), 1)
                ])
              ])
            ]),
            c("div", ny, [
              c("table", oy, [
                p[9] || (p[9] = c("thead", null, [
                  c("tr", { class: "table-header-row" }, [
                    c("th", { class: "table-header" }, "Agent Name"),
                    c("th", { class: "table-header" }, "Email"),
                    c("th", { class: "table-header" }, "Assigned (AVG time to assign)"),
                    c("th", { class: "table-header" }, "Closed (AVG time to close)")
                  ])
                ], -1)),
                c("tbody", iy, [
                  (y(!0), x(U, null, tt(b, (w) => (y(), x("tr", {
                    key: `${$}-${w.agent_email}`,
                    class: "table-row"
                  }, [
                    c("td", ry, M(w.agent_name || "-"), 1),
                    c("td", ly, M(w.agent_email), 1),
                    c("td", cy, [
                      c("div", dy, [
                        c("span", uy, M(d(w.assigned_count)), 1),
                        c("span", hy, M(u(w.avg_time_to_assign_seconds)), 1)
                      ])
                    ]),
                    c("td", fy, [
                      c("div", gy, [
                        c("span", py, M(d(w.closed_count)), 1),
                        c("span", vy, M(u(w.avg_conversation_duration_seconds)), 1)
                      ])
                    ])
                  ]))), 128))
                ])
              ])
            ])
          ]))), 128)),
          e.enableExport ? (y(), ht(T(_t), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("div", by, [...p[10] || (p[10] = [
          et('<div class="empty-state-content" data-v-6cfba83b><div class="empty-icon-wrapper" data-v-6cfba83b><svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-6cfba83b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-6cfba83b></path></svg></div><p class="empty-title" data-v-6cfba83b>No agent human conversation data available</p><p class="empty-description" data-v-6cfba83b>Try adjusting the date range or check your filters.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), yy = /* @__PURE__ */ at(my, [["__scopeId", "data-v-6cfba83b"]]), _y = { class: "channel-metrics-card" }, xy = {
  key: 0,
  class: "card-body"
}, ky = {
  key: 0,
  class: "kpi-grid"
}, wy = { class: "kpi-label" }, $y = { class: "kpi-value" }, My = { class: "kpi-card total-card" }, Cy = { class: "kpi-value" }, Sy = {
  key: 1,
  class: "chart-section"
}, Dy = {
  key: 2,
  class: "empty-state"
}, Ay = {
  key: 1,
  class: "loading-state"
}, Ty = /* @__PURE__ */ Q({
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
    const s = e, n = a, o = (f) => {
      n("export", f);
    }, { isDark: i, colors: r } = lt(rt(s, "theme")), l = nt({ labels: [], datasets: [] }), d = S(() => s.data ?? {
      channels_by_day: {},
      total_by_channel: {},
      total_conversations: 0
    }), u = S(() => ({
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
        for (const w of Object.keys($))
          _.add(w);
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
        const w = $.toLowerCase(), k = p[w] || "#9ca3af";
        return {
          label: $.toUpperCase(),
          data: g.map((C) => v[C]?.[$] || 0),
          borderColor: k,
          backgroundColor: `${k}1A`,
          // 1A = 10% opacity
          borderWidth: 2,
          fill: !0,
          tension: 0.4,
          pointBackgroundColor: k,
          pointBorderColor: k,
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        };
      });
      l.value = {
        labels: g.map(($) => At($).format("MMM DD")),
        datasets: b
      };
    };
    return Nt(
      () => s.data,
      (f) => {
        h(f ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: i }), (f, v) => (y(), x("article", _y, [
      v[3] || (v[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Channel Metrics"),
          c("p", { class: "card-subtitle" }, "Communication channels performance")
        ])
      ], -1)),
      s.loading ? (y(), x("div", Ay, [...v[2] || (v[2] = [
        et('<div class="loading-container" data-v-82f175d2><div class="chart-bars-loader" data-v-82f175d2><div class="bar bar-1" data-v-82f175d2></div><div class="bar bar-2" data-v-82f175d2></div><div class="bar bar-3" data-v-82f175d2></div><div class="bar bar-4" data-v-82f175d2></div><div class="bar bar-5" data-v-82f175d2></div></div><p class="loading-text" data-v-82f175d2>Loading channel metrics...</p></div>', 1)
      ])])) : (y(), x("div", xy, [
        Object.keys(d.value.total_by_channel).length ? (y(), x("div", ky, [
          (y(!0), x(U, null, tt(Object.keys(d.value.total_by_channel), (g) => (y(), x("div", {
            class: "kpi-card",
            key: g
          }, [
            c("span", wy, M(g.toUpperCase()), 1),
            c("span", $y, M(T(Y)(d.value.total_by_channel[g])), 1)
          ]))), 128)),
          c("div", My, [
            v[0] || (v[0] = c("span", { class: "kpi-label" }, "Total Conversations", -1)),
            c("span", Cy, M(T(Y)(d.value.total_conversations)), 1)
          ])
        ])) : E("", !0),
        l.value.labels && l.value.labels.length ? (y(), x("section", Sy, [
          Z(ve, {
            data: l.value,
            options: u.value
          }, null, 8, ["data", "options"]),
          e.enableExport ? (y(), ht(T(_t), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", Dy, [...v[1] || (v[1] = [
          et('<div class="empty-state-content" data-v-82f175d2><div class="empty-icon-wrapper" data-v-82f175d2><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-82f175d2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-82f175d2></path></svg></div><p class="empty-title" data-v-82f175d2>No channel metrics data available</p><p class="empty-description" data-v-82f175d2>No channel data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), By = /* @__PURE__ */ at(Ty, [["__scopeId", "data-v-82f175d2"]]), Ly = { class: "triage-combinations-card" }, Fy = { class: "card-header" }, Py = { class: "total-badge" }, Ey = {
  key: 0,
  class: "card-body"
}, Ry = { class: "chart-container" }, Iy = { class: "table-container" }, Oy = { class: "table-row" }, zy = { class: "table-row" }, Vy = { class: "table-cell text-center count-cell" }, Ny = { class: "table-cell text-center count-cell" }, Wy = { class: "table-cell text-center count-cell" }, Hy = { class: "table-cell text-center count-cell" }, jy = { class: "table-cell text-center count-cell" }, Yy = {
  key: 1,
  class: "empty-state"
}, qy = { class: "empty-state-content" }, Uy = { class: "empty-icon-wrapper" }, Ky = {
  key: 1,
  class: "loading-state"
}, Xy = /* @__PURE__ */ Q({
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
    const s = e, n = a, o = (p) => {
      n("export", p);
    }, { isDark: i, colors: r } = lt(rt(s, "theme")), l = S(() => {
      const p = s.data?.combinations || {}, b = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [$, w] of Object.entries(p)) {
        const k = $.split("+").filter(Boolean);
        if (!k.includes("triage")) continue;
        const C = k.filter((D) => D !== "triage").length;
        C >= 4 ? b["4p"] += Number(w) || 0 : b[C] += Number(w) || 0;
      }
      return b;
    }), d = S(() => {
      const p = l.value;
      return p[0] + p[1] + p[2] + p[3] + p["4p"] || 0;
    }), u = S(() => Object.keys(s.data?.combinations || {}).length > 0), h = S(() => {
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
    }, v = (p) => p?.replace("80", "") || "#888888", g = S(() => ({
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
    })), _ = S(() => ({
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
    return t({ isDark: i }), (p, b) => (y(), x("article", Ly, [
      c("header", Fy, [
        b[0] || (b[0] = c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Distribution of Number of Intents"),
          c("p", { class: "card-subtitle" }, "Analysis of intent combinations per conversation")
        ], -1)),
        c("span", Py, " Total: " + M(d.value), 1)
      ]),
      e.loading ? (y(), x("div", Ky, [...b[6] || (b[6] = [
        et('<div class="loading-container" data-v-cb93cda2><div class="chart-bars-loader" data-v-cb93cda2><div class="bar bar-1" data-v-cb93cda2></div><div class="bar bar-2" data-v-cb93cda2></div><div class="bar bar-3" data-v-cb93cda2></div><div class="bar bar-4" data-v-cb93cda2></div><div class="bar bar-5" data-v-cb93cda2></div></div><p class="loading-text" data-v-cb93cda2>Loading intent distribution...</p></div>', 1)
      ])])) : (y(), x("div", Ey, [
        u.value ? (y(), x(U, { key: 0 }, [
          c("div", Ry, [
            Z(ne, {
              data: g.value,
              options: _.value
            }, null, 8, ["data", "options"])
          ]),
          c("div", Iy, [
            b[3] || (b[3] = et('<div class="table-header" data-v-cb93cda2><div class="table-cell header-cell" data-v-cb93cda2>Number of intentions</div><div class="table-cell header-cell text-center" data-v-cb93cda2>0</div><div class="table-cell header-cell text-center" data-v-cb93cda2>1</div><div class="table-cell header-cell text-center" data-v-cb93cda2>2</div><div class="table-cell header-cell text-center" data-v-cb93cda2>3</div><div class="table-cell header-cell text-center" data-v-cb93cda2>4 or more</div></div>', 1)),
            c("div", Oy, [
              b[1] || (b[1] = c("div", { class: "table-cell row-label" }, "% of total", -1)),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: xt({ color: v(f.c0) })
              }, M(m(h.value.pct0)) + "% ", 5),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: xt({ color: v(f.c1) })
              }, M(m(h.value.pct1)) + "% ", 5),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: xt({ color: v(f.c2) })
              }, M(m(h.value.pct2)) + "% ", 5),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: xt({ color: v(f.c3) })
              }, M(m(h.value.pct3)) + "% ", 5),
              c("div", {
                class: "table-cell text-center percentage-cell",
                style: xt({ color: v(f.c4p) })
              }, M(m(h.value.pct4p)) + "% ", 5)
            ]),
            c("div", zy, [
              b[2] || (b[2] = c("div", { class: "table-cell row-label" }, "Count", -1)),
              c("div", Vy, M(T(Y)(l.value[0])), 1),
              c("div", Ny, M(T(Y)(l.value[1])), 1),
              c("div", Wy, M(T(Y)(l.value[2])), 1),
              c("div", Hy, M(T(Y)(l.value[3])), 1),
              c("div", jy, M(T(Y)(l.value["4p"])), 1)
            ])
          ]),
          e.enableExport ? (y(), ht(T(_t), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ], 64)) : (y(), x("div", Yy, [
          c("div", qy, [
            c("div", Uy, [
              Z(T(Rt), { class: "empty-icon" })
            ]),
            b[4] || (b[4] = c("p", { class: "empty-title" }, "No triage combinations data", -1)),
            b[5] || (b[5] = c("p", { class: "empty-description" }, "No intent distribution data found for the selected period. Try adjusting the date range.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Gy = /* @__PURE__ */ at(Xy, [["__scopeId", "data-v-cb93cda2"]]), Zy = { class: "select-language-card" }, Qy = { class: "card-header" }, Jy = { class: "header-content" }, t_ = {
  key: 0,
  class: "total-badge"
}, e_ = { class: "badge-value" }, a_ = {
  key: 0,
  class: "loading-state"
}, s_ = {
  key: 1,
  class: "card-body"
}, n_ = {
  key: 0,
  class: "pie-section"
}, o_ = {
  key: 1,
  class: "empty-state"
}, i_ = /* @__PURE__ */ Q({
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
    }, r = (v) => i[v]?.label || v.toUpperCase(), l = S(
      () => a.data?.items && a.data.items.length > 0
    ), d = S(
      () => (a.data?.items || []).reduce((v, g) => v + g.count, 0)
    ), u = S(() => {
      const v = {};
      for (const g of a.data?.items || [])
        v[g.language] = (v[g.language] || 0) + g.count;
      return Object.entries(v).map(([g, _]) => ({ language: g, count: _ })).sort((g, _) => _.count - g.count);
    }), h = S(() => ({
      labels: u.value.map((v) => r(v.language)),
      datasets: [{
        data: u.value.map((v) => v.count),
        backgroundColor: u.value.map((v, g) => o[g % o.length] + "80"),
        borderColor: u.value.map((v, g) => o[g % o.length]),
        borderWidth: 2,
        hoverOffset: 6
      }]
    })), f = S(() => ({
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
              const g = v.raw || 0, _ = d.value > 0 ? (g / d.value * 100).toFixed(1) : "0";
              return ` ${v.label}: ${g} (${_}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: s }), (v, g) => (y(), x("article", Zy, [
      c("header", Qy, [
        c("div", Jy, [
          g[1] || (g[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Language Selection"),
            c("p", { class: "card-subtitle" }, "Language distribution across conversations")
          ], -1)),
          a.loading ? E("", !0) : (y(), x("div", t_, [
            g[0] || (g[0] = c("p", { class: "badge-label" }, "Total", -1)),
            c("p", e_, M(T(Y)(d.value)), 1)
          ]))
        ])
      ]),
      a.loading ? (y(), x("div", a_, [...g[2] || (g[2] = [
        et('<div class="loading-container" data-v-216eadc2><div class="chart-bars-loader" data-v-216eadc2><div class="bar bar-1" data-v-216eadc2></div><div class="bar bar-2" data-v-216eadc2></div><div class="bar bar-3" data-v-216eadc2></div><div class="bar bar-4" data-v-216eadc2></div><div class="bar bar-5" data-v-216eadc2></div></div><p class="loading-text" data-v-216eadc2>Loading language data...</p></div>', 1)
      ])])) : (y(), x("div", s_, [
        l.value ? (y(), x("section", n_, [
          Z(Ga, {
            data: h.value,
            options: f.value
          }, null, 8, ["data", "options"])
        ])) : (y(), x("section", o_, [...g[3] || (g[3] = [
          et('<div class="empty-state-content" data-v-216eadc2><div class="empty-icon-wrapper" data-v-216eadc2><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-216eadc2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" data-v-216eadc2></path></svg></div><p class="empty-title" data-v-216eadc2>No language data available</p><p class="empty-description" data-v-216eadc2>No language selection data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), r_ = /* @__PURE__ */ at(i_, [["__scopeId", "data-v-216eadc2"]]), l_ = { class: "guardrails-card" }, c_ = { class: "card-header" }, d_ = { class: "header-content" }, u_ = {
  key: 0,
  class: "total-badge"
}, h_ = { class: "badge-value" }, f_ = {
  key: 0,
  class: "loading-state"
}, g_ = {
  key: 1,
  class: "card-body"
}, p_ = { class: "summary-card" }, v_ = { class: "summary-items" }, b_ = { class: "summary-item" }, m_ = { class: "summary-value" }, y_ = { class: "summary-pct" }, __ = { class: "summary-item" }, x_ = { class: "summary-pct" }, k_ = { class: "summary-item" }, w_ = { class: "summary-value" }, $_ = { class: "summary-pct" }, M_ = {
  key: 0,
  class: "table-section"
}, C_ = { class: "table-wrapper" }, S_ = { class: "data-table" }, D_ = { class: "table-body" }, A_ = { class: "table-cell font-medium text-center" }, T_ = { class: "table-cell text-center font-semibold" }, B_ = { class: "table-cell" }, L_ = { class: "type-badges-row" }, F_ = {
  key: 1,
  class: "empty-state"
}, ys = 3, P_ = /* @__PURE__ */ Q({
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
    const s = e, n = a, o = (p) => {
      n("export", p);
    }, { isDark: i } = lt(rt(s, "theme")), r = S(
      () => s.data?.items && s.data.items.length > 0
    ), l = S(
      () => (s.data?.items || []).reduce((p, b) => p + b.count, 0)
    ), d = (p) => {
      const b = {};
      for (const k of s.data?.items || [])
        b[k[p]] = (b[k[p]] || 0) + k.count;
      const $ = Object.entries(b).sort((k, C) => C[1] - k[1]);
      if ($.length === 0) return { name: "—", pct: 0 };
      const w = l.value;
      return {
        name: $[0][0],
        pct: w > 0 ? Math.round($[0][1] / w * 100) : 0
      };
    }, u = S(() => d("guardrail_type")), h = S(() => d("guardrail_action")), f = S(() => d("guardrail_source")), v = S(() => {
      const p = {};
      for (const b of s.data?.items || [])
        p[b.date] || (p[b.date] = {}), p[b.date][b.guardrail_type] = (p[b.date][b.guardrail_type] || 0) + b.count;
      return Object.entries(p).map(([b, $]) => ({
        date: b,
        total: Object.values($).reduce((w, k) => w + k, 0),
        types: Object.entries($).map(([w, k]) => ({ type: w, count: k })).sort((w, k) => k.count - w.count)
      })).sort((b, $) => new Date(b.date).getTime() - new Date($.date).getTime());
    }), g = nt(!1), _ = S(() => g.value ? v.value : v.value.slice(0, ys)), m = S(() => v.value.length > ys);
    return t({ isDark: i }), (p, b) => (y(), x("article", l_, [
      c("header", c_, [
        c("div", d_, [
          b[2] || (b[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Guardrails Metrics"),
            c("p", { class: "card-subtitle" }, "Content safety guardrail events and actions")
          ], -1)),
          s.loading ? E("", !0) : (y(), x("div", u_, [
            b[1] || (b[1] = c("p", { class: "badge-label" }, "Total Events", -1)),
            c("p", h_, M(T(Y)(l.value)), 1)
          ]))
        ])
      ]),
      s.loading ? (y(), x("div", f_, [...b[3] || (b[3] = [
        et('<div class="loading-container" data-v-02a2e95e><div class="chart-bars-loader" data-v-02a2e95e><div class="bar bar-1" data-v-02a2e95e></div><div class="bar bar-2" data-v-02a2e95e></div><div class="bar bar-3" data-v-02a2e95e></div><div class="bar bar-4" data-v-02a2e95e></div><div class="bar bar-5" data-v-02a2e95e></div></div><p class="loading-text" data-v-02a2e95e>Loading guardrails data...</p></div>', 1)
      ])])) : (y(), x("div", g_, [
        r.value ? (y(), x(U, { key: 0 }, [
          c("div", p_, [
            c("div", v_, [
              c("div", b_, [
                b[4] || (b[4] = c("span", { class: "summary-label" }, "Top type:", -1)),
                c("span", m_, M(u.value.name), 1),
                c("span", y_, "(" + M(u.value.pct) + "%)", 1)
              ]),
              b[7] || (b[7] = c("span", { class: "summary-dot" }, "·", -1)),
              c("div", __, [
                b[5] || (b[5] = c("span", { class: "summary-label" }, "Top action:", -1)),
                c("span", {
                  class: G(["summary-value", `summary-action-${h.value.name.toLowerCase()}`])
                }, M(h.value.name), 3),
                c("span", x_, "(" + M(h.value.pct) + "%)", 1)
              ]),
              b[8] || (b[8] = c("span", { class: "summary-dot" }, "·", -1)),
              c("div", k_, [
                b[6] || (b[6] = c("span", { class: "summary-label" }, "Top source:", -1)),
                c("span", w_, M(f.value.name), 1),
                c("span", $_, "(" + M(f.value.pct) + "%)", 1)
              ])
            ])
          ]),
          v.value.length > 0 ? (y(), x("section", M_, [
            b[11] || (b[11] = c("div", { class: "section-header" }, [
              c("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            c("div", C_, [
              c("table", S_, [
                b[9] || (b[9] = c("thead", null, [
                  c("tr", { class: "table-header-row" }, [
                    c("th", { class: "table-header" }, "Date"),
                    c("th", { class: "table-header text-center" }, "Count"),
                    c("th", { class: "table-header" }, "Types")
                  ])
                ], -1)),
                c("tbody", D_, [
                  (y(!0), x(U, null, tt(_.value, ($) => (y(), x("tr", {
                    key: $.date,
                    class: "table-row"
                  }, [
                    c("td", A_, M(T(At)($.date).format("DD/MM")), 1),
                    c("td", T_, M(T(Y)($.total)), 1),
                    c("td", B_, [
                      c("div", L_, [
                        (y(!0), x(U, null, tt($.types, (w) => (y(), x("span", {
                          key: w.type,
                          class: "type-count-badge"
                        }, M(w.type) + " (" + M(w.count) + ") ", 1))), 128))
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
              kt(M(g.value ? "View less" : `View more (${v.value.length - ys} more rows)`) + " ", 1),
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
            e.enableExport ? (y(), ht(T(_t), {
              key: 1,
              onExport: o,
              loading: e.exportLoading
            }, null, 8, ["loading"])) : E("", !0)
          ])) : E("", !0)
        ], 64)) : (y(), x("section", F_, [...b[12] || (b[12] = [
          et('<div class="empty-state-content" data-v-02a2e95e><div class="empty-icon-wrapper" data-v-02a2e95e><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-02a2e95e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" data-v-02a2e95e></path></svg></div><p class="empty-title" data-v-02a2e95e>No guardrail events</p><p class="empty-description" data-v-02a2e95e>No content safety events found for the selected period. This is a good sign!</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), E_ = /* @__PURE__ */ at(P_, [["__scopeId", "data-v-02a2e95e"]]), R_ = { class: "dn-metrics-card" }, I_ = { class: "card-header" }, O_ = { class: "header-content" }, z_ = {
  key: 0,
  class: "total-docs-badge"
}, V_ = { class: "badge-value" }, N_ = {
  key: 0,
  class: "loading-state"
}, W_ = {
  key: 1,
  class: "card-body"
}, H_ = { class: "kpi-grid" }, j_ = { class: "kpi-card kpi-neutral" }, Y_ = { class: "kpi-value" }, q_ = { class: "kpi-card kpi-success" }, U_ = { class: "kpi-value kpi-value-success" }, K_ = { class: "kpi-pct" }, X_ = { class: "kpi-card kpi-danger" }, G_ = { class: "kpi-value kpi-value-error" }, Z_ = { class: "kpi-pct" }, Q_ = { class: "kpi-card kpi-warning" }, J_ = { class: "kpi-value kpi-value-reason" }, t2 = { class: "kpi-pct" }, e2 = { class: "chart-section" }, a2 = { class: "chart-wrapper" }, s2 = {
  key: 1,
  class: "empty-chart"
}, n2 = {
  key: 0,
  class: "table-section"
}, o2 = { class: "table-wrapper" }, i2 = { class: "data-table" }, r2 = { class: "table-body" }, l2 = { class: "table-cell text-left font-medium" }, c2 = { class: "table-cell text-center font-semibold" }, d2 = { class: "table-cell text-center" }, u2 = { class: "impact-bar-container" }, h2 = { class: "impact-label" }, f2 = {
  key: 1,
  class: "chart-section"
}, g2 = { class: "chart-wrapper" }, p2 = { class: "system-health" }, v2 = { class: "system-health-content" }, b2 = { class: "sys-kpi-grid" }, m2 = { class: "sys-kpi" }, y2 = { class: "sys-value" }, _2 = { class: "sys-kpi" }, x2 = { class: "sys-value" }, k2 = { class: "sys-kpi" }, w2 = { class: "sys-value sys-error" }, $2 = { class: "sys-kpi" }, M2 = { class: "sys-value" }, C2 = { class: "sys-kpi" }, S2 = { class: "sys-value" }, D2 = { class: "sys-kpi" }, A2 = { class: "sys-value sys-error" }, T2 = {
  key: 1,
  class: "empty-state"
}, B2 = /* @__PURE__ */ Q({
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
    const s = e, n = a, o = (w) => {
      n("export", w);
    }, { isDark: i, colors: r } = lt(rt(s, "theme")), l = S(() => {
      const w = s.data?.documentCounts?.items || [], k = s.data?.processingCounts?.items || [];
      return w.length > 0 || k.length > 0;
    }), d = S(() => {
      const w = s.data?.documentCounts?.items || [];
      return {
        processing_started: w.reduce((k, C) => k + C.processing_started, 0),
        processing_completed: w.reduce((k, C) => k + C.processing_completed, 0),
        processing_failed: w.reduce((k, C) => k + C.processing_failed, 0),
        row_count_total: w.reduce((k, C) => k + C.row_count_total, 0)
      };
    }), u = S(() => {
      const w = s.data?.processingCounts?.items || [];
      return {
        processing_started: w.reduce((k, C) => k + C.processing_started, 0),
        processing_success: w.reduce((k, C) => k + C.processing_success, 0),
        notification_sent: w.reduce((k, C) => k + C.notification_sent, 0),
        notification_failed: w.reduce((k, C) => k + C.notification_failed, 0),
        dq_phone: w.reduce((k, C) => k + C.dq_error_phone_not_found, 0),
        dq_flight: w.reduce((k, C) => k + C.dq_error_flight_not_found, 0),
        dq_booking: w.reduce((k, C) => k + C.dq_error_booking_not_found, 0),
        dq_other: w.reduce((k, C) => k + C.dq_error_other, 0),
        totalDqErrors: w.reduce((k, C) => k + C.dq_error_phone_not_found + C.dq_error_flight_not_found + C.dq_error_booking_not_found + C.dq_error_other, 0)
      };
    }), h = S(() => d.value.row_count_total || u.value.processing_started), f = S(() => Math.max(0, h.value - u.value.notification_sent)), v = (w, k) => k ? `${Math.round(w / k * 100)}%` : "0%", g = S(() => {
      const w = [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Notification failed", count: u.value.notification_failed },
        { reason: "Other", count: u.value.dq_other }
      ].filter((k) => k.count > 0).sort((k, C) => C.count - k.count);
      return w.length > 0 ? w[0] : { reason: "None", count: 0 };
    }), _ = S(() => {
      const w = h.value;
      return [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Notification failed", count: u.value.notification_failed },
        { reason: "Other", count: u.value.dq_other }
      ].map((k) => ({
        ...k,
        impactPct: w > 0 ? Math.round(k.count / w * 100) : 0
      }));
    }), m = S(() => {
      const w = h.value, k = u.value.processing_success, C = Math.max(0, k - u.value.totalDqErrors), D = u.value.notification_sent, A = Math.max(0, w - k), P = u.value.totalDqErrors, R = Math.max(0, C - D), I = (L, F) => {
        const O = F > 0 ? Math.round(L / F * 100) : 0;
        return `${L.toLocaleString()} (${O}%)`;
      }, V = [
        { name: "Records Detected" },
        { name: "Valid Reservations" },
        { name: "Invalid / Unprocessed" },
        { name: "Contactable" },
        { name: "Data Quality Issues" },
        { name: "Notified" },
        { name: "Not Delivered" }
      ], q = [];
      return k > 0 && q.push({ source: "Records Detected", target: "Valid Reservations", value: k, label: I(k, w) }), A > 0 && q.push({ source: "Records Detected", target: "Invalid / Unprocessed", value: A, label: I(A, w) }), C > 0 && q.push({ source: "Valid Reservations", target: "Contactable", value: C, label: I(C, w) }), P > 0 && q.push({ source: "Valid Reservations", target: "Data Quality Issues", value: P, label: I(P, w) }), D > 0 && q.push({ source: "Contactable", target: "Notified", value: D, label: I(D, w) }), R > 0 && q.push({ source: "Contactable", target: "Not Delivered", value: R, label: I(R, w) }), { nodes: V, links: q };
    }), p = {
      "Records Detected": "#DBEAFE",
      "Valid Reservations": "#D1FAE5",
      "Invalid / Unprocessed": "#FEE2E2",
      Contactable: "#BBF7D0",
      "Data Quality Issues": "#FED7AA",
      Notified: "#86EFAC",
      "Not Delivered": "#FCA5A5"
    }, b = S(() => {
      const w = [...s.data?.processingCounts?.items || []].sort(
        (I, V) => new Date(I.date).getTime() - new Date(V.date).getTime()
      ), k = s.data?.documentCounts?.items || [], C = {};
      for (const I of k)
        C[I.date] = (C[I.date] || 0) + I.row_count_total;
      const D = [.../* @__PURE__ */ new Set([...w.map((I) => I.date), ...k.map((I) => I.date)])].sort(), A = D.map((I) => At(I).format("MMM DD")), P = D.map((I) => {
        const V = w.find((F) => F.date === I), q = V?.notification_sent || 0, L = C[I] || V?.processing_started || 0;
        return L > 0 ? Math.round(q / L * 100) : 0;
      }), R = D.map((I) => w.find((q) => q.date === I)?.notification_sent || 0);
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
    }), $ = S(() => ({
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
            label: (w) => w.datasetIndex === 0 ? ` Success Rate: ${w.raw}%` : ` Notifications: ${w.raw}`
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
          ticks: { font: { family: "'DM Sans', sans-serif", size: 11 }, color: r.value.textSecondary, callback: (w) => w + "%" },
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
    return t({ isDark: i }), (w, k) => (y(), x("article", R_, [
      c("header", I_, [
        c("div", O_, [
          k[1] || (k[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "Disruption Notifier"),
            c("p", { class: "card-subtitle" }, "Passenger notification effectiveness and delivery analysis")
          ], -1)),
          s.loading ? E("", !0) : (y(), x("div", z_, [
            k[0] || (k[0] = c("p", { class: "badge-label" }, "Total Records", -1)),
            c("p", V_, M(T(Y)(d.value.row_count_total)), 1)
          ]))
        ])
      ]),
      s.loading ? (y(), x("div", N_, [...k[2] || (k[2] = [
        et('<div class="loading-container" data-v-d8baf32c><div class="chart-bars-loader" data-v-d8baf32c><div class="bar bar-1" data-v-d8baf32c></div><div class="bar bar-2" data-v-d8baf32c></div><div class="bar bar-3" data-v-d8baf32c></div><div class="bar bar-4" data-v-d8baf32c></div><div class="bar bar-5" data-v-d8baf32c></div></div><p class="loading-text" data-v-d8baf32c>Loading disruption notifier data...</p></div>', 1)
      ])])) : (y(), x("div", W_, [
        l.value ? (y(), x(U, { key: 0 }, [
          c("div", H_, [
            c("div", j_, [
              k[3] || (k[3] = c("span", { class: "kpi-label" }, "Passengers Affected", -1)),
              c("span", Y_, M(T(Y)(h.value)), 1)
            ]),
            c("div", q_, [
              k[4] || (k[4] = c("span", { class: "kpi-label" }, "Successfully Notified", -1)),
              c("span", U_, M(T(Y)(u.value.notification_sent)), 1),
              c("span", K_, M(v(u.value.notification_sent, h.value)), 1)
            ]),
            c("div", X_, [
              k[5] || (k[5] = c("span", { class: "kpi-label" }, "Not Notified", -1)),
              c("span", G_, M(T(Y)(f.value)), 1),
              c("span", Z_, M(v(f.value, h.value)), 1)
            ]),
            c("div", Q_, [
              k[6] || (k[6] = c("span", { class: "kpi-label" }, "Main Failure Reason", -1)),
              c("span", J_, M(g.value.reason), 1),
              c("span", t2, M(T(Y)(g.value.count)) + " cases", 1)
            ])
          ]),
          c("section", e2, [
            k[8] || (k[8] = c("div", { class: "chart-header" }, [
              c("h4", { class: "section-title" }, "Passenger Disruption Funnel")
            ], -1)),
            c("div", a2, [
              m.value.nodes.length > 0 && m.value.links.length > 0 ? (y(), ht(be, {
                key: 0,
                data: m.value,
                "node-colors": p,
                height: "350px"
              }, null, 8, ["data"])) : (y(), x("div", s2, [...k[7] || (k[7] = [
                c("p", { class: "empty-chart-text" }, "No processing data available for visualization", -1)
              ])]))
            ])
          ]),
          _.value.length > 0 ? (y(), x("section", n2, [
            k[10] || (k[10] = c("div", { class: "section-header" }, [
              c("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
            ], -1)),
            c("div", o2, [
              c("table", i2, [
                k[9] || (k[9] = c("thead", null, [
                  c("tr", { class: "table-header-row" }, [
                    c("th", { class: "table-header text-left" }, "Reason"),
                    c("th", { class: "table-header text-center" }, "Count"),
                    c("th", { class: "table-header text-center" }, "Impact")
                  ])
                ], -1)),
                c("tbody", r2, [
                  (y(!0), x(U, null, tt(_.value, (C) => (y(), x("tr", {
                    key: C.reason,
                    class: "table-row"
                  }, [
                    c("td", l2, M(C.reason), 1),
                    c("td", c2, M(T(Y)(C.count)), 1),
                    c("td", d2, [
                      c("div", u2, [
                        c("div", {
                          class: "impact-bar",
                          style: xt({ width: C.impactPct + "%" })
                        }, null, 4),
                        c("span", h2, M(C.impactPct) + "%", 1)
                      ])
                    ])
                  ]))), 128))
                ])
              ])
            ])
          ])) : E("", !0),
          b.value.labels.length > 0 ? (y(), x("section", f2, [
            k[11] || (k[11] = c("div", { class: "chart-header" }, [
              c("h4", { class: "section-title" }, "Notification Success Rate by Day")
            ], -1)),
            c("div", g2, [
              Z(ve, {
                data: b.value,
                options: $.value
              }, null, 8, ["data", "options"])
            ])
          ])) : E("", !0),
          c("details", p2, [
            k[18] || (k[18] = c("summary", { class: "system-health-toggle" }, [
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
            c("div", v2, [
              c("div", b2, [
                c("div", m2, [
                  k[12] || (k[12] = c("span", { class: "sys-label" }, "Docs Started", -1)),
                  c("span", y2, M(T(Y)(d.value.processing_started)), 1)
                ]),
                c("div", _2, [
                  k[13] || (k[13] = c("span", { class: "sys-label" }, "Docs Completed", -1)),
                  c("span", x2, M(T(Y)(d.value.processing_completed)), 1)
                ]),
                c("div", k2, [
                  k[14] || (k[14] = c("span", { class: "sys-label" }, "Docs Failed", -1)),
                  c("span", w2, M(T(Y)(d.value.processing_failed)), 1)
                ]),
                c("div", $2, [
                  k[15] || (k[15] = c("span", { class: "sys-label" }, "Processing Started", -1)),
                  c("span", M2, M(T(Y)(u.value.processing_started)), 1)
                ]),
                c("div", C2, [
                  k[16] || (k[16] = c("span", { class: "sys-label" }, "Processing Success", -1)),
                  c("span", S2, M(T(Y)(u.value.processing_success)), 1)
                ]),
                c("div", D2, [
                  k[17] || (k[17] = c("span", { class: "sys-label" }, "Notification Failed", -1)),
                  c("span", A2, M(T(Y)(u.value.notification_failed)), 1)
                ])
              ])
            ])
          ]),
          e.enableExport ? (y(), ht(T(_t), {
            key: 2,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ], 64)) : (y(), x("section", T2, [...k[19] || (k[19] = [
          et('<div class="empty-state-content" data-v-d8baf32c><div class="empty-icon-wrapper" data-v-d8baf32c><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d8baf32c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" data-v-d8baf32c></path></svg></div><p class="empty-title" data-v-d8baf32c>No disruption notifier data</p><p class="empty-description" data-v-d8baf32c>No disruption notification data found for the selected period. Try adjusting the date range.</p></div>', 1)
        ])]))
      ]))
    ]));
  }
}), L2 = /* @__PURE__ */ at(B2, [["__scopeId", "data-v-d8baf32c"]]), F2 = { class: "card-header" }, P2 = {
  key: 0,
  class: "loading-state"
}, E2 = {
  key: 1,
  class: "card-body"
}, R2 = { class: "metric-value" }, I2 = /* @__PURE__ */ Q({
  __name: "TotalConversationsCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: s } = lt(rt(a, "theme")), n = S(() => Y(a.totalConversations)), o = S(
      () => a.previousTotalConversations !== null && a.previousTotalConversations !== void 0
    ), i = S(() => {
      if (!o.value) return 0;
      const d = a.previousTotalConversations;
      return d === 0 ? a.totalConversations > 0 ? 100 : 0 : (a.totalConversations - d) / d * 100;
    }), r = S(() => `${i.value > 0 ? "+" : ""}${i.value.toFixed(1)}% vs prev.`), l = S(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: s, changePercent: i }), (d, u) => (y(), x("article", {
      class: G(["highlight-card", { "highlight-card--dark": T(s) }])
    }, [
      c("header", F2, [
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
          class: G(["change-badge", l.value])
        }, M(r.value), 3)) : E("", !0)
      ]),
      e.loading ? (y(), x("div", P2, [...u[1] || (u[1] = [
        c("div", { class: "shimmer shimmer-value" }, null, -1),
        c("div", { class: "shimmer shimmer-label" }, null, -1)
      ])])) : (y(), x("div", E2, [
        c("span", R2, M(n.value), 1),
        u[2] || (u[2] = c("span", { class: "metric-label" }, "Total Conversations", -1))
      ]))
    ], 2));
  }
}), O2 = /* @__PURE__ */ at(I2, [["__scopeId", "data-v-cd9dd1ba"]]), z2 = { class: "card-header" }, V2 = {
  key: 0,
  class: "loading-state"
}, N2 = {
  key: 1,
  class: "card-body"
}, W2 = { class: "metric-value" }, H2 = /* @__PURE__ */ Q({
  __name: "CsatP95Card",
  props: {
    csatP95: { default: 0 },
    previousCsatP95: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: s } = lt(rt(a, "theme")), n = S(() => `${a.csatP95.toFixed(1)}`), o = S(
      () => a.previousCsatP95 !== null && a.previousCsatP95 !== void 0
    ), i = S(() => {
      if (!o.value) return 0;
      const d = a.previousCsatP95;
      return d === 0 ? a.csatP95 > 0 ? 100 : 0 : (a.csatP95 - d) / d * 100;
    }), r = S(() => `${i.value > 0 ? "+" : ""}${i.value.toFixed(1)}% vs prev.`), l = S(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: s, changePercent: i }), (d, u) => (y(), x("article", {
      class: G(["highlight-card", { "highlight-card--dark": T(s) }])
    }, [
      c("header", z2, [
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
          class: G(["change-badge", l.value])
        }, M(r.value), 3)) : E("", !0)
      ]),
      e.loading ? (y(), x("div", V2, [...u[1] || (u[1] = [
        c("div", { class: "shimmer shimmer-value" }, null, -1),
        c("div", { class: "shimmer shimmer-label" }, null, -1)
      ])])) : (y(), x("div", N2, [
        c("span", W2, M(n.value), 1),
        u[2] || (u[2] = c("span", { class: "metric-label" }, "CSAT P95", -1))
      ]))
    ], 2));
  }
}), j2 = /* @__PURE__ */ at(H2, [["__scopeId", "data-v-e36f6025"]]), Y2 = { class: "card-header" }, q2 = {
  key: 0,
  class: "loading-state"
}, U2 = {
  key: 1,
  class: "card-body"
}, K2 = { class: "metric-value" }, X2 = /* @__PURE__ */ Q({
  __name: "AiGeneratedRevenueCard",
  props: {
    totalRevenue: { default: 0 },
    previousTotalRevenue: { default: null },
    currencyCode: { default: "USD" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: s } = lt(rt(a, "theme")), n = S(() => `${a.currencyCode} ${Y(Math.round(a.totalRevenue))}`), o = S(
      () => a.previousTotalRevenue !== null && a.previousTotalRevenue !== void 0
    ), i = S(() => {
      if (!o.value) return 0;
      const d = a.previousTotalRevenue;
      return d === 0 ? a.totalRevenue > 0 ? 100 : 0 : (a.totalRevenue - d) / d * 100;
    }), r = S(() => `${i.value > 0 ? "+" : ""}${i.value.toFixed(1)}% vs prev.`), l = S(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: s, changePercent: i }), (d, u) => (y(), x("article", {
      class: G(["highlight-card", { "highlight-card--dark": T(s) }])
    }, [
      c("header", Y2, [
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
          class: G(["change-badge", l.value])
        }, M(r.value), 3)) : E("", !0)
      ]),
      e.loading ? (y(), x("div", q2, [...u[1] || (u[1] = [
        c("div", { class: "shimmer shimmer-value" }, null, -1),
        c("div", { class: "shimmer shimmer-label" }, null, -1)
      ])])) : (y(), x("div", U2, [
        c("span", K2, M(n.value), 1),
        u[2] || (u[2] = c("span", { class: "metric-label" }, "AI-Generated Revenue", -1))
      ]))
    ], 2));
  }
}), G2 = /* @__PURE__ */ at(X2, [["__scopeId", "data-v-3e72b6f0"]]), Z2 = { class: "nps-daily-card" }, Q2 = { class: "card-header" }, J2 = { class: "header-content" }, tx = {
  key: 0,
  class: "stats-badge"
}, ex = { class: "badge-value" }, ax = {
  key: 0,
  class: "loading-state"
}, sx = {
  key: 1,
  class: "card-body"
}, nx = { class: "tooltip-content" }, ox = { class: "tooltip-title" }, ix = { class: "tooltip-stats" }, rx = { class: "tooltip-stat-row" }, lx = { class: "tooltip-value" }, cx = { class: "tooltip-stat-row" }, dx = { class: "tooltip-value" }, ux = { class: "tooltip-stat-row" }, hx = { class: "tooltip-value" }, fx = { class: "tooltip-stat-row" }, gx = { class: "tooltip-value" }, px = { class: "tooltip-stat-row" }, vx = { class: "tooltip-value" }, bx = { class: "tooltip-stat-row" }, mx = { class: "tooltip-value" }, yx = {
  key: 2,
  class: "empty-state"
}, Mo = 400, Ke = 60, Co = 90, So = 120, _x = {
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
    const s = a, n = (m) => {
      s("export", m);
    }, o = e, { isDark: i } = lt(rt(o, "theme")), r = S(() => o.data), l = nt(null), d = nt({
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
    }), u = S(() => {
      if (!r.value || !r.value.nps_by_day) return 800;
      const m = r.value.nps_by_day.length;
      return Math.max(800, Ke * 2 + m * So);
    }), h = (m, p) => {
      const $ = (m - 1) / 9;
      return Ke + p - $ * p;
    }, f = (m) => m ? At(m).format("DD-MM-YYYY") : "", v = S(() => {
      if (!r.value || !r.value.nps_by_day || r.value.nps_by_day.length === 0)
        return [];
      const m = [], p = Mo - Ke - Co;
      return r.value.nps_by_day.forEach((b, $) => {
        const w = b.min_score || 0, k = b.q1_score || 0, C = b.median_score || 0, D = b.q3_score || 0, A = b.max_score || 0, P = b.average_score || 0;
        m.push({
          label: f(b.date),
          responseCount: b.nps_responses_count || 0,
          isTotal: !1,
          low: w,
          q1: k,
          median: C,
          q3: D,
          high: A,
          average: P,
          highY: h(A, p),
          lowY: h(w, p),
          q1Y: h(k, p),
          q3Y: h(D, p),
          medianY: h(C, p),
          averageY: P > 0 ? h(P, p) : null,
          centerX: Ke + ($ + 1) * So
        });
      }), m;
    }), g = (m, p) => {
      if (!l.value || !p || p.horizontal) return;
      const b = l.value.getBoundingClientRect(), $ = m.clientX, w = m.clientY, k = 140, C = 160, D = 10, A = 15;
      let P = $ - b.left - k / 2, R = w - b.top - C - A;
      P = Math.max(D, Math.min(P, b.width - k - D)), R < D && (R = w - b.top + A), R = Math.max(D, Math.min(R, b.height - C - D)), d.value = {
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
    return t({ isDark: i }), (m, p) => (y(), x("article", Z2, [
      c("header", Q2, [
        c("div", J2, [
          p[1] || (p[1] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "CSAT Daily Metrics"),
            c("p", { class: "card-subtitle" }, "Daily CSAT Distribution")
          ], -1)),
          r.value && r.value.nps_by_day && r.value.nps_by_day.length > 0 ? (y(), x("div", tx, [
            p[0] || (p[0] = c("p", { class: "badge-label" }, "Days", -1)),
            c("p", ex, M(r.value.nps_by_day.length), 1)
          ])) : E("", !0)
        ])
      ]),
      o.loading ? (y(), x("div", ax, [...p[2] || (p[2] = [
        et('<div class="loading-container" data-v-b20112a7><div class="chart-flow-loader" data-v-b20112a7><div class="flow-line flow-1" data-v-b20112a7></div><div class="flow-line flow-2" data-v-b20112a7></div><div class="flow-line flow-3" data-v-b20112a7></div><div class="flow-line flow-4" data-v-b20112a7></div><div class="flow-line flow-5" data-v-b20112a7></div></div><p class="loading-text" data-v-b20112a7>Loading daily NPS data...</p></div>', 1)
      ])])) : r.value && r.value.nps_by_day && r.value.nps_by_day.length > 0 ? (y(), x("div", sx, [
        c("div", {
          class: "chart-wrapper",
          ref_key: "chartContainerRef",
          ref: l
        }, [
          v.value && v.value.length > 0 ? (y(), ht(Ei, {
            key: 0,
            "candlestick-data": v.value,
            "chart-width": u.value,
            "chart-height": Mo,
            "chart-margin": Ke,
            "chart-bottom-margin": Co,
            "show-legend": !0,
            rotation: 0,
            "candle-width": 30,
            onCandleHover: g,
            onCandleLeave: _
          }, null, 8, ["candlestick-data", "chart-width"])) : E("", !0),
          d.value.visible ? (y(), x("div", {
            key: 1,
            class: "tooltip-overlay",
            style: xt({
              left: `${d.value.x}px`,
              top: `${d.value.y}px`
            })
          }, [
            c("div", nx, [
              c("div", ox, M(d.value.date), 1),
              p[9] || (p[9] = c("div", { class: "tooltip-divider" }, null, -1)),
              c("div", ix, [
                c("div", rx, [
                  p[3] || (p[3] = c("span", { class: "tooltip-label tooltip-min" }, "Min:", -1)),
                  c("span", lx, M(d.value.min), 1)
                ]),
                c("div", cx, [
                  p[4] || (p[4] = c("span", { class: "tooltip-label tooltip-q1" }, "Q1:", -1)),
                  c("span", dx, M(d.value.q1), 1)
                ]),
                c("div", ux, [
                  p[5] || (p[5] = c("span", { class: "tooltip-label tooltip-median" }, "Median:", -1)),
                  c("span", hx, M(d.value.median), 1)
                ]),
                c("div", fx, [
                  p[6] || (p[6] = c("span", { class: "tooltip-label tooltip-avg" }, "Avg:", -1)),
                  c("span", gx, M(d.value.avg), 1)
                ]),
                c("div", px, [
                  p[7] || (p[7] = c("span", { class: "tooltip-label tooltip-q3" }, "Q3:", -1)),
                  c("span", vx, M(d.value.q3), 1)
                ]),
                c("div", bx, [
                  p[8] || (p[8] = c("span", { class: "tooltip-label tooltip-max" }, "Max:", -1)),
                  c("span", mx, M(d.value.max), 1)
                ])
              ])
            ])
          ], 4)) : E("", !0)
        ], 512),
        e.enableExport ? (y(), ht(T(_t), {
          key: 0,
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ])) : (y(), x("div", yx, [...p[10] || (p[10] = [
        et('<div class="empty-state-content" data-v-b20112a7><div class="empty-icon-wrapper" data-v-b20112a7><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-b20112a7><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-b20112a7></path></svg></div><p class="empty-title" data-v-b20112a7>No daily NPS data available</p><p class="empty-description" data-v-b20112a7>No daily NPS data found for the selected period. Try adjusting the date range.</p></div>', 1)
      ])]))
    ]));
  }
}, zi = /* @__PURE__ */ at(_x, [["__scopeId", "data-v-b20112a7"]]), xx = { class: "nps-overview-card" }, kx = { class: "card-header" }, wx = { class: "header-content" }, $x = { class: "header-badges" }, Mx = {
  key: 0,
  class: "stats-badge"
}, Cx = { class: "badge-value" }, Sx = {
  key: 1,
  class: "stats-badge"
}, Dx = { class: "badge-value" }, Ax = {
  key: 0,
  class: "loading-state"
}, Tx = {
  key: 1,
  class: "card-body"
}, Bx = { class: "chart-wrapper" }, Lx = {
  key: 2,
  class: "empty-state"
}, Fx = 500, Px = 60, Ex = 80, Rx = {
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
    }, o = e, { isDark: i } = lt(rt(o, "theme")), r = S(() => o.data), l = S(() => Math.max(600, window.innerWidth * 0.85));
    return t({ isDark: i }), (d, u) => (y(), x("article", xx, [
      c("header", kx, [
        c("div", wx, [
          u[2] || (u[2] = c("div", { class: "title-section" }, [
            c("h3", { class: "card-title" }, "CSAT Overview Metrics"),
            c("p", { class: "card-subtitle" }, "Overall CSAT Distribution")
          ], -1)),
          c("div", $x, [
            r.value && r.value.total_nps_responses > 0 ? (y(), x("div", Mx, [
              u[0] || (u[0] = c("p", { class: "badge-label" }, "Responses", -1)),
              c("p", Cx, M(r.value.total_nps_responses), 1)
            ])) : E("", !0),
            r.value && r.value.p95_score > 0 ? (y(), x("div", Sx, [
              u[1] || (u[1] = c("p", { class: "badge-label" }, "Percentile 95", -1)),
              c("p", Dx, M(r.value.p95_score || 0), 1)
            ])) : E("", !0)
          ])
        ])
      ]),
      o.loading ? (y(), x("div", Ax, [...u[3] || (u[3] = [
        et('<div class="loading-container" data-v-30fe5f88><div class="chart-flow-loader" data-v-30fe5f88><div class="flow-line flow-1" data-v-30fe5f88></div><div class="flow-line flow-2" data-v-30fe5f88></div><div class="flow-line flow-3" data-v-30fe5f88></div><div class="flow-line flow-4" data-v-30fe5f88></div><div class="flow-line flow-5" data-v-30fe5f88></div></div><p class="loading-text" data-v-30fe5f88>Loading NPS data...</p></div>', 1)
      ])])) : r.value && r.value.total_nps_responses > 0 ? (y(), x("div", Tx, [
        c("div", Bx, [
          Z(Ri, {
            histogram: r.value.histogram || [],
            "min-score": r.value.min_score || 0,
            "max-score": r.value.max_score || 0,
            "q1-score": r.value.q1_score || 0,
            "median-score": r.value.median_score || 0,
            "q3-score": r.value.q3_score || 0,
            "average-score": r.value.average_score || 0,
            "chart-width": l.value,
            "chart-height": Fx,
            "chart-margin": Px,
            "chart-bottom-margin": Ex
          }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score", "chart-width"])
        ]),
        e.enableExport ? (y(), ht(T(_t), {
          key: 0,
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ])) : (y(), x("div", Lx, [...u[4] || (u[4] = [
        et('<div class="empty-state-content" data-v-30fe5f88><div class="empty-icon-wrapper" data-v-30fe5f88><svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-30fe5f88><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-30fe5f88></path></svg></div><p class="empty-title" data-v-30fe5f88>No NPS data available</p><p class="empty-description" data-v-30fe5f88>No NPS data found for the selected period. Try adjusting the date range.</p></div>', 1)
      ])]))
    ]));
  }
}, Vi = /* @__PURE__ */ at(Rx, [["__scopeId", "data-v-30fe5f88"]]), Ix = { class: "nps-metrics-container" }, Ox = {
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
    return (n, o) => (y(), x("div", Ix, [
      Z(Vi, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: s
      }, null, 8, ["data", "loading", "enable-export"]),
      Z(zi, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: s
      }, null, 8, ["data", "loading", "enable-export"])
    ]));
  }
}, zx = /* @__PURE__ */ at(Ox, [["__scopeId", "data-v-25fe3b80"]]), Vx = { class: "aws-cost-card" }, Nx = { class: "card-header" }, Wx = { class: "header-main" }, Hx = { class: "header-content" }, jx = { class: "card-title" }, Yx = { class: "header-stats" }, qx = { class: "stat-badge primary" }, Ux = { class: "stat-value" }, Kx = { class: "stat-badge secondary" }, Xx = { class: "stat-value" }, Gx = { class: "card-body" }, Zx = {
  key: 0,
  class: "loading-state"
}, Qx = {
  key: 1,
  class: "chart-section"
}, Jx = { class: "chart-container" }, tk = {
  key: 2,
  class: "empty-state"
}, ek = { class: "empty-state-content" }, ak = { class: "empty-icon-wrapper" }, sk = {
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
    const t = e, { isDark: a, colors: s } = lt(rt(t, "theme")), n = S(() => {
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
    }), o = S(() => {
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
    }), i = S(() => ({
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
    return (r, l) => (y(), x("article", Vx, [
      c("header", Nx, [
        c("div", Wx, [
          c("div", Hx, [
            c("h3", jx, M(n.value.airline_name || "AWS Cost"), 1),
            l[0] || (l[0] = c("p", { class: "card-subtitle" }, "AWS vs Allocated costs over time", -1))
          ]),
          c("div", Yx, [
            c("div", qx, [
              l[1] || (l[1] = c("span", { class: "stat-label" }, "Total Allocated", -1)),
              c("span", Ux, M(T(ft)(n.value.total_allocated_cost)), 1)
            ]),
            c("div", Kx, [
              l[2] || (l[2] = c("span", { class: "stat-label" }, "Total AWS", -1)),
              c("span", Xx, M(T(ft)(n.value.total_cost)), 1)
            ])
          ])
        ])
      ]),
      c("div", Gx, [
        e.loading ? (y(), x("div", Zx, [...l[3] || (l[3] = [
          et('<div class="loading-container" data-v-c023bd59><div class="chart-lines-loader" data-v-c023bd59><div class="line line-1" data-v-c023bd59></div><div class="line line-2" data-v-c023bd59></div><div class="line line-3" data-v-c023bd59></div><div class="line line-4" data-v-c023bd59></div><div class="line line-5" data-v-c023bd59></div></div><p class="loading-text" data-v-c023bd59>Loading chart data...</p></div>', 1)
        ])])) : n.value.daily.length > 0 ? (y(), x("div", Qx, [
          c("div", Jx, [
            Z(ve, {
              data: o.value,
              options: i.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", tk, [
          c("div", ek, [
            c("div", ak, [
              Z(T(Rt), { class: "empty-icon" })
            ]),
            l[4] || (l[4] = c("p", { class: "empty-title" }, "Sin datos de costos", -1)),
            l[5] || (l[5] = c("p", { class: "empty-description" }, "No se encontró información para el periodo seleccionado. Intenta ajustar el rango de fechas.", -1))
          ])
        ]))
      ])
    ]));
  }
}, nk = /* @__PURE__ */ at(sk, [["__scopeId", "data-v-c023bd59"]]), ok = { class: "cost-usage-card" }, ik = {
  key: 0,
  class: "card-body"
}, rk = {
  key: 0,
  class: "chart-section"
}, lk = { class: "chart-container" }, ck = { class: "kpi-grid" }, dk = { class: "kpi-card" }, uk = { class: "kpi-value" }, hk = { class: "kpi-card" }, fk = { class: "kpi-value" }, gk = { class: "kpi-card" }, pk = { class: "kpi-value" }, vk = { class: "kpi-card" }, bk = { class: "kpi-value" }, mk = { class: "kpi-card" }, yk = { class: "kpi-value" }, _k = { class: "kpi-card highlighted" }, xk = { class: "kpi-value gradient-text" }, kk = {
  key: 1,
  class: "empty-state"
}, wk = { class: "empty-state-content" }, $k = { class: "empty-icon-wrapper" }, Mk = {
  key: 1,
  class: "loading-state"
}, Ck = /* @__PURE__ */ Q({
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
    const s = e, { isDark: n, colors: o } = lt(rt(s, "theme")), i = (g) => {
      const _ = new Date(g), m = String(_.getDate()).padStart(2, "0"), p = String(_.getMonth() + 1).padStart(2, "0");
      return `${m}-${p}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = S(() => {
      const g = s.data?.costs_by_day || {};
      return Object.values(g).reduce((_, m) => _ + (m.input_cost || 0), 0);
    }), d = S(() => {
      const g = s.data?.costs_by_day || {};
      return Object.values(g).reduce((_, m) => _ + (m.output_cost || 0), 0);
    }), u = S(() => {
      const g = s.data?.costs_by_day || {};
      return Object.values(g).reduce((_, m) => _ + (m.cache_read_cost || 0), 0);
    }), h = S(() => {
      const g = s.data?.costs_by_day || {};
      return Object.values(g).reduce((_, m) => _ + (m.cache_write_cost || 0), 0);
    }), f = S(() => {
      const g = s.data?.costs_by_day || {}, _ = Object.keys(g).sort();
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
    }), v = S(() => s.options ? s.options : {
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
              return _ && (_ += ": "), g.parsed.y !== null && (_ += ft(g.parsed.y)), _;
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
              return ft(g);
            }
          }
        }
      }
    });
    return t({ isDark: n }), (g, _) => (y(), x("article", ok, [
      _[9] || (_[9] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Cost Usage"),
          c("p", { class: "card-subtitle" }, "Cost breakdown over time (stacked)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", Mk, [..._[8] || (_[8] = [
        et('<div class="loading-container" data-v-62f96954><div class="chart-lines-loader" data-v-62f96954><div class="line line-1" data-v-62f96954></div><div class="line line-2" data-v-62f96954></div><div class="line line-3" data-v-62f96954></div><div class="line line-4" data-v-62f96954></div><div class="line line-5" data-v-62f96954></div></div><p class="loading-text" data-v-62f96954>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", ik, [
        f.value.labels && f.value.labels.length ? (y(), x("section", rk, [
          c("div", lk, [
            Z(ne, {
              data: f.value,
              options: v.value,
              stacked: !0
            }, null, 8, ["data", "options"])
          ]),
          c("footer", ck, [
            c("div", dk, [
              _[0] || (_[0] = c("span", { class: "kpi-label" }, "Total Cost", -1)),
              c("span", uk, M(T(ft)(e.data.total_cost)), 1)
            ]),
            c("div", hk, [
              _[1] || (_[1] = c("span", { class: "kpi-label" }, "Input Cost", -1)),
              c("span", fk, M(T(ft)(l.value)), 1)
            ]),
            c("div", gk, [
              _[2] || (_[2] = c("span", { class: "kpi-label" }, "Output Cost", -1)),
              c("span", pk, M(T(ft)(d.value)), 1)
            ]),
            c("div", vk, [
              _[3] || (_[3] = c("span", { class: "kpi-label" }, "Cache Read", -1)),
              c("span", bk, M(T(ft)(u.value)), 1)
            ]),
            c("div", mk, [
              _[4] || (_[4] = c("span", { class: "kpi-label" }, "Cache Write", -1)),
              c("span", yk, M(T(ft)(h.value)), 1)
            ]),
            c("div", _k, [
              _[5] || (_[5] = c("span", { class: "kpi-label" }, "Avg / Conv.", -1)),
              c("span", xk, M(T(ft)(e.data.avg_cost_per_conversation)), 1)
            ])
          ])
        ])) : (y(), x("section", kk, [
          c("div", wk, [
            c("div", $k, [
              Z(T(Rt), { class: "empty-icon" })
            ]),
            _[6] || (_[6] = c("p", { class: "empty-title" }, "No cost usage data", -1)),
            _[7] || (_[7] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see cost breakdown trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Sk = /* @__PURE__ */ at(Ck, [["__scopeId", "data-v-62f96954"]]), Dk = { class: "token-usage-card" }, Ak = {
  key: 0,
  class: "card-body"
}, Tk = {
  key: 0,
  class: "chart-section"
}, Bk = { class: "chart-container" }, Lk = { class: "kpi-grid" }, Fk = { class: "kpi-card" }, Pk = { class: "kpi-value" }, Ek = { class: "kpi-card" }, Rk = { class: "kpi-value" }, Ik = { class: "kpi-card" }, Ok = { class: "kpi-value" }, zk = { class: "kpi-card" }, Vk = { class: "kpi-value" }, Nk = { class: "kpi-card" }, Wk = { class: "kpi-value" }, Hk = {
  key: 1,
  class: "empty-state"
}, jk = { class: "empty-state-content" }, Yk = { class: "empty-icon-wrapper" }, qk = {
  key: 1,
  class: "loading-state"
}, Uk = /* @__PURE__ */ Q({
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
      const h = new Date(u), f = String(h.getDate()).padStart(2, "0"), v = String(h.getMonth() + 1).padStart(2, "0");
      return `${f}-${v}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = S(() => {
      const u = s.data?.tokens_by_day || {}, h = Object.keys(u).sort();
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
    }), d = S(() => s.options ? s.options : {
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
    return t({ isDark: n }), (u, h) => (y(), x("article", Dk, [
      h[8] || (h[8] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Token Usage"),
          c("p", { class: "card-subtitle" }, "Token consumption over time (stacked)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", qk, [...h[7] || (h[7] = [
        et('<div class="loading-container" data-v-e9e355be><div class="chart-lines-loader" data-v-e9e355be><div class="line line-1" data-v-e9e355be></div><div class="line line-2" data-v-e9e355be></div><div class="line line-3" data-v-e9e355be></div><div class="line line-4" data-v-e9e355be></div><div class="line line-5" data-v-e9e355be></div></div><p class="loading-text" data-v-e9e355be>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", Ak, [
        l.value.labels && l.value.labels.length ? (y(), x("section", Tk, [
          c("div", Bk, [
            Z(ne, {
              data: l.value,
              options: d.value,
              stacked: !0
            }, null, 8, ["data", "options"])
          ]),
          c("footer", Lk, [
            c("div", Fk, [
              h[0] || (h[0] = c("span", { class: "kpi-label" }, "Total Tokens", -1)),
              c("span", Pk, M(T(Y)(e.data.total_tokens)), 1)
            ]),
            c("div", Ek, [
              h[1] || (h[1] = c("span", { class: "kpi-label" }, "Input", -1)),
              c("span", Rk, M(T(Y)(e.data.total_input_tokens)), 1)
            ]),
            c("div", Ik, [
              h[2] || (h[2] = c("span", { class: "kpi-label" }, "Output", -1)),
              c("span", Ok, M(T(Y)(e.data.total_output_tokens)), 1)
            ]),
            c("div", zk, [
              h[3] || (h[3] = c("span", { class: "kpi-label" }, "Cache Read", -1)),
              c("span", Vk, M(T(Y)(e.data.total_cache_read_tokens)), 1)
            ]),
            c("div", Nk, [
              h[4] || (h[4] = c("span", { class: "kpi-label" }, "Cache Write", -1)),
              c("span", Wk, M(T(Y)(e.data.total_cache_write_tokens)), 1)
            ])
          ])
        ])) : (y(), x("section", Hk, [
          c("div", jk, [
            c("div", Yk, [
              Z(T(Rt), { class: "empty-icon" })
            ]),
            h[5] || (h[5] = c("p", { class: "empty-title" }, "No token usage data", -1)),
            h[6] || (h[6] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see token consumption trends.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Kk = /* @__PURE__ */ at(Uk, [["__scopeId", "data-v-e9e355be"]]), Xk = { class: "conversation-count-card" }, Gk = { class: "card-header" }, Zk = { class: "header-right" }, Qk = { class: "stat-badge" }, Jk = { class: "stat-value" }, t5 = {
  key: 0,
  class: "card-body"
}, e5 = {
  key: 0,
  class: "chart-section"
}, a5 = { class: "chart-container" }, s5 = {
  key: 1,
  class: "empty-state"
}, n5 = { class: "empty-state-content" }, o5 = { class: "empty-icon-wrapper" }, i5 = {
  key: 1,
  class: "loading-state"
}, r5 = /* @__PURE__ */ Q({
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
    S(() => {
      if (a.data?.start_date && a.data?.end_date) {
        const l = o(a.data.start_date), d = o(a.data.end_date);
        return `${l} - ${d}`;
      }
      return "N/A";
    });
    const i = S(() => {
      const l = a.data?.conversations_by_day || {}, d = Object.keys(l).sort();
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
    }), r = S(() => a.options ? a.options : {
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
    return t({ isDark: s }), (l, d) => (y(), x("article", Xk, [
      c("header", Gk, [
        d[1] || (d[1] = c("div", { class: "header-left" }, [
          c("div", { class: "header-content" }, [
            c("h3", { class: "card-title" }, "Conversation Count"),
            c("p", { class: "card-subtitle" }, "Conversations over time")
          ])
        ], -1)),
        c("div", Zk, [
          c("div", Qk, [
            d[0] || (d[0] = c("span", { class: "stat-label" }, "Total", -1)),
            c("span", Jk, M(e.data.total_conversations || 0), 1)
          ])
        ])
      ]),
      e.loading ? (y(), x("div", i5, [...d[4] || (d[4] = [
        et('<div class="loading-container" data-v-846f24b1><div class="chart-lines-loader" data-v-846f24b1><div class="line line-1" data-v-846f24b1></div><div class="line line-2" data-v-846f24b1></div><div class="line line-3" data-v-846f24b1></div><div class="line line-4" data-v-846f24b1></div><div class="line line-5" data-v-846f24b1></div></div><p class="loading-text" data-v-846f24b1>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", t5, [
        i.value.labels && i.value.labels.length ? (y(), x("section", e5, [
          c("div", a5, [
            Z(ve, {
              data: i.value,
              options: r.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", s5, [
          c("div", n5, [
            c("div", o5, [
              Z(T(Rt), { class: "empty-icon" })
            ]),
            d[2] || (d[2] = c("p", { class: "empty-title" }, "No conversation count data", -1)),
            d[3] || (d[3] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), l5 = /* @__PURE__ */ at(r5, [["__scopeId", "data-v-846f24b1"]]), c5 = { class: "top-agents-card" }, d5 = {
  key: 0,
  class: "card-body"
}, u5 = {
  key: 0,
  class: "charts-grid"
}, h5 = { class: "chart-section" }, f5 = { class: "chart-container" }, g5 = { class: "chart-section" }, p5 = { class: "chart-container" }, v5 = {
  key: 1,
  class: "empty-state"
}, b5 = { class: "empty-state-content" }, m5 = { class: "empty-icon-wrapper" }, y5 = {
  key: 1,
  class: "loading-state"
}, _5 = /* @__PURE__ */ Q({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: s, colors: n } = lt(rt(a, "theme")), o = S(() => a.data?.top_agents && a.data.top_agents.length > 0), i = S(() => a.data?.top_agents ? [...a.data.top_agents].sort((f, v) => (v.total_cost || 0) - (f.total_cost || 0)) : []), r = S(() => a.data?.top_agents ? [...a.data.top_agents].sort((f, v) => (v.total_tokens || 0) - (f.total_tokens || 0)) : []), l = S(() => {
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
    }), d = S(() => {
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
    }), u = S(() => a.options ? a.options : {
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
            title: function(f) {
              return f[0]?.label || "";
            },
            label: function(f) {
              const v = f.label, g = a.data?.top_agents?.find((_) => _.agent_type === v);
              return g ? [
                `Total Cost: ${ft(g.total_cost)}`,
                `Input Cost: ${ft(g.total_input_tokens_cost)}`,
                `Output Cost: ${ft(g.total_output_tokens_cost)}`,
                `Cache Read: ${ft(g.total_read_tokens_cost)}`,
                `Cache Write: ${ft(g.total_write_tokens_cost)}`
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
              return ft(f);
            }
          }
        }
      }
    }), h = S(() => a.options ? a.options : {
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
            title: function(f) {
              return f[0]?.label || "";
            },
            label: function(f) {
              const v = f.label, g = a.data?.top_agents?.find((_) => _.agent_type === v);
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
    return t({ isDark: s }), (f, v) => (y(), x("article", c5, [
      v[5] || (v[5] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Top Agents Analysis"),
          c("p", { class: "card-subtitle" }, "Cost and token usage by agent")
        ])
      ], -1)),
      e.loading ? (y(), x("div", y5, [...v[4] || (v[4] = [
        et('<div class="loading-container" data-v-78efa6dc><div class="chart-lines-loader" data-v-78efa6dc><div class="line line-1" data-v-78efa6dc></div><div class="line line-2" data-v-78efa6dc></div><div class="line line-3" data-v-78efa6dc></div><div class="line line-4" data-v-78efa6dc></div><div class="line line-5" data-v-78efa6dc></div></div><p class="loading-text" data-v-78efa6dc>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", d5, [
        o.value ? (y(), x("div", u5, [
          c("section", h5, [
            v[0] || (v[0] = c("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
            c("div", f5, [
              Z(ne, {
                data: l.value,
                options: u.value
              }, null, 8, ["data", "options"])
            ])
          ]),
          c("section", g5, [
            v[1] || (v[1] = c("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
            c("div", p5, [
              Z(ne, {
                data: d.value,
                options: h.value
              }, null, 8, ["data", "options"])
            ])
          ])
        ])) : (y(), x("section", v5, [
          c("div", b5, [
            c("div", m5, [
              Z(T(Rt), { class: "empty-icon" })
            ]),
            v[2] || (v[2] = c("p", { class: "empty-title" }, "No top agents data", -1)),
            v[3] || (v[3] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent analysis.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), x5 = /* @__PURE__ */ at(_5, [["__scopeId", "data-v-78efa6dc"]]), k5 = { class: "top-agents-card" }, w5 = {
  key: 0,
  class: "card-body"
}, $5 = {
  key: 0,
  class: "chart-section"
}, M5 = { class: "chart-container" }, C5 = {
  key: 1,
  class: "empty-state"
}, S5 = { class: "empty-state-content" }, D5 = { class: "empty-icon-wrapper" }, A5 = {
  key: 1,
  class: "loading-state"
}, T5 = /* @__PURE__ */ Q({
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
    }, i = S(() => a.data?.top_agents ? a.data.top_agents.filter(
      (h) => h.agent_type?.toLowerCase() !== "triage"
    ) : []), r = S(() => i.value.length > 0), l = S(() => i.value.reduce((h, f) => h + (f.conversations || 0), 0)), d = S(() => {
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
    }), u = S(() => a.options ? a.options : {
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
              const f = (h.label || "").toString(), v = Number(h.parsed) || 0, g = (h.dataset.data || []).reduce((m, p) => m + (Number(p) || 0), 0), _ = g ? v / g * 100 : 0;
              return `${f}: ${v.toLocaleString()} (${_.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: s }), (h, f) => (y(), x("article", k5, [
      f[3] || (f[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Top Agents"),
          c("p", { class: "card-subtitle" }, "Interactions by agent (excluding triage)")
        ])
      ], -1)),
      e.loading ? (y(), x("div", A5, [...f[2] || (f[2] = [
        et('<div class="loading-container" data-v-05e3e74d><div class="chart-lines-loader" data-v-05e3e74d><div class="line line-1" data-v-05e3e74d></div><div class="line line-2" data-v-05e3e74d></div><div class="line line-3" data-v-05e3e74d></div><div class="line line-4" data-v-05e3e74d></div><div class="line line-5" data-v-05e3e74d></div></div><p class="loading-text" data-v-05e3e74d>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", w5, [
        r.value ? (y(), x("section", $5, [
          c("div", M5, [
            Z(Ga, {
              data: d.value,
              options: u.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", C5, [
          c("div", S5, [
            c("div", D5, [
              Z(T(Rt), { class: "empty-icon" })
            ]),
            f[0] || (f[0] = c("p", { class: "empty-title" }, "No top agents data", -1)),
            f[1] || (f[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), B5 = /* @__PURE__ */ at(T5, [["__scopeId", "data-v-05e3e74d"]]), L5 = { class: "daily-cost-trends-card" }, F5 = {
  key: 0,
  class: "card-body"
}, P5 = {
  key: 0,
  class: "chart-section"
}, E5 = { class: "chart-container" }, R5 = {
  key: 1,
  class: "empty-state"
}, I5 = { class: "empty-state-content" }, O5 = { class: "empty-icon-wrapper" }, z5 = {
  key: 1,
  class: "loading-state"
}, V5 = /* @__PURE__ */ Q({
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
    }, i = S(() => {
      const d = a.costData?.daily_mean_cost_per_conversation || [];
      if (Array.isArray(d) && d.length > 0)
        return !0;
      const u = a.costData?.costs_by_day || {}, h = a.conversationData?.conversations_by_day || {};
      return Object.keys(u).length > 0 && Object.keys(h).length > 0;
    }), r = S(() => {
      const d = a.costData?.daily_mean_cost_per_conversation || [];
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
      const u = a.costData?.costs_by_day || {}, h = a.conversationData?.conversations_by_day || {}, v = Object.keys(u).filter((m) => h[m]).sort();
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
    }), l = S(() => a.options ? a.options : {
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
    return t({ isDark: s }), (d, u) => (y(), x("article", L5, [
      u[3] || (u[3] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Daily Cost Trends"),
          c("p", { class: "card-subtitle" }, "Mean USD/conversation per day")
        ])
      ], -1)),
      e.loading ? (y(), x("div", z5, [...u[2] || (u[2] = [
        et('<div class="loading-container" data-v-e5bac1c5><div class="chart-lines-loader" data-v-e5bac1c5><div class="line line-1" data-v-e5bac1c5></div><div class="line line-2" data-v-e5bac1c5></div><div class="line line-3" data-v-e5bac1c5></div><div class="line line-4" data-v-e5bac1c5></div><div class="line line-5" data-v-e5bac1c5></div></div><p class="loading-text" data-v-e5bac1c5>Loading chart data...</p></div>', 1)
      ])])) : (y(), x("div", F5, [
        i.value ? (y(), x("section", P5, [
          c("div", E5, [
            Z(ve, {
              data: r.value,
              options: l.value
            }, null, 8, ["data", "options"])
          ])
        ])) : (y(), x("section", R5, [
          c("div", I5, [
            c("div", O5, [
              Z(T(Rt), { class: "empty-icon" })
            ]),
            u[0] || (u[0] = c("p", { class: "empty-title" }, "No daily cost trends data", -1)),
            u[1] || (u[1] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), N5 = /* @__PURE__ */ at(V5, [["__scopeId", "data-v-e5bac1c5"]]), W5 = { class: "model-usage-card" }, H5 = {
  key: 0,
  class: "loading-state"
}, j5 = {
  key: 1,
  class: "card-body"
}, Y5 = { class: "tabs-container" }, q5 = {
  class: "tabs-nav",
  "aria-label": "Model Usage Tabs"
}, U5 = ["aria-selected"], K5 = ["aria-selected"], X5 = {
  key: 0,
  class: "table-section"
}, G5 = { class: "table-wrapper" }, Z5 = { class: "data-table" }, Q5 = { class: "table-header-row" }, J5 = { class: "table-header" }, tw = { class: "table-body" }, ew = { class: "table-cell name-cell" }, aw = { class: "table-cell text-center" }, sw = { class: "table-cell text-center" }, nw = { class: "table-cell text-center" }, ow = { class: "table-cell text-center cost-cell" }, iw = { class: "table-cell text-center" }, rw = {
  key: 1,
  class: "empty-state"
}, lw = { class: "empty-state-content" }, cw = { class: "empty-icon-wrapper" }, dw = /* @__PURE__ */ Q({
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
    }, { isDark: i } = lt(rt(s, "theme")), r = nt("by_model"), l = S(() => r.value === "by_model" ? s.data?.total_by_model || {} : s.data?.total_by_provider || {}), d = (h) => h == null ? "0" : Y(h), u = (h) => h == null ? "$0.00" : ft(h);
    return t({ isDark: i }), (h, f) => (y(), x("article", W5, [
      f[10] || (f[10] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Model Usage"),
          c("p", { class: "card-subtitle" }, "AI model performance and costs")
        ])
      ], -1)),
      e.loading ? (y(), x("div", H5, [...f[2] || (f[2] = [
        et('<div class="loading-container" data-v-a7bf2d7b><div class="chart-bars-loader" data-v-a7bf2d7b><div class="bar bar-1" data-v-a7bf2d7b></div><div class="bar bar-2" data-v-a7bf2d7b></div><div class="bar bar-3" data-v-a7bf2d7b></div><div class="bar bar-4" data-v-a7bf2d7b></div><div class="bar bar-5" data-v-a7bf2d7b></div></div><p class="loading-text" data-v-a7bf2d7b>Loading model usage data...</p></div>', 1)
      ])])) : (y(), x("div", j5, [
        c("div", Y5, [
          c("nav", q5, [
            c("button", {
              onClick: f[0] || (f[0] = (v) => r.value = "by_model"),
              class: G(["tab-button", { "tab-active": r.value === "by_model" }]),
              "aria-selected": r.value === "by_model",
              role: "tab"
            }, " Model ", 10, U5),
            c("button", {
              onClick: f[1] || (f[1] = (v) => r.value = "by_provider"),
              class: G(["tab-button", { "tab-active": r.value === "by_provider" }]),
              "aria-selected": r.value === "by_provider",
              role: "tab"
            }, " Provider ", 10, K5)
          ])
        ]),
        l.value && Object.keys(l.value).length > 0 ? (y(), x("div", X5, [
          c("div", G5, [
            c("table", Z5, [
              c("thead", null, [
                c("tr", Q5, [
                  c("th", J5, M(r.value === "by_model" ? "Model" : "Provider"), 1),
                  f[3] || (f[3] = c("th", { class: "table-header" }, "Avg cost per message", -1)),
                  f[4] || (f[4] = c("th", { class: "table-header" }, "Avg tokens per message", -1)),
                  f[5] || (f[5] = c("th", { class: "table-header" }, "Message count", -1)),
                  f[6] || (f[6] = c("th", { class: "table-header" }, "Total cost", -1)),
                  f[7] || (f[7] = c("th", { class: "table-header" }, "Total tokens", -1))
                ])
              ]),
              c("tbody", tw, [
                (y(!0), x(U, null, tt(l.value, (v, g) => (y(), x("tr", {
                  key: g,
                  class: "table-row"
                }, [
                  c("td", ew, M(g), 1),
                  c("td", aw, M(u(v.avg_cost_per_message)), 1),
                  c("td", sw, M(d(v.avg_tokens_per_message)), 1),
                  c("td", nw, M(d(v.message_count)), 1),
                  c("td", ow, M(u(v.total_cost)), 1),
                  c("td", iw, M(d(v.total_tokens)), 1)
                ]))), 128))
              ])
            ])
          ]),
          e.enableExport ? (y(), ht(T(_t), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("div", rw, [
          c("div", lw, [
            c("div", cw, [
              Z(T(Rt), { class: "empty-icon" })
            ]),
            f[8] || (f[8] = c("p", { class: "empty-title" }, "No model usage data available", -1)),
            f[9] || (f[9] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see model performance metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), uw = /* @__PURE__ */ at(dw, [["__scopeId", "data-v-a7bf2d7b"]]), hw = { class: "message-roles-card" }, fw = {
  key: 0,
  class: "loading-state"
}, gw = {
  key: 1,
  class: "card-body"
}, pw = {
  key: 0,
  class: "table-section"
}, vw = { class: "table-wrapper" }, bw = { class: "data-table" }, mw = { class: "table-body" }, yw = { class: "table-cell name-cell" }, _w = { class: "table-cell text-center" }, xw = { class: "table-cell text-center" }, kw = { class: "table-cell text-center" }, ww = { class: "table-cell text-center cost-cell" }, $w = { class: "table-cell text-center" }, Mw = {
  key: 1,
  class: "empty-state"
}, Cw = { class: "empty-state-content" }, Sw = { class: "empty-icon-wrapper" }, Dw = /* @__PURE__ */ Q({
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
    }, { isDark: i } = lt(rt(s, "theme")), r = ["assistant", "system", "user"], l = S(() => s.data?.total_by_role || {}), d = S(() => Object.keys(l.value).length > 0), u = (v) => v == null ? "0" : Y(v), h = (v) => v == null ? "$0.00" : ft(v), f = (v) => v.charAt(0).toUpperCase() + v.slice(1);
    return t({ isDark: i }), (v, g) => (y(), x("article", hw, [
      g[4] || (g[4] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Message Roles"),
          c("p", { class: "card-subtitle" }, "Performance by message role")
        ])
      ], -1)),
      e.loading ? (y(), x("div", fw, [...g[0] || (g[0] = [
        et('<div class="loading-container" data-v-6a953cfc><div class="chart-bars-loader" data-v-6a953cfc><div class="bar bar-1" data-v-6a953cfc></div><div class="bar bar-2" data-v-6a953cfc></div><div class="bar bar-3" data-v-6a953cfc></div><div class="bar bar-4" data-v-6a953cfc></div><div class="bar bar-5" data-v-6a953cfc></div></div><p class="loading-text" data-v-6a953cfc>Loading message role data...</p></div>', 1)
      ])])) : (y(), x("div", gw, [
        d.value ? (y(), x("div", pw, [
          c("div", vw, [
            c("table", bw, [
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
              c("tbody", mw, [
                (y(), x(U, null, tt(r, (_) => c("tr", {
                  key: _,
                  class: "table-row"
                }, [
                  c("td", yw, M(f(_)), 1),
                  c("td", _w, M(h(l.value[_]?.avg_cost_per_message)), 1),
                  c("td", xw, M(u(l.value[_]?.avg_tokens_per_message)), 1),
                  c("td", kw, M(u(l.value[_]?.message_count)), 1),
                  c("td", ww, M(h(l.value[_]?.total_cost)), 1),
                  c("td", $w, M(u(l.value[_]?.total_tokens)), 1)
                ])), 64))
              ])
            ])
          ]),
          e.enableExport ? (y(), ht(T(_t), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("div", Mw, [
          c("div", Cw, [
            c("div", Sw, [
              Z(T(Rt), { class: "empty-icon" })
            ]),
            g[2] || (g[2] = c("p", { class: "empty-title" }, "No message role data available", -1)),
            g[3] || (g[3] = c("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Aw = /* @__PURE__ */ at(Dw, [["__scopeId", "data-v-6a953cfc"]]), Tw = { class: "cost-per-conversation-card" }, Bw = {
  key: 0,
  class: "card-body"
}, Lw = {
  key: 0,
  class: "chart-section"
}, Fw = { class: "chart-container" }, Pw = { class: "kpi-grid" }, Ew = { class: "kpi-card" }, Rw = { class: "kpi-value" }, Iw = { class: "kpi-card" }, Ow = { class: "kpi-value" }, zw = { class: "kpi-card" }, Vw = { class: "kpi-value" }, Nw = { class: "kpi-card highlighted" }, Ww = { class: "kpi-value gradient-text" }, Hw = {
  key: 1,
  class: "empty-state"
}, jw = { class: "empty-state-content" }, Yw = { class: "empty-icon-wrapper" }, qw = {
  key: 1,
  class: "loading-state"
}, Uw = /* @__PURE__ */ Q({
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
    const s = e, n = a, o = (b) => {
      n("export", b);
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
    }, d = (b) => b.agent_type || b.agent_id || b.agent_name || "", u = (b) => b.agent_name ? b.agent_name : d(b).split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ").replace(/V\d+$/, "").trim(), h = (b) => {
      const $ = d(b).toLowerCase();
      for (const [w, k] of Object.entries(l))
        if ($.includes(w))
          return k;
      return "#9ca3af";
    }, f = S(() => [...s.data?.top_agents || []].sort(($, w) => w.avg_cost_per_conversation - $.avg_cost_per_conversation)), v = S(() => s.data?.total_conversations !== void 0 ? Number(s.data.total_conversations) || 0 : f.value.reduce((b, $) => b + $.conversations, 0)), g = S(() => s.data?.total_cost !== void 0 ? Number(s.data.total_cost) || 0 : f.value.reduce((b, $) => b + $.total_cost, 0)), _ = S(() => s.data?.overall_avg_cost_per_conversation !== void 0 ? Number(s.data.overall_avg_cost_per_conversation) || 0 : v.value === 0 ? 0 : g.value / v.value), m = S(() => {
      const b = f.value;
      if (b.length === 0)
        return { labels: [], datasets: [] };
      const $ = b.map((C) => u(C)), w = b.map((C) => C.avg_cost_per_conversation), k = b.map((C) => h(C));
      return {
        labels: $,
        datasets: [
          {
            label: "USD per conversation",
            data: w,
            backgroundColor: k.map((C) => `${C}80`),
            borderColor: k,
            borderWidth: 1
          }
        ]
      };
    }), p = S(() => s.options ? s.options : {
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
                `Cost: ${ft(b.parsed.x)}`,
                `Conversations: ${Y($.conversations)}`,
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
            callback: function(b) {
              return ft(b);
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
    return t({ isDark: i }), (b, $) => (y(), x("article", Tw, [
      $[7] || ($[7] = c("header", { class: "card-header" }, [
        c("div", { class: "header-content" }, [
          c("h3", { class: "card-title" }, "Cost Per Conversation"),
          c("p", { class: "card-subtitle" }, "USD per conversation by agent")
        ])
      ], -1)),
      e.loading ? (y(), x("div", qw, [...$[6] || ($[6] = [
        et('<div class="loading-container" data-v-17f6615c><div class="chart-bars-loader" data-v-17f6615c><div class="bar bar-1" data-v-17f6615c></div><div class="bar bar-2" data-v-17f6615c></div><div class="bar bar-3" data-v-17f6615c></div><div class="bar bar-4" data-v-17f6615c></div><div class="bar bar-5" data-v-17f6615c></div></div><p class="loading-text" data-v-17f6615c>Loading agent costs...</p></div>', 1)
      ])])) : (y(), x("div", Bw, [
        m.value.labels && m.value.labels.length ? (y(), x("section", Lw, [
          c("div", Fw, [
            Z(ne, {
              data: m.value,
              options: p.value
            }, null, 8, ["data", "options"])
          ]),
          c("footer", Pw, [
            c("div", Ew, [
              $[0] || ($[0] = c("span", { class: "kpi-label" }, "Total Agents", -1)),
              c("span", Rw, M(f.value.length), 1)
            ]),
            c("div", Iw, [
              $[1] || ($[1] = c("span", { class: "kpi-label" }, "Total Conversations", -1)),
              c("span", Ow, M(T(Y)(v.value)), 1)
            ]),
            c("div", zw, [
              $[2] || ($[2] = c("span", { class: "kpi-label" }, "Total Cost", -1)),
              c("span", Vw, M(T(ft)(g.value)), 1)
            ]),
            c("div", Nw, [
              $[3] || ($[3] = c("span", { class: "kpi-label" }, "Avg Cost / Conv.", -1)),
              c("span", Ww, M(T(ft)(_.value)), 1)
            ])
          ]),
          e.enableExport ? (y(), ht(T(_t), {
            key: 0,
            onExport: o,
            loading: e.exportLoading
          }, null, 8, ["loading"])) : E("", !0)
        ])) : (y(), x("section", Hw, [
          c("div", jw, [
            c("div", Yw, [
              Z(T(Rt), { class: "empty-icon" })
            ]),
            $[4] || ($[4] = c("p", { class: "empty-title" }, "No cost per conversation data", -1)),
            $[5] || ($[5] = c("p", { class: "empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
          ])
        ]))
      ]))
    ]));
  }
}), Kw = /* @__PURE__ */ at(Uw, [["__scopeId", "data-v-17f6615c"]]);
function Wt() {
  const e = new Uint8Array(8);
  return globalThis.crypto.getRandomValues(e), Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("");
}
const Xw = { class: "tabs text-sm" }, Gw = ["aria-label"], Zw = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], Qw = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, Jw = /* @__PURE__ */ Q({
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
    const a = e, s = t, n = nt([]), o = `tabs-${Wt()}`, i = (g) => `${o}-tab-${g}`, r = S(
      () => a.items.map((g, _) => g.disabled ? -1 : _).filter((g) => g >= 0)
    );
    function l(g) {
      return g.value === a.modelValue;
    }
    function d(g) {
      const _ = l(g), p = `${a.fullWidth ? "relative flex min-w-0 flex-1" : "relative inline-flex max-w-full shrink-0"} cursor-pointer rounded-lg border border-transparent text-center outline-none transition-[background-color,color,box-shadow,opacity,transform] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100`;
      return g.disabled ? `${p} cursor-not-allowed opacity-40` : _ ? `${p} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]` : `${p} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function u(g, _) {
      g === _ || a.items.find((p) => p.value === g)?.disabled || (s("update:modelValue", g), s("change", { value: g, previousValue: _ }));
    }
    function h(g, _) {
      s("tab-click", { value: g.value, originalEvent: _ }), !g.disabled && (u(g.value, a.modelValue), St(() => {
        n.value[a.items.indexOf(g)]?.focus();
      }));
    }
    function f(g, _) {
      const m = a.items.length;
      if (m === 0) return 0;
      let p = g;
      for (let b = 0; b < m; b++)
        if (p = (p + _ + m) % m, !a.items[p]?.disabled) return p;
      return g;
    }
    async function v(g, _) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(g.key)) return;
      g.preventDefault();
      let p = _;
      g.key === "ArrowLeft" ? p = f(_, -1) : g.key === "ArrowRight" ? p = f(_, 1) : g.key === "Home" ? p = r.value[0] ?? 0 : g.key === "End" && (p = r.value[r.value.length - 1] ?? _);
      const b = a.items[p];
      !b || b.disabled || (u(b.value, a.modelValue), await St(), n.value[p]?.focus());
    }
    return (g, _) => (y(), x("div", Xw, [
      c("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: G([
          "flex-wrap gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 p-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          e.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (y(!0), x(U, null, tt(e.items, (m, p) => (y(), x("button", {
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
            class: G(["flex h-10 min-w-0 items-center justify-center gap-2 px-3", { "min-w-0 flex-1": e.fullWidth }])
          }, [
            m.icon ? (y(), ht(Ls(m.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : E("", !0),
            c("span", Qw, M(m.label), 1)
          ], 2)
        ], 42, Zw))), 128))
      ], 10, Gw),
      g.$slots.default ? (y(), ht(Eo, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: Ge(() => [
          (y(), x("div", {
            key: e.modelValue,
            class: "tabs-panel mt-4"
          }, [
            Vt(g.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : E("", !0)
    ]));
  }
}), t$ = /* @__PURE__ */ at(Jw, [["__scopeId", "data-v-b2563af3"]]), e$ = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, a$ = { class: "overflow-x-auto" }, s$ = { class: "kiut-table w-full min-w-[640px] border-collapse text-left text-sm" }, n$ = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, o$ = {
  key: 0,
  scope: "col",
  class: "w-12 px-4 py-3 text-center align-middle"
}, i$ = ["checked", "aria-label"], r$ = {
  key: 0,
  class: "w-12 px-4 py-3 text-center align-middle"
}, l$ = ["checked", "aria-label", "onChange"], c$ = /* @__PURE__ */ Q({
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
    const a = e, s = t, n = nt(null);
    function o(b) {
      return `cell-${b}`;
    }
    function i(b) {
      return b === "center" ? "text-center" : b === "right" ? "text-right" : "text-left";
    }
    function r(b, $) {
      if (typeof a.rowKey == "function")
        return a.rowKey(b);
      const w = b[a.rowKey];
      return w != null ? String(w) : `__index_${$}`;
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
    const h = S(() => a.rows.map((b, $) => r(b, $)));
    function f(b, $) {
      const w = r(b, $);
      return a.selectedKeys.includes(w);
    }
    const v = S(() => !a.selectable || a.rows.length === 0 ? !1 : h.value.every((b) => a.selectedKeys.includes(b))), g = S(() => {
      if (!a.selectable || a.rows.length === 0) return !1;
      const b = h.value.filter(($) => a.selectedKeys.includes($));
      return b.length > 0 && b.length < a.rows.length;
    });
    Nt(
      [g, v, () => a.selectable],
      async () => {
        await St();
        const b = n.value;
        b && (b.indeterminate = g.value && !v.value);
      },
      { immediate: !0 }
    );
    function _() {
      if (a.selectable)
        if (v.value) {
          const b = a.selectedKeys.filter(($) => !h.value.includes($));
          s("update:selectedKeys", b);
        } else {
          const b = new Set(a.selectedKeys);
          h.value.forEach(($) => b.add($)), s("update:selectedKeys", [...b]);
        }
    }
    function m(b, $) {
      if (!a.selectable) return;
      const w = r(b, $);
      a.selectedKeys.includes(w) ? s(
        "update:selectedKeys",
        a.selectedKeys.filter((C) => C !== w)
      ) : s("update:selectedKeys", [...a.selectedKeys, w]);
    }
    function p(b, $) {
      const w = r(b, $);
      return `${a.ariaLabelSelectRow} ${w}`;
    }
    return (b, $) => (y(), x("div", e$, [
      c("div", a$, [
        c("table", s$, [
          c("thead", null, [
            c("tr", n$, [
              e.selectable ? (y(), x("th", o$, [
                c("input", {
                  ref_key: "selectAllRef",
                  ref: n,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: v.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: _
                }, null, 40, i$)
              ])) : E("", !0),
              (y(!0), x(U, null, tt(e.columns, (w) => (y(), x("th", {
                key: w.key,
                scope: "col",
                class: G([
                  "px-4 py-3 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]",
                  w.headerClass ?? "",
                  "!text-left"
                ])
              }, M(w.label), 3))), 128))
            ])
          ]),
          c("tbody", null, [
            (y(!0), x(U, null, tt(e.rows, (w, k) => (y(), x("tr", {
              key: u(w, k),
              class: "h-14 border-b border-[#e5e7eb] bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)]"
            }, [
              e.selectable ? (y(), x("td", r$, [
                c("input", {
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: f(w, k),
                  "aria-label": p(w, k),
                  onChange: (C) => m(w, k)
                }, null, 40, l$)
              ])) : E("", !0),
              (y(!0), x(U, null, tt(e.columns, (C) => (y(), x("td", {
                key: C.key,
                class: G([
                  "px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]",
                  i(C.align),
                  C.cellClass ?? ""
                ])
              }, [
                Vt(b.$slots, o(C.key), {
                  row: w,
                  column: C,
                  value: l(w, C.key)
                }, () => [
                  kt(M(d(l(w, C.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}), d$ = /* @__PURE__ */ at(c$, [["__scopeId", "data-v-6fb5803c"]]);
function u$(e, t) {
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
function h$(e, t) {
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
const f$ = ["aria-label"], g$ = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, p$ = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, v$ = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, b$ = ["aria-label", "aria-expanded", "aria-controls", "onClick"], m$ = { class: "truncate" }, y$ = {
  key: 0,
  class: "ml-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--kiut-primary)]/20 px-1 text-[10px] font-semibold tabular-nums text-[color:var(--kiut-primary-default)] dark:bg-[color:var(--kiut-primary)]/25 dark:text-[color:var(--kiut-primary-light)]"
}, _$ = {
  key: 0,
  class: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5"
}, x$ = { class: "flex min-w-0 flex-wrap items-center gap-1.5" }, k$ = ["aria-label", "onClick"], w$ = ["aria-label", "onClick"], $$ = ["aria-label"], M$ = ["aria-label"], C$ = {
  key: 1,
  class: "space-y-2"
}, S$ = ["for"], D$ = ["id", "placeholder", "onKeydown"], A$ = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, T$ = ["aria-label"], B$ = { class: "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-[color:var(--kiut-text-primary)] transition hover:bg-black/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.06]" }, L$ = ["checked", "onChange"], F$ = { class: "min-w-0 flex-1" }, P$ = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, E$ = { class: "flex flex-wrap items-end gap-2" }, R$ = { class: "min-w-[120px] flex-1" }, I$ = ["for"], O$ = ["id"], z$ = { class: "min-w-[120px] flex-1" }, V$ = ["for"], N$ = ["id"], W$ = /* @__PURE__ */ Q({
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
    const a = e, s = t, n = Ro(), i = `${`kiut-filters-${Wt()}`}-panel`, r = nt(null), l = /* @__PURE__ */ new Map(), d = nt(null), u = nt(!1), h = nt({}), f = nt(null), v = nt(""), g = nt([]), _ = nt(""), m = nt(""), p = S(() => d.value ? a.filterDefinitions.find((B) => B.id === d.value) ?? null : null), b = S(() => {
      const B = p.value;
      if (B)
        return B.type === "text" ? v.value : B.type === "select" ? g.value : { start: _.value, end: m.value };
    });
    function $(B, z) {
      z && z instanceof HTMLElement ? l.set(B, z) : l.delete(B);
    }
    function w(B) {
      return a.modelValue[B];
    }
    function k(B) {
      if (B == null) return [];
      if (Array.isArray(B))
        return B.filter((z) => typeof z == "string" && z.trim() !== "");
      if (typeof B == "string") {
        const z = B.trim();
        return z ? [z] : [];
      }
      return [];
    }
    function C(B, z) {
      if (z == null) return !0;
      if (B.type === "text") return String(z).trim() === "";
      if (B.type === "select") return k(z).length === 0;
      if (B.type === "dateRange") {
        const K = z;
        return !K?.start?.trim() || !K?.end?.trim();
      }
      return !0;
    }
    const D = S(
      () => a.filterDefinitions.some((B) => !C(B, w(B.id)))
    ), A = S(() => {
      const B = [];
      for (const z of a.filterDefinitions) {
        const K = w(z.id);
        if (!C(z, K)) {
          if (z.type === "text")
            B.push({ kind: "text", def: z, key: z.id });
          else if (z.type === "dateRange")
            B.push({ kind: "dateRange", def: z, key: z.id });
          else if (z.type === "select")
            for (const dt of k(K))
              B.push({
                kind: "select",
                def: z,
                optionValue: dt,
                key: `${z.id}::${dt}`
              });
        }
      }
      return B;
    });
    function P(B) {
      return B.type !== "select" ? 0 : k(w(B.id)).length;
    }
    function R(B) {
      const z = w(B.id), K = B.label.replace(/^\+\s*/, "");
      if (B.type === "text") return `${K}: ${String(z ?? "").trim()}`;
      if (B.type === "select") {
        const Wi = k(z).map((Qs) => B.options.find((Hi) => Hi.value === Qs)?.label ?? Qs);
        return `${K}: ${Wi.join(", ")}`;
      }
      const dt = z, Ot = V(dt.start), re = V(dt.end);
      return `${K}: ${Ot} – ${re}`;
    }
    function I(B) {
      return B.kind === "text" || B.kind === "dateRange" ? R(B.def) : B.def.options.find((K) => K.value === B.optionValue)?.label ?? B.optionValue;
    }
    function V(B) {
      if (!B) return "";
      const z = At(B, "YYYY-MM-DD", !0);
      return z.isValid() ? z.format("L") : B;
    }
    function q(B) {
      const z = d.value === B.id && u.value, K = !C(B, w(B.id));
      return z || K ? "border border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border border-dashed border-slate-400/90 text-[color:var(--kiut-text-secondary)] hover:border-[color:var(--kiut-primary)]/50 hover:bg-slate-50 dark:border-slate-500 dark:text-slate-400 dark:hover:border-[color:var(--kiut-primary-light)]/40 dark:hover:bg-white/[0.04]";
    }
    function L(B) {
      return C(B, w(B.id)) ? ie(B) : `Editar filtro ${B.label.replace(/^\+\s*/, "")}`;
    }
    function F(B) {
      const z = w(B.id);
      if (B.type === "text") {
        v.value = z != null ? String(z) : "";
        return;
      }
      if (B.type === "select") {
        g.value = [...k(z)];
        return;
      }
      const K = z;
      _.value = K?.start?.trim() ?? "", m.value = K?.end?.trim() ?? "";
    }
    function O() {
      const B = p.value;
      if (!B || B.type !== "select") return;
      const z = { ...a.modelValue };
      g.value.length === 0 ? delete z[B.id] : z[B.id] = [...g.value], s("update:modelValue", z), s("change", z);
    }
    function W(B) {
      const z = g.value.indexOf(B);
      z >= 0 ? g.value = g.value.filter((K, dt) => dt !== z) : g.value = [...g.value, B], O();
    }
    function N(B) {
      if (!B) return;
      f.value = B;
      const z = B.getBoundingClientRect(), K = 300;
      let dt = z.left;
      const Ot = window.innerWidth - K - 12;
      dt > Ot && (dt = Math.max(12, Ot)), dt < 12 && (dt = 12);
      const re = z.bottom + 8;
      h.value = {
        top: `${re}px`,
        left: `${dt}px`,
        width: `${Math.min(K, window.innerWidth - 24)}px`
      };
    }
    function H(B, z) {
      if (d.value === B.id && u.value) {
        ct();
        return;
      }
      u.value && d.value !== B.id && ct(), d.value = B.id, u.value = !0, F(B), St().then(async () => {
        N(z.currentTarget), await St(), st();
      });
    }
    function j(B, z) {
      if (d.value === B.id && u.value) {
        ct();
        return;
      }
      u.value && d.value !== B.id && ct(), d.value = B.id, u.value = !0, F(B), St().then(async () => {
        const K = l.get(B.id) ?? z.currentTarget;
        N(K), await St(), st();
      });
    }
    function st() {
      const B = r.value;
      if (!B) return;
      B.querySelector(
        'input[type="text"], input[type="date"], input[type="checkbox"], select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function J() {
      u.value = !1, d.value = null, f.value = null;
    }
    function X(B) {
      const z = p.value;
      if (!z) return;
      if (z.type === "text") {
        v.value = B != null ? String(B) : "";
        return;
      }
      if (z.type === "select") {
        g.value = Array.isArray(B) ? B.filter((dt) => typeof dt == "string") : k(B);
        return;
      }
      const K = B;
      _.value = K?.start?.trim() ?? "", m.value = K?.end?.trim() ?? "";
    }
    function ct() {
      const B = p.value;
      if (!B) return;
      if (B.type === "text") {
        const Ot = v.value.trim(), re = { ...a.modelValue };
        Ot === "" ? delete re[B.id] : re[B.id] = Ot, s("update:modelValue", re), s("change", re), J();
        return;
      }
      if (B.type === "select") {
        O(), J();
        return;
      }
      const z = _.value.trim(), K = m.value.trim(), dt = { ...a.modelValue };
      !z || !K || z > K ? delete dt[B.id] : dt[B.id] = { start: z, end: K }, s("update:modelValue", dt), s("change", dt), J();
    }
    function wt(B) {
      const z = { ...a.modelValue };
      delete z[B], s("update:modelValue", z), s("change", z), d.value === B && J();
    }
    function gt(B) {
      if (B.kind === "text" || B.kind === "dateRange") {
        wt(B.def.id);
        return;
      }
      const z = { ...a.modelValue }, dt = k(z[B.def.id]).filter((Ot) => Ot !== B.optionValue);
      dt.length === 0 ? delete z[B.def.id] : z[B.def.id] = dt, s("update:modelValue", z), s("change", z), d.value === B.def.id && F(B.def);
    }
    function Ft() {
      const B = {};
      s("update:modelValue", B), s("change", B), J();
    }
    const It = S(() => {
      const B = p.value;
      return B ? `Editar filtro: ${B.label}` : "Filtro";
    });
    function qt(B) {
      const z = B.def.label.replace(/^\+\s*/, "");
      return B.kind === "select" ? `Quitar ${B.def.options.find((Ot) => Ot.value === B.optionValue)?.label ?? B.optionValue} del filtro ${z}` : `Quitar filtro ${z}`;
    }
    function it(B) {
      const z = B.def.label.replace(/^\+\s*/, "");
      if (B.kind === "select") {
        const dt = B.def.options.find((Ot) => Ot.value === B.optionValue)?.label ?? B.optionValue;
        return `Editar filtro ${z}: ${dt}`;
      }
      return `Editar filtro ${z}`;
    }
    function ie(B) {
      return `Añadir filtro ${B.label.replace(/^\+\s*/, "")}`;
    }
    const Zs = S(() => a.clearLabel);
    function Ne(B) {
      if (!u.value || !r.value) return;
      const z = B.target;
      if (!(r.value.contains(z) || (z instanceof Element ? z : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const dt of l.values())
          if (dt?.contains(z)) return;
        ct();
      }
    }
    function va(B) {
      B.key === "Escape" && u.value && (B.preventDefault(), J());
    }
    function We() {
      !u.value || !f.value || N(f.value);
    }
    return pe(() => {
      document.addEventListener("mousedown", Ne, !0), window.addEventListener("keydown", va, !0), window.addEventListener("resize", We);
    }), Po(() => {
      document.removeEventListener("mousedown", Ne, !0), window.removeEventListener("keydown", va, !0), window.removeEventListener("resize", We);
    }), Nt(
      () => a.modelValue,
      () => {
        const B = p.value;
        B && u.value && !n.panel && F(B);
      },
      { deep: !0 }
    ), (B, z) => (y(), x("div", {
      class: "kiut-filters font-[Inter] text-sm",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      c("div", g$, [
        c("span", p$, M(e.label), 1),
        c("div", v$, [
          (y(!0), x(U, null, tt(e.filterDefinitions, (K) => (y(), x("button", {
            key: `pill-${K.id}`,
            ref_for: !0,
            ref: (dt) => $(K.id, dt),
            type: "button",
            class: G(["inline-flex h-[26px] max-w-full shrink-0 items-center gap-0.5 rounded-full px-2 font-medium transition-colors", q(K)]),
            "aria-label": L(K),
            "aria-expanded": d.value === K.id,
            "aria-haspopup": !0,
            "aria-controls": d.value === K.id ? i : void 0,
            onClick: (dt) => j(K, dt)
          }, [
            Z(T(u$), {
              class: "h-3.5 w-3.5 shrink-0",
              "aria-hidden": "true"
            }),
            c("span", m$, M(K.label), 1),
            K.type === "select" && P(K) > 0 ? (y(), x("span", y$, M(P(K)), 1)) : E("", !0)
          ], 10, b$))), 128))
        ])
      ]),
      D.value ? (y(), x("div", _$, [
        c("div", x$, [
          (y(!0), x(U, null, tt(A.value, (K) => (y(), x("div", {
            key: K.key,
            "data-kiut-filter-chip": "",
            class: "inline-flex h-[26px] max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            c("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": it(K),
              onClick: (dt) => H(K.def, dt)
            }, [
              Vt(B.$slots, "formatChip", {
                filter: K.def,
                value: w(K.def.id),
                optionValue: K.kind === "select" ? K.optionValue : void 0
              }, () => [
                kt(M(I(K)), 1)
              ], !0)
            ], 8, k$),
            c("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": qt(K),
              onClick: (dt) => gt(K)
            }, [
              Z(T(h$), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, w$)
          ]))), 128))
        ]),
        c("button", {
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": Zs.value,
          onClick: Ft
        }, M(e.clearLabel), 9, $$)
      ])) : E("", !0),
      (y(), ht(Io, { to: "body" }, [
        d.value && u.value ? (y(), x("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: r,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": It.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:bg-[#252528]",
          style: xt(h.value),
          onKeydown: z[3] || (z[3] = fe(() => {
          }, ["stop"]))
        }, [
          p.value ? (y(), x(U, { key: 0 }, [
            B.$slots.panel ? Vt(B.$slots, "panel", {
              key: 0,
              filter: p.value,
              close: ct,
              value: b.value,
              updateValue: X
            }, void 0, !0) : (y(), x("div", C$, [
              p.value.type === "text" ? (y(), x(U, { key: 0 }, [
                c("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, M(p.value.label), 9, S$),
                se(c("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": z[0] || (z[0] = (K) => v.value = K),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-sm text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: p.value.placeholder ?? "…",
                  onKeydown: Pa(fe(ct, ["prevent"]), ["enter"])
                }, null, 40, D$), [
                  [ta, v.value]
                ])
              ], 64)) : p.value.type === "select" ? (y(), x(U, { key: 1 }, [
                c("p", A$, M(p.value.label), 1),
                c("ul", {
                  class: "max-h-[min(280px,50vh)] space-y-0.5 overflow-y-auto",
                  role: "listbox",
                  "aria-label": p.value.label,
                  "aria-multiselectable": !0
                }, [
                  (y(!0), x(U, null, tt(p.value.options, (K) => (y(), x("li", {
                    key: K.value
                  }, [
                    c("label", B$, [
                      c("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox shrink-0",
                        checked: g.value.includes(K.value),
                        onChange: (dt) => W(K.value)
                      }, null, 40, L$),
                      c("span", F$, M(K.label), 1)
                    ])
                  ]))), 128))
                ], 8, T$)
              ], 64)) : p.value.type === "dateRange" ? (y(), x(U, { key: 2 }, [
                c("p", P$, M(p.value.label), 1),
                c("div", E$, [
                  c("div", R$, [
                    c("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, I$),
                    se(c("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": z[1] || (z[1] = (K) => _.value = K),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-sm text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, O$), [
                      [ta, _.value]
                    ])
                  ]),
                  c("div", z$, [
                    c("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, V$),
                    se(c("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": z[2] || (z[2] = (K) => m.value = K),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-sm text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, N$), [
                      [ta, m.value]
                    ])
                  ])
                ])
              ], 64)) : E("", !0)
            ]))
          ], 64)) : E("", !0)
        ], 44, M$)) : E("", !0)
      ]))
    ], 8, f$));
  }
}), H$ = /* @__PURE__ */ at(W$, [["__scopeId", "data-v-4644a0d7"]]), me = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", Te = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", pa = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", Ve = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", j$ = { class: "font-sans" }, Y$ = ["for"], q$ = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], U$ = ["id"], K$ = /* @__PURE__ */ Q({
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
    const a = e, s = t, n = `kiut-input-text-${Wt()}`, o = S(() => a.id ?? n), i = S(() => `${o.value}-err`), r = S({
      get: () => a.modelValue,
      set: (l) => s("update:modelValue", l)
    });
    return (l, d) => (y(), x("div", j$, [
      e.label ? (y(), x("label", {
        key: 0,
        for: o.value,
        class: G(T(me))
      }, M(e.label), 11, Y$)) : E("", !0),
      se(c("input", {
        id: o.value,
        "onUpdate:modelValue": d[0] || (d[0] = (u) => r.value = u),
        type: "text",
        autocomplete: "off",
        class: G([T(Te), e.invalid ? T(pa) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, q$), [
        [ta, r.value]
      ]),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: i.value,
        class: G(T(Ve)),
        role: "alert"
      }, M(e.errorText), 11, U$)) : E("", !0)
    ]));
  }
}), X$ = { class: "font-sans" }, G$ = ["for"], Z$ = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], Q$ = ["for"], J$ = ["title"], t4 = ["aria-label"], e4 = ["id"], a4 = /* @__PURE__ */ Q({
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
    const a = e, s = t, n = `kiut-input-file-${Wt()}`, o = S(() => a.id ?? n), i = S(() => `${o.value}-err`), r = nt(null), l = S(() => a.modelValue?.name ?? a.placeholder);
    function d(h) {
      const v = h.target.files?.[0] ?? null;
      s("update:modelValue", v);
    }
    function u() {
      s("update:modelValue", null), r.value && (r.value.value = "");
    }
    return (h, f) => (y(), x("div", X$, [
      e.label ? (y(), x("label", {
        key: 0,
        for: o.value,
        class: G(T(me))
      }, M(e.label), 11, G$)) : E("", !0),
      c("div", {
        class: G([
          T(Te),
          "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
          e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
          e.invalid ? T(pa) : "",
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
        }, null, 40, Z$),
        c("label", {
          for: o.value,
          class: G(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled ? "cursor-not-allowed opacity-50" : ""])
        }, [
          Z(T(Ag), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          kt(" " + M(e.chooseLabel), 1)
        ], 10, Q$),
        c("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: l.value || void 0
        }, M(l.value), 9, J$),
        e.modelValue && !e.disabled ? (y(), x("button", {
          key: 0,
          type: "button",
          class: "inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
          "aria-label": e.clearAriaLabel,
          onClick: u
        }, [
          Z(T(Oi), {
            class: "h-4 w-4",
            "aria-hidden": "true"
          })
        ], 8, t4)) : E("", !0)
      ], 2),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: i.value,
        class: G(T(Ve)),
        role: "alert"
      }, M(e.errorText), 11, e4)) : E("", !0)
    ]));
  }
}), s4 = { class: "font-sans" }, n4 = ["for"], o4 = { class: "relative" }, i4 = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], r4 = ["id"], l4 = /* @__PURE__ */ Q({
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
    const a = e, s = t, n = `kiut-input-datetime-${Wt()}`, o = S(() => a.id ?? n), i = S(() => `${o.value}-err`), r = S(() => a.modelValue ?? "");
    function l(d) {
      const u = d.target.value;
      s("update:modelValue", u === "" ? null : u);
    }
    return (d, u) => (y(), x("div", s4, [
      e.label ? (y(), x("label", {
        key: 0,
        for: o.value,
        class: G(T(me))
      }, M(e.label), 11, n4)) : E("", !0),
      c("div", o4, [
        Z(T(Ii), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        c("input", {
          id: o.value,
          value: r.value,
          type: "datetime-local",
          autocomplete: "off",
          class: G([
            T(Te),
            "pl-10",
            e.invalid ? T(pa) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? i.value : void 0,
          onInput: l
        }, null, 42, i4)
      ]),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: i.value,
        class: G(T(Ve)),
        role: "alert"
      }, M(e.errorText), 11, r4)) : E("", !0)
    ]));
  }
}), c4 = { class: "font-sans" }, d4 = ["for"], u4 = {
  key: 0,
  class: "order-1 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, h4 = ["id", "value", "min", "max", "step", "disabled", "aria-orientation", "aria-invalid", "aria-describedby"], f4 = {
  key: 1,
  class: "text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, g4 = {
  key: 2,
  class: "grid w-full max-w-full grid-cols-[1fr_auto_1fr] items-start gap-x-3 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, p4 = { class: "min-w-0 text-left leading-snug" }, v4 = { class: "max-w-[min(100%,12rem)] shrink px-1 text-center leading-snug" }, b4 = { class: "min-w-0 text-right leading-snug" }, m4 = {
  key: 3,
  class: "order-3 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, y4 = {
  key: 4,
  class: "order-4 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, _4 = ["id"], x4 = /* @__PURE__ */ Q({
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
    const a = e, s = t, n = `kiut-input-range-${Wt()}`, o = S(() => a.id ?? n), i = S(() => `${o.value}-err`), r = S(() => {
      const v = [];
      return a.errorText && v.push(i.value), v.length ? v.join(" ") : void 0;
    }), l = S(
      () => !!(a.caption && !a.captionMin && !a.captionMax)
    ), d = S(() => !!(a.captionMin || a.captionMax)), u = S(() => {
      const { min: v, max: g, modelValue: _ } = a;
      if (g === v) return 0;
      const m = (_ - v) / (g - v);
      return Math.min(100, Math.max(0, m * 100));
    }), h = S(() => ({
      "--kiut-range-fill": `${u.value}%`,
      "--kiut-range-length": a.trackLength
    }));
    function f(v) {
      const g = Number(v.target.value);
      s("update:modelValue", Number.isNaN(g) ? a.min : g);
    }
    return (v, g) => (y(), x("div", c4, [
      e.label ? (y(), x("label", {
        key: 0,
        for: o.value,
        class: G(T(me))
      }, M(e.label), 11, d4)) : E("", !0),
      c("div", {
        class: G(["flex flex-col items-center gap-2", (e.orientation === "vertical", "w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (y(), x("p", u4, M(e.captionMax), 1)) : E("", !0),
        c("div", {
          class: G(["flex items-center justify-center", [
            e.orientation === "vertical" ? "order-2 h-[var(--kiut-range-length)] w-11 shrink-0" : "order-none w-full py-1"
          ]]),
          style: xt(h.value)
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
          }, null, 42, h4)
        ], 6),
        e.orientation === "horizontal" && l.value ? (y(), x("p", f4, M(e.caption), 1)) : e.orientation === "horizontal" && d.value ? (y(), x("div", g4, [
          c("span", p4, M(e.captionMin), 1),
          c("span", v4, M(e.caption), 1),
          c("span", b4, M(e.captionMax), 1)
        ])) : E("", !0),
        e.orientation === "vertical" && e.captionMin ? (y(), x("p", m4, M(e.captionMin), 1)) : E("", !0),
        e.orientation === "vertical" && e.caption ? (y(), x("p", y4, M(e.caption), 1)) : E("", !0)
      ], 2),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: i.value,
        class: G(T(Ve)),
        role: "alert"
      }, M(e.errorText), 11, _4)) : E("", !0)
    ]));
  }
}), k4 = /* @__PURE__ */ at(x4, [["__scopeId", "data-v-a1343418"]]), w4 = { class: "font-sans" }, $4 = ["for"], M4 = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], C4 = ["id"], S4 = /* @__PURE__ */ Q({
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
    const a = e, s = t, n = `kiut-input-number-${Wt()}`, o = S(() => a.id ?? n), i = S(() => `${o.value}-err`), r = S(() => {
      switch (a.align) {
        case "start":
          return "text-start";
        case "end":
          return "text-end";
        default:
          return "text-center";
      }
    }), l = S(
      () => a.modelValue === null || a.modelValue === void 0 ? "" : String(a.modelValue)
    );
    function d(u) {
      const h = u.target.value;
      if (h === "") {
        s("update:modelValue", null);
        return;
      }
      const f = Number(h);
      s("update:modelValue", Number.isNaN(f) ? null : f);
    }
    return (u, h) => (y(), x("div", w4, [
      e.label ? (y(), x("label", {
        key: 0,
        for: o.value,
        class: G(T(me))
      }, M(e.label), 11, $4)) : E("", !0),
      c("input", {
        id: o.value,
        value: l.value,
        type: "number",
        onInput: d,
        class: G([
          T(Te),
          e.invalid ? T(pa) : "",
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
      }, null, 42, M4),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: i.value,
        class: G(T(Ve)),
        role: "alert"
      }, M(e.errorText), 11, C4)) : E("", !0)
    ]));
  }
});
function D4(e, t) {
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
const A4 = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], T4 = ["aria-selected", "onClick", "onMouseenter"], B4 = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, L4 = { class: "min-w-0 flex-1" }, Ni = /* @__PURE__ */ Q({
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
    const a = e, s = t, n = `kiut-select-${Wt()}`, o = `${n}-label`, i = `${n}-btn`, r = `${n}-listbox`, l = nt(null), d = nt(null), u = nt(!1), h = nt(0), f = S(() => a.options.filter((A) => !A.disabled)), v = S(
      () => a.ariaLabelTrigger ?? a.placeholder ?? "Seleccionar opción"
    ), g = S(() => a.modelValue === null || a.modelValue === void 0 || a.modelValue === "" ? a.placeholder : a.options.find((P) => P.value === a.modelValue)?.label ?? String(a.modelValue));
    function _(A) {
      return `${String(A.value)}-${A.label}`;
    }
    function m(A) {
      return a.modelValue === A.value;
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
      s("update:modelValue", A.value), u.value = !1;
    }
    function $() {
      a.disabled || (u.value = !u.value);
    }
    function w(A) {
      if (A.stopPropagation(), !a.disabled && ($(), u.value)) {
        const P = Math.max(
          0,
          f.value.findIndex((R) => R.value === a.modelValue)
        );
        h.value = P, St(() => d.value?.focus());
      }
    }
    function k(A) {
      if (!u.value) return;
      const P = l.value;
      P && !P.contains(A.target) && (u.value = !1);
    }
    function C(A) {
      a.disabled || (A.key === "ArrowDown" || A.key === "Enter" || A.key === " ") && (A.preventDefault(), u.value || (u.value = !0, h.value = Math.max(
        0,
        f.value.findIndex((P) => P.value === a.modelValue)
      ), St(() => d.value?.focus())));
    }
    function D(A) {
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
    return pe(() => {
      document.addEventListener("click", k);
    }), fa(() => {
      document.removeEventListener("click", k);
    }), (A, P) => (y(), x("div", {
      ref_key: "rootRef",
      ref: l,
      class: "relative font-sans"
    }, [
      e.label ? (y(), x("label", {
        key: 0,
        id: o,
        class: G(T(me))
      }, M(e.label), 3)) : E("", !0),
      c("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: G([
          T(Te),
          "flex items-center justify-between gap-2 text-left",
          u.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": u.value,
        "aria-haspopup": "listbox",
        "aria-controls": r,
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : v.value,
        onClick: w,
        onKeydown: C
      }, [
        c("span", {
          class: G([
            "min-w-0 flex-1 truncate",
            e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, M(g.value), 3),
        Z(T(Fg), {
          class: G(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", u.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, A4),
      se(c("ul", {
        id: r,
        ref_key: "listRef",
        ref: d,
        role: "listbox",
        tabindex: "-1",
        class: "absolute left-0 right-0 z-50 mt-[-3px] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
        onKeydown: fe(D, ["stop"])
      }, [
        (y(!0), x(U, null, tt(f.value, (R, I) => (y(), x("li", {
          key: _(R),
          role: "option",
          "aria-selected": m(R),
          class: G(p(R, I)),
          onClick: fe((V) => b(R), ["stop"]),
          onMouseenter: (V) => h.value = I
        }, [
          c("span", B4, [
            m(R) ? (y(), ht(T(D4), {
              key: 0,
              class: "h-4 w-4 text-white"
            })) : E("", !0)
          ]),
          c("span", L4, M(R.label), 1)
        ], 42, T4))), 128))
      ], 544), [
        [Fa, u.value]
      ])
    ], 512));
  }
}), F4 = ["id", "aria-checked", "aria-disabled", "disabled", "onKeydown"], P4 = { class: "sr-only" }, E4 = /* @__PURE__ */ Q({
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
      class: G([
        "relative inline-flex h-8 w-[3.75rem] shrink-0 cursor-pointer items-center rounded-full p-0.5 shadow-sm transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        e.modelValue ? "bg-[color:var(--kiut-primary)]" : "bg-[#DEDEE3] dark:bg-slate-600"
      ]),
      onClick: n,
      onKeydown: [
        Pa(fe(n, ["prevent", "stop"]), ["space"]),
        Pa(fe(n, ["prevent"]), ["enter"])
      ]
    }, [
      c("span", {
        class: G(["pointer-events-none inline-block h-7 w-7 translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", e.modelValue ? "translate-x-7" : "translate-x-0"]),
        "aria-hidden": "true"
      }, null, 2),
      c("span", P4, M(e.ariaLabel), 1)
    ], 42, F4));
  }
}), R4 = { class: "font-sans" }, I4 = ["for"], O4 = { class: "flex gap-2" }, z4 = { class: "w-[7.5rem] shrink-0" }, V4 = { class: "min-w-0 flex-1" }, N4 = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], W4 = ["id"], H4 = /* @__PURE__ */ Q({
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
    const a = e, s = t, n = `kiut-phone-${Wt()}`, o = S(() => a.id ?? `${n}-num`), i = S(() => `${o.value}-err`), r = S({
      get: () => a.modelValue.prefix,
      set: (d) => s("update:modelValue", { ...a.modelValue, prefix: d })
    }), l = S({
      get: () => a.modelValue.number,
      set: (d) => s("update:modelValue", { ...a.modelValue, number: d })
    });
    return (d, u) => (y(), x("div", R4, [
      e.label ? (y(), x("label", {
        key: 0,
        for: o.value,
        class: G(T(me))
      }, M(e.label), 11, I4)) : E("", !0),
      c("div", O4, [
        c("div", z4, [
          Z(Ni, {
            modelValue: r.value,
            "onUpdate:modelValue": u[0] || (u[0] = (h) => r.value = h),
            "aria-label-trigger": "Prefijo telefónico",
            options: e.prefixOptions,
            placeholder: e.prefixPlaceholder,
            disabled: e.disabled
          }, null, 8, ["modelValue", "options", "placeholder", "disabled"])
        ]),
        c("div", V4, [
          se(c("input", {
            id: o.value,
            "onUpdate:modelValue": u[1] || (u[1] = (h) => l.value = h),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: G([T(Te), e.invalid ? T(pa) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, N4), [
            [ta, l.value]
          ])
        ])
      ]),
      e.errorText ? (y(), x("p", {
        key: 1,
        id: i.value,
        class: G(T(Ve)),
        role: "alert"
      }, M(e.errorText), 11, W4)) : E("", !0)
    ]));
  }
}), j4 = ["role", "aria-label"], Y4 = { class: "flex flex-wrap gap-2" }, q4 = ["aria-checked", "role", "onClick"], U4 = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, K4 = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, X4 = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, G4 = /* @__PURE__ */ Q({
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
    const a = e, s = t, n = S(() => a.multiple ? Array.isArray(a.modelValue) ? a.modelValue : [] : []);
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
      c("div", Y4, [
        (y(!0), x(U, null, tt(e.items, (u) => (y(), x("button", {
          key: u.value,
          type: "button",
          class: G(i(u)),
          "aria-checked": o(u),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (h) => r(u)
        }, [
          c("span", U4, [
            o(u) ? (y(), x("span", K4)) : E("", !0)
          ]),
          u.dotColor ? (y(), x("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: xt({ backgroundColor: u.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : E("", !0),
          c("span", X4, M(u.label), 1)
        ], 10, q4))), 128))
      ])
    ], 8, j4));
  }
}), Z4 = ["aria-label"], Q4 = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], J4 = { class: "truncate px-3 py-2 text-sm font-medium" }, tM = /* @__PURE__ */ Q({
  name: "SegmentedControl",
  __name: "SegmentedControl",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Segmented control" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, s = t, n = `kiut-seg-${Wt()}`, o = (_) => `${n}-seg-${_}`, i = nt([]);
    function r(_, m) {
      _ instanceof HTMLButtonElement ? i.value[m] = _ : i.value[m] = null;
    }
    function l(_) {
      return _.value === a.modelValue;
    }
    function d(_) {
      const m = l(_), p = "flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]";
      return _.disabled ? `${p} cursor-not-allowed opacity-40` : m ? `${p} bg-[color:var(--kiut-primary)] text-white shadow-sm` : `${p} text-[color:var(--kiut-text-primary)] hover:bg-black/[0.03] dark:text-slate-100 dark:hover:bg-white/[0.06]`;
    }
    function u(_) {
      _.disabled || _.value !== a.modelValue && s("update:modelValue", _.value);
    }
    function h(_, m, p) {
      u(_), St(() => i.value[m]?.focus());
    }
    const f = S(
      () => a.items.map((_, m) => _.disabled ? -1 : m).filter((_) => _ >= 0)
    );
    function v(_, m) {
      const p = a.items.length;
      if (p === 0) return 0;
      let b = _;
      for (let $ = 0; $ < p; $++)
        if (b = (b + m + p) % p, !a.items[b]?.disabled) return b;
      return _;
    }
    function g(_, m) {
      if (_.key === "ArrowRight" || _.key === "ArrowDown") {
        _.preventDefault();
        const p = v(m, 1), b = a.items[p];
        b && u(b), St(() => i.value[p]?.focus());
      } else if (_.key === "ArrowLeft" || _.key === "ArrowUp") {
        _.preventDefault();
        const p = v(m, -1), b = a.items[p];
        b && u(b), St(() => i.value[p]?.focus());
      } else if (_.key === "Home") {
        _.preventDefault();
        const p = f.value[0];
        if (p !== void 0) {
          const b = a.items[p];
          b && u(b), St(() => i.value[p]?.focus());
        }
      } else if (_.key === "End") {
        _.preventDefault();
        const p = f.value[f.value.length - 1];
        if (p !== void 0) {
          const b = a.items[p];
          b && u(b), St(() => i.value[p]?.focus());
        }
      }
    }
    return (_, m) => (y(), x("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-[color:var(--kiut-border-light)]"
    }, [
      (y(!0), x(U, null, tt(e.items, (p, b) => (y(), x("button", {
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
        c("span", J4, M(p.label), 1)
      ], 42, Q4))), 128))
    ], 8, Z4));
  }
});
function ke(e) {
  const [t, a, s] = e.split("-").map(Number);
  return new Date(t, a - 1, s);
}
function Xe(e) {
  const t = e.getFullYear(), a = String(e.getMonth() + 1).padStart(2, "0"), s = String(e.getDate()).padStart(2, "0");
  return `${t}-${a}-${s}`;
}
function le(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function _s(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function Do(e, t) {
  return new Date(e.getFullYear(), e.getMonth() + t, e.getDate());
}
function Za(e, t) {
  const a = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()), s = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
  return a < s ? -1 : a > s ? 1 : 0;
}
function Ao(e, t) {
  return Za(e, t) === 0;
}
function xs(e, t) {
  return Za(e, t) < 0;
}
function eM(e, t) {
  return Za(e, t) >= 0;
}
function aM(e, t) {
  return Za(e, t) <= 0;
}
function sM(e) {
  const t = e.getFullYear(), a = e.getMonth(), s = new Date(t, a, 1), n = new Date(s);
  n.setDate(s.getDate() - s.getDay());
  const o = [], i = new Date(n);
  for (let r = 0; r < 42; r++)
    o.push(new Date(i)), i.setDate(i.getDate() + 1);
  return o;
}
const nM = [
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
], oM = [
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
function To(e) {
  return `${nM[e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function Bo(e) {
  return `${oM[e.getMonth()]} ${e.getFullYear()}`;
}
const iM = ["aria-expanded", "aria-labelledby", "aria-label"], rM = ["onKeydown"], lM = { class: "mb-4 flex items-center justify-between gap-2" }, cM = { class: "flex min-w-0 flex-1 justify-center gap-8 text-center text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, dM = { class: "min-w-0 truncate" }, uM = { class: "min-w-0 truncate" }, hM = { class: "flex flex-col gap-6 sm:flex-row sm:gap-8" }, fM = { class: "mb-2 grid grid-cols-7 gap-1 text-center text-[11px] font-medium uppercase tracking-wide text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, gM = { class: "grid grid-cols-7 gap-y-1" }, pM = ["disabled", "onClick"], vM = /* @__PURE__ */ Q({
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
    const a = e, s = t, o = `${`kiut-drp-${Wt()}`}-lbl`, i = nt(null), r = nt(null), l = nt(!1), d = nt(null), u = nt(_s(/* @__PURE__ */ new Date())), h = S(() => {
      const D = _s(u.value);
      return [D, Do(D, 1)];
    }), f = S(() => a.ariaLabel ?? a.placeholder), v = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], g = S(() => {
      if (!a.modelValue.start || !a.modelValue.end) return a.placeholder;
      const D = ke(a.modelValue.start), A = ke(a.modelValue.end);
      return `${To(D)} – ${To(A)}`;
    });
    function _(D, A) {
      return D.getMonth() === A.getMonth() && D.getFullYear() === A.getFullYear();
    }
    function m(D) {
      const A = le(D);
      if (a.minDate) {
        const P = le(ke(a.minDate));
        if (xs(A, P)) return !0;
      }
      if (a.maxDate) {
        const P = le(ke(a.maxDate));
        if (xs(P, A)) return !0;
      }
      return !1;
    }
    function p(D, A) {
      const P = _(A, D), R = a.modelValue.start ? le(ke(a.modelValue.start)) : null, I = a.modelValue.end ? le(ke(a.modelValue.end)) : null, V = le(A), q = P ? "text-[color:var(--kiut-text-primary)] dark:text-slate-100" : "text-slate-400 dark:text-slate-500";
      if (!R || !I)
        return `${q} hover:bg-black/[0.04] dark:hover:bg-white/[0.06]`;
      const L = eM(V, R) && aM(V, I), F = Ao(V, R), O = Ao(V, I);
      return F || O ? "bg-[color:var(--kiut-primary)] font-semibold text-white shadow-sm" : L ? `${q} bg-violet-100/90 dark:bg-violet-950/35 hover:bg-violet-200/80 dark:hover:bg-violet-900/40` : `${q} hover:bg-black/[0.04] dark:hover:bg-white/[0.06]`;
    }
    function b(D) {
      if (m(D)) return;
      const A = le(D);
      if (!d.value) {
        d.value = new Date(A), s("update:modelValue", { start: Xe(A), end: Xe(A) });
        return;
      }
      let R = le(d.value), I = new Date(A);
      xs(I, R) && ([R, I] = [I, R]), s("update:modelValue", { start: Xe(R), end: Xe(I) }), d.value = null, l.value = !1;
    }
    function $(D) {
      u.value = Do(u.value, D);
    }
    function w() {
      l.value = !1;
    }
    function k(D) {
      if (D.stopPropagation(), l.value = !l.value, l.value) {
        if (d.value = null, a.modelValue.start)
          try {
            u.value = _s(ke(a.modelValue.start));
          } catch {
          }
        St(() => r.value?.focus());
      }
    }
    function C(D) {
      if (!l.value) return;
      const A = i.value;
      A && !A.contains(D.target) && (l.value = !1);
    }
    return Nt(l, (D) => {
      D && (d.value = null);
    }), pe(() => {
      document.addEventListener("click", C);
    }), fa(() => {
      document.removeEventListener("click", C);
    }), (D, A) => (y(), x("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (y(), x("label", {
        key: 0,
        id: o,
        class: G(T(me))
      }, M(e.label), 3)) : E("", !0),
      c("button", {
        type: "button",
        class: G([T(Te), "flex w-full items-center gap-2 text-left"]),
        "aria-expanded": l.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : f.value,
        onClick: k
      }, [
        Z(T(Ii), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        c("span", {
          class: G([
            "min-w-0 flex-1 truncate",
            !e.modelValue.start || !e.modelValue.end ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, M(g.value), 3)
      ], 10, iM),
      se(c("div", {
        ref_key: "panelRef",
        ref: r,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": "Calendario de rango",
        class: "absolute left-0 top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[100vw] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] p-4 shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]",
        onKeydown: Pa(fe(w, ["stop"]), ["escape"])
      }, [
        c("div", lM, [
          c("button", {
            type: "button",
            class: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-slate-300 dark:hover:bg-white/[0.06]",
            "aria-label": "Mes anterior",
            onClick: A[0] || (A[0] = (P) => $(-1))
          }, [
            Z(T(Pg), {
              class: "h-5 w-5",
              "aria-hidden": "true"
            })
          ]),
          c("div", cM, [
            c("span", dM, M(T(Bo)(h.value[0])), 1),
            c("span", uM, M(T(Bo)(h.value[1])), 1)
          ]),
          c("button", {
            type: "button",
            class: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-slate-300 dark:hover:bg-white/[0.06]",
            "aria-label": "Mes siguiente",
            onClick: A[1] || (A[1] = (P) => $(1))
          }, [
            Z(T(Eg), {
              class: "h-5 w-5",
              "aria-hidden": "true"
            })
          ])
        ]),
        c("div", hM, [
          (y(!0), x(U, null, tt(h.value, (P) => (y(), x("div", {
            key: `${P.getFullYear()}-${P.getMonth()}`,
            class: "min-w-0 flex-1"
          }, [
            c("div", fM, [
              (y(), x(U, null, tt(v, (R) => c("span", { key: R }, M(R), 1)), 64))
            ]),
            c("div", gM, [
              (y(!0), x(U, null, tt(T(sM)(P), (R) => (y(), x("button", {
                key: T(Xe)(R),
                type: "button",
                disabled: m(R),
                class: G(["relative flex h-9 items-center justify-center rounded-lg text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", p(P, R)]),
                onClick: (I) => b(R)
              }, M(R.getDate()), 11, pM))), 128))
            ])
          ]))), 128))
        ])
      ], 40, rM), [
        [Fa, l.value]
      ])
    ], 512));
  }
}), bM = {
  key: 0,
  class: "relative flex h-2 w-2 shrink-0 items-center justify-center",
  "aria-hidden": "true"
}, mM = /* @__PURE__ */ Q({
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
    const t = e, a = S(() => t.statusLive !== void 0), s = S(
      () => t.statusLive === !0 ? t.labelConnected : t.labelDisconnected
    ), n = S(() => t.statusLive === !0 ? [
      "border border-emerald-200 bg-emerald-50",
      "dark:border-emerald-800/80 dark:bg-emerald-950/40"
    ] : [
      "border border-transparent bg-slate-100 dark:border-slate-700/80 dark:bg-slate-800/90"
    ]), o = S(() => t.statusLive === !0 ? "text-emerald-700 dark:text-emerald-300" : "text-[color:var(--kiut-text-primary)] dark:text-slate-300"), i = S(() => {
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
      class: G(["inline-flex w-min max-w-full min-h-[22px] items-center gap-2 rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug", n.value])
    }, [
      e.statusLive === !0 ? (y(), x("span", bM, [...l[0] || (l[0] = [
        c("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        c("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : E("", !0),
      c("span", {
        class: G(["min-w-0 flex-1 text-center", o.value])
      }, M(s.value), 3)
    ], 2)) : (y(), x("span", {
      key: 1,
      class: G(["inline-flex w-min max-w-full min-h-[22px] items-center justify-center rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] font-semibold leading-snug tracking-tight", i.value])
    }, [
      Vt(r.$slots, "default", {}, () => [
        kt(M(e.label), 1)
      ])
    ], 2));
  }
}), yM = {
  key: 0,
  class: "group relative inline-flex shrink-0"
}, _M = ["type", "disabled", "aria-label"], xM = {
  key: 1,
  class: "min-w-0 truncate"
}, kM = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, wM = ["type", "disabled", "aria-label"], $M = {
  key: 1,
  class: "min-w-0 truncate"
}, La = /* @__PURE__ */ Q({
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
    const t = e, a = Yi(), s = S(() => !!t.tooltip?.trim()), n = S(() => t.variant === "action"), o = S(() => !n.value), i = S(() => {
      const u = a["aria-label"];
      if (typeof u == "string" && u.length > 0) return u;
      if (n.value && t.tooltip?.trim()) return t.tooltip.trim();
    }), r = S(() => {
      const u = a.type;
      return u === "submit" || u === "reset" || u === "button" ? u : "button";
    }), l = S(() => {
      const { class: u, type: h, "aria-label": f, ...v } = a;
      return v;
    }), d = S(() => t.variant === "primary" ? [
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
    return (u, h) => s.value ? (y(), x("span", yM, [
      c("button", Js({
        type: r.value,
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [d.value, T(a).class]],
        disabled: e.disabled,
        "aria-label": i.value
      }, l.value), [
        u.$slots.icon ? (y(), x("span", {
          key: 0,
          class: G(["inline-flex shrink-0", n.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          Vt(u.$slots, "icon")
        ], 2)) : E("", !0),
        o.value ? (y(), x("span", xM, [
          Vt(u.$slots, "default")
        ])) : E("", !0)
      ], 16, _M),
      c("span", kM, M(e.tooltip), 1)
    ])) : (y(), x("button", Js({
      key: 1,
      type: r.value,
      class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [d.value, T(a).class]],
      disabled: e.disabled,
      "aria-label": i.value
    }, l.value), [
      u.$slots.icon ? (y(), x("span", {
        key: 0,
        class: G(["inline-flex shrink-0", n.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        Vt(u.$slots, "icon")
      ], 2)) : E("", !0),
      o.value ? (y(), x("span", $M, [
        Vt(u.$slots, "default")
      ])) : E("", !0)
    ], 16, wM));
  }
}), MM = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, CM = { class: "flex shrink-0 items-start justify-between gap-4 border-b border-slate-100 bg-slate-50/50 px-6 py-5 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.02]" }, SM = { class: "min-w-0 flex-1 space-y-1" }, DM = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, AM = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-6" }, TM = { class: "flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2" }, BM = /* @__PURE__ */ Q({
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
    const a = e, s = t, o = `${`kiut-modal-${Wt()}`}-title`, i = nt(null);
    function r() {
      s("cancel"), s("update:modelValue", !1);
    }
    function l() {
      s("confirm");
    }
    function d(u) {
      a.modelValue && u.key === "Escape" && (u.preventDefault(), r());
    }
    return Nt(
      () => a.modelValue,
      (u) => {
        u && requestAnimationFrame(() => {
          i.value?.focus({ preventScroll: !0 });
        });
      }
    ), pe(() => {
      document.addEventListener("keydown", d);
    }), fa(() => {
      document.removeEventListener("keydown", d);
    }), (u, h) => (y(), ht(Io, { to: "body" }, [
      Z(Eo, { name: "kiut-modal" }, {
        default: Ge(() => [
          e.modelValue ? (y(), x("div", MM, [
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
              onClick: h[0] || (h[0] = fe(() => {
              }, ["stop"]))
            }, [
              c("header", CM, [
                c("div", SM, [
                  c("h2", {
                    id: o,
                    class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                  }, M(e.title), 1),
                  e.subtitle ? (y(), x("p", DM, M(e.subtitle), 1)) : E("", !0)
                ]),
                Z(La, {
                  variant: "action",
                  type: "button",
                  class: "shrink-0",
                  onClick: r
                }, {
                  icon: Ge(() => [
                    Z(T(Oi), { class: "h-5 w-5" })
                  ]),
                  _: 1
                })
              ]),
              c("div", AM, [
                Vt(u.$slots, "default", {}, void 0, !0)
              ]),
              c("footer", TM, [
                Z(La, {
                  variant: "secondary",
                  type: "button",
                  onClick: r
                }, {
                  default: Ge(() => [
                    kt(M(e.cancelLabel), 1)
                  ]),
                  _: 1
                }),
                Z(La, {
                  variant: "primary",
                  type: "button",
                  onClick: l
                }, {
                  default: Ge(() => [
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
}), LM = /* @__PURE__ */ at(BM, [["__scopeId", "data-v-07e9b094"]]), FM = { class: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between" }, PM = { class: "flex min-w-0 flex-1 flex-col gap-1.5" }, EM = { class: "flex min-w-0 items-center gap-2.5" }, RM = {
  key: 0,
  class: "inline-flex shrink-0 items-center text-[color:var(--kiut-text-primary)] dark:text-slate-100 [&>svg]:size-6",
  "aria-hidden": "true"
}, IM = {
  key: 0,
  class: "text-base leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, OM = {
  key: 0,
  class: "flex shrink-0 flex-wrap items-center justify-end gap-2 sm:pt-0.5"
}, zM = {
  key: 0,
  class: "mt-6"
}, VM = /* @__PURE__ */ Q({
  name: "Section",
  __name: "Section",
  props: {
    title: {},
    subtitle: {},
    icon: {}
  },
  setup(e) {
    const t = e, a = Ro(), n = `${`kiut-section-${Wt()}`}-title`, o = S(() => !!(a.icon || t.icon));
    return (i, r) => (y(), x("section", {
      class: "mb-6 text-left font-['Inter',system-ui,sans-serif]",
      "aria-labelledby": n
    }, [
      c("header", FM, [
        c("div", PM, [
          c("div", EM, [
            o.value ? (y(), x("span", RM, [
              Vt(i.$slots, "icon", {}, () => [
                e.icon ? (y(), ht(Ls(e.icon), { key: 0 })) : E("", !0)
              ])
            ])) : E("", !0),
            c("h2", {
              id: n,
              class: "min-w-0 text-3xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
            }, M(e.title), 1)
          ]),
          e.subtitle ? (y(), x("p", IM, M(e.subtitle), 1)) : E("", !0)
        ]),
        i.$slots.actions ? (y(), x("div", OM, [
          Vt(i.$slots, "actions")
        ])) : E("", !0)
      ]),
      i.$slots.default ? (y(), x("div", zM, [
        Vt(i.$slots, "default")
      ])) : E("", !0)
    ]));
  }
}), ZM = {
  install(e) {
    e.component("KiutChartBar", ne), e.component("KiutChartLine", ve), e.component("KiutPieChart", Ga), e.component("KiutBoxplotChart", qh), e.component("KiutCandlestickChart", Ei), e.component("KiutHistogramChart", Ri), e.component("KiutSankeyChart", be), e.component("KiutAgentsPerDay", np), e.component("KiutBookingManager", Wp), e.component("KiutCheckin", h0), e.component("KiutCheckinMetrics", I0), e.component("KiutCheckinSegments", dv), e.component("KiutDisruption", Uv), e.component("KiutFAQ", ub), e.component("KiutMessagesPerAgent", _b), e.component("KiutRecordLocator", Yb), e.component("KiutSalesByChannel", cm), e.component("KiutSeller", Vm), e.component("KiutTopAgents", Xm), e.component("KiutPaymentMethod", B1), e.component("KiutAgentHumanConversations", yy), e.component("KiutChannelMetrics", By), e.component("KiutTriageCombinations", Gy), e.component("KiutSelectLanguage", r_), e.component("KiutGuardrails", E_), e.component("KiutDisruptionNotifier", L2), e.component("KiutTotalConversationsCard", O2), e.component("KiutCsatP95Card", j2), e.component("KiutAiGeneratedRevenueCard", G2), e.component("KiutNpsDailyMetrics", zi), e.component("KiutNpsMetrics", zx), e.component("KiutNpsOverviewMetrics", Vi), e.component("KiutAWSCost", nk), e.component("KiutCostUsage", Sk), e.component("KiutTokenUsage", Kk), e.component("KiutConversationCount", l5), e.component("KiutTopAgentsAnalysis", x5), e.component("KiutTopAgentsPie", B5), e.component("KiutDailyCostTrends", N5), e.component("KiutModelUsage", uw), e.component("KiutMessageRoles", Aw), e.component("KiutCostPerConversations", Kw), e.component("Tabs", t$), e.component("Table", d$), e.component("Filters", H$), e.component("InputText", K$), e.component("InputFile", a4), e.component("InputDateTime", l4), e.component("InputRange", k4), e.component("InputNumber", S4), e.component("Select", Ni), e.component("Toggle", E4), e.component("InputPhone", H4), e.component("SelectablePills", G4), e.component("SegmentedControl", tM), e.component("DateRangePicker", vM), e.component("Tag", mM), e.component("Button", La), e.component("Modal", LM), e.component("Section", VM);
  }
};
export {
  nk as AWSCost,
  yy as AgentHumanConversations,
  np as AgentsPerDay,
  G2 as AiGeneratedRevenueCard,
  Wp as BookingManager,
  qh as BoxplotChart,
  La as Button,
  Ei as CandlestickChart,
  By as ChannelMetrics,
  ne as ChartBar,
  ve as ChartLine,
  h0 as Checkin,
  I0 as CheckinMetrics,
  dv as CheckinSegments,
  l5 as ConversationCount,
  Kw as CostPerConversations,
  Sk as CostUsage,
  j2 as CsatP95Card,
  N5 as DailyCostTrends,
  vM as DateRangePicker,
  Uv as Disruption,
  L2 as DisruptionNotifier,
  ub as FAQ,
  H$ as Filters,
  E_ as Guardrails,
  Ri as HistogramChart,
  l4 as InputDateTime,
  a4 as InputFile,
  S4 as InputNumber,
  H4 as InputPhone,
  k4 as InputRange,
  K$ as InputText,
  ZM as KiutUIPlugin,
  Aw as MessageRoles,
  _b as MessagesPerAgent,
  LM as Modal,
  uw as ModelUsage,
  zi as NpsDailyMetrics,
  zx as NpsMetrics,
  Vi as NpsOverviewMetrics,
  B1 as PaymentMethod,
  Ga as PieChart,
  Yb as RecordLocator,
  cm as SalesByChannel,
  be as SankeyChart,
  VM as Section,
  tM as SegmentedControl,
  Ni as Select,
  r_ as SelectLanguage,
  G4 as SelectablePills,
  Vm as Seller,
  d$ as Table,
  t$ as Tabs,
  mM as Tag,
  E4 as Toggle,
  Kk as TokenUsage,
  Xm as TopAgents,
  x5 as TopAgentsAnalysis,
  B5 as TopAgentsPie,
  O2 as TotalConversationsCard,
  Gy as TriageCombinations
};
//# sourceMappingURL=kiut-ui.es.js.map
