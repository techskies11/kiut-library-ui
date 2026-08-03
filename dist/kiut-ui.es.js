import { defineComponent as he, shallowRef as xi, h as je, ref as ne, onMounted as Je, onUnmounted as rt, watch as Te, toRaw as Jn, nextTick as Ke, version as Ur, isProxy as ki, computed as $, toRef as $e, openBlock as g, createElementBlock as x, normalizeStyle as Ce, createVNode as N, unref as T, createElementVNode as d, Fragment as ue, renderList as pe, normalizeClass as Z, toDisplayString as A, createCommentVNode as F, onBeforeUnmount as _i, createStaticVNode as eo, useSlots as ho, renderSlot as ke, Transition as pt, withCtx as O, Comment as Yr, createBlock as ae, resolveDynamicComponent as ft, createTextVNode as Ae, Teleport as Qt, withDirectives as Xe, withModifiers as Be, vModelText as Rt, vShow as Ht, createSlots as Vo, vModelSelect as qr, mergeProps as yt, useAttrs as Ja, withKeys as Ca, inject as wi } from "vue";
import * as zo from "echarts/core";
import { TooltipComponent as Xr, TitleComponent as Gr } from "echarts/components";
import { SankeyChart as Zr } from "echarts/charts";
import { CanvasRenderer as Qr } from "echarts/renderers";
import He from "moment";
function en(e) {
  return e + 0.5 | 0;
}
const Yt = (e, t, a) => Math.max(Math.min(e, a), t);
function Fa(e) {
  return Yt(en(e * 2.55), 0, 255);
}
function Zt(e) {
  return Yt(en(e * 255), 0, 255);
}
function Vt(e) {
  return Yt(en(e / 2.55) / 100, 0, 1);
}
function No(e) {
  return Yt(en(e * 100), 0, 100);
}
const vt = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, to = [..."0123456789ABCDEF"], Jr = (e) => to[e & 15], el = (e) => to[(e & 240) >> 4] + to[e & 15], on = (e) => (e & 240) >> 4 === (e & 15), tl = (e) => on(e.r) && on(e.g) && on(e.b) && on(e.a);
function al(e) {
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
const nl = (e, t) => e < 255 ? t(e) : "";
function ol(e) {
  var t = tl(e) ? Jr : el;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + nl(e.a, t) : void 0;
}
const sl = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Ci(e, t, a) {
  const n = t * Math.min(a, 1 - a), o = (s, i = (s + e / 30) % 12) => a - n * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [o(0), o(8), o(4)];
}
function il(e, t, a) {
  const n = (o, s = (o + e / 60) % 6) => a - a * t * Math.max(Math.min(s, 4 - s, 1), 0);
  return [n(5), n(3), n(1)];
}
function rl(e, t, a) {
  const n = Ci(e, 1, 0.5);
  let o;
  for (t + a > 1 && (o = 1 / (t + a), t *= o, a *= o), o = 0; o < 3; o++)
    n[o] *= 1 - t - a, n[o] += t;
  return n;
}
function ll(e, t, a, n, o) {
  return e === o ? (t - a) / n + (t < a ? 6 : 0) : t === o ? (a - e) / n + 2 : (e - t) / n + 4;
}
function fo(e) {
  const a = e.r / 255, n = e.g / 255, o = e.b / 255, s = Math.max(a, n, o), i = Math.min(a, n, o), r = (s + i) / 2;
  let l, c, u;
  return s !== i && (u = s - i, c = r > 0.5 ? u / (2 - s - i) : u / (s + i), l = ll(a, n, o, u, s), l = l * 60 + 0.5), [l | 0, c || 0, r];
}
function go(e, t, a, n) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, a, n)).map(Zt);
}
function mo(e, t, a) {
  return go(Ci, e, t, a);
}
function cl(e, t, a) {
  return go(rl, e, t, a);
}
function dl(e, t, a) {
  return go(il, e, t, a);
}
function $i(e) {
  return (e % 360 + 360) % 360;
}
function ul(e) {
  const t = sl.exec(e);
  let a = 255, n;
  if (!t)
    return;
  t[5] !== n && (a = t[6] ? Fa(+t[5]) : Zt(+t[5]));
  const o = $i(+t[2]), s = +t[3] / 100, i = +t[4] / 100;
  return t[1] === "hwb" ? n = cl(o, s, i) : t[1] === "hsv" ? n = dl(o, s, i) : n = mo(o, s, i), {
    r: n[0],
    g: n[1],
    b: n[2],
    a
  };
}
function hl(e, t) {
  var a = fo(e);
  a[0] = $i(a[0] + t), a = mo(a), e.r = a[0], e.g = a[1], e.b = a[2];
}
function fl(e) {
  if (!e)
    return;
  const t = fo(e), a = t[0], n = No(t[1]), o = No(t[2]);
  return e.a < 255 ? `hsla(${a}, ${n}%, ${o}%, ${Vt(e.a)})` : `hsl(${a}, ${n}%, ${o}%)`;
}
const jo = {
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
}, Ho = {
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
function gl() {
  const e = {}, t = Object.keys(Ho), a = Object.keys(jo);
  let n, o, s, i, r;
  for (n = 0; n < t.length; n++) {
    for (i = r = t[n], o = 0; o < a.length; o++)
      s = a[o], r = r.replace(s, jo[s]);
    s = parseInt(Ho[i], 16), e[r] = [s >> 16 & 255, s >> 8 & 255, s & 255];
  }
  return e;
}
let sn;
function ml(e) {
  sn || (sn = gl(), sn.transparent = [0, 0, 0, 0]);
  const t = sn[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const pl = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function bl(e) {
  const t = pl.exec(e);
  let a = 255, n, o, s;
  if (t) {
    if (t[7] !== n) {
      const i = +t[7];
      a = t[8] ? Fa(i) : Yt(i * 255, 0, 255);
    }
    return n = +t[1], o = +t[3], s = +t[5], n = 255 & (t[2] ? Fa(n) : Yt(n, 0, 255)), o = 255 & (t[4] ? Fa(o) : Yt(o, 0, 255)), s = 255 & (t[6] ? Fa(s) : Yt(s, 0, 255)), {
      r: n,
      g: o,
      b: s,
      a
    };
  }
}
function vl(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${Vt(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const Vn = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, ba = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function yl(e, t, a) {
  const n = ba(Vt(e.r)), o = ba(Vt(e.g)), s = ba(Vt(e.b));
  return {
    r: Zt(Vn(n + a * (ba(Vt(t.r)) - n))),
    g: Zt(Vn(o + a * (ba(Vt(t.g)) - o))),
    b: Zt(Vn(s + a * (ba(Vt(t.b)) - s))),
    a: e.a + a * (t.a - e.a)
  };
}
function rn(e, t, a) {
  if (e) {
    let n = fo(e);
    n[t] = Math.max(0, Math.min(n[t] + n[t] * a, t === 0 ? 360 : 1)), n = mo(n), e.r = n[0], e.g = n[1], e.b = n[2];
  }
}
function Si(e, t) {
  return e && Object.assign(t || {}, e);
}
function Wo(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = Zt(e[3]))) : (t = Si(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = Zt(t.a)), t;
}
function xl(e) {
  return e.charAt(0) === "r" ? bl(e) : ul(e);
}
class Wa {
  constructor(t) {
    if (t instanceof Wa)
      return t;
    const a = typeof t;
    let n;
    a === "object" ? n = Wo(t) : a === "string" && (n = al(t) || ml(t) || xl(t)), this._rgb = n, this._valid = !!n;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = Si(this._rgb);
    return t && (t.a = Vt(t.a)), t;
  }
  set rgb(t) {
    this._rgb = Wo(t);
  }
  rgbString() {
    return this._valid ? vl(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? ol(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? fl(this._rgb) : void 0;
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
    return t && (this._rgb = yl(this._rgb, t._rgb, a)), this;
  }
  clone() {
    return new Wa(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = Zt(t), this;
  }
  clearer(t) {
    const a = this._rgb;
    return a.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, a = en(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
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
    return hl(this._rgb, t), this;
  }
}
function Et() {
}
const kl = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function Ee(e) {
  return e == null;
}
function Ze(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function Le(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function _t(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function Tt(e, t) {
  return _t(e) ? e : t;
}
function De(e, t) {
  return typeof e > "u" ? t : e;
}
const _l = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, Mi = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function Ne(e, t, a) {
  if (e && typeof e.call == "function")
    return e.apply(a, t);
}
function Fe(e, t, a, n) {
  let o, s, i;
  if (Ze(e))
    for (s = e.length, o = 0; o < s; o++)
      t.call(a, e[o], o);
  else if (Le(e))
    for (i = Object.keys(e), s = i.length, o = 0; o < s; o++)
      t.call(a, e[i[o]], i[o]);
}
function Cn(e, t) {
  let a, n, o, s;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (a = 0, n = e.length; a < n; ++a)
    if (o = e[a], s = t[a], o.datasetIndex !== s.datasetIndex || o.index !== s.index)
      return !1;
  return !0;
}
function $n(e) {
  if (Ze(e))
    return e.map($n);
  if (Le(e)) {
    const t = /* @__PURE__ */ Object.create(null), a = Object.keys(e), n = a.length;
    let o = 0;
    for (; o < n; ++o)
      t[a[o]] = $n(e[a[o]]);
    return t;
  }
  return e;
}
function Di(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function wl(e, t, a, n) {
  if (!Di(e))
    return;
  const o = t[e], s = a[e];
  Le(o) && Le(s) ? Ka(o, s, n) : t[e] = $n(s);
}
function Ka(e, t, a) {
  const n = Ze(t) ? t : [
    t
  ], o = n.length;
  if (!Le(e))
    return e;
  a = a || {};
  const s = a.merger || wl;
  let i;
  for (let r = 0; r < o; ++r) {
    if (i = n[r], !Le(i))
      continue;
    const l = Object.keys(i);
    for (let c = 0, u = l.length; c < u; ++c)
      s(l[c], e, i, a);
  }
  return e;
}
function za(e, t) {
  return Ka(e, t, {
    merger: Cl
  });
}
function Cl(e, t, a) {
  if (!Di(e))
    return;
  const n = t[e], o = a[e];
  Le(n) && Le(o) ? za(n, o) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = $n(o));
}
const Ko = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function $l(e) {
  const t = e.split("."), a = [];
  let n = "";
  for (const o of t)
    n += o, n.endsWith("\\") ? n = n.slice(0, -1) + "." : (a.push(n), n = "");
  return a;
}
function Sl(e) {
  const t = $l(e);
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
  return (Ko[t] || (Ko[t] = Sl(t)))(e);
}
function po(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const Ua = (e) => typeof e < "u", Jt = (e) => typeof e == "function", Uo = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const a of e)
    if (!t.has(a))
      return !1;
  return !0;
};
function Ml(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const Oe = Math.PI, Ue = 2 * Oe, Dl = Ue + Oe, Sn = Number.POSITIVE_INFINITY, Al = Oe / 180, Qe = Oe / 2, sa = Oe / 4, Yo = Oe * 2 / 3, Ai = Math.log10, Pt = Math.sign;
function Na(e, t, a) {
  return Math.abs(e - t) < a;
}
function qo(e) {
  const t = Math.round(e);
  e = Na(e, t, e / 1e3) ? t : e;
  const a = Math.pow(10, Math.floor(Ai(e))), n = e / a;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * a;
}
function Tl(e) {
  const t = [], a = Math.sqrt(e);
  let n;
  for (n = 1; n < a; n++)
    e % n === 0 && (t.push(n), t.push(e / n));
  return a === (a | 0) && t.push(a), t.sort((o, s) => o - s).pop(), t;
}
function Bl(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function Ya(e) {
  return !Bl(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function Ll(e, t) {
  const a = Math.round(e);
  return a - t <= e && a + t >= e;
}
function Rl(e, t, a) {
  let n, o, s;
  for (n = 0, o = e.length; n < o; n++)
    s = e[n][a], isNaN(s) || (t.min = Math.min(t.min, s), t.max = Math.max(t.max, s));
}
function zt(e) {
  return e * (Oe / 180);
}
function Pl(e) {
  return e * (180 / Oe);
}
function Xo(e) {
  if (!_t(e))
    return;
  let t = 1, a = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, a++;
  return a;
}
function Ti(e, t) {
  const a = t.x - e.x, n = t.y - e.y, o = Math.sqrt(a * a + n * n);
  let s = Math.atan2(n, a);
  return s < -0.5 * Oe && (s += Ue), {
    angle: s,
    distance: o
  };
}
function ao(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function Il(e, t) {
  return (e - t + Dl) % Ue - Oe;
}
function Ct(e) {
  return (e % Ue + Ue) % Ue;
}
function qa(e, t, a, n) {
  const o = Ct(e), s = Ct(t), i = Ct(a), r = Ct(s - o), l = Ct(i - o), c = Ct(o - s), u = Ct(o - i);
  return o === s || o === i || n && s === i || r > l && c < u;
}
function st(e, t, a) {
  return Math.max(t, Math.min(a, e));
}
function El(e) {
  return st(e, -32768, 32767);
}
function qt(e, t, a, n = 1e-6) {
  return e >= Math.min(t, a) - n && e <= Math.max(t, a) + n;
}
function bo(e, t, a) {
  a = a || ((i) => e[i] < t);
  let n = e.length - 1, o = 0, s;
  for (; n - o > 1; )
    s = o + n >> 1, a(s) ? o = s : n = s;
  return {
    lo: o,
    hi: n
  };
}
const ua = (e, t, a, n) => bo(e, a, n ? (o) => {
  const s = e[o][t];
  return s < a || s === a && e[o + 1][t] === a;
} : (o) => e[o][t] < a), Fl = (e, t, a) => bo(e, a, (n) => e[n][t] >= a);
function Ol(e, t, a) {
  let n = 0, o = e.length;
  for (; n < o && e[n] < t; )
    n++;
  for (; o > n && e[o - 1] > a; )
    o--;
  return n > 0 || o < e.length ? e.slice(n, o) : e;
}
const Bi = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function Vl(e, t) {
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
  }), Bi.forEach((a) => {
    const n = "_onData" + po(a), o = e[a];
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
function Go(e, t) {
  const a = e._chartjs;
  if (!a)
    return;
  const n = a.listeners, o = n.indexOf(t);
  o !== -1 && n.splice(o, 1), !(n.length > 0) && (Bi.forEach((s) => {
    delete e[s];
  }), delete e._chartjs);
}
function Li(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const Ri = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function Pi(e, t) {
  let a = [], n = !1;
  return function(...o) {
    a = o, n || (n = !0, Ri.call(window, () => {
      n = !1, e.apply(t, a);
    }));
  };
}
function zl(e, t) {
  let a;
  return function(...n) {
    return t ? (clearTimeout(a), a = setTimeout(e, t, n)) : e.apply(this, n), t;
  };
}
const vo = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", tt = (e, t, a) => e === "start" ? t : e === "end" ? a : (t + a) / 2, Nl = (e, t, a, n) => e === (n ? "left" : "right") ? a : e === "center" ? (t + a) / 2 : t;
function jl(e, t, a) {
  const n = t.length;
  let o = 0, s = n;
  if (e._sorted) {
    const { iScale: i, vScale: r, _parsed: l } = e, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, u = i.axis, { min: f, max: m, minDefined: p, maxDefined: h } = i.getUserBounds();
    if (p) {
      if (o = Math.min(
        // @ts-expect-error Need to type _parsed
        ua(l, u, f).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        a ? n : ua(t, u, i.getPixelForValue(f)).lo
      ), c) {
        const b = l.slice(0, o + 1).reverse().findIndex((v) => !Ee(v[r.axis]));
        o -= Math.max(0, b);
      }
      o = st(o, 0, n - 1);
    }
    if (h) {
      let b = Math.max(
        // @ts-expect-error Need to type _parsed
        ua(l, i.axis, m, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        a ? 0 : ua(t, u, i.getPixelForValue(m), !0).hi + 1
      );
      if (c) {
        const v = l.slice(b - 1).findIndex((y) => !Ee(y[r.axis]));
        b += Math.max(0, v);
      }
      s = st(b, o, n) - o;
    } else
      s = n - o;
  }
  return {
    start: o,
    count: s
  };
}
function Hl(e) {
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
const ln = (e) => e === 0 || e === 1, Zo = (e, t, a) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * Ue / a)), Qo = (e, t, a) => Math.pow(2, -10 * e) * Math.sin((e - t) * Ue / a) + 1, ja = {
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
  easeInSine: (e) => -Math.cos(e * Qe) + 1,
  easeOutSine: (e) => Math.sin(e * Qe),
  easeInOutSine: (e) => -0.5 * (Math.cos(Oe * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => ln(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => ln(e) ? e : Zo(e, 0.075, 0.3),
  easeOutElastic: (e) => ln(e) ? e : Qo(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return ln(e) ? e : e < 0.5 ? 0.5 * Zo(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * Qo(e * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (e) => 1 - ja.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? ja.easeInBounce(e * 2) * 0.5 : ja.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function yo(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function Jo(e) {
  return yo(e) ? e : new Wa(e);
}
function zn(e) {
  return yo(e) ? e : new Wa(e).saturate(0.5).darken(0.1).hexString();
}
const Wl = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], Kl = [
  "color",
  "borderColor",
  "backgroundColor"
];
function Ul(e) {
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
      properties: Kl
    },
    numbers: {
      type: "number",
      properties: Wl
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
function Yl(e) {
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
const es = /* @__PURE__ */ new Map();
function ql(e, t) {
  t = t || {};
  const a = e + JSON.stringify(t);
  let n = es.get(a);
  return n || (n = new Intl.NumberFormat(e, t), es.set(a, n)), n;
}
function xo(e, t, a) {
  return ql(t, a).format(e);
}
const Xl = {
  values(e) {
    return Ze(e) ? e : "" + e;
  },
  numeric(e, t, a) {
    if (e === 0)
      return "0";
    const n = this.chart.options.locale;
    let o, s = e;
    if (a.length > 1) {
      const c = Math.max(Math.abs(a[0].value), Math.abs(a[a.length - 1].value));
      (c < 1e-4 || c > 1e15) && (o = "scientific"), s = Gl(e, a);
    }
    const i = Ai(Math.abs(s)), r = isNaN(i) ? 1 : Math.max(Math.min(-1 * Math.floor(i), 20), 0), l = {
      notation: o,
      minimumFractionDigits: r,
      maximumFractionDigits: r
    };
    return Object.assign(l, this.options.ticks.format), xo(e, n, l);
  }
};
function Gl(e, t) {
  let a = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(a) >= 1 && e !== Math.floor(e) && (a = e - Math.floor(e)), a;
}
var Ii = {
  formatters: Xl
};
function Zl(e) {
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
      callback: Ii.formatters.values,
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
const ga = /* @__PURE__ */ Object.create(null), no = /* @__PURE__ */ Object.create(null);
function Ha(e, t) {
  if (!t)
    return e;
  const a = t.split(".");
  for (let n = 0, o = a.length; n < o; ++n) {
    const s = a[n];
    e = e[s] || (e[s] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function Nn(e, t, a) {
  return typeof t == "string" ? Ka(Ha(e, t), a) : Ka(Ha(e, ""), t);
}
class Ql {
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
    }, this.hover = {}, this.hoverBackgroundColor = (n, o) => zn(o.backgroundColor), this.hoverBorderColor = (n, o) => zn(o.borderColor), this.hoverColor = (n, o) => zn(o.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(a);
  }
  set(t, a) {
    return Nn(this, t, a);
  }
  get(t) {
    return Ha(this, t);
  }
  describe(t, a) {
    return Nn(no, t, a);
  }
  override(t, a) {
    return Nn(ga, t, a);
  }
  route(t, a, n, o) {
    const s = Ha(this, t), i = Ha(this, n), r = "_" + a;
    Object.defineProperties(s, {
      [r]: {
        value: s[a],
        writable: !0
      },
      [a]: {
        enumerable: !0,
        get() {
          const l = this[r], c = i[o];
          return Le(l) ? Object.assign({}, c, l) : De(l, c);
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
var Ye = /* @__PURE__ */ new Ql({
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
  Ul,
  Yl,
  Zl
]);
function Jl(e) {
  return !e || Ee(e.size) || Ee(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function ts(e, t, a, n, o) {
  let s = t[o];
  return s || (s = t[o] = e.measureText(o).width, a.push(o)), s > n && (n = s), n;
}
function ia(e, t, a) {
  const n = e.currentDevicePixelRatio, o = a !== 0 ? Math.max(a / 2, 0.5) : 0;
  return Math.round((t - o) * n) / n + o;
}
function as(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function oo(e, t, a, n) {
  Ei(e, t, a, n, null);
}
function Ei(e, t, a, n, o) {
  let s, i, r, l, c, u, f, m;
  const p = t.pointStyle, h = t.rotation, b = t.radius;
  let v = (h || 0) * Al;
  if (p && typeof p == "object" && (s = p.toString(), s === "[object HTMLImageElement]" || s === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(a, n), e.rotate(v), e.drawImage(p, -p.width / 2, -p.height / 2, p.width, p.height), e.restore();
    return;
  }
  if (!(isNaN(b) || b <= 0)) {
    switch (e.beginPath(), p) {
      // Default includes circle
      default:
        o ? e.ellipse(a, n, o / 2, b, 0, 0, Ue) : e.arc(a, n, b, 0, Ue), e.closePath();
        break;
      case "triangle":
        u = o ? o / 2 : b, e.moveTo(a + Math.sin(v) * u, n - Math.cos(v) * b), v += Yo, e.lineTo(a + Math.sin(v) * u, n - Math.cos(v) * b), v += Yo, e.lineTo(a + Math.sin(v) * u, n - Math.cos(v) * b), e.closePath();
        break;
      case "rectRounded":
        c = b * 0.516, l = b - c, i = Math.cos(v + sa) * l, f = Math.cos(v + sa) * (o ? o / 2 - c : l), r = Math.sin(v + sa) * l, m = Math.sin(v + sa) * (o ? o / 2 - c : l), e.arc(a - f, n - r, c, v - Oe, v - Qe), e.arc(a + m, n - i, c, v - Qe, v), e.arc(a + f, n + r, c, v, v + Qe), e.arc(a - m, n + i, c, v + Qe, v + Oe), e.closePath();
        break;
      case "rect":
        if (!h) {
          l = Math.SQRT1_2 * b, u = o ? o / 2 : l, e.rect(a - u, n - l, 2 * u, 2 * l);
          break;
        }
        v += sa;
      /* falls through */
      case "rectRot":
        f = Math.cos(v) * (o ? o / 2 : b), i = Math.cos(v) * b, r = Math.sin(v) * b, m = Math.sin(v) * (o ? o / 2 : b), e.moveTo(a - f, n - r), e.lineTo(a + m, n - i), e.lineTo(a + f, n + r), e.lineTo(a - m, n + i), e.closePath();
        break;
      case "crossRot":
        v += sa;
      /* falls through */
      case "cross":
        f = Math.cos(v) * (o ? o / 2 : b), i = Math.cos(v) * b, r = Math.sin(v) * b, m = Math.sin(v) * (o ? o / 2 : b), e.moveTo(a - f, n - r), e.lineTo(a + f, n + r), e.moveTo(a + m, n - i), e.lineTo(a - m, n + i);
        break;
      case "star":
        f = Math.cos(v) * (o ? o / 2 : b), i = Math.cos(v) * b, r = Math.sin(v) * b, m = Math.sin(v) * (o ? o / 2 : b), e.moveTo(a - f, n - r), e.lineTo(a + f, n + r), e.moveTo(a + m, n - i), e.lineTo(a - m, n + i), v += sa, f = Math.cos(v) * (o ? o / 2 : b), i = Math.cos(v) * b, r = Math.sin(v) * b, m = Math.sin(v) * (o ? o / 2 : b), e.moveTo(a - f, n - r), e.lineTo(a + f, n + r), e.moveTo(a + m, n - i), e.lineTo(a - m, n + i);
        break;
      case "line":
        i = o ? o / 2 : Math.cos(v) * b, r = Math.sin(v) * b, e.moveTo(a - i, n - r), e.lineTo(a + i, n + r);
        break;
      case "dash":
        e.moveTo(a, n), e.lineTo(a + Math.cos(v) * (o ? o / 2 : b), n + Math.sin(v) * b);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function Xa(e, t, a) {
  return a = a || 0.5, !t || e && e.x > t.left - a && e.x < t.right + a && e.y > t.top - a && e.y < t.bottom + a;
}
function ko(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function _o(e) {
  e.restore();
}
function ec(e, t, a, n, o) {
  if (!t)
    return e.lineTo(a.x, a.y);
  if (o === "middle") {
    const s = (t.x + a.x) / 2;
    e.lineTo(s, t.y), e.lineTo(s, a.y);
  } else o === "after" != !!n ? e.lineTo(t.x, a.y) : e.lineTo(a.x, t.y);
  e.lineTo(a.x, a.y);
}
function tc(e, t, a, n) {
  if (!t)
    return e.lineTo(a.x, a.y);
  e.bezierCurveTo(n ? t.cp1x : t.cp2x, n ? t.cp1y : t.cp2y, n ? a.cp2x : a.cp1x, n ? a.cp2y : a.cp1y, a.x, a.y);
}
function ac(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), Ee(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function nc(e, t, a, n, o) {
  if (o.strikethrough || o.underline) {
    const s = e.measureText(n), i = t - s.actualBoundingBoxLeft, r = t + s.actualBoundingBoxRight, l = a - s.actualBoundingBoxAscent, c = a + s.actualBoundingBoxDescent, u = o.strikethrough ? (l + c) / 2 : c;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = o.decorationWidth || 2, e.moveTo(i, u), e.lineTo(r, u), e.stroke();
  }
}
function oc(e, t) {
  const a = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = a;
}
function Ga(e, t, a, n, o, s = {}) {
  const i = Ze(t) ? t : [
    t
  ], r = s.strokeWidth > 0 && s.strokeColor !== "";
  let l, c;
  for (e.save(), e.font = o.string, ac(e, s), l = 0; l < i.length; ++l)
    c = i[l], s.backdrop && oc(e, s.backdrop), r && (s.strokeColor && (e.strokeStyle = s.strokeColor), Ee(s.strokeWidth) || (e.lineWidth = s.strokeWidth), e.strokeText(c, a, n, s.maxWidth)), e.fillText(c, a, n, s.maxWidth), nc(e, a, n, c, s), n += Number(o.lineHeight);
  e.restore();
}
function Mn(e, t) {
  const { x: a, y: n, w: o, h: s, radius: i } = t;
  e.arc(a + i.topLeft, n + i.topLeft, i.topLeft, 1.5 * Oe, Oe, !0), e.lineTo(a, n + s - i.bottomLeft), e.arc(a + i.bottomLeft, n + s - i.bottomLeft, i.bottomLeft, Oe, Qe, !0), e.lineTo(a + o - i.bottomRight, n + s), e.arc(a + o - i.bottomRight, n + s - i.bottomRight, i.bottomRight, Qe, 0, !0), e.lineTo(a + o, n + i.topRight), e.arc(a + o - i.topRight, n + i.topRight, i.topRight, 0, -Qe, !0), e.lineTo(a + i.topLeft, n);
}
const sc = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, ic = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function rc(e, t) {
  const a = ("" + e).match(sc);
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
const lc = (e) => +e || 0;
function wo(e, t) {
  const a = {}, n = Le(t), o = n ? Object.keys(t) : t, s = Le(e) ? n ? (i) => De(e[i], e[t[i]]) : (i) => e[i] : () => e;
  for (const i of o)
    a[i] = lc(s(i));
  return a;
}
function Fi(e) {
  return wo(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function _a(e) {
  return wo(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function wt(e) {
  const t = Fi(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function it(e, t) {
  e = e || {}, t = t || Ye.font;
  let a = De(e.size, t.size);
  typeof a == "string" && (a = parseInt(a, 10));
  let n = De(e.style, t.style);
  n && !("" + n).match(ic) && (console.warn('Invalid font style specified: "' + n + '"'), n = void 0);
  const o = {
    family: De(e.family, t.family),
    lineHeight: rc(De(e.lineHeight, t.lineHeight), a),
    size: a,
    style: n,
    weight: De(e.weight, t.weight),
    string: ""
  };
  return o.string = Jl(o), o;
}
function cn(e, t, a, n) {
  let o, s, i;
  for (o = 0, s = e.length; o < s; ++o)
    if (i = e[o], i !== void 0 && i !== void 0)
      return i;
}
function cc(e, t, a) {
  const { min: n, max: o } = e, s = Mi(t, (o - n) / 2), i = (r, l) => a && r === 0 ? 0 : r + l;
  return {
    min: i(n, -Math.abs(s)),
    max: i(o, s)
  };
}
function ma(e, t) {
  return Object.assign(Object.create(e), t);
}
function Co(e, t = [
  ""
], a, n, o = () => e[0]) {
  const s = a || e;
  typeof n > "u" && (n = Ni("_fallback", e));
  const i = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: s,
    _fallback: n,
    _getTarget: o,
    override: (r) => Co([
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
      return Vi(r, l, () => bc(l, t, e, r));
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
      return os(r).includes(l);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(r) {
      return os(r);
    },
    /**
    * A trap for setting property values.
    */
    set(r, l, c) {
      const u = r._storage || (r._storage = o());
      return r[l] = u[l] = c, delete r._keys, !0;
    }
  });
}
function $a(e, t, a, n) {
  const o = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: a,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: Oi(e, n),
    setContext: (s) => $a(e, s, a, n),
    override: (s) => $a(e.override(s), t, a, n)
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
      return Vi(s, i, () => uc(s, i, r));
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
function Oi(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: a = t.scriptable, _indexable: n = t.indexable, _allKeys: o = t.allKeys } = e;
  return {
    allKeys: o,
    scriptable: a,
    indexable: n,
    isScriptable: Jt(a) ? a : () => a,
    isIndexable: Jt(n) ? n : () => n
  };
}
const dc = (e, t) => e ? e + po(t) : t, $o = (e, t) => Le(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function Vi(e, t, a) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const n = a();
  return e[t] = n, n;
}
function uc(e, t, a) {
  const { _proxy: n, _context: o, _subProxy: s, _descriptors: i } = e;
  let r = n[t];
  return Jt(r) && i.isScriptable(t) && (r = hc(t, r, e, a)), Ze(r) && r.length && (r = fc(t, r, e, i.isIndexable)), $o(t, r) && (r = $a(r, o, s && s[t], i)), r;
}
function hc(e, t, a, n) {
  const { _proxy: o, _context: s, _subProxy: i, _stack: r } = a;
  if (r.has(e))
    throw new Error("Recursion detected: " + Array.from(r).join("->") + "->" + e);
  r.add(e);
  let l = t(s, i || n);
  return r.delete(e), $o(e, l) && (l = So(o._scopes, o, e, l)), l;
}
function fc(e, t, a, n) {
  const { _proxy: o, _context: s, _subProxy: i, _descriptors: r } = a;
  if (typeof s.index < "u" && n(e))
    return t[s.index % t.length];
  if (Le(t[0])) {
    const l = t, c = o._scopes.filter((u) => u !== l);
    t = [];
    for (const u of l) {
      const f = So(c, o, e, u);
      t.push($a(f, s, i && i[e], r));
    }
  }
  return t;
}
function zi(e, t, a) {
  return Jt(e) ? e(t, a) : e;
}
const gc = (e, t) => e === !0 ? t : typeof e == "string" ? fa(t, e) : void 0;
function mc(e, t, a, n, o) {
  for (const s of t) {
    const i = gc(a, s);
    if (i) {
      e.add(i);
      const r = zi(i._fallback, a, o);
      if (typeof r < "u" && r !== a && r !== n)
        return r;
    } else if (i === !1 && typeof n < "u" && a !== n)
      return null;
  }
  return !1;
}
function So(e, t, a, n) {
  const o = t._rootScopes, s = zi(t._fallback, a, n), i = [
    ...e,
    ...o
  ], r = /* @__PURE__ */ new Set();
  r.add(n);
  let l = ns(r, i, a, s || a, n);
  return l === null || typeof s < "u" && s !== a && (l = ns(r, i, s, l, n), l === null) ? !1 : Co(Array.from(r), [
    ""
  ], o, s, () => pc(t, a, n));
}
function ns(e, t, a, n, o) {
  for (; a; )
    a = mc(e, t, a, n, o);
  return a;
}
function pc(e, t, a) {
  const n = e._getTarget();
  t in n || (n[t] = {});
  const o = n[t];
  return Ze(o) && Le(a) ? a : o || {};
}
function bc(e, t, a, n) {
  let o;
  for (const s of t)
    if (o = Ni(dc(s, e), a), typeof o < "u")
      return $o(e, o) ? So(a, n, e, o) : o;
}
function Ni(e, t) {
  for (const a of t) {
    if (!a)
      continue;
    const n = a[e];
    if (typeof n < "u")
      return n;
  }
}
function os(e) {
  let t = e._keys;
  return t || (t = e._keys = vc(e._scopes)), t;
}
function vc(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of e)
    for (const n of Object.keys(a).filter((o) => !o.startsWith("_")))
      t.add(n);
  return Array.from(t);
}
const yc = Number.EPSILON || 1e-14, Sa = (e, t) => t < e.length && !e[t].skip && e[t], ji = (e) => e === "x" ? "y" : "x";
function xc(e, t, a, n) {
  const o = e.skip ? t : e, s = t, i = a.skip ? t : a, r = ao(s, o), l = ao(i, s);
  let c = r / (r + l), u = l / (r + l);
  c = isNaN(c) ? 0 : c, u = isNaN(u) ? 0 : u;
  const f = n * c, m = n * u;
  return {
    previous: {
      x: s.x - f * (i.x - o.x),
      y: s.y - f * (i.y - o.y)
    },
    next: {
      x: s.x + m * (i.x - o.x),
      y: s.y + m * (i.y - o.y)
    }
  };
}
function kc(e, t, a) {
  const n = e.length;
  let o, s, i, r, l, c = Sa(e, 0);
  for (let u = 0; u < n - 1; ++u)
    if (l = c, c = Sa(e, u + 1), !(!l || !c)) {
      if (Na(t[u], 0, yc)) {
        a[u] = a[u + 1] = 0;
        continue;
      }
      o = a[u] / t[u], s = a[u + 1] / t[u], r = Math.pow(o, 2) + Math.pow(s, 2), !(r <= 9) && (i = 3 / Math.sqrt(r), a[u] = o * i * t[u], a[u + 1] = s * i * t[u]);
    }
}
function _c(e, t, a = "x") {
  const n = ji(a), o = e.length;
  let s, i, r, l = Sa(e, 0);
  for (let c = 0; c < o; ++c) {
    if (i = r, r = l, l = Sa(e, c + 1), !r)
      continue;
    const u = r[a], f = r[n];
    i && (s = (u - i[a]) / 3, r[`cp1${a}`] = u - s, r[`cp1${n}`] = f - s * t[c]), l && (s = (l[a] - u) / 3, r[`cp2${a}`] = u + s, r[`cp2${n}`] = f + s * t[c]);
  }
}
function wc(e, t = "x") {
  const a = ji(t), n = e.length, o = Array(n).fill(0), s = Array(n);
  let i, r, l, c = Sa(e, 0);
  for (i = 0; i < n; ++i)
    if (r = l, l = c, c = Sa(e, i + 1), !!l) {
      if (c) {
        const u = c[t] - l[t];
        o[i] = u !== 0 ? (c[a] - l[a]) / u : 0;
      }
      s[i] = r ? c ? Pt(o[i - 1]) !== Pt(o[i]) ? 0 : (o[i - 1] + o[i]) / 2 : o[i - 1] : o[i];
    }
  kc(e, o, s), _c(e, s, t);
}
function dn(e, t, a) {
  return Math.max(Math.min(e, a), t);
}
function Cc(e, t) {
  let a, n, o, s, i, r = Xa(e[0], t);
  for (a = 0, n = e.length; a < n; ++a)
    i = s, s = r, r = a < n - 1 && Xa(e[a + 1], t), s && (o = e[a], i && (o.cp1x = dn(o.cp1x, t.left, t.right), o.cp1y = dn(o.cp1y, t.top, t.bottom)), r && (o.cp2x = dn(o.cp2x, t.left, t.right), o.cp2y = dn(o.cp2y, t.top, t.bottom)));
}
function $c(e, t, a, n, o) {
  let s, i, r, l;
  if (t.spanGaps && (e = e.filter((c) => !c.skip)), t.cubicInterpolationMode === "monotone")
    wc(e, o);
  else {
    let c = n ? e[e.length - 1] : e[0];
    for (s = 0, i = e.length; s < i; ++s)
      r = e[s], l = xc(c, r, e[Math.min(s + 1, i - (n ? 0 : 1)) % i], t.tension), r.cp1x = l.previous.x, r.cp1y = l.previous.y, r.cp2x = l.next.x, r.cp2y = l.next.y, c = r;
  }
  t.capBezierPoints && Cc(e, a);
}
function Mo() {
  return typeof window < "u" && typeof document < "u";
}
function Do(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function Dn(e, t, a) {
  let n;
  return typeof e == "string" ? (n = parseInt(e, 10), e.indexOf("%") !== -1 && (n = n / 100 * t.parentNode[a])) : n = e, n;
}
const Rn = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function Sc(e, t) {
  return Rn(e).getPropertyValue(t);
}
const Mc = [
  "top",
  "right",
  "bottom",
  "left"
];
function ha(e, t, a) {
  const n = {};
  a = a ? "-" + a : "";
  for (let o = 0; o < 4; o++) {
    const s = Mc[o];
    n[s] = parseFloat(e[t + "-" + s + a]) || 0;
  }
  return n.width = n.left + n.right, n.height = n.top + n.bottom, n;
}
const Dc = (e, t, a) => (e > 0 || t > 0) && (!a || !a.shadowRoot);
function Ac(e, t) {
  const a = e.touches, n = a && a.length ? a[0] : e, { offsetX: o, offsetY: s } = n;
  let i = !1, r, l;
  if (Dc(o, s, e.target))
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
function ca(e, t) {
  if ("native" in e)
    return e;
  const { canvas: a, currentDevicePixelRatio: n } = t, o = Rn(a), s = o.boxSizing === "border-box", i = ha(o, "padding"), r = ha(o, "border", "width"), { x: l, y: c, box: u } = Ac(e, a), f = i.left + (u && r.left), m = i.top + (u && r.top);
  let { width: p, height: h } = t;
  return s && (p -= i.width + r.width, h -= i.height + r.height), {
    x: Math.round((l - f) / p * a.width / n),
    y: Math.round((c - m) / h * a.height / n)
  };
}
function Tc(e, t, a) {
  let n, o;
  if (t === void 0 || a === void 0) {
    const s = e && Do(e);
    if (!s)
      t = e.clientWidth, a = e.clientHeight;
    else {
      const i = s.getBoundingClientRect(), r = Rn(s), l = ha(r, "border", "width"), c = ha(r, "padding");
      t = i.width - c.width - l.width, a = i.height - c.height - l.height, n = Dn(r.maxWidth, s, "clientWidth"), o = Dn(r.maxHeight, s, "clientHeight");
    }
  }
  return {
    width: t,
    height: a,
    maxWidth: n || Sn,
    maxHeight: o || Sn
  };
}
const Xt = (e) => Math.round(e * 10) / 10;
function Bc(e, t, a, n) {
  const o = Rn(e), s = ha(o, "margin"), i = Dn(o.maxWidth, e, "clientWidth") || Sn, r = Dn(o.maxHeight, e, "clientHeight") || Sn, l = Tc(e, t, a);
  let { width: c, height: u } = l;
  if (o.boxSizing === "content-box") {
    const m = ha(o, "border", "width"), p = ha(o, "padding");
    c -= p.width + m.width, u -= p.height + m.height;
  }
  return c = Math.max(0, c - s.width), u = Math.max(0, n ? c / n : u - s.height), c = Xt(Math.min(c, i, l.maxWidth)), u = Xt(Math.min(u, r, l.maxHeight)), c && !u && (u = Xt(c / 2)), (t !== void 0 || a !== void 0) && n && l.height && u > l.height && (u = l.height, c = Xt(Math.floor(u * n))), {
    width: c,
    height: u
  };
}
function ss(e, t, a) {
  const n = t || 1, o = Xt(e.height * n), s = Xt(e.width * n);
  e.height = Xt(e.height), e.width = Xt(e.width);
  const i = e.canvas;
  return i.style && (a || !i.style.height && !i.style.width) && (i.style.height = `${e.height}px`, i.style.width = `${e.width}px`), e.currentDevicePixelRatio !== n || i.height !== o || i.width !== s ? (e.currentDevicePixelRatio = n, i.height = o, i.width = s, e.ctx.setTransform(n, 0, 0, n, 0, 0), !0) : !1;
}
const Lc = (function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    Mo() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function is(e, t) {
  const a = Sc(e, t), n = a && a.match(/^(\d+)(\.\d+)?px$/);
  return n ? +n[1] : void 0;
}
function da(e, t, a, n) {
  return {
    x: e.x + a * (t.x - e.x),
    y: e.y + a * (t.y - e.y)
  };
}
function Rc(e, t, a, n) {
  return {
    x: e.x + a * (t.x - e.x),
    y: n === "middle" ? a < 0.5 ? e.y : t.y : n === "after" ? a < 1 ? e.y : t.y : a > 0 ? t.y : e.y
  };
}
function Pc(e, t, a, n) {
  const o = {
    x: e.cp2x,
    y: e.cp2y
  }, s = {
    x: t.cp1x,
    y: t.cp1y
  }, i = da(e, o, a), r = da(o, s, a), l = da(s, t, a), c = da(i, r, a), u = da(r, l, a);
  return da(c, u, a);
}
const Ic = function(e, t) {
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
}, Ec = function() {
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
function wa(e, t, a) {
  return e ? Ic(t, a) : Ec();
}
function Hi(e, t) {
  let a, n;
  (t === "ltr" || t === "rtl") && (a = e.canvas.style, n = [
    a.getPropertyValue("direction"),
    a.getPropertyPriority("direction")
  ], a.setProperty("direction", t, "important"), e.prevTextDirection = n);
}
function Wi(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function Ki(e) {
  return e === "angle" ? {
    between: qa,
    compare: Il,
    normalize: Ct
  } : {
    between: qt,
    compare: (t, a) => t - a,
    normalize: (t) => t
  };
}
function rs({ start: e, end: t, count: a, loop: n, style: o }) {
  return {
    start: e % a,
    end: t % a,
    loop: n && (t - e + 1) % a === 0,
    style: o
  };
}
function Fc(e, t, a) {
  const { property: n, start: o, end: s } = a, { between: i, normalize: r } = Ki(n), l = t.length;
  let { start: c, end: u, loop: f } = e, m, p;
  if (f) {
    for (c += l, u += l, m = 0, p = l; m < p && i(r(t[c % l][n]), o, s); ++m)
      c--, u--;
    c %= l, u %= l;
  }
  return u < c && (u += l), {
    start: c,
    end: u,
    loop: f,
    style: e.style
  };
}
function Oc(e, t, a) {
  if (!a)
    return [
      e
    ];
  const { property: n, start: o, end: s } = a, i = t.length, { compare: r, between: l, normalize: c } = Ki(n), { start: u, end: f, loop: m, style: p } = Fc(e, t, a), h = [];
  let b = !1, v = null, y, w, _;
  const k = () => l(o, _, y) && r(o, _) !== 0, C = () => r(s, y) === 0 || l(s, _, y), S = () => b || k(), M = () => !b || C();
  for (let R = u, V = u; R <= f; ++R)
    w = t[R % i], !w.skip && (y = c(w[n]), y !== _ && (b = l(y, o, s), v === null && S() && (v = r(y, o) === 0 ? R : V), v !== null && M() && (h.push(rs({
      start: v,
      end: R,
      loop: m,
      count: i,
      style: p
    })), v = null), V = R, _ = y));
  return v !== null && h.push(rs({
    start: v,
    end: f,
    loop: m,
    count: i,
    style: p
  })), h;
}
function Vc(e, t) {
  const a = [], n = e.segments;
  for (let o = 0; o < n.length; o++) {
    const s = Oc(n[o], e.points, t);
    s.length && a.push(...s);
  }
  return a;
}
function zc(e, t, a, n) {
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
function Nc(e, t, a, n) {
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
function jc(e, t) {
  const a = e.points, n = e.options.spanGaps, o = a.length;
  if (!o)
    return [];
  const s = !!e._loop, { start: i, end: r } = zc(a, o, s, n);
  if (n === !0)
    return ls(e, [
      {
        start: i,
        end: r,
        loop: s
      }
    ], a, t);
  const l = r < i ? r + o : r, c = !!e._fullLoop && i === 0 && r === o - 1;
  return ls(e, Nc(a, i, l, c), a, t);
}
function ls(e, t, a, n) {
  return !n || !n.setContext || !a ? t : Hc(e, t, a, n);
}
function Hc(e, t, a, n) {
  const o = e._chart.getContext(), s = cs(e.options), { _datasetIndex: i, options: { spanGaps: r } } = e, l = a.length, c = [];
  let u = s, f = t[0].start, m = f;
  function p(h, b, v, y) {
    const w = r ? -1 : 1;
    if (h !== b) {
      for (h += l; a[h % l].skip; )
        h -= w;
      for (; a[b % l].skip; )
        b += w;
      h % l !== b % l && (c.push({
        start: h % l,
        end: b % l,
        loop: v,
        style: y
      }), u = y, f = b % l);
    }
  }
  for (const h of t) {
    f = r ? f : h.start;
    let b = a[f % l], v;
    for (m = f + 1; m <= h.end; m++) {
      const y = a[m % l];
      v = cs(n.setContext(ma(o, {
        type: "segment",
        p0: b,
        p1: y,
        p0DataIndex: (m - 1) % l,
        p1DataIndex: m % l,
        datasetIndex: i
      }))), Wc(v, u) && p(f, m - 1, h.loop, u), b = y, u = v;
    }
    f < m - 1 && p(f, m - 1, h.loop, u);
  }
  return c;
}
function cs(e) {
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
function Wc(e, t) {
  if (!t)
    return !1;
  const a = [], n = function(o, s) {
    return yo(s) ? (a.includes(s) || a.push(s), a.indexOf(s)) : s;
  };
  return JSON.stringify(e, n) !== JSON.stringify(t, n);
}
function un(e, t, a) {
  return e.options.clip ? e[a] : t[a];
}
function Kc(e, t) {
  const { xScale: a, yScale: n } = e;
  return a && n ? {
    left: un(a, t, "left"),
    right: un(a, t, "right"),
    top: un(n, t, "top"),
    bottom: un(n, t, "bottom")
  } : t;
}
function Uc(e, t) {
  const a = t._clip;
  if (a.disabled)
    return !1;
  const n = Kc(t, e.chartArea);
  return {
    left: a.left === !1 ? 0 : n.left - (a.left === !0 ? 0 : a.left),
    right: a.right === !1 ? e.width : n.right + (a.right === !0 ? 0 : a.right),
    top: a.top === !1 ? 0 : n.top - (a.top === !0 ? 0 : a.top),
    bottom: a.bottom === !1 ? e.height : n.bottom + (a.bottom === !0 ? 0 : a.bottom)
  };
}
class Yc {
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
    this._request || (this._running = !0, this._request = Ri.call(window, () => {
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
var Ft = /* @__PURE__ */ new Yc();
const ds = "transparent", qc = {
  boolean(e, t, a) {
    return a > 0.5 ? t : e;
  },
  color(e, t, a) {
    const n = Jo(e || ds), o = n.valid && Jo(t || ds);
    return o && o.valid ? o.mix(n, a).hexString() : t;
  },
  number(e, t, a) {
    return e + (t - e) * a;
  }
};
class Xc {
  constructor(t, a, n, o) {
    const s = a[n];
    o = cn([
      t.to,
      o,
      s,
      t.from
    ]);
    const i = cn([
      t.from,
      s,
      o
    ]);
    this._active = !0, this._fn = t.fn || qc[t.type || typeof i], this._easing = ja[t.easing] || ja.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = a, this._prop = n, this._from = i, this._to = o, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, a, n) {
    if (this._active) {
      this._notify(!1);
      const o = this._target[this._prop], s = n - this._start, i = this._duration - s;
      this._start = n, this._duration = Math.floor(Math.max(i, t.duration)), this._total += s, this._loop = !!t.loop, this._to = cn([
        t.to,
        a,
        o,
        t.from
      ]), this._from = cn([
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
class Ui {
  constructor(t, a) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(a);
  }
  configure(t) {
    if (!Le(t))
      return;
    const a = Object.keys(Ye.animation), n = this._properties;
    Object.getOwnPropertyNames(t).forEach((o) => {
      const s = t[o];
      if (!Le(s))
        return;
      const i = {};
      for (const r of a)
        i[r] = s[r];
      (Ze(s.properties) && s.properties || [
        o
      ]).forEach((r) => {
        (r === o || !n.has(r)) && n.set(r, i);
      });
    });
  }
  _animateOptions(t, a) {
    const n = a.options, o = Zc(t, n);
    if (!o)
      return [];
    const s = this._createAnimations(o, n);
    return n.$shared && Gc(t.options.$animations, n).then(() => {
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
      const u = a[c];
      let f = s[c];
      const m = n.get(c);
      if (f)
        if (m && f.active()) {
          f.update(m, u, r);
          continue;
        } else
          f.cancel();
      if (!m || !m.duration) {
        t[c] = u;
        continue;
      }
      s[c] = f = new Xc(m, t, c, u), o.push(f);
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
function Gc(e, t) {
  const a = [], n = Object.keys(t);
  for (let o = 0; o < n.length; o++) {
    const s = e[n[o]];
    s && s.active() && a.push(s.wait());
  }
  return Promise.all(a);
}
function Zc(e, t) {
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
function us(e, t) {
  const a = e && e.options || {}, n = a.reverse, o = a.min === void 0 ? t : 0, s = a.max === void 0 ? t : 0;
  return {
    start: n ? s : o,
    end: n ? o : s
  };
}
function Qc(e, t, a) {
  if (a === !1)
    return !1;
  const n = us(e, a), o = us(t, a);
  return {
    top: o.end,
    right: n.end,
    bottom: o.start,
    left: n.start
  };
}
function Jc(e) {
  let t, a, n, o;
  return Le(e) ? (t = e.top, a = e.right, n = e.bottom, o = e.left) : t = a = n = o = e, {
    top: t,
    right: a,
    bottom: n,
    left: o,
    disabled: e === !1
  };
}
function Yi(e, t) {
  const a = [], n = e._getSortedDatasetMetas(t);
  let o, s;
  for (o = 0, s = n.length; o < s; ++o)
    a.push(n[o].index);
  return a;
}
function hs(e, t, a, n = {}) {
  const o = e.keys, s = n.mode === "single";
  let i, r, l, c;
  if (t === null)
    return;
  let u = !1;
  for (i = 0, r = o.length; i < r; ++i) {
    if (l = +o[i], l === a) {
      if (u = !0, n.all)
        continue;
      break;
    }
    c = e.values[l], _t(c) && (s || t === 0 || Pt(t) === Pt(c)) && (t += c);
  }
  return !u && !n.all ? 0 : t;
}
function ed(e, t) {
  const { iScale: a, vScale: n } = t, o = a.axis === "x" ? "x" : "y", s = n.axis === "x" ? "x" : "y", i = Object.keys(e), r = new Array(i.length);
  let l, c, u;
  for (l = 0, c = i.length; l < c; ++l)
    u = i[l], r[l] = {
      [o]: u,
      [s]: e[u]
    };
  return r;
}
function jn(e, t) {
  const a = e && e.options.stacked;
  return a || a === void 0 && t.stack !== void 0;
}
function td(e, t, a) {
  return `${e.id}.${t.id}.${a.stack || a.type}`;
}
function ad(e) {
  const { min: t, max: a, minDefined: n, maxDefined: o } = e.getUserBounds();
  return {
    min: n ? t : Number.NEGATIVE_INFINITY,
    max: o ? a : Number.POSITIVE_INFINITY
  };
}
function nd(e, t, a) {
  const n = e[t] || (e[t] = {});
  return n[a] || (n[a] = {});
}
function fs(e, t, a, n) {
  for (const o of t.getMatchingVisibleMetas(n).reverse()) {
    const s = e[o.index];
    if (a && s > 0 || !a && s < 0)
      return o.index;
  }
  return null;
}
function gs(e, t) {
  const { chart: a, _cachedMeta: n } = e, o = a._stacks || (a._stacks = {}), { iScale: s, vScale: i, index: r } = n, l = s.axis, c = i.axis, u = td(s, i, n), f = t.length;
  let m;
  for (let p = 0; p < f; ++p) {
    const h = t[p], { [l]: b, [c]: v } = h, y = h._stacks || (h._stacks = {});
    m = y[c] = nd(o, u, b), m[r] = v, m._top = fs(m, i, !0, n.type), m._bottom = fs(m, i, !1, n.type);
    const w = m._visualValues || (m._visualValues = {});
    w[r] = v;
  }
}
function Hn(e, t) {
  const a = e.scales;
  return Object.keys(a).filter((n) => a[n].axis === t).shift();
}
function od(e, t) {
  return ma(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function sd(e, t, a) {
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
function Aa(e, t) {
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
const Wn = (e) => e === "reset" || e === "none", ms = (e, t) => t ? e : Object.assign({}, e), id = (e, t, a) => e && !t.hidden && t._stacked && {
  keys: Yi(a, !0),
  values: null
};
class Pn {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(t, a) {
    this.chart = t, this._ctx = t.ctx, this.index = a, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = jn(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && Aa(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, a = this._cachedMeta, n = this.getDataset(), o = (f, m, p, h) => f === "x" ? m : f === "r" ? h : p, s = a.xAxisID = De(n.xAxisID, Hn(t, "x")), i = a.yAxisID = De(n.yAxisID, Hn(t, "y")), r = a.rAxisID = De(n.rAxisID, Hn(t, "r")), l = a.indexAxis, c = a.iAxisID = o(l, s, i, r), u = a.vAxisID = o(l, i, s, r);
    a.xScale = this.getScaleForId(s), a.yScale = this.getScaleForId(i), a.rScale = this.getScaleForId(r), a.iScale = this.getScaleForId(c), a.vScale = this.getScaleForId(u);
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
    this._data && Go(this._data, this), t._stacked && Aa(t);
  }
  _dataCheck() {
    const t = this.getDataset(), a = t.data || (t.data = []), n = this._data;
    if (Le(a)) {
      const o = this._cachedMeta;
      this._data = ed(a, o);
    } else if (n !== a) {
      if (n) {
        Go(n, this);
        const o = this._cachedMeta;
        Aa(o), o._parsed = [];
      }
      a && Object.isExtensible(a) && Vl(a, this), this._syncList = [], this._data = a;
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
    a._stacked = jn(a.vScale, a), a.stack !== n.stack && (o = !0, Aa(a), a.stack = n.stack), this._resyncElements(t), (o || s !== a._stacked) && (gs(this, a._parsed), a._stacked = jn(a.vScale, a));
  }
  configure() {
    const t = this.chart.config, a = t.datasetScopeKeys(this._type), n = t.getOptionScopes(this.getDataset(), a, !0);
    this.options = t.createResolver(n, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, a) {
    const { _cachedMeta: n, _data: o } = this, { iScale: s, _stacked: i } = n, r = s.axis;
    let l = t === 0 && a === o.length ? !0 : n._sorted, c = t > 0 && n._parsed[t - 1], u, f, m;
    if (this._parsing === !1)
      n._parsed = o, n._sorted = !0, m = o;
    else {
      Ze(o[t]) ? m = this.parseArrayData(n, o, t, a) : Le(o[t]) ? m = this.parseObjectData(n, o, t, a) : m = this.parsePrimitiveData(n, o, t, a);
      const p = () => f[r] === null || c && f[r] < c[r];
      for (u = 0; u < a; ++u)
        n._parsed[u + t] = f = m[u], l && (p() && (l = !1), c = f);
      n._sorted = l;
    }
    i && gs(this, m);
  }
  parsePrimitiveData(t, a, n, o) {
    const { iScale: s, vScale: i } = t, r = s.axis, l = i.axis, c = s.getLabels(), u = s === i, f = new Array(o);
    let m, p, h;
    for (m = 0, p = o; m < p; ++m)
      h = m + n, f[m] = {
        [r]: u || s.parse(c[h], h),
        [l]: i.parse(a[h], h)
      };
    return f;
  }
  parseArrayData(t, a, n, o) {
    const { xScale: s, yScale: i } = t, r = new Array(o);
    let l, c, u, f;
    for (l = 0, c = o; l < c; ++l)
      u = l + n, f = a[u], r[l] = {
        x: s.parse(f[0], u),
        y: i.parse(f[1], u)
      };
    return r;
  }
  parseObjectData(t, a, n, o) {
    const { xScale: s, yScale: i } = t, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, c = new Array(o);
    let u, f, m, p;
    for (u = 0, f = o; u < f; ++u)
      m = u + n, p = a[m], c[u] = {
        x: s.parse(fa(p, r), m),
        y: i.parse(fa(p, l), m)
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
      keys: Yi(o, !0),
      values: a._stacks[t.axis]._visualValues
    };
    return hs(r, i, s.index, {
      mode: n
    });
  }
  updateRangeFromParsed(t, a, n, o) {
    const s = n[a.axis];
    let i = s === null ? NaN : s;
    const r = o && n._stacks[a.axis];
    o && r && (o.values = r, i = hs(o, s, this._cachedMeta.index)), t.min = Math.min(t.min, i), t.max = Math.max(t.max, i);
  }
  getMinMax(t, a) {
    const n = this._cachedMeta, o = n._parsed, s = n._sorted && t === n.iScale, i = o.length, r = this._getOtherScale(t), l = id(a, n, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: u, max: f } = ad(r);
    let m, p;
    function h() {
      p = o[m];
      const b = p[r.axis];
      return !_t(p[t.axis]) || u > b || f < b;
    }
    for (m = 0; m < i && !(!h() && (this.updateRangeFromParsed(c, t, p, l), s)); ++m)
      ;
    if (s) {
      for (m = i - 1; m >= 0; --m)
        if (!h()) {
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
      i = a[o][t.axis], _t(i) && n.push(i);
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
    this.update(t || "default"), a._clip = Jc(De(this.options.clip, Qc(a.xScale, a.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, a = this.chart, n = this._cachedMeta, o = n.data || [], s = a.chartArea, i = [], r = this._drawStart || 0, l = this._drawCount || o.length - r, c = this.options.drawActiveElementsOnTop;
    let u;
    for (n.dataset && n.dataset.draw(t, s, r, l), u = r; u < r + l; ++u) {
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
      s = i.$context || (i.$context = sd(this.getContext(), t, i)), s.parsed = this.getParsed(t), s.raw = o.data[t], s.index = s.dataIndex = t;
    } else
      s = this.$context || (this.$context = od(this.chart.getContext(), this.index)), s.dataset = o, s.index = s.datasetIndex = this.index;
    return s.active = !!a, s.mode = n, s;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, a) {
    return this._resolveElementOptions(this.dataElementType.id, a, t);
  }
  _resolveElementOptions(t, a = "default", n) {
    const o = a === "active", s = this._cachedDataOpts, i = t + "-" + a, r = s[i], l = this.enableOptionSharing && Ua(n);
    if (r)
      return ms(r, l);
    const c = this.chart.config, u = c.datasetElementScopeKeys(this._type, t), f = o ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], m = c.getOptionScopes(this.getDataset(), u), p = Object.keys(Ye.elements[t]), h = () => this.getContext(n, o, a), b = c.resolveNamedOptions(m, p, h, f);
    return b.$shared && (b.$shared = l, s[i] = Object.freeze(ms(b, l))), b;
  }
  _resolveAnimations(t, a, n) {
    const o = this.chart, s = this._cachedDataOpts, i = `animation-${a}`, r = s[i];
    if (r)
      return r;
    let l;
    if (o.options.animation !== !1) {
      const u = this.chart.config, f = u.datasetAnimationScopeKeys(this._type, a), m = u.getOptionScopes(this.getDataset(), f);
      l = u.createResolver(m, this.getContext(t, n, a));
    }
    const c = new Ui(o, l && l.animations);
    return l && l._cacheable && (s[i] = Object.freeze(c)), c;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, a) {
    return !a || Wn(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, a) {
    const n = this.resolveDataElementOptions(t, a), o = this._sharedOptions, s = this.getSharedOptions(n), i = this.includeOptions(a, s) || s !== o;
    return this.updateSharedOptions(s, a, n), {
      sharedOptions: s,
      includeOptions: i
    };
  }
  updateElement(t, a, n, o) {
    Wn(o) ? Object.assign(t, n) : this._resolveAnimations(a, o).update(t, n);
  }
  updateSharedOptions(t, a, n) {
    t && !Wn(a) && this._resolveAnimations(void 0, a).update(t, n);
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
      n._stacked && Aa(n, o);
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
function rd(e, t) {
  if (!e._cache.$bar) {
    const a = e.getMatchingVisibleMetas(t);
    let n = [];
    for (let o = 0, s = a.length; o < s; o++)
      n = n.concat(a[o].controller.getAllParsedValues(e));
    e._cache.$bar = Li(n.sort((o, s) => o - s));
  }
  return e._cache.$bar;
}
function ld(e) {
  const t = e.iScale, a = rd(t, e.type);
  let n = t._length, o, s, i, r;
  const l = () => {
    i === 32767 || i === -32768 || (Ua(r) && (n = Math.min(n, Math.abs(i - r) || n)), r = i);
  };
  for (o = 0, s = a.length; o < s; ++o)
    i = t.getPixelForValue(a[o]), l();
  for (r = void 0, o = 0, s = t.ticks.length; o < s; ++o)
    i = t.getPixelForTick(o), l();
  return n;
}
function cd(e, t, a, n) {
  const o = a.barThickness;
  let s, i;
  return Ee(o) ? (s = t.min * a.categoryPercentage, i = a.barPercentage) : (s = o * n, i = 1), {
    chunk: s / n,
    ratio: i,
    start: t.pixels[e] - s / 2
  };
}
function dd(e, t, a, n) {
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
function ud(e, t, a, n) {
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
function qi(e, t, a, n) {
  return Ze(e) ? ud(e, t, a, n) : t[a.axis] = a.parse(e, n), t;
}
function ps(e, t, a, n) {
  const o = e.iScale, s = e.vScale, i = o.getLabels(), r = o === s, l = [];
  let c, u, f, m;
  for (c = a, u = a + n; c < u; ++c)
    m = t[c], f = {}, f[o.axis] = r || o.parse(i[c], c), l.push(qi(m, f, s, c));
  return l;
}
function Kn(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function hd(e, t, a) {
  return e !== 0 ? Pt(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= a ? 1 : -1);
}
function fd(e) {
  let t, a, n, o, s;
  return e.horizontal ? (t = e.base > e.x, a = "left", n = "right") : (t = e.base < e.y, a = "bottom", n = "top"), t ? (o = "end", s = "start") : (o = "start", s = "end"), {
    start: a,
    end: n,
    reverse: t,
    top: o,
    bottom: s
  };
}
function gd(e, t, a, n) {
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
  const { start: i, end: r, reverse: l, top: c, bottom: u } = fd(e);
  o === "middle" && a && (e.enableBorderRadius = !0, (a._top || 0) === n ? o = c : (a._bottom || 0) === n ? o = u : (s[bs(u, i, r, l)] = !0, o = c)), s[bs(o, i, r, l)] = !0, e.borderSkipped = s;
}
function bs(e, t, a, n) {
  return n ? (e = md(e, t, a), e = vs(e, a, t)) : e = vs(e, t, a), e;
}
function md(e, t, a) {
  return e === t ? a : e === a ? t : e;
}
function vs(e, t, a) {
  return e === "start" ? t : e === "end" ? a : e;
}
function pd(e, { inflateAmount: t }, a) {
  e.inflateAmount = t === "auto" ? a === 1 ? 0.33 : 0 : t;
}
class bd extends Pn {
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
    return ps(t, a, n, o);
  }
  parseArrayData(t, a, n, o) {
    return ps(t, a, n, o);
  }
  parseObjectData(t, a, n, o) {
    const { iScale: s, vScale: i } = t, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, c = s.axis === "x" ? r : l, u = i.axis === "x" ? r : l, f = [];
    let m, p, h, b;
    for (m = n, p = n + o; m < p; ++m)
      b = a[m], h = {}, h[s.axis] = s.parse(fa(b, c), m), f.push(qi(fa(b, u), h, i, m));
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
    const a = this._cachedMeta, { iScale: n, vScale: o } = a, s = this.getParsed(t), i = s._custom, r = Kn(i) ? "[" + i.start + ", " + i.end + "]" : "" + o.getLabelForValue(s[o.axis]);
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
    const s = o === "reset", { index: i, _cachedMeta: { vScale: r } } = this, l = r.getBasePixel(), c = r.isHorizontal(), u = this._getRuler(), { sharedOptions: f, includeOptions: m } = this._getSharedOptions(a, o);
    for (let p = a; p < a + n; p++) {
      const h = this.getParsed(p), b = s || Ee(h[r.axis]) ? {
        base: l,
        head: l
      } : this._calculateBarValuePixels(p), v = this._calculateBarIndexPixels(p, u), y = (h._stacks || {})[r.axis], w = {
        horizontal: c,
        base: b.base,
        enableBorderRadius: !y || Kn(h._custom) || i === y._top || i === y._bottom,
        x: c ? b.head : v.center,
        y: c ? v.center : b.head,
        height: c ? v.size : Math.abs(b.size),
        width: c ? Math.abs(b.size) : v.size
      };
      m && (w.options = f || this.resolveDataElementOptions(p, t[p].active ? "active" : o));
      const _ = w.options || t[p].options;
      gd(w, _, y, i), pd(w, _, u.ratio), this.updateElement(t[p], p, w, o);
    }
  }
  _getStacks(t, a) {
    const { iScale: n } = this._cachedMeta, o = n.getMatchingVisibleMetas(this._type).filter((u) => u.controller.options.grouped), s = n.options.stacked, i = [], r = this._cachedMeta.controller.getParsed(a), l = r && r[n.axis], c = (u) => {
      const f = u._parsed.find((p) => p[n.axis] === l), m = f && f[u.vScale.axis];
      if (Ee(m) || isNaN(m))
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
    const r = t.barThickness;
    return {
      min: r || ld(a),
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
    const { _cachedMeta: { vScale: a, _stacked: n, index: o }, options: { base: s, minBarLength: i } } = this, r = s || 0, l = this.getParsed(t), c = l._custom, u = Kn(c);
    let f = l[a.axis], m = 0, p = n ? this.applyStack(a, l, n) : f, h, b;
    p !== f && (m = p - f, p = f), u && (f = c.barStart, p = c.barEnd - c.barStart, f !== 0 && Pt(f) !== Pt(c.barEnd) && (m = 0), m += f);
    const v = !Ee(s) && !u ? s : m;
    let y = a.getPixelForValue(v);
    if (this.chart.getDataVisibility(t) ? h = a.getPixelForValue(m + p) : h = y, b = h - y, Math.abs(b) < i) {
      b = hd(b, a, r) * i, f === r && (y -= b / 2);
      const w = a.getPixelForDecimal(0), _ = a.getPixelForDecimal(1), k = Math.min(w, _), C = Math.max(w, _);
      y = Math.max(Math.min(y, C), k), h = y + b, n && !u && (l._stacks[a.axis]._visualValues[o] = a.getValueForPixel(h) - a.getValueForPixel(y));
    }
    if (y === a.getPixelForValue(r)) {
      const w = Pt(b) * a.getLineWidthForValue(r) / 2;
      y += w, b -= w;
    }
    return {
      size: b,
      base: y,
      head: h,
      center: h + b / 2
    };
  }
  _calculateBarIndexPixels(t, a) {
    const n = a.scale, o = this.options, s = o.skipNull, i = De(o.maxBarThickness, 1 / 0);
    let r, l;
    const c = this._getAxisCount();
    if (a.grouped) {
      const u = s ? this._getStackCount(t) : a.stackCount, f = o.barThickness === "flex" ? dd(t, a, o, u * c) : cd(t, a, o, u * c), m = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, p = this._getAxis().indexOf(De(m, this.getFirstScaleIdForIndexAxis())), h = this._getStackIndex(this.index, this._cachedMeta.stack, s ? t : void 0) + p;
      r = f.start + f.chunk * h + f.chunk / 2, l = Math.min(i, f.chunk * f.ratio);
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
function vd(e, t, a) {
  let n = 1, o = 1, s = 0, i = 0;
  if (t < Ue) {
    const r = e, l = r + t, c = Math.cos(r), u = Math.sin(r), f = Math.cos(l), m = Math.sin(l), p = (_, k, C) => qa(_, r, l, !0) ? 1 : Math.max(k, k * a, C, C * a), h = (_, k, C) => qa(_, r, l, !0) ? -1 : Math.min(k, k * a, C, C * a), b = p(0, c, f), v = p(Qe, u, m), y = h(Oe, c, f), w = h(Oe + Qe, u, m);
    n = (b - y) / 2, o = (v - w) / 2, s = -(b + y) / 2, i = -(v + w) / 2;
  }
  return {
    ratioX: n,
    ratioY: o,
    offsetX: s,
    offsetY: i
  };
}
class yd extends Pn {
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
              const f = t.getDatasetMeta(0).controller.getStyle(c);
              return {
                text: l,
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
                borderRadius: i && (r || f.borderRadius),
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
      if (Le(n[t])) {
        const { key: l = "value" } = this._parsing;
        s = (c) => +fa(n[c], l);
      }
      let i, r;
      for (i = t, r = t + a; i < r; ++i)
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
    const a = this.chart, { chartArea: n } = a, o = this._cachedMeta, s = o.data, i = this.getMaxBorderWidth() + this.getMaxOffset(s) + this.options.spacing, r = Math.max((Math.min(n.width, n.height) - i) / 2, 0), l = Math.min(_l(this.options.cutout, r), 1), c = this._getRingWeight(this.index), { circumference: u, rotation: f } = this._getRotationExtents(), { ratioX: m, ratioY: p, offsetX: h, offsetY: b } = vd(f, u, l), v = (n.width - i) / m, y = (n.height - i) / p, w = Math.max(Math.min(v, y) / 2, 0), _ = Mi(this.options.radius, w), k = Math.max(_ * l, 0), C = (_ - k) / this._getVisibleDatasetWeightTotal();
    this.offsetX = h * _, this.offsetY = b * _, o.total = this.calculateTotal(), this.outerRadius = _ - C * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - C * c, 0), this.updateElements(s, 0, s.length, t);
  }
  _circumference(t, a) {
    const n = this.options, o = this._cachedMeta, s = this._getCircumference();
    return a && n.animation.animateRotate || !this.chart.getDataVisibility(t) || o._parsed[t] === null || o.data[t].hidden ? 0 : this.calculateCircumference(o._parsed[t] * s / Ue);
  }
  updateElements(t, a, n, o) {
    const s = o === "reset", i = this.chart, r = i.chartArea, c = i.options.animation, u = (r.left + r.right) / 2, f = (r.top + r.bottom) / 2, m = s && c.animateScale, p = m ? 0 : this.innerRadius, h = m ? 0 : this.outerRadius, { sharedOptions: b, includeOptions: v } = this._getSharedOptions(a, o);
    let y = this._getRotation(), w;
    for (w = 0; w < a; ++w)
      y += this._circumference(w, s);
    for (w = a; w < a + n; ++w) {
      const _ = this._circumference(w, s), k = t[w], C = {
        x: u + this.offsetX,
        y: f + this.offsetY,
        startAngle: y,
        endAngle: y + _,
        circumference: _,
        outerRadius: h,
        innerRadius: p
      };
      v && (C.options = b || this.resolveDataElementOptions(w, k.active ? "active" : o)), y += _, this.updateElement(k, w, C, o);
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
    const a = this._cachedMeta, n = this.chart, o = n.data.labels || [], s = xo(a._parsed[t], n.options.locale);
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
class xd extends Pn {
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
    let { start: r, count: l } = jl(a, o, i);
    this._drawStart = r, this._drawCount = l, Hl(a) && (r = 0, l = o.length), n._chart = this.chart, n._datasetIndex = this.index, n._decimated = !!s._decimated, n.points = o;
    const c = this.resolveDatasetElementOptions(t);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(n, void 0, {
      animated: !i,
      options: c
    }, t), this.updateElements(o, r, l, t);
  }
  updateElements(t, a, n, o) {
    const s = o === "reset", { iScale: i, vScale: r, _stacked: l, _dataset: c } = this._cachedMeta, { sharedOptions: u, includeOptions: f } = this._getSharedOptions(a, o), m = i.axis, p = r.axis, { spanGaps: h, segment: b } = this.options, v = Ya(h) ? h : Number.POSITIVE_INFINITY, y = this.chart._animationsDisabled || s || o === "none", w = a + n, _ = t.length;
    let k = a > 0 && this.getParsed(a - 1);
    for (let C = 0; C < _; ++C) {
      const S = t[C], M = y ? S : {};
      if (C < a || C >= w) {
        M.skip = !0;
        continue;
      }
      const R = this.getParsed(C), V = Ee(R[p]), W = M[m] = i.getPixelForValue(R[m], C), D = M[p] = s || V ? r.getBasePixel() : r.getPixelForValue(l ? this.applyStack(r, R, l) : R[p], C);
      M.skip = isNaN(W) || isNaN(D) || V, M.stop = C > 0 && Math.abs(R[m] - k[m]) > v, b && (M.parsed = R, M.raw = c.data[C]), f && (M.options = u || this.resolveDataElementOptions(C, S.active ? "active" : o)), y || this.updateElement(S, C, M, o), k = R;
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
class kd extends yd {
  static id = "pie";
  static defaults = {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: "100%"
  };
}
function ra() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class Ao {
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
    Object.assign(Ao.prototype, t);
  }
  options;
  constructor(t) {
    this.options = t || {};
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return ra();
  }
  parse() {
    return ra();
  }
  format() {
    return ra();
  }
  add() {
    return ra();
  }
  diff() {
    return ra();
  }
  startOf() {
    return ra();
  }
  endOf() {
    return ra();
  }
}
var _d = {
  _date: Ao
};
function wd(e, t, a, n) {
  const { controller: o, data: s, _sorted: i } = e, r = o._cachedMeta.iScale, l = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (r && t === r.axis && t !== "r" && i && s.length) {
    const c = r._reversePixels ? Fl : ua;
    if (n) {
      if (o._sharedOptions) {
        const u = s[0], f = typeof u.getRange == "function" && u.getRange(t);
        if (f) {
          const m = c(s, t, a - f), p = c(s, t, a + f);
          return {
            lo: m.lo,
            hi: p.hi
          };
        }
      }
    } else {
      const u = c(s, t, a);
      if (l) {
        const { vScale: f } = o._cachedMeta, { _parsed: m } = e, p = m.slice(0, u.lo + 1).reverse().findIndex((b) => !Ee(b[f.axis]));
        u.lo -= Math.max(0, p);
        const h = m.slice(u.hi).findIndex((b) => !Ee(b[f.axis]));
        u.hi += Math.max(0, h);
      }
      return u;
    }
  }
  return {
    lo: 0,
    hi: s.length - 1
  };
}
function In(e, t, a, n, o) {
  const s = e.getSortedVisibleDatasetMetas(), i = a[t];
  for (let r = 0, l = s.length; r < l; ++r) {
    const { index: c, data: u } = s[r], { lo: f, hi: m } = wd(s[r], t, i, o);
    for (let p = f; p <= m; ++p) {
      const h = u[p];
      h.skip || n(h, c, p);
    }
  }
}
function Cd(e) {
  const t = e.indexOf("x") !== -1, a = e.indexOf("y") !== -1;
  return function(n, o) {
    const s = t ? Math.abs(n.x - o.x) : 0, i = a ? Math.abs(n.y - o.y) : 0;
    return Math.sqrt(Math.pow(s, 2) + Math.pow(i, 2));
  };
}
function Un(e, t, a, n, o) {
  const s = [];
  return !o && !e.isPointInArea(t) || In(e, a, t, function(r, l, c) {
    !o && !Xa(r, e.chartArea, 0) || r.inRange(t.x, t.y, n) && s.push({
      element: r,
      datasetIndex: l,
      index: c
    });
  }, !0), s;
}
function $d(e, t, a, n) {
  let o = [];
  function s(i, r, l) {
    const { startAngle: c, endAngle: u } = i.getProps([
      "startAngle",
      "endAngle"
    ], n), { angle: f } = Ti(i, {
      x: t.x,
      y: t.y
    });
    qa(f, c, u) && o.push({
      element: i,
      datasetIndex: r,
      index: l
    });
  }
  return In(e, a, t, s), o;
}
function Sd(e, t, a, n, o, s) {
  let i = [];
  const r = Cd(a);
  let l = Number.POSITIVE_INFINITY;
  function c(u, f, m) {
    const p = u.inRange(t.x, t.y, o);
    if (n && !p)
      return;
    const h = u.getCenterPoint(o);
    if (!(!!s || e.isPointInArea(h)) && !p)
      return;
    const v = r(t, h);
    v < l ? (i = [
      {
        element: u,
        datasetIndex: f,
        index: m
      }
    ], l = v) : v === l && i.push({
      element: u,
      datasetIndex: f,
      index: m
    });
  }
  return In(e, a, t, c), i;
}
function Yn(e, t, a, n, o, s) {
  return !s && !e.isPointInArea(t) ? [] : a === "r" && !n ? $d(e, t, a, o) : Sd(e, t, a, n, o, s);
}
function ys(e, t, a, n, o) {
  const s = [], i = a === "x" ? "inXRange" : "inYRange";
  let r = !1;
  return In(e, a, t, (l, c, u) => {
    l[i] && l[i](t[a], o) && (s.push({
      element: l,
      datasetIndex: c,
      index: u
    }), r = r || l.inRange(t.x, t.y, o));
  }), n && !r ? [] : s;
}
var Md = {
  modes: {
    index(e, t, a, n) {
      const o = ca(t, e), s = a.axis || "x", i = a.includeInvisible || !1, r = a.intersect ? Un(e, o, s, n, i) : Yn(e, o, s, !1, n, i), l = [];
      return r.length ? (e.getSortedVisibleDatasetMetas().forEach((c) => {
        const u = r[0].index, f = c.data[u];
        f && !f.skip && l.push({
          element: f,
          datasetIndex: c.index,
          index: u
        });
      }), l) : [];
    },
    dataset(e, t, a, n) {
      const o = ca(t, e), s = a.axis || "xy", i = a.includeInvisible || !1;
      let r = a.intersect ? Un(e, o, s, n, i) : Yn(e, o, s, !1, n, i);
      if (r.length > 0) {
        const l = r[0].datasetIndex, c = e.getDatasetMeta(l).data;
        r = [];
        for (let u = 0; u < c.length; ++u)
          r.push({
            element: c[u],
            datasetIndex: l,
            index: u
          });
      }
      return r;
    },
    point(e, t, a, n) {
      const o = ca(t, e), s = a.axis || "xy", i = a.includeInvisible || !1;
      return Un(e, o, s, n, i);
    },
    nearest(e, t, a, n) {
      const o = ca(t, e), s = a.axis || "xy", i = a.includeInvisible || !1;
      return Yn(e, o, s, a.intersect, n, i);
    },
    x(e, t, a, n) {
      const o = ca(t, e);
      return ys(e, o, "x", a.intersect, n);
    },
    y(e, t, a, n) {
      const o = ca(t, e);
      return ys(e, o, "y", a.intersect, n);
    }
  }
};
const Xi = [
  "left",
  "top",
  "right",
  "bottom"
];
function Ta(e, t) {
  return e.filter((a) => a.pos === t);
}
function xs(e, t) {
  return e.filter((a) => Xi.indexOf(a.pos) === -1 && a.box.axis === t);
}
function Ba(e, t) {
  return e.sort((a, n) => {
    const o = t ? n : a, s = t ? a : n;
    return o.weight === s.weight ? o.index - s.index : o.weight - s.weight;
  });
}
function Dd(e) {
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
function Ad(e) {
  const t = {};
  for (const a of e) {
    const { stack: n, pos: o, stackWeight: s } = a;
    if (!n || !Xi.includes(o))
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
function Td(e, t) {
  const a = Ad(e), { vBoxMaxWidth: n, hBoxMaxHeight: o } = t;
  let s, i, r;
  for (s = 0, i = e.length; s < i; ++s) {
    r = e[s];
    const { fullSize: l } = r.box, c = a[r.stack], u = c && r.stackWeight / c.weight;
    r.horizontal ? (r.width = u ? u * n : l && t.availableWidth, r.height = o) : (r.width = n, r.height = u ? u * o : l && t.availableHeight);
  }
  return a;
}
function Bd(e) {
  const t = Dd(e), a = Ba(t.filter((c) => c.box.fullSize), !0), n = Ba(Ta(t, "left"), !0), o = Ba(Ta(t, "right")), s = Ba(Ta(t, "top"), !0), i = Ba(Ta(t, "bottom")), r = xs(t, "x"), l = xs(t, "y");
  return {
    fullSize: a,
    leftAndTop: n.concat(s),
    rightAndBottom: o.concat(l).concat(i).concat(r),
    chartArea: Ta(t, "chartArea"),
    vertical: n.concat(o).concat(l),
    horizontal: s.concat(i).concat(r)
  };
}
function ks(e, t, a, n) {
  return Math.max(e[a], t[a]) + Math.max(e[n], t[n]);
}
function Gi(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function Ld(e, t, a, n) {
  const { pos: o, box: s } = a, i = e.maxPadding;
  if (!Le(o)) {
    a.size && (e[o] -= a.size);
    const f = n[a.stack] || {
      size: 0,
      count: 1
    };
    f.size = Math.max(f.size, a.horizontal ? s.height : s.width), a.size = f.size / f.count, e[o] += a.size;
  }
  s.getPadding && Gi(i, s.getPadding());
  const r = Math.max(0, t.outerWidth - ks(i, e, "left", "right")), l = Math.max(0, t.outerHeight - ks(i, e, "top", "bottom")), c = r !== e.w, u = l !== e.h;
  return e.w = r, e.h = l, a.horizontal ? {
    same: c,
    other: u
  } : {
    same: u,
    other: c
  };
}
function Rd(e) {
  const t = e.maxPadding;
  function a(n) {
    const o = Math.max(t[n] - e[n], 0);
    return e[n] += o, o;
  }
  e.y += a("top"), e.x += a("left"), a("right"), a("bottom");
}
function Pd(e, t) {
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
function Oa(e, t, a, n) {
  const o = [];
  let s, i, r, l, c, u;
  for (s = 0, i = e.length, c = 0; s < i; ++s) {
    r = e[s], l = r.box, l.update(r.width || t.w, r.height || t.h, Pd(r.horizontal, t));
    const { same: f, other: m } = Ld(t, a, r, n);
    c |= f && o.length, u = u || m, l.fullSize || o.push(r);
  }
  return c && Oa(o, t, a, n) || u;
}
function hn(e, t, a, n, o) {
  e.top = a, e.left = t, e.right = t + n, e.bottom = a + o, e.width = n, e.height = o;
}
function _s(e, t, a, n) {
  const o = a.padding;
  let { x: s, y: i } = t;
  for (const r of e) {
    const l = r.box, c = n[r.stack] || {
      placed: 0,
      weight: 1
    }, u = r.stackWeight / c.weight || 1;
    if (r.horizontal) {
      const f = t.w * u, m = c.size || l.height;
      Ua(c.start) && (i = c.start), l.fullSize ? hn(l, o.left, i, a.outerWidth - o.right - o.left, m) : hn(l, t.left + c.placed, i, f, m), c.start = i, c.placed += f, i = l.bottom;
    } else {
      const f = t.h * u, m = c.size || l.width;
      Ua(c.start) && (s = c.start), l.fullSize ? hn(l, s, o.top, m, a.outerHeight - o.bottom - o.top) : hn(l, s, t.top + c.placed, m, f), c.start = s, c.placed += f, s = l.right;
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
    const o = wt(e.options.layout.padding), s = Math.max(t - o.width, 0), i = Math.max(a - o.height, 0), r = Bd(e.boxes), l = r.vertical, c = r.horizontal;
    Fe(e.boxes, (b) => {
      typeof b.beforeLayout == "function" && b.beforeLayout();
    });
    const u = l.reduce((b, v) => v.box.options && v.box.options.display === !1 ? b : b + 1, 0) || 1, f = Object.freeze({
      outerWidth: t,
      outerHeight: a,
      padding: o,
      availableWidth: s,
      availableHeight: i,
      vBoxMaxWidth: s / 2 / u,
      hBoxMaxHeight: i / 2
    }), m = Object.assign({}, o);
    Gi(m, wt(n));
    const p = Object.assign({
      maxPadding: m,
      w: s,
      h: i,
      x: o.left,
      y: o.top
    }, o), h = Td(l.concat(c), f);
    Oa(r.fullSize, p, f, h), Oa(l, p, f, h), Oa(c, p, f, h) && Oa(l, p, f, h), Rd(p), _s(r.leftAndTop, p, f, h), p.x += p.w, p.y += p.h, _s(r.rightAndBottom, p, f, h), e.chartArea = {
      left: p.left,
      top: p.top,
      right: p.left + p.w,
      bottom: p.top + p.h,
      height: p.h,
      width: p.w
    }, Fe(r.chartArea, (b) => {
      const v = b.box;
      Object.assign(v, e.chartArea), v.update(p.w, p.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class Zi {
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
class Id extends Zi {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const kn = "$chartjs", Ed = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, ws = (e) => e === null || e === "";
function Fd(e, t) {
  const a = e.style, n = e.getAttribute("height"), o = e.getAttribute("width");
  if (e[kn] = {
    initial: {
      height: n,
      width: o,
      style: {
        display: a.display,
        height: a.height,
        width: a.width
      }
    }
  }, a.display = a.display || "block", a.boxSizing = a.boxSizing || "border-box", ws(o)) {
    const s = is(e, "width");
    s !== void 0 && (e.width = s);
  }
  if (ws(n))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const s = is(e, "height");
      s !== void 0 && (e.height = s);
    }
  return e;
}
const Qi = Lc ? {
  passive: !0
} : !1;
function Od(e, t, a) {
  e && e.addEventListener(t, a, Qi);
}
function Vd(e, t, a) {
  e && e.canvas && e.canvas.removeEventListener(t, a, Qi);
}
function zd(e, t) {
  const a = Ed[e.type] || e.type, { x: n, y: o } = ca(e, t);
  return {
    type: a,
    chart: t,
    native: e,
    x: n !== void 0 ? n : null,
    y: o !== void 0 ? o : null
  };
}
function An(e, t) {
  for (const a of e)
    if (a === t || a.contains(t))
      return !0;
}
function Nd(e, t, a) {
  const n = e.canvas, o = new MutationObserver((s) => {
    let i = !1;
    for (const r of s)
      i = i || An(r.addedNodes, n), i = i && !An(r.removedNodes, n);
    i && a();
  });
  return o.observe(document, {
    childList: !0,
    subtree: !0
  }), o;
}
function jd(e, t, a) {
  const n = e.canvas, o = new MutationObserver((s) => {
    let i = !1;
    for (const r of s)
      i = i || An(r.removedNodes, n), i = i && !An(r.addedNodes, n);
    i && a();
  });
  return o.observe(document, {
    childList: !0,
    subtree: !0
  }), o;
}
const Za = /* @__PURE__ */ new Map();
let Cs = 0;
function Ji() {
  const e = window.devicePixelRatio;
  e !== Cs && (Cs = e, Za.forEach((t, a) => {
    a.currentDevicePixelRatio !== e && t();
  }));
}
function Hd(e, t) {
  Za.size || window.addEventListener("resize", Ji), Za.set(e, t);
}
function Wd(e) {
  Za.delete(e), Za.size || window.removeEventListener("resize", Ji);
}
function Kd(e, t, a) {
  const n = e.canvas, o = n && Do(n);
  if (!o)
    return;
  const s = Pi((r, l) => {
    const c = o.clientWidth;
    a(r, l), c < o.clientWidth && a();
  }, window), i = new ResizeObserver((r) => {
    const l = r[0], c = l.contentRect.width, u = l.contentRect.height;
    c === 0 && u === 0 || s(c, u);
  });
  return i.observe(o), Hd(e, s), i;
}
function qn(e, t, a) {
  a && a.disconnect(), t === "resize" && Wd(e);
}
function Ud(e, t, a) {
  const n = e.canvas, o = Pi((s) => {
    e.ctx !== null && a(zd(s, e));
  }, e);
  return Od(n, t, o), o;
}
class Yd extends Zi {
  acquireContext(t, a) {
    const n = t && t.getContext && t.getContext("2d");
    return n && n.canvas === t ? (Fd(t, a), n) : null;
  }
  releaseContext(t) {
    const a = t.canvas;
    if (!a[kn])
      return !1;
    const n = a[kn].initial;
    [
      "height",
      "width"
    ].forEach((s) => {
      const i = n[s];
      Ee(i) ? a.removeAttribute(s) : a.setAttribute(s, i);
    });
    const o = n.style || {};
    return Object.keys(o).forEach((s) => {
      a.style[s] = o[s];
    }), a.width = a.width, delete a[kn], !0;
  }
  addEventListener(t, a, n) {
    this.removeEventListener(t, a);
    const o = t.$proxies || (t.$proxies = {}), i = {
      attach: Nd,
      detach: jd,
      resize: Kd
    }[a] || Ud;
    o[a] = i(t, a, n);
  }
  removeEventListener(t, a) {
    const n = t.$proxies || (t.$proxies = {}), o = n[a];
    if (!o)
      return;
    ({
      attach: qn,
      detach: qn,
      resize: qn
    }[a] || Vd)(t, a, o), n[a] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, a, n, o) {
    return Bc(t, a, n, o);
  }
  isAttached(t) {
    const a = t && Do(t);
    return !!(a && a.isConnected);
  }
}
function qd(e) {
  return !Mo() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? Id : Yd;
}
let Wt = class {
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
    return Ya(this.x) && Ya(this.y);
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
function Xd(e, t) {
  const a = e.options.ticks, n = Gd(e), o = Math.min(a.maxTicksLimit || n, n), s = a.major.enabled ? Qd(t) : [], i = s.length, r = s[0], l = s[i - 1], c = [];
  if (i > o)
    return Jd(t, c, s, i / o), c;
  const u = Zd(s, t, o);
  if (i > 0) {
    let f, m;
    const p = i > 1 ? Math.round((l - r) / (i - 1)) : null;
    for (fn(t, c, u, Ee(p) ? 0 : r - p, r), f = 0, m = i - 1; f < m; f++)
      fn(t, c, u, s[f], s[f + 1]);
    return fn(t, c, u, l, Ee(p) ? t.length : l + p), c;
  }
  return fn(t, c, u), c;
}
function Gd(e) {
  const t = e.options.offset, a = e._tickSize(), n = e._length / a + (t ? 0 : 1), o = e._maxLength / a;
  return Math.floor(Math.min(n, o));
}
function Zd(e, t, a) {
  const n = eu(e), o = t.length / a;
  if (!n)
    return Math.max(o, 1);
  const s = Tl(n);
  for (let i = 0, r = s.length - 1; i < r; i++) {
    const l = s[i];
    if (l > o)
      return l;
  }
  return Math.max(o, 1);
}
function Qd(e) {
  const t = [];
  let a, n;
  for (a = 0, n = e.length; a < n; a++)
    e[a].major && t.push(a);
  return t;
}
function Jd(e, t, a, n) {
  let o = 0, s = a[0], i;
  for (n = Math.ceil(n), i = 0; i < e.length; i++)
    i === s && (t.push(e[i]), o++, s = a[o * n]);
}
function fn(e, t, a, n, o) {
  const s = De(n, 0), i = Math.min(De(o, e.length), e.length);
  let r = 0, l, c, u;
  for (a = Math.ceil(a), o && (l = o - n, a = l / Math.floor(l / a)), u = s; u < 0; )
    r++, u = Math.round(s + r * a);
  for (c = Math.max(s, 0); c < i; c++)
    c === u && (t.push(e[c]), r++, u = Math.round(s + r * a));
}
function eu(e) {
  const t = e.length;
  let a, n;
  if (t < 2)
    return !1;
  for (n = e[0], a = 1; a < t; ++a)
    if (e[a] - e[a - 1] !== n)
      return !1;
  return n;
}
const tu = (e) => e === "left" ? "right" : e === "right" ? "left" : e, $s = (e, t, a) => t === "top" || t === "left" ? e[t] + a : e[t] - a, Ss = (e, t) => Math.min(t || e, e);
function Ms(e, t) {
  const a = [], n = e.length / t, o = e.length;
  let s = 0;
  for (; s < o; s += n)
    a.push(e[Math.floor(s)]);
  return a;
}
function au(e, t, a) {
  const n = e.ticks.length, o = Math.min(t, n - 1), s = e._startPixel, i = e._endPixel, r = 1e-6;
  let l = e.getPixelForTick(o), c;
  if (!(a && (n === 1 ? c = Math.max(l - s, i - l) : t === 0 ? c = (e.getPixelForTick(1) - l) / 2 : c = (l - e.getPixelForTick(o - 1)) / 2, l += o < t ? c : -c, l < s - r || l > i + r)))
    return l;
}
function nu(e, t) {
  Fe(e, (a) => {
    const n = a.gc, o = n.length / 2;
    let s;
    if (o > t) {
      for (s = 0; s < o; ++s)
        delete a.data[n[s]];
      n.splice(0, o);
    }
  });
}
function La(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function Ds(e, t) {
  if (!e.display)
    return 0;
  const a = it(e.font, t), n = wt(e.padding);
  return (Ze(e.text) ? e.text.length : 1) * a.lineHeight + n.height;
}
function ou(e, t) {
  return ma(e, {
    scale: t,
    type: "scale"
  });
}
function su(e, t, a) {
  return ma(e, {
    tick: a,
    index: t,
    type: "tick"
  });
}
function iu(e, t, a) {
  let n = vo(e);
  return (a && t !== "right" || !a && t === "right") && (n = tu(n)), n;
}
function ru(e, t, a, n) {
  const { top: o, left: s, bottom: i, right: r, chart: l } = e, { chartArea: c, scales: u } = l;
  let f = 0, m, p, h;
  const b = i - o, v = r - s;
  if (e.isHorizontal()) {
    if (p = tt(n, s, r), Le(a)) {
      const y = Object.keys(a)[0], w = a[y];
      h = u[y].getPixelForValue(w) + b - t;
    } else a === "center" ? h = (c.bottom + c.top) / 2 + b - t : h = $s(e, a, t);
    m = r - s;
  } else {
    if (Le(a)) {
      const y = Object.keys(a)[0], w = a[y];
      p = u[y].getPixelForValue(w) - v + t;
    } else a === "center" ? p = (c.left + c.right) / 2 - v + t : p = $s(e, a, t);
    h = tt(n, i, o), f = a === "left" ? -Qe : Qe;
  }
  return {
    titleX: p,
    titleY: h,
    maxWidth: m,
    rotation: f
  };
}
class Da extends Wt {
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
    return t = Tt(t, Number.POSITIVE_INFINITY), a = Tt(a, Number.NEGATIVE_INFINITY), n = Tt(n, Number.POSITIVE_INFINITY), o = Tt(o, Number.NEGATIVE_INFINITY), {
      min: Tt(t, n),
      max: Tt(a, o),
      minDefined: _t(t),
      maxDefined: _t(a)
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
      min: Tt(a, Tt(n, a)),
      max: Tt(n, Tt(a, n))
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
    Ne(this.options.beforeUpdate, [
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
    }, n), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + n.left + n.right : this.height + n.top + n.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = cc(this, s, o), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const l = r < this.ticks.length;
    this._convertTicksToLabels(l ? Ms(this.ticks, r) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), i.display && (i.autoSkip || i.source === "auto") && (this.ticks = Xd(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), l && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, a, n;
    this.isHorizontal() ? (a = this.left, n = this.right) : (a = this.top, n = this.bottom, t = !t), this._startPixel = a, this._endPixel = n, this._reversePixels = t, this._length = n - a, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    Ne(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    Ne(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    Ne(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), Ne(this.options[t], [
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
    Ne(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const a = this.options.ticks;
    let n, o, s;
    for (n = 0, o = t.length; n < o; n++)
      s = t[n], s.label = Ne(a.callback, [
        s.value,
        n,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    Ne(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    Ne(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, a = t.ticks, n = Ss(this.ticks.length, t.ticks.maxTicksLimit), o = a.minRotation || 0, s = a.maxRotation;
    let i = o, r, l, c;
    if (!this._isVisible() || !a.display || o >= s || n <= 1 || !this.isHorizontal()) {
      this.labelRotation = o;
      return;
    }
    const u = this._getLabelSizes(), f = u.widest.width, m = u.highest.height, p = st(this.chart.width - f, 0, this.maxWidth);
    r = t.offset ? this.maxWidth / n : p / (n - 1), f + 6 > r && (r = p / (n - (t.offset ? 0.5 : 1)), l = this.maxHeight - La(t.grid) - a.padding - Ds(t.title, this.chart.options.font), c = Math.sqrt(f * f + m * m), i = Pl(Math.min(Math.asin(st((u.highest.height + 6) / r, -1, 1)), Math.asin(st(l / c, -1, 1)) - Math.asin(st(m / c, -1, 1)))), i = Math.max(o, Math.min(s, i))), this.labelRotation = i;
  }
  afterCalculateLabelRotation() {
    Ne(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    Ne(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: a, options: { ticks: n, title: o, grid: s } } = this, i = this._isVisible(), r = this.isHorizontal();
    if (i) {
      const l = Ds(o, a.options.font);
      if (r ? (t.width = this.maxWidth, t.height = La(s) + l) : (t.height = this.maxHeight, t.width = La(s) + l), n.display && this.ticks.length) {
        const { first: c, last: u, widest: f, highest: m } = this._getLabelSizes(), p = n.padding * 2, h = zt(this.labelRotation), b = Math.cos(h), v = Math.sin(h);
        if (r) {
          const y = n.mirror ? 0 : v * f.width + b * m.height;
          t.height = Math.min(this.maxHeight, t.height + y + p);
        } else {
          const y = n.mirror ? 0 : b * f.width + v * m.height;
          t.width = Math.min(this.maxWidth, t.width + y + p);
        }
        this._calculatePadding(c, u, v, b);
      }
    }
    this._handleMargins(), r ? (this.width = this._length = a.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = a.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, a, n, o) {
    const { ticks: { align: s, padding: i }, position: r } = this.options, l = this.labelRotation !== 0, c = r !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const u = this.getPixelForTick(0) - this.left, f = this.right - this.getPixelForTick(this.ticks.length - 1);
      let m = 0, p = 0;
      l ? c ? (m = o * t.width, p = n * a.height) : (m = n * t.height, p = o * a.width) : s === "start" ? p = a.width : s === "end" ? m = t.width : s !== "inner" && (m = t.width / 2, p = a.width / 2), this.paddingLeft = Math.max((m - u + i) * this.width / (this.width - u), 0), this.paddingRight = Math.max((p - f + i) * this.width / (this.width - f), 0);
    } else {
      let u = a.height / 2, f = t.height / 2;
      s === "start" ? (u = 0, f = t.height) : s === "end" && (u = a.height, f = 0), this.paddingTop = u + i, this.paddingBottom = f + i;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    Ne(this.options.afterFit, [
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
      Ee(t[a].label) && (t.splice(a, 1), n--, a--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const a = this.options.ticks.sampleSize;
      let n = this.ticks;
      a < n.length && (n = Ms(n, a)), this._labelSizes = t = this._computeLabelSizes(n, n.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, a, n) {
    const { ctx: o, _longestTextCache: s } = this, i = [], r = [], l = Math.floor(a / Ss(a, n));
    let c = 0, u = 0, f, m, p, h, b, v, y, w, _, k, C;
    for (f = 0; f < a; f += l) {
      if (h = t[f].label, b = this._resolveTickFontOptions(f), o.font = v = b.string, y = s[v] = s[v] || {
        data: {},
        gc: []
      }, w = b.lineHeight, _ = k = 0, !Ee(h) && !Ze(h))
        _ = ts(o, y.data, y.gc, _, h), k = w;
      else if (Ze(h))
        for (m = 0, p = h.length; m < p; ++m)
          C = h[m], !Ee(C) && !Ze(C) && (_ = ts(o, y.data, y.gc, _, C), k += w);
      i.push(_), r.push(k), c = Math.max(_, c), u = Math.max(k, u);
    }
    nu(s, a);
    const S = i.indexOf(c), M = r.indexOf(u), R = (V) => ({
      width: i[V] || 0,
      height: r[V] || 0
    });
    return {
      first: R(0),
      last: R(a - 1),
      widest: R(S),
      highest: R(M),
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
    return El(this._alignToPixels ? ia(this.chart, a, 0) : a);
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
      return n.$context || (n.$context = su(this.getContext(), t, n));
    }
    return this.$context || (this.$context = ou(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, a = zt(this.labelRotation), n = Math.abs(Math.cos(a)), o = Math.abs(Math.sin(a)), s = this._getLabelSizes(), i = t.autoSkipPadding || 0, r = s ? s.widest.width + i : 0, l = s ? s.highest.height + i : 0;
    return this.isHorizontal() ? l * n > r * o ? r / n : l / o : l * o < r * n ? l / n : r / o;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const a = this.axis, n = this.chart, o = this.options, { grid: s, position: i, border: r } = o, l = s.offset, c = this.isHorizontal(), f = this.ticks.length + (l ? 1 : 0), m = La(s), p = [], h = r.setContext(this.getContext()), b = h.display ? h.width : 0, v = b / 2, y = function(Q) {
      return ia(n, Q, b);
    };
    let w, _, k, C, S, M, R, V, W, D, I, B;
    if (i === "top")
      w = y(this.bottom), M = this.bottom - m, V = w - v, D = y(t.top) + v, B = t.bottom;
    else if (i === "bottom")
      w = y(this.top), D = t.top, B = y(t.bottom) - v, M = w + v, V = this.top + m;
    else if (i === "left")
      w = y(this.right), S = this.right - m, R = w - v, W = y(t.left) + v, I = t.right;
    else if (i === "right")
      w = y(this.left), W = t.left, I = y(t.right) - v, S = w + v, R = this.left + m;
    else if (a === "x") {
      if (i === "center")
        w = y((t.top + t.bottom) / 2 + 0.5);
      else if (Le(i)) {
        const Q = Object.keys(i)[0], le = i[Q];
        w = y(this.chart.scales[Q].getPixelForValue(le));
      }
      D = t.top, B = t.bottom, M = w + v, V = M + m;
    } else if (a === "y") {
      if (i === "center")
        w = y((t.left + t.right) / 2);
      else if (Le(i)) {
        const Q = Object.keys(i)[0], le = i[Q];
        w = y(this.chart.scales[Q].getPixelForValue(le));
      }
      S = w - v, R = S - m, W = t.left, I = t.right;
    }
    const j = De(o.ticks.maxTicksLimit, f), H = Math.max(1, Math.ceil(f / j));
    for (_ = 0; _ < f; _ += H) {
      const Q = this.getContext(_), le = s.setContext(Q), fe = r.setContext(Q), G = le.lineWidth, oe = le.color, L = fe.dash || [], U = fe.dashOffset, Y = le.tickWidth, z = le.tickColor, re = le.tickBorderDash || [], ce = le.tickBorderDashOffset;
      k = au(this, _, l), k !== void 0 && (C = ia(n, k, G), c ? S = R = W = I = C : M = V = D = B = C, p.push({
        tx1: S,
        ty1: M,
        tx2: R,
        ty2: V,
        x1: W,
        y1: D,
        x2: I,
        y2: B,
        width: G,
        color: oe,
        borderDash: L,
        borderDashOffset: U,
        tickWidth: Y,
        tickColor: z,
        tickBorderDash: re,
        tickBorderDashOffset: ce
      }));
    }
    return this._ticksLength = f, this._borderValue = w, p;
  }
  _computeLabelItems(t) {
    const a = this.axis, n = this.options, { position: o, ticks: s } = n, i = this.isHorizontal(), r = this.ticks, { align: l, crossAlign: c, padding: u, mirror: f } = s, m = La(n.grid), p = m + u, h = f ? -u : p, b = -zt(this.labelRotation), v = [];
    let y, w, _, k, C, S, M, R, V, W, D, I, B = "middle";
    if (o === "top")
      S = this.bottom - h, M = this._getXAxisLabelAlignment();
    else if (o === "bottom")
      S = this.top + h, M = this._getXAxisLabelAlignment();
    else if (o === "left") {
      const H = this._getYAxisLabelAlignment(m);
      M = H.textAlign, C = H.x;
    } else if (o === "right") {
      const H = this._getYAxisLabelAlignment(m);
      M = H.textAlign, C = H.x;
    } else if (a === "x") {
      if (o === "center")
        S = (t.top + t.bottom) / 2 + p;
      else if (Le(o)) {
        const H = Object.keys(o)[0], Q = o[H];
        S = this.chart.scales[H].getPixelForValue(Q) + p;
      }
      M = this._getXAxisLabelAlignment();
    } else if (a === "y") {
      if (o === "center")
        C = (t.left + t.right) / 2 - p;
      else if (Le(o)) {
        const H = Object.keys(o)[0], Q = o[H];
        C = this.chart.scales[H].getPixelForValue(Q);
      }
      M = this._getYAxisLabelAlignment(m).textAlign;
    }
    a === "y" && (l === "start" ? B = "top" : l === "end" && (B = "bottom"));
    const j = this._getLabelSizes();
    for (y = 0, w = r.length; y < w; ++y) {
      _ = r[y], k = _.label;
      const H = s.setContext(this.getContext(y));
      R = this.getPixelForTick(y) + s.labelOffset, V = this._resolveTickFontOptions(y), W = V.lineHeight, D = Ze(k) ? k.length : 1;
      const Q = D / 2, le = H.color, fe = H.textStrokeColor, G = H.textStrokeWidth;
      let oe = M;
      i ? (C = R, M === "inner" && (y === w - 1 ? oe = this.options.reverse ? "left" : "right" : y === 0 ? oe = this.options.reverse ? "right" : "left" : oe = "center"), o === "top" ? c === "near" || b !== 0 ? I = -D * W + W / 2 : c === "center" ? I = -j.highest.height / 2 - Q * W + W : I = -j.highest.height + W / 2 : c === "near" || b !== 0 ? I = W / 2 : c === "center" ? I = j.highest.height / 2 - Q * W : I = j.highest.height - D * W, f && (I *= -1), b !== 0 && !H.showLabelBackdrop && (C += W / 2 * Math.sin(b))) : (S = R, I = (1 - D) * W / 2);
      let L;
      if (H.showLabelBackdrop) {
        const U = wt(H.backdropPadding), Y = j.heights[y], z = j.widths[y];
        let re = I - U.top, ce = 0 - U.left;
        switch (B) {
          case "middle":
            re -= Y / 2;
            break;
          case "bottom":
            re -= Y;
            break;
        }
        switch (M) {
          case "center":
            ce -= z / 2;
            break;
          case "right":
            ce -= z;
            break;
          case "inner":
            y === w - 1 ? ce -= z : y > 0 && (ce -= z / 2);
            break;
        }
        L = {
          left: ce,
          top: re,
          width: z + U.width,
          height: Y + U.height,
          color: H.backdropColor
        };
      }
      v.push({
        label: k,
        font: V,
        textOffset: I,
        options: {
          rotation: b,
          color: le,
          strokeColor: fe,
          strokeWidth: G,
          textAlign: oe,
          textBaseline: B,
          translation: [
            C,
            S
          ],
          backdrop: L
        }
      });
    }
    return v;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: a } = this.options;
    if (-zt(this.labelRotation))
      return t === "top" ? "left" : "right";
    let o = "center";
    return a.align === "start" ? o = "left" : a.align === "end" ? o = "right" : a.align === "inner" && (o = "inner"), o;
  }
  _getYAxisLabelAlignment(t) {
    const { position: a, ticks: { crossAlign: n, mirror: o, padding: s } } = this.options, i = this._getLabelSizes(), r = t + s, l = i.widest.width;
    let c, u;
    return a === "left" ? o ? (u = this.right + s, n === "near" ? c = "left" : n === "center" ? (c = "center", u += l / 2) : (c = "right", u += l)) : (u = this.right - r, n === "near" ? c = "right" : n === "center" ? (c = "center", u -= l / 2) : (c = "left", u = this.left)) : a === "right" ? o ? (u = this.left + s, n === "near" ? c = "right" : n === "center" ? (c = "center", u -= l / 2) : (c = "left", u -= l)) : (u = this.left + r, n === "near" ? c = "left" : n === "center" ? (c = "center", u += l / 2) : (c = "right", u = this.right)) : c = "right", {
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
    const r = (l, c, u) => {
      !u.width || !u.color || (n.save(), n.lineWidth = u.width, n.strokeStyle = u.color, n.setLineDash(u.borderDash || []), n.lineDashOffset = u.borderDashOffset, n.beginPath(), n.moveTo(l.x, l.y), n.lineTo(c.x, c.y), n.stroke(), n.restore());
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
    let c, u, f, m;
    this.isHorizontal() ? (c = ia(t, this.left, i) - i / 2, u = ia(t, this.right, r) + r / 2, f = m = l) : (f = ia(t, this.top, i) - i / 2, m = ia(t, this.bottom, r) + r / 2, c = u = l), a.save(), a.lineWidth = s.width, a.strokeStyle = s.color, a.beginPath(), a.moveTo(c, f), a.lineTo(u, m), a.stroke(), a.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const n = this.ctx, o = this._computeLabelArea();
    o && ko(n, o);
    const s = this.getLabelItems(t);
    for (const i of s) {
      const r = i.options, l = i.font, c = i.label, u = i.textOffset;
      Ga(n, c, 0, u, l, r);
    }
    o && _o(n);
  }
  drawTitle() {
    const { ctx: t, options: { position: a, title: n, reverse: o } } = this;
    if (!n.display)
      return;
    const s = it(n.font), i = wt(n.padding), r = n.align;
    let l = s.lineHeight / 2;
    a === "bottom" || a === "center" || Le(a) ? (l += i.bottom, Ze(n.text) && (l += s.lineHeight * (n.text.length - 1))) : l += i.top;
    const { titleX: c, titleY: u, maxWidth: f, rotation: m } = ru(this, l, a, r);
    Ga(t, n.text, 0, 0, s, {
      color: n.color,
      maxWidth: f,
      rotation: m,
      textAlign: iu(r, a, o),
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
    return !this._isVisible() || this.draw !== Da.prototype.draw ? [
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
    return it(a.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class gn {
  constructor(t, a, n) {
    this.type = t, this.scope = a, this.override = n, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const a = Object.getPrototypeOf(t);
    let n;
    du(a) && (n = this.register(a));
    const o = this.items, s = t.id, i = this.scope + "." + s;
    if (!s)
      throw new Error("class does not have id: " + t);
    return s in o || (o[s] = t, lu(t, i, n), this.override && Ye.override(t.id, t.overrides)), i;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const a = this.items, n = t.id, o = this.scope;
    n in a && delete a[n], o && n in Ye[o] && (delete Ye[o][n], this.override && delete ga[n]);
  }
}
function lu(e, t, a) {
  const n = Ka(/* @__PURE__ */ Object.create(null), [
    a ? Ye.get(a) : {},
    Ye.get(t),
    e.defaults
  ]);
  Ye.set(t, n), e.defaultRoutes && cu(t, e.defaultRoutes), e.descriptors && Ye.describe(t, e.descriptors);
}
function cu(e, t) {
  Object.keys(t).forEach((a) => {
    const n = a.split("."), o = n.pop(), s = [
      e
    ].concat(n).join("."), i = t[a].split("."), r = i.pop(), l = i.join(".");
    Ye.route(s, o, l, r);
  });
}
function du(e) {
  return "id" in e && "defaults" in e;
}
class uu {
  constructor() {
    this.controllers = new gn(Pn, "datasets", !0), this.elements = new gn(Wt, "elements"), this.plugins = new gn(Object, "plugins"), this.scales = new gn(Da, "scales"), this._typedRegistries = [
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
      n || s.isForType(o) || s === this.plugins && o.id ? this._exec(t, s, o) : Fe(o, (i) => {
        const r = n || this._getRegistryForType(i);
        this._exec(t, r, i);
      });
    });
  }
  _exec(t, a, n) {
    const o = po(t);
    Ne(n["before" + o], [], n), a[t](n), Ne(n["after" + o], [], n);
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
var Lt = /* @__PURE__ */ new uu();
class hu {
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
      if (Ne(r, l, i) === !1 && o.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    Ee(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const a = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), a;
  }
  _createDescriptors(t, a) {
    const n = t && t.config, o = De(n.options && n.options.plugins, {}), s = fu(n);
    return o === !1 && !a ? [] : mu(t, s, o, a);
  }
  _notifyStateChanges(t) {
    const a = this._oldCache || [], n = this._cache, o = (s, i) => s.filter((r) => !i.some((l) => r.plugin.id === l.plugin.id));
    this._notify(o(a, n), t, "stop"), this._notify(o(n, a), t, "start");
  }
}
function fu(e) {
  const t = {}, a = [], n = Object.keys(Lt.plugins.items);
  for (let s = 0; s < n.length; s++)
    a.push(Lt.getPlugin(n[s]));
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
function gu(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function mu(e, { plugins: t, localIds: a }, n, o) {
  const s = [], i = e.getContext();
  for (const r of t) {
    const l = r.id, c = gu(n[l], o);
    c !== null && s.push({
      plugin: r,
      options: pu(e.config, {
        plugin: r,
        local: a[l]
      }, c, i)
    });
  }
  return s;
}
function pu(e, { plugin: t, local: a }, n, o) {
  const s = e.pluginScopeKeys(t), i = e.getOptionScopes(n, s);
  return a && t.defaults && i.push(t.defaults), e.createResolver(i, o, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function so(e, t) {
  const a = Ye.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || a.indexAxis || "x";
}
function bu(e, t) {
  let a = e;
  return e === "_index_" ? a = t : e === "_value_" && (a = t === "x" ? "y" : "x"), a;
}
function vu(e, t) {
  return e === t ? "_index_" : "_value_";
}
function As(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function yu(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function io(e, ...t) {
  if (As(e))
    return e;
  for (const a of t) {
    const n = a.axis || yu(a.position) || e.length > 1 && As(e[0].toLowerCase());
    if (n)
      return n;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function Ts(e, t, a) {
  if (a[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function xu(e, t) {
  if (t.data && t.data.datasets) {
    const a = t.data.datasets.filter((n) => n.xAxisID === e || n.yAxisID === e);
    if (a.length)
      return Ts(e, "x", a[0]) || Ts(e, "y", a[0]);
  }
  return {};
}
function ku(e, t) {
  const a = ga[e.type] || {
    scales: {}
  }, n = t.scales || {}, o = so(e.type, t), s = /* @__PURE__ */ Object.create(null);
  return Object.keys(n).forEach((i) => {
    const r = n[i];
    if (!Le(r))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (r._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const l = io(i, r, xu(i, e), Ye.scales[r.type]), c = vu(l, o), u = a.scales || {};
    s[i] = za(/* @__PURE__ */ Object.create(null), [
      {
        axis: l
      },
      r,
      u[l],
      u[c]
    ]);
  }), e.data.datasets.forEach((i) => {
    const r = i.type || e.type, l = i.indexAxis || so(r, t), u = (ga[r] || {}).scales || {};
    Object.keys(u).forEach((f) => {
      const m = bu(f, l), p = i[m + "AxisID"] || m;
      s[p] = s[p] || /* @__PURE__ */ Object.create(null), za(s[p], [
        {
          axis: m
        },
        n[p],
        u[f]
      ]);
    });
  }), Object.keys(s).forEach((i) => {
    const r = s[i];
    za(r, [
      Ye.scales[r.type],
      Ye.scale
    ]);
  }), s;
}
function er(e) {
  const t = e.options || (e.options = {});
  t.plugins = De(t.plugins, {}), t.scales = ku(e, t);
}
function tr(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function _u(e) {
  return e = e || {}, e.data = tr(e.data), er(e), e;
}
const Bs = /* @__PURE__ */ new Map(), ar = /* @__PURE__ */ new Set();
function mn(e, t) {
  let a = Bs.get(e);
  return a || (a = t(), Bs.set(e, a), ar.add(a)), a;
}
const Ra = (e, t, a) => {
  const n = fa(t, a);
  n !== void 0 && e.add(n);
};
class wu {
  constructor(t) {
    this._config = _u(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = tr(t);
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
    this.clearCache(), er(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return mn(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, a) {
    return mn(`${t}.transition.${a}`, () => [
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
    return mn(`${t}-${a}`, () => [
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
    return mn(`${n}-plugin-${a}`, () => [
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
    a.forEach((u) => {
      t && (l.add(t), u.forEach((f) => Ra(l, t, f))), u.forEach((f) => Ra(l, o, f)), u.forEach((f) => Ra(l, ga[s] || {}, f)), u.forEach((f) => Ra(l, Ye, f)), u.forEach((f) => Ra(l, no, f));
    });
    const c = Array.from(l);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), ar.has(a) && i.set(a, c), c;
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
      no
    ];
  }
  resolveNamedOptions(t, a, n, o = [
    ""
  ]) {
    const s = {
      $shared: !0
    }, { resolver: i, subPrefixes: r } = Ls(this._resolverCache, t, o);
    let l = i;
    if ($u(i, a)) {
      s.$shared = !1, n = Jt(n) ? n() : n;
      const c = this.createResolver(t, n, r);
      l = $a(i, n, c);
    }
    for (const c of a)
      s[c] = l[c];
    return s;
  }
  createResolver(t, a, n = [
    ""
  ], o) {
    const { resolver: s } = Ls(this._resolverCache, t, n);
    return Le(a) ? $a(s, a, void 0, o) : s;
  }
}
function Ls(e, t, a) {
  let n = e.get(t);
  n || (n = /* @__PURE__ */ new Map(), e.set(t, n));
  const o = a.join();
  let s = n.get(o);
  return s || (s = {
    resolver: Co(t, a),
    subPrefixes: a.filter((r) => !r.toLowerCase().includes("hover"))
  }, n.set(o, s)), s;
}
const Cu = (e) => Le(e) && Object.getOwnPropertyNames(e).some((t) => Jt(e[t]));
function $u(e, t) {
  const { isScriptable: a, isIndexable: n } = Oi(e);
  for (const o of t) {
    const s = a(o), i = n(o), r = (i || s) && e[o];
    if (s && (Jt(r) || Cu(r)) || i && Ze(r))
      return !0;
  }
  return !1;
}
var Su = "4.5.1";
const Mu = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function Rs(e, t) {
  return e === "top" || e === "bottom" || Mu.indexOf(e) === -1 && t === "x";
}
function Ps(e, t) {
  return function(a, n) {
    return a[e] === n[e] ? a[t] - n[t] : a[e] - n[e];
  };
}
function Is(e) {
  const t = e.chart, a = t.options.animation;
  t.notifyPlugins("afterRender"), Ne(a && a.onComplete, [
    e
  ], t);
}
function Du(e) {
  const t = e.chart, a = t.options.animation;
  Ne(a && a.onProgress, [
    e
  ], t);
}
function nr(e) {
  return Mo() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const _n = {}, Es = (e) => {
  const t = nr(e);
  return Object.values(_n).filter((a) => a.canvas === t).pop();
};
function Au(e, t, a) {
  const n = Object.keys(e);
  for (const o of n) {
    const s = +o;
    if (s >= t) {
      const i = e[o];
      delete e[o], (a > 0 || s > t) && (e[s + a] = i);
    }
  }
}
function Tu(e, t, a, n) {
  return !a || e.type === "mouseout" ? null : n ? t : e;
}
let ea = class {
  static defaults = Ye;
  static instances = _n;
  static overrides = ga;
  static registry = Lt;
  static version = Su;
  static getChart = Es;
  static register(...t) {
    Lt.add(...t), Fs();
  }
  static unregister(...t) {
    Lt.remove(...t), Fs();
  }
  constructor(t, a) {
    const n = this.config = new wu(a), o = nr(t), s = Es(o);
    if (s)
      throw new Error("Canvas is already in use. Chart with ID '" + s.id + "' must be destroyed before the canvas with ID '" + s.canvas.id + "' can be reused.");
    const i = n.createResolver(n.chartOptionScopes(), this.getContext());
    this.platform = new (n.platform || qd(o))(), this.platform.updateConfig(n);
    const r = this.platform.acquireContext(o, i.aspectRatio), l = r && r.canvas, c = l && l.height, u = l && l.width;
    if (this.id = kl(), this.ctx = r, this.canvas = l, this.width = u, this.height = c, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new hu(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = zl((f) => this.update(f), i.resizeDelay || 0), this._dataChanges = [], _n[this.id] = this, !r || !l) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    Ft.listen(this, "complete", Is), Ft.listen(this, "progress", Du), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: a }, width: n, height: o, _aspectRatio: s } = this;
    return Ee(t) ? a && s ? s : o ? n / o : null : t;
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
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : ss(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return as(this.canvas, this.ctx), this;
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
    const n = this.options, o = this.canvas, s = n.maintainAspectRatio && this.aspectRatio, i = this.platform.getMaximumSize(o, t, a, s), r = n.devicePixelRatio || this.platform.getDevicePixelRatio(), l = this.width ? "resize" : "attach";
    this.width = i.width, this.height = i.height, this._aspectRatio = this.aspectRatio, ss(this, r, !0) && (this.notifyPlugins("resize", {
      size: i
    }), Ne(n.onResize, [
      this,
      i
    ], this), this.attached && this._doResize(l) && this.render());
  }
  ensureScalesHaveIDs() {
    const a = this.options.scales || {};
    Fe(a, (n, o) => {
      n.id = o;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, a = t.scales, n = this.scales, o = Object.keys(n).reduce((i, r) => (i[r] = !1, i), {});
    let s = [];
    a && (s = s.concat(Object.keys(a).map((i) => {
      const r = a[i], l = io(i, r), c = l === "r", u = l === "x";
      return {
        options: r,
        dposition: c ? "chartArea" : u ? "bottom" : "left",
        dtype: c ? "radialLinear" : u ? "category" : "linear"
      };
    }))), Fe(s, (i) => {
      const r = i.options, l = r.id, c = io(l, r), u = De(r.type, i.dtype);
      (r.position === void 0 || Rs(r.position, c) !== Rs(i.dposition)) && (r.position = i.dposition), o[l] = !0;
      let f = null;
      if (l in n && n[l].type === u)
        f = n[l];
      else {
        const m = Lt.getScale(u);
        f = new m({
          id: l,
          type: u,
          ctx: this.ctx,
          chart: this
        }), n[f.id] = f;
      }
      f.init(r, t);
    }), Fe(o, (i, r) => {
      i || delete n[r];
    }), Fe(n, (i) => {
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
    this._sortedMetasets = t.slice(0).sort(Ps("order", "index"));
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
      if (i.type && i.type !== r && (this._destroyDatasetMeta(n), i = this.getDatasetMeta(n)), i.type = r, i.indexAxis = s.indexAxis || so(r, this.options), i.order = s.order || 0, i.index = n, i.label = "" + s.label, i.visible = this.isDatasetVisible(n), i.controller)
        i.controller.updateIndex(n), i.controller.linkScales();
      else {
        const l = Lt.getController(r), { datasetElementType: c, dataElementType: u } = Ye.datasets[r];
        Object.assign(l, {
          dataElementType: Lt.getElement(u),
          datasetElementType: c && Lt.getElement(c)
        }), i.controller = new l(this, n), t.push(i.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    Fe(this.data.datasets, (t, a) => {
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
      const { controller: f } = this.getDatasetMeta(c), m = !o && s.indexOf(f) === -1;
      f.buildOrUpdateElements(m), i = Math.max(+f.getMaxOverflow(), i);
    }
    i = this._minPadding = n.layout.autoPadding ? i : 0, this._updateLayout(i), o || Fe(s, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(Ps("z", "_idx"));
    const { _active: r, _lastEvent: l } = this;
    l ? this._eventHandler(l, !0) : r.length && this._updateHoverStyles(r, r, !0), this.render();
  }
  _updateScales() {
    Fe(this.scales, (t) => {
      xt.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, a = new Set(Object.keys(this._listeners)), n = new Set(t.events);
    (!Uo(a, n) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, a = this._getUniformDataChanges() || [];
    for (const { method: n, start: o, count: s } of a) {
      const i = n === "_removeElements" ? -s : s;
      Au(t, o, i);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const a = this.data.datasets.length, n = (s) => new Set(t.filter((i) => i[0] === s).map((i, r) => r + "," + i.splice(1).join(","))), o = n(0);
    for (let s = 1; s < a; s++)
      if (!Uo(o, n(s)))
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
    this._layers = [], Fe(this.boxes, (o) => {
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
        this._updateDataset(a, Jt(t) ? t({
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
    }) !== !1 && (Ft.has(this) ? this.attached && !Ft.running(this) && Ft.start(this) : (this.draw(), Is({
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
    }, o = Uc(this, t);
    this.notifyPlugins("beforeDatasetDraw", n) !== !1 && (o && ko(a, o), t.controller.draw(), o && _o(a), n.cancelable = !1, this.notifyPlugins("afterDatasetDraw", n));
  }
  isPointInArea(t) {
    return Xa(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, a, n, o) {
    const s = Md.modes[a];
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
    Ua(a) ? (s.data[a].hidden = !n, this.update()) : (this.setDatasetVisibility(t, n), i.update(s, {
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
    for (this.stop(), Ft.remove(this), t = 0, a = this.data.datasets.length; t < a; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: a } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), as(t, a), this.platform.releaseContext(a), this.canvas = null, this.ctx = null), delete _n[this.id], this.notifyPlugins("afterDestroy");
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
    Fe(this.options.events, (s) => n(s, o));
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
    Fe(this._listeners, (t, a) => {
      this.platform.removeEventListener(this, a, t);
    }), this._listeners = {}, Fe(this._responsiveListeners, (t, a) => {
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
    !Cn(n, a) && (this._active = n, this._lastEvent = null, this._updateHoverStyles(n, a));
  }
  notifyPlugins(t, a, n) {
    return this._plugins.notify(this, t, a, n);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((a) => a.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, a, n) {
    const o = this.options.hover, s = (l, c) => l.filter((u) => !c.some((f) => u.datasetIndex === f.datasetIndex && u.index === f.index)), i = s(a, t), r = n ? t : s(t, a);
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
    const { _active: o = [], options: s } = this, i = a, r = this._getActiveElements(t, o, n, i), l = Ml(t), c = Tu(t, this._lastEvent, n, l);
    n && (this._lastEvent = null, Ne(s.onHover, [
      t,
      r,
      this
    ], this), l && Ne(s.onClick, [
      t,
      r,
      this
    ], this));
    const u = !Cn(r, o);
    return (u || a) && (this._active = r, this._updateHoverStyles(r, o, a)), this._lastEvent = c, u;
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
function Fs() {
  return Fe(ea.instances, (e) => e._plugins.invalidate());
}
function Bu(e, t, a) {
  const { startAngle: n, x: o, y: s, outerRadius: i, innerRadius: r, options: l } = t, { borderWidth: c, borderJoinStyle: u } = l, f = Math.min(c / i, Ct(n - a));
  if (e.beginPath(), e.arc(o, s, i - c / 2, n + f / 2, a - f / 2), r > 0) {
    const m = Math.min(c / r, Ct(n - a));
    e.arc(o, s, r + c / 2, a - m / 2, n + m / 2, !0);
  } else {
    const m = Math.min(c / 2, i * Ct(n - a));
    if (u === "round")
      e.arc(o, s, m, a - Oe / 2, n + Oe / 2, !0);
    else if (u === "bevel") {
      const p = 2 * m * m, h = -p * Math.cos(a + Oe / 2) + o, b = -p * Math.sin(a + Oe / 2) + s, v = p * Math.cos(n + Oe / 2) + o, y = p * Math.sin(n + Oe / 2) + s;
      e.lineTo(h, b), e.lineTo(v, y);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function Lu(e, t, a) {
  const { startAngle: n, pixelMargin: o, x: s, y: i, outerRadius: r, innerRadius: l } = t;
  let c = o / r;
  e.beginPath(), e.arc(s, i, r, n - c, a + c), l > o ? (c = o / l, e.arc(s, i, l, a + c, n - c, !0)) : e.arc(s, i, o, a + Qe, n - Qe), e.closePath(), e.clip();
}
function Ru(e) {
  return wo(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function Pu(e, t, a, n) {
  const o = Ru(e.options.borderRadius), s = (a - t) / 2, i = Math.min(s, n * t / 2), r = (l) => {
    const c = (a - Math.min(s, l)) * n / 2;
    return st(l, 0, Math.min(s, c));
  };
  return {
    outerStart: r(o.outerStart),
    outerEnd: r(o.outerEnd),
    innerStart: st(o.innerStart, 0, i),
    innerEnd: st(o.innerEnd, 0, i)
  };
}
function va(e, t, a, n) {
  return {
    x: a + e * Math.cos(t),
    y: n + e * Math.sin(t)
  };
}
function Tn(e, t, a, n, o, s) {
  const { x: i, y: r, startAngle: l, pixelMargin: c, innerRadius: u } = t, f = Math.max(t.outerRadius + n + a - c, 0), m = u > 0 ? u + n + a + c : 0;
  let p = 0;
  const h = o - l;
  if (n) {
    const H = u > 0 ? u - n : 0, Q = f > 0 ? f - n : 0, le = (H + Q) / 2, fe = le !== 0 ? h * le / (le + n) : h;
    p = (h - fe) / 2;
  }
  const b = Math.max(1e-3, h * f - a / Oe) / f, v = (h - b) / 2, y = l + v + p, w = o - v - p, { outerStart: _, outerEnd: k, innerStart: C, innerEnd: S } = Pu(t, m, f, w - y), M = f - _, R = f - k, V = y + _ / M, W = w - k / R, D = m + C, I = m + S, B = y + C / D, j = w - S / I;
  if (e.beginPath(), s) {
    const H = (V + W) / 2;
    if (e.arc(i, r, f, V, H), e.arc(i, r, f, H, W), k > 0) {
      const G = va(R, W, i, r);
      e.arc(G.x, G.y, k, W, w + Qe);
    }
    const Q = va(I, w, i, r);
    if (e.lineTo(Q.x, Q.y), S > 0) {
      const G = va(I, j, i, r);
      e.arc(G.x, G.y, S, w + Qe, j + Math.PI);
    }
    const le = (w - S / m + (y + C / m)) / 2;
    if (e.arc(i, r, m, w - S / m, le, !0), e.arc(i, r, m, le, y + C / m, !0), C > 0) {
      const G = va(D, B, i, r);
      e.arc(G.x, G.y, C, B + Math.PI, y - Qe);
    }
    const fe = va(M, y, i, r);
    if (e.lineTo(fe.x, fe.y), _ > 0) {
      const G = va(M, V, i, r);
      e.arc(G.x, G.y, _, y - Qe, V);
    }
  } else {
    e.moveTo(i, r);
    const H = Math.cos(V) * f + i, Q = Math.sin(V) * f + r;
    e.lineTo(H, Q);
    const le = Math.cos(W) * f + i, fe = Math.sin(W) * f + r;
    e.lineTo(le, fe);
  }
  e.closePath();
}
function Iu(e, t, a, n, o) {
  const { fullCircles: s, startAngle: i, circumference: r } = t;
  let l = t.endAngle;
  if (s) {
    Tn(e, t, a, n, l, o);
    for (let c = 0; c < s; ++c)
      e.fill();
    isNaN(r) || (l = i + (r % Ue || Ue));
  }
  return Tn(e, t, a, n, l, o), e.fill(), l;
}
function Eu(e, t, a, n, o) {
  const { fullCircles: s, startAngle: i, circumference: r, options: l } = t, { borderWidth: c, borderJoinStyle: u, borderDash: f, borderDashOffset: m, borderRadius: p } = l, h = l.borderAlign === "inner";
  if (!c)
    return;
  e.setLineDash(f || []), e.lineDashOffset = m, h ? (e.lineWidth = c * 2, e.lineJoin = u || "round") : (e.lineWidth = c, e.lineJoin = u || "bevel");
  let b = t.endAngle;
  if (s) {
    Tn(e, t, a, n, b, o);
    for (let v = 0; v < s; ++v)
      e.stroke();
    isNaN(r) || (b = i + (r % Ue || Ue));
  }
  h && Lu(e, t, b), l.selfJoin && b - i >= Oe && p === 0 && u !== "miter" && Bu(e, t, b), s || (Tn(e, t, a, n, b, o), e.stroke());
}
class Fu extends Wt {
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
    ], n), { angle: s, distance: i } = Ti(o, {
      x: t,
      y: a
    }), { startAngle: r, endAngle: l, innerRadius: c, outerRadius: u, circumference: f } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], n), m = (this.options.spacing + this.options.borderWidth) / 2, p = De(f, l - r), h = qa(s, r, l) && r !== l, b = p >= Ue || h, v = qt(i, c + m, u + m);
    return b && v;
  }
  getCenterPoint(t) {
    const { x: a, y: n, startAngle: o, endAngle: s, innerRadius: i, outerRadius: r } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], t), { offset: l, spacing: c } = this.options, u = (o + s) / 2, f = (i + r + c + l) / 2;
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
    const r = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(r) * o, Math.sin(r) * o);
    const l = 1 - Math.sin(Math.min(Oe, n || 0)), c = o * l;
    t.fillStyle = a.backgroundColor, t.strokeStyle = a.borderColor, Iu(t, this, c, s, i), Eu(t, this, c, s, i), t.restore();
  }
}
function or(e, t, a = t) {
  e.lineCap = De(a.borderCapStyle, t.borderCapStyle), e.setLineDash(De(a.borderDash, t.borderDash)), e.lineDashOffset = De(a.borderDashOffset, t.borderDashOffset), e.lineJoin = De(a.borderJoinStyle, t.borderJoinStyle), e.lineWidth = De(a.borderWidth, t.borderWidth), e.strokeStyle = De(a.borderColor, t.borderColor);
}
function Ou(e, t, a) {
  e.lineTo(a.x, a.y);
}
function Vu(e) {
  return e.stepped ? ec : e.tension || e.cubicInterpolationMode === "monotone" ? tc : Ou;
}
function sr(e, t, a = {}) {
  const n = e.length, { start: o = 0, end: s = n - 1 } = a, { start: i, end: r } = t, l = Math.max(o, i), c = Math.min(s, r), u = o < i && s < i || o > r && s > r;
  return {
    count: n,
    start: l,
    loop: t.loop,
    ilen: c < l && !u ? n + c - l : c - l
  };
}
function zu(e, t, a, n) {
  const { points: o, options: s } = t, { count: i, start: r, loop: l, ilen: c } = sr(o, a, n), u = Vu(s);
  let { move: f = !0, reverse: m } = n || {}, p, h, b;
  for (p = 0; p <= c; ++p)
    h = o[(r + (m ? c - p : p)) % i], !h.skip && (f ? (e.moveTo(h.x, h.y), f = !1) : u(e, b, h, m, s.stepped), b = h);
  return l && (h = o[(r + (m ? c : 0)) % i], u(e, b, h, m, s.stepped)), !!l;
}
function Nu(e, t, a, n) {
  const o = t.points, { count: s, start: i, ilen: r } = sr(o, a, n), { move: l = !0, reverse: c } = n || {};
  let u = 0, f = 0, m, p, h, b, v, y;
  const w = (k) => (i + (c ? r - k : k)) % s, _ = () => {
    b !== v && (e.lineTo(u, v), e.lineTo(u, b), e.lineTo(u, y));
  };
  for (l && (p = o[w(0)], e.moveTo(p.x, p.y)), m = 0; m <= r; ++m) {
    if (p = o[w(m)], p.skip)
      continue;
    const k = p.x, C = p.y, S = k | 0;
    S === h ? (C < b ? b = C : C > v && (v = C), u = (f * u + k) / ++f) : (_(), e.lineTo(k, C), h = S, f = 0, b = v = C), y = C;
  }
  _();
}
function ro(e) {
  const t = e.options, a = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !a ? Nu : zu;
}
function ju(e) {
  return e.stepped ? Rc : e.tension || e.cubicInterpolationMode === "monotone" ? Pc : da;
}
function Hu(e, t, a, n) {
  let o = t._path;
  o || (o = t._path = new Path2D(), t.path(o, a, n) && o.closePath()), or(e, t.options), e.stroke(o);
}
function Wu(e, t, a, n) {
  const { segments: o, options: s } = t, i = ro(t);
  for (const r of o)
    or(e, s, r.style), e.beginPath(), i(e, t, r, {
      start: a,
      end: a + n - 1
    }) && e.closePath(), e.stroke();
}
const Ku = typeof Path2D == "function";
function Uu(e, t, a, n) {
  Ku && !t.options.segment ? Hu(e, t, a, n) : Wu(e, t, a, n);
}
class Yu extends Wt {
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
      $c(this._points, n, t, o, a), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = jc(this, this.options.segment));
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
    const n = this.options, o = t[a], s = this.points, i = Vc(this, {
      property: a,
      start: o,
      end: o
    });
    if (!i.length)
      return;
    const r = [], l = ju(n);
    let c, u;
    for (c = 0, u = i.length; c < u; ++c) {
      const { start: f, end: m } = i[c], p = s[f], h = s[m];
      if (p === h) {
        r.push(p);
        continue;
      }
      const b = Math.abs((o - p[a]) / (h[a] - p[a])), v = l(p, h, b, n.stepped);
      v[a] = t[a], r.push(v);
    }
    return r.length === 1 ? r[0] : r;
  }
  pathSegment(t, a, n) {
    return ro(this)(t, this, a, n);
  }
  path(t, a, n) {
    const o = this.segments, s = ro(this);
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
    (this.points || []).length && s.borderWidth && (t.save(), Uu(t, this, n, o), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function Os(e, t, a, n) {
  const o = e.options, { [a]: s } = e.getProps([
    a
  ], n);
  return Math.abs(t - s) < o.radius + o.hitRadius;
}
class qu extends Wt {
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
    return Os(this, t, "x", a);
  }
  inYRange(t, a) {
    return Os(this, t, "y", a);
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
    this.skip || n.radius < 0.1 || !Xa(this, a, this.size(n) / 2) || (t.strokeStyle = n.borderColor, t.lineWidth = n.borderWidth, t.fillStyle = n.backgroundColor, oo(t, n, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function ir(e, t) {
  const { x: a, y: n, base: o, width: s, height: i } = e.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let r, l, c, u, f;
  return e.horizontal ? (f = i / 2, r = Math.min(a, o), l = Math.max(a, o), c = n - f, u = n + f) : (f = s / 2, r = a - f, l = a + f, c = Math.min(n, o), u = Math.max(n, o)), {
    left: r,
    top: c,
    right: l,
    bottom: u
  };
}
function Gt(e, t, a, n) {
  return e ? 0 : st(t, a, n);
}
function Xu(e, t, a) {
  const n = e.options.borderWidth, o = e.borderSkipped, s = Fi(n);
  return {
    t: Gt(o.top, s.top, 0, a),
    r: Gt(o.right, s.right, 0, t),
    b: Gt(o.bottom, s.bottom, 0, a),
    l: Gt(o.left, s.left, 0, t)
  };
}
function Gu(e, t, a) {
  const { enableBorderRadius: n } = e.getProps([
    "enableBorderRadius"
  ]), o = e.options.borderRadius, s = _a(o), i = Math.min(t, a), r = e.borderSkipped, l = n || Le(o);
  return {
    topLeft: Gt(!l || r.top || r.left, s.topLeft, 0, i),
    topRight: Gt(!l || r.top || r.right, s.topRight, 0, i),
    bottomLeft: Gt(!l || r.bottom || r.left, s.bottomLeft, 0, i),
    bottomRight: Gt(!l || r.bottom || r.right, s.bottomRight, 0, i)
  };
}
function Zu(e) {
  const t = ir(e), a = t.right - t.left, n = t.bottom - t.top, o = Xu(e, a / 2, n / 2), s = Gu(e, a / 2, n / 2);
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
function Xn(e, t, a, n) {
  const o = t === null, s = a === null, r = e && !(o && s) && ir(e, n);
  return r && (o || qt(t, r.left, r.right)) && (s || qt(a, r.top, r.bottom));
}
function Qu(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function Ju(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function Gn(e, t, a = {}) {
  const n = e.x !== a.x ? -t : 0, o = e.y !== a.y ? -t : 0, s = (e.x + e.w !== a.x + a.w ? t : 0) - n, i = (e.y + e.h !== a.y + a.h ? t : 0) - o;
  return {
    x: e.x + n,
    y: e.y + o,
    w: e.w + s,
    h: e.h + i,
    radius: e.radius
  };
}
class eh extends Wt {
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
    const { inflateAmount: a, options: { borderColor: n, backgroundColor: o } } = this, { inner: s, outer: i } = Zu(this), r = Qu(i.radius) ? Mn : Ju;
    t.save(), (i.w !== s.w || i.h !== s.h) && (t.beginPath(), r(t, Gn(i, a, s)), t.clip(), r(t, Gn(s, -a, i)), t.fillStyle = n, t.fill("evenodd")), t.beginPath(), r(t, Gn(s, a)), t.fillStyle = o, t.fill(), t.restore();
  }
  inRange(t, a, n) {
    return Xn(this, t, a, n);
  }
  inXRange(t, a) {
    return Xn(this, t, null, a);
  }
  inYRange(t, a) {
    return Xn(this, null, t, a);
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
const Vs = (e, t) => {
  let { boxHeight: a = t, boxWidth: n = t } = e;
  return e.usePointStyle && (a = Math.min(a, t), n = e.pointStyleWidth || Math.min(n, t)), {
    boxWidth: n,
    boxHeight: a,
    itemHeight: Math.max(t, a)
  };
}, th = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class zs extends Wt {
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
    let a = Ne(t.generateLabels, [
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
    const n = t.labels, o = it(n.font), s = o.size, i = this._computeTitleHeight(), { boxWidth: r, itemHeight: l } = Vs(n, s);
    let c, u;
    a.font = o.string, this.isHorizontal() ? (c = this.maxWidth, u = this._fitRows(i, s, r, l) + 10) : (u = this.maxHeight, c = this._fitCols(i, o, r, l) + 10), this.width = Math.min(c, t.maxWidth || this.maxWidth), this.height = Math.min(u, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, a, n, o) {
    const { ctx: s, maxWidth: i, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], c = this.lineWidths = [
      0
    ], u = o + r;
    let f = t;
    s.textAlign = "left", s.textBaseline = "middle";
    let m = -1, p = -u;
    return this.legendItems.forEach((h, b) => {
      const v = n + a / 2 + s.measureText(h.text).width;
      (b === 0 || c[c.length - 1] + v + 2 * r > i) && (f += u, c[c.length - (b > 0 ? 0 : 1)] = 0, p += u, m++), l[b] = {
        left: 0,
        top: p,
        row: m,
        width: v,
        height: o
      }, c[c.length - 1] += v + r;
    }), f;
  }
  _fitCols(t, a, n, o) {
    const { ctx: s, maxHeight: i, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], c = this.columnSizes = [], u = i - t;
    let f = r, m = 0, p = 0, h = 0, b = 0;
    return this.legendItems.forEach((v, y) => {
      const { itemWidth: w, itemHeight: _ } = ah(n, a, s, v, o);
      y > 0 && p + _ + 2 * r > u && (f += m + r, c.push({
        width: m,
        height: p
      }), h += m + r, b++, m = p = 0), l[y] = {
        left: h,
        top: p,
        col: b,
        width: w,
        height: _
      }, m = Math.max(m, w), p += _ + r;
    }), f += m, c.push({
      width: m,
      height: p
    }), f;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: a, options: { align: n, labels: { padding: o }, rtl: s } } = this, i = wa(s, this.left, this.width);
    if (this.isHorizontal()) {
      let r = 0, l = tt(n, this.left + o, this.right - this.lineWidths[r]);
      for (const c of a)
        r !== c.row && (r = c.row, l = tt(n, this.left + o, this.right - this.lineWidths[r])), c.top += this.top + t + o, c.left = i.leftForLtr(i.x(l), c.width), l += c.width + o;
    } else {
      let r = 0, l = tt(n, this.top + t + o, this.bottom - this.columnSizes[r].height);
      for (const c of a)
        c.col !== r && (r = c.col, l = tt(n, this.top + t + o, this.bottom - this.columnSizes[r].height)), c.top = l, c.left += this.left + o, c.left = i.leftForLtr(i.x(c.left), c.width), l += c.height + o;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      ko(t, this), this._draw(), _o(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: a, lineWidths: n, ctx: o } = this, { align: s, labels: i } = t, r = Ye.color, l = wa(t.rtl, this.left, this.width), c = it(i.font), { padding: u } = i, f = c.size, m = f / 2;
    let p;
    this.drawTitle(), o.textAlign = l.textAlign("left"), o.textBaseline = "middle", o.lineWidth = 0.5, o.font = c.string;
    const { boxWidth: h, boxHeight: b, itemHeight: v } = Vs(i, f), y = function(S, M, R) {
      if (isNaN(h) || h <= 0 || isNaN(b) || b < 0)
        return;
      o.save();
      const V = De(R.lineWidth, 1);
      if (o.fillStyle = De(R.fillStyle, r), o.lineCap = De(R.lineCap, "butt"), o.lineDashOffset = De(R.lineDashOffset, 0), o.lineJoin = De(R.lineJoin, "miter"), o.lineWidth = V, o.strokeStyle = De(R.strokeStyle, r), o.setLineDash(De(R.lineDash, [])), i.usePointStyle) {
        const W = {
          radius: b * Math.SQRT2 / 2,
          pointStyle: R.pointStyle,
          rotation: R.rotation,
          borderWidth: V
        }, D = l.xPlus(S, h / 2), I = M + m;
        Ei(o, W, D, I, i.pointStyleWidth && h);
      } else {
        const W = M + Math.max((f - b) / 2, 0), D = l.leftForLtr(S, h), I = _a(R.borderRadius);
        o.beginPath(), Object.values(I).some((B) => B !== 0) ? Mn(o, {
          x: D,
          y: W,
          w: h,
          h: b,
          radius: I
        }) : o.rect(D, W, h, b), o.fill(), V !== 0 && o.stroke();
      }
      o.restore();
    }, w = function(S, M, R) {
      Ga(o, R.text, S, M + v / 2, c, {
        strikethrough: R.hidden,
        textAlign: l.textAlign(R.textAlign)
      });
    }, _ = this.isHorizontal(), k = this._computeTitleHeight();
    _ ? p = {
      x: tt(s, this.left + u, this.right - n[0]),
      y: this.top + u + k,
      line: 0
    } : p = {
      x: this.left + u,
      y: tt(s, this.top + k + u, this.bottom - a[0].height),
      line: 0
    }, Hi(this.ctx, t.textDirection);
    const C = v + u;
    this.legendItems.forEach((S, M) => {
      o.strokeStyle = S.fontColor, o.fillStyle = S.fontColor;
      const R = o.measureText(S.text).width, V = l.textAlign(S.textAlign || (S.textAlign = i.textAlign)), W = h + m + R;
      let D = p.x, I = p.y;
      l.setWidth(this.width), _ ? M > 0 && D + W + u > this.right && (I = p.y += C, p.line++, D = p.x = tt(s, this.left + u, this.right - n[p.line])) : M > 0 && I + C > this.bottom && (D = p.x = D + a[p.line].width + u, p.line++, I = p.y = tt(s, this.top + k + u, this.bottom - a[p.line].height));
      const B = l.x(D);
      if (y(B, I, S), D = Nl(V, D + h + m, _ ? D + W : this.right, t.rtl), w(l.x(D), I, S), _)
        p.x += W + u;
      else if (typeof S.text != "string") {
        const j = c.lineHeight;
        p.y += rr(S, j) + u;
      } else
        p.y += C;
    }), Wi(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, a = t.title, n = it(a.font), o = wt(a.padding);
    if (!a.display)
      return;
    const s = wa(t.rtl, this.left, this.width), i = this.ctx, r = a.position, l = n.size / 2, c = o.top + l;
    let u, f = this.left, m = this.width;
    if (this.isHorizontal())
      m = Math.max(...this.lineWidths), u = this.top + c, f = tt(t.align, f, this.right - m);
    else {
      const h = this.columnSizes.reduce((b, v) => Math.max(b, v.height), 0);
      u = c + tt(t.align, this.top, this.bottom - h - t.labels.padding - this._computeTitleHeight());
    }
    const p = tt(r, f, f + m);
    i.textAlign = s.textAlign(vo(r)), i.textBaseline = "middle", i.strokeStyle = a.color, i.fillStyle = a.color, i.font = n.string, Ga(i, a.text, p, u, n);
  }
  _computeTitleHeight() {
    const t = this.options.title, a = it(t.font), n = wt(t.padding);
    return t.display ? a.lineHeight + n.height : 0;
  }
  _getLegendItemAt(t, a) {
    let n, o, s;
    if (qt(t, this.left, this.right) && qt(a, this.top, this.bottom)) {
      for (s = this.legendHitBoxes, n = 0; n < s.length; ++n)
        if (o = s[n], qt(t, o.left, o.left + o.width) && qt(a, o.top, o.top + o.height))
          return this.legendItems[n];
    }
    return null;
  }
  handleEvent(t) {
    const a = this.options;
    if (!sh(t.type, a))
      return;
    const n = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const o = this._hoveredItem, s = th(o, n);
      o && !s && Ne(a.onLeave, [
        t,
        o,
        this
      ], this), this._hoveredItem = n, n && !s && Ne(a.onHover, [
        t,
        n,
        this
      ], this);
    } else n && Ne(a.onClick, [
      t,
      n,
      this
    ], this);
  }
}
function ah(e, t, a, n, o) {
  const s = nh(n, e, t, a), i = oh(o, n, t.lineHeight);
  return {
    itemWidth: s,
    itemHeight: i
  };
}
function nh(e, t, a, n) {
  let o = e.text;
  return o && typeof o != "string" && (o = o.reduce((s, i) => s.length > i.length ? s : i)), t + a.size / 2 + n.measureText(o).width;
}
function oh(e, t, a) {
  let n = e;
  return typeof t.text != "string" && (n = rr(t, a)), n;
}
function rr(e, t) {
  const a = e.text ? e.text.length : 0;
  return t * a;
}
function sh(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var To = {
  id: "legend",
  _element: zs,
  start(e, t, a) {
    const n = e.legend = new zs({
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
        const t = e.data.datasets, { labels: { usePointStyle: a, pointStyle: n, textAlign: o, color: s, useBorderRadius: i, borderRadius: r } } = e.legend.options;
        return e._getSortedDatasetMetas().map((l) => {
          const c = l.controller.getStyle(a ? 0 : void 0), u = wt(c.borderWidth);
          return {
            text: t[l.index].label,
            fillStyle: c.backgroundColor,
            fontColor: s,
            hidden: !l.visible,
            lineCap: c.borderCapStyle,
            lineDash: c.borderDash,
            lineDashOffset: c.borderDashOffset,
            lineJoin: c.borderJoinStyle,
            lineWidth: (u.width + u.height) / 4,
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
class lr extends Wt {
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
    const o = Ze(n.text) ? n.text.length : 1;
    this._padding = wt(n.padding);
    const s = o * it(n.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = s : this.width = s;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: a, left: n, bottom: o, right: s, options: i } = this, r = i.align;
    let l = 0, c, u, f;
    return this.isHorizontal() ? (u = tt(r, n, s), f = a + t, c = s - n) : (i.position === "left" ? (u = n + t, f = tt(r, o, a), l = Oe * -0.5) : (u = s - t, f = tt(r, a, o), l = Oe * 0.5), c = o - a), {
      titleX: u,
      titleY: f,
      maxWidth: c,
      rotation: l
    };
  }
  draw() {
    const t = this.ctx, a = this.options;
    if (!a.display)
      return;
    const n = it(a.font), s = n.lineHeight / 2 + this._padding.top, { titleX: i, titleY: r, maxWidth: l, rotation: c } = this._drawArgs(s);
    Ga(t, a.text, 0, 0, n, {
      color: a.color,
      maxWidth: l,
      rotation: c,
      textAlign: vo(a.align),
      textBaseline: "middle",
      translation: [
        i,
        r
      ]
    });
  }
}
function ih(e, t) {
  const a = new lr({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  xt.configure(e, a, t), xt.addBox(e, a), e.titleBlock = a;
}
var cr = {
  id: "title",
  _element: lr,
  start(e, t, a) {
    ih(e, a);
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
const Va = {
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
        const c = l.getCenterPoint(), u = ao(t, c);
        u < o && (o = u, r = l);
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
function Bt(e, t) {
  return t && (Ze(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function Ot(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function rh(e, t) {
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
function Ns(e, t) {
  const a = e.chart.ctx, { body: n, footer: o, title: s } = e, { boxWidth: i, boxHeight: r } = t, l = it(t.bodyFont), c = it(t.titleFont), u = it(t.footerFont), f = s.length, m = o.length, p = n.length, h = wt(t.padding);
  let b = h.height, v = 0, y = n.reduce((k, C) => k + C.before.length + C.lines.length + C.after.length, 0);
  if (y += e.beforeBody.length + e.afterBody.length, f && (b += f * c.lineHeight + (f - 1) * t.titleSpacing + t.titleMarginBottom), y) {
    const k = t.displayColors ? Math.max(r, l.lineHeight) : l.lineHeight;
    b += p * k + (y - p) * l.lineHeight + (y - 1) * t.bodySpacing;
  }
  m && (b += t.footerMarginTop + m * u.lineHeight + (m - 1) * t.footerSpacing);
  let w = 0;
  const _ = function(k) {
    v = Math.max(v, a.measureText(k).width + w);
  };
  return a.save(), a.font = c.string, Fe(e.title, _), a.font = l.string, Fe(e.beforeBody.concat(e.afterBody), _), w = t.displayColors ? i + 2 + t.boxPadding : 0, Fe(n, (k) => {
    Fe(k.before, _), Fe(k.lines, _), Fe(k.after, _);
  }), w = 0, a.font = u.string, Fe(e.footer, _), a.restore(), v += h.width, {
    width: v,
    height: b
  };
}
function lh(e, t) {
  const { y: a, height: n } = t;
  return a < n / 2 ? "top" : a > e.height - n / 2 ? "bottom" : "center";
}
function ch(e, t, a, n) {
  const { x: o, width: s } = n, i = a.caretSize + a.caretPadding;
  if (e === "left" && o + s + i > t.width || e === "right" && o - s - i < 0)
    return !0;
}
function dh(e, t, a, n) {
  const { x: o, width: s } = a, { width: i, chartArea: { left: r, right: l } } = e;
  let c = "center";
  return n === "center" ? c = o <= (r + l) / 2 ? "left" : "right" : o <= s / 2 ? c = "left" : o >= i - s / 2 && (c = "right"), ch(c, e, t, a) && (c = "center"), c;
}
function js(e, t, a) {
  const n = a.yAlign || t.yAlign || lh(e, a);
  return {
    xAlign: a.xAlign || t.xAlign || dh(e, t, a, n),
    yAlign: n
  };
}
function uh(e, t) {
  let { x: a, width: n } = e;
  return t === "right" ? a -= n : t === "center" && (a -= n / 2), a;
}
function hh(e, t, a) {
  let { y: n, height: o } = e;
  return t === "top" ? n += a : t === "bottom" ? n -= o + a : n -= o / 2, n;
}
function Hs(e, t, a, n) {
  const { caretSize: o, caretPadding: s, cornerRadius: i } = e, { xAlign: r, yAlign: l } = a, c = o + s, { topLeft: u, topRight: f, bottomLeft: m, bottomRight: p } = _a(i);
  let h = uh(t, r);
  const b = hh(t, l, c);
  return l === "center" ? r === "left" ? h += c : r === "right" && (h -= c) : r === "left" ? h -= Math.max(u, m) + o : r === "right" && (h += Math.max(f, p) + o), {
    x: st(h, 0, n.width - t.width),
    y: st(b, 0, n.height - t.height)
  };
}
function pn(e, t, a) {
  const n = wt(a.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - n.right : e.x + n.left;
}
function Ws(e) {
  return Bt([], Ot(e));
}
function fh(e, t, a) {
  return ma(e, {
    tooltip: t,
    tooltipItems: a,
    type: "tooltip"
  });
}
function Ks(e, t) {
  const a = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return a ? e.override(a) : e;
}
const dr = {
  beforeTitle: Et,
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
  afterTitle: Et,
  beforeBody: Et,
  beforeLabel: Et,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const a = e.formattedValue;
    return Ee(a) || (t += a), t;
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
  afterLabel: Et,
  afterBody: Et,
  beforeFooter: Et,
  footer: Et,
  afterFooter: Et
};
function dt(e, t, a, n) {
  const o = e[t].call(a, n);
  return typeof o > "u" ? dr[t].call(a, n) : o;
}
class Us extends Wt {
  static positioners = Va;
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
    const a = this.chart, n = this.options.setContext(this.getContext()), o = n.enabled && a.options.animation && n.animations, s = new Ui(this.chart, o);
    return o._cacheable && (this._cachedAnimations = Object.freeze(s)), s;
  }
  getContext() {
    return this.$context || (this.$context = fh(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, a) {
    const { callbacks: n } = a, o = dt(n, "beforeTitle", this, t), s = dt(n, "title", this, t), i = dt(n, "afterTitle", this, t);
    let r = [];
    return r = Bt(r, Ot(o)), r = Bt(r, Ot(s)), r = Bt(r, Ot(i)), r;
  }
  getBeforeBody(t, a) {
    return Ws(dt(a.callbacks, "beforeBody", this, t));
  }
  getBody(t, a) {
    const { callbacks: n } = a, o = [];
    return Fe(t, (s) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, r = Ks(n, s);
      Bt(i.before, Ot(dt(r, "beforeLabel", this, s))), Bt(i.lines, dt(r, "label", this, s)), Bt(i.after, Ot(dt(r, "afterLabel", this, s))), o.push(i);
    }), o;
  }
  getAfterBody(t, a) {
    return Ws(dt(a.callbacks, "afterBody", this, t));
  }
  getFooter(t, a) {
    const { callbacks: n } = a, o = dt(n, "beforeFooter", this, t), s = dt(n, "footer", this, t), i = dt(n, "afterFooter", this, t);
    let r = [];
    return r = Bt(r, Ot(o)), r = Bt(r, Ot(s)), r = Bt(r, Ot(i)), r;
  }
  _createItems(t) {
    const a = this._active, n = this.chart.data, o = [], s = [], i = [];
    let r = [], l, c;
    for (l = 0, c = a.length; l < c; ++l)
      r.push(rh(this.chart, a[l]));
    return t.filter && (r = r.filter((u, f, m) => t.filter(u, f, m, n))), t.itemSort && (r = r.sort((u, f) => t.itemSort(u, f, n))), Fe(r, (u) => {
      const f = Ks(t.callbacks, u);
      o.push(dt(f, "labelColor", this, u)), s.push(dt(f, "labelPointStyle", this, u)), i.push(dt(f, "labelTextColor", this, u));
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
      const r = Va[n.position].call(this, o, this._eventPosition);
      i = this._createItems(n), this.title = this.getTitle(i, n), this.beforeBody = this.getBeforeBody(i, n), this.body = this.getBody(i, n), this.afterBody = this.getAfterBody(i, n), this.footer = this.getFooter(i, n);
      const l = this._size = Ns(this, n), c = Object.assign({}, r, l), u = js(this.chart, n, c), f = Hs(n, c, u, this.chart);
      this.xAlign = u.xAlign, this.yAlign = u.yAlign, s = {
        opacity: 1,
        x: f.x,
        y: f.y,
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
    const { xAlign: o, yAlign: s } = this, { caretSize: i, cornerRadius: r } = n, { topLeft: l, topRight: c, bottomLeft: u, bottomRight: f } = _a(r), { x: m, y: p } = t, { width: h, height: b } = a;
    let v, y, w, _, k, C;
    return s === "center" ? (k = p + b / 2, o === "left" ? (v = m, y = v - i, _ = k + i, C = k - i) : (v = m + h, y = v + i, _ = k - i, C = k + i), w = v) : (o === "left" ? y = m + Math.max(l, u) + i : o === "right" ? y = m + h - Math.max(c, f) - i : y = this.caretX, s === "top" ? (_ = p, k = _ - i, v = y - i, w = y + i) : (_ = p + b, k = _ + i, v = y + i, w = y - i), C = _), {
      x1: v,
      x2: y,
      x3: w,
      y1: _,
      y2: k,
      y3: C
    };
  }
  drawTitle(t, a, n) {
    const o = this.title, s = o.length;
    let i, r, l;
    if (s) {
      const c = wa(n.rtl, this.x, this.width);
      for (t.x = pn(this, n.titleAlign, n), a.textAlign = c.textAlign(n.titleAlign), a.textBaseline = "middle", i = it(n.titleFont), r = n.titleSpacing, a.fillStyle = n.titleColor, a.font = i.string, l = 0; l < s; ++l)
        a.fillText(o[l], c.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + r, l + 1 === s && (t.y += n.titleMarginBottom - r);
    }
  }
  _drawColorBox(t, a, n, o, s) {
    const i = this.labelColors[n], r = this.labelPointStyles[n], { boxHeight: l, boxWidth: c } = s, u = it(s.bodyFont), f = pn(this, "left", s), m = o.x(f), p = l < u.lineHeight ? (u.lineHeight - l) / 2 : 0, h = a.y + p;
    if (s.usePointStyle) {
      const b = {
        radius: Math.min(c, l) / 2,
        pointStyle: r.pointStyle,
        rotation: r.rotation,
        borderWidth: 1
      }, v = o.leftForLtr(m, c) + c / 2, y = h + l / 2;
      t.strokeStyle = s.multiKeyBackground, t.fillStyle = s.multiKeyBackground, oo(t, b, v, y), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, oo(t, b, v, y);
    } else {
      t.lineWidth = Le(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const b = o.leftForLtr(m, c), v = o.leftForLtr(o.xPlus(m, 1), c - 2), y = _a(i.borderRadius);
      Object.values(y).some((w) => w !== 0) ? (t.beginPath(), t.fillStyle = s.multiKeyBackground, Mn(t, {
        x: b,
        y: h,
        w: c,
        h: l,
        radius: y
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), Mn(t, {
        x: v,
        y: h + 1,
        w: c - 2,
        h: l - 2,
        radius: y
      }), t.fill()) : (t.fillStyle = s.multiKeyBackground, t.fillRect(b, h, c, l), t.strokeRect(b, h, c, l), t.fillStyle = i.backgroundColor, t.fillRect(v, h + 1, c - 2, l - 2));
    }
    t.fillStyle = this.labelTextColors[n];
  }
  drawBody(t, a, n) {
    const { body: o } = this, { bodySpacing: s, bodyAlign: i, displayColors: r, boxHeight: l, boxWidth: c, boxPadding: u } = n, f = it(n.bodyFont);
    let m = f.lineHeight, p = 0;
    const h = wa(n.rtl, this.x, this.width), b = function(R) {
      a.fillText(R, h.x(t.x + p), t.y + m / 2), t.y += m + s;
    }, v = h.textAlign(i);
    let y, w, _, k, C, S, M;
    for (a.textAlign = i, a.textBaseline = "middle", a.font = f.string, t.x = pn(this, v, n), a.fillStyle = n.bodyColor, Fe(this.beforeBody, b), p = r && v !== "right" ? i === "center" ? c / 2 + u : c + 2 + u : 0, k = 0, S = o.length; k < S; ++k) {
      for (y = o[k], w = this.labelTextColors[k], a.fillStyle = w, Fe(y.before, b), _ = y.lines, r && _.length && (this._drawColorBox(a, t, k, h, n), m = Math.max(f.lineHeight, l)), C = 0, M = _.length; C < M; ++C)
        b(_[C]), m = f.lineHeight;
      Fe(y.after, b);
    }
    p = 0, m = f.lineHeight, Fe(this.afterBody, b), t.y -= s;
  }
  drawFooter(t, a, n) {
    const o = this.footer, s = o.length;
    let i, r;
    if (s) {
      const l = wa(n.rtl, this.x, this.width);
      for (t.x = pn(this, n.footerAlign, n), t.y += n.footerMarginTop, a.textAlign = l.textAlign(n.footerAlign), a.textBaseline = "middle", i = it(n.footerFont), a.fillStyle = n.footerColor, a.font = i.string, r = 0; r < s; ++r)
        a.fillText(o[r], l.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + n.footerSpacing;
    }
  }
  drawBackground(t, a, n, o) {
    const { xAlign: s, yAlign: i } = this, { x: r, y: l } = t, { width: c, height: u } = n, { topLeft: f, topRight: m, bottomLeft: p, bottomRight: h } = _a(o.cornerRadius);
    a.fillStyle = o.backgroundColor, a.strokeStyle = o.borderColor, a.lineWidth = o.borderWidth, a.beginPath(), a.moveTo(r + f, l), i === "top" && this.drawCaret(t, a, n, o), a.lineTo(r + c - m, l), a.quadraticCurveTo(r + c, l, r + c, l + m), i === "center" && s === "right" && this.drawCaret(t, a, n, o), a.lineTo(r + c, l + u - h), a.quadraticCurveTo(r + c, l + u, r + c - h, l + u), i === "bottom" && this.drawCaret(t, a, n, o), a.lineTo(r + p, l + u), a.quadraticCurveTo(r, l + u, r, l + u - p), i === "center" && s === "left" && this.drawCaret(t, a, n, o), a.lineTo(r, l + f), a.quadraticCurveTo(r, l, r + f, l), a.closePath(), a.fill(), o.borderWidth > 0 && a.stroke();
  }
  _updateAnimationTarget(t) {
    const a = this.chart, n = this.$animations, o = n && n.x, s = n && n.y;
    if (o || s) {
      const i = Va[t.position].call(this, this._active, this._eventPosition);
      if (!i)
        return;
      const r = this._size = Ns(this, t), l = Object.assign({}, i, this._size), c = js(a, t, l), u = Hs(t, l, c, a);
      (o._to !== u.x || s._to !== u.y) && (this.xAlign = c.xAlign, this.yAlign = c.yAlign, this.width = r.width, this.height = r.height, this.caretX = i.x, this.caretY = i.y, this._resolveAnimations().update(this, u));
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
    const i = wt(a.padding), r = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    a.enabled && r && (t.save(), t.globalAlpha = n, this.drawBackground(s, t, o, a), Hi(t, a.textDirection), s.y += i.top, this.drawTitle(s, t, a), this.drawBody(s, t, a), this.drawFooter(s, t, a), Wi(t, a.textDirection), t.restore());
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
    }), s = !Cn(n, o), i = this._positionChanged(o, a);
    (s || i) && (this._active = o, this._eventPosition = a, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, a, n = !0) {
    if (a && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const o = this.options, s = this._active || [], i = this._getActiveElements(t, s, a, n), r = this._positionChanged(i, t), l = a || !Cn(i, s) || r;
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
    const { caretX: n, caretY: o, options: s } = this, i = Va[s.position].call(this, t, a);
    return i !== !1 && (n !== i.x || o !== i.y);
  }
}
var Bo = {
  id: "tooltip",
  _element: Us,
  positioners: Va,
  afterInit(e, t, a) {
    a && (e.tooltip = new Us({
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
    callbacks: dr
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
const gh = (e, t, a, n) => (typeof t == "string" ? (a = e.push(t) - 1, n.unshift({
  index: a,
  label: t
})) : isNaN(t) && (a = null), a);
function mh(e, t, a, n) {
  const o = e.indexOf(t);
  if (o === -1)
    return gh(e, t, a, n);
  const s = e.lastIndexOf(t);
  return o !== s ? a : o;
}
const ph = (e, t) => e === null ? null : st(Math.round(e), 0, t);
function Ys(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class ur extends Da {
  static id = "category";
  static defaults = {
    ticks: {
      callback: Ys
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
    if (Ee(t))
      return null;
    const n = this.getLabels();
    return a = isFinite(a) && n[a] === t ? a : mh(n, t, De(a, t), this._addedLabels), ph(a, n.length - 1);
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
    return Ys.call(this, t);
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
function bh(e, t) {
  const a = [], { bounds: o, step: s, min: i, max: r, precision: l, count: c, maxTicks: u, maxDigits: f, includeBounds: m } = e, p = s || 1, h = u - 1, { min: b, max: v } = t, y = !Ee(i), w = !Ee(r), _ = !Ee(c), k = (v - b) / (f + 1);
  let C = qo((v - b) / h / p) * p, S, M, R, V;
  if (C < 1e-14 && !y && !w)
    return [
      {
        value: b
      },
      {
        value: v
      }
    ];
  V = Math.ceil(v / C) - Math.floor(b / C), V > h && (C = qo(V * C / h / p) * p), Ee(l) || (S = Math.pow(10, l), C = Math.ceil(C * S) / S), o === "ticks" ? (M = Math.floor(b / C) * C, R = Math.ceil(v / C) * C) : (M = b, R = v), y && w && s && Ll((r - i) / s, C / 1e3) ? (V = Math.round(Math.min((r - i) / C, u)), C = (r - i) / V, M = i, R = r) : _ ? (M = y ? i : M, R = w ? r : R, V = c - 1, C = (R - M) / V) : (V = (R - M) / C, Na(V, Math.round(V), C / 1e3) ? V = Math.round(V) : V = Math.ceil(V));
  const W = Math.max(Xo(C), Xo(M));
  S = Math.pow(10, Ee(l) ? W : l), M = Math.round(M * S) / S, R = Math.round(R * S) / S;
  let D = 0;
  for (y && (m && M !== i ? (a.push({
    value: i
  }), M < i && D++, Na(Math.round((M + D * C) * S) / S, i, qs(i, k, e)) && D++) : M < i && D++); D < V; ++D) {
    const I = Math.round((M + D * C) * S) / S;
    if (w && I > r)
      break;
    a.push({
      value: I
    });
  }
  return w && m && R !== r ? a.length && Na(a[a.length - 1].value, r, qs(r, k, e)) ? a[a.length - 1].value = r : a.push({
    value: r
  }) : (!w || R === r) && a.push({
    value: R
  }), a;
}
function qs(e, t, { horizontal: a, minRotation: n }) {
  const o = zt(n), s = (a ? Math.sin(o) : Math.cos(o)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / s, i);
}
class vh extends Da {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, a) {
    return Ee(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: a, maxDefined: n } = this.getUserBounds();
    let { min: o, max: s } = this;
    const i = (l) => o = a ? o : l, r = (l) => s = n ? s : l;
    if (t) {
      const l = Pt(o), c = Pt(s);
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
    }, s = this._range || this, i = bh(o, s);
    return t.bounds === "ticks" && Rl(i, this, "value"), t.reverse ? (i.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), i;
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
    return xo(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class hr extends vh {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: Ii.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: a } = this.getMinMax(!0);
    this.min = _t(t) ? t : 0, this.max = _t(a) ? a : 1, this.handleTickRangeOptions();
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
const En = {
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
}, ht = /* @__PURE__ */ Object.keys(En);
function Xs(e, t) {
  return e - t;
}
function Gs(e, t) {
  if (Ee(t))
    return null;
  const a = e._adapter, { parser: n, round: o, isoWeekday: s } = e._parseOpts;
  let i = t;
  return typeof n == "function" && (i = n(i)), _t(i) || (i = typeof n == "string" ? a.parse(i, n) : a.parse(i)), i === null ? null : (o && (i = o === "week" && (Ya(s) || s === !0) ? a.startOf(i, "isoWeek", s) : a.startOf(i, o)), +i);
}
function Zs(e, t, a, n) {
  const o = ht.length;
  for (let s = ht.indexOf(e); s < o - 1; ++s) {
    const i = En[ht[s]], r = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((a - t) / (r * i.size)) <= n)
      return ht[s];
  }
  return ht[o - 1];
}
function yh(e, t, a, n, o) {
  for (let s = ht.length - 1; s >= ht.indexOf(a); s--) {
    const i = ht[s];
    if (En[i].common && e._adapter.diff(o, n, i) >= t - 1)
      return i;
  }
  return ht[a ? ht.indexOf(a) : 0];
}
function xh(e) {
  for (let t = ht.indexOf(e) + 1, a = ht.length; t < a; ++t)
    if (En[ht[t]].common)
      return ht[t];
}
function Qs(e, t, a) {
  if (!a)
    e[t] = !0;
  else if (a.length) {
    const { lo: n, hi: o } = bo(a, t), s = a[n] >= t ? a[n] : a[o];
    e[s] = !0;
  }
}
function kh(e, t, a, n) {
  const o = e._adapter, s = +o.startOf(t[0].value, n), i = t[t.length - 1].value;
  let r, l;
  for (r = s; r <= i; r = +o.add(r, 1, n))
    l = a[r], l >= 0 && (t[l].major = !0);
  return t;
}
function Js(e, t, a) {
  const n = [], o = {}, s = t.length;
  let i, r;
  for (i = 0; i < s; ++i)
    r = t[i], o[r] = i, n.push({
      value: r,
      major: !1
    });
  return s === 0 || !a ? n : kh(e, n, o, a);
}
class ei extends Da {
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
    const n = t.time || (t.time = {}), o = this._adapter = new _d._date(t.adapters.date);
    o.init(a), za(n.displayFormats, o.formats()), this._parseOpts = {
      parser: n.parser,
      round: n.round,
      isoWeekday: n.isoWeekday
    }, super.init(t), this._normalized = a.normalized;
  }
  parse(t, a) {
    return t === void 0 ? null : Gs(this, t);
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
    (!i || !r) && (l(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && l(this.getMinMax(!1))), o = _t(o) && !isNaN(o) ? o : +a.startOf(Date.now(), n), s = _t(s) && !isNaN(s) ? s : +a.endOf(Date.now(), n) + 1, this.min = Math.min(o, s - 1), this.max = Math.max(o + 1, s);
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
    const s = this.min, i = this.max, r = Ol(o, s, i);
    return this._unit = a.unit || (n.autoSkip ? Zs(a.minUnit, this.min, this.max, this._getLabelCapacity(s)) : yh(this, r.length, a.minUnit, this.min, this.max)), this._majorUnit = !n.major.enabled || this._unit === "year" ? void 0 : xh(this._unit), this.initOffsets(o), t.reverse && r.reverse(), Js(this, r, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let a = 0, n = 0, o, s;
    this.options.offset && t.length && (o = this.getDecimalForValue(t[0]), t.length === 1 ? a = 1 - o : a = (this.getDecimalForValue(t[1]) - o) / 2, s = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? n = s : n = (s - this.getDecimalForValue(t[t.length - 2])) / 2);
    const i = t.length < 3 ? 0.5 : 0.25;
    a = st(a, 0, i), n = st(n, 0, i), this._offsets = {
      start: a,
      end: n,
      factor: 1 / (a + 1 + n)
    };
  }
  _generate() {
    const t = this._adapter, a = this.min, n = this.max, o = this.options, s = o.time, i = s.unit || Zs(s.minUnit, a, n, this._getLabelCapacity(a)), r = De(o.ticks.stepSize, 1), l = i === "week" ? s.isoWeekday : !1, c = Ya(l) || l === !0, u = {};
    let f = a, m, p;
    if (c && (f = +t.startOf(f, "isoWeek", l)), f = +t.startOf(f, c ? "day" : i), t.diff(n, a, i) > 1e5 * r)
      throw new Error(a + " and " + n + " are too far apart with stepSize of " + r + " " + i);
    const h = o.ticks.source === "data" && this.getDataTimestamps();
    for (m = f, p = 0; m < n; m = +t.add(m, r, i), p++)
      Qs(u, m, h);
    return (m === n || o.bounds === "ticks" || p === 1) && Qs(u, m, h), Object.keys(u).sort(Xs).map((b) => +b);
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
      return Ne(i, [
        t,
        a,
        n
      ], this);
    const r = s.time.displayFormats, l = this._unit, c = this._majorUnit, u = l && r[l], f = c && r[c], m = n[a], p = c && f && m && m.major;
    return this._adapter.format(t, o || (p ? f : u));
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
    const a = this.options.ticks, n = this.ctx.measureText(t).width, o = zt(this.isHorizontal() ? a.maxRotation : a.minRotation), s = Math.cos(o), i = Math.sin(o), r = this._resolveTickFontOptions(0).size;
    return {
      w: n * s + r * i,
      h: n * i + r * s
    };
  }
  _getLabelCapacity(t) {
    const a = this.options.time, n = a.displayFormats, o = n[a.unit] || n.millisecond, s = this._tickFormatFunction(t, 0, Js(this, [
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
      t.push(Gs(this, o[a]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return Li(t.sort(Xs));
  }
}
function bn(e, t, a) {
  let n = 0, o = e.length - 1, s, i, r, l;
  a ? (t >= e[n].pos && t <= e[o].pos && ({ lo: n, hi: o } = ua(e, "pos", t)), { pos: s, time: r } = e[n], { pos: i, time: l } = e[o]) : (t >= e[n].time && t <= e[o].time && ({ lo: n, hi: o } = ua(e, "time", t)), { time: s, pos: r } = e[n], { time: i, pos: l } = e[o]);
  const c = i - s;
  return c ? r + (l - r) * (t - s) / c : r;
}
class N3 extends ei {
  static id = "timeseries";
  static defaults = ei.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), a = this._table = this.buildLookupTable(t);
    this._minPos = bn(a, this.min), this._tableRange = bn(a, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: a, max: n } = this, o = [], s = [];
    let i, r, l, c, u;
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
      u = o[i + 1], l = o[i - 1], c = o[i], Math.round((u + l) / 2) !== c && s.push({
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
    return (bn(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const a = this._offsets, n = this.getDecimalForPixel(t) / a.factor - a.end;
    return bn(this._table, n * this._tableRange + this._minPos, !0);
  }
}
const fr = {
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
}, _h = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
}, wh = {
  type: {
    type: String,
    required: !0
  },
  destroyDelay: {
    type: Number,
    default: 0
    // No delay by default
  },
  ...fr,
  ..._h
}, Ch = Ur[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function ya(e) {
  return ki(e) ? Jn(e) : e;
}
function $h(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return ki(t) ? new Proxy(e, {}) : e;
}
function Sh(e, t) {
  const a = e.options;
  a && t && Object.assign(a, t);
}
function gr(e, t) {
  e.labels = t;
}
function mr(e, t, a) {
  const n = [];
  e.datasets = t.map((o) => {
    const s = e.datasets.find((i) => i[a] === o[a]);
    return !s || !o.data || n.includes(s) ? {
      ...o
    } : (n.push(s), Object.assign(s, o), s);
  });
}
function Mh(e, t) {
  const a = {
    labels: [],
    datasets: []
  };
  return gr(a, e.labels), mr(a, e.datasets, t), a;
}
const Dh = he({
  props: wh,
  setup(e, t) {
    let { expose: a, slots: n } = t;
    const o = ne(null), s = xi(null);
    a({
      chart: s
    });
    const i = () => {
      if (!o.value) return;
      const { type: c, data: u, options: f, plugins: m, datasetIdKey: p } = e, h = Mh(u, p), b = $h(h, u);
      s.value = new ea(o.value, {
        type: c,
        data: b,
        options: {
          ...f
        },
        plugins: m
      });
    }, r = () => {
      const c = Jn(s.value);
      c && (e.destroyDelay > 0 ? setTimeout(() => {
        c.destroy(), s.value = null;
      }, e.destroyDelay) : (c.destroy(), s.value = null));
    }, l = (c) => {
      c.update(e.updateMode);
    };
    return Je(i), rt(r), Te([
      () => e.options,
      () => e.data
    ], (c, u) => {
      let [f, m] = c, [p, h] = u;
      const b = Jn(s.value);
      if (!b)
        return;
      let v = !1;
      if (f) {
        const y = ya(f), w = ya(p);
        y && y !== w && (Sh(b, y), v = !0);
      }
      if (m) {
        const y = ya(m.labels), w = ya(h.labels), _ = ya(m.datasets), k = ya(h.datasets);
        y !== w && (gr(b.config.data, y), v = !0), _ && _ !== k && (mr(b.config.data, _, e.datasetIdKey), v = !0);
      }
      v && Ke(() => {
        l(b);
      });
    }, {
      deep: !0
    }), () => je("canvas", {
      role: "img",
      "aria-label": e.ariaLabel,
      "aria-describedby": e.ariaDescribedby,
      ref: o
    }, [
      je("p", {}, [
        n.default ? n.default() : ""
      ])
    ]);
  }
});
function Lo(e, t) {
  return ea.register(t), he({
    props: fr,
    setup(a, n) {
      let { expose: o } = n;
      const s = xi(null), i = (r) => {
        s.value = r?.chart;
      };
      return o({
        chart: s
      }), () => je(Dh, Ch({
        ref: i
      }, {
        type: e,
        ...a
      }));
    }
  });
}
const Ah = /* @__PURE__ */ Lo("bar", bd), Th = /* @__PURE__ */ Lo("line", xd), Bh = /* @__PURE__ */ Lo("pie", kd), ti = {
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
}, ai = {
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
}, Lh = [
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
  const n = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", o = $(() => e?.value ? e.value : t.value), s = $(() => o.value === "dark"), i = $(() => s.value ? ai : ti), r = () => {
    typeof document > "u" || (t.value = n(), a = new MutationObserver((c) => {
      for (const u of c)
        u.attributeName === "class" && (t.value = n());
    }), a.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["class"]
    }));
  }, l = () => {
    a && (a.disconnect(), a = null);
  };
  return Je(() => {
    r();
  }), rt(() => {
    l();
  }), e && Te(e, () => {
  }), {
    isDark: s,
    currentTheme: o,
    colors: i,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: ti,
    darkColors: ai,
    chartSeriesColors: Lh
  };
}
const Qa = 5, Ro = 8, Rh = /^x\d*$/, Ph = /^y\d*$/;
function pr(e) {
  if (!e || typeof e != "object") return e;
  const t = { ...e }, a = t.scales;
  if (!a || typeof a != "object") return t;
  const n = { ...a };
  for (const o of Object.keys(n)) {
    const s = n[o];
    if (!s || typeof s != "object") continue;
    const i = { ...s }, r = i.ticks, l = r && typeof r == "object" ? { ...r } : {};
    if (Rh.test(o) && (l.maxTicksLimit = Ro, l.autoSkip = !0, l.minRotation = 0, l.maxRotation = 0, l.autoSkipPadding = l.autoSkipPadding ?? 8), Ph.test(o)) {
      if (i.type === "category") {
        i.ticks = l, n[o] = i;
        continue;
      }
      if (Array.isArray(l.values) && l.values.length > 0)
        l.maxTicksLimit = l.values.length;
      else if (l.stepSize != null) {
        const c = Number(i.min ?? i.suggestedMin ?? 0), u = Number(i.max ?? i.suggestedMax ?? 0), f = Number(l.stepSize);
        u > c && f > 0 ? l.maxTicksLimit = Math.floor((u - c) / f) + 1 : l.maxTicksLimit = Qa;
      } else
        l.maxTicksLimit = Qa;
    }
    i.ticks = l, n[o] = i;
  }
  return t.scales = n, t;
}
const ut = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Ih = ["titleFont", "bodyFont", "footerFont"];
function br(e, t = ut) {
  if (!e || typeof e != "object") return e;
  const a = { ...e }, n = typeof a.font == "object" && a.font !== null ? a.font : {};
  if (a.font = { ...n, family: t }, a.scales && typeof a.scales == "object") {
    const o = { ...a.scales };
    for (const s of Object.keys(o)) {
      const i = o[s];
      if (!i || typeof i != "object") continue;
      const r = { ...i }, l = r.ticks;
      if (l && typeof l == "object") {
        const u = { ...l }, f = typeof u.font == "object" && u.font !== null ? u.font : {};
        u.font = { ...f, family: t }, r.ticks = u;
      }
      const c = r.title;
      if (c && typeof c == "object") {
        const u = { ...c }, f = typeof u.font == "object" && u.font !== null ? u.font : {};
        u.font = { ...f, family: t }, r.title = u;
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
        const c = { ...l }, u = typeof c.font == "object" && c.font !== null ? c.font : {};
        c.font = { ...u, family: t }, r.labels = c;
      }
      o.legend = r;
    }
    const i = o.tooltip;
    if (i && typeof i == "object") {
      const r = { ...i };
      for (const l of Ih) {
        const c = r[l];
        c && typeof c == "object" && (r[l] = { ...c, family: t });
      }
      o.tooltip = r;
    }
    a.plugins = o;
  }
  return a;
}
const ni = 10, Eh = /* @__PURE__ */ he({
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
    ea.register(ur, hr, eh, cr, Bo, To), ea.defaults.font.family = ut;
    const { isDark: n, colors: o } = Me($e(a, "theme")), s = $(() => a.data), i = (m) => typeof m == "string" ? m.charAt(0).toUpperCase() + m.slice(1).toLowerCase() : m, r = (m) => typeof m != "string" ? m : a.uppercaseLegendLabels ? m.toUpperCase() : i(m), l = (m, p) => m.length <= p ? m : `${m.slice(0, Math.max(1, p - 1))}…`;
    function c(m, p) {
      if (p == null) return m;
      if (Array.isArray(p) || typeof p != "object" || m == null || Array.isArray(m) || typeof m != "object") return p;
      const h = { ...m };
      for (const b of Object.keys(p)) {
        const v = p[b];
        v !== void 0 && (h[b] = c(m[b], v));
      }
      return h;
    }
    const u = $(() => {
      const m = {
        font: {
          family: ut
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
                family: ut,
                size: 13,
                weight: "500"
              },
              padding: 12,
              boxWidth: ni,
              boxHeight: ni,
              usePointStyle: !1,
              generateLabels: function(h) {
                return h.data.datasets.map((v, y) => {
                  const w = Array.isArray(v.backgroundColor) ? v.backgroundColor[0] : v.backgroundColor, _ = Array.isArray(v.borderColor) ? v.borderColor[0] : v.borderColor, k = typeof _ == "string" && _.length > 0 ? _ : typeof w == "string" && w.length > 0 ? w : o.value.textSecondary;
                  return {
                    text: r(v.label || ""),
                    fillStyle: typeof w == "string" ? w : k,
                    strokeStyle: k,
                    lineWidth: 0,
                    fontColor: k,
                    hidden: !h.isDatasetVisible(y),
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
              family: ut,
              size: 13,
              weight: "600"
            },
            bodyFont: {
              family: ut,
              size: 12,
              weight: "500"
            },
            boxPadding: 6,
            callbacks: {
              title: function(h) {
                return h.length > 0 ? String(i(h[0].label)) : "";
              },
              label: function(h) {
                let b = String(i(h.dataset.label || ""));
                b && (b += ": ");
                const y = (h.chart?.options?.indexAxis ?? "x") === "y" ? h.parsed.x : h.parsed.y;
                return y != null && (b += y), b;
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
              maxTicksLimit: Qa,
              font: {
                family: ut,
                size: 12,
                weight: "500"
              },
              color: o.value.textSecondary,
              padding: 8,
              callback: function(h) {
                return i(h);
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
              maxTicksLimit: Ro,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: ut,
                size: 12,
                weight: "500"
              },
              color: o.value.textSecondary,
              padding: 8,
              callback: function(h) {
                const b = this.getLabelForValue(h);
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
      }, p = a.options ? c(m, a.options) : m;
      if (p.indexAxis === "y") {
        p.scales = p.scales ?? {}, p.scales.x = {
          type: "linear",
          beginAtZero: !0,
          ...p.scales.x
        };
        const { beginAtZero: h, ticks: b, ...v } = p.scales.y ?? {}, y = a.data.labels?.length ?? 0, w = a.categoryLabelMaxLength ?? 20;
        p.scales.y = {
          type: "category",
          ...v,
          ticks: {
            ...b,
            autoSkip: !1,
            maxTicksLimit: y > 0 ? y : Qa,
            callback: function(_) {
              const k = this.getLabelForValue(_), C = typeof k == "string" ? k : String(k ?? "");
              return l(C, w);
            }
          }
        };
      }
      return br(
        pr(p)
      );
    }), f = $(() => a.heightPx ?? 230);
    return t({ isDark: n }), (m, p) => (g(), x("div", {
      class: "relative w-full shrink-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]",
      style: Ce({ height: `${f.value}px` })
    }, [
      N(T(Ah), {
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
}, Mt = /* @__PURE__ */ be(Eh, [["__scopeId", "data-v-1d64fb88"]]), Fh = { class: "chart-line-root flex h-full min-h-[230px] w-full shrink-0 flex-col bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] min-w-0" }, Oh = { class: "chart-line-canvas-host relative min-h-0 w-full flex-1" }, Vh = {
  key: 0,
  class: "chart-line-indicators mt-0 flex shrink-0 list-none flex-nowrap items-center justify-center gap-x-4 overflow-x-auto overflow-y-hidden px-1 pb-0.5 pt-0.5",
  role: "list"
}, zh = ["aria-pressed", "aria-label", "onClick"], Nh = {
  class: "inline-flex shrink-0 items-center",
  "aria-hidden": "true"
}, jh = /* @__PURE__ */ he({
  __name: "ChartLine",
  props: {
    data: {},
    options: {},
    uppercaseLegendLabels: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const a = e;
    ea.register(
      ur,
      hr,
      qu,
      Yu,
      cr,
      Bo,
      To
    ), ea.defaults.font.family = ut;
    const n = ne(null), { isDark: o, colors: s } = Me($e(a, "theme")), i = $(() => s.value.bgCard), r = $(() => {
      const v = i.value;
      return {
        labels: a.data.labels,
        datasets: a.data.datasets.map((y) => {
          const w = y.borderColor, _ = Array.isArray(w) ? w[0] : w, k = typeof _ == "string" && _.length > 0 ? _ : s.value.textSecondary, C = y.pointBackgroundColor !== void 0 ? y.pointBackgroundColor : v, S = y.pointHoverBackgroundColor !== void 0 ? y.pointHoverBackgroundColor : C, M = y.pointBorderWidth ?? 2, R = y.pointHoverBorderWidth ?? M;
          return {
            ...y,
            fill: y.fill ?? !1,
            clip: y.clip ?? !1,
            pointBackgroundColor: C,
            pointHoverBackgroundColor: S,
            pointBorderColor: y.pointBorderColor ?? k,
            pointHoverBorderColor: y.pointHoverBorderColor ?? k,
            pointBorderWidth: M,
            pointHoverBorderWidth: R
          };
        })
      };
    }), l = (v) => typeof v == "string" ? v.charAt(0).toUpperCase() + v.slice(1).toLowerCase() : v, c = (v) => typeof v != "string" ? v : a.uppercaseLegendLabels ? v.toUpperCase() : l(v);
    function u(v) {
      const y = v.borderColor, w = Array.isArray(y) ? y[0] : y;
      return typeof w == "string" && w.length > 0 ? w : s.value.textSecondary;
    }
    const f = $(
      () => r.value.datasets.map((v, y) => ({
        key: `${v.label ?? "dataset"}-${y}`,
        label: c(v.label || ""),
        color: u(v)
      }))
    ), m = ne([]);
    Te(
      () => r.value.datasets.length,
      (v) => {
        const y = Array.from({ length: v }, (w, _) => m.value[_] ?? !0);
        m.value = y;
      },
      { immediate: !0 }
    );
    function p(v) {
      const w = n.value?.chart;
      if (!w || v < 0 || v >= w.data.datasets.length) return;
      const _ = !w.isDatasetVisible(v);
      w.setDatasetVisibility(v, _), m.value[v] = _, w.update();
    }
    function h(v, y) {
      if (y == null) return v;
      if (Array.isArray(y) || typeof y != "object" || v == null || Array.isArray(v) || typeof v != "object") return y;
      const w = { ...v };
      for (const _ of Object.keys(y)) {
        const k = y[_];
        k !== void 0 && (w[_] = h(v[_], k));
      }
      return w;
    }
    const b = $(() => {
      const v = {
        font: {
          family: ut
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
              family: ut,
              size: 14,
              weight: "600"
            },
            bodyFont: {
              family: ut,
              size: 13
            },
            callbacks: {
              title: function(_) {
                return _.length > 0 ? String(l(_[0].label)) : "";
              },
              label: function(_) {
                let k = String(l(_.dataset.label || ""));
                return k && (k += ": "), _.parsed.y !== null && (k += _.parsed.y), k;
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
              maxTicksLimit: Ro,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: ut,
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
              maxTicksLimit: Qa,
              font: {
                family: ut,
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
      }, y = a.options ? h(v, a.options) : v;
      return br(
        pr(y)
      );
    });
    return t({ isDark: o }), (v, y) => (g(), x("div", Fh, [
      d("div", Oh, [
        N(T(Th), {
          ref_key: "lineChartRef",
          ref: n,
          data: r.value,
          options: b.value
        }, null, 8, ["data", "options"])
      ]),
      f.value.length > 0 ? (g(), x("ul", Vh, [
        (g(!0), x(ue, null, pe(f.value, (w, _) => (g(), x("li", {
          key: w.key,
          role: "listitem"
        }, [
          d("button", {
            type: "button",
            class: Z(["inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[11px] font-medium leading-snug transition-opacity outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-secondary)] dark:focus-visible:ring-offset-[#1a1a1d]", m.value[_] !== !1 ? "opacity-100" : "opacity-45 line-through"]),
            style: Ce({ color: w.color }),
            "aria-pressed": m.value[_] !== !1,
            "aria-label": `${w.label}. ${m.value[_] !== !1 ? "Visible" : "Oculta"}. Pulsa para alternar.`,
            onClick: (k) => p(_)
          }, [
            d("span", Nh, [
              y[0] || (y[0] = d("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1)),
              d("span", {
                class: "relative z-[1] box-border size-2 shrink-0 rounded-full border-2 bg-transparent",
                style: Ce({ borderColor: w.color })
              }, null, 4),
              y[1] || (y[1] = d("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1))
            ]),
            d("span", null, A(w.label), 1)
          ], 14, zh)
        ]))), 128))
      ])) : F("", !0)
    ]));
  }
}), bt = /* @__PURE__ */ be(jh, [["__scopeId", "data-v-426e23d5"]]), Hh = { class: "chart-container" }, Wh = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Kh = /* @__PURE__ */ he({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const a = e;
    ea.register(Fu, Bo, To);
    const { isDark: n, colors: o } = Me($e(a, "theme")), s = a.data, i = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = $(() => a.options ? a.options : {
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
              family: Wh,
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
              return c.labels.length && c.datasets.length ? c.labels.map((u, f) => {
                const p = l.getDatasetMeta(0).controller.getStyle(f), b = c.datasets[0].data[f], v = typeof p.backgroundColor == "string" && p.backgroundColor.length > 0 ? p.backgroundColor : o.value.textSecondary;
                return {
                  text: `${i(u)}: ${b}`,
                  fillStyle: p.backgroundColor,
                  strokeStyle: p.borderColor,
                  lineWidth: p.borderWidth,
                  lineDash: p.borderDash,
                  lineDashOffset: p.borderDashOffset,
                  lineJoin: p.borderJoinStyle,
                  fontColor: v,
                  hidden: !l.getDataVisibility(f),
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
            title: function(l) {
              return l.length > 0 ? String(i(l[0].label)) : "";
            },
            label: function(l) {
              const c = l.label || "", u = l.parsed || 0, f = l.dataset.data.reduce((p, h) => p + h, 0), m = (u / f * 100).toFixed(1);
              return `${i(c)}: ${u} (${m}%)`;
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
    return t({ isDark: n }), (l, c) => (g(), x("div", Hh, [
      N(T(Bh), {
        data: T(s),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), Fn = /* @__PURE__ */ be(Kh, [["__scopeId", "data-v-0f7806d6"]]), Uh = { class: "chart-container" }, Yh = ["viewBox"], qh = ["transform"], Xh = ["x", "width", "fill", "stroke"], Gh = ["fill"], Zh = ["x1", "y1", "x2", "y2", "stroke"], Qh = ["points", "fill"], Jh = ["x1", "y1", "x2", "y2", "stroke"], ef = ["x", "y", "fill"], tf = ["x1", "y1", "x2", "y2", "stroke"], af = ["points", "fill"], nf = ["transform"], of = ["y1", "y2"], sf = ["y1", "y2"], rf = ["y1", "y2"], lf = ["y1", "y2"], cf = ["y", "height"], df = ["y1", "y2"], uf = ["y1", "y2"], hf = ["y1", "y2"], ff = ["y1", "y2"], gf = ["y", "height"], mf = ["cy", "stroke", "onMouseenter"], pf = ["cy", "stroke", "onMouseenter"], bf = ["cy", "stroke", "onMouseenter"], vf = ["cy", "stroke", "onMouseenter"], yf = ["y1", "y2", "onMouseenter"], xf = ["y1", "y2", "onMouseenter"], kf = ["x", "y", "fill"], _f = ["x", "y", "fill"], wf = ["transform"], Cf = { transform: "translate(-200, 0)" }, $f = ["stroke"], Sf = ["fill"], Mf = { transform: "translate(-130, 0)" }, Df = ["stroke"], Af = ["fill"], Tf = { transform: "translate(-60, 0)" }, Bf = ["stroke"], Lf = ["fill"], Rf = { transform: "translate(10, 0)" }, Pf = ["stroke"], If = ["fill"], Ef = { transform: "translate(80, 0)" }, Ff = ["fill"], Of = { transform: "translate(150, 0)" }, Vf = ["fill"], zf = /* @__PURE__ */ he({
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
    }), i = (m) => typeof m == "string" ? m.charAt(0).toUpperCase() + m.slice(1).toLowerCase() : m, r = (m, p) => {
      const h = m.currentTarget.closest("svg");
      if (!h) return;
      const b = h.getBoundingClientRect(), v = h.createSVGPoint();
      v.x = m.clientX - b.left, v.y = m.clientY - b.top, s.value = {
        visible: !0,
        x: v.x,
        y: v.y - 20,
        text: p
      };
    }, l = (m) => {
      if (s.value.visible) {
        const p = m.currentTarget, h = p.getBoundingClientRect(), b = p.createSVGPoint();
        b.x = m.clientX - h.left, b.y = m.clientY - h.top, s.value.x = b.x, s.value.y = b.y - 20;
      }
    }, c = () => {
      s.value.visible = !1;
    }, u = () => {
      s.value.visible = !1;
    }, f = $(() => {
      const m = [], h = a.chartHeight - a.chartMargin - a.chartBottomMargin;
      for (let b = 1; b <= 10; b++) {
        const v = b, y = (v - 1) / 9, w = a.chartMargin + h - y * h;
        m.push({ value: v, y: w });
      }
      return m;
    });
    return t({ isDark: n }), (m, p) => (g(), x("div", Uh, [
      (g(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: Ce(`min-height: ${e.chartHeight}px;`),
        onMousemove: l,
        onMouseleave: c
      }, [
        s.value.visible ? (g(), x("g", {
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
          }, null, 8, Xh),
          d("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: o.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, A(s.value.text), 9, Gh)
        ], 8, qh)) : F("", !0),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: o.value.axis,
          "stroke-width": "2"
        }, null, 8, Zh),
        d("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: o.value.axis
        }, null, 8, Qh),
        (g(!0), x(ue, null, pe(f.value, (h, b) => (g(), x(ue, { key: b }, [
          d("line", {
            x1: e.chartMargin - 6,
            y1: h.y,
            x2: e.chartMargin,
            y2: h.y,
            stroke: o.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Jh),
          d("text", {
            x: e.chartMargin - 12,
            y: h.y + 4,
            "text-anchor": "end",
            fill: o.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(h.value), 9, ef)
        ], 64))), 128)),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: o.value.axis,
          "stroke-width": "2"
        }, null, 8, tf),
        d("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: o.value.axis
        }, null, 8, af),
        (g(!0), x(ue, null, pe(e.boxplotData, (h, b) => (g(), x(ue, { key: b }, [
          d("g", {
            transform: `translate(${h.centerX}, 0)`
          }, [
            h.isTotal ? (g(), x(ue, { key: 0 }, [
              d("line", {
                x1: 0,
                y1: h.minY,
                x2: 0,
                y2: h.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, of),
              d("line", {
                x1: 0,
                y1: h.q3Y,
                x2: 0,
                y2: h.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, sf),
              d("line", {
                x1: -18,
                y1: h.minY,
                x2: 18,
                y2: h.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, rf),
              d("line", {
                x1: -18,
                y1: h.maxY,
                x2: 18,
                y2: h.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, lf),
              d("rect", {
                x: -24,
                y: h.q3Y,
                width: "48",
                height: h.q1Y - h.q3Y,
                fill: "#8b5cf6",
                "fill-opacity": "0.15",
                stroke: "#8b5cf6",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, cf)
            ], 64)) : (g(), x(ue, { key: 1 }, [
              d("line", {
                x1: 0,
                y1: h.minY,
                x2: 0,
                y2: h.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, df),
              d("line", {
                x1: 0,
                y1: h.q3Y,
                x2: 0,
                y2: h.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, uf),
              d("line", {
                x1: -18,
                y1: h.minY,
                x2: 18,
                y2: h.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, hf),
              d("line", {
                x1: -18,
                y1: h.maxY,
                x2: 18,
                y2: h.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, ff),
              d("rect", {
                x: -24,
                y: h.q3Y,
                width: "48",
                height: h.q1Y - h.q3Y,
                fill: "#C67DFF",
                "fill-opacity": "0.15",
                stroke: "#C67DFF",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, gf)
            ], 64)),
            d("circle", {
              cx: 0,
              cy: h.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => r(v, `Min: ${h.min.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, mf),
            d("circle", {
              cx: 0,
              cy: h.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => r(v, `Q1: ${h.q1.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, pf),
            d("circle", {
              cx: 0,
              cy: h.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => r(v, `Q3: ${h.q3.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, bf),
            d("circle", {
              cx: 0,
              cy: h.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => r(v, `Max: ${h.max.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, vf),
            d("line", {
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
            }, null, 40, yf),
            h.averageY ? (g(), x("line", {
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
            }, null, 40, xf)) : F("", !0)
          ], 8, nf),
          d("text", {
            x: h.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: o.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(i(h.label)), 9, kf),
          h.responseCount ? (g(), x("text", {
            key: 0,
            x: h.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: o.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(h.responseCount), 9, _f)) : F("", !0)
        ], 64))), 128)),
        e.showLegend ? (g(), x("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          d("g", Cf, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, $f),
            d("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Sf)
          ]),
          d("g", Mf, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
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
            }, " Q1 ", 8, Af)
          ]),
          d("g", Tf, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
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
            }, " Q3 ", 8, Lf)
          ]),
          d("g", Rf, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Pf),
            d("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, If)
          ]),
          d("g", Ef, [
            p[0] || (p[0] = d("line", {
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
            }, " Avg ", 8, Ff)
          ]),
          d("g", Of, [
            p[1] || (p[1] = d("line", {
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
            }, " Median ", 8, Vf)
          ])
        ], 8, wf)) : F("", !0)
      ], 44, Yh))
    ]));
  }
}), Nf = /* @__PURE__ */ be(zf, [["__scopeId", "data-v-9ac5c075"]]), jf = { class: "chart-container" }, Hf = ["viewBox"], Wf = ["x1", "y1", "x2", "y2", "stroke"], Kf = ["points", "fill"], Uf = ["x1", "y1", "x2", "y2", "stroke"], Yf = ["x1", "y1", "x2", "y2", "stroke"], qf = ["x", "y", "fill"], Xf = ["x", "y", "fill", "transform"], Gf = ["x1", "y1", "x2", "y2", "stroke"], Zf = ["points", "fill"], Qf = ["transform"], Jf = ["y1", "y2", "stroke", "onMouseenter"], eg = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], tg = ["x1", "y1", "x2", "y2", "onMouseenter"], ag = ["x1", "y1", "x2", "y2", "onMouseenter"], ng = ["cy", "stroke", "onMouseenter"], og = ["cy", "stroke", "onMouseenter"], sg = ["x", "y", "fill"], ig = ["x", "y", "fill"], rg = ["transform"], lg = { transform: "translate(-180, 0)" }, cg = ["stroke"], dg = ["fill"], ug = { transform: "translate(-120, 0)" }, hg = ["fill"], fg = { transform: "translate(-60, 0)" }, gg = ["fill"], mg = { transform: "translate(0, 0)" }, pg = ["stroke"], bg = ["fill"], vg = { transform: "translate(60, 0)" }, yg = ["fill"], xg = { transform: "translate(130, 0)" }, kg = ["fill"], _g = ["transform"], wg = ["x", "y", "width", "height", "fill", "stroke"], Cg = ["y", "fill"], $g = ["y", "fill"], vn = 10, Sg = 14, Zn = 13, oi = 4, si = 12, Mg = /* @__PURE__ */ he({
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
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), s = vn + Zn + oi + si + vn, i = $(() => ({
      bg: o.value.tooltipBg,
      border: o.value.tooltipBorder,
      text: o.value.tooltipText,
      secondary: n.value ? "#d1d5db" : "#e2e8f0"
    }));
    function r(w, _, k) {
      const C = k ? 0.6 : 0.535;
      return Math.ceil(Math.max(w, 1) * _ * C);
    }
    function l(w, _) {
      return Math.max(
        r(w.length, Zn, !0),
        r(_.length, si, !1),
        52
      ) + Sg * 2;
    }
    function c(w, _, k, C) {
      const S = k / 2, M = 6, R = Math.min(
        Math.max(w, S + M),
        a.chartWidth - S - M
      ), V = M + C + 10, W = a.chartHeight - M + 10, D = Math.min(Math.max(_, V), W);
      return { x: R, y: D };
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
    }), m = (w) => typeof w == "string" ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : w, p = (w, _, k) => {
      const C = w.currentTarget.closest("svg");
      if (!C) return;
      const S = C.getBoundingClientRect(), M = C.createSVGPoint();
      M.x = w.clientX - S.left, M.y = w.clientY - S.top;
      let R = m(_.label), V = "";
      switch (k) {
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
      const W = l(R, V), D = s;
      let I = M.x, B = M.y - 20;
      const j = c(I, B, W, D);
      I = j.x, B = j.y, f.value = {
        visible: !0,
        x: I,
        y: B,
        title: R,
        text: V,
        width: W,
        height: D
      };
    }, h = (w) => {
      if (f.value.visible) {
        const _ = w.currentTarget, k = _.getBoundingClientRect(), C = _.createSVGPoint();
        C.x = w.clientX - k.left, C.y = w.clientY - k.top;
        let S = C.x, M = C.y - 20;
        const R = c(S, M, f.value.width, f.value.height);
        f.value.x = R.x, f.value.y = R.y;
      }
    }, b = () => {
      f.value.visible = !1;
    }, v = () => {
      f.value.visible = !1;
    }, y = $(() => {
      const w = [], k = a.chartHeight - a.chartMargin - a.chartBottomMargin;
      for (let C = 1; C <= 10; C++) {
        const S = C, M = (S - 1) / 9, R = a.chartMargin + k - M * k;
        w.push({ value: S, y: R });
      }
      return w;
    });
    return t({ isDark: n }), (w, _) => (g(), x("div", jf, [
      (g(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: Ce(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
        onMousemove: h,
        onMouseleave: b
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
        }, null, 8, Wf),
        d("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: u.value.axis
        }, null, 8, Kf),
        (g(!0), x(ue, null, pe(y.value, (k, C) => (g(), x("line", {
          key: `grid-${C}`,
          x1: e.chartMargin,
          y1: k.y,
          x2: e.chartWidth - e.chartMargin,
          y2: k.y,
          stroke: u.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Uf))), 128)),
        (g(!0), x(ue, null, pe(y.value, (k, C) => (g(), x(ue, { key: C }, [
          d("line", {
            x1: e.chartMargin - 6,
            y1: k.y,
            x2: e.chartMargin,
            y2: k.y,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Yf),
          d("text", {
            x: e.chartMargin - 12,
            y: k.y + 4,
            "text-anchor": "end",
            fill: u.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(k.value), 9, qf)
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
        }, A(m(e.yAxisLabel)), 9, Xf),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, Gf),
        d("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: u.value.axis
        }, null, 8, Zf),
        (g(!0), x(ue, null, pe(e.candlestickData, (k, C) => (g(), x(ue, { key: C }, [
          d("g", {
            transform: `translate(${k.centerX}, 0)`
          }, [
            d("line", {
              x1: 0,
              y1: k.highY,
              x2: 0,
              y2: k.lowY,
              stroke: k.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              class: "hover-line",
              onMouseenter: (S) => p(S, k, "wick"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, Jf),
            d("rect", {
              x: -e.candleWidth / 2,
              y: Math.min(k.q1Y, k.q3Y) - (Math.abs(k.q3Y - k.q1Y) < 4 ? 4 : 0),
              width: e.candleWidth,
              height: Math.max(8, Math.abs(k.q3Y - k.q1Y)),
              fill: k.isTotal ? "rgba(139, 92, 246, 0.15)" : "rgba(198, 125, 255, 0.15)",
              stroke: k.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              rx: "4",
              class: "hover-rect",
              onMouseenter: (S) => p(S, k, "body"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, eg),
            k.medianY ? (g(), x("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: k.medianY,
              x2: e.candleWidth / 2,
              y2: k.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (S) => p(S, k, "median"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, tg)) : F("", !0),
            k.averageY ? (g(), x("line", {
              key: 1,
              x1: -e.candleWidth / 2,
              y1: k.averageY,
              x2: e.candleWidth / 2,
              y2: k.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (S) => p(S, k, "average"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, ag)) : F("", !0),
            d("circle", {
              cx: 0,
              cy: k.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: u.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (S) => p(S, k, "min"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, ng),
            d("circle", {
              cx: 0,
              cy: k.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: u.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (S) => p(S, k, "max"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, og)
          ], 8, Qf),
          d("text", {
            x: k.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: u.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(m(k.label)), 9, sg),
          k.responseCount ? (g(), x("text", {
            key: 0,
            x: k.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: u.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(k.responseCount), 9, ig)) : F("", !0)
        ], 64))), 128)),
        e.showLegend ? (g(), x("g", {
          key: 0,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          d("g", lg, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: u.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, cg),
            d("text", {
              x: "10",
              y: "4",
              fill: u.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, dg)
          ]),
          d("g", ug, [
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
            }, " Q1 ", 8, hg)
          ]),
          d("g", fg, [
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
            }, " Q3 ", 8, gg)
          ]),
          d("g", mg, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: u.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, pg),
            d("text", {
              x: "10",
              y: "4",
              fill: u.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, bg)
          ]),
          d("g", vg, [
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
            }, " Avg ", 8, yg)
          ]),
          d("g", xg, [
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
            }, " Median ", 8, kg)
          ])
        ], 8, rg)) : F("", !0),
        f.value.visible ? (g(), x("g", {
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
          }, null, 8, wg),
          d("text", {
            x: "0",
            y: -f.value.height - 10 + vn,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(f.value.title), 9, Cg),
          d("text", {
            x: "0",
            y: -f.value.height - 10 + vn + Zn + oi,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(f.value.text), 9, $g)
        ], 8, _g)) : F("", !0)
      ], 44, Hf))
    ]));
  }
}), Dg = /* @__PURE__ */ be(Mg, [["__scopeId", "data-v-22efd66d"]]), Ag = ["viewBox"], Tg = ["x1", "y1", "x2", "y2", "stroke"], Bg = ["x1", "y1", "x2", "y2", "stroke"], Lg = ["points", "fill"], Rg = ["x1", "y1", "x2", "y2", "stroke"], Pg = ["x", "y", "fill"], Ig = ["x", "y", "fill", "transform"], Eg = ["x1", "y1", "x2", "y2", "stroke"], Fg = ["points", "fill"], Og = ["x1", "y1", "x2", "y2", "stroke"], Vg = ["x", "y", "fill"], zg = ["x", "y", "fill"], Ng = ["d"], jg = ["x", "y", "width", "height", "onMouseenter"], Hg = ["x1", "y1", "x2", "y2"], Wg = ["x", "y"], Kg = ["x1", "y1", "x2", "y2"], Ug = ["x", "y"], Yg = ["x1", "y1", "x2", "y2"], qg = ["x", "y"], Xg = ["x1", "y1", "x2", "y2"], Gg = ["x", "y"], Zg = ["x1", "y1", "x2", "y2"], Qg = ["x", "y"], Jg = ["x1", "y1", "x2", "y2"], em = ["x", "y"], tm = ["transform"], am = { transform: "translate(-220, 0)" }, nm = ["fill"], om = { transform: "translate(-140, 0)" }, sm = ["fill"], im = { transform: "translate(-80, 0)" }, rm = ["fill"], lm = { transform: "translate(-20, 0)" }, cm = ["fill"], dm = { transform: "translate(60, 0)" }, um = ["fill"], hm = { transform: "translate(130, 0)" }, fm = ["fill"], gm = { transform: "translate(180, 0)" }, mm = ["fill"], pm = ["transform"], bm = ["x", "y", "width", "height", "fill", "stroke"], vm = ["y", "fill"], ym = ["y", "fill"], yn = 10, xm = 14, Qn = 13, ii = 12, ri = 4, km = /* @__PURE__ */ he({
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
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), s = yn + Qn + ri + ii + yn, i = $(() => ({
      bg: o.value.tooltipBg,
      border: o.value.tooltipBorder,
      text: o.value.tooltipText,
      secondary: n.value ? "#d1d5db" : "#e2e8f0"
    }));
    function r(ee, X, P) {
      const q = P ? 0.6 : 0.535;
      return Math.ceil(Math.max(ee, 1) * X * q);
    }
    function l(ee, X) {
      return Math.max(
        r(ee.length, Qn, !0),
        r(X.length, ii, !1),
        52
      ) + xm * 2;
    }
    function c(ee, X, P, q) {
      const te = P / 2, E = 6, J = Math.min(
        Math.max(ee, te + E),
        a.chartWidth - te - E
      ), se = E + q + 10, ge = a.chartHeight - E + 10, we = Math.min(Math.max(X, se), ge);
      return { x: J, y: we };
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
    }), m = $(
      () => a.chartMarginRight ?? a.chartMargin
    ), p = $(() => a.chartMargin + a.plotInset), h = $(
      () => a.chartWidth - m.value - a.plotInset
    ), b = $(() => Math.max(h.value - p.value, 1)), v = $(() => a.chartHeight - a.chartMargin - a.chartBottomMargin), y = $(() => b.value / 10 * 0.52);
    function w(ee) {
      if (ee < 1 || ee > 10) return null;
      const X = b.value / 10;
      return p.value + (ee - 0.5) * X;
    }
    const _ = $(
      () => Array.from({ length: 10 }, (ee, X) => {
        const P = X + 1, q = w(P);
        return q === null ? null : { score: P, x: q };
      }).filter((ee) => ee !== null)
    ), k = $(() => {
      if (!a.histogram || a.histogram.length === 0) return 1;
      const ee = Math.max(...a.histogram.map((P) => P.count || 0), 1), X = Math.max(1, Math.ceil(ee * 0.2));
      return ee + X;
    }), C = $(() => {
      if (!a.histogram || a.histogram.length === 0) return 1;
      const ee = a.averageScore || 0;
      let X = 0, P = 0;
      if (a.histogram.forEach((te) => {
        const E = te.count || 0;
        X += E;
        const J = te.score - ee;
        P += E * (J * J);
      }), X === 0) return 1;
      const q = P / X;
      return Math.sqrt(q) || 1;
    }), S = (ee, X, P) => {
      if (P === 0) return 0;
      const q = 1 / (P * Math.sqrt(2 * Math.PI)), te = -0.5 * Math.pow((ee - X) / P, 2);
      return q * Math.exp(te);
    }, M = $(() => {
      if (!a.histogram || a.histogram.length === 0 || a.averageScore === 0 && C.value === 0) return null;
      const ee = a.averageScore, X = C.value, P = 100, te = Math.max(...a.histogram.map((ge) => ge.count || 0), 1) / k.value * v.value;
      if (te <= 0) return null;
      let E = 0;
      for (let ge = 0; ge <= P; ge++) {
        const we = 1 + 9 * (ge / P), _e = S(we, ee, X);
        _e > E && (E = _e);
      }
      if (E <= 0) return null;
      const J = te / E, se = [];
      for (let ge = 0; ge <= P; ge++) {
        const we = 1 + 9 * (ge / P), _e = S(we, ee, X) * J, Re = w(we);
        if (Re !== null) {
          const Pe = a.chartHeight - a.chartBottomMargin - _e;
          se.push(`${ge === 0 ? "M" : "L"} ${Re} ${Pe}`);
        }
      }
      return se.join(" ");
    }), R = $(() => {
      if (!a.histogram || a.histogram.length === 0) return [];
      const ee = b.value / 10;
      return a.histogram.map((X) => {
        const P = Number(X.score);
        if (!Number.isFinite(P) || P < 1 || P > 10)
          return null;
        const q = p.value + (P - 0.5) * ee, te = X.count > 0 ? X.count / k.value * v.value : 0, E = a.chartHeight - a.chartBottomMargin - te;
        return {
          score: P,
          count: X.count,
          x: q,
          y: E,
          height: te
        };
      }).filter((X) => X !== null);
    }), V = $(() => w(a.minScore)), W = $(() => w(a.maxScore)), D = $(() => w(a.q1Score)), I = $(() => w(a.medianScore)), B = $(() => w(a.q3Score)), j = $(() => w(a.averageScore)), H = $(() => a.minScore), Q = $(() => a.maxScore), le = $(() => a.q1Score), fe = $(() => a.medianScore), G = $(() => a.q3Score), oe = $(() => a.averageScore), L = $(() => {
      const ee = [], X = a.chartMargin - 8, P = 18;
      D.value !== null && ee.push({
        x: D.value,
        y: X,
        value: a.q1Score,
        label: `Q1: ${le.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), I.value !== null && ee.push({
        x: I.value,
        y: X - P,
        value: a.medianScore,
        label: `Median: ${fe.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), j.value !== null && ee.push({
        x: j.value,
        y: X - P,
        value: a.averageScore,
        label: `Avg: ${oe.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), B.value !== null && ee.push({
        x: B.value,
        y: X,
        value: a.q3Score,
        label: `Q3: ${G.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), ee.sort((E, J) => (E.x || 0) - (J.x || 0));
      const q = [[], [], []];
      ee.forEach((E) => {
        if (E.x === null) return;
        let J = -1;
        for (let se = 0; se < q.length; se++) {
          let ge = !1;
          for (const we of q[se]) {
            if (we.x === null) continue;
            const _e = Math.abs(E.x - we.x), Re = (E.width + we.width) / 2 + 10;
            if (_e < Re) {
              ge = !0;
              break;
            }
          }
          if (!ge) {
            J = se;
            break;
          }
        }
        J === -1 && (J = q.length - 1), E.y = X - J * P, q[J].push(E);
      });
      const te = 15;
      return ee.forEach((E) => {
        E.y < te && (E.y = te);
      }), ee;
    }), U = (ee) => L.value.find((P) => P.id === ee)?.y || a.chartMargin - 10, Y = $(() => {
      const ee = [];
      for (let P = 0; P <= 5; P++) {
        const q = Math.round(k.value / 5 * P), te = a.chartHeight - a.chartBottomMargin - P / 5 * v.value;
        ee.push({ value: q, y: te });
      }
      return ee;
    });
    function z(ee, X, P) {
      const q = ee.createSVGPoint();
      q.x = X, q.y = P;
      const te = ee.getScreenCTM();
      if (!te) {
        const J = ee.getBoundingClientRect();
        return { x: X - J.left, y: P - J.top };
      }
      const E = q.matrixTransform(te.inverse());
      return { x: E.x, y: E.y };
    }
    const re = (ee, X) => {
      a.interactive && ve(ee, X);
    }, ce = () => {
      a.interactive && de();
    }, ve = (ee, X) => {
      const P = ee.currentTarget.closest("svg");
      if (!P) return;
      const { x: q, y: te } = z(P, ee.clientX, ee.clientY), E = `Score: ${X.score}`, J = `Count: ${Number(X.count ?? 0).toLocaleString()}`, se = l(E, J), ge = s, we = typeof X?.x == "number" ? X.x : q;
      let _e = te - 20;
      const Re = c(we, _e, se, ge);
      f.value = {
        visible: !0,
        x: Re.x,
        y: Re.y,
        title: E,
        text: J,
        width: se,
        height: ge,
        anchorX: typeof X?.x == "number" ? X.x : null
      };
    }, K = (ee) => {
      if (a.interactive && f.value.visible) {
        const X = ee.currentTarget, { x: P, y: q } = z(X, ee.clientX, ee.clientY), te = f.value.anchorX, E = te != null && Number.isFinite(te) ? te : P;
        let J = q - 20;
        const se = c(E, J, f.value.width, f.value.height);
        f.value.x = se.x, f.value.y = se.y;
      }
    }, ie = () => {
      de();
    }, de = () => {
      f.value.visible = !1, f.value.anchorX = null;
    };
    return t({ isDark: n }), (ee, X) => (g(), x("div", {
      class: Z(["chart-container", { "chart-container--static": !e.interactive }])
    }, [
      (g(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: Ce(`min-height: ${e.chartHeight}px;`),
        onMousemove: K,
        onMouseleave: ie
      }, [
        X[7] || (X[7] = d("defs", null, [
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
        (g(!0), x(ue, null, pe(Y.value, (P, q) => (g(), x("line", {
          key: `grid-${q}`,
          x1: p.value,
          y1: P.y,
          x2: h.value,
          y2: P.y,
          stroke: u.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Tg))), 128)),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, Bg),
        d("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: u.value.axis
        }, null, 8, Lg),
        (g(!0), x(ue, null, pe(Y.value, (P, q) => (g(), x(ue, {
          key: `y-tick-${q}`
        }, [
          d("line", {
            x1: e.chartMargin - 6,
            y1: P.y,
            x2: e.chartMargin,
            y2: P.y,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Rg),
          d("text", {
            x: e.chartMargin - 12,
            y: P.y + 4,
            "text-anchor": "end",
            fill: u.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(P.value), 9, Pg)
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
        }, " Count ", 8, Ig),
        d("line", {
          x1: p.value,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: h.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, Eg),
        d("polygon", {
          points: `${h.value - 4},${e.chartHeight - e.chartBottomMargin - 4} ${h.value - 4},${e.chartHeight - e.chartBottomMargin + 4} ${h.value},${e.chartHeight - e.chartBottomMargin}`,
          fill: u.value.axis
        }, null, 8, Fg),
        (g(!0), x(ue, null, pe(_.value, (P) => (g(), x(ue, {
          key: `tick-${P.score}`
        }, [
          d("line", {
            x1: P.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: P.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Og),
          d("text", {
            x: P.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: u.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(P.score), 9, Vg)
        ], 64))), 128)),
        d("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: u.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, zg),
        M.value ? (g(), x("path", {
          key: 0,
          d: M.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, Ng)) : F("", !0),
        (g(!0), x(ue, null, pe(R.value, (P, q) => (g(), x("rect", {
          key: `bar-${q}`,
          x: P.x - y.value / 2,
          y: P.y,
          width: y.value,
          height: P.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (te) => re(te, P),
          onMouseleave: ce,
          style: Ce({ cursor: e.interactive ? "pointer" : "default" })
        }, null, 44, jg))), 128)),
        e.showStatLabels && V.value ? (g(), x("line", {
          key: 1,
          x1: V.value,
          y1: e.chartMargin,
          x2: V.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Hg)) : F("", !0),
        e.showStatLabels && V.value ? (g(), x("text", {
          key: 2,
          x: V.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + A(H.value.toFixed(1)), 9, Wg)) : F("", !0),
        e.showStatLabels && D.value ? (g(), x("line", {
          key: 3,
          x1: D.value,
          y1: e.chartMargin,
          x2: D.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Kg)) : F("", !0),
        e.showStatLabels && D.value ? (g(), x("text", {
          key: 4,
          x: D.value,
          y: U("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + A(le.value.toFixed(1)), 9, Ug)) : F("", !0),
        e.showStatLabels && I.value ? (g(), x("line", {
          key: 5,
          x1: I.value,
          y1: e.chartMargin,
          x2: I.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, Yg)) : F("", !0),
        e.showStatLabels && I.value ? (g(), x("text", {
          key: 6,
          x: I.value,
          y: U("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + A(fe.value.toFixed(1)), 9, qg)) : F("", !0),
        e.showStatLabels && j.value ? (g(), x("line", {
          key: 7,
          x1: j.value,
          y1: e.chartMargin,
          x2: j.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, Xg)) : F("", !0),
        e.showStatLabels && j.value ? (g(), x("text", {
          key: 8,
          x: j.value,
          y: U("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + A(oe.value.toFixed(1)), 9, Gg)) : F("", !0),
        e.showStatLabels && B.value ? (g(), x("line", {
          key: 9,
          x1: B.value,
          y1: e.chartMargin,
          x2: B.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#7c3aed",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Zg)) : F("", !0),
        e.showStatLabels && B.value ? (g(), x("text", {
          key: 10,
          x: B.value,
          y: U("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + A(G.value.toFixed(1)), 9, Qg)) : F("", !0),
        e.showStatLabels && W.value ? (g(), x("line", {
          key: 11,
          x1: W.value,
          y1: e.chartMargin,
          x2: W.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Jg)) : F("", !0),
        e.showStatLabels && W.value ? (g(), x("text", {
          key: 12,
          x: W.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + A(Q.value.toFixed(1)), 9, em)) : F("", !0),
        e.showLegend ? (g(), x("g", {
          key: 13,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          d("g", am, [
            X[0] || (X[0] = d("line", {
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
            }, " Gaussian ", 8, nm)
          ]),
          d("g", om, [
            X[1] || (X[1] = d("line", {
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
            }, " Min ", 8, sm)
          ]),
          d("g", im, [
            X[2] || (X[2] = d("line", {
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
            }, " Q1 ", 8, rm)
          ]),
          d("g", lm, [
            X[3] || (X[3] = d("line", {
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
            }, " Median ", 8, cm)
          ]),
          d("g", dm, [
            X[4] || (X[4] = d("line", {
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
            }, " Avg ", 8, um)
          ]),
          d("g", hm, [
            X[5] || (X[5] = d("line", {
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
            }, " Q3 ", 8, fm)
          ]),
          d("g", gm, [
            X[6] || (X[6] = d("line", {
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
            }, " Max ", 8, mm)
          ])
        ], 8, tm)) : F("", !0),
        e.interactive && f.value.visible ? (g(), x("g", {
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
          }, null, 8, bm),
          d("text", {
            x: "0",
            y: -f.value.height - 10 + yn,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(f.value.title), 9, vm),
          d("text", {
            x: "0",
            y: -f.value.height - 10 + yn + Qn + ri,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(f.value.text), 9, ym)
        ], 8, pm)) : F("", !0)
      ], 44, Ag))
    ], 2));
  }
}), vr = /* @__PURE__ */ be(km, [["__scopeId", "data-v-8f9da805"]]), _m = 639, yr = 1024;
function li(e) {
  return e < 640 ? "mobile" : e <= yr ? "tablet" : "desktop";
}
function wm() {
  const e = ne(
    typeof window > "u" ? "desktop" : li(window.innerWidth)
  ), t = () => {
    typeof window > "u" || (e.value = li(window.innerWidth));
  };
  let a = null, n = null, o = null, s = null;
  Je(() => {
    typeof window > "u" || (t(), a = window.matchMedia(`(max-width: ${_m}px)`), n = window.matchMedia(`(min-width: 640px) and (max-width: ${yr}px)`), o = window.matchMedia("(min-width: 1025px)"), s = () => {
      t();
    }, a.addEventListener("change", s), n.addEventListener("change", s), o.addEventListener("change", s));
  }), rt(() => {
    !s || !a || !n || !o || (a.removeEventListener("change", s), n.removeEventListener("change", s), o.removeEventListener("change", s));
  });
  const i = $(() => e.value === "mobile"), r = $(() => e.value === "tablet"), l = $(() => e.value === "desktop");
  return {
    breakpoint: e,
    isMobile: i,
    isTablet: r,
    isDesktop: l
  };
}
const It = (e, t) => t ? `${(e / t * 100).toFixed(1)}%` : "0.0%", ye = (e, t) => `${e.toLocaleString()} (${It(e, t)})`, Cm = { class: "chart-container" }, $m = {
  key: 0,
  class: "loading-state loading-overlay"
}, la = 12, Sm = /* @__PURE__ */ he({
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
    zo.use([Xr, Gr, Zr, Qr]);
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), { breakpoint: s } = wm(), i = ne(null), r = ne(!0), l = ne(!1);
    let c = null, u = null;
    const f = {
      animation: { duration: 1e3, easing: "cubicOut" },
      margins: { left: "3%", right: "8%", top: "2%", bottom: "2%" },
      node: { width: 88, gap: 24, align: "left", iterations: 0 },
      style: {
        shadowBlur: 0,
        shadowColor: "transparent"
      }
    }, m = {
      success: "#66BB6A",
      abandon: "#FFA726",
      error: "#EF5350"
    }, p = {
      success: 0,
      abandon: 1,
      error: 2
    }, h = /abandon|exit|lost|bounce|cancelled|no pending|not paid|not confirmed|not delivered/i, b = /error|failed|unrecovered|not retreiv|bp error|not found|rejected|redirect to human|invalid|unprocessed|data quality|failed:/i, v = $(() => {
      const K = s.value;
      return K === "mobile" ? {
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
      } : K === "tablet" ? {
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
    }), y = (K) => {
      const ie = K.replace(/_/g, " ").replace(/\s+/g, " ").trim(), de = ie.match(/^Failed:\s*(.+)$/i);
      return de ? `Failed:
${de[1].trim()}` : ie;
    }, w = (K, ie) => {
      const de = K.trim();
      if (!de || ie < 1 || de.length <= ie) return de;
      const ee = [];
      let X = 0;
      for (; X < de.length; ) {
        const P = Math.min(X + ie, de.length);
        if (P >= de.length) {
          const E = de.slice(X).trim();
          E && ee.push(E);
          break;
        }
        const q = de.slice(X, P), te = q.lastIndexOf(" ");
        if (te > 0)
          for (ee.push(de.slice(X, X + te).trim()), X += te; X < de.length && de[X] === " "; ) X += 1;
        else
          ee.push(q), X = P;
      }
      return ee.join(`
`);
    }, _ = (K, ie) => {
      const de = K.trim();
      return !de || ie < 1 ? K : de.split(`
`).map((ee) => w(ee.trim(), ie)).filter(Boolean).join(`
`);
    }, k = (K) => K.status ? K.status : h.test(K.name) ? "abandon" : b.test(K.name) ? "error" : "success", C = (K) => K.originalValue ?? K.value, S = (K, ie) => {
      const de = new Set(ie.map((X) => X.target)), ee = K.filter((X) => !de.has(X.name));
      for (const X of ee) {
        if (typeof X.value == "number" && X.value > 0) return X.value;
        const P = ie.filter((q) => q.source === X.name);
        if (P.length > 0)
          return P.reduce((q, te) => q + C(te), 0);
      }
      return ie.reduce((X, P) => Math.max(X, C(P)), 0);
    }, M = (K, ie) => {
      const de = /* @__PURE__ */ new Map(), ee = new Set(ie.map((P) => P.target)), X = K.filter((P) => !ee.has(P.name)).map((P) => ({ name: P.name, depth: 0 }));
      for (; X.length > 0; ) {
        const { name: P, depth: q } = X.shift(), te = de.get(P);
        if (!(te !== void 0 && te >= q)) {
          de.set(P, q);
          for (const E of ie)
            E.source === P && X.push({ name: E.target, depth: q + 1 });
        }
      }
      for (const P of K)
        de.has(P.name) || de.set(P.name, 0);
      return de;
    }, R = (K, ie) => {
      const de = /* @__PURE__ */ new Map(), ee = new Set(ie.map((te) => te.target)), X = K.filter((te) => !ee.has(te.name));
      let P = 0;
      const q = (te) => {
        let E = te;
        for (; E && !de.has(E); )
          de.set(E, P), P += 1, E = ie.filter(
            (se) => se.source === E && k({ name: se.target }) === "success"
          ).sort((se, ge) => C(ge) - C(se))[0]?.target;
      };
      return X.forEach((te) => q(te.name)), de;
    }, V = (K, ie, de) => {
      const ee = k(K);
      if (ee === "success" && de.has(K.name))
        return de.get(K.name);
      if (ee === "success") {
        const X = ie.filter((q) => q.target === K.name);
        return 200 + (X.length ? Math.min(
          ...X.map(
            (q) => de.has(q.source) ? (de.get(q.source) ?? 0) + 0.01 : 500
          )
        ) : 500);
      }
      return ee === "abandon" ? 1e3 : 2e3;
    }, W = (K, ie) => {
      const de = M(K, ie), ee = R(K, ie);
      return [...K].sort((X, P) => {
        const q = de.get(X.name) ?? 0, te = de.get(P.name) ?? 0;
        if (q !== te) return q - te;
        const E = p[k(X)], J = p[k(P)];
        if (E !== J) return E - J;
        const se = V(X, ie, ee), ge = V(P, ie, ee);
        if (se !== ge) return se - ge;
        const we = typeof X.order == "number" ? X.order : Number.MAX_SAFE_INTEGER, _e = typeof P.order == "number" ? P.order : Number.MAX_SAFE_INTEGER;
        return we !== _e ? we - _e : X.name.localeCompare(P.name);
      });
    }, D = (K, ie, de, ee) => {
      const P = _(K, ee).split(`
`), q = ie * 0.58, E = Math.max(...P.map((se) => se.length), 1) * q, J = P.length * de;
      return {
        lines: P,
        width: E,
        height: J,
        nodeWidth: E + la * 2
      };
    }, I = (K, ie, de, ee) => {
      const X = typeof K.label == "string" && K.label ? K.label : K.name, P = `${y(X)}
(${It(de, ee)})`;
      return _(P, ie);
    }, B = (K, ie) => {
      const de = ie.filter((ee) => ee.target === K.name);
      return de.length > 0 ? de.reduce((ee, X) => ee + C(X), 0) : typeof K.value == "number" ? K.value : ie.filter((ee) => ee.source === K.name).reduce((ee, X) => ee + C(X), 0);
    }, j = (K, ie, de) => {
      const ee = ie.find((X) => X.name === K);
      return ee ? B(ee, de) : de.filter((X) => X.source === K).reduce((X, P) => X + C(P), 0);
    }, H = (K, ie, de, ee) => {
      const X = j(K, de, ee);
      return `${ie.toLocaleString()} (${It(ie, X)})`;
    }, Q = (K, ie = 0) => {
      if (ie > 0) return ie;
      const de = K.match(/^(\d+(?:\.\d+)?)px$/);
      if (de) return Number(de[1]);
      const ee = K.match(/^(\d+(?:\.\d+)?)vh$/);
      return ee && typeof window < "u" ? Number(ee[1]) / 100 * window.innerHeight : 500;
    }, le = (K, ie, de, ee, X) => {
      if (!ie.length || !K.length || X <= 0) return K;
      const P = K.map((_e) => ({ ..._e })), q = de.labelLineHeight || Math.round(de.labelFontSize * 1.25), te = Math.max(4, de.labelCharsPerLine), E = Math.max(ee * 0.88, 260), J = M(ie, P), se = /* @__PURE__ */ new Map();
      ie.forEach((_e) => {
        const Re = J.get(_e.name) ?? 0;
        se.set(Re, (se.get(Re) ?? 0) + 1);
      });
      const ge = (_e) => {
        const Pe = ie.find((oa) => oa.name === _e)?.displayLabel || _e, Kt = D(Pe, de.labelFontSize, q, te).height + la * 2, pa = J.get(_e) ?? 0, an = se.get(pa) ?? 1, nn = (Math.max(an, 1) - 1) * de.nodeGap / Math.max(an, 1), On = Math.max(E - nn, Kt);
        return Math.max(1, Kt / On * X);
      }, we = (_e) => {
        const Re = P.filter((Pe) => Pe.target === _e);
        return Re.length > 0 ? Re.reduce((Pe, qe) => Pe + qe.value, 0) : P.filter((Pe) => Pe.source === _e).reduce((Pe, qe) => Pe + qe.value, 0);
      };
      for (let _e = 0; _e < 16; _e += 1) {
        let Re = !1;
        for (const Pe of ie) {
          const qe = ge(Pe.name), Kt = we(Pe.name);
          if (Kt >= qe) continue;
          const pa = P.filter((oa) => oa.target === Pe.name), an = P.filter((oa) => oa.source === Pe.name), nn = pa.length > 0 ? pa : an;
          if (nn.length === 0) continue;
          const On = qe / Math.max(Kt, 1e-6);
          nn.forEach((oa) => {
            oa.value *= On;
          }), Re = !0;
        }
        if (!Re) break;
      }
      return P;
    }, fe = (K, ie, de) => {
      const ee = S(K, ie), X = W(K, ie), P = de.labelLineHeight || Math.round(de.labelFontSize * 1.25), q = Math.max(4, de.labelCharsPerLine);
      let te = de.nodeWidth;
      const E = [], J = X.map((ge, we) => {
        const _e = k(ge), Re = I(
          ge,
          q,
          B(ge, ie),
          ee
        );
        E.push(Re);
        const Pe = D(Re, de.labelFontSize, P, q);
        de.orient === "vertical" ? te = Math.max(te, Pe.height + la * 2) : te = Math.max(te, Pe.nodeWidth);
        const qe = a.nodeColors[ge.name] || m[_e] || G[we % G.length], Kt = Math.max(Math.ceil(Pe.nodeWidth - la * 2), 48);
        return {
          ...ge,
          displayLabel: Re,
          label: {
            width: Kt,
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
        const ge = Math.max(
          ...E.map(
            (_e) => D(_e, de.labelFontSize, P, q).width
          ),
          0
        ), we = typeof se.right == "number" ? se.right : 10;
        se = {
          ...se,
          right: Math.max(we, ge + la + de.labelDistance)
        };
      }
      return { nodes: J, maxNodeWidth: te, contentMargins: se, originTotal: ee };
    }, G = [
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
      const K = a.data.links.filter(
        (X) => X.source && X.target && typeof X.value == "number"
      ), ie = Math.max(...K.map((X) => X.value), 1), de = Math.max(1, ie * 0.01), ee = K.map((X) => ({
        ...X,
        originalValue: X.value,
        value: X.value < ie * 0.01 ? de : X.value
      }));
      return {
        nodes: a.data.nodes.filter((X) => X.name),
        links: ee
      };
    }, L = (K, ie, de) => (ee) => {
      const X = ee.dataType === "node", P = o.value.tooltipText, q = n.value ? "#d1d5db" : "#e2e8f0";
      if (X) {
        const ge = ie.filter((Pe) => Pe.target === ee.name), we = ie.filter((Pe) => Pe.source === ee.name), _e = ge.length > 0 ? ge.reduce((Pe, qe) => Pe + (qe.originalValue || qe.value), 0) : we.reduce((Pe, qe) => Pe + (qe.originalValue || qe.value), 0), Re = It(_e, de);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${P};">${ee.name} (${Re})</div><div style="color: ${q}; font-size: 12px;">Count: ${_e.toLocaleString()}</div>`;
      }
      const te = ee.data?.source || ee.source || "Unknown", E = ee.data?.target || ee.target || "Unknown", J = Number(ee.data?.originalValue ?? ee.data?.value ?? ee.value ?? 0), se = H(te, J, K, ie);
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${P};">${te} → ${E}</div><div style="color: ${q}; font-size: 12px;">Flow: ${se}</div>`;
    }, U = () => {
      if (!c || !a.data.nodes?.length || !a.data.links?.length) return;
      const K = v.value, ie = n.value ? "rgba(110, 110, 120, 0.35)" : "rgba(148, 163, 184, 0.45)", de = n.value ? "rgba(130, 130, 140, 0.5)" : "rgba(100, 116, 139, 0.55)", ee = n.value ? "rgba(203, 213, 225, 0.92)" : "#64748b", X = K.labelPosition === "inside" ? "#ffffff" : n.value ? o.value.textPrimary : "#334155";
      try {
        const { nodes: P, links: q } = oe(), { nodes: te, maxNodeWidth: E, contentMargins: J, originTotal: se } = fe(
          P,
          q,
          K
        ), ge = Q(a.height, i.value?.clientHeight ?? 0), we = le(
          q,
          te,
          {
            labelFontSize: K.labelFontSize,
            labelLineHeight: K.labelLineHeight || Math.round(K.labelFontSize * 1.25),
            labelCharsPerLine: K.labelCharsPerLine,
            nodeGap: K.nodeGap
          },
          ge,
          se
        ), _e = {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove|click",
            confine: !0,
            formatter: L(P, we, se),
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
                color: ie,
                curveness: 0.5,
                opacity: 1
              },
              itemStyle: {
                ...f.style,
                borderWidth: 0
              },
              label: {
                show: !0,
                position: K.labelPosition,
                color: X,
                fontWeight: 700,
                fontSize: K.labelFontSize,
                lineHeight: K.labelLineHeight || Math.round(K.labelFontSize * 1.25),
                padding: la,
                align: "center",
                verticalAlign: "middle",
                overflow: "none",
                ...K.orient === "horizontal" ? { width: Math.max(E - la * 2, 48), overflow: "none" } : K.labelWrap && K.labelTextWidth > 0 ? { width: K.labelTextWidth, overflow: "none" } : {},
                ...K.labelDistance > 0 ? { distance: K.labelDistance } : {},
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (Re) => Re.data?.displayLabel || Re.name || ""
              },
              edgeLabel: K.edgeLabelShow ? {
                show: !0,
                fontSize: K.edgeLabelFontSize,
                color: ee,
                fontWeight: 500,
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (Re) => {
                  const Pe = Number(Re.data?.originalValue ?? Re.value ?? 0), qe = Re.data?.source || Re.source || "";
                  return H(qe, Pe, P, we);
                }
              } : { show: !1 },
              nodeAlign: f.node.align,
              nodeGap: K.nodeGap,
              nodeWidth: E,
              layoutIterations: f.node.iterations,
              orient: K.orient,
              draggable: !1,
              ...J
            }
          ],
          backgroundColor: "transparent",
          animation: !0,
          animationDuration: f.animation.duration,
          animationEasing: f.animation.easing
        };
        c.setOption(_e), c.resize();
      } catch (P) {
        console.error("Error setting Sankey chart options:", P), l.value = !0;
      }
    }, Y = async () => {
      if (i.value)
        try {
          c = zo.init(i.value), U(), window.addEventListener("resize", ce);
        } catch (K) {
          console.error("Error initializing Sankey chart:", K), l.value = !0;
        } finally {
          r.value = !1;
        }
    }, z = () => {
      const K = i.value;
      return !!(K && K.clientWidth > 0 && K.clientHeight > 0);
    }, re = async () => {
      if (await Ke(), z()) return Y();
      await new Promise((K) => {
        const ie = i.value;
        if (!ie) {
          K();
          return;
        }
        u = new ResizeObserver(() => {
          z() && (u?.disconnect(), u = null, Y().then(K));
        }), u.observe(ie);
      });
    }, ce = () => c?.resize(), ve = () => {
      window.removeEventListener("resize", ce), u?.disconnect(), u = null, c && (c.dispose(), c = null);
    };
    return Je(() => re()), _i(ve), Te(() => a.data, U, { deep: !0 }), Te(n, U), Te(s, U), t({ isDark: n }), (K, ie) => (g(), x("div", Cm, [
      l.value ? (g(), x("div", {
        key: 0,
        class: "error-state",
        style: Ce({ height: e.height })
      }, [...ie[0] || (ie[0] = [
        eo('<div class="error-content" data-v-c2130602><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c2130602><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-c2130602></path></svg><p class="error-title" data-v-c2130602>Chart could not be loaded</p><p class="error-description" data-v-c2130602>Please check the data format.</p></div>', 1)
      ])], 4)) : (g(), x("div", {
        key: 1,
        class: "chart-wrapper",
        style: Ce({ height: e.height })
      }, [
        d("div", {
          ref_key: "chartEl",
          ref: i,
          class: "chart-content"
        }, null, 512),
        r.value ? (g(), x("div", $m, [...ie[1] || (ie[1] = [
          eo('<div class="loading-container" data-v-c2130602><div class="sankey-loader" data-v-c2130602><div class="flow flow-1" data-v-c2130602></div><div class="flow flow-2" data-v-c2130602></div><div class="flow flow-3" data-v-c2130602></div><div class="flow flow-4" data-v-c2130602></div></div><p class="loading-text" data-v-c2130602>Loading Sankey diagram...</p></div>', 1)
        ])])) : F("", !0)
      ], 4))
    ]));
  }
}), aa = /* @__PURE__ */ be(Sm, [["__scopeId", "data-v-c2130602"]]), Mm = ["open"], Dm = { class: "card-header metric-collapsible__summary" }, Am = { class: "header-content metric-header-content" }, Tm = { class: "metric-header-content__main" }, Bm = { class: "metric-header-content__text" }, Lm = { class: "metric-header-content__loaded" }, Rm = {
  key: 0,
  class: "card-title"
}, Pm = {
  key: 0,
  class: "card-subtitle"
}, Im = {
  key: 0,
  class: "metric-header-content__export"
}, Em = {
  key: 0,
  class: "cmc-header-aside"
}, Fm = {
  key: 0,
  class: "chart-metric-container__body"
}, Om = {
  key: "body-loading",
  class: "cmc-body-loading",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Vm = { key: "body-content" }, zm = {
  key: 1,
  class: "chart-metric-container chart-metric-container--static"
}, Nm = { class: "card-header" }, jm = { class: "header-content metric-header-content" }, Hm = { class: "metric-header-content__main" }, Wm = { class: "metric-header-content__text" }, Km = { class: "metric-header-content__loaded" }, Um = {
  key: 0,
  class: "card-title"
}, Ym = {
  key: 0,
  class: "card-subtitle"
}, qm = {
  key: 0,
  class: "metric-header-content__export"
}, Xm = {
  key: 0,
  class: "cmc-header-aside"
}, Gm = {
  key: 0,
  class: "chart-metric-container__body"
}, Zm = {
  key: "body-loading",
  class: "cmc-body-loading",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Qm = { key: "body-content" }, Jm = /* @__PURE__ */ he({
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
    function o(h) {
      return h === !0;
    }
    const s = ne(null), i = ne(o(a.defaultOpen)), r = ne(o(a.defaultOpen)), l = ho();
    function c(h) {
      return h.some((b) => {
        if (b.type === Yr) return !1;
        if (b.type === Text) {
          const v = b.children;
          return typeof v == "string" && v.trim().length > 0;
        }
        return !!b.type;
      });
    }
    const u = $(() => a.collapsible ? a.lazyMount ? r.value : i.value : !0), f = $(() => a.loading && u.value), m = $(() => {
      if (a.collapsible && !i.value) return !1;
      const h = l.headerExport;
      return h ? c(h()) : !1;
    });
    Te(
      () => a.defaultOpen,
      (h) => {
        if (!a.collapsible) return;
        const b = o(h);
        i.value = b, b && (r.value = !0), s.value && s.value.open !== b && (s.value.open = b);
      }
    ), Je(() => {
      !a.collapsible || !s.value || (s.value.open = i.value);
    });
    function p(h) {
      const b = h.currentTarget;
      if (b?.tagName !== "DETAILS") return;
      const v = i.value, y = b.open;
      if (i.value = y, y && !v) {
        const w = !r.value;
        r.value = !0, w && n("open");
      }
      n("toggle", y);
    }
    return (h, b) => e.collapsible ? (g(), x("details", {
      key: 0,
      ref_key: "detailsRef",
      ref: s,
      class: "chart-metric-container metric-collapsible",
      open: i.value ? !0 : void 0,
      onToggle: p
    }, [
      d("summary", Dm, [
        d("div", Am, [
          d("div", Tm, [
            d("div", Bm, [
              d("div", Lm, [
                ke(h.$slots, "title", {}, () => [
                  e.title ? (g(), x("h3", Rm, A(e.title), 1)) : F("", !0)
                ], !0),
                e.subtitle ? (g(), x("p", Pm, A(e.subtitle), 1)) : F("", !0),
                ke(h.$slots, "headerAppend", {}, void 0, !0)
              ])
            ]),
            m.value ? (g(), x("div", Im, [
              ke(h.$slots, "headerExport", {}, void 0, !0)
            ])) : F("", !0)
          ]),
          h.$slots.headerAside ? (g(), x("div", Em, [
            ke(h.$slots, "headerAside", {}, void 0, !0)
          ])) : F("", !0)
        ]),
        b[0] || (b[0] = d("svg", {
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
      u.value ? (g(), x("div", Fm, [
        N(pt, {
          name: "chart-metric-fade",
          mode: "out-in"
        }, {
          default: O(() => [
            f.value ? (g(), x("div", Om, [
              ke(h.$slots, "loading", {}, () => [
                b[1] || (b[1] = d("div", {
                  class: "cmc-body-loading__skeleton ut-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1))
              ], !0)
            ])) : (g(), x("div", Vm, [
              ke(h.$slots, "default", {}, void 0, !0)
            ]))
          ]),
          _: 3
        })
      ])) : F("", !0)
    ], 40, Mm)) : (g(), x("div", zm, [
      d("div", Nm, [
        d("div", jm, [
          d("div", Hm, [
            d("div", Wm, [
              d("div", Km, [
                ke(h.$slots, "title", {}, () => [
                  e.title ? (g(), x("h3", Um, A(e.title), 1)) : F("", !0)
                ], !0),
                e.subtitle ? (g(), x("p", Ym, A(e.subtitle), 1)) : F("", !0),
                ke(h.$slots, "headerAppend", {}, void 0, !0)
              ])
            ]),
            m.value ? (g(), x("div", qm, [
              ke(h.$slots, "headerExport", {}, void 0, !0)
            ])) : F("", !0)
          ]),
          h.$slots.headerAside ? (g(), x("div", Xm, [
            ke(h.$slots, "headerAside", {}, void 0, !0)
          ])) : F("", !0)
        ])
      ]),
      u.value ? (g(), x("div", Gm, [
        N(pt, {
          name: "chart-metric-fade",
          mode: "out-in"
        }, {
          default: O(() => [
            f.value ? (g(), x("div", Zm, [
              ke(h.$slots, "loading", {}, () => [
                b[2] || (b[2] = d("div", {
                  class: "cmc-body-loading__skeleton ut-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1))
              ], !0)
            ])) : (g(), x("div", Qm, [
              ke(h.$slots, "default", {}, void 0, !0)
            ]))
          ]),
          _: 3
        })
      ])) : F("", !0)
    ]));
  }
}), Se = /* @__PURE__ */ be(Jm, [["__scopeId", "data-v-ade4038f"]]);
function ep(e, t) {
  return g(), x("svg", {
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
function lo(e, t) {
  return g(), x("svg", {
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
function Po(e, t) {
  return g(), x("svg", {
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
function lt(e, t) {
  return g(), x("svg", {
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
function tp(e, t) {
  return g(), x("svg", {
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
function ta(e, t) {
  return g(), x("svg", {
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
function Io(e, t) {
  return g(), x("svg", {
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
function Eo(e, t) {
  return g(), x("svg", {
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
function xr(e, t) {
  return g(), x("svg", {
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
function ap(e, t) {
  return g(), x("svg", {
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
function ci(e, t) {
  return g(), x("svg", {
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
function np(e, t) {
  return g(), x("svg", {
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
function di(e, t) {
  return g(), x("svg", {
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
function op(e, t) {
  return g(), x("svg", {
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
function Fo(e, t) {
  return g(), x("svg", {
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
function sp(e, t) {
  return g(), x("svg", {
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
function ip(e, t) {
  return g(), x("svg", {
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
function rp(e, t) {
  return g(), x("svg", {
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
function co(e, t) {
  return g(), x("svg", {
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
const lp = {
  key: 0,
  class: "footer-divider"
}, cp = {
  key: 0,
  class: "export-label"
}, dp = { class: "export-buttons" }, up = ["disabled"], hp = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, fp = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, gp = ["disabled"], mp = {
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
}, bp = /* @__PURE__ */ he({
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
    ), i = (l) => a.formats.includes(l), r = (l) => {
      a.loading || n("export", l);
    };
    return (l, c) => (g(), ae(ft(o.value), {
      class: Z(s.value)
    }, {
      default: O(() => [
        e.variant === "footer" ? (g(), x("div", lp)) : F("", !0),
        d("div", {
          class: Z(["export-actions", { "export-actions--inline": e.variant === "inline" }])
        }, [
          e.variant === "footer" ? (g(), x("span", cp, "Export")) : F("", !0),
          d("div", dp, [
            i("pdf") ? (g(), x("button", {
              key: 0,
              type: "button",
              class: Z(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download PDF",
              onClick: c[0] || (c[0] = (u) => r("pdf"))
            }, [
              e.loading ? (g(), x("svg", hp, [...c[2] || (c[2] = [
                d("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                d("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (g(), x("svg", fp, [...c[3] || (c[3] = [
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
            ], 10, up)) : F("", !0),
            i("csv") ? (g(), x("button", {
              key: 1,
              type: "button",
              class: Z(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download CSV",
              onClick: c[1] || (c[1] = (u) => r("csv"))
            }, [
              e.loading ? (g(), x("svg", mp, [...c[5] || (c[5] = [
                d("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                d("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (g(), x("svg", pp, [...c[6] || (c[6] = [
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
            ], 10, gp)) : F("", !0)
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), ze = /* @__PURE__ */ be(bp, [["__scopeId", "data-v-ebfab47f"]]), vp = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, yp = {
  key: "chart",
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, xp = { class: "w-full shrink-0 sm:pr-2" }, kp = {
  key: "empty",
  class: "flex min-h-[280px] w-full items-center justify-center"
}, _p = { class: "max-w-[360px] text-center" }, wp = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Cp = /* @__PURE__ */ he({
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
    }, o = e, s = a, i = (m) => {
      s("export", m);
    }, r = $e(o, "theme"), l = $e(o, "options"), { isDark: c } = Me(r), u = (m) => {
      const p = new Date(m), h = String(p.getDate()).padStart(2, "0"), b = String(p.getMonth() + 1).padStart(2, "0");
      return `${h}-${b}`;
    }, f = $(() => {
      const m = o.data?.agents_by_day || {}, p = Object.keys(m).sort();
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const h = p.map((_) => u(_)), b = /* @__PURE__ */ new Set();
      for (const _ of Object.values(m))
        for (const k of Object.keys(_))
          b.add(k);
      const v = Array.from(b), y = (_) => _, w = v.map((_) => ({
        label: _,
        data: p.map((k) => m[k]?.[_] || 0),
        backgroundColor: `${n[_] || "#94a3b8"}80`,
        borderColor: y(n[_] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: h,
        datasets: w
      };
    });
    return t({ isDark: c }), (m, p) => (g(), ae(Se, {
      title: "Agents Total Messages per Day",
      subtitle: "Daily agent interactions (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !e.loading ? (g(), ae(T(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", vp, [
          N(pt, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: O(() => [
              f.value.labels && f.value.labels.length ? (g(), x("section", yp, [
                d("div", xp, [
                  N(Mt, {
                    data: f.value,
                    stacked: !0,
                    theme: r.value,
                    options: l.value
                  }, null, 8, ["data", "theme", "options"])
                ])
              ])) : (g(), x("section", kp, [
                d("div", _p, [
                  d("div", wp, [
                    N(T(lt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                  ]),
                  p[0] || (p[0] = d("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No agents data per day ", -1)),
                  p[1] || (p[1] = d("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " Try adjusting the date range or check your filters to see daily agent interactions. ", -1))
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
}), $p = /* @__PURE__ */ be(Cp, [["__scopeId", "data-v-f8d0ec91"]]), Sp = { class: "flex w-full min-w-0 justify-center" }, Mp = { class: "flex max-w-full min-w-0 items-center gap-2" }, Dp = { class: "min-w-0 truncate text-[12px] leading-normal capitalize" }, Ap = { class: "text-[14px] font-bold leading-tight text-[color:var(--kiut-text-primary,#1e293b)]" }, Tp = {
  key: 0,
  class: "min-w-0 w-full truncate text-[10px] leading-normal"
}, Bp = /* @__PURE__ */ he({
  __name: "CardInfo",
  props: {
    color: {},
    title: {},
    value: {},
    subvalue: {}
  },
  setup(e) {
    return (t, a) => (g(), x("div", {
      class: Z(["card-info box-border flex w-full min-w-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl px-3 py-2 text-center font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[color:var(--kiut-text-secondary,#64748b)]", e.subvalue ? "h-[75px]" : "h-[58px]"])
    }, [
      d("div", Sp, [
        d("div", Mp, [
          e.color ? (g(), x("span", {
            key: 0,
            class: "inline-block h-2.5 w-2.5 shrink-0 rounded-full align-middle",
            style: Ce({ backgroundColor: e.color }),
            "aria-hidden": "true"
          }, null, 4)) : F("", !0),
          d("span", Dp, A(e.title), 1)
        ])
      ]),
      d("p", Ap, A(e.value), 1),
      e.subvalue ? (g(), x("p", Tp, A(e.subvalue), 1)) : F("", !0)
    ], 2));
  }
}), xe = /* @__PURE__ */ be(Bp, [["__scopeId", "data-v-0d546967"]]), kr = "inline-flex w-min max-w-full min-h-[22px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] font-semibold leading-snug tracking-tight";
function _r(e, t) {
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
const Lp = {
  key: 0,
  class: "relative flex h-2 w-2 shrink-0 items-center justify-center",
  "aria-hidden": "true"
}, Ge = /* @__PURE__ */ he({
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
      () => _r(t.color, t.outlined)
    );
    return (r, l) => a.value ? (g(), x("span", {
      key: 0,
      role: "status",
      class: Z(["inline-flex w-min max-w-full min-h-[22px] items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug", o.value])
    }, [
      e.statusLive === !0 ? (g(), x("span", Lp, [...l[0] || (l[0] = [
        d("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        d("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : F("", !0),
      d("span", {
        class: Z(["min-w-0 flex-1 text-center", s.value])
      }, A(n.value), 3)
    ], 2)) : (g(), x("span", {
      key: 1,
      class: Z([T(kr), i.value])
    }, [
      ke(r.$slots, "default", {}, () => [
        Ae(A(e.label), 1)
      ])
    ], 2));
  }
}), me = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), Ie = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), Ut = (e) => {
  if (e == null) return "0";
  const t = Math.abs(e), a = e < 0 ? "-" : "";
  return t >= 1e6 ? `${a}${(t / 1e6).toFixed(2)}M` : t > 99999 ? `${a}${(t / 1e3).toFixed(1)}K` : `${a}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(t)}`;
}, Rp = {
  class: "kiut-table-root table-section flex w-full min-w-0 flex-col rounded-xl font-sans antialiased text-[color:var(--kiut-text-primary,#1e293b)]",
  "data-component": "kiut-table"
}, Pp = { class: "overflow-x-auto" }, Ip = { class: "w-full table-auto border-collapse text-left text-[14px] leading-normal" }, Ep = ["aria-sort", "onClick"], Fp = {
  class: "kiut-table-sort-icons inline-flex items-center",
  "aria-hidden": "true"
}, Op = {
  key: 0,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, Vp = {
  key: 1,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, zp = /* @__PURE__ */ he({
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
    function i(k) {
      return k == null || k === "" ? s : String(k);
    }
    function r(k) {
      return k === "center" ? "text-center" : k === "right" ? "text-right" : "text-left";
    }
    function l(k) {
      return `cell-${k}`;
    }
    function c(k, C) {
      return k[C];
    }
    function u(k, C) {
      if (typeof a.rowKey == "function")
        return a.rowKey(k);
      const S = k[a.rowKey];
      return typeof S == "string" || typeof S == "number" ? S : C;
    }
    function f(k, C) {
      return u(k, C);
    }
    function m(k) {
      return a.sortKey === k && a.sortDirection != null;
    }
    function p(k) {
      n("sort", k);
    }
    function h(k) {
      return m(k) ? a.sortDirection === "asc" ? "ascending" : "descending" : "none";
    }
    const b = $(() => a.rows?.length ?? 0), v = $(() => b.value > a.maxVisibleRows), y = $(() => Math.max(0, b.value - a.maxVisibleRows)), w = $(() => a.rows?.length ? o.value || !v.value ? a.rows : a.rows.slice(0, a.maxVisibleRows) : []), _ = $(
      () => a.viewMoreLabel.replace(/\{count\}/g, String(y.value))
    );
    return (k, C) => (g(), x("div", Rp, [
      d("div", Pp, [
        d("table", Ip, [
          d("thead", null, [
            d("tr", null, [
              (g(!0), x(ue, null, pe(e.columns, (S) => (g(), x("th", {
                key: S.key,
                scope: "col",
                class: Z(["kiut-table-th whitespace-nowrap px-3 py-2 text-left text-[#9191a1]", [r(S.align), S.headerClass]])
              }, [
                S.sortable ? (g(), x("button", {
                  key: 0,
                  type: "button",
                  class: Z(["kiut-table-sort-btn inline-flex items-center gap-1", r(S.align)]),
                  "aria-sort": h(S.key),
                  onClick: (M) => p(S.key)
                }, [
                  d("span", null, A(S.label), 1),
                  d("span", Fp, [
                    m(S.key) ? (g(), x(ue, { key: 0 }, [
                      e.sortDirection === "asc" ? (g(), x("span", Op, "↑")) : e.sortDirection === "desc" ? (g(), x("span", Vp, "↓")) : F("", !0)
                    ], 64)) : (g(), x(ue, { key: 1 }, [
                      C[1] || (C[1] = d("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      C[2] || (C[2] = d("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, Ep)) : (g(), x(ue, { key: 1 }, [
                  Ae(A(S.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          d("tbody", null, [
            (g(!0), x(ue, null, pe(w.value, (S, M) => (g(), x("tr", {
              key: f(S, M)
            }, [
              (g(!0), x(ue, null, pe(e.columns, (R) => (g(), x("td", {
                key: `${M}-${R.key}`,
                class: Z(["kiut-table-td px-3 py-2 text-[color:var(--kiut-text-primary,#1e293b)]", [r(R.align), R.cellClass]])
              }, [
                ke(k.$slots, l(R.key), {
                  row: S,
                  column: R,
                  value: c(S, R.key)
                }, () => [
                  Ae(A(i(c(S, R.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ]),
      v.value ? (g(), x("button", {
        key: 0,
        type: "button",
        class: "view-more-btn",
        onClick: C[0] || (C[0] = (S) => o.value = !o.value)
      }, [
        Ae(A(o.value ? e.viewLessLabel : _.value) + " ", 1),
        (g(), x("svg", {
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
}), gt = /* @__PURE__ */ be(zp, [["__scopeId", "data-v-22a97a18"]]), Np = {
  key: "error",
  class: "error-state"
}, jp = { class: "error-content" }, Hp = { class: "error-description" }, Wp = {
  key: "content",
  class: "card-body"
}, Kp = { class: "chart-section" }, Up = { class: "chart-wrapper" }, Yp = { class: "payment-success-summary" }, qp = {
  key: 0,
  class: "booking-daily-section"
}, Xp = { class: "w-full min-w-0" }, Gp = { class: "font-medium" }, Zp = { class: "percentage-text" }, Qp = { class: "badges-container" }, Jp = {
  key: 0,
  class: "badges-container"
}, e0 = {
  key: 1,
  class: "percentage-text"
}, t0 = { class: "badges-container" }, a0 = {
  key: 1,
  class: "empty-state"
}, n0 = /* @__PURE__ */ he({
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
    function a(y) {
      return y;
    }
    const n = e, o = t, s = (y) => {
      o("export", y);
    }, i = $(() => n.data?.booking_manager_by_day ? [...n.data.booking_manager_by_day].sort(
      (y, w) => new Date(y.date).getTime() - new Date(w.date).getTime()
    ) : []), r = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "paymentInitiated", label: "Payment Initiated", align: "center" },
      { key: "paymentResults", label: "Payment Results", align: "left" },
      { key: "paymentValue", label: "Payment Value", align: "left" },
      { key: "outcomes", label: "Outcomes", align: "left" }
    ], l = $(
      () => i.value.map((y) => ({
        id: y.date,
        ...y
      }))
    ), c = $(() => n.data?.total_payment_success_value || []), u = $(() => {
      const y = c.value;
      return y.length === 0 ? h(0) : y.map(
        (w) => `${w.currency} ${h(w.total_value)}`
      ).join(" · ");
    }), f = (y) => y.payment_success_value || [], m = (y) => typeof y.payment_success_count == "number" ? y.payment_success_count : (y.payment_success_value || []).reduce(
      (w, _) => w + (_.count || 0),
      0
    ), p = (y) => Ie(y), h = (y) => y == null ? "0" : Ut(y);
    $(() => (n.data?.total_payment_success_value || []).reduce(
      (y, w) => y + (w.total_value || 0),
      0
    ));
    const b = $(() => {
      const y = n.data, w = y.total_booking_initiated || 0, _ = y.total_booking_started || 0, k = y.total_payment_initiated || 0, C = y.total_not_found || 0, S = y.total_cancelled || 0, M = y.total_no_pending_balance || 0, R = y.total_errors || 0, V = typeof y.total_payment_success == "number" ? y.total_payment_success : (y.total_payment_success_value || []).reduce(
        (Q, le) => Q + (le.count || 0),
        0
      ), W = y.total_payment_failed || 0, D = Math.max(0, w - _), I = Math.max(
        0,
        _ - k - C - S - M - R
      ), B = (Q, le) => ye(Q, le), j = [
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
        label: B(_, w)
      }), D > 0 && H.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: D,
        label: B(D, w)
      }), k > 0 && H.push({
        source: "Started",
        target: "Payment Initiated",
        value: k,
        label: B(k, w)
      }), C > 0 && H.push({
        source: "Started",
        target: "Not Found",
        value: C,
        label: B(C, w)
      }), S > 0 && H.push({
        source: "Started",
        target: "Cancelled",
        value: S,
        label: B(S, w)
      }), M > 0 && H.push({
        source: "Started",
        target: "No Pending Balance",
        value: M,
        label: B(M, w)
      }), R > 0 && H.push({
        source: "Started",
        target: "Errors",
        value: R,
        label: B(R, w)
      }), I > 0 && H.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: I,
        label: B(I, w)
      }), V > 0 && H.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: V,
        label: B(V, w)
      }), W > 0 && H.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: W,
        label: B(W, w)
      }), { nodes: j, links: H };
    }), v = (y, w) => It(y, w);
    return (y, w) => (g(), ae(Se, {
      class: "booking-manager-root h-full min-h-0",
      title: "Booking Manager Metrics",
      subtitle: "Booking manager workflow tracking and analysis",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: w[0] || (w[0] = (_) => o("open"))
    }, {
      headerExport: O(() => [
        e.enableExport && !n.loading && !n.error ? (g(), ae(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        N(pt, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: O(() => [
            n.error ? (g(), x("div", Np, [
              d("div", jp, [
                w[1] || (w[1] = d("div", { class: "error-icon-wrapper" }, [
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
                w[2] || (w[2] = d("p", { class: "error-title" }, "Error loading data", -1)),
                d("p", Hp, A(n.error), 1)
              ])
            ])) : (g(), x("div", Wp, [
              d("section", Kp, [
                d("div", Up, [
                  N(aa, {
                    data: b.value,
                    height: "400px",
                    "use-gradient": !1,
                    "node-gap": 16
                  }, null, 8, ["data"])
                ])
              ]),
              d("section", Yp, [
                N(xe, {
                  color: "#22c55e",
                  title: "Payment Success Value",
                  value: u.value
                }, null, 8, ["value"])
              ]),
              i.value.length > 0 ? (g(), x("section", qp, [
                w[3] || (w[3] = d("div", { class: "section-header" }, [
                  d("h4", { class: "section-title" }, "Daily Overview")
                ], -1)),
                d("div", Xp, [
                  N(gt, {
                    columns: r,
                    rows: l.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": O(({ row: _ }) => [
                      d("span", Gp, A(T(He)(String(_.date)).format("MMM DD")), 1)
                    ]),
                    "cell-initiated": O(({ row: _ }) => [
                      d("span", null, A(T(me)(Number(_.booking_initiated_count))), 1)
                    ]),
                    "cell-started": O(({ row: _ }) => [
                      d("span", null, [
                        Ae(A(T(me)(Number(_.booking_started_count))) + " ", 1),
                        d("span", Zp, " (" + A(v(
                          Number(_.booking_started_count),
                          Number(_.booking_initiated_count)
                        )) + ") ", 1)
                      ])
                    ]),
                    "cell-paymentInitiated": O(({ row: _ }) => [
                      d("span", null, A(T(me)(Number(_.payment_initiated_count))), 1)
                    ]),
                    "cell-paymentResults": O(({ row: _ }) => [
                      d("div", Qp, [
                        N(Ge, { color: "success" }, {
                          default: O(() => [
                            Ae(" Success: " + A(T(me)(
                              m(_)
                            )), 1)
                          ]),
                          _: 2
                        }, 1024),
                        N(Ge, { color: "danger" }, {
                          default: O(() => [
                            Ae(" Failed: " + A(T(me)(Number(_.payment_failed_count) || 0)), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    "cell-paymentValue": O(({ row: _ }) => [
                      f(_).length > 0 ? (g(), x("div", Jp, [
                        (g(!0), x(ue, null, pe(f(
                          _
                        ), (k) => (g(), x("span", {
                          key: `${_.date}-${k.currency}`,
                          class: "badge badge-currency"
                        }, A(k.currency) + " " + A(p(k.total_value)), 1))), 128))
                      ])) : (g(), x("span", e0, "N/A"))
                    ]),
                    "cell-outcomes": O(({ row: _ }) => [
                      d("div", t0, [
                        N(Ge, { color: "danger" }, {
                          default: O(() => [
                            Ae(" Not Found: " + A(_.not_found_count ? T(me)(Number(_.not_found_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        N(Ge, { color: "warning" }, {
                          default: O(() => [
                            Ae(" Cancelled: " + A(_.cancelled_count ? T(me)(Number(_.cancelled_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        N(Ge, { color: "orange" }, {
                          default: O(() => [
                            Ae(" No Balance: " + A(_.no_pending_balance_count ? T(me)(Number(_.no_pending_balance_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        N(Ge, { color: "danger" }, {
                          default: O(() => [
                            Ae(" Errors: " + A(_.error_count ? T(me)(Number(_.error_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (g(), x("section", a0, [...w[4] || (w[4] = [
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
}), o0 = /* @__PURE__ */ be(n0, [["__scopeId", "data-v-d68eddff"]]), s0 = { class: "card-body" }, i0 = {
  key: 0,
  class: "chart-section"
}, r0 = { class: "chart-wrapper" }, l0 = {
  key: 1,
  class: "checkin-daily-section"
}, c0 = { class: "w-full min-w-0" }, d0 = { class: "font-medium" }, u0 = { class: "cell-success" }, h0 = { class: "cell-danger" }, f0 = {
  key: 0,
  class: "reasons-list"
}, g0 = { class: "reason-name" }, m0 = { class: "reason-count" }, p0 = {
  key: 1,
  class: "no-reasons"
}, b0 = {
  key: 2,
  class: "empty-state"
}, v0 = {
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
    const a = t, n = (k) => {
      a("export", k);
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
    }, r = ne([]), l = [
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
      () => o.showPaymentLinks ? [...l, c] : l
    ), f = $(
      () => (r.value || []).map((k) => ({
        id: k.date,
        date: k.date,
        checkin_initiated_count: k.checkin_initiated_count,
        checkin_init_count: k.checkin_init_count,
        checkin_started_count: k.checkin_started_count,
        checkin_completed_count: k.checkin_completed_count,
        checkin_closed_count: k.checkin_closed_count,
        failed_steps: k.failed_steps,
        record_locator_create_payment_count: k.record_locator_create_payment_count
      }))
    ), m = $(() => {
      const k = o.data;
      return k && (Array.isArray(k.checkin_by_day) && k.checkin_by_day.length > 0 || (k.total_checkin_initiated ?? 0) > 0) ? { ...s, ...k } : o.checkinData ?? s;
    }), p = $(() => {
      const k = o.data;
      return k && (Array.isArray(k.failed_by_step_by_day) && k.failed_by_step_by_day.length > 0 || Array.isArray(k.unrecovered_by_step) && k.unrecovered_by_step.length > 0) ? {
        ...i,
        total_checkin_failed: k.total_checkin_failed ?? 0,
        total_checkin_unrecovered: k.total_checkin_unrecovered ?? 0,
        failed_by_step_by_day: k.failed_by_step_by_day ?? [],
        unrecovered_by_step: k.unrecovered_by_step ?? [],
        unrecovered_by_day: k.unrecovered_by_day ?? []
      } : o.failedData ?? i;
    }), h = (k, C) => !C || C === 0 ? "0.0%" : It(k, C), b = (k, C) => {
      const S = me(k), M = h(k, C);
      return `${S} (${M})`;
    }, v = (k) => k.reduce((C, S) => C + S.failed_count, 0), y = $(() => {
      const k = [], C = [], S = /* @__PURE__ */ new Set(), M = (ee, X = {}) => {
        S.has(ee) || (k.push({ name: ee, ...X }), S.add(ee));
      };
      if (!m.value.total_checkin_initiated)
        return { nodes: k, links: C };
      M("Checkin Init", { value: m.value.total_checkin_initiated }), M("Booking retrive"), M("Booking retrive success"), M("Number of Passengers"), M("Completed"), M("Closed with BP");
      const R = m.value.total_checkin_initiated, V = m.value.total_checkin_init, W = m.value.total_checkin_init_abandoned || 0, D = m.value.total_checkin_pre_init_abandoned_error, I = m.value.total_checkin_pre_init_abandoned_voluntary, B = D != null || I != null, j = B ? Math.max(Number(D) || 0, 0) : 0, H = B ? Math.max(Number(I) || 0, 0) : 0, Q = m.value.total_checkin_init_abandoned_error, le = m.value.total_checkin_init_abandoned_voluntary, fe = Q != null || le != null, G = fe ? Math.max(Number(Q) || 0, 0) : 0, oe = fe ? Math.max(Number(le) || 0, 0) : 0, L = fe ? Math.max(W - G - oe, 0) : W, U = V - W, Y = m.value.total_checkin_started, z = m.value.total_checkin_completed, re = m.value.total_checkin_closed, ce = p.value.unrecovered_by_step || [], ve = ce.reduce(
        (ee, X) => ee + X.count,
        0
      );
      V > 0 && C.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: V,
        label: ye(V, R)
      });
      const K = R - V;
      B ? (H > 0 && (M("Abandoned (Init)", { status: "abandon" }), C.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: H,
        label: ye(H, R)
      })), j > 0 && (M("Booking not retreived", { status: "error" }), C.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: j,
        label: ye(j, R)
      }))) : K > 0 && (M("Abandoned (Init)", { status: "abandon" }), C.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: K,
        label: ye(K, R)
      })), fe ? (G > 0 && (M("Error", { status: "error" }), C.push({
        source: "Booking retrive",
        target: "Error",
        value: G,
        label: ye(G, R)
      })), oe > 0 && (M("Abandoned (Started)", { status: "abandon" }), C.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: oe,
        label: ye(oe, R)
      })), L > 0 && (M("Abandoned (Started)", { status: "abandon" }), C.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: L,
        label: ye(L, R)
      }))) : W > 0 && (M("Abandoned (Started)", { status: "abandon" }), C.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: W,
        label: ye(W, R)
      })), U > 0 && C.push({
        source: "Booking retrive",
        target: "Booking retrive success",
        value: U,
        label: ye(U, R)
      }), Y > 0 && C.push({
        source: "Booking retrive success",
        target: "Number of Passengers",
        value: Y,
        label: ye(Y, R)
      }), z > 0 && C.push({
        source: "Number of Passengers",
        target: "Completed",
        value: z,
        label: ye(z, R)
      }), ce.length > 0 && ve > 0 && (M("Unrecovered", { status: "error" }), C.push({
        source: "Number of Passengers",
        target: "Unrecovered",
        value: ve,
        label: ye(ve, R)
      }), ce.forEach((ee, X) => {
        const q = ee.step_name.replace(/_/g, " ").split(" ").map((te) => te.charAt(0).toUpperCase() + te.slice(1)).join(" ");
        M(q, { status: "error", order: X + 1 }), C.push({
          source: "Unrecovered",
          target: q,
          value: ee.count,
          label: ye(ee.count, R)
        });
      }));
      const ie = Y - (z + ve);
      ie > 0 && (M("Abandoned (Flow)", { status: "abandon" }), C.push({
        source: "Number of Passengers",
        target: "Abandoned (Flow)",
        value: ie,
        label: ye(ie, R)
      }));
      const de = z - re;
      return de > 0 && (M("BP Error", { status: "error", order: 0 }), C.push({
        source: "Completed",
        target: "BP Error",
        value: de,
        label: ye(de, R)
      })), re > 0 && C.push({
        source: "Completed",
        target: "Closed with BP",
        value: re,
        label: ye(re, R)
      }), { nodes: k, links: C };
    }), w = () => {
      const k = o.data?.record_locator_by_day;
      if (Array.isArray(k) && k.length > 0) return k;
      const C = o.checkinData?.record_locator_by_day;
      return Array.isArray(C) && C.length > 0 ? C : [];
    }, _ = () => {
      const k = m.value.checkin_by_day || [], C = p.value.failed_by_step_by_day || [], S = w();
      if (k.length === 0) {
        r.value = [];
        return;
      }
      r.value = [...k].map((M) => {
        const R = C.find(
          (W) => W.date === M.date
        ), V = S.find(
          (W) => W.date === M.date
        );
        return {
          ...M,
          failed_steps: R?.steps || [],
          record_locator_create_payment_count: M.record_locator_create_payment_count ?? V?.record_locator_create_payment_count ?? 0
        };
      }), r.value.sort((M, R) => new Date(M.date) - new Date(R.date));
    };
    return Te(
      [() => o.data, () => o.checkinData, () => o.failedData],
      () => {
        _();
      },
      { deep: !0, immediate: !0 }
    ), (k, C) => (g(), ae(Se, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !e.loading ? (g(), ae(T(ze), {
          key: 0,
          variant: "inline",
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", s0, [
          y.value.nodes.length > 0 ? (g(), x("section", i0, [
            d("div", r0, [
              N(aa, {
                data: y.value,
                height: "400px",
                "use-gradient": !1,
                "node-gap": 16
              }, null, 8, ["data"])
            ])
          ])) : F("", !0),
          r.value && r.value.length > 0 ? (g(), x("section", l0, [
            d("div", c0, [
              N(gt, {
                columns: u.value,
                rows: f.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": O(({ row: S }) => [
                  d("span", d0, A(T(He)(String(S.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": O(({ row: S }) => [
                  d("span", null, A(T(me)(S.checkin_initiated_count)), 1)
                ]),
                "cell-bookingRetrieve": O(({ row: S }) => [
                  d("span", null, A(b(
                    S.checkin_init_count,
                    S.checkin_initiated_count
                  )), 1)
                ]),
                "cell-passengers": O(({ row: S }) => [
                  d("span", null, A(T(me)(S.checkin_started_count)), 1)
                ]),
                "cell-completed": O(({ row: S }) => [
                  d("span", null, A(b(
                    S.checkin_completed_count,
                    S.checkin_initiated_count
                  )), 1)
                ]),
                "cell-closed": O(({ row: S }) => [
                  d("span", u0, A(b(
                    S.checkin_closed_count,
                    S.checkin_initiated_count
                  )), 1)
                ]),
                "cell-failed": O(({ row: S }) => [
                  d("span", h0, A(b(
                    v(S.failed_steps),
                    S.checkin_initiated_count
                  )), 1)
                ]),
                "cell-reasons": O(({ row: S }) => [
                  S.failed_steps && S.failed_steps.length > 0 ? (g(), x("div", f0, [
                    (g(!0), x(ue, null, pe(S.failed_steps, (M) => (g(), x("div", {
                      key: M.step_name,
                      class: "reason-item"
                    }, [
                      d("span", g0, A(M.step_name.replace(/_/g, " ")) + ":", 1),
                      d("span", m0, A(M.failed_count), 1)
                    ]))), 128))
                  ])) : (g(), x("div", p0, "-"))
                ]),
                "cell-createPayment": O(({ row: S }) => [
                  d("span", null, A(T(me)(S.record_locator_create_payment_count ?? 0)), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (g(), x("section", b0, [...C[0] || (C[0] = [
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
}, y0 = /* @__PURE__ */ be(v0, [["__scopeId", "data-v-ae5fc0f7"]]), x0 = { class: "card-body" }, k0 = {
  key: 0,
  class: "sankey-section"
}, _0 = {
  key: 1,
  class: "checkin-metrics-daily-section"
}, w0 = { class: "w-full min-w-0" }, C0 = { class: "font-medium whitespace-nowrap" }, $0 = { class: "cell-success" }, S0 = { class: "cell-danger" }, M0 = {
  key: 0,
  class: "reasons-list"
}, D0 = { class: "reason-name" }, A0 = { class: "reason-count" }, T0 = {
  key: 1,
  class: "no-reasons"
}, B0 = {
  key: 2,
  class: "empty-state"
}, L0 = { class: "empty-state-content" }, R0 = { class: "empty-icon-wrapper" }, P0 = /* @__PURE__ */ he({
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
    }, { isDark: i } = Me($e(n, "theme")), r = (C) => C == null ? "0" : C.toLocaleString(), l = (C) => {
      const [S, M, R] = C.split("-").map(Number);
      return He([S, M - 1, R]).format("MMM DD");
    }, c = (C) => C.replace(/_/g, " ").replace(/\b\w/g, (S) => S.toUpperCase()), u = (C, S) => It(C, S), f = (C, S) => {
      const M = C || 0, R = S || 0, V = r(M), W = u(M, R);
      return `${V} (${W})`;
    }, m = $(() => {
      const C = n.checkinData?.record_locator_by_day || [], S = n.failedData?.failed_by_step_by_day || [], M = n.failedData?.unrecovered_by_day || [];
      return C.map((V) => {
        const W = S.find((I) => I.date === V.date), D = M.find(
          (I) => I.date === V.date
        );
        return {
          ...V,
          failed_steps: W?.steps || [],
          unrecovered_count: D?.unrecovered_count || 0
        };
      }).sort(
        (V, W) => new Date(V.date).getTime() - new Date(W.date).getTime()
      );
    }), p = /* @__PURE__ */ new Set([
      "choose_boardingpass",
      "boarding_pass",
      "generate_boarding_pass"
    ]), h = (C) => {
      if (!C) return !1;
      const S = C.toLowerCase().trim();
      return p.has(S) || S.includes("boarding_pass");
    }, b = (C) => {
      const S = C?.failed_by_step_by_day || [];
      let M = 0;
      for (const R of S)
        for (const V of R.steps || [])
          h(V.step_name) && (M += V.failed_count || 0);
      if (M > 0) return M;
      for (const R of C?.unrecovered_by_step || [])
        h(R.step_name) && (M += R.count || 0);
      return M;
    }, v = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieval", label: "Booking Retrieval (%)", align: "center" },
      { key: "bookingRetrieved", label: "Booking Retrieved", align: "center" },
      { key: "closed", label: "Check-in Closed (%)", align: "center" },
      { key: "completed", label: "BP Issued (%)", align: "center" },
      { key: "failed", label: "Errors (%)", align: "center" },
      { key: "reasons", label: "Failed (Reasons)", align: "left" }
    ], y = {
      key: "createPayment",
      label: "Create Payment",
      align: "center"
    }, w = $(() => n.isAvianca ? [...v, y] : v), _ = $(
      () => m.value.map((C) => ({
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
    ), k = $(() => {
      const C = [], S = [], M = /* @__PURE__ */ new Set(), R = (q, te = {}) => {
        M.has(q) || (C.push({ name: q, ...te }), M.add(q));
      };
      if (!n.checkinData?.total_checkin_initiated)
        return { nodes: C, links: S };
      const V = n.checkinData.total_checkin_initiated || 0;
      R("Checkin Init", { value: V }), R("Booking Retrieval"), R("Booking Retrieved"), R("Check-in Closed"), R("BP Issued");
      const W = n.checkinData.total_record_locator_init || 0, D = n.checkinData.total_record_locator_init_abandoned || 0, I = n.checkinData.total_checkin_pre_init_abandoned_error, B = n.checkinData.total_checkin_pre_init_abandoned_voluntary, j = I != null || B != null, H = j ? Math.max(Number(I) || 0, 0) : 0, Q = j ? Math.max(Number(B) || 0, 0) : 0, le = n.checkinData.total_record_locator_init_abandoned_error, fe = n.checkinData.total_record_locator_init_abandoned_voluntary, G = le != null || fe != null, oe = G ? Math.max(Number(le) || 0, 0) : 0, L = G ? Math.max(Number(fe) || 0, 0) : 0, U = G ? Math.max(D - oe - L, 0) : D, Y = W - D, z = n.checkinData.total_record_locator_started || 0, re = n.checkinData.total_record_locator_completed || 0, ce = n.checkinData.total_record_locator_closed || 0, ve = n.checkinData.total_record_locator_unrecovered || 0;
      W > 0 && S.push({
        source: "Checkin Init",
        target: "Booking Retrieval",
        value: W,
        label: ye(W, V)
      });
      const K = V - W;
      j ? (Q > 0 && (R("Abandoned (Init)"), S.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: Q,
        label: ye(Q, V)
      })), H > 0 && (R("Booking not retreived"), S.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: H,
        label: ye(H, V)
      }))) : K > 0 && (R("Abandoned (Init)"), S.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: K,
        label: ye(K, V)
      }));
      const ie = n.isAvianca ? "Abandoned (Booking)" : "Abandoned (Started)";
      G ? (oe > 0 && (R("Error"), S.push({
        source: "Booking Retrieval",
        target: "Error",
        value: oe,
        label: ye(oe, V)
      })), L > 0 && (R(ie, { status: "abandon" }), S.push({
        source: "Booking Retrieval",
        target: ie,
        value: L,
        label: ye(L, V)
      })), U > 0 && (R(ie, { status: "abandon" }), S.push({
        source: "Booking Retrieval",
        target: ie,
        value: U,
        label: ye(U, V)
      }))) : D > 0 && (R(ie, { status: "abandon" }), S.push({
        source: "Booking Retrieval",
        target: ie,
        value: D,
        label: ye(D, V)
      })), Y > 0 && S.push({
        source: "Booking Retrieval",
        target: "Booking Retrieved",
        value: Y,
        label: ye(Y, V)
      }), ce > 0 && S.push({
        source: "Booking Retrieved",
        target: "Check-in Closed",
        value: ce,
        label: ye(ce, V)
      });
      const de = b(n.failedData), ee = Math.min(de, Math.max(ce - re, 0));
      re > 0 && S.push({
        source: "Check-in Closed",
        target: "BP Issued",
        value: re,
        label: ye(re, V)
      }), ee > 0 && (R("BP Error", { status: "error" }), S.push({
        source: "Check-in Closed",
        target: "BP Error",
        value: ee,
        label: ye(ee, V)
      }));
      const X = Math.max(ce - re - ee, 0);
      X > 0 && (R("Abandoned after Closed", { status: "abandon" }), S.push({
        source: "Check-in Closed",
        target: "Abandoned after Closed",
        value: X,
        label: ye(X, V)
      })), ve > 0 && (R("Errors", { status: "error" }), S.push({
        source: "Booking Retrieved",
        target: "Errors",
        value: ve,
        label: ye(ve, V)
      }));
      const P = Math.max(z - ce - ve, 0);
      return P > 0 && (R("Abandoned before Closed", { status: "abandon" }), S.push({
        source: "Booking Retrieved",
        target: "Abandoned before Closed",
        value: P,
        label: ye(P, V)
      })), { nodes: C, links: S };
    });
    return t({ isDark: i }), (C, S) => (g(), ae(Se, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      collapsible: e.collapsible,
      "default-open": n.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !e.loading ? (g(), ae(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", x0, [
          k.value.nodes.length > 0 ? (g(), x("div", k0, [
            N(aa, {
              data: k.value,
              height: "400px",
              "use-gradient": !1,
              "node-gap": 16
            }, null, 8, ["data"])
          ])) : F("", !0),
          m.value && m.value.length > 0 ? (g(), x("div", _0, [
            d("div", w0, [
              N(gt, {
                columns: w.value,
                rows: _.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": O(({ row: M }) => [
                  d("span", C0, A(l(String(M.date))), 1)
                ]),
                "cell-checkinInit": O(({ row: M }) => [
                  d("span", null, A(r(M.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieval": O(({ row: M }) => [
                  d("span", null, A(f(
                    M.record_locator_init_count,
                    M.checkin_initiated
                  )), 1)
                ]),
                "cell-bookingRetrieved": O(({ row: M }) => [
                  d("span", null, A(f(
                    M.record_locator_started_count,
                    M.checkin_initiated
                  )), 1)
                ]),
                "cell-closed": O(({ row: M }) => [
                  d("span", null, A(f(
                    M.record_locator_closed_count,
                    M.checkin_initiated
                  )), 1)
                ]),
                "cell-completed": O(({ row: M }) => [
                  d("span", $0, A(f(
                    M.record_locator_completed_count,
                    M.checkin_initiated
                  )), 1)
                ]),
                "cell-failed": O(({ row: M }) => [
                  d("span", S0, A(f(
                    M.unrecovered_count,
                    M.checkin_initiated
                  )), 1)
                ]),
                "cell-createPayment": O(({ row: M }) => [
                  d("span", null, A(r(
                    M.record_locator_create_payment_count ?? 0
                  )), 1)
                ]),
                "cell-reasons": O(({ row: M }) => [
                  Array.isArray(M.failed_steps) && M.failed_steps.length > 0 ? (g(), x("div", M0, [
                    (g(!0), x(ue, null, pe(M.failed_steps, (R) => (g(), x("div", {
                      key: R.step_name,
                      class: "reason-item"
                    }, [
                      d("span", D0, A(c(R.step_name)) + ":", 1),
                      d("span", A0, A(R.failed_count), 1)
                    ]))), 128))
                  ])) : (g(), x("div", T0, "-"))
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (g(), x("div", B0, [
            d("div", L0, [
              d("div", R0, [
                N(T(lt), { class: "empty-icon" })
              ]),
              S[0] || (S[0] = d("p", { class: "empty-title" }, "No check-in data available", -1)),
              S[1] || (S[1] = d("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see check-in metrics. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["collapsible", "default-open", "loading"]));
  }
}), wr = /* @__PURE__ */ be(P0, [["__scopeId", "data-v-bdd4eaca"]]), I0 = { class: "card-body" }, E0 = {
  key: 0,
  class: "checkin-segments-daily-section"
}, F0 = { class: "w-full min-w-0" }, O0 = { class: "segment-plain" }, V0 = { class: "segment-plain" }, z0 = { class: "segment-plain" }, N0 = { class: "percentage-value" }, j0 = { class: "percentage-value" }, H0 = { class: "percentage-value success" }, W0 = {
  key: 1,
  class: "empty-state"
}, K0 = /* @__PURE__ */ he({
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
    const n = e, o = a, s = (m) => {
      o("export", m);
    }, { isDark: i } = Me($e(n, "theme")), r = [
      { key: "departure", label: "Departure", align: "center" },
      { key: "connection", label: "Connection", align: "center" },
      { key: "arrival", label: "Arrival", align: "center" },
      { key: "trip", label: "Trip", align: "center" },
      { key: "init", label: "Init", align: "center" },
      { key: "started", label: "Started (%)", align: "center" },
      { key: "closed", label: "Check-in Closed (%)", align: "center" },
      { key: "completed", label: "BP Issued (%)", align: "center" }
    ], l = $(
      () => n.data.map((m, p) => ({
        id: `segment-${p}-${m.departure_airport}-${m.arrival_airport}-${m.segment_init_count}-${m.segment_started_count}`,
        departure_airport: m.departure_airport,
        conexion_airport: m.conexion_airport,
        arrival_airport: m.arrival_airport,
        segment_init_count: m.segment_init_count,
        segment_started_count: m.segment_started_count,
        segment_completed_count: m.segment_completed_count,
        segment_closed_count: m.segment_closed_count
      }))
    ), c = (m, p) => !p || p === 0 || !m ? "0%" : `${Math.round(m / p * 100)}%`, u = (m) => !m || m === "None" ? "-" : String(m).trim().replace(/_[0-9]+$/i, ""), f = (m) => {
      const p = u(m?.departure_airport), h = u(m?.arrival_airport);
      return p === "-" || h === "-" ? !1 : p === h;
    };
    return t({ isDark: i }), (m, p) => (g(), ae(Se, {
      class: "checkin-segments-root h-full min-h-0",
      title: "Checkin Segments",
      subtitle: "Breakdown by flight segment with connection when applicable",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !n.loading ? (g(), ae(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", I0, [
          n.data.length > 0 ? (g(), x("section", E0, [
            d("div", F0, [
              N(gt, {
                columns: r,
                rows: l.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-departure": O(({ row: h }) => [
                  d("span", O0, A(u(h.departure_airport)), 1)
                ]),
                "cell-connection": O(({ row: h }) => [
                  d("span", {
                    class: Z(["segment-plain", {
                      "segment-plain--muted": u(h.conexion_airport) === "-"
                    }])
                  }, A(u(h.conexion_airport)), 3)
                ]),
                "cell-arrival": O(({ row: h }) => [
                  d("span", V0, A(u(h.arrival_airport)), 1)
                ]),
                "cell-trip": O(({ row: h }) => [
                  d("span", z0, A(f(h) ? "Roundtrip" : "One way"), 1)
                ]),
                "cell-init": O(({ row: h }) => [
                  Ae(A(T(me)(h.segment_init_count)), 1)
                ]),
                "cell-started": O(({ row: h }) => [
                  d("span", N0, A(c(
                    h.segment_started_count,
                    h.segment_init_count
                  )), 1)
                ]),
                "cell-closed": O(({ row: h }) => [
                  d("span", j0, A(c(
                    h.segment_closed_count,
                    h.segment_init_count
                  )), 1)
                ]),
                "cell-completed": O(({ row: h }) => [
                  d("span", H0, A(c(
                    h.segment_completed_count,
                    h.segment_init_count
                  )), 1)
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (g(), x("section", W0, [...p[0] || (p[0] = [
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
}), Cr = /* @__PURE__ */ be(K0, [["__scopeId", "data-v-9a9d7a34"]]), U0 = { class: "checkin-container__body" }, Y0 = /* @__PURE__ */ he({
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
    return (c, u) => (g(), ae(Se, {
      class: "checkin-container-root w-full",
      title: "Check in",
      subtitle: "Check-in flows and segment breakdown.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: u[1] || (u[1] = (f) => n("open"))
    }, {
      default: O(() => [
        d("div", U0, [
          e.showCheckin ? (g(), ae(wr, {
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
          N(Cr, {
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
}), q0 = /* @__PURE__ */ be(Y0, [["__scopeId", "data-v-bedc6aa8"]]), X0 = { class: "card-body" }, G0 = { class: "chart-section" }, Z0 = { class: "chart-wrapper" }, Q0 = {
  key: 1,
  class: "empty-chart"
}, J0 = { class: "payment-success-summary" }, eb = {
  key: 0,
  class: "disruption-daily-section"
}, tb = { class: "w-full min-w-0" }, ab = { class: "font-medium text-center" }, nb = { class: "text-center" }, ob = { class: "text-center" }, sb = { class: "percentage-text" }, ib = { class: "text-center" }, rb = { class: "abandoned-value" }, lb = { class: "badges-container badges-wrap" }, cb = { class: "badges-container badges-wrap" }, db = {
  key: 1,
  class: "empty-state"
}, ub = /* @__PURE__ */ he({
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
    function a(v) {
      return v;
    }
    const n = e, o = t, s = (v) => {
      o("export", v);
    }, i = $(() => n.data?.disruption_by_day ? [...n.data.disruption_by_day].sort(
      (v, y) => new Date(v.date).getTime() - new Date(y.date).getTime()
    ) : []), r = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "abandoned", label: "Abandoned (%)", align: "center" },
      { key: "voluntary", label: "Voluntary", align: "left" },
      { key: "involuntary", label: "Involuntary", align: "left" }
    ], l = $(
      () => i.value.map((v) => ({
        id: v.date,
        ...v
      }))
    ), c = $(() => n.data?.total_payment_success || []), u = $(() => {
      const v = c.value;
      return v.length === 0 ? m(0) : v.map((y) => `${y.currency} ${m(y.total_value)}`).join(" · ");
    }), f = (v, y) => It(v, y), m = (v) => Ie(v), p = (v) => (v ?? []).reduce((y, w) => y + (w.count ?? 0), 0), h = (v) => typeof v.sell_success_count == "number" ? v.sell_success_count : p(v.payment_success_total), b = $(() => {
      const v = n.data, y = v.total_disruption_conversations || 0, w = v.total_disruption_initiated || 0, _ = v.total_voluntary || 0, k = v.total_involuntary || 0, C = v.total_accepted || 0, S = v.total_confirmed || 0, M = typeof v.total_sell_success == "number" ? v.total_sell_success : p(v.total_payment_success), R = v.total_sell_failed || 0, V = Math.max(0, y - w), W = Math.max(
        0,
        w - _ - k
      ), D = Math.max(0, k - C), I = Math.max(0, _ - S), B = R, j = Math.max(0, S - M - B), H = (fe, G) => ye(fe, G), Q = [
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
      ], le = [];
      return w > 0 && le.push({
        source: "Initiated",
        target: "Started",
        value: w,
        label: H(w, y)
      }), V > 0 && le.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: V,
        label: H(V, y)
      }), _ > 0 && le.push({
        source: "Started",
        target: "Voluntary",
        value: _,
        label: H(_, y)
      }), k > 0 && le.push({
        source: "Started",
        target: "Involuntary",
        value: k,
        label: H(k, y)
      }), W > 0 && le.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: W,
        label: H(W, y)
      }), C > 0 && le.push({
        source: "Involuntary",
        target: "Accepted",
        value: C,
        label: H(C, y)
      }), D > 0 && le.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: D,
        label: H(D, y)
      }), S > 0 && le.push({
        source: "Voluntary",
        target: "Confirmed",
        value: S,
        label: H(S, y)
      }), I > 0 && le.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: I,
        label: H(I, y)
      }), M > 0 && le.push({
        source: "Confirmed",
        target: "Paid",
        value: M,
        label: H(M, y)
      }), B > 0 && le.push({
        source: "Confirmed",
        target: "Rejected",
        value: B,
        label: H(B, y)
      }), j > 0 && le.push({
        source: "Confirmed",
        target: "Not Paid",
        value: j,
        label: H(j, y)
      }), { nodes: Q, links: le };
    });
    return (v, y) => (g(), ae(Se, {
      class: "disruption-metrics-root h-full min-h-0",
      title: "Disruption Manager Metrics",
      subtitle: "Disruption workflow performance and completion tracking",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: y[0] || (y[0] = (w) => o("open"))
    }, {
      headerExport: O(() => [
        e.enableExport && !n.loading ? (g(), ae(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", X0, [
          d("section", G0, [
            d("div", Z0, [
              b.value.nodes.length > 0 && b.value.links.length > 0 ? (g(), ae(aa, {
                key: 0,
                data: b.value,
                height: "400px",
                "use-gradient": !1,
                "node-gap": 16
              }, null, 8, ["data"])) : (g(), x("div", Q0, [...y[1] || (y[1] = [
                d("p", { class: "empty-chart-text" }, " No disruption data available for visualization ", -1)
              ])]))
            ])
          ]),
          d("section", J0, [
            N(xe, {
              color: "#22c55e",
              title: "Payment Success Value",
              value: u.value
            }, null, 8, ["value"])
          ]),
          i.value && i.value.length > 0 ? (g(), x("section", eb, [
            y[2] || (y[2] = d("div", { class: "section-header" }, [
              d("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            d("div", tb, [
              N(gt, {
                columns: r,
                rows: l.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": O(({ row: w }) => [
                  d("span", ab, A(T(He)(String(w.date)).format("MMM DD")), 1)
                ]),
                "cell-initiated": O(({ row: w }) => [
                  d("span", nb, A(T(me)(Number(w.disruption_conversations))), 1)
                ]),
                "cell-started": O(({ row: w }) => [
                  d("span", ob, [
                    Ae(A(T(me)(Number(w.disruption_initiated_count))) + " ", 1),
                    d("span", sb, " (" + A(f(
                      Number(w.disruption_initiated_count),
                      Number(w.disruption_conversations)
                    )) + ") ", 1)
                  ])
                ]),
                "cell-abandoned": O(({ row: w }) => [
                  d("span", ib, [
                    d("span", rb, A(T(me)(
                      Number(w.disruption_initiated_count) - Number(w.voluntary_count) - Number(w.involuntary_count)
                    )) + " (" + A(f(
                      Number(w.disruption_initiated_count) - Number(w.voluntary_count) - Number(w.involuntary_count),
                      Number(w.disruption_conversations)
                    )) + ") ", 1)
                  ])
                ]),
                "cell-voluntary": O(({ row: w }) => [
                  d("div", lb, [
                    (g(!0), x(ue, null, pe([w], (_, k) => (g(), x(ue, { key: k }, [
                      N(Ge, {
                        color: "neutral",
                        outlined: !0
                      }, {
                        default: O(() => [
                          Ae(" VOL " + A(T(me)(_.voluntary_count)) + " (" + A(f(
                            _.voluntary_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ge, { color: "success" }, {
                        default: O(() => [
                          Ae(" Confirm " + A(T(me)(_.confirmed_count)) + " (" + A(f(
                            _.confirmed_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ge, { color: "warning" }, {
                        default: O(() => [
                          Ae(" Not Confirm " + A(T(me)(_.voluntary_count - _.confirmed_count)) + " (" + A(f(
                            _.voluntary_count - _.confirmed_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ge, { color: "danger" }, {
                        default: O(() => [
                          Ae(" Reject " + A(T(me)(_.sell_failed_count)) + " (" + A(f(
                            _.sell_failed_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ge, { color: "orange" }, {
                        default: O(() => [
                          Ae(" Not Paid " + A(T(me)(
                            Math.max(
                              0,
                              _.confirmed_count - h(_) - _.sell_failed_count
                            )
                          )) + " (" + A(f(
                            Math.max(
                              0,
                              _.confirmed_count - h(_) - _.sell_failed_count
                            ),
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ge, {
                        color: "success",
                        outlined: !0
                      }, {
                        default: O(() => [
                          Ae(" Finish " + A(T(me)(h(_))) + " (" + A(f(
                            h(_),
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      (g(!0), x(ue, null, pe(_.payment_success_total || [], (C) => (g(), ae(Ge, {
                        key: `${_.date}-${C.currency}`,
                        color: "neutral"
                      }, {
                        default: O(() => [
                          Ae(A(C.currency) + " " + A(m(C.total_value)), 1)
                        ]),
                        _: 2
                      }, 1024))), 128))
                    ], 64))), 128))
                  ])
                ]),
                "cell-involuntary": O(({ row: w }) => [
                  d("div", cb, [
                    (g(!0), x(ue, null, pe([w], (_, k) => (g(), x(ue, { key: k }, [
                      N(Ge, { color: "purple" }, {
                        default: O(() => [
                          Ae(" INV " + A(T(me)(_.involuntary_count)) + " (" + A(f(
                            _.involuntary_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ge, { color: "danger" }, {
                        default: O(() => [
                          Ae(" Human " + A(T(me)(_.involuntary_count - _.accepted_count)) + " (" + A(f(
                            _.involuntary_count - _.accepted_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ge, { color: "success" }, {
                        default: O(() => [
                          Ae(" Accept " + A(T(me)(_.accepted_count)) + " (" + A(f(
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
          ])) : (g(), x("section", db, [...y[3] || (y[3] = [
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
}), hb = /* @__PURE__ */ be(ub, [["__scopeId", "data-v-033e517a"]]), fb = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, gb = { class: "w-full shrink-0 flex min-h-0 flex-col" }, mb = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, pb = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, bb = { class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4" }, vb = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, yb = /* @__PURE__ */ he({
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
      const p = u.value, h = p.total_airline_information_retrieved + p.total_booking_info_retrieved + p.total_flight_status_retrieved, b = (w) => h > 0 ? (w / h * 100).toFixed(1) : "0.0", v = p.total_faq_events, y = v > 0 ? `${(p.total_documents_found / v * 100).toFixed(1)}% of FAQ events` : void 0;
      return [
        {
          name: "airline_information",
          label: "Airline Info",
          color: l.airline_information,
          value: `${b(p.total_airline_information_retrieved)}%`,
          subvalue: `${me(p.total_airline_information_retrieved)} consultas`
        },
        {
          name: "booking_info",
          label: "Booking Info",
          color: l.booking_info,
          value: `${b(p.total_booking_info_retrieved)}%`,
          subvalue: `${me(p.total_booking_info_retrieved)} consultas`
        },
        {
          name: "flight_status",
          label: "Flight Status",
          color: l.flight_status,
          value: `${b(p.total_flight_status_retrieved)}%`,
          subvalue: `${me(p.total_flight_status_retrieved)} consultas`
        },
        {
          name: "documents_found",
          label: "Documents found",
          color: "#64748b",
          value: me(p.total_documents_found),
          subvalue: y
        }
      ];
    }), m = (p) => {
      if (!p) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const h = p.faq_by_day || [];
      if (h.length > 0) {
        const b = h.map(
          (_) => He(_.date).format("MMM DD")
        ), v = h.map(
          (_) => _.airline_information_retrieved_count || 0
        ), y = h.map(
          (_) => _.flight_status_retrieved_count || 0
        ), w = h.map(
          (_) => _.booking_info_retrieved_count || 0
        );
        c.value = {
          labels: b,
          datasets: [
            {
              label: "Airline Information",
              data: v,
              borderColor: l.airline_information,
              backgroundColor: "rgba(139, 92, 246, 0.1)",
              fill: !0
            },
            {
              label: "Flight Status",
              data: y,
              borderColor: l.flight_status,
              backgroundColor: "rgba(6, 182, 212, 0.1)",
              fill: !0
            },
            {
              label: "Booking Information",
              data: w,
              borderColor: l.booking_info,
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              fill: !0
            }
          ]
        };
      } else
        c.value = { labels: [], datasets: [] };
    };
    return Te(
      () => n.data,
      (p) => {
        m(p ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: r }), (p, h) => (g(), ae(Se, {
      class: "w-full min-h-0 self-start",
      title: "FAQ Metrics",
      subtitle: "FAQ volume by category",
      collapsible: !1,
      loading: n.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !n.loading ? (g(), ae(T(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", fb, [
          d("div", gb, [
            c.value.labels && c.value.labels.length ? (g(), x("section", mb, [
              d("div", pb, [
                N(bt, {
                  data: c.value,
                  theme: i.value
                }, null, 8, ["data", "theme"])
              ]),
              d("div", bb, [
                (g(!0), x(ue, null, pe(f.value, (b) => (g(), ae(xe, {
                  key: b.name,
                  class: "min-w-0",
                  color: b.color,
                  title: b.label,
                  value: b.value,
                  subvalue: b.subvalue
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ])
            ])) : (g(), x("section", vb, [...h[0] || (h[0] = [
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
}), xb = /* @__PURE__ */ be(yb, [["__scopeId", "data-v-b6ea961f"]]);
function Bn(e, t) {
  return g(), x("svg", {
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
function kb(e, t) {
  return g(), x("svg", {
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
function We() {
  const e = new Uint8Array(8);
  return globalThis.crypto.getRandomValues(e), Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("");
}
const ct = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", et = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", _b = "min-h-[5.5rem] w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans leading-normal text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", Dt = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", At = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", wb = "kiut-select-option-badge shrink-0 whitespace-nowrap rounded-md px-2 py-0.5 text-[0.6875rem] font-medium leading-4";
function ui(e = "neutral") {
  return `${wb} kiut-select-option-badge--${e}`;
}
const Cb = { class: "flex flex-row gap-3 items-center" }, $b = {
  key: 0,
  class: "mb-1.5 inline-flex shrink-0 text-[color:var(--kiut-text-muted)] [&>svg]:h-4 [&>svg]:w-4",
  "aria-hidden": "true"
}, Sb = ["disabled", "aria-expanded", "aria-labelledby", "aria-label", "aria-invalid", "aria-describedby"], Mb = { class: "flex min-w-0 flex-1 items-center gap-2.5 truncate" }, Db = {
  key: 0,
  class: "border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-3 dark:border-[color:var(--kiut-border-light)]"
}, Ab = { class: "relative" }, Tb = {
  class: "pointer-events-none absolute inset-y-0 left-0 flex w-9 items-center justify-center",
  "aria-hidden": "true"
}, Bb = ["placeholder", "aria-label"], Lb = {
  key: 1,
  class: "px-3 pb-1 pt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, Rb = {
  key: 0,
  class: "px-3 py-2 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, Pb = ["aria-selected", "onClick", "onMouseenter"], Ib = {
  key: 1,
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, Eb = { class: "min-w-0 flex-1 truncate" }, na = /* @__PURE__ */ he({
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
    const a = e, n = t, o = `kiut-select-${We()}`, s = `${o}-label`, i = `${o}-btn`, r = `${o}-listbox`, l = `${o}-err`, c = $(() => a.invalid ?? !1), u = ne(null), f = ne(null), m = ne(null), p = ne(null), h = ne(null), b = ne(!1), v = ne(0), y = ne(""), w = ne({});
    function _() {
      const z = f.value;
      if (!z) return;
      const re = z.getBoundingClientRect();
      w.value = {
        top: `${re.bottom - 3}px`,
        left: `${re.left}px`,
        width: `${re.width}px`
      };
    }
    const k = $(() => a.options.filter((z) => !z.disabled)), C = $(() => {
      if (!a.searchable) return k.value;
      const z = y.value.trim().toLowerCase();
      return z ? k.value.filter(
        (re) => re.label.toLowerCase().includes(z) || re.badge?.label.toLowerCase().includes(z)
      ) : k.value;
    }), S = $(
      () => a.ariaLabelTrigger ?? a.placeholder ?? "Seleccionar opción"
    ), M = $(
      () => a.options.find((z) => z.value === a.modelValue) ?? null
    ), R = $(() => a.modelValue === null || a.modelValue === void 0 || a.modelValue === "" ? a.placeholder : M.value?.label ?? String(a.modelValue)), V = $(() => M.value?.leadingClass);
    function W(z) {
      return `${String(z.value)}-${z.label}`;
    }
    function D(z) {
      return a.modelValue === z.value;
    }
    function I(z, re) {
      const ce = D(z), ve = v.value === re, K = !!a.listSectionLabel;
      return [
        "flex cursor-pointer items-center gap-2.5 text-sm outline-none transition-colors",
        K ? "border-b border-gray-200 px-3 py-2.5 last:border-b-0 dark:border-white/5" : "gap-1.5 px-2 py-2",
        ce ? K ? "bg-[color:var(--kiut-primary-section)] font-medium text-[color:var(--kiut-primary)] dark:bg-[color:var(--kiut-primary-section)]" : "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !ce && ve ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function B() {
      v.value = Math.max(
        0,
        C.value.findIndex((z) => z.value === a.modelValue)
      );
    }
    function j() {
      if (a.searchable) {
        h.value?.focus();
        return;
      }
      p.value?.focus();
    }
    function H() {
      _(), y.value = "", B(), Ke(() => j());
    }
    function Q() {
      b.value = !1, y.value = "";
    }
    function le(z) {
      n("update:modelValue", z.value), Q();
    }
    function fe() {
      if (!a.disabled) {
        if (b.value) {
          Q();
          return;
        }
        b.value = !0, H();
      }
    }
    function G(z) {
      z.stopPropagation(), !a.disabled && fe();
    }
    function oe(z) {
      if (!b.value) return;
      const re = z.target, ce = u.value, ve = m.value;
      ce && !ce.contains(re) && (!ve || !ve.contains(re)) && Q();
    }
    function L(z) {
      a.disabled || (z.key === "ArrowDown" || z.key === "Enter" || z.key === " ") && (z.preventDefault(), b.value || (b.value = !0, H()));
    }
    function U(z) {
      const re = C.value;
      if (z.key === "Escape") {
        z.preventDefault(), Q();
        return;
      }
      if (z.key === "ArrowDown") {
        if (z.preventDefault(), re.length === 0) return;
        v.value = 0, p.value?.focus();
        return;
      }
      if (z.key === "ArrowUp") {
        if (z.preventDefault(), re.length === 0) return;
        v.value = re.length - 1, p.value?.focus();
        return;
      }
      if (z.key === "Enter") {
        z.preventDefault();
        const ce = re[v.value];
        ce && le(ce);
      }
    }
    function Y(z) {
      const re = C.value;
      if (z.key === "Escape") {
        z.preventDefault(), Q();
        return;
      }
      if (re.length !== 0) {
        if (z.key === "ArrowDown") {
          z.preventDefault(), v.value = Math.min(v.value + 1, re.length - 1);
          return;
        }
        if (z.key === "ArrowUp") {
          if (z.preventDefault(), v.value === 0 && a.searchable) {
            h.value?.focus();
            return;
          }
          v.value = Math.max(v.value - 1, 0);
          return;
        }
        if (z.key === "Enter") {
          z.preventDefault();
          const ce = re[v.value];
          ce && le(ce);
        }
      }
    }
    return Te(y, () => {
      v.value = 0;
    }), Je(() => {
      document.addEventListener("click", oe);
    }), rt(() => {
      document.removeEventListener("click", oe);
    }), (z, re) => (g(), x("div", {
      ref_key: "rootRef",
      ref: u,
      class: "relative font-sans"
    }, [
      d("div", Cb, [
        z.$slots.icon ? (g(), x("span", $b, [
          ke(z.$slots, "icon")
        ])) : F("", !0),
        e.label ? (g(), x("label", {
          key: 1,
          id: s,
          class: Z(T(ct))
        }, A(e.label), 3)) : F("", !0)
      ]),
      d("button", {
        ref_key: "buttonRef",
        ref: f,
        id: i,
        type: "button",
        disabled: e.disabled,
        class: Z([
          T(et),
          c.value ? T(Dt) : "",
          b.value && !c.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : "",
          "flex items-center justify-between gap-2 text-left"
        ]),
        "aria-expanded": b.value,
        "aria-haspopup": "listbox",
        "aria-controls": r,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : S.value,
        "aria-invalid": c.value ? "true" : void 0,
        "aria-describedby": e.errorText ? l : void 0,
        onClick: G,
        onKeydown: L
      }, [
        d("span", Mb, [
          V.value ? (g(), x("span", {
            key: 0,
            class: Z([V.value, "shrink-0"]),
            "aria-hidden": "true"
          }, null, 2)) : F("", !0),
          M.value?.leadingIcon ? (g(), x("span", {
            key: 1,
            class: Z([
              "inline-flex shrink-0 items-center justify-center rounded-full",
              M.value.leadingIconWrapperClass
            ])
          }, [
            (g(), ae(ft(M.value.leadingIcon), {
              class: Z(["h-4 w-4", M.value.leadingIconClass])
            }, null, 8, ["class"]))
          ], 2)) : F("", !0),
          d("span", {
            class: Z([
              "min-w-0 truncate",
              e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
            ])
          }, A(R.value), 3),
          M.value?.badge ? (g(), x("span", {
            key: 2,
            class: Z(T(ui)(M.value.badge.variant))
          }, A(M.value.badge.label), 3)) : F("", !0)
        ]),
        N(T(ta), {
          class: Z(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", b.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, Sb),
      e.errorText ? (g(), x("p", {
        key: 0,
        id: l,
        class: Z(T(At)),
        role: "alert"
      }, A(e.errorText), 3)) : F("", !0),
      (g(), ae(Qt, { to: "body" }, [
        Xe(d("div", {
          ref_key: "panelRef",
          ref: m,
          style: Ce(w.value),
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-lg dark:border-[color:var(--kiut-border-light)]"
        }, [
          e.searchable ? (g(), x("div", Db, [
            d("div", Ab, [
              d("span", Tb, [
                N(T(Fo), { class: "h-4 w-4 text-[color:var(--kiut-text-muted)] dark:text-slate-500" })
              ]),
              Xe(d("input", {
                ref_key: "searchInputRef",
                ref: h,
                "onUpdate:modelValue": re[0] || (re[0] = (ce) => y.value = ce),
                type: "search",
                class: Z([T(et), "min-h-0 py-2 pl-9 pr-3 text-sm"]),
                placeholder: e.searchPlaceholder,
                "aria-label": e.searchPlaceholder,
                onClick: re[1] || (re[1] = Be(() => {
                }, ["stop"])),
                onKeydown: Be(U, ["stop"])
              }, null, 42, Bb), [
                [Rt, y.value]
              ])
            ])
          ])) : F("", !0),
          e.listSectionLabel ? (g(), x("p", Lb, A(e.listSectionLabel), 1)) : F("", !0),
          d("ul", {
            id: r,
            ref_key: "listRef",
            ref: p,
            role: "listbox",
            tabindex: "-1",
            class: Z(
              e.listSectionLabel ? "max-h-60 overflow-auto pb-1" : "max-h-60 overflow-auto py-1"
            ),
            onKeydown: Be(Y, ["stop"])
          }, [
            C.value.length === 0 ? (g(), x("li", Rb, A(e.noResultsText), 1)) : F("", !0),
            (g(!0), x(ue, null, pe(C.value, (ce, ve) => (g(), x("li", {
              key: W(ce),
              role: "option",
              "aria-selected": D(ce),
              class: Z(I(ce, ve)),
              onClick: Be((K) => le(ce), ["stop"]),
              onMouseenter: (K) => v.value = ve
            }, [
              ce.leadingClass ? (g(), x("span", {
                key: 0,
                class: Z([ce.leadingClass, "shrink-0"]),
                "aria-hidden": "true"
              }, null, 2)) : F("", !0),
              e.showOptionCheck ? (g(), x("span", Ib, [
                D(ce) ? (g(), ae(T(Bn), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : F("", !0)
              ])) : F("", !0),
              ce.leadingIcon ? (g(), x("span", {
                key: 2,
                class: Z([
                  "inline-flex shrink-0 items-center justify-center rounded-full",
                  ce.leadingIconWrapperClass
                ])
              }, [
                (g(), ae(ft(ce.leadingIcon), {
                  class: Z(["h-4 w-4", ce.leadingIconClass])
                }, null, 8, ["class"]))
              ], 2)) : F("", !0),
              d("span", Eb, A(ce.label), 1),
              ce.badge ? (g(), x("span", {
                key: 3,
                class: Z(T(ui)(ce.badge.variant))
              }, A(ce.badge.label), 3)) : F("", !0)
            ], 42, Pb))), 128))
          ], 34)
        ], 4), [
          [Ht, b.value]
        ])
      ]))
    ], 512));
  }
}), St = (e) => e.replace(/\b(seller|checkin)_state\b/gi, "$1"), Fb = {
  key: 0,
  class: "w-52"
}, Ob = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Vb = { class: "w-full shrink-0 flex min-h-0 flex-col" }, zb = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, Nb = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, jb = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Hb = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Wb = { class: "max-w-[360px] px-4 text-center" }, Kb = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Ub = { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, Yb = { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, qb = /* @__PURE__ */ he({
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
    }, o = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899", "#06B6D4"], s = e, i = a, r = (w) => {
      i("export", w);
    }, l = (w) => {
      i("changeBreakdown", String(w));
    }, c = (w) => {
      const _ = w.toLowerCase(), k = n[_] || n[w];
      if (k) return k;
      const C = Array.from(_).reduce(
        (S, M) => (S << 5) - S + M.charCodeAt(0) | 0,
        0
      );
      return o[Math.abs(C) % o.length];
    }, u = $e(s, "theme"), { isDark: f } = Me(u), m = (w) => {
      const _ = St(w).replace(/_/g, " ");
      return _.charAt(0).toUpperCase() + _.slice(1);
    }, p = $(() => {
      const w = {};
      for (const _ of Object.values(s.data?.agents_by_day || {}))
        for (const [k, C] of Object.entries(_))
          w[k] = (w[k] || 0) + C;
      return w;
    }), h = $(() => {
      const w = s.data?.agents_by_day || {}, _ = Object.keys(w).sort();
      if (_.length === 0)
        return { labels: [], datasets: [] };
      const C = Object.keys(p.value).sort(
        (S, M) => p.value[M] - p.value[S] || S.localeCompare(M)
      ).slice(0, s.maxSeries).map((S) => ({
        label: m(S),
        data: _.map((M) => w[M]?.[S] || 0),
        borderColor: c(S)
      }));
      return {
        labels: _.map((S) => He(S).format("MMM DD")),
        datasets: C
      };
    }), b = $(() => {
      const w = Object.values(p.value).reduce((k, C) => k + C, 0), _ = s.totalConversations ?? w;
      return _ === 0 ? [] : Object.entries(p.value).sort(([, k], [, C]) => C - k).map(([k, C]) => ({
        name: k,
        label: m(k),
        total: C,
        percentage: (C / _ * 100).toFixed(1),
        color: c(k)
      }));
    }), v = $(() => b.value.slice(0, 4)), y = $(() => {
      const w = v.value.length;
      if (!(w <= 0))
        return { gridTemplateColumns: `repeat(${w}, minmax(0, 1fr))` };
    });
    return t({ isDark: f }), (w, _) => (g(), ae(Se, {
      class: "w-full min-h-0 self-start",
      title: s.title,
      subtitle: s.subtitle,
      collapsible: !1,
      loading: s.loading
    }, {
      headerAside: O(() => [
        s.breakdownOptions.length ? (g(), x("div", Fb, [
          N(na, {
            "model-value": s.breakdownBy,
            options: s.breakdownOptions,
            "onUpdate:modelValue": l
          }, null, 8, ["model-value", "options"])
        ])) : F("", !0)
      ]),
      headerExport: O(() => [
        e.enableExport && !s.loading ? (g(), ae(T(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: r
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", Ob, [
          d("div", Vb, [
            h.value.labels && h.value.labels.length ? (g(), x("section", zb, [
              d("div", Nb, [
                N(bt, {
                  data: h.value,
                  options: e.options,
                  theme: u.value
                }, null, 8, ["data", "options", "theme"])
              ]),
              s.showSummaryCards && v.value.length ? (g(), x("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: Ce(y.value)
              }, [
                (g(!0), x(ue, null, pe(v.value, (k) => (g(), ae(xe, {
                  key: k.name,
                  class: "min-w-0",
                  color: k.color,
                  title: k.label,
                  value: `${k.percentage}%`,
                  subvalue: `${T(me)(k.total)} ${s.unit}`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : F("", !0)
            ])) : s.showSummaryCards && b.value.length ? (g(), x("section", jb, [
              d("div", {
                class: "grid w-full gap-3 md:gap-4",
                style: Ce(y.value)
              }, [
                (g(!0), x(ue, null, pe(v.value, (k) => (g(), ae(xe, {
                  key: k.name,
                  class: "min-w-0",
                  color: k.color,
                  title: k.label,
                  value: `${k.percentage}%`,
                  subvalue: `${T(me)(k.total)} ${s.unit}`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)
            ])) : F("", !0),
            b.value.length ? F("", !0) : (g(), x("section", Hb, [
              d("div", Wb, [
                d("div", Kb, [
                  N(T(lt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                d("p", Ub, A(s.emptyTitle), 1),
                d("p", Yb, A(s.emptyDescription), 1)
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["title", "subtitle", "loading"]));
  }
}), $r = /* @__PURE__ */ be(qb, [["__scopeId", "data-v-c97ff9a5"]]), Xb = { class: "card-body" }, Gb = {
  key: 0,
  class: "chart-section"
}, Zb = { class: "chart-wrapper" }, Qb = {
  key: 1,
  class: "record-locator-daily-section"
}, Jb = { class: "w-full min-w-0" }, ev = { class: "cell-plain font-medium" }, tv = { class: "cell-plain text-center" }, av = { class: "cell-plain text-center" }, nv = { class: "cell-plain text-center" }, ov = { class: "cell-plain text-center" }, sv = { class: "cell-plain text-center success-value" }, iv = { class: "cell-plain text-center failed-value" }, rv = { class: "cell-plain text-center warning-value" }, lv = { class: "cell-plain text-center" }, cv = { class: "cell-plain text-center failed-value" }, dv = {
  key: 2,
  class: "empty-state"
}, uv = /* @__PURE__ */ he({
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
    const n = e, o = a, s = (v) => {
      o("export", v);
    }, { isDark: i } = Me($e(n, "theme")), r = $(() => n.data?.record_locator_by_day ? [...n.data.record_locator_by_day].sort(
      (v, y) => new Date(v.date).getTime() - new Date(y.date).getTime()
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
    ], u = $(
      () => n.isAvianca ? [...l, ...c] : l
    ), f = $(
      () => r.value.map((v) => ({
        id: v.date,
        date: v.date,
        checkin_initiated: v.checkin_initiated,
        record_locator_init_count: v.record_locator_init_count,
        record_locator_started_count: v.record_locator_started_count,
        record_locator_completed_count: v.record_locator_completed_count,
        record_locator_closed_count: v.record_locator_closed_count,
        record_locator_failed_count: v.record_locator_failed_count,
        record_locator_abandoned_count: v.record_locator_abandoned_count,
        record_locator_create_payment_count: v.record_locator_create_payment_count,
        record_locator_create_payment_failed_count: v.record_locator_create_payment_failed_count
      }))
    ), m = $(() => n.data), p = (v, y) => It(v, y), h = (v, y) => {
      const w = me(v), _ = p(v, y);
      return `${w} (${_})`;
    }, b = $(() => {
      const v = [], y = [], w = /* @__PURE__ */ new Set(), _ = (Y) => {
        w.has(Y) || (v.push({ name: Y }), w.add(Y));
      };
      if (!m.value.total_checkin_initiated)
        return { nodes: v, links: y };
      _("Checkin Init"), _("Booking retrive"), _("Checkin Started"), _("Checkin Completed"), _("Checkin Closed");
      const k = m.value.total_checkin_initiated, C = m.value.total_record_locator_init, S = m.value.total_record_locator_started, M = m.value.total_record_locator_completed, R = m.value.total_record_locator_closed, V = m.value.total_record_locator_failed, W = m.value.total_record_locator_abandoned, D = m.value.total_record_locator_init_abandoned, I = m.value.total_checkin_pre_init_abandoned_error, B = m.value.total_checkin_pre_init_abandoned_voluntary, j = I != null || B != null, H = j ? Math.max(Number(I) || 0, 0) : 0, Q = j ? Math.max(Number(B) || 0, 0) : 0, le = m.value.total_record_locator_init_abandoned_error, fe = m.value.total_record_locator_init_abandoned_voluntary, G = le != null || fe != null, oe = G ? Math.max(Number(le) || 0, 0) : 0, L = G ? Math.max(Number(fe) || 0, 0) : 0;
      C > 0 && y.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: C,
        label: ye(C, k)
      });
      const U = k - C;
      return j ? (Q > 0 && (_("Abandoned (Init)"), y.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: Q,
        label: ye(Q, k)
      })), H > 0 && (_("Booking not retreived"), y.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: H,
        label: ye(H, k)
      }))) : U > 0 && (_("Abandoned (Init)"), y.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: U,
        label: ye(U, k)
      })), S > 0 && y.push({
        source: "Booking retrive",
        target: "Checkin Started",
        value: S,
        label: ye(S, k)
      }), G ? (oe > 0 && (_("Error"), y.push({
        source: "Booking retrive",
        target: "Error",
        value: oe,
        label: ye(oe, k)
      })), L > 0 && (_("Abandoned (Started)"), y.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: L,
        label: ye(L, k)
      }))) : D > 0 && (_("Abandoned (Started)"), y.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: D,
        label: ye(D, k)
      })), M > 0 && y.push({
        source: "Checkin Started",
        target: "Checkin Completed",
        value: M,
        label: ye(M, k)
      }), R > 0 && y.push({
        source: "Checkin Completed",
        target: "Checkin Closed",
        value: R,
        label: ye(R, k)
      }), V > 0 && (_("Checkin Failed"), y.push({
        source: "Checkin Started",
        target: "Checkin Failed",
        value: V,
        label: ye(V, k)
      })), W > 0 && (_("Abandoned (Flow)"), y.push({
        source: "Checkin Started",
        target: "Abandoned (Flow)",
        value: W,
        label: ye(W, k)
      })), { nodes: v, links: y };
    });
    return t({ isDark: i }), (v, y) => (g(), ae(Se, {
      class: "record-locator-root h-full min-h-0",
      title: "Checkin by Record Locator Metrics",
      subtitle: "Checkin by record locator retrieval and completion analysis",
      collapsible: e.collapsible,
      loading: n.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !n.loading ? (g(), ae(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", Xb, [
          b.value.nodes.length > 0 ? (g(), x("section", Gb, [
            d("div", Zb, [
              N(aa, {
                data: b.value,
                height: "400px",
                "use-gradient": !1,
                "node-gap": 16
              }, null, 8, ["data"])
            ])
          ])) : F("", !0),
          r.value && r.value.length > 0 ? (g(), x("section", Qb, [
            d("div", Jb, [
              N(gt, {
                columns: u.value,
                rows: f.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": O(({ row: w }) => [
                  d("span", ev, A(T(He)(String(w.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": O(({ row: w }) => [
                  d("span", tv, A(T(me)(w.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieve": O(({ row: w }) => [
                  d("span", av, A(h(
                    w.record_locator_init_count,
                    w.checkin_initiated
                  )), 1)
                ]),
                "cell-checkinStarted": O(({ row: w }) => [
                  d("span", nv, A(T(me)(w.record_locator_started_count)), 1)
                ]),
                "cell-checkinCompleted": O(({ row: w }) => [
                  d("span", ov, A(h(
                    w.record_locator_completed_count,
                    w.record_locator_started_count
                  )), 1)
                ]),
                "cell-checkinClosed": O(({ row: w }) => [
                  d("span", sv, A(h(
                    w.record_locator_closed_count,
                    w.record_locator_started_count
                  )), 1)
                ]),
                "cell-checkinFailed": O(({ row: w }) => [
                  d("span", iv, A(h(
                    w.record_locator_failed_count,
                    w.record_locator_started_count
                  )), 1)
                ]),
                "cell-abandoned": O(({ row: w }) => [
                  d("span", rv, A(h(
                    w.record_locator_abandoned_count,
                    w.record_locator_started_count
                  )), 1)
                ]),
                "cell-createPayment": O(({ row: w }) => [
                  d("span", lv, A(T(me)(
                    w.record_locator_create_payment_count ?? 0
                  )), 1)
                ]),
                "cell-failedPayment": O(({ row: w }) => [
                  d("span", cv, A(T(me)(
                    w.record_locator_create_payment_failed_count ?? 0
                  )), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (g(), x("section", dv, [...y[0] || (y[0] = [
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
}), hv = /* @__PURE__ */ be(uv, [["__scopeId", "data-v-f904c66a"]]), fv = { class: "card-body" }, gv = {
  key: 0,
  class: "chart-section"
}, mv = {
  key: 1,
  class: "empty-state"
}, pv = {
  key: 2,
  class: "comparison-section"
}, bv = { class: "comparison-grid" }, vv = /* @__PURE__ */ he({
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
    ], s = e, i = a, r = (h) => {
      i("export", h);
    }, { isDark: l } = Me($e(s, "theme"));
    $(() => s.data?.total_sell_success ?? 0);
    const c = $(() => {
      const h = /* @__PURE__ */ new Set();
      for (const b of s.data?.sales_by_channel_by_day ?? [])
        for (const v of Object.keys(b.channels))
          h.add(v);
      return Array.from(h).sort();
    }), u = (h, b) => n[h.toLowerCase()] ?? o[b % o.length];
    function f(h) {
      return h.replace(/_/g, " ").toUpperCase();
    }
    function m(h) {
      if (h.delta === null) return "No previous data";
      const b = me(h.previous), v = `${Math.abs(h.delta).toFixed(1)}%`;
      return h.delta === 0 ? `0.0% vs prev. period (${b})` : `${h.delta > 0 ? "↑" : "↓"} ${v} vs prev. period (${b})`;
    }
    const p = $(() => {
      const h = s.data?.sales_by_channel_by_day ?? [];
      if (h.length === 0) return { labels: [], datasets: [] };
      const b = h.map((y) => He(y.date).format("MMM-DD")), v = c.value.map((y, w) => ({
        label: y,
        data: h.map((_) => _.channels[y] ?? 0),
        backgroundColor: u(y, w),
        borderRadius: 4
      }));
      return { labels: b, datasets: v };
    });
    return t({ isDark: l }), (h, b) => (g(), ae(Se, {
      class: "sales-channel-root h-full min-h-0",
      title: "Sales by Channel",
      subtitle: "Successful sales breakdown by communication channel",
      "default-open": e.initiallyOpen,
      loading: s.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !s.loading ? (g(), ae(T(ze), {
          key: 0,
          variant: "inline",
          onExport: r,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", fv, [
          p.value.labels.length > 0 ? (g(), x("section", gv, [
            N(Mt, {
              data: p.value,
              stacked: !0
            }, null, 8, ["data"])
          ])) : (g(), x("section", mv, [...b[0] || (b[0] = [
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
          e.channelComparison.length > 0 ? (g(), x("section", pv, [
            d("div", bv, [
              (g(!0), x(ue, null, pe(e.channelComparison, (v, y) => (g(), ae(T(xe), {
                key: v.channel,
                color: u(v.channel, y),
                title: f(v.channel),
                value: T(me)(v.current),
                subvalue: m(v)
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : F("", !0)
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), Sr = /* @__PURE__ */ be(vv, [["__scopeId", "data-v-4879d791"]]), yv = { class: "card-body" }, xv = {
  key: 0,
  class: "chart-section"
}, kv = { class: "chart-wrapper" }, _v = {
  key: 1,
  class: "empty-state"
}, wv = { class: "seller-value-cards" }, Cv = {
  key: 2,
  class: "seller-daily-section"
}, $v = { class: "w-full min-w-0" }, Sv = { class: "sl-cell font-medium" }, Mv = { class: "sl-cell text-center" }, Dv = { class: "sl-cell text-center" }, Av = { class: "sl-cell text-center" }, Tv = { class: "sl-cell text-center" }, Bv = { class: "sl-cell text-center success-value" }, Lv = {
  key: 0,
  class: "currency-cell-list"
}, Rv = {
  key: 1,
  class: "empty-cell"
}, Pv = { class: "sl-cell text-center success-value" }, Iv = { class: "sl-cell text-center success-value" }, Ev = {
  key: 0,
  class: "currency-cell-list"
}, Fv = {
  key: 1,
  class: "empty-cell"
}, Ov = { class: "sl-cell text-center success-value" }, Vv = { class: "sl-cell text-center" }, zv = { class: "sl-cell text-center success-value" }, Nv = {
  key: 0,
  class: "currency-cell-list"
}, jv = { key: 1 }, Hv = {
  key: 0,
  class: "failed-reasons"
}, Wv = { class: "reason-name" }, Kv = { class: "reason-count" }, Uv = {
  key: 1,
  class: "empty-cell"
}, Yv = /* @__PURE__ */ he({
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
    }, { isDark: r } = Me($e(o, "theme")), l = $(() => {
      if (!o.sellerData?.seller_by_day) return [];
      const D = [...o.sellerData.seller_by_day];
      return o.failedData?.failed_by_reason_by_day && o.failedData.failed_by_reason_by_day.forEach((I) => {
        const B = D.findIndex(
          (j) => j.date === I.date
        );
        B !== -1 ? D[B] = { ...D[B], reasons: I.reasons } : D.push({
          date: I.date,
          seller_conversations: 0,
          sell_started_count: 0,
          sell_get_quote_count: 0,
          sell_booking_created_count: 0,
          sell_success_count: 0,
          daily_value_sell_success: 0,
          reasons: I.reasons
        });
      }), D.sort(
        (I, B) => new Date(I.date).getTime() - new Date(B.date).getTime()
      );
    }), c = $(() => {
      const D = [
        { key: "date", label: "Date", align: "center" },
        { key: "sellInitiated", label: "Sell Initiated", align: "center" },
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
        { key: "failed", label: "Failed", align: "left" }
      ), D;
    }), u = $(
      () => l.value.map((D) => ({
        id: D.date,
        ...D
      }))
    ), f = $(() => o.sellerData), m = $(() => o.failedData), p = $(
      () => Array.isArray(o.sellerData.total_value_sell_success) ? o.sellerData.total_value_sell_success : []
    ), h = $(
      () => Array.isArray(o.sellerData.total_value_sell_success_bank_transfer) ? o.sellerData.total_value_sell_success_bank_transfer : []
    ), b = $(
      () => Array.isArray(o.sellerData.total_value_sell_success_cash) ? o.sellerData.total_value_sell_success_cash : []
    ), v = $(() => {
      const D = p.value;
      return D.length > 0 ? D.map(
        (I) => `${I.currency} ${Ut(I.total_value)}`
      ).join(" · ") : W(o.sellerData.total_value_sell_success);
    });
    function y(D) {
      return D.length > 0 ? D.map(
        (I) => `${I.currency} ${Ut(I.total_value)}`
      ).join(" · ") : "—";
    }
    const w = $(
      () => y(h.value)
    ), _ = $(
      () => y(b.value)
    ), k = (D) => D.replace(/_/g, " ").replace(/\b\w/g, (I) => I.toUpperCase()), C = (D) => `Failed:
${k(D)}`, S = $(() => {
      const {
        total_seller_conversations: D = 0,
        total_sell_started: I = 0,
        total_sell_booking_created: B = 0,
        total_sell_success: j = 0,
        total_sell_success_bank_transfer: H = 0,
        total_sell_success_cash: Q = 0
      } = f.value, { failed_by_reason_by_day: le = [] } = m.value;
      if (D === 0) return { nodes: [], links: [] };
      const fe = j, G = [
        { name: "Sell Initiated", value: D, status: "success" },
        { name: "Sell Started", value: I, status: "success" },
        { name: "Booking Created", value: B, status: "success" },
        { name: "Sell Success", value: fe, status: "success" }
      ], oe = [], L = D - I;
      L > 0 && (G.push({
        name: "Abandoned (Init)",
        value: L,
        status: "abandon"
      }), oe.push({
        source: "Sell Initiated",
        target: "Abandoned (Init)",
        value: L,
        label: ye(L, D)
      })), I > 0 && oe.push({
        source: "Sell Initiated",
        target: "Sell Started",
        value: I,
        label: ye(I, D)
      });
      const U = le.reduce(
        (re, ce) => (ce.reasons && Array.isArray(ce.reasons) && ce.reasons.forEach((ve) => {
          const K = ve.reason, ie = ve.failed_count;
          re[K] = (re[K] || 0) + ie;
        }), re),
        {}
      );
      B > 0 && oe.push({
        source: "Sell Started",
        target: "Booking Created",
        value: B,
        label: ye(B, D)
      }), (H ?? 0) > 0 && (G.push({
        name: "Bank Transfer",
        value: H ?? 0,
        status: "success"
      }), oe.push({
        source: "Booking Created",
        target: "Bank Transfer",
        value: H ?? 0,
        label: ye(H ?? 0, D)
      })), (Q ?? 0) > 0 && (G.push({
        name: "Cash Option",
        value: Q ?? 0,
        status: "success"
      }), oe.push({
        source: "Booking Created",
        target: "Cash Option",
        value: Q ?? 0,
        label: ye(Q ?? 0, D)
      })), fe > 0 && oe.push({
        source: "Booking Created",
        target: "Sell Success",
        value: fe,
        label: ye(fe, D)
      });
      const Y = B - fe - (H ?? 0) - (Q ?? 0);
      Y > 0 && (G.push({
        name: "Failed at Completion",
        value: Y,
        status: "error"
      }), oe.push({
        source: "Booking Created",
        target: "Failed at Completion",
        value: Y,
        label: ye(Y, D)
      }));
      const z = I - B;
      if (z > 0 && (G.push({
        name: "Failed at Booking",
        value: z,
        status: "error"
      }), oe.push({
        source: "Sell Started",
        target: "Failed at Booking",
        value: z,
        label: ye(z, D)
      })), Object.keys(U).length > 0) {
        const re = Object.values(U).reduce(
          (ve, K) => ve + K,
          0
        ), ce = z - re;
        Object.entries(U).filter(([, ve]) => ve > 0).sort(([, ve], [, K]) => K - ve).forEach(([ve, K]) => {
          const ie = `Failed: ${ve}`;
          G.push({
            name: ie,
            value: K,
            status: "error",
            label: C(ve)
          }), oe.push({
            source: "Failed at Booking",
            target: ie,
            value: K,
            label: ye(K, D)
          });
        }), ce > 0 && (G.push({
          name: "Failed: Without Reason",
          value: ce,
          status: "error",
          label: `Failed:
Without Reason`
        }), oe.push({
          source: "Failed at Booking",
          target: "Failed: Without Reason",
          value: ce,
          label: ye(ce, D)
        }));
      }
      return {
        nodes: G,
        links: oe
      };
    }), M = (D, I) => It(D, I), R = (D, I) => {
      const B = me(D), j = M(D, I);
      return `${B} (${j})`;
    }, V = (D) => D == null ? 0 : typeof D == "number" ? D : Array.isArray(D) ? D.reduce((I, B) => I + (B.total_value || 0), 0) : 0, W = (D) => Ut(V(D));
    return t({ isDark: r }), (D, I) => (g(), ae(Se, {
      class: "seller-metrics-root h-full min-h-0",
      title: "Seller Metrics",
      subtitle: "Sales performance and failure analysis",
      "default-open": e.initiallyOpen,
      loading: o.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !o.loading ? (g(), ae(T(ze), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", yv, [
          S.value.nodes.length > 0 ? (g(), x("section", xv, [
            d("div", kv, [
              N(aa, {
                data: S.value,
                height: "420px",
                "node-gap": 16
              }, null, 8, ["data"])
            ])
          ])) : (g(), x("section", _v, [...I[0] || (I[0] = [
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
          d("section", wv, [
            N(xe, {
              class: "seller-value-card",
              color: "var(--kiut-success)",
              title: "Total Sales Value",
              value: v.value
            }, null, 8, ["value"]),
            o.showPaymentMethodDetails ? (g(), x(ue, { key: 0 }, [
              N(xe, {
                class: "seller-value-card",
                color: "var(--kiut-success)",
                title: "Bank Transfer Value",
                value: w.value
              }, null, 8, ["value"]),
              N(xe, {
                class: "seller-value-card",
                color: "var(--kiut-success)",
                title: "Cash Option Value",
                value: _.value
              }, null, 8, ["value"])
            ], 64)) : F("", !0)
          ]),
          l.value && l.value.length > 0 ? (g(), x("section", Cv, [
            d("div", $v, [
              N(gt, {
                columns: c.value,
                rows: u.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": O(({ row: B }) => [
                  d("span", Sv, A(T(He)(String(B.date)).format("MMM DD")), 1)
                ]),
                "cell-sellInitiated": O(({ row: B }) => [
                  d("span", Mv, A(T(me)(Number(B.seller_conversations) || 0)), 1)
                ]),
                "cell-sellStarted": O(({ row: B }) => [
                  d("span", Dv, A(R(
                    B.sell_started_count,
                    B.seller_conversations || B.sell_started_count
                  )), 1)
                ]),
                "cell-getQuote": O(({ row: B }) => [
                  d("span", Av, A(R(
                    B.sell_get_quote_count,
                    B.seller_conversations || B.sell_started_count
                  )), 1)
                ]),
                "cell-bookingCreated": O(({ row: B }) => [
                  d("span", Tv, A(R(
                    B.sell_booking_created_count,
                    B.seller_conversations || B.sell_started_count
                  )), 1)
                ]),
                "cell-btValue": O(({ row: B }) => [
                  d("span", Bv, [
                    Array.isArray(
                      B.daily_value_sell_success_bank_transfer
                    ) && B.daily_value_sell_success_bank_transfer.length > 0 ? (g(), x("div", Lv, [
                      (g(!0), x(ue, null, pe(B.daily_value_sell_success_bank_transfer, (j) => (g(), x("span", {
                        key: `${B.date}-bt-success-${j.currency}`
                      }, A(j.currency) + " " + A(T(Ut)(j.total_value)), 1))), 128))
                    ])) : (g(), x("span", Rv, "-"))
                  ])
                ]),
                "cell-btSuccess": O(({ row: B }) => [
                  d("span", Pv, A(T(me)(
                    Number(
                      B.sell_success_bank_transfer_count
                    ) || 0
                  )), 1)
                ]),
                "cell-coValue": O(({ row: B }) => [
                  d("span", Iv, [
                    Array.isArray(
                      B.daily_value_sell_success_cash
                    ) && B.daily_value_sell_success_cash.length > 0 ? (g(), x("div", Ev, [
                      (g(!0), x(ue, null, pe(B.daily_value_sell_success_cash, (j) => (g(), x("span", {
                        key: `${B.date}-co-success-${j.currency}`
                      }, A(j.currency) + " " + A(T(Ut)(j.total_value)), 1))), 128))
                    ])) : (g(), x("span", Fv, "-"))
                  ])
                ]),
                "cell-cashSuccess": O(({ row: B }) => [
                  d("span", Ov, A(T(me)(
                    Number(B.sell_success_cash_count) || 0
                  )), 1)
                ]),
                "cell-sellSuccess": O(({ row: B }) => [
                  d("span", Vv, A(R(
                    B.sell_success_count,
                    B.seller_conversations || B.sell_started_count
                  )), 1)
                ]),
                "cell-totalSalesValue": O(({ row: B }) => [
                  d("span", zv, [
                    Array.isArray(B.daily_value_sell_success) && B.daily_value_sell_success.length > 0 ? (g(), x("div", Nv, [
                      (g(!0), x(ue, null, pe(B.daily_value_sell_success, (j) => (g(), x("span", {
                        key: `${B.date}-${j.currency}`
                      }, A(j.currency) + " " + A(T(Ut)(j.total_value)), 1))), 128))
                    ])) : (g(), x("span", jv, A(W(
                      B.daily_value_sell_success
                    )), 1))
                  ])
                ]),
                "cell-failed": O(({ row: B }) => [
                  (B.reasons || []).length > 0 ? (g(), x("div", Hv, [
                    (g(!0), x(ue, null, pe(B.reasons || [], (j) => (g(), x("div", {
                      key: j.reason,
                      class: "failed-reason-item"
                    }, [
                      d("span", Wv, A(j.reason) + ":", 1),
                      d("span", Kv, A(j.failed_count), 1)
                    ]))), 128))
                  ])) : (g(), x("div", Uv, "-"))
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
}), Mr = /* @__PURE__ */ be(Yv, [["__scopeId", "data-v-19fee7a8"]]), qv = { class: "seller-container__body" }, Xv = /* @__PURE__ */ he({
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
    ), i = $(() => a.exportLoading || a.sellerExportLoading), r = $(() => a.exportLoading || a.salesByChannelExportLoading);
    function l(c, u) {
      n("export", { source: c, format: u });
    }
    return (c, u) => (g(), ae(Se, {
      class: "seller-container-root w-full",
      title: "Seller",
      subtitle: "Sales funnel performance and successful sales by communication channel.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: u[2] || (u[2] = (f) => n("open"))
    }, {
      default: O(() => [
        d("div", qv, [
          N(Mr, {
            "initially-open": e.childrenInitiallyOpen,
            "seller-data": e.sellerData,
            "failed-data": e.failedData,
            loading: o.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": i.value,
            "show-payment-method-details": e.showPaymentMethodDetails,
            onExport: u[0] || (u[0] = (f) => l("seller", f))
          }, null, 8, ["initially-open", "seller-data", "failed-data", "loading", "theme", "enable-export", "export-loading", "show-payment-method-details"]),
          N(Sr, {
            "initially-open": e.childrenInitiallyOpen,
            data: e.salesByChannelData,
            "channel-comparison": e.channelComparison,
            loading: s.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": r.value,
            onExport: u[1] || (u[1] = (f) => l("salesByChannel", f))
          }, null, 8, ["initially-open", "data", "channel-comparison", "loading", "theme", "enable-export", "export-loading"])
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), Gv = /* @__PURE__ */ be(Xv, [["__scopeId", "data-v-34a76e0c"]]), Zv = { class: "card-body" }, Qv = {
  key: 0,
  class: "chart-section"
}, Jv = {
  key: 1,
  class: "empty-state"
}, ey = { class: "empty-state-content" }, ty = { class: "empty-icon-wrapper" }, ay = /* @__PURE__ */ he({
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
    }, { isDark: r, colors: l } = Me($e(o, "theme")), c = $(() => {
      const m = (o.data?.top_agents || []).filter(
        (v) => v.agent_type?.toLowerCase() !== "triage"
      );
      if (m.length === 0)
        return { labels: [], datasets: [] };
      const p = m.reduce(
        (v, y) => v + (Number(y.conversations) || 0),
        0
      ), h = m.map((v) => {
        const y = v.agent_type?.toLowerCase();
        return n[y] || "#94a3b8";
      }), b = h.map((v) => `${v}80`);
      return {
        labels: m.map((v) => {
          const y = Number(v.conversations) || 0, w = p ? y / p * 100 : 0;
          return `${St(v.agent_type)} - ${y.toLocaleString()} (${w.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: m.map((v) => v.conversations),
            backgroundColor: b,
            borderColor: h,
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
              const m = (f.label || "").toString().split(" - ")[0], p = Number(f.parsed) || 0, h = (f.dataset.data || []).reduce(
                (v, y) => v + (Number(y) || 0),
                0
              ), b = h ? p / h * 100 : 0;
              return `${m}: ${p.toLocaleString()} (${b.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: r }), (f, m) => (g(), ae(Se, {
      class: "top-agents-root h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !e.loading ? (g(), ae(T(ze), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", Zv, [
          c.value.labels && c.value.labels.length ? (g(), x("section", Qv, [
            N(Fn, {
              data: c.value,
              options: u.value
            }, null, 8, ["data", "options"])
          ])) : (g(), x("section", Jv, [
            d("div", ey, [
              d("div", ty, [
                N(T(tp), { class: "empty-icon" })
              ]),
              m[0] || (m[0] = d("p", { class: "empty-title" }, "No top agents data", -1)),
              m[1] || (m[1] = d("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see agent interaction trends. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), ny = /* @__PURE__ */ be(ay, [["__scopeId", "data-v-34a998ae"]]), oy = { class: "card-body" }, sy = {
  key: 0,
  class: "payment-methods-section"
}, iy = { class: "payment-methods-grid" }, ry = {
  key: 1,
  class: "empty-state"
}, ly = { class: "empty-state-content" }, cy = { class: "empty-icon-wrapper" }, dy = {
  key: 2,
  class: "payment-method-daily-section"
}, uy = { class: "w-full min-w-0" }, hy = { class: "font-medium" }, fy = { class: "text-center" }, gy = { class: "text-center success-value" }, my = {
  key: 0,
  class: "currency-cell-list"
}, py = { class: "payment-tags" }, by = { class: "tag-name" }, vy = {
  key: 0,
  class: "tag-amount"
}, yy = {
  key: 1,
  class: "tag-amount"
}, xy = { class: "tag-count" }, ky = {
  key: 3,
  class: "empty-table-state"
}, _y = "Not Registered", wy = /* @__PURE__ */ he({
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
    const n = e, o = a, { isDark: s } = Me($e(n, "theme")), i = ne(!1), r = ne({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), l = $(() => r.value.payment_method_breakdown && r.value.payment_method_breakdown.length > 0), c = $(() => r.value.payment_method_by_day && r.value.payment_method_by_day.length > 0), u = $(() => !r.value.payment_method_by_day || r.value.payment_method_by_day.length === 0 ? [] : [...r.value.payment_method_by_day].sort((M, R) => He(M.date).valueOf() - He(R.date).valueOf())), f = [
      { key: "date", label: "Date", align: "left" },
      { key: "totalSales", label: "Total Sales", align: "center" },
      { key: "totalAmount", label: "Total Amount", align: "center" },
      { key: "paymentMethods", label: "Payment Methods", align: "left" }
    ], m = $(
      () => u.value.map((M) => ({
        id: M.date,
        date: M.date,
        total_count: M.total_count,
        total_amount: M.total_amount,
        total_amount_by_currency: M.total_amount_by_currency,
        payment_methods: M.payment_methods
      }))
    ), p = (M) => {
      if (!M)
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
      const R = (M.payment_method_breakdown || []).map(
        (W) => ({
          payment_method: W.payment_method || "Unknown",
          total_amount: W.total_amount ?? 0,
          count: W.count ?? 0,
          total_amount_by_currency: W.total_amount_by_currency ?? []
        })
      ), V = (M.payment_method_by_day || []).map((W) => ({
        date: W.date || "",
        total_count: W.total_count ?? 0,
        total_amount: W.total_amount ?? 0,
        total_amount_by_currency: W.total_amount_by_currency ?? [],
        payment_methods: (W.payment_methods || []).map((D) => ({
          payment_method: D.payment_method || "Unknown",
          total_amount: D.total_amount ?? 0,
          count: D.count ?? 0,
          total_amount_by_currency: D.total_amount_by_currency ?? []
        }))
      }));
      return {
        airline_name: M.airline_name || n.airlineName,
        start_date: M.start_date || "",
        end_date: M.end_date || "",
        total_conversations: M.total_conversations ?? 0,
        total_amount: M.total_amount ?? 0,
        total_sell_usd: M.total_sell_usd,
        total_amount_by_currency: M.total_amount_by_currency ?? [],
        payment_method_breakdown: R,
        payment_method_by_day: V
      };
    }, h = async () => {
      if (!(!n.fetchFunction || !n.dates || n.dates.length < 2 || !n.airlineName)) {
        i.value = !0;
        try {
          const [M, R] = n.dates.map(
            (W) => He(W).format("YYYY-MM-DD")
          ), V = await n.fetchFunction(
            n.airlineName,
            M,
            R
          );
          r.value = p(V);
        } catch (M) {
          console.error("Error fetching payment method metrics:", M), r.value = p(null);
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
    ], v = (M) => !M || M.toLowerCase() === "unknown" ? _y : M.replace(/_/g, " "), y = (M) => M == null ? "$0.00" : Ie(M), w = (M) => {
      const R = M.total_amount_by_currency;
      return R && R.length > 0 ? R.map((V) => `${V.currency} ${y(V.total_value)}`).join(" · ") : y(M.total_amount);
    }, _ = (M) => M ? He(M).format("MMM DD") : "-", k = (M) => M == null || Number.isNaN(Number(M)) ? 0 : Number(M), C = (M) => {
      o("export", M);
    };
    function S() {
      const M = n.data;
      M && (Array.isArray(M.payment_method_breakdown) && M.payment_method_breakdown.length > 0 || Array.isArray(M.payment_method_by_day) && M.payment_method_by_day.length > 0) && (i.value = !1, r.value = p(M));
    }
    return Je(() => {
      n.data ? S() : h();
    }), Te(
      () => n.data,
      (M) => {
        M && S();
      },
      { deep: !0 }
    ), Te(
      () => n.dates,
      (M) => {
        n.data || M && M[0] && M[1] && h();
      },
      { deep: !0 }
    ), t({ isDark: s }), (M, R) => (g(), ae(Se, {
      class: "payment-method-root h-full min-h-0",
      title: "Payment Method Metrics",
      subtitle: "Sales breakdown by payment method",
      loading: i.value,
      "lazy-mount": "",
      onOpen: R[0] || (R[0] = (V) => o("open"))
    }, {
      headerExport: O(() => [
        e.enableExport && !i.value ? (g(), ae(T(ze), {
          key: 0,
          variant: "inline",
          onExport: C,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", oy, [
          l.value ? (g(), x("section", sy, [
            R[1] || (R[1] = d("p", { class: "section-label" }, "Sales by Payment Method", -1)),
            d("div", iy, [
              (g(!0), x(ue, null, pe(r.value.payment_method_breakdown, (V, W) => (g(), ae(xe, {
                key: V.payment_method,
                class: "payment-method-card-item min-w-0",
                color: b[W % b.length],
                title: v(V.payment_method),
                value: w(V),
                subvalue: `${k(V.count)} ${k(V.count) === 1 ? "sale" : "sales"}`
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : (g(), x("section", ry, [
            d("div", ly, [
              d("div", cy, [
                N(T(ap), { class: "empty-icon" })
              ]),
              R[2] || (R[2] = d("p", { class: "empty-title" }, "No payment data available", -1)),
              R[3] || (R[3] = d("p", { class: "empty-description" }, " No payment method data found for the selected period. Try adjusting the date range. ", -1))
            ])
          ])),
          c.value ? (g(), x("section", dy, [
            R[5] || (R[5] = d("p", { class: "section-label" }, "Daily Breakdown", -1)),
            d("div", uy, [
              N(gt, {
                columns: f,
                rows: m.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": O(({ row: V }) => [
                  d("span", hy, A(_(String(V.date))), 1)
                ]),
                "cell-totalSales": O(({ row: V }) => [
                  d("span", fy, A(T(me)(V.total_count ?? 0)), 1)
                ]),
                "cell-totalAmount": O(({ row: V }) => [
                  d("span", gy, [
                    Array.isArray(V.total_amount_by_currency) && V.total_amount_by_currency.length > 0 ? (g(), x("div", my, [
                      (g(!0), x(ue, null, pe(V.total_amount_by_currency, (W) => (g(), x("span", {
                        key: `${V.date}-${W.currency}`
                      }, A(W.currency) + " " + A(y(W.total_value)), 1))), 128))
                    ])) : (g(), x(ue, { key: 1 }, [
                      Ae(A(y(Number(V.total_amount ?? 0))), 1)
                    ], 64))
                  ])
                ]),
                "cell-paymentMethods": O(({ row: V }) => [
                  d("div", py, [
                    (g(!0), x(ue, null, pe(Array.isArray(V.payment_methods) ? V.payment_methods : [], (W) => (g(), x("div", {
                      key: W.payment_method,
                      class: "payment-tag"
                    }, [
                      d("span", by, A(v(W.payment_method)), 1),
                      R[4] || (R[4] = d("span", { class: "tag-separator" }, "•", -1)),
                      !W.total_amount_by_currency || W.total_amount_by_currency.length === 0 ? (g(), x("span", vy, A(y(W.total_amount)), 1)) : (g(), x("span", yy, A(W.total_amount_by_currency.map(
                        (D) => `${D.currency} ${y(D.total_value)}`
                      ).join(" / ")), 1)),
                      d("span", xy, "(" + A(k(W.count)) + ")", 1)
                    ]))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : l.value ? (g(), x("div", ky, [...R[6] || (R[6] = [
            d("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
          ])])) : F("", !0)
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Cy = /* @__PURE__ */ be(wy, [["__scopeId", "data-v-168637eb"]]), $y = {
  key: "title-skeleton",
  class: "header-title-group",
  "aria-hidden": "true"
}, Sy = {
  key: 0,
  class: "ut-skeleton-blink skeleton-header-label"
}, My = {
  key: "title-content",
  class: "header-title-group"
}, Dy = {
  class: "icon-wrapper",
  "aria-hidden": "true"
}, Ay = {
  key: 0,
  class: "metric-label metric-label--header"
}, Ty = {
  key: "aside-skeleton",
  class: "ut-skeleton-blink skeleton-badge",
  "aria-hidden": "true"
}, By = { key: "aside-content" }, Ly = {
  key: "body-skeleton",
  class: "skeleton-body",
  "aria-busy": "true",
  "aria-label": "Loading metric"
}, Ry = {
  key: 0,
  class: "ut-skeleton-blink skeleton-label"
}, Py = {
  key: "body-content",
  class: "highlight-inner"
}, Iy = { class: "card-body" }, Ey = { class: "metric-row" }, Fy = {
  key: 0,
  class: "metric-prefix"
}, Oy = {
  key: 0,
  class: "metric-label"
}, Vy = /* @__PURE__ */ he({
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
    const a = e, { isDark: n } = Me($e(a, "theme")), o = $(() => a.labelPosition === "header"), s = $(
      () => a.previousValue !== null && a.previousValue !== void 0
    ), i = $(() => {
      if (!s.value) return 0;
      const c = a.previousValue;
      return c === 0 ? a.currentValue > 0 ? 100 : 0 : (a.currentValue - c) / c * 100;
    }), r = $(() => {
      const c = i.value;
      if (Number.isNaN(c)) return "-";
      const u = c.toFixed(1);
      return c > 0 ? `+${u}%` : `${u}%`;
    }), l = $(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: n, changePercent: i }), (c, u) => (g(), ae(Se, {
      collapsible: !1,
      class: Z([
        "card-metric",
        "w-full",
        {
          "card-metric--dark": T(n),
          "card-metric--label-header": o.value
        }
      ])
    }, {
      title: O(() => [
        N(pt, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: O(() => [
            e.loading ? (g(), x("div", $y, [
              u[0] || (u[0] = d("div", { class: "ut-skeleton-blink skeleton-icon" }, null, -1)),
              o.value ? (g(), x("div", Sy)) : F("", !0)
            ])) : (g(), x("div", My, [
              d("div", Dy, [
                ke(c.$slots, "icon", {}, void 0, !0)
              ]),
              o.value ? (g(), x("span", Ay, A(e.label), 1)) : F("", !0)
            ]))
          ]),
          _: 3
        })
      ]),
      headerAside: O(() => [
        N(pt, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: O(() => [
            e.loading ? (g(), x("div", Ty)) : (g(), x("div", By, [
              ke(c.$slots, "headerAside", {}, () => [
                s.value ? (g(), x("div", {
                  key: 0,
                  class: Z(["change-badge", l.value])
                }, A(r.value), 3)) : F("", !0)
              ], !0)
            ]))
          ]),
          _: 3
        })
      ]),
      default: O(() => [
        N(pt, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: O(() => [
            e.loading ? (g(), x("div", Ly, [
              u[1] || (u[1] = d("div", { class: "ut-skeleton-blink skeleton-value" }, null, -1)),
              o.value ? F("", !0) : (g(), x("div", Ry))
            ])) : (g(), x("div", Py, [
              d("div", Iy, [
                ke(c.$slots, "value", {}, () => [
                  d("div", Ey, [
                    e.prefix ? (g(), x("span", Fy, A(e.prefix), 1)) : F("", !0),
                    d("span", {
                      class: Z(["metric-value", e.valueSize === "large" ? "metric-value--large" : ""])
                    }, A(e.value), 3)
                  ])
                ], !0),
                o.value ? F("", !0) : (g(), x("span", Oy, A(e.label), 1))
              ])
            ]))
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["class"]));
  }
}), ot = /* @__PURE__ */ be(Vy, [["__scopeId", "data-v-c81268f4"]]), zy = { class: "card-body" }, Ny = { class: "kpi-closed-value" }, jy = { class: "kpi-closed-value__main" }, Hy = {
  key: 0,
  class: "kpi-closed-value__pct"
}, Wy = { class: "table-view-select flex justify-end" }, Ky = { class: "table-section w-full min-w-0" }, Uy = { class: "cell-plain" }, Yy = { class: "cell-plain" }, qy = { class: "cell-plain cell-plain--muted" }, Xy = { class: "cell-plain" }, Gy = { class: "cell-plain cell-plain--orange" }, Zy = { class: "cell-plain cell-plain--red" }, Qy = { class: "cell-plain cell-plain--muted" }, Jy = { class: "cell-plain cell-plain--muted" }, e1 = { class: "cell-plain cell-plain--muted" }, t1 = { class: "cell-plain" }, a1 = { class: "cell-plain" }, n1 = {
  key: 2,
  class: "empty-state"
}, o1 = 6, s1 = /* @__PURE__ */ he({
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
    }, { isDark: i } = Me($e(n, "theme")), r = /* @__PURE__ */ new Set(["—", "-", "–", ""]);
    function l(P) {
      const q = P?.trim() ?? "";
      return q.length > 0 && !r.has(q);
    }
    function c(P) {
      if (!l(P.agent_email)) return !1;
      const q = P.assigned_count ?? 0, te = P.closed_count ?? 0, E = P.transferred_count ?? 0, J = P.abandoned_count ?? 0;
      return q > 0 || te > 0 || E > 0 || J > 0;
    }
    function u(P) {
      return P.closed_count ?? 0;
    }
    function f(P) {
      return P.transferred_count ?? 0;
    }
    function m(P) {
      return P.abandoned_count ?? 0;
    }
    function p(P) {
      const q = P?.trim();
      return q || "—";
    }
    function h(P) {
      const q = P?.trim();
      return q || "—";
    }
    function b(P) {
      return P == null ? "0" : ee(P);
    }
    const v = $(
      () => (n.data?.agents_by_day ?? []).filter(c)
    ), y = $(() => v.value.length > 0), w = $(() => {
      const P = (n.data?.total_enqueued ?? 0) > 0, q = (n.data?.total_transferred ?? 0) > 0, te = (n.data?.total_abandoned ?? 0) > 0;
      return y.value || P || q || te;
    }), _ = ne("by_date"), k = [
      { value: "by_date", label: "By date" },
      { value: "aggregated", label: "Aggregated" }
    ], C = ne("date"), S = ne("desc");
    Te(_, (P) => {
      P === "aggregated" ? (C.value = "name", S.value = "asc") : (C.value = "date", S.value = "desc");
    });
    function M(P, q) {
      return q == null ? null : q === 0 ? P > 0 ? 100 : 0 : (P - q) / q * 100;
    }
    function R(P) {
      const q = P.toFixed(1);
      return P > 0 ? `+${q}%` : `${q}%`;
    }
    function V(P, q = !1) {
      const te = q ? -P : P;
      return te > 0 ? "change-badge--up" : te < 0 ? "change-badge--down" : "change-badge--neutral";
    }
    function W(P, q) {
      if (P === null) return null;
      const te = M(P, q);
      return te === null ? null : {
        label: R(te),
        class: V(te, !0)
      };
    }
    function D(P) {
      if (P == null || P === "") return null;
      if (typeof P == "number")
        return Number.isFinite(P) ? P : null;
      const q = P.trim();
      if (!q) return null;
      if (q.includes(":")) {
        const E = q.split(":").map(Number);
        return E.length !== 3 || E.some(isNaN) ? null : E[0] * 3600 + E[1] * 60 + E[2];
      }
      const te = Number(q);
      return Number.isFinite(te) ? te : null;
    }
    function I(P) {
      const q = Math.round(P), te = Math.floor(q / 3600), E = Math.floor(q % 3600 / 60), J = q % 60;
      return `${String(te).padStart(2, "0")}:${String(E).padStart(2, "0")}:${String(J).padStart(2, "0")}`;
    }
    function B(P) {
      const q = D(P);
      return q === null ? "—" : typeof P == "string" && P.includes(":") ? P.trim() : I(q);
    }
    const j = $(() => n.data?.total_enqueued ?? 0), H = $(() => n.data?.total_closed ?? 0), Q = $(() => n.data?.total_transferred ?? 0), le = $(() => n.data?.total_abandoned ?? 0), fe = $(
      () => n.data?.avg_time_to_assign_seconds ?? null
    ), G = $(
      () => n.data?.avg_conversation_duration_seconds ?? null
    ), oe = $(() => j.value <= 0 ? null : `(${(H.value / j.value * 100).toFixed(1)}%)`), L = $(
      () => W(
        D(fe.value),
        n.previousAvgTimeToAssignSeconds
      )
    ), U = $(
      () => W(
        D(G.value),
        n.previousAvgConversationDurationSeconds
      )
    );
    function Y(P, q) {
      return {
        id: `${P.date}-${P.agent_email}-${q}`,
        date: P.date,
        dateSort: new Date(P.date).getTime(),
        agent_name: P.agent_name ?? "",
        agent_email: P.agent_email,
        handled: u(P),
        transferred: f(P),
        abandoned: m(P),
        connected_at: P.connected_at ?? null,
        disconnected_at: P.disconnected_at ?? null,
        online_time_display: P.online_time_seconds == null || P.online_time_seconds === "" ? null : B(P.online_time_seconds),
        avg_assignation_seconds: D(P.avg_time_to_assign_seconds),
        avg_resolution_seconds: D(P.avg_conversation_duration_seconds),
        avg_assignation_display: B(P.avg_time_to_assign_seconds),
        avg_resolution_display: B(P.avg_conversation_duration_seconds)
      };
    }
    function z(P) {
      const q = /* @__PURE__ */ new Map();
      for (const te of P) {
        if (!c(te)) continue;
        const E = te.agent_email.trim();
        q.has(E) || q.set(E, {
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
        const J = q.get(E), se = te.assigned_count ?? 0, ge = te.closed_count ?? 0;
        J.handled += u(te), J.transferred += f(te), J.abandoned += m(te), te.agent_name?.trim() && (J.agent_name = te.agent_name.trim());
        const we = D(te.avg_time_to_assign_seconds);
        we !== null && se > 0 && (J.assignSum += we * se, J.assignWeight += se);
        const _e = D(te.avg_conversation_duration_seconds);
        _e !== null && ge > 0 && (J.resolutionSum += _e * ge, J.resolutionWeight += ge);
      }
      return Array.from(q.values()).map((te, E) => {
        const J = te.assignWeight > 0 ? te.assignSum / te.assignWeight : null, se = te.resolutionWeight > 0 ? te.resolutionSum / te.resolutionWeight : null;
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
          avg_assignation_seconds: J,
          avg_resolution_seconds: se,
          avg_assignation_display: J !== null ? I(J) : "—",
          avg_resolution_display: se !== null ? I(se) : "—"
        };
      });
    }
    const re = $(() => {
      const P = v.value;
      return _.value === "aggregated" ? z(P) : P.map(Y);
    });
    function ce(P, q, te, E) {
      const J = E === "asc" ? 1 : -1;
      let se = 0;
      switch (te) {
        case "date":
          se = (P.dateSort ?? 0) - (q.dateSort ?? 0);
          break;
        case "name":
          se = (P.agent_name || "").localeCompare(q.agent_name || "", void 0, {
            sensitivity: "base"
          });
          break;
        case "email":
          se = P.agent_email.localeCompare(q.agent_email, void 0, {
            sensitivity: "base"
          });
          break;
        case "handled":
          se = P.handled - q.handled;
          break;
        case "transferred":
          se = P.transferred - q.transferred;
          break;
        case "abandoned":
          se = (P.abandoned ?? 0) - (q.abandoned ?? 0);
          break;
        case "avgAssignation":
          se = (P.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY) - (q.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY);
          break;
        case "avgResolution":
          se = (P.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY) - (q.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY);
          break;
      }
      if (se !== 0) return se * J;
      if (_.value === "by_date" && te !== "date") {
        const ge = (q.dateSort ?? 0) - (P.dateSort ?? 0);
        if (ge !== 0) return ge;
      }
      return (P.agent_name || "").localeCompare(q.agent_name || "", void 0, {
        sensitivity: "base"
      });
    }
    const ve = $(() => {
      const P = [...re.value];
      return P.sort((q, te) => ce(q, te, C.value, S.value)), P;
    }), K = $(
      () => ve.value
    ), ie = $(() => {
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
      const q = P;
      if (C.value === q) {
        S.value = S.value === "asc" ? "desc" : "asc";
        return;
      }
      C.value = q, q === "date" ? S.value = "desc" : q === "name" || q === "email" ? S.value = "asc" : S.value = "desc";
    }
    const ee = (P) => P == null ? "0" : me(P), X = (P) => new Date(P).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
    return t({ isDark: i }), (P, q) => (g(), ae(Se, {
      class: "agent-human-conv-root h-full min-h-0",
      title: "Agent Human Conversations",
      subtitle: "Human conversation assignments and closures by agent",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: q[1] || (q[1] = (te) => o("open"))
    }, {
      headerExport: O(() => [
        e.enableExport && !e.loading ? (g(), ae(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", zy, [
          w.value ? (g(), x("div", {
            key: 0,
            class: Z(["grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 md:gap-4", { "agent-human-conv--dark": T(i) }])
          }, [
            N(ot, {
              label: "Conversations Opened",
              "label-position": "header",
              value: ee(j.value),
              theme: e.theme,
              "current-value": j.value,
              "previous-value": e.previousTotalEnqueued
            }, {
              icon: O(() => [...q[2] || (q[2] = [
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
            N(ot, {
              label: "Conversations Closed",
              "label-position": "header",
              value: ee(H.value),
              theme: e.theme,
              "current-value": H.value,
              "previous-value": e.previousTotalClosed
            }, {
              icon: O(() => [...q[3] || (q[3] = [
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
                d("div", Ny, [
                  d("span", jy, A(ee(H.value)), 1),
                  oe.value ? (g(), x("span", Hy, A(oe.value), 1)) : F("", !0)
                ])
              ]),
              _: 1
            }, 8, ["value", "theme", "current-value", "previous-value"]),
            N(ot, {
              label: "Transferred",
              "label-position": "header",
              value: ee(Q.value),
              theme: e.theme,
              "current-value": Q.value,
              "previous-value": e.previousTotalTransferred
            }, {
              icon: O(() => [...q[4] || (q[4] = [
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
            N(ot, {
              label: "Abandoned",
              "label-position": "header",
              value: ee(le.value),
              theme: e.theme,
              "current-value": le.value,
              "previous-value": e.previousTotalAbandoned
            }, {
              icon: O(() => [...q[5] || (q[5] = [
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
            N(ot, {
              label: "Avg Time to Assign",
              "label-position": "header",
              value: B(fe.value),
              theme: e.theme,
              "current-value": D(fe.value) ?? 0,
              "previous-value": e.previousAvgTimeToAssignSeconds
            }, Vo({
              icon: O(() => [
                q[6] || (q[6] = d("svg", {
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
              L.value ? {
                name: "headerAside",
                fn: O(() => [
                  d("div", {
                    class: Z(["duration-trend-badge", L.value.class])
                  }, A(L.value.label), 3)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["value", "theme", "current-value", "previous-value"]),
            N(ot, {
              label: "Avg Resolution Time",
              "label-position": "header",
              value: B(G.value),
              theme: e.theme,
              "current-value": D(G.value) ?? 0,
              "previous-value": e.previousAvgConversationDurationSeconds
            }, Vo({
              icon: O(() => [
                q[7] || (q[7] = d("svg", {
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
              U.value ? {
                name: "headerAside",
                fn: O(() => [
                  d("div", {
                    class: Z(["duration-trend-badge", U.value.class])
                  }, A(U.value.label), 3)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["value", "theme", "current-value", "previous-value"])
          ], 2)) : F("", !0),
          y.value ? (g(), ae(Se, {
            key: 1,
            class: "agent-table-section mt-6",
            title: "Conversations Managed by Agent",
            subtitle: "Daily performance per human agent",
            collapsible: !1
          }, {
            headerAside: O(() => [
              d("div", Wy, [
                N(na, {
                  modelValue: _.value,
                  "onUpdate:modelValue": q[0] || (q[0] = (te) => _.value = te),
                  options: k,
                  "aria-label-trigger": "Table view mode",
                  "show-option-check": !1
                }, null, 8, ["modelValue"])
              ])
            ]),
            default: O(() => [
              d("div", Ky, [
                (g(), ae(gt, {
                  key: `${_.value}-${C.value}-${S.value}`,
                  columns: ie.value,
                  rows: K.value,
                  "sort-key": C.value,
                  "sort-direction": S.value,
                  "max-visible-rows": o1,
                  "row-key": "id",
                  onSort: de
                }, {
                  "cell-date": O(({ row: te }) => [
                    d("span", Uy, A(X(String(te.date))), 1)
                  ]),
                  "cell-name": O(({ row: te }) => [
                    d("span", Yy, A(p(te.agent_name)), 1)
                  ]),
                  "cell-email": O(({ row: te }) => [
                    d("span", qy, A(te.agent_email), 1)
                  ]),
                  "cell-handled": O(({ row: te }) => [
                    d("span", Xy, A(ee(Number(te.handled))), 1)
                  ]),
                  "cell-transferred": O(({ row: te }) => [
                    d("span", Gy, A(ee(Number(te.transferred))), 1)
                  ]),
                  "cell-abandoned": O(({ row: te }) => [
                    d("span", Zy, A(b(te.abandoned)), 1)
                  ]),
                  "cell-connected": O(({ row: te }) => [
                    d("span", Qy, A(h(te.connected_at)), 1)
                  ]),
                  "cell-disconnected": O(({ row: te }) => [
                    d("span", Jy, A(h(te.disconnected_at)), 1)
                  ]),
                  "cell-onlineTime": O(({ row: te }) => [
                    d("span", e1, A(h(te.online_time_display)), 1)
                  ]),
                  "cell-avgAssignation": O(({ row: te }) => [
                    d("span", t1, A(te.avg_assignation_display), 1)
                  ]),
                  "cell-avgResolution": O(({ row: te }) => [
                    d("span", a1, A(te.avg_resolution_display), 1)
                  ]),
                  _: 1
                }, 8, ["columns", "rows", "sort-key", "sort-direction"]))
              ])
            ]),
            _: 1
          })) : w.value ? F("", !0) : (g(), x("div", n1, [...q[8] || (q[8] = [
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
}), i1 = /* @__PURE__ */ be(s1, [["__scopeId", "data-v-96b44a98"]]), r1 = {
  key: 0,
  class: "w-52"
}, l1 = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, c1 = { class: "w-full shrink-0 flex min-h-0 flex-col" }, d1 = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, u1 = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, h1 = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, f1 = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, g1 = { class: "max-w-[360px] px-4 text-center" }, m1 = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, p1 = { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, b1 = { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, hi = 5, v1 = /* @__PURE__ */ he({
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
    const n = e, o = a, s = (w) => {
      o("export", w);
    }, i = (w) => {
      o("changeBreakdown", String(w));
    }, r = $e(n, "theme"), { isDark: l } = Me(r), c = {
      wsp: "#25D366",
      whatsapp: "#25D366",
      voice: "#8b5cf6",
      sms: "#f59e0b",
      web_chat: "#06b6d4",
      email: "#ec4899",
      messenger: "#0084ff",
      telegram: "#0088cc",
      instagram: "#E4405F"
    }, u = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899", "#06B6D4"], f = (w) => {
      const _ = w.toLowerCase(), k = c[_];
      if (k) return k;
      const C = Array.from(_).reduce(
        (S, M) => (S << 5) - S + M.charCodeAt(0) | 0,
        0
      );
      return u[Math.abs(C) % u.length];
    }, m = ne({
      labels: [],
      datasets: []
    }), p = $(
      () => n.data ?? {
        channels_by_day: {},
        total_by_channel: {},
        total_conversations: 0
      }
    ), h = $(() => {
      const w = p.value.total_by_channel || {}, _ = Object.values(w).reduce(
        (C, S) => C + S,
        0
      ), k = n.totalConversations ?? _;
      return k === 0 ? [] : Object.entries(w).sort(([, C], [, S]) => S - C).map(([C, S]) => ({
        name: C,
        label: C.toUpperCase(),
        total: S,
        percentage: (S / k * 100).toFixed(1),
        color: f(C)
      }));
    }), b = $(
      () => h.value.slice(0, hi)
    ), v = $(() => {
      const w = Math.min(b.value.length, hi);
      if (!(w <= 0))
        return { gridTemplateColumns: `repeat(${w}, minmax(0, 1fr))` };
    }), y = (w) => {
      if (!w || !w.channels_by_day) {
        m.value = { labels: [], datasets: [] };
        return;
      }
      const _ = w.channels_by_day, k = Object.keys(_).sort();
      if (k.length === 0) {
        m.value = { labels: [], datasets: [] };
        return;
      }
      const C = /* @__PURE__ */ new Set();
      for (const R of Object.values(_))
        for (const V of Object.keys(R))
          C.add(V);
      const M = Array.from(C).map((R) => ({
        label: R.toUpperCase(),
        data: k.map((V) => _[V]?.[R] || 0),
        borderColor: f(R)
      }));
      m.value = {
        labels: k.map((R) => He(R).format("MMM DD")),
        datasets: M
      };
    };
    return Te(
      () => n.data,
      (w) => {
        y(w ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: l }), (w, _) => (g(), ae(Se, {
      class: "w-full min-h-0 self-start",
      title: n.title,
      subtitle: n.subtitle,
      collapsible: !1,
      loading: n.loading
    }, {
      headerAside: O(() => [
        n.breakdownOptions.length ? (g(), x("div", r1, [
          N(na, {
            "model-value": n.breakdownBy,
            options: n.breakdownOptions,
            "onUpdate:modelValue": i
          }, null, 8, ["model-value", "options"])
        ])) : F("", !0)
      ]),
      headerExport: O(() => [
        e.enableExport && !n.loading ? (g(), ae(T(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", l1, [
          d("div", c1, [
            m.value.labels && m.value.labels.length ? (g(), x("section", d1, [
              d("div", u1, [
                N(bt, {
                  data: m.value,
                  theme: r.value
                }, null, 8, ["data", "theme"])
              ]),
              n.showSummaryCards && b.value.length ? (g(), x("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: Ce(v.value)
              }, [
                (g(!0), x(ue, null, pe(b.value, (k) => (g(), ae(xe, {
                  key: k.name,
                  class: "min-w-0",
                  color: k.color,
                  title: k.label,
                  value: `${k.percentage}%`,
                  subvalue: `${T(me)(k.total)} ${n.unit}`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : F("", !0)
            ])) : n.showSummaryCards && h.value.length ? (g(), x("section", h1, [
              d("div", {
                class: "grid w-full gap-3 md:gap-4",
                style: Ce(v.value)
              }, [
                (g(!0), x(ue, null, pe(b.value, (k) => (g(), ae(xe, {
                  key: k.name,
                  class: "min-w-0",
                  color: k.color,
                  title: k.label,
                  value: `${k.percentage}%`,
                  subvalue: `${T(me)(k.total)} ${n.unit}`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)
            ])) : F("", !0),
            h.value.length ? F("", !0) : (g(), x("section", f1, [
              d("div", g1, [
                d("div", m1, [
                  N(T(lt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                d("p", p1, A(n.emptyTitle), 1),
                d("p", b1, A(n.emptyDescription), 1)
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["title", "subtitle", "loading"]));
  }
}), Dr = /* @__PURE__ */ be(v1, [["__scopeId", "data-v-987b8c34"]]), y1 = /* @__PURE__ */ he({
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
    const a = e, n = t, o = $(() => a.data?.total_conversations ?? 0), s = $(() => a.data?.breakdown_by_day ?? {}), i = $(() => a.titles[a.breakdownBy]), r = $(() => ({ agents_by_day: s.value })), l = $(() => ({
      channels_by_day: s.value,
      total_by_channel: Object.fromEntries(
        (a.data?.breakdown_items ?? []).map((c) => [c.key, c.total_conversations])
      ),
      total_conversations: o.value
    }));
    return (c, u) => a.breakdownBy === "channel" ? (g(), ae(Dr, {
      key: 0,
      data: l.value,
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
    }, null, 8, ["data", "loading", "title", "subtitle", "breakdown-by", "breakdown-options", "total-conversations", "empty-title", "empty-description"])) : (g(), ae($r, {
      key: 1,
      data: r.value,
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
}), x1 = { class: "card-body" }, k1 = { class: "chart-container" }, _1 = { class: "triage-table-block w-full min-w-0" }, w1 = { class: "triage-row-label" }, C1 = {
  key: 1,
  class: "triage-count"
}, $1 = {
  key: 1,
  class: "triage-count"
}, S1 = {
  key: 1,
  class: "triage-count"
}, M1 = {
  key: 1,
  class: "triage-count"
}, D1 = {
  key: 1,
  class: "triage-count"
}, A1 = {
  key: 1,
  class: "empty-state"
}, T1 = { class: "empty-state-content" }, B1 = { class: "empty-icon-wrapper" }, L1 = /* @__PURE__ */ he({
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
    }, { isDark: i, colors: r } = Me(
      $e(n, "theme")
    ), l = $(() => {
      const _ = n.data?.combinations || {}, k = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [C, S] of Object.entries(_)) {
        const M = C.split("+").filter(Boolean);
        if (!M.includes("triage")) continue;
        const R = M.filter((V) => V !== "triage").length;
        R >= 4 ? k["4p"] += Number(S) || 0 : k[R] += Number(S) || 0;
      }
      return k;
    }), c = $(() => {
      const _ = l.value;
      return _[0] + _[1] + _[2] + _[3] + _["4p"] || 0;
    }), u = $(() => Object.keys(n.data?.combinations || {}).length > 0), f = $(() => {
      const _ = c.value;
      if (!_) return { pct0: 0, pct1: 0, pct2: 0, pct3: 0, pct4p: 0 };
      const k = l.value;
      return {
        pct0: k[0] / _ * 100,
        pct1: k[1] / _ * 100,
        pct2: k[2] / _ * 100,
        pct3: k[3] / _ * 100,
        pct4p: k["4p"] / _ * 100
      };
    }), m = [
      { key: "metric", label: "Number of intentions", align: "left" },
      { key: "b0", label: "0", align: "center" },
      { key: "b1", label: "1", align: "center" },
      { key: "b2", label: "2", align: "center" },
      { key: "b3", label: "3", align: "center" },
      { key: "b4p", label: "4 or more", align: "center" }
    ], p = $(() => {
      const _ = f.value, k = l.value;
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
          b0: k[0],
          b1: k[1],
          b2: k[2],
          b3: k[3],
          b4p: k["4p"]
        }
      ];
    }), h = {
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
    }, b = (_) => _?.replace("80", "") || "#888888", v = $(() => ({
      labels: ["Distribution"],
      datasets: [
        {
          label: "0",
          data: [f.value.pct0],
          backgroundColor: h.c0,
          borderColor: b(h.c0),
          borderWidth: 1
        },
        {
          label: "1",
          data: [f.value.pct1],
          backgroundColor: h.c1,
          borderColor: b(h.c1),
          borderWidth: 1
        },
        {
          label: "2",
          data: [f.value.pct2],
          backgroundColor: h.c2,
          borderColor: b(h.c2),
          borderWidth: 1
        },
        {
          label: "3",
          data: [f.value.pct3],
          backgroundColor: h.c3,
          borderColor: b(h.c3),
          borderWidth: 1
        },
        {
          label: "4+",
          data: [f.value.pct4p],
          backgroundColor: h.c4p,
          borderColor: b(h.c4p),
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
    })), w = (_) => `${(Number(_) || 0).toFixed(0)}`;
    return t({ isDark: i }), (_, k) => (g(), ae(Se, {
      class: "triage-combinations-root h-full min-h-0",
      title: "Distribution of Number of Intents",
      subtitle: "Analysis of intent combinations per conversation",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !e.loading ? (g(), ae(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", x1, [
          u.value ? (g(), x(ue, { key: 0 }, [
            d("div", k1, [
              N(Mt, {
                data: v.value,
                options: y.value
              }, null, 8, ["data", "options"])
            ]),
            N(xe, {
              class: "w-full min-w-0",
              title: "Total",
              value: T(me)(c.value),
              subvalue: "Conversations with triage"
            }, null, 8, ["value"]),
            d("div", _1, [
              N(gt, {
                columns: m,
                rows: p.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-metric": O(({ row: C }) => [
                  d("span", w1, A(C.metric), 1)
                ]),
                "cell-b0": O(({ row: C }) => [
                  C.id === "pct" ? (g(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: Ce({ color: b(h.c0) })
                  }, A(w(Number(C.b0))) + "%", 5)) : (g(), x("span", C1, A(T(me)(Number(C.b0))), 1))
                ]),
                "cell-b1": O(({ row: C }) => [
                  C.id === "pct" ? (g(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: Ce({ color: b(h.c1) })
                  }, A(w(Number(C.b1))) + "%", 5)) : (g(), x("span", $1, A(T(me)(Number(C.b1))), 1))
                ]),
                "cell-b2": O(({ row: C }) => [
                  C.id === "pct" ? (g(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: Ce({ color: b(h.c2) })
                  }, A(w(Number(C.b2))) + "%", 5)) : (g(), x("span", S1, A(T(me)(Number(C.b2))), 1))
                ]),
                "cell-b3": O(({ row: C }) => [
                  C.id === "pct" ? (g(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: Ce({ color: b(h.c3) })
                  }, A(w(Number(C.b3))) + "%", 5)) : (g(), x("span", M1, A(T(me)(Number(C.b3))), 1))
                ]),
                "cell-b4p": O(({ row: C }) => [
                  C.id === "pct" ? (g(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: Ce({ color: b(h.c4p) })
                  }, A(w(Number(C.b4p))) + "%", 5)) : (g(), x("span", D1, A(T(me)(Number(C.b4p))), 1))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ], 64)) : (g(), x("div", A1, [
            d("div", T1, [
              d("div", B1, [
                N(T(lt), { class: "empty-icon" })
              ]),
              k[0] || (k[0] = d("p", { class: "empty-title" }, "No triage combinations data", -1)),
              k[1] || (k[1] = d("p", { class: "empty-description" }, " No intent distribution data found for the selected period. Try adjusting the date range. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), R1 = /* @__PURE__ */ be(L1, [["__scopeId", "data-v-be7d2c0c"]]), P1 = { class: "card-body" }, I1 = {
  key: 0,
  class: "distribution-with-total flex w-full min-w-0 flex-1 flex-col gap-3 min-h-0"
}, E1 = { class: "pie-section" }, F1 = {
  key: 1,
  class: "empty-state"
}, O1 = /* @__PURE__ */ he({
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
    }, r = (p) => i[p]?.label || p.toUpperCase(), l = $(
      () => a.data?.items && a.data.items.length > 0
    ), c = $(
      () => (a.data?.items || []).reduce((p, h) => p + h.count, 0)
    ), u = $(() => {
      const p = {};
      for (const h of a.data?.items || [])
        p[h.language] = (p[h.language] || 0) + h.count;
      return Object.entries(p).map(([h, b]) => ({ language: h, count: b })).sort((h, b) => b.count - h.count);
    }), f = $(() => ({
      labels: u.value.map((p) => r(p.language)),
      datasets: [
        {
          data: u.value.map((p) => p.count),
          backgroundColor: u.value.map(
            (p, h) => s[h % s.length] + "80"
          ),
          borderColor: u.value.map(
            (p, h) => s[h % s.length]
          ),
          borderWidth: 2,
          hoverOffset: 6
        }
      ]
    })), m = $(() => ({
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
              const h = p.raw || 0, b = c.value > 0 ? (h / c.value * 100).toFixed(1) : "0";
              return ` ${p.label}: ${h} (${b}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: n }), (p, h) => (g(), ae(Se, {
      class: "select-language-root h-full min-h-0",
      title: "Language Selection",
      subtitle: "Language distribution across conversations",
      collapsible: !1,
      loading: a.loading
    }, {
      default: O(() => [
        d("div", P1, [
          l.value ? (g(), x("div", I1, [
            d("section", E1, [
              N(Fn, {
                data: f.value,
                options: m.value
              }, null, 8, ["data", "options"])
            ]),
            N(xe, {
              class: "shrink-0",
              title: "Total",
              value: T(me)(c.value),
              color: "#8b5cf6"
            }, null, 8, ["value"])
          ])) : (g(), x("section", F1, [...h[0] || (h[0] = [
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
}), V1 = /* @__PURE__ */ be(O1, [["__scopeId", "data-v-9385c088"]]), z1 = { class: "card-body" }, N1 = {
  key: 0,
  class: "guardrails-daily-section"
}, j1 = { class: "w-full min-w-0" }, H1 = { class: "font-medium" }, W1 = { class: "font-semibold" }, K1 = { class: "type-badges-row" }, U1 = { class: "guardrails-kpis grid grid-cols-2 gap-3 lg:grid-cols-4" }, Y1 = {
  key: 1,
  class: "empty-state"
}, q1 = /* @__PURE__ */ he({
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
    const n = e, o = a, s = (v) => {
      o("export", v);
    }, { isDark: i } = Me($e(n, "theme")), r = $(
      () => n.data?.items && n.data.items.length > 0
    ), l = $(
      () => (n.data?.items || []).reduce((v, y) => v + y.count, 0)
    ), c = (v) => {
      const y = {};
      for (const k of n.data?.items || [])
        y[k[v]] = (y[k[v]] || 0) + k.count;
      const w = Object.entries(y).sort((k, C) => C[1] - k[1]);
      if (w.length === 0) return { name: "—", pct: 0 };
      const _ = l.value;
      return {
        name: w[0][0],
        pct: _ > 0 ? Math.round(w[0][1] / _ * 100) : 0
      };
    }, u = $(() => c("guardrail_type")), f = $(() => c("guardrail_action")), m = $(() => c("guardrail_source")), p = $(() => {
      const v = {};
      for (const y of n.data?.items || [])
        v[y.date] || (v[y.date] = {}), v[y.date][y.guardrail_type] = (v[y.date][y.guardrail_type] || 0) + y.count;
      return Object.entries(v).map(([y, w]) => ({
        date: y,
        total: Object.values(w).reduce((_, k) => _ + k, 0),
        types: Object.entries(w).map(([_, k]) => ({ type: _, count: k })).sort((_, k) => k.count - _.count)
      })).sort((y, w) => new Date(y.date).getTime() - new Date(w.date).getTime());
    }), h = [
      { key: "date", label: "Date", align: "center" },
      { key: "count", label: "Count", align: "center" },
      { key: "types", label: "Types", align: "left" }
    ], b = $(
      () => p.value.map((v) => ({
        id: v.date,
        date: v.date,
        total: v.total,
        types: v.types
      }))
    );
    return t({ isDark: i }), (v, y) => (g(), ae(Se, {
      class: "guardrails-root h-full min-h-0",
      title: "Guardrails Metrics",
      subtitle: "Content safety guardrail events and actions",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !n.loading ? (g(), ae(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", z1, [
          r.value ? (g(), x(ue, { key: 0 }, [
            p.value.length > 0 ? (g(), x("section", N1, [
              d("div", j1, [
                N(gt, {
                  columns: h,
                  rows: b.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-date": O(({ row: w }) => [
                    d("span", H1, A(T(He)(String(w.date)).format("MMM DD")), 1)
                  ]),
                  "cell-count": O(({ row: w }) => [
                    d("span", W1, A(T(me)(w.total)), 1)
                  ]),
                  "cell-types": O(({ row: w }) => [
                    d("div", K1, [
                      (g(!0), x(ue, null, pe(w.types, (_) => (g(), x("span", {
                        key: _.type,
                        class: "type-count-badge"
                      }, A(_.type) + " (" + A(_.count) + ") ", 1))), 128))
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : F("", !0),
            d("section", U1, [
              N(xe, {
                title: "Total Events",
                value: T(me)(l.value)
              }, null, 8, ["value"]),
              N(xe, {
                title: "Top type",
                value: u.value.name,
                subvalue: u.value.pct > 0 ? `(${u.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              N(xe, {
                title: "Top action",
                value: f.value.name,
                subvalue: f.value.pct > 0 ? `(${f.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              N(xe, {
                title: "Top source",
                value: m.value.name,
                subvalue: m.value.pct > 0 ? `(${m.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"])
            ])
          ], 64)) : (g(), x("section", Y1, [...y[0] || (y[0] = [
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
}), X1 = /* @__PURE__ */ be(q1, [["__scopeId", "data-v-c042ede0"]]), G1 = { class: "card-body" }, Z1 = { class: "chart-section" }, Q1 = { class: "chart-wrapper" }, J1 = {
  key: 1,
  class: "empty-chart"
}, ex = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5" }, tx = {
  key: 0,
  class: "dn-failure-section"
}, ax = { class: "w-full min-w-0" }, nx = { class: "failure-reason" }, ox = { class: "failure-count" }, sx = { class: "impact-bar-container" }, ix = { class: "impact-label" }, rx = { class: "dn-trend-health-block flex flex-col gap-0" }, lx = {
  key: 0,
  class: "chart-section dn-trend-chart-section"
}, cx = { class: "dn-trend-chart-area min-h-[280px] w-full min-w-0 flex-1" }, dx = { class: "system-health" }, ux = { class: "system-health-content" }, hx = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4" }, fx = {
  key: 1,
  class: "empty-state"
}, gx = /* @__PURE__ */ he({
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
    }, { isDark: i, colors: r } = Me($e(n, "theme")), l = $(() => {
      const C = n.data?.documentCounts?.items || [], S = n.data?.processingCounts?.items || [];
      return C.length > 0 || S.length > 0;
    }), c = $(() => {
      const C = n.data?.documentCounts?.items || [];
      return {
        processing_started: C.reduce((S, M) => S + M.processing_started, 0),
        processing_completed: C.reduce((S, M) => S + M.processing_completed, 0),
        processing_failed: C.reduce((S, M) => S + M.processing_failed, 0),
        row_count_total: C.reduce((S, M) => S + M.row_count_total, 0)
      };
    }), u = $(() => {
      const C = n.data?.processingCounts?.items || [];
      return {
        processing_started: C.reduce((S, M) => S + M.processing_started, 0),
        processing_success: C.reduce((S, M) => S + M.processing_success, 0),
        notification_sent: C.reduce((S, M) => S + M.notification_sent, 0),
        notification_failed: C.reduce((S, M) => S + M.notification_failed, 0),
        dq_phone: C.reduce((S, M) => S + M.dq_error_phone_not_found, 0),
        dq_flight: C.reduce((S, M) => S + M.dq_error_flight_not_found, 0),
        dq_booking: C.reduce((S, M) => S + M.dq_error_booking_not_found, 0),
        dq_other: C.reduce((S, M) => S + M.dq_error_other, 0),
        totalDqErrors: C.reduce(
          (S, M) => S + M.dq_error_phone_not_found + M.dq_error_flight_not_found + M.dq_error_booking_not_found + M.dq_error_other,
          0
        )
      };
    }), f = $(
      () => c.value.row_count_total || u.value.processing_started
    ), m = $(
      () => Math.max(0, f.value - u.value.notification_sent)
    ), p = (C, S) => S ? `${Math.round(C / S * 100)}%` : "0%", h = $(() => {
      const C = [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Flight not found", count: u.value.dq_flight },
        {
          reason: "Notification failed",
          count: u.value.notification_failed
        },
        { reason: "Other", count: u.value.dq_other }
      ].filter((S) => S.count > 0).sort((S, M) => M.count - S.count);
      return C.length > 0 ? C[0] : { reason: "None", count: 0 };
    }), b = $(() => {
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
      ].map((S) => ({
        ...S,
        impactPct: C > 0 ? Math.round(S.count / C * 100) : 0
      }));
    }), v = [
      { key: "reason", label: "Reason", align: "left" },
      { key: "count", label: "Count", align: "center" },
      { key: "impact", label: "Impact", align: "center" }
    ], y = $(
      () => b.value.map((C) => ({
        id: C.reason,
        reason: C.reason,
        count: C.count,
        impactPct: C.impactPct
      }))
    ), w = $(() => {
      const C = f.value, S = u.value.processing_success, M = Math.max(0, S - u.value.totalDqErrors), R = u.value.notification_sent, V = Math.max(0, C - S), W = u.value.totalDqErrors, D = Math.max(0, M - R), I = (H, Q) => ye(H, Q), B = [
        { name: "Records Detected", status: "success" },
        { name: "Valid Reservations", status: "success" },
        { name: "Invalid / Unprocessed", status: "error" },
        { name: "Contactable", status: "success" },
        { name: "Data Quality Issues", status: "error" },
        { name: "Notified", status: "success" },
        { name: "Not Delivered", status: "abandon" }
      ], j = [];
      return S > 0 && j.push({
        source: "Records Detected",
        target: "Valid Reservations",
        value: S,
        label: I(S, C)
      }), V > 0 && j.push({
        source: "Records Detected",
        target: "Invalid / Unprocessed",
        value: V,
        label: I(V, C)
      }), M > 0 && j.push({
        source: "Valid Reservations",
        target: "Contactable",
        value: M,
        label: I(M, C)
      }), W > 0 && j.push({
        source: "Valid Reservations",
        target: "Data Quality Issues",
        value: W,
        label: I(W, C)
      }), R > 0 && j.push({
        source: "Contactable",
        target: "Notified",
        value: R,
        label: I(R, C)
      }), D > 0 && j.push({
        source: "Contactable",
        target: "Not Delivered",
        value: D,
        label: I(D, C)
      }), { nodes: B, links: j };
    }), _ = $(() => {
      const C = [...n.data?.processingCounts?.items || []].sort(
        (I, B) => new Date(I.date).getTime() - new Date(B.date).getTime()
      ), S = n.data?.documentCounts?.items || [], M = {};
      for (const I of S)
        M[I.date] = (M[I.date] || 0) + I.row_count_total;
      const R = [
        .../* @__PURE__ */ new Set([
          ...C.map((I) => I.date),
          ...S.map((I) => I.date)
        ])
      ].sort(), V = R.map((I) => He(I).format("MMM DD")), W = R.map((I) => {
        const B = C.find((Q) => Q.date === I), j = B?.notification_sent || 0, H = M[I] || B?.processing_started || 0;
        return H > 0 ? Math.round(j / H * 100) : 0;
      }), D = R.map((I) => C.find((j) => j.date === I)?.notification_sent || 0);
      return {
        labels: V,
        datasets: [
          {
            label: "Success Rate (%)",
            data: W,
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
    }), k = $(() => ({
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
            callback: (C) => `${C}%`
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
    return t({ isDark: i }), (C, S) => (g(), ae(Se, {
      class: "dn-metrics-root h-full min-h-0",
      title: "Disruption Notifier",
      subtitle: "Passenger notification effectiveness and delivery analysis",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: S[0] || (S[0] = (M) => o("open"))
    }, {
      headerExport: O(() => [
        e.enableExport && !n.loading ? (g(), ae(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", G1, [
          l.value ? (g(), x(ue, { key: 0 }, [
            d("section", Z1, [
              S[2] || (S[2] = d("div", { class: "chart-header" }, [
                d("h4", { class: "section-title" }, "Passenger Disruption Funnel")
              ], -1)),
              d("div", Q1, [
                w.value.nodes.length > 0 && w.value.links.length > 0 ? (g(), ae(aa, {
                  key: 0,
                  data: w.value,
                  height: "350px",
                  "use-gradient": !1,
                  "node-gap": 16
                }, null, 8, ["data"])) : (g(), x("div", J1, [...S[1] || (S[1] = [
                  d("p", { class: "empty-chart-text" }, " No processing data available for visualization ", -1)
                ])]))
              ])
            ]),
            d("div", ex, [
              N(xe, {
                color: "#3b82f6",
                title: "Total Records",
                value: T(me)(c.value.row_count_total)
              }, null, 8, ["value"]),
              N(xe, {
                color: "#8b5cf6",
                title: "Passengers Affected",
                value: T(me)(f.value)
              }, null, 8, ["value"]),
              N(xe, {
                color: "#10b981",
                title: "Successfully Notified",
                value: T(me)(u.value.notification_sent),
                subvalue: p(u.value.notification_sent, f.value)
              }, null, 8, ["value", "subvalue"]),
              N(xe, {
                color: "#ef4444",
                title: "Not Notified",
                value: T(me)(m.value),
                subvalue: p(m.value, f.value)
              }, null, 8, ["value", "subvalue"]),
              N(xe, {
                color: "#f59e0b",
                title: "Main Failure Reason",
                value: h.value.reason,
                subvalue: h.value.count > 0 ? `${T(me)(h.value.count)} cases` : void 0
              }, null, 8, ["value", "subvalue"])
            ]),
            b.value.length > 0 ? (g(), x("section", tx, [
              S[3] || (S[3] = d("div", { class: "section-header" }, [
                d("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
              ], -1)),
              d("div", ax, [
                N(gt, {
                  columns: v,
                  rows: y.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-reason": O(({ row: M }) => [
                    d("span", nx, A(M.reason), 1)
                  ]),
                  "cell-count": O(({ row: M }) => [
                    d("span", ox, A(T(me)(M.count)), 1)
                  ]),
                  "cell-impact": O(({ row: M }) => [
                    d("div", sx, [
                      d("div", {
                        class: "impact-bar",
                        style: Ce({ width: M.impactPct + "%" })
                      }, null, 4),
                      d("span", ix, A(M.impactPct) + "%", 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : F("", !0),
            d("div", rx, [
              _.value.labels.length > 0 ? (g(), x("section", lx, [
                S[4] || (S[4] = d("div", { class: "chart-header" }, [
                  d("h4", { class: "section-title" }, "Notification Success Rate by Day")
                ], -1)),
                d("div", cx, [
                  N(bt, {
                    data: _.value,
                    options: k.value,
                    theme: n.theme
                  }, null, 8, ["data", "options", "theme"])
                ])
              ])) : F("", !0),
              d("details", dx, [
                S[5] || (S[5] = d("summary", { class: "system-health-toggle" }, [
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
                d("div", ux, [
                  d("div", hx, [
                    N(xe, {
                      title: "Docs Started",
                      value: T(me)(c.value.processing_started)
                    }, null, 8, ["value"]),
                    N(xe, {
                      title: "Docs Completed",
                      value: T(me)(c.value.processing_completed)
                    }, null, 8, ["value"]),
                    N(xe, {
                      title: "Docs Failed",
                      value: T(me)(c.value.processing_failed)
                    }, null, 8, ["value"]),
                    N(xe, {
                      title: "Processing Started",
                      value: T(me)(u.value.processing_started)
                    }, null, 8, ["value"]),
                    N(xe, {
                      title: "Processing Success",
                      value: T(me)(u.value.processing_success)
                    }, null, 8, ["value"]),
                    N(xe, {
                      title: "Notification Failed",
                      value: T(me)(u.value.notification_failed)
                    }, null, 8, ["value"])
                  ])
                ])
              ])
            ])
          ], 64)) : (g(), x("section", fx, [...S[6] || (S[6] = [
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
}), mx = /* @__PURE__ */ be(gx, [["__scopeId", "data-v-2342d485"]]), px = /* @__PURE__ */ he({
  __name: "TotalConversationsCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = $(() => me(a.totalConversations)), s = $(() => T(n.value?.isDark) ?? !1), i = $(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (g(), ae(ot, {
      label: "Total Conversations",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.totalConversations,
      "previous-value": e.previousTotalConversations,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: O(() => [...l[0] || (l[0] = [
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
    }, 8, ["value", "loading", "theme", "current-value", "previous-value"]));
  }
}), bx = /* @__PURE__ */ he({
  __name: "CsatP95Card",
  props: {
    csatP95: { default: 0 },
    previousCsatP95: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = $(() => `${a.csatP95.toFixed(1)}`), s = $(() => T(n.value?.isDark) ?? !1), i = $(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (g(), ae(ot, {
      label: "CSAT P95",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.csatP95,
      "previous-value": e.previousCsatP95,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: O(() => [...l[0] || (l[0] = [
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
    }, 8, ["value", "loading", "theme", "current-value", "previous-value"]));
  }
}), vx = /* @__PURE__ */ he({
  __name: "CsatPulseCard",
  props: {
    csatPulse: { default: 0 },
    previousCsatPulse: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = $(() => `${a.csatPulse.toFixed(1)}%`), s = $(() => T(n.value?.isDark) ?? !1), i = $(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (g(), ae(ot, {
      label: "CSAT Pulse",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.csatPulse,
      "previous-value": e.previousCsatPulse,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: O(() => [...l[0] || (l[0] = [
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
}), yx = {
  key: 0,
  class: "card-body"
}, xx = { class: "chart-wrapper" }, kx = { class: "overview-card-infos mt-4 flex w-full flex-col gap-3 sm:flex-row sm:gap-4" }, _x = {
  key: 1,
  class: "empty-state"
}, wx = 520, Cx = 300, $x = 40, Sx = 48, Mx = 48, Dx = {
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
    }, s = e, { isDark: i } = Me($e(s, "theme")), r = $(() => s.data);
    return t({ isDark: i }), (l, c) => (g(), ae(Se, {
      class: "nps-overview-root min-h-0",
      title: "CSAT Overview Metrics",
      subtitle: "Overall CSAT Distribution",
      collapsible: !1,
      loading: s.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !s.loading ? (g(), ae(T(ze), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        r.value && r.value.total_nps_responses > 0 ? (g(), x("div", yx, [
          d("div", xx, [
            N(vr, {
              histogram: r.value.histogram || [],
              "min-score": r.value.min_score || 0,
              "max-score": r.value.max_score || 0,
              "q1-score": r.value.q1_score || 0,
              "median-score": r.value.median_score || 0,
              "q3-score": r.value.q3_score || 0,
              "average-score": r.value.average_score || 0,
              "chart-width": wx,
              "chart-height": Cx,
              "chart-margin": $x,
              "chart-margin-right": Sx,
              "chart-bottom-margin": Mx,
              "plot-inset": 10,
              "show-legend": !1,
              "show-stat-labels": !1
            }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score"])
          ]),
          d("div", kx, [
            N(xe, {
              class: "min-w-0 flex-1",
              title: "Responses",
              value: String(r.value.total_nps_responses)
            }, null, 8, ["value"]),
            r.value.p95_score > 0 ? (g(), ae(xe, {
              key: 0,
              class: "min-w-0 flex-1",
              title: "Percentile 95",
              value: String(r.value.p95_score)
            }, null, 8, ["value"])) : F("", !0)
          ])
        ])) : (g(), x("div", _x, [...c[0] || (c[0] = [
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
}, Ar = /* @__PURE__ */ be(Dx, [["__scopeId", "data-v-e98fe9b2"]]), Ax = {
  key: 0,
  class: "card-body"
}, Tx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Bx = {
  key: 1,
  class: "empty-state"
}, Lx = {
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
    }, o = e, s = $(() => o.data?.csat_p95_by_day || []), i = $(() => s.value.length > 0), r = $(() => ({
      labels: s.value.map((c) => He(c.date).format("DD-MM-YYYY")),
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
    return (c, u) => (g(), ae(Se, {
      class: "nps-daily-root min-h-0",
      title: "CSAT P95",
      subtitle: "Daily P95 trend for CSAT responses",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !o.loading ? (g(), ae(T(ze), {
          key: 0,
          variant: "inline",
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        i.value ? (g(), x("div", Ax, [
          d("div", Tx, [
            N(bt, {
              data: r.value,
              options: l,
              "uppercase-legend-labels": !0
            }, null, 8, ["data"])
          ])
        ])) : (g(), x("div", Bx, [...u[0] || (u[0] = [
          d("p", { class: "empty-title" }, "No daily CSAT P95 available", -1),
          d("p", { class: "empty-description" }, " No CSAT P95 points were found for the selected date range. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}, Tr = /* @__PURE__ */ be(Lx, [["__scopeId", "data-v-5207cfa7"]]), Rx = {
  key: 0,
  class: "card-body"
}, Px = {
  key: 1,
  class: "empty-state"
}, Ix = /* @__PURE__ */ he({
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
    return (i, r) => (g(), ae(Se, {
      class: "nps-resolution-root min-h-0",
      title: "CSAT Resolution",
      subtitle: "Resolution answers distribution (1=Si, 2=No)",
      collapsible: !1,
      loading: t.loading
    }, {
      default: O(() => [
        n.value ? (g(), x("div", Rx, [
          N(Mt, {
            data: o.value,
            options: s,
            "uppercase-legend-labels": !0
          }, null, 8, ["data"])
        ])) : (g(), x("div", Px, [...r[0] || (r[0] = [
          d("p", { class: "empty-title" }, "No resolution answers available", -1),
          d("p", { class: "empty-description" }, " This airline has the resolution survey configured, but no responses were found for the selected dates. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Ex = /* @__PURE__ */ be(Ix, [["__scopeId", "data-v-6849ef24"]]), Fx = {
  key: 0,
  class: "card-body"
}, Ox = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Vx = {
  key: 1,
  class: "empty-state"
}, zx = /* @__PURE__ */ he({
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
    }, o = e, s = $(() => o.data?.csat_pulse_by_day || []), i = $(() => s.value.length > 0), r = $(() => ({
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
    return (c, u) => (g(), ae(Se, {
      class: "nps-pulse-root min-h-0",
      title: "CSAT Pulse",
      subtitle: "Weighted index: Σ(frequency × weight) / total surveys × 100",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !o.loading ? (g(), ae(T(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: n
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        i.value ? (g(), x("div", Fx, [
          d("div", Ox, [
            N(bt, {
              data: r.value,
              options: l,
              "uppercase-legend-labels": !0
            }, null, 8, ["data"])
          ])
        ])) : (g(), x("div", Vx, [...u[0] || (u[0] = [
          d("p", { class: "empty-title" }, "No CSAT Pulse data available", -1),
          d("p", { class: "empty-description" }, " No CSAT pulse points were found for the selected date range. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Nx = /* @__PURE__ */ be(zx, [["__scopeId", "data-v-72955d9a"]]), jx = { class: "nps-metrics-container flex flex-col gap-6 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Hx = { class: "grid w-full grid-cols-1 items-start gap-6 md:grid-cols-2" }, Br = {
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
    }, o = e, s = $(() => o.showResolutionChart), i = $(() => o.showCsatPulseChart), r = $(
      () => (s.value ? 1 : 0) + (i.value ? 1 : 0)
    ), l = $(() => r.value > 0), c = $(
      () => r.value > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
    );
    return (u, f) => (g(), x("div", jx, [
      d("div", Hx, [
        N(Ar, {
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: n
        }, null, 8, ["data", "loading", "enable-export"]),
        N(Tr, {
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: n
        }, null, 8, ["data", "loading", "enable-export"])
      ]),
      l.value ? (g(), x("div", {
        key: 0,
        class: Z(["grid w-full items-start gap-6", c.value])
      }, [
        s.value ? (g(), ae(Ex, {
          key: 0,
          class: "min-w-0",
          data: e.data,
          loading: e.loading
        }, null, 8, ["data", "loading"])) : F("", !0),
        i.value ? (g(), ae(Nx, {
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
}, Wx = { class: "csat-container__body" }, Kx = /* @__PURE__ */ he({
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
    return (o, s) => (g(), ae(Se, {
      class: "csat-container-root w-full",
      title: "CSAT",
      subtitle: "Customer satisfaction score distribution and daily trend metrics.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: s[0] || (s[0] = (i) => a("open"))
    }, {
      default: O(() => [
        d("div", Wx, [
          N(Br, {
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
}), Ux = /* @__PURE__ */ be(Kx, [["__scopeId", "data-v-37178ba1"]]), Yx = /* @__PURE__ */ he({
  __name: "AiGeneratedRevenueCard",
  props: {
    totalRevenue: { default: 0 },
    previousTotalRevenue: { default: null },
    currencyCode: { default: "USD" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = $(() => Ut(a.totalRevenue)), s = $(() => T(n.value?.isDark) ?? !1), i = $(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (g(), ae(ot, {
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
      icon: O(() => [...l[0] || (l[0] = [
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
    }, 8, ["value", "prefix", "loading", "theme", "current-value", "previous-value"]));
  }
}), qx = { class: "flex justify-end" }, Xx = { class: "w-52" }, Gx = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Zx = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, Qx = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Jx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, ek = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, tk = /* @__PURE__ */ he({
  __name: "AiGeneratedChart",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    breakdownBy: { default: "all" },
    theme: { default: void 0 }
  },
  emits: ["changeBreakdown"],
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, s = $e(n, "theme"), { isDark: i, colors: r } = Me(s), l = ne(n.breakdownBy), c = $(() => n.data?.currency ?? "USD"), u = [
      { value: "all", label: "All" },
      { value: "payment_method", label: "Payment Method" },
      { value: "agent_type", label: "Agent" },
      { value: "channel", label: "Channel" },
      { value: "channel_and_agent", label: "Channel & Agent" }
    ], f = $(() => {
      const I = {
        payment_method: "Payment Method",
        agent_type: "Agent",
        channel: "Channel",
        channel_and_agent: "Channel & Agent"
      }[l.value];
      return I ? `AI Generated Revenue by ${I}` : "AI Generated Revenue";
    }), m = $(() => l.value === "payment_method"), p = [
      "#a78bfa",
      "#34d399",
      "#f59e0b",
      "#60a5fa",
      "#f472b6",
      "#fb923c",
      "#4ade80",
      "#e879f9"
    ], h = (D) => p[D % p.length], b = (D) => {
      if (!D) return "0";
      const I = Math.abs(D);
      return I >= 1e6 ? (D / 1e6).toFixed(2) + "M" : I >= 1e5 ? (D / 1e3).toFixed(1) + "K" : Math.round(D).toLocaleString();
    }, v = (D) => !D || D === "unknown" ? "Unknown" : St(D).split(/[_|]/).map((I) => I ? I.charAt(0).toUpperCase() + I.slice(1) : "").join(" "), y = ne({
      labels: [],
      datasets: []
    }), w = ne([]), _ = $(() => {
      const D = Math.min(w.value.length, 5);
      if (!(D <= 0))
        return { gridTemplateColumns: `repeat(${D}, minmax(0, 1fr))` };
    }), k = (D) => {
      const I = D?.ai_revenue_by_day ?? [], B = D?.breakdown ?? [];
      if (!I.length) {
        y.value = { labels: [], datasets: [] }, w.value = [];
        return;
      }
      const j = [...I].sort((G, oe) => G.date.localeCompare(oe.date)), H = j.map((G) => He(G.date).format("MMM DD")), Q = "ai_revenue";
      if (l.value === "all") {
        y.value = {
          labels: H,
          datasets: [
            {
              label: `Revenue (${c.value})`,
              data: j.map((G) => Number(G[Q] ?? 0)),
              borderColor: p[0],
              backgroundColor: "rgba(167,139,250,0.08)",
              fill: !1,
              tension: 0.35,
              pointRadius: 4,
              pointHoverRadius: 6,
              pointBackgroundColor: "#ffffff",
              pointBorderColor: p[0],
              pointBorderWidth: 2
            }
          ]
        }, w.value = [];
        return;
      }
      const fe = B.slice(0, 7).map((G) => G.key).map((G, oe) => {
        const L = h(oe), U = j.map((Y) => {
          const z = (Y.breakdown ?? {})[G];
          return z ? Number(z[Q] ?? 0) : 0;
        });
        return m.value ? {
          label: v(G),
          data: U,
          backgroundColor: L,
          borderColor: L,
          borderWidth: 1,
          borderRadius: 3
        } : {
          label: v(G),
          data: U,
          borderColor: L,
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: L,
          pointBorderWidth: 2
        };
      });
      y.value = { labels: H, datasets: fe }, w.value = B.slice(0, 5).map((G, oe) => ({
        key: G.key,
        label: v(G.key),
        amount: `${c.value} ${b(G.total)}`,
        percentage: Number(G.percentage ?? 0),
        color: h(oe)
      }));
    }, C = $(() => ({
      callback: (D) => `${c.value} ${b(Number(D))}`,
      color: r.value.textSecondary,
      padding: 8
    })), S = $(() => ({
      border: { display: !1 },
      grid: { color: r.value.gridLines, lineWidth: 1, drawTicks: !1 },
      ticks: { color: r.value.textSecondary, padding: 8 }
    })), M = $(() => ({
      beginAtZero: !0,
      border: { display: !1 },
      grid: { color: r.value.gridLines, lineWidth: 1, drawTicks: !1 },
      ticks: C.value
    })), R = $(() => ({
      scales: {
        x: S.value,
        y: M.value
      }
    })), V = $(() => ({
      scales: {
        x: { ...S.value, stacked: !0 },
        y: { ...M.value, stacked: !0 }
      }
    }));
    Te(
      () => n.data,
      (D) => k(D ?? null),
      { deep: !0, immediate: !0 }
    ), Te(
      () => n.breakdownBy,
      (D) => {
        l.value = D, k(n.data ?? null);
      }
    );
    const W = (D) => {
      l.value = String(D), o("changeBreakdown", l.value);
    };
    return t({ isDark: i }), (D, I) => (g(), ae(Se, {
      class: "w-full min-h-0 self-start",
      title: f.value,
      subtitle: "Revenue generated by AI agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerAside: O(() => [
        d("div", qx, [
          d("div", Xx, [
            N(na, {
              "model-value": l.value,
              options: u,
              "onUpdate:modelValue": W
            }, null, 8, ["model-value"])
          ])
        ])
      ]),
      default: O(() => [
        d("div", {
          class: Z(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", n.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          N(pt, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: O(() => [
              n.loading ? (g(), x("div", Gx, [...I[0] || (I[0] = [
                d("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (g(), x("div", Zx, [
                y.value.labels && y.value.labels.length && y.value.datasets.length ? (g(), x("section", Qx, [
                  d("div", Jx, [
                    m.value ? (g(), ae(Mt, {
                      key: 0,
                      data: y.value,
                      options: V.value,
                      theme: s.value
                    }, null, 8, ["data", "options", "theme"])) : (g(), ae(bt, {
                      key: 1,
                      data: y.value,
                      options: R.value,
                      theme: s.value
                    }, null, 8, ["data", "options", "theme"]))
                  ]),
                  w.value.length ? (g(), x("div", {
                    key: 0,
                    class: "grid w-full gap-3 md:gap-4",
                    style: Ce(_.value)
                  }, [
                    (g(!0), x(ue, null, pe(w.value, (B) => (g(), ae(xe, {
                      key: `card-${B.key}`,
                      class: "min-w-0",
                      color: B.color,
                      title: B.label,
                      value: B.amount,
                      subvalue: `${B.percentage.toFixed(1)}%`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ], 4)) : F("", !0)
                ])) : (g(), x("section", ek, [...I[1] || (I[1] = [
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
}), ak = /* @__PURE__ */ be(tk, [["__scopeId", "data-v-d3e5e67f"]]), fi = 1, nk = /* @__PURE__ */ he({
  __name: "CostCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), { isDark: o } = Me($e(a, "theme")), s = $(() => a.totalConversations * fi), i = $(() => a.previousTotalConversations === null || a.previousTotalConversations === void 0 ? null : a.previousTotalConversations * fi), r = $(() => me(s.value)), l = $(
      () => i.value !== null && i.value !== void 0
    ), c = $(() => {
      if (!l.value) return 0;
      const m = i.value;
      return m === 0 ? s.value > 0 ? 100 : 0 : (s.value - m) / m * 100;
    }), u = $(() => {
      const m = c.value.toFixed(1);
      return c.value > 0 ? `+${m}%` : `${m}%`;
    }), f = $(() => c.value < 0 ? "change-badge--up" : c.value > 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: o, changePercent: c }), (m, p) => (g(), ae(ot, {
      label: "Cost",
      value: r.value,
      prefix: "USD",
      loading: e.loading,
      theme: e.theme,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: O(() => [...p[0] || (p[0] = [
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
        l.value ? (g(), x("div", {
          key: 0,
          class: Z(["change-badge", f.value, { "change-badge--dark": T(o) }])
        }, A(u.value), 3)) : F("", !0)
      ]),
      _: 1
    }, 8, ["value", "loading", "theme"]));
  }
}), ok = /* @__PURE__ */ be(nk, [["__scopeId", "data-v-411e0735"]]), sk = { class: "flex justify-end" }, ik = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, rk = { class: "w-full shrink-0 flex min-h-0 flex-col" }, lk = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, ck = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, dk = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, uk = /* @__PURE__ */ he({
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
    const n = e, o = a, s = (k) => {
      o("export", k);
    }, i = $e(n, "theme"), { isDark: r } = Me(i), l = ne(n.breakdownBy), c = $(() => n.data ?? {
      total_conversations: 0,
      total_escalated_conversations: 0,
      escalation_rate_percentage: 0,
      breakdown_by: "all",
      breakdown_items: [],
      breakdown_by_day: [],
      escalations_by_day: []
    }), u = ne({
      labels: [],
      datasets: []
    }), f = ne([]), m = $(() => {
      const k = f.value.length;
      if (!(k <= 0))
        return { gridTemplateColumns: `repeat(${k}, minmax(0, 1fr))` };
    }), p = ne(
      []
    ), h = [
      "#3b82f6",
      "#f59e0b",
      "#06b6d4",
      "#8b5cf6",
      "#22c55e",
      "#ef4444",
      "#14b8a6"
    ], b = (k) => h[k % h.length], v = {
      scales: {
        y: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 25,
            callback: (k) => `${k}%`
          }
        }
      }
    }, y = () => {
      o("changeBreakdown", l.value);
    }, w = (k) => {
      if (!k) return "";
      const S = k.replace(/_/g, " ").trim().replace(/\s+state$/i, "").trim();
      return S ? S.charAt(0).toUpperCase() + S.slice(1) : "";
    }, _ = (k) => {
      if (l.value === "all") {
        const D = k?.escalations_by_day ?? [];
        if (!D.length) {
          u.value = { labels: [], datasets: [] }, f.value = [], p.value = [];
          return;
        }
        const I = [...D].sort((B, j) => B.date.localeCompare(j.date));
        u.value = {
          labels: I.map((B) => He(B.date).format("MMM DD")),
          datasets: [
            {
              label: "All",
              data: I.map(
                (B) => Number(B.escalation_rate_percentage || 0)
              ),
              borderColor: "#8b5cf6",
              backgroundColor: "transparent",
              fill: !1,
              tension: 0.35
            }
          ]
        }, f.value = [], p.value = [];
        return;
      }
      const C = k?.breakdown_by_day ?? [], S = k?.breakdown_items ?? [];
      if (!C.length) {
        u.value = { labels: [], datasets: [] }, f.value = [], p.value = [];
        return;
      }
      const M = [...C].sort(
        (D, I) => D.date.localeCompare(I.date)
      ), R = S.slice(0, 5).map((D) => D.key), V = M.map((D) => He(D.date).format("MMM DD")), W = R.map((D, I) => {
        const B = S.find((j) => j.key === D);
        return {
          label: w(B?.label || D),
          data: M.map((j) => {
            const H = j.items.find((Q) => Q.key === D);
            return Number(H?.percentage || 0);
          }),
          borderColor: b(I),
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35
        };
      });
      u.value = {
        labels: V,
        datasets: W
      }, f.value = S.slice(0, 5).map((D, I) => ({
        key: D.key,
        label: w(D.label),
        percentage: Number(D.percentage || 0),
        color: b(I)
      })), p.value = S.slice(0, 5).map((D, I) => ({
        key: D.key,
        label: w(D.label),
        color: b(I)
      }));
    };
    return Te(
      () => n.data,
      (k) => {
        _(k ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Te(
      () => n.breakdownBy,
      (k) => {
        l.value = k, _(c.value);
      }
    ), t({ isDark: r }), (k, C) => (g(), ae(Se, {
      class: "w-full min-h-0 self-start",
      title: "Human escalations",
      subtitle: "% of conversations transferred to human agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !e.loading ? (g(), ae(T(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      headerAside: O(() => [
        d("div", sk, [
          Xe(d("select", {
            "onUpdate:modelValue": C[0] || (C[0] = (S) => l.value = S),
            class: "rounded-xl border border-[var(--kiut-border-light,#d1d5db)] bg-[var(--kiut-bg-card,#ffffff)] px-3 py-2 text-sm text-[var(--kiut-text-primary,#111827)] dark:border-[var(--kiut-border-light,#374151)] dark:bg-[var(--kiut-bg-card,#111827)] dark:text-[var(--kiut-text-primary,#f9fafb)]",
            onChange: y
          }, [...C[1] || (C[1] = [
            d("option", { value: "all" }, "All", -1),
            d("option", { value: "agent" }, "By Agent", -1)
          ])], 544), [
            [qr, l.value]
          ])
        ])
      ]),
      default: O(() => [
        d("div", ik, [
          d("div", rk, [
            u.value.labels && u.value.labels.length && u.value.datasets.length ? (g(), x("section", lk, [
              d("div", ck, [
                N(bt, {
                  data: u.value,
                  options: v,
                  theme: i.value
                }, null, 8, ["data", "theme"])
              ]),
              f.value.length ? (g(), x("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: Ce(m.value)
              }, [
                (g(!0), x(ue, null, pe(f.value, (S) => (g(), ae(xe, {
                  key: `card-${S.key}`,
                  class: "min-w-0",
                  color: S.color,
                  title: S.label,
                  value: `${S.percentage.toFixed(1)}%`
                }, null, 8, ["color", "title", "value"]))), 128))
              ], 4)) : F("", !0)
            ])) : (g(), x("section", dk, [...C[2] || (C[2] = [
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
}), hk = /* @__PURE__ */ be(uk, [["__scopeId", "data-v-b18e0ebd"]]), fk = /* @__PURE__ */ he({
  __name: "HumanEscalationsCard",
  props: {
    escalationRatePercentage: { default: 0 },
    previousEscalationRatePercentage: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = $(() => `${Number(a.escalationRatePercentage || 0).toFixed(2)}%`), s = $(() => T(n.value?.isDark) ?? !1), i = $(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (g(), ae(ot, {
      label: "Human Escalations",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.escalationRatePercentage,
      "previous-value": e.previousEscalationRatePercentage,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: O(() => [...l[0] || (l[0] = [
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
    }, 8, ["value", "loading", "theme", "current-value", "previous-value"]));
  }
});
function uo(e) {
  if (e == null || Number.isNaN(e)) return "-";
  const t = Math.max(0, Math.round(e)), a = Math.floor(t / 3600), n = Math.floor(t % 3600 / 60), o = t % 60;
  return a > 0 ? `${a}h ${n}m` : n > 0 ? `${n}m ${o}s` : `${o}s`;
}
const gk = { class: "flex justify-end" }, mk = { class: "w-52" }, pk = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, bk = { class: "w-full shrink-0 flex min-h-0 flex-col" }, vk = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, yk = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, xk = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, kk = "#8b5cf6", _k = "#9ca3af", wk = "#94a3b8", Ck = /* @__PURE__ */ he({
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
    const n = e, o = a, s = (G) => {
      o("export", G);
    }, i = [
      { value: "all", label: "All" },
      { value: "agent", label: "Agent" },
      { value: "resolution_mode", label: "Resolution Mode" },
      { value: "channel", label: "Channel" },
      { value: "agent_channel", label: "Channel & Agent" }
    ], r = $e(n, "theme"), { isDark: l } = Me(r), c = ne(n.breakdownBy), u = $(() => {
      const oe = {
        resolution_mode: "Resolution Mode",
        agent: "Agent",
        channel: "Channel",
        agent_channel: "Channel & Agent"
      }[c.value];
      return oe ? `Average resolution time by ${oe}` : "Average resolution time";
    }), f = (G) => {
      c.value = String(G), o("changeBreakdown", c.value);
    }, m = [
      { key: "ai_agent", label: "AI Agent", color: "#8b5cf6" },
      { key: "human", label: "Human", color: "#f59e0b" },
      { key: "hybrid", label: "AI + Human", color: "#06b6d4" }
    ], p = {
      wsp: "#25D366",
      whatsapp: "#25D366",
      voice: "#8b5cf6",
      sms: "#f59e0b",
      web_chat: "#06b6d4",
      email: "#ec4899",
      messenger: "#0084ff",
      telegram: "#0088cc",
      instagram: "#E4405F"
    }, h = (G) => p[G.toLowerCase()] || _k, b = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, v = (G) => b[G.toLowerCase()] || wk, y = (G) => {
      const [oe] = G.split("|").map((L) => L.trim());
      return v(oe || G);
    }, w = (G) => {
      if (!G) return "Unknown";
      const oe = St(G).replace(/_/g, " ").trim();
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
    }), k = ne({
      labels: [],
      datasets: []
    }), C = $(() => {
      const G = _.value, oe = {
        ai_agent: G.ai_agent_total_conversations,
        human: G.human_total_conversations,
        hybrid: G.hybrid_total_conversations
      }, L = {
        ai_agent: G.ai_agent_avg_resolution_time_formatted,
        human: G.human_avg_resolution_time_formatted,
        hybrid: G.hybrid_avg_resolution_time_formatted
      };
      return m.map((U) => ({
        key: U.key,
        label: U.label,
        color: U.color,
        formattedValue: L[U.key] || "-",
        subvalue: `${oe[U.key] || 0} conversations`
      }));
    }), S = (G, oe) => G.map((L) => ({
      key: L.key,
      label: w(L.label),
      color: oe(L.key),
      formattedValue: L.avg_resolution_time_formatted || "-",
      subvalue: `${L.total_conversations} conversations (${L.percentage.toFixed(1)}%)`
    })), M = $(
      () => S(_.value.channel_breakdown_items ?? [], h)
    ), R = $(
      () => S(_.value.agent_breakdown_items ?? [], v)
    ), V = $(
      () => S(
        _.value.agent_channel_breakdown_items ?? [],
        y
      )
    ), W = $(() => {
      switch (c.value) {
        case "channel":
          return M.value;
        case "agent":
          return R.value;
        case "agent_channel":
          return V.value;
        case "resolution_mode":
          return C.value;
        default:
          return [];
      }
    }), D = $(() => {
      const G = W.value.length;
      if (!(G <= 0))
        return { gridTemplateColumns: `repeat(${G}, minmax(0, 1fr))` };
    }), I = (G) => G == null ? null : Number((G / 60).toFixed(2)), B = ne([]), j = (G) => {
      const oe = G?.overall_resolution_time_by_day ?? {}, L = Object.keys(oe).sort((U, Y) => U.localeCompare(Y));
      if (!L.length) {
        k.value = { labels: [], datasets: [] }, B.value = [];
        return;
      }
      B.value = [L.map((U) => oe[U] ?? null)], k.value = {
        labels: L.map((U) => He(U).format("MMM DD")),
        datasets: [
          {
            label: "All",
            data: B.value[0].map((U) => I(U)),
            borderColor: kk,
            backgroundColor: "transparent",
            fill: !1,
            tension: 0.35,
            spanGaps: !0
          }
        ]
      };
    }, H = (G) => {
      const oe = G?.resolution_time_by_day ?? {}, L = Object.keys(oe).sort((U, Y) => U.localeCompare(Y));
      if (!L.length) {
        k.value = { labels: [], datasets: [] }, B.value = [];
        return;
      }
      B.value = m.map(
        (U) => L.map((Y) => oe[Y]?.[U.key] ?? null)
      ), k.value = {
        labels: L.map((U) => He(U).format("MMM DD")),
        datasets: m.map((U, Y) => ({
          label: U.label,
          data: B.value[Y].map((z) => I(z)),
          borderColor: U.color,
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35,
          spanGaps: !0
        }))
      };
    }, Q = (G, oe, L) => {
      const U = Object.keys(G).sort((z, re) => z.localeCompare(re));
      if (!U.length || !oe.length) {
        k.value = { labels: [], datasets: [] }, B.value = [];
        return;
      }
      const Y = oe.map((z) => z.key);
      B.value = Y.map((z) => U.map((re) => G[re]?.[z] ?? null)), k.value = {
        labels: U.map((z) => He(z).format("MMM DD")),
        datasets: Y.map((z, re) => {
          const ce = oe.find((ve) => ve.key === z);
          return {
            label: w(ce?.label || z),
            data: B.value[re].map((ve) => I(ve)),
            borderColor: L(z),
            backgroundColor: "transparent",
            fill: !1,
            tension: 0.35,
            spanGaps: !0
          };
        })
      };
    }, le = (G) => {
      switch (c.value) {
        case "channel":
          Q(
            G?.channel_resolution_time_by_day ?? {},
            G?.channel_breakdown_items ?? [],
            h
          );
          return;
        case "agent":
          Q(
            G?.agent_resolution_time_by_day ?? {},
            G?.agent_breakdown_items ?? [],
            v
          );
          return;
        case "agent_channel":
          Q(
            G?.agent_channel_resolution_time_by_day ?? {},
            G?.agent_channel_breakdown_items ?? [],
            y
          );
          return;
        case "resolution_mode":
          H(G);
          return;
        default:
          j(G);
      }
    }, fe = $(() => ({
      scales: {
        y: {
          min: 0,
          ticks: {
            callback: (G) => `${G}m`
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (G) => {
              const oe = G.dataset.label || "", L = B.value[G.datasetIndex]?.[G.dataIndex];
              return L == null ? `${oe}: -` : `${oe}: ${uo(L)}`;
            }
          }
        }
      }
    }));
    return Te(
      () => n.data,
      (G) => {
        le(G ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Te(
      () => n.breakdownBy,
      (G) => {
        c.value = G, le(n.data ?? null);
      }
    ), t({ isDark: l }), (G, oe) => (g(), ae(Se, {
      class: "w-full min-h-0 self-start",
      title: u.value,
      subtitle: "How long conversations take to resolve",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !e.loading ? (g(), ae(T(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      headerAside: O(() => [
        d("div", gk, [
          d("div", mk, [
            N(na, {
              "model-value": c.value,
              options: i,
              "onUpdate:modelValue": f
            }, null, 8, ["model-value"])
          ])
        ])
      ]),
      default: O(() => [
        d("div", pk, [
          d("div", bk, [
            k.value.labels.length && k.value.datasets.length ? (g(), x("section", vk, [
              d("div", yk, [
                N(bt, {
                  data: k.value,
                  options: fe.value,
                  theme: r.value
                }, null, 8, ["data", "options", "theme"])
              ]),
              W.value.length ? (g(), x("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: Ce(D.value)
              }, [
                (g(!0), x(ue, null, pe(W.value, (L) => (g(), ae(xe, {
                  key: `card-${L.key}`,
                  class: "min-w-0",
                  color: L.color,
                  title: L.label,
                  value: L.formattedValue,
                  subvalue: L.subvalue
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : F("", !0)
            ])) : (g(), x("section", xk, [...oe[0] || (oe[0] = [
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
}), $k = /* @__PURE__ */ be(Ck, [["__scopeId", "data-v-05854dc5"]]), Sk = { class: "art-values__item" }, Mk = { class: "art-values__number" }, Dk = { class: "art-values__item" }, Ak = { class: "art-values__number" }, Tk = /* @__PURE__ */ he({
  __name: "AvgResolutionTimeCard",
  props: {
    aiAgentAvgResolutionTimeSeconds: { default: null },
    humanAvgResolutionTimeSeconds: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), { isDark: o } = Me($e(a, "theme")), s = $(() => uo(a.aiAgentAvgResolutionTimeSeconds)), i = $(() => uo(a.humanAvgResolutionTimeSeconds));
    return t({ isDark: o }), (r, l) => (g(), ae(ot, {
      label: "Average Resolution Time",
      value: s.value,
      loading: e.loading,
      theme: e.theme,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: O(() => [...l[0] || (l[0] = [
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
          class: Z(["art-values", { "art-values--dark": T(o) }])
        }, [
          d("div", Sk, [
            d("span", Mk, A(s.value), 1),
            l[1] || (l[1] = d("span", { class: "art-values__label" }, "AI Agent", -1))
          ]),
          l[3] || (l[3] = d("div", {
            class: "art-values__divider",
            "aria-hidden": "true"
          }, null, -1)),
          d("div", Dk, [
            d("span", Ak, A(i.value), 1),
            l[2] || (l[2] = d("span", { class: "art-values__label" }, "Human", -1))
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["value", "loading", "theme"]));
  }
}), Bk = /* @__PURE__ */ be(Tk, [["__scopeId", "data-v-f0592d9d"]]), Lk = /* @__PURE__ */ he({
  __name: "CheckinCR",
  props: {
    checkinCr: { default: 0 },
    previousCheckinCr: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = $(() => `${Number(a.checkinCr || 0).toFixed(1)}%`), s = $(() => T(n.value?.isDark) ?? !1), i = $(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (g(), ae(ot, {
      label: "Check-in CR",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.checkinCr,
      "previous-value": e.previousCheckinCr,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: O(() => [...l[0] || (l[0] = [
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
    }, 8, ["value", "loading", "theme", "current-value", "previous-value"]));
  }
}), Rk = /* @__PURE__ */ he({
  __name: "SellerCR",
  props: {
    sellerCr: { default: 0 },
    previousSellerCr: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = $(() => `${Number(a.sellerCr || 0).toFixed(1)}%`), s = $(() => T(n.value?.isDark) ?? !1), i = $(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (g(), ae(ot, {
      label: "Seller CR",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.sellerCr,
      "previous-value": e.previousSellerCr,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: O(() => [...l[0] || (l[0] = [
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
    }, 8, ["value", "loading", "theme", "current-value", "previous-value"]));
  }
}), Pk = /* @__PURE__ */ he({
  __name: "BookingManagerCR",
  props: {
    bookingManagerCr: { default: 0 },
    previousBookingManagerCr: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = $(
      () => `${Number(a.bookingManagerCr || 0).toFixed(1)}%`
    ), s = $(() => T(n.value?.isDark) ?? !1), i = $(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (g(), ae(ot, {
      label: "Booking Manager CR",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.bookingManagerCr,
      "previous-value": e.previousBookingManagerCr,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: O(() => [...l[0] || (l[0] = [
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
    }, 8, ["value", "loading", "theme", "current-value", "previous-value"]));
  }
}), Ik = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Ek = {
  key: 0,
  class: "flex w-full shrink-0 flex-col min-h-0"
}, Fk = { class: "flex h-[230px] max-h-[230px] w-full shrink-0 flex-col min-h-0 mb-4" }, Ok = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2" }, Vk = {
  key: 1,
  class: "flex min-h-[280px] w-full items-center justify-center"
}, zk = { class: "max-w-[360px] text-center" }, Nk = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))]" }, jk = {
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
      const r = t.data ?? {}, l = r.daily, c = r.days, u = Array.isArray(l) && l.length > 0, f = Array.isArray(c) && c.length > 0 && Array.isArray(r.allocatedCostSeries) && r.allocatedCostSeries.length === c.length;
      let m = [];
      return u ? m = l : f && (m = c.map((p, h) => ({
        date: p,
        allocated_cost: r.allocatedCostSeries[h] ?? 0,
        aws_cost: r.awsCostSeries[h] ?? 0,
        airline_conversations: r.airlineConversationsSeries[h] ?? 0
      }))), {
        daily: m,
        total_allocated_cost: r.total_allocated_cost ?? r.totalAllocated ?? 0,
        total_cost: r.total_cost ?? r.total ?? 0,
        total_conversations: r.total_conversations ?? r.totalConversations ?? 0,
        total_airline_conversations: r.total_airline_conversations ?? r.totalAirlineConversations ?? 0,
        airline_name: r.airline_name
      };
    }), s = $(() => {
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
            label(r) {
              const l = r.dataset.label ? `${r.dataset.label}: ` : "", c = r.parsed.y;
              return r.dataset.yAxisID === "y" ? l + Ie(c) : l + String(c);
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
            callback: (r) => Ie(r)
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
    return (r, l) => (g(), ae(Se, {
      title: o.value.airline_name || "AWS Cost",
      subtitle: "AWS vs Allocated costs over time",
      collapsible: !1,
      loading: e.loading
    }, {
      default: O(() => [
        d("div", Ik, [
          o.value.daily.length > 0 ? (g(), x("div", Ek, [
            d("div", Fk, [
              N(bt, {
                class: "h-full min-h-0 w-full",
                data: s.value,
                options: i.value
              }, null, 8, ["data", "options"])
            ]),
            d("div", Ok, [
              N(xe, {
                color: T(n).primaryLight,
                title: "Total Allocated",
                value: T(Ie)(o.value.total_allocated_cost)
              }, null, 8, ["color", "value"]),
              N(xe, {
                color: "#FF9900",
                title: "Total AWS",
                value: T(Ie)(o.value.total_cost)
              }, null, 8, ["value"])
            ])
          ])) : (g(), x("section", Vk, [
            d("div", zk, [
              d("div", Nk, [
                N(T(lt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
              ]),
              l[0] || (l[0] = d("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " Sin datos de costos ", -1)),
              l[1] || (l[1] = d("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No se encontró información para el periodo seleccionado. Intenta ajustar el rango de fechas. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["title", "loading"]));
  }
}, Hk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Wk = { class: "card-body" }, Kk = {
  key: 0,
  class: "chart-section"
}, Uk = { class: "chart-container" }, Yk = { class: "mt-auto grid grid-cols-2 gap-3 sm:grid-cols-3 max-[768px]:gap-2" }, qk = {
  key: 1,
  class: "empty-state"
}, Xk = { class: "empty-state-content" }, Gk = { class: "empty-icon-wrapper" }, Pa = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", gi = 10, Zk = /* @__PURE__ */ he({
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
    const n = e, { isDark: o, colors: s } = Me($e(n, "theme")), i = (h) => {
      const b = new Date(h), v = String(b.getDate()).padStart(2, "0"), y = String(b.getMonth() + 1).padStart(2, "0");
      return `${v}-${y}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = $(() => {
      const h = n.data?.costs_by_day || {};
      return Object.values(h).reduce((b, v) => b + (v.input_cost || 0), 0);
    }), c = $(() => {
      const h = n.data?.costs_by_day || {};
      return Object.values(h).reduce((b, v) => b + (v.output_cost || 0), 0);
    }), u = $(() => {
      const h = n.data?.costs_by_day || {};
      return Object.values(h).reduce((b, v) => b + (v.cache_read_cost || 0), 0);
    }), f = $(() => {
      const h = n.data?.costs_by_day || {};
      return Object.values(h).reduce((b, v) => b + (v.cache_write_cost || 0), 0);
    }), m = $(() => {
      const h = n.data?.costs_by_day || {}, b = Object.keys(h).sort();
      if (b.length === 0)
        return { labels: [], datasets: [] };
      const v = b.map((w) => i(w)), y = [
        {
          label: "Input Cost",
          data: b.map((w) => h[w]?.input_cost || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: b.map((w) => h[w]?.output_cost || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: b.map((w) => h[w]?.cache_read_cost || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: b.map((w) => h[w]?.cache_write_cost || 0),
          backgroundColor: `${r.cache_write}80`,
          borderColor: r.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: v,
        datasets: y
      };
    }), p = $(() => n.options ? n.options : {
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
            boxWidth: gi,
            boxHeight: gi,
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
            label: function(h) {
              let b = h.dataset.label || "";
              return b && (b += ": "), h.parsed.y !== null && (b += Ie(h.parsed.y)), b;
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
            callback: function(h) {
              return Ie(h);
            }
          }
        }
      }
    });
    return t({ isDark: o }), (h, b) => (g(), ae(Se, {
      class: "h-full min-h-0",
      title: "Cost Usage",
      subtitle: "Cost breakdown over time (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: O(() => [
        d("div", Hk, [
          d("div", Wk, [
            m.value.labels && m.value.labels.length ? (g(), x("section", Kk, [
              d("div", Uk, [
                N(Mt, {
                  data: m.value,
                  options: p.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              d("footer", Yk, [
                N(xe, {
                  title: "Total Cost",
                  value: T(Ie)(e.data.total_cost)
                }, null, 8, ["value"]),
                N(xe, {
                  title: "Input Cost",
                  value: T(Ie)(l.value),
                  color: r.input
                }, null, 8, ["value", "color"]),
                N(xe, {
                  title: "Output Cost",
                  value: T(Ie)(c.value),
                  color: r.output
                }, null, 8, ["value", "color"]),
                N(xe, {
                  title: "Cache Read",
                  value: T(Ie)(u.value),
                  color: r.cache_read
                }, null, 8, ["value", "color"]),
                N(xe, {
                  title: "Cache Write",
                  value: T(Ie)(f.value),
                  color: r.cache_write
                }, null, 8, ["value", "color"]),
                N(xe, {
                  title: "Avg / Conv.",
                  value: T(Ie)(e.data.avg_cost_per_conversation)
                }, null, 8, ["value"])
              ])
            ])) : (g(), x("section", qk, [
              d("div", Xk, [
                d("div", Gk, [
                  N(T(lt), { class: "empty-icon" })
                ]),
                b[0] || (b[0] = d("p", { class: "empty-title" }, "No cost usage data", -1)),
                b[1] || (b[1] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see cost breakdown trends.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Qk = /* @__PURE__ */ be(Zk, [["__scopeId", "data-v-e1c4a95b"]]), Jk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, e_ = { class: "card-body" }, t_ = {
  key: 0,
  class: "chart-section"
}, a_ = { class: "chart-container" }, n_ = { class: "mt-auto flex w-full min-w-0 flex-nowrap items-stretch gap-2 sm:gap-3" }, o_ = {
  key: 1,
  class: "empty-state"
}, s_ = { class: "empty-state-content" }, i_ = { class: "empty-icon-wrapper" }, Ia = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", mi = 10, r_ = /* @__PURE__ */ he({
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
      const f = new Date(u), m = String(f.getDate()).padStart(2, "0"), p = String(f.getMonth() + 1).padStart(2, "0");
      return `${m}-${p}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = $(() => {
      const u = n.data?.tokens_by_day || {}, f = Object.keys(u).sort();
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const m = f.map((h) => i(h)), p = [
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
        labels: m,
        datasets: p
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
              family: Ia,
              size: 13,
              weight: "500"
            },
            color: s.value.textSecondary,
            padding: 12,
            boxWidth: mi,
            boxHeight: mi,
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
            family: Ia,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: Ia,
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
            font: { family: Ia, size: 12, weight: "500" },
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
            font: { family: Ia, size: 12, weight: "500" },
            color: s.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: o }), (u, f) => (g(), ae(Se, {
      class: "h-full min-h-0",
      title: "Token Usage",
      subtitle: "Token consumption over time (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: O(() => [
        d("div", Jk, [
          d("div", e_, [
            l.value.labels && l.value.labels.length ? (g(), x("section", t_, [
              d("div", a_, [
                N(Mt, {
                  data: l.value,
                  options: c.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              d("footer", n_, [
                N(xe, {
                  class: "min-w-0 flex-1",
                  title: "Total Tokens",
                  value: T(me)(e.data.total_tokens)
                }, null, 8, ["value"]),
                N(xe, {
                  class: "min-w-0 flex-1",
                  title: "Input",
                  value: T(me)(e.data.total_input_tokens),
                  color: r.input
                }, null, 8, ["value", "color"]),
                N(xe, {
                  class: "min-w-0 flex-1",
                  title: "Output",
                  value: T(me)(e.data.total_output_tokens),
                  color: r.output
                }, null, 8, ["value", "color"]),
                N(xe, {
                  class: "min-w-0 flex-1",
                  title: "Cache Read",
                  value: T(me)(e.data.total_cache_read_tokens),
                  color: r.cache_read
                }, null, 8, ["value", "color"]),
                N(xe, {
                  class: "min-w-0 flex-1",
                  title: "Cache Write",
                  value: T(me)(e.data.total_cache_write_tokens),
                  color: r.cache_write
                }, null, 8, ["value", "color"])
              ])
            ])) : (g(), x("section", o_, [
              d("div", s_, [
                d("div", i_, [
                  N(T(lt), { class: "empty-icon" })
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
}), l_ = /* @__PURE__ */ be(r_, [["__scopeId", "data-v-554d3cda"]]), c_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, d_ = { class: "card-body" }, u_ = {
  key: 0,
  class: "chart-section"
}, h_ = { class: "chart-container" }, f_ = { class: "mt-4 w-full min-w-0" }, g_ = {
  key: 1,
  class: "empty-state"
}, m_ = { class: "empty-state-content" }, p_ = { class: "empty-icon-wrapper" }, b_ = /* @__PURE__ */ he({
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
      () => me(a.data?.total_conversations ?? 0)
    ), r = $(() => {
      const c = a.data?.conversations_by_day || {}, u = Object.keys(c).sort();
      if (u.length === 0)
        return { labels: [], datasets: [] };
      const f = u.map((p) => s(p)), m = [
        {
          label: "Conversations",
          data: u.map((p) => c[p] || 0),
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
        datasets: m
      };
    }), l = $(() => a.options ? a.options : {
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
    return t({ isDark: n }), (c, u) => (g(), ae(Se, {
      class: "h-full min-h-0",
      title: "Conversation Count",
      subtitle: "Conversations over time",
      collapsible: !1,
      loading: e.loading
    }, {
      default: O(() => [
        d("div", c_, [
          d("div", d_, [
            r.value.labels && r.value.labels.length ? (g(), x("section", u_, [
              d("div", h_, [
                N(bt, {
                  data: r.value,
                  options: l.value
                }, null, 8, ["data", "options"])
              ]),
              d("div", f_, [
                N(xe, {
                  class: "min-w-0 w-full",
                  title: "Total",
                  value: i.value
                }, null, 8, ["value"])
              ])
            ])) : (g(), x("section", g_, [
              d("div", m_, [
                d("div", p_, [
                  N(T(lt), { class: "empty-icon" })
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
}), v_ = /* @__PURE__ */ be(b_, [["__scopeId", "data-v-311f443a"]]), y_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, x_ = { class: "card-body" }, k_ = {
  key: 0,
  class: "charts-grid"
}, __ = { class: "chart-section" }, w_ = { class: "chart-container" }, C_ = { class: "chart-section" }, $_ = { class: "chart-container" }, S_ = {
  key: 1,
  class: "empty-state"
}, M_ = { class: "empty-state-content" }, D_ = { class: "empty-icon-wrapper" }, A_ = /* @__PURE__ */ he({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), s = $(() => a.data?.top_agents && a.data.top_agents.length > 0), i = $(() => a.data?.top_agents ? [...a.data.top_agents].sort((m, p) => (p.total_cost || 0) - (m.total_cost || 0)) : []), r = $(() => a.data?.top_agents ? [...a.data.top_agents].sort((m, p) => (p.total_tokens || 0) - (m.total_tokens || 0)) : []), l = $(() => {
      const m = i.value;
      return m.length === 0 ? { labels: [], datasets: [] } : {
        labels: m.map((p) => St(p.agent_type)),
        datasets: [
          {
            label: "Total Cost",
            data: m.map((p) => p.total_cost || 0),
            backgroundColor: "#a78bfa80",
            borderColor: "#a78bfa",
            borderWidth: 1
          }
        ]
      };
    }), c = $(() => {
      const m = r.value;
      return m.length === 0 ? { labels: [], datasets: [] } : {
        labels: m.map((p) => St(p.agent_type)),
        datasets: [
          {
            label: "Total Tokens",
            data: m.map((p) => p.total_tokens || 0),
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
            title: function(m) {
              return m[0]?.label || "";
            },
            label: function(m) {
              const p = m.label, h = a.data?.top_agents?.find(
                (b) => St(b.agent_type) === p
              );
              return h ? [
                `Total Cost: ${Ie(h.total_cost)}`,
                `Input Cost: ${Ie(h.total_input_tokens_cost)}`,
                `Output Cost: ${Ie(h.total_output_tokens_cost)}`,
                `Cache Read: ${Ie(h.total_read_tokens_cost)}`,
                `Cache Write: ${Ie(h.total_write_tokens_cost)}`
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
            callback: function(m) {
              return Ie(m);
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
            title: function(m) {
              return m[0]?.label || "";
            },
            label: function(m) {
              const p = m.label, h = a.data?.top_agents?.find(
                (b) => St(b.agent_type) === p
              );
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
            callback: function(m) {
              return m.toLocaleString();
            }
          }
        }
      }
    });
    return t({ isDark: n }), (m, p) => (g(), ae(Se, {
      class: "h-full min-h-0",
      title: "Top Agents Analysis",
      subtitle: "Cost and token usage by agent",
      collapsible: !1,
      loading: e.loading
    }, {
      default: O(() => [
        d("div", y_, [
          d("div", x_, [
            s.value ? (g(), x("div", k_, [
              d("section", __, [
                p[0] || (p[0] = d("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
                d("div", w_, [
                  N(Mt, {
                    data: l.value,
                    options: u.value
                  }, null, 8, ["data", "options"])
                ])
              ]),
              d("section", C_, [
                p[1] || (p[1] = d("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
                d("div", $_, [
                  N(Mt, {
                    data: c.value,
                    options: f.value
                  }, null, 8, ["data", "options"])
                ])
              ])
            ])) : (g(), x("section", S_, [
              d("div", M_, [
                d("div", D_, [
                  N(T(lt), { class: "empty-icon" })
                ]),
                p[2] || (p[2] = d("p", { class: "empty-title" }, "No top agents data", -1)),
                p[3] || (p[3] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent analysis.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), T_ = /* @__PURE__ */ be(A_, [["__scopeId", "data-v-ae26eabc"]]), B_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, L_ = { class: "card-body" }, R_ = {
  key: 0,
  class: "chart-section"
}, P_ = { class: "chart-container" }, I_ = {
  key: 1,
  class: "empty-state"
}, E_ = { class: "empty-state-content" }, F_ = { class: "empty-icon-wrapper" }, O_ = /* @__PURE__ */ he({
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
    ) : []), r = $(() => i.value.length > 0), l = $(() => i.value.reduce((f, m) => f + (m.conversations || 0), 0)), c = $(() => {
      const f = i.value;
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const m = f.map((b) => {
        const v = b.agent_type?.toLowerCase();
        return (s[v] || "#a78bfa") + "80";
      }), p = f.map((b) => {
        const v = b.agent_type?.toLowerCase();
        return s[v] || "#a78bfa";
      });
      return {
        labels: f.map((b) => {
          const v = b.conversations || 0, y = l.value ? v / l.value * 100 : 0;
          return `${St(b.agent_type)} - ${v.toLocaleString()} (${y.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: f.map((b) => b.conversations || 0),
            backgroundColor: m,
            borderColor: p,
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
              const m = (f.label || "").toString(), p = Number(f.parsed) || 0, h = (f.dataset.data || []).reduce((v, y) => v + (Number(y) || 0), 0), b = h ? p / h * 100 : 0;
              return `${m}: ${p.toLocaleString()} (${b.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: n }), (f, m) => (g(), ae(Se, {
      class: "h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: O(() => [
        d("div", B_, [
          d("div", L_, [
            r.value ? (g(), x("section", R_, [
              d("div", P_, [
                N(Fn, {
                  data: c.value,
                  options: u.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (g(), x("section", I_, [
              d("div", E_, [
                d("div", F_, [
                  N(T(lt), { class: "empty-icon" })
                ]),
                m[0] || (m[0] = d("p", { class: "empty-title" }, "No top agents data", -1)),
                m[1] || (m[1] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), V_ = /* @__PURE__ */ be(O_, [["__scopeId", "data-v-a909b73c"]]), z_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, N_ = { class: "card-body" }, j_ = {
  key: 0,
  class: "chart-section"
}, H_ = { class: "chart-container" }, W_ = {
  key: 1,
  class: "empty-state"
}, K_ = { class: "empty-state-content" }, U_ = { class: "empty-icon-wrapper" }, Y_ = /* @__PURE__ */ he({
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
    }), r = $(() => {
      const c = a.costData?.daily_mean_cost_per_conversation || [];
      if (c.length > 0) {
        const v = [...c].sort((y, w) => y.date.localeCompare(w.date));
        return {
          labels: v.map((y) => s(y.date)),
          datasets: [
            {
              label: "Mean USD/conv",
              data: v.map((y) => Number(y.value) || 0),
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
      const u = a.costData?.costs_by_day || {}, f = a.conversationData?.conversations_by_day || {}, p = Object.keys(u).filter((v) => f[v]).sort();
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const h = p.map((v) => s(v)), b = p.map((v) => {
        const y = u[v]?.total_cost || 0, w = f[v] || 0;
        return w > 0 ? y / w : 0;
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
    }), l = $(() => a.options ? a.options : {
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
              return u && (u += ": "), c.parsed.y !== null && (u += Ie(c.parsed.y)), u;
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
              return Ie(c);
            }
          }
        }
      }
    });
    return t({ isDark: n }), (c, u) => (g(), ae(Se, {
      class: "h-full min-h-0",
      title: "Daily Cost Trends",
      subtitle: "Mean USD/conversation per day",
      collapsible: !1,
      loading: e.loading
    }, {
      default: O(() => [
        d("div", z_, [
          d("div", N_, [
            i.value ? (g(), x("section", j_, [
              d("div", H_, [
                N(bt, {
                  data: r.value,
                  options: l.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (g(), x("section", W_, [
              d("div", K_, [
                d("div", U_, [
                  N(T(lt), { class: "empty-icon" })
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
}), q_ = /* @__PURE__ */ be(Y_, [["__scopeId", "data-v-ae6c48b1"]]), X_ = { class: "tabs text-sm" }, G_ = ["aria-label"], Z_ = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], Q_ = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, J_ = /* @__PURE__ */ he({
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
    const a = e, n = t, o = ne([]), s = `tabs-${We()}`, i = (h) => `${s}-tab-${h}`, r = $(
      () => a.items.map((h, b) => h.disabled ? -1 : b).filter((h) => h >= 0)
    );
    function l(h) {
      return h.value === a.modelValue;
    }
    function c(h) {
      const b = l(h), y = `${a.fullWidth ? "relative flex min-w-0 flex-1" : "relative inline-flex max-w-full shrink-0"} h-8 max-h-8 min-h-8 items-stretch cursor-pointer rounded-lg border border-transparent text-center outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100`;
      return h.disabled ? `${y} cursor-not-allowed opacity-40` : b ? `${y} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]` : `${y} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function u(h, b) {
      h === b || a.items.find((y) => y.value === h)?.disabled || (n("update:modelValue", h), n("change", { value: h, previousValue: b }));
    }
    function f(h, b) {
      n("tab-click", { value: h.value, originalEvent: b }), !h.disabled && (u(h.value, a.modelValue), Ke(() => {
        o.value[a.items.indexOf(h)]?.focus();
      }));
    }
    function m(h, b) {
      const v = a.items.length;
      if (v === 0) return 0;
      let y = h;
      for (let w = 0; w < v; w++)
        if (y = (y + b + v) % v, !a.items[y]?.disabled) return y;
      return h;
    }
    async function p(h, b) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(h.key)) return;
      h.preventDefault();
      let y = b;
      h.key === "ArrowLeft" ? y = m(b, -1) : h.key === "ArrowRight" ? y = m(b, 1) : h.key === "Home" ? y = r.value[0] ?? 0 : h.key === "End" && (y = r.value[r.value.length - 1] ?? b);
      const w = a.items[y];
      !w || w.disabled || (u(w.value, a.modelValue), await Ke(), o.value[y]?.focus());
    }
    return (h, b) => (g(), x("div", X_, [
      d("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: Z([
          "box-border h-10 max-h-10 min-h-10 flex-wrap items-center gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 px-0.5 py-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          e.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (g(!0), x(ue, null, pe(e.items, (v, y) => (g(), x("button", {
          id: i(v.value),
          key: v.value,
          ref_for: !0,
          ref_key: "tabRefs",
          ref: o,
          type: "button",
          role: "tab",
          "aria-selected": l(v),
          "aria-disabled": v.disabled === !0,
          tabindex: l(v) ? 0 : -1,
          class: Z(c(v)),
          onClick: (w) => f(v, w),
          onKeydown: (w) => p(w, y)
        }, [
          d("span", {
            class: Z(["tabs-tab__label flex min-h-0 min-w-0 items-center justify-center gap-2 px-3", { "min-w-0 flex-1": e.fullWidth }])
          }, [
            v.icon ? (g(), ae(ft(v.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : F("", !0),
            d("span", Q_, A(v.label), 1)
          ], 2)
        ], 42, Z_))), 128))
      ], 10, G_),
      h.$slots.default ? (g(), ae(pt, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: O(() => [
          (g(), x("div", {
            key: e.modelValue,
            class: "tabs-panel mt-4"
          }, [
            ke(h.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : F("", !0)
    ]));
  }
}), Lr = /* @__PURE__ */ be(J_, [["__scopeId", "data-v-f9c367eb"]]), e2 = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, t2 = { class: "card-body" }, a2 = {
  key: 0,
  class: "model-usage-table-block"
}, n2 = { class: "w-full min-w-0" }, o2 = {
  key: 1,
  class: "empty-state"
}, s2 = { class: "empty-state-content" }, i2 = { class: "empty-icon-wrapper" }, r2 = /* @__PURE__ */ he({
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
    const n = e, o = a, s = (h) => {
      o("export", h);
    }, { isDark: i } = Me($e(n, "theme")), r = [
      { value: "by_model", label: "Model" },
      { value: "by_provider", label: "Provider" }
    ], l = ne("by_model"), c = $(() => l.value === "by_model" ? n.data?.total_by_model || {} : n.data?.total_by_provider || {}), u = $(() => [
      { key: "name", label: l.value === "by_model" ? "Model" : "Provider", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ]), f = $(
      () => Object.entries(c.value).map(([h, b]) => ({
        id: h,
        name: h,
        avgCost: p(b.avg_cost_per_message),
        avgTokens: m(b.avg_tokens_per_message),
        messageCount: m(b.message_count),
        totalCost: p(b.total_cost),
        totalTokens: m(b.total_tokens)
      }))
    ), m = (h) => h == null ? "0" : me(h), p = (h) => h == null ? "$0.00" : Ie(h);
    return t({ isDark: i }), (h, b) => (g(), ae(Se, {
      class: "h-full min-h-0",
      title: "Model Usage",
      subtitle: "AI model performance and costs",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !e.loading ? (g(), ae(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", e2, [
          d("div", t2, [
            N(Lr, {
              modelValue: l.value,
              "onUpdate:modelValue": b[0] || (b[0] = (v) => l.value = v),
              items: r,
              "aria-label": "Model Usage Tabs",
              "full-width": ""
            }, {
              default: O(() => [
                c.value && Object.keys(c.value).length > 0 ? (g(), x("div", a2, [
                  d("div", n2, [
                    N(gt, {
                      columns: u.value,
                      rows: f.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, null, 8, ["columns", "rows"])
                  ])
                ])) : (g(), x("div", o2, [
                  d("div", s2, [
                    d("div", i2, [
                      N(T(lt), { class: "empty-icon" })
                    ]),
                    b[1] || (b[1] = d("p", { class: "empty-title" }, "No model usage data available", -1)),
                    b[2] || (b[2] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see model performance metrics.", -1))
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
}), l2 = /* @__PURE__ */ be(r2, [["__scopeId", "data-v-48a6cc07"]]), c2 = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, d2 = { class: "card-body" }, u2 = {
  key: 0,
  class: "message-roles-table-block"
}, h2 = { class: "w-full min-w-0" }, f2 = {
  key: 1,
  class: "empty-state"
}, g2 = { class: "empty-state-content" }, m2 = { class: "empty-icon-wrapper" }, p2 = /* @__PURE__ */ he({
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
    ], c = $(() => n.data?.total_by_role || {}), u = $(
      () => r.map((b) => ({
        id: b,
        role: h(b),
        avgCost: p(c.value[b]?.avg_cost_per_message),
        avgTokens: m(c.value[b]?.avg_tokens_per_message),
        messageCount: m(c.value[b]?.message_count),
        totalCost: p(c.value[b]?.total_cost),
        totalTokens: m(c.value[b]?.total_tokens)
      }))
    ), f = $(() => Object.keys(c.value).length > 0), m = (b) => b == null ? "0" : me(b), p = (b) => b == null ? "$0.00" : Ie(b), h = (b) => b.charAt(0).toUpperCase() + b.slice(1);
    return t({ isDark: i }), (b, v) => (g(), ae(Se, {
      class: "h-full min-h-0",
      title: "Message Roles",
      subtitle: "Performance by message role",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !e.loading ? (g(), ae(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", c2, [
          d("div", d2, [
            f.value ? (g(), x("div", u2, [
              d("div", h2, [
                N(gt, {
                  columns: l,
                  rows: u.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, null, 8, ["rows"])
              ])
            ])) : (g(), x("div", f2, [
              d("div", g2, [
                d("div", m2, [
                  N(T(lt), { class: "empty-icon" })
                ]),
                v[0] || (v[0] = d("p", { class: "empty-title" }, "No message role data available", -1)),
                v[1] || (v[1] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), b2 = /* @__PURE__ */ be(p2, [["__scopeId", "data-v-d38e854e"]]), v2 = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, y2 = { class: "card-body" }, x2 = {
  key: 0,
  class: "chart-section"
}, k2 = { class: "chart-container" }, _2 = { class: "kpi-grid" }, w2 = {
  key: 1,
  class: "empty-state"
}, C2 = { class: "empty-state-content" }, $2 = { class: "empty-icon-wrapper" }, S2 = 40, M2 = 230, D2 = /* @__PURE__ */ he({
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
    }, c = (_) => _.agent_type || _.agent_id || _.agent_name || "", u = (_) => _.agent_name ? St(_.agent_name) : St(c(_)).split("_").map((C) => C.charAt(0).toUpperCase() + C.slice(1)).join(" ").replace(/V\d+$/, "").trim(), f = (_) => {
      const k = c(_).toLowerCase();
      for (const [C, S] of Object.entries(l))
        if (k.includes(C))
          return S;
      return "#9ca3af";
    }, m = $(() => [...n.data?.top_agents || []].sort((k, C) => C.avg_cost_per_conversation - k.avg_cost_per_conversation)), p = $(
      () => Math.max(M2, m.value.length * S2 + 32)
    ), h = $(() => n.data?.total_conversations !== void 0 ? Number(n.data.total_conversations) || 0 : m.value.reduce((_, k) => _ + k.conversations, 0)), b = $(() => n.data?.total_cost !== void 0 ? Number(n.data.total_cost) || 0 : m.value.reduce((_, k) => _ + k.total_cost, 0)), v = $(() => n.data?.overall_avg_cost_per_conversation !== void 0 ? Number(n.data.overall_avg_cost_per_conversation) || 0 : h.value === 0 ? 0 : b.value / h.value), y = $(() => {
      const _ = m.value;
      if (_.length === 0)
        return { labels: [], datasets: [] };
      const k = _.map((M) => u(M)), C = _.map((M) => M.avg_cost_per_conversation), S = _.map((M) => f(M));
      return {
        labels: k,
        datasets: [
          {
            label: "USD per conversation",
            data: C,
            backgroundColor: S.map((M) => `${M}80`),
            borderColor: S,
            borderWidth: 1
          }
        ]
      };
    }), w = $(() => n.options ? n.options : {
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
              const k = m.value[_[0]?.dataIndex];
              return k ? u(k) : "";
            },
            label: function(_) {
              const k = m.value[_.dataIndex];
              return [
                `Cost: ${Ie(_.parsed.x)}`,
                `Conversations: ${me(k.conversations)}`,
                `Total Cost: ${Ie(k.total_cost)}`
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
              return Ie(_);
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
    return t({ isDark: i }), (_, k) => (g(), ae(Se, {
      class: "h-full min-h-0",
      title: "Cost Per Conversation",
      subtitle: "USD per conversation by agent",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: O(() => [
        e.enableExport && !e.loading ? (g(), ae(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: O(() => [
        d("div", v2, [
          d("div", y2, [
            y.value.labels && y.value.labels.length ? (g(), x("section", x2, [
              d("div", k2, [
                N(Mt, {
                  data: y.value,
                  options: w.value,
                  "height-px": p.value,
                  "category-label-max-length": 18
                }, null, 8, ["data", "options", "height-px"])
              ]),
              d("footer", _2, [
                N(T(xe), {
                  title: "Total Agents",
                  value: String(m.value.length)
                }, null, 8, ["value"]),
                N(T(xe), {
                  title: "Total Conversations",
                  value: T(me)(h.value)
                }, null, 8, ["value"]),
                N(T(xe), {
                  title: "Total Cost",
                  value: T(Ie)(b.value)
                }, null, 8, ["value"]),
                N(T(xe), {
                  title: "Avg Cost / Conv.",
                  value: T(Ie)(v.value)
                }, null, 8, ["value"])
              ])
            ])) : (g(), x("section", w2, [
              d("div", C2, [
                d("div", $2, [
                  N(T(lt), { class: "empty-icon" })
                ]),
                k[0] || (k[0] = d("p", { class: "empty-title" }, "No cost per conversation data", -1)),
                k[1] || (k[1] = d("p", { class: "empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), A2 = /* @__PURE__ */ be(D2, [["__scopeId", "data-v-2a8f51ca"]]);
function Oo(e, t) {
  const a = e[t];
  return Array.isArray(a) ? a.filter(
    (n) => n !== null && typeof n == "object" && !Array.isArray(n)
  ) : [];
}
function Rr(e, t) {
  const { childrenKey: a, sortKey: n, sortDirection: o, compare: s } = t;
  return [...e].sort((i, r) => s(i, r, n, o)).map((i) => {
    const r = Oo(i, a);
    return r.length === 0 ? i : {
      ...i,
      [a]: Rr(r, t)
    };
  });
}
function Pr(e, t, a = 0, n = null, o = 0) {
  const { childrenKey: s, expandedKeys: i, resolveRowKey: r, maxDepth: l } = t, c = [];
  return e.forEach((u, f) => {
    const m = r(u, o + f), p = Oo(u, s), h = p.length > 0, b = i.has(m);
    c.push({
      row: u,
      key: m,
      depth: a,
      hasChildren: h,
      isExpanded: b,
      parentKey: n
    }), h && b && (l === void 0 || a < l) && c.push(
      ...Pr(p, t, a + 1, m, 0)
    );
  }), c;
}
function Ir(e, t, a = 0, n = 0) {
  const { childrenKey: o, resolveRowKey: s, isRowSelectable: i } = t, r = [];
  return e.forEach((l, c) => {
    const u = s(l, n + c), f = Oo(l, o), m = f.length > 0, p = {
      depth: a,
      isChild: a > 0,
      hasChildren: m
    };
    (i?.(l, p) ?? !0) && r.push(u), f.length > 0 && r.push(
      ...Ir(f, t, a + 1, 0)
    );
  }), r;
}
const T2 = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, B2 = { class: "w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden" }, L2 = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, R2 = {
  key: 0,
  scope: "col",
  class: "w-14 bg-transparent px-4 py-3 text-center align-middle"
}, P2 = ["checked", "aria-label"], I2 = ["aria-sort", "onClick"], E2 = {
  class: "kiut-table-sort-icons inline-flex items-center",
  "aria-hidden": "true"
}, F2 = {
  key: 0,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, O2 = {
  key: 1,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, V2 = {
  key: 0,
  class: "kiut-table-body-cell w-12 bg-transparent pl-4 pr-0 py-0 text-center align-middle"
}, z2 = ["checked", "aria-label", "onChange"], N2 = ["aria-expanded", "aria-label", "onClick"], j2 = ["aria-expanded", "aria-label", "onClick"], H2 = {
  key: 1,
  class: "inline-block w-4 shrink-0",
  "aria-hidden": "true"
}, W2 = { class: "min-w-0 flex-1" }, K2 = /* @__PURE__ */ he({
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
      set(L) {
        s.value = L, n("update:expandedKeys", L);
      }
    }), r = $(
      () => new Set(i.value)
    ), l = $(
      () => a.expandColumnKey ?? a.columns[0]?.key ?? ""
    ), c = $(() => ({
      childrenKey: a.childrenKey,
      expandedKeys: r.value,
      resolveRowKey: h,
      maxDepth: a.maxDepth
    })), u = $(() => {
      const { sortKey: L, sortDirection: U, sortCompare: Y, rows: z } = a;
      return !L || !U || !Y ? z : a.expandable ? Rr(z, {
        childrenKey: a.childrenKey,
        sortKey: L,
        sortDirection: U,
        compare: Y
      }) : [...z].sort((re, ce) => Y(re, ce, L, U));
    }), f = $(() => a.expandable ? Pr(u.value, c.value) : u.value.map((L, U) => ({
      row: L,
      key: h(L, U),
      depth: 0,
      hasChildren: !1,
      isExpanded: !1,
      parentKey: null
    })));
    function m(L) {
      return `cell-${L}`;
    }
    function p(L) {
      return L === "center" ? "text-center" : L === "right" ? "text-right" : "text-left";
    }
    function h(L, U) {
      if (typeof a.rowKey == "function")
        return a.rowKey(L);
      const Y = L[a.rowKey];
      return Y != null ? String(Y) : `__index_${U}`;
    }
    function b(L, U) {
      return L[U];
    }
    function v(L) {
      return L == null || typeof L == "object" ? "" : String(L);
    }
    function y(L) {
      return a.expandable && L === l.value;
    }
    function w(L) {
      return L.hasChildren || (a.isRowExpandable?.(L.row) ?? !1);
    }
    function _(L, U) {
      return {
        row: L.row,
        column: U,
        value: b(L.row, U.key),
        depth: L.depth,
        isChild: L.depth > 0,
        hasChildren: L.hasChildren,
        expanded: L.isExpanded
      };
    }
    function k(L) {
      if (!w(L)) return;
      const U = new Set(i.value);
      U.has(L.key) ? (U.delete(L.key), n("collapse", L.key, L.row)) : (a.singleExpand && U.clear(), U.add(L.key), n("expand", L.key, L.row)), i.value = [...U];
    }
    function C(L) {
      return {
        depth: L.depth,
        isChild: L.depth > 0,
        hasChildren: L.hasChildren
      };
    }
    function S(L, U) {
      return a.isRowSelectable?.(L, U) ?? !0;
    }
    function M(L) {
      return S(L.row, C(L));
    }
    function R(L) {
      return a.selectable && w(L) && !M(L);
    }
    function V(L) {
      return w(L) && !R(L);
    }
    function W(L) {
      return V(L) ? !1 : L.depth > 0 ? !0 : a.selectable && !w(L);
    }
    const D = $(() => {
      const { isRowSelectable: L } = a;
      return a.expandable ? Ir(u.value, {
        childrenKey: a.childrenKey,
        resolveRowKey: h,
        isRowSelectable: L
      }) : u.value.map((U, Y) => ({
        row: U,
        key: h(U, Y),
        context: {
          depth: 0,
          isChild: !1,
          hasChildren: !1
        }
      })).filter(({ row: U, context: Y }) => S(U, Y)).map(({ key: U }) => U);
    });
    function I(L) {
      const U = String(L);
      return a.selectedKeys.some((Y) => String(Y) === U);
    }
    const B = $(() => !a.selectable || D.value.length === 0 ? !1 : D.value.every(
      (L) => a.selectedKeys.some((U) => String(U) === String(L))
    )), j = $(() => {
      if (!a.selectable || D.value.length === 0) return !1;
      const L = D.value.filter(
        (U) => a.selectedKeys.some((Y) => String(Y) === String(U))
      );
      return L.length > 0 && L.length < D.value.length;
    });
    Te(
      [j, B, () => a.selectable],
      async () => {
        await Ke();
        const L = o.value;
        L && (L.indeterminate = j.value && !B.value);
      },
      { immediate: !0 }
    );
    function H() {
      if (a.selectable)
        if (B.value) {
          const L = new Set(
            D.value.map((Y) => String(Y))
          ), U = a.selectedKeys.filter(
            (Y) => !L.has(String(Y))
          );
          n("update:selectedKeys", U);
        } else {
          const L = new Set(a.selectedKeys.map((U) => String(U)));
          D.value.forEach((U) => L.add(String(U))), n("update:selectedKeys", [...L]);
        }
    }
    function Q(L) {
      if (!a.selectable) return;
      const U = String(L), Y = f.value.find((re) => String(re.key) === U);
      if (Y && !M(Y) || !Y && !D.value.some((re) => String(re) === U))
        return;
      a.selectedKeys.some((re) => String(re) === U) ? n(
        "update:selectedKeys",
        a.selectedKeys.filter((re) => String(re) !== U)
      ) : n("update:selectedKeys", [...a.selectedKeys, U]);
    }
    function le(L) {
      return `${a.ariaLabelSelectRow} ${L}`;
    }
    function fe(L) {
      n("sort", L);
    }
    function G(L) {
      return a.sortKey === L && a.sortDirection != null;
    }
    function oe(L) {
      return G(L) ? a.sortDirection === "asc" ? "ascending" : "descending" : "none";
    }
    return (L, U) => (g(), x("div", T2, [
      d("div", B2, [
        d("table", {
          class: Z([
            "kiut-table w-full min-w-[640px] overflow-hidden border-collapse text-left text-sm",
            e.fixedLayout ? "table-fixed" : ""
          ])
        }, [
          d("thead", null, [
            d("tr", L2, [
              e.selectable ? (g(), x("th", R2, [
                d("input", {
                  ref_key: "selectAllRef",
                  ref: o,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: B.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: H
                }, null, 40, P2)
              ])) : F("", !0),
              (g(!0), x(ue, null, pe(e.columns, (Y) => (g(), x("th", {
                key: Y.key,
                scope: "col",
                class: Z([
                  "px-2 py-3 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]",
                  y(Y.key) && e.selectable ? "!pl-0" : "",
                  p(Y.align),
                  Y.headerClass ?? ""
                ])
              }, [
                Y.sortable ? (g(), x("button", {
                  key: 0,
                  type: "button",
                  class: Z(["kiut-table-sort-btn inline-flex items-center gap-1", p(Y.align)]),
                  "aria-sort": oe(Y.key),
                  onClick: (z) => fe(Y.key)
                }, [
                  d("span", null, A(Y.label), 1),
                  d("span", E2, [
                    G(Y.key) ? (g(), x(ue, { key: 0 }, [
                      e.sortDirection === "asc" ? (g(), x("span", F2, "↑")) : e.sortDirection === "desc" ? (g(), x("span", O2, "↓")) : F("", !0)
                    ], 64)) : (g(), x(ue, { key: 1 }, [
                      U[0] || (U[0] = d("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      U[1] || (U[1] = d("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, I2)) : (g(), x(ue, { key: 1 }, [
                  Ae(A(Y.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          d("tbody", null, [
            (g(!0), x(ue, null, pe(f.value, (Y) => (g(), x("tr", {
              key: Y.key,
              class: Z([
                "kiut-table-body-row border-b border-[#e5e7eb] last:border-b-0 bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]",
                Y.depth > 0 ? "kiut-table-row--child dark:bg-[#1a1a22]" : ""
              ])
            }, [
              e.selectable ? (g(), x("td", V2, [
                M(Y) ? (g(), x("input", {
                  key: 0,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: I(Y.key),
                  "aria-label": le(Y.key),
                  onChange: (z) => Q(Y.key)
                }, null, 40, z2)) : R(Y) ? (g(), x("button", {
                  key: 1,
                  type: "button",
                  class: "kiut-table-expand-btn shrink-0",
                  "aria-expanded": Y.isExpanded,
                  "aria-label": Y.isExpanded ? e.ariaLabelCollapseRow : e.ariaLabelExpandRow,
                  onClick: Be((z) => k(Y), ["stop"])
                }, [
                  N(T(ta), {
                    class: Z(["h-5 w-5 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !Y.isExpanded }]),
                    "aria-hidden": "true"
                  }, null, 8, ["class"])
                ], 8, N2)) : F("", !0)
              ])) : F("", !0),
              (g(!0), x(ue, null, pe(e.columns, (z) => (g(), x("td", {
                key: z.key,
                class: Z([
                  "kiut-table-body-cell bg-transparent py-0 align-middle text-[color:var(--kiut-text-secondary)]",
                  y(z.key) ? "pl-0 pr-2" : "px-2",
                  p(z.align),
                  z.cellClass ?? ""
                ])
              }, [
                y(z.key) ? (g(), x("div", {
                  key: 0,
                  class: "flex min-w-0 items-start gap-1",
                  style: Ce({ paddingLeft: `${Y.depth * 1.25}rem` })
                }, [
                  ke(L.$slots, "row-expand", {
                    row: Y.row,
                    expanded: Y.isExpanded,
                    hasChildren: Y.hasChildren,
                    depth: Y.depth,
                    toggle: () => k(Y)
                  }, () => [
                    V(Y) ? (g(), x("button", {
                      key: 0,
                      type: "button",
                      class: "kiut-table-expand-btn shrink-0",
                      "aria-expanded": Y.isExpanded,
                      "aria-label": Y.isExpanded ? e.ariaLabelCollapseRow : e.ariaLabelExpandRow,
                      onClick: Be((re) => k(Y), ["stop"])
                    }, [
                      N(T(ta), {
                        class: Z(["h-5 w-5 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !Y.isExpanded }]),
                        "aria-hidden": "true"
                      }, null, 8, ["class"])
                    ], 8, j2)) : W(Y) ? (g(), x("span", H2)) : F("", !0)
                  ], !0),
                  d("div", W2, [
                    ke(L.$slots, m(z.key), yt({ ref_for: !0 }, _(Y, z)), () => [
                      Ae(A(v(b(Y.row, z.key))), 1)
                    ], !0)
                  ])
                ], 4)) : ke(L.$slots, m(z.key), yt({
                  key: 1,
                  ref_for: !0
                }, _(Y, z)), () => [
                  Ae(A(v(b(Y.row, z.key))), 1)
                ], !0)
              ], 2))), 128))
            ], 2))), 128))
          ])
        ], 2)
      ])
    ]));
  }
}), U2 = /* @__PURE__ */ be(K2, [["__scopeId", "data-v-b3104817"]]), pi = /* @__PURE__ */ he({
  name: "ButtonLoadingSpinner",
  __name: "ButtonLoadingSpinner",
  props: {
    compact: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, a = $(
      () => t.compact ? "size-4" : "h-[1.125rem] w-[1.125rem]"
    );
    return (n, o) => (g(), x("svg", {
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
}), Y2 = ["disabled", "aria-expanded", "aria-label"], q2 = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]",
  "aria-hidden": "true"
}, X2 = { class: "min-w-0 truncate" }, G2 = ["disabled", "onClick", "onMouseenter"], Z2 = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, Q2 = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, J2 = { class: "min-w-0 flex-1 text-left" }, ew = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, tw = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, aw = ["disabled", "aria-expanded", "aria-label"], nw = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:size-4",
  "aria-hidden": "true"
}, ow = ["disabled", "onClick", "onMouseenter"], sw = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, iw = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, rw = { class: "min-w-0 flex-1 text-left" }, lw = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, cw = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, dw = {
  key: 2,
  class: "group relative inline-flex shrink-0"
}, uw = ["type", "disabled", "aria-busy", "aria-label"], hw = {
  key: 2,
  class: "min-w-0 truncate"
}, fw = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, gw = ["type", "disabled", "aria-busy", "aria-label"], mw = {
  key: 2,
  class: "min-w-0 truncate"
}, $t = /* @__PURE__ */ he({
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
    const a = e, n = t, o = Ja(), s = $(
      () => !!a.tooltip?.trim() && a.variant !== "dropdown" && a.variant !== "split"
    ), i = $(() => a.variant === "dropdown"), r = $(() => a.variant === "split"), l = $(() => a.variant === "action"), c = $(() => !l.value && !r.value), u = $(() => a.disabled || a.loading), f = $(
      () => a.loading ? "cursor-wait disabled:pointer-events-none" : "disabled:pointer-events-none disabled:opacity-45"
    ), m = $(() => {
      const L = o["aria-label"];
      if (typeof L == "string" && L.length > 0) return L;
      if ((l.value || r.value) && a.tooltip?.trim()) return a.tooltip.trim();
    }), p = $(() => {
      const L = o.type;
      return L === "submit" || L === "reset" || L === "button" ? L : "button";
    }), h = $(() => {
      const { class: L, type: U, "aria-label": Y, ...z } = o;
      return z;
    }), b = $(() => a.variant === "primary" || a.variant === "dropdown" ? [
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
    ]), v = `kiut-button-menu-${We()}`, y = `${v}-btn`, w = `${v}-menu`, _ = ne(null), k = ne(null), C = ne(null), S = ne(!1), M = ne(0), R = ne({}), V = $(() => a.options.filter((L) => !L.disabled));
    function W(L) {
      return `${L.value}-${L.label}`;
    }
    function D() {
      const L = k.value;
      if (!L) return;
      const U = L.getBoundingClientRect(), Y = {
        top: `${U.bottom - 3}px`,
        minWidth: `max(${U.width}px, ${a.menuMinWidth})`
      };
      a.menuAlign === "right" ? (Y.right = `${window.innerWidth - U.right}px`, Y.left = "auto") : (Y.left = `${U.left}px`, Y.right = "auto"), R.value = Y;
    }
    function I(L) {
      return [
        "mx-1 flex w-full cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 text-left outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-45",
        M.value === L ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function B() {
      S.value = !1;
    }
    function j() {
      D(), M.value = 0, Ke(() => C.value?.focus());
    }
    function H() {
      if (!a.disabled) {
        if (S.value) {
          B();
          return;
        }
        S.value = !0, j();
      }
    }
    function Q(L) {
      L.disabled || (n("select", L), B());
    }
    function le(L) {
      L.stopPropagation(), H();
    }
    function fe(L) {
      if (!S.value) return;
      const U = L.target, Y = _.value, z = C.value;
      Y && !Y.contains(U) && (!z || !z.contains(U)) && B();
    }
    function G(L) {
      a.disabled || (L.key === "ArrowDown" || L.key === "Enter" || L.key === " ") && (L.preventDefault(), S.value || (S.value = !0, j()));
    }
    function oe(L) {
      const U = V.value;
      if (L.key === "Escape") {
        L.preventDefault(), B(), k.value?.focus();
        return;
      }
      if (U.length !== 0) {
        if (L.key === "ArrowDown") {
          L.preventDefault(), M.value = Math.min(M.value + 1, U.length - 1);
          return;
        }
        if (L.key === "ArrowUp") {
          L.preventDefault(), M.value = Math.max(M.value - 1, 0);
          return;
        }
        if (L.key === "Enter" || L.key === " ") {
          L.preventDefault();
          const Y = U[M.value];
          Y && Q(Y);
        }
      }
    }
    return Je(() => {
      document.addEventListener("click", fe);
    }), rt(() => {
      document.removeEventListener("click", fe);
    }), (L, U) => i.value ? (g(), x("div", {
      key: 0,
      ref_key: "rootRef",
      ref: _,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      d("button", yt({
        ref_key: "buttonRef",
        ref: k,
        id: y,
        type: "button",
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [b.value, T(o).class]],
        disabled: e.disabled,
        "aria-expanded": S.value,
        "aria-haspopup": "menu",
        "aria-controls": w,
        "aria-label": m.value
      }, h.value, {
        onClick: le,
        onKeydown: G
      }), [
        L.$slots.icon ? (g(), x("span", q2, [
          ke(L.$slots, "icon")
        ])) : F("", !0),
        d("span", X2, [
          ke(L.$slots, "default")
        ]),
        N(T(ta), {
          class: Z(["h-[1.125rem] w-[1.125rem] shrink-0 transition-transform", S.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 16, Y2),
      (g(), ae(Qt, { to: "body" }, [
        Xe(d("div", {
          ref_key: "panelRef",
          ref: C,
          id: w,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: Ce(R.value),
          onKeydown: Be(oe, ["stop"])
        }, [
          (g(!0), x(ue, null, pe(V.value, (Y, z) => (g(), x("button", {
            key: W(Y),
            type: "button",
            role: "menuitem",
            disabled: Y.disabled,
            class: Z(I(z)),
            onClick: Be((re) => Q(Y), ["stop"]),
            onMouseenter: (re) => M.value = z
          }, [
            Y.icon ? (g(), x("span", Z2, [
              (g(), ae(ft(Y.icon), { class: "h-5 w-5" }))
            ])) : (g(), x("span", Q2)),
            d("span", J2, [
              d("span", ew, A(Y.label), 1),
              Y.description ? (g(), x("span", tw, A(Y.description), 1)) : F("", !0)
            ])
          ], 42, G2))), 128))
        ], 36), [
          [Ht, S.value]
        ])
      ]))
    ], 512)) : r.value ? (g(), x("div", {
      key: 1,
      ref_key: "rootRef",
      ref: _,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      d("button", yt({
        ref_key: "buttonRef",
        ref: k,
        type: "button",
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [b.value, T(o).class]],
        disabled: e.disabled,
        "aria-expanded": S.value,
        "aria-haspopup": "menu",
        "aria-controls": w,
        "aria-label": m.value
      }, h.value, {
        onClick: le,
        onKeydown: G
      }), [
        L.$slots.icon ? (g(), x("span", nw, [
          ke(L.$slots, "icon")
        ])) : F("", !0)
      ], 16, aw),
      (g(), ae(Qt, { to: "body" }, [
        Xe(d("div", {
          ref_key: "panelRef",
          ref: C,
          id: w,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: Ce(R.value),
          onKeydown: Be(oe, ["stop"])
        }, [
          (g(!0), x(ue, null, pe(V.value, (Y, z) => (g(), x("button", {
            key: W(Y),
            type: "button",
            role: "menuitem",
            disabled: Y.disabled,
            class: Z(I(z)),
            onClick: Be((re) => Q(Y), ["stop"]),
            onMouseenter: (re) => M.value = z
          }, [
            Y.icon ? (g(), x("span", sw, [
              (g(), ae(ft(Y.icon), { class: "h-5 w-5" }))
            ])) : (g(), x("span", iw)),
            d("span", rw, [
              d("span", lw, A(Y.label), 1),
              Y.description ? (g(), x("span", cw, A(Y.description), 1)) : F("", !0)
            ])
          ], 42, ow))), 128))
        ], 36), [
          [Ht, S.value]
        ])
      ]))
    ], 512)) : s.value ? (g(), x("span", dw, [
      d("button", yt({
        type: p.value,
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [f.value, b.value, T(o).class]],
        disabled: u.value,
        "aria-busy": e.loading || void 0,
        "aria-label": m.value
      }, h.value), [
        e.loading ? (g(), ae(pi, {
          key: 0,
          compact: l.value
        }, null, 8, ["compact"])) : L.$slots.icon ? (g(), x("span", {
          key: 1,
          class: Z(["inline-flex shrink-0", l.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          ke(L.$slots, "icon")
        ], 2)) : F("", !0),
        c.value ? (g(), x("span", hw, [
          ke(L.$slots, "default")
        ])) : F("", !0)
      ], 16, uw),
      d("span", fw, A(e.tooltip), 1)
    ])) : (g(), x("button", yt({
      key: 3,
      type: p.value,
      class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [f.value, b.value, T(o).class]],
      disabled: u.value,
      "aria-busy": e.loading || void 0,
      "aria-label": m.value
    }, h.value), [
      e.loading ? (g(), ae(pi, {
        key: 0,
        compact: l.value
      }, null, 8, ["compact"])) : L.$slots.icon ? (g(), x("span", {
        key: 1,
        class: Z(["inline-flex shrink-0", l.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        ke(L.$slots, "icon")
      ], 2)) : F("", !0),
      c.value ? (g(), x("span", mw, [
        ke(L.$slots, "default")
      ])) : F("", !0)
    ], 16, gw));
  }
}), pw = ["id", "data-kiut-toggle-size", "aria-checked", "aria-disabled", "disabled", "onKeydown"], bw = { class: "sr-only" }, Er = /* @__PURE__ */ he({
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
    return (s, i) => (g(), x("button", {
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
        Ca(Be(o, ["prevent", "stop"]), ["space"]),
        Ca(Be(o, ["prevent"]), ["enter"])
      ]
    }, [
      d("span", {
        class: Z(["pointer-events-none inline-block translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", [
          e.size === "sm" ? "h-5 w-5" : "h-7 w-7",
          e.modelValue ? e.size === "sm" ? "translate-x-5" : "translate-x-7" : "translate-x-0"
        ]]),
        "aria-hidden": "true"
      }, null, 2),
      d("span", bw, A(e.ariaLabel), 1)
    ], 42, pw));
  }
}), vw = {
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
}, yw = [
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
], j3 = [
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
], xw = { class: "kiut-table-versions-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, kw = { class: "w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden" }, _w = { class: "kiut-table-versions w-full min-w-[640px] table-fixed border-collapse text-left text-sm" }, ww = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, Cw = { class: "h-14 border-b border-[#e5e7eb] bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]" }, $w = {
  key: 0,
  class: "flex min-w-0 items-center gap-1.5"
}, Sw = ["aria-expanded", "aria-label", "onClick"], Mw = { class: "min-w-0 flex-1" }, Dw = {
  key: 0,
  class: "border-b border-[#e5e7eb] bg-[#f9fafb] dark:border-[color:var(--kiut-border-light)] dark:bg-[#1a1a22]"
}, Aw = ["colspan"], Tw = { class: "mb-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-muted)]" }, Bw = ["aria-label"], Lw = {
  key: 1,
  class: "text-sm text-[color:var(--kiut-text-muted)]"
}, Rw = {
  key: 2,
  class: "space-y-2"
}, Pw = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)]" }, Iw = ["title"], Ew = { class: "whitespace-nowrap text-xs text-[color:var(--kiut-text-muted)]" }, Fw = { class: "ml-auto flex shrink-0 items-center gap-2" }, Ow = /* @__PURE__ */ he({
  name: "TableVersions",
  __name: "TableVersions",
  props: {
    rows: { default: () => [] },
    columns: { default: () => yw },
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
      ...vw,
      ...a.labels
    })), r = $(
      () => a.expandColumnKey ?? a.columns[0]?.key ?? ""
    ), l = {
      GET: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
      POST: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
      PUT: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
      PATCH: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
      DELETE: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
    };
    function c(D) {
      return `cell-${D}`;
    }
    function u(D, I, B) {
      return {
        row: D,
        column: I,
        index: B,
        expanded: b(D, B)
      };
    }
    function f(D) {
      const I = D.key;
      return D.label ? D.label : I in i.value ? i.value[I] : D.key;
    }
    function m(D) {
      return D === "center" ? "text-center" : D === "right" ? "text-right" : "text-left";
    }
    function p(D) {
      return D === r.value;
    }
    function h(D, I) {
      if (typeof a.rowKey == "function")
        return a.rowKey(D);
      const B = D[a.rowKey];
      return B != null ? String(B) : `__index_${I}`;
    }
    function b(D, I) {
      return s.value.includes(h(D, I));
    }
    function v(D) {
      return D.versionsLoading === !0;
    }
    function y(D, I) {
      const B = h(D, I), j = new Set(s.value);
      j.has(B) ? (j.delete(B), n("collapse", B, D)) : (a.singleExpand && j.clear(), j.add(B), n("expand", B, D)), s.value = [...j];
    }
    function w(D) {
      return D.type ?? D.key;
    }
    function _(D) {
      return l[D] ?? "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300";
    }
    function k(D) {
      return D === "published" ? "success" : "warning";
    }
    function C(D) {
      const I = D instanceof Date ? D : new Date(D);
      return Number.isNaN(I.getTime()) ? String(D) : I.toLocaleDateString("es-ES");
    }
    function S(D) {
      const I = D instanceof Date ? D : new Date(D);
      return Number.isNaN(I.getTime()) ? String(D) : I.toLocaleString("es-ES");
    }
    function M(D) {
      return je("div", { class: "min-w-0" }, [
        je(
          "p",
          { class: "truncate font-medium text-[color:var(--kiut-text-primary)]" },
          D.name
        ),
        D.description ? je(
          "p",
          { class: "truncate text-xs text-[color:var(--kiut-text-muted)]" },
          D.description
        ) : null
      ]);
    }
    function R(D) {
      return D.method ? je(
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
    function V(D, I) {
      const B = I.actions ?? ["view", "edit"], j = [];
      for (const H of B)
        H === "view" ? j.push(
          je(
            $t,
            {
              variant: "action",
              tooltip: i.value.view,
              ariaLabel: i.value.view,
              onClick: () => n("view", D)
            },
            { icon: () => je(di, { class: "h-4 w-4" }) }
          )
        ) : H === "run" ? j.push(
          je(
            $t,
            {
              variant: "action",
              tooltip: i.value.run,
              ariaLabel: i.value.run,
              onClick: () => n("run", D)
            },
            { icon: () => je(ip, { class: "h-4 w-4" }) }
          )
        ) : H === "edit" ? j.push(
          je(
            $t,
            {
              variant: "action",
              tooltip: i.value.edit,
              ariaLabel: i.value.edit,
              onClick: () => n("edit", D)
            },
            { icon: () => je(sp, { class: "h-4 w-4" }) }
          )
        ) : H === "createDraft" ? j.push(
          je(
            $t,
            {
              variant: "action",
              tooltip: i.value.createDraft,
              ariaLabel: i.value.createDraft,
              onClick: () => n("createDraft", D)
            },
            { icon: () => je(ci, { class: "h-4 w-4" }) }
          )
        ) : H === "delete" && j.push(
          je(
            $t,
            {
              variant: "action",
              tone: "danger",
              tooltip: i.value.delete,
              ariaLabel: i.value.delete,
              onClick: () => n("delete", D)
            },
            { icon: () => je(rp, { class: "h-4 w-4" }) }
          )
        );
      return je(
        "div",
        { class: "flex items-center justify-end gap-1" },
        j
      );
    }
    function W(D, I, B) {
      switch (w(I)) {
        case "name":
          return M(D);
        case "method":
          return R(D);
        case "url":
          return D.url ? je(
            "span",
            {
              class: "block truncate font-mono text-xs text-[color:var(--kiut-text-secondary)]",
              title: D.url
            },
            D.url
          ) : null;
        case "status":
          return je(
            Ge,
            { color: k(D.status), outlined: !1 },
            () => D.status
          );
        case "version":
          return je("span", {}, D.version);
        case "updated":
          return je(
            "span",
            { class: "whitespace-nowrap text-xs" },
            C(D.updatedAt)
          );
        case "active":
          return je(Er, {
            modelValue: D.active ?? !1,
            ariaLabel: i.value.toggleActive,
            "onUpdate:modelValue": (H) => n("toggleActive", D, H)
          });
        case "actions":
          return V(D, I);
        default:
          return je("span", {}, String(D[I.key] ?? ""));
      }
    }
    return (D, I) => (g(), x("div", xw, [
      d("div", kw, [
        d("table", _w, [
          d("thead", null, [
            d("tr", ww, [
              (g(!0), x(ue, null, pe(e.columns, (B) => (g(), x("th", {
                key: B.key,
                scope: "col",
                class: Z([
                  "px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-table-header)]",
                  m(B.align),
                  B.headerClass ?? ""
                ])
              }, A(f(B)), 3))), 128))
            ])
          ]),
          d("tbody", null, [
            (g(!0), x(ue, null, pe(e.rows, (B, j) => (g(), x(ue, {
              key: h(B, j)
            }, [
              d("tr", Cw, [
                (g(!0), x(ue, null, pe(e.columns, (H) => (g(), x("td", {
                  key: H.key,
                  class: Z([
                    "px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]",
                    m(H.align),
                    H.cellClass ?? ""
                  ])
                }, [
                  ke(D.$slots, c(H.key), yt({ ref_for: !0 }, u(B, H, j)), () => [
                    p(H.key) ? (g(), x("div", $w, [
                      d("button", {
                        type: "button",
                        class: "kiut-table-versions-expand-btn shrink-0",
                        "aria-expanded": b(B, j),
                        "aria-label": b(B, j) ? i.value.collapseRow : i.value.expandRow,
                        onClick: (Q) => y(B, j)
                      }, [
                        N(T(ta), {
                          class: Z(["h-4 w-4 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !b(B, j) }]),
                          "aria-hidden": "true"
                        }, null, 8, ["class"])
                      ], 8, Sw),
                      d("div", Mw, [
                        (g(), ae(ft(() => W(B, H))))
                      ])
                    ])) : (g(), ae(ft(() => W(B, H)), { key: 1 }))
                  ], !0)
                ], 2))), 128))
              ]),
              b(B, j) ? (g(), x("tr", Dw, [
                d("td", {
                  colspan: e.columns.length,
                  class: "py-3 px-4"
                }, [
                  d("h4", Tw, A(i.value.historialTitle), 1),
                  v(B) ? (g(), x("div", {
                    key: 0,
                    class: "space-y-2",
                    role: "status",
                    "aria-busy": "true",
                    "aria-label": i.value.loadingHistory
                  }, [
                    (g(!0), x(ue, null, pe(e.historySkeletonCount, (H) => (g(), x("div", {
                      key: H,
                      class: "flex flex-wrap items-center gap-3 rounded-lg border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] px-4 py-3 dark:border-[color:var(--kiut-border-light)]",
                      "aria-hidden": "true"
                    }, [...I[0] || (I[0] = [
                      eo('<div class="kiut-table-versions-skeleton h-5 w-16 rounded-full" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 w-8" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 w-14 rounded-full" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 min-w-[8rem] flex-1" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 w-28" data-v-177ecafb></div>', 5)
                    ])]))), 128))
                  ], 8, Bw)) : B.versions?.length ? (g(), x("div", Rw, [
                    (g(!0), x(ue, null, pe(B.versions, (H) => (g(), x("div", {
                      key: H.id,
                      class: "flex flex-wrap items-center gap-3 rounded-lg border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] px-4 py-3 dark:border-[color:var(--kiut-border-light)]"
                    }, [
                      ke(D.$slots, "history-item", {
                        version: H,
                        row: B
                      }, () => [
                        N(Ge, {
                          color: "neutral",
                          outlined: ""
                        }, {
                          default: O(() => [
                            Ae(A(H.status), 1)
                          ]),
                          _: 2
                        }, 1024),
                        d("span", Pw, A(H.version), 1),
                        H.method ? (g(), x("span", {
                          key: 0,
                          class: Z(["inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold", _(H.method)])
                        }, A(H.method), 3)) : F("", !0),
                        H.url ? (g(), x("span", {
                          key: 1,
                          class: "min-w-0 flex-1 truncate font-mono text-xs text-[color:var(--kiut-text-secondary)]",
                          title: H.url
                        }, A(H.url), 9, Iw)) : F("", !0),
                        d("span", Ew, A(S(H.updatedAt)), 1)
                      ], !0),
                      d("div", Fw, [
                        ke(D.$slots, "history-actions", {
                          version: H,
                          row: B
                        }, () => [
                          N($t, {
                            variant: "secondary",
                            class: "!min-h-8 !px-3 !py-1.5 !text-xs",
                            onClick: (Q) => n("viewVersion", H, B)
                          }, {
                            icon: O(() => [
                              N(T(di), { class: "h-4 w-4" })
                            ]),
                            default: O(() => [
                              Ae(" " + A(i.value.viewVersion), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          N($t, {
                            variant: "secondary",
                            class: "!min-h-8 !px-3 !py-1.5 !text-xs",
                            onClick: (Q) => n("createDraftFromVersion", H, B)
                          }, {
                            icon: O(() => [
                              N(T(ci), { class: "h-4 w-4" })
                            ]),
                            default: O(() => [
                              Ae(" " + A(i.value.createDraftFromVersion), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ], !0)
                      ])
                    ]))), 128))
                  ])) : (g(), x("p", Lw, A(i.value.emptyHistory), 1))
                ], 8, Aw)
              ])) : F("", !0)
            ], 64))), 128))
          ])
        ])
      ])
    ]));
  }
}), Vw = /* @__PURE__ */ be(Ow, [["__scopeId", "data-v-177ecafb"]]);
function bi(e, t) {
  return g(), x("svg", {
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
function zw(e, t) {
  return g(), x("svg", {
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
function Nw(e, t) {
  return g(), x("svg", {
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
function jw(e, t) {
  return g(), x("svg", {
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
function Hw(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", { d: "M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" })
  ]);
}
function Ww(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", { d: "M15.98 1.804a1 1 0 0 0-1.96 0l-.24 1.192a1 1 0 0 1-.784.785l-1.192.238a1 1 0 0 0 0 1.962l1.192.238a1 1 0 0 1 .785.785l.238 1.192a1 1 0 0 0 1.962 0l.238-1.192a1 1 0 0 1 .785-.785l1.192-.238a1 1 0 0 0 0-1.962l-1.192-.238a1 1 0 0 1-.785-.785l-.238-1.192ZM6.949 5.684a1 1 0 0 0-1.898 0l-.683 2.051a1 1 0 0 1-.633.633l-2.051.683a1 1 0 0 0 0 1.898l2.051.684a1 1 0 0 1 .633.632l.683 2.051a1 1 0 0 0 1.898 0l.683-2.051a1 1 0 0 1 .633-.633l2.051-.683a1 1 0 0 0 0-1.898l-2.051-.683a1 1 0 0 1-.633-.633L6.95 5.684ZM13.949 13.684a1 1 0 0 0-1.898 0l-.184.551a1 1 0 0 1-.632.633l-.551.183a1 1 0 0 0 0 1.898l.551.183a1 1 0 0 1 .633.633l.183.551a1 1 0 0 0 1.898 0l.184-.551a1 1 0 0 1 .632-.633l.551-.183a1 1 0 0 0 0-1.898l-.551-.184a1 1 0 0 1-.633-.632l-.183-.551Z" })
  ]);
}
function Kw(e, t) {
  return g(), x("svg", {
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
function Uw(e, t) {
  return g(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", { d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" })
  ]);
}
const Yw = ["aria-label"], qw = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, Xw = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, Gw = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, Zw = ["aria-label", "aria-expanded", "aria-controls", "onClick"], Qw = { class: "truncate" }, Jw = {
  key: 0,
  class: "ml-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--kiut-primary)]/20 px-1 text-[10px] font-semibold tabular-nums text-[color:var(--kiut-primary-default)] dark:bg-[color:var(--kiut-primary)]/25 dark:text-[color:var(--kiut-primary-light)]"
}, e5 = {
  key: 0,
  class: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5"
}, t5 = { class: "flex min-w-0 flex-wrap items-center gap-1.5" }, a5 = ["aria-label", "onClick"], n5 = ["aria-label", "onClick"], o5 = ["aria-label"], s5 = ["aria-label"], i5 = {
  key: 1,
  class: "space-y-2"
}, r5 = ["for"], l5 = ["id", "placeholder", "onKeydown"], c5 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, d5 = ["aria-label"], u5 = { class: "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] transition hover:bg-black/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.06]" }, h5 = ["checked", "onChange"], f5 = { class: "min-w-0 flex-1" }, g5 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, m5 = { class: "flex flex-wrap items-end gap-2" }, p5 = { class: "min-w-[120px] flex-1" }, b5 = ["for"], v5 = ["id"], y5 = { class: "min-w-[120px] flex-1" }, x5 = ["for"], k5 = ["id"], _5 = /* @__PURE__ */ he({
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
    const a = e, n = t, o = ho(), i = `${`kiut-filters-${We()}`}-panel`, r = ne(null), l = /* @__PURE__ */ new Map(), c = ne(null), u = ne(!1), f = ne({}), m = ne(null), p = ne(""), h = ne([]), b = ne(""), v = ne(""), y = $(() => c.value ? a.filterDefinitions.find((E) => E.id === c.value) ?? null : null), w = $(() => {
      const E = y.value;
      if (E)
        return E.type === "text" ? p.value : E.type === "select" ? h.value : { start: b.value, end: v.value };
    });
    function _(E, J) {
      J && J instanceof HTMLElement ? l.set(E, J) : l.delete(E);
    }
    function k(E) {
      return a.modelValue[E];
    }
    function C(E) {
      if (E == null) return [];
      if (Array.isArray(E))
        return E.filter((J) => typeof J == "string" && J.trim() !== "");
      if (typeof E == "string") {
        const J = E.trim();
        return J ? [J] : [];
      }
      return [];
    }
    function S(E, J) {
      if (J == null) return !0;
      if (E.type === "text") return String(J).trim() === "";
      if (E.type === "select") return C(J).length === 0;
      if (E.type === "dateRange") {
        const se = J;
        return !se?.start?.trim() || !se?.end?.trim();
      }
      return !0;
    }
    const M = $(
      () => a.filterDefinitions.some((E) => !S(E, k(E.id)))
    ), R = $(() => {
      const E = [];
      for (const J of a.filterDefinitions) {
        const se = k(J.id);
        if (!S(J, se)) {
          if (J.type === "text")
            E.push({ kind: "text", def: J, key: J.id });
          else if (J.type === "dateRange")
            E.push({ kind: "dateRange", def: J, key: J.id });
          else if (J.type === "select")
            for (const ge of C(se))
              E.push({
                kind: "select",
                def: J,
                optionValue: ge,
                key: `${J.id}::${ge}`
              });
        }
      }
      return E;
    });
    function V(E) {
      return E.type !== "select" ? 0 : C(k(E.id)).length;
    }
    function W(E) {
      const J = k(E.id), se = E.label.replace(/^\+\s*/, "");
      if (E.type === "text") return `${se}: ${String(J ?? "").trim()}`;
      if (E.type === "select") {
        const Pe = C(J).map((qe) => E.options.find((pa) => pa.value === qe)?.label ?? qe);
        return `${se}: ${Pe.join(", ")}`;
      }
      const ge = J, we = I(ge.start), _e = I(ge.end);
      return `${se}: ${we} – ${_e}`;
    }
    function D(E) {
      return E.kind === "text" || E.kind === "dateRange" ? W(E.def) : E.def.options.find((se) => se.value === E.optionValue)?.label ?? E.optionValue;
    }
    function I(E) {
      if (!E) return "";
      const J = He(E, "YYYY-MM-DD", !0);
      return J.isValid() ? J.format("L") : E;
    }
    function B(E) {
      const J = c.value === E.id && u.value, se = !S(E, k(E.id));
      return J || se ? "border border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border border-dashed border-[#838395] text-[color:var(--kiut-text-secondary)] hover:border-[#838395] hover:bg-slate-50 dark:border-[#838395] dark:text-slate-400 dark:hover:border-[#838395] dark:hover:bg-white/[0.04]";
    }
    function j(E) {
      return S(E, k(E.id)) ? ee(E) : `Editar filtro ${E.label.replace(/^\+\s*/, "")}`;
    }
    function H(E) {
      const J = k(E.id);
      if (E.type === "text") {
        p.value = J != null ? String(J) : "";
        return;
      }
      if (E.type === "select") {
        h.value = [...C(J)];
        return;
      }
      const se = J;
      b.value = se?.start?.trim() ?? "", v.value = se?.end?.trim() ?? "";
    }
    function Q() {
      const E = y.value;
      if (!E || E.type !== "select") return;
      const J = { ...a.modelValue };
      h.value.length === 0 ? delete J[E.id] : J[E.id] = [...h.value], n("update:modelValue", J), n("change", J);
    }
    function le(E) {
      const J = h.value.indexOf(E);
      J >= 0 ? h.value = h.value.filter((se, ge) => ge !== J) : h.value = [...h.value, E], Q();
    }
    function fe(E) {
      if (!E) return;
      m.value = E;
      const J = E.getBoundingClientRect(), se = 300;
      let ge = J.left;
      const we = window.innerWidth - se - 12;
      ge > we && (ge = Math.max(12, we)), ge < 12 && (ge = 12);
      const _e = J.bottom + 8;
      f.value = {
        top: `${_e}px`,
        left: `${ge}px`,
        width: `${Math.min(se, window.innerWidth - 24)}px`
      };
    }
    function G(E, J) {
      if (c.value === E.id && u.value) {
        z();
        return;
      }
      u.value && c.value !== E.id && z(), c.value = E.id, u.value = !0, H(E), Ke().then(async () => {
        fe(J.currentTarget), await Ke(), L();
      });
    }
    function oe(E, J) {
      if (c.value === E.id && u.value) {
        z();
        return;
      }
      u.value && c.value !== E.id && z(), c.value = E.id, u.value = !0, H(E), Ke().then(async () => {
        const se = l.get(E.id) ?? J.currentTarget;
        fe(se), await Ke(), L();
      });
    }
    function L() {
      const E = r.value;
      if (!E) return;
      E.querySelector(
        'input[type="text"], input[type="date"], input[type="checkbox"], select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function U() {
      u.value = !1, c.value = null, m.value = null;
    }
    function Y(E) {
      const J = y.value;
      if (!J) return;
      if (J.type === "text") {
        p.value = E != null ? String(E) : "";
        return;
      }
      if (J.type === "select") {
        h.value = Array.isArray(E) ? E.filter((ge) => typeof ge == "string") : C(E);
        return;
      }
      const se = E;
      b.value = se?.start?.trim() ?? "", v.value = se?.end?.trim() ?? "";
    }
    function z() {
      const E = y.value;
      if (!E) return;
      if (E.type === "text") {
        const we = p.value.trim(), _e = { ...a.modelValue };
        we === "" ? delete _e[E.id] : _e[E.id] = we, n("update:modelValue", _e), n("change", _e), U();
        return;
      }
      if (E.type === "select") {
        Q(), U();
        return;
      }
      const J = b.value.trim(), se = v.value.trim(), ge = { ...a.modelValue };
      !J || !se || J > se ? delete ge[E.id] : ge[E.id] = { start: J, end: se }, n("update:modelValue", ge), n("change", ge), U();
    }
    function re(E) {
      const J = { ...a.modelValue };
      delete J[E], n("update:modelValue", J), n("change", J), c.value === E && U();
    }
    function ce(E) {
      if (E.kind === "text" || E.kind === "dateRange") {
        re(E.def.id);
        return;
      }
      const J = { ...a.modelValue }, ge = C(J[E.def.id]).filter((we) => we !== E.optionValue);
      ge.length === 0 ? delete J[E.def.id] : J[E.def.id] = ge, n("update:modelValue", J), n("change", J), c.value === E.def.id && H(E.def);
    }
    function ve() {
      const E = {};
      n("update:modelValue", E), n("change", E), U();
    }
    const K = $(() => {
      const E = y.value;
      return E ? `Editar filtro: ${E.label}` : "Filtro";
    });
    function ie(E) {
      const J = E.def.label.replace(/^\+\s*/, "");
      return E.kind === "select" ? `Quitar ${E.def.options.find((we) => we.value === E.optionValue)?.label ?? E.optionValue} del filtro ${J}` : `Quitar filtro ${J}`;
    }
    function de(E) {
      const J = E.def.label.replace(/^\+\s*/, "");
      if (E.kind === "select") {
        const ge = E.def.options.find((we) => we.value === E.optionValue)?.label ?? E.optionValue;
        return `Editar filtro ${J}: ${ge}`;
      }
      return `Editar filtro ${J}`;
    }
    function ee(E) {
      return `Añadir filtro ${E.label.replace(/^\+\s*/, "")}`;
    }
    const X = $(() => a.clearLabel);
    function P(E) {
      if (!u.value || !r.value) return;
      const J = E.target;
      if (!(r.value.contains(J) || (J instanceof Element ? J : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const ge of l.values())
          if (ge?.contains(J)) return;
        z();
      }
    }
    function q(E) {
      E.key === "Escape" && u.value && (E.preventDefault(), U());
    }
    function te() {
      !u.value || !m.value || fe(m.value);
    }
    return Je(() => {
      document.addEventListener("mousedown", P, !0), window.addEventListener("keydown", q, !0), window.addEventListener("resize", te);
    }), _i(() => {
      document.removeEventListener("mousedown", P, !0), window.removeEventListener("keydown", q, !0), window.removeEventListener("resize", te);
    }), Te(
      () => a.modelValue,
      () => {
        const E = y.value;
        E && u.value && !o.panel && H(E);
      },
      { deep: !0 }
    ), (E, J) => (g(), x("div", {
      class: "kiut-filters font-[Inter] text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      d("div", qw, [
        d("span", Xw, A(e.label), 1),
        d("div", Gw, [
          (g(!0), x(ue, null, pe(e.filterDefinitions, (se) => (g(), x("button", {
            key: `pill-${se.id}`,
            ref_for: !0,
            ref: (ge) => _(se.id, ge),
            type: "button",
            class: Z(["inline-flex h-[26px] max-w-full shrink-0 items-center gap-0.5 rounded-full px-2 font-medium transition-colors", B(se)]),
            "aria-label": j(se),
            "aria-expanded": c.value === se.id,
            "aria-haspopup": !0,
            "aria-controls": c.value === se.id ? i : void 0,
            onClick: (ge) => oe(se, ge)
          }, [
            N(T(Hw), {
              class: "h-2.5 w-2.5 shrink-0",
              "aria-hidden": "true"
            }),
            d("span", Qw, A(se.label), 1),
            se.type === "select" && V(se) > 0 ? (g(), x("span", Jw, A(V(se)), 1)) : F("", !0)
          ], 10, Zw))), 128))
        ])
      ]),
      M.value ? (g(), x("div", e5, [
        d("div", t5, [
          (g(!0), x(ue, null, pe(R.value, (se) => (g(), x("div", {
            key: se.key,
            "data-kiut-filter-chip": "",
            class: "inline-flex h-[26px] max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            d("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": de(se),
              onClick: (ge) => G(se.def, ge)
            }, [
              ke(E.$slots, "formatChip", {
                filter: se.def,
                value: k(se.def.id),
                optionValue: se.kind === "select" ? se.optionValue : void 0
              }, () => [
                Ae(A(D(se)), 1)
              ], !0)
            ], 8, a5),
            d("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": ie(se),
              onClick: (ge) => ce(se)
            }, [
              N(T(Uw), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, n5)
          ]))), 128))
        ]),
        d("button", {
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": X.value,
          onClick: ve
        }, A(e.clearLabel), 9, o5)
      ])) : F("", !0),
      (g(), ae(Qt, { to: "body" }, [
        c.value && u.value ? (g(), x("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: r,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": K.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:bg-[#252528]",
          style: Ce(f.value),
          onKeydown: J[3] || (J[3] = Be(() => {
          }, ["stop"]))
        }, [
          y.value ? (g(), x(ue, { key: 0 }, [
            E.$slots.panel ? ke(E.$slots, "panel", {
              key: 0,
              filter: y.value,
              close: z,
              value: w.value,
              updateValue: Y
            }, void 0, !0) : (g(), x("div", i5, [
              y.value.type === "text" ? (g(), x(ue, { key: 0 }, [
                d("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, A(y.value.label), 9, r5),
                Xe(d("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": J[0] || (J[0] = (se) => p.value = se),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: y.value.placeholder ?? "…",
                  onKeydown: Ca(Be(z, ["prevent"]), ["enter"])
                }, null, 40, l5), [
                  [Rt, p.value]
                ])
              ], 64)) : y.value.type === "select" ? (g(), x(ue, { key: 1 }, [
                d("p", c5, A(y.value.label), 1),
                d("ul", {
                  class: "max-h-[min(280px,50vh)] space-y-0.5 overflow-y-auto",
                  role: "listbox",
                  "aria-label": y.value.label,
                  "aria-multiselectable": !0
                }, [
                  (g(!0), x(ue, null, pe(y.value.options, (se) => (g(), x("li", {
                    key: se.value
                  }, [
                    d("label", u5, [
                      d("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox shrink-0",
                        checked: h.value.includes(se.value),
                        onChange: (ge) => le(se.value)
                      }, null, 40, h5),
                      d("span", f5, A(se.label), 1)
                    ])
                  ]))), 128))
                ], 8, d5)
              ], 64)) : y.value.type === "dateRange" ? (g(), x(ue, { key: 2 }, [
                d("p", g5, A(y.value.label), 1),
                d("div", m5, [
                  d("div", p5, [
                    d("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, b5),
                    Xe(d("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": J[1] || (J[1] = (se) => b.value = se),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, v5), [
                      [Rt, b.value]
                    ])
                  ]),
                  d("div", y5, [
                    d("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, x5),
                    Xe(d("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": J[2] || (J[2] = (se) => v.value = se),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, k5), [
                      [Rt, v.value]
                    ])
                  ])
                ])
              ], 64)) : F("", !0)
            ]))
          ], 64)) : F("", !0)
        ], 44, s5)) : F("", !0)
      ]))
    ], 8, Yw));
  }
}), w5 = /* @__PURE__ */ be(_5, [["__scopeId", "data-v-f38e0100"]]), C5 = { class: "font-sans" }, $5 = ["for"], S5 = { class: "relative" }, M5 = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], D5 = ["id"], Fr = /* @__PURE__ */ he({
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
    const a = e, n = t, o = Ja(), s = wi("$pcForm", null), i = `kiut-input-text-${We()}`, r = $(() => a.id ?? i), l = $(() => `${r.value}-err`), c = $(() => a.name ?? o.name ?? ""), u = ne(a.modelValue ?? "");
    Te(
      () => a.modelValue,
      (y) => {
        u.value = y ?? "";
      }
    ), Je(() => {
      s && c.value && s.register?.(c.value, {});
    }), rt(() => {
      s && c.value && s.deregister?.(c.value);
    });
    const f = $(() => s && c.value ? s.fields?.[c.value]?.states?.value ?? u.value : u.value), m = $(() => s && c.value ? s.fields?.[c.value]?.states?.invalid ?? a.invalid ?? !1 : a.invalid ?? !1);
    function p(y) {
      const w = y.target.value;
      u.value = w, n("update:modelValue", w);
      const _ = s?.fields?.[c.value]?.props;
      _?.onInput && _.onInput(y);
    }
    function h(y) {
      const w = s?.fields?.[c.value]?.props;
      w?.onChange && w.onChange(y);
    }
    function b(y) {
      const w = s?.fields?.[c.value]?.props;
      w?.onBlur && w.onBlur(y);
    }
    const v = $(() => {
      const { name: y, id: w, type: _, ...k } = o;
      return k;
    });
    return (y, w) => (g(), x("div", C5, [
      e.label ? (g(), x("label", {
        key: 0,
        for: r.value,
        class: Z(T(ct))
      }, A(e.label), 11, $5)) : F("", !0),
      d("div", S5, [
        e.icon ? (g(), ae(ft(e.icon), {
          key: 0,
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        })) : F("", !0),
        d("input", yt(v.value, {
          id: r.value,
          name: c.value,
          type: e.type,
          autocomplete: "off",
          class: [
            T(et),
            e.icon ? "pl-10" : "",
            m.value ? T(Dt) : ""
          ],
          placeholder: e.placeholder,
          disabled: e.disabled,
          value: f.value,
          "aria-invalid": m.value ? "true" : void 0,
          "aria-describedby": e.errorText ? l.value : void 0,
          onInput: p,
          onChange: h,
          onBlur: b
        }), null, 16, M5)
      ]),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: l.value,
        class: Z(T(At)),
        role: "alert"
      }, A(e.errorText), 11, D5)) : F("", !0)
    ]));
  }
}), A5 = { class: "font-sans" }, T5 = ["for"], B5 = { class: "relative" }, L5 = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], R5 = ["aria-label"], P5 = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, I5 = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, E5 = ["id"], F5 = /* @__PURE__ */ he({
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
    const a = e, n = t, o = Ja(), s = wi("$pcForm", null), i = `kiut-input-password-${We()}`, r = $(() => a.id ?? i), l = $(() => `${r.value}-err`), c = $(() => a.name ?? o.name ?? ""), u = ne(!1), f = ne(a.modelValue ?? "");
    Te(
      () => a.modelValue,
      (w) => {
        w !== void 0 && w !== f.value && (f.value = w);
      }
    ), Je(() => {
      s && c.value && s.register?.(c.value, {});
    }), rt(() => {
      s && c.value && s.deregister?.(c.value);
    });
    const m = $(() => s && c.value ? s.fields?.[c.value]?.states?.value ?? f.value : f.value), p = $(() => s && c.value ? s.fields?.[c.value]?.states?.invalid ?? a.invalid ?? !1 : a.invalid ?? !1);
    function h(w) {
      const _ = w.target.value;
      f.value = _, n("update:modelValue", _);
      const k = s?.fields?.[c.value]?.props;
      k?.onInput && k.onInput(w);
    }
    function b(w) {
      const _ = s?.fields?.[c.value]?.props;
      _?.onChange && _.onChange(w);
    }
    function v(w) {
      const _ = s?.fields?.[c.value]?.props;
      _?.onBlur && _.onBlur(w);
    }
    const y = $(() => {
      const { name: w, id: _, ...k } = o;
      return k;
    });
    return (w, _) => (g(), x("div", A5, [
      e.label ? (g(), x("label", {
        key: 0,
        for: r.value,
        class: Z(T(ct))
      }, A(e.label), 11, T5)) : F("", !0),
      d("div", B5, [
        d("input", yt(y.value, {
          id: r.value,
          name: c.value,
          type: u.value ? "text" : "password",
          autocomplete: "current-password",
          class: [T(et), p.value ? T(Dt) : "", "pr-10"],
          placeholder: e.placeholder,
          disabled: e.disabled,
          value: m.value,
          "aria-invalid": p.value ? "true" : void 0,
          "aria-describedby": e.errorText ? l.value : void 0,
          onInput: h,
          onChange: b,
          onBlur: v
        }), null, 16, L5),
        d("button", {
          type: "button",
          tabindex: "-1",
          onClick: _[0] || (_[0] = (k) => u.value = !u.value),
          class: "absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors",
          "aria-label": u.value ? "Hide password" : "Show password"
        }, [
          u.value ? (g(), x("svg", I5, [..._[2] || (_[2] = [
            d("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            }, null, -1)
          ])])) : (g(), x("svg", P5, [..._[1] || (_[1] = [
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
        ], 8, R5)
      ]),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: l.value,
        class: Z(T(At)),
        role: "alert"
      }, A(e.errorText), 11, E5)) : F("", !0)
    ]));
  }
}), O5 = { class: "font-sans" }, V5 = ["for"], z5 = ["id", "rows", "placeholder", "disabled", "aria-invalid", "aria-describedby"], N5 = ["id"], j5 = /* @__PURE__ */ he({
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
    const a = e, n = t, o = `kiut-input-textarea-${We()}`, s = $(() => a.id ?? o), i = $(() => `${s.value}-err`), r = $({
      get: () => a.modelValue,
      set: (l) => n("update:modelValue", l)
    });
    return (l, c) => (g(), x("div", O5, [
      e.label ? (g(), x("label", {
        key: 0,
        for: s.value,
        class: Z(T(ct))
      }, A(e.label), 11, V5)) : F("", !0),
      Xe(d("textarea", {
        id: s.value,
        "onUpdate:modelValue": c[0] || (c[0] = (u) => r.value = u),
        rows: e.rows,
        autocomplete: "off",
        class: Z([T(_b), e.invalid ? T(Dt) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, z5), [
        [Rt, r.value]
      ]),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: i.value,
        class: Z(T(At)),
        role: "alert"
      }, A(e.errorText), 11, N5)) : F("", !0)
    ]));
  }
}), H5 = { class: "font-sans" }, W5 = ["for"], K5 = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], U5 = ["for"], Y5 = ["title"], q5 = ["aria-label"], X5 = {
  key: 2,
  class: "space-y-3"
}, G5 = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], Z5 = ["for"], Q5 = { class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400" }, J5 = {
  key: 0,
  class: "shrink-0 text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, eC = {
  key: 0,
  class: "space-y-2",
  role: "list"
}, tC = { class: "flex items-start gap-2" }, aC = { class: "min-w-0 flex-1 space-y-2" }, nC = { class: "flex items-center gap-2" }, oC = ["title"], sC = { class: "shrink-0 text-xs text-[color:var(--kiut-text-muted)]" }, iC = ["aria-label", "onClick"], rC = ["id"], lC = /* @__PURE__ */ he({
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
    const a = e, n = t, o = `kiut-input-file-${We()}`, s = $(() => a.id ?? o), i = $(() => `${s.value}-err`), r = ne(null), l = $(
      () => a.multiple ? null : a.modelValue
    ), c = $(() => {
      if (!a.multiple) return [];
      const M = a.modelValue;
      return Array.isArray(M) ? M : [];
    }), u = $(
      () => l.value?.name ?? a.placeholder
    ), f = $(
      () => a.multiple && c.value.length >= a.maxFiles
    ), m = $(() => c.value.length === 0 ? a.placeholder : c.value.length === 1 ? c.value[0].file.name : `${c.value.length} archivos seleccionados`);
    function p(M) {
      return a.showDescriptions && a.submitted && a.requireDescriptions && M.description.trim() === "";
    }
    function h(M) {
      return M < 1024 ? `${M} B` : M < 1024 * 1024 ? `${(M / 1024).toFixed(1)} KB` : `${(M / (1024 * 1024)).toFixed(1)} MB`;
    }
    function b(M) {
      return {
        id: `file-${We()}`,
        file: M,
        description: ""
      };
    }
    function v(M, R) {
      return M.some(
        (V) => V.file.name === R.name && V.file.size === R.size && V.file.lastModified === R.lastModified
      );
    }
    function y() {
      r.value && (r.value.value = "");
    }
    function w(M) {
      const V = M.target.files?.[0] ?? null;
      n("update:modelValue", V);
    }
    function _(M) {
      const R = M.target, V = Array.from(R.files ?? []);
      if (V.length === 0) return;
      const W = [...c.value];
      for (const D of V) {
        if (W.length >= a.maxFiles) break;
        v(W, D) || W.push(b(D));
      }
      n("update:modelValue", W), y();
    }
    function k() {
      n("update:modelValue", null), y();
    }
    function C(M) {
      n(
        "update:modelValue",
        c.value.filter((R) => R.id !== M)
      );
    }
    function S(M, R) {
      n(
        "update:modelValue",
        c.value.map(
          (V) => V.id === M ? { ...V, description: R } : V
        )
      );
    }
    return (M, R) => (g(), x("div", H5, [
      e.label ? (g(), x("label", {
        key: 0,
        for: s.value,
        class: Z(T(ct))
      }, A(e.label), 11, W5)) : F("", !0),
      e.multiple ? (g(), x("div", X5, [
        d("div", {
          class: Z([
            T(et),
            "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
            e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
            e.invalid ? T(Dt) : "",
            e.disabled ? "pointer-events-none" : ""
          ])
        }, [
          d("input", {
            id: s.value,
            ref_key: "fileInputRef",
            ref: r,
            type: "file",
            multiple: "",
            class: "sr-only focus:outline-none focus:ring-0",
            name: e.name,
            accept: e.accept,
            disabled: e.disabled || f.value,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0,
            onChange: _
          }, null, 40, G5),
          d("label", {
            for: s.value,
            class: Z(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled || f.value ? "cursor-not-allowed opacity-50" : ""])
          }, [
            N(T(lo), {
              class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
              "aria-hidden": "true"
            }),
            Ae(" " + A(e.chooseLabel), 1)
          ], 10, Z5),
          d("span", Q5, A(m.value), 1),
          e.filesCountLabel ? (g(), x("span", J5, A(e.filesCountLabel), 1)) : F("", !0)
        ], 2),
        c.value.length > 0 ? (g(), x("ul", eC, [
          (g(!0), x(ue, null, pe(c.value, (V) => (g(), x("li", {
            key: V.id,
            class: "rounded-xl border border-[color:var(--kiut-border-light)] bg-[color:var(--bg-secondary,#f9fafb)] p-3 dark:bg-white/[0.03]"
          }, [
            d("div", tC, [
              N(T(np), {
                class: "mt-0.5 h-5 w-5 shrink-0 text-[color:var(--kiut-primary)]",
                "aria-hidden": "true"
              }),
              d("div", aC, [
                d("div", nC, [
                  d("span", {
                    class: "min-w-0 flex-1 truncate text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100",
                    title: V.file.name
                  }, A(V.file.name), 9, oC),
                  d("span", sC, A(h(V.file.size)), 1),
                  e.disabled ? F("", !0) : (g(), x("button", {
                    key: 0,
                    type: "button",
                    class: "inline-flex shrink-0 rounded-lg p-1 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
                    "aria-label": e.removeFileAriaLabel,
                    onClick: (W) => C(V.id)
                  }, [
                    N(T(co), {
                      class: "h-4 w-4",
                      "aria-hidden": "true"
                    })
                  ], 8, iC))
                ]),
                e.showDescriptions ? (g(), ae(Fr, {
                  key: 0,
                  "model-value": V.description,
                  label: e.descriptionLabel,
                  placeholder: e.descriptionPlaceholder,
                  disabled: e.disabled,
                  invalid: p(V),
                  "error-text": p(V) ? e.descriptionErrorText : "",
                  "onUpdate:modelValue": (W) => S(V.id, W)
                }, null, 8, ["model-value", "label", "placeholder", "disabled", "invalid", "error-text", "onUpdate:modelValue"])) : F("", !0)
              ])
            ])
          ]))), 128))
        ])) : F("", !0)
      ])) : (g(), x("div", {
        key: 1,
        class: Z([
          T(et),
          "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
          e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
          e.invalid ? T(Dt) : "",
          e.disabled ? "pointer-events-none" : ""
        ])
      }, [
        d("input", {
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
          onChange: w
        }, null, 40, K5),
        d("label", {
          for: s.value,
          class: Z(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled ? "cursor-not-allowed opacity-50" : ""])
        }, [
          N(T(lo), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          Ae(" " + A(e.chooseLabel), 1)
        ], 10, U5),
        d("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: u.value || void 0
        }, A(u.value), 9, Y5),
        l.value && !e.disabled ? (g(), x("button", {
          key: 0,
          type: "button",
          class: "inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
          "aria-label": e.clearAriaLabel,
          onClick: k
        }, [
          N(T(co), {
            class: "h-4 w-4",
            "aria-hidden": "true"
          })
        ], 8, q5)) : F("", !0)
      ], 2)),
      e.errorText ? (g(), x("p", {
        key: 3,
        id: i.value,
        class: Z(T(At)),
        role: "alert"
      }, A(e.errorText), 11, rC)) : F("", !0)
    ]));
  }
}), cC = ["for"], dC = { class: "flex w-full min-w-0 items-center gap-3" }, uC = ["for", "aria-label"], hC = ["src"], fC = ["id", "accept", "disabled"], gC = ["id", "value", "placeholder", "disabled"], mC = /* @__PURE__ */ he({
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
    const a = e, n = t, o = ne(!1), s = ne(null), i = `kiut-image-upload-circle-${We()}`, r = $(() => a.id ?? i), l = $(() => `${r.value}-url`), c = $(() => a.size === "sm" ? "h-10 w-10" : a.size === "lg" ? "h-16 w-16" : "h-12 w-12"), u = $(() => a.size === "sm" ? "h-4 w-4" : a.size === "lg" ? "h-6 w-6" : "h-5 w-5"), f = $(() => !a.disabled && !a.loading);
    Te(
      () => a.modelValue,
      () => {
        o.value = !1;
      }
    );
    function m(h) {
      const b = h.target, v = b.files?.[0];
      v && n("select", v), b.value = "";
    }
    function p(h) {
      n("update:modelValue", h.target.value);
    }
    return (h, b) => (g(), x("div", yt({ class: "font-sans flex w-full flex-col gap-2" }, h.$attrs), [
      e.label ? (g(), x("label", {
        key: 0,
        for: r.value,
        class: Z(T(ct))
      }, A(e.label), 11, cC)) : F("", !0),
      d("div", dC, [
        d("label", {
          for: r.value,
          class: Z(["relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-primary)] text-[color:var(--kiut-text-muted)] transition hover:border-[color:var(--kiut-primary)]/40", [
            c.value,
            f.value ? "cursor-pointer hover:bg-[color:var(--kiut-bg-secondary)]" : "cursor-not-allowed opacity-60"
          ]]),
          "aria-label": e.uploadAriaLabel
        }, [
          e.modelValue && !o.value && !e.loading ? (g(), x("img", {
            key: 0,
            src: e.modelValue,
            alt: "",
            class: "h-full w-full object-cover",
            onError: b[0] || (b[0] = (v) => o.value = !0)
          }, null, 40, hC)) : e.loading ? (g(), ae(T(ep), {
            key: 1,
            class: Z([u.value, "animate-spin text-[color:var(--kiut-primary)]"]),
            "aria-hidden": "true"
          }, null, 8, ["class"])) : (g(), ae(T(lo), {
            key: 2,
            class: Z([u.value, "text-[color:var(--kiut-primary)]"]),
            "aria-hidden": "true"
          }, null, 8, ["class"]))
        ], 10, uC),
        d("input", {
          id: r.value,
          ref_key: "fileInputRef",
          ref: s,
          type: "file",
          class: "sr-only focus:outline-none focus:ring-0",
          accept: e.accept,
          disabled: e.disabled || e.loading,
          onChange: m
        }, null, 40, fC),
        e.showUrlInput ? (g(), x("div", {
          key: 0,
          class: Z(["min-w-0 flex-1 basis-0", e.urlInputClass])
        }, [
          d("input", {
            id: l.value,
            type: "text",
            autocomplete: "off",
            value: e.modelValue,
            placeholder: e.urlPlaceholder,
            disabled: e.disabled,
            class: Z([T(et), "w-full min-w-0"]),
            onInput: p
          }, null, 42, gC)
        ], 2)) : F("", !0)
      ])
    ], 16));
  }
}), pC = {
  en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  es: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
}, bC = {
  en: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  es: ["lu", "ma", "mi", "ju", "vi", "sá", "do"]
}, vC = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/, yC = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
}, xC = {
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
}, kC = {
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
}, _C = [
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
function wC(e = "en") {
  return pC[e];
}
function CC(e = "en") {
  return bC[e];
}
function Or(e = "en") {
  return _C.map((t) => ({ id: t, label: kC[e][t] }));
}
function $C(e = "en") {
  return "Presets";
}
Or("es");
function at(e) {
  const [t, a, n] = e.split("-").map(Number);
  return new Date(t, a - 1, n);
}
function nt(e) {
  const t = e.getFullYear(), a = String(e.getMonth() + 1).padStart(2, "0"), n = String(e.getDate()).padStart(2, "0");
  return `${t}-${a}-${n}`;
}
function Ve(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function kt(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function Ma(e, t) {
  return new Date(e.getFullYear(), e.getMonth() + t, e.getDate());
}
function SC(e, t) {
  const a = new Date(e.getFullYear(), e.getMonth(), e.getDate() + t);
  return Ve(a);
}
function Ea(e, t) {
  return SC(e, -t);
}
function MC(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 0);
}
function Vr(e, t = /* @__PURE__ */ new Date()) {
  const a = Ve(t);
  switch (e) {
    case "today":
      return { start: a, end: a };
    case "yesterday": {
      const n = Ea(a, 1);
      return { start: n, end: n };
    }
    case "last7":
      return { start: Ea(a, 6), end: a };
    case "last14":
      return { start: Ea(a, 13), end: a };
    case "last30":
      return { start: Ea(a, 29), end: a };
    case "last90":
      return { start: Ea(a, 89), end: a };
    case "thisMonth":
      return { start: kt(a), end: a };
    case "lastMonth": {
      const n = kt(Ma(a, -1));
      return { start: n, end: MC(n) };
    }
    case "yearToDate":
      return { start: new Date(a.getFullYear(), 0, 1), end: a };
  }
}
function zr(e, t, a) {
  let n = Ve(e.start), o = Ve(e.end);
  if (t) {
    const s = Ve(at(t));
    jt(n, s) && (n = s), jt(o, s) && (o = s);
  }
  if (a) {
    const s = Ve(at(a));
    wn(n, s) && (n = s), wn(o, s) && (o = s);
  }
  return wn(n, o) ? { start: o, end: n } : { start: n, end: o };
}
function DC(e, t, a = /* @__PURE__ */ new Date(), n, o) {
  if (!e.start || !e.end) return !1;
  const s = zr(Vr(t, a), n, o);
  return nt(s.start) === e.start && nt(s.end) === e.end;
}
function tn(e, t) {
  const a = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()), n = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
  return a < n ? -1 : a > n ? 1 : 0;
}
function mt(e, t) {
  return tn(e, t) === 0;
}
function jt(e, t) {
  return tn(e, t) < 0;
}
function wn(e, t) {
  return tn(e, t) > 0;
}
function Nr(e, t) {
  return tn(e, t) >= 0;
}
function jr(e, t) {
  return tn(e, t) <= 0;
}
function Hr(e) {
  const t = e.getFullYear(), a = e.getMonth(), n = new Date(t, a, 1), o = new Date(n);
  o.setDate(n.getDate() - n.getDay());
  const s = [], i = new Date(o);
  for (let r = 0; r < 42; r++)
    s.push(new Date(i)), i.setDate(i.getDate() + 1);
  return s;
}
function AC(e) {
  const t = e.getFullYear(), a = e.getMonth(), n = new Date(t, a, 1), o = new Date(n);
  o.setDate(n.getDate() - (n.getDay() + 6) % 7);
  const s = [], i = new Date(o);
  for (let r = 0; r < 42; r++)
    s.push(new Date(i)), i.setDate(i.getDate() + 1);
  return s;
}
function ka(e) {
  if (!e?.trim()) return null;
  const t = vC.exec(e.trim());
  if (!t) return null;
  const a = Number(t[1]), n = Number(t[2]), o = Number(t[3]), s = Number(t[4]), i = Number(t[5]), r = new Date(a, n - 1, o, s, i);
  return Number.isNaN(r.getTime()) ? null : r;
}
function TC(e) {
  const t = e.getFullYear(), a = String(e.getMonth() + 1).padStart(2, "0"), n = String(e.getDate()).padStart(2, "0"), o = String(e.getHours()).padStart(2, "0"), s = String(e.getMinutes()).padStart(2, "0");
  return `${t}-${a}-${n}T${o}:${s}`;
}
function BC(e) {
  const t = ka(e);
  return t ? `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}` : "00:00";
}
function LC(e, t = "es") {
  const a = ka(e);
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
function vi(e, t) {
  return e.getTime() < t.getTime();
}
function yi(e, t) {
  return e.getTime() > t.getTime();
}
function Ln(e, t = "en") {
  return `${yC[t][e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function Nt(e, t = "en") {
  return `${xC[t][e.getMonth()]} ${e.getFullYear()}`;
}
const RC = ["name", "value"], PC = { class: "flex flex-row gap-3 items-center" }, IC = {
  key: 0,
  class: "mb-1.5 inline-flex shrink-0 text-[color:var(--kiut-text-muted)] [&>svg]:h-4 [&>svg]:w-4",
  "aria-hidden": "true"
}, EC = ["for"], FC = ["id", "disabled", "aria-expanded", "aria-labelledby", "aria-label", "aria-invalid", "aria-describedby"], OC = ["aria-label", "onKeydown"], VC = { class: "p-3" }, zC = { class: "mb-4 flex items-center justify-between gap-2" }, NC = ["aria-label"], jC = { class: "min-w-0 truncate px-1 text-sm font-medium text-[#61616b] dark:text-[#e3e3e8]" }, HC = ["aria-label"], WC = { class: "mb-2 grid grid-cols-7 text-center text-xs font-normal tracking-wide text-[#61616b] dark:text-[#e3e3e8]" }, KC = { class: "grid grid-cols-7 gap-y-2" }, UC = ["disabled", "onClick"], YC = { class: "border-t border-gray-200 px-3 py-3 dark:border-[color:var(--kiut-border-light)]" }, qC = { class: "relative" }, XC = ["value", "disabled", "min", "max", "step", "aria-label"], GC = /* @__PURE__ */ he({
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
    const a = e, n = t, o = `kiut-input-datetime-${We()}`, s = `${o}-label`, i = $(() => a.id ?? `${o}-btn`), r = `${o}-panel`, l = `${o}-err`, c = ne(null), u = ne(null), f = ne(null), m = ne(!1), p = ne(kt(/* @__PURE__ */ new Date())), h = ne(null), b = ne("00:00"), v = $(() => !!a.modelValue), y = $(() => CC(a.locale)), w = $(() => AC(p.value)), _ = $(() => a.placeholder), k = $(() => a.modelValue ? LC(a.modelValue, a.locale) : a.placeholder), C = $(() => {
      const K = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return a.panelAlign === "end" ? `right-0 left-auto ${K}` : `left-0 right-auto ${K}`;
    }), S = $(
      () => a.locale === "es" ? "Calendario de fecha y hora" : "Date and time calendar"
    ), M = $(
      () => a.locale === "es" ? "Mes anterior" : "Previous month"
    ), R = $(
      () => a.locale === "es" ? "Mes siguiente" : "Next month"
    ), V = $(
      () => a.locale === "es" ? "Hora" : "Time"
    ), W = $(() => ka(a.min)), D = $(() => ka(a.max)), I = $(() => {
      if (!(!h.value || !W.value) && mt(h.value, W.value))
        return `${String(W.value.getHours()).padStart(2, "0")}:${String(W.value.getMinutes()).padStart(2, "0")}`;
    }), B = $(() => {
      if (!(!h.value || !D.value) && mt(h.value, D.value))
        return `${String(D.value.getHours()).padStart(2, "0")}:${String(D.value.getMinutes()).padStart(2, "0")}`;
    });
    function j(K, ie) {
      return K.getMonth() === ie.getMonth() && K.getFullYear() === ie.getFullYear();
    }
    function H(K) {
      const ie = Ve(K);
      return !!(W.value && jt(ie, Ve(W.value)) || D.value && wn(ie, Ve(D.value)));
    }
    function Q(K) {
      const ie = j(K, p.value), de = H(K), ee = h.value ? mt(K, h.value) : !1;
      if (de)
        return "rounded-lg text-[#61616b] opacity-40";
      let X = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white";
      return ee && (X = "rounded-lg bg-[#895af6] font-semibold text-white"), ie || (X = `${X} opacity-30`), X;
    }
    function le() {
      const K = ka(a.modelValue);
      if (K) {
        h.value = Ve(K), b.value = BC(a.modelValue), p.value = kt(K);
        return;
      }
      h.value = null, b.value = "00:00", p.value = kt(/* @__PURE__ */ new Date());
    }
    function fe(K) {
      if (!h.value) return K;
      let ie = ka(
        `${nt(h.value)}T${K}`
      );
      return ie ? (W.value && mt(h.value, W.value) && vi(ie, W.value) && (ie = W.value), D.value && mt(h.value, D.value) && yi(ie, D.value) && (ie = D.value), `${String(ie.getHours()).padStart(2, "0")}:${String(ie.getMinutes()).padStart(2, "0")}`) : K;
    }
    function G() {
      if (!h.value) {
        n("update:modelValue", null);
        return;
      }
      const K = fe(b.value);
      b.value = K;
      const ie = new Date(
        h.value.getFullYear(),
        h.value.getMonth(),
        h.value.getDate(),
        Number(K.slice(0, 2)),
        Number(K.slice(3, 5))
      ), de = TC(ie);
      W.value && vi(ie, W.value) || D.value && yi(ie, D.value) || n("update:modelValue", de);
    }
    function oe(K) {
      H(K) || (h.value = Ve(K), b.value = fe(b.value), G());
    }
    function L(K) {
      const ie = K.target.value;
      ie && (b.value = ie, G());
    }
    function U(K) {
      p.value = Ma(p.value, K);
    }
    function Y() {
      m.value = !1;
    }
    function z() {
      a.disabled || (le(), m.value = !0, Ke(() => f.value?.focus()));
    }
    function re(K) {
      if (K.stopPropagation(), !a.disabled) {
        if (m.value) {
          Y();
          return;
        }
        z();
      }
    }
    function ce(K) {
      a.disabled || (K.key === "ArrowDown" || K.key === "Enter" || K.key === " ") && (K.preventDefault(), m.value || z());
    }
    function ve(K) {
      if (!m.value) return;
      const ie = c.value;
      ie && !ie.contains(K.target) && Y();
    }
    return Te(
      () => a.modelValue,
      () => {
        m.value || le();
      }
    ), Je(() => {
      le(), document.addEventListener("click", ve);
    }), rt(() => {
      document.removeEventListener("click", ve);
    }), (K, ie) => (g(), x("div", {
      ref_key: "rootRef",
      ref: c,
      class: "relative font-sans"
    }, [
      e.name ? (g(), x("input", {
        key: 0,
        type: "hidden",
        name: e.name,
        value: e.modelValue ?? ""
      }, null, 8, RC)) : F("", !0),
      d("div", PC, [
        K.$slots.icon ? (g(), x("span", IC, [
          ke(K.$slots, "icon")
        ])) : F("", !0),
        e.label ? (g(), x("label", {
          key: 1,
          id: s,
          for: i.value,
          class: Z(T(ct))
        }, A(e.label), 11, EC)) : F("", !0)
      ]),
      d("button", {
        id: i.value,
        ref_key: "buttonRef",
        ref: u,
        type: "button",
        disabled: e.disabled,
        class: Z([
          T(et),
          "flex w-full items-center gap-2 text-left",
          e.invalid ? T(Dt) : "",
          m.value && !e.invalid ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": m.value,
        "aria-haspopup": "dialog",
        "aria-controls": r,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : _.value,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? l : void 0,
        onClick: re,
        onKeydown: ce
      }, [
        N(T(Po), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        d("span", {
          class: Z([
            "min-w-0 flex-1 truncate",
            v.value ? "" : "text-[color:var(--kiut-text-muted)] dark:text-slate-500"
          ])
        }, A(k.value), 3)
      ], 42, FC),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: l,
        class: Z(T(At)),
        role: "alert"
      }, A(e.errorText), 3)) : F("", !0),
      Xe(d("div", {
        ref_key: "panelRef",
        ref: f,
        id: r,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": S.value,
        class: Z([
          C.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),20rem)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: Ca(Be(Y, ["stop"]), ["escape"])
      }, [
        d("div", VC, [
          d("div", zC, [
            d("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": M.value,
              onClick: ie[0] || (ie[0] = Be((de) => U(-1), ["stop"]))
            }, [
              N(T(Io), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ], 8, NC),
            d("span", jC, A(T(Nt)(p.value, e.locale)), 1),
            d("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": R.value,
              onClick: ie[1] || (ie[1] = Be((de) => U(1), ["stop"]))
            }, [
              N(T(Eo), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ], 8, HC)
          ]),
          d("div", WC, [
            (g(!0), x(ue, null, pe(y.value, (de) => (g(), x("span", { key: de }, A(de), 1))), 128))
          ]),
          d("div", KC, [
            (g(!0), x(ue, null, pe(w.value, (de) => (g(), x("button", {
              key: T(nt)(de),
              type: "button",
              disabled: H(de),
              class: Z(["relative mx-auto flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed", Q(de)]),
              onClick: Be((ee) => oe(de), ["stop"])
            }, A(de.getDate()), 11, UC))), 128))
          ])
        ]),
        d("div", YC, [
          d("div", qC, [
            N(T(xr), {
              class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
              "aria-hidden": "true"
            }),
            d("input", {
              value: b.value,
              type: "time",
              autocomplete: "off",
              class: Z([T(et), "min-h-0 py-2 pl-10 pr-3 text-sm"]),
              disabled: !h.value,
              min: I.value,
              max: B.value,
              step: e.step,
              "aria-label": V.value,
              onInput: L,
              onClick: ie[2] || (ie[2] = Be(() => {
              }, ["stop"]))
            }, null, 42, XC)
          ])
        ])
      ], 42, OC), [
        [Ht, m.value]
      ])
    ], 512));
  }
}), ZC = { class: "font-sans" }, QC = { class: "flex flex-row gap-3 items-center" }, JC = {
  key: 0,
  class: "mb-1.5 inline-flex shrink-0 text-[color:var(--kiut-text-muted)] [&>svg]:h-4 [&>svg]:w-4",
  "aria-hidden": "true"
}, e$ = ["for"], t$ = { class: "relative" }, a$ = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], n$ = ["id"], o$ = /* @__PURE__ */ he({
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
      const m = /^(\d{1,2}):(\d{2})(?::\d{2}(?:\.\d+)?)?$/.exec(f.trim());
      if (!m) return null;
      const p = Number(m[1]), h = Number(m[2]);
      return !Number.isInteger(p) || !Number.isInteger(h) || p < 0 || p > 23 || h < 0 || h > 59 ? null : `${String(p).padStart(2, "0")}:${String(h).padStart(2, "0")}`;
    }
    function n(f) {
      return f === "" ? null : a(f);
    }
    const o = e, s = t, i = `kiut-input-time-${We()}`, r = $(() => o.id ?? i), l = $(() => `${r.value}-err`), c = $(() => o.modelValue == null || o.modelValue === "" ? "" : a(o.modelValue) ?? "");
    function u(f) {
      const m = f.target.value;
      s("update:modelValue", n(m));
    }
    return (f, m) => (g(), x("div", ZC, [
      d("div", QC, [
        f.$slots.icon ? (g(), x("span", JC, [
          ke(f.$slots, "icon")
        ])) : F("", !0),
        e.label ? (g(), x("label", {
          key: 1,
          for: r.value,
          class: Z(T(ct))
        }, A(e.label), 11, e$)) : F("", !0)
      ]),
      d("div", t$, [
        N(T(xr), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        d("input", {
          id: r.value,
          value: c.value,
          type: "time",
          autocomplete: "off",
          class: Z([
            T(et),
            "pl-10",
            e.invalid ? T(Dt) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? l.value : void 0,
          onInput: u
        }, null, 42, a$)
      ]),
      e.errorText ? (g(), x("p", {
        key: 0,
        id: l.value,
        class: Z(T(At)),
        role: "alert"
      }, A(e.errorText), 11, n$)) : F("", !0)
    ]));
  }
}), s$ = { class: "font-sans" }, i$ = ["for"], r$ = {
  key: 0,
  class: "order-1 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, l$ = ["id", "value", "min", "max", "step", "disabled", "aria-orientation", "aria-invalid", "aria-describedby"], c$ = {
  key: 1,
  class: "text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, d$ = {
  key: 2,
  class: "grid w-full max-w-full grid-cols-[1fr_auto_1fr] items-start gap-x-3 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, u$ = { class: "min-w-0 text-left leading-snug" }, h$ = { class: "max-w-[min(100%,12rem)] shrink px-1 text-center leading-snug" }, f$ = { class: "min-w-0 text-right leading-snug" }, g$ = {
  key: 3,
  class: "order-3 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, m$ = {
  key: 4,
  class: "order-4 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, p$ = ["id"], b$ = /* @__PURE__ */ he({
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
    const a = e, n = t, o = `kiut-input-range-${We()}`, s = $(() => a.id ?? o), i = $(() => `${s.value}-err`), r = $(() => {
      const p = [];
      return a.errorText && p.push(i.value), p.length ? p.join(" ") : void 0;
    }), l = $(
      () => !!(a.caption && !a.captionMin && !a.captionMax)
    ), c = $(() => !!(a.captionMin || a.captionMax)), u = $(() => {
      const { min: p, max: h, modelValue: b } = a;
      if (h === p) return 0;
      const v = (b - p) / (h - p);
      return Math.min(100, Math.max(0, v * 100));
    }), f = $(() => ({
      "--kiut-range-fill": `${u.value}%`,
      "--kiut-range-length": a.trackLength
    }));
    function m(p) {
      const h = Number(p.target.value);
      n("update:modelValue", Number.isNaN(h) ? a.min : h);
    }
    return (p, h) => (g(), x("div", s$, [
      e.label ? (g(), x("label", {
        key: 0,
        for: s.value,
        class: Z(T(ct))
      }, A(e.label), 11, i$)) : F("", !0),
      d("div", {
        class: Z(["flex flex-col items-center gap-2", (e.orientation === "vertical", "w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (g(), x("p", r$, A(e.captionMax), 1)) : F("", !0),
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
            "aria-describedby": r.value,
            class: Z([
              "kiut-range-input block appearance-none bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              "dark:[--kiut-range-track:#282836] dark:[--kiut-range-thumb-bg:#282836] dark:[--kiut-range-thumb-shadow:none]",
              e.orientation === "vertical" ? "kiut-range-input--vertical" : "kiut-range-input--horizontal w-full"
            ]),
            onInput: m
          }, null, 42, l$)
        ], 6),
        e.orientation === "horizontal" && l.value ? (g(), x("p", c$, A(e.caption), 1)) : e.orientation === "horizontal" && c.value ? (g(), x("div", d$, [
          d("span", u$, A(e.captionMin), 1),
          d("span", h$, A(e.caption), 1),
          d("span", f$, A(e.captionMax), 1)
        ])) : F("", !0),
        e.orientation === "vertical" && e.captionMin ? (g(), x("p", g$, A(e.captionMin), 1)) : F("", !0),
        e.orientation === "vertical" && e.caption ? (g(), x("p", m$, A(e.caption), 1)) : F("", !0)
      ], 2),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: i.value,
        class: Z(T(At)),
        role: "alert"
      }, A(e.errorText), 11, p$)) : F("", !0)
    ]));
  }
}), v$ = /* @__PURE__ */ be(b$, [["__scopeId", "data-v-ce7263e4"]]), y$ = { class: "font-sans" }, x$ = ["for"], k$ = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], _$ = ["id"], w$ = /* @__PURE__ */ he({
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
    const a = e, n = t, o = `kiut-input-number-${We()}`, s = $(() => a.id ?? o), i = $(() => `${s.value}-err`), r = $(() => {
      switch (a.align) {
        case "start":
          return "text-start";
        case "end":
          return "text-end";
        default:
          return "text-center";
      }
    }), l = $(
      () => a.modelValue === null || a.modelValue === void 0 ? "" : String(a.modelValue)
    );
    function c(u) {
      const f = u.target.value;
      if (f === "") {
        n("update:modelValue", null);
        return;
      }
      const m = Number(f);
      n("update:modelValue", Number.isNaN(m) ? null : m);
    }
    return (u, f) => (g(), x("div", y$, [
      e.label ? (g(), x("label", {
        key: 0,
        for: s.value,
        class: Z(T(ct))
      }, A(e.label), 11, x$)) : F("", !0),
      d("input", {
        id: s.value,
        value: l.value,
        type: "number",
        onInput: c,
        class: Z([
          T(et),
          e.invalid ? T(Dt) : "",
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
      }, null, 42, k$),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: i.value,
        class: Z(T(At)),
        role: "alert"
      }, A(e.errorText), 11, _$)) : F("", !0)
    ]));
  }
}), C$ = { class: "font-sans" }, $$ = ["for"], S$ = ["id", "value", "disabled", "aria-invalid", "aria-describedby"], M$ = ["disabled"], D$ = ["id"], A$ = "#3b82f6", T$ = "#aabbcc", B$ = "flex min-h-[2.75rem] w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans shadow-sm outline-none transition focus-within:border-[color:var(--kiut-primary)] focus-within:ring-2 focus-within:ring-[color:var(--kiut-primary)]/25 focus-within:ring-offset-0 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]", L$ = /* @__PURE__ */ he({
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
    function a(h) {
      const b = h.trim(), v = /^#?([0-9a-fA-F]{6})$/.exec(b);
      if (v) return `#${v[1].toLowerCase()}`;
      const y = /^#?([0-9a-fA-F]{3})$/.exec(b);
      if (y) {
        const [w, _, k] = y[1].split("");
        return `#${w}${w}${_}${_}${k}${k}`.toLowerCase();
      }
      return null;
    }
    function n(h) {
      return a(h) ?? A$;
    }
    const o = e, s = t, i = `kiut-input-color-${We()}`, r = $(() => o.id ?? i), l = $(() => `${r.value}-err`), c = $(() => n(o.modelValue)), u = ne(c.value), f = ne(!1);
    Te(c, (h) => {
      f.value || (u.value = h);
    });
    function m(h) {
      const b = h.target, v = a(b.value);
      v && s("update:modelValue", v);
    }
    function p() {
      f.value = !1;
      const h = a(u.value);
      h ? (u.value = h, s("update:modelValue", h)) : u.value = c.value;
    }
    return Te(u, (h) => {
      if (!f.value) return;
      const b = a(h);
      b && s("update:modelValue", b);
    }), (h, b) => (g(), x("div", C$, [
      e.label ? (g(), x("label", {
        key: 0,
        for: r.value,
        class: Z(T(ct))
      }, A(e.label), 11, $$)) : F("", !0),
      d("div", {
        class: Z([
          B$,
          e.invalid ? T(Dt) : "",
          e.disabled ? "cursor-not-allowed opacity-50" : ""
        ])
      }, [
        d("input", {
          id: r.value,
          type: "color",
          value: c.value,
          disabled: e.disabled,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? l.value : void 0,
          class: "h-9 w-11 shrink-0 cursor-pointer rounded-lg border border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-0.5 shadow-inner outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/35 disabled:cursor-not-allowed dark:border-slate-600 dark:bg-slate-800/80",
          onInput: m
        }, null, 40, S$),
        e.showHexInput ? Xe((g(), x("input", {
          key: 0,
          "onUpdate:modelValue": b[0] || (b[0] = (v) => u.value = v),
          type: "text",
          disabled: e.disabled,
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": "Código hexadecimal del color",
          class: "min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none ring-0 placeholder:text-[color:var(--kiut-text-muted)] focus:ring-0 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500",
          placeholder: T$,
          onFocus: b[1] || (b[1] = (v) => f.value = !0),
          onBlur: p
        }, null, 40, M$)), [
          [Rt, u.value]
        ]) : F("", !0)
      ], 2),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: l.value,
        class: Z(T(At)),
        role: "alert"
      }, A(e.errorText), 11, D$)) : F("", !0)
    ]));
  }
}), Wr = {
  smileys: "Smileys",
  gestures: "Gestos",
  symbols: "Símbolos",
  travel: "Viajes",
  objects: "Objetos"
}, Kr = [
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
function R$(e, t) {
  return e.char.includes(t) ? !0 : e.terms?.some((a) => a.toLowerCase().includes(t)) ?? !1;
}
function P$(e, t, a) {
  const n = a.trim().toLowerCase();
  return n ? e.map((o) => {
    const s = t[o.id]?.toLowerCase().includes(n) || o.id.includes(n), i = o.emojis.filter(
      (r) => s || R$(r, n)
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
function H3(e) {
  const t = {
    ...Wr,
    ...e
  };
  return Kr.map((a) => ({
    id: a.id,
    label: t[a.id],
    emojis: a.emojis.map((n) => n.char)
  }));
}
function I$(e) {
  return e ? e.match(new RegExp("\\p{Extended_Pictographic}(\\u200d\\p{Extended_Pictographic})*", "gu")) ?? [] : [];
}
function E$(e, t) {
  return `${e}${t}`;
}
const F$ = ["disabled", "aria-expanded", "aria-label"], O$ = {
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, V$ = {
  key: 0,
  class: "truncate text-sm"
}, z$ = ["aria-label"], N$ = { class: "border-b border-gray-200/80 p-3 dark:border-white/10" }, j$ = ["disabled", "placeholder", "aria-label"], H$ = { class: "min-h-0 flex-1 space-y-4 overflow-y-auto p-3" }, W$ = { class: "mb-2 text-[11px] font-bold uppercase tracking-wide text-[color:var(--kiut-text-muted)] dark:text-slate-500" }, K$ = { class: "grid grid-cols-8 gap-0.5" }, U$ = ["disabled", "aria-label", "onClick"], Y$ = { class: "text-[1.35rem] leading-none" }, q$ = {
  key: 1,
  class: "py-8 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, X$ = {
  key: 0,
  class: "border-t border-gray-200/80 px-3 py-2.5 text-[11px] leading-relaxed text-[color:var(--kiut-text-muted)] dark:border-white/10 dark:text-slate-500"
}, G$ = /* @__PURE__ */ he({
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
    const a = e, n = t, o = `kiut-emoji-picker-${We()}`, s = `${o}-btn`, i = `${o}-panel`, r = ne(null), l = ne(null), c = ne(null), u = ne(null), f = ne(!1), m = ne(""), p = ne({}), h = $(
      () => a.ariaLabelTrigger ?? a.triggerLabel ?? a.ariaLabel
    ), b = $(() => ({
      ...Wr,
      ...a.categoryLabels
    })), v = $(() => new Set(I$(a.draft))), y = $(() => {
      if (a.categories?.length) {
        const B = m.value.trim().toLowerCase();
        return B ? a.categories.map((j) => ({
          ...j,
          emojis: j.emojis.filter((H) => H.includes(B) || j.label.toLowerCase().includes(B) ? !0 : j.id.toLowerCase().includes(B))
        })).filter((j) => j.emojis.length > 0) : a.categories;
      }
      return P$(
        Kr,
        b.value,
        m.value
      );
    });
    function w() {
      const B = l.value;
      if (!B) return;
      const j = B.getBoundingClientRect(), H = 320, Q = 8, le = 8;
      let fe = j.right - H;
      fe < le && (fe = j.left), fe + H > window.innerWidth - le && (fe = Math.max(le, window.innerWidth - H - le));
      const G = Math.max(160, j.top - Q - le);
      p.value = {
        bottom: `${window.innerHeight - j.top + Q}px`,
        left: `${fe}px`,
        width: `${H}px`,
        maxHeight: `${G}px`
      };
    }
    function _(B) {
      const j = "flex h-9 w-9 items-center justify-center rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-white/5";
      return v.value.has(B) ? `${j} bg-[color:var(--kiut-primary)]/15 ring-2 ring-[color:var(--kiut-primary)]/70 dark:bg-[color:var(--kiut-primary)]/25` : j;
    }
    function k(B) {
      if (a.disabled) return;
      const j = E$(a.draft ?? "", B);
      n("update:draft", j), n("select", B);
    }
    function C() {
      m.value = "", n("open"), Ke(() => {
        w(), u.value?.focus();
      });
    }
    function S() {
      f.value && (f.value = !1, m.value = "", n("close"), l.value?.focus());
    }
    function M() {
      if (!a.disabled) {
        if (f.value) {
          S();
          return;
        }
        f.value = !0, C();
      }
    }
    function R(B) {
      B.stopPropagation(), M();
    }
    function V(B) {
      if (!f.value) return;
      const j = B.target, H = r.value, Q = c.value;
      H && !H.contains(j) && (!Q || !Q.contains(j)) && S();
    }
    function W(B) {
      a.disabled || ((B.key === "ArrowDown" || B.key === "Enter" || B.key === " ") && (B.preventDefault(), f.value || (f.value = !0, C())), B.key === "Escape" && f.value && (B.preventDefault(), S()));
    }
    function D(B) {
      B.key === "Escape" && (B.preventDefault(), S());
    }
    function I() {
      f.value && w();
    }
    return Je(() => {
      document.addEventListener("click", V), window.addEventListener("resize", I), window.addEventListener("scroll", I, !0);
    }), rt(() => {
      document.removeEventListener("click", V), window.removeEventListener("resize", I), window.removeEventListener("scroll", I, !0);
    }), (B, j) => (g(), x("div", {
      ref_key: "rootRef",
      ref: r,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      d("button", {
        ref_key: "buttonRef",
        ref: l,
        id: s,
        type: "button",
        disabled: e.disabled,
        class: Z([
          T(et),
          "inline-flex min-h-[2.75rem] w-auto items-center justify-center gap-2 px-3 py-2",
          e.triggerLabel ? "min-w-[9rem]" : "min-w-[2.75rem]",
          f.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": f.value,
        "aria-haspopup": "dialog",
        "aria-controls": i,
        "aria-label": h.value,
        onClick: R,
        onKeydown: W
      }, [
        d("span", O$, [
          ke(B.$slots, "icon", {}, () => [
            N(T(op), { class: "h-5 w-5" })
          ])
        ]),
        e.triggerLabel ? (g(), x("span", V$, A(e.triggerLabel), 1)) : F("", !0),
        e.triggerLabel ? (g(), ae(T(ta), {
          key: 1,
          class: Z(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", f.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])) : F("", !0)
      ], 42, F$),
      (g(), ae(Qt, { to: "body" }, [
        Xe(d("div", {
          ref_key: "panelRef",
          ref: c,
          id: i,
          role: "dialog",
          "aria-label": e.ariaLabel,
          style: Ce(p.value),
          class: "fixed z-[300] flex w-[20rem] flex-col overflow-hidden rounded-xl border border-gray-300/80 bg-white shadow-lg dark:border-[color:var(--kiut-border-light)] dark:bg-[#141416]",
          onClick: j[2] || (j[2] = Be(() => {
          }, ["stop"])),
          onKeydown: Be(D, ["stop"])
        }, [
          d("div", N$, [
            Xe(d("input", {
              ref_key: "searchInputRef",
              ref: u,
              "onUpdate:modelValue": j[0] || (j[0] = (H) => m.value = H),
              type: "search",
              disabled: e.disabled,
              placeholder: e.searchPlaceholder,
              "aria-label": e.searchPlaceholder,
              autocomplete: "off",
              spellcheck: "false",
              class: "min-h-[2.5rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 disabled:cursor-not-allowed dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500",
              onClick: j[1] || (j[1] = Be(() => {
              }, ["stop"]))
            }, null, 8, j$), [
              [Rt, m.value]
            ])
          ]),
          d("div", H$, [
            y.value.length > 0 ? (g(!0), x(ue, { key: 0 }, pe(y.value, (H) => (g(), x("section", {
              key: H.id
            }, [
              d("h3", W$, A(H.label), 1),
              d("div", K$, [
                (g(!0), x(ue, null, pe(H.emojis, (Q) => (g(), x("button", {
                  key: `${H.id}-${Q}`,
                  type: "button",
                  disabled: e.disabled,
                  "aria-label": `Add ${Q} to input`,
                  class: Z(_(Q)),
                  onClick: Be((le) => k(Q), ["stop"])
                }, [
                  d("span", Y$, A(Q), 1)
                ], 10, U$))), 128))
              ])
            ]))), 128)) : (g(), x("p", q$, A(e.emptySearchText), 1))
          ]),
          e.hint ? (g(), x("p", X$, A(e.hint), 1)) : F("", !0)
        ], 44, z$), [
          [Ht, f.value]
        ])
      ]))
    ], 512));
  }
}), Z$ = /* @__PURE__ */ he({
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
    return (i, r) => (g(), ae(na, {
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
}), Q$ = { class: "border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-3 dark:border-[color:var(--kiut-border-light)]" }, J$ = { class: "relative" }, e4 = {
  class: "pointer-events-none absolute inset-y-0 left-0 flex w-9 items-center justify-center",
  "aria-hidden": "true"
}, t4 = ["placeholder", "aria-label", "disabled"], a4 = {
  key: 0,
  class: "px-3 pb-1 pt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, n4 = ["aria-label"], o4 = {
  key: 0,
  class: "px-3 py-6 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, s4 = ["aria-selected", "onClick", "onMouseenter"], i4 = { class: "min-w-0 flex-1 truncate" }, r4 = /* @__PURE__ */ he({
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
    const n = e, o = a, i = `${`kiut-language-picker-${We()}`}-listbox`, r = ne(null), l = ne(null), c = ne(""), u = ne(0), f = $(() => n.options.filter((k) => !k.disabled)), m = $(() => {
      const k = c.value.trim().toLowerCase();
      return k ? f.value.filter((C) => C.label.toLowerCase().includes(k)) : f.value;
    });
    function p(k) {
      return `${k.value}-${k.label}`;
    }
    function h(k) {
      return n.modelValue === k.value;
    }
    function b(k, C) {
      const S = h(k), M = u.value === C;
      return [
        "flex cursor-pointer items-center gap-2.5 border-b border-gray-200 px-3 py-2.5 text-sm transition-colors last:border-b-0 dark:border-white/5",
        S ? "bg-[color:var(--kiut-primary)]/10 font-medium text-[color:var(--kiut-text-primary)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-slate-100" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !S && M ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function v() {
      u.value = Math.max(
        0,
        m.value.findIndex((k) => k.value === n.modelValue)
      );
    }
    function y(k) {
      k.disabled || o("update:modelValue", k.value);
    }
    function w(k) {
      const C = m.value;
      if (k.key === "ArrowDown") {
        if (k.preventDefault(), C.length === 0) return;
        u.value = 0, l.value?.focus();
        return;
      }
      if (k.key === "ArrowUp") {
        if (k.preventDefault(), C.length === 0) return;
        u.value = C.length - 1, l.value?.focus();
        return;
      }
      if (k.key === "Enter") {
        k.preventDefault();
        const S = C[u.value];
        S && y(S);
      }
    }
    function _(k) {
      const C = m.value;
      if (C.length !== 0) {
        if (k.key === "ArrowDown") {
          k.preventDefault(), u.value = Math.min(u.value + 1, C.length - 1);
          return;
        }
        if (k.key === "ArrowUp") {
          if (k.preventDefault(), u.value === 0) {
            r.value?.focus();
            return;
          }
          u.value = Math.max(u.value - 1, 0);
          return;
        }
        if (k.key === "Enter") {
          k.preventDefault();
          const S = C[u.value];
          S && y(S);
        }
      }
    }
    return Te(c, () => {
      u.value = 0;
    }), Te(
      () => n.modelValue,
      () => {
        v();
      },
      { immediate: !0 }
    ), t({
      focusSearch: () => r.value?.focus()
    }), (k, C) => (g(), x("div", {
      class: Z(["overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] font-sans shadow-sm dark:border-[color:var(--kiut-border-light)]", e.disabled ? "pointer-events-none opacity-50" : ""])
    }, [
      d("div", Q$, [
        d("div", J$, [
          d("span", e4, [
            N(T(Fo), { class: "h-4 w-4 text-[color:var(--kiut-text-muted)] dark:text-slate-500" })
          ]),
          Xe(d("input", {
            ref_key: "searchInputRef",
            ref: r,
            "onUpdate:modelValue": C[0] || (C[0] = (S) => c.value = S),
            type: "search",
            class: Z([T(et), "min-h-0 py-2 pl-9 pr-3 text-sm"]),
            placeholder: e.searchPlaceholder,
            "aria-label": e.searchPlaceholder,
            disabled: e.disabled,
            onKeydown: w
          }, null, 42, t4), [
            [Rt, c.value]
          ])
        ])
      ]),
      e.listSectionLabel ? (g(), x("p", a4, A(e.listSectionLabel), 1)) : F("", !0),
      d("ul", {
        id: i,
        ref_key: "listRef",
        ref: l,
        role: "listbox",
        tabindex: "0",
        "aria-label": e.listSectionLabel || e.searchPlaceholder,
        class: Z([e.listMaxHeightClass, "overflow-auto pb-1 outline-none"]),
        onKeydown: _
      }, [
        m.value.length === 0 ? (g(), x("li", o4, A(e.noResultsText), 1)) : F("", !0),
        (g(!0), x(ue, null, pe(m.value, (S, M) => (g(), x("li", {
          key: p(S),
          role: "option",
          "aria-selected": h(S),
          class: Z(b(S, M)),
          onClick: (R) => y(S),
          onMouseenter: (R) => u.value = M
        }, [
          S.flagClass ? (g(), x("span", {
            key: 0,
            class: Z([S.flagClass, "shrink-0"]),
            "aria-hidden": "true"
          }, null, 2)) : F("", !0),
          d("span", i4, A(S.label), 1)
        ], 42, s4))), 128))
      ], 42, n4)
    ], 2));
  }
}), l4 = { class: "flex flex-row gap-3 items-center" }, c4 = {
  key: 0,
  class: "mb-1.5 inline-flex shrink-0 text-[color:var(--kiut-text-muted)] [&>svg]:h-4 [&>svg]:w-4",
  "aria-hidden": "true"
}, d4 = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], u4 = { class: "min-h-[1.25rem] min-w-0 flex-1 max-h-32 overflow-y-auto py-0.5" }, h4 = {
  key: 0,
  class: "block truncate text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, f4 = {
  key: 1,
  class: "flex flex-wrap gap-1"
}, g4 = { class: "truncate" }, m4 = { class: "absolute left-0 right-0 z-50 mt-[-3px] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-lg dark:border-[color:var(--kiut-border-light)]" }, p4 = {
  key: 0,
  class: "border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-3 dark:border-[color:var(--kiut-border-light)]"
}, b4 = { class: "relative" }, v4 = {
  class: "pointer-events-none absolute inset-y-0 left-0 flex w-9 items-center justify-center",
  "aria-hidden": "true"
}, y4 = ["placeholder", "aria-label"], x4 = ["aria-checked", "disabled"], k4 = {
  key: 0,
  class: "px-3 py-2 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, _4 = ["aria-selected", "onClick", "onMouseenter"], w4 = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, C4 = { class: "min-w-0 flex-1" }, $4 = /* @__PURE__ */ he({
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
    const a = e, n = t, o = `kiut-multiselect-${We()}`, s = `${o}-label`, i = `${o}-btn`, r = `${o}-listbox`, l = ne(null), c = ne(null), u = ne(null), f = ne(null), m = ne(!1), p = ne(0), h = ne(""), b = $(() => a.options.filter((z) => !z.disabled)), v = $(() => {
      if (!a.searchable) return b.value;
      const z = h.value.trim().toLowerCase();
      return z ? b.value.filter(
        (re) => re.label.toLowerCase().includes(z)
      ) : b.value;
    }), y = $(() => new Set(a.modelValue ?? [])), w = $(
      () => b.value.filter((z) => y.value.has(z.value)).length
    ), _ = $(
      () => b.value.length > 0 && w.value === b.value.length
    ), k = $(
      () => w.value > 0 && !_.value
    ), C = $(
      () => k.value ? "mixed" : _.value
    ), S = $(
      () => a.options.filter((z) => y.value.has(z.value))
    ), M = $(() => {
      const z = a.ariaLabelTrigger ?? a.placeholder ?? "Seleccionar opciones", re = S.value.length;
      return re === 0 ? z : `${z}, ${re} seleccionada${re === 1 ? "" : "s"}`;
    });
    function R(z) {
      return `${String(z.value)}-${z.label}`;
    }
    function V(z) {
      return y.value.has(z.value);
    }
    function W(z, re) {
      const ce = V(z), ve = p.value === re;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        ce ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !ce && ve ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function D(z) {
      const re = [...a.modelValue ?? []], ce = re.indexOf(z.value);
      ce >= 0 ? re.splice(ce, 1) : re.push(z.value), n("update:modelValue", re);
    }
    function I() {
      const z = new Set(b.value.map((ce) => ce.value)), re = (a.modelValue ?? []).filter(
        (ce) => !z.has(ce)
      );
      n(
        "update:modelValue",
        _.value ? re : [...re, ...b.value.map((ce) => ce.value)]
      );
    }
    function B() {
      const z = v.value;
      if (z.length === 0) {
        p.value = 0;
        return;
      }
      const re = y.value, ce = z.findIndex((ve) => re.has(ve.value));
      p.value = ce >= 0 ? ce : 0;
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
    function H() {
      h.value = "", B(), Ke(() => j());
    }
    function Q() {
      m.value = !1, h.value = "";
    }
    function le() {
      if (!a.disabled) {
        if (m.value) {
          Q();
          return;
        }
        m.value = !0, H();
      }
    }
    function fe(z) {
      z.stopPropagation(), !a.disabled && le();
    }
    function G(z) {
      if (!m.value) return;
      const re = l.value;
      re && !re.contains(z.target) && Q();
    }
    function oe(z) {
      a.disabled || (z.key === "ArrowDown" || z.key === "Enter" || z.key === " ") && (z.preventDefault(), m.value || (m.value = !0, H()));
    }
    function L(z) {
      const re = v.value;
      if (z.key === "Escape") {
        z.preventDefault(), Q();
        return;
      }
      if (z.key === "ArrowDown") {
        if (z.preventDefault(), a.showSelectAll) {
          f.value?.focus();
          return;
        }
        if (re.length === 0) return;
        p.value = 0, c.value?.focus();
        return;
      }
      if (z.key === "ArrowUp") {
        if (z.preventDefault(), re.length === 0) return;
        p.value = re.length - 1, c.value?.focus();
        return;
      }
      if (z.key === "Enter") {
        z.preventDefault();
        const ce = re[p.value];
        ce && D(ce);
      }
    }
    function U(z) {
      if (z.key === "Escape") {
        z.preventDefault(), Q();
        return;
      }
      if (z.key === "ArrowDown" && v.value.length > 0) {
        z.preventDefault(), p.value = 0, c.value?.focus();
        return;
      }
      z.key === "ArrowUp" && a.searchable && (z.preventDefault(), u.value?.focus());
    }
    function Y(z) {
      const re = v.value;
      if (z.key === "Escape") {
        z.preventDefault(), Q();
        return;
      }
      if (re.length !== 0) {
        if (z.key === "ArrowDown") {
          z.preventDefault(), p.value = Math.min(p.value + 1, re.length - 1);
          return;
        }
        if (z.key === "ArrowUp") {
          if (z.preventDefault(), p.value === 0 && a.showSelectAll) {
            f.value?.focus();
            return;
          }
          if (p.value === 0 && a.searchable) {
            u.value?.focus();
            return;
          }
          p.value = Math.max(p.value - 1, 0);
          return;
        }
        if (z.key === "Enter" || z.key === " ") {
          z.preventDefault();
          const ce = re[p.value];
          ce && D(ce);
        }
      }
    }
    return Te(h, () => {
      p.value = 0;
    }), Je(() => {
      document.addEventListener("click", G);
    }), rt(() => {
      document.removeEventListener("click", G);
    }), (z, re) => (g(), x("div", {
      ref_key: "rootRef",
      ref: l,
      class: "relative font-sans"
    }, [
      d("div", l4, [
        z.$slots.icon ? (g(), x("span", c4, [
          ke(z.$slots, "icon")
        ])) : F("", !0),
        e.label ? (g(), x("label", {
          key: 1,
          id: s,
          class: Z(T(ct))
        }, A(e.label), 3)) : F("", !0)
      ]),
      d("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: Z([
          T(et),
          "flex items-start justify-between gap-2 text-left",
          m.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": m.value,
        "aria-haspopup": "listbox",
        "aria-controls": r,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : M.value,
        onClick: fe,
        onKeydown: oe
      }, [
        d("div", u4, [
          S.value.length === 0 ? (g(), x("span", h4, A(e.placeholder), 1)) : (g(), x("div", f4, [
            (g(!0), x(ue, null, pe(S.value, (ce) => (g(), x("span", {
              key: R(ce),
              class: "inline-flex max-w-full items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[color:var(--kiut-text-primary)] dark:bg-white/10 dark:text-slate-100"
            }, [
              d("span", g4, A(ce.label), 1)
            ]))), 128))
          ]))
        ]),
        N(T(ta), {
          class: Z(["mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", m.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, d4),
      Xe(d("div", m4, [
        e.searchable ? (g(), x("div", p4, [
          d("div", b4, [
            d("span", v4, [
              N(T(Fo), { class: "h-4 w-4 text-[color:var(--kiut-text-muted)] dark:text-slate-500" })
            ]),
            Xe(d("input", {
              ref_key: "searchInputRef",
              ref: u,
              "onUpdate:modelValue": re[0] || (re[0] = (ce) => h.value = ce),
              type: "search",
              class: Z([T(et), "min-h-0 py-2 pl-9 pr-3 text-sm"]),
              placeholder: e.searchPlaceholder,
              "aria-label": e.searchPlaceholder,
              onClick: re[1] || (re[1] = Be(() => {
              }, ["stop"])),
              onKeydown: Be(L, ["stop"])
            }, null, 42, y4), [
              [Rt, h.value]
            ])
          ])
        ])) : F("", !0),
        e.showSelectAll ? (g(), x("button", {
          key: 1,
          ref_key: "selectAllRef",
          ref: f,
          type: "button",
          role: "checkbox",
          "aria-checked": C.value,
          disabled: b.value.length === 0,
          class: "flex w-full items-center gap-2 border-b border-gray-200 px-3 py-2 text-left text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none transition-colors hover:bg-slate-100 focus-visible:bg-slate-100 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[color:var(--kiut-primary)] disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:text-slate-100 dark:hover:bg-white/5 dark:focus-visible:bg-white/5",
          onClick: Be(I, ["stop"]),
          onKeydown: U
        }, [
          d("span", {
            class: Z([
              "flex h-4 w-4 shrink-0 items-center justify-center rounded border border-gray-400 transition-colors dark:border-slate-500",
              _.value || k.value ? "border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)] text-white dark:border-[color:var(--kiut-primary)]" : ""
            ]),
            "aria-hidden": "true"
          }, [
            k.value ? (g(), ae(T(kb), {
              key: 0,
              class: "h-3 w-3"
            })) : _.value ? (g(), ae(T(Bn), {
              key: 1,
              class: "h-3 w-3"
            })) : F("", !0)
          ], 2),
          d("span", null, A(e.selectAllLabel), 1)
        ], 40, x4)) : F("", !0),
        d("ul", {
          id: r,
          ref_key: "listRef",
          ref: c,
          role: "listbox",
          tabindex: "-1",
          "aria-multiselectable": "true",
          class: "max-h-60 overflow-auto py-1",
          onKeydown: Be(Y, ["stop"])
        }, [
          v.value.length === 0 ? (g(), x("li", k4, A(e.noResultsText), 1)) : F("", !0),
          (g(!0), x(ue, null, pe(v.value, (ce, ve) => (g(), x("li", {
            key: R(ce),
            role: "option",
            "aria-selected": V(ce),
            class: Z(W(ce, ve)),
            onClick: Be((K) => D(ce), ["stop"]),
            onMouseenter: (K) => p.value = ve
          }, [
            d("span", w4, [
              V(ce) ? (g(), ae(T(Bn), {
                key: 0,
                class: "h-4 w-4 text-white"
              })) : F("", !0)
            ]),
            d("span", C4, A(ce.label), 1)
          ], 42, _4))), 128))
        ], 544)
      ], 512), [
        [Ht, m.value]
      ])
    ], 512));
  }
}), S4 = { class: "font-sans" }, M4 = ["for"], D4 = { class: "flex gap-2" }, A4 = { class: "w-[7.5rem] shrink-0" }, T4 = { class: "min-w-0 flex-1" }, B4 = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], L4 = ["id"], R4 = /* @__PURE__ */ he({
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
    const a = e, n = t, o = `kiut-phone-${We()}`, s = $(() => a.id ?? `${o}-num`), i = $(() => `${s.value}-err`), r = $({
      get: () => a.modelValue.prefix,
      set: (c) => n("update:modelValue", { ...a.modelValue, prefix: c })
    }), l = $({
      get: () => a.modelValue.number,
      set: (c) => n("update:modelValue", { ...a.modelValue, number: c })
    });
    return (c, u) => (g(), x("div", S4, [
      e.label ? (g(), x("label", {
        key: 0,
        for: s.value,
        class: Z(T(ct))
      }, A(e.label), 11, M4)) : F("", !0),
      d("div", D4, [
        d("div", A4, [
          N(na, {
            modelValue: r.value,
            "onUpdate:modelValue": u[0] || (u[0] = (f) => r.value = f),
            "aria-label-trigger": "Prefijo telefónico",
            options: e.prefixOptions,
            placeholder: e.prefixPlaceholder,
            disabled: e.disabled,
            "show-option-check": !1
          }, null, 8, ["modelValue", "options", "placeholder", "disabled"])
        ]),
        d("div", T4, [
          Xe(d("input", {
            id: s.value,
            "onUpdate:modelValue": u[1] || (u[1] = (f) => l.value = f),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: Z([T(et), e.invalid ? T(Dt) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, B4), [
            [Rt, l.value]
          ])
        ])
      ]),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: i.value,
        class: Z(T(At)),
        role: "alert"
      }, A(e.errorText), 11, L4)) : F("", !0)
    ]));
  }
}), P4 = ["role", "aria-label"], I4 = { class: "flex flex-wrap gap-2" }, E4 = ["aria-checked", "role", "onClick"], F4 = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, O4 = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, V4 = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, z4 = /* @__PURE__ */ he({
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
        const c = Array.isArray(a.modelValue) ? [...a.modelValue] : [], u = c.indexOf(l.value);
        u >= 0 ? c.splice(u, 1) : c.push(l.value), n("update:modelValue", c);
        return;
      }
      n("update:modelValue", l.value);
    }
    return (l, c) => (g(), x("div", {
      class: "font-sans",
      role: e.multiple ? "group" : "radiogroup",
      "aria-label": e.ariaLabel
    }, [
      d("div", I4, [
        (g(!0), x(ue, null, pe(e.items, (u) => (g(), x("button", {
          key: u.value,
          type: "button",
          class: Z(i(u)),
          "aria-checked": s(u),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (f) => r(u)
        }, [
          d("span", F4, [
            s(u) ? (g(), x("span", O4)) : F("", !0)
          ]),
          u.dotColor ? (g(), x("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: Ce({ backgroundColor: u.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : F("", !0),
          d("span", V4, A(u.label), 1)
        ], 10, E4))), 128))
      ])
    ], 8, P4));
  }
}), N4 = ["aria-label"], j4 = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], H4 = { class: "truncate px-3 py-2 text-sm font-medium" }, W4 = /* @__PURE__ */ he({
  name: "SegmentedControl",
  __name: "SegmentedControl",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Segmented control" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = `kiut-seg-${We()}`, s = (b) => `${o}-seg-${b}`, i = ne([]);
    function r(b, v) {
      b instanceof HTMLButtonElement ? i.value[v] = b : i.value[v] = null;
    }
    function l(b) {
      return b.value === a.modelValue;
    }
    function c(b) {
      const v = l(b), y = "flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]";
      return b.disabled ? `${y} cursor-not-allowed opacity-40` : v ? `${y} bg-[color:var(--kiut-primary)] text-white shadow-sm` : `${y} text-[color:var(--kiut-text-primary)] hover:bg-black/[0.03] dark:text-slate-100 dark:hover:bg-white/[0.06]`;
    }
    function u(b) {
      b.disabled || b.value !== a.modelValue && n("update:modelValue", b.value);
    }
    function f(b, v, y) {
      u(b), Ke(() => i.value[v]?.focus());
    }
    const m = $(
      () => a.items.map((b, v) => b.disabled ? -1 : v).filter((b) => b >= 0)
    );
    function p(b, v) {
      const y = a.items.length;
      if (y === 0) return 0;
      let w = b;
      for (let _ = 0; _ < y; _++)
        if (w = (w + v + y) % y, !a.items[w]?.disabled) return w;
      return b;
    }
    function h(b, v) {
      if (b.key === "ArrowRight" || b.key === "ArrowDown") {
        b.preventDefault();
        const y = p(v, 1), w = a.items[y];
        w && u(w), Ke(() => i.value[y]?.focus());
      } else if (b.key === "ArrowLeft" || b.key === "ArrowUp") {
        b.preventDefault();
        const y = p(v, -1), w = a.items[y];
        w && u(w), Ke(() => i.value[y]?.focus());
      } else if (b.key === "Home") {
        b.preventDefault();
        const y = m.value[0];
        if (y !== void 0) {
          const w = a.items[y];
          w && u(w), Ke(() => i.value[y]?.focus());
        }
      } else if (b.key === "End") {
        b.preventDefault();
        const y = m.value[m.value.length - 1];
        if (y !== void 0) {
          const w = a.items[y];
          w && u(w), Ke(() => i.value[y]?.focus());
        }
      }
    }
    return (b, v) => (g(), x("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-[color:var(--kiut-border-light)]"
    }, [
      (g(!0), x(ue, null, pe(e.items, (y, w) => (g(), x("button", {
        id: s(y.value),
        key: y.value,
        ref_for: !0,
        ref: (_) => r(_, w),
        type: "button",
        role: "tab",
        "aria-selected": l(y),
        "aria-disabled": y.disabled === !0,
        tabindex: l(y) ? 0 : -1,
        class: Z(c(y)),
        onClick: (_) => f(y, w),
        onKeydown: (_) => h(_, w)
      }, [
        d("span", H4, A(y.label), 1)
      ], 42, j4))), 128))
    ], 8, N4));
  }
}), K4 = ["aria-expanded", "aria-labelledby", "aria-label"], U4 = ["onKeydown"], Y4 = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, q4 = { class: "mb-4 flex items-center justify-between gap-2" }, X4 = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, G4 = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, Z4 = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, Q4 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, J4 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, eS = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, tS = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, aS = { class: "grid grid-cols-7 gap-y-2 mt-2" }, nS = ["disabled", "onClick"], oS = "rounded-lg text-[#61616b]", sS = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", iS = "opacity-30", rS = "bg-[#6b35e9] font-medium text-white", lS = "bg-[#895af6] font-semibold text-white", cS = /* @__PURE__ */ he({
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
    const a = e, n = t, s = `${`kiut-drp-${We()}`}-lbl`, i = ne(null), r = ne(null), l = ne(!1), c = ne(null), u = ne(kt(/* @__PURE__ */ new Date())), f = $(() => !!(a.modelValue.start && a.modelValue.end)), m = $(() => {
      const D = kt(u.value);
      return [D, Ma(D, 1)];
    }), p = $(() => a.ariaLabel ?? a.placeholder), h = $(() => {
      const D = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return a.panelAlign === "end" ? `right-0 left-auto ${D}` : `left-0 right-auto ${D}`;
    }), b = $(
      () => `${Nt(m.value[0])} – ${Nt(m.value[1])}`
    ), v = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], y = $(() => {
      if (!a.modelValue.start || !a.modelValue.end) return a.placeholder;
      const D = at(a.modelValue.start), I = at(a.modelValue.end);
      return `${Ln(D)} – ${Ln(I)}`;
    });
    function w(D, I) {
      return D.getMonth() === I.getMonth() && D.getFullYear() === I.getFullYear();
    }
    function _(D) {
      const I = Ve(D);
      if (a.minDate) {
        const B = Ve(at(a.minDate));
        if (jt(I, B)) return !0;
      }
      if (a.maxDate) {
        const B = Ve(at(a.maxDate));
        if (jt(B, I)) return !0;
      }
      return !1;
    }
    function k(D, I, B) {
      const j = mt(D, I), H = mt(D, B);
      if (j && H) return "rounded-lg";
      const Q = j || D.getDay() === 0, le = H || D.getDay() === 6;
      return Q && le ? "rounded-lg" : Q ? "rounded-l-lg" : le ? "rounded-r-lg" : "rounded-none";
    }
    function C(D, I) {
      const B = w(I, D), j = _(I), H = a.modelValue.start ? Ve(at(a.modelValue.start)) : null, Q = a.modelValue.end ? Ve(at(a.modelValue.end)) : null, le = Ve(I);
      if (j)
        return oS;
      let fe = sS;
      if (H && Q && Nr(le, H) && jr(le, Q)) {
        const oe = mt(le, H), L = mt(le, Q);
        fe = `${k(le, H, Q)} ${oe || L ? lS : rS}`;
      }
      return B || (fe = `${fe} ${iS}`), fe;
    }
    function S(D) {
      if (_(D)) return;
      const I = Ve(D);
      if (!c.value) {
        c.value = new Date(I), n("update:modelValue", { start: nt(I), end: nt(I) });
        return;
      }
      let j = Ve(c.value), H = new Date(I);
      jt(H, j) && ([j, H] = [H, j]), n("update:modelValue", { start: nt(j), end: nt(H) }), c.value = null, l.value = !1;
    }
    function M(D) {
      u.value = Ma(u.value, D);
    }
    function R() {
      l.value = !1;
    }
    function V(D) {
      if (D?.stopPropagation(), !l.value) {
        if (l.value = !0, c.value = null, a.modelValue.start)
          try {
            u.value = kt(at(a.modelValue.start));
          } catch {
          }
        Ke(() => r.value?.focus());
      }
    }
    function W(D) {
      if (!l.value) return;
      const I = i.value;
      I && !I.contains(D.target) && (l.value = !1);
    }
    return Te(l, (D) => {
      D && (c.value = null);
    }), Je(() => {
      document.addEventListener("click", W);
    }), rt(() => {
      document.removeEventListener("click", W);
    }), (D, I) => (g(), x("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (g(), x("label", {
        key: 0,
        id: s,
        class: Z(T(ct))
      }, A(e.label), 3)) : F("", !0),
      d("button", {
        type: "button",
        class: Z([
          T(et),
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
        N(T(Po), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        d("span", {
          class: Z([
            "min-w-0 flex-1 truncate",
            f.value ? "" : "text-[color:var(--kiut-text-muted)] dark:text-slate-500"
          ])
        }, A(y.value), 3)
      ], 42, K4),
      Xe(d("div", {
        ref_key: "panelRef",
        ref: r,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": "Calendario de rango",
        class: Z([
          h.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: Ca(Be(R, ["stop"]), ["escape"])
      }, [
        d("div", Y4, [
          d("div", q4, [
            d("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes anterior",
              onClick: I[0] || (I[0] = (B) => M(-1))
            }, [
              N(T(Io), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ]),
            d("div", X4, [
              d("span", G4, A(b.value), 1),
              d("div", Z4, [
                d("span", Q4, A(T(Nt)(m.value[0])), 1),
                d("span", J4, A(T(Nt)(m.value[1])), 1)
              ])
            ]),
            d("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes siguiente",
              onClick: I[1] || (I[1] = (B) => M(1))
            }, [
              N(T(Eo), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ])
          ]),
          d("div", eS, [
            (g(!0), x(ue, null, pe(m.value, (B) => (g(), x("div", {
              key: `${B.getFullYear()}-${B.getMonth()}`,
              class: "w-full max-w-[252px] shrink-0"
            }, [
              d("div", tS, [
                (g(), x(ue, null, pe(v, (j) => d("span", { key: j }, A(j), 1)), 64))
              ]),
              d("div", aS, [
                (g(!0), x(ue, null, pe(T(Hr)(B), (j) => (g(), x("button", {
                  key: T(nt)(j),
                  type: "button",
                  disabled: _(j),
                  class: Z(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", C(B, j)]),
                  onClick: (H) => S(j)
                }, A(j.getDate()), 11, nS))), 128))
              ])
            ]))), 128))
          ])
        ])
      ], 42, U4), [
        [Ht, l.value]
      ])
    ], 512));
  }
}), dS = ["aria-expanded", "aria-labelledby", "aria-label"], uS = ["aria-label", "onKeydown"], hS = { class: "flex flex-col sm:flex-row" }, fS = ["aria-label"], gS = { class: "px-2 pt-1 pb-1.5 text-[10px] font-semibold uppercase dark:text-[#61616b] text-[#e3e3e8]" }, mS = { class: "flex flex-col gap-0.5" }, pS = ["onClick"], bS = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, vS = { class: "mb-4 flex items-center justify-between gap-2" }, yS = ["aria-label"], xS = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, kS = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, _S = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, wS = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, CS = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, $S = ["aria-label"], SS = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, MS = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, DS = { class: "grid grid-cols-7 gap-y-2 mt-2" }, AS = ["disabled", "onClick"], TS = "rounded-lg text-[#61616b]", BS = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", LS = "opacity-30", RS = "bg-[#6b35e9] font-medium text-white", PS = "bg-[#895af6] font-semibold text-white", IS = /* @__PURE__ */ he({
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
    const a = e, n = t, s = `${`kiut-dpp-${We()}`}-lbl`, i = ne(null), r = ne(null), l = ne(!1), c = ne(null), u = ne(kt(/* @__PURE__ */ new Date())), f = $(() => !!(a.modelValue.start && a.modelValue.end)), m = $(() => {
      const oe = kt(u.value);
      return [oe, Ma(oe, 1)];
    }), p = $(
      () => a.placeholder ?? (a.locale === "es" ? "Seleccionar fechas" : "Select dates")
    ), h = $(() => a.ariaLabel ?? p.value), b = $(() => Or(a.locale)), v = $(() => $C(a.locale)), y = $(() => wC(a.locale)), w = $(
      () => a.locale === "es" ? "Preajustes de rango" : "Range presets"
    ), _ = $(
      () => a.locale === "es" ? "Mes anterior" : "Previous month"
    ), k = $(
      () => a.locale === "es" ? "Mes siguiente" : "Next month"
    ), C = $(
      () => a.locale === "es" ? "Calendario de rango con preajustes" : "Date range calendar with presets"
    ), S = $(() => {
      const oe = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return a.panelAlign === "end" ? `right-0 left-auto ${oe}` : `left-0 right-auto ${oe}`;
    }), M = $(
      () => `${Nt(m.value[0], a.locale)} – ${Nt(m.value[1], a.locale)}`
    ), R = $(() => {
      if (!a.modelValue.start || !a.modelValue.end) return p.value;
      const oe = at(a.modelValue.start), L = at(a.modelValue.end);
      return `${Ln(oe, a.locale)} – ${Ln(L, a.locale)}`;
    });
    function V(oe, L) {
      return oe.getMonth() === L.getMonth() && oe.getFullYear() === L.getFullYear();
    }
    function W(oe) {
      const L = Ve(oe);
      if (a.minDate) {
        const U = Ve(at(a.minDate));
        if (jt(L, U)) return !0;
      }
      if (a.maxDate) {
        const U = Ve(at(a.maxDate));
        if (jt(U, L)) return !0;
      }
      return !1;
    }
    function D(oe, L, U) {
      const Y = mt(oe, L), z = mt(oe, U);
      if (Y && z) return "rounded-lg";
      const re = Y || oe.getDay() === 0, ce = z || oe.getDay() === 6;
      return re && ce ? "rounded-lg" : re ? "rounded-l-lg" : ce ? "rounded-r-lg" : "rounded-none";
    }
    function I(oe) {
      const L = DC(
        a.modelValue,
        oe,
        /* @__PURE__ */ new Date(),
        a.minDate,
        a.maxDate
      ), U = "text-[#61616b] hover:bg-[#efeff0b3] dark:text-[#e3e3e8] dark:hover:bg-[#23232fb3]";
      return L ? `${U} font-medium` : U;
    }
    function B(oe, L) {
      const U = V(L, oe), Y = W(L), z = a.modelValue.start ? Ve(at(a.modelValue.start)) : null, re = a.modelValue.end ? Ve(at(a.modelValue.end)) : null, ce = Ve(L);
      if (Y)
        return TS;
      let ve = BS;
      if (z && re && Nr(ce, z) && jr(ce, re)) {
        const ie = mt(ce, z), de = mt(ce, re);
        ve = `${D(ce, z, re)} ${ie || de ? PS : RS}`;
      }
      return U || (ve = `${ve} ${LS}`), ve;
    }
    function j(oe) {
      const L = zr(Vr(oe), a.minDate, a.maxDate);
      n("update:modelValue", {
        start: nt(L.start),
        end: nt(L.end)
      }), u.value = kt(L.start), c.value = null, l.value = !1;
    }
    function H(oe) {
      if (W(oe)) return;
      const L = Ve(oe);
      if (!c.value) {
        c.value = new Date(L), n("update:modelValue", { start: nt(L), end: nt(L) });
        return;
      }
      let Y = Ve(c.value), z = new Date(L);
      jt(z, Y) && ([Y, z] = [z, Y]), n("update:modelValue", { start: nt(Y), end: nt(z) }), c.value = null, l.value = !1;
    }
    function Q(oe) {
      u.value = Ma(u.value, oe);
    }
    function le() {
      l.value = !1;
    }
    function fe(oe) {
      if (oe.stopPropagation(), l.value) {
        l.value = !1;
        return;
      }
      if (l.value = !0, c.value = null, a.modelValue.start)
        try {
          u.value = kt(at(a.modelValue.start));
        } catch {
        }
      Ke(() => r.value?.focus());
    }
    function G(oe) {
      if (!l.value) return;
      const L = i.value;
      L && !L.contains(oe.target) && (l.value = !1);
    }
    return Te(l, (oe) => {
      oe && (c.value = null);
    }), Je(() => {
      document.addEventListener("click", G);
    }), rt(() => {
      document.removeEventListener("click", G);
    }), (oe, L) => (g(), x("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (g(), x("label", {
        key: 0,
        id: s,
        class: Z(T(ct))
      }, A(e.label), 3)) : F("", !0),
      d("button", {
        type: "button",
        class: Z([
          T(et),
          "group flex w-full items-center gap-2 text-left hover:bg-[#6b35e9] hover:text-white",
          l.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": l.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : h.value,
        onClick: fe
      }, [
        N(T(Po), {
          class: "h-5 w-5 shrink-0 text-gray-500 transition-colors group-hover:text-white dark:text-slate-400",
          "aria-hidden": "true"
        }),
        d("span", {
          class: Z([
            "min-w-0 flex-1 truncate",
            f.value ? "" : "text-[color:var(--kiut-text-muted)] group-hover:text-white dark:text-slate-500"
          ])
        }, A(R.value), 3)
      ], 10, dS),
      Xe(d("div", {
        ref_key: "panelRef",
        ref: r,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": C.value,
        class: Z([
          S.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: Ca(Be(le, ["stop"]), ["escape"])
      }, [
        d("div", hS, [
          d("aside", {
            class: "w-full shrink-0 border-b border-gray-200 p-3 sm:w-[176px] sm:border-r sm:border-b-0 dark:border-[color:var(--kiut-border-light)]",
            "aria-label": w.value
          }, [
            d("p", gS, A(v.value), 1),
            d("ul", mS, [
              (g(!0), x(ue, null, pe(b.value, (U) => (g(), x("li", {
                key: U.id
              }, [
                d("button", {
                  type: "button",
                  class: Z(["w-full rounded-lg px-2 py-1.5 text-left text-xs transition focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", I(U.id)]),
                  onClick: (Y) => j(U.id)
                }, A(U.label), 11, pS)
              ]))), 128))
            ])
          ], 8, fS),
          d("div", bS, [
            d("div", vS, [
              d("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": _.value,
                onClick: L[0] || (L[0] = (U) => Q(-1))
              }, [
                N(T(Io), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, yS),
              d("div", xS, [
                d("span", kS, A(M.value), 1),
                d("div", _S, [
                  d("span", wS, A(T(Nt)(m.value[0], e.locale)), 1),
                  d("span", CS, A(T(Nt)(m.value[1], e.locale)), 1)
                ])
              ]),
              d("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": k.value,
                onClick: L[1] || (L[1] = (U) => Q(1))
              }, [
                N(T(Eo), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, $S)
            ]),
            d("div", SS, [
              (g(!0), x(ue, null, pe(m.value, (U) => (g(), x("div", {
                key: `${U.getFullYear()}-${U.getMonth()}`,
                class: "w-full max-w-[252px] shrink-0"
              }, [
                d("div", MS, [
                  (g(!0), x(ue, null, pe(y.value, (Y) => (g(), x("span", { key: Y }, A(Y), 1))), 128))
                ]),
                d("div", DS, [
                  (g(!0), x(ue, null, pe(T(Hr)(U), (Y) => (g(), x("button", {
                    key: T(nt)(Y),
                    type: "button",
                    disabled: W(Y),
                    class: Z(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", B(U, Y)]),
                    onClick: (z) => H(Y)
                  }, A(Y.getDate()), 11, AS))), 128))
                ])
              ]))), 128))
            ])
          ])
        ])
      ], 42, uS), [
        [Ht, l.value]
      ])
    ], 512));
  }
}), ES = { class: "kiut-translation-count-badge__content" }, FS = { class: "kiut-translation-count-badge__title" }, OS = { class: "kiut-translation-count-badge__pills" }, VS = {
  key: 0,
  class: "kiut-translation-count-badge__pill-note"
}, xn = 8, xa = 12, zS = /* @__PURE__ */ he({
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
    }), s = ne(null), i = ne(null), r = $(() => {
      const p = "whitespace-nowrap rounded-md px-2 py-0.5 text-xs cursor-default font-['Inter',system-ui,sans-serif]";
      return t.variant === "configured" ? `${p} border border-purple-300 text-purple-700 dark:border-purple-700/50 dark:text-purple-400` : t.variant === "autoconfigured" ? `${p} border border-dashed border-green-400 text-green-600 dark:border-green-600 dark:text-green-400` : `${p} border border-gray-500/40 text-gray-500 dark:border-gray-600 dark:text-gray-400`;
    }), l = $(
      () => `kiut-translation-count-badge__pill kiut-translation-count-badge__pill--${t.variant}`
    );
    function c() {
      a.value = !1;
    }
    function u() {
      const p = s.value, h = i.value;
      if (!p || !h) return;
      const b = p.getBoundingClientRect(), v = h.getBoundingClientRect(), y = b.top - xa, w = window.innerHeight - b.bottom - xa, _ = y >= v.height + xn, k = w >= v.height + xn;
      let C = "top";
      _ ? C = "top" : k ? C = "bottom" : C = w >= y ? "bottom" : "top", n.value = C;
      let S = C === "top" ? b.top - v.height - xn : b.bottom + xn;
      S = Math.max(
        xa,
        Math.min(S, window.innerHeight - v.height - xa)
      );
      let M = b.left + b.width / 2 - v.width / 2;
      M = Math.max(
        xa,
        Math.min(M, window.innerWidth - v.width - xa)
      ), o.value = {
        top: `${S}px`,
        left: `${M}px`
      };
    }
    async function f() {
      if (!t.items.length) return;
      a.value = !0, await Ke();
      const p = i.value;
      p && (p.style.visibility = "hidden", u(), p.style.visibility = "visible");
    }
    function m() {
      a.value && c();
    }
    return window.addEventListener("scroll", m, !0), window.addEventListener("resize", m), rt(() => {
      window.removeEventListener("scroll", m, !0), window.removeEventListener("resize", m);
    }), (p, h) => (g(), x(ue, null, [
      d("span", {
        ref_key: "triggerRef",
        ref: s,
        class: Z([r.value, e.pulse && "animate-pulse"]),
        onMouseenter: f,
        onMouseleave: c,
        onFocus: f,
        onBlur: c
      }, A(e.label), 35),
      (g(), ae(Qt, { to: "body" }, [
        a.value && e.items.length ? (g(), x("div", {
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
          d("div", ES, [
            d("span", FS, A(e.tooltipTitle), 1),
            d("div", OS, [
              (g(!0), x(ue, null, pe(e.items, (b) => (g(), x("span", {
                key: b.id,
                class: Z(l.value)
              }, [
                Ae(A(b.label) + " ", 1),
                b.note ? (g(), x("span", VS, " (" + A(b.note) + ") ", 1)) : F("", !0)
              ], 2))), 128))
            ])
          ])
        ], 38)) : F("", !0)
      ]))
    ], 64));
  }
}), NS = ["disabled", "aria-expanded", "aria-label"], jS = { class: "min-w-0 flex-1 truncate" }, HS = ["aria-selected", "onClick", "onMouseenter"], WS = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, KS = { class: "min-w-0 flex-1" }, US = /* @__PURE__ */ he({
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
    const a = e, n = t, s = `${`kiut-tag-select-${We()}`}-listbox`, i = ne(null), r = ne(null), l = ne(null), c = ne(null), u = ne(!1), f = ne(0), m = ne({}), p = $(() => a.options.filter((Q) => !Q.disabled)), h = $(
      () => a.options.find((Q) => Q.value === a.modelValue) ?? null
    ), b = $(() => h.value?.color ?? "neutral"), v = $(
      () => _r(b.value, a.outlined)
    ), y = $(() => h.value ? h.value.label : a.modelValue !== null && a.modelValue !== void 0 && a.modelValue !== "" ? String(a.modelValue) : p.value[0]?.label ?? "Seleccionar…"), w = $(
      () => a.ariaLabel ?? `Estado: ${y.value}`
    );
    function _() {
      const Q = r.value;
      if (!Q) return;
      const le = Q.getBoundingClientRect();
      m.value = {
        top: `${le.bottom + 4}px`,
        left: `${le.left}px`,
        minWidth: `${le.width}px`
      };
    }
    function k(Q) {
      return `${String(Q.value)}-${Q.label}`;
    }
    function C(Q) {
      return a.modelValue === Q.value;
    }
    function S(Q, le) {
      const fe = C(Q), G = f.value === le;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        fe ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !fe && G ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function M() {
      f.value = Math.max(
        0,
        p.value.findIndex((Q) => Q.value === a.modelValue)
      );
    }
    function R() {
      _(), M(), Ke(() => c.value?.focus());
    }
    function V() {
      u.value = !1;
    }
    function W(Q) {
      n("update:modelValue", Q.value), V();
    }
    function D() {
      if (!a.disabled) {
        if (u.value) {
          V();
          return;
        }
        u.value = !0, R();
      }
    }
    function I(Q) {
      Q.stopPropagation(), !a.disabled && D();
    }
    function B(Q) {
      if (!u.value) return;
      const le = Q.target, fe = i.value, G = l.value;
      fe && !fe.contains(le) && (!G || !G.contains(le)) && V();
    }
    function j(Q) {
      a.disabled || (Q.key === "ArrowDown" || Q.key === "Enter" || Q.key === " ") && (Q.preventDefault(), u.value || (u.value = !0, R()));
    }
    function H(Q) {
      const le = p.value;
      if (Q.key === "Escape") {
        Q.preventDefault(), V(), r.value?.focus();
        return;
      }
      if (le.length !== 0) {
        if (Q.key === "ArrowDown") {
          Q.preventDefault(), f.value = Math.min(f.value + 1, le.length - 1);
          return;
        }
        if (Q.key === "ArrowUp") {
          Q.preventDefault(), f.value = Math.max(f.value - 1, 0);
          return;
        }
        if (Q.key === "Enter") {
          Q.preventDefault();
          const fe = le[f.value];
          fe && W(fe);
        }
      }
    }
    return Je(() => {
      document.addEventListener("click", B);
    }), rt(() => {
      document.removeEventListener("click", B);
    }), (Q, le) => (g(), x("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative inline-flex font-sans"
    }, [
      d("button", {
        ref_key: "buttonRef",
        ref: r,
        type: "button",
        disabled: e.disabled,
        class: Z([
          T(kr),
          "cursor-pointer gap-1.5 transition-opacity disabled:cursor-not-allowed disabled:opacity-50",
          v.value,
          u.value ? "ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": u.value,
        "aria-haspopup": "listbox",
        "aria-controls": s,
        "aria-label": w.value,
        onClick: I,
        onKeydown: j
      }, [
        d("span", jS, A(y.value), 1),
        N(T(ta), {
          class: Z(["h-3.5 w-3.5 shrink-0 opacity-70 transition-transform", u.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, NS),
      (g(), ae(Qt, { to: "body" }, [
        Xe(d("div", {
          ref_key: "panelRef",
          ref: l,
          style: Ce(m.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]"
        }, [
          d("ul", {
            id: s,
            ref_key: "listRef",
            ref: c,
            role: "listbox",
            tabindex: "-1",
            onKeydown: Be(H, ["stop"])
          }, [
            (g(!0), x(ue, null, pe(p.value, (fe, G) => (g(), x("li", {
              key: k(fe),
              role: "option",
              "aria-selected": C(fe),
              class: Z(S(fe, G)),
              onClick: Be((oe) => W(fe), ["stop"]),
              onMouseenter: (oe) => f.value = G
            }, [
              d("span", WS, [
                C(fe) ? (g(), ae(T(Bn), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : F("", !0)
              ]),
              d("span", KS, A(fe.label), 1)
            ], 42, HS))), 128))
          ], 544)
        ], 4), [
          [Ht, u.value]
        ])
      ]))
    ], 512));
  }
}), YS = ["aria-label"], qS = { class: "flex flex-col gap-1" }, XS = { class: "flex flex-row gap-3 items-center" }, GS = {
  key: 0,
  class: "flex flex-row gap-1 items-center"
}, ZS = {
  key: 1,
  class: "flex flex-row gap-1 items-center"
}, QS = /* @__PURE__ */ he({
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
    const t = Ja(), a = e, n = {
      warning: Nw,
      info: jw,
      success: zw,
      feature: Ww,
      danger: Kw
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
    return (r, l) => (g(), x("div", {
      role: "region",
      "aria-label": e.title,
      class: Z([
        s.value.container,
        T(t).class,
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
          ke(r.$slots, "icon", {}, () => [
            (g(), ae(ft(i.value)))
          ])
        ], 2)
      ], 2),
      d("div", qS, [
        d("h1", {
          class: Z([s.value.title, "text-base font-bold"])
        }, A(a.title), 3),
        d("span", {
          class: Z([s.value.description, "text-sm leading-snug"])
        }, A(a.description), 3),
        d("div", XS, [
          a.date_start ? (g(), x("div", GS, [
            d("span", {
              class: Z([
                s.value.icon_date,
                "inline-flex shrink-0 [&>svg]:h-[1rem] [&>svg]:w-[1rem]"
              ]),
              "aria-hidden": "true"
            }, [
              ke(r.$slots, "icon_date", {}, () => [
                N(T(bi))
              ])
            ], 2),
            a.subtitle_date_start ? (g(), x("span", {
              key: 0,
              class: Z([s.value.subtitle_date, "text-xs font-bold"])
            }, A(a.subtitle_date_start), 3)) : F("", !0),
            d("span", {
              class: Z([s.value.date, "text-xs"])
            }, A(a.date_start), 3)
          ])) : F("", !0),
          a.date_final ? (g(), x("div", ZS, [
            d("span", {
              class: Z([
                s.value.icon_date,
                "inline-flex shrink-0 [&>svg]:h-[1rem] [&>svg]:w-[1rem]"
              ]),
              "aria-hidden": "true"
            }, [
              ke(r.$slots, "icon_date", {}, () => [
                N(T(bi))
              ])
            ], 2),
            a.subtitle_date_final ? (g(), x("span", {
              key: 0,
              class: Z([s.value.subtitle_date, "text-xs font-bold"])
            }, A(a.subtitle_date_final), 3)) : F("", !0),
            d("span", {
              class: Z([s.value.date, "text-xs"])
            }, A(a.date_final), 3)
          ])) : F("", !0)
        ])
      ])
    ], 10, YS));
  }
}), JS = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, e3 = ["id"], t3 = { class: "min-w-0 flex-1 space-y-1" }, a3 = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, n3 = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-6" }, o3 = { class: "flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2" }, s3 = /* @__PURE__ */ he({
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
    loading: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "cancel", "confirm"],
  setup(e, { emit: t }) {
    const a = e, n = $(() => ({ maxWidth: `${a.width}px` })), o = t, i = `${`kiut-modal-${We()}`}-title`, r = ne(null);
    function l() {
      a.loading || (o("cancel"), o("update:modelValue", !1));
    }
    function c() {
      o("confirm");
    }
    function u(f) {
      if (a.modelValue && f.key === "Escape") {
        if (a.loading) return;
        f.preventDefault(), l();
      }
    }
    return Te(
      () => a.modelValue,
      (f) => {
        f && requestAnimationFrame(() => {
          r.value?.focus({ preventScroll: !0 });
        });
      }
    ), Je(() => {
      document.addEventListener("keydown", u);
    }), rt(() => {
      document.removeEventListener("keydown", u);
    }), (f, m) => (g(), ae(Qt, { to: "body" }, [
      N(pt, { name: "kiut-modal" }, {
        default: O(() => [
          e.modelValue ? (g(), x("div", JS, [
            d("div", {
              class: "absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] dark:bg-black/60",
              "aria-hidden": "true",
              onClick: l
            }),
            d("div", {
              id: e.id,
              ref_key: "panelRef",
              ref: r,
              role: "dialog",
              "aria-modal": "true",
              "aria-labelledby": i,
              tabindex: "-1",
              class: "kiut-modal-panel relative z-10 flex max-h-[min(90vh,880px)] w-full flex-col overflow-hidden rounded-2xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] shadow-[var(--kiut-shadow-card)] dark:bg-[#252528] dark:shadow-black/40",
              style: Ce(n.value),
              onClick: m[0] || (m[0] = Be(() => {
              }, ["stop"]))
            }, [
              d("header", {
                class: Z(["flex shrink-0 justify-between gap-4 bg-slate-50/50 px-6 py-5 dark:bg-white/[0.02]", [
                  e.subtitle ? "items-start" : "items-center",
                  e.headerBorder ? "border-b border-slate-100 dark:border-[color:var(--kiut-border-light)]" : ""
                ]])
              }, [
                d("div", t3, [
                  d("h2", {
                    id: i,
                    class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                  }, A(e.title), 1),
                  e.subtitle ? (g(), x("p", a3, A(e.subtitle), 1)) : F("", !0)
                ]),
                N($t, {
                  variant: "action",
                  type: "button",
                  class: "shrink-0",
                  disabled: e.loading,
                  onClick: l
                }, {
                  icon: O(() => [
                    N(T(co), { class: "h-5 w-5" })
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ], 2),
              d("div", n3, [
                ke(f.$slots, "default", {}, void 0, !0)
              ]),
              d("footer", o3, [
                N($t, {
                  variant: "secondary",
                  type: "button",
                  disabled: e.loading,
                  onClick: l
                }, {
                  default: O(() => [
                    Ae(A(e.cancelLabel), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                N($t, {
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
              ])
            ], 12, e3)
          ])) : F("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), i3 = /* @__PURE__ */ be(s3, [["__scopeId", "data-v-ae2266d6"]]), r3 = { class: "text-left font-['Inter',system-ui,sans-serif]" }, l3 = {
  key: 0,
  class: ""
}, c3 = {
  key: 0,
  class: "flex min-w-0 flex-col gap-1.5 mb-4"
}, d3 = { class: "flex min-w-0 flex-1 items-center" }, u3 = {
  key: 0,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, h3 = {
  key: 0,
  class: "flex min-w-0 flex-1 flex-wrap items-center gap-2"
}, f3 = {
  key: 1,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, g3 = /* @__PURE__ */ he({
  name: "Section",
  __name: "Section",
  setup(e) {
    const t = ho(), a = $(() => {
      const n = !!t.filters, o = !!t.actions;
      return n && o ? "justify-between" : o ? "justify-end" : "";
    });
    return (n, o) => (g(), x("section", r3, [
      n.$slots.description || n.$slots.tabs || n.$slots.filters || n.$slots.actions ? (g(), x("header", l3, [
        n.$slots.description ? (g(), x("div", c3, [
          ke(n.$slots, "description")
        ])) : F("", !0),
        n.$slots.tabs ? (g(), x("div", {
          key: 1,
          class: Z(["flex flex-wrap items-center gap-2", n.$slots.filters ? "" : "justify-between"])
        }, [
          d("div", d3, [
            ke(n.$slots, "tabs")
          ]),
          n.$slots.actions && !n.$slots.filters ? (g(), x("div", u3, [
            ke(n.$slots, "actions")
          ])) : F("", !0)
        ], 2)) : F("", !0),
        n.$slots.filters || n.$slots.actions && !n.$slots.tabs ? (g(), x("div", {
          key: 2,
          class: Z([
            "flex flex-wrap gap-2 items-center",
            n.$slots.tabs ? "mt-2" : "",
            a.value
          ])
        }, [
          n.$slots.filters ? (g(), x("div", h3, [
            ke(n.$slots, "filters")
          ])) : F("", !0),
          n.$slots.actions ? (g(), x("div", f3, [
            ke(n.$slots, "actions")
          ])) : F("", !0)
        ], 2)) : F("", !0)
      ])) : F("", !0),
      n.$slots.content || n.$slots.default ? (g(), x("div", {
        key: 1,
        class: Z({
          "mt-6": n.$slots.description || n.$slots.tabs || n.$slots.filters || n.$slots.actions
        })
      }, [
        ke(n.$slots, "content", {}, () => [
          ke(n.$slots, "default")
        ])
      ], 2)) : F("", !0)
    ]));
  }
}), m3 = { class: "flex flex-1 min-h-0" }, p3 = {
  key: 0,
  class: "flex justify-center items-center my-4 shrink-0"
}, b3 = {
  class: "flex-1 overflow-y-auto p-1 flex flex-col gap-1",
  "aria-label": "Sections"
}, v3 = ["aria-current", "data-has-active", "title", "onClick"], y3 = {
  key: 1,
  class: "footer-section shrink-0 border-t [background-color:var(--kiut-lateral-bg)]"
}, x3 = { class: "px-4 py-4 shrink-0" }, k3 = { class: "text-[12px] font-bold uppercase tracking-widest text-start [color:var(--kiut-text-subtitle)]" }, _3 = {
  class: "flex-1 overflow-y-auto px-1 pb-3 flex flex-col gap-0.5",
  "aria-label": "Section items"
}, w3 = ["data-nav-id", "aria-current", "onClick"], C3 = { class: "flex items-center justify-between px-5 py-3 shrink-0" }, $3 = { class: "text-xs font-bold uppercase tracking-widest [color:var(--kiut-text-muted)]" }, S3 = {
  class: "overflow-y-auto flex-1 px-3 pb-5 flex flex-col gap-1",
  "aria-label": "Section items"
}, M3 = ["data-nav-id", "aria-current", "onClick"], D3 = { class: "truncate text-[15px]" }, A3 = ["aria-current", "data-has-active", "onClick"], T3 = {
  key: 0,
  class: "absolute top-0 w-1/2 h-0.5 rounded-full [background-color:var(--kiut-primary)]",
  "aria-hidden": "true"
}, B3 = { class: "text-[9px] font-semibold leading-none truncate w-full text-center px-0.5" }, L3 = /* @__PURE__ */ he({
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
    const a = ne(!1), n = e, o = t, s = Ja(), { class: i, ...r } = s, l = ne(!1);
    function c() {
      typeof window > "u" || (l.value = window.innerWidth < n.mobileBreakpoint);
    }
    Je(() => {
      c(), window.addEventListener("resize", c);
    }), rt(() => {
      window.removeEventListener("resize", c);
    });
    const u = $(() => {
      const y = n.sections.find((w) => w.id === n.selectedSectionId);
      return y?.items?.length ? y : null;
    });
    function f(y) {
      return n.activePath ? n.activePath === y.path || n.activePath.startsWith(y.path + "/") : !1;
    }
    function m(y) {
      return y.items?.length ? y.items.some(f) : !n.activePath || !y.path ? !1 : n.activePath === y.path || n.activePath.startsWith(y.path + "/");
    }
    function p(y) {
      if (!y.items?.length) {
        o("update:selectedSectionId", null), o("navigate", {
          section: y,
          item: { id: y.id, label: y.label, path: y.path }
        });
        return;
      }
      const w = n.selectedSectionId === y.id ? null : y.id;
      o("update:selectedSectionId", w);
    }
    function h(y, w) {
      o("navigate", { section: y, item: w });
    }
    function b() {
      o("update:selectedSectionId", null);
    }
    function v(y, w) {
      h(y, w), b();
    }
    return (y, w) => l.value ? (g(), x("div", yt({
      key: 1,
      class: "kiut-app-shell-nav font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, r), [
      N(pt, { name: "ksn-overlay" }, {
        default: O(() => [
          u.value ? (g(), x("div", {
            key: 0,
            class: "fixed inset-0 bg-black/40 z-40",
            "aria-hidden": "true",
            onClick: b
          })) : F("", !0)
        ]),
        _: 1
      }),
      N(pt, { name: "ksn-sheet" }, {
        default: O(() => [
          u.value ? (g(), x("div", {
            key: 0,
            class: "mobile-subsections fixed left-0 right-0 bottom-0 z-50 [background-color:var(--kiut-lateral-bg)] rounded-t-2xl shadow-2xl border-t max-h-[70vh] flex flex-col",
            style: Ce({ paddingBottom: n.mobileBarHeight })
          }, [
            w[3] || (w[3] = d("div", { class: "flex justify-center pt-3 pb-1 shrink-0" }, [
              d("div", { class: "w-10 h-1 rounded-full [background-color:var(--kiut-lateral-border-color)] dark:bg-purple-500/30" })
            ], -1)),
            d("div", C3, [
              d("p", $3, A(u.value.label), 1),
              d("button", {
                type: "button",
                class: "w-8 h-8 flex items-center justify-center rounded-lg [color:var(--kiut-text-muted)] hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-500/20 dark:hover:text-purple-300 transition-colors",
                "aria-label": "Close",
                onClick: b
              }, [...w[2] || (w[2] = [
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
            d("nav", S3, [
              (g(!0), x(ue, null, pe(u.value.items, (_) => (g(), x("button", {
                key: _.id,
                type: "button",
                "data-nav-id": _.id,
                "aria-current": f(_) ? "page" : void 0,
                class: "ksn-item-btn group flex items-center gap-3 w-full text-left px-4 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20 min-h-[52px]",
                onClick: (k) => v(u.value, _)
              }, [
                _.icon ? (g(), ae(ft(_.icon), {
                  key: 0,
                  class: "shrink-0",
                  style: { width: "18px", height: "18px" },
                  "aria-hidden": "true"
                })) : F("", !0),
                d("span", D3, A(_.label), 1)
              ], 8, M3))), 128))
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
        (g(!0), x(ue, null, pe(e.sections, (_) => (g(), x("button", {
          key: _.id,
          type: "button",
          "aria-current": e.selectedSectionId === _.id ? "true" : void 0,
          "data-has-active": m(_) ? "true" : void 0,
          class: "ksn-section-btn relative flex-1 flex flex-col items-center justify-center gap-1 py-1 px-0.5 min-w-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-inset",
          onClick: (k) => p(_)
        }, [
          e.selectedSectionId === _.id || m(_) ? (g(), x("span", T3)) : F("", !0),
          _.icon ? (g(), ae(ft(_.icon), {
            key: 1,
            class: "shrink-0",
            style: Ce({ width: e.primaryIconSize, height: e.primaryIconSize }),
            "aria-hidden": "true"
          }, null, 8, ["style"])) : F("", !0),
          d("span", B3, A(_.label), 1)
        ], 8, A3))), 128))
      ], 4)
    ], 16)) : (g(), x("aside", yt({
      key: 0,
      class: "kiut-app-shell-nav flex flex-col h-full overflow-hidden font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, r), [
      d("div", m3, [
        d("div", {
          class: "primary-rail flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r justify-center",
          style: Ce({
            "--expanded-width": e.expandedPrimaryWidth,
            width: e.primaryRailWidth
          }),
          onMouseenter: w[0] || (w[0] = (_) => a.value = !0),
          onMouseleave: w[1] || (w[1] = (_) => a.value = !1)
        }, [
          y.$slots.logo ? (g(), x("div", p3, [
            ke(y.$slots, "logo", { expanded: a.value }, void 0, !0)
          ])) : F("", !0),
          d("nav", b3, [
            (g(!0), x(ue, null, pe(e.sections, (_) => (g(), x("button", {
              key: _.id,
              type: "button",
              "aria-current": e.selectedSectionId === _.id ? "true" : void 0,
              "data-has-active": m(_) ? "true" : void 0,
              title: _.label,
              class: "ksn-section-btn group relative flex flex-row items-center justify-start gap-1 px-3 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
              onClick: (k) => p(_)
            }, [
              _.icon ? (g(), ae(ft(_.icon), {
                key: 0,
                class: "shrink-0",
                style: Ce({ width: e.primaryIconSize, height: e.primaryIconSize }),
                "aria-hidden": "true"
              }, null, 8, ["style"])) : F("", !0),
              d("span", {
                class: "leading-tight font-semibold tracking-wide text-left w-full truncate px-1 color-",
                style: Ce({ fontSize: e.primaryFontSize })
              }, A(_.label), 5)
            ], 8, v3))), 128))
          ]),
          y.$slots.footer ? (g(), x("div", y3, [
            ke(y.$slots, "footer", { expanded: a.value }, void 0, !0)
          ])) : F("", !0)
        ], 36),
        N(pt, { name: "ksn-sub" }, {
          default: O(() => [
            u.value ? (g(), x("div", {
              key: "secondary",
              class: "secondary-panel flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r [border-color:var(--kiut-lateral-border-color)] overflow-hidden",
              style: Ce({ width: e.secondaryWidth })
            }, [
              d("div", x3, [
                d("p", k3, A(u.value.label), 1)
              ]),
              d("nav", _3, [
                (g(!0), x(ue, null, pe(u.value.items, (_) => (g(), x("button", {
                  key: _.id,
                  type: "button",
                  "data-nav-id": _.id,
                  "aria-current": f(_) ? "page" : void 0,
                  class: "ksn-item-btn group flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
                  onClick: (k) => h(u.value, _)
                }, [
                  _.icon ? (g(), ae(ft(_.icon), {
                    key: 0,
                    style: Ce({ width: e.secondaryIconSize, height: e.secondaryIconSize })
                  }, null, 8, ["style"])) : F("", !0),
                  d("span", {
                    class: "truncate",
                    style: Ce({ fontSize: e.secondaryFontSize })
                  }, A(_.label), 5)
                ], 8, w3))), 128))
              ])
            ], 4)) : F("", !0)
          ]),
          _: 1
        })
      ])
    ], 16));
  }
}), R3 = /* @__PURE__ */ be(L3, [["__scopeId", "data-v-e0ccb96c"]]), W3 = {
  install(e) {
    e.component("KiutChartBar", Mt), e.component("KiutChartLine", bt), e.component("KiutPieChart", Fn), e.component("KiutBoxplotChart", Nf), e.component("KiutCandlestickChart", Dg), e.component("KiutHistogramChart", vr), e.component("KiutSankeyChart", aa), e.component("KiutAgentsPerDay", $p), e.component("KiutBookingManager", o0), e.component("KiutCheckin", y0), e.component("KiutCheckinContainer", q0), e.component("KiutCheckinMetrics", wr), e.component("KiutCheckinSegments", Cr), e.component("KiutDisruption", hb), e.component("KiutFAQ", xb), e.component("KiutMessagesPerAgent", $r), e.component("KiutRecordLocator", hv), e.component("KiutSalesByChannel", Sr), e.component("KiutSeller", Mr), e.component("KiutSellerContainer", Gv), e.component("KiutTopAgents", ny), e.component("KiutPaymentMethod", Cy), e.component("KiutAgentHumanConversations", i1), e.component("KiutChannelMetrics", Dr), e.component("KiutConversationVolume", y1), e.component("KiutTriageCombinations", R1), e.component("KiutSelectLanguage", V1), e.component("KiutGuardrails", X1), e.component("KiutDisruptionNotifier", mx), e.component("KiutTotalConversationsCard", px), e.component("KiutCsatP95Card", bx), e.component("KiutCsatPulseCard", vx), e.component("KiutCSATContainer", Ux), e.component("KiutAiGeneratedRevenueCard", Yx), e.component("KiutAiGeneratedChart", ak), e.component("KiutCostCard", ok), e.component("KiutHumanEscalations", hk), e.component("KiutHumanEscalationsCard", fk), e.component("KiutAvgResolutionTime", $k), e.component("KiutAvgResolutionTimeCard", Bk), e.component("KiutCheckinCR", Lk), e.component("KiutSellerCR", Rk), e.component("KiutBookingManagerCR", Pk), e.component("KiutNpsDailyMetrics", Tr), e.component("KiutNpsMetrics", Br), e.component("KiutNpsOverviewMetrics", Ar), e.component("KiutAWSCost", jk), e.component("KiutCostUsage", Qk), e.component("KiutTokenUsage", l_), e.component("KiutConversationCount", v_), e.component("KiutTopAgentsAnalysis", T_), e.component("KiutTopAgentsPie", V_), e.component("KiutDailyCostTrends", q_), e.component("KiutModelUsage", l2), e.component("KiutMessageRoles", b2), e.component("KiutCostPerConversations", A2), e.component("Tabs", Lr), e.component("Table", U2), e.component("TableVersions", Vw), e.component("Filters", w5), e.component("InputText", Fr), e.component("InputPassword", F5), e.component("InputTextarea", j5), e.component("InputFile", lC), e.component("ImageUploadCircle", mC), e.component("InputDateTime", GC), e.component("InputTime", o$), e.component("InputRange", v$), e.component("InputNumber", w$), e.component("InputColorPicker", L$), e.component("EmojiPicker", G$), e.component("Select", na), e.component("LanguageSelect", Z$), e.component("LanguagePicker", r4), e.component("MultiSelect", $4), e.component("Toggle", Er), e.component("InputPhone", R4), e.component("SelectablePills", z4), e.component("SegmentedControl", W4), e.component("DateRangePicker", cS), e.component("DatePickerPresets", IS), e.component("Tag", Ge), e.component("TagSelect", US), e.component("TranslationCountBadge", zS), e.component("Button", $t), e.component("Banner", QS), e.component("Modal", i3), e.component("Section", g3), e.component("KiutAppShellNavigation", R3);
  }
};
export {
  jk as AWSCost,
  i1 as AgentHumanConversations,
  $p as AgentsPerDay,
  ak as AiGeneratedChart,
  Yx as AiGeneratedRevenueCard,
  R3 as AppShellNavigation,
  $k as AvgResolutionTime,
  Bk as AvgResolutionTimeCard,
  QS as Banner,
  o0 as BookingManager,
  Pk as BookingManagerCR,
  Nf as BoxplotChart,
  $t as Button,
  Ux as CSATContainer,
  Dg as CandlestickChart,
  Dr as ChannelMetrics,
  Mt as ChartBar,
  bt as ChartLine,
  y0 as Checkin,
  Lk as CheckinCR,
  q0 as CheckinContainer,
  wr as CheckinMetrics,
  Cr as CheckinSegments,
  v_ as ConversationCount,
  y1 as ConversationVolume,
  ok as CostCard,
  A2 as CostPerConversations,
  Qk as CostUsage,
  bx as CsatP95Card,
  vx as CsatPulseCard,
  Wr as DEFAULT_CATEGORY_LABELS,
  Kr as DEFAULT_EMOJI_CATALOG,
  vw as DEFAULT_TABLE_VERSIONS_LABELS,
  q_ as DailyCostTrends,
  IS as DatePickerPresets,
  cS as DateRangePicker,
  hb as Disruption,
  mx as DisruptionNotifier,
  yw as ENDPOINT_TABLE_VERSIONS_COLUMNS,
  G$ as EmojiPicker,
  xb as FAQ,
  w5 as Filters,
  X1 as Guardrails,
  vr as HistogramChart,
  hk as HumanEscalations,
  fk as HumanEscalationsCard,
  mC as ImageUploadCircle,
  L$ as InputColorPicker,
  GC as InputDateTime,
  lC as InputFile,
  w$ as InputNumber,
  F5 as InputPassword,
  R4 as InputPhone,
  v$ as InputRange,
  Fr as InputText,
  j5 as InputTextarea,
  o$ as InputTime,
  W3 as KiutUIPlugin,
  r4 as LanguagePicker,
  Z$ as LanguageSelect,
  b2 as MessageRoles,
  $r as MessagesPerAgent,
  i3 as Modal,
  l2 as ModelUsage,
  $4 as MultiSelect,
  Tr as NpsDailyMetrics,
  Br as NpsMetrics,
  Ar as NpsOverviewMetrics,
  Cy as PaymentMethod,
  Fn as PieChart,
  j3 as RESOURCE_TABLE_VERSIONS_COLUMNS,
  hv as RecordLocator,
  Sr as SalesByChannel,
  aa as SankeyChart,
  g3 as Section,
  W4 as SegmentedControl,
  na as Select,
  V1 as SelectLanguage,
  z4 as SelectablePills,
  Mr as Seller,
  Rk as SellerCR,
  Gv as SellerContainer,
  U2 as Table,
  Vw as TableVersions,
  Lr as Tabs,
  Ge as Tag,
  US as TagSelect,
  Er as Toggle,
  l_ as TokenUsage,
  ny as TopAgents,
  T_ as TopAgentsAnalysis,
  V_ as TopAgentsPie,
  px as TotalConversationsCard,
  zS as TranslationCountBadge,
  R1 as TriageCombinations,
  E$ as appendEmojiToDraft,
  H3 as buildDefaultCategories,
  I$ as extractEmojis,
  P$ as filterEmojiCatalog
};
//# sourceMappingURL=kiut-ui.es.js.map
