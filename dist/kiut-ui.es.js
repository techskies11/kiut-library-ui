import { defineComponent as ue, shallowRef as xi, h as je, ref as ne, onMounted as Je, onUnmounted as it, watch as Te, toRaw as Jn, nextTick as Ke, version as Ur, isProxy as ki, computed as C, toRef as $e, openBlock as g, createElementBlock as x, normalizeStyle as we, createVNode as N, unref as T, createElementVNode as d, Fragment as de, renderList as pe, normalizeClass as G, toDisplayString as A, createCommentVNode as E, onBeforeUnmount as _i, createStaticVNode as eo, useSlots as ho, renderSlot as ke, Transition as pt, withCtx as O, Comment as Yr, createBlock as ae, resolveDynamicComponent as ht, createTextVNode as Ae, Teleport as Qt, withDirectives as Xe, withModifiers as Be, vModelText as Rt, vShow as Ht, createSlots as Vo, vModelSelect as qr, mergeProps as yt, useAttrs as Ja, withKeys as Ca, inject as wi } from "vue";
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
function ot(e, t, a) {
  return Math.max(t, Math.min(a, e));
}
function El(e) {
  return ot(e, -32768, 32767);
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
        const b = l.slice(0, o + 1).reverse().findIndex((y) => !Ee(y[r.axis]));
        o -= Math.max(0, b);
      }
      o = ot(o, 0, n - 1);
    }
    if (h) {
      let b = Math.max(
        // @ts-expect-error Need to type _parsed
        ua(l, i.axis, m, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        a ? 0 : ua(t, u, i.getPixelForValue(m), !0).hi + 1
      );
      if (c) {
        const y = l.slice(b - 1).findIndex((v) => !Ee(v[r.axis]));
        b += Math.max(0, y);
      }
      s = ot(b, o, n) - o;
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
  let y = (h || 0) * Al;
  if (p && typeof p == "object" && (s = p.toString(), s === "[object HTMLImageElement]" || s === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(a, n), e.rotate(y), e.drawImage(p, -p.width / 2, -p.height / 2, p.width, p.height), e.restore();
    return;
  }
  if (!(isNaN(b) || b <= 0)) {
    switch (e.beginPath(), p) {
      // Default includes circle
      default:
        o ? e.ellipse(a, n, o / 2, b, 0, 0, Ue) : e.arc(a, n, b, 0, Ue), e.closePath();
        break;
      case "triangle":
        u = o ? o / 2 : b, e.moveTo(a + Math.sin(y) * u, n - Math.cos(y) * b), y += Yo, e.lineTo(a + Math.sin(y) * u, n - Math.cos(y) * b), y += Yo, e.lineTo(a + Math.sin(y) * u, n - Math.cos(y) * b), e.closePath();
        break;
      case "rectRounded":
        c = b * 0.516, l = b - c, i = Math.cos(y + sa) * l, f = Math.cos(y + sa) * (o ? o / 2 - c : l), r = Math.sin(y + sa) * l, m = Math.sin(y + sa) * (o ? o / 2 - c : l), e.arc(a - f, n - r, c, y - Oe, y - Qe), e.arc(a + m, n - i, c, y - Qe, y), e.arc(a + f, n + r, c, y, y + Qe), e.arc(a - m, n + i, c, y + Qe, y + Oe), e.closePath();
        break;
      case "rect":
        if (!h) {
          l = Math.SQRT1_2 * b, u = o ? o / 2 : l, e.rect(a - u, n - l, 2 * u, 2 * l);
          break;
        }
        y += sa;
      /* falls through */
      case "rectRot":
        f = Math.cos(y) * (o ? o / 2 : b), i = Math.cos(y) * b, r = Math.sin(y) * b, m = Math.sin(y) * (o ? o / 2 : b), e.moveTo(a - f, n - r), e.lineTo(a + m, n - i), e.lineTo(a + f, n + r), e.lineTo(a - m, n + i), e.closePath();
        break;
      case "crossRot":
        y += sa;
      /* falls through */
      case "cross":
        f = Math.cos(y) * (o ? o / 2 : b), i = Math.cos(y) * b, r = Math.sin(y) * b, m = Math.sin(y) * (o ? o / 2 : b), e.moveTo(a - f, n - r), e.lineTo(a + f, n + r), e.moveTo(a + m, n - i), e.lineTo(a - m, n + i);
        break;
      case "star":
        f = Math.cos(y) * (o ? o / 2 : b), i = Math.cos(y) * b, r = Math.sin(y) * b, m = Math.sin(y) * (o ? o / 2 : b), e.moveTo(a - f, n - r), e.lineTo(a + f, n + r), e.moveTo(a + m, n - i), e.lineTo(a - m, n + i), y += sa, f = Math.cos(y) * (o ? o / 2 : b), i = Math.cos(y) * b, r = Math.sin(y) * b, m = Math.sin(y) * (o ? o / 2 : b), e.moveTo(a - f, n - r), e.lineTo(a + f, n + r), e.moveTo(a + m, n - i), e.lineTo(a - m, n + i);
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
function st(e, t) {
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
  let b = !1, y = null, v, k, w;
  const _ = () => l(o, w, v) && r(o, w) !== 0, $ = () => r(s, v) === 0 || l(s, w, v), S = () => b || _(), M = () => !b || $();
  for (let I = u, z = u; I <= f; ++I)
    k = t[I % i], !k.skip && (v = c(k[n]), v !== w && (b = l(v, o, s), y === null && S() && (y = r(v, o) === 0 ? I : z), y !== null && M() && (h.push(rs({
      start: y,
      end: I,
      loop: m,
      count: i,
      style: p
    })), y = null), z = I, w = v));
  return y !== null && h.push(rs({
    start: y,
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
  function p(h, b, y, v) {
    const k = r ? -1 : 1;
    if (h !== b) {
      for (h += l; a[h % l].skip; )
        h -= k;
      for (; a[b % l].skip; )
        b += k;
      h % l !== b % l && (c.push({
        start: h % l,
        end: b % l,
        loop: y,
        style: v
      }), u = v, f = b % l);
    }
  }
  for (const h of t) {
    f = r ? f : h.start;
    let b = a[f % l], y;
    for (m = f + 1; m <= h.end; m++) {
      const v = a[m % l];
      y = cs(n.setContext(ma(o, {
        type: "segment",
        p0: b,
        p1: v,
        p0DataIndex: (m - 1) % l,
        p1DataIndex: m % l,
        datasetIndex: i
      }))), Wc(y, u) && p(f, m - 1, h.loop, u), b = v, u = y;
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
    const h = t[p], { [l]: b, [c]: y } = h, v = h._stacks || (h._stacks = {});
    m = v[c] = nd(o, u, b), m[r] = y, m._top = fs(m, i, !0, n.type), m._bottom = fs(m, i, !1, n.type);
    const k = m._visualValues || (m._visualValues = {});
    k[r] = y;
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
      } : this._calculateBarValuePixels(p), y = this._calculateBarIndexPixels(p, u), v = (h._stacks || {})[r.axis], k = {
        horizontal: c,
        base: b.base,
        enableBorderRadius: !v || Kn(h._custom) || i === v._top || i === v._bottom,
        x: c ? b.head : y.center,
        y: c ? y.center : b.head,
        height: c ? y.size : Math.abs(b.size),
        width: c ? Math.abs(b.size) : y.size
      };
      m && (k.options = f || this.resolveDataElementOptions(p, t[p].active ? "active" : o));
      const w = k.options || t[p].options;
      gd(k, w, v, i), pd(k, w, u.ratio), this.updateElement(t[p], p, k, o);
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
    const y = !Ee(s) && !u ? s : m;
    let v = a.getPixelForValue(y);
    if (this.chart.getDataVisibility(t) ? h = a.getPixelForValue(m + p) : h = v, b = h - v, Math.abs(b) < i) {
      b = hd(b, a, r) * i, f === r && (v -= b / 2);
      const k = a.getPixelForDecimal(0), w = a.getPixelForDecimal(1), _ = Math.min(k, w), $ = Math.max(k, w);
      v = Math.max(Math.min(v, $), _), h = v + b, n && !u && (l._stacks[a.axis]._visualValues[o] = a.getValueForPixel(h) - a.getValueForPixel(v));
    }
    if (v === a.getPixelForValue(r)) {
      const k = Pt(b) * a.getLineWidthForValue(r) / 2;
      v += k, b -= k;
    }
    return {
      size: b,
      base: v,
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
    const r = e, l = r + t, c = Math.cos(r), u = Math.sin(r), f = Math.cos(l), m = Math.sin(l), p = (w, _, $) => qa(w, r, l, !0) ? 1 : Math.max(_, _ * a, $, $ * a), h = (w, _, $) => qa(w, r, l, !0) ? -1 : Math.min(_, _ * a, $, $ * a), b = p(0, c, f), y = p(Qe, u, m), v = h(Oe, c, f), k = h(Oe + Qe, u, m);
    n = (b - v) / 2, o = (y - k) / 2, s = -(b + v) / 2, i = -(y + k) / 2;
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
    const a = this.chart, { chartArea: n } = a, o = this._cachedMeta, s = o.data, i = this.getMaxBorderWidth() + this.getMaxOffset(s) + this.options.spacing, r = Math.max((Math.min(n.width, n.height) - i) / 2, 0), l = Math.min(_l(this.options.cutout, r), 1), c = this._getRingWeight(this.index), { circumference: u, rotation: f } = this._getRotationExtents(), { ratioX: m, ratioY: p, offsetX: h, offsetY: b } = vd(f, u, l), y = (n.width - i) / m, v = (n.height - i) / p, k = Math.max(Math.min(y, v) / 2, 0), w = Mi(this.options.radius, k), _ = Math.max(w * l, 0), $ = (w - _) / this._getVisibleDatasetWeightTotal();
    this.offsetX = h * w, this.offsetY = b * w, o.total = this.calculateTotal(), this.outerRadius = w - $ * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - $ * c, 0), this.updateElements(s, 0, s.length, t);
  }
  _circumference(t, a) {
    const n = this.options, o = this._cachedMeta, s = this._getCircumference();
    return a && n.animation.animateRotate || !this.chart.getDataVisibility(t) || o._parsed[t] === null || o.data[t].hidden ? 0 : this.calculateCircumference(o._parsed[t] * s / Ue);
  }
  updateElements(t, a, n, o) {
    const s = o === "reset", i = this.chart, r = i.chartArea, c = i.options.animation, u = (r.left + r.right) / 2, f = (r.top + r.bottom) / 2, m = s && c.animateScale, p = m ? 0 : this.innerRadius, h = m ? 0 : this.outerRadius, { sharedOptions: b, includeOptions: y } = this._getSharedOptions(a, o);
    let v = this._getRotation(), k;
    for (k = 0; k < a; ++k)
      v += this._circumference(k, s);
    for (k = a; k < a + n; ++k) {
      const w = this._circumference(k, s), _ = t[k], $ = {
        x: u + this.offsetX,
        y: f + this.offsetY,
        startAngle: v,
        endAngle: v + w,
        circumference: w,
        outerRadius: h,
        innerRadius: p
      };
      y && ($.options = b || this.resolveDataElementOptions(k, _.active ? "active" : o)), v += w, this.updateElement(_, k, $, o);
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
    const s = o === "reset", { iScale: i, vScale: r, _stacked: l, _dataset: c } = this._cachedMeta, { sharedOptions: u, includeOptions: f } = this._getSharedOptions(a, o), m = i.axis, p = r.axis, { spanGaps: h, segment: b } = this.options, y = Ya(h) ? h : Number.POSITIVE_INFINITY, v = this.chart._animationsDisabled || s || o === "none", k = a + n, w = t.length;
    let _ = a > 0 && this.getParsed(a - 1);
    for (let $ = 0; $ < w; ++$) {
      const S = t[$], M = v ? S : {};
      if ($ < a || $ >= k) {
        M.skip = !0;
        continue;
      }
      const I = this.getParsed($), z = Ee(I[p]), K = M[m] = i.getPixelForValue(I[m], $), D = M[p] = s || z ? r.getBasePixel() : r.getPixelForValue(l ? this.applyStack(r, I, l) : I[p], $);
      M.skip = isNaN(K) || isNaN(D) || z, M.stop = $ > 0 && Math.abs(I[m] - _[m]) > y, b && (M.parsed = I, M.raw = c.data[$]), f && (M.options = u || this.resolveDataElementOptions($, S.active ? "active" : o)), v || this.updateElement(S, $, M, o), _ = I;
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
    const y = r(t, h);
    y < l ? (i = [
      {
        element: u,
        datasetIndex: f,
        index: m
      }
    ], l = y) : y === l && i.push({
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
    const u = l.reduce((b, y) => y.box.options && y.box.options.display === !1 ? b : b + 1, 0) || 1, f = Object.freeze({
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
  const a = st(e.font, t), n = wt(e.padding);
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
  const b = i - o, y = r - s;
  if (e.isHorizontal()) {
    if (p = tt(n, s, r), Le(a)) {
      const v = Object.keys(a)[0], k = a[v];
      h = u[v].getPixelForValue(k) + b - t;
    } else a === "center" ? h = (c.bottom + c.top) / 2 + b - t : h = $s(e, a, t);
    m = r - s;
  } else {
    if (Le(a)) {
      const v = Object.keys(a)[0], k = a[v];
      p = u[v].getPixelForValue(k) - y + t;
    } else a === "center" ? p = (c.left + c.right) / 2 - y + t : p = $s(e, a, t);
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
    const u = this._getLabelSizes(), f = u.widest.width, m = u.highest.height, p = ot(this.chart.width - f, 0, this.maxWidth);
    r = t.offset ? this.maxWidth / n : p / (n - 1), f + 6 > r && (r = p / (n - (t.offset ? 0.5 : 1)), l = this.maxHeight - La(t.grid) - a.padding - Ds(t.title, this.chart.options.font), c = Math.sqrt(f * f + m * m), i = Pl(Math.min(Math.asin(ot((u.highest.height + 6) / r, -1, 1)), Math.asin(ot(l / c, -1, 1)) - Math.asin(ot(m / c, -1, 1)))), i = Math.max(o, Math.min(s, i))), this.labelRotation = i;
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
        const { first: c, last: u, widest: f, highest: m } = this._getLabelSizes(), p = n.padding * 2, h = zt(this.labelRotation), b = Math.cos(h), y = Math.sin(h);
        if (r) {
          const v = n.mirror ? 0 : y * f.width + b * m.height;
          t.height = Math.min(this.maxHeight, t.height + v + p);
        } else {
          const v = n.mirror ? 0 : b * f.width + y * m.height;
          t.width = Math.min(this.maxWidth, t.width + v + p);
        }
        this._calculatePadding(c, u, y, b);
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
    let c = 0, u = 0, f, m, p, h, b, y, v, k, w, _, $;
    for (f = 0; f < a; f += l) {
      if (h = t[f].label, b = this._resolveTickFontOptions(f), o.font = y = b.string, v = s[y] = s[y] || {
        data: {},
        gc: []
      }, k = b.lineHeight, w = _ = 0, !Ee(h) && !Ze(h))
        w = ts(o, v.data, v.gc, w, h), _ = k;
      else if (Ze(h))
        for (m = 0, p = h.length; m < p; ++m)
          $ = h[m], !Ee($) && !Ze($) && (w = ts(o, v.data, v.gc, w, $), _ += k);
      i.push(w), r.push(_), c = Math.max(w, c), u = Math.max(_, u);
    }
    nu(s, a);
    const S = i.indexOf(c), M = r.indexOf(u), I = (z) => ({
      width: i[z] || 0,
      height: r[z] || 0
    });
    return {
      first: I(0),
      last: I(a - 1),
      widest: I(S),
      highest: I(M),
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
    const a = this.axis, n = this.chart, o = this.options, { grid: s, position: i, border: r } = o, l = s.offset, c = this.isHorizontal(), f = this.ticks.length + (l ? 1 : 0), m = La(s), p = [], h = r.setContext(this.getContext()), b = h.display ? h.width : 0, y = b / 2, v = function(X) {
      return ia(n, X, b);
    };
    let k, w, _, $, S, M, I, z, K, D, P, B;
    if (i === "top")
      k = v(this.bottom), M = this.bottom - m, z = k - y, D = v(t.top) + y, B = t.bottom;
    else if (i === "bottom")
      k = v(this.top), D = t.top, B = v(t.bottom) - y, M = k + y, z = this.top + m;
    else if (i === "left")
      k = v(this.right), S = this.right - m, I = k - y, K = v(t.left) + y, P = t.right;
    else if (i === "right")
      k = v(this.left), K = t.left, P = v(t.right) - y, S = k + y, I = this.left + m;
    else if (a === "x") {
      if (i === "center")
        k = v((t.top + t.bottom) / 2 + 0.5);
      else if (Le(i)) {
        const X = Object.keys(i)[0], re = i[X];
        k = v(this.chart.scales[X].getPixelForValue(re));
      }
      D = t.top, B = t.bottom, M = k + y, z = M + m;
    } else if (a === "y") {
      if (i === "center")
        k = v((t.left + t.right) / 2);
      else if (Le(i)) {
        const X = Object.keys(i)[0], re = i[X];
        k = v(this.chart.scales[X].getPixelForValue(re));
      }
      S = k - y, I = S - m, K = t.left, P = t.right;
    }
    const H = De(o.ticks.maxTicksLimit, f), j = Math.max(1, Math.ceil(f / H));
    for (w = 0; w < f; w += j) {
      const X = this.getContext(w), re = s.setContext(X), he = r.setContext(X), Z = re.lineWidth, oe = re.color, L = he.dash || [], Y = he.dashOffset, q = re.tickWidth, F = re.tickColor, se = re.tickBorderDash || [], le = re.tickBorderDashOffset;
      _ = au(this, w, l), _ !== void 0 && ($ = ia(n, _, Z), c ? S = I = K = P = $ : M = z = D = B = $, p.push({
        tx1: S,
        ty1: M,
        tx2: I,
        ty2: z,
        x1: K,
        y1: D,
        x2: P,
        y2: B,
        width: Z,
        color: oe,
        borderDash: L,
        borderDashOffset: Y,
        tickWidth: q,
        tickColor: F,
        tickBorderDash: se,
        tickBorderDashOffset: le
      }));
    }
    return this._ticksLength = f, this._borderValue = k, p;
  }
  _computeLabelItems(t) {
    const a = this.axis, n = this.options, { position: o, ticks: s } = n, i = this.isHorizontal(), r = this.ticks, { align: l, crossAlign: c, padding: u, mirror: f } = s, m = La(n.grid), p = m + u, h = f ? -u : p, b = -zt(this.labelRotation), y = [];
    let v, k, w, _, $, S, M, I, z, K, D, P, B = "middle";
    if (o === "top")
      S = this.bottom - h, M = this._getXAxisLabelAlignment();
    else if (o === "bottom")
      S = this.top + h, M = this._getXAxisLabelAlignment();
    else if (o === "left") {
      const j = this._getYAxisLabelAlignment(m);
      M = j.textAlign, $ = j.x;
    } else if (o === "right") {
      const j = this._getYAxisLabelAlignment(m);
      M = j.textAlign, $ = j.x;
    } else if (a === "x") {
      if (o === "center")
        S = (t.top + t.bottom) / 2 + p;
      else if (Le(o)) {
        const j = Object.keys(o)[0], X = o[j];
        S = this.chart.scales[j].getPixelForValue(X) + p;
      }
      M = this._getXAxisLabelAlignment();
    } else if (a === "y") {
      if (o === "center")
        $ = (t.left + t.right) / 2 - p;
      else if (Le(o)) {
        const j = Object.keys(o)[0], X = o[j];
        $ = this.chart.scales[j].getPixelForValue(X);
      }
      M = this._getYAxisLabelAlignment(m).textAlign;
    }
    a === "y" && (l === "start" ? B = "top" : l === "end" && (B = "bottom"));
    const H = this._getLabelSizes();
    for (v = 0, k = r.length; v < k; ++v) {
      w = r[v], _ = w.label;
      const j = s.setContext(this.getContext(v));
      I = this.getPixelForTick(v) + s.labelOffset, z = this._resolveTickFontOptions(v), K = z.lineHeight, D = Ze(_) ? _.length : 1;
      const X = D / 2, re = j.color, he = j.textStrokeColor, Z = j.textStrokeWidth;
      let oe = M;
      i ? ($ = I, M === "inner" && (v === k - 1 ? oe = this.options.reverse ? "left" : "right" : v === 0 ? oe = this.options.reverse ? "right" : "left" : oe = "center"), o === "top" ? c === "near" || b !== 0 ? P = -D * K + K / 2 : c === "center" ? P = -H.highest.height / 2 - X * K + K : P = -H.highest.height + K / 2 : c === "near" || b !== 0 ? P = K / 2 : c === "center" ? P = H.highest.height / 2 - X * K : P = H.highest.height - D * K, f && (P *= -1), b !== 0 && !j.showLabelBackdrop && ($ += K / 2 * Math.sin(b))) : (S = I, P = (1 - D) * K / 2);
      let L;
      if (j.showLabelBackdrop) {
        const Y = wt(j.backdropPadding), q = H.heights[v], F = H.widths[v];
        let se = P - Y.top, le = 0 - Y.left;
        switch (B) {
          case "middle":
            se -= q / 2;
            break;
          case "bottom":
            se -= q;
            break;
        }
        switch (M) {
          case "center":
            le -= F / 2;
            break;
          case "right":
            le -= F;
            break;
          case "inner":
            v === k - 1 ? le -= F : v > 0 && (le -= F / 2);
            break;
        }
        L = {
          left: le,
          top: se,
          width: F + Y.width,
          height: q + Y.height,
          color: j.backdropColor
        };
      }
      y.push({
        label: _,
        font: z,
        textOffset: P,
        options: {
          rotation: b,
          color: re,
          strokeColor: he,
          strokeWidth: Z,
          textAlign: oe,
          textBaseline: B,
          translation: [
            $,
            S
          ],
          backdrop: L
        }
      });
    }
    return y;
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
    const s = st(n.font), i = wt(n.padding), r = n.align;
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
    return st(a.font);
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
      const p = 2 * m * m, h = -p * Math.cos(a + Oe / 2) + o, b = -p * Math.sin(a + Oe / 2) + s, y = p * Math.cos(n + Oe / 2) + o, v = p * Math.sin(n + Oe / 2) + s;
      e.lineTo(h, b), e.lineTo(y, v);
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
    return ot(l, 0, Math.min(s, c));
  };
  return {
    outerStart: r(o.outerStart),
    outerEnd: r(o.outerEnd),
    innerStart: ot(o.innerStart, 0, i),
    innerEnd: ot(o.innerEnd, 0, i)
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
    const j = u > 0 ? u - n : 0, X = f > 0 ? f - n : 0, re = (j + X) / 2, he = re !== 0 ? h * re / (re + n) : h;
    p = (h - he) / 2;
  }
  const b = Math.max(1e-3, h * f - a / Oe) / f, y = (h - b) / 2, v = l + y + p, k = o - y - p, { outerStart: w, outerEnd: _, innerStart: $, innerEnd: S } = Pu(t, m, f, k - v), M = f - w, I = f - _, z = v + w / M, K = k - _ / I, D = m + $, P = m + S, B = v + $ / D, H = k - S / P;
  if (e.beginPath(), s) {
    const j = (z + K) / 2;
    if (e.arc(i, r, f, z, j), e.arc(i, r, f, j, K), _ > 0) {
      const Z = va(I, K, i, r);
      e.arc(Z.x, Z.y, _, K, k + Qe);
    }
    const X = va(P, k, i, r);
    if (e.lineTo(X.x, X.y), S > 0) {
      const Z = va(P, H, i, r);
      e.arc(Z.x, Z.y, S, k + Qe, H + Math.PI);
    }
    const re = (k - S / m + (v + $ / m)) / 2;
    if (e.arc(i, r, m, k - S / m, re, !0), e.arc(i, r, m, re, v + $ / m, !0), $ > 0) {
      const Z = va(D, B, i, r);
      e.arc(Z.x, Z.y, $, B + Math.PI, v - Qe);
    }
    const he = va(M, v, i, r);
    if (e.lineTo(he.x, he.y), w > 0) {
      const Z = va(M, z, i, r);
      e.arc(Z.x, Z.y, w, v - Qe, z);
    }
  } else {
    e.moveTo(i, r);
    const j = Math.cos(z) * f + i, X = Math.sin(z) * f + r;
    e.lineTo(j, X);
    const re = Math.cos(K) * f + i, he = Math.sin(K) * f + r;
    e.lineTo(re, he);
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
    for (let y = 0; y < s; ++y)
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
    ], n), m = (this.options.spacing + this.options.borderWidth) / 2, p = De(f, l - r), h = qa(s, r, l) && r !== l, b = p >= Ue || h, y = qt(i, c + m, u + m);
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
  let u = 0, f = 0, m, p, h, b, y, v;
  const k = (_) => (i + (c ? r - _ : _)) % s, w = () => {
    b !== y && (e.lineTo(u, y), e.lineTo(u, b), e.lineTo(u, v));
  };
  for (l && (p = o[k(0)], e.moveTo(p.x, p.y)), m = 0; m <= r; ++m) {
    if (p = o[k(m)], p.skip)
      continue;
    const _ = p.x, $ = p.y, S = _ | 0;
    S === h ? ($ < b ? b = $ : $ > y && (y = $), u = (f * u + _) / ++f) : (w(), e.lineTo(_, $), h = S, f = 0, b = y = $), v = $;
  }
  w();
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
      const b = Math.abs((o - p[a]) / (h[a] - p[a])), y = l(p, h, b, n.stepped);
      y[a] = t[a], r.push(y);
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
  return e ? 0 : ot(t, a, n);
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
    const n = t.labels, o = st(n.font), s = o.size, i = this._computeTitleHeight(), { boxWidth: r, itemHeight: l } = Vs(n, s);
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
      const y = n + a / 2 + s.measureText(h.text).width;
      (b === 0 || c[c.length - 1] + y + 2 * r > i) && (f += u, c[c.length - (b > 0 ? 0 : 1)] = 0, p += u, m++), l[b] = {
        left: 0,
        top: p,
        row: m,
        width: y,
        height: o
      }, c[c.length - 1] += y + r;
    }), f;
  }
  _fitCols(t, a, n, o) {
    const { ctx: s, maxHeight: i, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], c = this.columnSizes = [], u = i - t;
    let f = r, m = 0, p = 0, h = 0, b = 0;
    return this.legendItems.forEach((y, v) => {
      const { itemWidth: k, itemHeight: w } = ah(n, a, s, y, o);
      v > 0 && p + w + 2 * r > u && (f += m + r, c.push({
        width: m,
        height: p
      }), h += m + r, b++, m = p = 0), l[v] = {
        left: h,
        top: p,
        col: b,
        width: k,
        height: w
      }, m = Math.max(m, k), p += w + r;
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
    const { options: t, columnSizes: a, lineWidths: n, ctx: o } = this, { align: s, labels: i } = t, r = Ye.color, l = wa(t.rtl, this.left, this.width), c = st(i.font), { padding: u } = i, f = c.size, m = f / 2;
    let p;
    this.drawTitle(), o.textAlign = l.textAlign("left"), o.textBaseline = "middle", o.lineWidth = 0.5, o.font = c.string;
    const { boxWidth: h, boxHeight: b, itemHeight: y } = Vs(i, f), v = function(S, M, I) {
      if (isNaN(h) || h <= 0 || isNaN(b) || b < 0)
        return;
      o.save();
      const z = De(I.lineWidth, 1);
      if (o.fillStyle = De(I.fillStyle, r), o.lineCap = De(I.lineCap, "butt"), o.lineDashOffset = De(I.lineDashOffset, 0), o.lineJoin = De(I.lineJoin, "miter"), o.lineWidth = z, o.strokeStyle = De(I.strokeStyle, r), o.setLineDash(De(I.lineDash, [])), i.usePointStyle) {
        const K = {
          radius: b * Math.SQRT2 / 2,
          pointStyle: I.pointStyle,
          rotation: I.rotation,
          borderWidth: z
        }, D = l.xPlus(S, h / 2), P = M + m;
        Ei(o, K, D, P, i.pointStyleWidth && h);
      } else {
        const K = M + Math.max((f - b) / 2, 0), D = l.leftForLtr(S, h), P = _a(I.borderRadius);
        o.beginPath(), Object.values(P).some((B) => B !== 0) ? Mn(o, {
          x: D,
          y: K,
          w: h,
          h: b,
          radius: P
        }) : o.rect(D, K, h, b), o.fill(), z !== 0 && o.stroke();
      }
      o.restore();
    }, k = function(S, M, I) {
      Ga(o, I.text, S, M + y / 2, c, {
        strikethrough: I.hidden,
        textAlign: l.textAlign(I.textAlign)
      });
    }, w = this.isHorizontal(), _ = this._computeTitleHeight();
    w ? p = {
      x: tt(s, this.left + u, this.right - n[0]),
      y: this.top + u + _,
      line: 0
    } : p = {
      x: this.left + u,
      y: tt(s, this.top + _ + u, this.bottom - a[0].height),
      line: 0
    }, Hi(this.ctx, t.textDirection);
    const $ = y + u;
    this.legendItems.forEach((S, M) => {
      o.strokeStyle = S.fontColor, o.fillStyle = S.fontColor;
      const I = o.measureText(S.text).width, z = l.textAlign(S.textAlign || (S.textAlign = i.textAlign)), K = h + m + I;
      let D = p.x, P = p.y;
      l.setWidth(this.width), w ? M > 0 && D + K + u > this.right && (P = p.y += $, p.line++, D = p.x = tt(s, this.left + u, this.right - n[p.line])) : M > 0 && P + $ > this.bottom && (D = p.x = D + a[p.line].width + u, p.line++, P = p.y = tt(s, this.top + _ + u, this.bottom - a[p.line].height));
      const B = l.x(D);
      if (v(B, P, S), D = Nl(z, D + h + m, w ? D + K : this.right, t.rtl), k(l.x(D), P, S), w)
        p.x += K + u;
      else if (typeof S.text != "string") {
        const H = c.lineHeight;
        p.y += rr(S, H) + u;
      } else
        p.y += $;
    }), Wi(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, a = t.title, n = st(a.font), o = wt(a.padding);
    if (!a.display)
      return;
    const s = wa(t.rtl, this.left, this.width), i = this.ctx, r = a.position, l = n.size / 2, c = o.top + l;
    let u, f = this.left, m = this.width;
    if (this.isHorizontal())
      m = Math.max(...this.lineWidths), u = this.top + c, f = tt(t.align, f, this.right - m);
    else {
      const h = this.columnSizes.reduce((b, y) => Math.max(b, y.height), 0);
      u = c + tt(t.align, this.top, this.bottom - h - t.labels.padding - this._computeTitleHeight());
    }
    const p = tt(r, f, f + m);
    i.textAlign = s.textAlign(vo(r)), i.textBaseline = "middle", i.strokeStyle = a.color, i.fillStyle = a.color, i.font = n.string, Ga(i, a.text, p, u, n);
  }
  _computeTitleHeight() {
    const t = this.options.title, a = st(t.font), n = wt(t.padding);
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
    const s = o * st(n.font).lineHeight + this._padding.height;
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
    const n = st(a.font), s = n.lineHeight / 2 + this._padding.top, { titleX: i, titleY: r, maxWidth: l, rotation: c } = this._drawArgs(s);
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
  const a = e.chart.ctx, { body: n, footer: o, title: s } = e, { boxWidth: i, boxHeight: r } = t, l = st(t.bodyFont), c = st(t.titleFont), u = st(t.footerFont), f = s.length, m = o.length, p = n.length, h = wt(t.padding);
  let b = h.height, y = 0, v = n.reduce((_, $) => _ + $.before.length + $.lines.length + $.after.length, 0);
  if (v += e.beforeBody.length + e.afterBody.length, f && (b += f * c.lineHeight + (f - 1) * t.titleSpacing + t.titleMarginBottom), v) {
    const _ = t.displayColors ? Math.max(r, l.lineHeight) : l.lineHeight;
    b += p * _ + (v - p) * l.lineHeight + (v - 1) * t.bodySpacing;
  }
  m && (b += t.footerMarginTop + m * u.lineHeight + (m - 1) * t.footerSpacing);
  let k = 0;
  const w = function(_) {
    y = Math.max(y, a.measureText(_).width + k);
  };
  return a.save(), a.font = c.string, Fe(e.title, w), a.font = l.string, Fe(e.beforeBody.concat(e.afterBody), w), k = t.displayColors ? i + 2 + t.boxPadding : 0, Fe(n, (_) => {
    Fe(_.before, w), Fe(_.lines, w), Fe(_.after, w);
  }), k = 0, a.font = u.string, Fe(e.footer, w), a.restore(), y += h.width, {
    width: y,
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
    x: ot(h, 0, n.width - t.width),
    y: ot(b, 0, n.height - t.height)
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
function ct(e, t, a, n) {
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
    const { callbacks: n } = a, o = ct(n, "beforeTitle", this, t), s = ct(n, "title", this, t), i = ct(n, "afterTitle", this, t);
    let r = [];
    return r = Bt(r, Ot(o)), r = Bt(r, Ot(s)), r = Bt(r, Ot(i)), r;
  }
  getBeforeBody(t, a) {
    return Ws(ct(a.callbacks, "beforeBody", this, t));
  }
  getBody(t, a) {
    const { callbacks: n } = a, o = [];
    return Fe(t, (s) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, r = Ks(n, s);
      Bt(i.before, Ot(ct(r, "beforeLabel", this, s))), Bt(i.lines, ct(r, "label", this, s)), Bt(i.after, Ot(ct(r, "afterLabel", this, s))), o.push(i);
    }), o;
  }
  getAfterBody(t, a) {
    return Ws(ct(a.callbacks, "afterBody", this, t));
  }
  getFooter(t, a) {
    const { callbacks: n } = a, o = ct(n, "beforeFooter", this, t), s = ct(n, "footer", this, t), i = ct(n, "afterFooter", this, t);
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
      o.push(ct(f, "labelColor", this, u)), s.push(ct(f, "labelPointStyle", this, u)), i.push(ct(f, "labelTextColor", this, u));
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
    let y, v, k, w, _, $;
    return s === "center" ? (_ = p + b / 2, o === "left" ? (y = m, v = y - i, w = _ + i, $ = _ - i) : (y = m + h, v = y + i, w = _ - i, $ = _ + i), k = y) : (o === "left" ? v = m + Math.max(l, u) + i : o === "right" ? v = m + h - Math.max(c, f) - i : v = this.caretX, s === "top" ? (w = p, _ = w - i, y = v - i, k = v + i) : (w = p + b, _ = w + i, y = v + i, k = v - i), $ = w), {
      x1: y,
      x2: v,
      x3: k,
      y1: w,
      y2: _,
      y3: $
    };
  }
  drawTitle(t, a, n) {
    const o = this.title, s = o.length;
    let i, r, l;
    if (s) {
      const c = wa(n.rtl, this.x, this.width);
      for (t.x = pn(this, n.titleAlign, n), a.textAlign = c.textAlign(n.titleAlign), a.textBaseline = "middle", i = st(n.titleFont), r = n.titleSpacing, a.fillStyle = n.titleColor, a.font = i.string, l = 0; l < s; ++l)
        a.fillText(o[l], c.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + r, l + 1 === s && (t.y += n.titleMarginBottom - r);
    }
  }
  _drawColorBox(t, a, n, o, s) {
    const i = this.labelColors[n], r = this.labelPointStyles[n], { boxHeight: l, boxWidth: c } = s, u = st(s.bodyFont), f = pn(this, "left", s), m = o.x(f), p = l < u.lineHeight ? (u.lineHeight - l) / 2 : 0, h = a.y + p;
    if (s.usePointStyle) {
      const b = {
        radius: Math.min(c, l) / 2,
        pointStyle: r.pointStyle,
        rotation: r.rotation,
        borderWidth: 1
      }, y = o.leftForLtr(m, c) + c / 2, v = h + l / 2;
      t.strokeStyle = s.multiKeyBackground, t.fillStyle = s.multiKeyBackground, oo(t, b, y, v), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, oo(t, b, y, v);
    } else {
      t.lineWidth = Le(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const b = o.leftForLtr(m, c), y = o.leftForLtr(o.xPlus(m, 1), c - 2), v = _a(i.borderRadius);
      Object.values(v).some((k) => k !== 0) ? (t.beginPath(), t.fillStyle = s.multiKeyBackground, Mn(t, {
        x: b,
        y: h,
        w: c,
        h: l,
        radius: v
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), Mn(t, {
        x: y,
        y: h + 1,
        w: c - 2,
        h: l - 2,
        radius: v
      }), t.fill()) : (t.fillStyle = s.multiKeyBackground, t.fillRect(b, h, c, l), t.strokeRect(b, h, c, l), t.fillStyle = i.backgroundColor, t.fillRect(y, h + 1, c - 2, l - 2));
    }
    t.fillStyle = this.labelTextColors[n];
  }
  drawBody(t, a, n) {
    const { body: o } = this, { bodySpacing: s, bodyAlign: i, displayColors: r, boxHeight: l, boxWidth: c, boxPadding: u } = n, f = st(n.bodyFont);
    let m = f.lineHeight, p = 0;
    const h = wa(n.rtl, this.x, this.width), b = function(I) {
      a.fillText(I, h.x(t.x + p), t.y + m / 2), t.y += m + s;
    }, y = h.textAlign(i);
    let v, k, w, _, $, S, M;
    for (a.textAlign = i, a.textBaseline = "middle", a.font = f.string, t.x = pn(this, y, n), a.fillStyle = n.bodyColor, Fe(this.beforeBody, b), p = r && y !== "right" ? i === "center" ? c / 2 + u : c + 2 + u : 0, _ = 0, S = o.length; _ < S; ++_) {
      for (v = o[_], k = this.labelTextColors[_], a.fillStyle = k, Fe(v.before, b), w = v.lines, r && w.length && (this._drawColorBox(a, t, _, h, n), m = Math.max(f.lineHeight, l)), $ = 0, M = w.length; $ < M; ++$)
        b(w[$]), m = f.lineHeight;
      Fe(v.after, b);
    }
    p = 0, m = f.lineHeight, Fe(this.afterBody, b), t.y -= s;
  }
  drawFooter(t, a, n) {
    const o = this.footer, s = o.length;
    let i, r;
    if (s) {
      const l = wa(n.rtl, this.x, this.width);
      for (t.x = pn(this, n.footerAlign, n), t.y += n.footerMarginTop, a.textAlign = l.textAlign(n.footerAlign), a.textBaseline = "middle", i = st(n.footerFont), a.fillStyle = n.footerColor, a.font = i.string, r = 0; r < s; ++r)
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
const ph = (e, t) => e === null ? null : ot(Math.round(e), 0, t);
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
  const a = [], { bounds: o, step: s, min: i, max: r, precision: l, count: c, maxTicks: u, maxDigits: f, includeBounds: m } = e, p = s || 1, h = u - 1, { min: b, max: y } = t, v = !Ee(i), k = !Ee(r), w = !Ee(c), _ = (y - b) / (f + 1);
  let $ = qo((y - b) / h / p) * p, S, M, I, z;
  if ($ < 1e-14 && !v && !k)
    return [
      {
        value: b
      },
      {
        value: y
      }
    ];
  z = Math.ceil(y / $) - Math.floor(b / $), z > h && ($ = qo(z * $ / h / p) * p), Ee(l) || (S = Math.pow(10, l), $ = Math.ceil($ * S) / S), o === "ticks" ? (M = Math.floor(b / $) * $, I = Math.ceil(y / $) * $) : (M = b, I = y), v && k && s && Ll((r - i) / s, $ / 1e3) ? (z = Math.round(Math.min((r - i) / $, u)), $ = (r - i) / z, M = i, I = r) : w ? (M = v ? i : M, I = k ? r : I, z = c - 1, $ = (I - M) / z) : (z = (I - M) / $, Na(z, Math.round(z), $ / 1e3) ? z = Math.round(z) : z = Math.ceil(z));
  const K = Math.max(Xo($), Xo(M));
  S = Math.pow(10, Ee(l) ? K : l), M = Math.round(M * S) / S, I = Math.round(I * S) / S;
  let D = 0;
  for (v && (m && M !== i ? (a.push({
    value: i
  }), M < i && D++, Na(Math.round((M + D * $) * S) / S, i, qs(i, _, e)) && D++) : M < i && D++); D < z; ++D) {
    const P = Math.round((M + D * $) * S) / S;
    if (k && P > r)
      break;
    a.push({
      value: P
    });
  }
  return k && m && I !== r ? a.length && Na(a[a.length - 1].value, r, qs(r, _, e)) ? a[a.length - 1].value = r : a.push({
    value: r
  }) : (!k || I === r) && a.push({
    value: I
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
}, ut = /* @__PURE__ */ Object.keys(En);
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
  const o = ut.length;
  for (let s = ut.indexOf(e); s < o - 1; ++s) {
    const i = En[ut[s]], r = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((a - t) / (r * i.size)) <= n)
      return ut[s];
  }
  return ut[o - 1];
}
function yh(e, t, a, n, o) {
  for (let s = ut.length - 1; s >= ut.indexOf(a); s--) {
    const i = ut[s];
    if (En[i].common && e._adapter.diff(o, n, i) >= t - 1)
      return i;
  }
  return ut[a ? ut.indexOf(a) : 0];
}
function xh(e) {
  for (let t = ut.indexOf(e) + 1, a = ut.length; t < a; ++t)
    if (En[ut[t]].common)
      return ut[t];
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
    a = ot(a, 0, i), n = ot(n, 0, i), this._offsets = {
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
class EM extends ei {
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
const Dh = ue({
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
    return Je(i), it(r), Te([
      () => e.options,
      () => e.data
    ], (c, u) => {
      let [f, m] = c, [p, h] = u;
      const b = Jn(s.value);
      if (!b)
        return;
      let y = !1;
      if (f) {
        const v = ya(f), k = ya(p);
        v && v !== k && (Sh(b, v), y = !0);
      }
      if (m) {
        const v = ya(m.labels), k = ya(h.labels), w = ya(m.datasets), _ = ya(h.datasets);
        v !== k && (gr(b.config.data, v), y = !0), w && w !== _ && (mr(b.config.data, w, e.datasetIdKey), y = !0);
      }
      y && Ke(() => {
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
  return ea.register(t), ue({
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
  const n = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", o = C(() => e?.value ? e.value : t.value), s = C(() => o.value === "dark"), i = C(() => s.value ? ai : ti), r = () => {
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
  }), it(() => {
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
const dt = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Ih = ["titleFont", "bodyFont", "footerFont"];
function br(e, t = dt) {
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
const ni = 10, Eh = /* @__PURE__ */ ue({
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
    ea.register(ur, hr, eh, cr, Bo, To), ea.defaults.font.family = dt;
    const { isDark: n, colors: o } = Me($e(a, "theme")), s = C(() => a.data), i = (m) => typeof m == "string" ? m.charAt(0).toUpperCase() + m.slice(1).toLowerCase() : m, r = (m) => typeof m != "string" ? m : a.uppercaseLegendLabels ? m.toUpperCase() : i(m), l = (m, p) => m.length <= p ? m : `${m.slice(0, Math.max(1, p - 1))}…`;
    function c(m, p) {
      if (p == null) return m;
      if (Array.isArray(p) || typeof p != "object" || m == null || Array.isArray(m) || typeof m != "object") return p;
      const h = { ...m };
      for (const b of Object.keys(p)) {
        const y = p[b];
        y !== void 0 && (h[b] = c(m[b], y));
      }
      return h;
    }
    const u = C(() => {
      const m = {
        font: {
          family: dt
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
                family: dt,
                size: 13,
                weight: "500"
              },
              padding: 12,
              boxWidth: ni,
              boxHeight: ni,
              usePointStyle: !1,
              generateLabels: function(h) {
                return h.data.datasets.map((y, v) => {
                  const k = Array.isArray(y.backgroundColor) ? y.backgroundColor[0] : y.backgroundColor, w = Array.isArray(y.borderColor) ? y.borderColor[0] : y.borderColor, _ = typeof w == "string" && w.length > 0 ? w : typeof k == "string" && k.length > 0 ? k : o.value.textSecondary;
                  return {
                    text: r(y.label || ""),
                    fillStyle: typeof k == "string" ? k : _,
                    strokeStyle: _,
                    lineWidth: 0,
                    fontColor: _,
                    hidden: !h.isDatasetVisible(v),
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
              family: dt,
              size: 13,
              weight: "600"
            },
            bodyFont: {
              family: dt,
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
                const v = (h.chart?.options?.indexAxis ?? "x") === "y" ? h.parsed.x : h.parsed.y;
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
              maxTicksLimit: Qa,
              font: {
                family: dt,
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
                family: dt,
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
        const { beginAtZero: h, ticks: b, ...y } = p.scales.y ?? {}, v = a.data.labels?.length ?? 0, k = a.categoryLabelMaxLength ?? 20;
        p.scales.y = {
          type: "category",
          ...y,
          ticks: {
            ...b,
            autoSkip: !1,
            maxTicksLimit: v > 0 ? v : Qa,
            callback: function(w) {
              const _ = this.getLabelForValue(w), $ = typeof _ == "string" ? _ : String(_ ?? "");
              return l($, k);
            }
          }
        };
      }
      return br(
        pr(p)
      );
    }), f = C(() => a.heightPx ?? 230);
    return t({ isDark: n }), (m, p) => (g(), x("div", {
      class: "relative w-full shrink-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]",
      style: we({ height: `${f.value}px` })
    }, [
      N(T(Ah), {
        data: s.value,
        options: u.value
      }, null, 8, ["data", "options"])
    ], 4));
  }
}), ve = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [n, o] of t)
    a[n] = o;
  return a;
}, Mt = /* @__PURE__ */ ve(Eh, [["__scopeId", "data-v-1d64fb88"]]), Fh = { class: "chart-line-root flex h-full min-h-[230px] w-full shrink-0 flex-col bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] min-w-0" }, Oh = { class: "chart-line-canvas-host relative min-h-0 w-full flex-1" }, Vh = {
  key: 0,
  class: "chart-line-indicators mt-0 flex shrink-0 list-none flex-nowrap items-center justify-center gap-x-4 overflow-x-auto overflow-y-hidden px-1 pb-0.5 pt-0.5",
  role: "list"
}, zh = ["aria-pressed", "aria-label", "onClick"], Nh = {
  class: "inline-flex shrink-0 items-center",
  "aria-hidden": "true"
}, jh = /* @__PURE__ */ ue({
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
    ), ea.defaults.font.family = dt;
    const n = ne(null), { isDark: o, colors: s } = Me($e(a, "theme")), i = C(() => s.value.bgCard), r = C(() => {
      const y = i.value;
      return {
        labels: a.data.labels,
        datasets: a.data.datasets.map((v) => {
          const k = v.borderColor, w = Array.isArray(k) ? k[0] : k, _ = typeof w == "string" && w.length > 0 ? w : s.value.textSecondary, $ = v.pointBackgroundColor !== void 0 ? v.pointBackgroundColor : y, S = v.pointHoverBackgroundColor !== void 0 ? v.pointHoverBackgroundColor : $, M = v.pointBorderWidth ?? 2, I = v.pointHoverBorderWidth ?? M;
          return {
            ...v,
            fill: v.fill ?? !1,
            clip: v.clip ?? !1,
            pointBackgroundColor: $,
            pointHoverBackgroundColor: S,
            pointBorderColor: v.pointBorderColor ?? _,
            pointHoverBorderColor: v.pointHoverBorderColor ?? _,
            pointBorderWidth: M,
            pointHoverBorderWidth: I
          };
        })
      };
    }), l = (y) => typeof y == "string" ? y.charAt(0).toUpperCase() + y.slice(1).toLowerCase() : y, c = (y) => typeof y != "string" ? y : a.uppercaseLegendLabels ? y.toUpperCase() : l(y);
    function u(y) {
      const v = y.borderColor, k = Array.isArray(v) ? v[0] : v;
      return typeof k == "string" && k.length > 0 ? k : s.value.textSecondary;
    }
    const f = C(
      () => r.value.datasets.map((y, v) => ({
        key: `${y.label ?? "dataset"}-${v}`,
        label: c(y.label || ""),
        color: u(y)
      }))
    ), m = ne([]);
    Te(
      () => r.value.datasets.length,
      (y) => {
        const v = Array.from({ length: y }, (k, w) => m.value[w] ?? !0);
        m.value = v;
      },
      { immediate: !0 }
    );
    function p(y) {
      const k = n.value?.chart;
      if (!k || y < 0 || y >= k.data.datasets.length) return;
      const w = !k.isDatasetVisible(y);
      k.setDatasetVisibility(y, w), m.value[y] = w, k.update();
    }
    function h(y, v) {
      if (v == null) return y;
      if (Array.isArray(v) || typeof v != "object" || y == null || Array.isArray(y) || typeof y != "object") return v;
      const k = { ...y };
      for (const w of Object.keys(v)) {
        const _ = v[w];
        _ !== void 0 && (k[w] = h(y[w], _));
      }
      return k;
    }
    const b = C(() => {
      const y = {
        font: {
          family: dt
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
              family: dt,
              size: 14,
              weight: "600"
            },
            bodyFont: {
              family: dt,
              size: 13
            },
            callbacks: {
              title: function(w) {
                return w.length > 0 ? String(l(w[0].label)) : "";
              },
              label: function(w) {
                let _ = String(l(w.dataset.label || ""));
                return _ && (_ += ": "), w.parsed.y !== null && (_ += w.parsed.y), _;
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
                family: dt,
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
                family: dt,
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
      }, v = a.options ? h(y, a.options) : y;
      return br(
        pr(v)
      );
    });
    return t({ isDark: o }), (y, v) => (g(), x("div", Fh, [
      d("div", Oh, [
        N(T(Th), {
          ref_key: "lineChartRef",
          ref: n,
          data: r.value,
          options: b.value
        }, null, 8, ["data", "options"])
      ]),
      f.value.length > 0 ? (g(), x("ul", Vh, [
        (g(!0), x(de, null, pe(f.value, (k, w) => (g(), x("li", {
          key: k.key,
          role: "listitem"
        }, [
          d("button", {
            type: "button",
            class: G(["inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[11px] font-medium leading-snug transition-opacity outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-secondary)] dark:focus-visible:ring-offset-[#1a1a1d]", m.value[w] !== !1 ? "opacity-100" : "opacity-45 line-through"]),
            style: we({ color: k.color }),
            "aria-pressed": m.value[w] !== !1,
            "aria-label": `${k.label}. ${m.value[w] !== !1 ? "Visible" : "Oculta"}. Pulsa para alternar.`,
            onClick: (_) => p(w)
          }, [
            d("span", Nh, [
              v[0] || (v[0] = d("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1)),
              d("span", {
                class: "relative z-[1] box-border size-2 shrink-0 rounded-full border-2 bg-transparent",
                style: we({ borderColor: k.color })
              }, null, 4),
              v[1] || (v[1] = d("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1))
            ]),
            d("span", null, A(k.label), 1)
          ], 14, zh)
        ]))), 128))
      ])) : E("", !0)
    ]));
  }
}), bt = /* @__PURE__ */ ve(jh, [["__scopeId", "data-v-426e23d5"]]), Hh = { class: "chart-container" }, Wh = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Kh = /* @__PURE__ */ ue({
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
                const p = l.getDatasetMeta(0).controller.getStyle(f), b = c.datasets[0].data[f], y = typeof p.backgroundColor == "string" && p.backgroundColor.length > 0 ? p.backgroundColor : o.value.textSecondary;
                return {
                  text: `${i(u)}: ${b}`,
                  fillStyle: p.backgroundColor,
                  strokeStyle: p.borderColor,
                  lineWidth: p.borderWidth,
                  lineDash: p.borderDash,
                  lineDashOffset: p.borderDashOffset,
                  lineJoin: p.borderJoinStyle,
                  fontColor: y,
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
}), Fn = /* @__PURE__ */ ve(Kh, [["__scopeId", "data-v-0f7806d6"]]), Uh = { class: "chart-container" }, Yh = ["viewBox"], qh = ["transform"], Xh = ["x", "width", "fill", "stroke"], Gh = ["fill"], Zh = ["x1", "y1", "x2", "y2", "stroke"], Qh = ["points", "fill"], Jh = ["x1", "y1", "x2", "y2", "stroke"], ef = ["x", "y", "fill"], tf = ["x1", "y1", "x2", "y2", "stroke"], af = ["points", "fill"], nf = ["transform"], of = ["y1", "y2"], sf = ["y1", "y2"], rf = ["y1", "y2"], lf = ["y1", "y2"], cf = ["y", "height"], df = ["y1", "y2"], uf = ["y1", "y2"], hf = ["y1", "y2"], ff = ["y1", "y2"], gf = ["y", "height"], mf = ["cy", "stroke", "onMouseenter"], pf = ["cy", "stroke", "onMouseenter"], bf = ["cy", "stroke", "onMouseenter"], vf = ["cy", "stroke", "onMouseenter"], yf = ["y1", "y2", "onMouseenter"], xf = ["y1", "y2", "onMouseenter"], kf = ["x", "y", "fill"], _f = ["x", "y", "fill"], wf = ["transform"], Cf = { transform: "translate(-200, 0)" }, $f = ["stroke"], Sf = ["fill"], Mf = { transform: "translate(-130, 0)" }, Df = ["stroke"], Af = ["fill"], Tf = { transform: "translate(-60, 0)" }, Bf = ["stroke"], Lf = ["fill"], Rf = { transform: "translate(10, 0)" }, Pf = ["stroke"], If = ["fill"], Ef = { transform: "translate(80, 0)" }, Ff = ["fill"], Of = { transform: "translate(150, 0)" }, Vf = ["fill"], zf = /* @__PURE__ */ ue({
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
    })), s = ne({
      visible: !1,
      x: 0,
      y: 0,
      text: ""
    }), i = (m) => typeof m == "string" ? m.charAt(0).toUpperCase() + m.slice(1).toLowerCase() : m, r = (m, p) => {
      const h = m.currentTarget.closest("svg");
      if (!h) return;
      const b = h.getBoundingClientRect(), y = h.createSVGPoint();
      y.x = m.clientX - b.left, y.y = m.clientY - b.top, s.value = {
        visible: !0,
        x: y.x,
        y: y.y - 20,
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
    }, f = C(() => {
      const m = [], h = a.chartHeight - a.chartMargin - a.chartBottomMargin;
      for (let b = 1; b <= 10; b++) {
        const y = b, v = (y - 1) / 9, k = a.chartMargin + h - v * h;
        m.push({ value: y, y: k });
      }
      return m;
    });
    return t({ isDark: n }), (m, p) => (g(), x("div", Uh, [
      (g(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: we(`min-height: ${e.chartHeight}px;`),
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
        ], 8, qh)) : E("", !0),
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
        (g(!0), x(de, null, pe(f.value, (h, b) => (g(), x(de, { key: b }, [
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
        (g(!0), x(de, null, pe(e.boxplotData, (h, b) => (g(), x(de, { key: b }, [
          d("g", {
            transform: `translate(${h.centerX}, 0)`
          }, [
            h.isTotal ? (g(), x(de, { key: 0 }, [
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
            ], 64)) : (g(), x(de, { key: 1 }, [
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
              onMouseenter: (y) => r(y, `Min: ${h.min.toFixed(1)}`),
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
              onMouseenter: (y) => r(y, `Q1: ${h.q1.toFixed(1)}`),
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
              onMouseenter: (y) => r(y, `Q3: ${h.q3.toFixed(1)}`),
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
              onMouseenter: (y) => r(y, `Max: ${h.max.toFixed(1)}`),
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
              onMouseenter: (y) => r(y, `Median: ${h.median.toFixed(1)}`),
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
              onMouseenter: (y) => r(y, `Avg: ${h.average.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, xf)) : E("", !0)
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
          }, " n=" + A(h.responseCount), 9, _f)) : E("", !0)
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
        ], 8, wf)) : E("", !0)
      ], 44, Yh))
    ]));
  }
}), Nf = /* @__PURE__ */ ve(zf, [["__scopeId", "data-v-9ac5c075"]]), jf = { class: "chart-container" }, Hf = ["viewBox"], Wf = ["x1", "y1", "x2", "y2", "stroke"], Kf = ["points", "fill"], Uf = ["x1", "y1", "x2", "y2", "stroke"], Yf = ["x1", "y1", "x2", "y2", "stroke"], qf = ["x", "y", "fill"], Xf = ["x", "y", "fill", "transform"], Gf = ["x1", "y1", "x2", "y2", "stroke"], Zf = ["points", "fill"], Qf = ["transform"], Jf = ["y1", "y2", "stroke", "onMouseenter"], eg = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], tg = ["x1", "y1", "x2", "y2", "onMouseenter"], ag = ["x1", "y1", "x2", "y2", "onMouseenter"], ng = ["cy", "stroke", "onMouseenter"], og = ["cy", "stroke", "onMouseenter"], sg = ["x", "y", "fill"], ig = ["x", "y", "fill"], rg = ["transform"], lg = { transform: "translate(-180, 0)" }, cg = ["stroke"], dg = ["fill"], ug = { transform: "translate(-120, 0)" }, hg = ["fill"], fg = { transform: "translate(-60, 0)" }, gg = ["fill"], mg = { transform: "translate(0, 0)" }, pg = ["stroke"], bg = ["fill"], vg = { transform: "translate(60, 0)" }, yg = ["fill"], xg = { transform: "translate(130, 0)" }, kg = ["fill"], _g = ["transform"], wg = ["x", "y", "width", "height", "fill", "stroke"], Cg = ["y", "fill"], $g = ["y", "fill"], vn = 10, Sg = 14, Zn = 13, oi = 4, si = 12, Mg = /* @__PURE__ */ ue({
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
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), s = vn + Zn + oi + si + vn, i = C(() => ({
      bg: o.value.tooltipBg,
      border: o.value.tooltipBorder,
      text: o.value.tooltipText,
      secondary: n.value ? "#d1d5db" : "#e2e8f0"
    }));
    function r(k, w, _) {
      const $ = _ ? 0.6 : 0.535;
      return Math.ceil(Math.max(k, 1) * w * $);
    }
    function l(k, w) {
      return Math.max(
        r(k.length, Zn, !0),
        r(w.length, si, !1),
        52
      ) + Sg * 2;
    }
    function c(k, w, _, $) {
      const S = _ / 2, M = 6, I = Math.min(
        Math.max(k, S + M),
        a.chartWidth - S - M
      ), z = M + $ + 10, K = a.chartHeight - M + 10, D = Math.min(Math.max(w, z), K);
      return { x: I, y: D };
    }
    const u = C(() => ({
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
    }), m = (k) => typeof k == "string" ? k.charAt(0).toUpperCase() + k.slice(1).toLowerCase() : k, p = (k, w, _) => {
      const $ = k.currentTarget.closest("svg");
      if (!$) return;
      const S = $.getBoundingClientRect(), M = $.createSVGPoint();
      M.x = k.clientX - S.left, M.y = k.clientY - S.top;
      let I = m(w.label), z = "";
      switch (_) {
        case "body":
          z = `Q1: ${w.q1.toFixed(1)} | Q3: ${w.q3.toFixed(1)}`;
          break;
        case "wick":
          z = `Min: ${w.low.toFixed(1)} | Max: ${w.high.toFixed(1)}`;
          break;
        case "median":
          z = `Median: ${w.median.toFixed(1)}`;
          break;
        case "average":
          z = `Average: ${w.average?.toFixed(1) ?? ""}`;
          break;
        case "min":
          z = `Min: ${w.low.toFixed(1)}`;
          break;
        case "max":
          z = `Max: ${w.high.toFixed(1)}`;
          break;
      }
      const K = l(I, z), D = s;
      let P = M.x, B = M.y - 20;
      const H = c(P, B, K, D);
      P = H.x, B = H.y, f.value = {
        visible: !0,
        x: P,
        y: B,
        title: I,
        text: z,
        width: K,
        height: D
      };
    }, h = (k) => {
      if (f.value.visible) {
        const w = k.currentTarget, _ = w.getBoundingClientRect(), $ = w.createSVGPoint();
        $.x = k.clientX - _.left, $.y = k.clientY - _.top;
        let S = $.x, M = $.y - 20;
        const I = c(S, M, f.value.width, f.value.height);
        f.value.x = I.x, f.value.y = I.y;
      }
    }, b = () => {
      f.value.visible = !1;
    }, y = () => {
      f.value.visible = !1;
    }, v = C(() => {
      const k = [], _ = a.chartHeight - a.chartMargin - a.chartBottomMargin;
      for (let $ = 1; $ <= 10; $++) {
        const S = $, M = (S - 1) / 9, I = a.chartMargin + _ - M * _;
        k.push({ value: S, y: I });
      }
      return k;
    });
    return t({ isDark: n }), (k, w) => (g(), x("div", jf, [
      (g(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: we(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
        onMousemove: h,
        onMouseleave: b
      }, [
        w[4] || (w[4] = d("defs", null, [
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
        (g(!0), x(de, null, pe(v.value, (_, $) => (g(), x("line", {
          key: `grid-${$}`,
          x1: e.chartMargin,
          y1: _.y,
          x2: e.chartWidth - e.chartMargin,
          y2: _.y,
          stroke: u.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Uf))), 128)),
        (g(!0), x(de, null, pe(v.value, (_, $) => (g(), x(de, { key: $ }, [
          d("line", {
            x1: e.chartMargin - 6,
            y1: _.y,
            x2: e.chartMargin,
            y2: _.y,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Yf),
          d("text", {
            x: e.chartMargin - 12,
            y: _.y + 4,
            "text-anchor": "end",
            fill: u.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(_.value), 9, qf)
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
        (g(!0), x(de, null, pe(e.candlestickData, (_, $) => (g(), x(de, { key: $ }, [
          d("g", {
            transform: `translate(${_.centerX}, 0)`
          }, [
            d("line", {
              x1: 0,
              y1: _.highY,
              x2: 0,
              y2: _.lowY,
              stroke: _.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              class: "hover-line",
              onMouseenter: (S) => p(S, _, "wick"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, Jf),
            d("rect", {
              x: -e.candleWidth / 2,
              y: Math.min(_.q1Y, _.q3Y) - (Math.abs(_.q3Y - _.q1Y) < 4 ? 4 : 0),
              width: e.candleWidth,
              height: Math.max(8, Math.abs(_.q3Y - _.q1Y)),
              fill: _.isTotal ? "rgba(139, 92, 246, 0.15)" : "rgba(198, 125, 255, 0.15)",
              stroke: _.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              rx: "4",
              class: "hover-rect",
              onMouseenter: (S) => p(S, _, "body"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, eg),
            _.medianY ? (g(), x("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: _.medianY,
              x2: e.candleWidth / 2,
              y2: _.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (S) => p(S, _, "median"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, tg)) : E("", !0),
            _.averageY ? (g(), x("line", {
              key: 1,
              x1: -e.candleWidth / 2,
              y1: _.averageY,
              x2: e.candleWidth / 2,
              y2: _.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (S) => p(S, _, "average"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, ag)) : E("", !0),
            d("circle", {
              cx: 0,
              cy: _.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: u.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (S) => p(S, _, "min"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, ng),
            d("circle", {
              cx: 0,
              cy: _.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: u.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (S) => p(S, _, "max"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, og)
          ], 8, Qf),
          d("text", {
            x: _.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: u.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(m(_.label)), 9, sg),
          _.responseCount ? (g(), x("text", {
            key: 0,
            x: _.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: u.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(_.responseCount), 9, ig)) : E("", !0)
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
            w[0] || (w[0] = d("rect", {
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
            w[1] || (w[1] = d("rect", {
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
            w[2] || (w[2] = d("line", {
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
            w[3] || (w[3] = d("line", {
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
        ], 8, rg)) : E("", !0),
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
        ], 8, _g)) : E("", !0)
      ], 44, Hf))
    ]));
  }
}), Dg = /* @__PURE__ */ ve(Mg, [["__scopeId", "data-v-22efd66d"]]), Ag = ["viewBox"], Tg = ["x1", "y1", "x2", "y2", "stroke"], Bg = ["x1", "y1", "x2", "y2", "stroke"], Lg = ["points", "fill"], Rg = ["x1", "y1", "x2", "y2", "stroke"], Pg = ["x", "y", "fill"], Ig = ["x", "y", "fill", "transform"], Eg = ["x1", "y1", "x2", "y2", "stroke"], Fg = ["points", "fill"], Og = ["x1", "y1", "x2", "y2", "stroke"], Vg = ["x", "y", "fill"], zg = ["x", "y", "fill"], Ng = ["d"], jg = ["x", "y", "width", "height", "onMouseenter"], Hg = ["x1", "y1", "x2", "y2"], Wg = ["x", "y"], Kg = ["x1", "y1", "x2", "y2"], Ug = ["x", "y"], Yg = ["x1", "y1", "x2", "y2"], qg = ["x", "y"], Xg = ["x1", "y1", "x2", "y2"], Gg = ["x", "y"], Zg = ["x1", "y1", "x2", "y2"], Qg = ["x", "y"], Jg = ["x1", "y1", "x2", "y2"], em = ["x", "y"], tm = ["transform"], am = { transform: "translate(-220, 0)" }, nm = ["fill"], om = { transform: "translate(-140, 0)" }, sm = ["fill"], im = { transform: "translate(-80, 0)" }, rm = ["fill"], lm = { transform: "translate(-20, 0)" }, cm = ["fill"], dm = { transform: "translate(60, 0)" }, um = ["fill"], hm = { transform: "translate(130, 0)" }, fm = ["fill"], gm = { transform: "translate(180, 0)" }, mm = ["fill"], pm = ["transform"], bm = ["x", "y", "width", "height", "fill", "stroke"], vm = ["y", "fill"], ym = ["y", "fill"], yn = 10, xm = 14, Qn = 13, ii = 12, ri = 4, km = /* @__PURE__ */ ue({
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
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), s = yn + Qn + ri + ii + yn, i = C(() => ({
      bg: o.value.tooltipBg,
      border: o.value.tooltipBorder,
      text: o.value.tooltipText,
      secondary: n.value ? "#d1d5db" : "#e2e8f0"
    }));
    function r(Q, U, ee) {
      const ge = ee ? 0.6 : 0.535;
      return Math.ceil(Math.max(Q, 1) * U * ge);
    }
    function l(Q, U) {
      return Math.max(
        r(Q.length, Qn, !0),
        r(U.length, ii, !1),
        52
      ) + xm * 2;
    }
    function c(Q, U, ee, ge) {
      const be = ee / 2, V = 6, te = Math.min(
        Math.max(Q, be + V),
        a.chartWidth - be - V
      ), ce = V + ge + 10, me = a.chartHeight - V + 10, Ce = Math.min(Math.max(U, ce), me);
      return { x: te, y: Ce };
    }
    const u = C(() => ({
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
    }), m = C(
      () => a.chartMarginRight ?? a.chartMargin
    ), p = C(() => a.chartMargin + a.plotInset), h = C(
      () => a.chartWidth - m.value - a.plotInset
    ), b = C(() => Math.max(h.value - p.value, 1)), y = C(() => a.chartHeight - a.chartMargin - a.chartBottomMargin), v = C(() => b.value / 10 * 0.52);
    function k(Q) {
      if (Q < 1 || Q > 10) return null;
      const U = b.value / 10;
      return p.value + (Q - 0.5) * U;
    }
    const w = C(
      () => Array.from({ length: 10 }, (Q, U) => {
        const ee = U + 1, ge = k(ee);
        return ge === null ? null : { score: ee, x: ge };
      }).filter((Q) => Q !== null)
    ), _ = C(() => {
      if (!a.histogram || a.histogram.length === 0) return 1;
      const Q = Math.max(...a.histogram.map((ee) => ee.count || 0), 1), U = Math.max(1, Math.ceil(Q * 0.2));
      return Q + U;
    }), $ = C(() => {
      if (!a.histogram || a.histogram.length === 0) return 1;
      const Q = a.averageScore || 0;
      let U = 0, ee = 0;
      if (a.histogram.forEach((be) => {
        const V = be.count || 0;
        U += V;
        const te = be.score - Q;
        ee += V * (te * te);
      }), U === 0) return 1;
      const ge = ee / U;
      return Math.sqrt(ge) || 1;
    }), S = (Q, U, ee) => {
      if (ee === 0) return 0;
      const ge = 1 / (ee * Math.sqrt(2 * Math.PI)), be = -0.5 * Math.pow((Q - U) / ee, 2);
      return ge * Math.exp(be);
    }, M = C(() => {
      if (!a.histogram || a.histogram.length === 0 || a.averageScore === 0 && $.value === 0) return null;
      const Q = a.averageScore, U = $.value, ee = 100, be = Math.max(...a.histogram.map((me) => me.count || 0), 1) / _.value * y.value;
      if (be <= 0) return null;
      let V = 0;
      for (let me = 0; me <= ee; me++) {
        const Ce = 1 + 9 * (me / ee), _e = S(Ce, Q, U);
        _e > V && (V = _e);
      }
      if (V <= 0) return null;
      const te = be / V, ce = [];
      for (let me = 0; me <= ee; me++) {
        const Ce = 1 + 9 * (me / ee), _e = S(Ce, Q, U) * te, Re = k(Ce);
        if (Re !== null) {
          const Pe = a.chartHeight - a.chartBottomMargin - _e;
          ce.push(`${me === 0 ? "M" : "L"} ${Re} ${Pe}`);
        }
      }
      return ce.join(" ");
    }), I = C(() => {
      if (!a.histogram || a.histogram.length === 0) return [];
      const Q = b.value / 10;
      return a.histogram.map((U) => {
        const ee = Number(U.score);
        if (!Number.isFinite(ee) || ee < 1 || ee > 10)
          return null;
        const ge = p.value + (ee - 0.5) * Q, be = U.count > 0 ? U.count / _.value * y.value : 0, V = a.chartHeight - a.chartBottomMargin - be;
        return {
          score: ee,
          count: U.count,
          x: ge,
          y: V,
          height: be
        };
      }).filter((U) => U !== null);
    }), z = C(() => k(a.minScore)), K = C(() => k(a.maxScore)), D = C(() => k(a.q1Score)), P = C(() => k(a.medianScore)), B = C(() => k(a.q3Score)), H = C(() => k(a.averageScore)), j = C(() => a.minScore), X = C(() => a.maxScore), re = C(() => a.q1Score), he = C(() => a.medianScore), Z = C(() => a.q3Score), oe = C(() => a.averageScore), L = C(() => {
      const Q = [], U = a.chartMargin - 8, ee = 18;
      D.value !== null && Q.push({
        x: D.value,
        y: U,
        value: a.q1Score,
        label: `Q1: ${re.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), P.value !== null && Q.push({
        x: P.value,
        y: U - ee,
        value: a.medianScore,
        label: `Median: ${he.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), H.value !== null && Q.push({
        x: H.value,
        y: U - ee,
        value: a.averageScore,
        label: `Avg: ${oe.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), B.value !== null && Q.push({
        x: B.value,
        y: U,
        value: a.q3Score,
        label: `Q3: ${Z.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), Q.sort((V, te) => (V.x || 0) - (te.x || 0));
      const ge = [[], [], []];
      Q.forEach((V) => {
        if (V.x === null) return;
        let te = -1;
        for (let ce = 0; ce < ge.length; ce++) {
          let me = !1;
          for (const Ce of ge[ce]) {
            if (Ce.x === null) continue;
            const _e = Math.abs(V.x - Ce.x), Re = (V.width + Ce.width) / 2 + 10;
            if (_e < Re) {
              me = !0;
              break;
            }
          }
          if (!me) {
            te = ce;
            break;
          }
        }
        te === -1 && (te = ge.length - 1), V.y = U - te * ee, ge[te].push(V);
      });
      const be = 15;
      return Q.forEach((V) => {
        V.y < be && (V.y = be);
      }), Q;
    }), Y = (Q) => L.value.find((ee) => ee.id === Q)?.y || a.chartMargin - 10, q = C(() => {
      const Q = [];
      for (let ee = 0; ee <= 5; ee++) {
        const ge = Math.round(_.value / 5 * ee), be = a.chartHeight - a.chartBottomMargin - ee / 5 * y.value;
        Q.push({ value: ge, y: be });
      }
      return Q;
    });
    function F(Q, U, ee) {
      const ge = Q.createSVGPoint();
      ge.x = U, ge.y = ee;
      const be = Q.getScreenCTM();
      if (!be) {
        const te = Q.getBoundingClientRect();
        return { x: U - te.left, y: ee - te.top };
      }
      const V = ge.matrixTransform(be.inverse());
      return { x: V.x, y: V.y };
    }
    const se = (Q, U) => {
      a.interactive && J(Q, U);
    }, le = () => {
      a.interactive && ie();
    }, J = (Q, U) => {
      const ee = Q.currentTarget.closest("svg");
      if (!ee) return;
      const { x: ge, y: be } = F(ee, Q.clientX, Q.clientY), V = `Score: ${U.score}`, te = `Count: ${Number(U.count ?? 0).toLocaleString()}`, ce = l(V, te), me = s, Ce = typeof U?.x == "number" ? U.x : ge;
      let _e = be - 20;
      const Re = c(Ce, _e, ce, me);
      f.value = {
        visible: !0,
        x: Re.x,
        y: Re.y,
        title: V,
        text: te,
        width: ce,
        height: me,
        anchorX: typeof U?.x == "number" ? U.x : null
      };
    }, R = (Q) => {
      if (a.interactive && f.value.visible) {
        const U = Q.currentTarget, { x: ee, y: ge } = F(U, Q.clientX, Q.clientY), be = f.value.anchorX, V = be != null && Number.isFinite(be) ? be : ee;
        let te = ge - 20;
        const ce = c(V, te, f.value.width, f.value.height);
        f.value.x = ce.x, f.value.y = ce.y;
      }
    }, W = () => {
      ie();
    }, ie = () => {
      f.value.visible = !1, f.value.anchorX = null;
    };
    return t({ isDark: n }), (Q, U) => (g(), x("div", {
      class: G(["chart-container", { "chart-container--static": !e.interactive }])
    }, [
      (g(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: we(`min-height: ${e.chartHeight}px;`),
        onMousemove: R,
        onMouseleave: W
      }, [
        U[7] || (U[7] = d("defs", null, [
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
        (g(!0), x(de, null, pe(q.value, (ee, ge) => (g(), x("line", {
          key: `grid-${ge}`,
          x1: p.value,
          y1: ee.y,
          x2: h.value,
          y2: ee.y,
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
        (g(!0), x(de, null, pe(q.value, (ee, ge) => (g(), x(de, {
          key: `y-tick-${ge}`
        }, [
          d("line", {
            x1: e.chartMargin - 6,
            y1: ee.y,
            x2: e.chartMargin,
            y2: ee.y,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Rg),
          d("text", {
            x: e.chartMargin - 12,
            y: ee.y + 4,
            "text-anchor": "end",
            fill: u.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(ee.value), 9, Pg)
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
        (g(!0), x(de, null, pe(w.value, (ee) => (g(), x(de, {
          key: `tick-${ee.score}`
        }, [
          d("line", {
            x1: ee.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: ee.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Og),
          d("text", {
            x: ee.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: u.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(ee.score), 9, Vg)
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
        }, null, 8, Ng)) : E("", !0),
        (g(!0), x(de, null, pe(I.value, (ee, ge) => (g(), x("rect", {
          key: `bar-${ge}`,
          x: ee.x - v.value / 2,
          y: ee.y,
          width: v.value,
          height: ee.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (be) => se(be, ee),
          onMouseleave: le,
          style: we({ cursor: e.interactive ? "pointer" : "default" })
        }, null, 44, jg))), 128)),
        e.showStatLabels && z.value ? (g(), x("line", {
          key: 1,
          x1: z.value,
          y1: e.chartMargin,
          x2: z.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Hg)) : E("", !0),
        e.showStatLabels && z.value ? (g(), x("text", {
          key: 2,
          x: z.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + A(j.value.toFixed(1)), 9, Wg)) : E("", !0),
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
        }, null, 8, Kg)) : E("", !0),
        e.showStatLabels && D.value ? (g(), x("text", {
          key: 4,
          x: D.value,
          y: Y("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + A(re.value.toFixed(1)), 9, Ug)) : E("", !0),
        e.showStatLabels && P.value ? (g(), x("line", {
          key: 5,
          x1: P.value,
          y1: e.chartMargin,
          x2: P.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, Yg)) : E("", !0),
        e.showStatLabels && P.value ? (g(), x("text", {
          key: 6,
          x: P.value,
          y: Y("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + A(he.value.toFixed(1)), 9, qg)) : E("", !0),
        e.showStatLabels && H.value ? (g(), x("line", {
          key: 7,
          x1: H.value,
          y1: e.chartMargin,
          x2: H.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, Xg)) : E("", !0),
        e.showStatLabels && H.value ? (g(), x("text", {
          key: 8,
          x: H.value,
          y: Y("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + A(oe.value.toFixed(1)), 9, Gg)) : E("", !0),
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
        }, null, 8, Zg)) : E("", !0),
        e.showStatLabels && B.value ? (g(), x("text", {
          key: 10,
          x: B.value,
          y: Y("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + A(Z.value.toFixed(1)), 9, Qg)) : E("", !0),
        e.showStatLabels && K.value ? (g(), x("line", {
          key: 11,
          x1: K.value,
          y1: e.chartMargin,
          x2: K.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Jg)) : E("", !0),
        e.showStatLabels && K.value ? (g(), x("text", {
          key: 12,
          x: K.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + A(X.value.toFixed(1)), 9, em)) : E("", !0),
        e.showLegend ? (g(), x("g", {
          key: 13,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          d("g", am, [
            U[0] || (U[0] = d("line", {
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
            U[1] || (U[1] = d("line", {
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
            U[2] || (U[2] = d("line", {
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
            U[3] || (U[3] = d("line", {
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
            U[4] || (U[4] = d("line", {
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
            U[5] || (U[5] = d("line", {
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
            U[6] || (U[6] = d("line", {
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
        ], 8, tm)) : E("", !0),
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
        ], 8, pm)) : E("", !0)
      ], 44, Ag))
    ], 2));
  }
}), vr = /* @__PURE__ */ ve(km, [["__scopeId", "data-v-8f9da805"]]), _m = 639, yr = 1024;
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
  }), it(() => {
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
const It = (e, t) => t ? `${(e / t * 100).toFixed(1)}%` : "0.0%", ye = (e, t) => `${e.toLocaleString()} (${It(e, t)})`, Cm = { class: "chart-container" }, $m = {
  key: 0,
  class: "loading-state loading-overlay"
}, la = 12, Sm = /* @__PURE__ */ ue({
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
    }, h = /abandon|exit|lost|bounce|cancelled|no pending|not paid|not confirmed|not delivered/i, b = /error|failed|unrecovered|not retreiv|bp error|not found|rejected|redirect to human|invalid|unprocessed|data quality|failed:/i, y = C(() => {
      const R = s.value;
      return R === "mobile" ? {
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
      } : R === "tablet" ? {
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
    }), v = (R) => {
      const W = R.replace(/_/g, " ").replace(/\s+/g, " ").trim(), ie = W.match(/^Failed:\s*(.+)$/i);
      return ie ? `Failed:
${ie[1].trim()}` : W;
    }, k = (R, W) => {
      const ie = R.trim();
      if (!ie || W < 1 || ie.length <= W) return ie;
      const Q = [];
      let U = 0;
      for (; U < ie.length; ) {
        const ee = Math.min(U + W, ie.length);
        if (ee >= ie.length) {
          const V = ie.slice(U).trim();
          V && Q.push(V);
          break;
        }
        const ge = ie.slice(U, ee), be = ge.lastIndexOf(" ");
        if (be > 0)
          for (Q.push(ie.slice(U, U + be).trim()), U += be; U < ie.length && ie[U] === " "; ) U += 1;
        else
          Q.push(ge), U = ee;
      }
      return Q.join(`
`);
    }, w = (R, W) => {
      const ie = R.trim();
      return !ie || W < 1 ? R : ie.split(`
`).map((Q) => k(Q.trim(), W)).filter(Boolean).join(`
`);
    }, _ = (R) => R.status ? R.status : h.test(R.name) ? "abandon" : b.test(R.name) ? "error" : "success", $ = (R) => R.originalValue ?? R.value, S = (R, W) => {
      const ie = new Set(W.map((U) => U.target)), Q = R.filter((U) => !ie.has(U.name));
      for (const U of Q) {
        if (typeof U.value == "number" && U.value > 0) return U.value;
        const ee = W.filter((ge) => ge.source === U.name);
        if (ee.length > 0)
          return ee.reduce((ge, be) => ge + $(be), 0);
      }
      return W.reduce((U, ee) => Math.max(U, $(ee)), 0);
    }, M = (R, W) => {
      const ie = /* @__PURE__ */ new Map(), Q = new Set(W.map((ee) => ee.target)), U = R.filter((ee) => !Q.has(ee.name)).map((ee) => ({ name: ee.name, depth: 0 }));
      for (; U.length > 0; ) {
        const { name: ee, depth: ge } = U.shift(), be = ie.get(ee);
        if (!(be !== void 0 && be >= ge)) {
          ie.set(ee, ge);
          for (const V of W)
            V.source === ee && U.push({ name: V.target, depth: ge + 1 });
        }
      }
      for (const ee of R)
        ie.has(ee.name) || ie.set(ee.name, 0);
      return ie;
    }, I = (R, W) => {
      const ie = /* @__PURE__ */ new Map(), Q = new Set(W.map((be) => be.target)), U = R.filter((be) => !Q.has(be.name));
      let ee = 0;
      const ge = (be) => {
        let V = be;
        for (; V && !ie.has(V); )
          ie.set(V, ee), ee += 1, V = W.filter(
            (ce) => ce.source === V && _({ name: ce.target }) === "success"
          ).sort((ce, me) => $(me) - $(ce))[0]?.target;
      };
      return U.forEach((be) => ge(be.name)), ie;
    }, z = (R, W, ie) => {
      const Q = _(R);
      if (Q === "success" && ie.has(R.name))
        return ie.get(R.name);
      if (Q === "success") {
        const U = W.filter((ge) => ge.target === R.name);
        return 200 + (U.length ? Math.min(
          ...U.map(
            (ge) => ie.has(ge.source) ? (ie.get(ge.source) ?? 0) + 0.01 : 500
          )
        ) : 500);
      }
      return Q === "abandon" ? 1e3 : 2e3;
    }, K = (R, W) => {
      const ie = M(R, W), Q = I(R, W);
      return [...R].sort((U, ee) => {
        const ge = ie.get(U.name) ?? 0, be = ie.get(ee.name) ?? 0;
        if (ge !== be) return ge - be;
        const V = p[_(U)], te = p[_(ee)];
        if (V !== te) return V - te;
        const ce = z(U, W, Q), me = z(ee, W, Q);
        if (ce !== me) return ce - me;
        const Ce = typeof U.order == "number" ? U.order : Number.MAX_SAFE_INTEGER, _e = typeof ee.order == "number" ? ee.order : Number.MAX_SAFE_INTEGER;
        return Ce !== _e ? Ce - _e : U.name.localeCompare(ee.name);
      });
    }, D = (R, W, ie, Q) => {
      const ee = w(R, Q).split(`
`), ge = W * 0.58, V = Math.max(...ee.map((ce) => ce.length), 1) * ge, te = ee.length * ie;
      return {
        lines: ee,
        width: V,
        height: te,
        nodeWidth: V + la * 2
      };
    }, P = (R, W, ie, Q) => {
      const U = typeof R.label == "string" && R.label ? R.label : R.name, ee = `${v(U)}
(${It(ie, Q)})`;
      return w(ee, W);
    }, B = (R, W) => {
      const ie = W.filter((Q) => Q.target === R.name);
      return ie.length > 0 ? ie.reduce((Q, U) => Q + $(U), 0) : typeof R.value == "number" ? R.value : W.filter((Q) => Q.source === R.name).reduce((Q, U) => Q + $(U), 0);
    }, H = (R, W, ie) => {
      const Q = W.find((U) => U.name === R);
      return Q ? B(Q, ie) : ie.filter((U) => U.source === R).reduce((U, ee) => U + $(ee), 0);
    }, j = (R, W, ie, Q) => {
      const U = H(R, ie, Q);
      return `${W.toLocaleString()} (${It(W, U)})`;
    }, X = (R, W = 0) => {
      if (W > 0) return W;
      const ie = R.match(/^(\d+(?:\.\d+)?)px$/);
      if (ie) return Number(ie[1]);
      const Q = R.match(/^(\d+(?:\.\d+)?)vh$/);
      return Q && typeof window < "u" ? Number(Q[1]) / 100 * window.innerHeight : 500;
    }, re = (R, W, ie, Q, U) => {
      if (!W.length || !R.length || U <= 0) return R;
      const ee = R.map((_e) => ({ ..._e })), ge = ie.labelLineHeight || Math.round(ie.labelFontSize * 1.25), be = Math.max(4, ie.labelCharsPerLine), V = Math.max(Q * 0.88, 260), te = M(W, ee), ce = /* @__PURE__ */ new Map();
      W.forEach((_e) => {
        const Re = te.get(_e.name) ?? 0;
        ce.set(Re, (ce.get(Re) ?? 0) + 1);
      });
      const me = (_e) => {
        const Pe = W.find((oa) => oa.name === _e)?.displayLabel || _e, Kt = D(Pe, ie.labelFontSize, ge, be).height + la * 2, pa = te.get(_e) ?? 0, an = ce.get(pa) ?? 1, nn = (Math.max(an, 1) - 1) * ie.nodeGap / Math.max(an, 1), On = Math.max(V - nn, Kt);
        return Math.max(1, Kt / On * U);
      }, Ce = (_e) => {
        const Re = ee.filter((Pe) => Pe.target === _e);
        return Re.length > 0 ? Re.reduce((Pe, qe) => Pe + qe.value, 0) : ee.filter((Pe) => Pe.source === _e).reduce((Pe, qe) => Pe + qe.value, 0);
      };
      for (let _e = 0; _e < 16; _e += 1) {
        let Re = !1;
        for (const Pe of W) {
          const qe = me(Pe.name), Kt = Ce(Pe.name);
          if (Kt >= qe) continue;
          const pa = ee.filter((oa) => oa.target === Pe.name), an = ee.filter((oa) => oa.source === Pe.name), nn = pa.length > 0 ? pa : an;
          if (nn.length === 0) continue;
          const On = qe / Math.max(Kt, 1e-6);
          nn.forEach((oa) => {
            oa.value *= On;
          }), Re = !0;
        }
        if (!Re) break;
      }
      return ee;
    }, he = (R, W, ie) => {
      const Q = S(R, W), U = K(R, W), ee = ie.labelLineHeight || Math.round(ie.labelFontSize * 1.25), ge = Math.max(4, ie.labelCharsPerLine);
      let be = ie.nodeWidth;
      const V = [], te = U.map((me, Ce) => {
        const _e = _(me), Re = P(
          me,
          ge,
          B(me, W),
          Q
        );
        V.push(Re);
        const Pe = D(Re, ie.labelFontSize, ee, ge);
        ie.orient === "vertical" ? be = Math.max(be, Pe.height + la * 2) : be = Math.max(be, Pe.nodeWidth);
        const qe = a.nodeColors[me.name] || m[_e] || Z[Ce % Z.length], Kt = Math.max(Math.ceil(Pe.nodeWidth - la * 2), 48);
        return {
          ...me,
          displayLabel: Re,
          label: {
            width: Kt,
            overflow: "none",
            lineHeight: ee,
            fontSize: ie.labelFontSize
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
      let ce = { ...ie.contentMargins };
      if (ie.orient === "vertical") {
        const me = Math.max(
          ...V.map(
            (_e) => D(_e, ie.labelFontSize, ee, ge).width
          ),
          0
        ), Ce = typeof ce.right == "number" ? ce.right : 10;
        ce = {
          ...ce,
          right: Math.max(Ce, me + la + ie.labelDistance)
        };
      }
      return { nodes: te, maxNodeWidth: be, contentMargins: ce, originTotal: Q };
    }, Z = [
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
      const R = a.data.links.filter(
        (U) => U.source && U.target && typeof U.value == "number"
      ), W = Math.max(...R.map((U) => U.value), 1), ie = Math.max(1, W * 0.01), Q = R.map((U) => ({
        ...U,
        originalValue: U.value,
        value: U.value < W * 0.01 ? ie : U.value
      }));
      return {
        nodes: a.data.nodes.filter((U) => U.name),
        links: Q
      };
    }, L = (R, W, ie) => (Q) => {
      const U = Q.dataType === "node", ee = o.value.tooltipText, ge = n.value ? "#d1d5db" : "#e2e8f0";
      if (U) {
        const me = W.filter((Pe) => Pe.target === Q.name), Ce = W.filter((Pe) => Pe.source === Q.name), _e = me.length > 0 ? me.reduce((Pe, qe) => Pe + (qe.originalValue || qe.value), 0) : Ce.reduce((Pe, qe) => Pe + (qe.originalValue || qe.value), 0), Re = It(_e, ie);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${ee};">${Q.name} (${Re})</div><div style="color: ${ge}; font-size: 12px;">Count: ${_e.toLocaleString()}</div>`;
      }
      const be = Q.data?.source || Q.source || "Unknown", V = Q.data?.target || Q.target || "Unknown", te = Number(Q.data?.originalValue ?? Q.data?.value ?? Q.value ?? 0), ce = j(be, te, R, W);
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${ee};">${be} → ${V}</div><div style="color: ${ge}; font-size: 12px;">Flow: ${ce}</div>`;
    }, Y = () => {
      if (!c || !a.data.nodes?.length || !a.data.links?.length) return;
      const R = y.value, W = n.value ? "rgba(110, 110, 120, 0.35)" : "rgba(148, 163, 184, 0.45)", ie = n.value ? "rgba(130, 130, 140, 0.5)" : "rgba(100, 116, 139, 0.55)", Q = n.value ? "rgba(203, 213, 225, 0.92)" : "#64748b", U = R.labelPosition === "inside" ? "#ffffff" : n.value ? o.value.textPrimary : "#334155";
      try {
        const { nodes: ee, links: ge } = oe(), { nodes: be, maxNodeWidth: V, contentMargins: te, originTotal: ce } = he(
          ee,
          ge,
          R
        ), me = X(a.height, i.value?.clientHeight ?? 0), Ce = re(
          ge,
          be,
          {
            labelFontSize: R.labelFontSize,
            labelLineHeight: R.labelLineHeight || Math.round(R.labelFontSize * 1.25),
            labelCharsPerLine: R.labelCharsPerLine,
            nodeGap: R.nodeGap
          },
          me,
          ce
        ), _e = {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove|click",
            confine: !0,
            formatter: L(ee, Ce, ce),
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
              data: be,
              links: Ce,
              emphasis: {
                focus: "adjacency",
                lineStyle: {
                  color: ie,
                  opacity: 1
                }
              },
              lineStyle: {
                color: W,
                curveness: 0.5,
                opacity: 1
              },
              itemStyle: {
                ...f.style,
                borderWidth: 0
              },
              label: {
                show: !0,
                position: R.labelPosition,
                color: U,
                fontWeight: 700,
                fontSize: R.labelFontSize,
                lineHeight: R.labelLineHeight || Math.round(R.labelFontSize * 1.25),
                padding: la,
                align: "center",
                verticalAlign: "middle",
                overflow: "none",
                ...R.orient === "horizontal" ? { width: Math.max(V - la * 2, 48), overflow: "none" } : R.labelWrap && R.labelTextWidth > 0 ? { width: R.labelTextWidth, overflow: "none" } : {},
                ...R.labelDistance > 0 ? { distance: R.labelDistance } : {},
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (Re) => Re.data?.displayLabel || Re.name || ""
              },
              edgeLabel: R.edgeLabelShow ? {
                show: !0,
                fontSize: R.edgeLabelFontSize,
                color: Q,
                fontWeight: 500,
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (Re) => {
                  const Pe = Number(Re.data?.originalValue ?? Re.value ?? 0), qe = Re.data?.source || Re.source || "";
                  return j(qe, Pe, ee, Ce);
                }
              } : { show: !1 },
              nodeAlign: f.node.align,
              nodeGap: R.nodeGap,
              nodeWidth: V,
              layoutIterations: f.node.iterations,
              orient: R.orient,
              draggable: !1,
              ...te
            }
          ],
          backgroundColor: "transparent",
          animation: !0,
          animationDuration: f.animation.duration,
          animationEasing: f.animation.easing
        };
        c.setOption(_e), c.resize();
      } catch (ee) {
        console.error("Error setting Sankey chart options:", ee), l.value = !0;
      }
    }, q = async () => {
      if (i.value)
        try {
          c = zo.init(i.value), Y(), window.addEventListener("resize", le);
        } catch (R) {
          console.error("Error initializing Sankey chart:", R), l.value = !0;
        } finally {
          r.value = !1;
        }
    }, F = () => {
      const R = i.value;
      return !!(R && R.clientWidth > 0 && R.clientHeight > 0);
    }, se = async () => {
      if (await Ke(), F()) return q();
      await new Promise((R) => {
        const W = i.value;
        if (!W) {
          R();
          return;
        }
        u = new ResizeObserver(() => {
          F() && (u?.disconnect(), u = null, q().then(R));
        }), u.observe(W);
      });
    }, le = () => c?.resize(), J = () => {
      window.removeEventListener("resize", le), u?.disconnect(), u = null, c && (c.dispose(), c = null);
    };
    return Je(() => se()), _i(J), Te(() => a.data, Y, { deep: !0 }), Te(n, Y), Te(s, Y), t({ isDark: n }), (R, W) => (g(), x("div", Cm, [
      l.value ? (g(), x("div", {
        key: 0,
        class: "error-state",
        style: we({ height: e.height })
      }, [...W[0] || (W[0] = [
        eo('<div class="error-content" data-v-c2130602><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c2130602><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-c2130602></path></svg><p class="error-title" data-v-c2130602>Chart could not be loaded</p><p class="error-description" data-v-c2130602>Please check the data format.</p></div>', 1)
      ])], 4)) : (g(), x("div", {
        key: 1,
        class: "chart-wrapper",
        style: we({ height: e.height })
      }, [
        d("div", {
          ref_key: "chartEl",
          ref: i,
          class: "chart-content"
        }, null, 512),
        r.value ? (g(), x("div", $m, [...W[1] || (W[1] = [
          eo('<div class="loading-container" data-v-c2130602><div class="sankey-loader" data-v-c2130602><div class="flow flow-1" data-v-c2130602></div><div class="flow flow-2" data-v-c2130602></div><div class="flow flow-3" data-v-c2130602></div><div class="flow flow-4" data-v-c2130602></div></div><p class="loading-text" data-v-c2130602>Loading Sankey diagram...</p></div>', 1)
        ])])) : E("", !0)
      ], 4))
    ]));
  }
}), aa = /* @__PURE__ */ ve(Sm, [["__scopeId", "data-v-c2130602"]]), Mm = ["open"], Dm = { class: "card-header metric-collapsible__summary" }, Am = { class: "header-content metric-header-content" }, Tm = { class: "metric-header-content__main" }, Bm = { class: "metric-header-content__text" }, Lm = { class: "metric-header-content__loaded" }, Rm = {
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
}, Qm = { key: "body-content" }, Jm = /* @__PURE__ */ ue({
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
          const y = b.children;
          return typeof y == "string" && y.trim().length > 0;
        }
        return !!b.type;
      });
    }
    const u = C(() => a.collapsible ? a.lazyMount ? r.value : i.value : !0), f = C(() => a.loading && u.value), m = C(() => {
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
      const y = i.value, v = b.open;
      if (i.value = v, v && !y) {
        const k = !r.value;
        r.value = !0, k && n("open");
      }
      n("toggle", v);
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
                  e.title ? (g(), x("h3", Rm, A(e.title), 1)) : E("", !0)
                ], !0),
                e.subtitle ? (g(), x("p", Pm, A(e.subtitle), 1)) : E("", !0),
                ke(h.$slots, "headerAppend", {}, void 0, !0)
              ])
            ]),
            m.value ? (g(), x("div", Im, [
              ke(h.$slots, "headerExport", {}, void 0, !0)
            ])) : E("", !0)
          ]),
          h.$slots.headerAside ? (g(), x("div", Em, [
            ke(h.$slots, "headerAside", {}, void 0, !0)
          ])) : E("", !0)
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
      ])) : E("", !0)
    ], 40, Mm)) : (g(), x("div", zm, [
      d("div", Nm, [
        d("div", jm, [
          d("div", Hm, [
            d("div", Wm, [
              d("div", Km, [
                ke(h.$slots, "title", {}, () => [
                  e.title ? (g(), x("h3", Um, A(e.title), 1)) : E("", !0)
                ], !0),
                e.subtitle ? (g(), x("p", Ym, A(e.subtitle), 1)) : E("", !0),
                ke(h.$slots, "headerAppend", {}, void 0, !0)
              ])
            ]),
            m.value ? (g(), x("div", qm, [
              ke(h.$slots, "headerExport", {}, void 0, !0)
            ])) : E("", !0)
          ]),
          h.$slots.headerAside ? (g(), x("div", Xm, [
            ke(h.$slots, "headerAside", {}, void 0, !0)
          ])) : E("", !0)
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
      ])) : E("", !0)
    ]));
  }
}), Se = /* @__PURE__ */ ve(Jm, [["__scopeId", "data-v-ade4038f"]]);
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
function rt(e, t) {
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
}, bp = /* @__PURE__ */ ue({
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
    return (l, c) => (g(), ae(ht(o.value), {
      class: G(s.value)
    }, {
      default: O(() => [
        e.variant === "footer" ? (g(), x("div", lp)) : E("", !0),
        d("div", {
          class: G(["export-actions", { "export-actions--inline": e.variant === "inline" }])
        }, [
          e.variant === "footer" ? (g(), x("span", cp, "Export")) : E("", !0),
          d("div", dp, [
            i("pdf") ? (g(), x("button", {
              key: 0,
              type: "button",
              class: G(["export-btn", { "is-loading": e.loading }]),
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
            ], 10, up)) : E("", !0),
            i("csv") ? (g(), x("button", {
              key: 1,
              type: "button",
              class: G(["export-btn", { "is-loading": e.loading }]),
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
            ], 10, gp)) : E("", !0)
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), ze = /* @__PURE__ */ ve(bp, [["__scopeId", "data-v-ebfab47f"]]), vp = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, yp = {
  key: "chart",
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, xp = { class: "w-full shrink-0 sm:pr-2" }, kp = {
  key: "empty",
  class: "flex min-h-[280px] w-full items-center justify-center"
}, _p = { class: "max-w-[360px] text-center" }, wp = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Cp = /* @__PURE__ */ ue({
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
    }, f = C(() => {
      const m = o.data?.agents_by_day || {}, p = Object.keys(m).sort();
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const h = p.map((w) => u(w)), b = /* @__PURE__ */ new Set();
      for (const w of Object.values(m))
        for (const _ of Object.keys(w))
          b.add(_);
      const y = Array.from(b), v = (w) => w, k = y.map((w) => ({
        label: w,
        data: p.map((_) => m[_]?.[w] || 0),
        backgroundColor: `${n[w] || "#94a3b8"}80`,
        borderColor: v(n[w] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: h,
        datasets: k
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
        }, null, 8, ["loading"])) : E("", !0)
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
                    N(T(rt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
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
}), $p = /* @__PURE__ */ ve(Cp, [["__scopeId", "data-v-f8d0ec91"]]), Sp = { class: "flex w-full min-w-0 justify-center" }, Mp = { class: "flex max-w-full min-w-0 items-center gap-2" }, Dp = { class: "min-w-0 truncate text-[12px] leading-normal capitalize" }, Ap = { class: "text-[14px] font-bold leading-tight text-[color:var(--kiut-text-primary,#1e293b)]" }, Tp = {
  key: 0,
  class: "min-w-0 w-full truncate text-[10px] leading-normal"
}, Bp = /* @__PURE__ */ ue({
  __name: "CardInfo",
  props: {
    color: {},
    title: {},
    value: {},
    subvalue: {}
  },
  setup(e) {
    return (t, a) => (g(), x("div", {
      class: G(["card-info box-border flex w-full min-w-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl px-3 py-2 text-center font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[color:var(--kiut-text-secondary,#64748b)]", e.subvalue ? "h-[75px]" : "h-[58px]"])
    }, [
      d("div", Sp, [
        d("div", Mp, [
          e.color ? (g(), x("span", {
            key: 0,
            class: "inline-block h-2.5 w-2.5 shrink-0 rounded-full align-middle",
            style: we({ backgroundColor: e.color }),
            "aria-hidden": "true"
          }, null, 4)) : E("", !0),
          d("span", Dp, A(e.title), 1)
        ])
      ]),
      d("p", Ap, A(e.value), 1),
      e.subvalue ? (g(), x("p", Tp, A(e.subvalue), 1)) : E("", !0)
    ], 2));
  }
}), xe = /* @__PURE__ */ ve(Bp, [["__scopeId", "data-v-0d546967"]]), kr = "inline-flex w-min max-w-full min-h-[22px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] font-semibold leading-snug tracking-tight";
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
}, Ge = /* @__PURE__ */ ue({
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
      () => _r(t.color, t.outlined)
    );
    return (r, l) => a.value ? (g(), x("span", {
      key: 0,
      role: "status",
      class: G(["inline-flex w-min max-w-full min-h-[22px] items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug", o.value])
    }, [
      e.statusLive === !0 ? (g(), x("span", Lp, [...l[0] || (l[0] = [
        d("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        d("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : E("", !0),
      d("span", {
        class: G(["min-w-0 flex-1 text-center", s.value])
      }, A(n.value), 3)
    ], 2)) : (g(), x("span", {
      key: 1,
      class: G([T(kr), i.value])
    }, [
      ke(r.$slots, "default", {}, () => [
        Ae(A(e.label), 1)
      ])
    ], 2));
  }
}), fe = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), Ie = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
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
}, zp = /* @__PURE__ */ ue({
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
    function i(_) {
      return _ == null || _ === "" ? s : String(_);
    }
    function r(_) {
      return _ === "center" ? "text-center" : _ === "right" ? "text-right" : "text-left";
    }
    function l(_) {
      return `cell-${_}`;
    }
    function c(_, $) {
      return _[$];
    }
    function u(_, $) {
      if (typeof a.rowKey == "function")
        return a.rowKey(_);
      const S = _[a.rowKey];
      return typeof S == "string" || typeof S == "number" ? S : $;
    }
    function f(_, $) {
      return u(_, $);
    }
    function m(_) {
      return a.sortKey === _ && a.sortDirection != null;
    }
    function p(_) {
      n("sort", _);
    }
    function h(_) {
      return m(_) ? a.sortDirection === "asc" ? "ascending" : "descending" : "none";
    }
    const b = C(() => a.rows?.length ?? 0), y = C(() => b.value > a.maxVisibleRows), v = C(() => Math.max(0, b.value - a.maxVisibleRows)), k = C(() => a.rows?.length ? o.value || !y.value ? a.rows : a.rows.slice(0, a.maxVisibleRows) : []), w = C(
      () => a.viewMoreLabel.replace(/\{count\}/g, String(v.value))
    );
    return (_, $) => (g(), x("div", Rp, [
      d("div", Pp, [
        d("table", Ip, [
          d("thead", null, [
            d("tr", null, [
              (g(!0), x(de, null, pe(e.columns, (S) => (g(), x("th", {
                key: S.key,
                scope: "col",
                class: G(["kiut-table-th whitespace-nowrap px-3 py-2 text-left text-[#9191a1]", [r(S.align), S.headerClass]])
              }, [
                S.sortable ? (g(), x("button", {
                  key: 0,
                  type: "button",
                  class: G(["kiut-table-sort-btn inline-flex items-center gap-1", r(S.align)]),
                  "aria-sort": h(S.key),
                  onClick: (M) => p(S.key)
                }, [
                  d("span", null, A(S.label), 1),
                  d("span", Fp, [
                    m(S.key) ? (g(), x(de, { key: 0 }, [
                      e.sortDirection === "asc" ? (g(), x("span", Op, "↑")) : e.sortDirection === "desc" ? (g(), x("span", Vp, "↓")) : E("", !0)
                    ], 64)) : (g(), x(de, { key: 1 }, [
                      $[1] || ($[1] = d("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      $[2] || ($[2] = d("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, Ep)) : (g(), x(de, { key: 1 }, [
                  Ae(A(S.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          d("tbody", null, [
            (g(!0), x(de, null, pe(k.value, (S, M) => (g(), x("tr", {
              key: f(S, M)
            }, [
              (g(!0), x(de, null, pe(e.columns, (I) => (g(), x("td", {
                key: `${M}-${I.key}`,
                class: G(["kiut-table-td px-3 py-2 text-[color:var(--kiut-text-primary,#1e293b)]", [r(I.align), I.cellClass]])
              }, [
                ke(_.$slots, l(I.key), {
                  row: S,
                  column: I,
                  value: c(S, I.key)
                }, () => [
                  Ae(A(i(c(S, I.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ]),
      y.value ? (g(), x("button", {
        key: 0,
        type: "button",
        class: "view-more-btn",
        onClick: $[0] || ($[0] = (S) => o.value = !o.value)
      }, [
        Ae(A(o.value ? e.viewLessLabel : w.value) + " ", 1),
        (g(), x("svg", {
          class: G(["view-more-icon", { "view-more-icon-rotated": o.value }]),
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          "aria-hidden": "true"
        }, [...$[3] || ($[3] = [
          d("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M19 9l-7 7-7-7"
          }, null, -1)
        ])], 2))
      ])) : E("", !0)
    ]));
  }
}), gt = /* @__PURE__ */ ve(zp, [["__scopeId", "data-v-22a97a18"]]), Np = {
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
}, n0 = /* @__PURE__ */ ue({
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
      (v, k) => new Date(v.date).getTime() - new Date(k.date).getTime()
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
    ), c = C(() => n.data?.total_payment_success_value || []), u = C(() => {
      const v = c.value;
      return v.length === 0 ? h(0) : v.map(
        (k) => `${k.currency} ${h(k.total_value)}`
      ).join(" · ");
    }), f = (v) => v.payment_success_value || [], m = (v) => typeof v.payment_success_count == "number" ? v.payment_success_count : (v.payment_success_value || []).reduce(
      (k, w) => k + (w.count || 0),
      0
    ), p = (v) => Ie(v), h = (v) => v == null ? "0" : Ut(v);
    C(() => (n.data?.total_payment_success_value || []).reduce(
      (v, k) => v + (k.total_value || 0),
      0
    ));
    const b = C(() => {
      const v = n.data, k = v.total_booking_initiated || 0, w = v.total_booking_started || 0, _ = v.total_payment_initiated || 0, $ = v.total_not_found || 0, S = v.total_cancelled || 0, M = v.total_no_pending_balance || 0, I = v.total_errors || 0, z = typeof v.total_payment_success == "number" ? v.total_payment_success : (v.total_payment_success_value || []).reduce(
        (X, re) => X + (re.count || 0),
        0
      ), K = v.total_payment_failed || 0, D = Math.max(0, k - w), P = Math.max(
        0,
        w - _ - $ - S - M - I
      ), B = (X, re) => ye(X, re), H = [
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
      ], j = [];
      return w > 0 && j.push({
        source: "Initiated",
        target: "Started",
        value: w,
        label: B(w, k)
      }), D > 0 && j.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: D,
        label: B(D, k)
      }), _ > 0 && j.push({
        source: "Started",
        target: "Payment Initiated",
        value: _,
        label: B(_, k)
      }), $ > 0 && j.push({
        source: "Started",
        target: "Not Found",
        value: $,
        label: B($, k)
      }), S > 0 && j.push({
        source: "Started",
        target: "Cancelled",
        value: S,
        label: B(S, k)
      }), M > 0 && j.push({
        source: "Started",
        target: "No Pending Balance",
        value: M,
        label: B(M, k)
      }), I > 0 && j.push({
        source: "Started",
        target: "Errors",
        value: I,
        label: B(I, k)
      }), P > 0 && j.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: P,
        label: B(P, k)
      }), z > 0 && j.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: z,
        label: B(z, k)
      }), K > 0 && j.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: K,
        label: B(K, k)
      }), { nodes: H, links: j };
    }), y = (v, k) => It(v, k);
    return (v, k) => (g(), ae(Se, {
      class: "booking-manager-root h-full min-h-0",
      title: "Booking Manager Metrics",
      subtitle: "Booking manager workflow tracking and analysis",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: k[0] || (k[0] = (w) => o("open"))
    }, {
      headerExport: O(() => [
        e.enableExport && !n.loading && !n.error ? (g(), ae(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: O(() => [
        N(pt, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: O(() => [
            n.error ? (g(), x("div", Np, [
              d("div", jp, [
                k[1] || (k[1] = d("div", { class: "error-icon-wrapper" }, [
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
                k[2] || (k[2] = d("p", { class: "error-title" }, "Error loading data", -1)),
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
                k[3] || (k[3] = d("div", { class: "section-header" }, [
                  d("h4", { class: "section-title" }, "Daily Overview")
                ], -1)),
                d("div", Xp, [
                  N(gt, {
                    columns: r,
                    rows: l.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": O(({ row: w }) => [
                      d("span", Gp, A(T(He)(String(w.date)).format("MMM DD")), 1)
                    ]),
                    "cell-initiated": O(({ row: w }) => [
                      d("span", null, A(T(fe)(Number(w.booking_initiated_count))), 1)
                    ]),
                    "cell-started": O(({ row: w }) => [
                      d("span", null, [
                        Ae(A(T(fe)(Number(w.booking_started_count))) + " ", 1),
                        d("span", Zp, " (" + A(y(
                          Number(w.booking_started_count),
                          Number(w.booking_initiated_count)
                        )) + ") ", 1)
                      ])
                    ]),
                    "cell-paymentInitiated": O(({ row: w }) => [
                      d("span", null, A(T(fe)(Number(w.payment_initiated_count))), 1)
                    ]),
                    "cell-paymentResults": O(({ row: w }) => [
                      d("div", Qp, [
                        N(Ge, { color: "success" }, {
                          default: O(() => [
                            Ae(" Success: " + A(T(fe)(
                              m(w)
                            )), 1)
                          ]),
                          _: 2
                        }, 1024),
                        N(Ge, { color: "danger" }, {
                          default: O(() => [
                            Ae(" Failed: " + A(T(fe)(Number(w.payment_failed_count) || 0)), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    "cell-paymentValue": O(({ row: w }) => [
                      f(w).length > 0 ? (g(), x("div", Jp, [
                        (g(!0), x(de, null, pe(f(
                          w
                        ), (_) => (g(), x("span", {
                          key: `${w.date}-${_.currency}`,
                          class: "badge badge-currency"
                        }, A(_.currency) + " " + A(p(_.total_value)), 1))), 128))
                      ])) : (g(), x("span", e0, "N/A"))
                    ]),
                    "cell-outcomes": O(({ row: w }) => [
                      d("div", t0, [
                        N(Ge, { color: "danger" }, {
                          default: O(() => [
                            Ae(" Not Found: " + A(w.not_found_count ? T(fe)(Number(w.not_found_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        N(Ge, { color: "warning" }, {
                          default: O(() => [
                            Ae(" Cancelled: " + A(w.cancelled_count ? T(fe)(Number(w.cancelled_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        N(Ge, { color: "orange" }, {
                          default: O(() => [
                            Ae(" No Balance: " + A(w.no_pending_balance_count ? T(fe)(Number(w.no_pending_balance_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        N(Ge, { color: "danger" }, {
                          default: O(() => [
                            Ae(" Errors: " + A(w.error_count ? T(fe)(Number(w.error_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (g(), x("section", a0, [...k[4] || (k[4] = [
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
}), o0 = /* @__PURE__ */ ve(n0, [["__scopeId", "data-v-d68eddff"]]), s0 = { class: "card-body" }, i0 = {
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
    const a = t, n = (_) => {
      a("export", _);
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
    }, u = C(
      () => o.showPaymentLinks ? [...l, c] : l
    ), f = C(
      () => (r.value || []).map((_) => ({
        id: _.date,
        date: _.date,
        checkin_initiated_count: _.checkin_initiated_count,
        checkin_init_count: _.checkin_init_count,
        checkin_started_count: _.checkin_started_count,
        checkin_completed_count: _.checkin_completed_count,
        checkin_closed_count: _.checkin_closed_count,
        failed_steps: _.failed_steps,
        record_locator_create_payment_count: _.record_locator_create_payment_count
      }))
    ), m = C(() => {
      const _ = o.data;
      return _ && (Array.isArray(_.checkin_by_day) && _.checkin_by_day.length > 0 || (_.total_checkin_initiated ?? 0) > 0) ? { ...s, ..._ } : o.checkinData ?? s;
    }), p = C(() => {
      const _ = o.data;
      return _ && (Array.isArray(_.failed_by_step_by_day) && _.failed_by_step_by_day.length > 0 || Array.isArray(_.unrecovered_by_step) && _.unrecovered_by_step.length > 0) ? {
        ...i,
        total_checkin_failed: _.total_checkin_failed ?? 0,
        total_checkin_unrecovered: _.total_checkin_unrecovered ?? 0,
        failed_by_step_by_day: _.failed_by_step_by_day ?? [],
        unrecovered_by_step: _.unrecovered_by_step ?? [],
        unrecovered_by_day: _.unrecovered_by_day ?? []
      } : o.failedData ?? i;
    }), h = (_, $) => !$ || $ === 0 ? "0.0%" : It(_, $), b = (_, $) => {
      const S = fe(_), M = h(_, $);
      return `${S} (${M})`;
    }, y = (_) => _.reduce(($, S) => $ + S.failed_count, 0), v = C(() => {
      const _ = [], $ = [], S = /* @__PURE__ */ new Set(), M = (Q, U = {}) => {
        S.has(Q) || (_.push({ name: Q, ...U }), S.add(Q));
      };
      if (!m.value.total_checkin_initiated)
        return { nodes: _, links: $ };
      M("Checkin Init", { value: m.value.total_checkin_initiated }), M("Booking retrive"), M("Booking retrive success"), M("Number of Passengers"), M("Completed"), M("Closed with BP");
      const I = m.value.total_checkin_initiated, z = m.value.total_checkin_init, K = m.value.total_checkin_init_abandoned || 0, D = m.value.total_checkin_pre_init_abandoned_error, P = m.value.total_checkin_pre_init_abandoned_voluntary, B = D != null || P != null, H = B ? Math.max(Number(D) || 0, 0) : 0, j = B ? Math.max(Number(P) || 0, 0) : 0, X = m.value.total_checkin_init_abandoned_error, re = m.value.total_checkin_init_abandoned_voluntary, he = X != null || re != null, Z = he ? Math.max(Number(X) || 0, 0) : 0, oe = he ? Math.max(Number(re) || 0, 0) : 0, L = he ? Math.max(K - Z - oe, 0) : K, Y = z - K, q = m.value.total_checkin_started, F = m.value.total_checkin_completed, se = m.value.total_checkin_closed, le = p.value.unrecovered_by_step || [], J = le.reduce(
        (Q, U) => Q + U.count,
        0
      );
      z > 0 && $.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: z,
        label: ye(z, I)
      });
      const R = I - z;
      B ? (j > 0 && (M("Abandoned (Init)", { status: "abandon" }), $.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: j,
        label: ye(j, I)
      })), H > 0 && (M("Booking not retreived", { status: "error" }), $.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: H,
        label: ye(H, I)
      }))) : R > 0 && (M("Abandoned (Init)", { status: "abandon" }), $.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: R,
        label: ye(R, I)
      })), he ? (Z > 0 && (M("Error", { status: "error" }), $.push({
        source: "Booking retrive",
        target: "Error",
        value: Z,
        label: ye(Z, I)
      })), oe > 0 && (M("Abandoned (Started)", { status: "abandon" }), $.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: oe,
        label: ye(oe, I)
      })), L > 0 && (M("Abandoned (Started)", { status: "abandon" }), $.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: L,
        label: ye(L, I)
      }))) : K > 0 && (M("Abandoned (Started)", { status: "abandon" }), $.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: K,
        label: ye(K, I)
      })), Y > 0 && $.push({
        source: "Booking retrive",
        target: "Booking retrive success",
        value: Y,
        label: ye(Y, I)
      }), q > 0 && $.push({
        source: "Booking retrive success",
        target: "Number of Passengers",
        value: q,
        label: ye(q, I)
      }), F > 0 && $.push({
        source: "Number of Passengers",
        target: "Completed",
        value: F,
        label: ye(F, I)
      }), le.length > 0 && J > 0 && (M("Unrecovered", { status: "error" }), $.push({
        source: "Number of Passengers",
        target: "Unrecovered",
        value: J,
        label: ye(J, I)
      }), le.forEach((Q, U) => {
        const ge = Q.step_name.replace(/_/g, " ").split(" ").map((be) => be.charAt(0).toUpperCase() + be.slice(1)).join(" ");
        M(ge, { status: "error", order: U + 1 }), $.push({
          source: "Unrecovered",
          target: ge,
          value: Q.count,
          label: ye(Q.count, I)
        });
      }));
      const W = q - (F + J);
      W > 0 && (M("Abandoned (Flow)", { status: "abandon" }), $.push({
        source: "Number of Passengers",
        target: "Abandoned (Flow)",
        value: W,
        label: ye(W, I)
      }));
      const ie = F - se;
      return ie > 0 && (M("BP Error", { status: "error", order: 0 }), $.push({
        source: "Completed",
        target: "BP Error",
        value: ie,
        label: ye(ie, I)
      })), se > 0 && $.push({
        source: "Completed",
        target: "Closed with BP",
        value: se,
        label: ye(se, I)
      }), { nodes: _, links: $ };
    }), k = () => {
      const _ = o.data?.record_locator_by_day;
      if (Array.isArray(_) && _.length > 0) return _;
      const $ = o.checkinData?.record_locator_by_day;
      return Array.isArray($) && $.length > 0 ? $ : [];
    }, w = () => {
      const _ = m.value.checkin_by_day || [], $ = p.value.failed_by_step_by_day || [], S = k();
      if (_.length === 0) {
        r.value = [];
        return;
      }
      r.value = [..._].map((M) => {
        const I = $.find(
          (K) => K.date === M.date
        ), z = S.find(
          (K) => K.date === M.date
        );
        return {
          ...M,
          failed_steps: I?.steps || [],
          record_locator_create_payment_count: M.record_locator_create_payment_count ?? z?.record_locator_create_payment_count ?? 0
        };
      }), r.value.sort((M, I) => new Date(M.date) - new Date(I.date));
    };
    return Te(
      [() => o.data, () => o.checkinData, () => o.failedData],
      () => {
        w();
      },
      { deep: !0, immediate: !0 }
    ), (_, $) => (g(), ae(Se, {
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
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: O(() => [
        d("div", s0, [
          v.value.nodes.length > 0 ? (g(), x("section", i0, [
            d("div", r0, [
              N(aa, {
                data: v.value,
                height: "400px",
                "use-gradient": !1,
                "node-gap": 16
              }, null, 8, ["data"])
            ])
          ])) : E("", !0),
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
                  d("span", null, A(T(fe)(S.checkin_initiated_count)), 1)
                ]),
                "cell-bookingRetrieve": O(({ row: S }) => [
                  d("span", null, A(b(
                    S.checkin_init_count,
                    S.checkin_initiated_count
                  )), 1)
                ]),
                "cell-passengers": O(({ row: S }) => [
                  d("span", null, A(T(fe)(S.checkin_started_count)), 1)
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
                    y(S.failed_steps),
                    S.checkin_initiated_count
                  )), 1)
                ]),
                "cell-reasons": O(({ row: S }) => [
                  S.failed_steps && S.failed_steps.length > 0 ? (g(), x("div", f0, [
                    (g(!0), x(de, null, pe(S.failed_steps, (M) => (g(), x("div", {
                      key: M.step_name,
                      class: "reason-item"
                    }, [
                      d("span", g0, A(M.step_name.replace(/_/g, " ")) + ":", 1),
                      d("span", m0, A(M.failed_count), 1)
                    ]))), 128))
                  ])) : (g(), x("div", p0, "-"))
                ]),
                "cell-createPayment": O(({ row: S }) => [
                  d("span", null, A(T(fe)(S.record_locator_create_payment_count ?? 0)), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (g(), x("section", b0, [...$[0] || ($[0] = [
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
}, y0 = /* @__PURE__ */ ve(v0, [["__scopeId", "data-v-ae5fc0f7"]]), x0 = { class: "card-body" }, k0 = {
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
}, L0 = { class: "empty-state-content" }, R0 = { class: "empty-icon-wrapper" }, P0 = /* @__PURE__ */ ue({
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
    const n = e, o = a, s = (k) => {
      o("export", k);
    }, { isDark: i } = Me($e(n, "theme")), r = (k) => k == null ? "0" : k.toLocaleString(), l = (k) => {
      const [w, _, $] = k.split("-").map(Number);
      return He([w, _ - 1, $]).format("MMM DD");
    }, c = (k) => k.replace(/_/g, " ").replace(/\b\w/g, (w) => w.toUpperCase()), u = (k, w) => It(k, w), f = (k, w) => {
      const _ = k || 0, $ = w || 0, S = r(_), M = u(_, $);
      return `${S} (${M})`;
    }, m = C(() => {
      const k = n.checkinData?.record_locator_by_day || [], w = n.failedData?.failed_by_step_by_day || [], _ = n.failedData?.unrecovered_by_day || [];
      return k.map((S) => {
        const M = w.find((z) => z.date === S.date), I = _.find(
          (z) => z.date === S.date
        );
        return {
          ...S,
          failed_steps: M?.steps || [],
          unrecovered_count: I?.unrecovered_count || 0
        };
      }).sort(
        (S, M) => new Date(S.date).getTime() - new Date(M.date).getTime()
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
    ], h = {
      key: "createPayment",
      label: "Create Payment",
      align: "center"
    }, b = C(
      () => n.isAvianca ? [...p, h] : p
    ), y = C(
      () => m.value.map((k) => ({
        id: k.date,
        date: k.date,
        checkin_initiated: k.checkin_initiated,
        record_locator_init_count: k.record_locator_init_count,
        record_locator_started_count: k.record_locator_started_count,
        record_locator_completed_count: k.record_locator_completed_count,
        record_locator_closed_count: k.record_locator_closed_count,
        unrecovered_count: k.unrecovered_count,
        failed_steps: k.failed_steps,
        record_locator_create_payment_count: k.record_locator_create_payment_count
      }))
    ), v = C(() => {
      const k = [], w = [], _ = /* @__PURE__ */ new Set(), $ = (R, W = {}) => {
        _.has(R) || (k.push({ name: R, ...W }), _.add(R));
      };
      if (!n.checkinData?.total_checkin_initiated)
        return { nodes: k, links: w };
      const S = n.checkinData.total_checkin_initiated || 0;
      $("Checkin Init", { value: S }), $("Booking Retrieval"), $("Booking Retrieved"), $("Completed"), $("Closed with BP");
      const M = n.checkinData.total_record_locator_init || 0, I = n.checkinData.total_record_locator_init_abandoned || 0, z = n.checkinData.total_checkin_pre_init_abandoned_error, K = n.checkinData.total_checkin_pre_init_abandoned_voluntary, D = z != null || K != null, P = D ? Math.max(Number(z) || 0, 0) : 0, B = D ? Math.max(Number(K) || 0, 0) : 0, H = n.checkinData.total_record_locator_init_abandoned_error, j = n.checkinData.total_record_locator_init_abandoned_voluntary, X = H != null || j != null, re = X ? Math.max(Number(H) || 0, 0) : 0, he = X ? Math.max(Number(j) || 0, 0) : 0, Z = X ? Math.max(I - re - he, 0) : I, oe = M - I, L = n.checkinData.total_record_locator_started || 0, Y = n.checkinData.total_record_locator_completed || 0, q = n.checkinData.total_record_locator_closed || 0, F = n.checkinData.total_record_locator_unrecovered || 0;
      M > 0 && w.push({
        source: "Checkin Init",
        target: "Booking Retrieval",
        value: M,
        label: ye(M, S)
      });
      const se = S - M;
      D ? (B > 0 && ($("Abandoned (Init)"), w.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: B,
        label: ye(B, S)
      })), P > 0 && ($("Booking not retreived"), w.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: P,
        label: ye(P, S)
      }))) : se > 0 && ($("Abandoned (Init)"), w.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: se,
        label: ye(se, S)
      })), X ? (re > 0 && ($("Error"), w.push({
        source: "Booking Retrieval",
        target: "Error",
        value: re,
        label: ye(re, S)
      })), he > 0 && ($("Abandoned (Started)"), w.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: he,
        label: ye(he, S)
      })), Z > 0 && ($("Abandoned (Started)"), w.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: Z,
        label: ye(Z, S)
      }))) : I > 0 && ($("Abandoned (Started)"), w.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: I,
        label: ye(I, S)
      })), oe > 0 && w.push({
        source: "Booking Retrieval",
        target: "Booking Retrieved",
        value: oe,
        label: ye(oe, S)
      }), Y > 0 && w.push({
        source: "Booking Retrieved",
        target: "Completed",
        value: Y,
        label: ye(Y, S)
      }), F > 0 && ($("Errors"), w.push({
        source: "Booking Retrieved",
        target: "Errors",
        value: F,
        label: ye(F, S)
      }));
      const le = L - (Y + F);
      le > 0 && ($("Abandoned (Flow)"), w.push({
        source: "Booking Retrieved",
        target: "Abandoned (Flow)",
        value: le,
        label: ye(le, S)
      }));
      const J = Y - q;
      return J > 0 && ($("BP Error"), w.push({
        source: "Completed",
        target: "BP Error",
        value: J,
        label: ye(J, S)
      })), q > 0 && w.push({
        source: "Completed",
        target: "Closed with BP",
        value: q,
        label: ye(q, S)
      }), { nodes: k, links: w };
    });
    return t({ isDark: i }), (k, w) => (g(), ae(Se, {
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
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: O(() => [
        d("div", x0, [
          v.value.nodes.length > 0 ? (g(), x("div", k0, [
            N(aa, {
              data: v.value,
              height: "400px",
              "use-gradient": !1,
              "node-gap": 16
            }, null, 8, ["data"])
          ])) : E("", !0),
          m.value && m.value.length > 0 ? (g(), x("div", _0, [
            d("div", w0, [
              N(gt, {
                columns: b.value,
                rows: y.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": O(({ row: _ }) => [
                  d("span", C0, A(l(String(_.date))), 1)
                ]),
                "cell-checkinInit": O(({ row: _ }) => [
                  d("span", null, A(r(_.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieval": O(({ row: _ }) => [
                  d("span", null, A(f(
                    _.record_locator_init_count,
                    _.checkin_initiated
                  )), 1)
                ]),
                "cell-bookingRetrieved": O(({ row: _ }) => [
                  d("span", null, A(f(
                    _.record_locator_started_count,
                    _.checkin_initiated
                  )), 1)
                ]),
                "cell-completed": O(({ row: _ }) => [
                  d("span", null, A(f(
                    _.record_locator_completed_count,
                    _.checkin_initiated
                  )), 1)
                ]),
                "cell-closed": O(({ row: _ }) => [
                  d("span", $0, A(f(
                    _.record_locator_closed_count,
                    _.checkin_initiated
                  )), 1)
                ]),
                "cell-failed": O(({ row: _ }) => [
                  d("span", S0, A(f(
                    _.unrecovered_count,
                    _.checkin_initiated
                  )), 1)
                ]),
                "cell-createPayment": O(({ row: _ }) => [
                  d("span", null, A(r(
                    _.record_locator_create_payment_count ?? 0
                  )), 1)
                ]),
                "cell-reasons": O(({ row: _ }) => [
                  Array.isArray(_.failed_steps) && _.failed_steps.length > 0 ? (g(), x("div", M0, [
                    (g(!0), x(de, null, pe(_.failed_steps, ($) => (g(), x("div", {
                      key: $.step_name,
                      class: "reason-item"
                    }, [
                      d("span", D0, A(c($.step_name)) + ":", 1),
                      d("span", A0, A($.failed_count), 1)
                    ]))), 128))
                  ])) : (g(), x("div", T0, "-"))
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (g(), x("div", B0, [
            d("div", L0, [
              d("div", R0, [
                N(T(rt), { class: "empty-icon" })
              ]),
              w[0] || (w[0] = d("p", { class: "empty-title" }, "No check-in data available", -1)),
              w[1] || (w[1] = d("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see check-in metrics. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["collapsible", "default-open", "loading"]));
  }
}), wr = /* @__PURE__ */ ve(P0, [["__scopeId", "data-v-f24bc364"]]), I0 = { class: "card-body" }, E0 = {
  key: 0,
  class: "checkin-segments-daily-section"
}, F0 = { class: "w-full min-w-0" }, O0 = { class: "segment-plain" }, V0 = { class: "segment-plain" }, z0 = { class: "segment-plain" }, N0 = { class: "percentage-value" }, j0 = { class: "percentage-value" }, H0 = { class: "percentage-value success" }, W0 = {
  key: 1,
  class: "empty-state"
}, K0 = /* @__PURE__ */ ue({
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
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed (%)", align: "center" }
    ], l = C(
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
        }, null, 8, ["loading"])) : E("", !0)
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
                    class: G(["segment-plain", {
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
                  Ae(A(T(fe)(h.segment_init_count)), 1)
                ]),
                "cell-started": O(({ row: h }) => [
                  d("span", N0, A(c(
                    h.segment_started_count,
                    h.segment_init_count
                  )), 1)
                ]),
                "cell-completed": O(({ row: h }) => [
                  d("span", j0, A(c(
                    h.segment_completed_count,
                    h.segment_init_count
                  )), 1)
                ]),
                "cell-closed": O(({ row: h }) => [
                  d("span", H0, A(c(
                    h.segment_closed_count,
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
}), Cr = /* @__PURE__ */ ve(K0, [["__scopeId", "data-v-b8704d3c"]]), U0 = { class: "checkin-container__body" }, Y0 = /* @__PURE__ */ ue({
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
          }, null, 8, ["initially-open", "loading", "checkin-data", "failed-data", "enable-export", "export-loading", "is-avianca"])) : E("", !0),
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
}), q0 = /* @__PURE__ */ ve(Y0, [["__scopeId", "data-v-bedc6aa8"]]), X0 = { class: "card-body" }, G0 = { class: "chart-section" }, Z0 = { class: "chart-wrapper" }, Q0 = {
  key: 1,
  class: "empty-chart"
}, J0 = { class: "payment-success-summary" }, eb = {
  key: 0,
  class: "disruption-daily-section"
}, tb = { class: "w-full min-w-0" }, ab = { class: "font-medium text-center" }, nb = { class: "text-center" }, ob = { class: "text-center" }, sb = { class: "percentage-text" }, ib = { class: "text-center" }, rb = { class: "abandoned-value" }, lb = { class: "badges-container badges-wrap" }, cb = { class: "badges-container badges-wrap" }, db = {
  key: 1,
  class: "empty-state"
}, ub = /* @__PURE__ */ ue({
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
    ), c = C(() => n.data?.total_payment_success || []), u = C(() => {
      const y = c.value;
      return y.length === 0 ? m(0) : y.map((v) => `${v.currency} ${m(v.total_value)}`).join(" · ");
    }), f = (y, v) => It(y, v), m = (y) => Ie(y), p = (y) => (y ?? []).reduce((v, k) => v + (k.count ?? 0), 0), h = (y) => typeof y.sell_success_count == "number" ? y.sell_success_count : p(y.payment_success_total), b = C(() => {
      const y = n.data, v = y.total_disruption_conversations || 0, k = y.total_disruption_initiated || 0, w = y.total_voluntary || 0, _ = y.total_involuntary || 0, $ = y.total_accepted || 0, S = y.total_confirmed || 0, M = typeof y.total_sell_success == "number" ? y.total_sell_success : p(y.total_payment_success), I = y.total_sell_failed || 0, z = Math.max(0, v - k), K = Math.max(
        0,
        k - w - _
      ), D = Math.max(0, _ - $), P = Math.max(0, w - S), B = I, H = Math.max(0, S - M - B), j = (he, Z) => ye(he, Z), X = [
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
      ], re = [];
      return k > 0 && re.push({
        source: "Initiated",
        target: "Started",
        value: k,
        label: j(k, v)
      }), z > 0 && re.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: z,
        label: j(z, v)
      }), w > 0 && re.push({
        source: "Started",
        target: "Voluntary",
        value: w,
        label: j(w, v)
      }), _ > 0 && re.push({
        source: "Started",
        target: "Involuntary",
        value: _,
        label: j(_, v)
      }), K > 0 && re.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: K,
        label: j(K, v)
      }), $ > 0 && re.push({
        source: "Involuntary",
        target: "Accepted",
        value: $,
        label: j($, v)
      }), D > 0 && re.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: D,
        label: j(D, v)
      }), S > 0 && re.push({
        source: "Voluntary",
        target: "Confirmed",
        value: S,
        label: j(S, v)
      }), P > 0 && re.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: P,
        label: j(P, v)
      }), M > 0 && re.push({
        source: "Confirmed",
        target: "Paid",
        value: M,
        label: j(M, v)
      }), B > 0 && re.push({
        source: "Confirmed",
        target: "Rejected",
        value: B,
        label: j(B, v)
      }), H > 0 && re.push({
        source: "Confirmed",
        target: "Not Paid",
        value: H,
        label: j(H, v)
      }), { nodes: X, links: re };
    });
    return (y, v) => (g(), ae(Se, {
      class: "disruption-metrics-root h-full min-h-0",
      title: "Disruption Manager Metrics",
      subtitle: "Disruption workflow performance and completion tracking",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: v[0] || (v[0] = (k) => o("open"))
    }, {
      headerExport: O(() => [
        e.enableExport && !n.loading ? (g(), ae(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
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
              }, null, 8, ["data"])) : (g(), x("div", Q0, [...v[1] || (v[1] = [
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
            v[2] || (v[2] = d("div", { class: "section-header" }, [
              d("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            d("div", tb, [
              N(gt, {
                columns: r,
                rows: l.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": O(({ row: k }) => [
                  d("span", ab, A(T(He)(String(k.date)).format("MMM DD")), 1)
                ]),
                "cell-initiated": O(({ row: k }) => [
                  d("span", nb, A(T(fe)(Number(k.disruption_conversations))), 1)
                ]),
                "cell-started": O(({ row: k }) => [
                  d("span", ob, [
                    Ae(A(T(fe)(Number(k.disruption_initiated_count))) + " ", 1),
                    d("span", sb, " (" + A(f(
                      Number(k.disruption_initiated_count),
                      Number(k.disruption_conversations)
                    )) + ") ", 1)
                  ])
                ]),
                "cell-abandoned": O(({ row: k }) => [
                  d("span", ib, [
                    d("span", rb, A(T(fe)(
                      Number(k.disruption_initiated_count) - Number(k.voluntary_count) - Number(k.involuntary_count)
                    )) + " (" + A(f(
                      Number(k.disruption_initiated_count) - Number(k.voluntary_count) - Number(k.involuntary_count),
                      Number(k.disruption_conversations)
                    )) + ") ", 1)
                  ])
                ]),
                "cell-voluntary": O(({ row: k }) => [
                  d("div", lb, [
                    (g(!0), x(de, null, pe([k], (w, _) => (g(), x(de, { key: _ }, [
                      N(Ge, {
                        color: "neutral",
                        outlined: !0
                      }, {
                        default: O(() => [
                          Ae(" VOL " + A(T(fe)(w.voluntary_count)) + " (" + A(f(
                            w.voluntary_count,
                            w.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ge, { color: "success" }, {
                        default: O(() => [
                          Ae(" Confirm " + A(T(fe)(w.confirmed_count)) + " (" + A(f(
                            w.confirmed_count,
                            w.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ge, { color: "warning" }, {
                        default: O(() => [
                          Ae(" Not Confirm " + A(T(fe)(w.voluntary_count - w.confirmed_count)) + " (" + A(f(
                            w.voluntary_count - w.confirmed_count,
                            w.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ge, { color: "danger" }, {
                        default: O(() => [
                          Ae(" Reject " + A(T(fe)(w.sell_failed_count)) + " (" + A(f(
                            w.sell_failed_count,
                            w.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ge, { color: "orange" }, {
                        default: O(() => [
                          Ae(" Not Paid " + A(T(fe)(
                            Math.max(
                              0,
                              w.confirmed_count - h(w) - w.sell_failed_count
                            )
                          )) + " (" + A(f(
                            Math.max(
                              0,
                              w.confirmed_count - h(w) - w.sell_failed_count
                            ),
                            w.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ge, {
                        color: "success",
                        outlined: !0
                      }, {
                        default: O(() => [
                          Ae(" Finish " + A(T(fe)(h(w))) + " (" + A(f(
                            h(w),
                            w.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      (g(!0), x(de, null, pe(w.payment_success_total || [], ($) => (g(), ae(Ge, {
                        key: `${w.date}-${$.currency}`,
                        color: "neutral"
                      }, {
                        default: O(() => [
                          Ae(A($.currency) + " " + A(m($.total_value)), 1)
                        ]),
                        _: 2
                      }, 1024))), 128))
                    ], 64))), 128))
                  ])
                ]),
                "cell-involuntary": O(({ row: k }) => [
                  d("div", cb, [
                    (g(!0), x(de, null, pe([k], (w, _) => (g(), x(de, { key: _ }, [
                      N(Ge, { color: "purple" }, {
                        default: O(() => [
                          Ae(" INV " + A(T(fe)(w.involuntary_count)) + " (" + A(f(
                            w.involuntary_count,
                            w.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ge, { color: "danger" }, {
                        default: O(() => [
                          Ae(" Human " + A(T(fe)(w.involuntary_count - w.accepted_count)) + " (" + A(f(
                            w.involuntary_count - w.accepted_count,
                            w.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ge, { color: "success" }, {
                        default: O(() => [
                          Ae(" Accept " + A(T(fe)(w.accepted_count)) + " (" + A(f(
                            w.accepted_count,
                            w.disruption_conversations
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
          ])) : (g(), x("section", db, [...v[3] || (v[3] = [
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
}), hb = /* @__PURE__ */ ve(ub, [["__scopeId", "data-v-033e517a"]]), fb = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, gb = { class: "w-full shrink-0 flex min-h-0 flex-col" }, mb = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, pb = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, bb = { class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4" }, vb = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, yb = /* @__PURE__ */ ue({
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
    }), u = C(
      () => n.data ?? {
        total_faq_events: 0,
        total_documents_found: 0,
        total_airline_information_retrieved: 0,
        total_booking_info_retrieved: 0,
        total_flight_status_retrieved: 0,
        faq_by_day: []
      }
    ), f = C(() => {
      const p = u.value, h = p.total_airline_information_retrieved + p.total_booking_info_retrieved + p.total_flight_status_retrieved, b = (k) => h > 0 ? (k / h * 100).toFixed(1) : "0.0", y = p.total_faq_events, v = y > 0 ? `${(p.total_documents_found / y * 100).toFixed(1)}% of FAQ events` : void 0;
      return [
        {
          name: "airline_information",
          label: "Airline Info",
          color: l.airline_information,
          value: `${b(p.total_airline_information_retrieved)}%`,
          subvalue: `${fe(p.total_airline_information_retrieved)} consultas`
        },
        {
          name: "booking_info",
          label: "Booking Info",
          color: l.booking_info,
          value: `${b(p.total_booking_info_retrieved)}%`,
          subvalue: `${fe(p.total_booking_info_retrieved)} consultas`
        },
        {
          name: "flight_status",
          label: "Flight Status",
          color: l.flight_status,
          value: `${b(p.total_flight_status_retrieved)}%`,
          subvalue: `${fe(p.total_flight_status_retrieved)} consultas`
        },
        {
          name: "documents_found",
          label: "Documents found",
          color: "#64748b",
          value: fe(p.total_documents_found),
          subvalue: v
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
          (w) => He(w.date).format("MMM DD")
        ), y = h.map(
          (w) => w.airline_information_retrieved_count || 0
        ), v = h.map(
          (w) => w.flight_status_retrieved_count || 0
        ), k = h.map(
          (w) => w.booking_info_retrieved_count || 0
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
              data: k,
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
        }, null, 8, ["loading"])) : E("", !0)
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
                (g(!0), x(de, null, pe(f.value, (b) => (g(), ae(xe, {
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
}), xb = /* @__PURE__ */ ve(yb, [["__scopeId", "data-v-b6ea961f"]]);
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
const lt = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", et = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", _b = "min-h-[5.5rem] w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans leading-normal text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", Dt = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", At = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", wb = "kiut-select-option-badge shrink-0 whitespace-nowrap rounded-md px-2 py-0.5 text-[0.6875rem] font-medium leading-4";
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
}, Eb = { class: "min-w-0 flex-1 truncate" }, na = /* @__PURE__ */ ue({
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
    const a = e, n = t, o = `kiut-select-${We()}`, s = `${o}-label`, i = `${o}-btn`, r = `${o}-listbox`, l = `${o}-err`, c = C(() => a.invalid ?? !1), u = ne(null), f = ne(null), m = ne(null), p = ne(null), h = ne(null), b = ne(!1), y = ne(0), v = ne(""), k = ne({});
    function w() {
      const F = f.value;
      if (!F) return;
      const se = F.getBoundingClientRect();
      k.value = {
        top: `${se.bottom - 3}px`,
        left: `${se.left}px`,
        width: `${se.width}px`
      };
    }
    const _ = C(() => a.options.filter((F) => !F.disabled)), $ = C(() => {
      if (!a.searchable) return _.value;
      const F = v.value.trim().toLowerCase();
      return F ? _.value.filter(
        (se) => se.label.toLowerCase().includes(F) || se.badge?.label.toLowerCase().includes(F)
      ) : _.value;
    }), S = C(
      () => a.ariaLabelTrigger ?? a.placeholder ?? "Seleccionar opción"
    ), M = C(
      () => a.options.find((F) => F.value === a.modelValue) ?? null
    ), I = C(() => a.modelValue === null || a.modelValue === void 0 || a.modelValue === "" ? a.placeholder : M.value?.label ?? String(a.modelValue)), z = C(() => M.value?.leadingClass);
    function K(F) {
      return `${String(F.value)}-${F.label}`;
    }
    function D(F) {
      return a.modelValue === F.value;
    }
    function P(F, se) {
      const le = D(F), J = y.value === se, R = !!a.listSectionLabel;
      return [
        "flex cursor-pointer items-center gap-2.5 text-sm outline-none transition-colors",
        R ? "border-b border-gray-200 px-3 py-2.5 last:border-b-0 dark:border-white/5" : "gap-1.5 px-2 py-2",
        le ? R ? "bg-[color:var(--kiut-primary-section)] font-medium text-[color:var(--kiut-primary)] dark:bg-[color:var(--kiut-primary-section)]" : "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !le && J ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function B() {
      y.value = Math.max(
        0,
        $.value.findIndex((F) => F.value === a.modelValue)
      );
    }
    function H() {
      if (a.searchable) {
        h.value?.focus();
        return;
      }
      p.value?.focus();
    }
    function j() {
      w(), v.value = "", B(), Ke(() => H());
    }
    function X() {
      b.value = !1, v.value = "";
    }
    function re(F) {
      n("update:modelValue", F.value), X();
    }
    function he() {
      if (!a.disabled) {
        if (b.value) {
          X();
          return;
        }
        b.value = !0, j();
      }
    }
    function Z(F) {
      F.stopPropagation(), !a.disabled && he();
    }
    function oe(F) {
      if (!b.value) return;
      const se = F.target, le = u.value, J = m.value;
      le && !le.contains(se) && (!J || !J.contains(se)) && X();
    }
    function L(F) {
      a.disabled || (F.key === "ArrowDown" || F.key === "Enter" || F.key === " ") && (F.preventDefault(), b.value || (b.value = !0, j()));
    }
    function Y(F) {
      const se = $.value;
      if (F.key === "Escape") {
        F.preventDefault(), X();
        return;
      }
      if (F.key === "ArrowDown") {
        if (F.preventDefault(), se.length === 0) return;
        y.value = 0, p.value?.focus();
        return;
      }
      if (F.key === "ArrowUp") {
        if (F.preventDefault(), se.length === 0) return;
        y.value = se.length - 1, p.value?.focus();
        return;
      }
      if (F.key === "Enter") {
        F.preventDefault();
        const le = se[y.value];
        le && re(le);
      }
    }
    function q(F) {
      const se = $.value;
      if (F.key === "Escape") {
        F.preventDefault(), X();
        return;
      }
      if (se.length !== 0) {
        if (F.key === "ArrowDown") {
          F.preventDefault(), y.value = Math.min(y.value + 1, se.length - 1);
          return;
        }
        if (F.key === "ArrowUp") {
          if (F.preventDefault(), y.value === 0 && a.searchable) {
            h.value?.focus();
            return;
          }
          y.value = Math.max(y.value - 1, 0);
          return;
        }
        if (F.key === "Enter") {
          F.preventDefault();
          const le = se[y.value];
          le && re(le);
        }
      }
    }
    return Te(v, () => {
      y.value = 0;
    }), Je(() => {
      document.addEventListener("click", oe);
    }), it(() => {
      document.removeEventListener("click", oe);
    }), (F, se) => (g(), x("div", {
      ref_key: "rootRef",
      ref: u,
      class: "relative font-sans"
    }, [
      d("div", Cb, [
        F.$slots.icon ? (g(), x("span", $b, [
          ke(F.$slots, "icon")
        ])) : E("", !0),
        e.label ? (g(), x("label", {
          key: 1,
          id: s,
          class: G(T(lt))
        }, A(e.label), 3)) : E("", !0)
      ]),
      d("button", {
        ref_key: "buttonRef",
        ref: f,
        id: i,
        type: "button",
        disabled: e.disabled,
        class: G([
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
        onClick: Z,
        onKeydown: L
      }, [
        d("span", Mb, [
          z.value ? (g(), x("span", {
            key: 0,
            class: G([z.value, "shrink-0"]),
            "aria-hidden": "true"
          }, null, 2)) : E("", !0),
          M.value?.leadingIcon ? (g(), x("span", {
            key: 1,
            class: G([
              "inline-flex shrink-0 items-center justify-center rounded-full",
              M.value.leadingIconWrapperClass
            ])
          }, [
            (g(), ae(ht(M.value.leadingIcon), {
              class: G(["h-4 w-4", M.value.leadingIconClass])
            }, null, 8, ["class"]))
          ], 2)) : E("", !0),
          d("span", {
            class: G([
              "min-w-0 truncate",
              e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
            ])
          }, A(I.value), 3),
          M.value?.badge ? (g(), x("span", {
            key: 2,
            class: G(T(ui)(M.value.badge.variant))
          }, A(M.value.badge.label), 3)) : E("", !0)
        ]),
        N(T(ta), {
          class: G(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", b.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, Sb),
      e.errorText ? (g(), x("p", {
        key: 0,
        id: l,
        class: G(T(At)),
        role: "alert"
      }, A(e.errorText), 3)) : E("", !0),
      (g(), ae(Qt, { to: "body" }, [
        Xe(d("div", {
          ref_key: "panelRef",
          ref: m,
          style: we(k.value),
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
                "onUpdate:modelValue": se[0] || (se[0] = (le) => v.value = le),
                type: "search",
                class: G([T(et), "min-h-0 py-2 pl-9 pr-3 text-sm"]),
                placeholder: e.searchPlaceholder,
                "aria-label": e.searchPlaceholder,
                onClick: se[1] || (se[1] = Be(() => {
                }, ["stop"])),
                onKeydown: Be(Y, ["stop"])
              }, null, 42, Bb), [
                [Rt, v.value]
              ])
            ])
          ])) : E("", !0),
          e.listSectionLabel ? (g(), x("p", Lb, A(e.listSectionLabel), 1)) : E("", !0),
          d("ul", {
            id: r,
            ref_key: "listRef",
            ref: p,
            role: "listbox",
            tabindex: "-1",
            class: G(
              e.listSectionLabel ? "max-h-60 overflow-auto pb-1" : "max-h-60 overflow-auto py-1"
            ),
            onKeydown: Be(q, ["stop"])
          }, [
            $.value.length === 0 ? (g(), x("li", Rb, A(e.noResultsText), 1)) : E("", !0),
            (g(!0), x(de, null, pe($.value, (le, J) => (g(), x("li", {
              key: K(le),
              role: "option",
              "aria-selected": D(le),
              class: G(P(le, J)),
              onClick: Be((R) => re(le), ["stop"]),
              onMouseenter: (R) => y.value = J
            }, [
              le.leadingClass ? (g(), x("span", {
                key: 0,
                class: G([le.leadingClass, "shrink-0"]),
                "aria-hidden": "true"
              }, null, 2)) : E("", !0),
              e.showOptionCheck ? (g(), x("span", Ib, [
                D(le) ? (g(), ae(T(Bn), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : E("", !0)
              ])) : E("", !0),
              le.leadingIcon ? (g(), x("span", {
                key: 2,
                class: G([
                  "inline-flex shrink-0 items-center justify-center rounded-full",
                  le.leadingIconWrapperClass
                ])
              }, [
                (g(), ae(ht(le.leadingIcon), {
                  class: G(["h-4 w-4", le.leadingIconClass])
                }, null, 8, ["class"]))
              ], 2)) : E("", !0),
              d("span", Eb, A(le.label), 1),
              le.badge ? (g(), x("span", {
                key: 3,
                class: G(T(ui)(le.badge.variant))
              }, A(le.badge.label), 3)) : E("", !0)
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
}, Wb = { class: "max-w-[360px] px-4 text-center" }, Kb = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Ub = { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, Yb = { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, qb = /* @__PURE__ */ ue({
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
    }, o = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899", "#06B6D4"], s = e, i = a, r = (k) => {
      i("export", k);
    }, l = (k) => {
      i("changeBreakdown", String(k));
    }, c = (k) => {
      const w = k.toLowerCase(), _ = n[w] || n[k];
      if (_) return _;
      const $ = Array.from(w).reduce(
        (S, M) => (S << 5) - S + M.charCodeAt(0) | 0,
        0
      );
      return o[Math.abs($) % o.length];
    }, u = $e(s, "theme"), { isDark: f } = Me(u), m = (k) => {
      const w = St(k).replace(/_/g, " ");
      return w.charAt(0).toUpperCase() + w.slice(1);
    }, p = C(() => {
      const k = {};
      for (const w of Object.values(s.data?.agents_by_day || {}))
        for (const [_, $] of Object.entries(w))
          k[_] = (k[_] || 0) + $;
      return k;
    }), h = C(() => {
      const k = s.data?.agents_by_day || {}, w = Object.keys(k).sort();
      if (w.length === 0)
        return { labels: [], datasets: [] };
      const $ = Object.keys(p.value).sort(
        (S, M) => p.value[M] - p.value[S] || S.localeCompare(M)
      ).slice(0, s.maxSeries).map((S) => ({
        label: m(S),
        data: w.map((M) => k[M]?.[S] || 0),
        borderColor: c(S)
      }));
      return {
        labels: w.map((S) => He(S).format("MMM DD")),
        datasets: $
      };
    }), b = C(() => {
      const k = Object.values(p.value).reduce((_, $) => _ + $, 0), w = s.totalConversations ?? k;
      return w === 0 ? [] : Object.entries(p.value).sort(([, _], [, $]) => $ - _).map(([_, $]) => ({
        name: _,
        label: m(_),
        total: $,
        percentage: ($ / w * 100).toFixed(1),
        color: c(_)
      }));
    }), y = C(() => b.value.slice(0, 4)), v = C(() => {
      const k = y.value.length;
      if (!(k <= 0))
        return { gridTemplateColumns: `repeat(${k}, minmax(0, 1fr))` };
    });
    return t({ isDark: f }), (k, w) => (g(), ae(Se, {
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
        ])) : E("", !0)
      ]),
      headerExport: O(() => [
        e.enableExport && !s.loading ? (g(), ae(T(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: r
        }, null, 8, ["loading"])) : E("", !0)
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
              s.showSummaryCards && y.value.length ? (g(), x("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: we(v.value)
              }, [
                (g(!0), x(de, null, pe(y.value, (_) => (g(), ae(xe, {
                  key: _.name,
                  class: "min-w-0",
                  color: _.color,
                  title: _.label,
                  value: `${_.percentage}%`,
                  subvalue: `${T(fe)(_.total)} ${s.unit}`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : E("", !0)
            ])) : s.showSummaryCards && b.value.length ? (g(), x("section", jb, [
              d("div", {
                class: "grid w-full gap-3 md:gap-4",
                style: we(v.value)
              }, [
                (g(!0), x(de, null, pe(y.value, (_) => (g(), ae(xe, {
                  key: _.name,
                  class: "min-w-0",
                  color: _.color,
                  title: _.label,
                  value: `${_.percentage}%`,
                  subvalue: `${T(fe)(_.total)} ${s.unit}`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)
            ])) : E("", !0),
            b.value.length ? E("", !0) : (g(), x("section", Hb, [
              d("div", Wb, [
                d("div", Kb, [
                  N(T(rt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
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
}), $r = /* @__PURE__ */ ve(qb, [["__scopeId", "data-v-c97ff9a5"]]), Xb = { class: "card-body" }, Gb = {
  key: 0,
  class: "chart-section"
}, Zb = { class: "chart-wrapper" }, Qb = {
  key: 1,
  class: "record-locator-daily-section"
}, Jb = { class: "w-full min-w-0" }, ev = { class: "cell-plain font-medium" }, tv = { class: "cell-plain text-center" }, av = { class: "cell-plain text-center" }, nv = { class: "cell-plain text-center" }, ov = { class: "cell-plain text-center" }, sv = { class: "cell-plain text-center success-value" }, iv = { class: "cell-plain text-center failed-value" }, rv = { class: "cell-plain text-center warning-value" }, lv = { class: "cell-plain text-center" }, cv = { class: "cell-plain text-center failed-value" }, dv = {
  key: 2,
  class: "empty-state"
}, uv = /* @__PURE__ */ ue({
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
    ], u = C(
      () => n.isAvianca ? [...l, ...c] : l
    ), f = C(
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
    ), m = C(() => n.data), p = (y, v) => It(y, v), h = (y, v) => {
      const k = fe(y), w = p(y, v);
      return `${k} (${w})`;
    }, b = C(() => {
      const y = [], v = [], k = /* @__PURE__ */ new Set(), w = (q) => {
        k.has(q) || (y.push({ name: q }), k.add(q));
      };
      if (!m.value.total_checkin_initiated)
        return { nodes: y, links: v };
      w("Checkin Init"), w("Booking retrive"), w("Checkin Started"), w("Checkin Completed"), w("Checkin Closed");
      const _ = m.value.total_checkin_initiated, $ = m.value.total_record_locator_init, S = m.value.total_record_locator_started, M = m.value.total_record_locator_completed, I = m.value.total_record_locator_closed, z = m.value.total_record_locator_failed, K = m.value.total_record_locator_abandoned, D = m.value.total_record_locator_init_abandoned, P = m.value.total_checkin_pre_init_abandoned_error, B = m.value.total_checkin_pre_init_abandoned_voluntary, H = P != null || B != null, j = H ? Math.max(Number(P) || 0, 0) : 0, X = H ? Math.max(Number(B) || 0, 0) : 0, re = m.value.total_record_locator_init_abandoned_error, he = m.value.total_record_locator_init_abandoned_voluntary, Z = re != null || he != null, oe = Z ? Math.max(Number(re) || 0, 0) : 0, L = Z ? Math.max(Number(he) || 0, 0) : 0;
      $ > 0 && v.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: $,
        label: ye($, _)
      });
      const Y = _ - $;
      return H ? (X > 0 && (w("Abandoned (Init)"), v.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: X,
        label: ye(X, _)
      })), j > 0 && (w("Booking not retreived"), v.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: j,
        label: ye(j, _)
      }))) : Y > 0 && (w("Abandoned (Init)"), v.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: Y,
        label: ye(Y, _)
      })), S > 0 && v.push({
        source: "Booking retrive",
        target: "Checkin Started",
        value: S,
        label: ye(S, _)
      }), Z ? (oe > 0 && (w("Error"), v.push({
        source: "Booking retrive",
        target: "Error",
        value: oe,
        label: ye(oe, _)
      })), L > 0 && (w("Abandoned (Started)"), v.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: L,
        label: ye(L, _)
      }))) : D > 0 && (w("Abandoned (Started)"), v.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: D,
        label: ye(D, _)
      })), M > 0 && v.push({
        source: "Checkin Started",
        target: "Checkin Completed",
        value: M,
        label: ye(M, _)
      }), I > 0 && v.push({
        source: "Checkin Completed",
        target: "Checkin Closed",
        value: I,
        label: ye(I, _)
      }), z > 0 && (w("Checkin Failed"), v.push({
        source: "Checkin Started",
        target: "Checkin Failed",
        value: z,
        label: ye(z, _)
      })), K > 0 && (w("Abandoned (Flow)"), v.push({
        source: "Checkin Started",
        target: "Abandoned (Flow)",
        value: K,
        label: ye(K, _)
      })), { nodes: y, links: v };
    });
    return t({ isDark: i }), (y, v) => (g(), ae(Se, {
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
        }, null, 8, ["loading"])) : E("", !0)
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
          ])) : E("", !0),
          r.value && r.value.length > 0 ? (g(), x("section", Qb, [
            d("div", Jb, [
              N(gt, {
                columns: u.value,
                rows: f.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": O(({ row: k }) => [
                  d("span", ev, A(T(He)(String(k.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": O(({ row: k }) => [
                  d("span", tv, A(T(fe)(k.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieve": O(({ row: k }) => [
                  d("span", av, A(h(
                    k.record_locator_init_count,
                    k.checkin_initiated
                  )), 1)
                ]),
                "cell-checkinStarted": O(({ row: k }) => [
                  d("span", nv, A(T(fe)(k.record_locator_started_count)), 1)
                ]),
                "cell-checkinCompleted": O(({ row: k }) => [
                  d("span", ov, A(h(
                    k.record_locator_completed_count,
                    k.record_locator_started_count
                  )), 1)
                ]),
                "cell-checkinClosed": O(({ row: k }) => [
                  d("span", sv, A(h(
                    k.record_locator_closed_count,
                    k.record_locator_started_count
                  )), 1)
                ]),
                "cell-checkinFailed": O(({ row: k }) => [
                  d("span", iv, A(h(
                    k.record_locator_failed_count,
                    k.record_locator_started_count
                  )), 1)
                ]),
                "cell-abandoned": O(({ row: k }) => [
                  d("span", rv, A(h(
                    k.record_locator_abandoned_count,
                    k.record_locator_started_count
                  )), 1)
                ]),
                "cell-createPayment": O(({ row: k }) => [
                  d("span", lv, A(T(fe)(
                    k.record_locator_create_payment_count ?? 0
                  )), 1)
                ]),
                "cell-failedPayment": O(({ row: k }) => [
                  d("span", cv, A(T(fe)(
                    k.record_locator_create_payment_failed_count ?? 0
                  )), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (g(), x("section", dv, [...v[0] || (v[0] = [
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
}), hv = /* @__PURE__ */ ve(uv, [["__scopeId", "data-v-f904c66a"]]), fv = { class: "card-body" }, gv = {
  key: 0,
  class: "chart-section"
}, mv = {
  key: 1,
  class: "empty-state"
}, pv = {
  key: 2,
  class: "comparison-section"
}, bv = { class: "comparison-grid" }, vv = /* @__PURE__ */ ue({
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
    C(() => s.data?.total_sell_success ?? 0);
    const c = C(() => {
      const h = /* @__PURE__ */ new Set();
      for (const b of s.data?.sales_by_channel_by_day ?? [])
        for (const y of Object.keys(b.channels))
          h.add(y);
      return Array.from(h).sort();
    }), u = (h, b) => n[h.toLowerCase()] ?? o[b % o.length];
    function f(h) {
      return h.replace(/_/g, " ").toUpperCase();
    }
    function m(h) {
      if (h.delta === null) return "No previous data";
      const b = fe(h.previous), y = `${Math.abs(h.delta).toFixed(1)}%`;
      return h.delta === 0 ? `0.0% vs prev. period (${b})` : `${h.delta > 0 ? "↑" : "↓"} ${y} vs prev. period (${b})`;
    }
    const p = C(() => {
      const h = s.data?.sales_by_channel_by_day ?? [];
      if (h.length === 0) return { labels: [], datasets: [] };
      const b = h.map((v) => He(v.date).format("MMM-DD")), y = c.value.map((v, k) => ({
        label: v,
        data: h.map((w) => w.channels[v] ?? 0),
        backgroundColor: u(v, k),
        borderRadius: 4
      }));
      return { labels: b, datasets: y };
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
        }, null, 8, ["loading"])) : E("", !0)
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
              (g(!0), x(de, null, pe(e.channelComparison, (y, v) => (g(), ae(T(xe), {
                key: y.channel,
                color: u(y.channel, v),
                title: f(y.channel),
                value: T(fe)(y.current),
                subvalue: m(y)
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : E("", !0)
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), Sr = /* @__PURE__ */ ve(vv, [["__scopeId", "data-v-4879d791"]]), yv = { class: "card-body" }, xv = {
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
}, Yv = /* @__PURE__ */ ue({
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
    }, { isDark: r } = Me($e(o, "theme")), l = C(() => {
      if (!o.sellerData?.seller_by_day) return [];
      const D = [...o.sellerData.seller_by_day];
      return o.failedData?.failed_by_reason_by_day && o.failedData.failed_by_reason_by_day.forEach((P) => {
        const B = D.findIndex(
          (H) => H.date === P.date
        );
        B !== -1 ? D[B] = { ...D[B], reasons: P.reasons } : D.push({
          date: P.date,
          seller_conversations: 0,
          sell_started_count: 0,
          sell_get_quote_count: 0,
          sell_booking_created_count: 0,
          sell_success_count: 0,
          daily_value_sell_success: 0,
          reasons: P.reasons
        });
      }), D.sort(
        (P, B) => new Date(P.date).getTime() - new Date(B.date).getTime()
      );
    }), c = C(() => {
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
    }), u = C(
      () => l.value.map((D) => ({
        id: D.date,
        ...D
      }))
    ), f = C(() => o.sellerData), m = C(() => o.failedData), p = C(
      () => Array.isArray(o.sellerData.total_value_sell_success) ? o.sellerData.total_value_sell_success : []
    ), h = C(
      () => Array.isArray(o.sellerData.total_value_sell_success_bank_transfer) ? o.sellerData.total_value_sell_success_bank_transfer : []
    ), b = C(
      () => Array.isArray(o.sellerData.total_value_sell_success_cash) ? o.sellerData.total_value_sell_success_cash : []
    ), y = C(() => {
      const D = p.value;
      return D.length > 0 ? D.map(
        (P) => `${P.currency} ${Ut(P.total_value)}`
      ).join(" · ") : K(o.sellerData.total_value_sell_success);
    });
    function v(D) {
      return D.length > 0 ? D.map(
        (P) => `${P.currency} ${Ut(P.total_value)}`
      ).join(" · ") : "—";
    }
    const k = C(
      () => v(h.value)
    ), w = C(
      () => v(b.value)
    ), _ = (D) => D.replace(/_/g, " ").replace(/\b\w/g, (P) => P.toUpperCase()), $ = (D) => `Failed:
${_(D)}`, S = C(() => {
      const {
        total_seller_conversations: D = 0,
        total_sell_started: P = 0,
        total_sell_booking_created: B = 0,
        total_sell_success: H = 0,
        total_sell_success_bank_transfer: j = 0,
        total_sell_success_cash: X = 0
      } = f.value, { failed_by_reason_by_day: re = [] } = m.value;
      if (D === 0) return { nodes: [], links: [] };
      const he = H, Z = [
        { name: "Sell Initiated", value: D, status: "success" },
        { name: "Sell Started", value: P, status: "success" },
        { name: "Booking Created", value: B, status: "success" },
        { name: "Sell Success", value: he, status: "success" }
      ], oe = [], L = D - P;
      L > 0 && (Z.push({
        name: "Abandoned (Init)",
        value: L,
        status: "abandon"
      }), oe.push({
        source: "Sell Initiated",
        target: "Abandoned (Init)",
        value: L,
        label: ye(L, D)
      })), P > 0 && oe.push({
        source: "Sell Initiated",
        target: "Sell Started",
        value: P,
        label: ye(P, D)
      });
      const Y = re.reduce(
        (se, le) => (le.reasons && Array.isArray(le.reasons) && le.reasons.forEach((J) => {
          const R = J.reason, W = J.failed_count;
          se[R] = (se[R] || 0) + W;
        }), se),
        {}
      );
      B > 0 && oe.push({
        source: "Sell Started",
        target: "Booking Created",
        value: B,
        label: ye(B, D)
      }), (j ?? 0) > 0 && (Z.push({
        name: "Bank Transfer",
        value: j ?? 0,
        status: "success"
      }), oe.push({
        source: "Booking Created",
        target: "Bank Transfer",
        value: j ?? 0,
        label: ye(j ?? 0, D)
      })), (X ?? 0) > 0 && (Z.push({
        name: "Cash Option",
        value: X ?? 0,
        status: "success"
      }), oe.push({
        source: "Booking Created",
        target: "Cash Option",
        value: X ?? 0,
        label: ye(X ?? 0, D)
      })), he > 0 && oe.push({
        source: "Booking Created",
        target: "Sell Success",
        value: he,
        label: ye(he, D)
      });
      const q = B - he - (j ?? 0) - (X ?? 0);
      q > 0 && (Z.push({
        name: "Failed at Completion",
        value: q,
        status: "error"
      }), oe.push({
        source: "Booking Created",
        target: "Failed at Completion",
        value: q,
        label: ye(q, D)
      }));
      const F = P - B;
      if (F > 0 && (Z.push({
        name: "Failed at Booking",
        value: F,
        status: "error"
      }), oe.push({
        source: "Sell Started",
        target: "Failed at Booking",
        value: F,
        label: ye(F, D)
      })), Object.keys(Y).length > 0) {
        const se = Object.values(Y).reduce(
          (J, R) => J + R,
          0
        ), le = F - se;
        Object.entries(Y).filter(([, J]) => J > 0).sort(([, J], [, R]) => R - J).forEach(([J, R]) => {
          const W = `Failed: ${J}`;
          Z.push({
            name: W,
            value: R,
            status: "error",
            label: $(J)
          }), oe.push({
            source: "Failed at Booking",
            target: W,
            value: R,
            label: ye(R, D)
          });
        }), le > 0 && (Z.push({
          name: "Failed: Without Reason",
          value: le,
          status: "error",
          label: `Failed:
Without Reason`
        }), oe.push({
          source: "Failed at Booking",
          target: "Failed: Without Reason",
          value: le,
          label: ye(le, D)
        }));
      }
      return {
        nodes: Z,
        links: oe
      };
    }), M = (D, P) => It(D, P), I = (D, P) => {
      const B = fe(D), H = M(D, P);
      return `${B} (${H})`;
    }, z = (D) => D == null ? 0 : typeof D == "number" ? D : Array.isArray(D) ? D.reduce((P, B) => P + (B.total_value || 0), 0) : 0, K = (D) => Ut(z(D));
    return t({ isDark: r }), (D, P) => (g(), ae(Se, {
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
        }, null, 8, ["loading"])) : E("", !0)
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
          ])) : (g(), x("section", _v, [...P[0] || (P[0] = [
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
              value: y.value
            }, null, 8, ["value"]),
            o.showPaymentMethodDetails ? (g(), x(de, { key: 0 }, [
              N(xe, {
                class: "seller-value-card",
                color: "var(--kiut-success)",
                title: "Bank Transfer Value",
                value: k.value
              }, null, 8, ["value"]),
              N(xe, {
                class: "seller-value-card",
                color: "var(--kiut-success)",
                title: "Cash Option Value",
                value: w.value
              }, null, 8, ["value"])
            ], 64)) : E("", !0)
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
                  d("span", Mv, A(T(fe)(Number(B.seller_conversations) || 0)), 1)
                ]),
                "cell-sellStarted": O(({ row: B }) => [
                  d("span", Dv, A(I(
                    B.sell_started_count,
                    B.seller_conversations || B.sell_started_count
                  )), 1)
                ]),
                "cell-getQuote": O(({ row: B }) => [
                  d("span", Av, A(I(
                    B.sell_get_quote_count,
                    B.seller_conversations || B.sell_started_count
                  )), 1)
                ]),
                "cell-bookingCreated": O(({ row: B }) => [
                  d("span", Tv, A(I(
                    B.sell_booking_created_count,
                    B.seller_conversations || B.sell_started_count
                  )), 1)
                ]),
                "cell-btValue": O(({ row: B }) => [
                  d("span", Bv, [
                    Array.isArray(
                      B.daily_value_sell_success_bank_transfer
                    ) && B.daily_value_sell_success_bank_transfer.length > 0 ? (g(), x("div", Lv, [
                      (g(!0), x(de, null, pe(B.daily_value_sell_success_bank_transfer, (H) => (g(), x("span", {
                        key: `${B.date}-bt-success-${H.currency}`
                      }, A(H.currency) + " " + A(T(Ut)(H.total_value)), 1))), 128))
                    ])) : (g(), x("span", Rv, "-"))
                  ])
                ]),
                "cell-btSuccess": O(({ row: B }) => [
                  d("span", Pv, A(T(fe)(
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
                      (g(!0), x(de, null, pe(B.daily_value_sell_success_cash, (H) => (g(), x("span", {
                        key: `${B.date}-co-success-${H.currency}`
                      }, A(H.currency) + " " + A(T(Ut)(H.total_value)), 1))), 128))
                    ])) : (g(), x("span", Fv, "-"))
                  ])
                ]),
                "cell-cashSuccess": O(({ row: B }) => [
                  d("span", Ov, A(T(fe)(
                    Number(B.sell_success_cash_count) || 0
                  )), 1)
                ]),
                "cell-sellSuccess": O(({ row: B }) => [
                  d("span", Vv, A(I(
                    B.sell_success_count,
                    B.seller_conversations || B.sell_started_count
                  )), 1)
                ]),
                "cell-totalSalesValue": O(({ row: B }) => [
                  d("span", zv, [
                    Array.isArray(B.daily_value_sell_success) && B.daily_value_sell_success.length > 0 ? (g(), x("div", Nv, [
                      (g(!0), x(de, null, pe(B.daily_value_sell_success, (H) => (g(), x("span", {
                        key: `${B.date}-${H.currency}`
                      }, A(H.currency) + " " + A(T(Ut)(H.total_value)), 1))), 128))
                    ])) : (g(), x("span", jv, A(K(
                      B.daily_value_sell_success
                    )), 1))
                  ])
                ]),
                "cell-failed": O(({ row: B }) => [
                  (B.reasons || []).length > 0 ? (g(), x("div", Hv, [
                    (g(!0), x(de, null, pe(B.reasons || [], (H) => (g(), x("div", {
                      key: H.reason,
                      class: "failed-reason-item"
                    }, [
                      d("span", Wv, A(H.reason) + ":", 1),
                      d("span", Kv, A(H.failed_count), 1)
                    ]))), 128))
                  ])) : (g(), x("div", Uv, "-"))
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : E("", !0)
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), Mr = /* @__PURE__ */ ve(Yv, [["__scopeId", "data-v-19fee7a8"]]), qv = { class: "seller-container__body" }, Xv = /* @__PURE__ */ ue({
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
    const a = e, n = t, o = C(
      () => a.loading ? !1 : a.sellerLoading
    ), s = C(
      () => a.loading ? !1 : a.salesByChannelLoading
    ), i = C(() => a.exportLoading || a.sellerExportLoading), r = C(() => a.exportLoading || a.salesByChannelExportLoading);
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
}), Gv = /* @__PURE__ */ ve(Xv, [["__scopeId", "data-v-34a76e0c"]]), Zv = { class: "card-body" }, Qv = {
  key: 0,
  class: "chart-section"
}, Jv = {
  key: 1,
  class: "empty-state"
}, ey = { class: "empty-state-content" }, ty = { class: "empty-icon-wrapper" }, ay = /* @__PURE__ */ ue({
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
    }, { isDark: r, colors: l } = Me($e(o, "theme")), c = C(() => {
      const m = (o.data?.top_agents || []).filter(
        (y) => y.agent_type?.toLowerCase() !== "triage"
      );
      if (m.length === 0)
        return { labels: [], datasets: [] };
      const p = m.reduce(
        (y, v) => y + (Number(v.conversations) || 0),
        0
      ), h = m.map((y) => {
        const v = y.agent_type?.toLowerCase();
        return n[v] || "#94a3b8";
      }), b = h.map((y) => `${y}80`);
      return {
        labels: m.map((y) => {
          const v = Number(y.conversations) || 0, k = p ? v / p * 100 : 0;
          return `${St(y.agent_type)} - ${v.toLocaleString()} (${k.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: m.map((y) => y.conversations),
            backgroundColor: b,
            borderColor: h,
            borderWidth: 2
          }
        ]
      };
    }), u = C(() => o.options ? o.options : {
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
                (y, v) => y + (Number(v) || 0),
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
        }, null, 8, ["loading"])) : E("", !0)
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
}), ny = /* @__PURE__ */ ve(ay, [["__scopeId", "data-v-34a998ae"]]), oy = { class: "card-body" }, sy = {
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
}, _y = "Not Registered", wy = /* @__PURE__ */ ue({
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
    }), l = C(() => r.value.payment_method_breakdown && r.value.payment_method_breakdown.length > 0), c = C(() => r.value.payment_method_by_day && r.value.payment_method_by_day.length > 0), u = C(() => !r.value.payment_method_by_day || r.value.payment_method_by_day.length === 0 ? [] : [...r.value.payment_method_by_day].sort((M, I) => He(M.date).valueOf() - He(I.date).valueOf())), f = [
      { key: "date", label: "Date", align: "left" },
      { key: "totalSales", label: "Total Sales", align: "center" },
      { key: "totalAmount", label: "Total Amount", align: "center" },
      { key: "paymentMethods", label: "Payment Methods", align: "left" }
    ], m = C(
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
      const I = (M.payment_method_breakdown || []).map(
        (K) => ({
          payment_method: K.payment_method || "Unknown",
          total_amount: K.total_amount ?? 0,
          count: K.count ?? 0,
          total_amount_by_currency: K.total_amount_by_currency ?? []
        })
      ), z = (M.payment_method_by_day || []).map((K) => ({
        date: K.date || "",
        total_count: K.total_count ?? 0,
        total_amount: K.total_amount ?? 0,
        total_amount_by_currency: K.total_amount_by_currency ?? [],
        payment_methods: (K.payment_methods || []).map((D) => ({
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
        payment_method_breakdown: I,
        payment_method_by_day: z
      };
    }, h = async () => {
      if (!(!n.fetchFunction || !n.dates || n.dates.length < 2 || !n.airlineName)) {
        i.value = !0;
        try {
          const [M, I] = n.dates.map(
            (K) => He(K).format("YYYY-MM-DD")
          ), z = await n.fetchFunction(
            n.airlineName,
            M,
            I
          );
          r.value = p(z);
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
    ], y = (M) => !M || M.toLowerCase() === "unknown" ? _y : M.replace(/_/g, " "), v = (M) => M == null ? "$0.00" : Ie(M), k = (M) => {
      const I = M.total_amount_by_currency;
      return I && I.length > 0 ? I.map((z) => `${z.currency} ${v(z.total_value)}`).join(" · ") : v(M.total_amount);
    }, w = (M) => M ? He(M).format("MMM DD") : "-", _ = (M) => M == null || Number.isNaN(Number(M)) ? 0 : Number(M), $ = (M) => {
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
    ), t({ isDark: s }), (M, I) => (g(), ae(Se, {
      class: "payment-method-root h-full min-h-0",
      title: "Payment Method Metrics",
      subtitle: "Sales breakdown by payment method",
      loading: i.value,
      "lazy-mount": "",
      onOpen: I[0] || (I[0] = (z) => o("open"))
    }, {
      headerExport: O(() => [
        e.enableExport && !i.value ? (g(), ae(T(ze), {
          key: 0,
          variant: "inline",
          onExport: $,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: O(() => [
        d("div", oy, [
          l.value ? (g(), x("section", sy, [
            I[1] || (I[1] = d("p", { class: "section-label" }, "Sales by Payment Method", -1)),
            d("div", iy, [
              (g(!0), x(de, null, pe(r.value.payment_method_breakdown, (z, K) => (g(), ae(xe, {
                key: z.payment_method,
                class: "payment-method-card-item min-w-0",
                color: b[K % b.length],
                title: y(z.payment_method),
                value: k(z),
                subvalue: `${_(z.count)} ${_(z.count) === 1 ? "sale" : "sales"}`
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : (g(), x("section", ry, [
            d("div", ly, [
              d("div", cy, [
                N(T(ap), { class: "empty-icon" })
              ]),
              I[2] || (I[2] = d("p", { class: "empty-title" }, "No payment data available", -1)),
              I[3] || (I[3] = d("p", { class: "empty-description" }, " No payment method data found for the selected period. Try adjusting the date range. ", -1))
            ])
          ])),
          c.value ? (g(), x("section", dy, [
            I[5] || (I[5] = d("p", { class: "section-label" }, "Daily Breakdown", -1)),
            d("div", uy, [
              N(gt, {
                columns: f,
                rows: m.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": O(({ row: z }) => [
                  d("span", hy, A(w(String(z.date))), 1)
                ]),
                "cell-totalSales": O(({ row: z }) => [
                  d("span", fy, A(T(fe)(z.total_count ?? 0)), 1)
                ]),
                "cell-totalAmount": O(({ row: z }) => [
                  d("span", gy, [
                    Array.isArray(z.total_amount_by_currency) && z.total_amount_by_currency.length > 0 ? (g(), x("div", my, [
                      (g(!0), x(de, null, pe(z.total_amount_by_currency, (K) => (g(), x("span", {
                        key: `${z.date}-${K.currency}`
                      }, A(K.currency) + " " + A(v(K.total_value)), 1))), 128))
                    ])) : (g(), x(de, { key: 1 }, [
                      Ae(A(v(Number(z.total_amount ?? 0))), 1)
                    ], 64))
                  ])
                ]),
                "cell-paymentMethods": O(({ row: z }) => [
                  d("div", py, [
                    (g(!0), x(de, null, pe(Array.isArray(z.payment_methods) ? z.payment_methods : [], (K) => (g(), x("div", {
                      key: K.payment_method,
                      class: "payment-tag"
                    }, [
                      d("span", by, A(y(K.payment_method)), 1),
                      I[4] || (I[4] = d("span", { class: "tag-separator" }, "•", -1)),
                      !K.total_amount_by_currency || K.total_amount_by_currency.length === 0 ? (g(), x("span", vy, A(v(K.total_amount)), 1)) : (g(), x("span", yy, A(K.total_amount_by_currency.map(
                        (D) => `${D.currency} ${v(D.total_value)}`
                      ).join(" / ")), 1)),
                      d("span", xy, "(" + A(_(K.count)) + ")", 1)
                    ]))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : l.value ? (g(), x("div", ky, [...I[6] || (I[6] = [
            d("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
          ])])) : E("", !0)
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Cy = /* @__PURE__ */ ve(wy, [["__scopeId", "data-v-168637eb"]]), $y = {
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
}, Vy = /* @__PURE__ */ ue({
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
      const u = c.toFixed(1);
      return c > 0 ? `+${u}%` : `${u}%`;
    }), l = C(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: n, changePercent: i }), (c, u) => (g(), ae(Se, {
      collapsible: !1,
      class: G([
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
              o.value ? (g(), x("div", Sy)) : E("", !0)
            ])) : (g(), x("div", My, [
              d("div", Dy, [
                ke(c.$slots, "icon", {}, void 0, !0)
              ]),
              o.value ? (g(), x("span", Ay, A(e.label), 1)) : E("", !0)
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
                  class: G(["change-badge", l.value])
                }, A(r.value), 3)) : E("", !0)
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
              o.value ? E("", !0) : (g(), x("div", Ry))
            ])) : (g(), x("div", Py, [
              d("div", Iy, [
                ke(c.$slots, "value", {}, () => [
                  d("div", Ey, [
                    e.prefix ? (g(), x("span", Fy, A(e.prefix), 1)) : E("", !0),
                    d("span", {
                      class: G(["metric-value", e.valueSize === "large" ? "metric-value--large" : ""])
                    }, A(e.value), 3)
                  ])
                ], !0),
                o.value ? E("", !0) : (g(), x("span", Oy, A(e.label), 1))
              ])
            ]))
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["class"]));
  }
}), ft = /* @__PURE__ */ ve(Vy, [["__scopeId", "data-v-c81268f4"]]), zy = { class: "card-body" }, Ny = { class: "kpi-closed-value" }, jy = { class: "kpi-closed-value__main" }, Hy = {
  key: 0,
  class: "kpi-closed-value__pct"
}, Wy = { class: "table-view-select flex justify-end" }, Ky = { class: "table-section w-full min-w-0" }, Uy = { class: "cell-plain" }, Yy = { class: "cell-plain" }, qy = { class: "cell-plain cell-plain--muted" }, Xy = { class: "cell-plain" }, Gy = { class: "cell-plain" }, Zy = { class: "cell-plain" }, Qy = {
  key: 2,
  class: "empty-state"
}, Jy = 6, e1 = /* @__PURE__ */ ue({
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
    const n = e, o = a, s = (J) => {
      o("export", J);
    }, { isDark: i } = Me($e(n, "theme")), r = /* @__PURE__ */ new Set(["—", "-", "–", ""]);
    function l(J) {
      const R = J?.trim() ?? "";
      return R.length > 0 && !r.has(R);
    }
    function c(J) {
      if (!l(J.agent_email)) return !1;
      const R = J.assigned_count ?? 0, W = J.closed_count ?? 0;
      return R > 0 || W > 0;
    }
    function u(J) {
      return J.closed_count ?? 0;
    }
    function f(J) {
      const R = J?.trim();
      return R || "—";
    }
    const m = C(
      () => (n.data?.agents_by_day ?? []).filter(c)
    ), p = C(() => m.value.length > 0), h = C(() => {
      const J = (n.data?.total_enqueued ?? 0) > 0;
      return p.value || J;
    }), b = ne("by_date"), y = [
      { value: "by_date", label: "By date" },
      { value: "aggregated", label: "Aggregated" }
    ], v = ne("date"), k = ne("desc");
    Te(b, (J) => {
      J === "aggregated" ? (v.value = "name", k.value = "asc") : (v.value = "date", k.value = "desc");
    });
    function w(J, R) {
      return R == null ? null : R === 0 ? J > 0 ? 100 : 0 : (J - R) / R * 100;
    }
    function _(J) {
      const R = J.toFixed(1);
      return J > 0 ? `+${R}%` : `${R}%`;
    }
    function $(J, R = !1) {
      const W = R ? -J : J;
      return W > 0 ? "change-badge--up" : W < 0 ? "change-badge--down" : "change-badge--neutral";
    }
    function S(J, R) {
      if (J === null) return null;
      const W = w(J, R);
      return W === null ? null : {
        label: _(W),
        class: $(W, !0)
      };
    }
    function M(J) {
      if (J == null || J === "") return null;
      if (typeof J == "number")
        return Number.isFinite(J) ? J : null;
      const R = J.trim();
      if (!R) return null;
      if (R.includes(":")) {
        const ie = R.split(":").map(Number);
        return ie.length !== 3 || ie.some(isNaN) ? null : ie[0] * 3600 + ie[1] * 60 + ie[2];
      }
      const W = Number(R);
      return Number.isFinite(W) ? W : null;
    }
    function I(J) {
      const R = Math.round(J), W = Math.floor(R / 3600), ie = Math.floor(R % 3600 / 60), Q = R % 60;
      return `${String(W).padStart(2, "0")}:${String(ie).padStart(2, "0")}:${String(Q).padStart(2, "0")}`;
    }
    function z(J) {
      const R = M(J);
      return R === null ? "—" : typeof J == "string" && J.includes(":") ? J.trim() : I(R);
    }
    const K = C(() => n.data?.total_enqueued ?? 0), D = C(() => n.data?.total_closed ?? 0), P = C(
      () => n.data?.avg_time_to_assign_seconds ?? null
    ), B = C(
      () => n.data?.avg_conversation_duration_seconds ?? null
    ), H = C(() => K.value <= 0 ? null : `(${(D.value / K.value * 100).toFixed(1)}%)`), j = C(
      () => S(
        M(P.value),
        n.previousAvgTimeToAssignSeconds
      )
    ), X = C(
      () => S(
        M(B.value),
        n.previousAvgConversationDurationSeconds
      )
    );
    function re(J, R) {
      return {
        id: `${J.date}-${J.agent_email}-${R}`,
        date: J.date,
        dateSort: new Date(J.date).getTime(),
        agent_name: J.agent_name ?? "",
        agent_email: J.agent_email,
        handled: u(J),
        avg_assignation_seconds: M(J.avg_time_to_assign_seconds),
        avg_resolution_seconds: M(J.avg_conversation_duration_seconds),
        avg_assignation_display: z(J.avg_time_to_assign_seconds),
        avg_resolution_display: z(J.avg_conversation_duration_seconds)
      };
    }
    function he(J) {
      const R = /* @__PURE__ */ new Map();
      for (const W of J) {
        if (!c(W)) continue;
        const ie = W.agent_email.trim();
        R.has(ie) || R.set(ie, {
          agent_name: W.agent_name?.trim() ?? "",
          agent_email: ie,
          handled: 0,
          assignSum: 0,
          assignWeight: 0,
          resolutionSum: 0,
          resolutionWeight: 0
        });
        const Q = R.get(ie), U = W.assigned_count ?? 0, ee = W.closed_count ?? 0;
        Q.handled += u(W), W.agent_name?.trim() && (Q.agent_name = W.agent_name.trim());
        const ge = M(W.avg_time_to_assign_seconds);
        ge !== null && U > 0 && (Q.assignSum += ge * U, Q.assignWeight += U);
        const be = M(W.avg_conversation_duration_seconds);
        be !== null && ee > 0 && (Q.resolutionSum += be * ee, Q.resolutionWeight += ee);
      }
      return Array.from(R.values()).map((W, ie) => {
        const Q = W.assignWeight > 0 ? W.assignSum / W.assignWeight : null, U = W.resolutionWeight > 0 ? W.resolutionSum / W.resolutionWeight : null;
        return {
          id: `agg-${W.agent_email}-${ie}`,
          agent_name: W.agent_name,
          agent_email: W.agent_email,
          handled: W.handled,
          avg_assignation_seconds: Q,
          avg_resolution_seconds: U,
          avg_assignation_display: Q !== null ? I(Q) : "—",
          avg_resolution_display: U !== null ? I(U) : "—"
        };
      });
    }
    const Z = C(() => {
      const J = m.value;
      return b.value === "aggregated" ? he(J) : J.map(re);
    });
    function oe(J, R, W, ie) {
      const Q = ie === "asc" ? 1 : -1;
      let U = 0;
      switch (W) {
        case "date":
          U = (J.dateSort ?? 0) - (R.dateSort ?? 0);
          break;
        case "name":
          U = (J.agent_name || "").localeCompare(R.agent_name || "", void 0, {
            sensitivity: "base"
          });
          break;
        case "email":
          U = J.agent_email.localeCompare(R.agent_email, void 0, {
            sensitivity: "base"
          });
          break;
        case "handled":
          U = J.handled - R.handled;
          break;
        case "avgAssignation":
          U = (J.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY) - (R.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY);
          break;
        case "avgResolution":
          U = (J.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY) - (R.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY);
          break;
      }
      if (U !== 0) return U * Q;
      if (b.value === "by_date" && W !== "date") {
        const ee = (R.dateSort ?? 0) - (J.dateSort ?? 0);
        if (ee !== 0) return ee;
      }
      return (J.agent_name || "").localeCompare(R.agent_name || "", void 0, {
        sensitivity: "base"
      });
    }
    const L = C(() => {
      const J = [...Z.value];
      return J.sort((R, W) => oe(R, W, v.value, k.value)), J;
    }), Y = C(
      () => L.value
    ), q = C(() => {
      const J = [];
      return b.value === "by_date" && J.push({
        key: "date",
        label: "Date",
        align: "left",
        sortable: !0
      }), J.push(
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
      ), J;
    });
    function F(J) {
      const R = J;
      if (v.value === R) {
        k.value = k.value === "asc" ? "desc" : "asc";
        return;
      }
      v.value = R, R === "date" ? k.value = "desc" : R === "name" || R === "email" ? k.value = "asc" : k.value = "desc";
    }
    const se = (J) => J == null ? "0" : fe(J), le = (J) => new Date(J).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
    return t({ isDark: i }), (J, R) => (g(), ae(Se, {
      class: "agent-human-conv-root h-full min-h-0",
      title: "Agent Human Conversations",
      subtitle: "Human conversation assignments and closures by agent",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: R[1] || (R[1] = (W) => o("open"))
    }, {
      headerExport: O(() => [
        e.enableExport && !e.loading ? (g(), ae(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: O(() => [
        d("div", zy, [
          h.value ? (g(), x("div", {
            key: 0,
            class: G(["grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-4", { "agent-human-conv--dark": T(i) }])
          }, [
            N(ft, {
              label: "Conversations Opened",
              "label-position": "header",
              value: se(K.value),
              theme: e.theme,
              "current-value": K.value,
              "previous-value": e.previousTotalEnqueued
            }, {
              icon: O(() => [...R[2] || (R[2] = [
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
            N(ft, {
              label: "Conversations Closed",
              "label-position": "header",
              value: se(D.value),
              theme: e.theme,
              "current-value": D.value,
              "previous-value": e.previousTotalClosed
            }, {
              icon: O(() => [...R[3] || (R[3] = [
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
                  d("span", jy, A(se(D.value)), 1),
                  H.value ? (g(), x("span", Hy, A(H.value), 1)) : E("", !0)
                ])
              ]),
              _: 1
            }, 8, ["value", "theme", "current-value", "previous-value"]),
            N(ft, {
              label: "Avg Time to Assign",
              "label-position": "header",
              value: z(P.value),
              theme: e.theme,
              "current-value": M(P.value) ?? 0,
              "previous-value": e.previousAvgTimeToAssignSeconds
            }, Vo({
              icon: O(() => [
                R[4] || (R[4] = d("svg", {
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
              j.value ? {
                name: "headerAside",
                fn: O(() => [
                  d("div", {
                    class: G(["duration-trend-badge", j.value.class])
                  }, A(j.value.label), 3)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["value", "theme", "current-value", "previous-value"]),
            N(ft, {
              label: "Avg Resolution Time",
              "label-position": "header",
              value: z(B.value),
              theme: e.theme,
              "current-value": M(B.value) ?? 0,
              "previous-value": e.previousAvgConversationDurationSeconds
            }, Vo({
              icon: O(() => [
                R[5] || (R[5] = d("svg", {
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
              X.value ? {
                name: "headerAside",
                fn: O(() => [
                  d("div", {
                    class: G(["duration-trend-badge", X.value.class])
                  }, A(X.value.label), 3)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["value", "theme", "current-value", "previous-value"])
          ], 2)) : E("", !0),
          p.value ? (g(), ae(Se, {
            key: 1,
            class: "agent-table-section mt-6",
            title: "Conversations Managed by Agent",
            subtitle: "Daily performance per human agent",
            collapsible: !1
          }, {
            headerAside: O(() => [
              d("div", Wy, [
                N(na, {
                  modelValue: b.value,
                  "onUpdate:modelValue": R[0] || (R[0] = (W) => b.value = W),
                  options: y,
                  "aria-label-trigger": "Table view mode",
                  "show-option-check": !1
                }, null, 8, ["modelValue"])
              ])
            ]),
            default: O(() => [
              d("div", Ky, [
                (g(), ae(gt, {
                  key: `${b.value}-${v.value}-${k.value}`,
                  columns: q.value,
                  rows: Y.value,
                  "sort-key": v.value,
                  "sort-direction": k.value,
                  "max-visible-rows": Jy,
                  "row-key": "id",
                  onSort: F
                }, {
                  "cell-date": O(({ row: W }) => [
                    d("span", Uy, A(le(String(W.date))), 1)
                  ]),
                  "cell-name": O(({ row: W }) => [
                    d("span", Yy, A(f(W.agent_name)), 1)
                  ]),
                  "cell-email": O(({ row: W }) => [
                    d("span", qy, A(W.agent_email), 1)
                  ]),
                  "cell-handled": O(({ row: W }) => [
                    d("span", Xy, A(se(Number(W.handled))), 1)
                  ]),
                  "cell-avgAssignation": O(({ row: W }) => [
                    d("span", Gy, A(W.avg_assignation_display), 1)
                  ]),
                  "cell-avgResolution": O(({ row: W }) => [
                    d("span", Zy, A(W.avg_resolution_display), 1)
                  ]),
                  _: 1
                }, 8, ["columns", "rows", "sort-key", "sort-direction"]))
              ])
            ]),
            _: 1
          })) : h.value ? E("", !0) : (g(), x("div", Qy, [...R[6] || (R[6] = [
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
}), t1 = /* @__PURE__ */ ve(e1, [["__scopeId", "data-v-837b41e7"]]), a1 = {
  key: 0,
  class: "w-52"
}, n1 = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, o1 = { class: "w-full shrink-0 flex min-h-0 flex-col" }, s1 = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, i1 = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, r1 = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, l1 = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, c1 = { class: "max-w-[360px] px-4 text-center" }, d1 = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, u1 = { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, h1 = { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, hi = 5, f1 = /* @__PURE__ */ ue({
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
    }, u = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899", "#06B6D4"], f = (k) => {
      const w = k.toLowerCase(), _ = c[w];
      if (_) return _;
      const $ = Array.from(w).reduce(
        (S, M) => (S << 5) - S + M.charCodeAt(0) | 0,
        0
      );
      return u[Math.abs($) % u.length];
    }, m = ne({
      labels: [],
      datasets: []
    }), p = C(
      () => n.data ?? {
        channels_by_day: {},
        total_by_channel: {},
        total_conversations: 0
      }
    ), h = C(() => {
      const k = p.value.total_by_channel || {}, w = Object.values(k).reduce(
        ($, S) => $ + S,
        0
      ), _ = n.totalConversations ?? w;
      return _ === 0 ? [] : Object.entries(k).sort(([, $], [, S]) => S - $).map(([$, S]) => ({
        name: $,
        label: $.toUpperCase(),
        total: S,
        percentage: (S / _ * 100).toFixed(1),
        color: f($)
      }));
    }), b = C(
      () => h.value.slice(0, hi)
    ), y = C(() => {
      const k = Math.min(b.value.length, hi);
      if (!(k <= 0))
        return { gridTemplateColumns: `repeat(${k}, minmax(0, 1fr))` };
    }), v = (k) => {
      if (!k || !k.channels_by_day) {
        m.value = { labels: [], datasets: [] };
        return;
      }
      const w = k.channels_by_day, _ = Object.keys(w).sort();
      if (_.length === 0) {
        m.value = { labels: [], datasets: [] };
        return;
      }
      const $ = /* @__PURE__ */ new Set();
      for (const I of Object.values(w))
        for (const z of Object.keys(I))
          $.add(z);
      const M = Array.from($).map((I) => ({
        label: I.toUpperCase(),
        data: _.map((z) => w[z]?.[I] || 0),
        borderColor: f(I)
      }));
      m.value = {
        labels: _.map((I) => He(I).format("MMM DD")),
        datasets: M
      };
    };
    return Te(
      () => n.data,
      (k) => {
        v(k ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: l }), (k, w) => (g(), ae(Se, {
      class: "w-full min-h-0 self-start",
      title: n.title,
      subtitle: n.subtitle,
      collapsible: !1,
      loading: n.loading
    }, {
      headerAside: O(() => [
        n.breakdownOptions.length ? (g(), x("div", a1, [
          N(na, {
            "model-value": n.breakdownBy,
            options: n.breakdownOptions,
            "onUpdate:modelValue": i
          }, null, 8, ["model-value", "options"])
        ])) : E("", !0)
      ]),
      headerExport: O(() => [
        e.enableExport && !n.loading ? (g(), ae(T(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: O(() => [
        d("div", n1, [
          d("div", o1, [
            m.value.labels && m.value.labels.length ? (g(), x("section", s1, [
              d("div", i1, [
                N(bt, {
                  data: m.value,
                  theme: r.value
                }, null, 8, ["data", "theme"])
              ]),
              n.showSummaryCards && b.value.length ? (g(), x("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: we(y.value)
              }, [
                (g(!0), x(de, null, pe(b.value, (_) => (g(), ae(xe, {
                  key: _.name,
                  class: "min-w-0",
                  color: _.color,
                  title: _.label,
                  value: `${_.percentage}%`,
                  subvalue: `${T(fe)(_.total)} ${n.unit}`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : E("", !0)
            ])) : n.showSummaryCards && h.value.length ? (g(), x("section", r1, [
              d("div", {
                class: "grid w-full gap-3 md:gap-4",
                style: we(y.value)
              }, [
                (g(!0), x(de, null, pe(b.value, (_) => (g(), ae(xe, {
                  key: _.name,
                  class: "min-w-0",
                  color: _.color,
                  title: _.label,
                  value: `${_.percentage}%`,
                  subvalue: `${T(fe)(_.total)} ${n.unit}`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)
            ])) : E("", !0),
            h.value.length ? E("", !0) : (g(), x("section", l1, [
              d("div", c1, [
                d("div", d1, [
                  N(T(rt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                d("p", u1, A(n.emptyTitle), 1),
                d("p", h1, A(n.emptyDescription), 1)
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["title", "subtitle", "loading"]));
  }
}), Dr = /* @__PURE__ */ ve(f1, [["__scopeId", "data-v-987b8c34"]]), g1 = /* @__PURE__ */ ue({
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
    const a = e, n = t, o = C(() => a.data?.total_conversations ?? 0), s = C(() => a.data?.breakdown_by_day ?? {}), i = C(() => a.titles[a.breakdownBy]), r = C(() => ({ agents_by_day: s.value })), l = C(() => ({
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
}), m1 = { class: "card-body" }, p1 = { class: "chart-container" }, b1 = { class: "triage-table-block w-full min-w-0" }, v1 = { class: "triage-row-label" }, y1 = {
  key: 1,
  class: "triage-count"
}, x1 = {
  key: 1,
  class: "triage-count"
}, k1 = {
  key: 1,
  class: "triage-count"
}, _1 = {
  key: 1,
  class: "triage-count"
}, w1 = {
  key: 1,
  class: "triage-count"
}, C1 = {
  key: 1,
  class: "empty-state"
}, $1 = { class: "empty-state-content" }, S1 = { class: "empty-icon-wrapper" }, M1 = /* @__PURE__ */ ue({
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
    const n = e, o = a, s = (w) => {
      o("export", w);
    }, { isDark: i, colors: r } = Me(
      $e(n, "theme")
    ), l = C(() => {
      const w = n.data?.combinations || {}, _ = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [$, S] of Object.entries(w)) {
        const M = $.split("+").filter(Boolean);
        if (!M.includes("triage")) continue;
        const I = M.filter((z) => z !== "triage").length;
        I >= 4 ? _["4p"] += Number(S) || 0 : _[I] += Number(S) || 0;
      }
      return _;
    }), c = C(() => {
      const w = l.value;
      return w[0] + w[1] + w[2] + w[3] + w["4p"] || 0;
    }), u = C(() => Object.keys(n.data?.combinations || {}).length > 0), f = C(() => {
      const w = c.value;
      if (!w) return { pct0: 0, pct1: 0, pct2: 0, pct3: 0, pct4p: 0 };
      const _ = l.value;
      return {
        pct0: _[0] / w * 100,
        pct1: _[1] / w * 100,
        pct2: _[2] / w * 100,
        pct3: _[3] / w * 100,
        pct4p: _["4p"] / w * 100
      };
    }), m = [
      { key: "metric", label: "Number of intentions", align: "left" },
      { key: "b0", label: "0", align: "center" },
      { key: "b1", label: "1", align: "center" },
      { key: "b2", label: "2", align: "center" },
      { key: "b3", label: "3", align: "center" },
      { key: "b4p", label: "4 or more", align: "center" }
    ], p = C(() => {
      const w = f.value, _ = l.value;
      return [
        {
          id: "pct",
          metric: "% of total",
          b0: w.pct0,
          b1: w.pct1,
          b2: w.pct2,
          b3: w.pct3,
          b4p: w.pct4p
        },
        {
          id: "count",
          metric: "Count",
          b0: _[0],
          b1: _[1],
          b2: _[2],
          b3: _[3],
          b4p: _["4p"]
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
    }, b = (w) => w?.replace("80", "") || "#888888", y = C(() => ({
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
            label: (w) => `${w.dataset.label} intent(s): ${Number(w.raw || 0).toFixed(0)}%`
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
    })), k = (w) => `${(Number(w) || 0).toFixed(0)}`;
    return t({ isDark: i }), (w, _) => (g(), ae(Se, {
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
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: O(() => [
        d("div", m1, [
          u.value ? (g(), x(de, { key: 0 }, [
            d("div", p1, [
              N(Mt, {
                data: y.value,
                options: v.value
              }, null, 8, ["data", "options"])
            ]),
            N(xe, {
              class: "w-full min-w-0",
              title: "Total",
              value: T(fe)(c.value),
              subvalue: "Conversations with triage"
            }, null, 8, ["value"]),
            d("div", b1, [
              N(gt, {
                columns: m,
                rows: p.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-metric": O(({ row: $ }) => [
                  d("span", v1, A($.metric), 1)
                ]),
                "cell-b0": O(({ row: $ }) => [
                  $.id === "pct" ? (g(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: we({ color: b(h.c0) })
                  }, A(k(Number($.b0))) + "%", 5)) : (g(), x("span", y1, A(T(fe)(Number($.b0))), 1))
                ]),
                "cell-b1": O(({ row: $ }) => [
                  $.id === "pct" ? (g(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: we({ color: b(h.c1) })
                  }, A(k(Number($.b1))) + "%", 5)) : (g(), x("span", x1, A(T(fe)(Number($.b1))), 1))
                ]),
                "cell-b2": O(({ row: $ }) => [
                  $.id === "pct" ? (g(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: we({ color: b(h.c2) })
                  }, A(k(Number($.b2))) + "%", 5)) : (g(), x("span", k1, A(T(fe)(Number($.b2))), 1))
                ]),
                "cell-b3": O(({ row: $ }) => [
                  $.id === "pct" ? (g(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: we({ color: b(h.c3) })
                  }, A(k(Number($.b3))) + "%", 5)) : (g(), x("span", _1, A(T(fe)(Number($.b3))), 1))
                ]),
                "cell-b4p": O(({ row: $ }) => [
                  $.id === "pct" ? (g(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: we({ color: b(h.c4p) })
                  }, A(k(Number($.b4p))) + "%", 5)) : (g(), x("span", w1, A(T(fe)(Number($.b4p))), 1))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ], 64)) : (g(), x("div", C1, [
            d("div", $1, [
              d("div", S1, [
                N(T(rt), { class: "empty-icon" })
              ]),
              _[0] || (_[0] = d("p", { class: "empty-title" }, "No triage combinations data", -1)),
              _[1] || (_[1] = d("p", { class: "empty-description" }, " No intent distribution data found for the selected period. Try adjusting the date range. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), D1 = /* @__PURE__ */ ve(M1, [["__scopeId", "data-v-be7d2c0c"]]), A1 = { class: "card-body" }, T1 = {
  key: 0,
  class: "distribution-with-total flex w-full min-w-0 flex-1 flex-col gap-3 min-h-0"
}, B1 = { class: "pie-section" }, L1 = {
  key: 1,
  class: "empty-state"
}, R1 = /* @__PURE__ */ ue({
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
      () => (a.data?.items || []).reduce((p, h) => p + h.count, 0)
    ), u = C(() => {
      const p = {};
      for (const h of a.data?.items || [])
        p[h.language] = (p[h.language] || 0) + h.count;
      return Object.entries(p).map(([h, b]) => ({ language: h, count: b })).sort((h, b) => b.count - h.count);
    }), f = C(() => ({
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
    })), m = C(() => ({
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
        d("div", A1, [
          l.value ? (g(), x("div", T1, [
            d("section", B1, [
              N(Fn, {
                data: f.value,
                options: m.value
              }, null, 8, ["data", "options"])
            ]),
            N(xe, {
              class: "shrink-0",
              title: "Total",
              value: T(fe)(c.value),
              color: "#8b5cf6"
            }, null, 8, ["value"])
          ])) : (g(), x("section", L1, [...h[0] || (h[0] = [
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
}), P1 = /* @__PURE__ */ ve(R1, [["__scopeId", "data-v-9385c088"]]), I1 = { class: "card-body" }, E1 = {
  key: 0,
  class: "guardrails-daily-section"
}, F1 = { class: "w-full min-w-0" }, O1 = { class: "font-medium" }, V1 = { class: "font-semibold" }, z1 = { class: "type-badges-row" }, N1 = { class: "guardrails-kpis grid grid-cols-2 gap-3 lg:grid-cols-4" }, j1 = {
  key: 1,
  class: "empty-state"
}, H1 = /* @__PURE__ */ ue({
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
      for (const _ of n.data?.items || [])
        v[_[y]] = (v[_[y]] || 0) + _.count;
      const k = Object.entries(v).sort((_, $) => $[1] - _[1]);
      if (k.length === 0) return { name: "—", pct: 0 };
      const w = l.value;
      return {
        name: k[0][0],
        pct: w > 0 ? Math.round(k[0][1] / w * 100) : 0
      };
    }, u = C(() => c("guardrail_type")), f = C(() => c("guardrail_action")), m = C(() => c("guardrail_source")), p = C(() => {
      const y = {};
      for (const v of n.data?.items || [])
        y[v.date] || (y[v.date] = {}), y[v.date][v.guardrail_type] = (y[v.date][v.guardrail_type] || 0) + v.count;
      return Object.entries(y).map(([v, k]) => ({
        date: v,
        total: Object.values(k).reduce((w, _) => w + _, 0),
        types: Object.entries(k).map(([w, _]) => ({ type: w, count: _ })).sort((w, _) => _.count - w.count)
      })).sort((v, k) => new Date(v.date).getTime() - new Date(k.date).getTime());
    }), h = [
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
    return t({ isDark: i }), (y, v) => (g(), ae(Se, {
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
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: O(() => [
        d("div", I1, [
          r.value ? (g(), x(de, { key: 0 }, [
            p.value.length > 0 ? (g(), x("section", E1, [
              d("div", F1, [
                N(gt, {
                  columns: h,
                  rows: b.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-date": O(({ row: k }) => [
                    d("span", O1, A(T(He)(String(k.date)).format("MMM DD")), 1)
                  ]),
                  "cell-count": O(({ row: k }) => [
                    d("span", V1, A(T(fe)(k.total)), 1)
                  ]),
                  "cell-types": O(({ row: k }) => [
                    d("div", z1, [
                      (g(!0), x(de, null, pe(k.types, (w) => (g(), x("span", {
                        key: w.type,
                        class: "type-count-badge"
                      }, A(w.type) + " (" + A(w.count) + ") ", 1))), 128))
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : E("", !0),
            d("section", N1, [
              N(xe, {
                title: "Total Events",
                value: T(fe)(l.value)
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
          ], 64)) : (g(), x("section", j1, [...v[0] || (v[0] = [
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
}), W1 = /* @__PURE__ */ ve(H1, [["__scopeId", "data-v-c042ede0"]]), K1 = { class: "card-body" }, U1 = { class: "chart-section" }, Y1 = { class: "chart-wrapper" }, q1 = {
  key: 1,
  class: "empty-chart"
}, X1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5" }, G1 = {
  key: 0,
  class: "dn-failure-section"
}, Z1 = { class: "w-full min-w-0" }, Q1 = { class: "failure-reason" }, J1 = { class: "failure-count" }, ex = { class: "impact-bar-container" }, tx = { class: "impact-label" }, ax = { class: "dn-trend-health-block flex flex-col gap-0" }, nx = {
  key: 0,
  class: "chart-section dn-trend-chart-section"
}, ox = { class: "dn-trend-chart-area min-h-[280px] w-full min-w-0 flex-1" }, sx = { class: "system-health" }, ix = { class: "system-health-content" }, rx = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4" }, lx = {
  key: 1,
  class: "empty-state"
}, cx = /* @__PURE__ */ ue({
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
      const $ = n.data?.documentCounts?.items || [], S = n.data?.processingCounts?.items || [];
      return $.length > 0 || S.length > 0;
    }), c = C(() => {
      const $ = n.data?.documentCounts?.items || [];
      return {
        processing_started: $.reduce((S, M) => S + M.processing_started, 0),
        processing_completed: $.reduce((S, M) => S + M.processing_completed, 0),
        processing_failed: $.reduce((S, M) => S + M.processing_failed, 0),
        row_count_total: $.reduce((S, M) => S + M.row_count_total, 0)
      };
    }), u = C(() => {
      const $ = n.data?.processingCounts?.items || [];
      return {
        processing_started: $.reduce((S, M) => S + M.processing_started, 0),
        processing_success: $.reduce((S, M) => S + M.processing_success, 0),
        notification_sent: $.reduce((S, M) => S + M.notification_sent, 0),
        notification_failed: $.reduce((S, M) => S + M.notification_failed, 0),
        dq_phone: $.reduce((S, M) => S + M.dq_error_phone_not_found, 0),
        dq_flight: $.reduce((S, M) => S + M.dq_error_flight_not_found, 0),
        dq_booking: $.reduce((S, M) => S + M.dq_error_booking_not_found, 0),
        dq_other: $.reduce((S, M) => S + M.dq_error_other, 0),
        totalDqErrors: $.reduce(
          (S, M) => S + M.dq_error_phone_not_found + M.dq_error_flight_not_found + M.dq_error_booking_not_found + M.dq_error_other,
          0
        )
      };
    }), f = C(
      () => c.value.row_count_total || u.value.processing_started
    ), m = C(
      () => Math.max(0, f.value - u.value.notification_sent)
    ), p = ($, S) => S ? `${Math.round($ / S * 100)}%` : "0%", h = C(() => {
      const $ = [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Flight not found", count: u.value.dq_flight },
        {
          reason: "Notification failed",
          count: u.value.notification_failed
        },
        { reason: "Other", count: u.value.dq_other }
      ].filter((S) => S.count > 0).sort((S, M) => M.count - S.count);
      return $.length > 0 ? $[0] : { reason: "None", count: 0 };
    }), b = C(() => {
      const $ = f.value;
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
        impactPct: $ > 0 ? Math.round(S.count / $ * 100) : 0
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
    ), k = C(() => {
      const $ = f.value, S = u.value.processing_success, M = Math.max(0, S - u.value.totalDqErrors), I = u.value.notification_sent, z = Math.max(0, $ - S), K = u.value.totalDqErrors, D = Math.max(0, M - I), P = (j, X) => ye(j, X), B = [
        { name: "Records Detected", status: "success" },
        { name: "Valid Reservations", status: "success" },
        { name: "Invalid / Unprocessed", status: "error" },
        { name: "Contactable", status: "success" },
        { name: "Data Quality Issues", status: "error" },
        { name: "Notified", status: "success" },
        { name: "Not Delivered", status: "abandon" }
      ], H = [];
      return S > 0 && H.push({
        source: "Records Detected",
        target: "Valid Reservations",
        value: S,
        label: P(S, $)
      }), z > 0 && H.push({
        source: "Records Detected",
        target: "Invalid / Unprocessed",
        value: z,
        label: P(z, $)
      }), M > 0 && H.push({
        source: "Valid Reservations",
        target: "Contactable",
        value: M,
        label: P(M, $)
      }), K > 0 && H.push({
        source: "Valid Reservations",
        target: "Data Quality Issues",
        value: K,
        label: P(K, $)
      }), I > 0 && H.push({
        source: "Contactable",
        target: "Notified",
        value: I,
        label: P(I, $)
      }), D > 0 && H.push({
        source: "Contactable",
        target: "Not Delivered",
        value: D,
        label: P(D, $)
      }), { nodes: B, links: H };
    }), w = C(() => {
      const $ = [...n.data?.processingCounts?.items || []].sort(
        (P, B) => new Date(P.date).getTime() - new Date(B.date).getTime()
      ), S = n.data?.documentCounts?.items || [], M = {};
      for (const P of S)
        M[P.date] = (M[P.date] || 0) + P.row_count_total;
      const I = [
        .../* @__PURE__ */ new Set([
          ...$.map((P) => P.date),
          ...S.map((P) => P.date)
        ])
      ].sort(), z = I.map((P) => He(P).format("MMM DD")), K = I.map((P) => {
        const B = $.find((X) => X.date === P), H = B?.notification_sent || 0, j = M[P] || B?.processing_started || 0;
        return j > 0 ? Math.round(H / j * 100) : 0;
      }), D = I.map((P) => $.find((H) => H.date === P)?.notification_sent || 0);
      return {
        labels: z,
        datasets: [
          {
            label: "Success Rate (%)",
            data: K,
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
    }), _ = C(() => ({
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
    return t({ isDark: i }), ($, S) => (g(), ae(Se, {
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
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: O(() => [
        d("div", K1, [
          l.value ? (g(), x(de, { key: 0 }, [
            d("section", U1, [
              S[2] || (S[2] = d("div", { class: "chart-header" }, [
                d("h4", { class: "section-title" }, "Passenger Disruption Funnel")
              ], -1)),
              d("div", Y1, [
                k.value.nodes.length > 0 && k.value.links.length > 0 ? (g(), ae(aa, {
                  key: 0,
                  data: k.value,
                  height: "350px",
                  "use-gradient": !1,
                  "node-gap": 16
                }, null, 8, ["data"])) : (g(), x("div", q1, [...S[1] || (S[1] = [
                  d("p", { class: "empty-chart-text" }, " No processing data available for visualization ", -1)
                ])]))
              ])
            ]),
            d("div", X1, [
              N(xe, {
                color: "#3b82f6",
                title: "Total Records",
                value: T(fe)(c.value.row_count_total)
              }, null, 8, ["value"]),
              N(xe, {
                color: "#8b5cf6",
                title: "Passengers Affected",
                value: T(fe)(f.value)
              }, null, 8, ["value"]),
              N(xe, {
                color: "#10b981",
                title: "Successfully Notified",
                value: T(fe)(u.value.notification_sent),
                subvalue: p(u.value.notification_sent, f.value)
              }, null, 8, ["value", "subvalue"]),
              N(xe, {
                color: "#ef4444",
                title: "Not Notified",
                value: T(fe)(m.value),
                subvalue: p(m.value, f.value)
              }, null, 8, ["value", "subvalue"]),
              N(xe, {
                color: "#f59e0b",
                title: "Main Failure Reason",
                value: h.value.reason,
                subvalue: h.value.count > 0 ? `${T(fe)(h.value.count)} cases` : void 0
              }, null, 8, ["value", "subvalue"])
            ]),
            b.value.length > 0 ? (g(), x("section", G1, [
              S[3] || (S[3] = d("div", { class: "section-header" }, [
                d("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
              ], -1)),
              d("div", Z1, [
                N(gt, {
                  columns: y,
                  rows: v.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-reason": O(({ row: M }) => [
                    d("span", Q1, A(M.reason), 1)
                  ]),
                  "cell-count": O(({ row: M }) => [
                    d("span", J1, A(T(fe)(M.count)), 1)
                  ]),
                  "cell-impact": O(({ row: M }) => [
                    d("div", ex, [
                      d("div", {
                        class: "impact-bar",
                        style: we({ width: M.impactPct + "%" })
                      }, null, 4),
                      d("span", tx, A(M.impactPct) + "%", 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : E("", !0),
            d("div", ax, [
              w.value.labels.length > 0 ? (g(), x("section", nx, [
                S[4] || (S[4] = d("div", { class: "chart-header" }, [
                  d("h4", { class: "section-title" }, "Notification Success Rate by Day")
                ], -1)),
                d("div", ox, [
                  N(bt, {
                    data: w.value,
                    options: _.value,
                    theme: n.theme
                  }, null, 8, ["data", "options", "theme"])
                ])
              ])) : E("", !0),
              d("details", sx, [
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
                d("div", ix, [
                  d("div", rx, [
                    N(xe, {
                      title: "Docs Started",
                      value: T(fe)(c.value.processing_started)
                    }, null, 8, ["value"]),
                    N(xe, {
                      title: "Docs Completed",
                      value: T(fe)(c.value.processing_completed)
                    }, null, 8, ["value"]),
                    N(xe, {
                      title: "Docs Failed",
                      value: T(fe)(c.value.processing_failed)
                    }, null, 8, ["value"]),
                    N(xe, {
                      title: "Processing Started",
                      value: T(fe)(u.value.processing_started)
                    }, null, 8, ["value"]),
                    N(xe, {
                      title: "Processing Success",
                      value: T(fe)(u.value.processing_success)
                    }, null, 8, ["value"]),
                    N(xe, {
                      title: "Notification Failed",
                      value: T(fe)(u.value.notification_failed)
                    }, null, 8, ["value"])
                  ])
                ])
              ])
            ])
          ], 64)) : (g(), x("section", lx, [...S[6] || (S[6] = [
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
}), dx = /* @__PURE__ */ ve(cx, [["__scopeId", "data-v-2342d485"]]), ux = /* @__PURE__ */ ue({
  __name: "TotalConversationsCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = C(() => fe(a.totalConversations)), s = C(() => T(n.value?.isDark) ?? !1), i = C(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (g(), ae(ft, {
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
}), hx = /* @__PURE__ */ ue({
  __name: "CsatP95Card",
  props: {
    csatP95: { default: 0 },
    previousCsatP95: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = C(() => `${a.csatP95.toFixed(1)}`), s = C(() => T(n.value?.isDark) ?? !1), i = C(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (g(), ae(ft, {
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
}), fx = /* @__PURE__ */ ue({
  __name: "CsatPulseCard",
  props: {
    csatPulse: { default: 0 },
    previousCsatPulse: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = C(() => `${a.csatPulse.toFixed(1)}%`), s = C(() => T(n.value?.isDark) ?? !1), i = C(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (g(), ae(ft, {
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
}), gx = {
  key: 0,
  class: "card-body"
}, mx = { class: "chart-wrapper" }, px = { class: "overview-card-infos mt-4 flex w-full flex-col gap-3 sm:flex-row sm:gap-4" }, bx = {
  key: 1,
  class: "empty-state"
}, vx = 520, yx = 300, xx = 40, kx = 48, _x = 48, wx = {
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
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: O(() => [
        r.value && r.value.total_nps_responses > 0 ? (g(), x("div", gx, [
          d("div", mx, [
            N(vr, {
              histogram: r.value.histogram || [],
              "min-score": r.value.min_score || 0,
              "max-score": r.value.max_score || 0,
              "q1-score": r.value.q1_score || 0,
              "median-score": r.value.median_score || 0,
              "q3-score": r.value.q3_score || 0,
              "average-score": r.value.average_score || 0,
              "chart-width": vx,
              "chart-height": yx,
              "chart-margin": xx,
              "chart-margin-right": kx,
              "chart-bottom-margin": _x,
              "plot-inset": 10,
              "show-legend": !1,
              "show-stat-labels": !1
            }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score"])
          ]),
          d("div", px, [
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
            }, null, 8, ["value"])) : E("", !0)
          ])
        ])) : (g(), x("div", bx, [...c[0] || (c[0] = [
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
}, Ar = /* @__PURE__ */ ve(wx, [["__scopeId", "data-v-e98fe9b2"]]), Cx = {
  key: 0,
  class: "card-body"
}, $x = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Sx = {
  key: 1,
  class: "empty-state"
}, Mx = {
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
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: O(() => [
        i.value ? (g(), x("div", Cx, [
          d("div", $x, [
            N(bt, {
              data: r.value,
              options: l,
              "uppercase-legend-labels": !0
            }, null, 8, ["data"])
          ])
        ])) : (g(), x("div", Sx, [...u[0] || (u[0] = [
          d("p", { class: "empty-title" }, "No daily CSAT P95 available", -1),
          d("p", { class: "empty-description" }, " No CSAT P95 points were found for the selected date range. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}, Tr = /* @__PURE__ */ ve(Mx, [["__scopeId", "data-v-5207cfa7"]]), Dx = {
  key: 0,
  class: "card-body"
}, Ax = {
  key: 1,
  class: "empty-state"
}, Tx = /* @__PURE__ */ ue({
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
    return (i, r) => (g(), ae(Se, {
      class: "nps-resolution-root min-h-0",
      title: "CSAT Resolution",
      subtitle: "Resolution answers distribution (1=Si, 2=No)",
      collapsible: !1,
      loading: t.loading
    }, {
      default: O(() => [
        n.value ? (g(), x("div", Dx, [
          N(Mt, {
            data: o.value,
            options: s,
            "uppercase-legend-labels": !0
          }, null, 8, ["data"])
        ])) : (g(), x("div", Ax, [...r[0] || (r[0] = [
          d("p", { class: "empty-title" }, "No resolution answers available", -1),
          d("p", { class: "empty-description" }, " This airline has the resolution survey configured, but no responses were found for the selected dates. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Bx = /* @__PURE__ */ ve(Tx, [["__scopeId", "data-v-6849ef24"]]), Lx = {
  key: 0,
  class: "card-body"
}, Rx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Px = {
  key: 1,
  class: "empty-state"
}, Ix = /* @__PURE__ */ ue({
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
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: O(() => [
        i.value ? (g(), x("div", Lx, [
          d("div", Rx, [
            N(bt, {
              data: r.value,
              options: l,
              "uppercase-legend-labels": !0
            }, null, 8, ["data"])
          ])
        ])) : (g(), x("div", Px, [...u[0] || (u[0] = [
          d("p", { class: "empty-title" }, "No CSAT Pulse data available", -1),
          d("p", { class: "empty-description" }, " No CSAT pulse points were found for the selected date range. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Ex = /* @__PURE__ */ ve(Ix, [["__scopeId", "data-v-72955d9a"]]), Fx = { class: "nps-metrics-container flex flex-col gap-6 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Ox = { class: "grid w-full grid-cols-1 items-start gap-6 md:grid-cols-2" }, Br = {
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
    }, o = e, s = C(() => o.showResolutionChart), i = C(() => o.showCsatPulseChart), r = C(
      () => (s.value ? 1 : 0) + (i.value ? 1 : 0)
    ), l = C(() => r.value > 0), c = C(
      () => r.value > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
    );
    return (u, f) => (g(), x("div", Fx, [
      d("div", Ox, [
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
        class: G(["grid w-full items-start gap-6", c.value])
      }, [
        s.value ? (g(), ae(Bx, {
          key: 0,
          class: "min-w-0",
          data: e.data,
          loading: e.loading
        }, null, 8, ["data", "loading"])) : E("", !0),
        i.value ? (g(), ae(Ex, {
          key: 1,
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: n
        }, null, 8, ["data", "loading", "enable-export"])) : E("", !0)
      ], 2)) : E("", !0)
    ]));
  }
}, Vx = { class: "csat-container__body" }, zx = /* @__PURE__ */ ue({
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
        d("div", Vx, [
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
}), Nx = /* @__PURE__ */ ve(zx, [["__scopeId", "data-v-37178ba1"]]), jx = /* @__PURE__ */ ue({
  __name: "AiGeneratedRevenueCard",
  props: {
    totalRevenue: { default: 0 },
    previousTotalRevenue: { default: null },
    currencyCode: { default: "USD" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = C(() => Ut(a.totalRevenue)), s = C(() => T(n.value?.isDark) ?? !1), i = C(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (g(), ae(ft, {
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
}), Hx = { class: "flex justify-end" }, Wx = { class: "w-52" }, Kx = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Ux = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, Yx = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, qx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Xx = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Gx = /* @__PURE__ */ ue({
  __name: "AiGeneratedChart",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    breakdownBy: { default: "all" },
    theme: { default: void 0 }
  },
  emits: ["changeBreakdown"],
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, s = $e(n, "theme"), { isDark: i, colors: r } = Me(s), l = ne(n.breakdownBy), c = C(() => n.data?.currency ?? "USD"), u = [
      { value: "all", label: "All" },
      { value: "payment_method", label: "Payment Method" },
      { value: "agent_type", label: "Agent" },
      { value: "channel", label: "Channel" },
      { value: "channel_and_agent", label: "Channel & Agent" }
    ], f = C(() => {
      const P = {
        payment_method: "Payment Method",
        agent_type: "Agent",
        channel: "Channel",
        channel_and_agent: "Channel & Agent"
      }[l.value];
      return P ? `AI Generated Revenue by ${P}` : "AI Generated Revenue";
    }), m = C(() => l.value === "payment_method"), p = [
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
      const P = Math.abs(D);
      return P >= 1e6 ? (D / 1e6).toFixed(2) + "M" : P >= 1e5 ? (D / 1e3).toFixed(1) + "K" : Math.round(D).toLocaleString();
    }, y = (D) => !D || D === "unknown" ? "Unknown" : St(D).split(/[_|]/).map((P) => P ? P.charAt(0).toUpperCase() + P.slice(1) : "").join(" "), v = ne({
      labels: [],
      datasets: []
    }), k = ne([]), w = C(() => {
      const D = Math.min(k.value.length, 5);
      if (!(D <= 0))
        return { gridTemplateColumns: `repeat(${D}, minmax(0, 1fr))` };
    }), _ = (D) => {
      const P = D?.ai_revenue_by_day ?? [], B = D?.breakdown ?? [];
      if (!P.length) {
        v.value = { labels: [], datasets: [] }, k.value = [];
        return;
      }
      const H = [...P].sort((Z, oe) => Z.date.localeCompare(oe.date)), j = H.map((Z) => He(Z.date).format("MMM DD")), X = "ai_revenue";
      if (l.value === "all") {
        v.value = {
          labels: j,
          datasets: [
            {
              label: `Revenue (${c.value})`,
              data: H.map((Z) => Number(Z[X] ?? 0)),
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
        }, k.value = [];
        return;
      }
      const he = B.slice(0, 7).map((Z) => Z.key).map((Z, oe) => {
        const L = h(oe), Y = H.map((q) => {
          const F = (q.breakdown ?? {})[Z];
          return F ? Number(F[X] ?? 0) : 0;
        });
        return m.value ? {
          label: y(Z),
          data: Y,
          backgroundColor: L,
          borderColor: L,
          borderWidth: 1,
          borderRadius: 3
        } : {
          label: y(Z),
          data: Y,
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
      v.value = { labels: j, datasets: he }, k.value = B.slice(0, 5).map((Z, oe) => ({
        key: Z.key,
        label: y(Z.key),
        amount: `${c.value} ${b(Z.total)}`,
        percentage: Number(Z.percentage ?? 0),
        color: h(oe)
      }));
    }, $ = C(() => ({
      callback: (D) => `${c.value} ${b(Number(D))}`,
      color: r.value.textSecondary,
      padding: 8
    })), S = C(() => ({
      border: { display: !1 },
      grid: { color: r.value.gridLines, lineWidth: 1, drawTicks: !1 },
      ticks: { color: r.value.textSecondary, padding: 8 }
    })), M = C(() => ({
      beginAtZero: !0,
      border: { display: !1 },
      grid: { color: r.value.gridLines, lineWidth: 1, drawTicks: !1 },
      ticks: $.value
    })), I = C(() => ({
      scales: {
        x: S.value,
        y: M.value
      }
    })), z = C(() => ({
      scales: {
        x: { ...S.value, stacked: !0 },
        y: { ...M.value, stacked: !0 }
      }
    }));
    Te(
      () => n.data,
      (D) => _(D ?? null),
      { deep: !0, immediate: !0 }
    ), Te(
      () => n.breakdownBy,
      (D) => {
        l.value = D, _(n.data ?? null);
      }
    );
    const K = (D) => {
      l.value = String(D), o("changeBreakdown", l.value);
    };
    return t({ isDark: i }), (D, P) => (g(), ae(Se, {
      class: "w-full min-h-0 self-start",
      title: f.value,
      subtitle: "Revenue generated by AI agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerAside: O(() => [
        d("div", Hx, [
          d("div", Wx, [
            N(na, {
              "model-value": l.value,
              options: u,
              "onUpdate:modelValue": K
            }, null, 8, ["model-value"])
          ])
        ])
      ]),
      default: O(() => [
        d("div", {
          class: G(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", n.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          N(pt, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: O(() => [
              n.loading ? (g(), x("div", Kx, [...P[0] || (P[0] = [
                d("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (g(), x("div", Ux, [
                v.value.labels && v.value.labels.length && v.value.datasets.length ? (g(), x("section", Yx, [
                  d("div", qx, [
                    m.value ? (g(), ae(Mt, {
                      key: 0,
                      data: v.value,
                      options: z.value,
                      theme: s.value
                    }, null, 8, ["data", "options", "theme"])) : (g(), ae(bt, {
                      key: 1,
                      data: v.value,
                      options: I.value,
                      theme: s.value
                    }, null, 8, ["data", "options", "theme"]))
                  ]),
                  k.value.length ? (g(), x("div", {
                    key: 0,
                    class: "grid w-full gap-3 md:gap-4",
                    style: we(w.value)
                  }, [
                    (g(!0), x(de, null, pe(k.value, (B) => (g(), ae(xe, {
                      key: `card-${B.key}`,
                      class: "min-w-0",
                      color: B.color,
                      title: B.label,
                      value: B.amount,
                      subvalue: `${B.percentage.toFixed(1)}%`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ], 4)) : E("", !0)
                ])) : (g(), x("section", Xx, [...P[1] || (P[1] = [
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
}), Zx = /* @__PURE__ */ ve(Gx, [["__scopeId", "data-v-d3e5e67f"]]), fi = 1, Qx = /* @__PURE__ */ ue({
  __name: "CostCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), { isDark: o } = Me($e(a, "theme")), s = C(() => a.totalConversations * fi), i = C(() => a.previousTotalConversations === null || a.previousTotalConversations === void 0 ? null : a.previousTotalConversations * fi), r = C(() => fe(s.value)), l = C(
      () => i.value !== null && i.value !== void 0
    ), c = C(() => {
      if (!l.value) return 0;
      const m = i.value;
      return m === 0 ? s.value > 0 ? 100 : 0 : (s.value - m) / m * 100;
    }), u = C(() => {
      const m = c.value.toFixed(1);
      return c.value > 0 ? `+${m}%` : `${m}%`;
    }), f = C(() => c.value < 0 ? "change-badge--up" : c.value > 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: o, changePercent: c }), (m, p) => (g(), ae(ft, {
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
          class: G(["change-badge", f.value, { "change-badge--dark": T(o) }])
        }, A(u.value), 3)) : E("", !0)
      ]),
      _: 1
    }, 8, ["value", "loading", "theme"]));
  }
}), Jx = /* @__PURE__ */ ve(Qx, [["__scopeId", "data-v-411e0735"]]), ek = { class: "flex justify-end" }, tk = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, ak = { class: "w-full shrink-0 flex min-h-0 flex-col" }, nk = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, ok = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, sk = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, ik = /* @__PURE__ */ ue({
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
    const n = e, o = a, s = (_) => {
      o("export", _);
    }, i = $e(n, "theme"), { isDark: r } = Me(i), l = ne(n.breakdownBy), c = C(() => n.data ?? {
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
    }), f = ne([]), m = C(() => {
      const _ = f.value.length;
      if (!(_ <= 0))
        return { gridTemplateColumns: `repeat(${_}, minmax(0, 1fr))` };
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
    ], b = (_) => h[_ % h.length], y = {
      scales: {
        y: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 25,
            callback: (_) => `${_}%`
          }
        }
      }
    }, v = () => {
      o("changeBreakdown", l.value);
    }, k = (_) => {
      if (!_) return "";
      const S = _.replace(/_/g, " ").trim().replace(/\s+state$/i, "").trim();
      return S ? S.charAt(0).toUpperCase() + S.slice(1) : "";
    }, w = (_) => {
      if (l.value === "all") {
        const D = _?.escalations_by_day ?? [];
        if (!D.length) {
          u.value = { labels: [], datasets: [] }, f.value = [], p.value = [];
          return;
        }
        const P = [...D].sort((B, H) => B.date.localeCompare(H.date));
        u.value = {
          labels: P.map((B) => He(B.date).format("MMM DD")),
          datasets: [
            {
              label: "All",
              data: P.map(
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
      const $ = _?.breakdown_by_day ?? [], S = _?.breakdown_items ?? [];
      if (!$.length) {
        u.value = { labels: [], datasets: [] }, f.value = [], p.value = [];
        return;
      }
      const M = [...$].sort(
        (D, P) => D.date.localeCompare(P.date)
      ), I = S.slice(0, 5).map((D) => D.key), z = M.map((D) => He(D.date).format("MMM DD")), K = I.map((D, P) => {
        const B = S.find((H) => H.key === D);
        return {
          label: k(B?.label || D),
          data: M.map((H) => {
            const j = H.items.find((X) => X.key === D);
            return Number(j?.percentage || 0);
          }),
          borderColor: b(P),
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35
        };
      });
      u.value = {
        labels: z,
        datasets: K
      }, f.value = S.slice(0, 5).map((D, P) => ({
        key: D.key,
        label: k(D.label),
        percentage: Number(D.percentage || 0),
        color: b(P)
      })), p.value = S.slice(0, 5).map((D, P) => ({
        key: D.key,
        label: k(D.label),
        color: b(P)
      }));
    };
    return Te(
      () => n.data,
      (_) => {
        w(_ ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Te(
      () => n.breakdownBy,
      (_) => {
        l.value = _, w(c.value);
      }
    ), t({ isDark: r }), (_, $) => (g(), ae(Se, {
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
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      headerAside: O(() => [
        d("div", ek, [
          Xe(d("select", {
            "onUpdate:modelValue": $[0] || ($[0] = (S) => l.value = S),
            class: "rounded-xl border border-[var(--kiut-border-light,#d1d5db)] bg-[var(--kiut-bg-card,#ffffff)] px-3 py-2 text-sm text-[var(--kiut-text-primary,#111827)] dark:border-[var(--kiut-border-light,#374151)] dark:bg-[var(--kiut-bg-card,#111827)] dark:text-[var(--kiut-text-primary,#f9fafb)]",
            onChange: v
          }, [...$[1] || ($[1] = [
            d("option", { value: "all" }, "All", -1),
            d("option", { value: "agent" }, "By Agent", -1)
          ])], 544), [
            [qr, l.value]
          ])
        ])
      ]),
      default: O(() => [
        d("div", tk, [
          d("div", ak, [
            u.value.labels && u.value.labels.length && u.value.datasets.length ? (g(), x("section", nk, [
              d("div", ok, [
                N(bt, {
                  data: u.value,
                  options: y,
                  theme: i.value
                }, null, 8, ["data", "theme"])
              ]),
              f.value.length ? (g(), x("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: we(m.value)
              }, [
                (g(!0), x(de, null, pe(f.value, (S) => (g(), ae(xe, {
                  key: `card-${S.key}`,
                  class: "min-w-0",
                  color: S.color,
                  title: S.label,
                  value: `${S.percentage.toFixed(1)}%`
                }, null, 8, ["color", "title", "value"]))), 128))
              ], 4)) : E("", !0)
            ])) : (g(), x("section", sk, [...$[2] || ($[2] = [
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
}), rk = /* @__PURE__ */ ve(ik, [["__scopeId", "data-v-b18e0ebd"]]), lk = /* @__PURE__ */ ue({
  __name: "HumanEscalationsCard",
  props: {
    escalationRatePercentage: { default: 0 },
    previousEscalationRatePercentage: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = C(() => `${Number(a.escalationRatePercentage || 0).toFixed(2)}%`), s = C(() => T(n.value?.isDark) ?? !1), i = C(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (g(), ae(ft, {
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
const ck = { class: "flex justify-end" }, dk = { class: "w-52" }, uk = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, hk = { class: "w-full shrink-0 flex min-h-0 flex-col" }, fk = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, gk = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, mk = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, pk = "#8b5cf6", bk = "#9ca3af", vk = "#94a3b8", yk = /* @__PURE__ */ ue({
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
    const n = e, o = a, s = (Z) => {
      o("export", Z);
    }, i = [
      { value: "all", label: "All" },
      { value: "agent", label: "Agent" },
      { value: "resolution_mode", label: "Resolution Mode" },
      { value: "channel", label: "Channel" },
      { value: "agent_channel", label: "Channel & Agent" }
    ], r = $e(n, "theme"), { isDark: l } = Me(r), c = ne(n.breakdownBy), u = C(() => {
      const oe = {
        resolution_mode: "Resolution Mode",
        agent: "Agent",
        channel: "Channel",
        agent_channel: "Channel & Agent"
      }[c.value];
      return oe ? `Average resolution time by ${oe}` : "Average resolution time";
    }), f = (Z) => {
      c.value = String(Z), o("changeBreakdown", c.value);
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
    }, h = (Z) => p[Z.toLowerCase()] || bk, b = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, y = (Z) => b[Z.toLowerCase()] || vk, v = (Z) => {
      const [oe] = Z.split("|").map((L) => L.trim());
      return y(oe || Z);
    }, k = (Z) => {
      if (!Z) return "Unknown";
      const oe = St(Z).replace(/_/g, " ").trim();
      return oe ? oe.charAt(0).toUpperCase() + oe.slice(1) : "Unknown";
    }, w = C(() => n.data ?? {
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
    }), _ = ne({
      labels: [],
      datasets: []
    }), $ = C(() => {
      const Z = w.value, oe = {
        ai_agent: Z.ai_agent_total_conversations,
        human: Z.human_total_conversations,
        hybrid: Z.hybrid_total_conversations
      }, L = {
        ai_agent: Z.ai_agent_avg_resolution_time_formatted,
        human: Z.human_avg_resolution_time_formatted,
        hybrid: Z.hybrid_avg_resolution_time_formatted
      };
      return m.map((Y) => ({
        key: Y.key,
        label: Y.label,
        color: Y.color,
        formattedValue: L[Y.key] || "-",
        subvalue: `${oe[Y.key] || 0} conversations`
      }));
    }), S = (Z, oe) => Z.map((L) => ({
      key: L.key,
      label: k(L.label),
      color: oe(L.key),
      formattedValue: L.avg_resolution_time_formatted || "-",
      subvalue: `${L.total_conversations} conversations (${L.percentage.toFixed(1)}%)`
    })), M = C(
      () => S(w.value.channel_breakdown_items ?? [], h)
    ), I = C(
      () => S(w.value.agent_breakdown_items ?? [], y)
    ), z = C(
      () => S(
        w.value.agent_channel_breakdown_items ?? [],
        v
      )
    ), K = C(() => {
      switch (c.value) {
        case "channel":
          return M.value;
        case "agent":
          return I.value;
        case "agent_channel":
          return z.value;
        case "resolution_mode":
          return $.value;
        default:
          return [];
      }
    }), D = C(() => {
      const Z = K.value.length;
      if (!(Z <= 0))
        return { gridTemplateColumns: `repeat(${Z}, minmax(0, 1fr))` };
    }), P = (Z) => Z == null ? null : Number((Z / 60).toFixed(2)), B = ne([]), H = (Z) => {
      const oe = Z?.overall_resolution_time_by_day ?? {}, L = Object.keys(oe).sort((Y, q) => Y.localeCompare(q));
      if (!L.length) {
        _.value = { labels: [], datasets: [] }, B.value = [];
        return;
      }
      B.value = [L.map((Y) => oe[Y] ?? null)], _.value = {
        labels: L.map((Y) => He(Y).format("MMM DD")),
        datasets: [
          {
            label: "All",
            data: B.value[0].map((Y) => P(Y)),
            borderColor: pk,
            backgroundColor: "transparent",
            fill: !1,
            tension: 0.35,
            spanGaps: !0
          }
        ]
      };
    }, j = (Z) => {
      const oe = Z?.resolution_time_by_day ?? {}, L = Object.keys(oe).sort((Y, q) => Y.localeCompare(q));
      if (!L.length) {
        _.value = { labels: [], datasets: [] }, B.value = [];
        return;
      }
      B.value = m.map(
        (Y) => L.map((q) => oe[q]?.[Y.key] ?? null)
      ), _.value = {
        labels: L.map((Y) => He(Y).format("MMM DD")),
        datasets: m.map((Y, q) => ({
          label: Y.label,
          data: B.value[q].map((F) => P(F)),
          borderColor: Y.color,
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35,
          spanGaps: !0
        }))
      };
    }, X = (Z, oe, L) => {
      const Y = Object.keys(Z).sort((F, se) => F.localeCompare(se));
      if (!Y.length || !oe.length) {
        _.value = { labels: [], datasets: [] }, B.value = [];
        return;
      }
      const q = oe.map((F) => F.key);
      B.value = q.map((F) => Y.map((se) => Z[se]?.[F] ?? null)), _.value = {
        labels: Y.map((F) => He(F).format("MMM DD")),
        datasets: q.map((F, se) => {
          const le = oe.find((J) => J.key === F);
          return {
            label: k(le?.label || F),
            data: B.value[se].map((J) => P(J)),
            borderColor: L(F),
            backgroundColor: "transparent",
            fill: !1,
            tension: 0.35,
            spanGaps: !0
          };
        })
      };
    }, re = (Z) => {
      switch (c.value) {
        case "channel":
          X(
            Z?.channel_resolution_time_by_day ?? {},
            Z?.channel_breakdown_items ?? [],
            h
          );
          return;
        case "agent":
          X(
            Z?.agent_resolution_time_by_day ?? {},
            Z?.agent_breakdown_items ?? [],
            y
          );
          return;
        case "agent_channel":
          X(
            Z?.agent_channel_resolution_time_by_day ?? {},
            Z?.agent_channel_breakdown_items ?? [],
            v
          );
          return;
        case "resolution_mode":
          j(Z);
          return;
        default:
          H(Z);
      }
    }, he = C(() => ({
      scales: {
        y: {
          min: 0,
          ticks: {
            callback: (Z) => `${Z}m`
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (Z) => {
              const oe = Z.dataset.label || "", L = B.value[Z.datasetIndex]?.[Z.dataIndex];
              return L == null ? `${oe}: -` : `${oe}: ${uo(L)}`;
            }
          }
        }
      }
    }));
    return Te(
      () => n.data,
      (Z) => {
        re(Z ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Te(
      () => n.breakdownBy,
      (Z) => {
        c.value = Z, re(n.data ?? null);
      }
    ), t({ isDark: l }), (Z, oe) => (g(), ae(Se, {
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
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      headerAside: O(() => [
        d("div", ck, [
          d("div", dk, [
            N(na, {
              "model-value": c.value,
              options: i,
              "onUpdate:modelValue": f
            }, null, 8, ["model-value"])
          ])
        ])
      ]),
      default: O(() => [
        d("div", uk, [
          d("div", hk, [
            _.value.labels.length && _.value.datasets.length ? (g(), x("section", fk, [
              d("div", gk, [
                N(bt, {
                  data: _.value,
                  options: he.value,
                  theme: r.value
                }, null, 8, ["data", "options", "theme"])
              ]),
              K.value.length ? (g(), x("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: we(D.value)
              }, [
                (g(!0), x(de, null, pe(K.value, (L) => (g(), ae(xe, {
                  key: `card-${L.key}`,
                  class: "min-w-0",
                  color: L.color,
                  title: L.label,
                  value: L.formattedValue,
                  subvalue: L.subvalue
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : E("", !0)
            ])) : (g(), x("section", mk, [...oe[0] || (oe[0] = [
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
}), xk = /* @__PURE__ */ ve(yk, [["__scopeId", "data-v-05854dc5"]]), kk = { class: "art-values__item" }, _k = { class: "art-values__number" }, wk = { class: "art-values__item" }, Ck = { class: "art-values__number" }, $k = /* @__PURE__ */ ue({
  __name: "AvgResolutionTimeCard",
  props: {
    aiAgentAvgResolutionTimeSeconds: { default: null },
    humanAvgResolutionTimeSeconds: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), { isDark: o } = Me($e(a, "theme")), s = C(() => uo(a.aiAgentAvgResolutionTimeSeconds)), i = C(() => uo(a.humanAvgResolutionTimeSeconds));
    return t({ isDark: o }), (r, l) => (g(), ae(ft, {
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
          class: G(["art-values", { "art-values--dark": T(o) }])
        }, [
          d("div", kk, [
            d("span", _k, A(s.value), 1),
            l[1] || (l[1] = d("span", { class: "art-values__label" }, "AI Agent", -1))
          ]),
          l[3] || (l[3] = d("div", {
            class: "art-values__divider",
            "aria-hidden": "true"
          }, null, -1)),
          d("div", wk, [
            d("span", Ck, A(i.value), 1),
            l[2] || (l[2] = d("span", { class: "art-values__label" }, "Human", -1))
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["value", "loading", "theme"]));
  }
}), Sk = /* @__PURE__ */ ve($k, [["__scopeId", "data-v-f0592d9d"]]), Mk = /* @__PURE__ */ ue({
  __name: "CheckinCR",
  props: {
    checkinCr: { default: 0 },
    previousCheckinCr: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = C(() => `${Number(a.checkinCr || 0).toFixed(1)}%`), s = C(() => T(n.value?.isDark) ?? !1), i = C(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (g(), ae(ft, {
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
}), Dk = /* @__PURE__ */ ue({
  __name: "SellerCR",
  props: {
    sellerCr: { default: 0 },
    previousSellerCr: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = C(() => `${Number(a.sellerCr || 0).toFixed(1)}%`), s = C(() => T(n.value?.isDark) ?? !1), i = C(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (g(), ae(ft, {
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
}), Ak = /* @__PURE__ */ ue({
  __name: "BookingManagerCR",
  props: {
    bookingManagerCr: { default: 0 },
    previousBookingManagerCr: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = ne(null), o = C(
      () => `${Number(a.bookingManagerCr || 0).toFixed(1)}%`
    ), s = C(() => T(n.value?.isDark) ?? !1), i = C(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (g(), ae(ft, {
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
}), Tk = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Bk = {
  key: 0,
  class: "flex w-full shrink-0 flex-col min-h-0"
}, Lk = { class: "flex h-[230px] max-h-[230px] w-full shrink-0 flex-col min-h-0 mb-4" }, Rk = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2" }, Pk = {
  key: 1,
  class: "flex min-h-[280px] w-full items-center justify-center"
}, Ik = { class: "max-w-[360px] text-center" }, Ek = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))]" }, Fk = {
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
        d("div", Tk, [
          o.value.daily.length > 0 ? (g(), x("div", Bk, [
            d("div", Lk, [
              N(bt, {
                class: "h-full min-h-0 w-full",
                data: s.value,
                options: i.value
              }, null, 8, ["data", "options"])
            ]),
            d("div", Rk, [
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
          ])) : (g(), x("section", Pk, [
            d("div", Ik, [
              d("div", Ek, [
                N(T(rt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
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
}, Ok = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Vk = { class: "card-body" }, zk = {
  key: 0,
  class: "chart-section"
}, Nk = { class: "chart-container" }, jk = { class: "mt-auto grid grid-cols-2 gap-3 sm:grid-cols-3 max-[768px]:gap-2" }, Hk = {
  key: 1,
  class: "empty-state"
}, Wk = { class: "empty-state-content" }, Kk = { class: "empty-icon-wrapper" }, Pa = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", gi = 10, Uk = /* @__PURE__ */ ue({
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
      const b = new Date(h), y = String(b.getDate()).padStart(2, "0"), v = String(b.getMonth() + 1).padStart(2, "0");
      return `${y}-${v}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = C(() => {
      const h = n.data?.costs_by_day || {};
      return Object.values(h).reduce((b, y) => b + (y.input_cost || 0), 0);
    }), c = C(() => {
      const h = n.data?.costs_by_day || {};
      return Object.values(h).reduce((b, y) => b + (y.output_cost || 0), 0);
    }), u = C(() => {
      const h = n.data?.costs_by_day || {};
      return Object.values(h).reduce((b, y) => b + (y.cache_read_cost || 0), 0);
    }), f = C(() => {
      const h = n.data?.costs_by_day || {};
      return Object.values(h).reduce((b, y) => b + (y.cache_write_cost || 0), 0);
    }), m = C(() => {
      const h = n.data?.costs_by_day || {}, b = Object.keys(h).sort();
      if (b.length === 0)
        return { labels: [], datasets: [] };
      const y = b.map((k) => i(k)), v = [
        {
          label: "Input Cost",
          data: b.map((k) => h[k]?.input_cost || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: b.map((k) => h[k]?.output_cost || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: b.map((k) => h[k]?.cache_read_cost || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: b.map((k) => h[k]?.cache_write_cost || 0),
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
        d("div", Ok, [
          d("div", Vk, [
            m.value.labels && m.value.labels.length ? (g(), x("section", zk, [
              d("div", Nk, [
                N(Mt, {
                  data: m.value,
                  options: p.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              d("footer", jk, [
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
            ])) : (g(), x("section", Hk, [
              d("div", Wk, [
                d("div", Kk, [
                  N(T(rt), { class: "empty-icon" })
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
}), Yk = /* @__PURE__ */ ve(Uk, [["__scopeId", "data-v-e1c4a95b"]]), qk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Xk = { class: "card-body" }, Gk = {
  key: 0,
  class: "chart-section"
}, Zk = { class: "chart-container" }, Qk = { class: "mt-auto flex w-full min-w-0 flex-nowrap items-stretch gap-2 sm:gap-3" }, Jk = {
  key: 1,
  class: "empty-state"
}, e_ = { class: "empty-state-content" }, t_ = { class: "empty-icon-wrapper" }, Ia = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", mi = 10, a_ = /* @__PURE__ */ ue({
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
    }, l = C(() => {
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
        d("div", qk, [
          d("div", Xk, [
            l.value.labels && l.value.labels.length ? (g(), x("section", Gk, [
              d("div", Zk, [
                N(Mt, {
                  data: l.value,
                  options: c.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              d("footer", Qk, [
                N(xe, {
                  class: "min-w-0 flex-1",
                  title: "Total Tokens",
                  value: T(fe)(e.data.total_tokens)
                }, null, 8, ["value"]),
                N(xe, {
                  class: "min-w-0 flex-1",
                  title: "Input",
                  value: T(fe)(e.data.total_input_tokens),
                  color: r.input
                }, null, 8, ["value", "color"]),
                N(xe, {
                  class: "min-w-0 flex-1",
                  title: "Output",
                  value: T(fe)(e.data.total_output_tokens),
                  color: r.output
                }, null, 8, ["value", "color"]),
                N(xe, {
                  class: "min-w-0 flex-1",
                  title: "Cache Read",
                  value: T(fe)(e.data.total_cache_read_tokens),
                  color: r.cache_read
                }, null, 8, ["value", "color"]),
                N(xe, {
                  class: "min-w-0 flex-1",
                  title: "Cache Write",
                  value: T(fe)(e.data.total_cache_write_tokens),
                  color: r.cache_write
                }, null, 8, ["value", "color"])
              ])
            ])) : (g(), x("section", Jk, [
              d("div", e_, [
                d("div", t_, [
                  N(T(rt), { class: "empty-icon" })
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
}), n_ = /* @__PURE__ */ ve(a_, [["__scopeId", "data-v-554d3cda"]]), o_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, s_ = { class: "card-body" }, i_ = {
  key: 0,
  class: "chart-section"
}, r_ = { class: "chart-container" }, l_ = { class: "mt-4 w-full min-w-0" }, c_ = {
  key: 1,
  class: "empty-state"
}, d_ = { class: "empty-state-content" }, u_ = { class: "empty-icon-wrapper" }, h_ = /* @__PURE__ */ ue({
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
    }, i = C(
      () => fe(a.data?.total_conversations ?? 0)
    ), r = C(() => {
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
        d("div", o_, [
          d("div", s_, [
            r.value.labels && r.value.labels.length ? (g(), x("section", i_, [
              d("div", r_, [
                N(bt, {
                  data: r.value,
                  options: l.value
                }, null, 8, ["data", "options"])
              ]),
              d("div", l_, [
                N(xe, {
                  class: "min-w-0 w-full",
                  title: "Total",
                  value: i.value
                }, null, 8, ["value"])
              ])
            ])) : (g(), x("section", c_, [
              d("div", d_, [
                d("div", u_, [
                  N(T(rt), { class: "empty-icon" })
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
}), f_ = /* @__PURE__ */ ve(h_, [["__scopeId", "data-v-311f443a"]]), g_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, m_ = { class: "card-body" }, p_ = {
  key: 0,
  class: "charts-grid"
}, b_ = { class: "chart-section" }, v_ = { class: "chart-container" }, y_ = { class: "chart-section" }, x_ = { class: "chart-container" }, k_ = {
  key: 1,
  class: "empty-state"
}, __ = { class: "empty-state-content" }, w_ = { class: "empty-icon-wrapper" }, C_ = /* @__PURE__ */ ue({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), s = C(() => a.data?.top_agents && a.data.top_agents.length > 0), i = C(() => a.data?.top_agents ? [...a.data.top_agents].sort((m, p) => (p.total_cost || 0) - (m.total_cost || 0)) : []), r = C(() => a.data?.top_agents ? [...a.data.top_agents].sort((m, p) => (p.total_tokens || 0) - (m.total_tokens || 0)) : []), l = C(() => {
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
    }), c = C(() => {
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
    }), u = C(() => a.options ? a.options : {
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
    }), f = C(() => a.options ? a.options : {
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
        d("div", g_, [
          d("div", m_, [
            s.value ? (g(), x("div", p_, [
              d("section", b_, [
                p[0] || (p[0] = d("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
                d("div", v_, [
                  N(Mt, {
                    data: l.value,
                    options: u.value
                  }, null, 8, ["data", "options"])
                ])
              ]),
              d("section", y_, [
                p[1] || (p[1] = d("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
                d("div", x_, [
                  N(Mt, {
                    data: c.value,
                    options: f.value
                  }, null, 8, ["data", "options"])
                ])
              ])
            ])) : (g(), x("section", k_, [
              d("div", __, [
                d("div", w_, [
                  N(T(rt), { class: "empty-icon" })
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
}), $_ = /* @__PURE__ */ ve(C_, [["__scopeId", "data-v-ae26eabc"]]), S_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, M_ = { class: "card-body" }, D_ = {
  key: 0,
  class: "chart-section"
}, A_ = { class: "chart-container" }, T_ = {
  key: 1,
  class: "empty-state"
}, B_ = { class: "empty-state-content" }, L_ = { class: "empty-icon-wrapper" }, R_ = /* @__PURE__ */ ue({
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
      (f) => f.agent_type?.toLowerCase() !== "triage"
    ) : []), r = C(() => i.value.length > 0), l = C(() => i.value.reduce((f, m) => f + (m.conversations || 0), 0)), c = C(() => {
      const f = i.value;
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const m = f.map((b) => {
        const y = b.agent_type?.toLowerCase();
        return (s[y] || "#a78bfa") + "80";
      }), p = f.map((b) => {
        const y = b.agent_type?.toLowerCase();
        return s[y] || "#a78bfa";
      });
      return {
        labels: f.map((b) => {
          const y = b.conversations || 0, v = l.value ? y / l.value * 100 : 0;
          return `${St(b.agent_type)} - ${y.toLocaleString()} (${v.toFixed(1)}%)`;
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
              const m = (f.label || "").toString(), p = Number(f.parsed) || 0, h = (f.dataset.data || []).reduce((y, v) => y + (Number(v) || 0), 0), b = h ? p / h * 100 : 0;
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
        d("div", S_, [
          d("div", M_, [
            r.value ? (g(), x("section", D_, [
              d("div", A_, [
                N(Fn, {
                  data: c.value,
                  options: u.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (g(), x("section", T_, [
              d("div", B_, [
                d("div", L_, [
                  N(T(rt), { class: "empty-icon" })
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
}), P_ = /* @__PURE__ */ ve(R_, [["__scopeId", "data-v-a909b73c"]]), I_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, E_ = { class: "card-body" }, F_ = {
  key: 0,
  class: "chart-section"
}, O_ = { class: "chart-container" }, V_ = {
  key: 1,
  class: "empty-state"
}, z_ = { class: "empty-state-content" }, N_ = { class: "empty-icon-wrapper" }, j_ = /* @__PURE__ */ ue({
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
    }, i = C(() => {
      const c = a.costData?.daily_mean_cost_per_conversation || [];
      if (Array.isArray(c) && c.length > 0)
        return !0;
      const u = a.costData?.costs_by_day || {}, f = a.conversationData?.conversations_by_day || {};
      return Object.keys(u).length > 0 && Object.keys(f).length > 0;
    }), r = C(() => {
      const c = a.costData?.daily_mean_cost_per_conversation || [];
      if (c.length > 0) {
        const y = [...c].sort((v, k) => v.date.localeCompare(k.date));
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
      const u = a.costData?.costs_by_day || {}, f = a.conversationData?.conversations_by_day || {}, p = Object.keys(u).filter((y) => f[y]).sort();
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const h = p.map((y) => s(y)), b = p.map((y) => {
        const v = u[y]?.total_cost || 0, k = f[y] || 0;
        return k > 0 ? v / k : 0;
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
        d("div", I_, [
          d("div", E_, [
            i.value ? (g(), x("section", F_, [
              d("div", O_, [
                N(bt, {
                  data: r.value,
                  options: l.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (g(), x("section", V_, [
              d("div", z_, [
                d("div", N_, [
                  N(T(rt), { class: "empty-icon" })
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
}), H_ = /* @__PURE__ */ ve(j_, [["__scopeId", "data-v-ae6c48b1"]]), W_ = { class: "tabs text-sm" }, K_ = ["aria-label"], U_ = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], Y_ = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, q_ = /* @__PURE__ */ ue({
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
    const a = e, n = t, o = ne([]), s = `tabs-${We()}`, i = (h) => `${s}-tab-${h}`, r = C(
      () => a.items.map((h, b) => h.disabled ? -1 : b).filter((h) => h >= 0)
    );
    function l(h) {
      return h.value === a.modelValue;
    }
    function c(h) {
      const b = l(h), v = `${a.fullWidth ? "relative flex min-w-0 flex-1" : "relative inline-flex max-w-full shrink-0"} h-8 max-h-8 min-h-8 items-stretch cursor-pointer rounded-lg border border-transparent text-center outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100`;
      return h.disabled ? `${v} cursor-not-allowed opacity-40` : b ? `${v} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]` : `${v} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function u(h, b) {
      h === b || a.items.find((v) => v.value === h)?.disabled || (n("update:modelValue", h), n("change", { value: h, previousValue: b }));
    }
    function f(h, b) {
      n("tab-click", { value: h.value, originalEvent: b }), !h.disabled && (u(h.value, a.modelValue), Ke(() => {
        o.value[a.items.indexOf(h)]?.focus();
      }));
    }
    function m(h, b) {
      const y = a.items.length;
      if (y === 0) return 0;
      let v = h;
      for (let k = 0; k < y; k++)
        if (v = (v + b + y) % y, !a.items[v]?.disabled) return v;
      return h;
    }
    async function p(h, b) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(h.key)) return;
      h.preventDefault();
      let v = b;
      h.key === "ArrowLeft" ? v = m(b, -1) : h.key === "ArrowRight" ? v = m(b, 1) : h.key === "Home" ? v = r.value[0] ?? 0 : h.key === "End" && (v = r.value[r.value.length - 1] ?? b);
      const k = a.items[v];
      !k || k.disabled || (u(k.value, a.modelValue), await Ke(), o.value[v]?.focus());
    }
    return (h, b) => (g(), x("div", W_, [
      d("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: G([
          "box-border h-10 max-h-10 min-h-10 flex-wrap items-center gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 px-0.5 py-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          e.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (g(!0), x(de, null, pe(e.items, (y, v) => (g(), x("button", {
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
          class: G(c(y)),
          onClick: (k) => f(y, k),
          onKeydown: (k) => p(k, v)
        }, [
          d("span", {
            class: G(["tabs-tab__label flex min-h-0 min-w-0 items-center justify-center gap-2 px-3", { "min-w-0 flex-1": e.fullWidth }])
          }, [
            y.icon ? (g(), ae(ht(y.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : E("", !0),
            d("span", Y_, A(y.label), 1)
          ], 2)
        ], 42, U_))), 128))
      ], 10, K_),
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
      })) : E("", !0)
    ]));
  }
}), Lr = /* @__PURE__ */ ve(q_, [["__scopeId", "data-v-f9c367eb"]]), X_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, G_ = { class: "card-body" }, Z_ = {
  key: 0,
  class: "model-usage-table-block"
}, Q_ = { class: "w-full min-w-0" }, J_ = {
  key: 1,
  class: "empty-state"
}, e2 = { class: "empty-state-content" }, t2 = { class: "empty-icon-wrapper" }, a2 = /* @__PURE__ */ ue({
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
    ], l = ne("by_model"), c = C(() => l.value === "by_model" ? n.data?.total_by_model || {} : n.data?.total_by_provider || {}), u = C(() => [
      { key: "name", label: l.value === "by_model" ? "Model" : "Provider", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ]), f = C(
      () => Object.entries(c.value).map(([h, b]) => ({
        id: h,
        name: h,
        avgCost: p(b.avg_cost_per_message),
        avgTokens: m(b.avg_tokens_per_message),
        messageCount: m(b.message_count),
        totalCost: p(b.total_cost),
        totalTokens: m(b.total_tokens)
      }))
    ), m = (h) => h == null ? "0" : fe(h), p = (h) => h == null ? "$0.00" : Ie(h);
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
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: O(() => [
        d("div", X_, [
          d("div", G_, [
            N(Lr, {
              modelValue: l.value,
              "onUpdate:modelValue": b[0] || (b[0] = (y) => l.value = y),
              items: r,
              "aria-label": "Model Usage Tabs",
              "full-width": ""
            }, {
              default: O(() => [
                c.value && Object.keys(c.value).length > 0 ? (g(), x("div", Z_, [
                  d("div", Q_, [
                    N(gt, {
                      columns: u.value,
                      rows: f.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, null, 8, ["columns", "rows"])
                  ])
                ])) : (g(), x("div", J_, [
                  d("div", e2, [
                    d("div", t2, [
                      N(T(rt), { class: "empty-icon" })
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
}), n2 = /* @__PURE__ */ ve(a2, [["__scopeId", "data-v-48a6cc07"]]), o2 = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, s2 = { class: "card-body" }, i2 = {
  key: 0,
  class: "message-roles-table-block"
}, r2 = { class: "w-full min-w-0" }, l2 = {
  key: 1,
  class: "empty-state"
}, c2 = { class: "empty-state-content" }, d2 = { class: "empty-icon-wrapper" }, u2 = /* @__PURE__ */ ue({
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
    ], c = C(() => n.data?.total_by_role || {}), u = C(
      () => r.map((b) => ({
        id: b,
        role: h(b),
        avgCost: p(c.value[b]?.avg_cost_per_message),
        avgTokens: m(c.value[b]?.avg_tokens_per_message),
        messageCount: m(c.value[b]?.message_count),
        totalCost: p(c.value[b]?.total_cost),
        totalTokens: m(c.value[b]?.total_tokens)
      }))
    ), f = C(() => Object.keys(c.value).length > 0), m = (b) => b == null ? "0" : fe(b), p = (b) => b == null ? "$0.00" : Ie(b), h = (b) => b.charAt(0).toUpperCase() + b.slice(1);
    return t({ isDark: i }), (b, y) => (g(), ae(Se, {
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
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: O(() => [
        d("div", o2, [
          d("div", s2, [
            f.value ? (g(), x("div", i2, [
              d("div", r2, [
                N(gt, {
                  columns: l,
                  rows: u.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, null, 8, ["rows"])
              ])
            ])) : (g(), x("div", l2, [
              d("div", c2, [
                d("div", d2, [
                  N(T(rt), { class: "empty-icon" })
                ]),
                y[0] || (y[0] = d("p", { class: "empty-title" }, "No message role data available", -1)),
                y[1] || (y[1] = d("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), h2 = /* @__PURE__ */ ve(u2, [["__scopeId", "data-v-d38e854e"]]), f2 = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, g2 = { class: "card-body" }, m2 = {
  key: 0,
  class: "chart-section"
}, p2 = { class: "chart-container" }, b2 = { class: "kpi-grid" }, v2 = {
  key: 1,
  class: "empty-state"
}, y2 = { class: "empty-state-content" }, x2 = { class: "empty-icon-wrapper" }, k2 = 40, _2 = 230, w2 = /* @__PURE__ */ ue({
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
    const n = e, o = a, s = (w) => {
      o("export", w);
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
    }, c = (w) => w.agent_type || w.agent_id || w.agent_name || "", u = (w) => w.agent_name ? St(w.agent_name) : St(c(w)).split("_").map(($) => $.charAt(0).toUpperCase() + $.slice(1)).join(" ").replace(/V\d+$/, "").trim(), f = (w) => {
      const _ = c(w).toLowerCase();
      for (const [$, S] of Object.entries(l))
        if (_.includes($))
          return S;
      return "#9ca3af";
    }, m = C(() => [...n.data?.top_agents || []].sort((_, $) => $.avg_cost_per_conversation - _.avg_cost_per_conversation)), p = C(
      () => Math.max(_2, m.value.length * k2 + 32)
    ), h = C(() => n.data?.total_conversations !== void 0 ? Number(n.data.total_conversations) || 0 : m.value.reduce((w, _) => w + _.conversations, 0)), b = C(() => n.data?.total_cost !== void 0 ? Number(n.data.total_cost) || 0 : m.value.reduce((w, _) => w + _.total_cost, 0)), y = C(() => n.data?.overall_avg_cost_per_conversation !== void 0 ? Number(n.data.overall_avg_cost_per_conversation) || 0 : h.value === 0 ? 0 : b.value / h.value), v = C(() => {
      const w = m.value;
      if (w.length === 0)
        return { labels: [], datasets: [] };
      const _ = w.map((M) => u(M)), $ = w.map((M) => M.avg_cost_per_conversation), S = w.map((M) => f(M));
      return {
        labels: _,
        datasets: [
          {
            label: "USD per conversation",
            data: $,
            backgroundColor: S.map((M) => `${M}80`),
            borderColor: S,
            borderWidth: 1
          }
        ]
      };
    }), k = C(() => n.options ? n.options : {
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
            title: function(w) {
              const _ = m.value[w[0]?.dataIndex];
              return _ ? u(_) : "";
            },
            label: function(w) {
              const _ = m.value[w.dataIndex];
              return [
                `Cost: ${Ie(w.parsed.x)}`,
                `Conversations: ${fe(_.conversations)}`,
                `Total Cost: ${Ie(_.total_cost)}`
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
            callback: function(w) {
              return Ie(w);
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
    return t({ isDark: i }), (w, _) => (g(), ae(Se, {
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
        }, null, 8, ["loading"])) : E("", !0)
      ]),
      default: O(() => [
        d("div", f2, [
          d("div", g2, [
            v.value.labels && v.value.labels.length ? (g(), x("section", m2, [
              d("div", p2, [
                N(Mt, {
                  data: v.value,
                  options: k.value,
                  "height-px": p.value,
                  "category-label-max-length": 18
                }, null, 8, ["data", "options", "height-px"])
              ]),
              d("footer", b2, [
                N(T(xe), {
                  title: "Total Agents",
                  value: String(m.value.length)
                }, null, 8, ["value"]),
                N(T(xe), {
                  title: "Total Conversations",
                  value: T(fe)(h.value)
                }, null, 8, ["value"]),
                N(T(xe), {
                  title: "Total Cost",
                  value: T(Ie)(b.value)
                }, null, 8, ["value"]),
                N(T(xe), {
                  title: "Avg Cost / Conv.",
                  value: T(Ie)(y.value)
                }, null, 8, ["value"])
              ])
            ])) : (g(), x("section", v2, [
              d("div", y2, [
                d("div", x2, [
                  N(T(rt), { class: "empty-icon" })
                ]),
                _[0] || (_[0] = d("p", { class: "empty-title" }, "No cost per conversation data", -1)),
                _[1] || (_[1] = d("p", { class: "empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), C2 = /* @__PURE__ */ ve(w2, [["__scopeId", "data-v-2a8f51ca"]]);
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
const $2 = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, S2 = { class: "w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden" }, M2 = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, D2 = {
  key: 0,
  scope: "col",
  class: "w-14 bg-transparent px-4 py-3 text-center align-middle"
}, A2 = ["checked", "aria-label"], T2 = ["aria-sort", "onClick"], B2 = {
  class: "kiut-table-sort-icons inline-flex items-center",
  "aria-hidden": "true"
}, L2 = {
  key: 0,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, R2 = {
  key: 1,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, P2 = {
  key: 0,
  class: "kiut-table-body-cell w-12 bg-transparent pl-4 pr-0 py-0 text-center align-middle"
}, I2 = ["checked", "aria-label", "onChange"], E2 = ["aria-expanded", "aria-label", "onClick"], F2 = ["aria-expanded", "aria-label", "onClick"], O2 = {
  key: 1,
  class: "inline-block w-4 shrink-0",
  "aria-hidden": "true"
}, V2 = { class: "min-w-0 flex-1" }, z2 = /* @__PURE__ */ ue({
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
    const a = e, n = t, o = ne(null), s = ne([...a.defaultExpandedKeys]), i = C({
      get() {
        return a.expandedKeys ?? s.value;
      },
      set(L) {
        s.value = L, n("update:expandedKeys", L);
      }
    }), r = C(
      () => new Set(i.value)
    ), l = C(
      () => a.expandColumnKey ?? a.columns[0]?.key ?? ""
    ), c = C(() => ({
      childrenKey: a.childrenKey,
      expandedKeys: r.value,
      resolveRowKey: h,
      maxDepth: a.maxDepth
    })), u = C(() => {
      const { sortKey: L, sortDirection: Y, sortCompare: q, rows: F } = a;
      return !L || !Y || !q ? F : a.expandable ? Rr(F, {
        childrenKey: a.childrenKey,
        sortKey: L,
        sortDirection: Y,
        compare: q
      }) : [...F].sort((se, le) => q(se, le, L, Y));
    }), f = C(() => a.expandable ? Pr(u.value, c.value) : u.value.map((L, Y) => ({
      row: L,
      key: h(L, Y),
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
    function h(L, Y) {
      if (typeof a.rowKey == "function")
        return a.rowKey(L);
      const q = L[a.rowKey];
      return q != null ? String(q) : `__index_${Y}`;
    }
    function b(L, Y) {
      return L[Y];
    }
    function y(L) {
      return L == null || typeof L == "object" ? "" : String(L);
    }
    function v(L) {
      return a.expandable && L === l.value;
    }
    function k(L) {
      return L.hasChildren || (a.isRowExpandable?.(L.row) ?? !1);
    }
    function w(L, Y) {
      return {
        row: L.row,
        column: Y,
        value: b(L.row, Y.key),
        depth: L.depth,
        isChild: L.depth > 0,
        hasChildren: L.hasChildren,
        expanded: L.isExpanded
      };
    }
    function _(L) {
      if (!k(L)) return;
      const Y = new Set(i.value);
      Y.has(L.key) ? (Y.delete(L.key), n("collapse", L.key, L.row)) : (a.singleExpand && Y.clear(), Y.add(L.key), n("expand", L.key, L.row)), i.value = [...Y];
    }
    function $(L) {
      return {
        depth: L.depth,
        isChild: L.depth > 0,
        hasChildren: L.hasChildren
      };
    }
    function S(L, Y) {
      return a.isRowSelectable?.(L, Y) ?? !0;
    }
    function M(L) {
      return S(L.row, $(L));
    }
    function I(L) {
      return a.selectable && k(L) && !M(L);
    }
    function z(L) {
      return k(L) && !I(L);
    }
    function K(L) {
      return z(L) ? !1 : L.depth > 0 ? !0 : a.selectable && !k(L);
    }
    const D = C(() => {
      const { isRowSelectable: L } = a;
      return a.expandable ? Ir(u.value, {
        childrenKey: a.childrenKey,
        resolveRowKey: h,
        isRowSelectable: L
      }) : u.value.map((Y, q) => ({
        row: Y,
        key: h(Y, q),
        context: {
          depth: 0,
          isChild: !1,
          hasChildren: !1
        }
      })).filter(({ row: Y, context: q }) => S(Y, q)).map(({ key: Y }) => Y);
    });
    function P(L) {
      const Y = String(L);
      return a.selectedKeys.some((q) => String(q) === Y);
    }
    const B = C(() => !a.selectable || D.value.length === 0 ? !1 : D.value.every(
      (L) => a.selectedKeys.some((Y) => String(Y) === String(L))
    )), H = C(() => {
      if (!a.selectable || D.value.length === 0) return !1;
      const L = D.value.filter(
        (Y) => a.selectedKeys.some((q) => String(q) === String(Y))
      );
      return L.length > 0 && L.length < D.value.length;
    });
    Te(
      [H, B, () => a.selectable],
      async () => {
        await Ke();
        const L = o.value;
        L && (L.indeterminate = H.value && !B.value);
      },
      { immediate: !0 }
    );
    function j() {
      if (a.selectable)
        if (B.value) {
          const L = new Set(
            D.value.map((q) => String(q))
          ), Y = a.selectedKeys.filter(
            (q) => !L.has(String(q))
          );
          n("update:selectedKeys", Y);
        } else {
          const L = new Set(a.selectedKeys.map((Y) => String(Y)));
          D.value.forEach((Y) => L.add(String(Y))), n("update:selectedKeys", [...L]);
        }
    }
    function X(L) {
      if (!a.selectable) return;
      const Y = String(L), q = f.value.find((se) => String(se.key) === Y);
      if (q && !M(q) || !q && !D.value.some((se) => String(se) === Y))
        return;
      a.selectedKeys.some((se) => String(se) === Y) ? n(
        "update:selectedKeys",
        a.selectedKeys.filter((se) => String(se) !== Y)
      ) : n("update:selectedKeys", [...a.selectedKeys, Y]);
    }
    function re(L) {
      return `${a.ariaLabelSelectRow} ${L}`;
    }
    function he(L) {
      n("sort", L);
    }
    function Z(L) {
      return a.sortKey === L && a.sortDirection != null;
    }
    function oe(L) {
      return Z(L) ? a.sortDirection === "asc" ? "ascending" : "descending" : "none";
    }
    return (L, Y) => (g(), x("div", $2, [
      d("div", S2, [
        d("table", {
          class: G([
            "kiut-table w-full min-w-[640px] overflow-hidden border-collapse text-left text-sm",
            e.fixedLayout ? "table-fixed" : ""
          ])
        }, [
          d("thead", null, [
            d("tr", M2, [
              e.selectable ? (g(), x("th", D2, [
                d("input", {
                  ref_key: "selectAllRef",
                  ref: o,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: B.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: j
                }, null, 40, A2)
              ])) : E("", !0),
              (g(!0), x(de, null, pe(e.columns, (q) => (g(), x("th", {
                key: q.key,
                scope: "col",
                class: G([
                  "px-2 py-3 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]",
                  v(q.key) && e.selectable ? "!pl-0" : "",
                  p(q.align),
                  q.headerClass ?? ""
                ])
              }, [
                q.sortable ? (g(), x("button", {
                  key: 0,
                  type: "button",
                  class: G(["kiut-table-sort-btn inline-flex items-center gap-1", p(q.align)]),
                  "aria-sort": oe(q.key),
                  onClick: (F) => he(q.key)
                }, [
                  d("span", null, A(q.label), 1),
                  d("span", B2, [
                    Z(q.key) ? (g(), x(de, { key: 0 }, [
                      e.sortDirection === "asc" ? (g(), x("span", L2, "↑")) : e.sortDirection === "desc" ? (g(), x("span", R2, "↓")) : E("", !0)
                    ], 64)) : (g(), x(de, { key: 1 }, [
                      Y[0] || (Y[0] = d("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      Y[1] || (Y[1] = d("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, T2)) : (g(), x(de, { key: 1 }, [
                  Ae(A(q.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          d("tbody", null, [
            (g(!0), x(de, null, pe(f.value, (q) => (g(), x("tr", {
              key: q.key,
              class: G([
                "kiut-table-body-row border-b border-[#e5e7eb] last:border-b-0 bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]",
                q.depth > 0 ? "kiut-table-row--child dark:bg-[#1a1a22]" : ""
              ])
            }, [
              e.selectable ? (g(), x("td", P2, [
                M(q) ? (g(), x("input", {
                  key: 0,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: P(q.key),
                  "aria-label": re(q.key),
                  onChange: (F) => X(q.key)
                }, null, 40, I2)) : I(q) ? (g(), x("button", {
                  key: 1,
                  type: "button",
                  class: "kiut-table-expand-btn shrink-0",
                  "aria-expanded": q.isExpanded,
                  "aria-label": q.isExpanded ? e.ariaLabelCollapseRow : e.ariaLabelExpandRow,
                  onClick: Be((F) => _(q), ["stop"])
                }, [
                  N(T(ta), {
                    class: G(["h-5 w-5 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !q.isExpanded }]),
                    "aria-hidden": "true"
                  }, null, 8, ["class"])
                ], 8, E2)) : E("", !0)
              ])) : E("", !0),
              (g(!0), x(de, null, pe(e.columns, (F) => (g(), x("td", {
                key: F.key,
                class: G([
                  "kiut-table-body-cell bg-transparent py-0 align-middle text-[color:var(--kiut-text-secondary)]",
                  v(F.key) ? "pl-0 pr-2" : "px-2",
                  p(F.align),
                  F.cellClass ?? ""
                ])
              }, [
                v(F.key) ? (g(), x("div", {
                  key: 0,
                  class: "flex min-w-0 items-start gap-1",
                  style: we({ paddingLeft: `${q.depth * 1.25}rem` })
                }, [
                  ke(L.$slots, "row-expand", {
                    row: q.row,
                    expanded: q.isExpanded,
                    hasChildren: q.hasChildren,
                    depth: q.depth,
                    toggle: () => _(q)
                  }, () => [
                    z(q) ? (g(), x("button", {
                      key: 0,
                      type: "button",
                      class: "kiut-table-expand-btn shrink-0",
                      "aria-expanded": q.isExpanded,
                      "aria-label": q.isExpanded ? e.ariaLabelCollapseRow : e.ariaLabelExpandRow,
                      onClick: Be((se) => _(q), ["stop"])
                    }, [
                      N(T(ta), {
                        class: G(["h-5 w-5 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !q.isExpanded }]),
                        "aria-hidden": "true"
                      }, null, 8, ["class"])
                    ], 8, F2)) : K(q) ? (g(), x("span", O2)) : E("", !0)
                  ], !0),
                  d("div", V2, [
                    ke(L.$slots, m(F.key), yt({ ref_for: !0 }, w(q, F)), () => [
                      Ae(A(y(b(q.row, F.key))), 1)
                    ], !0)
                  ])
                ], 4)) : ke(L.$slots, m(F.key), yt({
                  key: 1,
                  ref_for: !0
                }, w(q, F)), () => [
                  Ae(A(y(b(q.row, F.key))), 1)
                ], !0)
              ], 2))), 128))
            ], 2))), 128))
          ])
        ], 2)
      ])
    ]));
  }
}), N2 = /* @__PURE__ */ ve(z2, [["__scopeId", "data-v-b3104817"]]), pi = /* @__PURE__ */ ue({
  name: "ButtonLoadingSpinner",
  __name: "ButtonLoadingSpinner",
  props: {
    compact: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, a = C(
      () => t.compact ? "size-4" : "h-[1.125rem] w-[1.125rem]"
    );
    return (n, o) => (g(), x("svg", {
      class: G(["inline-flex shrink-0 animate-spin", a.value]),
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
}), j2 = ["disabled", "aria-expanded", "aria-label"], H2 = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]",
  "aria-hidden": "true"
}, W2 = { class: "min-w-0 truncate" }, K2 = ["disabled", "onClick", "onMouseenter"], U2 = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, Y2 = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, q2 = { class: "min-w-0 flex-1 text-left" }, X2 = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, G2 = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Z2 = ["disabled", "aria-expanded", "aria-label"], Q2 = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:size-4",
  "aria-hidden": "true"
}, J2 = ["disabled", "onClick", "onMouseenter"], ew = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, tw = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, aw = { class: "min-w-0 flex-1 text-left" }, nw = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, ow = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, sw = {
  key: 2,
  class: "group relative inline-flex shrink-0"
}, iw = ["type", "disabled", "aria-busy", "aria-label"], rw = {
  key: 2,
  class: "min-w-0 truncate"
}, lw = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, cw = ["type", "disabled", "aria-busy", "aria-label"], dw = {
  key: 2,
  class: "min-w-0 truncate"
}, $t = /* @__PURE__ */ ue({
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
    const a = e, n = t, o = Ja(), s = C(
      () => !!a.tooltip?.trim() && a.variant !== "dropdown" && a.variant !== "split"
    ), i = C(() => a.variant === "dropdown"), r = C(() => a.variant === "split"), l = C(() => a.variant === "action"), c = C(() => !l.value && !r.value), u = C(() => a.disabled || a.loading), f = C(
      () => a.loading ? "cursor-wait disabled:pointer-events-none" : "disabled:pointer-events-none disabled:opacity-45"
    ), m = C(() => {
      const L = o["aria-label"];
      if (typeof L == "string" && L.length > 0) return L;
      if ((l.value || r.value) && a.tooltip?.trim()) return a.tooltip.trim();
    }), p = C(() => {
      const L = o.type;
      return L === "submit" || L === "reset" || L === "button" ? L : "button";
    }), h = C(() => {
      const { class: L, type: Y, "aria-label": q, ...F } = o;
      return F;
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
    ]), y = `kiut-button-menu-${We()}`, v = `${y}-btn`, k = `${y}-menu`, w = ne(null), _ = ne(null), $ = ne(null), S = ne(!1), M = ne(0), I = ne({}), z = C(() => a.options.filter((L) => !L.disabled));
    function K(L) {
      return `${L.value}-${L.label}`;
    }
    function D() {
      const L = _.value;
      if (!L) return;
      const Y = L.getBoundingClientRect(), q = {
        top: `${Y.bottom - 3}px`,
        minWidth: `max(${Y.width}px, ${a.menuMinWidth})`
      };
      a.menuAlign === "right" ? (q.right = `${window.innerWidth - Y.right}px`, q.left = "auto") : (q.left = `${Y.left}px`, q.right = "auto"), I.value = q;
    }
    function P(L) {
      return [
        "mx-1 flex w-full cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 text-left outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-45",
        M.value === L ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function B() {
      S.value = !1;
    }
    function H() {
      D(), M.value = 0, Ke(() => $.value?.focus());
    }
    function j() {
      if (!a.disabled) {
        if (S.value) {
          B();
          return;
        }
        S.value = !0, H();
      }
    }
    function X(L) {
      L.disabled || (n("select", L), B());
    }
    function re(L) {
      L.stopPropagation(), j();
    }
    function he(L) {
      if (!S.value) return;
      const Y = L.target, q = w.value, F = $.value;
      q && !q.contains(Y) && (!F || !F.contains(Y)) && B();
    }
    function Z(L) {
      a.disabled || (L.key === "ArrowDown" || L.key === "Enter" || L.key === " ") && (L.preventDefault(), S.value || (S.value = !0, H()));
    }
    function oe(L) {
      const Y = z.value;
      if (L.key === "Escape") {
        L.preventDefault(), B(), _.value?.focus();
        return;
      }
      if (Y.length !== 0) {
        if (L.key === "ArrowDown") {
          L.preventDefault(), M.value = Math.min(M.value + 1, Y.length - 1);
          return;
        }
        if (L.key === "ArrowUp") {
          L.preventDefault(), M.value = Math.max(M.value - 1, 0);
          return;
        }
        if (L.key === "Enter" || L.key === " ") {
          L.preventDefault();
          const q = Y[M.value];
          q && X(q);
        }
      }
    }
    return Je(() => {
      document.addEventListener("click", he);
    }), it(() => {
      document.removeEventListener("click", he);
    }), (L, Y) => i.value ? (g(), x("div", {
      key: 0,
      ref_key: "rootRef",
      ref: w,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      d("button", yt({
        ref_key: "buttonRef",
        ref: _,
        id: v,
        type: "button",
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [b.value, T(o).class]],
        disabled: e.disabled,
        "aria-expanded": S.value,
        "aria-haspopup": "menu",
        "aria-controls": k,
        "aria-label": m.value
      }, h.value, {
        onClick: re,
        onKeydown: Z
      }), [
        L.$slots.icon ? (g(), x("span", H2, [
          ke(L.$slots, "icon")
        ])) : E("", !0),
        d("span", W2, [
          ke(L.$slots, "default")
        ]),
        N(T(ta), {
          class: G(["h-[1.125rem] w-[1.125rem] shrink-0 transition-transform", S.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 16, j2),
      (g(), ae(Qt, { to: "body" }, [
        Xe(d("div", {
          ref_key: "panelRef",
          ref: $,
          id: k,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: we(I.value),
          onKeydown: Be(oe, ["stop"])
        }, [
          (g(!0), x(de, null, pe(z.value, (q, F) => (g(), x("button", {
            key: K(q),
            type: "button",
            role: "menuitem",
            disabled: q.disabled,
            class: G(P(F)),
            onClick: Be((se) => X(q), ["stop"]),
            onMouseenter: (se) => M.value = F
          }, [
            q.icon ? (g(), x("span", U2, [
              (g(), ae(ht(q.icon), { class: "h-5 w-5" }))
            ])) : (g(), x("span", Y2)),
            d("span", q2, [
              d("span", X2, A(q.label), 1),
              q.description ? (g(), x("span", G2, A(q.description), 1)) : E("", !0)
            ])
          ], 42, K2))), 128))
        ], 36), [
          [Ht, S.value]
        ])
      ]))
    ], 512)) : r.value ? (g(), x("div", {
      key: 1,
      ref_key: "rootRef",
      ref: w,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      d("button", yt({
        ref_key: "buttonRef",
        ref: _,
        type: "button",
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [b.value, T(o).class]],
        disabled: e.disabled,
        "aria-expanded": S.value,
        "aria-haspopup": "menu",
        "aria-controls": k,
        "aria-label": m.value
      }, h.value, {
        onClick: re,
        onKeydown: Z
      }), [
        L.$slots.icon ? (g(), x("span", Q2, [
          ke(L.$slots, "icon")
        ])) : E("", !0)
      ], 16, Z2),
      (g(), ae(Qt, { to: "body" }, [
        Xe(d("div", {
          ref_key: "panelRef",
          ref: $,
          id: k,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: we(I.value),
          onKeydown: Be(oe, ["stop"])
        }, [
          (g(!0), x(de, null, pe(z.value, (q, F) => (g(), x("button", {
            key: K(q),
            type: "button",
            role: "menuitem",
            disabled: q.disabled,
            class: G(P(F)),
            onClick: Be((se) => X(q), ["stop"]),
            onMouseenter: (se) => M.value = F
          }, [
            q.icon ? (g(), x("span", ew, [
              (g(), ae(ht(q.icon), { class: "h-5 w-5" }))
            ])) : (g(), x("span", tw)),
            d("span", aw, [
              d("span", nw, A(q.label), 1),
              q.description ? (g(), x("span", ow, A(q.description), 1)) : E("", !0)
            ])
          ], 42, J2))), 128))
        ], 36), [
          [Ht, S.value]
        ])
      ]))
    ], 512)) : s.value ? (g(), x("span", sw, [
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
          class: G(["inline-flex shrink-0", l.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          ke(L.$slots, "icon")
        ], 2)) : E("", !0),
        c.value ? (g(), x("span", rw, [
          ke(L.$slots, "default")
        ])) : E("", !0)
      ], 16, iw),
      d("span", lw, A(e.tooltip), 1)
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
        class: G(["inline-flex shrink-0", l.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        ke(L.$slots, "icon")
      ], 2)) : E("", !0),
      c.value ? (g(), x("span", dw, [
        ke(L.$slots, "default")
      ])) : E("", !0)
    ], 16, cw));
  }
}), uw = ["id", "data-kiut-toggle-size", "aria-checked", "aria-disabled", "disabled", "onKeydown"], hw = { class: "sr-only" }, Er = /* @__PURE__ */ ue({
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
      class: G([
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
        class: G(["pointer-events-none inline-block translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", [
          e.size === "sm" ? "h-5 w-5" : "h-7 w-7",
          e.modelValue ? e.size === "sm" ? "translate-x-5" : "translate-x-7" : "translate-x-0"
        ]]),
        "aria-hidden": "true"
      }, null, 2),
      d("span", hw, A(e.ariaLabel), 1)
    ], 42, uw));
  }
}), fw = {
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
}, gw = [
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
], FM = [
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
], mw = { class: "kiut-table-versions-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, pw = { class: "w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden" }, bw = { class: "kiut-table-versions w-full min-w-[640px] table-fixed border-collapse text-left text-sm" }, vw = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, yw = { class: "h-14 border-b border-[#e5e7eb] bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]" }, xw = {
  key: 0,
  class: "flex min-w-0 items-center gap-1.5"
}, kw = ["aria-expanded", "aria-label", "onClick"], _w = { class: "min-w-0 flex-1" }, ww = {
  key: 0,
  class: "border-b border-[#e5e7eb] bg-[#f9fafb] dark:border-[color:var(--kiut-border-light)] dark:bg-[#1a1a22]"
}, Cw = ["colspan"], $w = { class: "mb-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-muted)]" }, Sw = ["aria-label"], Mw = {
  key: 1,
  class: "text-sm text-[color:var(--kiut-text-muted)]"
}, Dw = {
  key: 2,
  class: "space-y-2"
}, Aw = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)]" }, Tw = ["title"], Bw = { class: "whitespace-nowrap text-xs text-[color:var(--kiut-text-muted)]" }, Lw = { class: "ml-auto flex shrink-0 items-center gap-2" }, Rw = /* @__PURE__ */ ue({
  name: "TableVersions",
  __name: "TableVersions",
  props: {
    rows: { default: () => [] },
    columns: { default: () => gw },
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
    const a = e, n = t, o = ne([...a.defaultExpandedKeys]), s = C({
      get() {
        return a.expandedKeys ?? o.value;
      },
      set(D) {
        o.value = D, n("update:expandedKeys", D);
      }
    }), i = C(() => ({
      ...fw,
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
    function c(D) {
      return `cell-${D}`;
    }
    function u(D, P, B) {
      return {
        row: D,
        column: P,
        index: B,
        expanded: b(D, B)
      };
    }
    function f(D) {
      const P = D.key;
      return D.label ? D.label : P in i.value ? i.value[P] : D.key;
    }
    function m(D) {
      return D === "center" ? "text-center" : D === "right" ? "text-right" : "text-left";
    }
    function p(D) {
      return D === r.value;
    }
    function h(D, P) {
      if (typeof a.rowKey == "function")
        return a.rowKey(D);
      const B = D[a.rowKey];
      return B != null ? String(B) : `__index_${P}`;
    }
    function b(D, P) {
      return s.value.includes(h(D, P));
    }
    function y(D) {
      return D.versionsLoading === !0;
    }
    function v(D, P) {
      const B = h(D, P), H = new Set(s.value);
      H.has(B) ? (H.delete(B), n("collapse", B, D)) : (a.singleExpand && H.clear(), H.add(B), n("expand", B, D)), s.value = [...H];
    }
    function k(D) {
      return D.type ?? D.key;
    }
    function w(D) {
      return l[D] ?? "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300";
    }
    function _(D) {
      return D === "published" ? "success" : "warning";
    }
    function $(D) {
      const P = D instanceof Date ? D : new Date(D);
      return Number.isNaN(P.getTime()) ? String(D) : P.toLocaleDateString("es-ES");
    }
    function S(D) {
      const P = D instanceof Date ? D : new Date(D);
      return Number.isNaN(P.getTime()) ? String(D) : P.toLocaleString("es-ES");
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
    function I(D) {
      return D.method ? je(
        "span",
        {
          class: [
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
            w(D.method)
          ]
        },
        D.method
      ) : null;
    }
    function z(D, P) {
      const B = P.actions ?? ["view", "edit"], H = [];
      for (const j of B)
        j === "view" ? H.push(
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
        ) : j === "run" ? H.push(
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
        ) : j === "edit" ? H.push(
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
        ) : j === "createDraft" ? H.push(
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
        ) : j === "delete" && H.push(
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
        H
      );
    }
    function K(D, P, B) {
      switch (k(P)) {
        case "name":
          return M(D);
        case "method":
          return I(D);
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
            { color: _(D.status), outlined: !1 },
            () => D.status
          );
        case "version":
          return je("span", {}, D.version);
        case "updated":
          return je(
            "span",
            { class: "whitespace-nowrap text-xs" },
            $(D.updatedAt)
          );
        case "active":
          return je(Er, {
            modelValue: D.active ?? !1,
            ariaLabel: i.value.toggleActive,
            "onUpdate:modelValue": (j) => n("toggleActive", D, j)
          });
        case "actions":
          return z(D, P);
        default:
          return je("span", {}, String(D[P.key] ?? ""));
      }
    }
    return (D, P) => (g(), x("div", mw, [
      d("div", pw, [
        d("table", bw, [
          d("thead", null, [
            d("tr", vw, [
              (g(!0), x(de, null, pe(e.columns, (B) => (g(), x("th", {
                key: B.key,
                scope: "col",
                class: G([
                  "px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-table-header)]",
                  m(B.align),
                  B.headerClass ?? ""
                ])
              }, A(f(B)), 3))), 128))
            ])
          ]),
          d("tbody", null, [
            (g(!0), x(de, null, pe(e.rows, (B, H) => (g(), x(de, {
              key: h(B, H)
            }, [
              d("tr", yw, [
                (g(!0), x(de, null, pe(e.columns, (j) => (g(), x("td", {
                  key: j.key,
                  class: G([
                    "px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]",
                    m(j.align),
                    j.cellClass ?? ""
                  ])
                }, [
                  ke(D.$slots, c(j.key), yt({ ref_for: !0 }, u(B, j, H)), () => [
                    p(j.key) ? (g(), x("div", xw, [
                      d("button", {
                        type: "button",
                        class: "kiut-table-versions-expand-btn shrink-0",
                        "aria-expanded": b(B, H),
                        "aria-label": b(B, H) ? i.value.collapseRow : i.value.expandRow,
                        onClick: (X) => v(B, H)
                      }, [
                        N(T(ta), {
                          class: G(["h-4 w-4 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !b(B, H) }]),
                          "aria-hidden": "true"
                        }, null, 8, ["class"])
                      ], 8, kw),
                      d("div", _w, [
                        (g(), ae(ht(() => K(B, j))))
                      ])
                    ])) : (g(), ae(ht(() => K(B, j)), { key: 1 }))
                  ], !0)
                ], 2))), 128))
              ]),
              b(B, H) ? (g(), x("tr", ww, [
                d("td", {
                  colspan: e.columns.length,
                  class: "py-3 px-4"
                }, [
                  d("h4", $w, A(i.value.historialTitle), 1),
                  y(B) ? (g(), x("div", {
                    key: 0,
                    class: "space-y-2",
                    role: "status",
                    "aria-busy": "true",
                    "aria-label": i.value.loadingHistory
                  }, [
                    (g(!0), x(de, null, pe(e.historySkeletonCount, (j) => (g(), x("div", {
                      key: j,
                      class: "flex flex-wrap items-center gap-3 rounded-lg border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] px-4 py-3 dark:border-[color:var(--kiut-border-light)]",
                      "aria-hidden": "true"
                    }, [...P[0] || (P[0] = [
                      eo('<div class="kiut-table-versions-skeleton h-5 w-16 rounded-full" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 w-8" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 w-14 rounded-full" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 min-w-[8rem] flex-1" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 w-28" data-v-177ecafb></div>', 5)
                    ])]))), 128))
                  ], 8, Sw)) : B.versions?.length ? (g(), x("div", Dw, [
                    (g(!0), x(de, null, pe(B.versions, (j) => (g(), x("div", {
                      key: j.id,
                      class: "flex flex-wrap items-center gap-3 rounded-lg border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] px-4 py-3 dark:border-[color:var(--kiut-border-light)]"
                    }, [
                      ke(D.$slots, "history-item", {
                        version: j,
                        row: B
                      }, () => [
                        N(Ge, {
                          color: "neutral",
                          outlined: ""
                        }, {
                          default: O(() => [
                            Ae(A(j.status), 1)
                          ]),
                          _: 2
                        }, 1024),
                        d("span", Aw, A(j.version), 1),
                        j.method ? (g(), x("span", {
                          key: 0,
                          class: G(["inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold", w(j.method)])
                        }, A(j.method), 3)) : E("", !0),
                        j.url ? (g(), x("span", {
                          key: 1,
                          class: "min-w-0 flex-1 truncate font-mono text-xs text-[color:var(--kiut-text-secondary)]",
                          title: j.url
                        }, A(j.url), 9, Tw)) : E("", !0),
                        d("span", Bw, A(S(j.updatedAt)), 1)
                      ], !0),
                      d("div", Lw, [
                        ke(D.$slots, "history-actions", {
                          version: j,
                          row: B
                        }, () => [
                          N($t, {
                            variant: "secondary",
                            class: "!min-h-8 !px-3 !py-1.5 !text-xs",
                            onClick: (X) => n("viewVersion", j, B)
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
                            onClick: (X) => n("createDraftFromVersion", j, B)
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
                  ])) : (g(), x("p", Mw, A(i.value.emptyHistory), 1))
                ], 8, Cw)
              ])) : E("", !0)
            ], 64))), 128))
          ])
        ])
      ])
    ]));
  }
}), Pw = /* @__PURE__ */ ve(Rw, [["__scopeId", "data-v-177ecafb"]]);
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
function Iw(e, t) {
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
function Ew(e, t) {
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
function Fw(e, t) {
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
function Ow(e, t) {
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
function Vw(e, t) {
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
      d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z",
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
    d("path", { d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" })
  ]);
}
const jw = ["aria-label"], Hw = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, Ww = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, Kw = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, Uw = ["aria-label", "aria-expanded", "aria-controls", "onClick"], Yw = { class: "truncate" }, qw = {
  key: 0,
  class: "ml-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--kiut-primary)]/20 px-1 text-[10px] font-semibold tabular-nums text-[color:var(--kiut-primary-default)] dark:bg-[color:var(--kiut-primary)]/25 dark:text-[color:var(--kiut-primary-light)]"
}, Xw = {
  key: 0,
  class: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5"
}, Gw = { class: "flex min-w-0 flex-wrap items-center gap-1.5" }, Zw = ["aria-label", "onClick"], Qw = ["aria-label", "onClick"], Jw = ["aria-label"], e5 = ["aria-label"], t5 = {
  key: 1,
  class: "space-y-2"
}, a5 = ["for"], n5 = ["id", "placeholder", "onKeydown"], o5 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, s5 = ["aria-label"], i5 = { class: "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] transition hover:bg-black/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.06]" }, r5 = ["checked", "onChange"], l5 = { class: "min-w-0 flex-1" }, c5 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, d5 = { class: "flex flex-wrap items-end gap-2" }, u5 = { class: "min-w-[120px] flex-1" }, h5 = ["for"], f5 = ["id"], g5 = { class: "min-w-[120px] flex-1" }, m5 = ["for"], p5 = ["id"], b5 = /* @__PURE__ */ ue({
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
    const a = e, n = t, o = ho(), i = `${`kiut-filters-${We()}`}-panel`, r = ne(null), l = /* @__PURE__ */ new Map(), c = ne(null), u = ne(!1), f = ne({}), m = ne(null), p = ne(""), h = ne([]), b = ne(""), y = ne(""), v = C(() => c.value ? a.filterDefinitions.find((V) => V.id === c.value) ?? null : null), k = C(() => {
      const V = v.value;
      if (V)
        return V.type === "text" ? p.value : V.type === "select" ? h.value : { start: b.value, end: y.value };
    });
    function w(V, te) {
      te && te instanceof HTMLElement ? l.set(V, te) : l.delete(V);
    }
    function _(V) {
      return a.modelValue[V];
    }
    function $(V) {
      if (V == null) return [];
      if (Array.isArray(V))
        return V.filter((te) => typeof te == "string" && te.trim() !== "");
      if (typeof V == "string") {
        const te = V.trim();
        return te ? [te] : [];
      }
      return [];
    }
    function S(V, te) {
      if (te == null) return !0;
      if (V.type === "text") return String(te).trim() === "";
      if (V.type === "select") return $(te).length === 0;
      if (V.type === "dateRange") {
        const ce = te;
        return !ce?.start?.trim() || !ce?.end?.trim();
      }
      return !0;
    }
    const M = C(
      () => a.filterDefinitions.some((V) => !S(V, _(V.id)))
    ), I = C(() => {
      const V = [];
      for (const te of a.filterDefinitions) {
        const ce = _(te.id);
        if (!S(te, ce)) {
          if (te.type === "text")
            V.push({ kind: "text", def: te, key: te.id });
          else if (te.type === "dateRange")
            V.push({ kind: "dateRange", def: te, key: te.id });
          else if (te.type === "select")
            for (const me of $(ce))
              V.push({
                kind: "select",
                def: te,
                optionValue: me,
                key: `${te.id}::${me}`
              });
        }
      }
      return V;
    });
    function z(V) {
      return V.type !== "select" ? 0 : $(_(V.id)).length;
    }
    function K(V) {
      const te = _(V.id), ce = V.label.replace(/^\+\s*/, "");
      if (V.type === "text") return `${ce}: ${String(te ?? "").trim()}`;
      if (V.type === "select") {
        const Pe = $(te).map((qe) => V.options.find((pa) => pa.value === qe)?.label ?? qe);
        return `${ce}: ${Pe.join(", ")}`;
      }
      const me = te, Ce = P(me.start), _e = P(me.end);
      return `${ce}: ${Ce} – ${_e}`;
    }
    function D(V) {
      return V.kind === "text" || V.kind === "dateRange" ? K(V.def) : V.def.options.find((ce) => ce.value === V.optionValue)?.label ?? V.optionValue;
    }
    function P(V) {
      if (!V) return "";
      const te = He(V, "YYYY-MM-DD", !0);
      return te.isValid() ? te.format("L") : V;
    }
    function B(V) {
      const te = c.value === V.id && u.value, ce = !S(V, _(V.id));
      return te || ce ? "border border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border border-dashed border-[#838395] text-[color:var(--kiut-text-secondary)] hover:border-[#838395] hover:bg-slate-50 dark:border-[#838395] dark:text-slate-400 dark:hover:border-[#838395] dark:hover:bg-white/[0.04]";
    }
    function H(V) {
      return S(V, _(V.id)) ? Q(V) : `Editar filtro ${V.label.replace(/^\+\s*/, "")}`;
    }
    function j(V) {
      const te = _(V.id);
      if (V.type === "text") {
        p.value = te != null ? String(te) : "";
        return;
      }
      if (V.type === "select") {
        h.value = [...$(te)];
        return;
      }
      const ce = te;
      b.value = ce?.start?.trim() ?? "", y.value = ce?.end?.trim() ?? "";
    }
    function X() {
      const V = v.value;
      if (!V || V.type !== "select") return;
      const te = { ...a.modelValue };
      h.value.length === 0 ? delete te[V.id] : te[V.id] = [...h.value], n("update:modelValue", te), n("change", te);
    }
    function re(V) {
      const te = h.value.indexOf(V);
      te >= 0 ? h.value = h.value.filter((ce, me) => me !== te) : h.value = [...h.value, V], X();
    }
    function he(V) {
      if (!V) return;
      m.value = V;
      const te = V.getBoundingClientRect(), ce = 300;
      let me = te.left;
      const Ce = window.innerWidth - ce - 12;
      me > Ce && (me = Math.max(12, Ce)), me < 12 && (me = 12);
      const _e = te.bottom + 8;
      f.value = {
        top: `${_e}px`,
        left: `${me}px`,
        width: `${Math.min(ce, window.innerWidth - 24)}px`
      };
    }
    function Z(V, te) {
      if (c.value === V.id && u.value) {
        F();
        return;
      }
      u.value && c.value !== V.id && F(), c.value = V.id, u.value = !0, j(V), Ke().then(async () => {
        he(te.currentTarget), await Ke(), L();
      });
    }
    function oe(V, te) {
      if (c.value === V.id && u.value) {
        F();
        return;
      }
      u.value && c.value !== V.id && F(), c.value = V.id, u.value = !0, j(V), Ke().then(async () => {
        const ce = l.get(V.id) ?? te.currentTarget;
        he(ce), await Ke(), L();
      });
    }
    function L() {
      const V = r.value;
      if (!V) return;
      V.querySelector(
        'input[type="text"], input[type="date"], input[type="checkbox"], select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function Y() {
      u.value = !1, c.value = null, m.value = null;
    }
    function q(V) {
      const te = v.value;
      if (!te) return;
      if (te.type === "text") {
        p.value = V != null ? String(V) : "";
        return;
      }
      if (te.type === "select") {
        h.value = Array.isArray(V) ? V.filter((me) => typeof me == "string") : $(V);
        return;
      }
      const ce = V;
      b.value = ce?.start?.trim() ?? "", y.value = ce?.end?.trim() ?? "";
    }
    function F() {
      const V = v.value;
      if (!V) return;
      if (V.type === "text") {
        const Ce = p.value.trim(), _e = { ...a.modelValue };
        Ce === "" ? delete _e[V.id] : _e[V.id] = Ce, n("update:modelValue", _e), n("change", _e), Y();
        return;
      }
      if (V.type === "select") {
        X(), Y();
        return;
      }
      const te = b.value.trim(), ce = y.value.trim(), me = { ...a.modelValue };
      !te || !ce || te > ce ? delete me[V.id] : me[V.id] = { start: te, end: ce }, n("update:modelValue", me), n("change", me), Y();
    }
    function se(V) {
      const te = { ...a.modelValue };
      delete te[V], n("update:modelValue", te), n("change", te), c.value === V && Y();
    }
    function le(V) {
      if (V.kind === "text" || V.kind === "dateRange") {
        se(V.def.id);
        return;
      }
      const te = { ...a.modelValue }, me = $(te[V.def.id]).filter((Ce) => Ce !== V.optionValue);
      me.length === 0 ? delete te[V.def.id] : te[V.def.id] = me, n("update:modelValue", te), n("change", te), c.value === V.def.id && j(V.def);
    }
    function J() {
      const V = {};
      n("update:modelValue", V), n("change", V), Y();
    }
    const R = C(() => {
      const V = v.value;
      return V ? `Editar filtro: ${V.label}` : "Filtro";
    });
    function W(V) {
      const te = V.def.label.replace(/^\+\s*/, "");
      return V.kind === "select" ? `Quitar ${V.def.options.find((Ce) => Ce.value === V.optionValue)?.label ?? V.optionValue} del filtro ${te}` : `Quitar filtro ${te}`;
    }
    function ie(V) {
      const te = V.def.label.replace(/^\+\s*/, "");
      if (V.kind === "select") {
        const me = V.def.options.find((Ce) => Ce.value === V.optionValue)?.label ?? V.optionValue;
        return `Editar filtro ${te}: ${me}`;
      }
      return `Editar filtro ${te}`;
    }
    function Q(V) {
      return `Añadir filtro ${V.label.replace(/^\+\s*/, "")}`;
    }
    const U = C(() => a.clearLabel);
    function ee(V) {
      if (!u.value || !r.value) return;
      const te = V.target;
      if (!(r.value.contains(te) || (te instanceof Element ? te : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const me of l.values())
          if (me?.contains(te)) return;
        F();
      }
    }
    function ge(V) {
      V.key === "Escape" && u.value && (V.preventDefault(), Y());
    }
    function be() {
      !u.value || !m.value || he(m.value);
    }
    return Je(() => {
      document.addEventListener("mousedown", ee, !0), window.addEventListener("keydown", ge, !0), window.addEventListener("resize", be);
    }), _i(() => {
      document.removeEventListener("mousedown", ee, !0), window.removeEventListener("keydown", ge, !0), window.removeEventListener("resize", be);
    }), Te(
      () => a.modelValue,
      () => {
        const V = v.value;
        V && u.value && !o.panel && j(V);
      },
      { deep: !0 }
    ), (V, te) => (g(), x("div", {
      class: "kiut-filters font-[Inter] text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      d("div", Hw, [
        d("span", Ww, A(e.label), 1),
        d("div", Kw, [
          (g(!0), x(de, null, pe(e.filterDefinitions, (ce) => (g(), x("button", {
            key: `pill-${ce.id}`,
            ref_for: !0,
            ref: (me) => w(ce.id, me),
            type: "button",
            class: G(["inline-flex h-[26px] max-w-full shrink-0 items-center gap-0.5 rounded-full px-2 font-medium transition-colors", B(ce)]),
            "aria-label": H(ce),
            "aria-expanded": c.value === ce.id,
            "aria-haspopup": !0,
            "aria-controls": c.value === ce.id ? i : void 0,
            onClick: (me) => oe(ce, me)
          }, [
            N(T(Ow), {
              class: "h-2.5 w-2.5 shrink-0",
              "aria-hidden": "true"
            }),
            d("span", Yw, A(ce.label), 1),
            ce.type === "select" && z(ce) > 0 ? (g(), x("span", qw, A(z(ce)), 1)) : E("", !0)
          ], 10, Uw))), 128))
        ])
      ]),
      M.value ? (g(), x("div", Xw, [
        d("div", Gw, [
          (g(!0), x(de, null, pe(I.value, (ce) => (g(), x("div", {
            key: ce.key,
            "data-kiut-filter-chip": "",
            class: "inline-flex h-[26px] max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            d("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": ie(ce),
              onClick: (me) => Z(ce.def, me)
            }, [
              ke(V.$slots, "formatChip", {
                filter: ce.def,
                value: _(ce.def.id),
                optionValue: ce.kind === "select" ? ce.optionValue : void 0
              }, () => [
                Ae(A(D(ce)), 1)
              ], !0)
            ], 8, Zw),
            d("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": W(ce),
              onClick: (me) => le(ce)
            }, [
              N(T(Nw), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, Qw)
          ]))), 128))
        ]),
        d("button", {
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": U.value,
          onClick: J
        }, A(e.clearLabel), 9, Jw)
      ])) : E("", !0),
      (g(), ae(Qt, { to: "body" }, [
        c.value && u.value ? (g(), x("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: r,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": R.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:bg-[#252528]",
          style: we(f.value),
          onKeydown: te[3] || (te[3] = Be(() => {
          }, ["stop"]))
        }, [
          v.value ? (g(), x(de, { key: 0 }, [
            V.$slots.panel ? ke(V.$slots, "panel", {
              key: 0,
              filter: v.value,
              close: F,
              value: k.value,
              updateValue: q
            }, void 0, !0) : (g(), x("div", t5, [
              v.value.type === "text" ? (g(), x(de, { key: 0 }, [
                d("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, A(v.value.label), 9, a5),
                Xe(d("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": te[0] || (te[0] = (ce) => p.value = ce),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: v.value.placeholder ?? "…",
                  onKeydown: Ca(Be(F, ["prevent"]), ["enter"])
                }, null, 40, n5), [
                  [Rt, p.value]
                ])
              ], 64)) : v.value.type === "select" ? (g(), x(de, { key: 1 }, [
                d("p", o5, A(v.value.label), 1),
                d("ul", {
                  class: "max-h-[min(280px,50vh)] space-y-0.5 overflow-y-auto",
                  role: "listbox",
                  "aria-label": v.value.label,
                  "aria-multiselectable": !0
                }, [
                  (g(!0), x(de, null, pe(v.value.options, (ce) => (g(), x("li", {
                    key: ce.value
                  }, [
                    d("label", i5, [
                      d("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox shrink-0",
                        checked: h.value.includes(ce.value),
                        onChange: (me) => re(ce.value)
                      }, null, 40, r5),
                      d("span", l5, A(ce.label), 1)
                    ])
                  ]))), 128))
                ], 8, s5)
              ], 64)) : v.value.type === "dateRange" ? (g(), x(de, { key: 2 }, [
                d("p", c5, A(v.value.label), 1),
                d("div", d5, [
                  d("div", u5, [
                    d("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, h5),
                    Xe(d("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": te[1] || (te[1] = (ce) => b.value = ce),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, f5), [
                      [Rt, b.value]
                    ])
                  ]),
                  d("div", g5, [
                    d("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, m5),
                    Xe(d("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": te[2] || (te[2] = (ce) => y.value = ce),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, p5), [
                      [Rt, y.value]
                    ])
                  ])
                ])
              ], 64)) : E("", !0)
            ]))
          ], 64)) : E("", !0)
        ], 44, e5)) : E("", !0)
      ]))
    ], 8, jw));
  }
}), v5 = /* @__PURE__ */ ve(b5, [["__scopeId", "data-v-f38e0100"]]), y5 = { class: "font-sans" }, x5 = ["for"], k5 = { class: "relative" }, _5 = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], w5 = ["id"], Fr = /* @__PURE__ */ ue({
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
    const a = e, n = t, o = Ja(), s = wi("$pcForm", null), i = `kiut-input-text-${We()}`, r = C(() => a.id ?? i), l = C(() => `${r.value}-err`), c = C(() => a.name ?? o.name ?? ""), u = ne(a.modelValue ?? "");
    Te(
      () => a.modelValue,
      (v) => {
        u.value = v ?? "";
      }
    ), Je(() => {
      s && c.value && s.register?.(c.value, {});
    }), it(() => {
      s && c.value && s.deregister?.(c.value);
    });
    const f = C(() => s && c.value ? s.fields?.[c.value]?.states?.value ?? u.value : u.value), m = C(() => s && c.value ? s.fields?.[c.value]?.states?.invalid ?? a.invalid ?? !1 : a.invalid ?? !1);
    function p(v) {
      const k = v.target.value;
      u.value = k, n("update:modelValue", k);
      const w = s?.fields?.[c.value]?.props;
      w?.onInput && w.onInput(v);
    }
    function h(v) {
      const k = s?.fields?.[c.value]?.props;
      k?.onChange && k.onChange(v);
    }
    function b(v) {
      const k = s?.fields?.[c.value]?.props;
      k?.onBlur && k.onBlur(v);
    }
    const y = C(() => {
      const { name: v, id: k, type: w, ..._ } = o;
      return _;
    });
    return (v, k) => (g(), x("div", y5, [
      e.label ? (g(), x("label", {
        key: 0,
        for: r.value,
        class: G(T(lt))
      }, A(e.label), 11, x5)) : E("", !0),
      d("div", k5, [
        e.icon ? (g(), ae(ht(e.icon), {
          key: 0,
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        })) : E("", !0),
        d("input", yt(y.value, {
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
        }), null, 16, _5)
      ]),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: l.value,
        class: G(T(At)),
        role: "alert"
      }, A(e.errorText), 11, w5)) : E("", !0)
    ]));
  }
}), C5 = { class: "font-sans" }, $5 = ["for"], S5 = { class: "relative" }, M5 = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], D5 = ["aria-label"], A5 = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, T5 = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, B5 = ["id"], L5 = /* @__PURE__ */ ue({
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
    const a = e, n = t, o = Ja(), s = wi("$pcForm", null), i = `kiut-input-password-${We()}`, r = C(() => a.id ?? i), l = C(() => `${r.value}-err`), c = C(() => a.name ?? o.name ?? ""), u = ne(!1), f = ne(a.modelValue ?? "");
    Te(
      () => a.modelValue,
      (k) => {
        k !== void 0 && k !== f.value && (f.value = k);
      }
    ), Je(() => {
      s && c.value && s.register?.(c.value, {});
    }), it(() => {
      s && c.value && s.deregister?.(c.value);
    });
    const m = C(() => s && c.value ? s.fields?.[c.value]?.states?.value ?? f.value : f.value), p = C(() => s && c.value ? s.fields?.[c.value]?.states?.invalid ?? a.invalid ?? !1 : a.invalid ?? !1);
    function h(k) {
      const w = k.target.value;
      f.value = w, n("update:modelValue", w);
      const _ = s?.fields?.[c.value]?.props;
      _?.onInput && _.onInput(k);
    }
    function b(k) {
      const w = s?.fields?.[c.value]?.props;
      w?.onChange && w.onChange(k);
    }
    function y(k) {
      const w = s?.fields?.[c.value]?.props;
      w?.onBlur && w.onBlur(k);
    }
    const v = C(() => {
      const { name: k, id: w, ..._ } = o;
      return _;
    });
    return (k, w) => (g(), x("div", C5, [
      e.label ? (g(), x("label", {
        key: 0,
        for: r.value,
        class: G(T(lt))
      }, A(e.label), 11, $5)) : E("", !0),
      d("div", S5, [
        d("input", yt(v.value, {
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
          onBlur: y
        }), null, 16, M5),
        d("button", {
          type: "button",
          tabindex: "-1",
          onClick: w[0] || (w[0] = (_) => u.value = !u.value),
          class: "absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors",
          "aria-label": u.value ? "Hide password" : "Show password"
        }, [
          u.value ? (g(), x("svg", T5, [...w[2] || (w[2] = [
            d("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            }, null, -1)
          ])])) : (g(), x("svg", A5, [...w[1] || (w[1] = [
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
        ], 8, D5)
      ]),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: l.value,
        class: G(T(At)),
        role: "alert"
      }, A(e.errorText), 11, B5)) : E("", !0)
    ]));
  }
}), R5 = { class: "font-sans" }, P5 = ["for"], I5 = ["id", "rows", "placeholder", "disabled", "aria-invalid", "aria-describedby"], E5 = ["id"], F5 = /* @__PURE__ */ ue({
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
    const a = e, n = t, o = `kiut-input-textarea-${We()}`, s = C(() => a.id ?? o), i = C(() => `${s.value}-err`), r = C({
      get: () => a.modelValue,
      set: (l) => n("update:modelValue", l)
    });
    return (l, c) => (g(), x("div", R5, [
      e.label ? (g(), x("label", {
        key: 0,
        for: s.value,
        class: G(T(lt))
      }, A(e.label), 11, P5)) : E("", !0),
      Xe(d("textarea", {
        id: s.value,
        "onUpdate:modelValue": c[0] || (c[0] = (u) => r.value = u),
        rows: e.rows,
        autocomplete: "off",
        class: G([T(_b), e.invalid ? T(Dt) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, I5), [
        [Rt, r.value]
      ]),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: i.value,
        class: G(T(At)),
        role: "alert"
      }, A(e.errorText), 11, E5)) : E("", !0)
    ]));
  }
}), O5 = { class: "font-sans" }, V5 = ["for"], z5 = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], N5 = ["for"], j5 = ["title"], H5 = ["aria-label"], W5 = {
  key: 2,
  class: "space-y-3"
}, K5 = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], U5 = ["for"], Y5 = { class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400" }, q5 = {
  key: 0,
  class: "shrink-0 text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, X5 = {
  key: 0,
  class: "space-y-2",
  role: "list"
}, G5 = { class: "flex items-start gap-2" }, Z5 = { class: "min-w-0 flex-1 space-y-2" }, Q5 = { class: "flex items-center gap-2" }, J5 = ["title"], eC = { class: "shrink-0 text-xs text-[color:var(--kiut-text-muted)]" }, tC = ["aria-label", "onClick"], aC = ["id"], nC = /* @__PURE__ */ ue({
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
    const a = e, n = t, o = `kiut-input-file-${We()}`, s = C(() => a.id ?? o), i = C(() => `${s.value}-err`), r = ne(null), l = C(
      () => a.multiple ? null : a.modelValue
    ), c = C(() => {
      if (!a.multiple) return [];
      const M = a.modelValue;
      return Array.isArray(M) ? M : [];
    }), u = C(
      () => l.value?.name ?? a.placeholder
    ), f = C(
      () => a.multiple && c.value.length >= a.maxFiles
    ), m = C(() => c.value.length === 0 ? a.placeholder : c.value.length === 1 ? c.value[0].file.name : `${c.value.length} archivos seleccionados`);
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
    function y(M, I) {
      return M.some(
        (z) => z.file.name === I.name && z.file.size === I.size && z.file.lastModified === I.lastModified
      );
    }
    function v() {
      r.value && (r.value.value = "");
    }
    function k(M) {
      const z = M.target.files?.[0] ?? null;
      n("update:modelValue", z);
    }
    function w(M) {
      const I = M.target, z = Array.from(I.files ?? []);
      if (z.length === 0) return;
      const K = [...c.value];
      for (const D of z) {
        if (K.length >= a.maxFiles) break;
        y(K, D) || K.push(b(D));
      }
      n("update:modelValue", K), v();
    }
    function _() {
      n("update:modelValue", null), v();
    }
    function $(M) {
      n(
        "update:modelValue",
        c.value.filter((I) => I.id !== M)
      );
    }
    function S(M, I) {
      n(
        "update:modelValue",
        c.value.map(
          (z) => z.id === M ? { ...z, description: I } : z
        )
      );
    }
    return (M, I) => (g(), x("div", O5, [
      e.label ? (g(), x("label", {
        key: 0,
        for: s.value,
        class: G(T(lt))
      }, A(e.label), 11, V5)) : E("", !0),
      e.multiple ? (g(), x("div", W5, [
        d("div", {
          class: G([
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
            onChange: w
          }, null, 40, K5),
          d("label", {
            for: s.value,
            class: G(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled || f.value ? "cursor-not-allowed opacity-50" : ""])
          }, [
            N(T(lo), {
              class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
              "aria-hidden": "true"
            }),
            Ae(" " + A(e.chooseLabel), 1)
          ], 10, U5),
          d("span", Y5, A(m.value), 1),
          e.filesCountLabel ? (g(), x("span", q5, A(e.filesCountLabel), 1)) : E("", !0)
        ], 2),
        c.value.length > 0 ? (g(), x("ul", X5, [
          (g(!0), x(de, null, pe(c.value, (z) => (g(), x("li", {
            key: z.id,
            class: "rounded-xl border border-[color:var(--kiut-border-light)] bg-[color:var(--bg-secondary,#f9fafb)] p-3 dark:bg-white/[0.03]"
          }, [
            d("div", G5, [
              N(T(np), {
                class: "mt-0.5 h-5 w-5 shrink-0 text-[color:var(--kiut-primary)]",
                "aria-hidden": "true"
              }),
              d("div", Z5, [
                d("div", Q5, [
                  d("span", {
                    class: "min-w-0 flex-1 truncate text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100",
                    title: z.file.name
                  }, A(z.file.name), 9, J5),
                  d("span", eC, A(h(z.file.size)), 1),
                  e.disabled ? E("", !0) : (g(), x("button", {
                    key: 0,
                    type: "button",
                    class: "inline-flex shrink-0 rounded-lg p-1 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
                    "aria-label": e.removeFileAriaLabel,
                    onClick: (K) => $(z.id)
                  }, [
                    N(T(co), {
                      class: "h-4 w-4",
                      "aria-hidden": "true"
                    })
                  ], 8, tC))
                ]),
                e.showDescriptions ? (g(), ae(Fr, {
                  key: 0,
                  "model-value": z.description,
                  label: e.descriptionLabel,
                  placeholder: e.descriptionPlaceholder,
                  disabled: e.disabled,
                  invalid: p(z),
                  "error-text": p(z) ? e.descriptionErrorText : "",
                  "onUpdate:modelValue": (K) => S(z.id, K)
                }, null, 8, ["model-value", "label", "placeholder", "disabled", "invalid", "error-text", "onUpdate:modelValue"])) : E("", !0)
              ])
            ])
          ]))), 128))
        ])) : E("", !0)
      ])) : (g(), x("div", {
        key: 1,
        class: G([
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
          onChange: k
        }, null, 40, z5),
        d("label", {
          for: s.value,
          class: G(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled ? "cursor-not-allowed opacity-50" : ""])
        }, [
          N(T(lo), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          Ae(" " + A(e.chooseLabel), 1)
        ], 10, N5),
        d("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: u.value || void 0
        }, A(u.value), 9, j5),
        l.value && !e.disabled ? (g(), x("button", {
          key: 0,
          type: "button",
          class: "inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
          "aria-label": e.clearAriaLabel,
          onClick: _
        }, [
          N(T(co), {
            class: "h-4 w-4",
            "aria-hidden": "true"
          })
        ], 8, H5)) : E("", !0)
      ], 2)),
      e.errorText ? (g(), x("p", {
        key: 3,
        id: i.value,
        class: G(T(At)),
        role: "alert"
      }, A(e.errorText), 11, aC)) : E("", !0)
    ]));
  }
}), oC = ["for"], sC = { class: "flex w-full min-w-0 items-center gap-3" }, iC = ["for", "aria-label"], rC = ["src"], lC = ["id", "accept", "disabled"], cC = ["id", "value", "placeholder", "disabled"], dC = /* @__PURE__ */ ue({
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
    const a = e, n = t, o = ne(!1), s = ne(null), i = `kiut-image-upload-circle-${We()}`, r = C(() => a.id ?? i), l = C(() => `${r.value}-url`), c = C(() => a.size === "sm" ? "h-10 w-10" : a.size === "lg" ? "h-16 w-16" : "h-12 w-12"), u = C(() => a.size === "sm" ? "h-4 w-4" : a.size === "lg" ? "h-6 w-6" : "h-5 w-5"), f = C(() => !a.disabled && !a.loading);
    Te(
      () => a.modelValue,
      () => {
        o.value = !1;
      }
    );
    function m(h) {
      const b = h.target, y = b.files?.[0];
      y && n("select", y), b.value = "";
    }
    function p(h) {
      n("update:modelValue", h.target.value);
    }
    return (h, b) => (g(), x("div", yt({ class: "font-sans flex w-full flex-col gap-2" }, h.$attrs), [
      e.label ? (g(), x("label", {
        key: 0,
        for: r.value,
        class: G(T(lt))
      }, A(e.label), 11, oC)) : E("", !0),
      d("div", sC, [
        d("label", {
          for: r.value,
          class: G(["relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-primary)] text-[color:var(--kiut-text-muted)] transition hover:border-[color:var(--kiut-primary)]/40", [
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
            onError: b[0] || (b[0] = (y) => o.value = !0)
          }, null, 40, rC)) : e.loading ? (g(), ae(T(ep), {
            key: 1,
            class: G([u.value, "animate-spin text-[color:var(--kiut-primary)]"]),
            "aria-hidden": "true"
          }, null, 8, ["class"])) : (g(), ae(T(lo), {
            key: 2,
            class: G([u.value, "text-[color:var(--kiut-primary)]"]),
            "aria-hidden": "true"
          }, null, 8, ["class"]))
        ], 10, iC),
        d("input", {
          id: r.value,
          ref_key: "fileInputRef",
          ref: s,
          type: "file",
          class: "sr-only focus:outline-none focus:ring-0",
          accept: e.accept,
          disabled: e.disabled || e.loading,
          onChange: m
        }, null, 40, lC),
        e.showUrlInput ? (g(), x("div", {
          key: 0,
          class: G(["min-w-0 flex-1 basis-0", e.urlInputClass])
        }, [
          d("input", {
            id: l.value,
            type: "text",
            autocomplete: "off",
            value: e.modelValue,
            placeholder: e.urlPlaceholder,
            disabled: e.disabled,
            class: G([T(et), "w-full min-w-0"]),
            onInput: p
          }, null, 42, cC)
        ], 2)) : E("", !0)
      ])
    ], 16));
  }
}), uC = {
  en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  es: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
}, hC = {
  en: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  es: ["lu", "ma", "mi", "ju", "vi", "sá", "do"]
}, fC = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/, gC = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
}, mC = {
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
}, pC = {
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
}, bC = [
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
function vC(e = "en") {
  return uC[e];
}
function yC(e = "en") {
  return hC[e];
}
function Or(e = "en") {
  return bC.map((t) => ({ id: t, label: pC[e][t] }));
}
function xC(e = "en") {
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
function kC(e, t) {
  const a = new Date(e.getFullYear(), e.getMonth(), e.getDate() + t);
  return Ve(a);
}
function Ea(e, t) {
  return kC(e, -t);
}
function _C(e) {
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
      return { start: n, end: _C(n) };
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
function wC(e, t, a = /* @__PURE__ */ new Date(), n, o) {
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
function CC(e) {
  const t = e.getFullYear(), a = e.getMonth(), n = new Date(t, a, 1), o = new Date(n);
  o.setDate(n.getDate() - (n.getDay() + 6) % 7);
  const s = [], i = new Date(o);
  for (let r = 0; r < 42; r++)
    s.push(new Date(i)), i.setDate(i.getDate() + 1);
  return s;
}
function ka(e) {
  if (!e?.trim()) return null;
  const t = fC.exec(e.trim());
  if (!t) return null;
  const a = Number(t[1]), n = Number(t[2]), o = Number(t[3]), s = Number(t[4]), i = Number(t[5]), r = new Date(a, n - 1, o, s, i);
  return Number.isNaN(r.getTime()) ? null : r;
}
function $C(e) {
  const t = e.getFullYear(), a = String(e.getMonth() + 1).padStart(2, "0"), n = String(e.getDate()).padStart(2, "0"), o = String(e.getHours()).padStart(2, "0"), s = String(e.getMinutes()).padStart(2, "0");
  return `${t}-${a}-${n}T${o}:${s}`;
}
function SC(e) {
  const t = ka(e);
  return t ? `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}` : "00:00";
}
function MC(e, t = "es") {
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
  return `${gC[t][e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function Nt(e, t = "en") {
  return `${mC[t][e.getMonth()]} ${e.getFullYear()}`;
}
const DC = ["name", "value"], AC = { class: "flex flex-row gap-3 items-center" }, TC = {
  key: 0,
  class: "mb-1.5 inline-flex shrink-0 text-[color:var(--kiut-text-muted)] [&>svg]:h-4 [&>svg]:w-4",
  "aria-hidden": "true"
}, BC = ["for"], LC = ["id", "disabled", "aria-expanded", "aria-labelledby", "aria-label", "aria-invalid", "aria-describedby"], RC = ["aria-label", "onKeydown"], PC = { class: "p-3" }, IC = { class: "mb-4 flex items-center justify-between gap-2" }, EC = ["aria-label"], FC = { class: "min-w-0 truncate px-1 text-sm font-medium text-[#61616b] dark:text-[#e3e3e8]" }, OC = ["aria-label"], VC = { class: "mb-2 grid grid-cols-7 text-center text-xs font-normal tracking-wide text-[#61616b] dark:text-[#e3e3e8]" }, zC = { class: "grid grid-cols-7 gap-y-2" }, NC = ["disabled", "onClick"], jC = { class: "border-t border-gray-200 px-3 py-3 dark:border-[color:var(--kiut-border-light)]" }, HC = { class: "relative" }, WC = ["value", "disabled", "min", "max", "step", "aria-label"], KC = /* @__PURE__ */ ue({
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
    const a = e, n = t, o = `kiut-input-datetime-${We()}`, s = `${o}-label`, i = C(() => a.id ?? `${o}-btn`), r = `${o}-panel`, l = `${o}-err`, c = ne(null), u = ne(null), f = ne(null), m = ne(!1), p = ne(kt(/* @__PURE__ */ new Date())), h = ne(null), b = ne("00:00"), y = C(() => !!a.modelValue), v = C(() => yC(a.locale)), k = C(() => CC(p.value)), w = C(() => a.placeholder), _ = C(() => a.modelValue ? MC(a.modelValue, a.locale) : a.placeholder), $ = C(() => {
      const R = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return a.panelAlign === "end" ? `right-0 left-auto ${R}` : `left-0 right-auto ${R}`;
    }), S = C(
      () => a.locale === "es" ? "Calendario de fecha y hora" : "Date and time calendar"
    ), M = C(
      () => a.locale === "es" ? "Mes anterior" : "Previous month"
    ), I = C(
      () => a.locale === "es" ? "Mes siguiente" : "Next month"
    ), z = C(
      () => a.locale === "es" ? "Hora" : "Time"
    ), K = C(() => ka(a.min)), D = C(() => ka(a.max)), P = C(() => {
      if (!(!h.value || !K.value) && mt(h.value, K.value))
        return `${String(K.value.getHours()).padStart(2, "0")}:${String(K.value.getMinutes()).padStart(2, "0")}`;
    }), B = C(() => {
      if (!(!h.value || !D.value) && mt(h.value, D.value))
        return `${String(D.value.getHours()).padStart(2, "0")}:${String(D.value.getMinutes()).padStart(2, "0")}`;
    });
    function H(R, W) {
      return R.getMonth() === W.getMonth() && R.getFullYear() === W.getFullYear();
    }
    function j(R) {
      const W = Ve(R);
      return !!(K.value && jt(W, Ve(K.value)) || D.value && wn(W, Ve(D.value)));
    }
    function X(R) {
      const W = H(R, p.value), ie = j(R), Q = h.value ? mt(R, h.value) : !1;
      if (ie)
        return "rounded-lg text-[#61616b] opacity-40";
      let U = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white";
      return Q && (U = "rounded-lg bg-[#895af6] font-semibold text-white"), W || (U = `${U} opacity-30`), U;
    }
    function re() {
      const R = ka(a.modelValue);
      if (R) {
        h.value = Ve(R), b.value = SC(a.modelValue), p.value = kt(R);
        return;
      }
      h.value = null, b.value = "00:00", p.value = kt(/* @__PURE__ */ new Date());
    }
    function he(R) {
      if (!h.value) return R;
      let W = ka(
        `${nt(h.value)}T${R}`
      );
      return W ? (K.value && mt(h.value, K.value) && vi(W, K.value) && (W = K.value), D.value && mt(h.value, D.value) && yi(W, D.value) && (W = D.value), `${String(W.getHours()).padStart(2, "0")}:${String(W.getMinutes()).padStart(2, "0")}`) : R;
    }
    function Z() {
      if (!h.value) {
        n("update:modelValue", null);
        return;
      }
      const R = he(b.value);
      b.value = R;
      const W = new Date(
        h.value.getFullYear(),
        h.value.getMonth(),
        h.value.getDate(),
        Number(R.slice(0, 2)),
        Number(R.slice(3, 5))
      ), ie = $C(W);
      K.value && vi(W, K.value) || D.value && yi(W, D.value) || n("update:modelValue", ie);
    }
    function oe(R) {
      j(R) || (h.value = Ve(R), b.value = he(b.value), Z());
    }
    function L(R) {
      const W = R.target.value;
      W && (b.value = W, Z());
    }
    function Y(R) {
      p.value = Ma(p.value, R);
    }
    function q() {
      m.value = !1;
    }
    function F() {
      a.disabled || (re(), m.value = !0, Ke(() => f.value?.focus()));
    }
    function se(R) {
      if (R.stopPropagation(), !a.disabled) {
        if (m.value) {
          q();
          return;
        }
        F();
      }
    }
    function le(R) {
      a.disabled || (R.key === "ArrowDown" || R.key === "Enter" || R.key === " ") && (R.preventDefault(), m.value || F());
    }
    function J(R) {
      if (!m.value) return;
      const W = c.value;
      W && !W.contains(R.target) && q();
    }
    return Te(
      () => a.modelValue,
      () => {
        m.value || re();
      }
    ), Je(() => {
      re(), document.addEventListener("click", J);
    }), it(() => {
      document.removeEventListener("click", J);
    }), (R, W) => (g(), x("div", {
      ref_key: "rootRef",
      ref: c,
      class: "relative font-sans"
    }, [
      e.name ? (g(), x("input", {
        key: 0,
        type: "hidden",
        name: e.name,
        value: e.modelValue ?? ""
      }, null, 8, DC)) : E("", !0),
      d("div", AC, [
        R.$slots.icon ? (g(), x("span", TC, [
          ke(R.$slots, "icon")
        ])) : E("", !0),
        e.label ? (g(), x("label", {
          key: 1,
          id: s,
          for: i.value,
          class: G(T(lt))
        }, A(e.label), 11, BC)) : E("", !0)
      ]),
      d("button", {
        id: i.value,
        ref_key: "buttonRef",
        ref: u,
        type: "button",
        disabled: e.disabled,
        class: G([
          T(et),
          "flex w-full items-center gap-2 text-left",
          e.invalid ? T(Dt) : "",
          m.value && !e.invalid ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": m.value,
        "aria-haspopup": "dialog",
        "aria-controls": r,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : w.value,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? l : void 0,
        onClick: se,
        onKeydown: le
      }, [
        N(T(Po), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        d("span", {
          class: G([
            "min-w-0 flex-1 truncate",
            y.value ? "" : "text-[color:var(--kiut-text-muted)] dark:text-slate-500"
          ])
        }, A(_.value), 3)
      ], 42, LC),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: l,
        class: G(T(At)),
        role: "alert"
      }, A(e.errorText), 3)) : E("", !0),
      Xe(d("div", {
        ref_key: "panelRef",
        ref: f,
        id: r,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": S.value,
        class: G([
          $.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),20rem)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: Ca(Be(q, ["stop"]), ["escape"])
      }, [
        d("div", PC, [
          d("div", IC, [
            d("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": M.value,
              onClick: W[0] || (W[0] = Be((ie) => Y(-1), ["stop"]))
            }, [
              N(T(Io), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ], 8, EC),
            d("span", FC, A(T(Nt)(p.value, e.locale)), 1),
            d("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": I.value,
              onClick: W[1] || (W[1] = Be((ie) => Y(1), ["stop"]))
            }, [
              N(T(Eo), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ], 8, OC)
          ]),
          d("div", VC, [
            (g(!0), x(de, null, pe(v.value, (ie) => (g(), x("span", { key: ie }, A(ie), 1))), 128))
          ]),
          d("div", zC, [
            (g(!0), x(de, null, pe(k.value, (ie) => (g(), x("button", {
              key: T(nt)(ie),
              type: "button",
              disabled: j(ie),
              class: G(["relative mx-auto flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed", X(ie)]),
              onClick: Be((Q) => oe(ie), ["stop"])
            }, A(ie.getDate()), 11, NC))), 128))
          ])
        ]),
        d("div", jC, [
          d("div", HC, [
            N(T(xr), {
              class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
              "aria-hidden": "true"
            }),
            d("input", {
              value: b.value,
              type: "time",
              autocomplete: "off",
              class: G([T(et), "min-h-0 py-2 pl-10 pr-3 text-sm"]),
              disabled: !h.value,
              min: P.value,
              max: B.value,
              step: e.step,
              "aria-label": z.value,
              onInput: L,
              onClick: W[2] || (W[2] = Be(() => {
              }, ["stop"]))
            }, null, 42, WC)
          ])
        ])
      ], 42, RC), [
        [Ht, m.value]
      ])
    ], 512));
  }
}), UC = { class: "font-sans" }, YC = { class: "flex flex-row gap-3 items-center" }, qC = {
  key: 0,
  class: "mb-1.5 inline-flex shrink-0 text-[color:var(--kiut-text-muted)] [&>svg]:h-4 [&>svg]:w-4",
  "aria-hidden": "true"
}, XC = ["for"], GC = { class: "relative" }, ZC = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], QC = ["id"], JC = /* @__PURE__ */ ue({
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
    const o = e, s = t, i = `kiut-input-time-${We()}`, r = C(() => o.id ?? i), l = C(() => `${r.value}-err`), c = C(() => o.modelValue == null || o.modelValue === "" ? "" : a(o.modelValue) ?? "");
    function u(f) {
      const m = f.target.value;
      s("update:modelValue", n(m));
    }
    return (f, m) => (g(), x("div", UC, [
      d("div", YC, [
        f.$slots.icon ? (g(), x("span", qC, [
          ke(f.$slots, "icon")
        ])) : E("", !0),
        e.label ? (g(), x("label", {
          key: 1,
          for: r.value,
          class: G(T(lt))
        }, A(e.label), 11, XC)) : E("", !0)
      ]),
      d("div", GC, [
        N(T(xr), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        d("input", {
          id: r.value,
          value: c.value,
          type: "time",
          autocomplete: "off",
          class: G([
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
        }, null, 42, ZC)
      ]),
      e.errorText ? (g(), x("p", {
        key: 0,
        id: l.value,
        class: G(T(At)),
        role: "alert"
      }, A(e.errorText), 11, QC)) : E("", !0)
    ]));
  }
}), e$ = { class: "font-sans" }, t$ = ["for"], a$ = {
  key: 0,
  class: "order-1 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, n$ = ["id", "value", "min", "max", "step", "disabled", "aria-orientation", "aria-invalid", "aria-describedby"], o$ = {
  key: 1,
  class: "text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, s$ = {
  key: 2,
  class: "grid w-full max-w-full grid-cols-[1fr_auto_1fr] items-start gap-x-3 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, i$ = { class: "min-w-0 text-left leading-snug" }, r$ = { class: "max-w-[min(100%,12rem)] shrink px-1 text-center leading-snug" }, l$ = { class: "min-w-0 text-right leading-snug" }, c$ = {
  key: 3,
  class: "order-3 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, d$ = {
  key: 4,
  class: "order-4 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, u$ = ["id"], h$ = /* @__PURE__ */ ue({
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
    const a = e, n = t, o = `kiut-input-range-${We()}`, s = C(() => a.id ?? o), i = C(() => `${s.value}-err`), r = C(() => {
      const p = [];
      return a.errorText && p.push(i.value), p.length ? p.join(" ") : void 0;
    }), l = C(
      () => !!(a.caption && !a.captionMin && !a.captionMax)
    ), c = C(() => !!(a.captionMin || a.captionMax)), u = C(() => {
      const { min: p, max: h, modelValue: b } = a;
      if (h === p) return 0;
      const y = (b - p) / (h - p);
      return Math.min(100, Math.max(0, y * 100));
    }), f = C(() => ({
      "--kiut-range-fill": `${u.value}%`,
      "--kiut-range-length": a.trackLength
    }));
    function m(p) {
      const h = Number(p.target.value);
      n("update:modelValue", Number.isNaN(h) ? a.min : h);
    }
    return (p, h) => (g(), x("div", e$, [
      e.label ? (g(), x("label", {
        key: 0,
        for: s.value,
        class: G(T(lt))
      }, A(e.label), 11, t$)) : E("", !0),
      d("div", {
        class: G(["flex flex-col items-center gap-2", (e.orientation === "vertical", "w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (g(), x("p", a$, A(e.captionMax), 1)) : E("", !0),
        d("div", {
          class: G(["flex items-center justify-center", [
            e.orientation === "vertical" ? "order-2 h-[var(--kiut-range-length)] w-11 shrink-0" : "order-none w-full py-1"
          ]]),
          style: we(f.value)
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
            class: G([
              "kiut-range-input block appearance-none bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              "dark:[--kiut-range-track:#282836] dark:[--kiut-range-thumb-bg:#282836] dark:[--kiut-range-thumb-shadow:none]",
              e.orientation === "vertical" ? "kiut-range-input--vertical" : "kiut-range-input--horizontal w-full"
            ]),
            onInput: m
          }, null, 42, n$)
        ], 6),
        e.orientation === "horizontal" && l.value ? (g(), x("p", o$, A(e.caption), 1)) : e.orientation === "horizontal" && c.value ? (g(), x("div", s$, [
          d("span", i$, A(e.captionMin), 1),
          d("span", r$, A(e.caption), 1),
          d("span", l$, A(e.captionMax), 1)
        ])) : E("", !0),
        e.orientation === "vertical" && e.captionMin ? (g(), x("p", c$, A(e.captionMin), 1)) : E("", !0),
        e.orientation === "vertical" && e.caption ? (g(), x("p", d$, A(e.caption), 1)) : E("", !0)
      ], 2),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: i.value,
        class: G(T(At)),
        role: "alert"
      }, A(e.errorText), 11, u$)) : E("", !0)
    ]));
  }
}), f$ = /* @__PURE__ */ ve(h$, [["__scopeId", "data-v-ce7263e4"]]), g$ = { class: "font-sans" }, m$ = ["for"], p$ = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], b$ = ["id"], v$ = /* @__PURE__ */ ue({
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
    const a = e, n = t, o = `kiut-input-number-${We()}`, s = C(() => a.id ?? o), i = C(() => `${s.value}-err`), r = C(() => {
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
    function c(u) {
      const f = u.target.value;
      if (f === "") {
        n("update:modelValue", null);
        return;
      }
      const m = Number(f);
      n("update:modelValue", Number.isNaN(m) ? null : m);
    }
    return (u, f) => (g(), x("div", g$, [
      e.label ? (g(), x("label", {
        key: 0,
        for: s.value,
        class: G(T(lt))
      }, A(e.label), 11, m$)) : E("", !0),
      d("input", {
        id: s.value,
        value: l.value,
        type: "number",
        onInput: c,
        class: G([
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
      }, null, 42, p$),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: i.value,
        class: G(T(At)),
        role: "alert"
      }, A(e.errorText), 11, b$)) : E("", !0)
    ]));
  }
}), y$ = { class: "font-sans" }, x$ = ["for"], k$ = ["id", "value", "disabled", "aria-invalid", "aria-describedby"], _$ = ["disabled"], w$ = ["id"], C$ = "#3b82f6", $$ = "#aabbcc", S$ = "flex min-h-[2.75rem] w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans shadow-sm outline-none transition focus-within:border-[color:var(--kiut-primary)] focus-within:ring-2 focus-within:ring-[color:var(--kiut-primary)]/25 focus-within:ring-offset-0 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]", M$ = /* @__PURE__ */ ue({
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
      const b = h.trim(), y = /^#?([0-9a-fA-F]{6})$/.exec(b);
      if (y) return `#${y[1].toLowerCase()}`;
      const v = /^#?([0-9a-fA-F]{3})$/.exec(b);
      if (v) {
        const [k, w, _] = v[1].split("");
        return `#${k}${k}${w}${w}${_}${_}`.toLowerCase();
      }
      return null;
    }
    function n(h) {
      return a(h) ?? C$;
    }
    const o = e, s = t, i = `kiut-input-color-${We()}`, r = C(() => o.id ?? i), l = C(() => `${r.value}-err`), c = C(() => n(o.modelValue)), u = ne(c.value), f = ne(!1);
    Te(c, (h) => {
      f.value || (u.value = h);
    });
    function m(h) {
      const b = h.target, y = a(b.value);
      y && s("update:modelValue", y);
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
    }), (h, b) => (g(), x("div", y$, [
      e.label ? (g(), x("label", {
        key: 0,
        for: r.value,
        class: G(T(lt))
      }, A(e.label), 11, x$)) : E("", !0),
      d("div", {
        class: G([
          S$,
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
        }, null, 40, k$),
        e.showHexInput ? Xe((g(), x("input", {
          key: 0,
          "onUpdate:modelValue": b[0] || (b[0] = (y) => u.value = y),
          type: "text",
          disabled: e.disabled,
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": "Código hexadecimal del color",
          class: "min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none ring-0 placeholder:text-[color:var(--kiut-text-muted)] focus:ring-0 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500",
          placeholder: $$,
          onFocus: b[1] || (b[1] = (y) => f.value = !0),
          onBlur: p
        }, null, 40, _$)), [
          [Rt, u.value]
        ]) : E("", !0)
      ], 2),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: l.value,
        class: G(T(At)),
        role: "alert"
      }, A(e.errorText), 11, w$)) : E("", !0)
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
function D$(e, t) {
  return e.char.includes(t) ? !0 : e.terms?.some((a) => a.toLowerCase().includes(t)) ?? !1;
}
function A$(e, t, a) {
  const n = a.trim().toLowerCase();
  return n ? e.map((o) => {
    const s = t[o.id]?.toLowerCase().includes(n) || o.id.includes(n), i = o.emojis.filter(
      (r) => s || D$(r, n)
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
function OM(e) {
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
function T$(e) {
  return e ? e.match(new RegExp("\\p{Extended_Pictographic}(\\u200d\\p{Extended_Pictographic})*", "gu")) ?? [] : [];
}
function B$(e, t) {
  return `${e}${t}`;
}
const L$ = ["disabled", "aria-expanded", "aria-label"], R$ = {
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, P$ = {
  key: 0,
  class: "truncate text-sm"
}, I$ = ["aria-label"], E$ = { class: "border-b border-gray-200/80 p-3 dark:border-white/10" }, F$ = ["disabled", "placeholder", "aria-label"], O$ = { class: "min-h-0 flex-1 space-y-4 overflow-y-auto p-3" }, V$ = { class: "mb-2 text-[11px] font-bold uppercase tracking-wide text-[color:var(--kiut-text-muted)] dark:text-slate-500" }, z$ = { class: "grid grid-cols-8 gap-0.5" }, N$ = ["disabled", "aria-label", "onClick"], j$ = { class: "text-[1.35rem] leading-none" }, H$ = {
  key: 1,
  class: "py-8 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, W$ = {
  key: 0,
  class: "border-t border-gray-200/80 px-3 py-2.5 text-[11px] leading-relaxed text-[color:var(--kiut-text-muted)] dark:border-white/10 dark:text-slate-500"
}, K$ = /* @__PURE__ */ ue({
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
    const a = e, n = t, o = `kiut-emoji-picker-${We()}`, s = `${o}-btn`, i = `${o}-panel`, r = ne(null), l = ne(null), c = ne(null), u = ne(null), f = ne(!1), m = ne(""), p = ne({}), h = C(
      () => a.ariaLabelTrigger ?? a.triggerLabel ?? a.ariaLabel
    ), b = C(() => ({
      ...Wr,
      ...a.categoryLabels
    })), y = C(() => new Set(T$(a.draft))), v = C(() => {
      if (a.categories?.length) {
        const B = m.value.trim().toLowerCase();
        return B ? a.categories.map((H) => ({
          ...H,
          emojis: H.emojis.filter((j) => j.includes(B) || H.label.toLowerCase().includes(B) ? !0 : H.id.toLowerCase().includes(B))
        })).filter((H) => H.emojis.length > 0) : a.categories;
      }
      return A$(
        Kr,
        b.value,
        m.value
      );
    });
    function k() {
      const B = l.value;
      if (!B) return;
      const H = B.getBoundingClientRect(), j = 320, X = 8, re = 8;
      let he = H.right - j;
      he < re && (he = H.left), he + j > window.innerWidth - re && (he = Math.max(re, window.innerWidth - j - re));
      const Z = Math.max(160, H.top - X - re);
      p.value = {
        bottom: `${window.innerHeight - H.top + X}px`,
        left: `${he}px`,
        width: `${j}px`,
        maxHeight: `${Z}px`
      };
    }
    function w(B) {
      const H = "flex h-9 w-9 items-center justify-center rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-white/5";
      return y.value.has(B) ? `${H} bg-[color:var(--kiut-primary)]/15 ring-2 ring-[color:var(--kiut-primary)]/70 dark:bg-[color:var(--kiut-primary)]/25` : H;
    }
    function _(B) {
      if (a.disabled) return;
      const H = B$(a.draft ?? "", B);
      n("update:draft", H), n("select", B);
    }
    function $() {
      m.value = "", n("open"), Ke(() => {
        k(), u.value?.focus();
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
        f.value = !0, $();
      }
    }
    function I(B) {
      B.stopPropagation(), M();
    }
    function z(B) {
      if (!f.value) return;
      const H = B.target, j = r.value, X = c.value;
      j && !j.contains(H) && (!X || !X.contains(H)) && S();
    }
    function K(B) {
      a.disabled || ((B.key === "ArrowDown" || B.key === "Enter" || B.key === " ") && (B.preventDefault(), f.value || (f.value = !0, $())), B.key === "Escape" && f.value && (B.preventDefault(), S()));
    }
    function D(B) {
      B.key === "Escape" && (B.preventDefault(), S());
    }
    function P() {
      f.value && k();
    }
    return Je(() => {
      document.addEventListener("click", z), window.addEventListener("resize", P), window.addEventListener("scroll", P, !0);
    }), it(() => {
      document.removeEventListener("click", z), window.removeEventListener("resize", P), window.removeEventListener("scroll", P, !0);
    }), (B, H) => (g(), x("div", {
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
        class: G([
          T(et),
          "inline-flex min-h-[2.75rem] w-auto items-center justify-center gap-2 px-3 py-2",
          e.triggerLabel ? "min-w-[9rem]" : "min-w-[2.75rem]",
          f.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": f.value,
        "aria-haspopup": "dialog",
        "aria-controls": i,
        "aria-label": h.value,
        onClick: I,
        onKeydown: K
      }, [
        d("span", R$, [
          ke(B.$slots, "icon", {}, () => [
            N(T(op), { class: "h-5 w-5" })
          ])
        ]),
        e.triggerLabel ? (g(), x("span", P$, A(e.triggerLabel), 1)) : E("", !0),
        e.triggerLabel ? (g(), ae(T(ta), {
          key: 1,
          class: G(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", f.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])) : E("", !0)
      ], 42, L$),
      (g(), ae(Qt, { to: "body" }, [
        Xe(d("div", {
          ref_key: "panelRef",
          ref: c,
          id: i,
          role: "dialog",
          "aria-label": e.ariaLabel,
          style: we(p.value),
          class: "fixed z-[300] flex w-[20rem] flex-col overflow-hidden rounded-xl border border-gray-300/80 bg-white shadow-lg dark:border-[color:var(--kiut-border-light)] dark:bg-[#141416]",
          onClick: H[2] || (H[2] = Be(() => {
          }, ["stop"])),
          onKeydown: Be(D, ["stop"])
        }, [
          d("div", E$, [
            Xe(d("input", {
              ref_key: "searchInputRef",
              ref: u,
              "onUpdate:modelValue": H[0] || (H[0] = (j) => m.value = j),
              type: "search",
              disabled: e.disabled,
              placeholder: e.searchPlaceholder,
              "aria-label": e.searchPlaceholder,
              autocomplete: "off",
              spellcheck: "false",
              class: "min-h-[2.5rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 disabled:cursor-not-allowed dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500",
              onClick: H[1] || (H[1] = Be(() => {
              }, ["stop"]))
            }, null, 8, F$), [
              [Rt, m.value]
            ])
          ]),
          d("div", O$, [
            v.value.length > 0 ? (g(!0), x(de, { key: 0 }, pe(v.value, (j) => (g(), x("section", {
              key: j.id
            }, [
              d("h3", V$, A(j.label), 1),
              d("div", z$, [
                (g(!0), x(de, null, pe(j.emojis, (X) => (g(), x("button", {
                  key: `${j.id}-${X}`,
                  type: "button",
                  disabled: e.disabled,
                  "aria-label": `Add ${X} to input`,
                  class: G(w(X)),
                  onClick: Be((re) => _(X), ["stop"])
                }, [
                  d("span", j$, A(X), 1)
                ], 10, N$))), 128))
              ])
            ]))), 128)) : (g(), x("p", H$, A(e.emptySearchText), 1))
          ]),
          e.hint ? (g(), x("p", W$, A(e.hint), 1)) : E("", !0)
        ], 44, I$), [
          [Ht, f.value]
        ])
      ]))
    ], 512));
  }
}), U$ = /* @__PURE__ */ ue({
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
    const a = e, n = t, o = C(
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
}), Y$ = { class: "border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-3 dark:border-[color:var(--kiut-border-light)]" }, q$ = { class: "relative" }, X$ = {
  class: "pointer-events-none absolute inset-y-0 left-0 flex w-9 items-center justify-center",
  "aria-hidden": "true"
}, G$ = ["placeholder", "aria-label", "disabled"], Z$ = {
  key: 0,
  class: "px-3 pb-1 pt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, Q$ = ["aria-label"], J$ = {
  key: 0,
  class: "px-3 py-6 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, e4 = ["aria-selected", "onClick", "onMouseenter"], t4 = { class: "min-w-0 flex-1 truncate" }, a4 = /* @__PURE__ */ ue({
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
    const n = e, o = a, i = `${`kiut-language-picker-${We()}`}-listbox`, r = ne(null), l = ne(null), c = ne(""), u = ne(0), f = C(() => n.options.filter((_) => !_.disabled)), m = C(() => {
      const _ = c.value.trim().toLowerCase();
      return _ ? f.value.filter(($) => $.label.toLowerCase().includes(_)) : f.value;
    });
    function p(_) {
      return `${_.value}-${_.label}`;
    }
    function h(_) {
      return n.modelValue === _.value;
    }
    function b(_, $) {
      const S = h(_), M = u.value === $;
      return [
        "flex cursor-pointer items-center gap-2.5 border-b border-gray-200 px-3 py-2.5 text-sm transition-colors last:border-b-0 dark:border-white/5",
        S ? "bg-[color:var(--kiut-primary)]/10 font-medium text-[color:var(--kiut-text-primary)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-slate-100" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !S && M ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function y() {
      u.value = Math.max(
        0,
        m.value.findIndex((_) => _.value === n.modelValue)
      );
    }
    function v(_) {
      _.disabled || o("update:modelValue", _.value);
    }
    function k(_) {
      const $ = m.value;
      if (_.key === "ArrowDown") {
        if (_.preventDefault(), $.length === 0) return;
        u.value = 0, l.value?.focus();
        return;
      }
      if (_.key === "ArrowUp") {
        if (_.preventDefault(), $.length === 0) return;
        u.value = $.length - 1, l.value?.focus();
        return;
      }
      if (_.key === "Enter") {
        _.preventDefault();
        const S = $[u.value];
        S && v(S);
      }
    }
    function w(_) {
      const $ = m.value;
      if ($.length !== 0) {
        if (_.key === "ArrowDown") {
          _.preventDefault(), u.value = Math.min(u.value + 1, $.length - 1);
          return;
        }
        if (_.key === "ArrowUp") {
          if (_.preventDefault(), u.value === 0) {
            r.value?.focus();
            return;
          }
          u.value = Math.max(u.value - 1, 0);
          return;
        }
        if (_.key === "Enter") {
          _.preventDefault();
          const S = $[u.value];
          S && v(S);
        }
      }
    }
    return Te(c, () => {
      u.value = 0;
    }), Te(
      () => n.modelValue,
      () => {
        y();
      },
      { immediate: !0 }
    ), t({
      focusSearch: () => r.value?.focus()
    }), (_, $) => (g(), x("div", {
      class: G(["overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] font-sans shadow-sm dark:border-[color:var(--kiut-border-light)]", e.disabled ? "pointer-events-none opacity-50" : ""])
    }, [
      d("div", Y$, [
        d("div", q$, [
          d("span", X$, [
            N(T(Fo), { class: "h-4 w-4 text-[color:var(--kiut-text-muted)] dark:text-slate-500" })
          ]),
          Xe(d("input", {
            ref_key: "searchInputRef",
            ref: r,
            "onUpdate:modelValue": $[0] || ($[0] = (S) => c.value = S),
            type: "search",
            class: G([T(et), "min-h-0 py-2 pl-9 pr-3 text-sm"]),
            placeholder: e.searchPlaceholder,
            "aria-label": e.searchPlaceholder,
            disabled: e.disabled,
            onKeydown: k
          }, null, 42, G$), [
            [Rt, c.value]
          ])
        ])
      ]),
      e.listSectionLabel ? (g(), x("p", Z$, A(e.listSectionLabel), 1)) : E("", !0),
      d("ul", {
        id: i,
        ref_key: "listRef",
        ref: l,
        role: "listbox",
        tabindex: "0",
        "aria-label": e.listSectionLabel || e.searchPlaceholder,
        class: G([e.listMaxHeightClass, "overflow-auto pb-1 outline-none"]),
        onKeydown: w
      }, [
        m.value.length === 0 ? (g(), x("li", J$, A(e.noResultsText), 1)) : E("", !0),
        (g(!0), x(de, null, pe(m.value, (S, M) => (g(), x("li", {
          key: p(S),
          role: "option",
          "aria-selected": h(S),
          class: G(b(S, M)),
          onClick: (I) => v(S),
          onMouseenter: (I) => u.value = M
        }, [
          S.flagClass ? (g(), x("span", {
            key: 0,
            class: G([S.flagClass, "shrink-0"]),
            "aria-hidden": "true"
          }, null, 2)) : E("", !0),
          d("span", t4, A(S.label), 1)
        ], 42, e4))), 128))
      ], 42, Q$)
    ], 2));
  }
}), n4 = { class: "flex flex-row gap-3 items-center" }, o4 = {
  key: 0,
  class: "mb-1.5 inline-flex shrink-0 text-[color:var(--kiut-text-muted)] [&>svg]:h-4 [&>svg]:w-4",
  "aria-hidden": "true"
}, s4 = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], i4 = { class: "min-h-[1.25rem] min-w-0 flex-1 max-h-32 overflow-y-auto py-0.5" }, r4 = {
  key: 0,
  class: "block truncate text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, l4 = {
  key: 1,
  class: "flex flex-wrap gap-1"
}, c4 = { class: "truncate" }, d4 = { class: "absolute left-0 right-0 z-50 mt-[-3px] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-lg dark:border-[color:var(--kiut-border-light)]" }, u4 = {
  key: 0,
  class: "border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-3 dark:border-[color:var(--kiut-border-light)]"
}, h4 = { class: "relative" }, f4 = {
  class: "pointer-events-none absolute inset-y-0 left-0 flex w-9 items-center justify-center",
  "aria-hidden": "true"
}, g4 = ["placeholder", "aria-label"], m4 = ["aria-checked", "disabled"], p4 = {
  key: 0,
  class: "px-3 py-2 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, b4 = ["aria-selected", "onClick", "onMouseenter"], v4 = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, y4 = { class: "min-w-0 flex-1" }, x4 = /* @__PURE__ */ ue({
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
    const a = e, n = t, o = `kiut-multiselect-${We()}`, s = `${o}-label`, i = `${o}-btn`, r = `${o}-listbox`, l = ne(null), c = ne(null), u = ne(null), f = ne(null), m = ne(!1), p = ne(0), h = ne(""), b = C(() => a.options.filter((F) => !F.disabled)), y = C(() => {
      if (!a.searchable) return b.value;
      const F = h.value.trim().toLowerCase();
      return F ? b.value.filter(
        (se) => se.label.toLowerCase().includes(F)
      ) : b.value;
    }), v = C(() => new Set(a.modelValue ?? [])), k = C(
      () => b.value.filter((F) => v.value.has(F.value)).length
    ), w = C(
      () => b.value.length > 0 && k.value === b.value.length
    ), _ = C(
      () => k.value > 0 && !w.value
    ), $ = C(
      () => _.value ? "mixed" : w.value
    ), S = C(
      () => a.options.filter((F) => v.value.has(F.value))
    ), M = C(() => {
      const F = a.ariaLabelTrigger ?? a.placeholder ?? "Seleccionar opciones", se = S.value.length;
      return se === 0 ? F : `${F}, ${se} seleccionada${se === 1 ? "" : "s"}`;
    });
    function I(F) {
      return `${String(F.value)}-${F.label}`;
    }
    function z(F) {
      return v.value.has(F.value);
    }
    function K(F, se) {
      const le = z(F), J = p.value === se;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        le ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !le && J ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function D(F) {
      const se = [...a.modelValue ?? []], le = se.indexOf(F.value);
      le >= 0 ? se.splice(le, 1) : se.push(F.value), n("update:modelValue", se);
    }
    function P() {
      const F = new Set(b.value.map((le) => le.value)), se = (a.modelValue ?? []).filter(
        (le) => !F.has(le)
      );
      n(
        "update:modelValue",
        w.value ? se : [...se, ...b.value.map((le) => le.value)]
      );
    }
    function B() {
      const F = y.value;
      if (F.length === 0) {
        p.value = 0;
        return;
      }
      const se = v.value, le = F.findIndex((J) => se.has(J.value));
      p.value = le >= 0 ? le : 0;
    }
    function H() {
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
    function j() {
      h.value = "", B(), Ke(() => H());
    }
    function X() {
      m.value = !1, h.value = "";
    }
    function re() {
      if (!a.disabled) {
        if (m.value) {
          X();
          return;
        }
        m.value = !0, j();
      }
    }
    function he(F) {
      F.stopPropagation(), !a.disabled && re();
    }
    function Z(F) {
      if (!m.value) return;
      const se = l.value;
      se && !se.contains(F.target) && X();
    }
    function oe(F) {
      a.disabled || (F.key === "ArrowDown" || F.key === "Enter" || F.key === " ") && (F.preventDefault(), m.value || (m.value = !0, j()));
    }
    function L(F) {
      const se = y.value;
      if (F.key === "Escape") {
        F.preventDefault(), X();
        return;
      }
      if (F.key === "ArrowDown") {
        if (F.preventDefault(), a.showSelectAll) {
          f.value?.focus();
          return;
        }
        if (se.length === 0) return;
        p.value = 0, c.value?.focus();
        return;
      }
      if (F.key === "ArrowUp") {
        if (F.preventDefault(), se.length === 0) return;
        p.value = se.length - 1, c.value?.focus();
        return;
      }
      if (F.key === "Enter") {
        F.preventDefault();
        const le = se[p.value];
        le && D(le);
      }
    }
    function Y(F) {
      if (F.key === "Escape") {
        F.preventDefault(), X();
        return;
      }
      if (F.key === "ArrowDown" && y.value.length > 0) {
        F.preventDefault(), p.value = 0, c.value?.focus();
        return;
      }
      F.key === "ArrowUp" && a.searchable && (F.preventDefault(), u.value?.focus());
    }
    function q(F) {
      const se = y.value;
      if (F.key === "Escape") {
        F.preventDefault(), X();
        return;
      }
      if (se.length !== 0) {
        if (F.key === "ArrowDown") {
          F.preventDefault(), p.value = Math.min(p.value + 1, se.length - 1);
          return;
        }
        if (F.key === "ArrowUp") {
          if (F.preventDefault(), p.value === 0 && a.showSelectAll) {
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
        if (F.key === "Enter" || F.key === " ") {
          F.preventDefault();
          const le = se[p.value];
          le && D(le);
        }
      }
    }
    return Te(h, () => {
      p.value = 0;
    }), Je(() => {
      document.addEventListener("click", Z);
    }), it(() => {
      document.removeEventListener("click", Z);
    }), (F, se) => (g(), x("div", {
      ref_key: "rootRef",
      ref: l,
      class: "relative font-sans"
    }, [
      d("div", n4, [
        F.$slots.icon ? (g(), x("span", o4, [
          ke(F.$slots, "icon")
        ])) : E("", !0),
        e.label ? (g(), x("label", {
          key: 1,
          id: s,
          class: G(T(lt))
        }, A(e.label), 3)) : E("", !0)
      ]),
      d("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: G([
          T(et),
          "flex items-start justify-between gap-2 text-left",
          m.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": m.value,
        "aria-haspopup": "listbox",
        "aria-controls": r,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : M.value,
        onClick: he,
        onKeydown: oe
      }, [
        d("div", i4, [
          S.value.length === 0 ? (g(), x("span", r4, A(e.placeholder), 1)) : (g(), x("div", l4, [
            (g(!0), x(de, null, pe(S.value, (le) => (g(), x("span", {
              key: I(le),
              class: "inline-flex max-w-full items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[color:var(--kiut-text-primary)] dark:bg-white/10 dark:text-slate-100"
            }, [
              d("span", c4, A(le.label), 1)
            ]))), 128))
          ]))
        ]),
        N(T(ta), {
          class: G(["mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", m.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, s4),
      Xe(d("div", d4, [
        e.searchable ? (g(), x("div", u4, [
          d("div", h4, [
            d("span", f4, [
              N(T(Fo), { class: "h-4 w-4 text-[color:var(--kiut-text-muted)] dark:text-slate-500" })
            ]),
            Xe(d("input", {
              ref_key: "searchInputRef",
              ref: u,
              "onUpdate:modelValue": se[0] || (se[0] = (le) => h.value = le),
              type: "search",
              class: G([T(et), "min-h-0 py-2 pl-9 pr-3 text-sm"]),
              placeholder: e.searchPlaceholder,
              "aria-label": e.searchPlaceholder,
              onClick: se[1] || (se[1] = Be(() => {
              }, ["stop"])),
              onKeydown: Be(L, ["stop"])
            }, null, 42, g4), [
              [Rt, h.value]
            ])
          ])
        ])) : E("", !0),
        e.showSelectAll ? (g(), x("button", {
          key: 1,
          ref_key: "selectAllRef",
          ref: f,
          type: "button",
          role: "checkbox",
          "aria-checked": $.value,
          disabled: b.value.length === 0,
          class: "flex w-full items-center gap-2 border-b border-gray-200 px-3 py-2 text-left text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none transition-colors hover:bg-slate-100 focus-visible:bg-slate-100 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[color:var(--kiut-primary)] disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:text-slate-100 dark:hover:bg-white/5 dark:focus-visible:bg-white/5",
          onClick: Be(P, ["stop"]),
          onKeydown: Y
        }, [
          d("span", {
            class: G([
              "flex h-4 w-4 shrink-0 items-center justify-center rounded border border-gray-400 transition-colors dark:border-slate-500",
              w.value || _.value ? "border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)] text-white dark:border-[color:var(--kiut-primary)]" : ""
            ]),
            "aria-hidden": "true"
          }, [
            _.value ? (g(), ae(T(kb), {
              key: 0,
              class: "h-3 w-3"
            })) : w.value ? (g(), ae(T(Bn), {
              key: 1,
              class: "h-3 w-3"
            })) : E("", !0)
          ], 2),
          d("span", null, A(e.selectAllLabel), 1)
        ], 40, m4)) : E("", !0),
        d("ul", {
          id: r,
          ref_key: "listRef",
          ref: c,
          role: "listbox",
          tabindex: "-1",
          "aria-multiselectable": "true",
          class: "max-h-60 overflow-auto py-1",
          onKeydown: Be(q, ["stop"])
        }, [
          y.value.length === 0 ? (g(), x("li", p4, A(e.noResultsText), 1)) : E("", !0),
          (g(!0), x(de, null, pe(y.value, (le, J) => (g(), x("li", {
            key: I(le),
            role: "option",
            "aria-selected": z(le),
            class: G(K(le, J)),
            onClick: Be((R) => D(le), ["stop"]),
            onMouseenter: (R) => p.value = J
          }, [
            d("span", v4, [
              z(le) ? (g(), ae(T(Bn), {
                key: 0,
                class: "h-4 w-4 text-white"
              })) : E("", !0)
            ]),
            d("span", y4, A(le.label), 1)
          ], 42, b4))), 128))
        ], 544)
      ], 512), [
        [Ht, m.value]
      ])
    ], 512));
  }
}), k4 = { class: "font-sans" }, _4 = ["for"], w4 = { class: "flex gap-2" }, C4 = { class: "w-[7.5rem] shrink-0" }, $4 = { class: "min-w-0 flex-1" }, S4 = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], M4 = ["id"], D4 = /* @__PURE__ */ ue({
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
    const a = e, n = t, o = `kiut-phone-${We()}`, s = C(() => a.id ?? `${o}-num`), i = C(() => `${s.value}-err`), r = C({
      get: () => a.modelValue.prefix,
      set: (c) => n("update:modelValue", { ...a.modelValue, prefix: c })
    }), l = C({
      get: () => a.modelValue.number,
      set: (c) => n("update:modelValue", { ...a.modelValue, number: c })
    });
    return (c, u) => (g(), x("div", k4, [
      e.label ? (g(), x("label", {
        key: 0,
        for: s.value,
        class: G(T(lt))
      }, A(e.label), 11, _4)) : E("", !0),
      d("div", w4, [
        d("div", C4, [
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
        d("div", $4, [
          Xe(d("input", {
            id: s.value,
            "onUpdate:modelValue": u[1] || (u[1] = (f) => l.value = f),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: G([T(et), e.invalid ? T(Dt) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, S4), [
            [Rt, l.value]
          ])
        ])
      ]),
      e.errorText ? (g(), x("p", {
        key: 1,
        id: i.value,
        class: G(T(At)),
        role: "alert"
      }, A(e.errorText), 11, M4)) : E("", !0)
    ]));
  }
}), A4 = ["role", "aria-label"], T4 = { class: "flex flex-wrap gap-2" }, B4 = ["aria-checked", "role", "onClick"], L4 = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, R4 = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, P4 = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, I4 = /* @__PURE__ */ ue({
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
      d("div", T4, [
        (g(!0), x(de, null, pe(e.items, (u) => (g(), x("button", {
          key: u.value,
          type: "button",
          class: G(i(u)),
          "aria-checked": s(u),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (f) => r(u)
        }, [
          d("span", L4, [
            s(u) ? (g(), x("span", R4)) : E("", !0)
          ]),
          u.dotColor ? (g(), x("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: we({ backgroundColor: u.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : E("", !0),
          d("span", P4, A(u.label), 1)
        ], 10, B4))), 128))
      ])
    ], 8, A4));
  }
}), E4 = ["aria-label"], F4 = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], O4 = { class: "truncate px-3 py-2 text-sm font-medium" }, V4 = /* @__PURE__ */ ue({
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
    function u(b) {
      b.disabled || b.value !== a.modelValue && n("update:modelValue", b.value);
    }
    function f(b, y, v) {
      u(b), Ke(() => i.value[y]?.focus());
    }
    const m = C(
      () => a.items.map((b, y) => b.disabled ? -1 : y).filter((b) => b >= 0)
    );
    function p(b, y) {
      const v = a.items.length;
      if (v === 0) return 0;
      let k = b;
      for (let w = 0; w < v; w++)
        if (k = (k + y + v) % v, !a.items[k]?.disabled) return k;
      return b;
    }
    function h(b, y) {
      if (b.key === "ArrowRight" || b.key === "ArrowDown") {
        b.preventDefault();
        const v = p(y, 1), k = a.items[v];
        k && u(k), Ke(() => i.value[v]?.focus());
      } else if (b.key === "ArrowLeft" || b.key === "ArrowUp") {
        b.preventDefault();
        const v = p(y, -1), k = a.items[v];
        k && u(k), Ke(() => i.value[v]?.focus());
      } else if (b.key === "Home") {
        b.preventDefault();
        const v = m.value[0];
        if (v !== void 0) {
          const k = a.items[v];
          k && u(k), Ke(() => i.value[v]?.focus());
        }
      } else if (b.key === "End") {
        b.preventDefault();
        const v = m.value[m.value.length - 1];
        if (v !== void 0) {
          const k = a.items[v];
          k && u(k), Ke(() => i.value[v]?.focus());
        }
      }
    }
    return (b, y) => (g(), x("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-[color:var(--kiut-border-light)]"
    }, [
      (g(!0), x(de, null, pe(e.items, (v, k) => (g(), x("button", {
        id: s(v.value),
        key: v.value,
        ref_for: !0,
        ref: (w) => r(w, k),
        type: "button",
        role: "tab",
        "aria-selected": l(v),
        "aria-disabled": v.disabled === !0,
        tabindex: l(v) ? 0 : -1,
        class: G(c(v)),
        onClick: (w) => f(v, k),
        onKeydown: (w) => h(w, k)
      }, [
        d("span", O4, A(v.label), 1)
      ], 42, F4))), 128))
    ], 8, E4));
  }
}), z4 = ["aria-expanded", "aria-labelledby", "aria-label"], N4 = ["onKeydown"], j4 = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, H4 = { class: "mb-4 flex items-center justify-between gap-2" }, W4 = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, K4 = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, U4 = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, Y4 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, q4 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, X4 = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, G4 = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, Z4 = { class: "grid grid-cols-7 gap-y-2 mt-2" }, Q4 = ["disabled", "onClick"], J4 = "rounded-lg text-[#61616b]", eS = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", tS = "opacity-30", aS = "bg-[#6b35e9] font-medium text-white", nS = "bg-[#895af6] font-semibold text-white", oS = /* @__PURE__ */ ue({
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
    const a = e, n = t, s = `${`kiut-drp-${We()}`}-lbl`, i = ne(null), r = ne(null), l = ne(!1), c = ne(null), u = ne(kt(/* @__PURE__ */ new Date())), f = C(() => !!(a.modelValue.start && a.modelValue.end)), m = C(() => {
      const D = kt(u.value);
      return [D, Ma(D, 1)];
    }), p = C(() => a.ariaLabel ?? a.placeholder), h = C(() => {
      const D = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return a.panelAlign === "end" ? `right-0 left-auto ${D}` : `left-0 right-auto ${D}`;
    }), b = C(
      () => `${Nt(m.value[0])} – ${Nt(m.value[1])}`
    ), y = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], v = C(() => {
      if (!a.modelValue.start || !a.modelValue.end) return a.placeholder;
      const D = at(a.modelValue.start), P = at(a.modelValue.end);
      return `${Ln(D)} – ${Ln(P)}`;
    });
    function k(D, P) {
      return D.getMonth() === P.getMonth() && D.getFullYear() === P.getFullYear();
    }
    function w(D) {
      const P = Ve(D);
      if (a.minDate) {
        const B = Ve(at(a.minDate));
        if (jt(P, B)) return !0;
      }
      if (a.maxDate) {
        const B = Ve(at(a.maxDate));
        if (jt(B, P)) return !0;
      }
      return !1;
    }
    function _(D, P, B) {
      const H = mt(D, P), j = mt(D, B);
      if (H && j) return "rounded-lg";
      const X = H || D.getDay() === 0, re = j || D.getDay() === 6;
      return X && re ? "rounded-lg" : X ? "rounded-l-lg" : re ? "rounded-r-lg" : "rounded-none";
    }
    function $(D, P) {
      const B = k(P, D), H = w(P), j = a.modelValue.start ? Ve(at(a.modelValue.start)) : null, X = a.modelValue.end ? Ve(at(a.modelValue.end)) : null, re = Ve(P);
      if (H)
        return J4;
      let he = eS;
      if (j && X && Nr(re, j) && jr(re, X)) {
        const oe = mt(re, j), L = mt(re, X);
        he = `${_(re, j, X)} ${oe || L ? nS : aS}`;
      }
      return B || (he = `${he} ${tS}`), he;
    }
    function S(D) {
      if (w(D)) return;
      const P = Ve(D);
      if (!c.value) {
        c.value = new Date(P), n("update:modelValue", { start: nt(P), end: nt(P) });
        return;
      }
      let H = Ve(c.value), j = new Date(P);
      jt(j, H) && ([H, j] = [j, H]), n("update:modelValue", { start: nt(H), end: nt(j) }), c.value = null, l.value = !1;
    }
    function M(D) {
      u.value = Ma(u.value, D);
    }
    function I() {
      l.value = !1;
    }
    function z(D) {
      if (D?.stopPropagation(), !l.value) {
        if (l.value = !0, c.value = null, a.modelValue.start)
          try {
            u.value = kt(at(a.modelValue.start));
          } catch {
          }
        Ke(() => r.value?.focus());
      }
    }
    function K(D) {
      if (!l.value) return;
      const P = i.value;
      P && !P.contains(D.target) && (l.value = !1);
    }
    return Te(l, (D) => {
      D && (c.value = null);
    }), Je(() => {
      document.addEventListener("click", K);
    }), it(() => {
      document.removeEventListener("click", K);
    }), (D, P) => (g(), x("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (g(), x("label", {
        key: 0,
        id: s,
        class: G(T(lt))
      }, A(e.label), 3)) : E("", !0),
      d("button", {
        type: "button",
        class: G([
          T(et),
          "flex w-full items-center gap-2 text-left",
          l.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": l.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : p.value,
        onFocus: z,
        onClick: z
      }, [
        N(T(Po), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        d("span", {
          class: G([
            "min-w-0 flex-1 truncate",
            f.value ? "" : "text-[color:var(--kiut-text-muted)] dark:text-slate-500"
          ])
        }, A(v.value), 3)
      ], 42, z4),
      Xe(d("div", {
        ref_key: "panelRef",
        ref: r,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": "Calendario de rango",
        class: G([
          h.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: Ca(Be(I, ["stop"]), ["escape"])
      }, [
        d("div", j4, [
          d("div", H4, [
            d("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes anterior",
              onClick: P[0] || (P[0] = (B) => M(-1))
            }, [
              N(T(Io), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ]),
            d("div", W4, [
              d("span", K4, A(b.value), 1),
              d("div", U4, [
                d("span", Y4, A(T(Nt)(m.value[0])), 1),
                d("span", q4, A(T(Nt)(m.value[1])), 1)
              ])
            ]),
            d("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes siguiente",
              onClick: P[1] || (P[1] = (B) => M(1))
            }, [
              N(T(Eo), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ])
          ]),
          d("div", X4, [
            (g(!0), x(de, null, pe(m.value, (B) => (g(), x("div", {
              key: `${B.getFullYear()}-${B.getMonth()}`,
              class: "w-full max-w-[252px] shrink-0"
            }, [
              d("div", G4, [
                (g(), x(de, null, pe(y, (H) => d("span", { key: H }, A(H), 1)), 64))
              ]),
              d("div", Z4, [
                (g(!0), x(de, null, pe(T(Hr)(B), (H) => (g(), x("button", {
                  key: T(nt)(H),
                  type: "button",
                  disabled: w(H),
                  class: G(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", $(B, H)]),
                  onClick: (j) => S(H)
                }, A(H.getDate()), 11, Q4))), 128))
              ])
            ]))), 128))
          ])
        ])
      ], 42, N4), [
        [Ht, l.value]
      ])
    ], 512));
  }
}), sS = ["aria-expanded", "aria-labelledby", "aria-label"], iS = ["aria-label", "onKeydown"], rS = { class: "flex flex-col sm:flex-row" }, lS = ["aria-label"], cS = { class: "px-2 pt-1 pb-1.5 text-[10px] font-semibold uppercase dark:text-[#61616b] text-[#e3e3e8]" }, dS = { class: "flex flex-col gap-0.5" }, uS = ["onClick"], hS = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, fS = { class: "mb-4 flex items-center justify-between gap-2" }, gS = ["aria-label"], mS = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, pS = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, bS = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, vS = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, yS = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, xS = ["aria-label"], kS = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, _S = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, wS = { class: "grid grid-cols-7 gap-y-2 mt-2" }, CS = ["disabled", "onClick"], $S = "rounded-lg text-[#61616b]", SS = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", MS = "opacity-30", DS = "bg-[#6b35e9] font-medium text-white", AS = "bg-[#895af6] font-semibold text-white", TS = /* @__PURE__ */ ue({
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
    const a = e, n = t, s = `${`kiut-dpp-${We()}`}-lbl`, i = ne(null), r = ne(null), l = ne(!1), c = ne(null), u = ne(kt(/* @__PURE__ */ new Date())), f = C(() => !!(a.modelValue.start && a.modelValue.end)), m = C(() => {
      const oe = kt(u.value);
      return [oe, Ma(oe, 1)];
    }), p = C(
      () => a.placeholder ?? (a.locale === "es" ? "Seleccionar fechas" : "Select dates")
    ), h = C(() => a.ariaLabel ?? p.value), b = C(() => Or(a.locale)), y = C(() => xC(a.locale)), v = C(() => vC(a.locale)), k = C(
      () => a.locale === "es" ? "Preajustes de rango" : "Range presets"
    ), w = C(
      () => a.locale === "es" ? "Mes anterior" : "Previous month"
    ), _ = C(
      () => a.locale === "es" ? "Mes siguiente" : "Next month"
    ), $ = C(
      () => a.locale === "es" ? "Calendario de rango con preajustes" : "Date range calendar with presets"
    ), S = C(() => {
      const oe = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return a.panelAlign === "end" ? `right-0 left-auto ${oe}` : `left-0 right-auto ${oe}`;
    }), M = C(
      () => `${Nt(m.value[0], a.locale)} – ${Nt(m.value[1], a.locale)}`
    ), I = C(() => {
      if (!a.modelValue.start || !a.modelValue.end) return p.value;
      const oe = at(a.modelValue.start), L = at(a.modelValue.end);
      return `${Ln(oe, a.locale)} – ${Ln(L, a.locale)}`;
    });
    function z(oe, L) {
      return oe.getMonth() === L.getMonth() && oe.getFullYear() === L.getFullYear();
    }
    function K(oe) {
      const L = Ve(oe);
      if (a.minDate) {
        const Y = Ve(at(a.minDate));
        if (jt(L, Y)) return !0;
      }
      if (a.maxDate) {
        const Y = Ve(at(a.maxDate));
        if (jt(Y, L)) return !0;
      }
      return !1;
    }
    function D(oe, L, Y) {
      const q = mt(oe, L), F = mt(oe, Y);
      if (q && F) return "rounded-lg";
      const se = q || oe.getDay() === 0, le = F || oe.getDay() === 6;
      return se && le ? "rounded-lg" : se ? "rounded-l-lg" : le ? "rounded-r-lg" : "rounded-none";
    }
    function P(oe) {
      const L = wC(
        a.modelValue,
        oe,
        /* @__PURE__ */ new Date(),
        a.minDate,
        a.maxDate
      ), Y = "text-[#61616b] hover:bg-[#efeff0b3] dark:text-[#e3e3e8] dark:hover:bg-[#23232fb3]";
      return L ? `${Y} font-medium` : Y;
    }
    function B(oe, L) {
      const Y = z(L, oe), q = K(L), F = a.modelValue.start ? Ve(at(a.modelValue.start)) : null, se = a.modelValue.end ? Ve(at(a.modelValue.end)) : null, le = Ve(L);
      if (q)
        return $S;
      let J = SS;
      if (F && se && Nr(le, F) && jr(le, se)) {
        const W = mt(le, F), ie = mt(le, se);
        J = `${D(le, F, se)} ${W || ie ? AS : DS}`;
      }
      return Y || (J = `${J} ${MS}`), J;
    }
    function H(oe) {
      const L = zr(Vr(oe), a.minDate, a.maxDate);
      n("update:modelValue", {
        start: nt(L.start),
        end: nt(L.end)
      }), u.value = kt(L.start), c.value = null, l.value = !1;
    }
    function j(oe) {
      if (K(oe)) return;
      const L = Ve(oe);
      if (!c.value) {
        c.value = new Date(L), n("update:modelValue", { start: nt(L), end: nt(L) });
        return;
      }
      let q = Ve(c.value), F = new Date(L);
      jt(F, q) && ([q, F] = [F, q]), n("update:modelValue", { start: nt(q), end: nt(F) }), c.value = null, l.value = !1;
    }
    function X(oe) {
      u.value = Ma(u.value, oe);
    }
    function re() {
      l.value = !1;
    }
    function he(oe) {
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
    function Z(oe) {
      if (!l.value) return;
      const L = i.value;
      L && !L.contains(oe.target) && (l.value = !1);
    }
    return Te(l, (oe) => {
      oe && (c.value = null);
    }), Je(() => {
      document.addEventListener("click", Z);
    }), it(() => {
      document.removeEventListener("click", Z);
    }), (oe, L) => (g(), x("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (g(), x("label", {
        key: 0,
        id: s,
        class: G(T(lt))
      }, A(e.label), 3)) : E("", !0),
      d("button", {
        type: "button",
        class: G([
          T(et),
          "group flex w-full items-center gap-2 text-left hover:bg-[#6b35e9] hover:text-white",
          l.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": l.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : h.value,
        onClick: he
      }, [
        N(T(Po), {
          class: "h-5 w-5 shrink-0 text-gray-500 transition-colors group-hover:text-white dark:text-slate-400",
          "aria-hidden": "true"
        }),
        d("span", {
          class: G([
            "min-w-0 flex-1 truncate",
            f.value ? "" : "text-[color:var(--kiut-text-muted)] group-hover:text-white dark:text-slate-500"
          ])
        }, A(I.value), 3)
      ], 10, sS),
      Xe(d("div", {
        ref_key: "panelRef",
        ref: r,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": $.value,
        class: G([
          S.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: Ca(Be(re, ["stop"]), ["escape"])
      }, [
        d("div", rS, [
          d("aside", {
            class: "w-full shrink-0 border-b border-gray-200 p-3 sm:w-[176px] sm:border-r sm:border-b-0 dark:border-[color:var(--kiut-border-light)]",
            "aria-label": k.value
          }, [
            d("p", cS, A(y.value), 1),
            d("ul", dS, [
              (g(!0), x(de, null, pe(b.value, (Y) => (g(), x("li", {
                key: Y.id
              }, [
                d("button", {
                  type: "button",
                  class: G(["w-full rounded-lg px-2 py-1.5 text-left text-xs transition focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", P(Y.id)]),
                  onClick: (q) => H(Y.id)
                }, A(Y.label), 11, uS)
              ]))), 128))
            ])
          ], 8, lS),
          d("div", hS, [
            d("div", fS, [
              d("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": w.value,
                onClick: L[0] || (L[0] = (Y) => X(-1))
              }, [
                N(T(Io), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, gS),
              d("div", mS, [
                d("span", pS, A(M.value), 1),
                d("div", bS, [
                  d("span", vS, A(T(Nt)(m.value[0], e.locale)), 1),
                  d("span", yS, A(T(Nt)(m.value[1], e.locale)), 1)
                ])
              ]),
              d("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": _.value,
                onClick: L[1] || (L[1] = (Y) => X(1))
              }, [
                N(T(Eo), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, xS)
            ]),
            d("div", kS, [
              (g(!0), x(de, null, pe(m.value, (Y) => (g(), x("div", {
                key: `${Y.getFullYear()}-${Y.getMonth()}`,
                class: "w-full max-w-[252px] shrink-0"
              }, [
                d("div", _S, [
                  (g(!0), x(de, null, pe(v.value, (q) => (g(), x("span", { key: q }, A(q), 1))), 128))
                ]),
                d("div", wS, [
                  (g(!0), x(de, null, pe(T(Hr)(Y), (q) => (g(), x("button", {
                    key: T(nt)(q),
                    type: "button",
                    disabled: K(q),
                    class: G(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", B(Y, q)]),
                    onClick: (F) => j(q)
                  }, A(q.getDate()), 11, CS))), 128))
                ])
              ]))), 128))
            ])
          ])
        ])
      ], 42, iS), [
        [Ht, l.value]
      ])
    ], 512));
  }
}), BS = { class: "kiut-translation-count-badge__content" }, LS = { class: "kiut-translation-count-badge__title" }, RS = { class: "kiut-translation-count-badge__pills" }, PS = {
  key: 0,
  class: "kiut-translation-count-badge__pill-note"
}, xn = 8, xa = 12, IS = /* @__PURE__ */ ue({
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
    }), s = ne(null), i = ne(null), r = C(() => {
      const p = "whitespace-nowrap rounded-md px-2 py-0.5 text-xs cursor-default font-['Inter',system-ui,sans-serif]";
      return t.variant === "configured" ? `${p} border border-purple-300 text-purple-700 dark:border-purple-700/50 dark:text-purple-400` : t.variant === "autoconfigured" ? `${p} border border-dashed border-green-400 text-green-600 dark:border-green-600 dark:text-green-400` : `${p} border border-gray-500/40 text-gray-500 dark:border-gray-600 dark:text-gray-400`;
    }), l = C(
      () => `kiut-translation-count-badge__pill kiut-translation-count-badge__pill--${t.variant}`
    );
    function c() {
      a.value = !1;
    }
    function u() {
      const p = s.value, h = i.value;
      if (!p || !h) return;
      const b = p.getBoundingClientRect(), y = h.getBoundingClientRect(), v = b.top - xa, k = window.innerHeight - b.bottom - xa, w = v >= y.height + xn, _ = k >= y.height + xn;
      let $ = "top";
      w ? $ = "top" : _ ? $ = "bottom" : $ = k >= v ? "bottom" : "top", n.value = $;
      let S = $ === "top" ? b.top - y.height - xn : b.bottom + xn;
      S = Math.max(
        xa,
        Math.min(S, window.innerHeight - y.height - xa)
      );
      let M = b.left + b.width / 2 - y.width / 2;
      M = Math.max(
        xa,
        Math.min(M, window.innerWidth - y.width - xa)
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
    return window.addEventListener("scroll", m, !0), window.addEventListener("resize", m), it(() => {
      window.removeEventListener("scroll", m, !0), window.removeEventListener("resize", m);
    }), (p, h) => (g(), x(de, null, [
      d("span", {
        ref_key: "triggerRef",
        ref: s,
        class: G([r.value, e.pulse && "animate-pulse"]),
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
          class: G(["kiut-translation-count-badge__tooltip", `kiut-translation-count-badge__tooltip--${n.value}`]),
          style: we({
            position: "fixed",
            top: o.value.top,
            left: o.value.left,
            zIndex: 1100
          }),
          onMouseenter: f,
          onMouseleave: c
        }, [
          d("div", BS, [
            d("span", LS, A(e.tooltipTitle), 1),
            d("div", RS, [
              (g(!0), x(de, null, pe(e.items, (b) => (g(), x("span", {
                key: b.id,
                class: G(l.value)
              }, [
                Ae(A(b.label) + " ", 1),
                b.note ? (g(), x("span", PS, " (" + A(b.note) + ") ", 1)) : E("", !0)
              ], 2))), 128))
            ])
          ])
        ], 38)) : E("", !0)
      ]))
    ], 64));
  }
}), ES = ["disabled", "aria-expanded", "aria-label"], FS = { class: "min-w-0 flex-1 truncate" }, OS = ["aria-selected", "onClick", "onMouseenter"], VS = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, zS = { class: "min-w-0 flex-1" }, NS = /* @__PURE__ */ ue({
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
    const a = e, n = t, s = `${`kiut-tag-select-${We()}`}-listbox`, i = ne(null), r = ne(null), l = ne(null), c = ne(null), u = ne(!1), f = ne(0), m = ne({}), p = C(() => a.options.filter((X) => !X.disabled)), h = C(
      () => a.options.find((X) => X.value === a.modelValue) ?? null
    ), b = C(() => h.value?.color ?? "neutral"), y = C(
      () => _r(b.value, a.outlined)
    ), v = C(() => h.value ? h.value.label : a.modelValue !== null && a.modelValue !== void 0 && a.modelValue !== "" ? String(a.modelValue) : p.value[0]?.label ?? "Seleccionar…"), k = C(
      () => a.ariaLabel ?? `Estado: ${v.value}`
    );
    function w() {
      const X = r.value;
      if (!X) return;
      const re = X.getBoundingClientRect();
      m.value = {
        top: `${re.bottom + 4}px`,
        left: `${re.left}px`,
        minWidth: `${re.width}px`
      };
    }
    function _(X) {
      return `${String(X.value)}-${X.label}`;
    }
    function $(X) {
      return a.modelValue === X.value;
    }
    function S(X, re) {
      const he = $(X), Z = f.value === re;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        he ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !he && Z ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function M() {
      f.value = Math.max(
        0,
        p.value.findIndex((X) => X.value === a.modelValue)
      );
    }
    function I() {
      w(), M(), Ke(() => c.value?.focus());
    }
    function z() {
      u.value = !1;
    }
    function K(X) {
      n("update:modelValue", X.value), z();
    }
    function D() {
      if (!a.disabled) {
        if (u.value) {
          z();
          return;
        }
        u.value = !0, I();
      }
    }
    function P(X) {
      X.stopPropagation(), !a.disabled && D();
    }
    function B(X) {
      if (!u.value) return;
      const re = X.target, he = i.value, Z = l.value;
      he && !he.contains(re) && (!Z || !Z.contains(re)) && z();
    }
    function H(X) {
      a.disabled || (X.key === "ArrowDown" || X.key === "Enter" || X.key === " ") && (X.preventDefault(), u.value || (u.value = !0, I()));
    }
    function j(X) {
      const re = p.value;
      if (X.key === "Escape") {
        X.preventDefault(), z(), r.value?.focus();
        return;
      }
      if (re.length !== 0) {
        if (X.key === "ArrowDown") {
          X.preventDefault(), f.value = Math.min(f.value + 1, re.length - 1);
          return;
        }
        if (X.key === "ArrowUp") {
          X.preventDefault(), f.value = Math.max(f.value - 1, 0);
          return;
        }
        if (X.key === "Enter") {
          X.preventDefault();
          const he = re[f.value];
          he && K(he);
        }
      }
    }
    return Je(() => {
      document.addEventListener("click", B);
    }), it(() => {
      document.removeEventListener("click", B);
    }), (X, re) => (g(), x("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative inline-flex font-sans"
    }, [
      d("button", {
        ref_key: "buttonRef",
        ref: r,
        type: "button",
        disabled: e.disabled,
        class: G([
          T(kr),
          "cursor-pointer gap-1.5 transition-opacity disabled:cursor-not-allowed disabled:opacity-50",
          y.value,
          u.value ? "ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": u.value,
        "aria-haspopup": "listbox",
        "aria-controls": s,
        "aria-label": k.value,
        onClick: P,
        onKeydown: H
      }, [
        d("span", FS, A(v.value), 1),
        N(T(ta), {
          class: G(["h-3.5 w-3.5 shrink-0 opacity-70 transition-transform", u.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, ES),
      (g(), ae(Qt, { to: "body" }, [
        Xe(d("div", {
          ref_key: "panelRef",
          ref: l,
          style: we(m.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]"
        }, [
          d("ul", {
            id: s,
            ref_key: "listRef",
            ref: c,
            role: "listbox",
            tabindex: "-1",
            onKeydown: Be(j, ["stop"])
          }, [
            (g(!0), x(de, null, pe(p.value, (he, Z) => (g(), x("li", {
              key: _(he),
              role: "option",
              "aria-selected": $(he),
              class: G(S(he, Z)),
              onClick: Be((oe) => K(he), ["stop"]),
              onMouseenter: (oe) => f.value = Z
            }, [
              d("span", VS, [
                $(he) ? (g(), ae(T(Bn), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : E("", !0)
              ]),
              d("span", zS, A(he.label), 1)
            ], 42, OS))), 128))
          ], 544)
        ], 4), [
          [Ht, u.value]
        ])
      ]))
    ], 512));
  }
}), jS = ["aria-label"], HS = { class: "flex flex-col gap-1" }, WS = { class: "flex flex-row gap-3 items-center" }, KS = {
  key: 0,
  class: "flex flex-row gap-1 items-center"
}, US = {
  key: 1,
  class: "flex flex-row gap-1 items-center"
}, YS = /* @__PURE__ */ ue({
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
      warning: Ew,
      info: Fw,
      success: Iw,
      feature: Vw,
      danger: zw
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
    }, s = C(() => o[a.variant]), i = C(() => n[a.variant]);
    return (r, l) => (g(), x("div", {
      role: "region",
      "aria-label": e.title,
      class: G([
        s.value.container,
        T(t).class,
        "p-4 flex flex-row gap-2 justify-start items-start border rounded-xl"
      ])
    }, [
      d("div", {
        class: G([
          s.value.container_icon,
          "p-2 rounded-4xl flex justify-center items-center"
        ])
      }, [
        d("span", {
          class: G([
            s.value.icon,
            "inline-flex shrink-0 [&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"
          ]),
          "aria-hidden": "true"
        }, [
          ke(r.$slots, "icon", {}, () => [
            (g(), ae(ht(i.value)))
          ])
        ], 2)
      ], 2),
      d("div", HS, [
        d("h1", {
          class: G([s.value.title, "text-base font-bold"])
        }, A(a.title), 3),
        d("span", {
          class: G([s.value.description, "text-sm leading-snug"])
        }, A(a.description), 3),
        d("div", WS, [
          a.date_start ? (g(), x("div", KS, [
            d("span", {
              class: G([
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
              class: G([s.value.subtitle_date, "text-xs font-bold"])
            }, A(a.subtitle_date_start), 3)) : E("", !0),
            d("span", {
              class: G([s.value.date, "text-xs"])
            }, A(a.date_start), 3)
          ])) : E("", !0),
          a.date_final ? (g(), x("div", US, [
            d("span", {
              class: G([
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
              class: G([s.value.subtitle_date, "text-xs font-bold"])
            }, A(a.subtitle_date_final), 3)) : E("", !0),
            d("span", {
              class: G([s.value.date, "text-xs"])
            }, A(a.date_final), 3)
          ])) : E("", !0)
        ])
      ])
    ], 10, jS));
  }
}), qS = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, XS = ["id"], GS = { class: "min-w-0 flex-1 space-y-1" }, ZS = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, QS = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-6" }, JS = { class: "flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2" }, eM = /* @__PURE__ */ ue({
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
    const a = e, n = C(() => ({ maxWidth: `${a.width}px` })), o = t, i = `${`kiut-modal-${We()}`}-title`, r = ne(null);
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
    }), it(() => {
      document.removeEventListener("keydown", u);
    }), (f, m) => (g(), ae(Qt, { to: "body" }, [
      N(pt, { name: "kiut-modal" }, {
        default: O(() => [
          e.modelValue ? (g(), x("div", qS, [
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
              style: we(n.value),
              onClick: m[0] || (m[0] = Be(() => {
              }, ["stop"]))
            }, [
              d("header", {
                class: G(["flex shrink-0 justify-between gap-4 bg-slate-50/50 px-6 py-5 dark:bg-white/[0.02]", [
                  e.subtitle ? "items-start" : "items-center",
                  e.headerBorder ? "border-b border-slate-100 dark:border-[color:var(--kiut-border-light)]" : ""
                ]])
              }, [
                d("div", GS, [
                  d("h2", {
                    id: i,
                    class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                  }, A(e.title), 1),
                  e.subtitle ? (g(), x("p", ZS, A(e.subtitle), 1)) : E("", !0)
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
              d("div", QS, [
                ke(f.$slots, "default", {}, void 0, !0)
              ]),
              d("footer", JS, [
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
            ], 12, XS)
          ])) : E("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), tM = /* @__PURE__ */ ve(eM, [["__scopeId", "data-v-ae2266d6"]]), aM = { class: "text-left font-['Inter',system-ui,sans-serif]" }, nM = {
  key: 0,
  class: ""
}, oM = {
  key: 0,
  class: "flex min-w-0 flex-col gap-1.5 mb-4"
}, sM = { class: "flex min-w-0 flex-1 items-center" }, iM = {
  key: 0,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, rM = {
  key: 0,
  class: "flex min-w-0 flex-1 flex-wrap items-center gap-2"
}, lM = {
  key: 1,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, cM = /* @__PURE__ */ ue({
  name: "Section",
  __name: "Section",
  setup(e) {
    const t = ho(), a = C(() => {
      const n = !!t.filters, o = !!t.actions;
      return n && o ? "justify-between" : o ? "justify-end" : "";
    });
    return (n, o) => (g(), x("section", aM, [
      n.$slots.description || n.$slots.tabs || n.$slots.filters || n.$slots.actions ? (g(), x("header", nM, [
        n.$slots.description ? (g(), x("div", oM, [
          ke(n.$slots, "description")
        ])) : E("", !0),
        n.$slots.tabs ? (g(), x("div", {
          key: 1,
          class: G(["flex flex-wrap items-center gap-2", n.$slots.filters ? "" : "justify-between"])
        }, [
          d("div", sM, [
            ke(n.$slots, "tabs")
          ]),
          n.$slots.actions && !n.$slots.filters ? (g(), x("div", iM, [
            ke(n.$slots, "actions")
          ])) : E("", !0)
        ], 2)) : E("", !0),
        n.$slots.filters || n.$slots.actions && !n.$slots.tabs ? (g(), x("div", {
          key: 2,
          class: G([
            "flex flex-wrap gap-2 items-center",
            n.$slots.tabs ? "mt-2" : "",
            a.value
          ])
        }, [
          n.$slots.filters ? (g(), x("div", rM, [
            ke(n.$slots, "filters")
          ])) : E("", !0),
          n.$slots.actions ? (g(), x("div", lM, [
            ke(n.$slots, "actions")
          ])) : E("", !0)
        ], 2)) : E("", !0)
      ])) : E("", !0),
      n.$slots.content || n.$slots.default ? (g(), x("div", {
        key: 1,
        class: G({
          "mt-6": n.$slots.description || n.$slots.tabs || n.$slots.filters || n.$slots.actions
        })
      }, [
        ke(n.$slots, "content", {}, () => [
          ke(n.$slots, "default")
        ])
      ], 2)) : E("", !0)
    ]));
  }
}), dM = { class: "flex flex-1 min-h-0" }, uM = {
  key: 0,
  class: "flex justify-center items-center my-4 shrink-0"
}, hM = {
  class: "flex-1 overflow-y-auto p-1 flex flex-col gap-1",
  "aria-label": "Sections"
}, fM = ["aria-current", "data-has-active", "title", "onClick"], gM = {
  key: 1,
  class: "footer-section shrink-0 border-t [background-color:var(--kiut-lateral-bg)]"
}, mM = { class: "px-4 py-4 shrink-0" }, pM = { class: "text-[12px] font-bold uppercase tracking-widest text-start [color:var(--kiut-text-subtitle)]" }, bM = {
  class: "flex-1 overflow-y-auto px-1 pb-3 flex flex-col gap-0.5",
  "aria-label": "Section items"
}, vM = ["data-nav-id", "aria-current", "onClick"], yM = { class: "flex items-center justify-between px-5 py-3 shrink-0" }, xM = { class: "text-xs font-bold uppercase tracking-widest [color:var(--kiut-text-muted)]" }, kM = {
  class: "overflow-y-auto flex-1 px-3 pb-5 flex flex-col gap-1",
  "aria-label": "Section items"
}, _M = ["data-nav-id", "aria-current", "onClick"], wM = { class: "truncate text-[15px]" }, CM = ["aria-current", "data-has-active", "onClick"], $M = {
  key: 0,
  class: "absolute top-0 w-1/2 h-0.5 rounded-full [background-color:var(--kiut-primary)]",
  "aria-hidden": "true"
}, SM = { class: "text-[9px] font-semibold leading-none truncate w-full text-center px-0.5" }, MM = /* @__PURE__ */ ue({
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
    }), it(() => {
      window.removeEventListener("resize", c);
    });
    const u = C(() => {
      const v = n.sections.find((k) => k.id === n.selectedSectionId);
      return v?.items?.length ? v : null;
    });
    function f(v) {
      return n.activePath ? n.activePath === v.path || n.activePath.startsWith(v.path + "/") : !1;
    }
    function m(v) {
      return v.items?.length ? v.items.some(f) : !n.activePath || !v.path ? !1 : n.activePath === v.path || n.activePath.startsWith(v.path + "/");
    }
    function p(v) {
      if (!v.items?.length) {
        o("update:selectedSectionId", null), o("navigate", {
          section: v,
          item: { id: v.id, label: v.label, path: v.path }
        });
        return;
      }
      const k = n.selectedSectionId === v.id ? null : v.id;
      o("update:selectedSectionId", k);
    }
    function h(v, k) {
      o("navigate", { section: v, item: k });
    }
    function b() {
      o("update:selectedSectionId", null);
    }
    function y(v, k) {
      h(v, k), b();
    }
    return (v, k) => l.value ? (g(), x("div", yt({
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
          })) : E("", !0)
        ]),
        _: 1
      }),
      N(pt, { name: "ksn-sheet" }, {
        default: O(() => [
          u.value ? (g(), x("div", {
            key: 0,
            class: "mobile-subsections fixed left-0 right-0 bottom-0 z-50 [background-color:var(--kiut-lateral-bg)] rounded-t-2xl shadow-2xl border-t max-h-[70vh] flex flex-col",
            style: we({ paddingBottom: n.mobileBarHeight })
          }, [
            k[3] || (k[3] = d("div", { class: "flex justify-center pt-3 pb-1 shrink-0" }, [
              d("div", { class: "w-10 h-1 rounded-full [background-color:var(--kiut-lateral-border-color)] dark:bg-purple-500/30" })
            ], -1)),
            d("div", yM, [
              d("p", xM, A(u.value.label), 1),
              d("button", {
                type: "button",
                class: "w-8 h-8 flex items-center justify-center rounded-lg [color:var(--kiut-text-muted)] hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-500/20 dark:hover:text-purple-300 transition-colors",
                "aria-label": "Close",
                onClick: b
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
            d("nav", kM, [
              (g(!0), x(de, null, pe(u.value.items, (w) => (g(), x("button", {
                key: w.id,
                type: "button",
                "data-nav-id": w.id,
                "aria-current": f(w) ? "page" : void 0,
                class: "ksn-item-btn group flex items-center gap-3 w-full text-left px-4 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20 min-h-[52px]",
                onClick: (_) => y(u.value, w)
              }, [
                w.icon ? (g(), ae(ht(w.icon), {
                  key: 0,
                  class: "shrink-0",
                  style: { width: "18px", height: "18px" },
                  "aria-hidden": "true"
                })) : E("", !0),
                d("span", wM, A(w.label), 1)
              ], 8, _M))), 128))
            ])
          ], 4)) : E("", !0)
        ]),
        _: 1
      }),
      d("nav", {
        class: "ksn-mobile-bar fixed bottom-0 left-0 right-0 z-50 border-t flex items-stretch justify-around overflow-hidden",
        style: we({ height: e.mobileBarHeight }),
        "aria-label": "Sections"
      }, [
        (g(!0), x(de, null, pe(e.sections, (w) => (g(), x("button", {
          key: w.id,
          type: "button",
          "aria-current": e.selectedSectionId === w.id ? "true" : void 0,
          "data-has-active": m(w) ? "true" : void 0,
          class: "ksn-section-btn relative flex-1 flex flex-col items-center justify-center gap-1 py-1 px-0.5 min-w-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-inset",
          onClick: (_) => p(w)
        }, [
          e.selectedSectionId === w.id || m(w) ? (g(), x("span", $M)) : E("", !0),
          w.icon ? (g(), ae(ht(w.icon), {
            key: 1,
            class: "shrink-0",
            style: we({ width: e.primaryIconSize, height: e.primaryIconSize }),
            "aria-hidden": "true"
          }, null, 8, ["style"])) : E("", !0),
          d("span", SM, A(w.label), 1)
        ], 8, CM))), 128))
      ], 4)
    ], 16)) : (g(), x("aside", yt({
      key: 0,
      class: "kiut-app-shell-nav flex flex-col h-full overflow-hidden font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, r), [
      d("div", dM, [
        d("div", {
          class: "primary-rail flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r justify-center",
          style: we({
            "--expanded-width": e.expandedPrimaryWidth,
            width: e.primaryRailWidth
          }),
          onMouseenter: k[0] || (k[0] = (w) => a.value = !0),
          onMouseleave: k[1] || (k[1] = (w) => a.value = !1)
        }, [
          v.$slots.logo ? (g(), x("div", uM, [
            ke(v.$slots, "logo", { expanded: a.value }, void 0, !0)
          ])) : E("", !0),
          d("nav", hM, [
            (g(!0), x(de, null, pe(e.sections, (w) => (g(), x("button", {
              key: w.id,
              type: "button",
              "aria-current": e.selectedSectionId === w.id ? "true" : void 0,
              "data-has-active": m(w) ? "true" : void 0,
              title: w.label,
              class: "ksn-section-btn group relative flex flex-row items-center justify-start gap-1 px-3 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
              onClick: (_) => p(w)
            }, [
              w.icon ? (g(), ae(ht(w.icon), {
                key: 0,
                class: "shrink-0",
                style: we({ width: e.primaryIconSize, height: e.primaryIconSize }),
                "aria-hidden": "true"
              }, null, 8, ["style"])) : E("", !0),
              d("span", {
                class: "leading-tight font-semibold tracking-wide text-left w-full truncate px-1 color-",
                style: we({ fontSize: e.primaryFontSize })
              }, A(w.label), 5)
            ], 8, fM))), 128))
          ]),
          v.$slots.footer ? (g(), x("div", gM, [
            ke(v.$slots, "footer", { expanded: a.value }, void 0, !0)
          ])) : E("", !0)
        ], 36),
        N(pt, { name: "ksn-sub" }, {
          default: O(() => [
            u.value ? (g(), x("div", {
              key: "secondary",
              class: "secondary-panel flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r [border-color:var(--kiut-lateral-border-color)] overflow-hidden",
              style: we({ width: e.secondaryWidth })
            }, [
              d("div", mM, [
                d("p", pM, A(u.value.label), 1)
              ]),
              d("nav", bM, [
                (g(!0), x(de, null, pe(u.value.items, (w) => (g(), x("button", {
                  key: w.id,
                  type: "button",
                  "data-nav-id": w.id,
                  "aria-current": f(w) ? "page" : void 0,
                  class: "ksn-item-btn group flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
                  onClick: (_) => h(u.value, w)
                }, [
                  w.icon ? (g(), ae(ht(w.icon), {
                    key: 0,
                    style: we({ width: e.secondaryIconSize, height: e.secondaryIconSize })
                  }, null, 8, ["style"])) : E("", !0),
                  d("span", {
                    class: "truncate",
                    style: we({ fontSize: e.secondaryFontSize })
                  }, A(w.label), 5)
                ], 8, vM))), 128))
              ])
            ], 4)) : E("", !0)
          ]),
          _: 1
        })
      ])
    ], 16));
  }
}), DM = /* @__PURE__ */ ve(MM, [["__scopeId", "data-v-e0ccb96c"]]), VM = {
  install(e) {
    e.component("KiutChartBar", Mt), e.component("KiutChartLine", bt), e.component("KiutPieChart", Fn), e.component("KiutBoxplotChart", Nf), e.component("KiutCandlestickChart", Dg), e.component("KiutHistogramChart", vr), e.component("KiutSankeyChart", aa), e.component("KiutAgentsPerDay", $p), e.component("KiutBookingManager", o0), e.component("KiutCheckin", y0), e.component("KiutCheckinContainer", q0), e.component("KiutCheckinMetrics", wr), e.component("KiutCheckinSegments", Cr), e.component("KiutDisruption", hb), e.component("KiutFAQ", xb), e.component("KiutMessagesPerAgent", $r), e.component("KiutRecordLocator", hv), e.component("KiutSalesByChannel", Sr), e.component("KiutSeller", Mr), e.component("KiutSellerContainer", Gv), e.component("KiutTopAgents", ny), e.component("KiutPaymentMethod", Cy), e.component("KiutAgentHumanConversations", t1), e.component("KiutChannelMetrics", Dr), e.component("KiutConversationVolume", g1), e.component("KiutTriageCombinations", D1), e.component("KiutSelectLanguage", P1), e.component("KiutGuardrails", W1), e.component("KiutDisruptionNotifier", dx), e.component("KiutTotalConversationsCard", ux), e.component("KiutCsatP95Card", hx), e.component("KiutCsatPulseCard", fx), e.component("KiutCSATContainer", Nx), e.component("KiutAiGeneratedRevenueCard", jx), e.component("KiutAiGeneratedChart", Zx), e.component("KiutCostCard", Jx), e.component("KiutHumanEscalations", rk), e.component("KiutHumanEscalationsCard", lk), e.component("KiutAvgResolutionTime", xk), e.component("KiutAvgResolutionTimeCard", Sk), e.component("KiutCheckinCR", Mk), e.component("KiutSellerCR", Dk), e.component("KiutBookingManagerCR", Ak), e.component("KiutNpsDailyMetrics", Tr), e.component("KiutNpsMetrics", Br), e.component("KiutNpsOverviewMetrics", Ar), e.component("KiutAWSCost", Fk), e.component("KiutCostUsage", Yk), e.component("KiutTokenUsage", n_), e.component("KiutConversationCount", f_), e.component("KiutTopAgentsAnalysis", $_), e.component("KiutTopAgentsPie", P_), e.component("KiutDailyCostTrends", H_), e.component("KiutModelUsage", n2), e.component("KiutMessageRoles", h2), e.component("KiutCostPerConversations", C2), e.component("Tabs", Lr), e.component("Table", N2), e.component("TableVersions", Pw), e.component("Filters", v5), e.component("InputText", Fr), e.component("InputPassword", L5), e.component("InputTextarea", F5), e.component("InputFile", nC), e.component("ImageUploadCircle", dC), e.component("InputDateTime", KC), e.component("InputTime", JC), e.component("InputRange", f$), e.component("InputNumber", v$), e.component("InputColorPicker", M$), e.component("EmojiPicker", K$), e.component("Select", na), e.component("LanguageSelect", U$), e.component("LanguagePicker", a4), e.component("MultiSelect", x4), e.component("Toggle", Er), e.component("InputPhone", D4), e.component("SelectablePills", I4), e.component("SegmentedControl", V4), e.component("DateRangePicker", oS), e.component("DatePickerPresets", TS), e.component("Tag", Ge), e.component("TagSelect", NS), e.component("TranslationCountBadge", IS), e.component("Button", $t), e.component("Banner", YS), e.component("Modal", tM), e.component("Section", cM), e.component("KiutAppShellNavigation", DM);
  }
};
export {
  Fk as AWSCost,
  t1 as AgentHumanConversations,
  $p as AgentsPerDay,
  Zx as AiGeneratedChart,
  jx as AiGeneratedRevenueCard,
  DM as AppShellNavigation,
  xk as AvgResolutionTime,
  Sk as AvgResolutionTimeCard,
  YS as Banner,
  o0 as BookingManager,
  Ak as BookingManagerCR,
  Nf as BoxplotChart,
  $t as Button,
  Nx as CSATContainer,
  Dg as CandlestickChart,
  Dr as ChannelMetrics,
  Mt as ChartBar,
  bt as ChartLine,
  y0 as Checkin,
  Mk as CheckinCR,
  q0 as CheckinContainer,
  wr as CheckinMetrics,
  Cr as CheckinSegments,
  f_ as ConversationCount,
  g1 as ConversationVolume,
  Jx as CostCard,
  C2 as CostPerConversations,
  Yk as CostUsage,
  hx as CsatP95Card,
  fx as CsatPulseCard,
  Wr as DEFAULT_CATEGORY_LABELS,
  Kr as DEFAULT_EMOJI_CATALOG,
  fw as DEFAULT_TABLE_VERSIONS_LABELS,
  H_ as DailyCostTrends,
  TS as DatePickerPresets,
  oS as DateRangePicker,
  hb as Disruption,
  dx as DisruptionNotifier,
  gw as ENDPOINT_TABLE_VERSIONS_COLUMNS,
  K$ as EmojiPicker,
  xb as FAQ,
  v5 as Filters,
  W1 as Guardrails,
  vr as HistogramChart,
  rk as HumanEscalations,
  lk as HumanEscalationsCard,
  dC as ImageUploadCircle,
  M$ as InputColorPicker,
  KC as InputDateTime,
  nC as InputFile,
  v$ as InputNumber,
  L5 as InputPassword,
  D4 as InputPhone,
  f$ as InputRange,
  Fr as InputText,
  F5 as InputTextarea,
  JC as InputTime,
  VM as KiutUIPlugin,
  a4 as LanguagePicker,
  U$ as LanguageSelect,
  h2 as MessageRoles,
  $r as MessagesPerAgent,
  tM as Modal,
  n2 as ModelUsage,
  x4 as MultiSelect,
  Tr as NpsDailyMetrics,
  Br as NpsMetrics,
  Ar as NpsOverviewMetrics,
  Cy as PaymentMethod,
  Fn as PieChart,
  FM as RESOURCE_TABLE_VERSIONS_COLUMNS,
  hv as RecordLocator,
  Sr as SalesByChannel,
  aa as SankeyChart,
  cM as Section,
  V4 as SegmentedControl,
  na as Select,
  P1 as SelectLanguage,
  I4 as SelectablePills,
  Mr as Seller,
  Dk as SellerCR,
  Gv as SellerContainer,
  N2 as Table,
  Pw as TableVersions,
  Lr as Tabs,
  Ge as Tag,
  NS as TagSelect,
  Er as Toggle,
  n_ as TokenUsage,
  ny as TopAgents,
  $_ as TopAgentsAnalysis,
  P_ as TopAgentsPie,
  ux as TotalConversationsCard,
  IS as TranslationCountBadge,
  D1 as TriageCombinations,
  B$ as appendEmojiToDraft,
  OM as buildDefaultCategories,
  T$ as extractEmojis,
  A$ as filterEmojiCatalog
};
//# sourceMappingURL=kiut-ui.es.js.map
