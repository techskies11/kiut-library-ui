import { defineComponent as fe, shallowRef as wi, h as He, ref as ne, onMounted as Je, onUnmounted as at, watch as Le, toRaw as to, nextTick as We, version as Gl, isProxy as Ci, computed as $, toRef as $e, openBlock as h, createElementBlock as x, normalizeStyle as Ce, createVNode as z, unref as L, createElementVNode as d, Fragment as he, renderList as pe, normalizeClass as Z, toDisplayString as A, createCommentVNode as F, onBeforeUnmount as $i, createStaticVNode as ao, useSlots as go, renderSlot as _e, Transition as ct, withCtx as O, Comment as Zl, createBlock as ee, resolveDynamicComponent as rt, createTextVNode as Ae, Teleport as Wt, withDirectives as Qe, withModifiers as Re, vModelText as It, vShow as Kt, createSlots as zo, mergeProps as yt, useAttrs as en, withKeys as $a, inject as Si } from "vue";
import * as jo from "echarts/core";
import { TooltipComponent as Ql, TitleComponent as Jl } from "echarts/components";
import { SankeyChart as er } from "echarts/charts";
import { CanvasRenderer as tr } from "echarts/renderers";
import Ne from "moment";
function tn(e) {
  return e + 0.5 | 0;
}
const Gt = (e, t, a) => Math.max(Math.min(e, a), t);
function Fa(e) {
  return Gt(tn(e * 2.55), 0, 255);
}
function ea(e) {
  return Gt(tn(e * 255), 0, 255);
}
function Nt(e) {
  return Gt(tn(e / 2.55) / 100, 0, 1);
}
function Ho(e) {
  return Gt(tn(e * 100), 0, 100);
}
const vt = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, no = [..."0123456789ABCDEF"], ar = (e) => no[e & 15], nr = (e) => no[(e & 240) >> 4] + no[e & 15], sn = (e) => (e & 240) >> 4 === (e & 15), or = (e) => sn(e.r) && sn(e.g) && sn(e.b) && sn(e.a);
function sr(e) {
  var t = e.length, a;
  return e[0] === "#" && (t === 4 || t === 5 ? a = {
    r: 255 & vt[e[1]] * 17,
    g: 255 & vt[e[2]] * 17,
    b: 255 & vt[e[3]] * 17,
    a: t === 5 ? vt[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (a = {
    r: vt[e[1]] << 4 | vt[e[2]],
    g: vt[e[3]] << 4 | vt[e[4]],
    b: vt[e[5]] << 4 | vt[e[6]],
    a: t === 9 ? vt[e[7]] << 4 | vt[e[8]] : 255
  })), a;
}
const ir = (e, t) => e < 255 ? t(e) : "";
function lr(e) {
  var t = or(e) ? ar : nr;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + ir(e.a, t) : void 0;
}
const rr = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Mi(e, t, a) {
  const n = t * Math.min(a, 1 - a), o = (s, i = (s + e / 30) % 12) => a - n * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [o(0), o(8), o(4)];
}
function cr(e, t, a) {
  const n = (o, s = (o + e / 60) % 6) => a - a * t * Math.max(Math.min(s, 4 - s, 1), 0);
  return [n(5), n(3), n(1)];
}
function dr(e, t, a) {
  const n = Mi(e, 1, 0.5);
  let o;
  for (t + a > 1 && (o = 1 / (t + a), t *= o, a *= o), o = 0; o < 3; o++)
    n[o] *= 1 - t - a, n[o] += t;
  return n;
}
function ur(e, t, a, n, o) {
  return e === o ? (t - a) / n + (t < a ? 6 : 0) : t === o ? (a - e) / n + 2 : (e - t) / n + 4;
}
function mo(e) {
  const a = e.r / 255, n = e.g / 255, o = e.b / 255, s = Math.max(a, n, o), i = Math.min(a, n, o), l = (s + i) / 2;
  let r, c, u;
  return s !== i && (u = s - i, c = l > 0.5 ? u / (2 - s - i) : u / (s + i), r = ur(a, n, o, u, s), r = r * 60 + 0.5), [r | 0, c || 0, l];
}
function po(e, t, a, n) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, a, n)).map(ea);
}
function bo(e, t, a) {
  return po(Mi, e, t, a);
}
function hr(e, t, a) {
  return po(dr, e, t, a);
}
function fr(e, t, a) {
  return po(cr, e, t, a);
}
function Di(e) {
  return (e % 360 + 360) % 360;
}
function gr(e) {
  const t = rr.exec(e);
  let a = 255, n;
  if (!t)
    return;
  t[5] !== n && (a = t[6] ? Fa(+t[5]) : ea(+t[5]));
  const o = Di(+t[2]), s = +t[3] / 100, i = +t[4] / 100;
  return t[1] === "hwb" ? n = hr(o, s, i) : t[1] === "hsv" ? n = fr(o, s, i) : n = bo(o, s, i), {
    r: n[0],
    g: n[1],
    b: n[2],
    a
  };
}
function mr(e, t) {
  var a = mo(e);
  a[0] = Di(a[0] + t), a = bo(a), e.r = a[0], e.g = a[1], e.b = a[2];
}
function pr(e) {
  if (!e)
    return;
  const t = mo(e), a = t[0], n = Ho(t[1]), o = Ho(t[2]);
  return e.a < 255 ? `hsla(${a}, ${n}%, ${o}%, ${Nt(e.a)})` : `hsl(${a}, ${n}%, ${o}%)`;
}
const Wo = {
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
}, Ko = {
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
function br() {
  const e = {}, t = Object.keys(Ko), a = Object.keys(Wo);
  let n, o, s, i, l;
  for (n = 0; n < t.length; n++) {
    for (i = l = t[n], o = 0; o < a.length; o++)
      s = a[o], l = l.replace(s, Wo[s]);
    s = parseInt(Ko[i], 16), e[l] = [s >> 16 & 255, s >> 8 & 255, s & 255];
  }
  return e;
}
let ln;
function vr(e) {
  ln || (ln = br(), ln.transparent = [0, 0, 0, 0]);
  const t = ln[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const yr = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function xr(e) {
  const t = yr.exec(e);
  let a = 255, n, o, s;
  if (t) {
    if (t[7] !== n) {
      const i = +t[7];
      a = t[8] ? Fa(i) : Gt(i * 255, 0, 255);
    }
    return n = +t[1], o = +t[3], s = +t[5], n = 255 & (t[2] ? Fa(n) : Gt(n, 0, 255)), o = 255 & (t[4] ? Fa(o) : Gt(o, 0, 255)), s = 255 & (t[6] ? Fa(s) : Gt(s, 0, 255)), {
      r: n,
      g: o,
      b: s,
      a
    };
  }
}
function kr(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${Nt(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const zn = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, ba = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function _r(e, t, a) {
  const n = ba(Nt(e.r)), o = ba(Nt(e.g)), s = ba(Nt(e.b));
  return {
    r: ea(zn(n + a * (ba(Nt(t.r)) - n))),
    g: ea(zn(o + a * (ba(Nt(t.g)) - o))),
    b: ea(zn(s + a * (ba(Nt(t.b)) - s))),
    a: e.a + a * (t.a - e.a)
  };
}
function rn(e, t, a) {
  if (e) {
    let n = mo(e);
    n[t] = Math.max(0, Math.min(n[t] + n[t] * a, t === 0 ? 360 : 1)), n = bo(n), e.r = n[0], e.g = n[1], e.b = n[2];
  }
}
function Ai(e, t) {
  return e && Object.assign(t || {}, e);
}
function Uo(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = ea(e[3]))) : (t = Ai(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = ea(t.a)), t;
}
function wr(e) {
  return e.charAt(0) === "r" ? xr(e) : gr(e);
}
class Ka {
  constructor(t) {
    if (t instanceof Ka)
      return t;
    const a = typeof t;
    let n;
    a === "object" ? n = Uo(t) : a === "string" && (n = sr(t) || vr(t) || wr(t)), this._rgb = n, this._valid = !!n;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = Ai(this._rgb);
    return t && (t.a = Nt(t.a)), t;
  }
  set rgb(t) {
    this._rgb = Uo(t);
  }
  rgbString() {
    return this._valid ? kr(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? lr(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? pr(this._rgb) : void 0;
  }
  mix(t, a) {
    if (t) {
      const n = this.rgb, o = t.rgb;
      let s;
      const i = a === s ? 0.5 : a, l = 2 * i - 1, r = n.a - o.a, c = ((l * r === -1 ? l : (l + r) / (1 + l * r)) + 1) / 2;
      s = 1 - c, n.r = 255 & c * n.r + s * o.r + 0.5, n.g = 255 & c * n.g + s * o.g + 0.5, n.b = 255 & c * n.b + s * o.b + 0.5, n.a = i * n.a + (1 - i) * o.a, this.rgb = n;
    }
    return this;
  }
  interpolate(t, a) {
    return t && (this._rgb = _r(this._rgb, t._rgb, a)), this;
  }
  clone() {
    return new Ka(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = ea(t), this;
  }
  clearer(t) {
    const a = this._rgb;
    return a.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, a = tn(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
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
    return rn(this._rgb, 2, t), this;
  }
  darken(t) {
    return rn(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return rn(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return rn(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return mr(this._rgb, t), this;
  }
}
function Ot() {
}
const Cr = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function Pe(e) {
  return e == null;
}
function Ge(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function Ie(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function wt(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function Bt(e, t) {
  return wt(e) ? e : t;
}
function De(e, t) {
  return typeof e > "u" ? t : e;
}
const $r = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, Ti = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function je(e, t, a) {
  if (e && typeof e.call == "function")
    return e.apply(a, t);
}
function Ee(e, t, a, n) {
  let o, s, i;
  if (Ge(e))
    for (s = e.length, o = 0; o < s; o++)
      t.call(a, e[o], o);
  else if (Ie(e))
    for (i = Object.keys(e), s = i.length, o = 0; o < s; o++)
      t.call(a, e[i[o]], i[o]);
}
function Sn(e, t) {
  let a, n, o, s;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (a = 0, n = e.length; a < n; ++a)
    if (o = e[a], s = t[a], o.datasetIndex !== s.datasetIndex || o.index !== s.index)
      return !1;
  return !0;
}
function Mn(e) {
  if (Ge(e))
    return e.map(Mn);
  if (Ie(e)) {
    const t = /* @__PURE__ */ Object.create(null), a = Object.keys(e), n = a.length;
    let o = 0;
    for (; o < n; ++o)
      t[a[o]] = Mn(e[a[o]]);
    return t;
  }
  return e;
}
function Bi(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function Sr(e, t, a, n) {
  if (!Bi(e))
    return;
  const o = t[e], s = a[e];
  Ie(o) && Ie(s) ? Ua(o, s, n) : t[e] = Mn(s);
}
function Ua(e, t, a) {
  const n = Ge(t) ? t : [
    t
  ], o = n.length;
  if (!Ie(e))
    return e;
  a = a || {};
  const s = a.merger || Sr;
  let i;
  for (let l = 0; l < o; ++l) {
    if (i = n[l], !Ie(i))
      continue;
    const r = Object.keys(i);
    for (let c = 0, u = r.length; c < u; ++c)
      s(r[c], e, i, a);
  }
  return e;
}
function za(e, t) {
  return Ua(e, t, {
    merger: Mr
  });
}
function Mr(e, t, a) {
  if (!Bi(e))
    return;
  const n = t[e], o = a[e];
  Ie(n) && Ie(o) ? za(n, o) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = Mn(o));
}
const Yo = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function Dr(e) {
  const t = e.split("."), a = [];
  let n = "";
  for (const o of t)
    n += o, n.endsWith("\\") ? n = n.slice(0, -1) + "." : (a.push(n), n = "");
  return a;
}
function Ar(e) {
  const t = Dr(e);
  return (a) => {
    for (const n of t) {
      if (n === "")
        break;
      a = a && a[n];
    }
    return a;
  };
}
function fa(e, t) {
  return (Yo[t] || (Yo[t] = Ar(t)))(e);
}
function vo(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const Ya = (e) => typeof e < "u", ta = (e) => typeof e == "function", qo = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const a of e)
    if (!t.has(a))
      return !1;
  return !0;
};
function Tr(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const Fe = Math.PI, Ue = 2 * Fe, Br = Ue + Fe, Dn = Number.POSITIVE_INFINITY, Lr = Fe / 180, Ze = Fe / 2, sa = Fe / 4, Xo = Fe * 2 / 3, Li = Math.log10, Pt = Math.sign;
function ja(e, t, a) {
  return Math.abs(e - t) < a;
}
function Go(e) {
  const t = Math.round(e);
  e = ja(e, t, e / 1e3) ? t : e;
  const a = Math.pow(10, Math.floor(Li(e))), n = e / a;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * a;
}
function Rr(e) {
  const t = [], a = Math.sqrt(e);
  let n;
  for (n = 1; n < a; n++)
    e % n === 0 && (t.push(n), t.push(e / n));
  return a === (a | 0) && t.push(a), t.sort((o, s) => o - s).pop(), t;
}
function Ir(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function qa(e) {
  return !Ir(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function Pr(e, t) {
  const a = Math.round(e);
  return a - t <= e && a + t >= e;
}
function Er(e, t, a) {
  let n, o, s;
  for (n = 0, o = e.length; n < o; n++)
    s = e[n][a], isNaN(s) || (t.min = Math.min(t.min, s), t.max = Math.max(t.max, s));
}
function zt(e) {
  return e * (Fe / 180);
}
function Or(e) {
  return e * (180 / Fe);
}
function Zo(e) {
  if (!wt(e))
    return;
  let t = 1, a = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, a++;
  return a;
}
function Ri(e, t) {
  const a = t.x - e.x, n = t.y - e.y, o = Math.sqrt(a * a + n * n);
  let s = Math.atan2(n, a);
  return s < -0.5 * Fe && (s += Ue), {
    angle: s,
    distance: o
  };
}
function oo(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function Fr(e, t) {
  return (e - t + Br) % Ue - Fe;
}
function St(e) {
  return (e % Ue + Ue) % Ue;
}
function Xa(e, t, a, n) {
  const o = St(e), s = St(t), i = St(a), l = St(s - o), r = St(i - o), c = St(o - s), u = St(o - i);
  return o === s || o === i || n && s === i || l > r && c < u;
}
function it(e, t, a) {
  return Math.max(t, Math.min(a, e));
}
function Vr(e) {
  return it(e, -32768, 32767);
}
function Zt(e, t, a, n = 1e-6) {
  return e >= Math.min(t, a) - n && e <= Math.max(t, a) + n;
}
function yo(e, t, a) {
  a = a || ((i) => e[i] < t);
  let n = e.length - 1, o = 0, s;
  for (; n - o > 1; )
    s = o + n >> 1, a(s) ? o = s : n = s;
  return {
    lo: o,
    hi: n
  };
}
const ua = (e, t, a, n) => yo(e, a, n ? (o) => {
  const s = e[o][t];
  return s < a || s === a && e[o + 1][t] === a;
} : (o) => e[o][t] < a), Nr = (e, t, a) => yo(e, a, (n) => e[n][t] >= a);
function zr(e, t, a) {
  let n = 0, o = e.length;
  for (; n < o && e[n] < t; )
    n++;
  for (; o > n && e[o - 1] > a; )
    o--;
  return n > 0 || o < e.length ? e.slice(n, o) : e;
}
const Ii = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function jr(e, t) {
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
  }), Ii.forEach((a) => {
    const n = "_onData" + vo(a), o = e[a];
    Object.defineProperty(e, a, {
      configurable: !0,
      enumerable: !1,
      value(...s) {
        const i = o.apply(this, s);
        return e._chartjs.listeners.forEach((l) => {
          typeof l[n] == "function" && l[n](...s);
        }), i;
      }
    });
  });
}
function Qo(e, t) {
  const a = e._chartjs;
  if (!a)
    return;
  const n = a.listeners, o = n.indexOf(t);
  o !== -1 && n.splice(o, 1), !(n.length > 0) && (Ii.forEach((s) => {
    delete e[s];
  }), delete e._chartjs);
}
function Pi(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const Ei = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function Oi(e, t) {
  let a = [], n = !1;
  return function(...o) {
    a = o, n || (n = !0, Ei.call(window, () => {
      n = !1, e.apply(t, a);
    }));
  };
}
function Hr(e, t) {
  let a;
  return function(...n) {
    return t ? (clearTimeout(a), a = setTimeout(e, t, n)) : e.apply(this, n), t;
  };
}
const xo = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", nt = (e, t, a) => e === "start" ? t : e === "end" ? a : (t + a) / 2, Wr = (e, t, a, n) => e === (n ? "left" : "right") ? a : e === "center" ? (t + a) / 2 : t;
function Kr(e, t, a) {
  const n = t.length;
  let o = 0, s = n;
  if (e._sorted) {
    const { iScale: i, vScale: l, _parsed: r } = e, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, u = i.axis, { min: f, max: g, minDefined: b, maxDefined: m } = i.getUserBounds();
    if (b) {
      if (o = Math.min(
        // @ts-expect-error Need to type _parsed
        ua(r, u, f).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        a ? n : ua(t, u, i.getPixelForValue(f)).lo
      ), c) {
        const v = r.slice(0, o + 1).reverse().findIndex((p) => !Pe(p[l.axis]));
        o -= Math.max(0, v);
      }
      o = it(o, 0, n - 1);
    }
    if (m) {
      let v = Math.max(
        // @ts-expect-error Need to type _parsed
        ua(r, i.axis, g, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        a ? 0 : ua(t, u, i.getPixelForValue(g), !0).hi + 1
      );
      if (c) {
        const p = r.slice(v - 1).findIndex((y) => !Pe(y[l.axis]));
        v += Math.max(0, p);
      }
      s = it(v, o, n) - o;
    } else
      s = n - o;
  }
  return {
    start: o,
    count: s
  };
}
function Ur(e) {
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
const cn = (e) => e === 0 || e === 1, Jo = (e, t, a) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * Ue / a)), es = (e, t, a) => Math.pow(2, -10 * e) * Math.sin((e - t) * Ue / a) + 1, Ha = {
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
  easeInSine: (e) => -Math.cos(e * Ze) + 1,
  easeOutSine: (e) => Math.sin(e * Ze),
  easeInOutSine: (e) => -0.5 * (Math.cos(Fe * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => cn(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => cn(e) ? e : Jo(e, 0.075, 0.3),
  easeOutElastic: (e) => cn(e) ? e : es(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return cn(e) ? e : e < 0.5 ? 0.5 * Jo(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * es(e * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (e) => 1 - Ha.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? Ha.easeInBounce(e * 2) * 0.5 : Ha.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function ko(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function ts(e) {
  return ko(e) ? e : new Ka(e);
}
function jn(e) {
  return ko(e) ? e : new Ka(e).saturate(0.5).darken(0.1).hexString();
}
const Yr = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], qr = [
  "color",
  "borderColor",
  "backgroundColor"
];
function Xr(e) {
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
      properties: qr
    },
    numbers: {
      type: "number",
      properties: Yr
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
function Gr(e) {
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
const as = /* @__PURE__ */ new Map();
function Zr(e, t) {
  t = t || {};
  const a = e + JSON.stringify(t);
  let n = as.get(a);
  return n || (n = new Intl.NumberFormat(e, t), as.set(a, n)), n;
}
function _o(e, t, a) {
  return Zr(t, a).format(e);
}
const Qr = {
  values(e) {
    return Ge(e) ? e : "" + e;
  },
  numeric(e, t, a) {
    if (e === 0)
      return "0";
    const n = this.chart.options.locale;
    let o, s = e;
    if (a.length > 1) {
      const c = Math.max(Math.abs(a[0].value), Math.abs(a[a.length - 1].value));
      (c < 1e-4 || c > 1e15) && (o = "scientific"), s = Jr(e, a);
    }
    const i = Li(Math.abs(s)), l = isNaN(i) ? 1 : Math.max(Math.min(-1 * Math.floor(i), 20), 0), r = {
      notation: o,
      minimumFractionDigits: l,
      maximumFractionDigits: l
    };
    return Object.assign(r, this.options.ticks.format), _o(e, n, r);
  }
};
function Jr(e, t) {
  let a = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(a) >= 1 && e !== Math.floor(e) && (a = e - Math.floor(e)), a;
}
var Fi = {
  formatters: Qr
};
function ec(e) {
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
      callback: Fi.formatters.values,
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
const ga = /* @__PURE__ */ Object.create(null), so = /* @__PURE__ */ Object.create(null);
function Wa(e, t) {
  if (!t)
    return e;
  const a = t.split(".");
  for (let n = 0, o = a.length; n < o; ++n) {
    const s = a[n];
    e = e[s] || (e[s] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function Hn(e, t, a) {
  return typeof t == "string" ? Ua(Wa(e, t), a) : Ua(Wa(e, ""), t);
}
class tc {
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
    }, this.hover = {}, this.hoverBackgroundColor = (n, o) => jn(o.backgroundColor), this.hoverBorderColor = (n, o) => jn(o.borderColor), this.hoverColor = (n, o) => jn(o.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(a);
  }
  set(t, a) {
    return Hn(this, t, a);
  }
  get(t) {
    return Wa(this, t);
  }
  describe(t, a) {
    return Hn(so, t, a);
  }
  override(t, a) {
    return Hn(ga, t, a);
  }
  route(t, a, n, o) {
    const s = Wa(this, t), i = Wa(this, n), l = "_" + a;
    Object.defineProperties(s, {
      [l]: {
        value: s[a],
        writable: !0
      },
      [a]: {
        enumerable: !0,
        get() {
          const r = this[l], c = i[o];
          return Ie(r) ? Object.assign({}, c, r) : De(r, c);
        },
        set(r) {
          this[l] = r;
        }
      }
    });
  }
  apply(t) {
    t.forEach((a) => a(this));
  }
}
var Ye = /* @__PURE__ */ new tc({
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
  Xr,
  Gr,
  ec
]);
function ac(e) {
  return !e || Pe(e.size) || Pe(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function ns(e, t, a, n, o) {
  let s = t[o];
  return s || (s = t[o] = e.measureText(o).width, a.push(o)), s > n && (n = s), n;
}
function ia(e, t, a) {
  const n = e.currentDevicePixelRatio, o = a !== 0 ? Math.max(a / 2, 0.5) : 0;
  return Math.round((t - o) * n) / n + o;
}
function os(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function io(e, t, a, n) {
  Vi(e, t, a, n, null);
}
function Vi(e, t, a, n, o) {
  let s, i, l, r, c, u, f, g;
  const b = t.pointStyle, m = t.rotation, v = t.radius;
  let p = (m || 0) * Lr;
  if (b && typeof b == "object" && (s = b.toString(), s === "[object HTMLImageElement]" || s === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(a, n), e.rotate(p), e.drawImage(b, -b.width / 2, -b.height / 2, b.width, b.height), e.restore();
    return;
  }
  if (!(isNaN(v) || v <= 0)) {
    switch (e.beginPath(), b) {
      // Default includes circle
      default:
        o ? e.ellipse(a, n, o / 2, v, 0, 0, Ue) : e.arc(a, n, v, 0, Ue), e.closePath();
        break;
      case "triangle":
        u = o ? o / 2 : v, e.moveTo(a + Math.sin(p) * u, n - Math.cos(p) * v), p += Xo, e.lineTo(a + Math.sin(p) * u, n - Math.cos(p) * v), p += Xo, e.lineTo(a + Math.sin(p) * u, n - Math.cos(p) * v), e.closePath();
        break;
      case "rectRounded":
        c = v * 0.516, r = v - c, i = Math.cos(p + sa) * r, f = Math.cos(p + sa) * (o ? o / 2 - c : r), l = Math.sin(p + sa) * r, g = Math.sin(p + sa) * (o ? o / 2 - c : r), e.arc(a - f, n - l, c, p - Fe, p - Ze), e.arc(a + g, n - i, c, p - Ze, p), e.arc(a + f, n + l, c, p, p + Ze), e.arc(a - g, n + i, c, p + Ze, p + Fe), e.closePath();
        break;
      case "rect":
        if (!m) {
          r = Math.SQRT1_2 * v, u = o ? o / 2 : r, e.rect(a - u, n - r, 2 * u, 2 * r);
          break;
        }
        p += sa;
      /* falls through */
      case "rectRot":
        f = Math.cos(p) * (o ? o / 2 : v), i = Math.cos(p) * v, l = Math.sin(p) * v, g = Math.sin(p) * (o ? o / 2 : v), e.moveTo(a - f, n - l), e.lineTo(a + g, n - i), e.lineTo(a + f, n + l), e.lineTo(a - g, n + i), e.closePath();
        break;
      case "crossRot":
        p += sa;
      /* falls through */
      case "cross":
        f = Math.cos(p) * (o ? o / 2 : v), i = Math.cos(p) * v, l = Math.sin(p) * v, g = Math.sin(p) * (o ? o / 2 : v), e.moveTo(a - f, n - l), e.lineTo(a + f, n + l), e.moveTo(a + g, n - i), e.lineTo(a - g, n + i);
        break;
      case "star":
        f = Math.cos(p) * (o ? o / 2 : v), i = Math.cos(p) * v, l = Math.sin(p) * v, g = Math.sin(p) * (o ? o / 2 : v), e.moveTo(a - f, n - l), e.lineTo(a + f, n + l), e.moveTo(a + g, n - i), e.lineTo(a - g, n + i), p += sa, f = Math.cos(p) * (o ? o / 2 : v), i = Math.cos(p) * v, l = Math.sin(p) * v, g = Math.sin(p) * (o ? o / 2 : v), e.moveTo(a - f, n - l), e.lineTo(a + f, n + l), e.moveTo(a + g, n - i), e.lineTo(a - g, n + i);
        break;
      case "line":
        i = o ? o / 2 : Math.cos(p) * v, l = Math.sin(p) * v, e.moveTo(a - i, n - l), e.lineTo(a + i, n + l);
        break;
      case "dash":
        e.moveTo(a, n), e.lineTo(a + Math.cos(p) * (o ? o / 2 : v), n + Math.sin(p) * v);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function Ga(e, t, a) {
  return a = a || 0.5, !t || e && e.x > t.left - a && e.x < t.right + a && e.y > t.top - a && e.y < t.bottom + a;
}
function wo(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function Co(e) {
  e.restore();
}
function nc(e, t, a, n, o) {
  if (!t)
    return e.lineTo(a.x, a.y);
  if (o === "middle") {
    const s = (t.x + a.x) / 2;
    e.lineTo(s, t.y), e.lineTo(s, a.y);
  } else o === "after" != !!n ? e.lineTo(t.x, a.y) : e.lineTo(a.x, t.y);
  e.lineTo(a.x, a.y);
}
function oc(e, t, a, n) {
  if (!t)
    return e.lineTo(a.x, a.y);
  e.bezierCurveTo(n ? t.cp1x : t.cp2x, n ? t.cp1y : t.cp2y, n ? a.cp2x : a.cp1x, n ? a.cp2y : a.cp1y, a.x, a.y);
}
function sc(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), Pe(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function ic(e, t, a, n, o) {
  if (o.strikethrough || o.underline) {
    const s = e.measureText(n), i = t - s.actualBoundingBoxLeft, l = t + s.actualBoundingBoxRight, r = a - s.actualBoundingBoxAscent, c = a + s.actualBoundingBoxDescent, u = o.strikethrough ? (r + c) / 2 : c;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = o.decorationWidth || 2, e.moveTo(i, u), e.lineTo(l, u), e.stroke();
  }
}
function lc(e, t) {
  const a = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = a;
}
function Za(e, t, a, n, o, s = {}) {
  const i = Ge(t) ? t : [
    t
  ], l = s.strokeWidth > 0 && s.strokeColor !== "";
  let r, c;
  for (e.save(), e.font = o.string, sc(e, s), r = 0; r < i.length; ++r)
    c = i[r], s.backdrop && lc(e, s.backdrop), l && (s.strokeColor && (e.strokeStyle = s.strokeColor), Pe(s.strokeWidth) || (e.lineWidth = s.strokeWidth), e.strokeText(c, a, n, s.maxWidth)), e.fillText(c, a, n, s.maxWidth), ic(e, a, n, c, s), n += Number(o.lineHeight);
  e.restore();
}
function An(e, t) {
  const { x: a, y: n, w: o, h: s, radius: i } = t;
  e.arc(a + i.topLeft, n + i.topLeft, i.topLeft, 1.5 * Fe, Fe, !0), e.lineTo(a, n + s - i.bottomLeft), e.arc(a + i.bottomLeft, n + s - i.bottomLeft, i.bottomLeft, Fe, Ze, !0), e.lineTo(a + o - i.bottomRight, n + s), e.arc(a + o - i.bottomRight, n + s - i.bottomRight, i.bottomRight, Ze, 0, !0), e.lineTo(a + o, n + i.topRight), e.arc(a + o - i.topRight, n + i.topRight, i.topRight, 0, -Ze, !0), e.lineTo(a + i.topLeft, n);
}
const rc = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, cc = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function dc(e, t) {
  const a = ("" + e).match(rc);
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
const uc = (e) => +e || 0;
function $o(e, t) {
  const a = {}, n = Ie(t), o = n ? Object.keys(t) : t, s = Ie(e) ? n ? (i) => De(e[i], e[t[i]]) : (i) => e[i] : () => e;
  for (const i of o)
    a[i] = uc(s(i));
  return a;
}
function Ni(e) {
  return $o(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function wa(e) {
  return $o(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function Ct(e) {
  const t = Ni(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function lt(e, t) {
  e = e || {}, t = t || Ye.font;
  let a = De(e.size, t.size);
  typeof a == "string" && (a = parseInt(a, 10));
  let n = De(e.style, t.style);
  n && !("" + n).match(cc) && (console.warn('Invalid font style specified: "' + n + '"'), n = void 0);
  const o = {
    family: De(e.family, t.family),
    lineHeight: dc(De(e.lineHeight, t.lineHeight), a),
    size: a,
    style: n,
    weight: De(e.weight, t.weight),
    string: ""
  };
  return o.string = ac(o), o;
}
function dn(e, t, a, n) {
  let o, s, i;
  for (o = 0, s = e.length; o < s; ++o)
    if (i = e[o], i !== void 0 && i !== void 0)
      return i;
}
function hc(e, t, a) {
  const { min: n, max: o } = e, s = Ti(t, (o - n) / 2), i = (l, r) => a && l === 0 ? 0 : l + r;
  return {
    min: i(n, -Math.abs(s)),
    max: i(o, s)
  };
}
function ma(e, t) {
  return Object.assign(Object.create(e), t);
}
function So(e, t = [
  ""
], a, n, o = () => e[0]) {
  const s = a || e;
  typeof n > "u" && (n = Wi("_fallback", e));
  const i = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: s,
    _fallback: n,
    _getTarget: o,
    override: (l) => So([
      l,
      ...e
    ], t, s, n)
  };
  return new Proxy(i, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(l, r) {
      return delete l[r], delete l._keys, delete e[0][r], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(l, r) {
      return ji(l, r, () => xc(r, t, e, l));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(l, r) {
      return Reflect.getOwnPropertyDescriptor(l._scopes[0], r);
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
    has(l, r) {
      return is(l).includes(r);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(l) {
      return is(l);
    },
    /**
    * A trap for setting property values.
    */
    set(l, r, c) {
      const u = l._storage || (l._storage = o());
      return l[r] = u[r] = c, delete l._keys, !0;
    }
  });
}
function Sa(e, t, a, n) {
  const o = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: a,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: zi(e, n),
    setContext: (s) => Sa(e, s, a, n),
    override: (s) => Sa(e.override(s), t, a, n)
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
    get(s, i, l) {
      return ji(s, i, () => gc(s, i, l));
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
    set(s, i, l) {
      return e[i] = l, delete s[i], !0;
    }
  });
}
function zi(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: a = t.scriptable, _indexable: n = t.indexable, _allKeys: o = t.allKeys } = e;
  return {
    allKeys: o,
    scriptable: a,
    indexable: n,
    isScriptable: ta(a) ? a : () => a,
    isIndexable: ta(n) ? n : () => n
  };
}
const fc = (e, t) => e ? e + vo(t) : t, Mo = (e, t) => Ie(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function ji(e, t, a) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const n = a();
  return e[t] = n, n;
}
function gc(e, t, a) {
  const { _proxy: n, _context: o, _subProxy: s, _descriptors: i } = e;
  let l = n[t];
  return ta(l) && i.isScriptable(t) && (l = mc(t, l, e, a)), Ge(l) && l.length && (l = pc(t, l, e, i.isIndexable)), Mo(t, l) && (l = Sa(l, o, s && s[t], i)), l;
}
function mc(e, t, a, n) {
  const { _proxy: o, _context: s, _subProxy: i, _stack: l } = a;
  if (l.has(e))
    throw new Error("Recursion detected: " + Array.from(l).join("->") + "->" + e);
  l.add(e);
  let r = t(s, i || n);
  return l.delete(e), Mo(e, r) && (r = Do(o._scopes, o, e, r)), r;
}
function pc(e, t, a, n) {
  const { _proxy: o, _context: s, _subProxy: i, _descriptors: l } = a;
  if (typeof s.index < "u" && n(e))
    return t[s.index % t.length];
  if (Ie(t[0])) {
    const r = t, c = o._scopes.filter((u) => u !== r);
    t = [];
    for (const u of r) {
      const f = Do(c, o, e, u);
      t.push(Sa(f, s, i && i[e], l));
    }
  }
  return t;
}
function Hi(e, t, a) {
  return ta(e) ? e(t, a) : e;
}
const bc = (e, t) => e === !0 ? t : typeof e == "string" ? fa(t, e) : void 0;
function vc(e, t, a, n, o) {
  for (const s of t) {
    const i = bc(a, s);
    if (i) {
      e.add(i);
      const l = Hi(i._fallback, a, o);
      if (typeof l < "u" && l !== a && l !== n)
        return l;
    } else if (i === !1 && typeof n < "u" && a !== n)
      return null;
  }
  return !1;
}
function Do(e, t, a, n) {
  const o = t._rootScopes, s = Hi(t._fallback, a, n), i = [
    ...e,
    ...o
  ], l = /* @__PURE__ */ new Set();
  l.add(n);
  let r = ss(l, i, a, s || a, n);
  return r === null || typeof s < "u" && s !== a && (r = ss(l, i, s, r, n), r === null) ? !1 : So(Array.from(l), [
    ""
  ], o, s, () => yc(t, a, n));
}
function ss(e, t, a, n, o) {
  for (; a; )
    a = vc(e, t, a, n, o);
  return a;
}
function yc(e, t, a) {
  const n = e._getTarget();
  t in n || (n[t] = {});
  const o = n[t];
  return Ge(o) && Ie(a) ? a : o || {};
}
function xc(e, t, a, n) {
  let o;
  for (const s of t)
    if (o = Wi(fc(s, e), a), typeof o < "u")
      return Mo(e, o) ? Do(a, n, e, o) : o;
}
function Wi(e, t) {
  for (const a of t) {
    if (!a)
      continue;
    const n = a[e];
    if (typeof n < "u")
      return n;
  }
}
function is(e) {
  let t = e._keys;
  return t || (t = e._keys = kc(e._scopes)), t;
}
function kc(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of e)
    for (const n of Object.keys(a).filter((o) => !o.startsWith("_")))
      t.add(n);
  return Array.from(t);
}
const _c = Number.EPSILON || 1e-14, Ma = (e, t) => t < e.length && !e[t].skip && e[t], Ki = (e) => e === "x" ? "y" : "x";
function wc(e, t, a, n) {
  const o = e.skip ? t : e, s = t, i = a.skip ? t : a, l = oo(s, o), r = oo(i, s);
  let c = l / (l + r), u = r / (l + r);
  c = isNaN(c) ? 0 : c, u = isNaN(u) ? 0 : u;
  const f = n * c, g = n * u;
  return {
    previous: {
      x: s.x - f * (i.x - o.x),
      y: s.y - f * (i.y - o.y)
    },
    next: {
      x: s.x + g * (i.x - o.x),
      y: s.y + g * (i.y - o.y)
    }
  };
}
function Cc(e, t, a) {
  const n = e.length;
  let o, s, i, l, r, c = Ma(e, 0);
  for (let u = 0; u < n - 1; ++u)
    if (r = c, c = Ma(e, u + 1), !(!r || !c)) {
      if (ja(t[u], 0, _c)) {
        a[u] = a[u + 1] = 0;
        continue;
      }
      o = a[u] / t[u], s = a[u + 1] / t[u], l = Math.pow(o, 2) + Math.pow(s, 2), !(l <= 9) && (i = 3 / Math.sqrt(l), a[u] = o * i * t[u], a[u + 1] = s * i * t[u]);
    }
}
function $c(e, t, a = "x") {
  const n = Ki(a), o = e.length;
  let s, i, l, r = Ma(e, 0);
  for (let c = 0; c < o; ++c) {
    if (i = l, l = r, r = Ma(e, c + 1), !l)
      continue;
    const u = l[a], f = l[n];
    i && (s = (u - i[a]) / 3, l[`cp1${a}`] = u - s, l[`cp1${n}`] = f - s * t[c]), r && (s = (r[a] - u) / 3, l[`cp2${a}`] = u + s, l[`cp2${n}`] = f + s * t[c]);
  }
}
function Sc(e, t = "x") {
  const a = Ki(t), n = e.length, o = Array(n).fill(0), s = Array(n);
  let i, l, r, c = Ma(e, 0);
  for (i = 0; i < n; ++i)
    if (l = r, r = c, c = Ma(e, i + 1), !!r) {
      if (c) {
        const u = c[t] - r[t];
        o[i] = u !== 0 ? (c[a] - r[a]) / u : 0;
      }
      s[i] = l ? c ? Pt(o[i - 1]) !== Pt(o[i]) ? 0 : (o[i - 1] + o[i]) / 2 : o[i - 1] : o[i];
    }
  Cc(e, o, s), $c(e, s, t);
}
function un(e, t, a) {
  return Math.max(Math.min(e, a), t);
}
function Mc(e, t) {
  let a, n, o, s, i, l = Ga(e[0], t);
  for (a = 0, n = e.length; a < n; ++a)
    i = s, s = l, l = a < n - 1 && Ga(e[a + 1], t), s && (o = e[a], i && (o.cp1x = un(o.cp1x, t.left, t.right), o.cp1y = un(o.cp1y, t.top, t.bottom)), l && (o.cp2x = un(o.cp2x, t.left, t.right), o.cp2y = un(o.cp2y, t.top, t.bottom)));
}
function Dc(e, t, a, n, o) {
  let s, i, l, r;
  if (t.spanGaps && (e = e.filter((c) => !c.skip)), t.cubicInterpolationMode === "monotone")
    Sc(e, o);
  else {
    let c = n ? e[e.length - 1] : e[0];
    for (s = 0, i = e.length; s < i; ++s)
      l = e[s], r = wc(c, l, e[Math.min(s + 1, i - (n ? 0 : 1)) % i], t.tension), l.cp1x = r.previous.x, l.cp1y = r.previous.y, l.cp2x = r.next.x, l.cp2y = r.next.y, c = l;
  }
  t.capBezierPoints && Mc(e, a);
}
function Ao() {
  return typeof window < "u" && typeof document < "u";
}
function To(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function Tn(e, t, a) {
  let n;
  return typeof e == "string" ? (n = parseInt(e, 10), e.indexOf("%") !== -1 && (n = n / 100 * t.parentNode[a])) : n = e, n;
}
const Pn = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function Ac(e, t) {
  return Pn(e).getPropertyValue(t);
}
const Tc = [
  "top",
  "right",
  "bottom",
  "left"
];
function ha(e, t, a) {
  const n = {};
  a = a ? "-" + a : "";
  for (let o = 0; o < 4; o++) {
    const s = Tc[o];
    n[s] = parseFloat(e[t + "-" + s + a]) || 0;
  }
  return n.width = n.left + n.right, n.height = n.top + n.bottom, n;
}
const Bc = (e, t, a) => (e > 0 || t > 0) && (!a || !a.shadowRoot);
function Lc(e, t) {
  const a = e.touches, n = a && a.length ? a[0] : e, { offsetX: o, offsetY: s } = n;
  let i = !1, l, r;
  if (Bc(o, s, e.target))
    l = o, r = s;
  else {
    const c = t.getBoundingClientRect();
    l = n.clientX - c.left, r = n.clientY - c.top, i = !0;
  }
  return {
    x: l,
    y: r,
    box: i
  };
}
function ca(e, t) {
  if ("native" in e)
    return e;
  const { canvas: a, currentDevicePixelRatio: n } = t, o = Pn(a), s = o.boxSizing === "border-box", i = ha(o, "padding"), l = ha(o, "border", "width"), { x: r, y: c, box: u } = Lc(e, a), f = i.left + (u && l.left), g = i.top + (u && l.top);
  let { width: b, height: m } = t;
  return s && (b -= i.width + l.width, m -= i.height + l.height), {
    x: Math.round((r - f) / b * a.width / n),
    y: Math.round((c - g) / m * a.height / n)
  };
}
function Rc(e, t, a) {
  let n, o;
  if (t === void 0 || a === void 0) {
    const s = e && To(e);
    if (!s)
      t = e.clientWidth, a = e.clientHeight;
    else {
      const i = s.getBoundingClientRect(), l = Pn(s), r = ha(l, "border", "width"), c = ha(l, "padding");
      t = i.width - c.width - r.width, a = i.height - c.height - r.height, n = Tn(l.maxWidth, s, "clientWidth"), o = Tn(l.maxHeight, s, "clientHeight");
    }
  }
  return {
    width: t,
    height: a,
    maxWidth: n || Dn,
    maxHeight: o || Dn
  };
}
const Qt = (e) => Math.round(e * 10) / 10;
function Ic(e, t, a, n) {
  const o = Pn(e), s = ha(o, "margin"), i = Tn(o.maxWidth, e, "clientWidth") || Dn, l = Tn(o.maxHeight, e, "clientHeight") || Dn, r = Rc(e, t, a);
  let { width: c, height: u } = r;
  if (o.boxSizing === "content-box") {
    const g = ha(o, "border", "width"), b = ha(o, "padding");
    c -= b.width + g.width, u -= b.height + g.height;
  }
  return c = Math.max(0, c - s.width), u = Math.max(0, n ? c / n : u - s.height), c = Qt(Math.min(c, i, r.maxWidth)), u = Qt(Math.min(u, l, r.maxHeight)), c && !u && (u = Qt(c / 2)), (t !== void 0 || a !== void 0) && n && r.height && u > r.height && (u = r.height, c = Qt(Math.floor(u * n))), {
    width: c,
    height: u
  };
}
function ls(e, t, a) {
  const n = t || 1, o = Qt(e.height * n), s = Qt(e.width * n);
  e.height = Qt(e.height), e.width = Qt(e.width);
  const i = e.canvas;
  return i.style && (a || !i.style.height && !i.style.width) && (i.style.height = `${e.height}px`, i.style.width = `${e.width}px`), e.currentDevicePixelRatio !== n || i.height !== o || i.width !== s ? (e.currentDevicePixelRatio = n, i.height = o, i.width = s, e.ctx.setTransform(n, 0, 0, n, 0, 0), !0) : !1;
}
const Pc = (function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    Ao() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function rs(e, t) {
  const a = Ac(e, t), n = a && a.match(/^(\d+)(\.\d+)?px$/);
  return n ? +n[1] : void 0;
}
function da(e, t, a, n) {
  return {
    x: e.x + a * (t.x - e.x),
    y: e.y + a * (t.y - e.y)
  };
}
function Ec(e, t, a, n) {
  return {
    x: e.x + a * (t.x - e.x),
    y: n === "middle" ? a < 0.5 ? e.y : t.y : n === "after" ? a < 1 ? e.y : t.y : a > 0 ? t.y : e.y
  };
}
function Oc(e, t, a, n) {
  const o = {
    x: e.cp2x,
    y: e.cp2y
  }, s = {
    x: t.cp1x,
    y: t.cp1y
  }, i = da(e, o, a), l = da(o, s, a), r = da(s, t, a), c = da(i, l, a), u = da(l, r, a);
  return da(c, u, a);
}
const Fc = function(e, t) {
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
}, Vc = function() {
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
function Ca(e, t, a) {
  return e ? Fc(t, a) : Vc();
}
function Ui(e, t) {
  let a, n;
  (t === "ltr" || t === "rtl") && (a = e.canvas.style, n = [
    a.getPropertyValue("direction"),
    a.getPropertyPriority("direction")
  ], a.setProperty("direction", t, "important"), e.prevTextDirection = n);
}
function Yi(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function qi(e) {
  return e === "angle" ? {
    between: Xa,
    compare: Fr,
    normalize: St
  } : {
    between: Zt,
    compare: (t, a) => t - a,
    normalize: (t) => t
  };
}
function cs({ start: e, end: t, count: a, loop: n, style: o }) {
  return {
    start: e % a,
    end: t % a,
    loop: n && (t - e + 1) % a === 0,
    style: o
  };
}
function Nc(e, t, a) {
  const { property: n, start: o, end: s } = a, { between: i, normalize: l } = qi(n), r = t.length;
  let { start: c, end: u, loop: f } = e, g, b;
  if (f) {
    for (c += r, u += r, g = 0, b = r; g < b && i(l(t[c % r][n]), o, s); ++g)
      c--, u--;
    c %= r, u %= r;
  }
  return u < c && (u += r), {
    start: c,
    end: u,
    loop: f,
    style: e.style
  };
}
function zc(e, t, a) {
  if (!a)
    return [
      e
    ];
  const { property: n, start: o, end: s } = a, i = t.length, { compare: l, between: r, normalize: c } = qi(n), { start: u, end: f, loop: g, style: b } = Nc(e, t, a), m = [];
  let v = !1, p = null, y, k, _;
  const w = () => r(o, _, y) && l(o, _) !== 0, C = () => l(s, y) === 0 || r(s, _, y), M = () => v || w(), S = () => !v || C();
  for (let I = u, V = u; I <= f; ++I)
    k = t[I % i], !k.skip && (y = c(k[n]), y !== _ && (v = r(y, o, s), p === null && M() && (p = l(y, o) === 0 ? I : V), p !== null && S() && (m.push(cs({
      start: p,
      end: I,
      loop: g,
      count: i,
      style: b
    })), p = null), V = I, _ = y));
  return p !== null && m.push(cs({
    start: p,
    end: f,
    loop: g,
    count: i,
    style: b
  })), m;
}
function jc(e, t) {
  const a = [], n = e.segments;
  for (let o = 0; o < n.length; o++) {
    const s = zc(n[o], e.points, t);
    s.length && a.push(...s);
  }
  return a;
}
function Hc(e, t, a, n) {
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
function Wc(e, t, a, n) {
  const o = e.length, s = [];
  let i = t, l = e[t], r;
  for (r = t + 1; r <= a; ++r) {
    const c = e[r % o];
    c.skip || c.stop ? l.skip || (n = !1, s.push({
      start: t % o,
      end: (r - 1) % o,
      loop: n
    }), t = i = c.stop ? r : null) : (i = r, l.skip && (t = r)), l = c;
  }
  return i !== null && s.push({
    start: t % o,
    end: i % o,
    loop: n
  }), s;
}
function Kc(e, t) {
  const a = e.points, n = e.options.spanGaps, o = a.length;
  if (!o)
    return [];
  const s = !!e._loop, { start: i, end: l } = Hc(a, o, s, n);
  if (n === !0)
    return ds(e, [
      {
        start: i,
        end: l,
        loop: s
      }
    ], a, t);
  const r = l < i ? l + o : l, c = !!e._fullLoop && i === 0 && l === o - 1;
  return ds(e, Wc(a, i, r, c), a, t);
}
function ds(e, t, a, n) {
  return !n || !n.setContext || !a ? t : Uc(e, t, a, n);
}
function Uc(e, t, a, n) {
  const o = e._chart.getContext(), s = us(e.options), { _datasetIndex: i, options: { spanGaps: l } } = e, r = a.length, c = [];
  let u = s, f = t[0].start, g = f;
  function b(m, v, p, y) {
    const k = l ? -1 : 1;
    if (m !== v) {
      for (m += r; a[m % r].skip; )
        m -= k;
      for (; a[v % r].skip; )
        v += k;
      m % r !== v % r && (c.push({
        start: m % r,
        end: v % r,
        loop: p,
        style: y
      }), u = y, f = v % r);
    }
  }
  for (const m of t) {
    f = l ? f : m.start;
    let v = a[f % r], p;
    for (g = f + 1; g <= m.end; g++) {
      const y = a[g % r];
      p = us(n.setContext(ma(o, {
        type: "segment",
        p0: v,
        p1: y,
        p0DataIndex: (g - 1) % r,
        p1DataIndex: g % r,
        datasetIndex: i
      }))), Yc(p, u) && b(f, g - 1, m.loop, u), v = y, u = p;
    }
    f < g - 1 && b(f, g - 1, m.loop, u);
  }
  return c;
}
function us(e) {
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
function Yc(e, t) {
  if (!t)
    return !1;
  const a = [], n = function(o, s) {
    return ko(s) ? (a.includes(s) || a.push(s), a.indexOf(s)) : s;
  };
  return JSON.stringify(e, n) !== JSON.stringify(t, n);
}
function hn(e, t, a) {
  return e.options.clip ? e[a] : t[a];
}
function qc(e, t) {
  const { xScale: a, yScale: n } = e;
  return a && n ? {
    left: hn(a, t, "left"),
    right: hn(a, t, "right"),
    top: hn(n, t, "top"),
    bottom: hn(n, t, "bottom")
  } : t;
}
function Xc(e, t) {
  const a = t._clip;
  if (a.disabled)
    return !1;
  const n = qc(t, e.chartArea);
  return {
    left: a.left === !1 ? 0 : n.left - (a.left === !0 ? 0 : a.left),
    right: a.right === !1 ? e.width : n.right + (a.right === !0 ? 0 : a.right),
    top: a.top === !1 ? 0 : n.top - (a.top === !0 ? 0 : a.top),
    bottom: a.bottom === !1 ? e.height : n.bottom + (a.bottom === !0 ? 0 : a.bottom)
  };
}
class Gc {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(t, a, n, o) {
    const s = a.listeners[o], i = a.duration;
    s.forEach((l) => l({
      chart: t,
      initial: a.initial,
      numSteps: i,
      currentStep: Math.min(n - a.start, i)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = Ei.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let a = 0;
    this._charts.forEach((n, o) => {
      if (!n.running || !n.items.length)
        return;
      const s = n.items;
      let i = s.length - 1, l = !1, r;
      for (; i >= 0; --i)
        r = s[i], r._active ? (r._total > n.duration && (n.duration = r._total), r.tick(t), l = !0) : (s[i] = s[s.length - 1], s.pop());
      l && (o.draw(), this._notify(o, n, t, "progress")), s.length || (n.running = !1, this._notify(o, n, t, "complete"), n.initial = !1), a += s.length;
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
var Ft = /* @__PURE__ */ new Gc();
const hs = "transparent", Zc = {
  boolean(e, t, a) {
    return a > 0.5 ? t : e;
  },
  color(e, t, a) {
    const n = ts(e || hs), o = n.valid && ts(t || hs);
    return o && o.valid ? o.mix(n, a).hexString() : t;
  },
  number(e, t, a) {
    return e + (t - e) * a;
  }
};
class Qc {
  constructor(t, a, n, o) {
    const s = a[n];
    o = dn([
      t.to,
      o,
      s,
      t.from
    ]);
    const i = dn([
      t.from,
      s,
      o
    ]);
    this._active = !0, this._fn = t.fn || Zc[t.type || typeof i], this._easing = Ha[t.easing] || Ha.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = a, this._prop = n, this._from = i, this._to = o, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, a, n) {
    if (this._active) {
      this._notify(!1);
      const o = this._target[this._prop], s = n - this._start, i = this._duration - s;
      this._start = n, this._duration = Math.floor(Math.max(i, t.duration)), this._total += s, this._loop = !!t.loop, this._to = dn([
        t.to,
        a,
        o,
        t.from
      ]), this._from = dn([
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
    const a = t - this._start, n = this._duration, o = this._prop, s = this._from, i = this._loop, l = this._to;
    let r;
    if (this._active = s !== l && (i || a < n), !this._active) {
      this._target[o] = l, this._notify(!0);
      return;
    }
    if (a < 0) {
      this._target[o] = s;
      return;
    }
    r = a / n % 2, r = i && r > 1 ? 2 - r : r, r = this._easing(Math.min(1, Math.max(0, r))), this._target[o] = this._fn(s, l, r);
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
class Xi {
  constructor(t, a) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(a);
  }
  configure(t) {
    if (!Ie(t))
      return;
    const a = Object.keys(Ye.animation), n = this._properties;
    Object.getOwnPropertyNames(t).forEach((o) => {
      const s = t[o];
      if (!Ie(s))
        return;
      const i = {};
      for (const l of a)
        i[l] = s[l];
      (Ge(s.properties) && s.properties || [
        o
      ]).forEach((l) => {
        (l === o || !n.has(l)) && n.set(l, i);
      });
    });
  }
  _animateOptions(t, a) {
    const n = a.options, o = ed(t, n);
    if (!o)
      return [];
    const s = this._createAnimations(o, n);
    return n.$shared && Jc(t.options.$animations, n).then(() => {
      t.options = n;
    }, () => {
    }), s;
  }
  _createAnimations(t, a) {
    const n = this._properties, o = [], s = t.$animations || (t.$animations = {}), i = Object.keys(a), l = Date.now();
    let r;
    for (r = i.length - 1; r >= 0; --r) {
      const c = i[r];
      if (c.charAt(0) === "$")
        continue;
      if (c === "options") {
        o.push(...this._animateOptions(t, a));
        continue;
      }
      const u = a[c];
      let f = s[c];
      const g = n.get(c);
      if (f)
        if (g && f.active()) {
          f.update(g, u, l);
          continue;
        } else
          f.cancel();
      if (!g || !g.duration) {
        t[c] = u;
        continue;
      }
      s[c] = f = new Qc(g, t, c, u), o.push(f);
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
      return Ft.add(this._chart, n), !0;
  }
}
function Jc(e, t) {
  const a = [], n = Object.keys(t);
  for (let o = 0; o < n.length; o++) {
    const s = e[n[o]];
    s && s.active() && a.push(s.wait());
  }
  return Promise.all(a);
}
function ed(e, t) {
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
function fs(e, t) {
  const a = e && e.options || {}, n = a.reverse, o = a.min === void 0 ? t : 0, s = a.max === void 0 ? t : 0;
  return {
    start: n ? s : o,
    end: n ? o : s
  };
}
function td(e, t, a) {
  if (a === !1)
    return !1;
  const n = fs(e, a), o = fs(t, a);
  return {
    top: o.end,
    right: n.end,
    bottom: o.start,
    left: n.start
  };
}
function ad(e) {
  let t, a, n, o;
  return Ie(e) ? (t = e.top, a = e.right, n = e.bottom, o = e.left) : t = a = n = o = e, {
    top: t,
    right: a,
    bottom: n,
    left: o,
    disabled: e === !1
  };
}
function Gi(e, t) {
  const a = [], n = e._getSortedDatasetMetas(t);
  let o, s;
  for (o = 0, s = n.length; o < s; ++o)
    a.push(n[o].index);
  return a;
}
function gs(e, t, a, n = {}) {
  const o = e.keys, s = n.mode === "single";
  let i, l, r, c;
  if (t === null)
    return;
  let u = !1;
  for (i = 0, l = o.length; i < l; ++i) {
    if (r = +o[i], r === a) {
      if (u = !0, n.all)
        continue;
      break;
    }
    c = e.values[r], wt(c) && (s || t === 0 || Pt(t) === Pt(c)) && (t += c);
  }
  return !u && !n.all ? 0 : t;
}
function nd(e, t) {
  const { iScale: a, vScale: n } = t, o = a.axis === "x" ? "x" : "y", s = n.axis === "x" ? "x" : "y", i = Object.keys(e), l = new Array(i.length);
  let r, c, u;
  for (r = 0, c = i.length; r < c; ++r)
    u = i[r], l[r] = {
      [o]: u,
      [s]: e[u]
    };
  return l;
}
function Wn(e, t) {
  const a = e && e.options.stacked;
  return a || a === void 0 && t.stack !== void 0;
}
function od(e, t, a) {
  return `${e.id}.${t.id}.${a.stack || a.type}`;
}
function sd(e) {
  const { min: t, max: a, minDefined: n, maxDefined: o } = e.getUserBounds();
  return {
    min: n ? t : Number.NEGATIVE_INFINITY,
    max: o ? a : Number.POSITIVE_INFINITY
  };
}
function id(e, t, a) {
  const n = e[t] || (e[t] = {});
  return n[a] || (n[a] = {});
}
function ms(e, t, a, n) {
  for (const o of t.getMatchingVisibleMetas(n).reverse()) {
    const s = e[o.index];
    if (a && s > 0 || !a && s < 0)
      return o.index;
  }
  return null;
}
function ps(e, t) {
  const { chart: a, _cachedMeta: n } = e, o = a._stacks || (a._stacks = {}), { iScale: s, vScale: i, index: l } = n, r = s.axis, c = i.axis, u = od(s, i, n), f = t.length;
  let g;
  for (let b = 0; b < f; ++b) {
    const m = t[b], { [r]: v, [c]: p } = m, y = m._stacks || (m._stacks = {});
    g = y[c] = id(o, u, v), g[l] = p, g._top = ms(g, i, !0, n.type), g._bottom = ms(g, i, !1, n.type);
    const k = g._visualValues || (g._visualValues = {});
    k[l] = p;
  }
}
function Kn(e, t) {
  const a = e.scales;
  return Object.keys(a).filter((n) => a[n].axis === t).shift();
}
function ld(e, t) {
  return ma(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function rd(e, t, a) {
  return ma(e, {
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
function Ta(e, t) {
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
const Un = (e) => e === "reset" || e === "none", bs = (e, t) => t ? e : Object.assign({}, e), cd = (e, t, a) => e && !t.hidden && t._stacked && {
  keys: Gi(a, !0),
  values: null
};
class En {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(t, a) {
    this.chart = t, this._ctx = t.ctx, this.index = a, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = Wn(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && Ta(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, a = this._cachedMeta, n = this.getDataset(), o = (f, g, b, m) => f === "x" ? g : f === "r" ? m : b, s = a.xAxisID = De(n.xAxisID, Kn(t, "x")), i = a.yAxisID = De(n.yAxisID, Kn(t, "y")), l = a.rAxisID = De(n.rAxisID, Kn(t, "r")), r = a.indexAxis, c = a.iAxisID = o(r, s, i, l), u = a.vAxisID = o(r, i, s, l);
    a.xScale = this.getScaleForId(s), a.yScale = this.getScaleForId(i), a.rScale = this.getScaleForId(l), a.iScale = this.getScaleForId(c), a.vScale = this.getScaleForId(u);
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
    this._data && Qo(this._data, this), t._stacked && Ta(t);
  }
  _dataCheck() {
    const t = this.getDataset(), a = t.data || (t.data = []), n = this._data;
    if (Ie(a)) {
      const o = this._cachedMeta;
      this._data = nd(a, o);
    } else if (n !== a) {
      if (n) {
        Qo(n, this);
        const o = this._cachedMeta;
        Ta(o), o._parsed = [];
      }
      a && Object.isExtensible(a) && jr(a, this), this._syncList = [], this._data = a;
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
    a._stacked = Wn(a.vScale, a), a.stack !== n.stack && (o = !0, Ta(a), a.stack = n.stack), this._resyncElements(t), (o || s !== a._stacked) && (ps(this, a._parsed), a._stacked = Wn(a.vScale, a));
  }
  configure() {
    const t = this.chart.config, a = t.datasetScopeKeys(this._type), n = t.getOptionScopes(this.getDataset(), a, !0);
    this.options = t.createResolver(n, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, a) {
    const { _cachedMeta: n, _data: o } = this, { iScale: s, _stacked: i } = n, l = s.axis;
    let r = t === 0 && a === o.length ? !0 : n._sorted, c = t > 0 && n._parsed[t - 1], u, f, g;
    if (this._parsing === !1)
      n._parsed = o, n._sorted = !0, g = o;
    else {
      Ge(o[t]) ? g = this.parseArrayData(n, o, t, a) : Ie(o[t]) ? g = this.parseObjectData(n, o, t, a) : g = this.parsePrimitiveData(n, o, t, a);
      const b = () => f[l] === null || c && f[l] < c[l];
      for (u = 0; u < a; ++u)
        n._parsed[u + t] = f = g[u], r && (b() && (r = !1), c = f);
      n._sorted = r;
    }
    i && ps(this, g);
  }
  parsePrimitiveData(t, a, n, o) {
    const { iScale: s, vScale: i } = t, l = s.axis, r = i.axis, c = s.getLabels(), u = s === i, f = new Array(o);
    let g, b, m;
    for (g = 0, b = o; g < b; ++g)
      m = g + n, f[g] = {
        [l]: u || s.parse(c[m], m),
        [r]: i.parse(a[m], m)
      };
    return f;
  }
  parseArrayData(t, a, n, o) {
    const { xScale: s, yScale: i } = t, l = new Array(o);
    let r, c, u, f;
    for (r = 0, c = o; r < c; ++r)
      u = r + n, f = a[u], l[r] = {
        x: s.parse(f[0], u),
        y: i.parse(f[1], u)
      };
    return l;
  }
  parseObjectData(t, a, n, o) {
    const { xScale: s, yScale: i } = t, { xAxisKey: l = "x", yAxisKey: r = "y" } = this._parsing, c = new Array(o);
    let u, f, g, b;
    for (u = 0, f = o; u < f; ++u)
      g = u + n, b = a[g], c[u] = {
        x: s.parse(fa(b, l), g),
        y: i.parse(fa(b, r), g)
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
    const o = this.chart, s = this._cachedMeta, i = a[t.axis], l = {
      keys: Gi(o, !0),
      values: a._stacks[t.axis]._visualValues
    };
    return gs(l, i, s.index, {
      mode: n
    });
  }
  updateRangeFromParsed(t, a, n, o) {
    const s = n[a.axis];
    let i = s === null ? NaN : s;
    const l = o && n._stacks[a.axis];
    o && l && (o.values = l, i = gs(o, s, this._cachedMeta.index)), t.min = Math.min(t.min, i), t.max = Math.max(t.max, i);
  }
  getMinMax(t, a) {
    const n = this._cachedMeta, o = n._parsed, s = n._sorted && t === n.iScale, i = o.length, l = this._getOtherScale(t), r = cd(a, n, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: u, max: f } = sd(l);
    let g, b;
    function m() {
      b = o[g];
      const v = b[l.axis];
      return !wt(b[t.axis]) || u > v || f < v;
    }
    for (g = 0; g < i && !(!m() && (this.updateRangeFromParsed(c, t, b, r), s)); ++g)
      ;
    if (s) {
      for (g = i - 1; g >= 0; --g)
        if (!m()) {
          this.updateRangeFromParsed(c, t, b, r);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(t) {
    const a = this._cachedMeta._parsed, n = [];
    let o, s, i;
    for (o = 0, s = a.length; o < s; ++o)
      i = a[o][t.axis], wt(i) && n.push(i);
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
    this.update(t || "default"), a._clip = ad(De(this.options.clip, td(a.xScale, a.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, a = this.chart, n = this._cachedMeta, o = n.data || [], s = a.chartArea, i = [], l = this._drawStart || 0, r = this._drawCount || o.length - l, c = this.options.drawActiveElementsOnTop;
    let u;
    for (n.dataset && n.dataset.draw(t, s, l, r), u = l; u < l + r; ++u) {
      const f = o[u];
      f.hidden || (f.active && c ? i.push(f) : f.draw(t, s));
    }
    for (u = 0; u < i.length; ++u)
      i[u].draw(t, s);
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
      s = i.$context || (i.$context = rd(this.getContext(), t, i)), s.parsed = this.getParsed(t), s.raw = o.data[t], s.index = s.dataIndex = t;
    } else
      s = this.$context || (this.$context = ld(this.chart.getContext(), this.index)), s.dataset = o, s.index = s.datasetIndex = this.index;
    return s.active = !!a, s.mode = n, s;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, a) {
    return this._resolveElementOptions(this.dataElementType.id, a, t);
  }
  _resolveElementOptions(t, a = "default", n) {
    const o = a === "active", s = this._cachedDataOpts, i = t + "-" + a, l = s[i], r = this.enableOptionSharing && Ya(n);
    if (l)
      return bs(l, r);
    const c = this.chart.config, u = c.datasetElementScopeKeys(this._type, t), f = o ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], g = c.getOptionScopes(this.getDataset(), u), b = Object.keys(Ye.elements[t]), m = () => this.getContext(n, o, a), v = c.resolveNamedOptions(g, b, m, f);
    return v.$shared && (v.$shared = r, s[i] = Object.freeze(bs(v, r))), v;
  }
  _resolveAnimations(t, a, n) {
    const o = this.chart, s = this._cachedDataOpts, i = `animation-${a}`, l = s[i];
    if (l)
      return l;
    let r;
    if (o.options.animation !== !1) {
      const u = this.chart.config, f = u.datasetAnimationScopeKeys(this._type, a), g = u.getOptionScopes(this.getDataset(), f);
      r = u.createResolver(g, this.getContext(t, n, a));
    }
    const c = new Xi(o, r && r.animations);
    return r && r._cacheable && (s[i] = Object.freeze(c)), c;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, a) {
    return !a || Un(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, a) {
    const n = this.resolveDataElementOptions(t, a), o = this._sharedOptions, s = this.getSharedOptions(n), i = this.includeOptions(a, s) || s !== o;
    return this.updateSharedOptions(s, a, n), {
      sharedOptions: s,
      includeOptions: i
    };
  }
  updateElement(t, a, n, o) {
    Un(o) ? Object.assign(t, n) : this._resolveAnimations(a, o).update(t, n);
  }
  updateSharedOptions(t, a, n) {
    t && !Un(a) && this._resolveAnimations(void 0, a).update(t, n);
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
    for (const [l, r, c] of this._syncList)
      this[l](r, c);
    this._syncList = [];
    const o = n.length, s = a.length, i = Math.min(s, o);
    i && this.parse(0, i), s > o ? this._insertElements(o, s - o, t) : s < o && this._removeElements(s, o - s);
  }
  _insertElements(t, a, n = !0) {
    const o = this._cachedMeta, s = o.data, i = t + a;
    let l;
    const r = (c) => {
      for (c.length += a, l = c.length - 1; l >= i; l--)
        c[l] = c[l - a];
    };
    for (r(s), l = t; l < i; ++l)
      s[l] = new this.dataElementType();
    this._parsing && r(o._parsed), this.parse(t, a), n && this.updateElements(s, t, a, "reset");
  }
  updateElements(t, a, n, o) {
  }
  _removeElements(t, a) {
    const n = this._cachedMeta;
    if (this._parsing) {
      const o = n._parsed.splice(t, a);
      n._stacked && Ta(n, o);
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
function dd(e, t) {
  if (!e._cache.$bar) {
    const a = e.getMatchingVisibleMetas(t);
    let n = [];
    for (let o = 0, s = a.length; o < s; o++)
      n = n.concat(a[o].controller.getAllParsedValues(e));
    e._cache.$bar = Pi(n.sort((o, s) => o - s));
  }
  return e._cache.$bar;
}
function ud(e) {
  const t = e.iScale, a = dd(t, e.type);
  let n = t._length, o, s, i, l;
  const r = () => {
    i === 32767 || i === -32768 || (Ya(l) && (n = Math.min(n, Math.abs(i - l) || n)), l = i);
  };
  for (o = 0, s = a.length; o < s; ++o)
    i = t.getPixelForValue(a[o]), r();
  for (l = void 0, o = 0, s = t.ticks.length; o < s; ++o)
    i = t.getPixelForTick(o), r();
  return n;
}
function hd(e, t, a, n) {
  const o = a.barThickness;
  let s, i;
  return Pe(o) ? (s = t.min * a.categoryPercentage, i = a.barPercentage) : (s = o * n, i = 1), {
    chunk: s / n,
    ratio: i,
    start: t.pixels[e] - s / 2
  };
}
function fd(e, t, a, n) {
  const o = t.pixels, s = o[e];
  let i = e > 0 ? o[e - 1] : null, l = e < o.length - 1 ? o[e + 1] : null;
  const r = a.categoryPercentage;
  i === null && (i = s - (l === null ? t.end - t.start : l - s)), l === null && (l = s + s - i);
  const c = s - (s - Math.min(i, l)) / 2 * r;
  return {
    chunk: Math.abs(l - i) / 2 * r / n,
    ratio: a.barPercentage,
    start: c
  };
}
function gd(e, t, a, n) {
  const o = a.parse(e[0], n), s = a.parse(e[1], n), i = Math.min(o, s), l = Math.max(o, s);
  let r = i, c = l;
  Math.abs(i) > Math.abs(l) && (r = l, c = i), t[a.axis] = c, t._custom = {
    barStart: r,
    barEnd: c,
    start: o,
    end: s,
    min: i,
    max: l
  };
}
function Zi(e, t, a, n) {
  return Ge(e) ? gd(e, t, a, n) : t[a.axis] = a.parse(e, n), t;
}
function vs(e, t, a, n) {
  const o = e.iScale, s = e.vScale, i = o.getLabels(), l = o === s, r = [];
  let c, u, f, g;
  for (c = a, u = a + n; c < u; ++c)
    g = t[c], f = {}, f[o.axis] = l || o.parse(i[c], c), r.push(Zi(g, f, s, c));
  return r;
}
function Yn(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function md(e, t, a) {
  return e !== 0 ? Pt(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= a ? 1 : -1);
}
function pd(e) {
  let t, a, n, o, s;
  return e.horizontal ? (t = e.base > e.x, a = "left", n = "right") : (t = e.base < e.y, a = "bottom", n = "top"), t ? (o = "end", s = "start") : (o = "start", s = "end"), {
    start: a,
    end: n,
    reverse: t,
    top: o,
    bottom: s
  };
}
function bd(e, t, a, n) {
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
  const { start: i, end: l, reverse: r, top: c, bottom: u } = pd(e);
  o === "middle" && a && (e.enableBorderRadius = !0, (a._top || 0) === n ? o = c : (a._bottom || 0) === n ? o = u : (s[ys(u, i, l, r)] = !0, o = c)), s[ys(o, i, l, r)] = !0, e.borderSkipped = s;
}
function ys(e, t, a, n) {
  return n ? (e = vd(e, t, a), e = xs(e, a, t)) : e = xs(e, t, a), e;
}
function vd(e, t, a) {
  return e === t ? a : e === a ? t : e;
}
function xs(e, t, a) {
  return e === "start" ? t : e === "end" ? a : e;
}
function yd(e, { inflateAmount: t }, a) {
  e.inflateAmount = t === "auto" ? a === 1 ? 0.33 : 0 : t;
}
class xd extends En {
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
    return vs(t, a, n, o);
  }
  parseArrayData(t, a, n, o) {
    return vs(t, a, n, o);
  }
  parseObjectData(t, a, n, o) {
    const { iScale: s, vScale: i } = t, { xAxisKey: l = "x", yAxisKey: r = "y" } = this._parsing, c = s.axis === "x" ? l : r, u = i.axis === "x" ? l : r, f = [];
    let g, b, m, v;
    for (g = n, b = n + o; g < b; ++g)
      v = a[g], m = {}, m[s.axis] = s.parse(fa(v, c), g), f.push(Zi(fa(v, u), m, i, g));
    return f;
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
    const a = this._cachedMeta, { iScale: n, vScale: o } = a, s = this.getParsed(t), i = s._custom, l = Yn(i) ? "[" + i.start + ", " + i.end + "]" : "" + o.getLabelForValue(s[o.axis]);
    return {
      label: "" + n.getLabelForValue(s[n.axis]),
      value: l
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
    const s = o === "reset", { index: i, _cachedMeta: { vScale: l } } = this, r = l.getBasePixel(), c = l.isHorizontal(), u = this._getRuler(), { sharedOptions: f, includeOptions: g } = this._getSharedOptions(a, o);
    for (let b = a; b < a + n; b++) {
      const m = this.getParsed(b), v = s || Pe(m[l.axis]) ? {
        base: r,
        head: r
      } : this._calculateBarValuePixels(b), p = this._calculateBarIndexPixels(b, u), y = (m._stacks || {})[l.axis], k = {
        horizontal: c,
        base: v.base,
        enableBorderRadius: !y || Yn(m._custom) || i === y._top || i === y._bottom,
        x: c ? v.head : p.center,
        y: c ? p.center : v.head,
        height: c ? p.size : Math.abs(v.size),
        width: c ? Math.abs(v.size) : p.size
      };
      g && (k.options = f || this.resolveDataElementOptions(b, t[b].active ? "active" : o));
      const _ = k.options || t[b].options;
      bd(k, _, y, i), yd(k, _, u.ratio), this.updateElement(t[b], b, k, o);
    }
  }
  _getStacks(t, a) {
    const { iScale: n } = this._cachedMeta, o = n.getMatchingVisibleMetas(this._type).filter((u) => u.controller.options.grouped), s = n.options.stacked, i = [], l = this._cachedMeta.controller.getParsed(a), r = l && l[n.axis], c = (u) => {
      const f = u._parsed.find((b) => b[n.axis] === r), g = f && f[u.vScale.axis];
      if (Pe(g) || isNaN(g))
        return !0;
    };
    for (const u of o)
      if (!(a !== void 0 && c(u)) && ((s === !1 || i.indexOf(u.stack) === -1 || s === void 0 && u.stack === void 0) && i.push(u.stack), u.index === t))
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
    const l = t.barThickness;
    return {
      min: l || ud(a),
      pixels: o,
      start: n._startPixel,
      end: n._endPixel,
      stackCount: this._getStackCount(),
      scale: n,
      grouped: t.grouped,
      ratio: l ? 1 : t.categoryPercentage * t.barPercentage
    };
  }
  _calculateBarValuePixels(t) {
    const { _cachedMeta: { vScale: a, _stacked: n, index: o }, options: { base: s, minBarLength: i } } = this, l = s || 0, r = this.getParsed(t), c = r._custom, u = Yn(c);
    let f = r[a.axis], g = 0, b = n ? this.applyStack(a, r, n) : f, m, v;
    b !== f && (g = b - f, b = f), u && (f = c.barStart, b = c.barEnd - c.barStart, f !== 0 && Pt(f) !== Pt(c.barEnd) && (g = 0), g += f);
    const p = !Pe(s) && !u ? s : g;
    let y = a.getPixelForValue(p);
    if (this.chart.getDataVisibility(t) ? m = a.getPixelForValue(g + b) : m = y, v = m - y, Math.abs(v) < i) {
      v = md(v, a, l) * i, f === l && (y -= v / 2);
      const k = a.getPixelForDecimal(0), _ = a.getPixelForDecimal(1), w = Math.min(k, _), C = Math.max(k, _);
      y = Math.max(Math.min(y, C), w), m = y + v, n && !u && (r._stacks[a.axis]._visualValues[o] = a.getValueForPixel(m) - a.getValueForPixel(y));
    }
    if (y === a.getPixelForValue(l)) {
      const k = Pt(v) * a.getLineWidthForValue(l) / 2;
      y += k, v -= k;
    }
    return {
      size: v,
      base: y,
      head: m,
      center: m + v / 2
    };
  }
  _calculateBarIndexPixels(t, a) {
    const n = a.scale, o = this.options, s = o.skipNull, i = De(o.maxBarThickness, 1 / 0);
    let l, r;
    const c = this._getAxisCount();
    if (a.grouped) {
      const u = s ? this._getStackCount(t) : a.stackCount, f = o.barThickness === "flex" ? fd(t, a, o, u * c) : hd(t, a, o, u * c), g = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, b = this._getAxis().indexOf(De(g, this.getFirstScaleIdForIndexAxis())), m = this._getStackIndex(this.index, this._cachedMeta.stack, s ? t : void 0) + b;
      l = f.start + f.chunk * m + f.chunk / 2, r = Math.min(i, f.chunk * f.ratio);
    } else
      l = n.getPixelForValue(this.getParsed(t)[n.axis], t), r = Math.min(i, a.min * a.ratio);
    return {
      base: l - r / 2,
      head: l + r / 2,
      center: l,
      size: r
    };
  }
  draw() {
    const t = this._cachedMeta, a = t.vScale, n = t.data, o = n.length;
    let s = 0;
    for (; s < o; ++s)
      this.getParsed(s)[a.axis] !== null && !n[s].hidden && n[s].draw(this._ctx);
  }
}
function kd(e, t, a) {
  let n = 1, o = 1, s = 0, i = 0;
  if (t < Ue) {
    const l = e, r = l + t, c = Math.cos(l), u = Math.sin(l), f = Math.cos(r), g = Math.sin(r), b = (_, w, C) => Xa(_, l, r, !0) ? 1 : Math.max(w, w * a, C, C * a), m = (_, w, C) => Xa(_, l, r, !0) ? -1 : Math.min(w, w * a, C, C * a), v = b(0, c, f), p = b(Ze, u, g), y = m(Fe, c, f), k = m(Fe + Ze, u, g);
    n = (v - y) / 2, o = (p - k) / 2, s = -(v + y) / 2, i = -(p + k) / 2;
  }
  return {
    ratioX: n,
    ratioY: o,
    offsetX: s,
    offsetY: i
  };
}
class _d extends En {
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
            const a = t.data, { labels: { pointStyle: n, textAlign: o, color: s, useBorderRadius: i, borderRadius: l } } = t.legend.options;
            return a.labels.length && a.datasets.length ? a.labels.map((r, c) => {
              const f = t.getDatasetMeta(0).controller.getStyle(c);
              return {
                text: r,
                fillStyle: f.backgroundColor,
                fontColor: s,
                hidden: !t.getDataVisibility(c),
                lineDash: f.borderDash,
                lineDashOffset: f.borderDashOffset,
                lineJoin: f.borderJoinStyle,
                lineWidth: f.borderWidth,
                strokeStyle: f.borderColor,
                textAlign: o,
                pointStyle: n,
                borderRadius: i && (l || f.borderRadius),
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
      let s = (r) => +n[r];
      if (Ie(n[t])) {
        const { key: r = "value" } = this._parsing;
        s = (c) => +fa(n[c], r);
      }
      let i, l;
      for (i = t, l = t + a; i < l; ++i)
        o._parsed[i] = s(i);
    }
  }
  _getRotation() {
    return zt(this.options.rotation - 90);
  }
  _getCircumference() {
    return zt(this.options.circumference);
  }
  _getRotationExtents() {
    let t = Ue, a = -Ue;
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
    const a = this.chart, { chartArea: n } = a, o = this._cachedMeta, s = o.data, i = this.getMaxBorderWidth() + this.getMaxOffset(s) + this.options.spacing, l = Math.max((Math.min(n.width, n.height) - i) / 2, 0), r = Math.min($r(this.options.cutout, l), 1), c = this._getRingWeight(this.index), { circumference: u, rotation: f } = this._getRotationExtents(), { ratioX: g, ratioY: b, offsetX: m, offsetY: v } = kd(f, u, r), p = (n.width - i) / g, y = (n.height - i) / b, k = Math.max(Math.min(p, y) / 2, 0), _ = Ti(this.options.radius, k), w = Math.max(_ * r, 0), C = (_ - w) / this._getVisibleDatasetWeightTotal();
    this.offsetX = m * _, this.offsetY = v * _, o.total = this.calculateTotal(), this.outerRadius = _ - C * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - C * c, 0), this.updateElements(s, 0, s.length, t);
  }
  _circumference(t, a) {
    const n = this.options, o = this._cachedMeta, s = this._getCircumference();
    return a && n.animation.animateRotate || !this.chart.getDataVisibility(t) || o._parsed[t] === null || o.data[t].hidden ? 0 : this.calculateCircumference(o._parsed[t] * s / Ue);
  }
  updateElements(t, a, n, o) {
    const s = o === "reset", i = this.chart, l = i.chartArea, c = i.options.animation, u = (l.left + l.right) / 2, f = (l.top + l.bottom) / 2, g = s && c.animateScale, b = g ? 0 : this.innerRadius, m = g ? 0 : this.outerRadius, { sharedOptions: v, includeOptions: p } = this._getSharedOptions(a, o);
    let y = this._getRotation(), k;
    for (k = 0; k < a; ++k)
      y += this._circumference(k, s);
    for (k = a; k < a + n; ++k) {
      const _ = this._circumference(k, s), w = t[k], C = {
        x: u + this.offsetX,
        y: f + this.offsetY,
        startAngle: y,
        endAngle: y + _,
        circumference: _,
        outerRadius: m,
        innerRadius: b
      };
      p && (C.options = v || this.resolveDataElementOptions(k, w.active ? "active" : o)), y += _, this.updateElement(w, k, C, o);
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
    return a > 0 && !isNaN(t) ? Ue * (Math.abs(t) / a) : 0;
  }
  getLabelAndValue(t) {
    const a = this._cachedMeta, n = this.chart, o = n.data.labels || [], s = _o(a._parsed[t], n.options.locale);
    return {
      label: o[t] || "",
      value: s
    };
  }
  getMaxBorderWidth(t) {
    let a = 0;
    const n = this.chart;
    let o, s, i, l, r;
    if (!t) {
      for (o = 0, s = n.data.datasets.length; o < s; ++o)
        if (n.isDatasetVisible(o)) {
          i = n.getDatasetMeta(o), t = i.data, l = i.controller;
          break;
        }
    }
    if (!t)
      return 0;
    for (o = 0, s = t.length; o < s; ++o)
      r = l.resolveDataElementOptions(o), r.borderAlign !== "inner" && (a = Math.max(a, r.borderWidth || 0, r.hoverBorderWidth || 0));
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
class wd extends En {
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
    let { start: l, count: r } = Kr(a, o, i);
    this._drawStart = l, this._drawCount = r, Ur(a) && (l = 0, r = o.length), n._chart = this.chart, n._datasetIndex = this.index, n._decimated = !!s._decimated, n.points = o;
    const c = this.resolveDatasetElementOptions(t);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(n, void 0, {
      animated: !i,
      options: c
    }, t), this.updateElements(o, l, r, t);
  }
  updateElements(t, a, n, o) {
    const s = o === "reset", { iScale: i, vScale: l, _stacked: r, _dataset: c } = this._cachedMeta, { sharedOptions: u, includeOptions: f } = this._getSharedOptions(a, o), g = i.axis, b = l.axis, { spanGaps: m, segment: v } = this.options, p = qa(m) ? m : Number.POSITIVE_INFINITY, y = this.chart._animationsDisabled || s || o === "none", k = a + n, _ = t.length;
    let w = a > 0 && this.getParsed(a - 1);
    for (let C = 0; C < _; ++C) {
      const M = t[C], S = y ? M : {};
      if (C < a || C >= k) {
        S.skip = !0;
        continue;
      }
      const I = this.getParsed(C), V = Pe(I[b]), H = S[g] = i.getPixelForValue(I[g], C), D = S[b] = s || V ? l.getBasePixel() : l.getPixelForValue(r ? this.applyStack(l, I, r) : I[b], C);
      S.skip = isNaN(H) || isNaN(D) || V, S.stop = C > 0 && Math.abs(I[g] - w[g]) > p, v && (S.parsed = I, S.raw = c.data[C]), f && (S.options = u || this.resolveDataElementOptions(C, M.active ? "active" : o)), y || this.updateElement(M, C, S, o), w = I;
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
class Cd extends _d {
  static id = "pie";
  static defaults = {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: "100%"
  };
}
function la() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class Bo {
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
    Object.assign(Bo.prototype, t);
  }
  options;
  constructor(t) {
    this.options = t || {};
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return la();
  }
  parse() {
    return la();
  }
  format() {
    return la();
  }
  add() {
    return la();
  }
  diff() {
    return la();
  }
  startOf() {
    return la();
  }
  endOf() {
    return la();
  }
}
var $d = {
  _date: Bo
};
function Sd(e, t, a, n) {
  const { controller: o, data: s, _sorted: i } = e, l = o._cachedMeta.iScale, r = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (l && t === l.axis && t !== "r" && i && s.length) {
    const c = l._reversePixels ? Nr : ua;
    if (n) {
      if (o._sharedOptions) {
        const u = s[0], f = typeof u.getRange == "function" && u.getRange(t);
        if (f) {
          const g = c(s, t, a - f), b = c(s, t, a + f);
          return {
            lo: g.lo,
            hi: b.hi
          };
        }
      }
    } else {
      const u = c(s, t, a);
      if (r) {
        const { vScale: f } = o._cachedMeta, { _parsed: g } = e, b = g.slice(0, u.lo + 1).reverse().findIndex((v) => !Pe(v[f.axis]));
        u.lo -= Math.max(0, b);
        const m = g.slice(u.hi).findIndex((v) => !Pe(v[f.axis]));
        u.hi += Math.max(0, m);
      }
      return u;
    }
  }
  return {
    lo: 0,
    hi: s.length - 1
  };
}
function On(e, t, a, n, o) {
  const s = e.getSortedVisibleDatasetMetas(), i = a[t];
  for (let l = 0, r = s.length; l < r; ++l) {
    const { index: c, data: u } = s[l], { lo: f, hi: g } = Sd(s[l], t, i, o);
    for (let b = f; b <= g; ++b) {
      const m = u[b];
      m.skip || n(m, c, b);
    }
  }
}
function Md(e) {
  const t = e.indexOf("x") !== -1, a = e.indexOf("y") !== -1;
  return function(n, o) {
    const s = t ? Math.abs(n.x - o.x) : 0, i = a ? Math.abs(n.y - o.y) : 0;
    return Math.sqrt(Math.pow(s, 2) + Math.pow(i, 2));
  };
}
function qn(e, t, a, n, o) {
  const s = [];
  return !o && !e.isPointInArea(t) || On(e, a, t, function(l, r, c) {
    !o && !Ga(l, e.chartArea, 0) || l.inRange(t.x, t.y, n) && s.push({
      element: l,
      datasetIndex: r,
      index: c
    });
  }, !0), s;
}
function Dd(e, t, a, n) {
  let o = [];
  function s(i, l, r) {
    const { startAngle: c, endAngle: u } = i.getProps([
      "startAngle",
      "endAngle"
    ], n), { angle: f } = Ri(i, {
      x: t.x,
      y: t.y
    });
    Xa(f, c, u) && o.push({
      element: i,
      datasetIndex: l,
      index: r
    });
  }
  return On(e, a, t, s), o;
}
function Ad(e, t, a, n, o, s) {
  let i = [];
  const l = Md(a);
  let r = Number.POSITIVE_INFINITY;
  function c(u, f, g) {
    const b = u.inRange(t.x, t.y, o);
    if (n && !b)
      return;
    const m = u.getCenterPoint(o);
    if (!(!!s || e.isPointInArea(m)) && !b)
      return;
    const p = l(t, m);
    p < r ? (i = [
      {
        element: u,
        datasetIndex: f,
        index: g
      }
    ], r = p) : p === r && i.push({
      element: u,
      datasetIndex: f,
      index: g
    });
  }
  return On(e, a, t, c), i;
}
function Xn(e, t, a, n, o, s) {
  return !s && !e.isPointInArea(t) ? [] : a === "r" && !n ? Dd(e, t, a, o) : Ad(e, t, a, n, o, s);
}
function ks(e, t, a, n, o) {
  const s = [], i = a === "x" ? "inXRange" : "inYRange";
  let l = !1;
  return On(e, a, t, (r, c, u) => {
    r[i] && r[i](t[a], o) && (s.push({
      element: r,
      datasetIndex: c,
      index: u
    }), l = l || r.inRange(t.x, t.y, o));
  }), n && !l ? [] : s;
}
var Td = {
  modes: {
    index(e, t, a, n) {
      const o = ca(t, e), s = a.axis || "x", i = a.includeInvisible || !1, l = a.intersect ? qn(e, o, s, n, i) : Xn(e, o, s, !1, n, i), r = [];
      return l.length ? (e.getSortedVisibleDatasetMetas().forEach((c) => {
        const u = l[0].index, f = c.data[u];
        f && !f.skip && r.push({
          element: f,
          datasetIndex: c.index,
          index: u
        });
      }), r) : [];
    },
    dataset(e, t, a, n) {
      const o = ca(t, e), s = a.axis || "xy", i = a.includeInvisible || !1;
      let l = a.intersect ? qn(e, o, s, n, i) : Xn(e, o, s, !1, n, i);
      if (l.length > 0) {
        const r = l[0].datasetIndex, c = e.getDatasetMeta(r).data;
        l = [];
        for (let u = 0; u < c.length; ++u)
          l.push({
            element: c[u],
            datasetIndex: r,
            index: u
          });
      }
      return l;
    },
    point(e, t, a, n) {
      const o = ca(t, e), s = a.axis || "xy", i = a.includeInvisible || !1;
      return qn(e, o, s, n, i);
    },
    nearest(e, t, a, n) {
      const o = ca(t, e), s = a.axis || "xy", i = a.includeInvisible || !1;
      return Xn(e, o, s, a.intersect, n, i);
    },
    x(e, t, a, n) {
      const o = ca(t, e);
      return ks(e, o, "x", a.intersect, n);
    },
    y(e, t, a, n) {
      const o = ca(t, e);
      return ks(e, o, "y", a.intersect, n);
    }
  }
};
const Qi = [
  "left",
  "top",
  "right",
  "bottom"
];
function Ba(e, t) {
  return e.filter((a) => a.pos === t);
}
function _s(e, t) {
  return e.filter((a) => Qi.indexOf(a.pos) === -1 && a.box.axis === t);
}
function La(e, t) {
  return e.sort((a, n) => {
    const o = t ? n : a, s = t ? a : n;
    return o.weight === s.weight ? o.index - s.index : o.weight - s.weight;
  });
}
function Bd(e) {
  const t = [];
  let a, n, o, s, i, l;
  for (a = 0, n = (e || []).length; a < n; ++a)
    o = e[a], { position: s, options: { stack: i, stackWeight: l = 1 } } = o, t.push({
      index: a,
      box: o,
      pos: s,
      horizontal: o.isHorizontal(),
      weight: o.weight,
      stack: i && s + i,
      stackWeight: l
    });
  return t;
}
function Ld(e) {
  const t = {};
  for (const a of e) {
    const { stack: n, pos: o, stackWeight: s } = a;
    if (!n || !Qi.includes(o))
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
function Rd(e, t) {
  const a = Ld(e), { vBoxMaxWidth: n, hBoxMaxHeight: o } = t;
  let s, i, l;
  for (s = 0, i = e.length; s < i; ++s) {
    l = e[s];
    const { fullSize: r } = l.box, c = a[l.stack], u = c && l.stackWeight / c.weight;
    l.horizontal ? (l.width = u ? u * n : r && t.availableWidth, l.height = o) : (l.width = n, l.height = u ? u * o : r && t.availableHeight);
  }
  return a;
}
function Id(e) {
  const t = Bd(e), a = La(t.filter((c) => c.box.fullSize), !0), n = La(Ba(t, "left"), !0), o = La(Ba(t, "right")), s = La(Ba(t, "top"), !0), i = La(Ba(t, "bottom")), l = _s(t, "x"), r = _s(t, "y");
  return {
    fullSize: a,
    leftAndTop: n.concat(s),
    rightAndBottom: o.concat(r).concat(i).concat(l),
    chartArea: Ba(t, "chartArea"),
    vertical: n.concat(o).concat(r),
    horizontal: s.concat(i).concat(l)
  };
}
function ws(e, t, a, n) {
  return Math.max(e[a], t[a]) + Math.max(e[n], t[n]);
}
function Ji(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function Pd(e, t, a, n) {
  const { pos: o, box: s } = a, i = e.maxPadding;
  if (!Ie(o)) {
    a.size && (e[o] -= a.size);
    const f = n[a.stack] || {
      size: 0,
      count: 1
    };
    f.size = Math.max(f.size, a.horizontal ? s.height : s.width), a.size = f.size / f.count, e[o] += a.size;
  }
  s.getPadding && Ji(i, s.getPadding());
  const l = Math.max(0, t.outerWidth - ws(i, e, "left", "right")), r = Math.max(0, t.outerHeight - ws(i, e, "top", "bottom")), c = l !== e.w, u = r !== e.h;
  return e.w = l, e.h = r, a.horizontal ? {
    same: c,
    other: u
  } : {
    same: u,
    other: c
  };
}
function Ed(e) {
  const t = e.maxPadding;
  function a(n) {
    const o = Math.max(t[n] - e[n], 0);
    return e[n] += o, o;
  }
  e.y += a("top"), e.x += a("left"), a("right"), a("bottom");
}
function Od(e, t) {
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
function Va(e, t, a, n) {
  const o = [];
  let s, i, l, r, c, u;
  for (s = 0, i = e.length, c = 0; s < i; ++s) {
    l = e[s], r = l.box, r.update(l.width || t.w, l.height || t.h, Od(l.horizontal, t));
    const { same: f, other: g } = Pd(t, a, l, n);
    c |= f && o.length, u = u || g, r.fullSize || o.push(l);
  }
  return c && Va(o, t, a, n) || u;
}
function fn(e, t, a, n, o) {
  e.top = a, e.left = t, e.right = t + n, e.bottom = a + o, e.width = n, e.height = o;
}
function Cs(e, t, a, n) {
  const o = a.padding;
  let { x: s, y: i } = t;
  for (const l of e) {
    const r = l.box, c = n[l.stack] || {
      placed: 0,
      weight: 1
    }, u = l.stackWeight / c.weight || 1;
    if (l.horizontal) {
      const f = t.w * u, g = c.size || r.height;
      Ya(c.start) && (i = c.start), r.fullSize ? fn(r, o.left, i, a.outerWidth - o.right - o.left, g) : fn(r, t.left + c.placed, i, f, g), c.start = i, c.placed += f, i = r.bottom;
    } else {
      const f = t.h * u, g = c.size || r.width;
      Ya(c.start) && (s = c.start), r.fullSize ? fn(r, s, o.top, g, a.outerHeight - o.bottom - o.top) : fn(r, s, t.top + c.placed, g, f), c.start = s, c.placed += f, s = r.right;
    }
  }
  t.x = s, t.y = i;
}
var xt = {
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
    const o = Ct(e.options.layout.padding), s = Math.max(t - o.width, 0), i = Math.max(a - o.height, 0), l = Id(e.boxes), r = l.vertical, c = l.horizontal;
    Ee(e.boxes, (v) => {
      typeof v.beforeLayout == "function" && v.beforeLayout();
    });
    const u = r.reduce((v, p) => p.box.options && p.box.options.display === !1 ? v : v + 1, 0) || 1, f = Object.freeze({
      outerWidth: t,
      outerHeight: a,
      padding: o,
      availableWidth: s,
      availableHeight: i,
      vBoxMaxWidth: s / 2 / u,
      hBoxMaxHeight: i / 2
    }), g = Object.assign({}, o);
    Ji(g, Ct(n));
    const b = Object.assign({
      maxPadding: g,
      w: s,
      h: i,
      x: o.left,
      y: o.top
    }, o), m = Rd(r.concat(c), f);
    Va(l.fullSize, b, f, m), Va(r, b, f, m), Va(c, b, f, m) && Va(r, b, f, m), Ed(b), Cs(l.leftAndTop, b, f, m), b.x += b.w, b.y += b.h, Cs(l.rightAndBottom, b, f, m), e.chartArea = {
      left: b.left,
      top: b.top,
      right: b.left + b.w,
      bottom: b.top + b.h,
      height: b.h,
      width: b.w
    }, Ee(l.chartArea, (v) => {
      const p = v.box;
      Object.assign(p, e.chartArea), p.update(b.w, b.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class el {
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
class Fd extends el {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const wn = "$chartjs", Vd = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, $s = (e) => e === null || e === "";
function Nd(e, t) {
  const a = e.style, n = e.getAttribute("height"), o = e.getAttribute("width");
  if (e[wn] = {
    initial: {
      height: n,
      width: o,
      style: {
        display: a.display,
        height: a.height,
        width: a.width
      }
    }
  }, a.display = a.display || "block", a.boxSizing = a.boxSizing || "border-box", $s(o)) {
    const s = rs(e, "width");
    s !== void 0 && (e.width = s);
  }
  if ($s(n))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const s = rs(e, "height");
      s !== void 0 && (e.height = s);
    }
  return e;
}
const tl = Pc ? {
  passive: !0
} : !1;
function zd(e, t, a) {
  e && e.addEventListener(t, a, tl);
}
function jd(e, t, a) {
  e && e.canvas && e.canvas.removeEventListener(t, a, tl);
}
function Hd(e, t) {
  const a = Vd[e.type] || e.type, { x: n, y: o } = ca(e, t);
  return {
    type: a,
    chart: t,
    native: e,
    x: n !== void 0 ? n : null,
    y: o !== void 0 ? o : null
  };
}
function Bn(e, t) {
  for (const a of e)
    if (a === t || a.contains(t))
      return !0;
}
function Wd(e, t, a) {
  const n = e.canvas, o = new MutationObserver((s) => {
    let i = !1;
    for (const l of s)
      i = i || Bn(l.addedNodes, n), i = i && !Bn(l.removedNodes, n);
    i && a();
  });
  return o.observe(document, {
    childList: !0,
    subtree: !0
  }), o;
}
function Kd(e, t, a) {
  const n = e.canvas, o = new MutationObserver((s) => {
    let i = !1;
    for (const l of s)
      i = i || Bn(l.removedNodes, n), i = i && !Bn(l.addedNodes, n);
    i && a();
  });
  return o.observe(document, {
    childList: !0,
    subtree: !0
  }), o;
}
const Qa = /* @__PURE__ */ new Map();
let Ss = 0;
function al() {
  const e = window.devicePixelRatio;
  e !== Ss && (Ss = e, Qa.forEach((t, a) => {
    a.currentDevicePixelRatio !== e && t();
  }));
}
function Ud(e, t) {
  Qa.size || window.addEventListener("resize", al), Qa.set(e, t);
}
function Yd(e) {
  Qa.delete(e), Qa.size || window.removeEventListener("resize", al);
}
function qd(e, t, a) {
  const n = e.canvas, o = n && To(n);
  if (!o)
    return;
  const s = Oi((l, r) => {
    const c = o.clientWidth;
    a(l, r), c < o.clientWidth && a();
  }, window), i = new ResizeObserver((l) => {
    const r = l[0], c = r.contentRect.width, u = r.contentRect.height;
    c === 0 && u === 0 || s(c, u);
  });
  return i.observe(o), Ud(e, s), i;
}
function Gn(e, t, a) {
  a && a.disconnect(), t === "resize" && Yd(e);
}
function Xd(e, t, a) {
  const n = e.canvas, o = Oi((s) => {
    e.ctx !== null && a(Hd(s, e));
  }, e);
  return zd(n, t, o), o;
}
class Gd extends el {
  acquireContext(t, a) {
    const n = t && t.getContext && t.getContext("2d");
    return n && n.canvas === t ? (Nd(t, a), n) : null;
  }
  releaseContext(t) {
    const a = t.canvas;
    if (!a[wn])
      return !1;
    const n = a[wn].initial;
    [
      "height",
      "width"
    ].forEach((s) => {
      const i = n[s];
      Pe(i) ? a.removeAttribute(s) : a.setAttribute(s, i);
    });
    const o = n.style || {};
    return Object.keys(o).forEach((s) => {
      a.style[s] = o[s];
    }), a.width = a.width, delete a[wn], !0;
  }
  addEventListener(t, a, n) {
    this.removeEventListener(t, a);
    const o = t.$proxies || (t.$proxies = {}), i = {
      attach: Wd,
      detach: Kd,
      resize: qd
    }[a] || Xd;
    o[a] = i(t, a, n);
  }
  removeEventListener(t, a) {
    const n = t.$proxies || (t.$proxies = {}), o = n[a];
    if (!o)
      return;
    ({
      attach: Gn,
      detach: Gn,
      resize: Gn
    }[a] || jd)(t, a, o), n[a] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, a, n, o) {
    return Ic(t, a, n, o);
  }
  isAttached(t) {
    const a = t && To(t);
    return !!(a && a.isConnected);
  }
}
function Zd(e) {
  return !Ao() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? Fd : Gd;
}
let Ut = class {
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
    return qa(this.x) && qa(this.y);
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
function Qd(e, t) {
  const a = e.options.ticks, n = Jd(e), o = Math.min(a.maxTicksLimit || n, n), s = a.major.enabled ? tu(t) : [], i = s.length, l = s[0], r = s[i - 1], c = [];
  if (i > o)
    return au(t, c, s, i / o), c;
  const u = eu(s, t, o);
  if (i > 0) {
    let f, g;
    const b = i > 1 ? Math.round((r - l) / (i - 1)) : null;
    for (gn(t, c, u, Pe(b) ? 0 : l - b, l), f = 0, g = i - 1; f < g; f++)
      gn(t, c, u, s[f], s[f + 1]);
    return gn(t, c, u, r, Pe(b) ? t.length : r + b), c;
  }
  return gn(t, c, u), c;
}
function Jd(e) {
  const t = e.options.offset, a = e._tickSize(), n = e._length / a + (t ? 0 : 1), o = e._maxLength / a;
  return Math.floor(Math.min(n, o));
}
function eu(e, t, a) {
  const n = nu(e), o = t.length / a;
  if (!n)
    return Math.max(o, 1);
  const s = Rr(n);
  for (let i = 0, l = s.length - 1; i < l; i++) {
    const r = s[i];
    if (r > o)
      return r;
  }
  return Math.max(o, 1);
}
function tu(e) {
  const t = [];
  let a, n;
  for (a = 0, n = e.length; a < n; a++)
    e[a].major && t.push(a);
  return t;
}
function au(e, t, a, n) {
  let o = 0, s = a[0], i;
  for (n = Math.ceil(n), i = 0; i < e.length; i++)
    i === s && (t.push(e[i]), o++, s = a[o * n]);
}
function gn(e, t, a, n, o) {
  const s = De(n, 0), i = Math.min(De(o, e.length), e.length);
  let l = 0, r, c, u;
  for (a = Math.ceil(a), o && (r = o - n, a = r / Math.floor(r / a)), u = s; u < 0; )
    l++, u = Math.round(s + l * a);
  for (c = Math.max(s, 0); c < i; c++)
    c === u && (t.push(e[c]), l++, u = Math.round(s + l * a));
}
function nu(e) {
  const t = e.length;
  let a, n;
  if (t < 2)
    return !1;
  for (n = e[0], a = 1; a < t; ++a)
    if (e[a] - e[a - 1] !== n)
      return !1;
  return n;
}
const ou = (e) => e === "left" ? "right" : e === "right" ? "left" : e, Ms = (e, t, a) => t === "top" || t === "left" ? e[t] + a : e[t] - a, Ds = (e, t) => Math.min(t || e, e);
function As(e, t) {
  const a = [], n = e.length / t, o = e.length;
  let s = 0;
  for (; s < o; s += n)
    a.push(e[Math.floor(s)]);
  return a;
}
function su(e, t, a) {
  const n = e.ticks.length, o = Math.min(t, n - 1), s = e._startPixel, i = e._endPixel, l = 1e-6;
  let r = e.getPixelForTick(o), c;
  if (!(a && (n === 1 ? c = Math.max(r - s, i - r) : t === 0 ? c = (e.getPixelForTick(1) - r) / 2 : c = (r - e.getPixelForTick(o - 1)) / 2, r += o < t ? c : -c, r < s - l || r > i + l)))
    return r;
}
function iu(e, t) {
  Ee(e, (a) => {
    const n = a.gc, o = n.length / 2;
    let s;
    if (o > t) {
      for (s = 0; s < o; ++s)
        delete a.data[n[s]];
      n.splice(0, o);
    }
  });
}
function Ra(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function Ts(e, t) {
  if (!e.display)
    return 0;
  const a = lt(e.font, t), n = Ct(e.padding);
  return (Ge(e.text) ? e.text.length : 1) * a.lineHeight + n.height;
}
function lu(e, t) {
  return ma(e, {
    scale: t,
    type: "scale"
  });
}
function ru(e, t, a) {
  return ma(e, {
    tick: a,
    index: t,
    type: "tick"
  });
}
function cu(e, t, a) {
  let n = xo(e);
  return (a && t !== "right" || !a && t === "right") && (n = ou(n)), n;
}
function du(e, t, a, n) {
  const { top: o, left: s, bottom: i, right: l, chart: r } = e, { chartArea: c, scales: u } = r;
  let f = 0, g, b, m;
  const v = i - o, p = l - s;
  if (e.isHorizontal()) {
    if (b = nt(n, s, l), Ie(a)) {
      const y = Object.keys(a)[0], k = a[y];
      m = u[y].getPixelForValue(k) + v - t;
    } else a === "center" ? m = (c.bottom + c.top) / 2 + v - t : m = Ms(e, a, t);
    g = l - s;
  } else {
    if (Ie(a)) {
      const y = Object.keys(a)[0], k = a[y];
      b = u[y].getPixelForValue(k) - p + t;
    } else a === "center" ? b = (c.left + c.right) / 2 - p + t : b = Ms(e, a, t);
    m = nt(n, i, o), f = a === "left" ? -Ze : Ze;
  }
  return {
    titleX: b,
    titleY: m,
    maxWidth: g,
    rotation: f
  };
}
class Aa extends Ut {
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
    return t = Bt(t, Number.POSITIVE_INFINITY), a = Bt(a, Number.NEGATIVE_INFINITY), n = Bt(n, Number.POSITIVE_INFINITY), o = Bt(o, Number.NEGATIVE_INFINITY), {
      min: Bt(t, n),
      max: Bt(a, o),
      minDefined: wt(t),
      maxDefined: wt(a)
    };
  }
  getMinMax(t) {
    let { min: a, max: n, minDefined: o, maxDefined: s } = this.getUserBounds(), i;
    if (o && s)
      return {
        min: a,
        max: n
      };
    const l = this.getMatchingVisibleMetas();
    for (let r = 0, c = l.length; r < c; ++r)
      i = l[r].controller.getMinMax(this, t), o || (a = Math.min(a, i.min)), s || (n = Math.max(n, i.max));
    return a = s && a > n ? n : a, n = o && a > n ? a : n, {
      min: Bt(a, Bt(n, a)),
      max: Bt(n, Bt(a, n))
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
    je(this.options.beforeUpdate, [
      this
    ]);
  }
  update(t, a, n) {
    const { beginAtZero: o, grace: s, ticks: i } = this.options, l = i.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = a, this._margins = n = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, n), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + n.left + n.right : this.height + n.top + n.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = hc(this, s, o), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const r = l < this.ticks.length;
    this._convertTicksToLabels(r ? As(this.ticks, l) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), i.display && (i.autoSkip || i.source === "auto") && (this.ticks = Qd(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), r && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, a, n;
    this.isHorizontal() ? (a = this.left, n = this.right) : (a = this.top, n = this.bottom, t = !t), this._startPixel = a, this._endPixel = n, this._reversePixels = t, this._length = n - a, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    je(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    je(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    je(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), je(this.options[t], [
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
    je(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const a = this.options.ticks;
    let n, o, s;
    for (n = 0, o = t.length; n < o; n++)
      s = t[n], s.label = je(a.callback, [
        s.value,
        n,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    je(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    je(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, a = t.ticks, n = Ds(this.ticks.length, t.ticks.maxTicksLimit), o = a.minRotation || 0, s = a.maxRotation;
    let i = o, l, r, c;
    if (!this._isVisible() || !a.display || o >= s || n <= 1 || !this.isHorizontal()) {
      this.labelRotation = o;
      return;
    }
    const u = this._getLabelSizes(), f = u.widest.width, g = u.highest.height, b = it(this.chart.width - f, 0, this.maxWidth);
    l = t.offset ? this.maxWidth / n : b / (n - 1), f + 6 > l && (l = b / (n - (t.offset ? 0.5 : 1)), r = this.maxHeight - Ra(t.grid) - a.padding - Ts(t.title, this.chart.options.font), c = Math.sqrt(f * f + g * g), i = Or(Math.min(Math.asin(it((u.highest.height + 6) / l, -1, 1)), Math.asin(it(r / c, -1, 1)) - Math.asin(it(g / c, -1, 1)))), i = Math.max(o, Math.min(s, i))), this.labelRotation = i;
  }
  afterCalculateLabelRotation() {
    je(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    je(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: a, options: { ticks: n, title: o, grid: s } } = this, i = this._isVisible(), l = this.isHorizontal();
    if (i) {
      const r = Ts(o, a.options.font);
      if (l ? (t.width = this.maxWidth, t.height = Ra(s) + r) : (t.height = this.maxHeight, t.width = Ra(s) + r), n.display && this.ticks.length) {
        const { first: c, last: u, widest: f, highest: g } = this._getLabelSizes(), b = n.padding * 2, m = zt(this.labelRotation), v = Math.cos(m), p = Math.sin(m);
        if (l) {
          const y = n.mirror ? 0 : p * f.width + v * g.height;
          t.height = Math.min(this.maxHeight, t.height + y + b);
        } else {
          const y = n.mirror ? 0 : v * f.width + p * g.height;
          t.width = Math.min(this.maxWidth, t.width + y + b);
        }
        this._calculatePadding(c, u, p, v);
      }
    }
    this._handleMargins(), l ? (this.width = this._length = a.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = a.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, a, n, o) {
    const { ticks: { align: s, padding: i }, position: l } = this.options, r = this.labelRotation !== 0, c = l !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const u = this.getPixelForTick(0) - this.left, f = this.right - this.getPixelForTick(this.ticks.length - 1);
      let g = 0, b = 0;
      r ? c ? (g = o * t.width, b = n * a.height) : (g = n * t.height, b = o * a.width) : s === "start" ? b = a.width : s === "end" ? g = t.width : s !== "inner" && (g = t.width / 2, b = a.width / 2), this.paddingLeft = Math.max((g - u + i) * this.width / (this.width - u), 0), this.paddingRight = Math.max((b - f + i) * this.width / (this.width - f), 0);
    } else {
      let u = a.height / 2, f = t.height / 2;
      s === "start" ? (u = 0, f = t.height) : s === "end" && (u = a.height, f = 0), this.paddingTop = u + i, this.paddingBottom = f + i;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    je(this.options.afterFit, [
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
      Pe(t[a].label) && (t.splice(a, 1), n--, a--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const a = this.options.ticks.sampleSize;
      let n = this.ticks;
      a < n.length && (n = As(n, a)), this._labelSizes = t = this._computeLabelSizes(n, n.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, a, n) {
    const { ctx: o, _longestTextCache: s } = this, i = [], l = [], r = Math.floor(a / Ds(a, n));
    let c = 0, u = 0, f, g, b, m, v, p, y, k, _, w, C;
    for (f = 0; f < a; f += r) {
      if (m = t[f].label, v = this._resolveTickFontOptions(f), o.font = p = v.string, y = s[p] = s[p] || {
        data: {},
        gc: []
      }, k = v.lineHeight, _ = w = 0, !Pe(m) && !Ge(m))
        _ = ns(o, y.data, y.gc, _, m), w = k;
      else if (Ge(m))
        for (g = 0, b = m.length; g < b; ++g)
          C = m[g], !Pe(C) && !Ge(C) && (_ = ns(o, y.data, y.gc, _, C), w += k);
      i.push(_), l.push(w), c = Math.max(_, c), u = Math.max(w, u);
    }
    iu(s, a);
    const M = i.indexOf(c), S = l.indexOf(u), I = (V) => ({
      width: i[V] || 0,
      height: l[V] || 0
    });
    return {
      first: I(0),
      last: I(a - 1),
      widest: I(M),
      highest: I(S),
      widths: i,
      heights: l
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
    return Vr(this._alignToPixels ? ia(this.chart, a, 0) : a);
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
      return n.$context || (n.$context = ru(this.getContext(), t, n));
    }
    return this.$context || (this.$context = lu(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, a = zt(this.labelRotation), n = Math.abs(Math.cos(a)), o = Math.abs(Math.sin(a)), s = this._getLabelSizes(), i = t.autoSkipPadding || 0, l = s ? s.widest.width + i : 0, r = s ? s.highest.height + i : 0;
    return this.isHorizontal() ? r * n > l * o ? l / n : r / o : r * o < l * n ? r / n : l / o;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const a = this.axis, n = this.chart, o = this.options, { grid: s, position: i, border: l } = o, r = s.offset, c = this.isHorizontal(), f = this.ticks.length + (r ? 1 : 0), g = Ra(s), b = [], m = l.setContext(this.getContext()), v = m.display ? m.width : 0, p = v / 2, y = function(J) {
      return ia(n, J, v);
    };
    let k, _, w, C, M, S, I, V, H, D, T, B;
    if (i === "top")
      k = y(this.bottom), S = this.bottom - g, V = k - p, D = y(t.top) + p, B = t.bottom;
    else if (i === "bottom")
      k = y(this.top), D = t.top, B = y(t.bottom) - p, S = k + p, V = this.top + g;
    else if (i === "left")
      k = y(this.right), M = this.right - g, I = k - p, H = y(t.left) + p, T = t.right;
    else if (i === "right")
      k = y(this.left), H = t.left, T = y(t.right) - p, M = k + p, I = this.left + g;
    else if (a === "x") {
      if (i === "center")
        k = y((t.top + t.bottom) / 2 + 0.5);
      else if (Ie(i)) {
        const J = Object.keys(i)[0], re = i[J];
        k = y(this.chart.scales[J].getPixelForValue(re));
      }
      D = t.top, B = t.bottom, S = k + p, V = S + g;
    } else if (a === "y") {
      if (i === "center")
        k = y((t.left + t.right) / 2);
      else if (Ie(i)) {
        const J = Object.keys(i)[0], re = i[J];
        k = y(this.chart.scales[J].getPixelForValue(re));
      }
      M = k - p, I = M - g, H = t.left, T = t.right;
    }
    const j = De(o.ticks.maxTicksLimit, f), W = Math.max(1, Math.ceil(f / j));
    for (_ = 0; _ < f; _ += W) {
      const J = this.getContext(_), re = s.setContext(J), ue = l.setContext(J), q = re.lineWidth, oe = re.color, R = ue.dash || [], K = ue.dashOffset, Y = re.tickWidth, N = re.tickColor, ie = re.tickBorderDash || [], ce = re.tickBorderDashOffset;
      w = su(this, _, r), w !== void 0 && (C = ia(n, w, q), c ? M = I = H = T = C : S = V = D = B = C, b.push({
        tx1: M,
        ty1: S,
        tx2: I,
        ty2: V,
        x1: H,
        y1: D,
        x2: T,
        y2: B,
        width: q,
        color: oe,
        borderDash: R,
        borderDashOffset: K,
        tickWidth: Y,
        tickColor: N,
        tickBorderDash: ie,
        tickBorderDashOffset: ce
      }));
    }
    return this._ticksLength = f, this._borderValue = k, b;
  }
  _computeLabelItems(t) {
    const a = this.axis, n = this.options, { position: o, ticks: s } = n, i = this.isHorizontal(), l = this.ticks, { align: r, crossAlign: c, padding: u, mirror: f } = s, g = Ra(n.grid), b = g + u, m = f ? -u : b, v = -zt(this.labelRotation), p = [];
    let y, k, _, w, C, M, S, I, V, H, D, T, B = "middle";
    if (o === "top")
      M = this.bottom - m, S = this._getXAxisLabelAlignment();
    else if (o === "bottom")
      M = this.top + m, S = this._getXAxisLabelAlignment();
    else if (o === "left") {
      const W = this._getYAxisLabelAlignment(g);
      S = W.textAlign, C = W.x;
    } else if (o === "right") {
      const W = this._getYAxisLabelAlignment(g);
      S = W.textAlign, C = W.x;
    } else if (a === "x") {
      if (o === "center")
        M = (t.top + t.bottom) / 2 + b;
      else if (Ie(o)) {
        const W = Object.keys(o)[0], J = o[W];
        M = this.chart.scales[W].getPixelForValue(J) + b;
      }
      S = this._getXAxisLabelAlignment();
    } else if (a === "y") {
      if (o === "center")
        C = (t.left + t.right) / 2 - b;
      else if (Ie(o)) {
        const W = Object.keys(o)[0], J = o[W];
        C = this.chart.scales[W].getPixelForValue(J);
      }
      S = this._getYAxisLabelAlignment(g).textAlign;
    }
    a === "y" && (r === "start" ? B = "top" : r === "end" && (B = "bottom"));
    const j = this._getLabelSizes();
    for (y = 0, k = l.length; y < k; ++y) {
      _ = l[y], w = _.label;
      const W = s.setContext(this.getContext(y));
      I = this.getPixelForTick(y) + s.labelOffset, V = this._resolveTickFontOptions(y), H = V.lineHeight, D = Ge(w) ? w.length : 1;
      const J = D / 2, re = W.color, ue = W.textStrokeColor, q = W.textStrokeWidth;
      let oe = S;
      i ? (C = I, S === "inner" && (y === k - 1 ? oe = this.options.reverse ? "left" : "right" : y === 0 ? oe = this.options.reverse ? "right" : "left" : oe = "center"), o === "top" ? c === "near" || v !== 0 ? T = -D * H + H / 2 : c === "center" ? T = -j.highest.height / 2 - J * H + H : T = -j.highest.height + H / 2 : c === "near" || v !== 0 ? T = H / 2 : c === "center" ? T = j.highest.height / 2 - J * H : T = j.highest.height - D * H, f && (T *= -1), v !== 0 && !W.showLabelBackdrop && (C += H / 2 * Math.sin(v))) : (M = I, T = (1 - D) * H / 2);
      let R;
      if (W.showLabelBackdrop) {
        const K = Ct(W.backdropPadding), Y = j.heights[y], N = j.widths[y];
        let ie = T - K.top, ce = 0 - K.left;
        switch (B) {
          case "middle":
            ie -= Y / 2;
            break;
          case "bottom":
            ie -= Y;
            break;
        }
        switch (S) {
          case "center":
            ce -= N / 2;
            break;
          case "right":
            ce -= N;
            break;
          case "inner":
            y === k - 1 ? ce -= N : y > 0 && (ce -= N / 2);
            break;
        }
        R = {
          left: ce,
          top: ie,
          width: N + K.width,
          height: Y + K.height,
          color: W.backdropColor
        };
      }
      p.push({
        label: w,
        font: V,
        textOffset: T,
        options: {
          rotation: v,
          color: re,
          strokeColor: ue,
          strokeWidth: q,
          textAlign: oe,
          textBaseline: B,
          translation: [
            C,
            M
          ],
          backdrop: R
        }
      });
    }
    return p;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: a } = this.options;
    if (-zt(this.labelRotation))
      return t === "top" ? "left" : "right";
    let o = "center";
    return a.align === "start" ? o = "left" : a.align === "end" ? o = "right" : a.align === "inner" && (o = "inner"), o;
  }
  _getYAxisLabelAlignment(t) {
    const { position: a, ticks: { crossAlign: n, mirror: o, padding: s } } = this.options, i = this._getLabelSizes(), l = t + s, r = i.widest.width;
    let c, u;
    return a === "left" ? o ? (u = this.right + s, n === "near" ? c = "left" : n === "center" ? (c = "center", u += r / 2) : (c = "right", u += r)) : (u = this.right - l, n === "near" ? c = "right" : n === "center" ? (c = "center", u -= r / 2) : (c = "left", u = this.left)) : a === "right" ? o ? (u = this.left + s, n === "near" ? c = "right" : n === "center" ? (c = "center", u -= r / 2) : (c = "left", u -= r)) : (u = this.left + l, n === "near" ? c = "left" : n === "center" ? (c = "center", u += r / 2) : (c = "right", u = this.right)) : c = "right", {
      textAlign: c,
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
    const l = (r, c, u) => {
      !u.width || !u.color || (n.save(), n.lineWidth = u.width, n.strokeStyle = u.color, n.setLineDash(u.borderDash || []), n.lineDashOffset = u.borderDashOffset, n.beginPath(), n.moveTo(r.x, r.y), n.lineTo(c.x, c.y), n.stroke(), n.restore());
    };
    if (a.display)
      for (s = 0, i = o.length; s < i; ++s) {
        const r = o[s];
        a.drawOnChartArea && l({
          x: r.x1,
          y: r.y1
        }, {
          x: r.x2,
          y: r.y2
        }, r), a.drawTicks && l({
          x: r.tx1,
          y: r.ty1
        }, {
          x: r.tx2,
          y: r.ty2
        }, {
          color: r.tickColor,
          width: r.tickWidth,
          borderDash: r.tickBorderDash,
          borderDashOffset: r.tickBorderDashOffset
        });
      }
  }
  drawBorder() {
    const { chart: t, ctx: a, options: { border: n, grid: o } } = this, s = n.setContext(this.getContext()), i = n.display ? s.width : 0;
    if (!i)
      return;
    const l = o.setContext(this.getContext(0)).lineWidth, r = this._borderValue;
    let c, u, f, g;
    this.isHorizontal() ? (c = ia(t, this.left, i) - i / 2, u = ia(t, this.right, l) + l / 2, f = g = r) : (f = ia(t, this.top, i) - i / 2, g = ia(t, this.bottom, l) + l / 2, c = u = r), a.save(), a.lineWidth = s.width, a.strokeStyle = s.color, a.beginPath(), a.moveTo(c, f), a.lineTo(u, g), a.stroke(), a.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const n = this.ctx, o = this._computeLabelArea();
    o && wo(n, o);
    const s = this.getLabelItems(t);
    for (const i of s) {
      const l = i.options, r = i.font, c = i.label, u = i.textOffset;
      Za(n, c, 0, u, r, l);
    }
    o && Co(n);
  }
  drawTitle() {
    const { ctx: t, options: { position: a, title: n, reverse: o } } = this;
    if (!n.display)
      return;
    const s = lt(n.font), i = Ct(n.padding), l = n.align;
    let r = s.lineHeight / 2;
    a === "bottom" || a === "center" || Ie(a) ? (r += i.bottom, Ge(n.text) && (r += s.lineHeight * (n.text.length - 1))) : r += i.top;
    const { titleX: c, titleY: u, maxWidth: f, rotation: g } = du(this, r, a, l);
    Za(t, n.text, 0, 0, s, {
      color: n.color,
      maxWidth: f,
      rotation: g,
      textAlign: cu(l, a, o),
      textBaseline: "middle",
      translation: [
        c,
        u
      ]
    });
  }
  draw(t) {
    this._isVisible() && (this.drawBackground(), this.drawGrid(t), this.drawBorder(), this.drawTitle(), this.drawLabels(t));
  }
  _layers() {
    const t = this.options, a = t.ticks && t.ticks.z || 0, n = De(t.grid && t.grid.z, -1), o = De(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== Aa.prototype.draw ? [
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
      const l = a[s];
      l[n] === this.id && (!t || l.type === t) && o.push(l);
    }
    return o;
  }
  _resolveTickFontOptions(t) {
    const a = this.options.ticks.setContext(this.getContext(t));
    return lt(a.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class mn {
  constructor(t, a, n) {
    this.type = t, this.scope = a, this.override = n, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const a = Object.getPrototypeOf(t);
    let n;
    fu(a) && (n = this.register(a));
    const o = this.items, s = t.id, i = this.scope + "." + s;
    if (!s)
      throw new Error("class does not have id: " + t);
    return s in o || (o[s] = t, uu(t, i, n), this.override && Ye.override(t.id, t.overrides)), i;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const a = this.items, n = t.id, o = this.scope;
    n in a && delete a[n], o && n in Ye[o] && (delete Ye[o][n], this.override && delete ga[n]);
  }
}
function uu(e, t, a) {
  const n = Ua(/* @__PURE__ */ Object.create(null), [
    a ? Ye.get(a) : {},
    Ye.get(t),
    e.defaults
  ]);
  Ye.set(t, n), e.defaultRoutes && hu(t, e.defaultRoutes), e.descriptors && Ye.describe(t, e.descriptors);
}
function hu(e, t) {
  Object.keys(t).forEach((a) => {
    const n = a.split("."), o = n.pop(), s = [
      e
    ].concat(n).join("."), i = t[a].split("."), l = i.pop(), r = i.join(".");
    Ye.route(s, o, r, l);
  });
}
function fu(e) {
  return "id" in e && "defaults" in e;
}
class gu {
  constructor() {
    this.controllers = new mn(En, "datasets", !0), this.elements = new mn(Ut, "elements"), this.plugins = new mn(Object, "plugins"), this.scales = new mn(Aa, "scales"), this._typedRegistries = [
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
      n || s.isForType(o) || s === this.plugins && o.id ? this._exec(t, s, o) : Ee(o, (i) => {
        const l = n || this._getRegistryForType(i);
        this._exec(t, l, i);
      });
    });
  }
  _exec(t, a, n) {
    const o = vo(t);
    je(n["before" + o], [], n), a[t](n), je(n["after" + o], [], n);
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
var Rt = /* @__PURE__ */ new gu();
class mu {
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
      const i = s.plugin, l = i[n], r = [
        a,
        o,
        s.options
      ];
      if (je(l, r, i) === !1 && o.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    Pe(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const a = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), a;
  }
  _createDescriptors(t, a) {
    const n = t && t.config, o = De(n.options && n.options.plugins, {}), s = pu(n);
    return o === !1 && !a ? [] : vu(t, s, o, a);
  }
  _notifyStateChanges(t) {
    const a = this._oldCache || [], n = this._cache, o = (s, i) => s.filter((l) => !i.some((r) => l.plugin.id === r.plugin.id));
    this._notify(o(a, n), t, "stop"), this._notify(o(n, a), t, "start");
  }
}
function pu(e) {
  const t = {}, a = [], n = Object.keys(Rt.plugins.items);
  for (let s = 0; s < n.length; s++)
    a.push(Rt.getPlugin(n[s]));
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
function bu(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function vu(e, { plugins: t, localIds: a }, n, o) {
  const s = [], i = e.getContext();
  for (const l of t) {
    const r = l.id, c = bu(n[r], o);
    c !== null && s.push({
      plugin: l,
      options: yu(e.config, {
        plugin: l,
        local: a[r]
      }, c, i)
    });
  }
  return s;
}
function yu(e, { plugin: t, local: a }, n, o) {
  const s = e.pluginScopeKeys(t), i = e.getOptionScopes(n, s);
  return a && t.defaults && i.push(t.defaults), e.createResolver(i, o, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function lo(e, t) {
  const a = Ye.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || a.indexAxis || "x";
}
function xu(e, t) {
  let a = e;
  return e === "_index_" ? a = t : e === "_value_" && (a = t === "x" ? "y" : "x"), a;
}
function ku(e, t) {
  return e === t ? "_index_" : "_value_";
}
function Bs(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function _u(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function ro(e, ...t) {
  if (Bs(e))
    return e;
  for (const a of t) {
    const n = a.axis || _u(a.position) || e.length > 1 && Bs(e[0].toLowerCase());
    if (n)
      return n;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function Ls(e, t, a) {
  if (a[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function wu(e, t) {
  if (t.data && t.data.datasets) {
    const a = t.data.datasets.filter((n) => n.xAxisID === e || n.yAxisID === e);
    if (a.length)
      return Ls(e, "x", a[0]) || Ls(e, "y", a[0]);
  }
  return {};
}
function Cu(e, t) {
  const a = ga[e.type] || {
    scales: {}
  }, n = t.scales || {}, o = lo(e.type, t), s = /* @__PURE__ */ Object.create(null);
  return Object.keys(n).forEach((i) => {
    const l = n[i];
    if (!Ie(l))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (l._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const r = ro(i, l, wu(i, e), Ye.scales[l.type]), c = ku(r, o), u = a.scales || {};
    s[i] = za(/* @__PURE__ */ Object.create(null), [
      {
        axis: r
      },
      l,
      u[r],
      u[c]
    ]);
  }), e.data.datasets.forEach((i) => {
    const l = i.type || e.type, r = i.indexAxis || lo(l, t), u = (ga[l] || {}).scales || {};
    Object.keys(u).forEach((f) => {
      const g = xu(f, r), b = i[g + "AxisID"] || g;
      s[b] = s[b] || /* @__PURE__ */ Object.create(null), za(s[b], [
        {
          axis: g
        },
        n[b],
        u[f]
      ]);
    });
  }), Object.keys(s).forEach((i) => {
    const l = s[i];
    za(l, [
      Ye.scales[l.type],
      Ye.scale
    ]);
  }), s;
}
function nl(e) {
  const t = e.options || (e.options = {});
  t.plugins = De(t.plugins, {}), t.scales = Cu(e, t);
}
function ol(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function $u(e) {
  return e = e || {}, e.data = ol(e.data), nl(e), e;
}
const Rs = /* @__PURE__ */ new Map(), sl = /* @__PURE__ */ new Set();
function pn(e, t) {
  let a = Rs.get(e);
  return a || (a = t(), Rs.set(e, a), sl.add(a)), a;
}
const Ia = (e, t, a) => {
  const n = fa(t, a);
  n !== void 0 && e.add(n);
};
class Su {
  constructor(t) {
    this._config = $u(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = ol(t);
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
    this.clearCache(), nl(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return pn(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, a) {
    return pn(`${t}.transition.${a}`, () => [
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
    return pn(`${t}-${a}`, () => [
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
    return pn(`${n}-plugin-${a}`, () => [
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
    const { options: o, type: s } = this, i = this._cachedScopes(t, n), l = i.get(a);
    if (l)
      return l;
    const r = /* @__PURE__ */ new Set();
    a.forEach((u) => {
      t && (r.add(t), u.forEach((f) => Ia(r, t, f))), u.forEach((f) => Ia(r, o, f)), u.forEach((f) => Ia(r, ga[s] || {}, f)), u.forEach((f) => Ia(r, Ye, f)), u.forEach((f) => Ia(r, so, f));
    });
    const c = Array.from(r);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), sl.has(a) && i.set(a, c), c;
  }
  chartOptionScopes() {
    const { options: t, type: a } = this;
    return [
      t,
      ga[a] || {},
      Ye.datasets[a] || {},
      {
        type: a
      },
      Ye,
      so
    ];
  }
  resolveNamedOptions(t, a, n, o = [
    ""
  ]) {
    const s = {
      $shared: !0
    }, { resolver: i, subPrefixes: l } = Is(this._resolverCache, t, o);
    let r = i;
    if (Du(i, a)) {
      s.$shared = !1, n = ta(n) ? n() : n;
      const c = this.createResolver(t, n, l);
      r = Sa(i, n, c);
    }
    for (const c of a)
      s[c] = r[c];
    return s;
  }
  createResolver(t, a, n = [
    ""
  ], o) {
    const { resolver: s } = Is(this._resolverCache, t, n);
    return Ie(a) ? Sa(s, a, void 0, o) : s;
  }
}
function Is(e, t, a) {
  let n = e.get(t);
  n || (n = /* @__PURE__ */ new Map(), e.set(t, n));
  const o = a.join();
  let s = n.get(o);
  return s || (s = {
    resolver: So(t, a),
    subPrefixes: a.filter((l) => !l.toLowerCase().includes("hover"))
  }, n.set(o, s)), s;
}
const Mu = (e) => Ie(e) && Object.getOwnPropertyNames(e).some((t) => ta(e[t]));
function Du(e, t) {
  const { isScriptable: a, isIndexable: n } = zi(e);
  for (const o of t) {
    const s = a(o), i = n(o), l = (i || s) && e[o];
    if (s && (ta(l) || Mu(l)) || i && Ge(l))
      return !0;
  }
  return !1;
}
var Au = "4.5.1";
const Tu = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function Ps(e, t) {
  return e === "top" || e === "bottom" || Tu.indexOf(e) === -1 && t === "x";
}
function Es(e, t) {
  return function(a, n) {
    return a[e] === n[e] ? a[t] - n[t] : a[e] - n[e];
  };
}
function Os(e) {
  const t = e.chart, a = t.options.animation;
  t.notifyPlugins("afterRender"), je(a && a.onComplete, [
    e
  ], t);
}
function Bu(e) {
  const t = e.chart, a = t.options.animation;
  je(a && a.onProgress, [
    e
  ], t);
}
function il(e) {
  return Ao() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const Cn = {}, Fs = (e) => {
  const t = il(e);
  return Object.values(Cn).filter((a) => a.canvas === t).pop();
};
function Lu(e, t, a) {
  const n = Object.keys(e);
  for (const o of n) {
    const s = +o;
    if (s >= t) {
      const i = e[o];
      delete e[o], (a > 0 || s > t) && (e[s + a] = i);
    }
  }
}
function Ru(e, t, a, n) {
  return !a || e.type === "mouseout" ? null : n ? t : e;
}
let aa = class {
  static defaults = Ye;
  static instances = Cn;
  static overrides = ga;
  static registry = Rt;
  static version = Au;
  static getChart = Fs;
  static register(...t) {
    Rt.add(...t), Vs();
  }
  static unregister(...t) {
    Rt.remove(...t), Vs();
  }
  constructor(t, a) {
    const n = this.config = new Su(a), o = il(t), s = Fs(o);
    if (s)
      throw new Error("Canvas is already in use. Chart with ID '" + s.id + "' must be destroyed before the canvas with ID '" + s.canvas.id + "' can be reused.");
    const i = n.createResolver(n.chartOptionScopes(), this.getContext());
    this.platform = new (n.platform || Zd(o))(), this.platform.updateConfig(n);
    const l = this.platform.acquireContext(o, i.aspectRatio), r = l && l.canvas, c = r && r.height, u = r && r.width;
    if (this.id = Cr(), this.ctx = l, this.canvas = r, this.width = u, this.height = c, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new mu(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = Hr((f) => this.update(f), i.resizeDelay || 0), this._dataChanges = [], Cn[this.id] = this, !l || !r) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    Ft.listen(this, "complete", Os), Ft.listen(this, "progress", Bu), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: a }, width: n, height: o, _aspectRatio: s } = this;
    return Pe(t) ? a && s ? s : o ? n / o : null : t;
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
    return Rt;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : ls(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return os(this.canvas, this.ctx), this;
  }
  stop() {
    return Ft.stop(this), this;
  }
  resize(t, a) {
    Ft.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: a
    } : this._resize(t, a);
  }
  _resize(t, a) {
    const n = this.options, o = this.canvas, s = n.maintainAspectRatio && this.aspectRatio, i = this.platform.getMaximumSize(o, t, a, s), l = n.devicePixelRatio || this.platform.getDevicePixelRatio(), r = this.width ? "resize" : "attach";
    this.width = i.width, this.height = i.height, this._aspectRatio = this.aspectRatio, ls(this, l, !0) && (this.notifyPlugins("resize", {
      size: i
    }), je(n.onResize, [
      this,
      i
    ], this), this.attached && this._doResize(r) && this.render());
  }
  ensureScalesHaveIDs() {
    const a = this.options.scales || {};
    Ee(a, (n, o) => {
      n.id = o;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, a = t.scales, n = this.scales, o = Object.keys(n).reduce((i, l) => (i[l] = !1, i), {});
    let s = [];
    a && (s = s.concat(Object.keys(a).map((i) => {
      const l = a[i], r = ro(i, l), c = r === "r", u = r === "x";
      return {
        options: l,
        dposition: c ? "chartArea" : u ? "bottom" : "left",
        dtype: c ? "radialLinear" : u ? "category" : "linear"
      };
    }))), Ee(s, (i) => {
      const l = i.options, r = l.id, c = ro(r, l), u = De(l.type, i.dtype);
      (l.position === void 0 || Ps(l.position, c) !== Ps(i.dposition)) && (l.position = i.dposition), o[r] = !0;
      let f = null;
      if (r in n && n[r].type === u)
        f = n[r];
      else {
        const g = Rt.getScale(u);
        f = new g({
          id: r,
          type: u,
          ctx: this.ctx,
          chart: this
        }), n[f.id] = f;
      }
      f.init(l, t);
    }), Ee(o, (i, l) => {
      i || delete n[l];
    }), Ee(n, (i) => {
      xt.configure(this, i, i.options), xt.addBox(this, i);
    });
  }
  _updateMetasets() {
    const t = this._metasets, a = this.data.datasets.length, n = t.length;
    if (t.sort((o, s) => o.index - s.index), n > a) {
      for (let o = a; o < n; ++o)
        this._destroyDatasetMeta(o);
      t.splice(a, n - a);
    }
    this._sortedMetasets = t.slice(0).sort(Es("order", "index"));
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
      const l = s.type || this.config.type;
      if (i.type && i.type !== l && (this._destroyDatasetMeta(n), i = this.getDatasetMeta(n)), i.type = l, i.indexAxis = s.indexAxis || lo(l, this.options), i.order = s.order || 0, i.index = n, i.label = "" + s.label, i.visible = this.isDatasetVisible(n), i.controller)
        i.controller.updateIndex(n), i.controller.linkScales();
      else {
        const r = Rt.getController(l), { datasetElementType: c, dataElementType: u } = Ye.datasets[l];
        Object.assign(r, {
          dataElementType: Rt.getElement(u),
          datasetElementType: c && Rt.getElement(c)
        }), i.controller = new r(this, n), t.push(i.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    Ee(this.data.datasets, (t, a) => {
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
    for (let c = 0, u = this.data.datasets.length; c < u; c++) {
      const { controller: f } = this.getDatasetMeta(c), g = !o && s.indexOf(f) === -1;
      f.buildOrUpdateElements(g), i = Math.max(+f.getMaxOverflow(), i);
    }
    i = this._minPadding = n.layout.autoPadding ? i : 0, this._updateLayout(i), o || Ee(s, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(Es("z", "_idx"));
    const { _active: l, _lastEvent: r } = this;
    r ? this._eventHandler(r, !0) : l.length && this._updateHoverStyles(l, l, !0), this.render();
  }
  _updateScales() {
    Ee(this.scales, (t) => {
      xt.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, a = new Set(Object.keys(this._listeners)), n = new Set(t.events);
    (!qo(a, n) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, a = this._getUniformDataChanges() || [];
    for (const { method: n, start: o, count: s } of a) {
      const i = n === "_removeElements" ? -s : s;
      Lu(t, o, i);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const a = this.data.datasets.length, n = (s) => new Set(t.filter((i) => i[0] === s).map((i, l) => l + "," + i.splice(1).join(","))), o = n(0);
    for (let s = 1; s < a; s++)
      if (!qo(o, n(s)))
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
    xt.update(this, this.width, this.height, t);
    const a = this.chartArea, n = a.width <= 0 || a.height <= 0;
    this._layers = [], Ee(this.boxes, (o) => {
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
        this._updateDataset(a, ta(t) ? t({
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
    }) !== !1 && (Ft.has(this) ? this.attached && !Ft.running(this) && Ft.start(this) : (this.draw(), Os({
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
    }, o = Xc(this, t);
    this.notifyPlugins("beforeDatasetDraw", n) !== !1 && (o && wo(a, o), t.controller.draw(), o && Co(a), n.cancelable = !1, this.notifyPlugins("afterDatasetDraw", n));
  }
  isPointInArea(t) {
    return Ga(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, a, n, o) {
    const s = Td.modes[a];
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
    return this.$context || (this.$context = ma(null, {
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
    Ya(a) ? (s.data[a].hidden = !n, this.update()) : (this.setDatasetVisibility(t, n), i.update(s, {
      visible: n
    }), this.update((l) => l.datasetIndex === t ? o : void 0));
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
    for (this.stop(), Ft.remove(this), t = 0, a = this.data.datasets.length; t < a; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: a } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), os(t, a), this.platform.releaseContext(a), this.canvas = null, this.ctx = null), delete Cn[this.id], this.notifyPlugins("afterDestroy");
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
    }, o = (s, i, l) => {
      s.offsetX = i, s.offsetY = l, this._eventHandler(s);
    };
    Ee(this.options.events, (s) => n(s, o));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, a = this.platform, n = (r, c) => {
      a.addEventListener(this, r, c), t[r] = c;
    }, o = (r, c) => {
      t[r] && (a.removeEventListener(this, r, c), delete t[r]);
    }, s = (r, c) => {
      this.canvas && this.resize(r, c);
    };
    let i;
    const l = () => {
      o("attach", l), this.attached = !0, this.resize(), n("resize", s), n("detach", i);
    };
    i = () => {
      this.attached = !1, o("resize", s), this._stop(), this._resize(0, 0), n("attach", l);
    }, a.isAttached(this.canvas) ? l() : i();
  }
  unbindEvents() {
    Ee(this._listeners, (t, a) => {
      this.platform.removeEventListener(this, a, t);
    }), this._listeners = {}, Ee(this._responsiveListeners, (t, a) => {
      this.platform.removeEventListener(this, a, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, a, n) {
    const o = n ? "set" : "remove";
    let s, i, l, r;
    for (a === "dataset" && (s = this.getDatasetMeta(t[0].datasetIndex), s.controller["_" + o + "DatasetHoverStyle"]()), l = 0, r = t.length; l < r; ++l) {
      i = t[l];
      const c = i && this.getDatasetMeta(i.datasetIndex).controller;
      c && c[o + "HoverStyle"](i.element, i.datasetIndex, i.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const a = this._active || [], n = t.map(({ datasetIndex: s, index: i }) => {
      const l = this.getDatasetMeta(s);
      if (!l)
        throw new Error("No dataset found at index " + s);
      return {
        datasetIndex: s,
        element: l.data[i],
        index: i
      };
    });
    !Sn(n, a) && (this._active = n, this._lastEvent = null, this._updateHoverStyles(n, a));
  }
  notifyPlugins(t, a, n) {
    return this._plugins.notify(this, t, a, n);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((a) => a.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, a, n) {
    const o = this.options.hover, s = (r, c) => r.filter((u) => !c.some((f) => u.datasetIndex === f.datasetIndex && u.index === f.index)), i = s(a, t), l = n ? t : s(t, a);
    i.length && this.updateHoverStyle(i, o.mode, !1), l.length && o.mode && this.updateHoverStyle(l, o.mode, !0);
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
    const { _active: o = [], options: s } = this, i = a, l = this._getActiveElements(t, o, n, i), r = Tr(t), c = Ru(t, this._lastEvent, n, r);
    n && (this._lastEvent = null, je(s.onHover, [
      t,
      l,
      this
    ], this), r && je(s.onClick, [
      t,
      l,
      this
    ], this));
    const u = !Sn(l, o);
    return (u || a) && (this._active = l, this._updateHoverStyles(l, o, a)), this._lastEvent = c, u;
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
function Vs() {
  return Ee(aa.instances, (e) => e._plugins.invalidate());
}
function Iu(e, t, a) {
  const { startAngle: n, x: o, y: s, outerRadius: i, innerRadius: l, options: r } = t, { borderWidth: c, borderJoinStyle: u } = r, f = Math.min(c / i, St(n - a));
  if (e.beginPath(), e.arc(o, s, i - c / 2, n + f / 2, a - f / 2), l > 0) {
    const g = Math.min(c / l, St(n - a));
    e.arc(o, s, l + c / 2, a - g / 2, n + g / 2, !0);
  } else {
    const g = Math.min(c / 2, i * St(n - a));
    if (u === "round")
      e.arc(o, s, g, a - Fe / 2, n + Fe / 2, !0);
    else if (u === "bevel") {
      const b = 2 * g * g, m = -b * Math.cos(a + Fe / 2) + o, v = -b * Math.sin(a + Fe / 2) + s, p = b * Math.cos(n + Fe / 2) + o, y = b * Math.sin(n + Fe / 2) + s;
      e.lineTo(m, v), e.lineTo(p, y);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function Pu(e, t, a) {
  const { startAngle: n, pixelMargin: o, x: s, y: i, outerRadius: l, innerRadius: r } = t;
  let c = o / l;
  e.beginPath(), e.arc(s, i, l, n - c, a + c), r > o ? (c = o / r, e.arc(s, i, r, a + c, n - c, !0)) : e.arc(s, i, o, a + Ze, n - Ze), e.closePath(), e.clip();
}
function Eu(e) {
  return $o(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function Ou(e, t, a, n) {
  const o = Eu(e.options.borderRadius), s = (a - t) / 2, i = Math.min(s, n * t / 2), l = (r) => {
    const c = (a - Math.min(s, r)) * n / 2;
    return it(r, 0, Math.min(s, c));
  };
  return {
    outerStart: l(o.outerStart),
    outerEnd: l(o.outerEnd),
    innerStart: it(o.innerStart, 0, i),
    innerEnd: it(o.innerEnd, 0, i)
  };
}
function va(e, t, a, n) {
  return {
    x: a + e * Math.cos(t),
    y: n + e * Math.sin(t)
  };
}
function Ln(e, t, a, n, o, s) {
  const { x: i, y: l, startAngle: r, pixelMargin: c, innerRadius: u } = t, f = Math.max(t.outerRadius + n + a - c, 0), g = u > 0 ? u + n + a + c : 0;
  let b = 0;
  const m = o - r;
  if (n) {
    const W = u > 0 ? u - n : 0, J = f > 0 ? f - n : 0, re = (W + J) / 2, ue = re !== 0 ? m * re / (re + n) : m;
    b = (m - ue) / 2;
  }
  const v = Math.max(1e-3, m * f - a / Fe) / f, p = (m - v) / 2, y = r + p + b, k = o - p - b, { outerStart: _, outerEnd: w, innerStart: C, innerEnd: M } = Ou(t, g, f, k - y), S = f - _, I = f - w, V = y + _ / S, H = k - w / I, D = g + C, T = g + M, B = y + C / D, j = k - M / T;
  if (e.beginPath(), s) {
    const W = (V + H) / 2;
    if (e.arc(i, l, f, V, W), e.arc(i, l, f, W, H), w > 0) {
      const q = va(I, H, i, l);
      e.arc(q.x, q.y, w, H, k + Ze);
    }
    const J = va(T, k, i, l);
    if (e.lineTo(J.x, J.y), M > 0) {
      const q = va(T, j, i, l);
      e.arc(q.x, q.y, M, k + Ze, j + Math.PI);
    }
    const re = (k - M / g + (y + C / g)) / 2;
    if (e.arc(i, l, g, k - M / g, re, !0), e.arc(i, l, g, re, y + C / g, !0), C > 0) {
      const q = va(D, B, i, l);
      e.arc(q.x, q.y, C, B + Math.PI, y - Ze);
    }
    const ue = va(S, y, i, l);
    if (e.lineTo(ue.x, ue.y), _ > 0) {
      const q = va(S, V, i, l);
      e.arc(q.x, q.y, _, y - Ze, V);
    }
  } else {
    e.moveTo(i, l);
    const W = Math.cos(V) * f + i, J = Math.sin(V) * f + l;
    e.lineTo(W, J);
    const re = Math.cos(H) * f + i, ue = Math.sin(H) * f + l;
    e.lineTo(re, ue);
  }
  e.closePath();
}
function Fu(e, t, a, n, o) {
  const { fullCircles: s, startAngle: i, circumference: l } = t;
  let r = t.endAngle;
  if (s) {
    Ln(e, t, a, n, r, o);
    for (let c = 0; c < s; ++c)
      e.fill();
    isNaN(l) || (r = i + (l % Ue || Ue));
  }
  return Ln(e, t, a, n, r, o), e.fill(), r;
}
function Vu(e, t, a, n, o) {
  const { fullCircles: s, startAngle: i, circumference: l, options: r } = t, { borderWidth: c, borderJoinStyle: u, borderDash: f, borderDashOffset: g, borderRadius: b } = r, m = r.borderAlign === "inner";
  if (!c)
    return;
  e.setLineDash(f || []), e.lineDashOffset = g, m ? (e.lineWidth = c * 2, e.lineJoin = u || "round") : (e.lineWidth = c, e.lineJoin = u || "bevel");
  let v = t.endAngle;
  if (s) {
    Ln(e, t, a, n, v, o);
    for (let p = 0; p < s; ++p)
      e.stroke();
    isNaN(l) || (v = i + (l % Ue || Ue));
  }
  m && Pu(e, t, v), r.selfJoin && v - i >= Fe && b === 0 && u !== "miter" && Iu(e, t, v), s || (Ln(e, t, a, n, v, o), e.stroke());
}
class Nu extends Ut {
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
    ], n), { angle: s, distance: i } = Ri(o, {
      x: t,
      y: a
    }), { startAngle: l, endAngle: r, innerRadius: c, outerRadius: u, circumference: f } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], n), g = (this.options.spacing + this.options.borderWidth) / 2, b = De(f, r - l), m = Xa(s, l, r) && l !== r, v = b >= Ue || m, p = Zt(i, c + g, u + g);
    return v && p;
  }
  getCenterPoint(t) {
    const { x: a, y: n, startAngle: o, endAngle: s, innerRadius: i, outerRadius: l } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], t), { offset: r, spacing: c } = this.options, u = (o + s) / 2, f = (i + l + c + r) / 2;
    return {
      x: a + Math.cos(u) * f,
      y: n + Math.sin(u) * f
    };
  }
  tooltipPosition(t) {
    return this.getCenterPoint(t);
  }
  draw(t) {
    const { options: a, circumference: n } = this, o = (a.offset || 0) / 4, s = (a.spacing || 0) / 2, i = a.circular;
    if (this.pixelMargin = a.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = n > Ue ? Math.floor(n / Ue) : 0, n === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const l = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(l) * o, Math.sin(l) * o);
    const r = 1 - Math.sin(Math.min(Fe, n || 0)), c = o * r;
    t.fillStyle = a.backgroundColor, t.strokeStyle = a.borderColor, Fu(t, this, c, s, i), Vu(t, this, c, s, i), t.restore();
  }
}
function ll(e, t, a = t) {
  e.lineCap = De(a.borderCapStyle, t.borderCapStyle), e.setLineDash(De(a.borderDash, t.borderDash)), e.lineDashOffset = De(a.borderDashOffset, t.borderDashOffset), e.lineJoin = De(a.borderJoinStyle, t.borderJoinStyle), e.lineWidth = De(a.borderWidth, t.borderWidth), e.strokeStyle = De(a.borderColor, t.borderColor);
}
function zu(e, t, a) {
  e.lineTo(a.x, a.y);
}
function ju(e) {
  return e.stepped ? nc : e.tension || e.cubicInterpolationMode === "monotone" ? oc : zu;
}
function rl(e, t, a = {}) {
  const n = e.length, { start: o = 0, end: s = n - 1 } = a, { start: i, end: l } = t, r = Math.max(o, i), c = Math.min(s, l), u = o < i && s < i || o > l && s > l;
  return {
    count: n,
    start: r,
    loop: t.loop,
    ilen: c < r && !u ? n + c - r : c - r
  };
}
function Hu(e, t, a, n) {
  const { points: o, options: s } = t, { count: i, start: l, loop: r, ilen: c } = rl(o, a, n), u = ju(s);
  let { move: f = !0, reverse: g } = n || {}, b, m, v;
  for (b = 0; b <= c; ++b)
    m = o[(l + (g ? c - b : b)) % i], !m.skip && (f ? (e.moveTo(m.x, m.y), f = !1) : u(e, v, m, g, s.stepped), v = m);
  return r && (m = o[(l + (g ? c : 0)) % i], u(e, v, m, g, s.stepped)), !!r;
}
function Wu(e, t, a, n) {
  const o = t.points, { count: s, start: i, ilen: l } = rl(o, a, n), { move: r = !0, reverse: c } = n || {};
  let u = 0, f = 0, g, b, m, v, p, y;
  const k = (w) => (i + (c ? l - w : w)) % s, _ = () => {
    v !== p && (e.lineTo(u, p), e.lineTo(u, v), e.lineTo(u, y));
  };
  for (r && (b = o[k(0)], e.moveTo(b.x, b.y)), g = 0; g <= l; ++g) {
    if (b = o[k(g)], b.skip)
      continue;
    const w = b.x, C = b.y, M = w | 0;
    M === m ? (C < v ? v = C : C > p && (p = C), u = (f * u + w) / ++f) : (_(), e.lineTo(w, C), m = M, f = 0, v = p = C), y = C;
  }
  _();
}
function co(e) {
  const t = e.options, a = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !a ? Wu : Hu;
}
function Ku(e) {
  return e.stepped ? Ec : e.tension || e.cubicInterpolationMode === "monotone" ? Oc : da;
}
function Uu(e, t, a, n) {
  let o = t._path;
  o || (o = t._path = new Path2D(), t.path(o, a, n) && o.closePath()), ll(e, t.options), e.stroke(o);
}
function Yu(e, t, a, n) {
  const { segments: o, options: s } = t, i = co(t);
  for (const l of o)
    ll(e, s, l.style), e.beginPath(), i(e, t, l, {
      start: a,
      end: a + n - 1
    }) && e.closePath(), e.stroke();
}
const qu = typeof Path2D == "function";
function Xu(e, t, a, n) {
  qu && !t.options.segment ? Uu(e, t, a, n) : Yu(e, t, a, n);
}
class Gu extends Ut {
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
      Dc(this._points, n, t, o, a), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = Kc(this, this.options.segment));
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
    const n = this.options, o = t[a], s = this.points, i = jc(this, {
      property: a,
      start: o,
      end: o
    });
    if (!i.length)
      return;
    const l = [], r = Ku(n);
    let c, u;
    for (c = 0, u = i.length; c < u; ++c) {
      const { start: f, end: g } = i[c], b = s[f], m = s[g];
      if (b === m) {
        l.push(b);
        continue;
      }
      const v = Math.abs((o - b[a]) / (m[a] - b[a])), p = r(b, m, v, n.stepped);
      p[a] = t[a], l.push(p);
    }
    return l.length === 1 ? l[0] : l;
  }
  pathSegment(t, a, n) {
    return co(this)(t, this, a, n);
  }
  path(t, a, n) {
    const o = this.segments, s = co(this);
    let i = this._loop;
    a = a || 0, n = n || this.points.length - a;
    for (const l of o)
      i &= s(t, this, l, {
        start: a,
        end: a + n - 1
      });
    return !!i;
  }
  draw(t, a, n, o) {
    const s = this.options || {};
    (this.points || []).length && s.borderWidth && (t.save(), Xu(t, this, n, o), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function Ns(e, t, a, n) {
  const o = e.options, { [a]: s } = e.getProps([
    a
  ], n);
  return Math.abs(t - s) < o.radius + o.hitRadius;
}
class Zu extends Ut {
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
    return Ns(this, t, "x", a);
  }
  inYRange(t, a) {
    return Ns(this, t, "y", a);
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
    this.skip || n.radius < 0.1 || !Ga(this, a, this.size(n) / 2) || (t.strokeStyle = n.borderColor, t.lineWidth = n.borderWidth, t.fillStyle = n.backgroundColor, io(t, n, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function cl(e, t) {
  const { x: a, y: n, base: o, width: s, height: i } = e.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let l, r, c, u, f;
  return e.horizontal ? (f = i / 2, l = Math.min(a, o), r = Math.max(a, o), c = n - f, u = n + f) : (f = s / 2, l = a - f, r = a + f, c = Math.min(n, o), u = Math.max(n, o)), {
    left: l,
    top: c,
    right: r,
    bottom: u
  };
}
function Jt(e, t, a, n) {
  return e ? 0 : it(t, a, n);
}
function Qu(e, t, a) {
  const n = e.options.borderWidth, o = e.borderSkipped, s = Ni(n);
  return {
    t: Jt(o.top, s.top, 0, a),
    r: Jt(o.right, s.right, 0, t),
    b: Jt(o.bottom, s.bottom, 0, a),
    l: Jt(o.left, s.left, 0, t)
  };
}
function Ju(e, t, a) {
  const { enableBorderRadius: n } = e.getProps([
    "enableBorderRadius"
  ]), o = e.options.borderRadius, s = wa(o), i = Math.min(t, a), l = e.borderSkipped, r = n || Ie(o);
  return {
    topLeft: Jt(!r || l.top || l.left, s.topLeft, 0, i),
    topRight: Jt(!r || l.top || l.right, s.topRight, 0, i),
    bottomLeft: Jt(!r || l.bottom || l.left, s.bottomLeft, 0, i),
    bottomRight: Jt(!r || l.bottom || l.right, s.bottomRight, 0, i)
  };
}
function eh(e) {
  const t = cl(e), a = t.right - t.left, n = t.bottom - t.top, o = Qu(e, a / 2, n / 2), s = Ju(e, a / 2, n / 2);
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
function Zn(e, t, a, n) {
  const o = t === null, s = a === null, l = e && !(o && s) && cl(e, n);
  return l && (o || Zt(t, l.left, l.right)) && (s || Zt(a, l.top, l.bottom));
}
function th(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function ah(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function Qn(e, t, a = {}) {
  const n = e.x !== a.x ? -t : 0, o = e.y !== a.y ? -t : 0, s = (e.x + e.w !== a.x + a.w ? t : 0) - n, i = (e.y + e.h !== a.y + a.h ? t : 0) - o;
  return {
    x: e.x + n,
    y: e.y + o,
    w: e.w + s,
    h: e.h + i,
    radius: e.radius
  };
}
class nh extends Ut {
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
    const { inflateAmount: a, options: { borderColor: n, backgroundColor: o } } = this, { inner: s, outer: i } = eh(this), l = th(i.radius) ? An : ah;
    t.save(), (i.w !== s.w || i.h !== s.h) && (t.beginPath(), l(t, Qn(i, a, s)), t.clip(), l(t, Qn(s, -a, i)), t.fillStyle = n, t.fill("evenodd")), t.beginPath(), l(t, Qn(s, a)), t.fillStyle = o, t.fill(), t.restore();
  }
  inRange(t, a, n) {
    return Zn(this, t, a, n);
  }
  inXRange(t, a) {
    return Zn(this, t, null, a);
  }
  inYRange(t, a) {
    return Zn(this, null, t, a);
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
const zs = (e, t) => {
  let { boxHeight: a = t, boxWidth: n = t } = e;
  return e.usePointStyle && (a = Math.min(a, t), n = e.pointStyleWidth || Math.min(n, t)), {
    boxWidth: n,
    boxHeight: a,
    itemHeight: Math.max(t, a)
  };
}, oh = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class js extends Ut {
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
    let a = je(t.generateLabels, [
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
    const n = t.labels, o = lt(n.font), s = o.size, i = this._computeTitleHeight(), { boxWidth: l, itemHeight: r } = zs(n, s);
    let c, u;
    a.font = o.string, this.isHorizontal() ? (c = this.maxWidth, u = this._fitRows(i, s, l, r) + 10) : (u = this.maxHeight, c = this._fitCols(i, o, l, r) + 10), this.width = Math.min(c, t.maxWidth || this.maxWidth), this.height = Math.min(u, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, a, n, o) {
    const { ctx: s, maxWidth: i, options: { labels: { padding: l } } } = this, r = this.legendHitBoxes = [], c = this.lineWidths = [
      0
    ], u = o + l;
    let f = t;
    s.textAlign = "left", s.textBaseline = "middle";
    let g = -1, b = -u;
    return this.legendItems.forEach((m, v) => {
      const p = n + a / 2 + s.measureText(m.text).width;
      (v === 0 || c[c.length - 1] + p + 2 * l > i) && (f += u, c[c.length - (v > 0 ? 0 : 1)] = 0, b += u, g++), r[v] = {
        left: 0,
        top: b,
        row: g,
        width: p,
        height: o
      }, c[c.length - 1] += p + l;
    }), f;
  }
  _fitCols(t, a, n, o) {
    const { ctx: s, maxHeight: i, options: { labels: { padding: l } } } = this, r = this.legendHitBoxes = [], c = this.columnSizes = [], u = i - t;
    let f = l, g = 0, b = 0, m = 0, v = 0;
    return this.legendItems.forEach((p, y) => {
      const { itemWidth: k, itemHeight: _ } = sh(n, a, s, p, o);
      y > 0 && b + _ + 2 * l > u && (f += g + l, c.push({
        width: g,
        height: b
      }), m += g + l, v++, g = b = 0), r[y] = {
        left: m,
        top: b,
        col: v,
        width: k,
        height: _
      }, g = Math.max(g, k), b += _ + l;
    }), f += g, c.push({
      width: g,
      height: b
    }), f;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: a, options: { align: n, labels: { padding: o }, rtl: s } } = this, i = Ca(s, this.left, this.width);
    if (this.isHorizontal()) {
      let l = 0, r = nt(n, this.left + o, this.right - this.lineWidths[l]);
      for (const c of a)
        l !== c.row && (l = c.row, r = nt(n, this.left + o, this.right - this.lineWidths[l])), c.top += this.top + t + o, c.left = i.leftForLtr(i.x(r), c.width), r += c.width + o;
    } else {
      let l = 0, r = nt(n, this.top + t + o, this.bottom - this.columnSizes[l].height);
      for (const c of a)
        c.col !== l && (l = c.col, r = nt(n, this.top + t + o, this.bottom - this.columnSizes[l].height)), c.top = r, c.left += this.left + o, c.left = i.leftForLtr(i.x(c.left), c.width), r += c.height + o;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      wo(t, this), this._draw(), Co(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: a, lineWidths: n, ctx: o } = this, { align: s, labels: i } = t, l = Ye.color, r = Ca(t.rtl, this.left, this.width), c = lt(i.font), { padding: u } = i, f = c.size, g = f / 2;
    let b;
    this.drawTitle(), o.textAlign = r.textAlign("left"), o.textBaseline = "middle", o.lineWidth = 0.5, o.font = c.string;
    const { boxWidth: m, boxHeight: v, itemHeight: p } = zs(i, f), y = function(M, S, I) {
      if (isNaN(m) || m <= 0 || isNaN(v) || v < 0)
        return;
      o.save();
      const V = De(I.lineWidth, 1);
      if (o.fillStyle = De(I.fillStyle, l), o.lineCap = De(I.lineCap, "butt"), o.lineDashOffset = De(I.lineDashOffset, 0), o.lineJoin = De(I.lineJoin, "miter"), o.lineWidth = V, o.strokeStyle = De(I.strokeStyle, l), o.setLineDash(De(I.lineDash, [])), i.usePointStyle) {
        const H = {
          radius: v * Math.SQRT2 / 2,
          pointStyle: I.pointStyle,
          rotation: I.rotation,
          borderWidth: V
        }, D = r.xPlus(M, m / 2), T = S + g;
        Vi(o, H, D, T, i.pointStyleWidth && m);
      } else {
        const H = S + Math.max((f - v) / 2, 0), D = r.leftForLtr(M, m), T = wa(I.borderRadius);
        o.beginPath(), Object.values(T).some((B) => B !== 0) ? An(o, {
          x: D,
          y: H,
          w: m,
          h: v,
          radius: T
        }) : o.rect(D, H, m, v), o.fill(), V !== 0 && o.stroke();
      }
      o.restore();
    }, k = function(M, S, I) {
      Za(o, I.text, M, S + p / 2, c, {
        strikethrough: I.hidden,
        textAlign: r.textAlign(I.textAlign)
      });
    }, _ = this.isHorizontal(), w = this._computeTitleHeight();
    _ ? b = {
      x: nt(s, this.left + u, this.right - n[0]),
      y: this.top + u + w,
      line: 0
    } : b = {
      x: this.left + u,
      y: nt(s, this.top + w + u, this.bottom - a[0].height),
      line: 0
    }, Ui(this.ctx, t.textDirection);
    const C = p + u;
    this.legendItems.forEach((M, S) => {
      o.strokeStyle = M.fontColor, o.fillStyle = M.fontColor;
      const I = o.measureText(M.text).width, V = r.textAlign(M.textAlign || (M.textAlign = i.textAlign)), H = m + g + I;
      let D = b.x, T = b.y;
      r.setWidth(this.width), _ ? S > 0 && D + H + u > this.right && (T = b.y += C, b.line++, D = b.x = nt(s, this.left + u, this.right - n[b.line])) : S > 0 && T + C > this.bottom && (D = b.x = D + a[b.line].width + u, b.line++, T = b.y = nt(s, this.top + w + u, this.bottom - a[b.line].height));
      const B = r.x(D);
      if (y(B, T, M), D = Wr(V, D + m + g, _ ? D + H : this.right, t.rtl), k(r.x(D), T, M), _)
        b.x += H + u;
      else if (typeof M.text != "string") {
        const j = c.lineHeight;
        b.y += dl(M, j) + u;
      } else
        b.y += C;
    }), Yi(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, a = t.title, n = lt(a.font), o = Ct(a.padding);
    if (!a.display)
      return;
    const s = Ca(t.rtl, this.left, this.width), i = this.ctx, l = a.position, r = n.size / 2, c = o.top + r;
    let u, f = this.left, g = this.width;
    if (this.isHorizontal())
      g = Math.max(...this.lineWidths), u = this.top + c, f = nt(t.align, f, this.right - g);
    else {
      const m = this.columnSizes.reduce((v, p) => Math.max(v, p.height), 0);
      u = c + nt(t.align, this.top, this.bottom - m - t.labels.padding - this._computeTitleHeight());
    }
    const b = nt(l, f, f + g);
    i.textAlign = s.textAlign(xo(l)), i.textBaseline = "middle", i.strokeStyle = a.color, i.fillStyle = a.color, i.font = n.string, Za(i, a.text, b, u, n);
  }
  _computeTitleHeight() {
    const t = this.options.title, a = lt(t.font), n = Ct(t.padding);
    return t.display ? a.lineHeight + n.height : 0;
  }
  _getLegendItemAt(t, a) {
    let n, o, s;
    if (Zt(t, this.left, this.right) && Zt(a, this.top, this.bottom)) {
      for (s = this.legendHitBoxes, n = 0; n < s.length; ++n)
        if (o = s[n], Zt(t, o.left, o.left + o.width) && Zt(a, o.top, o.top + o.height))
          return this.legendItems[n];
    }
    return null;
  }
  handleEvent(t) {
    const a = this.options;
    if (!rh(t.type, a))
      return;
    const n = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const o = this._hoveredItem, s = oh(o, n);
      o && !s && je(a.onLeave, [
        t,
        o,
        this
      ], this), this._hoveredItem = n, n && !s && je(a.onHover, [
        t,
        n,
        this
      ], this);
    } else n && je(a.onClick, [
      t,
      n,
      this
    ], this);
  }
}
function sh(e, t, a, n, o) {
  const s = ih(n, e, t, a), i = lh(o, n, t.lineHeight);
  return {
    itemWidth: s,
    itemHeight: i
  };
}
function ih(e, t, a, n) {
  let o = e.text;
  return o && typeof o != "string" && (o = o.reduce((s, i) => s.length > i.length ? s : i)), t + a.size / 2 + n.measureText(o).width;
}
function lh(e, t, a) {
  let n = e;
  return typeof t.text != "string" && (n = dl(t, a)), n;
}
function dl(e, t) {
  const a = e.text ? e.text.length : 0;
  return t * a;
}
function rh(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var Lo = {
  id: "legend",
  _element: js,
  start(e, t, a) {
    const n = e.legend = new js({
      ctx: e.ctx,
      options: a,
      chart: e
    });
    xt.configure(e, n, a), xt.addBox(e, n);
  },
  stop(e) {
    xt.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, a) {
    const n = e.legend;
    xt.configure(e, n, a), n.options = a;
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
        const t = e.data.datasets, { labels: { usePointStyle: a, pointStyle: n, textAlign: o, color: s, useBorderRadius: i, borderRadius: l } } = e.legend.options;
        return e._getSortedDatasetMetas().map((r) => {
          const c = r.controller.getStyle(a ? 0 : void 0), u = Ct(c.borderWidth);
          return {
            text: t[r.index].label,
            fillStyle: c.backgroundColor,
            fontColor: s,
            hidden: !r.visible,
            lineCap: c.borderCapStyle,
            lineDash: c.borderDash,
            lineDashOffset: c.borderDashOffset,
            lineJoin: c.borderJoinStyle,
            lineWidth: (u.width + u.height) / 4,
            strokeStyle: c.borderColor,
            pointStyle: n || c.pointStyle,
            rotation: c.rotation,
            textAlign: o || c.textAlign,
            borderRadius: i && (l || c.borderRadius),
            datasetIndex: r.index
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
class ul extends Ut {
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
    const o = Ge(n.text) ? n.text.length : 1;
    this._padding = Ct(n.padding);
    const s = o * lt(n.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = s : this.width = s;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: a, left: n, bottom: o, right: s, options: i } = this, l = i.align;
    let r = 0, c, u, f;
    return this.isHorizontal() ? (u = nt(l, n, s), f = a + t, c = s - n) : (i.position === "left" ? (u = n + t, f = nt(l, o, a), r = Fe * -0.5) : (u = s - t, f = nt(l, a, o), r = Fe * 0.5), c = o - a), {
      titleX: u,
      titleY: f,
      maxWidth: c,
      rotation: r
    };
  }
  draw() {
    const t = this.ctx, a = this.options;
    if (!a.display)
      return;
    const n = lt(a.font), s = n.lineHeight / 2 + this._padding.top, { titleX: i, titleY: l, maxWidth: r, rotation: c } = this._drawArgs(s);
    Za(t, a.text, 0, 0, n, {
      color: a.color,
      maxWidth: r,
      rotation: c,
      textAlign: xo(a.align),
      textBaseline: "middle",
      translation: [
        i,
        l
      ]
    });
  }
}
function ch(e, t) {
  const a = new ul({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  xt.configure(e, a, t), xt.addBox(e, a), e.titleBlock = a;
}
var hl = {
  id: "title",
  _element: ul,
  start(e, t, a) {
    ch(e, a);
  },
  stop(e) {
    const t = e.titleBlock;
    xt.removeBox(e, t), delete e.titleBlock;
  },
  beforeUpdate(e, t, a) {
    const n = e.titleBlock;
    xt.configure(e, n, a), n.options = a;
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
const Na = {
  average(e) {
    if (!e.length)
      return !1;
    let t, a, n = /* @__PURE__ */ new Set(), o = 0, s = 0;
    for (t = 0, a = e.length; t < a; ++t) {
      const l = e[t].element;
      if (l && l.hasValue()) {
        const r = l.tooltipPosition();
        n.add(r.x), o += r.y, ++s;
      }
    }
    return s === 0 || n.size === 0 ? !1 : {
      x: [
        ...n
      ].reduce((l, r) => l + r) / n.size,
      y: o / s
    };
  },
  nearest(e, t) {
    if (!e.length)
      return !1;
    let a = t.x, n = t.y, o = Number.POSITIVE_INFINITY, s, i, l;
    for (s = 0, i = e.length; s < i; ++s) {
      const r = e[s].element;
      if (r && r.hasValue()) {
        const c = r.getCenterPoint(), u = oo(t, c);
        u < o && (o = u, l = r);
      }
    }
    if (l) {
      const r = l.tooltipPosition();
      a = r.x, n = r.y;
    }
    return {
      x: a,
      y: n
    };
  }
};
function Lt(e, t) {
  return t && (Ge(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function Vt(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function dh(e, t) {
  const { element: a, datasetIndex: n, index: o } = t, s = e.getDatasetMeta(n).controller, { label: i, value: l } = s.getLabelAndValue(o);
  return {
    chart: e,
    label: i,
    parsed: s.getParsed(o),
    raw: e.data.datasets[n].data[o],
    formattedValue: l,
    dataset: s.getDataset(),
    dataIndex: o,
    datasetIndex: n,
    element: a
  };
}
function Hs(e, t) {
  const a = e.chart.ctx, { body: n, footer: o, title: s } = e, { boxWidth: i, boxHeight: l } = t, r = lt(t.bodyFont), c = lt(t.titleFont), u = lt(t.footerFont), f = s.length, g = o.length, b = n.length, m = Ct(t.padding);
  let v = m.height, p = 0, y = n.reduce((w, C) => w + C.before.length + C.lines.length + C.after.length, 0);
  if (y += e.beforeBody.length + e.afterBody.length, f && (v += f * c.lineHeight + (f - 1) * t.titleSpacing + t.titleMarginBottom), y) {
    const w = t.displayColors ? Math.max(l, r.lineHeight) : r.lineHeight;
    v += b * w + (y - b) * r.lineHeight + (y - 1) * t.bodySpacing;
  }
  g && (v += t.footerMarginTop + g * u.lineHeight + (g - 1) * t.footerSpacing);
  let k = 0;
  const _ = function(w) {
    p = Math.max(p, a.measureText(w).width + k);
  };
  return a.save(), a.font = c.string, Ee(e.title, _), a.font = r.string, Ee(e.beforeBody.concat(e.afterBody), _), k = t.displayColors ? i + 2 + t.boxPadding : 0, Ee(n, (w) => {
    Ee(w.before, _), Ee(w.lines, _), Ee(w.after, _);
  }), k = 0, a.font = u.string, Ee(e.footer, _), a.restore(), p += m.width, {
    width: p,
    height: v
  };
}
function uh(e, t) {
  const { y: a, height: n } = t;
  return a < n / 2 ? "top" : a > e.height - n / 2 ? "bottom" : "center";
}
function hh(e, t, a, n) {
  const { x: o, width: s } = n, i = a.caretSize + a.caretPadding;
  if (e === "left" && o + s + i > t.width || e === "right" && o - s - i < 0)
    return !0;
}
function fh(e, t, a, n) {
  const { x: o, width: s } = a, { width: i, chartArea: { left: l, right: r } } = e;
  let c = "center";
  return n === "center" ? c = o <= (l + r) / 2 ? "left" : "right" : o <= s / 2 ? c = "left" : o >= i - s / 2 && (c = "right"), hh(c, e, t, a) && (c = "center"), c;
}
function Ws(e, t, a) {
  const n = a.yAlign || t.yAlign || uh(e, a);
  return {
    xAlign: a.xAlign || t.xAlign || fh(e, t, a, n),
    yAlign: n
  };
}
function gh(e, t) {
  let { x: a, width: n } = e;
  return t === "right" ? a -= n : t === "center" && (a -= n / 2), a;
}
function mh(e, t, a) {
  let { y: n, height: o } = e;
  return t === "top" ? n += a : t === "bottom" ? n -= o + a : n -= o / 2, n;
}
function Ks(e, t, a, n) {
  const { caretSize: o, caretPadding: s, cornerRadius: i } = e, { xAlign: l, yAlign: r } = a, c = o + s, { topLeft: u, topRight: f, bottomLeft: g, bottomRight: b } = wa(i);
  let m = gh(t, l);
  const v = mh(t, r, c);
  return r === "center" ? l === "left" ? m += c : l === "right" && (m -= c) : l === "left" ? m -= Math.max(u, g) + o : l === "right" && (m += Math.max(f, b) + o), {
    x: it(m, 0, n.width - t.width),
    y: it(v, 0, n.height - t.height)
  };
}
function bn(e, t, a) {
  const n = Ct(a.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - n.right : e.x + n.left;
}
function Us(e) {
  return Lt([], Vt(e));
}
function ph(e, t, a) {
  return ma(e, {
    tooltip: t,
    tooltipItems: a,
    type: "tooltip"
  });
}
function Ys(e, t) {
  const a = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return a ? e.override(a) : e;
}
const fl = {
  beforeTitle: Ot,
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
  afterTitle: Ot,
  beforeBody: Ot,
  beforeLabel: Ot,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const a = e.formattedValue;
    return Pe(a) || (t += a), t;
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
  afterLabel: Ot,
  afterBody: Ot,
  beforeFooter: Ot,
  footer: Ot,
  afterFooter: Ot
};
function ft(e, t, a, n) {
  const o = e[t].call(a, n);
  return typeof o > "u" ? fl[t].call(a, n) : o;
}
class qs extends Ut {
  static positioners = Na;
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
    const a = this.chart, n = this.options.setContext(this.getContext()), o = n.enabled && a.options.animation && n.animations, s = new Xi(this.chart, o);
    return o._cacheable && (this._cachedAnimations = Object.freeze(s)), s;
  }
  getContext() {
    return this.$context || (this.$context = ph(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, a) {
    const { callbacks: n } = a, o = ft(n, "beforeTitle", this, t), s = ft(n, "title", this, t), i = ft(n, "afterTitle", this, t);
    let l = [];
    return l = Lt(l, Vt(o)), l = Lt(l, Vt(s)), l = Lt(l, Vt(i)), l;
  }
  getBeforeBody(t, a) {
    return Us(ft(a.callbacks, "beforeBody", this, t));
  }
  getBody(t, a) {
    const { callbacks: n } = a, o = [];
    return Ee(t, (s) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, l = Ys(n, s);
      Lt(i.before, Vt(ft(l, "beforeLabel", this, s))), Lt(i.lines, ft(l, "label", this, s)), Lt(i.after, Vt(ft(l, "afterLabel", this, s))), o.push(i);
    }), o;
  }
  getAfterBody(t, a) {
    return Us(ft(a.callbacks, "afterBody", this, t));
  }
  getFooter(t, a) {
    const { callbacks: n } = a, o = ft(n, "beforeFooter", this, t), s = ft(n, "footer", this, t), i = ft(n, "afterFooter", this, t);
    let l = [];
    return l = Lt(l, Vt(o)), l = Lt(l, Vt(s)), l = Lt(l, Vt(i)), l;
  }
  _createItems(t) {
    const a = this._active, n = this.chart.data, o = [], s = [], i = [];
    let l = [], r, c;
    for (r = 0, c = a.length; r < c; ++r)
      l.push(dh(this.chart, a[r]));
    return t.filter && (l = l.filter((u, f, g) => t.filter(u, f, g, n))), t.itemSort && (l = l.sort((u, f) => t.itemSort(u, f, n))), Ee(l, (u) => {
      const f = Ys(t.callbacks, u);
      o.push(ft(f, "labelColor", this, u)), s.push(ft(f, "labelPointStyle", this, u)), i.push(ft(f, "labelTextColor", this, u));
    }), this.labelColors = o, this.labelPointStyles = s, this.labelTextColors = i, this.dataPoints = l, l;
  }
  update(t, a) {
    const n = this.options.setContext(this.getContext()), o = this._active;
    let s, i = [];
    if (!o.length)
      this.opacity !== 0 && (s = {
        opacity: 0
      });
    else {
      const l = Na[n.position].call(this, o, this._eventPosition);
      i = this._createItems(n), this.title = this.getTitle(i, n), this.beforeBody = this.getBeforeBody(i, n), this.body = this.getBody(i, n), this.afterBody = this.getAfterBody(i, n), this.footer = this.getFooter(i, n);
      const r = this._size = Hs(this, n), c = Object.assign({}, l, r), u = Ws(this.chart, n, c), f = Ks(n, c, u, this.chart);
      this.xAlign = u.xAlign, this.yAlign = u.yAlign, s = {
        opacity: 1,
        x: f.x,
        y: f.y,
        width: r.width,
        height: r.height,
        caretX: l.x,
        caretY: l.y
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
    const { xAlign: o, yAlign: s } = this, { caretSize: i, cornerRadius: l } = n, { topLeft: r, topRight: c, bottomLeft: u, bottomRight: f } = wa(l), { x: g, y: b } = t, { width: m, height: v } = a;
    let p, y, k, _, w, C;
    return s === "center" ? (w = b + v / 2, o === "left" ? (p = g, y = p - i, _ = w + i, C = w - i) : (p = g + m, y = p + i, _ = w - i, C = w + i), k = p) : (o === "left" ? y = g + Math.max(r, u) + i : o === "right" ? y = g + m - Math.max(c, f) - i : y = this.caretX, s === "top" ? (_ = b, w = _ - i, p = y - i, k = y + i) : (_ = b + v, w = _ + i, p = y + i, k = y - i), C = _), {
      x1: p,
      x2: y,
      x3: k,
      y1: _,
      y2: w,
      y3: C
    };
  }
  drawTitle(t, a, n) {
    const o = this.title, s = o.length;
    let i, l, r;
    if (s) {
      const c = Ca(n.rtl, this.x, this.width);
      for (t.x = bn(this, n.titleAlign, n), a.textAlign = c.textAlign(n.titleAlign), a.textBaseline = "middle", i = lt(n.titleFont), l = n.titleSpacing, a.fillStyle = n.titleColor, a.font = i.string, r = 0; r < s; ++r)
        a.fillText(o[r], c.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + l, r + 1 === s && (t.y += n.titleMarginBottom - l);
    }
  }
  _drawColorBox(t, a, n, o, s) {
    const i = this.labelColors[n], l = this.labelPointStyles[n], { boxHeight: r, boxWidth: c } = s, u = lt(s.bodyFont), f = bn(this, "left", s), g = o.x(f), b = r < u.lineHeight ? (u.lineHeight - r) / 2 : 0, m = a.y + b;
    if (s.usePointStyle) {
      const v = {
        radius: Math.min(c, r) / 2,
        pointStyle: l.pointStyle,
        rotation: l.rotation,
        borderWidth: 1
      }, p = o.leftForLtr(g, c) + c / 2, y = m + r / 2;
      t.strokeStyle = s.multiKeyBackground, t.fillStyle = s.multiKeyBackground, io(t, v, p, y), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, io(t, v, p, y);
    } else {
      t.lineWidth = Ie(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const v = o.leftForLtr(g, c), p = o.leftForLtr(o.xPlus(g, 1), c - 2), y = wa(i.borderRadius);
      Object.values(y).some((k) => k !== 0) ? (t.beginPath(), t.fillStyle = s.multiKeyBackground, An(t, {
        x: v,
        y: m,
        w: c,
        h: r,
        radius: y
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), An(t, {
        x: p,
        y: m + 1,
        w: c - 2,
        h: r - 2,
        radius: y
      }), t.fill()) : (t.fillStyle = s.multiKeyBackground, t.fillRect(v, m, c, r), t.strokeRect(v, m, c, r), t.fillStyle = i.backgroundColor, t.fillRect(p, m + 1, c - 2, r - 2));
    }
    t.fillStyle = this.labelTextColors[n];
  }
  drawBody(t, a, n) {
    const { body: o } = this, { bodySpacing: s, bodyAlign: i, displayColors: l, boxHeight: r, boxWidth: c, boxPadding: u } = n, f = lt(n.bodyFont);
    let g = f.lineHeight, b = 0;
    const m = Ca(n.rtl, this.x, this.width), v = function(I) {
      a.fillText(I, m.x(t.x + b), t.y + g / 2), t.y += g + s;
    }, p = m.textAlign(i);
    let y, k, _, w, C, M, S;
    for (a.textAlign = i, a.textBaseline = "middle", a.font = f.string, t.x = bn(this, p, n), a.fillStyle = n.bodyColor, Ee(this.beforeBody, v), b = l && p !== "right" ? i === "center" ? c / 2 + u : c + 2 + u : 0, w = 0, M = o.length; w < M; ++w) {
      for (y = o[w], k = this.labelTextColors[w], a.fillStyle = k, Ee(y.before, v), _ = y.lines, l && _.length && (this._drawColorBox(a, t, w, m, n), g = Math.max(f.lineHeight, r)), C = 0, S = _.length; C < S; ++C)
        v(_[C]), g = f.lineHeight;
      Ee(y.after, v);
    }
    b = 0, g = f.lineHeight, Ee(this.afterBody, v), t.y -= s;
  }
  drawFooter(t, a, n) {
    const o = this.footer, s = o.length;
    let i, l;
    if (s) {
      const r = Ca(n.rtl, this.x, this.width);
      for (t.x = bn(this, n.footerAlign, n), t.y += n.footerMarginTop, a.textAlign = r.textAlign(n.footerAlign), a.textBaseline = "middle", i = lt(n.footerFont), a.fillStyle = n.footerColor, a.font = i.string, l = 0; l < s; ++l)
        a.fillText(o[l], r.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + n.footerSpacing;
    }
  }
  drawBackground(t, a, n, o) {
    const { xAlign: s, yAlign: i } = this, { x: l, y: r } = t, { width: c, height: u } = n, { topLeft: f, topRight: g, bottomLeft: b, bottomRight: m } = wa(o.cornerRadius);
    a.fillStyle = o.backgroundColor, a.strokeStyle = o.borderColor, a.lineWidth = o.borderWidth, a.beginPath(), a.moveTo(l + f, r), i === "top" && this.drawCaret(t, a, n, o), a.lineTo(l + c - g, r), a.quadraticCurveTo(l + c, r, l + c, r + g), i === "center" && s === "right" && this.drawCaret(t, a, n, o), a.lineTo(l + c, r + u - m), a.quadraticCurveTo(l + c, r + u, l + c - m, r + u), i === "bottom" && this.drawCaret(t, a, n, o), a.lineTo(l + b, r + u), a.quadraticCurveTo(l, r + u, l, r + u - b), i === "center" && s === "left" && this.drawCaret(t, a, n, o), a.lineTo(l, r + f), a.quadraticCurveTo(l, r, l + f, r), a.closePath(), a.fill(), o.borderWidth > 0 && a.stroke();
  }
  _updateAnimationTarget(t) {
    const a = this.chart, n = this.$animations, o = n && n.x, s = n && n.y;
    if (o || s) {
      const i = Na[t.position].call(this, this._active, this._eventPosition);
      if (!i)
        return;
      const l = this._size = Hs(this, t), r = Object.assign({}, i, this._size), c = Ws(a, t, r), u = Ks(t, r, c, a);
      (o._to !== u.x || s._to !== u.y) && (this.xAlign = c.xAlign, this.yAlign = c.yAlign, this.width = l.width, this.height = l.height, this.caretX = i.x, this.caretY = i.y, this._resolveAnimations().update(this, u));
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
    const i = Ct(a.padding), l = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    a.enabled && l && (t.save(), t.globalAlpha = n, this.drawBackground(s, t, o, a), Ui(t, a.textDirection), s.y += i.top, this.drawTitle(s, t, a), this.drawBody(s, t, a), this.drawFooter(s, t, a), Yi(t, a.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, a) {
    const n = this._active, o = t.map(({ datasetIndex: l, index: r }) => {
      const c = this.chart.getDatasetMeta(l);
      if (!c)
        throw new Error("Cannot find a dataset at index " + l);
      return {
        datasetIndex: l,
        element: c.data[r],
        index: r
      };
    }), s = !Sn(n, o), i = this._positionChanged(o, a);
    (s || i) && (this._active = o, this._eventPosition = a, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, a, n = !0) {
    if (a && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const o = this.options, s = this._active || [], i = this._getActiveElements(t, s, a, n), l = this._positionChanged(i, t), r = a || !Sn(i, s) || l;
    return r && (this._active = i, (o.enabled || o.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, a))), r;
  }
  _getActiveElements(t, a, n, o) {
    const s = this.options;
    if (t.type === "mouseout")
      return [];
    if (!o)
      return a.filter((l) => this.chart.data.datasets[l.datasetIndex] && this.chart.getDatasetMeta(l.datasetIndex).controller.getParsed(l.index) !== void 0);
    const i = this.chart.getElementsAtEventForMode(t, s.mode, s, n);
    return s.reverse && i.reverse(), i;
  }
  _positionChanged(t, a) {
    const { caretX: n, caretY: o, options: s } = this, i = Na[s.position].call(this, t, a);
    return i !== !1 && (n !== i.x || o !== i.y);
  }
}
var Ro = {
  id: "tooltip",
  _element: qs,
  positioners: Na,
  afterInit(e, t, a) {
    a && (e.tooltip = new qs({
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
    callbacks: fl
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
const bh = (e, t, a, n) => (typeof t == "string" ? (a = e.push(t) - 1, n.unshift({
  index: a,
  label: t
})) : isNaN(t) && (a = null), a);
function vh(e, t, a, n) {
  const o = e.indexOf(t);
  if (o === -1)
    return bh(e, t, a, n);
  const s = e.lastIndexOf(t);
  return o !== s ? a : o;
}
const yh = (e, t) => e === null ? null : it(Math.round(e), 0, t);
function Xs(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class gl extends Aa {
  static id = "category";
  static defaults = {
    ticks: {
      callback: Xs
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
    if (Pe(t))
      return null;
    const n = this.getLabels();
    return a = isFinite(a) && n[a] === t ? a : vh(n, t, De(a, t), this._addedLabels), yh(a, n.length - 1);
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
    return Xs.call(this, t);
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
function xh(e, t) {
  const a = [], { bounds: o, step: s, min: i, max: l, precision: r, count: c, maxTicks: u, maxDigits: f, includeBounds: g } = e, b = s || 1, m = u - 1, { min: v, max: p } = t, y = !Pe(i), k = !Pe(l), _ = !Pe(c), w = (p - v) / (f + 1);
  let C = Go((p - v) / m / b) * b, M, S, I, V;
  if (C < 1e-14 && !y && !k)
    return [
      {
        value: v
      },
      {
        value: p
      }
    ];
  V = Math.ceil(p / C) - Math.floor(v / C), V > m && (C = Go(V * C / m / b) * b), Pe(r) || (M = Math.pow(10, r), C = Math.ceil(C * M) / M), o === "ticks" ? (S = Math.floor(v / C) * C, I = Math.ceil(p / C) * C) : (S = v, I = p), y && k && s && Pr((l - i) / s, C / 1e3) ? (V = Math.round(Math.min((l - i) / C, u)), C = (l - i) / V, S = i, I = l) : _ ? (S = y ? i : S, I = k ? l : I, V = c - 1, C = (I - S) / V) : (V = (I - S) / C, ja(V, Math.round(V), C / 1e3) ? V = Math.round(V) : V = Math.ceil(V));
  const H = Math.max(Zo(C), Zo(S));
  M = Math.pow(10, Pe(r) ? H : r), S = Math.round(S * M) / M, I = Math.round(I * M) / M;
  let D = 0;
  for (y && (g && S !== i ? (a.push({
    value: i
  }), S < i && D++, ja(Math.round((S + D * C) * M) / M, i, Gs(i, w, e)) && D++) : S < i && D++); D < V; ++D) {
    const T = Math.round((S + D * C) * M) / M;
    if (k && T > l)
      break;
    a.push({
      value: T
    });
  }
  return k && g && I !== l ? a.length && ja(a[a.length - 1].value, l, Gs(l, w, e)) ? a[a.length - 1].value = l : a.push({
    value: l
  }) : (!k || I === l) && a.push({
    value: I
  }), a;
}
function Gs(e, t, { horizontal: a, minRotation: n }) {
  const o = zt(n), s = (a ? Math.sin(o) : Math.cos(o)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / s, i);
}
class kh extends Aa {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, a) {
    return Pe(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: a, maxDefined: n } = this.getUserBounds();
    let { min: o, max: s } = this;
    const i = (r) => o = a ? o : r, l = (r) => s = n ? s : r;
    if (t) {
      const r = Pt(o), c = Pt(s);
      r < 0 && c < 0 ? l(0) : r > 0 && c > 0 && i(0);
    }
    if (o === s) {
      let r = s === 0 ? 1 : Math.abs(s * 0.05);
      l(s + r), t || i(o - r);
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
    }, s = this._range || this, i = xh(o, s);
    return t.bounds === "ticks" && Er(i, this, "value"), t.reverse ? (i.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), i;
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
    return _o(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class ml extends kh {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: Fi.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: a } = this.getMinMax(!0);
    this.min = wt(t) ? t : 0, this.max = wt(a) ? a : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), a = t ? this.width : this.height, n = zt(this.options.ticks.minRotation), o = (t ? Math.sin(n) : Math.cos(n)) || 1e-3, s = this._resolveTickFontOptions(0);
    return Math.ceil(a / Math.min(40, s.lineHeight / o));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
const Fn = {
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
}, mt = /* @__PURE__ */ Object.keys(Fn);
function Zs(e, t) {
  return e - t;
}
function Qs(e, t) {
  if (Pe(t))
    return null;
  const a = e._adapter, { parser: n, round: o, isoWeekday: s } = e._parseOpts;
  let i = t;
  return typeof n == "function" && (i = n(i)), wt(i) || (i = typeof n == "string" ? a.parse(i, n) : a.parse(i)), i === null ? null : (o && (i = o === "week" && (qa(s) || s === !0) ? a.startOf(i, "isoWeek", s) : a.startOf(i, o)), +i);
}
function Js(e, t, a, n) {
  const o = mt.length;
  for (let s = mt.indexOf(e); s < o - 1; ++s) {
    const i = Fn[mt[s]], l = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((a - t) / (l * i.size)) <= n)
      return mt[s];
  }
  return mt[o - 1];
}
function _h(e, t, a, n, o) {
  for (let s = mt.length - 1; s >= mt.indexOf(a); s--) {
    const i = mt[s];
    if (Fn[i].common && e._adapter.diff(o, n, i) >= t - 1)
      return i;
  }
  return mt[a ? mt.indexOf(a) : 0];
}
function wh(e) {
  for (let t = mt.indexOf(e) + 1, a = mt.length; t < a; ++t)
    if (Fn[mt[t]].common)
      return mt[t];
}
function ei(e, t, a) {
  if (!a)
    e[t] = !0;
  else if (a.length) {
    const { lo: n, hi: o } = yo(a, t), s = a[n] >= t ? a[n] : a[o];
    e[s] = !0;
  }
}
function Ch(e, t, a, n) {
  const o = e._adapter, s = +o.startOf(t[0].value, n), i = t[t.length - 1].value;
  let l, r;
  for (l = s; l <= i; l = +o.add(l, 1, n))
    r = a[l], r >= 0 && (t[r].major = !0);
  return t;
}
function ti(e, t, a) {
  const n = [], o = {}, s = t.length;
  let i, l;
  for (i = 0; i < s; ++i)
    l = t[i], o[l] = i, n.push({
      value: l,
      major: !1
    });
  return s === 0 || !a ? n : Ch(e, n, o, a);
}
class ai extends Aa {
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
    const n = t.time || (t.time = {}), o = this._adapter = new $d._date(t.adapters.date);
    o.init(a), za(n.displayFormats, o.formats()), this._parseOpts = {
      parser: n.parser,
      round: n.round,
      isoWeekday: n.isoWeekday
    }, super.init(t), this._normalized = a.normalized;
  }
  parse(t, a) {
    return t === void 0 ? null : Qs(this, t);
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
    let { min: o, max: s, minDefined: i, maxDefined: l } = this.getUserBounds();
    function r(c) {
      !i && !isNaN(c.min) && (o = Math.min(o, c.min)), !l && !isNaN(c.max) && (s = Math.max(s, c.max));
    }
    (!i || !l) && (r(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && r(this.getMinMax(!1))), o = wt(o) && !isNaN(o) ? o : +a.startOf(Date.now(), n), s = wt(s) && !isNaN(s) ? s : +a.endOf(Date.now(), n) + 1, this.min = Math.min(o, s - 1), this.max = Math.max(o + 1, s);
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
    const s = this.min, i = this.max, l = zr(o, s, i);
    return this._unit = a.unit || (n.autoSkip ? Js(a.minUnit, this.min, this.max, this._getLabelCapacity(s)) : _h(this, l.length, a.minUnit, this.min, this.max)), this._majorUnit = !n.major.enabled || this._unit === "year" ? void 0 : wh(this._unit), this.initOffsets(o), t.reverse && l.reverse(), ti(this, l, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let a = 0, n = 0, o, s;
    this.options.offset && t.length && (o = this.getDecimalForValue(t[0]), t.length === 1 ? a = 1 - o : a = (this.getDecimalForValue(t[1]) - o) / 2, s = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? n = s : n = (s - this.getDecimalForValue(t[t.length - 2])) / 2);
    const i = t.length < 3 ? 0.5 : 0.25;
    a = it(a, 0, i), n = it(n, 0, i), this._offsets = {
      start: a,
      end: n,
      factor: 1 / (a + 1 + n)
    };
  }
  _generate() {
    const t = this._adapter, a = this.min, n = this.max, o = this.options, s = o.time, i = s.unit || Js(s.minUnit, a, n, this._getLabelCapacity(a)), l = De(o.ticks.stepSize, 1), r = i === "week" ? s.isoWeekday : !1, c = qa(r) || r === !0, u = {};
    let f = a, g, b;
    if (c && (f = +t.startOf(f, "isoWeek", r)), f = +t.startOf(f, c ? "day" : i), t.diff(n, a, i) > 1e5 * l)
      throw new Error(a + " and " + n + " are too far apart with stepSize of " + l + " " + i);
    const m = o.ticks.source === "data" && this.getDataTimestamps();
    for (g = f, b = 0; g < n; g = +t.add(g, l, i), b++)
      ei(u, g, m);
    return (g === n || o.bounds === "ticks" || b === 1) && ei(u, g, m), Object.keys(u).sort(Zs).map((v) => +v);
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
      return je(i, [
        t,
        a,
        n
      ], this);
    const l = s.time.displayFormats, r = this._unit, c = this._majorUnit, u = r && l[r], f = c && l[c], g = n[a], b = c && f && g && g.major;
    return this._adapter.format(t, o || (b ? f : u));
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
    const a = this.options.ticks, n = this.ctx.measureText(t).width, o = zt(this.isHorizontal() ? a.maxRotation : a.minRotation), s = Math.cos(o), i = Math.sin(o), l = this._resolveTickFontOptions(0).size;
    return {
      w: n * s + l * i,
      h: n * i + l * s
    };
  }
  _getLabelCapacity(t) {
    const a = this.options.time, n = a.displayFormats, o = n[a.unit] || n.millisecond, s = this._tickFormatFunction(t, 0, ti(this, [
      t
    ], this._majorUnit), o), i = this._getLabelSize(s), l = Math.floor(this.isHorizontal() ? this.width / i.w : this.height / i.h) - 1;
    return l > 0 ? l : 1;
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
      t.push(Qs(this, o[a]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return Pi(t.sort(Zs));
  }
}
function vn(e, t, a) {
  let n = 0, o = e.length - 1, s, i, l, r;
  a ? (t >= e[n].pos && t <= e[o].pos && ({ lo: n, hi: o } = ua(e, "pos", t)), { pos: s, time: l } = e[n], { pos: i, time: r } = e[o]) : (t >= e[n].time && t <= e[o].time && ({ lo: n, hi: o } = ua(e, "time", t)), { time: s, pos: l } = e[n], { time: i, pos: r } = e[o]);
  const c = i - s;
  return c ? l + (r - l) * (t - s) / c : l;
}
class NM extends ai {
  static id = "timeseries";
  static defaults = ai.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), a = this._table = this.buildLookupTable(t);
    this._minPos = vn(a, this.min), this._tableRange = vn(a, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: a, max: n } = this, o = [], s = [];
    let i, l, r, c, u;
    for (i = 0, l = t.length; i < l; ++i)
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
    for (i = 0, l = o.length; i < l; ++i)
      u = o[i + 1], r = o[i - 1], c = o[i], Math.round((u + r) / 2) !== c && s.push({
        time: c,
        pos: i / (l - 1)
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
    return (vn(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const a = this._offsets, n = this.getDecimalForPixel(t) / a.factor - a.end;
    return vn(this._table, n * this._tableRange + this._minPos, !0);
  }
}
const pl = {
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
}, $h = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
}, Sh = {
  type: {
    type: String,
    required: !0
  },
  destroyDelay: {
    type: Number,
    default: 0
    // No delay by default
  },
  ...pl,
  ...$h
}, Mh = Gl[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function ya(e) {
  return Ci(e) ? to(e) : e;
}
function Dh(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return Ci(t) ? new Proxy(e, {}) : e;
}
function Ah(e, t) {
  const a = e.options;
  a && t && Object.assign(a, t);
}
function bl(e, t) {
  e.labels = t;
}
function vl(e, t, a) {
  const n = [];
  e.datasets = t.map((o) => {
    const s = e.datasets.find((i) => i[a] === o[a]);
    return !s || !o.data || n.includes(s) ? {
      ...o
    } : (n.push(s), Object.assign(s, o), s);
  });
}
function Th(e, t) {
  const a = {
    labels: [],
    datasets: []
  };
  return bl(a, e.labels), vl(a, e.datasets, t), a;
}
const Bh = fe({
  props: Sh,
  setup(e, t) {
    let { expose: a, slots: n } = t;
    const o = ne(null), s = wi(null);
    a({
      chart: s
    });
    const i = () => {
      if (!o.value) return;
      const { type: c, data: u, options: f, plugins: g, datasetIdKey: b } = e, m = Th(u, b), v = Dh(m, u);
      s.value = new aa(o.value, {
        type: c,
        data: v,
        options: {
          ...f
        },
        plugins: g
      });
    }, l = () => {
      const c = to(s.value);
      c && (e.destroyDelay > 0 ? setTimeout(() => {
        c.destroy(), s.value = null;
      }, e.destroyDelay) : (c.destroy(), s.value = null));
    }, r = (c) => {
      c.update(e.updateMode);
    };
    return Je(i), at(l), Le([
      () => e.options,
      () => e.data
    ], (c, u) => {
      let [f, g] = c, [b, m] = u;
      const v = to(s.value);
      if (!v)
        return;
      let p = !1;
      if (f) {
        const y = ya(f), k = ya(b);
        y && y !== k && (Ah(v, y), p = !0);
      }
      if (g) {
        const y = ya(g.labels), k = ya(m.labels), _ = ya(g.datasets), w = ya(m.datasets);
        y !== k && (bl(v.config.data, y), p = !0), _ && _ !== w && (vl(v.config.data, _, e.datasetIdKey), p = !0);
      }
      p && We(() => {
        r(v);
      });
    }, {
      deep: !0
    }), () => He("canvas", {
      role: "img",
      "aria-label": e.ariaLabel,
      "aria-describedby": e.ariaDescribedby,
      ref: o
    }, [
      He("p", {}, [
        n.default ? n.default() : ""
      ])
    ]);
  }
});
function Io(e, t) {
  return aa.register(t), fe({
    props: pl,
    setup(a, n) {
      let { expose: o } = n;
      const s = wi(null), i = (l) => {
        s.value = l?.chart;
      };
      return o({
        chart: s
      }), () => He(Bh, Mh({
        ref: i
      }, {
        type: e,
        ...a
      }));
    }
  });
}
const Lh = /* @__PURE__ */ Io("bar", xd), Rh = /* @__PURE__ */ Io("line", wd), Ih = /* @__PURE__ */ Io("pie", Cd), ni = {
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
}, oi = {
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
}, Ph = [
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
  const t = ne("light");
  let a = null;
  const n = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", o = $(() => e?.value ? e.value : t.value), s = $(() => o.value === "dark"), i = $(() => s.value ? oi : ni), l = () => {
    typeof document > "u" || (t.value = n(), a = new MutationObserver((c) => {
      for (const u of c)
        u.attributeName === "class" && (t.value = n());
    }), a.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["class"]
    }));
  }, r = () => {
    a && (a.disconnect(), a = null);
  };
  return Je(() => {
    l();
  }), at(() => {
    r();
  }), e && Le(e, () => {
  }), {
    isDark: s,
    currentTheme: o,
    colors: i,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: ni,
    darkColors: oi,
    chartSeriesColors: Ph
  };
}
const Ja = 5, Po = 8, Eh = /^x\d*$/, Oh = /^y\d*$/;
function yl(e) {
  if (!e || typeof e != "object") return e;
  const t = { ...e }, a = t.scales;
  if (!a || typeof a != "object") return t;
  const n = { ...a };
  for (const o of Object.keys(n)) {
    const s = n[o];
    if (!s || typeof s != "object") continue;
    const i = { ...s }, l = i.ticks, r = l && typeof l == "object" ? { ...l } : {};
    if (Eh.test(o) && (r.maxTicksLimit = Po, r.autoSkip = !0, r.minRotation = 0, r.maxRotation = 0, r.autoSkipPadding = r.autoSkipPadding ?? 8), Oh.test(o)) {
      if (i.type === "category") {
        i.ticks = r, n[o] = i;
        continue;
      }
      if (Array.isArray(r.values) && r.values.length > 0)
        r.maxTicksLimit = r.values.length;
      else if (r.stepSize != null) {
        const c = Number(i.min ?? i.suggestedMin ?? 0), u = Number(i.max ?? i.suggestedMax ?? 0), f = Number(r.stepSize);
        u > c && f > 0 ? r.maxTicksLimit = Math.floor((u - c) / f) + 1 : r.maxTicksLimit = Ja;
      } else
        r.maxTicksLimit = Ja;
    }
    i.ticks = r, n[o] = i;
  }
  return t.scales = n, t;
}
const gt = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Fh = ["titleFont", "bodyFont", "footerFont"];
function xl(e, t = gt) {
  if (!e || typeof e != "object") return e;
  const a = { ...e }, n = typeof a.font == "object" && a.font !== null ? a.font : {};
  if (a.font = { ...n, family: t }, a.scales && typeof a.scales == "object") {
    const o = { ...a.scales };
    for (const s of Object.keys(o)) {
      const i = o[s];
      if (!i || typeof i != "object") continue;
      const l = { ...i }, r = l.ticks;
      if (r && typeof r == "object") {
        const u = { ...r }, f = typeof u.font == "object" && u.font !== null ? u.font : {};
        u.font = { ...f, family: t }, l.ticks = u;
      }
      const c = l.title;
      if (c && typeof c == "object") {
        const u = { ...c }, f = typeof u.font == "object" && u.font !== null ? u.font : {};
        u.font = { ...f, family: t }, l.title = u;
      }
      o[s] = l;
    }
    a.scales = o;
  }
  if (a.plugins && typeof a.plugins == "object") {
    const o = { ...a.plugins }, s = o.legend;
    if (s && typeof s == "object") {
      const l = { ...s }, r = l.labels;
      if (r && typeof r == "object") {
        const c = { ...r }, u = typeof c.font == "object" && c.font !== null ? c.font : {};
        c.font = { ...u, family: t }, l.labels = c;
      }
      o.legend = l;
    }
    const i = o.tooltip;
    if (i && typeof i == "object") {
      const l = { ...i };
      for (const r of Fh) {
        const c = l[r];
        c && typeof c == "object" && (l[r] = { ...c, family: t });
      }
      o.tooltip = l;
    }
    a.plugins = o;
  }
  return a;
}
const si = 10, Vh = /* @__PURE__ */ fe({
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
    aa.register(gl, ml, nh, hl, Ro, Lo), aa.defaults.font.family = gt;
    const { isDark: n, colors: o } = Me($e(a, "theme")), s = $(() => a.data), i = (g) => typeof g == "string" ? g.charAt(0).toUpperCase() + g.slice(1).toLowerCase() : g, l = (g) => typeof g != "string" ? g : a.uppercaseLegendLabels ? g.toUpperCase() : i(g), r = (g, b) => g.length <= b ? g : `${g.slice(0, Math.max(1, b - 1))}…`;
    function c(g, b) {
      if (b == null) return g;
      if (Array.isArray(b) || typeof b != "object" || g == null || Array.isArray(g) || typeof g != "object") return b;
      const m = { ...g };
      for (const v of Object.keys(b)) {
        const p = b[v];
        p !== void 0 && (m[v] = c(g[v], p));
      }
      return m;
    }
    const u = $(() => {
      const g = {
        font: {
          family: gt
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
                family: gt,
                size: 13,
                weight: "500"
              },
              padding: 12,
              boxWidth: si,
              boxHeight: si,
              usePointStyle: !1,
              generateLabels: function(m) {
                return m.data.datasets.map((p, y) => {
                  const k = Array.isArray(p.backgroundColor) ? p.backgroundColor[0] : p.backgroundColor, _ = Array.isArray(p.borderColor) ? p.borderColor[0] : p.borderColor, w = typeof _ == "string" && _.length > 0 ? _ : typeof k == "string" && k.length > 0 ? k : o.value.textSecondary;
                  return {
                    text: l(p.label || ""),
                    fillStyle: typeof k == "string" ? k : w,
                    strokeStyle: w,
                    lineWidth: 0,
                    fontColor: w,
                    hidden: !m.isDatasetVisible(y),
                    index: y,
                    datasetIndex: y
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
              family: gt,
              size: 13,
              weight: "600"
            },
            bodyFont: {
              family: gt,
              size: 12,
              weight: "500"
            },
            boxPadding: 6,
            callbacks: {
              title: function(m) {
                return m.length > 0 ? String(i(m[0].label)) : "";
              },
              label: function(m) {
                let v = String(i(m.dataset.label || ""));
                v && (v += ": ");
                const y = (m.chart?.options?.indexAxis ?? "x") === "y" ? m.parsed.x : m.parsed.y;
                return y != null && (v += y), v;
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
              maxTicksLimit: Ja,
              font: {
                family: gt,
                size: 12,
                weight: "500"
              },
              color: o.value.textSecondary,
              padding: 8,
              callback: function(m) {
                return i(m);
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
              maxTicksLimit: Po,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: gt,
                size: 12,
                weight: "500"
              },
              color: o.value.textSecondary,
              padding: 8,
              callback: function(m) {
                const v = this.getLabelForValue(m);
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
      }, b = a.options ? c(g, a.options) : g;
      if (b.indexAxis === "y") {
        b.scales = b.scales ?? {}, b.scales.x = {
          type: "linear",
          beginAtZero: !0,
          ...b.scales.x
        };
        const { beginAtZero: m, ticks: v, ...p } = b.scales.y ?? {}, y = a.data.labels?.length ?? 0, k = a.categoryLabelMaxLength ?? 20;
        b.scales.y = {
          type: "category",
          ...p,
          ticks: {
            ...v,
            autoSkip: !1,
            maxTicksLimit: y > 0 ? y : Ja,
            callback: function(_) {
              const w = this.getLabelForValue(_), C = typeof w == "string" ? w : String(w ?? "");
              return r(C, k);
            }
          }
        };
      }
      return xl(
        yl(b)
      );
    }), f = $(() => a.heightPx ?? 230);
    return t({ isDark: n }), (g, b) => (h(), x("div", {
      class: "relative w-full shrink-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]",
      style: Ce({ height: `${f.value}px` })
    }, [
      z(L(Lh), {
        data: s.value,
        options: u.value
      }, null, 8, ["data", "options"])
    ], 4));
  }
}), be = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [n, o] of t)
    a[n] = o;
  return a;
}, $t = /* @__PURE__ */ be(Vh, [["__scopeId", "data-v-1d64fb88"]]), Nh = { class: "chart-line-root flex h-full min-h-[230px] w-full shrink-0 flex-col bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] min-w-0" }, zh = { class: "chart-line-canvas-host relative min-h-0 w-full flex-1" }, jh = {
  key: 0,
  class: "chart-line-indicators mt-0 flex shrink-0 list-none flex-nowrap items-center justify-center gap-x-4 overflow-x-auto overflow-y-hidden px-1 pb-0.5 pt-0.5",
  role: "list"
}, Hh = ["aria-pressed", "aria-label", "onClick"], Wh = {
  class: "inline-flex shrink-0 items-center",
  "aria-hidden": "true"
}, Kh = /* @__PURE__ */ fe({
  __name: "ChartLine",
  props: {
    data: {},
    options: {},
    uppercaseLegendLabels: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const a = e;
    aa.register(
      gl,
      ml,
      Zu,
      Gu,
      hl,
      Ro,
      Lo
    ), aa.defaults.font.family = gt;
    const n = ne(null), { isDark: o, colors: s } = Me($e(a, "theme")), i = $(() => s.value.bgCard), l = $(() => {
      const p = i.value;
      return {
        labels: a.data.labels,
        datasets: a.data.datasets.map((y) => {
          const k = y.borderColor, _ = Array.isArray(k) ? k[0] : k, w = typeof _ == "string" && _.length > 0 ? _ : s.value.textSecondary, C = y.pointBackgroundColor !== void 0 ? y.pointBackgroundColor : p, M = y.pointHoverBackgroundColor !== void 0 ? y.pointHoverBackgroundColor : C, S = y.pointBorderWidth ?? 2, I = y.pointHoverBorderWidth ?? S;
          return {
            ...y,
            fill: y.fill ?? !1,
            clip: y.clip ?? !1,
            pointBackgroundColor: C,
            pointHoverBackgroundColor: M,
            pointBorderColor: y.pointBorderColor ?? w,
            pointHoverBorderColor: y.pointHoverBorderColor ?? w,
            pointBorderWidth: S,
            pointHoverBorderWidth: I
          };
        })
      };
    }), r = (p) => typeof p == "string" ? p.charAt(0).toUpperCase() + p.slice(1).toLowerCase() : p, c = (p) => typeof p != "string" ? p : a.uppercaseLegendLabels ? p.toUpperCase() : r(p);
    function u(p) {
      const y = p.borderColor, k = Array.isArray(y) ? y[0] : y;
      return typeof k == "string" && k.length > 0 ? k : s.value.textSecondary;
    }
    const f = $(
      () => l.value.datasets.map((p, y) => ({
        key: `${p.label ?? "dataset"}-${y}`,
        label: c(p.label || ""),
        color: u(p)
      }))
    ), g = ne([]);
    Le(
      () => l.value.datasets.length,
      (p) => {
        const y = Array.from({ length: p }, (k, _) => g.value[_] ?? !0);
        g.value = y;
      },
      { immediate: !0 }
    );
    function b(p) {
      const k = n.value?.chart;
      if (!k || p < 0 || p >= k.data.datasets.length) return;
      const _ = !k.isDatasetVisible(p);
      k.setDatasetVisibility(p, _), g.value[p] = _, k.update();
    }
    function m(p, y) {
      if (y == null) return p;
      if (Array.isArray(y) || typeof y != "object" || p == null || Array.isArray(p) || typeof p != "object") return y;
      const k = { ...p };
      for (const _ of Object.keys(y)) {
        const w = y[_];
        w !== void 0 && (k[_] = m(p[_], w));
      }
      return k;
    }
    const v = $(() => {
      const p = {
        font: {
          family: gt
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
              family: gt,
              size: 14,
              weight: "600"
            },
            bodyFont: {
              family: gt,
              size: 13
            },
            callbacks: {
              title: function(_) {
                return _.length > 0 ? String(r(_[0].label)) : "";
              },
              label: function(_) {
                let w = String(r(_.dataset.label || ""));
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
              maxTicksLimit: Po,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: gt,
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
              maxTicksLimit: Ja,
              font: {
                family: gt,
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
      }, y = a.options ? m(p, a.options) : p;
      return xl(
        yl(y)
      );
    });
    return t({ isDark: o }), (p, y) => (h(), x("div", Nh, [
      d("div", zh, [
        z(L(Rh), {
          ref_key: "lineChartRef",
          ref: n,
          data: l.value,
          options: v.value
        }, null, 8, ["data", "options"])
      ]),
      f.value.length > 0 ? (h(), x("ul", jh, [
        (h(!0), x(he, null, pe(f.value, (k, _) => (h(), x("li", {
          key: k.key,
          role: "listitem"
        }, [
          d("button", {
            type: "button",
            class: Z(["inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[11px] font-medium leading-snug transition-opacity outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-secondary)] dark:focus-visible:ring-offset-[#1a1a1d]", g.value[_] !== !1 ? "opacity-100" : "opacity-45 line-through"]),
            style: Ce({ color: k.color }),
            "aria-pressed": g.value[_] !== !1,
            "aria-label": `${k.label}. ${g.value[_] !== !1 ? "Visible" : "Oculta"}. Pulsa para alternar.`,
            onClick: (w) => b(_)
          }, [
            d("span", Wh, [
              y[0] || (y[0] = d("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1)),
              d("span", {
                class: "relative z-[1] box-border size-2 shrink-0 rounded-full border-2 bg-transparent",
                style: Ce({ borderColor: k.color })
              }, null, 4),
              y[1] || (y[1] = d("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1))
            ]),
            d("span", null, A(k.label), 1)
          ], 14, Hh)
        ]))), 128))
      ])) : F("", !0)
    ]));
  }
}), pt = /* @__PURE__ */ be(Kh, [["__scopeId", "data-v-426e23d5"]]), Uh = { class: "chart-container" }, Yh = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", qh = /* @__PURE__ */ fe({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const a = e;
    aa.register(Nu, Ro, Lo);
    const { isDark: n, colors: o } = Me($e(a, "theme")), s = a.data, i = (r) => typeof r == "string" ? r.charAt(0).toUpperCase() + r.slice(1).toLowerCase() : r, l = $(() => a.options ? a.options : {
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
              family: Yh,
              size: 13,
              weight: 500
            },
            padding: 16,
            boxWidth: 14,
            boxHeight: 14,
            borderRadius: 4,
            usePointStyle: !0,
            pointStyle: "circle",
            generateLabels: function(r) {
              const c = r.data;
              return c.labels.length && c.datasets.length ? c.labels.map((u, f) => {
                const b = r.getDatasetMeta(0).controller.getStyle(f), v = c.datasets[0].data[f], p = typeof b.backgroundColor == "string" && b.backgroundColor.length > 0 ? b.backgroundColor : o.value.textSecondary;
                return {
                  text: `${i(u)}: ${v}`,
                  fillStyle: b.backgroundColor,
                  strokeStyle: b.borderColor,
                  lineWidth: b.borderWidth,
                  lineDash: b.borderDash,
                  lineDashOffset: b.borderDashOffset,
                  lineJoin: b.borderJoinStyle,
                  fontColor: p,
                  hidden: !r.getDataVisibility(f),
                  index: f
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
            title: function(r) {
              return r.length > 0 ? String(i(r[0].label)) : "";
            },
            label: function(r) {
              const c = r.label || "", u = r.parsed || 0, f = r.dataset.data.reduce((b, m) => b + m, 0), g = (u / f * 100).toFixed(1);
              return `${i(c)}: ${u} (${g}%)`;
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
    return t({ isDark: n }), (r, c) => (h(), x("div", Uh, [
      z(L(Ih), {
        data: L(s),
        options: l.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), Vn = /* @__PURE__ */ be(qh, [["__scopeId", "data-v-0f7806d6"]]), Xh = { class: "chart-container" }, Gh = ["viewBox"], Zh = ["transform"], Qh = ["x", "width", "fill", "stroke"], Jh = ["fill"], ef = ["x1", "y1", "x2", "y2", "stroke"], tf = ["points", "fill"], af = ["x1", "y1", "x2", "y2", "stroke"], nf = ["x", "y", "fill"], of = ["x1", "y1", "x2", "y2", "stroke"], sf = ["points", "fill"], lf = ["transform"], rf = ["y1", "y2"], cf = ["y1", "y2"], df = ["y1", "y2"], uf = ["y1", "y2"], hf = ["y", "height"], ff = ["y1", "y2"], gf = ["y1", "y2"], mf = ["y1", "y2"], pf = ["y1", "y2"], bf = ["y", "height"], vf = ["cy", "stroke", "onMouseenter"], yf = ["cy", "stroke", "onMouseenter"], xf = ["cy", "stroke", "onMouseenter"], kf = ["cy", "stroke", "onMouseenter"], _f = ["y1", "y2", "onMouseenter"], wf = ["y1", "y2", "onMouseenter"], Cf = ["x", "y", "fill"], $f = ["x", "y", "fill"], Sf = ["transform"], Mf = { transform: "translate(-200, 0)" }, Df = ["stroke"], Af = ["fill"], Tf = { transform: "translate(-130, 0)" }, Bf = ["stroke"], Lf = ["fill"], Rf = { transform: "translate(-60, 0)" }, If = ["stroke"], Pf = ["fill"], Ef = { transform: "translate(10, 0)" }, Of = ["stroke"], Ff = ["fill"], Vf = { transform: "translate(80, 0)" }, Nf = ["fill"], zf = { transform: "translate(150, 0)" }, jf = ["fill"], Hf = /* @__PURE__ */ fe({
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
    const a = e, { isDark: n } = Me($e(a, "theme")), o = $(() => ({
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
    })), s = ne({
      visible: !1,
      x: 0,
      y: 0,
      text: ""
    }), i = (g) => typeof g == "string" ? g.charAt(0).toUpperCase() + g.slice(1).toLowerCase() : g, l = (g, b) => {
      const m = g.currentTarget.closest("svg");
      if (!m) return;
      const v = m.getBoundingClientRect(), p = m.createSVGPoint();
      p.x = g.clientX - v.left, p.y = g.clientY - v.top, s.value = {
        visible: !0,
        x: p.x,
        y: p.y - 20,
        text: b
      };
    }, r = (g) => {
      if (s.value.visible) {
        const b = g.currentTarget, m = b.getBoundingClientRect(), v = b.createSVGPoint();
        v.x = g.clientX - m.left, v.y = g.clientY - m.top, s.value.x = v.x, s.value.y = v.y - 20;
      }
    }, c = () => {
      s.value.visible = !1;
    }, u = () => {
      s.value.visible = !1;
    }, f = $(() => {
      const g = [], m = a.chartHeight - a.chartMargin - a.chartBottomMargin;
      for (let v = 1; v <= 10; v++) {
        const p = v, y = (p - 1) / 9, k = a.chartMargin + m - y * m;
        g.push({ value: p, y: k });
      }
      return g;
    });
    return t({ isDark: n }), (g, b) => (h(), x("div", Xh, [
      (h(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: Ce(`min-height: ${e.chartHeight}px;`),
        onMousemove: r,
        onMouseleave: c
      }, [
        s.value.visible ? (h(), x("g", {
          key: 0,
          transform: `translate(${s.value.x}, ${s.value.y})`
        }, [
          d("rect", {
            x: -(s.value.text.length * 6 + 10),
            y: -16,
            width: s.value.text.length * 12 + 20,
            height: "24",
            fill: o.value.tooltipBg,
            rx: "6",
            stroke: o.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, Qh),
          d("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: o.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, A(s.value.text), 9, Jh)
        ], 8, Zh)) : F("", !0),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: o.value.axis,
          "stroke-width": "2"
        }, null, 8, ef),
        d("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: o.value.axis
        }, null, 8, tf),
        (h(!0), x(he, null, pe(f.value, (m, v) => (h(), x(he, { key: v }, [
          d("line", {
            x1: e.chartMargin - 6,
            y1: m.y,
            x2: e.chartMargin,
            y2: m.y,
            stroke: o.value.tickLine,
            "stroke-width": "1"
          }, null, 8, af),
          d("text", {
            x: e.chartMargin - 12,
            y: m.y + 4,
            "text-anchor": "end",
            fill: o.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(m.value), 9, nf)
        ], 64))), 128)),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: o.value.axis,
          "stroke-width": "2"
        }, null, 8, of),
        d("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: o.value.axis
        }, null, 8, sf),
        (h(!0), x(he, null, pe(e.boxplotData, (m, v) => (h(), x(he, { key: v }, [
          d("g", {
            transform: `translate(${m.centerX}, 0)`
          }, [
            m.isTotal ? (h(), x(he, { key: 0 }, [
              d("line", {
                x1: 0,
                y1: m.minY,
                x2: 0,
                y2: m.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, rf),
              d("line", {
                x1: 0,
                y1: m.q3Y,
                x2: 0,
                y2: m.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, cf),
              d("line", {
                x1: -18,
                y1: m.minY,
                x2: 18,
                y2: m.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, df),
              d("line", {
                x1: -18,
                y1: m.maxY,
                x2: 18,
                y2: m.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, uf),
              d("rect", {
                x: -24,
                y: m.q3Y,
                width: "48",
                height: m.q1Y - m.q3Y,
                fill: "#8b5cf6",
                "fill-opacity": "0.15",
                stroke: "#8b5cf6",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, hf)
            ], 64)) : (h(), x(he, { key: 1 }, [
              d("line", {
                x1: 0,
                y1: m.minY,
                x2: 0,
                y2: m.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, ff),
              d("line", {
                x1: 0,
                y1: m.q3Y,
                x2: 0,
                y2: m.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, gf),
              d("line", {
                x1: -18,
                y1: m.minY,
                x2: 18,
                y2: m.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, mf),
              d("line", {
                x1: -18,
                y1: m.maxY,
                x2: 18,
                y2: m.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, pf),
              d("rect", {
                x: -24,
                y: m.q3Y,
                width: "48",
                height: m.q1Y - m.q3Y,
                fill: "#C67DFF",
                "fill-opacity": "0.15",
                stroke: "#C67DFF",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, bf)
            ], 64)),
            d("circle", {
              cx: 0,
              cy: m.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (p) => l(p, `Min: ${m.min.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, vf),
            d("circle", {
              cx: 0,
              cy: m.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (p) => l(p, `Q1: ${m.q1.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, yf),
            d("circle", {
              cx: 0,
              cy: m.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (p) => l(p, `Q3: ${m.q3.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, xf),
            d("circle", {
              cx: 0,
              cy: m.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (p) => l(p, `Max: ${m.max.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, kf),
            d("line", {
              x1: -24,
              y1: m.medianY,
              x2: 24,
              y2: m.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (p) => l(p, `Median: ${m.median.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, _f),
            m.averageY ? (h(), x("line", {
              key: 2,
              x1: -24,
              y1: m.averageY,
              x2: 24,
              y2: m.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (p) => l(p, `Avg: ${m.average.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, wf)) : F("", !0)
          ], 8, lf),
          d("text", {
            x: m.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: o.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(i(m.label)), 9, Cf),
          m.responseCount ? (h(), x("text", {
            key: 0,
            x: m.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: o.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(m.responseCount), 9, $f)) : F("", !0)
        ], 64))), 128)),
        e.showLegend ? (h(), x("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          d("g", Mf, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Df),
            d("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Af)
          ]),
          d("g", Tf, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Bf),
            d("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, Lf)
          ]),
          d("g", Rf, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, If),
            d("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, Pf)
          ]),
          d("g", Ef, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Of),
            d("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Ff)
          ]),
          d("g", Vf, [
            b[0] || (b[0] = d("line", {
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
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, Nf)
          ]),
          d("g", zf, [
            b[1] || (b[1] = d("line", {
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
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, jf)
          ])
        ], 8, Sf)) : F("", !0)
      ], 44, Gh))
    ]));
  }
}), Wf = /* @__PURE__ */ be(Hf, [["__scopeId", "data-v-9ac5c075"]]), Kf = { class: "chart-container" }, Uf = ["viewBox"], Yf = ["x1", "y1", "x2", "y2", "stroke"], qf = ["points", "fill"], Xf = ["x1", "y1", "x2", "y2", "stroke"], Gf = ["x1", "y1", "x2", "y2", "stroke"], Zf = ["x", "y", "fill"], Qf = ["x", "y", "fill", "transform"], Jf = ["x1", "y1", "x2", "y2", "stroke"], eg = ["points", "fill"], tg = ["transform"], ag = ["y1", "y2", "stroke", "onMouseenter"], ng = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], og = ["x1", "y1", "x2", "y2", "onMouseenter"], sg = ["x1", "y1", "x2", "y2", "onMouseenter"], ig = ["cy", "stroke", "onMouseenter"], lg = ["cy", "stroke", "onMouseenter"], rg = ["x", "y", "fill"], cg = ["x", "y", "fill"], dg = ["transform"], ug = { transform: "translate(-180, 0)" }, hg = ["stroke"], fg = ["fill"], gg = { transform: "translate(-120, 0)" }, mg = ["fill"], pg = { transform: "translate(-60, 0)" }, bg = ["fill"], vg = { transform: "translate(0, 0)" }, yg = ["stroke"], xg = ["fill"], kg = { transform: "translate(60, 0)" }, _g = ["fill"], wg = { transform: "translate(130, 0)" }, Cg = ["fill"], $g = ["transform"], Sg = ["x", "y", "width", "height", "fill", "stroke"], Mg = ["y", "fill"], Dg = ["y", "fill"], yn = 10, Ag = 14, Jn = 13, ii = 4, li = 12, Tg = /* @__PURE__ */ fe({
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
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), s = yn + Jn + ii + li + yn, i = $(() => ({
      bg: o.value.tooltipBg,
      border: o.value.tooltipBorder,
      text: o.value.tooltipText,
      secondary: n.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(k, _, w) {
      const C = w ? 0.6 : 0.535;
      return Math.ceil(Math.max(k, 1) * _ * C);
    }
    function r(k, _) {
      return Math.max(
        l(k.length, Jn, !0),
        l(_.length, li, !1),
        52
      ) + Ag * 2;
    }
    function c(k, _, w, C) {
      const M = w / 2, S = 6, I = Math.min(
        Math.max(k, M + S),
        a.chartWidth - M - S
      ), V = S + C + 10, H = a.chartHeight - S + 10, D = Math.min(Math.max(_, V), H);
      return { x: I, y: D };
    }
    const u = $(() => ({
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
    })), f = ne({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), g = (k) => typeof k == "string" ? k.charAt(0).toUpperCase() + k.slice(1).toLowerCase() : k, b = (k, _, w) => {
      const C = k.currentTarget.closest("svg");
      if (!C) return;
      const M = C.getBoundingClientRect(), S = C.createSVGPoint();
      S.x = k.clientX - M.left, S.y = k.clientY - M.top;
      let I = g(_.label), V = "";
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
      const H = r(I, V), D = s;
      let T = S.x, B = S.y - 20;
      const j = c(T, B, H, D);
      T = j.x, B = j.y, f.value = {
        visible: !0,
        x: T,
        y: B,
        title: I,
        text: V,
        width: H,
        height: D
      };
    }, m = (k) => {
      if (f.value.visible) {
        const _ = k.currentTarget, w = _.getBoundingClientRect(), C = _.createSVGPoint();
        C.x = k.clientX - w.left, C.y = k.clientY - w.top;
        let M = C.x, S = C.y - 20;
        const I = c(M, S, f.value.width, f.value.height);
        f.value.x = I.x, f.value.y = I.y;
      }
    }, v = () => {
      f.value.visible = !1;
    }, p = () => {
      f.value.visible = !1;
    }, y = $(() => {
      const k = [], w = a.chartHeight - a.chartMargin - a.chartBottomMargin;
      for (let C = 1; C <= 10; C++) {
        const M = C, S = (M - 1) / 9, I = a.chartMargin + w - S * w;
        k.push({ value: M, y: I });
      }
      return k;
    });
    return t({ isDark: n }), (k, _) => (h(), x("div", Kf, [
      (h(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: Ce(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
        onMousemove: m,
        onMouseleave: v
      }, [
        _[4] || (_[4] = d("defs", null, [
          d("filter", {
            id: "candlestick-tooltip-shadow",
            x: "-50%",
            y: "-50%",
            width: "200%",
            height: "200%"
          }, [
            d("feDropShadow", {
              dx: "0",
              dy: "2",
              stdDeviation: "5",
              "flood-color": "#000000",
              "flood-opacity": "0.3"
            })
          ])
        ], -1)),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, Yf),
        d("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: u.value.axis
        }, null, 8, qf),
        (h(!0), x(he, null, pe(y.value, (w, C) => (h(), x("line", {
          key: `grid-${C}`,
          x1: e.chartMargin,
          y1: w.y,
          x2: e.chartWidth - e.chartMargin,
          y2: w.y,
          stroke: u.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Xf))), 128)),
        (h(!0), x(he, null, pe(y.value, (w, C) => (h(), x(he, { key: C }, [
          d("line", {
            x1: e.chartMargin - 6,
            y1: w.y,
            x2: e.chartMargin,
            y2: w.y,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Gf),
          d("text", {
            x: e.chartMargin - 12,
            y: w.y + 4,
            "text-anchor": "end",
            fill: u.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(w.value), 9, Zf)
        ], 64))), 128)),
        d("text", {
          x: e.chartMargin - 35,
          y: e.chartHeight / 2,
          "text-anchor": "middle",
          fill: u.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif",
          transform: `rotate(-90, ${e.chartMargin - 35}, ${e.chartHeight / 2})`
        }, A(g(e.yAxisLabel)), 9, Qf),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, Jf),
        d("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: u.value.axis
        }, null, 8, eg),
        (h(!0), x(he, null, pe(e.candlestickData, (w, C) => (h(), x(he, { key: C }, [
          d("g", {
            transform: `translate(${w.centerX}, 0)`
          }, [
            d("line", {
              x1: 0,
              y1: w.highY,
              x2: 0,
              y2: w.lowY,
              stroke: w.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              class: "hover-line",
              onMouseenter: (M) => b(M, w, "wick"),
              onMouseleave: p,
              style: { cursor: "pointer" }
            }, null, 40, ag),
            d("rect", {
              x: -e.candleWidth / 2,
              y: Math.min(w.q1Y, w.q3Y) - (Math.abs(w.q3Y - w.q1Y) < 4 ? 4 : 0),
              width: e.candleWidth,
              height: Math.max(8, Math.abs(w.q3Y - w.q1Y)),
              fill: w.isTotal ? "rgba(139, 92, 246, 0.15)" : "rgba(198, 125, 255, 0.15)",
              stroke: w.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              rx: "4",
              class: "hover-rect",
              onMouseenter: (M) => b(M, w, "body"),
              onMouseleave: p,
              style: { cursor: "pointer" }
            }, null, 40, ng),
            w.medianY ? (h(), x("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: w.medianY,
              x2: e.candleWidth / 2,
              y2: w.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (M) => b(M, w, "median"),
              onMouseleave: p,
              style: { cursor: "pointer" }
            }, null, 40, og)) : F("", !0),
            w.averageY ? (h(), x("line", {
              key: 1,
              x1: -e.candleWidth / 2,
              y1: w.averageY,
              x2: e.candleWidth / 2,
              y2: w.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (M) => b(M, w, "average"),
              onMouseleave: p,
              style: { cursor: "pointer" }
            }, null, 40, sg)) : F("", !0),
            d("circle", {
              cx: 0,
              cy: w.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: u.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (M) => b(M, w, "min"),
              onMouseleave: p,
              style: { cursor: "pointer" }
            }, null, 40, ig),
            d("circle", {
              cx: 0,
              cy: w.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: u.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (M) => b(M, w, "max"),
              onMouseleave: p,
              style: { cursor: "pointer" }
            }, null, 40, lg)
          ], 8, tg),
          d("text", {
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: u.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(g(w.label)), 9, rg),
          w.responseCount ? (h(), x("text", {
            key: 0,
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: u.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(w.responseCount), 9, cg)) : F("", !0)
        ], 64))), 128)),
        e.showLegend ? (h(), x("g", {
          key: 0,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          d("g", ug, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: u.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, hg),
            d("text", {
              x: "10",
              y: "4",
              fill: u.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, fg)
          ]),
          d("g", gg, [
            _[0] || (_[0] = d("rect", {
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
              fill: u.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, mg)
          ]),
          d("g", pg, [
            _[1] || (_[1] = d("rect", {
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
              fill: u.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, bg)
          ]),
          d("g", vg, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: u.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, yg),
            d("text", {
              x: "10",
              y: "4",
              fill: u.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, xg)
          ]),
          d("g", kg, [
            _[2] || (_[2] = d("line", {
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
              fill: u.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, _g)
          ]),
          d("g", wg, [
            _[3] || (_[3] = d("line", {
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
              fill: u.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, Cg)
          ])
        ], 8, dg)) : F("", !0),
        f.value.visible ? (h(), x("g", {
          key: 1,
          "pointer-events": "none",
          transform: `translate(${f.value.x}, ${f.value.y})`
        }, [
          d("rect", {
            filter: "url(#candlestick-tooltip-shadow)",
            x: -f.value.width / 2,
            y: -f.value.height - 10,
            width: f.value.width,
            height: f.value.height,
            fill: i.value.bg,
            rx: "8",
            stroke: i.value.border,
            "stroke-width": "1"
          }, null, 8, Sg),
          d("text", {
            x: "0",
            y: -f.value.height - 10 + yn,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(f.value.title), 9, Mg),
          d("text", {
            x: "0",
            y: -f.value.height - 10 + yn + Jn + ii,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(f.value.text), 9, Dg)
        ], 8, $g)) : F("", !0)
      ], 44, Uf))
    ]));
  }
}), Bg = /* @__PURE__ */ be(Tg, [["__scopeId", "data-v-22efd66d"]]), Lg = ["viewBox"], Rg = ["x1", "y1", "x2", "y2", "stroke"], Ig = ["x1", "y1", "x2", "y2", "stroke"], Pg = ["points", "fill"], Eg = ["x1", "y1", "x2", "y2", "stroke"], Og = ["x", "y", "fill"], Fg = ["x", "y", "fill", "transform"], Vg = ["x1", "y1", "x2", "y2", "stroke"], Ng = ["points", "fill"], zg = ["x1", "y1", "x2", "y2", "stroke"], jg = ["x", "y", "fill"], Hg = ["x", "y", "fill"], Wg = ["d"], Kg = ["x", "y", "width", "height", "onMouseenter"], Ug = ["x1", "y1", "x2", "y2"], Yg = ["x", "y"], qg = ["x1", "y1", "x2", "y2"], Xg = ["x", "y"], Gg = ["x1", "y1", "x2", "y2"], Zg = ["x", "y"], Qg = ["x1", "y1", "x2", "y2"], Jg = ["x", "y"], em = ["x1", "y1", "x2", "y2"], tm = ["x", "y"], am = ["x1", "y1", "x2", "y2"], nm = ["x", "y"], om = ["transform"], sm = { transform: "translate(-220, 0)" }, im = ["fill"], lm = { transform: "translate(-140, 0)" }, rm = ["fill"], cm = { transform: "translate(-80, 0)" }, dm = ["fill"], um = { transform: "translate(-20, 0)" }, hm = ["fill"], fm = { transform: "translate(60, 0)" }, gm = ["fill"], mm = { transform: "translate(130, 0)" }, pm = ["fill"], bm = { transform: "translate(180, 0)" }, vm = ["fill"], ym = ["transform"], xm = ["x", "y", "width", "height", "fill", "stroke"], km = ["y", "fill"], _m = ["y", "fill"], xn = 10, wm = 14, eo = 13, ri = 12, ci = 4, Cm = /* @__PURE__ */ fe({
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
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), s = xn + eo + ci + ri + xn, i = $(() => ({
      bg: o.value.tooltipBg,
      border: o.value.tooltipBorder,
      text: o.value.tooltipText,
      secondary: n.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(ae, G, P) {
      const X = P ? 0.6 : 0.535;
      return Math.ceil(Math.max(ae, 1) * G * X);
    }
    function r(ae, G) {
      return Math.max(
        l(ae.length, eo, !0),
        l(G.length, ri, !1),
        52
      ) + wm * 2;
    }
    function c(ae, G, P, X) {
      const te = P / 2, E = 6, Q = Math.min(
        Math.max(ae, te + E),
        a.chartWidth - te - E
      ), se = E + X + 10, me = a.chartHeight - E + 10, we = Math.min(Math.max(G, se), me);
      return { x: Q, y: we };
    }
    const u = $(() => ({
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
    })), f = ne({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0,
      /** Centro SVG X de la barra activa; fija tooltip horizontal sobre la columna correcta cuando el SVG escala por CSS */
      anchorX: null
    }), g = $(
      () => a.chartMarginRight ?? a.chartMargin
    ), b = $(() => a.chartMargin + a.plotInset), m = $(
      () => a.chartWidth - g.value - a.plotInset
    ), v = $(() => Math.max(m.value - b.value, 1)), p = $(() => a.chartHeight - a.chartMargin - a.chartBottomMargin), y = $(() => v.value / 10 * 0.52);
    function k(ae) {
      if (ae < 1 || ae > 10) return null;
      const G = v.value / 10;
      return b.value + (ae - 0.5) * G;
    }
    const _ = $(
      () => Array.from({ length: 10 }, (ae, G) => {
        const P = G + 1, X = k(P);
        return X === null ? null : { score: P, x: X };
      }).filter((ae) => ae !== null)
    ), w = $(() => {
      if (!a.histogram || a.histogram.length === 0) return 1;
      const ae = Math.max(...a.histogram.map((P) => P.count || 0), 1), G = Math.max(1, Math.ceil(ae * 0.2));
      return ae + G;
    }), C = $(() => {
      if (!a.histogram || a.histogram.length === 0) return 1;
      const ae = a.averageScore || 0;
      let G = 0, P = 0;
      if (a.histogram.forEach((te) => {
        const E = te.count || 0;
        G += E;
        const Q = te.score - ae;
        P += E * (Q * Q);
      }), G === 0) return 1;
      const X = P / G;
      return Math.sqrt(X) || 1;
    }), M = (ae, G, P) => {
      if (P === 0) return 0;
      const X = 1 / (P * Math.sqrt(2 * Math.PI)), te = -0.5 * Math.pow((ae - G) / P, 2);
      return X * Math.exp(te);
    }, S = $(() => {
      if (!a.histogram || a.histogram.length === 0 || a.averageScore === 0 && C.value === 0) return null;
      const ae = a.averageScore, G = C.value, P = 100, te = Math.max(...a.histogram.map((me) => me.count || 0), 1) / w.value * p.value;
      if (te <= 0) return null;
      let E = 0;
      for (let me = 0; me <= P; me++) {
        const we = 1 + 9 * (me / P), xe = M(we, ae, G);
        xe > E && (E = xe);
      }
      if (E <= 0) return null;
      const Q = te / E, se = [];
      for (let me = 0; me <= P; me++) {
        const we = 1 + 9 * (me / P), xe = M(we, ae, G) * Q, Te = k(we);
        if (Te !== null) {
          const Be = a.chartHeight - a.chartBottomMargin - xe;
          se.push(`${me === 0 ? "M" : "L"} ${Te} ${Be}`);
        }
      }
      return se.join(" ");
    }), I = $(() => {
      if (!a.histogram || a.histogram.length === 0) return [];
      const ae = v.value / 10;
      return a.histogram.map((G) => {
        const P = Number(G.score);
        if (!Number.isFinite(P) || P < 1 || P > 10)
          return null;
        const X = b.value + (P - 0.5) * ae, te = G.count > 0 ? G.count / w.value * p.value : 0, E = a.chartHeight - a.chartBottomMargin - te;
        return {
          score: P,
          count: G.count,
          x: X,
          y: E,
          height: te
        };
      }).filter((G) => G !== null);
    }), V = $(() => k(a.minScore)), H = $(() => k(a.maxScore)), D = $(() => k(a.q1Score)), T = $(() => k(a.medianScore)), B = $(() => k(a.q3Score)), j = $(() => k(a.averageScore)), W = $(() => a.minScore), J = $(() => a.maxScore), re = $(() => a.q1Score), ue = $(() => a.medianScore), q = $(() => a.q3Score), oe = $(() => a.averageScore), R = $(() => {
      const ae = [], G = a.chartMargin - 8, P = 18;
      D.value !== null && ae.push({
        x: D.value,
        y: G,
        value: a.q1Score,
        label: `Q1: ${re.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), T.value !== null && ae.push({
        x: T.value,
        y: G - P,
        value: a.medianScore,
        label: `Median: ${ue.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), j.value !== null && ae.push({
        x: j.value,
        y: G - P,
        value: a.averageScore,
        label: `Avg: ${oe.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), B.value !== null && ae.push({
        x: B.value,
        y: G,
        value: a.q3Score,
        label: `Q3: ${q.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), ae.sort((E, Q) => (E.x || 0) - (Q.x || 0));
      const X = [[], [], []];
      ae.forEach((E) => {
        if (E.x === null) return;
        let Q = -1;
        for (let se = 0; se < X.length; se++) {
          let me = !1;
          for (const we of X[se]) {
            if (we.x === null) continue;
            const xe = Math.abs(E.x - we.x), Te = (E.width + we.width) / 2 + 10;
            if (xe < Te) {
              me = !0;
              break;
            }
          }
          if (!me) {
            Q = se;
            break;
          }
        }
        Q === -1 && (Q = X.length - 1), E.y = G - Q * P, X[Q].push(E);
      });
      const te = 15;
      return ae.forEach((E) => {
        E.y < te && (E.y = te);
      }), ae;
    }), K = (ae) => R.value.find((P) => P.id === ae)?.y || a.chartMargin - 10, Y = $(() => {
      const ae = [];
      for (let P = 0; P <= 5; P++) {
        const X = Math.round(w.value / 5 * P), te = a.chartHeight - a.chartBottomMargin - P / 5 * p.value;
        ae.push({ value: X, y: te });
      }
      return ae;
    });
    function N(ae, G, P) {
      const X = ae.createSVGPoint();
      X.x = G, X.y = P;
      const te = ae.getScreenCTM();
      if (!te) {
        const Q = ae.getBoundingClientRect();
        return { x: G - Q.left, y: P - Q.top };
      }
      const E = X.matrixTransform(te.inverse());
      return { x: E.x, y: E.y };
    }
    const ie = (ae, G) => {
      a.interactive && ye(ae, G);
    }, ce = () => {
      a.interactive && de();
    }, ye = (ae, G) => {
      const P = ae.currentTarget.closest("svg");
      if (!P) return;
      const { x: X, y: te } = N(P, ae.clientX, ae.clientY), E = `Score: ${G.score}`, Q = `Count: ${Number(G.count ?? 0).toLocaleString()}`, se = r(E, Q), me = s, we = typeof G?.x == "number" ? G.x : X;
      let xe = te - 20;
      const Te = c(we, xe, se, me);
      f.value = {
        visible: !0,
        x: Te.x,
        y: Te.y,
        title: E,
        text: Q,
        width: se,
        height: me,
        anchorX: typeof G?.x == "number" ? G.x : null
      };
    }, U = (ae) => {
      if (a.interactive && f.value.visible) {
        const G = ae.currentTarget, { x: P, y: X } = N(G, ae.clientX, ae.clientY), te = f.value.anchorX, E = te != null && Number.isFinite(te) ? te : P;
        let Q = X - 20;
        const se = c(E, Q, f.value.width, f.value.height);
        f.value.x = se.x, f.value.y = se.y;
      }
    }, le = () => {
      de();
    }, de = () => {
      f.value.visible = !1, f.value.anchorX = null;
    };
    return t({ isDark: n }), (ae, G) => (h(), x("div", {
      class: Z(["chart-container", { "chart-container--static": !e.interactive }])
    }, [
      (h(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: Ce(`min-height: ${e.chartHeight}px;`),
        onMousemove: U,
        onMouseleave: le
      }, [
        G[7] || (G[7] = d("defs", null, [
          d("filter", {
            id: "histogram-tooltip-shadow",
            x: "-50%",
            y: "-50%",
            width: "200%",
            height: "200%"
          }, [
            d("feDropShadow", {
              dx: "0",
              dy: "2",
              stdDeviation: "5",
              "flood-color": "#000000",
              "flood-opacity": "0.3"
            })
          ])
        ], -1)),
        (h(!0), x(he, null, pe(Y.value, (P, X) => (h(), x("line", {
          key: `grid-${X}`,
          x1: b.value,
          y1: P.y,
          x2: m.value,
          y2: P.y,
          stroke: u.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Rg))), 128)),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, Ig),
        d("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: u.value.axis
        }, null, 8, Pg),
        (h(!0), x(he, null, pe(Y.value, (P, X) => (h(), x(he, {
          key: `y-tick-${X}`
        }, [
          d("line", {
            x1: e.chartMargin - 6,
            y1: P.y,
            x2: e.chartMargin,
            y2: P.y,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Eg),
          d("text", {
            x: e.chartMargin - 12,
            y: P.y + 4,
            "text-anchor": "end",
            fill: u.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(P.value), 9, Og)
        ], 64))), 128)),
        d("text", {
          x: e.chartMargin - 35,
          y: e.chartHeight / 2,
          "text-anchor": "middle",
          fill: u.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif",
          transform: `rotate(-90, ${e.chartMargin - 35}, ${e.chartHeight / 2})`
        }, " Count ", 8, Fg),
        d("line", {
          x1: b.value,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: m.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, Vg),
        d("polygon", {
          points: `${m.value - 4},${e.chartHeight - e.chartBottomMargin - 4} ${m.value - 4},${e.chartHeight - e.chartBottomMargin + 4} ${m.value},${e.chartHeight - e.chartBottomMargin}`,
          fill: u.value.axis
        }, null, 8, Ng),
        (h(!0), x(he, null, pe(_.value, (P) => (h(), x(he, {
          key: `tick-${P.score}`
        }, [
          d("line", {
            x1: P.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: P.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, zg),
          d("text", {
            x: P.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: u.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(P.score), 9, jg)
        ], 64))), 128)),
        d("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: u.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, Hg),
        S.value ? (h(), x("path", {
          key: 0,
          d: S.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, Wg)) : F("", !0),
        (h(!0), x(he, null, pe(I.value, (P, X) => (h(), x("rect", {
          key: `bar-${X}`,
          x: P.x - y.value / 2,
          y: P.y,
          width: y.value,
          height: P.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (te) => ie(te, P),
          onMouseleave: ce,
          style: Ce({ cursor: e.interactive ? "pointer" : "default" })
        }, null, 44, Kg))), 128)),
        e.showStatLabels && V.value ? (h(), x("line", {
          key: 1,
          x1: V.value,
          y1: e.chartMargin,
          x2: V.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Ug)) : F("", !0),
        e.showStatLabels && V.value ? (h(), x("text", {
          key: 2,
          x: V.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + A(W.value.toFixed(1)), 9, Yg)) : F("", !0),
        e.showStatLabels && D.value ? (h(), x("line", {
          key: 3,
          x1: D.value,
          y1: e.chartMargin,
          x2: D.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, qg)) : F("", !0),
        e.showStatLabels && D.value ? (h(), x("text", {
          key: 4,
          x: D.value,
          y: K("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + A(re.value.toFixed(1)), 9, Xg)) : F("", !0),
        e.showStatLabels && T.value ? (h(), x("line", {
          key: 5,
          x1: T.value,
          y1: e.chartMargin,
          x2: T.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, Gg)) : F("", !0),
        e.showStatLabels && T.value ? (h(), x("text", {
          key: 6,
          x: T.value,
          y: K("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + A(ue.value.toFixed(1)), 9, Zg)) : F("", !0),
        e.showStatLabels && j.value ? (h(), x("line", {
          key: 7,
          x1: j.value,
          y1: e.chartMargin,
          x2: j.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, Qg)) : F("", !0),
        e.showStatLabels && j.value ? (h(), x("text", {
          key: 8,
          x: j.value,
          y: K("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + A(oe.value.toFixed(1)), 9, Jg)) : F("", !0),
        e.showStatLabels && B.value ? (h(), x("line", {
          key: 9,
          x1: B.value,
          y1: e.chartMargin,
          x2: B.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#7c3aed",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, em)) : F("", !0),
        e.showStatLabels && B.value ? (h(), x("text", {
          key: 10,
          x: B.value,
          y: K("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + A(q.value.toFixed(1)), 9, tm)) : F("", !0),
        e.showStatLabels && H.value ? (h(), x("line", {
          key: 11,
          x1: H.value,
          y1: e.chartMargin,
          x2: H.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, am)) : F("", !0),
        e.showStatLabels && H.value ? (h(), x("text", {
          key: 12,
          x: H.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + A(J.value.toFixed(1)), 9, nm)) : F("", !0),
        e.showLegend ? (h(), x("g", {
          key: 13,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          d("g", sm, [
            G[0] || (G[0] = d("line", {
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
              fill: u.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Gaussian ", 8, im)
          ]),
          d("g", lm, [
            G[1] || (G[1] = d("line", {
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
              fill: u.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, rm)
          ]),
          d("g", cm, [
            G[2] || (G[2] = d("line", {
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
              fill: u.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, dm)
          ]),
          d("g", um, [
            G[3] || (G[3] = d("line", {
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
              fill: u.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, hm)
          ]),
          d("g", fm, [
            G[4] || (G[4] = d("line", {
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
              fill: u.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, gm)
          ]),
          d("g", mm, [
            G[5] || (G[5] = d("line", {
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
              fill: u.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, pm)
          ]),
          d("g", bm, [
            G[6] || (G[6] = d("line", {
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
              fill: u.value.legendText,
              "font-size": "11",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, vm)
          ])
        ], 8, om)) : F("", !0),
        e.interactive && f.value.visible ? (h(), x("g", {
          key: 14,
          "pointer-events": "none",
          transform: `translate(${f.value.x}, ${f.value.y})`
        }, [
          d("rect", {
            filter: "url(#histogram-tooltip-shadow)",
            x: -f.value.width / 2,
            y: -f.value.height - 10,
            width: f.value.width,
            height: f.value.height,
            fill: i.value.bg,
            rx: "8",
            stroke: i.value.border,
            "stroke-width": "1"
          }, null, 8, xm),
          d("text", {
            x: "0",
            y: -f.value.height - 10 + xn,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(f.value.title), 9, km),
          d("text", {
            x: "0",
            y: -f.value.height - 10 + xn + eo + ci,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(f.value.text), 9, _m)
        ], 8, ym)) : F("", !0)
      ], 44, Lg))
    ], 2));
  }
}), kl = /* @__PURE__ */ be(Cm, [["__scopeId", "data-v-8f9da805"]]), $m = 639, _l = 1024;
function di(e) {
  return e < 640 ? "mobile" : e <= _l ? "tablet" : "desktop";
}
function Sm() {
  const e = ne(
    typeof window > "u" ? "desktop" : di(window.innerWidth)
  ), t = () => {
    typeof window > "u" || (e.value = di(window.innerWidth));
  };
  let a = null, n = null, o = null, s = null;
  Je(() => {
    typeof window > "u" || (t(), a = window.matchMedia(`(max-width: ${$m}px)`), n = window.matchMedia(`(min-width: 640px) and (max-width: ${_l}px)`), o = window.matchMedia("(min-width: 1025px)"), s = () => {
      t();
    }, a.addEventListener("change", s), n.addEventListener("change", s), o.addEventListener("change", s));
  }), at(() => {
    !s || !a || !n || !o || (a.removeEventListener("change", s), n.removeEventListener("change", s), o.removeEventListener("change", s));
  });
  const i = $(() => e.value === "mobile"), l = $(() => e.value === "tablet"), r = $(() => e.value === "desktop");
  return {
    breakpoint: e,
    isMobile: i,
    isTablet: l,
    isDesktop: r
  };
}
const Dt = (e, t) => t ? `${(e / t * 100).toFixed(1)}%` : "0.0%", ke = (e, t) => `${e.toLocaleString()} (${Dt(e, t)})`, Mm = { class: "chart-container" }, Dm = {
  key: 0,
  class: "loading-state loading-overlay"
}, ra = 12, Am = /* @__PURE__ */ fe({
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
    jo.use([Ql, Jl, er, tr]);
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), { breakpoint: s } = Sm(), i = ne(null), l = ne(!0), r = ne(!1);
    let c = null, u = null;
    const f = {
      animation: { duration: 1e3, easing: "cubicOut" },
      margins: { left: "3%", right: "8%", top: "2%", bottom: "2%" },
      node: { width: 88, gap: 24, align: "left", iterations: 0 },
      style: {
        shadowBlur: 0,
        shadowColor: "transparent"
      }
    }, g = {
      success: "#66BB6A",
      abandon: "#FFA726",
      error: "#EF5350"
    }, b = {
      success: 0,
      abandon: 1,
      error: 2
    }, m = /abandon|exit|lost|bounce|cancelled|no pending|not paid|not confirmed|not delivered/i, v = /error|failed|unrecovered|not retreiv|bp error|not found|rejected|redirect to human|invalid|unprocessed|data quality|failed:/i, p = $(() => {
      const U = s.value;
      return U === "mobile" ? {
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
      } : U === "tablet" ? {
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
        contentMargins: { ...f.margins }
      } : {
        orient: "horizontal",
        nodeWidth: f.node.width,
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
        contentMargins: { ...f.margins }
      };
    }), y = (U) => {
      const le = U.replace(/_/g, " ").replace(/\s+/g, " ").trim(), de = le.match(/^Failed:\s*(.+)$/i);
      return de ? `Failed:
${de[1].trim()}` : le;
    }, k = (U, le) => {
      const de = U.trim();
      if (!de || le < 1 || de.length <= le) return de;
      const ae = [];
      let G = 0;
      for (; G < de.length; ) {
        const P = Math.min(G + le, de.length);
        if (P >= de.length) {
          const E = de.slice(G).trim();
          E && ae.push(E);
          break;
        }
        const X = de.slice(G, P), te = X.lastIndexOf(" ");
        if (te > 0)
          for (ae.push(de.slice(G, G + te).trim()), G += te; G < de.length && de[G] === " "; ) G += 1;
        else
          ae.push(X), G = P;
      }
      return ae.join(`
`);
    }, _ = (U, le) => {
      const de = U.trim();
      return !de || le < 1 ? U : de.split(`
`).map((ae) => k(ae.trim(), le)).filter(Boolean).join(`
`);
    }, w = (U) => U.status ? U.status : m.test(U.name) ? "abandon" : v.test(U.name) ? "error" : "success", C = (U) => U.originalValue ?? U.value, M = (U, le) => {
      const de = new Set(le.map((G) => G.target)), ae = U.filter((G) => !de.has(G.name));
      for (const G of ae) {
        if (typeof G.value == "number" && G.value > 0) return G.value;
        const P = le.filter((X) => X.source === G.name);
        if (P.length > 0)
          return P.reduce((X, te) => X + C(te), 0);
      }
      return le.reduce((G, P) => Math.max(G, C(P)), 0);
    }, S = (U, le) => {
      const de = /* @__PURE__ */ new Map(), ae = new Set(le.map((P) => P.target)), G = U.filter((P) => !ae.has(P.name)).map((P) => ({ name: P.name, depth: 0 }));
      for (; G.length > 0; ) {
        const { name: P, depth: X } = G.shift(), te = de.get(P);
        if (!(te !== void 0 && te >= X)) {
          de.set(P, X);
          for (const E of le)
            E.source === P && G.push({ name: E.target, depth: X + 1 });
        }
      }
      for (const P of U)
        de.has(P.name) || de.set(P.name, 0);
      return de;
    }, I = (U, le) => {
      const de = /* @__PURE__ */ new Map(), ae = new Set(le.map((te) => te.target)), G = U.filter((te) => !ae.has(te.name));
      let P = 0;
      const X = (te) => {
        let E = te;
        for (; E && !de.has(E); )
          de.set(E, P), P += 1, E = le.filter(
            (se) => se.source === E && w({ name: se.target }) === "success"
          ).sort((se, me) => C(me) - C(se))[0]?.target;
      };
      return G.forEach((te) => X(te.name)), de;
    }, V = (U, le, de) => {
      const ae = w(U);
      if (ae === "success" && de.has(U.name))
        return de.get(U.name);
      if (ae === "success") {
        const G = le.filter((X) => X.target === U.name);
        return 200 + (G.length ? Math.min(
          ...G.map(
            (X) => de.has(X.source) ? (de.get(X.source) ?? 0) + 0.01 : 500
          )
        ) : 500);
      }
      return ae === "abandon" ? 1e3 : 2e3;
    }, H = (U, le) => {
      const de = S(U, le), ae = I(U, le);
      return [...U].sort((G, P) => {
        const X = de.get(G.name) ?? 0, te = de.get(P.name) ?? 0;
        if (X !== te) return X - te;
        const E = b[w(G)], Q = b[w(P)];
        if (E !== Q) return E - Q;
        const se = V(G, le, ae), me = V(P, le, ae);
        if (se !== me) return se - me;
        const we = typeof G.order == "number" ? G.order : Number.MAX_SAFE_INTEGER, xe = typeof P.order == "number" ? P.order : Number.MAX_SAFE_INTEGER;
        return we !== xe ? we - xe : G.name.localeCompare(P.name);
      });
    }, D = (U, le, de, ae) => {
      const P = _(U, ae).split(`
`), X = le * 0.58, E = Math.max(...P.map((se) => se.length), 1) * X, Q = P.length * de;
      return {
        lines: P,
        width: E,
        height: Q,
        nodeWidth: E + ra * 2
      };
    }, T = (U, le, de, ae) => {
      const G = typeof U.label == "string" && U.label ? U.label : U.name, P = `${y(G)}
(${Dt(de, ae)})`;
      return _(P, le);
    }, B = (U, le) => {
      const de = le.filter((ae) => ae.target === U.name);
      return de.length > 0 ? de.reduce((ae, G) => ae + C(G), 0) : typeof U.value == "number" ? U.value : le.filter((ae) => ae.source === U.name).reduce((ae, G) => ae + C(G), 0);
    }, j = (U, le, de) => {
      const ae = le.find((G) => G.name === U);
      return ae ? B(ae, de) : de.filter((G) => G.source === U).reduce((G, P) => G + C(P), 0);
    }, W = (U, le, de, ae) => {
      const G = j(U, de, ae);
      return `${le.toLocaleString()} (${Dt(le, G)})`;
    }, J = (U, le = 0) => {
      if (le > 0) return le;
      const de = U.match(/^(\d+(?:\.\d+)?)px$/);
      if (de) return Number(de[1]);
      const ae = U.match(/^(\d+(?:\.\d+)?)vh$/);
      return ae && typeof window < "u" ? Number(ae[1]) / 100 * window.innerHeight : 500;
    }, re = (U, le, de, ae, G) => {
      if (!le.length || !U.length || G <= 0) return U;
      const P = U.map((xe) => ({ ...xe })), X = de.labelLineHeight || Math.round(de.labelFontSize * 1.25), te = Math.max(4, de.labelCharsPerLine), E = Math.max(ae * 0.88, 260), Q = S(le, P), se = /* @__PURE__ */ new Map();
      le.forEach((xe) => {
        const Te = Q.get(xe.name) ?? 0;
        se.set(Te, (se.get(Te) ?? 0) + 1);
      });
      const me = (xe) => {
        const Be = le.find((oa) => oa.name === xe)?.displayLabel || xe, qt = D(Be, de.labelFontSize, X, te).height + ra * 2, pa = Q.get(xe) ?? 0, nn = se.get(pa) ?? 1, on = (Math.max(nn, 1) - 1) * de.nodeGap / Math.max(nn, 1), Nn = Math.max(E - on, qt);
        return Math.max(1, qt / Nn * G);
      }, we = (xe) => {
        const Te = P.filter((Be) => Be.target === xe);
        return Te.length > 0 ? Te.reduce((Be, qe) => Be + qe.value, 0) : P.filter((Be) => Be.source === xe).reduce((Be, qe) => Be + qe.value, 0);
      };
      for (let xe = 0; xe < 16; xe += 1) {
        let Te = !1;
        for (const Be of le) {
          const qe = me(Be.name), qt = we(Be.name);
          if (qt >= qe) continue;
          const pa = P.filter((oa) => oa.target === Be.name), nn = P.filter((oa) => oa.source === Be.name), on = pa.length > 0 ? pa : nn;
          if (on.length === 0) continue;
          const Nn = qe / Math.max(qt, 1e-6);
          on.forEach((oa) => {
            oa.value *= Nn;
          }), Te = !0;
        }
        if (!Te) break;
      }
      return P;
    }, ue = (U, le, de) => {
      const ae = M(U, le), G = H(U, le), P = de.labelLineHeight || Math.round(de.labelFontSize * 1.25), X = Math.max(4, de.labelCharsPerLine);
      let te = de.nodeWidth;
      const E = [], Q = G.map((me, we) => {
        const xe = w(me), Te = T(
          me,
          X,
          B(me, le),
          ae
        );
        E.push(Te);
        const Be = D(Te, de.labelFontSize, P, X);
        de.orient === "vertical" ? te = Math.max(te, Be.height + ra * 2) : te = Math.max(te, Be.nodeWidth);
        const qe = a.nodeColors[me.name] || g[xe] || q[we % q.length], qt = Math.max(Math.ceil(Be.nodeWidth - ra * 2), 48);
        return {
          ...me,
          displayLabel: Te,
          label: {
            width: qt,
            overflow: "none",
            lineHeight: P,
            fontSize: de.labelFontSize
          },
          itemStyle: {
            color: qe,
            borderRadius: 4,
            borderWidth: 0,
            shadowBlur: 0,
            shadowColor: "transparent"
          }
        };
      });
      let se = { ...de.contentMargins };
      if (de.orient === "vertical") {
        const me = Math.max(
          ...E.map(
            (xe) => D(xe, de.labelFontSize, P, X).width
          ),
          0
        ), we = typeof se.right == "number" ? se.right : 10;
        se = {
          ...se,
          right: Math.max(we, me + ra + de.labelDistance)
        };
      }
      return { nodes: Q, maxNodeWidth: te, contentMargins: se, originTotal: ae };
    }, q = [
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
    ], oe = () => {
      const U = a.data.links.filter(
        (G) => G.source && G.target && typeof G.value == "number"
      ), le = Math.max(...U.map((G) => G.value), 1), de = Math.max(1, le * 0.01), ae = U.map((G) => ({
        ...G,
        originalValue: G.value,
        value: G.value < le * 0.01 ? de : G.value
      }));
      return {
        nodes: a.data.nodes.filter((G) => G.name),
        links: ae
      };
    }, R = (U, le, de) => (ae) => {
      const G = ae.dataType === "node", P = o.value.tooltipText, X = n.value ? "#d1d5db" : "#e2e8f0";
      if (G) {
        const me = le.filter((Be) => Be.target === ae.name), we = le.filter((Be) => Be.source === ae.name), xe = me.length > 0 ? me.reduce((Be, qe) => Be + (qe.originalValue || qe.value), 0) : we.reduce((Be, qe) => Be + (qe.originalValue || qe.value), 0), Te = Dt(xe, de);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${P};">${ae.name} (${Te})</div><div style="color: ${X}; font-size: 12px;">Count: ${xe.toLocaleString()}</div>`;
      }
      const te = ae.data?.source || ae.source || "Unknown", E = ae.data?.target || ae.target || "Unknown", Q = Number(ae.data?.originalValue ?? ae.data?.value ?? ae.value ?? 0), se = W(te, Q, U, le);
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${P};">${te} → ${E}</div><div style="color: ${X}; font-size: 12px;">Flow: ${se}</div>`;
    }, K = () => {
      if (!c || !a.data.nodes?.length || !a.data.links?.length) return;
      const U = p.value, le = n.value ? "rgba(110, 110, 120, 0.35)" : "rgba(148, 163, 184, 0.45)", de = n.value ? "rgba(130, 130, 140, 0.5)" : "rgba(100, 116, 139, 0.55)", ae = n.value ? "rgba(203, 213, 225, 0.92)" : "#64748b", G = U.labelPosition === "inside" ? "#ffffff" : n.value ? o.value.textPrimary : "#334155";
      try {
        const { nodes: P, links: X } = oe(), { nodes: te, maxNodeWidth: E, contentMargins: Q, originTotal: se } = ue(
          P,
          X,
          U
        ), me = J(a.height, i.value?.clientHeight ?? 0), we = re(
          X,
          te,
          {
            labelFontSize: U.labelFontSize,
            labelLineHeight: U.labelLineHeight || Math.round(U.labelFontSize * 1.25),
            labelCharsPerLine: U.labelCharsPerLine,
            nodeGap: U.nodeGap
          },
          me,
          se
        ), xe = {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove|click",
            confine: !0,
            formatter: R(P, we, se),
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
              data: te,
              links: we,
              emphasis: {
                focus: "adjacency",
                lineStyle: {
                  color: de,
                  opacity: 1
                }
              },
              lineStyle: {
                color: le,
                curveness: 0.5,
                opacity: 1
              },
              itemStyle: {
                ...f.style,
                borderWidth: 0
              },
              label: {
                show: !0,
                position: U.labelPosition,
                color: G,
                fontWeight: 700,
                fontSize: U.labelFontSize,
                lineHeight: U.labelLineHeight || Math.round(U.labelFontSize * 1.25),
                padding: ra,
                align: "center",
                verticalAlign: "middle",
                overflow: "none",
                ...U.orient === "horizontal" ? { width: Math.max(E - ra * 2, 48), overflow: "none" } : U.labelWrap && U.labelTextWidth > 0 ? { width: U.labelTextWidth, overflow: "none" } : {},
                ...U.labelDistance > 0 ? { distance: U.labelDistance } : {},
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (Te) => Te.data?.displayLabel || Te.name || ""
              },
              edgeLabel: U.edgeLabelShow ? {
                show: !0,
                fontSize: U.edgeLabelFontSize,
                color: ae,
                fontWeight: 500,
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (Te) => {
                  const Be = Number(Te.data?.originalValue ?? Te.value ?? 0), qe = Te.data?.source || Te.source || "";
                  return W(qe, Be, P, we);
                }
              } : { show: !1 },
              nodeAlign: f.node.align,
              nodeGap: U.nodeGap,
              nodeWidth: E,
              layoutIterations: f.node.iterations,
              orient: U.orient,
              draggable: !1,
              ...Q
            }
          ],
          backgroundColor: "transparent",
          animation: !0,
          animationDuration: f.animation.duration,
          animationEasing: f.animation.easing
        };
        c.setOption(xe), c.resize();
      } catch (P) {
        console.error("Error setting Sankey chart options:", P), r.value = !0;
      }
    }, Y = async () => {
      if (i.value)
        try {
          c = jo.init(i.value), K(), window.addEventListener("resize", ce);
        } catch (U) {
          console.error("Error initializing Sankey chart:", U), r.value = !0;
        } finally {
          l.value = !1;
        }
    }, N = () => {
      const U = i.value;
      return !!(U && U.clientWidth > 0 && U.clientHeight > 0);
    }, ie = async () => {
      if (await We(), N()) return Y();
      await new Promise((U) => {
        const le = i.value;
        if (!le) {
          U();
          return;
        }
        u = new ResizeObserver(() => {
          N() && (u?.disconnect(), u = null, Y().then(U));
        }), u.observe(le);
      });
    }, ce = () => c?.resize(), ye = () => {
      window.removeEventListener("resize", ce), u?.disconnect(), u = null, c && (c.dispose(), c = null);
    };
    return Je(() => ie()), $i(ye), Le(() => a.data, K, { deep: !0 }), Le(n, K), Le(s, K), t({ isDark: n }), (U, le) => (h(), x("div", Mm, [
      r.value ? (h(), x("div", {
        key: 0,
        class: "error-state",
        style: Ce({ height: e.height })
      }, [...le[0] || (le[0] = [
        ao('<div class="error-content" data-v-c2130602><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c2130602><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-c2130602></path></svg><p class="error-title" data-v-c2130602>Chart could not be loaded</p><p class="error-description" data-v-c2130602>Please check the data format.</p></div>', 1)
      ])], 4)) : (h(), x("div", {
        key: 1,
        class: "chart-wrapper",
        style: Ce({ height: e.height })
      }, [
        d("div", {
          ref_key: "chartEl",
          ref: i,
          class: "chart-content"
        }, null, 512),
        l.value ? (h(), x("div", Dm, [...le[1] || (le[1] = [
          ao('<div class="loading-container" data-v-c2130602><div class="sankey-loader" data-v-c2130602><div class="flow flow-1" data-v-c2130602></div><div class="flow flow-2" data-v-c2130602></div><div class="flow flow-3" data-v-c2130602></div><div class="flow flow-4" data-v-c2130602></div></div><p class="loading-text" data-v-c2130602>Loading Sankey diagram...</p></div>', 1)
        ])])) : F("", !0)
      ], 4))
    ]));
  }
}), Yt = /* @__PURE__ */ be(Am, [["__scopeId", "data-v-c2130602"]]), Tm = ["open"], Bm = { class: "card-header metric-collapsible__summary" }, Lm = { class: "header-content metric-header-content" }, Rm = { class: "metric-header-content__main" }, Im = { class: "metric-header-content__text" }, Pm = { class: "metric-header-content__loaded" }, Em = {
  key: 0,
  class: "card-title"
}, Om = {
  key: 0,
  class: "card-subtitle"
}, Fm = {
  key: 0,
  class: "metric-header-content__export"
}, Vm = {
  key: 0,
  class: "cmc-header-aside"
}, Nm = {
  key: 0,
  class: "chart-metric-container__body"
}, zm = {
  key: "body-loading",
  class: "cmc-body-loading",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, jm = { key: "body-content" }, Hm = {
  key: 1,
  class: "chart-metric-container chart-metric-container--static"
}, Wm = { class: "card-header" }, Km = { class: "header-content metric-header-content" }, Um = { class: "metric-header-content__main" }, Ym = { class: "metric-header-content__text" }, qm = { class: "metric-header-content__loaded" }, Xm = {
  key: 0,
  class: "card-title"
}, Gm = {
  key: 0,
  class: "card-subtitle"
}, Zm = {
  key: 0,
  class: "metric-header-content__export"
}, Qm = {
  key: 0,
  class: "cmc-header-aside"
}, Jm = {
  key: 0,
  class: "chart-metric-container__body"
}, ep = {
  key: "body-loading",
  class: "cmc-body-loading",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, tp = { key: "body-content" }, ap = /* @__PURE__ */ fe({
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
    const a = e, n = t;
    function o(m) {
      return m === !0;
    }
    const s = ne(null), i = ne(o(a.defaultOpen)), l = ne(o(a.defaultOpen)), r = go();
    function c(m) {
      return m.some((v) => {
        if (v.type === Zl) return !1;
        if (v.type === Text) {
          const p = v.children;
          return typeof p == "string" && p.trim().length > 0;
        }
        return !!v.type;
      });
    }
    const u = $(() => a.collapsible ? a.lazyMount ? l.value : i.value : !0), f = $(() => a.loading && u.value), g = $(() => {
      if (a.collapsible && !i.value) return !1;
      const m = r.headerExport;
      return m ? c(m()) : !1;
    });
    Le(
      () => a.defaultOpen,
      (m) => {
        if (!a.collapsible) return;
        const v = o(m);
        i.value = v, v && (l.value = !0), s.value && s.value.open !== v && (s.value.open = v);
      }
    ), Je(() => {
      !a.collapsible || !s.value || (s.value.open = i.value);
    });
    function b(m) {
      const v = m.currentTarget;
      if (v?.tagName !== "DETAILS") return;
      const p = i.value, y = v.open;
      if (i.value = y, y && !p) {
        const k = !l.value;
        l.value = !0, k && n("open");
      }
      n("toggle", y);
    }
    return (m, v) => e.collapsible ? (h(), x("details", {
      key: 0,
      ref_key: "detailsRef",
      ref: s,
      class: "chart-metric-container metric-collapsible",
      open: i.value ? !0 : void 0,
      onToggle: b
    }, [
      d("summary", Bm, [
        d("div", Lm, [
          d("div", Rm, [
            d("div", Im, [
              d("div", Pm, [
                _e(m.$slots, "title", {}, () => [
                  e.title ? (h(), x("h3", Em, A(e.title), 1)) : F("", !0)
                ], !0),
                e.subtitle ? (h(), x("p", Om, A(e.subtitle), 1)) : F("", !0),
                _e(m.$slots, "headerAppend", {}, void 0, !0)
              ])
            ]),
            g.value ? (h(), x("div", Fm, [
              _e(m.$slots, "headerExport", {}, void 0, !0)
            ])) : F("", !0)
          ]),
          m.$slots.headerAside ? (h(), x("div", Vm, [
            _e(m.$slots, "headerAside", {}, void 0, !0)
          ])) : F("", !0)
        ]),
        v[0] || (v[0] = d("svg", {
          class: "metric-collapsible__chevron",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          "aria-hidden": "true"
        }, [
          d("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M19 9l-7 7-7-7"
          })
        ], -1))
      ]),
      u.value ? (h(), x("div", Nm, [
        z(ct, {
          name: "chart-metric-fade",
          mode: "out-in"
        }, {
          default: O(() => [
            f.value ? (h(), x("div", zm, [
              _e(m.$slots, "loading", {}, () => [
                v[1] || (v[1] = d("div", {
                  class: "cmc-body-loading__skeleton ut-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1))
              ], !0)
            ])) : (h(), x("div", jm, [
              _e(m.$slots, "default", {}, void 0, !0)
            ]))
          ]),
          _: 3
        })
      ])) : F("", !0)
    ], 40, Tm)) : (h(), x("div", Hm, [
      d("div", Wm, [
        d("div", Km, [
          d("div", Um, [
            d("div", Ym, [
              d("div", qm, [
                _e(m.$slots, "title", {}, () => [
                  e.title ? (h(), x("h3", Xm, A(e.title), 1)) : F("", !0)
                ], !0),
                e.subtitle ? (h(), x("p", Gm, A(e.subtitle), 1)) : F("", !0),
                _e(m.$slots, "headerAppend", {}, void 0, !0)
              ])
            ]),
            g.value ? (h(), x("div", Zm, [
              _e(m.$slots, "headerExport", {}, void 0, !0)
            ])) : F("", !0)
          ]),
          m.$slots.headerAside ? (h(), x("div", Qm, [
            _e(m.$slots, "headerAside", {}, void 0, !0)
          ])) : F("", !0)
        ])
      ]),
      u.value ? (h(), x("div", Jm, [
        z(ct, {
          name: "chart-metric-fade",
          mode: "out-in"
        }, {
          default: O(() => [
            f.value ? (h(), x("div", ep, [
              _e(m.$slots, "loading", {}, () => [
                v[2] || (v[2] = d("div", {
                  class: "cmc-body-loading__skeleton ut-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1))
              ], !0)
            ])) : (h(), x("div", tp, [
              _e(m.$slots, "default", {}, void 0, !0)
            ]))
          ]),
          _: 3
        })
      ])) : F("", !0)
    ]));
  }
}), Se = /* @__PURE__ */ be(ap, [["__scopeId", "data-v-ade4038f"]]);
function np(e, t) {
  return h(), x("svg", {
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
      d: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
    })
  ]);
}
function uo(e, t) {
  return h(), x("svg", {
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
      d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
    })
  ]);
}
function Eo(e, t) {
  return h(), x("svg", {
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
      d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
    })
  ]);
}
function dt(e, t) {
  return h(), x("svg", {
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
function op(e, t) {
  return h(), x("svg", {
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
function na(e, t) {
  return h(), x("svg", {
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
      d: "m19.5 8.25-7.5 7.5-7.5-7.5"
    })
  ]);
}
function Oo(e, t) {
  return h(), x("svg", {
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
      d: "M15.75 19.5 8.25 12l7.5-7.5"
    })
  ]);
}
function Fo(e, t) {
  return h(), x("svg", {
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
      d: "m8.25 4.5 7.5 7.5-7.5 7.5"
    })
  ]);
}
function wl(e, t) {
  return h(), x("svg", {
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
      d: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    })
  ]);
}
function sp(e, t) {
  return h(), x("svg", {
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
function ui(e, t) {
  return h(), x("svg", {
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
      d: "M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
    })
  ]);
}
function ip(e, t) {
  return h(), x("svg", {
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
      d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
    })
  ]);
}
function hi(e, t) {
  return h(), x("svg", {
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
      d: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
    }),
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    })
  ]);
}
function lp(e, t) {
  return h(), x("svg", {
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
      d: "M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
    })
  ]);
}
function Vo(e, t) {
  return h(), x("svg", {
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
      d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
    })
  ]);
}
function rp(e, t) {
  return h(), x("svg", {
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
      d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
    })
  ]);
}
function cp(e, t) {
  return h(), x("svg", {
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
      d: "M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
    })
  ]);
}
function dp(e, t) {
  return h(), x("svg", {
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
      d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
    })
  ]);
}
function ho(e, t) {
  return h(), x("svg", {
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
      d: "M6 18 18 6M6 6l12 12"
    })
  ]);
}
const up = {
  key: 0,
  class: "footer-divider"
}, hp = {
  key: 0,
  class: "export-label"
}, fp = { class: "export-buttons" }, gp = ["disabled"], mp = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, pp = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, bp = ["disabled"], vp = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, yp = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, xp = /* @__PURE__ */ fe({
  __name: "FooterExport",
  props: {
    formats: { default: () => ["pdf", "csv"] },
    loading: { type: Boolean, default: !1 },
    variant: { default: "footer" }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = $(() => a.variant === "footer" ? "footer" : "div"), s = $(
      () => a.variant === "footer" ? "chart-footer" : "chart-export-inline"
    ), i = (r) => a.formats.includes(r), l = (r) => {
      a.loading || n("export", r);
    };
    return (r, c) => (h(), ee(rt(o.value), {
      class: Z(s.value)
    }, {
      default: O(() => [
        e.variant === "footer" ? (h(), x("div", up)) : F("", !0),
        d("div", {
          class: Z(["export-actions", { "export-actions--inline": e.variant === "inline" }])
        }, [
          e.variant === "footer" ? (h(), x("span", hp, "Export")) : F("", !0),
          d("div", fp, [
            i("pdf") ? (h(), x("button", {
              key: 0,
              type: "button",
              class: Z(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download PDF",
              onClick: c[0] || (c[0] = (u) => l("pdf"))
            }, [
              e.loading ? (h(), x("svg", mp, [...c[2] || (c[2] = [
                d("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                d("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (h(), x("svg", pp, [...c[3] || (c[3] = [
                d("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }, null, -1),
                d("polyline", { points: "14 2 14 8 20 8" }, null, -1),
                d("line", {
                  x1: "16",
                  y1: "13",
                  x2: "8",
                  y2: "13"
                }, null, -1),
                d("line", {
                  x1: "16",
                  y1: "17",
                  x2: "8",
                  y2: "17"
                }, null, -1),
                d("polyline", { points: "10 9 9 9 8 9" }, null, -1)
              ])])),
              c[4] || (c[4] = d("span", null, "PDF", -1))
            ], 10, gp)) : F("", !0),
            i("csv") ? (h(), x("button", {
              key: 1,
              type: "button",
              class: Z(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download CSV",
              onClick: c[1] || (c[1] = (u) => l("csv"))
            }, [
              e.loading ? (h(), x("svg", vp, [...c[5] || (c[5] = [
                d("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                d("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (h(), x("svg", yp, [...c[6] || (c[6] = [
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
              c[7] || (c[7] = d("span", null, "CSV", -1))
            ], 10, bp)) : F("", !0)
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), ze = /* @__PURE__ */ be(xp, [["__scopeId", "data-v-ebfab47f"]]), kp = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, _p = {
  key: "chart",
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, wp = { class: "w-full shrink-0 sm:pr-2" }, Cp = {
  key: "empty",
  class: "flex min-h-[280px] w-full items-center justify-center"
}, $p = { class: "max-w-[360px] text-center" }, Sp = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Mp = /* @__PURE__ */ fe({
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
    }, o = e, s = a, i = (g) => {
      s("export", g);
    }, l = $e(o, "theme"), r = $e(o, "options"), { isDark: c } = Me(l), u = (g) => {
      const b = new Date(g), m = String(b.getDate()).padStart(2, "0"), v = String(b.getMonth() + 1).padStart(2, "0");
      return `${m}-${v}`;
    }, f = $(() => {
      const g = o.data?.agents_by_day || {}, b = Object.keys(g).sort();
      if (b.length === 0)
        return { labels: [], datasets: [] };
      const m = b.map((_) => u(_)), v = /* @__PURE__ */ new Set();
      for (const _ of Object.values(g))
        for (const w of Object.keys(_))
          v.add(w);
      const p = Array.from(v), y = (_) => _, k = p.map((_) => ({
        label: _,
        data: b.map((w) => g[w]?.[_] || 0),
        backgroundColor: `${n[_] || "#94a3b8"}80`,
        borderColor: y(n[_] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: m,
        datasets: k
      };
    });
    return t({ isDark: c }), (g, b) => (h(), ee(Se, {
      title: "Agents Total Messages per Day",
      subtitle: "Daily agent interactions (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !e.loading ? (h(), ee(L(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", kp, [
          z(ct, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: O(() => [
              f.value.labels && f.value.labels.length ? (h(), x("section", _p, [
                d("div", wp, [
                  z($t, {
                    data: f.value,
                    stacked: !0,
                    theme: l.value,
                    options: r.value
                  }, null, 8, ["data", "theme", "options"])
                ])
              ])) : (h(), x("section", Cp, [
                d("div", $p, [
                  d("div", Sp, [
                    z(L(dt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                  ]),
                  b[0] || (b[0] = d("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No agents data per day ", -1)),
                  b[1] || (b[1] = d("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " Try adjusting the date range or check your filters to see daily agent interactions. ", -1))
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
}), Dp = /* @__PURE__ */ be(Mp, [["__scopeId", "data-v-f8d0ec91"]]), Ap = { class: "flex w-full min-w-0 justify-center" }, Tp = { class: "flex max-w-full min-w-0 items-center gap-2" }, Bp = { class: "min-w-0 truncate text-[12px] leading-normal capitalize" }, Lp = { class: "text-[14px] font-bold leading-tight text-[color:var(--kiut-text-primary,#1e293b)]" }, Rp = {
  key: 0,
  class: "min-w-0 w-full truncate text-[10px] leading-normal"
}, Ip = /* @__PURE__ */ fe({
  __name: "CardInfo",
  props: {
    color: {},
    title: {},
    value: {},
    subvalue: {}
  },
  setup(e) {
    return (t, a) => (h(), x("div", {
      class: Z(["card-info box-border flex w-full min-w-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl px-3 py-2 text-center font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[color:var(--kiut-text-secondary,#64748b)]", e.subvalue ? "h-[75px]" : "h-[58px]"])
    }, [
      d("div", Ap, [
        d("div", Tp, [
          e.color ? (h(), x("span", {
            key: 0,
            class: "inline-block h-2.5 w-2.5 shrink-0 rounded-full align-middle",
            style: Ce({ backgroundColor: e.color }),
            "aria-hidden": "true"
          }, null, 4)) : F("", !0),
          d("span", Bp, A(e.title), 1)
        ])
      ]),
      d("p", Lp, A(e.value), 1),
      e.subvalue ? (h(), x("p", Rp, A(e.subvalue), 1)) : F("", !0)
    ], 2));
  }
}), ve = /* @__PURE__ */ be(Ip, [["__scopeId", "data-v-0d546967"]]), Cl = "inline-flex w-min max-w-full min-h-[22px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] font-semibold leading-snug tracking-tight";
function $l(e, t) {
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
const Pp = {
  key: 0,
  class: "relative flex h-2 w-2 shrink-0 items-center justify-center",
  "aria-hidden": "true"
}, Xe = /* @__PURE__ */ fe({
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
    const t = e, a = $(
      () => t.statusLive === !0 || t.statusLive === !1
    ), n = $(
      () => t.statusLive === !0 ? t.labelConnected : t.labelDisconnected
    ), o = $(() => t.statusLive === !0 ? [
      "border border-emerald-200 bg-emerald-50",
      "dark:border-emerald-800/80 dark:bg-emerald-950/40"
    ] : [
      "border border-transparent bg-slate-100 dark:border-slate-700/80 dark:bg-slate-800/90"
    ]), s = $(() => t.statusLive === !0 ? "text-emerald-700 dark:text-emerald-300" : "text-[color:var(--kiut-text-primary)] dark:text-slate-300"), i = $(
      () => $l(t.color, t.outlined)
    );
    return (l, r) => a.value ? (h(), x("span", {
      key: 0,
      role: "status",
      class: Z(["inline-flex w-min max-w-full min-h-[22px] items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug", o.value])
    }, [
      e.statusLive === !0 ? (h(), x("span", Pp, [...r[0] || (r[0] = [
        d("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        d("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : F("", !0),
      d("span", {
        class: Z(["min-w-0 flex-1 text-center", s.value])
      }, A(n.value), 3)
    ], 2)) : (h(), x("span", {
      key: 1,
      class: Z([L(Cl), i.value])
    }, [
      _e(l.$slots, "default", {}, () => [
        Ae(A(e.label), 1)
      ])
    ], 2));
  }
}), ge = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), Oe = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), Xt = (e) => {
  if (e == null) return "0";
  const t = Math.abs(e), a = e < 0 ? "-" : "";
  return t >= 1e6 ? `${a}${(t / 1e6).toFixed(2)}M` : t > 99999 ? `${a}${(t / 1e3).toFixed(1)}K` : `${a}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(t)}`;
}, Ep = {
  class: "kiut-table-root table-section flex w-full min-w-0 flex-col rounded-xl font-sans antialiased text-[color:var(--kiut-text-primary,#1e293b)]",
  "data-component": "kiut-table"
}, Op = { class: "overflow-x-auto" }, Fp = { class: "w-full table-auto border-collapse text-left text-[14px] leading-normal" }, Vp = ["aria-sort", "onClick"], Np = {
  class: "kiut-table-sort-icons inline-flex items-center",
  "aria-hidden": "true"
}, zp = {
  key: 0,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, jp = {
  key: 1,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, Hp = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = ne(!1), s = "—";
    function i(w) {
      return w == null || w === "" ? s : String(w);
    }
    function l(w) {
      return w === "center" ? "text-center" : w === "right" ? "text-right" : "text-left";
    }
    function r(w) {
      return `cell-${w}`;
    }
    function c(w, C) {
      return w[C];
    }
    function u(w, C) {
      if (typeof a.rowKey == "function")
        return a.rowKey(w);
      const M = w[a.rowKey];
      return typeof M == "string" || typeof M == "number" ? M : C;
    }
    function f(w, C) {
      return u(w, C);
    }
    function g(w) {
      return a.sortKey === w && a.sortDirection != null;
    }
    function b(w) {
      n("sort", w);
    }
    function m(w) {
      return g(w) ? a.sortDirection === "asc" ? "ascending" : "descending" : "none";
    }
    const v = $(() => a.rows?.length ?? 0), p = $(() => v.value > a.maxVisibleRows), y = $(() => Math.max(0, v.value - a.maxVisibleRows)), k = $(() => a.rows?.length ? o.value || !p.value ? a.rows : a.rows.slice(0, a.maxVisibleRows) : []), _ = $(
      () => a.viewMoreLabel.replace(/\{count\}/g, String(y.value))
    );
    return (w, C) => (h(), x("div", Ep, [
      d("div", Op, [
        d("table", Fp, [
          d("thead", null, [
            d("tr", null, [
              (h(!0), x(he, null, pe(e.columns, (M) => (h(), x("th", {
                key: M.key,
                scope: "col",
                class: Z(["kiut-table-th whitespace-nowrap px-3 py-2 text-[#9191a1]", [l(M.align), M.headerClass]])
              }, [
                M.sortable ? (h(), x("button", {
                  key: 0,
                  type: "button",
                  class: Z(["kiut-table-sort-btn inline-flex items-center gap-1", l(M.align)]),
                  "aria-sort": m(M.key),
                  onClick: (S) => b(M.key)
                }, [
                  d("span", null, A(M.label), 1),
                  d("span", Np, [
                    g(M.key) ? (h(), x(he, { key: 0 }, [
                      e.sortDirection === "asc" ? (h(), x("span", zp, "↑")) : e.sortDirection === "desc" ? (h(), x("span", jp, "↓")) : F("", !0)
                    ], 64)) : (h(), x(he, { key: 1 }, [
                      C[1] || (C[1] = d("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      C[2] || (C[2] = d("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, Vp)) : (h(), x(he, { key: 1 }, [
                  Ae(A(M.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          d("tbody", null, [
            (h(!0), x(he, null, pe(k.value, (M, S) => (h(), x("tr", {
              key: f(M, S)
            }, [
              (h(!0), x(he, null, pe(e.columns, (I) => (h(), x("td", {
                key: `${S}-${I.key}`,
                class: Z(["kiut-table-td px-3 py-2 text-[color:var(--kiut-text-primary,#1e293b)]", [l(I.align), I.cellClass]])
              }, [
                _e(w.$slots, r(I.key), {
                  row: M,
                  column: I,
                  value: c(M, I.key)
                }, () => [
                  Ae(A(i(c(M, I.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ]),
      p.value ? (h(), x("button", {
        key: 0,
        type: "button",
        class: "view-more-btn",
        onClick: C[0] || (C[0] = (M) => o.value = !o.value)
      }, [
        Ae(A(o.value ? e.viewLessLabel : _.value) + " ", 1),
        (h(), x("svg", {
          class: Z(["view-more-icon", { "view-more-icon-rotated": o.value }]),
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          "aria-hidden": "true"
        }, [...C[3] || (C[3] = [
          d("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M19 9l-7 7-7-7"
          }, null, -1)
        ])], 2))
      ])) : F("", !0)
    ]));
  }
}), ut = /* @__PURE__ */ be(Hp, [["__scopeId", "data-v-7bdbf1bb"]]), Wp = {
  key: "error",
  class: "error-state"
}, Kp = { class: "error-content" }, Up = { class: "error-description" }, Yp = {
  key: "content",
  class: "card-body"
}, qp = { class: "chart-section" }, Xp = { class: "chart-wrapper" }, Gp = { class: "payment-success-summary" }, Zp = {
  key: 0,
  class: "booking-daily-section"
}, Qp = { class: "w-full min-w-0" }, Jp = { class: "font-medium" }, e0 = { class: "percentage-text" }, t0 = { class: "badges-container" }, a0 = {
  key: 0,
  class: "badges-container"
}, n0 = {
  key: 1,
  class: "percentage-text"
}, o0 = { class: "badges-container" }, s0 = {
  key: 1,
  class: "empty-state"
}, i0 = /* @__PURE__ */ fe({
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
    function a(p) {
      return p;
    }
    const n = e, o = t, s = (p) => {
      o("export", p);
    }, i = $(() => n.data?.booking_manager_by_day ? [...n.data.booking_manager_by_day].sort(
      (p, y) => new Date(p.date).getTime() - new Date(y.date).getTime()
    ) : []), l = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated by agent", align: "center" },
      { key: "started", label: "Booking Started", align: "center" },
      { key: "paymentInitiated", label: "Payment Started", align: "center" },
      { key: "paymentResults", label: "Payment Results", align: "center" },
      { key: "paymentValue", label: "Payment Value", align: "center" },
      { key: "outcomes", label: "Outcomes", align: "center" }
    ], r = $(
      () => i.value.map((p) => ({
        id: p.date,
        ...p
      }))
    ), c = $(() => n.data?.total_payment_success_value || []), u = $(() => {
      const p = c.value;
      return p.length === 0 ? b(0) : p.map(
        (y) => `${y.currency} ${b(y.total_value)}`
      ).join(" · ");
    }), f = (p) => p.payment_success_value || [], g = (p) => typeof p.payment_success_count == "number" ? p.payment_success_count : (p.payment_success_value || []).reduce(
      (y, k) => y + (k.count || 0),
      0
    ), b = (p) => p == null ? "0" : Xt(p);
    $(() => (n.data?.total_payment_success_value || []).reduce(
      (p, y) => p + (y.total_value || 0),
      0
    ));
    const m = $(() => {
      const p = n.data, y = p.total_booking_initiated || 0, k = p.total_booking_started || 0, _ = p.total_payment_initiated || 0, w = p.total_not_found || 0, C = p.total_cancelled || 0, M = p.total_no_pending_balance || 0, S = p.total_errors || 0, I = typeof p.total_payment_success == "number" ? p.total_payment_success : (p.total_payment_success_value || []).reduce(
        (W, J) => W + (J.count || 0),
        0
      ), V = p.total_payment_failed || 0, H = Math.max(0, y - k), D = Math.max(
        0,
        k - _ - w - C - M - S
      ), T = (W, J) => ke(W, J), B = [
        { name: "Initiated by agent", status: "success" },
        { name: "Booking Started", status: "success" },
        { name: "Payment Started", status: "success" },
        { name: "Not Found", status: "error" },
        { name: "Cancelled", status: "abandon" },
        { name: "No Pending Balance", status: "abandon" },
        { name: "Errors", status: "error" },
        { name: "Booking Success", status: "success" },
        { name: "Error: Payment Failed", status: "error" },
        { name: "Abandoned: No Response", status: "abandon" },
        { name: "Abandoned (Start)", status: "abandon" }
      ], j = [];
      return k > 0 && j.push({
        source: "Initiated by agent",
        target: "Booking Started",
        value: k,
        label: T(k, y)
      }), H > 0 && j.push({
        source: "Initiated by agent",
        target: "Abandoned: No Response",
        value: H,
        label: T(H, y)
      }), _ > 0 && j.push({
        source: "Booking Started",
        target: "Payment Started",
        value: _,
        label: T(_, y)
      }), w > 0 && j.push({
        source: "Booking Started",
        target: "Not Found",
        value: w,
        label: T(w, y)
      }), C > 0 && j.push({
        source: "Booking Started",
        target: "Cancelled",
        value: C,
        label: T(C, y)
      }), M > 0 && j.push({
        source: "Booking Started",
        target: "No Pending Balance",
        value: M,
        label: T(M, y)
      }), S > 0 && j.push({
        source: "Booking Started",
        target: "Errors",
        value: S,
        label: T(S, y)
      }), D > 0 && j.push({
        source: "Booking Started",
        target: "Abandoned (Start)",
        value: D,
        label: T(D, y)
      }), I > 0 && j.push({
        source: "Payment Started",
        target: "Booking Success",
        value: I,
        label: T(I, y)
      }), V > 0 && j.push({
        source: "Payment Started",
        target: "Error: Payment Failed",
        value: V,
        label: T(V, y)
      }), { nodes: B, links: j };
    }), v = (p, y) => Dt(p, y);
    return (p, y) => (h(), ee(Se, {
      class: "booking-manager-root h-full min-h-0",
      title: "Booking Manager Metrics",
      subtitle: "Booking manager workflow tracking and analysis",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: y[0] || (y[0] = (k) => o("open"))
    }, {
      headerExport: O(() => [
        e.enableExport && !n.loading && !n.error ? (h(), ee(L(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        z(ct, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: O(() => [
            n.error ? (h(), x("div", Wp, [
              d("div", Kp, [
                y[1] || (y[1] = d("div", { class: "error-icon-wrapper" }, [
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
                y[2] || (y[2] = d("p", { class: "error-title" }, "Error loading data", -1)),
                d("p", Up, A(n.error), 1)
              ])
            ])) : (h(), x("div", Yp, [
              d("section", qp, [
                d("div", Xp, [
                  z(Yt, {
                    data: m.value,
                    height: "400px",
                    "use-gradient": !1,
                    "node-gap": 16
                  }, null, 8, ["data"])
                ])
              ]),
              d("section", Gp, [
                z(ve, {
                  color: "#22c55e",
                  title: "Booking Success Value",
                  value: u.value
                }, null, 8, ["value"])
              ]),
              i.value.length > 0 ? (h(), x("section", Zp, [
                y[3] || (y[3] = d("div", { class: "section-header" }, [
                  d("h4", { class: "section-title" }, "Daily Overview")
                ], -1)),
                d("div", Qp, [
                  z(ut, {
                    columns: l,
                    rows: r.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": O(({ row: k }) => [
                      d("span", Jp, A(L(Ne)(String(k.date)).format("MMM DD")), 1)
                    ]),
                    "cell-initiated": O(({ row: k }) => [
                      d("span", null, A(L(ge)(Number(k.booking_initiated_count))), 1)
                    ]),
                    "cell-started": O(({ row: k }) => [
                      d("span", null, [
                        Ae(A(L(ge)(Number(k.booking_started_count))) + " ", 1),
                        d("span", e0, " (" + A(v(
                          Number(k.booking_started_count),
                          Number(k.booking_initiated_count)
                        )) + ") ", 1)
                      ])
                    ]),
                    "cell-paymentInitiated": O(({ row: k }) => [
                      d("span", null, A(L(ge)(Number(k.payment_initiated_count))), 1)
                    ]),
                    "cell-paymentResults": O(({ row: k }) => [
                      d("div", t0, [
                        z(Xe, { color: "success" }, {
                          default: O(() => [
                            Ae(" Booking Success: " + A(L(ge)(
                              g(k)
                            )), 1)
                          ]),
                          _: 2
                        }, 1024),
                        z(Xe, { color: "danger" }, {
                          default: O(() => [
                            Ae(" Payment Failed: " + A(L(ge)(Number(k.payment_failed_count) || 0)), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    "cell-paymentValue": O(({ row: k }) => [
                      f(k).length > 0 ? (h(), x("div", a0, [
                        (h(!0), x(he, null, pe(f(
                          k
                        ), (_) => (h(), x("span", {
                          key: `${k.date}-${_.currency}`,
                          class: "badge badge-currency"
                        }, A(_.currency) + " " + A(b(_.total_value)), 1))), 128))
                      ])) : (h(), x("span", n0, "N/A"))
                    ]),
                    "cell-outcomes": O(({ row: k }) => [
                      d("div", o0, [
                        z(Xe, { color: "danger" }, {
                          default: O(() => [
                            Ae(" Not Found: " + A(k.not_found_count ? L(ge)(Number(k.not_found_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        z(Xe, { color: "warning" }, {
                          default: O(() => [
                            Ae(" Cancelled: " + A(k.cancelled_count ? L(ge)(Number(k.cancelled_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        z(Xe, { color: "orange" }, {
                          default: O(() => [
                            Ae(" No Balance: " + A(k.no_pending_balance_count ? L(ge)(Number(k.no_pending_balance_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        z(Xe, { color: "danger" }, {
                          default: O(() => [
                            Ae(" Errors: " + A(k.error_count ? L(ge)(Number(k.error_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (h(), x("section", s0, [...y[4] || (y[4] = [
                d("div", { class: "empty-state-content" }, [
                  d("div", { class: "empty-icon-wrapper" }, [
                    d("svg", {
                      class: "empty-icon",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    }, [
                      d("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      })
                    ])
                  ]),
                  d("p", { class: "empty-title" }, "No booking manager data available"),
                  d("p", { class: "empty-description" }, " No booking manager data found for the selected period. Try adjusting the date range. ")
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
}), l0 = /* @__PURE__ */ be(i0, [["__scopeId", "data-v-e1f0043e"]]), r0 = { class: "card-body" }, c0 = {
  key: 0,
  class: "chart-section"
}, d0 = { class: "chart-wrapper" }, u0 = {
  key: 1,
  class: "checkin-daily-section"
}, h0 = { class: "w-full min-w-0" }, f0 = { class: "font-medium" }, g0 = { class: "cell-success" }, m0 = { class: "cell-danger" }, p0 = {
  key: 0,
  class: "reasons-list"
}, b0 = { class: "reason-name" }, v0 = { class: "reason-count" }, y0 = {
  key: 1,
  class: "no-reasons"
}, x0 = {
  key: 2,
  class: "empty-state"
}, k0 = {
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
    }, l = ne([]), r = [
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
    }, u = $(
      () => o.showPaymentLinks ? [...r, c] : r
    ), f = $(
      () => (l.value || []).map((w) => ({
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
    ), g = $(() => {
      const w = o.data;
      return w && (Array.isArray(w.checkin_by_day) && w.checkin_by_day.length > 0 || (w.total_checkin_initiated ?? 0) > 0) ? { ...s, ...w } : o.checkinData ?? s;
    }), b = $(() => {
      const w = o.data;
      return w && (Array.isArray(w.failed_by_step_by_day) && w.failed_by_step_by_day.length > 0 || Array.isArray(w.unrecovered_by_step) && w.unrecovered_by_step.length > 0) ? {
        ...i,
        total_checkin_failed: w.total_checkin_failed ?? 0,
        total_checkin_unrecovered: w.total_checkin_unrecovered ?? 0,
        failed_by_step_by_day: w.failed_by_step_by_day ?? [],
        unrecovered_by_step: w.unrecovered_by_step ?? [],
        unrecovered_by_day: w.unrecovered_by_day ?? []
      } : o.failedData ?? i;
    }), m = (w, C) => !C || C === 0 ? "0.0%" : Dt(w, C), v = (w, C) => {
      const M = ge(w), S = m(w, C);
      return `${M} (${S})`;
    }, p = (w) => w.reduce((C, M) => C + M.failed_count, 0), y = $(() => {
      const w = [], C = [], M = /* @__PURE__ */ new Set(), S = (ae, G = {}) => {
        M.has(ae) || (w.push({ name: ae, ...G }), M.add(ae));
      };
      if (!g.value.total_checkin_initiated)
        return { nodes: w, links: C };
      S("Checkin Init", { value: g.value.total_checkin_initiated }), S("Booking retrive"), S("Booking retrive success"), S("Number of Passengers"), S("Completed"), S("Closed with BP");
      const I = g.value.total_checkin_initiated, V = g.value.total_checkin_init, H = g.value.total_checkin_init_abandoned || 0, D = g.value.total_checkin_pre_init_abandoned_error, T = g.value.total_checkin_pre_init_abandoned_voluntary, B = D != null || T != null, j = B ? Math.max(Number(D) || 0, 0) : 0, W = B ? Math.max(Number(T) || 0, 0) : 0, J = g.value.total_checkin_init_abandoned_error, re = g.value.total_checkin_init_abandoned_voluntary, ue = J != null || re != null, q = ue ? Math.max(Number(J) || 0, 0) : 0, oe = ue ? Math.max(Number(re) || 0, 0) : 0, R = ue ? Math.max(H - q - oe, 0) : H, K = V - H, Y = g.value.total_checkin_started, N = g.value.total_checkin_completed, ie = g.value.total_checkin_closed, ce = b.value.unrecovered_by_step || [], ye = ce.reduce(
        (ae, G) => ae + G.count,
        0
      );
      V > 0 && C.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: V,
        label: ke(V, I)
      });
      const U = I - V;
      B ? (W > 0 && (S("Abandoned (Init)", { status: "abandon" }), C.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: W,
        label: ke(W, I)
      })), j > 0 && (S("Booking not retreived", { status: "error" }), C.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: j,
        label: ke(j, I)
      }))) : U > 0 && (S("Abandoned (Init)", { status: "abandon" }), C.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: U,
        label: ke(U, I)
      })), ue ? (q > 0 && (S("Error", { status: "error" }), C.push({
        source: "Booking retrive",
        target: "Error",
        value: q,
        label: ke(q, I)
      })), oe > 0 && (S("Abandoned (Started)", { status: "abandon" }), C.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: oe,
        label: ke(oe, I)
      })), R > 0 && (S("Abandoned (Started)", { status: "abandon" }), C.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: R,
        label: ke(R, I)
      }))) : H > 0 && (S("Abandoned (Started)", { status: "abandon" }), C.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: H,
        label: ke(H, I)
      })), K > 0 && C.push({
        source: "Booking retrive",
        target: "Booking retrive success",
        value: K,
        label: ke(K, I)
      }), Y > 0 && C.push({
        source: "Booking retrive success",
        target: "Number of Passengers",
        value: Y,
        label: ke(Y, I)
      }), N > 0 && C.push({
        source: "Number of Passengers",
        target: "Completed",
        value: N,
        label: ke(N, I)
      }), ce.length > 0 && ye > 0 && (S("Unrecovered", { status: "error" }), C.push({
        source: "Number of Passengers",
        target: "Unrecovered",
        value: ye,
        label: ke(ye, I)
      }), ce.forEach((ae, G) => {
        const X = ae.step_name.replace(/_/g, " ").split(" ").map((te) => te.charAt(0).toUpperCase() + te.slice(1)).join(" ");
        S(X, { status: "error", order: G + 1 }), C.push({
          source: "Unrecovered",
          target: X,
          value: ae.count,
          label: ke(ae.count, I)
        });
      }));
      const le = Y - (N + ye);
      le > 0 && (S("Abandoned (Flow)", { status: "abandon" }), C.push({
        source: "Number of Passengers",
        target: "Abandoned (Flow)",
        value: le,
        label: ke(le, I)
      }));
      const de = N - ie;
      return de > 0 && (S("BP Error", { status: "error", order: 0 }), C.push({
        source: "Completed",
        target: "BP Error",
        value: de,
        label: ke(de, I)
      })), ie > 0 && C.push({
        source: "Completed",
        target: "Closed with BP",
        value: ie,
        label: ke(ie, I)
      }), { nodes: w, links: C };
    }), k = () => {
      const w = o.data?.record_locator_by_day;
      if (Array.isArray(w) && w.length > 0) return w;
      const C = o.checkinData?.record_locator_by_day;
      return Array.isArray(C) && C.length > 0 ? C : [];
    }, _ = () => {
      const w = g.value.checkin_by_day || [], C = b.value.failed_by_step_by_day || [], M = k();
      if (w.length === 0) {
        l.value = [];
        return;
      }
      l.value = [...w].map((S) => {
        const I = C.find(
          (H) => H.date === S.date
        ), V = M.find(
          (H) => H.date === S.date
        );
        return {
          ...S,
          failed_steps: I?.steps || [],
          record_locator_create_payment_count: S.record_locator_create_payment_count ?? V?.record_locator_create_payment_count ?? 0
        };
      }), l.value.sort((S, I) => new Date(S.date) - new Date(I.date));
    };
    return Le(
      [() => o.data, () => o.checkinData, () => o.failedData],
      () => {
        _();
      },
      { deep: !0, immediate: !0 }
    ), (w, C) => (h(), ee(Se, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !e.loading ? (h(), ee(L(ze), {
          key: 0,
          variant: "inline",
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", r0, [
          y.value.nodes.length > 0 ? (h(), x("section", c0, [
            d("div", d0, [
              z(Yt, {
                data: y.value,
                height: "400px",
                "use-gradient": !1,
                "node-gap": 16
              }, null, 8, ["data"])
            ])
          ])) : F("", !0),
          l.value && l.value.length > 0 ? (h(), x("section", u0, [
            d("div", h0, [
              z(ut, {
                columns: u.value,
                rows: f.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": O(({ row: M }) => [
                  d("span", f0, A(L(Ne)(String(M.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": O(({ row: M }) => [
                  d("span", null, A(L(ge)(M.checkin_initiated_count)), 1)
                ]),
                "cell-bookingRetrieve": O(({ row: M }) => [
                  d("span", null, A(v(
                    M.checkin_init_count,
                    M.checkin_initiated_count
                  )), 1)
                ]),
                "cell-passengers": O(({ row: M }) => [
                  d("span", null, A(L(ge)(M.checkin_started_count)), 1)
                ]),
                "cell-completed": O(({ row: M }) => [
                  d("span", null, A(v(
                    M.checkin_completed_count,
                    M.checkin_initiated_count
                  )), 1)
                ]),
                "cell-closed": O(({ row: M }) => [
                  d("span", g0, A(v(
                    M.checkin_closed_count,
                    M.checkin_initiated_count
                  )), 1)
                ]),
                "cell-failed": O(({ row: M }) => [
                  d("span", m0, A(v(
                    p(M.failed_steps),
                    M.checkin_initiated_count
                  )), 1)
                ]),
                "cell-reasons": O(({ row: M }) => [
                  M.failed_steps && M.failed_steps.length > 0 ? (h(), x("div", p0, [
                    (h(!0), x(he, null, pe(M.failed_steps, (S) => (h(), x("div", {
                      key: S.step_name,
                      class: "reason-item"
                    }, [
                      d("span", b0, A(S.step_name.replace(/_/g, " ")) + ":", 1),
                      d("span", v0, A(S.failed_count), 1)
                    ]))), 128))
                  ])) : (h(), x("div", y0, "-"))
                ]),
                "cell-createPayment": O(({ row: M }) => [
                  d("span", null, A(L(ge)(M.record_locator_create_payment_count ?? 0)), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (h(), x("section", x0, [...C[0] || (C[0] = [
            d("div", { class: "empty-state-content" }, [
              d("div", { class: "empty-icon-wrapper" }, [
                d("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  })
                ])
              ]),
              d("p", { class: "empty-title" }, "No check-in data available"),
              d("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see check-in performance data. ")
            ], -1)
          ])]))
        ])
      ]),
      _: 1
    }, 8, ["collapsible", "default-open", "loading"]));
  }
}, _0 = /* @__PURE__ */ be(k0, [["__scopeId", "data-v-ae5fc0f7"]]), w0 = { class: "card-body" }, C0 = {
  key: 0,
  class: "sankey-section"
}, $0 = {
  key: 1,
  class: "checkin-metrics-daily-section"
}, S0 = { class: "w-full min-w-0" }, M0 = { class: "font-medium whitespace-nowrap" }, D0 = { class: "cell-success" }, A0 = { class: "cell-danger" }, T0 = {
  key: 0,
  class: "reasons-list"
}, B0 = { class: "reason-name" }, L0 = { class: "reason-count" }, R0 = {
  key: 1,
  class: "no-reasons"
}, I0 = {
  key: 2,
  class: "empty-state"
}, P0 = { class: "empty-state-content" }, E0 = { class: "empty-icon-wrapper" }, O0 = /* @__PURE__ */ fe({
  __name: "CheckinMetrics",
  props: {
    initiallyOpen: { type: Boolean, default: !1 },
    collapsible: { type: Boolean, default: !0 },
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
    const n = e, o = a, s = (C) => {
      o("export", C);
    }, { isDark: i } = Me($e(n, "theme")), l = (C) => C == null ? "0" : C.toLocaleString(), r = (C) => {
      const [M, S, I] = C.split("-").map(Number);
      return Ne([M, S - 1, I]).format("MMM DD");
    }, c = (C) => C.replace(/_/g, " ").replace(/\b\w/g, (M) => M.toUpperCase()), u = (C, M) => Dt(C, M), f = (C, M) => {
      const S = C || 0, I = M || 0, V = l(S), H = u(S, I);
      return `${V} (${H})`;
    }, g = $(() => {
      const C = n.checkinData?.record_locator_by_day || [], M = n.failedData?.failed_by_step_by_day || [], S = n.failedData?.unrecovered_by_day || [];
      return C.map((V) => {
        const H = M.find((T) => T.date === V.date), D = S.find(
          (T) => T.date === V.date
        );
        return {
          ...V,
          failed_steps: H?.steps || [],
          unrecovered_count: D?.unrecovered_count || 0
        };
      }).sort(
        (V, H) => new Date(V.date).getTime() - new Date(H.date).getTime()
      );
    }), b = /* @__PURE__ */ new Set([
      "choose_boardingpass",
      "boarding_pass",
      "generate_boarding_pass"
    ]), m = (C) => {
      if (!C) return !1;
      const M = C.toLowerCase().trim();
      return b.has(M) || M.includes("boarding_pass");
    }, v = (C) => {
      const M = C?.failed_by_step_by_day || [];
      let S = 0;
      for (const I of M)
        for (const V of I.steps || [])
          m(V.step_name) && (S += V.failed_count || 0);
      if (S > 0) return S;
      for (const I of C?.unrecovered_by_step || [])
        m(I.step_name) && (S += I.count || 0);
      return S;
    }, p = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Initiated by agent", align: "center" },
      { key: "bookingRetrieved", label: "Check In Started (%)", align: "center" },
      { key: "closed", label: "Check In Success (%)", align: "center" },
      { key: "completed", label: "Boarding Pass Issued (%)", align: "center" },
      { key: "failed", label: "Errors (%)", align: "center" },
      { key: "reasons", label: "Failed (Reasons)", align: "center" }
    ], y = {
      key: "createPayment",
      label: "Create Payment",
      align: "center"
    }, k = $(() => n.isAvianca ? [...p, y] : p), _ = $(
      () => g.value.map((C) => ({
        id: C.date,
        date: C.date,
        checkin_initiated: C.checkin_initiated,
        record_locator_init_count: C.record_locator_init_count,
        record_locator_started_count: C.record_locator_started_count,
        record_locator_completed_count: C.record_locator_completed_count,
        record_locator_closed_count: C.record_locator_closed_count,
        unrecovered_count: C.unrecovered_count,
        failed_steps: C.failed_steps,
        record_locator_create_payment_count: C.record_locator_create_payment_count
      }))
    ), w = $(() => {
      const C = [], M = [], S = /* @__PURE__ */ new Set(), I = (xe, Te = {}) => {
        S.has(xe) || (C.push({ name: xe, ...Te }), S.add(xe));
      };
      if (!n.checkinData?.total_checkin_initiated)
        return { nodes: C, links: M };
      const V = n.checkinData.total_checkin_initiated || 0;
      I("Initiated by agent", { value: V }), I("Check In Started"), I("Check In Success"), I("Boarding Pass Issued");
      const H = n.checkinData.total_record_locator_init || 0, D = n.checkinData.total_record_locator_init_abandoned || 0, T = n.checkinData.total_checkin_pre_init_abandoned_error, B = n.checkinData.total_checkin_pre_init_abandoned_voluntary, j = T != null || B != null, W = j ? Math.max(Number(T) || 0, 0) : 0, J = j ? Math.max(Number(B) || 0, 0) : 0, re = n.checkinData.total_record_locator_init_abandoned_error, ue = n.checkinData.total_record_locator_init_abandoned_voluntary, q = re != null || ue != null, oe = q ? Math.max(Number(re) || 0, 0) : 0, R = q ? Math.max(Number(ue) || 0, 0) : 0, K = q ? Math.max(D - oe - R, 0) : D, Y = Math.max(H - D, 0), N = n.checkinData.total_record_locator_started || 0, ie = n.checkinData.total_record_locator_completed || 0, ce = n.checkinData.total_record_locator_closed || 0, ye = n.checkinData.total_record_locator_unrecovered || 0, U = Math.max(V - H, 0), le = W + oe, de = j ? J + (q ? R + K : D) : U + (q ? R + K : D);
      Y > 0 && M.push({
        source: "Initiated by agent",
        target: "Check In Started",
        value: Y,
        label: ke(Y, V)
      }), de > 0 && (I("Abandoned: No booking provided", { status: "abandon" }), M.push({
        source: "Initiated by agent",
        target: "Abandoned: No booking provided",
        value: de,
        label: ke(de, V)
      }));
      const ae = n.checkinData.total_checkin_retrieval_user_error, G = n.checkinData.total_checkin_retrieval_business_rule, P = n.checkinData.total_checkin_retrieval_tech_error, X = n.checkinData.total_checkin_retrieval_unknown_error, te = ae != null || G != null || P != null || X != null, E = (xe, Te) => {
        const Be = Math.max(Number(Te) || 0, 0);
        Be > 0 && (I(xe, { status: "error" }), M.push({
          source: "Initiated by agent",
          target: xe,
          value: Be,
          label: ke(Be, V)
        }));
      };
      te ? (E("Error: User error", ae), E("Error: Business rule", G), E("Error: Tech error", P), E("Error: Unknown error", X)) : le > 0 && (I("Error: On Retrieval", { status: "error" }), M.push({
        source: "Initiated by agent",
        target: "Error: On Retrieval",
        value: le,
        label: ke(le, V)
      })), ce > 0 && M.push({
        source: "Check In Started",
        target: "Check In Success",
        value: ce,
        label: ke(ce, V)
      });
      const Q = v(n.failedData), se = Math.min(Q, Math.max(ce - ie, 0));
      ie > 0 && M.push({
        source: "Check In Success",
        target: "Boarding Pass Issued",
        value: ie,
        label: ke(ie, V)
      }), se > 0 && (I("Error: BP Not Issued", { status: "error" }), M.push({
        source: "Check In Success",
        target: "Error: BP Not Issued",
        value: se,
        label: ke(se, V)
      }));
      const me = Math.max(ce - ie - se, 0);
      if (me > 0) {
        const xe = n.isAvianca ? "Abandoned after Closed" : "Abandoned: Check In Incomplete";
        I(xe, { status: "abandon" }), M.push({
          source: "Check In Success",
          target: xe,
          value: me,
          label: ke(me, V)
        });
      }
      ye > 0 && (I("Error: On Check In Process", { status: "error" }), M.push({
        source: "Check In Started",
        target: "Error: On Check In Process",
        value: ye,
        label: ke(ye, V)
      }));
      const we = Math.max(N - ce - ye, 0);
      return we > 0 && (I("Abandoned: Check In Incomplete", { status: "abandon" }), M.push({
        source: "Check In Started",
        target: "Abandoned: Check In Incomplete",
        value: we,
        label: ke(we, V)
      })), { nodes: C, links: M };
    });
    return t({ isDark: i }), (C, M) => (h(), ee(Se, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      collapsible: e.collapsible,
      "default-open": n.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !e.loading ? (h(), ee(L(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", w0, [
          w.value.nodes.length > 0 ? (h(), x("div", C0, [
            z(Yt, {
              data: w.value,
              height: "400px",
              "use-gradient": !1,
              "node-gap": 16
            }, null, 8, ["data"])
          ])) : F("", !0),
          g.value && g.value.length > 0 ? (h(), x("div", $0, [
            d("div", S0, [
              z(ut, {
                columns: k.value,
                rows: _.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": O(({ row: S }) => [
                  d("span", M0, A(r(String(S.date))), 1)
                ]),
                "cell-checkinInit": O(({ row: S }) => [
                  d("span", null, A(l(S.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieved": O(({ row: S }) => [
                  d("span", null, A(f(
                    S.record_locator_started_count,
                    S.checkin_initiated
                  )), 1)
                ]),
                "cell-closed": O(({ row: S }) => [
                  d("span", null, A(f(
                    S.record_locator_closed_count,
                    S.checkin_initiated
                  )), 1)
                ]),
                "cell-completed": O(({ row: S }) => [
                  d("span", D0, A(f(
                    S.record_locator_completed_count,
                    S.checkin_initiated
                  )), 1)
                ]),
                "cell-failed": O(({ row: S }) => [
                  d("span", A0, A(f(
                    S.unrecovered_count,
                    S.checkin_initiated
                  )), 1)
                ]),
                "cell-createPayment": O(({ row: S }) => [
                  d("span", null, A(l(
                    S.record_locator_create_payment_count ?? 0
                  )), 1)
                ]),
                "cell-reasons": O(({ row: S }) => [
                  Array.isArray(S.failed_steps) && S.failed_steps.length > 0 ? (h(), x("div", T0, [
                    (h(!0), x(he, null, pe(S.failed_steps, (I) => (h(), x("div", {
                      key: I.step_name,
                      class: "reason-item"
                    }, [
                      d("span", B0, A(c(I.step_name)) + ":", 1),
                      d("span", L0, A(I.failed_count), 1)
                    ]))), 128))
                  ])) : (h(), x("div", R0, "-"))
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (h(), x("div", I0, [
            d("div", P0, [
              d("div", E0, [
                z(L(dt), { class: "empty-icon" })
              ]),
              M[0] || (M[0] = d("p", { class: "empty-title" }, "No check-in data available", -1)),
              M[1] || (M[1] = d("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see check-in metrics. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["collapsible", "default-open", "loading"]));
  }
}), Sl = /* @__PURE__ */ be(O0, [["__scopeId", "data-v-e9a495b0"]]), F0 = { class: "card-body" }, V0 = {
  key: 0,
  class: "checkin-segments-daily-section"
}, N0 = { class: "w-full min-w-0" }, z0 = { class: "segment-plain" }, j0 = { class: "segment-plain" }, H0 = { class: "segment-plain" }, W0 = { class: "percentage-value" }, K0 = { class: "percentage-value" }, U0 = { class: "percentage-value success" }, Y0 = {
  key: 1,
  class: "empty-state"
}, q0 = /* @__PURE__ */ fe({
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
    const n = e, o = a, s = (g) => {
      o("export", g);
    }, { isDark: i } = Me($e(n, "theme")), l = [
      { key: "departure", label: "Departure", align: "center" },
      { key: "connection", label: "Connection", align: "center" },
      { key: "arrival", label: "Arrival", align: "center" },
      { key: "trip", label: "Trip", align: "center" },
      { key: "init", label: "Init", align: "center" },
      { key: "started", label: "Started (%)", align: "center" },
      { key: "closed", label: "Check-in Closed (%)", align: "center" },
      { key: "completed", label: "BP Issued (%)", align: "center" }
    ], r = $(
      () => n.data.map((g, b) => ({
        id: `segment-${b}-${g.departure_airport}-${g.arrival_airport}-${g.segment_init_count}-${g.segment_started_count}`,
        departure_airport: g.departure_airport,
        conexion_airport: g.conexion_airport,
        arrival_airport: g.arrival_airport,
        segment_init_count: g.segment_init_count,
        segment_started_count: g.segment_started_count,
        segment_completed_count: g.segment_completed_count,
        segment_closed_count: g.segment_closed_count
      }))
    ), c = (g, b) => !b || b === 0 || !g ? "0%" : `${Math.round(g / b * 100)}%`, u = (g) => !g || g === "None" ? "-" : String(g).trim().replace(/_[0-9]+$/i, ""), f = (g) => {
      const b = u(g?.departure_airport), m = u(g?.arrival_airport);
      return b === "-" || m === "-" ? !1 : b === m;
    };
    return t({ isDark: i }), (g, b) => (h(), ee(Se, {
      class: "checkin-segments-root h-full min-h-0",
      title: "Checkin Segments",
      subtitle: "Breakdown by flight segment with connection when applicable",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !n.loading ? (h(), ee(L(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", F0, [
          n.data.length > 0 ? (h(), x("section", V0, [
            d("div", N0, [
              z(ut, {
                columns: l,
                rows: r.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-departure": O(({ row: m }) => [
                  d("span", z0, A(u(m.departure_airport)), 1)
                ]),
                "cell-connection": O(({ row: m }) => [
                  d("span", {
                    class: Z(["segment-plain", {
                      "segment-plain--muted": u(m.conexion_airport) === "-"
                    }])
                  }, A(u(m.conexion_airport)), 3)
                ]),
                "cell-arrival": O(({ row: m }) => [
                  d("span", j0, A(u(m.arrival_airport)), 1)
                ]),
                "cell-trip": O(({ row: m }) => [
                  d("span", H0, A(f(m) ? "Roundtrip" : "One way"), 1)
                ]),
                "cell-init": O(({ row: m }) => [
                  Ae(A(L(ge)(m.segment_init_count)), 1)
                ]),
                "cell-started": O(({ row: m }) => [
                  d("span", W0, A(c(
                    m.segment_started_count,
                    m.segment_init_count
                  )), 1)
                ]),
                "cell-closed": O(({ row: m }) => [
                  d("span", K0, A(c(
                    m.segment_closed_count,
                    m.segment_init_count
                  )), 1)
                ]),
                "cell-completed": O(({ row: m }) => [
                  d("span", U0, A(c(
                    m.segment_completed_count,
                    m.segment_init_count
                  )), 1)
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (h(), x("section", Y0, [...b[0] || (b[0] = [
            d("div", { class: "empty-state-content" }, [
              d("div", { class: "empty-icon-wrapper" }, [
                d("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  })
                ])
              ]),
              d("p", { class: "empty-title" }, "No segment data available"),
              d("p", { class: "empty-description" }, " No flight segment data found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])]))
        ])
      ]),
      _: 1
    }, 8, ["collapsible", "default-open", "loading"]));
  }
}), Ml = /* @__PURE__ */ be(q0, [["__scopeId", "data-v-9a9d7a34"]]), X0 = { class: "checkin-container__body" }, G0 = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = $(
      () => a.loading ? !1 : a.checkinLoading
    ), s = $(
      () => a.loading ? !1 : a.segmentsLoading
    );
    function i(c, u) {
      n("export", { source: c, format: u });
    }
    function l(c) {
      return typeof c == "object" && c !== null && "source" in c;
    }
    function r(c) {
      if (l(c)) {
        n("export", c);
        return;
      }
      i("checkinSegments", c);
    }
    return (c, u) => (h(), ee(Se, {
      class: "checkin-container-root w-full",
      title: "Check in",
      subtitle: "Check-in flows and segment breakdown.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: u[1] || (u[1] = (f) => n("open"))
    }, {
      default: O(() => [
        d("div", X0, [
          e.showCheckin ? (h(), ee(Sl, {
            key: 0,
            class: "w-full min-h-0",
            collapsible: !1,
            "initially-open": e.childrenInitiallyOpen,
            loading: o.value,
            "checkin-data": e.checkinData,
            "failed-data": e.checkinFailedData,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            "is-avianca": e.showPaymentLinks,
            onExport: u[0] || (u[0] = (f) => i("checkin", f))
          }, null, 8, ["initially-open", "loading", "checkin-data", "failed-data", "enable-export", "export-loading", "is-avianca"])) : F("", !0),
          z(Ml, {
            collapsible: !1,
            "initially-open": e.childrenInitiallyOpen,
            loading: s.value,
            data: e.segmentsData ?? [],
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            onExport: r
          }, null, 8, ["initially-open", "loading", "data", "theme", "enable-export", "export-loading"])
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), Z0 = /* @__PURE__ */ be(G0, [["__scopeId", "data-v-bedc6aa8"]]), Q0 = { class: "card-body" }, J0 = { class: "chart-section" }, eb = { class: "chart-wrapper" }, tb = {
  key: 1,
  class: "empty-chart"
}, ab = { class: "payment-success-summary" }, nb = {
  key: 0,
  class: "disruption-daily-section"
}, ob = { class: "w-full min-w-0" }, sb = { class: "font-medium text-center" }, ib = { class: "text-center" }, lb = { class: "text-center" }, rb = { class: "percentage-text" }, cb = { class: "text-center" }, db = { class: "abandoned-value" }, ub = { class: "badges-container badges-wrap" }, hb = { class: "badges-container badges-wrap" }, fb = {
  key: 1,
  class: "empty-state"
}, gb = /* @__PURE__ */ fe({
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
    function a(p) {
      return p;
    }
    const n = e, o = t, s = (p) => {
      o("export", p);
    }, i = $(() => n.data?.disruption_by_day ? [...n.data.disruption_by_day].sort(
      (p, y) => new Date(p.date).getTime() - new Date(y.date).getTime()
    ) : []), l = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated by agent", align: "center" },
      { key: "started", label: "Disruption started", align: "center" },
      { key: "abandoned", label: "Abandoned (%)", align: "center" },
      { key: "voluntary", label: "Voluntary", align: "center" },
      { key: "involuntary", label: "Involuntary", align: "center" }
    ], r = $(
      () => i.value.map((p) => ({
        id: p.date,
        ...p
      }))
    ), c = $(() => n.data?.total_payment_success || []), u = $(() => {
      const p = c.value;
      return p.length === 0 ? g(0) : p.map((y) => `${y.currency} ${g(y.total_value)}`).join(" · ");
    }), f = (p, y) => Dt(p, y), g = (p) => Oe(p), b = (p) => (p ?? []).reduce((y, k) => y + (k.count ?? 0), 0), m = (p) => typeof p.sell_success_count == "number" ? p.sell_success_count : b(p.payment_success_total), v = $(() => {
      const p = n.data, y = p.total_disruption_conversations || 0, k = p.total_disruption_initiated || 0, _ = p.total_voluntary || 0, w = p.total_involuntary || 0, C = p.total_accepted || 0, M = p.total_confirmed || 0, S = typeof p.total_sell_success == "number" ? p.total_sell_success : b(p.total_payment_success), I = p.total_sell_failed || 0, V = Math.max(0, y - k), H = Math.max(
        0,
        k - _ - w
      ), D = Math.max(0, w - C), T = Math.max(0, _ - M), B = I, j = Math.max(0, M - S - B), W = (ue, q) => ke(ue, q), J = [
        { name: "Initiated by agent", status: "success" },
        { name: "Disruption started", status: "success" },
        { name: "Voluntary", status: "success" },
        { name: "Selected", status: "success" },
        { name: "Voluntary change success", status: "success" },
        { name: "Not Paid", status: "abandon" },
        { name: "Error: payment rejected", status: "error" },
        { name: "Not Confirmed", status: "abandon" },
        { name: "Involuntary", status: "success" },
        { name: "Involuntary change accepted", status: "success" },
        { name: "Redirect to Human", status: "error" },
        { name: "Abandoned: No Response", status: "abandon" },
        { name: "Abandoned (Start)", status: "abandon" }
      ], re = [];
      return k > 0 && re.push({
        source: "Initiated by agent",
        target: "Disruption started",
        value: k,
        label: W(k, y)
      }), V > 0 && re.push({
        source: "Initiated by agent",
        target: "Abandoned: No Response",
        value: V,
        label: W(V, y)
      }), _ > 0 && re.push({
        source: "Disruption started",
        target: "Voluntary",
        value: _,
        label: W(_, y)
      }), w > 0 && re.push({
        source: "Disruption started",
        target: "Involuntary",
        value: w,
        label: W(w, y)
      }), H > 0 && re.push({
        source: "Disruption started",
        target: "Abandoned (Start)",
        value: H,
        label: W(H, y)
      }), C > 0 && re.push({
        source: "Involuntary",
        target: "Involuntary change accepted",
        value: C,
        label: W(C, y)
      }), D > 0 && re.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: D,
        label: W(D, y)
      }), M > 0 && re.push({
        source: "Voluntary",
        target: "Selected",
        value: M,
        label: W(M, y)
      }), T > 0 && re.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: T,
        label: W(T, y)
      }), S > 0 && re.push({
        source: "Selected",
        target: "Voluntary change success",
        value: S,
        label: W(S, y)
      }), B > 0 && re.push({
        source: "Selected",
        target: "Error: payment rejected",
        value: B,
        label: W(B, y)
      }), j > 0 && re.push({
        source: "Selected",
        target: "Not Paid",
        value: j,
        label: W(j, y)
      }), { nodes: J, links: re };
    });
    return (p, y) => (h(), ee(Se, {
      class: "disruption-metrics-root h-full min-h-0",
      title: "Disruption Manager Metrics",
      subtitle: "Disruption workflow performance and completion tracking",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: y[0] || (y[0] = (k) => o("open"))
    }, {
      headerExport: O(() => [
        e.enableExport && !n.loading ? (h(), ee(L(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", Q0, [
          d("section", J0, [
            d("div", eb, [
              v.value.nodes.length > 0 && v.value.links.length > 0 ? (h(), ee(Yt, {
                key: 0,
                data: v.value,
                height: "400px",
                "use-gradient": !1,
                "node-gap": 16
              }, null, 8, ["data"])) : (h(), x("div", tb, [...y[1] || (y[1] = [
                d("p", { class: "empty-chart-text" }, " No disruption data available for visualization ", -1)
              ])]))
            ])
          ]),
          d("section", ab, [
            z(ve, {
              color: "#22c55e",
              title: "Payment Success Value",
              value: u.value
            }, null, 8, ["value"])
          ]),
          i.value && i.value.length > 0 ? (h(), x("section", nb, [
            y[2] || (y[2] = d("div", { class: "section-header" }, [
              d("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            d("div", ob, [
              z(ut, {
                columns: l,
                rows: r.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": O(({ row: k }) => [
                  d("span", sb, A(L(Ne)(String(k.date)).format("MMM DD")), 1)
                ]),
                "cell-initiated": O(({ row: k }) => [
                  d("span", ib, A(L(ge)(Number(k.disruption_conversations))), 1)
                ]),
                "cell-started": O(({ row: k }) => [
                  d("span", lb, [
                    Ae(A(L(ge)(Number(k.disruption_initiated_count))) + " ", 1),
                    d("span", rb, " (" + A(f(
                      Number(k.disruption_initiated_count),
                      Number(k.disruption_conversations)
                    )) + ") ", 1)
                  ])
                ]),
                "cell-abandoned": O(({ row: k }) => [
                  d("span", cb, [
                    d("span", db, A(L(ge)(
                      Number(k.disruption_initiated_count) - Number(k.voluntary_count) - Number(k.involuntary_count)
                    )) + " (" + A(f(
                      Number(k.disruption_initiated_count) - Number(k.voluntary_count) - Number(k.involuntary_count),
                      Number(k.disruption_conversations)
                    )) + ") ", 1)
                  ])
                ]),
                "cell-voluntary": O(({ row: k }) => [
                  d("div", ub, [
                    (h(!0), x(he, null, pe([k], (_, w) => (h(), x(he, { key: w }, [
                      z(Xe, {
                        color: "neutral",
                        outlined: !0
                      }, {
                        default: O(() => [
                          Ae(" VOL " + A(L(ge)(_.voluntary_count)) + " (" + A(f(
                            _.voluntary_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Xe, { color: "success" }, {
                        default: O(() => [
                          Ae(" Selected " + A(L(ge)(_.confirmed_count)) + " (" + A(f(
                            _.confirmed_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Xe, { color: "warning" }, {
                        default: O(() => [
                          Ae(" Not Confirm " + A(L(ge)(_.voluntary_count - _.confirmed_count)) + " (" + A(f(
                            _.voluntary_count - _.confirmed_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Xe, { color: "danger" }, {
                        default: O(() => [
                          Ae(" Payment rejected " + A(L(ge)(_.sell_failed_count)) + " (" + A(f(
                            _.sell_failed_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Xe, { color: "orange" }, {
                        default: O(() => [
                          Ae(" Not Paid " + A(L(ge)(
                            Math.max(
                              0,
                              _.confirmed_count - m(_) - _.sell_failed_count
                            )
                          )) + " (" + A(f(
                            Math.max(
                              0,
                              _.confirmed_count - m(_) - _.sell_failed_count
                            ),
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Xe, {
                        color: "success",
                        outlined: !0
                      }, {
                        default: O(() => [
                          Ae(" Voluntary change success " + A(L(ge)(m(_))) + " (" + A(f(
                            m(_),
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      (h(!0), x(he, null, pe(_.payment_success_total || [], (C) => (h(), ee(Xe, {
                        key: `${_.date}-${C.currency}`,
                        color: "neutral"
                      }, {
                        default: O(() => [
                          Ae(A(C.currency) + " " + A(g(C.total_value)), 1)
                        ]),
                        _: 2
                      }, 1024))), 128))
                    ], 64))), 128))
                  ])
                ]),
                "cell-involuntary": O(({ row: k }) => [
                  d("div", hb, [
                    (h(!0), x(he, null, pe([k], (_, w) => (h(), x(he, { key: w }, [
                      z(Xe, { color: "purple" }, {
                        default: O(() => [
                          Ae(" INV " + A(L(ge)(_.involuntary_count)) + " (" + A(f(
                            _.involuntary_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Xe, { color: "danger" }, {
                        default: O(() => [
                          Ae(" Human " + A(L(ge)(_.involuntary_count - _.accepted_count)) + " (" + A(f(
                            _.involuntary_count - _.accepted_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Xe, { color: "success" }, {
                        default: O(() => [
                          Ae(" Involuntary change accepted " + A(L(ge)(_.accepted_count)) + " (" + A(f(
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
          ])) : (h(), x("section", fb, [...y[3] || (y[3] = [
            d("div", { class: "empty-state-content" }, [
              d("div", { class: "empty-icon-wrapper" }, [
                d("svg", {
                  class: "empty-icon",
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
              ]),
              d("p", { class: "empty-title" }, "No disruption data available"),
              d("p", { class: "empty-description" }, " No disruption data found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), mb = /* @__PURE__ */ be(gb, [["__scopeId", "data-v-d98cd735"]]), pb = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, bb = { class: "w-full shrink-0 flex min-h-0 flex-col" }, vb = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, yb = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, xb = { class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4" }, kb = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, _b = /* @__PURE__ */ fe({
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
    const n = e, o = a, s = (b) => {
      o("export", b);
    }, i = $e(n, "theme"), { isDark: l } = Me(i), r = {
      airline_information: "#8b5cf6",
      booking_info: "#f59e0b",
      flight_status: "#06b6d4"
    }, c = ne({
      labels: [],
      datasets: []
    }), u = $(
      () => n.data ?? {
        total_faq_events: 0,
        total_documents_found: 0,
        total_airline_information_retrieved: 0,
        total_booking_info_retrieved: 0,
        total_flight_status_retrieved: 0,
        faq_by_day: []
      }
    ), f = $(() => {
      const b = u.value, m = b.total_airline_information_retrieved + b.total_booking_info_retrieved + b.total_flight_status_retrieved, v = (k) => m > 0 ? (k / m * 100).toFixed(1) : "0.0", p = b.total_faq_events, y = p > 0 ? `${(b.total_documents_found / p * 100).toFixed(1)}% of FAQ events` : void 0;
      return [
        {
          name: "airline_information",
          label: "Airline Info",
          color: r.airline_information,
          value: `${v(b.total_airline_information_retrieved)}%`,
          subvalue: `${ge(b.total_airline_information_retrieved)} consultas`
        },
        {
          name: "booking_info",
          label: "Booking Info",
          color: r.booking_info,
          value: `${v(b.total_booking_info_retrieved)}%`,
          subvalue: `${ge(b.total_booking_info_retrieved)} consultas`
        },
        {
          name: "flight_status",
          label: "Flight Status",
          color: r.flight_status,
          value: `${v(b.total_flight_status_retrieved)}%`,
          subvalue: `${ge(b.total_flight_status_retrieved)} consultas`
        },
        {
          name: "documents_found",
          label: "Documents found",
          color: "#64748b",
          value: ge(b.total_documents_found),
          subvalue: y
        }
      ];
    }), g = (b) => {
      if (!b) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const m = b.faq_by_day || [];
      if (m.length > 0) {
        const v = m.map(
          (_) => Ne(_.date).format("MMM DD")
        ), p = m.map(
          (_) => _.airline_information_retrieved_count || 0
        ), y = m.map(
          (_) => _.flight_status_retrieved_count || 0
        ), k = m.map(
          (_) => _.booking_info_retrieved_count || 0
        );
        c.value = {
          labels: v,
          datasets: [
            {
              label: "Airline Information",
              data: p,
              borderColor: r.airline_information,
              backgroundColor: "rgba(139, 92, 246, 0.1)",
              fill: !0
            },
            {
              label: "Flight Status",
              data: y,
              borderColor: r.flight_status,
              backgroundColor: "rgba(6, 182, 212, 0.1)",
              fill: !0
            },
            {
              label: "Booking Information",
              data: k,
              borderColor: r.booking_info,
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              fill: !0
            }
          ]
        };
      } else
        c.value = { labels: [], datasets: [] };
    };
    return Le(
      () => n.data,
      (b) => {
        g(b ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: l }), (b, m) => (h(), ee(Se, {
      class: "w-full min-h-0 self-start",
      title: "FAQs",
      subtitle: "FAQ volume by category",
      collapsible: !1,
      loading: n.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !n.loading ? (h(), ee(L(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", pb, [
          d("div", bb, [
            c.value.labels && c.value.labels.length ? (h(), x("section", vb, [
              d("div", yb, [
                z(pt, {
                  data: c.value,
                  theme: i.value
                }, null, 8, ["data", "theme"])
              ]),
              d("div", xb, [
                (h(!0), x(he, null, pe(f.value, (v) => (h(), ee(ve, {
                  key: v.name,
                  class: "min-w-0",
                  color: v.color,
                  title: v.label,
                  value: v.value,
                  subvalue: v.subvalue
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ])
            ])) : (h(), x("section", kb, [...m[0] || (m[0] = [
              d("div", { class: "max-w-[360px] px-4 text-center" }, [
                d("div", { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, [
                  d("svg", {
                    class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    "aria-hidden": "true"
                  }, [
                    d("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    })
                  ])
                ]),
                d("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No FAQ data available "),
                d("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No FAQ consultation data found for the selected period. Try adjusting the date range. ")
              ], -1)
            ])]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), wb = /* @__PURE__ */ be(_b, [["__scopeId", "data-v-74ceae76"]]);
function Rn(e, t) {
  return h(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "fill-rule": "evenodd",
      d: "M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z",
      "clip-rule": "evenodd"
    })
  ]);
}
function Cb(e, t) {
  return h(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "fill-rule": "evenodd",
      d: "M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z",
      "clip-rule": "evenodd"
    })
  ]);
}
function Ke() {
  const e = new Uint8Array(8);
  return globalThis.crypto.getRandomValues(e), Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("");
}
const ht = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", et = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", $b = "min-h-[5.5rem] w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans leading-normal text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", At = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", Tt = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", Sb = "kiut-select-option-badge shrink-0 whitespace-nowrap rounded-md px-2 py-0.5 text-[0.6875rem] font-medium leading-4";
function fi(e = "neutral") {
  return `${Sb} kiut-select-option-badge--${e}`;
}
const Mb = { class: "flex flex-row gap-3 items-center" }, Db = {
  key: 0,
  class: "mb-1.5 inline-flex shrink-0 text-[color:var(--kiut-text-muted)] [&>svg]:h-4 [&>svg]:w-4",
  "aria-hidden": "true"
}, Ab = ["disabled", "aria-expanded", "aria-labelledby", "aria-label", "aria-invalid", "aria-describedby"], Tb = { class: "flex min-w-0 flex-1 items-center gap-2.5 truncate" }, Bb = {
  key: 0,
  class: "border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-3 dark:border-[color:var(--kiut-border-light)]"
}, Lb = { class: "relative" }, Rb = {
  class: "pointer-events-none absolute inset-y-0 left-0 flex w-9 items-center justify-center",
  "aria-hidden": "true"
}, Ib = ["placeholder", "aria-label"], Pb = {
  key: 1,
  class: "px-3 pb-1 pt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, Eb = {
  key: 0,
  class: "px-3 py-2 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, Ob = ["aria-selected", "onClick", "onMouseenter"], Fb = {
  key: 1,
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, Vb = { class: "min-w-0 flex-1 truncate" }, Et = /* @__PURE__ */ fe({
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
    noResultsText: { default: "Sin resultados" },
    listSectionLabel: { default: void 0 },
    invalid: { type: Boolean },
    errorText: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = `kiut-select-${Ke()}`, s = `${o}-label`, i = `${o}-btn`, l = `${o}-listbox`, r = `${o}-err`, c = $(() => a.invalid ?? !1), u = ne(null), f = ne(null), g = ne(null), b = ne(null), m = ne(null), v = ne(!1), p = ne(0), y = ne(""), k = ne({});
    function _() {
      const N = f.value;
      if (!N) return;
      const ie = N.getBoundingClientRect();
      k.value = {
        top: `${ie.bottom - 3}px`,
        left: `${ie.left}px`,
        width: `${ie.width}px`
      };
    }
    const w = $(() => a.options.filter((N) => !N.disabled)), C = $(() => {
      if (!a.searchable) return w.value;
      const N = y.value.trim().toLowerCase();
      return N ? w.value.filter(
        (ie) => ie.label.toLowerCase().includes(N) || ie.badge?.label.toLowerCase().includes(N)
      ) : w.value;
    }), M = $(
      () => a.ariaLabelTrigger ?? a.placeholder ?? "Seleccionar opción"
    ), S = $(
      () => a.options.find((N) => N.value === a.modelValue) ?? null
    ), I = $(() => a.modelValue === null || a.modelValue === void 0 || a.modelValue === "" ? a.placeholder : S.value?.label ?? String(a.modelValue)), V = $(() => S.value?.leadingClass);
    function H(N) {
      return `${String(N.value)}-${N.label}`;
    }
    function D(N) {
      return a.modelValue === N.value;
    }
    function T(N, ie) {
      const ce = D(N), ye = p.value === ie, U = !!a.listSectionLabel;
      return [
        "flex cursor-pointer items-center gap-2.5 text-sm outline-none transition-colors",
        U ? "border-b border-gray-200 px-3 py-2.5 last:border-b-0 dark:border-white/5" : "gap-1.5 px-2 py-2",
        ce ? U ? "bg-[color:var(--kiut-primary-section)] font-medium text-[color:var(--kiut-primary)] dark:bg-[color:var(--kiut-primary-section)]" : "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !ce && ye ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function B() {
      p.value = Math.max(
        0,
        C.value.findIndex((N) => N.value === a.modelValue)
      );
    }
    function j() {
      if (a.searchable) {
        m.value?.focus();
        return;
      }
      b.value?.focus();
    }
    function W() {
      _(), y.value = "", B(), We(() => j());
    }
    function J() {
      v.value = !1, y.value = "";
    }
    function re(N) {
      n("update:modelValue", N.value), J();
    }
    function ue() {
      if (!a.disabled) {
        if (v.value) {
          J();
          return;
        }
        v.value = !0, W();
      }
    }
    function q(N) {
      N.stopPropagation(), !a.disabled && ue();
    }
    function oe(N) {
      if (!v.value) return;
      const ie = N.target, ce = u.value, ye = g.value;
      ce && !ce.contains(ie) && (!ye || !ye.contains(ie)) && J();
    }
    function R(N) {
      a.disabled || (N.key === "ArrowDown" || N.key === "Enter" || N.key === " ") && (N.preventDefault(), v.value || (v.value = !0, W()));
    }
    function K(N) {
      const ie = C.value;
      if (N.key === "Escape") {
        N.preventDefault(), J();
        return;
      }
      if (N.key === "ArrowDown") {
        if (N.preventDefault(), ie.length === 0) return;
        p.value = 0, b.value?.focus();
        return;
      }
      if (N.key === "ArrowUp") {
        if (N.preventDefault(), ie.length === 0) return;
        p.value = ie.length - 1, b.value?.focus();
        return;
      }
      if (N.key === "Enter") {
        N.preventDefault();
        const ce = ie[p.value];
        ce && re(ce);
      }
    }
    function Y(N) {
      const ie = C.value;
      if (N.key === "Escape") {
        N.preventDefault(), J();
        return;
      }
      if (ie.length !== 0) {
        if (N.key === "ArrowDown") {
          N.preventDefault(), p.value = Math.min(p.value + 1, ie.length - 1);
          return;
        }
        if (N.key === "ArrowUp") {
          if (N.preventDefault(), p.value === 0 && a.searchable) {
            m.value?.focus();
            return;
          }
          p.value = Math.max(p.value - 1, 0);
          return;
        }
        if (N.key === "Enter") {
          N.preventDefault();
          const ce = ie[p.value];
          ce && re(ce);
        }
      }
    }
    return Le(y, () => {
      p.value = 0;
    }), Je(() => {
      document.addEventListener("click", oe);
    }), at(() => {
      document.removeEventListener("click", oe);
    }), (N, ie) => (h(), x("div", {
      ref_key: "rootRef",
      ref: u,
      class: "relative font-sans"
    }, [
      d("div", Mb, [
        N.$slots.icon ? (h(), x("span", Db, [
          _e(N.$slots, "icon")
        ])) : F("", !0),
        e.label ? (h(), x("label", {
          key: 1,
          id: s,
          class: Z(L(ht))
        }, A(e.label), 3)) : F("", !0)
      ]),
      d("button", {
        ref_key: "buttonRef",
        ref: f,
        id: i,
        type: "button",
        disabled: e.disabled,
        class: Z([
          L(et),
          c.value ? L(At) : "",
          v.value && !c.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : "",
          "flex items-center justify-between gap-2 text-left"
        ]),
        "aria-expanded": v.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : M.value,
        "aria-invalid": c.value ? "true" : void 0,
        "aria-describedby": e.errorText ? r : void 0,
        onClick: q,
        onKeydown: R
      }, [
        d("span", Tb, [
          V.value ? (h(), x("span", {
            key: 0,
            class: Z([V.value, "shrink-0"]),
            "aria-hidden": "true"
          }, null, 2)) : F("", !0),
          S.value?.leadingIcon ? (h(), x("span", {
            key: 1,
            class: Z([
              "inline-flex shrink-0 items-center justify-center rounded-full",
              S.value.leadingIconWrapperClass
            ])
          }, [
            (h(), ee(rt(S.value.leadingIcon), {
              class: Z(["h-4 w-4", S.value.leadingIconClass])
            }, null, 8, ["class"]))
          ], 2)) : F("", !0),
          d("span", {
            class: Z([
              "min-w-0 truncate",
              e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
            ])
          }, A(I.value), 3),
          S.value?.badge ? (h(), x("span", {
            key: 2,
            class: Z(L(fi)(S.value.badge.variant))
          }, A(S.value.badge.label), 3)) : F("", !0)
        ]),
        z(L(na), {
          class: Z(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", v.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, Ab),
      e.errorText ? (h(), x("p", {
        key: 0,
        id: r,
        class: Z(L(Tt)),
        role: "alert"
      }, A(e.errorText), 3)) : F("", !0),
      (h(), ee(Wt, { to: "body" }, [
        Qe(d("div", {
          ref_key: "panelRef",
          ref: g,
          style: Ce(k.value),
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-lg dark:border-[color:var(--kiut-border-light)]"
        }, [
          e.searchable ? (h(), x("div", Bb, [
            d("div", Lb, [
              d("span", Rb, [
                z(L(Vo), { class: "h-4 w-4 text-[color:var(--kiut-text-muted)] dark:text-slate-500" })
              ]),
              Qe(d("input", {
                ref_key: "searchInputRef",
                ref: m,
                "onUpdate:modelValue": ie[0] || (ie[0] = (ce) => y.value = ce),
                type: "search",
                class: Z([L(et), "min-h-0 py-2 pl-9 pr-3 text-sm"]),
                placeholder: e.searchPlaceholder,
                "aria-label": e.searchPlaceholder,
                onClick: ie[1] || (ie[1] = Re(() => {
                }, ["stop"])),
                onKeydown: Re(K, ["stop"])
              }, null, 42, Ib), [
                [It, y.value]
              ])
            ])
          ])) : F("", !0),
          e.listSectionLabel ? (h(), x("p", Pb, A(e.listSectionLabel), 1)) : F("", !0),
          d("ul", {
            id: l,
            ref_key: "listRef",
            ref: b,
            role: "listbox",
            tabindex: "-1",
            class: Z(
              e.listSectionLabel ? "max-h-60 overflow-auto pb-1" : "max-h-60 overflow-auto py-1"
            ),
            onKeydown: Re(Y, ["stop"])
          }, [
            C.value.length === 0 ? (h(), x("li", Eb, A(e.noResultsText), 1)) : F("", !0),
            (h(!0), x(he, null, pe(C.value, (ce, ye) => (h(), x("li", {
              key: H(ce),
              role: "option",
              "aria-selected": D(ce),
              class: Z(T(ce, ye)),
              onClick: Re((U) => re(ce), ["stop"]),
              onMouseenter: (U) => p.value = ye
            }, [
              ce.leadingClass ? (h(), x("span", {
                key: 0,
                class: Z([ce.leadingClass, "shrink-0"]),
                "aria-hidden": "true"
              }, null, 2)) : F("", !0),
              e.showOptionCheck ? (h(), x("span", Fb, [
                D(ce) ? (h(), ee(L(Rn), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : F("", !0)
              ])) : F("", !0),
              ce.leadingIcon ? (h(), x("span", {
                key: 2,
                class: Z([
                  "inline-flex shrink-0 items-center justify-center rounded-full",
                  ce.leadingIconWrapperClass
                ])
              }, [
                (h(), ee(rt(ce.leadingIcon), {
                  class: Z(["h-4 w-4", ce.leadingIconClass])
                }, null, 8, ["class"]))
              ], 2)) : F("", !0),
              d("span", Vb, A(ce.label), 1),
              ce.badge ? (h(), x("span", {
                key: 3,
                class: Z(L(fi)(ce.badge.variant))
              }, A(ce.badge.label), 3)) : F("", !0)
            ], 42, Ob))), 128))
          ], 34)
        ], 4), [
          [Kt, v.value]
        ])
      ]))
    ], 512));
  }
}), kt = (e) => e.replace(/\b(seller|checkin)_state\b/gi, "$1"), Nb = {
  key: 0,
  class: "w-52"
}, zb = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, jb = { class: "w-full shrink-0 flex min-h-0 flex-col" }, Hb = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, Wb = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Kb = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Ub = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Yb = { class: "max-w-[360px] px-4 text-center" }, qb = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Xb = { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, Gb = { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, Zb = /* @__PURE__ */ fe({
  __name: "MessagesPerAgent",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 },
    title: { default: "Interactions by Agent" },
    subtitle: { default: "Responses sent by AI agents" },
    unit: { default: "msgs" },
    totalConversations: { default: void 0 },
    emptyTitle: { default: "No agent interactions data" },
    emptyDescription: { default: "Try adjusting the date range or check your filters to see agent interaction trends." },
    breakdownBy: { default: "" },
    breakdownOptions: { default: () => [] },
    showSummaryCards: { type: Boolean, default: !0 },
    maxSeries: { default: void 0 }
  },
  emits: ["export", "changeBreakdown"],
  setup(e, { expose: t, emit: a }) {
    const n = {
      all: "#8b5cf6",
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308",
      unassigned: "#64748B"
    }, o = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899", "#06B6D4"], s = e, i = a, l = (k) => {
      i("export", k);
    }, r = (k) => {
      i("changeBreakdown", String(k));
    }, c = (k) => {
      const _ = k.toLowerCase(), w = n[_] || n[k];
      if (w) return w;
      const C = Array.from(_).reduce(
        (M, S) => (M << 5) - M + S.charCodeAt(0) | 0,
        0
      );
      return o[Math.abs(C) % o.length];
    }, u = $e(s, "theme"), { isDark: f } = Me(u), g = (k) => {
      const _ = kt(k).replace(/_/g, " ");
      return _.charAt(0).toUpperCase() + _.slice(1);
    }, b = $(() => {
      const k = {};
      for (const _ of Object.values(s.data?.agents_by_day || {}))
        for (const [w, C] of Object.entries(_))
          k[w] = (k[w] || 0) + C;
      return k;
    }), m = $(() => {
      const k = s.data?.agents_by_day || {}, _ = Object.keys(k).sort();
      if (_.length === 0)
        return { labels: [], datasets: [] };
      const C = Object.keys(b.value).sort(
        (M, S) => b.value[S] - b.value[M] || M.localeCompare(S)
      ).slice(0, s.maxSeries).map((M) => ({
        label: g(M),
        data: _.map((S) => k[S]?.[M] || 0),
        borderColor: c(M)
      }));
      return {
        labels: _.map((M) => Ne(M).format("MMM DD")),
        datasets: C
      };
    }), v = $(() => {
      const k = Object.values(b.value).reduce((w, C) => w + C, 0), _ = s.totalConversations ?? k;
      return _ === 0 ? [] : Object.entries(b.value).sort(([, w], [, C]) => C - w).map(([w, C]) => ({
        name: w,
        label: g(w),
        total: C,
        percentage: (C / _ * 100).toFixed(1),
        color: c(w)
      }));
    }), p = $(() => v.value.slice(0, 4)), y = $(() => {
      const k = p.value.length;
      if (!(k <= 0))
        return { gridTemplateColumns: `repeat(${k}, minmax(0, 1fr))` };
    });
    return t({ isDark: f }), (k, _) => (h(), ee(Se, {
      class: "w-full min-h-0 self-start",
      title: s.title,
      subtitle: s.subtitle,
      collapsible: !1,
      loading: s.loading
    }, {
      headerAside: O(() => [
        s.breakdownOptions.length ? (h(), x("div", Nb, [
          z(Et, {
            "model-value": s.breakdownBy,
            options: s.breakdownOptions,
            "onUpdate:modelValue": r
          }, null, 8, ["model-value", "options"])
        ])) : F("", !0)
      ]),
      headerExport: O(() => [
        e.enableExport && !s.loading ? (h(), ee(L(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: l
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", zb, [
          d("div", jb, [
            m.value.labels && m.value.labels.length ? (h(), x("section", Hb, [
              d("div", Wb, [
                z(pt, {
                  data: m.value,
                  options: e.options,
                  theme: u.value
                }, null, 8, ["data", "options", "theme"])
              ]),
              s.showSummaryCards && p.value.length ? (h(), x("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: Ce(y.value)
              }, [
                (h(!0), x(he, null, pe(p.value, (w) => (h(), ee(ve, {
                  key: w.name,
                  class: "min-w-0",
                  color: w.color,
                  title: w.label,
                  value: `${w.percentage}%`,
                  subvalue: `${L(ge)(w.total)} ${s.unit}`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : F("", !0)
            ])) : s.showSummaryCards && v.value.length ? (h(), x("section", Kb, [
              d("div", {
                class: "grid w-full gap-3 md:gap-4",
                style: Ce(y.value)
              }, [
                (h(!0), x(he, null, pe(p.value, (w) => (h(), ee(ve, {
                  key: w.name,
                  class: "min-w-0",
                  color: w.color,
                  title: w.label,
                  value: `${w.percentage}%`,
                  subvalue: `${L(ge)(w.total)} ${s.unit}`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)
            ])) : F("", !0),
            v.value.length ? F("", !0) : (h(), x("section", Ub, [
              d("div", Yb, [
                d("div", qb, [
                  z(L(dt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                d("p", Xb, A(s.emptyTitle), 1),
                d("p", Gb, A(s.emptyDescription), 1)
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["title", "subtitle", "loading"]));
  }
}), Dl = /* @__PURE__ */ be(Zb, [["__scopeId", "data-v-c2fc7beb"]]), Qb = { class: "card-body" }, Jb = {
  key: 0,
  class: "chart-section"
}, ev = { class: "chart-wrapper" }, tv = {
  key: 1,
  class: "record-locator-daily-section"
}, av = { class: "w-full min-w-0" }, nv = { class: "cell-plain font-medium" }, ov = { class: "cell-plain text-center" }, sv = { class: "cell-plain text-center" }, iv = { class: "cell-plain text-center" }, lv = { class: "cell-plain text-center" }, rv = { class: "cell-plain text-center success-value" }, cv = { class: "cell-plain text-center failed-value" }, dv = { class: "cell-plain text-center warning-value" }, uv = { class: "cell-plain text-center" }, hv = { class: "cell-plain text-center failed-value" }, fv = {
  key: 2,
  class: "empty-state"
}, gv = /* @__PURE__ */ fe({
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
    const n = e, o = a, s = (p) => {
      o("export", p);
    }, { isDark: i } = Me($e(n, "theme")), l = $(() => n.data?.record_locator_by_day ? [...n.data.record_locator_by_day].sort(
      (p, y) => new Date(p.date).getTime() - new Date(y.date).getTime()
    ) : []), r = [
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
    ], u = $(
      () => n.isAvianca ? [...r, ...c] : r
    ), f = $(
      () => l.value.map((p) => ({
        id: p.date,
        date: p.date,
        checkin_initiated: p.checkin_initiated,
        record_locator_init_count: p.record_locator_init_count,
        record_locator_started_count: p.record_locator_started_count,
        record_locator_completed_count: p.record_locator_completed_count,
        record_locator_closed_count: p.record_locator_closed_count,
        record_locator_failed_count: p.record_locator_failed_count,
        record_locator_abandoned_count: p.record_locator_abandoned_count,
        record_locator_create_payment_count: p.record_locator_create_payment_count,
        record_locator_create_payment_failed_count: p.record_locator_create_payment_failed_count
      }))
    ), g = $(() => n.data), b = (p, y) => Dt(p, y), m = (p, y) => {
      const k = ge(p), _ = b(p, y);
      return `${k} (${_})`;
    }, v = $(() => {
      const p = [], y = [], k = /* @__PURE__ */ new Set(), _ = (Y) => {
        k.has(Y) || (p.push({ name: Y }), k.add(Y));
      };
      if (!g.value.total_checkin_initiated)
        return { nodes: p, links: y };
      _("Checkin Init"), _("Booking retrive"), _("Checkin Started"), _("Checkin Completed"), _("Checkin Closed");
      const w = g.value.total_checkin_initiated, C = g.value.total_record_locator_init, M = g.value.total_record_locator_started, S = g.value.total_record_locator_completed, I = g.value.total_record_locator_closed, V = g.value.total_record_locator_failed, H = g.value.total_record_locator_abandoned, D = g.value.total_record_locator_init_abandoned, T = g.value.total_checkin_pre_init_abandoned_error, B = g.value.total_checkin_pre_init_abandoned_voluntary, j = T != null || B != null, W = j ? Math.max(Number(T) || 0, 0) : 0, J = j ? Math.max(Number(B) || 0, 0) : 0, re = g.value.total_record_locator_init_abandoned_error, ue = g.value.total_record_locator_init_abandoned_voluntary, q = re != null || ue != null, oe = q ? Math.max(Number(re) || 0, 0) : 0, R = q ? Math.max(Number(ue) || 0, 0) : 0;
      C > 0 && y.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: C,
        label: ke(C, w)
      });
      const K = w - C;
      return j ? (J > 0 && (_("Abandoned (Init)"), y.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: J,
        label: ke(J, w)
      })), W > 0 && (_("Booking not retreived"), y.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: W,
        label: ke(W, w)
      }))) : K > 0 && (_("Abandoned (Init)"), y.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: K,
        label: ke(K, w)
      })), M > 0 && y.push({
        source: "Booking retrive",
        target: "Checkin Started",
        value: M,
        label: ke(M, w)
      }), q ? (oe > 0 && (_("Error"), y.push({
        source: "Booking retrive",
        target: "Error",
        value: oe,
        label: ke(oe, w)
      })), R > 0 && (_("Abandoned (Started)"), y.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: R,
        label: ke(R, w)
      }))) : D > 0 && (_("Abandoned (Started)"), y.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: D,
        label: ke(D, w)
      })), S > 0 && y.push({
        source: "Checkin Started",
        target: "Checkin Completed",
        value: S,
        label: ke(S, w)
      }), I > 0 && y.push({
        source: "Checkin Completed",
        target: "Checkin Closed",
        value: I,
        label: ke(I, w)
      }), V > 0 && (_("Checkin Failed"), y.push({
        source: "Checkin Started",
        target: "Checkin Failed",
        value: V,
        label: ke(V, w)
      })), H > 0 && (_("Abandoned (Flow)"), y.push({
        source: "Checkin Started",
        target: "Abandoned (Flow)",
        value: H,
        label: ke(H, w)
      })), { nodes: p, links: y };
    });
    return t({ isDark: i }), (p, y) => (h(), ee(Se, {
      class: "record-locator-root h-full min-h-0",
      title: "Checkin by Record Locator Metrics",
      subtitle: "Checkin by record locator retrieval and completion analysis",
      collapsible: e.collapsible,
      loading: n.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !n.loading ? (h(), ee(L(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", Qb, [
          v.value.nodes.length > 0 ? (h(), x("section", Jb, [
            d("div", ev, [
              z(Yt, {
                data: v.value,
                height: "400px",
                "use-gradient": !1,
                "node-gap": 16
              }, null, 8, ["data"])
            ])
          ])) : F("", !0),
          l.value && l.value.length > 0 ? (h(), x("section", tv, [
            d("div", av, [
              z(ut, {
                columns: u.value,
                rows: f.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": O(({ row: k }) => [
                  d("span", nv, A(L(Ne)(String(k.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": O(({ row: k }) => [
                  d("span", ov, A(L(ge)(k.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieve": O(({ row: k }) => [
                  d("span", sv, A(m(
                    k.record_locator_init_count,
                    k.checkin_initiated
                  )), 1)
                ]),
                "cell-checkinStarted": O(({ row: k }) => [
                  d("span", iv, A(L(ge)(k.record_locator_started_count)), 1)
                ]),
                "cell-checkinCompleted": O(({ row: k }) => [
                  d("span", lv, A(m(
                    k.record_locator_completed_count,
                    k.record_locator_started_count
                  )), 1)
                ]),
                "cell-checkinClosed": O(({ row: k }) => [
                  d("span", rv, A(m(
                    k.record_locator_closed_count,
                    k.record_locator_started_count
                  )), 1)
                ]),
                "cell-checkinFailed": O(({ row: k }) => [
                  d("span", cv, A(m(
                    k.record_locator_failed_count,
                    k.record_locator_started_count
                  )), 1)
                ]),
                "cell-abandoned": O(({ row: k }) => [
                  d("span", dv, A(m(
                    k.record_locator_abandoned_count,
                    k.record_locator_started_count
                  )), 1)
                ]),
                "cell-createPayment": O(({ row: k }) => [
                  d("span", uv, A(L(ge)(
                    k.record_locator_create_payment_count ?? 0
                  )), 1)
                ]),
                "cell-failedPayment": O(({ row: k }) => [
                  d("span", hv, A(L(ge)(
                    k.record_locator_create_payment_failed_count ?? 0
                  )), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (h(), x("section", fv, [...y[0] || (y[0] = [
            d("div", { class: "empty-state-content" }, [
              d("div", { class: "empty-icon-wrapper" }, [
                d("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  })
                ])
              ]),
              d("p", { class: "empty-title" }, "No record locator data available"),
              d("p", { class: "empty-description" }, " No record locator data found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])]))
        ])
      ]),
      _: 1
    }, 8, ["collapsible", "loading"]));
  }
}), mv = /* @__PURE__ */ be(gv, [["__scopeId", "data-v-f904c66a"]]), pv = { class: "card-body" }, bv = {
  key: 0,
  class: "chart-section"
}, vv = {
  key: 1,
  class: "empty-state"
}, yv = {
  key: 2,
  class: "comparison-section"
}, xv = { class: "comparison-grid" }, kv = /* @__PURE__ */ fe({
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
    ], s = e, i = a, l = (m) => {
      i("export", m);
    }, { isDark: r } = Me($e(s, "theme"));
    $(() => s.data?.total_sell_success ?? 0);
    const c = $(() => {
      const m = /* @__PURE__ */ new Set();
      for (const v of s.data?.sales_by_channel_by_day ?? [])
        for (const p of Object.keys(v.channels))
          m.add(p);
      return Array.from(m).sort();
    }), u = (m, v) => n[m.toLowerCase()] ?? o[v % o.length];
    function f(m) {
      return m.replace(/_/g, " ").toUpperCase();
    }
    function g(m) {
      if (m.delta === null) return "No previous data";
      const v = ge(m.previous), p = `${Math.abs(m.delta).toFixed(1)}%`;
      return m.delta === 0 ? `0.0% vs prev. period (${v})` : `${m.delta > 0 ? "↑" : "↓"} ${p} vs prev. period (${v})`;
    }
    const b = $(() => {
      const m = s.data?.sales_by_channel_by_day ?? [];
      if (m.length === 0) return { labels: [], datasets: [] };
      const v = m.map((y) => Ne(y.date).format("MMM-DD")), p = c.value.map((y, k) => ({
        label: y,
        data: m.map((_) => _.channels[y] ?? 0),
        backgroundColor: u(y, k),
        borderRadius: 4
      }));
      return { labels: v, datasets: p };
    });
    return t({ isDark: r }), (m, v) => (h(), ee(Se, {
      class: "sales-channel-root h-full min-h-0",
      title: "Sales by Channel",
      subtitle: "Successful sales breakdown by communication channel",
      "default-open": e.initiallyOpen,
      loading: s.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !s.loading ? (h(), ee(L(ze), {
          key: 0,
          variant: "inline",
          onExport: l,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", pv, [
          b.value.labels.length > 0 ? (h(), x("section", bv, [
            z($t, {
              data: b.value,
              stacked: !0
            }, null, 8, ["data"])
          ])) : (h(), x("section", vv, [...v[0] || (v[0] = [
            d("div", { class: "empty-state-content" }, [
              d("div", { class: "empty-icon-wrapper" }, [
                d("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  })
                ])
              ]),
              d("p", { class: "empty-title" }, "No sales data available"),
              d("p", { class: "empty-description" }, " No sales by channel data found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])])),
          e.channelComparison.length > 0 ? (h(), x("section", yv, [
            d("div", xv, [
              (h(!0), x(he, null, pe(e.channelComparison, (p, y) => (h(), ee(L(ve), {
                key: p.channel,
                color: u(p.channel, y),
                title: f(p.channel),
                value: L(ge)(p.current),
                subvalue: g(p)
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : F("", !0)
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), Al = /* @__PURE__ */ be(kv, [["__scopeId", "data-v-4879d791"]]), _v = { class: "card-body" }, wv = {
  key: 0,
  class: "chart-section"
}, Cv = { class: "chart-wrapper" }, $v = {
  key: 1,
  class: "empty-state"
}, Sv = { class: "seller-value-cards" }, Mv = {
  key: 2,
  class: "seller-daily-section"
}, Dv = { class: "w-full min-w-0" }, Av = { class: "sl-cell font-medium" }, Tv = { class: "sl-cell text-center" }, Bv = { class: "sl-cell text-center" }, Lv = { class: "sl-cell text-center" }, Rv = { class: "sl-cell text-center" }, Iv = { class: "sl-cell text-center success-value" }, Pv = {
  key: 0,
  class: "currency-cell-list"
}, Ev = {
  key: 1,
  class: "empty-cell"
}, Ov = { class: "sl-cell text-center success-value" }, Fv = { class: "sl-cell text-center success-value" }, Vv = {
  key: 0,
  class: "currency-cell-list"
}, Nv = {
  key: 1,
  class: "empty-cell"
}, zv = { class: "sl-cell text-center success-value" }, jv = { class: "sl-cell text-center" }, Hv = { class: "sl-cell text-center success-value" }, Wv = {
  key: 0,
  class: "currency-cell-list"
}, Kv = { key: 1 }, Uv = {
  key: 0,
  class: "failed-reasons"
}, Yv = { class: "reason-name" }, qv = { class: "reason-count" }, Xv = {
  key: 1,
  class: "empty-cell"
}, Gv = /* @__PURE__ */ fe({
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
    exportLoading: { type: Boolean, default: !1 },
    initiallyOpen: { type: Boolean, default: !0 },
    showPaymentMethodDetails: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: a }) {
    function n(D) {
      return D;
    }
    const o = e, s = a, i = (D) => {
      s("export", D);
    }, { isDark: l } = Me($e(o, "theme")), r = $(() => {
      if (!o.sellerData?.seller_by_day) return [];
      const D = [...o.sellerData.seller_by_day];
      return o.failedData?.failed_by_reason_by_day && o.failedData.failed_by_reason_by_day.forEach((T) => {
        const B = D.findIndex(
          (j) => j.date === T.date
        );
        B !== -1 ? D[B] = { ...D[B], reasons: T.reasons } : D.push({
          date: T.date,
          seller_conversations: 0,
          sell_started_count: 0,
          sell_get_quote_count: 0,
          sell_booking_created_count: 0,
          sell_success_count: 0,
          daily_value_sell_success: 0,
          reasons: T.reasons
        });
      }), D.sort(
        (T, B) => new Date(T.date).getTime() - new Date(B.date).getTime()
      );
    }), c = $(() => {
      const D = [
        { key: "date", label: "Date", align: "center" },
        { key: "sellInitiated", label: "Initiated by agent", align: "center" },
        { key: "sellStarted", label: "Sell Started", align: "center" },
        { key: "getQuote", label: "Get Quote", align: "center" },
        { key: "bookingCreated", label: "Booking Created", align: "center" }
      ];
      return o.showPaymentMethodDetails && D.push(
        { key: "btValue", label: "BT Success Value", align: "center" },
        { key: "btSuccess", label: "BT Success", align: "center" },
        { key: "coValue", label: "CO Success Value", align: "center" },
        { key: "cashSuccess", label: "Cash Success", align: "center" }
      ), D.push(
        { key: "sellSuccess", label: "Sell Success", align: "center" },
        { key: "totalSalesValue", label: "Total Sales Value", align: "center" },
        { key: "failed", label: "Failed", align: "center" }
      ), D;
    }), u = $(
      () => r.value.map((D) => ({
        id: D.date,
        ...D
      }))
    ), f = $(() => o.sellerData), g = $(() => o.failedData), b = $(
      () => Array.isArray(o.sellerData.total_value_sell_success) ? o.sellerData.total_value_sell_success : []
    ), m = $(
      () => Array.isArray(o.sellerData.total_value_sell_success_bank_transfer) ? o.sellerData.total_value_sell_success_bank_transfer : []
    ), v = $(
      () => Array.isArray(o.sellerData.total_value_sell_success_cash) ? o.sellerData.total_value_sell_success_cash : []
    ), p = $(() => {
      const D = b.value;
      return D.length > 0 ? D.map(
        (T) => `${T.currency} ${Xt(T.total_value)}`
      ).join(" · ") : H(o.sellerData.total_value_sell_success);
    });
    function y(D) {
      return D.length > 0 ? D.map(
        (T) => `${T.currency} ${Xt(T.total_value)}`
      ).join(" · ") : "—";
    }
    const k = $(
      () => y(m.value)
    ), _ = $(
      () => y(v.value)
    ), w = (D) => D.replace(/_/g, " ").replace(/\b\w/g, (T) => T.toUpperCase()), C = (D) => `Failed:
${w(D)}`, M = $(() => {
      const {
        total_seller_conversations: D = 0,
        total_sell_started: T = 0,
        total_sell_booking_created: B = 0,
        total_sell_success: j = 0,
        total_sell_success_bank_transfer: W = 0,
        total_sell_success_cash: J = 0
      } = f.value, { failed_by_reason_by_day: re = [] } = g.value;
      if (D === 0) return { nodes: [], links: [] };
      const ue = j, q = [
        { name: "Initiated by agent", value: D, status: "success" },
        { name: "Sell Started", value: T, status: "success" },
        { name: "Booking Created", value: B, status: "success" },
        { name: "Sell Success", value: ue, status: "success" }
      ], oe = [], R = D - T;
      R > 0 && (q.push({
        name: "Abandoned: No Response",
        value: R,
        status: "abandon"
      }), oe.push({
        source: "Initiated by agent",
        target: "Abandoned: No Response",
        value: R,
        label: ke(R, D)
      })), T > 0 && oe.push({
        source: "Initiated by agent",
        target: "Sell Started",
        value: T,
        label: ke(T, D)
      });
      const K = re.reduce(
        (ie, ce) => (ce.reasons && Array.isArray(ce.reasons) && ce.reasons.forEach((ye) => {
          const U = ye.reason, le = ye.failed_count;
          ie[U] = (ie[U] || 0) + le;
        }), ie),
        {}
      );
      B > 0 && oe.push({
        source: "Sell Started",
        target: "Booking Created",
        value: B,
        label: ke(B, D)
      }), (W ?? 0) > 0 && (q.push({
        name: "Bank Transfer",
        value: W ?? 0,
        status: "success"
      }), oe.push({
        source: "Booking Created",
        target: "Bank Transfer",
        value: W ?? 0,
        label: ke(W ?? 0, D)
      })), (J ?? 0) > 0 && (q.push({
        name: "Cash Option",
        value: J ?? 0,
        status: "success"
      }), oe.push({
        source: "Booking Created",
        target: "Cash Option",
        value: J ?? 0,
        label: ke(J ?? 0, D)
      })), ue > 0 && oe.push({
        source: "Booking Created",
        target: "Sell Success",
        value: ue,
        label: ke(ue, D)
      });
      const Y = B - ue - (W ?? 0) - (J ?? 0);
      Y > 0 && (q.push({
        name: "Failed at Completion",
        value: Y,
        status: "error"
      }), oe.push({
        source: "Booking Created",
        target: "Failed at Completion",
        value: Y,
        label: ke(Y, D)
      }));
      const N = T - B;
      if (N > 0 && (q.push({
        name: "Failed at Booking",
        value: N,
        status: "error"
      }), oe.push({
        source: "Sell Started",
        target: "Failed at Booking",
        value: N,
        label: ke(N, D)
      })), Object.keys(K).length > 0) {
        const ie = Object.values(K).reduce(
          (ye, U) => ye + U,
          0
        ), ce = N - ie;
        Object.entries(K).filter(([, ye]) => ye > 0).sort(([, ye], [, U]) => U - ye).forEach(([ye, U]) => {
          const le = `Failed: ${ye}`;
          q.push({
            name: le,
            value: U,
            status: "error",
            label: C(ye)
          }), oe.push({
            source: "Failed at Booking",
            target: le,
            value: U,
            label: ke(U, D)
          });
        }), ce > 0 && (q.push({
          name: "Failed: Without Reason",
          value: ce,
          status: "error",
          label: `Failed:
Without Reason`
        }), oe.push({
          source: "Failed at Booking",
          target: "Failed: Without Reason",
          value: ce,
          label: ke(ce, D)
        }));
      }
      return {
        nodes: q,
        links: oe
      };
    }), S = (D, T) => Dt(D, T), I = (D, T) => {
      const B = ge(D), j = S(D, T);
      return `${B} (${j})`;
    }, V = (D) => D == null ? 0 : typeof D == "number" ? D : Array.isArray(D) ? D.reduce((T, B) => T + (B.total_value || 0), 0) : 0, H = (D) => Xt(V(D));
    return t({ isDark: l }), (D, T) => (h(), ee(Se, {
      class: "seller-metrics-root h-full min-h-0",
      title: "Seller Metrics",
      subtitle: "Sales performance and failure analysis",
      "default-open": e.initiallyOpen,
      loading: o.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !o.loading ? (h(), ee(L(ze), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", _v, [
          M.value.nodes.length > 0 ? (h(), x("section", wv, [
            d("div", Cv, [
              z(Yt, {
                data: M.value,
                height: "420px",
                "node-gap": 16
              }, null, 8, ["data"])
            ])
          ])) : (h(), x("section", $v, [...T[0] || (T[0] = [
            d("div", { class: "empty-state-content" }, [
              d("div", { class: "empty-icon-wrapper" }, [
                d("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  })
                ])
              ]),
              d("p", { class: "empty-title" }, "No sales data available"),
              d("p", { class: "empty-description" }, " No sales data found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])])),
          d("section", Sv, [
            z(ve, {
              class: "seller-value-card",
              color: "var(--kiut-success)",
              title: "Total Sales Value",
              value: p.value
            }, null, 8, ["value"]),
            o.showPaymentMethodDetails ? (h(), x(he, { key: 0 }, [
              z(ve, {
                class: "seller-value-card",
                color: "var(--kiut-success)",
                title: "Bank Transfer Value",
                value: k.value
              }, null, 8, ["value"]),
              z(ve, {
                class: "seller-value-card",
                color: "var(--kiut-success)",
                title: "Cash Option Value",
                value: _.value
              }, null, 8, ["value"])
            ], 64)) : F("", !0)
          ]),
          r.value && r.value.length > 0 ? (h(), x("section", Mv, [
            d("div", Dv, [
              z(ut, {
                columns: c.value,
                rows: u.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": O(({ row: B }) => [
                  d("span", Av, A(L(Ne)(String(B.date)).format("MMM DD")), 1)
                ]),
                "cell-sellInitiated": O(({ row: B }) => [
                  d("span", Tv, A(L(ge)(Number(B.seller_conversations) || 0)), 1)
                ]),
                "cell-sellStarted": O(({ row: B }) => [
                  d("span", Bv, A(I(
                    B.sell_started_count,
                    B.seller_conversations || B.sell_started_count
                  )), 1)
                ]),
                "cell-getQuote": O(({ row: B }) => [
                  d("span", Lv, A(I(
                    B.sell_get_quote_count,
                    B.seller_conversations || B.sell_started_count
                  )), 1)
                ]),
                "cell-bookingCreated": O(({ row: B }) => [
                  d("span", Rv, A(I(
                    B.sell_booking_created_count,
                    B.seller_conversations || B.sell_started_count
                  )), 1)
                ]),
                "cell-btValue": O(({ row: B }) => [
                  d("span", Iv, [
                    Array.isArray(
                      B.daily_value_sell_success_bank_transfer
                    ) && B.daily_value_sell_success_bank_transfer.length > 0 ? (h(), x("div", Pv, [
                      (h(!0), x(he, null, pe(B.daily_value_sell_success_bank_transfer, (j) => (h(), x("span", {
                        key: `${B.date}-bt-success-${j.currency}`
                      }, A(j.currency) + " " + A(L(Xt)(j.total_value)), 1))), 128))
                    ])) : (h(), x("span", Ev, "-"))
                  ])
                ]),
                "cell-btSuccess": O(({ row: B }) => [
                  d("span", Ov, A(L(ge)(
                    Number(
                      B.sell_success_bank_transfer_count
                    ) || 0
                  )), 1)
                ]),
                "cell-coValue": O(({ row: B }) => [
                  d("span", Fv, [
                    Array.isArray(
                      B.daily_value_sell_success_cash
                    ) && B.daily_value_sell_success_cash.length > 0 ? (h(), x("div", Vv, [
                      (h(!0), x(he, null, pe(B.daily_value_sell_success_cash, (j) => (h(), x("span", {
                        key: `${B.date}-co-success-${j.currency}`
                      }, A(j.currency) + " " + A(L(Xt)(j.total_value)), 1))), 128))
                    ])) : (h(), x("span", Nv, "-"))
                  ])
                ]),
                "cell-cashSuccess": O(({ row: B }) => [
                  d("span", zv, A(L(ge)(
                    Number(B.sell_success_cash_count) || 0
                  )), 1)
                ]),
                "cell-sellSuccess": O(({ row: B }) => [
                  d("span", jv, A(I(
                    B.sell_success_count,
                    B.seller_conversations || B.sell_started_count
                  )), 1)
                ]),
                "cell-totalSalesValue": O(({ row: B }) => [
                  d("span", Hv, [
                    Array.isArray(B.daily_value_sell_success) && B.daily_value_sell_success.length > 0 ? (h(), x("div", Wv, [
                      (h(!0), x(he, null, pe(B.daily_value_sell_success, (j) => (h(), x("span", {
                        key: `${B.date}-${j.currency}`
                      }, A(j.currency) + " " + A(L(Xt)(j.total_value)), 1))), 128))
                    ])) : (h(), x("span", Kv, A(H(
                      B.daily_value_sell_success
                    )), 1))
                  ])
                ]),
                "cell-failed": O(({ row: B }) => [
                  (B.reasons || []).length > 0 ? (h(), x("div", Uv, [
                    (h(!0), x(he, null, pe(B.reasons || [], (j) => (h(), x("div", {
                      key: j.reason,
                      class: "failed-reason-item"
                    }, [
                      d("span", Yv, A(j.reason) + ":", 1),
                      d("span", qv, A(j.failed_count), 1)
                    ]))), 128))
                  ])) : (h(), x("div", Xv, "-"))
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : F("", !0)
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), Tl = /* @__PURE__ */ be(Gv, [["__scopeId", "data-v-fad285e5"]]), Zv = { class: "seller-container__body" }, Qv = /* @__PURE__ */ fe({
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
    showPaymentMethodDetails: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    sellerData: {},
    failedData: {},
    salesByChannelData: {},
    channelComparison: { default: () => [] }
  },
  emits: ["open", "export"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = $(
      () => a.loading ? !1 : a.sellerLoading
    ), s = $(
      () => a.loading ? !1 : a.salesByChannelLoading
    ), i = $(() => a.exportLoading || a.sellerExportLoading), l = $(() => a.exportLoading || a.salesByChannelExportLoading);
    function r(c, u) {
      n("export", { source: c, format: u });
    }
    return (c, u) => (h(), ee(Se, {
      class: "seller-container-root w-full",
      title: "Seller",
      subtitle: "Sales funnel performance and successful sales by communication channel.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: u[2] || (u[2] = (f) => n("open"))
    }, {
      default: O(() => [
        d("div", Zv, [
          z(Tl, {
            "initially-open": e.childrenInitiallyOpen,
            "seller-data": e.sellerData,
            "failed-data": e.failedData,
            loading: o.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": i.value,
            "show-payment-method-details": e.showPaymentMethodDetails,
            onExport: u[0] || (u[0] = (f) => r("seller", f))
          }, null, 8, ["initially-open", "seller-data", "failed-data", "loading", "theme", "enable-export", "export-loading", "show-payment-method-details"]),
          z(Al, {
            "initially-open": e.childrenInitiallyOpen,
            data: e.salesByChannelData,
            "channel-comparison": e.channelComparison,
            loading: s.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": l.value,
            onExport: u[1] || (u[1] = (f) => r("salesByChannel", f))
          }, null, 8, ["initially-open", "data", "channel-comparison", "loading", "theme", "enable-export", "export-loading"])
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), Jv = /* @__PURE__ */ be(Qv, [["__scopeId", "data-v-34a76e0c"]]), ey = { class: "card-body" }, ty = {
  key: 0,
  class: "chart-section"
}, ay = { class: "chart-wrapper" }, ny = {
  key: 1,
  class: "empty-state"
}, oy = { class: "ancillaries-value-cards" }, sy = {
  key: 2,
  class: "ancillaries-daily-section"
}, iy = { class: "w-full min-w-0" }, ly = { class: "sl-cell font-medium" }, ry = { class: "sl-cell text-center" }, cy = { class: "sl-cell text-center" }, dy = { class: "sl-cell text-center" }, uy = { class: "sl-cell text-center" }, hy = {
  key: 0,
  class: "failed-reasons"
}, fy = { class: "reason-name" }, gy = { class: "reason-count" }, my = {
  key: 1,
  class: "empty-cell"
}, py = /* @__PURE__ */ fe({
  __name: "Ancillaries",
  props: {
    ancillariesData: { default: () => ({
      total_ancillaries_offered: 0,
      total_ancillaries_selected: 0,
      total_ancillaries_declined: 0,
      total_ancillaries_paid: 0,
      ancillaries_cr: 0,
      declined_by_reason: [],
      ancillaries_by_day: [],
      declined_by_reason_by_day: []
    }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    initiallyOpen: { type: Boolean, default: !0 }
  },
  setup(e, { expose: t }) {
    function a(y) {
      return y;
    }
    const n = e, { isDark: o } = Me($e(n, "theme")), s = $(
      () => n.ancillariesData?.total_ancillaries_offered || 0
    ), i = $(
      () => n.ancillariesData?.total_ancillaries_selected || 0
    ), l = $(
      () => n.ancillariesData?.total_ancillaries_declined || 0
    ), r = $(
      () => n.ancillariesData?.total_ancillaries_paid || 0
    ), c = $(
      () => n.ancillariesData?.ancillaries_cr || 0
    ), u = $(
      () => `${Number(c.value || 0).toFixed(1)}%`
    ), f = (y) => y.replace(/_/g, " ").replace(/\b\w/g, (k) => k.toUpperCase()), g = (y) => `Declined:
${f(y)}`, b = $(() => {
      const y = s.value, k = i.value, _ = l.value, w = r.value, C = n.ancillariesData?.declined_by_reason || [];
      if (y === 0) return { nodes: [], links: [] };
      const M = [
        { name: "Offered", value: y, status: "success" },
        { name: "Selected", value: k, status: "success" }
      ], S = [];
      if (k > 0 && S.push({
        source: "Offered",
        target: "Selected",
        value: k,
        label: ke(k, y)
      }), w > 0) {
        M.push({ name: "Paid", value: w, status: "success" });
        const T = k > 0 ? "Selected" : "Offered", B = k > 0 ? k : y;
        S.push({
          source: T,
          target: "Paid",
          value: w,
          label: ke(w, B)
        });
      }
      const I = C.reduce(
        (T, B) => (B.count > 0 && (T[B.reason] = (T[B.reason] || 0) + B.count), T),
        {}
      ), V = Object.values(I).reduce((T, B) => T + B, 0), H = Math.max(0, _ - V);
      Object.entries(I).sort(([, T], [, B]) => B - T).forEach(([T, B]) => {
        const j = `Declined: ${T}`;
        M.push({
          name: j,
          value: B,
          status: "error",
          label: g(T)
        }), S.push({
          source: "Offered",
          target: j,
          value: B,
          label: ke(B, y)
        });
      }), H > 0 && (M.push({
        name: "Declined: Without Reason",
        value: H,
        status: "error",
        label: `Declined:
Without Reason`
      }), S.push({
        source: "Offered",
        target: "Declined: Without Reason",
        value: H,
        label: ke(H, y)
      }));
      const D = Math.max(
        0,
        y - k - _
      );
      return D > 0 && (M.push({
        name: "No Response",
        value: D,
        status: "abandon"
      }), S.push({
        source: "Offered",
        target: "No Response",
        value: D,
        label: ke(D, y)
      })), { nodes: M, links: S };
    }), m = $(() => {
      const y = [...n.ancillariesData?.ancillaries_by_day || []];
      return (n.ancillariesData?.declined_by_reason_by_day || []).forEach((_) => {
        const w = y.findIndex((C) => C.date === _.date);
        w !== -1 ? y[w] = { ...y[w], reasons: _.reasons } : y.push({
          date: _.date,
          offered_count: 0,
          selected_count: 0,
          declined_count: 0,
          paid_count: 0,
          reasons: _.reasons
        });
      }), y.sort(
        (_, w) => new Date(_.date).getTime() - new Date(w.date).getTime()
      );
    }), v = $(() => [
      { key: "date", label: "Date", align: "center" },
      { key: "offered", label: "Offered", align: "center" },
      { key: "selected", label: "Selected", align: "center" },
      { key: "paid", label: "Paid", align: "center" },
      { key: "declined", label: "Declined", align: "center" },
      { key: "reasons", label: "Decline Reasons", align: "left" }
    ]), p = $(
      () => m.value.map((y) => ({
        id: y.date,
        ...y
      }))
    );
    return t({
      isDark: o,
      formatSankeyPercentage: Dt
    }), (y, k) => (h(), ee(Se, {
      class: "ancillaries-metrics-root h-full min-h-0",
      title: "Ancillaries",
      subtitle: "Ancillary offer conversion funnel",
      "default-open": e.initiallyOpen,
      loading: n.loading
    }, {
      default: O(() => [
        d("div", ey, [
          b.value.nodes.length > 0 ? (h(), x("section", ty, [
            d("div", ay, [
              z(Yt, {
                data: b.value,
                height: "420px",
                "node-gap": 16
              }, null, 8, ["data"])
            ])
          ])) : (h(), x("section", ny, [...k[0] || (k[0] = [
            d("div", { class: "empty-state-content" }, [
              d("p", { class: "empty-title" }, "No ancillaries data available"),
              d("p", { class: "empty-description" }, " No ancillary funnel events found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])])),
          d("section", oy, [
            z(ve, {
              class: "ancillaries-value-card",
              color: "var(--kiut-success)",
              title: "Ancillaries CR",
              value: u.value
            }, null, 8, ["value"]),
            z(ve, {
              class: "ancillaries-value-card",
              color: "var(--kiut-primary, #5d4b93)",
              title: "Offered",
              value: L(ge)(s.value)
            }, null, 8, ["value"]),
            z(ve, {
              class: "ancillaries-value-card",
              color: "var(--kiut-success)",
              title: "Selected",
              value: L(ge)(i.value)
            }, null, 8, ["value"]),
            z(ve, {
              class: "ancillaries-value-card",
              color: "var(--kiut-primary, #5d4b93)",
              title: "Paid",
              value: L(ge)(r.value)
            }, null, 8, ["value"]),
            z(ve, {
              class: "ancillaries-value-card",
              color: "var(--kiut-error, #ef4444)",
              title: "Declined",
              value: L(ge)(l.value)
            }, null, 8, ["value"])
          ]),
          p.value.length > 0 ? (h(), x("section", sy, [
            d("div", iy, [
              z(ut, {
                columns: v.value,
                rows: p.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": O(({ row: _ }) => [
                  d("span", ly, A(L(Ne)(String(_.date)).format("MMM DD")), 1)
                ]),
                "cell-offered": O(({ row: _ }) => [
                  d("span", ry, A(L(ge)(Number(_.offered_count) || 0)), 1)
                ]),
                "cell-selected": O(({ row: _ }) => [
                  d("span", cy, A(L(ge)(Number(_.selected_count) || 0)), 1)
                ]),
                "cell-paid": O(({ row: _ }) => [
                  d("span", dy, A(L(ge)(Number(_.paid_count) || 0)), 1)
                ]),
                "cell-declined": O(({ row: _ }) => [
                  d("span", uy, A(L(ge)(Number(_.declined_count) || 0)), 1)
                ]),
                "cell-reasons": O(({ row: _ }) => [
                  (_.reasons || []).length > 0 ? (h(), x("div", hy, [
                    (h(!0), x(he, null, pe(_.reasons || [], (w) => (h(), x("div", {
                      key: w.reason,
                      class: "failed-reason-item"
                    }, [
                      d("span", fy, A(w.reason) + ":", 1),
                      d("span", gy, A(w.count), 1)
                    ]))), 128))
                  ])) : (h(), x("div", my, "-"))
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : F("", !0)
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), by = /* @__PURE__ */ be(py, [["__scopeId", "data-v-42f742c3"]]), vy = ["aria-label", "aria-expanded"], kn = 8, xa = 12, gi = /* @__PURE__ */ fe({
  __name: "CardMetricInfo",
  props: {
    title: {},
    text: {},
    dark: { type: Boolean }
  },
  setup(e) {
    const t = e, a = ne(!1), n = ne({
      top: "0px",
      left: "0px"
    }), o = ne(null), s = ne(null), i = $(
      () => t.dark ? "bg-[#8b5cf6] hover:bg-[#a78bfa] focus-visible:ring-[#8b5cf6]/50 focus-visible:ring-offset-[#1a1a23]" : "bg-[#7c3aed] hover:bg-[#6d28d9] focus-visible:ring-[#7c3aed]/40"
    );
    function l() {
      a.value = !1;
    }
    function r() {
      const g = o.value, b = s.value;
      if (!g || !b) return;
      const m = g.getBoundingClientRect(), v = b.getBoundingClientRect(), p = m.top - xa, y = window.innerHeight - m.bottom - xa, k = p >= v.height + kn, _ = y >= v.height + kn;
      let C = k || !_ && p >= y ? m.top - v.height - kn : m.bottom + kn;
      C = Math.max(
        xa,
        Math.min(C, window.innerHeight - v.height - xa)
      );
      let M = m.left + m.width / 2 - v.width / 2;
      M = Math.max(
        xa,
        Math.min(M, window.innerWidth - v.width - xa)
      ), n.value = {
        top: `${C}px`,
        left: `${M}px`
      };
    }
    async function c() {
      if (!t.text.trim()) return;
      a.value = !0, await We();
      const g = s.value;
      g && (g.style.visibility = "hidden", r(), g.style.visibility = "visible");
    }
    function u() {
      a.value && l();
    }
    function f(g) {
      g.key === "Escape" && l();
    }
    return window.addEventListener("scroll", u, !0), window.addEventListener("resize", u), window.addEventListener("keydown", f), at(() => {
      window.removeEventListener("scroll", u, !0), window.removeEventListener("resize", u), window.removeEventListener("keydown", f);
    }), (g, b) => (h(), x(he, null, [
      d("button", {
        ref_key: "triggerRef",
        ref: o,
        type: "button",
        class: Z(["inline-flex size-3.5 shrink-0 cursor-help items-center justify-center rounded-full text-[8px] font-bold leading-none text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1", i.value]),
        "aria-label": `About ${e.title}`,
        "aria-expanded": a.value,
        onMouseenter: c,
        onMouseleave: l,
        onFocus: c,
        onBlur: l
      }, " i ", 42, vy),
      (h(), ee(Wt, { to: "body" }, [
        a.value ? (h(), x("div", {
          key: 0,
          ref_key: "tooltipRef",
          ref: s,
          role: "tooltip",
          class: Z([
            "pointer-events-none w-max max-w-[min(20rem,calc(100vw-1.5rem))] rounded-xl px-3 py-2.5 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] shadow-lg",
            e.dark ? "bg-[#25252e] text-white shadow-black/50 ring-1 ring-white/10" : "bg-white text-slate-900 shadow-slate-900/10 ring-1 ring-black/10"
          ]),
          style: Ce({
            position: "fixed",
            top: n.value.top,
            left: n.value.left,
            zIndex: 1100
          })
        }, [
          d("p", {
            class: Z(["m-0 text-[13px] font-semibold leading-5", e.dark ? "text-white" : "text-slate-900"])
          }, A(e.title), 3),
          d("p", {
            class: Z(["m-0 mt-1 text-[12px] font-normal leading-4", e.dark ? "text-[#b4b4be]" : "text-slate-500"])
          }, A(e.text), 3)
        ], 6)) : F("", !0)
      ]))
    ], 64));
  }
}), yy = {
  key: "title-skeleton",
  class: "header-title-group",
  "aria-hidden": "true"
}, xy = {
  key: 0,
  class: "ut-skeleton-blink skeleton-header-label"
}, ky = {
  key: "title-content",
  class: "header-title-group"
}, _y = {
  class: "icon-wrapper",
  "aria-hidden": "true"
}, wy = {
  key: 0,
  class: "metric-label metric-label--header"
}, Cy = { class: "metric-label-text" }, $y = {
  key: "aside-skeleton",
  class: "ut-skeleton-blink skeleton-badge",
  "aria-hidden": "true"
}, Sy = { key: "aside-content" }, My = {
  key: "body-skeleton",
  class: "skeleton-body",
  "aria-busy": "true",
  "aria-label": "Loading metric"
}, Dy = {
  key: 0,
  class: "ut-skeleton-blink skeleton-label"
}, Ay = {
  key: "body-content",
  class: "highlight-inner"
}, Ty = { class: "card-body" }, By = { class: "metric-row" }, Ly = {
  key: 0,
  class: "metric-prefix"
}, Ry = {
  key: 0,
  class: "metric-label metric-label--row"
}, Iy = /* @__PURE__ */ fe({
  __name: "CardMetric",
  props: {
    label: {},
    value: {},
    prefix: { default: void 0 },
    valueSize: { default: "default" },
    labelPosition: { default: "below" },
    tooltip: { default: void 0 },
    tooltipTitle: { default: void 0 },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    currentValue: { default: 0 },
    previousValue: { default: null }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n } = Me($e(a, "theme")), o = $(() => a.labelPosition === "header"), s = $(() => a.tooltip?.trim() || ""), i = $(() => a.tooltipTitle?.trim() || a.label), l = $(
      () => a.previousValue !== null && a.previousValue !== void 0
    ), r = $(() => {
      if (!l.value) return 0;
      const f = a.previousValue;
      return f === 0 ? a.currentValue > 0 ? 100 : 0 : (a.currentValue - f) / f * 100;
    }), c = $(() => {
      const f = r.value;
      if (Number.isNaN(f)) return "-";
      const g = f.toFixed(1);
      return f > 0 ? `+${g}%` : `${g}%`;
    }), u = $(() => r.value > 0 ? "change-badge--up" : r.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: n, changePercent: r }), (f, g) => (h(), ee(Se, {
      collapsible: !1,
      class: Z([
        "card-metric",
        "w-full",
        {
          "card-metric--dark": L(n),
          "card-metric--label-header": o.value
        }
      ])
    }, {
      title: O(() => [
        z(ct, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: O(() => [
            e.loading ? (h(), x("div", yy, [
              g[0] || (g[0] = d("div", { class: "ut-skeleton-blink skeleton-icon" }, null, -1)),
              o.value ? (h(), x("div", xy)) : F("", !0)
            ])) : (h(), x("div", ky, [
              d("div", _y, [
                _e(f.$slots, "icon", {}, void 0, !0)
              ]),
              o.value ? (h(), x("span", wy, [
                d("span", Cy, A(e.label), 1),
                s.value ? (h(), ee(gi, {
                  key: 0,
                  title: i.value,
                  text: s.value,
                  dark: L(n)
                }, null, 8, ["title", "text", "dark"])) : F("", !0)
              ])) : F("", !0)
            ]))
          ]),
          _: 3
        })
      ]),
      headerAside: O(() => [
        z(ct, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: O(() => [
            e.loading ? (h(), x("div", $y)) : (h(), x("div", Sy, [
              _e(f.$slots, "headerAside", {}, () => [
                l.value ? (h(), x("div", {
                  key: 0,
                  class: Z(["change-badge", u.value])
                }, A(c.value), 3)) : F("", !0)
              ], !0)
            ]))
          ]),
          _: 3
        })
      ]),
      default: O(() => [
        z(ct, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: O(() => [
            e.loading ? (h(), x("div", My, [
              g[1] || (g[1] = d("div", { class: "ut-skeleton-blink skeleton-value" }, null, -1)),
              o.value ? F("", !0) : (h(), x("div", Dy))
            ])) : (h(), x("div", Ay, [
              d("div", Ty, [
                _e(f.$slots, "value", {}, () => [
                  d("div", By, [
                    e.prefix ? (h(), x("span", Ly, A(e.prefix), 1)) : F("", !0),
                    d("span", {
                      class: Z(["metric-value", e.valueSize === "large" ? "metric-value--large" : ""])
                    }, A(e.value), 3)
                  ])
                ], !0),
                o.value ? F("", !0) : (h(), x("span", Ry, [
                  d("span", null, A(e.label), 1),
                  s.value ? (h(), ee(gi, {
                    key: 0,
                    title: i.value,
                    text: s.value,
                    dark: L(n)
                  }, null, 8, ["title", "text", "dark"])) : F("", !0)
                ]))
              ])
            ]))
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["class"]));
  }
}), tt = /* @__PURE__ */ be(Iy, [["__scopeId", "data-v-2716cf55"]]), Py = /* @__PURE__ */ fe({
  __name: "AncillariesCR",
  props: {
    ancillariesCr: { default: 0 },
    previousAncillariesCr: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = $(
      () => `${Number(a.ancillariesCr || 0).toFixed(1)}%`
    ), s = $(() => L(n.value?.isDark) ?? !1), i = $(
      () => L(n.value?.changePercent) ?? 0
    );
    return t({ isDark: s, changePercent: i }), (l, r) => (h(), ee(tt, {
      label: "Ancillaries CR",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.ancillariesCr,
      "previous-value": e.previousAncillariesCr,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: O(() => [...r[0] || (r[0] = [
        d("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          d("path", { d: "M12 3v18" }),
          d("path", { d: "M5 8h14" }),
          d("path", { d: "M7 12h10" }),
          d("path", { d: "M9 16h6" }),
          d("rect", {
            x: "4",
            y: "4",
            width: "16",
            height: "16",
            rx: "2"
          })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "loading", "theme", "current-value", "previous-value"]));
  }
}), Ey = { class: "card-body" }, Oy = {
  key: 0,
  class: "chart-section"
}, Fy = {
  key: 1,
  class: "empty-state"
}, Vy = { class: "empty-state-content" }, Ny = { class: "empty-icon-wrapper" }, zy = /* @__PURE__ */ fe({
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
    }, o = e, s = a, i = (f) => {
      s("export", f);
    }, { isDark: l, colors: r } = Me($e(o, "theme")), c = $(() => {
      const g = (o.data?.top_agents || []).filter(
        (p) => p.agent_type?.toLowerCase() !== "triage"
      );
      if (g.length === 0)
        return { labels: [], datasets: [] };
      const b = g.reduce(
        (p, y) => p + (Number(y.conversations) || 0),
        0
      ), m = g.map((p) => {
        const y = p.agent_type?.toLowerCase();
        return n[y] || "#94a3b8";
      }), v = m.map((p) => `${p}80`);
      return {
        labels: g.map((p) => {
          const y = Number(p.conversations) || 0, k = b ? y / b * 100 : 0;
          return `${kt(p.agent_type)} - ${y.toLocaleString()} (${k.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: g.map((p) => p.conversations),
            backgroundColor: v,
            borderColor: m,
            borderWidth: 2
          }
        ]
      };
    }), u = $(() => o.options ? o.options : {
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
            color: r.value.textSecondary
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: r.value.tooltipBg,
          titleColor: r.value.tooltipText,
          bodyColor: r.value.tooltipText,
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
            label: (f) => {
              const g = (f.label || "").toString().split(" - ")[0], b = Number(f.parsed) || 0, m = (f.dataset.data || []).reduce(
                (p, y) => p + (Number(y) || 0),
                0
              ), v = m ? b / m * 100 : 0;
              return `${g}: ${b.toLocaleString()} (${v.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: l }), (f, g) => (h(), ee(Se, {
      class: "top-agents-root h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !e.loading ? (h(), ee(L(ze), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", Ey, [
          c.value.labels && c.value.labels.length ? (h(), x("section", Oy, [
            z(Vn, {
              data: c.value,
              options: u.value
            }, null, 8, ["data", "options"])
          ])) : (h(), x("section", Fy, [
            d("div", Vy, [
              d("div", Ny, [
                z(L(op), { class: "empty-icon" })
              ]),
              g[0] || (g[0] = d("p", { class: "empty-title" }, "No top agents data", -1)),
              g[1] || (g[1] = d("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see agent interaction trends. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), jy = /* @__PURE__ */ be(zy, [["__scopeId", "data-v-34a998ae"]]), Hy = { class: "card-body" }, Wy = {
  key: 0,
  class: "payment-methods-section"
}, Ky = { class: "payment-methods-grid" }, Uy = {
  key: 1,
  class: "empty-state"
}, Yy = { class: "empty-state-content" }, qy = { class: "empty-icon-wrapper" }, Xy = {
  key: 2,
  class: "payment-method-daily-section"
}, Gy = { class: "w-full min-w-0" }, Zy = { class: "font-medium" }, Qy = { class: "text-center" }, Jy = { class: "text-center success-value" }, e1 = {
  key: 0,
  class: "currency-cell-list"
}, t1 = { class: "payment-tags" }, a1 = { class: "tag-name" }, n1 = {
  key: 0,
  class: "tag-amount"
}, o1 = {
  key: 1,
  class: "tag-amount"
}, s1 = { class: "tag-count" }, i1 = {
  key: 3,
  class: "empty-table-state"
}, l1 = "Not Registered", r1 = /* @__PURE__ */ fe({
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
    const n = e, o = a, { isDark: s } = Me($e(n, "theme")), i = ne(!1), l = ne({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), r = $(() => l.value.payment_method_breakdown && l.value.payment_method_breakdown.length > 0), c = $(() => l.value.payment_method_by_day && l.value.payment_method_by_day.length > 0), u = $(() => !l.value.payment_method_by_day || l.value.payment_method_by_day.length === 0 ? [] : [...l.value.payment_method_by_day].sort((S, I) => Ne(S.date).valueOf() - Ne(I.date).valueOf())), f = [
      { key: "date", label: "Date", align: "left" },
      { key: "totalSales", label: "Total Sales", align: "center" },
      { key: "totalAmount", label: "Total Amount", align: "center" },
      { key: "paymentMethods", label: "Payment Methods", align: "left" }
    ], g = $(
      () => u.value.map((S) => ({
        id: S.date,
        date: S.date,
        total_count: S.total_count,
        total_amount: S.total_amount,
        total_amount_by_currency: S.total_amount_by_currency,
        payment_methods: S.payment_methods
      }))
    ), b = (S) => {
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
        (H) => ({
          payment_method: H.payment_method || "Unknown",
          total_amount: H.total_amount ?? 0,
          count: H.count ?? 0,
          total_amount_by_currency: H.total_amount_by_currency ?? []
        })
      ), V = (S.payment_method_by_day || []).map((H) => ({
        date: H.date || "",
        total_count: H.total_count ?? 0,
        total_amount: H.total_amount ?? 0,
        total_amount_by_currency: H.total_amount_by_currency ?? [],
        payment_methods: (H.payment_methods || []).map((D) => ({
          payment_method: D.payment_method || "Unknown",
          total_amount: D.total_amount ?? 0,
          count: D.count ?? 0,
          total_amount_by_currency: D.total_amount_by_currency ?? []
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
    }, m = async () => {
      if (!(!n.fetchFunction || !n.dates || n.dates.length < 2 || !n.airlineName)) {
        i.value = !0;
        try {
          const [S, I] = n.dates.map(
            (H) => Ne(H).format("YYYY-MM-DD")
          ), V = await n.fetchFunction(
            n.airlineName,
            S,
            I
          );
          l.value = b(V);
        } catch (S) {
          console.error("Error fetching payment method metrics:", S), l.value = b(null);
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
    ], p = (S) => !S || S.toLowerCase() === "unknown" ? l1 : S.replace(/_/g, " "), y = (S) => S == null ? "$0.00" : Oe(S), k = (S) => {
      const I = S.total_amount_by_currency;
      return I && I.length > 0 ? I.map((V) => `${V.currency} ${y(V.total_value)}`).join(" · ") : y(S.total_amount);
    }, _ = (S) => S ? Ne(S).format("MMM DD") : "-", w = (S) => S == null || Number.isNaN(Number(S)) ? 0 : Number(S), C = (S) => {
      o("export", S);
    };
    function M() {
      const S = n.data;
      S && (Array.isArray(S.payment_method_breakdown) && S.payment_method_breakdown.length > 0 || Array.isArray(S.payment_method_by_day) && S.payment_method_by_day.length > 0) && (i.value = !1, l.value = b(S));
    }
    return Je(() => {
      n.data ? M() : m();
    }), Le(
      () => n.data,
      (S) => {
        S && M();
      },
      { deep: !0 }
    ), Le(
      () => n.dates,
      (S) => {
        n.data || S && S[0] && S[1] && m();
      },
      { deep: !0 }
    ), t({ isDark: s }), (S, I) => (h(), ee(Se, {
      class: "payment-method-root h-full min-h-0",
      title: "Payment Method Metrics",
      subtitle: "Sales breakdown by payment method",
      loading: i.value,
      "lazy-mount": "",
      onOpen: I[0] || (I[0] = (V) => o("open"))
    }, {
      headerExport: O(() => [
        e.enableExport && !i.value ? (h(), ee(L(ze), {
          key: 0,
          variant: "inline",
          onExport: C,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", Hy, [
          r.value ? (h(), x("section", Wy, [
            I[1] || (I[1] = d("p", { class: "section-label" }, "Sales by Payment Method", -1)),
            d("div", Ky, [
              (h(!0), x(he, null, pe(l.value.payment_method_breakdown, (V, H) => (h(), ee(ve, {
                key: V.payment_method,
                class: "payment-method-card-item min-w-0",
                color: v[H % v.length],
                title: p(V.payment_method),
                value: k(V),
                subvalue: `${w(V.count)} ${w(V.count) === 1 ? "sale" : "sales"}`
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : (h(), x("section", Uy, [
            d("div", Yy, [
              d("div", qy, [
                z(L(sp), { class: "empty-icon" })
              ]),
              I[2] || (I[2] = d("p", { class: "empty-title" }, "No payment data available", -1)),
              I[3] || (I[3] = d("p", { class: "empty-description" }, " No payment method data found for the selected period. Try adjusting the date range. ", -1))
            ])
          ])),
          c.value ? (h(), x("section", Xy, [
            I[5] || (I[5] = d("p", { class: "section-label" }, "Daily Breakdown", -1)),
            d("div", Gy, [
              z(ut, {
                columns: f,
                rows: g.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": O(({ row: V }) => [
                  d("span", Zy, A(_(String(V.date))), 1)
                ]),
                "cell-totalSales": O(({ row: V }) => [
                  d("span", Qy, A(L(ge)(V.total_count ?? 0)), 1)
                ]),
                "cell-totalAmount": O(({ row: V }) => [
                  d("span", Jy, [
                    Array.isArray(V.total_amount_by_currency) && V.total_amount_by_currency.length > 0 ? (h(), x("div", e1, [
                      (h(!0), x(he, null, pe(V.total_amount_by_currency, (H) => (h(), x("span", {
                        key: `${V.date}-${H.currency}`
                      }, A(H.currency) + " " + A(y(H.total_value)), 1))), 128))
                    ])) : (h(), x(he, { key: 1 }, [
                      Ae(A(y(Number(V.total_amount ?? 0))), 1)
                    ], 64))
                  ])
                ]),
                "cell-paymentMethods": O(({ row: V }) => [
                  d("div", t1, [
                    (h(!0), x(he, null, pe(Array.isArray(V.payment_methods) ? V.payment_methods : [], (H) => (h(), x("div", {
                      key: H.payment_method,
                      class: "payment-tag"
                    }, [
                      d("span", a1, A(p(H.payment_method)), 1),
                      I[4] || (I[4] = d("span", { class: "tag-separator" }, "•", -1)),
                      !H.total_amount_by_currency || H.total_amount_by_currency.length === 0 ? (h(), x("span", n1, A(y(H.total_amount)), 1)) : (h(), x("span", o1, A(H.total_amount_by_currency.map(
                        (D) => `${D.currency} ${y(D.total_value)}`
                      ).join(" / ")), 1)),
                      d("span", s1, "(" + A(w(H.count)) + ")", 1)
                    ]))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : r.value ? (h(), x("div", i1, [...I[6] || (I[6] = [
            d("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
          ])])) : F("", !0)
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), c1 = /* @__PURE__ */ be(r1, [["__scopeId", "data-v-168637eb"]]), d1 = { class: "card-body" }, u1 = { class: "kpi-closed-value" }, h1 = { class: "kpi-closed-value__main" }, f1 = {
  key: 0,
  class: "kpi-closed-value__pct"
}, g1 = { class: "table-view-select flex justify-end" }, m1 = { class: "table-section w-full min-w-0" }, p1 = { class: "cell-plain" }, b1 = { class: "cell-plain" }, v1 = { class: "cell-plain cell-plain--muted" }, y1 = { class: "cell-plain" }, x1 = { class: "cell-plain cell-plain--orange" }, k1 = { class: "cell-plain cell-plain--red" }, _1 = { class: "cell-plain cell-plain--muted" }, w1 = { class: "cell-plain cell-plain--muted" }, C1 = { class: "cell-plain cell-plain--muted" }, $1 = { class: "cell-plain" }, S1 = { class: "cell-plain" }, M1 = {
  key: 2,
  class: "empty-state"
}, D1 = 6, A1 = /* @__PURE__ */ fe({
  __name: "AgentHumanConversations",
  props: {
    data: { default: () => ({
      total_assigned: 0,
      total_closed: 0,
      total_enqueued: 0,
      total_transferred: 0,
      total_abandoned: 0,
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
    previousTotalTransferred: { default: null },
    previousTotalAbandoned: { default: null },
    previousAvgTimeToAssignSeconds: { default: null },
    previousAvgConversationDurationSeconds: { default: null }
  },
  emits: ["open", "export"],
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, s = (P) => {
      o("export", P);
    }, { isDark: i } = Me($e(n, "theme")), l = /* @__PURE__ */ new Set(["—", "-", "–", ""]);
    function r(P) {
      const X = P?.trim() ?? "";
      return X.length > 0 && !l.has(X);
    }
    function c(P) {
      if (!r(P.agent_email)) return !1;
      const X = P.assigned_count ?? 0, te = P.closed_count ?? 0, E = P.transferred_count ?? 0, Q = P.abandoned_count ?? 0;
      return X > 0 || te > 0 || E > 0 || Q > 0;
    }
    function u(P) {
      return P.closed_count ?? 0;
    }
    function f(P) {
      return P.transferred_count ?? 0;
    }
    function g(P) {
      return P.abandoned_count ?? 0;
    }
    function b(P) {
      const X = P?.trim();
      return X || "—";
    }
    function m(P) {
      const X = P?.trim();
      return X || "—";
    }
    function v(P) {
      return P == null ? "0" : ae(P);
    }
    const p = $(
      () => (n.data?.agents_by_day ?? []).filter(c)
    ), y = $(() => p.value.length > 0), k = $(() => {
      const P = (n.data?.total_enqueued ?? 0) > 0, X = (n.data?.total_transferred ?? 0) > 0, te = (n.data?.total_abandoned ?? 0) > 0;
      return y.value || P || X || te;
    }), _ = ne("by_date"), w = [
      { value: "by_date", label: "By date" },
      { value: "aggregated", label: "Aggregated" }
    ], C = ne("date"), M = ne("desc");
    Le(_, (P) => {
      P === "aggregated" ? (C.value = "name", M.value = "asc") : (C.value = "date", M.value = "desc");
    });
    function S(P, X) {
      return X == null ? null : X === 0 ? P > 0 ? 100 : 0 : (P - X) / X * 100;
    }
    function I(P) {
      const X = P.toFixed(1);
      return P > 0 ? `+${X}%` : `${X}%`;
    }
    function V(P, X = !1) {
      const te = X ? -P : P;
      return te > 0 ? "change-badge--up" : te < 0 ? "change-badge--down" : "change-badge--neutral";
    }
    function H(P, X) {
      if (P === null) return null;
      const te = S(P, X);
      return te === null ? null : {
        label: I(te),
        class: V(te, !0)
      };
    }
    function D(P) {
      if (P == null || P === "") return null;
      if (typeof P == "number")
        return Number.isFinite(P) ? P : null;
      const X = P.trim();
      if (!X) return null;
      if (X.includes(":")) {
        const E = X.split(":").map(Number);
        return E.length !== 3 || E.some(isNaN) ? null : E[0] * 3600 + E[1] * 60 + E[2];
      }
      const te = Number(X);
      return Number.isFinite(te) ? te : null;
    }
    function T(P) {
      const X = Math.round(P), te = Math.floor(X / 3600), E = Math.floor(X % 3600 / 60), Q = X % 60;
      return `${String(te).padStart(2, "0")}:${String(E).padStart(2, "0")}:${String(Q).padStart(2, "0")}`;
    }
    function B(P) {
      const X = D(P);
      return X === null ? "—" : typeof P == "string" && P.includes(":") ? P.trim() : T(X);
    }
    const j = $(() => n.data?.total_enqueued ?? 0), W = $(() => n.data?.total_closed ?? 0), J = $(() => n.data?.total_transferred ?? 0), re = $(() => n.data?.total_abandoned ?? 0), ue = $(
      () => n.data?.avg_time_to_assign_seconds ?? null
    ), q = $(
      () => n.data?.avg_conversation_duration_seconds ?? null
    ), oe = $(() => j.value <= 0 ? null : `(${(W.value / j.value * 100).toFixed(1)}%)`), R = $(
      () => H(
        D(ue.value),
        n.previousAvgTimeToAssignSeconds
      )
    ), K = $(
      () => H(
        D(q.value),
        n.previousAvgConversationDurationSeconds
      )
    );
    function Y(P, X) {
      return {
        id: `${P.date}-${P.agent_email}-${X}`,
        date: P.date,
        dateSort: new Date(P.date).getTime(),
        agent_name: P.agent_name ?? "",
        agent_email: P.agent_email,
        handled: u(P),
        transferred: f(P),
        abandoned: g(P),
        connected_at: P.connected_at ?? null,
        disconnected_at: P.disconnected_at ?? null,
        online_time_display: P.online_time_seconds == null || P.online_time_seconds === "" ? null : B(P.online_time_seconds),
        avg_assignation_seconds: D(P.avg_time_to_assign_seconds),
        avg_resolution_seconds: D(P.avg_conversation_duration_seconds),
        avg_assignation_display: B(P.avg_time_to_assign_seconds),
        avg_resolution_display: B(P.avg_conversation_duration_seconds)
      };
    }
    function N(P) {
      const X = /* @__PURE__ */ new Map();
      for (const te of P) {
        if (!c(te)) continue;
        const E = te.agent_email.trim();
        X.has(E) || X.set(E, {
          agent_name: te.agent_name?.trim() ?? "",
          agent_email: E,
          handled: 0,
          transferred: 0,
          abandoned: 0,
          assignSum: 0,
          assignWeight: 0,
          resolutionSum: 0,
          resolutionWeight: 0
        });
        const Q = X.get(E), se = te.assigned_count ?? 0, me = te.closed_count ?? 0;
        Q.handled += u(te), Q.transferred += f(te), Q.abandoned += g(te), te.agent_name?.trim() && (Q.agent_name = te.agent_name.trim());
        const we = D(te.avg_time_to_assign_seconds);
        we !== null && se > 0 && (Q.assignSum += we * se, Q.assignWeight += se);
        const xe = D(te.avg_conversation_duration_seconds);
        xe !== null && me > 0 && (Q.resolutionSum += xe * me, Q.resolutionWeight += me);
      }
      return Array.from(X.values()).map((te, E) => {
        const Q = te.assignWeight > 0 ? te.assignSum / te.assignWeight : null, se = te.resolutionWeight > 0 ? te.resolutionSum / te.resolutionWeight : null;
        return {
          id: `agg-${te.agent_email}-${E}`,
          agent_name: te.agent_name,
          agent_email: te.agent_email,
          handled: te.handled,
          transferred: te.transferred,
          abandoned: te.abandoned,
          connected_at: null,
          disconnected_at: null,
          online_time_display: null,
          avg_assignation_seconds: Q,
          avg_resolution_seconds: se,
          avg_assignation_display: Q !== null ? T(Q) : "—",
          avg_resolution_display: se !== null ? T(se) : "—"
        };
      });
    }
    const ie = $(() => {
      const P = p.value;
      return _.value === "aggregated" ? N(P) : P.map(Y);
    });
    function ce(P, X, te, E) {
      const Q = E === "asc" ? 1 : -1;
      let se = 0;
      switch (te) {
        case "date":
          se = (P.dateSort ?? 0) - (X.dateSort ?? 0);
          break;
        case "name":
          se = (P.agent_name || "").localeCompare(X.agent_name || "", void 0, {
            sensitivity: "base"
          });
          break;
        case "email":
          se = P.agent_email.localeCompare(X.agent_email, void 0, {
            sensitivity: "base"
          });
          break;
        case "handled":
          se = P.handled - X.handled;
          break;
        case "transferred":
          se = P.transferred - X.transferred;
          break;
        case "abandoned":
          se = (P.abandoned ?? 0) - (X.abandoned ?? 0);
          break;
        case "avgAssignation":
          se = (P.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY) - (X.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY);
          break;
        case "avgResolution":
          se = (P.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY) - (X.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY);
          break;
      }
      if (se !== 0) return se * Q;
      if (_.value === "by_date" && te !== "date") {
        const me = (X.dateSort ?? 0) - (P.dateSort ?? 0);
        if (me !== 0) return me;
      }
      return (P.agent_name || "").localeCompare(X.agent_name || "", void 0, {
        sensitivity: "base"
      });
    }
    const ye = $(() => {
      const P = [...ie.value];
      return P.sort((X, te) => ce(X, te, C.value, M.value)), P;
    }), U = $(
      () => ye.value
    ), le = $(() => {
      const P = [];
      return _.value === "by_date" && P.push({
        key: "date",
        label: "Date",
        align: "left",
        sortable: !0
      }), P.push(
        { key: "name", label: "Name", align: "left", sortable: !0 },
        { key: "email", label: "Email", align: "left", sortable: !0 },
        { key: "handled", label: "Handled", align: "center", sortable: !0 },
        {
          key: "transferred",
          label: "Transferred",
          align: "center",
          sortable: !0
        },
        {
          key: "abandoned",
          label: "Abandoned",
          align: "center",
          sortable: !0
        },
        {
          key: "connected",
          label: "Connected",
          align: "center",
          sortable: !1
        },
        {
          key: "disconnected",
          label: "Disconnected",
          align: "center",
          sortable: !1
        },
        {
          key: "onlineTime",
          label: "Online time",
          align: "center",
          sortable: !1
        },
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
      ), P;
    });
    function de(P) {
      const X = P;
      if (C.value === X) {
        M.value = M.value === "asc" ? "desc" : "asc";
        return;
      }
      C.value = X, X === "date" ? M.value = "desc" : X === "name" || X === "email" ? M.value = "asc" : M.value = "desc";
    }
    const ae = (P) => P == null ? "0" : ge(P), G = (P) => new Date(P).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
    return t({ isDark: i }), (P, X) => (h(), ee(Se, {
      class: "agent-human-conv-root h-full min-h-0",
      title: "Agent Human Conversations",
      subtitle: "Human conversation assignments and closures by agent",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: X[1] || (X[1] = (te) => o("open"))
    }, {
      headerExport: O(() => [
        e.enableExport && !e.loading ? (h(), ee(L(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", d1, [
          k.value ? (h(), x("div", {
            key: 0,
            class: Z(["grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 md:gap-4", { "agent-human-conv--dark": L(i) }])
          }, [
            z(tt, {
              label: "Conversations Opened",
              "label-position": "header",
              value: ae(j.value),
              theme: e.theme,
              "current-value": j.value,
              "previous-value": e.previousTotalEnqueued
            }, {
              icon: O(() => [...X[2] || (X[2] = [
                d("svg", {
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "1.5"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                  })
                ], -1)
              ])]),
              _: 1
            }, 8, ["value", "theme", "current-value", "previous-value"]),
            z(tt, {
              label: "Conversations Closed",
              "label-position": "header",
              value: ae(W.value),
              theme: e.theme,
              "current-value": W.value,
              "previous-value": e.previousTotalClosed
            }, {
              icon: O(() => [...X[3] || (X[3] = [
                d("svg", {
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "1.5"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  })
                ], -1)
              ])]),
              value: O(() => [
                d("div", u1, [
                  d("span", h1, A(ae(W.value)), 1),
                  oe.value ? (h(), x("span", f1, A(oe.value), 1)) : F("", !0)
                ])
              ]),
              _: 1
            }, 8, ["value", "theme", "current-value", "previous-value"]),
            z(tt, {
              label: "Transferred",
              "label-position": "header",
              value: ae(J.value),
              theme: e.theme,
              "current-value": J.value,
              "previous-value": e.previousTotalTransferred
            }, {
              icon: O(() => [...X[4] || (X[4] = [
                d("svg", {
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "1.5"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                  })
                ], -1)
              ])]),
              _: 1
            }, 8, ["value", "theme", "current-value", "previous-value"]),
            z(tt, {
              label: "Abandoned",
              "label-position": "header",
              value: ae(re.value),
              theme: e.theme,
              "current-value": re.value,
              "previous-value": e.previousTotalAbandoned
            }, {
              icon: O(() => [...X[5] || (X[5] = [
                d("svg", {
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "1.5"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  })
                ], -1)
              ])]),
              _: 1
            }, 8, ["value", "theme", "current-value", "previous-value"]),
            z(tt, {
              label: "Avg Time to Assign",
              "label-position": "header",
              value: B(ue.value),
              theme: e.theme,
              "current-value": D(ue.value) ?? 0,
              "previous-value": e.previousAvgTimeToAssignSeconds
            }, zo({
              icon: O(() => [
                X[6] || (X[6] = d("svg", {
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "1.5"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  })
                ], -1))
              ]),
              _: 2
            }, [
              R.value ? {
                name: "headerAside",
                fn: O(() => [
                  d("div", {
                    class: Z(["duration-trend-badge", R.value.class])
                  }, A(R.value.label), 3)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["value", "theme", "current-value", "previous-value"]),
            z(tt, {
              label: "Avg Resolution Time",
              "label-position": "header",
              value: B(q.value),
              theme: e.theme,
              "current-value": D(q.value) ?? 0,
              "previous-value": e.previousAvgConversationDurationSeconds
            }, zo({
              icon: O(() => [
                X[7] || (X[7] = d("svg", {
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "1.5"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  })
                ], -1))
              ]),
              _: 2
            }, [
              K.value ? {
                name: "headerAside",
                fn: O(() => [
                  d("div", {
                    class: Z(["duration-trend-badge", K.value.class])
                  }, A(K.value.label), 3)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["value", "theme", "current-value", "previous-value"])
          ], 2)) : F("", !0),
          y.value ? (h(), ee(Se, {
            key: 1,
            class: "agent-table-section mt-6",
            title: "Conversations Managed by Agent",
            subtitle: "Daily performance per human agent",
            collapsible: !1
          }, {
            headerAside: O(() => [
              d("div", g1, [
                z(Et, {
                  modelValue: _.value,
                  "onUpdate:modelValue": X[0] || (X[0] = (te) => _.value = te),
                  options: w,
                  "aria-label-trigger": "Table view mode",
                  "show-option-check": !1
                }, null, 8, ["modelValue"])
              ])
            ]),
            default: O(() => [
              d("div", m1, [
                (h(), ee(ut, {
                  key: `${_.value}-${C.value}-${M.value}`,
                  columns: le.value,
                  rows: U.value,
                  "sort-key": C.value,
                  "sort-direction": M.value,
                  "max-visible-rows": D1,
                  "row-key": "id",
                  onSort: de
                }, {
                  "cell-date": O(({ row: te }) => [
                    d("span", p1, A(G(String(te.date))), 1)
                  ]),
                  "cell-name": O(({ row: te }) => [
                    d("span", b1, A(b(te.agent_name)), 1)
                  ]),
                  "cell-email": O(({ row: te }) => [
                    d("span", v1, A(te.agent_email), 1)
                  ]),
                  "cell-handled": O(({ row: te }) => [
                    d("span", y1, A(ae(Number(te.handled))), 1)
                  ]),
                  "cell-transferred": O(({ row: te }) => [
                    d("span", x1, A(ae(Number(te.transferred))), 1)
                  ]),
                  "cell-abandoned": O(({ row: te }) => [
                    d("span", k1, A(v(te.abandoned)), 1)
                  ]),
                  "cell-connected": O(({ row: te }) => [
                    d("span", _1, A(m(te.connected_at)), 1)
                  ]),
                  "cell-disconnected": O(({ row: te }) => [
                    d("span", w1, A(m(te.disconnected_at)), 1)
                  ]),
                  "cell-onlineTime": O(({ row: te }) => [
                    d("span", C1, A(m(te.online_time_display)), 1)
                  ]),
                  "cell-avgAssignation": O(({ row: te }) => [
                    d("span", $1, A(te.avg_assignation_display), 1)
                  ]),
                  "cell-avgResolution": O(({ row: te }) => [
                    d("span", S1, A(te.avg_resolution_display), 1)
                  ]),
                  _: 1
                }, 8, ["columns", "rows", "sort-key", "sort-direction"]))
              ])
            ]),
            _: 1
          })) : k.value ? F("", !0) : (h(), x("div", M1, [...X[8] || (X[8] = [
            d("div", { class: "empty-state-content" }, [
              d("div", { class: "empty-icon-wrapper" }, [
                d("svg", {
                  class: "empty-icon",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  })
                ])
              ]),
              d("p", { class: "empty-title" }, "No agent human conversation data available"),
              d("p", { class: "empty-description" }, " Try adjusting the date range or check your filters. ")
            ], -1)
          ])]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), T1 = /* @__PURE__ */ be(A1, [["__scopeId", "data-v-96b44a98"]]), B1 = {
  key: 0,
  class: "w-52"
}, L1 = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, R1 = { class: "w-full shrink-0 flex min-h-0 flex-col" }, I1 = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, P1 = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, E1 = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, O1 = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, F1 = { class: "max-w-[360px] px-4 text-center" }, V1 = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, N1 = { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, z1 = { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, mi = 5, j1 = /* @__PURE__ */ fe({
  __name: "ChannelMetrics",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 },
    title: { default: "Conversations by Channel" },
    subtitle: { default: "Conversations sent by AI agents" },
    unit: { default: "msgs" },
    totalConversations: { default: void 0 },
    emptyTitle: { default: "No channel metrics data available" },
    emptyDescription: { default: "No channel data found for the selected period. Try adjusting the date range." },
    breakdownBy: { default: "" },
    breakdownOptions: { default: () => [] },
    showSummaryCards: { type: Boolean, default: !0 }
  },
  emits: ["export", "changeBreakdown"],
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, s = (k) => {
      o("export", k);
    }, i = (k) => {
      o("changeBreakdown", String(k));
    }, l = $e(n, "theme"), { isDark: r } = Me(l), c = {
      wsp: "#25D366",
      whatsapp: "#25D366",
      voice: "#8b5cf6",
      sms: "#f59e0b",
      web_chat: "#06b6d4",
      email: "#ec4899",
      messenger: "#0084ff",
      telegram: "#0088cc",
      instagram: "#E4405F"
    }, u = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899", "#06B6D4"], f = (k) => {
      const _ = k.toLowerCase(), w = c[_];
      if (w) return w;
      const C = Array.from(_).reduce(
        (M, S) => (M << 5) - M + S.charCodeAt(0) | 0,
        0
      );
      return u[Math.abs(C) % u.length];
    }, g = ne({
      labels: [],
      datasets: []
    }), b = $(
      () => n.data ?? {
        channels_by_day: {},
        total_by_channel: {},
        total_conversations: 0
      }
    ), m = $(() => {
      const k = b.value.total_by_channel || {}, _ = Object.values(k).reduce(
        (C, M) => C + M,
        0
      ), w = n.totalConversations ?? _;
      return w === 0 ? [] : Object.entries(k).sort(([, C], [, M]) => M - C).map(([C, M]) => ({
        name: C,
        label: C.toUpperCase(),
        total: M,
        percentage: (M / w * 100).toFixed(1),
        color: f(C)
      }));
    }), v = $(
      () => m.value.slice(0, mi)
    ), p = $(() => {
      const k = Math.min(v.value.length, mi);
      if (!(k <= 0))
        return { gridTemplateColumns: `repeat(${k}, minmax(0, 1fr))` };
    }), y = (k) => {
      if (!k || !k.channels_by_day) {
        g.value = { labels: [], datasets: [] };
        return;
      }
      const _ = k.channels_by_day, w = Object.keys(_).sort();
      if (w.length === 0) {
        g.value = { labels: [], datasets: [] };
        return;
      }
      const C = /* @__PURE__ */ new Set();
      for (const I of Object.values(_))
        for (const V of Object.keys(I))
          C.add(V);
      const S = Array.from(C).map((I) => ({
        label: I.toUpperCase(),
        data: w.map((V) => _[V]?.[I] || 0),
        borderColor: f(I)
      }));
      g.value = {
        labels: w.map((I) => Ne(I).format("MMM DD")),
        datasets: S
      };
    };
    return Le(
      () => n.data,
      (k) => {
        y(k ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: r }), (k, _) => (h(), ee(Se, {
      class: "w-full min-h-0 self-start",
      title: n.title,
      subtitle: n.subtitle,
      collapsible: !1,
      loading: n.loading
    }, {
      headerAside: O(() => [
        n.breakdownOptions.length ? (h(), x("div", B1, [
          z(Et, {
            "model-value": n.breakdownBy,
            options: n.breakdownOptions,
            "onUpdate:modelValue": i
          }, null, 8, ["model-value", "options"])
        ])) : F("", !0)
      ]),
      headerExport: O(() => [
        e.enableExport && !n.loading ? (h(), ee(L(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", L1, [
          d("div", R1, [
            g.value.labels && g.value.labels.length ? (h(), x("section", I1, [
              d("div", P1, [
                z(pt, {
                  data: g.value,
                  theme: l.value
                }, null, 8, ["data", "theme"])
              ]),
              n.showSummaryCards && v.value.length ? (h(), x("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: Ce(p.value)
              }, [
                (h(!0), x(he, null, pe(v.value, (w) => (h(), ee(ve, {
                  key: w.name,
                  class: "min-w-0",
                  color: w.color,
                  title: w.label,
                  value: `${w.percentage}%`,
                  subvalue: `${L(ge)(w.total)} ${n.unit}`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : F("", !0)
            ])) : n.showSummaryCards && m.value.length ? (h(), x("section", E1, [
              d("div", {
                class: "grid w-full gap-3 md:gap-4",
                style: Ce(p.value)
              }, [
                (h(!0), x(he, null, pe(v.value, (w) => (h(), ee(ve, {
                  key: w.name,
                  class: "min-w-0",
                  color: w.color,
                  title: w.label,
                  value: `${w.percentage}%`,
                  subvalue: `${L(ge)(w.total)} ${n.unit}`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)
            ])) : F("", !0),
            m.value.length ? F("", !0) : (h(), x("section", O1, [
              d("div", F1, [
                d("div", V1, [
                  z(L(dt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                d("p", N1, A(n.emptyTitle), 1),
                d("p", z1, A(n.emptyDescription), 1)
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["title", "subtitle", "loading"]));
  }
}), Bl = /* @__PURE__ */ be(j1, [["__scopeId", "data-v-987b8c34"]]), H1 = /* @__PURE__ */ fe({
  __name: "ConversationVolume",
  props: {
    data: { default: null },
    loading: { type: Boolean, default: !1 },
    breakdownBy: { default: "all" },
    breakdownOptions: { default: () => [] },
    titles: { default: () => ({
      all: "Conversations",
      resolution_mode: "Conversations by Resolution Mode",
      agent: "Conversations by Agent",
      channel: "Conversations by Channel",
      agent_channel: "Conversations by Agent and Channel"
    }) },
    subtitle: { default: "Conversations over time" },
    emptyTitle: { default: "No conversation data" },
    emptyDescription: { default: "Try adjusting the date range or filters." }
  },
  emits: ["changeBreakdown"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = $(() => a.data?.total_conversations ?? 0), s = $(() => a.data?.breakdown_by_day ?? {}), i = $(() => a.titles[a.breakdownBy]), l = $(() => ({ agents_by_day: s.value })), r = $(() => ({
      channels_by_day: s.value,
      total_by_channel: Object.fromEntries(
        (a.data?.breakdown_items ?? []).map((c) => [c.key, c.total_conversations])
      ),
      total_conversations: o.value
    }));
    return (c, u) => a.breakdownBy === "channel" ? (h(), ee(Bl, {
      key: 0,
      data: r.value,
      loading: a.loading,
      title: i.value,
      subtitle: a.subtitle,
      "breakdown-by": a.breakdownBy,
      "breakdown-options": a.breakdownOptions,
      unit: "convs",
      "total-conversations": o.value,
      "empty-title": a.emptyTitle,
      "empty-description": a.emptyDescription,
      onChangeBreakdown: u[0] || (u[0] = (f) => n("changeBreakdown", f))
    }, null, 8, ["data", "loading", "title", "subtitle", "breakdown-by", "breakdown-options", "total-conversations", "empty-title", "empty-description"])) : (h(), ee(Dl, {
      key: 1,
      data: l.value,
      loading: a.loading,
      title: i.value,
      subtitle: a.subtitle,
      "breakdown-by": a.breakdownBy,
      "breakdown-options": a.breakdownOptions,
      unit: "convs",
      "total-conversations": o.value,
      "max-series": a.breakdownBy === "agent_channel" ? 7 : void 0,
      "show-summary-cards": a.breakdownBy !== "all",
      "empty-title": a.emptyTitle,
      "empty-description": a.emptyDescription,
      onChangeBreakdown: u[1] || (u[1] = (f) => n("changeBreakdown", f))
    }, null, 8, ["data", "loading", "title", "subtitle", "breakdown-by", "breakdown-options", "total-conversations", "max-series", "show-summary-cards", "empty-title", "empty-description"]));
  }
}), W1 = { class: "card-body" }, K1 = { class: "chart-container" }, U1 = { class: "triage-table-block w-full min-w-0" }, Y1 = { class: "triage-row-label" }, q1 = {
  key: 1,
  class: "triage-count"
}, X1 = {
  key: 1,
  class: "triage-count"
}, G1 = {
  key: 1,
  class: "triage-count"
}, Z1 = {
  key: 1,
  class: "triage-count"
}, Q1 = {
  key: 1,
  class: "triage-count"
}, J1 = {
  key: 1,
  class: "empty-state"
}, ex = { class: "empty-state-content" }, tx = { class: "empty-icon-wrapper" }, ax = /* @__PURE__ */ fe({
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
    }, { isDark: i, colors: l } = Me(
      $e(n, "theme")
    ), r = $(() => {
      const _ = n.data?.combinations || {}, w = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [C, M] of Object.entries(_)) {
        const S = C.split("+").filter(Boolean);
        if (!S.includes("triage")) continue;
        const I = S.filter((V) => V !== "triage").length;
        I >= 4 ? w["4p"] += Number(M) || 0 : w[I] += Number(M) || 0;
      }
      return w;
    }), c = $(() => {
      const _ = r.value;
      return _[0] + _[1] + _[2] + _[3] + _["4p"] || 0;
    }), u = $(() => Object.keys(n.data?.combinations || {}).length > 0), f = $(() => {
      const _ = c.value;
      if (!_) return { pct0: 0, pct1: 0, pct2: 0, pct3: 0, pct4p: 0 };
      const w = r.value;
      return {
        pct0: w[0] / _ * 100,
        pct1: w[1] / _ * 100,
        pct2: w[2] / _ * 100,
        pct3: w[3] / _ * 100,
        pct4p: w["4p"] / _ * 100
      };
    }), g = [
      { key: "metric", label: "Number of intentions", align: "left" },
      { key: "b0", label: "0", align: "center" },
      { key: "b1", label: "1", align: "center" },
      { key: "b2", label: "2", align: "center" },
      { key: "b3", label: "3", align: "center" },
      { key: "b4p", label: "4 or more", align: "center" }
    ], b = $(() => {
      const _ = f.value, w = r.value;
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
    }), m = {
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
    }, v = (_) => _?.replace("80", "") || "#888888", p = $(() => ({
      labels: ["Distribution"],
      datasets: [
        {
          label: "0",
          data: [f.value.pct0],
          backgroundColor: m.c0,
          borderColor: v(m.c0),
          borderWidth: 1
        },
        {
          label: "1",
          data: [f.value.pct1],
          backgroundColor: m.c1,
          borderColor: v(m.c1),
          borderWidth: 1
        },
        {
          label: "2",
          data: [f.value.pct2],
          backgroundColor: m.c2,
          borderColor: v(m.c2),
          borderWidth: 1
        },
        {
          label: "3",
          data: [f.value.pct3],
          backgroundColor: m.c3,
          borderColor: v(m.c3),
          borderWidth: 1
        },
        {
          label: "4+",
          data: [f.value.pct4p],
          backgroundColor: m.c4p,
          borderColor: v(m.c4p),
          borderWidth: 1
        }
      ]
    })), y = $(() => ({
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
    })), k = (_) => `${(Number(_) || 0).toFixed(0)}`;
    return t({ isDark: i }), (_, w) => (h(), ee(Se, {
      class: "triage-combinations-root h-full min-h-0",
      title: "Distribution of Number of Intents",
      subtitle: "Analysis of intent combinations per conversation",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !e.loading ? (h(), ee(L(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", W1, [
          u.value ? (h(), x(he, { key: 0 }, [
            d("div", K1, [
              z($t, {
                data: p.value,
                options: y.value
              }, null, 8, ["data", "options"])
            ]),
            z(ve, {
              class: "w-full min-w-0",
              title: "Total",
              value: L(ge)(c.value),
              subvalue: "Conversations with triage"
            }, null, 8, ["value"]),
            d("div", U1, [
              z(ut, {
                columns: g,
                rows: b.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-metric": O(({ row: C }) => [
                  d("span", Y1, A(C.metric), 1)
                ]),
                "cell-b0": O(({ row: C }) => [
                  C.id === "pct" ? (h(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: Ce({ color: v(m.c0) })
                  }, A(k(Number(C.b0))) + "%", 5)) : (h(), x("span", q1, A(L(ge)(Number(C.b0))), 1))
                ]),
                "cell-b1": O(({ row: C }) => [
                  C.id === "pct" ? (h(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: Ce({ color: v(m.c1) })
                  }, A(k(Number(C.b1))) + "%", 5)) : (h(), x("span", X1, A(L(ge)(Number(C.b1))), 1))
                ]),
                "cell-b2": O(({ row: C }) => [
                  C.id === "pct" ? (h(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: Ce({ color: v(m.c2) })
                  }, A(k(Number(C.b2))) + "%", 5)) : (h(), x("span", G1, A(L(ge)(Number(C.b2))), 1))
                ]),
                "cell-b3": O(({ row: C }) => [
                  C.id === "pct" ? (h(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: Ce({ color: v(m.c3) })
                  }, A(k(Number(C.b3))) + "%", 5)) : (h(), x("span", Z1, A(L(ge)(Number(C.b3))), 1))
                ]),
                "cell-b4p": O(({ row: C }) => [
                  C.id === "pct" ? (h(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: Ce({ color: v(m.c4p) })
                  }, A(k(Number(C.b4p))) + "%", 5)) : (h(), x("span", Q1, A(L(ge)(Number(C.b4p))), 1))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ], 64)) : (h(), x("div", J1, [
            d("div", ex, [
              d("div", tx, [
                z(L(dt), { class: "empty-icon" })
              ]),
              w[0] || (w[0] = d("p", { class: "empty-title" }, "No triage combinations data", -1)),
              w[1] || (w[1] = d("p", { class: "empty-description" }, " No intent distribution data found for the selected period. Try adjusting the date range. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), nx = /* @__PURE__ */ be(ax, [["__scopeId", "data-v-be7d2c0c"]]), ox = { class: "card-body" }, sx = {
  key: 0,
  class: "distribution-with-total flex w-full min-w-0 flex-1 flex-col gap-3 min-h-0"
}, ix = { class: "pie-section" }, lx = {
  key: 1,
  class: "empty-state"
}, rx = /* @__PURE__ */ fe({
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
    }, l = (b) => i[b]?.label || b.toUpperCase(), r = $(
      () => a.data?.items && a.data.items.length > 0
    ), c = $(
      () => (a.data?.items || []).reduce((b, m) => b + m.count, 0)
    ), u = $(() => {
      const b = {};
      for (const m of a.data?.items || [])
        b[m.language] = (b[m.language] || 0) + m.count;
      return Object.entries(b).map(([m, v]) => ({ language: m, count: v })).sort((m, v) => v.count - m.count);
    }), f = $(() => ({
      labels: u.value.map((b) => l(b.language)),
      datasets: [
        {
          data: u.value.map((b) => b.count),
          backgroundColor: u.value.map(
            (b, m) => s[m % s.length] + "80"
          ),
          borderColor: u.value.map(
            (b, m) => s[m % s.length]
          ),
          borderWidth: 2,
          hoverOffset: 6
        }
      ]
    })), g = $(() => ({
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
            label: (b) => {
              const m = b.raw || 0, v = c.value > 0 ? (m / c.value * 100).toFixed(1) : "0";
              return ` ${b.label}: ${m} (${v}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: n }), (b, m) => (h(), ee(Se, {
      class: "select-language-root h-full min-h-0",
      title: "Language Selection",
      subtitle: "Language distribution across conversations",
      collapsible: !1,
      loading: a.loading
    }, {
      default: O(() => [
        d("div", ox, [
          r.value ? (h(), x("div", sx, [
            d("section", ix, [
              z(Vn, {
                data: f.value,
                options: g.value
              }, null, 8, ["data", "options"])
            ]),
            z(ve, {
              class: "shrink-0",
              title: "Total",
              value: L(ge)(c.value),
              color: "#8b5cf6"
            }, null, 8, ["value"])
          ])) : (h(), x("section", lx, [...m[0] || (m[0] = [
            d("div", { class: "empty-state-content" }, [
              d("div", { class: "empty-icon-wrapper" }, [
                d("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  })
                ])
              ]),
              d("p", { class: "empty-title" }, "No language data available"),
              d("p", { class: "empty-description" }, " No language selection data found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), cx = /* @__PURE__ */ be(rx, [["__scopeId", "data-v-9385c088"]]), dx = { class: "card-body" }, ux = {
  key: 0,
  class: "guardrails-daily-section"
}, hx = { class: "w-full min-w-0" }, fx = { class: "font-medium" }, gx = { class: "font-semibold" }, mx = { class: "type-badges-row" }, px = { class: "guardrails-kpis grid grid-cols-2 gap-3 lg:grid-cols-4" }, bx = {
  key: 1,
  class: "empty-state"
}, vx = /* @__PURE__ */ fe({
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
    const n = e, o = a, s = (p) => {
      o("export", p);
    }, { isDark: i } = Me($e(n, "theme")), l = $(
      () => n.data?.items && n.data.items.length > 0
    ), r = $(
      () => (n.data?.items || []).reduce((p, y) => p + y.count, 0)
    ), c = (p) => {
      const y = {};
      for (const w of n.data?.items || [])
        y[w[p]] = (y[w[p]] || 0) + w.count;
      const k = Object.entries(y).sort((w, C) => C[1] - w[1]);
      if (k.length === 0) return { name: "—", pct: 0 };
      const _ = r.value;
      return {
        name: k[0][0],
        pct: _ > 0 ? Math.round(k[0][1] / _ * 100) : 0
      };
    }, u = $(() => c("guardrail_type")), f = $(() => c("guardrail_action")), g = $(() => c("guardrail_source")), b = $(() => {
      const p = {};
      for (const y of n.data?.items || [])
        p[y.date] || (p[y.date] = {}), p[y.date][y.guardrail_type] = (p[y.date][y.guardrail_type] || 0) + y.count;
      return Object.entries(p).map(([y, k]) => ({
        date: y,
        total: Object.values(k).reduce((_, w) => _ + w, 0),
        types: Object.entries(k).map(([_, w]) => ({ type: _, count: w })).sort((_, w) => w.count - _.count)
      })).sort((y, k) => new Date(y.date).getTime() - new Date(k.date).getTime());
    }), m = [
      { key: "date", label: "Date", align: "center" },
      { key: "count", label: "Count", align: "center" },
      { key: "types", label: "Types", align: "left" }
    ], v = $(
      () => b.value.map((p) => ({
        id: p.date,
        date: p.date,
        total: p.total,
        types: p.types
      }))
    );
    return t({ isDark: i }), (p, y) => (h(), ee(Se, {
      class: "guardrails-root h-full min-h-0",
      title: "Guardrails Metrics",
      subtitle: "Content safety guardrail events and actions",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !n.loading ? (h(), ee(L(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", dx, [
          l.value ? (h(), x(he, { key: 0 }, [
            b.value.length > 0 ? (h(), x("section", ux, [
              d("div", hx, [
                z(ut, {
                  columns: m,
                  rows: v.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-date": O(({ row: k }) => [
                    d("span", fx, A(L(Ne)(String(k.date)).format("MMM DD")), 1)
                  ]),
                  "cell-count": O(({ row: k }) => [
                    d("span", gx, A(L(ge)(k.total)), 1)
                  ]),
                  "cell-types": O(({ row: k }) => [
                    d("div", mx, [
                      (h(!0), x(he, null, pe(k.types, (_) => (h(), x("span", {
                        key: _.type,
                        class: "type-count-badge"
                      }, A(_.type) + " (" + A(_.count) + ") ", 1))), 128))
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : F("", !0),
            d("section", px, [
              z(ve, {
                title: "Total Events",
                value: L(ge)(r.value)
              }, null, 8, ["value"]),
              z(ve, {
                title: "Top type",
                value: u.value.name,
                subvalue: u.value.pct > 0 ? `(${u.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              z(ve, {
                title: "Top action",
                value: f.value.name,
                subvalue: f.value.pct > 0 ? `(${f.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              z(ve, {
                title: "Top source",
                value: g.value.name,
                subvalue: g.value.pct > 0 ? `(${g.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"])
            ])
          ], 64)) : (h(), x("section", bx, [...y[0] || (y[0] = [
            d("div", { class: "empty-state-content" }, [
              d("div", { class: "empty-icon-wrapper" }, [
                d("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  })
                ])
              ]),
              d("p", { class: "empty-title" }, "No guardrail events"),
              d("p", { class: "empty-description" }, "No content safety events found for the selected period. This is a good sign!")
            ], -1)
          ])]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), yx = /* @__PURE__ */ be(vx, [["__scopeId", "data-v-c042ede0"]]), xx = { class: "card-body" }, kx = { class: "chart-section" }, _x = { class: "chart-wrapper" }, wx = {
  key: 1,
  class: "empty-chart"
}, Cx = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5" }, $x = {
  key: 0,
  class: "dn-failure-section"
}, Sx = { class: "w-full min-w-0" }, Mx = { class: "failure-reason" }, Dx = { class: "failure-count" }, Ax = { class: "impact-bar-container" }, Tx = { class: "impact-label" }, Bx = { class: "dn-trend-health-block flex flex-col gap-0" }, Lx = {
  key: 0,
  class: "chart-section dn-trend-chart-section"
}, Rx = { class: "dn-trend-chart-area min-h-[280px] w-full min-w-0 flex-1" }, Ix = { class: "system-health" }, Px = { class: "system-health-content" }, Ex = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4" }, Ox = {
  key: 1,
  class: "empty-state"
}, Fx = /* @__PURE__ */ fe({
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
    const n = e, o = a, s = (C) => {
      o("export", C);
    }, { isDark: i, colors: l } = Me($e(n, "theme")), r = $(() => {
      const C = n.data?.documentCounts?.items || [], M = n.data?.processingCounts?.items || [];
      return C.length > 0 || M.length > 0;
    }), c = $(() => {
      const C = n.data?.documentCounts?.items || [];
      return {
        processing_started: C.reduce((M, S) => M + S.processing_started, 0),
        processing_completed: C.reduce((M, S) => M + S.processing_completed, 0),
        processing_failed: C.reduce((M, S) => M + S.processing_failed, 0),
        row_count_total: C.reduce((M, S) => M + S.row_count_total, 0)
      };
    }), u = $(() => {
      const C = n.data?.processingCounts?.items || [];
      return {
        processing_started: C.reduce((M, S) => M + S.processing_started, 0),
        processing_success: C.reduce((M, S) => M + S.processing_success, 0),
        notification_sent: C.reduce((M, S) => M + S.notification_sent, 0),
        notification_failed: C.reduce((M, S) => M + S.notification_failed, 0),
        dq_phone: C.reduce((M, S) => M + S.dq_error_phone_not_found, 0),
        dq_flight: C.reduce((M, S) => M + S.dq_error_flight_not_found, 0),
        dq_booking: C.reduce((M, S) => M + S.dq_error_booking_not_found, 0),
        dq_other: C.reduce((M, S) => M + S.dq_error_other, 0),
        totalDqErrors: C.reduce(
          (M, S) => M + S.dq_error_phone_not_found + S.dq_error_flight_not_found + S.dq_error_booking_not_found + S.dq_error_other,
          0
        )
      };
    }), f = $(
      () => c.value.row_count_total || u.value.processing_started
    ), g = $(
      () => Math.max(0, f.value - u.value.notification_sent)
    ), b = (C, M) => M ? `${Math.round(C / M * 100)}%` : "0%", m = $(() => {
      const C = [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Flight not found", count: u.value.dq_flight },
        {
          reason: "Notification failed",
          count: u.value.notification_failed
        },
        { reason: "Other", count: u.value.dq_other }
      ].filter((M) => M.count > 0).sort((M, S) => S.count - M.count);
      return C.length > 0 ? C[0] : { reason: "None", count: 0 };
    }), v = $(() => {
      const C = f.value;
      return [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Phone not found", count: u.value.dq_phone },
        {
          reason: "Notification failed",
          count: u.value.notification_failed
        },
        { reason: "Other", count: u.value.dq_other }
      ].map((M) => ({
        ...M,
        impactPct: C > 0 ? Math.round(M.count / C * 100) : 0
      }));
    }), p = [
      { key: "reason", label: "Reason", align: "left" },
      { key: "count", label: "Count", align: "center" },
      { key: "impact", label: "Impact", align: "center" }
    ], y = $(
      () => v.value.map((C) => ({
        id: C.reason,
        reason: C.reason,
        count: C.count,
        impactPct: C.impactPct
      }))
    ), k = $(() => {
      const C = f.value, M = u.value.processing_success, S = Math.max(0, M - u.value.totalDqErrors), I = u.value.notification_sent, V = Math.max(0, C - M), H = u.value.totalDqErrors, D = Math.max(0, S - I), T = (W, J) => ke(W, J), B = [
        { name: "Records Detected", status: "success" },
        { name: "Valid Reservations", status: "success" },
        { name: "Invalid / Unprocessed", status: "error" },
        { name: "Contactable", status: "success" },
        { name: "Data Quality Issues", status: "error" },
        { name: "Notified", status: "success" },
        { name: "Not Delivered", status: "abandon" }
      ], j = [];
      return M > 0 && j.push({
        source: "Records Detected",
        target: "Valid Reservations",
        value: M,
        label: T(M, C)
      }), V > 0 && j.push({
        source: "Records Detected",
        target: "Invalid / Unprocessed",
        value: V,
        label: T(V, C)
      }), S > 0 && j.push({
        source: "Valid Reservations",
        target: "Contactable",
        value: S,
        label: T(S, C)
      }), H > 0 && j.push({
        source: "Valid Reservations",
        target: "Data Quality Issues",
        value: H,
        label: T(H, C)
      }), I > 0 && j.push({
        source: "Contactable",
        target: "Notified",
        value: I,
        label: T(I, C)
      }), D > 0 && j.push({
        source: "Contactable",
        target: "Not Delivered",
        value: D,
        label: T(D, C)
      }), { nodes: B, links: j };
    }), _ = $(() => {
      const C = [...n.data?.processingCounts?.items || []].sort(
        (T, B) => new Date(T.date).getTime() - new Date(B.date).getTime()
      ), M = n.data?.documentCounts?.items || [], S = {};
      for (const T of M)
        S[T.date] = (S[T.date] || 0) + T.row_count_total;
      const I = [
        .../* @__PURE__ */ new Set([
          ...C.map((T) => T.date),
          ...M.map((T) => T.date)
        ])
      ].sort(), V = I.map((T) => Ne(T).format("MMM DD")), H = I.map((T) => {
        const B = C.find((J) => J.date === T), j = B?.notification_sent || 0, W = S[T] || B?.processing_started || 0;
        return W > 0 ? Math.round(j / W * 100) : 0;
      }), D = I.map((T) => C.find((j) => j.date === T)?.notification_sent || 0);
      return {
        labels: V,
        datasets: [
          {
            label: "Success Rate (%)",
            data: H,
            borderColor: "#8b5cf6",
            yAxisID: "y"
          },
          {
            label: "Notifications Sent",
            data: D,
            borderColor: "#10b981",
            yAxisID: "y1"
          }
        ]
      };
    }), w = $(() => ({
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
            label: (C) => C.datasetIndex === 0 ? ` Success Rate: ${C.raw}%` : ` Notifications: ${C.raw}`
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
            callback: (C) => `${C}%`
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
    return t({ isDark: i }), (C, M) => (h(), ee(Se, {
      class: "dn-metrics-root h-full min-h-0",
      title: "Disruption Notifier",
      subtitle: "Passenger notification effectiveness and delivery analysis",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: M[0] || (M[0] = (S) => o("open"))
    }, {
      headerExport: O(() => [
        e.enableExport && !n.loading ? (h(), ee(L(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", xx, [
          r.value ? (h(), x(he, { key: 0 }, [
            d("section", kx, [
              M[2] || (M[2] = d("div", { class: "chart-header" }, [
                d("h4", { class: "section-title" }, "Passenger Disruption Funnel")
              ], -1)),
              d("div", _x, [
                k.value.nodes.length > 0 && k.value.links.length > 0 ? (h(), ee(Yt, {
                  key: 0,
                  data: k.value,
                  height: "350px",
                  "use-gradient": !1,
                  "node-gap": 16
                }, null, 8, ["data"])) : (h(), x("div", wx, [...M[1] || (M[1] = [
                  d("p", { class: "empty-chart-text" }, " No processing data available for visualization ", -1)
                ])]))
              ])
            ]),
            d("div", Cx, [
              z(ve, {
                color: "#3b82f6",
                title: "Total Records",
                value: L(ge)(c.value.row_count_total)
              }, null, 8, ["value"]),
              z(ve, {
                color: "#8b5cf6",
                title: "Passengers Affected",
                value: L(ge)(f.value)
              }, null, 8, ["value"]),
              z(ve, {
                color: "#10b981",
                title: "Successfully Notified",
                value: L(ge)(u.value.notification_sent),
                subvalue: b(u.value.notification_sent, f.value)
              }, null, 8, ["value", "subvalue"]),
              z(ve, {
                color: "#ef4444",
                title: "Not Notified",
                value: L(ge)(g.value),
                subvalue: b(g.value, f.value)
              }, null, 8, ["value", "subvalue"]),
              z(ve, {
                color: "#f59e0b",
                title: "Main Failure Reason",
                value: m.value.reason,
                subvalue: m.value.count > 0 ? `${L(ge)(m.value.count)} cases` : void 0
              }, null, 8, ["value", "subvalue"])
            ]),
            v.value.length > 0 ? (h(), x("section", $x, [
              M[3] || (M[3] = d("div", { class: "section-header" }, [
                d("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
              ], -1)),
              d("div", Sx, [
                z(ut, {
                  columns: p,
                  rows: y.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-reason": O(({ row: S }) => [
                    d("span", Mx, A(S.reason), 1)
                  ]),
                  "cell-count": O(({ row: S }) => [
                    d("span", Dx, A(L(ge)(S.count)), 1)
                  ]),
                  "cell-impact": O(({ row: S }) => [
                    d("div", Ax, [
                      d("div", {
                        class: "impact-bar",
                        style: Ce({ width: S.impactPct + "%" })
                      }, null, 4),
                      d("span", Tx, A(S.impactPct) + "%", 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : F("", !0),
            d("div", Bx, [
              _.value.labels.length > 0 ? (h(), x("section", Lx, [
                M[4] || (M[4] = d("div", { class: "chart-header" }, [
                  d("h4", { class: "section-title" }, "Notification Success Rate by Day")
                ], -1)),
                d("div", Rx, [
                  z(pt, {
                    data: _.value,
                    options: w.value,
                    theme: n.theme
                  }, null, 8, ["data", "options", "theme"])
                ])
              ])) : F("", !0),
              d("details", Ix, [
                M[5] || (M[5] = d("summary", { class: "system-health-toggle" }, [
                  d("svg", {
                    class: "toggle-icon",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    d("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    }),
                    d("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    })
                  ]),
                  Ae(" System Health Details ")
                ], -1)),
                d("div", Px, [
                  d("div", Ex, [
                    z(ve, {
                      title: "Docs Started",
                      value: L(ge)(c.value.processing_started)
                    }, null, 8, ["value"]),
                    z(ve, {
                      title: "Docs Completed",
                      value: L(ge)(c.value.processing_completed)
                    }, null, 8, ["value"]),
                    z(ve, {
                      title: "Docs Failed",
                      value: L(ge)(c.value.processing_failed)
                    }, null, 8, ["value"]),
                    z(ve, {
                      title: "Processing Started",
                      value: L(ge)(u.value.processing_started)
                    }, null, 8, ["value"]),
                    z(ve, {
                      title: "Processing Success",
                      value: L(ge)(u.value.processing_success)
                    }, null, 8, ["value"]),
                    z(ve, {
                      title: "Notification Failed",
                      value: L(ge)(u.value.notification_failed)
                    }, null, 8, ["value"])
                  ])
                ])
              ])
            ])
          ], 64)) : (h(), x("section", Ox, [...M[6] || (M[6] = [
            d("div", { class: "empty-state-content" }, [
              d("div", { class: "empty-icon-wrapper" }, [
                d("svg", {
                  class: "empty-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  })
                ])
              ]),
              d("p", { class: "empty-title" }, "No disruption notifier data"),
              d("p", { class: "empty-description" }, " No disruption notification data found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Vx = /* @__PURE__ */ be(Fx, [["__scopeId", "data-v-2342d485"]]), Nx = "Total number of conversations initiated during the selected period.", zx = /* @__PURE__ */ fe({
  __name: "TotalConversationsCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    tooltip: { default: Nx }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = $(() => ge(a.totalConversations)), s = $(() => L(n.value?.isDark) ?? !1), i = $(() => L(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (h(), ee(tt, {
      label: "Total Conversations",
      value: o.value,
      tooltip: e.tooltip,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.totalConversations,
      "previous-value": e.previousTotalConversations,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: O(() => [...r[0] || (r[0] = [
        d("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5"
        }, [
          d("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
          })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "tooltip", "loading", "theme", "current-value", "previous-value"]));
  }
}), jx = "Score of the top 5% most satisfied customers. If it drops, it serves as an alert that the remaining 95% are receiving worse service and overall quality is declining.", Hx = /* @__PURE__ */ fe({
  __name: "CsatP95Card",
  props: {
    csatP95: { default: 0 },
    previousCsatP95: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    tooltip: { default: jx }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = $(() => `${a.csatP95.toFixed(1)}`), s = $(() => L(n.value?.isDark) ?? !1), i = $(() => L(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (h(), ee(tt, {
      label: "CSAT P95",
      value: o.value,
      tooltip: e.tooltip,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.csatP95,
      "previous-value": e.previousCsatP95,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: O(() => [...r[0] || (r[0] = [
        d("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5"
        }, [
          d("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321 1.01l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.41a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-1.01l5.518-.442a.563.563 0 00.475-.345l2.125-5.11z"
          })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "tooltip", "loading", "theme", "current-value", "previous-value"]));
  }
}), Wx = /* @__PURE__ */ fe({
  __name: "CsatPulseCard",
  props: {
    csatPulse: { default: 0 },
    previousCsatPulse: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = $(() => `${a.csatPulse.toFixed(1)}%`), s = $(() => L(n.value?.isDark) ?? !1), i = $(() => L(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (h(), ee(tt, {
      label: "CSAT Pulse",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.csatPulse,
      "previous-value": e.previousCsatPulse,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: O(() => [...r[0] || (r[0] = [
        d("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5"
        }, [
          d("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M3 12h3l2-6 4 12 3-8 2 2h4"
          })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "loading", "theme", "current-value", "previous-value"]));
  }
}), Kx = {
  key: 0,
  class: "card-body"
}, Ux = { class: "chart-wrapper" }, Yx = { class: "overview-card-infos mt-4 flex w-full flex-col gap-3 sm:flex-row sm:gap-4" }, qx = {
  key: 1,
  class: "empty-state"
}, Xx = 520, Gx = 300, Zx = 40, Qx = 48, Jx = 48, ek = {
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
    const n = a, o = (r) => {
      n("export", r);
    }, s = e, { isDark: i } = Me($e(s, "theme")), l = $(() => s.data);
    return t({ isDark: i }), (r, c) => (h(), ee(Se, {
      class: "nps-overview-root min-h-0",
      title: "CSAT Overview Metrics",
      subtitle: "Overall CSAT Distribution",
      collapsible: !1,
      loading: s.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !s.loading ? (h(), ee(L(ze), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        l.value && l.value.total_nps_responses > 0 ? (h(), x("div", Kx, [
          d("div", Ux, [
            z(kl, {
              histogram: l.value.histogram || [],
              "min-score": l.value.min_score || 0,
              "max-score": l.value.max_score || 0,
              "q1-score": l.value.q1_score || 0,
              "median-score": l.value.median_score || 0,
              "q3-score": l.value.q3_score || 0,
              "average-score": l.value.average_score || 0,
              "chart-width": Xx,
              "chart-height": Gx,
              "chart-margin": Zx,
              "chart-margin-right": Qx,
              "chart-bottom-margin": Jx,
              "plot-inset": 10,
              "show-legend": !1,
              "show-stat-labels": !1
            }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score"])
          ]),
          d("div", Yx, [
            z(ve, {
              class: "min-w-0 flex-1",
              title: "Responses",
              value: String(l.value.total_nps_responses)
            }, null, 8, ["value"]),
            l.value.p95_score > 0 ? (h(), ee(ve, {
              key: 0,
              class: "min-w-0 flex-1",
              title: "Percentile 95",
              value: String(l.value.p95_score)
            }, null, 8, ["value"])) : F("", !0)
          ])
        ])) : (h(), x("div", qx, [...c[0] || (c[0] = [
          d("div", { class: "empty-state-content" }, [
            d("div", { class: "empty-icon-wrapper" }, [
              d("svg", {
                class: "empty-icon",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
              }, [
                d("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                })
              ])
            ]),
            d("p", { class: "empty-title" }, "No NPS data available"),
            d("p", { class: "empty-description" }, " No NPS data found for the selected period. Try adjusting the date range. ")
          ], -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}, Ll = /* @__PURE__ */ be(ek, [["__scopeId", "data-v-e98fe9b2"]]), tk = {
  key: 0,
  class: "card-body"
}, ak = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, nk = {
  key: 1,
  class: "empty-state"
}, ok = {
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
    }, o = e, s = $(() => o.data?.csat_p95_by_day || []), i = $(() => s.value.length > 0), l = $(() => ({
      labels: s.value.map((c) => Ne(c.date).format("DD-MM-YYYY")),
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
    })), r = {
      scales: {
        y: {
          min: 0,
          max: 10,
          grace: 1,
          ticks: {
            stepSize: 1,
            callback: (c) => {
              const u = Number(c);
              return !Number.isInteger(u) || u < 0 || u > 10 ? "" : String(u);
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
    return (c, u) => (h(), ee(Se, {
      class: "nps-daily-root min-h-0",
      title: "CSAT P95",
      subtitle: "Daily P95 trend for CSAT responses",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !o.loading ? (h(), ee(L(ze), {
          key: 0,
          variant: "inline",
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        i.value ? (h(), x("div", tk, [
          d("div", ak, [
            z(pt, {
              data: l.value,
              options: r,
              "uppercase-legend-labels": !0
            }, null, 8, ["data"])
          ])
        ])) : (h(), x("div", nk, [...u[0] || (u[0] = [
          d("p", { class: "empty-title" }, "No daily CSAT P95 available", -1),
          d("p", { class: "empty-description" }, " No CSAT P95 points were found for the selected date range. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}, Rl = /* @__PURE__ */ be(ok, [["__scopeId", "data-v-5207cfa7"]]), sk = {
  key: 0,
  class: "card-body"
}, ik = {
  key: 1,
  class: "empty-state"
}, lk = /* @__PURE__ */ fe({
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
    const t = e, a = $(
      () => t.data?.resolution_breakdown || []
    ), n = $(
      () => a.value.some((i) => Number(i.count || 0) > 0)
    ), o = $(() => {
      const i = a.value;
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
    return (i, l) => (h(), ee(Se, {
      class: "nps-resolution-root min-h-0",
      title: "CSAT Resolution",
      subtitle: "Resolution answers distribution (1=Si, 2=No)",
      collapsible: !1,
      loading: t.loading
    }, {
      default: O(() => [
        n.value ? (h(), x("div", sk, [
          z($t, {
            data: o.value,
            options: s,
            "uppercase-legend-labels": !0
          }, null, 8, ["data"])
        ])) : (h(), x("div", ik, [...l[0] || (l[0] = [
          d("p", { class: "empty-title" }, "No resolution answers available", -1),
          d("p", { class: "empty-description" }, " This airline has the resolution survey configured, but no responses were found for the selected dates. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), rk = /* @__PURE__ */ be(lk, [["__scopeId", "data-v-6849ef24"]]), ck = {
  key: 0,
  class: "card-body"
}, dk = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, uk = {
  key: 1,
  class: "empty-state"
}, hk = /* @__PURE__ */ fe({
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
    }, o = e, s = $(() => o.data?.csat_pulse_by_day || []), i = $(() => s.value.length > 0), l = $(() => ({
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
    })), r = {
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
    return (c, u) => (h(), ee(Se, {
      class: "nps-pulse-root min-h-0",
      title: "CSAT Pulse",
      subtitle: "Weighted index: Σ(frequency × weight) / total surveys × 100",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !o.loading ? (h(), ee(L(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: n
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        i.value ? (h(), x("div", ck, [
          d("div", dk, [
            z(pt, {
              data: l.value,
              options: r,
              "uppercase-legend-labels": !0
            }, null, 8, ["data"])
          ])
        ])) : (h(), x("div", uk, [...u[0] || (u[0] = [
          d("p", { class: "empty-title" }, "No CSAT Pulse data available", -1),
          d("p", { class: "empty-description" }, " No CSAT pulse points were found for the selected date range. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), fk = /* @__PURE__ */ be(hk, [["__scopeId", "data-v-72955d9a"]]), gk = { class: "nps-metrics-container flex flex-col gap-6 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, mk = { class: "grid w-full grid-cols-1 items-start gap-6 md:grid-cols-2" }, Il = {
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
    const a = t, n = (u) => {
      a("export", u);
    }, o = e, s = $(() => o.showResolutionChart), i = $(() => o.showCsatPulseChart), l = $(
      () => (s.value ? 1 : 0) + (i.value ? 1 : 0)
    ), r = $(() => l.value > 0), c = $(
      () => l.value > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
    );
    return (u, f) => (h(), x("div", gk, [
      d("div", mk, [
        z(Ll, {
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: n
        }, null, 8, ["data", "loading", "enable-export"]),
        z(Rl, {
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: n
        }, null, 8, ["data", "loading", "enable-export"])
      ]),
      r.value ? (h(), x("div", {
        key: 0,
        class: Z(["grid w-full items-start gap-6", c.value])
      }, [
        s.value ? (h(), ee(rk, {
          key: 0,
          class: "min-w-0",
          data: e.data,
          loading: e.loading
        }, null, 8, ["data", "loading"])) : F("", !0),
        i.value ? (h(), ee(fk, {
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
}, pk = { class: "csat-container__body" }, bk = /* @__PURE__ */ fe({
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
    return (o, s) => (h(), ee(Se, {
      class: "csat-container-root w-full",
      title: "CSAT",
      subtitle: "Customer satisfaction score distribution and daily trend metrics.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: s[0] || (s[0] = (i) => a("open"))
    }, {
      default: O(() => [
        d("div", pk, [
          z(Il, {
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
}), vk = /* @__PURE__ */ be(bk, [["__scopeId", "data-v-37178ba1"]]), yk = "Sum of all sales made across all flows (check-in, seller, ancillaries, booking manager, disruptions) in all currencies, converted to the selected currency.", xk = /* @__PURE__ */ fe({
  __name: "AiGeneratedRevenueCard",
  props: {
    totalRevenue: { default: 0 },
    previousTotalRevenue: { default: null },
    currencyCode: { default: "USD" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    tooltip: { default: yk }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = $(() => Xt(a.totalRevenue)), s = $(() => L(n.value?.isDark) ?? !1), i = $(() => L(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (h(), ee(tt, {
      label: "AI Revenue",
      value: o.value,
      prefix: e.currencyCode,
      "value-size": "large",
      tooltip: e.tooltip,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.totalRevenue,
      "previous-value": e.previousTotalRevenue,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: O(() => [...r[0] || (r[0] = [
        d("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.75",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          d("path", { d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" }),
          d("path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" }),
          d("path", { d: "M12 18V6" })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "prefix", "tooltip", "loading", "theme", "current-value", "previous-value"]));
  }
}), kk = { class: "flex justify-end" }, _k = { class: "w-52" }, wk = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Ck = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, $k = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Sk = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Mk = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Dk = /* @__PURE__ */ fe({
  __name: "AiGeneratedChart",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    breakdownBy: { default: "all" },
    theme: { default: void 0 }
  },
  emits: ["changeBreakdown"],
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, s = $e(n, "theme"), { isDark: i, colors: l } = Me(s), r = ne(n.breakdownBy), c = $(() => n.data?.currency ?? "USD"), u = [
      { value: "all", label: "All" },
      { value: "payment_method", label: "Payment Method" },
      { value: "agent_type", label: "Agent" },
      { value: "channel", label: "Channel" },
      { value: "channel_and_agent", label: "Channel & Agent" }
    ], f = $(() => {
      const T = {
        payment_method: "Payment Method",
        agent_type: "Agent",
        channel: "Channel",
        channel_and_agent: "Channel & Agent"
      }[r.value];
      return T ? `AI Generated Revenue by ${T}` : "AI Generated Revenue";
    }), g = $(() => r.value === "payment_method"), b = [
      "#8b5cf6",
      "#34d399",
      "#f59e0b",
      "#60a5fa",
      "#f472b6",
      "#fb923c",
      "#4ade80",
      "#e879f9"
    ], m = (D) => b[D % b.length], v = (D) => {
      if (!D) return "0";
      const T = Math.abs(D);
      return T >= 1e6 ? (D / 1e6).toFixed(2) + "M" : T >= 1e5 ? (D / 1e3).toFixed(1) + "K" : Math.round(D).toLocaleString();
    }, p = (D) => !D || D === "unknown" ? "Unknown" : kt(D).split(/[_|]/).map((T) => T ? T.charAt(0).toUpperCase() + T.slice(1) : "").join(" "), y = ne({
      labels: [],
      datasets: []
    }), k = ne([]), _ = $(() => {
      const D = Math.min(k.value.length, 5);
      if (!(D <= 0))
        return { gridTemplateColumns: `repeat(${D}, minmax(0, 1fr))` };
    }), w = (D) => {
      const T = D?.ai_revenue_by_day ?? [], B = D?.breakdown ?? [];
      if (!T.length) {
        y.value = { labels: [], datasets: [] }, k.value = [];
        return;
      }
      const j = [...T].sort((q, oe) => q.date.localeCompare(oe.date)), W = j.map((q) => Ne(q.date).format("MMM DD")), J = "ai_revenue";
      if (r.value === "all") {
        y.value = {
          labels: W,
          datasets: [
            {
              label: `Revenue (${c.value})`,
              data: j.map((q) => Number(q[J] ?? 0)),
              borderColor: b[0],
              backgroundColor: "transparent",
              fill: !1,
              tension: 0.35
            }
          ]
        }, k.value = [];
        return;
      }
      const ue = B.slice(0, 7).map((q) => q.key).map((q, oe) => {
        const R = m(oe), K = j.map((Y) => {
          const N = (Y.breakdown ?? {})[q];
          return N ? Number(N[J] ?? 0) : 0;
        });
        return g.value ? {
          label: p(q),
          data: K,
          backgroundColor: R,
          borderColor: R,
          borderWidth: 1,
          borderRadius: 3
        } : {
          label: p(q),
          data: K,
          borderColor: R,
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35
        };
      });
      y.value = { labels: W, datasets: ue }, k.value = B.slice(0, 5).map((q, oe) => ({
        key: q.key,
        label: p(q.key),
        amount: `${c.value} ${v(q.total)}`,
        percentage: Number(q.percentage ?? 0),
        color: m(oe)
      }));
    }, C = $(() => ({
      callback: (D) => `${c.value} ${v(Number(D))}`,
      color: l.value.textSecondary,
      padding: 8
    })), M = $(() => ({
      border: { display: !1 },
      grid: { color: l.value.gridLines, lineWidth: 1, drawTicks: !1 },
      ticks: { color: l.value.textSecondary, padding: 8 }
    })), S = $(() => ({
      beginAtZero: !0,
      border: { display: !1 },
      grid: { color: l.value.gridLines, lineWidth: 1, drawTicks: !1 },
      ticks: C.value
    })), I = $(() => ({
      scales: {
        x: M.value,
        y: S.value
      }
    })), V = $(() => ({
      scales: {
        x: { ...M.value, stacked: !0 },
        y: { ...S.value, stacked: !0 }
      }
    }));
    Le(
      () => n.data,
      (D) => w(D ?? null),
      { deep: !0, immediate: !0 }
    ), Le(
      () => n.breakdownBy,
      (D) => {
        r.value = D, w(n.data ?? null);
      }
    );
    const H = (D) => {
      r.value = String(D), o("changeBreakdown", r.value);
    };
    return t({ isDark: i }), (D, T) => (h(), ee(Se, {
      class: "w-full min-h-0 self-start",
      title: f.value,
      subtitle: "Revenue generated by AI agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerAside: O(() => [
        d("div", kk, [
          d("div", _k, [
            z(Et, {
              "model-value": r.value,
              options: u,
              "onUpdate:modelValue": H
            }, null, 8, ["model-value"])
          ])
        ])
      ]),
      default: O(() => [
        d("div", {
          class: Z(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", n.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          z(ct, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: O(() => [
              n.loading ? (h(), x("div", wk, [...T[0] || (T[0] = [
                d("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (h(), x("div", Ck, [
                y.value.labels && y.value.labels.length && y.value.datasets.length ? (h(), x("section", $k, [
                  d("div", Sk, [
                    g.value ? (h(), ee($t, {
                      key: 0,
                      data: y.value,
                      options: V.value,
                      theme: s.value
                    }, null, 8, ["data", "options", "theme"])) : (h(), ee(pt, {
                      key: 1,
                      data: y.value,
                      options: I.value,
                      theme: s.value
                    }, null, 8, ["data", "options", "theme"]))
                  ]),
                  k.value.length ? (h(), x("div", {
                    key: 0,
                    class: "grid w-full gap-3 md:gap-4",
                    style: Ce(_.value)
                  }, [
                    (h(!0), x(he, null, pe(k.value, (B) => (h(), ee(ve, {
                      key: `card-${B.key}`,
                      class: "min-w-0",
                      color: B.color,
                      title: B.label,
                      value: B.amount,
                      subvalue: `${B.percentage.toFixed(1)}%`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ], 4)) : F("", !0)
                ])) : (h(), x("section", Mk, [...T[1] || (T[1] = [
                  d("div", { class: "max-w-[360px] px-4 text-center" }, [
                    d("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No revenue data available "),
                    d("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No AI revenue found for the selected period. Try adjusting the date range. ")
                  ], -1)
                ])]))
              ]))
            ]),
            _: 1
          })
        ], 2)
      ]),
      _: 1
    }, 8, ["title", "loading"]));
  }
}), Ak = /* @__PURE__ */ be(Dk, [["__scopeId", "data-v-4f72028b"]]), Tk = { class: "flex justify-end" }, Bk = { class: "w-52" }, Lk = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Rk = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, Ik = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Pk = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Ek = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Ok = /* @__PURE__ */ fe({
  __name: "TransactionsChart",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    breakdownBy: { default: "all" },
    theme: { default: void 0 }
  },
  emits: ["changeBreakdown"],
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, s = $e(n, "theme"), { isDark: i, colors: l } = Me(s), r = ne(n.breakdownBy), c = [
      { value: "all", label: "All" },
      { value: "payment_method", label: "Payment Method" },
      { value: "agent_type", label: "Agent" },
      { value: "channel", label: "Channel" },
      { value: "channel_and_agent", label: "Channel & Agent" }
    ], u = $(() => {
      const T = {
        payment_method: "Payment Method",
        agent_type: "Agent",
        channel: "Channel",
        channel_and_agent: "Channel & Agent"
      }[r.value];
      return T ? `Transactions by ${T}` : "Transactions";
    }), f = $(() => r.value === "payment_method"), g = [
      "#8b5cf6",
      "#34d399",
      "#f59e0b",
      "#60a5fa",
      "#f472b6",
      "#fb923c",
      "#4ade80",
      "#e879f9"
    ], b = (D) => g[D % g.length], m = (D) => {
      if (!D) return "0";
      const T = Math.abs(D);
      return T >= 1e6 ? (D / 1e6).toFixed(2) + "M" : T >= 1e5 ? (D / 1e3).toFixed(1) + "K" : Math.round(D).toLocaleString();
    }, v = (D) => !D || D === "unknown" ? "Unknown" : kt(D).split(/[_|]/).map((T) => T ? T.charAt(0).toUpperCase() + T.slice(1) : "").join(" "), p = ne({
      labels: [],
      datasets: []
    }), y = ne([]), k = $(() => {
      const D = Math.min(y.value.length, 5);
      if (!(D <= 0))
        return { gridTemplateColumns: `repeat(${D}, minmax(0, 1fr))` };
    }), _ = (D) => Object.values(D ?? {}).reduce((T, B) => T + Number(B ?? 0), 0), w = (D) => {
      const T = D?.breakdown ?? [];
      if (r.value === "all") {
        const ue = D?.sales_by_channel_by_day ?? [];
        if (!ue.length) {
          p.value = { labels: [], datasets: [] }, y.value = [];
          return;
        }
        const q = [...ue].sort((oe, R) => oe.date.localeCompare(R.date));
        p.value = {
          labels: q.map((oe) => Ne(oe.date).format("MMM DD")),
          datasets: [
            {
              label: "Transactions",
              data: q.map((oe) => _(oe.channels)),
              borderColor: g[0],
              backgroundColor: "transparent",
              fill: !1,
              tension: 0.35
            }
          ]
        }, y.value = [];
        return;
      }
      const B = D?.transactions_by_day ?? [];
      if (!B.length) {
        p.value = { labels: [], datasets: [] }, y.value = [];
        return;
      }
      const j = [...B].sort((ue, q) => ue.date.localeCompare(q.date)), W = j.map((ue) => Ne(ue.date).format("MMM DD")), re = T.slice(0, 7).map((ue) => ue.key).map((ue, q) => {
        const oe = b(q), R = j.map((K) => Number((K.breakdown ?? {})[ue] ?? 0));
        return f.value ? {
          label: v(ue),
          data: R,
          backgroundColor: oe,
          borderColor: oe,
          borderWidth: 1,
          borderRadius: 3
        } : {
          label: v(ue),
          data: R,
          borderColor: oe,
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35
        };
      });
      p.value = { labels: W, datasets: re }, y.value = T.slice(0, 5).map((ue, q) => ({
        key: ue.key,
        label: v(ue.key),
        amount: m(ue.count),
        percentage: Number(ue.percentage ?? 0),
        color: b(q)
      }));
    }, C = $(() => ({
      callback: (D) => m(Number(D)),
      color: l.value.textSecondary,
      padding: 8
    })), M = $(() => ({
      border: { display: !1 },
      grid: { color: l.value.gridLines, lineWidth: 1, drawTicks: !1 },
      ticks: { color: l.value.textSecondary, padding: 8 }
    })), S = $(() => ({
      beginAtZero: !0,
      border: { display: !1 },
      grid: { color: l.value.gridLines, lineWidth: 1, drawTicks: !1 },
      ticks: C.value
    })), I = $(() => ({
      scales: {
        x: M.value,
        y: S.value
      }
    })), V = $(() => ({
      scales: {
        x: { ...M.value, stacked: !0 },
        y: { ...S.value, stacked: !0 }
      }
    }));
    Le(
      () => n.data,
      (D) => w(D ?? null),
      { deep: !0, immediate: !0 }
    ), Le(
      () => n.breakdownBy,
      (D) => {
        r.value = D, w(n.data ?? null);
      }
    );
    const H = (D) => {
      r.value = String(D), o("changeBreakdown", r.value);
    };
    return t({ isDark: i }), (D, T) => (h(), ee(Se, {
      class: "w-full min-h-0 self-start",
      title: u.value,
      subtitle: "Number of transactions generated by agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerAside: O(() => [
        d("div", Tk, [
          d("div", Bk, [
            z(Et, {
              "model-value": r.value,
              options: c,
              "onUpdate:modelValue": H
            }, null, 8, ["model-value"])
          ])
        ])
      ]),
      default: O(() => [
        d("div", {
          class: Z(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", n.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          z(ct, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: O(() => [
              n.loading ? (h(), x("div", Lk, [...T[0] || (T[0] = [
                d("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (h(), x("div", Rk, [
                p.value.labels && p.value.labels.length && p.value.datasets.length ? (h(), x("section", Ik, [
                  d("div", Pk, [
                    f.value ? (h(), ee($t, {
                      key: 0,
                      data: p.value,
                      options: V.value,
                      theme: s.value
                    }, null, 8, ["data", "options", "theme"])) : (h(), ee(pt, {
                      key: 1,
                      data: p.value,
                      options: I.value,
                      theme: s.value
                    }, null, 8, ["data", "options", "theme"]))
                  ]),
                  y.value.length ? (h(), x("div", {
                    key: 0,
                    class: "grid w-full gap-3 md:gap-4",
                    style: Ce(k.value)
                  }, [
                    (h(!0), x(he, null, pe(y.value, (B) => (h(), ee(ve, {
                      key: `card-${B.key}`,
                      class: "min-w-0",
                      color: B.color,
                      title: B.label,
                      value: B.amount,
                      subvalue: `${B.percentage.toFixed(1)}%`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ], 4)) : F("", !0)
                ])) : (h(), x("section", Ek, [...T[1] || (T[1] = [
                  d("div", { class: "max-w-[360px] px-4 text-center" }, [
                    d("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No transaction data available "),
                    d("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No transactions found for the selected period. Try adjusting the date range. ")
                  ], -1)
                ])]))
              ]))
            ]),
            _: 1
          })
        ], 2)
      ]),
      _: 1
    }, 8, ["title", "loading"]));
  }
}), Fk = /* @__PURE__ */ be(Ok, [["__scopeId", "data-v-df15ed82"]]), pi = 1, Vk = /* @__PURE__ */ fe({
  __name: "CostCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), { isDark: o } = Me($e(a, "theme")), s = $(() => a.totalConversations * pi), i = $(() => a.previousTotalConversations === null || a.previousTotalConversations === void 0 ? null : a.previousTotalConversations * pi), l = $(() => ge(s.value)), r = $(
      () => i.value !== null && i.value !== void 0
    ), c = $(() => {
      if (!r.value) return 0;
      const g = i.value;
      return g === 0 ? s.value > 0 ? 100 : 0 : (s.value - g) / g * 100;
    }), u = $(() => {
      const g = c.value.toFixed(1);
      return c.value > 0 ? `+${g}%` : `${g}%`;
    }), f = $(() => c.value < 0 ? "change-badge--up" : c.value > 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: o, changePercent: c }), (g, b) => (h(), ee(tt, {
      label: "Cost",
      value: l.value,
      prefix: "USD",
      loading: e.loading,
      theme: e.theme,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: O(() => [...b[0] || (b[0] = [
        d("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          d("path", { d: "M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" })
        ], -1)
      ])]),
      headerAside: O(() => [
        r.value ? (h(), x("div", {
          key: 0,
          class: Z(["change-badge", f.value, { "change-badge--dark": L(o) }])
        }, A(u.value), 3)) : F("", !0)
      ]),
      _: 1
    }, 8, ["value", "loading", "theme"]));
  }
}), Nk = /* @__PURE__ */ be(Vk, [["__scopeId", "data-v-411e0735"]]), zk = { class: "flex justify-end" }, jk = { class: "w-52" }, Hk = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Wk = { class: "w-full shrink-0 flex min-h-0 flex-col" }, Kk = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Uk = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Yk = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, qk = /* @__PURE__ */ fe({
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
    const n = e, o = a, s = (C) => {
      o("export", C);
    }, i = [
      { value: "all", label: "All" },
      { value: "agent", label: "Agent" }
    ], l = $e(n, "theme"), { isDark: r } = Me(l), c = ne(n.breakdownBy || "all"), u = $(() => n.data ?? {
      total_conversations: 0,
      total_escalated_conversations: 0,
      escalation_rate_percentage: 0,
      breakdown_by: "all",
      breakdown_items: [],
      breakdown_by_day: [],
      escalations_by_day: []
    }), f = ne({
      labels: [],
      datasets: []
    }), g = ne([]), b = $(() => {
      const C = g.value.length;
      if (!(C <= 0))
        return { gridTemplateColumns: `repeat(${C}, minmax(0, 1fr))` };
    }), m = ne(
      []
    ), v = [
      "#3b82f6",
      "#f59e0b",
      "#06b6d4",
      "#8b5cf6",
      "#22c55e",
      "#ef4444",
      "#14b8a6"
    ], p = (C) => v[C % v.length], y = {
      scales: {
        y: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 25,
            callback: (C) => `${C}%`
          }
        }
      }
    }, k = (C) => {
      c.value = String(C), o("changeBreakdown", c.value), w(u.value);
    }, _ = (C) => {
      if (!C) return "";
      const S = C.replace(/_/g, " ").trim().replace(/\s+state$/i, "").trim();
      return S ? S.charAt(0).toUpperCase() + S.slice(1) : "";
    }, w = (C) => {
      if (c.value === "all") {
        const T = C?.escalations_by_day ?? [];
        if (!T.length) {
          f.value = { labels: [], datasets: [] }, g.value = [], m.value = [];
          return;
        }
        const B = [...T].sort((j, W) => j.date.localeCompare(W.date));
        f.value = {
          labels: B.map((j) => Ne(j.date).format("MMM DD")),
          datasets: [
            {
              label: "All",
              data: B.map(
                (j) => Number(j.escalation_rate_percentage || 0)
              ),
              borderColor: "#8b5cf6",
              backgroundColor: "transparent",
              fill: !1,
              tension: 0.35
            }
          ]
        }, g.value = [], m.value = [];
        return;
      }
      const M = C?.breakdown_by_day ?? [], S = C?.breakdown_items ?? [];
      if (!M.length) {
        f.value = { labels: [], datasets: [] }, g.value = [], m.value = [];
        return;
      }
      const I = [...M].sort(
        (T, B) => T.date.localeCompare(B.date)
      ), V = S.slice(0, 5).map((T) => T.key), H = I.map((T) => Ne(T.date).format("MMM DD")), D = V.map((T, B) => {
        const j = S.find((W) => W.key === T);
        return {
          label: _(j?.label || T),
          data: I.map((W) => {
            const J = W.items.find((re) => re.key === T);
            return Number(J?.percentage || 0);
          }),
          borderColor: p(B),
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35
        };
      });
      f.value = {
        labels: H,
        datasets: D
      }, g.value = S.slice(0, 5).map((T, B) => ({
        key: T.key,
        label: _(T.label),
        percentage: Number(T.percentage || 0),
        color: p(B)
      })), m.value = S.slice(0, 5).map((T, B) => ({
        key: T.key,
        label: _(T.label),
        color: p(B)
      }));
    };
    return Le(
      () => n.data,
      (C) => {
        w(C ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Le(
      () => n.breakdownBy,
      (C) => {
        c.value = C, w(u.value);
      }
    ), t({ isDark: r }), (C, M) => (h(), ee(Se, {
      class: "w-full min-h-0 self-start",
      title: "Human escalations",
      subtitle: "% of conversations transferred to human agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !e.loading ? (h(), ee(L(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      headerAside: O(() => [
        d("div", zk, [
          d("div", jk, [
            z(Et, {
              "model-value": c.value,
              options: i,
              "onUpdate:modelValue": k
            }, null, 8, ["model-value"])
          ])
        ])
      ]),
      default: O(() => [
        d("div", Hk, [
          d("div", Wk, [
            f.value.labels && f.value.labels.length && f.value.datasets.length ? (h(), x("section", Kk, [
              d("div", Uk, [
                z(pt, {
                  data: f.value,
                  options: y,
                  theme: l.value
                }, null, 8, ["data", "theme"])
              ]),
              g.value.length ? (h(), x("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: Ce(b.value)
              }, [
                (h(!0), x(he, null, pe(g.value, (S) => (h(), ee(ve, {
                  key: `card-${S.key}`,
                  class: "min-w-0",
                  color: S.color,
                  title: S.label,
                  value: `${S.percentage.toFixed(1)}%`
                }, null, 8, ["color", "title", "value"]))), 128))
              ], 4)) : F("", !0)
            ])) : (h(), x("section", Yk, [...M[0] || (M[0] = [
              d("div", { class: "max-w-[360px] px-4 text-center" }, [
                d("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No human escalations data available "),
                d("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No escalation data found for the selected period. Try adjusting the date range. ")
              ], -1)
            ])]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Xk = /* @__PURE__ */ be(qk, [["__scopeId", "data-v-23d909e1"]]), Gk = "Percentage of conversations transferred to a human out of the total initiated conversations.", Zk = /* @__PURE__ */ fe({
  __name: "HumanEscalationsCard",
  props: {
    escalationRatePercentage: { default: 0 },
    previousEscalationRatePercentage: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    tooltip: { default: Gk }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = $(() => `${Number(a.escalationRatePercentage || 0).toFixed(2)}%`), s = $(() => L(n.value?.isDark) ?? !1), i = $(() => L(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (h(), ee(tt, {
      label: "Human Escalations",
      value: o.value,
      tooltip: e.tooltip,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.escalationRatePercentage,
      "previous-value": e.previousEscalationRatePercentage,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: O(() => [...r[0] || (r[0] = [
        d("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5"
        }, [
          d("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M15 7.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          }),
          d("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M4.5 19.5a7.5 7.5 0 0 1 9.36-7.29"
          }),
          d("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "m17.25 15.75 4.5 4.5"
          }),
          d("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "m21.75 15.75-4.5 4.5"
          })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "tooltip", "loading", "theme", "current-value", "previous-value"]));
  }
});
function fo(e) {
  if (e == null || Number.isNaN(e)) return "-";
  const t = Math.max(0, Math.round(e)), a = Math.floor(t / 3600), n = Math.floor(t % 3600 / 60), o = t % 60;
  return a > 0 ? `${a}h ${n}m` : n > 0 ? `${n}m ${o}s` : `${o}s`;
}
const Qk = { class: "flex justify-end" }, Jk = { class: "w-52" }, e_ = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, t_ = { class: "w-full shrink-0 flex min-h-0 flex-col" }, a_ = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, n_ = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, o_ = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, s_ = "#8b5cf6", i_ = "#9ca3af", l_ = "#94a3b8", r_ = /* @__PURE__ */ fe({
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
    const n = e, o = a, s = (q) => {
      o("export", q);
    }, i = [
      { value: "all", label: "All" },
      { value: "agent", label: "Agent" },
      { value: "resolution_mode", label: "Resolution Mode" },
      { value: "channel", label: "Channel" },
      { value: "agent_channel", label: "Channel & Agent" }
    ], l = $e(n, "theme"), { isDark: r } = Me(l), c = ne(n.breakdownBy), u = $(() => {
      const oe = {
        resolution_mode: "Resolution Mode",
        agent: "Agent",
        channel: "Channel",
        agent_channel: "Channel & Agent"
      }[c.value];
      return oe ? `Average resolution time by ${oe}` : "Average resolution time";
    }), f = (q) => {
      c.value = String(q), o("changeBreakdown", c.value);
    }, g = [
      { key: "ai_agent", label: "AI Agent", color: "#8b5cf6" },
      { key: "human", label: "Human", color: "#f59e0b" },
      { key: "hybrid", label: "AI + Human", color: "#06b6d4" }
    ], b = {
      wsp: "#25D366",
      whatsapp: "#25D366",
      voice: "#8b5cf6",
      sms: "#f59e0b",
      web_chat: "#06b6d4",
      email: "#ec4899",
      messenger: "#0084ff",
      telegram: "#0088cc",
      instagram: "#E4405F"
    }, m = (q) => b[q.toLowerCase()] || i_, v = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, p = (q) => v[q.toLowerCase()] || l_, y = (q) => {
      const [oe] = q.split("|").map((R) => R.trim());
      return p(oe || q);
    }, k = (q) => {
      if (!q) return "Unknown";
      const oe = kt(q).replace(/_/g, " ").trim();
      return oe ? oe.charAt(0).toUpperCase() + oe.slice(1) : "Unknown";
    }, _ = $(() => n.data ?? {
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
    }), w = ne({
      labels: [],
      datasets: []
    }), C = $(() => {
      const q = _.value, oe = {
        ai_agent: q.ai_agent_total_conversations,
        human: q.human_total_conversations,
        hybrid: q.hybrid_total_conversations
      }, R = {
        ai_agent: q.ai_agent_avg_resolution_time_formatted,
        human: q.human_avg_resolution_time_formatted,
        hybrid: q.hybrid_avg_resolution_time_formatted
      };
      return g.map((K) => ({
        key: K.key,
        label: K.label,
        color: K.color,
        formattedValue: R[K.key] || "-",
        subvalue: `${oe[K.key] || 0} conversations`
      }));
    }), M = (q, oe) => q.map((R) => ({
      key: R.key,
      label: k(R.label),
      color: oe(R.key),
      formattedValue: R.avg_resolution_time_formatted || "-",
      subvalue: `${R.total_conversations} conversations (${R.percentage.toFixed(1)}%)`
    })), S = $(
      () => M(_.value.channel_breakdown_items ?? [], m)
    ), I = $(
      () => M(_.value.agent_breakdown_items ?? [], p)
    ), V = $(
      () => M(
        _.value.agent_channel_breakdown_items ?? [],
        y
      )
    ), H = $(() => {
      switch (c.value) {
        case "channel":
          return S.value;
        case "agent":
          return I.value;
        case "agent_channel":
          return V.value;
        case "resolution_mode":
          return C.value;
        default:
          return [];
      }
    }), D = $(() => {
      const q = H.value.length;
      if (!(q <= 0))
        return { gridTemplateColumns: `repeat(${q}, minmax(0, 1fr))` };
    }), T = (q) => q == null ? null : Number((q / 60).toFixed(2)), B = ne([]), j = (q) => {
      const oe = q?.overall_resolution_time_by_day ?? {}, R = Object.keys(oe).sort((K, Y) => K.localeCompare(Y));
      if (!R.length) {
        w.value = { labels: [], datasets: [] }, B.value = [];
        return;
      }
      B.value = [R.map((K) => oe[K] ?? null)], w.value = {
        labels: R.map((K) => Ne(K).format("MMM DD")),
        datasets: [
          {
            label: "All",
            data: B.value[0].map((K) => T(K)),
            borderColor: s_,
            backgroundColor: "transparent",
            fill: !1,
            tension: 0.35,
            spanGaps: !0
          }
        ]
      };
    }, W = (q) => {
      const oe = q?.resolution_time_by_day ?? {}, R = Object.keys(oe).sort((K, Y) => K.localeCompare(Y));
      if (!R.length) {
        w.value = { labels: [], datasets: [] }, B.value = [];
        return;
      }
      B.value = g.map(
        (K) => R.map((Y) => oe[Y]?.[K.key] ?? null)
      ), w.value = {
        labels: R.map((K) => Ne(K).format("MMM DD")),
        datasets: g.map((K, Y) => ({
          label: K.label,
          data: B.value[Y].map((N) => T(N)),
          borderColor: K.color,
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35,
          spanGaps: !0
        }))
      };
    }, J = (q, oe, R) => {
      const K = Object.keys(q).sort((N, ie) => N.localeCompare(ie));
      if (!K.length || !oe.length) {
        w.value = { labels: [], datasets: [] }, B.value = [];
        return;
      }
      const Y = oe.map((N) => N.key);
      B.value = Y.map((N) => K.map((ie) => q[ie]?.[N] ?? null)), w.value = {
        labels: K.map((N) => Ne(N).format("MMM DD")),
        datasets: Y.map((N, ie) => {
          const ce = oe.find((ye) => ye.key === N);
          return {
            label: k(ce?.label || N),
            data: B.value[ie].map((ye) => T(ye)),
            borderColor: R(N),
            backgroundColor: "transparent",
            fill: !1,
            tension: 0.35,
            spanGaps: !0
          };
        })
      };
    }, re = (q) => {
      switch (c.value) {
        case "channel":
          J(
            q?.channel_resolution_time_by_day ?? {},
            q?.channel_breakdown_items ?? [],
            m
          );
          return;
        case "agent":
          J(
            q?.agent_resolution_time_by_day ?? {},
            q?.agent_breakdown_items ?? [],
            p
          );
          return;
        case "agent_channel":
          J(
            q?.agent_channel_resolution_time_by_day ?? {},
            q?.agent_channel_breakdown_items ?? [],
            y
          );
          return;
        case "resolution_mode":
          W(q);
          return;
        default:
          j(q);
      }
    }, ue = $(() => ({
      scales: {
        y: {
          min: 0,
          ticks: {
            callback: (q) => `${q}m`
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (q) => {
              const oe = q.dataset.label || "", R = B.value[q.datasetIndex]?.[q.dataIndex];
              return R == null ? `${oe}: -` : `${oe}: ${fo(R)}`;
            }
          }
        }
      }
    }));
    return Le(
      () => n.data,
      (q) => {
        re(q ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Le(
      () => n.breakdownBy,
      (q) => {
        c.value = q, re(n.data ?? null);
      }
    ), t({ isDark: r }), (q, oe) => (h(), ee(Se, {
      class: "w-full min-h-0 self-start",
      title: u.value,
      subtitle: "How long conversations take to resolve",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !e.loading ? (h(), ee(L(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      headerAside: O(() => [
        d("div", Qk, [
          d("div", Jk, [
            z(Et, {
              "model-value": c.value,
              options: i,
              "onUpdate:modelValue": f
            }, null, 8, ["model-value"])
          ])
        ])
      ]),
      default: O(() => [
        d("div", e_, [
          d("div", t_, [
            w.value.labels.length && w.value.datasets.length ? (h(), x("section", a_, [
              d("div", n_, [
                z(pt, {
                  data: w.value,
                  options: ue.value,
                  theme: l.value
                }, null, 8, ["data", "options", "theme"])
              ]),
              H.value.length ? (h(), x("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: Ce(D.value)
              }, [
                (h(!0), x(he, null, pe(H.value, (R) => (h(), ee(ve, {
                  key: `card-${R.key}`,
                  class: "min-w-0",
                  color: R.color,
                  title: R.label,
                  value: R.formattedValue,
                  subvalue: R.subvalue
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : F("", !0)
            ])) : (h(), x("section", o_, [...oe[0] || (oe[0] = [
              d("div", { class: "max-w-[360px] px-4 text-center" }, [
                d("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No resolution time data available "),
                d("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No conversations found for the selected period. Try adjusting the date range. ")
              ], -1)
            ])]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["title", "loading"]));
  }
}), c_ = /* @__PURE__ */ be(r_, [["__scopeId", "data-v-05854dc5"]]), d_ = { class: "art-values__item" }, u_ = { class: "art-values__number" }, h_ = { class: "art-values__item" }, f_ = { class: "art-values__number" }, g_ = "Average time from the first message to the resolution of each conversation, broken down by resolver: AI Agent vs. Human.", m_ = /* @__PURE__ */ fe({
  __name: "AvgResolutionTimeCard",
  props: {
    aiAgentAvgResolutionTimeSeconds: { default: null },
    humanAvgResolutionTimeSeconds: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    tooltip: { default: g_ }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), { isDark: o } = Me($e(a, "theme")), s = $(() => fo(a.aiAgentAvgResolutionTimeSeconds)), i = $(() => fo(a.humanAvgResolutionTimeSeconds));
    return t({ isDark: o }), (l, r) => (h(), ee(tt, {
      label: "Average Resolution Time",
      value: s.value,
      tooltip: e.tooltip,
      loading: e.loading,
      theme: e.theme,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: O(() => [...r[0] || (r[0] = [
        d("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5"
        }, [
          d("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M12 6v6l4 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          })
        ], -1)
      ])]),
      value: O(() => [
        d("div", {
          class: Z(["art-values", { "art-values--dark": L(o) }])
        }, [
          d("div", d_, [
            d("span", u_, A(s.value), 1),
            r[1] || (r[1] = d("span", { class: "art-values__label" }, "AI Agent", -1))
          ]),
          r[3] || (r[3] = d("div", {
            class: "art-values__divider",
            "aria-hidden": "true"
          }, null, -1)),
          d("div", h_, [
            d("span", f_, A(i.value), 1),
            r[2] || (r[2] = d("span", { class: "art-values__label" }, "Human", -1))
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["value", "tooltip", "loading", "theme"]));
  }
}), p_ = /* @__PURE__ */ be(m_, [["__scopeId", "data-v-39d7bf7a"]]), b_ = "Percentage of Check In Success relative to Check In Started.", v_ = /* @__PURE__ */ fe({
  __name: "CheckinCR",
  props: {
    checkinCr: { default: 0 },
    previousCheckinCr: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    tooltip: { default: b_ }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = $(() => `${Number(a.checkinCr || 0).toFixed(1)}%`), s = $(() => L(n.value?.isDark) ?? !1), i = $(() => L(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (h(), ee(tt, {
      label: "Check-in CR",
      value: o.value,
      tooltip: e.tooltip,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.checkinCr,
      "previous-value": e.previousCheckinCr,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: O(() => [...r[0] || (r[0] = [
        d("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          d("path", { d: "M2 22h20" }),
          d("path", { d: "M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z" })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "tooltip", "loading", "theme", "current-value", "previous-value"]));
  }
}), y_ = "Percentage of Sell Success relative to Sell Started.", x_ = /* @__PURE__ */ fe({
  __name: "SellerCR",
  props: {
    sellerCr: { default: 0 },
    previousSellerCr: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    tooltip: { default: y_ }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = $(() => `${Number(a.sellerCr || 0).toFixed(1)}%`), s = $(() => L(n.value?.isDark) ?? !1), i = $(() => L(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (h(), ee(tt, {
      label: "Seller CR",
      value: o.value,
      tooltip: e.tooltip,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.sellerCr,
      "previous-value": e.previousSellerCr,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: O(() => [...r[0] || (r[0] = [
        d("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          d("path", { d: "M16 10a4 4 0 0 1-8 0" }),
          d("path", { d: "M3.103 6.034h17.794" }),
          d("path", { d: "M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "tooltip", "loading", "theme", "current-value", "previous-value"]));
  }
}), k_ = "Percentage of Booking Success relative to Booking Started.", __ = /* @__PURE__ */ fe({
  __name: "BookingManagerCR",
  props: {
    bookingManagerCr: { default: 0 },
    previousBookingManagerCr: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    tooltip: { default: k_ }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = $(
      () => `${Number(a.bookingManagerCr || 0).toFixed(1)}%`
    ), s = $(() => L(n.value?.isDark) ?? !1), i = $(() => L(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (h(), ee(tt, {
      label: "Booking Manager CR",
      value: o.value,
      tooltip: e.tooltip,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.bookingManagerCr,
      "previous-value": e.previousBookingManagerCr,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: O(() => [...r[0] || (r[0] = [
        d("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          d("path", { d: "m15 11-1 9" }),
          d("path", { d: "m19 11-4-7" }),
          d("path", { d: "M2 11h20" }),
          d("path", { d: "m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" }),
          d("path", { d: "M4.5 15.5h15" }),
          d("path", { d: "m5 11 4-7" }),
          d("path", { d: "m9 11 1 9" })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "tooltip", "loading", "theme", "current-value", "previous-value"]));
  }
}), w_ = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, C_ = {
  key: 0,
  class: "flex w-full shrink-0 flex-col min-h-0"
}, $_ = { class: "flex h-[230px] max-h-[230px] w-full shrink-0 flex-col min-h-0 mb-4" }, S_ = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2" }, M_ = {
  key: 1,
  class: "flex min-h-[280px] w-full items-center justify-center"
}, D_ = { class: "max-w-[360px] text-center" }, A_ = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))]" }, T_ = {
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
    const t = e, { isDark: a, colors: n } = Me($e(t, "theme")), o = $(() => {
      const l = t.data ?? {}, r = l.daily, c = l.days, u = Array.isArray(r) && r.length > 0, f = Array.isArray(c) && c.length > 0 && Array.isArray(l.allocatedCostSeries) && l.allocatedCostSeries.length === c.length;
      let g = [];
      return u ? g = r : f && (g = c.map((b, m) => ({
        date: b,
        allocated_cost: l.allocatedCostSeries[m] ?? 0,
        aws_cost: l.awsCostSeries[m] ?? 0,
        airline_conversations: l.airlineConversationsSeries[m] ?? 0
      }))), {
        daily: g,
        total_allocated_cost: l.total_allocated_cost ?? l.totalAllocated ?? 0,
        total_cost: l.total_cost ?? l.total ?? 0,
        total_conversations: l.total_conversations ?? l.totalConversations ?? 0,
        total_airline_conversations: l.total_airline_conversations ?? l.totalAirlineConversations ?? 0,
        airline_name: l.airline_name
      };
    }), s = $(() => {
      const l = o.value.daily;
      return {
        labels: l.map((c) => c.date),
        datasets: [
          {
            label: "Allocated Cost",
            data: l.map((c) => c.allocated_cost),
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
            data: l.map((c) => c.aws_cost),
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
            data: l.map((c) => c.airline_conversations),
            borderColor: n.value.info,
            backgroundColor: a.value ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)",
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.4,
            yAxisID: "y1"
          }
        ]
      };
    }), i = $(() => ({
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
            label(l) {
              const r = l.dataset.label ? `${l.dataset.label}: ` : "", c = l.parsed.y;
              return l.dataset.yAxisID === "y" ? r + Oe(c) : r + String(c);
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
            callback: (l) => Oe(l)
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
    return (l, r) => (h(), ee(Se, {
      title: o.value.airline_name || "AWS Cost",
      subtitle: "AWS vs Allocated costs over time",
      collapsible: !1,
      loading: e.loading
    }, {
      default: O(() => [
        d("div", w_, [
          o.value.daily.length > 0 ? (h(), x("div", C_, [
            d("div", $_, [
              z(pt, {
                class: "h-full min-h-0 w-full",
                data: s.value,
                options: i.value
              }, null, 8, ["data", "options"])
            ]),
            d("div", S_, [
              z(ve, {
                color: L(n).primaryLight,
                title: "Total Allocated",
                value: L(Oe)(o.value.total_allocated_cost)
              }, null, 8, ["color", "value"]),
              z(ve, {
                color: "#FF9900",
                title: "Total AWS",
                value: L(Oe)(o.value.total_cost)
              }, null, 8, ["value"])
            ])
          ])) : (h(), x("section", M_, [
            d("div", D_, [
              d("div", A_, [
                z(L(dt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
              ]),
              r[0] || (r[0] = d("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " Sin datos de costos ", -1)),
              r[1] || (r[1] = d("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No se encontró información para el periodo seleccionado. Intenta ajustar el rango de fechas. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["title", "loading"]));
  }
}, B_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, L_ = { class: "card-body" }, R_ = {
  key: 0,
  class: "chart-section"
}, I_ = { class: "chart-container" }, P_ = { class: "mt-auto grid grid-cols-2 gap-3 sm:grid-cols-3 max-[768px]:gap-2" }, E_ = {
  key: 1,
  class: "empty-state"
}, O_ = { class: "empty-state-content" }, F_ = { class: "empty-icon-wrapper" }, Pa = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", bi = 10, V_ = /* @__PURE__ */ fe({
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
    const n = e, { isDark: o, colors: s } = Me($e(n, "theme")), i = (m) => {
      const v = new Date(m), p = String(v.getDate()).padStart(2, "0"), y = String(v.getMonth() + 1).padStart(2, "0");
      return `${p}-${y}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, r = $(() => {
      const m = n.data?.costs_by_day || {};
      return Object.values(m).reduce((v, p) => v + (p.input_cost || 0), 0);
    }), c = $(() => {
      const m = n.data?.costs_by_day || {};
      return Object.values(m).reduce((v, p) => v + (p.output_cost || 0), 0);
    }), u = $(() => {
      const m = n.data?.costs_by_day || {};
      return Object.values(m).reduce((v, p) => v + (p.cache_read_cost || 0), 0);
    }), f = $(() => {
      const m = n.data?.costs_by_day || {};
      return Object.values(m).reduce((v, p) => v + (p.cache_write_cost || 0), 0);
    }), g = $(() => {
      const m = n.data?.costs_by_day || {}, v = Object.keys(m).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const p = v.map((k) => i(k)), y = [
        {
          label: "Input Cost",
          data: v.map((k) => m[k]?.input_cost || 0),
          backgroundColor: `${l.input}80`,
          borderColor: l.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: v.map((k) => m[k]?.output_cost || 0),
          backgroundColor: `${l.output}80`,
          borderColor: l.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: v.map((k) => m[k]?.cache_read_cost || 0),
          backgroundColor: `${l.cache_read}80`,
          borderColor: l.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: v.map((k) => m[k]?.cache_write_cost || 0),
          backgroundColor: `${l.cache_write}80`,
          borderColor: l.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: p,
        datasets: y
      };
    }), b = $(() => n.options ? n.options : {
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
              family: Pa,
              size: 13,
              weight: "500"
            },
            color: s.value.textSecondary,
            padding: 12,
            boxWidth: bi,
            boxHeight: bi,
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
            family: Pa,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: Pa,
            size: 12,
            weight: "500"
          },
          callbacks: {
            label: function(m) {
              let v = m.dataset.label || "";
              return v && (v += ": "), m.parsed.y !== null && (v += Oe(m.parsed.y)), v;
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
            font: { family: Pa, size: 12, weight: "500" },
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
            font: { family: Pa, size: 12, weight: "500" },
            color: s.value.textSecondary,
            padding: 8,
            callback: function(m) {
              return Oe(m);
            }
          }
        }
      }
    });
    return t({ isDark: o }), (m, v) => (h(), ee(Se, {
      class: "h-full min-h-0",
      title: "Cost Usage",
      subtitle: "Cost breakdown over time (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: O(() => [
        d("div", B_, [
          d("div", L_, [
            g.value.labels && g.value.labels.length ? (h(), x("section", R_, [
              d("div", I_, [
                z($t, {
                  data: g.value,
                  options: b.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              d("footer", P_, [
                z(ve, {
                  title: "Total Cost",
                  value: L(Oe)(e.data.total_cost)
                }, null, 8, ["value"]),
                z(ve, {
                  title: "Input Cost",
                  value: L(Oe)(r.value),
                  color: l.input
                }, null, 8, ["value", "color"]),
                z(ve, {
                  title: "Output Cost",
                  value: L(Oe)(c.value),
                  color: l.output
                }, null, 8, ["value", "color"]),
                z(ve, {
                  title: "Cache Read",
                  value: L(Oe)(u.value),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                z(ve, {
                  title: "Cache Write",
                  value: L(Oe)(f.value),
                  color: l.cache_write
                }, null, 8, ["value", "color"]),
                z(ve, {
                  title: "Avg / Conv.",
                  value: L(Oe)(e.data.avg_cost_per_conversation)
                }, null, 8, ["value"])
              ])
            ])) : (h(), x("section", E_, [
              d("div", O_, [
                d("div", F_, [
                  z(L(dt), { class: "empty-icon" })
                ]),
                v[0] || (v[0] = d("p", { class: "empty-title" }, "No cost usage data", -1)),
                v[1] || (v[1] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see cost breakdown trends.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), N_ = /* @__PURE__ */ be(V_, [["__scopeId", "data-v-e1c4a95b"]]), z_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, j_ = { class: "card-body" }, H_ = {
  key: 0,
  class: "chart-section"
}, W_ = { class: "chart-container" }, K_ = { class: "mt-auto flex w-full min-w-0 flex-nowrap items-stretch gap-2 sm:gap-3" }, U_ = {
  key: 1,
  class: "empty-state"
}, Y_ = { class: "empty-state-content" }, q_ = { class: "empty-icon-wrapper" }, Ea = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", vi = 10, X_ = /* @__PURE__ */ fe({
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
    const n = e, { isDark: o, colors: s } = Me($e(n, "theme")), i = (u) => {
      const f = new Date(u), g = String(f.getDate()).padStart(2, "0"), b = String(f.getMonth() + 1).padStart(2, "0");
      return `${g}-${b}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, r = $(() => {
      const u = n.data?.tokens_by_day || {}, f = Object.keys(u).sort();
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const g = f.map((m) => i(m)), b = [
        {
          label: "Input Tokens",
          data: f.map((m) => u[m]?.input_tokens || 0),
          backgroundColor: `${l.input}80`,
          borderColor: l.input,
          borderWidth: 1
        },
        {
          label: "Output Tokens",
          data: f.map((m) => u[m]?.output_tokens || 0),
          backgroundColor: `${l.output}80`,
          borderColor: l.output,
          borderWidth: 1
        },
        {
          label: "Cache Read",
          data: f.map((m) => u[m]?.cache_read_tokens || 0),
          backgroundColor: `${l.cache_read}80`,
          borderColor: l.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write",
          data: f.map((m) => u[m]?.cache_write_tokens || 0),
          backgroundColor: `${l.cache_write}80`,
          borderColor: l.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: g,
        datasets: b
      };
    }), c = $(() => n.options ? n.options : {
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
              family: Ea,
              size: 13,
              weight: "500"
            },
            color: s.value.textSecondary,
            padding: 12,
            boxWidth: vi,
            boxHeight: vi,
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
            family: Ea,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: Ea,
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
            font: { family: Ea, size: 12, weight: "500" },
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
            font: { family: Ea, size: 12, weight: "500" },
            color: s.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: o }), (u, f) => (h(), ee(Se, {
      class: "h-full min-h-0",
      title: "Token Usage",
      subtitle: "Token consumption over time (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: O(() => [
        d("div", z_, [
          d("div", j_, [
            r.value.labels && r.value.labels.length ? (h(), x("section", H_, [
              d("div", W_, [
                z($t, {
                  data: r.value,
                  options: c.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              d("footer", K_, [
                z(ve, {
                  class: "min-w-0 flex-1",
                  title: "Total Tokens",
                  value: L(ge)(e.data.total_tokens)
                }, null, 8, ["value"]),
                z(ve, {
                  class: "min-w-0 flex-1",
                  title: "Input",
                  value: L(ge)(e.data.total_input_tokens),
                  color: l.input
                }, null, 8, ["value", "color"]),
                z(ve, {
                  class: "min-w-0 flex-1",
                  title: "Output",
                  value: L(ge)(e.data.total_output_tokens),
                  color: l.output
                }, null, 8, ["value", "color"]),
                z(ve, {
                  class: "min-w-0 flex-1",
                  title: "Cache Read",
                  value: L(ge)(e.data.total_cache_read_tokens),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                z(ve, {
                  class: "min-w-0 flex-1",
                  title: "Cache Write",
                  value: L(ge)(e.data.total_cache_write_tokens),
                  color: l.cache_write
                }, null, 8, ["value", "color"])
              ])
            ])) : (h(), x("section", U_, [
              d("div", Y_, [
                d("div", q_, [
                  z(L(dt), { class: "empty-icon" })
                ]),
                f[0] || (f[0] = d("p", { class: "empty-title" }, "No token usage data", -1)),
                f[1] || (f[1] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see token consumption trends.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), G_ = /* @__PURE__ */ be(X_, [["__scopeId", "data-v-554d3cda"]]), Z_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Q_ = { class: "card-body" }, J_ = {
  key: 0,
  class: "chart-section"
}, e2 = { class: "chart-container" }, t2 = { class: "mt-4 w-full min-w-0" }, a2 = {
  key: 1,
  class: "empty-state"
}, n2 = { class: "empty-state-content" }, o2 = { class: "empty-icon-wrapper" }, s2 = /* @__PURE__ */ fe({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), s = (c) => {
      const u = new Date(c), f = String(u.getDate()).padStart(2, "0");
      return `${String(u.getMonth() + 1).padStart(2, "0")}-${f}`;
    }, i = $(
      () => ge(a.data?.total_conversations ?? 0)
    ), l = $(() => {
      const c = a.data?.conversations_by_day || {}, u = Object.keys(c).sort();
      if (u.length === 0)
        return { labels: [], datasets: [] };
      const f = u.map((b) => s(b)), g = [
        {
          label: "Conversations",
          data: u.map((b) => c[b] || 0),
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
        labels: f,
        datasets: g
      };
    }), r = $(() => a.options ? a.options : {
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
              let u = c.dataset.label || "";
              return u && (u += ": "), c.parsed.y !== null && (u += c.parsed.y), u;
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
    return t({ isDark: n }), (c, u) => (h(), ee(Se, {
      class: "h-full min-h-0",
      title: "Conversation Count",
      subtitle: "Conversations over time",
      collapsible: !1,
      loading: e.loading
    }, {
      default: O(() => [
        d("div", Z_, [
          d("div", Q_, [
            l.value.labels && l.value.labels.length ? (h(), x("section", J_, [
              d("div", e2, [
                z(pt, {
                  data: l.value,
                  options: r.value
                }, null, 8, ["data", "options"])
              ]),
              d("div", t2, [
                z(ve, {
                  class: "min-w-0 w-full",
                  title: "Total",
                  value: i.value
                }, null, 8, ["value"])
              ])
            ])) : (h(), x("section", a2, [
              d("div", n2, [
                d("div", o2, [
                  z(L(dt), { class: "empty-icon" })
                ]),
                u[0] || (u[0] = d("p", { class: "empty-title" }, "No conversation count data", -1)),
                u[1] || (u[1] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), i2 = /* @__PURE__ */ be(s2, [["__scopeId", "data-v-311f443a"]]), l2 = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, r2 = { class: "card-body" }, c2 = {
  key: 0,
  class: "charts-grid"
}, d2 = { class: "chart-section" }, u2 = { class: "chart-container" }, h2 = { class: "chart-section" }, f2 = { class: "chart-container" }, g2 = {
  key: 1,
  class: "empty-state"
}, m2 = { class: "empty-state-content" }, p2 = { class: "empty-icon-wrapper" }, b2 = /* @__PURE__ */ fe({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), s = $(() => a.data?.top_agents && a.data.top_agents.length > 0), i = $(() => a.data?.top_agents ? [...a.data.top_agents].sort((g, b) => (b.total_cost || 0) - (g.total_cost || 0)) : []), l = $(() => a.data?.top_agents ? [...a.data.top_agents].sort((g, b) => (b.total_tokens || 0) - (g.total_tokens || 0)) : []), r = $(() => {
      const g = i.value;
      return g.length === 0 ? { labels: [], datasets: [] } : {
        labels: g.map((b) => kt(b.agent_type)),
        datasets: [
          {
            label: "Total Cost",
            data: g.map((b) => b.total_cost || 0),
            backgroundColor: "#a78bfa80",
            borderColor: "#a78bfa",
            borderWidth: 1
          }
        ]
      };
    }), c = $(() => {
      const g = l.value;
      return g.length === 0 ? { labels: [], datasets: [] } : {
        labels: g.map((b) => kt(b.agent_type)),
        datasets: [
          {
            label: "Total Tokens",
            data: g.map((b) => b.total_tokens || 0),
            backgroundColor: "#f59e0b80",
            borderColor: "#f59e0b",
            borderWidth: 1
          }
        ]
      };
    }), u = $(() => a.options ? a.options : {
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
            title: function(g) {
              return g[0]?.label || "";
            },
            label: function(g) {
              const b = g.label, m = a.data?.top_agents?.find(
                (v) => kt(v.agent_type) === b
              );
              return m ? [
                `Total Cost: ${Oe(m.total_cost)}`,
                `Input Cost: ${Oe(m.total_input_tokens_cost)}`,
                `Output Cost: ${Oe(m.total_output_tokens_cost)}`,
                `Cache Read: ${Oe(m.total_read_tokens_cost)}`,
                `Cache Write: ${Oe(m.total_write_tokens_cost)}`
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
            callback: function(g) {
              return Oe(g);
            }
          }
        }
      }
    }), f = $(() => a.options ? a.options : {
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
            title: function(g) {
              return g[0]?.label || "";
            },
            label: function(g) {
              const b = g.label, m = a.data?.top_agents?.find(
                (v) => kt(v.agent_type) === b
              );
              return m ? [
                `Total Tokens: ${m.total_tokens.toLocaleString()}`,
                `Input Tokens: ${m.total_input_tokens.toLocaleString()}`,
                `Output Tokens: ${m.total_output_tokens.toLocaleString()}`,
                `Cache Read: ${m.total_read_tokens.toLocaleString()}`,
                `Cache Write: ${m.total_write_tokens.toLocaleString()}`
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
            callback: function(g) {
              return g.toLocaleString();
            }
          }
        }
      }
    });
    return t({ isDark: n }), (g, b) => (h(), ee(Se, {
      class: "h-full min-h-0",
      title: "Top Agents Analysis",
      subtitle: "Cost and token usage by agent",
      collapsible: !1,
      loading: e.loading
    }, {
      default: O(() => [
        d("div", l2, [
          d("div", r2, [
            s.value ? (h(), x("div", c2, [
              d("section", d2, [
                b[0] || (b[0] = d("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
                d("div", u2, [
                  z($t, {
                    data: r.value,
                    options: u.value
                  }, null, 8, ["data", "options"])
                ])
              ]),
              d("section", h2, [
                b[1] || (b[1] = d("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
                d("div", f2, [
                  z($t, {
                    data: c.value,
                    options: f.value
                  }, null, 8, ["data", "options"])
                ])
              ])
            ])) : (h(), x("section", g2, [
              d("div", m2, [
                d("div", p2, [
                  z(L(dt), { class: "empty-icon" })
                ]),
                b[2] || (b[2] = d("p", { class: "empty-title" }, "No top agents data", -1)),
                b[3] || (b[3] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent analysis.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), v2 = /* @__PURE__ */ be(b2, [["__scopeId", "data-v-ae26eabc"]]), y2 = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, x2 = { class: "card-body" }, k2 = {
  key: 0,
  class: "chart-section"
}, _2 = { class: "chart-container" }, w2 = {
  key: 1,
  class: "empty-state"
}, C2 = { class: "empty-state-content" }, $2 = { class: "empty-icon-wrapper" }, S2 = /* @__PURE__ */ fe({
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
    }, i = $(() => a.data?.top_agents ? a.data.top_agents.filter(
      (f) => f.agent_type?.toLowerCase() !== "triage"
    ) : []), l = $(() => i.value.length > 0), r = $(() => i.value.reduce((f, g) => f + (g.conversations || 0), 0)), c = $(() => {
      const f = i.value;
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const g = f.map((v) => {
        const p = v.agent_type?.toLowerCase();
        return (s[p] || "#a78bfa") + "80";
      }), b = f.map((v) => {
        const p = v.agent_type?.toLowerCase();
        return s[p] || "#a78bfa";
      });
      return {
        labels: f.map((v) => {
          const p = v.conversations || 0, y = r.value ? p / r.value * 100 : 0;
          return `${kt(v.agent_type)} - ${p.toLocaleString()} (${y.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: f.map((v) => v.conversations || 0),
            backgroundColor: g,
            borderColor: b,
            borderWidth: 2
          }
        ]
      };
    }), u = $(() => a.options ? a.options : {
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
            label: (f) => {
              const g = (f.label || "").toString(), b = Number(f.parsed) || 0, m = (f.dataset.data || []).reduce((p, y) => p + (Number(y) || 0), 0), v = m ? b / m * 100 : 0;
              return `${g}: ${b.toLocaleString()} (${v.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: n }), (f, g) => (h(), ee(Se, {
      class: "h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: O(() => [
        d("div", y2, [
          d("div", x2, [
            l.value ? (h(), x("section", k2, [
              d("div", _2, [
                z(Vn, {
                  data: c.value,
                  options: u.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (h(), x("section", w2, [
              d("div", C2, [
                d("div", $2, [
                  z(L(dt), { class: "empty-icon" })
                ]),
                g[0] || (g[0] = d("p", { class: "empty-title" }, "No top agents data", -1)),
                g[1] || (g[1] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), M2 = /* @__PURE__ */ be(S2, [["__scopeId", "data-v-a909b73c"]]), D2 = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, A2 = { class: "card-body" }, T2 = {
  key: 0,
  class: "chart-section"
}, B2 = { class: "chart-container" }, L2 = {
  key: 1,
  class: "empty-state"
}, R2 = { class: "empty-state-content" }, I2 = { class: "empty-icon-wrapper" }, P2 = /* @__PURE__ */ fe({
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
      const u = new Date(c), f = String(u.getDate()).padStart(2, "0");
      return `${String(u.getMonth() + 1).padStart(2, "0")}-${f}`;
    }, i = $(() => {
      const c = a.costData?.daily_mean_cost_per_conversation || [];
      if (Array.isArray(c) && c.length > 0)
        return !0;
      const u = a.costData?.costs_by_day || {}, f = a.conversationData?.conversations_by_day || {};
      return Object.keys(u).length > 0 && Object.keys(f).length > 0;
    }), l = $(() => {
      const c = a.costData?.daily_mean_cost_per_conversation || [];
      if (c.length > 0) {
        const p = [...c].sort((y, k) => y.date.localeCompare(k.date));
        return {
          labels: p.map((y) => s(y.date)),
          datasets: [
            {
              label: "Mean USD/conv",
              data: p.map((y) => Number(y.value) || 0),
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
      const u = a.costData?.costs_by_day || {}, f = a.conversationData?.conversations_by_day || {}, b = Object.keys(u).filter((p) => f[p]).sort();
      if (b.length === 0)
        return { labels: [], datasets: [] };
      const m = b.map((p) => s(p)), v = b.map((p) => {
        const y = u[p]?.total_cost || 0, k = f[p] || 0;
        return k > 0 ? y / k : 0;
      });
      return {
        labels: m,
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
    }), r = $(() => a.options ? a.options : {
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
              let u = c.dataset.label || "";
              return u && (u += ": "), c.parsed.y !== null && (u += Oe(c.parsed.y)), u;
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
              return Oe(c);
            }
          }
        }
      }
    });
    return t({ isDark: n }), (c, u) => (h(), ee(Se, {
      class: "h-full min-h-0",
      title: "Daily Cost Trends",
      subtitle: "Mean USD/conversation per day",
      collapsible: !1,
      loading: e.loading
    }, {
      default: O(() => [
        d("div", D2, [
          d("div", A2, [
            i.value ? (h(), x("section", T2, [
              d("div", B2, [
                z(pt, {
                  data: l.value,
                  options: r.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (h(), x("section", L2, [
              d("div", R2, [
                d("div", I2, [
                  z(L(dt), { class: "empty-icon" })
                ]),
                u[0] || (u[0] = d("p", { class: "empty-title" }, "No daily cost trends data", -1)),
                u[1] || (u[1] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), E2 = /* @__PURE__ */ be(P2, [["__scopeId", "data-v-ae6c48b1"]]), O2 = { class: "tabs text-sm" }, F2 = ["aria-label"], V2 = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], N2 = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, z2 = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = ne([]), s = `tabs-${Ke()}`, i = (m) => `${s}-tab-${m}`, l = $(
      () => a.items.map((m, v) => m.disabled ? -1 : v).filter((m) => m >= 0)
    );
    function r(m) {
      return m.value === a.modelValue;
    }
    function c(m) {
      const v = r(m), y = `${a.fullWidth ? "relative flex min-w-0 flex-1" : "relative inline-flex max-w-full shrink-0"} h-8 max-h-8 min-h-8 items-stretch cursor-pointer rounded-lg border border-transparent text-center outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100`;
      return m.disabled ? `${y} cursor-not-allowed opacity-40` : v ? `${y} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]` : `${y} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function u(m, v) {
      m === v || a.items.find((y) => y.value === m)?.disabled || (n("update:modelValue", m), n("change", { value: m, previousValue: v }));
    }
    function f(m, v) {
      n("tab-click", { value: m.value, originalEvent: v }), !m.disabled && (u(m.value, a.modelValue), We(() => {
        o.value[a.items.indexOf(m)]?.focus();
      }));
    }
    function g(m, v) {
      const p = a.items.length;
      if (p === 0) return 0;
      let y = m;
      for (let k = 0; k < p; k++)
        if (y = (y + v + p) % p, !a.items[y]?.disabled) return y;
      return m;
    }
    async function b(m, v) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(m.key)) return;
      m.preventDefault();
      let y = v;
      m.key === "ArrowLeft" ? y = g(v, -1) : m.key === "ArrowRight" ? y = g(v, 1) : m.key === "Home" ? y = l.value[0] ?? 0 : m.key === "End" && (y = l.value[l.value.length - 1] ?? v);
      const k = a.items[y];
      !k || k.disabled || (u(k.value, a.modelValue), await We(), o.value[y]?.focus());
    }
    return (m, v) => (h(), x("div", O2, [
      d("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: Z([
          "box-border h-10 max-h-10 min-h-10 flex-wrap items-center gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 px-0.5 py-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          e.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (h(!0), x(he, null, pe(e.items, (p, y) => (h(), x("button", {
          id: i(p.value),
          key: p.value,
          ref_for: !0,
          ref_key: "tabRefs",
          ref: o,
          type: "button",
          role: "tab",
          "aria-selected": r(p),
          "aria-disabled": p.disabled === !0,
          tabindex: r(p) ? 0 : -1,
          class: Z(c(p)),
          onClick: (k) => f(p, k),
          onKeydown: (k) => b(k, y)
        }, [
          d("span", {
            class: Z(["tabs-tab__label flex min-h-0 min-w-0 items-center justify-center gap-2 px-3", { "min-w-0 flex-1": e.fullWidth }])
          }, [
            p.icon ? (h(), ee(rt(p.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : F("", !0),
            d("span", N2, A(p.label), 1)
          ], 2)
        ], 42, V2))), 128))
      ], 10, F2),
      m.$slots.default ? (h(), ee(ct, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: O(() => [
          (h(), x("div", {
            key: e.modelValue,
            class: "tabs-panel mt-4"
          }, [
            _e(m.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : F("", !0)
    ]));
  }
}), Pl = /* @__PURE__ */ be(z2, [["__scopeId", "data-v-f9c367eb"]]), j2 = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, H2 = { class: "card-body" }, W2 = {
  key: 0,
  class: "model-usage-table-block"
}, K2 = { class: "w-full min-w-0" }, U2 = {
  key: 1,
  class: "empty-state"
}, Y2 = { class: "empty-state-content" }, q2 = { class: "empty-icon-wrapper" }, X2 = /* @__PURE__ */ fe({
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
    const n = e, o = a, s = (m) => {
      o("export", m);
    }, { isDark: i } = Me($e(n, "theme")), l = [
      { value: "by_model", label: "Model" },
      { value: "by_provider", label: "Provider" }
    ], r = ne("by_model"), c = $(() => r.value === "by_model" ? n.data?.total_by_model || {} : n.data?.total_by_provider || {}), u = $(() => [
      { key: "name", label: r.value === "by_model" ? "Model" : "Provider", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ]), f = $(
      () => Object.entries(c.value).map(([m, v]) => ({
        id: m,
        name: m,
        avgCost: b(v.avg_cost_per_message),
        avgTokens: g(v.avg_tokens_per_message),
        messageCount: g(v.message_count),
        totalCost: b(v.total_cost),
        totalTokens: g(v.total_tokens)
      }))
    ), g = (m) => m == null ? "0" : ge(m), b = (m) => m == null ? "$0.00" : Oe(m);
    return t({ isDark: i }), (m, v) => (h(), ee(Se, {
      class: "h-full min-h-0",
      title: "Model Usage",
      subtitle: "AI model performance and costs",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !e.loading ? (h(), ee(L(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", j2, [
          d("div", H2, [
            z(Pl, {
              modelValue: r.value,
              "onUpdate:modelValue": v[0] || (v[0] = (p) => r.value = p),
              items: l,
              "aria-label": "Model Usage Tabs",
              "full-width": ""
            }, {
              default: O(() => [
                c.value && Object.keys(c.value).length > 0 ? (h(), x("div", W2, [
                  d("div", K2, [
                    z(ut, {
                      columns: u.value,
                      rows: f.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, null, 8, ["columns", "rows"])
                  ])
                ])) : (h(), x("div", U2, [
                  d("div", Y2, [
                    d("div", q2, [
                      z(L(dt), { class: "empty-icon" })
                    ]),
                    v[1] || (v[1] = d("p", { class: "empty-title" }, "No model usage data available", -1)),
                    v[2] || (v[2] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see model performance metrics.", -1))
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
}), G2 = /* @__PURE__ */ be(X2, [["__scopeId", "data-v-48a6cc07"]]), Z2 = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Q2 = { class: "card-body" }, J2 = {
  key: 0,
  class: "message-roles-table-block"
}, ew = { class: "w-full min-w-0" }, tw = {
  key: 1,
  class: "empty-state"
}, aw = { class: "empty-state-content" }, nw = { class: "empty-icon-wrapper" }, ow = /* @__PURE__ */ fe({
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
    }, { isDark: i } = Me($e(n, "theme")), l = ["assistant", "system", "user"], r = [
      { key: "role", label: "Role", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ], c = $(() => n.data?.total_by_role || {}), u = $(
      () => l.map((v) => ({
        id: v,
        role: m(v),
        avgCost: b(c.value[v]?.avg_cost_per_message),
        avgTokens: g(c.value[v]?.avg_tokens_per_message),
        messageCount: g(c.value[v]?.message_count),
        totalCost: b(c.value[v]?.total_cost),
        totalTokens: g(c.value[v]?.total_tokens)
      }))
    ), f = $(() => Object.keys(c.value).length > 0), g = (v) => v == null ? "0" : ge(v), b = (v) => v == null ? "$0.00" : Oe(v), m = (v) => v.charAt(0).toUpperCase() + v.slice(1);
    return t({ isDark: i }), (v, p) => (h(), ee(Se, {
      class: "h-full min-h-0",
      title: "Message Roles",
      subtitle: "Performance by message role",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !e.loading ? (h(), ee(L(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", Z2, [
          d("div", Q2, [
            f.value ? (h(), x("div", J2, [
              d("div", ew, [
                z(ut, {
                  columns: r,
                  rows: u.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, null, 8, ["rows"])
              ])
            ])) : (h(), x("div", tw, [
              d("div", aw, [
                d("div", nw, [
                  z(L(dt), { class: "empty-icon" })
                ]),
                p[0] || (p[0] = d("p", { class: "empty-title" }, "No message role data available", -1)),
                p[1] || (p[1] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), sw = /* @__PURE__ */ be(ow, [["__scopeId", "data-v-d38e854e"]]), iw = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, lw = { class: "card-body" }, rw = {
  key: 0,
  class: "chart-section"
}, cw = { class: "chart-container" }, dw = { class: "kpi-grid" }, uw = {
  key: 1,
  class: "empty-state"
}, hw = { class: "empty-state-content" }, fw = { class: "empty-icon-wrapper" }, gw = 40, mw = 230, pw = /* @__PURE__ */ fe({
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
    }, { isDark: i, colors: l } = Me($e(n, "theme")), r = {
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
    }, c = (_) => _.agent_type || _.agent_id || _.agent_name || "", u = (_) => _.agent_name ? kt(_.agent_name) : kt(c(_)).split("_").map((C) => C.charAt(0).toUpperCase() + C.slice(1)).join(" ").replace(/V\d+$/, "").trim(), f = (_) => {
      const w = c(_).toLowerCase();
      for (const [C, M] of Object.entries(r))
        if (w.includes(C))
          return M;
      return "#9ca3af";
    }, g = $(() => [...n.data?.top_agents || []].sort((w, C) => C.avg_cost_per_conversation - w.avg_cost_per_conversation)), b = $(
      () => Math.max(mw, g.value.length * gw + 32)
    ), m = $(() => n.data?.total_conversations !== void 0 ? Number(n.data.total_conversations) || 0 : g.value.reduce((_, w) => _ + w.conversations, 0)), v = $(() => n.data?.total_cost !== void 0 ? Number(n.data.total_cost) || 0 : g.value.reduce((_, w) => _ + w.total_cost, 0)), p = $(() => n.data?.overall_avg_cost_per_conversation !== void 0 ? Number(n.data.overall_avg_cost_per_conversation) || 0 : m.value === 0 ? 0 : v.value / m.value), y = $(() => {
      const _ = g.value;
      if (_.length === 0)
        return { labels: [], datasets: [] };
      const w = _.map((S) => u(S)), C = _.map((S) => S.avg_cost_per_conversation), M = _.map((S) => f(S));
      return {
        labels: w,
        datasets: [
          {
            label: "USD per conversation",
            data: C,
            backgroundColor: M.map((S) => `${S}80`),
            borderColor: M,
            borderWidth: 1
          }
        ]
      };
    }), k = $(() => n.options ? n.options : {
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
            title: function(_) {
              const w = g.value[_[0]?.dataIndex];
              return w ? u(w) : "";
            },
            label: function(_) {
              const w = g.value[_.dataIndex];
              return [
                `Cost: ${Oe(_.parsed.x)}`,
                `Conversations: ${ge(w.conversations)}`,
                `Total Cost: ${Oe(w.total_cost)}`
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
            color: l.value.gridLines,
            lineWidth: 1,
            drawTicks: !1
          },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 },
            color: l.value.textSecondary,
            padding: 8,
            callback: function(_) {
              return Oe(_);
            }
          }
        },
        y: {
          type: "category",
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
    return t({ isDark: i }), (_, w) => (h(), ee(Se, {
      class: "h-full min-h-0",
      title: "Cost Per Conversation",
      subtitle: "USD per conversation by agent",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !e.loading ? (h(), ee(L(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", iw, [
          d("div", lw, [
            y.value.labels && y.value.labels.length ? (h(), x("section", rw, [
              d("div", cw, [
                z($t, {
                  data: y.value,
                  options: k.value,
                  "height-px": b.value,
                  "category-label-max-length": 18
                }, null, 8, ["data", "options", "height-px"])
              ]),
              d("footer", dw, [
                z(L(ve), {
                  title: "Total Agents",
                  value: String(g.value.length)
                }, null, 8, ["value"]),
                z(L(ve), {
                  title: "Total Conversations",
                  value: L(ge)(m.value)
                }, null, 8, ["value"]),
                z(L(ve), {
                  title: "Total Cost",
                  value: L(Oe)(v.value)
                }, null, 8, ["value"]),
                z(L(ve), {
                  title: "Avg Cost / Conv.",
                  value: L(Oe)(p.value)
                }, null, 8, ["value"])
              ])
            ])) : (h(), x("section", uw, [
              d("div", hw, [
                d("div", fw, [
                  z(L(dt), { class: "empty-icon" })
                ]),
                w[0] || (w[0] = d("p", { class: "empty-title" }, "No cost per conversation data", -1)),
                w[1] || (w[1] = d("p", { class: "empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), bw = /* @__PURE__ */ be(pw, [["__scopeId", "data-v-2a8f51ca"]]);
function No(e, t) {
  const a = e[t];
  return Array.isArray(a) ? a.filter(
    (n) => n !== null && typeof n == "object" && !Array.isArray(n)
  ) : [];
}
function El(e, t) {
  const { childrenKey: a, sortKey: n, sortDirection: o, compare: s } = t;
  return [...e].sort((i, l) => s(i, l, n, o)).map((i) => {
    const l = No(i, a);
    return l.length === 0 ? i : {
      ...i,
      [a]: El(l, t)
    };
  });
}
function Ol(e, t, a = 0, n = null, o = 0) {
  const { childrenKey: s, expandedKeys: i, resolveRowKey: l, maxDepth: r } = t, c = [];
  return e.forEach((u, f) => {
    const g = l(u, o + f), b = No(u, s), m = b.length > 0, v = i.has(g);
    c.push({
      row: u,
      key: g,
      depth: a,
      hasChildren: m,
      isExpanded: v,
      parentKey: n
    }), m && v && (r === void 0 || a < r) && c.push(
      ...Ol(b, t, a + 1, g, 0)
    );
  }), c;
}
function Fl(e, t, a = 0, n = 0) {
  const { childrenKey: o, resolveRowKey: s, isRowSelectable: i } = t, l = [];
  return e.forEach((r, c) => {
    const u = s(r, n + c), f = No(r, o), g = f.length > 0, b = {
      depth: a,
      isChild: a > 0,
      hasChildren: g
    };
    (i?.(r, b) ?? !0) && l.push(u), f.length > 0 && l.push(
      ...Fl(f, t, a + 1, 0)
    );
  }), l;
}
const vw = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, yw = { class: "w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden" }, xw = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, kw = {
  key: 0,
  scope: "col",
  class: "w-14 bg-transparent px-4 py-3 text-center align-middle"
}, _w = ["checked", "aria-label"], ww = ["aria-sort", "onClick"], Cw = {
  class: "kiut-table-sort-icons inline-flex items-center",
  "aria-hidden": "true"
}, $w = {
  key: 0,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, Sw = {
  key: 1,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, Mw = {
  key: 0,
  class: "kiut-table-body-cell w-12 bg-transparent pl-4 pr-0 py-0 text-center align-middle"
}, Dw = ["checked", "aria-label", "onChange"], Aw = ["aria-expanded", "aria-label", "onClick"], Tw = ["aria-expanded", "aria-label", "onClick"], Bw = {
  key: 1,
  class: "inline-block w-4 shrink-0",
  "aria-hidden": "true"
}, Lw = { class: "min-w-0 flex-1" }, Rw = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = ne(null), s = ne([...a.defaultExpandedKeys]), i = $({
      get() {
        return a.expandedKeys ?? s.value;
      },
      set(R) {
        s.value = R, n("update:expandedKeys", R);
      }
    }), l = $(
      () => new Set(i.value)
    ), r = $(
      () => a.expandColumnKey ?? a.columns[0]?.key ?? ""
    ), c = $(() => ({
      childrenKey: a.childrenKey,
      expandedKeys: l.value,
      resolveRowKey: m,
      maxDepth: a.maxDepth
    })), u = $(() => {
      const { sortKey: R, sortDirection: K, sortCompare: Y, rows: N } = a;
      return !R || !K || !Y ? N : a.expandable ? El(N, {
        childrenKey: a.childrenKey,
        sortKey: R,
        sortDirection: K,
        compare: Y
      }) : [...N].sort((ie, ce) => Y(ie, ce, R, K));
    }), f = $(() => a.expandable ? Ol(u.value, c.value) : u.value.map((R, K) => ({
      row: R,
      key: m(R, K),
      depth: 0,
      hasChildren: !1,
      isExpanded: !1,
      parentKey: null
    })));
    function g(R) {
      return `cell-${R}`;
    }
    function b(R) {
      return R === "center" ? "text-center" : R === "right" ? "text-right" : "text-left";
    }
    function m(R, K) {
      if (typeof a.rowKey == "function")
        return a.rowKey(R);
      const Y = R[a.rowKey];
      return Y != null ? String(Y) : `__index_${K}`;
    }
    function v(R, K) {
      return R[K];
    }
    function p(R) {
      return R == null || typeof R == "object" ? "" : String(R);
    }
    function y(R) {
      return a.expandable && R === r.value;
    }
    function k(R) {
      return R.hasChildren || (a.isRowExpandable?.(R.row) ?? !1);
    }
    function _(R, K) {
      return {
        row: R.row,
        column: K,
        value: v(R.row, K.key),
        depth: R.depth,
        isChild: R.depth > 0,
        hasChildren: R.hasChildren,
        expanded: R.isExpanded
      };
    }
    function w(R) {
      if (!k(R)) return;
      const K = new Set(i.value);
      K.has(R.key) ? (K.delete(R.key), n("collapse", R.key, R.row)) : (a.singleExpand && K.clear(), K.add(R.key), n("expand", R.key, R.row)), i.value = [...K];
    }
    function C(R) {
      return {
        depth: R.depth,
        isChild: R.depth > 0,
        hasChildren: R.hasChildren
      };
    }
    function M(R, K) {
      return a.isRowSelectable?.(R, K) ?? !0;
    }
    function S(R) {
      return M(R.row, C(R));
    }
    function I(R) {
      return a.selectable && k(R) && !S(R);
    }
    function V(R) {
      return k(R) && !I(R);
    }
    function H(R) {
      return V(R) ? !1 : R.depth > 0 ? !0 : a.selectable && !k(R);
    }
    const D = $(() => {
      const { isRowSelectable: R } = a;
      return a.expandable ? Fl(u.value, {
        childrenKey: a.childrenKey,
        resolveRowKey: m,
        isRowSelectable: R
      }) : u.value.map((K, Y) => ({
        row: K,
        key: m(K, Y),
        context: {
          depth: 0,
          isChild: !1,
          hasChildren: !1
        }
      })).filter(({ row: K, context: Y }) => M(K, Y)).map(({ key: K }) => K);
    });
    function T(R) {
      const K = String(R);
      return a.selectedKeys.some((Y) => String(Y) === K);
    }
    const B = $(() => !a.selectable || D.value.length === 0 ? !1 : D.value.every(
      (R) => a.selectedKeys.some((K) => String(K) === String(R))
    )), j = $(() => {
      if (!a.selectable || D.value.length === 0) return !1;
      const R = D.value.filter(
        (K) => a.selectedKeys.some((Y) => String(Y) === String(K))
      );
      return R.length > 0 && R.length < D.value.length;
    });
    Le(
      [j, B, () => a.selectable],
      async () => {
        await We();
        const R = o.value;
        R && (R.indeterminate = j.value && !B.value);
      },
      { immediate: !0 }
    );
    function W() {
      if (a.selectable)
        if (B.value) {
          const R = new Set(
            D.value.map((Y) => String(Y))
          ), K = a.selectedKeys.filter(
            (Y) => !R.has(String(Y))
          );
          n("update:selectedKeys", K);
        } else {
          const R = new Set(a.selectedKeys.map((K) => String(K)));
          D.value.forEach((K) => R.add(String(K))), n("update:selectedKeys", [...R]);
        }
    }
    function J(R) {
      if (!a.selectable) return;
      const K = String(R), Y = f.value.find((ie) => String(ie.key) === K);
      if (Y && !S(Y) || !Y && !D.value.some((ie) => String(ie) === K))
        return;
      a.selectedKeys.some((ie) => String(ie) === K) ? n(
        "update:selectedKeys",
        a.selectedKeys.filter((ie) => String(ie) !== K)
      ) : n("update:selectedKeys", [...a.selectedKeys, K]);
    }
    function re(R) {
      return `${a.ariaLabelSelectRow} ${R}`;
    }
    function ue(R) {
      n("sort", R);
    }
    function q(R) {
      return a.sortKey === R && a.sortDirection != null;
    }
    function oe(R) {
      return q(R) ? a.sortDirection === "asc" ? "ascending" : "descending" : "none";
    }
    return (R, K) => (h(), x("div", vw, [
      d("div", yw, [
        d("table", {
          class: Z([
            "kiut-table w-full min-w-[640px] overflow-hidden border-collapse text-left text-sm",
            e.fixedLayout ? "table-fixed" : ""
          ])
        }, [
          d("thead", null, [
            d("tr", xw, [
              e.selectable ? (h(), x("th", kw, [
                d("input", {
                  ref_key: "selectAllRef",
                  ref: o,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: B.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: W
                }, null, 40, _w)
              ])) : F("", !0),
              (h(!0), x(he, null, pe(e.columns, (Y) => (h(), x("th", {
                key: Y.key,
                scope: "col",
                class: Z([
                  "px-2 py-3 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]",
                  y(Y.key) && e.selectable ? "!pl-0" : "",
                  b(Y.align),
                  Y.headerClass ?? ""
                ])
              }, [
                Y.sortable ? (h(), x("button", {
                  key: 0,
                  type: "button",
                  class: Z(["kiut-table-sort-btn inline-flex items-center gap-1", b(Y.align)]),
                  "aria-sort": oe(Y.key),
                  onClick: (N) => ue(Y.key)
                }, [
                  d("span", null, A(Y.label), 1),
                  d("span", Cw, [
                    q(Y.key) ? (h(), x(he, { key: 0 }, [
                      e.sortDirection === "asc" ? (h(), x("span", $w, "↑")) : e.sortDirection === "desc" ? (h(), x("span", Sw, "↓")) : F("", !0)
                    ], 64)) : (h(), x(he, { key: 1 }, [
                      K[0] || (K[0] = d("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      K[1] || (K[1] = d("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, ww)) : (h(), x(he, { key: 1 }, [
                  Ae(A(Y.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          d("tbody", null, [
            (h(!0), x(he, null, pe(f.value, (Y) => (h(), x("tr", {
              key: Y.key,
              class: Z([
                "kiut-table-body-row border-b border-[#e5e7eb] last:border-b-0 bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]",
                Y.depth > 0 ? "kiut-table-row--child dark:bg-[#1a1a22]" : ""
              ])
            }, [
              e.selectable ? (h(), x("td", Mw, [
                S(Y) ? (h(), x("input", {
                  key: 0,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: T(Y.key),
                  "aria-label": re(Y.key),
                  onChange: (N) => J(Y.key)
                }, null, 40, Dw)) : I(Y) ? (h(), x("button", {
                  key: 1,
                  type: "button",
                  class: "kiut-table-expand-btn shrink-0",
                  "aria-expanded": Y.isExpanded,
                  "aria-label": Y.isExpanded ? e.ariaLabelCollapseRow : e.ariaLabelExpandRow,
                  onClick: Re((N) => w(Y), ["stop"])
                }, [
                  z(L(na), {
                    class: Z(["h-5 w-5 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !Y.isExpanded }]),
                    "aria-hidden": "true"
                  }, null, 8, ["class"])
                ], 8, Aw)) : F("", !0)
              ])) : F("", !0),
              (h(!0), x(he, null, pe(e.columns, (N) => (h(), x("td", {
                key: N.key,
                class: Z([
                  "kiut-table-body-cell bg-transparent py-0 align-middle text-[color:var(--kiut-text-secondary)]",
                  y(N.key) ? "pl-0 pr-2" : "px-2",
                  b(N.align),
                  N.cellClass ?? ""
                ])
              }, [
                y(N.key) ? (h(), x("div", {
                  key: 0,
                  class: "flex min-w-0 items-start gap-1",
                  style: Ce({ paddingLeft: `${Y.depth * 1.25}rem` })
                }, [
                  _e(R.$slots, "row-expand", {
                    row: Y.row,
                    expanded: Y.isExpanded,
                    hasChildren: Y.hasChildren,
                    depth: Y.depth,
                    toggle: () => w(Y)
                  }, () => [
                    V(Y) ? (h(), x("button", {
                      key: 0,
                      type: "button",
                      class: "kiut-table-expand-btn shrink-0",
                      "aria-expanded": Y.isExpanded,
                      "aria-label": Y.isExpanded ? e.ariaLabelCollapseRow : e.ariaLabelExpandRow,
                      onClick: Re((ie) => w(Y), ["stop"])
                    }, [
                      z(L(na), {
                        class: Z(["h-5 w-5 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !Y.isExpanded }]),
                        "aria-hidden": "true"
                      }, null, 8, ["class"])
                    ], 8, Tw)) : H(Y) ? (h(), x("span", Bw)) : F("", !0)
                  ], !0),
                  d("div", Lw, [
                    _e(R.$slots, g(N.key), yt({ ref_for: !0 }, _(Y, N)), () => [
                      Ae(A(p(v(Y.row, N.key))), 1)
                    ], !0)
                  ])
                ], 4)) : _e(R.$slots, g(N.key), yt({
                  key: 1,
                  ref_for: !0
                }, _(Y, N)), () => [
                  Ae(A(p(v(Y.row, N.key))), 1)
                ], !0)
              ], 2))), 128))
            ], 2))), 128))
          ])
        ], 2)
      ])
    ]));
  }
}), Iw = /* @__PURE__ */ be(Rw, [["__scopeId", "data-v-b3104817"]]), yi = /* @__PURE__ */ fe({
  name: "ButtonLoadingSpinner",
  __name: "ButtonLoadingSpinner",
  props: {
    compact: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, a = $(
      () => t.compact ? "size-4" : "h-[1.125rem] w-[1.125rem]"
    );
    return (n, o) => (h(), x("svg", {
      class: Z(["inline-flex shrink-0 animate-spin", a.value]),
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "2.5",
      "stroke-linecap": "round",
      "aria-hidden": "true"
    }, [...o[0] || (o[0] = [
      d("circle", {
        cx: "12",
        cy: "12",
        r: "10",
        "stroke-opacity": "0.25"
      }, null, -1),
      d("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
    ])], 2));
  }
}), Pw = ["disabled", "aria-expanded", "aria-label"], Ew = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]",
  "aria-hidden": "true"
}, Ow = { class: "min-w-0 truncate" }, Fw = ["disabled", "onClick", "onMouseenter"], Vw = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, Nw = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, zw = { class: "min-w-0 flex-1 text-left" }, jw = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, Hw = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Ww = ["disabled", "aria-expanded", "aria-label"], Kw = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:size-4",
  "aria-hidden": "true"
}, Uw = ["disabled", "onClick", "onMouseenter"], Yw = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, qw = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, Xw = { class: "min-w-0 flex-1 text-left" }, Gw = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, Zw = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Qw = {
  key: 2,
  class: "group relative inline-flex shrink-0"
}, Jw = ["type", "disabled", "aria-busy", "aria-label"], e5 = {
  key: 2,
  class: "min-w-0 truncate"
}, t5 = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, a5 = ["type", "disabled", "aria-busy", "aria-label"], n5 = {
  key: 2,
  class: "min-w-0 truncate"
}, Mt = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = en(), s = $(
      () => !!a.tooltip?.trim() && a.variant !== "dropdown" && a.variant !== "split"
    ), i = $(() => a.variant === "dropdown"), l = $(() => a.variant === "split"), r = $(() => a.variant === "action"), c = $(() => !r.value && !l.value), u = $(() => a.disabled || a.loading), f = $(
      () => a.loading ? "cursor-wait disabled:pointer-events-none" : "disabled:pointer-events-none disabled:opacity-45"
    ), g = $(() => {
      const R = o["aria-label"];
      if (typeof R == "string" && R.length > 0) return R;
      if ((r.value || l.value) && a.tooltip?.trim()) return a.tooltip.trim();
    }), b = $(() => {
      const R = o.type;
      return R === "submit" || R === "reset" || R === "button" ? R : "button";
    }), m = $(() => {
      const { class: R, type: K, "aria-label": Y, ...N } = o;
      return N;
    }), v = $(() => a.variant === "primary" || a.variant === "dropdown" ? [
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
    ]), p = `kiut-button-menu-${Ke()}`, y = `${p}-btn`, k = `${p}-menu`, _ = ne(null), w = ne(null), C = ne(null), M = ne(!1), S = ne(0), I = ne({}), V = $(() => a.options.filter((R) => !R.disabled));
    function H(R) {
      return `${R.value}-${R.label}`;
    }
    function D() {
      const R = w.value;
      if (!R) return;
      const K = R.getBoundingClientRect(), Y = {
        top: `${K.bottom - 3}px`,
        minWidth: `max(${K.width}px, ${a.menuMinWidth})`
      };
      a.menuAlign === "right" ? (Y.right = `${window.innerWidth - K.right}px`, Y.left = "auto") : (Y.left = `${K.left}px`, Y.right = "auto"), I.value = Y;
    }
    function T(R) {
      return [
        "mx-1 flex w-full cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 text-left outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-45",
        S.value === R ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function B() {
      M.value = !1;
    }
    function j() {
      D(), S.value = 0, We(() => C.value?.focus());
    }
    function W() {
      if (!a.disabled) {
        if (M.value) {
          B();
          return;
        }
        M.value = !0, j();
      }
    }
    function J(R) {
      R.disabled || (n("select", R), B());
    }
    function re(R) {
      R.stopPropagation(), W();
    }
    function ue(R) {
      if (!M.value) return;
      const K = R.target, Y = _.value, N = C.value;
      Y && !Y.contains(K) && (!N || !N.contains(K)) && B();
    }
    function q(R) {
      a.disabled || (R.key === "ArrowDown" || R.key === "Enter" || R.key === " ") && (R.preventDefault(), M.value || (M.value = !0, j()));
    }
    function oe(R) {
      const K = V.value;
      if (R.key === "Escape") {
        R.preventDefault(), B(), w.value?.focus();
        return;
      }
      if (K.length !== 0) {
        if (R.key === "ArrowDown") {
          R.preventDefault(), S.value = Math.min(S.value + 1, K.length - 1);
          return;
        }
        if (R.key === "ArrowUp") {
          R.preventDefault(), S.value = Math.max(S.value - 1, 0);
          return;
        }
        if (R.key === "Enter" || R.key === " ") {
          R.preventDefault();
          const Y = K[S.value];
          Y && J(Y);
        }
      }
    }
    return Je(() => {
      document.addEventListener("click", ue);
    }), at(() => {
      document.removeEventListener("click", ue);
    }), (R, K) => i.value ? (h(), x("div", {
      key: 0,
      ref_key: "rootRef",
      ref: _,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      d("button", yt({
        ref_key: "buttonRef",
        ref: w,
        id: y,
        type: "button",
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [v.value, L(o).class]],
        disabled: e.disabled,
        "aria-expanded": M.value,
        "aria-haspopup": "menu",
        "aria-controls": k,
        "aria-label": g.value
      }, m.value, {
        onClick: re,
        onKeydown: q
      }), [
        R.$slots.icon ? (h(), x("span", Ew, [
          _e(R.$slots, "icon")
        ])) : F("", !0),
        d("span", Ow, [
          _e(R.$slots, "default")
        ]),
        z(L(na), {
          class: Z(["h-[1.125rem] w-[1.125rem] shrink-0 transition-transform", M.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 16, Pw),
      (h(), ee(Wt, { to: "body" }, [
        Qe(d("div", {
          ref_key: "panelRef",
          ref: C,
          id: k,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: Ce(I.value),
          onKeydown: Re(oe, ["stop"])
        }, [
          (h(!0), x(he, null, pe(V.value, (Y, N) => (h(), x("button", {
            key: H(Y),
            type: "button",
            role: "menuitem",
            disabled: Y.disabled,
            class: Z(T(N)),
            onClick: Re((ie) => J(Y), ["stop"]),
            onMouseenter: (ie) => S.value = N
          }, [
            Y.icon ? (h(), x("span", Vw, [
              (h(), ee(rt(Y.icon), { class: "h-5 w-5" }))
            ])) : (h(), x("span", Nw)),
            d("span", zw, [
              d("span", jw, A(Y.label), 1),
              Y.description ? (h(), x("span", Hw, A(Y.description), 1)) : F("", !0)
            ])
          ], 42, Fw))), 128))
        ], 36), [
          [Kt, M.value]
        ])
      ]))
    ], 512)) : l.value ? (h(), x("div", {
      key: 1,
      ref_key: "rootRef",
      ref: _,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      d("button", yt({
        ref_key: "buttonRef",
        ref: w,
        type: "button",
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [v.value, L(o).class]],
        disabled: e.disabled,
        "aria-expanded": M.value,
        "aria-haspopup": "menu",
        "aria-controls": k,
        "aria-label": g.value
      }, m.value, {
        onClick: re,
        onKeydown: q
      }), [
        R.$slots.icon ? (h(), x("span", Kw, [
          _e(R.$slots, "icon")
        ])) : F("", !0)
      ], 16, Ww),
      (h(), ee(Wt, { to: "body" }, [
        Qe(d("div", {
          ref_key: "panelRef",
          ref: C,
          id: k,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: Ce(I.value),
          onKeydown: Re(oe, ["stop"])
        }, [
          (h(!0), x(he, null, pe(V.value, (Y, N) => (h(), x("button", {
            key: H(Y),
            type: "button",
            role: "menuitem",
            disabled: Y.disabled,
            class: Z(T(N)),
            onClick: Re((ie) => J(Y), ["stop"]),
            onMouseenter: (ie) => S.value = N
          }, [
            Y.icon ? (h(), x("span", Yw, [
              (h(), ee(rt(Y.icon), { class: "h-5 w-5" }))
            ])) : (h(), x("span", qw)),
            d("span", Xw, [
              d("span", Gw, A(Y.label), 1),
              Y.description ? (h(), x("span", Zw, A(Y.description), 1)) : F("", !0)
            ])
          ], 42, Uw))), 128))
        ], 36), [
          [Kt, M.value]
        ])
      ]))
    ], 512)) : s.value ? (h(), x("span", Qw, [
      d("button", yt({
        type: b.value,
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [f.value, v.value, L(o).class]],
        disabled: u.value,
        "aria-busy": e.loading || void 0,
        "aria-label": g.value
      }, m.value), [
        e.loading ? (h(), ee(yi, {
          key: 0,
          compact: r.value
        }, null, 8, ["compact"])) : R.$slots.icon ? (h(), x("span", {
          key: 1,
          class: Z(["inline-flex shrink-0", r.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          _e(R.$slots, "icon")
        ], 2)) : F("", !0),
        c.value ? (h(), x("span", e5, [
          _e(R.$slots, "default")
        ])) : F("", !0)
      ], 16, Jw),
      d("span", t5, A(e.tooltip), 1)
    ])) : (h(), x("button", yt({
      key: 3,
      type: b.value,
      class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [f.value, v.value, L(o).class]],
      disabled: u.value,
      "aria-busy": e.loading || void 0,
      "aria-label": g.value
    }, m.value), [
      e.loading ? (h(), ee(yi, {
        key: 0,
        compact: r.value
      }, null, 8, ["compact"])) : R.$slots.icon ? (h(), x("span", {
        key: 1,
        class: Z(["inline-flex shrink-0", r.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        _e(R.$slots, "icon")
      ], 2)) : F("", !0),
      c.value ? (h(), x("span", n5, [
        _e(R.$slots, "default")
      ])) : F("", !0)
    ], 16, a5));
  }
}), o5 = ["id", "data-kiut-toggle-size", "aria-checked", "aria-disabled", "disabled", "onKeydown"], s5 = { class: "sr-only" }, Vl = /* @__PURE__ */ fe({
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
    return (s, i) => (h(), x("button", {
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
        $a(Re(o, ["prevent", "stop"]), ["space"]),
        $a(Re(o, ["prevent"]), ["enter"])
      ]
    }, [
      d("span", {
        class: Z(["pointer-events-none inline-block translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", [
          e.size === "sm" ? "h-5 w-5" : "h-7 w-7",
          e.modelValue ? e.size === "sm" ? "translate-x-5" : "translate-x-7" : "translate-x-0"
        ]]),
        "aria-hidden": "true"
      }, null, 2),
      d("span", s5, A(e.ariaLabel), 1)
    ], 42, o5));
  }
}), i5 = {
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
}, l5 = [
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
], zM = [
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
], r5 = { class: "kiut-table-versions-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, c5 = { class: "w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden" }, d5 = { class: "kiut-table-versions w-full min-w-[640px] table-fixed border-collapse text-left text-sm" }, u5 = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, h5 = { class: "h-14 border-b border-[#e5e7eb] bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]" }, f5 = {
  key: 0,
  class: "flex min-w-0 items-center gap-1.5"
}, g5 = ["aria-expanded", "aria-label", "onClick"], m5 = { class: "min-w-0 flex-1" }, p5 = {
  key: 0,
  class: "border-b border-[#e5e7eb] bg-[#f9fafb] dark:border-[color:var(--kiut-border-light)] dark:bg-[#1a1a22]"
}, b5 = ["colspan"], v5 = { class: "mb-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-muted)]" }, y5 = ["aria-label"], x5 = {
  key: 1,
  class: "text-sm text-[color:var(--kiut-text-muted)]"
}, k5 = {
  key: 2,
  class: "space-y-2"
}, _5 = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)]" }, w5 = ["title"], C5 = { class: "whitespace-nowrap text-xs text-[color:var(--kiut-text-muted)]" }, $5 = { class: "ml-auto flex shrink-0 items-center gap-2" }, S5 = /* @__PURE__ */ fe({
  name: "TableVersions",
  __name: "TableVersions",
  props: {
    rows: { default: () => [] },
    columns: { default: () => l5 },
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
    const a = e, n = t, o = ne([...a.defaultExpandedKeys]), s = $({
      get() {
        return a.expandedKeys ?? o.value;
      },
      set(D) {
        o.value = D, n("update:expandedKeys", D);
      }
    }), i = $(() => ({
      ...i5,
      ...a.labels
    })), l = $(
      () => a.expandColumnKey ?? a.columns[0]?.key ?? ""
    ), r = {
      GET: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
      POST: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
      PUT: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
      PATCH: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
      DELETE: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
    };
    function c(D) {
      return `cell-${D}`;
    }
    function u(D, T, B) {
      return {
        row: D,
        column: T,
        index: B,
        expanded: v(D, B)
      };
    }
    function f(D) {
      const T = D.key;
      return D.label ? D.label : T in i.value ? i.value[T] : D.key;
    }
    function g(D) {
      return D === "center" ? "text-center" : D === "right" ? "text-right" : "text-left";
    }
    function b(D) {
      return D === l.value;
    }
    function m(D, T) {
      if (typeof a.rowKey == "function")
        return a.rowKey(D);
      const B = D[a.rowKey];
      return B != null ? String(B) : `__index_${T}`;
    }
    function v(D, T) {
      return s.value.includes(m(D, T));
    }
    function p(D) {
      return D.versionsLoading === !0;
    }
    function y(D, T) {
      const B = m(D, T), j = new Set(s.value);
      j.has(B) ? (j.delete(B), n("collapse", B, D)) : (a.singleExpand && j.clear(), j.add(B), n("expand", B, D)), s.value = [...j];
    }
    function k(D) {
      return D.type ?? D.key;
    }
    function _(D) {
      return r[D] ?? "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300";
    }
    function w(D) {
      return D === "published" ? "success" : "warning";
    }
    function C(D) {
      const T = D instanceof Date ? D : new Date(D);
      return Number.isNaN(T.getTime()) ? String(D) : T.toLocaleDateString("es-ES");
    }
    function M(D) {
      const T = D instanceof Date ? D : new Date(D);
      return Number.isNaN(T.getTime()) ? String(D) : T.toLocaleString("es-ES");
    }
    function S(D) {
      return He("div", { class: "min-w-0" }, [
        He(
          "p",
          { class: "truncate font-medium text-[color:var(--kiut-text-primary)]" },
          D.name
        ),
        D.description ? He(
          "p",
          { class: "truncate text-xs text-[color:var(--kiut-text-muted)]" },
          D.description
        ) : null
      ]);
    }
    function I(D) {
      return D.method ? He(
        "span",
        {
          class: [
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
            _(D.method)
          ]
        },
        D.method
      ) : null;
    }
    function V(D, T) {
      const B = T.actions ?? ["view", "edit"], j = [];
      for (const W of B)
        W === "view" ? j.push(
          He(
            Mt,
            {
              variant: "action",
              tooltip: i.value.view,
              ariaLabel: i.value.view,
              onClick: () => n("view", D)
            },
            { icon: () => He(hi, { class: "h-4 w-4" }) }
          )
        ) : W === "run" ? j.push(
          He(
            Mt,
            {
              variant: "action",
              tooltip: i.value.run,
              ariaLabel: i.value.run,
              onClick: () => n("run", D)
            },
            { icon: () => He(cp, { class: "h-4 w-4" }) }
          )
        ) : W === "edit" ? j.push(
          He(
            Mt,
            {
              variant: "action",
              tooltip: i.value.edit,
              ariaLabel: i.value.edit,
              onClick: () => n("edit", D)
            },
            { icon: () => He(rp, { class: "h-4 w-4" }) }
          )
        ) : W === "createDraft" ? j.push(
          He(
            Mt,
            {
              variant: "action",
              tooltip: i.value.createDraft,
              ariaLabel: i.value.createDraft,
              onClick: () => n("createDraft", D)
            },
            { icon: () => He(ui, { class: "h-4 w-4" }) }
          )
        ) : W === "delete" && j.push(
          He(
            Mt,
            {
              variant: "action",
              tone: "danger",
              tooltip: i.value.delete,
              ariaLabel: i.value.delete,
              onClick: () => n("delete", D)
            },
            { icon: () => He(dp, { class: "h-4 w-4" }) }
          )
        );
      return He(
        "div",
        { class: "flex items-center justify-end gap-1" },
        j
      );
    }
    function H(D, T, B) {
      switch (k(T)) {
        case "name":
          return S(D);
        case "method":
          return I(D);
        case "url":
          return D.url ? He(
            "span",
            {
              class: "block truncate font-mono text-xs text-[color:var(--kiut-text-secondary)]",
              title: D.url
            },
            D.url
          ) : null;
        case "status":
          return He(
            Xe,
            { color: w(D.status), outlined: !1 },
            () => D.status
          );
        case "version":
          return He("span", {}, D.version);
        case "updated":
          return He(
            "span",
            { class: "whitespace-nowrap text-xs" },
            C(D.updatedAt)
          );
        case "active":
          return He(Vl, {
            modelValue: D.active ?? !1,
            ariaLabel: i.value.toggleActive,
            "onUpdate:modelValue": (W) => n("toggleActive", D, W)
          });
        case "actions":
          return V(D, T);
        default:
          return He("span", {}, String(D[T.key] ?? ""));
      }
    }
    return (D, T) => (h(), x("div", r5, [
      d("div", c5, [
        d("table", d5, [
          d("thead", null, [
            d("tr", u5, [
              (h(!0), x(he, null, pe(e.columns, (B) => (h(), x("th", {
                key: B.key,
                scope: "col",
                class: Z([
                  "px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-table-header)]",
                  g(B.align),
                  B.headerClass ?? ""
                ])
              }, A(f(B)), 3))), 128))
            ])
          ]),
          d("tbody", null, [
            (h(!0), x(he, null, pe(e.rows, (B, j) => (h(), x(he, {
              key: m(B, j)
            }, [
              d("tr", h5, [
                (h(!0), x(he, null, pe(e.columns, (W) => (h(), x("td", {
                  key: W.key,
                  class: Z([
                    "px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]",
                    g(W.align),
                    W.cellClass ?? ""
                  ])
                }, [
                  _e(D.$slots, c(W.key), yt({ ref_for: !0 }, u(B, W, j)), () => [
                    b(W.key) ? (h(), x("div", f5, [
                      d("button", {
                        type: "button",
                        class: "kiut-table-versions-expand-btn shrink-0",
                        "aria-expanded": v(B, j),
                        "aria-label": v(B, j) ? i.value.collapseRow : i.value.expandRow,
                        onClick: (J) => y(B, j)
                      }, [
                        z(L(na), {
                          class: Z(["h-4 w-4 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !v(B, j) }]),
                          "aria-hidden": "true"
                        }, null, 8, ["class"])
                      ], 8, g5),
                      d("div", m5, [
                        (h(), ee(rt(() => H(B, W))))
                      ])
                    ])) : (h(), ee(rt(() => H(B, W)), { key: 1 }))
                  ], !0)
                ], 2))), 128))
              ]),
              v(B, j) ? (h(), x("tr", p5, [
                d("td", {
                  colspan: e.columns.length,
                  class: "py-3 px-4"
                }, [
                  d("h4", v5, A(i.value.historialTitle), 1),
                  p(B) ? (h(), x("div", {
                    key: 0,
                    class: "space-y-2",
                    role: "status",
                    "aria-busy": "true",
                    "aria-label": i.value.loadingHistory
                  }, [
                    (h(!0), x(he, null, pe(e.historySkeletonCount, (W) => (h(), x("div", {
                      key: W,
                      class: "flex flex-wrap items-center gap-3 rounded-lg border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] px-4 py-3 dark:border-[color:var(--kiut-border-light)]",
                      "aria-hidden": "true"
                    }, [...T[0] || (T[0] = [
                      ao('<div class="kiut-table-versions-skeleton h-5 w-16 rounded-full" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 w-8" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 w-14 rounded-full" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 min-w-[8rem] flex-1" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 w-28" data-v-177ecafb></div>', 5)
                    ])]))), 128))
                  ], 8, y5)) : B.versions?.length ? (h(), x("div", k5, [
                    (h(!0), x(he, null, pe(B.versions, (W) => (h(), x("div", {
                      key: W.id,
                      class: "flex flex-wrap items-center gap-3 rounded-lg border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] px-4 py-3 dark:border-[color:var(--kiut-border-light)]"
                    }, [
                      _e(D.$slots, "history-item", {
                        version: W,
                        row: B
                      }, () => [
                        z(Xe, {
                          color: "neutral",
                          outlined: ""
                        }, {
                          default: O(() => [
                            Ae(A(W.status), 1)
                          ]),
                          _: 2
                        }, 1024),
                        d("span", _5, A(W.version), 1),
                        W.method ? (h(), x("span", {
                          key: 0,
                          class: Z(["inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold", _(W.method)])
                        }, A(W.method), 3)) : F("", !0),
                        W.url ? (h(), x("span", {
                          key: 1,
                          class: "min-w-0 flex-1 truncate font-mono text-xs text-[color:var(--kiut-text-secondary)]",
                          title: W.url
                        }, A(W.url), 9, w5)) : F("", !0),
                        d("span", C5, A(M(W.updatedAt)), 1)
                      ], !0),
                      d("div", $5, [
                        _e(D.$slots, "history-actions", {
                          version: W,
                          row: B
                        }, () => [
                          z(Mt, {
                            variant: "secondary",
                            class: "!min-h-8 !px-3 !py-1.5 !text-xs",
                            onClick: (J) => n("viewVersion", W, B)
                          }, {
                            icon: O(() => [
                              z(L(hi), { class: "h-4 w-4" })
                            ]),
                            default: O(() => [
                              Ae(" " + A(i.value.viewVersion), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          z(Mt, {
                            variant: "secondary",
                            class: "!min-h-8 !px-3 !py-1.5 !text-xs",
                            onClick: (J) => n("createDraftFromVersion", W, B)
                          }, {
                            icon: O(() => [
                              z(L(ui), { class: "h-4 w-4" })
                            ]),
                            default: O(() => [
                              Ae(" " + A(i.value.createDraftFromVersion), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ], !0)
                      ])
                    ]))), 128))
                  ])) : (h(), x("p", x5, A(i.value.emptyHistory), 1))
                ], 8, b5)
              ])) : F("", !0)
            ], 64))), 128))
          ])
        ])
      ])
    ]));
  }
}), M5 = /* @__PURE__ */ be(S5, [["__scopeId", "data-v-177ecafb"]]);
function xi(e, t) {
  return h(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "fill-rule": "evenodd",
      d: "M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z",
      "clip-rule": "evenodd"
    })
  ]);
}
function D5(e, t) {
  return h(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "fill-rule": "evenodd",
      d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
      "clip-rule": "evenodd"
    })
  ]);
}
function A5(e, t) {
  return h(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "fill-rule": "evenodd",
      d: "M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
      "clip-rule": "evenodd"
    })
  ]);
}
function T5(e, t) {
  return h(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "fill-rule": "evenodd",
      d: "M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z",
      "clip-rule": "evenodd"
    })
  ]);
}
function B5(e, t) {
  return h(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", { d: "M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" })
  ]);
}
function L5(e, t) {
  return h(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", { d: "M15.98 1.804a1 1 0 0 0-1.96 0l-.24 1.192a1 1 0 0 1-.784.785l-1.192.238a1 1 0 0 0 0 1.962l1.192.238a1 1 0 0 1 .785.785l.238 1.192a1 1 0 0 0 1.962 0l.238-1.192a1 1 0 0 1 .785-.785l1.192-.238a1 1 0 0 0 0-1.962l-1.192-.238a1 1 0 0 1-.785-.785l-.238-1.192ZM6.949 5.684a1 1 0 0 0-1.898 0l-.683 2.051a1 1 0 0 1-.633.633l-2.051.683a1 1 0 0 0 0 1.898l2.051.684a1 1 0 0 1 .633.632l.683 2.051a1 1 0 0 0 1.898 0l.683-2.051a1 1 0 0 1 .633-.633l2.051-.683a1 1 0 0 0 0-1.898l-2.051-.683a1 1 0 0 1-.633-.633L6.95 5.684ZM13.949 13.684a1 1 0 0 0-1.898 0l-.184.551a1 1 0 0 1-.632.633l-.551.183a1 1 0 0 0 0 1.898l.551.183a1 1 0 0 1 .633.633l.183.551a1 1 0 0 0 1.898 0l.184-.551a1 1 0 0 1 .632-.633l.551-.183a1 1 0 0 0 0-1.898l-.551-.184a1 1 0 0 1-.633-.632l-.183-.551Z" })
  ]);
}
function R5(e, t) {
  return h(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", {
      "fill-rule": "evenodd",
      d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z",
      "clip-rule": "evenodd"
    })
  ]);
}
function I5(e, t) {
  return h(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", { d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" })
  ]);
}
const P5 = ["aria-label"], E5 = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, O5 = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, F5 = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, V5 = ["aria-label", "aria-expanded", "aria-controls", "onClick"], N5 = { class: "truncate" }, z5 = {
  key: 0,
  class: "ml-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--kiut-primary)]/20 px-1 text-[10px] font-semibold tabular-nums text-[color:var(--kiut-primary-default)] dark:bg-[color:var(--kiut-primary)]/25 dark:text-[color:var(--kiut-primary-light)]"
}, j5 = {
  key: 0,
  class: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5"
}, H5 = { class: "flex min-w-0 flex-wrap items-center gap-1.5" }, W5 = ["aria-label", "onClick"], K5 = ["aria-label", "onClick"], U5 = ["aria-label"], Y5 = ["aria-label"], q5 = {
  key: 1,
  class: "space-y-2"
}, X5 = ["for"], G5 = ["id", "placeholder", "onKeydown"], Z5 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, Q5 = ["aria-label"], J5 = { class: "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] transition hover:bg-black/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.06]" }, eC = ["checked", "onChange"], tC = { class: "min-w-0 flex-1" }, aC = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, nC = { class: "flex flex-wrap items-end gap-2" }, oC = { class: "min-w-[120px] flex-1" }, sC = ["for"], iC = ["id"], lC = { class: "min-w-[120px] flex-1" }, rC = ["for"], cC = ["id"], dC = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = go(), i = `${`kiut-filters-${Ke()}`}-panel`, l = ne(null), r = /* @__PURE__ */ new Map(), c = ne(null), u = ne(!1), f = ne({}), g = ne(null), b = ne(""), m = ne([]), v = ne(""), p = ne(""), y = $(() => c.value ? a.filterDefinitions.find((E) => E.id === c.value) ?? null : null), k = $(() => {
      const E = y.value;
      if (E)
        return E.type === "text" ? b.value : E.type === "select" ? m.value : { start: v.value, end: p.value };
    });
    function _(E, Q) {
      Q && Q instanceof HTMLElement ? r.set(E, Q) : r.delete(E);
    }
    function w(E) {
      return a.modelValue[E];
    }
    function C(E) {
      if (E == null) return [];
      if (Array.isArray(E))
        return E.filter((Q) => typeof Q == "string" && Q.trim() !== "");
      if (typeof E == "string") {
        const Q = E.trim();
        return Q ? [Q] : [];
      }
      return [];
    }
    function M(E, Q) {
      if (Q == null) return !0;
      if (E.type === "text") return String(Q).trim() === "";
      if (E.type === "select") return C(Q).length === 0;
      if (E.type === "dateRange") {
        const se = Q;
        return !se?.start?.trim() || !se?.end?.trim();
      }
      return !0;
    }
    const S = $(
      () => a.filterDefinitions.some((E) => !M(E, w(E.id)))
    ), I = $(() => {
      const E = [];
      for (const Q of a.filterDefinitions) {
        const se = w(Q.id);
        if (!M(Q, se)) {
          if (Q.type === "text")
            E.push({ kind: "text", def: Q, key: Q.id });
          else if (Q.type === "dateRange")
            E.push({ kind: "dateRange", def: Q, key: Q.id });
          else if (Q.type === "select")
            for (const me of C(se))
              E.push({
                kind: "select",
                def: Q,
                optionValue: me,
                key: `${Q.id}::${me}`
              });
        }
      }
      return E;
    });
    function V(E) {
      return E.type !== "select" ? 0 : C(w(E.id)).length;
    }
    function H(E) {
      const Q = w(E.id), se = E.label.replace(/^\+\s*/, "");
      if (E.type === "text") return `${se}: ${String(Q ?? "").trim()}`;
      if (E.type === "select") {
        const Be = C(Q).map((qe) => E.options.find((pa) => pa.value === qe)?.label ?? qe);
        return `${se}: ${Be.join(", ")}`;
      }
      const me = Q, we = T(me.start), xe = T(me.end);
      return `${se}: ${we} – ${xe}`;
    }
    function D(E) {
      return E.kind === "text" || E.kind === "dateRange" ? H(E.def) : E.def.options.find((se) => se.value === E.optionValue)?.label ?? E.optionValue;
    }
    function T(E) {
      if (!E) return "";
      const Q = Ne(E, "YYYY-MM-DD", !0);
      return Q.isValid() ? Q.format("L") : E;
    }
    function B(E) {
      const Q = c.value === E.id && u.value, se = !M(E, w(E.id));
      return Q || se ? "border border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border border-dashed border-[#838395] text-[color:var(--kiut-text-secondary)] hover:border-[#838395] hover:bg-slate-50 dark:border-[#838395] dark:text-slate-400 dark:hover:border-[#838395] dark:hover:bg-white/[0.04]";
    }
    function j(E) {
      return M(E, w(E.id)) ? ae(E) : `Editar filtro ${E.label.replace(/^\+\s*/, "")}`;
    }
    function W(E) {
      const Q = w(E.id);
      if (E.type === "text") {
        b.value = Q != null ? String(Q) : "";
        return;
      }
      if (E.type === "select") {
        m.value = [...C(Q)];
        return;
      }
      const se = Q;
      v.value = se?.start?.trim() ?? "", p.value = se?.end?.trim() ?? "";
    }
    function J() {
      const E = y.value;
      if (!E || E.type !== "select") return;
      const Q = { ...a.modelValue };
      m.value.length === 0 ? delete Q[E.id] : Q[E.id] = [...m.value], n("update:modelValue", Q), n("change", Q);
    }
    function re(E) {
      const Q = m.value.indexOf(E);
      Q >= 0 ? m.value = m.value.filter((se, me) => me !== Q) : m.value = [...m.value, E], J();
    }
    function ue(E) {
      if (!E) return;
      g.value = E;
      const Q = E.getBoundingClientRect(), se = 300;
      let me = Q.left;
      const we = window.innerWidth - se - 12;
      me > we && (me = Math.max(12, we)), me < 12 && (me = 12);
      const xe = Q.bottom + 8;
      f.value = {
        top: `${xe}px`,
        left: `${me}px`,
        width: `${Math.min(se, window.innerWidth - 24)}px`
      };
    }
    function q(E, Q) {
      if (c.value === E.id && u.value) {
        N();
        return;
      }
      u.value && c.value !== E.id && N(), c.value = E.id, u.value = !0, W(E), We().then(async () => {
        ue(Q.currentTarget), await We(), R();
      });
    }
    function oe(E, Q) {
      if (c.value === E.id && u.value) {
        N();
        return;
      }
      u.value && c.value !== E.id && N(), c.value = E.id, u.value = !0, W(E), We().then(async () => {
        const se = r.get(E.id) ?? Q.currentTarget;
        ue(se), await We(), R();
      });
    }
    function R() {
      const E = l.value;
      if (!E) return;
      E.querySelector(
        'input[type="text"], input[type="date"], input[type="checkbox"], select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function K() {
      u.value = !1, c.value = null, g.value = null;
    }
    function Y(E) {
      const Q = y.value;
      if (!Q) return;
      if (Q.type === "text") {
        b.value = E != null ? String(E) : "";
        return;
      }
      if (Q.type === "select") {
        m.value = Array.isArray(E) ? E.filter((me) => typeof me == "string") : C(E);
        return;
      }
      const se = E;
      v.value = se?.start?.trim() ?? "", p.value = se?.end?.trim() ?? "";
    }
    function N() {
      const E = y.value;
      if (!E) return;
      if (E.type === "text") {
        const we = b.value.trim(), xe = { ...a.modelValue };
        we === "" ? delete xe[E.id] : xe[E.id] = we, n("update:modelValue", xe), n("change", xe), K();
        return;
      }
      if (E.type === "select") {
        J(), K();
        return;
      }
      const Q = v.value.trim(), se = p.value.trim(), me = { ...a.modelValue };
      !Q || !se || Q > se ? delete me[E.id] : me[E.id] = { start: Q, end: se }, n("update:modelValue", me), n("change", me), K();
    }
    function ie(E) {
      const Q = { ...a.modelValue };
      delete Q[E], n("update:modelValue", Q), n("change", Q), c.value === E && K();
    }
    function ce(E) {
      if (E.kind === "text" || E.kind === "dateRange") {
        ie(E.def.id);
        return;
      }
      const Q = { ...a.modelValue }, me = C(Q[E.def.id]).filter((we) => we !== E.optionValue);
      me.length === 0 ? delete Q[E.def.id] : Q[E.def.id] = me, n("update:modelValue", Q), n("change", Q), c.value === E.def.id && W(E.def);
    }
    function ye() {
      const E = {};
      n("update:modelValue", E), n("change", E), K();
    }
    const U = $(() => {
      const E = y.value;
      return E ? `Editar filtro: ${E.label}` : "Filtro";
    });
    function le(E) {
      const Q = E.def.label.replace(/^\+\s*/, "");
      return E.kind === "select" ? `Quitar ${E.def.options.find((we) => we.value === E.optionValue)?.label ?? E.optionValue} del filtro ${Q}` : `Quitar filtro ${Q}`;
    }
    function de(E) {
      const Q = E.def.label.replace(/^\+\s*/, "");
      if (E.kind === "select") {
        const me = E.def.options.find((we) => we.value === E.optionValue)?.label ?? E.optionValue;
        return `Editar filtro ${Q}: ${me}`;
      }
      return `Editar filtro ${Q}`;
    }
    function ae(E) {
      return `Añadir filtro ${E.label.replace(/^\+\s*/, "")}`;
    }
    const G = $(() => a.clearLabel);
    function P(E) {
      if (!u.value || !l.value) return;
      const Q = E.target;
      if (!(l.value.contains(Q) || (Q instanceof Element ? Q : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const me of r.values())
          if (me?.contains(Q)) return;
        N();
      }
    }
    function X(E) {
      E.key === "Escape" && u.value && (E.preventDefault(), K());
    }
    function te() {
      !u.value || !g.value || ue(g.value);
    }
    return Je(() => {
      document.addEventListener("mousedown", P, !0), window.addEventListener("keydown", X, !0), window.addEventListener("resize", te);
    }), $i(() => {
      document.removeEventListener("mousedown", P, !0), window.removeEventListener("keydown", X, !0), window.removeEventListener("resize", te);
    }), Le(
      () => a.modelValue,
      () => {
        const E = y.value;
        E && u.value && !o.panel && W(E);
      },
      { deep: !0 }
    ), (E, Q) => (h(), x("div", {
      class: "kiut-filters font-[Inter] text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      d("div", E5, [
        d("span", O5, A(e.label), 1),
        d("div", F5, [
          (h(!0), x(he, null, pe(e.filterDefinitions, (se) => (h(), x("button", {
            key: `pill-${se.id}`,
            ref_for: !0,
            ref: (me) => _(se.id, me),
            type: "button",
            class: Z(["inline-flex h-[26px] max-w-full shrink-0 items-center gap-0.5 rounded-full px-2 font-medium transition-colors", B(se)]),
            "aria-label": j(se),
            "aria-expanded": c.value === se.id,
            "aria-haspopup": !0,
            "aria-controls": c.value === se.id ? i : void 0,
            onClick: (me) => oe(se, me)
          }, [
            z(L(B5), {
              class: "h-2.5 w-2.5 shrink-0",
              "aria-hidden": "true"
            }),
            d("span", N5, A(se.label), 1),
            se.type === "select" && V(se) > 0 ? (h(), x("span", z5, A(V(se)), 1)) : F("", !0)
          ], 10, V5))), 128))
        ])
      ]),
      S.value ? (h(), x("div", j5, [
        d("div", H5, [
          (h(!0), x(he, null, pe(I.value, (se) => (h(), x("div", {
            key: se.key,
            "data-kiut-filter-chip": "",
            class: "inline-flex h-[26px] max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            d("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": de(se),
              onClick: (me) => q(se.def, me)
            }, [
              _e(E.$slots, "formatChip", {
                filter: se.def,
                value: w(se.def.id),
                optionValue: se.kind === "select" ? se.optionValue : void 0
              }, () => [
                Ae(A(D(se)), 1)
              ], !0)
            ], 8, W5),
            d("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": le(se),
              onClick: (me) => ce(se)
            }, [
              z(L(I5), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, K5)
          ]))), 128))
        ]),
        d("button", {
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": G.value,
          onClick: ye
        }, A(e.clearLabel), 9, U5)
      ])) : F("", !0),
      (h(), ee(Wt, { to: "body" }, [
        c.value && u.value ? (h(), x("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: l,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": U.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:bg-[#252528]",
          style: Ce(f.value),
          onKeydown: Q[3] || (Q[3] = Re(() => {
          }, ["stop"]))
        }, [
          y.value ? (h(), x(he, { key: 0 }, [
            E.$slots.panel ? _e(E.$slots, "panel", {
              key: 0,
              filter: y.value,
              close: N,
              value: k.value,
              updateValue: Y
            }, void 0, !0) : (h(), x("div", q5, [
              y.value.type === "text" ? (h(), x(he, { key: 0 }, [
                d("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, A(y.value.label), 9, X5),
                Qe(d("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": Q[0] || (Q[0] = (se) => b.value = se),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: y.value.placeholder ?? "…",
                  onKeydown: $a(Re(N, ["prevent"]), ["enter"])
                }, null, 40, G5), [
                  [It, b.value]
                ])
              ], 64)) : y.value.type === "select" ? (h(), x(he, { key: 1 }, [
                d("p", Z5, A(y.value.label), 1),
                d("ul", {
                  class: "max-h-[min(280px,50vh)] space-y-0.5 overflow-y-auto",
                  role: "listbox",
                  "aria-label": y.value.label,
                  "aria-multiselectable": !0
                }, [
                  (h(!0), x(he, null, pe(y.value.options, (se) => (h(), x("li", {
                    key: se.value
                  }, [
                    d("label", J5, [
                      d("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox shrink-0",
                        checked: m.value.includes(se.value),
                        onChange: (me) => re(se.value)
                      }, null, 40, eC),
                      d("span", tC, A(se.label), 1)
                    ])
                  ]))), 128))
                ], 8, Q5)
              ], 64)) : y.value.type === "dateRange" ? (h(), x(he, { key: 2 }, [
                d("p", aC, A(y.value.label), 1),
                d("div", nC, [
                  d("div", oC, [
                    d("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, sC),
                    Qe(d("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": Q[1] || (Q[1] = (se) => v.value = se),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, iC), [
                      [It, v.value]
                    ])
                  ]),
                  d("div", lC, [
                    d("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, rC),
                    Qe(d("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": Q[2] || (Q[2] = (se) => p.value = se),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, cC), [
                      [It, p.value]
                    ])
                  ])
                ])
              ], 64)) : F("", !0)
            ]))
          ], 64)) : F("", !0)
        ], 44, Y5)) : F("", !0)
      ]))
    ], 8, P5));
  }
}), uC = /* @__PURE__ */ be(dC, [["__scopeId", "data-v-f38e0100"]]), hC = { class: "font-sans" }, fC = ["for"], gC = { class: "relative" }, mC = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], pC = ["id"], Nl = /* @__PURE__ */ fe({
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
    errorText: {},
    icon: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = en(), s = Si("$pcForm", null), i = `kiut-input-text-${Ke()}`, l = $(() => a.id ?? i), r = $(() => `${l.value}-err`), c = $(() => a.name ?? o.name ?? ""), u = ne(a.modelValue ?? "");
    Le(
      () => a.modelValue,
      (y) => {
        u.value = y ?? "";
      }
    ), Je(() => {
      s && c.value && s.register?.(c.value, {});
    }), at(() => {
      s && c.value && s.deregister?.(c.value);
    });
    const f = $(() => s && c.value ? s.fields?.[c.value]?.states?.value ?? u.value : u.value), g = $(() => s && c.value ? s.fields?.[c.value]?.states?.invalid ?? a.invalid ?? !1 : a.invalid ?? !1);
    function b(y) {
      const k = y.target.value;
      u.value = k, n("update:modelValue", k);
      const _ = s?.fields?.[c.value]?.props;
      _?.onInput && _.onInput(y);
    }
    function m(y) {
      const k = s?.fields?.[c.value]?.props;
      k?.onChange && k.onChange(y);
    }
    function v(y) {
      const k = s?.fields?.[c.value]?.props;
      k?.onBlur && k.onBlur(y);
    }
    const p = $(() => {
      const { name: y, id: k, type: _, ...w } = o;
      return w;
    });
    return (y, k) => (h(), x("div", hC, [
      e.label ? (h(), x("label", {
        key: 0,
        for: l.value,
        class: Z(L(ht))
      }, A(e.label), 11, fC)) : F("", !0),
      d("div", gC, [
        e.icon ? (h(), ee(rt(e.icon), {
          key: 0,
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        })) : F("", !0),
        d("input", yt(p.value, {
          id: l.value,
          name: c.value,
          type: e.type,
          autocomplete: "off",
          class: [
            L(et),
            e.icon ? "pl-10" : "",
            g.value ? L(At) : ""
          ],
          placeholder: e.placeholder,
          disabled: e.disabled,
          value: f.value,
          "aria-invalid": g.value ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          onInput: b,
          onChange: m,
          onBlur: v
        }), null, 16, mC)
      ]),
      e.errorText ? (h(), x("p", {
        key: 1,
        id: r.value,
        class: Z(L(Tt)),
        role: "alert"
      }, A(e.errorText), 11, pC)) : F("", !0)
    ]));
  }
}), bC = { class: "font-sans" }, vC = ["for"], yC = { class: "relative" }, xC = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], kC = ["aria-label"], _C = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, wC = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, CC = ["id"], $C = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = en(), s = Si("$pcForm", null), i = `kiut-input-password-${Ke()}`, l = $(() => a.id ?? i), r = $(() => `${l.value}-err`), c = $(() => a.name ?? o.name ?? ""), u = ne(!1), f = ne(a.modelValue ?? "");
    Le(
      () => a.modelValue,
      (k) => {
        k !== void 0 && k !== f.value && (f.value = k);
      }
    ), Je(() => {
      s && c.value && s.register?.(c.value, {});
    }), at(() => {
      s && c.value && s.deregister?.(c.value);
    });
    const g = $(() => s && c.value ? s.fields?.[c.value]?.states?.value ?? f.value : f.value), b = $(() => s && c.value ? s.fields?.[c.value]?.states?.invalid ?? a.invalid ?? !1 : a.invalid ?? !1);
    function m(k) {
      const _ = k.target.value;
      f.value = _, n("update:modelValue", _);
      const w = s?.fields?.[c.value]?.props;
      w?.onInput && w.onInput(k);
    }
    function v(k) {
      const _ = s?.fields?.[c.value]?.props;
      _?.onChange && _.onChange(k);
    }
    function p(k) {
      const _ = s?.fields?.[c.value]?.props;
      _?.onBlur && _.onBlur(k);
    }
    const y = $(() => {
      const { name: k, id: _, ...w } = o;
      return w;
    });
    return (k, _) => (h(), x("div", bC, [
      e.label ? (h(), x("label", {
        key: 0,
        for: l.value,
        class: Z(L(ht))
      }, A(e.label), 11, vC)) : F("", !0),
      d("div", yC, [
        d("input", yt(y.value, {
          id: l.value,
          name: c.value,
          type: u.value ? "text" : "password",
          autocomplete: "current-password",
          class: [L(et), b.value ? L(At) : "", "pr-10"],
          placeholder: e.placeholder,
          disabled: e.disabled,
          value: g.value,
          "aria-invalid": b.value ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          onInput: m,
          onChange: v,
          onBlur: p
        }), null, 16, xC),
        d("button", {
          type: "button",
          tabindex: "-1",
          onClick: _[0] || (_[0] = (w) => u.value = !u.value),
          class: "absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors",
          "aria-label": u.value ? "Hide password" : "Show password"
        }, [
          u.value ? (h(), x("svg", wC, [..._[2] || (_[2] = [
            d("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            }, null, -1)
          ])])) : (h(), x("svg", _C, [..._[1] || (_[1] = [
            d("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            }, null, -1),
            d("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            }, null, -1)
          ])]))
        ], 8, kC)
      ]),
      e.errorText ? (h(), x("p", {
        key: 1,
        id: r.value,
        class: Z(L(Tt)),
        role: "alert"
      }, A(e.errorText), 11, CC)) : F("", !0)
    ]));
  }
}), SC = { class: "font-sans" }, MC = ["for"], DC = ["id", "rows", "placeholder", "disabled", "aria-invalid", "aria-describedby"], AC = ["id"], TC = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = `kiut-input-textarea-${Ke()}`, s = $(() => a.id ?? o), i = $(() => `${s.value}-err`), l = $({
      get: () => a.modelValue,
      set: (r) => n("update:modelValue", r)
    });
    return (r, c) => (h(), x("div", SC, [
      e.label ? (h(), x("label", {
        key: 0,
        for: s.value,
        class: Z(L(ht))
      }, A(e.label), 11, MC)) : F("", !0),
      Qe(d("textarea", {
        id: s.value,
        "onUpdate:modelValue": c[0] || (c[0] = (u) => l.value = u),
        rows: e.rows,
        autocomplete: "off",
        class: Z([L($b), e.invalid ? L(At) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, DC), [
        [It, l.value]
      ]),
      e.errorText ? (h(), x("p", {
        key: 1,
        id: i.value,
        class: Z(L(Tt)),
        role: "alert"
      }, A(e.errorText), 11, AC)) : F("", !0)
    ]));
  }
}), BC = { class: "font-sans" }, LC = ["for"], RC = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], IC = ["for"], PC = ["title"], EC = ["aria-label"], OC = {
  key: 2,
  class: "space-y-3"
}, FC = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], VC = ["for"], NC = { class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400" }, zC = {
  key: 0,
  class: "shrink-0 text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, jC = {
  key: 0,
  class: "space-y-2",
  role: "list"
}, HC = { class: "flex items-start gap-2" }, WC = { class: "min-w-0 flex-1 space-y-2" }, KC = { class: "flex items-center gap-2" }, UC = ["title"], YC = { class: "shrink-0 text-xs text-[color:var(--kiut-text-muted)]" }, qC = ["aria-label", "onClick"], XC = ["id"], GC = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = `kiut-input-file-${Ke()}`, s = $(() => a.id ?? o), i = $(() => `${s.value}-err`), l = ne(null), r = $(
      () => a.multiple ? null : a.modelValue
    ), c = $(() => {
      if (!a.multiple) return [];
      const S = a.modelValue;
      return Array.isArray(S) ? S : [];
    }), u = $(
      () => r.value?.name ?? a.placeholder
    ), f = $(
      () => a.multiple && c.value.length >= a.maxFiles
    ), g = $(() => c.value.length === 0 ? a.placeholder : c.value.length === 1 ? c.value[0].file.name : `${c.value.length} archivos seleccionados`);
    function b(S) {
      return a.showDescriptions && a.submitted && a.requireDescriptions && S.description.trim() === "";
    }
    function m(S) {
      return S < 1024 ? `${S} B` : S < 1024 * 1024 ? `${(S / 1024).toFixed(1)} KB` : `${(S / (1024 * 1024)).toFixed(1)} MB`;
    }
    function v(S) {
      return {
        id: `file-${Ke()}`,
        file: S,
        description: ""
      };
    }
    function p(S, I) {
      return S.some(
        (V) => V.file.name === I.name && V.file.size === I.size && V.file.lastModified === I.lastModified
      );
    }
    function y() {
      l.value && (l.value.value = "");
    }
    function k(S) {
      const V = S.target.files?.[0] ?? null;
      n("update:modelValue", V);
    }
    function _(S) {
      const I = S.target, V = Array.from(I.files ?? []);
      if (V.length === 0) return;
      const H = [...c.value];
      for (const D of V) {
        if (H.length >= a.maxFiles) break;
        p(H, D) || H.push(v(D));
      }
      n("update:modelValue", H), y();
    }
    function w() {
      n("update:modelValue", null), y();
    }
    function C(S) {
      n(
        "update:modelValue",
        c.value.filter((I) => I.id !== S)
      );
    }
    function M(S, I) {
      n(
        "update:modelValue",
        c.value.map(
          (V) => V.id === S ? { ...V, description: I } : V
        )
      );
    }
    return (S, I) => (h(), x("div", BC, [
      e.label ? (h(), x("label", {
        key: 0,
        for: s.value,
        class: Z(L(ht))
      }, A(e.label), 11, LC)) : F("", !0),
      e.multiple ? (h(), x("div", OC, [
        d("div", {
          class: Z([
            L(et),
            "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
            e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
            e.invalid ? L(At) : "",
            e.disabled ? "pointer-events-none" : ""
          ])
        }, [
          d("input", {
            id: s.value,
            ref_key: "fileInputRef",
            ref: l,
            type: "file",
            multiple: "",
            class: "sr-only focus:outline-none focus:ring-0",
            name: e.name,
            accept: e.accept,
            disabled: e.disabled || f.value,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0,
            onChange: _
          }, null, 40, FC),
          d("label", {
            for: s.value,
            class: Z(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled || f.value ? "cursor-not-allowed opacity-50" : ""])
          }, [
            z(L(uo), {
              class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
              "aria-hidden": "true"
            }),
            Ae(" " + A(e.chooseLabel), 1)
          ], 10, VC),
          d("span", NC, A(g.value), 1),
          e.filesCountLabel ? (h(), x("span", zC, A(e.filesCountLabel), 1)) : F("", !0)
        ], 2),
        c.value.length > 0 ? (h(), x("ul", jC, [
          (h(!0), x(he, null, pe(c.value, (V) => (h(), x("li", {
            key: V.id,
            class: "rounded-xl border border-[color:var(--kiut-border-light)] bg-[color:var(--bg-secondary,#f9fafb)] p-3 dark:bg-white/[0.03]"
          }, [
            d("div", HC, [
              z(L(ip), {
                class: "mt-0.5 h-5 w-5 shrink-0 text-[color:var(--kiut-primary)]",
                "aria-hidden": "true"
              }),
              d("div", WC, [
                d("div", KC, [
                  d("span", {
                    class: "min-w-0 flex-1 truncate text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100",
                    title: V.file.name
                  }, A(V.file.name), 9, UC),
                  d("span", YC, A(m(V.file.size)), 1),
                  e.disabled ? F("", !0) : (h(), x("button", {
                    key: 0,
                    type: "button",
                    class: "inline-flex shrink-0 rounded-lg p-1 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
                    "aria-label": e.removeFileAriaLabel,
                    onClick: (H) => C(V.id)
                  }, [
                    z(L(ho), {
                      class: "h-4 w-4",
                      "aria-hidden": "true"
                    })
                  ], 8, qC))
                ]),
                e.showDescriptions ? (h(), ee(Nl, {
                  key: 0,
                  "model-value": V.description,
                  label: e.descriptionLabel,
                  placeholder: e.descriptionPlaceholder,
                  disabled: e.disabled,
                  invalid: b(V),
                  "error-text": b(V) ? e.descriptionErrorText : "",
                  "onUpdate:modelValue": (H) => M(V.id, H)
                }, null, 8, ["model-value", "label", "placeholder", "disabled", "invalid", "error-text", "onUpdate:modelValue"])) : F("", !0)
              ])
            ])
          ]))), 128))
        ])) : F("", !0)
      ])) : (h(), x("div", {
        key: 1,
        class: Z([
          L(et),
          "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
          e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
          e.invalid ? L(At) : "",
          e.disabled ? "pointer-events-none" : ""
        ])
      }, [
        d("input", {
          id: s.value,
          ref_key: "fileInputRef",
          ref: l,
          type: "file",
          class: "sr-only focus:outline-none focus:ring-0",
          name: e.name,
          accept: e.accept,
          disabled: e.disabled,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? i.value : void 0,
          onChange: k
        }, null, 40, RC),
        d("label", {
          for: s.value,
          class: Z(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled ? "cursor-not-allowed opacity-50" : ""])
        }, [
          z(L(uo), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          Ae(" " + A(e.chooseLabel), 1)
        ], 10, IC),
        d("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: u.value || void 0
        }, A(u.value), 9, PC),
        r.value && !e.disabled ? (h(), x("button", {
          key: 0,
          type: "button",
          class: "inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
          "aria-label": e.clearAriaLabel,
          onClick: w
        }, [
          z(L(ho), {
            class: "h-4 w-4",
            "aria-hidden": "true"
          })
        ], 8, EC)) : F("", !0)
      ], 2)),
      e.errorText ? (h(), x("p", {
        key: 3,
        id: i.value,
        class: Z(L(Tt)),
        role: "alert"
      }, A(e.errorText), 11, XC)) : F("", !0)
    ]));
  }
}), ZC = ["for"], QC = { class: "flex w-full min-w-0 items-center gap-3" }, JC = ["for", "aria-label"], e$ = ["src"], t$ = ["id", "accept", "disabled"], a$ = ["id", "value", "placeholder", "disabled"], n$ = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = ne(!1), s = ne(null), i = `kiut-image-upload-circle-${Ke()}`, l = $(() => a.id ?? i), r = $(() => `${l.value}-url`), c = $(() => a.size === "sm" ? "h-10 w-10" : a.size === "lg" ? "h-16 w-16" : "h-12 w-12"), u = $(() => a.size === "sm" ? "h-4 w-4" : a.size === "lg" ? "h-6 w-6" : "h-5 w-5"), f = $(() => !a.disabled && !a.loading);
    Le(
      () => a.modelValue,
      () => {
        o.value = !1;
      }
    );
    function g(m) {
      const v = m.target, p = v.files?.[0];
      p && n("select", p), v.value = "";
    }
    function b(m) {
      n("update:modelValue", m.target.value);
    }
    return (m, v) => (h(), x("div", yt({ class: "font-sans flex w-full flex-col gap-2" }, m.$attrs), [
      e.label ? (h(), x("label", {
        key: 0,
        for: l.value,
        class: Z(L(ht))
      }, A(e.label), 11, ZC)) : F("", !0),
      d("div", QC, [
        d("label", {
          for: l.value,
          class: Z(["relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-primary)] text-[color:var(--kiut-text-muted)] transition hover:border-[color:var(--kiut-primary)]/40", [
            c.value,
            f.value ? "cursor-pointer hover:bg-[color:var(--kiut-bg-secondary)]" : "cursor-not-allowed opacity-60"
          ]]),
          "aria-label": e.uploadAriaLabel
        }, [
          e.modelValue && !o.value && !e.loading ? (h(), x("img", {
            key: 0,
            src: e.modelValue,
            alt: "",
            class: "h-full w-full object-cover",
            onError: v[0] || (v[0] = (p) => o.value = !0)
          }, null, 40, e$)) : e.loading ? (h(), ee(L(np), {
            key: 1,
            class: Z([u.value, "animate-spin text-[color:var(--kiut-primary)]"]),
            "aria-hidden": "true"
          }, null, 8, ["class"])) : (h(), ee(L(uo), {
            key: 2,
            class: Z([u.value, "text-[color:var(--kiut-primary)]"]),
            "aria-hidden": "true"
          }, null, 8, ["class"]))
        ], 10, JC),
        d("input", {
          id: l.value,
          ref_key: "fileInputRef",
          ref: s,
          type: "file",
          class: "sr-only focus:outline-none focus:ring-0",
          accept: e.accept,
          disabled: e.disabled || e.loading,
          onChange: g
        }, null, 40, t$),
        e.showUrlInput ? (h(), x("div", {
          key: 0,
          class: Z(["min-w-0 flex-1 basis-0", e.urlInputClass])
        }, [
          d("input", {
            id: r.value,
            type: "text",
            autocomplete: "off",
            value: e.modelValue,
            placeholder: e.urlPlaceholder,
            disabled: e.disabled,
            class: Z([L(et), "w-full min-w-0"]),
            onInput: b
          }, null, 42, a$)
        ], 2)) : F("", !0)
      ])
    ], 16));
  }
}), o$ = {
  en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  es: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
}, s$ = {
  en: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  es: ["lu", "ma", "mi", "ju", "vi", "sá", "do"]
}, i$ = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/, l$ = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
}, r$ = {
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
}, c$ = {
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
}, d$ = [
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
function u$(e = "en") {
  return o$[e];
}
function h$(e = "en") {
  return s$[e];
}
function zl(e = "en") {
  return d$.map((t) => ({ id: t, label: c$[e][t] }));
}
function f$(e = "en") {
  return "Presets";
}
zl("es");
function ot(e) {
  const [t, a, n] = e.split("-").map(Number);
  return new Date(t, a - 1, n);
}
function st(e) {
  const t = e.getFullYear(), a = String(e.getMonth() + 1).padStart(2, "0"), n = String(e.getDate()).padStart(2, "0");
  return `${t}-${a}-${n}`;
}
function Ve(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function _t(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function Da(e, t) {
  return new Date(e.getFullYear(), e.getMonth() + t, e.getDate());
}
function g$(e, t) {
  const a = new Date(e.getFullYear(), e.getMonth(), e.getDate() + t);
  return Ve(a);
}
function Oa(e, t) {
  return g$(e, -t);
}
function m$(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 0);
}
function jl(e, t = /* @__PURE__ */ new Date()) {
  const a = Ve(t);
  switch (e) {
    case "today":
      return { start: a, end: a };
    case "yesterday": {
      const n = Oa(a, 1);
      return { start: n, end: n };
    }
    case "last7":
      return { start: Oa(a, 6), end: a };
    case "last14":
      return { start: Oa(a, 13), end: a };
    case "last30":
      return { start: Oa(a, 29), end: a };
    case "last90":
      return { start: Oa(a, 89), end: a };
    case "thisMonth":
      return { start: _t(a), end: a };
    case "lastMonth": {
      const n = _t(Da(a, -1));
      return { start: n, end: m$(n) };
    }
    case "yearToDate":
      return { start: new Date(a.getFullYear(), 0, 1), end: a };
  }
}
function Hl(e, t, a) {
  let n = Ve(e.start), o = Ve(e.end);
  if (t) {
    const s = Ve(ot(t));
    Ht(n, s) && (n = s), Ht(o, s) && (o = s);
  }
  if (a) {
    const s = Ve(ot(a));
    $n(n, s) && (n = s), $n(o, s) && (o = s);
  }
  return $n(n, o) ? { start: o, end: n } : { start: n, end: o };
}
function p$(e, t, a = /* @__PURE__ */ new Date(), n, o) {
  if (!e.start || !e.end) return !1;
  const s = Hl(jl(t, a), n, o);
  return st(s.start) === e.start && st(s.end) === e.end;
}
function an(e, t) {
  const a = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()), n = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
  return a < n ? -1 : a > n ? 1 : 0;
}
function bt(e, t) {
  return an(e, t) === 0;
}
function Ht(e, t) {
  return an(e, t) < 0;
}
function $n(e, t) {
  return an(e, t) > 0;
}
function Wl(e, t) {
  return an(e, t) >= 0;
}
function Kl(e, t) {
  return an(e, t) <= 0;
}
function Ul(e) {
  const t = e.getFullYear(), a = e.getMonth(), n = new Date(t, a, 1), o = new Date(n);
  o.setDate(n.getDate() - n.getDay());
  const s = [], i = new Date(o);
  for (let l = 0; l < 42; l++)
    s.push(new Date(i)), i.setDate(i.getDate() + 1);
  return s;
}
function b$(e) {
  const t = e.getFullYear(), a = e.getMonth(), n = new Date(t, a, 1), o = new Date(n);
  o.setDate(n.getDate() - (n.getDay() + 6) % 7);
  const s = [], i = new Date(o);
  for (let l = 0; l < 42; l++)
    s.push(new Date(i)), i.setDate(i.getDate() + 1);
  return s;
}
function _a(e) {
  if (!e?.trim()) return null;
  const t = i$.exec(e.trim());
  if (!t) return null;
  const a = Number(t[1]), n = Number(t[2]), o = Number(t[3]), s = Number(t[4]), i = Number(t[5]), l = new Date(a, n - 1, o, s, i);
  return Number.isNaN(l.getTime()) ? null : l;
}
function v$(e) {
  const t = e.getFullYear(), a = String(e.getMonth() + 1).padStart(2, "0"), n = String(e.getDate()).padStart(2, "0"), o = String(e.getHours()).padStart(2, "0"), s = String(e.getMinutes()).padStart(2, "0");
  return `${t}-${a}-${n}T${o}:${s}`;
}
function y$(e) {
  const t = _a(e);
  return t ? `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}` : "00:00";
}
function x$(e, t = "es") {
  const a = _a(e);
  if (!a) return "";
  const n = new Intl.DateTimeFormat(t, {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(a), o = new Intl.DateTimeFormat(t, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: !1
  }).format(a);
  return `${n} · ${o}`;
}
function ki(e, t) {
  return e.getTime() < t.getTime();
}
function _i(e, t) {
  return e.getTime() > t.getTime();
}
function In(e, t = "en") {
  return `${l$[t][e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function jt(e, t = "en") {
  return `${r$[t][e.getMonth()]} ${e.getFullYear()}`;
}
const k$ = ["name", "value"], _$ = { class: "flex flex-row gap-3 items-center" }, w$ = {
  key: 0,
  class: "mb-1.5 inline-flex shrink-0 text-[color:var(--kiut-text-muted)] [&>svg]:h-4 [&>svg]:w-4",
  "aria-hidden": "true"
}, C$ = ["for"], $$ = ["id", "disabled", "aria-expanded", "aria-labelledby", "aria-label", "aria-invalid", "aria-describedby"], S$ = ["aria-label", "onKeydown"], M$ = { class: "p-3" }, D$ = { class: "mb-4 flex items-center justify-between gap-2" }, A$ = ["aria-label"], T$ = { class: "min-w-0 truncate px-1 text-sm font-medium text-[#61616b] dark:text-[#e3e3e8]" }, B$ = ["aria-label"], L$ = { class: "mb-2 grid grid-cols-7 text-center text-xs font-normal tracking-wide text-[#61616b] dark:text-[#e3e3e8]" }, R$ = { class: "grid grid-cols-7 gap-y-2" }, I$ = ["disabled", "onClick"], P$ = { class: "border-t border-gray-200 px-3 py-3 dark:border-[color:var(--kiut-border-light)]" }, E$ = { class: "relative" }, O$ = ["value", "disabled", "min", "max", "step", "aria-label"], F$ = /* @__PURE__ */ fe({
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
    placeholder: { default: "Seleccionar…" },
    locale: { default: "es" },
    min: {},
    max: {},
    step: { default: 60 },
    panelAlign: { default: "start" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = `kiut-input-datetime-${Ke()}`, s = `${o}-label`, i = $(() => a.id ?? `${o}-btn`), l = `${o}-panel`, r = `${o}-err`, c = ne(null), u = ne(null), f = ne(null), g = ne(!1), b = ne(_t(/* @__PURE__ */ new Date())), m = ne(null), v = ne("00:00"), p = $(() => !!a.modelValue), y = $(() => h$(a.locale)), k = $(() => b$(b.value)), _ = $(() => a.placeholder), w = $(() => a.modelValue ? x$(a.modelValue, a.locale) : a.placeholder), C = $(() => {
      const U = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return a.panelAlign === "end" ? `right-0 left-auto ${U}` : `left-0 right-auto ${U}`;
    }), M = $(
      () => a.locale === "es" ? "Calendario de fecha y hora" : "Date and time calendar"
    ), S = $(
      () => a.locale === "es" ? "Mes anterior" : "Previous month"
    ), I = $(
      () => a.locale === "es" ? "Mes siguiente" : "Next month"
    ), V = $(
      () => a.locale === "es" ? "Hora" : "Time"
    ), H = $(() => _a(a.min)), D = $(() => _a(a.max)), T = $(() => {
      if (!(!m.value || !H.value) && bt(m.value, H.value))
        return `${String(H.value.getHours()).padStart(2, "0")}:${String(H.value.getMinutes()).padStart(2, "0")}`;
    }), B = $(() => {
      if (!(!m.value || !D.value) && bt(m.value, D.value))
        return `${String(D.value.getHours()).padStart(2, "0")}:${String(D.value.getMinutes()).padStart(2, "0")}`;
    });
    function j(U, le) {
      return U.getMonth() === le.getMonth() && U.getFullYear() === le.getFullYear();
    }
    function W(U) {
      const le = Ve(U);
      return !!(H.value && Ht(le, Ve(H.value)) || D.value && $n(le, Ve(D.value)));
    }
    function J(U) {
      const le = j(U, b.value), de = W(U), ae = m.value ? bt(U, m.value) : !1;
      if (de)
        return "rounded-lg text-[#61616b] opacity-40";
      let G = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white";
      return ae && (G = "rounded-lg bg-[#895af6] font-semibold text-white"), le || (G = `${G} opacity-30`), G;
    }
    function re() {
      const U = _a(a.modelValue);
      if (U) {
        m.value = Ve(U), v.value = y$(a.modelValue), b.value = _t(U);
        return;
      }
      m.value = null, v.value = "00:00", b.value = _t(/* @__PURE__ */ new Date());
    }
    function ue(U) {
      if (!m.value) return U;
      let le = _a(
        `${st(m.value)}T${U}`
      );
      return le ? (H.value && bt(m.value, H.value) && ki(le, H.value) && (le = H.value), D.value && bt(m.value, D.value) && _i(le, D.value) && (le = D.value), `${String(le.getHours()).padStart(2, "0")}:${String(le.getMinutes()).padStart(2, "0")}`) : U;
    }
    function q() {
      if (!m.value) {
        n("update:modelValue", null);
        return;
      }
      const U = ue(v.value);
      v.value = U;
      const le = new Date(
        m.value.getFullYear(),
        m.value.getMonth(),
        m.value.getDate(),
        Number(U.slice(0, 2)),
        Number(U.slice(3, 5))
      ), de = v$(le);
      H.value && ki(le, H.value) || D.value && _i(le, D.value) || n("update:modelValue", de);
    }
    function oe(U) {
      W(U) || (m.value = Ve(U), v.value = ue(v.value), q());
    }
    function R(U) {
      const le = U.target.value;
      le && (v.value = le, q());
    }
    function K(U) {
      b.value = Da(b.value, U);
    }
    function Y() {
      g.value = !1;
    }
    function N() {
      a.disabled || (re(), g.value = !0, We(() => f.value?.focus()));
    }
    function ie(U) {
      if (U.stopPropagation(), !a.disabled) {
        if (g.value) {
          Y();
          return;
        }
        N();
      }
    }
    function ce(U) {
      a.disabled || (U.key === "ArrowDown" || U.key === "Enter" || U.key === " ") && (U.preventDefault(), g.value || N());
    }
    function ye(U) {
      if (!g.value) return;
      const le = c.value;
      le && !le.contains(U.target) && Y();
    }
    return Le(
      () => a.modelValue,
      () => {
        g.value || re();
      }
    ), Je(() => {
      re(), document.addEventListener("click", ye);
    }), at(() => {
      document.removeEventListener("click", ye);
    }), (U, le) => (h(), x("div", {
      ref_key: "rootRef",
      ref: c,
      class: "relative font-sans"
    }, [
      e.name ? (h(), x("input", {
        key: 0,
        type: "hidden",
        name: e.name,
        value: e.modelValue ?? ""
      }, null, 8, k$)) : F("", !0),
      d("div", _$, [
        U.$slots.icon ? (h(), x("span", w$, [
          _e(U.$slots, "icon")
        ])) : F("", !0),
        e.label ? (h(), x("label", {
          key: 1,
          id: s,
          for: i.value,
          class: Z(L(ht))
        }, A(e.label), 11, C$)) : F("", !0)
      ]),
      d("button", {
        id: i.value,
        ref_key: "buttonRef",
        ref: u,
        type: "button",
        disabled: e.disabled,
        class: Z([
          L(et),
          "flex w-full items-center gap-2 text-left",
          e.invalid ? L(At) : "",
          g.value && !e.invalid ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": g.value,
        "aria-haspopup": "dialog",
        "aria-controls": l,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : _.value,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? r : void 0,
        onClick: ie,
        onKeydown: ce
      }, [
        z(L(Eo), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        d("span", {
          class: Z([
            "min-w-0 flex-1 truncate",
            p.value ? "" : "text-[color:var(--kiut-text-muted)] dark:text-slate-500"
          ])
        }, A(w.value), 3)
      ], 42, $$),
      e.errorText ? (h(), x("p", {
        key: 1,
        id: r,
        class: Z(L(Tt)),
        role: "alert"
      }, A(e.errorText), 3)) : F("", !0),
      Qe(d("div", {
        ref_key: "panelRef",
        ref: f,
        id: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": M.value,
        class: Z([
          C.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),20rem)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: $a(Re(Y, ["stop"]), ["escape"])
      }, [
        d("div", M$, [
          d("div", D$, [
            d("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": S.value,
              onClick: le[0] || (le[0] = Re((de) => K(-1), ["stop"]))
            }, [
              z(L(Oo), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ], 8, A$),
            d("span", T$, A(L(jt)(b.value, e.locale)), 1),
            d("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": I.value,
              onClick: le[1] || (le[1] = Re((de) => K(1), ["stop"]))
            }, [
              z(L(Fo), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ], 8, B$)
          ]),
          d("div", L$, [
            (h(!0), x(he, null, pe(y.value, (de) => (h(), x("span", { key: de }, A(de), 1))), 128))
          ]),
          d("div", R$, [
            (h(!0), x(he, null, pe(k.value, (de) => (h(), x("button", {
              key: L(st)(de),
              type: "button",
              disabled: W(de),
              class: Z(["relative mx-auto flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed", J(de)]),
              onClick: Re((ae) => oe(de), ["stop"])
            }, A(de.getDate()), 11, I$))), 128))
          ])
        ]),
        d("div", P$, [
          d("div", E$, [
            z(L(wl), {
              class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
              "aria-hidden": "true"
            }),
            d("input", {
              value: v.value,
              type: "time",
              autocomplete: "off",
              class: Z([L(et), "min-h-0 py-2 pl-10 pr-3 text-sm"]),
              disabled: !m.value,
              min: T.value,
              max: B.value,
              step: e.step,
              "aria-label": V.value,
              onInput: R,
              onClick: le[2] || (le[2] = Re(() => {
              }, ["stop"]))
            }, null, 42, O$)
          ])
        ])
      ], 42, S$), [
        [Kt, g.value]
      ])
    ], 512));
  }
}), V$ = { class: "font-sans" }, N$ = { class: "flex flex-row gap-3 items-center" }, z$ = {
  key: 0,
  class: "mb-1.5 inline-flex shrink-0 text-[color:var(--kiut-text-muted)] [&>svg]:h-4 [&>svg]:w-4",
  "aria-hidden": "true"
}, j$ = ["for"], H$ = { class: "relative" }, W$ = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], K$ = ["id"], U$ = /* @__PURE__ */ fe({
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
    function a(f) {
      const g = /^(\d{1,2}):(\d{2})(?::\d{2}(?:\.\d+)?)?$/.exec(f.trim());
      if (!g) return null;
      const b = Number(g[1]), m = Number(g[2]);
      return !Number.isInteger(b) || !Number.isInteger(m) || b < 0 || b > 23 || m < 0 || m > 59 ? null : `${String(b).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    }
    function n(f) {
      return f === "" ? null : a(f);
    }
    const o = e, s = t, i = `kiut-input-time-${Ke()}`, l = $(() => o.id ?? i), r = $(() => `${l.value}-err`), c = $(() => o.modelValue == null || o.modelValue === "" ? "" : a(o.modelValue) ?? "");
    function u(f) {
      const g = f.target.value;
      s("update:modelValue", n(g));
    }
    return (f, g) => (h(), x("div", V$, [
      d("div", N$, [
        f.$slots.icon ? (h(), x("span", z$, [
          _e(f.$slots, "icon")
        ])) : F("", !0),
        e.label ? (h(), x("label", {
          key: 1,
          for: l.value,
          class: Z(L(ht))
        }, A(e.label), 11, j$)) : F("", !0)
      ]),
      d("div", H$, [
        z(L(wl), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        d("input", {
          id: l.value,
          value: c.value,
          type: "time",
          autocomplete: "off",
          class: Z([
            L(et),
            "pl-10",
            e.invalid ? L(At) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          onInput: u
        }, null, 42, W$)
      ]),
      e.errorText ? (h(), x("p", {
        key: 0,
        id: r.value,
        class: Z(L(Tt)),
        role: "alert"
      }, A(e.errorText), 11, K$)) : F("", !0)
    ]));
  }
}), Y$ = { class: "font-sans" }, q$ = ["for"], X$ = {
  key: 0,
  class: "order-1 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, G$ = ["id", "value", "min", "max", "step", "disabled", "aria-orientation", "aria-invalid", "aria-describedby"], Z$ = {
  key: 1,
  class: "text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Q$ = {
  key: 2,
  class: "grid w-full max-w-full grid-cols-[1fr_auto_1fr] items-start gap-x-3 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, J$ = { class: "min-w-0 text-left leading-snug" }, e4 = { class: "max-w-[min(100%,12rem)] shrink px-1 text-center leading-snug" }, t4 = { class: "min-w-0 text-right leading-snug" }, a4 = {
  key: 3,
  class: "order-3 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, n4 = {
  key: 4,
  class: "order-4 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, o4 = ["id"], s4 = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = `kiut-input-range-${Ke()}`, s = $(() => a.id ?? o), i = $(() => `${s.value}-err`), l = $(() => {
      const b = [];
      return a.errorText && b.push(i.value), b.length ? b.join(" ") : void 0;
    }), r = $(
      () => !!(a.caption && !a.captionMin && !a.captionMax)
    ), c = $(() => !!(a.captionMin || a.captionMax)), u = $(() => {
      const { min: b, max: m, modelValue: v } = a;
      if (m === b) return 0;
      const p = (v - b) / (m - b);
      return Math.min(100, Math.max(0, p * 100));
    }), f = $(() => ({
      "--kiut-range-fill": `${u.value}%`,
      "--kiut-range-length": a.trackLength
    }));
    function g(b) {
      const m = Number(b.target.value);
      n("update:modelValue", Number.isNaN(m) ? a.min : m);
    }
    return (b, m) => (h(), x("div", Y$, [
      e.label ? (h(), x("label", {
        key: 0,
        for: s.value,
        class: Z(L(ht))
      }, A(e.label), 11, q$)) : F("", !0),
      d("div", {
        class: Z(["flex flex-col items-center gap-2", (e.orientation === "vertical", "w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (h(), x("p", X$, A(e.captionMax), 1)) : F("", !0),
        d("div", {
          class: Z(["flex items-center justify-center", [
            e.orientation === "vertical" ? "order-2 h-[var(--kiut-range-length)] w-11 shrink-0" : "order-none w-full py-1"
          ]]),
          style: Ce(f.value)
        }, [
          d("input", {
            id: s.value,
            type: "range",
            value: e.modelValue,
            min: e.min,
            max: e.max,
            step: e.step,
            disabled: e.disabled,
            "aria-orientation": e.orientation,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": l.value,
            class: Z([
              "kiut-range-input block appearance-none bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              "dark:[--kiut-range-track:#282836] dark:[--kiut-range-thumb-bg:#282836] dark:[--kiut-range-thumb-shadow:none]",
              e.orientation === "vertical" ? "kiut-range-input--vertical" : "kiut-range-input--horizontal w-full"
            ]),
            onInput: g
          }, null, 42, G$)
        ], 6),
        e.orientation === "horizontal" && r.value ? (h(), x("p", Z$, A(e.caption), 1)) : e.orientation === "horizontal" && c.value ? (h(), x("div", Q$, [
          d("span", J$, A(e.captionMin), 1),
          d("span", e4, A(e.caption), 1),
          d("span", t4, A(e.captionMax), 1)
        ])) : F("", !0),
        e.orientation === "vertical" && e.captionMin ? (h(), x("p", a4, A(e.captionMin), 1)) : F("", !0),
        e.orientation === "vertical" && e.caption ? (h(), x("p", n4, A(e.caption), 1)) : F("", !0)
      ], 2),
      e.errorText ? (h(), x("p", {
        key: 1,
        id: i.value,
        class: Z(L(Tt)),
        role: "alert"
      }, A(e.errorText), 11, o4)) : F("", !0)
    ]));
  }
}), i4 = /* @__PURE__ */ be(s4, [["__scopeId", "data-v-ce7263e4"]]), l4 = { class: "font-sans" }, r4 = ["for"], c4 = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], d4 = ["id"], u4 = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = `kiut-input-number-${Ke()}`, s = $(() => a.id ?? o), i = $(() => `${s.value}-err`), l = $(() => {
      switch (a.align) {
        case "start":
          return "text-start";
        case "end":
          return "text-end";
        default:
          return "text-center";
      }
    }), r = $(
      () => a.modelValue === null || a.modelValue === void 0 ? "" : String(a.modelValue)
    );
    function c(u) {
      const f = u.target.value;
      if (f === "") {
        n("update:modelValue", null);
        return;
      }
      const g = Number(f);
      n("update:modelValue", Number.isNaN(g) ? null : g);
    }
    return (u, f) => (h(), x("div", l4, [
      e.label ? (h(), x("label", {
        key: 0,
        for: s.value,
        class: Z(L(ht))
      }, A(e.label), 11, r4)) : F("", !0),
      d("input", {
        id: s.value,
        value: r.value,
        type: "number",
        onInput: c,
        class: Z([
          L(et),
          e.invalid ? L(At) : "",
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
      }, null, 42, c4),
      e.errorText ? (h(), x("p", {
        key: 1,
        id: i.value,
        class: Z(L(Tt)),
        role: "alert"
      }, A(e.errorText), 11, d4)) : F("", !0)
    ]));
  }
}), h4 = { class: "font-sans" }, f4 = ["for"], g4 = ["id", "value", "disabled", "aria-invalid", "aria-describedby"], m4 = ["disabled"], p4 = ["id"], b4 = "#3b82f6", v4 = "#aabbcc", y4 = "flex min-h-[2.75rem] w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans shadow-sm outline-none transition focus-within:border-[color:var(--kiut-primary)] focus-within:ring-2 focus-within:ring-[color:var(--kiut-primary)]/25 focus-within:ring-offset-0 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]", x4 = /* @__PURE__ */ fe({
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
    function a(m) {
      const v = m.trim(), p = /^#?([0-9a-fA-F]{6})$/.exec(v);
      if (p) return `#${p[1].toLowerCase()}`;
      const y = /^#?([0-9a-fA-F]{3})$/.exec(v);
      if (y) {
        const [k, _, w] = y[1].split("");
        return `#${k}${k}${_}${_}${w}${w}`.toLowerCase();
      }
      return null;
    }
    function n(m) {
      return a(m) ?? b4;
    }
    const o = e, s = t, i = `kiut-input-color-${Ke()}`, l = $(() => o.id ?? i), r = $(() => `${l.value}-err`), c = $(() => n(o.modelValue)), u = ne(c.value), f = ne(!1);
    Le(c, (m) => {
      f.value || (u.value = m);
    });
    function g(m) {
      const v = m.target, p = a(v.value);
      p && s("update:modelValue", p);
    }
    function b() {
      f.value = !1;
      const m = a(u.value);
      m ? (u.value = m, s("update:modelValue", m)) : u.value = c.value;
    }
    return Le(u, (m) => {
      if (!f.value) return;
      const v = a(m);
      v && s("update:modelValue", v);
    }), (m, v) => (h(), x("div", h4, [
      e.label ? (h(), x("label", {
        key: 0,
        for: l.value,
        class: Z(L(ht))
      }, A(e.label), 11, f4)) : F("", !0),
      d("div", {
        class: Z([
          y4,
          e.invalid ? L(At) : "",
          e.disabled ? "cursor-not-allowed opacity-50" : ""
        ])
      }, [
        d("input", {
          id: l.value,
          type: "color",
          value: c.value,
          disabled: e.disabled,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          class: "h-9 w-11 shrink-0 cursor-pointer rounded-lg border border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-0.5 shadow-inner outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/35 disabled:cursor-not-allowed dark:border-slate-600 dark:bg-slate-800/80",
          onInput: g
        }, null, 40, g4),
        e.showHexInput ? Qe((h(), x("input", {
          key: 0,
          "onUpdate:modelValue": v[0] || (v[0] = (p) => u.value = p),
          type: "text",
          disabled: e.disabled,
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": "Código hexadecimal del color",
          class: "min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none ring-0 placeholder:text-[color:var(--kiut-text-muted)] focus:ring-0 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500",
          placeholder: v4,
          onFocus: v[1] || (v[1] = (p) => f.value = !0),
          onBlur: b
        }, null, 40, m4)), [
          [It, u.value]
        ]) : F("", !0)
      ], 2),
      e.errorText ? (h(), x("p", {
        key: 1,
        id: r.value,
        class: Z(L(Tt)),
        role: "alert"
      }, A(e.errorText), 11, p4)) : F("", !0)
    ]));
  }
}), Yl = {
  smileys: "Smileys",
  gestures: "Gestos",
  symbols: "Símbolos",
  travel: "Viajes",
  objects: "Objetos"
}, ql = [
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
function k4(e, t) {
  return e.char.includes(t) ? !0 : e.terms?.some((a) => a.toLowerCase().includes(t)) ?? !1;
}
function _4(e, t, a) {
  const n = a.trim().toLowerCase();
  return n ? e.map((o) => {
    const s = t[o.id]?.toLowerCase().includes(n) || o.id.includes(n), i = o.emojis.filter(
      (l) => s || k4(l, n)
    ).map((l) => l.char);
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
function jM(e) {
  const t = {
    ...Yl,
    ...e
  };
  return ql.map((a) => ({
    id: a.id,
    label: t[a.id],
    emojis: a.emojis.map((n) => n.char)
  }));
}
function w4(e) {
  return e ? e.match(new RegExp("\\p{Extended_Pictographic}(\\u200d\\p{Extended_Pictographic})*", "gu")) ?? [] : [];
}
function C4(e, t) {
  return `${e}${t}`;
}
const $4 = ["disabled", "aria-expanded", "aria-label"], S4 = {
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, M4 = {
  key: 0,
  class: "truncate text-sm"
}, D4 = ["aria-label"], A4 = { class: "border-b border-gray-200/80 p-3 dark:border-white/10" }, T4 = ["disabled", "placeholder", "aria-label"], B4 = { class: "min-h-0 flex-1 space-y-4 overflow-y-auto p-3" }, L4 = { class: "mb-2 text-[11px] font-bold uppercase tracking-wide text-[color:var(--kiut-text-muted)] dark:text-slate-500" }, R4 = { class: "grid grid-cols-8 gap-0.5" }, I4 = ["disabled", "aria-label", "onClick"], P4 = { class: "text-[1.35rem] leading-none" }, E4 = {
  key: 1,
  class: "py-8 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, O4 = {
  key: 0,
  class: "border-t border-gray-200/80 px-3 py-2.5 text-[11px] leading-relaxed text-[color:var(--kiut-text-muted)] dark:border-white/10 dark:text-slate-500"
}, F4 = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = `kiut-emoji-picker-${Ke()}`, s = `${o}-btn`, i = `${o}-panel`, l = ne(null), r = ne(null), c = ne(null), u = ne(null), f = ne(!1), g = ne(""), b = ne({}), m = $(
      () => a.ariaLabelTrigger ?? a.triggerLabel ?? a.ariaLabel
    ), v = $(() => ({
      ...Yl,
      ...a.categoryLabels
    })), p = $(() => new Set(w4(a.draft))), y = $(() => {
      if (a.categories?.length) {
        const B = g.value.trim().toLowerCase();
        return B ? a.categories.map((j) => ({
          ...j,
          emojis: j.emojis.filter((W) => W.includes(B) || j.label.toLowerCase().includes(B) ? !0 : j.id.toLowerCase().includes(B))
        })).filter((j) => j.emojis.length > 0) : a.categories;
      }
      return _4(
        ql,
        v.value,
        g.value
      );
    });
    function k() {
      const B = r.value;
      if (!B) return;
      const j = B.getBoundingClientRect(), W = 320, J = 8, re = 8;
      let ue = j.right - W;
      ue < re && (ue = j.left), ue + W > window.innerWidth - re && (ue = Math.max(re, window.innerWidth - W - re));
      const q = Math.max(160, j.top - J - re);
      b.value = {
        bottom: `${window.innerHeight - j.top + J}px`,
        left: `${ue}px`,
        width: `${W}px`,
        maxHeight: `${q}px`
      };
    }
    function _(B) {
      const j = "flex h-9 w-9 items-center justify-center rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-white/5";
      return p.value.has(B) ? `${j} bg-[color:var(--kiut-primary)]/15 ring-2 ring-[color:var(--kiut-primary)]/70 dark:bg-[color:var(--kiut-primary)]/25` : j;
    }
    function w(B) {
      if (a.disabled) return;
      const j = C4(a.draft ?? "", B);
      n("update:draft", j), n("select", B);
    }
    function C() {
      g.value = "", n("open"), We(() => {
        k(), u.value?.focus();
      });
    }
    function M() {
      f.value && (f.value = !1, g.value = "", n("close"), r.value?.focus());
    }
    function S() {
      if (!a.disabled) {
        if (f.value) {
          M();
          return;
        }
        f.value = !0, C();
      }
    }
    function I(B) {
      B.stopPropagation(), S();
    }
    function V(B) {
      if (!f.value) return;
      const j = B.target, W = l.value, J = c.value;
      W && !W.contains(j) && (!J || !J.contains(j)) && M();
    }
    function H(B) {
      a.disabled || ((B.key === "ArrowDown" || B.key === "Enter" || B.key === " ") && (B.preventDefault(), f.value || (f.value = !0, C())), B.key === "Escape" && f.value && (B.preventDefault(), M()));
    }
    function D(B) {
      B.key === "Escape" && (B.preventDefault(), M());
    }
    function T() {
      f.value && k();
    }
    return Je(() => {
      document.addEventListener("click", V), window.addEventListener("resize", T), window.addEventListener("scroll", T, !0);
    }), at(() => {
      document.removeEventListener("click", V), window.removeEventListener("resize", T), window.removeEventListener("scroll", T, !0);
    }), (B, j) => (h(), x("div", {
      ref_key: "rootRef",
      ref: l,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      d("button", {
        ref_key: "buttonRef",
        ref: r,
        id: s,
        type: "button",
        disabled: e.disabled,
        class: Z([
          L(et),
          "inline-flex min-h-[2.75rem] w-auto items-center justify-center gap-2 px-3 py-2",
          e.triggerLabel ? "min-w-[9rem]" : "min-w-[2.75rem]",
          f.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": f.value,
        "aria-haspopup": "dialog",
        "aria-controls": i,
        "aria-label": m.value,
        onClick: I,
        onKeydown: H
      }, [
        d("span", S4, [
          _e(B.$slots, "icon", {}, () => [
            z(L(lp), { class: "h-5 w-5" })
          ])
        ]),
        e.triggerLabel ? (h(), x("span", M4, A(e.triggerLabel), 1)) : F("", !0),
        e.triggerLabel ? (h(), ee(L(na), {
          key: 1,
          class: Z(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", f.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])) : F("", !0)
      ], 42, $4),
      (h(), ee(Wt, { to: "body" }, [
        Qe(d("div", {
          ref_key: "panelRef",
          ref: c,
          id: i,
          role: "dialog",
          "aria-label": e.ariaLabel,
          style: Ce(b.value),
          class: "fixed z-[300] flex w-[20rem] flex-col overflow-hidden rounded-xl border border-gray-300/80 bg-white shadow-lg dark:border-[color:var(--kiut-border-light)] dark:bg-[#141416]",
          onClick: j[2] || (j[2] = Re(() => {
          }, ["stop"])),
          onKeydown: Re(D, ["stop"])
        }, [
          d("div", A4, [
            Qe(d("input", {
              ref_key: "searchInputRef",
              ref: u,
              "onUpdate:modelValue": j[0] || (j[0] = (W) => g.value = W),
              type: "search",
              disabled: e.disabled,
              placeholder: e.searchPlaceholder,
              "aria-label": e.searchPlaceholder,
              autocomplete: "off",
              spellcheck: "false",
              class: "min-h-[2.5rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 disabled:cursor-not-allowed dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500",
              onClick: j[1] || (j[1] = Re(() => {
              }, ["stop"]))
            }, null, 8, T4), [
              [It, g.value]
            ])
          ]),
          d("div", B4, [
            y.value.length > 0 ? (h(!0), x(he, { key: 0 }, pe(y.value, (W) => (h(), x("section", {
              key: W.id
            }, [
              d("h3", L4, A(W.label), 1),
              d("div", R4, [
                (h(!0), x(he, null, pe(W.emojis, (J) => (h(), x("button", {
                  key: `${W.id}-${J}`,
                  type: "button",
                  disabled: e.disabled,
                  "aria-label": `Add ${J} to input`,
                  class: Z(_(J)),
                  onClick: Re((re) => w(J), ["stop"])
                }, [
                  d("span", P4, A(J), 1)
                ], 10, I4))), 128))
              ])
            ]))), 128)) : (h(), x("p", E4, A(e.emptySearchText), 1))
          ]),
          e.hint ? (h(), x("p", O4, A(e.hint), 1)) : F("", !0)
        ], 44, D4), [
          [Kt, f.value]
        ])
      ]))
    ], 512));
  }
}), V4 = /* @__PURE__ */ fe({
  name: "LanguageSelect",
  __name: "LanguageSelect",
  props: {
    modelValue: {},
    options: {},
    label: {},
    ariaLabelTrigger: {},
    placeholder: { default: "Seleccionar idioma…" },
    disabled: { type: Boolean },
    showOptionCheck: { type: Boolean, default: !1 },
    searchPlaceholder: { default: "Buscar por nombre…" },
    noResultsText: { default: "Sin resultados" },
    listSectionLabel: { default: "Idioma" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = $(
      () => a.options.map((i) => ({
        value: i.value,
        label: i.label,
        disabled: i.disabled,
        leadingClass: i.flagClass
      }))
    );
    function s(i) {
      n("update:modelValue", i);
    }
    return (i, l) => (h(), ee(Et, {
      "model-value": e.modelValue,
      options: o.value,
      label: e.label,
      "aria-label-trigger": e.ariaLabelTrigger,
      placeholder: e.placeholder,
      disabled: e.disabled,
      "show-option-check": e.showOptionCheck,
      searchable: "",
      "search-placeholder": e.searchPlaceholder,
      "no-results-text": e.noResultsText,
      "list-section-label": e.listSectionLabel,
      "onUpdate:modelValue": s
    }, null, 8, ["model-value", "options", "label", "aria-label-trigger", "placeholder", "disabled", "show-option-check", "search-placeholder", "no-results-text", "list-section-label"]));
  }
}), N4 = { class: "border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-3 dark:border-[color:var(--kiut-border-light)]" }, z4 = { class: "relative" }, j4 = {
  class: "pointer-events-none absolute inset-y-0 left-0 flex w-9 items-center justify-center",
  "aria-hidden": "true"
}, H4 = ["placeholder", "aria-label", "disabled"], W4 = {
  key: 0,
  class: "px-3 pb-1 pt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, K4 = ["aria-label"], U4 = {
  key: 0,
  class: "px-3 py-6 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, Y4 = ["aria-selected", "onClick", "onMouseenter"], q4 = { class: "min-w-0 flex-1 truncate" }, X4 = /* @__PURE__ */ fe({
  name: "LanguagePicker",
  __name: "LanguagePicker",
  props: {
    modelValue: {},
    options: {},
    disabled: { type: Boolean, default: !1 },
    searchPlaceholder: { default: "Buscar por nombre…" },
    noResultsText: { default: "Sin resultados" },
    listSectionLabel: { default: "Idioma" },
    listMaxHeightClass: { default: "max-h-60" }
  },
  emits: ["update:modelValue"],
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, i = `${`kiut-language-picker-${Ke()}`}-listbox`, l = ne(null), r = ne(null), c = ne(""), u = ne(0), f = $(() => n.options.filter((w) => !w.disabled)), g = $(() => {
      const w = c.value.trim().toLowerCase();
      return w ? f.value.filter((C) => C.label.toLowerCase().includes(w)) : f.value;
    });
    function b(w) {
      return `${w.value}-${w.label}`;
    }
    function m(w) {
      return n.modelValue === w.value;
    }
    function v(w, C) {
      const M = m(w), S = u.value === C;
      return [
        "flex cursor-pointer items-center gap-2.5 border-b border-gray-200 px-3 py-2.5 text-sm transition-colors last:border-b-0 dark:border-white/5",
        M ? "bg-[color:var(--kiut-primary)]/10 font-medium text-[color:var(--kiut-text-primary)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-slate-100" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !M && S ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function p() {
      u.value = Math.max(
        0,
        g.value.findIndex((w) => w.value === n.modelValue)
      );
    }
    function y(w) {
      w.disabled || o("update:modelValue", w.value);
    }
    function k(w) {
      const C = g.value;
      if (w.key === "ArrowDown") {
        if (w.preventDefault(), C.length === 0) return;
        u.value = 0, r.value?.focus();
        return;
      }
      if (w.key === "ArrowUp") {
        if (w.preventDefault(), C.length === 0) return;
        u.value = C.length - 1, r.value?.focus();
        return;
      }
      if (w.key === "Enter") {
        w.preventDefault();
        const M = C[u.value];
        M && y(M);
      }
    }
    function _(w) {
      const C = g.value;
      if (C.length !== 0) {
        if (w.key === "ArrowDown") {
          w.preventDefault(), u.value = Math.min(u.value + 1, C.length - 1);
          return;
        }
        if (w.key === "ArrowUp") {
          if (w.preventDefault(), u.value === 0) {
            l.value?.focus();
            return;
          }
          u.value = Math.max(u.value - 1, 0);
          return;
        }
        if (w.key === "Enter") {
          w.preventDefault();
          const M = C[u.value];
          M && y(M);
        }
      }
    }
    return Le(c, () => {
      u.value = 0;
    }), Le(
      () => n.modelValue,
      () => {
        p();
      },
      { immediate: !0 }
    ), t({
      focusSearch: () => l.value?.focus()
    }), (w, C) => (h(), x("div", {
      class: Z(["overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] font-sans shadow-sm dark:border-[color:var(--kiut-border-light)]", e.disabled ? "pointer-events-none opacity-50" : ""])
    }, [
      d("div", N4, [
        d("div", z4, [
          d("span", j4, [
            z(L(Vo), { class: "h-4 w-4 text-[color:var(--kiut-text-muted)] dark:text-slate-500" })
          ]),
          Qe(d("input", {
            ref_key: "searchInputRef",
            ref: l,
            "onUpdate:modelValue": C[0] || (C[0] = (M) => c.value = M),
            type: "search",
            class: Z([L(et), "min-h-0 py-2 pl-9 pr-3 text-sm"]),
            placeholder: e.searchPlaceholder,
            "aria-label": e.searchPlaceholder,
            disabled: e.disabled,
            onKeydown: k
          }, null, 42, H4), [
            [It, c.value]
          ])
        ])
      ]),
      e.listSectionLabel ? (h(), x("p", W4, A(e.listSectionLabel), 1)) : F("", !0),
      d("ul", {
        id: i,
        ref_key: "listRef",
        ref: r,
        role: "listbox",
        tabindex: "0",
        "aria-label": e.listSectionLabel || e.searchPlaceholder,
        class: Z([e.listMaxHeightClass, "overflow-auto pb-1 outline-none"]),
        onKeydown: _
      }, [
        g.value.length === 0 ? (h(), x("li", U4, A(e.noResultsText), 1)) : F("", !0),
        (h(!0), x(he, null, pe(g.value, (M, S) => (h(), x("li", {
          key: b(M),
          role: "option",
          "aria-selected": m(M),
          class: Z(v(M, S)),
          onClick: (I) => y(M),
          onMouseenter: (I) => u.value = S
        }, [
          M.flagClass ? (h(), x("span", {
            key: 0,
            class: Z([M.flagClass, "shrink-0"]),
            "aria-hidden": "true"
          }, null, 2)) : F("", !0),
          d("span", q4, A(M.label), 1)
        ], 42, Y4))), 128))
      ], 42, K4)
    ], 2));
  }
}), G4 = { class: "flex flex-row gap-3 items-center" }, Z4 = {
  key: 0,
  class: "mb-1.5 inline-flex shrink-0 text-[color:var(--kiut-text-muted)] [&>svg]:h-4 [&>svg]:w-4",
  "aria-hidden": "true"
}, Q4 = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], J4 = { class: "min-h-[1.25rem] min-w-0 flex-1 max-h-32 overflow-y-auto py-0.5" }, eS = {
  key: 0,
  class: "block truncate text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, tS = {
  key: 1,
  class: "flex flex-wrap gap-1"
}, aS = { class: "truncate" }, nS = { class: "absolute left-0 right-0 z-50 mt-[-3px] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-lg dark:border-[color:var(--kiut-border-light)]" }, oS = {
  key: 0,
  class: "border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-3 dark:border-[color:var(--kiut-border-light)]"
}, sS = { class: "relative" }, iS = {
  class: "pointer-events-none absolute inset-y-0 left-0 flex w-9 items-center justify-center",
  "aria-hidden": "true"
}, lS = ["placeholder", "aria-label"], rS = ["aria-checked", "disabled"], cS = {
  key: 0,
  class: "px-3 py-2 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, dS = ["aria-selected", "onClick", "onMouseenter"], uS = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, hS = { class: "min-w-0 flex-1" }, fS = /* @__PURE__ */ fe({
  name: "MultiSelect",
  __name: "MultiSelect",
  props: {
    modelValue: {},
    options: {},
    label: {},
    ariaLabelTrigger: {},
    placeholder: { default: "Seleccionar…" },
    disabled: { type: Boolean },
    searchable: { type: Boolean, default: !1 },
    searchPlaceholder: { default: "Buscar…" },
    noResultsText: { default: "Sin resultados" },
    showSelectAll: { type: Boolean, default: !1 },
    selectAllLabel: { default: "Seleccionar todas" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = `kiut-multiselect-${Ke()}`, s = `${o}-label`, i = `${o}-btn`, l = `${o}-listbox`, r = ne(null), c = ne(null), u = ne(null), f = ne(null), g = ne(!1), b = ne(0), m = ne(""), v = $(() => a.options.filter((N) => !N.disabled)), p = $(() => {
      if (!a.searchable) return v.value;
      const N = m.value.trim().toLowerCase();
      return N ? v.value.filter(
        (ie) => ie.label.toLowerCase().includes(N)
      ) : v.value;
    }), y = $(() => new Set(a.modelValue ?? [])), k = $(
      () => v.value.filter((N) => y.value.has(N.value)).length
    ), _ = $(
      () => v.value.length > 0 && k.value === v.value.length
    ), w = $(
      () => k.value > 0 && !_.value
    ), C = $(
      () => w.value ? "mixed" : _.value
    ), M = $(
      () => a.options.filter((N) => y.value.has(N.value))
    ), S = $(() => {
      const N = a.ariaLabelTrigger ?? a.placeholder ?? "Seleccionar opciones", ie = M.value.length;
      return ie === 0 ? N : `${N}, ${ie} seleccionada${ie === 1 ? "" : "s"}`;
    });
    function I(N) {
      return `${String(N.value)}-${N.label}`;
    }
    function V(N) {
      return y.value.has(N.value);
    }
    function H(N, ie) {
      const ce = V(N), ye = b.value === ie;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        ce ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !ce && ye ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function D(N) {
      const ie = [...a.modelValue ?? []], ce = ie.indexOf(N.value);
      ce >= 0 ? ie.splice(ce, 1) : ie.push(N.value), n("update:modelValue", ie);
    }
    function T() {
      const N = new Set(v.value.map((ce) => ce.value)), ie = (a.modelValue ?? []).filter(
        (ce) => !N.has(ce)
      );
      n(
        "update:modelValue",
        _.value ? ie : [...ie, ...v.value.map((ce) => ce.value)]
      );
    }
    function B() {
      const N = p.value;
      if (N.length === 0) {
        b.value = 0;
        return;
      }
      const ie = y.value, ce = N.findIndex((ye) => ie.has(ye.value));
      b.value = ce >= 0 ? ce : 0;
    }
    function j() {
      if (a.searchable) {
        u.value?.focus();
        return;
      }
      if (a.showSelectAll) {
        f.value?.focus();
        return;
      }
      c.value?.focus();
    }
    function W() {
      m.value = "", B(), We(() => j());
    }
    function J() {
      g.value = !1, m.value = "";
    }
    function re() {
      if (!a.disabled) {
        if (g.value) {
          J();
          return;
        }
        g.value = !0, W();
      }
    }
    function ue(N) {
      N.stopPropagation(), !a.disabled && re();
    }
    function q(N) {
      if (!g.value) return;
      const ie = r.value;
      ie && !ie.contains(N.target) && J();
    }
    function oe(N) {
      a.disabled || (N.key === "ArrowDown" || N.key === "Enter" || N.key === " ") && (N.preventDefault(), g.value || (g.value = !0, W()));
    }
    function R(N) {
      const ie = p.value;
      if (N.key === "Escape") {
        N.preventDefault(), J();
        return;
      }
      if (N.key === "ArrowDown") {
        if (N.preventDefault(), a.showSelectAll) {
          f.value?.focus();
          return;
        }
        if (ie.length === 0) return;
        b.value = 0, c.value?.focus();
        return;
      }
      if (N.key === "ArrowUp") {
        if (N.preventDefault(), ie.length === 0) return;
        b.value = ie.length - 1, c.value?.focus();
        return;
      }
      if (N.key === "Enter") {
        N.preventDefault();
        const ce = ie[b.value];
        ce && D(ce);
      }
    }
    function K(N) {
      if (N.key === "Escape") {
        N.preventDefault(), J();
        return;
      }
      if (N.key === "ArrowDown" && p.value.length > 0) {
        N.preventDefault(), b.value = 0, c.value?.focus();
        return;
      }
      N.key === "ArrowUp" && a.searchable && (N.preventDefault(), u.value?.focus());
    }
    function Y(N) {
      const ie = p.value;
      if (N.key === "Escape") {
        N.preventDefault(), J();
        return;
      }
      if (ie.length !== 0) {
        if (N.key === "ArrowDown") {
          N.preventDefault(), b.value = Math.min(b.value + 1, ie.length - 1);
          return;
        }
        if (N.key === "ArrowUp") {
          if (N.preventDefault(), b.value === 0 && a.showSelectAll) {
            f.value?.focus();
            return;
          }
          if (b.value === 0 && a.searchable) {
            u.value?.focus();
            return;
          }
          b.value = Math.max(b.value - 1, 0);
          return;
        }
        if (N.key === "Enter" || N.key === " ") {
          N.preventDefault();
          const ce = ie[b.value];
          ce && D(ce);
        }
      }
    }
    return Le(m, () => {
      b.value = 0;
    }), Je(() => {
      document.addEventListener("click", q);
    }), at(() => {
      document.removeEventListener("click", q);
    }), (N, ie) => (h(), x("div", {
      ref_key: "rootRef",
      ref: r,
      class: "relative font-sans"
    }, [
      d("div", G4, [
        N.$slots.icon ? (h(), x("span", Z4, [
          _e(N.$slots, "icon")
        ])) : F("", !0),
        e.label ? (h(), x("label", {
          key: 1,
          id: s,
          class: Z(L(ht))
        }, A(e.label), 3)) : F("", !0)
      ]),
      d("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: Z([
          L(et),
          "flex items-start justify-between gap-2 text-left",
          g.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": g.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : S.value,
        onClick: ue,
        onKeydown: oe
      }, [
        d("div", J4, [
          M.value.length === 0 ? (h(), x("span", eS, A(e.placeholder), 1)) : (h(), x("div", tS, [
            (h(!0), x(he, null, pe(M.value, (ce) => (h(), x("span", {
              key: I(ce),
              class: "inline-flex max-w-full items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[color:var(--kiut-text-primary)] dark:bg-white/10 dark:text-slate-100"
            }, [
              d("span", aS, A(ce.label), 1)
            ]))), 128))
          ]))
        ]),
        z(L(na), {
          class: Z(["mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", g.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, Q4),
      Qe(d("div", nS, [
        e.searchable ? (h(), x("div", oS, [
          d("div", sS, [
            d("span", iS, [
              z(L(Vo), { class: "h-4 w-4 text-[color:var(--kiut-text-muted)] dark:text-slate-500" })
            ]),
            Qe(d("input", {
              ref_key: "searchInputRef",
              ref: u,
              "onUpdate:modelValue": ie[0] || (ie[0] = (ce) => m.value = ce),
              type: "search",
              class: Z([L(et), "min-h-0 py-2 pl-9 pr-3 text-sm"]),
              placeholder: e.searchPlaceholder,
              "aria-label": e.searchPlaceholder,
              onClick: ie[1] || (ie[1] = Re(() => {
              }, ["stop"])),
              onKeydown: Re(R, ["stop"])
            }, null, 42, lS), [
              [It, m.value]
            ])
          ])
        ])) : F("", !0),
        e.showSelectAll ? (h(), x("button", {
          key: 1,
          ref_key: "selectAllRef",
          ref: f,
          type: "button",
          role: "checkbox",
          "aria-checked": C.value,
          disabled: v.value.length === 0,
          class: "flex w-full items-center gap-2 border-b border-gray-200 px-3 py-2 text-left text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none transition-colors hover:bg-slate-100 focus-visible:bg-slate-100 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[color:var(--kiut-primary)] disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:text-slate-100 dark:hover:bg-white/5 dark:focus-visible:bg-white/5",
          onClick: Re(T, ["stop"]),
          onKeydown: K
        }, [
          d("span", {
            class: Z([
              "flex h-4 w-4 shrink-0 items-center justify-center rounded border border-gray-400 transition-colors dark:border-slate-500",
              _.value || w.value ? "border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)] text-white dark:border-[color:var(--kiut-primary)]" : ""
            ]),
            "aria-hidden": "true"
          }, [
            w.value ? (h(), ee(L(Cb), {
              key: 0,
              class: "h-3 w-3"
            })) : _.value ? (h(), ee(L(Rn), {
              key: 1,
              class: "h-3 w-3"
            })) : F("", !0)
          ], 2),
          d("span", null, A(e.selectAllLabel), 1)
        ], 40, rS)) : F("", !0),
        d("ul", {
          id: l,
          ref_key: "listRef",
          ref: c,
          role: "listbox",
          tabindex: "-1",
          "aria-multiselectable": "true",
          class: "max-h-60 overflow-auto py-1",
          onKeydown: Re(Y, ["stop"])
        }, [
          p.value.length === 0 ? (h(), x("li", cS, A(e.noResultsText), 1)) : F("", !0),
          (h(!0), x(he, null, pe(p.value, (ce, ye) => (h(), x("li", {
            key: I(ce),
            role: "option",
            "aria-selected": V(ce),
            class: Z(H(ce, ye)),
            onClick: Re((U) => D(ce), ["stop"]),
            onMouseenter: (U) => b.value = ye
          }, [
            d("span", uS, [
              V(ce) ? (h(), ee(L(Rn), {
                key: 0,
                class: "h-4 w-4 text-white"
              })) : F("", !0)
            ]),
            d("span", hS, A(ce.label), 1)
          ], 42, dS))), 128))
        ], 544)
      ], 512), [
        [Kt, g.value]
      ])
    ], 512));
  }
}), gS = { class: "font-sans" }, mS = ["for"], pS = { class: "flex gap-2" }, bS = { class: "w-[7.5rem] shrink-0" }, vS = { class: "min-w-0 flex-1" }, yS = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], xS = ["id"], kS = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = `kiut-phone-${Ke()}`, s = $(() => a.id ?? `${o}-num`), i = $(() => `${s.value}-err`), l = $({
      get: () => a.modelValue.prefix,
      set: (c) => n("update:modelValue", { ...a.modelValue, prefix: c })
    }), r = $({
      get: () => a.modelValue.number,
      set: (c) => n("update:modelValue", { ...a.modelValue, number: c })
    });
    return (c, u) => (h(), x("div", gS, [
      e.label ? (h(), x("label", {
        key: 0,
        for: s.value,
        class: Z(L(ht))
      }, A(e.label), 11, mS)) : F("", !0),
      d("div", pS, [
        d("div", bS, [
          z(Et, {
            modelValue: l.value,
            "onUpdate:modelValue": u[0] || (u[0] = (f) => l.value = f),
            "aria-label-trigger": "Prefijo telefónico",
            options: e.prefixOptions,
            placeholder: e.prefixPlaceholder,
            disabled: e.disabled,
            "show-option-check": !1,
            searchable: "",
            "search-placeholder": "Buscar país…"
          }, null, 8, ["modelValue", "options", "placeholder", "disabled"])
        ]),
        d("div", vS, [
          Qe(d("input", {
            id: s.value,
            "onUpdate:modelValue": u[1] || (u[1] = (f) => r.value = f),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: Z([L(et), e.invalid ? L(At) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, yS), [
            [It, r.value]
          ])
        ])
      ]),
      e.errorText ? (h(), x("p", {
        key: 1,
        id: i.value,
        class: Z(L(Tt)),
        role: "alert"
      }, A(e.errorText), 11, xS)) : F("", !0)
    ]));
  }
}), _S = ["role", "aria-label"], wS = { class: "flex flex-wrap gap-2" }, CS = ["aria-checked", "role", "onClick"], $S = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, SS = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, MS = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, DS = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = $(() => a.multiple ? Array.isArray(a.modelValue) ? a.modelValue : [] : []);
    function s(r) {
      return a.multiple ? o.value.includes(r.value) : a.modelValue === r.value;
    }
    function i(r) {
      return [
        "inline-flex max-w-full items-center gap-2 rounded-xl border px-3 py-2 text-left transition",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        s(r) ? "border-[color:var(--kiut-primary)]/50 bg-violet-50/80 dark:bg-violet-950/30" : "border-gray-300 bg-white dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]"
      ];
    }
    function l(r) {
      if (a.multiple) {
        const c = Array.isArray(a.modelValue) ? [...a.modelValue] : [], u = c.indexOf(r.value);
        u >= 0 ? c.splice(u, 1) : c.push(r.value), n("update:modelValue", c);
        return;
      }
      n("update:modelValue", r.value);
    }
    return (r, c) => (h(), x("div", {
      class: "font-sans",
      role: e.multiple ? "group" : "radiogroup",
      "aria-label": e.ariaLabel
    }, [
      d("div", wS, [
        (h(!0), x(he, null, pe(e.items, (u) => (h(), x("button", {
          key: u.value,
          type: "button",
          class: Z(i(u)),
          "aria-checked": s(u),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (f) => l(u)
        }, [
          d("span", $S, [
            s(u) ? (h(), x("span", SS)) : F("", !0)
          ]),
          u.dotColor ? (h(), x("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: Ce({ backgroundColor: u.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : F("", !0),
          d("span", MS, A(u.label), 1)
        ], 10, CS))), 128))
      ])
    ], 8, _S));
  }
}), AS = ["aria-label"], TS = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], BS = { class: "truncate px-3 py-2 text-sm font-medium" }, LS = /* @__PURE__ */ fe({
  name: "SegmentedControl",
  __name: "SegmentedControl",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Segmented control" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = `kiut-seg-${Ke()}`, s = (v) => `${o}-seg-${v}`, i = ne([]);
    function l(v, p) {
      v instanceof HTMLButtonElement ? i.value[p] = v : i.value[p] = null;
    }
    function r(v) {
      return v.value === a.modelValue;
    }
    function c(v) {
      const p = r(v), y = "flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]";
      return v.disabled ? `${y} cursor-not-allowed opacity-40` : p ? `${y} bg-[color:var(--kiut-primary)] text-white shadow-sm` : `${y} text-[color:var(--kiut-text-primary)] hover:bg-black/[0.03] dark:text-slate-100 dark:hover:bg-white/[0.06]`;
    }
    function u(v) {
      v.disabled || v.value !== a.modelValue && n("update:modelValue", v.value);
    }
    function f(v, p, y) {
      u(v), We(() => i.value[p]?.focus());
    }
    const g = $(
      () => a.items.map((v, p) => v.disabled ? -1 : p).filter((v) => v >= 0)
    );
    function b(v, p) {
      const y = a.items.length;
      if (y === 0) return 0;
      let k = v;
      for (let _ = 0; _ < y; _++)
        if (k = (k + p + y) % y, !a.items[k]?.disabled) return k;
      return v;
    }
    function m(v, p) {
      if (v.key === "ArrowRight" || v.key === "ArrowDown") {
        v.preventDefault();
        const y = b(p, 1), k = a.items[y];
        k && u(k), We(() => i.value[y]?.focus());
      } else if (v.key === "ArrowLeft" || v.key === "ArrowUp") {
        v.preventDefault();
        const y = b(p, -1), k = a.items[y];
        k && u(k), We(() => i.value[y]?.focus());
      } else if (v.key === "Home") {
        v.preventDefault();
        const y = g.value[0];
        if (y !== void 0) {
          const k = a.items[y];
          k && u(k), We(() => i.value[y]?.focus());
        }
      } else if (v.key === "End") {
        v.preventDefault();
        const y = g.value[g.value.length - 1];
        if (y !== void 0) {
          const k = a.items[y];
          k && u(k), We(() => i.value[y]?.focus());
        }
      }
    }
    return (v, p) => (h(), x("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-[color:var(--kiut-border-light)]"
    }, [
      (h(!0), x(he, null, pe(e.items, (y, k) => (h(), x("button", {
        id: s(y.value),
        key: y.value,
        ref_for: !0,
        ref: (_) => l(_, k),
        type: "button",
        role: "tab",
        "aria-selected": r(y),
        "aria-disabled": y.disabled === !0,
        tabindex: r(y) ? 0 : -1,
        class: Z(c(y)),
        onClick: (_) => f(y, k),
        onKeydown: (_) => m(_, k)
      }, [
        d("span", BS, A(y.label), 1)
      ], 42, TS))), 128))
    ], 8, AS));
  }
}), RS = ["aria-expanded", "aria-labelledby", "aria-label"], IS = ["onKeydown"], PS = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, ES = { class: "mb-4 flex items-center justify-between gap-2" }, OS = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, FS = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, VS = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, NS = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, zS = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, jS = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, HS = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, WS = { class: "grid grid-cols-7 gap-y-2 mt-2" }, KS = ["disabled", "onClick"], US = "rounded-lg text-[#61616b]", YS = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", qS = "opacity-30", XS = "bg-[#6b35e9] font-medium text-white", GS = "bg-[#895af6] font-semibold text-white", ZS = /* @__PURE__ */ fe({
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
    const a = e, n = t, s = `${`kiut-drp-${Ke()}`}-lbl`, i = ne(null), l = ne(null), r = ne(!1), c = ne(null), u = ne(_t(/* @__PURE__ */ new Date())), f = $(() => !!(a.modelValue.start && a.modelValue.end)), g = $(() => {
      const D = _t(u.value);
      return [D, Da(D, 1)];
    }), b = $(() => a.ariaLabel ?? a.placeholder), m = $(() => {
      const D = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return a.panelAlign === "end" ? `right-0 left-auto ${D}` : `left-0 right-auto ${D}`;
    }), v = $(
      () => `${jt(g.value[0])} – ${jt(g.value[1])}`
    ), p = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], y = $(() => {
      if (!a.modelValue.start || !a.modelValue.end) return a.placeholder;
      const D = ot(a.modelValue.start), T = ot(a.modelValue.end);
      return `${In(D)} – ${In(T)}`;
    });
    function k(D, T) {
      return D.getMonth() === T.getMonth() && D.getFullYear() === T.getFullYear();
    }
    function _(D) {
      const T = Ve(D);
      if (a.minDate) {
        const B = Ve(ot(a.minDate));
        if (Ht(T, B)) return !0;
      }
      if (a.maxDate) {
        const B = Ve(ot(a.maxDate));
        if (Ht(B, T)) return !0;
      }
      return !1;
    }
    function w(D, T, B) {
      const j = bt(D, T), W = bt(D, B);
      if (j && W) return "rounded-lg";
      const J = j || D.getDay() === 0, re = W || D.getDay() === 6;
      return J && re ? "rounded-lg" : J ? "rounded-l-lg" : re ? "rounded-r-lg" : "rounded-none";
    }
    function C(D, T) {
      const B = k(T, D), j = _(T), W = a.modelValue.start ? Ve(ot(a.modelValue.start)) : null, J = a.modelValue.end ? Ve(ot(a.modelValue.end)) : null, re = Ve(T);
      if (j)
        return US;
      let ue = YS;
      if (W && J && Wl(re, W) && Kl(re, J)) {
        const oe = bt(re, W), R = bt(re, J);
        ue = `${w(re, W, J)} ${oe || R ? GS : XS}`;
      }
      return B || (ue = `${ue} ${qS}`), ue;
    }
    function M(D) {
      if (_(D)) return;
      const T = Ve(D);
      if (!c.value) {
        c.value = new Date(T), n("update:modelValue", { start: st(T), end: st(T) });
        return;
      }
      let j = Ve(c.value), W = new Date(T);
      Ht(W, j) && ([j, W] = [W, j]), n("update:modelValue", { start: st(j), end: st(W) }), c.value = null, r.value = !1;
    }
    function S(D) {
      u.value = Da(u.value, D);
    }
    function I() {
      r.value = !1;
    }
    function V(D) {
      if (D?.stopPropagation(), !r.value) {
        if (r.value = !0, c.value = null, a.modelValue.start)
          try {
            u.value = _t(ot(a.modelValue.start));
          } catch {
          }
        We(() => l.value?.focus());
      }
    }
    function H(D) {
      if (!r.value) return;
      const T = i.value;
      T && !T.contains(D.target) && (r.value = !1);
    }
    return Le(r, (D) => {
      D && (c.value = null);
    }), Je(() => {
      document.addEventListener("click", H);
    }), at(() => {
      document.removeEventListener("click", H);
    }), (D, T) => (h(), x("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (h(), x("label", {
        key: 0,
        id: s,
        class: Z(L(ht))
      }, A(e.label), 3)) : F("", !0),
      d("button", {
        type: "button",
        class: Z([
          L(et),
          "flex w-full items-center gap-2 text-left",
          r.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": r.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : b.value,
        onFocus: V,
        onClick: V
      }, [
        z(L(Eo), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        d("span", {
          class: Z([
            "min-w-0 flex-1 truncate",
            f.value ? "" : "text-[color:var(--kiut-text-muted)] dark:text-slate-500"
          ])
        }, A(y.value), 3)
      ], 42, RS),
      Qe(d("div", {
        ref_key: "panelRef",
        ref: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": "Calendario de rango",
        class: Z([
          m.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: $a(Re(I, ["stop"]), ["escape"])
      }, [
        d("div", PS, [
          d("div", ES, [
            d("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes anterior",
              onClick: T[0] || (T[0] = (B) => S(-1))
            }, [
              z(L(Oo), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ]),
            d("div", OS, [
              d("span", FS, A(v.value), 1),
              d("div", VS, [
                d("span", NS, A(L(jt)(g.value[0])), 1),
                d("span", zS, A(L(jt)(g.value[1])), 1)
              ])
            ]),
            d("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes siguiente",
              onClick: T[1] || (T[1] = (B) => S(1))
            }, [
              z(L(Fo), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ])
          ]),
          d("div", jS, [
            (h(!0), x(he, null, pe(g.value, (B) => (h(), x("div", {
              key: `${B.getFullYear()}-${B.getMonth()}`,
              class: "w-full max-w-[252px] shrink-0"
            }, [
              d("div", HS, [
                (h(), x(he, null, pe(p, (j) => d("span", { key: j }, A(j), 1)), 64))
              ]),
              d("div", WS, [
                (h(!0), x(he, null, pe(L(Ul)(B), (j) => (h(), x("button", {
                  key: L(st)(j),
                  type: "button",
                  disabled: _(j),
                  class: Z(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", C(B, j)]),
                  onClick: (W) => M(j)
                }, A(j.getDate()), 11, KS))), 128))
              ])
            ]))), 128))
          ])
        ])
      ], 42, IS), [
        [Kt, r.value]
      ])
    ], 512));
  }
}), QS = ["aria-expanded", "aria-labelledby", "aria-label"], JS = ["aria-label", "onKeydown"], e3 = { class: "flex flex-col sm:flex-row" }, t3 = ["aria-label"], a3 = { class: "px-2 pt-1 pb-1.5 text-[10px] font-semibold uppercase dark:text-[#61616b] text-[#e3e3e8]" }, n3 = { class: "flex flex-col gap-0.5" }, o3 = ["onClick"], s3 = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, i3 = { class: "mb-4 flex items-center justify-between gap-2" }, l3 = ["aria-label"], r3 = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, c3 = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, d3 = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, u3 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, h3 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, f3 = ["aria-label"], g3 = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, m3 = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, p3 = { class: "grid grid-cols-7 gap-y-2 mt-2" }, b3 = ["disabled", "onClick"], v3 = "rounded-lg text-[#61616b]", y3 = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", x3 = "opacity-30", k3 = "bg-[#6b35e9] font-medium text-white", _3 = "bg-[#895af6] font-semibold text-white", w3 = /* @__PURE__ */ fe({
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
    const a = e, n = t, s = `${`kiut-dpp-${Ke()}`}-lbl`, i = ne(null), l = ne(null), r = ne(!1), c = ne(null), u = ne(_t(/* @__PURE__ */ new Date())), f = $(() => !!(a.modelValue.start && a.modelValue.end)), g = $(() => {
      const oe = _t(u.value);
      return [oe, Da(oe, 1)];
    }), b = $(
      () => a.placeholder ?? (a.locale === "es" ? "Seleccionar fechas" : "Select dates")
    ), m = $(() => a.ariaLabel ?? b.value), v = $(() => zl(a.locale)), p = $(() => f$(a.locale)), y = $(() => u$(a.locale)), k = $(
      () => a.locale === "es" ? "Preajustes de rango" : "Range presets"
    ), _ = $(
      () => a.locale === "es" ? "Mes anterior" : "Previous month"
    ), w = $(
      () => a.locale === "es" ? "Mes siguiente" : "Next month"
    ), C = $(
      () => a.locale === "es" ? "Calendario de rango con preajustes" : "Date range calendar with presets"
    ), M = $(() => {
      const oe = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return a.panelAlign === "end" ? `right-0 left-auto ${oe}` : `left-0 right-auto ${oe}`;
    }), S = $(
      () => `${jt(g.value[0], a.locale)} – ${jt(g.value[1], a.locale)}`
    ), I = $(() => {
      if (!a.modelValue.start || !a.modelValue.end) return b.value;
      const oe = ot(a.modelValue.start), R = ot(a.modelValue.end);
      return `${In(oe, a.locale)} – ${In(R, a.locale)}`;
    });
    function V(oe, R) {
      return oe.getMonth() === R.getMonth() && oe.getFullYear() === R.getFullYear();
    }
    function H(oe) {
      const R = Ve(oe);
      if (a.minDate) {
        const K = Ve(ot(a.minDate));
        if (Ht(R, K)) return !0;
      }
      if (a.maxDate) {
        const K = Ve(ot(a.maxDate));
        if (Ht(K, R)) return !0;
      }
      return !1;
    }
    function D(oe, R, K) {
      const Y = bt(oe, R), N = bt(oe, K);
      if (Y && N) return "rounded-lg";
      const ie = Y || oe.getDay() === 0, ce = N || oe.getDay() === 6;
      return ie && ce ? "rounded-lg" : ie ? "rounded-l-lg" : ce ? "rounded-r-lg" : "rounded-none";
    }
    function T(oe) {
      const R = p$(
        a.modelValue,
        oe,
        /* @__PURE__ */ new Date(),
        a.minDate,
        a.maxDate
      ), K = "text-[#61616b] hover:bg-[#efeff0b3] dark:text-[#e3e3e8] dark:hover:bg-[#23232fb3]";
      return R ? `${K} font-medium` : K;
    }
    function B(oe, R) {
      const K = V(R, oe), Y = H(R), N = a.modelValue.start ? Ve(ot(a.modelValue.start)) : null, ie = a.modelValue.end ? Ve(ot(a.modelValue.end)) : null, ce = Ve(R);
      if (Y)
        return v3;
      let ye = y3;
      if (N && ie && Wl(ce, N) && Kl(ce, ie)) {
        const le = bt(ce, N), de = bt(ce, ie);
        ye = `${D(ce, N, ie)} ${le || de ? _3 : k3}`;
      }
      return K || (ye = `${ye} ${x3}`), ye;
    }
    function j(oe) {
      const R = Hl(jl(oe), a.minDate, a.maxDate);
      n("update:modelValue", {
        start: st(R.start),
        end: st(R.end)
      }), u.value = _t(R.start), c.value = null, r.value = !1;
    }
    function W(oe) {
      if (H(oe)) return;
      const R = Ve(oe);
      if (!c.value) {
        c.value = new Date(R), n("update:modelValue", { start: st(R), end: st(R) });
        return;
      }
      let Y = Ve(c.value), N = new Date(R);
      Ht(N, Y) && ([Y, N] = [N, Y]), n("update:modelValue", { start: st(Y), end: st(N) }), c.value = null, r.value = !1;
    }
    function J(oe) {
      u.value = Da(u.value, oe);
    }
    function re() {
      r.value = !1;
    }
    function ue(oe) {
      if (oe.stopPropagation(), r.value) {
        r.value = !1;
        return;
      }
      if (r.value = !0, c.value = null, a.modelValue.start)
        try {
          u.value = _t(ot(a.modelValue.start));
        } catch {
        }
      We(() => l.value?.focus());
    }
    function q(oe) {
      if (!r.value) return;
      const R = i.value;
      R && !R.contains(oe.target) && (r.value = !1);
    }
    return Le(r, (oe) => {
      oe && (c.value = null);
    }), Je(() => {
      document.addEventListener("click", q);
    }), at(() => {
      document.removeEventListener("click", q);
    }), (oe, R) => (h(), x("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (h(), x("label", {
        key: 0,
        id: s,
        class: Z(L(ht))
      }, A(e.label), 3)) : F("", !0),
      d("button", {
        type: "button",
        class: Z([
          L(et),
          "group flex w-full items-center gap-2 text-left hover:bg-[#6b35e9] hover:text-white",
          r.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": r.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : m.value,
        onClick: ue
      }, [
        z(L(Eo), {
          class: "h-5 w-5 shrink-0 text-gray-500 transition-colors group-hover:text-white dark:text-slate-400",
          "aria-hidden": "true"
        }),
        d("span", {
          class: Z([
            "min-w-0 flex-1 truncate",
            f.value ? "" : "text-[color:var(--kiut-text-muted)] group-hover:text-white dark:text-slate-500"
          ])
        }, A(I.value), 3)
      ], 10, QS),
      Qe(d("div", {
        ref_key: "panelRef",
        ref: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": C.value,
        class: Z([
          M.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: $a(Re(re, ["stop"]), ["escape"])
      }, [
        d("div", e3, [
          d("aside", {
            class: "w-full shrink-0 border-b border-gray-200 p-3 sm:w-[176px] sm:border-r sm:border-b-0 dark:border-[color:var(--kiut-border-light)]",
            "aria-label": k.value
          }, [
            d("p", a3, A(p.value), 1),
            d("ul", n3, [
              (h(!0), x(he, null, pe(v.value, (K) => (h(), x("li", {
                key: K.id
              }, [
                d("button", {
                  type: "button",
                  class: Z(["w-full rounded-lg px-2 py-1.5 text-left text-xs transition focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", T(K.id)]),
                  onClick: (Y) => j(K.id)
                }, A(K.label), 11, o3)
              ]))), 128))
            ])
          ], 8, t3),
          d("div", s3, [
            d("div", i3, [
              d("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": _.value,
                onClick: R[0] || (R[0] = (K) => J(-1))
              }, [
                z(L(Oo), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, l3),
              d("div", r3, [
                d("span", c3, A(S.value), 1),
                d("div", d3, [
                  d("span", u3, A(L(jt)(g.value[0], e.locale)), 1),
                  d("span", h3, A(L(jt)(g.value[1], e.locale)), 1)
                ])
              ]),
              d("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": w.value,
                onClick: R[1] || (R[1] = (K) => J(1))
              }, [
                z(L(Fo), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, f3)
            ]),
            d("div", g3, [
              (h(!0), x(he, null, pe(g.value, (K) => (h(), x("div", {
                key: `${K.getFullYear()}-${K.getMonth()}`,
                class: "w-full max-w-[252px] shrink-0"
              }, [
                d("div", m3, [
                  (h(!0), x(he, null, pe(y.value, (Y) => (h(), x("span", { key: Y }, A(Y), 1))), 128))
                ]),
                d("div", p3, [
                  (h(!0), x(he, null, pe(L(Ul)(K), (Y) => (h(), x("button", {
                    key: L(st)(Y),
                    type: "button",
                    disabled: H(Y),
                    class: Z(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", B(K, Y)]),
                    onClick: (N) => W(Y)
                  }, A(Y.getDate()), 11, b3))), 128))
                ])
              ]))), 128))
            ])
          ])
        ])
      ], 42, JS), [
        [Kt, r.value]
      ])
    ], 512));
  }
}), C3 = { class: "kiut-translation-count-badge__content" }, $3 = { class: "kiut-translation-count-badge__title" }, S3 = { class: "kiut-translation-count-badge__pills" }, M3 = {
  key: 0,
  class: "kiut-translation-count-badge__pill-note"
}, _n = 8, ka = 12, D3 = /* @__PURE__ */ fe({
  name: "TranslationCountBadge",
  __name: "TranslationCountBadge",
  props: {
    label: {},
    tooltipTitle: {},
    items: {},
    variant: {},
    pulse: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, a = ne(!1), n = ne("top"), o = ne({
      top: "0px",
      left: "0px"
    }), s = ne(null), i = ne(null), l = $(() => {
      const b = "whitespace-nowrap rounded-md px-2 py-0.5 text-xs cursor-default font-['Inter',system-ui,sans-serif]";
      return t.variant === "configured" ? `${b} border border-purple-300 text-purple-700 dark:border-purple-700/50 dark:text-purple-400` : t.variant === "autoconfigured" ? `${b} border border-dashed border-green-400 text-green-600 dark:border-green-600 dark:text-green-400` : `${b} border border-gray-500/40 text-gray-500 dark:border-gray-600 dark:text-gray-400`;
    }), r = $(
      () => `kiut-translation-count-badge__pill kiut-translation-count-badge__pill--${t.variant}`
    );
    function c() {
      a.value = !1;
    }
    function u() {
      const b = s.value, m = i.value;
      if (!b || !m) return;
      const v = b.getBoundingClientRect(), p = m.getBoundingClientRect(), y = v.top - ka, k = window.innerHeight - v.bottom - ka, _ = y >= p.height + _n, w = k >= p.height + _n;
      let C = "top";
      _ ? C = "top" : w ? C = "bottom" : C = k >= y ? "bottom" : "top", n.value = C;
      let M = C === "top" ? v.top - p.height - _n : v.bottom + _n;
      M = Math.max(
        ka,
        Math.min(M, window.innerHeight - p.height - ka)
      );
      let S = v.left + v.width / 2 - p.width / 2;
      S = Math.max(
        ka,
        Math.min(S, window.innerWidth - p.width - ka)
      ), o.value = {
        top: `${M}px`,
        left: `${S}px`
      };
    }
    async function f() {
      if (!t.items.length) return;
      a.value = !0, await We();
      const b = i.value;
      b && (b.style.visibility = "hidden", u(), b.style.visibility = "visible");
    }
    function g() {
      a.value && c();
    }
    return window.addEventListener("scroll", g, !0), window.addEventListener("resize", g), at(() => {
      window.removeEventListener("scroll", g, !0), window.removeEventListener("resize", g);
    }), (b, m) => (h(), x(he, null, [
      d("span", {
        ref_key: "triggerRef",
        ref: s,
        class: Z([l.value, e.pulse && "animate-pulse"]),
        onMouseenter: f,
        onMouseleave: c,
        onFocus: f,
        onBlur: c
      }, A(e.label), 35),
      (h(), ee(Wt, { to: "body" }, [
        a.value && e.items.length ? (h(), x("div", {
          key: 0,
          ref_key: "tooltipRef",
          ref: i,
          role: "tooltip",
          class: Z(["kiut-translation-count-badge__tooltip", `kiut-translation-count-badge__tooltip--${n.value}`]),
          style: Ce({
            position: "fixed",
            top: o.value.top,
            left: o.value.left,
            zIndex: 1100
          }),
          onMouseenter: f,
          onMouseleave: c
        }, [
          d("div", C3, [
            d("span", $3, A(e.tooltipTitle), 1),
            d("div", S3, [
              (h(!0), x(he, null, pe(e.items, (v) => (h(), x("span", {
                key: v.id,
                class: Z(r.value)
              }, [
                Ae(A(v.label) + " ", 1),
                v.note ? (h(), x("span", M3, " (" + A(v.note) + ") ", 1)) : F("", !0)
              ], 2))), 128))
            ])
          ])
        ], 38)) : F("", !0)
      ]))
    ], 64));
  }
}), A3 = ["disabled", "aria-expanded", "aria-label"], T3 = { class: "min-w-0 flex-1 truncate" }, B3 = ["aria-selected", "onClick", "onMouseenter"], L3 = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, R3 = { class: "min-w-0 flex-1" }, I3 = /* @__PURE__ */ fe({
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
    const a = e, n = t, s = `${`kiut-tag-select-${Ke()}`}-listbox`, i = ne(null), l = ne(null), r = ne(null), c = ne(null), u = ne(!1), f = ne(0), g = ne({}), b = $(() => a.options.filter((J) => !J.disabled)), m = $(
      () => a.options.find((J) => J.value === a.modelValue) ?? null
    ), v = $(() => m.value?.color ?? "neutral"), p = $(
      () => $l(v.value, a.outlined)
    ), y = $(() => m.value ? m.value.label : a.modelValue !== null && a.modelValue !== void 0 && a.modelValue !== "" ? String(a.modelValue) : b.value[0]?.label ?? "Seleccionar…"), k = $(
      () => a.ariaLabel ?? `Estado: ${y.value}`
    );
    function _() {
      const J = l.value;
      if (!J) return;
      const re = J.getBoundingClientRect();
      g.value = {
        top: `${re.bottom + 4}px`,
        left: `${re.left}px`,
        minWidth: `${re.width}px`
      };
    }
    function w(J) {
      return `${String(J.value)}-${J.label}`;
    }
    function C(J) {
      return a.modelValue === J.value;
    }
    function M(J, re) {
      const ue = C(J), q = f.value === re;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        ue ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !ue && q ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function S() {
      f.value = Math.max(
        0,
        b.value.findIndex((J) => J.value === a.modelValue)
      );
    }
    function I() {
      _(), S(), We(() => c.value?.focus());
    }
    function V() {
      u.value = !1;
    }
    function H(J) {
      n("update:modelValue", J.value), V();
    }
    function D() {
      if (!a.disabled) {
        if (u.value) {
          V();
          return;
        }
        u.value = !0, I();
      }
    }
    function T(J) {
      J.stopPropagation(), !a.disabled && D();
    }
    function B(J) {
      if (!u.value) return;
      const re = J.target, ue = i.value, q = r.value;
      ue && !ue.contains(re) && (!q || !q.contains(re)) && V();
    }
    function j(J) {
      a.disabled || (J.key === "ArrowDown" || J.key === "Enter" || J.key === " ") && (J.preventDefault(), u.value || (u.value = !0, I()));
    }
    function W(J) {
      const re = b.value;
      if (J.key === "Escape") {
        J.preventDefault(), V(), l.value?.focus();
        return;
      }
      if (re.length !== 0) {
        if (J.key === "ArrowDown") {
          J.preventDefault(), f.value = Math.min(f.value + 1, re.length - 1);
          return;
        }
        if (J.key === "ArrowUp") {
          J.preventDefault(), f.value = Math.max(f.value - 1, 0);
          return;
        }
        if (J.key === "Enter") {
          J.preventDefault();
          const ue = re[f.value];
          ue && H(ue);
        }
      }
    }
    return Je(() => {
      document.addEventListener("click", B);
    }), at(() => {
      document.removeEventListener("click", B);
    }), (J, re) => (h(), x("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative inline-flex font-sans"
    }, [
      d("button", {
        ref_key: "buttonRef",
        ref: l,
        type: "button",
        disabled: e.disabled,
        class: Z([
          L(Cl),
          "cursor-pointer gap-1.5 transition-opacity disabled:cursor-not-allowed disabled:opacity-50",
          p.value,
          u.value ? "ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": u.value,
        "aria-haspopup": "listbox",
        "aria-controls": s,
        "aria-label": k.value,
        onClick: T,
        onKeydown: j
      }, [
        d("span", T3, A(y.value), 1),
        z(L(na), {
          class: Z(["h-3.5 w-3.5 shrink-0 opacity-70 transition-transform", u.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, A3),
      (h(), ee(Wt, { to: "body" }, [
        Qe(d("div", {
          ref_key: "panelRef",
          ref: r,
          style: Ce(g.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]"
        }, [
          d("ul", {
            id: s,
            ref_key: "listRef",
            ref: c,
            role: "listbox",
            tabindex: "-1",
            onKeydown: Re(W, ["stop"])
          }, [
            (h(!0), x(he, null, pe(b.value, (ue, q) => (h(), x("li", {
              key: w(ue),
              role: "option",
              "aria-selected": C(ue),
              class: Z(M(ue, q)),
              onClick: Re((oe) => H(ue), ["stop"]),
              onMouseenter: (oe) => f.value = q
            }, [
              d("span", L3, [
                C(ue) ? (h(), ee(L(Rn), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : F("", !0)
              ]),
              d("span", R3, A(ue.label), 1)
            ], 42, B3))), 128))
          ], 544)
        ], 4), [
          [Kt, u.value]
        ])
      ]))
    ], 512));
  }
}), P3 = ["aria-label"], E3 = { class: "flex flex-col gap-1" }, O3 = { class: "flex flex-row gap-3 items-center" }, F3 = {
  key: 0,
  class: "flex flex-row gap-1 items-center"
}, V3 = {
  key: 1,
  class: "flex flex-row gap-1 items-center"
}, N3 = /* @__PURE__ */ fe({
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
    const t = en(), a = e, n = {
      warning: A5,
      info: T5,
      success: D5,
      feature: L5,
      danger: R5
    }, o = {
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
    }, s = $(() => o[a.variant]), i = $(() => n[a.variant]);
    return (l, r) => (h(), x("div", {
      role: "region",
      "aria-label": e.title,
      class: Z([
        s.value.container,
        L(t).class,
        "p-4 flex flex-row gap-2 justify-start items-start border rounded-xl"
      ])
    }, [
      d("div", {
        class: Z([
          s.value.container_icon,
          "p-2 rounded-4xl flex justify-center items-center"
        ])
      }, [
        d("span", {
          class: Z([
            s.value.icon,
            "inline-flex shrink-0 [&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"
          ]),
          "aria-hidden": "true"
        }, [
          _e(l.$slots, "icon", {}, () => [
            (h(), ee(rt(i.value)))
          ])
        ], 2)
      ], 2),
      d("div", E3, [
        d("h1", {
          class: Z([s.value.title, "text-base font-bold"])
        }, A(a.title), 3),
        d("span", {
          class: Z([s.value.description, "text-sm leading-snug"])
        }, A(a.description), 3),
        d("div", O3, [
          a.date_start ? (h(), x("div", F3, [
            d("span", {
              class: Z([
                s.value.icon_date,
                "inline-flex shrink-0 [&>svg]:h-[1rem] [&>svg]:w-[1rem]"
              ]),
              "aria-hidden": "true"
            }, [
              _e(l.$slots, "icon_date", {}, () => [
                z(L(xi))
              ])
            ], 2),
            a.subtitle_date_start ? (h(), x("span", {
              key: 0,
              class: Z([s.value.subtitle_date, "text-xs font-bold"])
            }, A(a.subtitle_date_start), 3)) : F("", !0),
            d("span", {
              class: Z([s.value.date, "text-xs"])
            }, A(a.date_start), 3)
          ])) : F("", !0),
          a.date_final ? (h(), x("div", V3, [
            d("span", {
              class: Z([
                s.value.icon_date,
                "inline-flex shrink-0 [&>svg]:h-[1rem] [&>svg]:w-[1rem]"
              ]),
              "aria-hidden": "true"
            }, [
              _e(l.$slots, "icon_date", {}, () => [
                z(L(xi))
              ])
            ], 2),
            a.subtitle_date_final ? (h(), x("span", {
              key: 0,
              class: Z([s.value.subtitle_date, "text-xs font-bold"])
            }, A(a.subtitle_date_final), 3)) : F("", !0),
            d("span", {
              class: Z([s.value.date, "text-xs"])
            }, A(a.date_final), 3)
          ])) : F("", !0)
        ])
      ])
    ], 10, P3));
  }
}), z3 = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, j3 = ["id"], H3 = { class: "min-w-0 flex-1 space-y-1" }, W3 = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, K3 = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-6" }, U3 = {
  key: 0,
  class: "flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2"
}, Y3 = /* @__PURE__ */ fe({
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
    headerBorder: { type: Boolean, default: !0 },
    loading: { type: Boolean, default: !1 },
    showFooter: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue", "cancel", "confirm"],
  setup(e, { emit: t }) {
    const a = e, n = $(() => ({ maxWidth: `${a.width}px` })), o = t, i = `${`kiut-modal-${Ke()}`}-title`, l = ne(null);
    function r() {
      a.loading || (o("cancel"), o("update:modelValue", !1));
    }
    function c() {
      o("confirm");
    }
    function u(f) {
      if (a.modelValue && f.key === "Escape") {
        if (a.loading) return;
        f.preventDefault(), r();
      }
    }
    return Le(
      () => a.modelValue,
      (f) => {
        f && requestAnimationFrame(() => {
          l.value?.focus({ preventScroll: !0 });
        });
      }
    ), Je(() => {
      document.addEventListener("keydown", u);
    }), at(() => {
      document.removeEventListener("keydown", u);
    }), (f, g) => (h(), ee(Wt, { to: "body" }, [
      z(ct, { name: "kiut-modal" }, {
        default: O(() => [
          e.modelValue ? (h(), x("div", z3, [
            d("div", {
              class: "absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] dark:bg-black/60",
              "aria-hidden": "true",
              onClick: r
            }),
            d("div", {
              id: e.id,
              ref_key: "panelRef",
              ref: l,
              role: "dialog",
              "aria-modal": "true",
              "aria-labelledby": i,
              tabindex: "-1",
              class: "kiut-modal-panel relative z-10 flex max-h-[min(90vh,880px)] w-full flex-col overflow-hidden rounded-2xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] shadow-[var(--kiut-shadow-card)] dark:bg-[#252528] dark:shadow-black/40",
              style: Ce(n.value),
              onClick: g[0] || (g[0] = Re(() => {
              }, ["stop"]))
            }, [
              d("header", {
                class: Z(["flex shrink-0 justify-between gap-4 bg-slate-50/50 px-6 py-5 dark:bg-white/[0.02]", [
                  e.subtitle ? "items-start" : "items-center",
                  e.headerBorder ? "border-b border-slate-100 dark:border-[color:var(--kiut-border-light)]" : ""
                ]])
              }, [
                d("div", H3, [
                  d("h2", {
                    id: i,
                    class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                  }, A(e.title), 1),
                  e.subtitle ? (h(), x("p", W3, A(e.subtitle), 1)) : F("", !0)
                ]),
                z(Mt, {
                  variant: "action",
                  type: "button",
                  class: "shrink-0",
                  disabled: e.loading,
                  onClick: r
                }, {
                  icon: O(() => [
                    z(L(ho), { class: "h-5 w-5" })
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ], 2),
              d("div", K3, [
                _e(f.$slots, "default", {}, void 0, !0)
              ]),
              e.showFooter ? (h(), x("footer", U3, [
                z(Mt, {
                  variant: "secondary",
                  type: "button",
                  disabled: e.loading,
                  onClick: r
                }, {
                  default: O(() => [
                    Ae(A(e.cancelLabel), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                z(Mt, {
                  variant: "primary",
                  type: "button",
                  loading: e.loading,
                  onClick: c
                }, {
                  default: O(() => [
                    Ae(A(e.confirmLabel), 1)
                  ]),
                  _: 1
                }, 8, ["loading"])
              ])) : F("", !0)
            ], 12, j3)
          ])) : F("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), q3 = /* @__PURE__ */ be(Y3, [["__scopeId", "data-v-1ab330ef"]]), X3 = { class: "text-left font-['Inter',system-ui,sans-serif]" }, G3 = {
  key: 0,
  class: ""
}, Z3 = {
  key: 0,
  class: "flex min-w-0 flex-col gap-1.5 mb-4"
}, Q3 = { class: "flex min-w-0 flex-1 items-center" }, J3 = {
  key: 0,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, eM = {
  key: 0,
  class: "flex min-w-0 flex-1 flex-wrap items-center gap-2"
}, tM = {
  key: 1,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, aM = /* @__PURE__ */ fe({
  name: "Section",
  __name: "Section",
  setup(e) {
    const t = go(), a = $(() => {
      const n = !!t.filters, o = !!t.actions;
      return n && o ? "justify-between" : o ? "justify-end" : "";
    });
    return (n, o) => (h(), x("section", X3, [
      n.$slots.description || n.$slots.tabs || n.$slots.filters || n.$slots.actions ? (h(), x("header", G3, [
        n.$slots.description ? (h(), x("div", Z3, [
          _e(n.$slots, "description")
        ])) : F("", !0),
        n.$slots.tabs ? (h(), x("div", {
          key: 1,
          class: Z(["flex flex-wrap items-center gap-2", n.$slots.filters ? "" : "justify-between"])
        }, [
          d("div", Q3, [
            _e(n.$slots, "tabs")
          ]),
          n.$slots.actions && !n.$slots.filters ? (h(), x("div", J3, [
            _e(n.$slots, "actions")
          ])) : F("", !0)
        ], 2)) : F("", !0),
        n.$slots.filters || n.$slots.actions && !n.$slots.tabs ? (h(), x("div", {
          key: 2,
          class: Z([
            "flex flex-wrap gap-2 items-center",
            n.$slots.tabs ? "mt-2" : "",
            a.value
          ])
        }, [
          n.$slots.filters ? (h(), x("div", eM, [
            _e(n.$slots, "filters")
          ])) : F("", !0),
          n.$slots.actions ? (h(), x("div", tM, [
            _e(n.$slots, "actions")
          ])) : F("", !0)
        ], 2)) : F("", !0)
      ])) : F("", !0),
      n.$slots.content || n.$slots.default ? (h(), x("div", {
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
}), nM = { class: "flex flex-1 min-h-0" }, oM = {
  key: 0,
  class: "flex justify-center items-center my-4 shrink-0"
}, sM = {
  class: "flex-1 overflow-y-auto p-1 flex flex-col gap-1",
  "aria-label": "Sections"
}, iM = ["aria-current", "data-has-active", "title", "onClick"], lM = {
  key: 1,
  class: "footer-section shrink-0 border-t [background-color:var(--kiut-lateral-bg)]"
}, rM = { class: "px-4 py-4 shrink-0" }, cM = { class: "text-[12px] font-bold uppercase tracking-widest text-start [color:var(--kiut-text-subtitle)]" }, dM = {
  class: "flex-1 overflow-y-auto px-1 pb-3 flex flex-col gap-0.5",
  "aria-label": "Section items"
}, uM = ["data-nav-id", "aria-current", "onClick"], hM = { class: "flex items-center justify-between px-5 py-3 shrink-0" }, fM = { class: "text-xs font-bold uppercase tracking-widest [color:var(--kiut-text-muted)]" }, gM = {
  class: "overflow-y-auto flex-1 px-3 pb-5 flex flex-col gap-1",
  "aria-label": "Section items"
}, mM = ["data-nav-id", "aria-current", "onClick"], pM = { class: "truncate text-[15px]" }, bM = ["aria-current", "data-has-active", "onClick"], vM = {
  key: 0,
  class: "absolute top-0 w-1/2 h-0.5 rounded-full [background-color:var(--kiut-primary)]",
  "aria-hidden": "true"
}, yM = { class: "text-[9px] font-semibold leading-none truncate w-full text-center px-0.5" }, xM = /* @__PURE__ */ fe({
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
    const a = ne(!1), n = e, o = t, s = en(), { class: i, ...l } = s, r = ne(!1);
    function c() {
      typeof window > "u" || (r.value = window.innerWidth < n.mobileBreakpoint);
    }
    Je(() => {
      c(), window.addEventListener("resize", c);
    }), at(() => {
      window.removeEventListener("resize", c);
    });
    const u = $(() => {
      const y = n.sections.find((k) => k.id === n.selectedSectionId);
      return y?.items?.length ? y : null;
    });
    function f(y) {
      return n.activePath ? n.activePath === y.path || n.activePath.startsWith(y.path + "/") : !1;
    }
    function g(y) {
      return y.items?.length ? y.items.some(f) : !n.activePath || !y.path ? !1 : n.activePath === y.path || n.activePath.startsWith(y.path + "/");
    }
    function b(y) {
      if (!y.items?.length) {
        o("update:selectedSectionId", null), o("navigate", {
          section: y,
          item: { id: y.id, label: y.label, path: y.path }
        });
        return;
      }
      const k = n.selectedSectionId === y.id ? null : y.id;
      o("update:selectedSectionId", k);
    }
    function m(y, k) {
      o("navigate", { section: y, item: k });
    }
    function v() {
      o("update:selectedSectionId", null);
    }
    function p(y, k) {
      m(y, k), v();
    }
    return (y, k) => r.value ? (h(), x("div", yt({
      key: 1,
      class: "kiut-app-shell-nav font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      z(ct, { name: "ksn-overlay" }, {
        default: O(() => [
          u.value ? (h(), x("div", {
            key: 0,
            class: "fixed inset-0 bg-black/40 z-40",
            "aria-hidden": "true",
            onClick: v
          })) : F("", !0)
        ]),
        _: 1
      }),
      z(ct, { name: "ksn-sheet" }, {
        default: O(() => [
          u.value ? (h(), x("div", {
            key: 0,
            class: "mobile-subsections fixed left-0 right-0 bottom-0 z-50 [background-color:var(--kiut-lateral-bg)] rounded-t-2xl shadow-2xl border-t max-h-[70vh] flex flex-col",
            style: Ce({ paddingBottom: n.mobileBarHeight })
          }, [
            k[3] || (k[3] = d("div", { class: "flex justify-center pt-3 pb-1 shrink-0" }, [
              d("div", { class: "w-10 h-1 rounded-full [background-color:var(--kiut-lateral-border-color)] dark:bg-purple-500/30" })
            ], -1)),
            d("div", hM, [
              d("p", fM, A(u.value.label), 1),
              d("button", {
                type: "button",
                class: "w-8 h-8 flex items-center justify-center rounded-lg [color:var(--kiut-text-muted)] hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-500/20 dark:hover:text-purple-300 transition-colors",
                "aria-label": "Close",
                onClick: v
              }, [...k[2] || (k[2] = [
                d("svg", {
                  class: "w-4 h-4",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2.5",
                  "stroke-linecap": "round"
                }, [
                  d("path", { d: "M18 6L6 18M6 6l12 12" })
                ], -1)
              ])])
            ]),
            d("nav", gM, [
              (h(!0), x(he, null, pe(u.value.items, (_) => (h(), x("button", {
                key: _.id,
                type: "button",
                "data-nav-id": _.id,
                "aria-current": f(_) ? "page" : void 0,
                class: "ksn-item-btn group flex items-center gap-3 w-full text-left px-4 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20 min-h-[52px]",
                onClick: (w) => p(u.value, _)
              }, [
                _.icon ? (h(), ee(rt(_.icon), {
                  key: 0,
                  class: "shrink-0",
                  style: { width: "18px", height: "18px" },
                  "aria-hidden": "true"
                })) : F("", !0),
                d("span", pM, A(_.label), 1)
              ], 8, mM))), 128))
            ])
          ], 4)) : F("", !0)
        ]),
        _: 1
      }),
      d("nav", {
        class: "ksn-mobile-bar fixed bottom-0 left-0 right-0 z-50 border-t flex items-stretch justify-around overflow-hidden",
        style: Ce({ height: e.mobileBarHeight }),
        "aria-label": "Sections"
      }, [
        (h(!0), x(he, null, pe(e.sections, (_) => (h(), x("button", {
          key: _.id,
          type: "button",
          "aria-current": e.selectedSectionId === _.id ? "true" : void 0,
          "data-has-active": g(_) ? "true" : void 0,
          class: "ksn-section-btn relative flex-1 flex flex-col items-center justify-center gap-1 py-1 px-0.5 min-w-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-inset",
          onClick: (w) => b(_)
        }, [
          e.selectedSectionId === _.id || g(_) ? (h(), x("span", vM)) : F("", !0),
          _.icon ? (h(), ee(rt(_.icon), {
            key: 1,
            class: "shrink-0",
            style: Ce({ width: e.primaryIconSize, height: e.primaryIconSize }),
            "aria-hidden": "true"
          }, null, 8, ["style"])) : F("", !0),
          d("span", yM, A(_.label), 1)
        ], 8, bM))), 128))
      ], 4)
    ], 16)) : (h(), x("aside", yt({
      key: 0,
      class: "kiut-app-shell-nav flex flex-col h-full overflow-hidden font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      d("div", nM, [
        d("div", {
          class: "primary-rail flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r justify-center",
          style: Ce({
            "--expanded-width": e.expandedPrimaryWidth,
            width: e.primaryRailWidth
          }),
          onMouseenter: k[0] || (k[0] = (_) => a.value = !0),
          onMouseleave: k[1] || (k[1] = (_) => a.value = !1)
        }, [
          y.$slots.logo ? (h(), x("div", oM, [
            _e(y.$slots, "logo", { expanded: a.value }, void 0, !0)
          ])) : F("", !0),
          d("nav", sM, [
            (h(!0), x(he, null, pe(e.sections, (_) => (h(), x("button", {
              key: _.id,
              type: "button",
              "aria-current": e.selectedSectionId === _.id ? "true" : void 0,
              "data-has-active": g(_) ? "true" : void 0,
              title: _.label,
              class: "ksn-section-btn group relative flex flex-row items-center justify-start gap-1 px-3 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
              onClick: (w) => b(_)
            }, [
              _.icon ? (h(), ee(rt(_.icon), {
                key: 0,
                class: "shrink-0",
                style: Ce({ width: e.primaryIconSize, height: e.primaryIconSize }),
                "aria-hidden": "true"
              }, null, 8, ["style"])) : F("", !0),
              d("span", {
                class: "leading-tight font-semibold tracking-wide text-left w-full truncate px-1 color-",
                style: Ce({ fontSize: e.primaryFontSize })
              }, A(_.label), 5)
            ], 8, iM))), 128))
          ]),
          y.$slots.footer ? (h(), x("div", lM, [
            _e(y.$slots, "footer", { expanded: a.value }, void 0, !0)
          ])) : F("", !0)
        ], 36),
        z(ct, { name: "ksn-sub" }, {
          default: O(() => [
            u.value ? (h(), x("div", {
              key: "secondary",
              class: "secondary-panel flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r [border-color:var(--kiut-lateral-border-color)] overflow-hidden",
              style: Ce({ width: e.secondaryWidth })
            }, [
              d("div", rM, [
                d("p", cM, A(u.value.label), 1)
              ]),
              d("nav", dM, [
                (h(!0), x(he, null, pe(u.value.items, (_) => (h(), x("button", {
                  key: _.id,
                  type: "button",
                  "data-nav-id": _.id,
                  "aria-current": f(_) ? "page" : void 0,
                  class: "ksn-item-btn group flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
                  onClick: (w) => m(u.value, _)
                }, [
                  _.icon ? (h(), ee(rt(_.icon), {
                    key: 0,
                    style: Ce({ width: e.secondaryIconSize, height: e.secondaryIconSize })
                  }, null, 8, ["style"])) : F("", !0),
                  d("span", {
                    class: "truncate",
                    style: Ce({ fontSize: e.secondaryFontSize })
                  }, A(_.label), 5)
                ], 8, uM))), 128))
              ])
            ], 4)) : F("", !0)
          ]),
          _: 1
        })
      ])
    ], 16));
  }
}), kM = /* @__PURE__ */ be(xM, [["__scopeId", "data-v-e0ccb96c"]]), _M = ["aria-label"], wM = {
  key: 0,
  class: "shrink-0 px-4 py-4"
}, CM = { class: "text-start text-[12px] font-bold uppercase tracking-widest [color:var(--kiut-text-subtitle)]" }, $M = ["aria-label"], SM = ["data-nav-id", "data-testid", "disabled", "aria-current", "onClick"], MM = {
  key: 1,
  class: "h-3.5 w-3.5 shrink-0 opacity-70",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, DM = /* @__PURE__ */ fe({
  name: "VerticalNavPanel",
  __name: "VerticalNavPanel",
  props: {
    items: {},
    modelValue: {},
    title: {},
    ariaLabel: { default: "Section navigation" },
    panelWidth: { default: "14rem" },
    fontSize: { default: "14px" },
    iconSize: { default: "16px" }
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: t }) {
    const a = e, n = t;
    function o(i) {
      return i.value === a.modelValue;
    }
    function s(i) {
      if (i.disabled || i.value === a.modelValue) return;
      const l = a.modelValue;
      n("update:modelValue", i.value), n("change", { value: i.value, previousValue: l });
    }
    return (i, l) => (h(), x("aside", {
      class: "kiut-vertical-nav-panel flex shrink-0 flex-col overflow-hidden rounded-xl border border-[color:var(--kiut-border-light)] [background-color:var(--kiut-lateral-bg)] font-['Inter',system-ui,sans-serif]",
      style: Ce({ width: e.panelWidth }),
      role: "navigation",
      "aria-label": e.ariaLabel
    }, [
      e.title ? (h(), x("div", wM, [
        d("p", CM, A(e.title), 1)
      ])) : F("", !0),
      d("nav", {
        class: Z(["flex flex-1 flex-col gap-0.5 overflow-y-auto px-1 pb-3", { "pt-2": !e.title }]),
        "aria-label": e.title || e.ariaLabel
      }, [
        (h(!0), x(he, null, pe(e.items, (r) => (h(), x("button", {
          key: r.value,
          type: "button",
          "data-nav-id": r.value,
          "data-testid": r.testId,
          disabled: r.disabled === !0,
          "aria-current": o(r) ? "true" : void 0,
          class: "kvnp-item group flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20 disabled:cursor-not-allowed disabled:opacity-40",
          onClick: (c) => s(r)
        }, [
          r.icon ? (h(), ee(rt(r.icon), {
            key: 0,
            class: "shrink-0",
            style: Ce({ width: e.iconSize, height: e.iconSize }),
            "aria-hidden": "true"
          }, null, 8, ["style"])) : F("", !0),
          d("span", {
            class: "min-w-0 flex-1 truncate",
            style: Ce({ fontSize: e.fontSize })
          }, A(r.label), 5),
          o(r) ? (h(), x("svg", MM, [...l[0] || (l[0] = [
            d("path", { d: "M9 6l6 6-6 6" }, null, -1)
          ])])) : F("", !0)
        ], 8, SM))), 128))
      ], 10, $M)
    ], 12, _M));
  }
}), Xl = /* @__PURE__ */ be(DM, [["__scopeId", "data-v-cf2cdc84"]]), AM = { class: "kiut-module-nav-layout flex min-h-0 w-full flex-col gap-4 md:flex-row md:items-start" }, TM = { class: "min-w-0 flex-1" }, BM = /* @__PURE__ */ fe({
  name: "ModuleNavLayout",
  __name: "ModuleNavLayout",
  props: {
    items: {},
    modelValue: {},
    title: {},
    ariaLabel: { default: "Section navigation" },
    panelWidth: { default: "14rem" },
    fontSize: { default: "14px" },
    iconSize: { default: "16px" }
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: t }) {
    const a = t;
    return (n, o) => (h(), x("div", AM, [
      z(Xl, {
        title: e.title,
        items: e.items,
        "model-value": e.modelValue,
        "aria-label": e.ariaLabel,
        "panel-width": e.panelWidth,
        "font-size": e.fontSize,
        "icon-size": e.iconSize,
        "onUpdate:modelValue": o[0] || (o[0] = (s) => a("update:modelValue", s)),
        onChange: o[1] || (o[1] = (s) => a("change", s))
      }, null, 8, ["title", "items", "model-value", "aria-label", "panel-width", "font-size", "icon-size"]),
      d("div", TM, [
        n.$slots.default ? (h(), ee(ct, {
          key: 0,
          name: "module-nav-panel",
          mode: "out-in"
        }, {
          default: O(() => [
            (h(), x("div", {
              key: e.modelValue,
              class: "module-nav-panel"
            }, [
              _e(n.$slots, "default", { active: e.modelValue }, void 0, !0)
            ]))
          ]),
          _: 3
        })) : _e(n.$slots, "default", { key: 1 }, void 0, !0)
      ])
    ]));
  }
}), LM = /* @__PURE__ */ be(BM, [["__scopeId", "data-v-6f3134eb"]]), HM = {
  install(e) {
    e.component("KiutChartBar", $t), e.component("KiutChartLine", pt), e.component("KiutPieChart", Vn), e.component("KiutBoxplotChart", Wf), e.component("KiutCandlestickChart", Bg), e.component("KiutHistogramChart", kl), e.component("KiutSankeyChart", Yt), e.component("KiutAgentsPerDay", Dp), e.component("KiutBookingManager", l0), e.component("KiutCheckin", _0), e.component("KiutCheckinContainer", Z0), e.component("KiutCheckinMetrics", Sl), e.component("KiutCheckinSegments", Ml), e.component("KiutDisruption", mb), e.component("KiutFAQ", wb), e.component("KiutMessagesPerAgent", Dl), e.component("KiutRecordLocator", mv), e.component("KiutSalesByChannel", Al), e.component("KiutSeller", Tl), e.component("KiutSellerContainer", Jv), e.component("KiutAncillaries", by), e.component("KiutAncillariesCR", Py), e.component("KiutTopAgents", jy), e.component("KiutPaymentMethod", c1), e.component("KiutAgentHumanConversations", T1), e.component("KiutChannelMetrics", Bl), e.component("KiutConversationVolume", H1), e.component("KiutTriageCombinations", nx), e.component("KiutSelectLanguage", cx), e.component("KiutGuardrails", yx), e.component("KiutDisruptionNotifier", Vx), e.component("KiutTotalConversationsCard", zx), e.component("KiutCsatP95Card", Hx), e.component("KiutCsatPulseCard", Wx), e.component("KiutCSATContainer", vk), e.component("KiutAiGeneratedRevenueCard", xk), e.component("KiutAiGeneratedChart", Ak), e.component("KiutTransactionsChart", Fk), e.component("KiutCostCard", Nk), e.component("KiutHumanEscalations", Xk), e.component("KiutHumanEscalationsCard", Zk), e.component("KiutAvgResolutionTime", c_), e.component("KiutAvgResolutionTimeCard", p_), e.component("KiutCheckinCR", v_), e.component("KiutSellerCR", x_), e.component("KiutBookingManagerCR", __), e.component("KiutNpsDailyMetrics", Rl), e.component("KiutNpsMetrics", Il), e.component("KiutNpsOverviewMetrics", Ll), e.component("KiutAWSCost", T_), e.component("KiutCostUsage", N_), e.component("KiutTokenUsage", G_), e.component("KiutConversationCount", i2), e.component("KiutTopAgentsAnalysis", v2), e.component("KiutTopAgentsPie", M2), e.component("KiutDailyCostTrends", E2), e.component("KiutModelUsage", G2), e.component("KiutMessageRoles", sw), e.component("KiutCostPerConversations", bw), e.component("Tabs", Pl), e.component("Table", Iw), e.component("TableVersions", M5), e.component("Filters", uC), e.component("InputText", Nl), e.component("InputPassword", $C), e.component("InputTextarea", TC), e.component("InputFile", GC), e.component("ImageUploadCircle", n$), e.component("InputDateTime", F$), e.component("InputTime", U$), e.component("InputRange", i4), e.component("InputNumber", u4), e.component("InputColorPicker", x4), e.component("EmojiPicker", F4), e.component("Select", Et), e.component("LanguageSelect", V4), e.component("LanguagePicker", X4), e.component("MultiSelect", fS), e.component("Toggle", Vl), e.component("InputPhone", kS), e.component("SelectablePills", DS), e.component("SegmentedControl", LS), e.component("DateRangePicker", ZS), e.component("DatePickerPresets", w3), e.component("Tag", Xe), e.component("TagSelect", I3), e.component("TranslationCountBadge", D3), e.component("Button", Mt), e.component("Banner", N3), e.component("Modal", q3), e.component("Section", aM), e.component("KiutAppShellNavigation", kM), e.component("ModuleNavLayout", LM), e.component("VerticalNavPanel", Xl);
  }
};
export {
  T_ as AWSCost,
  T1 as AgentHumanConversations,
  Dp as AgentsPerDay,
  Ak as AiGeneratedChart,
  xk as AiGeneratedRevenueCard,
  by as Ancillaries,
  Py as AncillariesCR,
  kM as AppShellNavigation,
  c_ as AvgResolutionTime,
  p_ as AvgResolutionTimeCard,
  N3 as Banner,
  l0 as BookingManager,
  __ as BookingManagerCR,
  Wf as BoxplotChart,
  Mt as Button,
  vk as CSATContainer,
  Bg as CandlestickChart,
  Bl as ChannelMetrics,
  $t as ChartBar,
  pt as ChartLine,
  _0 as Checkin,
  v_ as CheckinCR,
  Z0 as CheckinContainer,
  Sl as CheckinMetrics,
  Ml as CheckinSegments,
  i2 as ConversationCount,
  H1 as ConversationVolume,
  Nk as CostCard,
  bw as CostPerConversations,
  N_ as CostUsage,
  Hx as CsatP95Card,
  Wx as CsatPulseCard,
  Yl as DEFAULT_CATEGORY_LABELS,
  ql as DEFAULT_EMOJI_CATALOG,
  i5 as DEFAULT_TABLE_VERSIONS_LABELS,
  E2 as DailyCostTrends,
  w3 as DatePickerPresets,
  ZS as DateRangePicker,
  mb as Disruption,
  Vx as DisruptionNotifier,
  l5 as ENDPOINT_TABLE_VERSIONS_COLUMNS,
  F4 as EmojiPicker,
  wb as FAQ,
  uC as Filters,
  yx as Guardrails,
  kl as HistogramChart,
  Xk as HumanEscalations,
  Zk as HumanEscalationsCard,
  n$ as ImageUploadCircle,
  x4 as InputColorPicker,
  F$ as InputDateTime,
  GC as InputFile,
  u4 as InputNumber,
  $C as InputPassword,
  kS as InputPhone,
  i4 as InputRange,
  Nl as InputText,
  TC as InputTextarea,
  U$ as InputTime,
  HM as KiutUIPlugin,
  X4 as LanguagePicker,
  V4 as LanguageSelect,
  sw as MessageRoles,
  Dl as MessagesPerAgent,
  q3 as Modal,
  G2 as ModelUsage,
  LM as ModuleNavLayout,
  fS as MultiSelect,
  Rl as NpsDailyMetrics,
  Il as NpsMetrics,
  Ll as NpsOverviewMetrics,
  c1 as PaymentMethod,
  Vn as PieChart,
  zM as RESOURCE_TABLE_VERSIONS_COLUMNS,
  mv as RecordLocator,
  Al as SalesByChannel,
  Yt as SankeyChart,
  aM as Section,
  LS as SegmentedControl,
  Et as Select,
  cx as SelectLanguage,
  DS as SelectablePills,
  Tl as Seller,
  x_ as SellerCR,
  Jv as SellerContainer,
  Iw as Table,
  M5 as TableVersions,
  Pl as Tabs,
  Xe as Tag,
  I3 as TagSelect,
  Vl as Toggle,
  G_ as TokenUsage,
  jy as TopAgents,
  v2 as TopAgentsAnalysis,
  M2 as TopAgentsPie,
  zx as TotalConversationsCard,
  Fk as TransactionsChart,
  D3 as TranslationCountBadge,
  nx as TriageCombinations,
  Xl as VerticalNavPanel,
  C4 as appendEmojiToDraft,
  jM as buildDefaultCategories,
  w4 as extractEmojis,
  _4 as filterEmojiCatalog
};
//# sourceMappingURL=kiut-ui.es.js.map
